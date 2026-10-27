# 105 members of `public struct DesignTokens` in the generated Swift have no `public`: every colour primitive, 49 semantic colours and the six z-index tokens are unreadable from outside the module

**Date**: 2026-10-26
**Owner**: Ada (Rosetta generation pipeline; the emitting code is `src/providers/iOSFormatGenerator.ts` and `src/generators/TokenFileGenerator.ts`)
**Filed by**: Ada, under README rule 10, from the RL-29 index work (`.kiro/issues/2026-10-26-token-index-platform-names-not-emitted.md` § "Seen, not in this plan"), at the orchestrator's direction. Lina routed the first instance, `accessibilityFocusColor`, to me (`2026-10-26-guidelines-platform-token-names-radius-input-motion-floatlabel.md` § "Seen, not in #500"). Every line below was read at `0218632d1` against `dist/` regenerated the same day (`npm run generate:platform-tokens`). Rule 9 applies to every later edit.
**Class**: P1 consumer-blocking · defect *(set 2026-10-26, Ada, rule 12. `dist/DesignTokens.ios.swift` is in the packed install. A consumer that builds the file as its own module (a Swift package, the shape a token file usually takes) cannot read 105 of its names: `DesignTokens.pink300` or `DesignTokens.zIndexModal` is "inaccessible due to 'internal' protection level". Three shipped iOS components read such names (below), so they compile only when built in the same module as the tokens. I class P1 on the precedent of `2026-10-20-native-font-family-literals-unescaped-quotes.md`, the same kind of shipped native defect under the same "reference source" disclosure (release-16.0.0.md L29). Not P0: no served doc says the members are public. **The counter-reading** (P3 improvement): a consumer that adds the file to its app target, one module, reads every name, so nothing is blocked in that use. That holds only for that one use; the file does not say it must be used that way, and 293 of its members are `public`, so the 105 read as an omission, not a design.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken into the requirements or left out with a reason. *(Set 2026-10-26, Ada, rule 9. A P1 takes a git-visible token (rule 1); the token is the one the other native-generator records carry (`2026-10-20-native-font-family-literals-unescaped-quotes.md`, `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`), because Spec 129 is where the native output's other compile defects are being taken in. If I fix this before that commit, the fixing PR closes the record under rule 5.)*

---

## The defect

`dist/DesignTokens.ios.swift` declares 398 `static let` members directly or in nested types of `public struct DesignTokens` (L9). 293 are `public static let`; **105 are `static let`**, so internal. They come from three emitters:

| Lines | Count | What | Emitted by |
|---|---|---|---|
| L70–L119 | 50 | every colour primitive (`static let pink100 = Color.oklch(…)`) | `iOSFormatGenerator.formatOklchColor` (`src/providers/iOSFormatGenerator.ts` L595–L598), called from `TokenFileGenerator.generateOklchNativeColors` |
| L408–L455, L534 | 49 | semantic colours whose resolved value is OKLCH (`colorFeedbackSuccessBackground` … `colorScrimStandard`, `accessibilityFocusColor`) | `iOSFormatGenerator.formatSingleReferenceToken`, the `oklch(` branch (`src/providers/iOSFormatGenerator.ts` L309–L318: `` `    static let ${semanticName} = ${colorExpr}` ``); the `rgba(` branch at L302 writes `public static let` |
| L676–L681 | 6 | `zIndexContainer` … `zIndexTooltip` | `TokenFileGenerator.generateLayeringSection` (`src/generators/TokenFileGenerator.ts`, the iOS branch: `` `    static let ${camelName}: CGFloat = ${scaledValue}` ``) |

`dist/ComponentTokens.ios.swift` has no internal members (0).

**Shipped components that read an internal name**: `Container-Base/platforms/ios/ContainerBase.ios.swift` L699 and `Container-Card-Base/platforms/ios/ContainerCardBase.ios.swift` L849 (`DesignTokens.accessibilityFocusColor`), `Progress-Pagination-Base/platforms/ios/ProgressPaginationBase.ios.swift` L166 (`DesignTokens.colorScrimStandard`).

**What I have not done**: compiled anything. The reading "inaccessible from another module" is Swift's access rule for an unannotated member, not a compiler run; Kenya can confirm with `swiftc` across two modules.

## The plan

1. **Generator fix**: write `public static let` at the three sites above. It is one word per site, and it changes no value and no name: the regenerated `dist/DesignTokens.ios.swift` differs from today's only by `public ` on those 105 lines. One check to make in the fixing PR: `TokenFileGenerator.extractFormattedParts` matches iOS lines by `public static let` (`src/generators/TokenFileGenerator.ts` L1806 at `0218632d1`: `/public static let (\w+).*?=\s*(.+)$/`), so once the 49 semantic colour lines are public, the light/dark comparison in `generateSemanticSection` reads them too. On iOS every colour whose base light and dark values differ is in the native theme-varying set and is left out of `DesignTokens` before that comparison (`generateTokenFiles.ts`, the registry-wide `themeVaryingTokens`), so no output should change beyond the word; the fixing PR shows it by diffing `dist/` before and after.
2. **Test**: `src/generators/__tests__/tokenIndexPlatformNames.test.ts` checks that every iOS name in the token index is a `DesignTokens` member, not that it is `public`. The fixing PR tightens it to `public` members, so the defect cannot come back for any name the index serves.

**Why it is not in the RL-29 PR** (the orchestrator's brief allowed it if small and safe): it is small and, I believe, safe, but two of the three sites are in `src/providers/iOSFormatGenerator.ts`, and `src/providers/**` is not in my write scope (`canonical/agents/ada.md` § "Write scope"), although the records that name the emitting code name me as owner (`2026-10-20-native-font-family-literals-unescaped-quotes.md`, `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`). Fixing only the z-index site, which is mine, would leave 99 of the 105. The fixing PR needs a grant, below, or a write-scope change by a `canonical/agents/**` edit (my write scope moves only that way).

**Grant paths** *(owed; not yet a grant: README rule 10 forbids authoring the list only inside the diff it bounds, so Peter's direction naming these paths, or a merged line in this record, comes first)*: `src/providers/iOSFormatGenerator.ts`, `src/providers/__tests__/iOSFormatGenerator-semantic.test.ts` (its opacity cases assert `static let` strings; L367–L407 are a different emitter and may stay), `src/providers/__tests__/FormatProviders.test.ts`.

## Readers (trust, but verify)

- **Kenya**: confirm the cross-module reading with `swiftc` (two modules), and whether any iOS consumer path builds the token file as its own module today.
- **Lina**: the three component reads above; nothing to change in them once the generator writes `public`.
