# Task 4.3 Completion — WCAG Re-arm + Validation Promotion (Implementation)

**Spec**: 125-B-classification-map
**Task**: 4.3 — WCAG re-arm + validation promotion (implementation)
**Type**: Implementation · **Validation**: Tier 2 - Standard
**Agent**: Lina (Sonnet) — purely mechanical, consuming 4.2's outputs
**Date**: 2026-07-14
**Branch**: `task/125-B-u2`
**Requirements**: 12.1–12.7 · **Design**: C7, DD3

## Authority for the floor deviation from DD3-as-written

DD3 (design.md) records a per-literal presence floor over **four** exact names (`interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`). This task executes under **two amendments Peter settled in-session (2026-07-14)**, both recorded verbatim in the task briefing that authorized this subtask:

1. **THREE-literal floor, not four** — per-literal presence is asserted for `interaction_focusable` (7 live), `interaction_focus_ring` (10 live), `state_error` (4 live). **`state_disabled` is EXCLUDED from the per-literal floor**, "pending the Button-CTA disabled-state adjudication" — this is deliberately unresolved and routed separately (not "oversight," not "slated for removal"). The **matcher itself is unchanged**: it still selects `state_disabled` contracts, and Button-CTA's lone live `state_disabled` contract still must carry a valid WCAG ref (proven in Bite 2 below).
2. **The aggregate floor stays** per DD3's intent (non-empty selection; 69 selected at the Task 4.2 audit).

This directly resolves the PETER-ESCALATION Lina raised in 4.2's adjudication table (`completion/u2/stemma-pre-arm-adjudication.md` § 7) — option (a)/(c) hybrid: the razor's-edge coupling is defused by narrowing the *floor* (not the matcher) rather than accepting the coupling as-is.

## What was applied (all mechanical, from 4.2's prepared table)

### 1. The 7 prepared WCAG-ref fixes (`completion/u2/stemma-pre-arm-adjudication.md` § 5)

Applied exactly as tabled — anchor was `<contract name> ... wcag: null` (stable across any preceding-line drift):

| File | Contract | Change |
|---|---|---|
| `Badge-Count-Base/contracts.yaml` | `accessibility_non_interactive` | `wcag: null` → `wcag: "N/A"  # legitimate-null: non-interactive negative guarantee...` |
| `Badge-Label-Base/contracts.yaml` | `accessibility_non_interactive` | same pattern |
| `Nav-Header-App/contracts.yaml` | `accessibility_no_heading` | `wcag: null` → `wcag: "N/A"  # legitimate-null: renders-no-heading negative guarantee...` |
| `Nav-SegmentedChoice-Base/contracts.yaml` | `content_displays_label` | `wcag: null` → `wcag: "1.3.1 Info and Relationships"` |
| `Progress-Indicator-Connector-Base/contracts.yaml` | `accessibility_decorative` | `wcag: null` → `wcag: "1.1.1 Non-text Content"` |
| `Progress-Indicator-Label-Base/contracts.yaml` | `accessibility_decorative` | same |
| `Progress-Indicator-Node-Base/contracts.yaml` | `accessibility_decorative` | same |

3 exemptions (`"N/A"`) + 4 genuine-defect fixes (WCAG refs added) = the full 7-null adjudication from 4.2.

### 2. The re-arm — `src/__tests__/stemma-system/behavioral-contract-validation.test.ts`

- **Replaced** the legacy DORMANT six-name trigger (`:325–350`, hardcoded array + `.includes` match) **with** the normative matcher, copied **verbatim** from `completion/u2/wcag-required-matcher.ts` — `WCAG_REQUIRED_EXACT` set + `isWcagRequiredContract()`, with a header comment identifying it as the 4.2 audit matcher and warning that any edit re-opens the audit.
- **Floors wired**: aggregate floor (`totalSelected > 0`, audited at 69) + per-literal floor over the **three** amended literals only (`interaction_focusable`, `interaction_focus_ring`, `state_error`); `state_disabled` is tracked nowhere in the floor object, but the matcher's `WCAG_REQUIRED_EXACT` set (unchanged) still includes it, so `state_disabled` contracts are still selected and still assert `hasWcag === true` in the main loop — the amendment narrows the *floor assertions*, not the *selection*.
- Diff shape: `git diff --stat` shows the test file at `70 insertions(+), 17 deletions(-)` (the presence loop grew to track per-literal counts + the two floor assertion blocks; the promotion at `:435` is a comment block + 1-line assertion swap). Combined across all 8 changed files (test file + 7 `contracts.yaml`): `77 insertions(+), 24 deletions(-)`. Component `contracts.yaml` files are `+1/-1` each (single-line `wcag:` swaps).

### 3. Validation-criteria promotion (`:435`)

`expect(contractsWithValidation).toBeGreaterThan(0)` → `expect(contractsWithoutValidation).toBe(0)`. Inherited-contract skip (`:413` in the original file, now shifted by the earlier edit but logically unchanged) preserved unmodified.

## Bite fixtures (local throwaway verifications — 1.8 pattern: mutate → red → restore → green)

All four executed against the real files (not a separate fixture harness), each independently reverted and diff-verified clean before the next. None of these are committed as test changes beyond the re-arm itself.

| # | What it proves | Mutation | Result | Restored? |
|---|---|---|---|---|
| 1 | The `content_` non-label exclusion is load-bearing (the "bare-prefix trap") | Temporarily widened the copied-in matcher's label check from `startsWith('content_') && endsWith('_label')` to bare `startsWith('content_')` | **RED** — `expect(hasWcag).toBe(true)` failed on a legitimately-null non-label `content_` contract | Yes — `diff` against pre-bite state confirmed clean |
| 2 | `state_disabled` is still selected by the matcher and still required to carry a ref, even though excluded from the per-literal floor | Temporarily set Button-CTA's `state_disabled` contract to `wcag: null` | **RED** — same presence assertion failure, on the sole live `state_disabled` contract | Yes — `git diff` on `Button-CTA/contracts.yaml` empty post-restore |
| 3 | The per-literal floor assertions are actually wired (not inert) | Temporarily changed `state_error`'s floor to `toBeGreaterThan(9999)` | **RED** — `Received: 4` (independently confirms the live `state_error` count matches the audit table exactly) | Yes |
| 4 | The promoted `:435` assertion actually bites | Temporarily emptied Icon-Base's `visual_renders_svg.validation` array | **RED** — `Received: 1` against `Expected: 0` | Yes — `git diff` on `Icon-Base/contracts.yaml` empty post-restore |

Between bites and after the final restore, `git diff --stat` on the two bite-touched component files (`Button-CTA`, `Icon-Base`) showed no output (fully clean), and the test file's content matched the intended re-armed state (verified via a pre-bite backup diff).

## Suite result

- `npx jest src/__tests__/stemma-system/behavioral-contract-validation.test.ts`: **10/10 passing** (post-fix, pre-full-suite spot check). Console summary confirms: `Total contracts: 234`, `Without validation: 0`.
- `npm test`: **377 suites / 8987 tests, all green** — matches PR #39 / Task 4.4's baseline count, no regression.
- `npx tsc --noEmit --skipLibCheck`: clean, no errors.

No selected contract unexpectedly failed — audit-clean → arm-green held exactly as designed (Task 4.2's audit enumerated through the identical matcher + loader).

## Drafted register updates (for the steward to land — NOT written to `governance/classification-map.md`)

Per Task 4.4's established convention ("register writes stay with the steward"; my own write scope excludes `governance/**` except `component-meta-authoring-guide.md`). `wcag-format-validity` and `inverse-drift-incremental-build` are **already landed** (4.4) — not re-drafted here.

Both blocks below pass the register's uniqueness/non-substring check against all eight existing entries (`record-first-ratification`, `npm-test-before-complete`, `tool-boot-smoke`, `no-autonomous-token-creation`, `console-fail-root-lanes`, `console-fail-subpackage-deferred`, `wcag-format-validity`, `inverse-drift-incremental-build`) and against each other.

### (a) `wcag-required-refs` — the re-armed WCAG-presence check (explicitly requested)

```yaml
### wcag-required-refs

rule: "Behavioral contracts on the WCAG-required allowlist (exact `interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`; `accessibility_*`; `content_*_label`) SHALL carry a WCAG reference (or the 'N/A' legitimate-null sentinel) — re-armed at the canonical allowlist after a period as DORMANT (armed but aimed at six retired legacy contract names) (Req 12.1–12.5)"
boundary_call:
  class: functional
  rationale: "A machine-checkable presence check against a contract's own wcag field, scoped to a defined allowlist — not a style/workflow preference"
verification:
  disposition: barrier
  owner: lina
  check_state: armed
  checks: ["behavioral-contract-validation.test.ts 'accessibility-related contracts should have WCAG references' (root functional lane) — re-armed at the canonical allowlist matcher (Req 12.1-12.3). Match-count floor: aggregate selection > 0 (69 selected at Task 4.2's audit) PLUS per-literal presence for interaction_focusable (7 live), interaction_focus_ring (10 live), state_error (4 live). state_disabled is EXCLUDED from the per-literal floor pending the Button-CTA disabled-state adjudication (Peter, 2026-07-14 amendment) — the matcher itself is unchanged: state_disabled contracts (currently 1 live, Button-CTA) are still selected and still must carry a valid wcag ref, proven live via a gate-bite mutation (Task 4.3)"]
education:
  disposition: "nothing to prune — no prose predecessor taught the six-name trigger as a rule (it was implementation detail of a stale test, not documented education). The adjudication table (.kiro/specs/125-B-classification-map/completion/u2/stemma-pre-arm-adjudication.md) is the citable record of the 7 nulls resolved (4 genuine-defect fixes + 3 'N/A' legitimate-null exemptions) and the DD3 floor-input correction (design.md's recorded 11/11/21/4 were grep over-counts conflating live contracts: with excludes: blocks; true live counts are 7/10/1/4)."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.2 audit -> Task 4.3 arm): check re-armed, replacing the legacy 6-name trigger (behavioral-contract-validation.test.ts, formerly :325-350) with the normative allowlist matcher (C7) copied verbatim from .kiro/specs/125-B-classification-map/completion/u2/wcag-required-matcher.ts. State transition: DORMANT (armed-but-aimed-at-6-retired-legacy-names, discovered 125-B design-outline SS3.3) -> armed (re-pointed at canonical allowlist; audit-clean per 4 WCAG-ref fixes + 3 legitimate-null 'N/A' exemptions applied to contracts.yaml BEFORE arming). Per-literal floor uses THREE literals (interaction_focusable, interaction_focus_ring, state_error) per Peter's 2026-07-14 amendment -- NOT DD3's originally-recorded four; state_disabled excluded from the floor pending the Button-CTA disabled-state adjudication (20 components carry excludes: state_disabled under a documented no-disabled-states design philosophy; the corpus has exactly 1 live state_disabled contract, Button-CTA -- the DD3-as-written coupling risk this amendment defuses is recorded at .kiro/specs/125-B-classification-map/completion/u2/stemma-pre-arm-adjudication.md SS7). Aggregate floor: 69 selected at audit. Bite-tested live (4 mutate/red/restore/green cycles). Evidence: .kiro/specs/125-B-classification-map/completion/task-4-3-completion.md", by: lina }
```

### (b) history-line update to an existing row — checked, not applicable

Checked all eight existing entries against 4.2's table for anything requiring a new history line as part of this task's work: none of the eight existing rows (including `wcag-format-validity`, which governs the *format* check, a distinct rule from the *presence* check this task arms) describe the presence check's prior DORMANT state or reference the six-name trigger. No existing row is stale or inaccurate as a result of this task's changes. **(b) is N/A** — nothing to update.

### Flagged beyond the explicit (a)/(b) scope: `validation-criteria-completeness`

My task briefing's register-drafting instruction enumerated only (a) the WCAG re-arm row and (b) a conditional existing-row update. It did not ask for a row covering the **validation-criteria-completeness promotion** (`:435`, Req 12.6). However, Req 12.6 explicitly states "The register records the promotion history," and the schema is one-rule-per-entry — the WCAG-presence rule and the validation-criteria-completeness rule are two distinct `rule:` statements governing two distinct assertions in the same file, so folding the promotion's history into the `wcag-required-refs` entry above would misrepresent which rule the row describes. I'm flagging this rather than silently either skipping it or unilaterally expanding scope. Drafted below for the steward's/Peter's discretion on whether it lands now or is deferred:

```yaml
### validation-criteria-completeness

rule: "All non-inherited behavioral contracts SHALL carry validation criteria — promoted from counting-without-failing (asserting only contractsWithValidation > 0) to a hard zero-tolerance assertion (withoutValidation === 0) after an audit found the corpus already clean (Req 12.6)"
boundary_call:
  class: functional
  rationale: "A machine-checkable presence check against a contract's own validation field; the domain-owner position (Lina) is that zero-validation is a defect by definition, not a style preference (DD4)"
verification:
  disposition: barrier
  owner: lina
  check_state: armed
  checks: ["behavioral-contract-validation.test.ts 'all contracts should have validation criteria' (root functional lane), formerly :435 -- promoted from toBeGreaterThan(0) to expect(contractsWithoutValidation).toBe(0); inherited-contract skip preserved. Bite-tested live: emptying a non-inherited contract's validation array reds the check; restored to green."]
education:
  disposition: "nothing to prune -- no prose predecessor. DD4's no-exemption-mechanism rationale (a zero-validation contract is defective by definition; escalate, don't self-exempt) is the citable design rationale, not restated in steering prose."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.2 inventory -> Task 4.3 promotion): pre-promotion inventory (Task 4.2) found 234 non-inherited contracts, 0 without validation -- zero fixes, zero DD4 escalations needed (no trigger existed). Assertion promoted audit-first per Req 12.6 / Peter's 2026-07-13 approval. Evidence: .kiro/specs/125-B-classification-map/completion/task-4-3-completion.md", by: lina }
```

## Files changed

- `src/__tests__/stemma-system/behavioral-contract-validation.test.ts` — re-arm (matcher + floors) + `:435` promotion
- `src/components/core/Badge-Count-Base/contracts.yaml` — 1 line
- `src/components/core/Badge-Label-Base/contracts.yaml` — 1 line
- `src/components/core/Nav-Header-App/contracts.yaml` — 1 line
- `src/components/core/Nav-SegmentedChoice-Base/contracts.yaml` — 1 line
- `src/components/core/Progress-Indicator-Connector-Base/contracts.yaml` — 1 line
- `src/components/core/Progress-Indicator-Label-Base/contracts.yaml` — 1 line
- `src/components/core/Progress-Indicator-Node-Base/contracts.yaml` — 1 line
- `.kiro/specs/125-B-classification-map/tasks.md` — 4.3 checkbox marked `[x]`

## Files NOT changed

- `governance/classification-map.md` — two entries drafted above, not applied (steward-landing convention, same as 4.4)
- `wcag-required-matcher.ts` — consumed unmodified, per continuity contract

## Scope discipline

Did not modify `wcag-required-matcher.ts` (consumed verbatim, as required — any change would re-open the 4.2 audit). Did not touch `console-allowlist.json`, `console-fail-setup.ts`, or `jest.config.js` (4.4's surface). No commit made; branch left dirty on `task/125-B-u2` per instruction (no commit, no `governance/**` writes).

---

## Steward landing note (Thurgood)

Both drafted rows audited and landed to `governance/classification-map.md` **substantively unchanged** (schema shape, `rule`/`boundary_call`/`verification`/`education` bodies all preserved as Lina drafted them):

- **`wcag-required-refs`** — landed. Uniqueness/non-substring check re-run against all **eight** existing entries at land time (`record-first-ratification`, `npm-test-before-complete`, `tool-boot-smoke`, `no-autonomous-token-creation`, `console-fail-root-lanes`, `console-fail-subpackage-deferred`, `wcag-format-validity`, `inverse-drift-incremental-build`) plus the new sibling row — clean both directions (verified character-wise, not just eyeballed; confirmed in particular that `wcag-required-refs` and `wcag-format-validity` are not substrings of each other). **History split into two dated entries** per landing instruction, rather than Lina's single merged entry: (1) the DORMANT→armed re-arm transition (Task 4.2 audit → Task 4.3 arm, matcher swap, aggregate floor), (2) Peter's 2026-07-14 in-session amendment narrowing the per-literal floor to three literals and excluding `state_disabled` pending the Button-CTA disabled-state adjudication — recorded as its own dated fact since it's a distinct governance decision from the mechanical re-arm, with an explicit note that `design.md` (DD3) still records four and this entry is the citable deviation record. Both entries attributed `by: thurgood` (landing steward) with "drafted by Lina" stated in the change text, per the established landing convention used for the four prior Task-4.4-landed rows (`console-fail-root-lanes`, `console-fail-subpackage-deferred`, `wcag-format-validity`, `inverse-drift-incremental-build`).
- **`validation-criteria-completeness`** — accepted and landed. Lina's beyond-scope flag is correct: the schema is one-rule-per-entry, and this promotion (Req 12.6, `:435`) governs a distinct assertion from the WCAG-presence rule, so folding it into `wcag-required-refs` would have misrepresented which rule the row describes. Landed with a single history entry (by: thurgood, drafted-by-Lina cited), noting the flag-and-accept basis explicitly so the register shows why this row exists despite falling outside the (a)/(b) briefing scope.

**Register total after this landing: 10 entries** (8 pre-existing + these 2). No adjustments to Lina's `rule:`, `boundary_call:`, `verification:`, or `education:` bodies were needed — the audit found the drafted content ratified-and-amended-state-accurate as written.

Docs MCP reindex: ran `mcp__designerpunk-docs__rebuild_index` after landing — `status: healthy`, 83 documents / 2804 sections / 116 cross-references indexed, 0 errors/warnings.

Committed: no (per instruction — landing left uncommitted on `task/125-B-u2`, same as the register file itself). `tasks.md` untouched (4.3's checkbox already ticked by Lina).

— Thurgood, 2026-07-14
