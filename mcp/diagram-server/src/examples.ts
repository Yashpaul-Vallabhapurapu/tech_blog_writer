export interface DiagramTypeInfo {
  id: string;
  name: string;
  bestFor: string[];
  syntax: string;
  example: string;
}

export const DIAGRAM_TYPES: Record<string, DiagramTypeInfo> = {
  mermaid: {
    id: "mermaid",
    name: "Mermaid",
    bestFor: [
      "Flowcharts and decision trees",
      "Sequence diagrams (A calls B calls C)",
      "Architecture overviews",
      "Agent/skill orchestration flows",
      "Class and ER diagrams",
      "Mind maps",
      "Gantt charts",
    ],
    syntax: "Mermaid markdown-like syntax. Supports: flowchart, sequenceDiagram, classDiagram, erDiagram, mindmap, gantt, gitGraph.",
    example: `flowchart TD
    User([User Request]) --> Agent[medium-blog-writer\\nAgent]
    Agent --> CR[/content-research\\nSkill/]
    Agent --> SR[/style-research\\nSkill/]
    Agent --> OG[/outline-generation\\nSkill/]
    CR --> MCP[(MCP Server\\ntech-blog-fetcher)]
    SR --> MCP
    Agent --> Draft[Draft Article]
    Draft --> SEO[/seo-optimization\\nSkill/]
    Draft --> BIB[/bibliography\\nSkill/]
    SEO --> Final[Final Article]
    BIB --> Final`,
  },

  plantuml: {
    id: "plantuml",
    name: "PlantUML",
    bestFor: [
      "Component and deployment diagrams",
      "Use case diagrams",
      "Detailed sequence diagrams with notes",
      "State machines",
    ],
    syntax: "@startuml ... @enduml wrapper with PlantUML DSL inside.",
    example: `@startuml
actor User
participant Agent
participant Skill
database MCP

User -> Agent: Write article about X
Agent -> Skill: /content-research(topic)
Skill -> MCP: search_sources(query)
MCP --> Skill: posts[]
Skill --> Agent: Source Registry
Agent -> Skill: /bibliography(sources)
Skill --> Agent: Formatted bibliography
Agent --> User: Final article + references
@enduml`,
  },

  graphviz: {
    id: "graphviz",
    name: "Graphviz (DOT)",
    bestFor: [
      "Complex dependency graphs",
      "Network topology diagrams",
      "Hierarchical tree structures",
      "Data pipeline DAGs",
    ],
    syntax: "DOT language: digraph G { ... } with node and edge definitions.",
    example: `digraph AgentSystem {
  rankdir=LR
  node [shape=box, style=rounded]

  Agent [label="Agent\\n(Orchestrator)", shape=diamond]
  CR [label="content-research\\nSkill"]
  SR [label="style-research\\nSkill"]
  BIB [label="bibliography\\nSkill"]
  MCP [label="MCP Server", shape=cylinder]

  Agent -> CR
  Agent -> SR
  Agent -> BIB
  CR -> MCP
  SR -> MCP
}`,
  },

  blockdiag: {
    id: "blockdiag",
    name: "Blockdiag",
    bestFor: [
      "Simple left-to-right process flows",
      "Pipeline stages",
      "Step-by-step workflows",
    ],
    syntax: "blockdiag { A -> B -> C } with optional groups and colors.",
    example: `blockdiag {
  Research -> "Style Brief" -> Outline -> Draft -> Optimize -> Publish
  group {
    color = "#e8f4f8"
    Research; "Style Brief"
  }
}`,
  },

  seqdiag: {
    id: "seqdiag",
    name: "Seqdiag",
    bestFor: [
      "Simple sequence/interaction diagrams",
      "API call flows",
      "Request/response patterns",
    ],
    syntax: "seqdiag { A -> B -> C; B --> A [label='response'] }",
    example: `seqdiag {
  User -> Agent [label="write article"];
  Agent -> ContentResearch [label="/content-research"];
  ContentResearch -> MCPServer [label="search_sources()"];
  MCPServer --> ContentResearch [label="posts[]"];
  ContentResearch --> Agent [label="Source Registry"];
  Agent -> Bibliography [label="/bibliography"];
  Bibliography --> Agent [label="formatted refs"];
  Agent --> User [label="final article"];
}`,
  },

  excalidraw: {
    id: "excalidraw",
    name: "Excalidraw",
    bestFor: [
      "Hand-drawn style illustrations",
      "Informal architecture sketches",
      "Whiteboard-style explanations",
    ],
    syntax: "JSON format matching the Excalidraw scene schema.",
    example: `{
  "type": "excalidraw",
  "version": 2,
  "elements": [
    {
      "type": "rectangle",
      "x": 100, "y": 100,
      "width": 160, "height": 60,
      "label": { "text": "Agent" }
    }
  ]
}`,
  },
};

export function getDiagramTypeInfo(type: string): DiagramTypeInfo | undefined {
  return DIAGRAM_TYPES[type];
}

export function getAllTypes(): DiagramTypeInfo[] {
  return Object.values(DIAGRAM_TYPES);
}
