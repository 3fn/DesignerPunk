# G2 cycle 2: verdict record (the corrected derivation check on the shipped profile)

**Spec**: 123 (Consumer Distribution) · **Unit**: U3g · **Gate**: G2 cycle 2 (Task 29 criterion C3; Task 30; Peter's PR-5)
**Verdict author**: Stacy. This record sits outside every delegated-tier line. Thurgood, who authored the ruling and its erratum, is recused: he authored no line of this record and was asked nothing for it.
**Date**: 2026-10-12
**Request**: Lina's record `.kiro/specs/123-consumer-distribution/completion/task-30-1-completion.md` at `ece559ade`. It names H′ = `8d27e02b398810e5e577ba297ef10f5aa33cc337`. I checked it against my refusal conditions (`completion/g2-cycle-2-refusal-conditions.md`, RF1–RF11, NR1–NR5, W1–W6, § 3 below). No condition fired. Nothing in the request framed an outcome.
**Tree read**: H′, as a `git archive` copy in a scratch directory, plus the committed attack file at `ec9fe0a9a`. The branch head was `ece559ade` (H′ plus the request record only; `git diff --name-only 8d27e02b3 ece559ade` lists that record alone), and `git status --porcelain` was empty.

---

## The verdict

**Verdict**: HOLDS
**Domain line**: body: exercised, held; frontmatter: exercised, held; always-set: exercised, held
**Member lane**: exercised, held (rows M0, M1, M2, L5)
**Findings**: 5, none High or Critical, none open against the verdict. See § Findings.

What `HOLDS` means here, and nothing more:
- Each of the attack file's 37 verdict rows returned exactly its expected token on every surface listed for it, on the real generator's output at H′ (§ 4). The one exception to "a token" is FS1, whose accepted alternative the attack file names, a `derive()` refusal.
- The six structural checks held (§ 5): the scope-half-(2) denominator, the zero-row guard, the standing test's bite, its place in the required lane, the parity test, and the harness control (113 of 113 consumer artifacts and sidecars byte-identical).
- The G2-F1, G2-F2 and G2-F3 conditions of the attack file § 3 are closed (§ 6).

What `HOLDS` does not mean (the "does not mean" list; Peter's "accept" lets a `HOLDS` carry exactly these five named limits, provided they are named here):
- **L3, a permission widened in place.** A `writeScope[…]` member re-pointed to a wider glob and naming itself as its destination is `VERIFIED`. I built it: kenya's `writeScope[.kiro/specs/**]` overlay value `"**"` renders into the Kiro JSON as `toolsSettings.write.allowedPaths: ["**"]`. The row is unsigned and the freshness sweep reports 0 findings, so it reaches no human.
- **L5, the shared governance rule hollowed in place.** `record-first-ratification` with `statement: ""` and itself as destination is `VERIFIED`. Both adapters render it as a bare `- ` line (1 such line in kenya's cc charter), into every agent. The row is unsigned and the sweep reports 0 findings, so it reaches no human. Its blast radius is every seat.
- **L2, a frontmatter entry emptied in place.** `commands[ios-build-test]` with `gap` and `cue` empty and itself as destination is `VERIFIED`. The row is unsigned; 0 sweep findings.
- **L1, a body unit reduced to one token in place.** `VERIFIED` by the check. Observed downstream: the C18 floor returns `entered: true, verdict: ROUTES` and the freshness sweep reports 1 `stale-signature` finding on that row, so it reaches the signer.
- **L4, an always-set unit reduced to one token in place.** `VERIFIED` by the check. **The ruling left open whether the C18 floor routes this lane. It does: the floor returns `entered: true, verdict: ROUTES` over the rendering, and the sweep reports 1 `stale-signature` finding on `#for-subtasks`.** L4 reaches a human; L2, L3 and L5 do not.
- It does not mean that a re-grounded unit's function survived (the C18 floor's and the signer's), or that any attack outside `completion/g2-cycle-2-attacks.md` is rejected. Two of the five limits are a permission question (L3, L5), routed to Thurgood for a later C16/C18 touch (§ Findings).
- It does not mean the hold's RELEASE-FLOW guard exists. It does not (§ 8).

The surviving counter-argument I recorded at the refusal conditions § 6 stands, and I repeat it here because a reader who skips it is misled: **a permission change that reaches no human passes.** Peter ruled that a `HOLDS` may carry it. I did not weigh in on whether he should.

## 1. Disclosure

- **I wrote the findings this cycle closes** (G2-F1, G2-F2, G2-F3), and I write this verdict. I pre-read Thurgood's ruling for verifiability only; he took part of my read and declined two items, which the ruling's § "What changed at the amendment" lists. My NOT-CLEAR on the first draft of the member erratum changed its stated verdict.
- **I re-signed `knowledgeBases[spec-summaries]`** (`c65650f46`), the one Stacy-signed row the round moved. It falls in Peter's trigger-(d) sample, not mine. I am judging a machinery change that moved my own signed row.
- **Lina authored the machinery under test** (C13–C15 and every fix commit 29.1–29.4) and the consequence texts. I authored every construction and every expected outcome in the attack file. I read her like-named fixtures' existence (`derivation.test.ts` and others) and did not rely on them; all 37 rows below were run by me, in my own harness.
- **The order of knowledge**: my attack file's commit is an ancestor of every commit that touched `tools/agent-generator/**` or `canonical/profiles/consumer/**` after the cut (6 commits, checked by `git merge-base --is-ancestor`, 0 missing). That proves the order of commits. I had read the provisional sizing and the shape of the six-row fix before I wrote it.
- **Two rows were added after the fix began** (M2, L5, `ec9fe0a9a`): ruled additions on Thurgood's erratum #310, stated as such in the file. No other expected outcome was edited (`git log` on the file: `fe488ff52`, `ec9fe0a9a`; the refusal conditions: `f32a21f76`, `ec9fe0a9a`).

## 2. Scope

- **Scope half (1)**: attack (a) verbatim, re-run against the substrate. Row A1: `stacy.md`'s `### The owed-set pipeline` emptied, destination the sibling `### The trigger set`. The construction is mine (`design-outline.md` § "[STACY R3]"). Observed `FAIL_NO_DERIVATION` on `_canonical`, `cc` and `kiro`.
- **Scope half (2)**: the check reads the committed operative-set record, never a denominator the rendering supplies. `git diff c1b67b8f 8d27e02b3 -- tools/agent-generator/regrounding/triviality.ts tools/agent-generator/regrounding/freshness.ts` is empty: neither file has changed since pass four's head. E1 below re-ran pass four's bite.
- **Domains**: body (A1 and its relatives), frontmatter (F3, F5 and relatives), always-set (AS1, AS2, T0, L4), and the shared-catalog member lane (M0, M1, M2, L5).
- The pre-declared consequence texts (`completion/g2-cycle-2-consequence-texts.md`, C0′ = H′) select on the verdict token alone. This record has exactly one line that begins with the bold verdict label.

## 3. The refusal conditions, applied

All checked by me from git, the request record or a run in this session unless marked.

| Condition | Result |
|---|---|
| RF1 head frozen | H′ in full in the request; `git branch -r --contains 8d27e02b3` lists `origin/task/123-u3g-g2c2`; tree clean |
| RF2 attacks first | 6 of 6 commits touching the guarded roots have `fe488ff52` and `0e3a4c01f` as ancestors |
| RF3 expectations moved | the two files changed only at the commits named in § 1 |
| RF4 ruled text moved | `git diff 905dd1e62 8d27e02b3 -- g2-spec-text-ruling.md`: empty. The erratum #310 is not on this branch (disclosed by the request, Q4); my M2/L5 cite it by its `main` SHA |
| RF5 consequence texts | one commit (`8d27e02b3`), `Agent: lina`, at C0′ = H′; the file names Thurgood twice: to say he wrote none of it (L3) and to route L3 and L5 to him (L83) |
| RF6 input set | declared (Q8) and a superset of the ruling's R3 minimum; held by the freeze, with the PR-open and post-squash `git diff` checks still owed |
| RF7 outcome framed | none; the request states facts and no prediction |
| RF8 complete | every W3 item present; W5's reads are quoted in `task-29-3-completion.md` § "The reads", relayed by the orchestrator (the files are not on disk), and my own read is the one I gave in this session |
| RF9 ceiling | 6 failing rows at 29.0 (limb (i): 12), 0 re-authorings (3), one seat (1), 0 body or always-set failures |
| RF10 my own acts | the stale list after 29.3 was exactly my row; I re-signed it once (`c65650f46`), with a hash move |
| RF11 real substrate | the standing test reads the committed sidecars, and E6 shows they equal what the real generator emits (113 of 113) |
| NR1 harness control | E6 held |
| NR2 toolchain | `generateAll` ran on every row |
| NR3 unbuildable rows | none, but FS1 (accepted `derive()` refusal) |
| NR4 guard | `runGuard(root, { refreshLock: false })` on a scratch copy of H′: `no-op-green`, 0 findings, 17 records, 373 units. Lina's run is the witness (Q2) |
| NR5 CI dispatch | six required runs reported `success` at H′ (Q3). **Unverified by me**: I hold no GitHub credentials in this seat, so I read the request's table and did not re-fetch the runs |
| W4 signing chain | `verify-signing-chain --ci --base c25470eac` run by me: `signing-chain: PASS — consistency, not identity`, 1 row across 1 signing commit. The `--audit` result (`anchored` 1 of 1) is Lina's, and I did not re-run it (no harness store here) |

## 4. The rows: expected against observed

**Method.** A `git archive` of H′ copied twice into a scratch directory (`base`, pristine; `work`, mutated), with `node_modules`, `dist` and the MCP builds symlinked. For each row: restore the touched profile files and the committed `canonical/_consumer-output/` from `base`; apply the construction (one `destination` value and one overlay block, signatures and `removals` left as committed); run the **real** `generateAll` and write its consumer output and sidecars; run the real `checkShippedProfile` over the result; read the row's per-surface verdicts. Surfaces are the ruling's (R3): body and always-set rows on `_canonical`, `cc`, `kiro`; frontmatter and member rows on `cc`, `kiro`; Kiro pools prompt and JSON. Nothing was written in the repo. The scripts are in my session scratch, not committed; each row is specified exactly in the attack file § 2.

Every row below: **observed token = expected token, on every listed surface**.

| Group | Rows | Expected | Observed |
|---|---|---|---|
| Honest controls (8) | S0, S0p, T0, K0, W0, M0 (individually); D0 (2 committed rows), KB0 (4 committed rows) | `VERIFIED` | `VERIFIED` on every surface; baseline regeneration: 169 rows, 169 `VERIFIED` |
| Rejected by clause (1) (7) | A1, A3, A4, AS1, WS1, WS2 | `FAIL_NO_DERIVATION` | `FAIL_NO_DERIVATION` on `_canonical`, `cc`, `kiro` |
| | FS1 | `FAIL_NO_DERIVATION` or a `derive()` refusal | **`derive()` refused it**: "its overlay value is a undefined, the canonical value a string; a re-pointed entry's value keeps the canonical value's JSON type…". A whitespace-only body parses to no value. This is the attack file's accepted alternative. It is not a verdict and does not count toward `HOLDS` (§ 4 of the attack file) |
| Rejected by clause (2) (17) | A2, A3f, V1, C1, AS2, WS3, WS4, WS5, U1, U2 (body and always-set) | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` on `_canonical`, `cc`, `kiro`; U1 threw no exception |
| | F3, F4, F5, F5c, KB1 (frontmatter) | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` on `cc`, `kiro` |
| | M1, M2 (member) | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` on `cc`, `kiro` |
| Named limits (5) | L1, L4 (body, always-set) | `VERIFIED` | `VERIFIED` on `_canonical`, `cc`, `kiro` |
| | L2, L3, L5 (frontmatter, member) | `VERIFIED` | `VERIFIED` on `cc`, `kiro` (L3's construction needed its value quoted as `"**"`, because a bare `**` is a YAML alias; the same value, the same meaning) |

Tally: of the 37 verdict rows, 36 returned their expected token and FS1 returned the accepted `derive()` refusal. **Observed ≠ expected: 0.** Rows I could not run: none (FS1 ran and was refused).

**One row added by me, not in the committed file**: FS1b, the same construction as FS1 with an overlay value of `""` (an empty string, which `derive()` accepts as type-congruent). Observed `FAIL_NO_DERIVATION` on `cc` and `kiro`. It shows R2's string branch (a string empty after `trim()` derives nothing) fires on the real emission, which FS1's refusal alone does not show. It is an extra observation, not a verdict row, and it did not touch the attack file.

## 5. The structural checks

| Check | Result |
|---|---|
| E1 scope half (2) | With `stacy.yaml`'s record for the owed-set unit (14 committed items) narrowed to 1 and then 0 items, `runFreshnessSweep` refused each time: "note items (14) ≠ record items (1)" and "(0)"; restored, 0 findings. As pass four |
| E2 zero rows | `U3G_SHIPPED_ROOT` pointed at a copy with every `*.dispositions.yaml` removed: the suite fails to run with "evaluated 0 rows, the committed dispositions declare 0 re-pointed rows — the count must be equal and non-zero". Red on zero |
| E3 the standing test bites | I planted my own C1 (the owed-set unit's destination set to its sibling), regenerated, and pointed the test at it: 1 failed, 5 passed; the failure names exactly `stacy.dispositions.yaml#…owed-set-pipeline… → #the-trigger-set-…: FAIL_DISHONEST_NAMING` on `_canonical`, `cc`, `kiro`. Restored: 6 passed |
| E4 in the required lane | `jest --listTests` lists `derivation.shipped-profile.test.ts` (59 files selected); `lane-timing.yml` runs `npm run test:agent-generator` (L281–282) on `pull_request` with no `paths:` filter. **The lane's floor is `COUNT ≥ 1` (L279), so deleting the test would leave the lane green**: Finding 1 |
| E5 parity | `consumer-entry.parity.test.ts`: 6 passed |
| E6 harness control | The real `generateAll` on an untouched copy of H′: 113 of 113 consumer artifacts and sidecars byte-identical to the committed `canonical/_consumer-output/**`, and 0 files on disk that the generator does not emit |
| Standing count | 169 rows evaluated, equal to the 169 re-pointed rows the dispositions declare (`jest` output; the test derives the count independently) |

## 6. The HOLDS conditions, read against the observations

1. **G2-F1** (A3, F5 and relatives): closed. A3f, A3, F5, F5c, F3, F4, C1, V1, A2, AS2, M1, M2, U1, U2, KB1, WS3, WS4, WS5 each returned their token.
2. **G2-F2** (C1, F3; a non-zero count; every PR touching the inputs): closed. C1 and F3 are rejected; E2–E5 held; the committed profile is `VERIFIED` in full (169 of 169, none excluded from a surface); the declared input set contains the ruling's R3 minimum.
3. **G2-F3** (A1, A2, F3, AS1, AS2): closed on the generator's own emission. A1, A3, A4, AS1, WS1, WS2 return `FAIL_NO_DERIVATION`; A2, AS2, F3 return `FAIL_DISHONEST_NAMING`; FS1 is refused and FS1b rejected. Task 29's red line is read as the ruling reads it: "attack (a) as the generator emits it is not rejected by clause 1" means A1 and AS1, and both are rejected by clause (1). The frontmatter lane's rejection of attack (a) rests on clause (2) plus R1 alone (F3 returned `FAIL_DISHONEST_NAMING`, not `FAIL_NO_DERIVATION`), as the ruling's surviving counter says.
4. **Scope halves**: A1 and E1 held.
5. **E6** held.
6. **No High or Critical finding raised by this cycle is open.** The named limits are Peter's ruling and the ruling's own residual; they are not findings of this cycle.

## 7. What I ran and what I only read

**Ran (this session):**
- `git archive 8d27e02b3` into a scratch directory; the real `generateAll` and `checkShippedProfile` over every row in § 4; `runFreshnessSweep` over the limit rows and E1; `classifyCharter` over the rendering for L1 and L4; `runGuard(root, { refreshLock: false })` on the scratch copy; `verify-signing-chain --ci --base c25470eac` in the worktree.
- `npx jest --config tools/agent-generator/jest.config.js derivation.shipped-profile consumer-entry.parity --verbose` (12 passed), `--listTests`, and the E2/E3 runs with `U3G_SHIPPED_ROOT` set.
- `git merge-base --is-ancestor`, `git diff`, `git log`, `git branch -r --contains`, and `grep` over the workflow and the plan.

**Read only, not re-run:** the six CI dispatch conclusions (no credentials in this seat); the `--audit` anchoring result; Lina's like-named fixtures and her bite files under `__fixtures__/semantics-guard/__bites__/` (read as her evidence, not mine); `u3g-sizing.md`'s 169-row figure (my own baseline regeneration reproduced 169/169, which is independent of it).

## 8. The hold (Peter's PR-5.3, PR-15) and the RELEASE-FLOW

- **Which clause applies.** The hold is "nothing that carries the consumer profile is tagged or published until a HOLDS verdict, or Peter lifts it by a dated record". With this record the verdict is `HOLDS`, so the lift is by verdict, not by Peter's lift record, and no lift record is needed or implied.
- **It lifts at U3g's squash, not now.** The record reaches `main` only through U3g's squash (Task 30, C-1). The hold line reads the highest-numbered `completion/re-grounding-g2-cycle-<n>.md` present at the release squash S with token `HOLDS` **and** the standing test file at S. Until U3g merges, S does not contain this record. Until then nothing that carries the consumer profile is to be tagged or published.
- **This verdict covers H′ only.** It holds for the tree in `canonical/profiles/consumer/**`, `tools/agent-generator/**`, `canonical/_consumer-output/**` and the declared input set as they stand at H′. Condition (d)'s checks stay owed at PR open and after the squash: `git diff --name-only 8d27e02b3 <U3g PR head> -- <declared input set>` and the same against the squash SHA must print nothing. A path printed makes this record void for the change and the request is re-made.
- **The hold's mechanical guard is not on `main`.** At `origin/main` @ `32a811a21`, `.kiro/hooks/RELEASE-FLOW.md` contains no G2 or hold line, and the plan lists the step-5 amendment (owner Thurgood) and the `scripts/release-publish.ts` check (owner Ada) as pending. The hold is therefore enforced today by nothing mechanical. That is the hold's owners', predates this cycle, and does not change the verdict. After U3g merges, the line would read `HOLDS` at S and the guard becomes moot for this gate. I record it so that a reader does not take "HOLDS" as "the guard exists".
- **No claims pass holds or gates anything.** This record is a post-acceptance audit of a unit that Peter merges; it is not a required check, a review gate or a blocking condition on any PR.

## Findings

Two routes apply to each: an explicit message to the owning agent, and the standards line below.

| # | Severity | Finding | Owner |
|---|---|---|---|
| 1 | Low | **The required lane's floor does not prove the standing test is in the selection** (`lane-timing.yml` L279, `COUNT ≥ 1`). Deleting `derivation.shipped-profile.test.ts` leaves the lane green. Carried from my tasks-round read (A-1). My ARMING read at U3g's merge checks the file is in the resolved selection; a coverage-map row would make that permanent | Thurgood (coverage-map row) |
| 2 | Low | **L3 and L5 reach no human** and are the permission-bearing limits (a widened `writeScope`; the shared governance rule rendered into every seat, hollowed). Peter's "accept" lets a `HOLDS` carry them; they are routed as a permission question to the later C16/C18 touch, not closed | Thurgood |
| 3 | Low | **The hold's RELEASE-FLOW line and script check are unlanded on `main`** (§ 8). Predates this cycle; named so that no reader infers a guard from a `HOLDS` | Thurgood (the amendment), Ada (the script check) |
| 4 | Low | **The ruling's erratum #310 is not on this branch**: the ruling file and design C15 at H′ lack the member clause, while `derivation.ts` and my M2/L5 cite it by its `main` SHA. Harmless to the merge (disjoint files) but CLOSEOUT must read the ruling, the erratum and the design line together | Stacy (CLOSEOUT) |
| 5 | Info | **FS1 was unbuildable as written** (a whitespace-only overlay body parses to no value, which `derive()` refuses). The attack file already accepted that outcome. FS1b shows R2's string branch fires. Not a defect in the check | none |

**Standards implications**: none for the docs. Finding 1 asks Thurgood for a coverage-map row; Finding 2 is the permission question already routed by the ruling.

## Method, the sample and the counting block

- **Sample**: every verdict row was run, **37 of 37** (36 with their expected token, 1 with its accepted refusal), plus 6 of 6 structural checks, plus 1 extra row (FS1b). The 169 committed rows were not sampled by me: the baseline regeneration and the standing test both evaluated all 169.
- **Per row and per platform**: all rows are platform-independent text and YAML; no iOS or Android toolchain was involved. The one thing I did not re-verify is stated in § 7 (CI conclusions, `--audit`).
- **Counting block**: not applicable to this record. It is a falsification verdict, not a claims pass; the claims-pass counts for Tasks 29 and 30 (subtask-doc presence, delegated-tier lines, the instruments read) belong to U3g's CLOSEOUT pass and were not taken here.
- **Merge-path status**: this record is not a required check, a review gate or a blocking condition on any PR.
