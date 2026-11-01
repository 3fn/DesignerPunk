# Two Native Component Files Read Theme Names That Are Not Token-Index Keys

**Date**: 2026-10-25
**Filed by**: Lina, under rule 10, found by the declared-versus-read scan of the 16.1.0 floor row 4 schema pass (`2026-10-23-schema-tokens-declared-vs-read-completeness.md`, owner line 2026-10-25)
**Owner**: Lina (the component reads). Ada is consulted on which token each should read.
**Class**: P1 consumer-blocking · defect *(set 2026-10-25, Lina, rule 12, on a reasoned read, not a build: no Swift or Kotlin toolchain here. Each site names a member of the generated `theme` that the token index does not hold, which a native build reports as an unresolved reference. Native ships as reference source, so no reader is misled about it building, which keeps this out of P0; it is P1 for the same reason as `2026-10-24-android-component-unit-type-mismatches.md`.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the PR that points both sites at keys the index holds. *(Set 2026-10-25, Lina, rule 1: the fixing PR's number does not exist yet; the owner changes this to `merge:#<N>` when it opens.)*

---

## What is wrong

1. **`Avatar.ios.swift` L583** (`borderColor`, case `.xxl`): `return theme.colorStructureBorderXxl`. There is no token `color.structure.border.xxl` (or any key whose iOS name is `colorStructureBorderXxl`) in `token-index/semantics.yaml`. The header comment above it says the xxl border is `color.contrast.onSurface` "(white) with full opacity", a different name again. Which token the xxl border should read is Ada's to say.
2. **`ContainerBase.android.kt` L566 and `TokenMapping.kt` L231, L345**: `"color.border.emphasis" -> theme.color_border_emphasis`. `color.border.emphasis` is a retired name (the border colours are `color.structure.*`); `color_border_emphasis` is not in the index. Container-Base's README (L320, L335) and iOS `TokenMapping.swift` L457 (`colorBorderEmphasis`, a hard-coded `Color.gray.opacity(0.5)`) carry the same retired name, so the README is wrong in the same way and the iOS value is a literal, not a token.

## Fix shape

Point each site at a key the index holds (the owner's pick after Ada's read on the two names), and correct the Container-Base README lines. No declaration to add: the schema pass found nothing to declare for either.

*Signed: Lina, 2026-10-25.*

## Outcome (2026-11-01)

*(Lina, owner, rule 5.)* **Fixed** on branch `fix/native-reads-index-keys`, cut from `ca6e36f0e`. The token names come from Ada's read (`ada-reads-for-lina.md`, 2026-10-30), checked against `token-index/semantics.yaml` at that commit. Disposition: fix-now by 16.3.0's S, sheet r2.1 under `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`.

1. **Avatar xxl border.** `Avatar.ios.swift` L583 now reads `theme.colorContrastOnDark` (`color.contrast.onDark`, index iOS name `colorContrastOnDark`). This is the token web (`var(--color-contrast-on-dark)`) and Android (`theme.color_contrast_on_dark`) already read. Comments, preview labels, the README token tables and a test comment are corrected across Avatar-Base:
   - `color.contrast.onSurface` → `color.contrast.onDark`;
   - the retired `color.avatar.*` names → `color.identity.human` / `color.identity.agent` / `color.contrast.onDark` / `color.structure.border`.
   - **Access form**: Ada flagged it, and I kept the file's `theme.` form, which this file already uses for `colorContrastOnDark` (L557–L558). Whether the theme object carries static colours is Spec 129's item (i).
2. **Container-Base.** The `color.border.emphasis` mapping is **removed**, not re-pointed. That covers Android `ContainerBase.android.kt` and `TokenMapping.kt` (two functions), plus the iOS `colorBorderEmphasis` literal. The schema (L218–L220) has no emphasis border colour; emphasis is the border width. The retired key `color.border.default` becomes `color.structure.border`, the name the schema serves, on Android (3 sites) and iOS (1). Before this fix, a caller passing the served `color.structure.border` fell through to the `else` branch on both platforms (canvas white on iOS and in `TokenMapping.kt`). README L223, L314, L318, L320 and L335 are corrected.
3. **Found while fixing, fixed in the same function**: `ContainerBase.android.kt`'s `else -> colorBorder` named a `private` top-level value of `InputTextBase.android.kt`, which is not visible from this file, so it was an unresolved reference. It now reads `theme.color_structure_border`, as `TokenMapping.kt` does.
4. **Guard**: the two `expect(true).toBe(true)` "documentation tests" for an emphasis border colour in `ContainerBase.test.ts` are replaced by source checks. Each platform's mapping file must map `color.structure.border`, and must contain no `color.border.default`, no `color.border.emphasis`, no `color_border_emphasis`, no `colorBorderEmphasis` and no `else -> colorBorder`. Bite: the Android mapping file at `ca6e36f0e`, restored into this tree, turns the Android case red, and the restore turns it green.

**Not verified**: no Swift or Kotlin build; this repo has no native toolchain (R-2).

**Left**: `"color.border"`, also not an index key, is still accepted as an alias on iOS (`TokenMapping.swift`) and Android (`TokenMapping.kt`, its colour-name mapping). It maps to the right colour; removing it would change the API. It is named here and not filed, because it misleads no one.
