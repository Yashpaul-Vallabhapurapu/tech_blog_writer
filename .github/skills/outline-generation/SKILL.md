---
name: outline-generation
description: "Use when: creating blog post outlines, planning article structure, organizing ideas for technical posts, breaking down complex topics, or structuring blog content. Generates comprehensive outlines that serve as blueprints for writing."
---

# Outline Generation Skill

Specialized skill for creating well-structured outlines for technical blog posts.

## What This Skill Does

- **Topic Analysis**: Break down complex topics into manageable sections
- **Structure Planning**: Create logical, progressive information hierarchy
- **Content Organization**: Plan section flow and logical progression
- **Depth Estimation**: Estimate content needs per section
- **Example Planning**: Identify where code examples fit
- **Engagement Hooks**: Plan attention-grabbing elements

## Outline Structure

A strong blog post outline follows this pattern:

```
# Article Title

## I. Introduction
   A. Hook (problem statement or surprising fact)
   B. Background (brief context)
   C. What readers will learn (promise)

## II. Section 1: [Concept/Aspect 1]
   A. Concept explanation
   B. Why it matters
   C. Example/demonstration

## III. Section 2: [Concept/Aspect 2]
   A. Building on previous section
   B. New perspective or deeper concept
   C. Example/demonstration

## IV. Section 3: [Concept/Aspect 3]
   A. Advanced or practical application
   B. Real-world usage
   C. Code example

## V. Conclusion
   A. Recap key learnings
   B. Real-world application
   C. Call-to-action

## VI. Additional Resources (optional)
   A. Further reading
   B. Related articles
   C. Tools/libraries
```

## Outline Creation Process

### 1. Topic Definition
Start by clearly defining:
- **Main Topic**: The core subject
- **Target Audience**: Who are readers? (Beginner, intermediate, expert)
- **Learning Outcome**: What should readers know/be able to do?
- **Scope**: What's included/excluded?
- **Length Target**: Reading time and word count goal

**Example:**
- Topic: "React Hooks Best Practices"
- Audience: Intermediate React developers
- Outcome: Learn practical patterns for using hooks effectively
- Scope: Built-in hooks (not custom), production patterns
- Target: 10-minute read (~2,000 words)

### 2. Main Sections (Brainstorm)
Identify 3-5 main sections:

**Template for Section Generation:**
```
For topic "X":
1. Foundational concepts readers need to understand
2. Core patterns or approaches
3. Advanced or specialized usage
4. Common mistakes and solutions
5. Practical application/real-world example
6. Performance or optimization considerations
```

**For "React Hooks Best Practices":**
1. Understanding the Hook Rules
2. Custom Hooks Pattern
3. Avoiding Common Pitfalls
4. Performance Optimization with Hooks
5. Testing Hooks-based Components
6. Real-world: Building a Custom Hook

### 3. Section Breakdown

For each main section (H2), create subsections (H3):

```
## Main Section
   ### Concept Explanation
   ### Why It Matters
   ### Code Example
   ### Key Takeaway
```

**For "Understanding the Hook Rules":**
```
## Understanding the Hook Rules
   ### Rule 1: Only Call at Top Level
   ### Rule 2: Only Call in React Functions
   ### Rule 3: Order Matters
   ### Common Violations & Fixes
   ### Why These Rules Matter
```

### 4. Content Planning

For each section, note:
- **Type**: Explanation, code example, comparison, pattern
- **Key Points**: Main ideas to convey
- **Code Examples**: What to demonstrate
- **Length**: Estimated word count

**Example:**
```
## Custom Hooks Pattern
   Type: Concept + Pattern + Code
   Key Points:
   - What is a custom hook
   - When to extract custom hooks
   - Naming conventions
   - Rules apply to custom hooks too
   
   Code Examples:
   - useWindowSize example
   - useAPI example
   - useLocalStorage example
   
   Length: 400-500 words + code
```

### 5. Flow & Progression

Arrange sections to build knowledge progressively:

```
1. Fundamentals → 2. Basic Usage → 3. Patterns → 4. Advanced → 5. Real-world
```

**For "React Hooks":**
1. Hook Rules (fundamentals)
2. Common Hooks (built-ins)
3. Custom Hooks (patterns)
4. Performance (advanced)
5. Testing (practical)

### 6. Visual & Example Planning

Plan where code examples, images, and callouts go:

```
## Section
[explanation paragraph 1]
[explanation paragraph 2]

### Code Example
[code block showing concept]

[explanation of code]

### Key Insight / Callout
[important point or warning]

[conclusion paragraph]
```

## Common Outline Patterns

### Pattern 1: Problem → Solution → Implementation
```
I. The Problem (why this matters)
II. The Solution (high-level approach)
III. Implementation Deep Dive
IV. Best Practices
V. Real-world Examples
VI. Common Pitfalls
```

**Use for:** How-to guides, tool/library features, architecture decisions

### Pattern 2: Concept → Variations → Advanced
```
I. Core Concept (fundamentals)
II. Variant A (approach 1)
III. Variant B (approach 2)
IV. Variant C (approach 3)
V. When to Use Each
VI. Advanced Considerations
```

**Use for:** Comparison guides, multiple approaches, learning progressions

### Pattern 3: Theory → Practice → Application
```
I. Theory/Background (why it exists)
II. How It Works (mechanisms)
III. Basic Implementation (simple example)
IV. Advanced Implementation (optimized)
V. Real-world Case Study
VI. Performance/Optimization
```

**Use for:** Complex technical topics, system design, algorithms

### Pattern 4: Quick Start → Deep Dive → Mastery
```
I. Quick Start (get running fast)
II. Fundamentals (deeper understanding)
III. Common Patterns (practical usage)
IV. Advanced Topics (optimization)
V. Troubleshooting (common issues)
VI. References (further learning)
```

**Use for:** Library/framework guides, comprehensive tutorials

## Section Writing Guidelines

For each section, follow this pattern:

```markdown
## Section Title

[1-2 sentence intro explaining what this section covers]

### Subsection/Concept
[2-3 sentences explaining the concept clearly]

[Code example if applicable]

[Explanation of the code and key points]

### Key Takeaway
[1-2 sentences summarizing the section]
```

## Outline Quality Checklist

- [ ] **Clear Topic**: Article topic is specific and focused
- [ ] **Logical Flow**: Sections build on each other
- [ ] **Progressive Depth**: Beginner → intermediate → advanced
- [ ] **Right Level**: Matches target audience knowledge
- [ ] **Complete Coverage**: All important aspects covered
- [ ] **Balanced Sections**: No single section dominates
- [ ] **Code Planned**: Examples placed strategically
- [ ] **Hook Included**: Opening creates interest
- [ ] **CTA Included**: Conclusion directs readers
- [ ] **Realistic Scope**: Fits target reading time
- [ ] **Unique Angle**: Offers perspective on topic

## Example: Complete Outline

### Article: "Mastering async/await in JavaScript"

```
I. Introduction
   A. The promise problem (callback hell)
   B. How async/await improves code
   C. What you'll learn

II. Understanding Promises (Quick Review)
   A. What are promises?
   B. Promise states and methods
   C. Code example

III. Async Function Basics
   A. Syntax and structure
   B. How async functions work
   C. Basic example

IV. The await Keyword
   A. What await does
   B. Error handling with try/catch
   C. Multiple awaits in sequence
   D. Parallel vs sequential execution

V. Common Patterns
   A. Error handling patterns
   B. Timeout patterns
   C. Retry patterns
   D. Batch processing

VI. Performance Optimization
   A. Sequential vs parallel execution
   B. Promise.all optimization
   C. Avoiding unnecessary awaits

VII. Debugging async Code
   A. Common mistakes
   B. Browser dev tools
   C. Logging strategies

VIII. Real-world Case Study
   A. API fetching implementation
   B. Handling timeouts
   C. Error recovery

IX. Conclusion
   A. Key principles recap
   B. Practice suggestion
   C. Further learning resources
```

## Tips for Strong Outlines

1. **Use Active Voice**: "Creating Custom Hooks" (not "How Custom Hooks Are Created")
2. **Parallel Structure**: Similar sections use similar heading format
3. **Show Depth**: Use H3s to break down H2 sections
4. **Balance Length**: Sections should be roughly equal (±20% words)
5. **Plan Examples**: Note code examples before writing
6. **Include Transitions**: Plan how sections connect
7. **Add Hooks**: Plan attention-grabbing elements (callouts, questions)
8. **Front-load Value**: Put most important/interesting info early
9. **Test Structure**: Read outline; does it make sense standalone?
10. **Be Specific**: Use specific terms, not generic headings

---

## Examples

### Example 1: 10-minute article on React Server Components

```
Topic: React Server Components | Audience: Intermediate React devs | Target: 2,000 words
Pattern: Theory → Practice → Application

I.   What React Server Components Are
II.  Server vs Client Components — Where the Line Is
III. When to Use RSC (and When Not To)
IV.  Implementation: Fetching Data on the Server
V.   Common Pitfalls and How to Avoid Them
VI.  Migration Guide for Existing Apps
```

### Example 2: Beginner guide to Docker networking

```
Topic: Docker networking | Audience: Beginners | Target: 1,500 words
Pattern: Quick Start → Deep Dive → Mastery

I.   Your First Container Network (get something working fast)
II.  Bridge vs Host vs Overlay — What Each Mode Does
III. Connecting Two Containers
IV.  DNS in Docker: How Containers Find Each Other
V.   Debugging Network Issues
```

---

## Error Handling

| Error | Handling |
|-------|----------|
| Topic too broad (e.g., "cloud computing") | Ask the agent to narrow scope before generating; suggest a specific aspect |
| Topic too narrow for target word count | Suggest merging with an adjacent concept or reducing the target reading time |
| Sections do not build progressively | Reorder to enforce fundamentals → intermediate → advanced |
| Target audience unclear | Ask for clarification; beginner vs expert changes section depth significantly |

---

## Next Steps

Review the outline with the agent, then pass to `/diagram-generation` to identify which sections need figures. Begin drafting section by section with `/technical-writing`.

---

## Related Skills

- `/style-research` — run before outlining to align structure with contemporary writing patterns
- `/diagram-generation` — use after outlining to flag sections that need visuals
- `/technical-writing` — drafts each outlined section in sequence
