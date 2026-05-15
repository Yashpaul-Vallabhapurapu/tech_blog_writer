import { deflateSync } from "zlib";

const KROKI_BASE = "https://kroki.io";

export type DiagramType =
  | "mermaid"
  | "plantuml"
  | "graphviz"
  | "blockdiag"
  | "seqdiag"
  | "excalidraw";

export type OutputFormat = "svg" | "png";

export interface RenderResult {
  url: string;
  markdownImage: string;
  htmlImage: string;
  diagramType: string;
  format: OutputFormat;
  sourceLength: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  url?: string;
  markdownImage?: string;
}

function encodeForKroki(source: string): string {
  const compressed = deflateSync(Buffer.from(source, "utf-8"), { level: 9 });
  // Kroki uses standard base64url (no padding)
  return compressed
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function renderDiagram(
  type: DiagramType,
  source: string,
  format: OutputFormat = "svg",
  altText = "Diagram"
): RenderResult {
  const encoded = encodeForKroki(source.trim());
  const url = `${KROKI_BASE}/${type}/${format}/${encoded}`;

  return {
    url,
    markdownImage: `![${altText}](${url})`,
    htmlImage: `<img src="${url}" alt="${altText}" />`,
    diagramType: type,
    format,
    sourceLength: source.length,
  };
}

export async function validateAndRender(
  type: DiagramType,
  source: string,
  format: OutputFormat = "svg",
  altText = "Diagram"
): Promise<ValidationResult> {
  try {
    const result = renderDiagram(type, source, format, altText);

    // Ping Kroki to confirm it renders without error
    const res = await fetch(result.url, {
      method: "HEAD",
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return {
        valid: false,
        error: `Kroki returned HTTP ${res.status}. Check your diagram syntax.`,
      };
    }

    return {
      valid: true,
      url: result.url,
      markdownImage: result.markdownImage,
    };
  } catch (err) {
    return {
      valid: false,
      error: `Render failed: ${(err as Error).message}`,
    };
  }
}
