### Purpose

Resolve one stable target, run two independent assessments, synthesize a design critique, persist a snapshot, and ask the user what to improve next. The chat response is the primary deliverable; the snapshot is an archive/backlog for future commands.

### Hard Invariants

- Assessment A (design review) is always required.
- Assessment B (detector evidence) is an optional enhancement that strengthens the critique when available.
- Assessment A must finish before detector findings enter the synthesis context. Detector output is deterministic, but it still anchors judgment.
- If sub-agents are unavailable, fall back sequentially: finish Assessment A first, then run Assessment B if detector is available, then synthesize.
- A skipped detector does NOT invalidate the critique. A critique without detector evidence is still a valid critique; one with detector evidence has stronger objectivity.
- Viewable targets benefit from browser inspection when available.

### Setup: Resolve Target and Load Ignore List

Before gathering assessments, do two small bookkeeping steps. They cost almost nothing and they're what makes critique iterative across runs.

1. **Resolve the primary artifact.** The user's phrasing ("the homepage", "the pricing flow") is not stable enough to track across runs. Resolve it to a concrete file path or URL: the same one you'd already need to scan code or open in a browser. Examples:
   - "the homepage" → `site/pages/index.astro` (or `http://localhost:3000/` if you're inspecting live)
   - "the settings modal" → the primary component file (e.g., `src/components/Settings.tsx`)
   - "this page" → the URL or the page's source file
   Prefer the source file path over the dev-server URL when both exist; ports drift between runs (`bun dev` vs `bun preview`), file paths don't.

2. **Compute the slug.** Run:
   ```bash
   node .kiro/skills/impeccable/scripts/critique-storage.mjs slug "<resolved-path-or-url>"
   ```
   Keep the printed slug. It identifies this target's stream across runs. If the command exits non-zero ("no stable slug for input"), skip persistence for this run and tell the user; the trend won't update but the critique still goes ahead.

3. **Read the ignore list** at `.impeccable/critique/ignore.md` if it exists. Plain markdown; each non-empty, non-comment line is something the user has marked as "do not re-raise" (deferred tradeoffs, designer-intended deviations, detector false-positives the user accepts). When a finding's text matches a line here (case-insensitive substring against rule name or snippet), **drop it silently**. Do not mention it in the report. This is the ONLY input critique consumes from prior runs; anchoring on prior findings would defeat the point of independent assessment.

### Gather Assessments

Launch two independent assessments. **Neither may see the other's output.** This isolation is what makes the combined score honest. Running both in one head silently anchors them to each other; do not shortcut it for cost, speed, or context-size reasons.

Delegate each assessment to a separate sub-agent (Claude Code's `Agent` tool, Codex's subagent spawning, etc.). Each returns structured findings as text. Do NOT output findings to the user yet.

Fall back to sequential in-head work only if the environment genuinely cannot spawn sub-agents.

**Tab isolation**: When browser automation is available, each assessment MUST create its own new tab. Never reuse an existing tab, even if one is already open at the correct URL. This prevents the two assessments from interfering with each other's page state.

#### Assessment A: LLM Design Review

Read the relevant source files (HTML, CSS, JS/TS) and, if browser automation is available, visually inspect the live page. **Create a new tab** for this; do not reuse existing tabs. After navigation, label the tab by setting the document title:
```javascript
document.title = '[LLM] ' + document.title;
```
Think like a design director. Evaluate:

**AI Slop Detection (CRITICAL)**: Does this look like every other AI-generated interface? Review against ALL **DON'T** guidelines from the parent impeccable skill (already loaded in this context). Check for AI color palette, gradient text, dark glows, glassmorphism, hero metric layouts, identical card grids, generic fonts, and all other tells. **The test**: If someone said "AI made this," would you believe them immediately?

**Holistic Design Review**: visual hierarchy (eye flow, primary action clarity), information architecture (structure, grouping, cognitive load), emotional resonance (does it match brand and audience?), discoverability (are interactive elements obvious?), composition (balance, whitespace, rhythm), typography (hierarchy, readability, font choices), color (purposeful use, cohesion, accessibility), states & edge cases (empty, loading, error, success), microcopy (clarity, tone, helpfulness).

**Cognitive Load** (consult [cognitive-load](cognitive-load.md)):
- Run the 8-item cognitive load checklist. Report failure count: 0-1 = low (good), 2-3 = moderate, 4+ = critical.
- Count visible options at each decision point. If >4, flag it.
- Check for progressive disclosure: is complexity revealed only when needed?

**Emotional Journey**:
- What emotion does this interface evoke? Is that intentional?
- **Peak-end rule**: Is the most intense moment positive? Does the experience end well?
- **Emotional valleys**: Check for anxiety spikes at high-stakes moments (payment, delete, commit). Are there design interventions (progress indicators, reassurance copy, undo options)?

**Nielsen's Heuristics** (consult [heuristics-scoring](heuristics-scoring.md)):
Score each of the 10 heuristics 0-4. This scoring will be presented in the report.

Return structured findings covering: AI slop verdict, heuristic scores, cognitive load assessment, what's working (2-3 items), priority issues (3-5 with what/why/fix), minor observations, and provocative questions.

#### Assessment B: Automated Detection (Optional Enhancement)

Run the bundled deterministic detector when available. Assessment B strengthens the critique with objective evidence but is not required for a valid critique.

**CLI scan**:
```bash
node .kiro/skills/impeccable/scripts/detect.mjs --json [target]
```

- Pass HTML/markup files or directories as `[target]`. Do not pass CSS-only files.
- Exit code 0 = clean; 2 = findings.
- If the detector entrypoint is missing or fails to load, skip Assessment B and proceed with Assessment A only.
- Filter results against `detector-exclusions.md` (exclude rules that conflict with intentional DesignerPunk patterns).

**Browser visualization** (optional): When browser automation is available AND the target is a viewable page, the overlay provides a visual aid for the user highlighting issues directly in their browser.

Return: CLI findings (JSON) if detector was run, any false positives noted, and whether browser visualization was attempted.

### Generate Combined Critique Report

Synthesize both assessments into a single report. Do NOT simply concatenate. Weave the findings together, noting where the LLM review and detector agree, where the detector caught issues the LLM missed, and where detector findings are false positives.

Structure your feedback as a design director would:

#### Design Health Score
> *Consult [heuristics-scoring](heuristics-scoring.md)*

Present the Nielsen's 10 heuristics scores as a table:

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | ? | [specific finding or "n/a" if solid] |
| 2 | Match System / Real World | ? | |
| 3 | User Control and Freedom | ? | |
| 4 | Consistency and Standards | ? | |
| 5 | Error Prevention | ? | |
| 6 | Recognition Rather Than Recall | ? | |
| 7 | Flexibility and Efficiency | ? | |
| 8 | Aesthetic and Minimalist Design | ? | |
| 9 | Error Recovery | ? | |
| 10 | Help and Documentation | ? | |
| **Total** | | **??/40** | **[Rating band]** |

Be honest with scores. A 4 means genuinely excellent. Most real interfaces score 20-32.

#### Anti-Patterns Verdict

**Start here.** Does this look AI-generated?

**LLM assessment**: Your own evaluation of AI slop tells. Cover overall aesthetic feel, layout sameness, generic composition, missed opportunities for personality.

**Deterministic scan**: If the detector was run, summarize what it found with counts and file locations. Note any additional issues the detector caught that you missed, and flag any false positives. If the detector was not run, state "Detector not run for this critique" and rely on the LLM assessment alone.

**Visual overlays** (if browser visualization was used): Summarize what the overlay highlighted. If browser visualization was not attempted, omit this section.

#### Overall Impression
A brief gut reaction: what works, what doesn't, and the single biggest opportunity.

#### What's Working
Highlight 2-3 things done well. Be specific about why they work.

#### Priority Issues
The 3-5 most impactful design problems, ordered by importance.

For each issue, tag with **P0-P3 severity** (consult [heuristics-scoring](heuristics-scoring.md) for severity definitions):
- **[P?] What**: Name the problem clearly
- **Why it matters**: How this hurts users or undermines goals
- **Fix**: What to do about it (be concrete)
- **Suggested command**: Which command could address this (from: /impeccable adapt, /impeccable animate, /impeccable audit, /impeccable bolder, /impeccable clarify, /impeccable colorize, /impeccable critique, /impeccable delight, /impeccable distill, /impeccable document, /impeccable harden, /impeccable layout, /impeccable onboard, /impeccable optimize, /impeccable overdrive, /impeccable polish, /impeccable quieter, /impeccable shape, /impeccable typeset)

#### Persona Red Flags
> *Consult [personas](personas.md)*

Auto-select 2-3 personas most relevant to this interface type (use the selection table in the reference). If brand context is available via `get_brand_context()`, also generate 1-2 project-specific personas from the audience/brand info.

For each selected persona, walk through the primary user action and list specific red flags found:

**Alex (Power User)**: No keyboard shortcuts detected. Form requires 8 clicks for primary action. Forced modal onboarding. High abandonment risk.

**Jordan (First-Timer)**: Icon-only nav in sidebar. Technical jargon in error messages ("404 Not Found"). No visible help. Will abandon at step 2.

Be specific. Name the exact elements and interactions that fail each persona. Don't write generic persona descriptions; write what broke for them.

#### Minor Observations
Quick notes on smaller issues worth addressing.

#### Questions to Consider
Provocative questions that might unlock better solutions:
- "What if the primary action were more prominent?"
- "Does this need to feel this complex?"
- "What would a confident version of this look like?"

**Remember**:
- Be direct. Vague feedback wastes everyone's time.
- Be specific. "The submit button," not "some elements."
- Say what's wrong AND why it matters to users.
- Give concrete suggestions. Cut "consider exploring..." entirely.
- Prioritize ruthlessly. If everything is important, nothing is.
- Don't soften criticism. Developers need honest feedback to ship great design.

### Persist the Snapshot

Once the report above is finalized, write it to `.impeccable/critique/` so the user can refer back, and so `/impeccable polish` can pick up the priority issues without a copy-paste.

Skip this step if the Setup slug was null (vague or root-level target).

1. **Write the body to a temp file** so you can pipe it to the helper. Use the full report (heuristic table, anti-patterns verdict, priority issues, persona red flags) but stop before the "Ask the User" / "Recommended Actions" sections that come later.

2. **Pass the structured metadata** through `IMPECCABLE_CRITIQUE_META` (JSON), then run the write command:
   ```bash
   IMPECCABLE_CRITIQUE_META='{"target":"<user phrasing>","total_score":<n>,"p0_count":<n>,"p1_count":<n>}' \
     node .kiro/skills/impeccable/scripts/critique-storage.mjs write <slug> <body-file>
   ```
   The helper prints the absolute path it wrote.

3. **Read the trend** for context:
   ```bash
   node .kiro/skills/impeccable/scripts/critique-storage.mjs trend <slug> 5
   ```
   This returns a JSON array of the last 5 frontmatter entries (including the one you just wrote).

4. **Append a single line to the user-visible output**, after the report and before the questions:

   > **Trend for `<slug>` (last 5 runs): 24 → 28 → 32 → 29 → 32**
   > Wrote `.impeccable/critique/<filename>`.

   If this is the first run for the slug, the trend is just one score; say so: "First run for this target, no trend yet."

This is fire-and-forget. Do not show the user the helper's JSON output; only the human-readable trend line and the written path. Failures here should not block the rest of the flow; print the error and move on.

### Ask the User

**After presenting findings**, use targeted questions based on what was actually found. ask the user directly to clarify what you cannot infer. These answers will shape the action plan.

Ask questions along these lines (adapt to the specific findings; do NOT ask generic questions):

1. **Priority direction**: Based on the issues found, ask which category matters most to the user right now. For example: "I found problems with visual hierarchy, color usage, and information overload. Which area should we tackle first?" Offer the top 2-3 issue categories as options.

2. **Design intent**: If the critique found a tonal mismatch, ask whether it was intentional. For example: "The interface feels clinical and corporate. Is that the intended tone, or should it feel warmer/bolder/more playful?" Offer 2-3 tonal directions as options based on what would fix the issues found.

3. **Scope**: Ask how much the user wants to take on. For example: "I found N issues. Want to address everything, or focus on the top 3?" Offer scope options like "Top 3 only", "All issues", "Critical issues only".

4. **Constraints** (optional; only ask if relevant): If the findings touch many areas, ask if anything is off-limits. For example: "Should any sections stay as-is?" This prevents the plan from touching things the user considers done.

**Rules for questions**:
- Every question must reference specific findings from the report. Never ask generic "who is your audience?" questions.
- Keep it to 2-4 questions maximum. Respect the user's time.
- Offer concrete options, not open-ended prompts.
- If findings are straightforward (e.g., only 1-2 clear issues), skip questions and go directly to Recommended Actions.

### Recommended Actions

**After receiving the user's answers**, present a prioritized action summary reflecting the user's priorities and scope from Ask the User.

#### Action Summary

List recommended commands in priority order, based on the user's answers:

1. **`/command-name`**: Brief description of what to fix (specific context from critique findings)
2. **`/command-name`**: Brief description (specific context)
...

**Rules for recommendations**:
- Only recommend commands from: /impeccable adapt, /impeccable animate, /impeccable audit, /impeccable bolder, /impeccable clarify, /impeccable colorize, /impeccable critique, /impeccable delight, /impeccable distill, /impeccable document, /impeccable harden, /impeccable layout, /impeccable onboard, /impeccable optimize, /impeccable overdrive, /impeccable polish, /impeccable quieter, /impeccable shape, /impeccable typeset
- Order by the user's stated priorities first, then by impact
- Each item's description should carry enough context that the command knows what to focus on
- Map each Priority Issue to the appropriate command
- Skip commands that would address zero issues
- If the user chose a limited scope, only include items within that scope
- If the user marked areas as off-limits, exclude commands that would touch those areas
- End with `/impeccable polish` as the final step if any fixes were recommended

After presenting the summary, tell the user:

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `/impeccable critique` after fixes to see your score improve.
