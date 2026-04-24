# Design Document: Product MCP Intelligence Layer

**Date**: 2026-04-23
**Spec**: 097 - Product MCP Intelligence Layer
**Status**: Design Phase
**Dependencies**: Spec 081 (Product MCP — ✅ Complete), Spec 096 (Token Data Index — ✅ Complete)

---

## Overview

This spec upgrades the Product MCP from exact-name-only queries to intelligence infrastructure: discovery via `find_screens`, reverse lookups, state model extraction, gap detection, enriched experience map, queryable principles, and template cross-references.

The current implementation is a single ~280-line file (`product-mcp-server/src/index.ts`) with 7 tools and an inline indexer. Adding 5 new tools, 3 reverse indexes, gap detection, and principles parsing would roughly triple the code. The design extracts the indexer, reverse indexes, and tool handlers into separate modules while preserving the existing server shell and MCP SDK integration.

---

## Architecture

```
product-mcp-server/src/
├── index.ts                    # Server shell (MCP SDK, transport, tool dispatch)
├── indexer/
│   ├── ProductIndexer.ts       # Orchestrates indexing, owns data stores
│   ├── ReverseIndexBuilder.ts  # Builds component→screens, token→screens, domainObject→screens
│   ├── PrinciplesParser.ts     # Parses YAML frontmatter from markdown principles
│   └── GapDetector.ts          # Reads component-meta.yaml, validates UI tree references
├── query/
│   ├── ScreenQuery.ts          # find_screens filtering logic
│   └── ExperienceMapQuery.ts   # list_experience_map enrichment and filtering
├── models.ts                   # TypeScript interfaces and types
└── __tests__/
    └── fixtures/               # WrKing Class test data (extended from existing)
```

### Module Responsibilities

**`index.ts`** — Stays thin. Creates `ProductIndexer`, registers tool handlers, dispatches to query modules. Same MCP SDK pattern as today. Tool definitions (name, description, inputSchema) remain here.

**`ProductIndexer`** — Extracted from the current `indexProductData()` method. Owns all data stores (screenSpecs, domainObjects, templates, oneOffComponents, principles). Owns the UI tree walk (`walkUiTree`) which calls into `ReverseIndexBuilder` and `GapDetector` per node. Delegates to `PrinciplesParser` for principles. Exposes getters for query modules.

**`ReverseIndexBuilder`** — Pure accumulator. Receives `addComponent`/`addToken`/`addDomainObject` calls from `ProductIndexer`'s tree walk. Populates three `Map<string, ScreenRef[]>` indexes: componentToScreens, tokenToScreens, domainObjectToScreens. No tree traversal logic — just data storage.

**`GapDetector`** — Reads `component-meta.yaml` files from `COMPONENT_DIR` at index time. Builds a `Set<string>` of known component names. Receives one-off component names at construction. Exposes a single-param `check(componentName)` method called by `ProductIndexer`'s tree walk. Stores gaps per screen for attachment to `get_screen_spec` responses.

**`PrinciplesParser`** — Reads markdown files from `product/principles/`. Splits YAML frontmatter from body content. Stores structured principles with `name`, `keywords[]`, and `content`. Falls back to empty keywords with a warning if no frontmatter.

**`ScreenQuery`** — Implements `find_screens` filtering. Takes filter params, walks the experience map, applies conjunctive filters using reverse indexes. Returns matching screen summaries.

**`ExperienceMapQuery`** — Implements enriched `list_experience_map`. Attaches `referencedComponents`, `referencedDomainObjects`, `blockedReasons` to each entry. Applies optional filters.

---

## Components and Interfaces

### Data Models

```typescript
// models.ts

/** Reference to a screen in a reverse index (component/token) */
interface ScreenRef {
  screen: string;
  path: string;  // UI tree path where the reference was found
}

/** Reference to a screen in domain object reverse index (text search, no path) */
interface DomainScreenRef {
  screen: string;
}

/** Reverse indexes built during indexing */
interface ReverseIndexes {
  componentToScreens: Map<string, ScreenRef[]>;
  tokenToScreens: Map<string, ScreenRef[]>;
  domainObjectToScreens: Map<string, DomainScreenRef[]>;
}

/** Component gap found during UI tree validation */
interface ComponentGap {
  component: string;
  issue: 'not-found';
  path: string;  // UI tree path, e.g. "ui-tree.children[0].children[2]"
}

/** Parsed principle with frontmatter */
interface Principle {
  name: string;
  keywords: string[];
  content: string;
}

/** Enriched experience map entry */
interface EnrichedMapEntry {
  name: string;
  type: string;
  tags?: string[];
  status: Record<string, string>;
  blockedReasons?: Record<string, string>;
  referencedComponents: string[];
  referencedDomainObjects: string[];
}

/** find_screens filter params */
interface ScreenFilter {
  context?: string;
  status?: string;
  platform?: string;
  usesComponent?: string;
  usesDomainObject?: string;
  usesToken?: string;
}
```

### ProductIndexer Interface

```typescript
class ProductIndexer {
  constructor(productDir: string, componentDir: string);

  async index(): Promise<void>;

  // Data store getters
  getOverview(): Record<string, unknown> | null;
  getScreenSpec(name: string): Record<string, unknown> | undefined;
  getScreenSpecs(): Map<string, Record<string, unknown>>;
  getDomainObject(name: string): Record<string, unknown> | undefined;
  getTemplates(): Array<Record<string, unknown>>;
  getOneOffComponent(name: string): Record<string, unknown> | undefined;
  getPrinciples(): Principle[];
  getExperienceMap(): EnrichedMapEntry[];
  getReverseIndexes(): ReverseIndexes;
  getGaps(screenName: string): ComponentGap[];
  getHealth(): HealthStatus;
}
```

### ReverseIndexBuilder Interface

```typescript
class ReverseIndexBuilder {
  /** Add a component reference from a screen's UI tree */
  addComponent(screen: string, component: string, path: string): void;

  /** Add a token reference from a screen's UI tree */
  addToken(screen: string, token: string, path: string): void;

  /** Add a domain object reference for a screen */
  addDomainObject(screen: string, domainObject: string): void;

  /** Get built indexes */
  getIndexes(): ReverseIndexes;

  /** Reset for rebuild */
  clear(): void;
}
```

Pure accumulator — no tree traversal logic. Receives calls from `ProductIndexer.walkUiTree()`. Domain object refs have no path (text-search origin).

### GapDetector Interface

```typescript
class GapDetector {
  constructor(componentDir: string, oneOffNames: Set<string>);

  /** Load component-meta.yaml files and build catalog */
  loadCatalog(): void;

  /** Check a component name against the catalog and one-offs */
  check(componentName: string): 'ok' | 'not-found';

  /** Get catalog size for health reporting */
  getCatalogSize(): number;
}
```

One-off names provided at construction. `check()` is a single-param lookup — called per node in the tree walk, must be cheap.

### ScreenQuery Interface

```typescript
class ScreenQuery {
  constructor(
    experienceMap: EnrichedMapEntry[],
    reverseIndexes: ReverseIndexes
  );

  /** Apply filters and return matching screens */
  find(filter: ScreenFilter): EnrichedMapEntry[];
}
```

Filter logic:
- `usesComponent` / `usesToken` / `usesDomainObject`: look up reverse index, get screen name set, intersect with candidates
- `status` + `platform`: check `entry.status[platform] === status`; if no platform, check any platform matches
- `context`: case-insensitive substring match against `entry.type`, `entry.name`, and `entry.tags[]`
- All filters are conjunctive (AND). Start with all screens, narrow with each filter.

---

## Tool Definitions

### New Tools (5)

| Tool | Params | Returns | Req |
|------|--------|---------|-----|
| `find_screens` | `context?`, `status?`, `platform?`, `usesComponent?`, `usesDomainObject?`, `usesToken?` | `EnrichedMapEntry[]` | 1 |
| `get_product_component` | `name` (required) | One-off component schema + contracts | 4 |
| `get_screen_state_model` | `screen` (required) | `state-model` section as-is | 5 |
| `find_principles` | `keyword` (required) | `Principle[]` matching keyword | 8 |
| `find_templates` | `category?`, `usedBy?` | Templates with `usedBy` arrays | 7 |

### Modified Tools (2)

| Tool | Change | Req |
|------|--------|-----|
| `list_experience_map` | Add filter params (`status?`, `platform?`, `usesComponent?`, `usesDomainObject?`, `usesToken?`). Enrich entries with `referencedComponents`, `referencedDomainObjects`, `blockedReasons`. Reuses `ScreenFilter` interface — all 6 params exposed. | 6 |
| `get_screen_spec` | Attach `_componentGaps` array to response. Fix platform filtering order (filter → enrich → warn, platform-aware). | 9, 10 |

### Unchanged Tools (5)

`get_product_overview`, `get_domain_object`, `list_product_templates`, `get_product_health` (extended with gap counts), `rebuild_product_index`.

---

## Error Handling

**Missing screen**: `get_screen_spec`, `get_screen_state_model` return `{ error: "Screen 'X' not found" }`.

**Missing component**: `get_product_component` returns `{ error: "Product component 'X' not found" }`.

**Empty results**: `find_screens`, `find_principles`, `find_templates` return empty arrays, not errors.

**Malformed YAML**: Existing pattern — log warning, skip file, continue indexing. Warnings surfaced in health.

**Missing COMPONENT_DIR**: Log warning at startup, gap detection disabled (empty catalog). All components pass validation. No crash.

**Missing frontmatter on principles**: Index with empty keywords, log warning. Principle still queryable by name via `get_product_overview`.

---

## Testing Strategy

### Extend Existing Fixtures

The existing test fixtures (`src/__tests__/fixtures/test-product/`) already use WrKing Class domain with legislation-list, onboarding, dashboard, bill domain object, and legislation-card one-off. Extend them to cover Spec 097 requirements:

**Additions to existing fixtures:**
- Add `tokens:` blocks to legislation-list UI tree nodes (exercises token extraction)
- Add `tags: [civic, legislation]` to legislation-list (exercises context search)
- Add `template: card-grid` to dashboard (exercises template cross-references)
- Add YAML frontmatter to `principles/design-direction.md` (exercises principles parsing)
- Add a second domain object (Representative) referenced by a screen
- Add a component reference to a nonexistent component in one screen (exercises gap detection)

**New fixture:**
- `component-meta.yaml` mock directory with a few real component names (Button-CTA, Container-Card-Base, Nav-Header-App) and one deliberately absent name — exercises gap detection against a known catalog.

### Test Categories

**Unit tests** (per module):
- `ReverseIndexBuilder`: Given a UI tree, verify component/token/domain object indexes are populated correctly. Test nested children, empty trees, missing `tokens:` blocks.
- `GapDetector`: Given a mock component directory, verify catalog loading. Test exact matching, not-found detection, one-off exclusion.
- `PrinciplesParser`: Given markdown with/without frontmatter, verify keyword extraction and content separation.
- `ScreenQuery`: Given enriched map entries and reverse indexes, verify filter combinations (single filter, multi-filter, no filter, no matches).
- `ExperienceMapQuery`: Verify enrichment (referencedComponents, blockedReasons) and filtering.

**Integration tests** (server-level):
- Extend existing `ProductMCPIntegration.test.ts` with new tool invocations.
- Verify `find_screens({ usesComponent: "Nav-Header-App" })` returns legislation-list.
- Verify `get_screen_spec("legislation-list")` includes `_componentGaps` for the nonexistent component.
- Verify `get_screen_state_model("legislation-list")` returns state-model without UI tree.
- Verify `find_principles({ keyword: "civic" })` returns design-direction.
- Verify `list_experience_map({ status: "blocked", platform: "android" })` returns legislation-list with blockedReason.

---

## Design Decisions

### Decision 1: Module Extraction vs Single File

**Options Considered**:
1. Keep everything in `index.ts` — minimal file changes, but ~800+ lines in one file
2. Extract into modules — more files, but clear separation of concerns

**Decision**: Extract into modules.

**Rationale**: The current 280-line file works for 7 tools with an inline indexer. Adding 5 tools, 3 reverse indexes, gap detection, and principles parsing would push it past 800 lines with interleaved concerns. Separate modules make each piece independently testable and reviewable. The Application MCP already uses this pattern (indexer/, query/, models.ts).

**Trade-offs**: More files to navigate. Mitigated by clear module boundaries and consistent naming.

### Decision 2: Single UI Tree Walk in ProductIndexer

**Options Considered**:
1. Separate walks for components, tokens, and gap detection
2. Walk in `ReverseIndexBuilder` that calls `GapDetector` (original design)
3. Walk in `ProductIndexer` that calls both modules as pure accumulators

**Decision**: Walk in `ProductIndexer` (option 3).

**Rationale**: The UI tree is the same data structure for all three concerns. Walking it once and calling `reverseIndexBuilder.addComponent()`, `reverseIndexBuilder.addToken()`, and `gapDetector.check()` per node is efficient and keeps both modules decoupled. Neither module knows about the other. The orchestrator owns the traversal; the modules own their data. (Per Lina R1, agreed by Leo R1.)

**Trade-offs**: `ProductIndexer` is a fatter orchestrator with a `walkUiTree` method. If the walk logic grows complex, it can be extracted to a `UiTreeWalker` module. For M0a's straightforward `children`/`component`/`tokens` structure, a private method is sufficient.

### Decision 3: `context` Filter as Substring Match

**Options Considered**:
1. Exact match against `type` field only
2. Substring match across `type`, `name`, and `tags`
3. Regex or fuzzy matching

**Decision**: Case-insensitive substring match across `type`, `name`, and `tags`.

**Rationale**: Agents don't always know the exact type label. Searching "legislation" should find a screen named "legislation-list" with type "vertical". Substring matching is simple, predictable, and covers the common cases. Tags provide an explicit opt-in for domain categorization when authors want it.

**Trade-offs**: Substring matching can produce false positives (searching "list" matches "legislation-list" and any other screen with "list" in the name). Acceptable for M0a — the result set is small enough that false positives are easily filtered by the agent.

### Decision 4: Gap Detection at Index Time Only

**Options Considered**:
1. Validate at index time, store gaps, attach to responses
2. Validate at query time (on each `get_screen_spec` call)
3. Validate at both times

**Decision**: Index time only.

**Rationale**: The component catalog (`component-meta.yaml` files) doesn't change between index and query. Validating once during indexing and storing the results avoids redundant file reads on every query. `rebuild_product_index` re-validates everything.

**Trade-offs**: If `component-meta.yaml` files change after indexing (new component added), gaps won't update until rebuild. Acceptable — the same limitation exists for all indexed data.
