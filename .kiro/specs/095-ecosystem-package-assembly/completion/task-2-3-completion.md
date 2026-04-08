# Task 2.3 Completion: Add `bin` and `tsx` Dependency

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Task**: 2.3 - Add `bin` and `tsx` dependency
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Lina

---

## Summary

Added `bin` field for `npx designerpunk` CLI commands and `tsx` as a runtime dependency for pipeline execution in product repos.

## Changes

- `bin.designerpunk`: `./dist/cli/designerpunk.js` — enables `npx designerpunk generate`, `npx designerpunk mcp:app`, `npx designerpunk mcp:docs`
- `dependencies.tsx`: `^4.19.0` — runtime dependency (not devDependency) so product repos get it automatically on install. Executes the entire pipeline chain (config → generators → token sources) as TypeScript.

## Validation

| Check | Result |
|-------|--------|
| `npm test` | 318 suites, 8198 tests, all passing |

## Requirements Traced

- R5 AC 6: `bin` field maps `designerpunk` to CLI entry point ✅
- R6 AC 1: `tsx` available as dependency ✅
- R6 AC 2: Pipeline executes via `tsx` without product needing `ts-node` ✅ (mechanism in place; validated during Task 5)
