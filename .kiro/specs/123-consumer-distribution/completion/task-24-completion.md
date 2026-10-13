# Task 24 Completion — U1b backward check, the release recipe (B-U4), and the changelog step

**Spec**: 123 — Consumer Distribution · **Unit**: U4 — Content policy (`u4-content`; parents 23–24; **this is the gating parent**, so its completion opens the U4 PR) · **Type**: Documentation · **Validation**: Tier 2
**Agent (plan)**: PRIMARY Thurgood (Opus)
**Delegated-tier**: plan held
**CI-provenance**: branch-head dispatch @ a42900dac85e7fe6b54ce1f4ca961bb92d25e086 — https://github.com/3fn/DesignerPunk/actions/runs/38482898882, https://github.com/3fn/DesignerPunk/actions/runs/38482906106, https://github.com/3fn/DesignerPunk/actions/runs/38482914170, https://github.com/3fn/DesignerPunk/actions/runs/38482921632, https://github.com/3fn/DesignerPunk/actions/runs/38482928722, https://github.com/3fn/DesignerPunk/actions/runs/38482935669
*(All six green, measured at the Task 23 parent-close commit — before the `main` merge `ccf4dbeb8`, the lock refresh and this doc. The gate runs on PR #329; its `PR gate` line replaces this one in the post-merge records PR, the Task 22 / #323 precedent. Only a PR-gate line supports "the gate is green".)*
**Instruments**: 26 listed — exists 19 · built-here 7 · missing 0 · unlisted 0 — .kiro/specs/123-consumer-distribution/completion/task-24-instruments.md
**Traces**: Req 21.1–21.3, 23.7 · design C29, DD13, DD16

## Success Criteria

Criteria reproduced verbatim from `tasks.md` @ `bdfdc9951` (L1471–1473; the parity parser reads 3 rows, 0 malformations).

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| `validation/u1b-backward-check.md` covers every 125-B `governance/` prune, **with the denominator enumerated from `git log` in the record**. **It includes the reference-mode residual Ada recorded**: served docs pointing at no-longer-shipped `src/` paths (D-T-A6). Findings are routed as explicit messages. | ✅ verified met | `.kiro/specs/123-consumer-distribution/validation/u1b-backward-check.md`: **§ 2 (L21–99)** — `git log --first-parent --format='%h %cs %s' 8007105fa -- governance/ \| grep '(125-B)'` with its 10-commit output pasted; 3 prune commits, 7 content hunks (H1–H7), each with its ballot hunk id; non-prunes and steering hunks excluded by name; the closeout's "12 hunks" reconciled as 6 `governance/` + 6 steering. **§ 3 (L100–157)** — per-hunk verdicts, 4 no consumer loss, 3 → findings F-P1, F-P2. **§ 4 (L158–194)** — D-T-A6 against `npm pack --dry-run --json --ignore-scripts` (1657 files): 97 mentions, 96 lines, 67 paths, 19 docs not shipped. **§ 5 (L195–240)** — 25 findings; § "Delivery" (L232): Lina and Ada sent explicit messages by the orchestrator, both ACKNOWLEDGED with no row disputed; Thurgood's D-17–D-23 as `.kiro/issues/2026-10-13-u1b-backward-check-thurgood-findings-d17-d23.md` (PR #327, `a5708a670`) |
| **B-U4** is RATIFIED before its edits apply. It carries the trio obligation (23.7) and the **recurring** changelog step (21.2); the CHANGELOG itself exists since U1. | ⚠️ verified unmet or partial | **Met on the branch**: `.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md` § 4 (L80–99) carries the trio obligation (item 2 → R-2, applied at `governance/release-management-system.md` L42) and the recurring changelog step (item 1 → R-1, applied at L40; F-1 at `.kiro/hooks/RELEASE-FLOW.md` L118). `CHANGELOG.md` exists since U1 (L46, `## [15.0.0] — 2026-10-02`). Order (§ 2's r1 instrument): `git merge-base --is-ancestor 757803488 <c>` → 0 for every governed commit `f0f019a77`, `4ef03c2e0`, `fd18cab72` (pasted under "Additional verification"). **Pending**: ratification under form (r1) is Peter's merge of the U4 PR (Peter's ruling item 4, `completion/u4-rulings-2026-10-13.md`), so the edits apply to `main` at the same act that ratifies them. The ballot's `**Status**` (L5) correctly reads DRAFT until then. **Follow-up**: the post-merge record-only stamp of the Status and section-status lines plus the README entry (ruling item 4; orchestrator) |
| The U4 PR body carries the tripwire line. | ⚠️ verified unmet or partial | The PR does not exist at writing. The body to apply, `.kiro/specs/123-consumer-distribution/completion/u4-pr-body.md`, carries `Tripwire: declared 6, now 6; parents unchanged; successor branch: none`. Declared 6, threshold +2 (`tasks.md` L265); now 6 (`grep -cE '^  - \[.\] (23\|24)\.[0-9a-z]+' tasks.md` → 6); `git ls-remote --heads origin 'task/123-u5*'` → empty (pasted below). **Follow-up**: `gh pr edit <n> --body-file .kiro/specs/123-consumer-distribution/completion/u4-pr-body.md` at PR open (orchestrator), then `gh pr view <n> --json body` shows the line |

Unmet or partially met criteria:
- **Criterion 2 (B-U4 RATIFIED before its edits apply)** — pending Peter's merge of the U4 PR (form r1). Follow-up: the post-merge B-U4 status stamp and README entry, `completion/u4-rulings-2026-10-13.md` item 4.
- **Criterion 3 (the tripwire line in the U4 PR body)** — pending PR open. Follow-up: apply `completion/u4-pr-body.md` with `gh pr edit --body-file` (the U3 precedent, `completion/u3-pr-body.md`).

## Validation

Orchestrator, worktree `wt-u4` at `ccf4dbeb8` + the refreshed lock and the Task 24 docs (2026-10-13): `npx tsc --noEmit` exit 0 · `npm test` 395 suites / 9550 tests passed · `npm run test:scripts` 19 / 453 · `mcp-server` suite 42 / 697 · `application-mcp-server` suite 31 / 432 · `npm run check:122:diff-guard` operative-set-freshness PASS, diff-guard no-op-green (lock refreshed: `inputClosure` only; `outputs` unchanged) · `npx tsx scripts/audience-banner/predicate.ts` → `18 match; 18 carry`, exit 0 · completion-criteria-parity 29/29 PASS. `test:consumer` not run locally (the Consumer Guard workflow runs it at the gate).

## Additional verification

Primary Artifacts: all shipped as declared — the four below, each on the branch:
- `.kiro/specs/123-consumer-distribution/validation/u1b-backward-check.md` (24.1, `dc15b74c9`);
- `.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md` (`757803488`, ruled form `bdfdc9951`);
- `governance/release-management-system.md` (R-1–R-4, `4ef03c2e0`);
- `.kiro/hooks/RELEASE-FLOW.md` (F-1, F-2, `4ef03c2e0`; added to the artifacts by ruling item 2).

**B-U4 § 2, the ordering instrument over the whole governed set** (run at writing, HEAD `ccf4dbeb8`):

```
$ git log --format=%h 8007105fa..HEAD -- governance/ .kiro/hooks/RELEASE-FLOW.md
f0f019a77
4ef03c2e0
fd18cab72
$ git merge-base --is-ancestor 757803488 f0f019a77; echo $?
0
$ git merge-base --is-ancestor 757803488 4ef03c2e0; echo $?
0
$ git merge-base --is-ancestor 757803488 fd18cab72; echo $?
0
$ git rev-list --no-merges 8007105fa..HEAD -- 'governance/*.md' .kiro/hooks/RELEASE-FLOW.md | wc -l
3
$ git diff --name-only ccf4dbeb8^1 ccf4dbeb8 -- governance/ .kiro/hooks/RELEASE-FLOW.md | wc -l
0
```

- The merge commit `ccf4dbeb8` (`origin/main` into the unit branch) is **not a governed content commit**. It carries `main`'s side only (`e3bc68a6f`, `d1f83a566`, `a5708a670`), and none of those touch `governance/` or `RELEASE-FLOW.md`: `git diff --name-only ccf4dbeb8^1 ccf4dbeb8` over those paths → 0 files. `git log` lists no `main`-side commit for those paths.
- The shared file's separability (B-U4 § 2): `fd18cab72` touches `@@ -11 +11 @@` only, and `4ef03c2e0` touches L14–15, 40, 42 and 49 (`task-24-2-completion.md`).

**The lock refresh** (Task 23 O-8; the one refresh at unit close), from a clean tree (`git status --porcelain` → 0 lines):

```
$ npm run check:122:diff-guard
operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
diff-guard: full-run-green (input-closure-changed)
$ git diff canonical/generated.lock
-  "inputClosure": "78dc42d85d968295719b00677c5714dbde2c050c20d592d1fd0c74008d1a2c67",
+  "inputClosure": "64e4d1abcd68610f7a478d4c8c4933720cf096d96209ee13ab98ed34589cd6d0",
   "outputs": "3b2d44d48e46ad8576a81da5ed2a3b24bdaec1d2380c7ab65285d87233eb34a7"   (unchanged)
$ npm run check:122:diff-guard        # re-run against the refreshed lock
diff-guard: no-op-green
```

Only `inputClosure` moved, as expected: `governance` is an input-closure root, and U4 changed 20 banners and the recipe. **`outputs` is unchanged, so no generated agent text moved.**

**The tripwire, Limb 2**:

```
$ git ls-remote --heads origin 'task/123-u5*' 'task/123-u4*'
a42900dac85e7fe6b54ce1f4ca961bb92d25e086	refs/heads/task/123-u4-content
```

One line, the unit's own branch. No `task/123-u5*` branch exists, so the successor branch is `none`.

**Post-unit obligations** (`tasks.md` L359; claims passes verify them, not this doc):
- docs-MCP `rebuild_index` after U4 merges;
- `node scripts/validate-steering-metadata.js` on the edited doc;
- the B-U4 status stamp and README entry (r1 follow-up);
- the release-4 CHANGELOG line for the banners;
- Stacy's ARMING read at this merge (notice block in `task-23-3-completion.md`).

**Claims events**: U4 has none of its own. It rides release 4's RELEASE pass (`tasks.md` L112).

## Open items (stated, not criterion failures)

- **The Task 24 trace "Req 21.1–21.3"** (`tasks.md` L1468) names an acceptance criterion that does not exist: Req 21 has two (instruments block O-7). It is recorded, not amended.
- **The 23.3 subtask line** (`tasks.md` L1463) still reads "the rows-list-the-guard evidence" after criterion 4's amendment. It is a checkbox line, left for the orchestrator.
- **The D-T-A6 class remedy** (the `src/`-path sentence and the labelling convention) is chartered at `.kiro/issues/2026-10-13-src-path-convention-for-served-governance-docs.md` (ruling 7-class). Ada's not-shipped findings wait on it.
