# Design Document: Sync Command

**Date**: 2026-06-05
**Spec**: 111 - Sync Command
**Status**: Design Phase
**Dependencies**: Spec 114 (complete before ship), package cleanup (avatar-sizing.tokens.ts removal)

---

## Overview

The sync command compares the installed `@3fn/core` package content against the consumer's project, classifies differences, and applies updates using a two-tier model. The implementation is a single new CLI command (`sync`) in the existing `designerpunk.ts` entry point, with modular internal components for scanning, classification, manifest management, and interactive prompting.

---

## Architecture

```
src/cli/sync/
├── index.ts              — Entry point: runSync()
├── PackageResolver.ts    — Locate installed @3fn/core, read version
├── FileScanner.ts        — Scan directories, hash files
├── Classifier.ts         — Classify files (new/updated/conflict/unchanged)
├── Manifest.ts           — Load/save .kiro/sync-manifest.json
├── IgnoreFilter.ts       — Parse .designerpunkignore, match paths
├── Reporter.ts           — Format grouped output
├── Prompter.ts           — Interactive conflict resolution (readline)
├── Applier.ts            — Copy files, apply transforms, update manifest
└── transforms.ts         — rewriteBuildImports for source-tier .ts files
```

### Data Flow

```
runSync(options: SyncOptions)
  │
  ├── PackageResolver.resolve() → packageRoot, version
  ├── Manifest.load() → manifest (or empty)
  ├── IgnoreFilter.load() → ignore patterns
  │
  ├── FileScanner.scan(packageRoot, managedDirs) → packageFiles[]
  ├── FileScanner.scan(projectRoot, managedDirs) → projectFiles[]
  │
  ├── Classifier.classify(packageFiles, projectFiles, manifest, ignore)
  │     → { new[], updatedSafe[], conflicts[], unchanged[], removed[] }
  │
  ├── Reporter.display(classified, options)
  │
  ├── if --dry-run or (non-TTY and not --force): return
  │
  ├── Applier.applyGovernance(new + updatedSafe, governance tier)
  ├── Applier.applySource(new + updatedSafe, source tier, prompter)
  ├── Prompter.resolveConflicts(conflicts) → decisions[]
  ├── Applier.applyDecisions(decisions)
  │
  └── Manifest.save(applied files)
```

---

## Components and Interfaces

### SyncOptions

```typescript
interface SyncOptions {
  dryRun: boolean;
  force: boolean;
  projectRoot: string;    // process.cwd()
}
```

### PackageResolver

```typescript
interface ResolvedPackage {
  root: string;          // Absolute path to @3fn/core
  version: string;       // Package version
}

/** Resolve @3fn/core location using require.resolve. */
function resolvePackage(projectRoot: string): ResolvedPackage;
```

### FileScanner

```typescript
interface ScannedFile {
  relativePath: string;  // e.g., ".kiro/steering/Core Goals.md"
  absolutePath: string;
  hash: string;          // SHA-256 of content
  tier: 'governance' | 'source';
}

/** Scan managed directories and hash all files. */
function scanFiles(root: string, dirs: ManagedDir[]): ScannedFile[];
```

### ManagedDir

```typescript
interface ManagedDir {
  path: string;          // e.g., ".kiro/steering"
  tier: 'governance' | 'source';
  excludeDirs?: string[];  // e.g., ['__tests__', 'generated']
}

const MANAGED_DIRS: ManagedDir[] = [
  { path: '.kiro/steering', tier: 'governance' },
  { path: '.kiro/agents', tier: 'governance' },
  { path: '.kiro/skills', tier: 'governance' },
  { path: 'src/tokens', tier: 'source', excludeDirs: ['__tests__'] },
  { path: 'src/types', tier: 'source', excludeDirs: ['__tests__', 'generated'] },
  { path: 'src/components/core', tier: 'source', excludeDirs: ['__tests__'] },
];
```

### Dependencies (package.json)

The following must be added as direct `dependencies` (not relying on transitive availability from devDependencies):
- `minimatch` — .gitignore-style glob matching for `.designerpunkignore`
- `diff` — unified diff generation for interactive conflict resolution

### Classifier

```typescript
type FileClassification = 'new' | 'updated-safe' | 'conflict' | 'unchanged' | 'removed';

interface ClassifiedFile {
  relativePath: string;
  classification: FileClassification;
  tier: 'governance' | 'source';
  packageHash: string;
  projectHash?: string;
  manifestHash?: string;
  reason?: string;       // e.g., "locally modified", "removed from package"
}

interface ClassificationResult {
  new: ClassifiedFile[];
  updatedSafe: ClassifiedFile[];
  conflicts: ClassifiedFile[];
  unchanged: ClassifiedFile[];
  removed: ClassifiedFile[];
}

function classifyFiles(
  packageFiles: ScannedFile[],
  projectFiles: ScannedFile[],
  manifest: SyncManifest,
  ignore: IgnoreFilter
): ClassificationResult;
```

### SyncManifest

```typescript
interface SyncManifest {
  version: string;
  syncedAt: string;      // ISO timestamp
  files: Record<string, ManifestEntry>;
}

interface ManifestEntry {
  hash: string;
  managed: boolean;      // true = governance tier
}

function loadManifest(projectRoot: string): SyncManifest | null;
function saveManifest(projectRoot: string, manifest: SyncManifest): void;
```

### IgnoreFilter

```typescript
interface IgnoreFilter {
  isIgnored(relativePath: string): boolean;
}

/** Load .designerpunkignore with .gitignore semantics. */
function loadIgnoreFilter(projectRoot: string): IgnoreFilter;
```

### Prompter

```typescript
type ConflictDecision = 'skip' | 'overwrite';

interface PromptResult {
  file: ClassifiedFile;
  decision: ConflictDecision;
}

/** Prompt user per-conflict with skip/overwrite/diff options. */
function resolveConflicts(
  conflicts: ClassifiedFile[],
  packageRoot: string,
  projectRoot: string
): Promise<PromptResult[]>;
```

### Applier

```typescript
interface ApplyResult {
  applied: string[];     // Files successfully applied
  skipped: string[];     // Files skipped by user
  errors: string[];      // Files that failed to apply
}

/** Copy file from package to project, applying transforms for source-tier .ts. */
function applyFile(
  file: ClassifiedFile,
  packageRoot: string,
  projectRoot: string
): void;
```

---

## Data Models

### .kiro/sync-manifest.json

```json
{
  "version": "11.8.0",
  "syncedAt": "2026-06-05T15:00:00.000Z",
  "files": {
    ".kiro/steering/Core Goals.md": {
      "hash": "a1b2c3d4e5f6...",
      "managed": true
    },
    "src/tokens/SpacingTokens.ts": {
      "hash": "f7e8d9c0b1a2...",
      "managed": false
    }
  }
}
```

### .designerpunkignore

```gitignore
# DesignerPunk Sync Ignore
# Files listed here are never touched by `npx designerpunk sync`.
# Uses .gitignore syntax: globs, exact paths, # comments.

# Example: keep custom agent prompt
# .kiro/agents/leonardo-prompt.md
```

---

## Error Handling

| Error | Behavior |
|-------|----------|
| Package not installed | Exit 1: "❌ @3fn/core not installed. Run `npm install` first." |
| Non-TTY environment | Auto dry-run: "Non-interactive environment detected — running in dry-run mode." |
| File read/write failure | Log error for specific file, continue with remaining files |
| Manifest parse failure | Treat as first-time sync (bootstrap), log warning |
| Transform failure on .ts file | Log error, skip file, continue |

---

## Testing Strategy

### Unit Tests

- **PackageResolver**: resolves from node_modules, handles hoisted deps, fails gracefully
- **FileScanner**: hashes files correctly, respects directory boundaries, handles empty dirs
- **Classifier**: all classification paths (new, updated-safe, conflict, unchanged, removed, first-time)
- **Manifest**: load/save roundtrip, bootstrap from empty, handles corrupt JSON
- **IgnoreFilter**: exact paths, globs, anchored patterns, comments, empty file
- **Applier**: copies files, applies transforms to .ts, preserves non-.ts, updates manifest

### Integration Tests

- Full sync flow: new files applied, conflicts prompted, manifest updated
- Dry-run: no files modified
- Force: all conflicts overwritten, warnings logged
- First-time sync: manifest bootstrapped
- Non-TTY: auto dry-run behavior
- Two-tier: governance auto-applies, source confirms

### Edge Case Tests

- Binary files: diff option hidden
- Files deleted from package: reported but not auto-deleted
- Consumer-created files in managed dirs: completely ignored
- Empty .designerpunkignore: no errors
- Manifest with entries for files no longer in package: cleaned up on save

---

## Design Decisions

### Decision 1: Modular Architecture (src/cli/sync/)

**Options**: Single file vs module directory
**Decision**: Module directory with one file per concern
**Rationale**: Each component (scanning, classification, prompting, applying) is independently testable. The sync command has more complexity than `init` or `generate` — a single file would exceed 500 lines and be harder to maintain.

### Decision 2: require.resolve for Package Location

**Options**: Hardcoded `node_modules/@3fn/core` vs `require.resolve`
**Decision**: `require.resolve('@3fn/core/package.json')` then `path.dirname()`
**Rationale**: Handles monorepos, pnpm symlinks, hoisted deps, and nested node_modules. The hardcoded path is a fallback only if require.resolve fails.

### Decision 3: In-Terminal Diff (Not External Tool)

**Options**: External diff tool vs in-terminal unified diff
**Decision**: In-terminal with ANSI coloring
**Rationale**: Zero-config, matches git muscle memory, no tool detection complexity. Consumers who want richer diff can copy the path and use their preferred tool manually.

### Decision 4: Bootstrap Manifest on First Sync

**Options**: Treat all files as conflicts vs bootstrap as up-to-date
**Decision**: Bootstrap — hash everything, write manifest, no conflicts
**Rationale**: First-time sync with 80+ conflicts would be unusable. The consumer's current state IS their baseline. Future syncs detect drift from this point forward.

### Decision 5: Content Transform Reuse

**Options**: Sync-specific transforms vs reuse init's `rewriteBuildImports`
**Decision**: Reuse init's transform
**Rationale**: DRY. The transform exists and is tested. Sync and init have the same requirement: make package-internal import paths work in consumer repos.
