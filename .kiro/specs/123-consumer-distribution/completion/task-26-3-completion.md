# Task 26.3 Completion: Join Kiro→CC

**Date**: 2026-10-15
**Agent**: Leonardo (Opus), PRIMARY on Task 26 — operator · **Launcher**: Peter (macOS Terminal)

## What changed

- **New**: `.kiro/specs/123-consumer-distribution/validation/join-kiro-to-cc.md`.
  - **The join**: Jordan joined Priya's Kiro-born Lendly repo on Claude Code. All 6 steps completed: step 1 by the launcher; steps 2–5 by Jordan unaided, `attach --target=cc` included, with no `init`; step 6 by the launcher's `open`.
  - **Post-restart query**: consumer-Stacy matched her rendered `.claude/agents/stacy.md` on domain (narrowed to "product-side"), a routed tool (`get_screen_spec`, named second after the built-in `Grep`) and out of scope (Sparky, Leonardo, the system agents). Verdict: **joined**.
  - **Cold observation**: `cc teammate-cold: observed`. Trust, then a separate prompt to enable the servers.
  - **C8(c)**:
    - the attach-written `.claude/settings.json` is not honored before trust, and the headless session printed "Ignoring 40 permissions.allow entries";
    - the note's `@`-import loads (10 memory files; Stacy used the note).
  - Committed `dist/tokens/` was reproduced byte for byte: the second determinism observation.
- **Findings K-1 to K-7.** K-2 (commit what `attach` wrote) recurs from `join-cc-to-kiro`; K-3 (`node_modules/` not ignored) recurs from Runs 2 and 3.

## Targeted check and result

- The join schema check over both join records: all 21 labels present in each; 6 and 4 stop lines; both teammate-cold cells well-formed. Output is pasted in `task-26-completion.md`.
- Every quoted passage was checked against `join.jsonl` and `query.jsonl`.
- The run folder was only read.

## Application-time adaptations

- None to the protocol. The join session's stderr line had no timestamp. Its origin, `attach` writing `.claude/settings.json` mid-session, is inferred from `.claude/` being absent at the session's start (K-1) and is recorded as an inference.
- **Erratum written**: `validation/trio-1-backend.md` R1-12 (and its F7 and F17 reading). The enablement file is ignored by the launcher's global git ignore, not by DesignerPunk.
