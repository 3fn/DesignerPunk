# Task 31 — Instruments block

**Written**: 2026-10-12, before subtask 31.0 (unit head `dcd337dcf` = `origin/main`; branch `task/123-u3c-profile-corrections`) · **PRIMARY**: Thurgood (Opus)

**Binding**: the instrument-existence ballot (`.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md`) is RATIFIED, and Spec 123 stays on M1's execution-time form (§ 4a). No subtask of Task 31 has started. This block is the unit branch's first commit.
**Sha convention**: each `exists` row names the commit that last touched `<path>` as of `dcd337dcf`. Each passed `git cat-file -e <sha>:<path>` and `git merge-base --is-ancestor <sha> dcd337dcf`. For a command, `<path>` is its defining file.
**Criteria order**: Task 31's criteria in `tasks.md` order (`tasks.md` @ `53a3d413b`). The parity parser reads **10** criterion rows (`parseTasksMd`, 0 malformations), numbered C1–C10:
- C1 the batch: the five seeds, the sweep hits dispositioned "correct here", and the cite-only commit
- C2 who words what
- C3 the 31.0 broad sweep
- C4 pre-edit instruments
- C5 cite-only corrections
- C6 divergent 7
- C7 one re-sign round
- C8 the lock
- C9 order before U3g
- C10 full validation

**Working assumption (orchestrator, 2026-10-12, reversible before 31.4)**: J divergents are **carried by name**, so re-signs are new acts and no divergent closes in U3c. That assumption is what makes row 7.3 non-blocking.

| # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
|---|---|---|---|---|---|
| 1.1 | C1 (i) the intro-line reword | `tools/agent-generator/render.ts` `renderGroundTruthTrims` (the intro string), shared template | exists (`tools/agent-generator/render.ts` @ `669b51b09`) | L193–194 hold the string the reword replaces; Thurgood words it, Lina edits | 31.1 |
| 1.2 | C1 (i) the edit | Lina's `render.ts` edit, with Thurgood's wording | built here (31.1, Lina Sonnet) | — | 31.1 |
| 1.3 | C1 (ii) the Kiro blank line in the container span | `tools/agent-generator/adapters/kiro.ts` | exists (`tools/agent-generator/adapters/kiro.ts` @ `669b51b09`) | the Kiro `## Ground truth` emission; the issue names it (`.kiro/issues/2026-10-02-kiro-ground-truth-heading-no-blank-line.md` @ `e30ee6d8f`) | 31.1 |
| 1.4 | C1 (ii) the edit | Lina's `kiro.ts` edit | built here (31.1, Lina Sonnet) | — | 31.1 |
| 1.5 | C1 (iii)/(iv)/(v) the texts | `canonical/profiles/consumer/{kenya,data}.overlay.md`, `{kenya,data}.dispositions.yaml` (the `theming-1` removals) | exists (`canonical/profiles/consumer/kenya.overlay.md` @ `669b51b09`; `canonical/profiles/consumer/data.overlay.md` @ `669b51b09`; `canonical/profiles/consumer/kenya.dispositions.yaml` @ `669b51b09`; `canonical/profiles/consumer/data.dispositions.yaml` @ `669b51b09`) | the seeds sit at the overlay lines the plan names (kenya L27, L38, L39, L147, L160; data L27, L38, L39, L159) | 31.2 |
| 1.6 | C1 (iv) the operative items that move | `canonical/operative-sets/{kenya,data}.yaml` (`theming-1` and the others) | exists (`canonical/operative-sets/data.yaml` @ `669b51b09`; `canonical/operative-sets/kenya.yaml` @ `669b51b09`) | names the items a removal must cite | 31.2 |
| 1.7 | C1 the batch instrument | `git diff --name-only $(git merge-base HEAD origin/main) HEAD` ⊆ Primary Artifacts; the residual grep `including your theme (Swift\|Kotlin)\|Generated (Swift\|Kotlin) output includes\|materializes here` → 0 | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `53a3d413b`) | the criterion prescribes both; git computes them | 31.5 |
| 2.1 | C2 Kenya's and Data's reads of (iii)/(iv) and of each cite change | their read records (`…/scratchpad/u3c/{kenya,data}.md`, preserved on the branch and quoted in the completion doc) | MISSING → Kenya, Data: reads running (orchestrator, 2026-10-12) → resolved 2026-10-12, for 31.2's texts: exists (`completion/task-31-reads/{kenya,data}.md`, committed on this branch at `84c26e3f5`). The 31.3 cite text is **not** covered by them, so 31.3 waits for routed reads (`task-31-2-completion.md` § Held) | — | **31.2** (authoring commit), **31.3** (cite-only commit) |
| 2.2 | C2 Ada's fact-check of (iii)/(iv) against Task 19's label causes | Ada's read record | MISSING → Ada: fact-check, after Kenya's and Data's texts exist → resolved 2026-10-12: exists (`completion/task-31-reads/ada.md`, committed with 31.2): (iii) and (iv) TRUE | — | **31.2** |
| 3.1 | C3 the broad sweep | the plan's `git grep` pattern over the two overlays and every rendered Kenya and Data consumer text (sidecars excluded), pasted, every hit dispositioned | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `53a3d413b`) | the criterion gives the pattern and the path set | 31.0 |
| 4.1 | C4 the freshness stale list, before any edit | `runFreshnessSweep` (`tools/agent-generator/regrounding/freshness.ts`) | exists (`tools/agent-generator/regrounding/freshness.ts` @ `669b51b09`) | the sweep's findings are the stale list the round re-takes | 31.0, 31.4 |
| 4.2 | C4 `renderedHashOf` baselines | `readConsumerSpans` + `rowSpanSource` + `renderedHashOf` (`tools/agent-generator/derive.ts`) | exists (`tools/agent-generator/derive.ts` @ `669b51b09`) | VALVE-1's own hash function, so a baseline compares exactly with what the sweep checks | 31.0 |
| 5.1 | C5 cite-only corrections move no hash | the stale list before and after the cite-only commit (equal); `freshness.ts` L363–369 (a removal's `cites` is in neither hash) | exists (`tools/agent-generator/regrounding/freshness.ts` @ `669b51b09`) | read at the plan round; re-checked by run at 31.3 | 31.3 |
| 5.2 | C5 divergents 6, 8, 9 | the J table in the release-15.0.0 claims pass | exists (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-15.0.0.md` @ `0a299f2d0`) | names the three divergents and their rows | 31.3 |
| 6.1 | C6 divergent 7 carried by name | — | none — no text change and no act (the criterion says so); it is carried at release 3 | — | — |
| 7.1 | C7 the re-sign round | the signing-act ballot's clauses (batching, merge-only seat commits) and `verify-signing-chain` | exists (`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` @ `dff78bcde`; `tools/agent-generator/regrounding/verify-signing-chain.ts` @ `669b51b09`) | the ballot is the rule; the verifier walks every signing commit in range | 31.4 |
| 7.2 | C7 Kenya's and Data's re-sign acts (and any seat the stale list names) | seat signing commits, merged in, never amended | built here (31.4, the seats; attestation, outside every line) | — | 31.4 |
| 7.3 | C7 "if any divergent is to *close* here, RS-1 lands first" | Thurgood's RS-1 erratum to the signing-act ballot | MISSING → Thurgood: not drafted; **pending Peter's choice** (land RS-1 first, or carry the divergents). **Blocks only closing a divergent in U3c**; under the working assumption (carried), it blocks nothing → resolved 2026-10-12 (31.5): none — the conditional limb did not fire. No divergent closed in U3c; 5, 6, 8 and 9 are carried and each re-sign is a new act (`task-31-4-completion.md`). RS-1 stays owed by Thurgood, outside this unit, pending Peter | — | none under the assumption; 31.4 if Peter rules "close" |
| 7.4 | C7 a Stacy-signed row the intro reword moves | trigger (d)'s Peter sample; the § 5.3 amendment | MISSING → Thurgood: the § 5.3 ballot amendment (not drafted). **Not a U3c blocker**: it is owed before release 3's RELEASE pass. U3c discloses any Stacy-signed row the stale list names (`.kiro/issues/2026-10-03-stacy-signed-sample-trigger-d.md` @ `cb28f0112`) → resolved 2026-10-12 (31.5): none — the conditional limb did not fire. The post-edit stale list named only Kenya's and Data's six rows, so no Stacy-signed row moved (`task-31-4-completion.md`). The § 5.3 amendment stays owed before release 3's RELEASE pass, outside this unit | — | — |
| 8.1 | C8 one lock refresh after the round | `npm run check:122:diff-guard`'s own write, from a clean tree | exists (`tools/agent-generator/diff-guard.ts` @ `669b51b09`; `canonical/generated.lock` @ `8bd4bb505`; `package.json` @ `762b8c209`) | writes only on `full-run-green`; `outputs` moves here by design, so moved paths are listed | 31.4 |
| 9.1 | C9 U3c before U3g's cut | `git merge-base --is-ancestor <U3c squash SHA> <U3g branch base>` | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `53a3d413b`) | cited in Task 29 | after merge |
| 10.1 | C10 validation | `npm test`, `tsc`, `npm run test:agent-generator` incl. `consumer-entry.parity.test.ts`, the diff guard | exists (`package.json` @ `762b8c209`; `tools/agent-generator/__tests__/consumer-entry.parity.test.ts` @ `669b51b09`) | the lanes the criterion names | 31.5 |

**Counts (at writing)**: N = 21 — exists 13 · built-here 4 · missing 4 · unlisted 0. Row 6.1 is a `none` row and is not counted.

**MISSING rows and what each blocks**:
- 2.1 (Kenya, Data reads): blocks 31.2 and 31.3.
- 2.2 (Ada fact-check): blocks 31.2.
- 7.3 (RS-1): blocks nothing under the working assumption.
- 7.4 (§ 5.3): blocks nothing in U3c.

**31.0 and 31.1 can run now.**

**Found at the branch cut (recorded, not an instrument gap)**: on `origin/main` @ `dcd337dcf` the lock's `inputClosure` is stale. A plain `npm run check:122:diff-guard` here printed `full-run-green (input-closure-changed)` and **wrote** the lock; `outputs` did not move. The write was reverted (`git checkout -- canonical/generated.lock`); no lock change is committed before 31.4. The likely cause is closure-root changes merged since the last refresh (#303 touched `application-mcp-server/src`); that was not verified file by file. 31.4's refresh absorbs it.

## Found later
- 2026-10-12 — misfit — row 1.7, the residual grep `including your theme (Swift|Kotlin)|Generated (Swift|Kotlin) output includes|materializes here` → 0 over `canonical/profiles/consumer` + `canonical/_consumer-output` — criterion C1 — found at 31.2 — over that literal scope it is 6 by construction: (iv)'s own `theming-1` removals must quote the removed sentence, and four historical record lines (`confirmations/{kenya,data}.md` L47, `signatures/{data,kenya}.md`) quote the old text. Over the overlays and the renderings it is 0. Route: none needed to ship. The instrument is read as "overlays + renderings", and the plan is not edited (the orchestrator decides whether to record a dated reading). → at 31.5 the literal-scope count is **8**, same class: Kenya's and Data's 31.4 signature sections each quote the removed clause in their "removed, not reworded" statement (`signatures/kenya.md` L236, `signatures/data.md` L268). Over the overlays and the renderings it is still 0.
- 2026-10-12 — not an instrument; carried — the steward-side canonical text (`canonical/agents/{kenya,data}.md`: the `theming-1` lines, Kenya's L178 cue and L202 gap) claims emitted theme output that no production caller produces, in this repo as well as in a consumer repo (Kenya's read § "Hits outside the declared sweep path"; Ada's read). It is outside U3c's Primary Artifacts and outside the no-overlap paths' intent. Route: the orchestrator files it for Kenya, Data and the profile author, with Spec 129.
- 2026-10-12 — not an instrument; carried — Ada's notes: Data's bullet 4, "{Abbreviation} uses uppercase", is not enforced (the generator uses it verbatim, `TokenFileGenerator.ts:1389`, `KotlinEmitter.ts:11`); both seats omit that the shipped components hardcode `dpTheme`/`LocalDPTheme`; "Spec 129" goes stale if 129's open question 2 moves native theme emission to 128. Route: Spec 129 inputs (the orchestrator).
- 2026-10-12 — unlisted — the Req 11.3 (iii) deny-list (a cite to subtraction 1–4 must be shown to contain a deny-list hit) — criterion C5 (the cite-only corrections) — found at 31.3, Data's read — no deny-list exists in `tools/agent-generator` at this revision (`git grep -i deny`, tests excluded). The schema checks only the cite's value (`dispositions.ts` L87–93, L338). Applicability is a human reading today. Route: Spec 129 / a later C16/C18 touch, with the permission-bearing residual of the G2 ruling (the orchestrator).
- 2026-10-12 — misfit — row 1.7, limb 1: `git diff --name-only $(git merge-base HEAD origin/main) HEAD` ⊆ Primary Artifacts — criterion C1 — found at 31.5.
  - The Primary Artifacts list names "this parent's completion doc" and no other record.
  - The diff also carries this parent's other completion records: the subtask docs `task-31-{0..4}-completion.md`, this block, the three reads `task-31-reads/{kenya,data,ada}.md`, and the checkbox ticks in `tasks.md`. The ticks are checkbox-only hunks.
  - Every other path is inside the list.
  - Read literally, the instrument is red on records that Task-Completion-Protocol requires. The reading applied is "this parent's completion records".
  - Route: the orchestrator decides whether to record a dated reading. The plan is not edited.

**Counts (final, 2026-10-12, at Task 31's close)**: N = 19 — exists 15 · built-here 4 · missing 0 · unlisted 3.
- Rows 2.1 and 2.2 resolved to `exists`.
- Rows 7.3 and 7.4 resolved to `none` (conditional limbs not fired); like 6.1, they are not counted.
- U counts the `## Found later` entries of kind `unlisted` or `misfit`: two misfits (row 1.7, both limbs) and one unlisted (the deny-list). The two "not an instrument; carried" entries are routings, not gaps, and are not counted.
