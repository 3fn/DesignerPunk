# Task 11.2 Completion: Fixed binding, holders, instances, providers, the local; resolved values; the theme-instance rule, the family, the exact-set tests

**Date**: 2026-11-07 · **Task**: 11.2 (Spec 129, Unit 6, parent 11) · **Agent**: Ada (Sonnet) · **Branch**: `task/129-11-native-theme-emission`, code `b2f329e99`

## 1. What changed
- **The emitter** (`src/generators/native/ThemeEmitter.ts`, new): iOS `public protocol DesignerPunkTheme: Sendable`, one `public struct <Name><Pascal>Theme: DesignerPunkTheme, Equatable` per instance, `public enum <Name>Themes` with a one-line member per instance, the implicit members (`static var <abbr><Pascal>` on `extension DesignerPunkTheme where Self == …`), `DPThemeKey` (default: base light), `EnvironmentValues.dpTheme`, `public enum <Name>ThemeFamily: Sendable, Hashable, CaseIterable` (reserved words backticked, a doc comment per case) and `View.<name>Theme(_ family: = .base)` over an exhaustive `switch` with no `default:`. Android `data class DesignerPunkTheme`, `object <Name>Themes`, `LocalDPTheme = staticCompositionLocalOf { …BaseLight }`, `enum class <Name>ThemeFamily` with doc comments and `@Composable fun <Name>Theme(family, darkTheme, content)` over a `when`. No alias.
- **The rule**: the four fixed instances, then each other registered theme's light before its dark; a theme of one mode shows base in the mode it does not cover. Custom themes reach the emitter only through `GenerationOptions.themeOverrides`, which `generate` leaves empty until U9.
- **Values**: every member of every instance resolves through the Display P3 converter (a legacy `rgba` value is read as sRGB and converted); an unresolvable value stops generation naming the token. Zero `Color.clear`, `Color.Unspecified`, `unresolved`.
- **Every colour semantic is a theme member** and leaves `DesignTokens` on iOS and Android; the index names it `theme.<name>` (`nativeThemeVaryingTokens` is now every colour semantic). The native `_wcag` members are gone (the wcag instances replace them). The Spec 094 emitters and their `rgba` converters are removed.
- **One import list**: `KotlinImports` learned the Compose runtime symbols; the theme block emits no `import`.
- **Tests, on the real definitions**: `SwiftThemeTypes.test.ts` (19) and `KotlinThemeTypes.test.ts` (14), configs S and C and the default name, with literal expected lists; `scripts/harness/__tests__/native-rules-emitter.test.ts` (15) holds the emitter and `scripts/harness/native-rules.ts` together; `ModeAwareGeneration` and `WcagValueInfrastructure` re-baselined to the instance model.

## 2. Targeted tests run
`npm test -- src/generators src/providers src/validators src/cli src/tokens src/build src/tools` → 4,439 passed (at `b2f329e99`); `npm run test:scripts` → 1,415 passed; `swiftc` (Swift 6, iOS 17) over the regenerated iOS files: no diagnostic left after the `PiecewiseLinearEasing` fix in 11.3's commit. Harness run 42400789833 at `b2f329e99`: `harness-ios-tokens` and `harness-android-tokens` PASS, both printing the `theme instances:` line equal to the module's four.

## 3. Application-time adaptations
- The emitter is written against `scripts/harness/native-rules.ts` as an independent copy; the comparison test is the only place that imports both.
- Config C's expected lists are literals in the tests; the "fixture member" the same-mode-fallback test overrides is `color.action.primary` (changed in the fixture theme maps, not in the repository's definitions).
- Dropping the native `_wcag` members was not in the task text; the wcag instances carry the same colours, and keeping both would have emitted every WCAG colour twice.
