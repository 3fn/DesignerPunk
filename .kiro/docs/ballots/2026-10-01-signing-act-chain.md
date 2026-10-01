# Ballot Measure: Signing acts need no grant; the commit is the record — `verify-signing-chain`, its fixtures and its cadence

**Date**: 2026-10-01 (drafted)
**Drafted by**: Thurgood (Opus) — Civitas steward and owner of the instrument this ballot proposes, at Peter's direction (drafting approved 2026-10-01)
**Status**: **DRAFT** — Peter ratifies by merge. **Record-first** (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"): when Peter rules, the session that receives the ruling commits the Status flip on this branch (this line, the README index entry, and the register history lines in edit sites 2–3) before the merge. **Peter's merge of this PR is `R`**, the ratification commit on `main`'s first-parent history, and the rule's effective point. A merge with this line still reading DRAFT is a recording defect for the next claims pass, not a silent ratification.
**No `Ratified-machine:` line, deliberately.** That mechanism belongs to the one ballot `completion-criteria-parity` parses (`2026-09-19-completion-claims-integrity.md`); this ballot follows the B-U1 / B-CI / B-U2 / parent-instrument omission precedent.
**Proposed by**: Peter, 2026-09-30, in three rulings: (1) the merged authorization rule APPROVED in direction; (2) Task 15's disposition (one Medium finding against the plan, no retroactive grant, Kenya's `65563985` a separate MIDPOINT item); (3) the condition that the rule "is not a solution unless it comes with assurance that the seat whose signature appears is the seat that signed — or an honest account of why that assurance is out of reach and what stands in for it", followed by the direction to scale back: "find a way to scale back the solution while being equally effective if possible". The holistic design was APPROVED with the two R2 residuals folded (§ 12).
**Required reviewer**: **Stacy**. Her claims passes change shape (§§ 4–5), she specifies every fixture (§ 4.5), and ARMING is hers. She signed off on the design at holistic R2 on four conditions (the lookup rule, H2b, F12′, A4 before U2b merges), all adopted here. **She has not yet read this text.**
**Consulted**: Stacy — required reviewer, design signed off at holistic R2 with four conditions, all adopted in §§ 4.3, 4.5 and 6; Lina — owner of the C1 machinery, her F13 and merge-only rule adopted in §§ 4.5–4.6, her field fork withdrawn at R2; Kenya — the signer's seat at consult 2, her self-edit gap settled as authoring in § 2 clause 4

> **Conflicts, stated.**
> - **The author wrote the defect this ballot records.** Thurgood was Task 15's PRIMARY and authored its row. The row granted the C1 signing acts to no seat, and the fan-out ran ungranted (§ 1, Stacy's finding). Nothing here grants that fan-out after the fact (§ 10).
> - **The author owns the instrument** (`verify-signing-chain`, register row `signing-act-consistency`). Its arming is Stacy's ARMING, and its verdicts are hers (§ 4); the author builds and keeps it true, and decides nothing it reports.
> - **Stacy's own acts are in the population** — she signs roughly half the signed rows under the C1 carve-out. Her acts are walked by Peter (§ 5.3), not by her.

---

## 1. The gap

**Re-signs are structural, and most of them have no grant to ride.** VALVE-1 (Req 11.5.6) carries a signature forward only until its unit's canonical source or rendered output changes. Spec 123's design records signatures and confirmations as **"Perpetual (rewritten on every canonical change and every release, forever) … These survive the spec's closure"** (`design.md` L115, on U2b's unit branch). So every adapter or renderer change, canonical unit edit, profile change and re-render owes re-signs. The dominant driver is not a granted change: it is **identity-doc and charter edits under the governance carve-out**, which carry no grant list (Lina's and Thurgood's consult-2 counts: 16 identity-doc commits and 9 `canonical/agents` commits in 30 days; Stacy signs roughly half of all signed rows — 122 of 257 at her 2026-09-30 count).

**Neither write-scope grant reaches a C1 seat.**
- **The tasks-row grant** (`2026-09-26-tasks-row-write-scope-grant.md` clause 2) grants the PRIMARY and the secondaries **named on the row**. Task 15's row named Thurgood and Lina; Kenya, Data, Sparky, Leonardo and Stacy signed under it anyway. **That fan-out was ungranted** — Stacy's finding, one Medium against the plan, cause in the plan, remediation routed to Thurgood (§ 6.4).
- **The issue-row grant** (`.kiro/issues/README.md` rule 8) grants **"its named owner"**, singular. The VALVE-1 issue as drafted granted the seats' profile paths to Lina, who signs none of them — the grant did not cover the acts the issue described.

**Two assurance gaps sit under any authorization rule.**
- **Identity.** Every commit carries one git identity (Peter's). A seat's identity lives only in typed text — the commit's `Agent:` trailer and the `signer:` field — which any session running any charter can type.
- **Diligence.** A genuine seat can refresh a hash without re-reading the text, and nothing mechanical tells a real read from a refresh.

**The threat model, in proportion.** A single-operator system; every seat is a session Peter or the orchestrator spawned. The realistic failures are **error** (a wrong trailer, the wrong seat briefed) and **shortcut** (a primary signs for a seat to save time). The value at risk is C1's evidentiary point: that a session running the owner's charter read the text and stood behind it.

**What the first design got wrong.** The first joint round (`working.md`, A1–A4 plus 1c and a step-up) answered Peter's condition with six layers run by three parties at three times. The holistic round found they were one chain checked at six points, and that the SHA of the seat's own commit already finds the transcript that created it (Thurgood R1, verified: `a02efcd5` appears in 12 transcripts and only Sparky's has a `git commit` result naming it). This ballot is that chain, checked once.

---

## 2. M1 — the authorization rule (standing)

> **STANDING RULE — the signing act.**
> 1. **What a signing act is.** A write by **`c1Seat(row)`** confined to (a) that row's `signature` or `confirmation` sub-object — the closed field set of `signatures.ts` `SIGNATURE_FIELDS`, **`refuse` included: a refusal is a signing act** — and (b) that row's section of its `signatures/<source-id>.md` or `confirmations/<source-id>.md` sheet whose `signer:` (or confirmer) line is that seat.
> 2. **Authority.** The C1 function authorizes a signing act. **It needs no tasks-row or issue-row grant, and no grant confers it on another seat.**
> 3. **Bound — the stale list.** A signing act is valid only for a row on the branch's **freshness stale list**, as the C16 `operative-set-freshness` sweep reports it (`npm run check:122:diff-guard`, which runs the sweep first). The list is taken before signing, **re-taken each round** (a refusal's re-disposition moves the hash again, and the re-sign that follows is in bound), and **pasted into the PR body**. The list is a property of the tree: a stale entry carried onto a unit branch by merging `main` is in bound on that branch, exactly as one the branch's own change created.
> 4. **What a signing act is not.** Every other field is **authoring** and stays under charter scope or a grant: `disposition`, `destination`, `removals`, `cites`, overlay text, operative-set items, any canonical source, **and any re-disposition that answers a refusal**. **A seat editing its own charter is authoring**: charters are governance law under the carve-out, and no seat owns its own (Kenya's gap, settled the same way by all four consult-2 seats; `65563985` is its instance).
> 5. **Out of bound.** Re-signing a row **not** on the stale list (a signer changing its mind) needs a real grant, and the claims pass counts it separately.
> 6. **The audit, per PR.** (i) the rows whose signature or confirmation changed ⊆ the stale list; (ii) `signer` = `c1Seat(row)` = the commit's `Agent:` trailer; (iii) every changed hunk, and every commit carrying one, stays inside the signer's own objects; (iv) the PR body lists the acts — the set in (i), one line each, `<dispositions file>#<row> — <seat> — <commit sha7>`, beside the pasted stale list. (i)–(iii) are mechanical, in `verify-signing-chain --ci` (§ 4.1); (iv) is read at the claims pass.
> 7. **Validity.** A signing act is valid only if its whole chain holds (§ 3). **A missing link is never green.**
> 8. **Duration and reach.** Standing; tied to no spec or unit. In force from `R`; **it does not reach back** — a record written after an act documents it and does not authorize it.

**Register `rule:`** (edit site 2, verbatim): see `signing-act-consistency`.

**Why function-derived, not grant-derived** (the F-1 fork, § 9): Stacy's grant-derived option (F) authorized signing only after a *granted* change; the carve-out edits that dominate re-signs have no grant, so under F those rows go stale and no one may re-sign them. All four consult-2 seats (Stacy, Thurgood, Lina, Kenya) converged on the function-derived form at round 2, and Stacy withdrew F. Her audit holds unchanged under it once "moved rows" means the stale list; the grant-vs-function distinction is load-bearing for the principle, not for the audit.

---

## 3. M2 — the chain, and the principle

**Principle: a signing act is valid only if its whole chain holds; a missing link is never green. The commit is the record.** No new field, no sidecar, no attestation line: the record is the seat's own commit, found by its SHA, and the harness transcript that created it.

| # | Link | Read from | Checked by |
|---|---|---|---|
| 1 | The row is on the PR's stale list | the freshness sweep | `--ci` |
| 2 | The hunk, **and the commit that carries it**, stay inside the signer's objects (commit-grain containment); a merge result on a signature path equals one parent's blob | git | `--ci` |
| 3 | `signer` = `c1Seat(row)` = the commit's `Agent:` trailer | git + `c1.ts` | `--ci` |
| 4 | **Exactly one subagent transcript created the commit** (the lookup rule, § 4.3) | the harness store | `--audit` |
| 5 | That transcript's meta `agentType`, and the parent session's `tool_use` for its `toolUseId`, name the signer | the harness store | `--audit` |
| 6 | Its `prompt_snapshot` (`systemPrompt[0]`) byte-equals `.claude/agents/<seat>.md` below its frontmatter, at the branch head of the transcript's first record | the harness store + git | `--audit` |
| 7 | Each signed row's rendered line appears verbatim in a tool result in that transcript | the harness store | `--audit` |
| 8 | Judgment: the brief did not direct the outcome; a blind fresh seat re-judges a sample | transcript + a fresh seat | **J** (sampled, § 5) |

**Facts the chain rests on (verified 2026-09-30, cited not re-run):** the meta record holds `agentType`, `model`, `spawnDepth` and `toolUseId`; `prompt_snapshot` byte-equals the rendered charter (Sparky's `agent-afb120a9031fa094a`, 32,812 characters); GitHub retains `refs/pull/N/head` after squash and branch deletion (`#241` → `8af3e9b8`; `#240` → `f333ac96`; `#16` → `e1aa6179`); `cleanupPeriodDays` is unset, so the harness store's 30-day default governs retention (§ 6.1).

---

## 4. M3 — the instrument, `verify-signing-chain`

**Home**: an extension of `tools/agent-generator/regrounding/signatures.ts` (beside `checkDispositionSigners`, which already checks half of link 3), with a CLI entry for its two modes. **Owner**: Thurgood (builds and keeps it true). **Register row**: `signing-act-consistency`. **Label, everywhere it prints: "consistency, not identity."** Its verdicts are Stacy's to read and record; it decides nothing.

### 4.1 `--ci` — links 1–3, in CI

- **Where**: one step of the existing required context `122-diff-guard` (`.github/workflows/agent-generator.yml`). **No new context; `EXPECTED_CONTEXTS` unchanged.**
- **The C6 carve-out** (§ 6.3): the step is **not** gated by the no-op probe. A committed lock that matches the tree skips generation checks, never signing checks — the lock is written by the same session whose signing the step checks, so letting it skip the step is self-attestation (Stacy R2).
- **History**: the step reads the PR's full commit range (`base.sha..head.sha`; on a branch dispatch, `merge-base(main, head)..head`). A shallow or unreadable history **fails loud** (F10).
- **It runs the full freshness sweep**, not only the history walk. That closes, for profile-touching PRs, Stacy's finding that CI enforces `operative-set-freshness` by attestation when the lock matches (F11).
- **Floor**: if no commit in range touches `canonical/profiles/**`, it prints `signing-chain: no signing paths in range — 0 rows (pass)` and passes; otherwise it prints the number of rows checked and **fails on zero**.
- **check_state**: `proposed` until F1–F13 pass and the CI-path bites (F9, F10, F11) are recorded red on the fixing PR's own runs; the row flips to `armed` **in that same PR** (the `publish-rail-guard` same-commit precedent; Stacy's binding condition carried: if the step and its bite evidence are split, the row stays `proposed`). **ARMING fires at that merge — Stacy's.**

### 4.2 `--audit --pr N` — links 4–7, on every act

- **Local, post-acceptance, never blocking; no `check_state`.** It reads `refs/pull/N/head` (which survives the squash) and walks every signing commit in the PR's range, **every act, not a sample** — sampling a scripted check only loses coverage (Lina R1). For a unit branch whose PR has not opened, `--audit --branch <unit-branch>` walks the same range from the branch head.
- It reads the harness store by `agent-<id>` under `~/.claude/projects/<project>/<session>/subagents/`, never a `/private/tmp` path.
- Its output is pasted **verbatim** into the claims-pass record.

### 4.3 The lookup rule (Stacy's, operative)

> **A candidate** for commit C is the **first `git log` line printed after a successful `git commit` in the same tool call** (one per pass, where the call loops), or the commit's own `[<branch> <sha>] <subject>` result line. The line must show **a prefix of C's full SHA** (at whatever length the call printed; SHAs are not always on line one) **and C's exact subject**. A SHA appearing anywhere else — a brief that quotes it, a grep, a `git log --oneline -N` not preceded by a successful commit in the same call, a `git log -1` after a failed commit — **is never a candidate**.
>
> **Success is decided from evidence in the tool result, never assumed.** A `;`-chained call hides the commit's exit status (`commit -q …; git log -1` prints the previous HEAD when the commit fails). **Where the result cannot show the commit succeeded, the act reads `anomaly`, never `anchored`** (fixture H2b).

**Outcomes:**
- **exactly one candidate, in a subagent transcript** → walk links 5–7 → `anchored` if all hold, `FAIL` naming the link if any fails, `record absent` naming the link if its record is missing;
- **candidates only in the main (orchestrator) session** → **`FAIL`** — a primary created a seat-trailered commit (H3);
- **more than one candidate** → **`anomaly`**;
- **none** → **`record absent`**, or **`unanchored`** for a seat run under Kiro (no harness meta record exists).

### 4.4 The reporting rule

**One verdict per act, from a closed set: `anchored` · `unanchored` · `record absent` · `FAIL` · `anomaly`**, with the link number on every verdict but `anchored`. **Never rolled up**: counts may sit beside the per-act lines, never in place of them, and no non-`anchored` verdict counts toward a green total. `anchored` reads "the consistency chain is complete", never "identity verified". The Task 15 walk (§ 6.4) carries the qualifier `pre-ratification observation` on every line.

### 4.5 Fixtures — Stacy specifies every one; Thurgood builds them (one Sonnet session, under the grant issue)

| # | Mode | Shape | Must |
|---|---|---|---|
| F1 | `--ci` | `Agent:` trailer ≠ `signer` | fail |
| F2 | `--ci` | signing commit with no `Agent:` trailer | fail |
| F3 | `--ci` | two `Agent:` trailers | fail |
| F4 | `--ci` | hunk edits `disposition` or another seat's object | fail |
| F5 | `--ci` | re-signed row not on the stale list | fail |
| F6 | `--ci` | a seat commit arriving through a merged side branch (`--no-ff` or fast-forward) | **pass** |
| F7 | `--ci` | a merge commit's conflict resolution edits a signature | fail |
| F8 | `--ci` | a later commit with a different trailer rewrites the hunk | fail |
| F9 | `--ci`, CI path | F1's defect in a PR with a refreshed lock (`noop=true`) | fail |
| F10 | `--ci`, CI path | a depth-1 checkout | fail loud |
| F11 | `--ci`, CI path | a stale unit with a hand-computed matching lock | fail |
| F12 | `--ci` | the `65563985` shape: a seat-trailered signing commit that also edits a path outside the seat's objects (its own charter) | fail |
| F12′ | `--ci` | F12 split across two commits with the same trailer | fail |
| F13 | `--ci` | a conflicted merge whose result on a signature path equals **neither** parent's blob | fail |
| — | `--ci` | controls: a clean `assent` act and a clean `refuse` act | pass |
| H1 | `--audit` | a rebased seat commit | reads `record absent` |
| H2a | `--audit` | the creating transcript plus another that only quotes the SHA | one candidate → `anchored` |
| H2b | `--audit` | the primary commits `Agent: kenya` quietly; Kenya's seat then runs a failed commit plus `; git log -1` | **never `anchored`** — the only silent false-green the design admits, held by this fixture |
| H3 | `--audit` | a main-session commit carrying a seat trailer | reads `FAIL` |

### 4.6 The merge-only rule (Lina's)

> **Seat commits enter a unit branch by merge only** — `--no-ff`, or a fast-forward, both of which keep the seat's SHA. **Never** rebased, amended, cherry-picked, `merge --squash`-ed, or re-committed from a seat's diff. A seat whose commit fails CI makes a new commit, never `--amend`. Conflicts are resolved in the merge commit, never by rebasing the side branch — and a merge that writes signature content no parent carried fails `--ci` (F13). The squash of a unit to `main` is covered by `refs/pull/N/head`.

This is a behavioral rule before merge. A rewrite surfaces after merge as `record absent` (H1), and costs a re-sign (§ 9, residual). Lina verified it compatible with Task 16's fan-out (seat merges keep the seat's SHA as parent 2: `3bd520a6`→`a02efcd5`, `4c118d45`→`5c0b09c0`, `33d25f21`→`dd8a2efc`; `complete-task.sh` carries no rebase or amend).

---

## 5. M4 — cadence and the judgment sample J

### 5.1 The walk

At **MIDPOINT, CLOSEOUT and RELEASE**, Stacy runs `--audit` over **every PR merged since her last walk** (and every unmerged unit branch in the event's population), covering **every act in it**. The per-act lines go verbatim into that event's claims-pass record. **A signing PR that reaches RELEASE unwalked is trigger (d)** (§ 8).

### 5.2 J — the one sample, judgment only

- **What J covers**: link 8 — check 4 ("the brief did not direct the outcome") and the **blind fresh seat**.
- **Check 4 is judged once per brief or continuation, not per act** (Stacy's condition 2: per act, the 30 Task 15 refuse commits alone cost about 2.5 hours).
- **Rate** (Stacy's, from the A3 round): every `refuse`; every flip (assent↔refuse, or a changed `surviving`); at least one act per distinct non-Stacy signer seat per PR; and **one blind assent per seat per render population**, preferring full-survival assents. The fraction is counted; no floor is set.
- **The blind seat**: a fresh seat of the same charter re-judges the act **without seeing the prior disposition**; the two are compared afterwards. A disagreement is logged **`divergent`** — never green, never a finding against the first seat, counted in the record; one still unresolved at the next RELEASE stays an open item there.

### 5.3 Stacy-signed acts — Peter's sample

For acts Stacy signed, **Peter runs `--audit` and J** (the C1 collapse-seat rule; Stacy will not rule on her own acts). The claims-pass record carries the line `Peter sample (Stacy-signed): <k> / <N>`, and **`0 / N` when empty, never omitted**.

### 5.4 The widening rule

**A `FAIL`, an `anomaly`, a meta `spawnDepth` ≠ 1, or a meta `model` unlike the seat's plan sends every act by that seat in that PR into J.** This is all that survives of the step-up layer.

---

## 6. One-time acts

1. **A4 — retention.** Peter commits `cleanupPeriodDays` ≥ 180 in the project's Claude Code settings (**Peter's config act**). **It lands before U2b merges** (Stacy's condition 1): the default 30 days deletes U2b's 2026-09-29 signing records around 2026-10-29. A4 is retention on one machine, not durability (§ 8).
2. **The `--ci` grant** — `.kiro/issues/2026-10-01-verify-signing-chain-ci-step.md`: owner Thurgood, trigger *before U2b's unit PR opens*, grant paths there. The fixing PR targets U2b's unit branch, where `regrounding/` and the consumer profiles exist.
3. **The C6 carve-out**, recorded here as law: **"The C6 no-op lock (DD7) may skip generation checks; it never skips a signing check. `verify-signing-chain --ci`, and the freshness sweep it calls, run on every PR whatever the probe's `noop` output."** The fixing PR updates `agent-generator.yml`'s header comment (its L14–16 no-op description) to name it.
4. **Task 15 — first application, observation only.**
   - Stacy runs the walk on U2b's MIDPOINT population (her count: 68 signing commits from 29 transcripts, all dated 2026-09-29, scanned in 0.1 s), **recorded `pre-ratification observation`, with no findings against seats** (Stacy's condition 3). If MIDPOINT precedes `--audit`'s existence, the walk is recorded as owed and runs before U2b merges.
   - **Task 15's ungranted fan-out is one Medium finding against the plan**, recorded by Stacy, remediation routed to Thurgood: this ballot's provenance (§ 12) plus Thurgood's disclosure in `task-15-completion.md`, committed on U2b's unit branch (not in this PR). **No retroactive grant.**
   - **Kenya's `65563985`** (`Agent: kenya`, editing `canonical/agents/kenya.md`) is a **separate MIDPOINT item**, Stacy's to adjudicate.

---

## 7. Coverage, retirement, cost

### 7.1 Coverage by threat (against the six layers it replaces)

| Threat | Caught by | vs the six layers |
|---|---|---|
| Wrong trailer (error) | `--ci` link 3 | equal |
| Edits outside the box; a disposition under the signing label | `--ci` link 2 (F4) | equal |
| Re-sign of an unmoved row | `--ci` link 1 (F5) | equal |
| A charter self-edit riding a signing commit | `--ci` link 2, commit grain (F12, F12′) | **stronger** (new) |
| A merge writing signature content no seat created | `--ci` F13 | **stronger** (new) |
| Wrong seat briefed | `--audit` links 5–6, every act | **stronger** (was sampled) |
| Shortcut: a primary signs for a seat | `--audit` link 4 (H3 `FAIL`; none → `record absent`) | **stronger** (was sampled) |
| A read-less hash refresh | `--audit` link 7, every act | **stronger** (was sampled) |
| A "just sign" brief | J, check 4 | equal |
| Hollow assent | J, blind seat — sampled, not prevented | unchanged |
| Forgery through the writable store | nothing | unchanged |
| Kiro-run seats | `unanchored` | unchanged |

**Weaker, stated:** the per-act `Signed:` line — the orchestrator's legible witness — is gone; a rewritten seat SHA breaks the chain (loudly, `record absent`, at the cost of a re-sign); the chain depends on GitHub keeping pull refs and on the harness store's retention (A4).

### 7.2 Retired

- **A1** becomes `--ci`. **A2** (the `Signed:` line per act) goes; the act list in audit (iv) stays. **A3's scripted checks (1, 1b, 2, 3′) and 1c** become `--audit`, on every act. **A3's judgment** is renamed J. **The step-up** becomes the widening rule. **A4** stays, once.
- Running layers **6 → 3** (`--ci`, `--audit`, J) plus one one-time act. Per-act manual minutes **~4 → 0**. **The orchestrator is no longer a party** to any act's assurance.

### 7.3 Cost

- **Per PR**: `--ci` ~20 s (~2 min on profile-touching PRs); `--audit` ~5 min of reading (the scan itself is sub-second); J ~5 min per judged brief or continuation and ~15 min per blind seat; Peter, one `--audit` command plus J on his Stacy-signed sample.
- **One-time**: one Sonnet build session under the grant; Stacy's fixture specification; Peter's A4 config commit; this ballot round.

---

## 8. The honest boundary and the identity trigger

**What this does not assure:**
- **Identity.** Every link is either typed (`Agent:`, `signer:`) or harness-written into a store any local session can write. The chain proves **consistency** among records, not who typed. The label is "consistency, not identity", and the instrument prints it.
- **Judgment** outside J's sample. A hollow assent passes every link.
- **Kiro-run seats**, which read `unanchored`.
- **The chain's root**: the orchestrator's `subagent_type` choice and its brief.
- **Durability**: the harness formats (`prompt_snapshot`, commit output) are unowned; a format change makes every act read `record absent` — loud, but a dependency. Retention rests on A4 and on GitHub's pull refs.

**Who owes the identity fix: no one today.** 125-B U3's precondition #4 (`.kiro/specs/125-B-classification-map/` inbound-to-u3 notes) asks for **one** machine or App identity, so that Peter's approval is valid — it separates Peter from the agents, not one seat from another (verified at Thurgood's A-round R1).

**Trigger.** Thurgood charters an issue (owner + named trigger) when any of these fires:
- **(a)** one walked mismatch that a recording slip does not explain;
- **(b)** a second `unanchored` act;
- **(c)** U3's identity work opening — U3 then answers the per-seat question; a decline with reasons is allowed;
- **(d)** a signing PR reaches RELEASE unwalked, **or** Peter's Stacy-signed sample reads `0 / N` at two consecutive walks.

Peter decides whether the issue becomes a spec.

---

## 9. Counter-arguments (fold-back applied) and forks

**Folded in by the counter-arguments run against the R2 design:**
1. *"The verifier parses shell output in forms the seats choose"* (Stacy R2) → the lookup rule tightened to the first `git log` line after a successful commit, success decided from evidence, ambiguity → `anomaly`; fixtures H2a/H2b.
2. *"A conflicted merge can carry signature content no seat created"* (Lina R2) → F13.
3. *"Keying the bound to the PR's own diff misses moves carried in by merging `main`"* (found while drafting, from the TCP simulation in § 11) → clause 3 keys on the tree's stale list.
4. *"A TCP pointer would stale a signed unit"* → the pointer rides the next TCP edit (§ 11, F-2).

**What survives (the residual):**
- **The store is writable, the formats are unowned, and a total green reads as identity.** The label is the only defense against that last reading, and labels erode. *Any future reading of an all-`anchored` walk as evidence that a seat's identity was proven will have made the error Spec 127 exists to prevent.*
- **H2b is held by a fixture, not by construction** (Stacy). Every new shell form a seat invents fails loudly, except one that reproduces H2b's shape in a form the fixture did not anticipate.
- **Merge-only is behavioral before merge** (Lina). A rewrite is found after the fact, as `record absent`, and costs a re-sign.
- **A hollow assent passes every link; J samples it and does not prevent it**, and the half of the rows Stacy signs moves at Peter's pace.

**⚑ Forks for Peter (surfaced, not picked):**
- **F-1 — function-derived vs grant-derived authority.** On 2026-09-27 Peter authorized Lina's Task 11 confirmations through a row grant. This rule reverses that shape for the whole class: the C1 function authorizes, no grant does. **All four consult-2 seats recommend the function-derived form** (Stacy withdrew F at round 2); the counter that survives is Stacy's § 4.3 point — reach is computed from the stale list, not enumerated in a record.
- **F-2 — the TCP pointer.** (a) add it now; (b) leave TCP untouched now and carry the pointer as a rider on the next TCP edit that already stales the same section. **Drafted as (b)**; the measured cost of (a) is in § 11.

**Withdrawn, recorded:** Lina's R1 fork (SHA-rooted vs an in-tree provenance field) collapsed at her R2 once pull refs were verified durable: a field would point into the same fragile store (A4) and add a claim the signer types. It reopens only if transcripts are archived somewhere durable.

---

## 10. What this ballot refuses

- **M5** (per-seat keys with isolated custody) here — it belongs to the identity work trigger (d) charters, not to this ballot.
- **M6** (orchestrator-mediated commits) — it makes the shortcut actor the committer and erases link 4, the one link a primary cannot produce alone.
- **A blocking audit** — `--audit` and J never block a merge (the Q5 ground).
- **Retroactive application** — to Task 15 or any act before `R`. A record written after an act documents it; it does not authorize it.
- **The label "identity"** — for the instrument, its verdicts, or any total.
- **Rolling a non-green verdict into green** — `unanchored`, `record absent`, `anomaly` and `divergent` included.
- **The lock as evidence** of any signing act.
- **Sampling a scripted check.**
- **A provenance field typed by the signer.**

---

## 11. Application, at ratification — edit sites

1. **This ballot** — `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` (new).
2. **`governance/classification-map.md`** — a new row, `signing-act-consistency` (scoped: `--ci` `barrier`/`proposed`; `--audit` and J `audit`/`none`; owner thurgood), and history lines on `tasks-row-write-scope-grant` and `issue-row-write-scope-grant`.
3. **`.kiro/issues/README.md` rule 8** — one trailing clause: *"A C1 signing or confirming act needs no grant (ballot 2026-10-01-signing-act-chain; register `signing-act-consistency`)."*
4. **`.kiro/docs/ballots/README.md`** — the index entry.
5. **`.kiro/issues/2026-10-01-verify-signing-chain-ci-step.md`** — the grant issue (new).
6. **`canonical/generated.lock`** — refreshed by a green `diff-guard` run: `governance/` is in the C6 input closure, so the register edit moves the lock. **Simulated on U2b's unit branch (`0e278450`), the register edit stales no signed unit** (`operative-set-freshness: PASS — 373 unit(s)`); U2b refreshes its own lock at its next merge of `main`, as it must anyway. This PR therefore owes **no re-sign**.

**Not edited, deliberately:**
- **`.kiro/steering/Task-Completion-Protocol.md`** — F-2, drafted (b). Simulated on a throwaway worktree of U2b's unit branch (`0e278450`) with the one-clause pointer appended to § "Coherent Units" → "Write scope inside a unit": `diff-guard: FAIL (operative-set-freshness)` with **three** stale entries on one unit, `#coherent-units-the-merge-granularity` — the operative set (`canonical/operative-sets/task-completion-protocol.yaml`; C1 confirmer Stacy re-confirms), **Stacy's signature** (re-sign), and **the overlay** (the profile author, Thurgood, re-authors — an authoring act). That is three acts by two seats on U2b's critical path, at its next merge of `main`, for a clause the consumer overlay would subtract anyway (it already subtracts the 2026-09-26 grant pointer from that section). **Trade-off**: (b) leaves the always-loaded grant bullet silent, so a seat reading "an out-of-list edit is a claims-pass finding" there could still read a signing act as one until the rider lands; the rule's law home (this ballot), the register row and rule 8 carry it meanwhile, and the orchestrator's re-sign briefs cite this ballot. **Carried rider (owner Thurgood)**: the pointer clause rides the next TCP edit that already stales `#coherent-units-the-merge-granularity`, so the cycle is paid once.
- **Stacy's charter** (`canonical/agents/stacy.md`) — the walk's cadence and verdict vocabulary are hers to place; the same rider logic applies (her charter is a signed unit), so she decides whether and when, in her own commit. Until then this ballot and the register row's audit home carry it.
- **The ratified 2026-09-26 and 2026-09-27 ballots** — records, not edited; the register history lines point here.
- **The charters' write scopes** — unchanged; signing is not a write-scope act.
- **`.kiro/issues/2026-09-30-valve-1-per-trim-spans.md`** — Lina amends her own issue in her own seat.

**Owed after merge:** the docs-MCP `rebuild_index`; Stacy's notification naming `R` (a standards change: before→after and effective date); `node scripts/validate-steering-metadata.js` → no new errors.

---

## 12. Provenance

- **2026-09-30, the A round** (Thurgood + Stacy, `working.md`): A1–A4 converged at R2 and signed off by Stacy. It established the facts this ballot cites — meta `agentType` beside the transcript, the SHA in the seat's own transcript, the no-op lock skipping CI on lock-refreshing PRs (Stacy's finding, severity Low as recorded), U3's precondition #4.
- **2026-09-30, the MFA round** (`thurgood-mfa.md`, `stacy-mfa.md`): the charter `prompt_snapshot` as the only real "something you are" (check 1c); behavioral fingerprinting rejected as theatre on measured tool shapes; nonce, push-approval and HSM analogies rejected.
- **2026-09-30, consult 2** (Stacy, Thurgood, Lina, Kenya; rounds 1 and 2): the authorization rule. Round 1 split four ways (F, narrowed E, signer-keyed C, C); round 2 converged on the narrowed E with Lina's stale-list bound and Stacy's audit. Peter APPROVED it in direction the same day.
- **2026-09-30, the holistic round** (Thurgood, Stacy, Lina; R1 in parallel, Thurgood's R2 synthesis, Stacy's and Lina's R2): the chain, the instrument, J, the retirements. Stacy: RESIDUAL — the lookup rule, H2b, F12′, A4 before U2b merges (§§ 4.3, 4.5, 6.1 — adopted), plus check 4 per brief and the `pre-ratification observation` label (§§ 5.2, 6.4 — adopted). Lina: RESIDUAL — F13 (§ 4.5 — adopted); merge-only rule (§ 4.6); field fork withdrawn. Peter APPROVED the design with the residuals folded; drafting approved 2026-10-01.
- **Task 15's fan-out ran ungranted.** Its row named Thurgood (PRIMARY) and Lina (15.2); the C1 signing acts of 15.4 and 15.5 were done by unnamed seats, and every one was seat-correct with no out-of-list path. Stacy's finding: one Medium, against the plan; cause the author's drafting (Thurgood read the preamble's "outside every delegated-tier line" as authorization to sign, which the 09-26 ballot's clause 2 does not support). Thurgood is conflicted on its disposition; Peter ruled it.
- **The TCP decision (F-2)** is the drafter's, on the simulation recorded in § 11; Peter's item 1 asked for it to be decided and stated.

---

## 13. Review round record

*(Stacy R1 — required reviewer — pending.)*
