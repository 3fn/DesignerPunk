# Task 2 Completion — The pipeline engine: resolve, render, pass-through, attribution

**Spec**: 122 — Agent Generator
**Unit**: U1 (Substrate) — parent inside a multi-parent unit; **no PR at this completion** (U1's PR opens at Task 8).
**Type**: Parent
**Date**: 2026-07-09
**Branch**: `task/122-substrate`

---

## What was built

The pipeline engine (design §C3) — the three content operations wired into a coherent,
deterministic engine the adapters (Task 5) will emit from. All output-bearing code is
deterministic (sorted collections, no timestamps): the C6 precondition (P1).

### 2.1 — Corpus resolver (C3.1) + determinism backbone + source loader
- **`canonical-json.ts`** — `canonicalStringify`/`canonicalize`: recursive key-sort, preserved array order, dropped-undefined, two-space indent + single trailing newline. **The P1 backbone every diff-guarded JSON output is serialized through.**
- **`source.ts`** — `parseCanonicalAgentSource`: YAML frontmatter (js-yaml) + verbatim body split, with **positional capture of the inline `# asserts:` companion** js-yaml would otherwise drop (A-D2) — no silent loss of rule-3 data. Malformed-source rejection.
- **`resolve.ts`** — `CorpusResolver` over an injectable `CorpusClient`: bare-id resolution + the **Req 3 AC2 interim section form** (id resolves AND verbatim heading exists), missing-doc short-circuit, id+heading failure descriptions. Real `StdioCorpusClient` spawns the compiled docs MCP over stdio (DD10), one reused session; not-found keyed on `isError` (ambiguous headings count as existing, verified against `get-section.ts`).

### 2.2 — Render (class-c) + pass-through (class-b) — `render.ts`
- `renderPassThrough` (identity by contract — Req 1 AC2, no synthesis).
- `renderWorkflowRules` — filter by `appliesToTools` ∩ agent tools, render each `statement` verbatim, **sorted by id** (determinism); a source change re-renders everywhere (Req 4 AC2).
- `renderWriteScopeNote` — **field-driven** from `allowedPaths` (different paths → different note, Req 11 AC3).
- `renderRunContextAnnotation` — enum-driven mechanical annotation (Req 12 AC3; `this-repo` → none).
- `renderToolCue` / `renderDocRoute` — WHEN/THEN sentences assembled purely from fields (P4); doc routes address by id/heading, never a physical path.

### 2.3 — Ambient composition (C3.2) + manifest emitter — `compose.ts`
- `composeAmbient` — `membership = alwaysSet ∪ agent.ambient` (Req 9), members tagged with **delivery lane** (`shared` vs `per-agent`, for the C11 two-lane split) + per-target `delivery`, deduped (shared wins), **sorted by id**. P3 holds: manifest ⊇ always-set.
- `deriveGroundTruthDirective` — verdicts honored as **data** (Req 10 AC2/AC3): `none-trim-stale-snapshots` → suppress artifact refs + carry trims; `catalog-is-manifest` → the `get_component_full`+`get_component_health` faithfulness verbs (Req 10 AC3); `empty` → intentional; `none-standing`/`collapses-into-catalog` → base. No standing manifest built.
- `parseAlwaysSet` — reads the committed `always-set.yaml` shape; `serializeAmbientManifest` via the canonical serializer.

### 2.4 — Attribution sidecar (C3.3) + totality checker (P2) — `attribution.ts`
- Sidecar `<output>.attribution.json` shape (DD2): line-span → `op` ∈ {resolve, render, passthrough} → source (+ `mode: embed` for CC inline-resolved spans).
- `checkAttributionTotality` (P2) — asserts spans **tile 1..N exactly**: total (no gap), non-overlapping, valid ops, correct end boundary; reports every violation. `AttributionAccumulator` builds total-by-construction spans in emission order.

### Spine — `pipeline.ts`
- The C3 `Pipeline` interface (forward contract) + `ResolveContext` / `ResolvedAgent` / `EmittedArtifact` types.
- `validate(doc, alwaysSetIds)` — composes the five schema rules (schema.ts) + the WORKFLOW_RULES anti-duplication guard + **per-doc rule-1 enforcement** (see below).
- `resolveAgent(doc, ctx)` — resolves `routes.docs` + `governanceAsLaw` section refs via the corpus resolver (reports, does not throw), composes both targets' ambient manifests.
- `emit(agent, adapters)` — **declared in the interface, implemented with the adapters (Task 5 / C4)** — slots in with no spine change (Req 24 AC3).

### Task 1 open item 1 — CLOSED here
Task 1 flagged that rule 1's per-doc enforcement belonged in C3/Task 2. Done:
`validateFrontmatterClasses` maps each **actual** top-level frontmatter key to its content
class and runs the discriminator, so an unknown/undeclared frontmatter key fails rule 1 by
construction (test: `bogusUnregisteredKey` fails and is named; a known-keys-only doc does
not false-positive).

---

## Verification (main-loop, Opus)

- **Design fidelity**: each module written directly against design §C3 (C3.1/C3.2/C3.3), §"The three content operations", and the schema.ts types. Determinism (P1) enforced via the canonical serializer + sorted collections in render/compose.
- **Unit lane**: `npm run test:agent-generator` → **108/108 pass** (9 suites; +65 new tests over Task 1's 43). Covers: canonical determinism (byte-identical under key reorder), source parse + `# asserts:` positional capture, resolver interim-section-form (fake client), render field-driven/sorted/propagation, ambient union/dedup/verdicts (incl. parsing the **real** `always-set.yaml`), attribution totality (positive/gap/overlap/bad-op/boundary), pipeline validate + resolveAgent integration, rule-1 per-doc.
- **Live-MCP integration smoke** (out of the functional lane, per design — the stdio client spawns a subprocess): the real `StdioCorpusClient` against the running docs MCP confirmed — bare governance docs resolve (`rosetta-system-architecture`, `token-governance`, `contract-system-reference`), a real section heading resolves TRUE, and a fake heading on a resolvable doc reports `idResolved:true/headingExists:false`. (Steering ids like `core-goals` correctly DON'T resolve via the governance-only docs MCP — they resolve via `.kiro/steering/**` at emit time, which is why C6's closure spans both roots.)
- **Typecheck**: agent-generator `tsc --noEmit` clean; root `tsc --noEmit` clean.
- **Parent validation**: `npm test` (full functional lanes) → **377/377 suites, 8987/8987 tests pass** — zero regressions. (The pre-existing `init.test.ts` drift Task 1 flagged is resolved on `main` and merged in here; the suite is green.)

## Delegated-tier capture (per Task-Completion-Protocol)
- Planned `**Agent**: Thurgood` (Sonnet-implied for settled-design implementation) for subtasks 2.1–2.4. **Executed in the MAIN LOOP (Opus) — a deliberate model-evolution divergence.** Reason: Task 2 is the **determinism-critical spine** of the whole spec (P1 is the precondition for every downstream guard; a determinism bug here surfaces late as a flaky diff-guard), and the four operations integrate tightly through one pipeline — main-loop coherence beat delegate-then-reconcile, and it sidestepped the worktree-edit hazard on foundational code. Cognitive-demand estimate upgraded implementation→main-loop on the blast-radius signal, as flagged to Peter before starting.

## Open items (carried forward — NOT blocking Task 2)
1. **`emit()` + adapters → Task 5 (C4).** The render/compose/attribution outputs are consumed by the per-target adapters; `emit` is declared in the `Pipeline` interface but implemented in Task 5. `ResolveContext` gains `registry` (C5/Task 4) and `skillsMap` (C2.2/Task 3) as those land — additive, no spine change.
2. **`shared-catalog.yaml` crossRef TODO (Req 13 AC2) — STILL OPEN (Task 1 open item 2).** Unchanged by Task 2; still needs a Peter decision before Task 7 (sweep 1). Not a Task 2 surface.
3. **StdioCorpusClient not in the Jest functional lane — by design.** It spawns a subprocess (wall-clock, non-deterministic); resolver *logic* is unit-tested with a fake, the stdio adapter is smoke-verified here and will be exercised for real at generation time (Tasks 8+). If a standing integration test is wanted, it belongs in a separate (non-functional) lane.
