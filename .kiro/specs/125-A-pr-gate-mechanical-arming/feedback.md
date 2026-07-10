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
