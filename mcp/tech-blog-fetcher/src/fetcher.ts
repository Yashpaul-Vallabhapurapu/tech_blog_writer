import * as cheerio from "cheerio";
import Parser from "rss-parser";
import { SOURCES, BlogSource } from "./sources.js";

const rssParser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "TechBlogFetcher/1.0 (MCP Server)" },
});

export interface Post {
  title: string;
  url: string;
  excerpt: string;
  date: string;
  source: string;
  sourceName: string;
  paywalled: boolean;
}

export interface ArticleContent {
  url: string;
  title: string;
  source: string;
  content: string;
  wordCount: number;
  hasCodeBlocks: boolean;
  headerCount: number;
  listCount: number;
  paragraphCount: number;
  fetchedAt: string;
}

export async function fetchRecentPosts(
  sourceId: string,
  topic?: string,
  limit = 5
): Promise<Post[]> {
  const source = SOURCES[sourceId];
  if (!source) throw new Error(`Unknown source: ${sourceId}`);

  try {
    const feed = await rssParser.parseURL(source.rss);
    let items = feed.items ?? [];

    if (topic) {
      const q = topic.toLowerCase();
      items = items.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.contentSnippet?.toLowerCase().includes(q) ||
          item.content?.toLowerCase().includes(q)
      );
    }

    return items.slice(0, limit).map((item) => ({
      title: item.title ?? "Untitled",
      url: item.link ?? "",
      excerpt: item.contentSnippet?.slice(0, 300) ?? item.content?.slice(0, 300) ?? "",
      date: item.pubDate ?? item.isoDate ?? "",
      source: sourceId,
      sourceName: source.name,
      paywalled: source.paywalled,
    }));
  } catch (err) {
    throw new Error(`Failed to fetch RSS for ${source.name}: ${(err as Error).message}`);
  }
}

export async function fetchArticleContent(url: string): Promise<ArticleContent> {
  const source = Object.values(SOURCES).find((s) => url.includes(new URL(s.url).hostname));

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; TechBlogFetcher/1.0)",
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);

  const html = await res.text();
  const $ = cheerio.load(html);

  // Remove nav, footer, ads, scripts, styles
  $("nav, footer, header, script, style, [class*='ad-'], [class*='sidebar'], [class*='related']").remove();

  // Extract title
  const title =
    $("h1").first().text().trim() ||
    $("title").text().trim() ||
    "Unknown Title";

  // Extract main content — try common article selectors
  const contentSelectors = [
    "article",
    "[class*='post-content']",
    "[class*='article-body']",
    "[class*='entry-content']",
    "main",
    ".content",
  ];

  let content = "";
  for (const sel of contentSelectors) {
    const el = $(sel).first();
    if (el.length) {
      content = el.text().replace(/\s+/g, " ").trim();
      break;
    }
  }
  if (!content) {
    content = $("body").text().replace(/\s+/g, " ").trim();
  }

  // Structural metrics
  const hasCodeBlocks = $("pre, code").length > 0;
  const headerCount = $("h1, h2, h3, h4").length;
  const listCount = $("ul, ol").length;
  const paragraphCount = $("p").length;
  const wordCount = content.split(/\s+/).length;

  return {
    url,
    title,
    source: source?.id ?? "unknown",
    content: content.slice(0, 8000), // cap to avoid token overflow
    wordCount,
    hasCodeBlocks,
    headerCount,
    listCount,
    paragraphCount,
    fetchedAt: new Date().toISOString(),
  };
}

export async function searchAcrossSources(
  query: string,
  sourceIds: string[],
  limit = 5
): Promise<Post[]> {
  const results = await Promise.allSettled(
    sourceIds.map((id) => fetchRecentPosts(id, query, limit))
  );

  const posts: Post[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      posts.push(...result.value);
    }
  }

  // Sort by date descending
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit * 2);
}
