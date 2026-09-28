# Task 13.1 Completion — Dispositions schema (explicit rows; per-member frontmatter; no re-pointed embeds; rejected term)

**Spec**: 123 — Consumer Distribution · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Thurgood (Opus)

**CI-provenance**: branch-head dispatch @ f2e4430358313abf1d2427a11fa8aa5046731168 — https://github.com/3fn/DesignerPunk/actions/runs/36381132940, https://github.com/3fn/DesignerPunk/actions/runs/36381138135, https://github.com/3fn/DesignerPunk/actions/runs/36381143165, https://github.com/3fn/DesignerPunk/actions/runs/36381148859, https://github.com/3fn/DesignerPunk/actions/runs/36381153967, https://github.com/3fn/DesignerPunk/actions/runs/36381159112

**Write scope**: tasks-row grant (`.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`). Task 13's Primary Artifacts list "schemas + validator" with no path. This subtask reads that entry as the new `tools/agent-generator/regrounding/dispositions.ts` (schema + validator) and `tools/agent-generator/regrounding/check-catalog.ts` (the nine checks' exact strings and count). **Disclosed as out-of-list on a strict reading**: the two test files, `tools/agent-generator/__tests__/dispositions.schema.test.ts` and `tools/agent-generator/__tests__/check-catalog.test.ts`. The row names no tests, but its nine-check criterion requires a named test for each check. The `tasks.md` checkbox and this doc are in Thurgood's charter scope (`.kiro/specs/**`). No other file changed. `canonical/generated.lock` was refreshed by a local diff-guard run and then reverted (adaptation 10).

## What changed

- **`regrounding/dispositions.ts`** (new) is the schema for consumer-profile dispositions files (design C17). It exports the types, the closed vocabulary, `validateDispositions(doc, file, { entries? })` (returns every finding), `loadDispositions` (parses the file, validates it, and throws `DispositionsError` carrying every finding) and `parseDispositions`. It covers the three file kinds C17/C19 name: `<agent>.dispositions.yaml` (`body:` + `frontmatter:`), `_shared.dispositions.yaml` (`members:`, keyed by shared-catalog id) and `always-set/<id>.dispositions.yaml` (`body:` + `counterpart:`). The four properties 13.1 names:
  1. **Explicit rows** (DD25): `retained` is a term, not a default. A row that is null or empty, or that has no `disposition:`, is refused (`no-term`). *That every unit has a row is 13.5's missing-row refusal; this schema never reads absence.*
  2. **Per-member frontmatter** (DD26): given the canonical entry tree, a frontmatter key that names a `list`/`map` node is refused (`container-key`). A key that names nothing is left to 13.5's orphaned-key refusal.
  3. **No re-pointed embeds** (DD19): `re-pointed` on an `ambient[…]` key is refused (`re-pointed-embed`). The embed predicate is the one `spans.ts` uses (`startsWith('ambient[')`).
  4. **The rejected term** (Req 11.2.2): `repo-bound-in-entirety` emits its own named error, never the unknown-term error. It is one of Task 13's nine checks.
- **Vocabulary is bound to `spans.ts` at compile time.** `spans.ts` reads a subset type ("Task 13.1 owns the schema"). A type-level equality assertion fails `tsc` if the two vocabularies drift (bite 5). `spans.ts` itself is not edited.
- **`regrounding/check-catalog.ts`** (new) is the nine-check registry. It holds the nine exact strings, copied verbatim from design.md § "Error Handling — the loud-failure catalog", with each check's owning subtask, plus `fillTemplate` (strict: every placeholder filled, every var used). `check-catalog.test.ts` asserts the count, **9**, the strings and the split. It lands the criterion's "Count asserted." A check's named test and bite are recorded when its subtask lands (`test:` field).
- **`tasks.md`**: 13.1 ticked (checkbox only).

## The nine-check split (quotable for Lina's brief)

Nine checks: **Thurgood 7** (13.1: 1 · 13.2: 3 · 13.3: 3) · **Lina 2** (13.5). Registry: `tools/agent-generator/regrounding/check-catalog.ts`, asserted by `check-catalog.test.ts › records the 13.1 split`.

| # | Check | Subtask | Owner | Exact string (design § "Error Handling") |
|---|---|---|---|---|
| 1 | orphaned key | 13.5 | Lina | `disposition/overlay key <k> names nothing in <file> — the unit was renamed or removed; re-key or delete the row` |
| 2 | missing row | 13.5 | Lina | `<unit\|entry> in <file> has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)` |
| 3 | wrong confirmer | 13.3 | Thurgood | `operative set for <file> declares confirmer <x>; the C1 rule requires <y>` |
| 4 | wrong signer | 13.3 | Thurgood | `signature on <anchor> is by <x>; the C1 rule requires <y> (owner <o>, profile author <p>)` |
| 5 | stale signature | 13.2 | Thurgood | `signature on <anchor> is stale — its canonical or rendered content changed since signing; re-sign or refuse` |
| 6 | bare signature | 13.2 | Thurgood | `signature on <anchor> carries no itemized assent — list the surviving item ids or refuse` |
| 7 | stale overlay | 13.2 | Thurgood | `overlay for <anchor\|entry> re-grounds canonical text sha256:<pinned>, but the current canonical is sha256:<now> — re-author the overlay; refusing to derive` |
| 8 | item text not verbatim | 13.3 | Thurgood | `operative item <id> in <file>: text is not a verbatim substring of canonical unit <anchor> — re-confirm with the complete canonical text` |
| 9 | `repo-bound-in-entirety` | **13.1 (landed)** | Thurgood | `` `repo-bound-in-entirety` is not a disposition. Under R5, a repo-bound section is the paradigm case for re-pointing. Choose `re-pointed`, `superseded-by`, or `no-consumer-counterpart`. `` |

- **Stale overlay → 13.2.** 13.2's title ("Overlay + signature formats; stale and bare checks") is read as covering both stale checks. 13.2 builds the pin format (`## @unit #<anchor> @ sha256:<hash>`) and the pure staleness check with its named test and bite. Wiring the refusal into `derive()` (`derive.stale-overlay.test.ts`, the Task 15 criterion "derive() refuses on a stale overlay … over the real profile") stays with 15.2.
- **Lina's two (13.5)** build their messages from the registry: `fillTemplate(nineCheck('missing-row').template, { 'unit|entry': …, file: … })`. The registry fixes the design's strings, not her implementation. If she needs a string change, it is a design erratum, and the registry and its test move with it.

## The shape 13.4 / 13.5 read

- `DispositionsFile = { source; counterpart?; body?; frontmatter?; members? }`. Row maps are keyed by `partition()` anchor (body), `entryTree()` **leaf** path (frontmatter) or shared-catalog id (members).
- `DispositionRow = { disposition; destination?; removals?: { text; cites }[]; cites?; signature? }`. `cites` ∈ `subtraction-1` … `subtraction-5` (Req 11.1.2's five SUBTRACT bullets).
- Field applicability, validated:

  | term | destination | removals | cites |
  |---|---|---|---|
  | `retained` | — | — | — |
  | `re-pointed` | required | allowed | — (cites live per removal) |
  | `superseded-by` | required | — | allowed |
  | `no-consumer-counterpart` | — | — | allowed |

- **For 13.4 (triviality)**: C18's "no removal cites subtraction 1–4" reads `row.removals[].cites`. The entry set (a non-byte-identical rendering) is rendering-based and does not read this schema.
- **For 13.5 (keys)**: `source:` names the canonical file to partition or entry-tree. `validateDispositions` deliberately does not refuse unknown keys; the orphan refusal is 13.5's.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/dispositions.schema.test.ts tools/agent-generator/__tests__/check-catalog.test.ts` → **Test Suites: 2 passed · Tests: 26 passed, 26 total** (schema 22, catalog 4).
- **Named test for the rejected term** (nine-check #9): `dispositions.schema.test.ts › the rejected term (Req 11.2.2) — one of Task 13's nine checks › repo-bound-in-entirety is a named rejected term, not an unknown one`.
- **Bites**: each mutation was applied to the working file, the named test was run, and the file was restored from a scratch copy (`cmp` clean). The suite was re-run green afterwards: `Tests: 22 passed, 22 total`, catalog `4 passed`.

  | # | Mutation | Result |
  |---|---|---|
  | 1 — **nine-check #9** | delete the `term === REJECTED_TERM` branch, so the term falls through to the vocabulary check | **RED** `✕ repo-bound-in-entirety is a named rejected term, not an unknown one`. Diff: `- "check": "repo-bound-in-entirety"` / `+ "check": "unknown-term"`; `- "message": "`` `repo-bound-in-entirety` is not a disposition. Under R5, a repo-bound section is the paradigm case for re-pointing. Choose `re-pointed`, `superseded-by`, or `no-consumer-counterpart`. ``"` / `+ "message": "disposition 'repo-bound-in-entirety' on #the-owed-set-pipeline in canonical/profiles/consumer/twin.dispositions.yaml is not in the vocabulary — use retained, re-pointed, superseded-by, no-consumer-counterpart"` |
  | 2 | `EMBED_TERMS` admits `re-pointed` | RED `✕ refuses re-pointed on an ambient embed` — `Tests: 1 failed, 21 passed` |
  | 3 | the container check fires only on the root (`node.kind === 'root'`) | RED `✕ refuses a key naming a list or a map — its members are the rows` — `Tests: 1 failed, 21 passed` |
  | 4 | an absent `disposition:` is accepted (the check narrowed to `!isMap(row)`) | RED `✕ refuses a row that names no term (null, empty, or no disposition field)` — `Tests: 1 failed, 21 passed` |
  | 5 | the vocabulary drops `superseded-by` (drifting from `spans.ts`) | `tsc` RED: `dispositions.ts(75,7): error TS2322: Type 'true' is not assignable to type 'false'.` |
  | 6 — count | delete the `stale-overlay` registry entry | RED `✕ registers exactly nine checks — count asserted`: `Expected length: 9` / `Received length: 8` (3 failed, 1 passed) |

- `npm run test:agent-generator` → `Test Suites: 32 passed, 32 total · Tests: 457 passed, 457 total`.
- `npx jest --config jest.functional.config.js src/__tests__/operative-set-records.test.ts` → `Tests: 22 passed, 22 total` (the precursor test is untouched).
- `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0. `npx tsc --noEmit` (root) → exit 0.
- `npm run audit:coverage-map` → `audit:coverage-map: PASS (surfaces PASS · lanes PASS)`, `blank: 9 · adjudicated-blank: 9` (unchanged; `tools/` is not a mapped surface). `npm run check:122:diff-guard` → `diff-guard: full-run-green (input-closure-changed)`.
- Parity after the tick: `npm run --silent check:completion-criteria-parity` → `SUMMARY: parents evaluated 15, pass 15, fail 0; emissions 0; reds 0`.

## Application-time adaptations

1. **Placement.** "schemas + validator" became a new `regrounding/` module (the directory `triviality.ts` will join), not an edit to `schema.ts` (122's charter schema) or `spans.ts`. `spans.ts`'s subset type is bound to the new vocabulary at compile time rather than re-pointed to it, so no unlisted file is edited.
2. **`source:` is a required top-level field**, added although design C17's example has none. The keys need their canonical file for 13.5's orphan and missing-row checks. It mirrors C16's records, which carry `source:`. `counterpart:` (C19) is optional, and `members:` is the section key for the shared file: C17 names the file, not its key.
3. **`superseded-by` requires `destination:`.** This reads Req 11.2.1 ("names a destination") and the design-outline vocabulary table (`superseded-by` "names a section that exists"). The design's example shows no `superseded-by` row.
4. **The field-applicability table is this subtask's interpretation.** The design shows `cites` on a whole-row `no-consumer-counterpart` and per-removal `cites` on a `re-pointed` row. Nothing specifies `superseded-by`, which here may carry a whole-row `cites`.
5. **Ten non-catalog strings authored here**: `unknown-term`, `no-term`, `missing-destination`, `field-not-applicable`, `unknown-field`, `bad-cite`, `bad-removal`, `container-key`, `re-pointed-embed`, `file-shape`. The design catalog has no row for these schema refusals. **None of them is one of the nine**, and none is counted there.
6. **The rejected term's exact string** is design-outline.md § "The vocabulary defect"'s form (the term prefixed). It contains Req 11.2.2's quotation verbatim as its suffix, and the test asserts both. The catalog row says "(unchanged)".
7. **The nine-check registry and its count assertion landed at 13.1**, earlier than the checks themselves, so the split and the strings are mechanical from the start rather than prose. The count assertion still depends on each subtask landing its named test and bite. The test that checks every entry's `test:` field is filled is **carried**: whichever of 13.3 or 13.5 lands last adds it.
8. **Stale overlay is assigned to 13.2**, with the `derive()` wiring left to 15.2 (see the split).
9. **`signature` is opaque in 13.1.** It is accepted on any row and not validated. Its format and its stale, bare and signer checks are 13.2 and 13.3.
10. **`canonical/generated.lock`**: a local `check:122:diff-guard` run refreshed its `inputClosure`, because `tools/agent-generator/**` is in the input closure. I reverted it rather than commit an unlisted file. A stale lock makes CI's diff-guard take a full run, not fail.

## Not established by 13.1 (forced negatives)

- That every unit has a row, or that no key is orphaned: 13.5.
- That a removal's citation **applies** (clause (iii)). 13.1 also does not require a `no-consumer-counterpart` row to carry `cites`; clause (iii) is no Task 13 deliverable.
- That a destination derives from its source: Task 14's 11.4 checker.
- Anything about signatures: 13.2 and 13.3.
