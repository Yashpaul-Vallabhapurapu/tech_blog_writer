---
name: seo-optimization
description: "Use when: optimizing blog titles and headlines for SEO, choosing keywords and tags, improving content discoverability on Medium, writing meta descriptions, or structuring content for search engines. Helps maximize reach and engagement through strategic optimization."
---

# SEO Optimization Skill

Specialized skill for optimizing technical blog posts for discoverability and Medium's recommendation algorithm.

## What This Skill Does

- **Title & Headline Optimization**: Create clickable, keyword-rich titles
- **Keyword Strategy**: Identify primary and secondary keywords
- **Meta Elements**: Optimize descriptions, subtitles, and tags
- **Content Structure**: Optimize for Medium's algorithm
- **Readability Metrics**: Improve scannability and engagement signals
- **Link Strategy**: Recommend internal and external linking

## Medium-Specific SEO Strategy

### Titles (Most Important)
- Lead with keyword or benefit statement
- Keep under 60 characters for preview
- Use power words (Guide, How To, Complete, Essential, etc.)
- Avoid clickbait; be authentic

**Examples:**
- ❌ "JavaScript Tips"
- ✅ "7 Advanced JavaScript Patterns You're Missing"
- ✅ "Complete Guide to React Hooks: From Basics to Advanced"

### Subtitles
- Expand on the main promise
- Add secondary keywords naturally
- Give readers one more reason to click
- Keep under 80 characters

### Tags (3-5 tags)
- Primary tag: Main topic (e.g., "JavaScript", "React", "DevOps")
- Secondary tags: Specific areas (e.g., "Performance", "Security")
- Emerging tags: Growth opportunities
- Avoid overly generic tags (e.g., "Technology")

**Tag Strategy:**
- 1 primary, broad tag (high volume)
- 2-3 specific, focused tags (your niche)
- 1 emerging or trend tag (growth potential)

### Meta Description (Not visible on Medium, but good practice)
- 155-160 characters
- Include primary keyword
- Include call-to-action
- Write for humans, not crawlers

## On-Page SEO Optimization

### Content Structure
- H1 for title (one per article)
- H2 for main sections
- H3 for subsections
- Proper hierarchy aids both readability and algorithm

### Internal Links
- Link to your previous articles when relevant
- 2-3 internal links optimal
- Use descriptive anchor text
- Focus on topical relevance

### Keyword Placement
- Primary keyword in title
- Secondary keywords in first paragraph
- Natural distribution throughout (2-4% density)
- Avoid keyword stuffing

### Readability Signals
- Short paragraphs (2-3 sentences)
- Short sentences (15-20 words average)
- Lists and callouts
- Varied formatting (bold, emphasis)
- Breaks between sections

## Content Optimization Checklist

- [ ] Title includes primary keyword and benefit
- [ ] Subtitle provides additional context
- [ ] Tags are relevant and discoverable
- [ ] First paragraph hooks reader and includes keyword
- [ ] Sections use clear H2/H3 hierarchy
- [ ] Content is scannable with formatting
- [ ] Links to authoritative sources
- [ ] Call-to-action at the end
- [ ] Code examples are syntax-highlighted
- [ ] Reading time matches expectations

## Medium Algorithm Signals

Content performs well on Medium when:
- High engagement in first 30 seconds (hook strong intro)
- Good scroll depth (keep readers engaged)
- Time on page (breaks and sections help)
- Internal link clicks (relevant linking)
- Share-worthy moments (quotable insights)
- Comments and responses (encourage discussion)

Focus on authentic value over keyword stuffing.

---

## Examples

### Example 1: Optimize a title for a Kubernetes autoscaling article

```
Input: "Kubernetes Autoscaling"

Option A: "Kubernetes Autoscaling: HPA, VPA, and KEDA Explained" (58 chars)
          → keyword-first, specific technologies named, good for search

Option B: "How to Scale Kubernetes Workloads Automatically in 2025" (55 chars)
          → benefit-first, freshness signal, broader appeal

Recommended tags: Kubernetes / DevOps / Cloud Infrastructure / Platform Engineering
```

### Example 2: Select tags for an LLM prompt engineering article

```
Primary (broad, high-volume):  "Artificial Intelligence"
Specific (niche):              "Prompt Engineering" / "LLM"
Trending:                      "ChatGPT"

Avoid: "Technology" (too generic) / "Machine Learning" (overlaps with AI — pick one)
```

---

## Error Handling

| Error | Handling |
|-------|----------|
| Title exceeds 60 characters | Generate 3 shorter alternatives that preserve the primary keyword |
| No high-volume primary tag for niche topic | Use the closest broad parent tag + 3 specific tags |
| Article lacks a clear primary keyword | Ask the agent to identify the single most searchable term before proceeding |
| All suggested tags are low-volume | Include one broad tag even if only partially relevant; avoid all-niche tag sets |

---

## Next Steps

Apply the recommended title, subtitle, and tags in the Medium editor. Pass the article to `/medium-format` for final structural formatting before publishing.

---

## Related Skills

- `/technical-writing` — runs before this skill; provides the draft to optimize
- `/medium-format` — runs after; applies final formatting including heading hierarchy
- `/style-research` — vocabulary from the Style Brief informs keyword choices
