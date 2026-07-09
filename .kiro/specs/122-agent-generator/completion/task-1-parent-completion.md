# Task 1 Completion — Canonical source root, schema, and shared substrate files

**Spec**: 122 — Agent Generator
**Unit**: U1 (Substrate) — parent inside a multi-parent unit; **no PR at this completion** (U1's PR opens at Task 8).
**Type**: Parent
**Date**: 2026-07-09
**Branch**: `task/122-substrate`

---

## What was built

The canonical source substrate the pipeline engine (Task 2) will read. No generated output yet — this task builds the source of record.

### 1.1 — Canonical root + skills neutral root (Setup)
- `canonical/` tree per design §"Repository layout": `agents/`, `shared/`, `registry/`, `baselines/`, `manifests/`, `_fixture-output/` (`.gitkeep` on the generated/captured dirs).
- `canonical/cutover-ledger.yaml` — `agents: []` (empty until the first cutover, U2/Ada).
- `canonical/coverage-map.yaml` — `checks: []` placeholder (Task 8.2 / `npm run audit:coverage-map` owns its content).
- `skills/` neutral root (empty; the `.kiro/skills/**` relocation is Task 3).

### 1.2 — C1 canonical agent schema + five validate-stage rules (Architecture)
- `tools/agent-generator/schema.ts` — the full C1 frontmatter type model (`ambient` five-class incl. `governanceAsLaw.assert` per-claim keying + `owner`; `groundTruthManifest` incl. structured `DemotionCueShape` enum + `fires: unconditional`; `routes` docs/agents/cues; `commands` named + named-gap/consumer-class; `skills`; `knowledgeBases`; `standingFacts`; `toolSubset`; `writeScope`; `kiro:` fields) + body pass-through classes, and an executable `validate(doc, options)` composing all five rules:
  1. Silent-failure discriminator (`CONTENT_CLASS_REGISTRY` — frontmatter|body + rationale, no default).
  2. Volatile-fact lint (FLOOR) over **body prose AND authored frontmatter strings** (`cue/note/gap/when/reason`), both `volatile-ok` escapes; documented false-negative classes.
  3. Predicate presence + per-claim keying + regex governance (≥1 `assert` + `owner`; exactly one of `mustContain|pattern`; `pattern` requires `# asserts:` companion; trivially-permissive patterns incl. empty-string-matching rejected).
  4. Run-context enum (`this-repo|consumer-repo|per-product`; `per-product` requires `authoredPerProduct: true`).
  5. Membership hygiene (an always-set id under `ambient.*` is an ERROR; always-set ids injected).
- `tools/agent-generator/__tests__/schema.test.ts` — 35 Jest tests (positive + violating per rule; volatile-ok exemption; permissive-pattern reject; membership-hygiene reject).
- `package.json`: `test:agent-generator` script (sibling-package pattern; root `jest.config.js` `roots` deliberately excludes `tools/` per the Spec 025 F1 guard — Task 7.3 wires this suite into CI via `agent-generator.yml`).

### 1.3 — Four shared substrate files + WORKFLOW_RULES wiring (Implementation)
- `canonical/shared/always-set.yaml` — the 9 identity docs; doc `id`s read from real frontmatter (verified); per-doc class annotations sourced to **119-A requirements.md Req 6 AC1** (not invented); open questions flagged, not silently resolved.
- `canonical/shared/field-dispositions.yaml` — `configFields` covering the full observed `.kiro/agents/*.json` key union (11 top-level + 2 design-shown nested) + `runtimeToolRefs` (`taskStatus`, `getDiagnostics`).
- `canonical/shared/shared-catalog.yaml` — `complete-task.sh` tooling + cue, `find_docs` discovery row, record-first ratification rule (`owner: thurgood`) — **crossRef flagged as TODO, not fabricated** (see Open Items).
- `canonical/shared/skills-map.yaml` — skeleton (`rows: []`; `skills/` is empty, so 0↔0 is round-trip-consistent; Task 3 populates).
- `tools/agent-generator/workflow-rules-guard.ts` + tests — WORKFLOW_RULES import wiring + the anti-duplication guard (canonical bodies may not restate a rule); a side-effect-safe accessor (see Open Items) + 8 tests.

---

## Verification (main-loop, Opus)

- **Design fidelity**: read `tools/agent-generator/schema.ts` in full and checked all five rules against design §C1 — faithful. Read `always-set.yaml` and `shared-catalog.yaml`; spot-checked the others.
- **Ground truth, not guesses**: verified all 9 always-set doc ids against actual `.kiro/steering/*.md` frontmatter (exact matches); verified the `configFields` union against the real `.kiro/agents/*.json` key set (complete).
- **Tests re-run by main loop**: `npm run test:agent-generator` → **43/43 pass**. YAML parse-checked (js-yaml); `tsc --noEmit` clean (agent-generator tsconfig + root).
- **Parent validation**: `npm test` → **376/377 suites, 8985/8987 tests pass**. The single failing suite (`src/cli/__tests__/init.test.ts`, 2 tests) is **pre-existing and unrelated** — verified it fails identically on `origin/main`; this branch does not touch it (governance-doc-count fixture drift, 81 vs 82). Task 1 introduced **zero** failures. Spawned `task_29d847eb` to fix it.

## Delegated-tier capture (per Task-Completion-Protocol)
- Planned `**Agent**: Thurgood` for all subtasks. Executed by **Sonnet `thurgood` subagents** (1.2, 1.3) — implement-settled-design tier per the model-selection policy (the design is RATIFIED; encoding, not deciding) — with **main-loop (Opus) verification**. 1.1 done directly by the main loop (trivial scaffolding). Agent plan held; model chosen consciously (Sonnet for settled-design implementation). No divergence beyond the deliberate tier choice.

---

## Open items (carried forward — NOT blocking Task 1; tracked for their resolution point)

1. **Rule-1 composition → Task 2.1 (C3) obligation.** `validate()`'s rule-1 call currently self-checks `CONTENT_CLASS_REGISTRY` (can't fail). The discriminator FUNCTION works and is tested, but per-doc enforcement (an unknown class in an authored file failing) belongs at parse-time in C3: **Task 2.1 must wire `validateContentClassDiscriminator` to a parsed doc's actual top-level frontmatter keys via a key→class map** (identity covers agent/agentType/description). Recorded so it is not lost.
2. **`shared-catalog.yaml` crossRef TODO (Req 13 AC2) → needs a Peter decision before Task 7 (sweep 1).** The design's crossRef target — the "125 classification-map entry" — does not exist: it's deferred to **125-B, which has no spec directory yet**. The rule is authored with an honest `TODO(...)` rather than a fabricated path. **Recommendation**: interim-target `.kiro/docs/ballots/README.md § "The Ratification Protocol (record-first)"` (the protocol's real current home, checkable now) and add the reciprocal pointer there, re-pointing to 125-B when it's spec'd. Resolve before sweep 1 is built (Task 7), else sweep 1 correctly fails on the TODO.
3. **`always-set.yaml` orientation-reference class (2 docs).** `designerpunk-systems-overview` + `civitas-system-overview` carry an AXA class (`orientation-reference`) that is an explicitly-unresolved boundary case (sixth-class-vs-trim) per 119-A / agent-experience-architecture §3.7. Carried forward as authored, not resolved here.

## Follow-ups spawned (out of 122 scope)
- `task_29d847eb` — fix `init.test.ts` governance-doc-count drift (pre-existing broken test on main).
- `task_a630cb5b` — add `require.main` guard to `mcp-server/src/index.ts` (importing the entry currently starts the server; 1.3 worked around it).
