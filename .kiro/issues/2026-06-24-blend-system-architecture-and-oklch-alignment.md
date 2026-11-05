# Blend System Architecture — OKLCH Color-Space Alignment + Platform Delivery + Drift Guard

**Date**: 2026-06-24
**Discovered during**: Spec 117 close-out — investigating the dormant `BlendUtilities.*` generator (N1) for the steering-doc ballot (Task 6.1 / P3)
**Reporters**: Claude (investigation), Peter (scoping — "answer this holistically, especially within the context of OKLCH")
**Severity**: Medium — interaction states render correctly, but are computed in the wrong color space relative to the OKLCH foundation (perceptual-consistency gap, not a runtime break)
**Type**: Color foundation / blend architecture — OKLCH migration completeness
**Primary owner**: Ada (Rosetta color foundation) — with Lina (component consumers) and Leonardo (cross-platform) consulted
**Status**: Open — **SOON (triaged 2026-06-25, Task-8 milestone)**: scheduled as its own Ada-led spec (Lina/Leonardo consulted) — important-not-urgent (foundational OKLCH-consistency gap; not a runtime break). Captured for a holistic review, explicitly out of scope for Spec 117. See `docs/roadmap/m0a-deferred-items.md` § "Issues surfaced during the 117/118 spec cluster".
**Owner**: Ada *(added 2026-10-20, Ada, site 9 of ballot 2026-10-20-manual-records-routed-readers)*
**Class**: P2 obligation (record) · charter *(set 2026-10-20, Ada, rule 12. Spec 112 ticked the OKLCH migration while the blend subsystem still computes interaction states in RGB/HSL, so the record of that migration is wrong; interaction states render correctly and no consumer is blocked, so not P1, and it is the standing charter for the color-track spec, so kind charter. Only `blend.disabledDesaturate` and the two wrappers are deprecated and retained; the blend system and the OKLCH alignment are live charter work.)*
**Trigger**: `path:.kiro/specs/133-color-track/requirements.md` — the first commit that adds Spec 133 (color-track)'s requirements, where this record is taken in, combined, or left out with a reason. *(Re-ruled 2026-11-05, Ada, owner, rules 1, 9 and 11, with a dated reason: the color-track spec now has a directory, so its formalization is a git-visible event and `manual` no longer has a reason (the old line's own reason was "that spec has no directory or name yet"). Authority: Peter, received 2026-11-05T13:05:54Z (`date -u` at receipt; orchestrator relay), verbatim: "yes, 4 (a), 7 (a)", whose "yes" answers "Colour-track: yes to (iv)?", the proposal `[ADA P-2]` (give the color-track spec a folder now with a placeholder outline, move its waiting records to a git-visible Trigger on its future `requirements.md`, fix the rgba record's split routing, record 129's leftovers in the outline; placement in his order unchanged). The folder is `.kiro/specs/133-color-track/`, created by Thurgood in #669, whose outline § 2 names this record and § 3 names this token. The token does not need the folder to exist on `main` to be valid: it fires on the first commit that adds the spec's requirements.)* *(was, verbatim: `manual` — the color-track spec's formalization opens (the spec that folds this record with 115-B colortokens deletion and color-token enforcement, intake rgba-cleanup and shadow-OKLCH; ranked after Spec 130, priorities record rank 4). *(Set 2026-10-20, Ada, rule 9. `manual` rather than a `path:` token because that spec has no directory or name yet, so a glob would be a guess that never fires or fires on the wrong spec; the event is computable the day the directory exists, and the owner re-rules the token to `path:` in that PR. Was: no Trigger line; header Status "SOON (triaged 2026-06-25)", scheduled as its own Ada-led spec.)*)*
**Ruling (Peter, 2026-10-20, relayed)**: "agreed" — folded into ONE color-track spec with 115-B colortokens deletion and color-token enforcement (intake: rgba-cleanup, shadow-OKLCH), ranked after Spec 130.

---

## Why this is one issue, not three

Three questions about the blend subsystem are entangled and should be decided together, not piecemeal. Deciding any one in isolation (e.g. "just delete the dead generator") forecloses options for the others.

### 1. The OKLCH color-space gap (the primary finding)

The token system migrated to OKLCH (Spec 112) for perceptually-uniform color. **The blend system did not follow.**

- `src/blend/OklchBlendCalculator.ts` — "perceptually uniform color blending," interpolates in OKLCH (L linear, C linear, H shortest-arc) with defined interaction-state thresholds (Hover ΔL 0.02–0.05 preserve chroma; Pressed ΔL 0.05–0.10; Focused ΔC ≥0.02; Disabled ΔC ≥0.03). **It is orphaned — no non-test production code imports it.**
- The in-use path (`ThemeAwareBlendUtilities.{web,ios,android}` → `ColorSpaceUtils`/`BlendCalculator`) computes blends in **hex → RGB → HSL**. The public `./blend` export exposes the RGB/HSL calculators, not the OKLCH one.
- **Consequence:** every hover/pressed/focus/disabled state color in the component library is blended in RGB/HSL on top of an OKLCH color foundation — not perceptually uniform, and not consistent with how the design system's colors are defined.

This is the **same shape as Spec 117's findings** (an OKLCH-correct path orphaned while a legacy path runs — cf. `getOklchMetadata` / rgba-in-token-index). It is an **incomplete OKLCH migration of the blend subsystem.**

### 2. Platform delivery: generate vs hand-author (Layer 2)

How each platform gets its blend utilities is unresolved:

- **Dormant generator** (`BlendUtilityGenerator` + `BlendValueGenerator`, never wired into the pipeline): would generate per-platform utility files from one TS source → cross-platform-consistent **by construction** (anti-drift). But it only emits low-level *stateless* functions (`darkerBlend(color, value)`), not the theme-aware layer components consume — which is likely why it was bypassed.
- **In-use** (`ThemeAwareBlendUtilities.{web.ts, ios.swift, android.kt}`): ~1,007 lines **hand-authored across three platform files**, theme-aware and ergonomic, but **drift-prone** — git shows independent per-platform maintenance (e.g. an iOS-only "fix iOS pressed state" commit with no matching web/android change). NOTE: drift *risk* is demonstrated (independent maintenance); an actual algorithmic divergence has not been diff-confirmed.

The cross-platform-consistency test (`BlendCrossPlatformConsistency.test.ts`) guards the shared **calculator math**, NOT the three hand-authored platform wrappers — so the drift surface is currently unguarded.

### 3. The dormant generator's code disposition (absorbs Spec 117 N1)

Spec 117 finding N1 (`.kiro/issues/2026-06-13-blendutilities-not-generated.md`) asked: delete the dormant `BlendUtilityGenerator`/`generateBlendUtilities` write path, or activate it? **That decision moves here** — it cannot be made sensibly before #1 and #2 are decided. If blend moves to OKLCH delivery (#1), Layer 2 (#2) is rebuilt anyway and the disposition is moot. (Spec 117 handles only the *doc-accuracy* half of N1 — ballot item P3 corrects the steering doc that wrongly lists `dist/BlendUtilities.*` as outputs. The *code* disposition is deferred here.)

## Why out of scope for Spec 117

Spec 117 is token-**index** generation integrity, and it is certified. Blend **tokens** (`blend100`–`blend500`, `blendHoverDarker`, etc.) flow through the normal pipeline and ARE correctly in the token-index + dist — unaffected. This issue is about the blend **utilities / calculation layer** (a different subsystem), and the OKLCH-blend question is a deliberate design decision with cross-platform cost — not a generation-integrity defect. N1 was explicitly deferred from 117's inventory.

## Recommended approach

A dedicated investigation (likely a small spec), Ada-led, deciding in order:
1. **Should interaction-state blends be computed in OKLCH** (wire `OklchBlendCalculator`, retire/relegate the RGB/HSL path) for perceptual consistency with the OKLCH foundation? Weigh the cross-platform cost (iOS/Android need OKLCH blend at runtime).
2. **Given that answer, how is Layer 2 delivered** — generated-from-source (anti-drift) or hand-authored-with-a-real-cross-platform-consistency-guard?
3. **Then** the generator code disposition (delete vs rebuild) falls out.

## Audit provenance addendum (2026-09-13 — folded from the Spec 112 completion-claims audit, Peter-directed)

The 2026-09-12 verification-grade audit of Spec 112's completion claims (`.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md`, findings F3 and the task-5.1 entry) supplies the **provenance** for this issue's primary finding, and one new fact. The audit ruled no new work item is needed — this issue owns the work; the record below is what the future Ada-led spec should know about how the gap arose.

**1. The gap is a ticked-but-unshipped Spec 112 claim, not an oversight discovered late.** Spec 112 task 4.2 and parent 4 promised `BlendCalculator.ts` and all three `ThemeAwareBlendUtilities.*` "(reworked)" for OKLCH. None was touched: `BlendCalculator.ts` last changed **2025-10-28** (pre-Spec-112 entirely); the three platform utilities contain zero OKLCH today. `OklchBlendCalculator.ts` was built and tested, then never connected — the same built-not-wired signature as the audit's index case (the DTCG generator, remediated by #150). `task-4-2-completion.md` disclosed a deferral to "the full pipeline integration pass," but that pass only covered `TokenFileGenerator` color emission and never reached blend; parent 4's criteria table then omitted the unmet rows rather than marking them failed (the audit's F7 pattern). Both tasks are ticked.

**2. New fact for decision #2's "drift surface unguarded" story (audit finding on task 5.1)**: the Spec 112 visual-audit suite (63 tests, real and passing) **audits the orphaned `OklchBlendCalculator`, not the live RGB/HSL path components actually use**. So the interaction-state coverage that exists validates an engine production never calls — the drift surface is not merely unguarded by the cross-platform consistency test (§2 above); the guard that appears to exist points at the wrong engine. The future spec's decision #1 should treat that suite as a ready-made contract for the OKLCH path if it is wired, and as dead weight if the RGB/HSL path is instead ratified.

**3. Interaction-state thresholds are designed and ratified-in-code, awaiting delivery**: the orphaned calculator carries defined thresholds (Hover ΔL 0.02–0.05 preserve-chroma; Pressed ΔL 0.05–0.10; Focused ΔC ≥ 0.02; Disabled ΔC ≥ 0.03) with test coverage — decision #1 is not a green-field design question; it is a wire-or-formally-retire question with the design work already banked.

*(Status unchanged: Open — SOON, Ada-led spec, Lina/Leonardo consulted. The audit provenance raises no new urgency — interaction states still render correctly — but the completion-claim history should be cited in the spec's design outline so the rework is scoped against what was actually promised in Spec 112 R6/R11.)*

## Cross-References

- Spec 117 N1 (doc half handled by P3; code disposition moved here): `.kiro/issues/2026-06-13-blendutilities-not-generated.md`
- Pattern siblings (orphaned OKLCH path / silent legacy path): Spec 117 (`getOklchMetadata`, rgba-in-index), Spec 118 (config loader)
- **Spec 112 completion-claims audit (provenance for the primary finding; F3 + task-5.1 entry)**: `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md`
- Shadow OKLCH gap (related incomplete-OKLCH-migration finding): `.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md`
- Related deferred work with a shadow-primitive dependency (Spec 115 Phase B charter): `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md`
- Public blend API consumed by components: `@3fn/core/blend` → `src/blend/index.ts` (the runtime utilities — note this export points at raw `.ts`, tracked to Spec 118 Increment 3b)

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 6, call PETER)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` (Peter ranks the spec) · `P2 obligation (record) · defect` (a ticked-but-unshipped Spec 112 claim; interaction states render). Peter's question: rank the blend/OKLCH spec, fold it into Spec 129, or drop it in light of the 16.0.0 blend deprecation?

**2026-11-05 (Ada, owner, rule 9; Spec 129 requirements round)**: two notes, Trigger unchanged.
- **Shadow-OKLCH has left this record's intake.** The shadow-colour migration (`2026-06-24-oklch-shadow-color-family-not-migrated.md`) was re-routed to Spec 129 on 2026-11-04 (that record's Trigger line carries the authority), and 129's requirements now carry it as Requirement 7.4 (`requirements.md` at `0a2534311`, #658). The colour-track spec's intake above therefore holds rgba-cleanup, 115-B and colour-token enforcement, not shadow-OKLCH.
- **No harness entries are tagged here.** 129's harness compiles the hand-written `src/blend/ThemeAwareBlendUtilities.android.kt`, and its errors (`darkerBlend`, `lighterBlend`, `saturate` and `desaturate` called on `Color` and defined in no packed file; Data, 129 requirements round) come from this record's dormant `BlendUtilities.*` generator. Requirement 3.6 rejects a tag on a `manual` record, and this record's event (the colour-track spec's formalization) has no directory to name yet, so a `path:` token would be a guess. Those entries are tagged to Lina's component-repair record (Requirement 1.5), which should name this record as their cause. When the colour-track spec's directory exists, I re-rule this Trigger to it, and the entries can be retagged here under Requirement 3.7.

**2026-11-05, later (Ada, owner, rule 9): correction to my note above.** Peter answered P-2 with "(1)" (received 2026-11-05T05:54:32Z). In Spec 129, the four shadow colours are re-expressed in OKLCH with the same values and no new token names (Requirement 7.4). **Building them from channel tokens, like the other colour families, is not done in 129.** That channel half returns to the color-track spec's intake, so my note's "shadow-OKLCH has left this record's intake" is true of the values only. The color-track spec's intake is therefore: rgba-cleanup, 115-B, colour-token enforcement and the shadow channel half (`.kiro/specs/133-color-track/design-outline.md` § 2, #669). The note's second bullet also changes: this record's Trigger is no longer `manual` (re-ruled above), so the `ThemeAwareBlendUtilities.android.kt` harness entries can be retagged here under 129's Requirement 3.7 once this commit is on `main`. Retagging is the harness author's act in a 129 PR.
