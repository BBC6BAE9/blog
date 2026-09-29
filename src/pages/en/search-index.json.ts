import { createSearchIndexResponse } from "@/lib/search-index";

export async function GET() {
  return createSearchIndexResponse("en");
}
