# Issue: `npm run test:scripts` runs in no CI workflow — the parity checker's own tests are unguarded

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Thurgood (Civitas steward; also the instrument owner of `completion-criteria-parity`)
**Trigger**: **before the Q2 sitting arms `completion-criteria-parity` as required**, or at the next CI-workflow touch, whichever comes first. The Q2 arming rests on this checker, so its own tests have to be guarded first.
**Source**: Spec 123 U1 Task 6 (Ada) noticed this; the steward confirmed it on 2026-09-27. Peter ruled that it be filed.

## The gap

`package.json` defines `"test:scripts": "jest --config scripts/jest.config.js"`. None of the workflows in `.github/workflows/` run it: `agent-generator`, `completion-criteria-parity`, `consumer-guard`, `lane-timing`, `package-name-drift`, `section-citations` and `tool-boot-smoke`. The functional lane (`npm test`, `jest.functional.config.js`) doesn't include `scripts/**`.

So these suites run only when someone runs them locally:
- `scripts/completion-claims/**`, the parity checker's parser and verdict tests, including #211's 13 new tests;
- `scripts/__tests__/tool-manifest.test.ts` (Spec 123 Task 4);
- `scripts/__tests__/build-name-contract.test.ts` and `sync.type-contract.test.ts` (Spec 123 Task 6);
- `scripts/__tests__/floor-closure.test.ts` (Spec 123 Task 3);
- and the other suites under `scripts/`.

**Partially mitigated today**: `lane-timing` runs `npm run build`, so build-time failures (the tool-manifest `readOnlyHint` guard, the name-contract build failures) still fail CI. What CI doesn't catch is a regression in the checker's own test-verified behaviour. #211's D1 fix, for example, could silently revert.

## Scope

Add a `test:scripts` step to an existing required lane, or a new lane registered as required. Follow the 125-A required-checks convention, including its "did it really run" guard (a non-empty suite count). This is a CI-configuration change: branch-protection and required-check registration are Peter's settings actions.

## Filed by

Steward (main-loop), 2026-09-27, at Peter's direction.
