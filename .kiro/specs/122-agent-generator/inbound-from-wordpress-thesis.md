# Inbound: WordPress-Thesis Strategy → Spec 122

**Date**: 2026-07-04
**Source**: `docs/roadmap/2026-07-04-wordpress-thesis-strategy.md` (Peter + Claude strategy session, post-Astryx-launch + full-project-audit + "loops" discussion)
**Status**: Considerations for formalization — **NOT decisions.** Consume alongside the other `inbound-from-*` docs. Where anything here tensions with the design outline, the outline's feedback protocol adjudicates.

---

## 1. The generator is the category-defining artifact — positioning stakes

Meta's Astryx (launched 2026-06-27) commoditized "agent-readable design system" (CLI + MCP + agent-shaped docs). What it does NOT ship — what nobody ships — is the **generated agent organization itself**. In the strategy framing: *Astryx improves a consumer's execution loop; DesignerPunk installs their outer loops* (task/product/system — specs process, governance gates, drift detection, agent org). 122 is the spec that makes that claim true. No scope change implied — but formalization should know the artifact it produces is the differentiation centerpiece, not internal plumbing.

## 2. Per-runtime targets may be the distribution channel, not just anti-drift

Strategy open question (Peter's Decision Point 2): the distribution rail for the WordPress thesis may be the agent-runtime ecosystems (Claude Code plugins/skills, Kiro, Cursor marketplaces) rather than npm alone. If so, **the cost of adding a new generator target is channel-expansion cost.** Consideration for design: keep the per-tool transform layer (§2.3) cleanly separable so a new target (e.g., a future runtime) is an additive transform, not a rework. Do not over-build for hypothetical targets — just don't foreclose cheap addition.

## 3. Sequencing: 125 Phase 0 arms 122's own guard

The strategy note pulls 125 Phase 0/1 (PR-gated flow + arm existing checks) **before** 122, because the regenerate-and-diff guard — 122's core invariant — only *blocks* if a required-check gate exists. Building 122 first means building its enforcement mechanism unarmed. 125's outline already notes this coupling ("Phase 0 de-risks 122 as a side effect"); this inbound makes it a sequencing consideration 122's formalization should assume rather than rediscover.

## 4. System-loop framing (context, no action)

In the loops taxonomy (Voss, 2026-07), 122 automates a slice of Civitas's *system loop* (the outer loop that maintains the primary system). This is context for positioning/docs, not scope. The generate-don't-curate invariant already encodes it.
