# Task 1 Completion: Empirical Loader Selection

**Date**: 2026-06-24
**Task**: 1 — Empirical Loader Selection (Increment 1 — decision procedure, not a pre-pick)
**Type**: Investigation
**Status**: Complete
**Validation Tier**: Tier 3 (Comprehensive)
**Agent**: Ada (loader mechanics) + main-loop (harness verification)
**Covers subtasks**: 1.1 (stand up the matrix harness) and 1.2 (exercise A/B/C, record accept-criteria evidence) — one continuous investigation, documented here.

---

## Outcome

**Approach A selected** — `tsx/cjs/api` `register({namespace})` + scoped synchronous `require` + mandatory `unregister()`. **Approach B (`tsImport` from `tsx/esm/api`) failed all four matrix rows** when invoked from `loadConfig`'s CommonJS host. **Approach C (jiti) not needed** (not installed; only evaluated if A and B both fail). **OQ-1 resolved.** The design's "prefer B" lean was overturned by evidence — exactly the branch the spec anticipated ("A wins only if B fails the CJS-boundary test").

## Artifacts Created

- `src/config/__resolution-matrix__/runner.js` — single-cell runner (one candidate × one fixture) in a **real `node` CJS subprocess (NOT jest)**, faithfully reproducing `loadConfig`'s load locus + contract (try/catch re-wrap, `loaded.default || loaded`), with a before/after residue probe on `module._resolveFilename` + `module._extensions`.
- `src/config/__resolution-matrix__/run-matrix.js` — orchestrator: spawns the runner across approaches × fixtures, prints the green/red matrix + the accept-criteria summary.
- `src/config/__resolution-matrix__/fixtures/{source-dir,faithful}-{esm,cjs}/` — faithful consumer configs (real `export default` ESM and real `require()` CJS), each with a transitive relative raw-`.ts` `./my-overrides` carrying a sentinel.
- `src/config/__resolution-matrix__/README.md` — run + interpretation guide.
- `.kiro/specs/118-module-resolution-coherence/findings/loader-selection.md` — dated decision record.
- `package.json` — `test:resolution-matrix` script.

## Approach

Built a resolver-faithful matrix harness (net-new; no diagnosis harness pre-existed) and exercised the three candidate loaders against the two failing matrix rows (**source-directory import**, **faithful-consumer**) in **both authoring directions** (ESM- and CJS-authored), evaluating each against accept-criteria (a)–(e), then applying the selection rule. The harness deliberately runs via real `node` subprocesses, not jest — under ts-jest, jest's module registry masks Node's strict-ESM resolver and would go green against the bug.

## Key Findings

- **B failed the CJS-host / ESM-loader boundary (OQ-1, the crux).** Called from `loadConfig`'s CommonJS context, `tsImport` loaded the entry config but the **transitive** relative raw-`.ts` imports fell back to Node's native strict-ESM resolver — reproducing the *exact baseline errors* (`Directory import not supported`, `Cannot find module './my-overrides'`). It also left global residue (drops its own teardown handle). The "self-scopes → no residue → prefer B" expectation did not hold from a CJS host.
- **A satisfied all five accept-criteria.** It hooks the CommonJS `require` resolver that `loadConfig` already lives in — lenient (extensionless + directory imports) and tsx-extended for `.ts` — so the config and its whole transitive graph resolve.
- **A's cost is real and named:** A mutates `module._resolveFilename` process-globally and must call the returned `unregister()` to restore it. Load-bearing for criterion (e), not optional. Contained by: a `finally` block, the Task-3 subprocess guard (catches residue), and documentation.

## Validation (Tier 3: Comprehensive)

### Harness validity (verified in main loop)
- Baseline `none` reproduces the production locus verbatim (`await import(configPath)`) and **fails with the exact diagnosed errors** → confirms the harness exercises the real strict-ESM resolver, not a jest-masked one.
- `runner.js` reviewed: real `node` CJS subprocess, `__dirname`/`__filename` present, no `import.meta`; B invoked correctly (`tsImport(configPath, { parentURL: pathToFileURL(__filename).href })`) → B got a fair test.

### Matrix results (`npm run test:resolution-matrix`, re-run independently in main loop)

| row | none | A | B |
|---|---|---|---|
| source-directory import [ESM] | red | green | red |
| source-directory import [CJS] | red | green | red |
| faithful-consumer [ESM] | red | green | red |
| faithful-consumer [CJS] | red | green | red |

### Accept-criteria
- **A:** (a) 4/4 green · (b) both CJS+ESM PASS · (c) CJS context incl. transitive raw-`.ts` PASS · (d) `loaded.default || loaded` unwrap + fail-loud preserved · (e) no residue (resolver restored after each call, verified across sequential loads).
- **B:** (a) 0/4 · (b) FAIL · (e) FAIL (residue).

### Requirements compliance
- **R2 AC1** (carries own resolution, assumes no ambient loader): A satisfies — scoped register *within* the call; `unregister()` restores global state.
- **R2 AC3** (CJS-context ergonomics confirmed empirically, not assumed): done — OQ-1 resolved.
- **R2 AC4** (forward-compatible, both authoring directions): A passes ESM- and CJS-authored alike.
- **R2 AC5** (validate by swapping inside `loadConfig`, not bin hooks): the harness reproduces `loadConfig`'s load locus; the permanent in-`loadConfig` swap is **Task 2**.

## Lessons / Notes

- **The no-assume discipline paid off on the first task.** The outline "leaned tsImport"; hard-coding it would have shipped a loader that doesn't work — the patch-without-proof failure this spec exists to end, avoided in real time.
- A's global-mutation cost is the concrete form of the CJS path's known tradeoff ("depends on tsx-at-runtime; swims against the ESM tide").
- Forward signal (not a verdict) for the Task-8 direction decision: the clean ESM-native loader path does not work from today's CommonJS host, so a future ESM commitment would keep a loader like A or restructure `loadConfig`. The spec's "anchor fact" (a TS-aware runtime loader is permanent either way) already accommodates this.

## Related Documentation

- Decision record: [findings/loader-selection.md](../findings/loader-selection.md)
- Hands off to **Task 2** (contract-preserving swap into `loadConfig`, approach A).
- [Task 1 Summary](../../../../docs/specs/118-module-resolution-coherence/task-1-summary.md)
