import { getCollection } from "astro:content";
import { categoryLabel } from "@/config/categories";
import type { Locale } from "@/i18n";
import { formatDate, postHref, readingLabel, visiblePosts } from "@/lib/posts";

export const createSearchIndexResponse = async (locale: Locale) => {
  const posts = visiblePosts(await getCollection("posts"), locale);
  const index = posts.map((post) => ({
    title: post.data.title,
    excerpt: post.data.excerpt,
    href: postHref(post, locale),
    author: post.data.author.name,
    category: categoryLabel(post.data.category, locale),
    date: formatDate(post.data.date, locale),
    reading: readingLabel(post, locale),
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
