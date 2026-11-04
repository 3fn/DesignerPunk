# Spec 131 evidence

Records and tools that measure the governance layer for Spec 131. The records are dated and say what they read; each tool generates evidence and carries no law.

- **`baseline-snapshot.sh`**: generates the baseline record that Peter's R9 asks for at a release's S (`.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "R9", item 3, his words: "one generated snapshot record, not a new mechanism"). Usage, from any checkout:

  ```bash
  bash .kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh <prev-S> <S> <walk-start> <version>
  # 16.2.0: bash …/baseline-snapshot.sh 38f4ece47 <16.2.0's S> 2c00cea49 16.2.0 > …/evidence/<date>-baseline-16.2.0.md
  ```

  - It reads git objects only (no checkout, no network) and prints markdown: every figure with the command that produced it.
  - Figures marked "heuristic" print their definition beside them.
  - It is in no CI lane and no rule names it. The record is pasted at S, with the same figures at the previous S (`38f4ece47` for 16.2.0) beside it.
- **`spec-facts.sh`**: lists, for one spec and one window, where a reader should look before the spec's round. It was built for Spec 131's step 2, on Peter's "Proceed as the team recommends" (chat, received before 2026-11-04T03:19:41Z), answering the options message that followed the facts-generator consult of 2026-11-04. Usage, from any checkout:

  ```bash
  bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh <spec-id> <since-sha> <read-sha>
  # e.g. bash …/spec-facts.sh 129 616f5a208 4d10202b2
  ```

  - It reads git objects only (no checkout, no network) and prints markdown to stdout: nine rows, each with the command that produced it, and a fixed footer. The footer names the generator's commit, the arguments, the read SHA and the generator's blind spots, and gives the line that re-runs it from `git show`.
  - Both SHAs must be SHAs. A branch name is refused, because a branch moves and the output would stop being re-runnable.
  - Its rows are candidates, not verdicts. It says where to read, never what is open, ruled or owed, and it prints lists, not totals.
  - **No rule names its output, and it carries no law.** It has no markers, no `--check` mode and no CI wiring.
  - **When to run it**: at a spec round's open, or on demand. It is never a release duty.
  - If a round keeps its output, keep the stdout unedited and name the file by its read SHA. Commentary on it belongs in the round's feedback.
  - Whether it becomes standing practice is Spec 131's question.
- **`2026-10-24-ballot-audit.md`**, **`2026-10-24-test01-upgrade-rehearsal.md`**, **`ballot-audit-readers/`**: the outline round's evidence (see each file's header).
