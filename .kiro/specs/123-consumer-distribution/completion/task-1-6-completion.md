# Task 1.6 Completion — The string-conformance test

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 1 · **Agent**: Ada (Sonnet)

## What changed

- `src/cli/shared/errorCatalog.ts` (created in Task 1.5, exercised here): every function transcribes design.md's § "Error Handling — the loud-failure catalog (exact strings)" verbatim — no paraphrasing, no added punctuation.
- `src/cli/__tests__/errorCatalog.test.ts` (new): the string-conformance test. Transcribes the SAME seven catalog rows a second time, independently, directly from design.md, into a `DESIGN_ROWS` comparand table (born · partial ×4 · package-mode · explicit-`TOKEN_INDEX_DIR` — seven rows, count asserted), and asserts `errorCatalog`'s output is `toBe` (string-equal, not just structurally similar) the transcribed row for every case.
- Wired the catalog into both MCP servers' bootstraps (application + product) at Task 1.5 — see that completion doc for the wiring detail; this subtask is specifically the CONFORMANCE TEST that the strings those two call sites use are the design's own strings.
- Fixed a stale, misleading line in `application-mcp-server/src/index.ts`'s `start()`: `Token index not available (Spec 096 pending)` — Spec 096 shipped long ago, and the line now fires for the birth-detection refusal reasons this subtask's catalog covers, printed a second time with the wrong justification right after the accurate one. Removed (see task-1-5-completion.md's "What changed").

## Targeted tests + result

- `npx jest src/cli/__tests__/errorCatalog.test.ts` → **8/8 passed** (the row-count assertion + one test per of the seven rows).
- `npx jest application-mcp-server/src/__tests__/errorCatalogWiring.test.ts` → **4/4 passed** (the reason→message dispatch, application server).
- `npx jest product-mcp-server/src/__tests__/errorCatalogWiring.test.ts` → **4/4 passed** (the same dispatch, product server — see task-1-5-completion.md's adaptation note on why this copy wasn't independently bit-tested).
- Compiled-bootstrap smoke (see task-1-5-completion.md) confirmed the EXACT `partial: tier-no-config` catalog string appears verbatim in both servers' real stderr output, not a paraphrase.
- Full `npm test` (root) → **376 suites, 9135 tests passed**. `npx tsc --noEmit` (root, `application-mcp-server/`, `product-mcp-server/`) → clean.

### Bites recorded red

1. **Row-count assertion is non-vacuous** — deleted the `explicit TOKEN_INDEX_DIR missing` key from `DESIGN_ROWS` (and its dependent test, to keep the file compiling — the established convention for a compile-blocked bite). Re-ran `-t "exactly seven"` → **RED**: `Expected: 7, Received: 6`. Restored; confirmed the file's final state matched the pre-bite content exactly (`grep` check on the test description string).
2. See task-1-5-completion.md bite #4 for the `run-generate` born/package-mode dispatch bite, which is equally a Task 1.6 (string-selection) concern as a Task 1.5 (wiring) one — recorded once, referenced from both docs rather than duplicated.

## Application-time adaptations

1. **Scope of "the covered rows."** The criterion names "the born, partial ×4, package-mode and TOKEN_INDEX_DIR rows" — six named plus the explicit-env row makes seven total once `TOKEN_INDEX_DIR` (which the design table lists as its own row, "explicit `TOKEN_INDEX_DIR` missing") is counted separately from the generic born-index-absent row. I built the conformance test around exactly these seven, matching the criterion's own enumeration rather than covering the FULL error catalog table (which has ~35 additional rows for other parents' work — name-contract messages, migration messages, signature/attestation messages, etc. — explicitly out of Task 1's scope).
2. **`tokenOrigin`-on-responses is out of scope here too** — see task-1-5-completion.md's adaptation #3; restated because it was raised as a 1.6 item in the orchestrator's brief specifically ("whether `tokenOrigin` labels must appear on responses"). The catalog table Task 1.6's own criterion text points at has no `tokenOrigin` field; I did not add one to tool responses.
3. **The `partialCaseMessage`'s `config-no-tier` wording residual, carried from Task 1.1/1.5**: when `tokenSource` is present but non-literal (Peter's ruling), the `<tokenSource>` slot renders as the fixed phrase `(a non-literal tokenSource value in designerpunk.config.ts)` rather than a real path — because there is no real path to report. This is a template-filling choice, not a new catalog string; the base template is design's own `config-no-tier` row, unmodified. Flagged again here since Task 1.6 is where string fidelity is specifically checked, and this ONE case (non-literal tokenSource) is the one instance where the template is filled with a descriptive placeholder rather than an actual value.

## Task 1 criteria this subtask closes out

This was the last open Task 1 success criterion ("Every catalog string this parent emits is string-equal to its design row"). See the parent-level checklist relayed to the orchestrator for the full Task 1 criteria-by-criteria status — Task 1's parent completion doc is NOT created by this subtask (per the orchestrator's explicit instruction: parent completion waits on Peter's tokenSource-hold ruling verification, which is separately Peter-ruled as of this session but still pending the orchestrator's own confirmation pass).
