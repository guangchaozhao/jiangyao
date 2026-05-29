/**
 * sync-wechat-news.js
 * 从 WeWe RSS JSON 或公众号文章链接拉取图文，转存正文图片到 OSS，并生成新闻中心 manifest。
 *
 * 使用方法：
 *   npm run sync:wechat-news -- --feed-url "http://127.0.0.1:4000/feeds/MP_xxx.json?mode=fulltext&limit=20"
 *   npm run sync:wechat-news -- --article-url "https://mp.weixin.qq.com/s/xxx"
 *   npm run sync:wechat-news -- --article-urls "https://mp.weixin.qq.com/s/xxx,https://mp.weixin.qq.com/s/yyy"
 *   npm run sync:wechat-news -- --no-upload
 *
 * 需要环境变量：
 *   WECHAT_NEWS_ARTICLE_URLS 或 WECHAT_NEWS_FEED_URL
 *   OSS_ACCESS_KEY_ID / OSS_ACCESS_KEY_SECRET
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.join(__dirname, '..')
const DOUD_BACKEND_ENV = String.raw`D:\AAACODE\Codetest\Doudtest\doud-web-main\backend\.env`

const DEFAULT_SITE_BUCKET = 'jiangyao-site-2026'
const DEFAULT_OSS_REGION = 'oss-cn-shenzhen'
const DEFAULT_OSS_BASE = 'https://jiangyao-site-2026.oss-cn-shenzhen.aliyuncs.com'
const NEWS_PREFIX = 'news'
const LOCAL_OUTPUT = path.join(ROOT, 'data', 'news-manifest.json')
const NEWS_CATEGORY_LABELS = {
  group: '集团新闻',
  care: '领导关怀',
  cooperation: '合作交流',
}
const NEWS_CATEGORY_KEYS = new Set(Object.keys(NEWS_CATEGORY_LABELS))

const args = process.argv.slice(2)
const shouldUpload = !args.includes('--no-upload')
const forceUpload = args.includes('--force')

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}

  return fs.readFileSync(filePath, 'utf-8')
    .split(/\r?\n/)
    .reduce((parsed, line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return parsed

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
      if (!match) return parsed

      let value = match[2].trim()
      const quote = value[0]
      if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
        value = value.slice(1, -1)
      }

      parsed[match[1]] = value
      return parsed
    }, {})
}

const env = {
  ...parseEnvFile(DOUD_BACKEND_ENV),
  ...parseEnvFile(path.join(ROOT, '.env')),
  ...parseEnvFile(path.join(ROOT, '.env.local')),
  ...process.env,
}

function argValue(name) {
  const exact = args.find((arg) => arg.startsWith(`${name}=`))
  if (exact) return exact.slice(name.length + 1)
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

function normalizeBase(value) {
  return String(value || DEFAULT_OSS_BASE).trim().replace(/\/+$/, '')
}

function withFullTextMode(feedUrl) {
  const url = new URL(feedUrl)
  if (!url.searchParams.has('mode')) url.searchParams.set('mode', 'fulltext')
  if (!url.searchParams.has('limit')) url.searchParams.set('limit', '20')
  return url.toString()
}

function readUploadConfig() {
  return {
    region: env.JIANGYAO_OSS_REGION || env.OSS_REGION || DEFAULT_OSS_REGION,
    bucket: env.JIANGYAO_OSS_BUCKET || env.OSS_BUCKET || DEFAULT_SITE_BUCKET,
    baseUrl: normalizeBase(env.VITE_OSS_BASE || env.OSS_BASE),
    accessKeyId: env.JIANGYAO_OSS_ACCESS_KEY_ID || env.OSS_ACCESS_KEY_ID,
    accessKeySecret: env.JIANGYAO_OSS_ACCESS_KEY_SECRET || env.OSS_ACCESS_KEY_SECRET,
  }
}

function hash(value, length = 12) {
  return crypto.createHash('sha1').update(String(value || '')).digest('hex').slice(0, length)
}

function toStableId(item, index) {
  return String(item.id || item.url || item.title || `news-${index}-${Date.now()}`)
    .replace(/^https?:\/\/mp\.weixin\.qq\.com\/s\//i, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || `news-${index}-${hash(item.title)}`
}

function decodeHtmlEntity(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function decodeJsEscapes(value) {
  return decodeHtmlEntity(String(value || '')
    .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16))))
}

function decodeMaybeEncodedUrl(value) {
  let decoded = decodeJsEscapes(value).trim()
  for (let i = 0; i < 2; i += 1) {
    try {
      const next = decodeURIComponent(decoded)
      if (next === decoded) break
      decoded = next
    } catch {
      break
    }
  }
  if (decoded.startsWith('//')) decoded = `https:${decoded}`
  return decoded.replace(/^http:\/\//i, 'https://')
}

function stripDangerousHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<link[\s\S]*?>/gi, '')
    .replace(/<meta[\s\S]*?>/gi, '')
    .replace(/<object[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?<\/embed>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, '')
}

function stripHtml(html) {
  return decodeHtmlEntity(String(html || ''))
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function inferNewsCategory({ title, summary, contentHtml }) {
  const raw = `${title || ''} ${summary || ''} ${stripHtml(contentHtml || '')}`.slice(0, 2600)
  if (/领导|关怀|调研|指导|考察|视察|莅临|慰问|政策/.test(raw)) return 'care'
  if (/合作|交流|签约|洽谈|共建|入驻|招商|战略|伙伴|校企|赛事机构|媒体/.test(raw)) return 'cooperation'
  return 'group'
}

function normalizeCategoryKey(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const lower = raw.toLowerCase()
  if (NEWS_CATEGORY_KEYS.has(lower)) return lower
  if (/集团|新闻|动态|news/.test(raw)) return 'group'
  if (/领导|关怀|care/.test(raw)) return 'care'
  if (/合作|交流|coop|cooperation/.test(raw)) return 'cooperation'
  return ''
}

function normalizeWhitespace(value) {
  return decodeHtmlEntity(value).replace(/\s+/g, ' ').trim()
}

function getFirstMatch(html, pattern) {
  const match = String(html || '').match(pattern)
  return match ? normalizeWhitespace(stripHtml(match[match.length - 1])) : ''
}

function getRawFirstMatch(html, pattern) {
  const match = String(html || '').match(pattern)
  return match ? match[match.length - 1] : ''
}

function extractBalancedElement(html, startIndex) {
  const startTagMatch = html.slice(startIndex).match(/^<([a-z0-9-]+)\b[^>]*>/i)
  if (!startTagMatch) return ''

  const tag = startTagMatch[1]
  const tagRegex = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi')
  tagRegex.lastIndex = startIndex
  let depth = 0
  let match

  while ((match = tagRegex.exec(html)) !== null) {
    const isClosing = /^<\//.test(match[0])
    const isSelfClosing = /\/>$/.test(match[0])
    if (isClosing) depth -= 1
    else if (!isSelfClosing) depth += 1

    if (depth === 0) {
      return html.slice(startIndex, tagRegex.lastIndex)
    }
  }

  return ''
}

function extractElementById(html, id) {
  const pattern = new RegExp(`<([a-z0-9-]+)\\b[^>]*\\bid=(["'])${id}\\2[^>]*>`, 'i')
  const match = pattern.exec(html)
  if (!match) return ''
  return extractBalancedElement(html, match.index)
}

function cleanWeChatArticleHtml(html) {
  return stripDangerousHtml(html)
    .replace(/\sdata-src=/gi, ' src=')
    .replace(/opacity:\s*0\s*(!important)?;?/gi, '')
    .replace(/visibility:\s*hidden;?/gi, '')
    .replace(/\sdata-[a-z0-9_-]+=(['"]).*?\1/gi, '')
    .replace(/\saria-[a-z0-9_-]+=(['"]).*?\1/gi, '')
}

function getAttr(tag, name) {
  const match = String(tag || '').match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))
  return match ? decodeHtmlEntity(match[2]) : ''
}

function getObjectField(block, field) {
  const match = String(block || '').match(new RegExp(`${field}\\s*:\\s*'([^']*)'`, 'i'))
  return match ? decodeJsEscapes(match[1]) : ''
}

function extractVideoVariantsFromBlock(block) {
  const raw = String(block || '')
  const variants = []
  const urlRegex = /url\s*:\s*'([^']+\.mp4[^']*)'/gi
  let match

  while ((match = urlRegex.exec(raw)) !== null) {
    const start = raw.lastIndexOf('{', match.index)
    const end = raw.indexOf('}', match.index)
    const entry = raw.slice(start >= 0 ? start : match.index, end > match.index ? end + 1 : match.index + 2000)
    variants.push({
      formatId: getObjectField(entry, 'format_id'),
      width: Number.parseInt(getObjectField(entry, 'width'), 10) || 0,
      height: Number.parseInt(getObjectField(entry, 'height'), 10) || 0,
      filesize: Number.parseInt(getObjectField(entry, 'filesize'), 10) || 0,
      quality: getObjectField(entry, 'video_quality_wording'),
      url: decodeMaybeEncodedUrl(match[1]),
    })
  }

  return variants
}

function extractWeChatVideoInfos(pageHtml) {
  const infos = new Map()
  const regex = /video_id:\s*'([^']+)'([\s\S]*?)(?=video_id:\s*'|can_use_wecoin|front_end_additional_fields|<\/script>)/g
  let match

  while ((match = regex.exec(pageHtml)) !== null) {
    const videoId = match[1]
    const block = match[2]
    const transMatch = block.match(/mp_video_trans_info:\s*\[([\s\S]*?)\]\s*,\s*content_noencode:/)
    const variants = extractVideoVariantsFromBlock(transMatch?.[1] || block)

    infos.set(videoId, {
      id: videoId,
      title: getObjectField(block, 'content_noencode'),
      cover: decodeMaybeEncodedUrl(
        getObjectField(block, 'cover_url_16_9') ||
        getObjectField(block, 'cover_url') ||
        getObjectField(block, 'cover_url_1_1'),
      ),
      variants,
    })
  }

  const globalVariants = extractVideoVariantsFromBlock(pageHtml)
  if (globalVariants.length > 0) {
    for (const info of infos.values()) {
      if (!info.variants || info.variants.length === 0) info.variants = globalVariants
    }
  }

  return infos
}

function chooseVideoVariant(variants) {
  const valid = (variants || []).filter((item) => item.url)
  if (valid.length === 0) return null

  const maxPreferredSize = 20 * 1024 * 1024
  const byResolution = (a, b) =>
    (b.width * b.height) - (a.width * a.height) ||
    (b.filesize || 0) - (a.filesize || 0)
  const preferred = valid.filter((item) => item.filesize > 0 && item.filesize <= maxPreferredSize)
  return (preferred.length > 0 ? preferred : valid).sort(byResolution)[0]
}

function markWeChatVideoEmbeds(contentHtml, pageHtml) {
  const videoInfos = extractWeChatVideoInfos(pageHtml)
  const videos = []
  const markedHtml = String(contentHtml || '').replace(
    /<iframe\b[^>]*\bdata-mpvid\s*=\s*(["'])(.*?)\1[^>]*>\s*<\/iframe>/gi,
    (tag, _quote, rawVideoId) => {
      const videoId = decodeHtmlEntity(rawVideoId)
      const info = videoInfos.get(videoId) || { id: videoId, variants: [] }
      const index = videos.length
      videos.push({
        id: videoId,
        title: info.title,
        cover: decodeMaybeEncodedUrl(getAttr(tag, 'data-cover')) || info.cover || '',
        sourceUrl: decodeMaybeEncodedUrl(getAttr(tag, 'data-src')),
        variants: info.variants || [],
      })
      return `@@WECHAT_VIDEO_${index}@@`
    },
  )

  return { contentHtml: markedHtml, videos }
}

function articleUrlsFromText(value) {
  return Array.from(new Set(
    String(value || '')
      .split(/[\n,，]+/)
      .map((item) => item.trim())
      .filter(Boolean),
  ))
}

function articleOrderFromArgs(index) {
  const orders = String(argValue('--article-orders') || env.WECHAT_NEWS_ARTICLE_ORDERS || '')
    .split(/[\n,，]+/)
    .map((item) => Number.parseInt(item.trim(), 10))
  const explicit = orders[index]
  if (Number.isFinite(explicit) && explicit > 0) return explicit

  const start = Number.parseInt(argValue('--article-start') || env.WECHAT_NEWS_ARTICLE_START || '1', 10)
  return (Number.isFinite(start) && start > 0 ? start : 1) + index
}

function articleCategoryFromArgs(index) {
  const categories = String(argValue('--article-categories') || env.WECHAT_NEWS_ARTICLE_CATEGORIES || '')
    .split(/[\n,，]+/)
    .map(normalizeCategoryKey)
  return categories[index] || ''
}

async function fetchArticleItemFromUrl(url, index) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 Chrome/120 Safari/537.36',
      Referer: 'https://mp.weixin.qq.com/',
    },
  })

  if (!response.ok) {
    throw new Error(`article request failed: ${response.status} ${url}`)
  }

  const html = await response.text()
  const contentRaw = extractElementById(html, 'js_content')
  const marked = markWeChatVideoEmbeds(contentRaw, html)
  const contentHtml = cleanWeChatArticleHtml(marked.contentHtml)
  const ct = getRawFirstMatch(html, /\bct\s*=\s*["']?(\d{9,12})["']?/)
  const publishedAt = ct
    ? new Date(Number(ct) * 1000).toISOString()
    : ''
  const title = getFirstMatch(html, /<h1\b[^>]*id=(["'])activity-name\1[^>]*>([\s\S]*?)<\/h1>/i)
    || getFirstMatch(html, /<span\b[^>]*class=(["'])[^"']*js_title_inner[^"']*\1[^>]*>([\s\S]*?)<\/span>/i)
    || `公众号图文 ${index + 1}`
  const sourceName = getFirstMatch(html, /<a\b[^>]*id=(["'])js_name\1[^>]*>([\s\S]*?)<\/a>/i) || '江曜擎天'

  return {
    id: url,
    url,
    order: articleOrderFromArgs(index),
    title,
    content_html: contentHtml,
    summary: stripHtml(contentHtml).slice(0, 140),
    category: articleCategoryFromArgs(index),
    image: extractImageUrls(contentHtml)[0] || '',
    author: { name: sourceName },
    date_published: publishedAt,
    videos: marked.videos,
  }
}

function extractImageUrls(html) {
  const urls = new Set()
  const regex = /<img\b[^>]*(?:src|data-src)\s*=\s*(['"]?)([^'"\s>]+)\1[^>]*>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const url = decodeHtmlEntity(match[2])
    if (/^https?:\/\//i.test(url)) urls.add(url)
  }
  return Array.from(urls)
}

function extensionFrom(url, contentType) {
  const parsed = new URL(url)
  const wxFmt = parsed.searchParams.get('wx_fmt') || parsed.searchParams.get('tp')
  const fromQuery = String(wxFmt || '').toLowerCase().replace(/^image\//, '')
  if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fromQuery)) {
    return fromQuery === 'jpeg' ? '.jpg' : `.${fromQuery}`
  }

  const fromType = String(contentType || '').split(';')[0].toLowerCase()
  if (fromType === 'image/jpeg') return '.jpg'
  if (fromType === 'image/png') return '.png'
  if (fromType === 'image/webp') return '.webp'
  if (fromType === 'image/gif') return '.gif'

  const ext = path.posix.extname(parsed.pathname).toLowerCase()
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
    ? ext.replace('.jpeg', '.jpg')
    : '.jpg'
}

function contentTypeForExt(ext) {
  return {
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  }[ext] || 'image/jpeg'
}

function videoExtFrom(url, contentType) {
  const fromType = String(contentType || '').split(';')[0].toLowerCase()
  if (fromType === 'video/mp4') return '.mp4'
  const ext = path.posix.extname(new URL(url).pathname).toLowerCase()
  return ['.mp4', '.m4v', '.mov', '.webm'].includes(ext) ? ext : '.mp4'
}

function videoContentTypeForExt(ext) {
  return {
    '.mp4': 'video/mp4',
    '.m4v': 'video/mp4',
    '.mov': 'video/quicktime',
    '.webm': 'video/webm',
  }[ext] || 'video/mp4'
}

async function createOssClient() {
  if (!shouldUpload) return null
  const config = readUploadConfig()
  if (!config.accessKeyId || !config.accessKeySecret) {
    console.log('news upload: 缺少 OSS_ACCESS_KEY_ID / OSS_ACCESS_KEY_SECRET，已只生成本地 manifest')
    return null
  }

  const ossModule = await import('ali-oss')
  const OSS = ossModule.default || ossModule
  return new OSS({
    region: config.region,
    bucket: config.bucket,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    secure: true,
  })
}

async function objectExists(client, key, size) {
  if (!client || forceUpload) return false
  try {
    const head = await client.head(key)
    const remoteSize = Number(head.res?.headers?.['content-length'] || 0)
    return remoteSize === size
  } catch {
    return false
  }
}

async function mirrorImage(client, articleId, sourceUrl, index) {
  if (!sourceUrl || !/^https?:\/\//i.test(sourceUrl)) return sourceUrl
  if (sourceUrl.includes(`${readUploadConfig().baseUrl}/${NEWS_PREFIX}/`)) return sourceUrl

  let response
  try {
    response = await fetch(sourceUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 Chrome/120 Safari/537.36',
        Referer: 'https://mp.weixin.qq.com/',
      },
    })
  } catch (error) {
    console.log(`  image fetch failed: ${sourceUrl} - ${error.message}`)
    return sourceUrl
  }

  if (!response.ok) {
    console.log(`  image fetch failed: ${response.status} ${sourceUrl}`)
    return sourceUrl
  }

  const contentType = response.headers.get('content-type') || ''
  const buffer = Buffer.from(await response.arrayBuffer())
  const ext = extensionFrom(sourceUrl, contentType)
  const key = `${NEWS_PREFIX}/images/${articleId}/${String(index + 1).padStart(2, '0')}-${hash(sourceUrl, 10)}${ext}`
  const publicUrl = `${readUploadConfig().baseUrl}/${key.split('/').map(encodeURIComponent).join('/')}`

  if (!client) return sourceUrl

  if (await objectExists(client, key, buffer.length)) return publicUrl

  try {
    await client.put(key, buffer, {
      headers: {
        'Content-Type': contentTypeForExt(ext),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
    console.log(`  uploaded: oss://${readUploadConfig().bucket}/${key}`)
    return publicUrl
  } catch (error) {
    console.log(`  image upload failed: ${key} - ${error.message}`)
    return sourceUrl
  }
}

async function mirrorVideo(client, articleId, sourceUrl, videoId) {
  const normalizedSource = decodeMaybeEncodedUrl(sourceUrl)
  if (!normalizedSource || !/^https?:\/\//i.test(normalizedSource)) return normalizedSource
  if (normalizedSource.includes(`${readUploadConfig().baseUrl}/${NEWS_PREFIX}/`)) return normalizedSource
  if (!client) return normalizedSource

  let response
  try {
    response = await fetch(normalizedSource, {
      headers: {
        'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 Chrome/120 Safari/537.36',
        Referer: 'https://mp.weixin.qq.com/',
      },
    })
  } catch (error) {
    console.log(`  video fetch failed: ${normalizedSource} - ${error.message}`)
    return normalizedSource
  }

  if (!response.ok) {
    console.log(`  video fetch failed: ${response.status} ${normalizedSource}`)
    return normalizedSource
  }

  const contentType = response.headers.get('content-type') || ''
  const buffer = Buffer.from(await response.arrayBuffer())
  const ext = videoExtFrom(normalizedSource, contentType)
  const safeVideoId = String(videoId || hash(normalizedSource))
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  const key = `${NEWS_PREFIX}/videos/${articleId}/${safeVideoId || hash(normalizedSource)}${ext}`
  const publicUrl = `${readUploadConfig().baseUrl}/${key.split('/').map(encodeURIComponent).join('/')}`

  if (await objectExists(client, key, buffer.length)) return publicUrl

  try {
    await client.put(key, buffer, {
      headers: {
        'Content-Type': videoContentTypeForExt(ext),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
    console.log(`  uploaded: oss://${readUploadConfig().bucket}/${key}`)
    return publicUrl
  } catch (error) {
    console.log(`  video upload failed: ${key} - ${error.message}`)
    return normalizedSource
  }
}

function replaceImageUrls(html, mapping) {
  let result = html
  for (const [sourceUrl, ossUrl] of mapping.entries()) {
    result = result.split(sourceUrl).join(ossUrl)
    result = result.split(sourceUrl.replace(/&/g, '&amp;')).join(ossUrl)
  }
  return result
}

function escapeHtmlAttr(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderVideoHtml(video) {
  if (!video?.url) return ''
  const poster = video.poster ? ` poster="${escapeHtmlAttr(video.poster)}"` : ''
  const caption = video.title ? `<figcaption>${escapeHtmlAttr(video.title)}</figcaption>` : ''
  return [
    '<figure class="wechat-video-block">',
    `<video controls playsinline preload="metadata"${poster}>`,
    `<source src="${escapeHtmlAttr(video.url)}" type="video/mp4">`,
    '</video>',
    caption,
    '</figure>',
  ].join('')
}

async function normalizeArticle(client, item, index, feed) {
  const id = toStableId(item, index)
  const title = String(item.title || `公众号文章 ${index + 1}`).trim()
  let contentHtml = stripDangerousHtml(item.content_html || item.content || item.summary || '')

  const imageUrls = extractImageUrls(contentHtml)
  const imageMap = new Map()
  for (let i = 0; i < imageUrls.length; i += 1) {
    imageMap.set(imageUrls[i], await mirrorImage(client, id, imageUrls[i], i))
  }
  contentHtml = replaceImageUrls(contentHtml, imageMap)

  const videos = []
  for (let i = 0; i < (item.videos || []).length; i += 1) {
    const sourceVideo = item.videos[i]
    const variant = chooseVideoVariant(sourceVideo.variants)
    const videoUrl = await mirrorVideo(client, id, variant?.url || sourceVideo.sourceUrl, sourceVideo.id || i)
    const poster = sourceVideo.cover
      ? await mirrorImage(client, id, sourceVideo.cover, imageUrls.length + i + 1)
      : ''
    const normalizedVideo = {
      id: sourceVideo.id || `${id}-video-${i + 1}`,
      url: videoUrl,
      poster,
      title: sourceVideo.title || '视频',
      width: variant?.width || 0,
      height: variant?.height || 0,
      filesize: variant?.filesize || 0,
    }
    videos.push(normalizedVideo)
    contentHtml = contentHtml.split(`@@WECHAT_VIDEO_${i}@@`).join(renderVideoHtml(normalizedVideo))
  }
  contentHtml = contentHtml.replace(/@@WECHAT_VIDEO_\d+@@/g, '')

  const coverSource = item.image || item.cover || imageUrls[0] || ''
  const cover = coverSource
    ? await mirrorImage(client, id, decodeHtmlEntity(coverSource), imageUrls.length)
    : ''
  const summary = stripHtml(item.summary || contentHtml).slice(0, 120)
  const sourceName = item.author?.name || item.authors?.[0]?.name || feed.title || '江曜擎天'
  const rawCategory = String(item.category || '').trim()
  const category = NEWS_CATEGORY_KEYS.has(rawCategory)
    ? rawCategory
    : inferNewsCategory({ title, summary, contentHtml })

  return {
    id,
    order: Number.isFinite(Number(item.order)) ? Number(item.order) : index + 1,
    title,
    category,
    categoryLabel: NEWS_CATEGORY_LABELS[category],
    summary,
    cover,
    coverOriginal: coverSource,
    originalUrl: item.url || item.external_url || '',
    sourceName,
    publishedAt: item.date_published || item.date_modified || item.date || '',
    contentHtml,
    videoUrl: videos[0]?.url || '',
    videoPoster: videos[0]?.poster || '',
    videos,
  }
}

async function loadItemsFromArticleUrls(urls) {
  const items = []
  for (let i = 0; i < urls.length; i += 1) {
    console.log(`fetch article ${i + 1}/${urls.length}: ${urls[i]}`)
    items.push(await fetchArticleItemFromUrl(urls[i], i))
  }

  return {
    title: '公众号图文',
    items,
    source: {
      type: 'article-urls',
      articleUrls: urls,
    },
  }
}

async function loadItemsFromWeweFeed(feedUrl) {
  const normalizedFeedUrl = withFullTextMode(feedUrl)
  console.log(`wewe rss: ${normalizedFeedUrl}`)

  const response = await fetch(normalizedFeedUrl, {
    headers: { Accept: 'application/feed+json, application/json' },
  })
  if (!response.ok) {
    throw new Error(`WeWe RSS request failed: ${response.status}`)
  }

  const feed = await response.json()
  return {
    title: feed.title || '',
    items: Array.isArray(feed.items) ? feed.items : [],
    source: {
      type: 'wewe-rss',
      feedUrl: normalizedFeedUrl,
      title: feed.title || '',
    },
  }
}

async function uploadManifest(client, manifest) {
  const body = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, 'utf-8')
  fs.mkdirSync(path.dirname(LOCAL_OUTPUT), { recursive: true })
  fs.writeFileSync(LOCAL_OUTPUT, body)
  console.log(`local manifest: ${LOCAL_OUTPUT}`)

  if (!client) return

  const config = readUploadConfig()
  try {
    await client.put(`${NEWS_PREFIX}/manifest.json`, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    })
    console.log(`uploaded: oss://${config.bucket}/${NEWS_PREFIX}/manifest.json`)
  } catch (error) {
    console.log(`manifest upload failed: ${error.message}`)
    process.exitCode = 1
  }
}

async function main() {
  const feedUrl = argValue('--feed-url') || env.JIANGYAO_WECHAT_NEWS_FEED_URL || env.WECHAT_NEWS_FEED_URL
  const articleUrls = articleUrlsFromText(
    [
      argValue('--article-url'),
      argValue('--article-urls'),
      env.JIANGYAO_WECHAT_NEWS_ARTICLE_URLS,
      env.WECHAT_NEWS_ARTICLE_URLS,
    ].filter(Boolean).join('\n'),
  )

  if (!feedUrl && articleUrls.length === 0) {
    console.log('缺少公众号来源：请传 --article-url / --article-urls，或配置 WECHAT_NEWS_ARTICLE_URLS / WECHAT_NEWS_FEED_URL')
    process.exitCode = 1
    return
  }

  console.log(`oss target: oss://${readUploadConfig().bucket}/${NEWS_PREFIX}/`)
  const feed = articleUrls.length > 0
    ? await loadItemsFromArticleUrls(articleUrls)
    : await loadItemsFromWeweFeed(feedUrl)
  const items = feed.items
  const client = await createOssClient()
  const articles = []

  for (let i = 0; i < items.length; i += 1) {
    console.log(`article ${i + 1}/${items.length}: ${items[i]?.title || '-'}`)
    articles.push(await normalizeArticle(client, items[i], i, feed))
  }

  const manifest = {
    version: 1,
    updatedAt: new Date().toISOString(),
    source: feed.source,
    articles,
  }

  await uploadManifest(client, manifest)
  console.log(`done: ${articles.length} articles`)
}

await main()
