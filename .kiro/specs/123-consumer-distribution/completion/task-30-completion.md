# Task 30 Completion: the G2 cycle-2 gate parent (U3g gating parent)

**Spec**: 123 — Consumer Distribution · **Unit**: U3g, G2 cycle 2. **Task 30 is the gating parent, and this close opens the unit PR.** · **Type**: Documentation · **Validation**: Tier 2
**Agent (plan)**: PRIMARY Lina (Opus), the executing agent. Stacy authors the attack file and the verdict record, outside the line. Thurgood is recused.
**Delegated-tier**: plan held
**CI-provenance**: unit PR — appended by the orchestrator at open
**Instruments**: 18 listed — exists 9 · built-here 7 · missing 2 · unlisted 0 — .kiro/specs/123-consumer-distribution/completion/task-30-instruments.md
**Traces**: Reqs 11.8, 11.8.4, 24.3 · design § "Gates and sequencing" (G2) · Peter's PR-5
**Status normalisation (2026-10-19)**: Status cells normalised to bare marks per the completion guide's status-marks line (ballot 2026-10-18-sitting-2 S4; D-2 record § "Fixing PR — live-corpus run (2026-10-19)"; Peter: Option 1); mark, Evidence and follow-up links unchanged; no claim re-verified. — Lina
**The verdict**: cited, not restated: `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-2.md` (`15d7a2c0f`).

**Subtasks**:
- the instruments block, `a2b43b979`;
- 30.0 (C0′), `8d27e02b3`;
- 30.1, the request, `ece559ade`;
- (Stacy's verdict record, `15d7a2c0f`);
- 30.2, `247f551cd`;
- 30.3 is this commit.

Docs: `task-30-{0,1,2}-completion.md`.

## Success Criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| *(R2, Stacy R-1)* **Verdict tokens are closed**: `HOLDS` · `DOES-NOT-HOLD` · `NOT-RUNNABLE`, used everywhere in this unit. The selector reads the token that follows `**Verdict**: `, up to the first space (`completion/g2-consequence-texts.md` § 2). | ✅ | The selector in `completion/g2-cycle-2-consequence-texts.md` § 2 (C0′ `8d27e02b3`) reads the token after `**Verdict**: ` up to the first space, from the closed set `HOLDS` · `DOES-NOT-HOLD` · `NOT-RUNNABLE`, and nothing else. Stacy's record conditions § 5 fix the three line forms. Her record carries exactly one `**Verdict**: ` line (`.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-2.md` L13). The tokens are the same in Task 30, the texts file, the request record and the refusal conditions. |
| **The consequence texts are PRE-DECLARED.** They are committed at `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-consequence-texts.md` at a commit C0′ that is an ancestor of the frozen head H′ (ancestry cited), and never edited after C0′. · The `DOES-NOT-HOLD` text carries the PR-5.3 hold verbatim — the recommendation Peter agreed to ("I agree with all the recommendations"): "nothing that carries the consumer profile is tagged or published until a HOLDS verdict, or Peter lifts it by a dated record". · **Thurgood authors no line of them** (Stacy's refusal condition (iii)). | ✅ | C0′ = `8d27e02b398810e5e577ba297ef10f5aa33cc337`, which is H′ itself. `git merge-base --is-ancestor 8d27e02b3 8d27e02b3` → exit 0 (`task-30-1-completion.md` Q6). `git diff 8d27e02b3 HEAD -- completion/g2-cycle-2-consequence-texts.md` is empty. The one commit on the file carries the trailer `Agent: lina`; no commit by Thurgood or with `Agent: thurgood` touches it. The `HOLD` block quotes PR-5.3 verbatim: "nothing that carries the consumer profile is tagged or published until a HOLDS verdict, or Peter lifts it by a dated record". |
| **The request to Stacy names a frozen H′** and cites the attack file (Task 29). · **Nothing that touches the check's input set lands on `task/123-u3g-g2c2` or on `main` between the request and the verdict** (Stacy's condition (d)). · **Instrument** *(R2, Stacy B2; this replaces `git log --first-parent <request commit>..<verdict commit>`, which means nothing on `main` because both commits are on the U3g branch)*: (i) at the request, H′ is named by its SHA; (ii) at PR open, `git diff --name-only <H′> <U3g PR head> -- <declared input set>` prints nothing; (iii) after the squash, `git diff --name-only <H′> <U3g squash SHA> -- <declared input set>` prints nothing. · **Red**: any path printed. The cycle is then re-requested on a new H′. A merge of `main` carrying input-set changes counts as a change. | ✅ | The request record `completion/task-30-1-completion.md` (`ece559ade`) names H′ `8d27e02b398810e5e577ba297ef10f5aa33cc337` in full and cites the attack file. (i) H′ is named at the request. (ii) At PR open, `git diff --name-only 8d27e02b3 247f551cd -- <declared input set, 16 pathspecs>` printed nothing (0 paths), and `main`'s side since the merge-base `c25470eac` printed nothing too. `git log ece559ade..15d7a2c0f` is Stacy's record alone (W2). (iii) The post-squash check is the orchestrator's after merge (see the forced-negative line). |
| **Stacy's verdict record** exists at `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-2.md`, with exactly one verdict token. · *(R3, Stacy C-1)* The record is committed on `task/123-u3g-g2c2` and **reaches `main` only through U3g's squash**. It is never committed to `main` by a record-only PR, because the hold guard reads `HOLDS` at S as "the fix is merged". · Its first section discloses that she wrote the findings and writes the verdict, and that she pre-read Thurgood's ruling for verifiability only; *(R2, Stacy R-6)* and that she re-signed `knowledgeBases[spec-summaries]`, and any other Stacy-signed row the round moved. · It applies her refusal conditions (her U3-kickoff read § 2). | ✅ | Stacy's record exists at `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-2.md` (`15d7a2c0f`), committed on `task/123-u3g-g2c2`, with exactly one verdict token (L13). It reaches `main` only through U3g's squash. Its § 1 is the disclosure. Its § 3 applies her refusal conditions RF1–RF11. |
| **This parent's completion doc CITES the record path and never paraphrases the verdict** (11.8.4). Thurgood authors no line of it, and the U3g PR body states the recusal. | ✅ | This doc cites `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-2.md` and does not paraphrase the verdict: the applied section below is the pre-declared text, byte-equal. Thurgood authored no line of this doc or of any U3g text (`task-30-1-completion.md` Q12). The U3g PR body states the recusal. |
| **On `HOLDS`**: the consequence is applied **byte-equal to its pre-declared text** in this PR, as this parent's completion-doc 24.3 table for the named domains, cited against its source line. Task 18's record is not edited. | ✅ | The selector read token `HOLDS` from the highest-numbered cycle record (cycle 2). The composition `HEAD` + `ROWS-FIXED` + `HOLDS-ROWS` + `LIMITS` + `FOOT` was applied as this doc's `## 24.3 acceptance table` (`247f551cd`). Byte check against the blocks at C0′: `cmp` identical, `diff` empty, 4749 bytes each (`task-30-2-completion.md`). Its source is `completion/g2-cycle-2-consequence-texts.md` § 4 @ `8d27e02b3`. Task 18's records are unchanged: `git diff c25470eac HEAD -- completion/task-18-completion.md completion/re-grounding-pass-four.md` is empty. |
| **On `DOES-NOT-HOLD` or `NOT-RUNNABLE`**: · **the hold stands**, and this PR is not opened; · the owner fixes on the branch; *(R2, Stacy R-5)* **at most one further request (cycle 3), on the same attack file and consequence texts**. *(R3, Stacy C-2)* Its record is `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-3.md`, with one verdict token, under the same C-1 rule; the cycle-2 record is never edited. A cycle 3 that does not HOLD stops and re-plans with Peter, as does any ceiling limb. A new attack class is a new finding, never added to a running cycle; · **never ship with a written-down limit** — the recommendation Peter agreed to under PR-5 ("Yes, and good idea."). | ✅ | Conditional branch, not triggered: `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-2.md` L13 reads `**Verdict**: HOLDS` (`15d7a2c0f`), and `ls .kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-3.md` → no such file. Its texts (`DEMOTION`, `HOLD`, in `completion/g2-cycle-2-consequence-texts.md` § 4 @ `8d27e02b3`) are pre-declared and unused. No cycle 3 was requested, and no written-down limit ships beyond the five Peter's "accept" covers (L1–L5, named in the applied `LIMITS` block). |
| The U3g PR body carries the tripwire line, and `npm test` and full `tsc` are green. | ✅ | The tripwire line is in the PR body (`Tripwire: declared 11, now 11; parents unchanged; successor branch: none`). At `247f551cd`: `npm test` 390 suites / 9377 tests green; `tsc --noEmit` exit 0 (root and `tools/agent-generator`). |

Unmet or partially met criteria: None. One instrument runs after merge by design: C3 (iii), `git diff --name-only 8d27e02b3 <U3g squash SHA> -- <declared input set>` must print nothing. Owner: the orchestrator, after Peter's squash.

## Additional verification

Primary Artifacts: all shipped as declared.
- `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-consequence-texts.md`: `8d27e02b3`.
- Stacy's attack file and verdict record, cited:
  - `completion/g2-cycle-2-attacks.md`, at `fe488ff52` and `ec9fe0a9a`;
  - `completion/re-grounding-g2-cycle-2.md`, at `15d7a2c0f`.
- This parent's completion doc's 24.3 table: the section below, `247f551cd`.

**Beyond the list, named**:
- This parent's other completion records: the instruments block and `task-30-{0,1,2}-completion.md`.
- The 30.x and Task 30 checkbox ticks in `tasks.md`.
- Stacy's refusal-conditions record `completion/g2-cycle-2-refusal-conditions.md` (hers, outside the line).

No other path entered in Task 30's commits.

## Lanes (local, the U3g worktree at `247f551cd`)
- `npm test`: 390 suites / 9377 tests.
- `tsc --noEmit`: root and `tools/agent-generator`, exit 0.
- `npm run test:agent-generator`: 59 suites / 1686 tests. The standing application evaluated 169 re-pointed rows, equal to the dispositions' count.
- `npm run test:scripts`: 15 / 309.
- `npm run test:consumer`: 42 passed, 1 skipped (`docs/tokens.css` reverted).
- The no-write diff guard: `no-op-green`, 0 freshness findings.
- `verify-signing-chain --ci --base c25470eac`: PASS. Range `c25470ea..HEAD`, 23 commits, 1 row across 1 signing commit.
- `npm run check:completion-criteria-parity`: **parent 30 PASS, parent 29 PASS** (SUMMARY: 24 parents evaluated, 24 pass, 0 reds).

## Carried (stated, not criterion failures)
- **Owed after merge**:
  - Stacy's ARMING read (instruments row 9.1);
  - C3 (iii), the post-squash input-set check.
- **The hold's mechanical enforcement is not on `main`** (row 7.1): Thurgood's RELEASE-FLOW amendment and Ada's `release-publish.ts` check. With this verdict, the hold lifts at U3g's squash.
- **The verdict record's five findings** are routed in the record itself (Thurgood, Ada, Stacy).

## 24.3 acceptance table

Requirement 24.3's labels for the re-grounding contract's instruments (Req 24.3: the list that follows "The acceptance table SHALL label the three instruments" in `requirements.md`), with (v)'s mechanical half placed by G2 cycle 2 under Requirement 11.8.2. For release 3 onward this table supersedes the one in `.kiro/specs/123-consumer-distribution/completion/task-18-completion.md` § "24.3 acceptance table" (pass four), which stays as that verdict's record and is not edited. Each row states what its passing does not establish (R26.8).

| Instrument | Label (Req 24.3) | What a pass does not establish |
|---|---|---|
| (i), (ii), (iii) with applicability verification, (iv) present-routes, and the all-`no-consumer-counterpart` floor | Deterministic clauses | Each clause establishes only its own stated property (Req 11.3–11.5); none establishes that a re-grounded unit's function survived. |
| `no-consumer-counterpart` signatures | Routed clause — mechanically enforced routing of a judgment the check cannot make | The routing is enforced; the judgment is the signer's, and a hollow assent passes it. |
| The behavioral instruments (Req 24.1 two-beat conformance run; 24.2 trio probe) | Behavioral backstop — non-deterministic, per-release, sampling | A sample: agents and domains it does not exercise are named per run (Req 24.2a), and an unexercised one is not covered. |
| (v)'s mechanical half — body units | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), and applied to the committed consumer profile and every committed target rendering on every PR (`tools/agent-generator/__tests__/derivation.shipped-profile.test.ts`) | Attacks outside `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-attacks.md`; the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); the named limits below; that a re-grounded unit's function survived (the C18 floor's and the signer's). |
| (v)'s mechanical half — frontmatter entries | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), on the declared targets (`cc`, `kiro`, the Kiro agent JSON included), applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below; that an entry's re-grounded value means what the canonical value meant (no per-field rule: the check reads the derived value's emptiness only). |
| (v)'s mechanical half — always-set member units | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below, L4 in particular. |
| (v)'s mechanical half — the shared-catalog member | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), decided in member-id space, applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below, L5 in particular. |

**Named limits this verdict carries** (Peter's ruling of 2026-10-12, "accept", recorded in `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-refusal-conditions.md` § 6; the rows are `g2-cycle-2-attacks.md` § 2.4; the ruling's § "What this reading does not reach"). Each one re-grounds a unit or entry **in place** and names it as its own destination, so the check returns `VERIFIED` by construction:

- **L3 — a permission widened in place.** A `writeScope[…]` member re-pointed to a wider glob (for example `**`) passes, and no signer reads it.
- **L5 — the shared governance rule hollowed in place.** The one shared-catalog member is rendered into every agent and its row is unsigned. Emptied, with itself as its destination, it passes and reaches no human.
- **L1 — a body unit reduced to one token in place.** It passes the check; the C18 triviality floor routes it to a signer.
- **L2 — a frontmatter entry emptied in place.** It passes; no signature is owed and it reaches no human.
- **L4 — an always-set unit reduced to one token in place.** It passes; whether the C18 floor routes it is stated in the verdict record.

L3 and L5 are routed to Thurgood as a permission question, for a later C16/C18 touch.

The verdict, and its findings if any, are in Stacy's record: the highest-numbered `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-<n>.md` on the U3g branch (cycle 2, or cycle 3 if it ran), cited and not restated (Req 11.8.4). Planned dependency: `tasks.md` Task 27 (step 27.4, U5) is planned to read this table for Requirement 24.3's labelling.

