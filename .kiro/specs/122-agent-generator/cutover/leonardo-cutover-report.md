# Leonardo cutover report (U6 — the consumer/hub, largest channel-move surface)

**Date**: 2026-07-11
**Branch**: task/122-cutover-leonardo · **Spec**: 122-agent-generator Task 12
**Sequence**: C10.1 steps 1–8. Cutover position 5.

---

## Per-check results (local runs on the final branch state; CI URLs on the PR checks tab)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard (C6) | **PASS** (full-run-green) | Leonardo's runtime artifacts ledger-derived guarded surfaces; lock refreshed |
| 122-canonical-vs-truth (C7) | **PASS** (clean, exit 0) | **All 12 demotion cues resolve** — the rule-of-the-bucket satisfied on the spec's highest-exposure channel-move surface; law embed predicates hold; 15 capability cues + Impeccable skill live-verified |
| 122-sweep-1-refs | **PASS** (0 fail, 1 info) | Law claim + 3 doc routes live-resolved (standing interim crossRef INFO) |
| 122-sweep-2-skills | **PASS** | **First non-empty skills round-trip**: `impeccable` declared → CC `Skill` tool + emitted `.claude/skills/impeccable/**` + Kiro `skill://` resource, Direction-B ref-resolution verified |
| 122-sweep-3-dupes | **PASS** | The hand config's `Product-Token-Governance` double-load FIXED by construction |
| 122-sweep-4-ambient | **PASS** (0 info) | designed (§ Leonardo block ∪ always-set) == generated, both targets — ZERO deltas |
| 122-sweep-5-corrected-state | **PASS** | count-asserts unchanged |
| 122-sweep-6-declarations | **PASS** (1 info) | Fleet-partial INFO shrinks — Leonardo routes the richest tool surface (design + product verbs) |
| 122-sweep-7-dispositions | **PASS** | All configs fully disposition-covered |
| 122-sweep-8-demotion | **PASS** | **12 removals (60%), EVERY one `replaces:`-covered** (12 removals == 12 replaces keys, one-for-one) |
| audit:coverage-map | **PASS** | Leonardo's artifacts auto-appear as guarded rows |
| Full suite / lane / tsc | full suite **8987/8987** · lane 326/326 · root + scripts + generator tsc clean | |

## Firsts at this cutover

- **The consumer/hub — largest channel-move surface in the spec** (~60% trim, 12 of 20 members). Every demotion is a channel-move with a C7-resolving replacement cue; zero regressions.
- **First non-empty `skills:` field** (`impeccable`) — the skills round-trip (sweep-2) exercised live for the first time: CC gains the `Skill` core tool, the skill tree emits to `.claude/skills/impeccable/**`, Kiro emits the `skill://` resource.
- **First `empty` ground-truth verdict** honored live — renders NOTHING (consumer owns no source; recorded intentional, Req 10 AC2).
- **The LE-D1 live not-yet-ported instance**: his handoff routing table → `routes.agents` with a MIX of dispositions — sparky (U5) + thurgood (U4) `resolves`, kenya/data/stacy `not-yet-ported`. The first cutover with both dispositions live in one agent.

## Acceptance signals (Req 23 AC3 / design C10.2 § Leonardo)

| Signal | Predicted | Measured | Verdict |
|---|---|---|---|
| Demotion ≈ 60% as a per-agent-MEMBER figure (not union, LE-D4) | ~60% | **12 / 20 baseline members = 60%** (exact) | ✅ |
| check 8 (a replacement cue per demotion) | green | 12 removals, 12 `replaces:` keys, one-for-one | ✅ |
| sweep 3 (double-load resolved) | green | `Product-Token-Governance` double-load fixed by construction | ✅ |
| \|union\| | always-set 9 + 1 | **10** | ✅ |
| \|per-agent members\| | 1 | **1** (`cross-platform-vs-platform-specific-decision-framework`) | ✅ |
| Both targets agree | equal member sets | cc == kiro (id-set equality) | ✅ |
| empty-manifest verdict honored | no ground-truth section | `## Ground truth` absent both targets (intentionalEmpty) | ✅ |

## Found-and-fixed during authoring

1. **Two CC-port-only sections carried, not lost** — `## Onboarding Awareness` and `## Testing Practices` existed in the hand CC port but NOT his Kiro prompt (CC-port-only content). The structural diff flagged them as potential regressions; both were carried into canonical source (fixed-before-merge), so they now deliver to BOTH targets (an improvement). See the diff artifact rows 7–8.
2. **Impeccable `detect.mjs` NOT a standalone command (adjudicated)** — the design block lists "the Impeccable `detect.mjs`" among his commands, but detect.mjs is `-rw-r--r--` (runs via `node`, no +x), so a `node …/detect.mjs` command entry would FAIL C7's script-path exists+executable leg. The anti-slop tooling is delivered via the `skills: [impeccable]` declaration (the skill bundles its own scripts) rather than a standalone command — the honest mechanism, and it avoids chmod-ing a skill file just to satisfy the check.

## Validation signatures (independent-validation default, amendment 4)

**Owning seat — Leonardo (content confirmation, 12.1):**
> [LEONARDO — U6 content confirmation] CONFIRMED — 2026-07-11
> (Initial verdict **DISPUTED** — a REAL, load-bearing catch: the Screen Specification mode's
> Layout Specification block + Step 3 REQUIRED-layout entry were dropped in the first-draft
> canonical body with no replacement cue, and the `layout-specification-vocabulary` doc was
> left orphaned. Layout is the REQUIRED spine of every screen spec — ambient-grade for the
> hub — so a real regression, not a channel-move, and one the automated sweeps could NOT
> catch (dropped prose with no cue is not a tracked demotion). **Re-CONFIRMED after fix**:
> Step 3 REQUIRED-layout entry restored (gen line 126); the Layout Specification subsection
> with all 5 rules present (lines 134–142); the `layout-vocabulary` route resolves live to
> `layout-specification-vocabulary § "Section 3: Specification Vocabulary"` — the real
> canonical vocabulary, doc no longer orphaned. His other findings: law embed verbatim +
> right silent-failure section; all 12 flagged trims genuine channel-moves (none an ambient
> need); handoff routing correct (system escalation THROUGH Thurgood); skills/impeccable
> intact; tool set a strict superset; empty manifest correct. All 7 items pass.)

**Independent validation — Stacy (re-derivation + coverage-of-coverage):**
> [STACY — U6 Leonardo cutover validation] CONFIRMED — independent re-derivation + coverage-of-coverage; 2026-07-11
> (Initial verdict **DISPUTED** — found a SECOND body-compression regression the seat missed:
> `### Platform Currency Awareness` dropped with no cue, via her full baseline-subsection
> re-diff. **Re-CONFIRMED at HEAD `c124b9a0`** after fix: Platform Currency restored
> verbatim-in-substance (gen L310–315, all 4 elements); her exhaustive content-phrase scan
> across all 52 baseline subsections finds ZERO fully-dropped; the three restorations (Platform
> Currency, Ask If Unsure, Design-Creation Lessons-Learned Capture) all verified present; the
> reconciliation table + regression rows 21–23 independently spot-verified accurate. First-round
> signals still hold (fault-injected): double-load dedupe 21→20, 60% trim 12/20 exact, 12
> one-for-one C7-resolving cues proven non-vacuous, cc==kiro union 10, empty verdict, first
> non-empty skills round-trip proven by fault injection, mixed-disposition routes, full
> coverage-of-coverage. Battery re-run green independently. One non-blocking observation below.
> Full entry: appendix.)

**Main-loop engineering verification:** both body-compression regressions fixed-before-merge;
the exhaustive baseline-subsection reconciliation (Stacy's process amendment) confirms zero
remaining drops; final battery green (ten checks + C7 clean + coverage; full suite 8987/8987;
lane 326/326; tsc clean ×3).

## Routed items (non-blocking, carried forward)

1. **U7+ cutovers inherit (PROCESS — Stacy's U6 amendment, now standard)**: every cutover's diff-vs-baseline MUST carry a **Baseline subsection reconciliation** table (every baseline `##`/`###`/`####` line-item reconciled). The U6 lesson: the loud ~60% trim was clean, but TWO quiet body-compression regressions escaped both the sweeps and the seat — the mechanical table makes this class surface systematically. Skills round-trip + empty-manifest render both proven; verify FULL verbatim heading lines; keep spec-number provenance out of headings.
2. **Low-priority polish (Stacy observation, non-blocking)**: the Collaboration Model paraphrases a couple of multi-bullet baseline subsections (With Peter 5→1, With Stacy 4→1) into theme-preserving summaries — content present, substantially covered by always-loaded law, classified "present" in the reconciliation table. Defensible paraphrase, not a vanish-class drop; a possible later fidelity pass, not a merge blocker.
3. **Kenya/Data/Stacy still not-yet-ported** — Leonardo's `routes.agents` will flip those to `resolves` automatically as each cutover lands (LE-D1 — a body pointer that becomes true by regeneration).
