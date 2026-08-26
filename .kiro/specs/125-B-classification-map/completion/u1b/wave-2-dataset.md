# Wave 2 — Window Dataset (Task 5.3, 5.W step (d))

**Status**: **OPEN** — created at the wave-2 prune merge per campaign protocol §7/§8 (recorded at observation pass 2, the first pass after the merge — event-anchored, not late: the merge and the pass occurred in the same burst).
**Prune merge (wave open)**: PR #133, squash `1301c2de`, 2026-08-26T01:57:03Z.
**Ballot**: `.kiro/docs/ballots/2026-08-25-wave-2-component-test-gov-prune.md` (RATIFIED Peter 2026-08-25, record-first; revert path recorded there).
**Sequencing honored**: Lina's contract-name education-drift repair (PR #132, squash `e119e6cb`) merged 2026-08-26T01:56:48Z — 15 seconds BEFORE this wave's prune, per Peter's before/with ruling. The compound-exposure window never opened.
**Close condition**: N = 10 observed PRs (event-denominated). Observation passes are cadence-free under reconstruction-by-default (A1): wave open, opportunistically at session starts while open, and at close.
**Observed PR** (DD6, all required): opened AFTER 2026-08-26T01:57:03Z; head branch `task/*`, `fix/*`, or `chore/*`; not on the exclusion table (campaign dataset holds the shared exclusion table — one table, all datasets cite it).
**First-push definition**: FAILURE iff any required-context check on the A1-pinned first-push SHA concluded `failure`. Scoring set = the campaign's frozen 19 contexts (campaign dataset header; "present on the pinned SHA" handles any context that stops running — the sweep-5 rule).

---

## Appendix Wave-A1 — Surfaces (FROZEN at wave open, from the ratified diff; assessment §6b is the emission source)

1. `governance/Component-Development-Standards.md` — pruned/rewritten (W2-1/W2-2/W2-4; scanned rationale includes the :804–:829 stale block per consult R2-1)
2. `governance/platform-implementation-guidelines.md` — pruned (W2-3)
3. `governance/Contract-System-Reference.md` — rewritten (W2-5)
4. `governance/Component-MCP-Document-Template.md` — education-only (scanned; re-accretion INTO it is a hit)
5. `governance/Test-Behavioral-Contract-Validation.md` — education-only (scanned)
6. `governance/Component-Development-Guide.md` — education-only (scanned)
7. `governance/Component-Inheritance-Structures.md` — education-only (scanned)
8. Component family docs (`governance/Component-Family-*.md`) — education-only (scanned)
9. `governance/Component-Templates.md` (:699–:849 rationale) — education-only, added per consult R2-4 MEDIUM: the U1 hazard's primary surface; the window watches the surface most likely to regenerate drift
10. `.claude/agents/lina.md` + `CLAUDE.md` — generated (anomaly-scan only, NEVER W2-counted: a pruned pattern reappearing on a generated surface without a source change is an ANOMALY)

## Appendix Wave-A2 — Pattern literals (FROZEN at wave open; the pruned/rewritten OLD forms, verbatim — rewritten/retained NEW forms are NOT hits)

1. `- [ ] Contracts reference valid WCAG criteria`
2. `- [ ] **Contracts Reference WCAG**: Accessibility contracts include WCAG criterion references`
3. `- [ ] WCAG references included for accessibility contracts`
4. `WCAG-referenced contracts must have: wcag field`
5. `(null if not applicable)` — scoped to CSR's `wcag` field-table row only
*(Accepted limitation, recorded at freeze per consult R2-4 NIT: A2 detects the STRING, not the idea — a re-phrased re-accretion scores zero; the closeout must not over-read A2 zero-hits.)*

## Observed-PR table (to N=10)

| # | PR | branch | createdAt | pinned first-push SHA | first-push result | notes |
|---|----|--------|-----------|------------------------|-------------------|-------|
| 1 | #134 | fix/cds-disabled-prop-example | 2026-08-26T01:58:19Z | `306f21066f32` | GREEN (19/19 concluded success) | CDS disabled-prop fix + content-debt ledger; opened 76s after wave open; also wave-1 row 7 + campaign row 5 |

*(**1/10 at pass 2 (wave open + first observation in one pass)** — A1 reconstruction: single-commit PR, `committedDate ≤ createdAt`.)*

## W2 re-accretion scan log (per observation pass; recipe = grep added lines on Wave-A1 paths for Wave-A2 patterns)

| Pass | Date (UTC) | Scan range | A2 hits on added lines | Verdict contribution |
|------|-----------|------------|------------------------|----------------------|
| 0/1 (wave open + pass 2) | 2026-08-26 | `1301c2de..7ce889bc` (#134 only) | **ZERO** on added lines (all 5 patterns); live-tree grep at `7ce889bc` across ALL Wave-A1 education surfaces: **ZERO** (application-time verification, ballot §"What this ballot ratifies") | W2 clean at open |

## W3 churn log (report-only; console-fail allowlist entries added per PR)

| PR | Entries added |
|----|---------------|

*(none — `src/__tests__/console-allowlist.json` unchanged in the range)*

## Staleness / segment notes (wave-grain)

- Wave windows carry NO baseline and NO segments (campaign protocol §1) — W2/W3 per-wave; W1 lives on the shared campaign window.
- **Pass 2 (2026-08-26)**: #134 touched Wave-A1 surface 1 (CDS — the disabled-prop example fix): logged per the staleness arm; content is adjudication-conforming education, zero A2 patterns, NOT re-accretion. #132 merged pre-open (its extensive A1-surface edits — CT/CIS/CDS/family docs — predate the window by seconds and are the sequenced companion repair, not window events).

## Wave verdicts (filled at wave close, 5.W(e))

- W2 (re-accretion): *(pending)*
- W3 (churn, report-only): *(pending)*
- Chafe line (mandatory, 5.W(e)): *(pending — "stop-and-wait friction incidents under armed gates observed this wave: <incidents or none-observed>")*
