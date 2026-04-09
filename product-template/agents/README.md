# Product Agent Configuration Template

**Purpose**: Pre-configured agent prompts for products consuming `@designerpunk/core`
**Usage**: Copy this `product-template/agents/` directory to your product repo's `.kiro/agents/`, then customize the fields marked with `[CUSTOMIZE]`.

---

## Setup

1. Copy this directory to your product repo:
   ```bash
   cp -r node_modules/@designerpunk/core/product-template/agents/ .kiro/agents/
   ```

2. Customize each prompt file — search for `[CUSTOMIZE]` and replace with your product's values:
   - Product name and description
   - Domain-specific knowledge
   - Product-specific MCP data paths (if any)

3. Start MCP servers:
   ```bash
   npx designerpunk mcp:app    # Application MCP — component queries
   npx designerpunk mcp:docs   # Docs MCP — steering doc queries
   ```

4. Configure your Kiro agent connections to point at the running MCP servers.

---

## What's Customizable vs What's Fixed

**Fixed** (don't change — these are the ecosystem's governance layer):
- Agent domain boundaries and responsibilities
- Collaboration protocols (counter-arguments, candid communication)
- Token governance rules
- Component development standards
- MCP query patterns

**Customizable** (adapt for your product):
- Product name and description in each prompt
- Domain-specific knowledge (your product's data models, user flows)
- Additional MCP data directories (if your product adds experience patterns or layout templates)
- Knowledge base paths (what to index from your product repo)

---

## Agent Roster

| Agent | Domain | Prompt File |
|-------|--------|-------------|
| Ada | Token system | `ada-prompt.md` |
| Lina | Component system | `lina-prompt.md` |
| Thurgood | Test governance & spec standards | `thurgood-prompt.md` |
| Leonardo | Product architecture | `leonardo-prompt.md` |
| Sparky | Web platform | `sparky-prompt.md` |
| Kenya | iOS platform | `kenya-prompt.md` |
| Data | Android platform | `data-prompt.md` |
| Stacy | Product governance & QA | `stacy-prompt.md` |

Not every product needs all 8 agents. A web-only product can start with Ada, Lina, Leonardo, Sparky, and Stacy. Add Kenya and Data when iOS/Android work begins.

---

## MCP-Only Approach

These templates use MCP queries for all design system knowledge. Agents do NOT use `fs_read` to access package internals. This is intentional:

- MCP queries are stable across package versions (the query interface doesn't change when file paths do)
- MCP servers resolve internal paths automatically
- Products don't need to know the package's internal file structure
- Governance docs, token data, and component metadata are all served through MCP

If an agent needs information that isn't available via MCP, that's a gap to report — not a reason to add `fs_read` fallbacks.
