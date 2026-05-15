---
name: style-research
description: "Use when: analyzing how top tech writers structure and phrase content on a topic, calibrating tone and vocabulary before drafting, researching contemporary writing patterns from AWS, Meta, Google, Netflix, ByteByteGo, Pragmatic Engineer and other top sources. Returns a style brief the agent uses before drafting."
tools:
  - mcp_tech-blog-fetcher_fetch_recent_posts
  - mcp_tech-blog-fetcher_fetch_article_content
  - mcp_tech-blog-fetcher_search_sources
  - mcp_tech-blog-fetcher_list_sources
---

# Style Research Skill

Analyzes how contemporary top tech writers cover a topic — extracting tone, vocabulary level, structural patterns, and framing — then produces a **Style Brief** the agent uses before drafting.

## What This Skill Does

1. **Searches** for recent posts on the topic across all configured sources
2. **Fetches** 2–3 of the most relevant articles in full
3. **Analyzes** their structure, tone, vocabulary, and approach
4. **Produces** a Style Brief: a concise guide on how to write this article

## Available Sources

### Independent Writers
- **The Pragmatic Engineer** — senior engineering lens, career + architecture depth
- **ByteByteGo** — system design, visual explanations, high-density technical content

### Community Platforms
- **Towards Data Science** — ML/AI, Python, data-heavy, academic-accessible
- **freeCodeCamp** — tutorials, beginner-friendly, step-by-step walkthroughs
- **Hackernoon** — broad tech, startup-oriented, opinionated

### Big Tech Engineering Blogs
- **AWS Blog** — cloud infrastructure, product announcements, technical walkthroughs
- **Amazon Science** — research-grade, ML/NLP/robotics, academic tone
- **Meta Engineering** — infrastructure at scale, open-source, mobile
- **Google AI Blog** — ML research, rigorous but accessible, visual-heavy
- **Google Developers Blog** — practical developer content, APIs, tooling
- **DeepMind Blog** — cutting-edge AI research, scientific framing
- **Netflix Tech Blog** — streaming infrastructure, Java/Scala, data engineering

## Workflow

### Step 1: Discover relevant posts
```
Use: search_sources
Input: { query: "<topic>", limit: 3 }
Goal: Find 6–10 recent posts across sources on this topic
```

### Step 2: Select 3 most relevant posts
Choose posts that are:
- Published within the last 6 months (prefer recency)
- From a mix of sources (at least 1 independent + 1 big tech)
- Non-paywalled when possible
- Directly on topic (not tangentially related)

### Step 3: Fetch full article content
```
Use: fetch_article_content
Input: { url: "<selected_article_url>" }
Repeat for each selected post
```

### Step 4: Analyze each article across these dimensions

**Tone**
- Formal / Semi-formal / Conversational
- First person or third person?
- Does it use "we" (team voice) or "I" (personal voice)?

**Technical depth**
- Vocabulary level: Basic / Intermediate / Expert
- Are acronyms spelled out on first use?
- How much assumed knowledge?
- Ratio of explanation to code

**Structure**
- Heading hierarchy and frequency (how many H2s per 1000 words?)
- Paragraph length (short punchy vs. long dense)
- Use of bullet lists vs. prose
- Code block frequency and depth (snippets vs. full examples)
- Use of tables, diagrams, callouts

**Framing**
- Does it lead with the problem or the solution?
- Is there a narrative arc (story) or purely informational?
- How does it handle analogies — are they used? How often?
- Does it address "why" before "how"?

**Engagement patterns**
- How does it open? (question, bold claim, stat, story)
- Is there a TL;DR or summary?
- How does it close? (call to action, reflection, next steps)

### Step 5: Produce the Style Brief

Output this exact format:

---

## Style Brief: [Topic]

**Sources analyzed:** [list of source names and URLs]

### Recommended Tone
[1–2 sentences on voice, formality, person]

### Vocabulary Level
[Describe technical depth — what can be assumed, what must be explained]

### Structure Pattern
- **Opening:** [How to start — problem framing, bold claim, stat, story]
- **Headings:** [Frequency and style — question-based, action-based, noun-based]
- **Paragraphs:** [Length guidance]
- **Code blocks:** [When and how to use them — snippets or full examples]
- **Lists:** [When to use bullets vs. prose]
- **Closing:** [How to end — CTA, reflection, next steps]

### Analogy Strategy
[How top writers on this topic use analogies — how often, how technical, real examples found]

### What Top Writers Do Differently
[3–5 specific, actionable observations from the analyzed articles]

### What to Avoid
[Patterns seen in weak articles, or things that feel generic/overdone on this topic]

### Recommended Opening Line Style
[Example opening line that fits the style — not the actual article, just the pattern]

---

## Usage

Invoke before drafting:
```
/style-research — analyze writing style for an article about [topic]
```

The Style Brief is then passed to the drafting phase so every writing decision
(word choice, heading style, analogy frequency, code depth) is grounded in how
the best writers actually handle this topic today — not generic writing advice.
