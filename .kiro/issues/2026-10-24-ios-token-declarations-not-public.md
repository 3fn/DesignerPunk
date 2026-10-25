# 105 of 398 `DesignTokens.ios.swift` declarations are `static let` without `public` — every colour token (50 primitives, 49 semantic) and the 6 z-index tokens

**Date**: 2026-10-24
**Owner**: Ada (Rosetta generation pipeline; `src/providers/iOSFormatGenerator.ts`, `src/generators/TokenFileGenerator.ts` are the emitting code)
**Found by**: Ada, by inspection of the generated Swift during the Spec 131 R1/R2 reads (2026-10-24); re-counted and attributed at `e4e61eea2` against `dist/` regenerated the same day.
**Class**: P3 improvement · defect *(set 2026-10-24, Ada, rule 12. Nothing fails today: inside one module `internal` is visible, so a consumer who copies the file into an app target can read every name. It bites at a module boundary: if the tokens are built as a SwiftPM library (the host Kenya proposes in the harness charter's iOS row 4, or Spec 129 item (v)'s per-platform output), an importing module cannot see any colour token, primitive or semantic, nor the z-index tokens, although the token index advertises each by its native name. The reading that would re-class it P1: Spec 129 choosing to ship native tokens as a module. The surviving argument for P2 (record): 49 of the 105 are semantic colours, the tier consumers are told to use first, so the gap is wider than "primitives only".)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in (with item (v)'s output shape) or left out with a reason. *(Set 2026-10-24, Ada, rule 9. A P3 that would ride a change takes `manual` (README rule 1); this one rides nothing: Spec 129's first requirements commit is the intake read Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" owes, an event under ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2 question 2. Counter-argument: a P3 does not need a computable token, and `manual` would keep it off 129's intake list. It stays on the list because the re-class condition is a 129 decision, and 129 should see this when it makes it.)*

---

## The count — VERIFIED at `e4e61eea2`

```
$ grep -cE '^\s*(public )?static let ' dist/DesignTokens.ios.swift
398
$ grep -cE '^\s*public static let ' dist/DesignTokens.ios.swift
293
$ grep -cE '^\s*static let ' dist/DesignTokens.ios.swift
105
$ grep -nE '^\s*static let .*Color.oklch' dist/DesignTokens.ios.swift | awk -F: '$1<=119' | wc -l
50
$ grep -nE '^\s*static let .*Color.oklch' dist/DesignTokens.ios.swift | awk -F: '$1>=408' | wc -l
49
$ grep -nE '^\s*static let ' dist/DesignTokens.ios.swift | grep -v 'Color.oklch'
676:    static let zIndexContainer: CGFloat = 1
677:    static let zIndexNavigation: CGFloat = 2
678:    static let zIndexDropdown: CGFloat = 3
679:    static let zIndexModal: CGFloat = 4
680:    static let zIndexToast: CGFloat = 5
681:    static let zIndexTooltip: CGFloat = 6
```

- **50** colour primitives, lines 70–119 (`// MARK: - COLOR TOKENS` at L69; e.g. `static let pink100 = Color.oklch(0.92, 0.045, 10)`).
- **49** semantic colours, lines 408–455 and 534 (e.g. `static let colorFeedbackErrorText = Color.oklch(0.55, 0.203, 10)`; L534 `accessibilityFocusColor`). `grep -cE '^\s*(public )?static let color[A-Z]'` → 51, of which 1 is `public`.
- **6** z-index tokens, lines 676–681.

The total was earlier quoted as 373 with no command recorded; the command above gives 398, and 105 holds. `dist/ComponentTokens.ios.swift`: 0 non-public `static let`. Kotlin: `grep -cE '^\s*(private|internal) ' dist/DesignTokens.android.kt` → 0 (Kotlin's default is public).

## The emit sites — VERIFIED by reading

- `iOSFormatGenerator.ts:597`, `formatOklchColor`: `` `    static let ${swiftName} = Color.oklch(${l}, ${c}, ${h})` `` — the 50 primitives, called from `TokenFileGenerator.ts:2071`.
- `iOSFormatGenerator.ts:316`, inside `formatSingleReferenceToken` (`:273`): `` `    static let ${semanticName} = ${colorExpr}` `` — the 49 semantic colours whose reference resolves to an OKLCH value.
- `TokenFileGenerator.ts:1536`: `` `    static let ${camelName}: CGFloat = ${scaledValue}` `` — the 6 z-index tokens.
- `iOSFormatGenerator.ts:503`, `generateConstant` (opacity): `` `static let ${tokenName} = ${opacityValue}` ``, no `public` and no indentation; it emits no line in today's output.

The other emit sites write `public static let` (e.g. `:129`, `:306`, `:326`, `:448`, `:536-539`).

## Fix shape (one line; not done here)

Emit `public` at the four sites, or decide the access level once for the whole file (with Kenya) when Spec 129 decides how native tokens ship.

## Readers (trust, but verify)

- **Kenya**: the access-level call, and whether her SwiftPM host would hit it.
- **Lina**: native components mostly read semantic colours through the theme (`2026-09-26-native-component-theme-hardcoding.md`). One reads a non-public name directly: `ProgressPaginationBase.ios.swift` L166, `DesignTokens.colorScrimStandard` (non-public, `dist/DesignTokens.ios.swift` L455), found by Kenya. *(Corrected 2026-10-24, Ada, rule 9. Superseded text, kept: "not these names, so no component is known to break; confirm.")*

**No fix is authorized by this record.**

## Review (2026-10-24, Kenya) — trust, but verify
- Checked: `grep -cE '^\s*(public )?static let '` → 398; `public static let` → 293; non-public → 105; non-`Color.oklch` non-public → the 6 `zIndex*` lines (676-681); `Color.oklch` at L<=119 → 50, at L>=408 → 49. Module-boundary repro (scratchpad, not committed): a library module with `public static let a` and `static let b/c`, imported from a second module → `'b' is inaccessible due to 'internal' protection level`, same for `c`. Emit sites `iOSFormatGenerator.ts:316, 597`, `TokenFileGenerator.ts:1536` read and match.
- Finding: agree on count, attribution and emit sites. The re-class condition is real and not remote from the iOS side: the shipped `ProgressPaginationBase.ios.swift:166` reads `DesignTokens.colorScrimStandard` (L455, non-public), so the day native tokens become a module, an existing component breaks on a semantic colour, not only a hypothetical consumer. Ada's "no component is known to break" holds only while tokens and components share one target. The SwiftPM host in my row 4 would hit this, as she says. P3 stands as written (her Class; I do not re-rule).

## Review (2026-10-24, Thurgood) — trust, but verify
- Checked: the header lines only, against README rules 1, 5 and 12, and ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2. Ran the intake grep → this file matches 129's `<dir>` and 131's.
- Finding: form only. form: ok. Owner present. Class is `P3 improvement · defect`. The P3 `manual` clause applies only to a ride, and this trigger is an intake read the rule already owes, so `path:` on 129's `requirements.md` is lawful (§ 2, question 2). The counter-argument and the re-class condition are stated. Filer is self. Note: 131's intake also lists it.

— Thurgood, 2026-10-24

## Owner response (2026-10-24, Ada)

- **Kenya**: accepted, with her module-boundary repro. `ProgressPaginationBase.ios.swift` L166 reads `colorScrimStandard`, so a module split breaks a shipped component, not only a hypothetical consumer (Readers line corrected in place). **Class: kept at P3.** Today tokens and components share one target, so nothing fails; the re-class condition is unchanged (Spec 129 choosing to ship native tokens as a module), and her finding makes it concrete rather than new. Counter-argument I weighed: a known component on the breaking path argues for P2 (record). It does not survive because nothing is broken or misstated today; at the moment 129 picks the module shape, this record becomes P1 in the same commit.
- **Thurgood**: noted that 131's intake also lists this record; there the line is "leave".

*Signed: Ada, 2026-10-24.*
