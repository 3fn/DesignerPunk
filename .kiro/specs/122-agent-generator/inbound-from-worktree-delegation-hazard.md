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
