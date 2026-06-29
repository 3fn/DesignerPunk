# Design Outline: Steering Progressive Disclosure Redesign → Agent Experience Architecture (AXA)

**Date**: 2026-06-19 (base) · **Reframed**: 2026-06-27 (AXA) · **History archived**: 2026-06-28
**Spec**: 119 - Agent Experience Architecture (AXA) — formerly "Steering Progressive Disclosure Redesign"
**Author**: Thurgood
**Status**: Design Outline — **AXA Reframe is the single authoritative through-line (below).** The pre-reframe body (the 2026-06-19 base, the 119-A/119-B split reasoning, the R2 resolutions, the inbound 117/118/121 reconciliation, the 14-phase estimate) has been **moved to `archive/design-outline-history.md`** to stop the re-bannering accretion — it is preserved as history, not re-formalized on top of.

> **Authoritative set (read these, in order):**
> 1. `119-A-steering-relocation-serving-contract/agent-experience-architecture.md` — the AXA **model + vocabulary** (main loop owns it). **Read it first.**
> 2. the **AXA Reframe** section immediately below — the authoritative **through-line, coupling inventory, and pillar mapping**.
> 3. `119-A-steering-relocation-serving-contract/requirements.md` — **what must be true** for 119-A.
>
> Design **history** (provenance only, not authoritative): `archive/design-outline-history.md`.

---

## ⭐ AXA Reframe — AUTHORITATIVE (2026-06-27, Option A, Peter-approved)

> **This is the authoritative through-line for Spec 119.** The pre-reframe body that this section used to sit on top of now lives in `archive/design-outline-history.md` — it was moved rather than re-bannered, to end the "three stacked supersedes-banners over a 760-line body" accretion. Read this section as the current framing; read the archive only for provenance. A focused agent feedback round on this reframe ran during consolidation.

**Spec 119 has been re-framed from "Steering Progressive Disclosure Redesign" to "Agent Experience Architecture (AXA)" (Option A).** Steering relocation is now understood as **one pillar** of a larger architecture, not the whole spec. AX = Agent Experience (industry-aligned term); AXA = Agent Experience Architecture (this spec family).

**Conceptual foundation:** `.kiro/specs/119-A-steering-relocation-serving-contract/agent-experience-architecture.md` is the canonical model + vocabulary. **Read it first.** This section maps that architecture onto the 119 spec family.

### What AXA is (in brief — full detail in the AXA doc)
How an agent is provisioned: **ambient** (always-loaded) vs **on-demand**. Five ambient classes — **formative** (values/relationship; inhabited not consulted), **reflexive principle** (applied every task), **governance-as-law** (continuously applied; on-demand fails *silently*), **ground-truth manifest** (compact "what exists," not whole source), **capability catalog** (generated tools+commands+cues; the verb-map replacing the removed content-map). On-demand: reference docs (Docs MCP), structured data (Application MCP), ground-truth source (Read/Glob), commands, computed audits. Principles: generate-don't-curate, derived-index-vs-ground-truth, computed-ground-truth≠snapshot, capability-map-replaces-content-map, the silent-failure discriminator, the AX lens (curated education + lived experience + formative values).

### Pillar mapping (119 as a spec family)
- **119-A — Relocation, Serving Contract & Always-Layer Design (dependency-critical core).** Doc relocation → `governance/`, uniform `id`-addressing, MCP rewiring, the **comprehensive steering-path coupling remediation** (broader than docs — see below), AND the always-layer / per-agent AX **design** (the five-class decomposition, the identity-layer decomposition, governance-as-law, manifest *design*). **This is what unblocks 122/123.**
- **119-B — Capability Catalog, Routing & Measurement.** The generated per-agent capability catalog; routing tables **reframed task→capability** (not just doc-concept→doc); certainty-calibration formalization; the before/after measurement case study.
- **122 — Generation & Enforcement.** Generates + enforces each agent's AX (resources, catalog, routing) from canonical source. **The per-agent AX design (119-A) is its input.**
- **Severable seam (critical):** the relocation + addressing + always-layer *design* must be deliverable independently of the manifest *build* (generator/CI work) and deeper AX investments — so non-critical work cannot hold the dependency-critical path hostage.

### What the reframe integrates (this session's findings)
- **The steering-path coupling surface is far broader than docs.** Beyond the 8 agent prompts: `.kiro/sync-manifest.json` (89 refs), agent-definition `resources` arrays (~170 refs, mixing docs **and** whole `src/` dirs), `.cursor/mcp.json`, `init` copying `.kiro/steering` to consumers, and `src/figma`/`src/validators`/`scripts`. Classified **must-fix-119-A** (no MCP fallback) / **deferrable** (prompt paths have the fallback) / **R3** (stale strings). Req 1 inventory generalizes to a full coupling sweep; Req 8 gate asserts on the must-fix set + Application-MCP health.
- **The agent `resources` arrays are a *second* always-load leak** (force-loading non-identity docs + entire `src/tokens`/`src/components` dirs). Decompose to the five classes; this is the AX design work, in 119-A behind the severable seam.
- **Manifests replace whole-dir force-loads** (token-manifest, `get_component_catalog`-as-manifest). Kept in 119-A per Peter, behind the seam (the manifest *build* touches the generator/CI and must not gate relocation).
- **Identity-layer decomposition:** `Agent-Directory` is capability-routing (→ catalog, generated); checklists (`Start Up Tasks`, Task-Completion-Protocol) are operational law; `Personal Note` is formative. Req 6 shifts from "lock the identity docs" to "lock the formative + reflexive core; route the rest to their real classes."
- **Per-agent AX assessed for Ada / Lina / Thurgood** (worked examples); the remaining five (Leonardo, Sparky, Kenya, Data, Stacy) are produced by this feedback round.
- **Product MCP is inert** w.r.t. relocation (indexes `product/`, never steering); the consumer-distribution overlap is 123's.
- **Staleness / prompt-bug items** (Lina's `lina-prompt.md` `.web.tsx`→`.web.ts`; stale Component-Quick-Reference status; Contract-System-Reference "117 vs 136"; Thurgood's redundant `AI-Collaboration-Framework` load) → routed to R3 / ballot-measure / 122.

### Reconciliation with prior decisions (carried forward, NOT discarded)
- The 119-A / 119-B split **holds** — now expressed as AXA pillars. R1–R10 **hold**. Inbound 117 / 118 / 121 **hold**. Sequencing `119-A → 122 → 123 → 119-B` **holds**.
- The revised `requirements.md` (119-A) + its three agent reviews + the three per-agent AX assessments **compound into** this reframe; nothing resets.
- **Structural follow-up (flagged, NOT done):** the spec folder `119-steering-progressive-disclosure-redesign` should be renamed to reflect AXA (e.g. `119-agent-experience-architecture`); deferred to avoid path churn mid-draft.

### Open questions
See the AXA doc §8 (ground-truth divergence is currently *latent* → manifest is insurance-not-remediation; the *formative* class is asserted, not demonstrated; the AX/experience analogy overstates force-loaded files; "generate-don't-curate" assumes 122 exists; sprawl risk). Spec-specific: does the AXA reframe over-expand 119 (the severable seam is the guard); and the 119-B/122 boundary under the capability-catalog reframing.

---

## Design History (archived)

The full pre-reframe design body — the 2026-06-19 base outline, the Problem Statement / Portability / Goals / Proposed Architecture / Key Design Decisions, the 14-phase Implementation Estimate, the agent-prompt-routing analysis, the **119-A/119-B split decision**, the **R2 Review Resolutions (R1–R10)**, and the **inbound 117/118/121 reconciliation** — has been moved verbatim to:

- **`archive/design-outline-history.md`**

It was **moved, not deleted** (also fully retained in git history). The move ends the re-bannering accretion: instead of stacking a third "authoritative / supersedes below" banner over a ~760-line body, the authoritative through-line (the AXA Reframe above) now stands alone, and the superseded body is clearly labeled history.

**Where the still-live content went:**
- The **settled decisions** (uniform `id`, mass-rename in-scope, Documentation Directory dropped, staleness-out-of-scope, the relocation-integrity gate, `aliases` seeding, logical cross-refs, the `none`-handling calibration extension) are all formalized in **`119-A/requirements.md`** — that is their authoritative home now, not the archived R2 Resolutions narrative.
- The **AXA model** (five ambient classes, the severable seam, generate-don't-curate, the silent-failure discriminator) is authoritative in **`119-A/agent-experience-architecture.md`**.
- The **through-line, coupling inventory, and pillar mapping** are the AXA Reframe section above.
- The **case-study / measurement** material and the **119-B routing** material remain *deferred* (119-B); the archive preserves their design notes until 119-B is worked.

> **Structural follow-up (still flagged, NOT done):** rename the spec folder `119-steering-progressive-disclosure-redesign` → `119-agent-experience-architecture` to reflect AXA. Deferred to avoid path churn mid-draft (it would move this outline, the archive, and the inbound files, and touch every cross-reference into the folder). Track as a single atomic rename when 119 next has a quiet moment.
