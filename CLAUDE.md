
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MCP Servers

Two MCP servers power the system. Both are TypeScript, compiled to `dist/` (gitignored). **Rebuild after any source change:**

```bash
cd mcp/tech-blog-fetcher && npm install && npm run build
cd mcp/diagram-server && npm install && npm run build
```

`npm run dev` runs `tsc --watch` for incremental compilation during development.

The servers are registered in `.claude/settings.json` and start automatically when Claude Code opens this project. No manual launch needed.

## Architecture

Three layers:

**Agents** (`.github/agents/`) — own the goal, orchestrate the full workflow, hold session context. Both run on `claude-haiku-4.5`.
- `medium-blog-writer` — full pipeline from research to formatted article
- `linked-post-publisher` — adapts existing content into Medium Linked Posts

**Skills** (`.github/skills/*/SKILL.md`) — stateless, single-purpose units invoked by agents or directly as slash commands. Non-standard path: skills live under `.github/` not `.claude/`.

**MCP Servers** (`mcp/`) — give skills live capabilities:
- `tech-blog-fetcher` — RSS feed parsing + HTML extraction across 16 curated engineering blogs. Sources defined in `mcp/tech-blog-fetcher/src/sources.ts`. Add new blogs there, then rebuild.
- `diagram-server` — renders Mermaid/PlantUML/Graphviz diagrams via Kroki.io, returns markdown image URLs ready for Medium.

## Skills Reference

| Skill | Key output | Feeds into |
|-------|-----------|------------|
| `/content-research` | Source Registry + Citation Map | `/bibliography` |
| `/style-research` | Style Brief | `/technical-writing` |
| `/outline-generation` | Sectioned outline | `/diagram-generation`, `/technical-writing` |
| `/diagram-generation` | Kroki.io image URLs | embedded in article |
| `/technical-writing` | Drafted sections | `/seo-optimization` |
| `/bibliography` | Inline citations + References block | `/medium-format` |
| `/seo-optimization` | Optimized title + tags | `/medium-format` |
| `/medium-format` | Publication-ready article | publish |
| `/linked-post-strategy` | Linked Post draft | `/seo-optimization`, `/medium-format` |

`content-research` and `style-research` use the MCP for the 16 curated sources and `WebFetch` for any other URL (official docs, arXiv, arbitrary blogs).

## Skill Quality Auditing

`/audit-skills` is installed locally at `.claude/commands/audit-skills.md` (patched from SkillEval to discover skills at `.github/skills/` instead of `.claude/skills/`).

```bash
/audit-skills --all                    # full audit, all 9 skills
/audit-skills content-research         # single skill
/audit-skills --all --checklist-only   # skip live agent eval (faster)
```

Output lands in `skill-audit-output/`: per-skill markdown + JSON, `audit-data.json` (cumulative), `audit-report.html` (HTML dashboard).

Generate the HTML report manually:
```bash
node SkillEval/skill-audit-plugin/generate-report.mjs skill-audit-output/audit-data.json -o skill-audit-output/audit-report.html
```

## Adding a New Blog Source

1. Add an entry to `mcp/tech-blog-fetcher/src/sources.ts` (id, name, url, rss, category, paywalled, tags)
2. `cd mcp/tech-blog-fetcher && npm run build`
3. Update the curated source list in `.github/skills/content-research/SKILL.md` and `.github/skills/style-research/SKILL.md`

## Adding a New Skill

1. Create `.github/skills/<name>/SKILL.md` with frontmatter (`name`, `description`, `tools`, `compatibility` if MCP-dependent)
2. Required sections: `## What This Skill Does`, `## Examples`, `## Error Handling`, `## Next Steps`, `## Related Skills`
3. Register it in the relevant agent files under `.github/agents/`
