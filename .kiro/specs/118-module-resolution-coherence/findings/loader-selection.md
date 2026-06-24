# Finding: Loader Selection (Spec 118, Task 1 — Empirical)

**Date**: 2026-06-24
**Spec**: 118 — Module-Resolution Coherence (Increment 1)
**Task**: 1 (1.1 harness, 1.2 exercise A/B/C + accept-criteria evidence)
**Agent**: Ada (Rosetta — runtime loader)
**Branch**: `spec-118-module-resolution-coherence`
**Status**: Decision recorded. Task 2 (the permanent swap into `loadConfig`) NOT performed here.

---

## Decision

**Selected loader: Approach A** — `tsx/cjs/api` `register({namespace})` + scoped synchronous
`require(configPath)`, with a **mandatory `unregister()` after the load**.

**B (`tsImport`) was the design's preferred candidate but FAILED the OQ-1 CJS-boundary test.**
The selection rule fired its "A wins only if B fails the CJS-boundary test" branch — this was an
evidence outcome, not a pre-pick. **jiti (C) was not needed and was not installed** (both A and B
did not both fail; A passed cleanly).

---

## Harness (the evidence instrument)

Net-new, committed, re-runnable:

- `src/config/__resolution-matrix__/runner.js` — runs ONE approach against ONE fixture in a **real
  `node` subprocess** (plain CommonJS), faithfully reproducing `loadConfig`'s load locus
  (`ConfigLoader.ts:57-65`): CJS context (`__dirname`/`__filename`, no `import.meta`), the
  `loaded.default || loaded` unwrap, and the fail-loud `try/catch` re-wrap. Emits a structured JSON
  result and a before/after `module._resolveFilename` + `module._extensions` residue snapshot.
- `src/config/__resolution-matrix__/run-matrix.js` — orchestrator; spawns `node` per
  (approach × row × direction) cell, prints the green/red table + accept-criteria summary.
- `src/config/__resolution-matrix__/fixtures/{source-dir,faithful}-{esm,cjs}/` — four faithful
  fixtures (real `export default`/ESM imports; real `require()`; transitive raw-`.ts` `./my-overrides`
  carrying a positive sentinel; compiled-import target modeling `dist`).
- `src/config/__resolution-matrix__/README.md` — command + the not-under-jest rationale.

**Re-run command:** `npm run test:resolution-matrix`
(equivalently `node src/config/__resolution-matrix__/run-matrix.js`; subset e.g. `... run-matrix.js A`).

### THE critical constraint, honored

The matrix runs via **real `node` subprocesses, NOT under ts-jest**. Under ts-jest, jest intercepts
`await import()` via its module registry and never reaches Node's strict-ESM resolver — proven
in-repo by `src/config/__tests__/ConfigLoader.test.ts` (configs as `module.exports` in `.ts`,
comment "avoids needing ts-node in test") passing today **despite the production config-load path
being broken**. A jest-hosted matrix would go green against the bug. The baseline (`none`) column
confirms the harness is faithful: all four rows fail with the exact diagnosed errors.

---

## Matrix results (actual harness output, `npm run test:resolution-matrix`)

```
row                           | none     | A        | B
--------------------------------------------------------------
source-directory import [ESM] | red      | green    | red
source-directory import [CJS] | red      | green    | red
faithful-consumer [ESM]       | red      | green    | red
faithful-consumer [CJS]       | red      | green    | red
```

`green` = resolved + sentinel matched + no residue. `red` = fail-loud threw (or sentinel mismatch).

### Baseline (`none`) — bug reproduction (faithful, expected red)

The harness reproduces the diagnosed three-condition conjunction exactly:

- `source-dir-esm`: `Directory import '.../src/config' is not supported resolving ES modules`
- `source-dir-cjs`: `Cannot find module './src/config'` (CJS require path)
- `faithful-esm`: `Cannot find module '.../my-overrides' imported from .../designerpunk.config.ts`
- `faithful-cjs`: `Cannot find module './my-overrides'` (CJS require path)

> Reality-vs-design note: the **CJS-authored** fixtures fail via Node's **CJS require path**
> (`Cannot find module`, with a require stack), not the strict-ESM resolver, because `await import()`
> of a `.ts` whose body is `require()`/`module.exports` (no ESM syntax) is treated as CJS by Node.
> The ESM-authored fixtures fail via the strict-ESM resolver. Both are faithful; a correct loader
> must satisfy both paths. (The design described the failure primarily via the strict-ESM path; the
> CJS path is the equally-real other half, and A handles both.)

---

## Accept-criteria evidence

### Approach A — `tsx/cjs/api` register + scoped require + `unregister()`  → **ACCEPTED**

| Criterion | Result | Evidence |
|-----------|--------|----------|
| (a) failing rows green | **PASS** | 4/4 rows green |
| (b) both CJS- & ESM-authored | **PASS** | all four fixtures (2 ESM, 2 CJS) green; sentinels matched |
| (c) CJS context incl. transitive raw-`.ts` (OQ-1) | **PASS** | runner is CJS (`__filename`/`__dirname`); scoped `require` resolved `./my-overrides` and the `./src/config` directory index; the `?namespace=` query param in require stacks confirms tsx scoping is active |
| (d) preserves unwrap + fail-loud | **PASS** | `loaded.default || loaded` returns the config; a broken config (`Transform failed ... Expected ";"`) and a missing transitive module (`Cannot find module './does-not-exist'`) both **throw** the re-wrapped `Failed to load ...` error — never a partial/empty config |
| (e) no ambient/global residue | **PASS** | before/after snapshot: `module._resolveFilename` identical, `module._extensions` = `.js,.json,.node` unchanged, on both the success and the throw path (`unregister()` runs in `finally`) |

**Lifecycle + repeatability (explicitly demonstrated, one process, two sequential loads):**
`unregister()` restores `module._resolveFilename` after load 1 (`true`) and after load 2 (`true`);
`module._extensions` restored; CJS-then-ESM loads both succeed. This matters because `loadConfig`
may be called multiple times in one process (e.g. CLI validate + generate paths).

**Synchronous-`require` note (Ada SF-2, confirmed):** A's scoped `require` is `ScopedRequire`
(synchronous). The runner does not `await` it; if the Task-2 swap keeps `await` for shape symmetry,
awaiting a non-promise is harmless and `.default || loaded` works on the sync return. Do not "fix"
an apparent missing `await`.

### Approach B — `tsImport` from `tsx/esm/api` (CJS host)  → **REJECTED (OQ-1 failure)**

| Criterion | Result | Evidence |
|-----------|--------|----------|
| (a) failing rows green | **FAIL** | 0/4 rows green |
| (b) both CJS- & ESM-authored | **FAIL** | all four red |
| (c) CJS context incl. transitive raw-`.ts` (OQ-1) | **FAIL** | the genuine open question resolved NEGATIVE — see below |
| (d) preserves unwrap + fail-loud | n/a (never resolved) | failures threw correctly, but resolution never succeeded |
| (e) no ambient/global residue | **FAIL** | residue snapshot shows `resolveFilenameChanged: true` after the call |

**OQ-1 finding, stated plainly:** From a **CJS host**, `tsImport(configPath, { parentURL: pathToFileURL(__filename).href })`
**does not resolve the config's transitive relative raw-`.ts` imports.** The errors returned are the
*identical bug-class errors* as the baseline (`Directory import not supported` for the ESM source-dir
row; `Cannot find module '.../my-overrides'` for the faithful rows). I probed both `parentURL` forms
(object `{ parentURL }` and bare string) and both authoring directions — all fail the same way. So
`tsImport` from CJS does **not** clear the OQ-1 boundary, and specifically does **not** resolve the
transitive raw-`.ts` requires (the second half of criterion (c)).

**Root cause (read from `node_modules/tsx/dist/esm/api/index.mjs`):** `tsImport` internally calls the
ESM `register({namespace: Date.now()})`, takes the returned `NamespacedUnregister`, and calls
`.import(specifier, parentURL)` — but it **never calls the returned `unregister`** (which is an async
`() => Promise<void>`). Two consequences observed: (1) the scoped ESM hook did not intercept the
config's transitive resolution from the CJS host in this Node 22.20 context, so the rows stayed red;
(2) the hook was left registered → the residue the snapshot caught. The design's hope that
`tsImport` "self-scopes and auto-tears-down" did not hold from a CJS host: it self-scopes the
*registration* but discards the teardown handle, and the scoping did not deliver transitive
resolution here.

### Approach C — `jiti`  → **NOT EVALUATED (not needed)**

C is only evaluated if **both** A and B fail. A passed cleanly, so C was not exercised and **jiti was
not installed** (confirmed absent from `node_modules`). No dependency add. Nothing to flag for the
Task-11 governance codification on this front.

---

## Selection rationale

The decision procedure's accept-criteria are the substance (Resolution 3 / E14). The selection-rule
branch that fired:

- "When both A and B pass → PREFER B" — **did not apply**: B failed.
- "A wins only if B fails the CJS-boundary test (OQ-1)" — **this is the branch that fired.** B failed
  the OQ-1 CJS-host/ESM-loader boundary (and criterion (e)); A passed all of (a)–(e).
- "C only if both A and B fail" — did not apply.

A's two acceptance obligations from the design are met by construction and demonstrated:
1. **`unregister()` lifecycle** — demonstrated to restore `module._resolveFilename` /
   `module._extensions` after each call, on both success and throw paths. The Task-2 swap MUST call
   `unregister()` (in a `finally`) — it is part of A's acceptance, not optional.
2. **Coexistence with the bin's bare `register()`** (`bin/designerpunk.js:16`, which persists until
   Increment 3a) — namespace scoping isolates config-lane requests; this interim coexistence is to be
   **certified by the Task-3 subprocess consumer guard** (`npx designerpunk generate`), not asserted
   here.

### Counter-argument (mandatory)

The design preferred B for principled reasons (self-scoping, zero residue, zero new dep), and A
carries a real cost: A mutates `module._resolveFilename` **process-globally** and relies on a
disciplined `unregister()` to stay clean — a `finally` that a future edit could drop, silently
reintroducing global residue. That is a genuine fragility B would have avoided *had it worked*. The
rebuttal is empirical, not preferential: B does not work from the CJS host (it fails the very rows
this spec exists to turn green) **and** leaves residue anyway, so B trades A's disciplined-cleanup
cost for total non-function plus residue. The mitigation for A's fragility is exactly the Task-3
standing subprocess guard (which would catch a dropped `unregister()` as residue/regression) plus the
explicit "do not drop the `finally`" note carried into Task 2. Given the evidence, A is the only
candidate that satisfies all five criteria; the residual fragility is named and guard-mitigated rather
than wished away.

---

## Where reality diverged from the design's expectations

1. **B was expected to be the likely winner; it failed outright.** The design's framing ("prefer B
   when both pass") implicitly anticipated B passing. Empirically, `tsImport` from a CJS host did not
   resolve transitive relative raw-`.ts` imports and produced the original bug-class errors.
2. **B's "self-scoping → no residue" advantage did not materialize.** `tsImport` discards its
   `unregister` handle, so it left `module._resolveFilename` mutated (residue snapshot caught it). The
   design's no-residue claim for B was based on reading that it registers with a per-call namespace,
   but the namespace scopes *requests*, not teardown; the teardown handle is dropped.
3. **CJS-authored fixtures fail via the CJS require path, not strict-ESM.** The diagnosis emphasized
   the strict-ESM resolver; the CJS authoring half fails via `Cannot find module` on the classic
   require path. Both are real and A handles both — but the harness surfaces two distinct failure
   mechanisms, not one.

None of these change the contract A must preserve; they change *which* loader the evidence selects and
sharpen the Task-2 implementation note (the `unregister()` discipline is load-bearing).

---

## Hand-off to Task 2 (NOT performed here)

- Swap **only** the body of the `try` block at `ConfigLoader.ts:57-65` to approach A.
- Preserve `loaded.default || loaded`, `configDir = path.dirname(configPath)`, and the fail-loud
  `Failed to load ${configPath}: ${message}` re-wrap.
- Call A's `unregister()` in a `finally` so it runs on both the success and the throw path
  (mandatory; load-bearing for criterion (e)).
- Re-run `npm run test:resolution-matrix` after the swap as a regression check; the standing
  preventive gate is the Task-3 subprocess consumer guard.
