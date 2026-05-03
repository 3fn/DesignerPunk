# CLI Init Command — Design Outline (Revised)

**Date**: 2026-04-27
**Purpose**: `npx designerpunk init` bootstraps a self-contained product repo from DesignerPunk's architecture
**Owner**: Ada (CLI domain)
**Scope**: CLI command + file scaffolding

---

## Model

DesignerPunk is a **starter kit**, not a shared ecosystem. Each product gets its own copy of tokens, components, and infrastructure. Products evolve independently. Updates from DesignerPunk are optional, not required.

`init` creates a self-contained product repo that:
- Owns its token source (editable primitives + semantics)
- Owns its components (cloned starters + product-specific additions)
- Runs its own MCP servers (Application, Docs, Product)
- Has its own agent configurations
- Generates its own platform outputs (CSS, Swift, Kotlin)

---

## Usage

```bash
npx designerpunk init --name "WrKingClass" --abbreviation "WKC"
```

Or interactive (no flags — prompts for name/abbreviation):

```bash
npx designerpunk init
```

---

## What It Creates

```
my-product/
├── designerpunk.config.ts          # Pipeline config (name, abbreviation, output)
├── .npmrc                          # GitHub Packages auth (if not exists)
├── src/
│   ├── tokens/
│   │   ├── primitives/             # Copied from DesignerPunk — editable
│   │   │   ├── ColorTokens.ts
│   │   │   ├── SpacingTokens.ts
│   │   │   ├── TypographyTokens.ts
│   │   │   ├── RadiusTokens.ts
│   │   │   ├── ShadowTokens.ts
│   │   │   └── MotionTokens.ts
│   │   ├── semantics/              # Copied from DesignerPunk — editable
│   │   │   ├── SemanticColorTokens.ts
│   │   │   ├── SemanticSpacingTokens.ts
│   │   │   └── SemanticTypographyTokens.ts
│   │   └── themes/                 # Base themes (dark, wcag) — editable
│   │       ├── types.ts
│   │       ├── dark/
│   │       └── wcag/
│   └── components/
│       └── core/                   # Cloned starter components — editable
├── product/
│   └── overview.yaml               # Product MCP starting point
├── .kiro/
│   ├── agents/                     # Agent prompt templates (customizable)
│   └── steering/                   # Copied steering docs for Docs MCP
└── dist/                           # Generated outputs (after `generate`)
```

---

## Steps Executed

1. **Prompt for name/abbreviation** (if not provided via flags)
2. **Create `.npmrc`** (if not exists) — GitHub Packages auth
3. **Create `designerpunk.config.ts`** — product name, abbreviation, paths
4. **Copy token source** — primitives, semantics, themes from `@designerpunk/core` into `src/tokens/`
5. **Copy starter components** — core components from `@designerpunk/core` into `src/components/core/`
6. **Create `product/overview.yaml`** — Product MCP starting point
7. **Copy agent templates** — agent prompts into `.kiro/agents/` with `[CUSTOMIZE]` markers
8. **Copy steering docs** — for Docs MCP serving
9. **Print next steps**

---

## Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `--name` | string | Prompted | Product name for generated types |
| `--abbreviation` | string | Prompted | Short form for env keys |
| `--skip-components` | flag | false | Skip copying starter components (start from scratch) |
| `--skip-agents` | flag | false | Skip copying agent templates |

---

## Output

```
✓ Created .npmrc
✓ Created designerpunk.config.ts (dark + wcag themes registered)
✓ Copied token source (217 primitives, 193 semantics)
✓ Copied 34 starter components
✓ Created product/overview.yaml
✓ Copied agent templates (9 agents)
✓ Copied steering docs

Your product "{name}" is ready.

Next steps:
  1. Set GITHUB_TOKEN env var (read:packages scope)
  2. npm install                    # Install dependencies
  3. npx designerpunk generate      # Generate platform tokens
  4. npx designerpunk mcp:app       # Start component queries

To customize your visual language:
  • Edit src/tokens/primitives/ to change base values
  • Edit src/tokens/semantics/ to change design intent
  • Run `npx designerpunk generate` after changes

Note: Token values have mathematical relationships (modular scale,
baseline grid). The validator will warn if changes break these
relationships during generation.

Or ask your AI agent: "Generate tokens and start the MCP servers"
```

---

## Does NOT Do

- Does not run `npm install` (user may need GITHUB_TOKEN first)
- Does not overwrite existing files (skips with "already exists" message)
- Does not generate tokens (separate step — user may want to edit tokens first)
- Does not start MCP servers (separate step)

---

## What Gets Installed via npm

After `init`, the product repo's `package.json` needs `@designerpunk/core` as a dependency. But the dependency provides:
- The `designerpunk` CLI binary (generate, mcp:app, mcp:docs, mcp:product)
- The generator pipeline code
- The MCP server code
- `tsx` for TypeScript execution

It does NOT provide tokens or components — those were copied into the product repo by `init` and are now owned locally.

---

## Config File Generated

```typescript
import { defineConfig } from '@designerpunk/core/config';
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

---

## Relationship to DesignerPunk Source

After `init`, the product repo is independent. The relationship is:

| Aspect | Source | Owned by |
|--------|--------|----------|
| Token values | Copied at init | Product repo |
| Component implementations | Copied at init | Product repo |
| Generator pipeline | `@designerpunk/core` package | DesignerPunk |
| MCP server code | `@designerpunk/core` package | DesignerPunk |
| CLI commands | `@designerpunk/core` package | DesignerPunk |
| Agent prompts | Copied at init | Product repo |
| Steering docs | Copied at init | Product repo |

**Upgrade path** (optional): `npm update @designerpunk/core` gets pipeline/MCP/CLI improvements. Token and component updates require manual merge if desired.

---

## Integration Guide Update

Replace the current "Quick Start" approach with:

```markdown
### Quick Start

npx designerpunk init --name "MyProduct" --abbreviation "MP"
npm install
npx designerpunk generate

Your product repo is ready. Edit tokens in src/tokens/, generate, and build.
```

---

## Implementation Notes

- Add `case 'init':` to switch in `src/cli/designerpunk.ts`
- Use `fs.cpSync` (Node 16+) for recursive directory copies
- Resolve source paths from package root (same `resolvePackageRoot()` pattern)
- Parse `--name` and `--abbreviation` from argv, or prompt via readline if missing
- Skip files that already exist (log "skipped: already exists")
- No new dependencies needed
