# Kenya (U8) — Cutover Report

**Task**: 15 — Cutover: Kenya (iOS platform engineer), Unit U8, cutover position 7
**Branch**: `task/122-cutover-kenya` (single-parent unit — opens U8's PR; accepted at Peter's merge, governance-law carve-out)
**Type**: FIRST-GENERATION (never CC-ported) → CONTENT-COMPLETENESS gate (not diff-vs-baseline)
**Date**: 2026-07-11

---

## Check results (all green / adjudicated)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard | ✅ PASS | no-op-green after the 2-pass settle (coverage-map regenerates post-lane) |
| 122-canonical-vs-truth (C7) | ✅ PASS | all 5 classes; product-token-governance predicate resolves; one class-(d) edge found & fixed (see below) |
| 122-sweep-1-refs | ✅ PASS | every id/section ref resolves incl. the demoted `iOS Implementation Patterns` + `Token Documentation Map` routes |
| 122-sweep-2-skills | ✅ PASS | **zero-skills registers `0 declared / 0 emitted` as a PASS** (Req 8 AC1), not a coverage hole |
| 122-sweep-3-dupes | ✅ PASS | Product-Token-Governance double-load fixed by construction (was file:// L30 + skill:// L42) |
| 122-sweep-4-ambient | ✅ PASS | **clean — no adjudication needed** (generated ambient == designed: sole lock product-token-governance ∪ always-set) |
| 122-sweep-5-corrected | ✅ PASS | |
| 122-sweep-6-declarations | ✅ PASS | |
| 122-sweep-7-dispositions | ✅ PASS | |
| 122-sweep-8-demotion | ✅ PASS | 12 removals, 12 `replaces:` cues, one-for-one (10 docs + 2 dist-`.ios.swift` trims) |
| audit:coverage-map | ✅ PASS | zero blank rows / adjudicated |
| test:agent-generator (lane) | ✅ 330/330 | |
| tsc (root / scripts / generator) | ✅ clean | |
| root `npm test` | ✅ 8987/8987 (377 suites) | |
| `mcp-server` `npm test` | ✅ 602/602 (36 suites) | relocation-integrity gate scanned the NEW kenya.md — clean, no CI-only catch |

## Content-completeness (the merge gate)

Full check: `cutover/kenya-content-completeness.md`. Summary: the generated `.claude/agents/kenya.md` covers every
canonical class + his input-of-record (4 verified commands + 4 named gaps + zero-skills + the no-in-repo-iOS-build
reality) with **zero unexplained omissions**. The only intentional omission is the volatile `.swift` file count
(routed/structural, not frozen — the design's "151" is already stale at a live 242; K-D3).

## Governance-as-law: sole lock + the Data-parity observation

Kenya's SOLE law lock is **`product-token-governance`** (`owner: ada`, predicate `System-First Value Selection`,
same proven predicate as Data/Sparky) — per the spine's §6 design AND K4 (his config force-loads many law docs as
`skill://`, but the Task-9 design locks product-token-governance only and demotes the rest; the seat owns MEMBERSHIP,
the doc owner owns SUBSTANCE).

**Parity observation (flagged, not silently diverged):** Data (U7, the other platform engineer) ALSO locks
`platform-implementation-guidelines`; Kenya's assessment did not name it, so it is **demoted** here (to an on-demand
route: `iOS Implementation Patterns` + a replaces cue). This is a deliberate per-agent difference per the spine —
surfaced for the seat/Stacy to confirm it is intended, not an oversight.

## C7 command-currency edge (found & fixed at this cutover)

The first-draft Swift-test command `npm test -- src/generators/__tests__/SwiftThemeTypes.test.ts` FAILed C7 class (d):
the check treats **any `/`-containing cmd as a script-path** and requires the referenced file to be executable (`+x`)
— a `.test.ts` file isn't. (Sparky's `npm test -- src/components/` passed only because a *directory* carries the
executable bit.) **Fix:** the jest name-pattern `npm test -- SwiftThemeTypes` (no `/` → treated as the `test`
package.json script, which exists). Lesson for future test-command authoring: use jest name-patterns, not file paths.

## Acceptance signals (Req 23 — measured on both emitted manifests)

- **Union cardinality: 10** on BOTH targets (cc == kiro — Req 23 AC1 ✅). Sole per-agent member: product-token-governance
  (1 lock); the other 9 are the locked always-set (inherited via the union).
- **Baseline (Kiro-side, D-A4) 19 → 12 removals** (demotion delta), each `replaces:`-covered: 10 on-demand doc
  demotions + 2 stale `dist/*.ios.swift` artifact trims.
- **Ground-truth verdict `none-trim-stale-snapshots`**: 2 trim cues, both `fires: unconditional` (K-D1 — one artifact
  orphaned), the DesignTokens trim carrying `shape: per-theme-set` (Req 12 AC2(b)).
- **Zero skills** → sweep-2 PASS (`0 declared / 0 emitted`). **standingFacts** homes the no-in-repo-iOS-build reality
  structurally (K-D3), not as body prose.

## Validation signatures (amendment 4)

- **iOS seat (fresh-context stand-in — no CC subagent existed for a never-ported agent at review time)**:
  **CONFIRMED** (2026-07-11). Verified the orphaned `dist/ios/DesignTokens.ios.swift` against git (untracked; removed
  in `835e33d1`; written by no current script) and confirmed **zero** `EnvironmentKey`/`Theme` in the flat dist Swift
  (proving the pre-Spec-094 staleness); all 4 commands verified against `package.json`; no `.xcodeproj`/`Package.swift`
  confirmed. Endorsed the sole-lock from the iOS seat. One **durability note** — the prose glob `dist/*.ios.swift`
  didn't match the two-level `dist/ios/...` (covered only via the explicit artifact name): **ADDRESSED** — the negative
  now reads "dist/ios/*.ios.swift OR dist/*.ios.swift" (regenerated, diff-guard no-op-green). No DISPUTED items.
  *(Nice confirmation: once generated, a real `kenya` subagent became spawnable — the generation is live-valid.)*
- **Stacy (independent)**: **CONFIRMED** (2026-07-11) on content-completeness + coverage-of-coverage. Prose
  byte-identical (a strict superset); demotion math **19 → 12 → union 10** independently reproduced *exactly*
  (set-difference empty both ways); baseline dedup + 2 artifact-paths confirmed; zero-skills sweep-2 PASS legitimate;
  volatile-count discipline correct (**242 live .swift** — freezing "151" would have baked in a 60%-wrong value);
  standingFacts structurally homed. **Data-parity: explicitly resolved** — demoting platform-implementation-guidelines
  for Kenya while Data locks it is a defensible spine-authored per-agent decision, no reconciliation required.
  Her one finding — "the cutover run-artifact is missing" (Req 19 AC3) — was a **TIMING RACE**: she read the repo while
  this file was still being written; it exists with the 15-row results table she specified. Re-validated on the
  now-present report.
- **Main loop (engineering)**: authored canonical source + Kiro-side baseline; ran the full battery (ten checks +
  coverage + generator lane + 3 tscs + root 8987/8987 + mcp-server 602/602) — all green; content-completeness
  verified to zero unexplained omissions; the C7 command-currency edge found and fixed on-branch; the seat's glob
  durability note actioned (tightened negative).
