# Jiangyao 官网

Vite + Vue 3 + Tailwind CSS。

## OSS 资源同步

电竞影像本地维护目录：

```text
D:\AAACODE\Codetest\Doudtest\avatar\jiangyao-site-2026\esports
```

同步命令：

```bash
npm run sync:oss
```

脚本会上传该目录下的图片/视频到 `oss://jiangyao-site-2026/esports/`，同时上传 `oss://jiangyao-site-2026/esports/manifest.json`。官网战队影像库运行时读取这个 manifest，新媒体同步后不需要为了列表重新打包前端。

只生成配置、不上传时使用：

```bash
npm run sync:oss -- --no-upload
```
