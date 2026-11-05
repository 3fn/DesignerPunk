# Spec Feedback: 129 — Consumer-Generation Completeness (requirements)

**Spec**: 129-consumer-generation-completeness
**Created**: 2026-11-05
**Phase file**: requirements. The outline round and the Q5 round are in `design-outline.md` in this folder.

---

## Requirements Feedback

### Context for Reviewers

- **The round is open.** Peter, received 2026-11-05T04:34:05Z (`date -u` at receipt; orchestrator relay), verbatim: "652, 653 and 654 are merged; go for requirements". He had read: "the next step needs your go: 129's requirements round. Its outline gate is passed once #654 is in. Under the gates, Thurgood writes `requirements.md` and the seats review it before design starts. That merge is also the moment 131's current park fires and is answered 'not yet, after 132's first family'." → requirements.md § header.
- **Facts at round-open**: `evidence/facts-at-45f5262ee.md`, the unedited stdout of `bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh 129 4d10202b2 45f5262eeebfb3bbb2efa6d0b64df1790451237b`. Rows are candidates, not verdicts. Row 3 is the 17 records this file's path triggers; row 4 is the one the outline does not name; row 7 is E2's grep.

**Settled, not under review** (each with its source; please do not re-litigate):
- The acceptance sentence: the charter at `b841db957` (#652), Peter's "B (a)", received 2026-11-05T04:07:43Z → requirements.md § "Introduction"; `evidence/2026-11-05-native-plan/peter-2026-11-05.md`.
- D1, D2 and D3 as 129's part of done: `evidence/2026-11-05-native-plan/plan-r2.md` § 1 at `b89163c41`, Peter's "C yes". Changing a D row is Peter's → Req 1.9.
- The two-spec structure (129 owns what `generate` writes and what the package ships; 132 owns what runs in an adopter's app) and order (x′): Peter's "A yes" and "(x′) as defined" → design-outline.md § 1, "Relation to other specs".
- Q5's answer: B's reach (token files and component source compiled, iOS and Android, from a packed install), four contexts, measuring lanes first, no test runs; option C is 132's → design-outline.md § 5.1.
- On web, "compiles" means the existing Consumer Guard → the charter § "Acceptance".
- 129 owns native theme emission (Peter's 2026-10-20 seam ruling) → design-outline.md § 5.2, Q2.
- Decisions deferred by gate: plan decisions 4, 5 and 7 at 129's design round; decision 6 at 129's tasks round; D4–D10 and decisions 8–11 at 132's outline → `evidence/2026-11-05-native-plan/README.md`.

**Under review**: the 15 requirements and each one's named instrument and CI context; the 17 record dispositions (requirements.md § "Record dispositions"); the open-items list and where each § 5.2 question went.

**Scope boundaries**:
- Not under review: the § 5.3 design questions (listed in requirements.md § "Open items", not ruled); the list's file format, runners and pins (tasks); tool choices (the team's, plan-r2 § 7).
- Requirements say what and how it is accepted, not how it is built. A reviewer who finds a "how" in an AC, please flag it.

**Stakeholders and why each is asked** (Spec-Feedback-Protocol § "Stakeholder Identification"):
- **Ada, required**: owner of the pipeline, generators and validators. Reqs 4–7, 9–13; dispositions #1–#13; the drift-report record's call (#13).
- **Lina, required**: owner of the component tier. Reqs 4, 5.5 (Requirement 1.5's decision), 5.7–5.8, 6.7–6.9, 8, 14; dispositions #14–#17; Req 14's reading.
- **Kenya, required**: designer of the iOS harness lanes; iOS verifier. Reqs 2 and 3 on iOS; 4.9 (her charter text); 8.4 (I1–I3).
- **Data, required**: designer of the Android harness lanes; Android verifier. Reqs 2 and 3 on Android; 6 (Kotlin types); 8.2–8.4 (A-items).
- **Stacy, required**: verifiability. Is each AC decidable at CLOSEOUT from git, a CI context and a run, without asking the author? Are her handoff conditions 1–4 and properties 1–5, 7 and 8 carried faithfully (Reqs 1, 2, 3)?
- **Leonardo, optional, one line each if read**: Req 1 and Req 15, the adopter-facing reach and wording, and the handoff to 132; Req 11's founder journey; Q3b's intent (he co-owns it).
- **Sparky, optional, scoped to web**: Req 1.6 (web "compiles"), Req 7.1 (the web half of shadow colours), Req 9's carried Q3b (his browser check).
- **Thurgood**: author; incorporates.
- **Round count**: one R1, then incorporation. A second round only if an R1 entry changes what a requirement covers, or raises a question for Peter. Spec-authoring cost model in view.

**E2's dispositions for the grep's other matches** (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec"; facts row 7; the 17 this file triggers are in requirements.md § "Record dispositions"). Format: `<record> — intake | re-rule | leave — <reason>`.
- `2026-06-24-blend-system-architecture-and-oklch-alignment.md` — leave — the colour-track spec's record; it names 129 in prose only.
- `2026-06-24-mathematical-relationship-parser-validation-gaps.md` — leave — already taken in: its Trigger is CLOSEOUT, as E2 asks; carried by Req 13.1.
- `2026-07-19-application-mcp-search-tokens-partial-match-signal.md` — leave — Spec 131's.
- `2026-08-13-component-token-platform-references-noncompiling.md` — leave — CLOSEOUT Trigger; carried by Req 5.9.
- `2026-09-17-platform-build-verification-harness-candidate.md` — leave — Trigger at `tasks.md`, where the build unit is declared; carried by Req 2. Kenya and Data may note that a later `tasks.md` amendment would fire it too, the risk E2 names for requirements and design.
- `2026-09-26-native-component-distribution.md` — leave — the goal record, `path:harness/**`; Spec 132's.
- `2026-09-26-native-component-theme-hardcoding.md` — intake — carried by Req 4.7 and 8. Lina's planned re-rule "to this spec's `requirements.md`" (design-outline.md § 3 row 15) would fire again at any amendment of this file; E2's target is `completion/claims-pass.md`. Its Trigger is `manual`, so it does not lapse at this merge.
- `2026-10-02-consumer-generation-completeness-spec.md` — leave — the charter; CLOSEOUT.
- `2026-10-03-native-generator-findings-for-spec-129-intake.md` — leave — CLOSEOUT; carried by Req 6.
- `2026-10-03-semantic-override-map-type-not-exported.md` — leave — CLOSEOUT; carried by Req 13.3.
- `2026-10-12-generate-staleness-decided-by-file-times.md` — leave — its event is its own fix site (`src/cli/staleness.ts`). The design round reads it beside Req 5.8, since both decide what "fresh" means (Ada).
- `2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md` — leave — its Trigger fires at the next edit of `tests/consumer-integration.test.ts`, and Reqs 5, 7, 9, 11, 12 and 13 add cases to that file. Lina, as owner, should expect the firing at 129's first such PR.
- `2026-10-15-123-u5-instrument-findings.md` — leave — 16.3.0.
- `2026-10-18-drawn-control-drift-ios-android-web.md` — intake of the native half — carried by Req 8. Its Trigger is `release:16.3.0:phase-1`, so this merge does not fire it. Its planned re-rule at the PR that closes the last web item names this spec's `requirements.md`; E2's target is `completion/claims-pass.md` (Lina).
- `2026-10-18-spec-priorities-by-outcome.md` — leave.
- `2026-10-23-audit-link4-rejects-sha-alone-commit-line.md` — leave.
- `2026-10-23-signing-act-shape-review.md` — leave — its event is 129's final unit merge or 125-B U3, whichever comes first (Thurgood's record); noted for 129's tasks round.
- `2026-10-24-native-theme-emission-owner-stated-two-ways.md` — leave — its 129 half is done (design-outline.md § 3).
- `2026-10-24-token-creation-review-no-pr-signal.md` — leave — Spec 131's; Req 7.3 is where it would bite in 129.
- `2026-10-25-avatar-agent-svg-hardcoded-border-width.md`, `2026-10-25-consumer-profile-16.1.0-trio-lines.md`, `2026-10-25-real-browser-test-lane-for-form-participation.md`, `2026-10-26-rule-11-standing-records-lapse-reading.md` — leave — Spec 131's.
- `2026-11-01-retire-postpublish-row-h.md` — leave — row (h)'s fix-now by 16.3.0's S.

#### [THURGOOD R1]

**How the § 5.2 questions landed** (each answered as a requirement, or carried with an owner):
- Q2: closed by the seam ruling; nothing to carry.
- Q3a: carried to design (Req 9.1; Lina, Ada). Q3b: carried to design, then a fork for Peter with the browser check in hand (Req 9; Ada, Leonardo, Sparky).
- Q4: answered as Req 11.3 (the count and its test change in one PR); the count itself is carried to design (Ada; Leonardo).
- Q6: R1 and R5 both become requirements of item (ii) (Req 5.7, 5.8). Versions or content is carried to design (Ada).
- Q7: answered as Req 10.4. It reaches Peter only if the design round finds a 129 change breaks a supported consumer; plan decision 7 is its design-round form.
- Q9: this context block; one round.
- Q10: answered as Req 14 (option (a)); (c) carried by 132's D7. This is a reading of the approved plan, for Lina to confirm; see her question below.
- Q11: answered as Req 9.3 (either order is allowed; the CHANGELOG limitation is rewritten, not removed).
- The plan's carried four (plan-r2 § 6 item 4): the binding criterion (Req 1.4), rows 19–22's own instruments (Reqs 9 and 13, per Ada R2 § 2a), "web compiles" (Req 1.6), Requirement 1.5 led by Lina (Req 5.5).

**Thinning bar.**
- `requirements.md`: **6,690 words** (`wc -w` at this commit). It is a new file, so there is no before.
- **Fact sentences avoided by citing the facts file**: each record's Class and Trigger (facts row 3; 23 outline records plus the new P3); the 17-record trigger list and its P1 count (row 3); the archived state of six records the inbounds cite (row 5); E2's grep, 41 lines (row 7). None of these is restated in requirements.md.
- **Restated on purpose**: the acceptance sentence, verbatim, so that Req 1.1's byte-for-byte check has something to compare (Stacy's condition 1 is a string match). It drifts only if the charter changes, and then Req 1.1 fails visibly.
- **Net root records on this branch: 0.** Nothing filed, closed or archived. The owners' re-rules and closes (dispositions #1–#17) will change Trigger lines, not the count, except where Lina closes #16 and Ada may close #13 (−1 or −2).

**Counter-argument, worked against this draft.**
- **The objection**: fifteen requirements and 91 acceptance criteria is the governance volume Peter wants thinned, and many criteria restate what plan-r2 and the Q5 round already say.
- **Folded in**: criteria cite the plan, the round entries and the records rather than restating their reasoning; the design questions are a list, not a discussion; option detail stays in the inbounds.
- **What survives**: the criteria count is large because each row needs a decidable acceptance with a named context, which is what Stacy's lens and outline § 4 ask for. A shorter file would push "which instrument accepts this row" back to the tasks round, where Stacy R1 showed it fails LENS question 6. The size is the price of no row being accepted on a reading. Whether that is thin enough is Spec 131's measure, not mine.

**A merge precondition the reviewers should see.** This file's merge fires 17 records. Unless each owner's re-rule or close is an ancestor of the merge commit (README rule 11), all 17 lapse there, ten of them P1 (their first lapse). So the owners' record-only commits (Ada 13, Lina 4) land on this branch before Peter merges, or in PRs that merge first. The re-rules are the owners' acts under rule 9; I cannot write them.

**Directed questions**
- [@ADA] Disposition #13, the drift-report record: take it in (it becomes a requirement in R2), re-rule it, or close it with a reason? → requirements.md § "Record dispositions" -- [THURGOOD R1]
- [@ADA] Req 10's carried item: the charter's item (iii) says `ComponentTokens.*` keeps shipping, and plan-r2 WP1 says it stops. Which is the design round's starting text, and does the charter need an edit by you? → requirements.md Req 10 -- [THURGOOD R1]
- [@LINA] Req 14: do you read the approved plan's D7 as settling where option (c) lives, so that (a) alone needs no Peter ruling now? If not, the fork goes to Peter in R2. → requirements.md Req 14 -- [THURGOOD R1]
- [@LINA] Req 8.4: for I1–I3, A1, A2 and A4, do you want them fixed in 129 with a labelled seat read, or moved to 132's D6 now? → requirements.md Req 8 -- [THURGOOD R1]
- [@LINA] Disposition #9: token-index item 2 was your fix-now "before the requirements commit". At `45f5262ee` it has not landed. Does it land before this file merges, or does the outline's line change? → requirements.md § "Record dispositions" -- [THURGOOD R1]
- [@KENYA] [@DATA] Req 2.6–2.8 and 3.2: are the iOS compile form, the probe, the pins and the "file + normalised diagnostic" key stated so that each is checkable from the pin file and the list file, with no reading? → requirements.md Reqs 2, 3 -- [THURGOOD R1]
- [@STACY] Can each AC in Reqs 1–3 be decided at CLOSEOUT without asking its author? Name any that cannot. I am not asking for replacement wording. → requirements.md Reqs 1–3 -- [THURGOOD R1]
