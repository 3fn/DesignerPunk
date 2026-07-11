# Ada cutover report (U2 — the FIRST CC cutover)

**Date**: 2026-07-10
**Branch**: task/122-cutover-ada · **Spec**: 122-agent-generator Task 9
**Sequence**: C10.1 steps 1–8 (content readiness → baseline → generate → checks → this report
→ diff-vs-baseline → validations → signals → PR)

---

## Per-check results (local runs on the final branch state; CI URLs on the PR checks tab — the platform record)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard (C6) | **PASS** (full-run-green → no-op) | Ada's runtime artifacts now LEDGER-DERIVED guarded surfaces (incl. attribution sidecars) |
| 122-canonical-vs-truth (C7) | **PASS** (clean, exit 0) | First run with the class-(c) leg-2 grant surfaces ARMED (read from her emitted configs, both targets) |
| 122-sweep-1-refs | **PASS** | All law claims + 6 doc routes live-resolved (interim crossRef enumerated as standing INFO) |
| 122-sweep-2-skills | **PASS** | `skills: []` recorded PASS (0 declared / 0 emitted) |
| 122-sweep-3-dupes | **PASS** | Her regenerated config has zero double-loads (the hand-config class fixed by construction) |
| 122-sweep-4-ambient | **PASS** | designed (Task-9 block ∪ always-set) == generated, both targets — ZERO deltas |
| 122-sweep-5-corrected-state | **PASS** | count-asserts unchanged (0 `.web.tsx`; single concept-count 136) |
| 122-sweep-6-declarations | **PASS** | Cue leg green; un-routed leg reports 29 pending-fleet tools as INFO (see adjudication note 1) |
| 122-sweep-7-dispositions | **PASS** | All 9 configs (8 hand + regenerated ada.json) fully disposition-covered |
| 122-sweep-8-demotion | **PASS** | 20 removals, EVERY one covered by a `replaces:` cue; 3 preserved KB sources correctly cancel |
| audit:coverage-map | **PASS** | Ada's artifacts auto-appear as guarded rows (226 surfaces / 1 adjudicated blank) |
| Full suite / lane / tsc | **PASS** | 8987/8987 · 308/308 · clean |

## Adjudication notes (owner-ruled interpretation calls, this cutover)

1. **Sweep 6 fleet-partial scoping** (thurgood): the un-routed declarations-diff runs strictly
   only when the ledger covers the full designed population; mid-cutovers the un-routed set
   (29 tools pending later seats) reports as a visible INFO count — Req 7 AC4's on-demand
   remainder, not 29 false ADJUDICATEs. Hard-arms automatically at fleet completion (U9).
2. **Baseline/fresh namespace** (thurgood): sweep 8's fresh side = manifest ids ∪ the
   regenerated Kiro config's own normalized resources, so PRESERVED hand-wiring (the three
   rich knowledgeBases, Req 15 AC2) cancels instead of false-registering as removals; genuinely
   trimmed artifacts still register. One shared normalizer across baseline capture, sweep 8,
   and the generator's delta emission.

## Found-and-fixed at this cutover (the gates biting, recorded)

1. **CC cue-namespacing misroute — found by ADA's seat confirmation (initial verdict
   DISPUTED)**: her application-MCP `rebuild_index` cue rendered with the docs server name
   (subset-search-order namespacing). Fixed (`cueToolRef` — per-cue-server namespacing +
   loud failure on ungranted cue tools), regression-tested, regenerated, re-verified.
   Details + disposition: `ada-diff-vs-baseline.md` § Regression adjudications.
2. **Completion-doc/spec-planning routing parity** — found during diff classification;
   fixed-before-merge (two routes added). Same artifact, same section.
3. **`routes.agents` structured-but-not-delivered — found by STACY's classification audit**
   (her Medium finding: the diff artifact's row-3 render claim was half-false; the body's
   "hand-off triggers live in your routing section" dangled on both targets). Fixed-before-
   merge: `renderAgentRoute` (render.ts) + both adapters render agent routes in `## Routing`
   (verified `.claude/agents/ada.md:382-383`, `.kiro/agents/ada-prompt.md:168-169`) — LE-D1's
   loop closed for all six remaining cutovers.

> **Meta-observation (Stacy's, adopted for the U3+ pattern)**: all three regression-class
> defects at this debut were caught by the designed gates in their designed order — seat
> confirmation, classification pass, governance seat. The layering is doing its job.

## Acceptance signals (Req 23 AC1 / design C10.2, Ada row — A-D5/LE-D4 discipline)

| Signal | Predicted (design) | Measured | Verdict |
|---|---|---|---|
| Observed baseline (committed `ada.json` at cutover) | **30** resources (correcting the stale 27) | **30** (`canonical/baselines/ada.ambient-baseline.json`, mechanically normalized) | ✅ |
| \|union\| (ambient manifest members) | always-set 9 + 1 | **10** | ✅ |
| \|per-agent members\| (union factored out) | ~1 | **1** (`token-governance`) | ✅ |
| Both targets agree (AC1) | equal member sets | cc == kiro (id-set equality verified) | ✅ |
| Shrink (delta against the MEMBERS count, not union) | large trim | **20 removals** (`demotion-delta.json`), each `replaces:`-covered | ✅ |

## Validation signatures (independent-validation default, amendment 4)

**Owning seat — Ada (content confirmation, 9.1):**
> [ADA — U2 content confirmation] CONFIRMED — 2026-07-10
> (Initial verdict DISPUTED — the rebuild_index cue misroute; re-confirmed after the fix was
> regression-tested, regenerated, and verified live at `.claude/agents/ada.md:387-388`. Her
> per-item findings: law sections right for her seat incl. Token-Selection-Matrix
> on-demand call; routes/cues/subset complete; KBs content-faithful; body an operating
> prompt she can work from.)

**Independent validation — Stacy (re-derivation + coverage-of-coverage):**
> [STACY — U2 Ada cutover validation] CONFIRMED — independent re-derivation + coverage-of-coverage; 2026-07-10
> (Her full entry: appendix below. Her one Medium finding — the diff artifact's row-3 render
> claim was half-false because neither adapter rendered `routes.agents`, leaving a dangling
> body pointer on both targets — was **fixed-before-merge**: `renderAgentRoute` added to
> render.ts + both adapters; verified live on both targets; her routed wording items applied.)

**Thurgood (engineering verification, main loop)**: all checks re-run green after every fix;
delegated work independently verified; the two found regressions fixed-before-merge.

## Routed items (non-blocking, carried forward)

1. **Ada** → route-tuning pass: a cue for token-governance's non-embedded sections (Token
   Selection Matrix et al.) — in Kiro the full doc rides ambient; in CC only generic
   find_docs reaches them today.
2. **Ada** → generator team: dedupe rule candidate — a routed section that is ALSO inside an
   embedded assert (theme-registry-law) is harmless but duplicative.
3. **Stacy's routed items**: appended with her entry.

---

## Appendix — Stacy's recorded entry (verbatim, key sections)

> **[STACY — U2 Ada cutover validation] CONFIRMED — independent re-derivation +
> coverage-of-coverage; 2026-07-10**
>
> **State validated**: branch `task/122-cutover-ada` at `b3c1df03` + the two cutover docs.
> **Check runs (mine)**: diff-guard `no-op-green` (0) · canonical-vs-truth `clean, 0
> findings` with the grant-surface leg live (0) · sweep-4 `PASS — 0 info` (**non-vacuous**:
> Ada's manifests in scope, no set-difference) · sweep-8 `PASS`, delta written (0) ·
> audit:coverage-map `PASS — 226/225/1/1` (0) · lane 308/308 · full suite **8987/8987** (my
> own run, verifying the report's claim).
> **The Ada fix — verified landed**: `.claude/agents/ada.md:387` application-namespaced,
> `:388` docs-namespaced; root fix at `cueToolRef` (fail-loud on ungranted cue tools);
> regression test passing.
> **Signals re-derived**: baseline **30** (= 27 doc + 3 `src/*` KB resources; `HEAD~1`
> ada.json carried exactly 30) · union **10** · per-agent members **1** · cc==kiro id-sets ·
> **20 removals**, my set arithmetic matches. The 3 `src/*` members correctly absent from the
> delta — they survive as the three knowledgeBase objects (**byte-faithful vs the hand
> config, JSON-normalized — Req 15 AC2 holds**) + the CC Knowledge fallback. Generated-side
> additions (task-completion-protocol, both overview docs) are always-set gains the hand
> config lacked — improvement, not drift.
> **Classification audit**: rows 1, 5–13 verified against my own diff (tools set-identical
> both directions; both law embeds inline; Knowledge fallback; Commands; routes/cues incl.
> all 20 demotion cues; `getComponent(` appears nowhere). **One Medium finding**: row 3's
> "rendered in `## Routing`" was half-false — `routes.agents` was structured but NOT rendered
> by either adapter, dangling the body's "hand-off triggers live in your routing section" on
> both targets. Below the blocking bar (the hand-off behavior is carried by the roster, Out
> of Scope, boundary examples, and the always-set Agent-Directory) but exactly the
> overstated-carrier class the amendment-1 seam audit exists to catch. *(Disposition:
> fixed-before-merge — see Found-and-fixed item 3.)*
> **Coverage-of-coverage**: all 11 Ada artifacts are guarded rows in coverage-map.yaml (both
> runtime bodies, ada.json, three attribution sidecars, canonical source, baseline, both
> manifests, demotion-delta.json), each with named 122 checks.
> **Routed**: row-3 wording + dangling pointer (fixed, above); commit the corrected cutover
> docs in the unit's final commit (done — this commit); the "27 → 10" Kiro-note clause
> clarified to "30 = 27 + 3" (done); meta-observation adopted into the report body.
