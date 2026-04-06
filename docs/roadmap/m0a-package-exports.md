# M0a Package Exports — Minimal Viable Package for Web

**Date**: 2026-04-05
**Purpose**: Define what the marketing site needs to import from DesignerPunk as a package
**Status**: Draft — needs validation during M0a

---

## What the Marketing Site Imports

M0a is web-only. The package needs to expose:

### 1. Token CSS
```js
import 'designerpunk/tokens.css'           // All design tokens as CSS custom properties
import 'designerpunk/component-tokens.css'  // Component-level tokens
```
**Source**: `dist/DesignTokens.web.css`, `dist/ComponentTokens.web.css`

### 2. Web Components (ESM bundle)
```js
import 'designerpunk/components'  // Registers all Web Components
```
**Source**: `dist/browser/designerpunk.esm.js`

### 3. Blend Utilities (if needed)
```js
import { applyBlend } from 'designerpunk/blend'
```
**Source**: `dist/blend/index.js`

### 4. Responsive Grid
```js
import 'designerpunk/grid.css'
```
**Source**: `src/styles/responsive-grid.css`

### 5. Fonts
```js
import 'designerpunk/fonts/inter.css'
import 'designerpunk/fonts/rajdhani.css'
```
**Source**: `src/assets/fonts/inter/inter.css`, `src/assets/fonts/rajdhani/rajdhani.css`

---

## Proposed package.json exports

```json
{
  "name": "@designerpunk/core",
  "version": "10.2.0",
  "exports": {
    ".": {
      "import": "./dist/browser/designerpunk.esm.js",
      "types": "./dist/TokenEngine.d.ts"
    },
    "./tokens.css": "./dist/DesignTokens.web.css",
    "./component-tokens.css": "./dist/ComponentTokens.web.css",
    "./components": "./dist/browser/designerpunk.esm.js",
    "./blend": {
      "import": "./dist/blend/index.js",
      "types": "./dist/blend/index.d.ts"
    },
    "./grid.css": "./src/styles/responsive-grid.css",
    "./fonts/inter.css": "./src/assets/fonts/inter/inter.css",
    "./fonts/rajdhani.css": "./src/assets/fonts/rajdhani/rajdhani.css"
  },
  "files": [
    "dist/DesignTokens.web.css",
    "dist/ComponentTokens.web.css",
    "dist/browser/designerpunk.esm.js",
    "dist/browser/designerpunk.esm.min.js",
    "dist/browser/tokens.css",
    "dist/blend/",
    "dist/TokenEngine.js",
    "dist/TokenEngine.d.ts",
    "dist/browser-entry.js",
    "dist/browser-entry.d.ts",
    "src/styles/responsive-grid.css",
    "src/assets/fonts/"
  ]
}
```

---

## What's NOT in the package (M0a)

- iOS/Android token files (not needed for web-only)
- iOS/Android component implementations
- Token source files (`src/tokens/*.ts`)
- Build pipeline, generators, validators
- Test files
- Release tooling
- MCP servers (run separately from DesignerPunk repo)
- Steering docs (served via Docs MCP)
- Component metadata, contracts, schemas (served via Application MCP)

---

## MCP Servers — Run Separately

For M0a, MCP servers continue to run from the DesignerPunk repo:
```bash
# From DesignerPunk repo
npx ts-node mcp-server/src/index.ts              # Docs MCP
npx ts-node application-mcp-server/src/index.ts   # Application MCP
```

The marketing site repo doesn't need MCP server code — agents connect to the running servers.

---

## Publishing Approach (Option 4 — GitHub Package)

```bash
# From DesignerPunk repo
npm pack                          # Creates designerpunk-10.2.0.tgz
# OR
npm publish --registry https://npm.pkg.github.com  # GitHub Packages
```

Marketing site installs:
```bash
npm install designerpunk@10.2.0   # From GitHub Packages
# OR
npm install ./path/to/designerpunk-10.2.0.tgz  # From local tarball
```

---

## Decisions

1. **Scoped package: `@designerpunk/core`** — leaves room for `@designerpunk/ios`, `@designerpunk/android` later. M0b may start on iOS, so the scoped structure matters.
2. **Fonts bundled in package** — simpler for M0a, avoids CDN dependency.
3. **Full bundle for M0a, tree-shaking noted for M0b** — individual component exports add packaging complexity that distracts from the consumption workflow learning goal. When M0b introduces iOS (Swift Package Manager), the multi-platform packaging structure changes fundamentally — tree-shaking work is better done then.
