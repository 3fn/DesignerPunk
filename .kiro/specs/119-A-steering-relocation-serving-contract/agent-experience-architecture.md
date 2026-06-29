# Agent Experience Architecture (AXA) — Draft

**Status**: 🟡 **DRAFT.** Two confidence tiers, deliberately separated (per R3 feedback):
- **Vocabulary = authoritative.** The class names and the discriminators are settled enough to use consistently across the spec family.
- **Architectural bets = provisional.** The manifest pillar, the formative class, and the per-agent cuts are hypotheses pending 119-A/119-B validation. §8 ("Open Questions") is load-bearing — read it before treating any *bet* here as decided.

**Naming**: **AX = Agent Experience** (industry-aligned, analogous to UX/DX) — we do not redefine it privately. **AXA = Agent Experience Architecture** (this doc / the reframed Spec 119). Context composition is **one pillar** of AXA, not the whole.
**Date started**: 2026-06-27 · **Revised**: 2026-06-28 (folded in the full-roster feedback round: Ada, Lina, Thurgood, Leonardo, Sparky, Kenya, Data, Stacy).
**Provenance**: Spec 119, reframed around this architecture (Option A) — 119-A / 119-B / 122 are its pillars.
**Graduation path**: once 119-A/119-B validate it, this becomes a governance steering doc (`Agent-Experience-Architecture.md`), Thurgood-owned, `id`-addressed.

---

## 1. Thesis

Agents reason worse with a large volume of mostly-irrelevant context than with a small volume of signal. The original steering system bulk-loaded ~89 docs (~300K+ tokens) into every session. **Progressive disclosure** is the corrective: load only what shapes *this* agent on *every* task; serve the rest **on-demand**. The strategic pivot is from a **content-map model** (a hand-maintained "what docs exist and where" directory) to a **tools-based model**. **Central risk:** on-demand only works if the agent (a) knows it has a question and (b) knows the instrument that answers it — trim ambient context without preserving those and you build a library with no card catalog.

---

## 2. The Core Model: Ambient vs On-Demand

| Ambient (always-loaded) | On-demand |
|---|---|
| **Formative** — values/relationship/disposition | Reference docs (Docs MCP: `find_docs`/`get_section`) |
| **Reflexive principle** — applied every task | Structured data (Application MCP: tokens/components) |
| **Governance-as-law** — continuously applied | Ground-truth **source** (Read/Glob/Grep) |
| **Ground-truth manifest** — compact "what exists" | Commands (run when the task calls for it) |
| **Capability catalog** — tools + commands + cues | Computed audits (scripts over the corpus) |
| | **Skills** — procedural packs, harness-surfaced-on-match |

The right column is reachable *because* the left tells the agent it exists and how to reach it. That coupling is the whole game. **Note the asymmetry the feedback round forced:** these classes were first derived from three *owner* agents (Ada/Lina/Thurgood); they generalize, but two classes behave differently for **consumers** and **auditors** (see §3.4, §7).

---

## 3. The Ambient Classes — Definitions

### 3.1 Formative
Shapes **who the agent is and how it relates** — not what it does. **Inhabited, not consulted**: no task triggers fetching it, so it is either ambient or effectively absent. Canonical: `Personal Note.md`. Discriminator: `Relevant Tasks: all-tasks` = "triggered by no specific task" = can only be ambient. It is the **purest** must-be-ambient case — nothing would ever call it on-demand.

### 3.2 Reflexive principle
Behavioral principles applied **reflexively, every task** — the collaboration spine. Canonical: `AI-Collaboration-Principles.md`. Its expanded sibling `AI-Collaboration-Framework.md` is **reference** (on-demand) — Principles is a deliberate Layer-1 compression that points to it.

### 3.3 Governance-as-law
A standard applied continuously where **on-demand fails *silently*** — the agent would violate the rule without realizing there was one to query.
- **The silent-failure discriminator (the load-bearing test):** keep ambient **iff** the on-demand failure is silent. *Reflexively-applied* law stays; *consciously-invoked* methodology trims (you know when you started an audit; you don't know when you're about to violate a naming law).
- **Empirically supported (R3 A/B pilot, 2026-06-28):** on-demand fetching **under-fires** — agents judge the spine sufficient and don't pull, even when prompted toward depth. That under-firing is *exactly why* law must stay ambient (you can't rely on the pull) and why reference can trim (the spine suffices). See `content-framing-discoveries.md` D2.
- Worked law: Ada → `Token-Governance`; Lina → `Contract-System-Reference` Concept Catalog (**not** served as App-MCP data, so a wrong contract name fragments the taxonomy silently); Thurgood → `Test-Development-Standards`; Sparky → `Web-Authoring-Standards`; Leonardo → `Cross-Platform vs Platform-Specific Decision Framework`.

### 3.4 Ground-truth manifest
A **compact, generated** inventory of what actually exists, ambient for **divergence detection** — *not* the full source. **But this class is owner-shaped; it does not generalize to consumers (see §5.2), and for some owners it may be unnecessary (tokens):**
- **Lina (genuine win):** `get_component_catalog` *is* the manifest, replacing a force-load of `src/components` (**~6.3MB / ~135,000 lines / 694 files** — verified 2026-06-28). Components had **no** cheap on-demand enumeration, so the manifest earns its place. *Faithfulness caveat:* her real divergence check is **assembly-grain** (`get_component_full` + `get_component_health`), not catalog enumeration — §8.1's "index faithful" rests on that grain.
- **Ada (manifest may be unnecessary):** `search_tokens` / `get_token_details` already serve the manifest's payload (name → resolved values + per-platform names) **fresh, on-demand, family-scoped**. A standing ambient token-manifest would duplicate that and re-introduce the §5.3 snapshot anti-pattern. **Default: no standing token-manifest** — trim `src/tokens` (**~1.1MB**, not the "73KB" v1 claimed) to on-demand; make divergence a *computed audit* (source→index script). Token-varying-by-theme is the schema hard case. **Token and component manifests are disanalogous** (components lacked cheap enumeration; tokens have it) — do not generalize "manifest good."
- **Principle — manifest, not directory:** deliver divergence-detection value at ~1/10 the cost; keep full source on-demand. Trim pure *logic* dirs (`src/validators`, `src/generators`) — logic has no divergence story.

### 3.5 Capability catalog
A **generated** map of the agent's **tools + commands + activation cues + skills** — the "verb map" replacing the removed "noun map."
- **The delta over what the harness already provides:** tool *schemas* auto-surface, so the catalog's job is (a) **commands/scripts** (bash instruments — invisible unless named), (b) **role activation cues**, (c) **deferred-tool awareness** (`ToolSearch`), and (d) **skills** (§3.6).
- **Cues must be *triggered*, not permissive (R3 D1).** "Consult X on-demand if warranted" under-fires; frame as `WHEN <condition> THEN pull <doc/section>`. 122 generates triggered cues. (`content-framing-discoveries.md` D1.)
- **Two kinds of routing — don't conflate them (Stacy):** **capability-routing** ("which tool answers this?") is catalog; **jurisdiction-routing** ("whose finding is this / where does it route?") is **governance-as-law** for boundary-sensitive agents (it fails silently — mis-scope a finding and never know).
- **Absorbs** `Agent-Directory`'s routing — generated, not hand-curated. **But "generate, don't *shrink*" for hub agents (Leonardo):** for a router whose primary verb *is* cross-domain routing, the routing table is a first-class capability surface, not residual identity noise.

### 3.6 Skills (procedural capability, surfaced-on-match)
*(New class, surfaced by Kenya & Data.)* Harness-surfaced-on-match procedural packs (e.g. Android's `edge-to-edge`, `adaptive`, `navigation-3`, `theming-styles`) — a **third delivery mode** beyond ambient and agent-pulled-on-demand. For platform/consumer agents this is where the hardest knowledge lives (runtime idioms), and the two-bucket model omitted it. The capability catalog must **enumerate skills + their activation cues**. (The model answers how an agent learns *the design system*; skills are how a platform agent learns *its platform*.)

### 3.7 Boundary case — orientation reference (unresolved)
Some always-set docs (`DesignerPunk-Systems-Overview`, `Civitas-System-Overview`) are *orientation reference* that map to **none** of the five classes cleanly (flagged by Thurgood). For 119-A they are **retained ambient** as minimal orientation (small, cheap), **pending the silent-failure test** — either they justify a sixth "orientation" category or they should trim. Not resolved; tracked in §8.

---

## 4. The On-Demand Classes
Reference docs (Docs MCP); structured data (Application MCP); ground-truth source (Read/Glob/Grep); commands (run when needed); computed audits (scripts produce *fresh* ground truth at audit time); **skills** (surfaced-on-match — §3.6). **Bootstrap requirement:** the capability catalog (§3.5) is what makes this column reachable.

---

## 5. Named Principles

1. **Generate, don't curate.** Ambient maps (catalog, manifest, routing) must be *generated from live source*, never hand-maintained — a hand-curated map *is* a drift surface (the removed directory is the cautionary tale). SSOT = the live registry; 122 generates per-agent artifacts. **Interim invariant (R3):** until 122 ships we hand-edit — so no hand-curated catalog/manifest/routing is committed without a tracked **122-replacement obligation + named owner**, or it becomes the next permanent meta-guide (119-A Req 4 AC8).
2. **Derived index vs ground truth.** An MCP index is a *derived* artifact that can lag. The domain **owner** needs unmediated ground truth — right-sized (a manifest), for divergence-*detection*.
3. **Consumer ≠ owner (R3 — the converse of #2).** A *consumer* of a domain (it owns no source there) has **no divergence-detection duty and no ground-truth-manifest claim** — it trims to the live MCP. This cleanly separates Ada (owns the token pipeline → manifest-or-MCP) from Sparky/Kenya/Data/Leonardo (consume it → MCP, never a `dist/*` snapshot). Worked: all three platform agents' `dist/*` force-loads trim (the MCP dominates them; and two were *stale* — see §8.1).
4. **Computed ground-truth ≠ snapshot.** For audit surfaces, force-loading a snapshot manufactures *stale-authoritative* data. Use on-demand tools that compute fresh; never add corpus snapshots to ambient.
5. **Capability map replaces content map.** Verbs over nouns — smaller, more stable, the navigational key for a tools-based world.
6. **Silent-failure discriminator.** Keep ambient **iff** on-demand fails silently. (Empirically backed — §3.3.)
7. **Triggered cues, not permissive (R3 D1).** On-demand pointers carry a trigger (`WHEN X THEN pull Y`), because on-demand under-fires.
8. **The AX lens (credit: Peter).** MCPs = curated education (school/library); direct access = lived experience; the formative layer = upbringing/values. Complementary; over-rotating to any one is brittle. *Refinement:* force-loaded files are "reference on the desk," not lived experience (agents don't accumulate them across sessions) — the deepest AX invests in **doing + recording**, not force-loading more.

---

## 6. The Three MCPs
**Docs MCP** — governance/steering (the corpus 119-A relocates + `id`-addresses). **Application MCP** — components + tokens (structured-data on-demand; also the derived index of §5.2). **Product MCP** — product screens/tokens (orthogonal to 119-A; indexes `product/`, never steering). See `MCP-Relationship-Model.md`; AXA adds the agent-experience layer on top.

---

## 7. Per-Agent AX (the design surface)
**Formative + reflexive-principle** ≈ universal; **governance-as-law / ground-truth-manifest / capability-catalog / skills** are **role-specific**. Each agent's composition is an individual *design* — but a **generated** one (122 emits/enforces from canonical source; the per-agent design is a one-time pass + **disposable input to 122**, not a maintained artifact). The **8 assessments are enshrined at working grain** in `per-agent-ax-assessments.md` (companion). Highlights, by agent *type*:
- **Owners (Ada/Lina):** law + manifest (Lina) or law + MCP-not-manifest (Ada).
- **Consumers (Leonardo/Sparky/Kenya/Data):** **no ground-truth manifest** (§5.3); trim `dist/*` / consumed source to the MCP; capability-catalog-heavy. **Worked consumer example — Leonardo (architect):** ground-truth-manifest class is *empty*; capability-catalog is *routing-dominant* (routing is his verb → generate, don't shrink). Platform consumers additionally need a **skills** pack (§3.6) and named build/test commands (currently absent).
- **Differential auditors (Thurgood/Stacy):** ground-truth is **computed, not snapshot** — so the **ground-truth-manifest class collapses into the capability-catalog** (the audit commands *are* the provisioning). Both ~85% trimmable. *(Stacy: parity drift is **scheduled**, not latent — even more reason to compute fresh, never snapshot.)*

> **Caveat on "85% trimmable":** that is a **destination, not a current safe cut** — it holds only once the capability catalog exists and routes the trimmed content back reliably. Trimming before the catalog lands is the §1 "library with no card catalog" failure, and it bites consumers/routers hardest.

---

## 8. Open Questions / Where We Might Be Wrong
*Revisit after 119-A/119-B. This section is the point of the doc.*
1. **Ground-truth divergence is mostly *latent* for owners, but *fired* for consumers.** Ada's and Lina's owner-side checks found the index **faithful** (manifest = insurance, not remediation — possibly unnecessary, esp. for tokens, §3.4). But Kenya's and Data's consumer-side probes found `dist/{ios,android}` token output **stale (pre-Spec-094)** — actively contradicting the theming contract. (Routed as a bug, `task_3a3f1cf2`.) So the honest split: for **owners** the manifest insures a non-firing risk; for **consumers** the lesson is *don't force-load the snapshot at all* (§5.3).
2. **The formative class is asserted, not demonstrated** — and it's the class with **no failure signal** (if it does nothing, nothing breaks, so we can never falsify it). Keep it (cheap, can't be on-demand), label confidence *low*, never let it grow.
3. **The AX/experience analogy overstates** force-loaded files (no cross-session accumulation) — promote the §5.8 "reference on the desk" refinement over the headline lens.
4. **"Generate, don't curate" assumes 122 exists** — until it ships we *are* the drift surface we warn against; mitigated only by the interim-expiry invariant (§5.1).
5. **Identity-layer decomposition is fresh and will re-cut** — esp. the §3.7 orientation-reference boundary (Systems-/Civitas-Overview: sixth class, or trim?) and `Core Goals` (formative vs operational).
6. **Thresholds undecided** — dry-run gate threshold, manifest schemas, "how minimal is the minimal catalog."
7. **Sprawl** — this grew mid-119-formalization; the **severable seam** (119-A requirements § "Severable Seam Partition") is the guard, and it now has teeth (the exit gate asserts only the critical-core rows). Watch that the AX *design* (Req 14) doesn't quietly pull *build/generation* across the seam.
8. **The positive half of D1 is unproven** — vague cues under-fire (shown); *triggered* cues firing *better* is the next A/B (`content-framing-discoveries.md`).

---

## 9. Vocabulary Index
**AX** = Agent Experience · **AXA** = this architecture / reframed Spec 119 · **Ambient/always-loaded** vs **On-demand** · **Formative** §3.1 · **Reflexive principle** §3.2 · **Governance-as-law** §3.3 · **Ground-truth manifest** §3.4 · **Capability catalog** §3.5 · **Skills** §3.6 · **Orientation reference** (boundary case) §3.7 · **Silent-failure discriminator** §5.6 · **Consumer≠owner** §5.3 · **Triggered cues** §5.7 / D1 · **Generate, don't curate** §5.1 · **Derived index vs ground truth** §5.2.

---
## Cross-references
- `requirements.md` (119-A) — the implementing requirements (esp. Req 6 always-set overlay, Req 14 AX-design, § Severable Seam Partition).
- `per-agent-ax-assessments.md` — the 8 worked per-agent assessments (Req 14 AC5 input-of-record).
- `content-framing-discoveries.md` — D1 (triggered cues), D2 (on-demand under-fires).

*Revised 2026-06-28 from the full-roster R3 feedback round. The vocabulary is authoritative; the architectural bets remain provisional pending 119-A/119-B validation.*
