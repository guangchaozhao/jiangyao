# 新线程接手提示

请先阅读本文件，再继续处理 `D:\AAACODE\Codetest\jiangyao` 项目。

## 基本规则

- 终端命令必须使用 PowerShell 7：`C:\Program Files\PowerShell\7\pwsh.exe -Command "<命令>"`。
- 命令里涉及中文输出时，先设置：`[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`。
- 用户未明确说开始做、继续、按方案执行时，不要主动改文件。
- 用户的 git 提交通常是全量提交，不要只提交部分改动。
- 默认远端是 Gitee：`https://gitee.com/zgc66`，不要默认推 GitHub。

## 项目概况

- 技术栈：Vite + Vue 3 + Tailwind CSS。
- 入口：`src/App.vue`、`src/main.js`、`src/style.css`。
- OSS 资源配置集中在：`src/config/oss.js`。
- OSS 同步脚本：`scripts/sync-oss.js`，命令：`npm run sync:oss`。
- 电竞影像 OSS 目标：`oss://jiangyao-site-2026/esports/`。
- 主要展示组件在 `src/components/`，当前业务入口重点是 `BusinessSection.vue`。

## 当前 OSS 接入方式

- 前端运行时通过 `VITE_OSS_BASE` 覆盖官网图片/首页视频 OSS 公共访问地址。
- Doud AI 案例库不再读取本地 `src/showcase-videos` / `src/avatar-previews`，统一读取 `VITE_DOUD_PUBLIC_BASE/manifest.json`。
- 没有配置时，默认使用旧地址：`https://jiangyao-site-2026.oss-cn-shenzhen.aliyuncs.com`。
- Doud 公共案例库默认地址：`https://media.doudai.cc/avatar`。
- 新 OSS 地址建议写到 `.env.local`：

```env
VITE_OSS_BASE=https://你的新bucket或cdn域名
VITE_DOUD_PUBLIC_BASE=https://media.doudai.cc/avatar
```

- `sync-oss.js` 也会读取 `.env.local` / `.env` / 环境变量里的 `VITE_OSS_BASE` 或 `OSS_BASE`，并重新生成 `src/config/oss.js`。
- `sync-oss.js` 会扫描本地电竞影像目录，生成 `esportsMedia`，上传媒体到 `oss://jiangyao-site-2026/esports/`，并上传 `oss://jiangyao-site-2026/esports/manifest.json`。官网战队影像库运行时读取这个 manifest。
- `sync-oss.js` 不再生成案例库静态数组，案例库由 Doud 公共 `manifest.json` 驱动。

## 本地资源目录

- 图片：`src/picture`
- 案例视频：不再维护本地目录，来自 `https://media.doudai.cc/avatar/manifest.json` 的 `library`
- 形象片：不再维护独立来源，`clone-yourself` 分类承担数字人案例展示
- 电竞照片/视频：`D:\AAACODE\Codetest\Doudtest\avatar\jiangyao-site-2026\esports`

历史的大视频目录已经放入 `.gitignore`，当前电竞媒体改为仓库外目录维护，不提交到仓库。

## 接下来通常要做

1. 让用户提供新 OSS 的公共访问地址，必要时确认图片/首页视频目录结构是否仍是 `picture/`、`showcase-videos/`、`esports/`。
2. 写入 `.env.local` 或让部署环境配置 `VITE_OSS_BASE`。
3. Doud 案例库只维护主项目的 `backend/avatar/manifest.json`，并同步到 `https://media.doudai.cc/avatar/manifest.json`。
4. 如果电竞媒体资源有增删，放到 `D:\AAACODE\Codetest\Doudtest\avatar\jiangyao-site-2026\esports`，运行 `npm run sync:oss` 上传 OSS 并更新 `src/config/oss.js`。
5. 运行 `npm run build` 验证。
6. 如涉及上线，确认 OSS/CORS/视频快照参数可用，特别是 `HeroSection.vue` 里的 `x-oss-process=video/snapshot`。
