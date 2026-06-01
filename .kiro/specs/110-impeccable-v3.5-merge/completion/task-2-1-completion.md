# Task 2.1 Completion: Copy Detector Scripts from Upstream

**Date**: 2026-06-01
**Task**: 2.1 Copy detector scripts from upstream
**Type**: Setup
**Status**: Complete

---

## Artifacts Created

- `.kiro/skills/impeccable/scripts/detect.mjs` — Entry point (620 bytes)
- `.kiro/skills/impeccable/scripts/detector/` — Full engine directory (~27 files)

## Implementation Details

Wholesale copy of `scripts/detector/` directory and `scripts/detect.mjs` entry point from upstream v3.5.0 (tag `skill-v3.5.0` from `github.com/pbakaus/impeccable`).

### Directory Structure

```
scripts/
├── detect.mjs                          ← Entry point, resolves detector path
└── detector/
    ├── detect-antipatterns.mjs         ← Public API facade
    ├── detect-antipatterns-browser.js  ← Browser bundle
    ├── findings.mjs
    ├── cli/main.mjs                    ← CLI logic (detectCli)
    ├── engines/
    │   ├── static-html/                ← HTML/CSS analysis
    │   ├── browser/                    ← Puppeteer URL scanning
    │   ├── regex/                      ← Text pattern matching
    │   └── visual/                     ← Screenshot contrast
    ├── node/file-system.mjs            ← File walking, import graph
    ├── registry/antipatterns.mjs       ← Rule registry
    ├── rules/checks.mjs               ← Rule implementations
    ├── shared/                         ← Color utils, constants, page utils
    ├── profile/profiler.mjs            ← Performance profiling
    └── browser/injected/index.mjs      ← Browser injection script
```

### Verification

Structure matches upstream exactly. No modifications made to any copied file.

## Validation (Tier 1: Minimal)

- ✅ Directory structure matches upstream
- ✅ Entry point resolves detector path correctly
- ✅ Requirement 3.1: Scripts located at `.kiro/skills/impeccable/scripts/detector/`
- ✅ Requirement 3.5: Directory treated as wholesale replacement
