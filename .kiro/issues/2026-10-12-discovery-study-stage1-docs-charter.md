# Discovery study, Stage 1 (docs side) — blind product-seat queries against the shipped lexical matcher (CHARTER + PRE-REGISTRATION CONTRACT)

**Date**: 2026-10-12
**Type**: **CHARTER** carrying the pre-registration contract for Stage 1 of the discovery shadow study. Not a ballot; no governance law changes.
**Authority**: Peter's F2-docs ruling, 2026-10-12 ("charter Stage 1 NOW"), recorded in `2026-10-07-discovery-shadow-study-charter.md` § 6 (commit `339532626`). The design is that charter's § 3; this file narrows it to Stage 1 and fixes what the study charter left open.
**Status**: **CHARTERED — Stage 1 authorized.** Stage 2 is NOT authorized by this file; it is decided by the outcome rules in § 5 and Peter's ruling on them.
**Owner**: **Thurgood** (calibration set, sealed prompt, keys, wrapper, run, findings). **Seats (blind authors, no grant)**: Leonardo (lead), Sparky, Kenya, Data, Stacy. **Miss bucketing**: each doc's domain owner (Ada token docs, Lina component docs, Thurgood governance docs). **Orchestrator**: independent check of the miss table (Thurgood's declared conflict: he owns the docs rubric a null vindicates) and of commit order.
**Trigger**: **this charter's merge** → Thurgood authors the calibration set and the sealed prompt; the orchestrator runs the four seat consults (Sparky, Kenya, Data, Stacy). **Leonardo's Settings-screen ledger closing** (`2026-10-12-leonardo-settings-screen-call-ledger-charter.md`) → his blind consult. **All five seats' raw queries captured** → the pre-registration + run PR opens.
**Grant paths** (Thurgood only; the one pre-registration + run PR; activated per `.kiro/issues/README.md` item 8 — the PR body names this file and these paths, and carries the ARMING line for both merges):
- `scripts/__fixtures__/discovery-calibration-only.ts` — the calibration-only set (§ 1a)
- `scripts/__fixtures__/discovery-q2-seats.ts` — the Q2 fixture: seat queries with keys, negatives keyed strict-none
- `mcp-server/src/discovery-dry-run/study-scoring.ts` and `mcp-server/src/discovery-dry-run/__tests__/study-scoring.test.ts` — the scorer wrapper (pure) and its pinning tests
- `scripts/discovery-study-stage1.ts` — the CLI runner (imports the oracle and Q2 read-only)
- `.kiro/docs/discovery-study-stage1-seat-queries.raw.md` — the seats' verbatim answers, committed before keying
- `.kiro/docs/discovery-study-stage1-findings.md` — the findings doc

  **All seven are outside Thurgood's charter scope** (`src/__tests__/**`, `.kiro/specs/**`, `docs/specs/**`, `lane-timing.yml`); that is why they are listed. Nothing under `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` or `.github/**`. The docs matcher (`mcp-server/src/query/**`) is deliberately NOT granted: Stage 1 does not tune the thing it measures.
**Consulted**: Lina — components-shaped seat queries are HELD as raw input for the suspended components round, not sealed (Stage 0 merged, #303) and never a Q3 fixture; the ~8 `tool-boundary.contract.test.ts` queries are the components calibration source (both her rulings in the study charter). Leonardo — **read OWED** on the ordering in § 4 and on his query count; the orchestrator requests it before the pre-registration PR opens, not before this charter merges.

---

## 1. Scope (Stage 1 as settled in the study charter § 3)

**a. Calibration-only set, FIRST, before any seat writes.** About 8 docs near-miss negatives (on-corpus vocabulary, no doc answers) authored by Thurgood, plus the 8 components keyword queries copied verbatim from `application-mcp-server/src/__tests__/tool-boundary.contract.test.ts` (`button`, `container`, `input`, `login`, `onboarding`, `onboarding flows`, `primary action button`, `text input field`; source SHA recorded). Frozen at the pre-registration commit; **never scored**. Its only use is setting floors and prompts if Stage 2 runs (prompt iterations ≤ 5, each logged in the findings doc). Stage 1's lexical arm needs no floor.

**b. Blind seat queries.** Leonardo ~15–20 (lead; the consumer's voice), Sparky / Kenya / Data / Stacy ~10 each, written without seeing the index (§ 4). Each seat also writes 2 "I'd look for this but suspect it isn't documented" queries. Each query carries the seat's intended tool and a one-line intent. Leonardo's "would a product architect ask this" filter runs **before the freeze**; a dropped query is recorded with its reason, never silently removed.

**c. Routing.** `find_docs`-shaped queries → Q2. Components- or token-shaped queries → HELD in the raw file as input for the suspended components round; they are not scored here and are never copied into a Q3 fixture as-is (anything later drawn from them is flagged pre-exposed).

**d. Keys.** Thurgood writes a **single-answer** key per Q2 positive (a doc `id`, like the oracle). A query with no single defensible answer is dropped before the freeze with the reason recorded. Seat "probably undocumented" queries plus Thurgood near-miss negatives (author tagged) make up ~8 negatives, keyed **strict-none** after checking that no doc answers them.

**e. Run the lexical arm (A) only**, at the pre-registration commit, on Q2 and on the oracle (regression only).

**f. Bucket every Q2 miss** (PASS failed under A's own rule): tokenizer/rank defect | alias- or metadata-fixable | structural. The doc's domain owner rules the bucket; the orchestrator checks the table. Tokenizer/rank defects in the docs matcher are filed as a separate Thurgood issue; they are not fixed in this PR and do not count toward the gate.

## 2. Pre-registration contract

- **Commit order on the PR branch**: (1) raw seat queries; (2) the pre-registration commit — calibration set, Q2 fixture with keys, the rules in § 5, the wrapper and its tests; (3) the results commit — the findings doc. Squash-merge flattens this on `main`, so the findings doc records the branch SHAs of (1) and (2), and the orchestrator's PR-body note records that (2) precedes (3).
- **Scorer wrapper** (`study-scoring.ts`, pure; `scoreConcept` unchanged):
  - positives: **rank-only R@1 / R@2** for A, alongside **A's tiered PASS** (rank ≤ 2 AND tier ∈ {strong, partial}) on its own line. The wrapper never relies on `scoreConcept`'s missing-tier→`partial` default.
  - negatives: **correct iff no `strong` in the top 3** (F6 ruled); the rank-1 and top-2 subsets are reported alongside. `none` rate is reported descriptively only (A returns `none` only when no salient token matches any field). Negatives go through their own branch (an empty key would score MISS in `scoreConcept`).
  - **Fork F6 RULED 2026-10-12 (Peter): top THREE.** Confident-wrong is counted anywhere in ranks 1–3; the rank-1 and top-2 subsets are reported alongside. The wrapper records the rank of every `strong`.
- **Oracle**: imported read-only; `git diff --exit-code main -- scripts/__fixtures__/discovery-oracle.ts` must exit 0 at the results commit. Q1 is A's regression check only — it is A's training set and cannot compare arms. Today's baseline: 83/0/0, rank-1-strong 77/83.
- **No CI run** and no new check context. Tests run as `cd mcp-server && npx jest src/discovery-dry-run` (the root `npm test` does not run mcp-server suites; the findings doc says which ran). A is deterministic: the findings doc records the command and SHA; anyone can re-run it.
- **Answer-key errors** found after the results commit are counted and excluded, never edited.

## 3. Contamination rules

- No edit to the docs matcher, to any doc's aliases, or to any `governance/**` file in the study PR.
- A query that restates a routing cue from its own seat's charter (doc id or routed section title) is flagged **cue-exposed** by string compare: the seat would follow the cue, not search.
- Leonardo's queries that match one of his Settings-screen ledger's `find_docs` arguments (string compare) are flagged **pre-exposed**; flagged rows are reported separately.
- Once aliases are hand-seeded from Q2 misses (§ 5), those Q2 items become training data like the oracle; the findings doc says so, and any later study treats them as spent.

## 4. Authorship mechanics and ordering

- **Sealed prompt** (Thurgood authors, committed in commit (1) with the answers): write the queries you would type to find GUIDANCE while doing your work here; do not call any MCP tool or read `governance/` before answering; for each, the tool you'd use and one line of intent; plus the 2 "probably undocumented" queries.
- The orchestrator runs each seat as a **read-only consult with no tool calls**, relays the answer verbatim; Thurgood pastes it into the raw file unedited.
- **Leonardo writes his blind queries AFTER his Settings screen's ledger closes.** Why: the ledger is the evidence the Stage 2 components decision rests on (keyword share ≥ 25 %), and a query-writing exercise first would prime him toward keyword search; the reverse exposure is measurable from the ledger itself (§ 3). The four other seats are not blocked and go first.
- **Cost per seat**: ~0.25 session each (Sparky, Kenya, Data, Stacy); Leonardo ~0.5.

## 5. Outcome rules (pre-registered; counts are gate-counted misses = fixable + structural)

- **Gate: ≤ 3** → hand-fix, findings doc, stop.
- **O1: ≤ 3 structural AND ≤ 8 fixable** → hand-fix, findings doc, close; Stage 2 not run.
- **O2: ≥ 9 fixable AND ≥ 70 % of gate-counted misses** → findings recommend chartering an offline alias-proposal tool (any model; a human confirms before anything lands); Peter rules whether Stage 2 runs to inform the tool's model choice.
- **O3: ≥ 4 owner-confirmed structural** → Stage 2 goes to Peter for ruling; any live-path change it later motivates is a ballot.
- With tokenizer defects excluded, the rules are exhaustive: ≤ 3 structural and ≥ 9 fixable is always ≥ 75 % fixable, so O2 holds there. O2 and O3 can co-occur; then both are reported.
- **Hand-fixes** (aliases) are proposals to each doc's domain owner and land in a separate Peter-approved PR under the ballot-measure model, never in this PR.
- **No outcome writes the `certainty-calibration` register row** (it governs agent behaviour, not matcher quality; `governance/**` moves only by ballot). Invariant: no probability in `matchConfidence`, no model dependency in the live path.
- Q2 is reported per seat and in total; with ~10 per seat, per-seat numbers are descriptive only.

## 6. Cost

Thurgood ~1.3 sessions (calibration set 0.25; prompt + raw capture 0.15; keying ~60 queries 0.4; wrapper + tests 0.25; run, bucketing, findings 0.25). Seats ~1.5 (4 × 0.25 + Leonardo 0.5). Domain-owner bucketing ~0.1 each (Ada, Lina). Orchestrator cross-check ~0.25. No API spend.

## 7. What the walk checks

- Charter merged but no calibration set or sealed prompt within the next Thurgood session → finding.
- Leonardo's ledger closed with no Leonardo consult on record → finding.
- Results commit not preceded by the pre-registration commit (findings doc SHAs, PR-body note) → finding.
- Oracle diff non-empty, or any edit outside the Grant paths → claims-pass finding.
- Held components-shaped queries appearing in a fixture → finding.
- Findings doc landed with no outcome recorded here → finding.

## 8. Closing

When the findings doc lands (or the gate stops the study), record the outcome here (dated): bucket counts, O-rule, the routed follow-ups (alias proposals, docs-matcher defect issue, Stage 2 question to Peter). Record the same one line in the study charter § 6, then `git mv` this file to `archive/`.
