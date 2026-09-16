import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const [slug, ...extra] = process.argv.slice(2);
if (!slug || extra.length > 0 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("用法：npm run new-post -- swiftui-notes");
  console.error("文章地址请使用小写英文字母、数字和连字符，例如 swiftui-notes。");
  process.exit(1);
}

const root = fileURLToPath(new URL("../", import.meta.url));
const directory = path.join(root, "src", "content", "posts", slug);
const file = path.join(directory, "index.md");
const content = `---
title: "在这里填写文章标题"
excerpt: "用一两句话介绍这篇文章。"
category: "随笔"
date: ${new Date().toISOString()}
author:
  name: "Hong Huang"
  role: "全栈开发者"
featured: false
draft: true
---

在这里开始写作。

## 一个小标题

记录问题、思路与实践。
`;

try {
  await mkdir(directory);
  await writeFile(file, content, { encoding: "utf8", flag: "wx" });
  console.log(`已创建：src/content/posts/${slug}/index.md`);
  console.log("文章目前是草稿。写好后将 draft 改为 false，再本地预览并提交发布。");
} catch (error) {
  if (error.code === "EEXIST") {
    console.error(`文章目录 ${slug} 已存在，请换一个地址；原文件未修改。`);
  } else {
    console.error(`创建失败：${error.message}`);
  }
  process.exit(1);
}
