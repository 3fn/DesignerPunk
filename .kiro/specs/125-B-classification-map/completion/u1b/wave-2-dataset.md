# Wave 2 — Window Dataset (Task 5.3, 5.W step (d))

**Status**: **CLOSED at pass 3 (2026-08-27) — N = 14 observed** (close condition N=10 crossed inside the pass-3 batch; A2 overshoot counts the ENTIRE closing batch, J3 precedent). Wave verdicts filled below (5.W(e)). *(Created at the wave-2 prune merge per campaign protocol §7/§8, recorded at observation pass 2 — event-anchored.)*
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
| 2 | #136 | fix/token-quick-reference-mode-resolution | 2026-08-26T02:28:40Z | `09fa9dd863fd` | GREEN (19/19) | TQR mode-resolution fix (Ada); touched Wave-A1 surface 6 (CDG) — staleness log below |
| 3 | #137 | chore/dtcg-consumer-answer | 2026-08-26T02:44:51Z | `70689573a695` | GREEN (19/19) | divergence-issue ledger record |
| 4 | #138 | chore/custom-validation-ruling | 2026-08-26T03:02:22Z | `12f107273aec` | GREEN (19/19) | content-debt ledger ruling record |
| 5 | #139 | chore/health-check-2026-08-25 | 2026-08-26T03:17:08Z | `7754c51541ba` | GREEN (19/19) | monthly Civitas health check — judgment INCLUDE J-C3 (campaign dataset) |
| 6 | #140 | chore/gitignore-collab-vault | 2026-08-26T03:43:04Z | `5285db33d1e5` | GREEN (19/19) | .gitignore guard — judgment INCLUDE J-C4 |
| 7 | #141 | chore/verification-grade-reviews | 2026-08-26T13:26:19Z | `3baacfec26ca` | GREEN (19/19) | review-standard addendum — judgment INCLUDE J-C5 |
| 8 | #142 | chore/release-14.1.0 | 2026-08-26T13:35:40Z | `68362b18d136` | GREEN (19/19) | v14.1.0 version bump + notes |
| 9 | #143 | chore/androidbuilder-dead-path | 2026-08-26T14:11:39Z | `5562393d0fab` | GREEN (19/19) | dead-code sweep |
| 10 | #144 | chore/readme-version-badge | 2026-08-26T14:12:11Z | `9b3a9536c1a8` | GREEN (19/19) | README badge fix |
| 11 | #145 | chore/androidbuildvalidator-orphan | 2026-08-26T14:28:08Z | `e6ebb2dbeac0` | GREEN (19/19) | dead-code sweep |
| 12 | #146 | chore/ios-web-dead-build-paths | 2026-08-26T14:41:16Z | `7fcd06134d43` | GREEN (19/19) | dead-code sweep |
| 13 | #147 | chore/shadowgenerator-sweep | 2026-08-26T14:48:10Z | `3dac2ef9d93a` | GREEN (19/19) | dead-code sweep |
| 14 | #148 | chore/motion-formatter-rename | 2026-08-26T15:04:38Z | `15ea30eacbdd` | **INDETERMINATE** (A1: zero concluded checks on pinned SHA) | 2026-08-26 GitHub Actions outage wedged first-push suites; empty-retrigger second push 20/20 green; never converted per A1 |

*(**CLOSED at pass 3, 2026-08-27 — N=14** (1 + the 13-PR pass-3 batch; N=10 crossed in-batch, A2 counts the whole batch). Pinning identical to the wave-1 dataset's pass-3 note — one reconstruction, two windows (waves overlap per P3). #135 excluded (class-3 instrument, campaign table). Judgment inclusions J-C3/J-C4/J-C5 recorded in the campaign dataset, open for Peter's ratification at this pass PR's merge.)*

## W2 re-accretion scan log (per observation pass; recipe = grep added lines on Wave-A1 paths for Wave-A2 patterns)

| Pass | Date (UTC) | Scan range | A2 hits on added lines | Verdict contribution |
|------|-----------|------------|------------------------|----------------------|
| 0/1 (wave open + pass 2) | 2026-08-26 | `1301c2de..7ce889bc` (#134 only) | **ZERO** on added lines (all 5 patterns); live-tree grep at `7ce889bc` across ALL Wave-A1 education surfaces: **ZERO** (application-time verification, ballot §"What this ballot ratifies") | W2 clean at open |
| 2 (session-start = wave close) | 2026-08-27 | `7ce889bc..2a6fdfc4` (#135 through #148) | **ZERO** on added lines scoped to Wave-A1 education surfaces (all 5 patterns). *(Full-range unscoped grep shows 5 hits — ALL in this dataset file itself, #135's transcription of the frozen A2 literals: instrument artifact, not on an A1 surface, not re-accretion.)* Live-tree grep at `2a6fdfc4` across all Wave-A1 education + generated surfaces: **ZERO** | W2 clean at close |

## W3 churn log (report-only; console-fail allowlist entries added per PR)

| PR | Entries added |
|----|---------------|

*(none — `src/__tests__/console-allowlist.json` unchanged in the range. Pass 3, 2026-08-27: unchanged in `7ce889bc..2a6fdfc4`. **Window total: ZERO entries.**)*

## Staleness / segment notes (wave-grain)

- Wave windows carry NO baseline and NO segments (campaign protocol §1) — W2/W3 per-wave; W1 lives on the shared campaign window.
- **Pass 2 (2026-08-26)**: #134 touched Wave-A1 surface 1 (CDS — the disabled-prop example fix): logged per the staleness arm; content is adjudication-conforming education, zero A2 patterns, NOT re-accretion. #132 merged pre-open (its extensive A1-surface edits — CT/CIS/CDS/family docs — predate the window by seconds and are the sequenced companion repair, not window events).
- **Pass 3 (2026-08-27, wave close)**: ONE Wave-A1 surface touched in `7ce889bc..2a6fdfc4` — **#136 edited Component-Development-Guide.md** (surface 6, education-only): Ada's Level-1/Level-2 dark-mode semantics correction in the workflow list (:1879), zero A2 patterns, WCAG-contract territory untouched — adjudication-conforming education edit, NOT re-accretion. Not a 122 regen, not exogenous — no segment. Generated surfaces (lina.md, CLAUDE.md) untouched — anomaly scan clean.

## Wave verdicts (5.W(e) wave record — filled at close, pass 3, 2026-08-27)

- **W2 (re-accretion): MET** — zero Wave-A2 hits on added lines scoped to Wave-A1 education surfaces across all passes; live-tree grep at close zero; anomaly scan clean; the one in-window A1-surface edit (#136/CDG) was adjudication-conforming education. Nobody re-taught the pruned WCAG-checklist imposters.
- **W3 (churn, report-only): ZERO** — no console-allowlist entries added by any of the 14 observed PRs.
- **W1 context (campaign-grain, cited per 5.W(e))**: campaign dataset at this wave's close — segment 2 n=16 f=0 (e=1.6, f ≤ e+1), evaluable, **W1 MET as-of-pass informationally**; boundary events 1 of K=3; one INDETERMINATE (#148, Actions outage). Roll-up per A3 at campaign close.
- **Interpretive notes (ambiguity discipline) — this wave's zero is WEAKER evidence than wave 1's, stated candidly**: (1) wall-clock span ~13h open→last-observed-PR-created (datum, never a criterion — but the window is effectively ONE burst); (2) 12 of 14 observed PRs are chores, mostly release mechanics + dead-code sweeps that never approach component-governance territory — exposure to the pruned rules' territory was thin (#134 and #136 are the only component-doc-adjacent PRs); (3) the freeze-time limitation compounds: A2 detects the STRING, not the idea. W2 MET is honest on its own terms; the closeout (5.Z) should weight this wave's W2 accordingly, not read it as 14 independent exposures.
- **Chafe line (mandatory)**: stop-and-wait friction incidents under armed gates observed this wave: **one** — the **#148 Actions-outage wedge** (shared with wave 1's chafe line: required checks unconcludable, empty-retrigger needed, merge delayed ~33h; infrastructure-caused, not gate-design-caused). Otherwise none-observed.
