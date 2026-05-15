import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { fetchRecentPosts, fetchArticleContent, searchAcrossSources } from "./fetcher.js";
import { SOURCES, ALL_SOURCE_IDS } from "./sources.js";

const server = new Server(
  { name: "tech-blog-fetcher", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "fetch_recent_posts",
      description:
        "Fetch recent posts from a specific tech blog source. Returns titles, URLs, excerpts, and dates. Use this to find what top writers are publishing on a topic.",
      inputSchema: {
        type: "object",
        properties: {
          source_id: {
            type: "string",
            description: `ID of the blog source. Available: ${ALL_SOURCE_IDS.join(", ")}`,
            enum: ALL_SOURCE_IDS,
          },
          topic: {
            type: "string",
            description: "Optional keyword to filter posts by topic",
          },
          limit: {
            type: "number",
            description: "Max number of posts to return (default: 5, max: 10)",
            default: 5,
          },
        },
        required: ["source_id"],
      },
    },
    {
      name: "fetch_article_content",
      description:
        "Fetch and parse the full text content of a specific article URL. Also returns structural metadata: word count, header count, code blocks, lists. Use this to analyze writing style and structure of a specific post.",
      inputSchema: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The full URL of the article to fetch",
          },
        },
        required: ["url"],
      },
    },
    {
      name: "search_sources",
      description:
        "Search for posts about a topic across multiple tech blog sources simultaneously. Returns posts ranked by date. Use this to get a broad view of how top writers cover a topic.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Topic or keyword to search for",
          },
          source_ids: {
            type: "array",
            items: { type: "string", enum: ALL_SOURCE_IDS },
            description: `List of source IDs to search. Defaults to all sources. Available: ${ALL_SOURCE_IDS.join(", ")}`,
          },
          limit: {
            type: "number",
            description: "Max results per source (default: 3)",
            default: 3,
          },
        },
        required: ["query"],
      },
    },
    {
      name: "list_sources",
      description:
        "List all available blog sources with their metadata (name, category, tags, URL). Use this to discover which sources are available before fetching.",
      inputSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["independent", "big-tech", "community"],
            description: "Optional filter by category",
          },
        },
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "fetch_recent_posts": {
        const { source_id, topic, limit } = args as {
          source_id: string;
          topic?: string;
          limit?: number;
        };
        const posts = await fetchRecentPosts(source_id, topic, Math.min(limit ?? 5, 10));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ source: SOURCES[source_id]?.name, posts }, null, 2),
            },
          ],
        };
      }

      case "fetch_article_content": {
        const { url } = args as { url: string };
        const article = await fetchArticleContent(url);
        return {
          content: [{ type: "text", text: JSON.stringify(article, null, 2) }],
        };
      }

      case "search_sources": {
        const { query, source_ids, limit } = args as {
          query: string;
          source_ids?: string[];
          limit?: number;
        };
        const sources = source_ids?.length ? source_ids : ALL_SOURCE_IDS;
        const results = await searchAcrossSources(query, sources, limit ?? 3);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ query, count: results.length, results }, null, 2),
            },
          ],
        };
      }

      case "list_sources": {
        const { category } = args as { category?: "independent" | "big-tech" | "community" };
        const sources = Object.values(SOURCES).filter(
          (s) => !category || s.category === category
        );
        return {
          content: [{ type: "text", text: JSON.stringify(sources, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("tech-blog-fetcher MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
