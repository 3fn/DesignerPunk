# Stacy (U9) — Cutover Report

**Task**: 16 — Cutover: Stacy (product governance & QA), Unit U9 — **the FINAL cutover**
**Branch**: `task/122-cutover-stacy` (single-parent unit — opens U9's PR; accepted at Peter's merge, governance-law carve-out)
**Type**: DIFF-VS-BASELINE (Stacy WAS CC-ported — the hand port was the transform dry-run, port-recon-stacy.md)
**Date**: 2026-07-11

---

## Check results (all green / adjudicated)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard | ✅ PASS | no-op-green after the 2-pass settle |
| 122-canonical-vs-truth (C7) | ✅ PASS | all 5 classes; test-development-standards predicate resolves; all audit commands (npm + 2 script-path +x) current |
| 122-sweep-1-refs | ✅ PASS | every id/section ref resolves (her routed spec/task/contract/completion sections) |
| 122-sweep-2-skills | ✅ PASS | zero-skills `0 declared / 0 emitted` PASS |
| 122-sweep-3-dupes | ✅ PASS | no double-load in her config |
| 122-sweep-4-ambient | ✅ PASS | clean — generated ambient == designed (sole lock test-development-standards ∪ always-set) |
| 122-sweep-5-corrected | ✅ PASS | |
| 122-sweep-6-declarations | ✅ PASS | **after routing 5 un-routed Product-MCP tools to Leonardo** (see below) — the finding this final cutover's complete declaration-diff surfaced |
| 122-sweep-7-dispositions | ✅ PASS | |
| 122-sweep-8-demotion | ✅ PASS | 8 removals, 8 `replaces:` cues, one-for-one (all docs; no artifact trims) |
| audit:coverage-map | ✅ PASS | zero blank rows / adjudicated |
| test:agent-generator (lane) | ✅ 330/330 | |
| tsc (root / scripts / generator) | ✅ clean | |
| root `npm test` | ✅ 8987/8987 (377 suites) | |
| `mcp-server` `npm test` | ✅ 602/602 (36 suites) | relocation-integrity gate clean (Stacy regenerated + Leonardo changed) |

## Un-routed Product-MCP tools — the final-cutover finding (RESOLVED: routed to Leonardo)

Sweep 6's declaration-diff is **complete for the first time at this final cutover** (all 8 agents are now
generator-SSOT, so `declarations ∖ all-subsets` is total). It surfaced **5 Product-MCP tools in NO agent's
subset**: `find_principles`, `find_templates`, `get_domain_object`, `get_product_component`,
`list_product_templates`.

Per Peter's routing, **Leonardo** (product architect, the Product-MCP consumer) ruled (2026-07-11). Context that
reframed the question: **Product-MCP is intentionally "empty" in this repo** — it serves the content of the product
that *installs* DesignerPunk, not the design-system source; per Req 7 AC2 the tool *declarations* appear regardless
of index state and drive per-agent cue generation.

**Leonardo's ruling: route all 5 to himself.** Each is the product-repo analog of a system-side capability he
already uses reflexively during screen specification:

| Tool | Ruling | `when:` cue | Rationale |
|---|---|---|---|
| `find_principles` | route-to-leonardo | translating product design intent — the product's own design principles | product-side analog of his design-philosophy/rules step |
| `list_product_templates` | route-to-leonardo | surveying all product layout/content patterns before a custom layout | product-repo pair to `list_layout_templates` (his REQUIRED templates-first step) |
| `find_templates` | route-to-leonardo | checking for an existing product template (by category / screen) before custom layout | filtered variant of the above |
| `get_domain_object` | route-to-leonardo | specifying a screen's state model — what a domain object is + where referenced | backs his `get_screen_state_model` cue |
| `get_product_component` | route-to-leonardo | selecting/composing a product one-off component — schema + contracts | analog of `get_component_full` for product one-offs |

Applied: 5 tools + 5 cues added to `canonical/agents/leonardo.md`, regenerated in this PR (a cross-agent change,
documented in `stacy-diff-vs-baseline.md` § "Leonardo delta"). **Because they are now routed, no adjudications.yaml
row is needed** (sweep 6 passes on routed tools). **Leonardo's candid caveat (for Peter):** `get_domain_object`
(overlaps `get_screen_state_model`) and `find_templates` (overlaps `list_product_templates`) are the two he'd least
defend — if you'd rather trim to 3, those are the candidates; he holds firm on the other three.

## Acceptance signals (Req 23)

- Union **10** on BOTH targets (cc == kiro); sole per-agent lock = **test-development-standards** (owner: thurgood).
- Baseline **15 → 8 removals** (demotion delta), each `replaces:`-covered; **no artifact trims** (differential-auditor).
- Verdict `collapses-into-catalog` → renders nothing standing (parity with Thurgood U4).
- Tool grant **identical** to the hand port (zero drops/adds for Stacy). **All 5 `routes.agents` resolve** — the
  first cutover whose every agent route resolves (full roster now SSOT).
- Her **audit-command catalog** (C12-provisioned) rendered: `audit:coverage-map`, `audit:mode-parity`,
  `audit:theme-drift`, `test:coverage`, `governance-check.sh`, `verify-gate-registration.sh`.

## The self-review rule (amendment 4) — reviewer plan

Because a QA seat validating its own generated catalog is a self-review conflict, the **independent second-reviewer
signature is the DEFAULT done-condition, NOT a fallback**: Thurgood verifies AND a second reviewer (per Peter's
routing) signs off; Stacy's own self-validation does not, by itself, satisfy the gate.

- **Verification (mechanical, checks green)**: main loop / Thurgood role — complete (battery above).
- **Stacy seat**: the `stacy` subagent may review her own catalog (useful signal) but does NOT satisfy the gate.
- **Independent validation signature (gate-satisfying)**: _pending Peter's routing of the second reviewer._

## Validation signatures (amendment 4)

- **Thurgood — INDEPENDENT second reviewer (gate-satisfying, per Peter's routing 2026-07-11)**: **CONFIRMED**
  (2026-07-11). Independently re-derived rather than re-ran: byte-diffed the baseline→generated (every audit block —
  Checklist 1–8, severity model, Audit-vs-Write, Parity Review, Testing Practices — IDENTICAL; nothing dropped
  without a channel); set-diffed the tool grants (**29 == 29**, zero drops/adds); reconstructed the baseline (15
  members, no double-load, no artifact trims); demotion **8 removals one-for-one** replaces-covered; **union 10**
  both targets (verified the regenerated stacy.json resources); sole lock test-development-standards predicate
  materializes on both anchors (his own doc); `collapses-into-catalog` renders no `## Ground truth`; all 6 audit
  commands resolve (+x scripts confirmed). The 5-tool Leonardo routing: grepped all agents — lands only in Leonardo;
  sound + correctly scoped; leaving them routed (no adjudications.yaml row) is correct. Self-review structure correct.
  No DISPUTED items — **this is the gate-satisfying signature.**
- **Stacy (seat — NON-gate-satisfying signal)**: **CONFIRMED** (2026-07-11). Verified her 6 audit commands resolve
  (scripts executable); no operational content lost; endorsed the sole-lock + the steward-only-tool exclusion;
  independently agreed the 5 Product-MCP tools are correctly Leonardo's (authoring-time, not her audit domain), with a
  candid note that `get_domain_object` sits near a boundary she'd reach for only in a future populated product repo
  (a cheap additive grant then, not a design error now). Flagged and cleared her own bias reflex.
- **Main loop (engineering / Thurgood-verification role)**: authored canonical source + baseline; ran the full battery
  (ten checks + coverage + generator lane + 3 tscs + root 8987/8987 + mcp-server 602/602) — all green; diff-vs-baseline
  reconciled to zero unexplained regressions; the un-routed-tools finding resolved by routing to Leonardo per his
  ruling (Peter-directed consult).
