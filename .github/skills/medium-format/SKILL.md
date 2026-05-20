---
name: medium-format
description: "Use when: formatting articles for Medium publication, applying Medium-specific markdown, structuring content for the platform, preparing articles for publishing, or optimizing content presentation. Ensures content follows Medium best practices and displays perfectly."
---

# Medium Format Skill

Specialized skill for formatting and preparing technical articles for Medium publication.

## What This Skill Does

- **Markdown Formatting**: Apply Medium-compatible markdown
- **Structure Optimization**: Format for Medium's display
- **Visual Hierarchy**: Use heading and emphasis effectively
- **Code Formatting**: Display code examples beautifully
- **Media Integration**: Work with images and embeds
- **Readability Optimization**: Break up content effectively
- **Publication Workflow**: Prepare for posting

## Medium Markdown Guide

### Headings
Medium supports H1-H6. Use proper hierarchy:

```
# H1: Article Title (Use once, auto-set as title)
## H2: Main Section Heading
### H3: Subsection Heading
#### H4: Sub-subsection (rarely needed)
```

**Best Practices:**
- H1 is auto-filled with article title
- Start body content with H2
- Keep hierarchy consistent
- Don't skip heading levels (H2 → H4)

### Text Emphasis

```markdown
**Bold text** for emphasis and importance
*Italic text* for emphasis
~~Strikethrough~~ for corrections
`inline code` for function names, variables, commands
```

**When to Use:**
- **Bold**: Key concepts, important terms, action words
- *Italic*: Foreign words, thoughts, subtle emphasis
- `code`: Variable names, function names, file paths, commands

### Lists

**Unordered Lists:**
```markdown
- First item
- Second item
  - Nested item
  - Another nested
- Third item
```

**Ordered Lists:**
```markdown
1. First step
2. Second step
3. Third step
```

**Best Practices:**
- Lists break up text and improve scannability
- Use unordered for non-sequential items
- Use ordered for steps/instructions
- Limit nesting to 2 levels
- Keep items consistent length

### Code Blocks

**Inline Code** (not blocks):
```markdown
Use `const x = 5` for variables
```

**Code Blocks:**
~~~markdown
```javascript
// Language identifier after backticks
const greeting = (name) => {
  return `Hello, ${name}!`;
};

console.log(greeting('World'));
```
~~~

**Languages to Identify:**
```
javascript, python, java, sql, bash, css, html, jsx, tsx, go, rust
```

**Code Block Best Practices:**
- Always specify language for syntax highlighting
- Include complete, runnable examples
- Add comments explaining key lines
- Keep blocks under 20-30 lines
- Use multiple smaller blocks over one large block

### Blockquotes

```markdown
> "Quote or important note"
> - Source or attribution

> **Note:** Key information readers should remember
```

**Uses:**
- Important quotes or insights
- Key takeaways
- Warnings or important notes
- Citations

### Horizontal Rules

```markdown
---
```

Use to separate major sections or create visual breaks.

### Links

```markdown
[Visible link text](https://example.com)

[Visit my blog](https://yourblog.com)
```

**Best Practices:**
- Use descriptive anchor text (not "click here")
- Link to authoritative sources
- Include 2-4 external links per article
- Link to your previous relevant articles (1-2)
- Use full URLs (not shortened links)

### Images

Medium's editor handles images well:

**Using Medium's Editor:**
1. Click image icon in editor
2. Upload from computer or paste URL
3. Add caption
4. No markdown needed

**Markdown (if pasting):**
```markdown
![Alt text describing image](image-url)
```

**Image Best Practices:**
- Use high-quality images (4K or large)
- Add descriptive alt text (for accessibility and SEO)
- Include captions when needed
- Cover image should be 2000x1200px
- Use 1-2 images per major section

## Article Structure for Medium

### Before Title
- [ ] Cover image selected (2000x1200px recommended)
- [ ] Subtitle/description ready (optional, creates preview)

### Title + Metadata
- [ ] Main title optimized for SEO
- [ ] Subtitle that adds context (optional)
- [ ] 3-5 relevant tags selected

### Article Structure (recommended)
1. **Hook/Introduction** (2-3 paragraphs)
   - Grab attention
   - State the problem
   - Promise the solution

2. **Background/Context** (2-3 paragraphs)
   - Explain why this matters
   - Quick definitions
   - Set expectations

3. **Main Content** (Multiple H2 sections)
   - One concept per section
   - Explanation → Code → Insight pattern
   - 3-5 paragraphs per section

4. **Conclusion** (2-3 paragraphs)
   - Recap key points
   - Real-world application
   - Call-to-action

5. **Call-to-Action** (1-2 sentences)
   - Follow for more
   - Share this article
   - Leave comments

### Content Distribution

**Reading Time Goals:**
- 5 min read: ~1,200 words
- 10 min read: ~2,000 words
- 15 min read: ~3,500 words

**Structure Distribution:**
- Introduction: 5-10%
- Background: 10-15%
- Main Content: 70-80%
- Conclusion: 5-10%

## Formatting Best Practices

### Readability

**Paragraph Length:**
- Average 3-5 sentences
- Vary length (short + long)
- Max 2-3 lines on mobile

**Visual Breaks:**
- Use headers frequently (every 300 words)
- Include lists and code blocks
- Add images in longer articles
- Use blockquotes for emphasis

**Emphasis Hierarchy:**
- Bold for most important
- Headers for section breaks
- Lists for multiple items
- Code blocks for examples

### Code Integration

**When to Show Code:**
- Explain the problem
- Show the solution
- Discuss the key parts
- Explain benefits/drawbacks

**Multiple Related Examples:**
```markdown
### Before: The Problem
[explanation + code block]

### After: The Solution
[explanation + code block]

### Key Differences
- Point 1
- Point 2
```

## Publishing Preparation Checklist

- [ ] **Title**: Optimized, benefit-focused, keyword-included
- [ ] **Subtitle**: Provides additional context (optional)
- [ ] **Cover Image**: High quality, aspect ratio 2000x1200px
- [ ] **Tags**: 3-5 relevant, targeted tags
- [ ] **Headings**: Proper H2-H3 hierarchy
- [ ] **Paragraphs**: 3-5 sentences each, scannable
- [ ] **Lists**: Used for multiple items
- [ ] **Code Blocks**: Complete, commented, syntax-highlighted
- [ ] **Links**: Descriptive text, authoritative sources
- [ ] **Images**: High quality, proper alt text
- [ ] **Emphasis**: Bold for key terms and concepts
- [ ] **Quotes**: Blockquotes for important insights
- [ ] **Flow**: Logical progression, smooth transitions
- [ ] **Length**: Matches promised reading time
- [ ] **CTA**: Clear call-to-action at end
- [ ] **Proofreading**: No grammar/spelling errors
- [ ] **Author Bio**: Short (50-100 words) bio prepared
- [ ] **Related Articles**: Links to 1-2 previous articles (if relevant)

## Common Medium Issues and Fixes

| Issue | Solution |
|-------|----------|
| Code not highlighted | Add language identifier: ```javascript |
| Links not clickable | Use markdown format: [text](url) |
| Inconsistent formatting | Use consistent emphasis patterns |
| Images too large | Medium auto-resizes; ensure quality |
| Heading hierarchy broken | Check H2 → H3 → H4 order |
| Poor mobile experience | Test paragraph breaks, image size |
| Low engagement signal | Strong hook, clear value, CTA |

## Medium-Specific Tips

1. **First 30 seconds matter**: Hook readers immediately
2. **Mobile-first**: Most reads are on mobile; optimize for small screens
3. **Emphasis usage**: Moderate use of bold/italic improves engagement
4. **Subheadings**: Frequent headers improve scannability and algorithm signal
5. **Code blocks**: Well-formatted code increases time-on-page
6. **Images**: Breakup walls of text; Medium's algorithm favors varied content
7. **Publication timing**: Publish when your audience is active
8. **Engagement**: Respond to comments; algorithm boosts discussed articles

---

## Examples

### Example 1: Fix heading hierarchy in a draft

```
Input:  H1 title → H4 subsections (skips H2 and H3)
Fix:    Replace all H4 with H3; verify no heading levels are skipped throughout
Result: H1 title → H2 sections → H3 subsections
```

### Example 2: Format a code-heavy section

````
Input:  Raw Python block with no language identifier
Fix:
```python
# comment explaining purpose
def process(data: list) -> dict:
    ...
```
Also add inline `backticks` to variable names (e.g., `data`, `process`) in the surrounding prose
````

---

## Error Handling

| Error | Handling |
|-------|----------|
| Code block missing language identifier | Infer from surrounding context; default to `text` if ambiguous |
| Image URL returns 404 | Remove the image tag; insert `[IMAGE PLACEHOLDER — replace with final URL]` for the author |
| Heading levels skip (e.g., H2 → H4) | Insert the missing H3 level or flatten the hierarchy |
| Article exceeds target reading time | Flag which sections are longest but do not cut content automatically — that is the author's decision |

---

## Next Steps

After formatting, run through the full **Publishing Preparation Checklist** in this skill. When every checkbox passes, the article is ready to publish on Medium.

---

## Related Skills

- `/seo-optimization` — run before this skill; provides the optimized title and tags
- `/bibliography` — run before this skill; citations must be inserted before final formatting
- `/technical-writing` — run before this skill; code examples must be complete before formatting
