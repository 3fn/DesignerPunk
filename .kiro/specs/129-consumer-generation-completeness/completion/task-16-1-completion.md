# Task 16.1 — Charter and overlay text (Kenya's part)

**Agent**: Kenya (Sonnet) · **Unit branch**: `task/129-16-theming-text` · **Data's part**: his draft, `data-text.md`, his own subtask doc.

## What changed

- I drafted my theming text in `scratchpad/u11/kenya-text.md`, from the generated Swift (`DesignTokens.ios.swift` L689–1081 of a generate at `2d9944ba9`), `ThemeEmitter.ts`, `SwiftEmitter.ts` L57–58 and design § 4: Edit 1 (the `#ios-theming-spec-094` charter unit), Edit 2 (the same unit in `kenya.overlay.md`, with its consumer re-pointing), Edit 3 (the operative-set items `theming-1` to `theming-10`, each a checked substring of the new unit) and Edit 4 (three stale texts in other units: (a) `scope-2`'s key path, (b) `product-tokens-3`'s type, (c) the `commands[platform-tokens]` cue; (d) left for U12, Task 17).
- Under F12′ I did not commit `canonical/agents/kenya.md`. Thurgood committed my text verbatim (`448d4fe7d`) and Data's likewise.
- I found a false sentence in my own draft before any act on its unit: bullet 1 said "the semantic colours are not on `DesignTokens`". The struct carries `accessibilityFocusColor` and `colorIconOpticalBalance`. The draft now says "the theme-varying colours"; Thurgood replaced it (`89aa1604d`).

## Targeted tests and result

None run: text, no code. The check was by script: every Edit 3 item text is a verbatim substring of Edit 1's new unit (after the correction), and the committed charter contains Edit 1's new text byte for byte.

## Application-time adaptations

- The row names the theming section; I also drafted Edit 4 (a)–(c) at the orchestrator's go, each in another unit and each needing its own confirmation and signature.
- The `theming-1` label is cut at 60 characters, before the corrected words, so it did not change.
- Provider spelling follows design § 4 (`.<name>Theme(_ family:)`); under the default name it is `.designerPunkTheme(_:)`.
