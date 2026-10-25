# Generated `DesignTokens.android.kt` has two bare text lines in the object body — a Kotlin syntax error before any import or type question

**Date**: 2026-10-24
**Owner**: Ada (Rosetta generation pipeline; `src/providers/AndroidFormatGenerator.ts` is the emitting code)
**Found by**: Lina, by reading the generated file while sweeping Android sizing reads for the interim fix (branch `fix/android-sizing-dp-interim`); re-read and re-run by Ada in this tree at `e08ed4be8`
**Class**: P1 consumer-blocking · defect *(set 2026-10-24, Ada, rule 12. `dist/DesignTokens.android.kt` is in the packed install, and a bare line inside `object DesignTokens { … }` does not parse under any Kotlin compiler, so the file cannot compile whatever the import and OKLCH questions resolve to. Not P0: native ships as reference source, not a build input (16.0.0 entry; INSTALL.md says the Android file needs imports and dependencies added by hand), so no reader is told the file builds. The surviving argument for P2 (record): the sibling no-import-block record (`2026-10-20-kotlin-output-no-import-block.md`) already makes the file non-compiling, so this defect changes no consumer outcome alone. I class P1 because it is a different defect in a different function, it survives the import fix, and a consumer hand-patching imports would then meet a parse error and not the build they expected. Peter can re-class.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken into the requirements or left out with a reason. *(Set 2026-10-24, Ada, rules 1 and 9, the same token as the sibling P1 Kotlin-output records. Filed as its own record, not folded into the no-import-block record: that record's title, evidence and fix shape are about imports; this is a separate function and a separate fix, and a combined record could close on the imports fix while this stayed open.)*
**Fires**: the platform build-verification harness charter's § 3 trigger 2, "a generator-emits-invalid-platform-code incident" (`2026-09-17-platform-build-verification-harness-candidate.md`); the charter's owners re-rule its Trigger under rule 9 (dated line appended there when they do).

---

## The defect

`generateSectionComment` (`src/providers/AndroidFormatGenerator.ts` L532–545) builds the section title with an embedded newline:

```
'PRIMITIVE TOKENS\n    Mathematical foundation'
'SEMANTIC TOKENS\n    Use these for UI development'
```

and the Kotlin branch prefixes `// ` to the whole string once (`` `    // ${sectionTitle}` ``). Only the first line gets the prefix; the text after `\n` is emitted as bare text. (The XML branch is unaffected: it sits inside a `<!-- … -->` block.)

## Evidence — VERIFIED in this tree (Ada, 2026-10-24, `e08ed4be8`)

```
$ sed -n 10,15p dist/DesignTokens.android.kt

    // ============================================
    // PRIMITIVE TOKENS
    Mathematical foundation
    // ============================================

$ grep -n 'Mathematical foundation\|Use these for UI' dist/DesignTokens.android.kt
13:    Mathematical foundation
405:    Use these for UI development
```

A scan of the file for lines that are not a `val`/`const`/`object`/`package`/comment/brace line found only these two outside function bodies. `dist/ComponentTokens.android.kt` has the phrase only inside a block comment (L7) and no bare line. **Not compiler-verified** (no Kotlin toolchain here); the conclusion rests on the language rule that a statement or bare identifier sequence cannot stand in an object body, not on a compiler's message.

The tests do not catch it: `src/providers/__tests__/AndroidFormatGenerator-semantic.test.ts` L365–380 and L473–488 check that the title text is present and that `//` appears somewhere in the output (`toContain`), not that every line of the block is commented. iOS emits `///` for the same second line and web keeps it inside `/* */`.

## What ships

`package.json` `files` includes `dist/**/*.{js,d.ts,json,css,swift,kt}`; `dist/DesignTokens.android.kt` is in the packed install (same evidence as the no-import-block record).

## Fix shape (not done here; for Spec 129's requirements round)

- `generateSectionComment` splits the title on `\n` and prefixes `// ` to each line (Kotlin).
- A test that every non-blank line of the Kotlin section comment begins with `//` (the present assertions would pass on the broken output).
- Accepted by the build-verification harness, not by that test alone: the test pins one defect class; only a compile proves the file.

**No fix is authorized by this record.** It could ride the sizing class-fix PR or its own; that is the requirements round's call.

## Related records

- `2026-10-20-kotlin-output-no-import-block.md` — the imports (sibling; same file, different function).
- `2026-10-03-native-generator-findings-for-spec-129-intake.md` — `Typography(…)` undefined, CSS-syntax `oklch(…)` lines.
- `2026-10-24-android-component-unit-type-mismatches.md` — Lina's component-tier unit-type record; § "Also seen" lists the generated-file defects.
- `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-android-generator-defects-2026-10-24.md` — the class-level inbound (item I-3c).

*Signed: Ada, 2026-10-24.*
