# Inbound to Spec 129 from Ada: the Android generator's type contract and syntax defects (class fixes, named, owned)

**Date**: 2026-10-24
**Author**: Ada (owner of `src/providers/AndroidFormatGenerator.ts`). Drafted from Lina's intake draft (component side), re-read by Ada against the source and `dist/DesignTokens.android.kt` in this tree at `e08ed4be8`.
**Status**: INPUT to the design-outline and requirements rounds, not a spec artifact and not a ruling. This file is the capture Peter asked for (chat, 2026-10-24: "I'm fine with an interim fix, but we need to capture that we're aware of this problem and isn't lost in the backlog to be forgotten"). The records it points at carry the triggers; this file carries the class-level reading.
**Evidence grade**: source reading and the generated `dist/DesignTokens.android.kt` only. **No Kotlin was compiled**; there is no Kotlin toolchain where this was written (`kotlinc`, `gradle`, a JDK all absent). Every "does not compile" below is a reading of Kotlin's rules, not a compiler's output.
**Interim fix this sits behind**: branch `fix/android-sizing-dp-interim` (commits `ab25ed555`, `e08ed4be8`).

---

## Items (named, with ownership)

| # | Item | Generator / test / release note | Component side | Record |
|---|------|--------------------------------|----------------|--------|
| I-1 | Sizing emitted as `Dp` | **Ada** | **Lina**, same PR | `2026-10-23-component-token-usage-findings-from-drift-pass.md` items 5, 7 (on the interim branch's history) |
| I-2 | The `fontSize` Android type decision | **Ada decides; Data consulted** | **Lina** follows (38 sites) | `2026-10-24-android-component-unit-type-mismatches.md` groups B, C |
| I-3 | Generated `DesignTokens.android.kt` compile defects | **Ada** | none | I-3a `2026-10-20-kotlin-output-no-import-block.md`; I-3b `2026-10-03-native-generator-findings-for-spec-129-intake.md` Items 1, 2; I-3c `2026-10-24-kotlin-output-section-comment-bare-text.md` (new) |
| I-4 | Only the build-verification harness can prove Android compiles | **Ada (generator), Data/Kenya (instrument)** | n/a | `2026-09-17-platform-build-verification-harness-candidate.md` |

## I-1. Emit sizing as `Dp`

`getKotlinType` (`src/providers/AndroidFormatGenerator.ts` L151–173) has no `sizing` case, so sizing falls to `default: return 'Float'` and is emitted `const val size_700: Float = 56f`. Spacing, radius, tapArea, borderWidth and fontSize are `Dp`. Kotlin has no implicit `Float`-to-`Dp` conversion. The type split is why the 2026-04-03 move from `space_*` to `size_*` in Button-CTA and Avatar-Base broke them without anyone seeing it.

The class fix, one PR, in this order of ownership:

1. **Ada**: add `case 'sizing':` to the `Dp` group in `getKotlinType`; update the Android generator tests that pin `Float` output.
2. **Lina, same PR**: remove every `.dp` applied to a sizing read, because `Dp.dp` does not exist and the generator change would otherwise break the files it fixes. The list: the 13 interim sites (Button-CTA L281, 287, 292, 298, 303, 304, 309; Avatar-Base L226, 231, 236, 241, 246, 251), plus the 3 that already converted (Nav-TabBar-Base L367 `(dotSize / 2).dp` and L370 `dotSize.dp`; Progress-Bar-Base L89 `barHeight.dp`), plus the interim comments that point here.
3. **The guard enforces step 2**: `src/components/__tests__/AndroidSizingDpReads.test.ts` asks the generator what it emits for sizing; once that is `Dp`, it fails on each of the 16 `.dp` sites until they are removed. After they go, empty its `FLOAT_CARRIERS` list; retire the guard when sizing is `Dp` and the harness gates Android.
4. **Release note (Ada drafts, release owner decides the heading)**: the Kotlin type of `DesignTokens.size_*` changes from `Float` to `Dp`. An Android consumer's own `DesignTokens.size_N.dp` stops compiling; code that used a size as a number changes. Native ships as reference source, so who meets this is narrow, but it is a public type change and the entry says so. Whether it sits under "Breaking" is the release owner's call, not mine.

**Surviving counter-argument**: the 13 `.dp` sites the interim PR adds are churn on the day this lands. Accepted: it removes two known defects now, and the guard makes the churn mechanical. A second one: emitting sizing as `Dp` makes `DesignTokens.size_*` unusable as a bare number (a Canvas draw, a `Float` ratio), so a consumer who wanted the number needs `.value`. That is the same cost spacing already has; I do not read it as a reason to keep `Float`, but it is a trade the requirements round should see.

## I-2. The `fontSize` type decision (mine to decide in 129; Data consulted)

The generator emits `fontSize` as `Dp` (`val font_size_075 = 14.dp`, `dist/DesignTokens.android.kt` L145). The component tier was written as if it were `Float`: 38 sites in 12 files call `.sp`/`.dp` on it or assign it to a `Float` or `TextUnit` (Lina's groups B and C). The component side follows the ruling. The defensible options:

- **`Dp` (today)**: components change (38 sites). Wrong semantic: a font size is not a layout dimension, and Compose text takes `TextUnit`, not `Dp`.
- **`Float`**: groups B and C compile as written; the generator changes for the one family. Loses the unit; needs `.sp` at every `Text(fontSize = …)`.
- **`TextUnit` via `.sp`**: the Compose type for text; components change. The type the platform expects.

My lean, held loosely: **`TextUnit`**, because it is the platform's own type for this value and removes the conversion from every call site. Counter-argument that survives: it is the largest change on the component side, and it makes the family inconsistent with the iOS (`CGFloat`) and web (`rem`) outputs, which carry a number. A design-round question, not a fork for Peter unless it changes what is built. **Group A** (14 `.dp` on values that are already `Dp`) does not wait on this; it is Lina's under any ruling.

## I-3. The generated `DesignTokens.android.kt` does not parse or resolve, three ways

Each is a separate record with its own trigger; the class reading is that the file cannot compile before any component is considered.

- **I-3a. No `import` block** (`2026-10-20-kotlin-output-no-import-block.md`): 65 `.dp` and 99 `Oklch(…).toComposeColor()` with no `import`.
- **I-3b. Undefined and wrong-syntax lines** (`2026-10-03-native-generator-findings-for-spec-129-intake.md` Items 1, 2): `Typography(…)` constructed 39 times and defined nowhere in the file; `oklch(…)` CSS-syntax lines (9 in this build).
- **I-3c. NEW — bare text in the object body** (`2026-10-24-kotlin-output-section-comment-bare-text.md`): `generateSectionComment` (L532–535) prefixes only the first line of the title with `//`; the second line is emitted bare at `dist/DesignTokens.android.kt` L13 (`    Mathematical foundation`) and L405 (`    Use these for UI development`). Bare text in an object body is a Kotlin syntax error. The Android tests check the text is present, not that it is commented. iOS and web do not have it.

## I-4. What can prove it

**Only Spec 129's platform build-verification harness (its first task) can prove Android compiles.** The interim PR's guard is a text check of one defect class; Jest does not compile Kotlin. The class fixes above (I-1, I-2, I-3) should be accepted by the harness, not by guards or by this inbound's reading. Until the harness runs, every Android statement in this file is "read, not built".

## What this inbound asks of the outline and requirements rounds

1. Take I-1, I-2 and I-3a–c in, each with the owner above, or leave them out with a reason recorded in the round (the records' `path:` Triggers fire on `requirements.md`).
2. Settle the fontSize type (I-2) in the design round, Data consulted.
3. Keep I-1's component-side removal in the same PR as the generator change; the guard makes that mechanical.
4. Treat I-4 as the acceptance statement for any item here.

*Signed: Ada, 2026-10-24.*

**Added (2026-10-25, Ada)**: one more obligation for 129, outside this file's Android scope and filed here so the rounds see it. Peter ruled (chat, relayed by the orchestrator, 2026-10-25, between 23:52Z and 23:57:51Z): "Let's go with A, but we need to remember to remove the warning when we do the work in 129". PR #489 made `generate` warn about DesignerPunk's 15 shadow tokens, whose colours no platform emits. Spec 129's shadow-colour fix (`.kiro/issues/2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`) also removes `KNOWN_UNEMITTED_SHADOW_COLORS` and that warning (`src/validators/ColorReferenceEmissionValidator.ts`, `src/generators/generateTokenFiles.ts`). `ColorReferenceEmissionValidator.test.ts` fails if a pinned name is emitted and the pin is still there.

**Added (2026-10-26, Ada)**: one more deliverable for 129, from Data's record `.kiro/issues/2026-10-26-android-guidelines-spacing-float-dp-claim.md`. `governance/platform-implementation-guidelines.md` L744 says spacing tokens are `Float` and convert to `Dp` implicitly. `getKotlinType` (`src/providers/AndroidFormatGenerator.ts` L151–173) emits spacing, radius, tapArea, fontSize, borderWidth and layering as `Dp` and sizing as `Float` (I-1 and I-2 above change the sizing and fontSize rows), and Kotlin converts nothing implicitly, so the examples at L750 and L753–767 do not compile. Peter ruled (chat, relayed by the orchestrator, before 2026-10-26T13:29:02Z): "Okay, waive the Android type issue and capture it in 129; resolve the radius names issue now, please". So the Android type claim is not fixed in the guideline now; it is a Spec 129 deliverable. The fix: the Android section of the guideline (the L744 paragraph, L750, L753–767 and L774) is **regenerated or rewritten from the final per-family type table in `getKotlinType` at 129's landing commit**, not by hand against today's generator, because the table is still moving: the open input is the `fontSize` type decision (I-2, Ada decides, Data consulted), and sizing as the odd family (I-1) and the shadow-colour decision ride the same table. Data's record is the home of the finding; Lina owns the guideline and writes it, through the ballot measure that file's changes take. The Android build-verification harness (I-4) is the acceptance statement, as for every item in this file.

*Signed: Ada, 2026-10-26.*

