---
name: content-research
description: "Use when: researching technical topics for blog posts, validating information sources, gathering references, fact-checking technical claims, or finding authoritative sources for articles. Helps identify credible sources, validate technical accuracy, and organize research for blog content. Always outputs a structured Source Registry that feeds directly into the /bibliography skill."
tools:
  - mcp_tech-blog-fetcher_fetch_recent_posts
  - mcp_tech-blog-fetcher_fetch_article_content
  - mcp_tech-blog-fetcher_search_sources
  - mcp_tech-blog-fetcher_list_sources
  - WebFetch
compatibility: "Requires mcp-server: tech-blog-fetcher (WebFetch used as fallback for URLs outside the curated source list)"
---

# Content Research Skill

Specialized skill for researching technical topics, validating sources, and producing a structured Source Registry that the `/bibliography` skill uses to generate the final article bibliography.

## What This Skill Does

- **Source Discovery**: Find credible, authoritative sources using MCP tools across 12 top tech blogs, plus official docs and papers
- **Source Validation**: Verify each source is current, credible, and directly relevant
- **Fact Extraction**: Pull key claims, stats, and data points with their exact source URLs
- **Source Registry**: Output every source with full metadata so nothing gets lost between research and publication
- **Fact Checking**: Cross-reference claims across multiple sources before including them

## Research Process

### Step 1: Topic Analysis
- Define the core topic and scope
- Identify key subtopics and must-know concepts
- Note what claims will need sourcing (stats, benchmarks, specific assertions)

### Step 2: Source Gathering

Use MCP tools for the curated blogs, WebFetch for everything else:

```
search_sources(query="<topic>", limit=5)        — broad sweep across all 16 curated sources
fetch_recent_posts(source_id="aws", topic="…")  — targeted by source
fetch_article_content(url="…")                  — full content + structural metadata

WebFetch(url="…")                               — any URL outside the curated list
```

Curated sources (use MCP): AWS, Meta, Google AI, Google Developers, Amazon Science, DeepMind,
Netflix, ByteByteGo, Pragmatic Engineer, Towards Data Science, freeCodeCamp, Hackernoon,
Martin Fowler, Shopify Engineering, Uber Engineering, Airbnb Engineering.

Any other URL (use WebFetch): official docs (MDN, kubernetes.io, docs.python.org),
academic papers (arXiv, ACM), GitHub repos, industry reports, any blog not in the list above.

### Step 3: Source Evaluation

For every source, assess:

| Criterion | What to check |
|-----------|--------------|
| Authority | Is this an official source, known expert, or major publication? |
| Recency | Published within 18 months? If older, is it still valid? |
| Accuracy | Does it cross-validate with other sources? |
| Relevance | Does it directly support a claim in this article? |
| Accessibility | Is the URL publicly accessible (not paywalled)? |

Discard sources that fail authority or recency unless they are foundational references.

### Step 4: Fact Extraction

For every factual claim, stat, or data point you plan to use in the article, record:
- The exact claim or quote
- The source it came from (by Source ID)
- The inline citation tag to use (e.g., `[1]`, `[AWS-2025]`)

### Step 5: Output the Source Registry

Every research session MUST end with a complete Source Registry block. This is the handoff to `/bibliography`.

---

## Source Registry Format

Output this block at the end of every research session, replacing placeholders:

```
## Source Registry

| ID | Title | Author / Org | URL | Type | Published | Credibility |
|----|-------|-------------|-----|------|-----------|-------------|
| [1] | <title> | <author or org> | <url> | <doc/blog/paper/report> | <YYYY-MM> | High/Medium |
| [2] | ...    | ...           | ... | ...  | ...       | ...         |

## Inline Citation Map

Claims and the source IDs that support them:

- "<exact claim or stat from article>" → [1]
- "<another claim>" → [2], [3]

## Flagged Gaps

Sources I could not find for these claims (agent must decide whether to remove the claim or find an alternative):
- <claim that needs sourcing but none found>
```

---

## Best Practices

- Every stat, benchmark, or specific technical claim in the article must have a row in the Source Registry
- Never include a source you have not actually read or fetched — no placeholder URLs
- If a source is paywalled, note it in the Credibility column and find a public alternative where possible
- Prioritize sources from the MCP server's curated list (AWS, Meta, Google, Netflix, ByteByteGo, etc.) over generic search results
- If two sources contradict each other, flag the conflict in Flagged Gaps rather than silently picking one
- Check publication dates: anything older than 18 months in a fast-moving field (AI, cloud, frontend) needs explicit validation

---

## Examples

### Example 1: Research an article on Kubernetes autoscaling

```
search_sources(query="kubernetes horizontal pod autoscaling", limit=5)
→ selects 3 posts from AWS Blog + ByteByteGo + official kubernetes.io docs
→ outputs Source Registry with 5 entries, Inline Citation Map with 4 claims
```

### Example 2: Fact-check a specific claim

```
fetch_article_content(url="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/")
→ cross-references claim "HPA polls metrics every 15 seconds" against official doc
→ confirms claim, adds source [K8s-Docs] to registry
```

---

## Error Handling

| Error | Handling |
|-------|----------|
| MCP server unavailable | Fall back to WebFetch for individual article URLs; note the limitation |
| No results for query | Broaden to adjacent terms, then narrow after initial sweep |
| Paywalled source | Mark Credibility as "Medium (paywalled)"; find a public alternative |
| Two sources contradict | Do not silently pick one — add both to Flagged Gaps with the conflict noted |
| Source URL returns 404 | Remove from registry; flag in Flagged Gaps |

---

## Next Steps

Pass the completed Source Registry to `/bibliography` for citation formatting. Share factual claims with `/technical-writing` for accuracy verification during drafting.

---

## Related Skills

- `/bibliography` — consumes the Source Registry this skill outputs
- `/style-research` — run in parallel to analyze tone before drafting
- `/technical-writing` — uses the verified facts this skill produces
