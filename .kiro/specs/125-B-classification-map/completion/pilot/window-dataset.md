# U1 Pilot — Window Dataset

**Created**: 2026-08-02 (first observation pass — LATE; see Deviations)
**Maintained by**: hand transcription per measurement-protocol.md §5–§6 (no standing tooling)
**Path authority**: designated by measurement-protocol.md §6 (`completion/pilot/window-dataset.md`)
**Status**: WINDOW OPEN — nothing here is a closeout verdict; per-pass tallies only. 125-B Task 3.1 is NOT complete.

---

## Header

- **Prune merge (U1-p / window open)**: `4992e59263c3bf4028df4db90fb2f5bfe41f1db1` — PR #77, merged **2026-07-14T20:25:29Z**
- **Required-check set (frozen at this pass, from branch protection — 18 checks)**: Consumer Guard · Check package name drift · lane-typecheck · lane-build-validate · lane-functional-root · lane-mcp-server-suite · lane-application-mcp-server-suite · 122-diff-guard · 122-canonical-vs-truth · 122-sweep-1-refs · 122-sweep-2-skills · 122-sweep-3-dupes · 122-sweep-4-ambient · 122-sweep-5-corrected-state · 122-sweep-6-declarations · 122-sweep-7-dispositions · 122-sweep-8-demotion · 125B-tool-boot-smoke
  - *Failure definition (frozen)*: first-push FAILURE iff any check from this set present on the pinned SHA concluded `failure`. Older SHAs may carry a subset (e.g., 17 of 18 pre-#75, before `125B-tool-boot-smoke` existed) — checks absent from a SHA are not counted either way.
- **Baseline B = 1** (see Baseline section — COMPUTED LATE, recorded deviation)
- **Window-open timestamp**: 2026-07-14T20:25:29Z

### Late-observation reconstruction decision (recorded method — Deviations D1)

This first pass ran 2026-08-02, ~18 days after window open (protocol cadence: every 2–3 days). All qualifying PRs were already merged, so "head SHA at first observation" (DD6) would capture post-review pushes and misreport first-push outcomes. **Method used instead, per DD6's first-push INTENT**: each PR's first-push head SHA was reconstructed as the last commit in the PR's commit list with `committedDate ≤ createdAt + 120s`; check-runs were then queried against that SHA. PRs where reconstruction was impossible or the reconstructed SHA carries no concluded required checks are recorded **INDETERMINATE** (never converted to a pass). Reconstruction materially differed from the current head for PRs #86, #88, #93 (post-open pushes present); it was identity for the rest.

---

## Deviations (recorded, not silent — §7 adjacency flagged for Peter)

- **D1 — Late first observation pass** (day ~18 vs the 2–3-day cadence): handled via the reconstruction method above. Cadence is operational hygiene, not a criterion (§5.1 note); no criterion is amended.
- **D2 — Baseline B computed LATE** (2026-08-02, after window open; §3.1 says "computed ONCE, before the window opens"). No pre-window computation exists in any 125-B completion doc (searched 2026-08-02). The computation is a deterministic historical query (pinned SHAs + concluded check-runs cannot change retroactively), so lateness cannot have altered its value — but per §7's spirit Peter MAY rule W1 INDETERMINATE on this ground; flagged, not self-adjudicated.
- **D3 — PR #86 first-push outcome INDETERMINATE** (see table note).

---

## Baseline (B = 1)

20 most recent qualifying PRs preceding the prune merge (filter `task/*|fix/*|chore/*`; #76 excluded — §4.2 gate-bite, never merged):

**#57, #58, #59, #60, #61, #62, #63, #64, #65, #66, #67, #68, #69, #70, #71, #72, #73, #74, #75, #77**

- First-push failures among these 20: **ONE** — **#61** (`task/122-cutover-leonardo`, pinned `1392f08a`, failing required check: `lane-mcp-server-suite`). All other 19 pinned SHAs: all present required checks concluded, zero failures.
- **Composition judgment (recorded)**: #77 (the prune PR itself) is included mechanically — its `createdAt` (20:14:20Z) precedes the prune merge (20:25:29Z) and it is not §4-excluded (its purpose is the prune, not instrumentation). Alternate composition (exclude #77, slide in #56): #56's final head is green; under either composition and either resulting B ∈ {1, 2}, the current W1 verdict below is unchanged. 
- Pinned baseline SHAs (first-push, reconstructed): 57:`eb1b8819` 58:`8824898b`* 59:`ddcbcb9b` 60:`e6f46727` 61:`1392f08a` 62:`74a8f708` 63:`3fa28d8c` 64:`630afd6b` 65:`75ff4d28` 66:`cdc237bf` 67:`ef0e7452` 68:`52bbdbbf` 69:`0b333dbf`* 70:`f5760fc0` 71:`21fc0dd4` 72:`af506a01` 73:`a12e846d` 74:`9256dabd` 75:`6bccd016` 77:`2772d4bb`  *(full 40-char SHAs in the observation-pass working record; prefixes here for legibility — 58:`8824898bfd`→`8824898fbd`, 69:`0b333dfbff`)*

---

## Observed-PR table (segment assignment by createdAt vs boundary; all current observed PRs fall in segment 2)

| # | PR | branch | createdAt | pinned SHA (first-push) | first-push result | segment |
|---|----|--------|-----------|--------------------------|-------------------|---------|
| 1 | #80 | chore/119-B-inbound-from-125-B | 2026-07-15T14:06:44Z | `47440622aa` | PASS (0 required-check failures) | 2 — **INCLUSION PENDING PETER (judgment call J1)** |
| 2 | #81 | task/126-avatar-decorative-warn | 2026-07-15T14:19:41Z | `6b5bcaf76c` | PASS | 2 |
| 3 | #82 | fix/button-cta-remove-disabled-state | 2026-07-15T15:22:20Z | `89309e3e94` | PASS | 2 |
| 4 | #83 | chore/deprecate-blend-disabled-desaturate | 2026-07-15T15:55:15Z | `38ef254097` | PASS | 2 |
| 5 | #84 | fix/input-text-native-disabled-cleanup | 2026-07-15T16:25:18Z | `419c32f1ce` | PASS | 2 |
| 6 | #85 | chore/no-disabled-states-governance-docs | 2026-07-15T16:42:46Z | `33c10513c7` | PASS | 2 |
| 7 | #86 | fix/input-text-native-base-alignment | 2026-07-15T17:12:39Z | `1cb97c415f` | **INDETERMINATE** — reconstructed first-push SHA received ZERO concluded required checks (superseded by a push at +6m33s, `e3094007a4c8`, which ran 19 checks green; the successor is NOT the first push and is not substituted) | 2 |
| 8 | #87 | chore/component-dev-guide-no-disabled-states | 2026-07-15T17:23:43Z | `a4e50bbdba` | PASS | 2 |
| 9 | #88 | chore/stemma-disabled-residue | 2026-07-15T19:01:24Z | `b928d407d8` | PASS (3 post-open pushes existed; first push green) | 2 |
| 10 | #89 | chore/token-docs-disabled-residue | 2026-07-15T19:10:03Z | `d7f09e0600` | PASS | 2 |
| 11 | #90 | chore/spec-planning-disabled-residue | 2026-07-15T19:12:27Z | `f791c5a7ad` | PASS | 2 |
| 12 | #91 | fix/input-text-readonly-b-prime | 2026-07-15T20:45:23Z | `f8deba37f2` | PASS | 2 |
| 13 | #92 | chore/readonly-prototype-deferral | 2026-07-15T21:04:49Z | `e0f53bcfb9` | PASS | 2 |
| 14 | #93 | chore/apply-state-readonly-ballot | 2026-07-15T21:39:50Z | `efca4f7c55` | **FAILURE** — required check `122-diff-guard` concluded failure on first push (fixed in 2 subsequent pushes; per DD6 the later green never replaces the pin) | 2 |
| 15 | #94 | chore/119-B-formalization | 2026-08-02T03:50:48Z | `ff53bebacc` | PASS | 2 |

## Exclusion table (§4)

| PR | Reason |
|----|--------|
| #78 (`task/125-B-u2`) | §4.1 explicit — U2's console-fail arming PR |
| #79 (`chore/125-B-u2-gate-bite`) | §4.2 explicit — gate-bite throwaway (engineered failure; CLOSED, never merged) |
| #76 (`chore/125-B-smoke-gate-bite`) | §4.2 (baseline-side) — Task 1.6 smoke gate-bite (CLOSED, never merged; pre-window, listed for baseline completeness) |
| #80 (`chore/119-B-inbound-from-125-B`) | **J1 — JUDGMENT CALL, PETER RULES.** Thurgood's recommendation: **INCLUDE as observed.** It is cross-spec handoff documentation authored as ordinary work; §4.3 targets self-referential instrumentation (PRs that measure or arm the measurement), which this is not. Counter-argument: it is 125-B-adjacent content by a prune-aware author — but §4's honesty note already concedes universal prune-awareness at solo scale; adjacency is not instrumentation. Tally reported both ways below. |
| (this PR) `chore/125-B-window-dataset` | **J2 — JUDGMENT CALL, PETER RULES (self-referential case, recorded either way per §4.3).** Thurgood's recommendation: **EXCLUDE** — its sole purpose is 125-B instrumentation (transcribing the window dataset); it is the §4.3 class par excellence. If Peter rules INCLUDE, its own first-push outcome gets pinned at next pass. |

## Segment log

| segment | opened-by (event) | boundary timestamp | n (observed) | f (first-push failures) | W1 (as-of-pass) | W2 (as-of-pass) |
|---------|-------------------|--------------------|--------------|-------------------------|------------------|------------------|
| 1 | Window open (U1-p merge `4992e592`) | 2026-07-14T20:25:29Z | 0 | 0 | INDETERMINATE (n<5, not evaluable) | **MET** (zero A1-surface commits) |
| 2 | **§4 material-change event: U2 console-fail arming merged** — PR #78, merge `6df1375a` (a new first-push failure source; DD8 segment, N never resets) | 2026-07-14T22:44:48Z | 14 (15 if J1=include) | 1 (#93) | **MET** — e = B×(n/20) = 1×(14 or 15/20) → 1; f=1 ≤ e+1=2. Robust: MET even if #86's indeterminate were counted as a failure (f=2 ≤ 2) and under either J1 ruling and either baseline composition (B∈{1,2}) | **MET** (zero A1-surface commits; verified independently 2026-08-02) |

- **Segment-boundary note**: the §5.3 staleness scan found ZERO commits touching any Appendix-A1 surface since the prune merge (`git log 4992e592..origin/main -- <4 A1 paths>` → empty — verified this pass, not inherited from briefings). The single boundary event is the §4 U2-arming trigger, which the protocol names explicitly. **Boundary events used: 1 of K=3.**
- **Roll-up reading (recorded)**: per §3.2, segment 1's not-evaluable W1 does not block a MET roll-up ("MET in every evaluable segment AND ≥1 evaluable"); the clause-3 "any indeterminate segment" catch is read as the evaluable-but-f=e+2 case. If Peter reads §3.2 differently, the roll-up is INDETERMINATE, not MET — flagged, not silently resolved.

## Wall-clock record (§5.2 — datum, never a criterion)

- Window open: 2026-07-14T20:25:29Z
- Segment 1 → 2 boundary: 2026-07-14T22:44:48Z (span: 2h 19m)
- Segment 2: open as of this pass (2026-08-02; span to date ≈ 18.2 days)
- Window close: pending (closes at the 20th observed PR's observation)

## Churn log (§5.4 — ACTIVE: U2 armed mid-window at the segment-2 boundary)

| PR | entries added (parsed objects) | note |
|----|-------------------------------|------|
| #81 | 1 | An in-place REPLACEMENT of an existing Avatar entry (1 removed, 1 added — pattern updated to the Spec 126 message string; entry self-describes as retained safety net, not a live suppression). Net-new suppressions: 0. |

## Current tally (as of pass 1, 2026-08-02)

- **Observed: 14 of N=20** (15 if Peter rules J1=include) — 5–6 slots remain; 119-B execution PRs are the expected fill.
- **Segments: 2; boundary events 1 of K=3.**
- **W1 (as-of-pass roll-up): MET** (segment 2; segment 1 not evaluable) — subject to the D2 late-baseline flag and the roll-up-reading note.
- **W2 (as-of-pass roll-up): MET** (both segments; zero A1 touches, zero A2-pattern reintroductions).
- **W3 (report-only): 1 allowlist entry-replacement, 0 net-new** since arming.
- **INDETERMINATE entries: 1** (#86 — first-push SHA has no concluded checks; superseded pre-conclusion).

*Next pass: resume 2–3-day cadence while the window is open; pin any new qualifying PRs at observation (normal DD6 pinning — the reconstruction method above applies only to this late pass's backlog).*
