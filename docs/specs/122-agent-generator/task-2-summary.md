# Task 2 Summary — Pipeline engine (Spec 122, U1)

**Status**: Done on branch `task/122-substrate` (parent inside unit U1; accepted at U1's merge, Task 8).
**Date**: 2026-07-09

Built the pipeline engine (design §C3) — the three content operations wired into a
deterministic engine the adapters (Task 5) emit from:

- **Resolve (2.1)** — `CorpusResolver` over an injectable client: id resolution + the interim section form (id resolves AND verbatim heading exists), with a real stdio-spawned docs-MCP client (DD10). Plus the two foundations everything rests on: `canonical-json.ts` (deterministic serialize — the P1 backbone) and `source.ts` (frontmatter/body loader with `# asserts:` companion capture).
- **Render + pass-through (2.2)** — WORKFLOW_RULES filter+render (sorted, propagating), field-driven write-scope notes (different paths → different note), enum-driven run-context annotations, field-assembled cue/route sentences; pass-through verbatim.
- **Ambient composition (2.3)** — `alwaysSet ∪ agent.ambient` union with delivery lanes (shared/per-agent), per-target manifest, verdicts honored as data (none-trim/catalog-is-manifest/empty). P3 (manifest ⊇ always-set) holds.
- **Attribution (2.4)** — sidecar `<output>.attribution.json` + the P2 totality checker (spans tile 1..N: total, non-overlapping, valid ops).
- **Spine (`pipeline.ts`)** — `validate()` (schema rules + anti-duplication guard + per-doc rule-1 enforcement, closing Task 1 open item 1) and `resolveAgent()`; `emit()` is the forward contract implemented with adapters (Task 5).

**Validation**: agent-generator lane 108/108; full `npm test` 8987/8987 (zero regressions); both typechecks clean; live-MCP resolver smoke confirms real section resolution end-to-end.

**Execution note**: run in the main loop (Opus) rather than delegated — Task 2 is the determinism-critical spine (P1 gates every downstream guard), a conscious model-evolution upgrade over the settled-design-implementation default.

**Open items** (tracked, non-blocking): `emit()`/adapters are Task 5; `ResolveContext` gains registry (Task 4) + skillsMap (Task 3) additively; the `shared-catalog` ratification crossRef (Task 1 open item 2) is still open pending a Peter decision before Task 7. See the completion doc.
