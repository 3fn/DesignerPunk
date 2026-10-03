# Task 19.4 — Ada's owner review of the assembled text

This review is read-only. It covers the working tree of `task/123-u3-onboarding` on top of `7e838ed10`, which includes Thurgood's uncommitted edits. The guide line numbers below are from that working tree.

**V** means I read it in source on this branch. **U** means unverified.

## Verdicts

### § 4 (L85–114): CONFIRMED

- L89, L102 and L109 carry my text verbatim.
- The output list (L95–100) matches the generators: V `src/generators/TokenFileGenerator.ts:1571-1583,348,427,505`, `src/generators/generateTokenFiles.ts:301,317`.
- `token-index/` is written at the project root: V `src/cli/designerpunk.ts:204,268`.
- Optional, not a correction: L109 says "The exception in section 4" while sitting inside section 4. "The exception above" would read better, but the sentence is not false, so I leave it to Thurgood.

### Configuring your design system (L257–306), including "Themes": CONFIRMED

This is my text verbatim. The ledger is unchanged from `19.4-wording/ada.md` §§ 1–3, and I re-checked these lines:

| Claim | Source |
|---|---|
| The config `init` writes | V `src/cli/init.ts:626-643` |
| The set of config options | V `src/config/defineConfig.ts:37-63` |
| The defaults | V `src/config/ConfigLoader.ts:39-45` |
| The override abort, before any file is written | V `src/generators/generateTokenFiles.ts:126-133,156-162` |
| Theme modes | V `src/themes/ThemeRegistry.ts:16` |
| `themes` is read only for the banner | V `src/cli/designerpunk.ts:241-242` |

I support the retitle to "Themes". The sub-heading no longer teaches theme creation, so the old title would describe something the section doesn't contain.

### Generating tokens — options (L379–421): CONFIRMED

This is my text verbatim.

| Claim | Source |
|---|---|
| The flags | V `src/cli/designerpunk.ts:48-51` |
| `--force` only affects product tokens | V `src/cli/designerpunk.ts:286-297` |
| `--product-only` reads from cwd | V `src/cli/designerpunk.ts:317,325` |
| The banner | V `src/cli/designerpunk.ts:237-243` |
| The four validate checks | V `src/cli/validate.ts:36-39` |
| Staleness | V `src/cli/staleness.ts:36-60` |

### Governance Gradient (L785–798): CONFIRMED-WITH-CORRECTIONS

- Row 1 (L789) and the Principle sentence (L793) carry my text. Confirmed.
- Row 2 (L790) is held. My final text is in Held item 2 below.
- I am not changing the Promotion path (L795). Its posture-B re-scope is parked in the rewrite charter (#299, per Leonardo), and nothing in it is false enough to fix in 19.4.

### § Platforms › Web, token and theme facts (L119–157): CONFIRMED

| Line | Claim | Source |
|---|---|---|
| L129, L141 | `tokens.css` is DesignerPunk's base | V `package.json` exports `./tokens.css` → `./dist/DesignTokens.web.css` |
| L130, L142 | `component-tokens.css` | V `package.json` exports `./component-tokens.css` → `./dist/ComponentTokens.web.css` |
| L147 | `light-dark()` | V `dist/DesignTokens.web.css` contains 11 `light-dark(` |
| L148 | The `wcag` block is always emitted on web, so it is "generated into yours" | V `src/generators/TokenFileGenerator.ts:974-977` (unconditional in the web branch); built-in wcag is registered at `src/generators/generateTokenFiles.ts:141-145` regardless of config |
| L154 | No custom block | V; `generateThemeOverrideBlocks` (`src/generators/TokenFileGenerator.ts:1028`) has no non-test caller |
| L156 | Pointer to Available Imports | V; the token rows are at L496–497 |

### `docs/consumer/INSTALL.md`, token claims: CONFIRMED

INSTALL.md is derived text: L63, L65, L75, L78–95 and L114–140 match the region lines above word for word. Its prerequisites row at L17 (Node.js 18+) is not mine. Thurgood or Sparky own it.

### Already applied elsewhere and confirmed in passing

- The `@3fn/core/types` and `@3fn/core/build` rows (L496–497) are my text. V `src/cli/shared/transforms.ts:55,60`; `src/build/tokens/index.ts:38`.
- The OKLCH sections, the "M0a" label and the `SemanticOverrideMap` import are all gone (grep, V).

## Held item 1: Product Tokens "Generation" (L582–585)

The tree still carries the false `dist/product/…` lines.

**Final text**:

```markdown
**Generation** — `npx designerpunk generate` produces, in a `product/` folder inside your configured `output` directory:
- `ProductTokens.web.css` (CSS custom properties)
- `ProductTokens.ios.swift` (Swift constants)
- `ProductTokens.android.kt` (Kotlin objects)

The Swift and Kotlin files are reference output, not a build input, while native onboarding is unsupported (§ Platforms): they reference your native `DesignTokens` output and, for a theme-varying `ref`, a theme type `generate` does not emit.
```

**Reason**:
- The first four lines are Leonardo's wording. It carries the same facts as mine (`<output>/product/` and the three file names), so I take his.
- The last line answers his own "→ Ada" question. I say yes because a reader holding a `.ios.swift` file will reasonably try to build it.

**What I would not give up**: the native note. It corrects an implied claim that these files are usable. It is not polish. If Leonardo considers it polish, it goes to Peter. I would sign without it only on Peter's ruling.

| Claim | Source |
|---|---|
| `<output>/product/` | V `src/cli/generateProductTokens.ts:27` |
| The three file names | V `src/cli/generateProductTokens.ts:56-58` |
| A static `ref` emits `DesignTokens.<path>` | V `src/build/product/emitters/SwiftEmitter.ts:63-67` |
| A theme-varying `ref` emits `public extension <Name>Theme` | V `src/build/product/emitters/SwiftEmitter.ts:11,49-56` |
| Kotlin does the same through `Local<Abbr>Theme` | V `src/build/product/emitters/KotlinEmitter.ts:11` |
| The theme type is never emitted | V; theme generator unwired (`src/generators/TokenFileGenerator.ts:1028`), and `dist/DesignTokens.ios.swift` contains 0 `ThemeKey` |
| Native unsupported | Region L158–179 |

U: whether a static-only `ProductTokens.ios.swift` would compile. Hard colour values emit `UIColor(hex:)` (`src/build/product/emitters/SwiftEmitter.ts:77`), which UIKit does not provide, but nothing has been built.

## Held item 2: Governance Gradient "Product extending" row (L790)

**Final text**:

```markdown
| **Product extending** | Product tokens (`product/tokens/`), one-off components, product templates | Schema compliance, naming conventions, accessibility contracts for new behavior | Ada/Lina consulted, Stacy audits at synthesis |
```

**Reason**: this is mine. Row 1 now reads "Your tokens (all of them, including what `init` copied)", so leaving "Product-created tokens" in row 2 puts any token a product adds to `src/tokens/` in two tiers with two review depths. The `product/tokens/` tier is the distinct one. Every other cell is Leonardo's "kept", and his evidence that the named agents exist still stands.

**What I would not give up**: the tokens cell. Without it, row 1 and row 2 contradict each other.

| Claim | Source |
|---|---|
| Tokens are the consumer's after `init` | V `src/cli/init.ts:193-202`; region L89 |
| The `product/tokens/` tier | Guide L551–553; V `src/cli/generateProductTokens.ts:27` (reads `config.productTokens`); `src/config/defineConfig.ts:62` |
| The named agents exist | Leonardo's ledger; V `canonical/_consumer-output/_canonical/agents/` |

## Unverified

- Whether a static-only `ProductTokens.ios.swift` compiles (see Held item 1).
- The exit code of `generate` after an override-validation abort. This is a code issue for me to file and does not affect the guide text.
- INSTALL.md L17 (Node 18+) is not mine and I did not check it.
