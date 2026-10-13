# Task 19.4 — Ada's owner wording (token-side reference rows)

Read against `task/123-u3-onboarding` @ `dc80b1fae`. Guide line numbers are HEAD's.
Legend: **V** = I read it (or ran it) on this branch; **U** = unverified; **D** = true only by design text / code that exists but is not wired.
Nothing here was run end-to-end in a born repo.

---

## 0. Region fixes from 584da6db — confirmed

- L87 and L100 read as I intended. **V**.

---

## 1. `### 2. Configure` (L268–303) — **corrected**

Reason: three things are false or stale.
- It tells the reader to "Create" a config file, but `init` writes it.
- The comments claim `name` and `abbreviation` drive generated theme type names. The code that would do that has no caller.
- The second example registers a theme with a non-compiling import and a false comment about the theme attribute.

Retitle: I accept Leonardo's "Configuring your design system".

**Replace L270–303 with:**

````markdown
`init` writes `designerpunk.config.ts` at your project root. For `--name MyProduct --abbreviation MP` it reads:

```typescript
import { defineConfig } from '@3fn/core/config';
import { darkSemanticOverrides } from './src/tokens/themes/dark/SemanticOverrides.ts';
import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';

export default defineConfig({
  name: 'MyProduct',
  abbreviation: 'MP',
  tokenSource: './src/tokens',
  componentTokens: ['./src/components', './src/tokens/component'],
  themes: [
    { name: 'dark', mode: 'dark', overrides: darkSemanticOverrides },
    { name: 'wcag', mode: 'light', overrides: wcagSemanticOverrides },
  ],
  output: './dist/tokens',
});
```

The one other option is `productTokens`, a directory of product token YAML (see "Product Tokens"). `componentTokens` directories are scanned for `tokens.ts` and `*.tokens.ts` files. Paths resolve relative to the config file's directory. The `themes` entries are not applied by `generate` yet (see "Themes").

Without a config file, the pipeline uses defaults: name `DesignerPunk`, abbreviation `DP`, the installed package's own tokens, no themes, output `dist`.
````

**Source ledger**

| Claim | Source |
|---|---|
| `init` writes the config, with exactly this text | V `src/cli/init.ts:626-643` |
| The option set is `name`, `abbreviation`, `themes`, `componentTokens`, `output`, `tokenSource`, `productTokens` | V `src/config/defineConfig.ts:37-63` |
| `componentTokens` scans `tokens.ts` / `*.tokens.ts` | V `src/cli/loadComponentTokens.ts:12,83` |
| Paths resolve relative to the config directory | V `src/config/ConfigLoader.ts:103,124-130,141` |
| Defaults: DesignerPunk / DP / package tokens / `[]` / `dist` | V `src/config/ConfigLoader.ts:39-45,110-126` |
| `themes` is not applied by `generate` | V `config.themes` is read only at `src/cli/designerpunk.ts:241-242`; `generateTokenFiles.ts:136-145` registers built-ins only |
| Removed comment: "→ generated type names (MyProductTheme) / environment keys (MPThemeKey)" | **D**. `generateThemeOverrideBlocks` (`src/generators/TokenFileGenerator.ts:1028`) has no non-test caller (V, grep). `dist/DesignTokens.ios.swift` has 0 `ThemeKey` (V). Name and abbreviation do reach product-token Swift/Kotlin today (V `src/build/product/emitters/SwiftEmitter.ts:11`, `KotlinEmitter.ts:11`), but I left that out to keep the text minimal. |

---

## 2. `#### Token Source Configuration` (L305–332) — **corrected**

Reason:
- L307 frames `tokenSource` as an opt-in "for contribution back to core". After `init` it is always set, and the born-repo model has no "contribute back".
- L322 is false.
- The "When to use / When NOT" lists describe the pre-123 model.

**Replace L307** ("By default, the pipeline reads … set `tokenSource`:") **with:**

```markdown
Without `tokenSource`, the pipeline reads the installed `@3fn/core` package's tokens. That is the CONSUME posture. `init` copies the token source into `src/tokens/` and sets `tokenSource: './src/tokens'`, so in a born repo your tokens are read from your own repo:
```

Keep the code block at L309–316 as it is.

**Replace rule L322** ("Theme overrides are independent of `tokenSource` — they always resolve from the config's `themes` array") **with:**

```markdown
- Dark and WCAG overrides are not read from `tokenSource` or from `themes`: `generate` applies DesignerPunk's own override maps from the installed package (section 4). Every semantic token those maps name must exist in your token source. If one is missing, `generate` reports an "Orphaned override key" and writes no token files.
```

Keep rules L319–321 and L323.

**Remove L325–332** (the "When to use `tokenSource`" and "When NOT to use `tokenSource`" lists).

**Source ledger**

| Claim | Source |
|---|---|
| Package-mode default | V `src/config/ConfigLoader.ts:123-126` |
| `init` copies to `src/tokens/` and sets `tokenSource` | V `src/cli/init.ts:193-202,634` |
| Overrides are the package's own maps | V `src/generators/generateTokenFiles.ts:19-21,126,136-154` (static imports resolve inside the installed package) |
| An orphaned key aborts before any file is written | V `src/resolvers/SemanticOverrideResolver.ts:53-57,64-69`; `src/generators/generateTokenFiles.ts:126-133,156-162` returns before the writes at L239-256 |
| Kept rule L321 (barrel exports) | V `src/cli/resolveTokens.ts:43-47` |
| Kept rule L323 | V `src/cli/init.ts:193-202` |

**Defect to file (code, not guide; U on exit code)**: after that abort, `runGenerate` still calls `generateTokenIndex` with the empty result and prints "✅ System tokens generated" (`src/cli/designerpunk.ts:253-279`; `generateTokenFiles` returns rather than throws). I have not run it, so I can't say whether the process exits 0. This is mine to file.

---

## 3. `#### Creating a Theme` (L334–362) — **corrected: tutorial removed, replaced by a status note**

Reason:
- The example's import does not compile.
- Custom overrides are validated nowhere.
- The mode bullets describe output that is not emitted.
- "M0a" is a stale label.

Retitle this sub-heading to **"Themes"**. Thurgood decides, since it is not a top-level heading.

**Replace L334–362 with:**

```markdown
#### Themes

`designerpunk.config.ts` accepts a `themes` list of `{ name, mode, overrides }`, with `mode` one of `'light'`, `'dark'` or `'both'`. `generate` does not apply it yet. A theme you register produces no `[data-theme]` block and no native theme output. Its overrides are not validated either, so a misspelled token name passes silently. The `dark` and `wcag` entries that `init` writes do not drive output either: `generate` applies DesignerPunk's built-in dark and WCAG overrides regardless. Light and dark mode work, and the `wcag` theme is built in. Custom-theme output is delivered by Spec 129 (consumer-generation completeness).
```

**Source ledger**

| Claim | Source |
|---|---|
| `ConfigTheme` is `{ name, mode, overrides }` | V `src/config/defineConfig.ts:30-34` |
| Modes are `'dark' \| 'light' \| 'both'` | V `src/themes/ThemeRegistry.ts:16` |
| Not applied | V `src/cli/designerpunk.ts:241-242` is the only `config.themes` read |
| No `[data-theme]` block and no native theme output | V; theme-block generator unwired (`TokenFileGenerator.ts:1028`, no non-test caller); `dist/DesignTokens.ios.swift` has 0 `ThemeKey` |
| Not validated | V; `src/cli/validate.ts:36-39` has four checks, none of them themes, and `generate` never registers `config.themes` |
| `init`'s entries don't drive output | V `src/cli/init.ts:636-639` vs `src/generators/generateTokenFiles.ts:136-154` |
| Light and dark mode work; `wcag` built in | V `dist/DesignTokens.web.css` has 11 `light-dark(` and `:root[data-theme="wcag"]` at L932; `src/generators/TokenFileGenerator.ts:977` |
| Spec 129 delivers | V `.kiro/specs/129-consumer-generation-completeness/` exists; the region uses the same pointer at L166/L177 |

Removed with the tutorial: the `SemanticOverrideMap` import from `@3fn/core/config`, which is not exported (V `src/config/index.ts:4-7`). Also removed: the `search_tokens` / `get_token_details` / `get_token_family` finder steps. Those tools exist, but the steps belong to the rewrite's walkthrough.

---

## 4. `### 6. Generate Tokens` (L495–548) — **corrected**

Reason:
- The banner sample shows a custom theme as if it were applied.
- "Force full regeneration" is wrong: `--force` touches only product tokens.
- The output list duplicates section 4, carries the false `token-index/` line, and points at "step 7", which is removed.
- L544–548 is version-dated.

Retitle: I accept Leonardo's "Generating tokens — options".

**Replace L501–507** (the banner sample) **with:**

````markdown
The pipeline shows where tokens are being read from. With the config `init` writes:
```
📦 MyProduct (MP)
   Tokens: src/tokens  (local)
   Output: dist/tokens
   Themes: dark (dark), wcag (light)
```
The `Themes:` line lists what your config registers, not what was applied (see "Themes").
````

Keep L509.

**Replace the flags table rows L515–516 with:**

```markdown
| `--force` | Regenerate product tokens even if their YAML is unchanged. System tokens are always regenerated. |
| `--product-only` | Skip the system token pipeline and regenerate product tokens only, from the existing `token-index/`. Run it from your project root. |
```

**Replace the comment at L522** `# Force full regeneration` **with** `# Regenerate product tokens even if their YAML is unchanged`.

Keep L526–533.

**Replace L535–548** (the output list and the 15.0.0 theme block) **with:**

```markdown
`generate` writes the files listed in section 4, and `token-index/` at your project root.
```

**Source ledger**

| Claim | Source |
|---|---|
| Banner format; `path.relative` drops `./` | V `src/cli/designerpunk.ts:237-243` |
| `init`'s themes | V `src/cli/init.ts:636-639` |
| The only flags are `--force` and `--product-only` | V `src/cli/designerpunk.ts:48-51` |
| System pipeline always runs; `--force` gates only product staleness | V `src/cli/designerpunk.ts:250-253,286-297` |
| `--product-only` reads `token-index/` from cwd | V `src/cli/designerpunk.ts:317,325` |
| Staleness is mtime-based (kept L526) | V `src/cli/staleness.ts:36-60` |
| `validate`'s four checks (kept L533) | V `src/cli/validate.ts:36-39` |
| `token-index/` at root | V `src/cli/designerpunk.ts:204,268` |
| Output file names | V `src/generators/TokenFileGenerator.ts:1571-1583,348,427,505`; `src/generators/generateTokenFiles.ts:301,317` |

**Code inconsistency to file (not 19.4)**: `generate` writes `token-index/` at the discovered root (`designerpunk.ts:268`), but `--product-only` (`:325`) and `validate --product-tokens` (`src/cli/validateProductTokens.ts:23`) read it from cwd. "Run it from your project root" covers this in the guide until the code is fixed.

The `--help` text "Regenerate all (skip staleness check)" (`designerpunk.ts:509`) is equally wrong. That is a code-side edit, and I'll fold it into the same issue.

---

## 5. `### Platform Dependencies for OKLCH Color Output` (L550–560) — **removed**

Reason: native onboarding is unsupported (region L156–177). L560 is false: neither `init` nor `sync` scaffolds or flags ChromaKit or colormath (V: zero matches for `ChromaKit|colormath` under `src/cli/`, recursive).

The surviving fact belongs to Kenya and Data, if they want it under § Platforms or deferred to Spec 129: native token output calls `Color.oklch(...)` and `Oklch(...).toComposeColor()` (V `dist/DesignTokens.ios.swift:71`, `dist/DesignTokens.android.kt:71`).

The browser minimum versions at L556 are U.

---

## 6. `### OKLCH Color Migration (v12+)` (under § Upgrading) — **removed**

Reason:
- Step 1 depends on the retired `sync` flow that wrote token source. The region says `sync` reports and never writes your tokens (L103–104, L187), and the dated note atop § Upgrading says 15.0.0 retired that flow.
- Step 3 is native-only, and native is unsupported.
- Step 4 is false: no product-token code parses OKLCH (V: no `oklch` match under `src/build/product/`). The iOS emitter wraps colour values as `UIColor(hex: "<value>")` (V `src/build/product/emitters/SwiftEmitter.ts:77`), so an `oklch(...)` string would emit broken Swift.
- The upgrade path is the 15.0.0 release notes (region L111).

---

## 7. `## Available Imports` (L749–764) — **corrected (token-side rows only)**

- Keep `@3fn/core/tokens.css` and `@3fn/core/component-tokens.css` (V `package.json` exports → `dist/DesignTokens.web.css`, `dist/ComponentTokens.web.css`).
- Keep `@3fn/core/config` (V `src/config/index.ts:4-7`).

**Add two rows:**

```markdown
| `@3fn/core/types` | Token type definitions. The token source `init` copied into your repo imports them. |
| `@3fn/core/build` | `defineComponentTokens` and the component-token build types. Your component token files import it. |
```

**Source ledger**

| Claim | Source |
|---|---|
| Both subpaths are exported | V `package.json` exports |
| `init` rewrites copied-source imports to these subpaths | V `src/cli/shared/transforms.ts:8-10,27,55,60`; `src/cli/init.ts:190-193`; `src/cli/shared/errorCatalog.ts:276` |
| `defineComponentTokens` is exported | V `src/build/tokens/index.ts:38` |

**For Lina, not me**: `./testing` and `./jest-preset` are also exported and missing from the table. The "All 34 web components" count is U.

---

## 8. `### Product Tokens` (L826–866) — **corrected** (with Leonardo)

Reason: L857–860's output path is right only when `output` is left at its default. The config `init` writes uses `./dist/tokens`, so the files land in `dist/tokens/product/`.

**Replace L857 ("**Generation** — `npx designerpunk generate` produces:") and the three bullets with:**

```markdown
**Generation** — `npx designerpunk generate` writes, into `product/` under your configured `output` directory:
- `ProductTokens.web.css` (CSS custom properties)
- `ProductTokens.ios.swift` (Swift constants)
- `ProductTokens.android.kt` (Kotlin objects)
```

Keep the rest.

**Source ledger**

| Claim | Source |
|---|---|
| `product/` under `output` | V `src/cli/generateProductTokens.ts:27` |
| The three file names | V `src/cli/generateProductTokens.ts:56-58` |
| Kept: `validate --product-tokens` | V `src/cli/designerpunk.ts:94` |
| Kept: `get_product_tokens` | V `product-mcp-server/src/index.ts:151,468` |
| Kept: `Product-Token-Governance.md` exists | V `governance/` |

**For Leonardo**: the YAML's `category:` key is ignored, because the category comes from the file name (V `src/build/product/ProductTokenGenerator.ts:127`). It is harmless as written, so no change from me.

**For Kenya, Data and Leonardo (Spec 129-adjacent, U)**: a product token whose `ref` names a theme-varying system token is emitted against a native theme environment that nothing emits (V `src/build/product/emitters/SwiftEmitter.ts:50`; `ProductTokenGenerator.ts:136-138`). Not a 19.4 text change.

---

## 9. `## Governance Gradient` (L1059–1069) — **corrected**

Reason: the "Ecosystem" row counts tokens as package artifacts. In a born repo every token is yours (region L87). The rows also don't separate the design system's tokens from product tokens in `product/tokens/`.

**Replace the first two table rows with:**

```markdown
| **Design system** | Your tokens (all of them, including what `init` copied), and the components, patterns and templates that ship with `@3fn/core` | Full — contracts, metadata, multi-agent review, spec process | Ada (tokens), Lina (components), Thurgood (specs/tests) |
| **Product extending** | Product tokens (`product/tokens/`), one-off components, product templates | Schema compliance, naming conventions, accessibility contracts for new behavior | Ada/Lina consulted, Stacy audits at synthesis |
```

**In the Principle paragraph, replace** "Ecosystem artifacts that affect all products get full review." **with** "Design-system artifacts, which affect every screen, get full review."

**Source ledger**

| Claim | Source |
|---|---|
| Tokens are the consumer's after `init` | Region L87; V `src/cli/init.ts:193-202` |
| Product tokens live in `product/tokens/` | Guide L820–823; V `src/cli/generateProductTokens.ts` reads `config.productTokens` |
| Agent names exist in a born repo | V `canonical/_consumer-output/_canonical/agents/{ada,lina,thurgood,stacy}.md` |

**Out of 19.4 scope**: my consumer charter's "Governance gradient" line (`canonical/_consumer-output/_canonical/agents/ada.md:196-198`) has the same ecosystem/product framing. That is a separate ballot.

Leonardo co-owns the review-depth framing for the bottom row; I did not touch it.

---

## 10. CLI Commands (L1073–1080)

This is not on my list, but it is token-adjacent. The table lists 4 of 11 commands; the full set is at V `src/cli/designerpunk.ts:45-84,496-519`. Whoever owns the section should mirror `--help` or point to it. Thurgood or Leonardo.

---

## 11. Install region (L21–248) re-read for token and theme claims

Checked:
- L21 (scope sentence)
- L33 (tsx is a dependency: V `package.json` `dependencies.tsx ~4.21.0`)
- L75, L77
- L87 and L90–100 (output names V as in § 4 above)
- L103–107
- L139–152 (V: tokens.css export, 11 `light-dark(`, wcag block at `dist/DesignTokens.web.css:932`)
- L158–175, including "14 theme-varying semantic colours". The 14 is V: it is the union of the keys of the package's dark, wcag and dark-wcag override maps, computed with tsx. Spot-checks against `dist/DesignTokens.ios.swift`: `colorActionNavigation`, `colorTextDefault`, `colorStructureCanvas`, `colorFeedbackInfoText` and `colorStructureBorderSubtle` are absent; `colorFeedbackErrorText` and `colorStructureSurface` are present.
- L184–187

**One further error, at L107.** "After an update, a component may look different while your colours do not." With L87's exception, an update can change your dark-mode and WCAG colour values the next time you run `generate`, because those override maps come from the installed package (V `src/generators/generateTokenFiles.ts:19-21`).

Minimal replacement for L107's first sentence:

```markdown
**The asymmetry is intended.** After an update, a component may look different while your colours do not, because the components are ours to improve and the tokens are yours to change. The exception in section 4 still applies: the dark and WCAG override values come from the installed package, so the next `generate` after an update can change them.
```

L103 ("never your language, the tokens") is true as stated: `npm update` does not touch your token source.

**Not mine, flagged for Thurgood**: L29 "Node.js 18+". `package.json` has no `engines` field (V), so the minimum version comes from somewhere other than the package (U).

I did not check the sync message text at L184 (Lina's and Thurgood's).
