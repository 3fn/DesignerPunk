# Progress-Bar-Base's iOS and Android Files Read Six Theme Colours Through Names Nothing Declares (`ProgressBarTokens.theme.…`, `ProgressBarTokens.intheme.…`, `ProgressBarTokenstheme.…`)

**Date**: 2026-11-04
**Filed by**: Lina, under rule 10, found while counting the native `theme.` reads for my Spec 129 inbound (`.kiro/specs/129-consumer-generation-completeness/inbound-from-lina-2026-11-04.md` § 3.4). Read at `ee31decd3`; `src/` there is the same as at 16.2.0's S `4d10202b2` (`git diff --stat 4d10202b2 ee31decd3 -- src` is empty). Nothing compiled.
**Owner**: Lina (the component reads). **Verifiers**: Kenya (iOS), Data (Android).
**Class**: P1 consumer-blocking · defect *(set 2026-11-04, Lina, rule 12, on a reasoned read, not a build: no Kotlin toolchain is available here, and the iOS tree does not type-check for other reasons. Each site names a member that no shipped or generated file declares, which a native build reports as an unresolved reference. Native ships as reference source, so no reader is misled about it building, which keeps this out of P0. It is P1 for the same reason as `2026-10-24-android-component-unit-type-mismatches.md`: an iOS or Android consumer who builds the source meets each site as a compile error.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in or left out with a reason. *(Set 2026-11-04, Lina, rules 1 and 9. The prefix is wrong whatever 129 decides. But all six colours are static (`themeVarying: false` in `token-index/semantics.yaml`), and whether a static colour is read through the theme object or through `DesignTokens` is Spec 129's item (i) decision, the access-form question in my inbound § 3.3. The fix writes one form once, after that decision. The same token as the Android unit-type record.)*

---

## What is wrong

Spec 094's native migration (iOS: `1d3c242eb`, Task 4.4, 2026-04-07; Android: `33ad2708e`, Tasks 4.7–4.8, 2026-04-07) rewrote colour reads to `theme.<name>`. In Progress-Bar-Base the rewrite landed inside an existing `ProgressBarTokens.` prefix, and once inside the word `indeterminate`:

| File | Line | Read as shipped |
|------|------|-----------------|
| `src/components/core/Progress-Bar-Base/platforms/ios/ProgressBarBase.ios.swift` | 54 | `ProgressBarTokens.theme.colorProgressPendingBackground` |
| same | 76 | `ProgressBarTokens.theme.colorProgressCompletedBackground` |
| same | 77 | `ProgressBarTokens.intheme.colorProgressCompletedBackground` |
| `src/components/core/Progress-Bar-Base/platforms/android/ProgressBarBase.android.kt` | 91 | `ProgressBarTokenstheme.color_progress_pending_background` |
| same | 121 | `ProgressBarTokenstheme.color_progress_completed_background` |
| same | 160 | `ProgressBarTokenstheme.color_progress_current_background` |

- Each file already declares the theme it should read: iOS L47 `@Environment(.dpTheme) private var theme` (the backslash is fixed by PR #641, open at filing), Android L70 `val theme = LocalDPTheme.current`.
- `ProgressBarTokens` declares no `theme` or `intheme` member, and `ProgressBarTokenstheme` is one identifier that nothing declares.
- No record names these sites: `git grep -l -E 'intheme|ProgressBarTokenstheme|ProgressBarTokens\.theme' -- .kiro docs governance` finds nothing.
- No test reads them. The scan that found them was a text match for `theme.color…` reads.

## Fix shape

Delete the `ProgressBarTokens.` / `ProgressBarTokens.in` / `ProgressBarTokens` prefix, so each site reads the declared `theme`, or re-point it to `DesignTokens.<name>`. Which one depends on Spec 129's access-form decision for static colours. The component PR that writes it names this record, and Kenya and Data each append a dated line for their platform.

## Closing

The record closes when all six sites are fixed (rule 5), or when Spec 129 takes them in with a reason recorded here.

*Signed: Lina, 2026-11-04.*
