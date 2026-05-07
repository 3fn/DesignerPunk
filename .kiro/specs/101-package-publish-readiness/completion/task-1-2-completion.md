# Task 1.2 Completion: Update `package.json` Metadata and Create LICENSE File

**Date**: 2026-05-06
**Task**: 1.2 Update `package.json` metadata and create LICENSE file
**Type**: Setup
**Status**: Complete

---

## Artifacts Created

One new file, one modified file:

- **Created**: `LICENSE` — 201 lines, canonical Apache License 2.0 text, copyright 2026 Peter Michaels Allen
- **Modified**: `package.json` — added `license`, `author`, `repository` fields; added `product-template/` to the `files` array

---

## Implementation Details

### Approach

**`package.json` metadata placement**: Added the three new fields (`license`, `author`, `repository`) immediately after `description`, before `main`. This matches npm convention (metadata fields grouped near the top) and ensures standard tooling (`npm pack`, `npm publish`, GitHub Packages UI) discovers them in expected positions.

**`repository.url` correction**: Ada R1 feedback proposed `https://github.com/3fn/DesignerPunkv2.git` based on the local directory name `DesignerPunk-v2`. Verified via `git remote -v` that the actual remote is `https://github.com/3fn/DesignerPunk.git` (no "v2" suffix — the "-v2" is the local directory naming only). Used the correct URL. This is a documented correction in the Parent 1 completion doc's "Lessons Learned" section.

**`files` array insertion**: Added `"product-template/"` after `".kiro/agents/"` and before the MCP server entries. Rationale: `product-template/` is a consumer-facing governance artifact analogous to `.kiro/agents/` (both are templates for consumer workflows), so grouping them preserves semantic adjacency in the array.

**LICENSE file content**: Used the canonical Apache License 2.0 text from https://www.apache.org/licenses/LICENSE-2.0.txt, including the terms and conditions (sections 1–9), the appendix with the boilerplate notice, and a project-specific copyright line at the bottom:

```
Copyright 2026 Peter Michaels Allen
Licensed under the Apache License, Version 2.0 (the "License");
...
```

### Key Decisions

**Apache-2.0 over UNLICENSED** — Decision was made during spec feedback (design-outline.md § "Open questions" item 3). Ada's original R1 suggested `UNLICENSED` as a placeholder; Peter chose `Apache-2.0` based on these drivers:
- Portfolio-site career-positioning goal (open-source attribution friendly)
- Patent grant provides meaningful protection for novel methodology work
- BSL's protective value evaluated as low relative to hiring-friction cost given no current commercial infrastructure
- Brand-level protection handled separately via USPTO trademark filing (not in spec scope)

**SPDX identifier format**: Used the exact SPDX identifier `"Apache-2.0"` (with hyphen, no dot prefix) as required by the SPDX License List and expected by npm tooling. Mismatches (`"Apache 2.0"`, `"apache-2.0"`, `"Apache-2"`) would cause npm publish warnings.

**No `NOTICE` file created**: Apache-2.0 requires a NOTICE file only when the work bundles third-party code that has its own notice requirements. This package's dependencies (npm dependencies at `dependencies`/`devDependencies`) are resolved at install time, not bundled. No bundled third-party code → no NOTICE file needed.

**Copyright holder format**: "Peter Michaels Allen" (full name) matches the `author` field in `package.json`. Using the same string in both places reduces downstream ambiguity.

**Year 2026**: Matches the current year (the year of first publication under Apache-2.0). If the project continues into 2027, Apache convention allows extending via `Copyright 2026-2027 ...` or leaving the original year as the first-publication date.

### Integration Points

- **`npm publish` reads `license` field** and publishes it to the GitHub Packages registry index. Consumers browsing the package at `https://github.com/3fn/DesignerPunk/packages` will see "Apache-2.0" as the license.
- **`npm publish` reads `repository` field** and GitHub Packages uses the URL to associate the package with the owning repo. Without this field, the publish would either fail or fail to link the package to the repository.
- **`npm pack --dry-run` validates the `files` array** — running this command confirmed the tarball correctly includes `LICENSE` and `product-template/agents/*` (9 files).
- **Integration Guide's `cp` command** (`.kiro/steering/DesignerPunk-Integration-Guide.md`) tells consumers to `cp -r node_modules/@3fn/core/product-template/agents/ .kiro/agents/`. Before this task, that command would silently fail post-publish because `product-template/` wasn't in the tarball. Post-task, it succeeds.

---

## Validation (Tier 1: Minimal)

### Syntax Validation
- ✅ `package.json` parses cleanly: `node -e "require('./package.json')"` succeeds
- ✅ No JSON syntax errors introduced
- ✅ Field order preserves existing layout (no reordering of unrelated fields)

### Functional Validation
- ✅ `npm pack --dry-run` completes without metadata warnings
- ✅ Tarball contents include `LICENSE` (11.3 KB, matching standard Apache 2.0 size)
- ✅ Tarball contents include all 9 `product-template/agents/*` files (`README.md` + 8 prompt files)
- ✅ Metadata field values match intent:
  - `name: "@3fn/core"` (unchanged from prior state)
  - `version: "10.2.5"` (unchanged; will change to `11.0.0` in Task 2.1)
  - `license: "Apache-2.0"` (new)
  - `author: "Peter Michaels Allen"` (new)
  - `repository.type: "git"` (new)
  - `repository.url: "git+https://github.com/3fn/DesignerPunk.git"` (new, correct remote)

### Integration Validation
- ✅ `LICENSE` file readable as plain text (no BOM, no encoding issues)
- ✅ Apache License 2.0 canonical text preserved verbatim (no formatting drift from source)
- ✅ Copyright notice correctly formatted at the bottom of the LICENSE text

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 2 (`product-template/` in files array): addressed
- ✅ Design Outline § "Scope > In scope" item 3 (publish-required `package.json` metadata: repository, license, author): addressed
- ✅ Design Outline § "Open questions" item 3 (license resolution: Apache-2.0): addressed with SPDX-compliant value and corresponding LICENSE file
- ✅ Tasks.md § "1.2 > Validation": `package.json` parses cleanly, `npm pack --dry-run` completes without metadata warnings, tarball includes `product-template/` directory

---

## Notes

**Why the `files` array needed `product-template/` explicitly**: Before this task, `package.json` `files` was a comprehensive allowlist (not an exclude list) — it only ships what's explicitly listed. `product-template/` was in the source tree but not in the allowlist, so `npm publish` was silently omitting it from the tarball. This was a latent bug that had gone undetected because nothing had been published yet. Verified pre-fix by running `npm pack --dry-run` on a pre-change checkout (during Task 1.2 investigation) and confirming `product-template/` was absent from the tarball contents.

**Note on `UNLICENSED` placeholder language in the task spec**: Tasks.md § "1.2" originally listed `"license": "UNLICENSED"` with "(or final license choice if different)" — that bracketed language was a placeholder awaiting Peter's decision on the actual license. The Open Question resolution came before execution, so Task 1.2 was executed with the final Apache-2.0 choice directly.
