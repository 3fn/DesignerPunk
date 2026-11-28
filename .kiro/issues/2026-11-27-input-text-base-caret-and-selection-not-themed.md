# Input-Text-Base does not theme its caret or its text selection on iOS or web, and not its selection on Android; an adopter's theme does not reach them

**Date**: 2026-11-27
**Owner**: Lina (the component; Kenya, Data and Sparky consulted for their platforms' mechanisms)
**Filed by**: Lina, under rule 10, as an owner act. Found in Spec 132's outline round: Leonardo's question at R1 and his selection-colour flag at R2; my `[LINA R2]` and `[LINA R3]` on #880 (`consults-2026-11-27/answers-132/`, spliced into `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` by the formalizer).
**Class**: P3 improvement · defect *(set 2026-11-27, Lina, rule 12. No served doc or contract claims a themed caret or selection (VERIFIED: no `caret`, `cursor` or selection-colour line in `src/components/core/Input-Text-Base/contracts.yaml`, its schema or its README). Native ships as reference source, so no reader is misled. The cost is that an adopter's theme stops at these two pixels.)*
**Trigger**: `path:.kiro/specs/132-*/requirements.md` — Spec 132's requirements round opens. Spec 132 takes it in as part of Input-Text-Base's render work (D5) and the `rendering:` record's `platformParts:` reason. The owner then re-rules it to that family unit's PR (`merge:#<N>`), or closes it.

---

## What is wrong (VERIFIED at `origin/main` `017514064`, by `grep` in each platform's files)

| Platform | Caret | Selection |
|---|---|---|
| iOS (`platforms/ios/InputTextBase.ios.swift`) | not set: no `.tint(` or `.accentColor`, so it follows the app's tint | not set |
| Android (`platforms/android/InputTextBase.android.kt`) | **themed**: `cursorBrush = SolidColor(theme.color_action_primary)` (L328) | not set: no `TextSelectionColors`, so the default applies |
| Web (`platforms/web/*`) | not set: no `caret-color` | not set: no `::selection` |

Android's caret is the only themed part, so the three platforms also disagree with one another.

## Fix shape (owner's; not authorized by this record)

- The caret and selection take the theme's action colour on every platform, as Android's caret already does. Selection uses a translucent form of it, where the platform requires one.
- The token side is a semantic colour choice from the existing semantic layer. If none fits a selection highlight, that is a token need for Ada, not a hard-coded value.
- Each platform's mechanism is its engineer's to confirm: iOS `.tint`, Compose `LocalTextSelectionColors`, CSS `caret-color` and `::selection`.

## Done when

The PR that themes both on all three platforms merges, with a test per platform that the colour is the theme's. Then this record gets rule 5's outcome line, and the `rendering:` record's iOS reason drops "follow the app tint".

*Signed: Lina, 2026-11-27.*
