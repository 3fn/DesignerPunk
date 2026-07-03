# Design Outline: Agent Generator

**Date**: 2026-06-29
**Spec**: 122 — Agent Generator (formerly "121-B")
**Author**: Thurgood (Civitas steward)
**Status**: **Design Outline** — collaborative pre-formalization through-line per the Spec Feedback Protocol. This PROPOSES scope for refinement; it is NOT requirements/design/tasks. The gate that kept this a stub (Spec 118's runtime direction decision) is **CLEARED** — see `inbound-from-118.md`.

> **Authoritative inputs (read these — 122 consolidates them, it does not re-derive them):**
> 1. `119-A-steering-relocation-serving-contract/per-agent-ambient-design.md` — **the spine.** Task 9's per-agent five-class ambient design for all 8 agents. This is 122's canonical input for *what each agent's always-layer contains*.
> 2. `inbound-from-118.md` — the runtime/path assumptions the generated configs must bake in (CJS-consistency; `tsx`-sole; compiled `dist`; scoped-tsx seams; extensionless authoring; bundled-MCP exempt).
> 3. `inbound-from-119.md` — prompts reference docs by `id` not path; the concrete routing rows. (Its floated human-facing doc-TOC is **dropped** from 122 — §5(a).)
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

**Master tool registry (generated) + per-agent inherence (Peter, 2026-06-29).** The per-agent routing above draws from a single **generated master tool registry** — every MCP tool + description across all three MCPs — **generated by introspecting the live MCP tool DECLARATIONS, never hand-curated and never sourced from query results** (the MCP servers are the SSOT for their own tools; a hand-listed catalog is the exact drift surface). The registry is the generator's routing *source* (and optionally an on-demand "what tools exist" reference); it is **NOT** injected ambiently into every agent (that would re-bloat the always-layer) — each agent gets its relevant *subset* + cues. It is a **substrate artifact** (§4 seam) and possibly the simplest first generated one — a low-risk proof of the pipeline + diff-guard before the harder agent-prompt generation.
- **The registry sources DECLARATIONS, index-agnostic (resolves LEONARDO R1's directed question).** Registry generation keys on each tool's *schema/declaration* — available whenever the server process runs, regardless of index state — **NOT** on whether the tool *returns data*. This is load-bearing for the least-mature MCP: the Product MCP returns `indexed:false` in a design-system-source repo (verified independently — `get_product_health` responds but reports no data), yet its tools are fully introspectable. If registry generation depended on a *populated* MCP, the Product-MCP tools would silently drop out of routing at generate-time and the consumer/product agents' Product-MCP cues would never generate. Declaration-keyed generation closes that hole; §2.2's Product-MCP maturity caveat is a *runtime data* caveat, not a *generation* one. (Same keying rule the §8 phantom-route sweep and the §3a "live tool = introspected" clarification depend on.)
- **Regeneration is automated, not a remembered practice:** the registry is a generated output under the **regenerate-and-diff guard** — an MCP adding / removing / renaming a tool or changing a description makes committed ≠ fresh-generate → the guard fails → regenerate. No reliance on a human noticing a tool changed.
- **Per-agent "inherent vs discoverable" is a governed decision:** which tools are *inherent* to an agent (generated activation cues, always-known) vs *discoverable on-demand* (`ToolSearch` / the registry) is the capability-catalog composition. A **new** tool triggers a routing decision — which agents get it inherent — owned by the relevant **domain owner**, with **Stacy's coverage-of-coverage (§4a)** catching any tool that goes un-routed / falls silently through the cracks.

### 2.3 Per-tool transforms (the runtime deltas)
The transforms encode the per-tool deltas the 121 dry-run catalogued:
- MCP query syntax → namespaced tool names (e.g. `mcp__designerpunk-docs__get_section`).
- `resources:` / `skill://` injection → MCP routing + native skills. The **`skill://` reference must be transformed to the CC Skill-tool form**, not copied verbatim, or CC's runtime won't resolve the skills (Data's flag; see §2.5, §5(e)).
- `/knowledge` → grep/MCP fallback note.
- hotkeys removed (no agent-swap shortcuts in Claude Code).
- write-scope expressed as a **behavioral note** (Claude Code can't declaratively path-scope writes — the known portability gap flagged for 122). **The note must be driven by the *source* write-scope field**, not a hand-copied paragraph — a different agent's `allowedPaths` must yield a different note, or the transform itself becomes a per-agent drift surface (STACY R2, port-recon D6).
- **Kiro-only config fields need a declared disposition** — every field with no CC equivalent (`agentSpawn`, `keyboardShortcut`, `welcomeMessage` per port-recon D5) gets an explicit **carry / transform / drop-with-reason** disposition, never a silent drop (silent config drop is the §2.9 "removals need a positive cue" anti-pattern applied to config). This is enforced as a sweep — see §8 sweep 7.

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

Concretely, the **CC-port gap** means none of Sparky (web), Kenya (iOS), or Stacy (QA) has authored command/skill content yet — so **their content must be authored first**, before their catalogs generate. (Stacy was hand-ported this session, so she now has a CC *prompt* — 6/8 ported — but still no authored command content; Sparky and Kenya have neither. The relevant gap for phasing is *authored content*, not the prompt file.) Do **not** fabricate command strings: extract real commands from `package.json` where they exist, or have the owning agent author them (the input-of-record duty — see §7 and §8). **Stacy's slots are audit commands, not build commands** — the catalog-generation work acquires her audit-command slots (and the coverage map §4a needs) *alongside* the platform build-command slots. This is the structural half of §4a's provisioning precondition (see §4a).

**Per-agent-incremental, proven — not asserted.** "Generate all 8 for all targets" is a rule expressed *over time* (each agent generates once its content exists), not a single atomic ship. That reframe dissolves the false "5/8 vs all-8" binary — but it must not let the gap survive in disguise. **Acceptance approach:** the generator's content-agnosticism is *proven* by running a deliberately-minimal 8th-agent **fixture** through the full pipeline — canonical source → transforms → both adapters → diff-guard. If a trivial fixture agent generates cleanly end-to-end, "complete for all 8" is demonstrated rather than claimed. (This is the required acceptance *approach*; the fixture's shape is a requirements/tasks concern.)

### 2.9 Generated-output quality (not just what's removed, but what replaces it)

The generator's output must be *usable*, which means removals and commands carry context, not silence:

- **Any always-layer content demoted to on-demand needs a positive replacement cue.** Trimming a stale snapshot — *or demoting any always-loaded content to on-demand* — silently loses the "where do I get this now" answer. The generator must emit the replacement, framed as a triggered cue: e.g. `WHEN you need Android token values THEN use get_token_details — do NOT read dist/android/` (Data's snapshot-trim case). This generalizes beyond snapshots to the **dominant consumer trim**: 119-A demotes a large share of a routing-heavy consumer's resources (e.g. ~60% of Leonardo's — `Component-Readiness-Status`, `Component-Quick-Reference`, `Process-*`) from always-layer to on-demand; each demotion must emit its MCP replacement cue (`get_component_health` / `get_component_catalog` / `get_prop_guidance`), exactly as a snapshot trim does (Leonardo's flag). The rule is: **every removal from the always-layer emits where-to-get-it-now**, whether the removed thing was a stale snapshot or a demoted doc.
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

### The substrate→agent seam (a first-class boundary AND a hard phase gate)

122 stays **one whole spec** — it is not split (Peter, 2026-07-01). But its internals divide at a named architectural seam:

- **Substrate** — the generation machinery that is agent-content-independent: the **master tool registry** (§2.2), the **skills repointing pipeline** (the `kiro_path → cc_path` mapping table + `skill://`→CC-Skill transform, §2.5 — *skills are substrate, not agent-side*: they are shared knowledge-architecture infrastructure that may be reused across agents, Peter 2026-07-01), the generate-don't-curate engine, the diff-guard, and the pluggable adapters.
- **Agent generator** — everything that consumes the substrate per-agent: the ambient/prompt composition, the capability catalog, §4a's roles, and the §8 sweeps.

The seam is both a boundary and a **hard phase gate**: **prove generate-don't-curate + the diff-guard + the adapter on the substrate (registry + skills, emitted to BOTH targets) *before* agent-prompt generation begins.** This de-risks the whole spec by sequencing — a working substrate proven against two adapters is the floor the harder agent-prompt work builds on. The de-risking comes from the *sequencing and the gate*, not from separate spec folders; **whether this ships as one-spec-two-phases or later splits into two specs is left OPEN as an execution call**, to be decided once the design is coherent (implementation may then deviate). Naming the seam now pre-wires that option without committing to it — and avoids baking in a wrong substrate↔agent interface before it is understood.

**Runtime assumptions the emitted configs bake in** (from `inbound-from-118.md`): CJS-consistency (no `"type":"module"` flip); `tsx` as sole runtime-TS mechanism (**ts-node retired** — do NOT emit it; MCP dev sub-packages are the documented exception); package own code = compiled `dist/` run under plain `node`; consumer `.ts` via per-site scoped-tsx seams; extensionless CJS authoring (ESLint + class-invariant guards enforce); MCP servers + browser bundle are the exempt, esbuild-bundled surface. Generated prompts that reference the contract point at `Rosetta-System-Architecture.md` § "Module-Resolution Contract (Spec 118)" by `id` (post-119-A relocated path).

---

## 3a. Canonical-Source Correctness & the Diff-Guard's Limit

The regenerate-and-diff guard is load-bearing, but it proves exactly one thing: **output == canonical**. It does **not** prove **canonical == truth**. Generate-don't-curate is only as correct as the source it generates from; a defect in canonical source (or in a referenced corpus `id`) regenerates faithfully into every agent, and the diff-guard *blesses* it — committed equals fresh-generate, both wrong.

**This is a genuinely new failure mode for the project.** 122 **concentrates risk**: where DesignerPunk's history has precedent only for *distributed* drift (many hand-maintained copies diverging), 122 creates a single point whose defect propagates to *all* agents at once. Concentrated failure has no direct precedent here — which is why it earns its own treatment rather than being folded into the diff-guard story.

**Mitigations** (each reduces the residual, and they compound):

1. **Reference, don't copy (the primary structural mitigation).** Because law and routing are *resolved from the corpus by `id`* rather than re-authored into canonical agent source, the corpus stays SSOT and *inherits the governance that already protects the corpus* — the ballot-measure model, domain-owner review, and Thurgood's MCP/steering oversight. A canonical-source defect in *referenced* content is caught by the same machinery that catches any corpus defect; 122 does not create a second, unguarded copy to drift.
2. **A canonical-vs-truth check (non-negotiable — pair it with the diff-guard).** The diff-guard checks output-fidelity; this check verifies that referenced `id`s **still resolve** and **still say what the agent claims about them** (e.g. a law reference points at a section that still states that law; a routing row points at a live tool). This is the guard *against the new mode* — the diff-guard cannot see it, so this check is mandatory, not optional. Two assertion classes make "still say what the agent claims" concrete: (a) **governance-integrity** — a law reference must resolve to a section that still states the *substance* it claims, not merely resolve as a string (Ada's case: a `token-governance` autonomy-level that silently reclassifies — "component tokens require explicit approval" ceasing to say so — still resolves but is a governance defect, not cosmetic); (b) **live-tool** — **"live tool" means *introspected from the running MCP*, not *named in canonical source*.** A routing cue naming `get_screen_state_model` resolves fine as a string but is worthless if the running Product MCP doesn't *declare* it (Leonardo's phantom-route case). Keyed on tool *declarations*, index-agnostic — the same rule the §2.2 registry and the §8 phantom-route sweep use, so an index-empty-but-declared tool is *not* false-flagged.
3. **Compute fresh, never snapshot.** Any manifest/audit surface the generator wires must point at tools that compute fresh at use-time, never a baked-in snapshot. Precedent: the stale-`dist` incident (`agent-experience-architecture.md` §5.4 "computed ground-truth ≠ snapshot"; §8.1 — Kenya's/Data's probes found `dist/{ios,android}` token output *stale, pre-Spec-094, actively contradicting the theming contract*). A healthy tool served **authoritative-but-wrong** data — the exact shape of a concentrated-canonical defect.

**Honest calibration:** with reference-don't-copy plus the corpus's existing governance, the residual is a **narrow sliver**, not a contamination-crisis-caliber threat — the corpus is already the most-governed surface in the system. But the sliver is *new in kind*, so the canonical-vs-truth check (mitigation 2) is non-negotiable **precisely because** the mode is novel: we have no distributed-drift muscle-memory that happens to cover it.

---

## 3b. First-Generation Cutover (a one-way ratchet)

At first generation, whatever sits in canonical source becomes **committed truth and the diff-guard's baseline** in a single act. From that moment the diff-guard defends the baseline — including any defect that was present at cutover. **Defects present at cutover get blessed forever** (until someone notices and fixes canonical source manually, against a guard that now reports "no drift").

The current hand-maintained prompts carry *known* defects that must not be ratcheted in — **but the point is precisely that no hand-listed enumeration is complete** (every reviewer found one not on the prior draft's list). Representative classes, each caught by a §8 sweep rather than a bespoke checklist item:
- **`.web.tsx` → `.web.ts`** scaffolding-extension bug at multiple canonical-source sites (Lina) — §8 sweep 5.
- **Data's dropped `start-up-tasks`** — ambient block omits what `data.json` injects; §8 sweep 4 (the set-difference), adjudicated per agent.
- **The `contract-system-reference` "117 vs 136 concepts" intra-doc contradiction** — a self-contradicting law source propagates into Lina's generated law and every future component's contracts; §8 sweep 5.
- **The consumer-resource double-load / phantom-route classes** — `leonardo.json`'s `Product-Token-Governance` double-load (§8 sweep 3) and routing cues pointing at tools the running MCP doesn't declare (§8 sweep 6). Named here because the prior draft's list omitted them — the exact consumer-facing gap that proves the list-form fails.
- **The CC-port gap** — Sparky and Kenya were never ported to `.claude/agents/`; Stacy was hand-ported this session (disposable input — a CC prompt, but no authored command content). None of the three has clean authored command sources yet.

**Precedent for the fix:** the contamination-crisis abandonment-log methodology — recreate fresh, **do NOT carry contamination forward**. Applied here: require a **clean-room input audit** of the folded-in canonical inputs (the 119-A/119-B hand-wired routing rows + the locked always-set) against the *live corpus*, performed **once, before the generator becomes SSOT**. The audit is the gate that keeps the one-way ratchet from enshrining today's known defects — run as the **mechanical §8 sweeps**, not a hand-list; its upstream preconditions (the 117/136 ballot, the `.web.tsx` fix) must clear before first generation (§6 Input-Fidelity Gates).

---

## 4. The Consumption / Coupling Model (inputs, not outputs)

This is the load-bearing coupling 122 must get right, because 119-A and 119-B hand-wire content that 122 regenerates:

- **119-A's hand-wired routing/identity are INPUTS to the canonical source, not outputs to overwrite.** The id-addressing, the routing rows (find_docs, module-resolution-contract, conventions), and the **locked always-set** (the `locked-always` members of the five-class design) are folded INTO 122's canonical source. Regeneration then *preserves* them.
- **The regenerate-and-diff guard protects them from drift.** Per `inbound-from-118.md`: once the routing rows live in canonical source, the diff-guard is the right end-state for the consumption mechanism 118 flagged — it prevents clobbering 119's intent on regeneration.
- **Sequencing note:** if 122 lands *before* 119-B's prompt-routing phase, fold the rows directly into canonical source (then the hand-wiring is unnecessary). If after, treat the hand-wiring as the input-of-record to migrate.
- **122 RETIRES the interim `CLAUDE.md` stopgap (OB-7).** The CC always-layer becomes a generated output; the stopgap is removed (or folded into generation) so the two always-layer mechanisms do not coexist past 122.

---

## 4a. Governance & Roles: Success vs Failure

> **Status: requirements-ready in principle.** Both principals converge — author (Thurgood) and subject (Stacy, heard natively). The verification/validation split holds with the discriminator + tie-break below; the involvement trigger is concretely defined; provisioning is accepted as a **hard precondition**. The one remaining gate is *structural, not conceptual*: the provisioning commitment must land in §2 + tasks (see "Provision her means"), and §4a's re-derivation leg is flagged **blocked-on-that-task**. Until that lands, §4a is *designed but not-operable*.

122's verification story needs two distinct roles, because "all checks are green" and "the green is trustworthy" are different questions:

- **Thurgood = success / verification.** Ensures all systems are green and operating: MCP/index health, metadata validity, cross-references resolve, tooling wired, the diff-guard runs. Thurgood *runs the checks* and confirms they pass.
- **Stacy = failure / validation.** Ensures the green isn't a **false-positive** and that issues don't fall through the cracks **silently**. Stacy is the **independent skeptic of the green checks — NOT a second runner of them.** She covers two failure modes verification alone can't:
  - *The check lied* (green but broken) — needs **independent re-derivation**, not a re-run of the same check that produced the green.
  - *No check existed* (an unwatched gap) — needs **coverage-of-coverage**: is there a check for this at all?

**The discriminator (object under audit, not activity).** Where coverage-of-coverage brushes against Thurgood's content-consistency stewardship, the seam is the *object under audit*: **Thurgood = are the surfaces mutually consistent; Stacy = is there an instrument that would catch it if they weren't.** Tie-break by ordering — **existence before agreement**: first-order "does an instrument/route exist?" is **Stacy's** (coverage); second-order "given it exists, do the surfaces agree?" is **Thurgood's** (consistency). An un-routed tool is both a missing check (Stacy) and a cross-surface gap (Thurgood); this ordering says Stacy owns it *first* (does a route exist at all), Thurgood second (do the surfaces agree about it).

**Involvement trigger (scope-based primary + cadence backstop).** Not the undefined "significant regenerations." Concretely — **cutover OR shared-canonical-source touch OR Thurgood-flag**:
- **Mandatory:** (i) first-generation **cutover** for *any* agent (each is a one-way ratchet, §3b; blast-radius at a ratchet is her lane), and (ii) any regen touching **shared canonical source** — master tool registry, skills mapping table, locked always-set, or a governance-as-law lock (the §3a concentrated-failure surface).
- **On-flag:** any regen where Thurgood's verification surfaces an anomaly (the "check lied" path).
- **Skip:** a single-agent regen touching only that agent's own prose/commands with a green diff-guard and no shared-source change. (Keeps her lean — no shadow-auditing every single-agent regen.)

Her content lane within those triggers:
- **Adequacy / efficacy** — thin, missing, or unreachable agent content (the Sparky/Kenya command-gap class: a slot exists but nothing actionable fills it).
- **Calibration honesty** — is a reported "94%" / a threshold *real*, or gamed?
- **Blast-radius** — when a canonical/cutover defect would propagate widely.

**Explicitly OUT of Stacy's scope** (owned elsewhere, do not duplicate):
- Tool-health / index-health / metadata → **Thurgood** (verification).
- Content-*correctness* (is the token math / component architecture right?) → **domain owners** (Ada / Lina). The check may *run* on any surface, but **the owner adjudicates truth**: Stacy/Thurgood run the canonical-vs-truth check, but Lina rules whether "117" or "136" is correct, Ada rules token-governance substance — a canonical-source defect on a domain surface does not stall waiting for a non-owner to rule.
- Content-*consistency* / redundancy / conflicts / standards → **Thurgood** (Civitas steward).

The clean cut is **verification (Thurgood) vs validation (Stacy)** — running the checks vs independently distrusting them.

**Provision her means (hard precondition, not a paragraph).** A validation role without instruments is theater — and the independent-re-derivation leg is **aspirational until tooled**: Stacy's audit commands "appear nowhere in her prompt" today (confirmed live — her hand-port carries read/query tools but *no audit commands and no coverage map*, the under-provisioning demonstrated on herself). So provisioning is a **precondition**, made structural in three parts:
1. **§2.2/§2.8 acquire her audit-command slots** alongside the platform build-command slots.
2. **Tasks carries a task** whose acceptance criterion is "**Stacy's audit commands are named AND her coverage map is emitted**."
3. **§4a's re-derivation leg is flagged blocked-on-that-task** — until part 2 lands, that leg is non-operable and must not be claimed as available.

Without part 2 in tasks, "precondition" is aspiration and her re-derivation leg stays theater — a calibration-honesty failure turned on her own role.

---

## 5. Scope Decisions (surfaced for Peter — most now resolved)

Most of these were scope calls for the feedback round; the round + session decisions resolved all but the small OB-1 ride-along question. Each carries its disposition inline:

**(a) Generated human-facing doc-TOC — DROPPED from 122 scope (Peter, 2026-07-01).**
`inbound-from-119.md` §1 floated a *generated* domain-grouped TOC of the `governance/` corpus for a **human** orienting to the corpus. It is **out of 122** — not deferred, dropped. There is **no citable need**: keyword search is standard in IDE + CLI, and `find_docs({ list: true })` already serves the agent-facing "what exists" path; the human-side UX is undefined. Bundling a hand-wavy net-new surface into a large infra spec is scope creep. If a real human-orientation need surfaces later, **it is its own small spec.** (No provenance claim is made here that Peter requested such a surface — an earlier draft asserted a human-orientation need was "surfaced this session"; that was a false-positive provenance assertion and is removed.)

**(b) Which OBs land in 122's first cut vs later? — CONFIRMED: OB-5/6/7 core.**
OB-5 (conventions routing), OB-6 (regenerate `.claude/agents` with `governance/` paths), OB-7 (CC always-layer + retire `CLAUDE.md`) are **core** 122 scope — they are the reason 122 exists in the 119-A→122 sequence (**confirmed this session**). OB-1's **scanner repoint** (`scripts/scan-cross-references.sh` → `governance/`) is a small **bundled** item, but its parent OB-1 (cross-ref parser id-awareness) is Docs-MCP-infra work, not 122. Still open: whether the OB-1 scanner repoint rides along with 122 or stays with the OB-1 owner.

**(c) BOTH Kiro + CC in the first cut, or CC-first? — RESOLVED (Peter, 2026-06-29): BOTH targets in the first cut; CC-first as build *order*, not scope.**
Rationale: 122's central thesis is the *multi-harness* generator, and the load-bearing risk is the **adapter abstraction** (121 Resolved Decision 4 — "adding a target = an adapter, not a rearchitecture"). That claim is only *validated* by emitting to **≥2 targets**; a single-target first cut is a CC formatter with a `canonical/` dir that has silently baked in CC-shaped assumptions — the abstraction stays an untested hypothesis and the 2nd target forces a painful retrofit. Two is the validation floor; three (Cursor) is over-reach for a first cut. Also: the Kiro side is **not** a no-op — its agent *configs* are hand-maintained (`.kiro/agents/*.json` + `*-prompt.md`), the same drift surface §1 targets, so generating Kiro carries direct value, not just validation overhead. **Build order:** CC-adapter first (richest verification signal — the live blind-spot, OB-6/7, the probe-subagent test), then the Kiro adapter to force the canonical/adapter seam honest; first cut ships when **both** adapters work. Cursor (and any further target) is added later as proof the abstraction is additive.

**(d) Manifest build scope — CONFIRMED, in three clean buckets.** The five-class design marks ground-truth-manifest members `design-only-build-deferred`. Rather than nested refinements, first-cut scope is exactly three buckets:

- **In 122 = wire the MCP-routing cues, with the *right verbs*.** 122 builds *nothing standing* for the manifest class; it wires cues that point at live MCP tools. The verbs matter: Lina's cue carries the **assembly-grain faithfulness** verb (`get_component_full` + `get_component_health` — "is the assembled metadata trustworthy?"), not mere `get_component_catalog` enumeration (`agent-experience-architecture.md` §3.4, §8.1); removal/replacement cues are **content framed positively** per §2.9. (Two agents reach "no build" for *different* reasons — Lina because the App-MCP tool already serves it; the differential auditors because a snapshot would be *harmful* (compute-fresh, §3a mitigation 3). Same verdict, don't conflate.)
- **Out of 122 = any standing manifest build.** Most manifest members resolve to computed-fresh MCP tools, so there is nothing to build. The schema rationale is load-bearing, not a footnote: a token is a **per-theme set, not one value** — that difficulty is *why* the stale iOS/Android snapshots were trimmed (Ada); requirements carry it as the reason behind "no standing token-manifest."
- **Out of 122, named = the token source→index divergence audit.** A *genuine build* (distinct from wiring a cue), it is **Ada's Rosetta-pipeline work, not 122** (§6). Named so "build-nothing" doesn't imply it doesn't exist — it exists, elsewhere.

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

**Input-Fidelity Gates (§8 is a dependency, not a checklist).** The §8 sweeps are a **named dependency gate** on requirements, not polish: requirements cannot be written while the shared-source defects they audit remain open. The pre-cutover blockers that must clear (or be adjudicated) before first generation makes the generator SSOT: the **117/136 intra-doc reconciliation ballot**, the **`.web.tsx`→`.web.ts` fix (all sites)**, and the **adjudication of Data's `start-up-tasks` drop** (plus the same set-difference across all 8). These are inputs to formalization — see §8 for the full mechanical sweep set.

**Severable seams:**
- **Substrate ↔ agent generator** — the first-class architectural seam (§3): the substrate (master tool registry + skills pipeline + generate/diff-guard/adapter machinery) is proven — emitted to BOTH targets — *before* agent-prompt generation begins (a hard phase gate). 122 stays whole; whether this later splits into two specs is an OPEN execution call, not a scoping decision (Peter, 2026-07-01).
- **Kiro adapter ↔ CC adapter** — the pluggable-adapter design makes these independently shippable; CC-first is viable (Open Question c).
- **Catalog generation ↔ manifest build** — the catalog cues (point at live MCP) are severable from any standing manifest build (Open Question d); most manifests are "no build" by design.

---

## 7. Feedback Stakeholders (Spec-Feedback-Protocol)

122 touches **every agent's prompt, ambient layer, and routing** — so the roster is broad. Per the protocol's selection criteria (domain owners, output consumers, governance stake, platform expertise):

| Reviewer | Why | Criterion |
|---|---|---|
| **Peter** | Final decisions; owns the open scope calls in §5. | Human lead |
| **Ada** | Her ambient design (token-governance law, none-standing manifest, module-resolution-contract routing row) is generated by 122; her `ada.json` 27-resource leak is in the decomposition. | Domain owner + subject of generated output |
| **Lina** | Her `get_component_catalog`-IS-the-manifest design is the one genuine manifest win 122 builds; her contract-system-reference law + assembly-grain faithfulness verbs are generated. | Domain owner + subject |
| **Leonardo** | Routing-dominant consumer/hub; his absorbed `agent-directory` routing is a first-class generated capability surface — and it is **agent-to-agent handoff routing** (route Peter to platform agents; escalate to system agents), not only doc/tool routing. The generated catalog must preserve the **inter-agent routing table**, not merely tool-routing cues, or his hub function degrades. He specs against the generated agents. | Consumer + subject |
| **Sparky** | His web build/test commands are "named nowhere" (catalog gap 122 fills); CC port + always-layer affect him. | Consumer + subject + command-capture owner |
| **Kenya** | Under-provisioned iOS build/test command + missing iOS skill-pack slot are 122 catalog work; he must supply command/skill content (input-of-record gap). | Consumer + subject + content owner |
| **Data** | Android skills exist but are unnamed in his catalog; gradle/Compose build command gap — 122 names them; he supplies content. | Consumer + subject + content owner |
| **Stacy** | Her audit commands appear "nowhere" in her prompt (122 catalog work); governance/QA stake on the diff-guard and generate-don't-curate invariant. | Governance stake + subject + content owner |

**Thurgood (author)** drives formalization and owns the Civitas-infrastructure stake (the diff-guard, the always-layer unification, OB-5/6/7).

> Rationale for the broad roster: unlike a token or component spec, the agent generator's output IS each reviewer's operating context. Every consumer agent additionally owns input-of-record gaps (their build/test/audit command strings, which `per-agent-ambient-design.md` flagged as *not* in the input — designed the slot, deferred the content to its owner). Those owners must supply the missing content during 122 formalization.

---

## 8. Requirements-Phase Input-Fidelity Sweeps

These feed the §3b clean-room cutover audit — the checks that must clear (or be adjudicated) **before** first generation makes the generator SSOT, so the one-way ratchet doesn't enshrine a known defect.

**Meta-finding — the fix for a drift surface is not a longer list.** An earlier draft of this section was a *hand-enumerated list of known defects*. That form is itself the anti-pattern 122 exists to kill: a hand-curated list is a drift surface — proof being that *every reviewer found a defect not on it* (Ada: a stale law-*address*; Data: a mis-mapped skill path; Leonardo: a phantom route + a resources double-load; Lina: a *second* `.web.tsx` site + an intra-doc contradiction). Applying 122's own generate-don't-curate principle reflexively, §8 is therefore a set of **mechanical per-agent SWEEPS**, not a static list — each mechanical, checkable, and agent-agnostic. The **seven sweeps** (naming *what each guards*; their pass/fail algorithms are a requirements/tasks concern, not outline detail):

1. **Reference-resolution sweep** — every governance-as-law `id`/section and every routing-row tool resolves against the *running* corpus/MCP. **Bidirectional & declaration-keyed** (keys on tool *declarations*, not query results — so an index-empty-but-declared tool is not false-flagged). Guards: stale law-*addresses* (119-A relocated these; a ref resolving to the wrong/old section ratchets in silently) and phantom cues. (Ada + Leonardo)
2. **Skills mapping-table round-trip** — every Kiro skill has a `kiro_path → cc_path` row; every row's `cc_path` exists. Guards the crux `theming-styles` skill silently resolving nowhere — the diff-guard can't see a mis-mapped path, only a resolve-check can. (Data)
3. **Resources-array double-load sweep** — no agent force-loads the same doc twice; flags over-breadth. Guards the `leonardo.json` `Product-Token-Governance` double-load and Ada's 27-resource over-breadth. (Leonardo, Ada)
4. **Task-9 ambient-block vs `*.json` set-difference** — per agent, every delta between the Task-9 ambient block and what `*.json` actually injects is adjudicated intentional-trim vs assessment-gap. Guards Data's dropped `start-up-tasks`; **most urgent for the 3 unported agents**, which have no `.claude/agents/*` to eyeball, so this diff is the only thing that catches a silent drop. (Data)
5. **Known-content-defect fixes** — `.web.tsx`→`.web.ts` at **ALL** sites (Lina verified two: scaffold tree + Platform-Implementation→Web; a single-site fix still ratchets via the second), and the **117/136 intra-doc reconciliation** (three in-doc references in `Contract-System-Reference.md` must be reconciled, not just the header — Lina's scaffolding authors contracts from this Catalog, so the defect propagates into every future component). (Lina)
6. **Phantom-route / declaration-diff sweep** — bidirectional, declaration-keyed. Un-routed-tool and phantom-route are two directions of one set-difference (routing cues vs the running MCP's declared tools), with a **declared-but-empty carve-out**: a tool *declared but index-empty* (e.g. Product MCP's `get_product_health` returning `indexed:false` in a design-system-source repo) is expected and correct and must **NOT** be flagged; only a tool *not declared at all* is a dead cue. (Leonardo + Stacy)
7. **Config-field disposition sweep** — every Kiro config field has a declared CC disposition (**carry / transform / drop-with-reason**); guards the silent drop of `agentSpawn` / `keyboardShortcut` / `welcomeMessage` (port-recon D5). (Stacy)

**Ownership model.** The sweeps **run mechanically in the pipeline's own CI**; the **domain owner adjudicates each flagged delta** (Lina rules 117/136; Data rules his `start-up-tasks`; Ada rules a token-law address). **Stacy owns coverage-of-coverage** — that the sweep *set* is complete and that each sweep actually *ran* at cutover (the recursion: she audits that the audits exist and fired). This is the concrete instrument that makes her §4a validation lane operable.

*(Also banked as acceptance signals, not sweeps: `lina.json` verified clean — ~33 on-domain resources, no token/test-governance bleed — with the post-decomposition shrink (governance-as-law lock → `contract-system-reference` + consumer/auditor core; ~29 `skill://` docs → on-demand) as its diff-guard acceptance signal, parallel to Ada's 27→~3.)*

---

## 9. Confirmation: OB-5/6/7 (+ OB-1 scanner) Reflected as 122 Scope

- **OB-5** (conventions prompt-routing) → §2.2 (routing tables) + §5(b). Core first-cut.
- **OB-6** (regenerate `.claude/agents/*` with `governance/` paths + accurate notes) → §2.7 + §5(b). Core first-cut.
- **OB-7** (generate CC always-layer from canonical source **AND retire the interim `CLAUDE.md` stopgap**) → §2.7 + §4 + §5(b). Core first-cut; the outline explicitly marks the interim `CLAUDE.md` stopgap **for retirement** (one always-layer mechanism per runtime).
- **OB-1 scanner repoint** (`scripts/scan-cross-references.sh` → `governance/`) → §5(b), flagged as a small **bundled** item with an owner question (122 ride-along vs OB-1 owner). The parent OB-1 (parser id-awareness) is **not** 122 — it is Docs-MCP-infra.

---

## Cross-References

- `.kiro/specs/122-agent-generator/inbound-from-118.md` — runtime/path assumptions baked into generated output; the 118→119→122 consumption chain.
- `.kiro/specs/122-agent-generator/inbound-from-119.md` — id-addressing; the concrete routing rows. (Its floated doc-TOC is dropped from 122 — §5(a).)
- `.kiro/specs/122-agent-generator/inbound-from-121.md` — `WORKFLOW_RULES` propagation; `find_docs`-not-`get_documentation_map`.
- `.kiro/specs/122-agent-generator/port-recon-stacy.md` — the manual Stacy CC-port dry-run; transform deltas D1–D6 feeding §2.1/§2.2/§2.3 and §8 sweep 7.
- `.kiro/specs/119-A-steering-relocation-serving-contract/per-agent-ambient-design.md` — the five-class ambient design (122's spine).
- `.kiro/specs/119-steering-progressive-disclosure-redesign/119-B-deferred-obligations.md` § OB-5/OB-6/OB-7/OB-1 — the 122-owned obligations.
- `.kiro/specs/121-claude-code-portability/` (design-outline + requirements) — source of the lifted scope + summary-first contract.
- `.kiro/specs/118-module-resolution-coherence/` — the cleared direction gate.
- `.kiro/specs/119-steering-progressive-disclosure-redesign/design-outline.md` — the AXA reframe + pillar mapping that places 122 as "Generation & Enforcement."
- `.kiro/specs/123-consumer-distribution/design-outline.md` — downstream packaging of generator output.

---

*Design-outline only. Proposes scope for the collaborative feedback round per the Spec Feedback Protocol — it surfaces decisions rather than pre-committing them. Formalization (requirements → feedback → design → tasks) follows after this outline's feedback round; the §5 scope calls are resolved but for the small OB-1 scanner ride-along question (§5(b)).*
