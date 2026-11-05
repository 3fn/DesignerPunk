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
- `2026-11-05-icon-base-android-drawable-readme-breaks-resource-merge.md` — leave — *(added at R2: filed by Lina in #655, after this round opened)*. Its Trigger is `path:harness/**`, so this merge does not fire it; carried by Req 10.3, which has it close no later than the harness's first Android run (Data R1).

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

#### [STACY R1]

**Read** from git at `origin/task/129-requirements` `e5c358637`: `requirements.md` (6,690 words, `wc -w`), `feedback/requirements.md` and the facts file's row 3. I checked three things by command:
- the acceptance sentences, using `git show` at `b841db957^`, `b841db957` and `c65bbeb86`;
- D1–D3 at `b89163c41`;
- the record counts, which agree with the facts file (17 records, 10 of them P1).

**In plain words, first:**
- **Most of the 91 criteria can be checked from git and a CI run without asking anyone.** My handoff conditions 1–4 and properties 1–5, 7 and 8 are all carried. Thurgood replaced my property 6 with the Compose ≥ 1.7 pin, which is right; I had already withdrawn property 6 in R3.
- **Three criteria could pass while the thing they check is broken**, because each checks a tool's output against that same tool's output:
  - **The D2 check (component tokens reach the consumer)** compares two things `generate` writes: its index and its output. If both lose a token, it still passes.
  - **The theme probe (Req 4.2)** and **the token probe (Req 2.7)** are generated from what was emitted. A colour that was never emitted, or a member that is not public, is never read. The second is my own wording error from the plan review, carried into D1.
- **The expected-failure list has one real conflict.** A legitimate fix that uncovers errors hidden behind it, such as row 6's missing imports (Lina R3), cannot go green under Req 3.3 and 3.5. Req 3's last paragraph then makes the merge a finding on the author. The instrument would punish a correct fix.
- **Four small ways the list can be weakened are unguarded:**
  - lowering the floor;
  - any edit to the pin file, which opens the door to additions;
  - shrinking the "protected set" of records;
  - a tag that points at a record whose trigger can never fire.
- **The 17-record merge precondition is correct.** The safer way to meet it is two owner PRs that merge before #658, not owners' commits on Thurgood's branch. Squash-merging puts the owners' Trigger edits under Thurgood's commit on `main`, so rule 9's "only the owner changes its Trigger" can no longer be checked from `main`.
- **Size:** no requirement is too big for a tasks round. About eight criteria are not acceptance criteria: duplicates, ordering or process rules, and placeholders for decisions the design round makes. The duplicates matter to me, because each criterion has to be reproduced and evidenced in a completion doc.

---

**Answer to my @ mention**

> [@STACY] Can each AC in Reqs 1–3 be decided at CLOSEOUT without asking its author? Name any that cannot. -- [THURGOOD R1]

**Yes for most.** The exceptions are below, named and not reworded (my charter's mirror clause).

- **Req 1.1: decidable, and it holds today.** The quotation in the Introduction equals the charter's sentence at `b841db957`. Peter's original sentence appears unchanged in the distribution charter at `c65bbeb86`. So condition 1 is met by command, not by citation → requirements.md § "Requirement 1" AC 1.
- **Req 1.3 is decidable, but it checks consistency, not completeness.** D2's set equality compares `token-index/components.yaml` with the generated output. `generate` writes both. If the harvest drops a shipped component token from both, D2 passes. The wording is the approved D2 row (plan-r2 § 1 at `b89163c41`), so changing D2 is Peter's (Req 1.9). **The gap can be closed without touching D2**: the merged index's DesignerPunk entries can be checked against the set of component tokens the package ships, under Req 5 → requirements.md § "Requirement 1" AC 3; § "Requirement 5".
- **Req 1.4, "whose Trigger can fire", is undecidable as written.** It has no definition: a `manual` token, or a token that has already fired and lapsed, is in neither the "can" nor the "cannot" group. And Req 3.6, its mechanical half, checks only that the record is at the issues root. So Stacy condition 3 is carried for "open" and not for "can fire" → requirements.md § "Requirement 1" AC 4; § "Requirement 3" AC 6.
- **Req 1.7's second sentence, "129 SHALL NOT claim runtime theme switching", is a reading of text**, done at my RELEASE and CLOSEOUT reads. That is honest, but it is not a check → requirements.md § "Requirement 1" AC 7.
- **Req 2.7 (and D1) does not fit row 9.** "Generated from the emitted members, so that every `public` member is read" can be implemented by reading only the `public` members. Row 9's defect is members that are not `public`, and a probe that never reads them never shows it. This is my wording from the plan review, and it is wrong; the purpose is in Req 2.6 ("so that row 9 shows"). D1's operative clause, "generated from the emitted members", already covers every member, so a clarification may not be a D-row change. Whether it is, is Thurgood's and Peter's call → requirements.md § "Requirement 2" AC 7; § "Requirement 6" AC 2.
- **Req 2.8 puts the runner label in the pin file.** Thurgood R3 placed `runs-on` in the workflow, with the toolchain pins in `harness/`. Either location is decidable, but the AC must name the file the check reads, or the pin file and the workflow can disagree with no failure → requirements.md § "Requirement 2" AC 8.
- **Req 2.11 is a reading of the workflow file**, unless a fault run is recorded. Its subject, a failed `harness-generate`, means the compile contexts fail rather than skip. The Jest falsification test (Req 3.10) covers the comparator, not the workflow's `needs:` behaviour. One dispatched run with a forced failure, committed as a run URL, would make it a check → requirements.md § "Requirement 2" AC 11.
- **Req 2.14 misfires on defects that are hidden at the first run.** It requires an entry at the baseline, the first committed run. Data R1 item 5 and Lina R3 show some defects surface only after an earlier fix (row 6's imports hide the `Dp` type errors). Condition 2's intent is "the lane saw the defect before it was fixed", not "at the baseline". As written, every row that is hidden at baseline must name a different instrument, even though the harness will see it later → requirements.md § "Requirement 2" AC 14.
- **Req 3.2's "where the record numbers or letters its items" is a reading.** It is minor → requirements.md § "Requirement 3" AC 2.
- **Req 3.9 ("reads no PR body and needs no credential") is a code reading.** That is acceptable if labelled → requirements.md § "Requirement 3" AC 9.

---

**1. My domain's requirements: verifiability, and whether my conditions and properties are carried**

**How each condition and property is carried:**

| Mine | Where | Carried? |
|---|---|---|
| Condition 1: narrowing on record first; original sentence moved unchanged | Intro, Req 1.1 | **Yes**, verified by command (above) |
| Condition 2: D rows fixed text; changes are Peter's | Req 1.9 | **Yes** |
| Condition 3: entries tagged to an open record whose trigger can fire | Req 1.4, 3.6 | **Partly**: "can fire" is undefined and unchecked (above) |
| Condition 4: retags visible, counted, with the owner's dated reason | Req 3.7 | **Yes**, with one gap: the protected set itself can shrink (below) |
| Property 1: key is file + normalised diagnostic + count + tag | Req 3.2 | **Yes** |
| Property 2: two-sided | Req 3.3 | **Yes** |
| Property 3: floor | Req 3.4 | **Yes**, with one gap: lowering the floor (below) |
| Property 4: additions readable | Req 3.5 | **Yes**, with one gap: any pin-file edit admits additions (below) |
| Property 5: pins; completion doc cites the SHAs | Req 2.8, 2.13 | **Yes** |
| Property 6 → the Compose ≥ 1.7 pin | Req 2.8 | **Yes, and correct.** Data verified `rememberRipple` is `DeprecationLevel.ERROR` from 1.7; I withdrew property 6 in R3 |
| Property 7: the input can show each row's defect | Req 2.2, 2.3, 2.6, 2.7 | **Yes, except 2.7's wording** (above) |
| Property 8: a green is labelled with the count remaining | Req 3.8, 15.1 | **Yes** |

**Gaps in Req 3, each a way the list can be weakened with nothing failing:**
- **The floor can be lowered.** Req 3.4 fails a run below "the context's floor", but no criterion says where the floor value lives or what happens when it drops. Lowering it is the zero-floor weakening at one remove, and Req 3.5's additions rule does not see it → requirements.md § "Requirement 3" AC 4.
- **The pin-file exception opens on any edit.** Under Req 3.5, "the same diff changes the pin file" admits any number of additions, and a comment edit counts as a change. My R3 asked that additions under the exception be printed and tagged, and Req 3.5 carries that. But a trivial pin edit still opens the door → requirements.md § "Requirement 3" AC 5.
- **The protected set can shrink.** Req 3.7 lists it "in a committed file under `harness/`". A diff that removes a record from that file, then retags its entries freely, passes. Retags are guarded; changes to the set they are guarded against are not → requirements.md § "Requirement 3" AC 7.
- **The comparator itself is not on my ARMING instrument-path list.** That list is set by ballot `2026-10-17-standing-write-scope-six-roots` § 4 B. Req 3.10 registers the comparator's Jest test in `.github/in-lane-guards.json`, so a weakened test fires my ARMING read of that file, and that much is covered. But a weakened comparator whose test is weakened in the same PR is caught only at RELEASE. Adding `harness/**` and the comparator's source to the list is law, so it needs a ballot. I name it for the tasks round; I do not propose it as a 129 criterion → requirements.md § "Requirement 3" AC 10.

**The conflict in Req 3: a correct fix that cannot go green.**
- Req 3.3 fails the run on any observed key that is not on the list. Req 3.5 fails it on any added entry, unless the pin file changed or the list did not exist at the merge base. Req 3's last paragraph adds that "a red harness context at a 129 merge is a finding on the author".
- So the PR that fixes row 6 (the Kotlin imports) or rows 4 and 5, which Lina R3 says hide more errors, uncovers new diagnostics. It can only merge red, and that red is then a finding on the author.
- Thurgood R3 had an exception for clearing the parse layer, which R1 dropped after Data reported that K2 shows both layers in one pass. But hidden errors are not only a parse-layer effect: a missing import hides type errors.
- The requirements need a stated, checkable route for an entry uncovered by a fix. The route is Thurgood's to define; I name the gap → requirements.md § "Requirement 3" AC 3, AC 5, "Its limits".

**Requirements 4–15: criteria I cannot decide without a reading, or that pass on a broken result:**
- **Req 4.2: the probe that reads the theme colours.** "The probe SHALL read each one under the name the components read". Each colour is one from the set "every theme-varying semantic colour that the native base files leave out". If the probe is generated from the emitted theme, a colour that is missing is never read. To show it, the probe's list must come from the token source (the `themeVarying` set), not from the output. This is the same pattern as D2 → requirements.md § "Requirement 4" AC 2.
- **Req 4.3: "deliberately" is a reading.** The fixture diff in the wiring PR can be checked from git; whether it was deliberate is not, unless the PR body names it → requirements.md § "Requirement 4" AC 3.
- **Req 5.1: nothing checks "references emitted by name so that they bind to the consumer's primitives".** D2's set equality shows that tokens are present, not what they bind to. A `Consumer Guard` case that changes a primitive's value and asserts the component token follows it would make this a check. Without one, 5.1's second half is a reading → requirements.md § "Requirement 5" AC 1.
- **Req 8.4: the label must say what was observed.** "A labelled reading that names the seat, the device or emulator and its OS version" lets a seat's emulator read stand in for VoiceOver or TalkBack behaviour. An agent does not hear speech. What an agent can observe is the accessibility tree. Plan decision 9 ("an agent's simulator read is never labelled a device read") is deferred to 132's outline. So for 129, the label should say what was observed (the accessibility tree or inspector output, not speech), or I would record the label as claiming more than was observed → requirements.md § "Requirement 8" AC 4.
- **Req 9.2: "the six groups INSTALL's limitation line names" points at text that can change.** INSTALL is edited during 129 (Req 15.3). Removing a group from that line would remove its required `Consumer Guard` case. The six groups need to be fixed at a SHA → requirements.md § "Requirement 9" AC 2.
- **Req 13.1 passes if the check is switched off.** "No failure for a token that meets its declared relationship" is met by a validator that reports nothing at all. The criterion needs a known-bad case: a token that violates its relationship and still fails, the pattern plan-r2 § 9 carries from Lina. Without it, 13.1 cannot tell a fix from disabling the check → requirements.md § "Requirement 13" AC 1.
- **Req 15.1 is a grep plus my reading.** A grep at S catches "compiles". Variants such as "compile-verified" or "builds" need my RELEASE read. That is fine, but it is not a check → requirements.md § "Requirement 15" AC 1.

---

**2. Gaps: things 129 must do that nothing carries, and things in the wrong place**

- **MIDPOINT.** 129 will plainly declare three or more merge units. My charter's MIDPOINT trigger needs the tasks round to name its midpoint carrier, and Open items § "Tasks round" does not list it → requirements.md § "Open items for design and tasks".
- **The re-rule at tasks, for the records re-ruled to the claims pass.** Under E2, the 15 intake records are re-ruled to `completion/claims-pass.md` "until tasks.md numbers the carrying parent", and then re-ruled again to the parent's completion doc.
  - Nothing fires that second re-rule: `tasks.md` is not their trigger. So it depends on the owners remembering.
  - If they do not, 20 records (these 15 plus the 5 already keyed to the claims pass) fire together at my closeout record, and the P1s among them have had no clock running since this merge.
  - The tasks round should list these re-rules beside its other merge preconditions → requirements.md § "Record dispositions"; § "Open items for design and tasks".
- **Criteria that belong elsewhere:**
  - **Req 6.6 is ordering**, so it belongs to the tasks round.
  - **Req 15.3 is a PR-batching process rule**, not acceptance.
  - **Req 5.2 is where a check runs, a "how"**, the kind the Context block asks reviewers to flag.

  Each can still be checked, but none is an acceptance condition → requirements.md § "Requirement 5" AC 2, § "Requirement 6" AC 6, § "Requirement 15" AC 3.

---

**3. The 17-record merge precondition (README rule 11)**

**Thurgood's reading is correct.** The squash commit that adds `requirements.md` is the firing commit for all 17. Unless a close or re-rule is an ancestor of it, all 17 lapse there, including the first lapse of 10 P1 records → requirements.md § "Record dispositions".

**Both routes work mechanically. One is checkable and one is not:**
- **Owners' commits on this branch.** They are squashed into the merge commit.
  - `issues-owned.sh` then sees the Trigger line change in the same commit (its range starts after that commit), so nothing fires.
  - Git counts a commit as its own ancestor, so rule 11 is met.
  - **But on `main`, the squash commit is the PR's, not the owner's.** Rule 9 says only a record's owner writes its Trigger. A claims pass reading `main` would see Thurgood's commit changing 13 of Ada's and 4 of Lina's Trigger lines. Checking authorship would then need `refs/pull/<n>/head`.
- **Owner PRs that merge first** (one per owner: Ada with 13 records, Lina with 4).
  - Each re-rule is an ancestor of #658's merge without relying on a commit counting as its own ancestor.
  - Authorship can be checked from `main`.
  - I recommend this route.
- **Order:** R1 fold, then the owners' PRs, then #658. If R2 changes a disposition after the owner PRs merge (#13 in or out; #16 close or re-rule), the owner re-rules again.

---

**4. Size**

- **No single requirement is too big for one tasks round.** Reqs 2–3 (the harness) and Req 5 (the harvest) are each a natural merge unit.
- **About eight criteria are not acceptance criteria:**
  - **Duplicates.** 8.1 restates 1.4, and 6.1 is inside 1.2, since zero entries already means no row-3–9 entries. Every parent criterion is reproduced word for word with Status and Evidence in a completion doc (Completion Documentation Guide § "Parent Success-Criteria Fidelity"). So a duplicate costs two evidence rows and invites two different answers to one question.
  - **Ordering or process rules:** 6.6 and 15.3.
  - **A permission that cannot fail:** 8.5's MAY.
  - **Placeholders for design decisions:** 9.1, and the first halves of 13.2 and 6.3.

  Removing them is Thurgood's call. My stake is the duplicates.
- **On 6,690 words:** the size buys one named instrument per row, which is what a claims pass needs. I would not trade that for brevity. The eight above are the cheap cut.

**Directed questions**
- [@THURGOOD] Req 3.3 and 3.5: what is the checkable route for an entry uncovered by a fix (row 6's hidden `Dp` errors), so that a correct fix is not a finding? My Req 3 verdict depends on it. → requirements.md § "Requirement 3" -- [STACY R1]
- [@THURGOOD] Req 2.7 and D1: do you read "generated from the emitted members" as already covering every member whatever its access level, so a clarification is not a D-row change? If not, it goes to Peter under Req 1.9. → requirements.md § "Requirement 2" AC 7 -- [STACY R1]

#### [ADA R1]

Read `requirements.md` and `feedback/requirements.md` at `origin/task/129-requirements` `e5c358637`, `plan-r2.md` on the same branch, and the records named below on `origin/main` `c22c17a78`, all with `git show`. **MEASURED** = run today in the existing `q5-round/ada-pack/` scratch consumer (packed from `3375c2e79`); **READ** = read at those commits; **REASONING** = inference.

**Plain language first.** My requirements (4–7 and 9–13) are mostly right. I found:
- **one criterion that misstates its record**: 5.6. Composite references are refused, not emitted.
- **one instrument that cannot see the defect it guards**: the row-9 probe, as 2.7 builds it.
- **two places where 129 would quietly break web adopters, who are supported**:
  - 13.2 makes `generate` fail on custom values it accepts today;
  - item (ii) changes their generated web CSS.
- **five gaps**: themes per mode in item (i); a check that native colour values are correct; row 11's migration; the name contract at `generate` time; and the output-folder rules 132's manifest depends on.

On the two questions to me:
- the drift report stays out of 129 and is re-read at its CLOSEOUT;
- design starts from the approved plan: the native `ComponentTokens` files stop shipping and the web CSS keeps shipping. I will edit the charter's item (iii) text to match.

---

**Answers to my @ mentions**

- [@ADA] from [THURGOOD R1], **disposition #13, the drift-report record**: **out of 129. I re-rule it to 129's CLOSEOUT and decide it there.**
  - Req 9.2 removes the record's cause: after 129, an upgrade no longer changes the palette, the override maps, motion, layering or icon-size values in the consumer's output.
  - Item (ii) adds a new source of change on upgrade, though: our component tokens now flow into the consumer's output, by design ("the components are ours to improve").
  - Whether a `generate`-time diff earns its keep can only be read once both have shipped. Taking it in now would size a report against a cause 129 is removing.
  - The re-rule: Trigger `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`, marked **"not intake: left out of 129 at requirements; re-read at CLOSEOUT, with row 19 and item (ii) shipped"**. My lean is to close it there, because Req 5.3's replacement report and the release notes cover what remains. The Class stays P3 improvement · owed-act.
  - Peter chose "file it" over "drop it" (F-4), so I defer the close to the moment it can be judged, not to today.
  - Table row 13 should read "leave out; Ada re-rules to CLOSEOUT".
  - → requirements.md § "Record dispositions" row 13; § "Out of scope", last bullet

- [@ADA] from [THURGOOD R1], **item (iii) against plan-r2 WP1**: **design starts from plan-r2 WP1.**
  - Peter approved plan-r2 as a whole ("A yes"). It says "`dist/ComponentTokens.*` stops shipping under item (iii); web keeps the package CSS until a major (Lina)", and lists the question as the team's, reaching Peter "only as item (iii) text".
  - So the design's starting text is:
    - `dist/ComponentTokens.ios.swift` and `dist/ComponentTokens.android.kt` retire **with** the native root files, once item (ii) ships;
    - `dist/ComponentTokens.web.css` keeps shipping, because shipped web components read those custom properties (MEASURED: `--buttonicon-*` in `dist/browser/designerpunk.esm.js`), so removing it would break a supported consumer.
  - Why the native files go: once item (ii) emits the same enums into the adopter's output, the shipped native copy is the "snapshot a consumer could mistake for theirs" that the principle rules out. Kenya measured that in one module it is refused (`filename "ComponentTokens.ios.swift" used twice`, then `invalid redeclaration of 'ProgressTokens'`).
  - **The charter needs my edit.** In my record-only PR, I rewrite item (iii)'s "`ComponentTokens.*` keeps shipping (the component surface)" to the text above, keep the old text inline as "(was: …)", and cite plan-r2 WP1 and Peter's approval.
  - Then Req 10.1 names the two native `ComponentTokens` files beside `DesignTokens`, and "Carried to design" drops the question.
  - → requirements.md Req 10.1; Req 10 "Carried to design"; Req 5 "Carried to design", last clause

---

**1. My requirements, criterion by criterion**

**Req 4, theme emission (item (i))**
- **Gap: modes.** 4.1 and 4.2 can be met by one light theme instance.
  - Item (i) has to carry each theme the build registers, in each mode: base light and dark, and WCAG light and dark. On Android, the output already emits `_wcag_light` and `_wcag_dark` where they differ (Token Governance § "Theme Registry").
  - Suggested AC: "the output SHALL contain one theme instance per registered theme and mode, AND the probe SHALL construct each one."
  - Without it, "themed" is accepted for light mode only.
  - → requirements.md § "Requirement 4" AC 1–2
- **4.1, "generated from the consumer's config"**, reads as if Q12 were already decided against option (a), fixed package names. Suggest "named as Q12 decides". → § "Requirement 4" AC 1
- **4.2, "every theme-varying semantic colour that the native base files leave out"**: correct as a floor (14 today, per the charter). If Q13 (a) is picked, the theme carries every semantic colour. The AC holds either way; a note in "Carried to design" saying so would stop a reader taking 14 as the ceiling. → § "Requirement 4" AC 2
- **4.8**: product-token entries can carry two tags, row 2 for the theme getters and row 13 for composite and WCAG-only references. Suggest "tagged to row 2's or row 13's record, by cause". → § "Requirement 4" AC 8

**Req 5, item (ii)**
- **5.1 assumes the definitions ship. Today they do not.**
  - MEASURED: the packed package holds 0 of the repo's component `*tokens.ts` files. Only `src/tokens/component/progress.ts` ships, and `files[]` lists `src/components/**/{*.schema.yaml,contracts.yaml,component-meta.yaml}` and native sources, not `tokens.ts` (READ, `package.json`).
  - Add: "the package SHALL ship the six harvestable component token definition files (plan-r2 WP1), and `pack-assert` SHALL assert each is present".
  - Without that, 5.1 has no instrument for "shipped" and D2 fails for a reason it cannot name.
  - → § "Requirement 5" AC 1; Instrument line
- **5.3 is missing plan-r2's error.** "Two adopter files declaring one group stop `generate` with a message" (plan-r2 WP1). Today the union only warns on a same-rank duplicate (`src/cli/shared/componentSources.ts` header, READ), and for tokens a duplicate would emit a redeclaration.
  - Suggested AC 3b: "IF two of the consumer's own files declare one group THEN `generate` SHALL fail with a message naming both files", accepted by a Jest test.
  - → § "Requirement 5" AC 3
- **The per-group index change is a requirement, not only design detail.**
  - D2 compares the merged index with the emission. If the index stays per-token (`mergePackageComponentTokens`, `src/cli/shared/packageComponentTokens.ts` L71, `ownTokenNames`) while the emission goes per-group, D2 fails.
  - So D2 already forces the change. Say so in 5.2, so the design does not read it as optional.
  - → § "Requirement 5" AC 2; "Carried to design"
- **5.4 reports only at `sync`; the defect happens at `generate`.**
  - A consumer deletes a referenced primitive while editing their own tokens, then runs `generate`, not `sync`.
  - Under item (ii), that output then holds a reference to nothing: a compile error on native, a dangling `var()` on web.
  - Suggest: "`generate` SHALL report it; `sync` SHALL report a reference that an upgrade introduces."
  - It should be a **report, not a failure**. Making `generate` fail on web output it accepts today is a break for supported consumers (see 13.2).
  - The drift record (READ) also notes the name contract is web-only today. The AC should say it reads every platform's output, or name the platform it reads.
  - → § "Requirement 5" AC 4
- **5.6 misstates row 13's fix.**
  - The record's fix for a composite `ref` is "refuse a `ref` with no single name on the platform (in `validateProductTokens`)". It does not emit a reference. For the five WCAG-only colours, it is "branch on the `theme.` prefix" (`2026-10-26-token-index-platform-name-readers.md` item 3, READ).
  - Suggested AC: "a composite `ref` SHALL be refused by `validateProductTokens` with a message naming the token, accepted by a Jest test; a WCAG-only colour `ref` SHALL emit the theme path by its `theme.` prefix and compile, accepted by the token contexts with the fixture of Req 2.3."
  - → § "Requirement 5" AC 6
- **Gap: item (ii) on web.** Item (ii) also changes the consumer's `ComponentTokens.web.css`: it gains our groups.
  - MEASURED: our web component tokens are `var()` references (`--avatar-size-xs: var(--size-300)`), so the change should render the same. That is REASONING; I have not checked a page.
  - Add: "the D2 set equality SHALL also hold for the web output, under `Consumer Guard`". This is a new criterion, not a change to D2. Also name the change in Req 10.4's list.
  - → § "Requirement 5"; § "Requirement 10" AC 4

**Req 6, the native token files compile**
- **6.2 and 2.7 together cannot see row 9 regress.**
  - 2.7 generates the probe "from the emitted members, so that every `public` member is read". If a member is emitted without `public`, a probe built from the public members never reads it, and the defect passes.
  - The probe has to list its members from the token index (the names each platform should have; `token-index/*.yaml` carries per-platform names), not from the Swift file.
  - Suggest for 6.2: "every member of the generated token types SHALL be `public`; the probe SHALL read every member the token index names for that platform."
  - → § "Requirement 6" AC 2; § "Requirement 2" AC 7
- **Gap: nothing checks the colour values.** A compile passes on any number.
  - Whichever form the design picks (my lean: Display P3, plan-r2 WP1), add: "a Jest test SHALL assert that each emitted native colour converts back to its OKLCH source within a stated ΔE₀₀ tolerance, and that colours outside the target gamut are mapped by the stated rule".
  - The repo already has `deltaE00` and `clampToGamut` (`src/color/OklchConverter.ts`, READ).
  - MEASURED in the Q5 round: 14 of 50 OKLCH primitives are outside sRGB. By my own calculation, 13 of those fit inside P3, and `yellow300` does not.
  - → § "Requirement 6"
- **6.6 is an ordering rule, a "how".** Data R2 measured that K2 reports syntax and type errors in one pass, so the order no longer protects anything. Suggest moving it to the tasks round. → § "Requirement 6" AC 6

**Req 7, shadow colours**
- **Gap: row 11's migration has no criterion.**
  - The outline gives row 11 as "all; the root of row 10", but Req 7's three criteria can all be met without migrating.
  - The four shadow primitives are `rgba` (`src/tokens/ColorTokens.ts` L1835–, READ).
  - Native colour values are built from OKLCH, so an unmigrated family needs its own native path.
  - Suggest: "the shadow colour family SHALL be defined in OKLCH like the other colour families, with its tokens named at design for Peter's review (7.3); OR the design SHALL record why not, and how the native generator emits `rgba` primitives".
  - Either way, a Jest test asserts that no colour primitive a composite references goes unemitted on any platform.
  - → § "Requirement 7"
- **7.1 should name the web half's fix.** Today the web composite hard-codes `rgba(0,0,0,…)` (the record), so the three blue-tinted shadows render black. "Resolves" is true of a literal.
  - Suggest: "on web, each composite SHALL use its colour token, not a literal; a `Consumer Guard` assertion checks one blue-tinted composite."
  - → § "Requirement 7" AC 1

**Req 9, the consumer's own source**
- **9.2's override-map case depends on 9.1.** The six groups include "the dark and WCAG override maps", but Q3a may rule that the consumer's config `themes`, not their copied tier, is the source.
  - Suggest: "that group's case follows Q3a's ruling".
  - → § "Requirement 9" AC 1–2
- **Size flag: Req 9.2 is 129's largest generator change and is unsized.**
  - It moves `generateTokenFiles.ts` off the package's own token modules for six groups, the DTCG/Figma export included. Today it statically imports the package's `tokens/themes/*/SemanticOverrides` (charter item (vi), READ at L19–21).
  - It fits one tasks round as its own parent. It should not share a parent with item (i).
  - → § "Requirement 9"

**Req 10, item (iii)**
- **10.1**: add the two native `ComponentTokens` files (answer above).
- **10.4's list is short.** Besides item (iii), I-1 and I-2:
  - item (ii)'s web output change (additive, REASONING);
  - 13.2's new `generate` failure on web (a break, below).
  - Native changes before the support claim ship in minor releases if Peter picks plan decision 7 (a). That is his, at design, as the Open items say.
  - → § "Requirement 10" AC 1, 4

**Req 11, `init` runs `generate`**
- **Gap: when `generate` fails inside `init`.** Under 13.2 and 5.3b, `generate` can now fail.
  - Suggest: "IF `generate` fails inside `init` THEN `init` SHALL finish the birth (config, copied tier, agent layer), print `generate`'s message and the command to re-run, and exit non-zero", accepted by a `Consumer Guard` case. Otherwise a failed first render leaves a half-born repo.
  - → § "Requirement 11" AC 1

**Req 12, per-platform output paths**
- **Gap: the folder rules 132's manifest depends on.** Plan-r2 makes `generate` own our module's manifest, which lists folders, not files (Kenya R3).
  - Two constraints belong in 129, because they concern what `generate` writes:
    - (a) "WHEN `platforms:` names a folder THEN `generate` SHALL write only that platform's files there";
    - (b) "no generated native file SHALL share a file name with a packaged native source file".
  - Kenya measured (b): SwiftPM refuses a target with a file name used twice.
  - Both can be accepted by a Jest test plus a `pack-assert` name check.
  - → § "Requirement 12"
- **12.2**: say which wins when both `output` and `platforms:` are set. I read it as "`platforms:` for the platforms it names, `output` for the rest". → § "Requirement 12" AC 2

**Req 13, validators and config types**
- **13.1 can be met by turning the check off.**
  - Make it decidable both ways:
    - (a) the skipped `Consumer Guard` case `it.skip('validate passes'` (`tests/consumer-integration.test.ts` L354, READ) is re-enabled and passes;
    - (b) a Jest case with a token that breaks its declared relationship is reported.
  - → § "Requirement 13" AC 1
- **13.2 breaks supported web consumers as written.**
  - A web adopter's own component token with a non-conforming custom value generates today. After 129, `generate` would fail.
  - Lina's 2026-10-24 review in the record found that turning the check on fails two of ours as well (Badge-Label-Base, Button-VerticalList-Item).
  - Suggest:
    - for the consumer's tokens: "`generate` SHALL warn, naming the token; failing is held for a major, or goes to Peter under Q7";
    - for DesignerPunk's own tokens: fail in the repo's lane, and the ruling's PR disposes of the two.
  - → § "Requirement 13" AC 2; § "Requirement 10" AC 4
- **13.3**: the record's fix also exports `SemanticOverride` (`2026-10-03-semantic-override-map-type-not-exported.md` § "Fix shape", READ). Add it. → § "Requirement 13" AC 3

**Req 2, my driver** (2.1, 2.3): right as written. The "how" (a script under `scripts/` shared with `Consumer Guard`) is correctly left to tasks.

---

**2. Gaps and placement**

- **Deprecated-alias emission for native renames** is correctly not here: plan-r2 lands it before the support claim, in 132. 129 should not add it.
- **`Token-Governance.md` L249**, "the pipeline discovers and generates output for all registered themes", is false today (record #22's "Related surface", READ). Item (i) and (vi) decide whether it becomes true. Req 15 should name it as text that follows the instrument. It is a ballot edit, not a fix-PR edit. → § "Requirement 15"
- **Nothing here belongs to 132** that I can see, beyond what the file already moves there.

---

**3. My 13 records: the act I will make, as one record-only PR after the fold and before #658 merges** (not made yet)

**Re-rules to `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`.** Each re-rule carries a dated rule-9 reason line ("taken into 129's requirements as Req N; re-ruled to the claims pass per E2 until tasks.md numbers the carrying parent") and keeps its old Trigger inline as "(was: …)". Classes are unchanged.

| # | Record | Taken in as |
|---|---|---|
| 1 | spec-094 theme emission | Req 4 |
| 2 | font-family literals | Req 6.3 |
| 3 | Kotlin import block | Req 6.5 |
| 4 | Kotlin section comment | Req 6 |
| 5 | primitive value types | Req 6.4 |
| 6 | iOS `public` | Req 6.2 |
| 7 | shadow colours emitted on no platform | Req 7 |
| 8 | OKLCH shadow family | Req 7. Its Class (P3) may rise to P2 if Req 7 takes the migration as a criterion; I will set it after the fold |
| 9 | token-index platform-name readers | Req 5.6, **item 3 only**. The line says item 2 is Lina's and item 1 is done |
| 10 | component-token custom values | Req 13.2 |
| 11 | palette read from the package | Req 9.2 and 9.3 |
| 12 | in-repo generate output contaminates dist | Req 9.4, **row (g) only**. Row (h) stays under its own record |

**#13, the drift report**: re-ruled to the same path but **marked "not intake"**, as answered above.

**Also in that PR**: the charter's item (iii) edit (answer above). The charter's own Trigger is already the claims-pass path, so it needs no re-rule.

---

**4. Size**

- Req 9.2 (six groups moved to the consumer's source) and Req 6 (rows 4–9, the Kotlin type table and the colour form) are the two largest generator items. Each should be its own parent in the tasks round. Neither needs a split out of 129: both are chartered, and the principle is 129's.
- Req 13.1 (the mathematical-relationship parser, about 99 false failures per the `Consumer Guard` skip comment) is unsized. It should be sized at design, because its fix touches a validator every consumer runs.

#### [LINA R1]

I read `requirements.md` and `feedback/requirements.md` at `origin/task/129-requirements` `e5c358637`. My checks ran against `origin/main` `c22c17a78`. Labels: **VERIFIED** = I read or ran it today, at that commit or through the application MCP; **CARRIED** = another seat's measurement; **REASONING** = my inference. No repo edits.

**Plain language, for Peter's synthesis.** My requirements are mostly right. There are five problems:
- **Fixes that only a human device read can accept.** Req 8 lets six of row 14's behaviour items be "fixed in 129" and accepted by a seat's labelled reading. Under the rule this round agreed, an agent's device read is not evidence, and 129 runs no tests. I recommend all of them, and A3, move to 132.
- **A repair the comparator would punish.** Today the compiler hides a whole class of component errors behind a token-file defect (row 6). The PR that fixes row 6 will uncover them. Req 3.5, as written, turns that PR's harness red and makes it a finding on its author.
- **A false readiness claim stays served.** Two components are served today as "production-ready" on iOS and Android, but their source does not compile. Req 14's option (a) leaves that in place. I correct it myself with a small fix; it is not a fork.
- **Item (ii) needs three fixes**: the file count, the web scope, and one `sync` report.
- **Two component repairs have no home.** About 173 static colour reads, and 16 typography constants in Input-Text-Base, are carried by no requirement.

None of these needs Peter at this gate.

---

**Answers to my @ mentions** (from `[THURGOOD R1]`)

- **Req 14: does D7 settle where option (c) lives?** **Yes, I confirm the reading.** Plan-r2 § 1's D7 row ends "132 (129's Q10 (c))" (VERIFIED). Peter approved the plan as a whole, and he rules D4–D10 at 132's outline (`evidence/2026-11-05-native-plan/README.md` L27, VERIFIED). So (a) alone in 129 needs no ruling from him now, and the fork does not go to him in R2.
  - **One correction to the premise Req 14 and my record rest on: "understates, never overstates" is false for two components.**
  - `get_component_summary("Button-VerticalList-Item")` serves `ios` and `android` as `status: "production-ready"`, with `hasTests: true` (VERIFIED, application MCP). That is because `derivePlatformReadiness` gives `production-ready` whenever an implementation file and a `*Tests.swift` / `*Test.kt` file exist and the schema says `reviewed: true` (`ComponentIndexer.ts` L907–966, VERIFIED).
  - Neither component compiles today:
    - `VerticalListButtonItem.android.kt` has 34 errors and `ButtonVerticalListSet.android.kt` has 15 (CARRIED, Data's log);
    - the `VisualStateStyles.kt` comment that never closes probably empties both enums they use;
    - the iOS tier has about 200 errors in 32 files (CARRIED, Kenya).
  - **My fix**: set `readiness.ios.reviewed` and `readiness.android.reviewed` to `false` in the two schemas, with a reason, and regenerate `packageReadiness.generated.ts`. Their native status then reads `development` until 132's D7 derives it from checks. This is component content in my scope, needs no pattern change, and does not touch Req 14.1. It lands as its own small PR before my record-only close of disposition #16, so that close does not carry a false premise.
- **Req 8.4: fix I1–I3, A1, A2 and A4 in 129 with a labelled seat read, or move them to 132 now?** **Move all six to 132 now.** A3 goes too, and so do Input-Radio-Base's A6 parts that follow the A1, A3 and A4 patterns → requirements.md § "Requirement 8".
  - **Why**: a seat's simulator read is an agent vouching for its own fix. Stacy PLAN R1 gap 4 and Kenya PLAN R1 (D5: "A `device-read` entry must name a **human** reader") both say a device read must be a human's. A1, A2 and A4 are Compose semantics that 132's Robolectric tests can decide (Data PLAN R1). I1–I3 need XCUITest semantics plus a human VoiceOver read, which only 132 builds (Kenya PLAN R1). Fixing them in 129 would put code in with no instrument able to accept it.
  - **A3 belongs with them.** Its F-3 trigger is a change to the checkbox's rendering or contracts. 129 changes neither: its edits there are compile repairs and colour re-points. 132's per-platform contract validation ballot does change the checkbox's contracts, so F-3 fires in 132.
  - **What stays in 129 from row 14**: A5 and A7. A7's three `rememberRipple` call sites include Input-Radio-Base L424, which is A6's ripple part (VERIFIED in the record). All are accepted by `harness-android-components` under the Compose ≥ 1.7 pin.
  - **Suggested replacement for 8.3 and 8.4**: "Row 14's A3, I1–I3, A1, A2, A4 and A6's non-ripple parts are Spec 132's (D5, D6); Lina records the move in the record at 129's claims pass." 8.3's text guard is then not needed.
  - **The cost that survives**: the native behaviour items wait months for 132's contract tests. Nothing could accept them sooner.
- **Disposition #9, token-index item 2: does it land before this file merges?** **Yes, as its own PR, opened in my next session in my seat, before #658 merges and before my record-only re-rule PR.**
  - Scope: `application-mcp-server/src/indexer/TokenIndexer.ts` L30 types `platforms` as `{ web: string; ios: string; android: string }` (VERIFIED, unchanged at `c22c17a78`). It becomes the shape the index serves (lists, `null`, `platformNotes`), and `tool-boundary.contract.test.ts` is re-baselined on the added field. About half a session.
  - **The `search_tokens` match-signal rider does not ride with it.** The stale-version record it waited on is archived (VERIFIED), so the rider line's own text moves the signal to "a small PR of Lina's own". That record has its own Trigger and does not block #658.
  - The outline's line stays true if item 2 lands first, so the outline does not change.

---

**1. My domain's requirements**

- **requirements.md § "Requirement 3", AC 5 (Additions): add a third exception for masked errors.** Without it, the PR that fixes row 6 fails its own harness context.
  - **Evidence** (VERIFIED, Data's `run-android-combined-2.log`): 65 `Unresolved reference 'dp'` errors in `DesignTokens.android.kt`, and **no** error at any of row 12's 38 group B/C sites (for example `BadgeCountBase.android.kt` L153 and L158, `ChipBase.android.kt` L259 and L260).
  - REASONING: a `Dp` token whose type is already an error raises no second error where it is used.
  - So when row 6's import fix lands, the component contexts gain every masked error at once. Those are group B/C, any other wrong-unit `Dp` read (for example `NavTabBarBase.android.kt` L326's `Dp * Float`, which row 12's record names), and whatever iOS's 99 `Color.oklch` calls may hide (Kenya has not answered whether they mask).
  - The fix: "or the same diff removes entries from a token context's list; entries added to a component context under this exception SHALL be printed and tagged". The comparator can check that from the diff alone. Without it, 3.5's "a red harness context at a 129 merge is a finding on the author" makes a forced reveal a finding.
- **requirements.md § "Requirement 2", AC 14 (baseline): it cannot be met for row 12's groups B and C at the first run.** Masking leaves them zero entries.
  - Their first-run instrument is `AndroidDpTokenReads.test.ts`. It pins group B (12 lines in 5 files; VERIFIED, `PINNED_FONT_SIZE_UNIT_LINES`). Its header says it "cannot see group C".
  - So 2.14 should let a row name "first entries after row 6 lands" as its baseline. Otherwise group C has no named instrument at the baseline.
- **requirements.md § "Requirement 4", AC 4 (my guard): keep it, as a temporary check, with a retirement criterion.**
  - Why keep it: the harness contexts enter non-required (2.12). Until `harness-*-components` is promoted, a Jest guard in `lane-functional-root` is the only *required* check that the emitted theme and the component reads agree.
  - Add: "category temporary; retires when `harness-ios-components` and `harness-android-components` are both required." That is the pattern my two Android guards use (VERIFIED, `@retirementCriteria`).
  - Its known limits, stated so it is not read as covering more: it does not see row 16's prefixed reads, or Button-CTA's bare `colorActionPrimary` (no `theme.` in them). Only the harness accepts those.
- **requirements.md § "Requirement 4": no AC carries the static colour reads.** About 173 component reads reach static colours through `theme.` (81 iOS reads in 20 files, 92 Android reads in 17; my inbound § 3.3). Under Q13 (b) they are one large component PR; under (a) there is no component change.
  - Today no AC names them, and the list tag they get is undefined. If they are tagged to row 15 or row 2, 1.4 forces their fix inside 129, which is right, because D3 needs them.
  - Add: "Every component colour read SHALL resolve under the access form Q13 decides, accepted by the component contexts; entries before then are tagged to row 2's record."
- **requirements.md § "Requirement 4", AC 5 and § "Requirement 6", AC 8: item 3 is split, and only half is carried.** Row 12's record says the 34 bodyless constants in `InputTextBase.android.kt` are 8 theme-varying colours, 16 typography values whose source is `font_size_*`, and the rest (radius, motion and others), not tied to a generator change (VERIFIED, record § "Item 3").
  - 4.5 carries the colours with item (i). 6.8 carries only groups B and C with I-2.
  - Add item 3's typography constants to 6.8. The remaining constants can land under 8.5 at any time.
- **requirements.md § "Requirement 6", AC 8: "extend `AndroidDpTokenReads.test.ts` to cover `fontSize`" is stale.** Its rule 2 already covers `fontSize` for a `Dp` or `Float` emission and fails on "any other shape … until this guard is taught it" (VERIFIED, header). Suggest: "IF I-2 emits a shape the guard does not know (`TextUnit`) THEN the same PR teaches it that shape."
- **requirements.md § "Requirement 4", AC 7: the L816 fix has not landed yet.** `ContainerCardBase.ios.swift` still opens a `/**` at L816 that never closes (VERIFIED at `c22c17a78`). I land it as a one-line PR before the harness unit's first PR, as committed. Under the strict pin it could also be a tagged entry, so it does not hold the harness.
- **requirements.md § "Requirement 5", AC 1 and 5 (Requirement 1.5, mine): three corrections, from my PLAN R2.**
  1. **AC 1 is not scoped to a platform, so as written it covers web too.** Web already binds late through `@3fn/core/component-tokens.css` (`--avatar-size-xs: var(--size-300)`, VERIFIED in the main checkout's built `dist/ComponentTokens.web.css`, header "@3fn/core 16.0.0"; a local build, not a committed file), and the Integration Guide tells adopters to "keep importing it on every path" (L144). Emitting ours into the adopter's web output would define the same properties twice. Removing the import breaks supported web adopters, which is a 17.0.0 matter.
     - Suggest: "on iOS and Android"; web carried to design with Sparky. D2 (1.3) is already iOS and Android only.
  2. **"Definitions" means the 6 `defineComponentTokens` files, not 7.** `Badge-Count-Notification/tokens.ts` is a TypeScript constants object (`export const BadgeNotificationColorTokens`). Its header says `defineComponentTokens()` "only supports numeric values" (VERIFIED).
     - Add: "The harvest SHALL skip or report a file that registers no tokens; it SHALL NOT pass it silently."
  3. **AC 5 should name where the decision is recorded.** Suggest: in 129's `design.md`, signed by me, with a one-line dated pointer at Spec 123 Requirement 1.5. Spec 123 is closed, so its text is not rewritten.
- **requirements.md § "Requirement 5": add one `sync` case.** AC 3's per-group precedence means an adopter who copies one of our groups to change one value owns the whole group from then on. When our component later reads a key their copy lacks, the adopter meets a compile error unless `sync` reports it.
  - Add: "WHEN a consumer's group replaces ours AND a shipped component reads a key their group lacks THEN `sync` SHALL report the key and the component."
  - `Consumer Guard` accepts it with the same packed-install shape as 5.4.
- **requirements.md § "Requirement 5", AC 7 (row 18 R1): the grant.** R1 is a `src/cli/sync/**` change, inside Ada's standing scope. A tasks-row grant to me names Ada as consulted (design-outline.md § 4). Noted so the tasks round does not first meet it at execution.
- **requirements.md § "Requirement 8", AC 5: right.** It is my fold from the plan round.
- **requirements.md § "Requirement 14", AC 1: right.** Add one line under it: the served status for the two VerticalList components is corrected by their schemas' `reviewed` flags, outside the patterns (above).

---

**2. Gaps**

- **The A6 item is not dispositioned anywhere** → requirements.md § "Requirement 8". It is a composite: the A1, A3, A4 and A5 patterns on Input-Radio-Base (VERIFIED, record § A6). Its ripple part is in A7; the rest moves with my 8.4 answer.
- **The unmasking event belongs in the tasks round's order** → requirements.md § "Open items for design and tasks". The first harness run after rows 4 and 6 land is where the component repair is first measured honestly. My new component record's count is taken there, not at the first committed run (1.5). Suggest that tasks names that run as WP3's sizing event, as plan-r2's dependency chain implies.
- **Nothing here belongs to 132 that the file keeps in 129, except Req 8.3 and 8.4** (above).

---

**3. My records: the act I will make for each**

These all come in one record-only PR of mine, after the fold. It goes after the item-2 PR and the VerticalList readiness PR, and before #658 merges. The target for each re-rule is `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`, as E2 sets.

| # | Record | My act |
|---|---|---|
| 14 | `2026-10-24-android-component-unit-type-mismatches.md` | Re-rule the Trigger to `completion/claims-pass.md`. Reason: taken into Reqs 4.5, 6.7, 6.8 and 8.1 (and item 3's typography half into 6.8, if the fold takes my edit). Class unchanged |
| 15 | `2026-11-04-progress-bar-native-theme-reads-malformed.md` | Re-rule to `completion/claims-pass.md`. Reason: taken into Reqs 4.6 and 8.1 |
| 16 | `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` | **Close** under rule 5, with a dated outcome line naming Req 14 (option (a)) and D7 as (c)'s successor. The line also corrects the Class premise ("never overstates" was false for the two VerticalList components) and cites the readiness-flag PR that fixed them. That PR merges first |
| 17 | `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` | Re-rule to `completion/claims-pass.md`. Reason: R1 and R5 taken into Reqs 5.7 and 5.8. The record's own Trigger text ("R1 and R5 close here when that file lands with them as requirements") read requirements landing as closing; under E2 they close at the claims pass, when fixed |

**Not fired by this file, with the targets Thurgood flags**:
- **`2026-09-26-native-component-theme-hardcoding.md`** (Trigger `manual`): my planned re-rule was "to this spec's `requirements.md`". **It changes to `completion/claims-pass.md`**, made in the same record-only PR. Reason: taken into Reqs 4.7 and 8.
- **`2026-10-18-drawn-control-drift-ios-android-web.md`** (Trigger `release:16.3.0:phase-1`): the PR that closes the last web item re-rules the native half **to `completion/claims-pass.md`**, not `requirements.md`. If the fold takes my Req 8 answer, that line also records that A3, I1–I3, A1, A2, A4 and A6's non-ripple parts are Spec 132's. At 129's claims pass, A5 and A7 close and I re-rule the rest to 132's path once its directory exists.
- **New, owed at the harness's first committed run**: the component compile-error record (Req 1.5), plus my one-line L816 fix before that run.

---

**4. Size**

- **Req 4 is the heaviest component load in 129.** It holds item (i), Q12 and Q13, the re-pointing of about 173 reads, row 16, item 3's colours and Button-CTA, and Kenya's and Data's charter text. It is one coherent unit, but the tasks round should split it into at least two parents: the generator emission (Ada), then the component PR that follows the Q13 ruling (mine). That keeps any one diff reviewable.
- **Req 8 shrinks to A5 and A7** if my answer is taken, so it is small.
- **Everything else in my scope fits one tasks round.**

#### [KENYA R1]

Read at `origin/task/129-requirements` `e5c358637`: `requirements.md`, `feedback/requirements.md` and the facts file.

**Labels**: **VERIFIED** = I ran it today on this Mac; **UNVERIFIED** = reasoning or training data.

**Toolchain change since my Q5 entries.** This Mac now has **only Xcode 27.2 (27B52), Apple Swift 6.4.2, `iPhoneSimulator27.2.sdk`**. Xcode 26.0.1, which every earlier measurement of mine used, is gone.

**Inputs.** I reused the scratch consumer from the Q5 round (`@3fn/core@16.2.0`, `init --abbreviation pb`, `generate`). There were no downloads and no repo edits.

**One disclosure.** My first `xcrun simctl list runtimes` under the new Xcode printed "Install Started … Install Succeeded" and a CoreSimulator version-change line. I read this as Xcode's first-launch install of its bundled CoreSimulator framework (the framework folder's time changed to 23:54). I saw no sign of network use, but I did not intend it, and the brief says no installs. I ran no further `simctl` command.

---

**Plain language first**

- The iOS half of the harness requirements is close, but **four criteria would let a lane go green while proving less than it says**:
  1. **The probe misses row 9 by construction.** As written, Req 2.7 reads only the token members that are already `public`. Row 9 is the members that are *not* public.
  2. **The probe cannot run at the first committed run.** Swift will not build a module from a token file that still has errors (VERIFIED). So row 9 has no harness evidence at baseline, and Req 2.14 then fails.
  3. **Nothing makes the lane fail when the toolchain differs from the pin.** That matters. The same input gave **407 errors under Xcode 26.0.1 and 437 under Xcode 27.2**, and **125 list entries differ** (VERIFIED). An unenforced pin makes the list meaningless.
  4. **Nothing proves the lane really compiles rather than only type-checks.** A type-check passes code that a compile rejects (re-VERIFIED under Swift 6.4.2), so the requirement needs a known-bad case that only a compile catches.
- **Req 8.4 names me as the reader of VoiceOver items I1–I3. I cannot do that read.** No agent can hear VoiceOver, and as far as I know (UNVERIFIED) the simulator has no VoiceOver. These items belong in Spec 132, where the semantics tests and a human device read live.
- No requirement is too big on the iOS side. The largest iOS change is Q13's re-pointing of 81 static colour reads, which is the design round's call.

---

**Answer to [@KENYA] [@DATA] from [THURGOOD R1]**: are the iOS compile form, the probe, the pins and the list key (file + normalised diagnostic) each stated so they can be checked from the pin file and the list file, with no reading?

**Not yet, for any of the four.** Each needs one criterion added. These are corrections to what the requirements say; how each is built stays with design.

1. **Compile form** → requirements.md § "Requirement 2" AC 6.
   - Today, "a compile that emits object code" is prose. The flags live in a script, so checking them is a reading.
   - **Two fixes:**
     - The pin file carries the iOS compile flags: object emission, whole-module, library parsing, the deployment target, and the Swift language mode. Each context prints the exact invocation it ran.
     - Add to Req 3 AC 10 a falsification case that only a compile catches: a fixture with a missing return, which `-typecheck` passes and `-c -wmo` rejects.
   - **Evidence, VERIFIED under Swift 6.4.2:**
     - `-typecheck` exits 0 on the fixture. `-c -wmo` reports `missing return in global function` and `constant 'x' used before being initialized`.
     - On the real 16.2.0 consumer input (2 generated files plus 41 packaged files), `-c -wmo` and `-typecheck -wmo` report the **same 437 distinct diagnostics in 34 files** (7.1 s and 9.7 s). So compiling costs no measuring signal.
2. **The probe** → requirements.md § "Requirement 2" AC 7.
   - **Wording fix.** AC 7 says the probe reads "every `public` member". Row 9's defect is the members that are **not** `public` (105 at the record's count; 98 in my Q5 run). A probe built that way never reads them.
     - Corrected: "every member the generated token types declare, including members of nested types".
   - **A falsification case is also needed**, or a probe that reads nothing passes:
     - a planted `internal` member must produce an entry;
     - the probe must print the number of members it read against the number of members emitted, and fail if they differ.
3. **Pins** → requirements.md § "Requirement 2" AC 8 and § "Requirement 3".
   - Req 2.8 pins the toolchain, but no criterion fails a run whose toolchain is not the pinned one. Thurgood R3 had this as his fourth red reason ("toolchain missing"); it did not reach Req 3.
   - **Add**: the context reads the running Xcode, SDK and Swift versions (`xcodebuild -version`, `swiftc --version`) and fails if any differs from the pin file.
   - **Evidence (VERIFIED, identical input):**
     - Xcode 26.0.1 / Swift 6.2: 407 distinct diagnostics.
     - Xcode 27.2 / Swift 6.4.2: 437 distinct diagnostics.
     - 85 lines appear only under 26, 115 only under 27, and 125 keyed (file + message + count) entries differ.
     - Among the new ones is `failed to produce diagnostic for expression; please submit a bug report`, in at least three component files. That is a compiler-internal message that hides the real error.
   - **Add the deployment target to AC 8's list.**
     - `-target arm64-apple-ios17.0-simulator` is what turns the iOS 17 floor into compile evidence. VERIFIED under 27.2: `MeshGradient` is rejected as "only available in iOS 18.0 or newer".
     - It is **not** a harness pin in AC 9's sense. It should equal Core Goals' iOS minimum, which is Peter's decision 4 at design. So AC 9 should except it: "the deployment target is the platform minimum, read from Core Goals; every other pin is a harness pin".
4. **The key** → requirements.md § "Requirement 3" AC 2.
   - The criterion is checkable once the normalisation rule is written as code with its own falsification cases in AC 10. Today AC 10 covers the comparator's failures but not normalisation.
   - Two Swift-specific points the rule must fix:
     - Swift prints every diagnostic twice, once at the location and once on the caret line. A naive count doubles.
     - The message text is the key, quoted identifiers included. Those identifiers are what tell `cannot find 'theme'` from `cannot find 'Typography'`.
   - With those two fixed, "file + normalised message + count" is deterministic. VERIFIED: three runs, including one with the file order reversed, gave identical diagnostics (Q5 round).

---

**1. My domain's requirements**

**Requirement 2 (iOS)**

- **AC 4: name the whole file set and give it a floor** → requirements.md § "Requirement 2" AC 4; § "Requirement 3" AC 4.
  - "DesignerPunk's native component source as shipped" should say: **every non-test `.swift` file in the packed tarball**, plus the generated output.
  - That set includes the two hand-written closure files, `src/tokens/platforms/ios/MotionTokens.swift` and `src/blend/ThemeAwareBlendUtilities.ios.swift`. Components call them.
  - The floor (Req 3.4) should be **that count, read from the tarball at run time**: 41 packaged files plus 2 generated at 16.2.0 (VERIFIED, `find` over the installed package). It should not be a fixed number.
  - The package's own `dist/ComponentTokens.ios.swift` must stay out of the set.
    - Swift refuses two files with the same name in one module (`filename "ComponentTokens.ios.swift" used twice`; Q5 round, VERIFIED).
    - AC 4's "against the consumer's generated `ComponentTokens`" implies this exclusion; say it.
- **AC 6: split the diagnostics between the two contexts** → requirements.md § "Requirement 2" AC 6; § "Requirement 3" AC 1.
  - The component verdict compiles the tokens and the components as one module, so its run also reports every token-file error.
  - Unless the component context counts **only diagnostics located in component files**, every token fix must edit two lists, and the two contexts double-count.
  - Add: "a context's list holds only diagnostics in its own files".
  - The coupling that remains is real, and worth stating as a limit: a token fix can change the counts in component files (missing names cascade), so a token PR may still edit the component list.
- **AC 6/7: the probe cannot run before the token tier compiles** → requirements.md § "Requirement 2" AC 14; § "Requirement 6" AC 2.
  - VERIFIED: `swiftc -emit-module` on the unfixed generated `DesignTokens.ios.swift` exits 1 and writes no module, so the probe's `import` has nothing to read.
  - So at the baseline run, row 9 has no entry in any harness context, and Req 2.14's first clause fails for it. Row 2's probe half has the same problem; its component-file half is fine.
  - **Fix, using 2.14's own "OR"**: Req 6.2 names a **text guard** as row 9's instrument until the token module builds. This is the record's own fix plan, item 2: tighten `src/generators/__tests__/tokenIndexPlatformNames.test.ts` to require `public` members, in `lane-functional-root`.
  - The probe takes over when `harness-ios-tokens` first compiles a module, and the guard retires then.
- **AC 8: the iOS pin depends on a runner image I can no longer match locally.** No criterion assumes a specific `macos-26` detail, which is right. But here is what I measured, and the tasks round must not assume otherwise:
  - The `macos-26` arm64 image readme I read on 2026-11-04 (image 20261026) carried **Xcode 26.0.1 to 26.6, default 26.6**. It announced Xcode 27 as a public preview. It states that only one major Xcode version is supported per macOS image, and that a replaced patch version is removed.
  - **This Mac now has only Xcode 27.2.**
  - Whether 27.2 is on any standard runner label is UNVERIFIED. I fetched nothing new, as instructed.
  - So the pin is a tasks-round fork:
    - **Xcode 26.x on `macos-26`**: matches the image; no seat can reproduce it locally now.
    - **Xcode 27.x**: matches this Mac; its runner label and image are unverified.
  - The requirement is right to leave that open. The CI run is the record either way (AC 13), so local reproduction is a convenience, not evidence. It also means **my local diagnostic counts are no longer the CI list's counts**, and I will not present them as such.
- **AC 2: right.** My scratch consumer already uses `pb`. Row 15's `dpTheme` reads fail under it, as intended.

**Requirement 4 (iOS)**

- **AC 1: right in kind.** Say "the theme protocol, its `EnvironmentKey` **and the `EnvironmentValues` property** the components read". Today's components read a key path (`@Environment(\.dpTheme)`), and that resolves only through the `EnvironmentValues` extension, not through the key type. Q12 decides the name.
- **AC 2's probe half** is blocked until the token module builds, as above. Before then, AC 6's component contexts carry row 2's evidence (`cannot find 'theme'` and the key-path errors).
- **AC 9: agreed.** My charter's § "iOS Theming (Spec 094)" today says `generate` writes no theme surface. When item (i) ships, I re-confirm it and Peter merges it.

**Requirement 6 (iOS)**

- **AC 2**: add the interim text guard above.
- **AC 4**: the Jest-assertion reasoning ("a wrong percent radius compiles") is Android's. On iOS, row 8's `radiusHalf: CGFloat = "Circle"` and the nine `fontWeight…: UIFont.Weight = 100…900` lines **fail the compile** (Q5 evaluation entry, VERIFIED then). So the token context accepts them directly. Say "on Android" in AC 4, so the iOS half is not read as reading-only.

**Requirement 8 (iOS)**

- **AC 4: I cannot be the named reader for I1–I3** → requirements.md § "Requirement 8" AC 4.
  - A labelled reading "naming the seat" would be my inspection of code, recorded as if it were a device read. No agent can hear VoiceOver, and as far as I know (UNVERIFIED) the simulator has no VoiceOver. That is a model attestation, which Peter's aim rules out as evidence.
  - **My answer to Thurgood's question to Lina, iOS half**:
    - 129 **may land** the I1–I3 code changes in the owning component PRs, where the compile accepts that they build.
    - **Acceptance moves to Spec 132**: semantics tests in its fixture app (D5), and speech as a labelled human device read (D6).
    - Lina's re-rule of that half, as the requirement already allows for unfixed items, then applies to all three.

---

**2. Gaps**

- **Req 3 has no "toolchain differs from pin" failure.** Pin 1 above. That makes it the fifth red reason, after Thurgood R3's four.
- **Req 3 AC 10 needs three more falsification cases**: compile versus typecheck; probe completeness (a planted internal member, and a member-count floor); normalisation (the doubled Swift diagnostic).
- **One harness scope question**, a "what", not a "how": whether the iOS component context also compiles `#Preview` / `PreviewProvider` blocks.
  - They are in the shipped source, so the compile includes them as it should.
  - Preview code calls the components with arguments, so a preview can fail where the component itself is fine. The pins tell them apart only by tag.
  - No change to the requirements is needed; it is a note for the list's tagging.
- **Belongs elsewhere**: Req 8.4's iOS items belong in 132, as above.
- **Records (iOS seat).** I own none of the 17 this merge fires.
  - For the harness record (`2026-09-17-platform-build-verification-harness-candidate.md`, Kenya and Data, Trigger at `tasks.md`): at the commit that first adds `tasks.md`, Data and I will re-rule it to `completion/claims-pass.md`, per E2, so that a later `tasks.md` amendment cannot fire it again.
  - We will not make that re-rule now.

**3. Size.** Reqs 2 and 3 fit one harness unit (about one session for iOS, as sized in Q5). Nothing on the iOS side needs a split.

#### [DATA R1]

Read `origin/task/129-requirements` at `e5c358637`: `requirements.md`, `feedback/requirements.md`, and plan-r2's D rows. Labels: **VERIFIED** = I ran or read it myself; **REASONING** = inference or training data; **UNVERIFIED** = not checked. There are no new runs this round. My downloaded tools and Gradle cache were deleted at Peter's yes (2026-11-05). The measured numbers below are re-read from my Q5-round logs, which remain in `q5-round/data-work/` (`run-android-combined-2.log`, `all2.txt`, `det-*.sorted`, `run-adopter.log`, `layout-*.log`). Their inputs were the 15.1.0 consumer fixture tokens and main's component source, under my probe pins (Kotlin 2.4.21, AGP 9.5.0, BOM 2026.09.00).

**Plain language first.** The Android parts are mostly right. Five things need fixing before design:
1. **The list's "no additions" rule will turn the first real generator fix red.** Fixing Kotlin's missing imports (row 6) lets the compiler see errors it could not see before. That adds list entries in a PR that only fixed things. Req 3.5 needs a narrow, mechanical exception for this.
2. **Kotlin error messages can run over several lines.** The list key has to keep those lines, or distinct errors collapse into one key.
3. **One hand-written Android file the package ships fails on functions nothing defines** (`ThemeAwareBlendUtilities.android.kt`). No 129 row carries it, and D1 cannot reach zero while it counts as a token file. It belongs to the component tier.
4. **Req 8 leaves out item A6** (the radio button), and asks me for a device reading I cannot make: no seat has an Android emulator. That part should move to Spec 132, where semantics tests exist.
5. **The Android module shape that Req 2.6 states for iOS is missing for Android.** Without it, the component check reports nothing while the token check fails.

---

**Answer to my @ mention.** [@KENYA] [@DATA] from [THURGOOD R1]: "Req 2.6–2.8 and 3.2: are the iOS compile form, the probe, the pins and the 'file + normalised diagnostic' key stated so that each is checkable from the pin file and the list file, with no reading?"

- **2.6: on Android, it is not stated at all. Add the Android criterion below.** Once added, it can be checked without a reading through the floor (3.4). If the component context reports its compiled-file count at or above its floor while the token list still holds entries, the two tiers were compiled together. A two-module build cannot produce that result: a component module that depends on a failing token module gave 0 diagnostics (VERIFIED, `run-components.log`). → requirements.md § "Requirement 2 / AC 6"
- **2.7: checkable only if the harness prints two numbers.** "Generated from the emitted members" is a claim about how the probe is made. To check it mechanically, the run's summary should print the probe's read count beside the emitted member count, and fail when they differ.
  - Android has a second condition. A `CompositionLocal` and the product-token getters (`@Composable @ReadOnlyComposable`) can only be read inside a `@Composable` function. A probe that reads them from a plain function is itself a compile error (VERIFIED, `jvmprobe.log`: "@Composable invocations can only happen from the context of a @Composable function").
  - Kotlin has no twin of iOS's row 9: the generated Kotlin declares no `internal` member (VERIFIED, grep, 0). So on Android the probe exists for the theme and the product tokens, not for visibility. → § "Requirement 2 / AC 7"
- **2.8: checkable for the Compose floor through 2.14, not through the pin file.**
  - "Compose at 1.7 or later" cannot be read off a BOM number without the BOM's own pom.
  - But a pin below 1.7 would make `rememberRipple` compile, so the baseline list would hold no entry tagged to row 14's A5 or A7, and 2.14 would fail. Under the 1.12.1 pin, the baseline holds exactly 3 such entries: Button-Icon L245, Input-Checkbox-Base L471, Input-Radio-Base L424 (VERIFIED). The deprecation level is ERROR in `material-ripple` 1.7.0 through 1.12.1 (VERIFIED, Q5 round).
  - Say so in 2.8, so the pin file is not the only check. The pins list is also incomplete on Android (Gaps 2 and 3). → § "Requirement 2 / AC 8", "AC 14"
- **3.2: not yet. Kotlin needs three additions to "file + normalised diagnostic"** (all VERIFIED from `run-android-combined-2.log`):
  - **(a) Multi-line diagnostics.** 21 of 723 diagnostics run over several lines. "None of the following candidates is applicable:" names the symbol only on its continuation lines. Keying by the first line gives **220** keys; keeping the continuation lines gives **234**. So normalisation must keep continuation lines, or 14 distinct failures share a key.
  - **(b) Path form.** "File" must be the path relative to the package root or the consumer root, never an absolute path, which embeds the scratch directory.
  - **(c) One key, more than one tag.** One key can hold occurrences that belong to different rows, especially follow-on messages such as "Cannot infer type for type parameter 'K'" (30 of them in the component tier). 3.2 allows one tag per entry. It should allow a key to be split across tags, with a count for each, and the comparator summing per key.
  - Stability is fine: three runs gave identical diagnostic lists (VERIFIED, `det-1/2/3.sorted`, 1,025 lines each).
  - Size, for the tasks round: the Android baseline at that input is **234 entries: 28 token-tier, 206 component-tier**. 73 entries have a count above 1, and the largest is `Unresolved reference 'Oklch'`, ×99 in `DesignTokens.android.kt`. → § "Requirement 3 / AC 2"

---

**1. Android requirements**

**Requirement 2**
- **AC 4, the input includes the package's resources.** `IconBase.android.kt` reads `R.drawable.*`, so the Android compile needs the package's `Icon-Base/platforms/android/res`. Without it there are 17 `R` errors (VERIFIED, `run-android-combined-cold.log`).
  - With it, the packaged `res/drawable/README.md` makes Android's resource merge fail before any Kotlin compiles (VERIFIED, `run-adopter.log`: "The file name must end with .xml or .png").
  - So **Req 10.3's fix must land no later than the harness's first Android run.** That ordering is not stated anywhere. → § "Requirement 2 / AC 4", § "Requirement 10 / AC 3"
- **AC 6 is iOS-only. Proposed Android twin:**

  > "On Android, the token verdict and the component verdict SHALL come from one compile in which the packaged component sources and the generated token files are one module, with the Compose compiler plugin applied; a second module SHALL read the emitted theme and product tokens from inside `@Composable` functions."

  Reasons:
  - **One module**: in two modules, a failing token module hides the component tier (above).
  - **The plugin**: only with the Compose compiler plugin does the `@Composable`-context error class appear, for example `IconBase.android.kt` L177 (VERIFIED, Q5 round).

  This is the settled Q5 answer, stated as a requirement and not as a "how". → § "Requirement 2 / AC 6"
- **AC 8, runner pin.** It matches the required gate's move to `ubuntu-24.04` (#657). No change.
- **AC 9.** Right. One Android note: `minSdk` does not change any 129 verdict. A Kotlin compile does not check API levels; Android's lint does.
  - Example: `InputCheckboxLegal.android.kt` L242 calls `java.time` with no version guard (VERIFIED). It compiles under any `minSdk` and needs API 26 at run time (REASONING).
  - So no 129 green should be read as "runs on the minimum". The API-level check belongs to Spec 132's app build. → § "Requirement 2 / AC 9"
- **AC 11 and AC 12.** Right as written.

**Requirement 3**
- **AC 5: an unmasking exception is missing, and the Android first runs need it.**
  - The baseline carries follow-on errors that sit behind unresolved names. Examples in `DesignTokens.android.kt`: "Cannot extend an object" (L588), "'transform' overrides nothing" (L589), and an opt-in plus two "Cannot infer type" errors on `.copy(alpha = …)` (L455). These come from the missing imports and the unresolved `Oklch` (VERIFIED, `all2.txt`).
  - The component tier has 30 "Cannot infer type" errors of the same kind.
  - An unclosed comment hides the rest of its own file: `VisualStateStyles.kt` L586 (VERIFIED, Q5 round).
  - When row 6 adds the imports, or row 4 settles colour construction, the follow-on keys go and the real type errors appear as **new** keys. Lina's I-1 and I-2 mismatches are examples of errors an import-less file cannot show. That is REASONING on which keys appear, VERIFIED that the follow-on keys exist.
  - Under 3.5, that PR fails, because it adds entries without a pin change.
  - Proposed exception, mechanical from the diff and not a reading:

    > "additions are also allowed (c) in a diff that changes generator source (`src/providers/**`, `src/generators/**`, `src/build/**`), or (d) in a file the diff itself edits; each such entry is printed as `unmasked:` and tagged."

  - Lina's R2 "allow the list to grow once, stated" was the same need. It is not carried now. → § "Requirement 3 / AC 5"
- **AC 4, floor.** On Android, the floor needs the harness to print the `.kt` count it gave the compiler, per tier. An Android source directory that does not exist is skipped silently (REASONING), so a moved package path would compile zero files. That is the case the floor exists for. → § "Requirement 3 / AC 4"

**Requirement 6**
- **AC 5, row 6.** It should name both generated Kotlin files. `ComponentTokens.android.kt` has the same missing import block: 0 imports and 4 `.dp` (my outline R1, item 11). → § "Requirement 6 / AC 5"
- **AC 6's reason is out of date, and its list of rows is incomplete.**
  - K2 reports syntax errors and type errors in one pass. 29 syntax errors and about 270 others came in the same run (VERIFIED, Q5 round), so "parses before its type errors are counted" no longer holds. My R1 item 5 was a guess, and the Q5-round measurement replaced it.
  - The parse layer is **rows 4 (item 2), 5 and 7**, not only 5 and 7. Row 4 item 2 is the WCAG `oklch(…)` lines: 18 "Expecting ','" errors, the largest syntax group (VERIFIED).
  - The ordering is a tasks matter. I suggest dropping AC 6, or keeping it as "rows 4 (item 2), 5 and 7 are small first fixes", with no counting claim. → § "Requirement 6 / AC 6"
- **AC 7 to AC 9.** Right. The badge `minWidth` sites under I-2 are carried to design, which is correct.

**Requirement 8**
- **A6 is missing.** Row 14's A6 is Input-Radio-Base with the same patterns as the checkbox, minus the hint. It has the A1, A3, A4 and A5 patterns (the drawn-control record, L70–L78, VERIFIED).
  - AC 2 covers its ripple call site (L424) without naming it.
  - AC 3 and AC 4 do not mention it.
  - Name A6 in AC 2 to AC 4, split by pattern, so that 1.4's "no entry tagged to … A5 or A7" and the record's item list match. → § "Requirement 8 / AC 2–4"
- **AC 2.** Right (VERIFIED above). One addition: the dead import in `VerticalListButtonItem.android.kt` L38 gives **no** diagnostic (VERIFIED). The harness cannot accept its removal, so the item needs a text check, or the record should say the import is harmless. REASONING: the import becomes an error only if a later Compose removes `rememberRipple` outright. → § "Requirement 8 / AC 2"
- **AC 4: I cannot make the device reading it asks of me for A1, A2 and A4.**
  - No seat has an Android emulator. Mine would need downloads, an install and the Android SDK licence, which is Peter's go.
  - A reading made by an agent is not a check that stands without a model.
  - **Proposal**: A1, A2, A4, and A6's A1/A4 parts move to Spec 132's D6 now. 132's Compose semantics tests can decide the parts that are `stateDescription`, `contentDescription`, role and key handling.
  - If the fixes land in 129 anyway, their 129 acceptance is "compiles" plus a labelled code reading, never "verified".
  - This bears on Thurgood's question to Lina. My reading is that her answer should be "move". → § "Requirement 8 / AC 4"

---

**2. Gaps**

1. **Which tier the hand-written shipped native files belong to.** `ThemeAwareBlendUtilities.android.kt` has **10 errors**: `darkerBlend`, `lighterBlend`, `saturate` and `desaturate` are called on `Color`, and no packed Kotlin file defines them (VERIFIED, `all2.txt`). The generator that would have produced them was never wired; this is the blend record, the colour track's. `ButtonCTA.android.kt` uses them too.
   - If this file is in the token tier, D1 cannot reach zero, and no 129 requirement carries it.
   - Req 2.4 should say that **the generated files are the token tier, and the hand-written shipped native files** (`ThemeAwareBlendUtilities.*`, `MotionTokens.*`) **are compiled in the component tier.** Their entries are tagged to `2026-06-24-blend-system-architecture-and-oklch-alignment.md` or to Lina's new record. Kenya should say whether the iOS twin fails the same way. → § "Requirement 2 / AC 4", § "Requirement 1 / AC 2"
2. **The components' third-party Android dependencies are pinned nowhere.**
   - The component source imports `coil.compose`: 4 imports, which is Coil 2's package (Coil 3 uses `coil3`, REASONING). It imports `androidx.compose.material.icons.filled`: 2 imports. Both VERIFIED, Q5 round.
   - `material-icons-extended` needed its own version: I used 1.7.8 beside BOM 2026.09.00. REASONING: it is no longer in the BOM.
   - The colour library joins the list if Ada keeps the dependency.
   - **Proposal**: AC 8's pin file names each library the component source imports, with its version. That list becomes the de facto dependency set Spec 132's shipped module declares, so recording it now saves 132 from re-deriving it. → § "Requirement 2 / AC 8"
3. **Toolchain pins that are missing.** The JDK version (the image default is 17, VERIFIED from its readme in the Q5 round) and the Gradle version are not in AC 8's list. Both change the verdict, so add them. → § "Requirement 2 / AC 8"
4. **Nothing here belongs to 132, or to design or tasks, beyond** Req 8.4's move above and Req 6.6's ordering.

---

**3. Records.** I own none of the 17. No act from me.

---

**4. Size.**
- Nothing on the Android side is too big for one tasks round.
- Reqs 2 and 3 together are the harness unit. The unmasking exception and the multi-line key make the comparator a little larger. They are the parts the first Android run needs most.
- Moving Req 8.4's Android items to 132 makes 129 smaller.

#### [LEONARDO R1]

**Read at**: `origin/task/129-requirements` `e5c358637` (git, not a worktree), with `origin/main` `c22c17a78` for the shipped surfaces.

**Labels**: **VERIFIED** = read in git today; **CARRIED** = a named seat's measurement; **REASONING** = my inference.

**Plain language first.** The adopter-facing requirements are mostly right. Three things are missing for an adopter:
- **Req 9 never tests its "upgrade does not change it silently" promise.**
- **Req 11 does not say what happens when `generate` fails inside `init`.**
- **Two shipped texts are left out.** The adopter's Kenya and Data agents say "no theme surface today", which item (i) makes false. The guide's "Native status" note overstates what 129 delivers for components.

Req 12 needs one guard so that 132's package shape stays possible. No requirement is too big.

**@ mentions**: there are none addressed to me in `feedback/requirements.md`.

**My domain's requirements**

1. **Req 9 AC 2 tests only half its user story.**
   - The story promises "a package upgrade does not change it silently". AC 2 proves that editing the copy changes the output. It does not prove that the package's copy is no longer read.
   - Suggested acceptance: a `Consumer Guard` case that removes the package's own copies of the six groups from the installed `node_modules`, then runs `generate`. It must still succeed, with identical output. The oracle is file absence, not a reading.

   → requirements.md § "Requirement 9" AC 2

2. **Req 9 AC 2 and AC 1 overlap.**
   - Group 2 of the six ("the dark and WCAG override maps", guide § 4, VERIFIED) is item (vi)'s source question, Q3a.
   - Its `Consumer Guard` case cannot be written until Q3a is ruled.
   - Suggested wording: "the override-map case follows the Q3a decision", so that the two do not rule the same group twice.

   → requirements.md § "Requirement 9" AC 1, AC 2

3. **Req 11 AC 1 does not say what a failed `generate` does to birth.** `generate` can stop before writing anything (16.2.0, a semantic reference to an unemitted primitive; CHANGELOG "Known limitations", VERIFIED). Suggested acceptance:
   - IF `generate` fails inside `init`, THEN birth still completes (config, token copy, agent layer);
   - `init` exits non-zero;
   - `init` prints the `generate` error and the command to re-run.

   A founder must not lose their birth to a token error.

   → requirements.md § "Requirement 11" AC 1

4. **Req 11, two small founder-journey checks.**
   - Running `generate` straight after `init` yields byte-identical output, so the old documented habit does no harm.
   - After `init` alone, `token-index/` exists, so the Application MCP is not degraded on day one.

   Both can be `Consumer Guard` cases.

   → requirements.md § "Requirement 11" AC 1

5. **Req 11, my consult read on the founder count, for design.**
   - Remove `generate` from the birth path. Keep it as the first step of the edit loop (guide § 4: "`generate` is the pipeline — run on every token change").
   - The count drops by one, and AC 3's same-PR rule covers the change.
   - The pick is Ada's to make, with me consulted.

   → requirements.md § "Requirement 11" "Carried to design"

6. **Req 15 AC 1 leaves out two kinds of shipped text.** Its list is CHANGELOG, INSTALL, the guide and a README. Adopters also receive:
   - **the consumer agent prompts**, which ship as generated agents;
   - **served component docs.**

   Suggested wording: add "the consumer agent overlays and the served corpus".

   → requirements.md § "Requirement 15" AC 1

7. **Req 4 AC 9 names Kenya's and Data's charter theming sections. It should also name their consumer overlays, which are what adopters' agents read.**
   - VERIFIED on `origin/main`:
     - `canonical/profiles/consumer/kenya.overlay.md` L40: "writes no theme surface today: no theme protocol, no per-theme structs and no environment key";
     - `canonical/profiles/consumer/data.overlay.md` L40: "produces no theme types for Android today".
   - Both go false in the PR where item (i) ships. That is charter text: Peter merges it, and the consumer-profile signatures are redone.

   → requirements.md § "Requirement 4" AC 9

8. **The guide's "Native status" note overstates 129 against Req 1 AC 4.**
   - VERIFIED, `governance/DesignerPunk-Integration-Guide.md` L195 on `origin/main`: "Spec 129 … makes the token files `generate` writes, and DesignerPunk's component source built against them, compile on iOS and Android".
   - Req 1 AC 4 lets 129 close with component entries still pinned. So the sentence should read "compile, except pinned errors each tagged to an open record".
   - Suggest Req 15 names the Native status passage as text that follows Req 1's acceptance. Its owners are Kenya and Data.
   - Minor: the passage names "Spec 132", which has no directory yet. The goal record's public URL would survive a renumbering better.

   → requirements.md § "Requirement 15"; § "Requirement 1" AC 4

**The handoff to 132**

9. **Req 12 needs a guard so that 132's D4 layout is reachable.**
   - D4's adopter layout puts our generated `Package.swift` at the root, and SwiftPM refuses target sources outside the package root (CARRIED, Kenya R3: "target … is outside the package root").
   - So a `platforms.ios` path that resolves outside the project root would make D4 impossible. Fixing that in 132 would break adopters who had used it.
   - Suggested acceptance: IF a `platforms:` path resolves outside the project root, THEN `generate` fails and names the path.
   - It is cheap now and breaking later.

   → requirements.md § "Requirement 12" AC 3

10. **One fixture, not two (suggestion; tasks may judge it a "how").**
    - If the harness consumer (Req 2 AC 1–2) sets `platforms:` to D4's layout (`ios/` and `android/` beside a root `package.json`), then Req 12 is accepted by the harness's own input, and 132 inherits the layout without rebuilding it.

    → requirements.md § "Requirement 2" AC 1; § "Requirement 12"

**Q3b** (I co-own the intent). Carried correctly, as a fork for Peter after Sparky's browser check.
- My design read is unchanged (outline R1): it leans toward themes that can apply to part of a page.
- One addition: 128's React Native theme context would also apply to part of a tree by construction (REASONING). Root-only web would then be the only platform without that.
- The surviving counter-argument stands: root-only is simpler.

→ requirements.md § "Requirement 9" "Carried to design"

**Size**: none of Reqs 1, 9, 11, 12 or 15 is too big for one tasks round. Req 9's six cases are each small.

**Records**: I own none of the 17.

#### [SPARKY R1]

Scope: web only (Req 1.6, 7.1, Req 9 / Q3b, and anything that changes a web adopter's `generate` output or install steps). Read at `e5c358637`. No `[@SPARKY]` question is in the feedback file.

**Verdict: the web requirements are right in intent but Req 1.6 is hollow as written. Fix 1.6 and 7.1's instrument; the rest is small.**

1. **Req 1.6 "web compiles = `Consumer Guard` success" accepts almost nothing about web.** Web CSS does not compile. The only web assertion in `tests/consumer-integration.test.ts` (`generate produces output files`, line ~301) is that `dist/tokens/DesignTokens.web.css` exists and its size is above zero. A green `Consumer Guard` would pass if every `var(--x)` in that file pointed at nothing. The charter said "web compiles means the existing Consumer Guard"; Peter approved that sentence, so I do not reopen it. But the requirement can still say what the guard must hold for the sentence to mean something. Proposed AC (a "what", not a "how"): *`Consumer Guard` SHALL assert, on a packed install's generated web CSS, that every custom property referenced by `var()` is defined in the generated web CSS files.* This is node-only: no browser, no new lane, no download. It also closes the web gap that 7.1 depends on (item 3). It is the class-level fix: it catches the shadow defect and any future one of the same kind. Cost: a `var()` extractor over the files, plus a short allowlist for runtime-defined properties (component-set ones like `--_internal`), which would need a pinned list. Residual counter-argument: this is a name check, not a render check; it will not catch a value that parses wrong. That is Spec 132 or later (a real browser lane is not in the plan, and I am not asking for one).

2. **Req 1.6 and the web component tier.** Req 5 / D2 / D3 are iOS and Android only, so on web "the component tier included" in the acceptance sentence has no check. Web component CSS uses the same `--space-*` and component tokens, so the item-1 check above is the only thing standing behind it. Say so in 1.6, or the sentence reads as more than it proves. Req 15.1's "no shipped text says tier compiles" rule should cover web wording too (INSTALL's web claims), not only native lists.

3. **Req 7.1 (web half of shadow colours).** Right, and real: row 10 says the four shadow primitives (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`, `src/validators/ColorReferenceEmissionValidator.ts:32`) are emitted on no platform, web included. On web the visible effect is worse than "a missing colour": an unresolved `var()` inside a `box-shadow` makes the whole declaration invalid at computed-value time, so the shadow disappears silently, with no console error. The named instrument for the web half is the validator Jest test plus "`generate`'s output names no unemitted shadow colour", which is a string/name check on the generator side. The `var()` assertion in item 1 is the check that sees what a browser sees. Request: name it as the web instrument for 7.1 in place of, or beside, the name-based assertion. 7.2 (remove the warning and the set) is right; add that the validator test is the one that fails until the set is emptied (it already says so in its header comment, line 30).

4. **Req 9 / Q3b browser check: what I will run, and what it needs.** The facts, from the generator: one theme block is emitted, `:root[data-theme="wcag"]` (`src/generators/TokenFileGenerator.ts:989`). `:root` matches only `<html>`, so the theme is page-wide, and `data-theme` on any other element matches nothing. Q3b asks whether to scope it. The browser check I can do with no install: a static HTML page, two cards, one with `data-theme="wcag"` on `<html>` and one on a child, loaded via `npm run serve` from a local build, inspecting computed values in a real browser. I expect: the child attribute does nothing under the current selector, and a scoped selector (`[data-theme="wcag"]`) would work through Shadow DOM, since custom properties inherit across the shadow boundary. Two web facts the fork needs, so Peter has them: (a) a scoped theme and `light-dark()` / `color-scheme` on `:root` interact, because `color-scheme` set on the scoped element changes which `light-dark()` branch applies inside; (b) a change from `:root[data-theme=...]` to an unscoped attribute selector is not backward compatible for any consumer who today sets the attribute on a non-root element, but that does nothing today, so I expect no consumer relies on it (unverified for consumers outside this repo). I will write the check when design starts; Req 9 says "Sparky runs the browser check" and that is accurate. Suggest the requirement also say the check's output is a committed finding with the browser and version named, so the fork Peter sees is reproducible. Not a criterion; a design-round deliverable.

5. **Q3a / item (vi) and web output (Req 9.1).** 9.1 already says the decision states its effect on "a custom theme does not emit on web". Good. From the web side, the one thing it must also state: today `generate` prints "registered, not applied yet" for a theme registered in config (`src/cli/shared/errorCatalog.ts:557`), and a custom `data-theme="{name}"` matches nothing. If Q3a ships a custom-theme override on web, the web agent doc (and that message) change in the same PR, and this is a web-visible contract change that Req 15.2 should cover as a marked limitation sentence. Please add the `generate` message to Req 15's list of shipped text.

6. **Req 9.2, six groups.** Fine for web. One note: for the CSS-affecting groups, the `Consumer Guard` case is "edit the copy, `generate`, the output changes". For web, assert the changed value appears in the CSS, not only that the file differs, so a no-op diff (timestamp, ordering) does not count.

7. **Req 9.3 (CHANGELOG limitation rewritten, not removed).** Agree. Nothing web-specific.

8. **Req 12 (per-platform paths).** Web should be a `platforms:` key too, or the requirement should say web stays at `output`. 12.1 says "per platform" and 12.3 says "a platform the generator does not know"; web is one the generator knows. A web adopter who sets `platforms:` for iOS only should not lose or move their CSS. Add one AC: web's path is `output` unless `platforms:` names it. Small; belongs here, not design.

9. **Req 11 (init runs generate).** Web adopters' first-render path: `init` then `generate` now writes CSS to `output` without a second step, which is what a web founder wants. Founder-journey count is Leonardo's; no web objection.

**Gaps.**
- Item 1 above: no requirement carries a web check that the generated CSS is self-consistent. This is the main gap.
- Nothing carries "web component source (`src/components/**/platforms/web`) resolves its tokens against a consumer's generated CSS". 132's D4 app covers native; web is not named in plan-r2 (as far as I read it). I do not ask 129 to carry it; I flag it for 132's outline.

**Size.** Nothing web is large. The `var()` assertion is one test; Q3b is a design-round deliverable.

**Records.** None are mine.

**Class option**: assert in `Consumer Guard` that every `var()` in the generated web CSS is defined (item 1) — cost: one test and a small allowlist; survives as a name check, not a render check.

#### [THURGOOD R2]

Read all seven R1 entries in full (above, spliced byte for byte from the reviewers' files). Rebased on `origin/main` `c22c17a78` (#655, #656, #657). `requirements.md` is now R2. Criteria numbers are kept stable; a removed criterion says so in place. Each item below is **incorporated**, **no change** (with the reason) or **carried** (to design, tasks or Spec 132, with an owner).

**Answering my @ mentions first**
- [@THURGOOD] from [STACY R1], **the route for an entry a fix uncovers**: Req 3.5 (c). An addition is admitted when the same diff removes at least one entry from a list of the same platform, or edits the file the added entry is in. Both are decided from the diff alone. Each such entry prints as `unmasked:`, carries a tag and is counted in the summary line. Row 6's import fix removes the `Unresolved reference 'dp'` entries, and row 4's colour decision removes the `Oklch` entries, so both qualify. What survives: a regression landing beside a fix in the same platform is admitted too, printed and tagged, and reading it stays yours (Req 3, "Its limits").
- [@THURGOOD] from [STACY R1], **is the D1 fix a clarification or a D-row change?** **A change.** D1's own purpose clause says "so every public member is read", and the corrected probe takes its list from the token index instead of the emitted file. Both alter the oracle's text, not only how it is read. So it goes to Peter under Req 1.9, as one `**Open for Peter**:` line in #658's body. Req 2.7 is written to the proposed text and marked pending his answer. If he says no, row 9 rests on Req 6.2's text guard.

**[STACY R1]**
- Incorporated:
  - D2's completeness half → Req 5.10, noted in 1.3.
  - "Can fire" defined (Conventions); a `manual` tag fails (3.6); Lina's new record must carry a Trigger that can fire (1.5).
  - 1.7's second sentence, 3.9 and 15.1's variants are each labelled as a reading.
  - The runner label lives in the workflow's `runs-on`, and the pin file names the same label (2.8); 3.11 checks the running toolchain.
  - A recorded fault run for 2.11.
  - 2.14 re-keyed to "before the fixing PR".
  - 3.2's item label is found in the record's text.
  - The floor is computed at run time (3.4).
  - Only a version-value change opens the pin exception (3.5 (a)).
  - The protected set cannot shrink while its records are open (3.7).
  - 4.2's list comes from the index.
  - 4.3: the PR body names the re-baseline.
  - The binding case for 5.1.
  - Row 14's behaviour items moved to 132 (8.4), so 8.4's label question is gone.
  - 9.2's six groups fixed at INSTALL L77 @ `45f5262ee`.
  - 13.1's known-bad case.
  - 5.2 reworded as a "what".
  - The owners' own PRs (Record dispositions, and #658's body).
  - The removed duplicates and non-criteria: 6.1, 8.1, 8.5 (now a note), 6.6 and 15.3 (to tasks), and 9.1 and 13.2's first half (to "Carried to design").
- No change: 6.3's first half stays. Its Jest assertion on whatever form the design picks is the acceptance; only the form is design's.
- Carried to tasks: the MIDPOINT carrier; the second re-rule of the 15 intake records; whether `harness/**` and the comparator join your ARMING list (law, so a ballot).

**[ADA R1]**
- Incorporated:
  - #13 left out, and re-ruled by you to CLOSEOUT marked "not intake".
  - Item (iii): design starts from plan-r2 WP1. The native `ComponentTokens` files retire with the root files and `ComponentTokens.web.css` keeps shipping (10.1); your charter edit is a precondition.
  - Modes and theme instances (4.1).
  - "Named as Q12 decides" (4.1).
  - 4.2's floor note.
  - 4.8's two tags.
  - The six definition files ship, checked by pack-assert (5.1).
  - The duplicate-group failure (5.3).
  - The per-group index (5.2).
  - `generate` reports and `sync` reports on upgrade, across every platform (5.4).
  - 5.6 rewritten to the record's fix.
  - The colour-value ΔE₀₀ test (6.10).
  - 6.6 moved to tasks.
  - Row 11's migration (7.4).
  - The web literal check (7.1).
  - The override-map case follows Q3a (9.2).
  - 10.4's list.
  - `init` failure (11.4).
  - Folder and file-name rules (12.4).
  - `platforms:` against `output` (12.2).
  - 13.1's both-ways check.
  - 13.2 warns on consumer values.
  - 13.3 adds `SemanticOverride`.
- Incorporated with a correction: Token Governance (15.6). The sentence you cite from record #22 ("generates output for all registered themes") does not appear in `governance/Token-Governance.md` at `c22c17a78`; § "Theme Registry (Spec 094)" now says a registered theme is "not applied yet". So 15.6 aims at that section's next edit, when items (i) and (vi) ship.
- **Carried, not folded, because it opens a fork between you and Lina**: item (ii) on web. You ask for D2's set equality on the web output. Lina R1 (5.1 correction 1) says web binds late through `@3fn/core/component-tokens.css`, and harvesting ours into the adopter's web output would define each property twice. Req 5.1 is now iOS and Android, and "whether item (ii) harvests into web at all" is carried to design (Ada, Lina, Sparky). 10.4 names the web change only if design takes it. It is not Peter's now. It becomes his only if design finds a supported web consumer breaks (Q7).
- Carried to tasks: 9.2 as its own parent; Req 6 as its own parent. Carried to design: row 1's fix and its size.

**[LINA R1]**
- Incorporated:
  - Req 14's reading, confirmed (14.2).
  - The VerticalList readiness correction (14.3); your PR is a precondition.
  - A3, I1–I3, A1, A2, A4 and A6's non-ripple parts moved to 132 (8.4; 8.3 removed).
  - Token-index item 2 as your own PR before #658.
  - The masked-error exception (3.5 (c)).
  - 2.14 for masked rows.
  - The guard is temporary, with its retirement criterion and its limits (4.4).
  - The static colour reads (4.10).
  - Item 3's typography constants (6.8), and 6.8's guard wording.
  - L816 before the harness unit's first PR, or as a tagged entry (4.7).
  - 5.1 limited to iOS and Android; the web question is carried, as above.
  - Six files, and an empty file is reported (5.1).
  - Where Requirement 1.5's decision is recorded (5.5).
  - The `sync` missing-key case (5.11).
  - A6 named (8.2, 8.4).
  - The sizing event at the first run after rows 4 and 6 (1.5; tasks).
  - Your record acts and the two corrected targets (#658's preconditions).
- Carried to tasks: the R1 grant naming Ada consulted; Req 4 split into a generator parent and a component parent.

**[KENYA R1]**
- Incorporated:
  - Compile flags in the pin file, and the invocation printed (2.6, 2.8).
  - The compile-only falsification case (3.10).
  - The probe's wording, the planted member and the read count (2.7, pending Peter).
  - Toolchain match (3.11), which is Thurgood R3's fourth red reason, restored.
  - The deployment target equals Core Goals' minimum and is the one non-harness pin (2.9).
  - Normalisation: doubled diagnostics, quoted identifiers (3.2, 3.10).
  - The file set and a floor read from the tarball, with the package's `ComponentTokens` excluded (2.4, 3.4).
  - Diagnostics per context, by file location (2.6), with the cascade limit stated (Req 3, "Its limits").
  - Row 9's interim text guard (6.2).
  - The `EnvironmentValues` property (4.1).
  - 6.4 "on Android", since the iOS values fail the compile.
  - I1–I3 to 132; 129 may carry their code changes, claimed only as "compiles" (8.4).
  - The harness record's re-rule at the first `tasks.md` commit (Req 2, Records).
- No change: `#Preview` blocks stay in the compile, as you say. That is a tagging note, not a requirement. Your local counts are no longer the CI list's counts; nothing in the requirements uses them.
- Carried to tasks: the Xcode pin fork (26.x on `macos-26`, or 27.x with an unverified runner label).

**[DATA R1]**
- Incorporated:
  - The Android twin of 2.6, in your wording.
  - The read count and the `@Composable` probe (2.6, 2.7).
  - The Compose pin checked through the baseline's A5, A6 and A7 entries (2.8).
  - Continuation lines, relative paths and split tags (3.2).
  - Package resources on the Android build (2.4), with the README record closing before the first Android run (10.3).
  - `minSdk` checks nothing; no green reads as "runs on the minimum" (2.9).
  - The per-tier compiled count printed (3.4).
  - Both Kotlin files for row 6 (6.5).
  - 6.6 removed; rows 4 (item 2), 5 and 7 named as small first fixes in the tasks list.
  - A6 (8.2, 8.4).
  - The dead import's text guard (8.2).
  - A1, A2 and A4 to 132 (8.4).
  - Hand-written shipped files compiled in the component tier (2.4).
  - Third-party library, JDK and Gradle pins (2.8).
- Incorporated narrower than proposed: 3.5's exception. I took "the same diff removes entries from a list of the same platform, or edits the entry's own file". I did not take the arm "a diff that changes generator source (`src/providers/**`, `src/generators/**`, `src/build/**`)". It would admit any addition in any generator PR, including a generator regression with no fix beside it. Row 6's and row 4's fixes both remove the masking entries, so they are covered without it.
- **One consequence to note**: you suggest tagging `ThemeAwareBlendUtilities.android.kt`'s entries to `2026-06-24-blend-system-architecture-and-oklch-alignment.md`. Its Trigger is `manual`, so under the new 3.6 such a tag fails. Those entries go to Lina's component-repair record unless the blend record's owner (Ada) gives it a Trigger that can fire. [@KENYA] still owes whether the iOS twin fails the same way; it is not blocking.

**[LEONARDO R1]**
- Incorporated:
  - The package-copy removal test (9.5).
  - The override-map overlap (9.2).
  - `init` failure (11.4).
  - The two founder checks (11.1).
  - Overlays and the served corpus in 15.1.
  - The consumer overlays in 4.9.
  - The "Native status" passage follows Req 1 (15.5).
  - A `platforms:` path outside the project root fails (12.3).
- No change: the passage's "Spec 132" naming is Kenya's and Data's wording under 15.5, not a requirement. Your Q3b read and its React Native note stay as carried.
- Carried: the founder count read (design, Ada decides); one fixture in D4's layout (tasks).

**[SPARKY R1]**
- Incorporated:
  - The `var()` resolution check, with its allowlist (1.6).
  - The web component tier's only check named in 1.6, and web wording held to it (15.1).
  - The 7.1 instrument, and the validator test that fails until the set is emptied (Req 7 instrument line).
  - The browser check committed as a finding naming the browser and version (Req 9, carried).
  - The `generate` message and the web agent doc, if Q3a ships a web custom theme (Req 9, carried; 15.1).
  - Value-level web assertions for 9.2.
  - Web stays at `output` unless `platforms:` names it (12.2).
- No change: 9.3 and Req 11; you agree with both.
- Carried to Spec 132's outline: a check that web component source resolves against a consumer's generated CSS (Out of scope).

**Tally**: 128 items. **Incorporated 109** (one narrowed: Data's 3.5 arm). **No change 6**, each with its reason. **Carried 13**:
- design: Ada's web harvest fork; row 1's fix and its size; Leonardo's founder-count read;
- tasks: the MIDPOINT carrier; the second re-rule; the ARMING list; 9.2 and Req 6 as parents; the Req 4 split; the R1 grant; the Xcode pin fork; one D4-layout fixture;
- Spec 132: Sparky's web source check.

**For Peter, one item**: D1's wording (above). Nothing else in this round needs him.

**Merge preconditions for #658, in order**, all the owners' own PRs (Stacy R1):
1. Lina's token-index item-2 PR.
2. Lina's VerticalList readiness PR (Req 14.3).
3. Ada's record-only PR: 13 re-rules (#1–#13), the charter's item (iii) edit, and the OKLCH record's Class.
4. Lina's record-only PR: 4 acts (#14, #15 and #17 re-rules; #16 close), plus the corrected target for `2026-09-26-native-component-theme-hardcoding.md`, and the planned target for the drawn-control record's later re-rule.
5. Peter's answer on D1.

Lina's `ContainerCardBase` L816 fix lands before the harness unit's first PR, not before #658.

**Thinning bar**:
- `requirements.md`: 6,690 words before (R1), **9,108 after** (`wc -w`). That is +2,418 words, for 103 numbered criteria (7 of them removal markers, so 96 live; R1 had 91).
- The growth is the fold: 109 incorporated items, most of them a missing check or a closed weakening route. It is not restated facts. No fact sentence was added that the facts file prints.
- Net root records on this branch: 0. On `main` since R1: +2, both filed by others (#655, #656).

**Counter-argument, worked against this fold.**
- **The objection**: a 36% growth, in a round meant to thin the governance volume, is the volume problem in its plainest form. Several additions (the Kotlin multi-line rule, compile flags, the ΔE₀₀ tolerance) read as design detail.
- **Folded in**: seven non-criteria were removed or moved; numbering stayed stable so that seven reviewers can cross-read without a map; each addition names its source entry instead of re-arguing it.
- **What survives**: most additions close a way an instrument could go green while the thing it checks is broken. Stacy found three such checks and four weakening routes; Kenya found an unenforced pin worth 125 differing entries. Cutting them would cut checkability, and these are additions only a reviewer with a toolchain could find. The file is now large enough that a reader needs the R2 notes to see why each line is there. Whether that size is acceptable is Spec 131's measure, not mine.

#### [PETER] D1's probe sentence (2026-11-05; recorded by Thurgood)
- **His words**, verbatim, received 2026-11-05T05:14:42Z (`date -u` at receipt; orchestrator relay): **"Yes on D1; 659 and 660 are merged"**.
- **What he had read**: the `**Open for Peter**:` line in #658's body, with the proposed replacement sentence verbatim ("The probe module that reads the tokens reads every member the token index names for that platform, whatever its declared access level, and the run fails if the probe's read count differs from that list's count."). He had also read the orchestrator's summary: "Yes. The check catches the defect it's there for … Thurgood and I both recommend yes."
- **What it decides**: under Requirement 1.9, D1's probe sentence ("generated from the emitted members, so every public member is read") is replaced by the sentence quoted above. Requirement 2.7 is no longer pending. `evidence/2026-11-05-native-plan/plan-r2.md` is not edited; the amendment is recorded in that folder's `README.md`.
- **Also recorded**: #659 (`0057d1f94`, token-index item 2) and #660 (`a2e89c651`, the VerticalList readiness flags) have merged. These are #658's merge preconditions 1 and 2. Preconditions 3 and 4 (Ada's and Lina's record-only PRs) are still owed.
