import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { renderDiagram, validateAndRender, DiagramType, OutputFormat } from "./renderer.js";
import { getAllTypes, getDiagramTypeInfo, DIAGRAM_TYPES } from "./examples.js";

const SUPPORTED_TYPES = Object.keys(DIAGRAM_TYPES) as DiagramType[];

const server = new Server(
  { name: "diagram-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "render_diagram",
      description:
        "Render a diagram from source code and return a Kroki.io image URL ready to embed in a Medium article. Use this after writing the diagram source code. Returns a markdown image tag you can paste directly into the article.",
      inputSchema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: SUPPORTED_TYPES,
            description: "Diagram type. Use 'mermaid' for most cases (flowcharts, sequences, architecture). Use list_diagram_types to see all options.",
          },
          source: {
            type: "string",
            description: "The diagram source code (Mermaid syntax, PlantUML, DOT, etc.)",
          },
          alt_text: {
            type: "string",
            description: "Alt text for the image, used for accessibility and Medium captions. Be descriptive.",
            default: "Diagram",
          },
          format: {
            type: "string",
            enum: ["svg", "png"],
            description: "Output format. SVG is preferred (scales without pixelation). Use PNG for environments that don't support SVG.",
            default: "svg",
          },
        },
        required: ["type", "source"],
      },
    },
    {
      name: "validate_and_render",
      description:
        "Validate diagram syntax by actually rendering it via Kroki.io, then return the image URL if valid. Use this when you are unsure about the syntax — it confirms the diagram renders before you include it in the article.",
      inputSchema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: SUPPORTED_TYPES,
            description: "Diagram type",
          },
          source: {
            type: "string",
            description: "The diagram source code to validate and render",
          },
          alt_text: {
            type: "string",
            description: "Alt text for the rendered image",
            default: "Diagram",
          },
          format: {
            type: "string",
            enum: ["svg", "png"],
            default: "svg",
          },
        },
        required: ["type", "source"],
      },
    },
    {
      name: "list_diagram_types",
      description:
        "List all supported diagram types with descriptions of what each is best for. Use this to decide which diagram type fits your visualization need before writing the source code.",
      inputSchema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: SUPPORTED_TYPES,
            description: "Optional: get detailed info and a full example for a specific type",
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
      case "render_diagram": {
        const { type, source, alt_text, format } = args as {
          type: DiagramType;
          source: string;
          alt_text?: string;
          format?: OutputFormat;
        };

        const result = renderDiagram(
          type,
          source,
          format ?? "svg",
          alt_text ?? "Diagram"
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  url: result.url,
                  markdownImage: result.markdownImage,
                  htmlImage: result.htmlImage,
                  tip: "Paste the markdownImage value directly into your article where you want the diagram to appear.",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "validate_and_render": {
        const { type, source, alt_text, format } = args as {
          type: DiagramType;
          source: string;
          alt_text?: string;
          format?: OutputFormat;
        };

        const result = await validateAndRender(
          type,
          source,
          format ?? "svg",
          alt_text ?? "Diagram"
        );

        if (!result.valid) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: false,
                    error: result.error,
                    suggestion: "Check the diagram syntax and try again. Use list_diagram_types to see a working example.",
                  },
                  null,
                  2
                ),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  url: result.url,
                  markdownImage: result.markdownImage,
                  tip: "Diagram validated and rendered successfully. Paste the markdownImage into your article.",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "list_diagram_types": {
        const { type } = args as { type?: string };

        if (type) {
          const info = getDiagramTypeInfo(type);
          if (!info) throw new Error(`Unknown diagram type: ${type}`);
          return {
            content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
          };
        }

        const summary = getAllTypes().map((t) => ({
          id: t.id,
          name: t.name,
          bestFor: t.bestFor,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  supported_types: summary,
                  recommendation: "Use 'mermaid' for most tech blog diagrams. It handles flowcharts, sequences, architecture, and mind maps with clean, readable syntax.",
                },
                null,
                2
              ),
            },
          ],
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
  console.error("diagram-server MCP running on stdio");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
