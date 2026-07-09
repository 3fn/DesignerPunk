# Inbound to Spec 122 — Delegated-edit placement hazard (worktree cwd ambiguity)

**From**: 2026-07-09 Civitas health-check session (operational discovery; Thurgood)
**Date**: 2026-07-09
**Status**: coordination note — requests 122 **generate one new delegating-agent
ambient cue** (harness-agnostic) with a CC-only specialization. Sibling to
`inbound-from-orchestration-tiering.md` (same delegating-agent ambient class).

## The finding
When an orchestrator delegates a file edit, the subagent can act on a different
working tree than intended and silently misplace the edit — reporting success while
the change lands outside the intended branch. Observed 3× in one session: two
delegated agents wrote to the parent repo instead of the worktree branch (relative
paths resolved from the subagent's cwd); esbuild read the parent repo's
`package.json` via `../../../` instead of the worktree's. Root cause: the harness
nests worktrees inside the repo, so upward path/module resolution crosses the boundary.

## What 122 should generate (harness-agnostic cue → delegating agents only)
Not the universal identity layer — most agents never spawn file-editing subagents.

> When you delegate a file edit, the subagent may act on a different working tree
> than you intend. Hand it **absolute paths to the intended tree**, and after it
> reports done, **verify the edit landed where you expect (placement), not just that
> the content is correct.**

This **extends** the existing delegate-then-verify guardrail
(`governance/Process-Orchestration-Model-Selection.md`) from content to placement.

## Harness split — do NOT disseminate the mechanic
The *principle* above is harness-agnostic → all harnesses. The *symptom* is a Claude
Code layout artifact (worktrees nested at `.claude/worktrees/<name>/`; upward
resolution hits `../../../`). **Only the CC generation** carries the specific note;
other harnesses carry it only if they reproduce the condition. This is what
per-harness generation is for.

## Must-carry (same status as the tiering cue)
Reaches agents today only via the CLAUDE.md interim always-layer, which 122/OB-7
retires. If the cutover drops it, the guidance silently vanishes — carry it into
whatever always-layer supersedes CLAUDE.md.

## Root-cause fix — flagged, not owned by 122
Durable fix is upstream: place worktrees as **siblings** (outside the repo), not
nested — then nothing above a worktree is another repo and all three symptoms vanish.
That's a Claude Code harness behavior (feedback request to Anthropic). 122 mitigates
via guidance; it does not own the root cause.

---

## Disposition (2026-07-09, Peter-approved — split into content-now / generation-in-122)

The ask splits into two separable pieces; only the generation half is 122 scope, and it needs **no 122 artifact amendment** — it rides the existing always-set carry mechanism (see below). **No 122 re-ratification.**

**Piece 1 — cue content AUTHORED NOW (done, outside the 122 build).** The placement-verify rule now exists as canonical always-layer content, so sessions are protected immediately (via the interim CLAUDE.md always-layer) rather than only when the build reaches its ambient tasks:
- **Full rule + CC symptom** → `governance/Process-Orchestration-Model-Selection.md` § "The real guardrail: delegate-then-verify" — extends delegate-then-verify from *content* to *content AND placement*; carries the CC nested-worktree symptom and the sibling-worktrees root-cause pointer.
- **Always-loaded touchpoint** → `.kiro/steering/start-up-tasks.md` item 6 (sibling to the model-tier cue) — terse "verify placement, not just content; hand over absolute paths; confirm the edit landed." Because `start-up-tasks.md` is (per the ratified design) an always-set member, 122 will carry this cue **for free**, the same path it carries the tiering cue.

**Piece 2 — per-harness generation DEFERRED to 122's ambient / OB-7 cutover tasks.** No design change requested. When those tasks execute, resolve one **open design-fit question**: does the ratified five-class ambient design express *"symptom text emitted in the CC generation only, omitted from Kiro"* cleanly (harness-differentiated cue), or does the cue simply ride inside the always-set doc as-is (harmless, but the CC symptom text also reaches Kiro)? If harness-differentiation is wanted and not already expressible, that is a small design note for Thurgood at that point — **not** a re-ratification trigger. Flagged here so the ambient-task executor picks it up.

**Must-carry (unchanged, now satisfiable):** the cue content now EXISTS to be carried; U10 (OB-7 CLAUDE.md retirement) must carry it into the superseding always-layer alongside the tiering cue. Add to U10's must-carry checklist.
