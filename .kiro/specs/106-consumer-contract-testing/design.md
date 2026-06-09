# Design Document: Consumer Contract Testing & MCP Operational Reliability

**Date**: 2026-06-09
**Spec**: 106 - Consumer Contract Testing & MCP Operational Reliability
**Status**: Design Phase
**Dependencies**: None (Specs 111, 114 complete)

---

## Overview

This design addresses two complementary problems in one execution arc: (A) MCP servers silently serving stale data with no automatic recovery, and (B) package publishes reaching consumers with broken exports, init workflows, or pipeline behavior. Phase A fixes the MCPs (health parity, threshold gate, watchers, path fixes). Phase B writes contract tests that verify the fixed behavior and the consumer experience end-to-end.

---

## Architecture

### Phase A: MCP Health Parity

#### Threshold Staleness Gate (Shared Module)

A reusable `StalenessGate` class injected into all three MCP server tool handlers:

```typescript
interface StalenessGateConfig {
  dataDirs: string[];            // Directories to scan for mtime
  fileExtensions: string[];     // e.g., ['.md'], ['.yaml', '.md']
  thresholdMs: number;          // Default: 30000 (30s)
  isImmutable: boolean;         // True when data is in node_modules (consumer context)
  onRebuild: () => Promise<void>;  // Callback to trigger full reindex
}

class StalenessGate {
  private lastCheckTime: number = 0;
  private lastIndexTime: number;

  constructor(config: StalenessGateConfig);

  /** Call before every data-returning tool. Returns true if rebuild was triggered. */
  async checkAndRebuildIfNeeded(): Promise<boolean>;

  /** Update lastIndexTime after successful index/rebuild. */
  markIndexed(): void;

  /** Get stale files for health reporting. */
  getStaleFiles(): string[];
}
```

**Placement in tool handler** (pseudocode):
```typescript
async handleTool(name: string, args: object) {
  // Exempt tools skip the gate
  if (!EXEMPT_TOOLS.has(name)) {
    await this.stalenessGate.checkAndRebuildIfNeeded();
  }
  // Proceed with tool logic...
}
```

#### Three-State Health (Application + Product MCPs)

Lift the `determineIndexHealth()` pattern from Docs MCP:

```typescript
type HealthStatus = 'healthy' | 'degraded' | 'failed';

interface HealthResult {
  status: HealthStatus;
  lastIndexTime: string;
  counts: Record<string, number>;
  warnings: string[];
  staleFiles: string[];  // Only populated when status === 'degraded'
}
```

**State determination:**
- `failed`: No content indexed (empty state) or index initialization error
- `degraded`: Content indexed but staleFiles.length > 0 or warnings.length > 0
- `healthy`: Content indexed, no stale files, no warnings

#### Product MCP File Watcher

New `FileWatcher` for Product MCP, matching Docs MCP pattern:

```typescript
// product-mcp-server/src/watcher/FileWatcher.ts
class ProductFileWatcher {
  constructor(
    productDir: string,
    onFileChange: () => Promise<void>,  // triggers full reindex
    debounceMs: number = 200
  );

  start(): void;   // Begin watching recursively
  stop(): void;    // Stop watching
}
```

Watches `productDir` recursively for `.yaml` and `.md` changes. Uses `fs.watch({ recursive: true })`.

#### Application MCP Expanded Watching

Current watcher only covers component files. Expand to separate watchers per data source:

```typescript
// Existing: components (schema.yaml, contracts.yaml, component-meta.yaml)
// Add: patterns, templates, guidance, token-index
const WATCH_CONFIGS = [
  { dir: componentsDir, filter: /\.(schema|contracts|component-meta)\.yaml$/, handler: reindexComponent },
  { dir: patternsDir, filter: /\.yaml$/, handler: reindexPatterns },
  { dir: templatesDir, filter: /\.yaml$/, handler: reindexTemplates },
  { dir: guidanceDir, filter: /\.yaml$/, handler: reindexGuidance },
  { dir: tokenIndexDir, filter: /\.yaml$/, handler: reindexTokens },
];
```

Each watcher is independent — a missing directory simply isn't watched (no error).

#### Consumer Path Fixes

In `src/cli/designerpunk.ts`, update `runMcpProduct()`:

```typescript
async function runMcpProduct() {
  const pkgRoot = resolvePackageRoot();
  const serverBundle = path.join(pkgRoot, 'dist/mcp/product-mcp.js');
  const productDir = process.env.PRODUCT_DIR || path.resolve(process.cwd(), 'product');
  const componentDir = path.join(pkgRoot, 'src/components/core');
  const tokenIndexDir = path.join(pkgRoot, 'token-index');

  spawnServer(serverBundle, {
    PRODUCT_DIR: productDir,
    COMPONENT_DIR: componentDir,       // NEW
    TOKEN_INDEX_DIR: tokenIndexDir,    // NEW
  }, true);
}
```

For `runMcpApp()`, add `DESIGN_LANGUAGE_PATH`:
```typescript
const designLanguagePath = path.join(pkgRoot, 'design-philosophy.yaml');
if (fs.existsSync(designLanguagePath)) {
  envVars.DESIGN_LANGUAGE_PATH = designLanguagePath;
}
```

#### Consumer-Context Detection

```typescript
function isImmutableContext(dataPath: string): boolean {
  return dataPath.includes('/node_modules/');
}
```

When immutable: skip staleness gate, skip file watchers. Content comes from a published package — it won't change.

---

### Phase B: Consumer Contract Tests

#### Export Contract Test

```typescript
// src/__tests__/export-contracts.test.ts
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
const exportEntries = Object.entries(pkg.exports);

describe('Package export contracts', () => {
  for (const [subpath, paths] of exportEntries) {
    describe(subpath, () => {
      it('resolves without error', () => {
        const resolved = require.resolve(`@3fn/core${subpath === '.' ? '' : '/' + subpath}`);
        expect(resolved).toBeTruthy();
      });

      it('exports expected symbols', () => {
        const mod = require(resolved);
        // Per-subpath assertions on expected named exports
      });
    });
  }
});
```

#### Consumer Integration Test

```typescript
// tests/consumer-integration.test.ts
// Runs via: npm run test:consumer

describe('Consumer integration', () => {
  let tempDir: string;

  beforeAll(async () => {
    // npm pack → install in temp dir → init → configure
  });

  it('init produces working project', () => { /* ... */ });
  it('generate reflects token edits', () => { /* ... */ });
  it('validate passes', () => { /* ... */ });
  it('MCP:app starts and returns component data', () => { /* ... */ });
  it('MCP:docs starts and returns section data', () => { /* ... */ });
  it('MCP:product starts and returns screen data', () => { /* ... */ });

  afterAll(() => { /* cleanup temp dir */ });
});
```

MCP smoke queries use JSON-RPC over stdio (~15 lines per server):
1. Spawn server process
2. Send `initialize` request
3. Send tool call (e.g., `get_component_catalog`, `get_documentation_map`, `get_product_health`)
4. Verify response contains non-empty data
5. Kill process

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Staleness check finds no files (empty dir) | Return `failed` health, don't crash |
| Rebuild fails mid-rebuild | Log error, serve stale data with `degraded` status, don't crash |
| File watcher encounters fs error | Log warning, continue without watcher (gate is backup) |
| Consumer integration test timeout | Fail with timeout message identifying which step hung |
| MCP smoke query returns error | Fail test with server stderr output for debugging |

---

## Testing Strategy

### Unit Tests (Phase A)

- `StalenessGate`: threshold timing, file scanning, rebuild triggering, immutable context skip
- `ProductFileWatcher`: event detection, debouncing, error handling
- `HealthResult` computation: healthy/degraded/failed state transitions
- Consumer-context detection: node_modules path matching

### Integration Tests (Phase A)

- Application MCP: modify pattern file → verify auto-reindex (watcher) or verify staleness detected (gate)
- Product MCP: modify product YAML → verify watcher triggers reindex
- Health endpoint: verify `degraded` when files manually touched after index

### Contract Tests (Phase B)

- Export contracts: all subpaths resolve and export symbols
- Consumer integration: full init → generate → validate → MCP smoke flow

---

## Design Decisions

### Decision 1: Shared StalenessGate Module

**Options**: Per-server implementation vs shared module
**Decision**: Shared module (`src/shared/StalenessGate.ts` or equivalent)
**Rationale**: Same logic in all three servers. Single implementation, tested once, configured per server.

### Decision 2: 30-Second Threshold

**Options**: Per-call (always check), per-session (once), threshold-based (every N seconds)
**Decision**: 30-second threshold
**Rationale**: Balances freshness (max 30s stale) with performance (0ms overhead on most calls). 7ms scan cost is acceptable every 30s. Human-edited files rarely change faster than this.

### Decision 3: Blocking Rebuild

**Options**: Block and serve fresh vs return stale with warning vs reject and require explicit rebuild
**Decision**: Block and serve fresh
**Rationale**: Agents shouldn't need to handle "try again" logic. The 200-500ms rebuild is imperceptible in the context of an AI agent processing a response. Serve correct data, always.

### Decision 4: File Mtime (Not Content Hash)

**Options**: mtime comparison vs SHA-256 content hash
**Decision**: mtime comparison
**Rationale**: Proven in Docs MCP. Cheaper (stat vs read+hash). Correct for hand-authored files. False positives (touch without content change) trigger harmless rebuild. Content hashing deferred to v2 if needed.

### Decision 5: Integration Test Uses npm pack

**Options**: npm pack (real tarball) vs npm link (symlink) vs direct path resolution
**Decision**: npm pack
**Rationale**: Tests exactly what consumers receive. Catches `files` field issues that symlinks miss. Slower but run pre-publish only.

### Decision 6: MCP Smoke Query Protocol

**Options**: JSON-RPC stdio vs HTTP endpoint vs file-based ready signal
**Decision**: JSON-RPC stdio (the real MCP protocol)
**Rationale**: Tests the actual consumer path. No new endpoints to build. ~15 lines per server. Catches real serialization/deserialization issues.
