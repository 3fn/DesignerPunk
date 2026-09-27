# Task 9 Summary: Consumer-guard extensions and U1 post-diet re-certification (U1 gating parent)

**Date**: 2026-09-27
**Purpose**: Concise summary of Task 9 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Extended `tests/consumer-integration.test.ts` — the packed-install consumer guard — with the 19 U1-scheduled named cases from design.md § "C6. Consumer-guard extensions", plus two additional certifications (package-mode `generate` from a packed install; the packed name-contract check). Every case runs against a real `npm pack` → `npm install`, never an in-repo load, per Requirement 3.1.

Also **diagnosed and fixed the pre-existing `npm run test:consumer` failure**: its brand-survival assertion checked for `inputradio.box.sm`, a token that stopped shipping when `init` stopped copying `src/components/core` (Requirement 19A.2, Model B). Re-keyed onto `progress.node.size.sm` — a token in the consumer's OWN copied token tier — per Requirement 3.2's explicit instruction, and added an automated companion proving the token disappears when its consumer-tree source file is deleted.

Along the way, two genuine findings surfaced and were routed (not fixed here, outside this task's write scope):
- a bundled `application-mcp.js`'s inlined birth-detection logic mis-resolves its own package root under esbuild bundling, narrowly affecting one posture disambiguation;
- the re-keyed brand-survival assertion's dual-instance guarantee may not currently hold for the token it now checks — a manual bite that should have gone red did not.

Also added the design.md C11 catalog erratum Task 8 flagged (the harvest-zero lint's warning string, previously undocumented).

## Why It Matters

This is U1's gating parent — its completion opens the unit's PR. The 19 cases are the certification of record for the whole "distribution substrate & packaging truth" unit: birth detection, root-policy resolution, the packaging floor, the rewrite-at-copy mapping, and the name contract, all proven against a REAL packed install rather than an in-repo load, which is exactly the class of bug ("passes internal tests, breaks in product repos") this guard exists to catch. Fixing the pre-existing failure also un-blocks `test:consumer` as a green, trustworthy gate going forward — it had been silently red at the point this task began.

## Key Changes

- `tests/consumer-integration.test.ts`: ~900 new lines across three describe blocks (birth/posture, root/union, copy + name-contract cases), plus shared helpers (`gitBoundary`, `spawnCli`, `spawnNodeBundle`, `captureStderrUntil`, YAML-based component-fixture copiers).
- The brand-survival assertion in `generate produces output files` re-keyed from `inputradio.box.sm` to `progress.node.size.sm`.
- `design.md` § "C11" gained the harvest-zero warning's catalog row.
- Two issues filed: `.kiro/issues/2026-09-27-bundled-resolvepackageroot-isSteward-drift.md`, `.kiro/issues/2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md`.
- Full validation green: `tsc`, `npm test` (384/384 suites), `npm run test:scripts` (11/11), `npm run test:consumer` (30 passed, 1 pre-existing unrelated skip), `pack-assert.ts` (40/40), `completion-criteria-parity` (0 fails).
