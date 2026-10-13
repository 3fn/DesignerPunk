# 22.3 — Leonardo's share: `example-home.yaml` and its companions (record)

**Date**: 2026-10-03 · **Author**: Leonardo · **Subtask**: 22.3, content only. Placement, the equality tests, the `init` mechanics (including the product-name substitution) and the validity guard are Lina's. **22.3 is NOT ticked.**

## Files and where they go

The scaffold source is `src/cli/templates/product/**` (design.md § "C27" erratum).

| Authored here (`design-inputs/`) | Scaffolded into the born repo as | `git hash-object` |
|---|---|---|
| `example-home.yaml` | `product/experience-map/pages/example-home.yaml` | `df3366d1fe284f9848e64d6a4570fbd8c0becd51` |
| `home-layout.yaml` | `product/templates/home-layout.yaml` | `b0af4ef837beae71cb461cfdf39bc423a8f5bb3f` |
| `overview.yaml` | `product/overview.yaml`, after `init` substitutes the placeholder | `3b513185243a46860a916e4f6e2beee99447f13d` |

- **The one placeholder**: `__PRODUCT_NAME__`, once, in `overview.yaml`, quoted so the unsubstituted file still parses. It appears 0 times in the other two files.
- **What the screen references**: one template (`home-layout`), with no domain object, no one-off component and no product token. This holds my R2 position: `token-index/` does not exist before `generate`.
- **Domain objects**: none in the scaffold. `extractDomainRefs` matches screens against domain-object names (`product-mcp-server/src/indexer/ProductIndexer.ts:455-462`), so no stray reference can form.

## Thurgood's change (b): the overview carries the fields the note template points to

`overview.yaml` › `platforms` carries `shipsFirst`, `minimumVersions` (web, ios, android), `browsers`, `devices` and `assistiveTechnology`. These are exactly the fields the template's pointer line names (`design-inputs/personal-note.template.md`, the "Facts about the product itself…" line).

- `shipsFirst: [web]` matches the release scope sentence ("ready for building web products").
- The rest are `TODO`.
- The overview is served as-is (`ProductIndexer.ts:224-228`; `get_product_overview` at `product-mcp-server/src/index.ts:42`).
- The only overview fields any server code reads are `brand` and `register` (`ProductIndexer.ts:123-128`). So the `platforms` map is free-form data and is not validated. It is DESIGN-ONLY as a convention.
- `brand` is deliberately absent. `get_brand_context` then returns its own "not configured" message, which tells the person what to add (`ProductIndexer.ts:126`).

## Inspection: every component and token name, checked (criterion C13, instruments row 5.8)

| Name | Kind | How I checked | Result |
|---|---|---|---|
| `Nav-Header-App` | component | `src/components/core/Nav-Header-App/component-meta.yaml` exists (GapDetector's catalog key is the directory name, `product-mcp-server/src/indexer/GapDetector.ts:97-98,116`); Application MCP `get_component_full` | exists; readiness `scaffold` on all three platforms; renders no heading (`accessibility_no_heading`), so the screen's heading is the section's |
| `Container-Base` | component | `component-meta.yaml` exists; props checked in `Container-Base.schema.yaml`: `padding` L48, `background` L176, `semantic` L249–250 (`main` and `section` are allowed values), `accessibilityLabel` L259 | exists |
| `Button-CTA` | component | `component-meta.yaml` exists; props checked in `Button-CTA.schema.yaml`: `label` L50 (required), `variant` L67 (`primary` allowed) | exists |
| `color.structure.canvas` | semantic token | Application MCP `get_token_details` | exists; semantic; `themeVarying: true` (dark: `gray400`); a consumer of Container-Base |
| `space.inset.200` | semantic token | Application MCP `get_token_details`; inset scale `src/tokens/semantic/SpacingTokens.ts:176,259` | exists; resolves to 16; a consumer of Container-Base |
| `home-layout` | product template | `design-inputs/home-layout.yaml` › `name: home-layout` | exists in the scaffold |

**Assembly**: Application MCP `validate_assembly`.
- The main subtree (`Container-Base` main › `Container-Base` section › `Container-Base`, `Button-CTA`): `valid: true`, no errors, warnings or accessibility issues.
- `Nav-Header-App` alone: `valid: true`.
- The first draft nested the header inside `main` with no `accessibilityLabel` on `main`. `validate_assembly` caught the error `page-needs-accessible-name` (WCAG 2.4.2), so the header now sits beside `main`, and `main` carries `accessibilityLabel: Home`.

## Indexed with the real indexer (my own run; not the guard)

I ran `ProductIndexer` from source (`npx tsx`) over a scratch `product/` holding the three files, with the placeholder substituted and the component root `src/components/core`.
- **Result**: status `healthy`, `warnings: []`, zero gaps, catalog 34; screens `[example-home]`; templates `[home-layout]`, used by `[example-home]`.
- **Indexed tokens**: `color.structure.canvas` and `space.inset.200`. **Indexed components**: `Nav-Header-App`, `Container-Base`, `Button-CTA`.
- **Bite (1), my run**: renaming `Button-CTA` to `Button-CTAA` gives a gap `{component: Button-CTAA, issue: not-found}`.

**What this does NOT prove** (Lina's guard does): the run was in the steward repo, not a packed born repo after `init` and before `generate`. Bite (2), a missing referenced template, is the guard's own existence check and is not exercised here.

## The ui-tree uses one key the convention does not define (note for my 19.5 read)

- The explanation node carries its text in a `content:` key (`heading`, `body`), because the system's empty-state pattern says that text "is not a DesignerPunk component — rendered as text content" (Application MCP `get_experience_pattern "empty-state"`).
- The indexer ignores unknown keys (`ProductIndexer.ts:332-366` reads only `component`, `tokens` and `children`), so it indexes clean.
- But the guide's § "UI Tree Convention (Draft)" does not mention text content: its node table lists `component` / `props` / `tokens` / `children` / `repeat`, and its "What This Convention Does NOT Cover" list omits text content.
- **Owed at 19.5**: the guide's § "Writing Screen Specs" and § "UI Tree Convention (Draft)" must agree with this file. Either the not-covered list names text content, or the node table gains `content` as "not indexed". The guide is Thurgood's; the wording is mine to propose.
- Everything else in the file follows the guide as assembled at 19.4: `tokens:` separate from `props:`, `space.inset.200`, platform branches absent, and `template:` naming a product template.
