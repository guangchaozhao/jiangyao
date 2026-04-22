/**
 * sync-oss.js
 * 自动扫描本地三个资源目录，用 ffprobe 检测视频宽高，更新 src/config/oss.js
 *
 * 使用方法：
 *   node scripts/sync-oss.js
 *
 * 特性：
 *   - 已有视频的 title / desc 会保留，不会被覆盖
 *   - 新增视频自动检测横/竖，用文件名作默认 title
 *   - 删除的文件从列表移除
 *   - picture 目录新增文件自动追加到 img 对象
 */

const fs      = require('fs')
const path    = require('path')
const { execFileSync } = require('child_process')
const ffprobe = require('ffprobe-static').path

// ── 路径配置 ──────────────────────────────────────────────
const ROOT       = path.join(__dirname, '..')
const SRC        = path.join(ROOT, 'src')
const OSS_CONFIG = path.join(SRC, 'config', 'oss.js')

const DIR = {
  picture:  path.join(SRC, 'picture'),
  showcase: path.join(SRC, 'showcase-videos'),
  avatars:  path.join(SRC, 'avatar-previews'),
}

const OSS_BASE    = 'https://jiangyao-site-2026.oss-cn-shenzhen.aliyuncs.com'
const OSS_PICTURE = `${OSS_BASE}/picture`
const OSS_VIDEOS  = `${OSS_BASE}/showcase-videos`
const OSS_AVATARS = `${OSS_BASE}/avatar-previews`

// picture 目录中已知 key 映射（固定不变）
const KNOWN_PICTURE_KEYS = {
  'jiangyao.png': 'jiangyao',
  'xingchen.png': 'xingchen',
  'touxiang.png': 'touxiang',
  'tianyuan.png': 'tianyuan',
  'xiaogang.png': 'xiaogang',
  'zhanghui.png': 'zhanghui',
  'chengxi.png':  'chengxi',
  '1.jpg': 'park1', '2.jpg': 'park2', '3.png': 'park3',
  '4.png': 'park4', '5.png': 'park5', '6.png': 'park6',
}

const VIDEO_EXTS = new Set(['.mp4', '.mov', '.avi', '.mkv', '.webm'])
const IMG_EXTS   = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'])

// ── 工具函数 ──────────────────────────────────────────────

function listFiles(dir, extSet) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => extSet.has(path.extname(f).toLowerCase()))
    .sort()
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
    const video = json.streams?.find(s => s.codec_type === 'video')
    if (!video) return null
    const w = video.width, h = video.height
    // 处理旋转元数据（手机竖拍）
    const rotate = parseInt(video.tags?.rotate || video.side_data_list?.[0]?.rotation || '0')
    if (Math.abs(rotate) === 90 || Math.abs(rotate) === 270) return { width: h, height: w }
    return { width: w, height: h }
  } catch {
    return null
  }
}

/** 根据宽高判断方向 */
function getOrientation(dim) {
  if (!dim) return 'wide'   // 默认横版
  if (dim.width > dim.height) return 'wide'
  if (dim.height > dim.width) return 'tall'
  return 'square'
}

/** 从文件名生成可读标题 */
function titleFromFilename(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

// ── 读取现有 oss.js 中的视频元数据（title / desc）────────

function parseExistingMeta(ossJsContent) {
  const meta = {}  // src → { title, desc }
  const regex = /\{\s*src:\s*`([^`]+)`[^}]*title:\s*'([^']*)'[^}]*desc:\s*'([^']*)'/g
  let m
  while ((m = regex.exec(ossJsContent)) !== null) {
    const [, src, title, desc] = m
    // 取路径最后一段作为 key（文件名含扩展名）
    const key = src.split('/').pop()
    meta[key] = { title, desc }
  }
  return meta
}

// ── 主逻辑 ────────────────────────────────────────────────

function main() {
  console.log('📂 扫描资源目录...\n')

  // 读取现有 oss.js 保留用户已填写的 title/desc
  const existing = fs.existsSync(OSS_CONFIG)
    ? parseExistingMeta(fs.readFileSync(OSS_CONFIG, 'utf-8'))
    : {}

  // ── 1. showcase-videos ──
  const showcaseFiles = listFiles(DIR.showcase, VIDEO_EXTS)
  console.log(`showcase-videos: ${showcaseFiles.length} 个文件`)

  const showcaseEntries = showcaseFiles.map(filename => {
    const filePath = path.join(DIR.showcase, filename)
    const key = filename
    const meta = existing[key] || {}
    const title = meta.title || titleFromFilename(filename)
    const desc  = meta.desc  || ''

    let orient = 'wide'
    if (!meta.title) {  // 新文件才检测
      process.stdout.write(`  检测 ${filename} ... `)
      const dim = getVideoDimensions(filePath)
      orient = getOrientation(dim)
      console.log(dim ? `${dim.width}x${dim.height} → ${orient}` : '无法读取，默认 wide')
    } else {
      // 已有元数据，仍检测方向（可能之前没检测过）
      const dim = getVideoDimensions(filePath)
      orient = getOrientation(dim)
    }

    const flag = orient === 'wide' ? ', wide: true'
               : orient === 'tall' ? ', tall: true'
               : ''
    return `  { src: \`\${OSS_VIDEOS}/${filename}\`, title: '${title}', desc: '${desc}'${flag} },`
  })

  // ── 2. avatar-previews ──
  const avatarFiles = listFiles(DIR.avatars, VIDEO_EXTS)
  console.log(`\navatar-previews: ${avatarFiles.length} 个文件`)

  const avatarEntries = avatarFiles.map(filename => {
    const filePath = path.join(DIR.avatars, filename)
    const key = filename
    const meta = existing[key] || {}
    const title = meta.title || titleFromFilename(filename)
    const desc  = meta.desc  || ''

    process.stdout.write(`  检测 ${filename} ... `)
    const dim = getVideoDimensions(filePath)
    const orient = getOrientation(dim)
    console.log(dim ? `${dim.width}x${dim.height} → ${orient}` : '无法读取，默认 tall')

    const flag = orient === 'wide' ? ', wide: true'
               : orient === 'square' ? ''
               : ', tall: true'
    return `  { src: \`\${OSS_AVATARS}/${filename}\`, title: '${title}', desc: '${desc}'${flag} },`
  })

  // ── 3. picture ──
  const picFiles = listFiles(DIR.picture, IMG_EXTS)
  console.log(`\npicture: ${picFiles.length} 个文件`)

  const imgLines = []
  const extraPicLines = []

  picFiles.forEach(filename => {
    const key = KNOWN_PICTURE_KEYS[filename]
    if (key) {
      imgLines.push(`  ${key.padEnd(10)}: \`\${OSS_PICTURE}/${filename}\`,`)
    } else {
      // 未知图片，自动追加
      const autoKey = path.basename(filename, path.extname(filename)).replace(/[^a-zA-Z0-9]/g, '_')
      extraPicLines.push(`  ${autoKey.padEnd(10)}: \`\${OSS_PICTURE}/${filename}\`,`)
      console.log(`  新图片 ${filename} → key: ${autoKey}`)
    }
  })

  // ── 生成 oss.js 内容 ──
  const allVideoEntries = [...showcaseEntries, ...avatarEntries].join('\n')
  const allImgLines     = [...imgLines, ...extraPicLines].join('\n')

  const content = `const BASE = '${OSS_BASE}'

export const OSS_PICTURE = \`\${BASE}/picture\`
export const OSS_VIDEOS  = \`\${BASE}/showcase-videos\`
export const OSS_AVATARS = \`\${BASE}/avatar-previews\`

// 网页图片
export const img = {
${allImgLines}
}

// 首页宣传片
export const video = {
  yuanqu: \`\${OSS_VIDEOS}/yuanqu.mp4\`,
}

// 案例库视频列表（VideoGalleryModal 使用）
// wide: 横版 | tall: 竖版 | 不填: 方形
// title / desc 可手动修改，下次运行脚本会保留
export const showcaseVideos = [
${allVideoEntries}
]
`

  fs.writeFileSync(OSS_CONFIG, content, 'utf-8')
  console.log(`\n✅ oss.js 已更新！共 ${showcaseEntries.length + avatarEntries.length} 个视频，${picFiles.length} 张图片`)
}

main()
