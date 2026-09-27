# Task 8 Completion — The harvest-zero lint

**Spec**: 123 — Consumer Distribution · **Unit**: U1 — Distribution substrate & packaging truth (Tasks 1–9, gated at Task 9) · **Type**: Implementation · **Validation**: Tier 2
**Agent (plan)**: PRIMARY Ada (Sonnet)
**Delegated-tier**: plan held
**Traces**: Reqs 8.1–8.4 · design C11

---

## Success Criteria

These rows are exactly what `parseTasksMd` extracts for parent 8: **2 rows** (2 top-level bullets, no nested sub-bullets).

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **The rename's PROPERTY holds before the lint merges**: `npx designerpunk generate` over our own source emits **zero harvest-zero warnings**, **executed before 8.2's merge commit** (ancestry cited). The file count (`find src/components -name "*.refs.ts"`) is recorded alongside as corroboration only. *(A count proves filenames; zero warnings proves the property — Lina.)* If the rename has not merged, this parent **BLOCKS**. | ✅ verified met | `git merge-base --is-ancestor e5126cf5 HEAD` → `IS ANCESTOR` (#200, "Rename the 7 component token reference maps to `*.refs.ts`"). `find src/components -name "*.refs.ts"` → 7 files (corroboration only). With 8.2's lint code present in the working tree but **uncommitted**, `npx designerpunk generate` run 2026-09-27T15:18:49Z produced zero lines matching `harvest\|warn\|⚠` in its output — the property held **before** the landing commit `db901003` (Task 8.1/8.2). Full ordering, transcript and grep result: `.kiro/specs/123-consumer-distribution/completion/task-8-1-completion.md` |
| A fixture with one unbranded `tokens.ts` → exactly one warning, exact string. | ✅ verified met | `src/cli/__tests__/loadComponentTokens.test.ts` § "harvest-zero lint (Spec 123 C11, Req 8)" — `an unbranded tokens.ts fires exactly one warning, exact string`: `expect(warnSpy).toHaveBeenCalledTimes(1)` + `expect(warnSpy).toHaveBeenCalledWith(harvestZeroWarning(filePath))` (string-equal, not a substring match). `npm test -- src/cli/__tests__/loadComponentTokens.test.ts` → 11/11 passed. Bite recorded red (warning call removed → test failed with `Received number of calls: 0`; restored, re-verified green): `.kiro/specs/123-consumer-distribution/completion/task-8-2-completion.md` |

Unmet or partially met criteria: None

---

## Additional verification

**Primary Artifacts: all shipped as declared** — `src/cli/loadComponentTokens.ts`, `src/cli/__tests__/loadComponentTokens.test.ts`.

No `**Merge gate:**` block is declared for this parent (`parseTasksMd` → `mergeGate: []`). No artifact is deferred to a later unit.

### The warning string — flagged for a Thurgood erratum

`design.md`'s C11 entry reads only "Unchanged" and carries no exact-string catalog row (unlike most 123 catalog strings elsewhere in the spec). The shipped wording follows `design-outline.md` § 4.5's proposed phrasing (Lina, R1) as closely as an implementation string can:

```
⚠️  ${file}: this scanned file harvested zero component tokens; if you meant to register values, call `defineComponentTokens`.
```

Recorded in `harvestZeroWarning`'s own docstring in `src/cli/loadComponentTokens.ts`, and flagged here for Thurgood to add the corresponding row to design.md's C11 catalog.

### Validation

Run before this doc's commit (branch `task/123-u1-substrate`):

- `npx tsc --noEmit` → 0 errors.
- `npm test` → **384 suites, 9268 tests passed**.
- `npm run test:scripts` → **11 suites, 219 tests passed**.
- `npx tsx scripts/pack-assert.ts` → **40/40 assertions passed**.
- `npm run check:completion-criteria-parity` → see § "Parity result" below.
- Build noise (`docs/tokens.css`, `token-index/semantics.yaml`, `token-index/meta.json`) was reverted before every commit.

### Parity result

```
SUMMARY: parents evaluated 11, pass 11, fail 0; emissions 0; reds 0
```

(Recorded after this doc's own commit ticks parent 8 — parent 8 joins parents 1–7 of spec 123 plus the 3 parents of spec 127.)

---

## Notes for Task 9 (the unit's gating parent)

- `loadComponentTokens.ts`'s harvest-zero lint fires on any `tokens.ts` / `*.tokens.ts` file (either discovery source) with zero branded exports. Task 5's migration report (`Migration.ts`, `TOKEN_SIDE_SLOTS.oldNameReferenceMaps`) already tells consumers this is a warning, not an error, and that `generate` still runs — confirmed unchanged by this task: `runGenerate` in `src/cli/designerpunk.ts` calls `loadComponentTokens(config)` unconditionally and does not branch on its return value or on any new signal from this lint.
- No design.md erratum was authored as part of this task (out of Ada's write scope for this parent's Primary Artifacts) — the flag above is the handoff to Thurgood.
