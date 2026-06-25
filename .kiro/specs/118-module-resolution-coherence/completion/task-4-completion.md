# Task 4 Completion: Early Direction-Agnostic Guards

**Date**: 2026-06-24
**Task**: 4 — Early Direction-Agnostic Guards (Increment 1, direction-agnostic)
**Type**: Guard
**Status**: Complete
**Validation Tier**: Tier 2 (Standard)
**Agent**: Lina (guards + ESLint tooling) + main-loop (verification)
**Covers subtasks**: 4.1 (dynamic-import smoke test), 4.2 (scoped-ESLint tooling).

---

## Outcome

Two direction-agnostic guards landed early (not gated on the Task-8 direction decision): a **preventive dynamic-import smoke test** and the **scoped-ESLint tooling** for the module-resolution rule (rule scaffold present, polarity deferred). Both attach to the consumer-guard CI lane. Full regression sweep green.

## Artifacts Created / Changed

- `src/components/__tests__/DynamicImportGuard.test.ts` — the 4.1 preventive guard (jest source-scan).
- `eslint.config.js` — the 4.2 minimal flat config, scoped to `src/components` only.
- `package.json` — `"lint"` script; dev deps `eslint@^10.5.0` + `@typescript-eslint/parser@^8.62.0`. (`package-lock.json` updated.)
- `.github/workflows/consumer-guard.yml` — added a **lint** step + a **dynamic-import guard** step before the consumer guard.

## 4.1 — Dynamic-import smoke test (preventive)

A jest source-scan over `src/components/**/*.{ts,tsx}` (excluding tests/examples) that flags relative dynamic `import()` calls that are **extensionless** (`import('./x')`) or **raw-`.ts`** (`import('./foo.ts')`). Named **preventive**: a grep of component source returns **zero** today, so it guards a future regression. **Scope:** web component source only — iOS-Swift/Android-Kotlin categorically out; build-time validation dynamic imports (`MathematicalConsistencyValidator.ts:330-331`, static literals, not component source) are out of scope.

*Approach note (Lina, honest):* an initial type-only-import filter heuristic was removed (it false-negatived on `=>`-containing lines); given the zero baseline, the guard prefers false-positives over false-negatives. If a legitimate type-only inline import is ever added to component source, a targeted exclusion can be documented.

## 4.2 — Static-lint tooling (scoped ESLint; polarity DEFERRED)

- **ESLint v10.5.0** + `@typescript-eslint/parser` (needed to parse TS syntax) added as dev deps.
- `eslint.config.js` (flat) targets **only** `src/components/**`, with belt-and-suspenders `ignores` for everything else — **NOT a repo-wide adoption** (the codebase has never been linted; a broad config would surface noise). Verified: ESLint processes only `src/components/` files.
- The rule is **genuinely inert**: `no-restricted-syntax` with **zero selectors** (matches nothing). The config documents the exact CJS and ESM activation selectors; **Group 9 (after the Task-8 direction decision) sets the polarity** (CJS bans explicit extensions / ESM requires `.js`).
- `npm run lint` runs ESLint on the scoped web source (uses `--no-error-on-unmatched-pattern` because the only component `.tsx` files live under the ignored `examples/`).

## Validation (Tier 2: Standard)

- ✅ **Dynamic-import guard bites:** clean baseline 3/3 pass; injecting `import('./x')` → FAIL (extensionless violation reported with file:line); injecting `import('./foo.ts')` → FAIL (raw-`.ts` violation); fakes removed → 3/3 pass. (Verified in main loop.)
- ✅ **`npm run lint`** exit 0, scoped to `src/components` only (no false positives on existing source, no repo-wide noise).
- ✅ **Full `npm test`: 374 suites / 8972 tests green** (the new guard adds 3 tests).
- ✅ **`npm run build`** exit 0; `git diff token-index/` empty (unchanged).

### Requirements Compliance
- ✅ **R10 AC1** — guards split by direction-coupling (these are the agnostic ones, landing early).
- ✅ **R10 AC2a** — dynamic-import smoke test, **preventive** (named as such; zero-baseline verified).
- ✅ **R10 AC3** — static-lint **tooling** built now; **policy/polarity deferred** to Group 9 (rule scaffold inert).
- ✅ **R10 AC4** — lint scope is **web source only**; iOS-Swift/Android-Kotlin categorically out; build-time validation dynamic imports out of scope.
- (R10 AC2b — the browser-bundle boot/smoke guard — is owned by **Task 5 / R12**, not here.)

## Related Documentation
- [Task 4 Summary](../../../../docs/specs/118-module-resolution-coherence/task-4-summary.md)
- Polarity activation: **Task 8** (direction decision) → **Group 9** (sets the lint polarity).
