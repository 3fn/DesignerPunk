# Task 6 Summary — Lane timing measurements recorded (125-A)

**Status**: Complete (2026-07-10). **Ceiling: CLEARED.**

The five CI lanes (shipped early via PR #38) are measured in both Req 6.3 forms. Cold-cache worst lane: `lane-functional-root` at **234 s (~3m54s)** — 39% of the ~10-minute ceiling; every other lane ≤ 40 s cold. Felt latency (head-push → all-green): **~3.5 min steady / ~4 min cold**, with the functional lane as the critical path.

Two findings: cold ≈ steady within noise (the lanes are compute-dominated — no cold-start cliff exists), and future latency work has exactly one target lane. **Recorded headroom for 122's future check registrants: ~6 minutes of cold wall-clock.**

Full table + run URLs: `.kiro/specs/125-A-pr-gate-mechanical-arming/completion/task-6-completion.md`. Next: Task 7 wires the ratified per-lane did-it-really-run guards.
