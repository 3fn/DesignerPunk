# G2 cycle 2: Stacy's refusal conditions and witness conditions (Task 30; PR-5.2)

**Author**: Stacy (verdict author; outside every delegated-tier line). Thurgood is recused from U3g's text.
**Date**: 2026-10-12
**What this is**: the committed form of "her U3-kickoff read § 2" that Task 30 cites. That read was session scratch; this record is the committed statement, written on the conditions Tasks 29 and 30, Task 18's W1–W5 and pass four's request conditions already encode. Where the kickoff read said something this record does not, the kickoff read is not a source: this record is.
**Companion**: `completion/g2-cycle-2-attacks.md` (the rows, the expected outcomes and the HOLDS conditions). This record says when I decline to read them against a head.
**Frozen** at its commit like the attack file. A change after the first fix commit is a new dated commit that states why, and is itself disclosed in the verdict record.

---

## 1. Two outcomes that are not verdicts

- **Refusal.** I decline to issue a verdict on a request. **No record is written and no token is used.** The reply names each unmet condition by its id below and the evidence I read. A refusal is not a cycle.
- **`NOT-RUNNABLE`.** I accepted the request, tried to run the cycle, and could not. **A record is written** with the token and a reason after ` — `. It **is** a cycle and counts toward Task 30's "at most one further request (cycle 3)". It follows the form `**Verdict**: NOT-RUNNABLE — not re-verified — <reason>`.
- *My reading, to be corrected by Task 30's owners if wrong:* Task 30 counts requests that end in a record. A refused request has no record, so it does not use up cycle 3. I decide which of the two a case is by whether the condition is about the request (refusal) or about running the cycle (NOT-RUNNABLE).

## 2. Refusal conditions (about the request; I decline before running anything)

Each is checkable from git and the request record without asking the requester.

| ID | I refuse if | How I check |
|---|---|---|
| RF1 | **The head is not frozen.** H′ is not named in full (40 hex), is not pushed, is not equal to `origin`, or the working tree at H′ is not clean | request record text; `git rev-parse H′ origin/task/123-u3g-g2c2`; `git status --porcelain` at H′ |
| RF2 | **The attacks did not come first.** Any commit in `<U3g branch base>..H′` that touches `tools/agent-generator/**` or `canonical/profiles/consumer/**` lacks `g2-cycle-2-attacks.md`'s commit as an ancestor, or lacks `u3g-sizing.md`'s commit | Task 29's instrument: `git merge-base --is-ancestor <attack commit> <each such commit>` for every such commit |
| RF3 | **My expected outcomes moved after the fix began.** The attack file or this record changed in any commit after the first fix commit, other than a dated amendment that states its reason and that I wrote | `git log --follow -- completion/g2-cycle-2-attacks.md completion/g2-cycle-2-refusal-conditions.md` against the first fix commit |
| RF4 | **The ruled text moved.** `g2-spec-text-ruling.md` at H′ differs from the text the attack file was written against | `git diff 905dd1e62 H′ -- .kiro/specs/123-consumer-distribution/g2-spec-text-ruling.md` is not empty |
| RF5 | **The consequence texts are not frozen, or are not independent.** `g2-cycle-2-consequence-texts.md` is not committed at a C0′ that is an ancestor of H′, was edited after C0′, or any commit touching it carries a Thurgood author or `Agent: thurgood` trailer | `git log --format='%h %an %b' -- <file>`; `git diff C0′ H′ -- <file>` |
| RF6 | **Something landed in the input set after the request** (my condition (d)), or the request reply cannot name the declared input set | Task 30 instrument (i)–(iii): H′ named by its SHA at the request; at PR open `git diff --name-only H′ <PR head> -- <declared input set>` prints nothing; after the squash the same against the squash SHA. A merge of `main` carrying input-set changes counts as a change. The input set is the one the 29.4 completion doc declares, and it contains the ruling's R3 minimum |
| RF7 | **The request frames an outcome.** The request record states, predicts, prefers or argues for a verdict, or for a particular reading of a row | read the record |
| RF8 | **The request record is incomplete** against § 4 (W3 below) | read the record against the list |
| RF9 | **A ceiling limb fired and the cycle did not stop** (Task 29): more than 12 failing rows, more than 3 disposition re-authorings, a second seat on the stale list, or any body or always-set row failing, with no dated record of Peter's re-plan | the completion docs of 29.0, 29.3 and 29.6; the pasted stale list |
| RF10 | **I would be approving my own act.** The re-sign round moved any Stacy-signed row other than `knowledgeBases[spec-summaries]`, or I am asked to re-sign a row with no hash move (out of bound), or my re-sign is not in the pasted per-act list `<dispositions file>#<row> — <seat> — <sha7>` | the stale list; the signing commits; `verify-signing-chain --ci` result |
| RF11 | **The fix is in the check's judgment of its own evidence.** The standing test is wired to a fixture or a model in place of the committed profile and the real generator output, or `checkDerivation` is given spans built by anything other than the generator's emission | read `derivation.shipped-profile.test.ts` and the harness it calls |

## 3. NOT-RUNNABLE conditions (about running the cycle; a record is written)

| ID | The cycle is `NOT-RUNNABLE` if | Evidence in the record |
|---|---|---|
| NR1 | The harness does not reproduce the substrate (E6): over the unmodified H′ copy, the generator's consumer output differs from the committed `canonical/_consumer-output/**`, or any attribution sidecar's span list differs | the byte-equality count (pass four: 57 of 57 artifacts, 56 sidecars) |
| NR2 | The toolchain to run the real `generateAll` is unavailable in my environment | `not re-verified — toolchain unavailable` |
| NR3 | A listed row's construction cannot be built on the emitted substrate, other than FS1's accepted `derive()` refusal | the row id and the refusal text |
| NR4 | `npm run check:122:diff-guard` at H′ in no-write mode is not `no-op-green` with 0 freshness findings, apart from the declared stale list in the re-sign round | the guard's lines |
| NR5 | The branch-head CI dispatch at H′ is not green on the required contexts the Agent Generator workflow and Lane Timing run, so the head I am reading is known broken | the run URLs and conclusions |

An unbuilt or unrun row **never rolls into a pass**. `NOT-RUNNABLE` is the only token for it.

## 4. Witness conditions at 30.1 (the request record; the analogue of Task 18's W1–W3)

The request record (Lina's, at 30.1) is the witness. I read it against these before I read any row.

- **W1: the lock agrees with the tree I read.** A run of `npm run check:122:diff-guard` at H′, quoted with its verdict lines (`operative-set-freshness: PASS — …` and `diff-guard: no-op-green`), with `git status --porcelain` printed empty before and after, run from a clean tree by a seat other than me. I repeat it read-only (`runGuard(root, { refreshLock: false })`) and the two agree.
- **W2: nothing lands between the request and the verdict**, by RF6's three-part instrument. Any path printed means the request is re-made on a new H′.
- **W3: the request record's contents.** It names H′ in full. `git diff --name-only H′ <request commit>` prints only the record. H′ is pushed and equal to `origin`. It cites a green `--ci` dispatch at H′ (run URL, `headSha`, conclusion). It cites the attack file's and the sizing record's paths and commits, and the consequence texts' path and C0′ with the ancestor command and its output. It lists every fixing commit and every seat merge since the cut with its authority. It states the machinery's authorship (Lina wrote C13–C15 and the fix; I judge it, I do not write it). It pastes:
  - the standing test's printed evaluated row count and the count derived from the dispositions, and the two E2/E3 bite outputs;
  - the declared input set;
  - the freshness stale list as taken after 29.3 and the per-act lines for the re-sign round;
  - the moved-outputs list for 29.6 (every moved path).
- **W4: the signing chain.** `verify-signing-chain --ci` passes inside the `122-diff-guard` context at H′ (links 1–3), cited by run URL and the step's own lines.
- **W5: the fork is on record.** Peter's (A) ruling is cited by its commit (`13dcfc08c`), and Kenya, Data and Stacy's reads of the rendered Kiro knowledge note are quoted in 29.3's completion doc (the amendment's own condition). A missing read is RF8.
- **W6: the 24.3 consequence is not applied before my verdict.** Nothing in the PR applies the HOLDS text until the verdict record is committed on the branch (the record reaches `main` only through U3g's squash, never by a record-only PR; Task 30 C-1).

## 5. What my record will say about itself (so it can be audited)

- **Section one** discloses that I wrote the findings (G2-F1/F2/F3) and write the verdict; that I pre-read Thurgood's ruling for verifiability only and he took parts of my read (the ruling's own list says which); that I re-signed `knowledgeBases[spec-summaries]` and any other Stacy-signed row the round moved; that Thurgood is recused and authored no line of the record.
- **The sample, named, with its fraction**: every row in the attack file is run (37 of 37), or the record is `NOT-RUNNABLE`. The committed profile's 169 rows are read from the standing test's own output, not sampled by me; I re-run it and quote the count.
- **The verdict line** is exactly `**Verdict**: HOLDS`, `**Verdict**: DOES-NOT-HOLD` or `**Verdict**: NOT-RUNNABLE — not re-verified — <reason>`, once, at the start of a line.
- **Findings** are routed by the two-route rule (an explicit message to the owning agent, and the standards line for Thurgood). A finding is a new finding and is never added to this cycle's verdict as a new attack class (Task 30, R-5).
- **Merge-path status**: this verdict is read by Lina's gate parent (Task 30) as an input to a PR it opens, but my record is not a required check, a review gate or a blocking condition on any PR. The hold's enforcement is in RELEASE-FLOW (Task 29 B1 text), not in me.

## 6. Peter's ruling on the named limits (recorded 2026-10-12)

- **Ruling** (Peter, 2026-10-12, one word: "accept"; relayed by the orchestrator in the session and recorded here by Stacy). A cycle-2 `HOLDS` **may carry** the ruling's accepted residual (hollowing in place with destination S, including `writeScope[…]` widened to `**`, and the one unsigned shared governance rule hollowed in place) as a written-down limit, **provided the verdict record names it**.
- **It is the exception to "never ship with a written-down limit"** (the recommendation Peter agreed to under PR-5, "Yes, and good idea.") and it is the exception only for the limits listed in the attack file § 2.4 (L1–L5). Any other limit found by the cycle is not covered.
- **Grounds he was given**: the check still catches every attack it was built for; the limit was found by the ruling itself, not by a failed attack; the cover (a per-row content declaration, or a human read of in-place changes) is larger than U3g and is already routed as a permission question (the round-2 records).
- **Surviving counter-argument (mine, left standing)**: a permission change that reaches no human passes. A `writeScope` member widened to `**`, or the shared governance rule rendered into every seat hollowed in place, is `VERIFIED` and no signer reads it. The ruling accepts that, and it is the thing the verdict record must say plainly in its "does not mean" list.
- **What changes in my conduct**: nothing about the rows. L1–L5 stay expected `VERIFIED`; the verdict record names each one, with L3 and L5 first, and routes the permission question to Thurgood. The ruling widens what `HOLDS` may carry. It does not widen what I treat as an attack that must be rejected.
- **Authority of this paragraph**: Peter's word as relayed. If the relay is not the record Peter wants, he replaces it with a dated record of his own and this paragraph defers to it.

**Standards implications**: none.
