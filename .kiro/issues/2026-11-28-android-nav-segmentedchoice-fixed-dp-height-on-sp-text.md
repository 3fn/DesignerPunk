# Android Nav-SegmentedChoice sets its segment height in fixed `dp` while its text is in `sp`, so large font scales probably clip the segments today

**Date**: 2026-11-28
**Owner**: Lina (the component; Data consulted for Android)
**Filed by**: Lina, under rule 10, for the owed act named in Spec 132's outline § 5.1, "Owed acts, by owner" (P-13). Found at `[LINA R4]` in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` (#880).
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — Spec 132's requirements round opens. It takes this in as part of P-13's per-family layout repair, which belongs in Nav-SegmentedChoice's family unit. The owner then re-rules it to that unit's PR (`merge:#<N>`), or closes it.
**Class**: P3 improvement · defect *(set 2026-11-28, Lina, owner, rule 12. Native ships as reference source, not a build input (`docs/consumer/INSTALL.md` L169), and Nav-SegmentedChoice-Base's Android readiness is `scaffold`, so no adopter is told it scales. The cost lands at large font scales once Android is claimed. That is why it must close before this family's claim, and P-13's layout repair is the place.)*

---

## What is wrong (VERIFIED at `8f05f76b8`; the clipping is REASONING, not run)

- `NavSegmentedChoiceBase.android.kt` L283 computes `segmentHeightDp = (size.fontSize.value * size.lineHeight).dp + size.blockPadding * 2`, and L289 applies it as `.height(segmentHeightDp)`.
- The label text is set in `sp` (`fontSize = size.fontSize`, L365, from `DesignTokens.font_size_125` or `font_size_100`, L110–112).
- `sp` grows with the system font scale and the `dp` height does not. At a large font scale, the label is therefore taller than its segment. The indicator layer and the segments are probably clipped.

## Fix shape (owner's; not authorized by this record)

The height follows the text. Either the box sizes to its content, with the token padding and a minimum height, or the `sp` value is converted to `dp` through `LocalDensity` so that it scales with the font. It lands together with P-13's typography move for this component, `typography.segmentLg` and `typography.segmentMd`, which Ada creates in 132's typography work.

## Done when

The PR that makes the segment height follow the font scale merges, with a Compose test at the largest font scale asserting that the label is not clipped, and a known-bad twin (the fixed `dp` height) that fails. That PR adds the outcome line and archives this record.

*Signed: Lina, 2026-11-28.*
