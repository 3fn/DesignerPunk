# Task 7 Completion: Increment 2 — Evidence Harness, Inventories, Divergence Test

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence
**Task**: 7 (subtasks 7.1–7.4) — Increment 2, **investigation-only (NO swaps)**
**Type**: Investigation · **Validation**: Tier 3 — Comprehensive
**Agents**: Ada (parity semantics, divergence hypothesis, exports/ESM-cost analysis); Thurgood (orchestrator infra + evidence-table assembly). Main loop independently verified all subagent output.
**Branch**: `spec-118-module-resolution-coherence`

---

## Hard constraint honored (R4 AC1)

Increment 2 performed **investigation only** — NO runtime-mechanism swap, NO exports reconciliation, NO module-direction migration. No production loader/exports/config/generator code was touched. The deliverables are an evidence harness, normalization rules + unit tests, four inventories, a divergence-hypothesis disposition, and the assembled green/red table. The table **informs but does not pre-decide** the Task-8 direction.

---

## 7.1 — Parity orchestrator (Architecture)

**Built:** `src/tools/integrity/ParityOrchestrator.ts` (logic) + `src/tools/integrity/__parity__/run-parity.js` (standalone runner) + `npm run test:parity`.

**The seam (the architectural keystone):** both token generators write to **cwd-relative** `dist/` + `token-index/` but read token SOURCES from package-relative module paths. So running `scripts/generate-platform-tokens.ts` from a scratch cwd (no config → DEFAULTS) yields a clean fresh tree there. Running the **same** script under **ts-node** (root A) vs **tsx** (root B) isolates the runtime mechanism as the single variable — the exact control the divergence hypothesis needs.

**Reuse, not rebuild (Decision 2 / Ada MF-1):** the orchestrator reuses Spec 117's `Normalizer.normalize(raw, kind)` + `SemanticComparator.compare(artifact, A, B)` **directly**, iterating `INVENTORY` (`inventory.ts`) as the artifact-list driver. It **bypasses `GenerationIntegrityCheckImpl`** (hardwired committed-vs-fresh, cannot ingest two fresh trees) and writes **no second normalization/comparison engine**. `compareTrees(rootA, rootB)` is pure over two roots (directly unit-testable); `runParity()` spawns the two mechanisms and cleans up scratch dirs in a `try/finally`.

**Design open question answered:** the orchestrator needs **only two roots**, NOT the `FreshGenerator` abstraction. Direct `fs.readFileSync` per path; `DiskFreshGenerator` was available as a per-tree reader but added nothing.

## 7.2 — Volatile-field normalization set (OQ-2)

**Built:** `src/tools/integrity/ParityNormalizationRules.ts` exporting `PARITY_NORMALIZATION_RULES = [...DEFAULT_NORMALIZATION_RULES, ...ADDED_PARITY_RULES]` — **composition, not mutation** (117's exported default left intact; a mutation would be a cross-spec regression). Unit tests: `src/tools/integrity/__tests__/ParityNormalizationRules.test.ts` + `ParityOrchestrator.test.ts` (17 tests).

**Reality (the load-bearing finding):** 117's existing `DEFAULT_NORMALIZATION_RULES` already neutralize **every** divergence observed between the two mechanisms — the only raw differences are volatile timestamps (`Generated:` headers in CSS/Swift `///`/Kotlin; DTCG `generatedAt`). After normalization the two trees are **semantically equal across all 11 non-optional artifacts with 117's defaults alone.**

**The 118 additions are defensive / class-completeness** (R4 AC4 is an open, evidence-driven set, not a closed list) — they don't change today's green under DEFAULTS but neutralize false-diff vectors a parity run under different conditions would surface:
- `rosettaVersion` + embedded `version` (DTCG version keys, `DTCGFormatGenerator.ts:226-237`) — stripped surgically; a package/format version bump between runs would otherwise false-diff.
- `extensions.themes` array (`DTCGFormatGenerator.ts:240-242`) — **both** flagged vectors normalized: conditional presence (empty/absent canonicalized to absent) AND positional array ordering (sorted by `name|mode`, since `SemanticComparator` compares arrays positionally).
- `duration` / build-timing — **enumerated and confirmed absent** from on-disk artifacts (the only `duration` matches are animation design tokens — token VALUES that must NOT be normalized). No rule added.

Each rule is **surgical** with a positive test (target ignored) + a sentinel test (a genuine token-value/theme change still surfaces) — 117's "a changed timestamp is ignored; a changed value is not" discipline.

## 7.3 — The four inventories

- `findings/entry-point-inventory.md` (R4 AC2) — the tsx (bin) / **ts-node (13 scripts, not the design's 11)** split; 3 MCP servers + browser bundle exempt (build-time bundling); tests via ts-jest. Names the 3 build-path ts-node scripts and the `scripts/**` typecheck-coverage gap (R6 AC3 input).
- `findings/export-condition-inventory.md` (R4 AC5) — import-only/require-only asymmetry; **`./config` now carries BOTH import+require** (changed by Inc-1 Task 3 — design table stale; verified against live `package.json`); the raw-`.ts` trio `./blend`/`./build`/`./types` each carry all three conditions **incl. `types`** → 3b must reconcile `types` too; `require('@3fn/core')` still resolves nothing (coherence question carried to 3b).
- `findings/esm-cost-inventory.md` (R4 AC6) — the shipped require-only `@3fn/core/jest-preset` blast radius; `moduleNameMapper` raw-`.ts` coupling to 3b; **SF-5 two-copies-in-lockstep** verified (preset `moduleNameMapper` + `init` `tsconfig.test.json` `paths` + `init` `jest.config.js`).
- **Parking-form determination (OQ-3)** in the ESM-cost finding §4 — read the actual compiled `dist/testing/jest-preset.js` (pure CJS `module.exports`): **parking form EXISTS** (rename to `jest-preset.cjs` + retarget the require-only condition survives a `"type":"module"` flip). → the **escape-hatch defer branch is available**; the "preset migrates in-spec" contingency likely does NOT fire. Final boot confirmation deferred to the Group-10 close-state guard.

## 7.4 — Divergence hypothesis + assembled evidence table

- `findings/divergence-hypothesis.md` — **REFUTED → clean exit.** The two mechanisms produce identical output (token-index byte-identical; no `BlendUtilities.*` under either), so resolution divergence is not a plausible contributor to the named gaps. Corroborated by the originating issues, which locate both gaps in **generator code** (the OKLCH token-index path — already fixed by Spec 117; the dormant blend-write path — owned by the holistic blend review), not the loader. The one resolution-genuine slice (CLI loader rejects config) was 118's and is fixed by Increment 1. Routed out of 118 — **not absorbed, not silently carried.**
- `findings/evidence-table.md` — the assembled green/red table (all non-optional artifacts GREEN) + the typecheck-coverage row (ts-node full / tsx none → feeds 3a) + the divergence-hypothesis row (refuted) + the four-inventory links. Honest scope note: parity-green means the *mechanism* doesn't corrupt output — it is **not** an argument for either direction; Task 8 rests on the inventories.

---

## Verification (main-loop, independent of the subagents)

| Check | Result |
|-------|--------|
| `npm run test:parity` | exit 0 — all 11 non-optional artifacts GREEN; scratch dirs cleaned (no `/tmp/parity-*` leakage) |
| New unit tests | 17 passing (`ParityNormalizationRules` + `ParityOrchestrator`) |
| `npm run build` | **exit 0** (mandatory per the spec's verification discipline) |
| `git diff token-index/` | **empty** — generation deterministic, no drift |
| `npx tsc --noEmit` | exit 0 |
| Full `npm test` | **376 suites / 8989 tests passing** (baseline 374/8972 → delta is exactly the +2 suites / +17 new tests; zero regression) |
| Working tree | only intended files; NO changes to `dist/`, `token-index/`, `package-lock.json` (only +1 `package.json` script line) |

---

## Key outcomes feeding Task 8

1. **The runtime-resolution mechanism is not a source of generation divergence** — ts-node and tsx produce semantically identical token artifacts. Whichever direction Task 8 commits, "the loader changes the output" is not a risk.
2. **The divergence hypothesis is refuted** — the generation gaps are decoupled from module-resolution coherence and routed to their real owners.
3. **The exports incoherences are inventoried** — the raw-`.ts` trio (incl. `types`), the import-only `.`, the require-only jest-preset blast radius.
4. **An ESM escape-hatch is viable** — the jest-preset parking form exists, so a native-ESM commitment is not blocked by an unavoidable in-spec preset migration.

**No swap/reconcile/migrate occurred. The evidence informs but does not pre-decide the direction (R4 AC8).**

---

## Honest caveats carried to Task 8

- The parity all-green is proven **under DEFAULTS** (no consumer config, no registered themes/product tokens). The 118 defensive normalization rules make the harness robust to a future non-DEFAULTS parity run but were exercised only against unit-test fixtures, not live divergent generation.
- The `version`-key strip is a recursive JSON key-name strip; it would also drop a (hypothetical) token group literally keyed `version`. Acceptable for this investigation harness (defensive, not load-bearing for today's result), and noted.
- OQ-3's parking form is a **format-level** determination from the compiled artifact; final confirmation is an actual `.cjs`-under-`"type":"module"` boot through the Group-10 close-state guard (correctly deferred).

## Artifacts

**Code (investigation harness — no production code):** `src/tools/integrity/ParityOrchestrator.ts`, `ParityNormalizationRules.ts`, `__parity__/run-parity.js`, `__tests__/ParityNormalizationRules.test.ts`, `__tests__/ParityOrchestrator.test.ts`; `package.json` `test:parity` script.
**Findings:** `findings/{parity-harness-notes,entry-point-inventory,export-condition-inventory,esm-cost-inventory,divergence-hypothesis,evidence-table}.md`.
