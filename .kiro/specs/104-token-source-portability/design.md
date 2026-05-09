# Design Document: Token Source Portability

**Date**: 2026-05-09
**Spec**: 104 - Token Source Portability
**Status**: Design Phase
**Dependencies**: Spec 103 (Pipeline DX: Source Resolution & Validation) — complete

---

## Overview

This design makes token files self-contained by inlining 2 internal dependencies, adds component token portability to the `tokenSource` resolution path, ships `src/types/` with the token source, adds a `@3fn/core/build` subpath export, and enforces a lint boundary to prevent regression.

The changes are small and mechanical. The most complex piece is the CLI component token loading logic.

---

## Architecture

### Current Flow (Before)

```
tokenSource set → resolveTokens() loads primitives + semantics from local
                → component tokens loaded from PACKAGE (side-effect imports)
                → generator reads ComponentTokenRegistry (package primitives)
                → component token output uses PACKAGE values ❌
```

### New Flow (After)

```
tokenSource set → resolveTokens() loads primitives + semantics from local
                → loadComponentTokens() discovers + requires local component token files
                → defineComponentTokens() fires, reads LOCAL primitive objects (module cache)
                → ComponentTokenRegistry populated with LOCAL values
                → generator reads ComponentTokenRegistry (local primitives) ✅
```

**Key mechanism**: Node's module cache. When `resolveTokens()` loads `src/tokens/SpacingTokens.ts` from the local path, it's cached by absolute path. When a component token file subsequently `require('../../../tokens/SpacingTokens')`, Node resolves the same absolute path and returns the cached module. Component tokens get local primitive values automatically.

**Failure condition**: This breaks if the component token file resolves to a DIFFERENT absolute path than what `resolveTokens()` loaded (e.g., symlinks, different directory layouts). The init command's directory structure preservation (Req 5 AC 3) prevents this.

---

## Components and Interfaces

### 1. Token File Refactoring

#### SpacingTokens.ts — Inline `STRATEGIC_FLEXIBILITY_TOKENS`

**Before**:
```typescript
import { STRATEGIC_FLEXIBILITY_TOKENS } from '../constants/StrategicFlexibilityTokens';
```

**After**:
```typescript
// Strategic flexibility tokens — exceptions to the mathematical scale
// that serve specific UX needs (e.g., optical alignment, touch targets)
const STRATEGIC_FLEXIBILITY_TOKENS: Record<string, boolean> = {
  space025: true,  // 2px — optical alignment
  space050: true,  // 4px — tight padding
  space075: true,  // 6px — compact spacing
};
```

The original file at `src/constants/StrategicFlexibilityTokens.ts` remains for validator consumers (they import from there directly, outside the token source boundary).

#### semantic/TypographyTokens.ts — Inline `UnitConverter` usage

**Before**:
```typescript
import { UnitConverter } from '../../build/tokens/UnitConverter';
const unitConverter = new UnitConverter();
const labelMdFloatFontSize = unitConverter.applyScaleWithRounding(16, 0.88);
```

**After**:
```typescript
const labelMdFloatFontSize = Math.round(16 * 0.88); // 14
```

### 2. Package Exports (`package.json`)

Add `./build` subpath:
```json
"./build": {
  "import": "./src/build/tokens/index.ts",
  "require": "./src/build/tokens/index.ts",
  "types": "./src/build/tokens/index.ts"
}
```

This exports `defineComponentTokens` (and any other build utilities component tokens need).

### 3. Component Token Loader (`src/cli/loadComponentTokens.ts`) — NEW

```typescript
import * as fs from 'fs';
import * as path from 'path';
import type { ResolvedConfig } from '../config/ConfigLoader';

/**
 * Discover and load component token files from local source.
 * Triggers defineComponentTokens() side effects, populating ComponentTokenRegistry.
 *
 * Discovery sources (in order):
 * 1. {tokenSourceRoot}/component/ — scan for *.ts files
 * 2. componentTokenDirs from config — scan for *.tokens.ts files
 *
 * Returns count of loaded files for CLI output.
 */
export function loadComponentTokens(config: ResolvedConfig): number {
  let loaded = 0;

  // Source 1: Auto-discover from tokenSource/component/
  const componentSubdir = path.join(config.tokenSourceRoot, 'component');
  if (fs.existsSync(componentSubdir)) {
    const files = fs.readdirSync(componentSubdir)
      .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'));
    for (const file of files) {
      require(path.join(componentSubdir, file));
      loaded++;
    }
  }

  // Source 2: Explicit componentTokens directories (*.tokens.ts pattern)
  for (const dir of config.componentTokenDirs) {
    if (!fs.existsSync(dir)) continue;
    loaded += scanForTokenFiles(dir);
  }

  return loaded;
}

/**
 * Recursively scan a directory for *.tokens.ts files and require each.
 */
function scanForTokenFiles(dir: string): number {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== '__tests__' && entry.name !== 'node_modules') {
      count += scanForTokenFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.tokens.ts') && !entry.name.endsWith('.test.ts')) {
      require(fullPath);
      count++;
    }
  }

  return count;
}
```

**Glob pattern rationale**:
- `{tokenSource}/component/` scans `*.ts` — dedicated directory where ALL files are component tokens (e.g., `progress.ts`)
- `componentTokenDirs` scans `*.tokens.ts` — broader directories (e.g., `src/components/core/`) where only files with the `.tokens.ts` suffix are component token definitions

### 4. CLI Integration (`src/cli/designerpunk.ts`)

Updated `runGenerate()`:
```typescript
async function runGenerate() {
  const config = await loadConfig(process.cwd());
  const tokens = resolveTokens(config);

  // Load component tokens from local source when tokenSource is set
  if (config.tokenSourceMode === 'local') {
    const componentCount = loadComponentTokens(config);
    if (componentCount === 0) {
      console.warn(
        `⚠️  No component token files found.\n` +
        `   Searched: ${config.tokenSourceRoot}/component/\n` +
        `   And: ${config.componentTokenDirs.join(', ') || '(none configured)'}\n` +
        `   Component token output will be empty.\n` +
        `   Run \`npx designerpunk init\` to copy component tokens locally.\n`
      );
    }
  }

  // ... rest of generate (display, generateTokenFiles)
}
```

When `tokenSourceMode === 'package'`, component tokens continue loading via the existing mechanism (hardcoded imports in `scripts/generate-platform-tokens.ts` or the generator's internal path).

### 5. Init Updates (`src/cli/init.ts`)

#### Copy `src/types/`

Add after the token source copy:
```typescript
// 3b. Types (needed for token file type imports)
const typesResult = copyDir(
  path.join(pkgRoot, 'src/types'),
  path.join(dest, 'src/types'),
  { exclude: ['__tests__', 'generated'] },
);
reportCopy('type definitions', typesResult);
```

#### Remove `rewriteTypeImports` transform

The `transform: rewriteTypeImports` option on the token source copy is removed. With `src/types/` shipped alongside, relative `../types/` imports resolve naturally.

#### Extend transform for build imports (component token files only)

The component source copy gets a transform for build imports:
```typescript
// 4. Components (with build import transform)
if (!opts.skipComponents) {
  const compResult = copyDir(
    path.join(pkgRoot, 'src/components/core'),
    path.join(dest, 'src/components/core'),
    { exclude: ['__tests__'], transform: rewriteBuildImports },
  );
  reportCopy('starter components', compResult);
}
```

```typescript
/**
 * Rewrite build system imports to use @3fn/core/build package subpath.
 * Converts: import { defineComponentTokens } from '../../../build/tokens'
 * To:       import { defineComponentTokens } from '@3fn/core/build'
 */
function rewriteBuildImports(content: string): string {
  return content.replace(
    /from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens['"]/g,
    `from '@3fn/core/build'`
  );
}
```

Also apply to `src/tokens/component/` copy:
```typescript
// 3c. Component tokens within token source (also need build import transform)
const componentTokensResult = copyDir(
  path.join(pkgRoot, 'src/tokens/component'),
  path.join(dest, 'src/tokens/component'),
  { exclude: ['__tests__'], transform: rewriteBuildImports },
);
```

Wait — `src/tokens/component/` is already copied as part of step 3 (token source copy). The transform needs to apply selectively: build import rewriting for `src/tokens/component/` files, but NOT for `src/tokens/*.ts` (which shouldn't have build imports — the lint boundary enforces this).

**Revised approach**: Split the token source copy into two steps:
1. Copy `src/tokens/` (excluding `component/`) — no transform needed (types resolve via relative path)
2. Copy `src/tokens/component/` — with `rewriteBuildImports` transform

#### Update generated config

```typescript
function generateConfig(name: string, abbreviation: string): string {
  return `import { defineConfig } from '@3fn/core/config';
import { darkSemanticOverrides } from './src/tokens/themes/dark/SemanticOverrides.ts';
import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';

export default defineConfig({
  name: '${name}',
  abbreviation: '${abbreviation}',
  tokenSource: './src/tokens',
  componentTokens: ['./src/components/core', './src/tokens/component'],
  themes: [
    { name: 'dark', mode: 'dark', overrides: darkSemanticOverrides },
    { name: 'wcag', mode: 'light', overrides: wcagSemanticOverrides },
  ],
  output: './dist/tokens',
});
`;
}
```

### 6. Lint Boundary Test (`src/tokens/__tests__/portability-boundary.test.ts`) — NEW

```typescript
import * as fs from 'fs';
import * as path from 'path';

/**
 * Lint boundary: token source files may only import from:
 * - ../types/ or ../../types/ (type definitions)
 * - Other files within src/tokens/ (intra-source)
 * - @3fn/core/types (package subpath)
 * - node_modules packages
 *
 * Disallowed: ../constants/, ../../build/, ../../components/, or any
 * other src/ directory outside tokens/ and types/.
 */

const TOKEN_SOURCE_DIRS = [
  path.resolve(__dirname, '..'),           // src/tokens/*.ts
  path.resolve(__dirname, '../semantic'),   // src/tokens/semantic/*.ts
];

// Excluded from boundary (different authoring surface)
const EXCLUDED_DIRS = [
  path.resolve(__dirname, '../component'), // src/tokens/component/ — legitimately imports build
];

const FORBIDDEN_PATTERNS = [
  /from\s+['"]\.\.\/constants\//,
  /from\s+['"]\.\.\/\.\.\/constants\//,
  /from\s+['"]\.\.\/build\//,
  /from\s+['"]\.\.\/\.\.\/build\//,
  /from\s+['"]\.\.\/components\//,
  /from\s+['"]\.\.\/\.\.\/components\//,
  /require\(['"]\.\.\/constants\//,
  /require\(['"]\.\.\/\.\.\/build\//,
  /require\(['"]\.\.\/\.\.\/components\//,
];

function getTokenFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'))
    .map(f => path.join(dir, f));
}

describe('Token source portability boundary', () => {
  const files: string[] = [];
  for (const dir of TOKEN_SOURCE_DIRS) {
    files.push(...getTokenFiles(dir));
  }

  test.each(files)('%s has no forbidden imports', (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      expect(content).not.toMatch(pattern);
    }
  });
});
```

---

## Loading Sequence

The complete generation sequence when `tokenSource` is set:

1. `loadConfig()` → resolves `tokenSourceRoot`, `tokenSourceMode: 'local'`, `componentTokenDirs`
2. `resolveTokens(config)` → `require(tokenSourceRoot)` loads primitives, `require(tokenSourceRoot + '/semantic')` loads semantics. **Module cache populated with local primitive modules.**
3. `loadComponentTokens(config)` → discovers and `require()`s component token files. These files import primitives via relative paths → Node resolves to same absolute paths → **gets cached local modules**. `defineComponentTokens()` fires → `ComponentTokenRegistry` populated with local values.
4. `generateTokenFiles(tokens, config)` → generator reads `ComponentTokenRegistry.getAll()` for component tokens (local values), uses injected `tokens` for primitives/semantics (local values).

**All token tiers resolve from local source. No package fallback.**

---

## Directory Structure After Init

```
product-repo/
├── src/
│   ├── tokens/              ← primitive + semantic token definitions
│   │   ├── SpacingTokens.ts
│   │   ├── ColorTokens.ts
│   │   ├── ...
│   │   ├── semantic/
│   │   │   ├── ColorTokens.ts
│   │   │   └── ...
│   │   └── component/       ← family-shared component tokens
│   │       └── progress.ts  (imports rewritten: @3fn/core/build)
│   ├── types/               ← type definitions (read-only, from package)
│   │   ├── PrimitiveToken.ts
│   │   ├── SemanticToken.ts
│   │   └── index.ts
│   └── components/
│       └── core/
│           ├── Button-Icon/
│           │   └── buttonIcon.tokens.ts  (imports rewritten: @3fn/core/build)
│           └── ...
├── designerpunk.config.ts   ← tokenSource + componentTokens configured
└── .kiro/settings/mcp.json
```

Relative import resolution:
- `src/tokens/SpacingTokens.ts` → `from '../types/PrimitiveToken'` → resolves to `src/types/PrimitiveToken.ts` ✅
- `src/tokens/semantic/ColorTokens.ts` → `from '../../types/SemanticToken'` → resolves to `src/types/SemanticToken.ts` ✅
- `src/tokens/component/progress.ts` → `from '../../tokens/SpacingTokens'` → resolves to `src/tokens/SpacingTokens.ts` ✅
- `src/components/core/Button-Icon/buttonIcon.tokens.ts` → `from '../../../tokens/SpacingTokens'` → resolves to `src/tokens/SpacingTokens.ts` ✅

---

## Design Decisions

### Decision 1: Split Token Source Copy in Init

**Problem**: `src/tokens/component/` needs the `rewriteBuildImports` transform, but `src/tokens/*.ts` does not.

**Decision**: Split into two copy operations:
- `copyDir(src/tokens, dest/src/tokens, { exclude: ['__tests__', 'component'] })` — no transform
- `copyDir(src/tokens/component, dest/src/tokens/component, { exclude: ['__tests__'], transform: rewriteBuildImports })` — with transform

**Rationale**: Simpler than conditional transform logic. Each copy has clear, uniform behavior.

### Decision 2: `loadComponentTokens` Uses `require()` Not Dynamic Import

**Decision**: Use synchronous `require()` for component token loading.

**Rationale**: Component token files execute `defineComponentTokens()` as a side effect. `require()` is synchronous and guarantees the registry is populated before `generateTokenFiles()` is called. Dynamic `import()` would require awaiting each file and adds async complexity for no benefit.

### Decision 3: Warning Not Error for Missing Component Tokens

**Decision**: When `tokenSource` is set but no component token files are found, emit a warning and continue (with empty component token output).

**Rationale**: A developer may legitimately set `tokenSource` to iterate on primitives/semantics without having copied component tokens yet. An error would block generation entirely. A warning informs without blocking.

---

## Testing Strategy

### Unit Tests
- `loadComponentTokens`: Mock filesystem, verify glob patterns, verify require calls
- `rewriteBuildImports`: Test regex against known import patterns
- Lint boundary test: Verify all token source files pass

### Integration Tests
- End-to-end: set `tokenSource`, edit a primitive value, verify component token output reflects the change
- Init: verify directory structure, verify transforms applied correctly

### Regression Safety
- Token values before and after refactoring must be identical (Req 1 AC 4)
- `ProductRepoSimulation` tests continue passing
- Existing `npm test` suite passes (328 suites)
