# Task 9.3 Completion: Guideline type statements (Lina's half)

**Date**: 2026-11-07
**Task**: 9.3 (Spec 129, Unit 4, parent 9) - Lina drafts; Ada co-writes the `ConfigHelpers` floors (not in this commit)
**Agent**: Lina (Sonnet, as planned)
**Branch**: `task/129-9-native-type-table-lina`

## 1. What changed

- `governance/platform-implementation-guidelines.md`, section "Android Token Usage: The `.dp` Pattern": the per-family Android type table (Dp, TextUnit sp and em, Float, FontWeight, FontFamily, CornerSize, Color, TextStyle, ShadowToken), the corrected rule, the `.value` conversion, the `.dp`-IS-required case, and the enum pattern. It replaces the text that called fontSize "an open decision" and sizing `Float`.
- The same statement text is in a scratch copy handed to Thurgood for the ballot record (a session scratch file, not committed).
- This is LAW (Req 6.9). It carries no ratification: Peter ratifies at U4's merge under Thurgood's ballot record, and the PR body carries `**Edit kind**: governance/platform-implementation-guidelines.md - LAW (<ballot path>)`.

## 2. Targeted tests run

Read against `getKotlinType`, `formatToken` and the generated `DesignTokens.android.kt` of this head (built locally). `NativeTypeTable.test.ts` and the two guards pass inside `npm test` (420 suites). No doc test covers the prose.

## 3. Application-time adaptations

- Removed the "(corrected 2026-10-30)" and "(corrected 2026-11-01)" parentheticals with their paragraphs: the text they corrected is replaced. The ballot should keep the prior text at `25fb4b7ac` as its reference.
- `shadow_*` blur and offsets stay `Float` (design § 5 does not list them); the table says so.
- `density`, `opacity`, `breakpoint` and `blur` are grouped as "other numbers, `Float`", which is the generator's default branch.
