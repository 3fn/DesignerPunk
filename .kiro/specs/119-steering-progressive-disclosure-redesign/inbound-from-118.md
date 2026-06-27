# Inbound from Spec 118 (Module-Resolution Coherence) — for Spec 119

**Date**: 2026-06-26
**Status**: 118 Increment 3 complete & committed; Task 11 (governance) in progress. Decided with Peter (2026-06-26): Task 11 codifies the module-resolution contract **content** into steering; **119 owns how that content is consumed/served.** This note registers the two consumption hand-offs so 119 picks them up rather than 118 hand-wiring them now.

---

## Context: a new body of steering law is landing

Spec 118 Task 11 codifies the **Module-Resolution Contract** (the system's module-resolution law) into steering — primarily a new section in **`Rosetta-System-Architecture.md`**, with smaller additions to **Test-Development-Standards.md**, **Technology Stack.md**, **BUILD-SYSTEM-SETUP.md** (the CI-enforced-guards practice, the narrow ESLint-exists fact, the Civitas close-state process guard, the class-invariant/brand-contract prose). Full draft: `.kiro/specs/118-module-resolution-coherence/findings/task-11-ballot-proposal.md`.

All four target docs are **non-identity** → they **relocate to `governance/`** under 119, and their consumption shifts to MCP-served + agent-prompt-routing. 118 deliberately did **not** build that consumption path (it would pre-empt / duplicate 119's designed scope — Decisions 1 & 4). Two hand-offs:

## Hand-off 1 — routing-table entry for the Module-Resolution Contract (119 Phase 7/8)

When 119 audits/enhances per-agent routing tables, add a route to the new contract for the agents who touch the resolution surface:
- **Ada (primary)** — she owns Rosetta/resolution and implemented 118. Her routing table should gain a row, e.g. *"Module-resolution question (loaders / exports / bin / config / extensionless authoring / component-token harvest) → `get_section({ path: '<governance>/Rosetta-System-Architecture.md', heading: 'Module-Resolution Contract (Spec 118)' })`"*.
- **Thurgood** — for the Civitas close-state process guard + CI-enforced-guards practice (Test-Development-Standards.md).
- **Lina** — lighter: a pointer for the component-token return-value/brand contract (she owns components; the brand is the authoring seam).
- Platform agents (Sparky/Kenya/Data) do **not** need it — they consume compiled output, not the resolution surface.

This is the "discoverability" mechanism 118's analysis flagged: with the contract in a `manual`/relocated doc, agents only reach it via routing — so the routing row is what makes "Spec 118 is the single source of truth for module resolution" actually operative.

## Hand-off 2 — a one-line identity-layer pointer (stays `always`)

In **DesignerPunk-Systems-Overview.md** (one of the ~9 docs 119 keeps in the `always` identity layer), add a single pointer line so every agent knows the contract exists and when to pull it — without bloating the identity tier with the contract itself. Suggested: *"Module resolution (runtime-TS loading, package exports, the bin, consumer `.ts`, component tokens) is governed by the Module-Resolution Contract — pull it before touching those surfaces. See RSA § Module-Resolution Contract."* ~25 tokens; depth stays in the `manual`/MCP-served contract.

## Why this is 119's job, not 118's
- 119 **rejected a shared coordinating artifact** and put activation in per-agent prompts (Decision 1/4). Hand-off 1 is exactly a routing-table row — its designed home.
- 119 keeps the identity layer minimal; Hand-off 2 is a one-line pointer, not the contract — consistent with that.
- **Spec 122 (Agent Generator), gated on 118,** later regenerates agent prompts from a single canonical source — so Hand-off 1's routing row is ultimately a *generated* output, not a perpetual hand-edit. 118 completing (Task 11) is what unblocks that chain. If 122 lands before 119's Phase 7, fold the routing row into the generator's canonical source instead.

## Note on placement vs. relocation
118's ballot places the contract in RSA by **content-fit** (not inclusion tier — an early draft wrongly called RSA `always`-class; it is `manual`). When 119 relocates RSA → `governance/`, the contract content rides along (119 moves frontmatter+location, not content). No coordination needed beyond updating any cross-reference paths during 119's relocation phase.

## Cross-references
- `.kiro/specs/118-module-resolution-coherence/findings/task-11-ballot-proposal.md` (the contract content + the § "Spec 119 coupling" note)
- `.kiro/specs/118-module-resolution-coherence/findings/doc-coherence-audit-2026-06-26.md` (stale-doc inventory — several entries are docs 119 will relocate)
- `.kiro/specs/118-module-resolution-coherence/findings/runtime-ts-resolution-target-model.md` (the ratified contract this codifies)
