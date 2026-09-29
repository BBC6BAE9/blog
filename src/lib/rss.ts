import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site";
import { getMessages, localeMeta, localizedPath, type Locale } from "@/i18n";
import { postHref, postIdentity, visiblePosts } from "@/lib/posts";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const createRssResponse = async (locale: Locale) => {
  const copy = getMessages(locale);
  const posts = visiblePosts(await getCollection("posts"), locale).slice(0, 20);
  const items = posts
    .map((post) => {
      const url = new URL(postHref(post, locale), siteConfig.siteUrl).toString();
      // Keep the original item ID so domain and locale route changes do not
      // republish an existing post to subscribers.
      const guid = new URL(postIdentity(post), "https://bbc6bae9.github.io/").toString();
      return `<item>
  <title>${escapeXml(post.data.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="false">${escapeXml(guid)}</guid>
  <pubDate>${post.data.date.toUTCString()}</pubDate>
  <description>${escapeXml(post.data.excerpt)}</description>
</item>`;
    })
    .join("\n");

  const channelUrl = new URL(localizedPath(locale, "/"), siteConfig.siteUrl).toString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteConfig.name)}</title>
  <link>${channelUrl}</link>
  <description>${escapeXml(copy.site.description)}</description>
  <language>${escapeXml(localeMeta[locale].htmlLang)}</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
};
