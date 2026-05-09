# Task 3.2 Completion: Register `validate` Command in CLI and Update Help

**Date**: 2026-05-09
**Task**: 3.2 Register `validate` command in CLI and update help
**Type**: Setup
**Status**: Complete

---

## Artifacts Created

- `src/cli/designerpunk.ts` (updated) — `validate` case in switch, `runValidateCommand()` wrapper, help text

---

## Implementation Details

### Approach

Added `validate` to the CLI command switch with a `runValidateCommand()` wrapper that catches errors (barrel contract failures, etc.) and displays them before exiting. Updated `printHelp()` to list the new command.

### Changes

1. Import `runValidate` from `./validate`
2. `case 'validate': await runValidateCommand(); break;` in switch
3. `runValidateCommand()` wrapper with try/catch for error display
4. Help text: `npx designerpunk validate        Validate token definitions against active source`

---

## Validation (Tier 1: Minimal)

- ✅ TypeScript compilation: 0 errors
- ✅ Full test suite: 328 suites, 8298 tests passing

### Requirements Compliance
- ✅ Req 6.1: `npx designerpunk validate` routes to validation handler
- ✅ Req 6.2: Help output lists `validate` with description
- ✅ Req 6.3: Unknown commands continue to show available commands including `validate`
- ✅ Req 5.10: `generate` command unchanged (existing validation stays as-is)
- ✅ Req 7.2: CLI help describes validate command's purpose
