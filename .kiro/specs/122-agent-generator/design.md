# Design: 122 — Agent Generator

**Date**: 2026-07-05
**Spec**: 122 — Agent Generator
**Status**: **DRAFT — pending the design feedback round** (Sequential Formalization Gate: requirements RATIFIED Peter 2026-07-05; tasks.md does not begin until this document clears its round)
**Author**: Thurgood (Civitas steward, formalization lead)
**Dependencies**: requirements.md (RATIFIED — the WHAT this document answers), design-outline.md §3/§3a/§3b/§8 (settled architecture direction), `per-agent-ambient-design.md` (the spine), 125-A Phase 0 (the live gate 122's checks register onto)

---

## Overview

One canonical definition per agent; a composition pipeline that resolves corpus references by `id`, renders structured fields deterministically, and passes hand-authored prose through verbatim; two pluggable adapters (Claude Code first, then Kiro) emitting every per-tool artifact; a regenerate-and-diff guard plus a canonical-vs-truth check plus eight mechanical sweeps, all registered as unfiltered required checks on the 125-A Phase 0 gate; per-agent cutover PRs behind a substrate phase gate.

This document carries **mechanisms only**. Obligations live in requirements.md; every component below carries a `Traces to:` line. Where requirements deferred a shape to design, the decision is made here and collected in § Design Decisions.

```
INPUTS                          PIPELINE                        OUTPUTS (committed, guarded)
canonical/agents/*.md      →   [validate]                  →   .kiro/agents/<agent>.json + <agent>-prompt.md
canonical/shared/*         →   [resolve | render | pass]   →   .claude/agents/<agent>.md
skills/** (neutral root)   →   [adapter: kiro | cc]        →   CLAUDE.md (generated; OB-7)
governance corpus (by id)  →                               →   .claude/skills/** , .kiro/skills/** (from skills/)
live MCP declarations      →   [emit manifests]            →   canonical/registry/tool-registry.json
WORKFLOW_RULES (import)    →                               →   per-agent ambient-manifest + attribution + demotion delta

CHECKS (all on the PR gate, unfiltered): diff-guard · canonical-vs-truth (5 classes) · sweeps 1–8
```

### The substrate seam (phase gate)

Everything agent-content-independent is **substrate**: the registry generator (C5), the skills pipeline (C2.2 + C4), the pipeline engine (C3), the adapters (C4), and the diff-guard (C6). Everything per-agent is **agent generation**: ambient composition (C3.2), catalogs, cutovers (C10). The substrate is proven end-to-end on BOTH adapters — with the C13 evidence bundle committed — before any agent-prompt generation task starts. Build order within the seam: CC adapter first, Kiro second (Req 24 AC2). *Traces to: Req 6, Req 24.*

---

## Architecture

### Repository layout

```
canonical/                          # NEW — the canonical source root
  agents/
    ada.md … stacy.md               # one per agent: YAML frontmatter + Markdown body (Req 2 AC1)
    _fixture.md                     # the minimal 9th-agent standing fixture (C10.3)
  shared/
    always-set.yaml                 # the locked always-set (Req 9 union input)
    skills-map.yaml                 # canonical_path → per-target path table (Req 8 AC1)
    field-dispositions.yaml         # Kiro-config-field + runtime-tool-ref dispositions (Req 11 AC2/AC5)
    shared-catalog.yaml             # cross-agent catalog members (complete-task.sh, find_docs row, ratification rule)
  registry/
    tool-registry.json              # GENERATED (C5) — also the 125 tool-boot smoke manifest
  baselines/
    <agent>.ambient-baseline.json   # pre-cutover ambient capture (demotion-diff origin, C8 check 8)
  manifests/
    <agent>.<target>.ambient-manifest.json    # GENERATED — machine-readable membership per agent per target
    <agent>.<target>.demotion-delta.json      # GENERATED — removals vs baseline (Req 12 AC1)
  cutover-ledger.yaml               # which agents the generator is SSOT for (drives check coverage)
  coverage-map.yaml                 # GENERATED skeleton + authored check column (Req 22 AC4(b))
  _fixture-output/                  # committed fixture outputs (both targets) — no runtime loads these
skills/                             # NEW — neutral skills root, sibling to governance/ (Req 8 AC3)
  theming-styles/ … impeccable/ …   # relocated from .kiro/skills/** ; SKILL.md + bundled scripts
tools/agent-generator/              # the generator + checks (TypeScript, run via tsx — Req 5 AC1/AC2)
.github/workflows/agent-generator.yml   # all 122 checks as named jobs (C9)
```

Generated **runtime** outputs stay in their runtime homes (`.kiro/agents/*`, `.claude/agents/*`, `.claude/skills/*`, `.kiro/skills/*`, `CLAUDE.md`) — committed, diff-guarded, never hand-edited once the agent is in the cutover ledger. *Traces to: Req 2, Req 8 AC3, Req 15, Req 17 AC2.*

### The three content operations (the whole pipeline)

Every byte of generated output is produced by exactly one of (Req 1 AC3):

- **(a) resolve** — a corpus/registry reference resolved by `id` at generate time. Rendered per target as a *runtime-resolvable reference* wherever the target runtime has a resolution mechanism (Kiro `resources` file refs; CLAUDE.md `@`-imports); rendered as a *declared embed* only where the runtime has none (see C11), attributed as `resolve` either way.
- **(b) pass-through** — formative / reflexive-principle / role-specific prose from the canonical body, byte-identical.
- **(c) render** — deterministic template glue from structured frontmatter fields: rendered `WORKFLOW_RULES`, write-scope notes from `allowedPaths`, run-context annotations, headings, cue sentences assembled from cue fields. Class (c) can only restate what a canonical field already carries — templates contain no free-text substance, only field slots and fixed connective grammar.

The generator is deterministic: sorted collections, no timestamps, byte-identical outputs for identical inputs (precondition for C6). *Traces to: Req 1.*

---

## Components and Interfaces

### C1 — Canonical agent source schema

*Traces to: Req 2, Req 3, Req 5 AC3, Req 7 AC4, Req 10, Req 11 AC1/AC3, Req 12 AC3/AC6, Req 13, Req 14, Req 18 AC2(a), Req 21 AC1/AC2.*

One file per agent: `canonical/agents/<agent>.md`. **Frontmatter = the machine-consequential classes** (membership, routes, skills, commands, grants, config — everything a transform or guard operates on). **Body = the human-authored classes** (formative, reflexive-principle, role-specific prose), pass-through verbatim.

```yaml
---
agent: data
agentType: consumer                    # owner | consumer | differential-auditor
description: "Android platform engineer — …"

# ——— MEMBERSHIP (five-class; union with always-set per Req 9) ———
ambient:
  # Per-agent members ONLY. Always-set docs never appear here as membership;
  # class annotations for always-set docs live in shared/always-set.yaml.
  governanceAsLaw:
    - id: platform-implementation-guidelines
      assert:                          # materialized substance predicate (Req 18 AC2(a))
        - section: "Platform-Specific Implementation Rules"     # interim form: id + verbatim heading (Req 3 AC2)
          mustContain: ["Jetpack Compose", "token"]             # normalized literal substrings; `pattern:` escape allowed
      owner: lina                      # substance adjudicator (Req 18 AC3)
    - id: token-quick-reference
      assert: [...]
      owner: ada
  groundTruthManifest:
    verdict: none-trim-stale-snapshots # none-standing | catalog-is-manifest | collapses-into-catalog | empty | none-trim-stale-snapshots
    trims:                             # each trim feeds a demotion cue (Req 12 AC1/AC2)
      - artifact: dist/android/DesignTokens.android.kt
        cue: { negative: "do NOT read dist/android/*.kt", tool: get_token_details, mcp: application,
               note: "theme-varying tokens are a per-theme SET — the tool returns the set" }
      - artifact: dist/ComponentTokens.android.kt
        cue: { negative: "do NOT read dist/*.android.kt", tool: get_component_full, mcp: application }

# ——— ROUTES (Req 3, Req 10, Req 13, Req 14, Req 18 AC2(b)) ———
routes:
  docs:
    - { id: module-resolution-contract-home, doc: rosetta-system-architecture,
        section: "Module-Resolution Contract (Spec 118)",
        when: "touching runtime-TS loading, package exports, consumer .ts" }
  agents:
    - { target: lina, when: "component schema or scaffolding question",
        disposition: resolves }        # resolves | not-yet-ported (Req 18 AC2(b))
  cues:                                # triggered tool cues, per MCP (Req 10 AC4)
    - { when: "you need Android token values", tool: get_token_details, mcp: application,
        replaces: dist/android/DesignTokens.android.kt }   # `replaces` keys the demotion-diff (check 8)

# ——— CAPABILITY CATALOG (Req 12, Req 21) ———
commands:
  - { name: platform-tokens, cmd: "npm run generate:platform-tokens", runContext: this-repo,
      source: package.json, cue: "WHEN regenerating Android token output" }
  - { class: gradle-build-test, runContext: consumer-repo,     # named-gap / consumer-class entry (Req 21 AC1)
      gap: "no gradlew in this repo — build/test runs from the product app's android/ dir",
      cue: "run from the product app's android/ dir, not this repo" }
skills:                                # refs into shared/skills-map.yaml rows (never paths)
  - theming-styles
  - edge-to-edge
  - adaptive
  - navigation-3
knowledgeBases:                        # drives the per-agent /knowledge fallback note (Req 11 AC1)
  - { name: component-tests, globs: ["src/components/*/__tests__/**"] }

# ——— GRANTS & RUN SURFACES (Req 7 AC4, Req 11 AC3/AC4, Req 12 AC3) ———
toolSubset:                            # per-MCP inherent subset, drawn from the registry (C5)
  designerpunk-docs: [find_docs, get_document_summary, get_section]
  designerpunk-application: [search_tokens, get_token_details, get_component_full, get_component_health]
  designerpunk-product: [get_screen_spec, get_product_tokens]
writeScope: [".kiro/specs/**", "docs/specs/**"]   # renders the behavioral note (Req 11 AC3)

# ——— KIRO-ONLY FIELDS (dispositions in shared/field-dispositions.yaml; sweep 7) ———
kiro:
  keyboardShortcut: ctrl+shift+d
  welcomeMessage: "Hey! I'm Data…"
  agentSpawn: [{ command: "git status --porcelain", timeout_ms: 5000 }]
---

<!-- BODY: pass-through prose only. -->
## Identity        <!-- formative -->
…
## Domain Boundaries   <!-- role-specific -->
…
```

**Schema rules enforced by the validate stage (runs before generation; failure fails the diff-guard job):**

1. **Silent-failure discriminator** (Req 2 AC4): adding a new content class requires declaring it `frontmatter` or `body` in the schema definition (`tools/agent-generator/schema.ts`) with a one-line discriminator rationale — there is no default.
2. **Volatile-fact lint** (Req 12 AC6): a heuristic scan of body prose for {integer adjacent to inventory nouns (`components|tokens|docs|specs|concepts|sections|agents`), semver strings, "N of M" forms}. A hit fails validation unless the line carries `<!-- volatile-ok: <reason> -->`. This is the enforcement point for the authoring prohibition — mechanical at the only stage that sees canonical prose before the guards go blind to it.
3. **Predicate presence**: every `governanceAsLaw` entry MUST carry ≥1 `assert` and an `owner` (Req 18 AC2(a) cannot silently degrade).
4. **Run-context enum**: `runContext ∈ {this-repo, consumer-repo, per-product}`; `per-product` entries must carry `authoredPerProduct: true` (Req 12 AC3).
5. **Membership hygiene**: an always-set doc `id` appearing under `ambient.*` is a validation ERROR (annotations belong in `always-set.yaml`) — this makes per-agent always-set opt-outs inexpressible by construction (Req 9 AC2).

### C2 — Shared substrate files

*Traces to: Req 4, Req 8, Req 9, Req 11 AC2/AC5, Req 12 AC4, Req 13 AC2, Req 14.*

**C2.1 `always-set.yaml`** — the locked always-set: doc `id`s + per-doc class annotation + per-target delivery hint. The composition rule (Req 9, RATIFIED): `ambient(agent) = alwaysSet ∪ agent.ambient members`. The union is computed in C3.2; C1 rule 5 makes the other reading unrepresentable.

**C2.2 `skills-map.yaml`** — the explicit mapping table, canonical-keyed (Req 8 AC1):

```yaml
- canonical: skills/theming-styles          # the neutral-root home; SKILL.md + bundled scripts inside
  targets:
    cc:   .claude/skills/theming-styles     # flat dir + SKILL.md + activation description intact
    kiro: .kiro/skills/android/theming/styles
  owners: [data]
```

Every skill directory under `skills/` has exactly one row (sweep 2 checks both directions). `.kiro/skills/**` is a **generated output** of this table, same as `.claude/skills/**` — Kiro is not the source. Agents reference skills by row key only (C1 `skills:`), never by path; adapters resolve key → per-target path + per-target reference syntax (`skill://<kiro path>` vs CC Skill-tool naming).

**C2.3 `field-dispositions.yaml`** — one row per Kiro config field AND per runtime-specific tool reference in routed corpus content (Req 11 AC2/AC5):

```yaml
configFields:
  - { field: keyboardShortcut, cc: drop-with-reason, reason: "CC has no agent-swap hotkeys; routing note rendered instead" }
  - { field: welcomeMessage,   cc: drop-with-reason, reason: "CC subagents have no greeting surface" }
  - { field: hooks.agentSpawn, cc: transform, into: "behavioral pre-flight note rendered into prompt" }
  - { field: toolsSettings.write.allowedPaths, cc: transform, into: "write-scope behavioral note (field-driven render)" }
  - { field: includeMcpJson,   cc: drop-with-reason, reason: "CC reads .mcp.json globally" }
  # … every field observed in .kiro/agents/*.json; sweep 7 fails on any unlisted field
runtimeToolRefs:
  - { ref: taskStatus,      kiro: native, cc: "edit the tasks.md checkbox directly" }
  - { ref: getDiagnostics,  kiro: native, cc: "run tsc/lint via Bash" }
```

**C2.4 `WORKFLOW_RULES`** — imported (`import { WORKFLOW_RULES }` from the mcp-server package entry re-export, per 121 Task 6), filtered by `appliesToTools` per target, rendered as class-(c) content into every prompt. No canonical file duplicates a rule statement; the validate stage greps canonical bodies for encoded-rule `id` phrases and fails on hand-restated variants (Req 4 AC3).

**C2.5 `shared-catalog.yaml`** — catalog members every agent receives: the `complete-task.sh` completion tooling + activation cue (Req 12 AC4), the `find_docs` discovery row (Req 10 AC6), and the **record-first ratification rule** (Req 13): stated once here with `owner: thurgood` and `crossRef:` pointing at the 125 classification-map entry; sweep 1 resolves the crossRef (file + anchor exists), and the reciprocal entry in the 125 map names this file — the recorded cross-reference has two ends and both are checkable (Req 13 AC2).

### C3 — The pipeline engine

*Traces to: Req 1, Req 3, Req 9, Req 10.*

```typescript
interface Pipeline {
  validate(source: CanonicalSource): ValidationResult;          // C1 rules 1–5
  resolveAgent(agent: AgentSource, ctx: ResolveContext): ResolvedAgent;
  emit(agent: ResolvedAgent, adapters: TargetAdapter[]): EmittedArtifact[];
}
interface ResolveContext {
  corpus: CorpusResolver;      // id → doc / section, via the running docs MCP (C7 shares it)
  registry: ToolRegistry;      // C5 output
  skillsMap: SkillsMap;        // C2.2
  alwaysSet: AlwaysSet;        // C2.1
  workflowRules: WorkflowRule[];
}
```

**C3.1 Resolution** — doc references resolve by `id` against the running docs MCP (spawned once per generator run, C5's session reused): `id` resolves AND, for section-grain refs, the verbatim heading exists in the resolved doc (the Req 3 AC2 interim form; when `docid#sectionid` lands, `section:` fields upgrade in place with no pipeline change — the resolver is the only code that reads them). Physical paths appear **only** in adapter output where a runtime demands one (Kiro `resources` URIs), computed id→path at emit time so relocation = regenerate.

**C3.2 Ambient composition** — `membership = alwaysSet ∪ agent.ambient` (Req 9 AC1/AC3). The result is emitted per target as `canonical/manifests/<agent>.<target>.ambient-manifest.json` — the machine-readable membership statement that sweep 4, check 8, Req 10 AC4's set-inclusion check, and the Req 23 measurements all key on. Manifest verdicts are honored as data: verdict values map to fixed generation behaviors (e.g. `none-trim-stale-snapshots` → emit each trim's cue, never emit the artifact reference; `catalog-is-manifest` → emit the assembly-grain verbs `get_component_full` + `get_component_health` in the faithfulness cue; `empty` → emit nothing, recorded as intentional) (Req 10 AC2/AC3).

**C3.3 Provenance (the attributability mechanism — deferred shape, DECIDED)** — a **sidecar attribution manifest** per emitted artifact: `<output>.attribution.json`, committed and diff-guarded:

```json
{ "artifact": ".claude/agents/data.md",
  "spans": [
    { "lines": [1, 14],  "op": "render",      "source": "frontmatter:agent,description,toolSubset" },
    { "lines": [15, 88], "op": "passthrough", "source": "canonical/agents/data.md#body" },
    { "lines": [89, 102],"op": "resolve",     "source": "id:platform-implementation-guidelines", "mode": "embed" },
    { "lines": [103,110],"op": "render",      "source": "WORKFLOW_RULES[summary-first]" } ] }
```

Rationale for sidecar over inline markers: generated prompts are consumed by agents — inline provenance pollutes the operating context; a sidecar keeps the output clean while making Req 1 AC3's invariant checkable by machine (a checker asserts spans are total, non-overlapping, and every span's `op` ∈ {resolve, render, passthrough}). *Traces to: Req 1 AC3/AC4.*

### C4 — Target adapters

*Traces to: Req 11, Req 15, Req 24.*

```typescript
interface TargetAdapter {
  readonly target: 'kiro' | 'cc';                      // a third target implements this same interface
  emitAgent(agent: ResolvedAgent): EmittedFile[];       // prompt(s) + config(s)
  emitSkills(map: SkillsMap): EmittedFile[];            // per-target skill tree from skills/
  emitAlwaysLayer(set: AlwaysSet): EmittedFile[];       // Kiro: inclusion-always refs; CC: C11
  toolRef(subset: ToolSubset, tool: string): string;    // e.g. cc: `mcp__designerpunk-docs__${tool}`
  skillRef(row: SkillsMapRow): string;                  // kiro: skill://…; cc: Skill-tool form
  renderWriteScope(paths: string[]): string;            // field-driven note (Req 11 AC3)
  dispositions: FieldDispositionTable;                  // C2.3 slice for this target
}
```

Adding a target = implementing this interface + adding a column to `skills-map.yaml` + rows to `field-dispositions.yaml` — no pipeline change (Req 24 AC3, verified by the Kiro adapter landing second without redesign).

**Kiro adapter** emits `.kiro/agents/<agent>.json` + `<agent>-prompt.md`: `resources` built from the ambient manifest (id→path at emit time; `file://` vs `skill://` per the always-set delivery hints — the D1/D2 classification signals now generated, not inferred); server-level MCP grants retained (Kiro's grammar) with the canonical `toolSubset` remaining the checkable object for Req 18 AC2(c); `kiro:` fields carried through.

**CC adapter** emits `.claude/agents/<agent>.md` (frontmatter: name, description, explicit namespaced tool list = `toolSubset` expanded via `toolRef`; body: pass-through prose + rendered rules/cues/write-scope/run-context notes + per-agent ambient members per C11) and the generated `CLAUDE.md` (C11). Per-tool transform table (Req 11 AC1 — dispositions declared, sweep-7-checked):

| Kiro construct | CC disposition | Mechanism |
|---|---|---|
| MCP query syntax (`get_section({…})`) | transform | namespaced tool names via `toolRef` |
| `resources:` identity/always docs | transform | always-layer delivery (C11) |
| `resources:` corpus docs (`skill://`) | transform | MCP-served on-demand routing cues (per port-recon D1/D2 classes) |
| `skill://` skill refs | transform | CC Skill-tool form via `skillRef` + `skills-map` (Req 8 AC2) |
| `/knowledge` | transform | per-agent grep/Glob fallback note rendered from `knowledgeBases` (Req 11 AC1) |
| hotkeys (`keyboardShortcut`) | drop-with-reason | no CC agent-swap; Agent-Directory routing note instead |
| `welcomeMessage` | drop-with-reason | no CC greeting surface |
| `hooks.agentSpawn` | transform | behavioral pre-flight note in prompt |
| `toolsSettings.write.allowedPaths` | transform | rendered write-scope behavioral note (Req 11 AC3, Req 15 AC3) |
| server-level grants | transform | explicit per-agent namespaced subset from registry ∩ `toolSubset` (Req 11 AC4) |
| Kiro-runtime tool refs in routed docs | transform | per-runtime disposition rows (C2.3 `runtimeToolRefs`, Req 11 AC5) |

### C5 — Registry generator

*Traces to: Req 7, Req 20 AC4.*

**Introspection**: spawn each MCP server from its compiled entry (`node mcp-server/dist/index.js`, `node application-mcp-server/dist/index.js`, product-MCP entry) over stdio; MCP `initialize` + `tools/list`. This keys on **declarations** — available whenever the process boots, regardless of index state (the Product-MCP `indexed:false` case generates identically). Hand-curation and query-result sourcing are structurally absent: there is no authored input to this component.

**Output schema** (`canonical/registry/tool-registry.json`, deterministic: servers and tools sorted by name, no timestamps):

```json
{ "servers": [
    { "name": "designerpunk-docs", "entry": "mcp-server/dist/index.js",
      "tools": [ { "name": "find_docs", "description": "…", "inputSchemaHash": "sha256:…" } ] } ] }
```

`entry` makes the registry directly consumable as the **125 tool-boot smoke manifest** (boot each `entry`, assert `tools/list` responds and matches — declared-and-responds, never returns-data; 122 enumerates, 125 arms). The registry is committed and diff-guarded (Req 7 AC3): an MCP tool add/remove/rename/description change makes committed ≠ fresh. It is never injected ambiently (Req 7 AC4) — agents receive `toolSubset` + cues; a registry delta that no agent's subset covers surfaces via sweep 6's un-routed direction, adjudicated per the membership-vs-substance seam (Req 7 AC5).

### C6 — The regenerate-and-diff guard

*Traces to: Req 17, Req 20 AC1/AC2.*

**Algorithm**: (1) validate + regenerate everything into a temp tree (registry, skills trees, agents in the cutover ledger, always-layers, fixture, manifests, attribution sidecars); (2) `git diff --no-index` temp tree vs committed tree over the guarded surface set; (3) any delta → FAIL with the per-file diff in the job log. Coverage = every generated surface (Req 17 AC2); the guarded set is derived from the cutover ledger + substrate artifacts, and the coverage map (C12) makes the derivation inspectable.

**Fast no-op (deferred shape, DECIDED — input-closure lock)**: a committed `canonical/generated.lock` records `sha256(inputClosure)` and `sha256(outputs)`. Input closure = `canonical/** + skills/** + tools/agent-generator/** + mcp-server/src/** + application-mcp-server/src/** + <product-mcp src>/** + package.json + .kiro/hooks/complete-task.sh`. On every PR (unfiltered trigger): recompute both hashes; if both match the lock → exit green in seconds (no MCP boots, no generation). Either mismatch → full run (a hand-edited output mismatches the output hash → full run → loud diff failure; a corpus/MCP-source change mismatches the input hash → full run → regeneration required in the same PR). This satisfies Req 20 AC2 without path-filtering the trigger.

**Prove-it-bites** (Req 17 AC4): on a scratch branch, hand-edit one generated line in `.claude/agents/<first-cutover-agent>.md`; record the failing CI run in the substrate/cutover evidence before the guard is trusted.

### C7 — The canonical-vs-truth check

*Traces to: Req 18, Req 3 AC2, Req 5, Req 12 AC3.*

Runs alongside C6 (same workflow, its own required context), sharing the spawned-MCP session and registry. Five assertion classes; **pass/fail semantics per class**:

| Class | Assertion | FAIL when | Adjudicator |
|---|---|---|---|
| (a) governance-integrity | each `assert` entry: `id` resolves, heading exists (interim form), normalized section text satisfies every `mustContain`/`pattern` | predicate unsatisfied | substance: the entry's `owner` (Ada/Lina/…); the predicate itself is canonical content under C6 |
| (b) agent-routes | every `routes.agents` target ∈ generated agents for that runtime (cutover ledger), OR `disposition: not-yet-ported` | unlisted target with `resolves` disposition | route membership: the routing agent's seat |
| (c) per-runtime grants | every cue's tool ∈ that agent's `toolSubset` for that runtime (and the subset's server granted in the emitted config) | cue tool ∉ subset | membership: the seat; substance: declaring owner (Req 7 AC5) |
| (d) command-string currency | `runContext: this-repo` + `source: package.json` → script name ∈ `package.json` scripts; script-path commands (e.g. `complete-task.sh`) → file exists + executable; `consumer-repo`/`per-product` → exempt from script lookup, MUST carry the rendered annotation | script missing / annotation absent | the command's owning seat |
| (e) live-tool | every cue/subset tool ∈ fresh registry introspection (declarations); declared-but-index-empty PASSES (carve-out, all three servers) | tool not declared by the running server | Thurgood (infrastructure) |

Failure output is grouped by adjudicator with the flagged entry, the truth observed, and the canonical claim — the check reports; the owner rules (Req 18 AC3); resolution is always a PR (fix corpus, fix canonical source, or update the predicate — each a reviewable diff).

### C8 — The eight sweeps

*Traces to: Req 19; Req 8 AC1 (sweep 2); Req 12 AC1 (check 8); Req 10 AC4 (sweep-4 machinery); Req 11 AC2 (sweep 7).*

Each sweep: mechanical algorithm + a **prove-it-bites** demonstration (a known or induced positive, recorded before cutover trust — Req 19 AC2) + pass/fail. Flagged deltas are never auto-resolved: the sweep fails with an `ADJUDICATE:` block naming the owner per the membership-vs-substance seam; adjudications are recorded in the cutover sweep report (C10.2).

| # | Sweep | Algorithm | Prove-it-bites | Standing post-cutover? |
|---|---|---|---|---|
| 1 | reference-resolution | for every canonical `id`/section ref (law, routes, crossRefs): resolve via the running docs MCP; section = id-resolves AND verbatim-heading-exists (Req 3 AC2). Also asserts zero occurrences of retired tool names (`get_documentation_map`) and retired runtimes (`ts-node`) in canonical source + templates (Req 3 AC3, Req 5 AC2) | induce a bogus `id` on a scratch branch | YES |
| 2 | skills round-trip | both directions: every `skills/` dir has exactly one `skills-map` row; every row: canonical path exists AND per-target emitted path satisfies that runtime's **discovery contract** — CC: flat dir under `.claude/skills/`, `SKILL.md` present, frontmatter `name` + non-empty activation `description`; Kiro: emitted path exists and every generated `skill://` ref resolves to it. Transformed references held to the same bar (Req 8 AC2). An agent with `skills: []` → recorded PASS (`0 declared / 0 emitted`) | mangle one row's `cc` path | YES |
| 3 | resources double-load | per emitted Kiro config: normalize every resource URI to doc `id` (strip prefix + path root); FAIL on any duplicate across `file://`+`skill://` | **free positives**: `leonardo.json` Product-Token-Governance double-load; `kenya.json` `file://` line 30 + `skill://` line 42 | YES (property of every emission) |
| 4 | ambient set-difference | per agent: `designed = Task-9 block ∪ always-set` vs `generated = ambient-manifest`; both set-differences reported; every delta requires a recorded adjudication (`intentional-trim` \| `assessment-gap` \| `design-change`) in the sweep report. Same machinery runs Req 10 AC4's set-inclusion: each consumer's designed App/Product-MCP cues ⊆ generated catalog | Data's `start-up-tasks` drop (already adjudicated `b7c3c148` — re-run must show no-delta post-union) | YES |
| 5 | corrected-state-holds | assert at cutover: zero `.web.tsx` matches in canonical source (grep, count-asserted = 0); a single distinct concept-count value across `contract-system-reference` (extract all `\d+ (contract )?concepts` matches; assert one distinct integer) | temporarily re-introduce `.web.tsx` on a scratch branch | **NO** — pre-cutover gate only (Req 19 AC1's named exception; re-entry protection belongs to the class checks) |
| 6 | phantom-route / declaration-diff | bidirectional set-difference per runtime: cues∖declarations = phantom routes (FAIL); declarations∖(all agents' subsets ∪ deferred-discoverable set) = un-routed tools (ADJUDICATE, owner per Req 7 AC5). Declaration-keyed: index state never enters (carve-out is structural) | induce a cue naming a nonexistent tool | YES |
| 7 | config-field disposition | enumerate every key path in every `.kiro/agents/*.json` (source + emitted); each ∈ `field-dispositions.yaml` with disposition ∈ {carry, transform, drop-with-reason}; unknown key → FAIL | add a fake config key | YES |
| 8 | demotion-diff | `removals = baseline ∖ fresh ambient-manifest` (baseline: C10's committed pre-cutover capture; post-cutover: the base branch's committed manifest). Emitted as `demotion-delta.json`. For every removal: a cue with `replaces: <removed ref/artifact>` MUST exist in the generated output → else FAIL | remove a doc from a fixture agent's ambient without a `replaces` cue | YES (baseline rolls forward per merge) |

### C9 — Gate registration

*Traces to: Req 20; 125-A Req 2.3 (decided law).*

One workflow, `.github/workflows/agent-generator.yml`, triggered `on: pull_request` with **no path filter**. One job per check → one named status context per check (the open-set contract: named context + one protection-list entry each):

```
122-diff-guard · 122-canonical-vs-truth · 122-sweep-1-refs · 122-sweep-2-skills · 122-sweep-3-dupes
122-sweep-4-ambient · 122-sweep-5-corrected-state (pre-cutover window only) · 122-sweep-6-declarations
122-sweep-7-dispositions · 122-sweep-8-demotion
```

All jobs share one setup (checkout + node + npm cache + built MCP dist as a shared artifact) and the C6 no-op lock: when the input+output hashes match, every job early-exits green in seconds — the unfiltered trigger costs seconds on unrelated PRs, drawing acceptably on the ~10-min cold-cache headroom (125-A Req 6.3). Latency remedy, if ever needed, is caching/parallelism — never path-filtering.

**Count-asserted registration** (the Item-13 sweep precedent applied to ourselves): `tools/agent-generator/verify-gate-registration.sh` queries the branch-protection API and asserts the expected 122 context set is present, count-asserted (N recorded in the script). Run at each cutover and by the monthly governance health check — a required check that silently fell off the protection list is exactly the drift class this spec exists to kill. Sweep 5's context is registered for the cutover window and its removal after the last cutover is a recorded protection-list change (the ledger notes it), keeping the count assertion honest.

### C10 — Cutover procedure

*Traces to: Req 21, Req 22 AC3, Req 23, Req 19 AC3/AC5, Req 15.*

**C10.1 Per-agent sequence** (one agent per PR; PR-sized by construction):

1. **Content readiness**: carry the agent's input-of-record content into canonical frontmatter, traceably (`Source:` comments citing the round record — Req 21 AC2: Sparky 8+3, Kenya 4+4, Data JOB-1). Named gaps land as `gap:` command entries (Req 21 AC1). Owner confirms their carried content on the PR.
2. **Baseline capture**: commit `canonical/baselines/<agent>.ambient-baseline.json` = the pre-generation ambient set (Kiro `*.json` resources normalized to ids, ∪ existing CC port content refs where a port exists). For never-ported agents the baseline is the Kiro-side set — their FIRST generation is a cutover, same sequence, no lesser event (Req 21 AC5, Req 15 AC1).
3. **Generate** both targets on the task branch; commit outputs + manifests + attribution + demotion delta.
4. **Checks run** (C6–C8, on the PR, unfiltered). Every flagged delta gets a recorded owner adjudication.
5. **Sweep report committed**: `.kiro/specs/122-agent-generator/cutover/<agent>-cutover-report.md` — per-check result + CI run URL + adjudications (the Req 19 AC3 run-artifact; coverage-of-coverage audits this record, never verbal assertion).
6. **Stacy validation** (mandatory trigger — every first-generation cutover): her recorded entry in the cutover report (independent re-derivation + coverage-of-coverage over the report), operable only after C12's provisioning task completes.
7. **Acceptance signals measured** where pinned (C10.2); a missed shape is adjudicated (design-change vs defect) before merge (Req 23 AC5).
8. **PR → Peter merges** (governance-law carve-out applies — agent prompts/configs stay Peter-merged). Post-merge, the agent enters `canonical/cutover-ledger.yaml`; from that entry forward the generator is SSOT for that agent and its hand artifacts are diff-guarded surfaces.

**C10.2 Acceptance-signal measurement procedure** (Req 23 — pinned surfaces): all measurements read the emitted `ambient-manifest.json` per target, both targets asserted equal (Req 23 AC1):

- **Ada**: record `|per-agent members|` (expected ≈3: `personal-note`, `ai-collaboration-principles`, `token-governance`) AND `|union|`; the 27→~3 shrink is verified against the members count with the 27-entry `ada.json` baseline in the same report.
- **Lina**: generated lock-set == the pinned set from `per-agent-ambient-design.md` § Lina; assert zero `Component-Family-*` / `*-Standards` doc ids in her ambient manifest (the ~29→on-demand verification, mechanical).
- **Leonardo**: demotion-delta count ≈ the ~60% trim; check 8 green (cue per demotion); sweep 3 green on his emitted config (double-load resolved).
- **Fixture** (Req 23 AC4): first clean end-to-end pass recorded as the content-agnosticism evidence.

**C10.3 The fixture (deferred shape, DECIDED)**: `canonical/agents/_fixture.md` — a 9th pseudo-agent exercising **one member of every content class and transform disposition**: the universal pair; one law ref with predicate; each manifest-verdict rendering exercised across fixture variants is overkill — one verdict (`none-standing`); one command per run-context value + one `gap:` entry; one skill row (`skills/_fixture-skill/`); one doc route with heading, one agent route with `not-yet-ported`, one cue per MCP; `kiro:` fields covering carry / transform / drop-with-reason. Outputs emit to `canonical/_fixture-output/{kiro,cc}/` — committed and diff-guarded, physically outside the runtime agent dirs so no runtime ever loads it. It is a **standing pipeline test**: it sits inside C6's guarded surface, so every pipeline change re-runs it on every PR by construction (Req 21 AC4).

### C11 — OB-7: the CC always-layer delivery + CLAUDE.md retirement

*Traces to: Req 16, Req 9, Req 1 AC1/AC5, Req 15.*

**Two delivery lanes, one mechanism (the generator):**

1. **Locked always-set → generated `CLAUDE.md`.** Claude Code delivers `CLAUDE.md` to the main session and to subagents; `@`-imports are runtime-resolved references — structurally drift-free (Req 1 AC5's strong form). The generator emits `CLAUDE.md` with the always-set as `@`-import lines (id→path at emit time) plus a generated banner marking it a generated artifact. The **hand-maintained stopgap retires by being superseded**: the interim file's curated prose is replaced wholesale by generated content — "folded into generated output" per Req 16 AC2; exactly one always-layer mechanism (the generator) remains per runtime.
2. **Per-agent five-class members → the generated `.claude/agents/<agent>.md`.** CC has no per-agent runtime injection surface, so per-agent members ride in the agent file itself. **Primary form: runtime reference** (`@`-import lines in the agent file body); **fallback form: declared embed** (resolved section content embedded at generate time, attributed `op: resolve, mode: embed`, kept fresh by C6 — a corpus edit fails the unfiltered diff-guard until the same PR regenerates). The **probe-subagent test selects the form**: a probe task asks each generated CC agent to recite (a) the certainty-calibration rule and (b) a canary token planted in the generated always-layer; if `@`-imports demonstrably load in agent files, primary form ships; if not, the declared embed ships. Probe evidence is committed with the first CC cutover (Req 16 AC2's verification evidence either way).

**Union integrity across the two lanes**: the ambient manifest records members with their delivery lane; sweep 4 checks the union against the design regardless of lane, so splitting delivery cannot silently drop membership (Req 9 AC3).

**Retirement staging (record-first)**: (1) generated CC always-layer live for all cut-over agents + probe evidence committed; (2) a ballot per `.kiro/docs/ballots/README.md` proposing the swap — exact before→after: hand-maintained `CLAUDE.md` content replaced by generated output, the OB-7 tracking entry closed; (3) `RATIFIED` recorded before the swap PR merges (it changes an always-loaded governance delivery surface); (4) the ratified swap PR is the retirement record closing OB-7 (Req 16 AC3). Consumer-side CC delivery remains 123's (Req 16 AC4 — nothing in C11 touches consumer repos).

### C12 — Stacy's provisioning: coverage map + audit commands

*Traces to: Req 22, Req 19 AC3.*

**Coverage-map format (deferred shape, DECIDED)**: `canonical/coverage-map.yaml`, rows **generated**, check column **derived + authored**:

```yaml
- surface: ".claude/agents/ada.md"        # generated enumeration: every emitted artifact + every canonical file
  checks: [122-diff-guard, 122-canonical-vs-truth, 122-sweep-1-refs, 122-sweep-4-ambient]
- surface: "canonical/shared/skills-map.yaml"
  checks: [122-sweep-2-skills, 122-diff-guard]
- surface: "<any newly emitted artifact>"
  checks: []                              # ← blank row: generated surface with no guarding check — VISIBLE
```

The generator enumerates surfaces mechanically (so a new surface appears as a blank row automatically, never silently unlisted); each check declares its guarded globs in a manifest the map joins against. An emitted-but-contentless map is impossible to pass off: Stacy's audit asserts zero blank rows or an adjudicated exception per blank (Req 22 AC4(b)).

**Audit commands**: named in her canonical catalog alongside the platform seats' build slots (`npm run audit:mode-parity`, `npm run audit:theme-drift`, `npm run test:coverage`, `governance-check.sh`, `verify-gate-registration.sh`, plus the coverage-map audit itself). **tasks.md carries the provisioning task** with the AC "Stacy's audit commands are named AND her coverage map is emitted (zero-blank-row or adjudicated)"; until it completes, the §4a re-derivation leg is flagged non-operable in the cutover reports (Req 22 AC4(c)).

### C13 — Substrate phase gate closure evidence

*Traces to: Req 6.*

The gate passes when this bundle is committed (a substrate-gate completion doc referencing each item):

1. `canonical/registry/tool-registry.json` generated via C5, emitted through BOTH adapters' consumption paths.
2. `skills/` neutral root populated; `.claude/skills/**` and `.kiro/skills/**` both emitted from `skills-map.yaml`.
3. Diff-guard CI runs: one clean pass AND one failing run on an induced hand-edit (URLs recorded).
4. **A sweep-2 round-trip run over the relocated skills** (both targets, discovery-contract assertions, report committed) — the substrate's own crux content proven, not just moved.
5. The fixture's first clean end-to-end pass (C10.3) — substrate proven content-agnostic before real agents ride it.

No agent-prompt generation task starts before this doc exists (tasks.md sequencing will encode the gate as a blocking parent task).

---

## Correctness Properties

- **P1 Determinism**: identical inputs → byte-identical outputs (sorted collections; no timestamps; hashes not dates). Precondition for C6; violated determinism IS a C6 failure.
- **P2 Attribution totality**: every generated artifact's attribution spans are total, non-overlapping, each `op ∈ {resolve, render, passthrough}` (Req 1 AC3/AC4 — checked mechanically alongside C6).
- **P3 Union composition**: ∀ agent: ambient-manifest ⊇ always-set (Req 9; sweep 4 asserts it standing).
- **P4 No invented substance**: render templates contain field slots + fixed grammar only; template review is part of the design-feedback surface, and any new template text is a canonical-source PR (Req 1 AC3(c)).
- **P5 Reference resolvability**: every emitted reference (doc, tool, skill, agent) resolves per its target runtime's contract (C7 + sweeps 1/2/6 standing).

## Error Handling

- **MCP boot failure** during introspection/resolution → the check FAILS loud (never skips, never falls back to a cached registry); the registry is only ever written from a live `tools/list`.
- **Unresolvable id / missing heading** → fail with agent, field path, and the id/heading sought.
- **Adjudication-required states** (sweeps 4/6, truth-check flags) → the check fails with an `ADJUDICATE:` block naming the owner; resolution is always a recorded PR change (corpus fix, canonical fix, or predicate/adjudication entry) — no check ever auto-resolves or is overridden verbally.
- **Validation errors** (C1 rules 1–5) fail generation itself, which fails the diff-guard job — invalid canonical source cannot produce blessed output.

## Testing Strategy

- **Unit** (Jest, functional lane): resolver (id + interim section form), skills-map transforms (the `theming/styles` → `theming-styles` case as a named test), write-scope + run-context renderers (different `allowedPaths` → different note), union composition, attribution-totality checker, volatile-fact lint (positive + `volatile-ok` exemption).
- **Standing pipeline test**: the fixture (C10.3) under C6 on every PR.
- **Prove-it-bites ledger**: one recorded induced/known positive per check before cutover trust (table in C8; free positives: `leonardo.json` + `kenya.json` double-loads for sweep 3; Data's adjudicated `start-up-tasks` for sweep 4).
- **Probe-subagent test** (C11): certainty-calibration + canary recitation per generated CC agent; evidence committed with the first CC cutover.
- **Gate-registration verification**: count-asserted protection-list check at each cutover + monthly health check.

---

## Design Decisions (deferred shapes, decided here)

| # | Decision | Choice | One-line rationale |
|---|---|---|---|
| DD1 | Canonical source home | `canonical/` root: `agents/`, `shared/`, `registry/`, `baselines/`, `manifests/` | one discoverable root; outputs stay in runtime homes so the source/output boundary is a directory boundary |
| DD2 | Attribution mechanism (Req 1 AC4) | sidecar `<output>.attribution.json`, line-span grain | inline markers would pollute the operating context agents consume; sidecar stays mechanically checkable and diff-guarded |
| DD3 | Substance-predicate form (Req 18 AC2(a)) | `mustContain` normalized literal substrings; `pattern:` regex escape | literals are reviewable by domain owners; regex reserved for the cases literals can't express |
| DD4 | Fixture shape (Req 21 AC4) | 9th pseudo-agent `_fixture.md`; one member per content class + per disposition class; committed outputs in `canonical/_fixture-output/` | complete pipeline exercise; quarantined from runtime dirs; standing by construction (inside the diff-guard surface) |
| DD5 | Coverage-map format (Req 22 AC4(b)) | generated surface rows + declared check-glob join; blank `checks: []` = visible unguarded row | Stacy's blank-row visibility requirement made structural — new surfaces cannot be silently unlisted |
| DD6 | Check registration granularity | one workflow; one named job/context per check (10 contexts); shared setup + no-op lock | honors "each check is a required-check-compatible job" literally; shared no-op keeps 10 unfiltered contexts cheap |
| DD7 | Fast no-op detection (Req 20 AC2) | committed `generated.lock` (input-closure hash + output hash); both match → early-exit green | catches hand-edits (output hash) AND un-regenerated source changes (input hash) while unrelated PRs cost seconds |
| DD8 | Demotion baseline | committed per-agent pre-cutover capture; rolls forward to the base branch's committed manifest post-cutover | check 8 stays standing without a growing history file |
| DD9 | Generator runtime | TypeScript in `tools/agent-generator/`, run via `tsx` npm scripts | 118 contract: tsx is the sole runtime-TS mechanism; no ts-node anywhere (Req 5) |
| DD10 | Introspection + corpus resolution | spawn compiled MCP servers over stdio (`initialize` + `tools/list` / `get_section`) | "running MCP" made literal; declaration-keyed and index-agnostic by protocol shape |
| DD11 | Volatile-fact enforcement point (Req 12 AC6) | validate-stage heuristic lint on body prose; fail unless `volatile-ok` annotated | the validate stage is the only point that sees canonical prose before all guards go blind to it |
| DD12 | OB-7 delivery form | always-set via generated `CLAUDE.md` `@`-imports; per-agent members via probe-gated `@`-import-else-declared-embed | prefer runtime references (structural no-drift) everywhere the runtime resolves them; embed only where it can't, attributed and diff-guarded |
| DD13 | Req 13 coordination record | rule wording owner = Thurgood; two-ended `crossRef` (shared-catalog ↔ 125 map entry), sweep-1-resolved | the record is checkable at both ends, not asserted as intent |

---

## Requirements → Components traceability

| Req | Component(s) |
|---|---|
| 1 (composition pipeline, 3 ops, provenance) | C3, C3.3, P2, P4 |
| 2 (canonical structure per class) | C1 |
| 3 (id addressing, interim section form, find_docs) | C3.1, C7, C8 sweep 1 |
| 4 (WORKFLOW_RULES) | C2.4 |
| 5 (118 runtime contract) | DD9, C8 sweep 1, C1 routes |
| 6 (substrate phase gate) | C13, § Overview seam |
| 7 (tool registry) | C5, C8 sweep 6 |
| 8 (skills pipeline) | C2.2, C4, C8 sweep 2 |
| 9 (ambient union — decided law) | C3.2, C1 rule 5, C11, P3 |
| 10 (five-class generation, three MCPs) | C3.2, C1 routes/cues, C8 sweep 4 |
| 11 (per-tool transforms, dispositions) | C4, C2.3, C8 sweep 7 |
| 12 (replacement cues, run-context, shared tooling, volatile facts) | C1, C2.5, C8 check 8, DD11 |
| 13 (record-first rule) | C2.5, DD13 |
| 14 (OB-5 conventions routing) | C1 routes (steering-doc-authoring agents' canonical source) |
| 15 (OB-6 generated ports) | C4, C10.1 steps 2/8 |
| 16 (OB-7 always-layer + retirement) | C11 |
| 17 (diff-guard) | C6 |
| 18 (canonical-vs-truth, 5 classes) | C7 |
| 19 (eight checks, prove-it-bites, run-artifacts) | C8, C10.1 step 5 |
| 20 (gate registration, no-op, boot-smoke manifest) | C9, C6 no-op, C5 `entry` |
| 21 (content before catalog, fixture, per-agent PRs) | C10.1, C10.3 |
| 22 (roles, provisioning, coverage map) | C12, C10.1 step 6 |
| 23 (acceptance signals) | C10.2 |
| 24 (both adapters, CC-first, Cursor later) | C4, § Overview seam |
| 25 (negative scope) | no component builds a TOC, standing manifest, or divergence audit; OB-1 disposition per the ratification record (no design component either way — a bundled repoint would be a single task item) |

---

## Flagged for the design feedback round (requirements-level findings, not silently resolved)

1. **Req 1 AC1 × Req 16 AC1 tension (CC per-agent delivery).** "Never snapshotted into a self-contained prompt" and "the CC always-layer SHALL be generated into each agent's CC context" collide for CC subagents if `@`-imports don't load in agent files — the fallback (declared embed, C11/DD12) IS a generate-time snapshot, mitigated by attribution + the unfiltered diff-guard rather than structurally impossible. Design resolves it probe-first; reviewers should confirm the fallback's acceptability or tighten Req 1 AC1's wording to "no *unattributed, unguarded* snapshot."
2. **Req 23 AC1 arithmetic.** The union necessarily includes the locked always-set, so "27 → approximately 3" is true of the *per-agent member* count, not the union cardinality. C10.2 records both numbers; the AC's wording could name the member count explicitly.
3. **OB-1 (Req 25 AC2).** The scanner-repoint decision rides with the ratification record; this design carries no OB-1 component. If Peter's recorded decision bundles it, tasks.md adds a single task item; design is unaffected either way. Confirm the decision is recorded where Req 25 AC2 expects it.

---

*Design draft. Mechanisms only; obligations live in requirements.md. Pending the design feedback round per the Spec-Feedback-Protocol; tasks.md does not begin until this round closes.*
