# Design Outline: 132 — Native Adopter (placeholder)

**Date**: 2026-11-07
**Spec**: 132-native-components-in-app
**Author**: Thurgood (spec formalization), briefed by the orchestrator
**Status**: **PLACEHOLDER.** No round has run. This file holds no requirements, no design and no scope decision. Nothing here is built, scaffolded or created. It is not the outline that the native plan's § 6 item 8 describes (seeded from the charter, the measured list, the probes and 129's rulings, at Peter's go). That outline replaces this file when its round runs. **Keep the string `**PLACEHOLDER.**` exactly as written, here in the Status line, until the seeded outline replaces this file**: the goal record's close is read as the first merge at which this file no longer carries it (§ 4.2; Kenya, confirmed 2026-11-07). Until then this file gives Spec 132 a directory, a row at each release's S, and a path that records can name.
**Owners (by domain)**: Kenya (iOS: packaging, the D4 app, the render lane) and Data (Android: the same), the goal record's owners; Lina (component content, the public-API pass, the contract tests, the access-level and contract-validation ballots); Ada (`generate`, which owns our module's manifest, and the deprecated aliases; the plan puts the generator paths in 132's write scope, with Ada as one of its owners); Leonardo (the fixture app's content, the adopter journey, the walkthrough); Thurgood (formalization, the D6 checker); Stacy (the claims passes, the CLOSEOUT read).
**Naming**: `132-native-components-in-app`, **Peter's ruling**, received 2026-11-07T17:59:15Z (`date -u` at receipt; chat, relayed by the orchestrator), verbatim: "Re: 3, Rename". "3" was #723, whose question was "Directory name: keep 132-native-adopter, or rename to 132-native-components-in-app?". The plan of record gives no directory name; the first draft used the other option, from 133's outline and the priorities record ("the native adopter spec"), and Leonardo proposed this one after the goal's "in the app as described" (seat read, 2026-11-07). Every record that names a 132 path uses `132-*`, so the rename moved no Trigger.
**Pointer-shaped on purpose**: facts that go stale (error counts, view counts, what 129 has shipped, sizes) are not copied here. They come from their records, and from `spec-facts.sh` at the round's opening (§ 5).

---

## 1. Why this file exists now

- **Peter, received 2026-11-07T17:46Z** (chat, relayed by the orchestrator; UNVERIFIED here: the relay is chat only), verbatim: "Let's capture 132 with what we have so far. I don't want to risk losing it."
- **The goal, in Peter's words** (verbatim, received 2026-11-05T03:09:41Z, as the goal record quotes them; the typo is kept as received and reads "will successfully render", meaning unchanged):
  - "Re: 2, I was envisioning (a)". Option (a) was components as a **package dependency** (plan-r2 § 1, "The goal, in Peter's words"; what "dependency" means there).
  - "they can use our existing ones and use DesignerPunk to build more as they require."
  - "That the components are functional, and will successful render, in the app as described."
- **What "what we have" is**: Spec 132 was approved as part of the native plan, as the second of two specs under one goal. The approval's record is `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/` (`README.md` § "What Peter decided, and when"; his words in `peter-2026-11-05.md`). Until now 132 existed only in references.
- **What the folder does**: under ballot `2026-11-04-waiting-spec-row` § 2, a directory with a `design-outline.md`, no `requirements.md` and no `closed` outcome line is a waiting spec. It is listed at each release's S, and Peter answers its row open, park (with a git-visible re-ask event) or closed. **No outcome line is written now.** The priorities record says 132's outline round "opens on Peter's go" (its walk line of 2026-11-05). This file is not that go.

## 2. The plan of record, by pointer

Everything below is in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` at `b89163c41`, read with its `README.md`. It is cited, not copied.

| What | Where |
|---|---|
| The goal, in Peter's words | `.kiro/issues/2026-09-26-native-component-distribution.md` § "Goal (Peter, 2026-11-05)". That record is the goal's home until 132's outline round settles (§ 4.2 below). |
| **132's acceptance sentence**: Peter's original sentence, moved word for word from 129 under "B (a)" | the same section, "Spec 132's acceptance sentence" |
| The definition of done, D1–D10. D1–D3 are 129's ("C yes"); **D4–D10 are 132's** | plan-r2 § 1, "The definition of done", with the D1 probe-sentence amendment in `README.md` |
| **What "as described" does not mean**: that system controls look the same on iOS 17 and iOS 26; a component that follows platform convention gets the system's look, and one that departs is drawn by us and checked by D5 | plan-r2 § 1, "What 'as described' does not mean"; ballot `2026-10-18-true-native-development-is-not-true-native-design` |
| **The `rendering:` prerequisite**: each component records its choice per platform in a `rendering:` field, before 132's render lanes. No component has one today | the same paragraph of plan-r2 § 1 (Lina; Leonardo PLAN R2) |
| The six work packages, and the line between the specs: "129 owns what `generate` emits and what the package ships; 132 owns what is written into, or runs in, an adopter's app" | plan-r2 § 2 |
| **How 132 is cut**: one vertical slice, then one unit per family. **The first family**: Chip-Base, Chip-Filter and Chip-Input, plus Icon-Base, one adopter-authored component (D10) and that family's code samples (D8). "The tasks round still picks." **The adopter component**: its criteria are D10's; the pick is the team's at the tasks round, not Peter's. D10 includes one deliberate same-name case, which proves the naming rule | plan-r2 § 2, "How 132 is cut"; § 1, D10; § 3, the design conflict |
| **Order (x′)**: 129 → 132's first family → Peter re-places the remaining families against 131 using that family's measured cost → 131 → 128 → 130 | plan-r2 § 7 item 3; Peter, "Let's go (x′)", 2026-11-05T04:06:22Z; the priorities record's 2026-11-05 walk line |
| What the outline round is seeded from, and what happens at its merge | plan-r2 § 6 item 8 |
| The spec structure (B2) and the design conflict over where adopter components and their tokens live | plan-r2 § 3 |
| The consumer overlays' flip at the support claim | plan-r2 § 4 |
| Sizes, by seat | plan-r2 § 8 |

## 3. Decisions waiting for 132's outline round (not decided here)

| Decision | Source of the deferral |
|---|---|
| D4–D10 (§ 1 of the plan) | `README.md`, the deferred-decisions table: "Spec 132's outline round" |
| Plan § 7 decisions 8 (when adopters are told to start a native product), 9 (device reads), 10 (who may exclude a contract) and 11 (whether adopter components meet the same bar) | the same table |
| **The iOS minimum, asked again**: "iOS 17.0 stays … the floor is asked again at Spec 132's outline, before any native support claim" | Peter's "4 (a)", received 2026-11-05T13:05:54Z; Spec 129 `design.md` § 0 |
| The Android toolchain range numbers | Spec 129 `design.md` § 0, decision 5's row: "The range numbers stay with Spec 132's D4" |
| **Native as a semver promise** (already ruled, carried): native changes made before 132's support claim ship in minor releases; deprecated-alias emission and D9's public-API diff land before the claim | Peter's "7 (a)", same receipt; Spec 129 `design.md` § 0 |
| **Android** (Data, seat read 2026-11-07): the API-26 floor test belongs in 132's own module, because a Kotlin compile checks no API level; the range numbers wait for the D4 app's builds; the render probe (an emulator on `ubuntu-24.04` versus Robolectric) is still unrecorded | ballot `2026-11-05-core-goals-android-minimum` F-1 (iii) (the floor rule "becomes a test in Spec 132's module"); Spec 129 `design.md` § 0; plan-r2 § 2, "Probes" |
| **iOS** (Kenya, seat read 2026-11-07): an iOS 17 runtime probe for the outline, as a one-off `macos-15` CI run, which needs Peter's go and a workflow grant; until then the standing wording is "built for iOS 17.0, not run on 17" | plan-r2 § 7 decision 4; Spec 129 `design.md` § 0, "The wording rule that follows 4 (a)" |
| Q12 and Q13, and the type table, are provisional until 132's D4 app builds | Spec 129 `requirements.md` § "Open items for design and tasks"; `design.md` § 4 |
| The team's, not Peter's: tool choices, the comparator and the D6 checker, the module and naming design, the INSTALL pointer's form | plan-r2 § 7, the closing list |

## 4. What waits on this spec (by path)

Each owner keeps their own record. This PR edits none of them, except where § 4.1 says.

| Record or line | Owner | Trigger at `0bc48935b` | What waits |
|---|---|---|---|
| `.kiro/issues/2026-09-26-native-component-distribution.md` | Kenya, Data (Lina, Ada) | `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` | The goal's home. Under plan-r2 § 6 item 8 it closes into 132 at the merge of 132's real outline, not at this placeholder (§ 4.2). The plan also places Kenya's iOS render spike and Data's Android render probe in this record, before 132's outline (plan-r2 § 2, "Probes"); none is recorded there at `0bc48935b` |
| `.kiro/issues/2026-11-06-theme-family-persisted-form-for-132-d5.md` | Kenya, Data | `path:.kiro/specs/132-*/design-outline.md` | **This file fires it** (§ 4.1). The theme family's persisted form, decided with runtime switching at D5 |
| `.kiro/issues/2026-09-29-instruments-parser-and-resolver.md` | Thurgood | includes `path:.kiro/specs/132-*/tasks.md` | The instruments parser, before 132's first tasks round. This file creates no `tasks.md` |
| `.kiro/specs/131-governance-simplification/design-outline.md` L394, the park line | Thurgood | re-ask `path:.kiro/specs/132-*/completion/first-family-measured-cost.md` | 131's re-ask. The measured-cost record is declared by 132's tasks round; this file creates nothing under `completion/` |
| `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md`, the 2026-11-05 walk lines | Thurgood | `manual` | 132's place, and the re-placement event. Its line "Spec 132's directory does not exist yet" goes stale at this file's merge; a dated pointer there is owed by its steward, outside this PR |
| `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` | Lina | `release:16.3.0:phase-1` | The native behaviour items 129 does not accept (row 14's A3, I1–I3, A1, A2, A4, A6's non-ripple parts) belong to 132's D5 and D6 (Spec 129 Requirement 8.4) |
| `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` | Lina (Kenya, Data verify) | `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` | The component repair 129 does not close. At 129's CLOSEOUT its owner re-rules it to a 132 event (the record's "At CLOSEOUT" item) |
| Spec 129 `requirements.md` § "Out of scope, with the reason" | Thurgood (formalizer) | — | D4–D10, option C and every test run; the row 14 behaviour items; Sparky's web token-resolution check, "flagged … for 132's outline" |
| Spec 129 `requirements.md` Requirement 14.2 | Thurgood (formalizer) | — | Q10 option (c), the harness's per-component result as a readiness input, carried by 132's D7 |
| Spec 129 `requirements.md` § "Open items for design and tasks"; `design.md` § "Spec 132 inputs drafted this round (not 129 acceptance)"; `inbound-from-lina-design-2026-11-05.md` § 7 | Lina, Kenya, Data, Ada | — | The 132 inputs drafted in 129's design round, each through its own process later: the access-level ballot, the per-platform contract validation format, and the theme family's persisted form |
| Spec 129 `tasks.md` header, "Dependencies" | Thurgood (formalizer) | — | "Spec 132 (planned, no directory) receives what 129 does not close". It is accurate until this file merges, and is corrected at 129's next tasks amendment |

### 4.1 The record this file fires

`.kiro/issues/2026-11-06-theme-family-persisted-form-for-132-d5.md` has the Trigger `path:.kiro/specs/132-*/design-outline.md`, so creating this file fires it. Its own text says what the touch owes: "At that touch the owners name this record in the outline and re-rule the Trigger to the D5 decision, or close it." This section names it. **The re-rule is Kenya's and Data's act** (README rules 9 and 11), and lands in this PR before it merges. They confirmed the line at their seat read of this file (2026-11-07, `chore/132-placeholder` @ `d06c907ad`; Kenya set the glob, so a rename moves nothing; Data agreed D5 is designed in `design.md`), and their commit `5adccca8f` writes it in the record: `path:.kiro/specs/132-*/design.md`, the D5 decision.

### 4.2 The goal record's wording, which this placeholder meets literally

The goal record's owners are Kenya and Data (the distribution shape; they wrote its goal-home sentences on 2026-11-05), with Lina and Ada as content and generator owners. Four of its sentences tie its close to "Spec 132's design outline": the Status line and § "Goal (Peter, 2026-11-05)" ("until Spec 132's design outline exists"), and the Trigger's "What firing obliges" ((2) "until Spec 132's design outline merges and names this record"; "At 132's outline merge this charter closes into the spec under rule 5"). This placeholder exists, merges and names the record, so it meets that wording literally, although plan-r2 § 6 item 8 closes the record only at the seeded outline's merge. **This file reads the record as still the goal's home.** The owners' reword lands in this PR; the drafted line is routed to them by the orchestrator and is not written here as theirs.

## 5. At the round's opening

- Run `bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh 132 <since-sha> <read-sha>`.
- Read Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" (its grep is Step 0).
- Re-read § 4 against `git grep -n '132' -- .kiro/issues ':!.kiro/issues/archive'` at that SHA.
- Replace this file with the outline that plan-r2 § 6 item 8 describes.
