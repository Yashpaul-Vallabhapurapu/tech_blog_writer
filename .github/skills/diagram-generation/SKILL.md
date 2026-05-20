---
name: diagram-generation
description: "Use when: a concept in the article would be clearer with a visual, an architecture or flow needs illustrating, comparisons benefit from a diagram, or the outline flags a section that needs a figure. Generates diagram source code and returns a Kroki.io image URL ready to embed in Medium."
tools:
  - mcp_diagram-server_render_diagram
  - mcp_diagram-server_validate_and_render
  - mcp_diagram-server_list_diagram_types
compatibility: "Requires mcp-server: diagram-server"
---

# Diagram Generation Skill

## What This Skill Does

Decides what to draw, writes the diagram source code, renders it via the diagram-server MCP, and returns a markdown image tag ready to paste into the article.

## When to Create a Diagram

Add a diagram when one of these is true:

- The section explains how components interact (architecture, system design)
- There is a multi-step process or decision tree that prose makes harder to follow
- The article compares two or more approaches side by side
- A concept has a hierarchy or taxonomy that benefits from a visual
- The outline or draft explicitly calls for a figure

Do not add a diagram just to have one. A weak diagram is worse than no diagram. If the prose already explains something clearly in two sentences, skip it.

---

## Step 1: Choose the Right Diagram Type

Call `list_diagram_types` if unsure. Quick guide:

| What you want to show | Best type |
|----------------------|-----------|
| How components connect, agent/skill flow | `mermaid` (flowchart) |
| A calls B calls C, request/response | `mermaid` (sequenceDiagram) |
| Step-by-step pipeline, left to right | `mermaid` (flowchart LR) or `blockdiag` |
| Concept map or topic relationships | `mermaid` (mindmap) |
| Complex dependency graph | `graphviz` |
| Detailed sequence with notes and annotations | `plantuml` |
| Hand-drawn / whiteboard aesthetic | `excalidraw` |

**Default to Mermaid.** It handles 80% of tech blog diagram needs and the syntax is clean and readable.

---

## Step 2: Write the Diagram Source Code

### Mermaid Flowchart (most common)

```
flowchart TD
    A[Start node] --> B{Decision?}
    B -->|Yes| C[Outcome A]
    B -->|No| D[Outcome B]
    C --> E([End])
    D --> E
```

Node shapes:
- `[Text]` rectangle (process/component)
- `{Text}` diamond (decision)
- `([Text])` stadium (start/end)
- `[(Text)]` cylinder (database/storage)
- `((Text))` circle (event)
- `/Text/` parallelogram (skill/function)

Styling tips:
- Keep labels short (under 4 words)
- Use `TD` (top-down) for hierarchies, `LR` (left-right) for pipelines
- Group related nodes with `subgraph`

### Mermaid Sequence Diagram

```
sequenceDiagram
    actor User
    participant Agent
    participant Skill
    participant MCP

    User->>Agent: Request
    Agent->>Skill: invoke skill
    Skill->>MCP: tool call
    MCP-->>Skill: result
    Skill-->>Agent: output
    Agent-->>User: final response
```

### Mermaid Mind Map

```
mindmap
  root((AI System))
    Agents
      Orchestrates goals
      Holds memory
      Plans steps
    Skills
      Single purpose
      Stateless
      Reusable
```

### Mermaid Architecture (flowchart with subgraphs)

```
flowchart TD
    subgraph Agent Layer
        A[medium-blog-writer Agent]
    end
    subgraph Skill Layer
        B[/content-research/]
        C[/style-research/]
        D[/bibliography/]
    end
    subgraph MCP Layer
        E[(tech-blog-fetcher)]
        F[(diagram-server)]
    end
    A --> B & C & D
    B & C --> E
    A --> F
```

---

## Step 3: Render the Diagram

Once the source code is written, call `validate_and_render` to confirm it renders correctly before including it in the article:

```
validate_and_render(
  type: "mermaid",
  source: "<your diagram source>",
  alt_text: "<descriptive caption for Medium>",
  format: "svg"
)
```

If validation fails, read the error, fix the syntax, and try again. Common Mermaid errors:
- Special characters in labels: wrap in quotes `["Label with spaces"]`
- Arrow direction mismatch: use `-->` not `->`
- Unclosed subgraph: every `subgraph` needs `end`

If validation passes, use `render_diagram` for subsequent renders (skips the HEAD check).

---

## Step 4: Embed in the Article

The tool returns a `markdownImage` value like:

```
![How the agent orchestrates skills](https://kroki.io/mermaid/svg/...)
```

Paste this exactly where the diagram should appear in the article. On Medium, this renders as an inline image.

Always place a diagram:
- After the paragraph that introduces the concept it illustrates
- Before the detailed explanation, not after (ground the reader visually first)
- With a caption that adds context the diagram itself cannot show

---

## Diagram Quality Rules

- **One concept per diagram.** If you need to show two things, make two diagrams.
- **Label every node.** Unlabelled boxes or arrows force the reader to guess.
- **Consistent direction.** Pick TD or LR and stick to it within a diagram.
- **Alt text matters.** Write the alt text as a full sentence describing what the diagram shows, not just "Diagram 1". Medium displays it as a caption.
- **No diagram without context.** Every diagram must be preceded by at least one sentence explaining what the reader is about to see.

---

## Usage in the Agent Workflow

The agent should invoke this skill at two points:

1. **During outlining** — identify which sections will need a diagram and note the diagram type
2. **During drafting** — generate and embed diagrams as each section is written, not all at once at the end

When the outline flags a section as needing a figure, pass that section's summary to this skill before drafting the prose. The diagram should exist before the prose is written so the writing can reference it naturally.

---

## Examples

### Example 1: Architecture diagram for a multi-layer system

```
flowchart TD
    subgraph Agent Layer
        A[medium-blog-writer]
    end
    subgraph Skill Layer
        B[/content-research/]
        C[/diagram-generation/]
    end
    A --> B & C
```

```
validate_and_render(type: "mermaid", source: "...", alt_text: "Agent orchestrates skills", format: "svg")
→ returns: ![Agent orchestrates skills](https://kroki.io/mermaid/svg/...)
```

### Example 2: Sequence diagram for agent-to-MCP request flow

```
sequenceDiagram
    actor User
    participant Agent
    participant MCP
    User->>Agent: write article
    Agent->>MCP: fetch_recent_posts
    MCP-->>Agent: posts
    Agent-->>User: drafted section
```

```
validate_and_render(type: "mermaid", source: "...", alt_text: "Request flow from user through agent to MCP", format: "svg")
→ returns: ![Request flow from user through agent to MCP](https://kroki.io/mermaid/svg/...)
```

---

## Error Handling

| Error | Handling |
|-------|----------|
| `validate_and_render` parse error | Read the error message, fix the specific syntax issue (common errors in Step 3), retry |
| Kroki.io unreachable | Include diagram source as a fenced code block inline; note the URL will render when the server is available |
| Diagram too complex (>10 nodes) | Split into two focused diagrams; each covers one concept |
| `list_diagram_types` returns unexpected types | Default to `mermaid`; it handles 80% of use cases |

---

## Next Steps

Embed the returned `markdownImage` tag in the article at the location flagged in the outline. Ensure the preceding paragraph introduces what the diagram shows before it appears.

---

## Related Skills

- `/outline-generation` — identifies which sections need diagrams before drafting begins
- `/technical-writing` — prose must reference every diagram placed in the article
