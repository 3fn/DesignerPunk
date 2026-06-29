# Agent Content Framing — Discoveries (Draft / Living Log)

**Status**: 🟡 **DRAFT / LIVING LOG** — accumulate framing discoveries here as they surface; promote to a governance standard once validated.
**Date started**: 2026-06-28
**Provenance**: Emerged from the Agent Experience Architecture (AXA) work, Spec 119 — specifically the A/B activation pilot on the AI-Collaboration-Framework trim.
**Purpose**: Capture *how to frame content* so an agent reliably activates it — the **authoring/wording** dimension. This is **complementary to, and distinct from, the AXA architecture** (`agent-experience-architecture.md`).

> **The distinction worth holding:** AXA answers **WHAT** belongs ambient vs on-demand (the five-class model). This log answers **HOW** to word and structure content so the agent actually *reaches and applies* it. You can put a doc in the right tier (AXA) and still have it fail because the *cue* to use it was framed badly (this log). Both have to be right.

> Read these as **discoveries**, evidence-grounded where noted, not settled law. Confidence is stated per item. The "What's untested" section is load-bearing.

---

## D1 — On-demand cues must carry a **trigger condition**, not "consult if warranted"

**Discovery.** An on-demand pointer phrased as soft permission ("consult X on-demand if warranted — your judgment") **under-activates**. Agents default to their always-loaded spine and decline to fetch. A pointer phrased as a **trigger** — `WHEN <specific condition> THEN pull <doc/section>` — is what actually fires.

**Evidence (A/B pilot, 2026-06-28, simulated Thurgood).** We trimmed `AI-Collaboration-Framework` to on-demand and reworded the prompt to "consult on-demand … if warranted." On a task engineered to warrant the Framework's deepest gate, **2/2 runs declined to fetch**, explicitly reasoning "the spine covered it; fetching would be ceremony." The Framework's *own* Reading Priorities are sharper and trigger-shaped — *"WHEN making significant recommendations THEN read: Validation Gates"* — i.e., the doc already knew how to frame the cue; our reword softened a trigger into vague permission.

**Implication.** Every on-demand cue (and every generated capability-catalog entry) should embed the **trigger**: not "for expanded protocols, consult the Framework," but "*WHEN making a significant architectural recommendation → pull the Framework's Validation Gates.*" 122 should generate **triggered** cues, not permissive ones. *Confidence: medium-high (clear directional signal; the "triggered cues fire better" half is not yet directly tested — see What's untested).*

---

## D2 — On-demand fetching structurally **under-fires** (and this *validates* the keep-law / trim-reference cut)

**Discovery.** Agents are biased *against* pulling optional depth. Given a sufficient always-loaded spine, they judge it enough and don't reach for the deeper on-demand doc — frequently *correctly*.

**Evidence.** Same pilot: both B runs produced strong governance assessments from the always-loaded Principles spine alone, without the Framework, and said so deliberately.

**Implication — this is the empirical backbone of the AXA silent-failure discriminator:**
- **Governance-as-law must stay ambient** precisely *because* you cannot rely on the on-demand pull — the pull under-fires, and law that fails to fire fails *silently*.
- **Mere reference can be trimmed** *because* the spine suffices anyway and under-pulling costs little.
So under-firing isn't a bug to fix everywhere — it's the reason the AXA cut is drawn where it is. Fight under-firing only where the content genuinely must fire (then use D1's triggers); elsewhere, accept it (trim) or pre-empt it (keep ambient). *Confidence: medium-high.*

---

## D3 — Compression-with-pointer works for **elaboration**, not for **orthogonal** knowledge

**Discovery.** A Layer-1 compression that points to on-demand depth (Principles → Framework) is a sound trim **when the depth is an *elaboration* of the spine** (more structure, examples, formal templates) rather than *orthogonal* knowledge the spine doesn't imply. For elaboration, the compression carries the substance; the depth only adds formal scaffolding.

**Evidence.** Baseline (Framework ambient) produced the Framework's *formal* structures (tiered Full-Validation with named failure modes + early-warning indicators + rollback; the Alternative Paths Log template). The trimmed runs produced the same *substance* (risk-first reasoning, gating deletion on evidence, decoupling reversible from irreversible) **without** the formal scaffolding — and comparably well. We could **not** construct a task where the spine *genuinely failed*, which is itself the finding: the Framework is elaboration, so the spine suffices and the trim is safe.

**Implication.** Before trimming a doc to on-demand, classify it: **elaboration** (spine suffices → safe to trim; the loss is formal rigor, not correctness) vs **orthogonal** (spine won't cover it → trimming risks a real gap; keep ambient or give it a hard D1 trigger). The trim-safety question is "is this elaboration of something already ambient?" *Confidence: medium (one doc, one task).*

---

## Related framing principles already surfaced elsewhere (cross-referenced, not re-derived)

- **D4 — Discoverability lives in *metadata*, not body prose.** `find_docs` matches title / headings / description / purpose / `aliases` / relevantTasks / basename — **not** body prose (verified `QueryEngine.ts`). A concept expressed only in prose is unreachable on-demand. → Frame retrievable concepts into metadata. *(Handled as `aliases` seeding — AXA / 119-A Req 9.)*
- **D5 — Stale snapshots "lie with authority."** A force-loaded *derived/snapshot* artifact that has drifted presents stale content with full authority — worse than no content (evidence: the pre-Spec-094 `dist/ios|android` token files contradicting their own theming contract). → Don't frame derived/snapshot content as ambient ground truth; prefer the live derived index or compute-fresh. *(Handled as derived-index-vs-ground-truth — AXA §5.2–5.3.)*

---

## What's untested / where this might be wrong

1. **The positive half of D1 is unproven.** We showed vague cues under-fire; we have **not** yet shown that *triggered* cues (`WHEN X THEN pull Y`) reliably fire better. That's the next A/B (rerun with a triggered reword; measure fetch rate).
2. **Tiny sample, simulated.** One task, two B-runs, general-purpose subagents with injected context — not the real Kiro harness, not the production model in its real configuration. Directional, not conclusive.
3. **D3 generalization.** "Elaboration vs orthogonal" is clean in theory but we tested one doc whose depth happened to be elaboration. Some trims (e.g. governance-as-law, platform `dist/*`) may be orthogonal in ways that bite — exactly where the harness should be pointed next, with tasks engineered to force genuine spine-insufficiency.
4. **Under-firing may be model-/prompt-sensitive.** A differently-tuned agent might over-pull. The discoveries describe the agents we tested, on the cues we wrote.

---

## Cross-references
- `agent-experience-architecture.md` — the AXA model (WHAT is ambient vs on-demand). D1 feeds its capability-catalog / cue-generation; D2 backs its silent-failure discriminator; D3 informs its trim-safety reasoning.
- `requirements.md` (119-A) — D4 → `aliases` seeding (Req 9); D5 → relocation-integrity / derived-index handling.

*Living log — append new content-framing discoveries here as they surface; each with discovery / evidence / implication / confidence.*
