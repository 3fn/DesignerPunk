# Implementation Plan: 122 — Agent Generator

**Date**: 2026-07-07 (v3 — tasks round 1 incorporated: Stacy APPROVE-WITH-AMENDMENTS ×6 folded; Peter's two decisions applied — first CC cutover = Ada, cutover order Ada→Lina→Thurgood→Sparky→Leonardo→Data→Kenya→Stacy)
**Spec**: 122 — Agent Generator
**Status**: **RATIFIED (Peter, 2026-07-07)** — tasks round 1 incorporated + cutover order ratified (Sparky-at-4); per-parent Unit fields conform to the coherent-unit ballot's R3a. Requirements RATIFIED 2026-07-05; design RATIFIED 2026-07-07. **Formalization COMPLETE — the build (U1 substrate, CC-first) is authorized.**
**Dependencies**: requirements.md (RATIFIED 2026-07-05), design.md (RATIFIED 2026-07-07 — CC-model reframe enacted, Req 1 AC1 bright-line applied), cc-agent-model.md (CC adapter format spec), 125-A Phase 0 (the live PR gate 122's checks register onto). Feeds 119-B (routing + measurement) and 123 (consumer distribution).

---

## Overview

This plan decomposes design.md (C1–C13, DD1–DD13) into buildable, PR-sized work under one hard sequencing boundary: **the substrate phase gate** (design §3 / Req 6). The substrate — master tool registry (C5), skills pipeline (C2.2 + C4), the generate/resolve/render engine (C3), both adapters (C4), the diff-guard (C6), the canonical-vs-truth check (C7), the eight sweeps (C8), gate registration (C9), the standing fixture (C10.3), and Stacy's provisioning (C12) — must be **proven end-to-end on BOTH targets** and its closure-evidence bundle (C13) committed **before any agent-prompt generation task starts**.

**Merge units (the merge-on-coherent-unit structure — 2026-07-07 ballot).** This spec is large, so its tasks.md **declares its coherent merge units** up front (the ballot's R3 — units are named here, never judged at merge time). One branch per unit; subtasks commit+push the branch; parent completions inside a multi-parent unit commit their docs on the branch (no PR); the **unit's completion opens the PR**; Peter merges (squash). The declared units:

> Per-parent **`**Unit**:`** fields (added alongside each parent's `**Type**:` line, R3a format) are now the source of truth for task→unit membership; the table below is retained as a human-orientation summary.

| Merge unit | Tasks | Branch | PR opens at |
|-----------|-------|--------|-------------|
| **U1 — Substrate** (multi-parent) | 1–8 | `task/122-substrate` | Task 8 completion (the phase-gate PR) |
| **U2 — Cutover: Ada** (FIRST CC cutover) | 9 | `task/122-cutover-ada` | Task 9 completion |
| **U3 — Cutover: Lina** | 10 | `task/122-cutover-lina` | Task 10 completion |
| **U4 — Cutover: Thurgood** | 11 | `task/122-cutover-thurgood` | Task 11 completion |
| **U5 — Cutover: Sparky** (never-ported, first-generation) | 14 | `task/122-cutover-sparky` | Task 14 completion |
| **U6 — Cutover: Leonardo** | 12 | `task/122-cutover-leonardo` | Task 12 completion |
| **U7 — Cutover: Data** | 13 | `task/122-cutover-data` | Task 13 completion |
| **U8 — Cutover: Kenya** (never-ported, first-generation) | 15 | `task/122-cutover-kenya` | Task 15 completion |
| **U9 — Cutover: Stacy** | 16 | `task/122-cutover-stacy` | Task 16 completion |
| **U10 — OB-7 retirement** | 17 | `task/122-ob7-claude-md` | Task 17 completion |
| **U11 — Closeout** | 18 | `task/122-closeout` | Task 18 completion |

> **Cutover ORDER = merge/review-attention order (RATIFIED — Peter, 2026-07-07): Ada → Lina → Thurgood → Sparky → Leonardo → Data → Kenya → Stacy.** Sparky moved to position 4 (U5) to surface first-generation / content-completeness risk **early, with runway** — rather than discovering a generator gap on a never-ported seat late (the counter-risk flagged in the tasks-round). **First CC cutover = Ada (U2), mechanically forced**: the per-cutover diff-against-baseline gate needs a real committed baseline to diff, which excludes the never-ported seats (Sparky, Kenya) from the debut slot regardless of order. Task NUMBERS stay bound to content (Task 12 = Leonardo, 13 = Data, 14 = Sparky); the U-number encodes cutover order, so U5 = Task 14 (Sparky), U6 = Task 12 (Leonardo), U7 = Task 13 (Data).

**Task groups (tracking/sequencing structure — orthogonal to merge units):**

- **Group 1 — Substrate** (Tasks 1–8) = **one merge unit (U1)**: everything agent-content-independent. The 8 parents remain for tracking and sequencing, but they **accumulate on one branch (`task/122-substrate`) and merge once** — the phase-gate merge IS the substrate unit's merge. Parents 1–7 complete on the branch (docs + `taskStatus`, no PR); Task 8's completion opens U1's PR.
- **⛔ PHASE GATE** (Task 8): the blocking parent AND U1's PR-opening event. No Group 2 unit starts until U1's PR (the C13 closure-evidence bundle) is merged. C12's provisioning is gated *inside* this parent (design §C13 item 6 / L4 ≡ K-D4 ≡ S-D4).
- **Group 2 — Per-agent cutovers** (Tasks 9–16) = **U2–U9, one merge unit per agent** (individual PR — this is where Peter's per-cutover diff-against-baseline verification lives). PR-sized by construction (C10.1). Cutover ORDER (= U-number = merge/review-attention order, RATIFIED Peter 2026-07-07): **Ada → Lina → Thurgood → Sparky → Leonardo → Data → Kenya → Stacy**. Content-authoring-before-catalog for the three seats lacking authored command content (Sparky, Kenya, Stacy — Req 21 AC2); Stacy validation triggered at each cutover.
- **Group 3 — OB-7 retirement** (Task 17) = **U10**: generate the CLAUDE.md always-lane + per-agent inline bodies; retire the interim CLAUDE.md via the record-first ratification ballot.
- **Closeout** (Task 18) = **U11**: handbacks to 119-B and 123; umbrella / deferred-obligation ledger updates.

**Per-unit PR discipline**: each merge unit is one reviewable PR (the merge-on-coherent-unit law, 2026-07-07 ballot). Subtasks commit+push the branch; a parent inside a multi-parent unit commits its docs on the branch; the unit's completion opens the PR. The substrate's 8 parents merge as ONE PR (U1); the 8 cutovers, OB-7, and closeout are individual PRs (U2–U11) — the cutovers are NOT one atomic all-8 ship (Req 21 AC3).

**Merge rule**: all 122 PRs touch agent prompts/configs and/or governance-law surfaces, so the governance-law carve-out applies — **Peter merges every 122 unit PR**; agents never merge their own (Task-Completion-Protocol § The Merge Rule).

> **Dependency note**: this regrouping relies on the general merge-on-coherent-unit law. That law is a **separate ratification path** — the 2026-07-07 ballot (`.kiro/docs/ballots/2026-07-07-merge-on-coherent-unit.md`), ratified record-first after its own review. This tasks.md declares 122's units per that law; the tasks feedback round ratifies THIS decomposition. If the ballot is modified at ratification, the unit table above may need to follow.

**Build order within the substrate** (Req 24 AC2): CC adapter first, Kiro adapter second — the second adapter landing without pipeline redesign is the Req 24 AC3 verification.

**The eight checks register on the live 125-A Phase 0 gate** (Req 20), unfiltered trigger + fast no-op, each with its prove-it-bites recorded before it is trusted at cutover (Req 17 AC4 / Req 19 AC2).

---

## Group 1 — Substrate

- [x] 1. Canonical source root, schema, and shared substrate files

  **Type**: Parent
  **Unit**: U1
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The `canonical/` root exists with the design §"Repository layout" structure; `skills/` neutral root created as a sibling to `governance/`.
  - The canonical agent schema (C1) is defined in `tools/agent-generator/schema.ts` with all five validate-stage rules enforceable (silent-failure discriminator, volatile-fact lint over body AND frontmatter strings, per-claim `assert` keying + regex governance, run-context enum, membership hygiene).
  - The four shared substrate files (C2.1 `always-set.yaml`, C2.2 `skills-map.yaml`, C2.3 `field-dispositions.yaml`, C2.5 `shared-catalog.yaml`) exist with their authored content; `WORKFLOW_RULES` import path (C2.4) is wired.
  - Schema and shared files carry no generated output yet — this task builds the source substrate the engine reads.

  **Primary Artifacts:**
  - `canonical/` directory tree (`agents/`, `shared/`, `registry/`, `baselines/`, `manifests/`, `cutover-ledger.yaml` stub)
  - `skills/` neutral root (relocation target; the move itself is Task 3)
  - `tools/agent-generator/schema.ts`
  - `canonical/shared/{always-set.yaml, skills-map.yaml, field-dispositions.yaml, shared-catalog.yaml}`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-1-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-1-summary.md`

  **Post-Completion (parent inside merge unit U1 — Substrate):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-substrate` branch)
  - Complete on the branch: `./.kiro/hooks/complete-task.sh "Task 1 Complete: Canonical source root, schema, and shared substrate files (122)"` — commits the completion+summary docs on the branch, **no PR** (U1's PR opens at Task 8). Report the on-branch completion and STOP.

  - [x] 1.1 Create the `canonical/` root and `skills/` neutral root
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Create the `canonical/` tree per design §"Repository layout": `agents/`, `shared/`, `registry/`, `baselines/`, `manifests/`, plus `cutover-ledger.yaml` (empty list) and a `coverage-map.yaml` placeholder.
    - Create the top-level `skills/` root (sibling to `governance/`) — empty; the relocation of `.kiro/skills/**` content is Task 3.
    - _Requirements: 2.1, 8.3_

  - [x] 1.2 Define the canonical agent schema and its five validate-stage rules
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Define `tools/agent-generator/schema.ts` covering the C1 frontmatter classes (ambient five-class incl. `governanceAsLaw.assert` per-claim keying + `owner`; `groundTruthManifest` incl. structured `trims[].cue.shape` enum and `fires: unconditional`; `routes` docs/agents/cues; `commands` incl. named-gap/consumer-class entries; `skills`; `knowledgeBases`; `standingFacts`; `toolSubset`; `writeScope`; `kiro:` fields) and the body pass-through classes.
    - Encode validate rule 1 (silent-failure discriminator: new class MUST declare frontmatter|body + rationale, no default).
    - Encode validate rule 2 (volatile-fact lint — a FLOOR — scanning body prose AND authored frontmatter string values `cue:`/`note:`/`gap:`/`when:`/`reason:`; `volatile-ok` escape hatch; named false-negative classes documented).
    - Encode validate rule 3 (governanceAsLaw: ≥1 `assert` + `owner`; each `assert` a named `claim` with `section` + (`mustContain`|`pattern`); every `pattern:` requires an `# asserts:` companion; permissive-pattern lint rejects `.*`/`.+`/empty).
    - Encode validate rule 4 (run-context enum `{this-repo, consumer-repo, per-product}`; `per-product` requires `authoredPerProduct: true`).
    - Encode validate rule 5 (membership hygiene: an always-set id under `ambient.*` is a validation ERROR — makes per-agent always-set opt-out inexpressible by construction).
    - Write unit tests (Jest, functional lane) for each rule: at minimum one positive + one violating input per rule; volatile-fact lint positive + `volatile-ok` exemption; permissive-pattern lint reject; membership-hygiene reject.
    - _Requirements: 1.3, 2.2, 2.3, 2.4, 9.2, 12.3, 12.6, 18.2_

  - [x] 1.3 Author the four shared substrate files and wire WORKFLOW_RULES
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Author `canonical/shared/always-set.yaml` — the locked always-set: doc `id`s + per-doc class annotation + per-target delivery hint (the D1/D2 classification signals). Members are the 9 identity docs (`.kiro/steering/**`).
    - Author `canonical/shared/field-dispositions.yaml` — one `configFields` row per Kiro config field observed in `.kiro/agents/*.json` (sweep 7 fails on any unlisted field) + one `runtimeToolRefs` row per runtime-specific tool reference (`taskStatus`, `getDiagnostics`, …), each with kiro/cc disposition.
    - Author `canonical/shared/shared-catalog.yaml` — the cross-agent catalog members: `complete-task.sh` completion tooling + activation cue (Req 12 AC4), the `find_docs` discovery row (Req 10 AC6), and the record-first ratification rule (Req 13) with `owner: thurgood` + two-ended `crossRef:` to the 125 classification-map entry (DD13).
    - Create `canonical/shared/skills-map.yaml` as a skeleton (rows filled by Task 3 as skills relocate; keep it round-trip-checkable from the first row).
    - Wire the `WORKFLOW_RULES` import (`import { WORKFLOW_RULES }` from the mcp-server package entry re-export, per 121 Task 6); add the validate-stage grep that fails on hand-restated rule variants in canonical bodies (Req 4 AC3).
    - _Requirements: 4.1, 4.3, 8.1, 10.6, 11.2, 11.5, 12.4, 13.1, 13.2_

- [x] 2. The pipeline engine: resolve, render, pass-through, attribution

  **Type**: Parent
  **Unit**: U1
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The three content operations (resolve / pass-through / render) are implemented deterministically (sorted collections, no timestamps, byte-identical outputs for identical inputs — P1, the C6 precondition).
  - Resolution (C3.1) resolves doc refs by `id` against the running docs MCP and asserts the interim section form (id resolves AND verbatim heading exists, Req 3 AC2).
  - Ambient composition (C3.2) computes `membership = alwaysSet ∪ agent.ambient` and emits the per-target `ambient-manifest.json`, honoring manifest verdicts as data.
  - The attribution mechanism (C3.3) emits a sidecar `<output>.attribution.json` per artifact; the attribution-totality checker (P2) asserts spans are total, non-overlapping, `op ∈ {resolve, render, passthrough}`.

  **Primary Artifacts:**
  - `tools/agent-generator/pipeline.ts` (validate / resolveAgent / emit)
  - `tools/agent-generator/resolve.ts` (CorpusResolver over the spawned docs MCP)
  - `tools/agent-generator/render.ts` (WORKFLOW_RULES, write-scope, run-context renderers)
  - `tools/agent-generator/attribution.ts` + the totality checker

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-2-summary.md`

  **Post-Completion (parent inside merge unit U1 — Substrate):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-substrate` branch)
  - Complete on the branch: `./.kiro/hooks/complete-task.sh "Task 2 Complete: Pipeline engine — resolve, render, pass-through, attribution (122)"` — commits the completion+summary docs on the branch, **no PR** (U1's PR opens at Task 8). Report the on-branch completion and STOP.

  - [x] 2.1 Implement the corpus resolver (C3.1) against the running docs MCP
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Spawn the compiled docs MCP over stdio once per generator run (`initialize` + `get_section`/`tools/list`), session reused across the run (DD10).
    - Resolve doc references by `id`; for section-grain refs assert the Req 3 AC2 interim form (id resolves AND verbatim heading exists in the resolved doc). Structure the reader so `section:` fields upgrade in place when `docid#sectionid` lands (resolver is the only code reading them).
    - Compute id→path only at emit time where a runtime demands a physical path (Kiro `resources` URIs).
    - Unit tests: id-resolution, interim-section-form pass/fail, missing-heading failure names id+heading.
    - _Requirements: 1.1, 3.1, 3.2, 5.3_

  - [x] 2.2 Implement render (class-c) and pass-through (class-b) operations
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Implement pass-through: formative / reflexive-principle / role-specific body prose travels byte-identical (no synthesis, summary, or rewrite — Req 1 AC2).
    - Implement render: `WORKFLOW_RULES` (filtered by `appliesToTools`), write-scope note driven by `allowedPaths` (different paths → different note, Req 11 AC3), run-context annotations, headings, cue sentences from cue fields. Templates carry field slots + fixed connective grammar only (P4 — no invented substance).
    - Determinism: sorted collections, no timestamps (P1).
    - Unit tests: write-scope renderer (two different `allowedPaths` yield two different notes); run-context renderer; WORKFLOW_RULES filter-and-render.
    - _Requirements: 1.2, 1.3, 4.1, 4.2, 11.3, 12.3_

  - [x] 2.3 Implement ambient composition (C3.2) and the ambient-manifest emitter
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Compute `membership = alwaysSet ∪ agent.ambient` (Req 9 AC1/AC3); emit `canonical/manifests/<agent>.<target>.ambient-manifest.json` recording members WITH their delivery lane (shared vs per-agent — for the C11 two-lane split).
    - Honor manifest verdicts as data: `none-trim-stale-snapshots` → emit each trim's cue, never the artifact ref; `catalog-is-manifest` → emit `get_component_full` + `get_component_health` faithfulness verbs; `empty` → emit nothing, recorded intentional (Req 10 AC2/AC3).
    - Unit test: union composition asserts P3 (manifest ⊇ always-set) on a fixture input.
    - _Requirements: 9.1, 9.3, 10.1, 10.2, 10.3, 10.4_

  - [x] 2.4 Implement the attribution sidecar (C3.3) and totality checker
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Emit `<output>.attribution.json` per artifact: line-span → `op` (resolve|render|passthrough) → source, incl. `mode: embed` for inline-resolved spans (DD2).
    - Implement the totality checker (P2): spans total, non-overlapping, every `op` in the allowed set. This is checked mechanically alongside C6.
    - Unit test: attribution-totality checker (positive + a gap + an overlap + a bad op).
    - _Requirements: 1.3, 1.4_

- [x] 3. Skills pipeline: neutral-root relocation + skills-map round-trip

  **Type**: Parent
  **Unit**: U1
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Every skill under `.kiro/skills/**` is relocated into the neutral `skills/` root; each has exactly one `skills-map.yaml` row (canonical-keyed, per Req 8 AC1 — NOT kiro→cc keyed).
  - Both `.claude/skills/**` and `.kiro/skills/**` are GENERATED outputs of `skills-map.yaml` (Kiro is not the source); bundled scripts travel as-is.
  - The skills-map round-trip is proven both directions (sweep 2 machinery exists and passes on the relocated set); the `theming/styles` → `theming-styles` transform is a named unit test.

  **Primary Artifacts:**
  - `skills/**` (relocated neutral-root skill trees)
  - `canonical/shared/skills-map.yaml` (fully populated)
  - `tools/agent-generator/skills.ts` (SkillsMap resolution + per-target emit)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-3-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-3-summary.md`

  **Post-Completion (parent inside merge unit U1 — Substrate):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-substrate` branch)
  - Complete on the branch: `./.kiro/hooks/complete-task.sh "Task 3 Complete: Skills pipeline — neutral-root relocation + round-trip (122)"` — commits the completion+summary docs on the branch, **no PR** (U1's PR opens at Task 8). Report the on-branch completion and STOP.

  - [x] 3.1 Relocate `.kiro/skills/**` into the neutral `skills/` root and populate skills-map
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood + Lina (Lina/domain owners confirm each relocated skill's activation description is intact)
    - Move each skill directory from `.kiro/skills/**` into `skills/<name>/` (SKILL.md + bundled scripts intact).
    - Fill one `skills-map.yaml` row per skill: `canonical` path + per-target (`cc`, `kiro`) paths + `owners`.
    - _Requirements: 8.1, 8.3_

  - [x] 3.2 Implement SkillsMap resolution and per-target skill-tree emit
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Implement key → per-target path + per-target reference syntax resolution (`skill://<kiro path>` vs CC Skill-tool naming). Agents reference skills by row key only (never path).
    - Emit `.claude/skills/**` (flat dir + SKILL.md + activation description) and `.kiro/skills/**` from the map.
    - Named unit test: the `theming/styles` → `theming-styles` transform.
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 4. Registry generator (C5) — declaration-keyed, index-agnostic

  **Type**: Parent
  **Unit**: U1
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `canonical/registry/tool-registry.json` is generated by introspecting the live tool DECLARATIONS of all three MCPs (`initialize` + `tools/list` over compiled entries) — no hand-curation, no query-result sourcing, no index dependency (Req 7 AC1).
  - A declared-but-index-empty MCP (Product MCP in this repo) still populates the registry and still drives cue generation (Req 7 AC2).
  - The registry is deterministic (servers + tools sorted, no timestamps) and consumable as the 125 tool-boot smoke manifest (each `entry` bootable; asserts declared-and-responds, never returns-data — Req 20 AC4).

  **Primary Artifacts:**
  - `tools/agent-generator/registry.ts`
  - `canonical/registry/tool-registry.json` (generated)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-4-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-4-summary.md`

  **Post-Completion (parent inside merge unit U1 — Substrate):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-substrate` branch)
  - Complete on the branch: `./.kiro/hooks/complete-task.sh "Task 4 Complete: Registry generator — declaration-keyed, index-agnostic (122)"` — commits the completion+summary docs on the branch, **no PR** (U1's PR opens at Task 8). Report the on-branch completion and STOP.

  - [x] 4.1 Implement MCP introspection and the registry emitter
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Spawn each MCP server from its compiled entry over stdio; `initialize` + `tools/list`; capture name + description + inputSchemaHash per tool (DD10).
    - Emit `canonical/registry/tool-registry.json` deterministically (sorted, no timestamps); include `entry` per server (the 125 boot manifest key).
    - Error handling: MCP boot failure FAILs loud — never falls back to a cached registry (design § Error Handling).
    - Verify the Product-MCP `indexed:false` case generates identically (index-agnostic).
    - _Requirements: 7.1, 7.2, 7.3, 20.4_

- [x] 5. Target adapters (C4) — CC first, then Kiro

  **Type**: Parent
  **Unit**: U1
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The `TargetAdapter` interface (C4) is implemented by BOTH adapters; adding a target = implementing the interface + a `skills-map` column + `field-dispositions` rows, with NO pipeline change (Req 24 AC3 — verified by Kiro landing second without redesign).
  - The CC adapter emits `.claude/agents/<agent>.md` (frontmatter namespaced tool list via `toolRef`; body pass-through + rendered notes) and handles every Kiro→CC transform in the C4 disposition table; the write-scope transform emits a BEHAVIORAL note (CC has no declarative per-agent write-path — cc-agent-model.md facet 7), naming PreToolUse-hook / worktree as the enforcement options.
  - The Kiro adapter emits `.kiro/agents/<agent>.json` + `<agent>-prompt.md`: `resources` built from the ambient manifest (id→path, `file://` vs `skill://` per delivery hints), server-level grants retained with `toolSubset` the checkable object.
  - CC-first build order honored (Req 24 AC2).

  **Primary Artifacts:**
  - `tools/agent-generator/adapters/index.ts` (the `TargetAdapter` interface)
  - `tools/agent-generator/adapters/cc.ts`
  - `tools/agent-generator/adapters/kiro.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-5-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-5-summary.md`

  **Post-Completion (parent inside merge unit U1 — Substrate):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-substrate` branch)
  - Complete on the branch: `./.kiro/hooks/complete-task.sh "Task 5 Complete: Target adapters — CC first, then Kiro (122)"` — commits the completion+summary docs on the branch, **no PR** (U1's PR opens at Task 8). Report the on-branch completion and STOP.

  - [x] 5.1 Define the `TargetAdapter` interface
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Define the C4 interface: `emitAgent`, `emitSkills`, `emitAlwaysLayer`, `toolRef`, `skillRef`, `renderWriteScope`, `dispositions`. Establish the extensibility contract (Req 24 AC3) so a third target is additive.
    - _Requirements: 11.1, 15.1, 24.3_

  - [x] 5.2 Implement the CC adapter (built first)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Emit `.claude/agents/<agent>.md`: frontmatter (name, description, explicit namespaced tool list = `toolSubset` expanded via `toolRef` = `mcp__<server>__<tool>`); body = pass-through prose + rendered rules/cues/write-scope/run-context notes.
    - Implement every row of the C4 Kiro→CC transform table: MCP syntax → namespaced names; `resources` identity/always → always-layer (C11, Task 6); `resources` corpus → MCP on-demand routing cues; `skill://` → CC Skill-tool form; `/knowledge` → per-agent grep/Glob fallback from `knowledgeBases`; hotkeys/`welcomeMessage` → drop-with-reason; `hooks.agentSpawn` → behavioral pre-flight note; `allowedPaths` → behavioral write-scope note naming PreToolUse-hook/worktree (facet 7); server-grants → explicit per-agent namespaced subset; Kiro-runtime tool refs → per-runtime disposition rows.
    - _Requirements: 11.1, 11.3, 11.4, 11.5, 15.1, 15.3, 24.1, 24.2_

  - [x] 5.3 Implement the Kiro adapter (built second — forces the canonical/adapter seam honest)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Emit `.kiro/agents/<agent>.json` + `<agent>-prompt.md`: `resources` from the ambient manifest (id→path at emit time; `file://` vs `skill://` per always-set delivery hints); server-level MCP grants retained (Kiro's grammar) with `toolSubset` remaining the checkable object; `kiro:` fields carried through.
    - CONFIRM Req 24 AC3: the Kiro adapter lands with NO change to the pipeline engine (Tasks 2–4) — record this as the extensibility-contract verification.
    - _Requirements: 11.1, 15.2, 24.1, 24.3_

- [x] 6. The regenerate-and-diff guard (C6) + canonical-vs-truth check (C7)

  **Type**: Parent
  **Unit**: U1
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The diff-guard (C6) regenerates every guarded surface into a temp tree and diffs vs committed; any delta FAILs with the per-file diff. The fast-no-op lock (`generated.lock`) keys on `sha256(inputClosure)` + `sha256(outputs)` where the output hash is sorted `(path, content-hash)` pairs (S-D5) and the input closure INCLUDES the two resolve-by-id roots `governance/**` + `.kiro/steering/**` (S-D3 — the load-bearing closure fix).
  - BOTH prove-it-bites forms are recorded: (1) hand-edit form (output-hash leg); (2) edit-an-embedded-section form (closure-completeness leg — edit a `governance/**` or `.kiro/steering/**` section with no other closure-root change, assert the no-op lock forces a full run and the guard FAILs).
  - The canonical-vs-truth check (C7) implements all five assertion classes with per-class pass/fail + adjudicator, sharing the spawned-MCP session; the class-(c) server-grant leg is a FIRST-CLASS FAIL (L1 — `toolSubset` naming a server absent from the emitted grant list FAILs); the `knowledgeBases` glob-resolves assertion (D-A3) is homed here.

  **Primary Artifacts:**
  - `tools/agent-generator/diff-guard.ts` + `canonical/generated.lock`
  - `tools/agent-generator/canonical-vs-truth.ts`
  - Recorded prove-it-bites runs (referenced in the completion doc; bundled into C13 at Task 8)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-6-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-6-summary.md`

  **Post-Completion (parent inside merge unit U1 — Substrate):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-substrate` branch)
  - Complete on the branch: `./.kiro/hooks/complete-task.sh "Task 6 Complete: Diff-guard + canonical-vs-truth check (122)"` — commits the completion+summary docs on the branch, **no PR** (U1's PR opens at Task 8). Report the on-branch completion and STOP.

  - [x] 6.1 Implement the regenerate-and-diff guard and the input-closure lock
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Implement: validate + regenerate everything into a temp tree; `git diff --no-index` vs committed over the guarded surface set (derived from the cutover ledger + substrate artifacts); any delta → FAIL with per-file diff.
    - Implement `generated.lock`: input-closure hash over the DD7 closure — including `governance/**` and `.kiro/steering/**` (the resolve-by-id roots, S-D3) — plus output hash over sorted `(path, content-hash)` pairs (S-D5). Both match → early-exit green; either mismatch → full run.
    - Record the whole-root-closure decision (DD7 — chosen over embed-span hashing).
    - _Requirements: 17.1, 17.2, 20.1, 20.2_

  - [x] 6.2 Record BOTH diff-guard prove-it-bites forms
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Hand-edit form: on a scratch branch, hand-edit one generated line; assert the diff-guard FAILs (Req 17 AC4). Record the run.
    - Edit-an-embedded-section form (S-D3 prove-it-bites): edit one embedded `governance/**` (or `.kiro/steering/**`) section with NO other closure-root change; assert the no-op lock forces a full run and the guard FAILs on the re-derived stale embed. Record the run. (This is the standing proof the resolve-by-id roots are in the closure.)
    - _Requirements: 17.4, 20.2_

  - [x] 6.3 Implement the canonical-vs-truth check (five assertion classes)
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Implement classes (a)–(e) per the C7 table, sharing the spawned-MCP session + registry:
      (a) governance-integrity — each `assert`: id resolves, heading exists, normalized section text satisfies every `mustContain`/`pattern`; owner-adjudicated; the predicate-governance block (claim-distinguishing-token guidance A-D1; `# asserts:` companion + permissive-pattern lint A-D2; per-claim keying A-D3).
      (b) agent-routes — every `routes.agents` target ∈ generated agents for that runtime OR `disposition: not-yet-ported`.
      (c) per-runtime grants — every cue's tool ∈ the agent's `toolSubset` AND every server named by `toolSubset` appears in the emitted config's grant list (L1 — the server-grant leg is a FIRST-CLASS FAIL; `lina.json` is the live bug).
      (d) command-string currency — `this-repo`+`package.json` scripts exist; script-path commands exist+executable; `consumer-repo`/`per-product` exempt but MUST carry a rendered annotation (fires on empty-string, not only missing-key — D-A5). Name the annotation-correctness adjudicator (S-D5.1: presence mechanical, correctness = owning seat at cutover).
      (e) live-tool — every cue/subset tool ∈ fresh registry declarations; declared-but-index-empty PASSES (carve-out, all three servers).
    - Home the `knowledgeBases` glob-resolves assertion here (D-A3): every glob resolves to ≥1 match OR carries adjudicated `expected-empty`; adjudicator Thurgood.
    - Failure output grouped by adjudicator with flagged entry + truth observed + canonical claim.
    - _Requirements: 3.2, 5.3, 12.3, 18.1, 18.2, 18.3_

- [x] 7. The eight sweeps (C8) + gate registration (C9)

  **Type**: Parent
  **Unit**: U1
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All eight checks (C8 sweeps 1–8) are implemented as mechanical algorithms, each with a recorded prove-it-bites (a known/induced positive) before it is trusted at cutover (Req 19 AC2); flagged deltas emit an `ADJUDICATE:` block naming the owner, never auto-resolved.
  - Sweep 5 (corrected-state-holds) is a PRE-CUTOVER GATE ONLY (not standing post-cutover — Req 19 AC1 named exception); its extractor excludes historical-context lines (L3).
  - Sweep 8 (demotion-diff) baseline + ambient-manifest namespace includes artifact-path members, not doc-ids only (D-A1); `trims` with `fires: unconditional` emit negatives for orphaned artifacts (K-D1).
  - All ten check contexts register on the 125-A Phase 0 gate via one workflow (`.github/workflows/agent-generator.yml`), unfiltered trigger + shared setup + no-op lock (C9 / Req 20); `verify-gate-registration.sh` count-asserts the protection-list context set.

  **Primary Artifacts:**
  - `tools/agent-generator/sweeps/*.ts` (sweeps 1–8)
  - `.github/workflows/agent-generator.yml` (ten named jobs/contexts)
  - `tools/agent-generator/verify-gate-registration.sh`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-7-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-7-summary.md`

  **Post-Completion (parent inside merge unit U1 — Substrate):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-substrate` branch)
  - Complete on the branch: `./.kiro/hooks/complete-task.sh "Task 7 Complete: Eight sweeps + gate registration (122)"` — commits the completion+summary docs on the branch, **no PR** (U1's PR opens at Task 8). Report the on-branch completion and STOP.

  - [x] 7.1 Implement sweeps 1–4 with prove-it-bites
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Sweep 1 (reference-resolution): resolve every canonical id/section ref via the running docs MCP (interim section form); assert zero retired tool names (`get_documentation_map`) and retired runtimes (`ts-node`) in canonical source + templates. Prove-it-bites: induce a bogus id.
    - Sweep 2 (skills round-trip): both directions; every `skills/` dir has exactly one row; every row's per-target path satisfies the runtime's discovery contract (CC: flat dir + SKILL.md + activation description BYTE-EQUAL to canonical, D-A2; Kiro: path exists + `skill://` resolves); `skills: []` → recorded PASS. Prove-it-bites: mangle one row's `cc` path.
    - Sweep 3 (resources double-load): normalize every Kiro resource URI to doc id; FAIL on any `file://`+`skill://` duplicate. Prove-it-bites: the free `leonardo.json` + `kenya.json` (line 30 `file://` + line 42 `skill://`) double-loads.
    - Sweep 4 (ambient set-difference): `designed = Task-9 block ∪ always-set` vs `generated = ambient-manifest`; both differences reported; each delta needs a recorded adjudication; same machinery runs Req 10 AC4 set-inclusion. Prove-it-bites: Data's adjudicated `start-up-tasks` drop (`b7c3c148`).
    - _Requirements: 3.2, 3.3, 5.2, 8.1, 8.2, 10.4, 19.1, 19.2_

  - [x] 7.2 Implement sweeps 5–8 with prove-it-bites
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Sweep 5 (corrected-state-holds — PRE-CUTOVER GATE ONLY): zero `.web.tsx` in canonical source (count-asserted 0); a single distinct concept-count across `contract-system-reference` AFTER excluding historical-context lines (`Originally|historical|migration|source names`, L3). Prove-it-bites: temporarily re-introduce `.web.tsx` on a scratch branch. Mark it NOT standing post-cutover (Req 19 AC1 exception).
    - Sweep 6 (phantom-route/declaration-diff): bidirectional per runtime; cues∖declarations = phantom (FAIL); declarations∖(subsets ∪ deferred set) = un-routed (ADJUDICATE, owner per Req 7 AC5); declaration-keyed (index never enters). Prove-it-bites: induce a cue naming a nonexistent tool.
    - Sweep 7 (config-field disposition): enumerate every key path in every `.kiro/agents/*.json` (source + emitted); each ∈ `field-dispositions.yaml`; unknown key → FAIL. Prove-it-bites: add a fake config key.
    - Sweep 8 (demotion-diff): `removals = baseline ∖ fresh ambient-manifest`, namespace includes artifact-path members (D-A1); every removal needs a `replaces:` cue else FAIL; `fires: unconditional` trims emit negatives for orphaned artifacts (K-D1). Prove-it-bites: remove a doc from a fixture agent's ambient without a `replaces` cue.
    - _Requirements: 12.1, 19.1, 19.2, 19.4_

  - [x] 7.3 Register all ten check contexts on the 125-A Phase 0 gate
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Author `.github/workflows/agent-generator.yml`: one job per check → one named status context (`122-diff-guard`, `122-canonical-vs-truth`, `122-sweep-1-refs` … `122-sweep-8-demotion`); `on: pull_request` with NO path filter (Req 20 AC1); shared setup (checkout + node + npm cache + built MCP dist artifact) + the C6 no-op lock so unrelated PRs early-exit green in seconds (Req 20 AC2).
    - Add each context to the branch-protection list (open-set contract — named context + one entry each, Req 20 AC3).
    - Implement `verify-gate-registration.sh`: query the branch-protection API, assert the expected 122 context set present, count-asserted (N recorded); run at each cutover + monthly health check.
    - _Requirements: 17.3, 18.1, 20.1, 20.2, 20.3_

- [x] 8. ⛔ SUBSTRATE PHASE GATE — closure evidence (C13), fixture (C10.3), Stacy provisioning (C12)

  **Type**: Parent
  **Unit**: U1
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  > **THIS IS THE HARD SEQUENCING BOUNDARY (design §3 / Req 6) AND the substrate unit's (U1) PR-opening event.** Task 8's completion opens U1's PR — the whole substrate (Tasks 1–8) accumulated on `task/122-substrate` merges as ONE PR here. No Group 2 unit (Task 9+) starts until U1's PR is **merged**. C12's provisioning is gated INSIDE this parent (design §C13 item 6 / L4 ≡ K-D4 ≡ S-D4): Stacy's re-derivation leg must be operable from the first cutover forward. **The phase gate IS U1's merge** — the two are the same event.

  **Success Criteria:**
  - The C13 substrate-gate completion doc exists, referencing each of the six closure items with committed evidence: (1) `tool-registry.json` emitted through BOTH adapters' consumption paths; (2) `skills/` populated + both `.claude/skills/**` and `.kiro/skills/**` emitted; (3) diff-guard runs — one clean pass, one induced-hand-edit FAIL, AND the edit-an-embedded-section run (URLs recorded); (4) a sweep-2 round-trip over the relocated skills (both targets, report committed); (5) the fixture's first clean end-to-end pass; (6) C12's provisioning complete.
  - The minimal fixture (`canonical/agents/_fixture.md`, C10.3) exercises one member of every content class + transform disposition; outputs emit to `canonical/_fixture-output/{kiro,cc}/`, inside C6's guarded surface (a STANDING pipeline test re-run on every PR — Req 21 AC4).
  - C12 provisioning: **Stacy's audit commands are named AND runnable-or-gap-annotated AND her coverage map is emitted (zero-blank-row or adjudicated per blank)** — the coverage map's minimum content is every guarded surface mapped to its guarding check, with unguarded surfaces visible as blank rows (Req 22 AC4(b)).
  - The substrate is proven on BOTH targets before any agent-prompt generation begins (Req 6 AC1/AC2).

  **Primary Artifacts:**
  - `canonical/agents/_fixture.md` + `canonical/_fixture-output/{kiro,cc}/`
  - `canonical/coverage-map.yaml` (generated rows + derived check column) + the per-check guarded-glob manifest
  - `npm run audit:coverage-map` script (C12 provisions)
  - `.kiro/specs/122-agent-generator/completion/task-8-parent-completion.md` (IS the C13 substrate-gate closure doc)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-8-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-8-summary.md`

  **Post-Completion (UNIT COMPLETION — opens U1's PR, the substrate merge):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-substrate` branch, alongside Tasks 1–7's on-branch completions)
  - Open U1's PR: `./.kiro/hooks/complete-task.sh "Substrate: canonical source, pipeline, adapters, checks, gate (122)"` — this is the **substrate unit's PR** carrying all of Tasks 1–8. Report the PR URL and STOP; the substrate is accepted when Peter merges (governance-law carve-out — Peter merges). **Group 2 does not begin until this PR merges (the phase gate).**
  - PR body: `Spec: 122-agent-generator` / `Unit: U1 — Substrate (Tasks 1–8)` / `Agent: Thurgood` / completion-doc paths for Tasks 1–8 / validation note.

  - [x] 8.1 Build the minimal-fixture standing pipeline test (C10.3)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Author `canonical/agents/_fixture.md` — a 9th pseudo-agent exercising ONE member of every content class + transform disposition (universal pair; one law ref with predicate; one manifest verdict `none-standing`; one command per run-context value + one `gap:`; one skill row `skills/_fixture-skill/`; one doc route with heading; one agent route `not-yet-ported`; one cue per MCP; `kiro:` fields covering carry/transform/drop-with-reason).
    - Emit outputs to `canonical/_fixture-output/{kiro,cc}/`, committed and diff-guarded, physically outside runtime agent dirs (no runtime loads it).
    - Confirm the fixture sits inside C6's guarded surface → standing pipeline test re-run on every PR (Req 21 AC4).
    - _Requirements: 21.4, 23.4_

  - [x] 8.2 Provision Stacy's coverage map + audit commands (C12) — gated into the gate
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy (Stacy owns coverage-of-coverage; confirms the map's minimum content on the PR)
    - Emit `canonical/coverage-map.yaml`: rows GENERATED (every emitted artifact + every canonical file), check column DERIVED from each check's REAL guarded-set computation (S-D1 — not hand-declared), so a new surface appears as a blank `checks: []` row automatically and the join cannot pass while guarding nothing specifically.
    - Emit the per-check guarded-glob manifest next to the coverage map, keyed by check context, globs computed by the same code the check runs (DD5).
    - Add `npm run audit:coverage-map` (the one audit C12 invents) as a real `package.json` script; assert zero blank rows or an adjudicated exception per blank.
    - Confirm the remaining audit slots' status per the C12 table (`audit:mode-parity`/`audit:theme-drift` VERIFIED present `package.json:125/126`; `test:coverage`, `governance-check.sh`, `verify-gate-registration.sh` live).
    - Acceptance criterion (Req 22 AC4(b)): **Stacy's audit commands are named AND runnable-or-gap-annotated AND her coverage map is emitted (zero-blank-row or adjudicated).**
    - **Stacy's confirmed coverage-map is a NAMED OUTPUT of this subtask (feeds Task 8.3's closure gate, amendment 6):** Stacy records her sign-off on the coverage-map (zero-blank-row or adjudicated-per-blank) on the PR; that confirmation — not merely a green `audit:coverage-map` run — is what Task 8.3 cites to close the C13 bundle.
    - _Requirements: 19.3, 22.1, 22.2, 22.4, 22.5_

  - [x] 8.3 Assemble and commit the C13 substrate-gate closure-evidence bundle
    **Type**: Documentation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (+ Stacy sign-off on the coverage-map, see done-condition)
    - Write the substrate-gate completion doc referencing all six C13 items with committed evidence + recorded run URLs (registry through both adapters; both skill trees emitted; the three diff-guard runs incl. the embedded-section prove-it-bites; the sweep-2 round-trip report; the fixture's first clean pass; C12 provisioning complete).
    - **U1 review-load mitigation — reviewer's reading-order (Stacy amendment 2):** this doc SHALL include a **per-parent completion-doc index** — a reviewer's reading-order over Tasks 1–8's completion docs (the recommended sequence + a one-line "what to look for" per parent) — so U1's single large PR (all of Tasks 1–8) is navigable for Peter, who merges it. The index is part of the closure bundle, not a separate artifact.
    - **Closure gates on Stacy's CONFIRMED coverage-map (Stacy amendment 6):** the C13-bundle done-condition SHALL cite **Stacy's *confirmed* coverage-map from Task 8.2** — zero-blank-row OR adjudicated-per-blank, with **her recorded sign-off on the PR** (her coverage-of-coverage seat) — NOT merely that Task 8.2's `audit:coverage-map` script ran. A green script run without Stacy's confirmation does not close the bundle.
    - This doc is the recorded passage of the Req 6 phase gate — its existence (with the reading-order index AND Stacy's confirmed coverage-map) is the precondition Group 2 tasks check.
    - Tier 2 rationale (conjunctive escalation): the artifact carries SHALL/SHALL-NOT gate semantics (the phase gate) AND downstream tasks' start-conditions depend on it — both properties hold.
    - _Requirements: 6.1, 6.2, 6.3, 22.4_

---

## ⛔ PHASE GATE (encoded above as Task 8 = U1's merge)

**Group 2 units (U2–U9, Tasks 9–16) and beyond MUST NOT start until U1's PR — the substrate unit (Tasks 1–8, the C13 closure-evidence bundle) — is merged.** The phase gate and U1's merge are the same event: one PR carries the whole substrate, and its merge is both the substrate's acceptance and the release of Group 2. The substrate is proven — emitted to BOTH targets, diff-guard proven on both prove-it-bites forms, sweep-2 on the crux skill, fixture green, Stacy provisioned. Build order within the substrate was CC-first, Kiro-second (Req 24 AC2). This gate is design §3's hard sequencing boundary, not a preference (Req 6 AC1).

---

## Group 2 — Per-agent cutovers (each cutover = one merge unit = one PR)

> **Each cutover is its own coherent merge unit** (U2–U9) — an individual PR, branch `task/122-cutover-<agent>`. Single-parent units, so the mechanics equal 125-A/single-parent behavior: the parent's completion opens the PR. This is where Peter's per-cutover diff-against-baseline verification lives (below).
>
> **Cutover ORDER (RATIFIED — Peter, 2026-07-07): Ada → Lina → Thurgood → Sparky → Leonardo → Data → Kenya → Stacy** (= the U2–U9 numbering). Sparky sits at position 4 (U5) to surface first-generation / content-completeness risk early, with runway. First CC cutover = **Ada (U2)** — mechanically forced: the diff-against-baseline gate needs a real committed baseline, which excludes the never-ported seats (Sparky, Kenya).
>
> **Cutover sequence discipline** (C10.1 / C11 L5): the FIRST CC cutover must NOT be the highest-risk agent — sequence a low-blast-radius agent first so the generated-inline emission is validated on a cheap surface before a load-bearing agent rides it. Debut = **Ada** (already-ported system agent, real diff baseline, low blast radius; the fixture already ran as the dry-run at Task 8). Each cutover PR follows the C10.1 eight-step sequence: content readiness (+ migrate inter-agent routes prose→`routes.agents`, LE-D1) → baseline capture (degrades to Kiro-side set for never-ported agents, D-A4) → generate both targets → checks run → sweep report committed → **classified diff-against-baseline artifact committed** (below) → Stacy validation (mandatory; independent second-reviewer signature required — see below) → acceptance signals measured → PR → Peter merges → agent enters the cutover ledger.
>
> **`Stacked-on:` discipline for the cutover PRs (U2–U9) — PARALLELIZABLE FROM `main` POST-U1 (Stacy amendment 3).** Each cutover authors a DIFFERENT agent's canonical source and generated artifacts; the cutovers are branch-INDEPENDENT of one another. Once U1 (the substrate) merges, **every cutover branches from `main`** — there is NO branch dependency chain between cutovers, so NO `Stacked-on:` declaration is required for them. **The ratified order (Ada → … → Stacy) is a review-ATTENTION sequence, not a branch dependency**: it governs the order Peter reviews/merges to front-load risk (never-ported early via Sparky at U5), not what each branch forks from. Exception carve-out is the general one: if Peter explicitly directs a cutover to branch from another cutover's branch (e.g., to build on an un-merged content-authoring carry), that PR declares `Stacked-on: #<PR>` and merges base-first (Task-Completion-Protocol § Completion State in the PR Flow, point 3). Absent that direction, cutovers do not stack.
>
> **Per-cutover diff-against-baseline acceptance artifact (Peter's verification, added to EACH cutover's done-condition).** Each cutover PR carries a **classified diff of the generated CC agent vs the current agent**, every difference bucketed:
> - **improvement** — the generated output fixes a known defect in the current agent (e.g., a missing MCP grant now present).
> - **channel-move** — content that relocated to the generated `CLAUDE.md` always-layer (or per-agent inline body) but is still delivered — not lost, just delivered through the generator's channel.
> - **regression** — the current agent has a capability the generated one lacks.
>
> **RULE OF THE `channel-move` BUCKET — binding, stated here so it cannot be relaxed at a pressured cutover (Stacy amendment 1, the gameability-seam fix).** A diff line MAY be classified **channel-move ONLY IF its corresponding replacement cue passes the C7 canonical-vs-truth resolution** (the cue's doc `id` resolves / the tool it names is declared in the live registry). **If the replacement cue does NOT pass C7 resolution, the line is a `regression`, not a channel-move** — content asserted to be "still delivered through the generator's channel" that resolves to nothing is content LOST, and must be adjudicated as a regression. This binds the softest bucket to a passing resolution check, closing the seam where a demotion is waved through as a channel-move without a working replacement. **High-exposure case: Leonardo's ~60% trim (his cutover, U6) is the largest channel-move surface in the spec** — every one of those trimmed docs must carry a replacement cue that C7 resolves, or it counts against his zero-unexplained-regressions gate.
>
> **Merge gate: ZERO unexplained regressions.** Every diff line lands in exactly one bucket; any `regression` bucket entry (including a `channel-move` demoted to `regression` by the rule above) must be explicitly adjudicated (accepted-with-reason or fixed-before-merge) — an unexplained regression blocks the merge.
>
> **Regression-adjudication RECORD LOCATION — named so presence-of-adjudication is itself checkable (Stacy amendment 5).** "Zero unexplained regressions" permits accepted-with-reason entries; that adjudication record lives in a **dedicated `## Regression adjudications` section of each cutover's `cutover/<agent>-diff-vs-baseline.md` artifact** — one row per `regression`-bucket (or channel-move-demoted-to-regression) line, each with: the diff line, the disposition (`accepted-with-reason` | `fixed-before-merge`), the reason/fix reference, and the adjudicating owner. A `regression` line present in the bucket table with NO matching row in the adjudications section is itself the failure signal (an unexplained regression). This makes "was it adjudicated?" a mechanical presence-check, not a judgment call.
>
> **This artifact PAIRS WITH the canonical-vs-truth checks (C7), it does not replace them.** The diff catches differences *between* current and generated. It is blind to defects present in **BOTH** current and generated (e.g., Lina's current config granting no `@designerpunk-application` server — the diff sees no change because both are wrong). The canonical-vs-truth checks catch those (L1: the server-grant leg is a first-class FAIL). Diff = "did we change anything for the worse?"; canonical-vs-truth = "is it correct against ground truth?" — both gates must pass.
>
> **Independent-validation signature is the DEFAULT done-condition (Stacy amendment 4).** Stacy validation is mandatory at every cutover — but for **Stacy's OWN cutover (U9, Task 16)** a QA seat validating its own generated catalog is a self-review conflict. The **independent second-reviewer path is therefore the DEFAULT merge-gate done-condition, not a fallback**: every cutover's merge gate requires an **independent validation signature** (Thurgood verifies + a second reviewer per Peter's routing for the Stacy-authored case; the owning-seat-plus-Stacy pairing for the other seats). A cutover PR without a recorded independent validation signature is not mergeable.
>
> **Never-ported seats have no current CC port to diff (Sparky, Kenya).** For these two there is no existing `.claude/agents/<agent>.md` baseline, so the diff-against-baseline artifact is replaced by a **content-completeness check**: the generated CC output is verified for completeness against (a) canonical source and (b) their supplied command content (the 8+3 / 4+4 input-of-record). Same merge gate in spirit — zero unexplained *omissions* vs the authored input. The `channel-move`-bucket rule does not apply to these two (no diff buckets); the omissions gate + C7 + the independent validation signature govern.
>
> **Content-before-catalog** (Req 21 AC1/AC2): the three seats lacking authored command content — **Sparky, Kenya, Stacy** — carry their input-of-record content into canonical source BEFORE their catalog generates. Named gaps ARE valid authored content. Each such cutover's first subtask is the content-authoring subtask. (Note: Stacy WAS ported to CC, so she gets the diff artifact; Sparky and Kenya were never ported, so they get the content-completeness check.)

- [x] 9. Cutover: Ada (Rosetta token specialist) — **U2, the FIRST CC cutover** (RATIFIED Peter 2026-07-07; mechanically forced — the diff-against-baseline gate needs a real committed baseline, which excludes the never-ported seats); already-ported system agent, debut-safe

  **Type**: Parent
  **Unit**: U2
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Ada's canonical source authored (frontmatter membership/routes/cues/grants + body prose carried from her existing Kiro config/prompt as INPUT); both targets generated; all checks green or adjudicated; sweep report committed; Stacy validation recorded.
  - Acceptance signal (Req 23 AC1) measured: observed baseline read from the committed `ada.json` at cutover (= 30 resources, correcting the stale 27); BOTH numbers recorded (`|per-agent members|` AND `|union|`), both targets agree; shrink asserted as a delta against the member count.
  - Ada enters `canonical/cutover-ledger.yaml`; her hand artifacts become diff-guarded surfaces.
  - **Diff-against-baseline artifact (merge gate — ZERO unexplained regressions):** the classified diff of generated `.claude/agents/ada.md` vs the current `ada` CC agent, every line bucketed improvement / channel-move / regression; committed as `cutover/ada-diff-vs-baseline.md`. Ada was already CC-ported, so a real baseline exists to diff. Pairs with C7 (which catches defects present in BOTH current and generated).

  **Primary Artifacts:**
  - `canonical/agents/ada.md`; `canonical/baselines/ada.ambient-baseline.json`
  - Generated: `.claude/agents/ada.md`, `.kiro/agents/ada.{json,-prompt.md}`, manifests, attribution, demotion-delta
  - `.kiro/specs/122-agent-generator/cutover/ada-cutover-report.md`
  - `.kiro/specs/122-agent-generator/cutover/ada-diff-vs-baseline.md` (classified diff vs the current CC agent — the merge-gate artifact)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-9-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-9-summary.md`

  **Post-Completion (UNIT U2 — Cutover: Ada — single-parent unit, opens its PR; the FIRST CC cutover — first live exercise of the per-cutover diff-against-baseline merge gate):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-cutover-ada` branch)
  - Open U2's PR: `./.kiro/hooks/complete-task.sh "Task 9 Complete: Cutover Ada — first CC cutover (122)"` — report the PR URL and STOP; complete at merge (Peter merges — governance-law carve-out on agent prompts/configs). PR body carries `Unit: U2 — Cutover: Ada (first CC cutover)`. **Merge gate: zero unexplained regressions in `cutover/ada-diff-vs-baseline.md` (any channel-move line honors the rule-of-the-bucket: its replacement cue passes C7 resolution, else it is a `regression`; regressions adjudicated in the artifact's `## Regression adjudications` section) AND C7 green/adjudicated AND an independent validation signature recorded.**

  - [x] 9.1 Author Ada's canonical source + capture baseline
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Ada (Ada confirms her carried content — token-governance law refs, module-resolution route, subset — on the PR)
    - Carry Ada's existing config/prompt into `canonical/agents/ada.md` frontmatter + body (119-A hand-wiring is INPUT, preserved by regeneration — Req 15 AC2). Migrate inter-agent routes from body prose into `routes.agents` (LE-D1).
    - Commit `canonical/baselines/ada.ambient-baseline.json` = pre-generation ambient set (Kiro `*.json` resources normalized to ids + artifact-path members).
    - _Requirements: 10.1, 10.2, 15.2, 21.1_

  - [x] 9.2 Generate both targets, run checks, commit sweep report, Stacy validation, measure signal
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy (Stacy: independent re-derivation + coverage-of-coverage, recorded in the report)
    - Generate both targets on the branch; commit outputs + manifests + attribution + demotion-delta. Run C6–C8; every flagged delta gets a recorded owner adjudication.
    - **Commit the classified diff-against-baseline artifact** `cutover/ada-diff-vs-baseline.md`: generated `.claude/agents/ada.md` vs the current CC agent, every line bucketed improvement / channel-move / regression. A line is `channel-move` ONLY IF its replacement cue passes C7 resolution (rule of the bucket, Group 2 preamble); otherwise it is a `regression`. Every `regression` (and every channel-move demoted to regression) adjudicated in a `## Regression adjudications` section of this artifact (one row: line + `accepted-with-reason`|`fixed-before-merge` + reason/fix ref + owner) — a regression with no matching adjudication row IS the failure signal. Zero unexplained regressions is the merge gate. Separate from and paired with C7 (C7 catches defects in BOTH; the diff catches only differences).
    - Record the **independent validation signature** (Thurgood + owning seat / a second reviewer per Peter's routing) in the cutover report — the default done-condition for every cutover (amendment 4).
    - Commit `cutover/ada-cutover-report.md` (per-check result + CI run URL + adjudications + Stacy's recorded entry).
    - Measure the Req 23 AC1 signal per C10.2 (observed baseline 30; member + union both recorded; both targets agree); adjudicate any missed shape (design-change vs defect) before merge.
    - _Requirements: 15.1, 18.1, 19.3, 21.3, 21.5, 22.3, 23.1, 23.5_

- [x] 10. Cutover: Lina (Stemma component specialist)

  **Type**: Parent
  **Unit**: U3
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Lina's canonical source authored + both targets generated + checks green/adjudicated + sweep report + Stacy validation recorded.
  - Acceptance signal (Req 23 AC2): generated lock-set == the pinned set from `per-agent-ambient-design.md` § Lina; assert zero `Component-Family-*` / `*-Standards` doc ids in her ambient manifest (the ~29→on-demand verification); both member + union numbers recorded.
  - The class-(c) server-grant FAIL is exercised on her live case: her generated Kiro config MUST carry the `@designerpunk-application` grant her law's App-MCP verbs require (the `lina.json` bug fixed by construction, L1).

  **Primary Artifacts:**
  - `canonical/agents/lina.md`; `canonical/baselines/lina.ambient-baseline.json`
  - Generated outputs + manifests + attribution + demotion-delta
  - `.kiro/specs/122-agent-generator/cutover/lina-cutover-report.md`
  - `.kiro/specs/122-agent-generator/cutover/lina-diff-vs-baseline.md` (classified diff vs the current CC agent — merge-gate artifact; paired with C7's L1 leg)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-10-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-10-summary.md`

  **Post-Completion (UNIT U3 — Cutover: Lina — single-parent unit, opens its PR):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-cutover-lina` branch)
  - Open U3's PR: `./.kiro/hooks/complete-task.sh "Task 10 Complete: Cutover Lina (122)"` — report the PR URL and STOP; complete at merge (Peter merges). PR body carries `Unit: U3 — Cutover: Lina`. **Merge gate: zero unexplained regressions in `cutover/lina-diff-vs-baseline.md` (channel-move lines honor the rule-of-the-bucket; regressions adjudicated in the artifact's `## Regression adjudications` section) AND C7 green/adjudicated (the L1 server-grant leg — a defect in BOTH current and generated the diff CANNOT see, so C7 is load-bearing here) AND an independent validation signature recorded.**

  - [x] 10.1 Author Lina's canonical source + capture baseline
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Lina (Lina confirms carried content + the pinned lock-set on the PR)
    - Carry Lina's config/prompt into `canonical/agents/lina.md`; pin her governance-as-law lock to `contract-system-reference` + consumer/auditor core; migrate inter-agent routes prose→`routes.agents` (LE-D1); ensure `toolSubset` names `designerpunk-application` so the emitted grant carries it (L1).
    - Commit baseline (ids + artifact-path members).
    - _Requirements: 10.1, 10.3, 15.2, 18.2, 21.1_

  - [x] 10.2 Generate both targets, run checks, commit sweep report, Stacy validation, measure signal
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy
    - Generate both targets; run checks; commit `cutover/lina-cutover-report.md`; Stacy validation recorded.
    - **Commit `cutover/lina-diff-vs-baseline.md`** (classified diff vs the current CC agent; buckets improvement / channel-move / regression — channel-move only if the replacement cue passes C7 resolution else `regression`; regressions adjudicated in this artifact's `## Regression adjudications` section; zero unexplained regressions). NOTE the pairing: the `lina.json` missing-App-MCP-grant is a defect in BOTH current and generated — the diff shows no change; C7's class-(c) server-grant FAIL is what catches it (L1). Both gates required, plus the independent validation signature (amendment 4).
    - Measure the Req 23 AC2 signal (lock-set == pinned set; zero family/standards ids; member + union recorded); adjudicate any missed shape before merge.
    - _Requirements: 18.1, 19.3, 21.3, 21.5, 22.3, 23.2, 23.5_

- [x] 11. Cutover: Thurgood (Civitas steward)

  **Type**: Parent
  **Unit**: U4
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Thurgood's canonical source authored (incl. the OB-5 steering-addressing-conventions cue — Req 14 — since he is a steering-doc-authoring agent; the record-first ratification rule from `shared-catalog.yaml`); both targets generated; checks green/adjudicated; sweep report; Stacy validation recorded.
  - His collapses-into-catalog/computed manifest verdict is honored (no standing manifest built — Req 10 AC2).

  **Primary Artifacts:**
  - `canonical/agents/thurgood.md`; baseline; generated outputs; `cutover/thurgood-cutover-report.md`
  - `cutover/thurgood-diff-vs-baseline.md` (classified diff vs the current CC agent — merge-gate artifact)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-11-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-11-summary.md`

  **Post-Completion (UNIT U4 — Cutover: Thurgood — single-parent unit, opens its PR):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-cutover-thurgood` branch)
  - Open U4's PR: `./.kiro/hooks/complete-task.sh "Task 11 Complete: Cutover Thurgood (122)"` — report the PR URL and STOP; complete at merge (Peter merges). PR body carries `Unit: U4 — Cutover: Thurgood`. **Merge gate: zero unexplained regressions in `cutover/thurgood-diff-vs-baseline.md` (channel-move lines honor the rule-of-the-bucket; regressions adjudicated in the artifact's `## Regression adjudications` section) AND C7 green/adjudicated AND an independent validation signature recorded.**

  - [x] 11.1 Author Thurgood's canonical source + capture baseline
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Carry config/prompt into `canonical/agents/thurgood.md`; add the OB-5 cue (`WHEN creating/modifying a steering doc THEN consult Steering-Addressing-Conventions`, Req 14); migrate routes prose→`routes.agents`; capture baseline.
    - _Requirements: 10.1, 10.2, 13.1, 14.1, 15.2, 21.1_

  - [x] 11.2 Generate both targets, run checks, commit sweep report, Stacy validation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy
    - Generate both targets; run checks; commit `cutover/thurgood-cutover-report.md`; **commit `cutover/thurgood-diff-vs-baseline.md`** (classified diff vs the current CC agent; channel-move only if the replacement cue passes C7 resolution else `regression`; regressions adjudicated in this artifact's `## Regression adjudications` section; zero unexplained regressions; paired with C7); Stacy validation recorded; record the independent validation signature (amendment 4); adjudicate any missed shape before merge.
    - _Requirements: 18.1, 19.3, 21.3, 21.5, 22.3_

- [ ] 12. Cutover: Leonardo (product architect) — the consumer-signal cutover — **U6, cutover position 5**

  **Type**: Parent
  **Unit**: U6
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Leonardo's canonical source authored + both targets generated + checks green/adjudicated + sweep report + Stacy validation recorded.
  - His inter-agent handoff routing table is preserved as `routes.agents` frontmatter (Req 10 AC5 — not only doc/tool cues); his empty-by-design manifest verdict honored.
  - Acceptance signal (Req 23 AC3): demotion-delta ≈ the ~60% trim recorded as a per-agent-MEMBER figure (not union, LE-D4); check 8 green (a replacement cue per demotion); sweep 3 green on his emitted config (the known double-load resolved).

  **Primary Artifacts:**
  - `canonical/agents/leonardo.md`; baseline; generated outputs; `cutover/leonardo-cutover-report.md`
  - `cutover/leonardo-diff-vs-baseline.md` (classified diff vs the current CC agent — merge-gate artifact; his ~60% demotion lands mostly as **channel-move** entries, not regressions)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-12-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-12-summary.md`

  **Post-Completion (UNIT U6 — Cutover: Leonardo — single-parent unit, opens its PR):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-cutover-leonardo` branch)
  - Open U6's PR: `./.kiro/hooks/complete-task.sh "Task 12 Complete: Cutover Leonardo (122)"` — report the PR URL and STOP; complete at merge (Peter merges). PR body carries `Unit: U6 — Cutover: Leonardo`. **Merge gate: zero unexplained regressions in `cutover/leonardo-diff-vs-baseline.md` — his ~60% trim classifies as channel-move ONLY where each trimmed doc's replacement cue passes C7 resolution (the rule of the channel-move bucket, Group 2 preamble); any trimmed doc without a C7-resolving replacement cue is a `regression`, adjudicated in the artifact's `## Regression adjudications` section — AND C7 green/adjudicated AND an independent validation signature recorded. This is the spec's highest-exposure channel-move surface.**

  - [ ] 12.1 Author Leonardo's canonical source + capture baseline
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Leonardo (Leonardo confirms the handoff routing table + ~60% demotion cues on the PR)
    - Carry config/prompt into `canonical/agents/leonardo.md`; MIGRATE the inter-agent handoff routing table from body prose into `routes.agents` (LE-D1 — this is the live instance the not-yet-ported check must bite on); each ~60% demotion emits an MCP replacement cue (Req 12 AC1); capture baseline.
    - _Requirements: 10.1, 10.4, 10.5, 12.1, 15.2, 21.1_

  - [ ] 12.2 Generate both targets, run checks, commit sweep report, Stacy validation, measure signal
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy
    - Generate both targets; run checks; commit `cutover/leonardo-cutover-report.md`; **commit `cutover/leonardo-diff-vs-baseline.md`** (classified diff vs the current CC agent; his ~60% demotion — the spec's highest-exposure channel-move surface — classifies as channel-move ONLY where each trimmed doc's replacement cue passes C7 resolution (rule of the bucket); an uncued OR unresolving demotion is a `regression`, adjudicated in this artifact's `## Regression adjudications` section; zero unexplained regressions; paired with C7); Stacy validation recorded; record the independent validation signature (amendment 4).
    - Measure the Req 23 AC3 signal (demotion count ≈ 60% as member figure; check 8 green; sweep 3 green); adjudicate any missed shape before merge.
    - _Requirements: 12.1, 18.1, 19.3, 21.3, 21.5, 22.3, 23.3, 23.5_

- [ ] 13. Cutover: Data (Android platform engineer) — **U7, cutover position 6**

  **Type**: Parent
  **Unit**: U7
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Data's canonical source authored (JOB-1 content carried from the outline round record, Req 21 AC2) + both targets generated + checks green/adjudicated + sweep report + Stacy validation recorded.
  - His none-trim-stale-snapshots verdict honored: each trimmed `dist/android/*.kt` artifact emits a per-artifact hard-negative-plus-positive cue (Req 12 AC2(a)); theme-varying token cues return the per-theme SET via `shape: per-theme-set` (Req 12 AC2(b)); `fires: unconditional` trims cover orphaned artifacts (K-D1).
  - Sweep 8 demotion-diff exercises artifact-path members on his live trims (D-A1).

  **Primary Artifacts:**
  - `canonical/agents/data.md`; baseline; generated outputs; `cutover/data-cutover-report.md`
  - `cutover/data-diff-vs-baseline.md` (classified diff vs the current CC agent — merge-gate artifact)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-13-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-13-summary.md`

  **Post-Completion (UNIT U7 — Cutover: Data — single-parent unit, opens its PR):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-cutover-data` branch)
  - Open U7's PR: `./.kiro/hooks/complete-task.sh "Task 13 Complete: Cutover Data (122)"` — report the PR URL and STOP; complete at merge (Peter merges). PR body carries `Unit: U7 — Cutover: Data`. **Merge gate: zero unexplained regressions in `cutover/data-diff-vs-baseline.md` — his per-artifact trims classify as channel-move ONLY where each `dist/android/*.kt` trim's hard-negative-plus-positive cue passes C7 resolution (rule of the channel-move bucket); any uncued/unresolving trim is a `regression`, adjudicated in the artifact's `## Regression adjudications` section — AND C7 green/adjudicated AND an independent validation signature recorded.**

  - [ ] 13.1 Author Data's canonical source (carry JOB-1) + capture baseline
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Data (Data confirms JOB-1 carry + trim cues on the PR)
    - Carry Data's JOB-1 (outline round record) into `canonical/agents/data.md` traceably (`Source:` comments — Req 21 AC2); author `groundTruthManifest.trims` with `shape: per-theme-set` cues + `fires: unconditional`; migrate routes prose→`routes.agents`; capture baseline (ids + artifact-path members).
    - _Requirements: 10.1, 10.2, 12.1, 12.2, 15.2, 21.1, 21.2_

  - [ ] 13.2 Generate both targets, run checks, commit sweep report, Stacy validation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy
    - Generate both targets; run checks (sweep 8 exercises artifact-path removals; the `start-up-tasks` re-run shows no-delta post-union); commit `cutover/data-cutover-report.md`; **commit `cutover/data-diff-vs-baseline.md`** (classified diff vs the current CC agent; artifact-path trims classify as channel-move ONLY where each trim's cue passes C7 resolution (rule of the bucket) else `regression`; regressions adjudicated in this artifact's `## Regression adjudications` section; zero unexplained regressions; paired with C7); Stacy validation recorded; record the independent validation signature (amendment 4); adjudicate any missed shape before merge.
    - _Requirements: 12.1, 12.2, 18.1, 19.3, 21.3, 21.5, 22.3_

- [x] 14. Cutover: Sparky (web platform engineer) — FIRST-GENERATION (never-ported); content-before-catalog — **U5, cutover position 4** (moved early per Peter's 2026-07-07 order to surface first-generation risk with runway)

  **Type**: Parent
  **Unit**: U5
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Sparky's 8 verified commands + 3 named gaps (input-of-record in `feedback/requirements.md`) are carried into canonical source BEFORE his catalog generates (Req 21 AC2); a named gap IS valid content (no dev server → `build:watch` is tsc-only, no dev-server cue generated — Req 21 AC1).
  - His FIRST CC generation is a first-generation cutover (Req 15 AC1 / Req 21 AC5 — mandatory Stacy trigger); baseline degrades to the Kiro-side set (D-A4 — but Sparky has a `sparky.json`, so use its resources).
  - Config-derived write scope carried from `sparky.json` `allowedPaths` = `.kiro/specs/**` + `docs/specs/**` (Req 15 AC3); dev-server absence marked intentional-and-unguarded in his acceptance signals (SP-D2).

  **Primary Artifacts:**
  - `canonical/agents/sparky.md`; baseline; generated outputs; `cutover/sparky-cutover-report.md`
  - `cutover/sparky-content-completeness.md` (**content-completeness check — NOT a diff-against-baseline**: Sparky was NEVER CC-ported, so there is no current CC agent to diff. Instead verify the generated CC output is complete against (a) canonical source and (b) his supplied 8 commands + 3 named gaps. Merge gate: zero unexplained omissions vs the authored input-of-record.)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-14-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-14-summary.md`

  **Post-Completion (UNIT U5 — Cutover: Sparky — single-parent unit, opens its PR; NEVER-PORTED seat, first-generation risk surfaced EARLY at position 4 per Peter's 2026-07-07 order):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-cutover-sparky` branch)
  - Open U5's PR: `./.kiro/hooks/complete-task.sh "Task 14 Complete: Cutover Sparky — first generation (122)"` — report the PR URL and STOP; complete at merge (Peter merges). PR body carries `Unit: U5 — Cutover: Sparky (first-generation, never-ported)`. **Merge gate: `cutover/sparky-content-completeness.md` shows zero unexplained omissions vs canonical + his 8+3 input-of-record (NO diff-against-baseline — no current CC port exists; the channel-move-bucket rule does not apply) AND C7 green/adjudicated AND an independent validation signature recorded.**

  - [x] 14.1 Carry Sparky's input-of-record content into canonical source (content-before-catalog)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Sparky (Sparky confirms the 8+3 carry on the PR)
    - Carry Sparky's 8 verified commands + 3 named gaps from `feedback/requirements.md` into `canonical/agents/sparky.md` traceably (`Source:` comments — Req 21 AC2); named gaps land as `gap:` command entries with run-context annotations; carry the specs-only write scope from `sparky.json`.
    - Capture baseline from `sparky.json` resources (ids + artifact-path members).
    - _Requirements: 15.3, 21.1, 21.2_

  - [x] 14.2 Generate both targets, run checks, commit sweep report, Stacy validation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy
    - Generate both targets (his first CC port — a first-generation cutover); run checks; commit `cutover/sparky-cutover-report.md`; Stacy validation recorded (mandatory first-generation trigger).
    - **Commit `cutover/sparky-content-completeness.md`** (content-completeness check, NOT a diff — no current CC baseline exists): verify the generated CC output covers canonical source + his 8 verified commands + 3 named gaps with zero unexplained omissions; a named gap present-as-gap is complete, not an omission.
    - Record dev-server absence as intentional-and-unguarded in his acceptance signals (SP-D2); record the independent validation signature (amendment 4); adjudicate any missed shape before merge.
    - _Requirements: 15.1, 15.3, 18.1, 19.3, 21.1, 21.3, 21.5, 22.3_

- [ ] 15. Cutover: Kenya (iOS platform engineer) — FIRST-GENERATION (never-ported); content-before-catalog

  **Type**: Parent
  **Unit**: U8
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Kenya's 4 verified commands + 4 named gaps (input-of-record in `feedback/requirements.md`) carried into canonical source BEFORE catalog generates (Req 21 AC2); the no-in-repo-iOS-build reality is a run-context-annotated consumer-repo command class + in-repo pipeline commands (a verified named gap IS valid content, Req 21 AC1).
  - His FIRST CC generation is a first-generation cutover (mandatory Stacy trigger); baseline degrades explicitly to the Kiro-side set (D-A4 — never-ported).
  - Zero-skills registers as a sweep-2 PASS (`0 declared / 0 emitted`, Req 8 AC1); orphaned `dist/ios/DesignTokens.ios.swift` fires its `fires: unconditional` negative (K-D1); standing platform-reality facts homed in structured `standingFacts` (K-D3 — not a body annotation).

  **Primary Artifacts:**
  - `canonical/agents/kenya.md`; baseline; generated outputs; `cutover/kenya-cutover-report.md`
  - `cutover/kenya-content-completeness.md` (**content-completeness check — NOT a diff-against-baseline**: Kenya was NEVER CC-ported. Verify the generated CC output is complete against (a) canonical source and (b) his supplied 4 commands + 4 named gaps + `standingFacts`. Merge gate: zero unexplained omissions vs the authored input-of-record.)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-15-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-15-summary.md`

  **Post-Completion (UNIT U8 — Cutover: Kenya — single-parent unit, opens its PR; NEVER-PORTED seat):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-cutover-kenya` branch)
  - Open U8's PR: `./.kiro/hooks/complete-task.sh "Task 15 Complete: Cutover Kenya — first generation (122)"` — report the PR URL and STOP; complete at merge (Peter merges). PR body carries `Unit: U8 — Cutover: Kenya (first-generation, never-ported)`. **Merge gate: `cutover/kenya-content-completeness.md` shows zero unexplained omissions vs canonical + his 4+4 input-of-record + standingFacts (NO diff-against-baseline — no current CC port exists; the channel-move-bucket rule does not apply) AND C7 green/adjudicated AND an independent validation signature recorded.**

  - [ ] 15.1 Carry Kenya's input-of-record content into canonical source (content-before-catalog)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Kenya (Kenya confirms the 4+4 carry + standingFacts on the PR)
    - Carry Kenya's 4 verified commands + 4 named gaps from `feedback/requirements.md` into `canonical/agents/kenya.md` traceably; named gaps → `gap:`/consumer-repo command entries; home the standing platform-reality facts (no in-repo iOS build path; 151 `.swift` as tool-routed cue not standingFact) in structured `standingFacts` (K-D3); author the orphaned-artifact `fires: unconditional` trim (K-D1).
    - Capture baseline degrading explicitly to the Kiro-side set (D-A4).
    - _Requirements: 12.1, 12.2, 15.3, 21.1, 21.2_

  - [ ] 15.2 Generate both targets, run checks, commit sweep report, Stacy validation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy
    - Generate both targets (first CC port — first-generation cutover); run checks (zero-skills = sweep-2 PASS; orphaned-artifact negative fires); commit `cutover/kenya-cutover-report.md`; **commit `cutover/kenya-content-completeness.md`** (content-completeness check, NOT a diff — no current CC baseline): verify generated CC output covers canonical + 4 verified commands + 4 named gaps + standingFacts with zero unexplained omissions; Stacy validation recorded (mandatory); record the independent validation signature (amendment 4); adjudicate any missed shape before merge.
    - _Requirements: 8.1, 15.1, 18.1, 19.3, 21.1, 21.3, 21.5, 22.3_

- [ ] 16. Cutover: Stacy (product governance & QA) — FIRST-GENERATION (never-ported); content-before-catalog

  **Type**: Parent
  **Unit**: U9
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Stacy's command content is authored into canonical source BEFORE her catalog generates (Req 21 AC2 — she was the remaining seat lacking authored command content after the Sparky/Kenya carry; her audit commands were provisioned at Task 8/C12 and are carried here as her canonical catalog).
  - **Stacy WAS CC-ported (`stacy.md` exists), so she gets the diff-against-baseline artifact** — NOT the content-completeness variant (that is only for the two never-ported seats, Sparky/Kenya). The two properties are orthogonal: "lacking authored command content" (→ content-before-catalog) is a different axis from "never CC-ported" (→ content-completeness instead of diff). Stacy is the first, not the second.
  - Her FIRST fully-GENERATED CC catalog is a first-generation-catalog cutover. **Because a QA seat validating its own generated catalog is a self-review conflict (Stacy amendment 4), the independent second-reviewer path is the DEFAULT done-condition here, NOT the fallback**: the merge gate requires an **independent validation signature** — Thurgood verifies AND a second reviewer per Peter's routing sign off; Stacy's own self-validation does not, by itself, satisfy the gate for her own cutover. The ambient baseline degrades to the Kiro-side set (D-A4), but her CC-agent diff has a real `stacy.md` baseline.
  - Her collapses-into-catalog/computed manifest verdict honored; the coverage-of-coverage audit commands (incl. `npm run audit:coverage-map`) appear in her generated catalog.

  **Primary Artifacts:**
  - `canonical/agents/stacy.md`; baseline; generated outputs; `cutover/stacy-cutover-report.md`
  - `cutover/stacy-diff-vs-baseline.md` (classified diff vs the current `stacy.md` CC agent — merge-gate artifact; she was ported, so a real baseline exists)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-16-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-16-summary.md`

  **Post-Completion (UNIT U9 — Cutover: Stacy — single-parent unit, opens its PR; the final cutover):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-cutover-stacy` branch)
  - Open U9's PR: `./.kiro/hooks/complete-task.sh "Task 16 Complete: Cutover Stacy — first generation (122)"` — report the PR URL and STOP; complete at merge (Peter merges). PR body carries `Unit: U9 — Cutover: Stacy`. **Merge gate: zero unexplained regressions in `cutover/stacy-diff-vs-baseline.md` (she was ported — real baseline; channel-move lines honor the rule-of-the-bucket; regressions adjudicated in the artifact's `## Regression adjudications` section) AND C7 green/adjudicated AND — because this is the QA seat's OWN cutover (self-review conflict) — an INDEPENDENT validation signature (Thurgood + a second reviewer per Peter's routing) is the DEFAULT done-condition, not a fallback (Stacy amendment 4).**

  - [ ] 16.1 Author Stacy's canonical source (carry provisioned audit catalog) + capture baseline
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy (Stacy confirms her carried audit catalog on the PR)
    - Author `canonical/agents/stacy.md`; carry her audit-command catalog (provisioned at Task 8/C12: `audit:coverage-map`, `audit:mode-parity`, `audit:theme-drift`, `test:coverage`, `governance-check.sh`, `verify-gate-registration.sh`) with run-context; migrate routes prose→`routes.agents`; capture baseline degrading to Kiro-side (D-A4).
    - _Requirements: 15.3, 21.1, 21.2, 22.1_

  - [ ] 16.2 Generate both targets, run checks, commit sweep report, independent validation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Stacy + independent second reviewer (per Peter's routing — Stacy's own cutover cannot be self-validated; amendment 4)
    - Generate both targets (first fully-generated catalog — first-generation-catalog cutover); run checks; commit `cutover/stacy-cutover-report.md`; **commit `cutover/stacy-diff-vs-baseline.md`** (classified diff vs the current `stacy.md`; channel-move lines honor the rule-of-the-bucket — replacement cue passes C7 else `regression`; zero unexplained regressions recorded in the artifact's `## Regression adjudications` section; paired with C7).
    - **Independent validation signature (DEFAULT, not fallback — amendment 4):** Thurgood verifies AND a second reviewer per Peter's routing signs off; record the independent signature in the cutover report. Stacy's self-validation alone does not satisfy her own cutover's gate.
    - Adjudicate any missed shape before merge.
    - With Stacy's cutover, "complete for all 8" is demonstrated per-agent over time (Req 21 AC3); the fixture's first pass (Task 8) remains the content-agnosticism acceptance evidence (Req 23 AC4).
    - _Requirements: 15.1, 18.1, 19.3, 21.1, 21.3, 21.5, 22.3_

---

## Group 3 — OB-7 retirement

- [ ] 17. OB-7: generate the CC always-layer (both lanes) + retire the interim CLAUDE.md

  **Type**: Parent
  **Unit**: U10
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Both C11 delivery lanes emit from the generator: (lane 1) the locked always-set → generated `CLAUDE.md` `@`-import lines (id→path at emit time) + generated banner — structurally drift-free; (lane 2) per-agent five-class members → generated INLINE in each `.claude/agents/<agent>.md` body (CC's native per-agent format — no per-agent import channel, cc-agent-model.md facet 2), guarded by the closure-complete diff-guard.
  - The probe-subagent test (certainty-calibration + canary recitation, canary planted in the imported TARGET file for lane 1) is recorded per generated CC agent as evidence the ambient content reaches subagents (Req 16 AC2 / design § Testing Strategy).
  - The interim hand-maintained `CLAUDE.md` is retired — its curated prose replaced wholesale by generated content ("folded into generated output", Req 16 AC2); exactly one always-layer mechanism (the generator) remains per runtime.
  - Union integrity across lanes: sweep 4 checks the union against the design regardless of lane (Req 9 AC3).

  **Primary Artifacts:**
  - Generated `CLAUDE.md` (lane 1) + per-agent inline bodies (lane 2, already emitted per-cutover — this task closes the shared lane + retirement)
  - `.kiro/docs/ballots/` retirement ballot record (record-first)
  - Updated `.kiro/specs/119-steering-progressive-disclosure-redesign/119-B-deferred-obligations.md` § OB-7 (closed)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-17-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-17-summary.md`

  **Post-Completion (UNIT U10 — OB-7 retirement — single-parent unit, opens its PR):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-ob7-claude-md` branch)
  - Open U10's PR: `./.kiro/hooks/complete-task.sh "Task 17 Complete: OB-7 CC always-layer + CLAUDE.md retirement (122)"` — report the PR URL and STOP; complete at merge (Peter merges — governance-law carve-out: an always-loaded delivery surface). PR body carries `Unit: U10 — OB-7 retirement`.

  - [ ] 17.1 Emit the generated CLAUDE.md always-lane + record the probe-subagent evidence
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Implement `emitAlwaysLayer` (CC) lane 1: generate `CLAUDE.md` with the always-set as `@`-import lines + generated banner (a live reference, drift-free — Req 1 AC5).
    - Record the probe-subagent test per generated CC agent: certainty-calibration rule reaches the subagent; canary planted in the imported target file discriminates resolution from snapshot (LE-D2 realized by fact — lane 1 imports resolve). Evidence committed.
    - _Requirements: 1.5, 9.3, 16.1, 16.2_

  - [ ] 17.2 Retire the interim CLAUDE.md via the record-first ratification ballot
    **Type**: Documentation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Stage the record-first retirement (design §C11 retirement staging): (1) generated CC always-layer live for all cut-over agents; (2) draft the ballot per `.kiro/docs/ballots/README.md` — exact before→after: hand-maintained `CLAUDE.md` content replaced by generated output, OB-7 tracking entry closed; (3) `RATIFIED` recorded (Peter) BEFORE the swap PR merges (it changes an always-loaded governance delivery surface); (4) the ratified swap PR is the retirement record closing OB-7 (Req 16 AC3).
    - Update `119-B-deferred-obligations.md` § OB-7 to closed, referencing the retirement record. Confirm the interim `CLAUDE.md` stopgap and generated output do NOT coexist past 122 (Req 16 AC2). Consumer-side CC delivery stays out of scope (123 — Req 16 AC4).
    - Tier 2 rationale (conjunctive): the retirement ballot carries SHALL/SHALL-NOT contract semantics (retires an always-loaded delivery surface) AND another spec (123) depends on the OB-7 closure state — both properties hold.
    - _Requirements: 16.2, 16.3, 16.4_

---

## Closeout

- [ ] 18. Closeout: handbacks to 119-B and 123, umbrella/deferred-obligation updates

  **Type**: Parent
  **Unit**: U11
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The 119-B handback is written: 122 delivered the generator that 119-B's routing + measurement work consumes; OB-5/OB-6/OB-7 dispositions recorded (OB-5 cue generated, OB-6 ports generated, OB-7 retired).
  - The 123 handback is written: canonical source + adapters exist; consumer-side CC always-layer delivery (Req 16 AC4) and consumer distribution are 123's to build; the CC/Kiro adapter seam is documented for the third-target (Cursor) proof-of-additivity (Req 24 AC4).
  - The 119-B deferred-obligations ledger and any umbrella tracking (OB-7 closure; the CLAUDE.md interim-stopgap note in `CLAUDE.md`) are reconciled — exactly one always-layer mechanism per runtime, per OB-7.

  **Primary Artifacts:**
  - Handback notes into `.kiro/specs/119-steering-progressive-disclosure-redesign/` and `.kiro/specs/123-*/` (inbound notes)
  - Updated deferred-obligations ledger; updated `CLAUDE.md` interim-stopgap note (retired per OB-7)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/122-agent-generator/completion/task-18-parent-completion.md`
  - Summary: `docs/specs/122-agent-generator/task-18-summary.md`

  **Post-Completion (UNIT U11 — Closeout — single-parent unit, opens its PR):**
  - Mark complete: Use `taskStatus` tool to update task status (on the `task/122-closeout` branch)
  - Open U11's PR: `./.kiro/hooks/complete-task.sh "Task 18 Complete: Closeout — handbacks + ledger reconciliation (122)"` — report the PR URL and STOP; complete at merge (Peter merges). PR body carries `Unit: U11 — Closeout`.

  - [ ] 18.1 Write the 119-B and 123 handbacks
    **Type**: Documentation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Write the 119-B handback (generator delivered; OB-5/6/7 dispositions; measurement surfaces the cutover reports pinned) and the 123 handback (canonical source + adapters + the CC/Kiro seam; consumer-side delivery is 123's; Cursor is the proof-of-additivity target per Req 24 AC4). Cross-reference from each receiving spec's decision record.
    - Tier 2 rationale (conjunctive): the handbacks carry SHALL/SHALL-NOT hand-off semantics AND downstream specs (119-B, 123) depend on them — both properties hold (precedent: Spec 118 Task 6).
    - _Requirements: 16.4, 24.4_

  - [ ] 18.2 Reconcile the deferred-obligations ledger and the CLAUDE.md interim note
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Confirm OB-5/OB-6/OB-7 closed or dispositioned in `119-B-deferred-obligations.md`; confirm `CLAUDE.md`'s interim-stopgap banner is retired/superseded per OB-7 (no coexistence past 122); route any discovered out-of-scope work to its owner via inbound note (Req 25 AC3), NOT absorbed.
    - _Requirements: 25.3_

---

## Notes (post-incorporation — tasks round 1)

- **The two flagged design under-specifications are RESOLVED by Peter's 2026-07-07 decisions** (see `feedback/tasks.md` § THURGOOD R2). (1) First CC cutover = **Ada** (mechanically forced — the diff-against-baseline gate needs a real committed baseline, excluding the never-ported seats). (2) Group 2 cutover ORDER = **Ada → Lina → Thurgood → Sparky → Leonardo → Data → Kenya → Stacy** (Sparky moved to position 4 / U5 to surface first-generation risk early, with runway). The unit numbering is remapped accordingly (Sparky U5, Leonardo U6, Data U7); task numbers stay bound to content.
- **Stacy's 6 amendments are folded in** (see `feedback/tasks.md` § STACY R1 + THURGOOD R2): (1) channel-move bucket bound to a passing C7 resolution check — the rule of the bucket, in the Group 2 preamble + each ported cutover; (2) Task 8.3 reviewer's reading-order index for U1's large PR; (3) `Stacked-on:` discipline stated — cutovers parallelize from `main` post-U1, order is review-attention not branch dependency; (4) independent-validation signature is the DEFAULT done-condition (esp. Stacy's own cutover U9); (5) regression-adjudication record location named — `## Regression adjudications` in each cutover's diff artifact; (6) Task 8.3 closure gates on Stacy's CONFIRMED coverage-map, not merely a green script run.
- **Agent field is a recommendation** — most substrate tasks are Thurgood's (governance/generator machinery); cutover content-authoring subtasks pair Thurgood with the owning seat, who confirms carried content on the PR. Peter may route differently.

---

*Tasks — round 1 incorporated + cutover order ratified (v3). Task types per the ratified four-type taxonomy; validation tiers assigned. **Merge units DECLARED and cutover ORDER RATIFIED** (U1 Substrate = one PR at the phase gate; U2 Ada → U3 Lina → U4 Thurgood → U5 Sparky → U6 Leonardo → U7 Data → U8 Kenya → U9 Stacy = one PR per cutover; U10 OB-7; U11 Closeout) — the merge-on-coherent-unit structure per the 2026-07-07 ballot (`.kiro/docs/ballots/2026-07-07-merge-on-coherent-unit.md` — separate ratification path); the cutover order per Peter's 2026-07-07 decision. The substrate phase gate (Task 8) is the hard sequencing boundary AND U1's merge. Each cutover carries a per-cutover diff-against-baseline (ported seats) or content-completeness (never-ported Sparky/Kenya) merge-gate artifact — with the channel-move bucket bound to C7 resolution, regressions adjudicated in a named artifact section, and an independent validation signature required — paired with the C7 canonical-vs-truth checks. **PENDING PETER'S RATIFICATION** — the last formalization gate before the build. Every subtask carries Type + Validation + Agent + Requirements traceability.*
