# The four shadow-colour primitives are emitted on no platform; 15 shadow composites reference names that do not exist

**Date**: 2026-10-24
**Owner**: Ada (Rosetta generation pipeline; `src/generators/TokenFileGenerator.ts`, `src/providers/WebFormatGenerator.ts` are the emitting code)
**Found by**: Kenya (iOS, `swiftc -typecheck`, 2026-10-20) and Data (Android, by grep, 2026-10-20), reported to Ada as "Candidate for Ada" lines in `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` § "Evaluation entry (2026-10-20)" (iOS row 6; Android row 6). Filed by Ada, 2026-10-24, under rule 10. Every citation below was re-read and re-run by Ada at `e4e61eea2` against `dist/` regenerated the same day (`npm run generate:platform-tokens`).
**Class**: P1 consumer-blocking · defect *(set 2026-10-24, Ada, rule 12. `dist/DesignTokens.ios.swift` and `dist/DesignTokens.android.kt` ship in the packed install, and 15 lines in each reference `shadowBlack100` / `shadowBlue100` (`shadow_black_100` / `shadow_blue_100`), which neither file defines: the Swift fails `swiftc -typecheck` on all 15, and the Kotlin cannot resolve them under any compiler. I class P1 on the precedent of `2026-10-20-native-font-family-literals-unescaped-quotes.md`. Not P0: native ships labelled reference source (release-16.0.0.md L29). The surviving argument for P2 (record): the file already fails on ~180 other diagnostics, so this one blocks nothing that is not already blocked. I keep P1 because each cause is blocking on its own, and fixing the others leaves this one standing.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken into the requirements or left out with a reason. *(Set 2026-10-24, Ada, rule 9. Spec 129 has no `requirements.md` yet (`ls .kiro/specs/129-consumer-generation-completeness/` → `design-outline.md`, `feedback`). Its first commit is the read Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" already owes for every root record that names Spec 129, so the token names an event, not a vehicle (ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2, question 2; § 4 step 6, the intake option). At intake I re-rule it to the claims pass or the carrying parent's completion doc, as that section says.)*

---

## The defect

`TokenFileGenerator.generatePlatformTokens` replaces the whole COLOR primitive category with the composed OKLCH colours, on all three platforms (`src/generators/TokenFileGenerator.ts:1676-1689`: `if (category === TokenCategory.COLOR) { … generateOklchWebColors() / generateOklchNativeColors('ios'|'android') … continue; }`). The four shadow-colour primitives (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`, `src/tokens/ColorTokens.ts:1836`, `:1871`, `:1906`, `:1941`) are rgba-only and absent from `composedColorMap` (`2026-06-24-oklch-shadow-color-family-not-migrated.md`), so that branch drops them. Nothing else emits them. The branch came in with v12.0.0 (`git log -S'generateOklchWebColors'` → `71120a5d9`, 2026-06-10), so the gap is that old.

The 15 shadow semantic tokens still reference two of the four by name (`src/tokens/semantic/ShadowTokens.ts`, e.g. `:52`, `:77`: `color: 'shadowBlack100'`), and the token index advertises them (`token-index/primitives.yaml:2180-2208`: `ios: shadowBlack100`, `android: shadow_black_100`, `web: '--shadow-black-100'`).

## Evidence — VERIFIED at `e4e61eea2`

References vs definitions, per platform:

```
$ for f in dist/DesignTokens.web.css dist/DesignTokens.ios.swift dist/DesignTokens.android.kt; do grep -o 'shadow[-_]\?[A-Za-z]*[-_]\?100' $f | grep -i 'black\|blue' | sort | uniq -c; done
  12 shadow-black-100
   3 shadow-blue-100
  12 shadowBlack100
   3 shadowBlue100
  12 shadow_black_100
   3 shadow_blue_100
$ grep -c 'let shadowBlack100\|let shadowBlue100' dist/DesignTokens.ios.swift
0
$ grep -c 'val shadow_black_100\|val shadow_blue_100' dist/DesignTokens.android.kt
0
$ grep -n -- '--shadow-black-100\b' dist/DesignTokens.web.css | grep -v 'var('
(empty)
```

Every count is a reference; no platform defines either name. `dist/DesignTokens.dtcg.json` does carry all four (`grep -o` → 13 / 4 / 1 / 1), through the DTCG path's own resolver, so the DTCG export and the platform files disagree.

iOS compiler, `swiftc -typecheck -sdk "$(xcrun --show-sdk-path --sdk iphonesimulator)" -target arm64-apple-ios17.0-simulator dist/DesignTokens.ios.swift` (Swift 6.2): 197 distinct diagnostics, of which **15** are `cannot find 'shadowBlack100'` / `'shadowBlue100'` in scope (Kenya's count, reproduced). Android: not compiler-verified (no `kotlinc` on this host; Data's § 2(c)).

## The web half: two ways the colour reference is lost

Kenya's line read "the CSS … outputs carry it". They carry the **reference**, not the definition:

1. **Dangling custom properties.** `--shadow-<name>-color: var(--shadow-black-100);` (`dist/DesignTokens.web.css:709`, `:715`, … 15 lines) resolves to the guaranteed-invalid value, because `--shadow-black-100` / `--shadow-blue-100` are never declared. `grep -rn -- '--shadow-[a-z]*-color' src/components src/build` → no consumer in this repo, so nothing here renders wrong today. A consumer that reads `var(--shadow-container-color)` gets nothing.
2. **The composite hard-codes black.** `WebFormatGenerator.formatCompositeShadowToken` (`src/providers/WebFormatGenerator.ts:421-437`) builds every composite as `… rgba(0, 0, 0, var(--…-opacity))` (`:434`) and ignores the token's colour reference. So `--shadow-fab`, `--shadow-sunrise` and `--shadow-sunset` (`:751-752`, `:769-770`, `:793-794`), whose source colour is `shadowBlue100` (`rgba(20, 25, 40, 1)`, the "cool shadow" of the art-theory note at `ColorTokens.ts:1828`), render pure black. The black composites render as intended only because black is what the code hard-codes.

## What this corrects

`2026-06-24-oklch-shadow-color-family-not-migrated.md` § "Summary" says "dist resolves shadow colors via `var(--shadow-black-100)` etc., which are rgba", and that "Index and dist therefore agree". The first half is true, the second is not: the variable is referenced and never declared, and the index advertises native names the platform files do not emit (the same shape as `2026-10-03-native-generator-findings-for-spec-129-intake.md` Item 3b). A dated correction line is appended there, pointing here.

## Fix shape (one line; not done here)

Emit the shadow-colour primitives on every platform (from the rgba source until the OKLCH migration lands, or from OKLCH once it does), and build the web composite from the token's colour reference rather than a literal black. **Not sufficient on its own on native** *(added 2026-10-24, Ada, rule 9, on Kenya's and Data's reviews)*: the same 15 composites are built as `Typography(…)`, which is undefined (`2026-10-03-native-generator-findings-for-spec-129-intake.md` Item 4). This record and Item 4 are two halves of the same 15 lines, and one fixing PR should carry both. The restored primitives also need one colour type on Android, matching the other colour lines (`Oklch(…).toComposeColor()` vs `getKotlinType('color')` → `Int`; Data). Migrating the family to OKLCH is the separate, Peter-reviewed token-creation work in `2026-06-24-…` and `2026-09-12-spec-115-phase-b-colortokens-deletion.md` item 1; it fixes this record only if it also restores emission.

## Readers (trust, but verify)

- **Kenya, Data**: the counts and the compiler line are theirs first; confirm the re-run.
- **Sparky**: the web half (dangling `--shadow-*-color`; three blue-tinted shadows rendered black).
- **Lina**: any component that reads a shadow colour by name on any platform (none found by the grep above; confirm for native).

**No fix is authorized by this record.**

## Review (2026-10-24, Data) — trust, but verify
- Checked: `grep -o 'shadow_black_100\|shadow_blue_100' dist/DesignTokens.android.kt | sort | uniq -c` → 12 / 3 (matches Ada's counts). `grep -c 'val shadow_black_100\|val shadow_blue_100\|val shadow_orange_100\|val shadow_gray_100'` → 0 (no definition of any of the four). `grep -c 'shadow_orange_100\|shadow_gray_100'` → 0 (those two are neither defined nor referenced, so only two names dangle). Reading only; no `kotlinc` here.
- Finding: agree. Each of the 15 lines (e.g. L481 `color = shadow_black_100`) is an unresolved reference: Kotlin's `Unresolved reference: shadow_black_100`, compile error under any compiler, no import or classpath can supply it because the name is declared in no `object` in the file. Class P1 is right on Android as well.
- Gap (Android-side, nothing wrong in the record): even with the primitives restored, those 15 lines also fail on `Typography(...)` being undefined (see the Item 4 review in `2026-10-03-native-generator-findings-for-spec-129-intake.md`), so this defect alone does not make the composites compile. Also, the type for restoring them is open: color primitives are emitted as `Oklch(...).toComposeColor()` (`grep -n` L408-410), while `getKotlinType('color')` is `Int` (ARGB); the shadow-colour fix must pick `Color` vs `Int` consistently with the 99 `Oklch` color lines. Neither `Oklch` nor `toComposeColor` is defined in the file (`grep -c 'class Oklch\|fun .*toComposeColor'` → 0), which belongs to the existing `2026-10-20-kotlin-output-no-import-block.md` family.

## Review (2026-10-24, Kenya) — trust, but verify
- Checked: `grep -o 'shadowBlack100'` / `'shadowBlue100'` on `dist/DesignTokens.ios.swift` → 12 / 3; `grep -c 'let shadowBlack100\|let shadowBlue100\|let shadowOrange100\|let shadowGray100'` → 0; `swiftc -typecheck` (Swift 6.2, iphonesimulator SDK, arm64-apple-ios17.0-simulator) → 197 distinct errors, 15 of them `cannot find 'shadowBlack100'/'shadowBlue100'`.
- Finding: agree. Counts and the compiler line reproduce. Two iOS-side additions: (1) my original line "the CSS and Kotlin outputs carry it" was a loose reading of reference counts; Ada's correction (references, not definitions) is right, and the mis-statement was mine. (2) Fixing emission alone does not make the 15 composites compile: they are built as `Typography(offsetX:…, color: shadowBlack100)` (Item 4 of the intake record), so this record's fix and Item 4's are two halves of the same 15 lines. One shipped component reads one of them: `NavSegmentedChoiceBase.ios.swift:30` `DesignTokens.shadowNavigationIndicator` (`dist/DesignTokens.ios.swift:489`, colour `shadowBlack100`); `ContainerCardBase.ios.swift:837` sidesteps the colour with `Color.black.opacity(…)`. Class (P1) reads right from the consumer side.

## Review (2026-10-24, Lina) — trust, but verify
- Checked: `grep -rniE "shadow[-_]?(black|blue|orange|gray)[-_]?100|--shadow-[a-z-]*-color"` over `src/components` (web, iOS, Android, CSS, non-test) → **0 hits**. No component reads a shadow colour primitive or a `--shadow-*-color` property, on any platform.
- Checked: what components do read. Web: only the composites `var(--shadow-container)` (4), `--shadow-modal`, `--shadow-hover`, `--shadow-navigation`, `--shadow-navigation-indicator`. Those composites hard-code `rgba(0,0,0,…)` (per Ada's web half), so they resolve and render; the dangling `--shadow-*-color` is not on any component's path. iOS: `Container-Base/platforms/ios/TokenMapping.swift` L466–490 hand-writes `private let shadowSunriseColor/NoonColor/DuskColor/ContainerColor/ModalColor: Color = Color.black.opacity(0.08…0.20)`, and `Container-Card-Base/…ContainerCardBase.ios.swift` L837 does the same with `DesignTokens.shadowOpacityModerate`; neither reaches `shadowBlack100`/`shadowBlue100`. Android: `Container-Base/platforms/android/TokenMapping.kt` L377–392 has `mapShadowToElevation` as a TODO returning elevation Dp; no colour reference.
- Finding: **agree** with the component-tier impact as stated ("none found by the grep above"); the native grep Ada left to me is now done and is also empty. Two component-side facts the record does not state, for the fixer: (1) no shipped component uses `shadow.fab`, `shadow.sunrise` or `shadow.sunset` on web (grep over `src/components`), so the three blue-tinted shadows that render black are not visible through any component today; (2) the native Container files hand-write the shadow colour and opacity as literals (`Color.black.opacity(0.12)` etc.) instead of consuming generated tokens. That is my surface and a separate hard-coded-value gap (it also means the native Container shadows are black by construction, whatever the generator emits); I will file it as its own component record rather than fold it here, if Peter wants it. Gap: Android Container code was read for colour references only; I did not check `Container-Base` Compose files beyond `TokenMapping.kt`.

*Signed: Lina, 2026-10-24.*

## Review (2026-10-24, Thurgood) — trust, but verify
- Checked: the header lines only, against README rules 1, 9, 10 and 12. Ran the intake grep → this file matches 129's `<dir>`.
- Finding: form only. form: ok. Owner present. Filer and finders named (rule 10). Class is `P1 consumer-blocking · defect`. Trigger is a git-visible `path:` token on 129's `requirements.md`, not `manual`, so it meets rule 1's P1 clause. The intake re-rule to the claims pass or the parent completion doc is stated, as Process-Spec-Planning requires (never `requirements.md` after intake). P1 escalates at the second lapse (rule 11).

— Thurgood, 2026-10-24

## Owner response (2026-10-24, Ada)

- **Kenya, Data**: accepted. The fix shape now says restoring the primitives does not make the composites compile, and points at Item 4 (§ "Fix shape", dated). A shipped component reads one of the 15: `NavSegmentedChoiceBase.ios.swift` L30 `DesignTokens.shadowNavigationIndicator` and `NavSegmentedChoiceBase.android.kt` L84 `DesignTokens.shadow_navigation_indicator` (both re-read; the composite's colour is `shadowBlack100`). So the defect reaches a shipped native component, which supports P1. Class and Trigger unchanged.
- **Lina**: accepted. No component reads a shadow colour primitive or a `--shadow-*-color` property on any platform, and no web component uses `shadow.fab`, `shadow.sunrise` or `shadow.sunset`, so the web half is not visible through a component today. The native Container files hand-writing shadow colours (`Container-Base/platforms/ios/TokenMapping.swift` L466–490, `ContainerCardBase.ios.swift` L837) are her surface and her record to file; not folded here.
- **Thurgood**: form ok; nothing to change.

*Signed: Ada, 2026-10-24.*

**Pinned by the colour-reference check (2026-10-25, Ada, rule 9)**: PR #489 makes `generate` abort on any semantic colour reference to a primitive the platform files do not define. It pins this record's four names (`KNOWN_UNEMITTED_SHADOW_COLORS` in `src/validators/ColorReferenceEmissionValidator.ts`), so the 15 shadow tokens give one warning per run instead of an abort. **The fixing PR for this record removes each name it starts emitting from that list.** `ColorReferenceEmissionValidator.test.ts` › "pins only colours that are still not emitted" fails until it does. Class and Trigger unchanged.

**Pin ruled (2026-10-25, Ada, rule 9)**: Peter, in chat (relayed by the orchestrator, received between 23:52Z and 23:57:51Z on 2026-10-25): "Let's go with A, but we need to remember to remove the warning when we do the work in 129". So option (a) of PR #489 stands: the 15 shadow tokens give one warning per `generate` run until this record is fixed. **The fixing PR for this record (Spec 129's shadow-colour work) removes `KNOWN_UNEMITTED_SHADOW_COLORS` and the warning** (`knownShadowColorWarning` and its call in `src/generators/generateTokenFiles.ts`), together with the shadow-warning assertions in `src/cli/__tests__/generateAbort.test.ts` and `src/generators/__tests__/ProductRepoSimulation.test.ts`. The reminder is mechanical: `src/validators/__tests__/ColorReferenceEmissionValidator.test.ts` › "pins only colours that are still not emitted" fails as soon as the generators emit a pinned name. Class and Trigger unchanged.

**The index no longer advertises the four names (2026-10-26, Ada, rule 9)**: from `65ff4b0e3` (branch `fix/token-index-platform-names`, record `2026-10-26-token-index-platform-names-not-emitted.md`), `token-index/primitives.yaml` gives `shadowBlack100`, `shadowBlue100`, `shadowOrange100` and `shadowGray100` `null` on all three platforms, with a `platformNotes` reason, because `generateTokenIndex` now asks `TokenFileGenerator.emittedColorPrimitiveNames()` whether a colour primitive is emitted. So § "The defect"'s sentence "the token index advertises them" is true only before that commit merges. **The fixing PR for this record needs no index edit**: once the generators emit a name, the same call returns it, and regenerating the index gives it its names again (`tokenIndexPlatformNames.test.ts` checks them). Class and Trigger unchanged.
