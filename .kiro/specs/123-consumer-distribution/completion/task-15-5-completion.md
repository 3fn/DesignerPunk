# Task 15.5 completion: first-render routing — confirmations and signatures per C1; refusals resolved to zero standing; rates and refusals issued recorded

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 15 · **Agent**: Thurgood (Opus), PRIMARY (profile author, re-author seat)
**Signing seats (C1)**: Ada, Lina, Sparky, Leonardo, Data, Kenya (their own charters); **Stacy** (her own charter, consumer-Thurgood's, `_shared` and the 8 identity docs).
**Date**: 2026-09-29 · **Branch**: `task/123-u2b-profile` · measured at unit head `611dda4a` plus this checkpoint.

**CI-provenance**: this checkpoint is the first dispatched checkpoint of the 15.5 window. The window was known-red from `3d781922` through `611dda4a`, and every checkpoint in it was pushed `--no-ci`. This checkpoint dispatches the required workflows against the unit branch; the run URLs are in the handback, because a commit cannot name its own runs.

## Criterion (tasks.md, Task 15), verbatim

| Criterion | Status | Evidence |
|---|---|---|
| **ZERO STANDING REFUSALS at U2 acceptance (U2b's merge)** (S-T3). Every `refuse: should-re-point` row was re-authored and re-judged, and **resolved EITHER by itemized assent OR by a changed disposition under its own C1 signature** (e.g. re-disposed `superseded-by`). **Never assent-only** (Stacy R2). **Refusals issued** during first render are recorded in the "first render — not a baseline" block with the `no-consumer-counterpart` and assent rates. Every ROUTED row carries a C1-correct signature, and the hard floor passes for all 8. | ✅ at this commit; the merge is the acceptance. One resolution is disclosed below for Stacy's reading of "never assent-only". | See the rows below. |

The evidence, clause by clause:
- **Zero standing refusals.** New test `consumer-profile.real.test.ts` › "zero standing refusals across the whole profile (S-T3)", over all 17 dispositions files, passes. Its bite: plant one `refuse` → red.
- **Refusals re-authored and re-judged; never assent-only.** 25 refusals issued. Each is listed in the block with its resolution. 24 were resolved after a re-authoring commit or a changed disposition. **The one exception, disclosed**: Lina's `commands[full-suite-with-performance]` was withdrawn and re-signed `no-consumer-counterpart` after the phase-two grain ruling. The ruling was the re-judgment; no row changed. **Whether a recorded ruling counts as re-judgment, or makes this assent-only, is Stacy's reading.**
- **Refusals recorded in the block with the rates.** § "First render — not a baseline".
- **Every ROUTED row carries a C1-correct signature.** New test › "every row in the signed population is signed by its C1 seat", over the 17 buckets, passes. The signed population is the routed body units, by `classifyCharter` at this commit, plus every `no-consumer-counterpart` and `superseded-by` row. The signer must be `c1Seat(owner)`. Its bite: remove the signature from ada `#identity` → red.
- **Hard floor for all 8.** `consumer-profile.real.test.ts` › "the hard floor passes for the 8 charters" passes over the confirmed records.

**Req 11.6.5e is in force from the first routed signature.**
- Its scope sentence was committed verbatim in `first-render/drafting/README.md` at `3d781922`, an ancestor of the first signature commit, `a7b2aaf2` (Leonardo, phase two).
- Every seat's run summary states that its assents were read within each unit's own rendering.

## What happened, in order

1. **Phase one — the C1 confirmations.** All 7 seats confirmed 349 units, and the sweep went green (15.4 ticked, `60b0fdb5`). The 5c classifier ruling ("can contradict") reinstated 10 items.
2. **Phase two — signing.** Six seats signed in parallel, then Stacy ran two runs. There were **24 refusals**. No seat widened a confirmed item set at signing; the § 3 referent candidates were each ruled in the seat's note.
3. **The re-author batch** (`0ac57489`…`bc6f0aa1`, one commit per record), under two rulings:
   - **The grain ruling** (function grain): a row names where its FUNCTION went. So a command row whose function survives in a unit is `superseded-by` that unit, never `no-consumer-counterpart`.
   - **Ada's split packaging ruling** on the shipped `dist/` snapshots.

   It also made a **`derive()` fix** (`73c6c7e5`): a positional list member that is renumbered because an earlier sibling was pruned is not an identity change. The regeneration followed at `72657411`.
4. **The re-sign fan-out.** 58 acts, listed in the hash sheets § 4. 57 were assented, and Kenya issued **1 further refusal**, which makes 25 in all.
5. **The render fix** (`7e5af8be`): under the consumer profile, the run-context annotation reads "run from your product repo". The steward tag, "…not this repo", contradicts itself inside a consumer. The regeneration followed at `8ea88c2f`.
6. **The 3-act tail was re-signed** (Kenya `b3a0e770`, Data `3213dba7`) → **zero standing** at `611dda4a`.

## First render — not a baseline

*B-U2 M1, as applied at 13.8 (Stacy's counting block). The metrics are counted per bucket, with body rows and frontmatter rows separately, over this render population. **U2b's merge is the first-render release**, so this population is the whole profile. Within 123, **no reading below is a detection** (ballot 2026-09-28-123-b-u2 F-1).*

**1. `no-consumer-counterpart` rate — `baseline (Req 11.5.3)`.**
- It is measured over the whole profile at this commit (unit head `611dda4a`; dispositions unchanged by this checkpoint).
- Command: `npx tsx .kiro/specs/123-consumer-distribution/first-render/drafting/m1-tally.ts`, which reads the committed dispositions files.
- The delta is the whole profile, because this is the first render.

| Bucket | Body: ncc / rows | Frontmatter + members: ncc / rows | Bucket: ncc / rows |
|---|---|---|---|
| ada | 0 / 22 | 10 / 70 | 10 / 92 |
| lina | 0 / 39 | 8 / 83 | 8 / 122 |
| thurgood | 0 / 47 | 19 / 66 | 19 / 113 |
| sparky | 0 / 33 | 15 / 71 | 15 / 104 |
| leonardo | 0 / 44 | 2 / 96 | 2 / 140 |
| data | 0 / 34 | 6 / 65 | 6 / 99 |
| kenya | 0 / 33 | 8 / 62 | 8 / 95 |
| stacy | 0 / 35 | 10 / 73 | 10 / 108 |
| _shared | 0 / 0 | 1 / 4 | 1 / 4 |
| always-set/core-goals | 0 / 3 | — | 0 / 3 |
| always-set/ai-collaboration-principles | 0 / 9 | — | 0 / 9 |
| always-set/spec-feedback-protocol | 0 / 15 | — | 0 / 15 |
| always-set/start-up-tasks | 0 / 9 | — | 0 / 9 |
| always-set/task-completion-protocol | 0 / 13 | — | 0 / 13 |
| always-set/agent-directory | 0 / 15 | — | 0 / 15 |
| always-set/designerpunk-systems-overview | 0 / 10 | — | 0 / 10 |
| always-set/civitas-system-overview | 0 / 9 | — | 0 / 9 |
| **Profile** | **0 / 370** | **79 / 590** | **79 / 960** |

*Observation, not a detection*: at 15.4 authoring (`acaa40d1`) the rate was 111 / 960. It fell 32 rows inside first render:
- **20 → `superseded-by`**: 9 command rows and 8 `writeScope[docs/specs/**]` rows under the function-grain ruling, and 3 snapshot trims under Ada's split ruling;
- **10 → re-pointed**: the technology-stack cue ×4, `platform-tokens` ×2, Stacy's carve-out and her spec-summaries knowledge base, and the Kenya and Data ComponentTokens trims;
- **2 → `retained`**: the Kenya and Data verdicts.

**2. Assent rate per signer on routed rows, and refusal count — `first render — not a baseline`.**
- These are counted from history, never from merge state. An event is a signature committed on the unit branch, reachable from `611dda4a`.
- **The mechanical count** is m1-tally's: distinct signature objects per row, across every commit reachable from the head that touched the file (merged seat branches included).
- **Its stated limit:** a re-sign that commits a byte-identical signature object is not a distinct object. That happens on a disposition flip whose hashes and `surviving` list are unchanged. Those re-signs are counted from the § 4 worklist and the seats' evidence notes, which are the record for them.
- MIDPOINT reads the same population from the PR's `refs/pull/<n>/head`.

| Signer | Routed: assent / events | Refusals on routed rows | Non-routed: assent / events | Refusals on non-routed rows | Byte-identical re-signs (from the worklist) | Refusals issued |
|---|---|---|---|---|---|---|
| ada | 13 / 14 | 1 | 13 / 15 | 2 | 1 | **3** |
| lina | 14 / 14 | 0 | 11 / 14 | 3 | 1 | **3** |
| sparky | 8 / 9 | 1 | 21 / 21 | 0 | 4 | **1** |
| leonardo | 5 / 5 | 0 | 4 / 5 | 1 | 1 | **1** |
| data | 11 / 15 | 4 | 15 / 18 | 3 | 3 | **7** |
| kenya | 16 / 16 | 0 | 18 / 22 | 4 | 2 | **4** |
| stacy | **78 / 83** (her tally, the record) | 5 | 39 events (her tally) | 1 | 3 | **6** |
| **Total** | | | | | **15** | **25** |

- **Stacy's own tally is the record for her seat** (`signatures/stacy.md`, `## Re-sign run summary`):
  - 122 signature events, 116 assents, 6 refusals, 0 standing;
  - routed assent 78 / 83 (events);
  - surviving 383 / 486, with her run-1 over-credit corrected by −1;
  - current state: 73 routed rows, all assented, 363 / 458;
  - non-routed events 39.
- **Reconciliation with m1-tally**: 119 distinct objects + 3 byte-identical flip re-signs = 122.
  - The three flips are consumer-Thurgood's `commands[functional-suite]` and `writeScope[docs/specs/**]`, and Stacy's `writeScope[docs/specs/**]`.
  - m1-tally's 84 routed events against her 83 is one row, the steward-verb carve-out. It was `no-consumer-counterpart` when she refused it and is routed at this commit. She counts by the row's state when signed, which is the counting block's rule.
- **For the other six seats**, the table is m1-tally's count plus the worklist's byte-identical re-signs. Each seat's own run summary (bottom of `signatures/<seat>.md`) carries its assent and refusal narrative.

**3. Spot-check fraction** (itemized assents checked against the rendering, counting only checks the record names): **0 named checks** over the routed itemized-assent events at this commit.
**Peter's sample of Stacy-signed assents: `0 / 116 (Stacy-signed)`.**

**4. Full-survival assent signal**: `not yet instrumented — owed to .kiro/issues/2026-09-28-full-survival-assent-signal-instrument.md`.
- Beside it, **hand-counted**: Stacy's routed full-survival events are 43 / 78.
- Kenya's seat assented every routed row with full survival (55 / 55 items). She named this as the pattern the signal exists to sample.

**5. Refusals issued: 25, by root cause, each with its resolution.**

| # | Root cause | Seat · row | Resolution |
|---|---|---|---|
| 1 | The shipped-snapshot negative was removed, though the package ships the snapshots (Data 6, Kenya 3) | Data: `#android-theming-spec-094`, `#step-2-set-up-the-screen`, `#how-to-use-designerpunk-tokens-on-android`, `#android-specific-guidance:preamble`, `trims[dist/android/DesignTokens.android.kt]`, `groundTruthManifest.verdict`. Kenya: `verdict`, `trims[dist/ios/DesignTokens.ios.swift]`, `trims[dist/ComponentTokens.ios.swift]` | Ada's split ruling: the body warnings are restored, pointing at `node_modules/@3fn/core/dist/*`. The DesignTokens trims become `superseded-by` the restored unit, which depends on 16.3's `files[]` negation. The ComponentTokens trims are re-pointed to the package root. The verdicts are `retained`. Disposition changed or re-authored → re-signed. |
| 2 | A command row's function survives elsewhere: grain | Ada: `commands[functional-suite]`, `commands[token-tests]`. Lina: `commands[functional-suite]`, `commands[component-tests]`, `commands[full-suite-with-performance]` | The first four become `superseded-by #what-you-dont-own` (changed disposition, re-signed). Lina's fifth was withdrawn under the grain ruling (not entailed: `no-consumer-counterpart` stands) and re-signed; this is **the one disclosed case** above. |
| 3 | A consumer counterpart exists but is unnamed | Data: `commands[platform-tokens]` | Re-pointed to `npx designerpunk generate` (`runContext: consumer-repo`) → re-signed. |
| 4 | A mis-grounded referent, a dead route, or a mis-attributed citation | Ada: `#the-process`. Sparky: `#mcp-practice-notes`. Leonardo: `routes.cues[21]` | Re-pointed. The "changes go upstream" rule was applied to Ada, and uniformly to Lina and Thurgood. The fallback now points at the shipped metadata, types and steering docs. The technology-stack cue is narrowed, and "build tooling" dropped. Each re-signed. |
| 5 | An operative clause was dropped although it has a consumer counterpart | Stacy: `thurgood #the-q5-boundary…:preamble`, `stacy #operational-mode-claims-audit…:preamble` (authority precedence), `#the-trigger-set…` (the five LENS questions), `#the-steward-verb-carve-out…` (routing test + tiebreak), TCP `#completion-state-in-the-pr-flow:preamble` (update from main when green but unmergeable; `Stacked-on:` + base-first), TCP `#tier-selection…` (the summary-doc location) | Re-pointed. The carve-out went from `no-consumer-counterpart` to `re-pointed`. The summary location, `specs/[spec]/task-N-summary.md`, was named, so `writeScope[docs/specs/**]` became `superseded-by` in all 8 agents. Each re-signed. |
| 6 | Self-contradicting glue | Kenya: `commands[platform-tokens]` (second refusal: "…not this repo" inside a consumer) | `render.ts`'s consumer-true annotation (`7e5af8be`) and a regeneration → re-signed. |

## Targeted tests + result

- `consumer-profile.real.test.ts` → **60 passed**. New in this subtask:
  - the signed-population test over 17 buckets;
  - zero standing refusals;
  - no consumer artifact carries "not this repo".

  Bites, each restored from a saved copy and verified with `cmp`:
  - signature removed → `✕ ada: every row in the signed population is signed by its C1 seat`;
  - refusal planted → `✕ zero standing refusals across the whole profile (S-T3)`;
  - regeneration withheld → `✕ no consumer rendering carries the steward tag`.
- `npm run test:agent-generator` → **`Tests: 1528 passed, 1528 total`** at this checkpoint (1510 at `611dda4a`, plus this subtask's 18 new real-profile cases).
- `check:122:diff-guard` → `operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)`, `diff-guard: full-run-green (input-closure-changed)`. The refreshed `canonical/generated.lock` is committed here.
- `derive.stale-overlay.test.ts` (the positional-renumber test, red before `73c6c7e5`), `render.test.ts` and `consumer-profile.adapters.test.ts` (the annotation, red before the adapters were wired): all green.

## Application-time adaptations

1. **The signed population was widened to include `superseded-by`.** Req 11.5.1 names `no-consumer-counterpart`. The phase-two rulings moved 20 such claims to `superseded-by`, which is the same kind of claim: where a function went. So the population is routed ∪ ncc ∪ `superseded-by`, and the new test enforces it.
2. **Worklists count more than stale signatures.** A disposition flip leaves both hashes unchanged, and a `groundTruthManifest` trim's rendered hash is unobservable. So `hash-sheets.ts` § 4 adds refused, changed-since-base and unsigned rows to the stale ones (58 acts, then a 3-act tail).
3. **Out-of-list edits in this subtask**, each disclosed in its commit:
   - `tools/agent-generator/render.ts` (Spec 122);
   - `tools/agent-generator/__tests__/{render,consumer-profile.adapters,consumer-profile.real,derive.stale-overlay}.test.ts`;
   - the drafting aids.

   `derive.ts`, the adapters and `canonical/**` are inside Task 15's grant.

## Residuals (carried to the parent doc)

- **VALVE-1 blind spot.** A trim row's rendered hash is the empty-piece hash, because the Ground truth section renders as one span for the whole manifest. The fix is per-trim spans in the adapter's trim renderer.
- **The DesignTokens-trim supersessions are true only once 16.3's `files[]` negations land.** Each row carries a comment. Data adds that the `dist/*.android.kt` glob doesn't reach `dist/android/…` until the drop.
- **The ComponentTokens trims keep `artifact: dist/ComponentTokens.*`** as their entry key in the derived frontmatter. The identity rule forbids changing it, and it isn't rendered in prose.
- **Flips leave byte-identical signatures.** The evidence notes are the record; Ada, Lina and Data each disclosed this.
- **Stacy's residuals:**
  - the carve-out heading still says "enumerated";
  - civitas `#governance-processes` still says "monthly" and "ballot measure";
  - `trigger-lens` is uncredited for its parser-keyed clauses.
- **Governance:**
  - the Start Up Tasks #5 / TCP tension (a ballot draft, Thurgood);
  - the Integration Guide's M0a contradiction (Ada drafts);
  - `output: './dist'` as the root cause of the snapshot leak (Peter).
