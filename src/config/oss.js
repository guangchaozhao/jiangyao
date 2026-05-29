const DEFAULT_OSS_BASE = "https://jiangyao-site-2026.oss-cn-shenzhen.aliyuncs.com"
const DEFAULT_DOUD_PUBLIC_BASE = "https://media.doudai.cc/avatar"
const envOssBase = import.meta.env.VITE_OSS_BASE
const envDoudPublicBase = import.meta.env.VITE_DOUD_PUBLIC_BASE

export const OSS_BASE = (envOssBase || DEFAULT_OSS_BASE).replace(/\/+$/, '')
export const DOUD_PUBLIC_BASE = (envDoudPublicBase || DEFAULT_DOUD_PUBLIC_BASE).replace(/\/+$/, '')

export const OSS_PICTURE = `${OSS_BASE}/picture`
export const OSS_VIDEOS  = `${OSS_BASE}/showcase-videos`
export const OSS_AVATARS = `${OSS_BASE}/avatar-previews`
export const OSS_ESPORTS = `${OSS_BASE}/esports`
export const OSS_NEWS    = `${OSS_BASE}/news`

// 网页图片
export const img = {
  park1     : `${OSS_PICTURE}/1.jpg`,
  park2     : `${OSS_PICTURE}/2.jpg`,
  park3     : `${OSS_PICTURE}/3.png`,
  park4     : `${OSS_PICTURE}/4.png`,
  park5     : `${OSS_PICTURE}/5.png`,
  park6     : `${OSS_PICTURE}/6.png`,
  chengxi   : `${OSS_PICTURE}/chengxi.png`,
  jiangyao  : `${OSS_PICTURE}/jiangyao.png`,
  tianyuan  : `${OSS_PICTURE}/tianyuan.png`,
  touxiang  : `${OSS_PICTURE}/touxiang.png`,
  xiaogang  : `${OSS_PICTURE}/xiaogang.png`,
  xingchen  : `${OSS_PICTURE}/xingchen.png`,
  zhanghui  : `${OSS_PICTURE}/zhanghui.png`,
}

// 首页宣传片
export const video = {
  yuanqu: `${OSS_VIDEOS}/yuanqu.mp4`,
  yuanquPoster: `${OSS_VIDEOS}/yuanqu.mp4?x-oss-process=video/snapshot,t_0,f_jpg,w_1280,m_fast`,
}

// 新闻中心
// manifest 来源：oss://jiangyao-site-2026/news/manifest.json
// 图片归档：oss://jiangyao-site-2026/news/images/
// 视频手动归档：oss://jiangyao-site-2026/news/videos/
export const news = {
  manifest: `${OSS_NEWS}/manifest.json`,
  images: `${OSS_NEWS}/images`,
  videos: `${OSS_NEWS}/videos`,
}

// 电竞俱乐部战队影像库（EsportsGalleryModal 使用）
// 来源目录：D:/AAACODE/Codetest/Doudtest/avatar/jiangyao-site-2026/esports
// OSS 目录：oss://jiangyao-site-2026/esports/
// type: 'image' | 'video'  |  wide/tall: 视频方向
// title / desc 可手动修改，下次运行脚本会保留
export const esportsMedia = [
  // 上传文件到本地 esports 源目录后自动生成
]
