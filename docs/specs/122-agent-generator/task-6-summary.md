# Task 6 Summary — Diff-guard + canonical-vs-truth (Spec 122, U1)

**Status**: Done on branch `task/122-substrate` (parent inside unit U1; accepted at U1's merge, Task 8).
**Date**: 2026-07-10

The generator grew its teeth. The **regenerate-and-diff guard** (C6) regenerates the whole guarded surface through the same entry point real generation uses, compares bidirectionally (hand-edits, missing outputs, and stale extras all fail with per-file detail), and carries the DD7 closure lock — input closure complete over BOTH resolve-by-id roots (the S-D3 fix), output hash sensitive to added/dropped surfaces (S-D5). Measured live: full run ~5s (three MCP boots included), **no-op 0.46s**.

**Both prove-it-bites forms recorded**: a hand-edited generated line → FAIL naming the file; a lone governance-section edit → the lock forced a full run (the closure-completeness leg). The stale-embed FAIL half completes at Task 8 when the fixture provides a real embed.

The **canonical-vs-truth check** (C7) implements all five assertion classes + the glob-currency check — materialized per-claim predicates, the L1 server-grant first-class FAIL, D-A5's empty-string rule, the structural declared-but-index-empty carve-out — pure and injectable, reporting grouped by adjudicator; clean-exits on today's zero-agent substrate.

**Found + fixed**: `.claude/skills/` was gitignored ("pending a generator" — the condition is now fulfilled); the 97-file generated tree is now committed, guarded surface per Req 17 AC1.

Validation: agent-generator lane 222/222 · full `npm test` 8987/8987 · tsc clean. Execution: 6.1/6.2 main loop; 6.3 Opus subagent (Architecture tier), nine flagged interpretation calls reviewed and accepted.
