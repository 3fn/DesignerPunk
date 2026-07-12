# OB-7 Probe-Subagent Evidence (Task 17.1)

**Date**: 2026-07-11
**Purpose**: Evidence that the shared CC always-layer (CLAUDE.md `@`-imports of the 9 identity/steering docs) reaches
subagents — the Req 16 AC2 / design § Testing Strategy probe-subagent test for the OB-7 retirement.

---

## What was tested

The generated `CLAUDE.md` (C11 lane 1) delivers the locked always-set as live `@`-import references. This probe
verifies (a) the always-layer content reaches a spawned subagent, (b) the certainty-calibration rule specifically
reaches it, and (c) the `@`-import resolves to live doc **content** (resolution, not a hollow reference) — via a
deep-detail canary that only appears if the full imported doc body reached the subagent.

## Result: POSITIVE (all three targets present)

A probe subagent (general-purpose), answering ONLY from context (no file reads, no tools), reported:

1. **Certainty-calibration rule — PRESENT.** Recited its three-step shape (search-before-guessing / weight-by-match-
   strength / surface-when-unsure) and quoted the three match-strength labels verbatim: **`strong` / `partial` /
   `none`** (from AI-Collaboration-Principles).
2. **Always-layer roster — all 9 PRESENT.** personal-note, core-goals, AI-Collaboration-Principles,
   Spec-Feedback-Protocol, start-up-tasks, Task-Completion-Protocol, Agent-Directory, DesignerPunk-Systems-Overview,
   Civitas-System-Overview.
3. **Content-resolution canary — PRESENT.** Recited a deep-detail fact — *"squash-merge is the ONLY merge method the
   repository allows"* — buried inside Task-Completion-Protocol. Reciting a detail this specific proves the `@`-import
   delivered the full doc **body** into the subagent's context (resolution), not just a filename or an empty reference
   (LE-D2 realized by fact — lane 1 imports resolve).

**Honest caveat (recorded by the probe):** the probe was a general-purpose subagent; per the mechanism, CLAUDE.md
reaches "all custom + built-in types except Explore/Plan," so the positive result does not generalize to those two
excluded types.

## Delivery equivalence (why this evidence covers the GENERATED file)

The probe ran in a session whose CLAUDE.md was snapshotted at session start (the **interim** file). The evidence
transfers to the **generated** CLAUDE.md because the two are **byte-identical in their `@`-import lines** — verified:

```
$ diff <(git show HEAD:CLAUDE.md | grep @.kiro/steering) <(grep @.kiro/steering CLAUDE.md)
  → IDENTICAL @-import set (same 9 docs, same case-correct paths)
```

The swap changes only the surrounding prose (the interim's stopgap explanation → the generated banner); the delivery
mechanism (the 9 `@`-import lines) is preserved exactly. So a subagent under the generated CLAUDE.md receives the same
always-layer the probe confirmed under the interim.

## Definitive fresh-session verification (post-merge)

Because CLAUDE.md is snapshotted at session start, the definitive probe of the **generated** file runs in a fresh
session after the swap PR merges (the same fresh-session method the interim's 2026-06-29 OB-7 verification used). This
evidence + the byte-identical-imports equivalence establish the mechanism now; the fresh-session re-probe is the
post-merge confirmation, not a blocker for the swap.
