# Task 10 Completion (Parent): Cutover — Lina (U3)

**Date**: 2026-07-11
**Task**: 10 — Cutover: Lina (Parent, Unit U3, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-cutover-lina (single-parent unit — this completion opens U3's PR; accepted at Peter's merge, governance-law carve-out)

---

## Success criteria — all met

1. **Canonical source authored + both targets generated + checks green + sweep report + Stacy validation** ✅ — `canonical/agents/lina.md` (two-claim contract-system-reference law; `catalog-is-manifest` ground-truth verdict; 10 doc routes; 2 agent routes — ada is the first live `resolves` disposition; 9 catalog cues + 1 template cue + 27 demotion-coverage `replaces:` cues; 3 commands; StemmaComponentSource rich KB; full toolSubset/writeScope/kiro fields; de-Kiro'd body). All ten checks + C7 + coverage audit green on the final state. Report: `cutover/lina-cutover-report.md`.
2. **Acceptance signal (Req 23 AC2)** ✅ — generated lock-set == the pinned set from `per-agent-ambient-design.md` § Lina (per-agent members == {`contract-system-reference`}; personal-note + ai-collaboration-principles ride the always-set); **ZERO** `Component-Family-*` / `*-Standards` ids in her ambient manifest (mechanical regex, both targets); |union| **10**, |per-agent members| **1**, both targets agree (id-set equality); baseline **35** (34 docs + 1 KB, shared-normalizer capture) → **27 removals**, each `replaces:`-covered.
3. **The class-(c) server-grant FAIL exercised on her live case (L1)** ✅ — the hand `lina.json` granted no `@designerpunk-application` despite her law's App-MCP verbs; a defect in BOTH current and generated that the diff artifact is blind to by construction. C7's leg-2 grant surface verified the fix: the regenerated config carries the grant, derived from `toolSubset`. The bug class cannot recur for ledger agents.
4. **Diff-against-baseline artifact, ZERO unexplained regressions** ✅ — `cutover/lina-diff-vs-baseline.md`: 14 classified rows, all carried by C7-verified channels; zero regression-bucket entries (adjudications table present and empty by design); baseline parity additions (3 routes + 1 cue for the port's uncovered table rows) fixed-before-merge per the U2 precedent.
5. **Lina in the cutover ledger; artifacts diff-guarded** ✅ — ledger-derived `guardedRoots` picked up her 3 runtime files + 3 attribution sidecars automatically (the U2 machinery, zero new wiring).

## Engineering delivered with this cutover

- **Ground-truth directive RENDERED (Req 10 AC3 gap closed)**: `deriveGroundTruthDirective` carried verdicts as data since Task 2, but neither adapter consumed the directive — `renderGroundTruthFaithfulness` (render.ts) + both adapters now emit `## Ground truth` (assembly-grain verbs, per-target naming, fail-loud on ungranted verbs). Lina's `catalog-is-manifest` is the first live exercise. The `trims` render leg remains open (no ledger agent carries a trim verdict yet — routed).
- **Child-process guard (found-and-fixed at this cutover)**: local check runs orphaned MCP server children on ungraceful death (~230 accumulated since 2026-06-29, wedging a C7 run >1h and inflating every MCP boot from seconds to minutes). `child-process-guard.ts` reaps spawned transports at exit/fatal-signal, with a connect-time pid SNAPSHOT surviving the SDK's close-window pid-nulling (found by live kill-testing — a SIGTERM in the SDK's 2s close race otherwise reaps nothing). Verified: mid-run SIGTERM leaves zero orphans; the full local battery dropped from ~30+ min to ~41 s. Server-side complement (stdin-EOF self-exit in the three MCP servers) routed as a spawned task.
- **First live `resolves` agent-route disposition** (ada — generator-SSOT since U2) rendered without the not-yet-ported caveat.

## Found-and-fixed at this cutover (the gates biting, recorded)

1. **Declared-id-vs-filename-id mismatch** — caught by the resolver's fail-loud (emission refused): the scaffolding-templates route guessed `component-templates` from the filename; the doc declares `id: component-family-templates`. Exactly the substrate's "ids are read, never guessed" rule. Fixed + NOTE comment in canonical source.
2. **Baseline parity additions** — the hand port's MCP-table rows for Component-Development-Guide, Component-Templates, Test-Behavioral-Contract-Validation, Component-MCP-Document-Template had no structured carrier; 3 `routes.docs` + 1 cue added before the diff artifact finalized (Ada-precedent, fixed-before-merge).
3. **The orphan-leak + SDK close-window interaction** (see Engineering above) — three compounding defects (server ignores stdin EOF; SDK nulls pid before child death; guard read pid at reap time) diagnosed by instrumented kill-testing.

## Validation signatures (amendment 4)

- **Lina (seat)**: **CONFIRMED 2026-07-11** — law embed verified verbatim against the live corpus; all 10 routes live-resolved by her; 27 demotion cues matched one-for-one; tool grants mechanically set-identical; diff-artifact render claims audited, none half-false. Zero disputes; 4 non-blocking routed items (one — a wording overstatement — fixed pre-merge).
- **Stacy (independent)**: **CONFIRMED 2026-07-11** — own check runs including a LOCK-INDEPENDENT full regenerate-and-compare (clean 0/0/0) and her own lane run (322/322); all signals re-derived by set arithmetic and matching; sweep-4 non-vacuity verified in code; classification audited (every render claim holds; zero regression-class lines); coverage-of-coverage clean (all 11 Lina surfaces guarded rows). One Low cosmetic finding (embed deixis — converges with Lina's item (i)), routed.
- **Thurgood (engineering, main loop)**: all fixes re-verified; final battery green.

## Validation (Tier 3)

`npm test` **8987/8987** (377 suites) · lane **322/322** · root + scripts + generator tsc clean · all ten checks + C7 + `audit:coverage-map` green on the final branch state · diff-guard full-run-green with lock refreshed.

## Carried forward (routed items)

1. Lina's 4 seat-review items (embed deixis/volatile count; rebuild-protocol enumeration; fallback wording; the fixed byte→field-faithful wording) — report § Routed items.
2. Generator team: the `trims` render leg; the server-side stdin-EOF self-exit (spawned task chip).
3. U4+ cutovers inherit: verify each routed doc's DECLARED frontmatter id before authoring; the groundTruth render is live for future faithfulness-verb verdicts.

## Delegated-tier capture

Planned `Agent: Thurgood + Lina (+ Stacy)`; executed: main loop (Fable 5) engineering + authoring; **Lina agent** (session model) seat confirmation — thorough, live-resolved every route, adjudicated wording; **Stacy agent** (session model) independent validation. Tier calibration was discussed with Peter pre-task and held: validation seats at strong tier (the U2 record justifies it), mechanical work in the main loop.
