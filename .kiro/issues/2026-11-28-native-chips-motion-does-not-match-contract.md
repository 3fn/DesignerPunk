# The native chips' state transitions do not use the motion their contract names: iOS uses button-press motion, and Android does not animate

**Date**: 2026-11-28
**Owner**: Lina (the components and their contracts; Kenya and Data verify on their platforms)
**Filed by**: Lina, under rule 10, for the owed act `[LINA R13]` named and `[THURGOOD R22]` item (4) carried, in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` (#880). It was found at `[LINA R5]` (`consults-2026-11-27/answers-132/lina-p7-plan.md`). It is filed on its own rather than appended to `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md`, because that record holds the True Native ballot's routed accessibility defects at P1. This is a contract-parity defect at P3, and mixing the two would blur both records' class.
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — Spec 132's requirements round opens. It takes this in as contract work for the first family (Chip-Base, Chip-Filter, Chip-Input: D6's native contract tests). The owner then re-rules it to the first family's unit PR (`merge:#<N>`), or closes it.
**Class**: P3 improvement · defect *(set 2026-11-28, Lina, owner, rule 12. The served contracts list iOS and Android for a motion the native chips do not use. The native components ship as reference source, not a build input, and their native readiness is `scaffold`, so no adopter is told the motion holds. It must close before the first family's claim, which is why the first family's contract tests are the place.)*

---

## What is wrong (VERIFIED at `8f05f76b8`)

- **The contract**: Chip-Base `state_styling`, platforms web, iOS and Android: "Transitions use motion.selectionTransition semantic token (duration250 + easingStandard)" (`src/components/core/Chip-Base/contracts.yaml` L66–67). Chip-Filter's `state_selected_styling` says the same (`Chip-Filter/contracts.yaml` L29). Chip-Input inherits it.
- **Web matches**: `ChipBase.styles.css` L75–77 uses `--motion-selection-transition-duration` and `-easing`.
- **iOS does not**:
  - The press animation uses `DesignTokens.MotionButtonPress.easing` (`ChipBase.ios.swift` L290, `ChipFilter.ios.swift` L326, `ChipInput.ios.swift` L294).
  - Chip-Filter's selection uses `MotionSelectionTransition.easing` (L327), which is correct.
  - Each file also declares `animationDuration = DesignTokens.Duration.duration150` and never uses it (`ChipBase.ios.swift` L105, `ChipFilter.ios.swift` L106, `ChipInput.ios.swift` L98).
- **Android does not animate the state change at all**: each file declares `animationDuration = DesignTokens.Duration.Duration150` (`ChipBase.android.kt` L142, `ChipFilter.android.kt` L149, `ChipInput.android.kt` L135). No `animate*AsState`, `tween` or transition reads it, so the colours switch instantly.

## Fix shape (owner's; not authorized by this record)

The state transitions on iOS and Android use `motion.selectionTransition`, as web does. Press feedback uses it too, unless a contract change says press takes `motion.buttonPress`. That would be a contract edit across all three platforms, decided in the family unit rather than drifting per platform. The unused `duration150` constants are removed. Reduced motion is honoured on both platforms (`accessibility_reduced_motion`, if the family carries it).

## Done when

The first family's unit PR merges with native contract tests asserting the named motion token on iOS and Android, each with a known-bad twin. That PR adds the outcome line here and archives this record.

*Signed: Lina, 2026-11-28.*
