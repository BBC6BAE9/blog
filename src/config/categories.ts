import type { Locale } from "@/i18n";

export const categories = ["Apple 平台", "AI 与生成式 UI", "工程实践", "随笔"] as const;
export type Category = (typeof categories)[number];

const categorySlugs: Record<Category, string> = {
  "Apple 平台": "apple",
  "AI 与生成式 UI": "ai",
  工程实践: "engineering",
  随笔: "notes",
};
export const categorySlug = (category: string) =>
  categorySlugs[category as Category] ??
  encodeURIComponent(category.toLowerCase().trim().replace(/\s+/g, "-"));

const categoryCopy: Record<Locale, Record<Category, { label: string; description: string }>> = {
  "zh-CN": {
    "Apple 平台": {
      label: "Apple 平台",
      description: "Swift、SwiftUI，以及 iOS、macOS 与 visionOS 开发。",
    },
    "AI 与生成式 UI": {
      label: "AI 与生成式 UI",
      description: "Agent、原生界面，以及 AI 与应用的连接方式。",
    },
    工程实践: {
      label: "工程实践",
      description: "播放器、开发工具、测试与日常软件工程。",
    },
    随笔: {
      label: "随笔",
      description: "关于学习、开发与这个博客的记录。",
    },
  },
  en: {
    "Apple 平台": {
      label: "Apple Platforms",
      description: "Swift, SwiftUI, and development for iOS, macOS, and visionOS.",
    },
    "AI 与生成式 UI": {
      label: "AI & Generative UI",
      description: "Agents, native interfaces, and the ways AI connects with applications.",
    },
    工程实践: {
      label: "Engineering",
      description: "Media playback, developer tools, testing, and everyday software engineering.",
    },
    随笔: {
      label: "Notes",
      description: "Notes on learning, building software, and maintaining this blog.",
    },
  },
  ja: {
    "Apple 平台": {
      label: "Apple プラットフォーム",
      description: "Swift、SwiftUI、iOS、macOS、visionOS の開発。",
    },
    "AI 与生成式 UI": {
      label: "AI と生成 UI",
      description: "エージェント、ネイティブ UI、そして AI とアプリケーションをつなぐ方法。",
    },
    工程实践: {
      label: "エンジニアリング",
      description: "メディア再生、開発ツール、テスト、日々のソフトウェアエンジニアリング。",
    },
    随笔: {
      label: "ノート",
      description: "学び、ソフトウェア開発、このブログの運営に関する記録。",
    },
  },
};

export const categoryLabel = (category: Category, locale: Locale) =>
  categoryCopy[locale][category].label;

export const categoryDescription = (category: Category, locale: Locale) =>
  categoryCopy[locale][category].description;
