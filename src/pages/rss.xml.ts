import { createRssResponse } from "@/lib/rss";

export async function GET() {
  return createRssResponse("zh-CN");
}
