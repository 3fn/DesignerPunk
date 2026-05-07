# Design Document: Consumer Onboarding Completion

**Date**: 2026-05-07
**Spec**: 102 - Consumer Onboarding Completion
**Status**: Design Phase
**Dependencies**:
- Spec 101 (Package Publish Readiness) — Complete. Surfaced the gaps this spec addresses.

---

## Purpose of This Document

This is a **targeted** design document — not a full formal design per Process-Spec-Planning's template. It exists because Spec 101's execution surfaced several audibles that more formal pre-work might have prevented:

- **Factual-premise errors** (design outline stated "no package published" when 6 versions already existed in the registry)
- **Sequencing issues** (SummaryScanner chicken-and-egg that required mid-execution rework)
- **Governance-decision risk** (Task 1 Completion Documentation asymmetry caught mid-execution)

For Spec 102, three sections address the specific risk classes that apply here:

1. **Current State Verification** — catch factual-premise errors before they bake into the plan
2. **Workflow Integration Points** — surface sequencing issues before they bite during execution
3. **Vocabulary Governance Framework** — articulate the principle for ~22 vocabulary decisions so they're made consistently

Architecture, Components and Interfaces, Data Models, Error Handling, Testing Strategy are **out of scope** for this design doc — Spec 102's scope is bug fixes and metadata cleanup, not new system architecture.

---

## Section 1: Current State Verification

Before drafting tasks.md, the following assumptions from design-outline.md have been verified against actual system state. This section catches the class of factual-premise errors that Spec 101 hit with its "no package published" assumption.

### Verified: Validator error breakdown

Running `node scripts/validate-steering-metadata.js` on 2026-05-07 confirmed:

- **87 total steering docs**
- **38 valid, 49 with errors, 63 total errors**
- Breakdown matches expected distribution from the issue file, with **one factual correction**: the issue file stated 2 docs have non-ISO Date-field formats; actual count is 4 (AI-Collaboration-Principles, Component-Family-Badge, Component-Family-Chip, Contract-System-Reference).

**Complete error categorization**:

| Category | Error Count | Distinct decisions needed |
|----------|-------------|--------------------------|
| Missing `lastReviewed` | 10 | None — mechanical add |
| Missing `inclusion` | 4 | None — mechanical add (pattern surfaced during verification) |
| Invalid Date-field format | 4 | None — mechanical normalization |
| Invalid lastReviewed format | 2 | None — mechanical normalization |
| `"token-documentation"` as organization | 16 | 1 — expand vocabulary (domain-legitimate) |
| Domain-specific scope values | 9 (7 distinct) | 7 — per-value triage |
| Task type values | 18 (14 distinct; 8 follow `*-implementation` pattern) | ~7 (if `*-implementation` decided as family = 1 decision) |
| **Total** | **63** | **~15 distinct decisions** |

**What this changes**: Design-outline.md § "Scope" item 9 estimated "~35 case-by-case decisions" with "~1-2 hours triage." Actual is ~15 distinct decisions, with one decision clearing 16 errors and another potentially clearing 8 in a single pattern call. **Revised estimate: ~30-45 minutes of triage plus mechanical fixes.** Spec 102's execution sizing is notably lighter than previously thought.

### Verified: Source-file locations for Gaps 1-5

Line numbers in the design outline come from `.kiro/issues/2026-05-07-consumer-onboarding-gaps.md` (authored by Ada during Spec 101 Task 2.3 verification). Location evidence is Ada's direct observation during a successful end-to-end consumer walkthrough. Accepting as verified without independent re-check — if any line numbers drifted due to intervening edits, it surfaces as a benign implementation-time correction during execution (similar to Spec 101 Task 1.4's scope expansion when additional files surfaced).

### Verified: Package registry state

`@3fn/core` on GitHub Packages currently has two published versions: `10.2.0` (historical baseline) and `11.0.0` (Spec 101's reconciled release). This matches the tag history in git. No factual-premise error for Spec 102 comparable to Spec 101's "no package published" issue — Spec 102 is publishing `11.1.0` on top of a clean known baseline.

### Verified: Workflow tool behavior expectations

Known from Spec 101 execution:
- `SummaryScanner` finds only committed summary docs (`git log --diff-filter=A` on `docs/specs/*/task-*-summary.md` since last tag). Spec 102's Parent 1 completion must commit `task-1-summary.md` before `release:notes` runs to include Parent 1's work in 11.1.0's notes.
- `NotesRenderer` uses `new Date().toISOString()` which returns UTC, not local. If `release:notes` runs after ~20:00 PDT, the emitted Date field will be next-day. Manual correction in the generated file remains required until the release-tool-regressions follow-up spec is executed.
- `npm deprecate` against GitHub Packages versions returns `400 Bad Request`. Not expected to affect Spec 102 (no prior version cleanup needed) but flagged.

### Verified: Outstanding assumptions with no pre-task risk

These aren't verified programmatically but are low-risk:
- Kiro MCP client tolerates stderr output (protocol only requires stdout purity) — if Gap 1's stderr routing fix is insufficient, Post-Publish Verification in Parent 2 will catch it and escalate per Risk 2.
- `src/cli/__tests__/` exists with prior test files (verified by Ada in R1). Integration test lives there.

### Summary: No factual-premise corrections needed to the plan beyond the already-captured metadata breakdown refinement.

---

## Section 2: Workflow Integration Points

This section surfaces tool interactions that affect execution sequencing. The goal: make the chicken-and-egg class of issue visible before it bites during execution, as happened in Spec 101 Task 2.1.

### init.ts execution flow (post-Spec-102)

With Gaps 3 and 5 applied, `npx designerpunk init` runs these steps in order:

1. Create `.npmrc` (if not exists)
2. Create `designerpunk.config.ts` (if not exists)
3. `copyDir` → `src/tokens/` (**merge mode per Gap 3**)
4. `copyDir` → `src/components/core/` (**merge mode per Gap 3**)
5. `copyDir` → `.kiro/agents/` (**merge mode per Gap 3**)
6. `copyDir` → `.kiro/steering/` (**merge mode per Gap 3**)
7. Create `product/overview.yaml` (if not exists)
8. **NEW (Gap 5)**: Create or merge `.kiro/settings/mcp.json`
9. Emit summary of what was copied/skipped per step

Merge behavior is uniform across steps 3-6 (copyDir) and step 8 (mcp.json). Consistency prevents consumer surprise ("why does steering merge but mcp.json overwrite?").

### Publish workflow (end-to-end, Spec 102 Parent 2)

The Spec-101-lesson sequencing is baked into Parent 2 subtasks:

```
Parent 1 subtasks complete
  ↓
Parent 1 parent completion written (task-1-completion.md)
  ↓
Parent 1 summary doc written (docs/specs/102/task-1-summary.md) ← MUST happen BEFORE next step
  ↓
Summary doc COMMITTED to main ← otherwise SummaryScanner can't find it
  ↓
Release notes regenerated (npm run release:notes)
  ↓
Manual cleanup: rename release-X.Y.Z.md → RELEASE-NOTES-X.Y.Z.md; delete .internal.md + .json
  ↓
Manual cleanup: correct Date field if UTC bug emitted next-day date
  ↓
Peter reviews + authorizes publish
  ↓
npm publish --access public (Ada, with pre-publish hygiene from Spec 101 Task 2.2 pattern)
  ↓
Tag v11.1.0 and push
  ↓
Post-publish verification (fresh repo install, walkthrough, drift check, all 5 gap verifications)
  ↓
Parent 2 completion + summary docs
```

**Critical sequencing**: Step 3 (summary doc creation + commit) must complete before step 5 (release:notes). This is an explicit subtask in tasks.md, not an implicit assumption.

### Validator-vocabulary update flow

When expanding vocabulary in `scripts/validate-steering-metadata.js`:

1. Identify the distinct vocabulary value surfacing in multiple docs
2. Decide: expand validator OR correct docs (per Section 3 framework)
3. If expand: add value to the relevant `VALID_*_VALUES` array in `scripts/validate-steering-metadata.js` with inline comment (per Ada R2 refinement)
4. Re-run validator; confirm those specific errors cleared
5. Move to next distinct value

Important: validator changes ship in the package (`scripts/` is referenced from `package.json`'s CLI and can be invoked by consumers). Expanded vocabulary becomes part of the public contract. Once expanded, a value can't be narrowed without a breaking change. This means vocabulary expansion should be deliberate — but in practice, the expansion we're doing in Spec 102 is just catching up to existing doc patterns, not introducing new ones.

### Cross-workflow dependency: mcp.json scaffold vs. Integration Guide Step 4 update

- **Gap 5** (Ada): `init.ts` scaffolds `.kiro/settings/mcp.json` with direct-node invocation pattern
- **Gap 4** (Thurgood): Integration Guide Step 4 documents the same pattern

These two artifacts must **match**. If Ada's scaffold uses one path convention and Thurgood's guide documents a different one, consumers see inconsistency.

**Mitigation**: both artifacts use the `DP-PortfolioSite/.kiro/settings/mcp.json` Peter authored during Spec 101 Task 2.3 as the canonical reference. Both tasks cite the same source of truth.

---

## Section 3: Vocabulary Governance Framework

This section articulates the principle for the ~15 vocabulary decisions in metadata cleanup so triage is consistent and reviewable. Without a framework, each decision is ad hoc and the result is likely uneven.

### The core decision

For each distinct non-standard metadata value the validator flags, choose:

- **Expand validator vocabulary**: the value represents a legitimate domain-specific pattern that the validator should accommodate. The value stays in the docs; the validator's recognized list grows.
- **Correct the doc(s)**: the value is an outlier or misuse that should be replaced with a standard-vocabulary value. The validator stays; the docs change.

### Expand-validator criteria (all must apply)

A value is a candidate for vocabulary expansion when:

1. **Domain-legitimate**: the value represents a real category that the domain genuinely uses and communicates more specifically than any existing vocabulary entry. *Example: `token-documentation` on Token-Family-*.md docs is the accurate organization category; forcing it into `process-standard` loses specificity.*
2. **Pattern over outlier**: multiple docs use the same value consistently OR a class of values shares a naming pattern (like `*-implementation`). Single-use values with no pattern are outliers, not legitimate domain categories.
3. **Stable**: the value isn't something likely to change in a future refactor. Vocabulary we expand today should still be accurate a year from now.

If all three apply → expand.

### Correct-doc criteria (any apply)

A value is a candidate for correction when:

1. **Outlier**: only one doc uses it and no naming pattern connects it to broader usage.
2. **Typo or obvious error**: the value is a misspelling or accidental replacement of a standard value.
3. **Mismatch with doc purpose**: the value doesn't actually describe what the doc is about. *Example: `testing` as a task type on a non-test doc.*
4. **Too-specific**: the value is so granular it communicates less than a more general standard value would. *Example: `chip-implementation` could arguably be `component-implementation` which is more general and covers button, badge, chip, icon, etc. in one value.*

If any apply → correct.

### Priority when multiple criteria conflict

If a value could plausibly be either expand or correct, the tiebreaker is: **does the value provide domain-useful specificity that the standard vocabulary currently lacks?** If yes → expand. If no → correct.

### Rationale capture (per Ada R2)

When expand-vocabulary is chosen, the validator script gets an inline comment at the point of addition:

```javascript
const VALID_ORGANIZATION_VALUES = [
  'process-standard',
  'rosetta-system',
  'stemma-system',
  'civitas-system',
  'token-documentation',  // Spec 102: added for Token-Family-*.md docs (16 docs, domain-legitimate)
];
```

Without inline rationale, a future maintainer sees "why is `token-documentation` valid?" and has to archaeology git history to find out. The comment preserves context at near-zero cost.

### Applying the framework: current-state decisions

Pre-triaged using the framework (Thurgood's reading; Ada can dispute any during R3):

| Value | Affected | Decision | Reasoning |
|-------|----------|----------|-----------|
| `token-documentation` (organization) | 16 docs | **Expand** | Domain-legitimate, consistent pattern, stable — 16 Token-Family-*.md docs all use it correctly |
| `*-implementation` task types (8 values) | 8 docs | **Triage as a family** — consider collapsing to one value `component-implementation`, which would be correct-doc for all 8 | If collapsed, clears 8 errors in one pattern decision |
| Scope values like `motion-token-system`, `shadow-glow-token-system` | 7 distinct × 9 errors | **Per-value per Section 3** — likely a mix of expand (where domain-legitimate) and correct (where over-specific) | Needs actual review of each value's doc context |
| `testing`, `token-creation`, `styling`, `integrations`, `accessibility-compliance`, `architecture-planning` (remaining task types) | 6 distinct × 10 errors | **Per-value per Section 3** | Some probably legitimate, some outliers |

**Revised estimate with the framework applied**: ~3-5 pattern-level decisions (not 15 individual decisions). The `*-implementation` family alone collapses 8 into 1. Triage should be **~20-30 minutes**, not 1-2 hours.

### Escape hatch: Risk 7's defer

When a value's expand-vs-correct call is genuinely ambiguous after the framework is applied:

1. Document the value, doc(s) affected, why the framework didn't resolve it cleanly
2. Defer to a follow-up Civitas conversation
3. Continue with the other decisions
4. Track the deferred item in completion doc

The framework should resolve most decisions in minutes. If a specific value takes >15 min to resolve, that's the signal the framework isn't covering the case and defer is appropriate.

---

## Notes for Tasks Drafting

Three implementation-level details to lift into tasks.md, not handled in this design:

1. **Inline rationale convention** (per Ada R2): each expanded vocabulary value gets a `// Spec 102: <rationale>` inline comment in the validator script. Subtask step, not design-level.

2. **Per-subtask commit discipline** (per Spec 101 lesson): commit each completed subtask individually per the Spec 101 pattern. Consistent audit trail.

3. **Verification completeness**: after all metadata fixes land, re-run `validate-steering-metadata.js` and capture the output in the Parent 1 completion doc. If not 0/87 (remaining items were deferred per Risk 7), list each deferral per Success Criterion 9's amended phrasing.

---

## Open questions for [@ADA] R3 review

1. **Section 3 pre-triaged decisions** — do you agree with the `token-documentation` expand decision and the proposed `*-implementation` family consolidation? Any of these that you'd call differently under the framework?
2. **Section 2 mcp.json/Integration-Guide alignment risk** — is citing `DP-PortfolioSite/.kiro/settings/mcp.json` as shared source of truth enough to prevent divergence between Gaps 4 and 5 outputs, or should tasks.md include an explicit cross-check?
3. **Section 1's revised sizing** (~30-45 min triage vs. original 1-2 hours) — does this match your execution intuition, or am I underestimating?
4. **Vocabulary expansion as public contract** — Section 2 notes that expanded vocabulary ships in the package and becomes hard to narrow later. Does that change your view on any of the tentative expand decisions?
5. **Any other Spec 101 execution audibles** that you think Section 1 or Section 2 should add to the verification or integration surface?
