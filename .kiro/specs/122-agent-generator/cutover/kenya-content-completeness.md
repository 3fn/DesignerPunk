# Kenya (U8) — Content-Completeness Check

**Cutover**: Task 15, Unit U8 — Kenya (iOS platform engineer)
**Gate type**: **CONTENT-COMPLETENESS — NOT diff-against-baseline.** Kenya was NEVER CC-ported (no
`.claude/agents/kenya.md` existed), so there is no prior CC artifact to diff. The merge gate is: the generated
output covers (a) canonical source and (b) his supplied input-of-record with **zero unexplained omissions**. The
channel-move-bucket rule does not apply (no diff).
**Generated**: `.claude/agents/kenya.md` (NEW) + `.kiro/agents/kenya.{json,-prompt.md}` (regenerated).

---

## (a) Completeness vs canonical source — every class rendered

| Canonical class | Rendered in generated output? |
|---|---|
| Identity / Domain Boundaries / Operational Modes / Collaboration / Token Consumption / Platform Currency / iOS-Specific Guidance / Testing Practices (pass-through prose) | ✅ present (body §§ Identity … Testing Practices) |
| governance-as-law lock (product-token-governance) | ✅ `## Ambient (per-agent)` inlines it (§ System-First Value Selection …) |
| ground-truth trims (2 stale `dist/*.ios.swift`) | ✅ `## Ground truth` — both hard-negative-plus-positive cues, `shape: per-theme-set` on the DesignTokens trim |
| standingFacts (no in-repo iOS build) | ✅ rendered (Commands gap + the "no in-repo iOS build/test" note) |
| routes (docs + Leonardo agent-route + capability/demotion cues) | ✅ `## Routing` |
| commands (4 in-repo + 2 gaps) | ✅ `## Commands` |
| knowledgeBases (ios-components, ios-tests) | ✅ `## Knowledge fallback` (Grep/Glob over the two glob sets) |
| writeScope / kiro pre-flight | ✅ `## Write scope` / `## Pre-flight` |
| skills: [] | ✅ zero-skills → no Skill grant, sweep-2 PASS (`0 declared / 0 emitted`, Req 8 AC1) |

## (b) Completeness vs input-of-record (`feedback/requirements.md` § [KENYA R1]) — zero unexplained omissions

**4 verified commands — all present** (`## Commands`):
- `generate:platform-tokens` ✅ (with the no-theming-surface note)
- the Swift-theme-types Jest suite ✅ — `npm test -- SwiftThemeTypes` (jest name-pattern; see note below)
- `build` (incl. validate) ✅
- `audit:tokens` ✅

**4 named gaps — all covered** (a verified named gap IS valid authored content, Req 21 AC1):
1. no in-repo iOS build/test (xcodebuild/simctl = consumer-repo) ✅ — `ios-build-test` gap + standingFacts
2. `.swift` files with no in-repo compile path ✅ — captured as the standingFacts platform-reality + the `ios-build-test` gap. **The COUNT is intentionally NOT frozen** (the design's "151 .swift" is already stale — the live count is now 242): per K-D3 / rule 2's backstop, a volatile count is not authored content; the load-bearing NEGATIVE (no compile path) is what's captured, not the number.
3. consumer-side generation is where theming Swift materializes ✅ — `product-screen-commands` gap + the platform-tokens cue note
4. zero iOS skills exist ✅ — `skills: []`, sweep-2 registers `0 declared / 0 emitted` as a PASS

## Demotion set (sweep 8, against the Kiro-side baseline — D-A4)

**12 removals, 12 `replaces:` cues, one-for-one** (10 on-demand doc demotions + 2 stale `dist/*.ios.swift` artifact
trims). Baseline degrades to the Kiro-side set (never-ported); computed against it so the trims register as removals
rather than silently vanishing. All green (sweep 8).

## Acceptance signals

- Ambient union **10** on BOTH targets (cc == kiro); sole governance-as-law lock = **product-token-governance** (K4);
  9 always-set inherited via the union.
- Ground-truth verdict `none-trim-stale-snapshots`: 2 trims, both `fires: unconditional` (K-D1 — one artifact is
  orphaned), DesignTokens trim carries `shape: per-theme-set`.
- Zero skills → sweep-2 PASS; standingFacts homes the no-iOS-build reality structurally (K-D3).

## Notes / observations (for the review)

- **Data-parity observation (not a defect):** Data (U7, the other platform engineer) locks
  `platform-implementation-guidelines`; Kenya's assessment (§6) locks only `product-token-governance`, so
  platform-implementation-guidelines is **demoted** here (to an on-demand route: `iOS Implementation Patterns` +
  a replaces cue) per the spine and K4 (consumer decomposition; the seat owns membership). Flagged for the seat/Stacy
  to confirm the per-agent difference is intended, not an oversight.
- **C7 command-currency edge (found & fixed):** the first draft used `npm test -- src/.../SwiftThemeTypes.test.ts`;
  C7 class (d) treats any `/`-containing cmd as a script-path and requires the referenced file to be `+x` — a
  `.test.ts` file isn't executable, so it FAILed. (Sparky's `npm test -- src/components/` passed only because a
  *directory* carries the executable bit.) Fixed by switching to the jest name-pattern `npm test -- SwiftThemeTypes`
  (no `/` → treated as the `test` package.json script, which exists). Worth a lesson for future test-command authoring.

## Omissions

**None unexplained.** The only *intentional* omission is the volatile `.swift` file count (routed/structural, not
frozen — see gap 2).
