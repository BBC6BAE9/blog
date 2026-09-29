import { createSearchIndexResponse } from "@/lib/search-index";

/**
 * Static search index consumed by the header command palette. It holds post
 * metadata only, never the article body, so it stays small enough to fetch on
 * the first search.
 */
export async function GET() {
  return createSearchIndexResponse("zh-CN");
}
