# Components calibration instrument — a durable bench for `find_components` tier and rank changes, first used on rubric clause 1 (R3) (CHARTER + PRE-REGISTRATION FORM)

**Date**: 2026-10-17
**Type**: **CHARTER**, carrying the method and the pre-registration form for the components calibration instrument. Not a ballot; no governance law changes.
**Authority**: Peter's ruling, 2026-10-17, on the clause-1 coverage knob (D3 of `archive/2026-10-12-leonardo-settings-screen-call-ledger-charter.md`; study charter `2026-10-07-discovery-shadow-study-charter.md` § 6, F2 "Still open (i)"): **(B), taken as the DURABLE class option.** The components calibration instrument is the deliverable. R3 is pre-registered and turns only on acceptance. Lina's fallback trigger to (C) stands (§ 1). Thurgood's three conditions and Stacy's read are adopted. No ballot.
**Status**: **CHARTERED.** No seat has written and no query exists.
**Owner**: **Lina** (the instrument, the knob, the runner, the fixture, the keys; § 10). **Thurgood** (method, the pre-registration form, the sealed prompt, F3 freeze, the walk; §§ 2–9). **Orchestrator**: runs the seats and the instrument; never authors a query; independently re-runs the results table (Lina's declared conflict: R3 is her rule). **Stacy**: a bounded verifiability read of § 6 (§ 7).
**Trigger**: **Peter's merge of this charter** → the orchestrator runs the four sealed seats (§ 4). **All four seats' answers captured** → the instrument PR opens (§ 5 commit order). **Fallback trigger (C)**: the instrument has not run by the next PR that changes the components matcher OR the next product screen session, whichever comes first → § 1 (C).
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
- **Confident-wrong (CW)**: a `strong` row in ranks 1–3 whose component is not in the query's key (a gap negative's key is empty) (F6).
- **True strong lost (TSL)**: a positive whose keyed component is `strong` at rank ≤ 2 under status quo and is not `strong` at rank ≤ 2 under the arm.
- **Net** = (CW under status quo that are not CW under the arm) − TSL.
- **R@1 / R@2**: rank-only; the share of positives whose keyed component is at rank 1 / rank ≤ 2.

**R3 is accepted iff, against status quo, all three hold, both with and without pre-exposed rows**:
1. **net ≥ +3**;
2. **no new CW** (no row that is CW under R3 and was not under status quo);
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

## 10. Instrument (Lina) — to be completed by Lina after this commit

| Item | Content |
|---|---|
| R3 — exact text (the rule as it will read in the rubric) | _pending_ |
| R3 — arm function path | _pending_ |
| Runner path and command | _pending_ |
| Fixture path (under `application-mcp-server/**`) | _pending_ |
| Key format (single answer or acceptable set; how F4 drops are recorded) | _pending_ |
| Guard test path (fails on any fixture change not made deliberately; F3) | _pending_ |
| Probe list for the pre-exposure flag (her 66 probe queries, verbatim) | _pending_ |
| Parity arm function path | _pending_ |
| Cost confirmation (keying, runner) | _pending_ |

## 11. Freeze (F3) and the walk line

- **Freeze**: the fixture freezes at the pre-registration commit (2). The promotion to a standing guard is a dated decision recorded in § 13 of this file when it closes, plus Lina's guard test (§ 10).
- **Walk line** (Thurgood, monthly health check, alongside the docs oracle line): `git log --oneline <freeze-sha>.. -- <fixture path>`. Empty = nothing to do. Non-empty = the "frozen, never extended" rule has met a real case: a walk finding, and the F3 ballot trigger fires, with the diff and author in the record.

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

## 14. Closing

When the results commit lands: record here (dated) the arms table's headline (net, CW, R@1/R@2 per arm, with and without pre-exposed rows), the turn decision, the freeze SHA, and any routed follow-ups (metadata debt from F4, a synonym-recall note under § 12). Record the same one line in the study charter § 6 under F2 "Still open (i)", then `git mv` this file to `archive/`.

---

## Appendix A — Thurgood's probe set (2026-10-17, author-exposed; for the § 2 flag)

`on/off switch` · `confirm sheet or dialog` · `brief message that a change didn't save` · `a toast for errors` · `toggle` · `loading spinner while data fetches` · `bottom navigation between sections` · `avatar` · `primary action button` · `text input field` · `tabs` · `email field with validation` · `progress through onboarding steps` · `profile picture` · `user photo` · `checkbox` · `segmented control` · `page dots` · `stepper` · `notification badge` · `accept terms` · `password` · `phone number` · `filter chips` · `content switcher` · `icon only button` · `loading bar` · `list of choices` · `card` · `close button` · `back button` · `select one option` · `tag` · `label`
