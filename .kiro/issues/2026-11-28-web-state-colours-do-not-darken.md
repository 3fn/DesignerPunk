# Twelve production-ready web components have shown no hover or pressed darkening since v12.0.0, and Chip-Filter's selected-and-pressed state is wrong on every platform

**Date**: 2026-11-28
**Owner**: Lina (the components and their contracts; Ada consulted for the `src/blend` helper, Sparky for web verification)
**Filed by**: Lina, under rule 10, for Peter's ruling recorded in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` § "[PETER] web P0" (#880).
**Trigger**: `release:16.4.0:phase-1` — 16.4.0's S owes this record's state. If 133 U1 has merged by then, U1's PR closes it here under rule 5 with the outcome line. If it has not, the 16.4.0 walk reads Peter's waiver (below), and 16.4.0's release notes carry the known-issue line.
**Class**: P0 false-claim · defect *(set 2026-11-28, Lina, owner, rule 12. The served text claims what the web components do not do: Chip-Base's schema says "consistent state styling (default, hover, pressed)" (`src/components/core/Chip-Base/Chip-Base.schema.yaml` L51), all twelve are served web `production-ready`, and their contracts state hover and pressed ΔL ranges. On web, hover and pressed return the rest colour. Peter confirmed the P0 and waived it until 133 U1, below. Only Peter downgrades a P0.)*
**Source**: `consults-2026-11-27/answers-132/lina-web-blend-investigation.md` (`[LINA R7]`, the reproduction); `ada-blend-measure.md` (`[ADA R6]`, the first finding); `lina-blend-measure.md` (`[LINA R6]`, Chip-Filter's selected-and-pressed state). These are spliced into the feedback doc above.

---

## Peter's ruling (the waiver), verbatim

- **What he was asked**: options (a), (b) and (c), with the orchestrator's recommendation: "(a). It's honest at release time, with no back-and-forth in what we serve." Option (a) reads: accept it as a known defect until U1, recording his waiver and keeping the served text unchanged; if 16.4.0 ships before U1, its release notes carry one known-issue line, and U1's notes close it.
- **Received**: 2026-11-28T04:54:20Z (orchestrator's `date -u`). **Verbatim**: "Agreed."
- **What is ruled**: (a). The P0 is confirmed and waived until 133 U1, with the served text unchanged.

## What is wrong (VERIFIED at `8f05f76b8`; reproduced in jsdom with the repo's own helper and a real `chip-base`)

- **Where the value comes from**: since Spec 112 (`71120a5d9`, v12.0.0, 2026-06-10), the web generator writes colours as `oklch(l c h)` (`src/providers/WebFormatGenerator.ts` L602–604), and some as `light-dark(oklch(…), oklch(…))`. Before that commit they were `rgba(…)`, which the parser read.
- **Where it fails**: each component reads the token's text with `getPropertyValue` (Chip-Base: `ChipBase.web.ts` L183) and passes it to the blend helper. `darkerBlend` calls `hexToRgb` (`src/blend/ThemeAwareBlendUtilities.web.ts` L150–152), which accepts only hex or `rgb(a)` and throws on anything else (`src/blend/ColorSpaceUtils.ts` L141–151). `darkerBlend` catches the error and returns the input unchanged (L153–157). Nothing warns.
- **The twelve components**, all served web `production-ready`:

| Component | Input it blends | What shows on web today |
|---|---|---|
| Chip-Base, Chip-Filter, Chip-Input | `--color-structure-surface` | no hover or pressed background change; only the border turns primary |
| Button-CTA | `--color-action-primary`, `--color-contrast-on-action` | no hover or pressed background change; no icon optical balance |
| Button-Icon | `--color-action-primary` | primary: no background change; secondary and tertiary: border and text keep the rest colour |
| Button-VerticalList-Item | `--color-structure-canvas` | no hover or pressed background change |
| Container-Base, Container-Card-Base | surface, surface.primary or canvas | no hover or pressed change when interactive |
| Input-Checkbox-Base, Input-Radio-Base | `--color-feedback-select-border-default` | the hover border equals the default border |
| Input-Text-Base | `--color-action-primary` | the focus colour is not saturated (the border is still visible) |
| Input-Text-Password | `--color-structure-canvas` | no hover on the visibility toggle |

  These five inherit it: Input-Checkbox-Legal, Input-Text-Email, Input-Text-PhoneNumber, Input-Radio-Set and Button-VerticalList-Set. Icon-Base's own optical balance blends only hex input (`IconBase.web.ts` L190) and works.
- **Chip-Filter's selected-and-pressed state, every platform**: the inherited `state_styling` contract asks for a darker background on press (ΔL 0.05–0.10, `Chip-Base/contracts.yaml` L65). Web keeps the rest colour on hover and press (`ChipFilter.styles.css` L44–57). iOS (`ChipFilter.ios.swift` L347) and Android (`ChipFilter.android.kt` L217) fade the selected background to 0.9 opacity instead. Over the canvas that measures +0.004 (lighter) in light mode and −0.0499 in dark (`[LINA R6]`; the backdrop is assumed).

## The tests' known-bad gap (VERIFIED)

- The helper tests use only hex values, and they assert that an unparseable input comes back unchanged (`src/blend/__tests__/ThemeAwareBlendUtilities.test.ts` L186–190).
- The component tests never load the token CSS. The resulting warning is silenced as "environmental" (`src/components/core/Chip-Base/__tests__/ChipBase.test.ts` L43–53).
- `InteractionStateAudit.test.ts` names these components but tests `OklchBlendCalculator`, which none of them uses. That false assurance is Thurgood's, in `.kiro/issues/2026-11-28-spec-133-intake-from-132-pivot.md` item F.
- **The test the fix owes**: each component is fed the colour text the generator really emits, and the test asserts that hover and pressed differ from rest, with ΔL inside the contract's range in every theme. A known-bad twin (an unchanged colour) must fail. This test fails today.

## The fix

The fix is 133 U1: state colours become tokens, and components read them instead of blending at runtime. That covers all twelve, plus Chip-Filter's selected-and-pressed state on web, iOS and Android. My CSS interim fix was rejected by the pivot ruling (§ "[PETER] pivot"), so web waits for U1. The contract ranges are restated in U1 (the intake record, item B).

## Owed at 16.4.0, if U1 has not merged

- **The known-issue line**: 16.4.0's release notes carry one line saying that on web, the twelve components' hover and pressed states do not darken, and that U1 fixes it. The RELEASE-FLOW walk owner at 16.4.0 writes it. U1's notes close it.
- **The walk caution** (RELEASE-FLOW item 3a, carried from `[THURGOOD R22]`): every floor-class row goes to Peter in that release's batch, and a waiver counts "only if quoted and dated, from outside the diff". Whether Peter's 2026-11-28 answer stands as 16.4.0's waiver, or he must answer again in that batch, is UNVERIFIED. The 16.4.0 walk author decides and says which.

## Done when

133 U1's PR merges with the twelve components and Chip-Filter's selected-and-pressed state reading state tokens, and with the test above passing and its known-bad twin failing. That PR adds the outcome line here and archives this record.

*Signed: Lina, 2026-11-28.*
