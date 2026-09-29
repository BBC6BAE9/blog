// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import rehypeSlug from "rehype-slug";
import { siteConfig } from "./src/config/site.ts";
import { codeThemes, codeDefaultColor } from "./src/config/code.ts";

import mdx from "@astrojs/mdx";

const shikiConfig = /** @type {const} */ ({
  themes: codeThemes,
  defaultColor: codeDefaultColor,
});

export default defineConfig({
  site: siteConfig.siteUrl,
  base: "/",
  trailingSlash: "always",
  i18n: {
    locales: ["zh-CN", "en", "ja"],
    defaultLocale: "zh-CN",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !pathname.endsWith("/search/") && !pathname.endsWith("/404/");
      },
    }),
    mdx(),
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug],
    }),
    shikiConfig,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
