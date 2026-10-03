# Task 19.4 — Leonardo's owner review of the assembled text (read-only)

I read `governance/DesignerPunk-Integration-Guide.md` from the uncommitted working tree on `task/123-u3-onboarding`. To check the assembly, I diffed the assembled "Specifying screens (Product MCP)" span (L503–781) against the pre-sweep text at `dc80b1fae` (L766–1056).

## Verdicts

| Section | Verdict |
|---|---|
| Scope sentence, L23 | **CONFIRMED** |
| Specifying screens (Product MCP), L503–781 | **CONFIRMED**, except the held Generation lines L582–585 (final text below) |
| MCP Query Reference › Product MCP, L872–889 | **CONFIRMED-WITH-CORRECTIONS** (one line) |
| Governance Gradient, product rows L790–791 | **CONFIRMED** with Ada's L790 (below); L791 unchanged |
| Sub-heading retitles (`Themes`; "The files `init` and `attach` write") | **No objection** |

### Scope sentence, L23

The text is unchanged from the ratified scope sentence (#268), and it agrees with § Platforms. I see no conflict with my sections. The UI-tree `ios`/`android` branches are spec authoring, not native onboarding.

### Specifying screens (Product MCP), L503–781

The diff shows only the following changes:
- **Heading levels** went down one level under `## Reference`. Retitle to `### Specifying screens (Product MCP)` as proposed.
- **Starting the Product MCP** (L505–516) is my text, verbatim.
- **`space.inset.200`** replaces `space.inset.normal` at both places (L618, L655).
- **Platform-branch rule:** the L681 comment and the L688–689 bullets are verbatim.

Everything else is byte-identical: Product Data Directory, Product Tokens apart from L582–585, the rest of Writing Screen Specs, the rest of UI Tree Convention, One-off Component Metadata, Principles, and Example Queries.

One observation, not a correction: L682 still carries its own `# Node array → traversed` comment, which repeats L681. It is accurate and harmless, so I am leaving it, because the sweep does not polish.

### MCP Query Reference › Product MCP, L872–889

Both added tools are registered:
- `get_brand_context`: `product-mcp-server/src/index.ts:48-52`, no parameters. The L877 description matches the registration.
- `get_product_tokens`: `product-mcp-server/src/index.ts:151-163`.

The `get_product_tokens` row omits one registered parameter, `promotionCandidate`. Replace L888 with:

```markdown
| `get_product_tokens({ category?, name?, platform?, promotionCandidate? })` | Product tokens, with resolved system token references |
```

## Held item 1 — Product Tokens "Generation" (L582–585): final text

I take **Ada's** text verbatim. It is a token-output fact, so it is her domain, and the facts are the same as mine (`src/cli/generateProductTokens.ts:27,56-58`; `output` default at `src/config/defineConfig.ts:47`). Replace L582–585 with:

```markdown
**Generation** — `npx designerpunk generate` writes, into `product/` under your configured `output` directory:
- `ProductTokens.web.css` (CSS custom properties)
- `ProductTokens.ios.swift` (Swift constants)
- `ProductTokens.android.kt` (Kotlin objects)
```

Nothing I would refuse to give up here. Mine differed only in phrasing.

## Held item 2 — Governance Gradient "Product extending" (L790): final text

I take **Ada's** row. I marked the row "kept" before her L789 rewrite existed. Her L789 now makes every token in a born repo "Your tokens", so the old "Product-created tokens" became ambiguous: it could include the design system's own tokens. Naming `product/tokens/` resolves that, and it is the location both readers use: `product-mcp-server/src/indexer/ProductIndexer.ts:321` and `config.productTokens` in `src/cli/generateProductTokens.ts`. Replace L790 with:

```markdown
| **Product extending** | Product tokens (`product/tokens/`), one-off components, product templates | Schema compliance, naming conventions, accessibility contracts for new behavior | Ada/Lina consulted, Stacy audits at synthesis |
```

What I would not give up: the **Review Depth** and **Who Governs** cells as they stand. That is the product framing, and Ada left both unchanged, so nothing is in conflict.

## Sub-heading retitles — no objection

- **`Creating a Theme` → `Themes`.** This is a correction, not polish: the old title promised a capability the section now says does not exist.
- **"The files `init` and `attach` write".** It is accurate to the content at L327–330.

Routing: only my charter routes to this guide, and it does so without a section, so neither rename breaks a route. I suggest recording both in 19.4's completion doc as deliberate exceptions to the top-level-only limit, with the one-line reason for each.

## Note for Ada (no text change)

Her ada.md L272 says the YAML's `category:` key is ignored. That is true of the generator (`src/build/product/ProductTokenGenerator.ts:126`). It is not true of the Product MCP: `product-mcp-server/src/indexer/ProductTokenIndexer.ts:95-97` reports an error and skips the file when `category:` does not match the filename. The example's `category: layout` in `layout.yaml` matches, so the guide is correct as written.

## Unverifieds

- **U:** whether `get_section` lookups depend on heading level. I assume they match on heading text, so the one-level demotion under `## Reference` is harmless. I did not test this against a rebuilt docs index; that belongs to 19.5's local-rebuild outline check.
- **Still owed at 19.5** (after 22.2 and 22.3): `example-home.yaml` against the convention, and its token-name inspection.
