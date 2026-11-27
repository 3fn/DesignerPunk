# Spec Feedback: Native Components in the App — Design Outline

**Spec**: 132-native-components-in-app
**Created**: 2026-11-27
**Structure**: split by phase (Spec-Feedback-Protocol § "The Feedback Document"). This file is the design-outline phase only. The later phase files are created when their phase opens, never earlier: `requirements.md`, `design.md` and `tasks.md` are Trigger paths for open records (outline § 4.2), and this directory's files share their basenames.

---

## Design Outline Feedback

### Context for Reviewers

**What is under review**: `design-outline.md` R1, read at `origin/main` `8553499b1`. Review the outline, not the plan behind it: the plan of record (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` at `b89163c41`) was approved as a whole, and what Peter ruled there is not re-opened.

**Settled, not for re-litigation** (each with where it lives):
- The two-spec structure, 129's narrowed sentence and this spec's acceptance sentence, D1–D3, and order (x′) → outline § 1 and § 3; native-plan `README.md` § "What Peter decided, and when".
- The Android minimum, API 26; native changes ship in minors before the claim, with aliases and D9's diff before it ("7 (a)") → Spec 129 `design.md` § 0.
- The iOS minimum stays 17.0 **for now**, and is re-asked at this gate ("4 (a)") → outline § 5.1 P-6. Its evidence is Kenya's probe.
- Peter's 2026-11-27 "Spec with (a), and start 132's outline round now": this PR is the carrying event for the distribution charter → outline § 7.

**Under review, and what each kind of entry is for**:
- **§ 5.1 (Peter's questions)**: are the options right and complete, is the plan's recommendation still yours, and what evidence is still owed? Do not pick for Peter.
- **§ 5.2 (the team's questions)**: answer the ones you own; T-1 closes in this round.
- **§ 5.3 (scope)**: S-1 (web) needs Sparky and Leonardo.
- **§ 4.2 (records)**: confirm or change the proposed disposition of each record you own. The disposition lines themselves are written in the requirements round (Process-Spec-Planning § "Before Formalizing").
- **§ 6 (probes)**: Data and Kenya run them during this round and record results in the goal record before the PR merges.
- **§ 8 (cost)**: correct your own row.

**Out of scope for this round**: requirements, design or task text; the colour fork in #870 (Peter's, in that record); row 7's re-answer (#864, Peter's); 131's content.

**Dependencies**: PR #868 (Peter's answer in the goal record) merges before this PR, and its owners re-token the record to `merge:#880`, so the record's close is in this PR (outline § 7). Kenya's spike evidence is on draft PR #879; Data's probe grant is #878. #870 and #873 are P1 preconditions for adopter component tokens (outline § 4.1), not merge preconditions for this PR.

**Reviewers, and why each** (Spec-Feedback-Protocol § "Stakeholder Identification"):

| Reviewer | Why | Entry scope |
|---|---|---|
| **Kenya** | Owns the iOS half: packaging, the D4 iOS app, the iOS render lane. Co-owns the goal record and the theme-family record. Her inbound and her rule-10 section on #868 carry three iOS obligations: the iOS minimum re-ask (P-6), the iOS 17 runtime probe (§ 6) and the wording rule. Her spike (#879) is § 6's iOS evidence | full outline; § 6; T-12, T-13 |
| **Data** | Owns the Android half: the Gradle module, the D4 Android app, the render lane. Co-owns the goal record and holds its Trigger line. His inbound carries the toolchain range numbers (P-9) and the API-26 floor test in 132's module. Files the `.github/**` grant for his CI probe | full outline; § 6 probe |
| **Lina** | Owns the component content, the public-API pass, the contract tests (most of the plan's size), the three #877 records and the repair, drawn-control and readiness-tables records. T-1 is hers with Leonardo | full outline |
| **Ada** | Owns `generate`, which writes our module's manifest, the deprecated aliases, and the two P1 preconditions (#870, #873). Q12, Q13 and the type table are hers and provisional until D4 builds. T-4's token placement | full outline; § 4.1 |
| **Leonardo** | Owns the fixture app's content, the adopter journey, the walkthrough and the code samples (D8, D9). Co-owns T-1 (`platformParts:`). Consumer voice for P-2 and P-7 | full outline |
| **Stacy** | Her conditions 1 and 2 bind the acceptance sentence and the D rows. Reads D6, D7 and the measured-cost record for verifiability. Owns the activation read of Data's grant and the LENS at the tasks round | full outline; § 3 |
| **Sparky** | The acceptance sentence names all three platforms, and Spec 129 carried his web check to this outline (S-1). The outline touches no other web surface | § 5.3 S-1 only |

**Not tagged, and why**: Thurgood is the author, and incorporates. Peter is asked in one batch after the round (§ 5.1), not in this file.

**Cost**: reviewers self-write their entries (about 4.75–6.25 sessions for R1; outline § 8).

---

#### [THURGOOD R1]

- Seeded the outline from the plan of record, the goal record, 129's `design.md` § 0, its CLOSEOUT pass, the four 129 design inbounds, the records E2's grep finds plus five hand-added (#870, #873, #877's three) and one glob it misses (the instruments parser). → design-outline.md §§ 1–4
- Every deferred decision is an open question with options and no pick. → design-outline.md § 5.1
- Wrote the `open` outcome line for Peter's 2026-11-27 answer, as the formalizer (RELEASE-FLOW 3a). → design-outline.md, last line
- Facts committed as unedited stdout. → `evidence/facts-at-8553499b1.md`
- [@KENYA] Is P-6 framed so the iOS 17 numbers decide between its three options, and is P-10's iOS half (local download, a CI grant, or "not now") the right ask? Is § 6's summary of #879 faithful? → design-outline.md § 5.1, § 6 -- [THURGOOD R1]
- [@KENYA] [@LINA] T-13: which check proves "hidden from VoiceOver" now that XCUITest finds hidden views? [@DATA] the Android twin? → design-outline.md § 5.2 -- [THURGOOD R1]
- [@ADA] [@LINA] [@LEONARDO] T-12: fix the 26 fixed `.system(size:)` lines through scaled type, or exclude the Dynamic Type audit with a reason? → design-outline.md § 5.2 -- [THURGOOD R1]
- [@KENYA] [@DATA] Do you accept merge preconditions 1–3 in § 7 (the `merge:#880` re-token, probes before the decision sitting, and the record's close committed on this branch)? And T-11: should the "Native status" passage change at this merge, given that no limitation marker names the goal record? → design-outline.md § 7 -- [THURGOOD R1]
- [@DATA] Does #878 need anything from Peter beyond its merge, and is its result recorded in its fixing PR with a pointer in the goal record, as § 6 says? → design-outline.md § 6 -- [THURGOOD R1]
- [@LINA] [@LEONARDO] T-1: one `rendering:` field, or one plus `platformParts:`? This round closes it. → design-outline.md § 5.2 -- [THURGOOD R1]
- [@LINA] Is § 2's reading right that the first family is cheap to repair (no pinned entry on Chip-*, two on Icon-Base Android), so its measured cost under-states the repair share? → design-outline.md § 2, § 3 -- [THURGOOD R1]
- [@ADA] Does § 4.1's interim rule (D10 uses only the families that compile, until #870 lands) hold, and is the harness-consumer fixture the right guard to name? → design-outline.md § 4.1 -- [THURGOOD R1]
- [@LEONARDO] P-2 and P-7 together: under "per family", is the first family's release the first support claim, and does the overlays' flip happen then? → design-outline.md § 5.1 -- [THURGOOD R1]
- [@STACY] Is the measured-cost record's proposed content verifiable as written, and is anything in § 5.1 framed so that an answer would dilute a D row? → design-outline.md § 3, § 5.1 -- [THURGOOD R1]
- [@SPARKY] S-1: should 132 carry "a check that web component source resolves against a consumer's generated CSS", and would doing so or not doing so change anything a web adopter is promised? → design-outline.md § 5.3 -- [THURGOOD R1]

---

## Requirements Feedback

*(Opens with the requirements phase, in `feedback/requirements.md`.)*
