# Implementation Plan: Ecosystem Package Assembly

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Status**: Implementation Planning
**Dependencies**: Spec 094 (complete)

---

## Implementation Sequence

Two workstreams:

1. **WS2**: Package assembly — build steps, package.json, validation, publish (Lina + Ada)
2. **WS6**: Agent configurations and documentation for product context (Thurgood)

WS2 has internal sequencing: build steps → package.json → validation test → npm pack → publish → fresh-repo validation. WS6 can run in parallel with WS2's later tasks.

---

## Task List

- [ ] 1. Build Steps for Consumer Entry Points

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Ada

  - Add build step for `dist/config/` — compile `src/config/` to JS with `.d.ts` type declarations. Include theme types in compilation chain so `ConfigTheme` and `ThemeMode` resolve.
  - Add build step for `dist/cli/designerpunk.js` — compile `src/cli/designerpunk.ts` to JS. Currently only Figma CLI tools exist in `dist/cli/`.
  - Verify `"type": "module"` compatibility — check if adding this to package.json breaks existing CJS `require()` calls in tests or build scripts. If it does, resolve or defer.
  - Add both build steps to `npm run build` pipeline (must complete before `npm pack`)
  - Verify `dist/config/index.js`, `dist/config/index.d.ts`, `dist/cli/designerpunk.js` all exist after build
  - _Requirements: R4 AC 1-3, R5 AC 6_

---

- [ ] 2. Package.json Restructuring

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Lina

  **Success Criteria:**
  - Package named `@designerpunk/core`
  - All exports resolve to correct files
  - `files` field allowlists only intended content
  - `bin` field enables `npx designerpunk` commands
  - Legacy exports removed
  - Duplicate token files cleaned up

  **Primary Artifacts:**
  - Modified `package.json`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/095-ecosystem-package-assembly/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/095-ecosystem-package-assembly/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Package.json Restructuring"`
  - Verify on GitHub

  - [x] 2.1 Rename package and define `files` field
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Rename `name` to `@designerpunk/core`
    - Define `files` allowlist — `src/` (including tests, excluding nothing for simplicity per Ada/Lina feedback), `dist/` selective entries, `.kiro/steering/`, `.kiro/agents/`, MCP servers, MCP data, `browser-entry.ts`, `designerpunk.config.ts`, `family-registry.yaml`
    - Accept `examples/` shipping (~1MB, harmless) — simplifies `files` to `"src/"` without exclusion patterns
    - _Requirements: R1 AC 1, R2 AC 1-4_

  - [x] 2.2 Define exports map
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Root (`.`): ESM-only → `dist/browser/designerpunk.esm.js`
    - `./components`: alias for root
    - `./tokens.css`: → `dist/DesignTokens.web.css` (not `dist/browser/tokens.css`)
    - `./component-tokens.css`: → `dist/ComponentTokens.web.css`
    - `./config`: → `dist/config/index.js` with types (depends on Task 1)
    - `./blend`: → `dist/blend/index.js`
    - `./grid.css`: → `src/styles/responsive-grid.css`
    - `./fonts/inter.css`, `./fonts/rajdhani.css`: → font CSS files
    - Remove `./BlendUtilities` (legacy, points at raw `.ts`)
    - Remove CJS `require` condition on root export
    - _Requirements: R3 AC 1-10, R8 AC 3-4_

  - [x] 2.3 Add `bin` and `tsx` dependency
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `"bin": { "designerpunk": "./dist/cli/designerpunk.js" }` (depends on Task 1)
    - Add `tsx` to `dependencies` (not devDependencies — runtime pipeline dependency)
    - _Requirements: R5 AC 6, R6 AC 1-2_

  - [ ] 2.4 Cleanup duplicates
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Remove `dist/android/` directory (duplicate of `dist/DesignTokens.android.kt`)
    - Remove `dist/ios/` directory (duplicate of `dist/DesignTokens.ios.swift`)
    - _Requirements: R8 AC 1-2_

---

- [ ] 3. CLI MCP Commands

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Ada

  - Implement `mcp:app` subcommand — resolve Application MCP data paths from installed package via `require.resolve`, start server, print connection details (protocol, data directory, ready status)
  - Implement `mcp:docs` subcommand — resolve Docs MCP steering doc paths from installed package, start server, print connection details
  - Add cwd fallback for repo context — when `require.resolve` fails (running from DesignerPunk repo, not installed package), fall back to cwd-relative paths. Same pattern as ConfigLoader.
  - Zero-config default: package paths. Config file override: custom data directories.
  - _Requirements: R5 AC 1-5_

---

- [ ] 4. Build-Time Validation Test

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Lina

  - Create `src/__tests__/package-drift-validation.test.ts`
  - **Platform token references**: scan iOS `.swift` files for `DesignTokens.*` and `theme.*` patterns, validate against generated `DesignTokens.ios.swift` and theme protocol property names. Same for Android `.kt` files against `DesignTokens.android.kt` and theme data class properties.
  - **ESM bundle registration**: list all `src/components/core/*/platforms/web/` directories, parse `browser-entry.ts` imports, assert every web component is registered
  - On failure: report component name, file path, and invalid reference or missing registration
  - Run as part of `npm test`
  - _Requirements: R7 AC 1-5_

---

- [ ] 5. Publish and End-to-End Validation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Lina

  **Success Criteria:**
  - Package published to GitHub Packages
  - Fresh repo installs successfully
  - All exports resolve
  - CLI commands work
  - 34 web components register

  **Completion Documentation:**
  - Detailed: `.kiro/specs/095-ecosystem-package-assembly/completion/task-5-parent-completion.md`
  - Summary: `docs/specs/095-ecosystem-package-assembly/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Publish and Validation"`
  - Verify on GitHub

  - [ ] 5.1 npm pack dry run
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Run `npm pack --dry-run`, capture file list
    - Assert no excluded paths (`.kiro/specs/`, `.kiro/issues/`, `docs/roadmap/`, `docs/specs/`, `docs/releases/`, `demos/`, `strategic-framework/`, `preserved-knowledge/`, `scripts/`, `dist/browser/*.map`, `dist/browser/designerpunk.umd.*`, `dist/browser/*.html`, `dist/browser/demo-styles.css`, `dist/__tests__/`, `dist/android/`, `dist/ios/`, `peter-michaels-allen-resume.json`)
    - Assert all expected paths present
    - _Requirements: R2 AC 2-3, R9 AC 1_

  - [ ] 5.2 Publish to GitHub Packages
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - `npm publish --registry https://npm.pkg.github.com`
    - Verify package appears in GitHub Packages
    - _Requirements: R1 AC 2_

  - [ ] 5.3 Fresh-repo install and export validation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create temp directory, `npm init`, install `@designerpunk/core`
    - Verify each export resolves: root, `./components`, `./tokens.css`, `./component-tokens.css`, `./config`, `./blend`, `./grid.css`, `./fonts/inter.css`, `./fonts/rajdhani.css`
    - Verify `import { defineConfig } from '@designerpunk/core/config'` provides TypeScript types
    - Import ESM bundle, verify 34 custom elements defined
    - _Requirements: R3 AC 1-8, R9 AC 1-2, R9 AC 5_

  - [ ] 5.4 CLI validation in fresh repo
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `designerpunk.config.ts` with test theme in fresh repo
    - Run `npx designerpunk generate` — verify themed output produced
    - Run `npx designerpunk mcp:app` — verify server starts, responds to health check
    - Run `npx designerpunk mcp:docs` — verify server starts, responds to document query
    - _Requirements: R5 AC 1-5, R9 AC 3-4_

---

- [ ] 6. Agent Configuration Template (WS6)

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Thurgood

  - Create product-context agent configuration template — all 8 agent prompts pre-configured for installed package context
  - MCP-only approach: template prompts use MCP queries for all design system knowledge, no `fs_read` fallbacks to package internals (Leo + Lina + Stacy consensus)
  - Package path references resolve via MCP servers (which resolve paths internally), not hardcoded `node_modules` paths
  - Placeholder values for product customization: product name, abbreviation, domain-specific knowledge
  - Document which fields to customize in the Integration Guide
  - _Requirements: R10 AC 1-3_

---

- [ ] 7. Integration Guide and Documentation (WS6)

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Thurgood

  - Finalize Integration Guide (`docs/roadmap/integration-guide-draft.md` → `.kiro/steering/DesignerPunk-Integration-Guide.md`)
  - Full product setup loop: install → config → MCP servers → agent connections → verify → explore component catalog → generate → build
  - **Explore step**: example MCP queries (`get_component_catalog`, `find_components`, `list_experience_patterns`) demonstrating ecosystem capabilities
  - **Web section**: ESM imports, CSS token loading, `data-theme` usage
  - **iOS section**: where to find Swift files in package, manual copy into Xcode, minimum deployment target (17.0+), required frameworks (SwiftUI, UIKit), note `sync:ios` coming in M0b
  - **Android section**: where to find Kotlin files, manual copy into Gradle module, minimum Compose BOM version, R8/ProGuard considerations, note `sync:android` coming in M0b
  - **MCP startup**: full loop — start server → configure agent connection → verify with test query
  - **Agent setup**: copy template, customize product fields, connect to MCP servers
  - Document target native sync model for M0b (Data R1, Kenya R1 reference)
  - Document knowledge base setup for product repos
  - Move to `.kiro/steering/` for Docs MCP serving
  - _Requirements: R11 AC 1-6_

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 7 Complete: Integration Guide and Documentation"`
  - Verify on GitHub
