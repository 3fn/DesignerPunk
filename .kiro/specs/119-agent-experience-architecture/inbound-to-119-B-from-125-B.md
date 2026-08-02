# Inbound to 119-B from 125-B: the live register, the prune methodology, and a window-coordination hazard

**Date**: 2026-07-14
**Source**: Spec 125-B execution (U1-s / U1-p / U2 complete; observation window OPEN since 2026-07-14T20:25:30Z)
**Status**: Handoff records for 119-B's formalization (which runs parallel to 125-B per the umbrella sequence 125-A → 122 → (125-B ∥ 119-B) → 123). NOT decisions binding 119-B's shape.

---

## 1. ⚠ COORDINATION HAZARD (read first): 119-B's 122-regens can segment the LIVE observation window

125-B's U1 pilot window is OPEN and counting toward N=20 observed PRs. Per the ratified measurement protocol (Req 8.4 / DD8), **any merged change to the pruned rule's surfaces — or a 122 regeneration affecting them — is a material-change event that SEGMENTS the window**, and **more than K=3 re-baselines before the window closes escalates to Peter as a corpus-volatility finding**. 119-B propagates the certainty-calibration rule via 122's generator: every canonical-source edit + regen that touches the generated prompts embedding the pruned rule's ambient (currently `thurgood.md` / `CLAUDE.md`) plausibly fires the trigger. The window is young; careless regen cadence could burn through K fast.
**What 119-B should do**: batch canonical edits so regens are few; expect each qualifying regen to open a segment (that's the design working, not a problem — but count them); check the window state (`.kiro/specs/125-B-classification-map/completion/pilot/measurement-protocol.md` + the U1-c dataset once it exists) before regen-heavy phases. Upside: 119-B's ordinary spec-work PRs on `task/*` branches COUNT as observed PRs — the window *wants* the work; it's specifically the regens that need batching.

## 2. The classification-map register is LIVE — classify the calibration rule through it, don't build parallel structure

`governance/classification-map.md` — 10 entries, MCP-served, citable via the sweep-1-verified grammar `governance/classification-map.md § "<entry-id>"` (entry-ids: kebab-case, unique, non-substring — the register documents why). The certainty-calibration rule ("strong/partial/none; search before guessing; surface when unsure") is a governance rule like any other: **119-B should give it a register row** (my read, non-binding: education-owned judgment — likely `education: KEEP` with `verification: none` or a narrow operational hook; the boundary call is 119-B's to adjudicate through the settled methodology). Template: the `record-first-ratification` entry shows how a multi-surface education-heavy rule serializes (scoped dispositions, per-surface rationale).

## 3. The prune methodology is settled LAW that binds 119-B's prose edits

119-B refines the always-loaded calibration prose (AI-Collaboration-Principles' forward-compat note says 119-B *refines rather than rewrites*). The settled methodology (125-B design §2, merged): **CI validates functional/operational requirements, never ideology; education and verification are complementary layers; prune imposters, not teachers; two-bladed imposter test** (teaching blade + volatility blade, with the illustrative-use and clause-grain sub-rules). The strong/partial/none rule is durable education (specific-but-stable → belongs in durable docs by the churn-rate test). Any 119-B prose restructuring should record per-surface blade verdicts if it prunes — the pilot's `pilot-row-assessment.md` is the worked example.

## 4. Practical conventions established under load (use them, don't rediscover)

- **Steward-writes-register**: domain owners adjudicate + draft rows; Thurgood audits + lands with drafted-by/landed-by attribution (held twice under load when Lina declined governance/** writes on committed-rule grounds).
- **Record-first works in-session**: Peter ratifies in chat → the RATIFIED record commits to the branch BEFORE the law merges (ballot `2026-07-14-npm-test-imperative-prune.md` is the worked example).
- **Verify-the-record's tail, not status headers**: 126's stale outline header claimed "awaiting ratification" days after the feedback doc carried Peter's ratification — cost a real round-trip. Check feedback docs' latest entries before relaying state.
- Generator: `npx tsx tools/agent-generator/generate.ts`; sweep-1 local: `npx tsx tools/agent-generator/sweeps/sweep-1-refs.ts`; diff-guard local: `npx tsx tools/agent-generator/diff-guard.ts`. `canonical/registry` + 8 other roots are diff-guard-protected — never hand-place artifacts there (Ada's design-round critical).
- Headless CLI for probe/trial-class work: `npx --yes @anthropic-ai/claude-code -p` (authenticated via Peter's login; `claude` is NOT on PATH). Trial infra lesson: NEVER run concurrent clones in same-repo worktrees (shared git-stash cross-contamination — voided the trial's first pair).

## 5. Open items 119-B might intersect (known, routed — don't duplicate)

- Button-CTA disabled-state adjudication: running as its own Lina session (chip task_5c7d4b16); register note reads "pending adjudication."
- U1b candidate row logged: philosophy-conformance check (red on PRESENCE of a disabled-state declaration). U1b is verdict-gated — candidates queue, they don't execute.
- The U1-c closeout (window findings + Peter's three-decision ballot: program verdict / autonomy dial / at-scale window parameters) happens when the window fills — 119-B's timeline may overlap it; the verdict could adjust 125-B↔119-B coordination.
