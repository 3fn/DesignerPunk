# Issue: the iOS component-token emitter's type map breaks six families; a component token in color, fontWeight, fontFamily, duration, easing or scale makes `generate` emit Swift that is wrong or does not compile, and `generate` says nothing

**Date**: 2026-11-27
**Owner**: Ada (the component-token generator, `src/generators/TokenFileGenerator.ts`, and `defineComponentTokens`)
**Consulted**:
- Kenya (iOS): **answered** in `[KENYA R1]`, 2026-11-27, read-only. She reproduced the colour failure independently and found that the class is wider than colour; her results are in the table below.
- Lina (component tokens; the consumer of the colour fork): not yet consulted.
- Data (Android): not consulted; see "Not checked".
**Class**: P1 consumer-blocking · defect *(set 2026-11-27, Ada, rule 12; Kenya leans the same way.)*
- **The input is accepted.** `defineComponentTokens` is a public API (`@3fn/core/build`), its `family` is a `string`, and the generator handles colour explicitly with `case 'color'`.
- **One bad token fails the whole module.** `ComponentTokens.ios.swift` is one file that holds every component's enum, and shipped components such as Avatar and Button-Icon read it. So a single bad token fails the module, and every DesignerPunk component in the consumer's iOS target fails with it.
- **The failure is silent where it starts.** `generate` exits 0 with no warning, and the error surfaces later in Xcode, in a generated file the consumer did not write.
- **Not P0**: no release note or served doc claims these families work. The served docs said, falsely, that the call "takes numeric families only". That is corrected in `.kiro/issues/2026-11-27-served-docs-say-component-tokens-take-numeric-families-only.md` (PR #872).
- **Counter, carried** (Kenya's, and mine): the trigger is opt-in. No shipped component, scaffold token or known consumer hits it, and there is a clean workaround: semantic colours through `\.dpTheme`, and none of the six families. So "P2 (guard), latent until a consumer opts in" is defensible. I rate it P1 because the failure is silent: a consumer cannot tell they have opted into a broken path.
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. By then a fix PR has merged, or this record has been re-ruled with a dated reason. A P1 record may not carry `manual` (rule 1). Once a fix PR exists, the trigger becomes `merge:#<N>`.
**Source**: Ada's consult on the Spec 129 requirements amendment 1 draft (PR #864; lapse-batch row 7), 2026-11-27, which found the colour case. Kenya's consult, the same day, found the wider class. This defect is separate from `2026-11-08-generate-component-token-warning-spacing-sizing-only.md`.

---

## What happens

A consumer declares a component token in one of the six families below. `generate` accepts it, writes it to every platform and to `token-index/components.yaml`, and exits 0 with no warning. The iOS output is wrong or does not compile.

| Family | Value path (`value: <number>`) | Reference path (`reference: <primitive>`) |
|---|---|---|
| **color** | `UIColor = 7`: **fails**, `cannot convert value of type 'Int' to specified type 'UIColor'` (Ada and Kenya) | `UIColor = DesignTokens.purple300`, where the primitive is a SwiftUI `Color`: **fails**, `cannot convert value of type 'Color' to specified type 'UIColor'` (Ada and Kenya) |
| **fontWeight** | `CGFloat = 500` compiles, but the type is wrong; the primitive is `Font.Weight` (Kenya) | **fails**, `cannot convert value of type 'Font.Weight' to specified type 'CGFloat'` (Kenya) |
| **fontFamily** | not probed | **fails**, `cannot convert value of type 'String?' to specified type 'CGFloat'` (Kenya) |
| **duration** | `CGFloat = 150` compiles, but the unit and type are wrong; the primitive is `TimeInterval = 0.15` seconds (Kenya) | **fails**, `type 'DesignTokens' has no member 'duration150'`; the member is `DesignTokens.Duration.duration150` (Kenya) |
| **easing** | not probed | **fails**, `type 'DesignTokens' has no member 'easingStandard'`; it is nested in `DesignTokens.Easing` (Kenya) |
| **scale** | not probed | **fails**, `type 'DesignTokens' has no member 'scale088'`; it is nested in `DesignTokens.Scale` (Kenya) |

These families compile correctly on both paths (Kenya; Ada for the value path): spacing, sizing, radius, fontSize, borderWidth, tapArea, opacity, lineHeight, density, letterSpacing, blend and breakpoint.

**Evidence**:
- **Ada (VERIFIED, 2026-11-27)**:
  - **Setup**: `@3fn/core` 16.3.0, packed from `3a3bd072b`, installed into a scratch consumer, then `init` and `generate`.
  - **Command**: `xcrun --sdk iphonesimulator swiftc -typecheck -target arm64-apple-ios17.0-simulator dist/tokens/DesignTokens.ios.swift dist/tokens/ComponentTokens.ios.swift`, run on the files `generate` emitted (SDK 27.2, swift-driver 1.168.6). It printed exactly the two colour errors.
  - **Control**: the same files with the two colour enums removed typecheck with 0 errors, and the radius, fontSize, borderWidth and spacing value-path tokens in that file pass.
- **Kenya (`[KENYA R1]`, VERIFIED by her, 2026-11-27)**:
  - **Run**: an independent consumer at the same base; one call per family with a value-path and a reference-path token; Apple Swift 6.4.2, iPhoneSimulator 27.2 SDK, iOS 17.0 target. Her run gave the rest of the table above.
  - **Spot-checked by Ada** in her own consumer's `DesignTokens.ios.swift`: `fontFamilyBody: String?` (L181), `fontWeight500: Font.Weight` (L217), and the nested `public enum Duration` (L570, with `duration150: TimeInterval = 0.15` at L572), `Easing` (L607) and `Scale` (L622).

**Repro** (enough to rerun without the consult files, which are outside the repository):
1. **Pack**: run `npm ci` and `npm pack` in a DesignerPunk worktree at `3a3bd072b` or later.
2. **Make a consumer**: in an empty directory, run `npm init -y`, then `npm install <tgz>`, then `npx designerpunk init --name Probe --abbreviation PR --skip-agents`.
3. **Declare one call per family** in `src/tokens/component/`. For example:
   - value path: `defineComponentTokens({ component: 'Probecolor', family: 'color', tokens: { odd: { value: 7, reasoning: '…' } } })`;
   - reference path: `defineComponentTokens({ component: 'Probecolorref', family: 'color', tokens: { fill: { reference: purpleTokens.purple300, reasoning: '…' } } })`, with `import { purpleTokens } from '../ColorTokens'`.

   The other families follow the same pattern, each with its own primitive.
4. **Generate**: run `npx designerpunk generate`. It exits 0, with no warning naming any of these tokens.
5. **Typecheck**: run the command above on the two emitted files, then the control.

## Where it comes from (source at `3a3bd072b`)

**One root, and two consequences (Kenya; confirmed by Ada reading the source).**
- `getiOSComponentTokenType` (`src/generators/TokenFileGenerator.ts` L607–L621) is a second, lossy copy of the Swift type map.
  - It has six explicit `CGFloat` cases and `case 'color': return 'UIColor'`, and **every other family defaults to `CGFloat`**.
  - `UIColor` is left over from before the emitter used SwiftUI. Every other DesignerPunk iOS colour is a SwiftUI `Color`: the primitives on `DesignTokens`, and the semantic colours on `DesignerPunkTheme`.
- `formatiOSComponentTokenValue` (L627–L635) emits `DesignTokens.<name>` for a reference, so it assumes every primitive is a flat member. `Duration`, `Easing` and `Scale` are nested enums.
- **The value path has no unit conversion.** It emits the raw number, so `duration` comes out in milliseconds where the primitive is in seconds.

**Nothing upstream stops these inputs.**
- `src/build/tokens/defineComponentTokens.ts` L145 declares `family: string`, with no allow-list. The call refuses only an empty component, family or token set (L223–L233), and a reference whose `category` differs from `family` (L260–L275).
- `generate`'s only component-token check is `gridConformanceErrors` (`src/cli/designerpunk.ts` L263–L267). It returns nothing for any family other than spacing and sizing (`defineComponentTokens.ts` L363).
- `validateiOSComponentTokenSyntax` checks only for `import UIKit` and balanced braces (Kenya). That is why `generate` reports success.

**No instrument catches it.**
- DesignerPunk has no component token in these families. Its non-test `family:` declarations are 7 spacing, 5 sizing and 1 borderWidth.
- The native compile harness's iOS lane compiles the consumer's `ComponentTokens.ios.swift`, but its consumer is the init scaffold. The scaffold declares only sizing, spacing and borderWidth component tokens, and `scripts/harness/consumer.ts` injects none (Kenya; this is the gap in her lane).

## Not checked

- **Android** was not compiled, because there is no `kotlinc` on either machine, and Data has not been consulted.
  - **Value path**: the colour token emits `val odd = 7`, an `Int`, not a `Color` (Ada).
  - **Reference path**: Android's formatter also emits flat `DesignTokens.<name>`, but `DesignTokens.android.kt` nests `object Duration` (with `val Duration150 = 150`), `object Easing` and `object Scale` (Ada read this in her consumer's emitted file, at L556, L581 and L596). So the same reference-path failure is likely on Android for those three families. This is UNVERIFIED by any compile.
- **Web** emits `--probecolor-odd: 7;` and a raw `150` for a duration. Neither breaks a build. Both are wrong wherever they are used as a colour or a time.
- **The inferred-type fix below** was not compiled. Kenya compiled the explicit-type hand-patch only.

## Fix shape (no fix is authorized by this record)

Kenya's class-level shape, which she hand-tested on the reference path with explicit types:
1. **Reference path**: emit the member with no type annotation, so Swift infers it. That gives `public static let fillRef = DesignTokens.purple300`, the way `DesignTokens` already writes its semantic aliases. Take the qualified member path (`DesignTokens.Duration.duration150`) from the same source that emits `DesignTokens`, never from a second map. If colour stays, add `import SwiftUI` to `ComponentTokens.ios.swift`.
2. **Value path**: give a member a type only where the family has a numeric Swift literal. Convert duration from milliseconds to seconds. Refuse the rest (color, fontFamily, easing). Whether that refusal is a warning or a failure of `generate` is Peter's to rule: a refusal at load fails `generate`, and Req 13.2 holds a failure for a major or for Q7. A number never means a colour on any platform, so this is a cross-platform refusal, not an iOS patch.
3. **Guard**: add a fixture with one component token per family, in both paths, that `generate`s and typechecks the emitted pair. The fixture belongs in `Consumer Guard` or in the harness consumer (the harness is Kenya's lane, and `consumer.ts` is mine). This closes the instrument gap above.
4. **A fork, which is a policy question and not part of the fix. Peter decides, with Ada's lean and Lina as the consumer.** Should static colour component tokens be allowed, or refused?
   - **Allow**: emit `Color` and say plainly that it is static.
   - **Refuse**: send every component colour through semantic tokens on the theme, which is DesignerPunk's practice (`governance/Token-Governance.md` § "Component Token Usage" and its Best Practice note).
   - **What decides it**: a colour component token can reference only a primitive, so it pins one static colour and bypasses `\.dpTheme`, and it will not follow dark or WCAG. On iOS each primitive is emitted as one constant, even though 22 of the 54 colour primitives vary by mode or theme in source (Kenya, counted by script). How the generator chooses that single value is Ada's to confirm (UNVERIFIED).
   - This is the question `059-component-color-token-investigation` asked. Its closure is named for re-reading in #872's record.
5. **When this record closes**, the clause the CORRECTION in #872 adds to `governance/Token-Governance.md` L160 and L556 and to `governance/Token-Quick-Reference.md` L224 becomes false. The fix PR removes it, as a CORRECTION that cites this record.

## Related

- `.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md` (Ada). Lapse-batch row 7 is going back to Peter, because its "drop" rests on the false reason "`defineComponentTokens` cannot declare radius, fontSize or colour". This record neither re-rules nor corrects it. Its owner does that after Peter re-rules.
- `.kiro/issues/2026-11-27-served-docs-say-component-tokens-take-numeric-families-only.md` (Ada; PR #872), the CORRECTION of the false API statement in the served docs.

Signed: Ada, 2026-11-27.
