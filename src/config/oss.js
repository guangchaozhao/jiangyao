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
}

// 电竞俱乐部战队影像库（EsportsGalleryModal 使用）
// 来源目录：D:/AAACODE/Codetest/Doudtest/avatar/jiangyao-site-2026/esports
// OSS 目录：oss://jiangyao-site-2026/esports/
// type: 'image' | 'video'  |  wide/tall: 视频方向
// title / desc 可手动修改，下次运行脚本会保留
export const esportsMedia = [
  { src: `${OSS_ESPORTS}/img_v3_0211b_b90f68c9-1c2d-4e25-b02f-d174839deb9g.jpg`, type: 'image', title: "Img V3 0211b B90f68c9 1c2d 4e25 B02f D174839deb9g", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_0211c_d7bd9438-c795-4bd1-8f83-599a8b800c1g.jpg`, type: 'image', title: "Img V3 0211c D7bd9438 C795 4bd1 8f83 599a8b800c1g", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_0211c_f1e1940d-ac2f-4ef7-afbd-af02395d677g.jpg`, type: 'image', title: "Img V3 0211c F1e1940d Ac2f 4ef7 Afbd Af02395d677g", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_0211o_2c8e4025-eb38-4b33-97ff-6acd4669a86g.jpg`, type: 'image', title: "Img V3 0211o 2c8e4025 Eb38 4b33 97ff 6acd4669a86g", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_0211o_7b4d41ec-cd39-4427-ad91-fc94cba0095g.jpg`, type: 'image', title: "Img V3 0211o 7b4d41ec Cd39 4427 Ad91 Fc94cba0095g", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_0211o_e8c2158b-fae7-41c1-98c8-1407038ba8bg.jpg`, type: 'image', title: "Img V3 0211o E8c2158b Fae7 41c1 98c8 1407038ba8bg", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_02113_17b8775a-e036-4874-b6f4-93e5d05b749g.jpg`, type: 'image', title: "Img V3 02113 17b8775a E036 4874 B6f4 93e5d05b749g", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_02113_71a13809-1f52-4d09-885b-7f5d3881405g.jpg`, type: 'image', title: "Img V3 02113 71a13809 1f52 4d09 885b 7f5d3881405g", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_02113_a60eacc3-00cb-45ef-818f-70e2972d08ag.jpg`, type: 'image', title: "Img V3 02113 A60eacc3 00cb 45ef 818f 70e2972d08ag", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_02114_067a80c1-c580-4de0-9ce1-1183ca0eb8dg.jpg`, type: 'image', title: "Img V3 02114 067a80c1 C580 4de0 9ce1 1183ca0eb8dg", desc: "" },
  { src: `${OSS_ESPORTS}/img_v3_02114_fb2f4538-5c7d-43d8-942b-568f2a83b40g.jpg`, type: 'image', title: "Img V3 02114 Fb2f4538 5c7d 43d8 942b 568f2a83b40g", desc: "" },
]
