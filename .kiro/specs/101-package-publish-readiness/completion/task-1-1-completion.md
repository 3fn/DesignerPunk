# Task 1.1 Completion: Update Package Name References in Source Code

**Date**: 2026-05-06
**Task**: 1.1 Update package name references in source code
**Type**: Implementation
**Status**: Complete (includes mid-execution scope extension)

---

## Artifacts Created

No new files. Modified 10 source files across two execution passes.

### Pass 1 — Originally Scoped (7 files, 8 edits) — Commit `64249172`

- `src/cli/init.ts:43` — generated `.npmrc` scope string (`@designerpunk:registry` → `@3fn:registry`)
- `src/cli/init.ts:189` — generated `designerpunk.config.ts` import path (`@designerpunk/core/config` → `@3fn/core/config`)
- `src/config/defineConfig.ts:4, 10` — JSDoc comments and `@example` block
- `src/generators/BlendUtilityGenerator.ts:57` — emits JSDoc header into generated blend utility files (`@designerpunk/tokens` → `@3fn/core/blend`)
- `src/blend/ThemeAwareBlendUtilities.web.ts:284` — JSDoc example (`@designerpunk/tokens/ThemeAwareBlendUtilities` → `@3fn/core/blend`)
- `src/components/core/Button-VerticalList-Item/README.md:111` — import example (`@designerpunk/components/Button-VerticalList-Item` → `@3fn/core/components`)
- `src/components/core/Button-VerticalList-Set/README.md:106` — import example (same normalization)
- `src/components/core/Icon-Base/README.md:42` — import example (`@designerpunk/components` → `@3fn/core/components`)

### Pass 2 — Extension (4 files, 14 edits) — Commit `930acdfc`

Surfaced by the drift detection script (Task 1.7) when it first ran against the live repo. R1 review had missed these because the MCP `grep` tool returned "No matches found" for patterns that raw shell `grep -rn` found. Peter authorized mid-execution scope expansion.

- `src/build/platforms/WebBuilder.ts:128` — **LIVE functional code**: `packageName: '@designerpunk/tokens'` config default (changed to `'@3fn/core'`). `TokenFileGenerator.ts:1451` requires `WebBuilder` dynamically at runtime, so this is not dead scaffolding — it determines the package name written into Web NPM package output.
- `src/build/__tests__/WebNPMPackageStructure.test.ts:137` — test fixture aligned with `WebBuilder`'s new default.
- `src/build/validation/__tests__/WebBuildValidator.test.ts` — 10 test fixture references (lines 49, 73, 86, 109, 121, 241, 260, 342, 388, 430) updated via `sed -i '' "s|'@designerpunk/tokens'|'@3fn/core'|g"` for deterministic bulk replacement.
- `src/build/workflow/README.md:20, 208` — documentation import examples. Scope corrected (`@designerpunk/build` → `@3fn/core/build`) with subpath structure preserved for author intent.

**Total for Task 1.1**: 10 files, 22 references reconciled.

---

## Implementation Details

### Approach

**Targeted `strReplace` for most edits**: Each reference was replaced using exact surrounding context rather than bulk find-replace. Rationale: ensures no unintended matches in prose or code comments that happened to contain the string. For small scopes (most files had 1–2 references), targeted replacement is more auditable than bulk.

**`sed` for repetitive test fixtures**: The `WebBuildValidator.test.ts` extension had 10 identical `'@designerpunk/tokens'` references as test fixture values — all semantically equivalent and appropriate for bulk replacement. Used `sed -i ''` (BSD sed, macOS default) for deterministic single-pass replacement. Verified result with `grep -c '@3fn/core' src/build/validation/__tests__/WebBuildValidator.test.ts` → 10 matches (expected).

### Key Decisions

**Orphan-scope normalization strategy** — When replacing `@designerpunk/tokens` and `@designerpunk/components` (scope names for a multi-package architecture that never shipped), chose subpaths that map to the current single-package `exports` map:

- `@designerpunk/tokens` → `@3fn/core/blend` (the blend module is where `BlendTokens` and blend utilities live; `./blend` is a valid subpath in the current `exports` map)
- `@designerpunk/tokens/ThemeAwareBlendUtilities` → `@3fn/core/blend` (consolidated into the blend subpath)
- `@designerpunk/components/<Specific-Component>` → `@3fn/core/components` (individual-component subpaths were never in the exports map; only the bundled `./components` subpath exists)

This preserves the spirit of the original imports (they wanted to import token/component APIs) while aligning with what consumers can actually import today.

**`@designerpunk/build` → `@3fn/core/build`** — Preserves subpath structure even though `./build` is NOT currently in the `exports` map. The `build/workflow/README.md` file is a developer-facing README for the build module itself, not consumer-facing docs. The import examples are aspirational — they demonstrate usage if the build module were exposed. Scope correction without subpath rewrite keeps the doc's intent coherent and defers the "should `./build` be exposed?" question to a follow-up spec.

**Mid-execution scope extension** — The Pass 2 references were uncovered by Task 1.7's drift script running for the first time against the live repo. Two options: (A) extend Task 1.1 to reconcile them, or (B) defer to a separate task/spec. Chose A after Peter's authorization because the references were legitimately in-scope per design-outline.md § "Scope > In scope" items 1 and 4 — the R1 file list was meant to be exhaustive but wasn't. The `1.1 Extension` commit naming preserves the distinction in git history.

### Integration Points

- **WebBuilder.ts:128 change affects runtime output**: Before this change, any code path that invoked `WebBuilder` would produce a Web NPM package with `name: "@designerpunk/tokens"` in its package.json. That package name doesn't exist in any registry, so consumers of the Web build would encounter a broken `package.json`. Post-change, it produces `"name": "@3fn/core"` — consistent with the published single package.
- **BlendUtilityGenerator.ts:57 change affects generated files**: The JSDoc header is emitted into every `dist/blend/*.js` generated file. Before the change, consumers reading the generated file's header would see broken import examples. Post-change, the examples reference the valid `@3fn/core/blend` subpath.
- **No interface or schema changes**: All edits were string-level replacements inside comments, JSDoc, test fixtures, config values, and import examples. No component APIs, generator interfaces, or consumer-facing contracts changed.

---

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ TypeScript compilation: `npm run build` completes without errors
- ✅ JSDoc syntax: all `@example` blocks and inline JSDoc remain syntactically valid
- ✅ Markdown rendering: component README code blocks preserved (triple-backtick fences, language annotations, import statements)
- ✅ `.npmrc` generated format: generated `@3fn:registry=...` line uses correct scope-registration syntax

### Functional Validation
- ✅ Full test suite: `npm test` → 326 suites / 8,289 tests passing (Pass 1)
- ✅ Full test suite after Extension: `npm test` → 326 suites / 8,289 tests passing (Pass 2 pre-retirement-of-pre-migration-regression)
- ✅ Verification grep: `grep -rn '@designerpunk' src/` → zero results after both passes
- ✅ Drift detection script: passes cleanly against `src/` after both passes

### Integration Validation
- ✅ `init.ts` runtime flow: `npx designerpunk init` would produce `.npmrc` with correct `@3fn:registry` scope + `designerpunk.config.ts` with correct `@3fn/core/config` import (verified via code inspection; end-to-end will run in Task 2.3)
- ✅ `BlendUtilityGenerator` runtime flow: next `npm run build` will regenerate `dist/blend/*.js` files with corrected JSDoc header (verified in Task 1.6 rebuild)
- ✅ `WebBuilder` runtime flow: dynamic require from `TokenFileGenerator.ts:1451` still works; `packageName` config value correctly set to `@3fn/core`

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 1 (functional source code files): addressed for all listed files plus Extension files
- ✅ Design Outline § "Scope > In scope" item 4 (orphan multi-package references `@designerpunk/tokens`, `@designerpunk/components`): addressed and extended to include the `@designerpunk/build` orphan scope discovered during execution
- ✅ Tasks.md § "1.1 > Validation > Verification": `grep -rn '@designerpunk' src/` returns zero hits

---

## Notes

**Why R1 missed Pass 2 files**: The MCP `grep` tool returned "No matches found" for `@designerpunk` in `src/` during R1 review. Raw shell `grep -rn '@designerpunk' src/` during Task 1.7 execution found all matches. The discrepancy could not be fully diagnosed — possibly a file-filter interaction or indexing lag. Lesson documented in the Parent 1 completion doc: treat direct filesystem traversal as authoritative for completeness-critical audits; MCP grep is convenience, not authority.

**Why the 1.1 Extension wasn't a separate subtask**: The Extension work is semantically part of 1.1 (same kind of work, same track, same governance — reconciling orphan-scope source references). Creating a "1.1 Extension" as a sibling of 1.1 in tasks.md would have been artificial. Tracking it as a scope extension to 1.1 with a distinct git commit preserves clarity in history without fragmenting task structure.

**The `@designerpunk/build` discovery**: Task 1.1's original R1 scope flagged `@designerpunk/tokens` and `@designerpunk/components` as orphan scopes. During Extension execution, `@designerpunk/build` was discovered in `src/build/workflow/README.md` — a fourth orphan scope my R1 didn't anticipate. Added to the drift script's `PACKAGE_NAMES` list (Task 1.7) so future drift of this scope is caught.
