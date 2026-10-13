# Task 30 — Instruments block

**Written**: 2026-10-12, before subtask 30.0 (unit head `a89b27286` = `origin/task/123-u3g-g2c2`, Task 29 closed) · **PRIMARY**: Lina (Opus). Stacy authors the attack file and the verdict record, outside the line. Thurgood is recused.

**Binding**: the instrument-existence ballot (`.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md`) is RATIFIED, and Spec 123 stays on M1's execution-time form (§ 4a). No subtask of Task 30 has started. This block is Task 30's first commit.
**Sha convention**: as Task 29's. Each `exists` row names the commit that last touched `<path>` as of `a89b27286`.
**Criteria order**: Task 30's criteria in `tasks.md` order. The parity parser reads **8** criterion rows (`parseTasksMd`, 0 malformations), numbered C1–C8:
- C1 closed verdict tokens and the selector
- C2 the pre-declared consequence texts at C0′
- C3 the request names a frozen H′; nothing lands between request and verdict
- C4 Stacy's verdict record
- C5 the completion doc cites, never paraphrases
- C6 on `HOLDS`: the consequence applied byte-equal
- C7 on `DOES-NOT-HOLD` or `NOT-RUNNABLE`: the hold stands
- C8 tripwire line; `npm test` and `tsc` green

| # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
|---|---|---|---|---|---|
| 1.1 | C1 the token set and the selector rule | the selector section of `completion/g2-cycle-2-consequence-texts.md` | built here (30.0) | — | 30.0, 30.2 |
| 1.2 | C1 the selector's precedent | Task 18's selector (`completion/g2-consequence-texts.md` § 2) | exists (`.kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md` @ `669b51b09`) | the form the plan cites ("§ 2"); the cycle-2 file carries the cycle-2 tokens | 30.0 |
| 1.3 | C1 the verdict line's form in Stacy's record | her record conditions § 5 | exists (`.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-refusal-conditions.md` @ `ec9fe0a9a`) | states the exact three line forms the selector reads | 30.0 |
| 2.1 | C2 the consequence texts | `completion/g2-cycle-2-consequence-texts.md` at C0′ | built here (30.0) | — | 30.0 |
| 2.2 | C2 C0′ ⊑ H′; never edited after C0′; no Thurgood line | `git merge-base --is-ancestor C0′ H′`; `git diff C0′ H′ -- <file>` empty; `git log --format='%h %an %b' -- <file>` has no Thurgood author or `Agent: thurgood` trailer | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `6dc435cc5`) | the criterion and Stacy's RF5 prescribe them; git computes them | 30.1, 30.3 |
| 2.3 | C2 the PR-5.3 hold, verbatim | the source sentence | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `6dc435cc5`) | § "Expected release count", the G2-hold amendment, quotes PR-5.3 | 30.0 |
| 3.1 | C3 the request record names H′ (W3) | the 30.1 request record | built here (30.1; the orchestrator routes it) | — | 30.1 |
| 3.2 | C3 nothing lands between request and verdict ((i)–(iii)) | `git diff --name-only <H′> <PR head> -- <declared input set>`, and the same after the squash | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `6dc435cc5`; input set: `.kiro/specs/123-consumer-distribution/completion/task-29-4-completion.md` @ `d5939d1da`) | the criterion prescribes the commands; 29.4 declares the input set | 30.1, 30.3 |
| 3.3 | C3 W1: the lock agrees with the tree, run by a seat other than Stacy | `npm run check:122:diff-guard` at H′ from a clean tree, quoted | exists (`tools/agent-generator/diff-guard.ts` @ `669b51b09`) | the guard's own verdict lines; Stacy repeats it read-only | 30.1 |
| 3.4 | C3 W4/NR5: a green `--ci` dispatch at H′ (the `122-diff-guard` context, `verify-signing-chain --ci` inside it) | a branch-head dispatch of the required workflows (`complete-task.sh --subtask` or `gh workflow run`) | built here (30.1) | — | 30.1 |
| 4.1 | C4 Stacy's verdict record, one token | `completion/re-grounding-g2-cycle-2.md` | MISSING → Stacy: written after the request (30.1). **Blocks 30.2 and 30.3** → resolved 2026-10-12: exists (`.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-2.md` @ `15d7a2c0f`, one token, `HOLDS`) | — | **30.2, 30.3** |
| 5.1 | C5 the completion doc cites the record path | `completion/task-30-completion.md` | built here (30.3) | — | 30.3 |
| 6.1 | C6 the consequence applied byte-equal | byte check: concatenate the selected blocks from the texts file at C0′, `diff` against the applied section | built here (30.2) | — | 30.2 |
| 6.2 | C6 Task 18's record not edited | `git diff <cut> <PR head> -- completion/task-18-completion.md completion/re-grounding-pass-four.md` empty | exists (`.kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md` @ `669b51b09`) | git computes it | 30.3 |
| 7.1 | C7 the hold's enforcement where the operator meets it | the RELEASE-FLOW step-5 line (Thurgood's record-first amendment to the hermetic-publish ballot, PR-15) and Ada's `scripts/release-publish.ts` check | MISSING → Thurgood (the ballot amendment), Ada (the script, under its grant): neither is on `origin/main` @ `7aa433fca` (still absent at `32a811a21`, the verdict record's § 8; still MISSING at Task 30's close) (no G2-hold line in `.kiro/hooks/RELEASE-FLOW.md`; no cycle-record read in `scripts/release-publish.ts`). **Blocks nothing in U3g**: the hold is in force by ruling (PR-15: no version is published until the amendment lands) | — | none |
| 8.1 | C8 the tripwire line | the U3g PR body | built here (30.3) | — | 30.3 |
| 8.2 | C8 `npm test` and `tsc` green | the lanes | exists (`package.json` @ `762b8c209`) | measured at 29.7 (`d1fcda970`); re-run at 30.3 | 30.3 |
| 9.1 | (unit) the ARMING event at U3g's merge | Stacy's ARMING record | MISSING → Stacy: post-merge. **Blocks nothing in Task 30** → at Task 30's close: still MISSING → Stacy, by design. It is written at U3g's merge | — | none |

**Counts (at writing)**: N = 18 — exists 8 · built-here 7 · missing 3 · unlisted 0.

**MISSING rows and what each blocks**:
- 4.1 (Stacy's verdict record): blocks 30.2 and 30.3.
- 7.1 (the hold's enforcement layers): blocks nothing in U3g. It is owed before any publish.
- 9.1 (ARMING): post-merge.

**30.0 can run now.**

## Found later

**Counts (final, 2026-10-12, at Task 30's close)**: N = 18 — exists 9 · built-here 7 · missing 2 · unlisted 0.
- Row 4.1 resolved to `exists`.
- **Still MISSING**:
  - **7.1**: the hold's enforcement layers (Thurgood, Ada). They block nothing in U3g; with `HOLDS` the hold lifts at the squash.
  - **9.1**: Stacy's ARMING record, written at merge, by design.
- No `## Found later` entries.
