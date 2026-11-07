# Task 9 Summary: The native type table, import lists and font family

**Date**: 2026-11-07
**Purpose**: Concise summary of parent Task 9 (Spec 129, Unit 4)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

Each token family now has one native type per platform, and the generated Android and iOS token files agree with them. On Android, lengths and sizes are `Dp`, `fontSize` is `TextUnit` in sp, `letterSpacing` is `TextUnit` in em, weights are `FontWeight`, font families are `FontFamily` from the stack's generic family, `radius_half` is `CornerSize(percent = 50)`, and typography composites are Compose `TextStyle`. On iOS, weights are `Font.Weight`, a font family is a `String?` (the first stack entry, `nil` for a generic or system keyword), `radiusHalf` is `Circle()`, and typography composites are a generated `TypographyToken` with a computed `tracking`. The Kotlin import lists are computed from what each file uses, and `ComponentTokens` refer to `DesignTokens` members. Lina changed the component reads that depend on these types and drafted the Android type statements for the platform guidelines; the Android and iOS minimums in the build config now follow Core Goals.

## Why It Matters

The native token context for Android went from 349 expected failures to 1, and iOS from 55 to 4. A consumer who builds the generated token files meets the files' real type errors only where theme emission is still unwired.

## Key Changes

- Generator: `AndroidFormatGenerator`, `iOSFormatGenerator`, `src/generators/native/{FontFamilyStack,KotlinImports}.ts`, `ComponentTokens` references.
- Components: 16 `.dp` sites removed, `fontSize` reads, `Input-Text-Base` constants, one iOS `Font.Weight` read.
- Docs: the Android type statements (LAW, ballot DRAFT until Peter ratifies), two Integration Guide sentences rewritten and INSTALL re-derived, four records closed.

## Impact

Android sizing and font-size reads change type for anyone who read those tokens. The four harness contexts passed on the unit's PR (#719). Peter ratified the guideline statements at 2026-11-07T17:00:13Z, after the PR merged at 16:52:22Z; the completion doc records that order as a finding for CLOSEOUT.

## Release note draft (I-1 and I-2)

**Android: sizing tokens are `Dp` and font sizes are `TextUnit`.** In the generated `DesignTokens.android.kt`, `size_*` tokens are now `val size_150 = 12.dp` (they were `Float`), and `font_size_*` tokens are `val font_size_100 = 16.sp` (they were `Dp`). If you read either token yourself: drop the `.dp` you appended to a sizing token, and pass a font size straight to `fontSize =`; use `.value` where you need the number. `letter_spacing_*` is now `TextUnit` in em, `font_weight_*` is `FontWeight`, `font_family_*` is a `FontFamily`, and the typography composites are Compose `TextStyle`. The file now carries its own Compose imports. On iOS, `fontWeight*` is `Font.Weight`, `fontFamily*` is a `String?`, and the typography composites are `TypographyToken`. Reading the shipped Android components needs no change.

See the detailed completion doc: `.kiro/specs/129-consumer-generation-completeness/completion/task-9-completion.md`.
