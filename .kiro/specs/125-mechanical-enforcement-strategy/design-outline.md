# Design Outline: Mechanical Enforcement Strategy

**Date**: 2026-07-02
**Spec**: 125 — Mechanical Enforcement Strategy
**Author**: (to be assigned — Thurgood-led; see §7 Ownership)
**Status**: **STUB** — captures a 2026-07-02 working session (Peter + Claude) triggered by the Polar "Orbit" LLM-safe design system article. This PROPOSES scope and records verified findings; it has NOT been through the Spec Feedback Protocol and is NOT requirements/design/tasks. Its purpose is to keep the session's analysis from being lost and to give the barrier-vs-suggestion decision a home.

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

### Phase 1 — Arm what is already authored (the cheap real win)
Move existing checks into required, appropriately-scoped **blocking** lanes:
- Full-project typecheck (component + token unions).
- `build:validate` (token raw-value validator).
- A **scoped, fast** Stemma-governance lane (contract-existence, composition-compliance) — NOT the whole ~10-min suite; mirror the `test:consumer` scoped-lane pattern.
- Per-check **warn→fail** promotions are a *deliberate strictness decision*, not a default (e.g., block a PR for a missing WCAG ref?).

### Phase 2 — Targeted net-new checks (deferrable)
- `no-hardcoded-color` (and siblings) — scoped like the existing component ESLint config.
- Governance **diff-gates** — e.g., "fail if a diff adds a token file without an approval marker" (mechanizes "no autonomous token creation"; presupposes Phase 0's PR flow).

### Phase 3 — Consumer-side reach (Spec 123 territory; explicitly future)
Teeth stop at DesignerPunk's own repo boundary. You cannot force a downstream product's CI to run your rules. Getting enforcement to the consumer's point-of-use is **harder** than arming your own CI and belongs with **Spec 123 (Consumer Distribution)** — 125 *feeds* 123 the way 122 does.

**Right-sizing caveat (guard against over-process):** the valuable core is Phase 0 + Phase 1. Do not let "it's a program" inflate the first increment into a boil-the-ocean effort. Phases 2–3 are real but later, and several items belong with 123 or the domain pipelines.

---

## 5. The spine — the per-rule classification map (block / warn / educate)

This is the artifact 125 owns and its central deliverable. For **every** enforceable governance/design rule, pick one:

1. **Barrier** → CI/lint owns it. The learning layer then keeps at most the *why*, not "remember to do this."
2. **Prose** → the learning layer owns it fully (irreducible judgment — e.g., "is this the semantically correct token?").
3. **Clean split** → the barrier owns the *what*; the prose owns the *why* (Orbit's own pattern — it keeps intent-named tokens *alongside* CI).

**Two failure modes the map prevents:**
- **Duplication** — a rule enforced as both a CI barrier and a prompt instruction, with unclear authority (the OB-7 coexistence anti-pattern, generalized).
- **Gap** — each side assumes the other owns it; nobody does.

**Pruning obligation:** arming a check obligates *deleting* the prose that was compensating for its absence. "Complement" is really "complement **and prune**," or you get coexistence bloat.

**Honesty guard:** the "educate-only" bucket is tempting as a way to avoid hard mechanization. Several rules that *sound* like judgment are actually diff-gateable ("component tokens require approval," "no autonomous creation"). Default a rule to prose ONLY after confirming it is truly unmechanizable, not merely hard.

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

## 8. Decisions on record (this session)

- **Adopt a PR-gated workflow** — DECIDED, Peter, 2026-07-02.
- **This is its own spec, not latched to 122** — DECIDED (scope orthogonality, cross-domain ownership, standing-infra lifecycle; matches 122's own §6 severability logic).
- **Stub now; `.kiro/specs/` extraction from `.kiro` is a separate future concern** — noted (Peter), fine for now.
- **The classification map (§5) is the spine** — DECIDED.

## 9. Open questions (for formalization)

- Exact PR-flow mechanics for agents: how `commit-task.sh` / Task-Completion-Protocol change; solo-dev PR ergonomics (self-merge policy, required-check set).
- Which existing checks graduate to blocking in Phase 1, and the warn→fail promotion list.
- Scoped-lane design: how to carve fast Stemma-governance and full-typecheck lanes without dragging the whole ~10-min suite into CI.
- Whether Phase 0 (PR-flow) should ship as a standalone lightweight increment ahead of formalizing Phases 1–3.
- Confirm before formalizing: is a full design-outline→requirements→design→tasks warranted for Phase 0+1, or is a right-sized tasks-only increment better (over-process guard)?

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
- `.github/workflows/consumer-guard.yml` — the current armed guard set
- `governance/Token-Governance.md` — autonomy levels (prose)
- `.kiro/opportunities/2026-06-16-atlassian-design-md-insights.md` — aspirational `no-hardcoded-color`
- `.kiro/specs/122-agent-generator/design-outline.md` §3a, §5(e), §6 — the shared-artifact coupling
- `.kiro/specs/078-contract-governance-enforcement/` — precedent/consumer
- `.kiro/specs/123-consumer-distribution/` — Phase 3 home
