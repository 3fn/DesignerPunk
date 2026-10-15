# Task 27.2 Completion: Beat 1

**Date**: 2026-10-15
**Agent**: Leonardo (Opus), PRIMARY on Task 27 — operator · **Launcher**: Peter (macOS Terminal)

## What changed

- **New**: `.kiro/specs/123-consumer-distribution/validation/conformance-beat-1.md`.
- **Beat 1**: consumer-Thurgood (Claude Code, a fresh clone of `born-cc`) worked the shipped re-grounding spec's tasks 1–5 in 99 turns (of a 120-turn guard, observed only), 15 min, $9.11.
- **The bar: formalized: yes.**
  - `specs/001-order-status-page/` (outline, feedback, requirements, design, tasks; 710 lines);
  - `specs/README.md`;
  - `specs/regrounding/report.md` (26 charter items, each dispositioned with the spec's three terms; frictions F1–F6; closing line "I can do my job here").
  - All committed on `main` in `1252052`, `4b3521b` and `cc99c2f`.
- No generated agent file was edited (`agents-diff.txt` empty).
- **Findings C-1 to C-7.** Two are product defects consumer-Thurgood found:
  - C-1: `Button-CTA` declares `state_loading`, which its web implementation lacks (Lina). Confirmed by the operator in the repo source.
  - C-2: docs-MCP `get_section` splits fenced templates (Thurgood).
- The record also carries the **24.3 labelling** and the residuals (the Kiro renderings unexercised; headless approvals; one sample).

## Targeted check and result

- Every quoted passage was checked against `beat-1.jsonl`, the committed report (`git show cc99c2f:…`), and `specs-after.txt`.
- The artifact paths were confirmed in the clone. The prompt was confirmed byte-identical (`diff`) and its ancestry checked (exit 0).
- The run folder was only read.

## Application-time adaptations

- **Launcher deviation recorded**: `harness-user-state-before.txt` was taken late and then overwritten after beat 2. The pre-session state is taken from Peter's relayed paste-back and marked as such.
- `/tmp/zeb_def_ipc_17180`: no transcript names it. It is recorded as unknown origin, not an agent write.
