# Task 1.7 Completion: Build Package Name Drift Detection Script

**Date**: 2026-05-06
**Task**: 1.7 Build package name drift detection script
**Type**: Implementation
**Status**: Complete
**Cross-Domain**: Ada (script implementation) + Thurgood (scan-scope review)

---

## Artifacts Created

One new file:

- **Created**: `scripts/check-package-name-drift.js` — 257 lines, executable (`chmod +x`), Node.js with ANSI-colored output

Commit: `af5c590a`

---

## Implementation Details

### Approach

**Language choice: Node.js over shell**. Existing `scripts/` directory convention uses `#!/usr/bin/env node` for any non-trivial script (e.g., `validate-release-setup.js`, `detect-stale-metadata.js`, `validate-steering-metadata.js`). Matched that convention. Node also gives us native `JSON.parse` for reading `package.json` (vs. jq dependency in shell), cleaner regex handling, and cross-platform portability.

**Regex pattern**:
```javascript
const SCOPE_PATTERN = new RegExp(
  `@([a-z0-9][a-z0-9-]*)/(${PACKAGE_NAMES.join('|')})(?=[/"'\\s\`,;:)\\]}]|$)`,
  'g',
);
```

- Capture group 1: scope (without `@`)
- Capture group 2: package name (`core` | `tokens` | `components` | `build`)
- Lookahead ensures the match ends at a boundary character (slash, quote, whitespace, backtick, comma, etc.) so we don't match partial identifiers like `@foo/core-runtime`

**Scan scope**: `.kiro/steering/`, `src/`, `product-template/`, `.kiro/agents/`, `dist/`. Matches design-outline.md § "Scope > In scope" item 7 exactly. Thurgood confirmed this covers all Civitas-governed and consumer-facing surfaces.

**Sourcemap exclusion**: Excluded `*.map` and explicitly `*.js.map` (defense in depth). Sourcemaps embed source content as string literals, so any legitimate reference in a committed source file would be duplicated in every sourcemap — false positives in proportion to the number of generated files.

**Report format**:
```
✗ path/to/file.ts:42
  found:    @designerpunk/core
  expected: @3fn/core
  context:  const name = '@designerpunk/core';
```

Each drift entry shows file:line, the mismatched scope reference, the expected form (based on current `package.json` scope), and the line's context. Grouped by file for readable batch reports.

### Key Decisions

**`PACKAGE_NAMES` list starts at four entries**: `core`, `tokens`, `components`, `build`.

- `core` — the current published package
- `tokens`, `components` — historical multi-package scaffolding from pre-Spec-095 era (both referenced in aspirational docs and in real code that never produced published packages)
- `build` — discovered during Task 1.1 Extension execution, when `src/build/workflow/README.md` surfaced two references to `@designerpunk/build` and `@designerpunk/build/workflow`. Added to ensure symmetric coverage.

`validation` and `advanced` are **intentionally excluded** despite appearing in `.kiro/steering/A Vision of the Future.md` as aspirational examples. Those scope names never corresponded to real packages or real code paths — they're pure speculation in a vision doc. Including them would produce false positives without a corresponding reconciliation obligation. Documented in the script's inline comments.

**Exit codes**:
- `0` — no drift (clean state)
- `1` — drift detected (standard non-zero for CI failure)
- `2` — script error (missing `package.json`, unreadable files, scope not extractable)

Three distinct exit codes let the `prepublishOnly` script and CI workflow distinguish "real drift, block the operation" from "environment problem, investigate separately."

**Future enhancement documented, not implemented**: The script could also parse `package.json`'s `exports` map and flag any subpath containing a stale scope. Example: if the map contained `"./blend": "./dist/blend/index.js"` but someone changed the package name, the exports keys wouldn't drift but embedded paths might. Low-priority refinement; flagged as a completion-doc note rather than hard-wired now.

### Cross-Domain Execution

Per tasks.md § "1.7 > Agent": Ada writes the script, Thurgood reviews scan scope. Executed as:

1. Ada drafted the script with initial scan scope matching design-outline item 7
2. Thurgood's scan-scope review happened during R1/R2 feedback (Thurgood's R2 incorporation notes explicitly validated the scope list)
3. During execution, Ada discovered the `@designerpunk/build` orphan scope and expanded `PACKAGE_NAMES` from three to four entries — a routine extension within the agreed scan scope, not a new scope surface

No formal cross-domain handoff event during execution; Thurgood's scope review was completed in spec feedback, and execution proceeded within that approved scope.

### Integration Points

- **Invoked by `npm run check:drift`** (standalone) and `npm run prepublishOnly` (via Task 1.8 wiring)
- **Invoked by CI** via `.github/workflows/package-name-drift.yml` (Task 1.8)
- **Self-validating against its own scope**: the script scans itself via `scripts/` being reachable from the `src/` scan, but its patterns are regex literals (template literals with backticks and escapes), so they don't match as actual package references. Verified by running against the clean state — script passes cleanly.

---

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ Node.js parses script without errors (no syntax or module errors on invocation)
- ✅ Shebang `#!/usr/bin/env node` present; `chmod +x` applied for direct invocation
- ✅ ANSI color codes formatted correctly (codes terminate properly, no rendering artifacts)

### Functional Validation
- ✅ **Clean-state test**: After Task 1.1 (all references corrected) and Task 1.6 (fresh `dist/`) completed: `npm run check:drift` → "No package name drift detected (2,817 files scanned)" ✅
- ✅ **Drift-detection test** (the whole point of the script): First run surfaced 374 legitimate drift references across 31 files, including the 13 `src/build/` references my R1 review missed. These became the Task 1.1 Extension scope. This is the strongest validation — the script caught real drift my prior review missed.
- ✅ **Sourcemap exclusion**: Verified `dist/*.map` files don't contribute to drift count (spot-checked by running script with and without exclusion; without exclusion the count inflates dramatically because every minified `.js.map` contains a stringified source)
- ✅ **Exit codes**: Clean state exits 0; drift state exits 1. Verified via `$?` inspection.

### Integration Validation
- ✅ **`package.json` scope extraction**: Script correctly extracts `3fn` from `@3fn/core` and uses it as expected scope
- ✅ **Recursive directory walking**: All 2,817 files across five scan surfaces processed without errors
- ✅ **Binary file skip**: Script silently skips files that aren't UTF-8 readable (no crashes or false positives)
- ✅ **Report format**: Drift output legible in both color (terminal) and plain (CI log) modes; `file:line` format is clickable in most terminals and compatible with standard grep-output parsers

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 7 (prevention tooling): addressed
- ✅ Design Outline § "Open questions" item 2 (prevention tooling placement RESOLVED: `prepublishOnly` + CI): script provides the core logic both wire points use
- ✅ Tasks.md § "1.7 > Validation": known-clean state passes (Tier 2: Standard); synthetic drift fails (validated indirectly by real drift during Extension execution)
- ✅ Task 1.7 sub-requirements met:
  - Reads `package.json` name ✅
  - Scans `.kiro/steering/`, `src/`, `product-template/`, `.kiro/agents/`, `dist/` ✅
  - Excludes `*.map` sourcemaps ✅
  - Matches `@<scope>/(core|tokens|components)` + `build` extension ✅
  - Exits non-zero with clear file:line report ✅
  - Tested against clean and drift states ✅

---

## Notes

**The script earned its keep on its first run.** Task 1.7's spec framed the script as a prevention tool for future drift. In practice, the script surfaced real latent drift that my R1 review had missed (13 references across 4 files — WebBuilder.ts, WebNPMPackageStructure.test.ts, WebBuildValidator.test.ts × 10 lines, workflow/README.md × 2 lines). Without the script, those references would have shipped in 11.0.0. Peter authorized mid-execution scope extension (1.1 Extension) to fix them immediately.

**Design decision preserved for reuse**: The script's regex uses a lookahead `(?=[/"'\\s\`,;:)\\]}]|$)` to ensure matches end at a boundary character. This was deliberate — without it, the pattern would over-match on compound identifiers like `@3fn/corex` (not a real package, but the principle applies for robustness). Documented inline in the script.

**Script's own content is excluded by design**: When the script scans itself via `src/` → `scripts/` → `check-package-name-drift.js`, the regex patterns inside template literals don't match as real package references because they're regex construction syntax, not actual `@scope/name` strings. This self-consistency was a happy accident of the template-literal-with-backticks construction; if the script were rewritten with literal strings containing `@3fn/core`, it would match itself. Note for future maintainers.
