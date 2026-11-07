# Task 11.3 Completion: Index names and README; product-token emitters; the composite refusal, the fixture change, and what `generate` does on a refusal

**Date**: 2026-11-07 · **Task**: 11.3 (Spec 129, Unit 6, parent 11) · **Agent**: Ada (Sonnet) · **Branch**: `task/129-11-native-theme-emission`

## 1. What changed
- **Index and README**: every colour semantic is `theme.<name>` on iOS and Android (11.2's set); `token-index/README.md` § "Platform names" states the root rule (a `theme.` name is read through an instance; other names are relative to `DesignTokens`; `components.yaml` names are top-level types).
- **Product-token emitters**: a ref whose index name starts `theme.` is read through the theme: Swift `public extension DesignerPunkTheme { var product… : Color { self.colorActionPrimary } }`, Kotlin `@Composable @ReadOnlyComposable get() = LocalDPTheme.current.color_action_primary` with `import com.designerpunk.tokens.LocalDPTheme`. The binding is DesignerPunk's whatever the consumer's name or abbreviation.
- **The refusal**: `ProductTokenGenerator.validate()` and `generate()` return `compositeRefs`; `validateProductTokens` prints each and exits 1; `generate`'s product step throws with the message `Product token '<name>' (<file>) refs '<ref>', a composite token …`. A composite is a semantic in the typography, shadow or motion category, or one the index names with a list. `src/cli/__tests__/compositeProductRef.test.ts` (4) asserts it and the two emitter forms.
- **The fixture**: `bodyTypographyRef` is removed from `harness/fixtures/product-tokens/harness.yaml`; `consumer.test.ts`'s two fixture cases now assert one token and no composite.
- **Lists**: iOS and Android token lists lose the `ProductTokens` entries (`TypographyToken` for `CGFloat`, the two `theme` entries).

## 2. The decision, measured under Req 10.4: **refuse**
- **Configs read** (read-only, nothing generated in them): test01's `designerpunk.config.ts` and `product/tokens/*.yaml` (`border`, `color`, `layout`, `motion`, `shadow`, `typography`). It holds **12 `ref`s**, all to single-value primitives (`green300`, `yellow300`, `pink300`, `cyan200`, `space050`…`space300`, `radius025`, `borderWidth200`, `duration350`). **Composite `ref`s: 0.**
- The `init` product templates (`src/cli/templates/product/`) carry **0** `ref`s. The repository's harness fixture carried 1, which this PR removes. Two further copies in `scripts/harness/__tests__/fixtures/` are probe-generator inputs, not consumer configs.
- **Not made**: a scratch `init` from a 15.x-born packed install (no such install is kept here); the template read stands in, since `init` copies the template.
- No supported consumer holds a composite `ref`, so failing outright breaks none; it does not go to Peter. The 17.0.0 charter was not needed. The Jest test accepts the chosen behaviour.

## 3. Application-time adaptations
- `src/cli/generateProductTokens.ts` and `src/build/product/TokenIndexReader.ts` changed (the second is under the listed `src/build/product/**`; the first is `src/cli/**`, in my standing scope, but not on the Primary Artifacts list).
- Probe entries newly revealed once `:tokens` compiled and the probes ran (exception (c)): six unresolved component token types per platform (`AvatarTokens`, `BadgeLabelBaseTokens`, `ButtonIconTokens`, `InputCheckboxTokens`, `InputRadioTokens`, `VerticalListItemTokens`; 23 diagnostics each), tagged to the charter record `2026-10-02-consumer-generation-completeness-spec.md` (item (ii), clearing at U8).
