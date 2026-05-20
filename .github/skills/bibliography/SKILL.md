---
name: bibliography
description: "Use when: generating the final bibliography and inline citations for an article. Takes the Source Registry produced by /content-research and outputs a formatted bibliography section plus inline citation markers ready to insert into the draft. Always run this after content-research and before final formatting."
---

# Bibliography Skill

Takes the Source Registry from `/content-research` and produces two things: inline citation markers to embed in the article body, and a clean formatted bibliography section to append at the end.

## What This Skill Does

- Formats every source in the Source Registry into a consistent, readable citation
- Produces inline citation markers keyed to the Source Registry IDs
- Groups sources by type (Official Docs, Research Papers, Engineering Blogs, Reports)
- Flags any claims in the article body that are missing a citation
- Outputs a Medium-compatible bibliography block ready to paste

## Inputs Required

This skill needs the Source Registry block from `/content-research`. Do not run this skill without one. If no Source Registry exists, invoke `/content-research` first.

```
## Source Registry

| ID | Title | Author / Org | URL | Type | Published | Credibility |
...

## Inline Citation Map
...
```

## How Citations Work in This System

### Inline Citation Style

Use bracketed numeric references inside the article body, placed immediately after the claim they support:

```
DeepMind found that poorly coordinated agent networks amplify errors 17 times [1].
```

For claims supported by multiple sources:

```
This pattern is consistent across production systems at both Amazon and Meta [2, 3].
```

For direct quotes, include the source inline as well:

```
As the AWS team put it: "agentic AI systems require a fundamental shift in evaluation methodologies" [4].
```

### What Gets a Citation

Every item in this list requires an inline citation:

- Specific statistics or benchmark numbers ("17x error amplification", "50% of enterprises by 2027")
- Research findings attributed to an org or paper ("DeepMind found...", "Gartner predicts...")
- Technical claims that could be contested or that readers may want to verify
- Direct quotes from any source
- Version numbers, API names, or feature descriptions pulled from documentation

What does NOT need a citation:

- Common knowledge ("Python is an interpreted language")
- Analogies and examples you invented
- Your own analysis and conclusions

---

## Output Format

Produce both sections below, in this order.

---

### Section 1: Inline Citation Markers

A mapping the writer uses to insert citations into the draft:

```
## Citation Markers (insert these into the article body)

[1] → after: "DeepMind found that poorly coordinated agent networks amplify errors 17 times"
[2] → after: "Amazon's production agent systems use a three-layer evaluation framework"
[3] → after: "25% of enterprises using GenAI are expected to deploy AI agents in 2025"
...
```

---

### Section 2: Bibliography Block

Formatted and grouped, ready to paste at the end of the article.

Use this exact structure:

```markdown
---

## References

### Research and Reports
[1] [Title of Paper](URL) — Author(s), Organization, Month YYYY
[2] [Title of Report](URL) — Organization, Month YYYY

### Engineering Blogs
[3] [Title of Post](URL) — Author, AWS Blog, Month YYYY
[4] [Title of Post](URL) — Author, Meta Engineering, Month YYYY
[5] [Title of Post](URL) — Author, Netflix Tech Blog, Month YYYY

### Official Documentation
[6] [Title](URL) — Organization, accessed Month YYYY

### Further Reading
[7] [Title](URL) — Author, Publication, Month YYYY
```

Rules for formatting each entry:
- Title is always a hyperlink to the URL
- Author name comes before the organization where known
- Date format is Month YYYY (e.g., "March 2025")
- For documentation without a clear date, use "accessed [current month YYYY]"
- Never use bare URLs; every source must have a readable title as the link text

---

## Credibility Flags

If any source in the Source Registry is marked Medium credibility, add a note:

```
[8] [Title](URL) — Author, Publication, Month YYYY *(secondary source; cross-referenced with [3])*
```

If a source is older than 18 months, add:

```
[2] [Title](URL) — Author, Publication, January 2023 *(verify still current for your use case)*
```

---

## Missing Citation Audit

After producing the bibliography, scan the Inline Citation Map from the Source Registry and check the article draft for any claims listed there that do not have a citation marker inserted. Report them:

```
## Missing Citations

The following claims in the draft are unsourced — either add a citation or rephrase to remove the factual assertion:

- "Over 40% of agentic AI projects will be cancelled by 2027" — paragraph 3, no citation marker present
- "Netflix processes 700GB of data per second" — conclusion section, no citation marker present
```

---

## Usage

Invoke after content-research, before final formatting:

```
/bibliography — generate bibliography from Source Registry
```

The agent inserts citation markers into the draft, appends the bibliography block, and passes the complete article to `/medium-format`.

---

## Examples

### Example 1: Format a Source Registry with 5 sources

Input: Source Registry with IDs [1]–[5], Inline Citation Map with 6 claims

Output:
```markdown
## References

### Engineering Blogs
[1] [Scaling at Netflix](https://netflixtechblog.com/...) — Author, Netflix Tech Blog, March 2025
[2] [ByteByteGo: System Design at Scale](https://blog.bytebytego.com/...) — Alex Xu, ByteByteGo, Jan 2025

### Official Documentation
[3] [Kubernetes HPA](https://kubernetes.io/docs/...) — Kubernetes, accessed May 2025

## Citation Markers (insert into article body)
[1] → after: "Netflix processes 700GB of data per second"
[3] → after: "HPA polls metrics every 15 seconds by default"
```

### Example 2: Handle a credibility-flagged source

Input: Source [4] marked "Medium" credibility in the Source Registry

Output:
```
[4] [Title](url) — Author, Publication, Jan 2025 *(secondary source; cross-referenced with [1])*
```

---

## Error Handling

| Error | Handling |
|-------|----------|
| No Source Registry provided | Stop immediately — invoke `/content-research` first before this skill can run |
| Source URL returns 404 | Format the entry with `*(link unavailable — verify URL)*` appended |
| Missing author name | Use the organization name alone |
| Duplicate source IDs in registry | Renumber all IDs sequentially before formatting |
| Claim in draft not in Inline Citation Map | Flag it in the Missing Citations section |

---

## Next Steps

After inserting citation markers in the draft and appending the bibliography block, pass the complete article to `/medium-format` for final formatting.

---

## Related Skills

- `/content-research` — must run first; produces the Source Registry this skill requires
- `/medium-format` — always runs after; formats the complete article including the bibliography block
- `/technical-writing` — verify all cited technical claims are accurately represented in the draft
