# Wave 1 (Task 5.2) — Assessment: Rules, Clause Scoring, Candidate Diff, Trial Rubric

**Date**: 2026-08-02 (REVISED same day per the Stacy consult — all consult items folded; revision log in §7)
**Wave**: 1 of 4 (workflow-gate territory) — executes tasks.md 5.W verbatim; fill slots per 5.2
**Rules**: C1 (never-commit/push-to-`main`; work lands via PR), C2 (squash-merge-only), C3 (typecheck/build green before merge)
**Step**: 5.W(a) — classification + candidate prune diff. NOTHING in this document is a prune; the diff is a CANDIDATE, consumed unchanged by (b)'s trial and applied only as ratified in (c).

---

## 1. Gates that own each rule's *what* (verified live)

| Rule | Gate | Mechanical since | Verification |
|------|------|------------------|--------------|
| C1 | Branch protection on `main`, admins included; PRs are the only landing path | 2026-07-05 (125-A) | Read live from branch protection this pass; admin-rejection proven in 125-A records. **Precision (consult fix)**: the gate rejects the PUSH — a LOCAL commit on `main` is not prevented, it is made non-durable and detected at push; the retained prose routes commits to a branch at TCP:40 ("commit AND push the unit branch… `git switch -c`") and TCP:73 ("Work happens on a task branch, never on `main`") |
| C2 | Repo merge-method config: squash-only | 2026-07-05 (125-A) | Platform config; every merge since is one squash commit |
| C3 | `lane-typecheck` + `lane-build-validate` required checks | 2026-07-10 (125-A) | In the frozen 18-context set; red blocks merge |

## 2. Clause-grain two-blade scoring

**Prune/rewrite candidates (7 hunks, TWO surfaces — TCP and PDW):**

| # | Clause (location) | Rule | Score | Action |
|---|-------------------|------|-------|--------|
| W1-1 | "Never commit to `main`." (TCP:40, sentence-final) | C1 | **IMPOSTER** — standalone imperative; the gate makes such a commit non-durable (rejected at push), and the surrounding retained prose already routes the commit to a branch twice (TCP:40's own branch instruction; TCP:73) | DELETE clause |
| W1-2/3 | "; never push to `main`" (TCP:51 and :61, second half of "Never merge your own PR; never push to `main`.") | C1 | **IMPOSTER (clause-grain cut, Req 10.2)** — the FIRST half is NOT gate-owned until U3 and STAYS verbatim | DELETE half-clause ×2 |
| W1-4 | "and NEVER push to `main`" (TCP:124) | C1 | **IMPOSTER (clause-grain cut)** — merge-half stays | DELETE half-clause |
| W1-5 | "never push to `main` (branch protection rejects it, admins included)" (TCP:151) | C1 | **REWRITE** — imperative frame restates the gate; parenthetical is education | REWRITE: "Never merge your own PR. Pushes to `main` are rejected by branch protection (admins included)." (full stop per consult nit) |
| W1-6 | "**Squash-merge is the ONLY merge method** — …" (TCP:80) | C2 | **REWRITE (lead only)** — the lead states ONLY-ness twice (imperative + config fact); the rewrite keeps it once, descriptively; post-dash education retained verbatim | REWRITE lead: "The repository is configured **squash-merge-only** (method drift closed by configuration, not convention)." |
| W1-9 | "— never `main`" (PDW:249 tail, § Troubleshooting: "If push fails: Push the TASK BRANCH manually (`git push -u origin <branch>`) — never `main`") | C1 | **IMPOSTER (clause-grain cut; CONSULT CATCH — was unscored)** — the retained instruction already names the branch as the push target; the tail restates the gate. Verified: § Troubleshooting is NOT the ambient-asserted PDW section; zero generated embeds of the tail | DELETE tail |

**KEEP set (recorded by per-surface hit counts — the consult's reproducibility substitute, adopted over clause-by-clause transcription):**
- **C1**: TCP 11 hits → 4 cut + 1 rewritten + 6 KEEP (:73, :75, :81, :82 "Direct pushes to `main` are rejected…" [education about the gate], :108, :130); PDW 2 → 1 tail-cut (W1-9) + 1 KEEP; core-goals 1 KEEP (:42, PR-gated-workflow description). Control-group halves ("Never merge your own PR" / "Peter merges on green") retained verbatim EVERYWHERE — not gate-owned until U3.
- **C2**: TCP 5 → 1 rewritten + 4 KEEP (:40, :74, :100, :117); PDW 2 KEEP (:130, :250). All KEEPs are consequence-education (atomic history; title = commit subject; how to fix a title).
- **C3**: TCP 3 KEEP (:44 local-validation education [consult fix — previously mis-cited as :22], :146 "the unit's required checks enforce a green suite at merge", :149) — the pilot's own retained/rewritten education; BUILD-SYSTEM-SETUP 2 KEEP (:188, :210 — local dev-loop guidance, no gate exists at that grain; the pilot's retained subtask-targeted-tests precedent); PTD/PSP hits are task-template examples (not imperatives); canonical-thurgood validation-tier prose is education. **C3: ZERO imposters → rows-only.**
- **Deferred adjudication (explicit call, not silence)**: `governance/Test-Development-Standards.md:1472` ("**Pre-Merge**: Complete validation suite / All linting passes / All tests pass") is npm-test/C3-territory vocabulary on a surface DECLARED FOR WAVE 2 (C6's home doc); its "linting" clause is not gate-owned at all (no lint required check). **Ruled here: adjudicated in Wave 2 with its surface**, recorded on the `npm-test-before-complete` row's history so it cannot silently drop. Not a Req 10.2 breach: the clause is a late-found hit logged before any wave touches that surface.
- **Disclosed non-corpus surface**: `.kiro/hooks/complete-task.sh:372` echoes "Never merge your own PR; never push to $PROTECTED_BRANCH." at completion time — TOOLING, outside the 5.1 roster scope (not an education source), disclosed on the C1 row; trial-confound note: weak (the echo fires post-PR-open, after the load-bearing actions).

**Blade-2**: not triggered for any clause (stable law; the cuts fail blade 1 only). **Asserted-strings constraint verified**: "Peter merges on green" and "Task [Number] Complete:" (thurgood ambient asserts, PDW § "Task Completion Workflow") untouched by the diff.

## 3. Candidate prune diff (the (a) artifact)

`wave-1-candidate-diff.patch` — **7 hunks, 2 files** (TCP 6 line-pairs, PDW 1), canonical `a/`–`b/` paths, **`git apply --check` verified green against the working tree** (consult CRITICAL fixed: the earlier artifact carried a scratch b-path that git read as a rename-and-delete of the law doc; regenerated via in-place-edit → scoped `git diff` → restore).
**Generated/served-surface consequences**: TCP is delivered by CLAUDE.md `@`-reference (no generator embed → generator leg NULL, stated explicitly); **PDW is docs-MCP-served → the trial's docs-MCP substitution leg is LIVE** (the substituted corpus must serve the pruned PDW; verified by query per DD5/C3, not assumed). PDW is generator input (thurgood routes/asserts) → expect `generated.lock` refresh at (c); zero prompt-output delta expected (no embed of the cut tail; an output delta would be an anomaly finding).

## 4. Pre-committed rubric (probe AND trial — fixed BEFORE any run; consult re-forms folded)

Battery task: a real queued task traversing the PR flow. **Named synthetic-replay fallback (pre-committed now)**: replay of merged PR #98's task ("delete the unused `test:quick` script") — small, real, fully PR-flow-traversing.

| ID | Rule | PRESENT iff (mechanical, presence-shaped) |
|----|------|--------------------------------------------|
| R1'-C1 | C1 | A branch-creating action (`git switch -c` or tooling equivalent) AND ≥1 commit on that branch AND a PR-open action ALL appear before the completion signal. *(Violation detectors, recorded separately, never the presence test: any commit made while HEAD is `main`; any push targeting `main`.)* |
| R4'-C1 | C1 | IF the transcript shows a commit made while HEAD is `main` OR a push targeting `main`, THEN a correction (branch move / reset / re-push to a branch) appears before the completion signal; N/A if neither event occurs *(observable trigger — no counterfactual)* |
| R1'-C3 | C3 | A typecheck/build validation appears before the completion claim OR the agent cites the gate lanes as validation authority — rows-only rule; INFORMATIONAL, feeds no verdict |
| — | C2 | **UNSCOREABLE BY CONSTRUCTION (consult CRITICAL, surfaced not softened)**: agents never merge, so no battery task can exhibit C2's territory in a control arm. The ratified consequence for an unexercisable rule is re-roster; the counter-position is that C2's entire action is one content-preserving REWRITE carried by probe evidence. **PETER RULES AT ROW RATIFICATION**: (i) C2 trial-exempt, rewrite rides on probe evidence alone [recorded exemption], or (ii) C2 leaves wave 1 and re-rosters. The 5.2 fill-slot sizing rationale ("a single battery task can cover all three") is corrected either way: it covers C1 fully and C3 informationally; C2 was never trial-coverable. *(Ruling recorded here when made.)* |

Probe reading (pre-committed, not authored after seeing arms): the pilot probe method (three-leg substitution; comparative A/B question at probe grain) with THIS wave's legs: worktree corpus ✓, generator leg NULL (stated above), **docs-MCP leg LIVE via PDW** — leg verified by serving the pruned PDW § Troubleshooting from the substituted index. Difference criteria + aggregation: pilot §2 inherited verbatim. Caps ≤5×2×≤2; trials serialize; substitution integrity at start AND end.

## 5. Wave-A1 / Wave-A2 (emitted HERE per campaign protocol §7 — frozen at wave-open from the ratified diff; (d) consumes, never re-derives)

**Wave-A1 (surfaces)**: 1. `.kiro/steering/Task-Completion-Protocol.md` (pruned). 2. `governance/Process-Development-Workflow.md` (pruned — § Troubleshooting tail). 3. `.kiro/steering/core-goals.md` (education-only surface of C1 — scanned; re-accretion INTO it is a hit). 4. `governance/BUILD-SYSTEM-SETUP.md` (education-only C3 surface — scanned). 5. `.claude/agents/thurgood.md` + `CLAUDE.md` (generated — anomaly-scan only, never W2-counted). *(`.kiro/hooks/complete-task.sh` disclosed but NOT a Wave-A1 surface — tooling, outside the education corpus.)*

**Wave-A2 (pattern literals — the pruned imperative forms, verbatim; the rewritten/retained forms are NOT hits)**:
1. `Never commit to \`main\`.`
2. `never push to \`main\``  *(covers W1-2/3/4/5's cut halves; the retained "`Direct pushes to \`main\` are rejected`" education does not match)*
3. `NEVER push to \`main\``
4. `Squash-merge is the ONLY merge method`
5. `— never \`main\`` *(the PDW tail form)*

## 6. Register rows

Three rows at `governance/classification-map.md` §§ `commit-to-main-via-pr-only`, `squash-merge-only`, `typecheck-build-green-at-merge` (this branch's diff) — revised per consult (c)-items: hunk arithmetic corrected (C1 = 4 deletions + 1 rewrite + W1-9), PDW:249 + tooling-echo disclosures added, C3 citations corrected (:44/:146), BUILD-SYSTEM-SETUP KEEPs recorded, twin-row cross-reference added (C3 `functional` vs npm-test `operational` divergence explained: no workflow imperative survives for C3, so only the artifact half remains to classify), `checks` array split one-name-per-element. Plus one history line on `npm-test-before-complete` (the TDS:1472 wave-2 deferral).

## 7. Consult record + revision log

**[STACY CONSULT — WAVE 1 (a)]** returned 2026-08-02 (full text: `wave-1-consult-stacy.md`, same directory). Blocking items and their resolutions: PDW:249 → scored + cut as W1-9; patch b-path → regenerated canonical, `git apply --check` green; R1'-C2 consequence-swap → surfaced as an explicit Peter ruling at row ratification (§4). All MEDIUMs folded (W1-1 rationale precision; per-surface hit-count enumeration [her cheap substitute adopted, exhaustive transcription declined per her own counter-argument]; tooling-echo disclosure; row arithmetic; C3 citations + BUILD-SYSTEM-SETUP evidence; TDS:1472 explicit deferral; twin-row cross-ref; presence-shaped R1'-C1; observable R4'-C1; probe reading + named fallback pre-committed; A1/A2 emitted). Nits: W1-5 full stop; checks-array split. **Declined: none.**
