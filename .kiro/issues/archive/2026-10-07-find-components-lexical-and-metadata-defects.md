# `find_components` keyword path — lexical defects and copy-pasted sibling metadata (DEFECT RECORD, routed)

**Date**: 2026-10-07
**Type**: DEFECT RECORD with routed owner — surfaced during the design consults for the discovery shadow study (`2026-10-07-discovery-shadow-study-charter.md`), not by any production incident
**Owner**: **Lina** (Stemma; `application-mcp-server/**` is inside her charter write scope — confirmed by Lina 2026-10-07, so the fixes need no grant). **Thurgood consulted** on the rank tie-breaker (it amends the Spec 121 components rubric decision record; precedent: docs `TITLE_RANK_TIEBREAK`, Peter-approved as rank-only, Spec 119-A) and on item 5.
**Trigger**: **Peter's ruling on fork F1 of the study charter** (all three consulted owners recommend authorizing the fixes now) → Lina opens the fixing PR(s). **No fix is authorized until that ruling.**
**TRIGGER FIRED 2026-10-12**: Peter ruled F1 AUTHORIZED, de-dup (item 4) folded in. Fix scope = items 1, 2, 3, 4, 6; item 5 is decided or explicitly deferred inside the fixing PR after Thurgood's read. Branch `fix/find-components-stage0-lexical-metadata`.
**Grant paths**: none needed (owner scope covers the surface).
**Contamination rule (binding on the fixer, from the study charter)**: fixes are driven ONLY by the defects recorded here and by the existing calibration tests in `application-mcp-server/src/__tests__/tool-boundary.contract.test.ts`. Neither the study's Q3 component fixture nor the sealed seat-written queries may be seen by whoever makes the fixes before the fixes merge.

---

## 1. Verified reproductions (orchestrator, live Application MCP, 2026-10-07)

| Query | Rank 1 (tier) | Why | Should have been |
|---|---|---|---|
| `a toast for errors` | Avatar-Base (strong) | the token `a` matched a high-signal field | nothing exists → no `strong` |
| `toggle` / `switch to turn a setting on or off` | Chip-Filter (strong) | stopwords `to/a/on/or/off` matched high-signal fields | nothing exists → no `strong` |
| `tabs` | Badge-Count-Base (strong) via `navigation-tabs` context | `tabs` ≠ `tab`; no plural folding | Nav-TabBar-Base (outside top 2) |
| `email field with validation` | Input-Checkbox-Base (strong) | `with` matched high-signal; `validation` is a contract-category token (high-signal) | Input-Text-Email (not in top 3) |
| `loading spinner while data fetches` | Avatar-Base (**partial**) above Button-CTA (**strong**, rank 2) | sort is coverage then alphabetical; tier is ignored | Progress-Bar-Base indeterminate (absent) → ideally no `strong` |
| `progress through onboarding steps` | Progress-Indicator-Connector-Base (strong) | the seven Progress-* share identical `whenToUse` → tie → alphabet | Progress-Stepper-Base / -Detailed |
| `bottom navigation between sections` | Nav-TabBar-Base (strong) ✓, Avatar-Base **strong at rank 2** on `between` | stopword | rank 2 is confident-wrong |

Source of record for the first three: Lina R1; for the rest: Leonardo R1 (study consult pass 3). Orchestrator re-ran rows 4 and 5 verbatim.

## 2. The defects

1. **No stopword filter** in the components tokenizer (`application-mcp-server/src/indexer/ComponentIndexer.ts`, tokenizer ~L128–141). The docs matcher has one (`mcp-server/src/query/stop-words.ts`). Because a single high-signal token hit is already `strong` (rubric clause 1), a stopword landing in `purpose` manufactures `strong`.
2. **No plural folding** (`tabs` ≠ `tab`).
3. **Rank ignores tier**: results sort by coverage, then name (`application-mcp-server/src/query/QueryEngine.ts`, sort block after `deriveMatchConfidence`). A `partial` can outrank a `strong`; alphabetical order breaks every tie. Fix candidate: tier-aware, then name-hit, then coverage — Thurgood's consult owed since it amends the rubric's decision record.
4. **Copy-pasted sibling metadata (content, not tokenizer)** — verified by grep 2026-10-07: the whenToUse block beginning "Triggering user actions (submit, save, cancel)" is pasted verbatim into all four `Button-*/component-meta.yaml`; the six-entry FormInput `alternatives` list beginning "When email address collection" is pasted into seven `Input-*/component-meta.yaml` (Checkbox-Base, Checkbox-Legal, Radio-Base, Radio-Set, Text-Base, Text-Password, Text-PhoneNumber). Leonardo reports the same across the seven Progress-* siblings. Identical text ⇒ identical coverage ⇒ alphabetical winner. No matcher of any kind (lexical, embedding, discriminative) survives this; the study charter makes de-duplication a precondition of its components round (fork F1b: fold into this issue or split).
5. **Contract-category names are high-signal tokens** (`validation`, `interaction`, …): a query containing "validation" hits every validatable component at `strong`. Open rubric question for Lina + Thurgood — not a tokenizer fix; may be intentional.

6. **"Internal-only" is not declared consistently (content; surfaced by Lina's F9 read, 2026-10-07)**: Nav-Header-Base states it in `purpose` text (`component-meta.yaml` line 1); Progress-Indicator-Node-Base states it nowhere — inferable only from other components listing it under `composition.internal` and a description hint ("a11y handled by semantic variants"). Neither `type` nor composition rules are discovery inputs. A consumer query can therefore land a `strong` on a component a product must never use directly (Leonardo: "progress through onboarding steps" → Indicator-Connector-Base). Fix shape: a declared component-meta field, checked deterministically; discovery can then gate on it as Layer-2 viability (the docs side already does this with placeholder/deprecated).

## 3. Not in scope here
The components `aliases` set is never populated (no indexer plumbing) and aliases are low-signal by deliberate rubric (Req 1.9). Lina's ruling 2026-10-07: intentional, keep; becomes a defect only if the study's outcome O2 fires for components.

## 4. What the walk checks
Has F1 been ruled? Ruled-yes with no fixing PR after one walk → finding. Fixing PR merged → record the SHA here, re-run the seven reproductions, record results, `git mv` to `archive/`.

---

## Fix record (2026-10-12, Lina — branch `fix/find-components-stage0-lexical-metadata`)

**Inputs used (contamination rule)**: only the seven reproductions in § 1 and the existing calibration tests in `tool-boundary.contract.test.ts`. No new query sets; no Q3 fixture authored or read (`scripts/__fixtures__/` was not opened). The R1 "expected failures" list was not used as a driver — see "Pre-exposure" below.

### What changed, per item

1. **Stop words** — new `application-mcp-server/src/indexer/termNormalization.ts`. The docs list (`mcp-server/src/query/stop-words.ts` v1) is copied verbatim (no cross-package import: tsc rootDir boundary), plus a closed-class components extension (non-spatial prepositions, conjunctions, pronouns/auxiliaries — e.g. `between`, `off`, `while`, `through`). Spatial prepositions (above/below/over/under/inside/…) are deliberately NOT stop words. Why a components extension: a single high-signal hit is `strong` here (rubric clause 1), so a function word in `purpose` does more damage than on the docs side. Versioned (`COMPONENT_STOP_WORD_LIST_VERSION = 1`); a drift-guard test fails if the docs list gains a word the copy lacks. Applied symmetrically (every indexed field and the query). A keyword made only of stop words now returns the `none` empty contract — before this change that path would have dropped the keyword filter and returned the whole catalog.
2. **Plural folding** — a conservative suffix rule with an exceptions list, not a stemmer: `-ies`→`-y`, `-(ch|sh|x|ss)es`→drop `es`, otherwise drop a trailing `s`; words of ≤3 letters, words ending `ss`/`is`, and an exceptions list (`status`, `focus`, `radius`, `canvas`, `news`, `series`, …) are left alone. Why not a stemmer: it would conflate `navigation`/`navigate`, `selection`/`select`, `validation`/`validate` — distinctions that matter in this vocabulary. `matchedOn.term` carries the folded term.
3. **Tier-aware rank** (Thurgood's ruling) — `rankCompare` in `QueryEngine.ts`: tier, then coverage, then own-name hit (the component's OWN name tokens, not family), then name (fixed display order). `deriveMatchConfidence` untouched. Rubric amended (see below).
4. **Metadata de-dup** — see "Families checked". Rewrote `when_to_use` for Button-CTA, Button-Icon, Button-VerticalList-Item, Button-VerticalList-Set and the six Progress-* that shared one block; rewrote `alternatives` for the eight Input-* that shared the FormInput list (the record named seven; Input-Text-Email carried six of the same entries too). Each list now names only the genuinely adjacent alternatives, with reasons from that component's side. The three Progress-Indicator-* also got a `when_not_to_use` pointing at the semantic components (they had the family-level block pasted). `purpose` and `contexts` were NOT touched (they derive from the family docs). Verified the edits survive the extractor: `npm run extract:meta` regenerated all 34 files with zero diff against the working tree (content-aware preservation, fixed 2026-09-14).
5. **Contract-category tokens** (Thurgood's ruling (b), corrected) — category tokens are low-signal: both the contract's `category` field and the category prefix of the concept key (`validation_` in `validation_form_integration`). The concept suffix stays high-signal. Rubric amended. **Tiers change at merge** for queries whose only high-signal evidence was a category word (`validation`, `interaction`, `accessibility`, …): they now land at `partial`.
6. **Declared internal-only** — field `internal_only: true`, placed in the component's **`.schema.yaml`, not `component-meta.yaml`** (a deliberate departure from the brief). Reason: `extract:meta`'s `generateYaml` writes only purpose/usage/contexts/alternatives, so a new component-meta field would be silently dropped on the next extraction (the 2026-09-13 defect class), and the extractor is outside my write scope. `schema.yaml` is not generated, and it already holds `readiness`, the other Layer-2 signal. Populated on Nav-Header-Base, Progress-Indicator-Node-Base, Progress-Indicator-Connector-Base, Progress-Indicator-Label-Base. Audit: every component referenced under some `composition.internal` was checked; Icon-Base, Container-Base, Button-Icon and Input-Radio-Base are composed internally but also used directly, so they are not internal-only. Surfaced on every `find_components` row (structured and keyword) as `viability: { internalOnly }`, the same shape as find_docs' `viability`; also on `get_component_full` as `internalOnly`. The tool never filters on it. The tool-boundary key-set guard was re-baselined with a log entry.

### Rubric amendments (`.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md`, in Lina's write scope `.kiro/specs/**`)
- Components rubric: the high/low field lists updated with amendment markers; a normalization bullet added (stop words + plural folding); a dated **item-5 amendment block** (category tokens → low-signal).
- Layer 3: the multi-owner-ties bullet now says the alphabetical final step is a fixed display order, not a judgment; a dated **item-3 amendment block** after the 119-A block (order, rank-only, reproductions, calibration green, guard test).

### Before / after — the seven reproductions (rank 1 + tier; local build of `application-mcp-server/dist` against `src/components/core`)

| # | Query | Before: rank 1 (tier), #strong | After: rank 1 (tier), #strong | Verdict |
|---|---|---|---|---|
| 1 | `a toast for errors` | Avatar-Base (strong) via `a`; 33/33 strong | Button-VerticalList-Item (strong) via `error`; 10 strong | **Still fails.** Stop words fixed, but folding `errors`→`error` now hits the `state_error` concept suffix (high-signal under ruling (b)). No toast exists; a confident-wrong `strong` remains. |
| 2a | `toggle` | Chip-Filter (strong) via `toggle` | Chip-Filter (strong) — unchanged | **Not a lexical defect.** `toggle` is literally in Chip-Filter's purpose. No stop word is involved; this is rubric clause 1 (one high-signal hit = `strong`). |
| 2b | `switch to turn a setting on or off` | Chip-Filter (strong) via `to/a/on/or/off`; 33 strong | Nav-SegmentedChoice-Base (strong, `switch`+`setting`); 2 strong; rank 2 Input-Checkbox-Base (strong, `setting`) | **Partly fixed.** No stop-word evidence. Still confident on a content word (`switch`). |
| 3 | `tabs` | Badge-Count-Base (**partial** in this run; the record said strong), Nav-TabBar-Base strong at rank 3 | Nav-TabBar-Base (strong) rank 1 | **Fixed.** |
| 4 | `email field with validation` | Input-Checkbox-Base (strong); 22 strong | Input-Text-Email (strong); 3 strong | **Fixed.** |
| 5 | `loading spinner while data fetches` | Avatar-Base (partial) above Button-CTA (strong); Progress-Bar-Base absent | Button-CTA (strong) rank 1, Progress-Bar-Base (strong) rank 2; 2 strong | **Partly fixed.** Tier order is fixed and Progress-Bar-Base now appears. It sits at rank 2 only on the alphabetical step (tied on tier, coverage and name hit). `strong` still exists via `loading`. |
| 6 | `progress through onboarding steps` | Progress-Indicator-Connector-Base (strong) | Progress-Bar-Base (strong); ranks 2–4 = the three Indicator-* (now flagged `internalOnly`); Stepper-Base rank 6, Stepper-Detailed rank 7 | **Not fixed for the intended target.** De-dup removed the identical text, but all seven Progress-* still match all three terms (family token `progress`, `step` in purposes, the shared `onboarding-flows` context), so they tie at full coverage and fall to the alphabet. Once a caller gates on `internalOnly`, the order is Bar, Pagination, Stepper-Base, Stepper-Detailed. |
| 7 | `bottom navigation between sections` | Nav-TabBar-Base (strong) ✓; rank 2 Avatar-Base (strong) via `between` | Nav-TabBar-Base (strong) ✓; rank 2 Container-Base (strong, `section` in purpose); rank 3 Nav-Header-Base (flagged internal) | **Stop-word half fixed.** Rank 2 is still `strong` on a content word. |

**Residual, recorded but not fixed (forks for Peter/Thurgood)**: rows 1, 2a, 2b, 5 and 7 all keep a confident-wrong or doubtful `strong` because of rubric clause 1: a single high-signal hit is `strong` whatever the coverage (`toast` and `spinner` match nothing, yet the row is `strong` at 50% or 33%). Changing that is a **tier-rule** change: a ballot-level rubric decision, and the study's own question. It is not a Stage-0 knob. Row 6 would also need a decision outside Stage 0. One candidate is a within-tier "count of high-signal terms" rank step (match-strength). It would lift Connector, Node, Pagination and the Steppers above Bar and Label, but it would not separate the Steppers from the internal Indicator-*. Not implemented, because it is not ruled.

### Item 5 disposition
**Decided and applied** per Thurgood's ruling (b) corrected (above). Not deferred.

### Families checked for duplication
- **Button**: one 4-entry `when_to_use` block across all four. **Fixed.**
- **FormInput**: one shared `alternatives` list across eight Input-*. **Fixed.**
- **Progress**: one `when_to_use` block across **six** of seven. Progress-Bar-Base was already distinct, so Leonardo's "seven" is six. **Fixed.**
- **Nav-Header-***: no duplication. Not edited.
- **Chip-***: no duplicated self-description. Chip-Filter and Chip-Input share one identical alternatives entry (`Chip-Base` / "When general interactive chip"). That is two siblings pointing at the same alternative for the same reason, not pasted self-description, so it was left. The same pattern exists in Badge-* and in Button-CTA/Button-Icon → Button-VerticalList-Item; also left.
- Whole-corpus scan: no other `when_to_use` line or `alternatives` entry is repeated across components.

### Pre-exposure (R1 expected-failure queries the de-dup incidentally touched, so Q3 can flag them)
- **modal/dialog**: removed "Opening modals or dialogs" from all four Button-* `when_to_use`.
- **page dots/carousel indicator**: `carousel` was removed from five Progress-* (it stays on Pagination-Base). `dots` was added to Pagination-Base and `dot` to Node-Base.
- **wizard steps**: `step` tokens were redistributed across the Progress-* `when_to_use` entries.
- **terms consent**: "terms of service acceptance" was removed from six Input-* alternatives; `consent` was added to Input-Checkbox-Base's alternative reason.
- **select**: `selection` tokens moved (Button-VerticalList-Set, Input-Checkbox-Legal).
- Not touched: app bar/navbar/toolbar, bottom nav, tag.

### Out of scope, found (recorded, not fixed)
1. **Progress-Stepper-Base `purpose` is wrong**: it says "labeled nodes showing step names", but its schema says "Node-Base + Connector-Base (no labels)". `purpose` derives from `Component-Family-Progress.md` (governance, ballot). Related: Progress-Stepper-Detailed's alternative reason for Stepper-Base ("step labels are sufficient without descriptions or connector lines") and Pagination-Base's ("steps need labels") repeat the same error. These are per-component entries, not duplicates, so they were left.
2. **Nav-Header-Base's schema description says "composition rules flag direct use as warning"**, but no such check exists in `application-mcp-server`. Follow-up: `validate_assembly` could warn on `internal_only` components placed directly.
3. **The `find_components` tool description does not mention `viability`.** The description is mirrored in `canonical/registry/tool-registry.json` (122-generated, diff-guarded), so changing it needs a registry regeneration outside Lina's write scope. Follow-up.
4. **`internal_only` is not documented in the schema-format steering doc** (`component-schema-format`). A ballot proposal is owed.

### Tests run
- `cd application-mcp-server && npm run build`: clean.
- `cd application-mcp-server && npx jest`: **31 suites / 432 tests passed**. New: `src/indexer/__tests__/termNormalization.test.ts`, `src/query/__tests__/Stage0LexicalFixes.test.ts` (items 1, 2, 3 incl. the rank-order guard, 5, 6), and the real-corpus internal-only audit in `src/query/__tests__/QueryEngine.test.ts`. Re-baselined: `tool-boundary.contract.test.ts` (`viability` key). Spec 121 calibration tests: all green.
- `npm test` (root): **390 suites / 9377 tests passed**.
- `npm run extract:meta`: zero diff against the hand-edited metas (edits survive the extractor).

## 5. Closed — 2026-10-12

**Fixing PR merged**: #303, squash `dcd337dcf` on `main` (tree-identical for every Stage 0 file to the verified branch head `e79159b33`; the only differences on `main` are eight unrelated issue records from #300). **Outcome**: items 1, 2, 3, 5, 6 executed; item 4 (de-dup) executed for Button ×4, FormInput ×8, Progress 6/7 (Bar-Base already distinct). Reproductions: rows 3 and 4 fixed; rows 2b, 5, 7 partly; row 6 not fixed for the intended target; row 1 still fails — residual class across rows 1, 2, 5, 7 is rubric clause 1 (one high-signal hit = `strong` at any coverage), a tier-rule change that is a ballot or the shadow study's call, recorded as an input to the study's volume gate (`2026-10-07-discovery-shadow-study-charter.md`). Out-of-scope findings (§ Fix record) remain recorded there, not fixed. Validation at merge (orchestrator-run): application-mcp-server 31 suites / 432 tests; root 390 suites / 9377 tests; `extract:meta` no diff. Archived per `.kiro/issues/README.md` rule 5.

