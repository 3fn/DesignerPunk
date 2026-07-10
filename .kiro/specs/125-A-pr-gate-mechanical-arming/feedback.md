# Spec Feedback: 125-A — PR Gate + Mechanical Arming

**Spec**: 125-A-pr-gate-mechanical-arming
**Created**: 2026-07-05

---

## Collective Review (requirements + tasks together, per Peter's sequential-gate waiver)

### Context for Reviewers
- Design lives in the umbrella, not here → `../125-mechanical-enforcement-strategy/design-outline.md` § "4. Scope — phased" (2026-07-05 update); this sub-spec deliberately has no design.md.
- The A/B split is DECIDED (Peter, 2026-07-05) on the 119 model → 125-A design-outline.md § "Why a sub-spec".
- Checks-only merging (no required review) in this spec is a leaning Peter has heard; CODEOWNERS/required-review is 125-B → requirements.md Req 1.3, Req 9.
- The record-first ratification protocol governs Task 1/4 → `.kiro/docs/ballots/README.md`.
- Measured lane-viability facts behind Group 2 → `../125-mechanical-enforcement-strategy/inbound-from-2026-07-05-lane-viability.md`.
- Reviewer decision points explicitly flagged: merge-on-green vs explicit merge (Req 4.2); release-flow gate reconciliation (Req 4.4); the ~10-min latency threshold (Req 6.3).

**Requested reviewers**: [@THURGOOD] (lead), [@STACY] (process-quality). Ada/Lina not requested (no token/component domain content) — Thurgood concurred on the roster.

---

#### [THURGOOD R1] — APPROVE-WITH-AMENDMENTS (lead: spec quality, CI/test-infra, ballot mechanics)

Requirements faithfully cover umbrella §4 + the three inbounds; task set traceable both directions. Amendments concrete; A1/A3/A4 are verified blockers, not polish.

- **A1** — Task 1's Tier-2 justification cites *intra*-spec dependency; the ratified conjunctive criterion requires **another spec's** decisions to depend on the artifact — exactly the loose reading Ada's caution predicted, in the criterion's first use. Escalation CORRECT; fix the grounds: 125-B's map consumes the seed entries AND 122's first-generation ratchet consumes the ratified protocol. → tasks.md § Task 1. *("I wrote that definition; I don't get to apply it loosely in my own spec's first outing.")*
- **A2** — Req 2.3 weakly testable; rephrase as the operational test (adding a check = a named status context + one protection-list entry) and add: **required checks SHALL NOT be path-filtered** (a filtered required context that never triggers blocks the merge forever — the one way the OPEN set silently closes). Verified: both current workflows trigger unfiltered. → requirements.md Req 2 AC3
- **A3** — Credential remediation is a buried blocker: the fine-grained PAT lacks Contents write — it **cannot push a branch**; the PR flow is dead on arrival. Verify/upgrade PAT scopes (Contents write, Pull-requests write; Administration for Task 3 or Peter clicks) as an explicit Task 2 item. → Req 4 AC3; Task 2
- **A4** — Verified: `package.json:137` `postpublish` runs `git push origin main`. The moment Task 3 lands, the next publish fails **mid-publish**. State Task 3's dependency on Req 4.4's reconciliation as a blocking condition, not an implied ordering. → Task 3
- **A5** — The ballot SHALL re-run the surface-enumeration grep at draft time with per-surface occurrence counts (the F2-rider lesson: a site survived v1, a dedicated count, AND v2). → Req 3 AC1
- **A6** — Bake-in needs a volume floor, not just calendar (≥5 merged ordinary-work PRs, or Peter picks N). → Req 5 AC1; Task 5
- **A7** — Define "total gate time" as **wall-clock** to all-required-green; record cold-cache AND cached steady-state. → Req 6 AC3; Task 6
- **A8** — State that a checks-only merge is NOT ratification: layer-1 record-first remains the law mechanism throughout 125-A (PR-approval-as-ratification is 125-B's CODEOWNERS layer). → Req 3 new AC
- **A9** — `commit-task.sh` is both a ballot surface and Task 2's target. Resolve: Task 2 **builds and proves** the reworked script; the **behavioral cutover + all doc edits land together in Task 4's atomic window**, Tasks 3+4 back-to-back — else a half-migrated corpus window exists. → Tasks 2/4
- **A10** — Document the emergency path (Peter temporarily lifts protection; each use logged in this spec). A gate with no legitimate emergency path teaches ad-hoc bypass. → Req 1 new AC

**Decision points**: (1) Merge rule — start bake-in agents-open/Peter-merges; decide delegation WITH bake-in data; standing carve-out: governance-law PRs stay Peter-merged (closest ratification proxy until 125-B). (2) Release — no standing exemption; version-bump via release PR; token-index push restructured; a named bypass only if bake-in evidence earns it; enumerate these two forms in Req 4.4. (3) Latency — ~10 min wall-clock reasonable; if latency ever bites, the fix is caching/parallelism, NEVER path-filtering (door closed by A2).

**Ballot mechanics**: executable at eleven-surface scale (doc-type ballot precedent: count-asserted scripted application + zero-straggler sweep); Tier-2 per-criterion verification realistic IF SHALLs are stated at surface level, not per-line. **Traceability**: clean both directions; types correct under the ratified taxonomy except T4 pending A9.

**For Peter**: A1 deserves a beat — the conjunctive criterion drifted loose in its FIRST use, in the lead reviewer's own spec; evidence for eventual mechanical support (125-B map candidate). A3/A4 are verified blockers.

---

#### [STACY R1] — APPROVE-WITH-AMENDMENTS (process-quality, spec structure)

Structure sound; negative scope mostly holds; gate-bites proofs real. But the surface count is wrong (twelfth found), two gates are ambiguity generators, and the single most-executed process step is undefined in the new flow.

- **(a) Twelfth surface found by fresh grep**: `.cursor/rules/designerpunk-core.mdc:32` still instructs the old `commit-task.sh` flow — an always-loaded-equivalent for the **Cursor runtime**, in a category the original grep didn't cover (the 9-vs-2 lesson recurring). Ballot must migrate it OR formally deprecate the file — and re-grep at draft time rather than inherit any count. → Req 3 AC1; Task 1
- **(a) The residual sweep will drown**: ~139 files under `.kiro/specs/` reference `commit-task` (historical records). Ballot SHALL define the pattern set (beyond the literal string: "push to main", "commit directly", …) and the scope split — **instruction surfaces migrate; historical records are explicitly left as records** — recorded so the sweep result is auditable. → Req 3 AC1
- **(a) THE LOAD-BEARING GAP — "task complete" is undefined in the PR flow.** Current law: validate → taskStatus → docs → commit → STOP. The rewrite must define: completion state (PR-open vs merged), where taskStatus fires, where stop-and-wait sits. If Peter merges (Req 4.2), the merge IS the authorization moment and stop-and-wait composes beautifully — but the ballot must say it, or eight agents improvise eight answers. → Req 3 new AC
- **(b) Bake-in closure evidence**: ≥5 distinct working days **each with ≥1 merged ordinary PR**; a findings ledger with every entry resolved or "Peter-accepted (date)"; Peter's closure as a dated record in the spec (authority is a record). → Req 5; Task 5
- **(b) Floor provenance**: per lane, record floor value + derivation (dated, e.g. N% of current `--listTests`) + the artificially-empty failing run. A floor without provenance rots into "≥1". → Req 7 AC3
- **(b) Wall-clock definition** for Req 6.3 (converges with THURGOOD A7); record baseline headroom for 122's future registrants. → Req 6 AC3
- **(b) Req 2.3's verification IS Task 8** (adding Group-2 lanes without redesign) — say so, so it isn't green by assertion. → Req 2 AC3
- **(c) Admin-credential proof**: Task 4's direct-push rejection must be attempted **as an admin** and state the credential used — a non-admin rejection proves nothing about the bypass Req 1.1 closes. → Task 4
- **(d) 125-B has no directory**: Task 9's seed note needs a physical home — umbrella dir, `inbound-to-125-B-*.md`. → Task 9
- **(d) Map-seed clarifier**: "seed entries are handoff records for 125-B, not ratified map rows" — else 125-B inherits them as settled. → Req 3 AC4
- **Decision points**: (1) SUPPORT agents-open/Peter-merges — merge becomes the authorization act, composing with stop-and-wait; any delegation must be a **recorded rule**, never a verbal grant (relayed-authority lesson). (2) Traverse, don't exempt; restructure the token-index push; any unavoidable exemption documented with its bypass surface stated plainly. (3) ACCEPT ~10-min wall-clock; record the cold-cache baseline so 122's registrants can see remaining headroom.
- **For Peter**: Is **Cursor a supported runtime**? Migrate or deprecate `.cursor/rules/` on the record — silence leaves a runtime teaching the pre-gate flow indefinitely. Also: avoid publishing in the Task-3→reconciliation window (postpublish hard-fails).

---

#### [CLAUDE R1] — Incorporation (main loop)

All amendments from both reviewers incorporated into requirements.md + tasks.md same day — none declined; convergences (A5+fresh-grep→draft-time re-grep mandatory; A7+wall-clock; A4+publish-window; merge-rule positions) folded as single edits. Task 4 A9 resolution: Task 2 builds-and-proves without activating; Task 4's atomic window lands script cutover + all doc surfaces + admin-credential gate proof — Task 4 stays **Implementation** (its output includes the script cutover). Open for Peter at spec-go: the Cursor-runtime decision (feeds Task 1's ballot), and ratifying the three decision-point recommendations (both reviewers converge on all three).

---

## Tasks 6–9 Feedback (Group 2 — mechanical arming; round run per Peter's 2026-07-10 decision, waiver declined)

### Context for Reviewers
- Review object: tasks.md § "Task Group 2 — Phase 1a" (Tasks 6–9, still DRAFT) → tasks.md lines ~35–55
- Ratified constraint set: requirements Req 6.3 (timing, ~10-min cold ceiling), Req 7 (selection floors + scope guards), Req 8 (action bumps) — not re-opened by this round
- **Reality since drafting — Task 6 is substantially EXECUTED already**: the lane-timing workflow merged as PR #38 (2026-07-10), five lanes as non-required jobs. Its three PR runs surfaced and fixed: three lanes not self-contained on fresh checkout (gitignored generated TokenTypes → `generate:types` step; export-contract tests require the built package → full `npm run build` + the mcp-server sub-package build added into `lane-functional-root`'s measured wall-clock; app-mcp jest `roots` pointing at an empty untracked dir → src-only), plus a real env-leak test bug (CICDIntegration detection tests never cleared the host's CI vars — fixed in #39). Steady-state samples: typecheck 37s · build-validate 26s · mcp-server 23s · app-mcp 24s · functional-root ~3m54s (incl. full build). Cold-cache run pending (workflow_dispatch requires Peter's click — session PAT lacks Actions write scope).
- The Node-20 deprecation warnings on `actions/checkout@v4`/`setup-node@v4` are live on every run — the Task 7 rider (Req 8) is already earning its place.
- Known drafting inconsistency for the round to resolve: Task 7's title says "the four lanes"; its body (and the shipped workflow) has FIVE.
- Task 5 (bake-in) closure PR #41 is open; Group 2 is authorized at its merge, with this round preceding execution.

**Reviewers**: Thurgood (spec standards: task types/tiers, EARS, testability; test-governance substance of the lanes), Stacy (process quality: selection-floor/scope-guard instruments, prove-it-bites evidence form, coverage-of-coverage). Peter ratifies.

[Reviewer rounds below]

#### [STACY R1] — APPROVE-WITH-AMENDMENTS (process-quality: instruments, evidence, coverage-of-coverage)

Verdict: **AWA**. The instruments Group 2 needs mostly exist in the ratified requirements (Req 7 floors, Req 6.3 wall-clock, Req 8 rider) — the gap is that Tasks 6–8 as drafted underspecify WHERE the evidence lives and WHAT makes a green checkable, in exactly the two failure modes the soak just taught. Five items; (1)–(4) are the check-lied surface, (5) is a Context contest. None reopens the ratified constraint set.

- **(1) WRONG-SCOPE mode is guarded by intention, not instrument.** Task 7 wires two guards for the empty-lane mode (`--listTests` floor) but the 2026-07-03 incident class was not empty — it was a lane green because it ran the WRONG config/cwd (Spec 025 selected zero perf tests while reading as a pass). Task 7's "explicit cwd/config" as written is an *intention*, not a checkable guard: a job with `working-directory: mcp-server` and a config path is not evidence that the selected tests are the ones intended — a mis-pointed `roots` passed `--listTests` floor and still ran the wrong set (that is literally run #1's app-mcp empty-`roots` finding, which floor-count alone would NOT have caught — an empty dir yields zero tests, but a `roots` pointing at the WRONG populated dir yields a passing floor over the wrong suite). Propose the evidence form: **each lane's prove-it-bites record SHALL capture the resolved `--listTests` OUTPUT (the actual file list, or a stable count+sample of paths), not just the count** — so the scope is auditable, not asserted. The floor proves non-empty; the recorded path-list proves *correct-scope*. Add to Task 7 as a distinct guard from the floor. → tasks.md Task 7; Req 7 AC2 (AC2 says "explicit cwd/config" — the completion evidence for AC2 must be the resolved file-list, else AC2 is green-by-assertion, the same defect I flagged for Req 2.3→Task 8 last round).

- **(2)/(3) Prove-it-bites and gate-bites records have no named home — the 122 pattern is run-URL + committed report.** Task 7 says "a recorded prove-it-bites run" and Task 8 says "verify... both blocked," but neither names WHERE the record lives, so presence-is-checkable fails (a reviewer cannot confirm a record that has no address). 122 solved this exact problem: run URL + committed artifact. Propose, for BOTH tasks: **the record is (a) the CI run URL of the failing/blocked run, committed into the Task-7 / Task-9 completion doc, alongside (b) the one-line what-was-broken + what-blocked.** For Task 7 (prove-it-bites, non-required lane): the artificially-emptied-selection run URL + the resolved-scope file-list from item (1), per lane, in `task-7-completion.md`. For Task 8 (gate-bites, platform-level): the two PR URLs (deliberate type error; deliberate test failure) showing the merge blocked at the platform, in the Task-9 closeout completion doc. Without a named location these become "we checked, trust us" — the precise thing this spec exists to end. → Task 7 (add record location); Task 8 (add record location); Req 7 AC3 already mandates "failing-run evidence" — bind it to the completion-doc address.

- **(4) INVERSE-drift (CI quietly WEAKER than local) is real here and partially UNGUARDED — name it in scope.** The soak's three runs all exposed local-green-CI-red (machine-state subsidies). But Task 6's own remediation introduced the inverse risk directly into `lane-functional-root`: the lane now runs a full `npm run build` before `npm test` to satisfy the export-contract tests. That build step is now inside the measured lane AND inside the future required check — so a broken *incremental* path, or a test that silently depends on a stale-but-present build artifact, would be MASKED by the always-clean full rebuild. The floor guard (item 1) does not catch this — the right tests run, they just run against build output that a real incremental dev/PR checkout might not reproduce. **Ruling: this is genuinely out of Group 2's scope** — 125-A arms wholesale existing lanes as-is (Req 6.1 names the exact commands; Req 9 forbids absorbing new work), and incremental-build integrity is a distinct concern. But "out of scope" must be **stated, not implied**: add it to Task 9's deferred-handbacks list as a 122/125-B observation ("armed lanes rebuild-from-clean; incremental-path integrity and stale-artifact masking are unguarded — candidate for a future check"). Leaving it implied is how the next soak re-learns it. → Task 9 deferred list; explicitly NOT Task 6/7/8.

- **(5) Coverage-of-coverage belongs in Task 8 — the 122 count-assert precedent is decisive, and it's 122's OWN dependency.** After Task 8 adds contexts, nothing asserts the promoted required set MATCHES the intended five (lane-typecheck, lane-build-validate, lane-functional-root, lane-mcp-server-suite, lane-application-mcp-server-suite). This is the identical drift class 122 already ruled on: `tools/agent-generator/verify-gate-registration.sh` count-asserts the protection-list context set at each cutover + monthly health check (122 tasks.md:365,406; design.md:419 — "a required check that silently fell off the protection list is exactly the drift class this spec exists to kill"). **Ruling: a lightweight set-assertion belongs in Task 8, NOT deferred to 122's script** — because Task 8 is the moment the set is established, and 122's `verify-gate-registration.sh` asserts 122's OWN context set (its ten), not 125-A's five; deferring means the five sit unasserted from Task 8 until 122 lands, and 122 has no reason to adopt them. Concretely: Task 8 SHALL record the promoted required-context set (the five names) in the Task-9 completion doc AND assert count+names at promotion time (a `gh api` protection-list read pasted into the record is sufficient at this scale — no script required yet). Then the Task 9 handback to 122 says "here are 125-A's five required contexts; fold them into `verify-gate-registration.sh`'s asserted set so the monthly check covers ours too" — which converts my deferral into 122's standing coverage. → Task 8 (add set-assertion + record); Task 9 handback (hand the five to 122's count-assert).

- **(Context contest) Task 6's early execution does NOT compromise the evidence trail — the record is clean, with one caveat.** The Context flags Task 6 as substantially executed before this round (PR #38 merged, three findings runs). I contest that this is a problem: the evidence trail is intact — the workflow file carries the findings inline as durable comments (run #1 gitignored-types + empty-`roots`; run #2 mcp-server sub-package build; the env-leak bug → #39), the steady-state samples are recorded in the Context, and the three runs ARE the prove-it-worked evidence Task 6 requires. Executing-then-reviewing is defensible here because Task 6 is Setup/Tier-1 (measurement, not law) and its output is inspectable in `lane-timing.yml` on main. **The one caveat**: Task 6's completion is NOT yet fully recorded — its Req 6.3 deliverable is BOTH cold-cache AND cached steady-state wall-clock, and cold-cache is still pending (workflow_dispatch needs Peter's click; session PAT lacks Actions write). So Task 6 is not closeable until the cold-cache run lands and the ~10-min-ceiling pause-check (Req 6.3) is either cleared or escalated to Peter. Flagging so Task 6 is not marked complete on steady-state numbers alone — that would be a green-that-lies about its own acceptance criterion. → Task 6 (cold-cache run is a completion blocker, not optional).

- **Two drafting nits already surfaced in Context, confirmed:** (i) Task 7 title "the four lanes" vs FIVE lanes in body/workflow — fix to five. (ii) Req 8 rider is earning its place (live Node-20 deprecation warnings on every run) — no change, just confirming the rider should NOT be dropped for scope.

- **For Peter**: My four instrument amendments (resolved-scope file-list, named record locations ×2, Task-8 set-assertion) are all "make the existing intention checkable" — none adds new enforcement, so none crosses Req 9's negative scope. The one thing I'd have you weigh: item (4)'s inverse-drift (functional lane rebuilds-from-clean, masking incremental breakage) is a real hole I'm deliberately NOT asking you to fix here — I'm asking you to record it as a handback so it's a known-deferred, not a silent one. If you'd rather it be nothing at all, say so and I'll withdraw the handback ask — but silence on it is the failure mode.
