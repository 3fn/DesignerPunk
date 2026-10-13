# Task 22.5 Completion — DD9 confirmed; the G2 backstop; the U3 PR

**Date**: 2026-10-13
**Agent**: Lina (Sonnet) · PRIMARY, Task 22; DD9 is **Leonardo's** (Opus) and is cited, not restated.
**Delegated-tier**: plan held (subtask; no parent line owed).

## DD9: confirmed, in Leonardo's words

The record is `completion/task-22-5-dd9-leonardo.md` (his read at `d637c7b5f`, copied byte-for-byte from his session record; he authored it, I only placed it). His verdict, quoted from it:

> "DD9 is confirmed, not flipped. Bare `init` sets up Claude Code and says so first, in one line that also hands a Kiro user the one command that corrects the guess. The install path never relies on the default, because every doc spells `--target=<cc|kiro>`. So the default costs a wrong guesser one command, and costs a reader of the docs nothing. The residual stands as DD9 wrote it: nothing shows `cc` is the persona's majority harness. The notice is what makes that acceptable, and U5's persona (c) running bare `init` in Kiro is where it gets tested."

- The notice string equals the catalog row (A2) and is asserted: `src/cli/__tests__/errorCatalog.test.ts` › "bare `init` default notice (A2)"; `init.test.ts` › "bare init prints the named-default notice FIRST…". The founder count is unchanged (5; `path-steps` in `install-doc.test.ts`).
- His two carried items stand: `example-home.yaml` as placed is consistent with the guide's UI Tree Convention (19.5 item 8 applied); the 22.3 token-name check stands. His two CHANGELOG corrections (C-1 the false success after an override abort; C-2 the `validate` defect) were applied to the release-3 entry's "Known limitations" at `a764f0c18`; `install-doc.test.ts` 60/60 (the asserted scope sentence and HOLDS block are not in those bullets).

## The G2 backstop (Peter's PR-5; the mechanical gate for opening the PR)

The PR rests on the **first limb**:

```
$ git merge-base --is-ancestor 31a8c9194 HEAD; echo "exit=$?"
exit=0
```

`31a8c9194` is U3g's squash on `main` (#313, cycle 2 HOLDS); it is an ancestor of the PR head (and of `origin/main`, exit 0). The second limb (Peter's dated re-ruling in `.kiro/issues/2026-10-02-g2-pass-four-findings.md`) is not used. The PR body names the first limb.

## Claims

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | DD9 is confirmed by its owner, quoted | `task-22-5-dd9-leonardo.md` | VERIFIED (record) |
| 2 | The G2 backstop's first limb holds | `git merge-base --is-ancestor 31a8c9194 HEAD` → exit 0 | VERIFIED-CODE |
| 3 | The notice and the founder count | the tests above | VERIFIED-CODE |
