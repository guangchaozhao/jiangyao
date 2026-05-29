/**
 * sync-oss.js
 * 扫描本地资源目录，更新 src/config/oss.js，并同步电竞影像到 OSS。
 *
 * 使用方法：
 *   npm run sync:oss
 *   npm run sync:oss -- --no-upload
 *   npm run sync:oss -- --force
 *
 * 说明：
 *   - Doud AI 案例库读取 Doud public manifest，不再维护官网本地视频。
 *   - 电竞影像本地维护目录默认是：
 *     D:\AAACODE\Codetest\Doudtest\avatar\jiangyao-site-2026\esports
 *   - 电竞影像 OSS 目标是：oss://jiangyao-site-2026/esports/
 *   - 已有媒体的 title / desc 会从 src/config/oss.js 保留。
 */

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import ffprobeStatic from 'ffprobe-static'

const ffprobe = ffprobeStatic.path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ── 路径配置 ──────────────────────────────────────────────
const ROOT = path.join(__dirname, '..')
const SRC = path.join(ROOT, 'src')
const OSS_CONFIG = path.join(SRC, 'config', 'oss.js')
const DOUD_BACKEND_ENV = String.raw`D:\AAACODE\Codetest\Doudtest\doud-web-main\backend\.env`
const DEFAULT_SITE_SOURCE_ROOT = String.raw`D:\AAACODE\Codetest\Doudtest\avatar\jiangyao-site-2026`
const DEFAULT_ESPORTS_SOURCE_DIR = path.join(DEFAULT_SITE_SOURCE_ROOT, 'esports')

const DEFAULT_SITE_BUCKET = 'jiangyao-site-2026'
const DEFAULT_OSS_REGION = 'oss-cn-shenzhen'
const DEFAULT_OSS_BASE = 'https://jiangyao-site-2026.oss-cn-shenzhen.aliyuncs.com'
const DEFAULT_DOUD_PUBLIC_BASE = 'https://media.doudai.cc/avatar'

const VIDEO_EXTS = new Set(['.mp4', '.m4v', '.mov', '.avi', '.mkv', '.webm'])
const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'])
const MEDIA_EXTS = new Set([...VIDEO_EXTS, ...IMG_EXTS])
const HERO_VIDEO_FILENAME = 'yuanqu.mp4'

const args = new Set(process.argv.slice(2))
const shouldUpload = !args.has('--no-upload')
const forceUpload = args.has('--force')

const env = readEnv()
const OSS_BASE = normalizeOssBase(env.VITE_OSS_BASE || env.OSS_BASE)
const DOUD_PUBLIC_BASE = normalizeOssBase(
  env.VITE_DOUD_PUBLIC_BASE || env.DOUD_PUBLIC_BASE || DEFAULT_DOUD_PUBLIC_BASE,
)
const OSS_PICTURE = `${OSS_BASE}/picture`
const OSS_VIDEOS = `${OSS_BASE}/showcase-videos`
const OSS_AVATARS = `${OSS_BASE}/avatar-previews`
const OSS_ESPORTS = `${OSS_BASE}/esports`

const DIR = {
  picture: path.join(SRC, 'picture'),
  esports: path.resolve(env.JIANGYAO_ESPORTS_SOURCE_DIR || DEFAULT_ESPORTS_SOURCE_DIR),
}

// picture 目录中已知 key 映射（固定不变）
const KNOWN_PICTURE_KEYS = {
  'jiangyao.png': 'jiangyao',
  'xingchen.png': 'xingchen',
  'touxiang.png': 'touxiang',
  'tianyuan.png': 'tianyuan',
  'xiaogang.png': 'xiaogang',
  'zhanghui.png': 'zhanghui',
  'chengxi.png': 'chengxi',
  '1.jpg': 'park1',
  '2.jpg': 'park2',
  '3.png': 'park3',
  '4.png': 'park4',
  '5.png': 'park5',
  '6.png': 'park6',
}

// ── 工具函数 ──────────────────────────────────────────────

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

function readEnv() {
  return {
    ...parseEnvFile(DOUD_BACKEND_ENV),
    ...parseEnvFile(path.join(ROOT, '.env')),
    ...parseEnvFile(path.join(ROOT, '.env.local')),
    ...process.env,
  }
}

function normalizeOssBase(value) {
  return String(value || DEFAULT_OSS_BASE).trim().replace(/\/+$/, '')
}

function listFiles(dir, extSet) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((filename) => extSet.has(path.extname(filename).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true }))
}

function listRelativeFiles(dir, extSet) {
  if (!fs.existsSync(dir)) return []

  const files = []
  const walk = (currentDir) => {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      if (!entry.isFile()) continue
      if (!extSet.has(path.extname(entry.name).toLowerCase())) continue

      files.push({
        relPath: toPosix(path.relative(dir, fullPath)),
        filePath: fullPath,
      })
    }
  }

  walk(dir)
  return files.sort((a, b) => a.relPath.localeCompare(b.relPath, 'zh-Hans-CN', { numeric: true }))
}

function toPosix(value) {
  return value.split(path.sep).join('/')
}

function encodeOssUrlPath(relPath) {
  return toPosix(relPath)
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

function jsString(value) {
  return JSON.stringify(value || '')
}

/** 用 ffprobe 获取视频宽高，返回 { width, height } 或 null */
function getVideoDimensions(filePath) {
  try {
    const out = execFileSync(ffprobe, [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_streams',
      filePath,
    ], { timeout: 10000 })
    const json = JSON.parse(out.toString())
    const video = json.streams?.find((stream) => stream.codec_type === 'video')
    if (!video) return null
    const width = video.width
    const height = video.height
    const rotate = parseInt(video.tags?.rotate || video.side_data_list?.[0]?.rotation || '0', 10)
    if (Math.abs(rotate) === 90 || Math.abs(rotate) === 270) return { width: height, height: width }
    return { width, height }
  } catch {
    return null
  }
}

/** 根据宽高判断方向 */
function getOrientation(dim) {
  if (!dim) return 'wide'
  if (dim.width > dim.height) return 'wide'
  if (dim.height > dim.width) return 'tall'
  return 'square'
}

/** 从文件名生成可读标题 */
function titleFromFilename(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function contentTypeFor(filename) {
  const ext = path.extname(filename).toLowerCase()
  return {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.m4v': 'video/mp4',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.mkv': 'video/x-matroska',
    '.webm': 'video/webm',
  }[ext] || 'application/octet-stream'
}

// ── 读取现有 oss.js 中的媒体元数据（title / desc）────────

function parseExistingMeta(ossJsContent) {
  const meta = {}
  const regex = /\{\s*src:\s*`([^`]+)`[\s\S]*?title:\s*(['"])(.*?)\2[\s\S]*?desc:\s*(['"])(.*?)\4/g
  let match

  while ((match = regex.exec(ossJsContent)) !== null) {
    const [, src, , title, , desc] = match
    const keys = metaKeysFromSrc(src)
    for (const key of keys) {
      if (!meta[key]) meta[key] = { title, desc }
    }
  }

  return meta
}

function metaKeysFromSrc(src) {
  const rawKey = src
    .replace(/^\$\{OSS_[A-Z_]+\}\//, '')
    .replace(/^https?:\/\/[^/]+\//, '')

  const decoded = safeDecode(rawKey)
  return Array.from(new Set([
    decoded,
    path.posix.basename(decoded),
  ].filter(Boolean)))
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

// ── OSS 上传 ─────────────────────────────────────────────

function readUploadConfig() {
  return {
    region: env.JIANGYAO_OSS_REGION || env.OSS_REGION || DEFAULT_OSS_REGION,
    bucket: env.JIANGYAO_OSS_BUCKET || env.OSS_BUCKET || DEFAULT_SITE_BUCKET,
    accessKeyId: env.JIANGYAO_OSS_ACCESS_KEY_ID || env.OSS_ACCESS_KEY_ID,
    accessKeySecret: env.JIANGYAO_OSS_ACCESS_KEY_SECRET || env.OSS_ACCESS_KEY_SECRET,
  }
}

async function syncEsportsToOss(files) {
  if (!shouldUpload) {
    console.log('esports upload: 已跳过（--no-upload）')
    return null
  }

  const config = readUploadConfig()
  if (!config.accessKeyId || !config.accessKeySecret) {
    console.log('esports upload: 缺少 OSS_ACCESS_KEY_ID / OSS_ACCESS_KEY_SECRET，已只更新本地配置')
    return null
  }

  const ossModule = await import('ali-oss')
  const OSS = ossModule.default || ossModule
  const client = new OSS({
    region: config.region,
    bucket: config.bucket,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    secure: true,
  })

  if (files.length === 0) {
    console.log('esports upload: 本地目录没有媒体文件')
    return client
  }

  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const file of files) {
    const key = `esports/${file.relPath}`
    const stat = fs.statSync(file.filePath)

    if (!forceUpload) {
      try {
        const head = await client.head(key)
        const remoteSize = Number(head.res?.headers?.['content-length'] || 0)
        if (remoteSize === stat.size) {
          skipped += 1
          continue
        }
      } catch (error) {
        if (error?.status !== 404 && error?.code !== 'NoSuchKey') {
          console.log(`  head 失败，继续上传 ${key}: ${error.message}`)
        }
      }
    }

    try {
      await client.put(key, file.filePath, {
        headers: {
          'Content-Type': contentTypeFor(file.filePath),
        },
      })
      uploaded += 1
      console.log(`  uploaded: oss://${config.bucket}/${key}`)
    } catch (error) {
      failed += 1
      console.log(`  upload failed: ${key} - ${error.message}`)
    }
  }

  console.log(`esports upload: ${uploaded} 上传，${skipped} 跳过，${failed} 失败`)
  if (failed > 0) process.exitCode = 1
  return client
}

async function uploadEsportsManifest(client, manifest) {
  if (!client) return

  const config = readUploadConfig()
  const body = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, 'utf-8')

  try {
    await client.put('esports/manifest.json', body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    })
    console.log(`  uploaded: oss://${config.bucket}/esports/manifest.json`)
  } catch (error) {
    console.log(`  upload failed: esports/manifest.json - ${error.message}`)
    process.exitCode = 1
  }
}

// ── 主逻辑 ────────────────────────────────────────────────

async function main() {
  console.log('📂 扫描资源目录...\n')
  console.log(`esports source: ${DIR.esports}`)

  const existing = fs.existsSync(OSS_CONFIG)
    ? parseExistingMeta(fs.readFileSync(OSS_CONFIG, 'utf-8'))
    : {}

  // ── 1. Doud 公共案例库 ──
  console.log('\nshowcase library: 使用 Doud public manifest，不扫描官网本地视频目录')
  console.log('avatar-previews: 已并入 Doud public manifest，不扫描官网本地视频目录')

  // ── 2. picture ──
  const picFiles = listFiles(DIR.picture, IMG_EXTS)
  console.log(`\npicture: ${picFiles.length} 个文件`)

  const imgLines = []
  const extraPicLines = []

  picFiles.forEach((filename) => {
    const key = KNOWN_PICTURE_KEYS[filename]
    if (key) {
      imgLines.push(`  ${key.padEnd(10)}: \`\${OSS_PICTURE}/${filename}\`,`)
    } else {
      const autoKey = path.basename(filename, path.extname(filename)).replace(/[^a-zA-Z0-9]/g, '_')
      extraPicLines.push(`  ${autoKey.padEnd(10)}: \`\${OSS_PICTURE}/${filename}\`,`)
      console.log(`  新图片 ${filename} → key: ${autoKey}`)
    }
  })

  // ── 3. esports（图片+视频混排）──
  const esportsFiles = listRelativeFiles(DIR.esports, MEDIA_EXTS)
  const esportsImgFiles = esportsFiles.filter((file) => IMG_EXTS.has(path.extname(file.relPath).toLowerCase()))
  const esportsVideoFiles = esportsFiles.filter((file) => VIDEO_EXTS.has(path.extname(file.relPath).toLowerCase()))
  console.log(`\nesports: ${esportsImgFiles.length} 张图片 + ${esportsVideoFiles.length} 个视频`)

  const esportsEntries = []
  const esportsManifestItems = []

  esportsImgFiles.forEach((file) => {
    const meta = existing[file.relPath] || existing[path.posix.basename(file.relPath)] || {}
    const title = meta.title || titleFromFilename(file.relPath)
    const desc = meta.desc || ''
    const urlPath = encodeOssUrlPath(file.relPath)
    esportsEntries.push(`  { src: \`\${OSS_ESPORTS}/${urlPath}\`, type: 'image', title: ${jsString(title)}, desc: ${jsString(desc)} },`)
    esportsManifestItems.push({
      fileName: path.posix.basename(file.relPath),
      relativePath: file.relPath,
      type: 'image',
      title,
      desc,
    })
  })

  esportsVideoFiles.forEach((file) => {
    const meta = existing[file.relPath] || existing[path.posix.basename(file.relPath)] || {}
    const title = meta.title || titleFromFilename(file.relPath)
    const desc = meta.desc || ''
    process.stdout.write(`  检测 ${file.relPath} ... `)
    const dim = getVideoDimensions(file.filePath)
    const orient = getOrientation(dim)
    console.log(dim ? `${dim.width}x${dim.height} → ${orient}` : '无法读取，默认 wide')
    const flag = orient === 'tall' ? ', tall: true' : orient === 'wide' ? ', wide: true' : ''
    const urlPath = encodeOssUrlPath(file.relPath)
    esportsEntries.push(`  { src: \`\${OSS_ESPORTS}/${urlPath}\`, type: 'video', title: ${jsString(title)}, desc: ${jsString(desc)}${flag} },`)
    esportsManifestItems.push({
      fileName: path.posix.basename(file.relPath),
      relativePath: file.relPath,
      type: 'video',
      title,
      desc,
      width: dim?.width,
      height: dim?.height,
      orientation: orient === 'tall' ? 'portrait' : orient === 'wide' ? 'landscape' : 'square',
    })
  })

  const esportsManifest = {
    version: 1,
    updatedAt: new Date().toISOString(),
    media: esportsManifestItems,
  }

  const ossClient = await syncEsportsToOss(esportsFiles)
  await uploadEsportsManifest(ossClient, esportsManifest)

  // ── 生成 oss.js 内容 ──
  const allImgLines = [...imgLines, ...extraPicLines].join('\n')
  const allEsportsEntries = esportsEntries.join('\n')

  const content = `const DEFAULT_OSS_BASE = ${JSON.stringify(OSS_BASE)}
const DEFAULT_DOUD_PUBLIC_BASE = ${JSON.stringify(DOUD_PUBLIC_BASE)}
const envOssBase = import.meta.env.VITE_OSS_BASE
const envDoudPublicBase = import.meta.env.VITE_DOUD_PUBLIC_BASE

export const OSS_BASE = (envOssBase || DEFAULT_OSS_BASE).replace(/\\/+$/, '')
export const DOUD_PUBLIC_BASE = (envDoudPublicBase || DEFAULT_DOUD_PUBLIC_BASE).replace(/\\/+$/, '')

export const OSS_PICTURE = \`\${OSS_BASE}/picture\`
export const OSS_VIDEOS  = \`\${OSS_BASE}/showcase-videos\`
export const OSS_AVATARS = \`\${OSS_BASE}/avatar-previews\`
export const OSS_ESPORTS = \`\${OSS_BASE}/esports\`
export const OSS_NEWS    = \`\${OSS_BASE}/news\`

// 网页图片
export const img = {
${allImgLines}
}

// 首页宣传片
export const video = {
  yuanqu: \`\${OSS_VIDEOS}/${HERO_VIDEO_FILENAME}\`,
  yuanquPoster: \`\${OSS_VIDEOS}/${HERO_VIDEO_FILENAME}?x-oss-process=video/snapshot,t_0,f_jpg,w_1280,m_fast\`,
}

// 新闻中心
// manifest 来源：oss://jiangyao-site-2026/news/manifest.json
// 图片归档：oss://jiangyao-site-2026/news/images/
// 视频手动归档：oss://jiangyao-site-2026/news/videos/
export const news = {
  manifest: \`\${OSS_NEWS}/manifest.json\`,
  images: \`\${OSS_NEWS}/images\`,
  videos: \`\${OSS_NEWS}/videos\`,
}

// 电竞俱乐部战队影像库（EsportsGalleryModal 使用）
// 来源目录：${toPosix(DIR.esports)}
// OSS 目录：oss://${readUploadConfig().bucket}/esports/
// type: 'image' | 'video'  |  wide/tall: 视频方向
// title / desc 可手动修改，下次运行脚本会保留
export const esportsMedia = [
${allEsportsEntries || '  // 上传文件到本地 esports 源目录后自动生成'}
]
`

  fs.writeFileSync(OSS_CONFIG, content, 'utf-8')
  console.log('\n✅ oss.js 已更新！')
  console.log('   showcase+avatar: 使用 Doud public manifest')
  console.log(`   esports: ${esportsEntries.length} 个媒体文件`)
  console.log(`   图片: ${picFiles.length} 张`)
}

await main()
