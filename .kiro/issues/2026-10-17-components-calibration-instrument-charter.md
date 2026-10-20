# Components calibration instrument — a durable bench for `find_components` tier and rank changes, first used on rubric clause 1 (R3) (CHARTER + PRE-REGISTRATION FORM)

**Date**: 2026-10-17
**Type**: **CHARTER**, carrying the method and the pre-registration form for the components calibration instrument. Not a ballot; no governance law changes.
**Authority**: Peter's ruling, 2026-10-17, on the clause-1 coverage knob (D3 of `archive/2026-10-12-leonardo-settings-screen-call-ledger-charter.md`; study charter `2026-10-07-discovery-shadow-study-charter.md` § 6, F2 "Still open (i)"): **(B), taken as the DURABLE class option.** The components calibration instrument is the deliverable. R3 is pre-registered and turns only on acceptance. Lina's fallback trigger to (C) stands (§ 1). Thurgood's three conditions and Stacy's read are adopted. No ballot.
**Status**: **ACTIVE — STANDING INSTRUMENT** (2026-10-17). q1 ran, accepted R3, and is SPENT; R3 turned (§ 15). This file stays at the root as the instrument's home (§ 15, "Root, not archive"). (was: CHARTERED.)
**Owner**: **Lina** (the instrument, the knob, the runner, the fixture, the keys; § 10). **Thurgood** (method, the pre-registration form, the sealed prompt, F3 freeze, the walk; §§ 2–9). **Orchestrator**: runs the seats and the instrument; never authors a query; independently re-runs the results table (Lina's declared conflict: R3 is her rule). **Stacy**: a bounded verifiability read of § 6 (§ 7).
**Class**: P2 obligation (guard) · charter *(set 2026-10-20, Lina, rule 12. Accepted. The instrument guards every change to the components matcher; a P3 would let it archive stale while the guard it provides is still owed. Kind charter: it is a standing instrument, not a defect.)*
**Trigger**: `manual` — any PR that changes the components matcher (`deriveMatchConfidence`, `rankCompare` / `countOwnNameHits`, signal-class assignment in the indexer, `termNormalization.ts`) owes a FRESH set authored under § 4 and run under §§ 5-6 before it is accepted (§ 2). manual and not a path because the matcher spans QueryEngine.ts and the indexer, and a standing charter has no close: a path token would lapse it at every matcher edit. *(was, verbatim: **Trigger** (standing, from 2026-10-17): **any PR that changes the components matcher** (`deriveMatchConfidence`, `rankCompare` / `countOwnNameHits`, signal-class assignment in the indexer, `termNormalization.ts`) → a FRESH set authored under § 4 and run under §§ 5–6 before that change is accepted (§ 2); q1 runs on it as a regression guard only. **T4** (`2026-10-13-component-gaps-from-settings-ledger.md` § T4) rides that next fresh set. **The monthly walk** reads § 11's F3 line. *(Was, executed: Peter's merge of this charter → seats; seats captured → instrument PR; fallback (C) on the next components-matcher PR or screen session — never fired.)*)*
**Grant paths** (activated per `.kiro/issues/README.md` item 8 by Peter's merge of a PR whose body names this file; the instrument PR is diffed against this list):
- `.kiro/docs/components-calibration-seat-queries.raw.md` — **Thurgood**: the sealed prompt and the four seats' answers, verbatim, committed before keying.
- `.kiro/docs/components-calibration-findings.md` — **Lina** (results, arms table, keys rationale) and **Thurgood** (method-conformance section only).

  Both paths are outside both owners' charter scopes; that is why they are listed. Lina's runner, fixture and guard test live under `application-mcp-server/**`, which is in her charter scope: no grant. Nothing under `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` or `.github/**`. **The matcher (`application-mcp-server/src/query/QueryEngine.ts` `deriveMatchConfidence` / `rankCompare`, the indexer, `termNormalization.ts`) is NOT changed in the instrument PR**: the bench does not tune what it measures, and R3 turns in a separate PR (§ 6).
**Consulted**: Lina ×3 and Thurgood ×3 (this sitting, cross-read between rounds). Both accept (B)-as-instrument. Lina: no R3 turn in the same unit; the fallback trigger; the gaps (G1/G2/G5) do not remove the class; Stacy reads. Thurgood: the set is spent after its first use; the pre-registration commit lands before the run; seats are sealed fresh sessions; Stacy reads.
**Class option**: the instrument itself. Every later `find_components` matcher change (tier rule, signal classes, stop words, rank) is measured by its runner, keying protocol and method, against FRESH queries authored by the same protocol. The alias-hygiene re-run's step 4 (`.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md`, alias-hygiene amendment) already anticipates a components fixture; this is it.

---

## 1. The ruling and the fork record

- **(A) Parity now** (components adopt the docs rule, ≥ 50 % any-field coverage with a high-signal hit) and a fresh set later for anything stricter: **refused by both owners.** On `main` it catches D10 only, and it costs a full re-run and a tier move while front-running R3.
- **(B) Pre-register R3, build and run the instrument first, turn only on acceptance: CHOSEN, as the durable class option.**
- **(C) Turn R3 now and measure after: the FALLBACK.** It fires only on the fallback trigger (header). If it fires, the pre-registration commit (§ 5) must merge with or before the R3 turn, and the revert rule (§ 6) applies when the instrument runs. Bound on interim harm: R3's `strong` set is a strict subset of today's (it requires a high-signal hit plus more), so R3 cannot add a confident-wrong tier; a wrong R3 costs extra `partial`s, each one go/no-go.
- **Why the class persists after the gaps close**: G1/G2/G5 (switch, dialog, toast) remove three live harm cases only once those components are built; the mechanism (one descriptive high-signal word → `strong`) stays for every other absent thing (Lina).

## 2. The class: a durable bench, a consumable set

- **What outlives this knob**: the runner, the keying protocol (§ 3), the sealed-seat protocol (§ 4), the pre-registration form (§ 5), the acceptance shape (§ 6) and the control-arm specification (§ 8).
- **What does not — the spent-set rule (binding on every later reader)**: the query set is **spent as a tuning target at its results commit, whatever the outcome.** If it accepts R3, R3 is fitted to nothing else it can be judged by; if it rejects R3, any R3′ written after seeing the results is fitted to it. After the results commit the set is a **regression guard only** (the same dual status as the docs oracle and Q2). A later matcher change is accepted only against fresh queries authored by § 4; the spent set may still be run as a guard ("did anything else move").
- **Pre-exposure is mechanical, not judged**: a seat query is flagged **pre-exposed** if, after the matcher's own normalization, it string-equals any of: the seven Stage 0 reproductions; the Settings ledger's `find_components` keyword arguments (D8, D9, D10); Lina's probe set (§ 10, row "probe list"); Thurgood's probe set (Appendix A). Flagged rows are scored and reported separately; acceptance (§ 6) is computed with and without them, and both must pass.

## 3. Size, keys and grading

- **Size**: about 32 queries (4 seats × 8). **Invariant: the keyed gap share is ≥ ⅓ and there are ≥ 8 keyed gap negatives** (about 24 positives + ≥ 8 gap negatives at the floor). A seat's "may not exist" label is a guess; **Lina's key decides the class.** If the keyed set falls below either floor, the orchestrator runs ONE top-up seat (Stacy, fresh session, the same sealed prompt with only part B), before the pre-registration commit; the top-up is recorded in the raw file.
- **Keys (Lina)**: each positive is keyed to the component(s) that answer it (key format: § 10). Each gap negative is keyed **strict none** under **F5**: the only correct answer is "nothing exists"; a `strong` in ranks 1–3 is confident-wrong (F6); a `partial` closest match is recorded as "labeled closest match offered" (F5 ii) and judged sensible-or-not by Lina, never counted against the matcher.
- **F4, drop and record**: a query whose sibling set metadata cannot separate (Leonardo's meaning vs Lina's function) is dropped before the freeze and recorded in the fixture as a "metadata does not separate these siblings" finding, routed to Lina as metadata debt.
- **Answer-key errors** found after the results commit are counted and excluded, never edited.

## 4. Sealed seats

- **Seats**: four **fresh sessions** — Leonardo, Sparky, Kenya, Data. Each is run by the orchestrator as a read-only consult with **one tool use: the hand-back** (no MCP call, no file read); the answer is relayed **verbatim** and Thurgood pastes it into the raw file unedited.
- **The orchestrator holds the prompt** and gives each seat that text only: no R3, none of the four cases, no ledger, no rubric, no tool output, no mention of this charter's purpose.
- **Leonardo's exposure** (the Settings screen, D8–D10) is handled by § 2's mechanical flag, not by excluding him.
- **The sealed prompt, verbatim** (the same text to every seat):

> You are writing search queries, not answering them. Do not call any tool and do not read any file before you answer.
>
> Picture the product screens you would realistically build or implement in your role over the next few months — for example sign-up, settings, a feed, checkout, a profile, an empty state, a form with errors. For each screen, think about the UI pieces you would go looking for in a design system's component library.
>
> Write the search phrases you would actually type into that library's component search, in your own words — the way you would phrase it while working, not the way a catalog would name it.
>
> **A.** Five or six phrases for pieces you expect a design system like this to have.
> **B.** Two or three phrases for pieces you would look for on a real screen but are not sure a design system like this has.
>
> For each phrase give: the phrase exactly as you would type it; one line on what you need it for (the screen and the job); and A or B.
>
> About eight phrases in total. Do not revise a phrase to make it more findable.

## 5. Pre-registration form (one commit, before the run)

**Commit order on the instrument PR's branch**: (1) the raw seat answers (Thurgood); (2) **the pre-registration commit** (Lina): fixture with keys and F4 drops, the runner and its tests, the guard test, and a pre-registration block in the findings doc carrying every item below; (3) the results commit (Lina's arms table, Thurgood's method-conformance section, the orchestrator's independent re-run line); (4) the close. Squash-merge flattens this on `main`, so the findings doc records the branch SHAs of (1) and (2), and the PR body states that (2) precedes (3).

The pre-registration block carries:
- **R3's exact text**, copied verbatim from § 10 (row "R3"), and the code it runs as (the arm function's path and SHA);
- **the three arms** (§ 8) and the status-quo SHA (`main` at the branch point);
- **the acceptance criteria and the turn/revert rule** (§ 6), copied verbatim from this charter;
- **the fixture hash** (`shasum -a 256 <fixture path>`) and the runner command;
- the pre-exposure flags (§ 2), computed;
- the count check: keyed positives, keyed gap negatives, gap share, F4 drops.

**No CI run** and no new check context. The runner is deterministic: the findings doc records the command and SHA, and anyone can re-run it. The root `npm test` does not run `application-mcp-server` suites; the findings doc says which ran.

## 6. Acceptance (pre-registered) and the turn/revert rule

**Definitions** (every arm is scored on the same fixture; "status quo" = today's `deriveMatchConfidence` on `main`):
- **Confident-wrong (CW)**: a **(phrase, component) pair** — a `strong` result in ranks 1–3 whose component is not in the phrase's key (a gap negative's key is empty) (F6). `net`, "fixed" and "new CW" all count pairs. *(Amended 2026-10-17, Thurgood, closing Stacy's note N2 — findings `.kiro/docs/components-calibration-findings.md` § 3 M8: the earlier "a `strong` row" did not say whether a row was a phrase or a pair. The amended text is the unit q1 pre-registered (findings § 1.5, in `0c2e0a9bb` before the run), so no result moves; q1 also passes under a per-phrase reading.)*
- **True strong lost (TSL)**: a positive whose keyed component is `strong` at rank ≤ 2 under status quo and is not `strong` at rank ≤ 2 under the arm.
- **Net** = (CW under status quo that are not CW under the arm) − TSL.
- **R@1 / R@2**: rank-only; the share of positives whose keyed component is at rank 1 / rank ≤ 2.

**R3 is accepted iff, against status quo, all three hold, both with and without pre-exposed rows**:
1. **net ≥ +3**;
2. **no new CW** (no pair that is CW under R3 and was not under status quo);
3. **R@1 and R@2 not lower.**

**Turn rule**: if R3 is accepted, Lina lands R3 as a dated rubric amendment in a **separate PR** (never in the instrument PR), carrying the re-run owed (§ 9) and a PR-body line that tiers change at merge. If R3 is not accepted: no turn; R3 is not re-tuned against this set (§ 2); the findings record the result and any variant needs fresh queries.

**Parity is a comparison arm, not a turn candidate.** If parity passes and R3 fails, that is reported and goes to Peter; this charter turns nothing else.

**Revert rule** (only if the fallback (C) fired and R3 is already on `main`): if the instrument then fails R3 on acceptance, Lina reverts R3 in the next PR, with the same re-run.

**Reading the numbers**: at n ≈ 32, net +3 is about a 10 % movement. The result is directional evidence for one tier rule, not a general claim about matcher quality.

## 7. Stacy's read

Before the run, Stacy reads § 6 (and § 3's keying rules) for verifiability only: can each criterion be decided from the fixture, the keys and the runner output without consulting Thurgood or Lina? About 0.25 session, **non-gating**. She reports in conversation (her write scope does not cover the findings doc); the orchestrator records her read in the findings doc's pre-registration block. If her read comes back as proposed criterion wording, Thurgood says so at that exchange (the caller-out duty); a criterion she finds undecidable is a defect in Thurgood's text, and he fixes it before commit (2).

## 8. Arms

- **Status quo**: `deriveMatchConfidence` as on `main` at the branch point.
- **Parity**: `strong` iff ≥ 1 high-signal hit AND (salient tokens matched in any field) / (salient query tokens) ≥ 0.5 — the docs rubric's branch (b), with no exact-multi-token branch (components have no heading surface).
- **R3**: as recorded by Lina, § 10 row "R3".
- **Named control arm (specified here, NOT run now)**: an agent in a fresh session given the query and the full `get_component_catalog` output, no keyword tool, returning up to three components or "none". This is the honest counterfactual recorded in the study charter (§ 3: "on components, the real counterfactual is an agent reading the catalog"). Any future semantic or vendor comparison on components MUST include it, and runs on a fresh set authored by § 4 (the spent-set rule applies to it too).

## 9. Re-run owed by any components tier change (this one and every later one)

- `cd application-mcp-server && npx jest src/__tests__/tool-boundary.contract.test.ts src/query/__tests__` — tool-boundary (75), `deriveMatchConfidence`, `Stage0LexicalFixes`, `QueryEngine` (131 total at `835549e20`), all green; a deliberately flipped assertion is named in the PR body.
- A before/after table at the PR SHA for the seven Stage 0 reproductions and the ledger's D8–D10 (rank 1, tier, `strong` count).
- The PR body lists every tier that moves.
- A guard test pinning the new branch (Lina).
- The instrument's runner on the spent set as a regression guard, once the set exists.

## 10. Instrument (Lina)

Filled by Lina, 2026-10-17. Rows 1–9 are the charter's; rows 10–14 are added inside this section for items § 5 needs that had no row (status-quo and control arms, rank reporting, the keying protocol, the re-run owed at the turn). Declared conflict: R3 is my rule and I key the set. The mitigations are the charter's: keys are committed at (2) before any arm is scored, and the orchestrator re-runs the results independently.

| Item | Content |
|---|---|
| R3 — exact text (the rule as it will read in the rubric) | **Tier rule (amended [date of the turn PR] — clause 1 replaced by R3, "names beat purpose"):**<br>- `strong` = at least one **high-signal-field hit**, AND either **(i)** a matched query token is a token of the component's own `name` or of its `family`, or **(ii)** at least two salient query tokens matched, and they are more than half of the salient query tokens.<br>- `partial` = any other match: at least one token matched and the match is not `strong`. This includes the single-low-signal-token case, low-signal-only coverage, and a lone `purpose` or concept-suffix hit without the support in (ii).<br>- `none` = zero tokens matched.<br>**What this changes, plainly:** this is "names beat purpose", a signal-class change in effect. `name` and `family` tokens reach `strong` on their own. `purpose` and contract concept-suffix tokens stay high-signal, but reach `strong` only with support (clause ii). The old ≥2-token full-coverage clause is subsumed by (ii). The signal-class gate is unchanged: low-signal-only coverage still caps at `partial`. Tokens are compared after the matcher's own normalization (`tokenizeForMatch`: stop words dropped, plurals folded). "Salient query tokens" is the existing coverage denominator. The `partial` and `none` **meanings** in the tier table are unchanged; the `partial` line is restated as the complement of `strong`, so no match falls between tiers. The rule reads only evidence the tool already emits (`name`, `family`, `matchedOn`, coverage), so a tier stays recomputable (Req 6.2 / P5). |
| R3 — arm function path | `application-mcp-server/src/calibration/arms.ts` → `r3Arm(matchedOn, matchedTokens, totalTokens, { name, family })`. It is a pure function over emitted evidence. Name and family tokens come from `tokenizeForMatch`, imported, not copied. The pre-registration block records this file's SHA at commit (2). |
| Runner path and command | `application-mcp-server/src/calibration/run.ts`, run from source, never from `dist`: `cd application-mcp-server && npx tsx src/calibration/run.ts --fixture src/calibration/__fixtures__/components-calibration-q1.json [--verify-only] [--arms status-quo,parity,r3] [--table]`. `tsx` is the repo-root devDependency.<br>- `--verify-only` checks the fixture hash against the guard test's pinned value and the key schema, prints the count check (keyed positives, keyed gaps, gap share, F4 drops) and the pre-exposure flags, and scores nothing. It is the only mode I run before commit (2).<br>- `--arms` indexes `src/components/core` at the checked-out SHA and runs `ComponentQueryEngine.findComponents({ keyword })` once per query. Each arm re-derives the tier for every returned row and re-sorts.<br>- `--table` prints, per query, rank 1–3 with tier for each arm, the CW / TSL marks, and the P flag. It also prints § 6's headline (net, new CW, R@1, R@2 per arm), with and without pre-exposed rows.<br>- **P flag, mechanical:** `tokenizeForMatch(phrase).join(' ')` string-equals the same normalization of any entry in `application-mcp-server/src/calibration/preExposure.ts`. That module holds four verbatim lists: the Stage 0 reproductions from the archived defect record's before/after table (rows 1–7, including 2a and 2b), the D8–D10 keyword arguments, the probe list below, and Appendix A. |
| Fixture path (under `application-mcp-server/**`) | `application-mcp-server/src/calibration/__fixtures__/components-calibration-q1.json`. JSON, so the hash is stable and the file needs no parser. `q1` because the set is consumable (§ 2); a later fresh set is `q2`, with its own file and freeze. |
| Key format (single answer or acceptable set; how F4 drops are recorded) | One object per seat phrase, in raw-file order: `{ "id": "LEO-1", "seat": "leonardo", "phrase": "<verbatim>", "need": "<the seat's one-line need, verbatim>", "seatLabel": "A"\|"B", "key": { "class": "positive"\|"gap"\|"dropped", "accept": ["<Component>", …], "closestSensible": ["<Component>", …], "f4": null \| { "siblings": ["<Component>", …], "finding": "metadata does not separate these siblings" }, "note": "<one-line rationale>" } }`.<br>- **Positive:** `accept` is an acceptable **set**, with one or more components. A hit is any component in the set.<br>- **Gap:** `accept` is `[]` (strict none, F5). `closestSensible` lists, **before the run**, the components I would judge a sensible labeled closest match, so the F5 (ii) judgment is pre-registered rather than made after seeing results.<br>- **F4 drop:** the row stays in the file with `class: "dropped"` and the `f4` record, and is excluded from scoring and counts. The metadata debt is routed to me.<br>- `seatLabel` is recorded and never used as the class; the key decides (§ 3). |
| Guard test path (fails on any fixture change not made deliberately; F3) | `application-mcp-server/src/calibration/__tests__/componentsCalibration.guard.test.ts`. It pins the fixture's `sha256` as a constant, so any byte change fails. It also pins: the key schema and § 3's count floors; `statusQuoArm` equal to the shipped tier on every row of the live corpus (proves the status-quo arm is the shipped rule and that the tier is recomputable); `r3Arm` on its six defining cases (single-token own-name → `strong`; single-token family → `strong`; single-token `purpose`-only → `partial`; lone suffix hit at 1/2 → `partial`; 2 of 3 matched with one high-signal → `strong`; low-signal-only full coverage → `partial`); and `parityArm` at the 0.5 boundary. Walk line (§ 11): `git log --oneline <freeze-sha>.. -- application-mcp-server/src/calibration/__fixtures__/components-calibration-q1.json`. |
| Probe list for the pre-exposure flag (her 66 probe queries, verbatim) | **68, not 66** (I miscounted in round 1; the two added for the docs-alignment question were run before that report). Author-exposed, run 2026-10-17 at `835549e20` by an uncommitted simulation script. The script is not evidence for acceptance and is not committed. This cell is the committed record; `preExposure.ts` copies it verbatim. Eleven entries repeat the Stage 0 or ledger strings.<br>`on/off switch` · `confirm sheet or dialog` · `brief message that a change didn't save` · `a toast for errors` · `toggle` · `switch to turn a setting on or off` · `tabs` · `email field with validation` · `loading spinner while data fetches` · `progress through onboarding steps` · `bottom navigation between sections` · `primary action button` · `text input field` · `login` · `onboarding` · `onboarding flows` · `container` · `button` · `input` · `avatar` · `checkbox` · `radio group` · `page header with back button` · `progress bar` · `notification badge` · `segmented control` · `tab bar` · `password field` · `phone number input` · `pagination dots` · `filter chip` · `card` · `list of buttons` · `user profile picture` · `divider line` · `icon` · `select one option from a set` · `show unread count` · `header for app` · `step indicator` · `loading` · `error message on input` · `avatar image` · `rounded avatar` · `large checkbox` · `small icon button` · `legal consent checkbox` · `email address` · `circular profile photo` · `stepper with labels` · `tab navigation` · `chip that can be removed` · `spinner` · `modal` · `dialog` · `toast` · `dropdown` · `stepper` · `badge` · `tag` · `header` · `link` · `navigation` · `form` · `progress` · `nav` · `large dark checkbox` · `compact avatar for comments` |
| Parity arm function path | `application-mcp-server/src/calibration/arms.ts` → `parityArm(matchedOn, matchedTokens, totalTokens)`: `strong` iff ≥ 1 high-signal hit AND matchedTokens / totalTokens ≥ 0.5, exactly as in § 8. |
| Cost confirmation (keying, runner) | Keying **0.25** confirmed. Runner **0.5** confirmed: the runner, `arms.ts`, `preExposure.ts`, the guard test and `--verify-only`. **Two lines § 12 does not carry:** (a) my results-commit write-up (arms table, keys rationale, F5 (ii) judgments) ≈ **0.25**, so the instrument is ≈ **2.75**, not 2.5; (b) the R3 turn PR, only if accepted, ≈ **0.25**, outside the instrument. |
| Status-quo arm and control arm | **Status quo:** the shipped `deriveMatchConfidence` on the rows `findComponents` returns, at the branch-point SHA. `statusQuoArm` in `arms.ts` imports it and does not copy it; the guard test pins equality with the emitted tier. **Control (§ 8): specified, NOT run.** The runner has no control code path; `--arms control` exits non-zero with a pointer to § 8. |
| Rank reporting | Tier is rank key 1, so an arm's tier change can move rank. Each arm re-sorts its rows with the shipped `rankCompare` and `countOwnNameHits`, imported unchanged. Only R@1 and R@2 are gated (§ 6). Rank-1 changes against status quo are **listed** per query in the table and are **not** gated. No arm changes `rankCompare`. |
| Keying protocol (Lina) | 1. I key at the branch-point SHA from the live catalog (`get_component_full` / `find_components` filters), never from memory.<br>2. I key from the phrase and its need line, never from any arm's output: nothing but `--verify-only` runs before commit (2).<br>3. Positive: every consumer-usable component that does the stated job enters `accept`.<br>4. Gap: nothing does the job → `accept: []` (F5 strict), plus `closestSensible` named before the run.<br>5. Siblings the metadata cannot separate → F4 drop and record.<br>6. An internal-only component enters a key only if the phrase names that internal part.<br>7. Every key carries a one-line `note`; a key I cannot decide goes to Thurgood for a method read before commit (2).<br>8. Keys are never edited after the results commit (§ 3, answer-key errors). |
| Re-run owed at the R3 amendment PR (if accepted) | Everything in § 9, plus:<br>- the deliberately flipped assertions, named in the PR body: `deriveMatchConfidence.test.ts` "high-signal hit with partial coverage still reaches strong" (1/3) flips; the "pure function" test and the recompute at `QueryEngine.test.ts` ~L226 gain the `name`/`family` inputs;<br>- the identity check: on the spent q1 set, the shipped tier equals `r3Arm` on every row, which proves the code that ships is the rule that was pre-registered;<br>- the guard test's six R3 cases moved onto `deriveMatchConfidence`;<br>- a statement that the root `npm test` does not run these suites. |

## 11. Freeze (F3) and the walk line

- **Freeze**: the fixture freezes at the pre-registration commit (2). The promotion to a standing guard is a dated decision recorded in § 13 of this file when it closes, plus Lina's guard test (§ 10).
- **Walk line** (Thurgood, monthly health check, alongside the docs oracle line): `git log --oneline d7bee56e0.. -- application-mcp-server/src/calibration/__fixtures__/components-calibration-q1.json`. The freeze SHA is `d7bee56e0`, the squash of #388 on `main`; the branch SHA `222f1aa7a` (findings § 3 M9) does not survive the squash, so the walk uses the `main` SHA. Lina's guard test pins the fixture's sha256 (`87de8a11…69a0c`) and catches an accidental edit on the way in. Empty = nothing to do. Non-empty = the "frozen, never extended" rule has met a real case: a walk finding, and the F3 ballot trigger fires, with the diff and author in the record.

## 12. Cost and the vendor note

- **Cost** ≈ 2.5 sessions: seats 1.0 (4 × 0.25), keying 0.25, runner 0.5, run 0.25 (orchestrator), method read 0.25 (Thurgood), Stacy 0.25.
- **Jev (F7)**: both F7 triggers are dead (the docs volume gate ruled O1; D2 ruled NO-GO). If the instrument measures a **synonym-recall gap under R3** (true strongs lost to `partial` because users' words differ from component names: TSL concentrated on purpose-only hits), that is the candidate NEW trigger, recorded here and ruled by Peter if it appears. No vendor action under this charter.

## 13. What the walk checks

- Charter merged, no seat run within the next orchestrator session → finding.
- Seat answers captured, no instrument PR opened → finding.
- Results commit not preceded by the pre-registration commit (findings-doc SHAs, PR-body line) → finding.
- Any edit outside the Grant paths and `application-mcp-server/**`, or any matcher change in the instrument PR → claims-pass finding.
- R3 turned without either an accepting results commit or the fallback trigger having fired → finding.
- Fallback trigger fired with no pre-registration commit merged with or before the turn → finding.
- § 10 still `_pending_` at the pre-registration commit → finding.
- The F3 walk line non-empty → finding and ballot trigger (§ 11).
- Findings doc landed with no outcome recorded below → finding.
- **Standing (from 2026-10-17)**: a merged PR that changed the components matcher (Trigger line) with no fresh-set run recorded in a findings doc → finding. A matcher change justified by q1 rather than a fresh set → finding (§ 2).

## 14. Closing

*(As chartered: record the outcome, record one line in the study charter, then `git mv` to `archive/`. Superseded 2026-10-17 by the root decision in § 15; the outcome and the study-charter line are recorded.)*

## 15. Outcome — 2026-10-17

- **The run**: pre-registered at `0c2e0a9bb`; run by the orchestrator at that SHA (`run.ts` blob `0d82e2f983f8`, fixture sha256 `87de8a11…69a0c`); Lina's and Thurgood's re-runs byte-identical on every headline line. Merged as #388 → `d7bee56e0`.
- **Headline (charter § 6, the AND of both subsets)**:

  | Arm | all rows | without pre-exposed | TSL | new CW | R@1 / R@2 |
  |---|---|---|---|---|---|
  | parity | net +24 | net +24 | 0 | 0 | unchanged (18/18; 14/14) |
  | **R3** | **net +26** | **net +25** | 0 | 0 | unchanged (18/18; 14/14) |

  Both arms ACCEPTED. Per-phrase reading (§ 6 amendment): R3 +7, parity +5, new 0. Method conformance: CONFORMS WITH NOTES (findings § 3).
- **Turn ruling (Peter, 2026-10-17)**: R3 turns as pre-registered. Commits on `fix/components-clause1-r3-turn`: `22688e6e4` (rubric components block amended to R3, dated 2026-10-17; `deriveMatchConfidence` gains the row's `name` + `family`; deliberate test flips named) and `f018a10e1` (`canonical/generated.lock` inputClosure refresh only).
- **§ 9 re-run (Lina, recorded in the turn PR)**: 19 tiers move `strong` → `partial` across the seven Stage 0 reproductions and D8–D10; nothing moves up; no positive at rank ≤ 2 regressed. One recorded cost: S0-5 "loading spinner while data fetches" — Progress-Bar-Base from rank-1 `strong` to rank 4 of four tied `partial`s. q1 regression guard: shipped tier ≡ `r3Arm` on all 36 rows. Full application-mcp-server 512 green, root 9591 green, `tsc` clean.
- **No consumer-surface impact**: the `find_components` tool description does not define tiers and is unchanged; `f018a10e1` refreshes the lock's input closure only — registry outputs unchanged (diff-guard no-op-green). The tier vocabulary and its meaning are unchanged (no ballot, D3).
- **q1 is SPENT** as a tuning target from `d7bee56e0`: regression guard only (§ 2). Freeze and walk line: § 11.
- **Follow-up T4** (Lina): R3's own-name anchor fires on incidental fragments of compound names (`indicator`, `icon`, `bar`, `list`); its benefit rests on author-exposed probes. Recorded in `2026-10-13-component-gaps-from-settings-ledger.md` § T4; trigger = the next fresh components set, with an anchor-restricted arm pre-registered beside R3 and parity.
- **Fallback (C) never fired.** The revert rule never applied.
- **F4 metadata debt**: none (0 drops). **Synonym-recall note (§ 12)**: TSL 0 on q1, so the candidate Jev trigger did not appear.
- **Root, not archive**: the instrument (runner, keying protocol, sealing, pre-registration form) is durable and every later components-matcher change must run a fresh set through it; the walk reads only root files, so the standing trigger and the F3 line keep a watcher only while this file stays at the root (README rule 1: owners and trigger in the header).
- **Study charter**: one line recorded under § 6, F2 "Still open (i)".
---

## Appendix A — Thurgood's probe set (2026-10-17, author-exposed; for the § 2 flag)

`on/off switch` · `confirm sheet or dialog` · `brief message that a change didn't save` · `a toast for errors` · `toggle` · `loading spinner while data fetches` · `bottom navigation between sections` · `avatar` · `primary action button` · `text input field` · `tabs` · `email field with validation` · `progress through onboarding steps` · `profile picture` · `user photo` · `checkbox` · `segmented control` · `page dots` · `stepper` · `notification badge` · `accept terms` · `password` · `phone number` · `filter chips` · `content switcher` · `icon only button` · `loading bar` · `list of choices` · `card` · `close button` · `back button` · `select one option` · `tag` · `label`

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 77, call BACK-FILL (Lina))**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P2 obligation (guard) · charter` (the instrument guards matcher changes; P3 would archive it stale).
