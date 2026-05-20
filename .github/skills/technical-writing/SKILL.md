---
name: technical-writing
description: "Use when: drafting technical content, ensuring code accuracy, explaining complex concepts clearly, structuring technical arguments, reviewing for technical clarity, or validating code examples. Ensures content is accurate, professional, and accessible."
---

# Technical Writing Skill

Specialized skill for writing clear, accurate, and professional technical content.

## What This Skill Does

- **Technical Accuracy**: Verify correctness of concepts and code
- **Clarity & Simplification**: Explain complex ideas accessibly
- **Code Excellence**: Ensure code examples are production-ready
- **Logical Flow**: Structure arguments persuasively
- **Documentation Quality**: Create complete, professional content
- **Audience Adaptation**: Match content to developer audience

## Technical Writing Principles

### 1. Accuracy First
- Verify all technical claims with sources
- Test code examples before inclusion
- Check version numbers and compatibility
- Note deprecated approaches
- Validate against official docs

### 2. Progressive Disclosure
Introduce concepts from simple to complex:
1. **Basic Concept**: What is this?
2. **Why It Matters**: When do you use it?
3. **How It Works**: Deep dive with examples
4. **Advanced Usage**: Optimization and edge cases
5. **Conclusion**: Recap and next steps

### 3. Code Quality

#### Code Examples Should:
- Be complete and runnable (not snippets)
- Include comments explaining key parts
- Demonstrate best practices
- Show common pitfalls
- Be tested and verified
- Match the library/framework version mentioned

#### Code Block Structure:
```python
# Clear comment explaining purpose
# And any setup needed

def example_function(param: str) -> str:
    """Docstring explaining what and why."""
    # Implementation
    return result
```

#### Multiple Examples:
- ❌ Wrong way (show common mistakes)
- ✅ Right way (correct approach)
- 🚀 Advanced way (optimization or advanced pattern)

### 4. Explanation Quality

#### Avoid:
- Technical jargon without definition
- Assumptions about reader knowledge
- Oversimplification of complex topics
- Wall-of-text paragraphs

#### Use:
- Definitions for specialized terms
- Analogies to familiar concepts
- Progressive complexity
- Visual breaks (lists, formatting)

#### Definition Pattern:
> **Term**: Brief 1-sentence definition. More context about why it matters, when to use it, and how it fits in the bigger picture.

### 5. Structure for Readability

#### Effective Section Organization:
1. **Introduction**: What's this section about?
2. **Concept Explanation**: Background and theory
3. **Code Example**: Practical demonstration
4. **Key Takeaway**: Summary and important point
5. **When to Use**: Real-world application

#### Strong Headers:
- ❌ "The Basics"
- ✅ "Understanding Closures in JavaScript"
- ✅ "When to Use Async/Await vs Promises"

### 6. Common Technical Writing Patterns

#### The "Problem → Solution → Code" Pattern
1. **Identify the Problem**: What challenge are developers facing?
2. **Explain the Solution**: How does this concept/tool solve it?
3. **Show the Code**: Practical example
4. **Highlight the Benefits**: Why should readers care?

#### The "Concept Explanation" Pattern
1. **Simple Definition**: One-sentence explanation
2. **Why It Matters**: Relevance and importance
3. **How It Works**: Mechanism or process
4. **Code Example**: Practical application
5. **Advanced Considerations**: Edge cases or optimizations

#### The "Comparison" Pattern
1. **Setup**: What are we comparing?
2. **Approach A**: Explanation + code
3. **Approach B**: Explanation + code
4. **Comparison Table**: Side-by-side analysis
5. **Recommendation**: When to use each

## Quality Checklist

### Accuracy
- [ ] All code examples tested and runnable
- [ ] Technical facts verified with sources
- [ ] Version numbers are current
- [ ] API usage matches documentation
- [ ] No deprecated patterns presented as current

### Clarity
- [ ] Technical terms are defined
- [ ] Concepts explained simply first, then deeper
- [ ] Logical flow from intro to conclusion
- [ ] Paragraphs are focused (one idea each)
- [ ] Examples match explanations

### Completeness
- [ ] All code examples are complete
- [ ] Code is properly commented
- [ ] Error handling is shown
- [ ] Edge cases are addressed
- [ ] "Next steps" or related topics mentioned

### Professionalism
- [ ] Consistent terminology
- [ ] Professional tone throughout
- [ ] No spelling or grammar errors
- [ ] Proper code formatting
- [ ] Consistent style (naming conventions, formatting)

## Developer Audience Considerations

### What Developers Value
- **Practical**: Can they use it immediately?
- **Efficient**: Does it solve their problem quickly?
- **Accurate**: Is it technically correct?
- **Complete**: Are edge cases covered?
- **Relevant**: Does it match their stack/experience?

### Communication Style
- Direct and concise (developers value time)
- Assumptions: intermediate programming knowledge
- Show code early and often
- Acknowledge limitations or trade-offs
- Provide references for deeper learning

### Common Mistakes to Avoid
- ❌ Oversimplifying complex topics
- ❌ Code that won't actually run
- ❌ Ignoring error handling
- ❌ Missing important edge cases
- ❌ Writing only "why" without "how"
- ❌ Assuming too much background knowledge

---

## Examples

### Example 1: Draft the "How It Works" section for vector embeddings

```
Pattern: Simple definition → visual analogy → code example → key insight

1. One-sentence definition: "An embedding is a fixed-size numerical vector that represents text meaning."
2. Analogy: "Think of it as a point in high-dimensional space where similar meanings cluster together."
3. Code block: sentence_transformers encode() with comments
4. Key insight: why cosine similarity works better than Euclidean distance here
```

### Example 2: Review code accuracy for a Redis caching example

```
Checklist applied to the submitted snippet:
✅ Code is complete and runnable
✅ Version matches documented Redis 7.x syntax
✅ Error handling shown (ConnectionError catch block)
❌ TTL value hardcoded as 3600 — flag for config extraction
❌ No comment explaining why TTL is set to 1 hour — add inline note
```

---

## Error Handling

| Error | Handling |
|-------|----------|
| Code example cannot be tested locally | Add a comment with the version it targets; note in the article that readers should verify against their version |
| Technical claim lacks a source | Flag inline with `[citation needed]`; do not finalize the article until `/content-research` provides a source |
| Concept too advanced for target audience | Apply progressive disclosure: one-sentence definition → simple analogy → technical detail |
| Code block exceeds 30 lines | Split into smaller focused blocks; each block illustrates one concept |

---

## Next Steps

After drafting all sections, pass the article to `/seo-optimization` for title and tag optimization, then `/bibliography` to insert citation markers, then `/medium-format` for final formatting.

---

## Related Skills

- `/outline-generation` — provides the structure to draft against
- `/content-research` — supplies verified sources for technical claims
- `/seo-optimization` — optimizes title and structure after drafting
- `/bibliography` — inserts citation markers after writing is complete
