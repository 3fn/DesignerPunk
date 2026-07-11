# Sparky cutover report (U5 — FIRST-GENERATION, never CC-ported)

**Date**: 2026-07-11
**Branch**: task/122-cutover-sparky · **Spec**: 122-agent-generator Task 14
**Sequence**: C10.1 steps 1–8 (content readiness → baseline → generate → checks → this report
→ content-completeness → validations → signals → PR). **Cutover position 4** (moved early per
Peter's 2026-07-07 order to surface first-generation risk with runway).

---

## Per-check results (local runs on the final branch state; CI URLs on the PR checks tab — the platform record)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard (C6) | **PASS** (full-run-green) | Sparky's runtime artifacts (incl. the NEW `.claude/agents/sparky.md`) now ledger-derived guarded surfaces; lock refreshed |
| 122-canonical-vs-truth (C7) | **PASS** (clean, exit 0) | 3 law embeds' predicates hold; all commands' scripts resolve; grant surfaces read from emitted configs |
| 122-sweep-1-refs | **PASS** (0 fail, 1 info) | 3 law claims + 5 doc routes live-resolved (standing interim crossRef INFO) |
| 122-sweep-2-skills | **PASS** | `skills: []` recorded PASS |
| 122-sweep-3-dupes | **PASS** | Regenerated config has zero double-loads — the hand config's `Product-Token-Governance` double-load FIXED by construction |
| 122-sweep-4-ambient | **PASS** (0 info) | designed (§ Sparky block ∪ always-set) == generated, both targets — ZERO deltas |
| 122-sweep-5-corrected-state | **PASS** | count-asserts unchanged (0 `.web.tsx`; single concept-count 136) |
| 122-sweep-6-declarations | **PASS** (1 info) | Fleet-partial INFO shrinks — Sparky is the first PRODUCT MCP consumer routed (product verbs now covered) |
| 122-sweep-7-dispositions | **PASS** | All configs fully disposition-covered |
| 122-sweep-8-demotion | **PASS** | 12 removals: 9 doc demotions each `replaces:`-covered + **3 dist-CSS trims whose unconditional negatives appear VERBATIM in the emitted CC text (K-D1 leg exercised for the FIRST time)** |
| audit:coverage-map | **PASS** | Sparky's artifacts auto-appear as guarded rows (ledger-derived) |
| Full suite / lane / tsc | lane **326/326** · root + scripts + generator tsc clean · full suite recorded at parent completion | |

## Engineering delivered with this cutover

- **Ground-truth TRIMS render leg (`renderGroundTruthTrims`)**: `none-trim-stale-snapshots` now renders a `## Ground truth` section listing each trim's `cue.negative` VERBATIM + its namespaced replacement tool (fail-loud when the tool isn't granted). This is the leg Lina's U3 flagged as unimplemented ("no ledger agent carries a trim verdict yet"); Sparky is that first agent. render.ts + both adapters + tests (render.test.ts, cc-adapter.test.ts). Both adapters now dispatch faithfulnessVerbs XOR trims through one `## Ground truth` block. sweep-8's K-D1 leg (which asserts the negative appears in the emitted text) now has a live producer.

## Found-and-fixed during authoring (the gates biting, recorded)

1. **Volatile-fact lint on a spec-number heading** — `### Product Tokens (Specs 108/109)` tripped the inventory-noun-adjacent-integer heuristic ("specs 108"). The spec-number provenance isn't load-bearing in a heading; dropped the parentheticals from both theming headings. (A reminder that rule 2 is a heuristic floor — a false positive here, correctly caught by the emission gate.)

## First-generation specifics (Req 15 AC1 / Req 21)

- **NO diff-against-baseline** — no current CC port exists; the merge gate is `cutover/sparky-content-completeness.md` (zero unexplained omissions vs canonical + his 8+3 input-of-record). The channel-move bucket rule does not apply.
- **Content-before-catalog (Req 21 AC2)** — his 8 verified commands + 3 named gaps were authored into canonical source (with `Source:` traceability comments) BEFORE the catalog generated. Named gaps landed as `gap:` command entries; no dev-server cue was fabricated (Req 21 AC1).
- **Config-derived write scope (Req 15 AC3)** — the specs-only scope (`.kiro/specs/**` + `docs/specs/**`) was carried from `sparky.json` `allowedPaths`, not hand-approximated (SP4 — 11.3's derive-from-source rule protects a never-existed port).
- **Dev-server absence marked intentional-and-unguarded (SP-D2)** — recorded in the acceptance signals (content-completeness artifact), distinguishing the decision from a coverage gap.

## Acceptance signals

See `cutover/sparky-content-completeness.md` § Acceptance signals — union 12, per-agent lock == pinned 3, baseline 21 → 12 removals (3 trims + 9 docs), both targets agree, dev-server absence intentional-and-unguarded.

## Validation signatures (independent-validation default, amendment 4 — mandatory first-generation Stacy trigger, Req 21 AC5)

**Owning seat — Sparky (content confirmation, 14.1):** PENDING

**Independent validation — Stacy (mandatory first-generation trigger):** PENDING

**Main-loop engineering verification:** PENDING

## Routed items (non-blocking, carried forward)

1. **U6+ cutovers inherit**: the trims render leg is now live for any future `none-trim-stale-snapshots` verdict; verify FULL verbatim heading lines; the volatile-fact lint fires on spec-number-in-heading (keep spec provenance out of headings).
2. **Kenya (U8) heads-up**: also first-generation (never-ported) with 4+4 input-of-record and zero skills — sweep-2 must pass legitimately on a no-skills agent (already handled).
