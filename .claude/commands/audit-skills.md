# audit-skills

Automated skill quality audit pipeline with checklist scoring, eval testing, fix generation, and comprehensive reporting.

## What This Command Does

Runs a 10-step pipeline to audit Claude Code custom slash commands and skills:
1. **Discovery** — Find skill/command files via glob patterns
2. **Checklist Scoring** — Score against 36-item quality standard (AUTO/LLM/EXEC checks)
3. **Test Prompt Generation** — Create baseline + failure-targeted prompts with assertions
4. **Run Test Prompts** — Parallel with-skill vs without-skill agent comparison
5. **Fix Generation** — Propose edits for failing items
6. **Apply Fixes + Re-test** — Apply edits and verify previously-failing prompts
7. **Full Re-test** — Run all prompts to catch regressions
8. **Convergence Loop** — Iterate up to 3 times until stable or unresolved
9. **Report Generation** — Markdown + JSON output with scores and recommendations
10. **HTML Report** — Generate cumulative HTML dashboard with all audit metrics

## Arguments

The user provides arguments after `/audit-skills`. Parse them as follows:
- First positional arg: skill name (e.g., `pdf-upload`) — OR `--all` to audit every skill
- `--checklist-only`: Skip eval testing, only run the 36-item checklist
- `--fix`: Auto-apply proposed fixes without asking for confirmation
- `--force`: Re-run even if a recent report exists
- `--output-dir <path>`: Custom output directory (default: `./skill-audit-output/`)

## Pipeline Steps

### Step 0: Discovery

Find target skill(s) to audit:
- If `--all`: `Glob(".github/skills/*/SKILL.md")` to find all skills in this project
- If single name: check `<project-root>/.github/skills/<name>/SKILL.md`
- Read file content
- Extract frontmatter if present (name, description, allowed-tools)

Error handling:
- Skill not found: report CRITICAL failure, exit with clear message
- Malformed frontmatter: report as FAIL on checklist item 1, continue with partial data

### Step 1: Checklist Scoring

Score against 36-item quality standard. For each item:
- **AUTO** items: programmatic checks (file exists, frontmatter valid, etc.) using Glob, Grep, parsing
- **LLM** items: judgment-based (description clarity, trigger specificity) — evaluate by reading the skill
- **EXEC** items: requires execution (smoke tests, agent spawning) — mark SKIP if `--checklist-only`

#### The 30-Item Checklist

**File and Folder Setup (4 items)**:
| # | Check | Type | How to Verify |
|---|-------|------|---------------|
| 1 | Folder uses lowercase-with-dashes (or file is kebab-case .md) | AUTO | Glob pattern match on folder/file name |
| 2 | Folder/file name matches `name:` field in frontmatter | AUTO | Read frontmatter, compare to name |
| 3 | File is called `SKILL.md` or `<name>.md` (correct convention) | AUTO | Glob for expected file |
| 4 | YAML header opens/closes with `---` (if frontmatter present) | AUTO | Regex on first lines |

**Description (5 items)**:
| # | Check | Type | How to Verify |
|---|-------|------|---------------|
| 5 | First sentence explains what skill does in plain English | LLM | Read description, judge clarity |
| 6 | Includes "Use when..." trigger phrases (or clear purpose statement) | AUTO | Grep for "Use when" or "use when" |
| 7 | Under 1,024 characters total | AUTO | Character count of description |
| 8 | No angle brackets `<` or `>` in description (template placeholders left in) | AUTO | Regex check |
| 9 | Does not trigger on unrelated requests | LLM | Consider 5 off-topic prompts |

**Instructions (6 items)**:
| # | Check | Type | How to Verify |
|---|-------|------|---------------|
| 10 | Written as bullets/numbered steps, not paragraphs | LLM | Check formatting structure |
| 11 | Most important instructions at top | LLM | Judge ordering of content |
| 12 | Includes actual commands to run (code blocks or backtick commands) | AUTO | Grep for code blocks |
| 13 | Matches real project setup (no outdated tools/paths) | LLM | Cross-reference with project files |
| 14 | No hardcoded limits that belong in config | LLM | Check for magic numbers |
| 15 | Under 5,000 words (move detail to references/) | AUTO | Word count of file body |

**Required Sections (5 items)**:
| # | Check | Type | How to Verify |
|---|-------|------|---------------|
| 16 | Has "What This Skill Does" or equivalent overview section | AUTO | Grep for heading |
| 17 | Has "Examples" section with 2+ examples | AUTO | Grep for heading + count examples |
| 18 | Has "Error Handling" section | AUTO | Grep for heading |
| 19 | Has "Next Steps" section | AUTO | Grep for heading |
| 20 | Has "Related Skills" or "Related Commands" section | AUTO | Grep for heading |

**Trigger Testing (4 items)**:
| # | Check | Type | How to Verify |
|---|-------|------|---------------|
| 21 | Description covers 10 different phrasings (9/10 target) | LLM | Generate 10 prompts, judge trigger rate |
| 22 | Triggers on casual language rephrasing | LLM | Rephrase casually, check triggers |
| 23 | Does NOT trigger on 5 unrelated questions | LLM | Test 5 off-topic, verify no trigger |
| 24 | Has "Do NOT use for..." if over-triggers | AUTO | Check for exclusion phrases (only needed if 23 fails) |

**Registration (3 items)**:
| # | Check | Type | How to Verify |
|---|-------|------|---------------|
| 25 | Listed in agent file(s) if `.github/agents/` exists | AUTO | Grep agent files for skill name (SKIP if no agents dir) |
| 26 | Has entry in `.claude/commands/README.md` or `.claude/skills/README.md` | AUTO | Grep README (SKIP if no README) |
| 27 | Cross-references are up to date | AUTO | Verify referenced files exist (SKIP if no cross-refs) |

**Smoke Test (3 items)**:
| # | Check | Type | How to Verify |
|---|-------|------|---------------|
| 28 | Normal input produces correct output | EXEC | Run skill with standard prompt |
| 29 | Bad/missing input fails gracefully | EXEC | Run skill with invalid input |
| 30 | 3 consecutive runs produce consistent format | EXEC | Run 3 times, compare structure |

**Security & Portability (6 items)**:
| # | Check | Type | How to Verify |
|---|-------|------|---------------|
| 31 | No reserved words ("claude" / "anthropic") in name field | AUTO | Regex `/claude|anthropic/i` on name field value |
| 32 | No README.md inside skill folder | AUTO | Glob for README.md in skill directory; PASS if absent |
| 33 | References/ files linked from SKILL.md (if references/ exists) | AUTO+LLM | Check if references/ dir exists; if yes, verify SKILL.md mentions those files (SKIP if no references/) |
| 34 | No vague/ambiguous instructions (no weasel words without specifics) | LLM | Check for "properly", "things", "as needed", "correctly" etc. without concrete details |
| 35 | Description mentions file types (if skill is file-type-specific) | LLM | If skill processes specific file types, verify description names them (SKIP if not file-type-specific) |
| 36 | Has compatibility field when MCP/environment-dependent | LLM | If skill references MCP servers, CLI tools, or system packages, verify compatibility field exists (SKIP if standalone) |

**Category string for items 31-36**: Use `"Security & Portability"` in the JSON output.

**Expected reasons/failure_detail examples for items 31-36**:

| # | PASS reason example | FAIL reason + failure_detail example |
|---|---|---|
| 31 | `"Name 'deploy-app' contains no reserved words"` | why: `"Name contains reserved word 'claude'"`, expected: `"No 'claude' or 'anthropic' in name"`, actual: `"name: claude-helper"`, how_to_fix: `"Rename to a descriptive name without reserved words (e.g., 'code-helper')"` |
| 32 | `"No README.md found in skill folder"` | why: `"README.md exists inside skill folder"`, expected: `"No README.md in skill directory"`, actual: `"Found ./my-skill/README.md"`, how_to_fix: `"Delete README.md; put documentation in SKILL.md or references/"` |
| 33 | `"SKILL.md references all 3 files in references/"` | why: `"references/ exists but SKILL.md never mentions its files"`, expected: `"SKILL.md links to reference files"`, actual: `"references/api-guide.md not mentioned anywhere in SKILL.md"`, how_to_fix: `"Add 'See references/api-guide.md for...' in the relevant instruction step"` |
| 34 | `"All instructions are specific and actionable"` | why: `"Vague instruction without concrete details"`, expected: `"Specific, actionable guidance"`, actual: `"Line 42: 'Make sure to validate things properly'"`, how_to_fix: `"Replace with specific validation steps: what to check, what values are valid, what to do on failure"` |
| 35 | `"Description mentions .csv and .xlsx file types"` (or SKIP: `"Skill is not file-type-specific"`) | why: `"Skill processes PDFs but description doesn't mention file type"`, expected: `"File types named in description for triggering"`, actual: `"Description says 'processes documents' without specifying PDF/.pdf"`, how_to_fix: `"Add '.pdf' or 'PDF files' to the description field"` |
| 36 | `"Has compatibility field listing mcp-server: notion"` (or SKIP: `"No MCP or external dependencies"`) | why: `"Skill requires Notion MCP but has no compatibility field"`, expected: `"compatibility field listing required MCP server"`, actual: `"Instructions reference 'Call MCP tool: create_page' but no compatibility declared"`, how_to_fix: `"Add 'compatibility: Requires mcp-server: notion' to frontmatter"` |

Output per item:
```json
{
  "item_id": "C01",
  "category": "File and Folder Setup",
  "description": "Folder uses lowercase-with-dashes",
  "type": "AUTO",
  "status": "PASS|FAIL|SKIP",
  "details": "explanation",
  "severity": "critical|major|minor"
}
```

Scoring: PASS = 1 point, FAIL = 0 points, SKIP = excluded from denominator. Score = PASS / (PASS + FAIL) * 100.

### Step 2: Test Prompt Generation

Generate 3 baseline prompts from skill description and examples:
- **Template 1 (Direct Request)**: "I need to [action the skill performs]. [Optional context]."
- **Template 2 (Edge Case)**: "[Unusual context or constraint]. [Request that should still trigger]."
- **Template 3 (Error Scenario)**: "[Something failed or produced unexpected output]. [Request for help]."

For each FAIL from Step 1, generate 1 failure-targeted prompt.

For each prompt, create 6 assertions (binary PASS/FAIL):
1. **Command correctness**: References the correct command/API/path
2. **Domain knowledge**: Mentions key concepts relevant to the operation
3. **Guidance quality**: Provides actionable next steps or troubleshooting
4. **Cross-references**: References related skills or documentation
5. **Constraint adherence**: Does not suggest incorrect approaches
6. **Completeness**: Covers all aspects of the operation

### Step 3: Run Test Prompts (Parallel)

For each prompt, spawn 2 agents in parallel:

**With-skill agent**: Read the skill file, then answer the prompt following skill instructions exactly.

**Without-skill agent**: Answer from project context only. Do NOT read .claude/skills/ or .claude/commands/.

**Judge agent**: Score each response against the 6 assertions. Return JSON with assertion_id: PASS|FAIL and reason.

Cap concurrent agents at 4. Timeout: 180 seconds per agent. Retry once on timeout, then SKIP.

Key metric: Average delta = with-skill score - without-skill score. Positive = skill adds value.

### Step 4: Fix Generation

Collect all FAILs from Steps 1 and 3. Group by root cause:
- Missing sections -> Add section
- Vague description -> Rewrite with specifics
- Trigger too broad -> Add negative examples
- Missing error handling -> Add error handling section
- No examples -> Generate examples from prompts

Generate Edit operations. Present to user for approval unless `--fix` flag is set.

Priority: critical (file structure) > major (core sections, triggers) > minor (formatting).

### Step 5: Apply Fixes + Re-test

Apply approved edits. Re-run ONLY previously-failing prompts. Compare iteration 2 vs iteration 1.

### Step 6: Full Re-test

Re-run ALL prompts. Flag regressions (any assertion PASS in iteration 1 but FAIL in iteration 2).

### Step 7: Convergence Loop

If new failures in Step 6: generate fixes, apply, re-test, full re-test. Loop max 3 times. After 3 iterations, flag remaining as UNRESOLVED.

Exit conditions: All PASS -> SUCCESS. No new failures -> STABLE. Max iterations -> UNRESOLVED.

### Step 8: Report Generation

1. Write per-skill markdown: `./skill-audit-output/{name}-audit.md`
2. Write per-skill JSON: `./skill-audit-output/{name}-eval.json` following the schema:

```json
{
  "skill_name": "string",
  "skill_path": "string",
  "timestamp": "ISO 8601",
  "model": "string",
  "checklist": {
    "total": 36,
    "passed": "number",
    "failed": "number",
    "skipped": "number",
    "items": [{"number": 1, "text": "...", "category": "...", "type": "AUTO|LLM|EXEC", "status": "PASS|FAIL|SKIP", "reason": "..."}]
  },
  "eval": {
    "iterations": [{
      "iteration": 1,
      "note": "Before fixes | After fixes",
      "prompts": [{
        "id": "baseline-1",
        "text": "prompt text",
        "type": "baseline|failure-targeted",
        "results": {
          "with_skill": {"assertions": [{"id": "A1", "text": "...", "verdict": "PASS|FAIL", "evidence": "..."}], "pass_count": 5, "total": 6, "duration_seconds": 42.3, "token_count": 11400},
          "without_skill": {"assertions": [...], "pass_count": 2, "total": 6, "duration_seconds": 83.1, "token_count": 31000}
        }
      }],
      "aggregate": {
        "with_skill": {"pass_rate": 0.94, "total_assertions": 18, "passed": 17, "avg_duration": 41.2, "avg_tokens": 11200},
        "without_skill": {"pass_rate": 0.28, "total_assertions": 18, "passed": 5, "avg_duration": 82.5, "avg_tokens": 30500},
        "delta": "+66%"
      }
    }]
  },
  "fixes": [{"iteration": 1, "changes": [{"section": "...", "action": "add|edit|remove", "description": "..."}]}],
  "summary": {"grade": "A|B|C|D|F", "pre_fix_score": "22/30", "post_fix_score": "28/30", "with_skill_pass_rate": "94%", "without_skill_pass_rate": "28%", "delta": "+66%", "unresolved_items": []}
}
```

3. Update cumulative manifest: read `./skill-audit-output/audit-data.json` (or create `[]`), replace existing entry with same skill_name or append, write back.
4. Generate HTML report by running the Node generator from the installed plugin. Run:

   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/generate-report.mjs" ./skill-audit-output/audit-data.json -o ./skill-audit-output/audit-report.html
   ```

   `${CLAUDE_PLUGIN_ROOT}` is set by Claude Code to the plugin's install directory — do NOT hardcode a repo path. Node is available on every machine that runs Claude Code, so this is the primary path.

   Fallbacks if the above fails:
   - If `${CLAUDE_PLUGIN_ROOT}` is unset (older Claude Code), derive it from the plugin manifest: look up the path of the `audit-skills` command and walk up to the plugin root
   - If `node` fails and Python is available, retry with `python "${CLAUDE_PLUGIN_ROOT}/generate-report.py" ...` (the Python generator is retained as a compatibility fallback and will be removed in a future release)
   - If both runtimes fail, skip HTML generation and print a clear warning showing the command that was attempted and the JSON path the user can feed to the generator manually

Key behavior: running on another skill later adds to the SAME `audit-report.html`. Re-auditing replaces the entry (no duplicates).

### Step 9: Summary (--all mode only)

Write `./skill-audit-output/SUMMARY.md` with aggregate table linking to individual reports.

## Grading Scale

- **A (90-100%)**: Excellent — all critical items pass, high eval delta
- **B (80-89%)**: Good — minor issues, positive eval delta
- **C (70-79%)**: Acceptable — some issues, small eval impact
- **D (60-69%)**: Needs work — multiple failures, negligible eval benefit
- **F (<60%)**: Failing — critical issues, negative eval delta or regressions

## Error Handling

| Error | Handling |
|-------|----------|
| Skill file missing/malformed | CRITICAL failure, skip remaining steps, mark as FAIL |
| Agent timeout | Retry once (180s), then mark assertion as SKIP |
| No checklist failures | Still run 3 baseline prompts |
| Fix causes regression | Convergence loop catches it, iterates or flags UNRESOLVED |
| All mode crash | Progress saved per skill, resume from last completed |
| Output dir permission error | Fallback to `./tmp-skill-audit/`, warn user |

## Configuration

- Max concurrent agents: 4
- Max convergence iterations: 3
- Agent timeout: 180 seconds
- Sequential skill processing in `--all` mode

## Examples

```
User: /audit-skills pdf-upload

Output:
Auditing skill: pdf-upload
Step 0: Discovery — Found at .claude/skills/pdf-upload/SKILL.md
Step 1: Checklist — 24/28 items PASS (85.7%)
Step 2: Generated 7 test prompts (3 baseline + 4 failure-targeted)
Step 3: Eval — Avg delta +3.2 (skill effective)
Step 4: Generated 4 fixes
Step 5: Applied 4 fixes, 3/4 resolved
Step 6: Full re-test — No regressions
Step 7: Convergence — Stable after 2 iterations

Final Score: 92.9% (26/28) — Grade: A
Report: ./skill-audit-output/pdf-upload-audit.md
HTML: ./skill-audit-output/audit-report.html
```

```
User: /audit-skills run-tests --checklist-only

Output:
Auditing skill: run-tests (checklist only)
Step 0: Discovery — Found
Step 1: Checklist — 34/36 items PASS (94.4%)
  FAIL C15: Performance notes missing
  FAIL D08: Integration tests missing
Skipping eval steps (--checklist-only)

Final Score: 93.3% — Grade: A
Report: ./skill-audit-output/run-tests-audit.md
```
