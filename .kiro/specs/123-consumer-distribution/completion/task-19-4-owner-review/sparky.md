# Sparky owner review — Integration Guide § Platforms › Web (L119–157)

VERDICT: CONFIRMED-WITH-CORRECTIONS (one FALSE claim: the `<div data-theme="wcag">` example)

Method: read-only. Checked against package.json `exports`/`files`, the built `dist/` in the working tree (stamped 2026-10-03), scripts/pack-assert.ts, src/**. I did NOT inspect an actual tarball (no `npm pack`), so "ships" = `files[]` glob match + pack-assert's own `exports ./dist/*` assertion (pack-assert.ts assertDeferredRows, "every exports ./dist/* target packs"), not a tarball listing.

## Claim ledger (claim -> evidence -> verdict)

| # | Claim | Evidence | Verdict |
|---|---|---|---|
| 1 | `import '@3fn/core'` and `'@3fn/core/components'` = all web components | package.json exports "." and "./components" -> dist/browser/designerpunk.esm.js (+types dist/browser-entry.d.ts); both listed in `files[]` explicitly; file exists (612 KB). Bundle auto-registers elements via safeDefine, src/browser-entry.ts:129-135+ | TRUE |
| 2 | `@3fn/core/tokens.css` exists, is DesignerPunk's own base | exports "./tokens.css" -> dist/DesignTokens.web.css; matched by `dist/**/*.{...css...}`; negation `!dist/web/**` does not touch it; exists | TRUE (tarball bytes UNVERIFIABLE-HERE) |
| 3 | `@3fn/core/component-tokens.css` exists | exports -> dist/ComponentTokens.web.css; same glob; exists | TRUE |
| 4 | Components "render against it with nothing built" (zero-config) | component CSS inlined into the bundle (scripts/build-browser-bundles.js cssAsStringPlugin); only token CSS is external; browser-entry warns if `--color-action-primary` absent (browser-entry.ts:100-109) | TRUE |
| 5 | `@3fn/core/grid.css` | exports -> src/styles/responsive-grid.css; `files[]` has `src/styles/`; pack-assert declaredFloorAdds lists it; exists | TRUE |
| 6 | `fonts/figtree.css`, `fonts/commit-mono.css`, `fonts/rajdhani.css` | exports -> src/assets/fonts/{figtree,commit-mono,rajdhani}/*.css; `files[]` has `src/assets/fonts/**` (only __tests__ negated); all three CSS files exist and their relative `url('./…')` font binaries (.ttf/.otf/.woff2) sit beside them in the tree and match `src/assets/fonts/**`; rajdhani.css in pack-assert declaredFloorAdds | TRUE |
| 7 | `import { BlendCalculator } from '@3fn/core/blend'` | exports "./blend" -> dist/blend/index.js (+.d.ts); `BlendCalculator` exported at dist/blend/index.js:22, index.d.ts:10. File is CJS (package.json has no "type":"module"); named export is detectable by cjs-module-lexer / bundlers. Its requires (./ColorSpaceUtils, ../tokens/BlendTokens, ./ThemeAwareBlendUtilities.web) are all dist/** and ship | TRUE in a bundler / Node. FALSE under the shipped Jest preset — see Jest item below (not claimed by the Web section) |
| 8 | "Your own tokens: after `generate`, import your own `DesignTokens.web.css` from your configured `output` directory" | config key `output` = src/config/defineConfig.ts:47, ConfigLoader.ts:113,129 (default 'dist'); written to config.outputDir, generateTokenFiles.ts:54; filename 'DesignTokens.web.css' WebFileOrganizer.ts:18; section 4 (L98-104) lists the same files | TRUE |
| 9 | "Keep `@3fn/core/component-tokens.css`" alongside your own DesignTokens file | `generate` also emits a ComponentTokens.web.css into the output dir (guide L101); the package one resolves to its own copy. Which of the two is correct for a consumer with their own component tokens is Lina/Ada's call — I verified only that the package file exists and the instruction is not self-contradicting | TRUE (as an instruction); design intent UNVERIFIED-BY-ME |
| 10 | Dark mode follows preferred colour scheme via CSS `light-dark()`; set `color-scheme` on an element to force | dist/DesignTokens.web.css:14 `:root { color-scheme: light dark; }`; 11 `light-dark(` uses; light-dark() resolves per-element at use site, so an element-level `color-scheme` works | TRUE (token facts: Ada's) |
| 11 | "One theme block is baked in: `data-theme="wcag"`. It ships in DesignerPunk's base CSS and is generated into yours" | present at dist/DesignTokens.web.css:932; emitted by TokenFileGenerator.ts:977 and wired in generateTokenFiles.ts:117-131, TokenFileGenerator.ts:1767 | TRUE |
| 12 | `<div data-theme="wcag">` -> "DesignerPunk components inside use the WCAG theme's values" | The emitted selector is `:root[data-theme="wcag"]` (dist/DesignTokens.web.css:932; TokenFileGenerator.ts:977; WebColorResolver.ts:72,145). `:root[...]` matches only the document root (`<html>`). On a `<div>` it matches nothing; the components get the base values | **FALSE** |
| 13 | "A theme you register in `designerpunk.config.ts` does not yet produce a `[data-theme="<name>"]` block in any generated CSS" | generateTokenFiles.ts:114-131 hard-registers only 'dark' and 'wcag' from fixed override maps; `config.themes` is read only to print the "Themes:" line (designerpunk.ts:241-242) and nowhere reaches generation | TRUE. (Note: generateWebThemeBlock, TokenFileGenerator.ts:1055-1091, would emit `:root[data-theme="<name>"]` — it is just not fed the config themes. The Web-section sentence is correct; its literal `[data-theme="<name>"]` omits `:root`, which is harmless.) |
| 14 | "A custom `data-theme` value resolves against nothing yet" | follows from 13 | TRUE |
| 15 | L117-118 "steps … live in sections 2, 3 and 7" | headings `## 2. CONSUME`, `## 3. BECOME`, `## 7. Joining an existing design system` (guide L50, L67, L207) | TRUE (numbering) |
| 16 | L157 "full import list is under Available Imports … in the reference part" | `### Available Imports` L482 under `## Reference` L253 | TRUE |
| 17 | L23 "On web, a custom theme … does not change your generated output yet; light and dark mode work" | = 13 and 10 | TRUE |
| 18 | Available Imports web rows: `./config` (`defineConfig`), `./types`, `./build` (`defineComponentTokens`), `./jest-preset`, `./testing` | dist/config/index.js:3-8, dist/types/index.js, dist/build/tokens/index.js:8-9, dist/testing/jest-preset.js, dist/testing/index.js all exist; `./jest-preset` is `require`-only (right for Jest) | TRUE |
| 19 | Elements named in the Web section | none named — no custom-element tag, class or attribute other than `data-theme` | n/a |

## Jest-preset finding (Lina's), dependency check
Confirmed from source: dist/testing/jest-preset.js moduleNameMapper maps `@3fn/core/blend`, `/types`, `/testing`, `/config` to `<pkgRoot>/src/{blend,types,testing,config}/index.ts`; `files[]` ships none of those (only src/types/PrimitiveToken.ts and SemanticToken.ts; src/build/tokens/index.ts IS shipped, so `/build` is unaffected — matches guide L476). Dependence in the Web section (L119-157): NONE of its claims mention Jest. The only exposure is the web example's `import { BlendCalculator } from '@3fn/core/blend'`: it works in the browser/bundler/Node but a consumer's Jest test importing code that does the same would fail under the preset. The guide already states this in Running Component Tests (L476), and I do not think the Web section needs to repeat it; I flag it so Thurgood decides, not as a falsehood.

## Replacement text (minimal)
Replace L141-145 (the bullet and the code block):

```
- **One theme block is baked in**: `data-theme="wcag"`. It ships in DesignerPunk's base CSS and is generated into yours. Its selector is `:root[data-theme="wcag"]`, so set the attribute on the `<html>` element; on any other element it matches nothing.
  ```html
  <html data-theme="wcag">
    <!-- DesignerPunk components on the page use the WCAG theme's values -->
  </html>
  ```
```

## Flag for Ada (not reworded)
- Token/theme facts I could verify mechanically agree with the guide (wcag block exists, light-dark(), registered themes ignored). The correction above is a selector-scope fact, but it touches the theme story: Ada should decide whether "scoped to root only" is intended or a gap, since TokenFileGenerator.ts:1025-1027's own docstring says `[data-theme="name"] { ... }` (unscoped) while the code emits `:root[...]`. Also my own agent prompt's "Web Theming" note says data-theme works on any HTML element and descendants inherit; the source says root only. That prompt text needs correcting upstream (canonical/agents/sparky.md) — Leonardo/Thurgood route.

## Not verifiable here
- Actual tarball contents (no pack run): "ships" rests on `files[]` matching and pack-assert's assertions, not a listing. The dist/ I read is a local build (stamped 2026-10-03 19:00); the published 15.x tarball's bytes are UNVERIFIABLE-HERE (pack-assert.ts section 10 governs the hermetic path).
- Runtime behaviour in a real browser (that the bundle registers elements, that fonts load through a given bundler's CSS url() resolution): read from source/config only, not executed.
- Whether tokens.css + a consumer's own generated DesignTokens.web.css produce the same custom-property names for every component token reference — Ada/Lina.
- Unclaimed observation: the ESM bundle touches `document`/`customElements` at load (browser-entry.ts:100-134, 208), so it cannot be imported during SSR/Node. The Web section does not claim otherwise; "Web products are supported" is unqualified.
