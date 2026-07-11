# Task 15 Completion (Parent): Cutover — Kenya (U8, iOS platform engineer)

**Date**: 2026-07-11
**Task**: 15 — Cutover: Kenya (Parent, Unit U8, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-cutover-kenya (single-parent unit — opens U8's PR; accepted at Peter's merge, governance-law carve-out)
**Type**: FIRST-GENERATION (never CC-ported) → CONTENT-COMPLETENESS gate

---

## Success criteria — all met

1. **Content authored FIRST, then catalog; both targets generated; checks green; content-completeness recorded; Stacy validation** ✅
   — `canonical/agents/kenya.md` (sole law lock product-token-governance; none-trim-stale-snapshots with 2 trims;
   Leonardo `routes.agents` resolves; 8 capability cues + 10 demotion cues; **zero skills**; structured
   `standingFacts`; 2 iOS knowledge-base globs; all-3-MCP toolSubset). All ten checks + C7 + coverage-map green.
   Gate artifact: `cutover/kenya-content-completeness.md`; report: `cutover/kenya-cutover-report.md`.
2. **4 verified commands + 4 named gaps carried BEFORE catalog (Req 21 AC2)** ✅ — the no-in-repo-iOS-build reality is
   a run-context-annotated consumer-repo command class + in-repo pipeline commands (a verified named gap IS valid
   content, Req 21 AC1).
3. **FIRST CC generation = a first-generation cutover** ✅ — mandatory Stacy trigger honored; baseline degrades to the
   Kiro-side set (D-A4).
4. **Zero-skills sweep-2 PASS** ✅ (`0 declared / 0 emitted`, Req 8 AC1); **orphaned `dist/ios/DesignTokens.ios.swift`
   fires `fires: unconditional`** (K-D1); **standingFacts (K-D3)** homes the no-in-repo-iOS-build reality structurally,
   not as body prose.
5. **Content-completeness, zero unexplained omissions** ✅ — `cutover/kenya-content-completeness.md`; NO
   diff-against-baseline (no current CC port); the channel-move-bucket rule does not apply.
6. **Kenya in the cutover ledger; artifacts diff-guarded** ✅.

## Firsts / notable

- **Last first-generation (never-ported) seat.** Content-completeness gate; fresh-context seat stand-in (no CC
  subagent existed at review time — though generation made a real `kenya` subagent spawnable afterward).
- **Sweep-4 clean, no adjudication** — generated ambient == designed (sole lock ∪ always-set); contrast with Data,
  whose token-law swap needed an adjudication row.
- **Volatile-count discipline exercised live**: the design's "151 .swift" is stale (live 242); the count is routed
  out / structural (K-D3), never frozen — Stacy confirmed freezing it would have been the defect.

## Found-and-fixed at this cutover

1. **C7 command-currency edge**: `npm test -- src/.../SwiftThemeTypes.test.ts` FAILed class (d) — C7 treats any
   `/`-containing cmd as a script-path needing `+x`, and a `.test.ts` file isn't executable (Sparky's
   `npm test -- src/components/` passed only because a *directory* carries the +x bit). Fixed with the jest
   name-pattern `npm test -- SwiftThemeTypes` (no `/`). **Lesson for future test commands: use jest name-patterns,
   not file paths.**
2. **Ground-truth negative glob tightened** (seat durability note): `dist/*.ios.swift` didn't match the two-level
   `dist/ios/...`; the negative now reads "dist/ios/*.ios.swift OR dist/*.ios.swift" so the orphaned subdir file is
   covered by the glob, not only by its explicit artifact name.

## Acceptance signals

Union **10** on both targets (agree); per-agent member **1** (product-token-governance); baseline (Kiro-side, D-A4)
**19 → 12 removals** all `replaces:`-covered (10 docs + 2 dist-`.ios.swift` trims); verdict
`none-trim-stale-snapshots` renders 2 trims (one orphaned, `fires: unconditional`; DesignTokens `shape: per-theme-set`);
zero skills → sweep-2 PASS. Detail: `cutover/kenya-cutover-report.md`.

## Validation signatures (amendment 4)

- **iOS seat (fresh-context stand-in)**: CONFIRMED — ground-truthed the orphaned/stale dist Swift vs git, all commands
  vs package.json, no `.xcodeproj`/`Package.swift`; durability note actioned.
- **Stacy (independent)**: CONFIRMED — prose byte-identical (superset); demotion 19→12→10 reproduced exactly;
  Data-parity resolved as a defensible per-agent decision; volatile-count discipline correct. (Her one finding — the
  cutover report — was a timing race; the record is present and re-validated.)
- **Main loop (engineering)**: all checks green; two fixes applied on-branch.

## Validation (Tier 3)

`npm test` **8987/8987** (377 suites) · `mcp-server` **602/602** (36 suites — relocation-integrity gate clean on the
NEW kenya.md) · generator lane **330/330** · root + scripts + generator tsc clean · all ten checks + C7 +
`audit:coverage-map` green · diff-guard **no-op-green** with lock refreshed.

## Data-parity note (surfaced, resolved)

Data (U7) locks `platform-implementation-guidelines`; Kenya's assessment (§6) locks only `product-token-governance`,
so platform-implementation-guidelines is demoted here (to an on-demand `iOS Implementation Patterns` route + a replaces
cue) per the spine and K4 (the consumer decomposition; the seat owns membership). Both reviewers confirmed this is an
intended per-agent difference, not an oversight — no reconciliation required.

## Delegated-tier capture

Planned `Agent: Thurgood + Kenya` (15.1) / `Thurgood + Stacy` (15.2); executed: main loop (Opus 4.8) authoring +
engineering; **fresh-context general-purpose agent** as the iOS seat stand-in (Kenya had no CC subagent at review
time — correct for a never-ported seat); **Stacy agent** independent validation. Plan held (no domain-owner consult
needed — the sole-lock predicate materialized cleanly, unlike Data's token-law).

## Remaining in Spec 122

**U9 Stacy** (Task 16 — diff-vs-baseline, self-review → independent second reviewer as the DEFAULT done-condition),
then **U10 OB-7** (CLAUDE.md retirement) and **U11 Closeout** (handbacks + OB-8/OB-9 discharge).
