# Spec Feedback: CLI Init Design

**Spec**: 097-product-mcp-intelligence-layer
**Document**: cli-init-design.md
**Created**: 2026-04-27

---

## Ada R1 — Token System Alignment Review (2026-04-27)

**Disposition**: Design is sound for the "starter kit" model. One actionable gap, four observations.

---

### Actionable: Theme Registration Gap in Generated Config

The generated `designerpunk.config.ts` doesn't include a `themes` array:

```typescript
export default defineConfig({
  name: '{name}',
  abbreviation: '{abbreviation}',
  tokenSourceRoot: './src/tokens',
  componentTokens: ['./src/components'],
  output: './dist/tokens'
});
```

But the scaffolded tree includes `src/tokens/themes/dark/` and `src/tokens/themes/wcag/`. If these aren't registered in the config, `npx designerpunk generate` won't produce theme-aware output. The pipeline only generates for registered themes — no auto-discovery (that's a Spec 094 design decision).

**Recommendation**: Generated config should pre-register the base themes:

```typescript
import { darkOverrides } from './src/tokens/themes/dark/SemanticOverrides';
import { wcagOverrides } from './src/tokens/themes/wcag/SemanticOverrides';

export default defineConfig({
  name: '{name}',
  abbreviation: '{abbreviation}',
  tokenSourceRoot: './src/tokens',
  componentTokens: ['./src/components'],
  themes: [
    { name: 'dark', mode: 'dark', overrides: darkOverrides },
    { name: 'wcag', mode: 'light', overrides: wcagOverrides },
  ],
  output: './dist/tokens'
});
```

Otherwise the "Next steps" output should explicitly mention theme registration as a required step for dark mode support.

---

### Observation 1: Mathematical Governance Becomes Advisory

Copying 217 primitives and saying "editable" hands product developers the ability to break mathematical relationships (modular scale, baseline grid, derived values). Changing `space100` from 8 to 10 cascades through every semantic token that references it.

This is an acceptable tradeoff for the independence model — "you own it, you break it." But worth being explicit in the generated README or steering docs that mathematical integrity is the product team's responsibility post-init. The validation pipeline (`ThreeTierValidator`) would still catch violations at generate time, which provides a safety net.

**Not a blocker.** Just noting the governance shift.

---

### Observation 2: Steering Docs Drift After Init

Copied steering docs serve the local Docs MCP. The moment DesignerPunk updates a Token-Family doc or governance rule, the product copy is stale. Product agents get outdated guidance unless someone manually syncs.

**Counter-argument**: This is the same tradeoff as any fork. Consistent with the independence model. A future `npx designerpunk sync:docs` command could address this without breaking the ownership model.

**Not a blocker.** Worth noting as a known limitation.

---

### Observation 3: `@designerpunk/core` Packaging Concern

The package needs to export token source files in a discoverable location for `init` to copy from. Ensure the published package's `files` field (or `exports` map) includes the raw TypeScript token sources, not just compiled output. The `resolvePackageRoot()` pattern works, but only if the source files are actually in the installed package.

---

### Observation 4: Spec Placement

This design is in the 097 folder (Product MCP Intelligence Layer), but it's a CLI/packaging concern orthogonal to the intelligence layer work. Different dependencies (file scaffolding, packaging) than the MCP work (indexing, reverse lookups). Consider whether this warrants its own spec number for cleaner tracking — or keep it here if it's considered part of the "product infrastructure" umbrella.

**Not a blocker.** Organizational question.

---

### Summary

| Item | Type | Severity |
|------|------|----------|
| Theme registration in generated config | Gap | Medium — product won't get dark mode without manual config |
| Mathematical governance shift | Observation | Low — acceptable tradeoff, document it |
| Steering docs drift | Observation | Low — known limitation, future sync command |
| Package `files` field | Observation | Low — implementation detail |
| Spec placement | Observation | Low — organizational |

---

### Thurgood R1 — Implementation Review (2026-04-27)

**Disposition**: Implementation matches design outline. Ready to use. One minor observation.

#### Verified Against Design Outline

- ✅ Separate `init.ts` module, imported into main CLI
- ✅ `case 'init':` in switch, passes `argv.slice(3)`
- ✅ Interactive prompts via readline when flags omitted
- ✅ `--name`, `--abbreviation`, `--skip-components`, `--skip-agents` parsed correctly
- ✅ `.npmrc` created with scoped registry
- ✅ `designerpunk.config.ts` pre-registers dark + wcag themes (Ada R1 feedback incorporated)
- ✅ Token source copied with `__tests__` excluded
- ✅ Components copied with `__tests__` excluded (skippable)
- ✅ `product/overview.yaml` created
- ✅ Agent templates copied (skippable)
- ✅ Steering docs copied
- ✅ Never overwrites existing files — logs "skipped"
- ✅ Mathematical governance note in output
- ✅ Help text updated with `init` and all options

#### Observation: `product/overview.yaml` Format

The generated `overview.yaml` uses markdown-style prose (`# heading`, `## section`, unstructured text) rather than proper YAML structure. The Product MCP's `indexProductData()` runs `yaml.load()` on this file and expects a parsed object with fields like `name`, `description`, `platforms`.

Current output:
```
# MarketingSite — Product Overview
## Product Context
name: MarketingSite
...
```

`yaml.load()` would parse this as a single string (the `#` lines are YAML comments, the rest is ambiguous). Not a blocker — the Product MCP handles malformed YAML gracefully (logs warning, continues). But for the Product MCP to actually serve the overview, the file should be valid YAML:

```yaml
name: MarketingSite
description: "[CUSTOMIZE] Describe your product"
platforms: [web]
```

**Severity**: Low. The Product MCP starts with empty data if it can't parse the overview — no crash. Worth a quick fix in a follow-up but doesn't block usage.

#### Summary

Implementation is clean, matches the design, and is ready for the marketing site bootstrap. No blockers.
