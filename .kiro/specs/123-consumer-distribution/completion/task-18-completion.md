# Task 18 Completion — G2 gate parent: pass four (U2b gating parent and U2's acceptance gate)

**Spec**: 123 — Consumer Distribution · **Unit**: U2b — Consumer generation profile: machinery, rendering & G2 (Tasks 13–18, gated at Task 18) · **Type**: Documentation · **Validation**: Tier 2
**Agent (plan)**: PRIMARY Lina (Opus) — executing agent; Stacy authors the verdict record (outside the line); Thurgood recused
**Delegated-tier**: plan held — 18.0, 18.1 and 18.2 (and 18.3) ran Lina (Opus), the planned PRIMARY. Stacy authored the verdict record outside the line, as planned. Three other seats ran inside this parent's window, and none is a delegated-tier divergence for it. A Lina (Sonnet) seat executed the generator-residuals issue (`.kiro/issues/2026-10-01-agent-generator-out-of-grant-residuals.md`, #259) under its issue-row grant; that is not a Task 18 subtask. Kenya (Opus) and Data (Opus) signed in their own seats under the signing-act ballot (`c2fba158`, `2d243aa4`); signing acts are outside every delegated-tier line.
**CI-provenance**: branch-head dispatch @ 34d4560e696c17d32598fc98dc4a4dd20d0ff5d0 — https://github.com/3fn/DesignerPunk/actions/runs/37063086196, https://github.com/3fn/DesignerPunk/actions/runs/37063095752, https://github.com/3fn/DesignerPunk/actions/runs/37063104825, https://github.com/3fn/DesignerPunk/actions/runs/37063113525, https://github.com/3fn/DesignerPunk/actions/runs/37063120974, https://github.com/3fn/DesignerPunk/actions/runs/37063129506
**Instruments**: 23 listed — exists 14 · built-here 9 · missing 0 · misfit 1 — .kiro/specs/123-consumer-distribution/completion/task-18-instruments.md
**Traces**: Reqs 11.8, 11.8.4, 24.3 · design § "Gates and sequencing" (G2)

**The recusal, stated.** Thurgood is recused from G2. He authored no line of this doc: `git log --format='%h %(trailers:key=Agent,valueonly)' -- .kiro/specs/123-consumer-distribution/completion/task-18-completion.md` lists only `lina` commits. His on-branch acts in this parent's window — the Req 13 design erratum `8ebdae96`, and the trigger log `a26d45d1` and `c1b67b8f` — are not Task 18 artifacts. They are cited in the request record (`completion/task-18-1-completion.md` § R8).

**The verdict is Stacy's and is cited, never restated** (Req 11.8.4): `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` @ `3e0e0994` (`Agent: stacy`). This doc says nothing about what the verdict means. It records only the edit that the record's machine lines select under the frozen rule (criterion 4).

**Provenance of the run results below.** The CI line binds to `34d4560e`, the head carrying 18.2. This seat read all six runs with `gh run view` before writing the line: **six of six `completed` / `success` at `34d4560e`**. That is a branch-head dispatch, **not the gate**; the gate runs on the U2b unit PR. The rest of this doc's commit touches only `.kiro/specs/123-consumer-distribution/completion/` and `docs/specs/123-consumer-distribution/` (guide rule 5). Every other run result in this doc is **local**, measured by this seat or, where marked, by the orchestrator.

## Success Criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **The two consequence texts are PRE-DECLARED**: the PASSES edit to the 24.3 table (per domain) and the Fork A demotion edit are committed at `.kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md` **before pass four is requested** (ancestry cited). | ✅ verified met | C0 `30186762` contains `.kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md` alone. Its § 4 holds a PASSES text per domain for each of the three domain states, plus one `DEMOTION` text for FAILS and NOT-RUNNABLE. `git merge-base --is-ancestor 30186762 c1b67b8f` → exit 0, where `c1b67b8f` is the requested head H (`completion/task-18-1-completion.md` § R4). Frozen since C0: `git diff 30186762 HEAD -- .kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md` → empty. |
| **Stacy's verdict record** exists at `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md`, with exactly one verdict. | ✅ verified met | `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` exists at `3e0e0994`, its only commit (`git log --format='%h %(trailers:key=Agent,valueonly)' -- <path>` → `3e0e0994 stacy`). `grep -c '^\*\*Verdict\*\*: ' <path>` → 1. The verdict is cited, not restated. |
| **Scope half (1)** is attack (a) verbatim. | ✅ verified met | Cited, not restated: `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` § "Scope", the "Scope half (1)" item, and § "How the pass was run" › "Half (1): attack (a) and its analogues". |
| **Half (2)** is that the check reads the committed record — **or, under branch A, "NOT APPLICABLE — no mechanical floor (P2 branch A)"**, never a pass. | ✅ verified met | Cited, not restated: `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` § "Scope", the "Scope half (2)" item, and § "Half (2): the denominator is the committed record". Branch A was not invoked: G1 held at run 2 (criterion 6's record). |
| The domain line names body / frontmatter / always-set as exercised or "not exercised". | ✅ verified met | `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` L14 is the single `**Domain line**: ` line (`grep -c` → 1). It names body, frontmatter and always-set, each with one of the three state tokens of the grammar fixed in `g2-consequence-texts.md` § 2. The values are cited, not restated. |
| **This parent's completion doc CITES the record path and never paraphrases the verdict** (11.8.4). **Thurgood authors no line of it**, and the U2b PR body states the recusal. | ⚠️ partially met | **Met**: this doc cites the record path and does not paraphrase the verdict. The 24.3 section is the pre-declared text, which cites the record by path. Thurgood authored no line: every commit on this doc carries `Agent: lina` (`git log --format='%h %(trailers:key=Agent,valueonly)' -- .kiro/specs/123-consumer-distribution/completion/task-18-completion.md`). **Not yet**: the U2b PR body's recusal statement. The PR opens at 18.3 part B (`.kiro/specs/123-consumer-distribution/tasks.md` 18.3) and is not open at this commit. |
| **The verdict's consequence is applied as an artifact edit in this PR by this parent's agent, BYTE-EQUAL to its pre-declared text**, cited against its source line in `g2-consequence-texts.md` (Lina condition 1; MIDPOINT checks it as a diff): PASSES → the 24.3 table lists (v)'s mechanical half as deterministic for the named domains only; FAILS / NOT-RUNNABLE → the Fork A demotion edit. | ✅ verified met | Applied at `34d4560e` by Lina: this doc's § "24.3 acceptance table", the last section. Selection: the record's verdict token and domain states were read from `re-grounding-pass-four.md` L13–14 under § 2 of the frozen file. Six blocks were composed, citing their content lines in `g2-consequence-texts.md` @ `30186762`: `HEAD` (L58–63), `ROWS-FIXED` (L69–71), `PASSES-body` (L77), `PASSES-frontmatter` (L95), `PASSES-always-set` (L113), `FOOT` (L139–141). **Byte check**: `diff <(git show 30186762:<texts> > texts.C0.md && python3 compose_g2.py texts.C0.md <record>) <(awk '/^## 24\.3 acceptance table$/{f=1; print; next} f && /^## /{exit} f' <this doc>)` → empty, exit 0. It was re-run after this commit's edits, with the same result. The script is reproduced in `completion/task-18-2-completion.md`; the orchestrator recomposed the blocks independently and found them equal (3,759 bytes). |
| **On FAILS or NOT-RUNNABLE, the agent applies the Fork A demotion and SUBMITS. It never patches the machinery and re-requests pass four inside U2** (Lina condition 2). A machinery fix is a new falsification cycle, with its own record and a new G2 request after U2b's merge. | ✅ verified met | The FAILS/NOT-RUNNABLE branch was not selected (criterion 4's selection). No machinery patch and no re-request: `git log --format='%h %s' 063236bf..HEAD -- tools/agent-generator canonical` → empty, and `re-grounding-pass-four.md` has one commit. The three findings routed to this seat (G2-F1, G2-F2, G2-F3; `re-grounding-pass-four.md` § "Findings") are carries. Any fix is a new falsification cycle after U2b's merge (§ "Carries" below). |
| **A G2 blocked by G1 at BREAKS is not NOT-RUNNABLE.** Since the split, U2a merges only on a G1 HOLDS or branch-A record (Task 12), so U2b begins with G1 resolved; **this parent's completion doc cites, by path, the G1 record U2a merged on.** | ✅ verified met | The G1 record U2a merged on: `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` @ `24c7f060` (U2a squash, #222). Cited, not restated. |
| **The U2b PR body carries the tripwire line** (`G1 runs` is U2a's field), and the release-2 CHANGELOG entry is committed. | ⚠️ partially met | **Met**: the release-2 CHANGELOG entry is committed at `34d4560e` (`CHANGELOG.md`, "[Unreleased] — planned Release 2 (generated agent layer)"). It is a second `[Unreleased]` entry and does not presume whether Release 1 ships before it or with it; that sequencing is Peter's and still open. **Not yet**: the tripwire line in the U2b PR body. The PR opens at 18.3 part B (`.kiro/specs/123-consumer-distribution/tasks.md` 18.3). The line it will carry, from the counts at this commit: `Tripwire: declared 31, now 34; parents unchanged; successor branch: none`. |
| `npm test` and full `tsc` are green on the branch. | ✅ verified met | `npm test` → `Test Suites: 389 passed, 389 total`, `Tests: 9352 passed, 9352 total`, exit 0. `npx tsc --noEmit` → exit 0. Both were run by this seat at `34d4560e` (local); this doc's commit adds docs only. The non-root lanes are under "Additional verification". |

Unmet or partially met criteria: criterion 3's "the U2b PR body states the recusal" and criterion 7's "The U2b PR body carries the tripwire line" — both are owed by the U2b unit PR, which opens at 18.3 part B (`.kiro/specs/123-consumer-distribution/tasks.md` 18.3) and is not open at this commit.

## Additional verification

Primary Artifacts: all shipped as declared

- **The Primary Artifacts, resolved.**
  - **Stacy's verdict record (cited)**: `completion/re-grounding-pass-four.md` @ `3e0e0994`, written by Stacy and never by this seat.
  - **"The U2 completion doc's 24.3 table"**: this file's § "24.3 acceptance table". The target was named in record (`g2-consequence-texts.md` § 1) under Peter's ruling of 2026-10-02, "Go with your recommendations on all four" (recommendation 3: the in-record target, no `tasks.md` amendment).
  - **`CHANGELOG.md` (release 2)**: committed at `34d4560e`.
- **Checks at this parent**:
  - **This seat, at `34d4560e`, local**:
    - `npm test` 389 / 9352;
    - `npx tsc --noEmit` exit 0;
    - the byte check (criterion 4), exit 0;
    - `npm run check:completion-criteria-parity` — in the report that carries this commit.
  - **Orchestrator-run at `c1b67b8f`, local** (after it, only `.kiro/specs/**` and `CHANGELOG.md` changed):
    - `test:agent-generator` 58 / 1635; `test:scripts` 13 / 228; `typecheck:scripts` exit 0;
    - `mcp-server` `npm test` 37 / 612; `application-mcp-server` 29 / 369;
    - `test:consumer` 42 passed, 1 skipped;
    - section citations PASS; drift clean; parity 20/20;
    - the bundle `dist/generator/consumer-entry.js` at 256,691 bytes with 0 `@modelcontextprotocol` hits.
  - **The confirming guard run at H**: `completion/task-18-1-completion.md` § R2 (`no-op-green`, freshness 0).
- **Merges and fixing PRs in this parent's window**: `completion/task-18-1-completion.md` § R8 lists every fixing PR and seat merge since the U2b cut with its authority. After H, only two commits besides this doc's landed: `063236bf` (18.1, the request record) and `3e0e0994` (Stacy's verdict record, not a Task 18 artifact). The pre-request acts were `e00a5217` (#259, the residuals issue grant; Peter, "Go with A"), `7071e39f` (#261, the VALVE-1 grant plus the signing-act ballot; Peter, "You run it — I authorize it for this one PR"), and `fafae2b0` (Task 16's row, post-close).

## What Task 18 did

| Subtask | Seat | Result |
|---|---|---|
| (block) | Lina (Opus) | `completion/task-18-instruments.md`, `aac1d236`, before 18.0 |
| 18.0 | Lina (Opus) | the frozen consequence texts at C0 `30186762`; the subtask doc and row 1.3's resolution in `ae97455f` |
| 18.1 | Lina (Opus) | the request record, the only file in `063236bf`, on H = `c1b67b8f` |
| — | Stacy | the verdict record `3e0e0994` (outside the line) |
| 18.2 | Lina (Opus) | the selected composition, byte-equal, as § "24.3 acceptance table"; the release-2 CHANGELOG entry; 18.1 and 18.2 ticked (`34d4560e`) |
| 18.3 | Lina (Opus) | this doc, the summary and the instruments' final counts (part A); the U2b PR (part B, pending) |

## Carries — routed to this seat by the verdict record

The record names Lina as owner of three findings, and Thurgood additionally on the spec-text half of two. They are cited by id and path, and not restated: `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` § "Findings" — **G2-F1**, **G2-F2**, **G2-F3**.
- **No fix lands inside U2** (criterion 5, Lina condition 2).
- **Each is filed as a tracked issue after U2b merges.** A machinery fix is then a new falsification cycle with its own record and a new G2 request.
- **Two related carries are filed then as well**:
  - Kenya's and Data's shared residual from their VALVE-1 re-signs (the verdict's intro line says "stale/generated" while the listed artifact is generated and un-themed; recorded in their signature sheets, not a refusal);
  - Data's note on a Kiro blank line.

## Owed after U2b merges

- **Docs `rebuild_index`**, because U2b changed MCP-served governance docs: the orchestrator or Thurgood.
- **Issue archive moves, each with a dated closing entry** (README rule 5):
  - the generator residuals (`2026-10-01-agent-generator-out-of-grant-residuals.md`);
  - VALVE-1 (`2026-09-30-valve-1-per-trim-spans.md`);
  - the Req 13 design erratum (`2026-10-01-design-erratum-req-13-degradation-warning-text.md`);
  - the Task 18 lock refresh (`2026-10-01-task-18-lock-refresh.md`);
  - the workflow-comment grant (`2026-09-28-package-name-drift-workflow-comment-grant.md`);
  - the relocation gate (`2026-10-01-relocation-integrity-gate-vs-123-install-shape.md`);
  - the signing-chain CI step (`2026-10-01-verify-signing-chain-ci-step.md`).
- **New issues**: G2-F1, G2-F2 and G2-F3; the seats' "stale/generated" residual; Data's Kiro blank-line note.
- **Stacy's events**: MIDPOINT and ARMING at U2b's merge; RELEASE at the release-2 tag.
- **Release sequencing**: Release 1 is untagged. Whether it is cut first or ships with Release 2 is still Peter's call; the CHANGELOG entry is written not to presume either.

## 24.3 acceptance table

Requirement 24.3's labels for the re-grounding contract's instruments (Req 24.3: the list that follows "The acceptance table SHALL label the three instruments" in `requirements.md`), with (v)'s mechanical half placed by G2 (pass four) under Requirement 11.8.2. The G1 record this unit was cut on is `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` (U2a, `24c7f060`), cited and not restated; P2 branch A's label is not used in this table. Each row states what its passing does not establish (R26.8).

| Instrument | Label (Req 24.3) | What a pass does not establish |
|---|---|---|
| (i), (ii), (iii) with applicability verification, (iv) present-routes, and the all-`no-consumer-counterpart` floor | Deterministic clauses | Each clause establishes only its own stated property (Req 11.3–11.5); none establishes that a re-grounded unit's function survived. |
| `no-consumer-counterpart` signatures | Routed clause — mechanically enforced routing of a judgment the check cannot make | The routing is enforced; the judgment is the signer's, and a hollow assent passes it. |
| The behavioral instruments (Req 24.1 two-beat conformance run; 24.2 trio probe) | Behavioral backstop — non-deterministic, per-release, sampling | A sample: agents and domains it does not exercise are named per run (Req 24.2a), and an unexercised one is not covered. |
| (v)'s mechanical half — body units | Deterministic, for body units only, with respect to attack (a) (G2 PASSES) | Attacks other than (a); the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); that the derivation check is applied to the committed consumer rendering (at C0, `checkDerivation` has no importer outside `tools/agent-generator/__tests__/`; those tests read real canonical sources, the renderings and dispositions they check come from test fixtures, and none reads `canonical/_consumer-output/`); frontmatter and always-set units unless their own rows say so. |
| (v)'s mechanical half — frontmatter entries | Deterministic, for frontmatter entries only, with respect to attack (a) (G2 PASSES) | Attacks other than (a); the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); that the derivation check is applied to the committed consumer rendering (at C0, `checkDerivation` has no importer outside `tools/agent-generator/__tests__/`; those tests read real canonical sources, the renderings and dispositions they check come from test fixtures, and none reads `canonical/_consumer-output/`); body and always-set units unless their own rows say so. |
| (v)'s mechanical half — always-set member units | Deterministic, for always-set member units only, with respect to attack (a) (G2 PASSES) | Attacks other than (a); the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); that the derivation check is applied to the committed consumer rendering (at C0, `checkDerivation` has no importer outside `tools/agent-generator/__tests__/`; those tests read real canonical sources, the renderings and dispositions they check come from test fixtures, and none reads `canonical/_consumer-output/`); body and frontmatter units unless their own rows say so. |

The verdict, its domain line and its findings, if any, are in `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` (Stacy's record, cited and not restated — Req 11.8.4). Planned dependency: `tasks.md` Task 27 (step 27.4, U5) is planned to read this table for Requirement 24.3's labelling.

