import { DOUD_PUBLIC_BASE } from '../config/oss'

export const SHOWCASE_CATEGORIES = [
  'photo-to-video',
  'clone-yourself',
  'ugc-ad',
  'tvc-ad',
  'wedding-mv',
  'story-project',
  'ecommerce',
]

export const SHOWCASE_CATEGORY_LABELS = {
  all: '全部案例',
  'photo-to-video': '图片转视频',
  'clone-yourself': '克隆自己',
  'ugc-ad': 'UGC 广告',
  'tvc-ad': 'TVC 广告',
  'wedding-mv': '婚礼纪念',
  'story-project': '动态漫案例',
  ecommerce: '电商转化',
}

const videoExtensions = /\.(mp4|m4v|mov|webm)$/i

const encodePath = (value) =>
  String(value || '')
    .replace(/\\/g, '/')
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/')

const normalizeRelativePath = (value) => {
  const normalized = String(value || '').trim().replace(/\\/g, '/').replace(/^\/+/, '')
  const segments = normalized.split('/').filter(Boolean)
  if (segments.length === 0 || segments.includes('..')) return ''
  return segments.join('/')
}

export const publicShowcaseManifestUrl = () => `${DOUD_PUBLIC_BASE}/manifest.json`

export const publicShowcaseAssetUrl = (section, relativePath) => {
  const encoded = encodePath(relativePath)
  return encoded ? `${DOUD_PUBLIC_BASE}/${section}/${encoded}` : ''
}

export const posterPathFor = (relativePath) => relativePath.replace(videoExtensions, '.jpg')

export const categoryLabel = (category) =>
  SHOWCASE_CATEGORY_LABELS[category] || category?.replace(/-/g, ' ') || SHOWCASE_CATEGORY_LABELS.all

const extractIndex = (fileName) => {
  const stem = String(fileName || '').split(/[\\/]/).pop()?.replace(/\.[^.]+$/, '') || ''
  const match = stem.match(/(\d{1,3})$/)
  return match ? match[1].padStart(2, '0') : ''
}

const titleFromEntry = (entry) => {
  const label = categoryLabel(entry.category)
  const index = extractIndex(entry.fileName || entry.relativePath)
  return index ? `${label} ${index}` : label
}

const normalizeEntry = (entry, index) => {
  const relativePath = normalizeRelativePath(entry?.relativePath)
  if (!relativePath || !videoExtensions.test(relativePath)) return null

  const note = typeof entry?.note === 'string' ? entry.note.trim() : ''
  const category = SHOWCASE_CATEGORIES.includes(entry.category)
    ? entry.category
    : relativePath.split('/')[0] || 'all'
  const width = Number(entry.width)
  const height = Number(entry.height)
  const orientation = entry.orientation === 'portrait' || entry.orientation === 'landscape'
    ? entry.orientation
    : width > 0 && height > 0 && height > width
      ? 'portrait'
      : 'landscape'

  return {
    id: `public-library-${relativePath.replace(/[\\/]/g, '__') || index}`,
    fileName: entry.fileName || relativePath.split('/').pop(),
    relativePath,
    category,
    title: note || titleFromEntry({ ...entry, category, relativePath }),
    desc: note || categoryLabel(category),
    src: publicShowcaseAssetUrl('library', relativePath),
    poster: publicShowcaseAssetUrl('library', posterPathFor(relativePath)),
    width: width > 0 ? width : undefined,
    height: height > 0 ? height : undefined,
    orientation,
    wide: orientation === 'landscape',
    tall: orientation === 'portrait',
  }
}

export async function fetchPublicShowcaseVideos() {
  const response = await fetch(publicShowcaseManifestUrl(), {
    headers: { Accept: 'application/json' },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`manifest request failed: ${response.status}`)
  }

  const manifest = await response.json()
  const library = Array.isArray(manifest?.library) ? manifest.library : []
  return library
    .map(normalizeEntry)
    .filter(Boolean)
}
