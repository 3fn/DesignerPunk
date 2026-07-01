# Design Outline: Agent Generator

**Date**: 2026-06-29
**Spec**: 122 — Agent Generator (formerly "121-B")
**Author**: Thurgood (Civitas steward)
**Status**: **Design Outline** — collaborative pre-formalization through-line per the Spec Feedback Protocol. This PROPOSES scope for refinement; it is NOT requirements/design/tasks. The gate that kept this a stub (Spec 118's runtime direction decision) is **CLEARED** — see `inbound-from-118.md`.

> **Authoritative inputs (read these — 122 consolidates them, it does not re-derive them):**
> 1. `119-A-steering-relocation-serving-contract/per-agent-ambient-design.md` — **the spine.** Task 9's per-agent five-class ambient design for all 8 agents. This is 122's canonical input for *what each agent's always-layer contains*.
> 2. `inbound-from-118.md` — the runtime/path assumptions the generated configs must bake in (CJS-consistency; `tsx`-sole; compiled `dist`; scoped-tsx seams; extensionless authoring; bundled-MCP exempt).
> 3. `inbound-from-119.md` — prompts reference docs by `id` not path; the concrete routing rows; the candidate generated human-facing doc-TOC.
> 4. `inbound-from-121.md` — the summary-first `WORKFLOW_RULES` propagation contract.
> 5. `119-B-deferred-obligations.md` § OB-5/OB-6/OB-7 (+ OB-1's scanner repoint) — the concrete 122-owned obligations.

---

## 1. Thesis / Problem

**One canonical agent definition → per-tool configs, generated, never curated.** Today each agent exists as hand-maintained artifacts across at least two runtimes — the Kiro source (`.kiro/agents/*-prompt.md`) and a disposable Claude Code port (`.claude/agents/*.md`) — plus per-agent JSON configs, resources arrays, skills, and an always-loaded identity layer delivered differently in each runtime (Kiro's `inclusion: always` vs Claude Code's interim `CLAUDE.md` stopgap). These surfaces drift because they are maintained by hand.

122 applies the **Rosetta token-pipeline pattern** to agents: define each agent **once** in a canonical source; **generate** every per-tool output; **never hand-edit a generated output** (the exact invariant Rosetta enforces for tokens — generate-don't-curate). A regenerate-and-diff guard turns any hand-edit into a loud CI failure.

### The generator is a composition pipeline — "reference, don't copy"

122 is **not** a content synthesizer and **not** a content copier. It is a **composition pipeline** with exactly two operations:

1. **Resolve references** into the single governance-corpus source-of-truth — by `id`, at generate-time. Governance-as-law, routing rows, and doc pointers are *pulled from the corpus* when the prompt is generated; they are never re-authored into the agent's canonical source and never snapshotted into a self-contained prompt.
2. **Pass through hand-authored prose** — the formative/reflexive/role-specific prose an agent's canonical source *does* own travels through verbatim. The generator does not synthesize this prose; a human authors it.

The invariant is **reference, don't copy.** The corpus stays the single source of truth; the generated prompt is a *composition* of resolved references plus pass-through prose, not a self-contained document that has absorbed corpus content. This is the load-bearing distinction the rest of this outline turns on (see §4 the coupling model, and the canonical-source-correctness section that follows §3).

### Why generate, not hand-maintain — the hard-won lineage

DesignerPunk has fought the single-source-vs-drift battle repeatedly, and the history endorses 122's *direction*:

- **Spec 020** consciously chose **copy** — "Intentional Redundancy with Different Framing" — and *recorded the drift risk it accepted* in the same breath ("Risk of documents drifting out of sync"). It was a deliberate trade, made with eyes open.
- **Specs 032 / 036** then spent much of their existence paying that drift bill — the redundancy 020 sanctioned became the maintenance surface those specs had to reconcile.
- **Spec 119** concluded that hand-maintenance of these maps is *structurally* wrong, not just costly: "**generate, don't curate** — a hand-curated map *is* a drift surface (the removed directory is the cautionary tale)" (`agent-experience-architecture.md` §5.1). 119 named the disease; it did not build the cure.
- **Spec 122 is the mechanism** — the generator that makes generate-don't-curate real for agents.

The origin of this whole thread is the **January 2025 contamination crisis** (`preserved-knowledge/`), whose central lesson was that copied templates and examples become contamination vectors that propagate errors. **Net: the lineage endorses 122's direction — but it also fingers the exact mistake 122 must not repeat.** Copying corpus content into self-contained agent docs would re-commit 020's drift trade and re-open a contamination vector. That is precisely why the pipeline *references* rather than *copies*.

**Why now:**
- **118 cleared the gate.** The generator emits configs whose runtime/path assumptions were exactly what 118 was deciding. 118 decided (CJS-consistency; `tsx`-sole; compiled `dist`). Those assumptions are now ratifiable into generated output.
- **119-A produced the canonical inputs.** Task 9's per-agent five-class ambient design *is* the spec of what each agent's always-layer contains. It is explicitly disposable input to 122, not a maintained map.
- **The hand-wiring needs to become generated to stop drift.** 119-A/119-B hand-wires routing rows and the locked always-set into prompts. Left hand-maintained, these drift. 122 makes them generated outputs of a canonical source, with the diff-guard protecting them.

---

## 2. Scope — What 122 Generates

The generator produces every per-tool agent artifact from canonical source. Lifted and refined from the 121 stub scope, then extended with the 119-A ambient design and the 119-B obligations:

### 2.1 Per-agent ambient / always layer (the five-class decomposition)
From `per-agent-ambient-design.md` (Task 9). For each of the 8 agents, the generator emits the ambient layer assembled from the five AXA classes:
- **formative** (`personal-note`; `core-goals` for Leonardo/Stacy) — locked-always.
- **reflexive-principle** (`ai-collaboration-principles`, incl. the certainty-calibration rule) — locked-always.
- **governance-as-law** (per-agent: e.g. Ada `token-governance`; Lina `contract-system-reference`; Thurgood `test-development-standards` + git/commit core; the consumer/auditor laws) — locked-always.
- **ground-truth-manifest** (DESIGN status per agent: none-standing/MCP-served for Ada & web/iOS/Android consumers; `get_component_catalog`-IS-the-manifest for Lina; collapses-into-catalog for the differential auditors) — the **build** is severable; 122 owns it post-119-A.
- **capability-catalog** (per-agent tools + commands + activation cues + absorbed `agent-directory` routing) — the **generation** is severable; this is core 122 work.

> The five-class artifact already marks each member `locked-always` / `design-only-build-deferred` / `design-only-gen-deferred`. 122 is where the `design-only-*` members get **built** and **generated**.

### 2.2 Routing tables (canonical-source content, propagated to all agents)
Per `inbound-from-119.md` §2 — these are instances of "agent prompts become generated outputs," not new scope:
- **`find_docs` discovery row** — `find_docs({ concept })` / `find_docs({ list: true })`. Audited 2026-06-27: only Thurgood routes to it; the other 7 agents have no concept-discovery route. 122 propagates the row to all agents from canonical source.
- **Module-Resolution Contract row (Spec 118)** — `get_section` on the contract, for Ada (primary) / Thurgood / Lina. Per `inbound-from-118.md`, this row lives in canonical source so regeneration *preserves* it rather than clobbering 119's hand-wiring.
- **Steering-Addressing-Conventions routing (OB-5)** — a triggered cue `WHEN creating/modifying a steering doc THEN consult Steering-Addressing-Conventions`, generated into the steering-doc-authoring agents' prompts.

**Routing spans ALL THREE MCPs, not just Docs (Peter, 2026-06-29).** The rows above are Docs-MCP-centric because that's what 119-A handed forward — but the capability-catalog's job is to route *every* tool an agent uses, and for the **consumer/product agents the Application MCP and Product MCP are the *primary* surface, not Docs.** 122 must generate per-agent **activation cues + routing** across all three:
- **Application MCP** — `find_components` / `get_component_full` / `get_component_catalog` / `get_component_health` / `validate_assembly` / `check_composition` / `get_prop_guidance` / `get_experience_pattern` (components), and `search_tokens` / `get_token_details` / `get_token_family` / `get_token_consumers` (tokens). Primary for **Lina** (owner), **Ada** (tokens), and the **consumers** (Leonardo/Sparky/Kenya/Data) who select + consume components and tokens.
- **Product MCP** — `find_screens` / `get_screen_spec` / `get_product_tokens` / `list_experience_map` / `get_screen_state_model`. Primary for **Leonardo** (screen/flow specification) and the **platform agents** building against product screens. (Maturity caveat: Product MCP is the least-mature of the three — its per-agent availability needs a requirements check.)
- **Docs MCP** — `find_docs` + the routing rows above.

**Scope discipline (same reference-don't-copy rule):** tool *schemas* auto-surface in each agent's tool list, so 122 does NOT re-list them — it generates the **triggered cues** (WHEN to reach for which tool), the per-agent tool *subset*, and deferred-tool-awareness (`ToolSearch`), pointing at the live MCPs. A Docs-only 122 would under-serve exactly the consumer/product agents whose day-to-day is App/Product-MCP, not `find_docs`.

**Master tool registry (generated) + per-agent inherence (Peter, 2026-06-29).** The per-agent routing above draws from a single **generated master tool registry** — every MCP tool + description across all three MCPs — **generated by introspecting the live MCP tool declarations, never hand-curated** (the MCP servers are the SSOT for their own tools; a hand-listed catalog is the exact drift surface). The registry is the generator's routing *source* (and optionally an on-demand "what tools exist" reference); it is **NOT** injected ambiently into every agent (that would re-bloat the always-layer) — each agent gets its relevant *subset* + cues. Possibly the simplest first generated artifact (a low-risk proof of the pipeline + diff-guard before the harder agent-prompt generation).
- **Regeneration is automated, not a remembered practice:** the registry is a generated output under the **regenerate-and-diff guard** — an MCP adding / removing / renaming a tool or changing a description makes committed ≠ fresh-generate → the guard fails → regenerate. No reliance on a human noticing a tool changed.
- **Per-agent "inherent vs discoverable" is a governed decision:** which tools are *inherent* to an agent (generated activation cues, always-known) vs *discoverable on-demand* (`ToolSearch` / the registry) is the capability-catalog composition. A **new** tool triggers a routing decision — which agents get it inherent — owned by the relevant **domain owner**, with **Stacy's coverage-of-coverage (§4a)** catching any tool that goes un-routed / falls silently through the cracks.

### 2.3 Per-tool transforms (the runtime deltas)
The transforms encode the per-tool deltas the 121 dry-run catalogued:
- MCP query syntax → namespaced tool names (e.g. `mcp__designerpunk-docs__get_section`).
- `resources:` / `skill://` injection → MCP routing + native skills. The **`skill://` reference must be transformed to the CC Skill-tool form**, not copied verbatim, or CC's runtime won't resolve the skills (Data's flag; see §2.5, §5(e)).
- `/knowledge` → grep/MCP fallback note.
- hotkeys removed (no agent-swap shortcuts in Claude Code).
- write-scope expressed as a **behavioral note** (Claude Code can't declaratively path-scope writes — this is the known portability gap flagged for 122).

### 2.4 `id`-addressing in generated prompts
Per `inbound-from-119.md` §3: generated prompts reference docs by **`id`**, not a physical `governance/...` path, so relocation/rename stays transparent. Address grammar is forward-shaped for section IDs (`docid#sectionid`) — emit doc-level `id` now; section-level slots in later without regenerating differently.

### 2.5 Skill repointing + neutral `skills/` root
- Skills lifted and internal paths repointed by the generator via an explicit **`kiro_path → cc_path` mapping table — NOT a regex/prefix swap.** Kiro's nested `.kiro/skills/android/theming/styles/SKILL.md` → CC's flat, hyphenated `.claude/skills/theming-styles/SKILL.md`: a naive `s|.kiro/skills/android/||` breaks `theming/styles` and mis-strips the `android/` namespace. `theming-styles` is the crux skill (token→Compose integration) — a silent break is high-impact. Bundled scripts travel as-is. (Data's flag; see §5(e).)
- Skills live in a neutral top-level `skills/` root (sibling to 119's `governance/`), conceptually distinct from governance. Generator copies/repoints into each tool's location.
- The generator's source must emit `find_docs`, **NOT** the removed `get_documentation_map` (per `inbound-from-121.md` §2 — regenerating from a stale template would regress agents to a removed tool).

### 2.6 Summary-first `WORKFLOW_RULES` propagation
Per `inbound-from-121.md` §1: the generator `import { WORKFLOW_RULES }`, filters by `appliesToTools`, and renders each rule into every generated agent prompt from that single source of truth (121 encodes; 122 propagates).

### 2.7 Generated output targets
- `.kiro/agents/*` (Kiro) — regenerated from canonical source; 119-A's hand-wiring becomes input, not output.
- `.claude/agents/*.md` (Claude Code role prompts) — regenerated with `governance/` paths + accurate post-relocation notes (**OB-6**).
- **The Claude Code always-layer** — generated into each agent's CC context from canonical source, **superseding and retiring the interim `CLAUDE.md` stopgap** (**OB-7**), so there is exactly one always-layer mechanism per runtime.

### 2.8 Phasing rule — **content before catalog**

**Do NOT generate an agent's capability catalog until that agent's command/skill content is authored.** Generating a catalog *around* not-yet-authored content re-commits the crisis-era **"specifications without actionable implementation"** anti-pattern (`preserved-knowledge/sustainable-development-practices.md`) — a beautiful slot map that nobody can execute. This is process-first, properly applied: prove the content exists before wiring the map that points at it.

Concretely, the **5/8 CC-port gap** means Sparky (web), Kenya (iOS), and Stacy (QA) have no authored command/skill content yet — so **their content must be authored first**, before their catalogs generate. Do **not** fabricate command strings: extract real commands from `package.json` where they exist, or have the owning agent author them (the input-of-record duty — see §7 and §8).

### 2.9 Generated-output quality (not just what's removed, but what replaces it)

The generator's output must be *usable*, which means removals and commands carry context, not silence:

- **Removals need a positive replacement cue.** Trimming a stale snapshot silently loses the "where do I get this now" answer. The generator must emit the replacement, framed as a triggered cue: e.g. `WHEN you need Android token values THEN use get_token_details — do NOT read dist/android/` (Data's flag; generalizes to every consumer snapshot trim).
- **Commands need run-context annotations.** A bare `./gradlew test` fails every time in *this* repo (it's the design-system source, no `gradlew` here). Emit the context: `run from the product app's android/ dir, not this repo` (Data's flag; generalizes to any command whose run-context isn't this repo).

---

## 3. Architecture Sketch (not full design)

```
canonical agent source            transforms                 per-tool target adapters         drift guard
(Markdown body + YAML        →  per-tool deltas:         →   Kiro adapter   → .kiro/agents/*   →  regenerate-and-diff
 frontmatter; one per agent)     - MCP syntax                CC adapter     → .claude/agents/* +    (CI/pre-commit:
 + five-class ambient design     - skill://→MCP+skills                        CC always-layer        committed ≠ fresh
 + routing rows                   - hotkeys removed          (pluggable: adding a                     generate ⇒ fail)
 + WORKFLOW_RULES import          - write-scope-as-note       target = +adapter,
 + id-addressed doc refs          - id not path               not a rearchitecture)
```

- **Canonical source format:** Markdown body + YAML frontmatter (121 Resolved Decision 1), with the per-agent five-class ambient design folded in as structured canonical content.
- **Transforms:** the per-tool deltas catalogued by the 121 dry-run, applied uniformly.
- **Pluggable target adapters:** Kiro + Claude Code first. Adding a target = adding an adapter/transform, **not** a rearchitecture (121 Resolved Decision 4 — a hard design constraint).
- **Regenerate-and-diff guard:** commit generated outputs, paired with a CI/pre-commit guard that regenerates-and-diffs (fails if committed ≠ fresh generate), turning drift into a loud failure (121 Resolved Decision 5).

**Runtime assumptions the emitted configs bake in** (from `inbound-from-118.md`): CJS-consistency (no `"type":"module"` flip); `tsx` as sole runtime-TS mechanism (**ts-node retired** — do NOT emit it; MCP dev sub-packages are the documented exception); package own code = compiled `dist/` run under plain `node`; consumer `.ts` via per-site scoped-tsx seams; extensionless CJS authoring (ESLint + class-invariant guards enforce); MCP servers + browser bundle are the exempt, esbuild-bundled surface. Generated prompts that reference the contract point at `Rosetta-System-Architecture.md` § "Module-Resolution Contract (Spec 118)" by `id` (post-119-A relocated path).

---

## 3a. Canonical-Source Correctness & the Diff-Guard's Limit

The regenerate-and-diff guard is load-bearing, but it proves exactly one thing: **output == canonical**. It does **not** prove **canonical == truth**. Generate-don't-curate is only as correct as the source it generates from; a defect in canonical source (or in a referenced corpus `id`) regenerates faithfully into every agent, and the diff-guard *blesses* it — committed equals fresh-generate, both wrong.

**This is a genuinely new failure mode for the project.** 122 **concentrates risk**: where DesignerPunk's history has precedent only for *distributed* drift (many hand-maintained copies diverging), 122 creates a single point whose defect propagates to *all* agents at once. Concentrated failure has no direct precedent here — which is why it earns its own treatment rather than being folded into the diff-guard story.

**Mitigations** (each reduces the residual, and they compound):

1. **Reference, don't copy (the primary structural mitigation).** Because law and routing are *resolved from the corpus by `id`* rather than re-authored into canonical agent source, the corpus stays SSOT and *inherits the governance that already protects the corpus* — the ballot-measure model, domain-owner review, and Thurgood's MCP/steering oversight. A canonical-source defect in *referenced* content is caught by the same machinery that catches any corpus defect; 122 does not create a second, unguarded copy to drift.
2. **A canonical-vs-truth check (non-negotiable — pair it with the diff-guard).** The diff-guard checks output-fidelity; this check verifies that referenced `id`s **still resolve** and **still say what the agent claims about them** (e.g. a law reference points at a section that still states that law; a routing row points at a live tool). This is the guard *against the new mode* — the diff-guard cannot see it, so this check is mandatory, not optional.
3. **Compute fresh, never snapshot.** Any manifest/audit surface the generator wires must point at tools that compute fresh at use-time, never a baked-in snapshot. Precedent: the stale-`dist` incident (`agent-experience-architecture.md` §5.4 "computed ground-truth ≠ snapshot"; §8.1 — Kenya's/Data's probes found `dist/{ios,android}` token output *stale, pre-Spec-094, actively contradicting the theming contract*). A healthy tool served **authoritative-but-wrong** data — the exact shape of a concentrated-canonical defect.

**Honest calibration:** with reference-don't-copy plus the corpus's existing governance, the residual is a **narrow sliver**, not a contamination-crisis-caliber threat — the corpus is already the most-governed surface in the system. But the sliver is *new in kind*, so the canonical-vs-truth check (mitigation 2) is non-negotiable **precisely because** the mode is novel: we have no distributed-drift muscle-memory that happens to cover it.

---

## 3b. First-Generation Cutover (a one-way ratchet)

At first generation, whatever sits in canonical source becomes **committed truth and the diff-guard's baseline** in a single act. From that moment the diff-guard defends the baseline — including any defect that was present at cutover. **Defects present at cutover get blessed forever** (until someone notices and fixes canonical source manually, against a guard that now reports "no drift").

The current hand-maintained prompts carry *known* defects that must not be ratcheted in:
- **`.web.tsx` → `.web.ts`** scaffolding-extension bug in canonical source (Lina's flag) — generate-don't-curate would lock in the wrong extension.
- **Data's dropped `start-up-tasks`** — his ambient block omits it though `data.json` currently injects it; either an intentional trim or a Task-9 assessment gap, unresolved.
- **The `contract-system-reference` "117 vs 136 concepts" contradiction** — a self-contradicting law source would propagate its contradiction to Lina's generated silent-failure law.
- **The 5/8 CC-port gap** — Sparky/Kenya/Stacy were never ported to `.claude/agents/`, so their inputs don't yet exist as clean sources.

**Precedent for the fix:** the contamination-crisis abandonment-log methodology — recreate fresh, **do NOT carry contamination forward**. Applied here: require a **clean-room input audit** of the folded-in canonical inputs (the 119-A/119-B hand-wired routing rows + the locked always-set) against the *live corpus*, performed **once, before the generator becomes SSOT**. The audit is the gate that keeps the one-way ratchet from enshrining today's known defects. Its concrete checklist is the input-fidelity checklist in §8; its upstream preconditions (the contract ballot, the `.web.tsx` fix) must clear before first generation.

---

## 4. The Consumption / Coupling Model (inputs, not outputs)

This is the load-bearing coupling 122 must get right, because 119-A and 119-B hand-wire content that 122 regenerates:

- **119-A's hand-wired routing/identity are INPUTS to the canonical source, not outputs to overwrite.** The id-addressing, the routing rows (find_docs, module-resolution-contract, conventions), and the **locked always-set** (the `locked-always` members of the five-class design) are folded INTO 122's canonical source. Regeneration then *preserves* them.
- **The regenerate-and-diff guard protects them from drift.** Per `inbound-from-118.md`: once the routing rows live in canonical source, the diff-guard is the right end-state for the consumption mechanism 118 flagged — it prevents clobbering 119's intent on regeneration.
- **Sequencing note:** if 122 lands *before* 119-B's prompt-routing phase, fold the rows directly into canonical source (then the hand-wiring is unnecessary). If after, treat the hand-wiring as the input-of-record to migrate.
- **122 RETIRES the interim `CLAUDE.md` stopgap (OB-7).** The CC always-layer becomes a generated output; the stopgap is removed (or folded into generation) so the two always-layer mechanisms do not coexist past 122.

---

## 4a. Governance & Roles: Success vs Failure — **PROPOSED** (pending Stacy + Thurgood review)

> **Status: PROPOSED.** This assigns Stacy a role at the 122 gate and draws a line adjacent to Thurgood's boundary. It is **not** locked here — it must be validated with both agents in a feedback round before formalization. Recorded as a proposal so the roster review has something concrete to accept, amend, or reject.

122's verification story needs two distinct roles, because "all checks are green" and "the green is trustworthy" are different questions:

- **Thurgood = success / verification.** Ensures all systems are green and operating: MCP/index health, metadata validity, cross-references resolve, tooling wired, the diff-guard runs. Thurgood *runs the checks* and confirms they pass.
- **Stacy = failure / validation.** Ensures the green isn't a **false-positive** and that issues don't fall through the cracks **silently**. Stacy is the **independent skeptic of the green checks — NOT a second runner of them.** She covers two failure modes verification alone can't:
  - *The check lied* (green but broken) — needs **independent re-derivation**, not a re-run of the same check that produced the green.
  - *No check existed* (an unwatched gap) — needs **coverage-of-coverage**: is there a check for this at all?

**Scope discipline (keep it lean).** Stacy's involvement is **gate-anchored and high-blast-radius** — cutover and significant regenerations — **not** continuous shadow-auditing of every generation. Her content lane is:
- **Adequacy / efficacy** — thin, missing, or unreachable agent content (the Sparky/Kenya command-gap class: a slot exists but nothing actionable fills it).
- **Calibration honesty** — is a reported "94%" / a threshold *real*, or gamed?
- **Blast-radius** — when a canonical/cutover defect would propagate widely.

**Explicitly OUT of Stacy's scope** (owned elsewhere, do not duplicate):
- Tool-health / index-health / metadata → **Thurgood** (verification).
- Content-*correctness* (is the token math / component architecture right?) → **domain owners** (Ada / Lina).
- Content-*consistency* / redundancy / conflicts / standards → **Thurgood** (Civitas steward).

The clean cut is **verification (Thurgood) vs validation (Stacy)** — running the checks vs independently distrusting them.

**Provision her means (load-bearing).** A validation role without instruments is theater. Stacy needs **computed-fresh audit tooling** and a **coverage map** to do independent re-derivation and coverage-of-coverage. She is **under-provisioned today**: the 119-A assessment found her audit commands "appear nowhere in her prompt." 122's catalog generation is the natural place to fill those slots — the same catalog work that names Sparky's/Kenya's/Data's build commands should name Stacy's audit commands. This is why the role and the catalog work are proposed together: the role is only real once 122 gives her the instruments.

---

## 5. Open Questions / Scope Decisions to SURFACE for Peter

These are deliberately **not** resolved here — they are scope calls for the feedback round:

**(a) Generated human-facing doc-TOC — RE-OPENED, leaning IN (confirm at requirements).**
`inbound-from-119.md` §1 proposes a *generated* (not curated) domain-grouped TOC of the `governance/` corpus, for a **human** orienting to the corpus (`find_docs` is a query tool, not a narrative overview). It is structurally a 122 output (emit-from-canonical-source). This was previously conflated with the dropped *agent-facing* Documentation Directory — but it is a **distinct artifact**: a *human*-orientation surface, never built, and (if built) *generated*. Peter surfaced a real human-orientation need this session, so the recommendation **changes from defer-by-default to leaning-in — confirm at requirements.** Non-negotiable shape if included: it must be **generated, not curated** (a hand-maintained TOC is the exact §5.1 drift surface) and **drift-guarded** like any other generated output. (`find_docs({ list: true })` remains the *agent's* "what exists" path; this fills the *human's* orientation gap it doesn't cover.)

**(b) Which OBs land in 122's first cut vs later? — CONFIRMED: OB-5/6/7 core.**
OB-5 (conventions routing), OB-6 (regenerate `.claude/agents` with `governance/` paths), OB-7 (CC always-layer + retire `CLAUDE.md`) are **core** 122 scope — they are the reason 122 exists in the 119-A→122 sequence (**confirmed this session**). OB-1's **scanner repoint** (`scripts/scan-cross-references.sh` → `governance/`) is a small **bundled** item, but its parent OB-1 (cross-ref parser id-awareness) is Docs-MCP-infra work, not 122. Still open: whether the OB-1 scanner repoint rides along with 122 or stays with the OB-1 owner.

**(c) BOTH Kiro + CC in the first cut, or CC-first? — RESOLVED (Peter, 2026-06-29): BOTH targets in the first cut; CC-first as build *order*, not scope.**
Rationale: 122's central thesis is the *multi-harness* generator, and the load-bearing risk is the **adapter abstraction** (121 Resolved Decision 4 — "adding a target = an adapter, not a rearchitecture"). That claim is only *validated* by emitting to **≥2 targets**; a single-target first cut is a CC formatter with a `canonical/` dir that has silently baked in CC-shaped assumptions — the abstraction stays an untested hypothesis and the 2nd target forces a painful retrofit. Two is the validation floor; three (Cursor) is over-reach for a first cut. Also: the Kiro side is **not** a no-op — its agent *configs* are hand-maintained (`.kiro/agents/*.json` + `*-prompt.md`), the same drift surface §1 targets, so generating Kiro carries direct value, not just validation overhead. **Build order:** CC-adapter first (richest verification signal — the live blind-spot, OB-6/7, the probe-subagent test), then the Kiro adapter to force the canonical/adapter seam honest; first cut ships when **both** adapters work. Cursor (and any further target) is added later as proof the abstraction is additive.

**(d) Manifest build scope — CONFIRMED: wire-the-cues, build-nothing-standing (with the right verbs).** The five-class design marks ground-truth-manifest members `design-only-build-deferred`. Most resolve to "no standing snapshot — MCP/computed-audit serves it" (Ada, the consumers, the auditors); only Lina's is a genuine `get_component_catalog`-IS-the-manifest win. 122's first cut **builds nothing standing** for the manifest class; it **wires the catalog cues** that point at the live MCP tools. Confirmed this session, with two refinements the round surfaced:

- **The cues must carry the *right verbs*, not just enumeration:**
  - Lina's catalog cue carries the **assembly-grain faithfulness** verb (`get_component_full` + `get_component_health` — "is the assembled metadata trustworthy?"), not merely `get_component_catalog` enumeration. Enumeration answers "what exists"; faithfulness is her actual divergence check (`agent-experience-architecture.md` §3.4, §8.1).
  - The removal/replacement cues are **content, framed positively** ("WHEN you need X THEN use the MCP — do NOT read `dist/…`"), per §2.9 — governance-as-law and MCP routing are cues *as content*, not a bare route.
  - (Two agents reach "no build" for *different* reasons — Lina because the App-MCP tool already serves it; the differential auditors because a snapshot would be *harmful* (compute-fresh, §3a mitigation 3). Same verdict, don't conflate the rationale.)
- **The manifest-schema hard case is the root cause, not a footnote.** A token is a **per-theme set, not one value** — this schema difficulty is *why* the stale iOS/Android snapshots were trimmed in the first place (Ada). Requirements should carry it as the schema rationale behind "no standing token-manifest," not as an Ada-only aside.
- **"Build-nothing" must not imply "doesn't exist."** The token **source→index divergence audit** is a *genuine build* (distinct from wiring an MCP cue). It is **out of 122** (see §6) — but the outline names where it lives rather than letting "build-nothing" erase it.

**(e) Canonical-source authoring ergonomics — RESOLVED: structure tracks silent-failure risk *per class*.** It is not one global structured-vs-prose knob. The cut follows the silent-failure discriminator:
- **Structure** (frontmatter) the classes where structure enables the diff-guard and transforms and where silent failure bites — **membership / routes / skills-mapping** (governance-as-law lock-set, routing rows, manifest cues, the skills map).
- **Prose** (body) the classes a human authors and that carry no silent-failure signal — **formative** and **reflexive-principle**.

Two skills-specific requirements this forces (Data's flags):
- **Skills need an explicit `kiro_path → cc_path` MAPPING TABLE, not a regex.** Kiro's nested `.kiro/skills/android/theming/styles/SKILL.md` must map to CC's flat, hyphenated `.claude/skills/theming-styles/SKILL.md` — a naive `s|.kiro/skills/android/||` produces a broken `theming/styles` path and strips the `android/` namespace incorrectly. `theming-styles` is the crux skill (the token→Compose integration point); silently breaking it is high-impact. A mapping table is the only faithful transform.
- **A `skill://` → CC-Skill-tool transform is required.** The generator must transform skill references for CC's runtime, not copy Kiro's `skill://` syntax verbatim, or CC won't resolve the skills.

---

## 6. Dependencies + Severable Boundaries

- **Spec 118 (Module-Resolution Coherence)** — **CLEARED & consumed.** Was direction-gating; 118 decided and codified the contract. 122 bakes 118's runtime/path assumptions into generated output. `.kiro/specs/118-module-resolution-coherence/` + `Rosetta-System-Architecture.md` § "Module-Resolution Contract (Spec 118)".
- **Spec 121 (Claude Code Portability / MCP Delivery-Layer Hardening)** — **consumed.** 122 was split out of 121-B; it consumes 121's discovery/delivery fixes and honors two hard obligations: propagate `WORKFLOW_RULES` (§1) and emit `find_docs` not `get_documentation_map` (§2). `.kiro/specs/121-claude-code-portability/`.
- **Spec 119-A (Relocation, Serving Contract & Always-Layer Design)** — **consumed; its outputs are 122's inputs.** The per-agent five-class ambient design, `id`-addressing, the locked always-set, the routing rows. `.kiro/specs/119-A-steering-relocation-serving-contract/per-agent-ambient-design.md`.
- **Feeds Spec 119-B (Capability Catalog, Routing & Measurement)** — 119-B's routing-reframe and measurement consume 122's generated catalog/routing. The `design-only-gen-deferred` members are 122-generated; 119-B measures and refines.
- **Feeds Spec 123 (Consumer Distribution)** — `npx designerpunk init` runs the generator for the consumer's chosen tool; 123 packages and distributes generator output. Consumer-side CC always-layer delivery is 123 territory (per OB-7's scope note). `.kiro/specs/123-consumer-distribution/`.

**Out-of-122 boundary (named so it isn't lost):**
- **Token source→index divergence audit script** — a *genuine build*, **NOT 122** (Ada's flag). It is **Rosetta-pipeline work**; its home is a token-pipeline spec, not the agent generator. 122 only wires the *cue* that points at the live token MCP tools (§5(d)); the standing divergence-audit *tool* belongs to Ada's pipeline. Named here so "build-nothing-standing" doesn't imply the audit doesn't exist — it exists, elsewhere.

**Severable seams:**
- **Kiro adapter ↔ CC adapter** — the pluggable-adapter design makes these independently shippable; CC-first is viable (Open Question c).
- **Catalog generation ↔ manifest build** — the catalog cues (point at live MCP) are severable from any standing manifest build (Open Question d); most manifests are "no build" by design.
- **Core generation ↔ generated human-facing doc-TOC** (Open Question a) — the TOC is a clean add-on output, severable from the agent-config generation.

---

## 7. Feedback Stakeholders (Spec-Feedback-Protocol)

122 touches **every agent's prompt, ambient layer, and routing** — so the roster is broad. Per the protocol's selection criteria (domain owners, output consumers, governance stake, platform expertise):

| Reviewer | Why | Criterion |
|---|---|---|
| **Peter** | Final decisions; owns the open scope calls in §5. | Human lead |
| **Ada** | Her ambient design (token-governance law, none-standing manifest, module-resolution-contract routing row) is generated by 122; her `ada.json` 27-resource leak is in the decomposition. | Domain owner + subject of generated output |
| **Lina** | Her `get_component_catalog`-IS-the-manifest design is the one genuine manifest win 122 builds; her contract-system-reference law + assembly-grain faithfulness verbs are generated. | Domain owner + subject |
| **Leonardo** | Routing-dominant consumer/hub; his absorbed `agent-directory` routing is a first-class generated capability surface; he specs against the generated agents. | Consumer + subject |
| **Sparky** | His web build/test commands are "named nowhere" (catalog gap 122 fills); CC port + always-layer affect him. | Consumer + subject + command-capture owner |
| **Kenya** | Under-provisioned iOS build/test command + missing iOS skill-pack slot are 122 catalog work; he must supply command/skill content (input-of-record gap). | Consumer + subject + content owner |
| **Data** | Android skills exist but are unnamed in his catalog; gradle/Compose build command gap — 122 names them; he supplies content. | Consumer + subject + content owner |
| **Stacy** | Her audit commands appear "nowhere" in her prompt (122 catalog work); governance/QA stake on the diff-guard and generate-don't-curate invariant. | Governance stake + subject + content owner |

**Thurgood (author)** drives formalization and owns the Civitas-infrastructure stake (the diff-guard, the always-layer unification, OB-5/6/7).

> Rationale for the broad roster: unlike a token or component spec, the agent generator's output IS each reviewer's operating context. Every consumer agent additionally owns input-of-record gaps (their build/test/audit command strings, which `per-agent-ambient-design.md` flagged as *not* in the input — designed the slot, deferred the content to its owner). Those owners must supply the missing content during 122 formalization.

---

## 8. Requirements-Phase Input-Fidelity Checklist

These feed the §3b clean-room cutover audit — they are the concrete items that must clear (or be adjudicated) **before** first generation makes the generator SSOT, so the one-way ratchet doesn't enshrine a known defect:

1. **Confirm `lina.json` resource cleanliness.** It carries *no* leak flag — unlike ada/leonardo/sparky/kenya — but absence of a flag ≠ proof of cleanliness; verify explicitly (Lina's flag).
2. **Resolve Data's `start-up-tasks` omission + audit the Task-9 ambient design for similar drops.** His block omits `start-up-tasks` though `data.json` injects it (via `skill://`), unlike Leonardo/Stacy who keep it. Intentional trim or assessment gap? Adjudicate, then sweep the ambient design for the same class of silent drop.
3. **`contract-system-reference` "117 vs 136" ballot = upstream-correctness precondition.** A self-contradicting law source propagates its contradiction to Lina's generated silent-failure law; the diff-guard can't catch a canonical-source defect (§3a). The ballot must resolve before Lina's law generates.
4. **Fix `.web.tsx` → `.web.ts` in canonical source before first generation.** Else generate-don't-curate ratchets in the wrong extension (§3b).

---

## 9. Confirmation: OB-5/6/7 (+ OB-1 scanner) Reflected as 122 Scope

- **OB-5** (conventions prompt-routing) → §2.2 (routing tables) + §5(b). Core first-cut.
- **OB-6** (regenerate `.claude/agents/*` with `governance/` paths + accurate notes) → §2.7 + §5(b). Core first-cut.
- **OB-7** (generate CC always-layer from canonical source **AND retire the interim `CLAUDE.md` stopgap**) → §2.7 + §4 + §5(b). Core first-cut; the outline explicitly marks the interim `CLAUDE.md` stopgap **for retirement** (one always-layer mechanism per runtime).
- **OB-1 scanner repoint** (`scripts/scan-cross-references.sh` → `governance/`) → §5(b), flagged as a small **bundled** item with an owner question (122 ride-along vs OB-1 owner). The parent OB-1 (parser id-awareness) is **not** 122 — it is Docs-MCP-infra.

---

## Cross-References

- `.kiro/specs/122-agent-generator/inbound-from-118.md` — runtime/path assumptions baked into generated output; the 118→119→122 consumption chain.
- `.kiro/specs/122-agent-generator/inbound-from-119.md` — id-addressing; the concrete routing rows; the candidate generated doc-TOC.
- `.kiro/specs/122-agent-generator/inbound-from-121.md` — `WORKFLOW_RULES` propagation; `find_docs`-not-`get_documentation_map`.
- `.kiro/specs/119-A-steering-relocation-serving-contract/per-agent-ambient-design.md` — the five-class ambient design (122's spine).
- `.kiro/specs/119-steering-progressive-disclosure-redesign/119-B-deferred-obligations.md` § OB-5/OB-6/OB-7/OB-1 — the 122-owned obligations.
- `.kiro/specs/121-claude-code-portability/` (design-outline + requirements) — source of the lifted scope + summary-first contract.
- `.kiro/specs/118-module-resolution-coherence/` — the cleared direction gate.
- `.kiro/specs/119-steering-progressive-disclosure-redesign/design-outline.md` — the AXA reframe + pillar mapping that places 122 as "Generation & Enforcement."
- `.kiro/specs/123-consumer-distribution/design-outline.md` — downstream packaging of generator output.

---

*Design-outline only. Proposes scope for the collaborative feedback round per the Spec Feedback Protocol — it surfaces decisions rather than pre-committing them. Formalization (requirements → feedback → design → tasks) follows after this outline's feedback round, sequenced behind the open scope calls in §5.*
