# Task 26.2 Completion: Join CC→Kiro

**Date**: 2026-10-15
**Agent**: Leonardo (Opus), PRIMARY on Task 26 — operator · **Launcher**: Peter (macOS Terminal)

## What changed

- **New**: `.kiro/specs/123-consumer-distribution/validation/join-cc-to-kiro.md`.
  - **The join**: Mei joined Dana's CC-born repo on Kiro. All 6 steps completed: step 1 (clone) by the launcher; steps 2–5 by Mei unaided, `attach --target=kiro` included, with no `init` attempt; step 6 by the launcher's `open`.
  - **Post-restart query**: consumer-Thurgood matched his rendered `.kiro/agents/thurgood-prompt.md` on domain, routed tool (`find_docs`) and out of scope (Lina writes component tests). Verdict: **joined**.
  - **Cold observation**: `kiro teammate-cold: observed`. Kiro asked nothing.
  - **C8(c)**, from a separate same-harness probe clone opened in Claude Code before `generate`:
    - the committed `.claude/settings.json` does not enable the servers; trust, then a separate enable prompt;
    - the missing note's `@`-import is dropped silently (9 memory files).
  - Committed platform output was reproduced byte for byte on the second machine.
- **Findings J-1 to J-6.** Notably: J-3, `.claude/settings.local.json` is ignored only by the launcher's global git ignore; J-4, INSTALL § 7 does not tell the joiner to commit what `attach` wrote.

## Targeted check and result

- The join schema check (§ 14.2): all 21 labels present, 6 stop lines, the teammate-cold cell well-formed.
- Every quoted passage was checked against `join.txt`, `query.txt` and the captures.
- The run folder was only read.

## Application-time adaptations

- **Two protocol defects** were logged under the Task 26 Instruments block's `## Found later` and fixed in § 14.4 for later runs:
  - step 0's `"$COMMIT:tests/…"` read by zsh as the `:t` modifier;
  - the after-step ran `kiro-cli mcp list` from the probe clone, and read the wrong clone's `settings.local.json`.
