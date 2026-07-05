# Ballot Measure: The PR-Gated Task-Completion Workflow

**Date**: 2026-07-05 (v2 — revised same day after the review round; all feedback incorporated, none declined)
**Author**: Thurgood (Civitas steward)
**Origin**: Spec 125-A Task 1 (Req 3, Req 4.2, Req 1.4) — first planned use of the record-first ratification protocol (`.kiro/docs/ballots/README.md`)
**Status**: **RATIFIED (Peter, 2026-07-05)** — ratified unmodified, both strike-options resolved to their defaults: **Item 10 = MIGRATE** the Cursor rules file; **Item 1g = RENAME stands** (`complete-task.sh` + hard-fail tombstones). Ratification delivered directly to the main-loop session and committed here FIRST per the record-first protocol (`.kiro/docs/ballots/README.md`). **Law docs remain untouched at ratification by design** — application is Task 4's atomic window, gated behind Task 2 (tooling + PAT scopes + release-flow reconciliation) and Task 3 (branch protection), per the 125-A spec.
**Placement note**: Measure arises from a spec, so it lives as a spec artifact per the ballots README convention (precedent: 118 Task 11, 117 Task 6).

---

## Review Round Record

Per Spec-Feedback-Protocol stamp format. Resolutions are woven into the body; the measure below is the clean, post-incorporation state.

#### [STACY R1] — APPROVE-WITH-AMENDMENTS (process-quality; enumeration independently confirmed at FIFTEEN, no sixteenth; Items 2–3 before-texts verified verbatim; sweep auditability closed)
- AM-1 (she would hold ratification for this): surface #12 (`commit-task-organized.sh`) is invisible to the content pattern set — its only matching content is bare `git push`; filenames aren't content → Item 13 gains a scoped `git push` pattern + a filename sweep
- AM-2: the RECORDS class contains live instruction (~31 specs with unchecked tasks whose Post-Completion blocks instruct `commit-task.sh`) — safe only via 1g's tombstone; the dependency must be stated → Item 13 RECORDS bullet + Item 1g
- AM-3: undefined state — Peter reviews a green PR and requests changes instead of merging → 1d point 7
- AM-4: subtask push semantics undefined; recommends push-without-PR (converges with LINA 1) → 1a point 2 + Item 2a *(her historical premise corrected post-round — see [THURGOOD R3]; the rule stands)*
- AM-5: green-but-unmergeable (branch conflicts with an advanced `main`) uncovered → 1d point 8
- AM-6: squash-merge "default method" is convention — make it repo configuration → 1a point 6 (Task 3 SHALL configure squash-only)
- AM-7: consumer rollback guidance (`security-best-practices.md:365`, `environment-configuration-guide.md:556`) ends in `git push origin main` — dies in-repo post-Task-3 → Item 13 CONSUMER note + 1f cross-reference
- AM-8: sharpen the 1g strike cost for Peter (pass condition degrades from mechanical to judgment-dependent); she supports keeping the rename → 1g
- Watch item (for Task 5's bake-in ledger, not a ballot edit): the non-required analysis job succeeds silently where the old flow surfaced output at a human-visible moment → noted in 1e
- Compliance note: ratification is read as covering Item 11's exact-diff→behavioral-contract relaxation → Item 11 preamble
- 10b calibration: a deprecation header informs but does not disable; the real protection is the tombstone → Item 10b

#### [LINA R1] — NEEDS-CLARIFICATION (minor; consumer smoke read of Items 1–2; parent-task path CLEAN, executable first-try)
- Subtask commit mechanics undefined — the first step she'd hit in real work → resolved jointly with AM-4: 1a point 2, mirrored in Item 2a
- The `<spec>` token has three shapes in v1 (`125A` / `(125-A)` / "spec directory name") → canonical definition in 1b (spec ID in branch names + PR titles; full directory name in the PR body)
- Dependent-task branch base when the prior task's PR is unmerged (scaffold → platforms → demo chains) → explicit rule in 1a point 3 (wait-for-merge default; stacking only on Peter's explicit direction)

#### [THURGOOD R2] — incorporation notes
- All eleven items incorporated (Stacy AM-1–AM-8 plus three riders; Lina 1–3); none declined. AM-4 + LINA 1 written ONCE as 1a point 2 and mirrored in Item 2a's after-text, per the reviewers' convergence.
- 1d renumbered: the change-request state is inserted as point 7 and conflict handling folded into point 8; the checks-only-≠-ratification point is now 1d.9 — Item 14's per-criterion map updated to match.
- AM-2's dependency cuts both ways and is stated so in 1g and Item 13: the tombstones protect the RECORDS classification; under a struck 1g (same-name rework), the stale instructions invoke the new flow instead — safe by substitution.

#### [THURGOOD R3] — post-round correction (Peter, 2026-07-05)
- **AM-4's historical premise was wrong, and the v2 fold propagated it.** The old flow did NOT push subtask commits: per the outgoing Task-Completion-Protocol (verifiable in Item 2a's before-text — tests → completion doc → mark complete → STOP, no commit step), the commit+push hook fired at PARENT completion only; subtask work stayed local until the parent finished. Peter confirmed this against the written law.
- The resolved RULE stands unchanged (subtasks commit and push the branch; no PR until parent). Its justification in 1a.2 is rewritten forward-looking — branches remove the old reason not to push, off-machine backup, optional visibility, zero cost — and the rule is now explicitly recorded there as **AMENDED FROM THE OLD FLOW**: a deliberate process change Peter directed, not a preserved behavior.
- Folded with it: hook ergonomics stated as a Task 2 contract — one completion command, context-aware (subtask: commit+push branch; parent: commit+push+PR) — in 1a.2 and Item 11a.

---

## The Problem (evidence)

Spec 125-A puts a platform gate on `main` (branch protection, required checks, admins included — Req 1). The operational law still instructs every agent, in every runtime, to commit and push directly to `main` via `commit-task.sh`. The moment Task 3 lands, the platform will reject what the law instructs. This ballot rewrites the law so all surfaces move **atomically** with the tooling cutover (Task 4's window) — a half-migrated corpus tells agents two different completion flows.

**The enumeration has now been wrong three times.** Inbound-from-122 §3 counted eleven surfaces; Stacy's review found a twelfth (`.cursor/rules/designerpunk-core.mdc`); this ballot's draft-time re-grep (Req 3.1, mandatory) found **three more live surfaces plus one config surface** — including two *additional scripts that push to `main`* which no prior enumeration named. Hand lists are floors; the grep is the authority.

---

## Draft-Time Enumeration (fresh grep, 2026-07-05)

**Patterns run** (case-insensitive ERE; worktree copies under `.claude/worktrees/` excluded as stale duplicates):
- Literal: `commit-task`, `task-completion-commit`
- Residual: `push to main`, `push directly`, `direct(ly)? (push|commit)`, `commit directly`, `push origin main`, `single-branch workflow`

### Live instruction surfaces — LAW EDITS (exact before→after in this ballot)

| # | Surface | `commit-task` count | Residual hits |
|---|---------|--------------------|---------------|
| 1 | `.kiro/steering/Task-Completion-Protocol.md` (Layer 1, always-loaded) | 2 | — |
| 2 | `.kiro/steering/core-goals.md` (Layer 1, always-loaded) | 1 | 1 ("single-branch workflow on main") |
| 3 | `governance/Process-Development-Workflow.md` | 5 (+2 `task-completion-commit`) | 2 (lines 135, 259) |
| 4 | `governance/Process-Spec-Planning.md` | 4 | — |
| 5 | `governance/completion-documentation-guide.md` | 2 | — |
| 6 | `governance/Component-Development-Standards.md` | 1 | — |
| 7 | `governance/Process-File-Organization.md` | 2 | — |
| 8 | `governance/release-management-system.md` | 1 | — |
| 9 | `.cursor/rules/designerpunk-core.mdc` (Cursor runtime) | 1 (line 32) | — |

### Live tooling surfaces — behavioral contract here; as-built in Tasks 2/4

| # | Surface | Evidence |
|---|---------|----------|
| 10 | `.kiro/hooks/commit-task.sh` | 6 self-refs; delegates to #11; also hardcodes a fossil `TASKS_FILE` path (`fresh-repository-roadmap-refinement`) |
| 11 | `.kiro/hooks/task-completion-commit.sh` — **NEW FIND** | `git push origin main` at line 76; the helper `commit-task.sh` actually calls |
| 12 | `.kiro/hooks/commit-task-organized.sh` — **NEW FIND** | bare `git push` at line 156 (pushes current branch = `main` in current practice) |

### Live tooling-doc surfaces — rewrite contracts (Item 11)

| # | Surface | `commit-task` count |
|---|---------|--------------------|
| 13 | `.kiro/hooks/README.md` | 11 |
| 14 | `.kiro/hooks/analyze-after-commit-README.md` | 5 |
| 15 | `.kiro/hooks/task-completion-agent-hook.md` — **NEW FIND** | instructs agents: "Push to remote: `git push origin main`" (line 44) |

### Noted, non-migrating

- `.claude/settings.local.json` — 3 hits: stale per-task permission-allowlist entries (inert; grants for commands no longer run). Operational follow-up, not law: Task 4 verifies the new-flow commands are allowlistable. **Config, not instruction.**
- `package.json:137` (`postpublish` → `git push origin main`) — reconciled by Task 2 per Req 4.4; not a ballot law edit. Must be gone or restructured before Task 4's sweep runs.
- `scripts/diagnose-release-issues.js:422` — release-tool diagnostic guidance text (`git push origin ' + (branch || 'main')`); generic consumer guidance, branch-parameterized. Classified consumer-tool content; Task 2's release reconciliation confirms.
- **Historical records (explicitly left as records)**: `.kiro/specs/**` (~139 files referencing `commit-task`), `.kiro/audits/**` (3 files), `docs/specs/**` task summaries (3 files), `.kiro/docs/ballots/**` (quotes before-text by design).
- **Consumer/product docs (left unchanged)**: `docs/release-management/**`, `docs/examples/**` — release-tool tutorials with generic-repo examples (`owner/repo`); they instruct *consumer* repos, not this repo's law.

**Count history: 11 → 12 → 15 live surfaces (+1 config).** Third correction in three passes — direct support for ending application with a mechanical sweep (Item 13), not trust in this table. *Independently re-verified in review (Stacy): fifteen confirmed, no sixteenth found.*

---

## Considered Alternative (counter-argument)

**Keep direct-commit and enforce via local pre-push hooks instead.** Rejected: local hooks are advisory on the machine that has them and absent everywhere else — exactly the authored-but-unarmed pattern 125 exists to end. **PR-per-subtask** was also considered (maximal gate coverage) and rejected: it multiplies Peter's merge load ~4× with no authorization value (subtask stop-and-wait already exists), and the parent task is the unit current law commits to `main` — the PR-per-parent-task flow preserves the one-main-commit-per-task shape release analysis scans.

---

## Item 1 — The Workflow Law (the flow itself)

This section is the normative content the surface edits below carry. It becomes law verbatim where Item 2 places it.

### 1a. The flow

Branch → PR → required checks → merge.

1. Work happens on a **task branch**, never on `main`. The branch is created at the task's first subtask (or at task start): plain `git switch -c task/<spec>-<N>-<slug>`, or the completion tooling's equivalent (a Task 2 contract).
2. **Subtask mechanics** (one rule — commit method, push semantics, branch creation, PR timing): subtasks commit with **plain git on the task branch and push the branch**. No PR opens and no required checks fire until parent completion; subtasks do NOT open PRs.
   **AMENDED FROM THE OLD FLOW — a deliberate process change (Peter, 2026-07-05), not a carry-over.** Under the outgoing law, subtasks had NO commit/push step at all: the commit+push hook fired at PARENT completion only, so subtask work stayed local until the parent finished (verifiable in Item 2a's before-text). Subtask commits-and-pushes are NEW behavior, justified forward-looking: (a) branches remove the old reason not to push — nothing lands on `main`; (b) a pushed branch is off-machine backup of in-progress work; (c) optional visibility for Peter on GitHub; (d) zero cost — pre-PR branch pushes trigger no pull_request workflows, and post-PR pushes re-running checks is already the 1d.7/1d.8 resume path.
   **Hook ergonomics preserved (a Task 2 contract)**: one completion command, context-aware — invoked for a subtask it commits and pushes the branch (no PR); invoked for parent completion it commits, pushes, and opens the PR (Item 11a).
3. **Dependent tasks branch from `main` after the prior task's PR merges.** Starting a dependent task before the prior merge is not sanctioned by default — this composes with stop-and-wait (Peter's go for the next task typically follows his merge of the prior one), so the wait costs nothing in practice. Exception, only on Peter's explicit direction: branch from the prior task branch and declare `Stacked-on: #<PR>` in the PR body; stacked PRs merge in base-first order.
4. At parent-task (or standalone-task) completion, the tooling commits, pushes the branch, **opens a PR**, and reports the PR URL.
5. Required checks run on the PR. A failing check blocks merge at the platform (Req 1.2).
6. **Peter merges on green** (see 1c). **Squash-merge is the ONLY merge method — Task 3 SHALL configure the repository to allow squash-merge only** (one settings checkbox; method drift closed by configuration, not convention). The PR collapses to one commit on `main`, preserving the atomic-commit-per-task history the release tool scans; the PR title becomes the commit subject.
7. Direct pushes to `main` are rejected by branch protection, **admins included** (Req 1.1).

### 1b. Branch and PR conventions (agent PRs identifiable and traceable)

- **The `<spec>` token, defined once**: everywhere in this law, `<spec>` is the **spec ID** — the leading identifier segment of the spec directory name (`125-A` from `125-A-pr-gate-mechanical-arming`; `052` from `052-badge-count-base`). Branch names and PR titles use the spec ID; the PR body's `Spec:` field carries the full directory name.
- **Branch names**: `task/<spec>-<task-number>-<short-slug>` for spec tasks (e.g., `task/125-A-2-commit-task-rework`, `task/052-4-web-implementation`); `fix/<slug>` or `chore/<slug>` for non-spec work.
- **PR title** = the commit-message standard, spec-suffixed: `Task <N> Complete: <Description> (<spec>)` (e.g., `Task 2 Complete: Rework task tooling for PR flow (125-A)`). Because squash-merge makes the title the commit subject, title discipline IS commit-message discipline.
- **PR body** MUST carry: `Spec:` (spec directory name), `Task:` (task number + name), `Agent:` (authoring agent, or `Peter` for human-direct work), path(s) to the completion doc(s) on the branch, and a one-line validation note (which tier/commands ran locally).

### 1c. The merge rule (Req 4.2, as ratified in the spec review)

- **Agents open PRs; Peter merges on green** during bake-in (Task 5's gate). Agents NEVER merge their own PRs and NEVER push to `main`.
- Any later **delegation of merge-on-green must be a recorded rule** (ballot or committed record with date and scope) — never a verbal grant. The relayed-authority lesson: authority is a record.
- **Standing carve-out, surviving any delegation**: PRs touching governance law (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts/configs) stay Peter-merged — the closest ratification proxy until 125-B's CODEOWNERS layer.

### 1d. Completion state (Req 3.6 — the load-bearing definition)

> **A task is complete at MERGE, not at PR-open.** The PR is the submission; the merge is the acceptance.
>
> 1. The agent finishes the work and runs tier-appropriate validation locally.
> 2. Completion documentation (and the summary doc, for parent tasks) is written **on the task branch** — it traverses the gate with the work it documents.
> 3. The agent marks the task complete (`taskStatus` tool / tasks.md checkbox) **on the branch, before opening the PR** — the status change is part of the work product and lands atomically with it. Until merge, that status is an assertion awaiting acceptance, not a fact about `main`.
> 4. The agent opens the PR, **reports the PR URL, and STOPS.** Opening a PR is submission for authorization, not completion.
> 5. **Peter's merge is the authorization act.** It accepts the work AND its completion claim into `main` in one platform-verified action — merging IS the acknowledgment the old flow's completion report asked for.
> 6. **Stop-and-wait composes unchanged**: authorization to START the next task remains a separate, explicit grant (Start Up Tasks #3). A merge accepts the finished task; it does not, by itself, instruct the agent to begin the next one. Direction for what follows typically arrives with or after the merge; absent it, the agent remains stopped.
> 7. **A change request is authorization to resume, not a completion.** If Peter reviews the PR and requests changes instead of merging, the change request authorizes the agent to resume on that branch: fix, push, re-report the PR URL, and STOP again.
> 8. If required checks fail, the task is not complete and not mergeable: fix on the same branch. If the PR is green but unmergeable (the branch conflicts with an advanced `main`), update the branch from `main` on the same branch. Every push re-runs the checks.
> 9. **A checks-only merge is NOT ratification** (Req 3.7). For governance-law changes, the record-first ballot protocol (`.kiro/docs/ballots/README.md`) remains the ratification mechanism throughout 125-A — the gate verifies mechanics, not authority. PR-approval-as-ratification arrives with 125-B's CODEOWNERS layer.

### 1e. Release-analysis relocation (Req 3.5 — decision)

**Release analysis moves to post-merge on `main`.** Rationale: the analysis answers "what has accumulated on the release line since the last release" by scanning summary docs via git log — its correct input is merged history. A branch-side run would count unmerged work and re-count on every push; PR-open-side placement measures a claim, merge-side placement measures a fact. Mechanism (Task 2 implements; the ballot fixes placement and semantics, not plumbing): a **non-required** workflow job triggered on push to `main` runs `release:analyze` and surfaces output in the run summary — non-blocking and informational, preserving the current fails-silently semantics. On-demand `npm run release:analyze` remains for local detail. The completion tooling itself no longer runs analysis (its `--no-analyze` flag retires with it).

**Bake-in watch item (for Task 5's findings ledger; not a ballot edit)**: the old flow surfaced analysis output at a human-visible moment (the completion terminal); a non-required job succeeds silently. Bake-in should watch whether post-move analysis output is ever actually consulted — if it never is, output surfacing (e.g., a release-PR comment) is a 125-B candidate.

### 1f. Emergency procedure (Req 1.4)

When the gate must be bypassed (broken gate, urgent fix the checks themselves block): **Peter temporarily lifts branch protection in Settings → Branches, performs the change, re-enables protection immediately, and logs the use in 125-A's findings ledger** with entry type `EMERGENCY-BYPASS`: date, reason, what was pushed, protection-off duration, and the follow-up PR if the change needs regularizing. No agent may request the lift as a convenience path; repeated use of the emergency path for non-emergencies is itself a findings-ledger entry.

**In-repo rollback is not exempt**: rollback procedures illustrated in the release-tool consumer docs end in `git push origin main` (see Item 13, CONSUMER DOCS) — valid for consumer repos, rejected in this repo post-Task-3. An in-repo rollback traverses a PR or this emergency path.

### 1g. Tooling rename (reviewer-strikeable drafting decision)

The reworked completion script is **renamed `./.kiro/hooks/complete-task.sh`**; `commit-task.sh` becomes a hard-fail tombstone (prints "the direct-commit flow was retired by ballot <date>; use complete-task.sh" and exits 1 — never silently forwards, per Req 4.3's no-silent-fallback rule). Rationale: a script named "commit-task" that opens PRs lies in its name; after rename, any surface still instructing `commit-task.sh` is *mechanically identifiable as stale*, and the ~139 historical references stay truthful (they named the old behavior).

**The tombstones are load-bearing, not dead code**: ~31 specs with unchecked tasks still carry Post-Completion blocks instructing `commit-task.sh` (see Item 13, RECORDS) — the hard-fail redirect is what keeps those stale paths disarmed. They stay until the last pre-gate spec closes; a future cleanup that deletes them as "unused" re-arms 31 stale instruction paths.

**If struck**: substitute `commit-task.sh` for `complete-task.sh` throughout this ballot's after-texts (stale in-flight instructions then invoke the new flow — safe by substitution rather than by redirect). **Strike cost, stated plainly**: striking the rename degrades Item 13's pass condition from **mechanical** (zero literal `commit-task` hits in MIGRATE scope) to **per-hit human judgment** about whether each remaining hit means old or new behavior — in the spec whose thesis is ending judgment-dependent guards. Review position (Stacy): keep the rename.

---

## Item 2 — `.kiro/steering/Task-Completion-Protocol.md` (Layer 1 — the law's home)

**2a. Sequence: subtasks.** Before:
```markdown
### For SUBTASKS
1. [ ] Run targeted tests relevant to the change (not the full suite)
2. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-M-completion.md`
3. [ ] Mark subtask complete (use the `taskStatus` tool)
4. [ ] **STOP** and wait for user authorization
```
After:
```markdown
### For SUBTASKS
1. [ ] Run targeted tests relevant to the change (not the full suite)
2. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-M-completion.md`
3. [ ] Mark subtask complete (use the `taskStatus` tool)
4. [ ] Commit with plain git on the task branch and push the branch (`task/<spec>-<N>-<slug>`, created at the first subtask — `git switch -c` or the completion tooling's equivalent). Pushing gives subtask-level visibility and backup; no PR opens and no required checks fire until parent completion. Subtasks do NOT open PRs. Never commit to `main`.
5. [ ] **STOP** and wait for user authorization
```

**2b. Sequence: parent (Implementation or Architecture).** Before:
```markdown
### For PARENT TASKS (Implementation or Architecture type)
1. [ ] Run full validation (`npm test`) — see Start Up Tasks for test-command selection
2. [ ] Mark parent task complete (use the `taskStatus` tool) **AFTER** validation passes
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md`
4. [ ] Create summary doc: `docs/specs/[spec]/task-N-summary.md`
5. [ ] Commit changes: `./.kiro/hooks/commit-task.sh "Task N Complete: Description"` (runs release analysis automatically)
6. [ ] **STOP** and wait for user authorization
```
After:
```markdown
### For PARENT TASKS (Implementation or Architecture type)
1. [ ] Run full validation (`npm test`) — see Start Up Tasks for test-command selection
2. [ ] Mark parent task complete (use the `taskStatus` tool) **AFTER** validation passes — the status change commits with the work and takes effect at merge
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md` (on the task branch)
4. [ ] Create summary doc: `docs/specs/[spec]/task-N-summary.md` (on the task branch)
5. [ ] Open the task PR: `./.kiro/hooks/complete-task.sh "Task N Complete: Description (<spec>)"` — commits, pushes the branch, opens the PR, reports the PR URL (release analysis runs post-merge on `main`)
6. [ ] **STOP** — report the PR URL and wait. **The task is complete when Peter merges** (merge on green = the authorization act). Never merge your own PR; never push to `main`.
```

**2c. Sequence: parent (Setup or Documentation).** Before:
```markdown
### For PARENT TASKS (Setup or Documentation type)
1. [ ] Verify artifacts created/updated as specified
2. [ ] Mark parent task complete (use the `taskStatus` tool)
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md`
4. [ ] Create summary doc: `docs/specs/[spec]/task-N-summary.md`
5. [ ] Commit changes: `./.kiro/hooks/commit-task.sh "Task N Complete: Description"` (runs release analysis automatically)
6. [ ] **STOP** and wait for user authorization
```
After:
```markdown
### For PARENT TASKS (Setup or Documentation type)
1. [ ] Verify artifacts created/updated as specified
2. [ ] Mark parent task complete (use the `taskStatus` tool)
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md` (on the task branch)
4. [ ] Create summary doc: `docs/specs/[spec]/task-N-summary.md` (on the task branch)
5. [ ] Open the task PR: `./.kiro/hooks/complete-task.sh "Task N Complete: Description (<spec>)"` — commits, pushes the branch, opens the PR, reports the PR URL (release analysis runs post-merge on `main`)
6. [ ] **STOP** — report the PR URL and wait. **The task is complete when Peter merges** (merge on green = the authorization act). Never merge your own PR; never push to `main`.
```

**2d. New section** — insert between "## The Sequence by Task Scope" and "## Tier Selection", titled `## Completion State in the PR Flow`, containing: Item 1a's flow (points 1–7, including the subtask mechanics and the dependent-task branching rule) and Item 1d's definition verbatim (as body text, not quote), followed by Item 1b's branch/PR conventions and Item 1c's merge rule as subsections, and Item 1f's emergency procedure (including the in-repo rollback note) as a final subsection.

**2e. Key Rules.** Before:
```markdown
- **Implementation / Architecture tasks**: validation MUST pass before marking complete.
- **All parent tasks**: create BOTH the completion doc AND the summary doc.
- **All tasks**: STOP after completion — never auto-proceed to the next task. Authorization to START the next task is governed by Start Up Tasks.
- **Parent vs. subtask** is the load-bearing distinction: subtasks get targeted tests + a completion doc; parents get full validation + completion doc + summary doc + commit.
```
After:
```markdown
- **Implementation / Architecture tasks**: validation MUST pass before marking complete.
- **All parent tasks**: create BOTH the completion doc AND the summary doc, on the task branch.
- **All tasks**: STOP after completion — never auto-proceed to the next task. Authorization to START the next task is governed by Start Up Tasks; the merge that completes this task is not that authorization.
- **Parent vs. subtask** is the load-bearing distinction: subtasks get targeted tests + a completion doc + a branch commit; parents get full validation + completion doc + summary doc + a PR.
- **A task is complete at MERGE.** Agents open PRs; Peter merges on green. Never merge your own PR; never push to `main` (branch protection rejects it, admins included).
- **A checks-only merge is NOT ratification**: governance-law changes still ratify via the record-first ballot protocol (`.kiro/docs/ballots/README.md`).
```

*(Purpose-line metadata: append "PR flow" to the doc's `**Purpose**:` field; `Last Reviewed` bumps at application per Item 14.)*

---

## Item 3 — `.kiro/steering/core-goals.md`

**3a.** Before:
```markdown
- Use hook system: `./.kiro/hooks/commit-task.sh "Task Name"`
- Repository: https://github.com/3fn/DesignerPunkv2 (single-branch workflow on main)
```
After:
```markdown
- Complete tasks via the PR flow: `./.kiro/hooks/complete-task.sh "Task Name"` opens the task PR; Peter merges on green — the merge is the authorization act (see Task-Completion-Protocol)
- Repository: https://github.com/3fn/DesignerPunkv2 (PR-gated workflow: branch protection on `main`, admins included)
```

---

## Item 4 — `governance/Process-Development-Workflow.md`

**4a. Standard Process, steps 6–7 (line 85 area).** Before:
```markdown
6. **[MANUAL]** **Commit Changes**: Run `./.kiro/hooks/commit-task.sh "Task Name"` to automatically commit, push, and run release analysis
7. **[MANUAL]** **Verify on GitHub**: Confirm changes appear in repository with correct commit message
```
After:
```markdown
6. **[MANUAL]** **Open the Task PR**: Run `./.kiro/hooks/complete-task.sh "Task Name"` to commit on the task branch, push, and open the PR; report the PR URL and STOP
7. **[MANUAL]** **Merge = completion**: Peter merges on green — the merge accepts the work into `main` (no separate GitHub verification step; the merged PR is the verification). Release analysis runs post-merge on `main`.
```

**4b. Alternative Process, steps 3–5 (lines 116–118).** Before:
```markdown
3. **Commit Changes**: Run `./.kiro/hooks/commit-task.sh "Task Name"` to automatically commit and push
4. **Verify on GitHub**: Confirm changes appear in repository with correct commit message
5. **[OPTIONAL]** **Release Analysis**: Run `npm run release:analyze` if you want detailed release analysis beyond what commit-task.sh provides
```
After:
```markdown
3. **Open the Task PR**: Run `./.kiro/hooks/complete-task.sh "Task Name"` to commit on the task branch, push, and open the PR
4. **Merge = completion**: Peter merges on green; the merged PR is the verification
5. **[OPTIONAL]** **Release Analysis**: Run `npm run release:analyze` for detailed local analysis (the standing analysis runs post-merge on `main`)
```

**4c. Git Practices (lines 134–137).** Before:
```markdown
- **Repository**: https://github.com/3fn/DesignerPunkv2
- **Branch**: All work on `main` branch (single-branch workflow for now)
- **Commits**: Atomic commits per task completion with descriptive messages
- **Push**: Always push immediately after commit to maintain synchronization
```
After:
```markdown
- **Repository**: https://github.com/3fn/DesignerPunkv2
- **Branch**: All work on task branches (`task/<spec>-<N>-<slug>`); `main` is protected — direct pushes are rejected, admins included
- **Commits**: Atomic commits per subtask on the branch; squash-merge yields one `main` commit per task with the PR title as its subject
- **PRs**: Title = `Task <N> Complete: <Description> (<spec>)`; body carries Spec / Task / Agent / completion-doc path / validation note
```

**4d. Hook System Usage (lines 170–171, 177–180).** Before:
```markdown
- **`.kiro/hooks/commit-task.sh`**: Simple wrapper for task completion commits
- **`.kiro/hooks/task-completion-commit.sh`**: Full automation script with message extraction
```
After:
```markdown
- **`.kiro/hooks/complete-task.sh`**: Task-completion PR tooling — branch, commit, push, PR-open, URL report
```
Before:
```markdown
# Standard task completion commit
./.kiro/hooks/commit-task.sh "1. Create North Star Vision Document"

# For different specs or custom task files
./.kiro/hooks/task-completion-commit.sh path/to/tasks.md "Task Name"
```
After:
```markdown
# Standard task completion — opens the task PR
./.kiro/hooks/complete-task.sh "Task N Complete: Description (spec)"
```

**4e. Quick Reference — Error Recovery (lines 258–260).** Before:
```markdown
- If commit fails: Fix issues and re-run hook script
- If push fails: Run `git push origin main` manually
- If wrong message: Use `git commit --amend -m "Correct Message"` then force push
```
After:
```markdown
- If commit fails: Fix issues and re-run the tooling
- If push fails: Push the TASK BRANCH manually (`git push -u origin <branch>`) — never `main`
- If the PR title is wrong: Edit the PR title on GitHub (squash-merge takes the title as the commit subject)
```

---

## Item 5 — `governance/Process-Spec-Planning.md`

**5a + 5b. Task-template Post-Completion blocks (lines ~469 and ~572 — two occurrences, same shape).** Before (occurrence 1):
```markdown
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Build System Foundation"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes
```
After:
```markdown
  - Open the task PR: `./.kiro/hooks/complete-task.sh "Task 1 Complete: Build System Foundation (spec)"` — report the PR URL and STOP; complete at merge
```
Before (occurrence 2):
```markdown
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Token Generation System"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes
```
After:
```markdown
  - Open the task PR: `./.kiro/hooks/complete-task.sh "Task 5 Complete: Token Generation System (spec)"` — report the PR URL and STOP; complete at merge
```

**5c. Release Analysis note (~line 2247).** Before:
```markdown
**Release Analysis**: The release tool (`src/tools/release/`) scans summary documents via git log to generate release notes. `commit-task.sh` runs release analysis automatically after each commit.
```
After:
```markdown
**Release Analysis**: The release tool (`src/tools/release/`) scans summary documents via git log to generate release notes. Release analysis runs post-merge on `main` (non-blocking); run `npm run release:analyze` for on-demand detail.
```

**5d. Execution steps 6–7 (~line 2491).** Before:
```markdown
6. **Commit changes**: Run `./.kiro/hooks/commit-task.sh "Task Name"` to commit and push
7. Verify all validation checks passed before moving to next task
```
After:
```markdown
6. **Open the task PR**: Run `./.kiro/hooks/complete-task.sh "Task Name"` — commit on the task branch, push, open the PR, report the URL, STOP
7. The task completes at merge (Peter merges on green); required checks must pass on the PR before it is mergeable
```

---

## Item 6 — `governance/completion-documentation-guide.md`

**6a. Automatic Analysis (~line 291).** Before:
```markdown
`commit-task.sh` runs release analysis automatically after each task commit. For on-demand analysis:
```
After:
```markdown
Release analysis runs post-merge on `main` (non-blocking). For on-demand analysis:
```

**6b. Parent checklist (~line 354).** Before:
```markdown
- [ ] Commit changes: `./.kiro/hooks/commit-task.sh "Task N Complete: Description"`
- [ ] STOP and wait for user authorization
```
After:
```markdown
- [ ] Open the task PR: `./.kiro/hooks/complete-task.sh "Task N Complete: Description (<spec>)"` — completion and summary docs travel on the branch
- [ ] STOP — report the PR URL and wait; the task is complete when Peter merges
```

---

## Item 7 — `governance/Component-Development-Standards.md`

**7a (~line 1124).** Before:
```markdown
2. **Commit Changes**: `./.kiro/hooks/commit-task.sh "Task N Complete: Description"` (runs release analysis automatically)
```
After:
```markdown
2. **Open the Task PR**: `./.kiro/hooks/complete-task.sh "Task N Complete: Description (<spec>)"` — complete at merge; release analysis runs post-merge on `main`
```

---

## Item 8 — `governance/Process-File-Organization.md`

**8a (~line 197).** Before:
```markdown
- AI workflows: `commit-task.sh` runs release analysis automatically after commit
```
After:
```markdown
- AI workflows: release analysis runs post-merge on `main` (summary docs traverse the PR gate with the work)
```

**8b (~line 391).** Before:
```markdown
# .kiro/hooks/commit-task-organized.sh "Task Name" [--organize]
```
After:
```markdown
# .kiro/hooks/complete-task.sh "Task Name" [--organize]   (organization option folded into the PR-flow tooling)
```
*(Conditional on Item 11c's disposition of `commit-task-organized.sh`; if reviewers strike the fold-in, this block becomes a removal of the example.)*

---

## Item 9 — `governance/release-management-system.md`

**9a (~line 85).** Before:
```markdown
`commit-task.sh` runs `release:analyze` after each task commit (non-blocking, fails silently). This provides immediate feedback on accumulated change significance. Skip with `--no-analyze` flag.
```
After:
```markdown
`release:analyze` runs post-merge on `main` (non-blocking, informational) — merged history is the analysis's correct input. Run `npm run release:analyze` locally for on-demand detail.
```

---

## Item 10 — `.cursor/rules/designerpunk-core.mdc` ⚠️ RATIFIER STRIKE-OPTION

Included per the main-loop recommendation: the file is demonstrably maintained (121 swept it; 119-A updated its sibling). **Peter decides migrate-vs-deprecate at ratification.**

**10a. Migrate (default).** Before (line 32):
```markdown
- Follow hook system: `./.kiro/hooks/commit-task.sh "Task Name"`
```
After:
```markdown
- Complete tasks via the PR flow: `./.kiro/hooks/complete-task.sh "Task Name"` opens the task PR; the task is complete when Peter merges — never push to `main`
```

**10b. If struck (deprecate)**: 10a does not apply; instead insert at the top of the file, immediately after any frontmatter:
```markdown
> **DEPRECATED (2026-07-XX, ballot 125-A Task 1)**: Cursor is not a maintained DesignerPunk runtime. This file is retained as a record and no longer tracks current law — the task-completion flow described below is retired. Canonical law: `.kiro/steering/Task-Completion-Protocol.md`.
```

*Calibration*: a Cursor agent still loads line 32 beneath a deprecation header — the header informs, it does not disable. 10b's real protection is defense-in-depth: the instructed command is an Item 1g tombstone and hard-fails with the redirect.

---

## Item 11 — Tooling + tooling docs (behavioral contracts; as-built lands in Tasks 2/4)

Exact line-level diffs for these surfaces would pin text that Task 2's implementation determines; per the review's Tier-2 framing, their SHALLs are stated at surface level and verified at application by the behavioral contract plus the Item 13 sweep.

**Compliance note**: ratification of this ballot is read as covering this Item's relaxation from exact before→after diffs to behavioral contracts for the tooling surface class — stated here so the relaxation is itself ratified, not assumed.

**11a. `complete-task.sh` (rework of `commit-task.sh` + `task-completion-commit.sh`) SHALL** be **context-aware — one completion command, two behaviors** (the 1a.2 ergonomics contract): invoked for a **subtask**, it creates the task branch if absent (from current state), commits, and pushes the branch — no PR; invoked for **parent completion**, it creates the branch if absent, commits, pushes the branch, opens a PR per Item 1b's conventions, and reports the PR URL. In both modes it SHALL **fail with an actionable message when credentials are missing/under-scoped — NEVER fall back to direct push** (Req 4.3), and SHALL NOT push to `main`, merge, or run release analysis. Mode selection mechanics (flag vs. tasks.md introspection) are Task 2's decision. The fossil hardcoded `TASKS_FILE` path is removed in the rework. `commit-task.sh` and `task-completion-commit.sh` become hard-fail tombstones per Item 1g.

**11b. `task-completion-agent-hook.md` — DEPRECATE**: the auto-commit-and-push-on-task-completion concept is structurally incompatible with the gate (its instruction block tells agents `git push origin main`). Insert a dated deprecation header (same form as 10b) pointing to Task-Completion-Protocol; the file is retained as a record.

**11c. `commit-task-organized.sh`**: its `--organize`/`--validate-metadata` options fold into `complete-task.sh` as flags (recommended), or the script is tombstoned with its organization function deferred to `organize-by-metadata.sh` standalone use. Task 2 decides mechanics; either way it SHALL NOT push (its bare `git push` at line 156 is removed).

**11d. `.kiro/hooks/README.md`** SHALL be rewritten so no section instructs the direct-commit flow: the completion-tooling sections (1, 2, and "Enhanced Task Commit") are replaced by documentation of `complete-task.sh` (usage, conventions per Item 1b, failure modes), and the tombstones are listed as retired. Verified by the Item 13 sweep returning zero instruction-class hits in this file.

**11e. `.kiro/hooks/analyze-after-commit-README.md`** SHALL be updated (or deprecation-headed, Task 2's call) to describe the post-merge-on-`main` analysis placement (Item 1e); all `commit-task.sh`-integration instructions are removed or marked historical.

---

## Item 12 — Prune-with-arm splits (Req 3.4) — SEED ENTRIES FOR 125-B

**These are handoff records for 125-B's classification map, NOT ratified map rows.** They record where this ballot shifted prose from instruction (*what*) to context (*why/when*) because the barrier now owns the what — plus one forward split that does NOT apply yet.

| Seed | The *what* | Owned by | Prose disposition (this ballot) |
|------|-----------|----------|--------------------------------|
| S-1 | No direct pushes to `main` | Branch protection, admin-inclusive (Task 3) | Imperatives like "push to main"/"single-branch workflow" replaced by context: `main` is protected; work travels via PRs (Items 3a, 4c) |
| S-2 | Post-commit synchronization + GitHub verification | The PR flow itself (a PR exists because the branch is pushed; the merged PR is the verification) | "Always push immediately" and "Verify on GitHub" steps deleted/replaced with "merge = verification" context (Items 4a, 4b, 5a/5b, 5d) |
| S-3 | Release-analysis execution | Post-merge job on `main` (Item 1e; Task 2) | "commit-task.sh runs analysis" instructions become context describing where analysis runs (Items 4a, 5c, 6a, 8a, 9a) |
| S-4 **(forward — NOT applied in Phase 0)** | "Run `npm test` before marking complete" | Phase 1a's required functional lanes (Task 8) | Stays **instruction** in this ballot (the Phase 0 gate does not run tests); when Task 8 promotes the lanes, the local run shifts to fast-feedback context — 125-B classifies |
| S-5 **(forward — NOT applied)** | PR-title/commit-subject format compliance | Not mechanically owned (convention only) | Stays instruction (Item 1b); a title-lint check is a 125-B warn→fail candidate |

---

## Item 13 — Residual-sweep specification (Req 3.1 — application ends with this, mechanically)

**Pattern set** (case-insensitive ERE, run over the whole repo):
```
commit-task
task-completion-commit
push to main
push(es|ed|ing)? directly
direct(ly)? (push|commit)
commit(s|ted|ting)? directly( to main)?
push origin main
single-branch workflow
\bgit push\b        # executable surfaces only: .kiro/hooks/**, scripts/**
```

**Filename sweep** (content patterns cannot see filenames — the lesson of surface #12, whose only content-level hit is a bare `git push`): `find . \( -name "*commit-task*" -o -name "*task-completion*" \)` under the same exclusions. Every filename hit must be a rename target, a tombstone, or a classified record — zero unclassified names.

**Scope split (the auditable classification):**
- **MIGRATE (must be zero instruction-class hits after application)**: `.kiro/steering/**`, `governance/**`, `.kiro/hooks/**` (docs and non-tombstone scripts), `.cursor/rules/**` (unless Item 10 struck → deprecation header instead), `CLAUDE.md`, `.kiro/agents/**`, `.claude/agents/**`, `.claude/commands/**`, root-level readme-class docs.
- **RECORDS (explicitly left, listed not edited)**: `.kiro/specs/**` (~139 files referencing `commit-task` — completion history), `.kiro/audits/**`, `docs/specs/**`, `.kiro/docs/ballots/**` (quotes before-text by design), tombstone scripts' own error text, deprecation-headed files below their header. **Live-instruction dependency (load-bearing)**: this class is NOT purely historical — ~31 specs with unchecked tasks (in-flight among them: 119-A with 37 unchecked, 106, 114, 101, 102, and 125-A's own tasks.md) carry Post-Completion blocks that still instruct `commit-task.sh`. Leaving them is safe ONLY because Item 1g's tombstones hard-fail and redirect (or, under a struck 1g, because the same-name rework makes the stale instruction invoke the new flow). The tombstones therefore stay until the last pre-gate spec closes — do not delete them as dead code (see 1g).
- **CONSUMER DOCS (left, classified)**: `docs/release-management/**`, `docs/examples/**`, `scripts/diagnose-release-issues.js` — release-tool guidance for consumer repos, not this repo's law. **Note**: `docs/release-management/security-best-practices.md:365` and `environment-configuration-guide.md:556` illustrate rollback ending in `git push origin main` — valid for consumer repos, rejected in THIS repo post-Task-3; in-repo rollback traverses a PR or the Item 1f emergency path (cross-referenced there).
- **RECONCILED ELSEWHERE**: `package.json` `postpublish` (Req 4.4 / Task 2 — must already be restructured by sweep time); `.claude/settings.local.json` (inert stale allowlist entries; Task 4 confirms new-flow commands allowlisted).
- **EXCLUDED**: `.git/`, `node_modules/`, `.claude/worktrees/**` (stale working copies).

**Pass condition**: every hit carries exactly one classification above; **zero unclassified hits and zero instruction-class hits in MIGRATE scope**. The sweep output (per-file counts + classifications) is recorded in Task 4's completion doc; Thurgood's cross-surface consistency check reviews it (Req 3.3).

---

## Item 14 — Application mechanics (record-first)

1. **No edit before the record**: this ballot's Status is updated to `RATIFIED (Peter, <date>)` and **committed** before any law edit is applied (Req 3.2; ballots README protocol). Any applying agent verifies the committed RATIFIED status — nothing else — before applying.
2. All Items apply **in Task 4's atomic window**, together with Task 2's script cutover (T-A9): law and tooling flip in one landing. Edit discipline per the ballots README: exactly as written; a before-text mismatch stops on that block and is reported, never adapted silently.
3. Post-edit: bump `Last Reviewed` on all touched steering/governance docs; `scripts/validate-steering-metadata.js` passes; docs MCP `rebuild_index` runs and reports healthy (Items 2–9 touch MCP-served and always-loaded docs).
4. The Item 13 sweep runs and passes; its record lands in Task 4's completion doc.
5. **Tier 2 per-criterion verification plan** (SHALLs at surface level): for each Item 2–11 surface — before-text matched exactly (or contract met, for Item 11's tooling class); after-text present; no `commit-task`/direct-push instruction remains in that file (sweep, per-file). For Item 1's flow law: Req 3.5 (1e present), 3.6 (1d present verbatim in Task-Completion-Protocol via 2d), 3.7 (1d.9 + 2e), 4.2 (1c), 1.4 (1f) — each checked off against the ratified text at application time. Task 3 additionally carries 1a.6's squash-only repository configuration.
6. Seed entries (Item 12) are handed to 125-B via Task 9's inbound note — recorded there as unratified handoff records.

---

## Item 15 — Review path (status: review round COMPLETE)

Roster rationale (as proposed and executed): the 125-A spec review (Thurgood lead + Stacy) already adjudicated the requirements this ballot encodes; the ballot's *new* content is the drafted law text and the enumeration. Ada not requested (no token content; her conjunctive-criterion caution already honored in Task 1's corrected Tier-2 grounds); Lina proxied the consumer read for the product agents.

- **Author**: Thurgood (v1 2026-07-05; v2 same day incorporating all review feedback — none declined)
- **Stacy** (required, process-quality): **APPROVE-WITH-AMENDMENTS** — AM-1–AM-8 plus three riders, all incorporated (see Review Round Record). Independently confirmed the enumeration at fifteen (no sixteenth); verified Items 2–3 before-texts verbatim; sweep auditability closed.
- **Lina** (consumer smoke read, Items 1–2): **NEEDS-CLARIFICATION (minor)** — all three items resolved in this revision (subtask mechanics → 1a.2/2a; canonical `<spec>` token → 1b; dependent-task branching → 1a.3). Parent-task path judged executable first-try.
- **Remaining step**: **Peter ratifies, modifies, or rejects** — with two explicit decision points: the **Item 10 strike-option** (Cursor migrate-vs-deprecate; 10b calibration noted) and the **Item 1g rename** (strikeable to same-name rework; strike cost stated in 1g — review position supports keeping it).

---

*Drafted by Thurgood, 2026-07-05, per Spec 125-A Task 1; revised same day (v2) after the review round. Law docs untouched. Nothing herein is applied until the committed Status reads RATIFIED.*
