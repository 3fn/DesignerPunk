# Task 16 Summary: Cutover — Stacy (U9) — the final cutover

**Spec 122 · Unit U9 · product governance & QA · diff-vs-baseline · differential-auditor**

Stacy's Kiro + Claude Code agents now generate from one canonical source (`canonical/agents/stacy.md`). With this —
**the last of 8 cutovers** — the generator is SSOT for the entire agent roster.

## What changed

- **Canonical source authored** (diff-vs-baseline against her hand port, which was the transform dry-run): sole
  governance-as-law lock `test-development-standards`; `collapses-into-catalog` verdict (renders nothing standing,
  parity with Thurgood); her C12-provisioned **audit-command catalog** (coverage-map, mode-parity, theme-drift,
  coverage, governance-check.sh, verify-gate-registration.sh); all 5 inter-agent routes resolve; the read-oriented
  tool subset (deliberately excluding steward-only tools, which are Thurgood's).
- **Cross-agent resolution:** the final cutover's complete declaration-diff (sweep 6) surfaced 5 un-routed Product-MCP
  tools; per Peter's routing, **Leonardo** ruled them onto his own config (product-repo analogs of capabilities he
  already uses; the empty Product-MCP index here is index-state, not relevance). His config was regenerated in this PR.
- **The self-review rule (amendment 4):** because Stacy is the QA seat, her own validation can't satisfy her gate — so
  **Thurgood** (Peter-routed) was the independent gate-satisfying validator; her seat review is a non-gate signal.

## Verification

- All ten `122-*` checks + coverage-map green; generator lane 330/330; three tscs clean; root `npm test` 8987/8987;
  `mcp-server` 602/602.
- Diff-vs-baseline: zero unexplained regressions; tool grant identical to her hand port (29==29).
- **Both reviews CONFIRMED**: Thurgood (independent, gate-satisfying — byte-diffed, set-diffed grants, reconstructed
  the demotion math) and the Stacy seat (non-gate signal).

## Remaining in Spec 122

- **U10 OB-7** (Task 17) — generate the CLAUDE.md always-lane + retire the interim CLAUDE.md.
- **U11 Closeout** (Task 18) — 119-B/123 handbacks + discharge OB-8 (routing backfill + C7(b) strict-check) and OB-9
  (owner-value audit).

Detail: `.kiro/specs/122-agent-generator/completion/task-16-parent-completion.md`,
`.kiro/specs/122-agent-generator/cutover/stacy-cutover-report.md`,
`.kiro/specs/122-agent-generator/cutover/stacy-diff-vs-baseline.md`.
