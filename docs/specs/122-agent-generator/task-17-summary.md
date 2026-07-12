# Task 17 Summary: OB-7 — CC always-layer + CLAUDE.md retirement (U10)

**Spec 122 · Unit U10 · governance-law retirement (record-first ballot)**

The generator now emits the **shared** CC always-layer (`CLAUDE.md` lane 1), and the interim hand-maintained
`CLAUDE.md` stopgap is superseded by that generated output — closing OB-7 (exactly one always-layer mechanism per
runtime).

## What changed

- **Engine (17.1):** wired `CcAdapter.emitAlwaysLayer` into `generateAll` — it generates `CLAUDE.md` from
  `always-set.yaml` as live `@`-import references (case-correct, drift-free) + a generated banner. `CLAUDE.md` is now a
  **diff-guarded** output (a hand-edit is a loud failure). Kiro emits nothing here (it delivers via per-agent resources
  + `inclusion: always`).
- **The swap:** `CLAUDE.md` went from a 48-line hand-maintained stopgap → banner + the same 9 `@`-imports (byte-
  identical delivery; only the surrounding prose changed).
- **Probe evidence (POSITIVE):** a spawned subagent confirmed all 9 always-layer docs, the certainty-calibration rule,
  and a deep-detail content canary — proving the `@`-imports deliver live doc content to subagents.
- **Retirement ballot (record-first):** `.kiro/docs/ballots/2026-07-11-claude-md-retirement.md` (DRAFT). OB-7 marked
  CLOSED in the 119-B ledger (closes at the ratified swap PR's merge).

## The ratification gate

This changes an always-loaded governance delivery surface, so — per the record-first protocol — **the ballot must be
Peter-ratified (committed `RATIFIED`) before the swap PR merges.** The PR carries the staged swap + the ballot in
DRAFT; it must not merge until ratified. The ratified swap PR is the retirement record.

## Verification

All ten `122-*` checks + coverage-map green (`CLAUDE.md` guarded; diff-guard no-op-green); generator lane 330/330;
tscs clean; root `npm test` + `mcp-server` suites green. Definitive fresh-session re-probe of the generated file is a
post-merge confirmation (CLAUDE.md snapshots at session start).

## Remaining in Spec 122

- **U11 Closeout** (Task 18) — 119-B/123 handbacks + discharge OB-8 (routing backfill + C7(b) strict-check) and OB-9
  (owner-value audit).

Detail: `.kiro/specs/122-agent-generator/completion/task-17-parent-completion.md`,
`.kiro/specs/122-agent-generator/cutover/ob7-probe-evidence.md`,
`.kiro/docs/ballots/2026-07-11-claude-md-retirement.md`.
