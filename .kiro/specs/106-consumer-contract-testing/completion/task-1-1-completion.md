# Task 1.1 Completion: Implement StalenessGate class

**Date**: 2026-06-09
**Task**: 1.1 Implement StalenessGate class
**Type**: Architecture
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `application-mcp-server/src/staleness/StalenessGate.ts` | **New** — StalenessGate class + `isImmutableContext` helper |
| `application-mcp-server/src/staleness/__tests__/StalenessGate.test.ts` | **New** — 16 unit tests |
| `mcp-server/src/staleness/StalenessGate.ts` | **New** — copy of above |
| `mcp-server/src/staleness/__tests__/StalenessGate.test.ts` | **New** — copy of tests |
| `product-mcp-server/src/staleness/StalenessGate.ts` | **New** — copy of above |
| `product-mcp-server/src/staleness/__tests__/StalenessGate.test.ts` | **New** — copy of tests |

## Architecture

```typescript
interface StalenessGateConfig {
  dataDirs: string[];          // Directories to scan
  fileExtensions: string[];   // e.g., ['.yaml', '.md']
  thresholdMs?: number;       // Default: 30000
  isImmutable?: boolean;      // Skip all checks (node_modules context)
  onRebuild: () => Promise<void>;
}
```

Key methods:
- `checkAndRebuildIfNeeded()` — threshold check → mtime scan → rebuild if stale
- `markIndexed()` — updates lastIndexTime after successful index/rebuild
- `getStaleFiles()` — returns files newer than lastIndexTime (for health reporting)

Design decisions:
- Uses `fs.utimesSync` for mtime comparison (not content hash) — proven pattern, cheap
- Threshold window prevents redundant scans (0ms overhead on most tool calls)
- Immutable context detection via path contains `/node_modules/`
- Scans individual file mtimes recursively (not directory mtimes) per R1 AC6

## Validation

- 16/16 tests passing in all three servers
- Covers: threshold timing, mtime scanning, rebuild triggering, immutable skip, missing dirs, nested scanning, extension filtering
- Requirements addressed: R1 AC1-6, R5 AC3
