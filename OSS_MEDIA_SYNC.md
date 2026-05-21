# 官网素材上传备忘

## 电竞影像库

本地维护目录：

```text
D:\AAACODE\Codetest\Doudtest\avatar\jiangyao-site-2026\esports
```

把图片或视频放进这个目录后，进入官网项目：

```powershell
cd D:\AAACODE\Codetest\jiangyao
npm run sync:oss
```

脚本会上传到：

```text
oss://jiangyao-site-2026/esports/
```

同时会更新并上传：

```text
oss://jiangyao-site-2026/esports/manifest.json
```

官网的「查看战队影像库」运行时读取这个 manifest：

```text
https://jiangyao-site-2026.oss-cn-shenzhen.aliyuncs.com/esports/manifest.json
```

## 是否需要构建

只增删替换电竞图片/视频时：

```text
不需要重新 build，不需要重新部署前端。
```

只需要跑：

```powershell
npm run sync:oss
```

只有改了前端代码、样式、组件逻辑时，才需要：

```powershell
npm run build
```

然后重新部署 `dist`。

## 常见检查

如果官网没有看到新图，先检查：

```text
1. 本地文件是否放在 esports 目录。
2. npm run sync:oss 是否显示 uploaded 或 manifest.json uploaded。
3. manifest.json 是否能访问。
4. 浏览器是否缓存了旧页面，刷新后重新打开影像库。
```

同步成功时通常会看到：

```text
uploaded: oss://jiangyao-site-2026/esports/xxx.jpg
uploaded: oss://jiangyao-site-2026/esports/manifest.json
```
