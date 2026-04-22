const BASE = 'https://jiangyao-site-2026.oss-cn-shenzhen.aliyuncs.com'

export const OSS_PICTURE = `${BASE}/picture`
export const OSS_VIDEOS  = `${BASE}/showcase-videos`
export const OSS_AVATARS = `${BASE}/avatar-previews`

// 网页图片
export const img = {
  jiangyao: `${OSS_PICTURE}/jiangyao.png`,
  xingchen: `${OSS_PICTURE}/xingchen.png`,
  touxiang: `${OSS_PICTURE}/touxiang.png`,
  tianyuan: `${OSS_PICTURE}/tianyuan.png`,
  xiaogang: `${OSS_PICTURE}/xiaogang.png`,
  zhanghui: `${OSS_PICTURE}/zhanghui.png`,
  chengxi:  `${OSS_PICTURE}/chengxi.png`,
  park1:    `${OSS_PICTURE}/1.jpg`,
  park2:    `${OSS_PICTURE}/2.jpg`,
  park3:    `${OSS_PICTURE}/3.png`,
  park4:    `${OSS_PICTURE}/4.png`,
  park5:    `${OSS_PICTURE}/5.png`,
  park6:    `${OSS_PICTURE}/6.png`,
}

// 首页宣传片
export const video = {
  yuanqu: `${OSS_VIDEOS}/yuanqu.mp4`,
}

// 案例库视频列表（VideoGalleryModal 使用）
// wide: 横版 | tall: 竖版 | 不填: 方形
export const showcaseVideos = [
  { src: `${OSS_VIDEOS}/001.mp4`,      title: '案例 001',   desc: '', wide: true },
  { src: `${OSS_VIDEOS}/002.mp4`,      title: '案例 002',   desc: '', wide: true },
  { src: `${OSS_VIDEOS}/003.mp4`,      title: '案例 003',   desc: '', wide: true },
  { src: `${OSS_VIDEOS}/TVC01.MP4`,    title: 'TVC 01',     desc: '', wide: true },
  { src: `${OSS_VIDEOS}/TVC02.mp4`,    title: 'TVC 02',     desc: '', wide: true },
  { src: `${OSS_VIDEOS}/TVC03.mp4`,    title: 'TVC 03',     desc: '', wide: true },
  { src: `${OSS_VIDEOS}/UGC01.MP4`,    title: 'UGC 01',     desc: '', tail: true },
  { src: `${OSS_VIDEOS}/UGC02.mp4`,    title: 'UGC 02',     desc: '', tall: true },
  { src: `${OSS_VIDEOS}/wedding01.mp4`,title: '婚礼案例 01', desc: '', tall: true },
  { src: `${OSS_VIDEOS}/wedding02.mp4`,title: '婚礼案例 02', desc: '', tall: true },
  { src: `${OSS_AVATARS}/avatar01.mp4`,title: '形象片 01',   desc: '', tall: true },
  { src: `${OSS_AVATARS}/avatar02.mp4`,title: '形象片 02',   desc: '', tall: true },
  { src: `${OSS_AVATARS}/avatar03.mp4`,title: '形象片 03',   desc: '', tall: true },
]
