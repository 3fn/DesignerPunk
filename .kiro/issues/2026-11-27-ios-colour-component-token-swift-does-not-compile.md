# Issue: a colour component token makes `generate` emit iOS Swift that does not compile, and `generate` says nothing

**Date**: 2026-11-27
**Owner**: Ada (the component-token generator, `src/generators/TokenFileGenerator.ts`, and `defineComponentTokens`)
**Consulted**: Kenya (iOS), **pending**. She is asked to confirm the iOS side and the fix shape, and her answer may change this record's class or fix shape. Data (Android) has not been consulted; see "Not checked".
**Class**: P1 consumer-blocking · defect *(set 2026-11-27, Ada, rule 12. The public API takes the input: `defineComponentTokens` is exported from `@3fn/core/build`, its `family` is a `string`, and the generator has a `case 'color'` for it. `generate` then exits 0 with no warning, and the consumer's iOS target does not compile. The failure lands in the consumer's build, with nothing from DesignerPunk to say why. **Not P0**: no release note or served doc claims that colour component tokens work. The served docs said the opposite, falsely, for a different reason (`governance/Token-Governance.md` L160 and L556, `governance/Token-Quick-Reference.md` L224: "takes numeric families only … there is no color family"). That is corrected on branch `chore/token-governance-component-token-family-correction`. **Counter, carried**: no consumer is known to have hit this, and a consumer who followed those docs would not have, so P2 is a defensible reading. I rate it P1 because the corrected docs no longer steer anyone away, and the API never did.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. By then a fix PR has merged, or this record is re-ruled with a dated reason. A P1 record may not carry `manual` (rule 1). Once a fix PR exists, the Trigger becomes `merge:#<N>`.
**Source**: Ada's consult on the Spec 129 requirements amendment 1 draft (PR #864; lapse-batch row 7), 2026-11-27. Found while checking whether a consumer can reach a radius, fontSize or colour component token. That question belongs to `2026-11-08-generate-component-token-warning-spacing-sizing-only.md`; this defect is separate from it.

---

## What happens

A consumer declares a component token with `family: 'color'`, either as a value or as a reference to a colour primitive. `generate` accepts it, writes it to every platform and to `token-index/components.yaml`, and exits 0 with no warning. The iOS output does not compile:

| Path | Emitted in `ComponentTokens.ios.swift` (file begins `import UIKit`) | `swiftc -typecheck` |
|---|---|---|
| value, `value: 7` | `public static let odd: UIColor = 7` | `error: cannot convert value of type 'Int' to specified type 'UIColor'` |
| reference, `purpleTokens.purple300` | `public static let fill: UIColor = DesignTokens.purple300` | `error: cannot convert value of type 'Color' to specified type 'UIColor'` |

The primitive is emitted as a SwiftUI `Color` (`DesignTokens.ios.swift`: `public static let purple300 = Color(.displayP3, …)`). The component token is typed `UIColor`, so even a colour component token that references a primitive cannot compile.

**Evidence** (VERIFIED, 2026-11-27):
- **Setup**: `@3fn/core` 16.3.0 packed from `3a3bd072b`, installed into a scratch consumer, then `init`, then `generate`.
- **Command**: `xcrun --sdk iphonesimulator swiftc -typecheck -target arm64-apple-ios17.0-simulator dist/tokens/DesignTokens.ios.swift dist/tokens/ComponentTokens.ios.swift`, run on the files `generate` emitted. It printed exactly the two errors above (SDK 27.2, swift-driver 1.168.6).
- **Control**: the same files with the two colour enums removed typecheck with 0 errors. The radius, fontSize, borderWidth and spacing probe tokens in the same file pass, so only the colour family fails.

**The steps** (pack, consumer, the two probe files, generate, typecheck, control) are written out in full so another seat can rerun them. The copy handed to Kenya is outside the repository (`consults-2026-11-27/ada-ios-colour-repro.md`), so they are repeated here:
1. **Pack**: `npm ci` and `npm pack` in a DesignerPunk worktree at `3a3bd072b` or later.
2. **Consumer**: in an empty directory, `npm init -y`, `npm install <tgz>`, then `npx designerpunk init --name Probe --abbreviation PR --skip-agents`.
3. **Probe tokens**, in `src/tokens/component/`:
   - `defineComponentTokens({ component: 'Probecolor', family: 'color', tokens: { odd: { value: 7, reasoning: '…' } } })`;
   - `defineComponentTokens({ component: 'Probecolorref', family: 'color', tokens: { fill: { reference: purpleTokens.purple300, reasoning: '…' } } })`, with `import { purpleTokens } from '../ColorTokens'`.
4. **Generate**: `npx designerpunk generate` exits 0, with no warning naming either token.
5. **Typecheck**: run the command above, then the control.

## Where it comes from (source at `3a3bd072b`)

- **`src/build/tokens/defineComponentTokens.ts` L145**: `family: string`.
  - The call refuses only an empty component, family or token set (L223–L233), and a reference whose `category` differs from `family` (L260–L275).
  - A colour primitive's `category` is `color`, so a `family: 'color'` reference passes.
- **`src/generators/TokenFileGenerator.ts`**:
  - `getiOSComponentTokenType` returns `'UIColor'` for `case 'color'` (L607–L621);
  - `formatiOSComponentTokenValue` emits `DesignTokens.<name>` for a reference, or the raw number for a value (L627–L635).
- **`src/cli/designerpunk.ts` L263–L267**: `generate`'s only component-token check is `gridConformanceErrors`, and it returns nothing for a family other than spacing and sizing (`defineComponentTokens.ts` L363).
- **The repository's own lane does not catch it**:
  - DesignerPunk has no colour component token (non-test `family:` declarations: 7 spacing, 5 sizing, 1 borderWidth).
  - The coordinator's `color` rule refuses a custom numeric value in the lane (`src/integration/ValidationCoordinator.ts` L267–L276), but that rule runs on DesignerPunk's tokens, not a consumer's.

## Not checked

- **Android** was not compiled (no `kotlinc` on this machine).
  - The value path emits `val odd = 7`, an `Int`, not a `Color`.
  - The reference path emits `val fill = DesignTokens.purple_300`, where `purple_300` is a Compose `Color`. By type it should work for a `Color`-typed use.
  - Data has not been consulted.
- **Web** emits `--probecolor-odd: 7;` (not a colour) and `--probecolorref-fill: var(--purple-300);` (valid). Neither breaks a build. The first is wrong wherever it is used as a colour.

## Fix shape (no fix is authorized by this record)

Kenya confirms or replaces the iOS part.
1. **Value path**: a number is never a colour. Either `generate` warns, naming the token, under Req 13.2's no-fail rule, or `defineComponentTokens` refuses a `color` value at load. A refusal makes `generate` fail, so it needs Peter's ruling (Req 13.2: "a failure is held for a major, or goes to Peter under Q7").
2. **Reference path, iOS**: type the member as the primitive's own type (`Color`), or emit no explicit type. Then `public static let fill = DesignTokens.purple300` compiles. A `Consumer Guard` case should typecheck the emitted pair, as above.
3. **Policy, which Peter or the token governance rules decide and the fix does not**: whether a colour component token should exist at all. DesignerPunk's practice is that a component's colours reference semantic tokens directly (`governance/Token-Governance.md` § "Component Token Usage" and its Best Practice note). A colour component token that references a primitive bypasses the theme's colour semantics on iOS and Android.
4. **When this closes**, the clause that the correction branch adds to `governance/Token-Governance.md` L160 and L556 and `governance/Token-Quick-Reference.md` L224 ("is not supported on iOS today") becomes false. The fix PR removes it, as a CORRECTION citing this record.

## Related

- `.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md` (Ada). Lapse-batch row 7 is going back to Peter, because its "drop" rests on the false reason "`defineComponentTokens` cannot declare radius, fontSize or colour". This record does not re-rule or correct that one; its owner does that after Peter's re-ruling.
- Ballot `.kiro/docs/ballots/2026-11-04-waiting-spec-row.md`, row 4 (L441, L454, L658), closed `059-component-color-token-investigation` as "answered by `governance/Token-Governance.md` L160 and L556", whose API premise is false. The correction branch's record says whether that closure needs re-reading.

Signed: Ada, 2026-11-27.
