# Design: 122 — Agent Generator

**Date**: 2026-07-05 (CC-model reframe applied 2026-07-07)
**Spec**: 122 — Agent Generator
**Status**: **RATIFIED (Peter, 2026-07-07)** — CC-model reframe ratified; both ratification items enacted: (1) the S-D3 closure fix (C6/DD7) confirmed as the operative precondition; (2) the reshaped Req 1 AC1 bright-line clarification **SANCTIONED and applied to requirements.md** (§ Flagged item 1 below records the proposal; the enacted text now lives in requirements.md Req 1 AC1). Design round 1: 5 APPROVE-WITH-AMENDMENTS + 2 CLEAR, no faithfulness break; the reframe encodes a platform FACT (Claude Code has no per-agent import channel — `cc-agent-model.md`, verified: 6/6 agents inline, 0 imports; issue #5914 closed-not-planned) + Peter's confirmed model (two delivery channels; two-level SSOT; Rosetta-framing for adapters), re-opening no ratified requirement. **The Sequential Formalization Gate advances to tasks.md.**
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

## Conceptual frame: two delivery channels, two-level SSOT, Rosetta-framed adapters

*(New with the 2026-07-07 CC-model reframe — the conceptual model the components below implement. Authored per Peter's confirmed framing 2026-07-07; grounded in `cc-agent-model.md`.)*

**Two delivery channels — the always-layer is its own channel, not a fold of the MCPs.** An agent's knowledge basis reaches it through two distinct channels, and the generator emits to both:

- **On-demand (queried):** the three MCPs (`designerpunk-docs`, `designerpunk-application`, `designerpunk-product`). The agent pulls this content by `id`/concept at runtime. This is progressive disclosure — content the agent *may* need.
- **Always-on ambient (injected):** the always-layer — content the agent *must always* have in context without asking (identity, reflexive principles, governance-as-law, role-specific always-content). This is a **separate channel from the MCPs**; the MCPs are not the whole knowledge basis, and the always-layer is not "just some docs the agent could have queried." The five-class ambient design (Req 9/Req 10) lives on this channel.

Each runtime realizes the always-on channel with its own native mechanism. The reframe's core correction: **Claude Code's native always-on mechanism is two-channel** (shared vs per-agent), because CC has no per-agent always-import surface — a platform fact (`cc-agent-model.md` facet 2, main-loop-verified), not a design preference.

**Two-level SSOT — the agent source points INTO the existing SSOTs, it does not contain them.** The canonical agent definition (`canonical/agents/<agent>.md`, C1) is the SSOT **for the agent** — its authored prose (formative / reflexive / role-specific) and its **references** (by `id`) into the corpus. It is NOT the SSOT for the corpus: Rosetta remains the SSOT for tokens, Stemma for components, the governance corpus for governance docs. The agent source *resolves* into those SSOTs at generate time; it never copies them as authored content. This is why a `resolve` op renders as a runtime-resolvable reference wherever the runtime can resolve one — the reference points at the real SSOT and re-derives on every regenerate. The per-agent inline embed (C11) is the single case where a runtime cannot resolve a reference and the generator must emit a *generated copy* of resolved SSOT content — and that copy is attributed (`op: resolve, mode: embed`) and diff-guarded against its SSOT root precisely so it stays a live projection of the SSOT, not a fork of it.

**Rosetta-framing for adapters — generation to a platform's native format is not the prohibited snapshot.** Each harness has a native agent-development model; the adapter (C4) knows that model and generates to it — exactly as Rosetta emits a CSS custom-property reference for web and an inlined Swift constant value for iOS from one token definition. Kiro's native always-mechanism is `inclusion: always` + per-agent config injection; Claude Code's is the two-channel format (shared → generated `CLAUDE.md` `@`-imports; per-agent → inline agent body). Neither emission is a hand-maintained snapshot: the CSS-var is a reference, the inlined Swift value is *generated-and-regenerated* from the token SSOT. The CC inline agent body is the Swift-value analogue — a generated projection in the platform's native per-agent format, regenerated from canonical source and guarded. Adding a harness = **characterize its native delivery model, then write its emitter** (the Rosetta extensibility contract, C4/Req 24) — not "emit generically and hope a fallback fits."

*Traces to: Req 1, Req 9, Req 10, Req 11, Req 16, Req 24.*

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
      assert:                          # materialized substance predicate (Req 18 AC2(a)); per-CLAIM keyed (A-D3)
        - claim: compose-is-the-render-target             # named claim → a failure names WHICH claim moved
          section: "Platform-Specific Implementation Rules"     # interim form: id + verbatim heading (Req 3 AC2)
          mustContain: ["Jetpack Compose"]               # claim-distinguishing tokens, not topic nouns (A-D1/DD3)
        - claim: tokens-are-mandatory
          section: "Platform-Specific Implementation Rules"
          pattern: "MUST use .*token"                    # regex escape — REQUIRES an `# asserts:` companion (A-D2)
          # asserts: platform rules mandate token usage (not merely mention tokens)
      owner: lina                      # substance adjudicator (Req 18 AC3)
    - id: token-quick-reference
      assert:
        - { claim: semantic-first, section: "Selection Priority", mustContain: ["semantic", "explicit approval"] }
      owner: ada
  groundTruthManifest:
    verdict: none-trim-stale-snapshots # none-standing | catalog-is-manifest | collapses-into-catalog | empty | none-trim-stale-snapshots
    trims:                             # each trim feeds a demotion cue (Req 12 AC1/AC2)
      - artifact: dist/android/DesignTokens.android.kt
        cue: { negative: "do NOT read dist/android/*.kt", tool: get_token_details, mcp: application,
               shape: per-theme-set,   # structured enum (K-D2) — NOT free-text note; a lint can scan `shape`
               note: "theme-varying tokens are a per-theme SET — the tool returns the set" }
        fires: unconditional           # (K-D1) negative fires whether or not this artifact is a baseline removal or current output —
                                       # covers ORPHANED artifacts (untracked, written by no script) as a standing negative
      - artifact: dist/ComponentTokens.android.kt
        cue: { negative: "do NOT read dist/*.android.kt", tool: get_component_full, mcp: application }
        fires: unconditional

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
standingFacts:                         # (K-D3) structured home for standing platform-reality facts a regeneration must not re-fabricate
  - { fact: "no in-repo iOS build/compile path exists", kind: platform-reality,
      guards-against: "a regeneration fabricating an in-repo iOS build command" }
  # Design decision (K-D3): a STRUCTURED field, not a `volatile-ok`-annotated body sentence.
  # Rationale: these facts are load-bearing NEGATIVES (their job is to prevent a future regeneration
  # from re-inventing a compile path). A body annotation only silences the volatile-fact lint; it does
  # not make the fact machine-addressable. A structured `standingFacts` entry is (a) diff-guarded content,
  # (b) available to render a hard-negative cue, and (c) inspectable — the flattening failure Kenya flagged
  # "lived exactly in trusted prose," so the fix is to move it OUT of prose. Volatile counts (151 .swift)
  # that are merely informational stay as tool-routed cues per rule 2's backstop, NOT here.

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
2. **Volatile-fact lint** (Req 12 AC6): a heuristic scan for {integer adjacent to inventory nouns (`components|tokens|docs|specs|concepts|sections|agents`), semver strings, "N of M" forms}. The scan covers **body prose AND authored frontmatter string values** — the free-text `cue:`, `note:`, `gap:`, `when:`, `reason:` fields (SP-D1 ≡ K-D2 ≡ L2): a volatile literal inside `cue: "…28 components…"` is exactly as drift-prone as one in the body, and body-only scanning left frontmatter strings unguarded between rule 2 and C7(d). A hit fails validation unless the line carries `<!-- volatile-ok: <reason> -->` (body) or a `volatile-ok: <reason>` inline annotation on the field (frontmatter). **This lint is a FLOOR, not "the enforcement point"** — it catches digit-form literals; it does NOT catch spelled-out counts ("twenty-eight components"), noun-first orderings ("components: 28 in the catalog"), or paraphrase. Named false-negative classes: {spelled-out integers, noun-first orders, values embedded in prose without an adjacent inventory noun}. The durable backstop is the **tool-routed-cue authoring rule** (DD11): a volatile count SHOULD be replaced by a routed tool cue (`get_component_catalog` returns the live count) rather than annotated, so the fact is fetched at runtime, not frozen in canonical source. Annotation is the escape hatch; tool-routing is the design intent.
3. **Predicate presence + per-claim keying + regex governance**: every `governanceAsLaw` entry MUST carry ≥1 `assert` and an `owner` (Req 18 AC2(a) cannot silently degrade). Each `assert` list member is a **named `claim`** with its own `section` + (`mustContain` | `pattern`), so a failing predicate names *which* claim moved — a single `mustContain` array over a doc carrying multiple co-located autonomy claims would pass if ANY one survived (A-D3). Any member using `pattern:` MUST carry an inline `# asserts: <plain-English claim>` companion; the validate stage rejects a `pattern:` without one and rejects trivially-permissive patterns (A-D2).
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
| `toolsSettings.write.allowedPaths` | transform | rendered write-scope **behavioral** note (Req 11 AC3, Req 15 AC3) — CC has no declarative per-agent write-path field (`cc-agent-model.md` facet 7: path rules are session-global, not per-agent), so the note is behavioral; a per-agent `PreToolUse` hook or `isolation: worktree` are the documented enforcement options, named in the note, not emitted as a declarative scope |
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

**Fast no-op (deferred shape, DECIDED — input-closure lock)**: a committed `canonical/generated.lock` records `sha256(inputClosure)` and `sha256(outputs)`. The input closure MUST be **complete over everything the pipeline reads** — any source that affects output but is absent from the closure lets a stale lock pass green with wrong outputs (the S-D3 gap). Input closure =

```
canonical/**  +  skills/**  +  tools/agent-generator/**
+ mcp-server/src/**  +  application-mcp-server/src/**  +  <product-mcp src>/**
+ governance/**            # resolve-by-id source: C7(a) mustContain reads live section text; C11 embeds resolved sections
+ .kiro/steering/**        # resolve-by-id source: the always-set identity docs C11 resolves into CLAUDE.md / agent files
+ package.json  +  .kiro/hooks/complete-task.sh
```

The two `resolve-by-id` roots (`governance/**`, `.kiro/steering/**`) are the load-bearing additions: a `mustContain` predicate (C7 class (a)) reads live section text and a demotion cue / always-layer member embeds resolved section content (C11 `op: resolve, mode: embed`), so an edit to a resolved-and-embedded section changes the output **without touching any other closure root**. Absent these roots, both hashes still match the lock, the job early-exits green, and the embedded content silently stales — precisely the drift class C11's "kept fresh by C6" promises to catch. The rule is general: **every source root the resolver reads by `id` is a closure root** (embed-span content-hashing was considered as the alternative — hash only the resolved spans rather than the whole source root — and rejected: it re-implements resolution inside the lock, drifts from the resolver, and the whole-root closure is strictly simpler and cannot under-cover a span; the cost is full runs on unrelated governance-doc edits, acceptable against the seconds-per-PR budget in C9).

On every PR (unfiltered trigger): recompute both hashes; if both match the lock → exit green in seconds (no MCP boots, no generation). Either mismatch → full run (a hand-edited output mismatches the output hash → full run → loud diff failure; a corpus/MCP-source/governance-source change mismatches the input hash → full run → regeneration required in the same PR). This satisfies Req 20 AC2 without path-filtering the trigger.

> **Operative note (S-D3/S-D6) — what makes CC per-agent inline non-drifting:** the CC per-agent members are delivered as **generated inline content** in the agent body (C11 lane 2 — CC has no per-agent reference channel). That inline content is only "generation, not a snapshot" (§ Rosetta-framing; the Req 1 AC1 clarification) **if this closure fix holds**: the input closure must include the inline content's resolve-by-id source (`governance/**` + `.kiro/steering/**`), so a source edit fails the diff-guard until the same PR regenerates the inline. Inline content guarded by a lock that omits its source is generated-but-**unguarded** — a self-contained snapshot the guard cannot prove it re-derives, i.e. exactly what the clarified Req 1 AC1 still forbids. The attribution manifest (C3.3) makes the inline non-silent (marks which spans are generated); the closure completeness is what makes the diff-guard actually bite. Both are load-bearing; neither substitutes for the other. (The shared always-set on the CLAUDE.md lane is a live reference and needs no such guard — it cannot drift by construction.)

**Prove-it-bites** (Req 17 AC4) — **two forms, both recorded before the guard is trusted**:
1. **Hand-edit form** (catches the output-hash leg): on a scratch branch, hand-edit one generated line in `.claude/agents/<first-cutover-agent>.md`; assert the diff-guard FAILs. Records that a hand-edited output is caught.
2. **Edit-an-embedded-section form** (catches the closure-completeness leg — the S-D3 prove-it-bites): on a scratch branch, edit one embedded governance section under `governance/**` (or one embedded identity doc under `.kiro/steering/**`) **without touching any other closure root**; assert the no-op lock forces a full run and the diff-guard FAILs on the re-derived (now-stale) embed. If it exits green, the closure is incomplete — this test is the standing proof that the resolve-by-id roots are actually in the closure.

### C7 — The canonical-vs-truth check

*Traces to: Req 18, Req 3 AC2, Req 5, Req 12 AC3.*

Runs alongside C6 (same workflow, its own required context), sharing the spawned-MCP session and registry. Five assertion classes; **pass/fail semantics per class**:

| Class | Assertion | FAIL when | Adjudicator |
|---|---|---|---|
| (a) governance-integrity | each `assert` entry: `id` resolves, heading exists (interim form), normalized section text satisfies every `mustContain`/`pattern` | predicate unsatisfied | substance: the entry's `owner` (Ada/Lina/…); the predicate itself is canonical content under C6 |
| (b) agent-routes | every `routes.agents` target ∈ generated agents for that runtime (cutover ledger), OR `disposition: not-yet-ported` | unlisted target with `resolves` disposition | route membership: the routing agent's seat |
| (c) per-runtime grants | every cue's tool ∈ that agent's `toolSubset` for that runtime **AND every server named by that `toolSubset` appears in the emitted config's grant list** | cue tool ∉ subset **OR `toolSubset` names a server absent from the emitted grant list** (L1, held firm — the server-grant leg is a first-class FAIL, not a prose aside: a subset can be faithful onto a config that cannot reach the server; Lina's live `lina.json` is the exact bug — routes to `@designerpunk-application` tools with no application grant) | membership: the seat; substance: declaring owner (Req 7 AC5) |
| (d) command-string currency | `runContext: this-repo` + `source: package.json` → script name ∈ `package.json` scripts; script-path commands (e.g. `complete-task.sh`) → file exists + executable; `consumer-repo`/`per-product` → exempt from script lookup, MUST carry the rendered annotation. The annotation check fires on **empty-string, not only missing-key** (D-A5): `annotation: ""` FAILs identically to an absent `annotation` key — a present-but-empty annotation is not a rendered annotation | script missing / annotation absent-or-empty | the command's owning seat |
| (e) live-tool | every cue/subset tool ∈ fresh registry introspection (declarations); declared-but-index-empty PASSES (carve-out, all three servers) | tool not declared by the running server | Thurgood (infrastructure) |

**Predicate governance for class (a)** — closing the two named traps (DD3):

- **Claim-distinguishing tokens (A-D1):** a `mustContain` of topic-noun literals (`"token"`, `"component"`) proves only that the *words survived*, not that the *governing claim* did — a hollow pass. DD3's rule: predicates SHOULD carry claim-distinguishing tokens (`"explicit approval"`, `"require"`, `"MUST"`) that a paraphrase or a gutting edit would move, not topic nouns that survive any rewrite. This is guidance, not a hard lint (semantic judgment is why `pattern:` exists and why an `owner` adjudicates); owner-adjudication is the **backstop, not a substitute** for a well-chosen predicate.
- **`pattern:` escape is governed, not free (A-D2):** a permissive regex (`.*`) satisfies the AC while asserting nothing, and owners can't review raw regex. Two mechanisms: (1) every `pattern:` MUST carry an inline **`# asserts: <plain-English claim>`** companion — the owner reviews the plain-English claim, not the regex; (2) a **validate-stage permissive-pattern lint** rejects trivially-permissive patterns (`.*`, `.+`, empty, or patterns matching the empty string). A `pattern:` without an `# asserts:` companion, or one the lint flags as trivially-permissive, FAILs validation — the silent-degrade hole the regex escape reopened is closed at the only stage that sees the pattern before the guards trust it.

**Annotation-correctness adjudicator (S-D5.1):** for a `consumer-repo`/`per-product` command, class (d) mechanically checks the annotation is *present and non-empty* (D-A5), but *correctness* of the annotation text (does the gap description still match reality?) is a **seat judgment owned by the command's owning seat, triggered at that seat's cutover review** — named here so it is not left implicit. Presence is mechanical; correctness is adjudicated. There is no silent third state where an annotation is present but unreviewed for correctness.

**`knowledgeBases` glob currency (D-A3 — a new uncovered drift class, homed in C7):** a stale `knowledgeBases` glob (C1) renders a `/knowledge` fallback note pointing agents at nothing — a silent-drift class no existing class caught. C7 gains a **glob-resolves assertion** (its home chosen here over a sweep because C7 already reads live filesystem state for class (d), so this is one more filesystem-currency check in the same session, not a new machinery): every `knowledgeBases[].globs` entry MUST resolve to ≥1 match OR carry an adjudicated `expected-empty: <reason>`. FAIL when a glob resolves to zero matches and is not annotated `expected-empty`. Adjudicator: Thurgood (infrastructure), same as class (e).

Failure output is grouped by adjudicator with the flagged entry, the truth observed, and the canonical claim — the check reports; the owner rules (Req 18 AC3); resolution is always a PR (fix corpus, fix canonical source, or update the predicate — each a reviewable diff).

### C8 — The eight sweeps

*Traces to: Req 19; Req 8 AC1 (sweep 2); Req 12 AC1 (check 8); Req 10 AC4 (sweep-4 machinery); Req 11 AC2 (sweep 7).*

Each sweep: mechanical algorithm + a **prove-it-bites** demonstration (a known or induced positive, recorded before cutover trust — Req 19 AC2) + pass/fail. Flagged deltas are never auto-resolved: the sweep fails with an `ADJUDICATE:` block naming the owner per the membership-vs-substance seam; adjudications are recorded in the cutover sweep report (C10.2).

| # | Sweep | Algorithm | Prove-it-bites | Standing post-cutover? |
|---|---|---|---|---|
| 1 | reference-resolution | for every canonical `id`/section ref (law, routes, crossRefs): resolve via the running docs MCP; section = id-resolves AND verbatim-heading-exists (Req 3 AC2). Also asserts zero occurrences of retired tool names (`get_documentation_map`) and retired runtimes (`ts-node`) in canonical source + templates (Req 3 AC3, Req 5 AC2) | induce a bogus `id` on a scratch branch | YES |
| 2 | skills round-trip | both directions: every `skills/` dir has exactly one `skills-map` row; every row: canonical path exists AND per-target emitted path satisfies that runtime's **discovery contract** — CC: flat dir under `.claude/skills/`, `SKILL.md` present, frontmatter `name` + activation `description` **byte-equal to the canonical activation description** (D-A2 — CC discovery is description-DRIVEN, so "non-empty" is weaker than "intact"; a truncated/altered description silently degrades activation); Kiro: emitted path exists and every generated `skill://` ref resolves to it. Transformed references held to the same bar (Req 8 AC2). An agent with `skills: []` → recorded PASS (`0 declared / 0 emitted`) | mangle one row's `cc` path | YES |
| 3 | resources double-load | per emitted Kiro config: normalize every resource URI to doc `id` (strip prefix + path root); FAIL on any duplicate across `file://`+`skill://` | **free positives**: `leonardo.json` Product-Token-Governance double-load; `kenya.json` `file://` line 30 + `skill://` line 42 | YES (property of every emission) |
| 4 | ambient set-difference | per agent: `designed = Task-9 block ∪ always-set` vs `generated = ambient-manifest`; both set-differences reported; every delta requires a recorded adjudication (`intentional-trim` \| `assessment-gap` \| `design-change`) in the sweep report. Same machinery runs Req 10 AC4's set-inclusion: each consumer's designed App/Product-MCP cues ⊆ generated catalog | Data's `start-up-tasks` drop (already adjudicated `b7c3c148` — re-run must show no-delta post-union) | YES |
| 5 | corrected-state-holds | assert at cutover: zero `.web.tsx` matches in canonical source (grep, count-asserted = 0); a single distinct concept-count value across `contract-system-reference` (extract all `\d+ (contract )?concepts` matches; assert one distinct integer) **AFTER excluding historical-context lines** (L3): the extractor skips lines matching `Originally\|historical\|migration\|source names` so a provenance/history sentence (Lina flagged live ones at `contract-system-reference` lines 49/113) does not false-positive the moment it is rephrased. Pinned to the current-catalog assertion, not every integer-adjacent-to-"concepts" occurrence | temporarily re-introduce `.web.tsx` on a scratch branch | **NO** — pre-cutover gate only (Req 19 AC1's named exception; re-entry protection belongs to the class checks) |
| 6 | phantom-route / declaration-diff | bidirectional set-difference per runtime: cues∖declarations = phantom routes (FAIL); declarations∖(all agents' subsets ∪ deferred-discoverable set) = un-routed tools (ADJUDICATE, owner per Req 7 AC5). Declaration-keyed: index state never enters (carve-out is structural) | induce a cue naming a nonexistent tool | YES |
| 7 | config-field disposition | enumerate every key path in every `.kiro/agents/*.json` (source + emitted); each ∈ `field-dispositions.yaml` with disposition ∈ {carry, transform, drop-with-reason}; unknown key → FAIL | add a fake config key | YES |
| 8 | demotion-diff | `removals = baseline ∖ fresh ambient-manifest` (baseline: C10's committed pre-cutover capture; post-cutover: the base branch's committed manifest). **The baseline + ambient-manifest namespace includes artifact-path members, not doc-ids only** (D-A1 held firm): trims key on file-path artifacts (`dist/android/*.kt`) while removals historically keyed on doc-id membership — if the baseline normalized to doc-ids only, a platform seat's most important cue (its artifact demotion) would be asserted but never verified. Both membership kinds (doc-id AND artifact-path) participate in the set-difference. Emitted as `demotion-delta.json`. For every removal: a cue with `replaces: <removed ref/artifact>` MUST exist in the generated output → else FAIL. Additionally, a `trims` entry with `fires: unconditional` (C1) emits its negative cue **whether or not the artifact is in the removal set** — covering orphaned artifacts (K-D1: untracked, written by no script, neither a baseline removal nor a current output) as a standing negative decoupled from the demotion-diff | remove a doc from a fixture agent's ambient without a `replaces` cue | YES (baseline rolls forward per merge) |

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

1. **Content readiness**: carry the agent's input-of-record content into canonical frontmatter, traceably (`Source:` comments citing the round record — Req 21 AC2: Sparky 8+3, Kenya 4+4, Data JOB-1). Named gaps land as `gap:` command entries (Req 21 AC1). **Inter-agent routes are migrated from body PROSE into structured `routes.agents` frontmatter at this step** (LE-D1, held firm): today an agent's handoff routes ("for a component question, see Lina") live as body prose, which pass-through would carry verbatim — escaping the C7(b) not-yet-ported check entirely, so the LE1 not-yet-ported mechanism would never bite on its own live instance. Migrating them into `routes.agents` (with `disposition: resolves | not-yet-ported`) at cutover is what makes them checkable. Owner confirms their carried content on the PR.
2. **Baseline capture**: commit `canonical/baselines/<agent>.ambient-baseline.json` = the pre-generation ambient set (Kiro `*.json` resources normalized to ids **plus artifact-path members** — see sweep 8's namespace, D-A1 — ∪ existing CC port content refs where a port exists). **For never-ported / partial agents the baseline degrades explicitly to the Kiro-side set** (D-A4): the first-CC-generation demotion delta is computed against the Kiro-side baseline, so the trims driving the demotion cues register as removals rather than silently vanishing (a baseline computed against an empty/CC-only set would show zero removals and the cues would never fire). Their FIRST generation is a cutover, same sequence, no lesser event (Req 21 AC5, Req 15 AC1).
3. **Generate** both targets on the task branch; commit outputs + manifests + attribution + demotion delta.
4. **Checks run** (C6–C8, on the PR, unfiltered). Every flagged delta gets a recorded owner adjudication.
5. **Sweep report committed**: `.kiro/specs/122-agent-generator/cutover/<agent>-cutover-report.md` — per-check result + CI run URL + adjudications (the Req 19 AC3 run-artifact; coverage-of-coverage audits this record, never verbal assertion).
6. **Stacy validation** (mandatory trigger — every first-generation cutover): her recorded entry in the cutover report (independent re-derivation + coverage-of-coverage over the report). C12's provisioning is now **gated into the C13 substrate closure** (item 6), so this leg is operable from the first cutover forward. As a safety against any edge case where provisioning is nonetheless incomplete, the cutover report's Stacy-leg renders **`NON-OPERABLE — C12 pending` as committed text** (S-D4) rather than an absent section — an absent section reads identical to an overlooked one, the same silent-vs-visible distinction C12's blank rows solve. A rendered non-operable line is a visible, adjudicable state; an omitted leg is not.
7. **Acceptance signals measured** where pinned (C10.2); a missed shape is adjudicated (design-change vs defect) before merge (Req 23 AC5).
8. **PR → Peter merges** (governance-law carve-out applies — agent prompts/configs stay Peter-merged). Post-merge, the agent enters `canonical/cutover-ledger.yaml`; from that entry forward the generator is SSOT for that agent and its hand artifacts are diff-guarded surfaces.

**C10.2 Acceptance-signal measurement procedure** (Req 23 — pinned surfaces): all measurements read the emitted `ambient-manifest.json` per target, both targets asserted equal (Req 23 AC1). **Every signal row records BOTH numbers — per-agent member count AND union cardinality — and the observed baseline is read from the committed config at cutover, not a design-time constant** (A-D5, LE-D4): a single number is ambiguous because the union always includes the locked always-set, so a "shrink" stated against the union understates the trim while one stated against members overstates it. The observed-baseline-at-cutover discipline also prevents a stale design-time figure from being asserted (the live `ada.json` baseline is **30**, correcting the earlier **27**).

- **Ada**: record the observed baseline **from the committed `ada.json` at cutover (= 30 resources, not the stale 27)**; record `|per-agent members|` AND `|union|`. Of her expected members (~`personal-note`, `ai-collaboration-principles`, `token-governance`), ~2 are always-set docs, so her per-agent-**member** count is ~1 once the union is factored out — the report states member and union crisply rather than a bare "~3." The shrink is asserted as a **delta** against the members count, with the 30-entry baseline in the same report.
- **Lina**: generated lock-set == the pinned set from `per-agent-ambient-design.md` § Lina; assert zero `Component-Family-*` / `*-Standards` doc ids in her ambient manifest (the ~29→on-demand verification, mechanical). Both numbers (member + union) recorded.
- **Leonardo**: demotion-delta count ≈ the ~60% trim, recorded as a **per-agent-member** figure (not union — LE-D4); check 8 green (cue per demotion); sweep 3 green on his emitted config (double-load resolved).
- **Sparky (dev-server absence, SP-D2):** the no-dev-server negative (`build:watch` is tsc-only, no dev server) is recorded in his acceptance signals as **intentional-and-unguarded** — a decision, not an oversight. Nothing asserts the absence *stays* true, and that is by design; marking it intentional-and-unguarded distinguishes it from a coverage gap so a later reviewer does not read the missing guard as an omission.
- **Fixture** (Req 23 AC4): first clean end-to-end pass recorded as the content-agnosticism evidence.

**C10.3 The fixture (deferred shape, DECIDED)**: `canonical/agents/_fixture.md` — a 9th pseudo-agent exercising **one member of every content class and transform disposition**: the universal pair; one law ref with predicate; each manifest-verdict rendering exercised across fixture variants is overkill — one verdict (`none-standing`); one command per run-context value + one `gap:` entry; one skill row (`skills/_fixture-skill/`); one doc route with heading, one agent route with `not-yet-ported`, one cue per MCP; `kiro:` fields covering carry / transform / drop-with-reason. Outputs emit to `canonical/_fixture-output/{kiro,cc}/` — committed and diff-guarded, physically outside the runtime agent dirs so no runtime ever loads it. It is a **standing pipeline test**: it sits inside C6's guarded surface, so every pipeline change re-runs it on every PR by construction (Req 21 AC4).

### C11 — OB-7: the CC always-layer delivery + CLAUDE.md retirement

*Traces to: Req 16, Req 9, Req 1 AC1/AC5, Req 15.*

**Two delivery lanes, one mechanism (the generator):**

1. **Locked always-set → generated `CLAUDE.md`.** Claude Code delivers `CLAUDE.md` to the main session and to subagents; `@`-imports are runtime-resolved references — structurally drift-free (Req 1 AC5's strong form). The generator emits `CLAUDE.md` with the always-set as `@`-import lines (id→path at emit time) plus a generated banner marking it a generated artifact. The **hand-maintained stopgap retires by being superseded**: the interim file's curated prose is replaced wholesale by generated content — "folded into generated output" per Req 16 AC2; exactly one always-layer mechanism (the generator) remains per runtime.
2. **Per-agent five-class members → inline in the generated `.claude/agents/<agent>.md` body.** CC has **no per-agent runtime injection surface and no per-agent import channel** — `@`-imports resolve only inside `CLAUDE.md`, never inside an agent file body (`cc-agent-model.md`; issue #5914 closed-not-planned; main-loop-verified 2026-07-07: 6/6 current ports inline, 0 imports). So per-agent members are **emitted inline into the agent body** — a generated projection in CC's *native per-agent format* (the inlined-Swift-value analogue from § Rosetta-framing), regenerated from canonical source and **guarded**: the inline content is resolved-by-id corpus/steering text, so a source edit fails the unfiltered diff-guard until the same PR regenerates, **given C6/DD7's closure fix** (governance + steering in the input closure — the precondition that keeps inline content from drifting; S-D3/S-D6). Generated-vs-passthrough spans are mapped by the attribution manifest (C3.3), so the hybrid agent file (authored prose + generated inline) stays inspectable. **There is no probe and no fallback selection** — the delivery form is not a runtime unknown, it is a known platform constraint.

   **LE-D2 realized by fact, not overridden.** Leonardo recorded that if `@`-imports demonstrably do NOT load in agent files, the honest move is to *drop the probe* and ship generated-inline-with-guard, documented. The CC characterization establishes exactly that (per-agent imports do not load; the feature request was closed not-planned; verified against our own ports), so his branch is **reached by fact**: there is nothing to probe, because the reference form is *unavailable* for per-agent content on CC — inline is CC's native per-agent format, not a degraded fallback. The reference form is not lost; it survives for the **shared** always-set (lane 1, `CLAUDE.md`), where `@`-imports do resolve. This is the two-channel native format, not a compromise.

   **Scheduling constraint (L5, retained for a general reason):** the first CC cutover MUST NOT be the highest-risk agent — sequence a low-blast-radius agent (or the fixture, C10.3) first so the generated-inline emission is validated end-to-end on a cheap surface before a load-bearing agent rides it. (The rationale is no longer "the probe decides the form" — there is no probe — but the ordering value survives: prove the emission before it matters. Enforced in C10.1's sequencing.)

**Union integrity across the two lanes**: the ambient manifest records members with their delivery lane; sweep 4 checks the union against the design regardless of lane, so splitting delivery cannot silently drop membership (Req 9 AC3).

**Retirement staging (record-first)**: (1) generated CC always-layer live for all cut-over agents (both lanes emitting; no probe gate); (2) a ballot per `.kiro/docs/ballots/README.md` proposing the swap — exact before→after: hand-maintained `CLAUDE.md` content replaced by generated output, the OB-7 tracking entry closed; (3) `RATIFIED` recorded before the swap PR merges (it changes an always-loaded governance delivery surface); (4) the ratified swap PR is the retirement record closing OB-7 (Req 16 AC3). Consumer-side CC delivery remains 123's (Req 16 AC4 — nothing in C11 touches consumer repos).

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

The generator enumerates surfaces mechanically (so a new surface appears as a blank row automatically, never silently unlisted). **Each check's guarded-glob manifest is DERIVED from the check's actual guarded-set computation, not hand-declared** (S-D1): C6's guarded set is already "derived from the cutover ledger + substrate artifacts," and the coverage map joins against THAT derivation. A hand-declared glob the check author writes independently can drift from what the check really does — an over-broad glob (`checks: [122-diff-guard]` matching `**`) would make every surface look guarded and produce zero blank rows, so the map would pass while guarding nothing *specifically*. Deriving the manifest from the real computation makes the join trustworthy on both sides; it names a format and location: the manifest is a generated artifact emitted next to the coverage map, keyed by check context, its globs computed by the same code the check runs (not a second declaration that can drift). An emitted-but-contentless map is impossible to pass off: Stacy's audit asserts zero blank rows or an adjudicated exception per blank (Req 22 AC4(b)).

**Audit commands** (S-D2 — named AND run-context-classed, not gestured): named in her canonical catalog alongside the platform seats' build slots. The coverage-map audit — the one audit C12 *invents* and previously the one with no slot — is named as a real script **`npm run audit:coverage-map`**, added by C12's provisioning task. The remaining slots carry explicit run-context so a not-yet-existing command does not read as a live in-repo command:

| Command | Run-context | Status |
|---|---|---|
| `npm run audit:coverage-map` | this-repo | **provisioned by C12** (new script) |
| `npm run test:coverage` | this-repo | confirmed live in `package.json` |
| `governance-check.sh` | this-repo | confirmed live (script path; C7(d) exists+executable) |
| `verify-gate-registration.sh` | this-repo | provisioned by C9 (script path) |
| `npm run audit:mode-parity` | this-repo | **VERIFIED PRESENT** (`package.json:125`, main-loop grep 2026-07-06 — corrects the round's "unconfirmed" re-class): live `this-repo` command, C7(d) currency check applies normally |
| `npm run audit:theme-drift` | this-repo | **VERIFIED PRESENT** (`package.json:126`, same verification): live `this-repo` command, C7(d) applies normally |

Both audit commands were verified present in `package.json` (main loop, 2026-07-06) after the round marked them unconfirmed — the S-D2 re-class is REVERSED for these two; the still-unprovisioned slot is `npm run audit:coverage-map` (the one C12 invents), which the provisioning task creates. **tasks.md carries the provisioning task** with the AC "Stacy's audit commands are named AND runnable-or-gap-annotated AND her coverage map is emitted (zero-blank-row or adjudicated)." Provisioning is **gated into the C13 substrate closure** (item 6), so the §4a re-derivation leg is operable from the first cutover; the cutover report still renders `NON-OPERABLE — C12 pending` as committed text as an edge-case safety (Req 22 AC4(c), S-D4).

### C13 — Substrate phase gate closure evidence

*Traces to: Req 6.*

The gate passes when this bundle is committed (a substrate-gate completion doc referencing each item):

1. `canonical/registry/tool-registry.json` generated via C5, emitted through BOTH adapters' consumption paths.
2. `skills/` neutral root populated; `.claude/skills/**` and `.kiro/skills/**` both emitted from `skills-map.yaml`.
3. Diff-guard CI runs: one clean pass AND one failing run on an induced hand-edit (URLs recorded), **plus the edit-an-embedded-section prove-it-bites run** (C6: edit a `governance/**` or `.kiro/steering/**` section with no other closure-root change, assert the no-op lock forces a full run and the diff-guard fails — the standing proof the resolve-by-id roots are in the closure, S-D3).
4. **A sweep-2 round-trip run over the relocated skills** (both targets, discovery-contract assertions, report committed) — the substrate's own crux content proven, not just moved.
5. The fixture's first clean end-to-end pass (C10.3) — substrate proven content-agnostic before real agents ride it.
6. **C12's provisioning complete** (coverage map emitted zero-blank-row-or-adjudicated + audit commands named/runnable) — **gated INTO the substrate closure** (L4 ≡ K-D4 ≡ S-D4). Decision: **gate it**, not defer-and-back-fill. Rationale: the first cutover in this spec's sequence is a *debut* seat (iOS never-ported, per Kenya; a never-ported agent, per Lina) and both debut reviewers explicitly asked not to have a debut seat eat the non-operable-Stacy window; provisioning is substrate (agent-content-independent) and belongs in the substrate gate by nature. The alternative (defer + explicit back-fill rule) was considered and rejected here because it trades a one-time substrate cost for a per-cutover flagged-non-operable state on exactly the riskiest (first) cutovers. Stacy's re-derivation leg is therefore operable from the first cutover forward.

No agent-prompt generation task starts before this doc exists (tasks.md sequencing will encode the gate as a blocking parent task; C12's provisioning is now inside that blocking parent).

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
| DD3 | Substance-predicate form (Req 18 AC2(a)) | `mustContain` normalized literal substrings + a **claim-distinguishing token** guidance rule; `pattern:` regex escape gated by an inline `# asserts:` plain-English companion + a permissive-pattern lint | literals are reviewable by domain owners; regex reserved for cases literals can't express; the two named traps (hollow literals, ungoverned regex) are closed by guidance + lint rather than left open |
| DD4 | Fixture shape (Req 21 AC4) | 9th pseudo-agent `_fixture.md`; one member per content class + per disposition class; committed outputs in `canonical/_fixture-output/` | complete pipeline exercise; quarantined from runtime dirs; standing by construction (inside the diff-guard surface) |
| DD5 | Coverage-map format (Req 22 AC4(b)) | generated surface rows + check-glob join where the glob manifest is **derived from each check's real guarded-set computation** (S-D1), not hand-declared; blank `checks: []` = visible unguarded row | Stacy's blank-row visibility made structural — new surfaces cannot be silently unlisted, and the join cannot pass while guarding nothing specifically because both sides derive from the same computation |
| DD6 | Check registration granularity | one workflow; one named job/context per check (10 contexts); shared setup + no-op lock | honors "each check is a required-check-compatible job" literally; shared no-op keeps 10 unfiltered contexts cheap |
| DD7 | Fast no-op detection (Req 20 AC2) | committed `generated.lock` (input-closure hash + output hash); both match → early-exit green. Closure is complete over every source the resolver reads by `id` — including `governance/**` and `.kiro/steering/**` (the resolve-by-id roots, S-D3). Output hash covers the **sorted `(path, content-hash)` pairs** over the emitted set, so an added/dropped surface breaks the lock, not only a changed byte (S-D5) | catches hand-edits (output hash) AND un-regenerated source changes incl. embedded-section edits (input hash) while unrelated PRs cost seconds; whole-root closure chosen over embed-span hashing (simpler, cannot under-cover a span) |
| DD8 | Demotion baseline | committed per-agent pre-cutover capture; rolls forward to the base branch's committed manifest post-cutover | check 8 stays standing without a growing history file |
| DD9 | Generator runtime | TypeScript in `tools/agent-generator/`, run via `tsx` npm scripts | 118 contract: tsx is the sole runtime-TS mechanism; no ts-node anywhere (Req 5) |
| DD10 | Introspection + corpus resolution | spawn compiled MCP servers over stdio (`initialize` + `tools/list` / `get_section`) | "running MCP" made literal; declaration-keyed and index-agnostic by protocol shape |
| DD11 | Volatile-fact enforcement point (Req 12 AC6) | validate-stage heuristic lint on body prose; fail unless `volatile-ok` annotated | the validate stage is the only point that sees canonical prose before all guards go blind to it |
| DD12 | OB-7 delivery form (CC) | shared always-set → generated `CLAUDE.md` `@`-imports (runtime reference, drift-free); per-agent members → generated inline agent body (CC's native per-agent format, guarded by the closure-complete diff-guard) | CC has **no per-agent import channel** (`cc-agent-model.md`; #5914 closed-not-planned; verified 6/6 ports inline) — inline is the native format, not a fallback; the reference form survives for the shared lane. No probe: the form is a known platform constraint, not a runtime unknown |
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

1. **Req 1 AC1 × Req 16 AC1 tension (CC per-agent delivery) — RESOLVED by platform fact + Peter's Rosetta framing.** The design round flagged a collision: "never snapshotted into a self-contained prompt" (Req 1 AC1) vs "the CC always-layer SHALL be generated into each agent's CC context" (Req 16), *if* `@`-imports don't load in agent files. The CC characterization settles the *if*: they don't — CC has **no per-agent import channel** (`cc-agent-model.md`; issue #5914 closed-not-planned; verified 6/6 ports inline). So delivery splits into CC's two native channels (C11): the **shared** always-set rides `CLAUDE.md` `@`-imports (a live reference — the invariant is **fully intact** here), and the **per-agent** members are generated inline in the agent body (CC's native per-agent format, guarded by the closure-complete diff-guard). Under Peter's Rosetta framing (§ Rosetta-framing), the per-agent inline is *generation to a platform's native format* — the same category as Rosetta emitting an inlined Swift value where the platform has no reference mechanism — not the hand-maintained snapshot Req 1 AC1 exists to forbid. The round's 5–0 vote to bless the guarded inline stands; the fact **sharpens** it (no probe, no "fallback," invariant preserved outright on the shared lane). Stacy's S-D3/S-D6 closure fix is what keeps the per-agent inline non-drifting and is landed (C6/DD7). One action still requires Peter: sanctioning the AC1 clarification below — now scoped to per-agent inline only, framed as a bright category line, not a broad license.

   > **ENACTED (Peter, 2026-07-07) — applied to requirements.md Req 1 AC1. PROPOSED ERRATUM as originally recorded:**
   > **(historical proposal — for Peter's sanction at design ratification (does NOT edit requirements.md; recorded here per the ratified-text change protocol).**
   >
   > **Target:** requirements.md, Requirement 1, Acceptance Criterion 1 (the "self-contained prompt" prohibition).
   > **Recommendation:** 5–0 (design round) + the CC platform fact; advisory — Peter's sanction is required to amend ratified text.
   > **Change (verbatim proposed wording):**
   > - **FROM:** the always-layer content SHALL NOT be snapshotted into a self-contained prompt.
   > - **TO:** the always-layer content SHALL NOT be **hand-maintained, or generated-but-unguarded,** in any prompt. Generating always-layer content into a harness's *native per-agent format* — including inlining resolved content where the harness provides no per-agent reference mechanism (e.g. Claude Code agent files) — is **generation, not a snapshot**, provided it is (a) generated from canonical source and never hand-edited (a hand-edit is a loud diff-guard failure, per generate-don't-curate) AND (b) guarded by the regenerate-and-diff lock whose input closure includes the content's resolve-by-id source root (C6/DD7), such that a source edit fails the guard until the same PR regenerates. Where a harness *does* provide a reference mechanism (Kiro `inclusion: always`; CC's shared `CLAUDE.md` `@`-imports), the reference form is used and no inlining occurs. Content that is hand-maintained, or generated-but-unguarded, remains a prohibited self-contained snapshot.
   >
   > **Rationale (Peter's Rosetta framing):** this is the token-pipeline pattern applied to agents. Rosetta emits a CSS `var()` reference for web and an *inlined* Swift value for iOS from one token source; nobody calls the Swift inline a "copy that violates reference-don't-copy," because it is generated-and-guarded platform output. The agent generator is identical: reference where the harness supports it, generated-inline where it doesn't, guarded either way. The reword draws a **bright line — generated-and-guarded vs hand-maintained** — rather than carving an *exception* into an absolute (the erosion the absolute wording was meant to prevent, and which Peter flagged from the early-iteration steering-doc drift). That historical drift was *hand-maintained* redundancy (Specs 020/032/036); this clause forbids exactly that while permitting generation.
   > **Counter-argument (recorded):** narrowing "never snapshot" invites "never snapshot except…" creep. Mitigation: this is not an exception but a **category boundary** — "generated-and-guarded" is mechanically verified (generate-don't-curate diff-guard + closure-complete lock), so anything hand-maintained or unguarded stays absolutely prohibited. The boundary cannot slide because both sides are machine-checked, not discretionary — which is precisely why it's more durable than an exception.

2. **Req 23 AC1 arithmetic — corrected 27 → 30.** The union necessarily includes the locked always-set, so the large-number-to-small-number shrink is true of the *per-agent member* count, not the union cardinality. The observed baseline in the committed `ada.json` at cutover is **30 force-loaded resources, not 27** (live-verified; the earlier "27" figure is stale). Of Ada's expected per-agent members (~3), roughly 2 are always-set docs, so her per-agent-**member** count is ~1 once the union is factored out — meaning even "~3" is ambiguous unless the member/union distinction is stated. C10.2 now records the observed baseline **from the committed config at cutover** and asserts the shrink as a delta against the members count, with both numbers (member and union) on every signal row. The AC's wording could name the member count explicitly.
3. **OB-1 (Req 25 AC2).** The scanner-repoint decision rides with the ratification record; this design carries no OB-1 component. If Peter's recorded decision bundles it, tasks.md adds a single task item; design is unaffected either way. Confirm the decision is recorded where Req 25 AC2 expects it.

---

*Design draft — round 1 incorporated (5 AWA + 2 CLEAR; incorporation notes in `feedback/design.md` § [THURGOOD R2]). Mechanisms only; obligations live in requirements.md. Pending Peter's design ratification + the Req 1 AC1 erratum sanction per the Spec-Feedback-Protocol; tasks.md does not begin until this document is ratified.*
