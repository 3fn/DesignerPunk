# Task 3.2 Completion — Run it; reconcile closure 2 with attribution classes; the closure-1 bite

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 3 · **Agent**: Ada (Sonnet)

## What changed

- Ran `npx tsx scripts/floor-closure.ts` against the real tree at this branch's head, writing `floor-closure.json`.
- Ran the closure-1 bite: `npx tsx scripts/floor-closure.ts --bite-closure-1 component/progress.ts`.

## Closure 2 reconciliation against Ada's R2 measurement — ZERO differences

Ada's R2 measurement (tasks.md § "Task 3", success criteria; also `feedback/tasks.md` § "[ADA R2]" (b)): **16 files, ~102 KB, no bare specifiers** — `src/types` ×2, `src/build/tokens` ×10, `src/registries` ×2, `src/constants` ×1, `src/build/types` ×1.

Live tool output (`floor-closure.json`, this branch):

| Bucket | Ada R2 | Tool (this run) | Difference | Class |
|---|---|---|---|---|
| `src/types` | 2 | **2** | none | — |
| `src/build/tokens` | 10 | **10** | none | — |
| `src/build/types` | 1 | **1** | none | — |
| `src/registries` | 2 | **2** | none | — |
| `src/constants` | 1 | **1** | none | — |
| **Total** | **16** | **16** | **none** | — |
| Bare specifiers | 0 | **0** | none | — |

**Every count matches exactly.** File identity also matches exactly (asserted in `scripts/__tests__/floor-closure.test.ts`'s "names the exact 16 files" test): `src/types/{PrimitiveToken,SemanticToken}.ts`; `src/build/tokens/{ComponentToken,ComponentTokenGenerator,PlatformTokens,TokenIntegrator,TokenSelection,TokenSelector,UnitConverter,defineComponentTokens,index,types}.ts`; `src/build/types/Platform.ts`; `src/registries/{PrimitiveTokenRegistry,SemanticTokenRegistry}.ts`; `src/constants/StrategicFlexibilityTokens.ts`.

**No differences to attribute** — the source-change/method/tool-defect taxonomy (Ada R1's own advisory, tasks.md § "Task 3") has nothing to classify this run. I traced the transitive path by hand before trusting the tool (recorded for audit): `component/progress.ts` non-type-imports `{ defineComponentTokens, getTokenContract }` from `../../build/tokens` (resolves to `src/build/tokens/index.ts`); its barrel non-type-exports `defineComponentTokens.ts`, `TokenIntegrator.ts`, `TokenSelector.ts`, `ComponentTokenGenerator.ts`, `UnitConverter.ts` (5 more files) and type-only re-exports `types.ts`, `TokenIntegrator`'s own types, `TokenSelection.ts`, `PlatformTokens.ts`, `ComponentToken.ts` (which would be EXCLUDED under a naive "only follow index.ts's own non-type exports" reading); those last four are pulled in anyway because `TokenIntegrator.ts` itself non-type-imports `TokenSelection`, `PlatformTokens`, and `ComponentToken` directly (`TokenIntegrator.ts:12–14`) — closing the set at exactly 10. `PrimitiveTokenRegistry.ts`/`SemanticTokenRegistry.ts` (2) come in via `TokenIntegrator.ts`/`TokenSelector.ts`/`ComponentTokenGenerator.ts`'s non-type imports of them; `StrategicFlexibilityTokens.ts` (1) via `PrimitiveTokenRegistry.ts`'s non-type import; `Platform.ts` (1) via `UnitConverter.ts`'s `import { Platform } from '../types/Platform'`. `progress.ts`'s OWN `import type { RegisteredComponentToken } from '../../registries/ComponentTokenRegistry'` is correctly EXCLUDED (type-only) — `ComponentTokenRegistry.ts` is NOT in the closure, matching "registries ×2" (not 3).

## Closure-1 bite — recorded red

Command: `npx tsx scripts/floor-closure.ts --bite-closure-1 component/progress.ts`

Result:
```
Closure 1: 54 files checked, 1 escaping references (BITE: skipped rewrite on component/progress.ts)
...
BITE CONFIRMED RED: skipping the rewrite on component/progress.ts produced 1 escaping reference(s), as expected.
```

The escaping reference: `{ "file": "component/progress.ts", "specifier": "../../build/tokens" }` — with the rewrite skipped, `progress.ts`'s OUT-OF-TIER specifier (`'../../build/tokens'`, which correctly rewrites to `@3fn/core/build` on a normal run) is left as a raw relative path, and the independent re-scan correctly flags it as unresolvable inside the mirrored tier root. This confirms the escape scan is live — a real defect (an unrewritten out-of-tier specifier) is caught, not silently passed.

The bite mode never writes `floor-closure.json` (confirmed by `git status --porcelain` showing no change to that file after the bite run) — only the committed non-bite run's output is the recorded snapshot.

## Closure-1 normal run — zero escapes

```
Closure 1: 54 files checked, 0 escaping references
```

## Targeted tests + result

Covered by Task 3.1's suite (same tool): `npx jest --config scripts/jest.config.js scripts/__tests__/floor-closure.test.ts` → **15/15 passed**, including the live-tree reconciliation and bite tests, re-run here to confirm this subtask's specific claims are exercised by a re-runnable test, not only a one-time CLI invocation.

## Application-time adaptations

None beyond what's recorded in Task 3.1's completion doc (the scratch-depth and comment-stripping fixes were made building the tool in 3.1; this subtask is the run + reconciliation against that already-corrected tool).

## Known issues

None.
