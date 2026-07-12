# Design Outline: Mechanical Enforcement Strategy

**Date**: 2026-07-02
**Spec**: 125 — Mechanical Enforcement Strategy
**Author**: (to be assigned — Thurgood-led; see §7 Ownership)
**Status**: **STUB + directional update (2026-07-05); PHASE 0 + PHASE 1a COMPLETE (2026-07-10)** — Spec 125-A delivered both: the PR gate went live 2026-07-05, survived a 5-day/30-PR bake-in (closed 2026-07-10, PR #41), and the mechanical arming landed 2026-07-10 — five lanes (full typecheck · build:validate · root functional suite · both sub-package suites) promoted to REQUIRED checks with did-it-really-run guards, proven per-lane at the platform level (gate-bites PRs #46–#50, each `BLOCKED`). The "authored-but-unarmed" load-bearing finding below is CLOSED for those five surfaces. **125-B (the classification map + later phases) formalizes after Spec 122 calcifies** — seed note: `inbound-to-125-B-from-125-A.md` (this directory). The remaining phases still await the Spec Feedback Protocol; this remains an outline, not requirements/design/tasks.
>
> **UPDATE (2026-07-11): Spec 122 COMPLETE — 125-B's gate is met; inbounds CONSOLIDATED.** The seven
> inbound notes have been deduplicated into a single provenance-tagged input, **`125-B-backlog.md`** (this
> directory) — read that, not the scattered notes, for what 125-B owes. Spent notes are stamped
> `DISPOSITION: CONSUMED`; live ones `DISPOSITION: FOLDED`. **125-B is confirmed a single, internally-phased
> spec** (Peter, 2026-07-11) — see § "8. Decisions on record". Formalization (spec dir + map methodology)
> remains Thurgood's, unstarted.

> **Inbound inputs folded into this update (read alongside — they are the evidence, this outline is the synthesis):**
> 1. `inbound-from-2026-07-05-lane-viability.md` — the full functional suite is now CI-gateable wholesale (~53s warm); sub-package suites must be named; "armed = verified non-empty AND correct scope."
> 2. `inbound-from-ratification-protocol.md` — record-first ratification (Peter, all three layers); 125 owns layer 2 (PR-approval-as-ratification) + the classification-map entry.
> 3. `inbound-from-wordpress-thesis.md` — Phase 0/1 pulled ahead of 122; execution-loop reframing; kill-switch; the elective autonomy dial.
> 4. `docs/roadmap/2026-07-04-full-project-audit.md` § 1 — independent re-confirmation of the enforcement gap (A8).

> **Trigger:** Polar's *Orbit: An LLM-Safe Design System* (https://polar.sh/blog/orbit-llm-safe-design-system). Core Orbit claim: *"Docs are a suggestion. CI is a contract... making the wrong thing fail to compile is the only instruction we've found that survives an LLM's fresh context window."* This spec is DesignerPunk's answer to that critique — not by adopting Orbit wholesale, but by deciding, per rule, what should be a mechanical **barrier** vs. what stays an **educational** rule delivered via the MCP/steering learning layer.

---

## 1. Thesis / Problem

An LLM agent in a fresh context complies with a **barrier** (it cannot do otherwise) but only *probabilistically* honors a **suggestion**, no matter how well-authored. DesignerPunk's LLM-safety today is split unevenly across that line, and the split does not match where the project *thinks* its enforcement lives.

**The load-bearing finding (verified against CI + build config this session):** DesignerPunk has authored a large amount of mechanical enforcement, but almost none of it is **armed** — i.e., wired to fire regardless of an agent's choice. The gap is not "we have no checks"; it is "our checks are suggestions because nothing runs them at a gate."

This spec's job: **arm the enforcement DesignerPunk has already authored, add a small number of targeted net-new checks, adopt the workflow that makes any of it possible, and deliberately leave the irreducibly-judgment rules to the learning layer — complementing the MCPs, not replacing them.**

---

## 2. Verified Inventory (evidence, 2026-07-02)

Three read-only probes (token, CI/hooks, component/lint) established the current state. Verdicts use **BARRIER** (fires regardless of agent choice) vs **SUGGESTION** (prose, or a check an agent must choose to run).

**What is genuinely armed (fires in CI, `.github/workflows/consumer-guard.yml`):**
- `typecheck:scripts` — but scoped to `tsconfig.scripts.json` (build-path scripts only, **not** components or tokens).
- `lint` — a single ESLint rule banning file-extensions on relative imports, scoped to `src/components/**`.
- `check:id-uniqueness`, a `DynamicImportGuard` test, one `test:consumer` integration test, MCP/browser boot smokes.

**What is authored-but-UNARMED (real, executable checks that only run on a manual invocation, never at a blocking gate):**
- **Full-project typecheck** (`tsc --skipLibCheck` inside `npm run build`) — the check that would catch a bad token-name union or a loose component prop. Not in CI. And the runtime path (`tsx`/esbuild) **strips types without checking them**, so it does not fire in the agent's edit-run loop either.
- **`build:validate`** — the token raw-value validator (rejects `#hex`/`16px` in semantic tokens). Lives only in `npm run build`. Not in CI.
- **Stemma contract/composition tests** — `contract-existence-validation`, `composition-compliance-validation`, `behavioral-contract-validation`. Real gates that genuinely fail, but they live in the full Jest suite, which CI deliberately keeps out of scope. Some assertions only **warn** (missing WCAG refs, incomplete validation criteria).

**What is prose-only (no mechanical check at all):**
- **Token autonomy levels** — semantic-free / primitive-conditional / component-approval / *no autonomous token creation*. Pure `Token-Governance.md` prose; nothing blocks an agent from creating a token or using a component token without approval.
- **Token-first / no hard-coded values at the consumption site** — the most-repeated rule in the steering corpus; a consumer hard-coding `#FF0000` in a component passes every check. The `no-hardcoded-color` lint that would close this is aspirational (noted in `.kiro/opportunities/`), unbuilt.
- **Governance / process rules** — the always-loaded steering layer generally.

**Correction on the record:** an earlier characterization in-session credited the Rosetta (token/component-code) layer as "already armed like Orbit." Verification showed that is **false** — the type/validator barriers exist but are unarmed in CI and absent from the `tsx` runtime path. The honest picture is nearly uniform: *authored-but-unarmed*, plus a thin armed guard set.

---

## 3. The layer map (where each system sits)

- **Rosetta** — mechanical *mechanism* for values (typed unions, `build:validate`), but **unarmed** (manual-only); prose for consumption (no hard-code lint).
- **Stemma** — mechanical for prop-values (`tsc`, unarmed); **built-but-unarmed** for behavior/composition (tests exist, idle); prose for code-style (no `<div>`/className/token-usage enforcement).
- **Civitas** — prose throughout (autonomy levels, process). The layer Spec 122 systematizes, and where Orbit's ceiling argument bites hardest.

**Note on Stemma's tests-not-types:** contracts assert *behavior* and *cross-platform parity* (focusable, ≥3:1 contrast, an implementation exists on all declared platforms). None of that can be a TypeScript type. Using tests is correct; the failing is purely that the tests are unarmed. **Do not "fix" this by trying to make behavior a type.**

---

## 4. Scope — phased

**The workflow question dominates the technical one.** Branch protection, required checks, and diff-gates ALL presuppose a PR-based flow. DesignerPunk currently runs **direct-to-main, trunk-based**. There is no third option where you get Orbit-style teeth while keeping frictionless direct-to-main.

**DECIDED (Peter, 2026-07-02): yes — adopt a PR-gated workflow.** ("An inevitable necessity at some point.") This unblocks the entire program.

### Phase 0 — PR-flow adoption (the critical-path unlock; pull out front)
Feature-branch → PR → required checks → merge. Branch protection on `main`. This is a **process + tooling change**, not a settings toggle: it updates the always-loaded **Task-Completion-Protocol** (which currently bakes in direct `commit-task.sh`), and it changes how every agent completes a task. It also arms **122's own** diff-guard / canonical-vs-truth checks (they only *block* if there is a gate) — so Phase 0 de-risks 122 as a side effect. Highest leverage; smallest surface.

**GREENLIT as a right-sized increment (Peter, 2026-07-05) — the decided shape:**
1. **Branch protection on `main`; required checks = the currently-armed, currently-green set** (the consumer-guard lane incl. the boot smokes and packed-install guard, plus drift detection). No new checks in Phase 0 — the gate must be livable from day one; a gate that annoys teaches bypass.
2. **Task-Completion-Protocol + `commit-task.sh` move to branch → PR → checks → merge.** This is an operational-law change to an always-loaded doc: it is drafted, recorded, and ratified via the **record-first ratification protocol** (`.kiro/docs/ballots/README.md`) — the protocol's first planned use.
3. **Checks-only at first — no required human review** (PROPOSED, leaning): agents' PRs merge when green, preserving solo-flow speed. The `governance/`-requires-Peter's-approval layer (ratification layer 2: branch protection + CODEOWNERS) is **pre-wired here, landed in Phase 2** as the governance diff-gate — Phase 0 should not block on it.
4. **Bake-in week**: run ordinary work through the gate before 122's formalization merges through it — debug the ergonomics on low-stakes commits, not during a cutover.
5. **Third job acquired 2026-07-05**: Phase 0 is the platform substrate for **PR-approval-as-ratification** (see `inbound-from-ratification-protocol.md`) — once gated, "Peter ratified" becomes his platform-verified PR approval for law changes, superseding the manual record-first step for gated surfaces.

### Phase 1 — Arm what is already authored (the cheap real win)
Move existing checks into required, appropriately-scoped **blocking** lanes:
- Full-project typecheck (component + token unions; measured ~1 min).
- `build:validate` (token raw-value validator).
- **The ENTIRE functional suite — wholesale, not carved** *(updated 2026-07-05: the stub's "scoped fast lane vs ~10-min suite" framing is void — post-de-flake, full `npm test` = ~53s warm / 8,987 tests, deterministic; see `inbound-from-2026-07-05-lane-viability.md`)*. Re-measure on cold-cache CI runners before promising, but the order of magnitude changed: the Stemma contract/composition gates ride in for free.
- **The sub-package suites, named explicitly**: `mcp-server` (622 tests incl. the relocation-integrity gate — currently armed nowhere) and `application-mcp-server` (320 tests incl. the tool-boundary contract test) run only via their own `npm test`; root-green proves nothing about them.
- **"Armed" = verified non-empty AND correct scope** (the 2026-07-03 empty-lane lesson + the 2026-07-03 wrong-cwd incident): a blocking lane asserts a plausible selection floor (`--listTests`) and that it ran the intended selection — an empty or mis-scoped green reads as a pass forever.
- Per-check **warn→fail** promotions are a *deliberate strictness decision*, not a default (e.g., block a PR for a missing WCAG ref?).
- Chore rider: bump `actions/checkout@v4` / `setup-node@v4` (Node-20 deprecation nags) while touching CI.

### Phase 2 — Targeted net-new checks (deferrable)
- `no-hardcoded-color` (and siblings) — scoped like the existing component ESLint config.
- Governance **diff-gates** — e.g., "fail if a diff adds a token file without an approval marker" (mechanizes "no autonomous token creation"; presupposes Phase 0's PR flow).
- **Ratification layer 2 (added 2026-07-05, DECIDED as direction)**: `governance/`-law changes require **Peter's PR approval** — branch protection + CODEOWNERS on `governance/` → platform-verified ratification, the diff-gate form of "governance-law changes require Peter's ratification." The record-first protocol (layer 1, in force now) remains for artifacts outside the gate's reach.

### Phase 3 — Consumer-side reach (Spec 123 territory; explicitly future)
Teeth stop at DesignerPunk's own repo boundary. You cannot force a downstream product's CI to run your rules. Getting enforcement to the consumer's point-of-use is **harder** than arming your own CI and belongs with **Spec 123 (Consumer Distribution)** — 125 *feeds* 123 the way 122 does.

**Right-sizing caveat (guard against over-process):** the valuable core is Phase 0 + Phase 1. Do not let "it's a program" inflate the first increment into a boil-the-ocean effort. Phases 2–3 are real but later, and several items belong with 123 or the domain pipelines.

---

## 5. The spine — the per-rule classification map (block / warn / educate)

> **RECONCILIATION NOTE (2026-07-12, Peter — methodology realigned in 125-B):** *"CI validates functional and operational requirements, never ideology; education and verification are complementary layers (strategy → tactics → validation loop)."* **The governing text for 125-B's methodology is `../125-B-classification-map/design-outline.md` §2**; this section's wording is superseded where they diverge (notably: the honesty guard's mechanizability criterion → the boundary-call guard; duplication-as-failure-mode → contradiction/imposter; the pruning obligation → "prune imposters, not teachers"). This section is preserved as the historical record — do not rewrite it.

This is the artifact 125 owns and its central deliverable. For **every** enforceable governance/design rule, pick one:

1. **Barrier** → CI/lint owns it. The learning layer then keeps at most the *why*, not "remember to do this."
2. **Prose** → the learning layer owns it fully (irreducible judgment — e.g., "is this the semantically correct token?").
3. **Clean split** → the barrier owns the *what*; the prose owns the *why* (Orbit's own pattern — it keeps intent-named tokens *alongside* CI).

**Two failure modes the map prevents:**
- **Duplication** — a rule enforced as both a CI barrier and a prompt instruction, with unclear authority (the OB-7 coexistence anti-pattern, generalized).
- **Gap** — each side assumes the other owns it; nobody does.

**Pruning obligation:** arming a check obligates *deleting* the prose that was compensating for its absence. "Complement" is really "complement **and prune**," or you get coexistence bloat.

**Honesty guard:** the "educate-only" bucket is tempting as a way to avoid hard mechanization. Several rules that *sound* like judgment are actually diff-gateable ("component tokens require approval," "no autonomous creation"). Default a rule to prose ONLY after confirming it is truly unmechanizable, not merely hard.

**Map entry decided 2026-07-05 (the authority dimension — the map's first ratified row):** *"governance-law changes require Peter's ratification"* → **barrier** (PR-approval gate, Phase 2 layer 2) for gated surfaces; **record-check** (committed ballot status per `.kiro/docs/ballots/README.md`) for ungated artifacts; prose keeps only the *why*. Origin: the 2026-07-05 relayed-authority incident — an agent forced into a trust-or-refuse judgment because authority existed only as a message claim; friction without protection. The lesson generalizes the map's whole premise: *claims are suggestions; records are contracts.* Coordinate wording with 122 (which propagates the agent-facing verify-the-record rule) so the rule is neither double-owned nor orphaned — the exact §5 failure modes.

---

## 6. Relationship to Spec 122 (Agent Generator)

**The coupling is coordination on ONE shared artifact — the classification map (§5) — not a technical build dependency.**

- 122 generates agent prompts (context delivery). Its always-layer contains governance-as-law prose that is exactly 125's candidate set for barrier ownership (122 §3a explicitly propagates the token-governance autonomy levels into Ada's prompt; §5(e) names a "governance-as-law lock-set").
- 125 decides which of those rules become barriers. 122 consumes that decision to know what to keep as prose (the *why*) vs. stop presenting as an instruction (the *what* a check now owns).
- **The coupling is SOFT:** 122's §2.2 auto-regeneration means a mis-classified rule is fixed by editing canonical source and regenerating. So **122 never waits on 125** — it consumes the map as it stabilizes and can re-consume a revised map later.
- **Not a special second coupling:** 122's own guards needing an armed CI is just the general truth that every check is a suggestion until Phase 0's gate exists — 122 is an early *beneficiary* of the gate, not uniquely wired to it. Do not overweight this.

**One-sentence statement of the relationship:** *122 delivers governance rules as prompt-prose while 125 decides which of those rules should be CI barriers instead; the two must agree rule-by-rule (the classification map) to avoid double-enforcing or dropping a rule — coordination, not dependency, kept soft by auto-regen.*

---

## 6a. Relationship to other specs

- **Spec 078 (Contract Governance & Enforcement)** — *consumer / precedent, not parent.* 078's root-cause #3 ("no automated check verifies contracts exist or use catalog names") is exactly the kind of check 125 Phase 1 arms. 078 motivates; 125 provides the arming mechanism.
- **Spec 123 (Consumer Distribution)** — 125 *feeds* 123 with the consumer-side reach problem (Phase 3).
- **Spec 122 (Agent Generator)** — §6 above.

---

## 7. Ownership

- **Lead: Thurgood** (Civitas steward) — test-infrastructure standards, CI, governance-tooling adoption, spec formalization. This is squarely his domain.
- **Ada** — token-side lints (`no-hardcoded-color`), arming `build:validate`.
- **Lina** — arming the Stemma contract/composition lane; component code-style rules.
- **Stacy** — process/quality-compliance impact of the workflow migration.
- **Peter** — owns the workflow-migration decision (DECIDED: yes) and all strictness (warn→fail) calls.

---

## 8. Decisions on record

*2026-07-02 session:*
- **Adopt a PR-gated workflow** — DECIDED, Peter, 2026-07-02.
- **This is its own spec, not latched to 122** — DECIDED (scope orthogonality, cross-domain ownership, standing-infra lifecycle; matches 122's own §6 severability logic).
- **Stub now; `.kiro/specs/` extraction from `.kiro` is a separate future concern** — noted (Peter), fine for now.
- **The classification map (§5) is the spine** — DECIDED.

*2026-07-05 update:*
- **Phase 0 ships NOW as a standalone right-sized increment, ahead of formalizing Phases 1–3 AND ahead of Spec 122's formalization** — DECIDED, Peter, 2026-07-05 (resolves two §9 open questions; consistent with the wordpress-thesis inbound's Adjustment 1 and its three compounding reasons).
- **125 splits on the Spec 119 A/B model** — DECIDED, Peter, 2026-07-05. **125-A** (`../125-A-pr-gate-mechanical-arming/`) = Phase 0 + Phase 1a (the mechanical sliver of Phase 1: wholesale suite, full tsc, `build:validate`, sub-package lanes, selection-floor guards) — executable now, clean completion semantics. **125-B** = the classification map, warn→fail promotions, Phase 2 diff-gates incl. the CODEOWNERS ratification layer, and the pruning pass — formalized AFTER 122 calcifies, with 122's canonical source as the rule inventory (the map gets better and pruning gets cheaper post-generator). Sequence: **125-A → 122 → (125-B ∥ 119-B) → 123.** This document remains the umbrella/strategy home for both.
- **Record-first ratification protocol adopted, all three layers** — DECIDED, Peter, 2026-07-05. 125 owns layer 2 (PR-approval-as-ratification, Phase 2) and the classification-map authority entry (§5); layer 1 (committed-record check) is in force now via `.kiro/docs/ballots/README.md`; layer 3 (prompt rule) is 122's.
- **The scoped-lane question is DISSOLVED by measurement** — the full functional suite is ~53s warm post-de-flake; Phase 1 gates it wholesale rather than carving lanes (see §4 Phase 1 update + the lane-viability inbound).

*2026-07-11 update:*
- **Spec 122 COMPLETE — 125-B's "after 122 calcifies" gate is met.** 125-B may now formalize (Thurgood-led).
- **125-B stays a SINGLE, internally-phased spec — NOT split into 125-C/125-D** — DECIDED, Peter, 2026-07-11.
  Scope discipline comes from **declared merge units** inside one spec (the 122 pattern: substrate → units →
  closeout), not from more spec directories. Rationale: the A/B split already captured the one division that
  earned its keep (ship-now-mechanical vs. defer-until-122-judgment); further directory-splitting worsens a
  real sprawl problem (~178 spec dirs) for no gain the unit machinery doesn't already provide. **Counter-cost
  on record:** a single 125-B spanning the map (ready now) and the Phase-2 governance layer (later) stays
  "open" until its slowest unit merges — acceptable *provided* the work is sliced into declared units so each
  delivers independently. The failure mode to guard is a monolithic 125-B, not too-few specs. Proposed unit
  shape → `125-B-backlog.md` § "Proposed unit shape".
- **The seven inbound notes are CONSOLIDATED into `125-B-backlog.md`** — one deduplicated, triaged,
  provenance-tagged input. Spent notes stamped `CONSUMED`; live ones `FOLDED`. Removes the archaeology step
  from formalization. Pending only a cold-cache CI re-measure.

## 9. Open questions (for the Phase 0 increment + later formalization)

- **Phase 0 increment (design-now):** exact `commit-task.sh` / Task-Completion-Protocol mechanics for the branch → PR → checks → merge flow; self-merge policy (leaning **checks-only, no required human review** initially — required review arrives with Phase 2's CODEOWNERS layer); branch-naming and PR-body conventions for agent-authored PRs.
- **Phase 1 (formalization):** the warn→fail promotion list (which warning-only assertions graduate); cold-cache CI timing for the wholesale suite; how the sub-package suites wire in (one workflow vs separate lanes).
- **Phases 1–3 formalization shape:** Phase 0 is decided as increment-first; whether Phases 1–3 warrant the full design-outline→requirements→design→tasks pipeline or a compressed form remains open (over-process guard stands).
- **The elective autonomy dial** (wordpress-thesis inbound §3): revisit at Phase 1 closeout per its own activation trigger — not before.

---

## Addendum — 2026-07-03 evidence: default lanes de-flaked; the root perf lane was silently EMPTY

*(Recorded from de-flake work landed in commit `29bba7de`, outside this spec but load-bearing for it.)*

**What changed (the de-flake itself):** all wall-clock timing assertions were removed from the default (functional) test lanes, per this outline's §4 Phase 1 scoped-lane direction:
- Root: ComponentTokenValidation's NFR 3 timing tests moved to `src/integration/__tests__/performance/`; parse-time bounds dropped from `mcp-component-integration.test.ts`; ParallelExecutor's elapsed-time/start-delta assertions replaced with load-insensitive concurrency counters.
- `mcp-server`: gained its own lane split (`npm test` excludes `tests/performance/`; new `npm run test:performance`); FileWatcher tests got a watch-stream warmup barrier (macOS FSEvents starts async — a fixed sleep can never fix that race).
- Verified: full root `npm test` green; mcp-server `npm test` 10/10 consecutive green (previously ~1-in-8 flaky, and mid-fix as bad as 4-in-8).

**The finding that matters for §1's thesis:** root `npm run test:performance` had been selecting **zero tests** since Spec 025 Task 2.1 (`4145d13e`, ~May 2026) baked the perf-exclusion patterns into `jest.config.js` — config-level `testPathIgnorePatterns` also apply to `--testPathPatterns`-selected runs, so the selection flag and the config exclusion annihilated each other. `test:all` likewise silently excluded all performance tests. Nobody noticed for ~2 months because nothing gates on these lanes.

This is a sharper failure mode than §2's "authored-but-unarmed": a lane can be authored, *invoked*, exit green, **and be empty**. Two implications for formalization:
1. **"Armed" must include "verified non-empty."** When Phase 1 wires a lane to a blocking gate, the gate should assert the lane selected a plausible test count (e.g., a `--listTests` floor), or an empty-selection regression reads as a pass forever.
2. **Precondition now met for §9's scoped-lane question:** the default lanes are timing-assertion-free and demonstrated deterministic, which is what makes promoting them to *blocking* tolerable — a flaky blocking gate teaches agents (and humans) to override gates.

---

## Cross-References
- Polar Orbit article: https://polar.sh/blog/orbit-llm-safe-design-system
- `.github/workflows/consumer-guard.yml` — the current armed guard set (= Phase 0's initial required-check set)
- `governance/Token-Governance.md` — autonomy levels (prose)
- `.kiro/opportunities/2026-06-16-atlassian-design-md-insights.md` — aspirational `no-hardcoded-color`
- `.kiro/specs/122-agent-generator/design-outline.md` §3a, §5(e), §6 — the shared-artifact coupling
- `.kiro/specs/078-contract-governance-enforcement/` — precedent/consumer
- `.kiro/specs/123-consumer-distribution/` — Phase 3 home
- `inbound-from-2026-07-05-lane-viability.md` — the measurements behind the §4 Phase 1 update
- `inbound-from-ratification-protocol.md` — layer 2 + the §5 authority map entry
- `inbound-from-wordpress-thesis.md` — sequencing (Phase 0/1 before 122), kill-switch, autonomy dial
- `.kiro/docs/ballots/README.md` — the record-first ratification protocol (layer 1, in force)
- `docs/roadmap/2026-07-04-wordpress-thesis-strategy.md` + `2026-07-04-full-project-audit.md` — strategy + audit context
