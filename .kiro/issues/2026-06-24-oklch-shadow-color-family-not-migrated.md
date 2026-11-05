# Shadow Color Family Was Never Migrated to OKLCH

**Date**: 2026-06-24
**Discovered during**: Spec 117 Task 3 (R3 OKLCH-in-token-index spine fix) — the only color primitives that could not be emitted as OKLCH
**Reporters**: Ada (Rosetta implementation), verified in main loop (Claude)
**Severity**: Low — pre-existing, internally consistent (index matches dist); not a regression and not a divergence
**Type**: Token foundation / incomplete migration (Spec 112 follow-on)
**Primary owner**: Ada (Rosetta tokens) — **requires Peter's token-creation review**
**Status**: Open — deferred (out of scope for Spec 117, which is token-index *integrity*, not token-foundation migration)
**Owner**: Ada *(added 2026-10-20, Ada, site 9 of ballot 2026-10-20-manual-records-routed-readers)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's claims pass (CLOSEOUT), which reads whether Requirement 7.4 delivered this record's fix. *(Re-ruled 2026-11-05, Ada, owner, rules 1, 9 and 11, with a dated reason: Spec 129's requirements take this record in, carried by Requirement 7.4 (`requirements.md` § "Record dispositions" at `0a2534311` (#658, open; R2, Thurgood), row 8). Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" (E2) routes an intake record to the spec's claims pass until `tasks.md` numbers its carrying parent; I re-rule it to that parent's completion doc then. This re-rule merges before #658, so it is an ancestor of the commit that fires the old token, and the record does not lapse there (rule 11).)* *(was, verbatim: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in, combined, or left out with a reason. *(Re-ruled 2026-11-04, Ada, owner, rules 1, 9 and 11, with a dated reason: this record is the root of the shadow-colour P1, `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`, whose fix needs the shadow-colour primitives and channel tokens this record names, and that P1 is Spec 129's (consumer generation completeness: Spec 129's design-outline names it). Spec 131 would take this record in only as a P3 scope row, so the fork-D routing to 131 puts the root of a 129 P1 on the wrong spec. Authority: Peter, in chat, received before 2026-11-04T03:19:41Z (orchestrator `date -u`), answering the options message that followed the facts-generator consult (Thurgood, Lina, Leonardo, Stacy, two rounds, 2026-11-04): asked "Two records you sent to 131 under fork D belong to 129. The shadow-colour migration record (Ada's own miss, as she says). It's the root of one of 129's P1s. … Is it OK to undo those two routings?", he answered "Proceed as the team recommends". The routing reversed is the one the § "Routed" line below records, which stays as history. Spec 131's `requirements.md` does not exist yet, so the superseded token had not fired. Rule 11's naming comes with my Spec 129 inbound in the 129 outline round, a later unit; Thurgood adds the Spec 131 design-outline § 13 dated line there.)* *(was, verbatim: `path:.kiro/specs/131-governance-simplification/requirements.md` — the first commit that adds Spec 131's requirements, where this record is taken in, combined, or left out with a reason. *(Re-ruled 2026-11-01, Ada, owner, rules 1, 9 and 11, with a dated reason: Peter's fork D routes the manual-trigger P3 records to Spec 131 in place ("Route them. We'll evaluate them as part of that effort — perhaps they can better inform the spec, be combined or inform other proposals, etc."), and this record's Routed line reads: "Spec 131 § "2026-11-01 (scope intake, second batch, record only: it names records and settles no design)", the outline row added in the same PR as this line *(2026-11-01, Thurgood, steward, rule 9; under Peter's fork D, R11 line 16, "Route them", `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` and R10, batch routing)*. The Trigger is unchanged. Under fork B (R11 line 14, route in place) its owner re-rules it to `path:.kiro/specs/131-governance-simplification/requirements.md` after this batch merges. This record is not due at 16.2.0's S." Authority: `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`, `R10@ee5ea2b80e58c26a6dea7e6dfd538d006193f755`, and `R11@25bd478ddb4aca1c77da9eada750f601374fc62a` line 16 (Peter's fork D answer), all in `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md`. Rule 11's condition is met: Spec 131's `design-outline.md` § 13 second batch names this record (#617, `81077eeba88c1a1d73d167156b1bce5b92416914`).)* *(was, verbatim: `manual` — Peter's ranking of Spec 115 Phase B (whose first item is the shadow-primitive migration, walk row 18) or his token-creation review, which the `**Primary owner**:` line already requires at execution. *(Set 2026-10-20, Ada, rules 1 and 9.)*)*)*)*
**Class**: P3 improvement · defect *(set 2026-10-20, Ada, rule 12. An incomplete migration, not a divergence: the record's own analysis has the index and dist agreeing, and no consumer output is wrong. The reading that would re-class it: a consumer-visible OKLCH/rgba mismatch on a shadow token.)* *(Re-read 2026-11-05, Ada, rule 12: unchanged. Spec 129 now takes this record in as Requirement 7.4, which asks for the migration OR a design record of why not and how the native generators emit the `rgba` primitives, so the P1 sibling (`2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`) can close without it. Scheduling a record does not change what it describes, and the re-class reading above (a consumer-visible OKLCH/rgba mismatch on a shadow token) has not occurred. If the design round takes the migration branch, the tokens it creates go to Peter at design (Requirement 7.3).)*

---

## Summary

The OKLCH migration (Spec 112) converted the chromatic and neutral color families to the OKLCH channel model (`composedColorMap`: hue/lightness/chroma channels → composed `ComposedColor` with a resolved `Oklch`). The **shadow color family** (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`) was **never included** — it remains defined as raw rgba in `src/tokens/ColorTokens.ts:1835` (`shadowColorTokens`), with no OKLCH channel tokens and no entry in `composedColorMap`.

During Spec 117 Task 3, the token-index OKLCH spine fix correctly emits OKLCH for every color primitive that *has* an OKLCH source. The 4 shadow primitives have none, so the index emits them as rgba — **exactly as `dist/DesignTokens.web.css` does** (dist resolves shadow colors via `var(--shadow-black-100)` etc., which are rgba; there is zero `oklch()` on any shadow line in dist). Index and dist therefore **agree**; this is faithful reproduction, **not** a generation divergence.

## Why this is NOT a Spec 117 "intentional divergence"

It was explicitly considered and rejected as a manifest divergence entry. A divergence would mean the index disagrees with dist — but here they agree (both rgba for shadows). The gap is *upstream* of the generation path: the OKLCH foundation simply does not cover the shadow family yet. Recording it as an integrity exception would mislabel an incomplete migration as an accepted output difference.

## Evidence

- `src/tokens/ColorTokens.ts:1835` — `shadowColorTokens`: 4 primitives, all rgba (e.g. `shadowBlue100` = `rgba(20, 25, 40, 1)` across light/dark × base/wcag), commented "mode-agnostic (always dark)."
- No `shadowHue` / `shadowLightness` / `shadowChroma` channel tokens exist under `src/tokens/color/channels/`.
- `composedColorMap` (`src/tokens/color/index.ts`) = chromatic ∪ neutral only; shadows absent.
- `dist/DesignTokens.web.css` — no `oklch()` on any shadow line; shadow tokens resolve through rgba primitive refs.
- Result in `token-index/primitives.yaml` after Task 3: 16 residual `rgba(` = 4 shadow primitives × {light.base, light.wcag, dark.base, dark.wcag}; every other color primitive is clean OKLCH (rgba count 216 → 16).

## Why Out of Scope for 117

Spec 117 is **token-index integrity** — making the index reproduce dist. The index already reproduces dist for shadows (both rgba). Migrating shadows to OKLCH is **token-foundation work**, not integrity work, and the only *correct* version is cross-cutting:

1. Design shadow **channel tokens** (hue/lightness/chroma) — new token creation (Ada + **Peter's review**).
2. Add composed shadow colors to `composedColorMap`; convert the 4 rgba values to OKLCH.
3. Update **dist** emission across web / iOS / Android shadow generators (`src/build/platforms/{Web,IOS,Android}ShadowGenerator.ts`).

The tempting shortcut — convert the 4 rgba to `oklch()` in the **index only** — is actively wrong: it would make the index diverge from dist (rgba), the exact failure mode Spec 117 exists to prevent. There is no cheap correct version; doing it inside 117 would create tokens and change dist output inside a spec meant to reconcile them.

## Recommended Disposition (for routing)

Complete the OKLCH migration for the shadow family as a **Spec 112 follow-on** (or a dedicated small spec):
1. Decide the canonical OKLCH channel values for the 4 shadow colors (convert from the existing rgba; preserve the "warm light → cool shadows" art-theory intent documented at `ColorTokens.ts:1828`).
2. Introduce shadow channel tokens + composed shadow colors; add to `composedColorMap`.
3. Update the three platform shadow generators so dist emits OKLCH consistently.
4. Re-run Spec 117's `GenerationIntegrityCheck` to confirm index still matches dist (now both OKLCH) — at which point the residual-16 rgba goes to zero with no divergence introduced.

## Cross-References

- Spec 117 Task 3 mechanics: `.kiro/specs/117-token-index-generation-integrity/findings/task-3-mechanics.md`
- Spec 117 Task 3 completion: `.kiro/specs/117-token-index-generation-integrity/completion/task-3-completion.md`
- Originating migration: Spec 112 (OKLCH migration) — chromatic + neutral only
- R3 criterion scoping: Spec 117 R3 "no rgba" is scoped to OKLCH-migrated color primitives; shadows tracked here (not in the `IntentionalDivergenceManifest`).

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 9, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P3 improvement · defect`. Overlaps row 18: shadow-primitive migration is Spec 115 Phase B's first item. Needs Peter's token-creation review at execution.

**Walk 2026-10-20 (Thurgood, rule 9 walk line; Peter's rulings of that day)**: Peter ranked the color-track spec, folding this record in as intake, after Spec 130 (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3, rank 4). This record's `manual` Trigger is its owner's to re-rule; the priorities record owes that re-rule, to a `path:` token on the new spec directory, in the PR that creates it.

**Correction (2026-10-24, Ada, owner, rule 9)**: § "Summary" and § "Evidence" say dist "resolves shadow colors via `var(--shadow-black-100)` etc., which are rgba" and that "Index and dist therefore agree". Re-read at `e4e61eea2`: the variable is referenced 12 times and declared nowhere (`grep -n -- '--shadow-black-100\b' dist/DesignTokens.web.css | grep -v 'var('` → empty), and the Swift and Kotlin files reference `shadowBlack100` / `shadow_black_100` without defining them. The index advertises names the platform files do not emit, so index and dist do **not** agree. The defect is filed as `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` (P1). This record's Class and Trigger are unchanged: its migration work is still a P3, and its re-class condition ("a consumer-visible OKLCH/rgba mismatch") is not what was found. The OKLCH migration fixes the new record only if it also restores emission.

**Routed**: Spec 131 § "2026-11-01 (scope intake, second batch, record only: it names records and settles no design)", the outline row added in the same PR as this line *(2026-11-01, Thurgood, steward, rule 9; under Peter's fork D, R11 line 16, "Route them", `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` and R10, batch routing)*. The Trigger is unchanged. Under fork B (R11 line 14, route in place) its owner re-rules it to `path:.kiro/specs/131-governance-simplification/requirements.md` after this batch merges. This record is not due at 16.2.0's S.

**Re-routed (2026-11-04, Ada, owner, rule 9)**: the Routed line above sent this record to Spec 131 under fork D. It belongs to Spec 129, as the root of the shadow-colour P1 (`2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`); the Trigger line carries the dated reason and Peter's words. The Class is unchanged (P3); the migration still needs Peter's token-creation review at execution. The `Routed` line is history and is not edited.
