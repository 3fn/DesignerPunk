# 119-B Scope Pass — Verification Matrix & Scope Adjudications

**Date**: 2026-07-16
**Author**: Main loop (Opus 4.8), commissioned by Peter; adjudication handed to Thurgood
**Status**: RATIFIED (Peter, in-session, 2026-07-16 — see Part 7 for the ratification record, incl. the A1 amendment). Formalization may open `requirements.md` against this document.
**Purpose**: Pre-formalization reconciliation for 119-B. Three of 119-B's stated dependencies (121, 122, 118) completed after the design outline was written (2026-06-27), and two new constraints (the classification-map register; 125-B's live observation window) postdate it. This document (a) verifies every load-bearing dependency claim against ground truth, (b) records found drift, and (c) frames the scope decisions formalization must settle. `requirements.md` formalizes against THIS document, not against the unverified inbounds.

> **Scope pointer (G2)**: 119-B's deliverables are the four named by the design outline's AXA pillar mapping (authoritative: `design-outline.md` § "Pillar mapping"): (1) the generated per-agent **capability catalog**, (2) **routing tables reframed task→capability**, (3) **certainty-calibration formalization**, (4) the **before/after measurement case study** — plus the OPEN ledger obligations OB-1–4 (OB-1's in-spec placement settled in Part 7). This paragraph names the scope; it does not restate it — the outline governs. Post-122 delta per deliverable: Part 7.2.

> **Verification stance** (agreed with Peter, 2026-07-16): probe ground truth, don't re-read documents; calibrate depth to what is mechanically guarded — re-verify by hand only where no guard enforces the claim. Every entry below is classed:
> - **VERIFIED-GUARDED** — true on 2026-07-16 AND a mechanical guard (CI check, diff-guard, sweep) actively maintains it. Trust through execution.
> - **VERIFIED-UNGUARDED** — true on 2026-07-16, nothing maintains it. Cite with date; **re-probe at the task that consumes it.**
> - **DRIFTED** — the source document's claim no longer matches ground truth; correction recorded here.
> - **GAP** — something the inbounds assume exists but doesn't yet.

---

## Part 1 — Verification Matrix (probes run 2026-07-16)

| # | Claim | Source | Probe | Result | Class |
|---|-------|--------|-------|--------|-------|
| V1 | `find_docs` emits `matchConfidence: strong\|partial\|none`, with `viability` + `rank` separate | inbound-from-121 §1 | Live `find_docs({concept:"token governance"})` | ✓ Field present, tiers correct, never collapsed | VERIFIED-GUARDED (121's shipped contract + rubric guard test) |
| V2 | OB-7 CLOSED — CC always-layer generated; interim CLAUDE.md retired | 119-B-deferred-obligations | `head CLAUDE.md` | ✓ Generated banner (122 C11 lane 1), 9 identity `@`-imports; calibration rule verified reaching a live CC session via imports | VERIFIED-GUARDED (diff-guard covers CLAUDE.md) |
| V3 | OB-8 CLOSED — zero stale `not-yet-ported` | ledger + 122 task-18 completion | `grep -rn 'not-yet-ported' .claude/agents/*.md` | ✓ 0 hits; C7(b) strict-check + prove-it-bites test confirmed in task-18 completion | VERIFIED-GUARDED (C7(b) FAILs stale dispositions) |
| V4 | OB-9 CLOSED — owner audit done | ledger + 122 task-18 completion | Read task-18 completion | ✓ Audit recorded incl. Leonardo-boundary ruling (owner=lina, lock=leonardo), Peter-confirmed | VERIFIED-GUARDED (owner∈known-map check per OB-9 fix note) |
| V5 | Generator guard surface green | 122 handback | `npx tsx tools/agent-generator/diff-guard.ts` | ✓ `full-run-green`; all 8 agents + attribution files present | VERIFIED-GUARDED (PR-gate required checks) |
| V6 | OB-1 premise: bare-`id` cross-refs invisible to enumeration | ledger OB-1 | `list_cross_references('token-governance')` vs `grep -oE '\]\([a-z0-9-]+\)' governance/Token-Governance.md` | ✓ **Still real**: tool returns 2 legacy `.md` refs; doc body carries 8+ bare-`id` links, none enumerated. Index-wide crossReferences=116 (consistent with ~226 invisible) | VERIFIED-UNGUARDED — re-probe at OB-1's task |
| V7 | OB-3 premise: alias backstop present, prune candidates exist | ledger OB-3 | `grep -rln 'family work\|token work' governance/` | ✓ 30 docs carry the backstop aliases | VERIFIED-UNGUARDED — the prune task re-inventories |
| V8 | 118 hand-off 1 target resolves | inbound-from-118 | `get_section({path:'rosetta-system-architecture', heading:'Module-Resolution Contract (Spec 118)'})` | ✓ Resolves via bare-`id`, s21, full content | VERIFIED-UNGUARDED (heading rename would break silently; positional sectionId caveat per 121 Gap 7) |
| V9 | 118 hand-off 2 (identity pointer) | inbound-from-118 | Inspect DesignerPunk-Systems-Overview | ✓ **Already done** — "Pointer 1: Module-Resolution Contract" is live. Hand-off 2 is DISCHARGED; only hand-off 1 (routing rows) remains for 119-B | DRIFTED (inbound describes it as pending) |
| V10 | Frozen oracle usable as the non-circular "before" anchor | ledger IN-1 | `find . -name '*oracle*'`; read header | ✓ Exists, frozen-fixture header intact (incl. the never-re-wire-as-navigation warning); harness `scripts/discovery-dry-run.ts` present | VERIFIED-UNGUARDED — but see D2: **the ledger's path is wrong** |
| V11 | Classification-map register live, citable | inbound-from-125-B §2 | Read `governance/classification-map.md`; `find_docs` | ✓ MCP-indexed, healthy (83 docs / 2,805 sections); entry grammar as described | VERIFIED-GUARDED (sweep-1 grammar verification per inbound) |
| V12 | 125-B window OPEN, dataset checkable | inbound-from-125-B §1 | `find .kiro/specs/125-B-classification-map -iname '*window*' -o -iname '*dataset*'` | ✗ **No dataset file exists.** Window is open per the inbound, but there is nothing mechanical to check | **GAP — see A2** |

## Part 2 — Drift log (corrections; the compass check's yield)

- **D1 — OB-2 count: 176 → 160.** `grep -rn 'path: "\.kiro/steering' governance/ | wc -l` = 160 on 2026-07-16 (281 total `.kiro/steering/` mentions). The corpus moved since June. **Rule inherited by requirements: point-in-time counts in the ledger/inbounds are never load-bearing — the consuming task re-measures.**
- **D2 — IN-1's oracle path is stale.** Ledger says `.kiro/specs/119-A-steering-relocation-serving-contract/scripts/__fixtures__/discovery-oracle.ts`; the file actually lives at **`scripts/__fixtures__/discovery-oracle.ts`** (repo root), harness at **`scripts/discovery-dry-run.ts`**. The 119-A spec dir has no `scripts/` at all. Anyone following the ledger pointer hits nothing. *Correction recorded here; optionally patch the ledger's IN-1 in the same PR that lands this document.*
- **D3 — Register: 10 → 11 entries** since the 125-B inbound (2026-07-14). Confirms the register is actively accreting; 119-B cites entries by entry-id, never by count or position.
- **D4 — Hand-off 2 already discharged** (see V8/V9): the identity-layer pointer landed at some point after the inbound was written. 119-B's 118 obligation reduces to hand-off 1 (routing rows), delivered as 122 canonical-source edits.
- **D5 — `list_cross_references` addressing quirk**: accepts bare-`id` (`token-governance`) but rejects the relative path (`governance/Token-Governance.md` → FileNotFound). Not a break, but the tool's addressing contract should be normalized as part of OB-1's done-when.
- **Noted in passing (not 119-B's, routed):** the 122 closeout's sweep-5 protection-list removal is a pending Peter Settings action; five stale `.claude/worktrees/` copies await the monthly Civitas sweep; the 119 folder rename (→ `119-agent-experience-architecture`) remains flagged-not-done — 119-B formalization is the "quiet moment" candidate the outline asked for.

## Part 3 — Adjudications (Thurgood rules, Peter ratifies; recommendations are the main loop's, marked as such)

### A1 — OB-1 (cross-ref parser `id`-awareness + scanner repoint): sever or keep in 119-B?

**The question.** OB-1 is self-described "net-new indexer architecture" (two-pass index or query-time resolution on a load-bearing property-tested parser). Every other piece of 119-B is routing/measurement/governance work. Do they share a spec?

**Main-loop recommendation: SEVER** — make OB-1 its own unit or micro-spec, sequenced independently. Rationale: (a) different risk profile — indexer engineering vs. canonical-source edits + measurement; (b) no dependency — the capability catalog, routing, calibration formalization, and case study none of them consume cross-ref *enumeration* (discovery runs on `find_docs`; resolution works today); (c) bundling risks the pillar's actual point (routing + measurement) waiting on parser plumbing; (d) precedent — the severable seam was 119-A's own critical design move (cf. OB-1's "surfaced" note: pulling indexer work forward was already declined once at the 119-A gate).
**Counter-argument (recorded per AI-Collaboration-Principles):** OB-1–4 were handed as a set and are all "Docs-MCP infra owned by Thurgood"; severing creates a fourth open work-stream in an already-parallel landscape (125-B ∥ 119-B ∥ 123), and OB-1 is the *only* remaining consumer of the OB-1-bundled scanner repoint — severing risks it becoming permanently deferred. If severed, it needs a named owner-and-trigger, not a backlog line.
**If severed:** OB-2 (snippet sweep), OB-3 (alias prune), OB-4 (threshold decision) stay in 119-B — they are measurement/corpus work, not indexer work.

### A2 — 125-B window coordination protocol (given V12: no dataset exists to check)

**The constraint (ratified, binding):** any merged change to the pruned rule's surfaces, or a 122 regen affecting them, SEGMENTS the window; >K=3 re-baselines before close → STOP, escalate to Peter as corpus-volatility. 119-B's propagation mechanism *is* 122 regen.

**Main-loop recommendation — bake into requirements as ACs, not prose:**
1. **Batch canonical edits**: 119-B tasks that touch canonical agent source MUST batch their edits so qualifying regens are few and deliberate — target ≤2 qualifying regens across 119-B's execution while the pilot window is open.
2. **Pre-regen gate**: before any regen that plausibly touches the pruned rule's surfaces (`thurgood.md` / `CLAUDE.md` per Appendix A1 of the measurement protocol), confirm window state. **Until the U1-c dataset exists, the check is procedural, not mechanical: ask Peter / the 125-B session.** When the dataset lands, the check is: read it, count segments.
3. **Count what we cause**: each qualifying regen 119-B triggers is logged (task completion doc) as an expected segment event — segmentation is the design working, but the count must be auditable against K=3.
4. **Ordinary spec-work PRs are welcome**: 119-B's own `task/*` PRs COUNT toward the window's N=20 — no need to throttle normal work; it's specifically regens that batch.

### A3 — Register row for the certainty-calibration rule

**The obligation (from the 125-B inbound §2, methodology settled):** the strong/partial/none rule gets a `governance/classification-map.md` row through the settled methodology — boundary call, verification disposition + owner, education disposition — NOT parallel structure. 125-B's non-binding read: education-owned judgment, likely `education: KEEP` with `verification: none` or a narrow operational hook; template = the `record-first-ratification` entry (multi-surface education-heavy rule).
**Main-loop recommendation:** make the register row an explicit early task in 119-B (it forces the boundary call that shapes how the rule is phrased across surfaces), authored per the steward-writes-register convention (domain owner drafts, Thurgood audits + lands). Any prose restructuring of the always-loaded calibration text records per-surface blade verdicts if it prunes (`pilot-row-assessment.md` is the worked example) — the AI-Collaboration-Principles forward-compat note promises 119-B *refines rather than rewrites*; hold to that.

## Part 4 — Standing constraints 119-B formalization must carry (settled law, verified live)

- **Prune methodology binds prose edits** (125-B design §2, merged): CI validates function, never ideology; education and verification are complementary; two-bladed imposter test with illustrative-use + clause-grain sub-rules.
- **Generator mechanics** (verified V5): regen `npx tsx tools/agent-generator/generate.ts`; sweep-1 `npx tsx tools/agent-generator/sweeps/sweep-1-refs.ts`; diff-guard `npx tsx tools/agent-generator/diff-guard.ts`. `canonical/registry` + 8 other roots are diff-guard-protected — never hand-place artifacts.
- **Measurement anchor rules** (IN-1, amended by D2): the before/after case study anchors on the frozen oracle at `scripts/__fixtures__/discovery-oracle.ts` + harness `scripts/discovery-dry-run.ts`; the 94% rank-1-strong figure includes the Task 10.4 title tie-breaker — attribute lift accordingly (floor 54.2% → aliases → tie-breaker 94%); the oracle must NEVER be re-wired as a navigational doc.
- **OB-4 input** (verified reachable): the threshold decision (rank ≤ 2 vs reachable-at-strong) is 119-B's to record with rationale — Decision 4's own reachability emphasis is the frame.
- **Conventions under load** (125-B inbound §4): steward-writes-register; record-first ratification works in-session; verify the record's *tail*, not status headers.
- **Sequencing**: umbrella order is 125-A → 122 → (125-B ∥ 119-B) → 123 — 119-B runs PARALLEL to 125-B, hence A2.

## Part 5 — What this document is NOT

Not requirements, not design, not a feedback doc. It is the verified substrate formalization builds on. Adjudications A1–A3 need Thurgood's ruling and Peter's ratification before `requirements.md` opens. Per the Spec Feedback Protocol, formal feedback rounds attach to the spec artifacts once they exist; this document is upstream of that cycle.

---

## Part 6 — Thurgood Adjudication [THURGOOD R1]

**Date**: 2026-07-16 · **Status of all rulings below: PENDING PETER RATIFICATION.** These are my rulings as owner of OB-1..4 and Docs-MCP infrastructure; none takes effect until Peter ratifies. Per the Spec Feedback Protocol this document is upstream of the formal artifact feedback cycle — this section is the adjudication record the scope pass called for in Part 5.

### A1 ruling — SEVER OB-1 from 119-B, with four conditions

**Ruling: SEVER.** OB-1 (cross-ref parser `id`-awareness + the bundled scanner repoint) leaves 119-B and becomes its own micro-spec/unit. OB-2, OB-3, OB-4 stay in 119-B (they are corpus/measurement work, per the main-loop's split — I concur).

**Rationale.** (a) The consumption test is decisive: I verified against the design outline's pillar description that none of 119-B's four deliverables (capability catalog, task→capability routing, calibration formalization, measurement case study) consumes cross-ref *enumeration* — discovery runs on `find_docs`, resolution works today (V6 confirms refs resolve; only the report under-counts). (b) OB-1 is self-described net-new indexer architecture (two-pass index or query-time resolution on a load-bearing property-tested parser) — a different risk profile and a different reviewer set than routing/measurement work; bundling it would distort 119-B's feedback rounds. (c) The severable seam is 119's own precedent: pulling this work forward was already declined once at the 119-A gate (Peter-confirmed 2026-06-29). Holding the routing+measurement pillar hostage to parser plumbing is exactly the failure mode the seam exists to prevent.

**Conditions (the counter-argument's permanent-deferral risk is real — these are the mitigation):**
1. **Named home + owner now**: the severed unit is a micro-spec owned by me (Thurgood / Docs-MCP infra), created as a spec stub at ratification — not a backlog line.
2. **Standing trigger**: until it lands, the OB-1 under-count is a **named recurring entry in the monthly Civitas governance health-check findings** — it directly degrades my own health-check tooling (`scan-cross-references.sh` still covers only 9 docs post-relocation), so the cost surfaces on cadence rather than relying on memory. Sequencing recommendation: schedule after 119-B formalization ratifies.
3. **The bundle moves whole**: parser `id`-awareness + scanner repoint travel together per Peter's ratified routing (2026-07-05, 122 Req 25 AC2). D5 (the `list_cross_references` addressing-contract normalization) rides with it, per this document's own note.
4. **Re-probe at start**: V6 is VERIFIED-UNGUARDED; the severed spec re-probes the premise (and re-counts the invisible-ref population) at its first task, per Part 1's class rule.

**Counter-argument (recorded per AI-Collaboration-Principles).** The strongest alternative is not "keep bundled loosely" but **keep OB-1 inside 119-B as its own DECLARED merge unit** (Task-Completion-Protocol coherent units), sequenced last and non-blocking — that keeps the OB-1..4 set under one spec umbrella, avoids a fourth parallel work-stream (125-B ∥ 119-B ∥ 123 + the severed unit), and still can't hold the pillar hostage because units merge independently. I rejected it because it muddies the spec's identity and its reviewer set (parser architecture reviewers ≠ routing/measurement reviewers), and because "non-blocking last unit inside a spec" is historically where work goes quiet — a named micro-spec with a health-check trigger is more visible than a trailing unit. But it is a credible option if Peter weighs stream-count over spec coherence.

### A2 ruling — ADOPT the four ACs, with two amendments

**Ruling: ADOPT** the main-loop's four points as requirement-level ACs, phrased **state-driven** (EARS: "WHILE the 125-B pilot observation window is open…"), with these amendments:

1. **Explicit sunset**: the ACs self-expire at U1-c window close. The inbound §5 notes the closeout verdict may adjust 125-B↔119-B coordination — so the ACs must be scoped to the open window, not carried as dead procedure into a post-window world. If the window closes before 119-B execution starts, the ACs are vacuously satisfied.
2. **Single-location regen log**: point 3's per-completion-doc logging scatters the K=3 audit across documents. Amend to: each qualifying regen logs in the task completion doc **and** appends one line to a 119-B-local running log (`.kiro/specs/119-.../regen-log.md` or equivalent), so the count is auditable against K=3 in one place. (119-B-local, not a 125-B file — we don't write into 125-B's working docs.)
3. **Interpretation question to settle at ratification (feeds the regen budget)**: the pruned rule's surfaces per Appendix A1 are `thurgood.md` / `CLAUDE.md` — but `CLAUDE.md` delivers via `@`-imports, so **an edit to `AI-Collaboration-Principles.md` changes what `CLAUDE.md` delivers without any regen**. Does such an edit segment the window? This matters because A3's downstream prose refinement touches exactly that file. I flag it for the 125-B session/Peter rather than ruling — it's their protocol's interpretation, not mine.

**Counter-argument.** Requirement-grade ACs are heavy for a temporary coordination courtesy; the window may fill (N=20) before 119-B execution even begins, making the ACs dead-on-arrival — a design.md standing constraint + task notes would be lighter. I adopted ACs anyway because K=3 escalation is ratified, binding law with a real failure mode (corpus-volatility escalation), and V12 shows there is currently **nothing mechanical to check** — procedural discipline encoded as ACs is the only guard we have until the U1-c dataset exists. The sunset amendment caps the cost of being wrong.

### A3 ruling — ADOPT: register row as an explicit early task

**Ruling: ADOPT.** The register row for the certainty-calibration rule is an explicit early task in 119-B, adjudicated through the settled methodology (boundary call → verification disposition + owner → education disposition), templated on the `record-first-ratification` entry, never parallel structure.

**Rationale.** The sequencing is the point: the row forces the boundary call *cheaply* (a `governance/classification-map.md` edit — NOT one of the pruned rule's surfaces, so it does not touch the 125-B window), while the surface prose edits it shapes are batched later under A2's regen discipline. A1→A3 ordering interacts correctly: row early and window-free; prose refinement late and batched. The forward-compat promise binds: 119-B *refines rather than rewrites* the always-loaded calibration text, with per-surface blade verdicts recorded if anything prunes (`pilot-row-assessment.md` as the worked example).

**Convention note (flag, not a change)**: steward-writes-register says domain owner drafts, Thurgood audits + lands. The calibration rule is a governance-layer rule — per Civitas-System-Overview I own both content and infrastructure for governance-layer docs, so drafted-by and landed-by **degenerate to the same agent** for this row. The two-role separation is the convention's safeguard; to preserve a second eye, I recommend either Peter's ratification of the row explicitly serve that function, or a light Ada/Lina review (the rule binds all agents' discovery behavior, so they have consumer standing).

**Counter-argument.** Deferring the row until the calibration formalization is actually drafted would let the boundary call be made with full information — an early row risks re-adjudication churn if formalization shifts the rule's shape. I rejected deferral because the register accretes and rows are amendable (D3 shows it's actively growing), the row's boundary call *shapes* the formalization rather than the reverse, and 125-B's non-binding read (education-owned, likely `education: KEEP` / `verification: none`) suggests low re-adjudication risk.

### Gap audit — findings

**G1 (substantive — the one gap that must be closed before requirements): the scope pass verifies 119-B's dependencies but is silent on the post-122 state of 119-B's first two pillar deliverables.** The design outline defines 119-B as: capability catalog, task→capability routing reframe, calibration formalization, measurement case study. Items 3 and 4 are thoroughly covered (V1/V10/IN-1/OB-4/Part 4). Items 1 and 2 are not probed at all — and they are exactly where post-122 drift is likeliest: 122's generator already emits per-agent routing sections and command/capability content from the five-class ambient design. The design outline itself lists "the 119-B/122 boundary under the capability-catalog reframing" as an open question, and this document doesn't advance it. **What formalization needs to know: is the catalog/routing work net-new, or an audit + reframe of what 122 already generates?** Disposition options: (a) add a probe pass (V13+) establishing what the generator currently emits per class, or (b) make "post-122 delta audit of catalog + routing state; define 119-B's delta" the explicit **first task** of 119-B, consistent with the D1 re-measure rule. I recommend **(b)** — cheaper, and the answer is itself formalization-shaping work that belongs inside the spec.

**G2 (acceptable as-is, with one line added): the deliberate omission of a scope statement.** Part 5's "not requirements" stance is right in general, but given G1 — the un-restated pillar scope is precisely where the coverage hole sits — the document should carry a **one-paragraph scope statement** naming the four pillar deliverables and pointing at the design outline as authoritative, so `requirements.md` formalizes against a document that at least names its own scope. A pointer, not a re-statement; this section's G1 entry plus that paragraph closes it.

**G3 (housekeeping): D2's ledger correction should actually land.** The scope pass says "optionally patch the ledger's IN-1 in the same PR" — make it non-optional. A ledger pointer known-wrong and left in place is exactly the stale-address class this spec family exists to kill. (I have not edited the ledger, per my commission; the patch belongs to the PR that lands this document.)

**G4 (loose ends, one-line dispositions needed): two inbound items are un-routed by the scope pass.** (a) inbound-from-121 §3 — the Documentation-Directory amendment ("revisit in light of `find_docs`"): almost certainly discharged by 119-A's requirements (Documentation Directory dropped), but the discharge should be *stated*, not assumed. (b) inbound-from-117's filed issue (`mcp-semantic-resolvedvalue-ignores-mode-overrides`) — flagged "likely 119/121-adjacent"; my read: NOT 119-B (Application-MCP token-index format → Ada-adjacent), but it needs a recorded routing so it stops dangling in this spec's inbounds.

**G5 (noted, no action): window-interaction between A2 and A3** is captured in A2 amendment 3 above — recorded here so the gap list is complete.

### Recommended next step

Peter ratifies A1 (sever, four conditions), A2 (ACs + sunset + regen log + the Appendix-A1 interpretation question), A3 (early register-row task + the second-eye note), and the G1 disposition (delta-audit-as-first-task vs. probe pass). On ratification: patch the ledger's IN-1 path (G3), add the one-paragraph scope statement (G2), record the two G4 dispositions — then `requirements.md` opens against this document.

---

## Part 7 — Ratification Record + G1 Delta Audit (Peter / main loop, 2026-07-16)

**Ratification (Peter, in-session, 2026-07-16 — record-first, captured here before any formalization):**

- **A1 — RATIFIED AS AMENDED: OB-1 stays IN 119-B as its own declared merge unit** (Thurgood's recorded counter-alternative, elected by Peter). Rationale: minimizing cross-spec tracking overhead and scoped-vs-implemented deltas outweighs stream-count concerns — the merge-unit mechanism (own branch, own PR, own reviewable diff per Task-Completion-Protocol coherent units) delivers the isolation benefit without a separate spec to track. Thurgood's conditions carry over, adapted: the parser + scanner-repoint bundle (plus D5) moves whole per the 2026-07-05 ratified routing; V6 is re-probed at the unit's first task; the unit is **started early and run in parallel** (it touches only mcp-server indexer code — zero window or corpus interaction) so it cannot become the trailing quiet unit Thurgood warned about. If it stalls, descoping is a recorded decision, not a silent drop — and as an in-spec unit, a stall visibly blocks 119-B closeout rather than fading from view.
- **A2 — RATIFIED with both Thurgood amendments** (sunset at U1-c window close; single 119-B-local regen log). The interpretation question (A2 amendment 3) is **RESOLVED BY EVIDENCE, no ruling needed** — see 7.1.
- **A3 — RATIFIED.** Register row as an explicit early task. Second-eye mechanism: Peter's ratification of the row serves the function (a light Ada/Lina consumer review remains formalization's option).
- **G1 — RATIFIED AS AMENDED: the delta audit ran NOW, pre-formalization** (Peter's call, consistent with Thurgood's own "must close before requirements"). Results: 7.2. "Delta audit as spec Task 1" is superseded — requirements formalize against 7.2 directly.
- **G2** — scope pointer added (header block above). **G3** — ledger IN-1 patch made non-optional; applied with this revision. **G4** — dispositions recorded: (a) inbound-from-121 §3's Documentation-Directory amendment is **DISCHARGED by 119-A** (the Documentation Directory was dropped; `find_docs` subsumes it — stated here so the discharge is a record, not an assumption); (b) inbound-from-117's `resolvedValue` issue is **routed to Ada** (Application-MCP token-index format work, not 119-B; the issue file remains the tracking artifact).

### 7.1 — The A2 interpretation question: answered by Appendix A1 itself (probe, 2026-07-16)

The measurement protocol's **Appendix A1 (FILLED 2026-07-14, self-described authoritative)** enumerates exactly four trigger surfaces: `.kiro/steering/Task-Completion-Protocol.md`, `governance/Process-Development-Workflow.md`, `.kiro/steering/start-up-tasks.md`, `.claude/agents/thurgood.md` (regen-slaved to #2). Consequences:

- **`AI-Collaboration-Principles.md` is NOT a trigger surface.** Editing the calibration prose does not segment the window. The question falls away.
- **D6 (drift, recorded)**: the 125-B inbound §1 named "`thurgood.md` / `CLAUDE.md`" as the surfaces; the authoritative A1 list does **not** include `CLAUDE.md`. A1 governs.
- **Caveats binding 119-B's plans**: (i) Task-Completion-Protocol and start-up-tasks ARE surfaces — *any* merged change to them segments (per §5.3, not just A2-pattern re-accretion); if 119-B prose work touches them, those edits join the batched-regen unit. (ii) **OB-2 ∩ A1**: `Process-Development-Workflow.md` is a governance doc the OB-2 snippet sweep may edit — requirements carry a one-line AC: check it for legacy snippets; if present, fold that file's edit into the batched-regen PR or defer past window close. (iii) A regen segments only if **`thurgood.md`'s output actually changes** — budget one segment event for the batched canonical edits; well inside K=3.

### 7.2 — G1 Delta Audit: post-122 state of the four pillar deliverables (probes 2026-07-16)

| Deliverable | Post-122 state | 119-B's remaining delta |
|---|---|---|
| **1. Capability catalog** | **Mechanism + baseline content DELIVERED by 122.** Every generated prompt carries `## Routing` (doc routes / agent routes / tool cues), `## Commands` (named entries with run contexts + gap entries), `## Knowledge fallback`, `## Write scope`, `## Pre-flight`; schema support: `Routes{docs,agents,cues}`, `CommandEntry`, `SkillRef`, `GroundTruthManifest` (`tools/agent-generator/schema.ts`). 248 routing rows across 8 agents (ada 35, data 21, kenya 23, leonardo 42, lina 49, sparky 22, stacy 29, thurgood 27) | **Audit + content refinement, NOT build.** Coverage/quality pass over generated content; any catalog additions are canonical-source edits through the generator |
| **2. Task→capability routing reframe** | **Form ALREADY task→capability** (`WHEN <task condition> THEN <capability>` — consult doc § / hand off to agent / use tool). Content partial: precision varies — named `doc § "Section"` routes vs. generic "THEN use get_section (docs MCP)" cues with no target named. 118 hand-off 1: **Ada's module-resolution row EXISTS** (ada.md:378, verbatim as inbound-from-118 specified); **Thurgood's (Test-Development-Standards / Civitas close-state) and Lina's (brand-contract pointer) rows ABSENT** | **Gap-fill + precision audit**: land the two missing 118 rows; audit generic cues for promotable precise routes; all via canonical edits, batched per A2 |
| **3. Certainty-calibration formalization** | **NOT delivered per-agent**: zero hits for `matchConfidence` / strong-partial-none across all 8 generated prompts. The rule reaches CC only via `CLAUDE.md`'s `@`-import of AI-Collaboration-Principles (V2) | **Fully 119-B's**: register row (A3, early, window-free) → refined prose in AI-Collaboration-Principles (refine-not-rewrite; not a window surface per 7.1) → any per-agent propagation rides the batched regen |
| **4. Measurement case study** | Not started (it is a study). Anchors verified: frozen oracle + harness (V10, D2-corrected paths); IN-1 attribution rule stands | **Fully 119-B's**: run before corpus churn (ordering below) |

**Boundary answer** (closes the design outline's open question "the 119-B/122 boundary under the capability-catalog reframing"): **122 owns the mechanism and delivered the baseline content; 119-B is a content-layer spec that operates THROUGH the generator** — canonical-source edits + batched regen + measurement. No new generator machinery is in 119-B's scope.

### 7.3 — Ratified execution ordering (formalization's tasks.md declares units against this)

1. **U1 — window-free paper decisions**: A3 register row + OB-4 threshold decision.
2. **U2 — measurement case study** (read-only): run BEFORE corpus churn so the "after" state is attributable to 119-A (else OB-3's prune contaminates the measurement).
3. **U3 — corpus changes, measured**: OB-3 alias prune (gated by dry-run re-run) → OB-2 snippet sweep (re-count at task start per D1; Process-Development-Workflow carve-out per 7.1.ii).
4. **OB-1 unit — parallel, started early** (per A1-as-ratified): indexer work only; re-probe V6 at first task; D5 rides along.
5. **U-final — batched canonical edits + regen**: capability-catalog refinements + the two 118 routing rows + calibration propagation + any A1-surface prose edits, targeting ONE regen event (budget per 7.1.iii), logged per A2's regen log.

**Window synergy (deliberate, not incidental)**: 119-B's ordinary `task/*` PRs COUNT toward the pilot window's N=20 close condition — front-loading the window-free units actively fills the window, so it may close naturally before U-final, making segmentation moot and the A2 ACs vacuously satisfied (their designed sunset).

**Next step**: Thurgood opens `requirements.md` against this document (sequential formalization gate applies: requirements → feedback → design → feedback → tasks → feedback).

---

**Probe log** (repeatability): Part 1/2 probes run 2026-07-16 on `main` @ `712c64e5`, docs-MCP index of 2026-07-17T00:55Z (healthy); Part 7 probes (Appendix A1 read; generated-prompt structure/content greps; schema.ts inspection; per-agent route counts) run 2026-07-16 on the same tree. Commands inline in the entries.
