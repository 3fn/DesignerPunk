# Data (U7) — Cutover Report

**Task**: 13 — Cutover: Data (Android platform engineer), Unit U7, cutover position 6
**Branch**: `task/122-cutover-data` (single-parent unit — opens U7's PR; accepted at Peter's merge, governance-law carve-out)
**Type**: DIFF-VS-BASELINE (Data WAS CC-ported — `.claude/agents/data.md` existed pre-cutover)
**Date**: 2026-07-11

---

## Check results (all green / adjudicated)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard | ✅ PASS | after the 2-pass settle (coverage-map regenerates post-lane; lock refreshed) |
| 122-canonical-vs-truth (C7) | ✅ PASS | all 5 classes; both law predicates resolve (see below); grants/routes/commands/live-tool clean |
| 122-sweep-1-refs | ✅ PASS | every id/section ref resolves incl. the demoted `token-quick-reference` route |
| 122-sweep-2-skills | ✅ PASS | 4 Android skills round-trip (theming-styles/edge-to-edge/adaptive/navigation-3) both targets |
| 122-sweep-3-dupes | ✅ PASS | Product-Token-Governance double-load fixed by construction (was file:// + skill://) |
| 122-sweep-4-ambient | ✅ PASS | 2 deltas ADJUDICATED (token-law reclassification — recorded in `canonical/adjudications.yaml`) |
| 122-sweep-5-corrected | ✅ PASS | |
| 122-sweep-6-declarations | ✅ PASS | |
| 122-sweep-7-dispositions | ✅ PASS | |
| 122-sweep-8-demotion | ✅ PASS | 11 removals, 11 `replaces:` cues, one-for-one (9 docs + 2 dist-`.kt` trims) |
| audit:coverage-map | ✅ PASS | zero blank rows / adjudicated |
| test:agent-generator (lane) | ✅ 330/330 | |
| tsc (root / scripts / generator) | ✅ clean | data-only change; no `.ts` touched |
| root `npm test` | ✅ 8987/8987 (377 suites) | |
| `mcp-server` `npm test` | ✅ 602/602 (36 suites) | relocation-integrity gate clean — no CI-only catch this cutover |

---

## Token-law adjudication (Ada, token substance owner, 2026-07-11)

*Cited by `canonical/adjudications.yaml` (the two `122-sweep-4-ambient` rows) — this is the record.*

**Finding.** The 119-A design spine (`per-agent-ambient-design.md` § "7. Data") classified
**`token-quick-reference`** as Data's token-first governance-law. That classification does **not survive
materialization**: `governance/Token-Quick-Reference.md` is a *routing table* whose own Purpose (L27) states
*"This is not a reference itself; it routes to where values are documented."* It carries no C7 class-(a)
mandate — no verbatim section with a claim-distinguishing "MUST/require/approval" token — and fails the
AXA §3.3 silent-failure discriminator (absent on-demand, you simply query the MCP; no silent breach). The
design.md C1 example "proved" it with `section: "Selection Priority"`, a heading that does not exist in the
doc (an illustrative fake).

**Ruling (Ada).** Lock **`product-token-governance`** as Data's token-first governance-law — the doc that
actually carries the mandate (`## System-First Value Selection`, L66: *"If a system token … exists within
perceptual tolerance … use `ref:` instead."*), already force-loaded in `data.json`, and the same token-law
his sibling consumers Sparky/Kenya lock. It names Data explicitly as an authoring platform agent (L60).
**Demote `token-quick-reference`** to an on-demand doc route (`## Token Documentation Map`, L29). `owner:` =
the doc's substance domain owner per `schema.ts:51` (Req 18 AC3): **`lina`** for platform-implementation-guidelines,
**`ada`** for product-token-governance.

**Disposition**: recorded in `canonical/adjudications.yaml` as `assessment-gap` (both directions — the spine
named the right *effect* but pointed at the wrong doc). Both docs still reach Data (one as law, one as a route),
so no ambient doc is lost.

### C7 governance-integrity predicates (both resolve, verified against the running docs MCP)

| Lock | owner | claim | section (verbatim) | mustContain |
|---|---|---|---|---|
| platform-implementation-guidelines | lina | android-render-target-is-compose | `Android Implementation Patterns` | `Jetpack Compose Composables` |
| platform-implementation-guidelines | lina | tokens-consistent-across-platforms | `3. Token Usage Consistency` | `All platforms MUST use the same design tokens` |
| product-token-governance | ada | system-first-value-selection | `System-First Value Selection` | ``If a system token (semantic or primitive) exists within perceptual tolerance of your intended value, use `ref:` instead.`` |

---

## Acceptance signals (Req 23 — measured on both emitted manifests)

- **Union cardinality: 11** on BOTH targets (cc == kiro — Req 23 AC1 ✅). Classes: formative 2, reflexive-principle 2,
  governance-as-law 2, operational 2, orientation-reference 2, capability-routing 1.
- **Per-agent members: 2** (the two governance-as-law locks — platform-implementation-guidelines,
  product-token-governance). The other 9 are the locked always-set (inherited via the union).
- **Baseline 19 → 11 removals** (demotion delta), each `replaces:`-covered (sweep 8 one-for-one): 9 on-demand doc
  demotions + 2 stale `dist/*.kt` artifact trims. 8 baseline members retained; +3 always-set additions
  (task-completion-protocol, designerpunk-systems-overview, civitas-system-overview) not in the hand config.
- **Ground-truth verdict `none-trim-stale-snapshots`**: renders 2 trim cues (hard-negative + positive), the
  DesignTokens trim carrying `shape: per-theme-set` (Req 12 AC2(b)); both `fires: unconditional` (K-D1).
- **Tool grant: strict superset** of baseline — one add (`rebuild_product_index`, baseline-parity), zero drops.

Detail + subsection reconciliation: `cutover/data-diff-vs-baseline.md`.

---

## Sweep-4 adjudications (recorded, `canonical/adjudications.yaml`)

| key | ruling | record |
|---|---|---|
| `data/designed-minus-generated/token-quick-reference` | assessment-gap | this report § "Token-law adjudication" |
| `data/generated-minus-designed/product-token-governance` | assessment-gap | this report § "Token-law adjudication" |

---

## Two findings routed to Peter (out-of-scope of Data's own gate)

1. **Stale `not-yet-ported` route dispositions (accumulating drift).** `renderAgentRoute` renders the disposition
   as authored — it does NOT consult the ledger. So predecessors are never auto-flipped: Sparky's route to
   Leonardo still says `not-yet-ported` post-U6, and after this cutover Leonardo's route to `data` will keep
   saying "seat not generated yet" though Data is now generated. C7(b) **exempts** `not-yet-ported`
   unconditionally, so nothing catches it. The Leonardo completion-doc claim that these "flip automatically by
   regeneration" is inaccurate. **Recommendation**: a C7(b) sharpening (a `not-yet-ported` whose target IS in the
   ledger → FAIL as stale) or a per-cutover predecessor-backfill rule. Kept out of this PR (self-contained value;
   predates Data).
2. **Sparky's `owner:` values likely wrong.** `schema.ts:51` defines `owner:` as the doc's substance domain owner.
   System-agent cutovers were coincidentally self-correct (they own their own locks), but Sparky (the prior
   consumer) used `owner: sparky` for docs he doesn't own — `contract-system-reference` (Lina's),
   `product-token-governance` (Ada's). Data does it right (`owner: lina`/`ada`). **Recommendation**: correct
   Sparky's owners in a small follow-up so the two consumers stay consistent (touches a merged governance surface —
   Peter's call).

---

## Validation signatures (amendment 4)

- **Data (seat)**: **CONFIRMED** (2026-07-11). Independent baseline→generated walk of every heading — no silent
  operational drop; the compressed `## MCP Usage`/`Progressive Disclosure` channel-move cleanly and the `.dp`-pattern
  rule is a net gain (inlined law). Ground-truthed the trims against the actual artifacts: the dist `.kt` is
  structurally flat/pre-Spec-094, and the application MCP returns a real per-theme set (light/dark × base/wcag) —
  matching the `shape: per-theme-set` promise. All 4 skills resolve; gradlew confirmed absent (named-gap correct).
  Endorsed the token-law lock from his authoring seat. Nothing to fix.
- **Stacy (independent)**: **CONFIRMED** (2026-07-11). Lock-independent full re-diff (heading-set + normalized-prose
  containment + verbatim spot-checks) — all load-bearing operational prose (Blocking Exception path, Tier 1/2/3
  handoff, sibling-divergence flag, platform-currency honesty, testing boundaries) survived; **no second missed
  regression** (the Leonardo failure mode did not recur). Coverage-of-coverage: independently reconstructed the
  baseline-19 partition (6 always-set + 2 law + 9 demoted + 2 artifact-trim), 11 removals / 11 `replaces:`
  one-for-one, both adjudications recorded with a citable record. Ground-truthed the adjudication against the live
  docs (TQR L27 self-disclaimer; the fake `"Selection Priority"` heading; PTG L60/L68). Tool-grant addition ruled a
  legitimate baseline-parity fix, not over-reach. One non-blocking note: the `owner:` terminology overload
  (adjudication-row `owner: data` = finding-routing seat, vs canonical-lock `owner: ada/lina` = substance owner)
  — both used correctly; worth a future terminology note. No DISPUTED items.
- **Ada (token substance owner)**: **RULED** (2026-07-11) — the token-law adjudication above; re-verified by the main
  loop against the live docs and by Stacy independently.
- **Main loop (engineering)**: authored canonical source + baseline; ran the full battery (ten checks + coverage +
  generator lane + 3 tscs + root 8987/8987 + mcp-server 602/602) — all green; diff-vs-baseline reconciled to zero
  unexplained regressions. Token substance delegated to Ada and independently re-verified.
