# U2a: Task 12 scoped read (fork M-1)

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a (merged: #222 → `24c7f060`; PR head `7e5091ce`; merge-base `89ddf08c`) · **Reader**: Stacy
**Date**: 2026-09-27 · **Branch**: `chore/123-post-u2a-stacy-m1` @ `24c7f060`
**What this is**: the one-shot, spec-local post-acceptance read that fork M-1 requires when `G1 runs: <k>` > 1. Peter ruled it (A)+conditional on 2026-09-27; see `tasks.md` § "Declared Merge Units", MIDPOINT block, "Fork M-1", and Task 12's post-unit note.
- **It is not a claims pass.** It is not the MIDPOINT pass and not a trigger-table row, and it is **never a gate on the U2b cut.**
- The U2b MIDPOINT pass cites this record and is never narrowed by it.
- It carries the claims-pass template's Scope, Findings and Method sections, and the mandatory `Standards implications:` line.

**Disclosure**:
- Task 12's evidence is largely about **my own verdict records**, G1 runs 1 and 2 (`35610fef`, `5a411450`).
- **I check the claims made about those records**: that they exist, where they sit, that there is one verdict, that the domain line and disclosure are present, and that every run was kept.
- **I do not re-adjudicate the verdict.** That would audit my own verdict with my own verdict.
- **No Task 10 or Task 11 row is in scope** (see Scope), so no exemplar I constructed or confirmed is read here.
- Closed negative: *not independently re-verified. Read by the auditing seat that issued the verdict.*

---

## Scope

- **Trigger**: `G1 runs: 2` (the kept records are `re-grounding-c3-falsification-run-1.md` and `-run-2.md`, and the PR #222 tripwire line reads `G1 runs: 2`). **k > 1 → M-1 fires.**
- **The rework-touched set**, as ruled:
  - **The run-1 commit**: `git log --diff-filter=A 7e5091ce -- .kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-1.md` → **`35610fef`**.
  - **`git diff --name-only 35610fef..7e5091ce`** → 11 paths:
    - completion docs: `re-grounding-c3-falsification{,-run-2}.md`, `task-11-completion.md`, `task-12-{1,2,3}-completion.md`, `task-12-completion.md`;
    - `design.md`, `requirements.md`, `tasks.md`;
    - `docs/specs/123-consumer-distribution/task-12-summary.md`.
  - **∩ the Tasks 10–11 Primary Artifacts** (`tasks.md` at `24c7f060`):
    - Task 10: `tools/agent-generator/{frontmatter,partition,spans}.ts`, `adapters/{cc,kiro}.ts`, `__fixtures__/golden-partition/`;
    - Task 11: `canonical/operative-sets/*.yaml`, `canonical/profiles/consumer/confirmations/*.md`, `canonical/coverage-map.yaml`, `canonical/adjudications.yaml` (F3 rows), `completion/f3-coverage-map-adjudication-ruling.md`.
  - **→ ∅ (empty). Verified, not adopted** from Thurgood's 12.2 addendum.
  - **A prose cross-check on "cited artifact"**, beyond the formula:
    - The rework `a5d1d2a5` modified `task-11-completion.md`, but only as an appended A-3 erratum (`git diff a5d1d2a5^ a5d1d2a5`). No Task 11 criterion row's Status or Evidence changed.
    - Neither `task-10-completion.md` nor `task-11-completion.md` cites `requirements.md` or `design.md` in any row (`grep -c` → 0 and 0).
  - **→ The population is Task 12 only.**
- **Population**: Task 12's parent completion doc (13 criterion rows, including the three decomposed branch rows); its three subtask docs (12.1, 12.2, 12.3); the summary; the U2a PR body (`gh pr view 222`); and the squash commit message `24c7f060`, which carries Peter's R2-F1 ruling.

## Findings

Two findings. Both are **Low** and **consequence-free for Status**: every row's ✅ or ⚠️ stays true, and in each case only a supporting gloss in the Evidence cell is inaccurate. **Neither affects the merge, the M-1 set, or the U2b cut.** Classification (112 taxonomy): an Evidence-cell misstatement, where the claim holds and the stated support is partly false.

**F-1 — "touched `requirements.md` and `design.md` only" is false as stated.**
- **Promised**: the Task 12 row "The selected branch is executed by this parent's agent and evidenced", with its rework evidence.
- **Claimed** (`task-12-completion.md` line 29): "`a5d1d2a5` … which touched `requirements.md` and `design.md` only".
- **Shipped**: `git show --name-only --format= a5d1d2a5` → `requirements.md`, `design.md`, **`completion/task-11-completion.md`** and **`completion/task-12-2-completion.md`**.
- The same parent doc's T1-(B) table discloses the `task-11-completion.md` edit, and the 12.2 addendum lists all four files correctly. So the error is local to this Evidence cell.
- **Routing**:
  - *Remediation*: to **Thurgood**, the owning agent, as an explicit message (relayed by the coordinator; this seat cannot send one itself). Fix the gloss to name the four files, or say "only `requirements.md` and `design.md` among the C3 text".
  - *Standards*: none (see below).

**F-2 — the tripwire gloss attributes 12.3 wrongly (the count is right).**
- **Promised**: the Task 12 row "The U2a PR body carries the tripwire line with `G1 runs: <k>`".
- **Claimed** (`task-12-completion.md` line 36, and the PR #222 body and squash message): the line `declared 11, now 13` is glossed as "11.5 was added (the F3 amendment) … **The split's 12.3 is inside the declared 11**".
- **Shipped**: `tasks.md` § "Split tripwire" (the split amendment, line 167) says the opposite. U2a's frozen 11 is "5 + 4 + 2"; "**the split itself adds 12.3** … so U2a's line reads `declared 11, now 12`". Line 169 then adds 11.5 → `now 13`.
  - The count, **13**, is correct: 10.1–10.5, 11.1–11.5 and 12.1–12.3. It is within U2a's +3 threshold.
  - The explanation of which additions made it is wrong: the growth is **+2** (12.3 from the split, and 11.5 from F3), not +1.
- **Why it matters (Low)**: Peter owns the tripwire read. A gloss that hides one of the two additions understates the unit's growth to the reader the tripwire exists for.
- **Routing**:
  - *Remediation*: to **Thurgood** (explicit message, relayed). Correct the gloss in `task-12-completion.md`. The PR body and squash message are immutable history; the corrected gloss in the doc is the record.
  - *Standards*: none.

**No finding on**:
- the G1 record claims;
- the gating and ordering claims;
- the shipped-file row, whose ⚠️ is correctly placed and disposed;
- the CI claims;
- the delegated-tier line;
- subtask-doc presence;
- criteria parity;
- the R2-F1 ruling's record.

## Method: the sample, named, and how many of the total

**Criterion rows: 13 of 13 read. Every row's evidence was re-verified where a command could reproduce it; the rest are named.**

| Claim class | Rows | Re-verified here (at `7e5091ce` / `24c7f060`; the trees are identical, `git diff --quiet` → equal) | Verdict |
|---|---|---|---|
| **The G1 record** (exists; exactly one verdict; domain line; disclosure; kept runs) | 1 | `grep -c '^## CURRENT VERDICT: '` → 1; run-1 and run-2 present at `35610fef` and `5a411450`, both `Agent: stacy` | verified |
| **Cites, never paraphrases** (11.8.4) | 1 | Read the parent, 12.1, 12.2 and 12.3 and the summary. Verdicts are named by branch label or path only. Carried findings restate properties, which are not verdicts | verified |
| **Branch execution** (the HOLDS / BREAKS / branch-A sub-rows) | 4 | Rework `a5d1d2a5` present. Branch A not invoked (`grep -c 'P2-a'` on the current verdict → 0). The PR opened on HOLDS | verified; **F-1** on one gloss |
| **Gating and ordering** (no PR at BREAKS; no `triviality.ts`; no rework-added `canonical/` file) | 3 | `gh pr list --head task/123-u2a-g1 --state all` → only #222, created `2026-09-28T03:11:05Z`, after run 2 (`5a411450`, 03:04Z). `git ls-tree -r --name-only 7e5091ce -- tools/agent-generator/regrounding/triviality.ts` → empty (same at `24c7f060`). `git diff --name-only --diff-filter=A 89ddf08c..7e5091ce -- canonical/` → exactly Task 11's eight files. `git show --name-only --diff-filter=A --format= a5d1d2a5 -- canonical/` → empty | verified |
| **Shipped files** (⚠️ row) | 1 | `git diff --name-only 89ddf08c..7e5091ce` → **74** paths ∩ `npm pack --dry-run --json --ignore-scripts` → **exactly the eight** `.kiro/agents/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}-prompt.md.attribution.json`. *My pack listed 693 files, against the claimed 1602, because this worktree has no built `dist/`. The intersection is path-level over the diff, and no diff path is a build output, so the result is unaffected.* Disposition: F1 stands (`tasks.md` § "Expected release count"; `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`) | verified; ⚠️ correct |
| **Tripwire line** | 1 | Count 13 recomputed (and `declared 11` against § "Split tripwire"). Parents unchanged. Successor branch: `git ls-remote --heads origin 'task/123-u2b*'` → none. Locally, the only U2b-related branch is `chore/123-post-u2a-u2b-amend`, which starts at the merge `24c7f060`, so there was no successor commit while U2a was unmerged. `G1 runs: 2` → 2 kept records | verified; **F-2** on the gloss |
| **Validation** (`npm test` / `tsc`) | 1 | The local counts (385/9290; exit 0 at `5a411450`) are **not re-verified: the toolchain is unavailable** (this worktree lacks the generated artifacts and `mcp-server/dist`). Superseded by the gate: PR #222's required checks at `7e5091ce` include `lane-functional-root` and `lane-typecheck`, and **all 21 checks passed** (`gh pr checks 222`). The claimed branch-head run `36371702441` has `lane-functional-root (unit-branch)` and `lane-typecheck (unit-branch)` = success | verified via the gate |
| **CI-provenance line** | (header) | All six cited runs → `conclusion: success`, `headSha` `a5d1d2a5` (`gh run view`). `git diff --name-only a5d1d2a5..7e5091ce` → completion docs, the summary and `tasks.md` only; the `tasks.md` hunk is exactly the three checkbox flips (12, 12.2, 12.3) | verified |

**Other checks**:
- **Criteria parity**: `npm run check:completion-criteria-parity` at `24c7f060` → `SUMMARY: parents evaluated 15, pass 15, fail 0; emissions 0; reds 0`, with 123's parents 10, 11 and 12 PASS. **The emission lines read: none.**
- **Subtask-doc presence**: 3/3 (12.1, 12.2, 12.3).
- **Delegated-tier line**: present, in the fixed form `plan held`. Consistent with the plan stamp (PRIMARY Thurgood (Opus); Stacy's records outside the line) and with the docs' routing statements. **Spot-checked 1/1 (fraction 1/1).**
- **Deferral walk-back**: no `Artifact deferred:` declarations in Task 12's docs (`grep` → 0).
- **Peter's R2-F1 ruling** ("PROCEED ON HOLDS"): a committed record exists in the squash message of `24c7f060`. It is not yet in `tasks.md`; the ruling itself assigns it to the U2b-cut amendment. **The U2b MIDPOINT checks that it landed** (with R2-F1's text) before Task 15.
- **Not re-verifiable here**:
  - the local test counts (above);
  - the point-in-time claim "Task 13 unstarted", which is consistent with the absence of any `task/123-u2b*` branch today.
- **Access note**: the `gh` reads used the repository's token from the main checkout's `.env`, read in the same shell call and never printed or written.

**Standards implications: none.** Both findings are local Evidence-cell glosses, not a standard teaching the wrong thing. F-2's arithmetic is spread across two separate amendment notes in § "Split tripwire" (lines 167 and 169). That is a readability hazard in `tasks.md`, the plan owner's, and not a standards gap.
