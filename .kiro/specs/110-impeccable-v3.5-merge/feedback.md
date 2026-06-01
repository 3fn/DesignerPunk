# Spec Feedback: Impeccable v3.5.0 Merge

**Spec**: 110-impeccable-v3.5-merge
**Created**: 2026-06-01

---

## Design Outline Feedback

### Context for Reviewers
- The merge strategy (Preserve / Merge / Evaluate / Skip) is the core decision framework → design-outline.md § "Merge Strategy"
- Our MCP-based context loading replaces Impeccable's file-based approach — this is a settled architectural decision → design-outline.md § "Preserve (do not change)"
- DesignerPunk Design Laws override Impeccable's general rules where they conflict — this is settled → SKILL.md § "Conflict Resolution"
- The fresh v3.5.0 skill is available at `/tmp/impeccable-compare/.kiro/skills/impeccable/` for reference

### Reviewers
- **Leonardo** — primary consumer of the Impeccable skill; validates that merged content improves output quality
- **Thurgood** — governance; ensures merge doesn't break steering doc alignment

#### [LEONARDO R1]

**Merge Strategy Recategorizations:**
- Move `context-signals.mjs` routing logic from Evaluate → Merge (merge the reasoning heuristics, not the script; use MCP as data source) → design-outline.md § "Evaluate"
- Move blanket "updated command reference files" from Merge → split into Merge Immediately (craft, shape, polish, bolder) and Evaluate Individually (critique, colorize, typeset, animate) → design-outline.md § "Merge"

**Priority Ranking (top 5):**
1. Contrast verification rule (4.5:1 body, 3:1 large, placeholder needs 4.5:1) → design-outline.md § "Merge"
2. Anti-slop improvements (cream/beige ban + second-order reflex check) → design-outline.md § "Merge"
3. Copy rules (em-dash ban, buzzword ban, aphoristic-cadence ban) → design-outline.md § "Merge"
4. Typography improvements (heading ceiling ≤6rem, letter-spacing ≥-0.04em, text-wrap: balance) → design-outline.md § "Merge"
5. Updated absolute bans (numbered section markers, text overflow) → design-outline.md § "Merge"

**Conflict Concerns:**
- High: Font selection procedure in brand.md — must be scoped to brand register only, not product → design-outline.md § "Risks"
- Medium: craft.md Step 3 codex.md references — verify no dangling references → design-outline.md § "Evaluate"
- Medium: critique.md treats skipped detector as "failed" — must soften or adopt detector → design-outline.md § "Evaluate"
- Low: OKLCH in colorize.md — Conflict Resolution handles it, but note scope → design-outline.md § "Evaluate"

**Missing from Outline:**
- craft.md Step 0 (Project Foundation) — merge the principle → design-outline.md § "Merge"
- craft.md Step 4 production bar checklist — merge → design-outline.md § "Merge"
- Critique two-assessment orchestration model — valuable structure even without detector → design-outline.md § "Evaluate"
- typeset.md web font loading strategies — valuable for Sparky → design-outline.md § "Evaluate"
- Motion "premium materials" concept (blur, backdrop-filter, clip-path, mask, glow) → design-outline.md § "Merge"

**Open Questions:**
- Q1 (Detector): Yes, adopt. Self-contained, no PRODUCT.md dependency. Treat scripts/detector/ as upstream-owned subtree.
- Q2 (context-signals): No to script, yes to routing logic. Merge heuristics into SKILL.md routing rules, powered by MCP + git status.
- Q3 (Reflex-reject font list): Yes, scoped to brand register only in brand-dp.md. Include aesthetic lanes section.

---

## Requirements / Design / Tasks Feedback

### Context for Reviewers
- Design outline feedback (R1) was incorporated into formalization → feedback.md § "Design Outline Feedback"
- Sequential gates were waived for this round (all three docs reviewed together)

#### [LEONARDO R2]

**Verdict**: Approved with minor feedback

**Requirements gap:**
- Missing version tracking requirement — SKILL.md should annotate upstream version merged (v3.5.0) and merge date → requirements.md § "Requirement 8"
- Req 3.2 slightly ambiguous on detector invocation mechanism (design doc clarifies, requirement could be tighter)

**Design decisions:** All three approved. Counter-argument noted: additive merge creates harder future merges if upstream reorganizes significantly. Acceptable for now.

**Task sequencing:** Correct. Task 3 is riskiest (8 files, judgment-intensive). Needs confirmed access to upstream source files.

**Execution concerns (resolve before execution):**
1. Source material access — where do upstream v3.5.0 files live? (Answer: `/tmp/impeccable-compare/` needs to be re-cloned; `git clone --depth 1 https://github.com/pbakaus/impeccable.git` at tag `skill-v3.5.0`)
2. `codex.md` status — our reference directory already has one. Update, leave alone, or remove? (Needs Peter decision)
3. Task 3.3 completion will include rationale for each merge/skip decision (subjective judgment work)

**Testing strategy:** Sufficient with one addition — expand Task 5 to include cross-reference consistency check (grep for dangling references between updated files).

**Disposition**: Approved for implementation.

---
