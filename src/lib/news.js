import { news } from '../config/oss'

export const NEWS_CATEGORY_LABELS = {
  all: '全部资讯',
  group: '集团新闻',
  care: '领导关怀',
  cooperation: '合作交流',
}

export const NEWS_CATEGORIES = [
  {
    code: 'NEWS',
    key: 'group',
    title: NEWS_CATEGORY_LABELS.group,
    desc: '发布集团经营动态、重点项目进展、品牌活动与重要公告。',
  },
  {
    code: 'CARE',
    key: 'care',
    title: NEWS_CATEGORY_LABELS.care,
    desc: '记录各级领导调研指导、政策关怀与项目推进情况。',
  },
  {
    code: 'COOP',
    key: 'cooperation',
    title: NEWS_CATEGORY_LABELS.cooperation,
    desc: '呈现政府、企业、高校、赛事机构等合作交流与资源对接。',
  },
]

const normalizeDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

export const formatNewsDate = (value) => {
  const normalized = normalizeDate(value)
  if (!normalized) return '待发布'
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(normalized))
}

const toNewsTime = (value) => {
  const normalized = normalizeDate(value)
  if (!normalized) return 0
  return new Date(normalized).getTime()
}

export const sortNewsByLatest = (items) =>
  [...items].sort((a, b) => {
    const timeDiff = toNewsTime(b.publishedAt) - toNewsTime(a.publishedAt)
    if (timeDiff !== 0) return timeDiff
    return Number(b.order || 0) - Number(a.order || 0)
  })

const stripHtml = (value) =>
  String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const categoryKeys = new Set(NEWS_CATEGORIES.map((item) => item.key))

const inferCategory = (article) => {
  const raw = `${article?.title || ''} ${article?.summary || ''} ${stripHtml(article?.contentHtml || '')}`.slice(0, 2600)
  if (/领导|关怀|调研|指导|考察|视察|莅临|慰问|政策/.test(raw)) return 'care'
  if (/合作|交流|签约|洽谈|共建|入驻|招商|战略|伙伴|校企|赛事机构|媒体/.test(raw)) return 'cooperation'
  return 'group'
}

const normalizeArticle = (article, index) => {
  if (!article || typeof article !== 'object') return null
  const contentHtml = String(article.contentHtml || article.content_html || article.content || '')
  const summary = String(article.summary || stripHtml(contentHtml)).slice(0, 120)
  const sourceName = String(article.sourceName || article.author || article.categoryLabel || '江曜擎天').trim()
  const title = String(article.title || `集团新闻 ${index + 1}`).trim()
  const rawCategory = String(article.category || '').trim()
  const category = categoryKeys.has(rawCategory)
    ? rawCategory
    : inferCategory({ title, summary, contentHtml })
  const categoryLabel = NEWS_CATEGORY_LABELS[category] || NEWS_CATEGORY_LABELS.group

  return {
    id: String(article.id || article.guid || article.url || `news-${index}`),
    order: Number.isFinite(Number(article.order)) ? Number(article.order) : index + 1,
    title,
    category,
    categoryLabel,
    summary,
    cover: article.cover || article.image || article.banner || '',
    originalUrl: article.originalUrl || article.url || article.link || '',
    sourceName,
    publishedAt: normalizeDate(article.publishedAt || article.date_published || article.date || article.pubDate),
    contentHtml,
    videoUrl: article.videoUrl || '',
    videoPoster: article.videoPoster || article.videoCover || '',
    videos: Array.isArray(article.videos) ? article.videos : [],
  }
}

export async function fetchGroupNews() {
  const response = await fetch(news.manifest, {
    headers: { Accept: 'application/json' },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`news manifest request failed: ${response.status}`)
  }

  const manifest = await response.json()
  const items = Array.isArray(manifest) ? manifest : manifest?.articles
  return Array.isArray(items)
    ? sortNewsByLatest(items.map(normalizeArticle).filter(Boolean))
    : []
}
