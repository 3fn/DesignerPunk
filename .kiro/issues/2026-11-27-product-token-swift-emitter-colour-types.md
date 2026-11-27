# Issue: the product-token Swift emitter breaks both static product-colour forms on iOS; a hard colour emits `UIColor(hex:)`, which does not exist, and a ref to a colour primitive is typed `CGFloat`

**Date**: 2026-11-27
**Owner**: Ada (token generation, product tokens included). The fix path, `src/build/product/**`, is outside my standing write scope, so the fix PR needs a spec row or an issue-row grant.
**Consulted**:
- Lina, who found it as a side finding in `[LINA R1]` on #870's colour fork (2026-11-27, read-only, by reading the source).
- Kenya (iOS): not yet consulted on this record.
**Class**: P1 consumer-blocking · defect *(set 2026-11-27, Ada, rule 12.)*
- **The broken input is the documented one.** `governance/Product-Token-Governance.md` § "Color Governance" gives a hard colour, `value: "#2196F3"` with `unitType: color`, as its "✅ Valid product color token" (L198). That exact form fails to compile on iOS.
- **The failure is silent where it starts.** `generate` reports `✅ Product tokens generated` and exits 0. The error then comes from Xcode, in `ProductTokens.ios.swift`, and the whole file fails with it.
- **Not P0**: the doc's "valid" is a governance judgment (both gates met), not a claim that the token compiles.
- **Counter, carried**: the gated path is narrow, and no consumer is known to have hit it. I rate it P1 anyway. Unlike #870's component-token class, this is the path the served governance doc teaches.
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. By then a fix PR has merged, or this record is re-ruled with a dated reason. A P1 record may not carry `manual` (rule 1). Once a fix PR exists, the trigger becomes `merge:#<N>`.
**Source**: `[LINA R1]` side finding 1 on #870 (2026-11-27). The orchestrator checked the two source lines, and Ada's probe confirmed the failure (below). The class is the same as #870's: a second, lossy copy of the platform type map. The input surface (`product/tokens/*.yaml`), the emitter and the governance are separate, so this gets its own record (see "Why a separate record").

---

## What happens

A consumer with `productTokens` configured declares a product colour token on either of the two static forms. `generate` writes `dist/tokens/product/ProductTokens.ios.swift`. The file begins `import UIKit`, and both lines fail.

| Form (`product/tokens/*.yaml`) | Emitted Swift | `swiftc -typecheck` |
|---|---|---|
| hard colour: `value: "#FF3366"`, `unitType: color` | `public static let brandHard: UIColor = UIColor(hex: "#FF3366")` | `error: no exact matches in call to initializer` |
| ref to a colour primitive: `ref: purple300` | `public static let brandPrimRef: CGFloat = DesignTokens.purple300` | `error: cannot convert value of type 'Color' to specified type 'CGFloat'` |

The third form, a ref to a colour **semantic**, is a theme read: `var product…: Color { self.<semantic> }` in a `DesignerPunkTheme` extension. It is untouched by this defect and is the only form the harness fixture holds (`harness/fixtures/product-tokens/harness.yaml`, `actionPrimaryRef`).

**Evidence** (VERIFIED, Ada, 2026-11-27):
- **Setup**: `@3fn/core` 16.3.0, packed from `3a3bd072b`, in a scratch consumer, with `productTokens: './product/tokens'` added to `designerpunk.config.ts`.
- **Probe**: `product/tokens/probe-colors.yaml` with the two tokens above, each with a `rationale`.
- **Generate**: `npx designerpunk generate` exited 0 and printed `🏷️  Product tokens: 2 tokens, 1 categories` and `✅ Product tokens generated`.
- **Typecheck**: `xcrun --sdk iphonesimulator swiftc -typecheck -target arm64-apple-ios17.0-simulator dist/tokens/DesignTokens.ios.swift dist/tokens/product/ProductTokens.ios.swift` printed exactly the two errors above (SDK 27.2).
- **Control**: the same product file, with only the two probe lines removed, typechecks with 0 errors.

**Repro**:
1. **Pack and set up**: pack the package and make a consumer as in `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` (#870), steps 1–2. Add `productTokens: './product/tokens',` to the config.
2. **Probe**: write the YAML below to `product/tokens/probe-colors.yaml`.
3. **Generate and typecheck**: run `npx designerpunk generate`, then the typecheck above.

```yaml
category: probe-colors
description: probe
tokens:
  brandHard:
    value: "#FF3366"
    unitType: color
    rationale: probe
  brandPrimRef:
    ref: purple300
    rationale: probe
```

## Where it comes from (`src/build/product/emitters/SwiftEmitter.ts` at `3a3bd072b`)

- **L84** maps the hard colour to `{ type: 'UIColor', value: `UIColor(hex: "…")` }`.
  - No `UIColor(hex:)` initializer is emitted anywhere.
  - The only `init(hex:)` DesignerPunk generates extends SwiftUI `Color`, in the blend utilities (`src/generators/BlendUtilityGenerator.ts` L677 and L686). Those utilities are not in the consumer's `dist/tokens/`.
- **`inferSwiftType` (L89–L94)** types a reference as `CGFloat` unless its path names a duration. Its own comment reads "static ref to color primitive". A colour primitive's iOS name, for example `purple300`, contains neither "color" nor "Color", so it falls through to the same `CGFloat` default.
- **L29** imports `UIKit` alone for static tokens. A correctly typed SwiftUI `Color` would also need `import SwiftUI`.
- **What is right**: the reference value uses the index's iOS platform name (`DesignTokens.${path}`). So the member path is correct, and only the type is wrong. This differs from #870, where the component emitter builds flat paths itself and misses nested members.

## Not checked

- **Android**, in `KotlinEmitter.ts`, emits `val brandHard = Color(0xFFFF3366)` (L83) and `val brandPrimRef = DesignTokens.purple_300` (L74). Both are untyped and look right by type. They were not compiled (no JDK on this machine), and Data has not been consulted.
- **Web** emits `#FF3366` and `var(--purple-300)`. Both are valid CSS.
- **The other static product families** on iOS were not probed: logical, duration, count, ratio and percent. By reading, a non-colour reference takes `CGFloat` or `TimeInterval`, and a fontWeight or fontFamily reference would mistype in the same way as #870. That part is UNVERIFIED.

## Fix shape (no fix is authorized by this record)

1. **Hard colour**: emit a SwiftUI `Color` that exists in the consumer's module. One way is `Color(red:green:blue:opacity:)` computed from the hex at generate time; another is to emit a `Color(hex:)` helper with the file. Add `import SwiftUI`.
2. **References**: emit with no type annotation, so Swift infers the primitive's own type, as Kenya proposes for #870. Alternatively, take the type from the index entry, never from a guess on the name.
3. **Guard**: add a static hard colour and a colour-primitive ref to the harness's product-token fixture, so the iOS lane compiles both. That fixture is under a spec row (my charter, ballot `2026-11-07-native-lane-ownership` item 5: `consumer.productTokensFixture` and `harness/fixtures/product-tokens/**` change only under a spec row). A `Consumer Guard` case is the alternative.
4. **Static, by design**: a hard or primitive-ref product colour does not follow mode or theme on any platform. Each platform emits a colour primitive's `light.base` value only (`src/providers/WebFormatGenerator.ts` L147–L152, `iOSFormatGenerator.ts` L316–L318, `AndroidFormatGenerator.ts` L305–L306). Product-Token-Governance already sends brand colour that varies by theme to `SemanticOverrides` (Gate 2). This item names the static behaviour so the fix does not mistake it for a defect.

## Why a separate record, not a widening of #870

- **Same class.** Both are a second, lossy type map beside the one that emits `DesignTokens`, so one fix design should serve both.
- **Different input.** #870's input is `defineComponentTokens`, whose colour family is a fork Peter has not ruled (allow or refuse). This record's input is product-token YAML, whose colour path is documented, gated and valid by its governance, so no fork reaches it. If #870's fork is ruled "refuse", this defect still stands.
- **Different emitter, different reach.** The emitter is `src/build/product/emitters/SwiftEmitter.ts`, from Spec 109. The member path is right here and wrong in #870. The fixture rule differs too: the product fixture changes only under a spec row.
- **The two can close separately.** A shared fix PR can still close both.

## Related

- `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` (#870), the component-token emitter's type map. It is the same class, and its fork section carries Lina's colour-fork answer.

Signed: Ada, 2026-11-27.
