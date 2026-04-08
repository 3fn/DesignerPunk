# Requirements Document: Ecosystem Package Assembly

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Status**: Requirements Phase
**Dependencies**: Spec 094 (complete)

---

## Introduction

Spec 094 made the token pipeline portable and the theme system extensible. This spec packages everything into `@designerpunk/core` — the full design system ecosystem as an installable npm package. Two workstreams: WS2 (package assembly, publish, validation) and WS6 (agent configurations and documentation for product context).

---

## Requirements

### Requirement 1: Package Identity

**User Story**: As a product developer, I want to install DesignerPunk as a scoped npm package so that it's clearly identified as a dependency in my project.

#### Acceptance Criteria

1. WHEN the package is published THEN its name SHALL be `@designerpunk/core`
2. WHEN a product developer runs `npm install @designerpunk/core` THEN the package SHALL install successfully from GitHub Packages
3. WHEN the package is installed THEN it SHALL include the full ecosystem (pipeline source, components, governance, agents, MCP servers, generated outputs) as defined in the design outline § "What Ships"

---

### Requirement 2: Package Contents (Allowlist)

**User Story**: As a package maintainer, I want an explicit allowlist of shipped files so that internal development artifacts never leak into the published package.

#### Acceptance Criteria

1. WHEN `package.json` is configured THEN it SHALL have a `files` field listing all shipped directories and files
2. WHEN `npm pack` is run THEN the tarball SHALL contain only files matching the `files` allowlist
3. WHEN `npm pack` is run THEN the tarball SHALL NOT contain: `.kiro/specs/`, `.kiro/issues/`, `docs/roadmap/`, `docs/specs/`, `docs/releases/`, `demos/`, `**/examples/`, `strategic-framework/`, `preserved-knowledge/`, `scripts/`, `dist/browser/*.map`, `dist/browser/designerpunk.umd.*`, `dist/browser/*.html`, `dist/browser/demo-styles.css`, `dist/__tests__/`, `dist/android/`, `dist/ios/`, `peter-michaels-allen-resume.json`
4. WHEN a new directory is added to the repo THEN it SHALL NOT appear in the package unless explicitly added to the `files` field

---

### Requirement 3: Export Map

**User Story**: As a web developer consuming DesignerPunk, I want clear import paths so that my bundler resolves the correct files.

#### Acceptance Criteria

1. WHEN `import '@designerpunk/core'` is used THEN it SHALL resolve to the ESM web component bundle (`dist/browser/designerpunk.esm.js`)
2. WHEN `import '@designerpunk/core/components'` is used THEN it SHALL resolve to the same ESM bundle (alias)
3. WHEN `import '@designerpunk/core/tokens.css'` is used THEN it SHALL resolve to `dist/DesignTokens.web.css`
4. WHEN `import '@designerpunk/core/component-tokens.css'` is used THEN it SHALL resolve to `dist/ComponentTokens.web.css`
5. WHEN `import { defineConfig } from '@designerpunk/core/config'` is used THEN it SHALL resolve to compiled JS with `.d.ts` type declarations at `dist/config/`
6. WHEN `import from '@designerpunk/core/blend'` is used THEN it SHALL resolve to `dist/blend/index.js`
7. WHEN `import '@designerpunk/core/grid.css'` is used THEN it SHALL resolve to `src/styles/responsive-grid.css`
8. WHEN `import '@designerpunk/core/fonts/inter.css'` or `import '@designerpunk/core/fonts/rajdhani.css'` is used THEN it SHALL resolve to the corresponding font CSS file
9. WHEN the package is consumed THEN there SHALL be no `./BlendUtilities` export (legacy, removed)
10. WHEN the root export is consumed via `require()` THEN there SHALL be no CJS condition — ESM only

---

### Requirement 4: Build Step for Config Module

**User Story**: As a product developer importing `defineConfig`, I want compiled JavaScript with type declarations so that my TypeScript tooling provides autocompletion and type checking.

#### Acceptance Criteria

1. WHEN `npm run build` is run THEN `src/config/` SHALL compile to `dist/config/` with `.js` and `.d.ts` files
2. WHEN a product developer imports `@designerpunk/core/config` THEN TypeScript SHALL resolve the `DesignerPunkConfig` interface and `defineConfig` function types
3. WHEN the build completes THEN `dist/config/index.js` and `dist/config/index.d.ts` SHALL exist

---

### Requirement 5: CLI Commands

**User Story**: As a product developer, I want CLI commands to run the pipeline and start MCP servers from my project root without knowing the package's internal file structure.

#### Acceptance Criteria

1. WHEN `npx designerpunk generate` is run from a product repo THEN the token pipeline SHALL execute using the local `designerpunk.config.ts`
2. WHEN `npx designerpunk mcp:app` is run THEN the Application MCP server SHALL start, resolving data paths from the installed package via `require.resolve`
3. WHEN `npx designerpunk mcp:docs` is run THEN the Docs MCP server SHALL start, resolving steering doc paths from the installed package
4. WHEN an MCP server starts THEN it SHALL print connection details (protocol, data directory) to the console
5. WHEN no `designerpunk.config.ts` exists THEN MCP commands SHALL still work using default paths from the installed package
6. WHEN `package.json` is configured THEN it SHALL have a `bin` field mapping `"designerpunk"` to `"./dist/cli/designerpunk.js"`

---

### Requirement 6: Runtime Dependencies

**User Story**: As a product developer, I want the pipeline to work after install without additional setup for TypeScript execution.

#### Acceptance Criteria

1. WHEN the package is installed THEN `tsx` SHALL be available as a dependency (not a peer dependency)
2. WHEN `npx designerpunk generate` is run THEN the entire pipeline chain (config loading → token resolution → platform generation) SHALL execute via `tsx` without the product needing to install `ts-node` or any other TypeScript loader

---

### Requirement 7: Build-Time Validation Test

**User Story**: As a package maintainer, I want automated validation that platform files reference real tokens and all web components are in the bundle so that drift is caught before publish.

#### Acceptance Criteria

1. WHEN the validation test runs THEN it SHALL cross-reference all `DesignTokens.*` usages AND `theme.*` usages in iOS platform files against the generated `DesignTokens.ios.swift` and the theme protocol property names
2. WHEN the validation test runs THEN it SHALL cross-reference all `DesignTokens.*` usages AND `theme.*` usages in Android platform files against the generated `DesignTokens.android.kt` and the theme data class property names
3. WHEN the validation test runs THEN it SHALL verify all components with `platforms/web/` directories are registered in `browser-entry.ts`
4. WHEN a platform file references a token that doesn't exist in the generated output THEN the test SHALL fail with the component name, file path, and invalid reference
5. WHEN a component has a web implementation but is missing from `browser-entry.ts` THEN the test SHALL fail with the component name

---

### Requirement 8: Cleanup

**User Story**: As a package maintainer, I want legacy and duplicate artifacts removed so that the package is clean and unambiguous.

#### Acceptance Criteria

1. WHEN the package is published THEN `dist/android/` (duplicate of `dist/DesignTokens.android.kt`) SHALL NOT exist
2. WHEN the package is published THEN `dist/ios/` (duplicate of `dist/DesignTokens.ios.swift`) SHALL NOT exist
3. WHEN the exports map is defined THEN `./BlendUtilities` SHALL NOT be present
4. WHEN the root export is defined THEN it SHALL NOT have a `require` condition pointing to `TokenEngine.js`

---

### Requirement 9: Publish and Validation

**User Story**: As a product developer, I want to verify that the published package works end-to-end in a fresh project.

#### Acceptance Criteria

1. WHEN the package is published to GitHub Packages THEN `npm install @designerpunk/core` SHALL succeed in a fresh repo
2. WHEN all exports are tested in the fresh repo THEN each SHALL resolve to the correct file
3. WHEN `npx designerpunk generate` is run in the fresh repo with a test `designerpunk.config.ts` THEN it SHALL produce themed token output
4. WHEN `npx designerpunk mcp:app` is run in the fresh repo THEN the Application MCP SHALL start and respond to queries
5. WHEN the ESM bundle is imported THEN all 34 web components SHALL register as custom elements

---

### Requirement 10: Agent Configuration Template

**User Story**: As a product team setting up DesignerPunk, I want a working set of agent prompts pre-configured for the installed package context so that agents work immediately without manual path editing.

#### Acceptance Criteria

1. WHEN the package ships THEN it SHALL include agent prompts for all 8 agents (Ada, Lina, Thurgood, Leonardo, Sparky, Kenya, Data, Stacy)
2. WHEN a product copies the agent configuration template THEN MCP queries, knowledge base paths, and file references SHALL resolve against the installed package location, not hardcoded repo paths
3. WHEN a product customizes the template THEN the Integration Guide SHALL document which fields to change (product name, domain-specific knowledge, product-specific MCP data)

---

### Requirement 11: Integration Guide

**User Story**: As a product developer, I want a complete setup guide so that I can go from `npm install` to a working development environment without guessing.

#### Acceptance Criteria

1. WHEN the Integration Guide is complete THEN it SHALL cover the full product setup loop: install → config → MCP servers → agent connections → verify → explore component catalog → generate → build
2. WHEN a web developer reads the guide THEN it SHALL include web-specific instructions (ESM imports, CSS token loading, `data-theme` usage)
3. WHEN an iOS developer reads the guide THEN it SHALL include iOS-specific instructions (where to find Swift files, manual copy into Xcode, minimum deployment target 17.0+, required frameworks SwiftUI/UIKit, note that `sync:ios` is coming in M0b)
4. WHEN an Android developer reads the guide THEN it SHALL include Android-specific instructions (where to find Kotlin files, manual copy into Gradle module, minimum Compose BOM version, R8/ProGuard considerations, note that `sync:android` is coming in M0b)
5. WHEN the guide documents MCP server startup THEN it SHALL include the full loop: start server → configure agent connection → verify with a test query
6. WHEN the guide documents the "explore" step THEN it SHALL include example MCP queries (`get_component_catalog`, `find_components`, `list_experience_patterns`) demonstrating the ecosystem's capabilities

---

## Documentation Requirements

1. The Integration Guide (Requirement 11) serves as the primary developer-facing documentation
2. The `defineConfig` API has JSDoc comments (shipped from Spec 094)
3. Agent configuration template includes inline comments explaining customization points

**Waiver**: No component README or token family documentation changes — this spec modifies packaging and configuration, not components or tokens.

---

## Deferred Items

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| `npx designerpunk sync:ios` | Manual copy documented for M0a | M0b iOS activation |
| `npx designerpunk sync:android` | Manual copy documented for M0a | M0b Android activation |
| Kotlin package namespace from config | `com.designerpunk.*` hardcoded, manual refactor after copy | M0b Android activation |
| Swift Package generation for local SPM | File copy for M0a, SPM for M0b | M0b iOS activation |
| Compose BOM version documentation | Integration Guide item for M0b | M0b Android activation |
| R8/ProGuard keep rules | Integration Guide item for M0b | M0b Android activation |
| iOS framework dependency metadata | Needed when sync generates `Package.swift` | M0b iOS activation |
| Tree-shaking / individual component exports | Full bundle for M0a | M0b scoping |
| Personal Note template | Only one customer right now | Second human customer |
| Exclude "A Vision of the Future.md" | Peter's philosophical foundation | Second human customer |
