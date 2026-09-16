export const categories = ["Apple 平台", "AI 与生成式 UI", "工程实践", "随笔"] as const;
export type Category = (typeof categories)[number];
const categorySlugs: Record<Category, string> = {
  "Apple 平台": "apple",
  "AI 与生成式 UI": "ai",
  "工程实践": "engineering",
  "随笔": "notes",
};
export const categorySlug = (category: string) =>
  categorySlugs[category as Category] ?? encodeURIComponent(category.toLowerCase().trim().replace(/\s+/g, "-"));
export const categoryDescriptions: Record<Category, string> = {
  "Apple 平台": "Swift、SwiftUI，以及 iOS、macOS 与 visionOS 开发。",
  "AI 与生成式 UI": "Agent、原生界面，以及 AI 与应用的连接方式。",
  "工程实践": "播放器、开发工具、测试与日常软件工程。",
  "随笔": "关于学习、开发与这个博客的记录。",
};
