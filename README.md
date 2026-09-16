# Hong

基于 [Monograph](https://github.com/xocothemes/monograph) 的中文个人技术博客，使用 Astro 生成静态页面，通过 GitHub Actions 发布到 GitHub Pages。Cloudflare 管理自定义域名的 DNS，网站内容由 GitHub Pages 提供，无需自建服务器。

- 博客：[honghuang.foomansoft.com](https://honghuang.foomansoft.com/)
- 源码：[BBC6BAE9/blog](https://github.com/BBC6BAE9/blog)
- RSS：[订阅最新文章](https://honghuang.foomansoft.com/rss.xml)
- 原来的[个人主页](https://bbc6bae9.github.io/zh/)继续独立保留。

## 本地运行

安装 Node.js 22.12 或更新版本，推荐与发布流程一致的 Node.js 24。

```bash
git clone https://github.com/BBC6BAE9/blog.git
cd blog
npm install
npm run dev
```

打开终端显示的地址，通常是 [localhost:4321/](http://localhost:4321/)。

## 写一篇文章

```bash
npm run new-post -- swiftui-notes
```

这会创建 `src/content/posts/swiftui-notes/index.md`，自动填写日期、作者和草稿状态。文章地址将是 `/post/swiftui-notes/`，请使用小写英文、数字与连字符作为目录名。重复的目录名不会覆盖已有内容。

编辑文件顶部的标题、摘要和分类，然后用 Markdown 写正文：

```yaml
title: "我的 SwiftUI 笔记"
excerpt: "这篇文章要解决什么问题。"
category: "Apple 平台"
date: 2026-09-16T10:00:00+08:00
author:
  name: "Hong Huang"
  role: "全栈开发者"
featured: false
draft: false
```

保留生成文件里的 `---` 分隔符。可选分类为 **Apple 平台、AI 与生成式 UI、工程实践、随笔**；`featured: true` 会加入精选文章。需要更新日期时，可以添加 `updatedDate` 字段。

新文章默认为 `draft: true`，不会出现在网站或本地预览中。准备查看效果时，先在本地改为 `draft: false`，再运行 `npm run dev`。在提交前也可以改回草稿状态。文章图片可以放在同一目录，用 `![图片说明](./image.png)` 引用；需要组件时可使用 `.mdx`。

## 发布与更新

检查通过后，把文章提交到 `main` 分支：

```bash
npm run check
npm run build
git add src/content/posts/swiftui-notes
git commit -m "docs: publish SwiftUI notes"
git push origin main
```

[GitHub Actions](https://github.com/BBC6BAE9/blog/actions) 会自动检查、构建并部署。等待部署成功后，刷新博客即可看到更新；不需要手动上传 `dist`。也可以直接在 GitHub 网页编辑 Markdown 并提交到 `main`。

发布流程位于 `.github/workflows/deploy.yml`，Pages 的发布来源应设为 **GitHub Actions**。本地查看正式构建效果可运行 `npm run preview`。

## 修改博客信息

| 文件                       | 用途                                         |
| -------------------------- | -------------------------------------------- |
| `src/config/site.ts`       | 博客名称、简介、社交链接、评论和邮件订阅配置 |
| `src/config/categories.ts` | 分类名称、网址与介绍                         |
| `src/pages/about.astro`    | 关于我                                       |
| `src/pages/contact.astro`  | 联系方式                                     |
| `src/pages/privacy.astro`  | 隐私说明                                     |
| `src/styles/global.css`    | 字体、颜色与阅读样式                         |

站点使用自定义域名 `honghuang.foomansoft.com` 的根路径 `/`。`src/config/site.ts` 的 `siteUrl` 为 `https://honghuang.foomansoft.com/`，`astro.config.mjs` 的 `base` 为 `/`。组件中的站内链接使用 `withBase()`；Markdown 正文中的站内链接从根路径开始，例如 `/post/swiftui-notes/`、`/media/example.png`，不再添加 `/blog/`。

GitHub 仓库 Pages 设置中的 Custom domain 应为 `honghuang.foomansoft.com`；Cloudflare DNS 添加名称为 `honghuang`、目标为 `bbc6bae9.github.io` 的 CNAME 记录，代理状态使用“仅 DNS”。此仓库通过 GitHub Actions 部署，域名以 Pages 设置为准，不依赖仓库里的 CNAME 文件。GitHub 签发证书后启用 Enforce HTTPS。

文章的公开地址与长期标识分别维护。`src/lib/posts.ts` 的 `postIdentity()` 保留最初的 `blog/post/<slug>/` 命名空间，用于 giscus 评论匹配和 RSS GUID。以后更换域名或路径也不要改变这个标识；已有文章的目录名同样应保持稳定。RSS 的文章链接使用当前域名，GUID 则保留原 GitHub Pages URL 字符串。

## 评论与订阅

**评论**使用 giscus，内容存放在 `BBC6BAE9/blog` 的 GitHub Discussions。发表评论需要 GitHub 账号。如果评论不能加载，请确认仓库已启用 Discussions、[giscus GitHub App](https://github.com/apps/giscus) 已获准访问 `blog` 仓库，并核对 `src/config/site.ts` 中的仓库与分类配置。

**RSS**已经内置，不需要读者注册或提供邮箱。

**邮件订阅**已连接 [follow.it 免费套餐](https://follow.it/hong?leanpub)，读取博客 RSS 并把新文章发送给订阅者。读者在首页输入邮箱后，按页面和邮件提示确认订阅，并可通过邮件退订。邮件可能包含 follow.it 的推荐内容，免费套餐非即时发送。管理订阅者和统计需在 follow.it 注册并认领网站；普通读者可直接订阅。

域名迁移继续沿用现有 follow.it 订阅源与表单，保留已有订阅者；迁移后需确认该订阅源仍能读取 RSS，必要时在原订阅源中更新地址。

站点使用[公开的订阅表单配置](https://follow.it/follow-form/hong)，不需要放入邮件密码或 API 密钥。更换服务时，请同步更新订阅组件和隐私说明。

## 主题与许可

主题来自 [Monograph / xocothemes](https://github.com/xocothemes/monograph)，作者 Andrei Alba。本项目保留原主题的 [MIT 许可及资源许可说明](./LICENSE)。

[上游 CUSTOMIZATION.md](./CUSTOMIZATION.md) 可用于参考主题样式与 MDX 组件；本站的中文内容、评论、联系页面和订阅接入方式以当前代码及本说明为准。
