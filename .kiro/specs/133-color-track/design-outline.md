# Design Outline: 133 — Color-Track (placeholder)

**Date**: 2026-11-05
**Spec**: 133-color-track
**Author**: Thurgood (spec formalization), briefed by the orchestrator
**Status**: **PLACEHOLDER.** No round has run. This file holds no requirements, no design and no scope decision. Nothing here is built, scaffolded or created, and no token exists because of it. It exists so that the work Peter ruled in on 2026-10-20 has a directory, a row at each release's S, and a path that records can name as a Trigger.
**Owners (by domain)**: Ada (tokens: the `ColorTokens.ts` deletion, blend, OKLCH, rgba, shadow channels); Lina (the enforcement surfaces; co-owner with Ada of the enforcement record); Thurgood (formalization).
**Naming**: Peter's rulings call this "the color-track spec" and the records say "color-track". The repository's colour specs use "color" (`015-color-palette-update`, `112-oklch-color-migration`), so the directory is `133-color-track`. 132 is reserved for the native adopter spec, which has no directory yet (priorities record, walk line 2026-11-05).
**Pointer-shaped on purpose**: facts that go stale (importer counts, blast radius, what 129 has shipped) are not copied here. They come from `spec-facts.sh` at the round's opening (§ 5).

---

## 1. Why this file exists now

- **Peter, 2026-10-20** (chat, relayed; `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3.4 and `.kiro/issues/archive/TRIAGE-2026-10-20.md` § "Rulings (2026-10-20)"): the blend/OKLCH alignment, the 115-B `ColorTokens.ts` deletion and color-token enforcement are one spec, ranked after Spec 130, with the rgba-pipeline cleanup and the shadow-colour migration folded in as intake.
- **Peter, 2026-11-05T05:54:32Z**, verbatim: "Re: P-2, (1); but we need to address the surviving issue about the larger migration". The issue he read: the larger migration waits for a spec that has no folder yet, so three of its records carry a `manual` Trigger that only memory reads.
- **Peter, 2026-11-05T13:05:54Z**, verbatim: "yes, 4 (a), 7 (a)". The "yes" answers "Colour-track: yes to (iv)?": give the spec a folder now with a short placeholder outline; move its waiting records to a git-visible Trigger on its future `requirements.md`; fix the rgba record's split routing; record here what 129 leaves behind for it. (Ada's option (iv), `[ADA P-2]`, 2026-11-05.)
- **What the folder does**: under ballot `2026-11-04-waiting-spec-row` § 2, a directory with a `design-outline.md`, no `requirements.md` and no `closed` outcome line is listed at each release's S, and Peter answers it open, park (with a git-visible re-ask event) or closed. This directory is that kind of directory from its first commit. **No outcome line is written now.** Peter answers at the next S.

## 2. What waits on this spec (by path and class)

Classes are as each record's own header carries them at `2622faf3e`. Owners re-rule their own Triggers (§ 3).

| Record | Owner | Class | Trigger at `2622faf3e` | What waits |
|---|---|---|---|---|
| `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md` | Ada | P2 obligation (record) · charter | `manual` | Blend interaction states computed in RGB/HSL, not OKLCH; the dormant `BlendUtilities.*` generator (the cause of `ThemeAwareBlendUtilities.android.kt`'s harness errors, held on Lina's repair record under 129's Req 3.6) |
| `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md` | Ada | P2 obligation (record) · charter | `manual` | Deleting `src/tokens/ColorTokens.ts`; the four shadow primitives' move to the OKLCH source |
| `.kiro/issues/2026-09-14-color-token-enforcement-spec-candidate.md` | Lina, Ada | P2 obligation (record) · charter | `manual` | The color-token enforcement campaign |
| `.kiro/issues/2026-06-10-post-v12-rgba-pipeline-cleanup.md` | Ada | P3 improvement · defect | `path:.kiro/specs/131-governance-simplification/requirements.md` (fork D routing, 2026-11-01) | The frozen legacy RGBA pipeline. **Split routing**: the priorities record lists it as this spec's intake (§ 3.4); its Trigger sits on 131. Ada fixes it (§ 3) |
| `.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md` | Ada | P3 improvement · defect | `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` | After P-2 (1), only the **channel half** waits here: building the four shadow colours from channel tokens, like the other families. The OKLCH half is 129's Req 7.4. Whether the channel half moves its Trigger is Ada's call on her record |

**Tied to this spec, not intake:**
- `.kiro/issues/2026-10-24-autonomy-dial-re-deferral-trigger.md` (Thurgood; P2 obligation (record) · owed-act; `manual`). Its event includes "the closeout of the next arming campaign (the color-token enforcement spec, if chartered)". It fires off this spec's closeout, so its wording is Thurgood's to align to this spec's claims pass once the spec has requirements. Not done here.
- `.kiro/issues/2026-09-12-semantic-contrast-adjudication-queue.md` (Ada; `manual` on Peter's redesign). Colour work, but its own deferred spec by Peter's 2026-10-18 ruling. It is **not** intake.

## 3. The Trigger token the owners use

Each owner of a record in § 2's table re-rules its Trigger in a record-only PR of their own, with a dated reason (README rules 1, 9 and 11):

`path:.kiro/specs/133-color-track/requirements.md`

It fires on the first commit that adds this spec's requirements, which is the event that owes the intake decision. No owner's Trigger is edited by the PR that creates this file.

## 4. What 129 leaves behind for this spec (Ada's reading; UNVERIFIED)

Source: `[ADA P-2]` § 1 ("New since Peter ranked this spec"), read by Ada at `2622faf3e` by `git grep`. **It is REASONING until 129's Requirement 9.2 lands, and this outline is corrected then** (the correction is carried as a note for 129's tasks round: `.kiro/specs/129-consumer-generation-completeness/feedback/requirements.md`, entry `[THURGOOD R3]`).

- The legacy `src/tokens/ColorTokens.ts` had six non-test importers outside the token tier: `DTCGFormatGenerator.ts`, the Web, iOS and Android format generators, `SemanticValueResolver.ts`, and the `src/tokens/index.ts` barrel. Ada's reading: 129's Req 9.2 (her D-11) removes the first five.
- P-2 (1) writes the four shadow colours in OKLCH under 129's Req 7.4, which was 115-B's charter item 1.
- 129's native colour path (D-2) replaces the native `rgba` conversion.
- **Expected to remain for this spec**: the barrel and its copies in consumers' trees; the DTCG structural source, if 9.2 does not settle it; the `SemanticValueResolver` legacy fallback branch; the blend generator; the shadow channels.
- The 115-B deletion and the rgba cleanup should therefore be much smaller than the 2026-08-27 blast radius of nine importers. That is the measure Peter will see when he places the spec.

## 5. Order, and what is not decided here

- **Place**: after Spec 130, as the priorities record carries it (§ 3.4; the 2026-11-05 walk line's order is 129 → 132's first family → Peter's re-placement against 131 → 131 → 128 → 130, and "the color-track spec stays after 130"). Creating this directory moves nothing. **Re-placement is Peter's call at the next S**, and he may want it earlier if 129's groundwork makes it smaller.
- **Not decided here**: scope, requirements, design, any token (shadow channels and anything blend needs are reviewed by Peter at this spec's design round, before any is created), whether the shadow hues share the brand hue channels, and the contrast queue's place.
- **At the round's opening**: run `bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh 133 <since-sha> <read-sha>`, read Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" (its grep is Step 0), and re-read § 4 against what 129 shipped.
