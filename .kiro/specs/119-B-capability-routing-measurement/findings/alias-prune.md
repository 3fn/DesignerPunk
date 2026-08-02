# Findings: OB-3 Alias Prune (119-B Task 4, U3)

**Date**: 2026-08-02 (all measurements this date — D1)
**Spec**: 119-B — Capability Catalog, Routing & Measurement
**Requirement**: R4 (all ACs) · **Design**: Component 8a, Decision 6
**Status**: COMPLETE — full candidate set pruned; gate clear; zero retentions

---

## Method (Component 8a flow, executed in order)

1. **D1 re-inventory** (R4 AC1): re-grepped the backstop alias population (`aliases:` frontmatter lines matching `<X> family work` / `<X> token work` in `governance/*.md`). **Prior: 30 docs (V7 probe, 2026-07-16, point-in-time) → current: 27 docs (2026-08-02).** The delta is definitional/temporal (V7's probe method and corpus state differ from today's grep; the 27 is the operative population). All 27 lines were sole-backstop (`aliases:` carried ONLY the backstop phrase), so each prune is a whole-line deletion; the frontmatter parser treats absent and empty `aliases:` identically (`frontmatter-parser.ts:157-159` — falsy → `undefined`), verified by inspection before editing (Lina's tooling flag, cleared).
2. **Candidate assembly** (R4 AC6 bookkeeping): oracle-coverage computed against the frozen fixture (never by editing it) — 25/27 candidates map 1:1 to an axis-a oracle concept; **2 do not** (`blur token work`, `sizing token work` — no oracle concept exercises them; stricter consent bar applied).
3. **Owner consult BEFORE merge** (R4 AC5): per-owner candidate lists carrying oracle-coverage status, the measured pre-check result, and the rank-slip disclosure. **Method: spawned owner-agent consult sessions (Ada, Lina), 2026-08-02; read-only; verdicts returned as structured records** (reproduced in the table). Ada independently verified matched-field signatures via the docs MCP before ruling.
4. **Dry-run gate with candidates removed** (R4 AC2/AC3): formal run on the pruned branch corpus — **83 PASS / 0 WEAK / 0 MISS, `clearsThreshold: true`, rank-1-strong 77/83 (92.8%)**. No regression → no retentions; no partial prune.

**Pre-check (informed the consults)**: the same dry-run against a scratch corpus copy with all 27 candidates stripped produced the identical result — sole rank movement anywhere: `accessibility token work` rank 1 → 2 (still strong, still PASS); every other exercised concept held its exact prior rank (incl. `progress family work` at rank 2, its pre-prune position).

## Per-alias record (Data Models schema)

Owner confirm method for all rows: spawned owner-agent consult session, 2026-08-02. Dry-run result for all rows: gate CLEAR (83/0/0, 2026-08-02).

| alias | host doc | owner | oracle-covered? | owner confirm (date+method) | dry-run result | disposition | note |
|---|---|---|---|---|---|---|---|
| color token work | Token-Family-Color.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| typography token work | Token-Family-Typography.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| spacing token work | Token-Family-Spacing.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| shadow token work | Token-Family-Shadow.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| motion easing token work | Token-Family-Motion.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| border token work | Token-Family-Border.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| radius token work | Token-Family-Radius.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| opacity token work | Token-Family-Opacity.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| blend token work | Token-Family-Blend.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| glow token work | Token-Family-Glow.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| layering z-index token work | Token-Family-Layering.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| responsive token work | Token-Family-Responsive.md | ada | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| accessibility token work | Token-Family-Accessibility.md | ada | yes | CONFIRM 2026-08-02 consult | rank 2 strong (was rank 1) | pruned | Rank slip disclosed pre-verdict; Ada: "strong at rank 2 is materially equivalent for discovery"; soft override invitation on record if rank-1 primacy is weighed higher |
| blur token work | Token-Family-Blur.md | ada | **no** | **CONSENT-REMOVE** 2026-08-02 consult | not oracle-exercised | **removed-as-residual-risk** | R4 AC6: consent by structural analogy (matched-field signature identical to the 13 measured-clean docs), explicitly NOT measurement; reversible |
| sizing token work | Token-Family-Sizing.md | ada | **no** | **CONSENT-REMOVE** 2026-08-02 consult | not oracle-exercised | **removed-as-residual-risk** | Same basis as blur; Ada flagged this as a confidence call, on record |
| avatar family work | Component-Family-Avatar.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| button family work | Component-Family-Button.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| badge family work | Component-Family-Badge.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| container family work | Component-Family-Container.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| chip family work | Component-Family-Chip.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| divider family work | Component-Family-Divider.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| data display family work | Component-Family-Data-Display.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| icon family work | Component-Family-Icon.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| modal family work | Component-Family-Modal.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| loading family work | Component-Family-Loading.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |
| progress family work | Component-Family-Progress.md | lina | yes | CONFIRM 2026-08-02 consult | rank 2 strong (unchanged) | pruned | Rank 2 is this concept's pre-prune position; zero movement |
| navigation family work | Component-Family-Navigation.md | lina | yes | CONFIRM 2026-08-02 consult | rank 1 strong | pruned | |

**Tallies**: 27 candidates → 25 pruned (oracle-measured), 2 removed-as-residual-risk (owner consent, R4 AC6), 0 retained-on-regression, 0 retained-on-objection.

## Post-prune state

- Backstop alias population: 27 → **0** (2026-08-02).
- Discovery gate: **CLEAR** on the tie-breaker alone — the OB-3 done-when ("redundant family aliases removed with a dry-run confirming the gate still clears on the tie-breaker alone") is satisfied.
- Rank-1-strong signal: 78/83 (93.98%) → **77/83 (92.8%)** — the disclosed, owner-accepted accessibility slip; well above the 80% review tripwire.
- Docs index rebuilt post-prune (R11 AC5): healthy, 83 docs, 0 errors/warnings (2026-08-02).

## Flags surfaced by the consults (out of prune scope, recorded for routing)

1. **Form-inputs aliases drift (Lina's ruling: drift-flag-for-fix)**: `Component-Family-Form-Inputs.md` carries no family backstop and its aliases line is RTL/i18n vocabulary (`RTL, internationalization, i18n, bidi, right-to-left, text direction`) backed by only two passing RTL bullets in the doc body. Not blocking (title tie-breaker resolves `form input family work` at rank 1 strong). Routed to Lina as a separate owner action — flagged as a background-task chip from this session, 2026-08-02.
2. **Ada's revisit hook**: if future discovery evidence shows `blur`/`sizing` queries missing, re-seeding those two aliases is the cheap reversal; this table is the record that their removal was consented inference, not measurement.
