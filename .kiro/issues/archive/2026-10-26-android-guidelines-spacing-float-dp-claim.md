# The Android guideline says spacing tokens are `Float` and convert to `Dp` implicitly; the generator emits spacing as `Dp`, and Kotlin converts nothing implicitly

**Date**: 2026-10-26
**Filed by**: Data, under README rule 10, from his R1 on #493 (the Android reading of the governance-examples guard). The finding is Data's; the file it is about is Lina's, so the fix is hers. Rule 9 applies to every later edit.
**Owner**: Lina (she maintains `governance/platform-implementation-guidelines.md`'s content; the change itself goes by ballot, as `2026-10-25-web-prop-mapping-rule-gap.md` states for the same file). Filed by Data.
**Class**: P0 false-claim · defect *(set 2026-10-26, Data, rule 12. **My reading**: the release falsity floor's P0 definition (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7) is "a statement false in a surface where a reader of the package meets it", and its list names a served doc. `governance/platform-implementation-guidelines.md` is served to agents through the docs MCP, and L744 is false against the generator at `main` (`f55bf3e04`) on both of its claims; the examples at L746–771 inherit the falsehood and do not compile. **The counter-reading** (P2 `(record)`, or P1 consumer-blocking): the section's headline rule, "never append `.dp`", gives the right call-site code for the families the generator emits as `Dp`, which includes spacing, so the commonest use works whatever the stated reason; only the reason and the examples are wrong, and Native ships as reference source. That reading is weaker in two places. The rule is stated for "`DesignTokens` values" in general and the section's reason is spacing, so the one family the reader tests it on (sizing, `Float`) is where it fails; and an agent that follows L750 or the enum example writes code that does not compile. Only Peter downgrades a P0. Stacy may press or dispute the reading.)*
**Trigger**: `release:next:phase-1` *(re-ruled 2026-10-26 by Lina, rule 1 and rule 9, on Peter's waiver below: this record is waived for 16.1.0 and its vehicle is Spec 129, which regenerates the Android section of the guideline from the final type table. It closes at the 129 PR that lands the Android type table. The token stays `release:next:phase-1` until a 129 PR exists, then becomes `merge:#<N>` of that PR.)*

---

## What the served text says (verbatim, `governance/platform-implementation-guidelines.md` at `f55bf3e04`)

L744:

> **Why**: `DesignTokens` spacing values are `Float` primitives. Compose layout functions (`padding()`, `size()`, `spacedBy()`) accept `Dp` and perform implicit `Float → Dp` conversion. Adding `.dp` creates the pattern `200.dp` in source code, which triggers token compliance test failures (the test pattern `/[1-9]\d*\.dp\b/` matches literal `.dp` usage).

It sits under L730, "**CRITICAL RULE**: Never append `.dp` when passing `DesignTokens` values to Compose functions." The same section then carries three more statements that depend on the same premise:

- L746–750: "**When `.dp` IS Required**: Only when assigning to an explicitly-typed `Dp` variable where implicit conversion doesn't occur", with `val dimension: Dp = DesignTokens.space_200.dp`.
- L753–767, the enum example: `val value: Float get() = when (this) { SMALL -> DesignTokens.space_150 … }`, commented "Return Float from token (no .dp)", then `val dp: Dp get() = value.dp`.
- L774: "Only Android has the `.dp` extension that creates this pattern."

## What the generator emits (`src/providers/AndroidFormatGenerator.ts` at `f55bf3e04`)

`getKotlinType`, L151–173:

```
case 'spacing':
case 'radius':
case 'tapArea':
case 'fontSize':
case 'borderWidth':
  return 'Dp';
case 'lineHeight':
case 'density':
case 'letterSpacing':
  return 'Float';
…
case 'layering':
  return 'Dp'; // Elevation tokens use Dp type
default:
  return 'Float';
```

`formatKotlinConstant` (L137–143) writes a `Dp` token as `val <name> = <n>.dp` (value built at L214–215 as `` `${value}.dp` ``) and every other type as `const val <name>: <type> = <n>`. Sizing is not a listed case, so it takes `default` and is a `Float`. `governance/rosetta-system-architecture.md` § "Token Consumption Rule" already says the Android generator emits `Dp`; the guideline contradicts it (the `.dp` contradiction `2026-10-13-discovery-study-stage1-followups.md` item 4 routed to Ada and Lina to adjudicate).

## Why both claims are false

1. **Spacing is not `Float`.** It is `val space_200 = 16.dp`, a `Dp`. So is radius, tapArea, borderWidth, fontSize and layering.
2. **Compose and Kotlin perform no implicit `Float → Dp` conversion.** `padding()`, `size()` and `spacedBy()` take `Dp`; a `Float` argument is a compile error. The call `Modifier.padding(DesignTokens.space_200)` works because the token already is a `Dp`, not because anything converts it.

I read both from the generator source, not from a Kotlin build: this repo has no Android toolchain. The `/[1-9]\d*\.dp\b/` test-pattern claim I did not verify; Lina's `src/components/__tests__/AndroidDpTokenReads.test.ts` (2026-10-24 record) is the guard I know of.

## What a reader is misled into

- **A reader who takes the premise as true** concludes `.dp` is never needed on a token and passes a `Float` family bare. For sizing (`Float`) that is a compile error, and the component sweep in `2026-10-24-android-component-unit-type-mismatches.md` found exactly that class in component code. It is the wrong-direction twin of the same premise.
- **A reader who follows L750** writes `DesignTokens.space_200.dp`: `.dp` on a `Dp` has no overload, a compile error, and the literal wrapper the section's own rule forbids four lines above.
- **A reader who follows the enum example** assigns `DesignTokens.space_150` (a `Dp`) to `val value: Float`: a compile error; and `value.dp` then converts a `Float`, which would be right only for a `Float` family such as sizing.
- **A reader building the mental model** believes spacing and sizing arrive as the same type, and so cannot tell which family needs `.dp` at the call site. The unit-type mismatches in the Android components (that record, groups A to C) are the same confusion in code.

## The one-sentence fix

Rewrite L744 (and the dependent L746–767 and L774) to say that `DesignTokens` emits spacing, radius, tapArea, borderWidth, fontSize and layering as `Dp`, which Compose takes bare and never takes with `.dp`, and sizing and the other `Float` families as `Float`, which take `.dp` at the call site, with the example blocks corrected to match each family and the family list read from `getKotlinType` rather than restated from memory.

## Not in this record

The component code that reads tokens at the wrong type is `2026-10-24-android-component-unit-type-mismatches.md` (Lina). What type `fontSize` should be emitted at is Ada's Spec 129 question in that record; this guideline cannot state the fontSize line finally until she rules it, so the fix should name the family list as of the generator at its fixing commit.

## Peter's waiver (2026-10-26)

*(Appended under README rule 9 by Lina, the owner. Peter's words are quoted as received; they came in chat, relayed by the orchestrator, before 2026-10-26T13:29:02Z by the orchestrator's clock.)*

> "Okay, waive the Android type issue and capture it in 129; resolve the radius names issue now, please"

Waived for 16.1.0: the L744 claim and the examples that inherit it (L746–L774) ship as they are in this release. Vehicle: Spec 129. The Android section of `governance/platform-implementation-guidelines.md` is regenerated from the final type table, so the fix reads `getKotlinType` at 129's fixing commit rather than a family list restated from memory (this record's "Not in this record" paragraph already names fontSize as Ada's 129 question). Ada is adding the 129 inbound line. This record stays open at the root with the re-ruled Trigger above; it is closed by the 129 PR that lands the Android type table, with rule 5's dated outcome line.

## Outcome (2026-10-30)

*(Lina, owner, rule 5.)* **Fixed by CORRECTION** on branch `fix/android-spacing-float-dp-guidelines`, cut from `d34fc7786`. This supersedes the Spec 129 vehicle named in the waiver above. **Authority**: Peter, in chat, relayed by the orchestrator, received before 2026-10-30T17:23:42Z: "Re: 2, Yes". That answers the authority line, which names Lina as author of `governance/platform-implementation-guidelines.md` L744–L774. It is recorded as R8 in `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md`; the merge SHA of R8 is cited in this PR's body.

- **What changed** (L744–L774 at `d34fc7786`; L744–L776 after):
  - L744 now states the emitted types: spacing, radius, tapArea, borderWidth and layering are `Dp`; `.dp` on a `Dp` does not compile; nothing converts implicitly.
  - fontSize is named as `Dp` today, with its type left open, per this record's "Not in this record" paragraph.
  - § "When `.dp` IS Required" now covers the `Float` families (sizing, lineHeight, density, letterSpacing) and names `getKotlinType` as the table.
  - The compliance-pattern claim is corrected: it flags literals, not token reads.
  - The enum example returns `Dp` tokens bare, and notes the `Float` case.
  - L774's last sentence now gives the real reason the pattern is Android-specific.
- **Truth referent**: `src/providers/AndroidFormatGenerator.ts` `getKotlinType` (L151–L173) and `formatKotlinValue` (L199ff) at `d34fc7786`. Cross-checked against the emitted fixture `tests/onboarding-trio/fixtures/born-cc/design-tokens/DesignTokens.android.kt` (`val space_200 = 16.dp`, L377; `const val size_500: Float = 40f`, L347), against `src/components/__tests__/TokenCompliance.test.ts` L620, and against `AndroidSizingDpReads.test.ts`.
- **Not verified**: no Kotlin build. This repo has no Android toolchain.
- **Found while correcting, outside the authority line**: L730's headline, "Never append `.dp` when passing `DesignTokens` values to Compose functions", is over-broad. A sizing read needs `.dp` (`DesignTokens.size_500.dp`). The corrected L744 and L746 now scope the rule inside the section, but the headline alone still misleads. The orchestrator asks Peter to widen the authority line to L730 before this PR opens. If he does not, the finding is filed in this PR as its own record (rule 10).
