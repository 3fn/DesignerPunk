# Task 24.1 Completion: U1b check (enumerated denominator; the D-T-A6 residual); route findings

**Date**: 2026-10-13
**Agent**: Thurgood (Opus), PRIMARY on Task 24
**Branch**: `task/123-u4-content` (unit head at writing: `2325166f5`; measured against `8007105fa`)

## What changed

- **New**: `.kiro/specs/123-consumer-distribution/validation/u1b-backward-check.md`, the U1b audience-ruling backward check.
- **The denominator**:
  - 10 `(125-B)` commits touch `governance/`, pasted from `git log`.
  - 3 of them are prunes, with **7 content hunks (H1–H7)**. The pilot `4992e5926` is included (instruments block O-5).
  - Waves 3–4 (rows-only), four register-only commits and one addition are excluded by name. So are the steering hunks.
  - The closeout's "12 hunks" reconciles as 6 `governance/` + 6 steering.
- **Hunk verdicts**: 4 `no consumer loss` (H1, H2, H4, H7) and 3 → findings (H3 → F-P2; H5 and H6 → F-P1), all Lina's.
- **D-T-A6**:
  - 396 `src/` mentions in `governance/`; 97 of them (96 lines, 67 unique paths, 19 docs) exist in the repo but not in the package. Checked against `npm pack --dry-run --json --ignore-scripts`, 1657 files, 406 under `src/`.
  - Another 43 mentions are absent from the repo too (the adjacent class). Three lexical false positives are excluded by name.
  - Banners cannot carry the remedy: only 7 of the 23 finding docs match predicate v1.
- **Findings table: 25 rows** (Lina 10 · Ada 8 · Thurgood 7), each written to be sent verbatim. Delivery is pending with the orchestrator, recorded under § 5 "Delivery".

## Targeted tests and result

- None. This is a documentation subtask, so no code and no test.
- The measurement commands are pasted in the record (`git log` / `git show -U0`, `git grep -o`, `npm pack --dry-run --json --ignore-scripts`, `git ls-files`). The classification script lives outside the repo, in the session scratch dir. Its rules are stated in § 4, step 4.

## Application-time adaptations

- **The population is wider than the brief's commit list.** The pilot prune is added, along with two register-only commits, per the criterion's "every 125-B `governance/` prune".
- **Absent-from-repo paths are reported in the same per-doc rows as D-T-A6**, labelled and counted separately. Four docs have only absent-class lines (D-3, D-15, D-16, D-18).
- **Owners are proposed** from Agent-Directory and await the orchestrator's confirmation before sending.
