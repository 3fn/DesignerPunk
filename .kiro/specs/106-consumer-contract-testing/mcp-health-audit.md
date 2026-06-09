# MCP Server Health Audit

**Date**: 2026-06-09
**Auditor**: Thurgood (MCP audit session)
**Scope**: All three DesignerPunk MCP servers — health checks, degradation detection, recovery, and gaps

---

## Executive Summary

All three MCP servers implement health endpoints, but the quality and depth of health monitoring varies significantly:

| Server | Health Depth | Staleness Detection | Auto-Recovery | Consumer Parity |
|--------|-------------|-------------------|--------------|-----------------|
| Docs MCP | **Comprehensive** | ✅ File mtime comparison | ✅ FileWatcher auto-reindex | ⚠️ Path-dependent |
| Application MCP | **Moderate** | ❌ None | ✅ FileWatcher auto-reindex | ⚠️ Path-dependent |
| Product MCP | **Minimal** | ❌ None | ❌ No file watcher | ⚠️ Path-dependent |

**Critical Gaps Across All Servers:**
- No query correctness validation (can't detect wrong results)
- No cross-reference integrity checking at query time
- No consumer-context health testing (behavior when run via `npx designerpunk mcp:*`)
- No tool availability self-testing
- No proactive alerting mechanism — health is only reported when asked

---

## Server 1: Docs MCP (`mcp-server/src/`)

### A. Health Check Implementation

**Entry point**: `mcp-server/src/index.ts` (line 60–63) — `DocumentIndexer` initialized with logs directory

**Health endpoint**: `get_index_health` tool (exposed in `mcp-server/src/tools/get-index-health.ts`)

**What it measures** (from `mcp-server/src/indexer/index-health.ts`, `determineIndexHealth()` at line 35):

1. **Missing documents** (line 46–49): Scans filesystem for `.md` files in the watched directory and compares against the index. Any file on disk but not in index = error.
2. **Stale index** (line 51–55): Compares file `mtime` against `lastIndexTime` with 1-second tolerance (line 101–103). Files modified after index time = warning.
3. **Malformed metadata** (line 57–60): Checks for required fields (`purpose`, `layer`) and valid layer values (0–3). Missing/invalid = warning.
4. **Metrics** (line 141–163): Counts documents, sections (heading structure), cross-references, and index size in bytes.

**Status definitions** (line 63–72):
- `healthy`: Zero errors AND zero warnings
- `degraded`: Zero errors but warnings exist (stale files, malformed metadata)
- `failed`: Any errors present (missing documents, uninitialized index)

**Additional health tool**: `get_health_status` (in `mcp-server/src/tools/get-health-status.ts`) adds:
- Server uptime in seconds (line 67)
- Memory usage (heapUsed, heapTotal, external, rss) (line 69–74)
- Server start time ISO string

**Staleness detection**: ✅ YES — `getStaleFiles()` (line 95–114) compares `fs.statSync(file).mtime` against `lastIndexTime + 1 second tolerance`. This is a true filesystem-to-index freshness check.

**Last indexed timestamp**: ✅ YES — `lastIndexTime` stored as ISO string in `DocumentIndexer` (line 15), updated on every `indexDirectory()` and `reindexFile()` call.

### B. Degradation Detection

| Detection Type | Supported | Mechanism |
|---------------|-----------|-----------|
| Content drift (files changed, index stale) | ✅ | mtime comparison in `getStaleFiles()` |
| Missing content (file deleted, still in index) | ⚠️ Partial | `reindexFile()` removes deleted files when FileWatcher fires, but health check only detects files NOT in index, not phantom entries |
| Corrupt state (malformed index data) | ⚠️ Partial | Checks metadata fields but doesn't validate section structure integrity |
| Files added but not indexed | ✅ | Missing document check compares filesystem scan against index |

**Gap between event and detection**: Health is only evaluated **on demand** (when `get_index_health` is called). Between calls, the server may serve stale content without reporting it. The FileWatcher partially mitigates this by triggering re-indexing on filesystem events.

**Phantom entry detection (file deleted but still in index)**: The health check does NOT detect this. It only checks for "files on disk not in index" (missing docs), not "entries in index with no file on disk." The FileWatcher handles deletion (line 73–76 of `DocumentIndexer.ts` `reindexFile()` removes deleted file from index), but if the watcher misses an event (common with `fs.watch()`), phantom entries persist silently.

### C. Recovery Mechanisms

**Rebuild mechanism** (`DocumentIndexer.rebuildIndex()`, line 232–275):
- Full rebuild: clears all maps, re-scans directory, re-indexes every file
- NOT incremental — always complete re-scan
- Error handling: catches exceptions, returns `failed` status with error message
- Preserves partial state on failure (existing `documentMap.size` in error response)

**Agent trigger**: ✅ Agents can call `rebuild_index` tool autonomously — it's in the `autoApprove` list in `.kiro/settings/mcp.json` (line 21).

**FileWatcher** (`mcp-server/src/watcher/FileWatcher.ts`):
- Uses `fs.watch()` with `{ recursive: true }` (line 60)
- Only watches `.md` files (line 84)
- Debounces at 100ms (configurable, line 30)
- Triggers `indexer.reindexFile()` per file (incremental)
- Error handling: logs errors, doesn't crash server (line 67)
- **Reliability**: `fs.watch()` is known to be unreliable on some platforms (Linux: inotify limits, macOS: kqueue event coalescing). Events can be missed, especially for rapid batch operations.

**Startup recovery**: On start (`index.ts` line 182–187), if indexing fails, server continues running anyway (`// Continue anyway - server can still respond with errors`). Same for FileWatcher failure (line 191–194). This means the server can be in a degraded state from boot without active alerting.

### D. What's NOT Measured

| Gap | Impact |
|-----|--------|
| **Query correctness** | A section might be parsed wrong — no validation that `get_section` returns the right content |
| **Cross-reference resolution** | Cross-refs are counted but never validated for target existence |
| **Content semantic integrity** | Heading structure extracted mechanically — can't detect corrupted markdown |
| **Tool responsiveness** | No self-test that all 8 tools respond correctly |
| **FileWatcher reliability** | No monitoring of whether the watcher is still firing events |
| **Index completeness vs correctness** | Knows file count but not whether content was parsed correctly |

### E. Consumer vs Internal Differences

**Internal (development)** — from `.kiro/settings/mcp.json`:
```json
"command": "node",
"args": ["/Users/3fn/.../mcp-server/dist/index.js"],
"env": { "WORKSPACE_ROOT": "/Users/3fn/.../DesignerPunk-v2" }
```

**Consumer** — from `src/cli/designerpunk.ts` (line 217–225, `runMcpDocs()`):
```typescript
const pkgRoot = resolvePackageRoot();
const serverBundle = path.join(pkgRoot, 'dist/mcp/docs-mcp.js');
const steeringDir = path.join(pkgRoot, '.kiro/steering');
spawnServer(serverBundle, { MCP_STEERING_DIR: steeringDir }, true);
```

**Key differences**:
- Consumer reads `MCP_STEERING_DIR` env var (used in `index.ts` line 213: `process.env.MCP_STEERING_DIR || DEFAULT_STEERING_DIR`)
- Consumer resolves paths relative to the installed package root (not cwd)
- The default `DEFAULT_STEERING_DIR = '.kiro/steering/'` is **relative to cwd** — in consumer context this would resolve to the consumer's project directory, which likely has no `.kiro/steering/`. The env var is critical.
- FileWatcher watches the same directory as indexing — in consumer context it watches the package's steering dir, which won't change (installed package). **FileWatcher is effectively useless in consumer context.**

---

## Server 2: Application MCP (`application-mcp-server/src/`)

### A. Health Check Implementation

**Health endpoint**: `get_component_health` tool (in `index.ts`, dispatches to `this.queryEngine.getHealth()`)

**What it measures** (from `ComponentIndexer.getHealth()`, line 131–144):

1. **Component count**: `this.index.size` (zero = `empty` status)
2. **Pattern health**: Number of patterns indexed + pattern-specific warnings
3. **Guidance health**: Number of guidance families indexed + guidance warnings
4. **Layout template health**: Number of templates indexed + template warnings
5. **Token health**: Primitives, semantics, and component token counts
6. **Warnings**: Aggregated from all sub-indexers

**Status definitions** (line 138):
- `healthy`: Components > 0 AND zero aggregated warnings
- `degraded`: Components > 0 AND warnings exist
- `empty`: Zero components indexed

**No `failed` status exists.** The Application MCP has no concept of index failure — if the directory doesn't exist, it simply reports 0 components with a warning.

**NO staleness detection**: Unlike Docs MCP, there is NO `lastIndexTime` vs file mtime comparison. The `lastIndexTime` is stored (line 24) but never used for staleness checks. Health only reports current counts, not freshness.

**NO filesystem-to-index comparison**: No check for "files on disk not in index" or "entries in index with no file on disk."

### B. Degradation Detection

| Detection Type | Supported | Mechanism |
|---------------|-----------|-----------|
| Content drift (files changed, index stale) | ❌ | No mtime comparison |
| Missing content (file deleted, still in index) | ❌ | No phantom detection |
| Corrupt state (malformed data) | ⚠️ Partial | Schema parsing warns on malformed YAML |
| Files added but not indexed | ❌ | No filesystem scan comparison |
| Token index missing | ✅ | Reports warning if `tokenIndexDir` doesn't exist |
| Components directory missing | ✅ | Reports warning at index time |

**Gap between event and detection**: The FileWatcher provides near-real-time reindexing for file changes. But if the watcher misses events or if data directories are modified outside the watch scope (e.g., patterns, templates, guidance), the server has no way to know.

**What degrades silently**:
- Experience patterns directory changes (not watched)
- Layout templates directory changes (not watched)
- Family guidance directory changes (not watched)
- Token index directory changes (not watched)
- Only `src/components/core/` is watched (contracts.yaml, schema.yaml, component-meta.yaml)

### C. Recovery Mechanisms

**Rebuild mechanism** (`rebuild_index` tool in `index.ts` line 135–143):
```typescript
case 'rebuild_index':
  await this.indexer.indexComponents(
    this.paths.componentsDir,
    this.paths.patternsDir,
    this.paths.templatesDir,
    this.paths.guidanceDir,
    this.paths.tokenIndexDir
  );
  if (this.paths.designLanguagePath) {
    await this.philosophyIndexer.index(this.paths.designLanguagePath);
  }
  return this.queryEngine.getHealth();
```

- Full rebuild: clears all maps, re-scans everything
- Also re-indexes design philosophy (unlike initial construction in some edge cases)
- Returns new health status
- **No error handling at tool level** — errors propagate to the generic catch in `handleTool`

**Agent trigger**: ✅ `rebuild_index` is available as an MCP tool, but NOT in the `autoApprove` list in `.kiro/settings/mcp.json`. Agents can call it, but it may require human approval depending on IDE configuration.

**FileWatcher** (`application-mcp-server/src/watcher/FileWatcher.ts`):
- Uses `fs.watch()` with `{ recursive: true }` (line 26)
- Only watches files matching: `*.schema.yaml`, `contracts.yaml`, `component-meta.yaml` (line 10, 21–22)
- Derives component directory from relative filename (line 30–32)
- Triggers `indexer.reindexComponent()` (incremental, single component)
- Same `fs.watch()` reliability concerns as Docs MCP

**What the watcher DOESN'T cover**:
- Pattern files (`experience-patterns/`)
- Template files (`layout-templates/`)
- Guidance files (`family-guidance/`)
- Token index files (`token-index/`)
- Design philosophy file (`design-philosophy.yaml`)

These data sources are only refreshed on explicit `rebuild_index` or server restart.

### D. What's NOT Measured

| Gap | Impact |
|-----|--------|
| **Staleness** | No way to know if indexed data matches current filesystem state |
| **Pattern/template/guidance freshness** | Changes to these don't trigger reindex |
| **Token index currency** | If `npx designerpunk generate` runs and updates token-index, MCP doesn't know |
| **Contract inheritance accuracy** | No validation that parent contracts still match |
| **Cross-reference validation currency** | Validated at index time only |
| **Tool responsiveness** | No self-test |
| **Composition rule correctness** | No runtime validation of composition rules |

### E. Consumer vs Internal Differences

**Internal** — from `.kiro/settings/mcp.json`:
```json
"env": {
  "COMPONENTS_DIR": "/Users/3fn/.../src/components/core",
  "TOKEN_INDEX_DIR": "/Users/3fn/.../token-index"
}
```

**Consumer** — from `src/cli/designerpunk.ts` (line 199–215, `runMcpApp()`):
```typescript
const componentsDir = path.join(pkgRoot, 'src/components/core');
const patternsDir = path.join(pkgRoot, 'experience-patterns');
const templatesDir = path.join(pkgRoot, 'layout-templates');
const guidanceDir = path.join(pkgRoot, 'family-guidance');
const tokenIndexDir = path.join(pkgRoot, 'token-index');
```

**Key differences**:
- Consumer resolves ALL paths from the installed package root (not env vars except as overrides at `index.ts` line 256: `process.env.COMPONENTS_DIR || DEFAULT_COMPONENTS_DIR`)
- `DEFAULT_COMPONENTS_DIR = 'src/components/core'` is relative to cwd — if run from a consumer project without this structure, it would index nothing
- In consumer context, `PATTERNS_DIR`, `TEMPLATES_DIR`, `GUIDANCE_DIR` env vars are set by the CLI — if not set, defaults derive from `componentsDir` parent: `path.resolve(componentsDir, '..', '..', '..', 'experience-patterns')` (line 60 of ComponentIndexer)
- **FileWatcher watches the components directory** — in consumer context (installed package), this directory is immutable. **FileWatcher is useless in consumer context.**
- Consumer `token-index` path is from the package root, not the consumer project — so it uses the pre-built token index from the published package

---

## Server 3: Product MCP (`product-mcp-server/src/`)

### A. Health Check Implementation

**Health endpoint**: `get_product_health` tool (in `index.ts`, line 189–204)

**What it measures** (combined from `ProductIndexer.getHealth()` line 99–110 and tool handler line 189–204):

1. **Indexed status**: Boolean `indexed` flag
2. **Last index time**: ISO timestamp
3. **Counts**: screens, domain objects, templates, one-off components, principles
4. **Reverse index sizes**: components-to-screens, tokens-to-screens, domain-objects-to-screens map sizes
5. **Gap counts**: Total component gaps and screens with gaps
6. **Catalog size**: Number of known system components (from GapDetector)
7. **Product token health**: Token count, category count, error/warning counts
8. **Warnings**: Aggregated parse failures and missing references

**Status definitions** (line 100):
- `healthy`: `indexed === true`
- `empty`: `indexed === false`

**No `degraded` or `failed` status.** The Product MCP has the simplest health model — either data was indexed or it wasn't. Warnings exist in the payload but don't affect the status label.

**NO staleness detection**: No comparison of file modification times against index time.

**NO filesystem-to-index comparison**: No check for files added/removed since last index.

### B. Degradation Detection

| Detection Type | Supported | Mechanism |
|---------------|-----------|-----------|
| Content drift (files changed, index stale) | ❌ | No detection |
| Missing content (file deleted, still in index) | ❌ | No detection |
| Corrupt state (malformed data) | ⚠️ | `loadYaml()` catches parse errors and adds to warnings |
| Files added but not indexed | ❌ | No detection |
| Product directory missing | ✅ | Starts with empty data, logs message (line 103 of index.ts) |
| Broken token references | ✅ | ProductTokenIndexer detects broken `ref` fields |
| Component gaps | ✅ | GapDetector identifies UI tree references not in component catalog |

**The Product MCP has NO file watcher.** It indexes once at startup and stays static until `rebuild_product_index` is called. Any file changes require explicit re-indexing or server restart.

### C. Recovery Mechanisms

**Rebuild mechanism** (`rebuild_product_index` tool in `index.ts` line 207–210):
```typescript
case 'rebuild_product_index':
  if (fs.existsSync(this.productDir)) {
    await this.indexAndBuildQueries();
  }
  return this.handleTool('get_product_health', {});
```

- Full rebuild: `indexAndBuildQueries()` calls `this.indexer.index()` which clears all state and re-scans
- Rebuilds ScreenQuery and ExperienceMapQuery objects after reindex
- Returns health status after rebuild
- If product directory doesn't exist, silently does nothing

**Agent trigger**: ✅ `rebuild_product_index` is available as MCP tool, but NOT in `autoApprove` list. May require human approval.

**No FileWatcher**: The Product MCP has no automatic re-indexing mechanism. This is the most vulnerable server to data drift.

**Startup behavior**: If the product directory doesn't exist at startup (line 101–104 of `index.ts`), the server starts with empty data and logs an error. It doesn't fail or exit — it runs with nothing to serve.

### D. What's NOT Measured

| Gap | Impact |
|-----|--------|
| **All staleness** | No way to detect that YAML files have changed |
| **YAML schema validation** | Loads any valid YAML — doesn't validate against expected schema |
| **UI tree structural integrity** | Walks trees but doesn't validate structure conforms to spec |
| **Cross-screen consistency** | No check that shared domain objects are consistently defined |
| **Template-to-screen binding accuracy** | No validation that template refs in screens resolve |
| **Screen spec completeness** | No check for required sections in screen specs |
| **Tool responsiveness** | No self-test |

### E. Consumer vs Internal Differences

**Internal** — from `.kiro/settings/mcp.json`:
```json
"env": {
  "PRODUCT_DIR": "/Users/3fn/.../product",
  "COMPONENT_DIR": "/Users/3fn/.../src/components/core",
  "TOKEN_INDEX_DIR": "/Users/3fn/.../token-index"
}
```

**Consumer** — from `src/cli/designerpunk.ts` (line 227–235, `runMcpProduct()`):
```typescript
const productDir = process.env.PRODUCT_DIR || path.resolve(process.cwd(), 'product');
spawnServer(serverBundle, { PRODUCT_DIR: productDir }, true);
```

**Key differences**:
- Consumer uses `PRODUCT_DIR` env var, falling back to `cwd/product` — this is the consumer's own product directory ✅
- BUT `COMPONENT_DIR` and `TOKEN_INDEX_DIR` are NOT set by the CLI's `runMcpProduct()` — they come from the server's own defaults (`'src/components/core'` and `'token-index'`), which resolve relative to cwd
- In consumer context, if run from the consumer project: `src/components/core` would look for components in the consumer's project (not the DesignerPunk package) — **this is likely a bug or requires consumer to have a specific directory structure**
- The Product MCP constructor reads `DEFAULT_TOKEN_INDEX_DIR = 'token-index'` (line 12 of index.ts) — resolves relative to cwd, which may not have a token-index in consumer context

---

## Cross-Server Analysis

### Common Architectural Patterns

1. **In-memory only**: All three servers maintain state purely in memory. No persistence between restarts. Every restart requires full re-indexing.

2. **Passive health**: Health is only reported when queried. No proactive alerting, no heartbeat, no health degradation events emitted to stderr.

3. **Full rebuild only**: All `rebuild_index`/`rebuild_product_index` tools do full rebuilds. No incremental recovery for partial corruption.

4. **Fire-and-forget startup**: All servers continue running even if initial indexing fails. They serve errors rather than refusing to start.

### FileWatcher Reliability Concerns

All watchers use Node.js `fs.watch()` which has known platform-specific issues:

| Platform | Issue |
|----------|-------|
| macOS | Event coalescing — rapid changes may be reported as single event |
| Linux | inotify limits — may silently stop watching if limit exceeded |
| All | No guaranteed ordering, event batching can cause missed events |
| All | `filename` parameter can be null (handled in both watchers) |
| Consumer | Watching immutable installed package directories — useless |

**Debouncing (100ms)**: Both Docs and Application MCPs debounce at 100ms. This is reasonable for IDE edits but could miss rapid scripted changes.

### What Would Make Staleness Detection Complete

For each server to truly detect staleness, it would need:

1. **Periodic filesystem scan** (not just event-driven): Compare expected files against indexed files on a timer (e.g., every 60 seconds)
2. **mtime tracking per file**: Store the mtime of each file at index time and compare on health check
3. **Content hash**: Store a hash of file content at index time and compare on health check (more reliable than mtime)
4. **Index version/generation counter**: Increment on every mutation, compare with expected state

Currently only Docs MCP does mtime comparison (#2). None do periodic scans (#1) or content hashing (#3).

### Consumer Context Gap Summary

| Aspect | Docs MCP | Application MCP | Product MCP |
|--------|----------|-----------------|-------------|
| Data path resolution | ✅ Via env var | ⚠️ Mix of env + defaults | ⚠️ Partial env vars |
| FileWatcher usefulness | ❌ Useless (immutable pkg) | ❌ Useless (immutable pkg) | N/A (no watcher) |
| Default path safety | ⚠️ Relative to cwd | ⚠️ Relative to cwd | ⚠️ Relative to cwd |
| Token index access | N/A | ⚠️ Needs env var or correct cwd | ⚠️ Needs env var or correct cwd |

---

## Recommendations (Findings, Not Directives)

### Critical Gaps

1. **No staleness detection in Application or Product MCPs**: These servers can serve indefinitely stale data without any indicator. A `lastModified` filesystem scan on health check would surface this.

2. **Phantom entry detection**: Only the Docs MCP FileWatcher handles file deletion, and only via events (which can be missed). No server actively validates that all indexed entries still have corresponding files.

3. **Consumer path resolution inconsistency**: The Product MCP's `runMcpProduct()` CLI handler doesn't pass `COMPONENT_DIR` or `TOKEN_INDEX_DIR`, leaving them to default to cwd-relative paths that are likely wrong in consumer context.

4. **No watcher for Product MCP**: The most mutable data source (product YAML files actively edited by product agents) has no automatic re-indexing. Every edit requires manual `rebuild_product_index`.

### Moderate Gaps

5. **Application MCP only watches components**: Pattern, template, guidance, and token-index changes are invisible to the file watcher.

6. **No `degraded` status in Application or Product MCPs**: These servers report `healthy` even when warnings exist, making it harder for agents to detect issues without parsing the warnings array.

7. **No health check on tool invocation**: Tools return data without checking whether the underlying index is current. A lightweight "are we fresh?" check on each tool call would catch stale-data scenarios.

### Design Considerations

8. **Periodic health heartbeat**: A timer that runs `determineIndexHealth()` every N seconds and logs degradation would make staleness visible without requiring agent queries.

9. **Content hash for drift detection**: Storing SHA-256 of each indexed file's content would make staleness detection deterministic and platform-independent.

10. **Consumer-specific health mode**: When running in consumer context (detected via absence of `.kiro/` directory or presence of `designerpunk.config.ts`), health checks could skip staleness detection (immutable package) and focus on data availability.

---

## Raw Data: Lines of Code per Health-Related Module

| File | Lines | Purpose |
|------|-------|---------|
| `mcp-server/src/indexer/index-health.ts` | 163 | Full health check implementation |
| `mcp-server/src/indexer/DocumentIndexer.ts` | 275 | Includes rebuild, reindex, health methods |
| `mcp-server/src/watcher/FileWatcher.ts` | 128 | Docs file watcher |
| `mcp-server/src/tools/get-index-health.ts` | 93 | Health tool handler |
| `mcp-server/src/tools/get-health-status.ts` | 101 | Server health + memory tool |
| `mcp-server/src/tools/rebuild-index.ts` | 95 | Rebuild tool handler |
| `application-mcp-server/src/indexer/ComponentIndexer.ts` | ~280 | Includes getHealth() (15 lines) |
| `application-mcp-server/src/watcher/FileWatcher.ts` | 53 | Component file watcher |
| `product-mcp-server/src/indexer/ProductIndexer.ts` | ~295 | Includes getHealth() (12 lines) |

---

## Conclusion

The Docs MCP has the strongest health infrastructure (staleness detection, state logging, memory monitoring, comprehensive metrics). The Application MCP has a functional watcher but limited health depth. The Product MCP is the most vulnerable — no watcher, no staleness detection, binary healthy/empty status.

For consumer contract testing (Spec 106), the key questions are:
1. Do the MCP tools return correct data when paths differ? (functional correctness)
2. Does health reporting accurately reflect server state? (observability)
3. Can agents recover from detected degradation? (autonomy)

Currently, question 1 has no built-in validation, question 2 is partially answered (Docs MCP only), and question 3 is available but not proactive (requires agent to notice and trigger rebuild).
