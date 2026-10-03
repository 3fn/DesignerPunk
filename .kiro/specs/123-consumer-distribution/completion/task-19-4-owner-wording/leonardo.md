# Task 19.4 — Leonardo's owner wording (reference sweep)

Read against the guide at `task/123-u3-onboarding` HEAD `dc80b1fae`. My sections are unchanged since `8fb103ce`; the only diff in the guide touches lines 76–179. Line numbers below are the guide's lines at HEAD. Every source citation is `file:line` on this branch, and I opened each one. Nothing here is unverified unless marked **U**.

## Top-level retitle (the only one I propose)

- `## Product MCP Setup` → **`## Specifying screens (Product MCP)`**
  - "Product MCP" stays in the title so that agents' heading lookups still match.
  - I propose no sub-heading retitles.

## Per section

### Starting the Product MCP (L768–791) — **corrected**

There are three errors:
- The config-path resolution step does not exist. `DesignerPunkConfig` has no product-path field (`src/config/defineConfig.ts:37-63`).
- The `COMPONENT_DIR` advice is obsolete. The package's components are always in the union (`src/cli/shared/mcpDataRoots.ts:202`).
- The claim "gap detection disabled if COMPONENT_DIR missing" is false for the same reason.

Replace L768–791 (the heading through "No crash.") with:

```markdown
### Starting the Product MCP

Your agent tool starts the Product MCP from the MCP configuration that `init` writes (or `attach` without `--reference`); you do not start it yourself. `attach --reference` never configures it. `npx designerpunk mcp:product` also starts it by hand.

Resolves product data from:
1. `PRODUCT_DIR` env var (if set) — the generated configuration sets it to `./product`
2. `product/` at your design system's root
3. `./product/` relative to cwd (a repo with no design system)

Starts with an empty index if no product directory exists.

**Component gap detection** reads `component-meta.yaml` files to check the component references in your screen specs. It checks against DesignerPunk's own components (their metadata ships in the package) together with your own components in `src/components/` (or `COMPONENT_DIR`, if set). No configuration is needed.
```

Ledger:
- Harness-started from the generated config: `src/cli/templates/mcp-config.json.template:28-35` (the `designerpunk-product` entry, with `PRODUCT_DIR` `./product` and `COMPONENT_DIR` `./src/components`).
- `--reference` never configures it: `src/cli/attach.ts:344-353`.
- `mcp:product` verb: `src/cli/designerpunk.ts:69`.
- Product root order (env, then birth root's `product/`, then cwd's `product/`): `src/cli/shared/mcpDataRoots.ts:282-297`, called at `product-mcp-server/src/index.ts:617-621`.
- Empty index is expected: `product-mcp-server/src/index.ts:614-616`.
- I dropped "(warning, not error)". I found no warning emitted for a missing directory (`product-mcp-server/src/indexer/ProductIndexer.ts:180,203`), so the parenthetical was an unbacked claim.
- Component union: `src/cli/shared/mcpDataRoots.ts:183-205` (the env value or the birth root's `src/components`, plus the package's `src/components/core`, always).
- Union passed whole to GapDetector: `product-mcp-server/src/index.ts:623-633,667`.
- Gap detection reads `component-meta.yaml`: `product-mcp-server/src/indexer/GapDetector.ts:27,59,105-109`.

### Product Data Directory (L793–824) — **kept**

The directory layout matches the indexer: `ProductIndexer.ts:225` (`overview.yaml`), `:232` (`principles/`), `:250-255` (`experience-map/{verticals,flows,pages}`, where `pages` maps to type `feature-page`), `:269` (`templates/`), `:278` (`domain-objects/`), `:303-317` (`components/<name>/*.schema.yaml` plus an optional `*.contracts.yaml`), and `:321` (`tokens/`).

### Product Tokens (L826–866) — **corrected** (co-owned with Ada)

The output path is `<output>/product/`, not a literal `dist/product/`. It follows the config's `output` field.

Replace L857–860 with:

```markdown
**Generation** — `npx designerpunk generate` produces, in a `product/` folder inside your configured `output` directory:
- `ProductTokens.web.css` (CSS custom properties)
- `ProductTokens.ios.swift` (Swift constants)
- `ProductTokens.android.kt` (Kotlin objects)
```

Ledger:
- Output path: `src/cli/generateProductTokens.ts:27,56-58`; `output` default `'dist'` at `src/config/defineConfig.ts:47`.
- Only when `productTokens` is set: `src/cli/designerpunk.ts:287`; config field at `src/config/defineConfig.ts:62`.
- `validate --product-tokens`: `src/cli/designerpunk.ts:94`.
- YAML fields in the example:
  - `description` required: `product-mcp-server/src/indexer/ProductTokenIndexer.ts:129`.
  - Hard value needs `unitType` and `rationale`: same file `:151-155`.
  - `ref` resolved against `token-index`: same file `:181-188`.
  - `platforms` defaults to all: same file `:160`.
  - The category file name must match `category:`: same file `:76-96`.
- `get_product_tokens` tool: `product-mcp-server/src/index.ts:151`.
- Governance doc exists: `governance/Product-Token-Governance.md:2` (id `product-token-governance`).

**→ Ada:** `generate` emits the Swift and Kotlin product-token files while native onboarding is unsupported. Your call whether that needs a one-line "reference, not a build input (Spec 129)" note. I did not add one.

### Writing Screen Specs (L868–913) — **corrected**

`space.inset.normal` is not a token. The inset scale is `none/050/075/100/150/200/300/400`. The indexer stores names as written without validation, so the example teaches a name that resolves to nothing.

Replace at L893: `        padding: space.inset.normal` → `        padding: space.inset.200`

Ledger:
- Inset scale: `src/tokens/semantic/SpacingTokens.ts:176,259`. Application MCP `search_tokens({name:"inset", tier:"semantic"})` returns no `normal`.
- Stored as written: `ProductIndexer.ts:355-361`.
- The other names in the example exist:
  - `Nav-Header-App` and `Container-Base` under `src/components/core/`.
  - `color.structure.surface`: `src/tokens/semantic/ColorTokens.ts:509`.
  - `color.contrast.onLight`: Application MCP `get_token_details` resolves it.
- `type: feature-page`: `ProductIndexer.ts:255`.
- `_componentGaps` with issue `not-found` and the path: `ProductIndexer.ts:345-351`, `product-mcp-server/src/index.ts:284-287`.
- Only `tokens:` blocks are indexed: `ProductIndexer.ts:354-362`.

### UI Tree Convention (Draft) (L915–997) — **corrected**

The platform-branch claims are wrong. The indexer walks every array-valued platform branch into the reverse indexes regardless of any filter (`ProductIndexer.ts:368-376`).

Replacements:
- L930: `    padding: space.inset.normal` → `    padding: space.inset.200` (same reason as above).
- L956: `  ios:                            # Traversed only when platform=ios requested` → `  ios:                            # Node array → traversed for reverse indexes`
- L963–964: replace both bullets with:

```markdown
- A platform branch (`ios`, `android`, `web`) whose value is a node array is also traversed, so its components and tokens appear in `find_screens` results whether or not you filter by platform. A branch whose value is an object (metadata) is stored but not walked.
- `get_screen_spec({ name, platform })` returns `shared` merged with that platform's branch.
```

Ledger:
- Traversal rules: `ProductIndexer.ts:332-379` (walks `children` only, ignores `props` and `repeat`, records `tokens` string values).
- Platform merge: `product-mcp-server/src/index.ts:278-279,295-316`.
- Multi-file facets are merged into the primary file: `ProductIndexer.ts:433-445`.

### One-off Component Metadata (L999–1007) — **kept**

This is authoring convention, not a validated claim. The directory and file shape match `ProductIndexer.ts:303-317`.

### Principles with YAML Frontmatter (L1009–1022) — **kept**

`keywords` are parsed from the frontmatter, and a file without frontmatter is indexed with empty keywords: `product-mcp-server/src/indexer/PrinciplesParser.ts:16-17,35,40-41`. `find_principles`: `product-mcp-server/src/index.ts:115-123`.

### Product MCP Example Queries (L1024–1056) — **kept**

Every tool named exists: `product-mcp-server/src/index.ts:42-165`. The screen names are illustrative.

### Verify (§5, product side) — **kept**

There is no product-side query in §5, and adding one would be polish. Lina owns the counts.

### Governance Gradient — product rows ("Product extending", "Product internal") — **kept**

The named agents exist in a consumer's generated layer: all eight are in `canonical/_consumer-output/_canonical/agents/` (ada, data, kenya, leonardo, lina, sparky, stacy, thurgood). The consumer profile targets are `canonical/consumer-profile.yaml:8-9`. Stacy's "synthesis" refers to a mode in her consumer prompt (`canonical/_consumer-output/_canonical/agents/stacy.md:416`).

**→ Ada:** the "Ecosystem" row and the "Promotion path" paragraph assume DesignerPunk's ecosystem. In BECOME, the promotion target is the consumer's own system. That is inside your 19.4 rename. The posture-B re-scope is parked in the rewrite charter (#299).

## Round-1 unverifieds — resolved

- **Does `node_modules/@3fn/core/src/components/core` ship?** Partly.
  - What ships: each component's `*.schema.yaml`, `contracts.yaml` and `component-meta.yaml` (`package.json:57`), plus the iOS and Android sources (`package.json:77-82`).
  - What does not ship: the web and TS source. `pack-assert` asserts `src/components/core/Avatar-Base/index.ts` and `.../platforms/web/Avatar.web.ts` absent (`scripts/pack-assert.ts:139-148`), and asserts the metadata files present with equal counts (`scripts/pack-assert.ts:129-133`).
  - So gap detection's package root is real. The old `COMPONENT_DIR=…/src/components/core` advice was redundant, not broken.
- **Do the named agents exist in a consumer's generated layer?** Yes: all eight, listed above.

## 19.5 / `example-home.yaml`

**Can confirm now:** the § Writing Screen Specs and § UI Tree Convention text above matches the indexer source.

**Cannot confirm now** (`.kiro/specs/123-consumer-distribution/design-inputs/` does not exist on this branch):
- that my `example-home.yaml` conforms to the convention;
- its token names (the 22.3 inspection table);
- that the scaffolded `product/` indexes clean.

All three stay at 19.5, after 22.3. The current scaffold writes only `product/overview.yaml` (`src/cli/init.ts:230-237`), which Task 22 replaces.

## Flags to other owners

- **Ada:** native product-token files, above; "Ecosystem" row and promotion path, above.
- **Lina:** CLI Commands lists `mcp:product` as a user command. My replacement text says the harness starts it and the verb starts it by hand; please make your CLI table agree.
- **Thurgood:** § MCP Query Reference › Product MCP is missing two tools that exist, `get_brand_context` (`product-mcp-server/src/index.ts:48`) and `get_product_tokens` (`:151`). Add them as a correction, or leave the table to the rewrite. Not one of my listed sections, so not authored here.
- **Sparky, Kenya, Data:** none. UI-tree `ios`/`android` branches stay valid for spec authoring while native onboarding is unsupported, because a screen spec is platform-neutral.
