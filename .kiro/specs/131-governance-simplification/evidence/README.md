# Spec 131 evidence

Records and tools that measure the governance layer for Spec 131. The records are dated and say what they read; the tool generates a record and carries no law.

- **`baseline-snapshot.sh`**: generates the baseline record that Peter's R9 asks for at a release's S (`.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "R9", item 3, his words: "one generated snapshot record, not a new mechanism"). Usage, from any checkout:

  ```bash
  bash .kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh <prev-S> <S> <walk-start> <version>
  # 16.2.0: bash …/baseline-snapshot.sh 38f4ece47 <16.2.0's S> 2c00cea49 16.2.0 > …/evidence/<date>-baseline-16.2.0.md
  ```

  - It reads git objects only (no checkout, no network) and prints markdown: every figure with the command that produced it.
  - Figures marked "heuristic" print their definition beside them.
  - It is in no CI lane and no rule names it. The record is pasted at S, with the same figures at the previous S (`38f4ece47` for 16.2.0) beside it.
- **`2026-10-24-ballot-audit.md`**, **`2026-10-24-test01-upgrade-rehearsal.md`**, **`ballot-audit-readers/`**: the outline round's evidence (see each file's header).
