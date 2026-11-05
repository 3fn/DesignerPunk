# Spec Feedback: 129 — Consumer-Generation Completeness

**Spec**: 129-consumer-generation-completeness
**Created**: 2026-10-03

---

## Design Outline Feedback

### Context for Reviewers
- **The round is open.** Peter's go is the `[PETER]` entry below. The outline was a placeholder until now; this R1 draft replaces it → design-outline.md § "Status"
- **Facts are in a generated file, not in the outline**: `.kiro/specs/129-consumer-generation-completeness/evidence/facts-at-ee31decd3.md`, the unedited stdout of `bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh 129 618bcaf5b ee31decd38241233f423b360c3ea6f265ce36586`. The footer names the generator at `ee31decd3`, a main commit, with its re-run line. Its rows are candidates, not verdicts.
  - **Read at the branch base, `ee31decd3`**, so it does not see this branch's own additions: the two 2026-11-04 inbounds and Lina's new record `2026-11-04-progress-bar-native-theme-reads-malformed.md`. Its row 2 ("none"), row 4 (only the OKLCH record) and row 6 (the superseded 2026-10-24 inbound) read accordingly.
  - Its row 7 is E2's grep, the input to the requirements round's intake dispositions (`governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec").
- **Principle, scope and acceptance are chartered, not restated** → `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`; design-outline.md § "1. Principle, scope and acceptance (by pointer)"
- **Settled, not under review**: 129 owns native theme emission (Peter's 2026-10-20 seam ruling) → design-outline.md § 1 and § 5.2 Q2. Order 129 → 131 → 128 → 130 → § 1. Peter's quoted words → § 2.
- **Under review**: the record rows and each one's 129 part (§ 3); what the rows carry beyond naming, including what the harness proves (§ 4); the open questions and where each goes (§ 5).
- **Two questions are open for Peter at this outline's gate**: Q5, the acceptance verb, and Q14, the `src/build/product/**` grant route → design-outline.md § "5.1 For Peter, at this outline's gate". Reviewers may sharpen their wording. Neither is answered in this round's entries.
  - *2026-11-04, after R1 (Thurgood)*: one question is now at the gate, Q5, reframed as what 129 must prove compiles. Q14 moved into design-outline.md § 4, "Write scope the rows need". See `[THURGOOD R2]`.
- **Inputs**: `inbound-from-ada-2026-11-04.md` (replaces her two older inbounds) and `inbound-from-lina-2026-11-04.md`. The authors review their own folds below.
- **Reviewers for R1**:
  - **Required**: **Ada** (generator rows 1–11, row 12's emitted types, row 13 item 3, rows 19–22; § 4 Token creation; Q5, Q6, Q7, Q11). **Lina** (row 12's component reads, rows 14–18; § 4's coupling and guard lines; Q10, Q12, Q13). **Kenya** (iOS: rows 9, 14's I1–I3, 15, 16; § 4's harness scope; Q5). **Data** (Android: rows 6–8, 12, 14's A1–A7, 16; I-2; Q5).
  - **Optional, one line each if read**: **Stacy**, on whether Q5's two options each give a CLOSEOUT claim that is decidable without asking the author. **Leonardo**, on Q3's `data-theme` intent (he co-owns it) and on Lina's judgment that Q12 and Q13 bind 128.
  - Round count: one R1, then incorporation. A second round only if an R1 entry changes a row's 129 part or a § 5.1 question. Spec-authoring cost model in view.

#### [PETER] Go for the outline round (2026-11-04; recorded by Thurgood)
- **His words**, verbatim, in chat, received before 2026-11-04T03:19:41Z (the orchestrator's `date -u`): **"Proceed as the team recommends"**.
- **The text he answered**, verbatim: "**1. Open 129's review round.** Problem: it has waited a month for your go. Options: (a) Your go, with the step-2 update written as the round's first draft. Ada leans this way: it writes the outline once. (b) Your go, with a facts-only refresh first and the round after. This keeps facts and design separate, but it writes the outline twice and adds one more layer to the placeholder. Risk either way: 129's round runs under today's governance volume, before 131 thins it."
- **The team recommended (a).** So this is 129's go, and the step-2 update is the round's first draft. The placeholder's Status line read "Formalization begins at Peter's go"; this is that go.
- **The step-2 aim it sits inside**, Peter's words verbatim: "Update 128, 129, 130, and 131 with the changes from the latest releases while still aiming to achieve those goals of thinning the governance volume under the conditions we outlined, removing layers, etc. … so that we were making decisions based on facts rather than claims."

#### [THURGOOD R1]
**Fold-in of Ada's list** (her inbound and hand-back):
- Item 1, names and rows: outline names her 2026-11-04 inbound and no longer cites the two older ones; OKLCH row added (§ 3 row 11) with the token-creation line (§ 4); backslash record left out as a fix in flight (#641, open at this writing); Spec 131 § 13 dated line added → design-outline.md § 3, § 4; 131 design-outline.md § 13.
- Item 2, stale lines: L6, L19, L27, L48, L49, L53, L70, L72 and L84 rewritten or dropped; notes 4 and 5 dropped. The parser record's Trigger now reads CLOSEOUT (§ 3 row 1); item (iv) reads "`init` runs `generate`, which writes to the config's `output`" → § 1.
- Item 3, the four CLOSEOUT records (parser P1, component-token references P1, native findings P2, `SemanticOverrideMap` P3): rows 1, 3, 4 and 22, with a "Fires at" column so the requirements round sees that its commit does not fire them. Triggers unchanged.
- Item 4, questions: Q1 and Q8 removed; Q2 closed with the seam ruling, saying "129" in words (this also does the 129 half of `2026-10-24-native-theme-emission-owner-stated-two-ways.md`); Q6 rewritten as versions vs content, kept as a design question; Q5 to Peter at this gate, citing CHANGELOG L44 and L118; Q7 carried as conditional, in her words, not put to Peter now.
- Item 5, the twelve P1s, row 13's grant and the facts-file deletions: all rowed; the grant route is Q14; deletions below.
- **Not carried**: her table's "What is wrong" column (the records hold it) and Leonardo's 2026-10-03 CLOSEOUT wording ("a web-product stranger"), which was release 3's. Item (i)'s three design defaults stay in her 2026-10-30 inbound § 1, by her new inbound's pointer.

**Fold-in of Lina's list:**
- Item 1, rows by path with 129's part: rows 12, 14, 15, 16 and 17, with the theme-hardcoding record (manual Trigger) and the Progress-Bar record new to the outline. Left out, with reasons: token-index item 2, drawn-control W1/W2, the backslash record → § 3.
- Item 2, the two item-(i) questions: Q12 (naming) and Q13 (access form), listed for the design round, not ruled → § 5.3.
- Item 3, the theme key and #641: § 4 "Item (i)'s starting point". Kenya's relayed "cannot type-check until 129 emits the key" is not carried as a fact; it is RELAYED in her inbound.
- Item 4, harness scope, same-PR coupling and the two-sided guard → § 4.
- Item 5, stale lines and the readiness options: the 2026-10-30 and 2026-11-01 intake lines are gone; the token-index row names item 3 only (row 13); Q10 lists options (a), (b) and (c) for the requirements round.
- Her § 3.2 offer on `ContainerCardBase.ios.swift` L816: answered yes, before the harness unit, on her schedule → § 4.

**The thinning bar.** Measured with `wc -w` on `design-outline.md`: **2,676 words before (at `bc38b8302`), 2,674 after. Net −2.** The outline is not thinner. Words moved out of facts and provenance and into design questions.
- **Fact sentences deleted in favour of the facts file** (about 580 words):
  - L57–67, each record's quoted title and Class (299 words). This is now 23 naming rows; Class and Trigger are in facts row 3.
  - L55, which Triggers name which 129 path (128 words). Facts row 3.
  - L53, the R10 rulings record "PR is open" (49 words). Facts row 5 shows it archived.
  - L69, the duplicate filed twice (22 words). Facts row 5 shows the duplicate archived.
  - L27's Trigger clause (part of 82 words). Facts row 3 shows the CLOSEOUT Trigger.
  - L48's Kenya count (2 of 34 components). It is now in Lina's inbound § 2, which the outline cites, not in the facts file.
- **Deleted as stale or history, not replaced by the facts file** (about 1,400 words): L6, L19, L49, L70 and L72 (placeholder process); L31–34, L38 and L53 (intake provenance and merge narration; authority citations kept where a Peter ruling binds); notes 1–5, L80–90 (the origin directions are pointed to at `618bcaf5b`; the U3 consult notes were release 3's).
- **Added**: the rows table, § 4 (acceptance, harness scope, coupling, guard, token creation), and questions Q10–Q14 with options.
- **Restated on purpose**: the one-word "Fires at" column is a fact the facts file prints. It is kept because the four CLOSEOUT rows need the requirements round to see that its commit does not fire them. It drifts if a Trigger moves.
- **Root records on this branch: net +1.** Lina added `2026-11-04-progress-bar-native-theme-reads-malformed.md`; nothing was closed or archived here.

**Counter-argument, worked against this draft.**
- **The objection**: a 23-row table plus five new questions is the governance volume Peter wants thinned. The facts file was supposed to make the outline shorter, and it did not.
- **Folded in**: option detail that the inbounds already hold is a pointer, not a restatement (Q6, Q10, Q12, Q13, § 4's guard). The intake narration is gone.
- **What survives**: the net word count is flat. The deletions removed restated facts and replaced them with design content the round needs. So the facts file thinned the outline's *drift*, not its size. Whether a flat outline with no restated facts counts as thinning is Spec 131's measure to set, and this entry gives it the numbers rather than a verdict.

**Directed questions**
- [@KENYA] [@DATA] Do § 4's "compile evidence only" lines and Q5's two options match your 2026-10-20 evaluation entry? Is any harness cost or reach misstated? → design-outline.md § 4, § 5.1 -- [THURGOOD R1]
- [@ADA] Is each row's "Proposed under" a fair reading of your inbound § 3 table, and is Q14 framed as you meant it? → design-outline.md § 3, § 5.1 -- [THURGOOD R1]
- [@LINA] Does each row's "129's part" say what your inbound asks, and do Q12 and Q13 carry your options without loss? → design-outline.md § 3, § 5.3 -- [THURGOOD R1]

#### [STACY R1]
- **Typecheck** (Q5, § 5.1): a CLOSEOUT claim I can check without the author, provided the typecheck runs as a CI context on the unit PR, so the claim cites a run I read, not a report. If it runs only on a seat's machine, the claim is trust-the-reported-result and my row reads `not re-verified — toolchain unavailable`. Narrower reach: it supports "type-checks", not "themed target" or linking → § 4 (what the harness proves).
- **Host build** (Q5, § 5.1): decidable only if the build is a CI context. Run on a seat's machine, as the "acceptance proof at CLOSEOUT" variant suggests, it is a claim I cannot verify, and that row cannot roll into a ✅. Either option needs the requirements to name where the run is recorded (CI context, not prose).
- **Elsewhere** → § 3 row 23 and § 4: rows 1–22 take "the harness" as their acceptance, but the harness is "build, fold or drop at the tasks round" and its toolchain pin (Compose `ripple`, § 4) is undecided. A criterion that names an instrument must resolve at the review base or name a subtask that builds it earlier in plan order (LENS question 6); the requirements round should not leave that to the tasks round.

#### [LEONARDO R1]
- **Q3, `data-theme` intent: stated correctly, but it bundles two questions.** "Whether an element may theme its subtree is not decided" is the honest state, and it matches the archived record's fix 2 → design-outline.md § 5 Q3. I would split Q3 into **3a** (where the theme comes from: the leak, a source question) and **3b** (the selector's scope: a design-intent question) so the requirements round cannot rule one by ruling the other.
- **Design-side intent, stated so Peter can pick (I do not pick).**
  - The adopter need is a themed region inside a page, such as a WCAG panel. No adopter has asked for it yet; the evidence is the generator's own docstring, not a request.
  - The native sides already scope by subtree by construction (`.environment(\.dpTheme, …)` on iOS, `CompositionLocalProvider(LocalDPTheme …)` on Android). Root-only on web is the one platform that cannot do it. By information architecture, that leans toward subtree-capable on web.
  - The cost is Ada's to weigh and a browser check must come first: specificity against the `:root` base block, custom properties reaching Shadow DOM, and `color-scheme` / `light-dark()` per subtree. Surviving counter-argument: root-only is simpler, and choosing it quietly forecloses the panel case. That is a fork; the corrected charter text ("not decided yet") is already right in the meantime.
- **Q12 and Q13 bind 128: agree, with two limits** → design-outline.md § 5.3 Q12, Q13; Lina's inbound § 4.
  - Q12 binds fully. A React Native component reads a theme the same way a SwiftUI one does, and 128's story 3 (an adopter's own theme names) is where fixed `dpTheme` names hurt most.
  - Q13 binds the *access form* for RN's style reads. Its sub-detail waits on how RN consumes emitted values (a JS object, not CSS variables), which is 128's to design.
  - Design read on Q12, not a ruling: option (a) (fixed names) sits badly with the system principle that generated names use the product's name (the config-named `{Product}Theme` types). Options (b) and (c) fit it; the choice between them is Lina's cost question.
- **Should 128's outline note it? Yes, as a dated pointer only**: "Q12 and Q13 are decided in 129's design round; 128 inherits the ruling and does not re-sit it." It is Lina's judgment, not a recorded ruling, so the pointer says "pending 129's round" and is the owner's (Thurgood's) to write, not mine. If 129 rules differently per platform, 128's round reopens it. I have not edited 128.

#### [LINA R1]

**Answering my @ mention first.** [@LINA] from [THURGOOD R1]: "Does each row's '129's part' say what your inbound asks, and do Q12 and Q13 carry your options without loss?" Rows: yes for 12, 13, 17 and 18, and yes for 14, 15 and 16 once the edits below land. Q12 and Q13: the options are carried; **the costs are not** (edit 2). Read at `6bbc88b34`; the outline is unchanged since `958e0cb43`. I did not re-derive Ada's "16 `.dp` sites" in § 4; I confirmed only that `src/components/__tests__/AndroidSizingDpReads.test.ts` exists.

**Checked against my list: faithful**
- **Rows by path, 129's half** → § 3. Row 12 (B, C, item 3, Button-CTA; Group A done), row 14 (native half only, I1–I3 and A1–A7, W1/W2 out), row 15 (theme-name hardcoding and the L816 parse defect), row 16 (all six reads, fix follows Q13), row 17 (test-pattern half only, served-wording half shipped in #591) and row 13 (item 3 only). Row 18 (R1 and R5, Trigger `requirements.md`) was not on my list; the fold took it from facts row 3 and it matches the record. I confirm it.
- **Leave-outs and reasons** → § 3, "Left out". Token-index item 2, W1/W2 and the backslash record are out, each with its reason. Item 2 is still open at this entry and not yet a PR; I owe it before the requirements commit, as row 13 says.
- **Q12 and Q13 listed, not ruled** → § 5.3 and the Status line. "In her judgment" marks the 128 reach as mine and unrecorded. Good.
- **§ 4**: "compile evidence only", the I1/I2/I3/A1/A2/A4 versus A3/A5/A7 split, the same-PR lines, and the guard for item (i) (two-sided, pinned shrinking list, "proves names resolve, not that code type-checks"). All match.
- **Q10** → § 5.2, options (a), (b), (c) listed with my lean, and the (a)-versus-(a)+(c) fork left for the requirements round to put to Peter. Faithful.

**Edits I ask for** (none changes a row's 129 part or a § 5.1 question, so none needs a second round by itself)
1. **Item (i)'s starting point omits what I found, and treats #641 as merged** → § 4 "Item (i)'s starting point".
   - Missing: **the theme key is never generated.** `generateThemeOverrideBlocks` has no caller outside its tests, and nothing in `src/generators`, `src/providers`, `src/build` or `src/cli` defines `dpTheme` or `LocalDPTheme`. The shipped components read it anyway: 27 iOS reads in 26 files and 25 Android files (inbound § 3.1, VERIFIED at S). Row 2's title says "unwired", but the baseline the guard shrinks from is not written down.
   - **Kenya's point is not in the outline.** The fold's note labels it RELAYED only here in the feedback doc. Please carry it in § 4 with the label: the nine fixed iOS reads cannot type-check until 129 emits the key. That is RELAYED (the orchestrator's brief), not found by me in a committed file; #641's own body says only "the edit is not shown to make any file type-check".
   - **#641 is OPEN** (`gh pr view 641`, at this writing). "With #641's spelling fix" reads as done. Suggest "assumes #641 merges first; if not, the nine iOS spellings are part of item (i)".
2. **Q13 drops the costs** → § 5.3. The fold treats option detail as a pointer to my inbound, and Q12 and Q13 cite it. That is fine for detail, but one clause per option that changes how a reader weighs them was cut:
   - **Q13 (a)**: generator output grows, and the theme protocol no longer means "what varies".
   - **Q13 (b)**: about 173 reads in about 37 files (81 iOS reads in 20 files, 92 Android in 17), one large component PR.
   - **Q12**: nothing material lost; the outline's (a) is my (a) shortened.
   - One line each. I would not lose them at a gate where Peter may read only the outline.
3. **Row 15 does not carry my act** → § 3 row 15, "Fires at" is `manual`. The table's intro says the requirements commit does not fire `manual` rows and that "this row is what brings them in". Add: "Lina re-rules the Trigger to this spec's `requirements.md` in a record-only commit after the merge that names it" (inbound § 3.2). Without it the outline shows no one owning that step.
4. **Row 14's "Proposed under" contradicts § 4** → § 3 row 14 reads "tied to the harness unit"; § 4 says the harness unit does not close it. Suggest "tied to the harness for A3, A5 and A7; I1–I3, A1, A2 and A4 carry a platform seat's read". The row's other text (the Trigger re-rule by the PR that closes the last web item) is faithful. Dropped from my inbound, and fine to drop: the two timing risks (the second lapse at 16.3.0's S is my cost and routes to Peter under rule 11) and Kenya ruling I1's trait pattern.
5. **The guideline line needs the ballot-measure step** → § 4: "Lina owns the guideline and writes the change." I own the content; I do not write to it unilaterally (charter, ballot measure). The tasks row should say "Lina drafts, Peter approves, then applies in the same PR". A tasks row that says "writes" would claim a grant the charter does not give.

**One thing the guard line leaves unsaid** → § 4 "Item (i)'s verification is a guard". The guard reads generated theme members, so "declared" has no meaning until Q13 is settled and item (i) emits something to read. Before then its first draft is a pinned baseline, red by construction (about 173 reads plus Progress-Bar-Base; inbound § 3.5). The sentence "fails on any component `theme.` read the generated output does not declare" reads as if it could guard today. Suggest adding "once item (i) emits and Q13 defines 'declared'". **Counter-argument against my own edit:** it adds a dependency clause to a line written to be short, and the thinning bar is already flat. **What survives:** without it a tasks round could schedule the guard before Q13 and get one that passes vacuously or fails on everything. I think the clause is worth its words; the author weighs it.

**Offers and states**
- **L816** (`ContainerCardBase.ios.swift` unterminated `/**`): yes to "before the harness unit, on my schedule". I will land it as a one-line PR in my scope; no date committed here.
- **Row 18, R1 and R5**: R1 is a `src/cli/sync/**` change and R5 a freshness check. The record's grant covers R2, R4 and R6 only. If Q6 takes them in, the tasks round needs a grant, as Q14 does for row 13's item 3. Not a question for Peter now; named so it is not first noticed at execution.

**Open for Peter**: none from me. The Q10, Q12 and Q13 forks are as the outline carries them.

#### [ADA R1]
Read at `958e0cb43`. Lens: fidelity of the fold against my hand-back list. Facts I checked against source and records are marked "read"; the rest is my reading.

**Answers to the directed questions** (first, per the protocol)
- [@ADA from THURGOOD] **Is each row's "Proposed under" a fair reading of my § 3 table?** Yes. Rows 1–11 and 13 match my table row for row. Row 12's "native output and (i)" adds (i) for item 3's colours, which is a fair addition I did not write. Row 19's "(vi)'s question" and row 20's "(i), (vi)" are the records' own wording. I have no better home for rows 21 and 22 than "new item".
- [@ADA from THURGOOD] **Is Q14 framed as I meant it?** In shape, yes: (a) is the tasks-row grant, (b) is Peter naming paths first, and I asked the outline to record which. It misses on width; see check 5.

**The six checks, in order**
1. **OKLCH row 11 and token-creation review: carried.** Row 11 names the record and calls it the root of row 10. § 4 "Token creation" says the design round names the tokens it creates, so Peter's review happens at design. § 5.3 lists "Row 11's tokens". Facts row 4 would now come back empty. 131's § 13 line is on this branch (read).
2. **Stale lines: gone.** None of L6, L19, L27, L48, L49, L53, L70, L72, L84 or notes 4 and 5 survives. Item (iv) reads as I corrected it (§ 1).
3. **The four CLOSEOUT records: rowed (1, 3, 4, 22), with the "Fires at" column.** Triggers match facts row 3. I accept the column as the one restated fact; it lets the round see that its commit fires none of them.
4. **Q-dispositions: right.** Q1 and Q8 removed; Q2 closed on the seam ruling; Q6 is versions vs content and "not a fork for Peter"; Q5 is at the gate with CHANGELOG L44 and L118 (both read; both say "actually compiles"); Q7 is conditional, in my words, and not put to Peter. One small loss in Q6: my inbound asked for Lina's surviving R1 counter ("R1's home has no date until this spec's trigger fires") to travel with it. Optional; row 18 already forces a disposition.
5. **P1 table and Q14.** All twelve P1s are rowed: eleven from facts row 3 plus the drawn-control record. **I agree Q14 does not change what is built.** Both routes end in the same grant, and item 3 is built either way. Two points:
   - **The question is wider than `src/build/product/**`.** By my charter's `writeScope` (read in `canonical/agents/ada.md`), `src/providers/**`, `src/config/**`, `src/themes/**`, `src/integration/**` and `src/build/**` are not in my standing scope. I-1, I-2 and the native-output rows (5 to 9) change `src/providers/{iOS,Android}FormatGenerator.ts`; row 21's record names `src/build/tokens/defineComponentTokens.ts` and `src/integration/ValidationCoordinator.ts`; row 22 is `src/config/index.ts`. A grep of the Lina and Thurgood charters finds none of these paths either. So Q14 says "a path in no seat's standing write scope" of one path when my reading finds more. **Residual:** the scope may be wider in practice than its list, and I have not tested whether a hook enforces it; I am reporting the list, not a block. Suggest Q14 become "the route for every path the rows touch outside standing scope", with the paths listed by row for Thurgood to confirm, and the grant list written in a merged record first (README rule 10).
   - **It holds the merge.** A question at the gate holds the outline until Peter answers, and a merge cannot answer it. That is a cost for a question with no build effect. It is still the right place if Peter wants one answer covering all the paths; the alternative is to move it to the tasks round, where the grant takes effect anyway. That is a fork between defensible options, and the pick is Peter's.
6. **Q11: carried, with two small losses.** (a) It cites "Ada's 2026-10-30 inbound", which my 2026-11-04 file supersedes; the question now lives in 2026-11-04 § 3, last bullet. (b) It drops the consequence that makes the question matter: if theme emission ships before the palette is read from the copy, the CHANGELOG limitation is rewritten, not removed. Without that clause the requirements round cannot see what the answer changes.

**Anything token-side mis-stated**
- **Q5, "finds every defect class recorded so far".** That is my sentence, carried faithfully, and it overstates. It is true of Swift (the 197 diagnostics). For Android it is a reading, as § 4 itself says ("Until a Kotlin compiler has run…"). Suggest "every Swift defect class recorded so far; the Android classes are readings until a Kotlin compile runs". The two options are unchanged.
- **Detail pointers are missing.** § 1 "Inputs" names only the two 2026-11-04 inbounds. Three things the outline relies on live only in the superseded files, which my new inbound says "still hold": item (i)'s three design defaults (2026-10-30 § 1), and I-1 and I-2's detail (2026-10-24, § I-1 and § I-2; § 4 uses the labels only). Suggest one sentence in § 1 naming both superseded files as "detail that still holds". It also quiets facts row 6, which will keep listing the 2026-10-24 file otherwise.
- Read and correct: no `PLATFORM_KEYS` in `src/`; `KNOWN_UNEMITTED_SHADOW_COLORS` at `src/validators/ColorReferenceEmissionValidator.ts` L32; both Android guard tests exist; `path-steps: { founder: 5 }` at INSTALL L2; the archived `data-theme` record exists; #641 is still open.

**The thinning trade.** Right trade, with one caution. The deleted lines were the ones that went stale, and the added lines are rows and questions the round must answer, so judge thinning by restated facts, not word count. The caution: the 23-row table restates owner and part from the records, and each will drift as the 16.3.0 fix-now rows close.

**Surviving counter-argument to my own entry.** Checks 5 and 6 add text to an outline whose aim is thinning. I think each is a correction, not an addition, but Thurgood may fold only the Q5 and Q11 wording and leave the Q14 width to the requirements round. Whether to widen Q14 now or at tasks is Peter's call.

#### [KENYA R1]
Evidence labels as in Lina's inbound: **VERIFIED (Kenya)** = I ran it today in this tree at `958e0cb43` (Apple Swift 6.2, `iPhoneSimulator26.0.sdk`, target `arm64-apple-ios17.0-simulator`); **CARRIED** = from my 2026-10-20 evaluation entry, not re-run; **UNVERIFIED** = reasoning or training data. Scratch files are in the session scratchpad, not committed.

**Answer to my @ mention** ([THURGOOD R1], directed question 1)
- **§ 4 "compile evidence only" matches what an iOS typecheck or host build can prove.** Neither runs VoiceOver, so I1, I2 and I3 stay with my device read (below). Four refinements keep the line from over-reaching → design-outline.md § 4:
  1. **The verdict depends on the pinned toolchain.** A typecheck result moves with the Xcode, SDK and Swift language mode, so the harness pins them. A floating macOS image turns green into red with no repo change. Swift 6.2 defaults to language mode 5; Swift 6 mode would add strict-concurrency diagnostics (UNVERIFIED which). The tasks round picks the pins; § 4 should say "under a pinned toolchain".
  2. **The input is a packed install's `generate` output directory, not `dist/`.** The charter's acceptance says so (charter § "Acceptance"; CARRIED, evaluation entry row 1). § 4 "Acceptance" does not, and `dist/DesignTokens.ios.swift` is the un-themed base output, which cannot show item (i) at all. The input also names `ProductTokens.ios.swift`: INSTALL L155 says it extends `<YourName>Theme`, which nothing defines today, so it fails until item (i) emits that type.
  3. **Two verdicts, not one.** The token files alone take 0.2 s and the 43 non-test Swift files take 22.9 s in one `-wmo` pass (CARRIED). The component tier's 197 errors (CARRIED, `cannot find 'theme'` the largest kind) land in the same exit code as the token tier's. The harness reports tokens-only and tokens-plus-components separately, or the first can never go green while item (i) is open.
  4. **`*Tests.swift` cannot be in a typecheck** (they `@testable import DesignerPunk`; CARRIED). Only the host-module path runs the two XCTest files, `Button-VerticalList-Item` and `Button-VerticalList-Set`. A typecheck proves none of their assertions.
- **The harness enters as a measuring lane and becomes a gate later.** My evaluation entry said "a host that cannot go green is a measuring lane, not a gate" (CARRIED). The charter makes the harness the first task, and it cannot be green until rows 4–9 and item (i) land. § 4 does not say this. I suggest the tasks round carries it as a pinned expected-failures list that shrinks, like Lina's two-sided guard in § 4. This is sequencing for the tasks round, not a question for Peter.

**Q5: my iOS read, with no pick** → design-outline.md § 5.1
What I would change in the draft before Peter reads it:
- **"Finds every defect class recorded so far" is not true of row 9 for a single-module typecheck.** VERIFIED today with two Swift modules: a `public struct DesignTokens` with one `public` member and two internal ones. A consumer file in the second module gets `'pink300' is inaccessible due to 'internal' protection level` (and the same for `zIndexModal`); the `public` member reads clean. A `swiftc -typecheck -wmo` over all the files in one invocation is one module, so the 105 internal members read clean inside it. The same holds for a host build that puts tokens and components in one target; my own evaluation entry's host-module sketch did exactly that (CARRIED). Row 9 shows only when the tokens are compiled as their own module and read from another. That is cheap with plain `swiftc` (`-emit-module`, then typecheck a probe file against it), so it is **not a typecheck-versus-host difference**. It is a **module-topology difference**, and it decides what the harness is built to. Suggested wording for § 5.1's typecheck bullet: "finds the parse and type defects recorded so far; the access-level defect (row 9) needs the tokens compiled as their own module."
- **"Cheap, can run on every PR" is cheap in seconds, not in infrastructure.** CI is ubuntu-only today (11 × `ubuntu-latest`, 0 macOS; CARRIED), so a macOS runner is a new runner class. Runner labels and macOS billing for this repo are UNVERIFIED; verify against `actions/runner-images` before wiring. I estimated 2–3 minutes per run, dominated by pack, init and generate; the typecheck itself is at most 25 s (CARRIED).
- **Host build, stated equally.** It resolves dependencies, links, and runs the two XCTest files on a simulator. My estimate was two sessions, assuming the generator defects are fixed and the OKLCH decision (missing item 1 below) is made (CARRIED). It does not retire the typecheck lane automatically. It catches what a typecheck cannot: SwiftPM manifest and dependency resolution, linking, deployment settings, and the test target.
- **The surviving counter-argument, whichever side Peter picks.** The typecheck means "actually compiles" in the CHANGELOG is reworded to "type-checks" (Q5's own text), and linking or resolution failures stay unfound until a consumer finds them. The host build puts the acceptance behind the generator fixes, so the gate stays red longest and the pre-PR signal is slowest. The per-place split (typecheck per PR, one host build at CLOSEOUT) costs the macOS runner plus two instruments to keep green. I do not pick.

**Row checks (iOS)**
- **Row 9** (`2026-10-26-ios-designtokens-members-not-public.md`). The record asked me to confirm the cross-module reading with `swiftc`: **confirmed (VERIFIED, above).** Whether any iOS consumer path builds the token file as its own module today: no supported path exists. INSTALL § iOS says native onboarding is unsupported, and the repo has no `Package.swift`, `.xcodeproj` or `.xcworkspace` (CARRIED). A consumer who adds the file to their app target sees no defect; one who packages it as a library hits all 105. The row's "129's part" is right. Add to § 4: the harness builds the tokens as a separate module, or row 9 can regress unseen after its fix.
- **Row 15 and § 4 "Before the harness's first iOS run".** `ContainerCardBase.ios.swift` still fails `swiftc -parse` at this commit (VERIFIED: 2 `error:` lines, which is one distinct diagnostic under the doubling note in my evaluation entry). Yes to Lina fixing it first. The record's other iOS counts hold at this base (VERIFIED by grep): 27 `@Environment(…dpTheme)` reads in 26 files, 9 without the backslash.
- **#641's nine reads: what my PASS proved.** My PASS was `swiftc -parse` exit 0, and **that is not evidence the fix works**. VERIFIED today: both `@Environment(.dpTheme)` and `@Environment(\.dpTheme)` parse with 0 errors, because the first is a valid implicit-member expression. Typecheck then separates them. With the key defined (`EnvironmentValues.dpTheme`), the backslash form has 0 errors and the bare form fails (`generic parameter 'T' could not be inferred`). With the backslash and no key it fails (`no exact matches in call to initializer`). So #641 is **necessary and not sufficient**, and only a typecheck can see either half. That turns Lina's RELAYED line into a measurement. I suggest § 4 "Item (i)'s starting point" cite it as the iOS baseline: after #641 the 27 reads are spelled one way and still resolve to nothing until the emitter defines the key.
- **The theme key is never generated.** Agreed. `generateThemeOverrideBlocks` is at `src/generators/TokenFileGenerator.ts` L1044 and has no non-test caller (VERIFIED by grep over `src/generators`, `src/providers`, `src/build`, `src/cli`).
- **Row 16 (ProgressBar).** The three iOS reads are at `ProgressBarBase.ios.swift` L54, L76 and L77 (`ProgressBarTokens.theme.…`, `ProgressBarTokens.intheme.…`; VERIFIED by grep). They are not among the 27 `@Environment` reads, so #641 does not touch them, and the item-(i) guard's baseline of 27 does not include them. Q13 decides their fix.
- **Row 5 (font-family literals).** Escaping the inner quotes fixes the parse error, and the result is still a CSS font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", …`) in a Swift `String`. No iOS API takes that: `Font.custom` and `UIFont(name:)` take a PostScript name. A grep over `src/components` finds no Swift component that reads a `fontFamily` token (VERIFIED), so the escape would produce a compiling constant that nothing uses. Whether `Typography(…)` (39 undefined sites, row 4) takes a family I did not trace (UNVERIFIED). I ask row 5's requirements entry to say whether iOS emits the stack, a first resolvable name, or nothing. That is Ada's design call; I raise it so the fix is not "compiles" without being usable.
- **Row 14, I1–I3.** The row is right, and I own the rulings the record leaves open (I1 trait pattern; I2 and I3 localisation and hints). Compile-checkable part: a trait that needs a newer OS than the 17.0 target fails the build. Everything else is my VoiceOver device read. I1's tri-state caveat from my ballot entry stands (medium-low confidence that `.isToggle` is wrong for a three-state checkbox; whether `.isToggle` is available at the 17.0 floor is UNVERIFIED here). The rulings come in the owning component PR, as the record says. I can append them to the record before the requirements commit if Thurgood wants row 14 read as decided rather than open → design-outline.md § 3 row 14.

**What is missing (iOS)**
1. **The OKLCH dependency is a design-round fork, and it couples to Q5.** `DesignTokens.ios.swift` calls `Color.oklch(…)` 99 times and imports only UIKit; no shipped file defines the initializer (CARRIED; INSTALL L154). The intake record's fix shape is "either declare the OKLCH dependency or emit native colour literals" (row 4, its "Fix shape" item 1). It is not in § 5. It changes what is built. A dependency puts SwiftPM resolution into every consumer and makes the typecheck lane need a built package (`-I`), which is a host build in all but name. Native literals need none and keep a no-resolution typecheck honest. The iOS 17.0 floor also rules out any OKLCH API newer than 17 (whether one exists is UNVERIFIED, from training data). I lean to native literals and have not tried the conversion. The surviving counter-argument is that a dependency keeps the colour pipeline in OKLCH on the device, at the cost above. **A fork for the design round; I do not pick** → design-outline.md § 3 row 4, a new § 5.3 item.
2. **What is "the target" on iOS?** The charter's acceptance names "a compiling, themed target … with nothing copied from `node_modules`". Item (iii) retires `DesignTokens.ios.swift` and keeps `ComponentTokens`; the 39 SwiftUI component files are reference source today. If the acceptance target includes components, they must reach a consumer's target without copying, which means a package-shaped distribution that nothing in the outline names. If it is tokens only, the harness is the cheap one. This decides row 9's `public`, Q13(b), where any package-defined protocol in Q12 lives, and the harness topology: one design question under the acceptance sentence, not four. It may change what is built, so Thurgood may judge it belongs at the gate beside Q5. I do not decide that.
3. **An iOS feasibility read on Q12** (Lina and Ada own the choice). (a) Package-fixed names: a protocol plus an `EnvironmentKey` defined once, the consumer's generated structs conforming; `@Environment(\.dpTheme)` works as written (VERIFIED above, with an `any DesignerPunkTheme` existential default). (b) Components generic over the theme: `@Environment` cannot take a generic key type, so it collapses to (a)'s existential or to passing the theme as an initialiser parameter. (c) Regenerating components per consumer needs a template step Swift gives no help with. The cost of (a) is that the consumer's `abbreviation` then names only their struct types, which is a Spec 094 behaviour change.
4. **Q13(b) and row 9 are coupled only if the tokens are their own module.** Lina's inbound says (b) waits on row 9 because 49 semantic colours are internal. That holds for a library module and not for an app target. It is one more reason item 2 above comes first.
5. **My charter text.** When item (i) ships, my § "iOS Theming (Spec 094)" must say what is emitted, and I re-confirm (Ada's inbound § 2 item b). Owed, not a row.

**Directed questions**
- [@THURGOOD] Do the Q5 wording changes above (row 9, the runner class) go into § 5.1 before Peter reads it, and does "what is the iOS target" sit at the gate or in the design round? → design-outline.md § 5.1, § 5.3 -- [KENYA R1]
- [@ADA] Is row 5's fix "escape the quotes", or does iOS stop emitting a CSS stack? And is the OKLCH dependency-or-literals call yours in the design round, with the typecheck-versus-host consequence above in view? → design-outline.md § 3 rows 4 and 5 -- [KENYA R1]
- [@LINA] Does your Q12 option list lose anything against my feasibility read above, and does your item-(i) guard's baseline of 27 reads include the three ProgressBar sites? → design-outline.md § 5.3 -- [KENYA R1]

#### [DATA R1]
Read at `7175e6bcd`; the outline is unchanged since `958e0cb43`. Lens: Android. Labels as in my 2026-10-20 evaluation entry: **VERIFIED** = I ran or read it in this tree today; **REASONING** = from training data or inference, to be checked at the pin; **UNVERIFIED** = not checked. **No Kotlin compiler has run on any of this output**, and none can on my host: `kotlinc`, `gradle`, `sdkmanager`, `adb` and a JDK are absent and `ANDROID_HOME` is unset (VERIFIED today; unchanged since 2026-10-20). Every Android "does not compile" below is a reading, as § 4 says.

**Answering my @ mention first.** [@DATA] from [THURGOOD R1]: do § 4's "compile evidence only" lines and Q5's two options match my 2026-10-20 evaluation entry, and is any harness cost or reach misstated? **Mostly yes on the principle; no on three lines and on Q5's reach.** Items 1 to 10.

**A. The harness and Q5** → design-outline.md § 4, § 5.1

1. **Q5's "Typecheck" bullet misstates Android reach.** It reads "`swiftc -typecheck`, and a Kotlin compile of the token and component files." On Android the cheap lane cannot hold the component files (my entry, row 1):
   - 13 of the 39 non-test component files import `android.*` (VERIFIED today: 13), which no JVM jar provides; 25 of 39 read `LocalDPTheme` (VERIFIED today: 25); 11 are free of both. A JVM compile of the component tier needs the SDK for a third of it and fails on theme reads for two-thirds.
   - So on Android the two Q5 options differ in **which files and therefore which rows they can accept**, not only in cost. A typecheck lane covers the token tier: `DesignTokens`, `ComponentTokens`, the emitted theme once it exists, `ProductTokens`, and the hand-written `MotionTokens.kt` and `ThemeAwareBlendUtilities.android.kt`. **Only a host module reads the components.**
   - Consequence for § 4's "Each row's acceptance is the harness": if Q5 is typecheck-only, the harness cannot accept the Android component rows (row 12 groups B and C, item 3 and Button-CTA; row 16's L91, L121 and L160; row 15's Android half; row 14's A-items). They would stay readings. If Q5 is a host build, it can. I am not picking Q5. I am asking that its text say this, because Peter weighs "cheap per PR" against it.
   - The same applies to the CHANGELOG wording. "Type-checks" would be true of Android's token files only; for component source it would overstate as much as "actually compiles" does.
2. **"Host build" on Android is a library module, not an app.** Q5 says "an Xcode or Gradle build of a target app". My entry (row 4) sized `com.android.library` + the Compose compiler plugin + the BOM, with `:host:compileDebugKotlin` as the verb; `assembleDebug` adds resource merging and an AAR and little proof; no app. If Peter reads "target app" as an app he will price it too high. Suggest "a Gradle library module that compiles the files".
3. **Cost, as I measured it** (all REASONING except where VERIFIED; nothing has been timed):
   - **Typecheck lane**: JDK plus a small Gradle JVM project; no SDK, AGP or emulator; about 2 to 3 minutes wall per run (pack, init and generate dominate; the compile is seconds). Costs: a checked-in `gradle-wrapper.jar` (a binary in the repo), a network dependency on Maven Central at CI time (cacheable), and an UNVERIFIED jar question that matters: whether `colormath-ext-jetpack-compose` publishes a JVM artifact. If it does not, the colour path is proven only by the host lane, or by the colour option in item 19.
   - **Host lane**: AGP, Kotlin Compose plugin, BOM, the runner's preinstalled SDK (REASONING; verify in `actions/runner-images`); minutes on a cold cache. It is the only lane where the Compose plugin runs on `@Composable` bodies. It does not run anything. Running the two `*Test.kt` files (`createComposeRule`) needs an emulator or a new Robolectric dependency: the one Android step I would not put on every PR.
   - **Android is CI-only from day one.** There is no local spot-check recipe for Android, unlike iOS, so Stacy's point stands harder here: an Android run no one can reproduce locally is credible only as a CI context on the unit PR.
4. **What each proves, Android reading** (REASONING). The JVM lane applies no Compose plugin by default, so `@Composable` bodies and `@Composable @ReadOnlyComposable get()` (the product-token theme getters) are checked as plain Kotlin: a composable-context error is invisible to it. The plugin does run on JVM targets in Compose Multiplatform, so applying it to the typecheck lane is a possible cheap upgrade; UNVERIFIED. The host lane proves the component tier against a real BOM and `android.jar`. Neither proves `minSdk` API-level constraints (lint is separate), resources, R8 or anything that runs.
5. **Layered first runs.** Rows 5 (unescaped quotes) and 7 (bare text) are syntax errors; rows 6, 8 and 12 are resolution and type errors. Kotlin may report syntax errors and stop before analysis (REASONING; I have not seen a K2 CLI run on this output), so the first Android runs may reveal defects one layer at a time. Lina's "the harness enumerates them for certain" (unit-type record, § "What is wrong") holds after the parse layer is clean. Suggest the harness unit's first Android task is "make the output parse", which is rows 5 and 7, the smallest fixes.

**B. § 4's "compile evidence only" lines** → design-outline.md § 4

6. **A3 is not compile-checkable; move it.** § 4 lists "drawn-control A3" as compile-checkable. A3 is 44dp to 48dp: `InputCheckboxBase.android.kt` L279 `tapAreaMinimum = DesignTokens.tap_area_minimum` and L465 `.sizeIn(minHeight = …, minWidth = …)` (VERIFIED). Both values compile. What can check it is a text guard of the `AndroidDpTokenReads.test.ts` kind, or a Compose test asserting the size. The record also says A3 follows F-3 (the 44dp stays until the checkbox's rendering or contracts change) and may be re-dispositioned by Peter, so it is a design disposition before it is an instrument question. It belongs with the items that need another instrument.
7. **A5 and A7 are compile-checkable only through the pin and a warning policy.** `rememberRipple` is imported in four files and called at three: Button-Icon L245, Input-Checkbox-Base L471, Input-Radio-Base L424; Button-VerticalList-Item L38 is a dead import (VERIFIED: re-grepped today). I recall `rememberRipple` being deprecated at WARNING level when `ripple()` arrived (REASONING, from training data; verify against the pinned version). A warning compiles, so the old form would pass the harness and the fix would be invisible. For A5/A7 to be compile evidence, the harness needs either a pinned version where the deprecation is an ERROR, or a targeted warnings-as-errors rule. Warnings-as-errors for everything would trip on every other deprecation. That is a harness design choice for the tasks round, not an outline gate; § 4 only needs "the pin and the warning policy decide" instead of "need a Compose version that has `ripple`".
8. **A byproduct of A5/A7: the pin sets a Compose floor.** Components that call `ripple()` need a Compose version that has it. The harness pin and A5 together become the first de facto Android constraint on the component source, while Core Goals says "Android: Not yet constrained". See item 15.
9. **"Screen-reader behaviour stays with the platform seats" is right for what TalkBack speaks, and too broad for what we set.** `stateDescription`, `contentDescription`, `role` and key handling are semantics we set, and a Compose semantics test (`createComposeRule`, which the two existing `*Test.kt` files already use) can assert them. A1 (hard-coded English `stateDescription`), A2 (the hint appended to `contentDescription`) and A4 (key handling) are partly assertable that way. That is a test run, not a compile: a third rung above the two Q5 rungs (item 3). I do not propose building it now. I propose § 4 not say behaviour is wholly out of reach of an instrument, because Stacy's CLOSEOUT claims are decidable only if the instrument is named. One open item of mine lands here: whether Compose `clickable` activates on Space (ballot § 3 item 3, assigned to me). I believe recent foundation versions handle it, but that is from training data and UNVERIFIED; a `performKeyInput` test would settle it, a compile never will.
10. **Rows with an Android part that no compile lane accepts**, so "Each row's acceptance is the harness" is not true as written for them:
    - **Row 8's `radius_half = 50.dp`** compiles and is wrong (a 50 percent radius emitted as 50 dp; the record's section 3; I reviewed this kind). The fix is a decision about what a "half" radius is on Android, not a compile fix.
    - **Row 14's A1 to A4.** Item 9.
    - Stacy's R1 point (rows name an instrument that is "build, fold or drop at the tasks round") applies to these directly. Naming the exceptions in § 4 resolves it for Android.

**C. The Android rows** → design-outline.md § 3

11. **Rows 6, 7 and 8: right, with additions.**
    - **Row 6** (no import block): correct. `AndroidFormatGenerator.ts` emits no import line. The import list must be computed from the types emitted: `dp` (65 uses), `sp` if I-2 lands as `TextUnit`, and the colour import per row 4's colour decision. `ComponentTokens.android.kt` has the same gap (0 imports, 4 `.dp`). The product emitter already emits `import androidx.compose.ui.unit.dp` conditionally (`KotlinEmitter.ts` L28 to L32, VERIFIED), which is the pattern. So row 6 couples to I-2 and row 4: one PR, or an agreed order.
    - **Row 7** (section-comment bare text): correct. The generator still builds `'PRIMITIVE TOKENS\n    Mathematical foundation'` at `AndroidFormatGenerator.ts` L534 and L535 (VERIFIED in this tree), and a bare identifier sequence in an object body does not parse under any Kotlin compiler.
    - **Row 8**: Android's part is `radius_half` (item 10) and the `Int` font weights. The record says `Int` compiles and that the right type for Compose (`FontWeight` is a class) is "a platform-value question for Spec 129". The outline does not carry that question. See item 12.
12. **Add to § 5.3: Android per-family type decisions beside I-2.** I-2 (`fontSize`), `fontWeight` (`Int` or Compose's `FontWeight`) and a percent radius (Dp cannot carry it; Compose has `RoundedCornerShape(percent: Int)` and the file uses `radius_max = 9999.dp` as a pill workaround) are one table, `getKotlinType` (L151 to L173). Ada's note says the table is still moving. Settling them as one decision avoids three passes through the same function and the guideline change. This is a pointer to Ada's table, not a decision of mine.
13. **I-2, the `fontSize` type: my consult read.** (Ada decides; this is the "Data consulted" input; I do not decide it.)
    - **Rule out `Dp`.** A `Dp` does not follow the user's font-size setting; `sp` does, and WCAG 1.4.4 plus Android's font scale are why text sizes use it. The components' own comments state the intent: `font_size_050` is annotated `// 13sp` (`BadgeCountBase.android.kt` L153, VERIFIED).
    - **Float or `TextUnit`: both defensible.** `TextUnit` is the platform's type, makes a wrong-unit read unwritable, and turns `lineHeight = (font_size * line_height).sp` (VERIFIED at `ChipBase.android.kt` L260) into `font_size * line_height`. I lean `TextUnit` with Ada, on the same principle that moves sizing to `Dp` in I-1: the generator emits the Compose type for the value.
    - **Counter-argument, and what survives.** `Float` is the smallest component diff: Lina's groups B and C compile as written, and her planned extension of `AndroidDpTokenReads.test.ts` to `fontSize` would guard a stray `.dp`. `Float` also matches the numbers iOS and web carry. Folded in: I would not call `TextUnit` right on cost alone. What survives is a fork between a type wall (`TextUnit`) and the smallest diff (`Float`), plus one cost I want visible: **the six badge `minWidth = (font_size * line_height).dp` sites** (`BadgeCountBase.android.kt` L158 and its siblings, 3 + 3 in the record's group B) cannot call `.dp` on a `TextUnit`; they need a deliberate unwrap, and whether a badge minimum should scale with font size is a design call, not a type call. The pick is Ada's, not mine.

**D. Missing on the Android side** → design-outline.md § 4, § 5.3

14. **Item (i) on Android has runtime choices a compile does not show.** The emitted `CompositionLocal` needs a default and a kind (`compositionLocalOf` or `staticCompositionLocalOf`). If its default is an `error(...)`, 25 component files that read `LocalDPTheme.current` (VERIFIED: 25) compile and then crash where no provider exists. 21 component files import `androidx.compose.ui.tooling` (VERIFIED: 21), so `@Preview` functions run without a provider. Default to a light theme instance, or error, is a design-round question; the harness cannot see it. Also: product-token theme getters are `@Composable @ReadOnlyComposable` and read `Local{Abbreviation}Theme.current`, so **the `ProductTokens` lane cannot compile until item (i) emits the theme**. That orders the tasks: product tokens after theme emission.
15. **The outline has no home for the harness's toolchain pins.** Q8 as this outline had it was "a Spec 123 amendment", and its removal is right (release 3 has shipped). There is no Android-minimum question in the outline, and I think none belongs at the gate. But the host lane needs a number: my entry took `compileSdk 34`, `minSdk 24` provisionally from `ConfigHelpers`' defaults, floor 21. Core Goals says "Android: Not yet constrained". Two lines for § 4: (a) the harness's SDK and toolchain pins (Kotlin, Compose BOM, AGP, `compileSdk`, `minSdk`) are **harness pins, not the platform minimum**; (b) if 129 wants a minimum, Peter rules it, and A5 (item 8) means the pin will lean on one whether or not he does.
16. **The harness's file scope and input are unstated.** § 4 does not say what the harness compiles. My entry's answer: the 43 packed Kotlin files (the 39 component files plus `MotionTokens.kt`, `ThemeAwareBlendUtilities.android.kt` and the two `dist` token files) **plus the consumer-generated output from a packed install** (`npm pack`, a scratch consumer, `init`, `generate`), never in-repo `dist/`. The two `*Test.kt` files are not packed (my entry's count: 41 Kotlin files in the tree, 39 packed; I re-verified 39 non-test today), so a host test source set reads them from the repo. That input choice ties to item (iii) (retiring the root native files) and item (iv) (`init` runs `generate`): if (iii) removes `dist/DesignTokens.android.kt` from the package, only the consumer-output input remains.
17. **The harness builder's grant is a separate grant from Q14.** My entry (row 5) lists what the builder needs: `harness/android/**`, a new workflow file, and the shared pack, init, generate driver under `scripts/`. Those paths are outside my standing scope and outside Thurgood's CI-regime standing scope; a `.github/**` grant carries the excluded acts unless admitted (README rule 8). Q14 names only `src/build/product/**`. Suggest the tasks row for the harness carries the same grant mechanism, and that Q14's wording ("every path a row touches outside standing scope", as [ADA R1] suggests) covers it. This does not change what is built; it is named so it is not first noticed at execution.
18. **Q13 on Android, one fact for the design round** (not a pick). Option (a), a theme that carries every semantic colour: the index has 62 colour semantics (VERIFIED: 62), well under the JVM's 255-parameter limit, so (a) is not blocked by it. Its Android cost is the constructor signature: every added colour changes it, which breaks any hand-written theme instance. Generated instances are unaffected. Option (b), re-pointing static reads to `DesignTokens.<name>`, is a mechanical rename on Android: the Kotlin names carry no prefix (`color_progress_pending_background`, VERIFIED through the application MCP; `themeVarying: false`), and the components already import `DesignTokens`. Row 16's Android reads (L91, L121, L160, VERIFIED) would read `DesignTokens.color_progress_*` under (b) and `theme.color_progress_*` under (a).
19. **Row 4's colour decision has an Android option the outline does not list** (an input for Ada, not a pick). Compose has `ColorSpaces.Oklab` (REASONING, training data; verify the version). The generator could convert OKLCH to OKLab at generation time and emit `Color(l, a, b, 1f, ColorSpaces.Oklab)`, with no third-party dependency. That would remove both the colormath import and the INSTALL L172 consumer step, and it removes my entry's UNVERIFIED `colormath-ext-jetpack-compose` JVM-artifact question. Counter-argument that survives: it changes the shape of 99 colour sites and needs a check of out-of-gamut behaviour. Whether the colour dependency stays is intake Item 1's open decision; the requirements round settles it with Ada.

**Q5, for Peter's gate, Android only.** The wording asks Peter to choose a verb. On Android the choice is between a lane that covers the token files cheaply and a lane that covers everything, and a third rung (running semantics tests) exists beyond both. I recommend Q5's text carry items 1, 2 and 9. **Counter-argument against my own recommendation:** longer Q5 text at a gate Peter may read in minutes, in a round whose aim is thinning. **What survives:** if Q5 omits that the typecheck lane cannot reach Android components, Peter picks it believing the Android rows are accepted, and the rows then stay readings. I think that cost is the larger one. The wording is Thurgood's to weigh; the pick is Peter's.

**Cross-read against [KENYA R1]** (written after rebasing onto her entry; no @ mention to me in it). Three points where the platforms differ, so § 4 and Q5 do not treat them as one:
- **Two verdicts: Kenya's iOS reporting split is structural on Android, not optional.** Her typecheck can take the 43 Swift files in one `-wmo` pass and report tokens-only and tokens-plus-components separately. My JVM lane cannot take the components at all (item 1), so Android's "tokens-only" verdict exists without any reporting choice, and its component verdict exists only in the host lane. Android's measuring lane therefore starts as two different instruments, and Q5's "same choice made twice" is two different costs per platform.
- **Row 9 has no Android twin** (reading: Kotlin members are public by default, and `object DesignTokens` declares none otherwise; I did not compile it). Her module-topology point does not carry over, so the Android harness needs no separate-module probe for it.
- **Her OKLCH fork couples to Q5 on Android too, and my item 19 is the Android counterpart:** a colour dependency forces the JVM lane to resolve a third-party jar (or fall to the host lane), native colour construction keeps the lane dependency-free. One decision for Ada across both platforms, not two. Also from her entry: Android needs no new runner class (CI is ubuntu-only and the SDK is preinstalled on those images, REASONING), so the per-place split costs less on Android than on iOS; the cost she names (a macOS runner) is iOS's alone.

**Open for Peter**: none from me beyond Q5 and Q14 as the outline carries them.

#### [THURGOOD R2]
Read all six R1 entries in full, at `38513c7b2`. Each item below is marked changed or declined; declines carry their reasons.

**Answering my @ mention first.** [@THURGOOD] from [KENYA R1]: should the Q5 wording changes (row 9, the runner class) go into § 5.1 before Peter reads it, and does "what is the iOS target" sit at the gate or in the design round?
- **Both wording changes are in.** Option A builds the iOS tokens as their own module so that row 9 shows, and "Common to every option" names the macOS runner as a new runner class.
- **"What is the target" is at the gate, inside Q5, as option C.** It changes what is built: a package-shaped distribution, row 9's `public`, and where Q12's protocol lives. It is also the same axis as Data's point, *which files are proven*. So it does not stand as a separate question beside Q5; it is part of Q5's answer.

**[STACY R1]**
- *Changed.* Either option is checkable only as a CI context on the unit PR. This is now "Common to every option" in Q5 and the second bullet of § 4, "Acceptance and its instrument".
- *Changed.* The instrument is resolved by the requirements round, not left to the tasks round. § 4 says so, and row 23 now reads "The requirements round names it (Q5); the tasks round declares its build unit". The harness record's Trigger stays at `tasks.md`, which is that record's own close event.

**[LEONARDO R1]**
- *Changed.* Q3 is split into Q3a (the source of the theme tier) and Q3b (selector scope).
- **Q3b's route.** It changes what the web generator builds, so it goes to Peter as a fork, but not at this gate. His entry says a browser check must come first, so the fork goes to Peter with its evidence in hand. Q3b says so.
- *Changed.* § 5.3 now says Q12 binds 128 fully and Q13 binds only the access form. His design read on Q12 (a) is added, labelled as his.
- **The 128 pointer: recorded as owed, not added to #643.** I write it in 128's outline in the first 128 edit after this PR merges, with this PR's squash SHA, in his words: "Q12 and Q13 are decided in 129's design round; 128 inherits the ruling and does not re-sit it", marked "pending 129's round". Two reasons:
  - Written on #643's branch now, it would point at question numbers in an outline that is not merged and could still change.
  - It would tie #643's merge order to this PR's, which is the lock-conflict pattern.

  The trigger is this PR's merge. The owner is Thurgood.

**[LINA R1]**
- *Changed (edit 1).* § 4, "Item (i)'s starting point":
  - The theme key is never generated (L1044, no non-test caller).
  - 27 iOS reads in 26 files, 9 without the backslash; 25 Android files.
  - #641 is marked OPEN: the outline assumes it merges first, and says that otherwise the nine spellings become part of item (i).
  - **Kenya's point is no longer RELAYED.** Her R1 measured it with `swiftc` (the backslash form fails to type-check while the key is undefined), so it is cited to her entry as VERIFIED.
- *Changed (edit 2).* Q13's costs are back for both options, with your file counts. Data's Android facts are added beside them.
- *Changed (edit 3).* Row 15 carries your re-rule act.
- *Changed (edit 4).* Row 14's "Proposed under" no longer says "tied to the harness unit". Per Data R1 item 6 it reads: A5 and A7 by the pinned harness; A3 by a guard, after its F-3 disposition; I1–I3, A1, A2 and A4 by a seat's read.
- *Changed (edit 5).* The guideline line reads "Lina drafts, Peter approves under the ballot-measure model, and the change is applied in that PR".
- *Changed.* The guard line now says it guards only once item (i) emits and Q13 defines what "declared" means. Your surviving argument outweighs the extra clause.
- *Changed.* Your R1 note on row 18 (R1 is a `src/cli/sync/**` change) is in § 4, "Write scope the rows need". That path is in Ada's standing scope, so a grant to you names Ada as consulted.
- **L816**: noted; § 4 says you land it before the harness unit.

**[ADA R1]**
- *Changed (check 5, Q14's width).* Every path the rows touch outside standing scope is now listed by row in § 4. I confirmed your reading against `canonical/agents/ada.md` `writeScope`: `src/providers/**`, `src/build/**`, `src/config/**` and `src/integration/**` are absent from it. Data's harness-builder paths are added there too.
- **Q14 leaves the gate.** Your fork was the gate versus the tasks round, and you agree Q14 changes nothing that is built. The orchestrator's rule for this gate decides it: put only the questions that change what is built to Peter. That rule comes from the lesson of 2026-10-20, when Peter stopped the 128 sitting. So I am applying a rule, not picking a side of your fork. The tasks-row grant is the existing mechanism, and the list is written now so that it is not first noticed at execution. Peter may still name the paths first; § 4 says so.
- *Changed.* "Finds every defect class" is gone. Option A now says it finds the Swift parse and type defects recorded in the token files, and that Android is a reading until a Kotlin compile runs.
- *Changed (check 6).* Q11 cites your 2026-11-04 inbound § 3, last bullet, and carries the consequence: the CHANGELOG limitation is rewritten, not removed.
- *Changed.* § 1, Inputs, names both superseded files for the detail that still holds there.
- *Declined (check 4, optional).* Lina's R1 counter in Q6 ("R1's home has no date until this spec's trigger fires") is not added. The round is open now, so the trigger has fired, and row 18 forces a disposition at requirements.
- *Noted.* Your caution on thinning (judge by restated facts, not word count) is taken into the bar below.

**[KENYA R1]**
- *Changed.* Your four harness refinements are in § 4, "The harness, whichever option Q5 picks": the pinned toolchain; a packed-install input, not `dist/`; two verdicts; and `*Tests.swift` in a host lane only. So is "measuring lane first, with a pinned shrinking list".
- *Changed.* Row 9's module topology is in Q5 option A and in § 4.
- *Changed.* The OKLCH dependency or native-literals fork is added to § 5.3 as "Native colour construction" (rows 4 and 11), with Data's `ColorSpaces.Oklab` counterpart and the coupling to Q5. **Left as a design-round fork for Ada, not put to Peter.** Both of you framed it so, and Q5's options do not depend on its answer; only the cost of a typecheck lane does.
- *Changed.* Your Q12 feasibility read is in Q12: (a) changes Spec 094's behaviour, and (b) collapses on iOS.
- *Changed.* Your row 5 concern is now a § 5.3 item, and row 5's "129's part" points to it.
- *Changed.* Your charter re-confirm is in § 4's coupling list as charter text, Peter-merged.
- **On your I1–I3 offer.** Yes, if your rulings are ready before the requirements commit: appending them to the record lets row 14 read as decided. Not required; the record already routes them to the component PR.
- Your directed questions to Ada and Lina are theirs to answer.

**[DATA R1]**
- *Changed (items 1, 2 and 9).* Q5 now turns on which files each option proves. Option A states the Android component reach (13 and 25 of 39). The host lane is "a Gradle library module, not an app". The semantics-test rung is in § 4 as a third rung that no option builds.
- *Changed.* "Android is CI-only from day one" is in Q5's "Common to every option".
- *Changed.* § 4 now carries: A3 moved off compile-checkable (item 6); A5 and A7 need the pin plus a warning policy (item 7); the Compose-floor byproduct and "pins are not the platform minimum" (items 8 and 15); row 8's `radius_half` compiles and is wrong (item 10); layered first runs, with the first task "make it parse" (item 5); the product-token lane follows item (i) (item 14); and the harness input and file scope (item 16).
- *Changed.* Row 6's import list couples to I-2 and row 4 (item 11), in § 4's coupling list.
- *Changed.* The per-family Kotlin types are one table in § 5.3 (item 12), with your I-2 consult read: rule out `Dp`; `TextUnit` versus `Float` is a fork; and the badge `minWidth` sites (item 13). The pick is Ada's.
- *Changed.* The `CompositionLocal` default and kind are in § 5.3 (item 14).
- *Changed.* The builder's grant is in § 4, "Write scope the rows need" (item 17), which is the widened Q14 Ada asked for.
- *Changed.* The Q13 Android facts are in Q13 (item 18), and `ColorSpaces.Oklab` is under "Native colour construction" (item 19).
- **Declined.** The 62-semantics-under-255 fact (item 18) is not carried, since it rules nothing out. The verbatim counts behind items 6 and 7 stay in your entry; the outline cites it.

**Peter's at-gate list, final: one question.**
- **Q5. What must 129 prove compiles, and how?** Options: A, the token files by typecheck lanes; B, plus component source by in-repo host lanes; C, plus components that reach a consumer from the package. It is his because the harness, the CI runner class, the CHANGELOG's promise, and whether the component rows are accepted at all all follow from it. It is reframed in his brief shape: problem, options, risks and opportunities by platform, and prevention.
- **Off the gate, with reasons:**
  - Q14 changes nothing that is built (above).
  - Q3b waits for its browser check.
  - Q7 is conditional, and Q5's option C is the likeliest way it fires.
  - The design-round forks (Q12, Q13, the Kotlin type table, colour construction) are seat decisions.
  - Q10 is the requirements round's to put to Peter.

**Thinning bar, after the fold.**
- **Word count**: `design-outline.md` is **2,676 words at `bc38b8302`, 2,674 after the R1 draft, and 4,494 after this fold. That is +1,818 net, and the outline is now much longer.**
- **Fact sentences deleted in favour of the facts file**: the same ~580 words listed in `[THURGOOD R1]`. This fold deleted no further fact sentences.
- **What the fold added**: design content the six reviews showed was missing or wrong. That covers Q5's three options, the harness's limits and pins, eight new design-round items, and the write-scope list. It also includes reviewers' measured counts (for example 27/26/9, 25, 13 of 39, 21, about 173 in about 37 files), which the facts file does not print and which will drift.
- **On Ada's measure (restated facts, not words)**: the restated-fact load went up, not down.
- **Root records on this branch: net +1** (Lina's `2026-11-04-progress-bar-native-theme-reads-malformed.md`).

**Counter-argument, worked against this fold.**
- **The objection**: the outline grew by two-thirds in a round whose aim was thinning. Much of what was added (harness pins, test layers, write-scope paths) is tasks-round material.
- **Folded in**: where an entry already holds the detail, the outline cites the entry (Data's verbatim counts, Ada's Q6 lean). Q14 and Q3b left the gate, so Peter reads one question, not two.
- **What survives**: § 4's harness and write-scope blocks could have stayed in the feedback entries until the tasks round. I kept them in the outline because Stacy's point moves the instrument to the requirements round, and because a fact that lives only in a feedback entry is not read when the requirements are written. That is a judgment, not a rule. Whether outlines should carry this kind of material is the evidence Spec 131's step-2 measure needs. This entry gives the numbers, not a verdict.

### Q5 recommendation round (2026-11-04/05)

**Holder's note** (Thurgood). This section records a round on outline § 5.1 "Q5. What must 129 prove compiles, and how?" Peter opened it with these words, received 2026-11-04 by orchestrator relay: "Re: 3, let's do a round". He had been offered: "Q5 on 129. Rule it from the table, or ask for a round where the seats each argue for an option." Each seat picked an answer and argued it, so Peter can rule from argued recommendations, not a neutral table. The round had two passes, and each entry below is spliced byte for byte from the seat's own file; I changed nothing in them.

- **Round 1 (blind)**, brief `evidence/2026-11-04-q5-round-briefs/brief.md`: each seat gives a pick, the reasons from its domain, the cost, a fold-back with the surviving residual, and what would change its mind. Entries: Kenya R2, Data R2, Lina R2, Ada R2, Stacy R2, Thurgood R3, Leonardo R2.
- **Cross-read**, brief `evidence/2026-11-04-q5-round-briefs/brief-r2.md`: each seat read all seven round-1 entries, answered the directed questions, and said whether its pick held. Entries: Kenya R3, Data R3, Lina R3, Ada R3, Stacy R3, Thurgood R4, Leonardo R3.

No ruling is recorded here. Q5 stays open for Peter. The native plan and the order consult that followed the round are recorded under `evidence/2026-11-05-native-plan/`.

#### [KENYA R2] — Q5 recommendation round

Read on `origin/main` at `da128281d`. Labels: **VERIFIED** = I ran it today (2026-11-04) on this machine: Apple Swift 6.2, Xcode 26.0.1 (17A400), `iPhoneSimulator26.0.sdk`, target `arm64-apple-ios17.0-simulator`. **UNVERIFIED** = reasoning or training data. Every experiment ran in scratch, against a real consumer install: `npm install @3fn/core@16.2.0` (the released package), then `npx designerpunk init --name Probe --abbreviation pb`, then `npx designerpunk generate`. That output is what a consumer compiles. Nothing ran in the repo.

**1. Pick**: **B's reach on both platforms, without running tests.** Both platforms prove that the token files and the component source compile, and report the two results separately. The tool on each platform is the cheapest one that reaches the components:
- **iOS**: a two-module `swiftc` build (`-wmo -c`, which produces object code). There is no Swift package and no simulator.
- **Android**: Data's Gradle library module with the Compose plugin.

Both start as measuring lanes. Running the tests (iOS XCTest, Android Compose tests) and option C's distribution are left out of 129.

**2. Why (iOS)**

- **On iOS, option A's cheap tool already reaches the components, so A versus B is the wrong cut.** iOS's cheap tool, plain `swiftc`, can compile the components as well as the tokens. Android's cheap JVM lane cannot (Data R1 item 1).
  - The Apple SDK provides SwiftUI and UIKit to plain `swiftc`, so the 41 Swift source files in the package need no Swift package to build.
  - VERIFIED: compiling the consumer's generated `DesignTokens.ios.swift` and `ComponentTokens.ios.swift` with all 41 packed source files, as one module, took **24.9 s**. It reported **407 distinct errors**: **207 in the token tier** and **200 in the component tier, across 32 files**.
  - The token files alone take **0.43 s**.
  - So on iOS, covering the components adds about 25 seconds, with no new infrastructure.
  - Limiting iOS to the token files would leave rows 12, 15 and 16 unproven on iOS to save 25 seconds. I do not think that trade is worth making.

- **A plain `-typecheck` misses errors that a real build rejects. The lane must compile, not only typecheck.** This corrects my own R1 command and option A's iOS text.
  - VERIFIED with a two-function file: one function has a missing `return`, the other reads a constant before it is set.
  - `swiftc -typecheck` exits 0 on it.
  - `swiftc -emit-module -wmo` and `swiftc -c -wmo` both reject it (`missing return in global function`, `constant 'x' used before being initialized`).
  - Those checks run after typechecking, so a typecheck lane can be green on code that Xcode refuses to build.
  - So the iOS lane compiles to object code. Then only linking and running remain unproven.
  - The CHANGELOG can then truthfully say "compiles".

- **The module topology for row 9 applies to every option, including B with XCTest.**
  - Row 9, measured on the 16.2.0 consumer output (VERIFIED):
    - I first made the file build as its own module, with stand-ins for the undefined `Color.oklch` and `Typography`.
    - A second module that reads every member got **98** "`… is inaccessible due to 'internal' protection level`" errors.
    - The same reads inside one module got **0**.
    - The record counts 105. My patch blanked 7 internal lines that had other errors, so 98 is a floor, not a correction.
  - **New, VERIFIED, with a toy Swift package**: an XCTest target that uses `@testable import` reads `internal` members without error. A plain `import` target fails on the same line.
    - Both shipped iOS test files use `@testable import DesignerPunk`, so they can never catch row 9.
    - B catches row 9 only if it also adds a plain-import consumer target.
    - So the topology work is needed whichever option is picked. It is not a reason to prefer B.
  - My topology, which replaces R1's "tokens as their own module":
    - module 1, named `DesignerPunk`, holds the tokens and the components, built with `-enable-testing` so that the two test files type-check against it;
    - module 2 is a small probe file that does a plain `import`.

- **What each iOS tool proves, in plain terms** (all VERIFIED unless labelled):

  | | A, iOS as written (`swiftc` over the token files) | My iOS lane (two-module `swiftc -c`) | B, iOS (Swift package + `xcodebuild` + XCTest) |
  |---|---|---|---|
  | Token files parse and type-check against the iOS 17.0 SDK | yes | yes | yes |
  | Compile-stage errors (missing return, use before init) | no, if `-typecheck` | yes | yes |
  | iOS 17 floor: an API newer than 17 is rejected (checked: `MeshGradient`, iOS 18) | yes | yes | yes |
  | Row 9 (access from another module) | only with a probe module | yes (probe) | only with a plain-import target |
  | The 39 components compile | no | yes | yes |
  | The two test files (87 `func test…`) compile | no | yes | yes |
  | The 87 tests run | no | no | yes, but on an iOS **26.x** simulator. The `macos-26` image has no iOS 17 runtime |
  | Linking, the Swift package manifest, dependency resolution | no | no | yes |
  | Anything on screen, or VoiceOver | no | no | no |

  - The one thing my lane gives up against B is linking and package resolution.
  - If the generator emits native colour values (row 4, still open for Ada), the generated output has no third-party dependency and only Apple frameworks link. Then that gap is small (UNVERIFIED that no link-time-only defect exists, but none is on record).
  - If the generator takes a colour dependency instead, the gap is large. See § 5.

- **Should iOS and Android get the same option? The same reach, but not the same tool.**
  - The rows a compile can accept are the same on both platforms: the token rows, plus rows 12, 15 and 16 on the component side.
  - Giving both platforms B's reach means a green result accepts the same rows on both. A Q5 answer that left the component rows unproven on one platform only would make "129 is accepted" mean different things per platform. I would not want that in a CHANGELOG line.
  - The tools differ because the toolchains differ. On Android, the only tool that reaches the components is the library module (Data R1 item 1). On iOS, `swiftc` reaches them.
  - Test runs are left out on both platforms. That is not symmetry for its own sake: running tests checks behaviour, which is a third rung, and Q5 asks what compiles.

- **The macOS runner.**
  - VERIFIED (GitHub's billing docs, fetched today): standard GitHub-hosted runners are free in public repositories, and larger runners are billed.
    - That confirms the orchestrator's UNVERIFIED premise.
    - `macos-26` and `macos-15` (arm64) are standard runner labels; the `-large` and `-xlarge` labels are the billed ones (`actions/runner-images` README).
    - So my pick does not depend on billing. If the repo went private, the hand-off below keeps the macOS minutes small.
  - VERIFIED (the `macos-26` arm64 image, version 20261026): it ships **Xcode 26.0.1 (17A400)**, the same build as my machine, beside 26.6 (the default). It has iPhone 17 simulators on iOS 26.2, 26.4 and 26.5.
    - So the CI pin can match my local runs exactly today.
  - **Pin risk, VERIFIED** (the same README): "when a new patch version is released, the previous patch version will be replaced."
    - A pinned Xcode patch version will be removed from the image at some point, so the pin moves when GitHub forces it.
    - The lane pins the Xcode version through `DEVELOPER_DIR` (not the image default) and handles a forced bump in a PR of its own.
  - **Hand-off.** The pack, install, init and generate steps already run on ubuntu in `consumer-guard.yml`, through `npm run test:consumer`.
    - Its recent runs took **1.9–3.2 min** wall (VERIFIED, from the last 10 successful runs via GitHub's public API).
    - The ubuntu job can upload the generated output and the packed Swift files as an artifact. The macOS job then only downloads them and compiles.
    - Whether `test:consumer` keeps its scratch consumer around for upload is UNVERIFIED.

**3. Cost**

- **Runner class**: one standard macOS job (`macos-26`), free on this public repo. Android needs no new runner class (Data).
- **Run time, iOS**: about 25 s for the compile itself, measured as a typecheck. Object code adds some time, UNVERIFIED how much. Add macOS job start-up and the artifact download.
  - UNVERIFIED: macOS queue time on hosted runners. On a busy day, queue time could exceed the compile time.
  - The ubuntu part takes the 2–3 min it already does.
- **Sessions, iOS**: **about 1** (estimate). It covers:
  - the macOS job;
  - the two-module compile script;
  - the probe-file generator;
  - two verdicts;
  - a pinned expected-failure list, keyed by diagnostic, that shrinks as rows land;
  - a "would it have caught this" check against each defect record.
- **My two-session host estimate** (Swift package + `xcodebuild` + XCTest) still stands for B.
  - The toy package de-risks its first session. On Xcode 26.0.1, `xcodebuild` opened a bare `Package.swift` directly, built it in 9.2 s, and ran a one-test XCTest target on an iPhone 17 simulator in 8.5–13.0 s, cold boot included. A deliberately failing test exited 65 with `** TEST FAILED **`.
  - These are local numbers. A clean CI runner will be slower (UNVERIFIED by how much).
  - B costs about one session more than my pick, and that session buys the link, the package manifest and the 87 test results.
- **What must land first**: for the measuring lane, nothing but the tasks-row grant (`harness/**`, a new workflow file, the shared driver under `scripts/`). It measures today's failures as they are.
  - A fixture product token is also needed: my scratch consumer generated no `ProductTokens.ios.swift`, because it has no product tokens.
- **What it stays red on**:
  - **The token verdict** until these land:
    - row 4: colour construction, and the undefined `Typography`;
    - rows 5 and 8;
    - row 9, through the probe;
    - rows 10 and 11: the shadow colours;
    - row 3: `ComponentTokens`.
  - **The component verdict** until these land:
    - item (i): the theme and its key, with #641's spelling;
    - Q13's static colour reads;
    - row 15's `ContainerCardBase` L816;
    - row 16;
    - the `AvatarTokens` and `BadgeLabelBaseTokens` redeclarations (R1, evaluation entry);
    - the rest of the 200.

**4. Fold-back**

- **Strongest counter-argument**: the charter says compiling is "established by a platform build". To an iOS developer, a platform build means `xcodebuild` producing a linked product, not a compiler call. Read that way, my pick is a cheaper instrument wearing B's name, and the CHANGELOG would promise more than it proves.
- **What it changed**:
  - I switched the lane from `-typecheck` to `-wmo -c`, so it is the compiler's full build up to the link step. The missing-return and use-before-init check above is why that matters.
  - I tied the CHANGELOG wording to the instrument: "the token files and component source compile for iOS 17 and Android; no app is linked and no tests are run."
  - I made row 4 the switch that moves iOS to B (§ 5).
- **The residual that survives**:
  - Linking, the Swift package manifest and dependency resolution stay unproven on iOS until a consumer builds a package. With native colour values that is a small residual; with a colour dependency it is not.
  - The 87 XCTest cases, the only native tests iOS has, stay unrun through 129, even though the runner already has simulators and the toy run took seconds.
- **A fork the counter-argument exposes. Peter's pick, not mine:**
  - **(x) No test runs on either platform in 129.** This is my pick, and the reason is that Q5 is about compiling. Running the 87 XCTest cases is filed as a follow-up whose trigger is "the component verdict is green".
  - **(y) iOS also runs its 87 XCTest cases in 129**, at about one session more. It is cheap on iOS because the simulators are already on the image. Android's equivalent needs an emulator or Robolectric (Data R1 item 3).
  - Both are defensible. (y) buys real behaviour evidence on 2 of the 39 components, on iOS 26.x rather than the iOS 17 floor, and makes the platforms uneven.

**5. What would change my mind**: if Ada's row 4 decision is to **declare an OKLCH dependency** rather than emit native colour values, my iOS pick becomes B.
- Every iOS lane would then have to resolve and build that package before it could compile the tokens (R1, "a host build in all but name").
- Only a Swift package with `xcodebuild` proves the resolution and the link honestly.

**6. For other seats**

- **Lina, a finding**: in the 16.2.0 package, **17 of the 39 components' main views are `internal`**, among them `ButtonCTA`, `ButtonIcon`, `IconBase`, `ContainerCardBase`, the `InputText*` family and `ProgressBarBase` (VERIFIED by grep; 19 are `public`).
  - This is row 9's twin on the component tier: an app module cannot construct them when the components are built as a library.
  - My grep over `.kiro/issues/` found no record that carries it.
  - It matters only under option C, or if the probe module is meant to construct components.

- [@ADA] Row 4: is your lean to emit native colour values (Kotlin `ColorSpaces.Oklab`, an iOS native-literal form), or to declare a dependency? My iOS pick is the two-module `swiftc` build only if it is native values; with a dependency it is B. Can you state the lean before Peter rules Q5, even if the decision stays in the design round? -- [KENYA R2]
- [@DATA] My "same reach on both platforms" needs Android's 129 instrument to be your Gradle library module with the Compose plugin, not the JVM lane. Do you agree, and with the same split into a token verdict and a component verdict in the measuring lane? -- [KENYA R2]
- [@LINA] Is `internal` on those 17 component views deliberate, because they are reference source? If yes, the iOS probe module reads tokens only. If no, the probe also constructs each component, and the 17 become a record. -- [KENYA R2]

#### [DATA R2] — Q5 recommendation round

Read at `origin/main` `3375c2e79` (outline § 4 and § 5.1 unchanged from `9819f72ee`). Labels: **VERIFIED** = I ran it today; **REASONING** = inference or training data; **UNVERIFIED** = not checked.

**This round has a measurement R1 did not have.** I ran a Kotlin compiler on the Android output for the first time. The scratch probe is outside the repo, in `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/5572d8be-d5f0-4ae6-a8b3-cb3c3b8aceed/scratchpad/q5-round/data-work/`.
- **Probe pins** (my choices, not a proposal for the harness): Temurin JDK 17.0.21, Kotlin 2.4.21, Gradle 9.8.2, AGP 9.5.0, Compose BOM 2026.09.00, `compileSdk 36`, `minSdk 24`, colormath 3.7.1, coil 2.7.0, material-icons-extended 1.7.8.
- **Token input**: the consumer `generate` output tracked at `tests/onboarding-trio/fixtures/born-cc/design-tokens/` (15.1.0; it differs from in-repo `dist/DesignTokens.android.kt` only in its header line), plus `MotionTokens.kt` and `ThemeAwareBlendUtilities.android.kt`. It is not a fresh packed install.
- **Component input**: the 39 non-test component `.kt` files, plus the Icon-Base drawables.
- **One act to note**: I accepted the Android SDK licences inside a scratch SDK (`sdkmanager`, piped `yes`). The runner images ship with those licences already accepted.

1. **Pick**: **Option B on Android, built as one Gradle build with two Android library modules. `:tokens` is a gate as soon as the token rows land. `:components` stays a measuring lane with a pinned list of expected failures. No separate JVM (Option A) lane, no warnings-as-errors rule, and no semantics-test rung in 129.**

2. **Why** (Android)
   - **On Android, Option A is a subset of Option B. It is not a cheaper alternative.**
     - **Same errors.** The JVM lane (A) and the library module's token compile (B) report the same token-tier errors: 302 and 300 (VERIFIED). The token tier is `DesignTokens` 280, `ComponentTokens` 10 and `ThemeAwareBlendUtilities` 10.
     - **Same runner.** Both run on the ubuntu runners CI already uses.
       - VERIFIED from `actions/runner-images` main, Ubuntu 24.04 and 26.04 readmes: the Android SDK is preinstalled (platforms 34–37, build-tools 34–37, `ANDROID_HOME` set), with JDK 17 as the default, Kotlin 2.4.21 and Gradle 9.8.2.
       - So B's extra cost over A is the AGP and Compose downloads, which can be cached (about 274 MB of Gradle module cache in my probe). It is not a new runner class.
     - **Same time.** Compile time is seconds for both lanes, on my machine:
       - JVM token lane: 35 s, cold, including resolving plugins and dependencies.
       - Library token module: 13 s.
       - Tokens and components together: 12–17 s.

       CI wall time is unmeasured. Pack, init and generate will dominate it, as R1 said.
     - **B's `:tokens` task gives Option A's verdict.** So A plus B on Android is one instrument with two tasks, not two instruments to keep green. That removes the "two instruments per platform" risk the outline lists under B, for Android.
   - **Only B sees the component tier, and that tier is broken well beyond theme emission.**
     - **The numbers** (VERIFIED, under the probe pins above): compiling the components with the tokens gives **423 component errors in 30 of the 39 files**. Only **65** are direct reads of the missing theme (`theme`, `LocalDPTheme`, `DesignerPunkTheme`, the ProgressBar `…theme` reads). Nine files compile clean.
     - **The rest** are a sample, and I have not mapped them all to records:
       - a nested-comment parse error that never closes, `VisualStateStyles.kt` L586 (a `/*` inside a KDoc opens a nested comment in Kotlin);
       - an `import` after declarations, `TokenMapping.kt` L485. That file has 86 errors, including 27 reads of a `PaddingValue` type that nothing in `src/` defines;
       - `androidx.compose.material3.CompositionLocalProvider`, which does not exist. It gives the one "@Composable invocations can only happen from…" error, `IconBase.android.kt` L177. Only the Compose compiler plugin reports that error;
       - file-private `val`s read from other files (19, for example `ButtonCTA` reading `colorActionPrimary`);
       - conflicting declarations (6, `ContainerCardBase`);
       - 11 opt-in errors.
     - **Two caveats.** Some of the 423 may follow from the 300 token errors. A few classes came from my probe's setup, and I removed them: `R` and `BuildConfig` cleared once I added the drawables and turned on `buildConfig`.
     - **What a quick grep found**: no open record names the nested-comment, misplaced-import, cross-file-private or `CompositionLocalProvider` classes. That is a grep, not a mapping.
     - **What Option A would do with this**: leave all of it unseen. The CHANGELOG would then truthfully say "the token files type-check", while the components a reader opens next fail for reasons no one has written down.
   - **The JVM lane cannot reach the components honestly.**
     - **15 files need `android.jar`, not 13.** 13 import `android.*`, and 2 more use a fully qualified name: `AvatarPreview.kt` L1036 and `IconBase.android.kt` L114 (VERIFIED). That corrects R1: 9 files are free of both `android.*` and the theme, not 11.
     - **A JVM project gets stand-in jars.** On a JVM project, the androidx Compose dependencies resolve to `-jvmstubs` artifacts (VERIFIED in the Gradle cache). By their name they are stand-ins that only describe the API (REASONING that they throw if anything runs).
     - So stretching A to the components means hand-adding `android.jar` to a JVM classpath. That is Option B without AGP, and more fragile.
   - **A5/A7 need no warning policy. My R1 item 7 was wrong.**
     - `rememberRipple` (`androidx.compose.material.ripple`) is deprecated at `DeprecationLevel.ERROR`, not WARNING, in every `material-ripple` release from 1.7.0 through 1.12.1 (VERIFIED from the published source jars). BOM 2026.09.00 maps to 1.12.1.
     - The probe reports exactly 3 errors, at the three call sites: Button-Icon L245, Input-Checkbox-Base L471, Input-Radio-Base L424. The dead import in `VerticalListButtonItem` does not error (VERIFIED).
     - So **any pin from Compose 1.7 onward makes the old form a compile error.** Warnings should stay warnings; making every warning an error would trip on unrelated deprecations.
     - Two consequences:
       - (a) Today's component source does not compile under any Compose release since 1.7, which shipped in 2024 (REASONING on the date).
       - (b) The de facto Compose floor the pin sets is "1.7 or later". That matches what A5/A7's `ripple()` fix needs anyway.
     - § 4's line "compile evidence only if the pin and a warning policy make the old form fail" can become "compile evidence under any pin from Compose 1.7 on".
   - **Layered first runs are less of a risk than R1 said.** K2 reported 29 syntax errors and about 270 resolution and type errors in one pass on `DesignTokens.android.kt` (VERIFIED). The parse layer did not hide the rest. "First task: make the output parse" is still a sensible first task, but the harness no longer needs it as an ordering rule.
   - **The semantics-test rung needs B's module.**
     - Compose UI tests on the JVM would run through Robolectric in the library module's `src/test`, with `testDebugUnitTest`, on ubuntu and with no emulator. REASONING: I did not run it, because the components do not compile yet.
     - A's stand-in jars cannot run a composable (REASONING). So A closes off the rung and B leaves it open.
     - I would not build the rung in 129: A1, A2 and A4 are not 129's acceptance, and the rung cannot run before `:components` is green. It should be named as the next instrument after 129, not as part of it.
   - **Should Android and iOS get the same option?** Same letter, for different reasons, and my Android pick does not depend on iOS.
     - On Android, B costs about the same as A, so the choice is easy.
     - On iOS, A and B both need the macOS runner, but B adds a host module, a simulator and Kenya's two sessions. That is a real difference, and it is Kenya's to weigh.
     - If iOS picks A, the CHANGELOG states the proof per platform. That is acceptable, and more accurate than one verb for all three.
     - Billing for macOS (unverified, and likely moot for a public repository) does not touch Android at all.
   - **Why not C on Android.** B's library module already has the shape a Gradle source module would have, so C is a later and smaller step from B (REASONING; not tried). But C decides how the components are distributed. It would also make I-1 (`Float` to `Dp`) a break for a supported consumer, so Q7 fires and 129 waits on 17.0.0. Neither belongs in this spec.

3. **Cost**
   - **Runner**: the existing ubuntu runner class. **Pin the label** to `ubuntu-24.04` or `ubuntu-26.04`, not `ubuntu-latest`. The runner-images announcement says `ubuntu-latest` moves to 26.04 in November 2026, which is now (VERIFIED). This is the Android twin of Kenya's point about floating images. Both images carry the same SDK set (VERIFIED).
   - **Run time**: the Gradle part is about 15–35 s on my machine, warm to cold, with the module cache at about 274 MB. On CI, REASONING: under 2 minutes for Gradle with a cache, plus the shared pack, init and generate step, unmeasured.
   - **Sessions to build**: REASONING.
     - About one session for the Gradle build, the workflow and the expected-failure list. My probe's build files took minutes; the time goes to the CI wiring and the list format.
     - The shared pack/init/generate driver is one more piece, shared with iOS, whoever builds it.
   - **What must land first**:
     - For the lane to exist as a measuring lane: nothing.
     - For `:tokens` to go green: rows 5, 6, 7 and 8, row 3 (`BorderWidthTokens` and others), row 10 (the shadow names), the colour decision (rows 4 and 11), and I-2 if it changes the types emitted.
     - Until `:tokens` is green, `:components` reports "blocked by tokens". That is an honest verdict, not a red one.
   - **What it stays red on**: `:components`, until item (i), rows 12, 15 and 16, and the unrecorded classes above are fixed. That is the residual below.

4. **Fold-back**
   - **Strongest counter-argument**: Option B on Android turns up about 423 component errors, most of them outside 129's rows. Picking B therefore either makes 129 into a component-repair spec (Lina's sessions, at a size no one has estimated), or leaves 129 closing with a red lane that readers take as "129 failed". Option A keeps 129 to the scope it was chartered with.
   - **What it changed in my pick**:
     - The CLOSEOUT gate is `:tokens` green. `:components` closes as a measuring lane whose pinned list holds no entry from rows 12, 14 (A5/A7), 15 or 16, and does not grow.
     - Every other component error becomes one new record at the harness's first run, owned by Lina. 129 does not absorb it.
     - The CHANGELOG states both verdicts: "the token files compile; the component source compiles except for N pinned errors, recorded at <path>".
     - I also dropped the separate JVM lane and the warning policy (§ 2), which the counter-argument made me re-cost.
   - **The residual that survives**:
     - On Android, 129 will not deliver the charter's "compiling … target" for the components, and B makes that visible and permanent in CI. A hides the same gap.
     - So the choice is not "cost versus coverage". It is whether the gap is written down or found later by a consumer. The defects exist either way.
     - **A fork remains, and it is Peter's to pick**:
       - (i) 129's acceptance includes the Android components compiling clean, so 129 grows to absorb the repair;
       - (ii) 129 closes with the component list pinned and a new record for the rest.

       I lean (ii) to protect 129's scope and order (129 → 131 → 128 → 130). I do not pick it.

5. **What would change my mind**: a ruling that the Android component source is reference only, a surface no instrument accepts and no reader is pointed to. Then compiling it proves nothing anyone relies on, and Option A, the token tier on the same ubuntu runner, would be enough.

6. **For other seats**
   - [@LINA] My fold-back's CLOSEOUT shape assumes the component errors outside rows 12, 14, 15 and 16 become one new record of yours, not 129 rows. Do you read them that way? Or do any of them (the `VisualStateStyles.kt` nested comment, the `TokenMapping.kt` misplaced import and `PaddingValue`, the cross-file privates) belong in an existing row? → design-outline.md § 3, § 4 "The harness, whichever option Q5 picks" -- [DATA R2]

#### [LINA R2] — Q5 recommendation round

Read at `origin/main` `da128281d` (the outline § 4 and § 5.1, my R1, and Kenya's, Data's and Stacy's R1 entries). Labels: **VERIFIED** = I ran or read it today at that commit; **CARRIED** = from another seat's entry, not re-run by me; **REASONING** = inference, to be checked when the harness is built.

**1. Pick.** A named hybrid: **compile the component tier (B's reach), without B's test-run step, and gate it one tier at a time.** iOS: one macOS lane that type-checks the tokens as their own module and then the component source against that module. Android: one ubuntu lane, a Gradle library build with the Compose plugin, with the tokens and the components in separate modules. Both start as measuring lanes with a pinned list of known failures. The token verdict becomes a required gate first, and the component verdict after item (i) and the component PRs land. The harness consumer uses an abbreviation other than `DP`. Option C stays out of 129, filed as its own record with a trigger.

---

**2. Why, from the component tier**

**2a. Every component row needs a compile to be accepted, and on Android only a library build can do it.**

| Row | What is wrong | Accepted by | Under A |
|---|---|---|---|
| 12, group B (12 lines, 5 files) | `.sp`/`.dp` on a `Dp` fontSize | My guard `AndroidDpTokenReads.test.ts` pins it on both sides. A compile confirms the fix. | Guard only |
| 12, group C (26 sites, 10 files) | a `Dp` fontSize passed where a `Float` or `TextUnit` is expected | **A compile only.** The guard's header says it "cannot see group C". It would need the type of the parameter receiving the value. | A reading |
| 12, item 3 (`InputTextBase.android.kt`, 34 constants) | declarations with no value | A compile | A reading |
| 12, Button-CTA | bare `colorActionPrimary`, `colorBackground`, `colorContrastOnDark` that nothing declares | **A compile only.** These reads have no `theme.` in them, so no `theme.` guard can see them. | A reading |
| 14, A5 and A7 | `rememberRipple` (3 calls in 4 files) | A compile, if the pin turns that one deprecation into an error (Data R1 item 7) | A reading |
| 14, A1, A2, A4, A6 | semantics we set | A platform seat's read, or a later Compose semantics test. **No option accepts these.** | A reading under every option |
| 14, A3 | 44dp where Android asks for 48dp | A text guard, after its F-3 disposition. **No compile can catch it.** | Same under every option |
| 15, L816 | `ContainerCardBase.ios.swift`, a `/**` comment that never closes | `swiftc -parse` is enough. I land the one-line fix before the harness. | A reading |
| 15, theme names across consumers | components hard-code `dpTheme`, `LocalDPTheme` and `DesignerPunkTheme`; the emitter writes the consumer's names | **A compile in a consumer whose abbreviation is not `DP`.** In a `DP` consumer the defect cannot show (see 2c). | A reading |
| 16 (6 sites) | `ProgressBarTokens.theme.…`, `…intheme.…`, `ProgressBarTokenstheme.…` | **A compile only** (see 2b) | A reading |

**VERIFIED today**: of the 39 non-test Android component files, 11 neither import `android.*` nor read `LocalDPTheme`. That matches Data's split. **All 15 files behind rows 12 and 16 are among the other 28.** So Data's JVM lane cannot reach any Android component row, even after item (i) emits the theme. Those files still need Compose's Android artifacts (REASONING). On Android, option A accepts **none** of my rows.

On iOS, option A as written leaves out a cheap step. Kenya's measured pass covered the 43 non-test Swift files in **22.9 s, against 0.2 s for the token files alone** (CARRIED). It ran on the same macOS runner A already needs. So on iOS, the component tier costs about 23 seconds more than A, not B's host module and simulator. What B's host build adds on top is linking, package resolution, and running the two XCTest files. **No 129 row needs the XCTest files** (`Button-VerticalList-Item` and `-Set`; none of rows 12 to 16). Package resolution matters only if Ada's colour decision brings in a dependency (my question to her, item 6).

**2b. What my guards cover and what they do not.** One thing to correct before it is relied on: **the two-sided guard for item (i) does not exist yet.** It is proposed in my inbound § 3.5. Only the two Android guards exist (VERIFIED: `src/components/__tests__/` holds `AndroidDpTokenReads.test.ts` and `AndroidSizingDpReads.test.ts`, and no others for native).
- **`AndroidSizingDpReads`** covers I-1. If sizing is emitted as `Dp`, every interim `.dp` must go in the same PR. It proves nothing compiles.
- **`AndroidDpTokenReads`** covers group A (closed) and group B (pinned). It does not cover group C, item 3 or Button-CTA. A `TextUnit` fontSize is a shape it rejects until it is taught that shape.
- **The proposed item-(i) guard** would cover `theme.` reads against the theme members that are emitted. It would not cover:
  - **Row 16.** If the guard matches `theme.` only as a whole word, it never sees `ProgressBarTokenstheme.…`. If it also matches inside a word, it resolves the name after the dot, and under Q13 (a) that name is a real theme member, so the broken read passes.
  - **Button-CTA's bare reads.**
  - **Types.** It proves that names resolve, not that the code type-checks.
- **Retirement.** Both existing guards name their retirement as "the platform build-verification harness (Spec 129) gates Android compilation" (VERIFIED, `@retirementCriteria`). Under A, the components are never compiled, so neither guard can ever retire as written. Under my pick, both retire when the Android component verdict becomes a required gate. The item-(i) guard stays as the fast local check until then, because no seat's machine can build Android (Data R1).

**2c. The harness consumer's abbreviation decides whether row 15 can be seen.** This is the same kind of point Kenya made for row 9 (module layout). If the scratch consumer's config uses `DP`, the generated names match what the components hard-code, and Q12's defect compiles clean. The harness consumer must use another abbreviation (for example `ACME`). Then the harness proves whichever Q12 option is chosen. Under (a), the fixed names compile in any consumer. Under (b) or (c), the consumer's own names do. This costs nothing to set. It is easy to miss, because the repo's own build is `DP`.

**2d. Same-PR coupling: what each option puts on component PRs.** The outline (§ 4) lists four couplings. This is who enforces each:

| Coupling | A | My pick (and B) | C |
|---|---|---|---|
| I-1 with the 16 `.dp` sites | `AndroidSizingDpReads` | the guard, then the harness | as B |
| I-2 with groups B and C | B by the guard; **C by nothing** | the harness | as B |
| item (i) with item 3 and Button-CTA | **nothing** (the item-(i) guard does not see the bare reads) | the harness | as B |
| row 6's imports with I-2 and row 4 | the token lane | the token lane | as B |

- **Under A**, component PRs carry no harness burden. But two of the four couplings have no enforcement. A generator PR that moves fontSize to `TextUnit` could merge green while 26 group-C sites break. A reviewer would have to catch it by reading, and that is how these records came to exist.
- **Under my pick**, the burden is the pinned list. Each component PR that fixes a pinned failure removes its pin in the same PR, or the lane goes red. That is the rule my two guards already follow. A generator PR that changes an emitted type must either carry the component fix or add the new pins in view of the reviewer.
  - **Pin by file and kind of error, with counts**, the form `AndroidDpTokenReads` uses (`file → count`). Pins by line number would break on unrelated edits.
  - **Allow the list to grow once, stated**: when the Android parse layer is fixed (rows 5 and 7), Kotlin may report a new layer of errors (Data R1 item 5). That is the only PR allowed to add pins without fixing anything, and it says so in its body.
  - **Path filter**: the lanes run when `src/components/**/platforms/{ios,android}/**`, `src/providers/**`, `src/generators/**`, `src/build/**` or `src/cli/**` change. Web-only component PRs pay nothing.
- **Under C**, there is all of that, plus every native component edit becomes a change to a package API (see 2e).

**2e. What Option C would mean for how components ship.** Today native components ship as reference source, and the 16.0.0 entry says so. Under C they become something a consumer builds:
- **A public API on every component.** VERIFIED: 19 of the 39 non-test iOS component files declare a `public struct`, so about half would change. Every init parameter and every theme protocol becomes a consumer-visible contract. Renaming one becomes a semantic-versioning event for native consumers.
- **A package for each platform** (a `Package.swift` for SwiftPM and a Gradle module). None exists (Kenya R1). Each needs its own pins, and those become the de facto platform minimums. Under Core Goals, the minimums are Peter's to set.
- **It settles design questions early.** It effectively decides Q12 for (a), because components compiled once cannot read names each consumer chooses. It forces row 9's `public`. It is the likeliest way to make Q7 fire, which puts 129 behind 17.0.0.
- **Readiness changes meaning.** A component marked native-ready would then promise a consumer build, not "the source exists and compiles in our harness". Row 17's Q10 (c) would stop being optional.
- **More rides on every component PR**: the same pinned list, plus checks for changed public API, kept in step across web, iOS and Android.

This is a distribution product, and nobody has asked for it yet. 16.2.0 tells consumers not to start a native product from the package. C is a real future, but it belongs in its own spec.

---

**3. Cost**

- **Runners**: macOS for iOS (a new runner class) and ubuntu for Android. If the orchestrator's UNVERIFIED premise holds (free for public repos), the macOS cost is runner time only. **My pick does not depend on it.** If macOS turns out to be billed, the iOS lane runs only on unit PRs and at CLOSEOUT, and its reach stays the same.
- **Run time**:
  - iOS: about 2–3 minutes (Kenya, CARRIED), mostly pack, init and generate.
  - Android: not measured. REASONING: several minutes on a cold Gradle cache, less when warm. Data's JVM lane is faster per run, but it reaches none of my rows (2a).
- **Sessions to build** (REASONING, sized by the tasks round):
  - the shared pack, init and generate driver: about 1;
  - the iOS two-module type-check: about 1, less than Kenya's two-session host-module estimate because there is no Xcode project or simulator;
  - the Android library modules: 1–2 (Data has not estimated in sessions);
  - the two-sided pin-list check: about 0.5, shared by both platforms.
  - In total about 3–4 sessions, about what B costs and more than A's 2.
- **Must land first**:
  - the L816 fix (mine, one line, before the harness unit);
  - #641 (open);
  - the shared driver;
  - for Android, rows 5 and 7, so the output parses.
- **Stays red on**:
  - the token verdict until rows 4–9 (and Ada's colour decision);
  - the component verdict until item (i), Q12, Q13, I-2 and their component PRs land. That is about 197 iOS errors today (Kenya, CARRIED), and an unknown Android count.
- **Never red, though wrong**: A3 and row 8's `radius_half = 50.dp`. Each needs a text guard. Neither is a compile matter under any option.

---

**4. Fold-back**

**The strongest counter-argument.** The component verdict will be red for most of 129, because it cannot pass until four design-round decisions (item (i), Q12, Q13, I-2) and their component PRs land. Building it in the first task builds an instrument for answers nobody has given yet. Group A was closed with a text guard and a careful read. Option A gives a green gate quickly and keeps the promise the CHANGELOG makes about the token files.

**What it changed in my pick:**
1. **Gate by tier.** The token verdict becomes a required gate as soon as rows 4–9 land. It is not held behind the component tier.
2. **The component verdict is built in the same harness** (one more module per platform, the same driver), but stays a measuring lane until its pins empty.
3. **I dropped B's test-run step** (XCTest on a simulator, `createComposeRule`). No 129 row needs it, and it is the costliest part on both platforms.
4. **One instrument per platform.** I dropped Data's JVM lane, because the Android `:tokens` module gives the token verdict (my question to Data, item 6).

**The residual that survives:**
- **(a) A long red lane is a real cost.** For most of 129 every native component PR maintains a pinned list of a few hundred entries, and Android's list grows before it shrinks. If that list is badly built, it becomes noise people stop reading. The two-sided rule and per-file counts reduce the risk, but do not remove it.
- **(b) Compiling in our harness is still not "a consumer can build the components".** The charter's literal sentence ("a compiling, themed target … with nothing copied from `node_modules`") reads as C (Kenya R1). Under my pick, the CHANGELOG would say: "the token files compile in a consumer project, and the native component source compiles against them in the repo's harness; native components remain reference source." **This is a fork, and it is Peter's to rule**: does 129's "target" mean the token files, or the component source as well? I lean toward reading it as the token files, compiled in a consumer project. Then 129's component proof is the harness, and C is filed as a record with its own trigger, such as the first adopter asking to start a native product, or 128's distribution design. Whichever way he rules, he is choosing between the charter's words and 129's size.
- **(c) A type-check on iOS is not a full build.** It misses linking and package resolution. If Ada's colour decision brings in a dependency, my iOS lane turns into Kenya's host build, at about one more session.

---

**5. What would change my mind**

If the requirements round leaves rows 12, 15 and 16 out of 129 (so their fixes ride later component PRs), then no 129 row needs a component compile, and **A is enough for 129**. The component lane would then be a candidate for the spec that takes those rows.

---

**6. For other seats**

- [@ADA] Which way do you lean on colour construction: native colour values, or a declared dependency (`Color.oklch`, colormath)? With native values, my iOS lane stays a two-module `swiftc` type-check. With a dependency, it needs package resolution and becomes Kenya's host build. Either way, does a harness consumer whose abbreviation is not `DP` (2c) fit the shared driver as you see it? → design-outline.md § 4 "The harness", § 5.3 "Native colour construction" -- [LINA R2]
- [@DATA] Can a `:tokens` library module give the Android token verdict on its own, so one instrument covers both verdicts and the JVM lane can go? And do you have even a rough warm-cache run time for the library build? → design-outline.md § 5.1 Option B -- [LINA R2]
- [@KENYA] Rows 15 and 16 are the iOS component rows, and the XCTest files are not tied to any 129 row. Does a two-module type-check (tokens built as their own module, components type-checked against it) miss anything those rows need that your host build would catch? → design-outline.md § 5.1 Option B -- [LINA R2]

#### [ADA R2] — Q5 recommendation round

Read at `origin/main` `3375c2e79`. Labels: **MEASURED** = I ran it today, on this Mac, in a scratch consumer built from a packed install at that commit (Apple Swift 6.2, iPhone simulator SDK, target `arm64-apple-ios17.0-simulator`; scratch only, nothing committed); **READ** = read in source or a record; **REASONING** = my inference, not checked. I have no Kotlin compiler, so every Android statement here is REASONING or READ.

**1. Pick**

**A hybrid: Option A is the gate for the token tier from the harness unit's first PR, a two-sided ratchet (it fails on any new error, and on any listed error that has stopped firing); Option B starts in the same unit as a measuring lane for the component tier, and becomes required at the unit PR that closes the component rows; Option C leaves 129 for its own record, with a trigger, and Peter rules now how 129's acceptance sentence and INSTALL's two "planned follow-up (Spec 129)" lines are reworded.**

**2. Why, from the token tier and the generator**

**a. Option A accepts every token row that a compile can accept. B adds nothing to a token row, and four token rows are not compile questions at all.** My 2026-11-04 inbound said "each row's acceptance is the harness" (L79). For four rows that is wrong, and I am correcting it here. Row by row (READ unless marked):

| Row | What accepts it | Needs more than A? |
|---|---|---|
| 3 component-token refs, 6 Kotlin imports, 7 Kotlin comments, 9 iOS `public` | A. Row 9 only if the tokens are built as their own module and read from a second one (Kenya R1) | no |
| 4 native findings (`Typography`, the colour path) | A, at the cost set by the colour decision (c. below) | no |
| 2 theme emission | A, plus a probe file in the second module that provides the theme and reads it under the names the components read (`\.dpTheme`, `LocalDPTheme`, or what Q12 picks). That proves the key exists and is spelled as the components spell it, without compiling a component. What the theme carries is checked by the Jest generator tests that already exist (`src/generators/__tests__/{SwiftThemeTypes,KotlinThemeTypes}.test.ts`) | a probe file only |
| 13 product tokens, item 3 | A, after item (i), once the scratch consumer carries a product-token fixture that `ref`s a WCAG-only colour and a composite. The refusal half is a Jest test on `validateProductTokens` | a fixture |
| 5 font family, 8 value types | A for the parse and the types. Row 5's "what is emitted" and row 8's `radius_half = 50.dp` compile and are wrong, so each needs a Jest assertion on the generator output | a Jest assertion |
| 10 shadow colours | A shows the native half: 12 `shadowBlack100` + 3 `shadowBlue100` "cannot find" errors (MEASURED, matches the record). The web half and the warning removal are `ColorReferenceEmissionValidator` with `KNOWN_UNEMITTED_SHADOW_COLORS` emptied (Jest), plus a stdout check in the consumer guard | Jest |
| 19 palette read from the package | **Not a compile.** The record's close is "a test per part, run against a consumer-shaped fixture": edit each of INSTALL L77's groups in the consumer's copy and assert the output changes | the packed-install driver, on ubuntu |
| 20 row (g) base-config freshness | **Not a compile.** A build check that the root token files equal a fresh base generation | Jest, in the repo |
| 21 component-token custom values | **Not a compile.** A ruling first, then `generate` fails on a non-conforming value: asserted in the packed install | the driver |
| 22 `SemanticOverrideMap` export | **Not Swift or Kotlin.** `tsc --noEmit` on a consumer `.ts` that imports the type from `@3fn/core/config` in the packed install | the driver |

So Q5's options decide nothing for rows 19–22, and B decides nothing for any token row. Whatever Peter picks, the token tier needs A and the shared driver.

**b. The packed-install input already exists and is cheap. It is the one piece every option shares.**
- `tests/consumer-integration.test.ts` L235–249 already packs, installs, runs `init` and runs `generate` in the required Consumer Guard lane on `ubuntu-latest`. Its "Run consumer guard" step took 84 s, 105 s and 121 s on the last three green `main` runs (`gh run view` 41836306304, 41782957670, 41768790702), and that step also runs a fresh-clone flow, two config subprocess guards and the MCP smoke tests.
- MEASURED, one packed install alone, warm, on this Mac: `npm pack` (which runs the full build) 14.5 s, install 2.2 s, `init` 0.6 s, `generate` 0.5 s. About 18 s.
- MEASURED: `swiftc -typecheck` of the consumer's `DesignTokens.ios.swift` takes 0.22 s and gives **197** distinct errors, the same count as Kenya's and the records', at a newer `main`. The consumer's `ComponentTokens.ios.swift` takes 0.12 s and gives 10.
- So the outline's "2–3 minutes per run, mostly pack, init and generate" is an overestimate of the pack part. The cost that matters is runner start-up and toolchain set-up, not the pack. (REASONING: on CI, add `npm ci`, about 10 s, and a cold build; I would put the driver under a minute.)
- **The cheap shape**: the ubuntu job runs the driver once and uploads the generated output as an artifact; the macOS job and the Android job download it and only compile. The macOS job then needs no Node, and its run is the toolchain pin plus well under a second of `swiftc` for the token tier.
- **The work**: today the driver lives inside a Jest `beforeAll` and deletes its temp directory in `afterAll`. The harness needs it as a standalone script under `scripts/` that leaves the output in place, and the Consumer Guard would call the same script. That is one driver for both lanes. It needs the grant § 4 already names. I can build it, in about one session.

**c. Each Kotlin-type and colour decision I make moves what A costs. That is why I want A to be the gate: it is the lane that shows those costs.**
- MEASURED: 99 of the 197 iOS errors are `cannot find 'Color'` and 9 are `cannot find 'oklch'`. So 108 of 197 come from the colour path alone. The file imports only UIKit (READ, L7).
- If the design round picks **native colour values** (sRGB or P3 values on iOS, `ColorSpaces.Oklab` on Android, Data R1 item 19), the token-tier lane stays free of dependencies, and A stays a typecheck.
- If it picks a **dependency** (ChromaKit on iOS, colormath on Android), every A lane must resolve a package first. Kenya calls that "a host build in all but name", and A's cost moves toward B's.
- I lean to native values (the "Native colour construction" item in § 5.3). Q5 does not depend on that pick, but A's price does, and the gate is where we see it.

**d. What Option C would mean for the package and the generator: a distribution architecture, not a way to accept 129's rows.**
- **MEASURED, and new to this round as far as I can see: the component tier a consumer needs is not in the consumer's generated output today.** The consumer's `generate` wrote `dist/tokens/ComponentTokens.ios.swift` with one enum, `ProgressTokens` (10 tokens, from the consumer's own `src/tokens/component/progress.ts`). The repo's `dist/ComponentTokens.ios.swift` has seven enums: `AvatarTokens`, `BadgeLabelBaseTokens`, `ButtonIconTokens`, `InputCheckboxTokens`, `InputRadioTokens`, `ProgressTokens`, `VerticalListItemTokens`. The token index counts "33 (23 of them DesignerPunk's)", but the 23 are emitted only into the package's own `dist/`. So `ButtonIcon.ios.swift`'s token reads reach a consumer only from `node_modules`, which is exactly what the charter's acceptance sentence rules out. Android is the same (both files are 34 lines in the consumer against 104 in the repo, MEASURED). `DesignTokens.*` is byte-identical between the repo and the consumer today, because nothing is themed yet.
- **What C needs from the generator** (REASONING, not designed):
  1. `generate` emits the package's own component token tier into the consumer's output, or into a module, and no longer only the consumer tree's tokens.
  2. The generated tokens become a module that the package's components import. A SwiftPM package or a Gradle module that sits in `node_modules` cannot depend on a module the consumer generates in their own tree without knowing where that tree is. As far as I know, SwiftPM has no "the consumer provides this" dependency (UNVERIFIED). So either the components stop reading `DesignTokens.<name>` directly and take everything they read through an injected interface (Q13 (a), widened from colours to sizes and spacing), or `generate` writes the component source into the consumer's tree (Q12 (c)).
  3. Without that, Q13 (b), where components read `DesignTokens.<name>`, would resolve to DesignerPunk's own token values and not the consumer's. That breaks Model B, under which the tokens are the consumer's.
  4. Every member the components read becomes public API of a module, so row 9's `public` is required, not just a fix.
- Each of these is a Q7 candidate, a change that breaks a consumer, and C is what fires Q7. That is release-sized work with its own design round. It belongs in 128's neighbourhood (one core package, platform packages) or 17.0.0, not in a spec whose rows are generator defects.

**e. Why B runs from the start instead of waiting.** B is the component seats' instrument (Lina, Kenya, Data). I support starting it in the harness unit so that the component tier's gap is measured from the first run, and the CHANGELOG's "actually compiles" is never read as more than it covers. Whether it gates per PR or only at the closing PR is their call. My reading is that the component rows (12, 14's A5 and A7, 15, 16) can only close on a compile if B is required at the unit PR that closes them.

**3. Cost**
- **Runners**: ubuntu for the driver and the Android token lane (no new class). macOS for the iOS token lane: a new runner class, but with the artifact shape it runs for about a minute (REASONING: runner start-up and Xcode selection; the typecheck is under a second, MEASURED). My pick does not depend on billing. If macOS runners are free for this public repository (UNVERIFIED, per the brief), the only cost left is queue time, and a one-minute job keeps that small. B adds a macOS host build with a simulator, and an Android library module with AGP and the Compose plugin: minutes per run (Kenya, Data, carried).
- **Sessions**: driver, about 1 (Ada, with a `scripts/` grant). A lanes: Kenya's and Data's to size, about 1 per platform plus the workflow (REASONING). B: Kenya's estimate of two sessions on iOS after the generator fixes, plus Data's Android module.
- **What must land first**: the driver and the workflow grant only. **A does not wait on L816 or on #641**: it never parses a component file. It starts red: 197 iOS diagnostics on the token tier and 10 on the consumer's component tokens (MEASURED), with Android unknown until its first run. The pinned list shrinks as rows 4–9 land.
- **It stays red on**: the colour path (108 iOS errors) until the colour construction decision; `Typography` (39) until row 4; row 9's internal members once the second module is in place; and the Android parse layer (rows 5 and 7) first, then whatever layer comes next (Data R1 item 5).

**4. Fold-back**
- **Strongest counter-argument.** The charter's acceptance is "a stranger's `init` → `generate` yields a compiling, themed target … with nothing copied from `node_modules`". INSTALL L159 and L171 tell readers that iOS and Android onboarding are "a planned follow-up (Spec 129)", and 16.2.0's CHANGELOG says 129's first task "actually compiles the output". Under my pick, 129 closes and a stranger still cannot build a SwiftUI or Compose screen from the package. Read that way, C is not scope creep: it is the promise, and moving it out of 129 is a quiet retreat.
- **What it changed in my pick:**
  1. The rewording is part of Peter's ruling now, not a closeout chore. The first 129 PR re-points INSTALL's two "planned follow-up (Spec 129)" lines and states what the harness proves, so no shipped text promises C while 129 runs.
  2. C gets a record with a named trigger at the ruling, so its move is filed, not dropped.
  3. A's probe module makes the token half of "a target" real: a second module, standing in for a consumer's app, imports the generated tokens and reads the theme, and it compiles. A stranger gets a compiling, themed token target. What they do not get is compiled components.
  4. B starts in the harness unit, so the component gap is measured from day one and not discovered at closeout.
- **The residual that survives.** My pick narrows Peter's own acceptance sentence. After 129, "native onboarding is supported" is still false for components. That is a real loss, and only Peter can accept it. **The fork**: (a) narrow 129's acceptance to "the token tier compiles in a consumer's own module; components compile in the repo" and move C to its own record (my pick); or (b) keep the sentence literal, take C into 129, and accept that it likely fires Q7, so 129 waits for 17.0.0 or 17.0.0 moves earlier. Both are defensible. The pick is Peter's.
- **A second residual.** A two-sided ratchet that is red on 197 known errors is a gate only in the sense "no new error lands". Until the list empties it proves nothing about the rows still on it, and a reader of a green check must read the list too. The pinned list makes that visible. It does not make it go away.

**5. What would change my mind**

If Data's answer below is that an Android token-tier lane cannot resolve Compose's `Dp` and `Color` without the AGP library module, then on Android A costs the same module B needs. I would then pick **B on Android as the gate** (one module, a token source set and a component source set, two verdicts), and keep A on iOS. Today's Kotlin token file already uses `.dp` 65 times (Data R1, READ), and my I-1 (sizing as `Dp`), I-2 (`TextUnit`) and a native `Color` would all add Compose types.

**6. For other seats**
- [@DATA] The Android token file already needs `androidx.compose.ui.unit.Dp` (65 `.dp` uses), and I-1, I-2 and native colour values would add `Dp`, `TextUnit` and `androidx.compose.ui.graphics.Color`. Can your plain-JVM Gradle lane resolve those types, for example through JetBrains' Compose desktop artifacts, which use the same package names? Or does even the token tier need the `com.android.library` module? My Android pick depends on it (§ 5). → design-outline.md § 5.1 Option A, Android -- [ADA R2]

#### [STACY R2] — Q5 recommendation round

Read at `origin/main` `da128281d`: design-outline.md § 4 and § 5.1, `[KENYA R1]`, `[DATA R1]`, my `[STACY R1]`, the charter's § "Acceptance", and CHANGELOG L44 (16.2.0) and L118 (16.1.0). My seat is the claims pass, so I judge each option by one question: **at CLOSEOUT, which of 129's rows can I check against a run I can read, and which stay as someone's reading?** I do not decide what the charter's acceptance sentence means, and I do not write release text (my charter's mirror clause). Below I say what the evidence would support under each option, not how the sentence should read.

**1. Pick**

**Option B (token files and component source, compiled on host lanes), without the two test runs.** It starts as a non-required measuring lane with a committed expected-failure list that shrinks. It runs as a CI context on every 129 unit PR. It reports four verdicts (iOS tokens, iOS components, Android tokens, Android components), and each becomes a required check on its own once its list is empty. Peter states on the record, at this gate, that the charter's "compiling, themed target" means what B reaches, not C. Without that statement, the CLOSEOUT pass finds the acceptance sentence not met.

**2. Why**

**a. What each option lets a claims pass check.** Today every iOS and Android "compiles" or "does not compile" in 129's rows is trust-the-reported-result. On Android that is true for any verifier, because no seat has a Kotlin toolchain (`[DATA R1]` header, VERIFIED by Data). A CI context on the unit PR changes this. The row's evidence becomes a run URL at the merge SHA, and I can have that run dispatched again at the same SHA. The row no longer has to read `not re-verified — toolchain unavailable`. That is the main thing a claims pass gets from Q5, and it reaches only as far as the lane compiles:

| Rows (§ 3) | A | B | C |
|---|---|---|---|
| Token tier: 2–10, 13, 19, 20, 22 (row 21 partly) | checkable | checkable | checkable |
| Component rows 12 (groups B and C, item 3, Button-CTA), 15, 16; 14's A5 and A7 (only with a warning policy, Data item 7) | **Android: a reading. iOS: unproven unless the iOS lane also type-checks components** | checkable | checkable |
| 14's I1–I3, A1, A2, A4; 14's A3; row 8's `radius_half` | a reading, or another named instrument | same as A | same as A |
| "A consumer builds the components from the package" | not claimed | not claimed | checkable, and it opens Q7 |

Under A, the component rows end 129 exactly as 16.x's "Android interim fixes" did: fixes nobody compiled. That is the shape that put "known not to compile as shipped" into CHANGELOG L118. If those rows are ticked ✅ on a reading, that is the false-✅ class Spec 127 exists to catch. If they are honestly left as `not re-verified`, 129 closes with its component half unaccepted. **B is the cheapest option that leaves no compile-reachable row as a reading.**

**b. The charter's promise, "compiling … established by a platform build, not by inspection".**
- **A** meets it for the token files. A Kotlin JVM compile is a real compile, and `swiftc` against the iOS SDK is not inspection. It does not meet it for the components on Android, which only inspection can reach under A.
- **B** meets it for both tiers on both platforms. These are library or host-module builds against the platform SDK and BOM.
- **C** meets it for a consumer-shaped target.
- **The fork is under "target", not under "compiling".** The acceptance sentence says "nothing copied from `node_modules`". Under B, a consumer still gets the components into their project only by copying them, so B does not satisfy the sentence read literally (`[KENYA R1]` "What is missing" item 2). Peter has three choices, and the pick is his:
  - read "target" as the generated output plus the shipped component source compiled against it (B is enough);
  - take C;
  - or carry the gap as a named limitation at CLOSEOUT.

  I do not choose among them. Whichever he chooses has to be on the record before requirements, or the requirements round writes criteria against a sentence that two seats already read two ways.
- **"Themed" is checkable only as compile evidence.** On any option, a compile can show two things: the theme types are emitted, and the component reads resolve against them. It cannot show that a theme switches at runtime. Android's `CompositionLocal` with an `error(...)` default compiles and then crashes in the 21 `@Preview` files (`[DATA R1]` item 14). So "themed" in any criterion has to name compile evidence as its reach, or name a runtime instrument. None of A, B or C builds one.

**c. What the shipped CHANGELOG could truthfully claim under each.** The release owner writes the text; this is what the evidence would support.
- **A**: the generated iOS and Android token files, including the emitted theme types, compile or type-check under named, pinned toolchains, checked in CI. It would not support "a compiling, themed target", any claim about the components, or removing L118's Android-components limitation.
- **B**: the token files and DesignerPunk's iOS and Android component source compile against them under named pins, in CI. It would not support "start an iOS or Android product from the package", because there is still no supported way to get the components in without copying. It would not support any claim about behaviour (screen-reader speech, tap-target size, runtime theme switching).
- **C**: everything B supports, plus a supported package build path. It still says nothing about behaviour.
- **While any option's list is not empty**, the evidence supports "the build check runs, and N known failures remain, listed at `<path>@<sha>`". It does not support "compiles" or "type-checks" for that tier. CHANGELOG L44's "first task is a build check that actually compiles the output" stays true under all three options, provided the first task ships the lane, even while the lane is red.
- **One wording risk under A.** On iOS, `swiftc -typecheck` does not compile, so the shipped word would have to be "type-checks" (Q5's own text). The difference costs seconds: emitting the token module (`-emit-module`, `-emit-library`) would make "compiles" true for iOS tokens (UNVERIFIED; my question to Kenya is below).

**d. The measuring lane and its expected-failure list, as evidence.** This is the part of B that makes it checkable or not. A measuring lane is non-required, so `verify-gate-registration.sh` does not see it, and a red does not stop a merge. Its only defence against rot is how the list is built. A claims pass can decide "row N is fixed" only if all six of the following hold:
1. **The list is a committed file**, and each entry is keyed by row id, file and normalised diagnostic, never by line number. Then "row N fixed" is decidable from git: row N's entries were removed in PR X, and the lane was green at PR X's head.
2. **The check is two-sided**, like Lina's item-(i) guard (§ 4). It fails on a diagnostic that is not on the list (a regression), and it fails on a listed entry that no longer occurs (a stale list). So a fix and its removal from the list land in the same PR. Without the second side, the list stays long after the fixes, and the lane stays green for nothing.
3. **It fails on zero.** If pack, init and generate produce no files, or the compile reads none, the lane fails. Otherwise an empty input gives "no unexpected diagnostics", which is green on nothing. This is the did-it-really-run class (#148, #194) and the P1 floor rule ("fails on zero").
4. **Adding an entry is the act that weakens the lane, and it must be readable.** This runs opposite to fixtures, where deleting is the weakening act. Data expects the Android first runs to surface defects one layer at a time (`[DATA R1]` item 5), so adding an entry is sometimes legitimate. The read: each added entry names a record (an existing row, or a new `.kiro/issues/` file), and the PR body lists it. An added entry with no record is a finding on the author. `scripts/governance-examples/pending.json` is the precedent: its header carries the adopted count, and an added entry is a finding routed to Peter (my ARMING row). The list needs the same header and the same read.
5. **The toolchain is pinned, runner image included.** That means `macos-<n>` and a selected Xcode, never `macos-latest`. A floating image turns green into red with no repo change (`[KENYA R1]` refinement 1). It also breaks my reproduction at an old SHA. My reproduction window is bounded anyway: GitHub's artifact retention and the life of a runner image (both UNVERIFIED for this repo). So the completion doc records the run URL, the list's SHA and the pins, and the pass re-dispatches at the merge SHA while the image still exists.
6. **Warnings are captured, or A5 and A7 are not evidence.** `rememberRipple` compiles with a warning (`[DATA R1]` item 7, REASONING). A5 and A7 are accepted only by a pin where the warning is an error, by a targeted warnings-as-errors rule, or by a text guard. A green compile alone does not accept them.

Promoting a verdict to required changes the required-check set. That fires my ARMING trigger, so each promotion is checked when it happens.

**e. Where the lane runs is a claims question, not only a cost question.** A lane that runs "once at CLOSEOUT" means every row accepted at an earlier unit's merge was a reading at that merge. The pass would then be auditing claims made before any evidence existed. The lane must run on each 129 unit PR that carries a row it accepts. Path filters on the generator and component paths are fine.

**3. Cost**

Figures are the seats' estimates; I measured none of them.
- **Runner classes**: macOS for iOS (new; billing UNVERIFIED, though the brief's premise says it is likely free on a public repo), and the existing ubuntu runners for Android.
  - **If macOS is not free**, my pick does not change in kind. The iOS lanes would run path-filtered on 129's unit PRs instead of on every PR. They still have to be CI contexts.
- **Run times**:
  - iOS token lane: 2–3 min, mostly pack, init and generate (Kenya, CARRIED). The component typecheck adds about 23 s for 43 files in one `-wmo` pass (CARRIED).
  - Android token lane: 2–3 min (Data, REASONING). Android component library module: "minutes on a cold cache" (Data, REASONING, untimed).
- **Dropping the test runs** (the two `*Tests.swift` files on a simulator, the two `*Test.kt` files on an emulator or Robolectric) removes the slowest step from B. No row in § 3 needs those tests for its acceptance. If the design round finds one that does, it goes back in for that row.
- **Sessions**: iOS host about 2 (Kenya, after the generator fixes and the OKLCH decision). Android unsized. Plus the shared pack, init and generate driver.
- **Must land first**:
  - #641;
  - Lina's L816 one-line fix (row 15);
  - the harness grant (`harness/**`, a workflow under `.github/workflows/`, the driver under `scripts/`; README rule 8's excluded acts admitted or not);
  - the pins;
  - the list's file format and its header.
  - The OKLCH decision (rows 4 and 11) decides whether any lane has to resolve a dependency.
- **Stays red on**: rows 4–9, item (i), row 12's groups B and C and item 3, row 16, and the product-token lane until item (i) emits.
- **Never goes green on**: 14's I1–I3, A1–A4, and row 8's `radius_half`. The requirements must name another instrument for each, or record each as a reading by name. No compile closes them.

**4. Fold-back**

- **Strongest counter-argument.** A is green within days and can be a required gate almost at once, so the token tier stops regressing straight away. B is a red, non-required lane for most of the spec. A lane that is red for months teaches everyone to ignore it. Also, B's component verdict cannot go green before item (i) lands, so for most of 129 the component rows are readings under B as well. B mostly buys evidence at the end, for two more instruments to keep up.
- **What it changed in my pick.**
  - The token-tier verdicts are separate contexts. Each becomes required when its own list empties, which should be early, because the token rows land first. A's main benefit is kept inside B.
  - The test runs are dropped.
  - "Red does not read as broken" now rests on the two-sided, zero-floored list with its addition read, not on goodwill.
- **What survives.**
  - B still adds a macOS lane and an Android library module that Kenya and Data, product seats, must keep green.
  - It still leaves seven named items of row 14, plus row 8's `radius_half`, as readings or other instruments.
  - It still does not meet the acceptance sentence's "nothing copied from `node_modules`" for components unless Peter reads "target" B's way. That reading is a fork I surface and do not pick.
  - And a non-required lane can still go red at a 129 merge, because nothing on the merge path stops it, and by design nothing should (my charter: never a gate). A false green would then be caught only after acceptance, at the claims pass.

**5. What would change my mind**

If the requirements round, with Peter's ruling, takes the component rows (12's component part, 15, 16, 14's A5 and A7) out of 129 and moves them to a named later spec, A covers every row 129 keeps, and B's extra instrument accepts nothing in this spec. I would then pick A, with an iOS token module emitted rather than only type-checked.

**6. For other seats**

- [@THURGOOD] My pick's checkability rests on point 2d item 4: an added expected-failure entry is readable as a finding. Does the list's path join the ARMING instrument-path list, with a read like `pending.json`'s (header count, entries only removed unless a record is named)? That would take a ballot. Or does the harness enforce it itself, so that it is checkable without a law change? → design-outline.md § 4 "The harness" -- [STACY R2]
- [@KENYA] Can the iOS token lane emit the token module and library with plain `swiftc` (`-emit-module`, `-emit-library`, simulator SDK and target) in about the same seconds as `-typecheck`? If so, "compiles" is true for iOS tokens and not only "type-checks". → design-outline.md § 5.1 Option A, iOS -- [STACY R2]

#### [THURGOOD R3] — Q5 recommendation round

Read on `origin/main` at `da128281d`. Lens: the CI mechanics, meaning how the harness is wired, registered and gated, and what it costs every other PR. Labels: **VERIFIED** = I read it in the tree today; **REASONING** = inference or GitHub's documented behaviour, not checked on this account; **UNVERIFIED** = not checked.

**1. Pick.** **Option B, built as one CI job per platform. Each job reports two tiers (token files, component source) against a strict, two-sided expected-failure list, so the job is green from its first merge. The Android job runs on ubuntu and the iOS job on a pinned macOS image. The token tier is the harness's first slice and the component tier its second. Both jobs start non-required and are promoted to required by a criterion written into the tasks. Option C is left out of 129.**

**2. Why (CI mechanics, with evidence).**

- **A strict pin removes B's main cost.** The outline says B "stays red longest … so it starts as a measuring lane, not a gate" (§ 5.1), and that the pin keeps a red lane from reading as broken (§ 5.1, "Preventing a repeat"). The pin can do more than that: it can keep the lane from being red at all.
  - The job compares the set of files that fail to compile against the pinned list, in both directions. It is green when the two sets are equal. It is red for exactly four reasons, and each prints its own one-line cause:
    1. **New failure**: a file not on the list fails.
    2. **Unexpected pass**: a listed file now compiles, and the PR did not remove it from the list.
    3. **Floor**: fewer files reached the compiler than the floor requires, including zero. This is the repo's did-it-really-run convention (`lane-timing.yml`, the Task 7 floors).
    4. **Toolchain missing**: the pinned Xcode or JDK is not on the runner image.
  - So "red" never means "129 is not finished yet". It means something changed that nobody recorded. That is how the harness can be the first task the charter and the 16.2.0 CHANGELOG promise without waiting on rows 4–9 and item (i). Kenya's "two sessions, after the generator fixes" estimate (KENYA R1) assumed the host had to go green. With a pin, it does not.
  - **Each fixing PR shrinks the pin in the same diff.** That diff, with the green context on the unit PR, is the row's acceptance record: "row 7's PR removed these three files from the Android token list, and `harness-android` is green at that commit." Stacy can check that without asking the author (STACY R1; the Q5 boundary rule that "compliant" must be decidable without consulting the author).
- **The pin can only shrink, and the job enforces that itself.** Adding an entry would quietly weaken the floor. The comparator reads the list at the merge base (`git show origin/<base>:…`) and fails on any added entry, with exactly two exceptions it can check from the diff alone:
  - (a) the same diff changes the toolchain pins (an Xcode or Compose bump legitimately moves failures);
  - (b) the same diff clears a tier's parse layer. Data R1 item 5: Kotlin may stop at syntax errors, so analysis-layer failures surface only once rows 5 and 7 land. Until a tier parses, the comparator records it as "blocked at parse" and compares only the files that fail to parse. It does not count a file as passing just because analysis never reached it.
  - These checks need no PR-body reading and no post-merge audit, which keeps 131's thinning aim intact.
- **Two verdicts do not need two instruments.** The outline's B risk says "two instruments per platform to keep green". Kenya's tokens-only / tokens-plus-components split (KENYA R1 item 3), and her separate-module topology for row 9, are two steps of one job, not two lanes. On Android, Data's JVM-lane versus library-module split (DATA R1 items 1–3) reduces the same way. The library module compiles the token files too, in their own source set, so A's verdict comes out of B's instrument as its first tier.
  - Building A first and B later builds the harness twice, around the same pack, init and generate driver. B with A's verdict as its first slice builds it once.
- **A leaves rows without a decidable acceptance. That is a standards problem, not only a coverage one.** Under A, rows 12 (groups B, C, item 3), 15's Android half and 16 have no instrument on Android, and their iOS halves are unproven (DATA R1 item 1; outline § 5.1, A's risk). The requirements would then have to write acceptance criteria for those rows that no instrument can decide. As the author of the completion-evidence standards, I would be writing criteria I already know Stacy cannot verify. B lets every row with compile evidence name an instrument at the review base, which is the LENS condition Stacy raised (STACY R1, last bullet).
- **Why not C.** The CI cost of C over B is small (the harness already consumes a packed install). The distribution work is not small, and it decides row 9, Q13 (b) and Q12 (KENYA R1, missing item 2). Because the harness input is a packed install, never `dist/` (outline § 4), C stays reachable later without rebuilding the harness. Leaving it out of 129 forecloses nothing in CI.
- **Why a new workflow file, not jobs in `lane-timing.yml`.** VERIFIED: `lane-timing.yml` is ubuntu-only test-script lanes, and my standing P1 scope over it admits only test-script steps inside existing required jobs, with no runner change (ballot `2026-09-27-ci-regime-standing-scope` § 2). A macOS job there would mix a grant-only failure domain into the file P1 audits by extent. A separate `native-harness.yml` gets:
  - its own `concurrency` group with `cancel-in-progress`, so superseded pushes do not hold a macOS runner;
  - its own failure domain, readable by name;
  - the `(unit-branch)` dispatch-name variant every required workflow carries (ballot B-CI a2; VERIFIED in `lane-timing.yml`'s job names).
  The outline already names "a new workflow under `.github/workflows/`" (§ 4, write scope).
- **Pins live outside `.github/**`.** The Xcode version (`xcode-select`), the JDK, Kotlin, the Compose BOM, AGP, `compileSdk` and `minSdk` are read from a file under `harness/`. Only the `runs-on: macos-NN` label sits in the workflow, and it changes about once a year.
  - **Why**: any `.github/**` edit outside P1 needs an issue-row grant, with Stacy's activation read and an ARMING audit (README rule 8). If the pins lived in the workflow, every routine toolchain bump would cost two PRs and two audits. In `harness/`, a bump is one PR under the harness owner's scope. That PR is also the only kind allowed to grow the pin.
- **Run on every PR. No path filter.** REASONING, from GitHub's documented behaviour: a required check whose workflow is skipped by a `paths:` filter stays "Expected — waiting" and blocks the merge. The workaround (a job-level `if:` skip that reports success) makes "did it really run" ambiguous. Every lane in this repo already runs on every PR (VERIFIED: `lane-timing.yml` has `on: pull_request` with no `paths:`). The harness should follow that, at the cost below.
- **Promote on measured stability, not on an empty pin.** Repo precedent: 125-A Task 6 ran its lanes non-required to measure cold and cached durations, Task 7 added floors, and Task 8 promoted them (VERIFIED, `lane-timing.yml` header). The harness repeats that pattern. Each job is promoted when:
  - its floor and strict pin are in place;
  - its cold-cache duration is under the 10-minute ceiling (125-A Req 6.3, cited in the same header);
  - it has had **10 consecutive PR runs whose verdict changed only with a repo change** (no flake);
  - for iOS only, the toolchain pins are read from `harness/`.
  Waiting for an empty pin (CLOSEOUT) would leave the files without regression protection through 129's execution, the period when they change most.
  - **Android first.** Its job runs on ubuntu, the runner class the gate already depends on.
  - **iOS when its own criterion is met.** A required macOS check brings in a failure domain the gate has never had: GitHub's image retirement schedule.
- **Registration, and what each act costs.**
  - **Promotion is Peter's act.** VERIFIED in `tools/agent-generator/verify-gate-registration.sh`: `EXPECTED_CONTEXTS` holds 19 contexts. Each promotion adds one context: 19 → 20 for `harness-android`, then → 21 for `harness-ios`. Rule C9 says the count changes in the same recorded change as the arming. That script is outside my P1 scope, so the change goes through an issue-row grant or Peter.
  - VERIFIED in `.kiro/hooks/complete-task.sh`: `REQUIRED_WORKFLOWS` is a count-asserted list of six files. It becomes seven when the first harness job is promoted (I own that file).
  - Stacy's ARMING row fires at each promotion.
  - **`.github/in-lane-guards.json` cannot register the harness.** It registers Jest test files under a required context, and its check fails on any context not in `EXPECTED_CONTEXTS` (VERIFIED: `scripts/__tests__/in-lane-guards.test.ts` case 7). What it can register is the comparator's falsification test: a Jest file under `scripts/__tests__/` covering the four red reasons and the shrink-only rule, run in `lane-functional-root` through `test:scripts`. Once that test exists, adding it is my P1b act, with no grant. That keeps the comparator from being weakened to always-pass without anyone noticing, and the protection does not depend on the macOS runner.
- **Out of every per-PR job.** The two XCTest files on a simulator (REASONING: simulator boot is the flakiest step on hosted macOS) go in a third job, `harness-ios-tests`. It is non-required, dispatched, and run at CLOSEOUT. The Android `*Test.kt` files need an emulator or Robolectric. They are Data's third rung (DATA R1 item 9) and are not in 129.

**3. Cost.**

| | Android (`harness-android`) | iOS (`harness-ios`) |
|---|---|---|
| Runner class | `ubuntu-latest`, as today | **new: pinned `macos-NN`** |
| Run time per PR | REASONING: about 3–6 min cold, 2–3 min cached (AGP library module and Compose plugin; Gradle cache through `gradle/actions/setup-gradle`, so no checked-in `gradle-wrapper.jar`) | about 2–3 min plus queue (KENYA R1: pack, init and generate dominate; typecheck 0.2 s tokens, 22.9 s all 43 files); queue time on macOS is UNVERIFIED |
| Sessions to build | REASONING: about 2 (library module and driver); Data has not sized it | about 2 (Kenya), no longer gated on the generator fixes, because the pin absorbs them |
| Shared | about 1 session for the comparator, floors, workflow and the comparator's Jest test | |
| What must land first | an issue-row grant naming `.github/workflows/native-harness.yml`, `harness/**` and the `scripts/` driver and comparator (README rule 8; outline § 4). Nothing else: with a strict pin, Lina's `ContainerCardBase` L816 fix no longer has to precede the iOS run (it becomes a pin entry), though landing it first still shortens the list | |
| Red on | nothing by construction; only the four named reasons above | the same |
| Gate cost after promotion | +1 required context; every PR waits about 3 min more in parallel | +1 required context; every PR depends on macOS runner availability and image schedule |

- **Billing.** My pick does not depend on billing. The repo is public, and standard runners are free for public repositories (orchestrator premise, UNVERIFIED on this account). It does depend on macOS **concurrency and queue time**. REASONING: hosted plans cap concurrent macOS jobs below the Linux cap. That is why iOS promotion is gated on measured runs.
- **The measuring period's real cost.** While a job is non-required, it is not in `REQUIRED_WORKFLOWS`, so `complete-task.sh --subtask` does not dispatch it at checkpoints. 129's row authors therefore get no harness signal before PR-open unless they run `gh workflow run native-harness.yml --ref <branch>` themselves. The tasks round should carry that command in the harness unit's instructions.

**4. Fold-back.**

- **Strongest counter-argument.** A required harness during 129 makes every row PR edit one shared file, the pin. That turns the pin into a merge-conflict hotspot like `canonical/generated.lock`, where two merges once left 11 PRs in conflict (orchestrator memory, 2026-11-01; UNVERIFIED here). It also makes every unrelated PR from every seat wait on a macOS runner and a toolchain only Kenya can reproduce, while the lane mostly asserts "still broken in the same way". When GitHub retires the pinned image, all merges stop until a fix PR lands. If that fix touches `runs-on`, it is grant-routed.
- **What it changed in my pick:**
  - one pin file per platform and tier, one sorted line per file, so two PRs conflict only when they fix the same file;
  - the comparator prints the exact replacement list, so a conflict is fixed mechanically;
  - toolchain pins moved to `harness/`, so the image-retirement fix is usually one PR there;
  - Android promoted first, on the runner class the gate already trusts;
  - iOS promoted only after its measured runs;
  - the simulator tests kept off every PR.
- **The residual that survives.** For all of 129's execution, every row PR carries one more coupled edit (the pin shrink) and one more conflict surface. Once `harness-ios` is required, the whole repo's merge path depends on a runner class and an image calendar it has never depended on before. When those retire, the gate is red with no repo change until someone acts.
- **The fork, which is Peter's:** promote on measured stability (my pick: regression protection during 129, at that cost), or promote at CLOSEOUT when the pin is empty (no gate cost during 129, but no protection while the files churn). A also avoids this residual only partly: it still needs the macOS runner for iOS.

**5. What would change my mind.** A measured cold-cache run of the Android library module above 10 minutes on `ubuntu-latest`, the 125-A ceiling. Then the component tier should run only on dispatch and at CLOSEOUT, and only the token tier per PR. That is the per-place split, at the cost of two instruments.

**6. For other seats.**

- [@KENYA] [@DATA] My shrink-only pin keys on **files**, not diagnostics. Does your compiler attribute each error to a file stably enough under the pins for a per-file pass/fail set to be deterministic (Swift `-wmo` within one module invocation; K2 after the parse layer)? If not, the pin needs another key, and my "green from first merge" claim weakens. -- [THURGOOD R3]
- [@STACY] Does a row PR's pin-shrink diff, together with a green `harness-<platform>` context on the unit PR, meet your bar for "accepted by a compile" without consulting the author? Or do you need the comparator's printed per-file list cited in the completion doc as well? -- [THURGOOD R3]

#### [LEONARDO R2] — Q5 recommendation round

Read on `origin/main` at `da128281d` (after `9819f72ee`). Lens: the adopter, the stranger in the charter's acceptance sentence. Labels: **VERIFIED** = I read it in the file named, today; **REASONING** = my inference; **UNVERIFIED** = not checked. Peter's words are quoted from the records named; everything else is my position.

**1. Pick.** **Option C, staged inside 129.** B (Kenya's and Data's host lanes) is the instrument. The harness's host project is built to be the same project an adopter's `init` and `generate` will set up. Giving adopters that project, plus the native walkthrough, is 129's **last** unit. Whether an A-style token typecheck also runs on every PR is Kenya's and Data's cost call, and it does not change this pick.

**2. Why, from the adopter's side**

- **What we tell adopters today.** Four release entries in a row say not to start a native product: CHANGELOG L9, L74, L138 and L187 (VERIFIED). 16.2.0 says it twice more: "Do not start an iOS or Android product from this source" (L44) and "Do not start an Android product from this source" (L118). INSTALL L159 and L171 say "iOS onboarding is a planned follow-up (Spec 129)" and the same for Android. The integration guide's "Walkthrough: Build for iOS or Android" says it "is written when that lands (Spec 129)" (VERIFIED, docs MCP). So we have already told adopters that 129 is the point where they can start. Only C makes that true.
- **What each option lets the next CHANGELOG say** (REASONING, from § 4 and the R1 entries):

  | Option | What an adopter reads after 129 | Is the "do not start" line removed? |
  |---|---|---|
  | A | "The generated token files type-check." | No. The components are still reference source, and Android's components are not even reached (Data R1 item 1). |
  | B | "Tokens and components compile in our build check." | No. The only way to get the components into your own project is to copy them out of `node_modules`. |
  | C | "Your `init` → `generate` project builds on iOS and Android. Screen-reader behaviour is not device-verified." | Yes, with the caveat about evidence kind. |

- **Why B alone leaves the adopter copying.** The integration guide § 4 tells adopters the components are "our updating surface … they improve when you update the package" (VERIFIED). On web that works because the components read CSS custom properties while the page runs: the late binding is free. On native, the components refer to token names when they compile. So to keep "updates arrive with the package" true, the components have to reach the adopter's project *as a package*. INSTALL names both missing pieces: "the package has no Swift package manifest" (iOS) and "there is no Gradle module" (Android; VERIFIED). If B ships without C, the only path left is copying the components, which breaks both the charter's "nothing copied from `node_modules`" and § 4's promise that components update with the package.
- **Peter's words point at C's rung, not B's** (quoted from `.kiro/specs/128-react-react-native-platform-admission/inbound-from-peter-user-stories-2026-10-21.md` § 1):
  - Story 2: "I want to be able to create a new design system on Web, iOS, and Android platforms — no React or React Native code." Creating one means building a product, not reading source.
  - Message 4: "… with 129 resolving the gaps and claims for iOS and Android support."
  - Message 7: "A big part of the reason iOS and Android are considered experimental is because we haven't tested connecting them to XCode or whatnot for Android." Connecting to Xcode or Gradle is exactly the consumer-project step that A and B leave out.
  - **A competing reading, stated fairly.** The priorities record's outcome (A) reads "A consumer installs DesignerPunk and gets complete, truthful native output" (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 2, VERIFIED). Truthful *output* is satisfiable by B. Under that reading C is not owed in 129. Peter wrote the stories three days after that outcome list, but which reading governs is his call, not mine.
- **Order of proof the stories imply** (REASONING). Each rung can be built only on the one below it:
  1. the token files compile;
  2. the components compile against the adopter's generated tokens;
  3. an adopter's own project builds from the package;
  4. device and screen-reader evidence.

  Story 3 (Peter: "the most optimal from a product strategy perspective") needs no native distribution. Stories 1 and 3 do need rung 3 for React Native's device evidence, though: a React Native app *is* an Xcode project and a Gradle project. The orchestrator's position in the same inbound, § 3 item 10, says this ("device and assistive-tech evidence needs an app built in Xcode and Gradle — the same barrier, deferred"). So 129 proves the Xcode and Gradle connection once, on the simpler native case, and 128 reuses that connection instead of building it first under React Native.
- **The binding decision is made in 129 whatever Q5 says, and 128 inherits it.** How components that live in the package read tokens the adopter generates is a cross-platform question. It is mine to raise, not to rule.
  - Q12, Q13, row 9's `public` and the colour-construction choice all decide it (§ 5.3; Kenya R1 "What is missing" item 2: "one design question under the acceptance sentence, not four").
  - React Native hits the same wall: a component in `node_modules` cannot import a consumer's generated `tokens.ts` by path (REASONING).
  - If 129's design round rules Q12 and Q13 without the adopter's project in view, C (in 129 or in a later spec) is likely to reopen them, and 128 would inherit a ruling that is about to move.
- **C last keeps Q7 quiet** (REASONING, for Ada and the release owner to confirm). Q7 fires only if a 129 change breaks a *supported* consumer. No native consumer is supported today (the four release entries above). If C ships in the same release as I-1, I-2 and item (iii), or after them, no supported native consumer exists before those changes, so none is broken. The outline calls C "the likeliest way" for Q7 to fire (§ 5.2 Q7). That holds only if C ships *before* I-1 and I-2.
- **Billing.** My pick does not depend on it. Every iOS option needs a macOS runner (§ 5.1 "Common"), and C adds no runner class beyond B's.

**3. Cost**

- **Runner class**: macOS for iOS, a new class (UNVERIFIED that it is free for this public repository). For Android, the ubuntu runners CI already has.
- **Run time**: the same as B, if the harness host *is* the adopter's project (design intent, UNVERIFIED until the tasks round). Kenya measured 2–3 minutes per iOS run, mostly pack, `init` and `generate`. Data's estimate for Android is minutes on a cold cache (REASONING, never timed). C does not add a second instrument. It changes where the host project comes from.
- **Sessions to build**:
  - B on iOS: about two sessions after the generator fixes (Kenya).
  - B on Android: not estimated.
  - C's extra work over B: shipping or scaffolding the project, the walkthrough, and pointing INSTALL and the CHANGELOG at it. **Not sized by anyone.** That is my first directed question below.
- **What must land first**:
  - rows 4–9;
  - item (i);
  - #641, and Lina's L816 fix;
  - Q12 and Q13;
  - row 9's `public`;
  - the colour-construction choice. From the adopter's side, native colour values mean nothing to resolve in their project, and a dependency means they resolve ChromaKit or colormath. Ada's call; Kenya and Data both lean to native values;
  - **a charter scope amendment.** Component distribution is not one of items (i)–(vi), so adding it is Peter's decision, made at this gate.
- **What it stays red on**: everything until item (i) and rows 4–9 land. It never proves behaviour (§ 4), so C's CHANGELOG line carries the evidence kind ("builds; VoiceOver and TalkBack not device-verified"), the two-part badge the orchestrator proposed for 128 (inbound § 3 item 10).

**4. Fold-back**

- **The strongest counter-argument.** C makes 129 bigger and delays 128, the spec carrying story 3, which Peter called "the most optimal from a product strategy perspective". It also takes on a support promise: once a native adopter exists, every later native change becomes a breaking-change question for a real consumer. And I found no record of an adopter asking to start native. That is a scan of this round's records, not an exhaustive search (UNVERIFIED).
- **What it changed in my pick**:
  1. **C goes last, after B is green, with a named split point.** If C's extra work sizes badly, 129 closes on B and C becomes its own spec without redoing anything. The CHANGELOG and INSTALL pointers are then corrected in 129's closing PR, not left saying "Spec 129".
  2. **The harness host is the adopter's project.** That cuts C from "build a second thing" to "hand adopters the thing the harness already builds", and it means a green harness proves the stranger's project, not only our repo's.
  3. **C ships at a bounded evidence kind** ("builds", not "device-verified"). The support promise is then about compiling, which the harness enforces automatically, and not about behaviour no lane checks.
  4. Ordering C after I-1, I-2 and (iii) keeps 129 off the 17.0.0 timeline (§ 2 above, REASONING).
- **The residual that survives**:
  - **128 starts later** by C's extra work, which is unsized.
  - **From then on, native carries a real-consumer cost** that it does not carry today.
  - **That exposes a fork, and the pick is Peter's.** Should C be (a) 129's last unit (my pick: the promise in INSTALL holds, and the binding ruling is tested by an adopter's project before 128 inherits it), or (b) a short spec straight after 129, before 131 (the same work, but 129 closes sooner and is smaller, at the cost of breaking the "Spec 129" pointer to adopters a fifth time)? I recommend against (c), after 128: that keeps "do not start a native product" in place through 17.0.0.
  - **A second fork under it**: does outcome (A)'s "truthful native output" or story 2's "create a new design system on … iOS, and Android" define what 129 owes? I read the later stories as governing; Peter may not.

**5. What would change my mind.** If Kenya or Data finds that no SwiftPM or Xcode shape (or Gradle shape) lets component source in the installed package compile against the adopter's generated tokens without copying, short of Q13 (a)'s everything-through-the-theme redesign. C would then be a component re-architecture, not a packaging step, and I would move it to its own spec straight after 129: fork option (b).

**6. For other seats**

- [@KENYA] Can a Swift package or Xcode project in the adopter's repo compile the SwiftUI component source held in `node_modules/@3fn/core` against the adopter's `generate` output without copying files? I have an UNVERIFIED recollection that SwiftPM requires target sources to sit inside the package root. If that is right, what shape works (a manifest shipped in the package with a path dependency on the generated tokens, symlinks, an xcframework)? And how many sessions does that add on top of your two for B? → design-outline.md § 5.1 Option C -- [LEONARDO R2]
- [@DATA] The same question for Gradle: can a library module in the adopter's repo point its source directories at `node_modules/@3fn/core/…/platforms/android` plus the generated `DesignTokens.android.kt`, and could your B host module be that module, scaffolded? And how many sessions does C add on top of B? → design-outline.md § 5.1 Option C -- [LEONARDO R2]

#### [KENYA R3] — Q5 cross-read

I read all seven entries. Labels: **VERIFIED** = run today on this machine (Apple Swift 6.2, Xcode 26.0.1, iPhone simulator SDK, target `arm64-apple-ios17.0-simulator`). **UNVERIFIED** = not checked.

Every run reused the scratch consumer from my R2 (`@3fn/core@16.2.0`, `init --abbreviation pb`, `generate`, in `kenya-work/consumer/`). There were no new downloads or installs and no repo edits. The new runs wrote only my own files inside that scratch consumer (a `Package.swift` and two probe subfolders).

---

**1. Answers**

**[LEONARDO R2] → [@KENYA]: can a Swift package or Xcode project in the adopter's repo compile the component source in `node_modules/@3fn/core` against the adopter's `generate` output, without copying? And how many sessions does that add on top of B?**

Yes, if the manifest sits at the adopter's repo root. Your recollection about the package root is right, and it does not block this.

- **The shape that works** (VERIFIED). I put a `Package.swift` at the scratch consumer's root with one target, `path: "."`, and listed directories as its sources:
  - `dist/tokens`
  - `node_modules/@3fn/core/src/components`
  - `node_modules/@3fn/core/src/tokens/platforms/ios`
  - `node_modules/@3fn/core/src/blend`

  `swift package describe` accepts it and finds the 43 Swift files. `xcodebuild build` (generic iOS Simulator) reached the compiler in **6.2 s** and failed on today's known parse errors, including the packaged `ContainerCardBase` comment.
  - No file is copied and no symlink is needed.
  - The manifest names directories, not files, so a package update that adds or removes a component needs no manifest edit. That keeps the integration guide's "they improve when you update the package" true.
  - The non-Swift files in those directories (`.kt`, `.css`, `.json`) produce "no rule to process file" warnings, not errors. An `exclude:` list, or a Swift-only output folder, removes them.
- **Your recollection, VERIFIED.** The same manifest in a subfolder (`ios/Package.swift` with `path: ".."`) fails: "target … is outside the package root". A symlink inside the package root pointing up is accepted by `describe` (43 sources). I did not build the symlink variant.
- **Why one module, not two.** All 41 packaged Swift files import only SwiftUI or UIKit (VERIFIED). None imports a token module, so tokens and components must compile as one module.
  - In that one module, the components' `DesignTokens.<name>` reads bind to **the adopter's** generated tokens.
  - So Ada's R2 § 2d item 3 (Q13 (b) would read DesignerPunk's own values) holds only for a package that carries its own tokens. It does not hold for this shape.
  - The adopter's app target then imports the package, which is where row 9 and the components' `public` start to matter.
- **What still has to be built before an adopter's package compiles.** These are prerequisites, not iOS mechanics. Each is VERIFIED unless labelled:
  1. **Generate has to emit DesignerPunk's component tokens into the adopter's output** (Ada R2 § 2d, confirmed).
     - The adopter's `ComponentTokens.ios.swift` holds only `ProgressTokens`. The packaged components read `ButtonIconTokens` and `VerticalListItemTokens` (5 "cannot find" errors).
     - Adding the package's own `dist/ComponentTokens.ios.swift` to the same module is refused outright: `filename "ComponentTokens.ios.swift" used twice`.
     - With one copy renamed, it gives `invalid redeclaration of 'ProgressTokens'`, because `init` scaffolds a `progress.ts` into the adopter's tree, and that collides with the package's own.
  2. **`public` on everything the app reads.** That covers row 9's 105 members, plus the 17 `internal` component views from my R2.
  3. **Q12's theme names.** My consumer uses `pb`, so the defect Lina names in her R2 § 2c is live in it.
  4. **`init` scaffolds the root manifest.** This is a new write into the adopter's root, next to `package.json`.
- **Sessions on top of B, iOS only** (estimate): about **1–1.5**. That covers `init` writing the manifest, the harness building that same manifest with `xcodebuild` once the component tier compiles, and the iOS walkthrough.
  - This does **not** include items 1–3 above. Item 1 is Ada's generator work and item 2 is Lina's public-API pass; neither is sized by anyone.
  - So on iOS, C is cheap as packaging. Its cost sits in the generator, in the component API and in the support promise.
  - The shape I verified is not a component redesign, so your § 5 condition (C would be a component re-architecture) is **not met**.

**[LINA R2] → [@KENYA]: does a two-module type-check miss anything rows 15 and 16 need that a host build would catch?**

No.
- Row 15's `L816` comment is a parse error, and its theme-name defect is name resolution. Both are compile-front-end matters.
- Row 16's `ProgressBarTokens.theme…` / `ProgressBarTokenstheme…` reads are name resolution.
- None of them is a linking, package-manifest or test question.
- Two conditions apply to my lane and to the host build equally:
  - the harness consumer must not use `DP` (your § 2c; mine uses `pb`);
  - the lane runs `-wmo -c`, not a bare `-typecheck`. The bare form misses missing-return and use-before-init errors (my R2). Those are not row 15 or 16 kinds, but the lane should not be weaker than a build.
- **One correction to your pick's wording**: "tokens built as their own module, components type-checked against it" cannot work as written. No component file imports a token module (all 41 VERIFIED). The workable layout is tokens and components in **one** module, plus a separate probe module that does a plain `import`. That is my R2 layout, and it is also the adopter shape above.

**[STACY R2] → [@KENYA]: can the iOS token lane emit the module and library with plain `swiftc`, in about the same seconds as `-typecheck`?**

Yes. On the token file made to compile with stand-ins (my R2 E2), all VERIFIED:
- `-typecheck`: **0.15 s**.
- `-emit-module -c -wmo` (a module plus object code): **0.35 s**.
- `-emit-library` (a linked dylib): **0.77 s**.
  - Without a linker flag, the driver warned `using sysroot for 'MacOSX' but targeting 'iPhone'`.
  - With `-Xclang-linker -isysroot -Xclang-linker <simulator SDK>`, it linked cleanly.

So "compiles" is true for the iOS token tier at about 0.2 s more than a typecheck. I would claim "compiles", not "links", unless the lane links with the explicit sysroot and that is pinned.

**[THURGOOD R3] → [@KENYA]: is per-file attribution stable enough for a per-file pass/fail pin?**

It is stable.
- **VERIFIED**: three `-wmo` runs over the 43 files gave exactly the same 407 distinct diagnostics (file, line, column, text): the run from my R2, a repeat, and a run with the file order reversed. Each run found 34 files with errors.

But a per-file key is too coarse to protect anything during 129.
- 34 of the 43 files fail today. A pin that only records "this file fails" cannot see a new error inside any of those 34. That covers most of the component tier for most of 129.
- Keyed per file, the pin would also miss row 16 regressing inside `ProgressBarBase` while the file was already failing for other reasons.
- **Suggested key**: file + normalised diagnostic text (line and column removed) + count. That is Lina's `file → count` form, refined by kind, and Stacy's § 2d item 1.
- Line and column are stable, but they move with unrelated edits, so they stay out of the key.
- Your comparator design is otherwise unchanged, so "green from first merge" holds with this key.

---

**2. Pick now: held.** B's reach on both platforms, no test runs, two verdicts per platform:
- **iOS**: one module (tokens + components) compiled with `-wmo -c`, plus a plain-import probe module, on a pinned standard `macos-26` runner fed by the ubuntu artifact.
- **Android**: Data's two-library Gradle build.

What the other entries did and did not move:
- **Converged, no move needed.** Lina, Stacy, Thurgood and Data reach the same place: B's reach without test runs, two verdicts per platform. Data's "A is a subset of B" on Android matches what I found on iOS: B's token tier *is* A's verdict, so there is one instrument per platform, not two (Thurgood's point too).
- **Folded in from Leonardo.** The iOS library module uses exactly the source set an adopter's root manifest would use: generated tokens plus the packaged sources in place, as one module. If Peter takes C now or later, the harness moves to `xcodebuild` on that manifest without being rebuilt.
  - I keep `swiftc -wmo` for the measuring lane, because it reports every diagnostic: 407 today.
  - `xcodebuild` stops at the parse layer and showed 36 (VERIFIED, same input). That is too little signal for a list that is supposed to shrink.
- **Folded in from Ada.** Her missing component tokens are a component-tier pin entry under B, and a precondition of C.
- **Not moved.**
  - Ada's "A as the gate": on iOS, A as written is a bare typecheck, which under-proves (§ 3).
  - Leonardo's "C in 129": the remaining decision is about scope, not about iOS mechanics. That makes it Peter's (§ 4).
- **Withdrawn: my R2 fork on the iOS tests**, (x) no test runs versus (y) run the 87 XCTest cases.
  - It is not a separate fork. The 87 tests can only run once the component tier compiles clean, so it is decided by Data's fork (§ 4, fork 2).
  - For the same reason, Thurgood's `harness-ios-tests` job at CLOSEOUT has nothing to run unless that fork goes to "clean".

---

**3. Where I still disagree**

- **Ada**:
  - "A is the token gate" should say *compile*, not *typecheck*, on iOS. A bare `-typecheck` exits 0 on code Xcode rejects, and the fix costs 0.2 s.
  - Her § 2d item 2 ("SwiftPM has no consumer-provides dependency") is true, but the adopter-root manifest sidesteps it (§ 1).
- **Lina**: the two-module wording, as corrected in § 1. Otherwise we agree.
- **Thurgood**:
  - The per-file pin key (§ 1).
  - "No path filter, run on every PR" is right **once a job is required**. A skipped required check stays pending, so a path filter there blocks merges. While a job is still measuring (non-required), Lina's path filter costs nothing and saves macOS runs. The tasks round can switch the trigger at promotion.
- **Data**: his R2 says iOS B "adds a host module, a simulator and Kenya's two sessions". My R2 replaced that: iOS B's reach, without the simulator, costs about 25 s per run and about 1 session.
- **Leonardo**: I agree C is reachable and should be built toward. I disagree that 129 is where it must land; that is fork 1 below, and it is Peter's.

---

**4. Forks Peter must rule** (plain words)

1. **What does "a compiling, themed target" mean for the components?** This was raised by Stacy, Ada, Lina and Leonardo.
   - **(a)** The adopter's generated tokens compile in their own project, and our component source compiles against them in our CI. Components stay reference source. This is B's reach.
   - **(b)** An adopter builds our components from the package without copying anything. This is C.
   - **New this round**: on iOS, (b) is not blocked by tooling. A root `Package.swift` compiles the packaged source in place (VERIFIED).
   - So this is a choice about scope and promises: the generator emits our component tokens, about half the components gain a public API, and native adopters become real consumers, which is the Q7 risk.
   - Under (b), Leonardo's sub-fork follows: C as 129's last unit, or C as a short spec straight after 129.
2. **Must the component tier compile clean before 129 closes?** This was raised by Data, Lina and Stacy.
   - **(i) Clean**: 129 absorbs the repair of the unrecorded component errors (Data's 423 on Android; on iOS, the 200 component errors beyond the rows).
   - **(ii) Close with the remainder pinned** and filed as Lina's record.
   - My R2 test-run fork folds into this one. Tests run only under (i).
3. **When does the harness become a required check?** This was raised by Thurgood: after measured stability during 129, or at CLOSEOUT. It is a real choice, and promotion is Peter's act either way. But it can go to him at the tasks round with numbers in hand. It does not need ruling at this gate.

**Not forks any more**:
- A versus B for the token tier: every seat now reads B's token tier as A's verdict.
- Typecheck versus compile on iOS: settled by measurement, at 0.2 s extra.
- Running tests in 129: decided by fork 2.

#### [DATA R3] — Q5 cross-read

I read all seven round-1 entries. Labels: **VERIFIED** = I ran it; **REASONING** = inference or training data; **UNVERIFIED** = not checked.

This round I made no new downloads, installs or licence acceptances. Every Gradle run below was `--offline` against the caches from my R2 probe. One run needed an artifact that was not cached (`ui-text`), so I dropped that check rather than download it. I re-used Kenya's 16.2.0 consumer (`kenya-work/consumer`, abbreviation `pb`) read-only, and wrote nothing into it.

**What I downloaded and accepted for the R2 probe** (for Peter). Everything is in the scratch directory `…/q5-round/data-work/`, nothing is in the repo, and nothing is installed system-wide.

- **Tools, each unpacked into scratch:**
  - **Eclipse Temurin OpenJDK 17.0.21+9**, macOS arm64, from `api.adoptium.net`.
  - **Kotlin compiler 2.4.21**, from the JetBrains/kotlin GitHub release.
  - **Gradle 9.8.2**, from `services.gradle.org`.
  - **Android SDK command-line tools** (`commandlinetools-mac-9862592_latest.zip`), from `dl.google.com`.
  - Through `sdkmanager`: **Android SDK Platform 36** and **Build-Tools 36.0.0**.
  - The first Gradle run also auto-installed **Android SDK Platform-Tools 37.0.1**, under the licence already accepted below.
- **Libraries, fetched by Gradle into a scratch Gradle home** (about 870 MB including caches):
  - from Google Maven: AGP 9.5.0, the Kotlin Gradle and Compose compiler plugins 2.4.21, the Compose BOM 2026.09.00 and its androidx artifacts, material-icons-extended 1.7.8;
  - from Maven Central: colormath 3.7.1 and coil-compose 2.7.0.
- **Reads only:** the `material-ripple` source jars for seven versions (to read the deprecation level), the `actions/runner-images` Ubuntu readmes, and Maven metadata files.
- **Licences accepted: one, the Android SDK License Agreement (`android-sdk-license`).**
  - I accepted it by piping `yes` into `sdkmanager`. It showed one prompt, and that licence is the only file in the scratch SDK's `licenses/` directory (VERIFIED).
  - GitHub's ubuntu runner images ship with it already accepted.
  - The other downloads carry open-source licences with no click-through. From memory (REASONING): Temurin is GPLv2 with the Classpath Exception; Kotlin, Gradle, AGP and androidx are Apache 2.0; colormath is MIT; coil is Apache 2.0.
- **Size:** the scratch tools take about 1.6 GB and can be deleted with the scratchpad.

---

**1. Answers**

**[KENYA R2]: is Android's 129 instrument the Gradle library module with the Compose plugin, not the JVM lane, with a token verdict and a component verdict?**
- **Yes.**
- **One change to the layout I gave in R2.** I said two modules, `:tokens` and `:components`. That layout gives the component tier **no verdict** while the token tier fails.
  - VERIFIED: `:components:compileDebugKotlin` ran with `--continue` and produced 0 component diagnostics. Gradle stopped at the failed `:tokens` compile.
  - So the Android lane should instead be **one module that compiles both tiers in one compile, with each verdict worked out from the file path**. That is the same shape as your iOS module 1.
  - Add **a small second module that reads the tokens and theme the way a consumer would**. That is Ada's row-2 probe: it provides the emitted `CompositionLocal` and reads it in a composable.
- **Kotlin has no twin of row 9.** The generated Kotlin declares no `internal` members (VERIFIED: grep, 0). So on Android the probe module is there for the theme, not for visibility.

**[LINA R2]: can a `:tokens` module give the Android token verdict alone, so the JVM lane can go? And how long does a warm run take?**
- **Yes on the first part.** The library module gives the same token-tier verdict as the JVM lane: 300 against 302 errors on the same files (VERIFIED, R2). So the JVM lane can go.
- **But use one module for both tiers, not `:tokens` alone** (see Kenya above). With two modules, a red token tier hides the component tier.
- **Run times, VERIFIED on my Mac (Apple Silicon), not on CI:**

  | Run | Time |
  |---|---|
  | Both tiers, Gradle daemon warm, tasks forced to re-run | about 2 s |
  | Both tiers, daemon starting cold | 10 s |
  | Token tier only, no daemon | 7 s |
  | Both tiers, no daemon | 12–17 s |
  | Very first run, with plugin and dependency resolution | 35 s |

- **CI time is UNVERIFIED.** The cost that matters there is restoring or downloading roughly 274 MB of dependency cache. On a GitHub runner I would expect the Gradle step to take under 2 minutes with a cache (REASONING). Pack, init and generate add about 18 s on top (Ada, measured).
- **This also bears on Thurgood's "what would change my mind".** His trigger was a cold run over 10 minutes. Nothing I measured comes near it, but I have not run it on CI.

**[ADA R2]: can a plain-JVM Gradle lane resolve `Dp`, `TextUnit` and `Color` without the AGP library module?**
- **Yes** (VERIFIED). A JVM Gradle module with the Compose compiler plugin compiled a probe that declares `Dp` (`40.dp`), `TextUnit` (`16.sp`), `Color(l, a, b, 1f, ColorSpaces.Oklab)` (the native OKLab form from my R1 item 19) and a `staticCompositionLocalOf` theme.
  - **The Compose plugin checks composable rules on the JVM.** My deliberate error, a plain function reading a `@Composable @ReadOnlyComposable` getter, was reported: "@Composable invocations can only happen from the context of a @Composable function". That corrects my R1 item 4, which said the JVM lane would miss this.
- **Two limits:**
  - The JVM resolves androidx's **`-jvmstubs`** artifacts, not JetBrains' desktop artifacts. These are a separate publication from the `-android` artifacts a consumer's app compiles against. Whether their API ever lags behind the Android one is REASONING, not checked.
  - `FontWeight`, which needs `ui-text`, is **UNVERIFIED**: it was not cached, and I did not download it.
- **What this means for your § 5 condition.** Your condition does not fire: the token tier does not *need* AGP. I would still not build the JVM lane. On the same ubuntu runner, the one-module library build gives the same token verdict in about the same time, and adds the component tier. A JVM lane would be a second Gradle project to keep green, for no added reach. **That is a choice of tool, not a fork for Peter.**

**[LEONARDO R2]: can a library module in the adopter's repo point its source directories at `node_modules/@3fn/core/…/platforms/android` and the generated `DesignTokens.android.kt`? Could my B host module be that module, scaffolded? How many sessions does C add?**
- **Mechanically, yes** (VERIFIED). I built a scratch "adopter" Gradle module that reads, in place and without copying:
  - every `src/components/core/*/platforms/android` directory in Kenya's 16.2.0 `node_modules/@3fn/core`;
  - `src/blend` and `src/tokens/platforms/android`;
  - the consumer's `dist/tokens/*.android.kt`.

  It compiled in 13 s, with **740 errors**: 290 in the generated tokens, 440 in the components and 10 elsewhere. Gradle needs no symlinks and no packaging step. A source directory can live anywhere.
- **It also found three things that block C beyond B:**
  1. **The packaged `Icon-Base/platforms/android/res/drawable/` holds a `README.md`.** AGP's resource merger rejects it ("The file name must end with .xml or .png"). Pointing a module at the shipped resource directory fails the build before any Kotlin compiles (VERIFIED). AGP's ignore pattern did not get around it. **New, and I found no record of it.** The fix is one line (move the README), but only a build that reads the *package* finds it. The repo's tree is not the same input.
  2. **The package's component token enums are not in the consumer's output.** The components failed on `AvatarTokens`, `ButtonIconTokens`, `GeneratedAvatarTokens`, `SizingTokens` and `SpacingTokens` (VERIFIED). That confirms Ada R2 § 2d for Android.
  3. **Q12.** The components hard-code `LocalDPTheme`, and a `pb` consumer's emitted theme would be `LocalPBTheme`, so the theme reads would still fail after item (i) emits. Lina's point 2c, seen from the consumer's side.
- **Can my B host module be that module?** **Yes, and I now recommend building it that way** (folded in below). The harness reads the packed install's own `node_modules` and the consumer's generated output in place. That costs nothing extra over B and keeps C one step away instead of a rebuild. It is also how the `README.md` defect showed up.
- **What C adds on Android, beyond B:**
  - `init` scaffolding the module: about 1 session (REASONING);
  - more than that, the rulings C needs first: the generator emitting the package's component tokens into consumer output (Ada 2d), Q12, a public component API (Lina 2e, Kenya's 17 `internal` views on iOS), and Q7.

  Those rulings are design work I cannot size in sessions.
- **So your § 5 condition does not fire as a shape problem.** Gradle can do it. It fires as a design problem: what the components read, and under which names. **I still keep C out of 129.**

**[THURGOOD R3]: does K2 attribute each error to a file stably enough under the pins for a per-file pass/fail set to be deterministic?**
- **Run to run: yes, exactly** (VERIFIED). I ran the same compile three times with tasks forced to re-run. All three gave the same 1,025 diagnostic lines, identical in file, line, column and message.
- **But a per-file key is too coarse to accept a row.**
  - Of the 30 failing Android component files, **21 have both theme errors and other errors**. Only 6 fail on theme reads alone, and 3 have no theme error at all (VERIFIED).
  - A file stays on a per-file pin until *every* cause in it is fixed. So "row 12 item 3 fixed" (`InputTextBase.android.kt`, 60 errors) cannot be read from the pin until item (i) also lands.
  - **Key the pin by file plus normalised diagnostic, with counts** (Lina 2d's form; Stacy 2d item 1 adds the row id). That key is just as deterministic: the full diagnostic lists matched.
- **The "blocked at parse" exception should apply per file, not per tier.**
  - K2 reported syntax errors and type errors in the same pass across the token files (VERIFIED, R2), so a tier is not blocked at parse.
  - But an unclosed comment hides the rest of *its own file*. `VisualStateStyles.kt` L586 makes everything after it a comment.
  - So: "a PR that fixes a parse error may add pinned entries **in that file**", and nowhere else.

---

**2. Pick now: held, Option B on Android, with four changes taken from other seats' entries**

1. **One Gradle library module compiles both tiers in one compile**, with the verdicts split by file path, **plus a small consumer-side probe module**. This replaces my two-module layout; my own run showed that it hides the component tier.
2. **The inputs are read in place from a packed install**: the package's `node_modules` sources and resources, and the consumer's `generate` output. This is the adopter shape, from Leonardo.
3. **The pin is two-sided and keyed by file and normalised diagnostic, with counts and row ids.** This is Thurgood's comparator with Lina's and Stacy's key. Thurgood's point that a strict pin makes the lane green from its first merge moved me: "measuring lane" now means "non-required, green through its pin", not "red".
4. **The harness consumer's abbreviation is not `DP`** (Lina). Kenya's `pb` consumer already shows why: `LocalPBTheme` against hard-coded `LocalDPTheme`.

**What did not move me:**
- **Ada's separate A gate on Android.** It has the same reach, for one more project to keep green.
- **Leonardo's C in 129.** The shape works, but the rulings it needs are 129's design round and Q7's, not packaging.

**I agree with Kenya's "same reach, different tool" for the two platforms.** Every seat except Leonardo has converged on B's reach (tokens and component source, no test runs, C out of 129). Ada also reaches it, with A's verdict as the first tier.

---

**3. Where I still disagree**

- **Thurgood**:
  - A file-level pin cannot decide row acceptance (see the numbers above).
  - The Android row of his table says `ubuntu-latest`. The runner-images readme says that label moves to Ubuntu 26.04 this month, so pin `ubuntu-24.04` or `ubuntu-26.04`.
  - His 3–6 minute cold estimate is REASONING. My measured times are seconds for the Gradle step, though not on CI.
- **Stacy (2d item 6) and Lina (2a, the A5/A7 row)**: no warning policy is needed. `rememberRipple` is `DeprecationLevel.ERROR` in every `material-ripple` release from 1.7.0 through 1.12.1, and the probe reports exactly the 3 call sites (VERIFIED, R2). Any pin from Compose 1.7 on accepts A5 and A7 by compile alone.
- **Lina (2a)**: she counts "11 files free of both `android.*` and the theme". Counting the two fully qualified `android.*` references (`AvatarPreview.kt` L1036, `IconBase.android.kt` L114), it is 9. Her conclusion does not change: the JVM lane reaches none of her rows.
- **Ada (§ 3)**: "Android unknown until its first run" is now known: 300 token-tier errors at the consumer fixture. Also, "A does not wait on L816 or #641" holds on Android with nothing extra: no Android token file parses a component.
- **Leonardo**: C's binding question is real. Building B in the adopter's shape tests it without committing 129 to shipping it.

---

**4. Forks for Peter, in plain words**

1. **What does "a compiling, themed target" mean for 129?** Stacy, Lina, Ada and Leonardo all name this fork. **It is the real one.**
   - (a) The token files compile in a consumer's own project, and DesignerPunk's component source compiles against them in our build check (B's reach). Native components stay reference source. INSTALL's "planned follow-up (Spec 129)" lines are reworded now.
   - (b) Adopters can build the components in their own project from the package (C). That is inside 129 as its last unit (Leonardo), or as its own spec straight after.

   **I lean (a), with the harness built in the adopter's shape so that (b) is a short step later.**
2. **At CLOSEOUT, what must the component check show?** This is my R2 fork, made sharper by the 21-of-30 entanglement.
   - (i) Every component file compiles clean, so 129 takes on the roughly 440 errors, most of them outside its rows.
   - (ii) Only the pinned entries for 129's own rows (12, 14's A5 and A7, 15, 16) are gone, and the rest is filed under Lina's ownership.

   **I lean (ii).** Under fork 1 (b), (i) is forced.
3. **When does each platform check become required?** (Thurgood.)
   - (a) After measured stable runs, during 129: protection while the files churn, at a cost to every PR.
   - (b) At CLOSEOUT, when its list is empty.

   This is a real cost trade, and promotion is Peter's act anyway. I lean (a) for Android, because it runs on the runner class the gate already uses.

**Not forks, in my view:**
- **Ada's "A gate plus B measuring" against one instrument.** On Android the one module gives A's verdict as its first tier, and the JVM lane works but adds nothing. On iOS, Kenya shows `swiftc` reaches the components either way. That is a tool choice for the tasks round.
- **Kenya's (x)/(y), XCTest in 129 or not.** It is real but small. It changes no row's acceptance, so the tasks round can size it. I lean (x): no test runs in 129 on either platform. On Android the equivalent needs Robolectric, which does not exist here yet.
- **Leonardo's outcome (A) against story 2.** This is fork 1 in other words, not a separate fork.

#### [LINA R3] — Q5 cross-read

I read all seven entries. Labels: **VERIFIED** = I read or ran it today, either at `origin/main` `da128281d` or in the existing scratch logs (no new downloads or installs; the logs read are Data's `data-work/run-android-combined-2.log`, his 423-error run); **REASONING** = inference.

**One new fact first, because it changes how Data's 423 should be read.** In Data's probe, **none of row 12's group B or group C sites reports an error.** That is 38 sites, including `BadgeCountBase.android.kt` L153 and L158 and `ChipBase.android.kt` L259 and L260 (VERIFIED: no `e:` line at any of them). The same run has **65 `Unresolved reference 'dp'` errors in `DesignTokens.android.kt`** (VERIFIED). That is row 6: the token file has no `import androidx.compose.ui.unit.dp`. My reading (REASONING, from how Kotlin's compiler reports): every `Dp` token therefore has an error type, and the compiler does not report a second error on an expression whose type is already an error. So the component verdict is **masked** by the token tier:
- 423 is a floor, not a count.
- Every unit-type defect behind a `Dp` token stays hidden until row 6 lands. That covers group B, group C and the sizing class that `AndroidSizingDpReads` guards.
- Until then, my text guard `AndroidDpTokenReads.test.ts` is the only instrument that sees group B at all. Nothing sees group C.
- Kenya's iOS numbers may be masked the same way, because 99 `Color.oklch` calls do not resolve in the iOS token file (REASONING; I have not checked her log for it).

This changes the pin rule (§ 3, Thurgood).

---

**1. Answers**

**[KENYA R2] to me: "Is `internal` on those 17 component views deliberate, because they are reference source?"**
- **No.** No standard or record sets an access level for native components. A search of `governance/`, `.kiro/steering/` and `docs/` finds no rule for Swift access level (VERIFIED). The split follows no rule either:
  - Badge-Count-Base (first commit 2026-01-23) is `public`;
  - Progress-Bar-Base (first commit 2026-04-03) is `internal` (`struct ProgressBarBase: View`, L38);
  - Button-CTA (2025-11-20) and Input-Text-Base (2025-12-07) are `internal`;
  - Chip-Base (2026-02-04) is `public`.

  All VERIFIED from first-commit dates. Authors chose case by case.
- **Why it has not mattered.** On today's reference-source path a consumer adds the files to their own app target, and `internal` is visible within one module. It matters only when the components are built as a module of their own and used from another one. That is option C, or 128's packages.
- **So**:
  - **(a) In 129, the probe module reads the tokens and the theme only. It does not build any component.** Building one from a second module would test option C's contract inside 129.
  - **(b) I file the 17 as a record of mine**, with your grep as its evidence, Class P2 · defect. Its Trigger is option C's record firing (or any spec that ships the native components as a module). A ballot on the access-level rule (for Component-Development-Standards) rides with it, because once the components are a module, `public` becomes a promise about the API. I will not make them `public` now, because that would promise an API before C designs one.

**[DATA R2] to me: are the component errors outside rows 12, 14, 15 and 16 one new record of mine, or do some belong in an existing row?**
- **Both. Most are one new record, and some already belong to rows.** I sorted your 423 by message and file (VERIFIED from your log; the sorting by kind is mine):
  - **Already 129 rows** (tag them with the row id in the pin):
    - theme reads: `theme`, `LocalDPTheme`, `DesignerPunkTheme`, and the follow-on `backgroundColor`, `textColor` and similar. These belong to item (i), row 2 and row 15.
    - `ProgressBarTokenstheme`, 3: row 16.
    - **Item 3, about 50.** `InputTextBase.android.kt` has 34 "Property must be initialized" errors and 16 "Const … must have an initializer" errors. That matches row 12's item 3.
    - **Button-CTA, 8 + 2.** The compiler says `Cannot access 'val colorActionPrimary': it is private in file`, not "unresolved". The names resolve to Input-Text-Base's `private val`s in the same package, and my 2026-10-26 append in row 12's record already reads it that way. Row 12.
    - `rememberRipple`, 3: row 14, A5 and A7.
  - **Ada's finding, not a component defect.** `AvatarTokens`, `GeneratedAvatarTokens` and `ButtonIconTokens` do not resolve, because the consumer's `generate` output does not carry DesignerPunk's component tokens (ADA R2 § 2d). These are a fact about what the harness reads, and they go with her record, not mine (question below).
  - **No record holds these** (my grep of `.kiro/issues/` finds none):
    - `Container-Base/…/TokenMapping.kt`, 86 errors. It reads `PaddingValue`, `LayeringValue`, `BorderValue` and `BorderRadiusValue`. The component's own type is now `ContainerBasePaddingValue` (`ContainerBase.android.kt` L108, in a doc comment), so these look like names left behind by a rename (REASONING).
    - The comment in `VisualStateStyles.kt` that never closes. REASONING: it probably also causes the 18 `VisualState` and 8 `CheckmarkTransition` errors in Button-VerticalList-Item and -Set, because both enums are declared in that file (L127, L217). So one line may clear about 27 errors.
    - 11 cross-file `private` reads in `ContainerBase.android.kt`.
    - 6 conflicting declarations: `ContainerCardBase` 3, `InputTextBase` 3.
    - 11 opt-in errors.
    - The `CompositionLocalProvider` import in Icon-Base.
    - The remaining type-inference errors.
- **How I would handle them.**
  - **One new record of mine**, P1 consumer-blocking · defect like its siblings. It is filed **at the harness's first committed run, from the harness's own output**, not from your probe. Your probe used different pins and the 15.1.0 fixture rather than a fresh packed install, and it is masked as described at the top.
  - Its Trigger is its own, not 129's requirements.
  - The one-line items (the comment, the import, `private` → `internal`) are fixes I make as soon as the record lands, on my schedule. `TokenMapping.kt` gets a component PR.
  - None of this becomes a 129 row. **I agree with your (ii)**, and I think it is not a separate fork for Peter (§ 4).

---

**2. Pick now: held, refined.** Compile the component tier (B's reach) with no test runs, and gate the tiers one at a time. Option C goes to its own record. Kenya, Data, Thurgood and Stacy chose the same instrument, and Ada's "A gate plus B measuring" is the same build, just phased. So five seats agree on what gets built, and the disagreement is about C and about the pin.

**What moved me:**
- **Kenya**: the iOS lane has to compile (`-wmo -c` or `-emit-module`), not only type-check. Her missing-return and use-before-initialization test settles it. I also take her module layout: one module holding tokens and components, built with `-enable-testing`, plus a probe file that does a plain `import`. Under my R2 layout (tokens as their own module, components compiled against it), the 98 row-9 errors would also land in the component verdict.
- **Data**:
  - My R2 said 11 files were free of `android.*` and the theme. **The right number is 9.** `AvatarPreview.kt` L1036 and `IconBase.android.kt` L114 use `android.` fully qualified (VERIFIED). My conclusion holds: none of the 15 files behind rows 12 and 16 is reachable from a plain JVM build.
  - `rememberRipple` is deprecated at ERROR level from Compose 1.7. So A5 and A7 are compile evidence under any pin from 1.7 on, and my R2 table row that asked for a warning policy is withdrawn.
- **Thurgood**: a required check whose workflow is skipped by a `paths:` filter waits forever. **I withdraw my path filter**, so the lanes run on every PR. Kenya's billing check (standard runners are free on public repos, VERIFIED by her) removes the reason I gave for the filter.

**What did not move me:**
- **Leonardo's C staged inside 129.** See § 3.

---

**3. Where I still disagree**

- **Thurgood: pin by file.** One component file often holds several rows:
  - `InputTextBase.android.kt` holds item 3 and theme reads, plus unrecorded errors;
  - `InputCheckboxBase.android.kt` holds group C, A5 and theme reads.

  Under a per-file key, row 12's fix leaves the file failing, so nothing shrinks, and nobody can tell from git that the row is fixed. That is exactly Stacy's property 1. **Key each entry by file + normalised diagnostic (no line numbers) + row id, and keep a count.** For an iOS `-wmo` run that key is stable if the error message is normalised (Kenya to confirm).

  Masking also needs a third exception to the rule that the pin only shrinks: **a diff that removes token-tier entries may add component-tier entries.** Row 6's PR will uncover group B and group C. The comparator can check this from the diff alone, so it stays inside Thurgood's "no PR-body reading" design.
- **Leonardo: C as 129's last unit.**
  - C needs the component verdict green, which means fixing every component error (423 or more on Android, about 200 on iOS), most of them outside 129's rows. So C inside 129 *is* Data's (i): 129 also becomes the native component repair spec.
  - It also needs Ada's § 2d generator work: emit DesignerPunk's component tokens into consumer output, and inject them, which is not packaging.
  - It needs a public API on 39 components.

  That is three increases in scope, not one more unit. **What I take from him**: Q12 and Q13 must be ruled with C's constraint in view. Ada's § 2d item 3 shows that under C, Q13 (b) would read DesignerPunk's own token values, not the consumer's, which breaks Model B. So the design round names that constraint even though C ships later, so that the ruling does not move.
- **Stacy: promote a verdict when its list empties.** For the component tier that means CLOSEOUT at the earliest, which leaves no protection against regressions during the months when component PRs change the most. I side with Thurgood: promote once the lane has proved stable, Android first, and with the masking exception above.

---

**4. The forks Peter must rule**

1. **What "target" means in 129's acceptance sentence** (raised by Kenya R1, Stacy, Ada and Leonardo). This is the real fork.
   - **(a)** The token files compile in a consumer's own module. DesignerPunk's component source compiles against the generated output in CI. Native components remain reference source. INSTALL's two "planned follow-up (Spec 129)" lines are reworded now, as Ada asks, and C is filed as a record with a trigger. **My lean.**
   - **(b)** C is 129's last unit (Leonardo). This also brings in all native component repair, the generator work and a public component API (§ 3), and it is likely to fire Q7.
   - **(c)** C is a short spec straight after 129, before 131 (Leonardo's own (b)).
2. **When the harness becomes a required check** (Thurgood): once it has proved stable during 129, or at CLOSEOUT when the list is empty. My lean is the first, Android first. Promoting a check is Peter's act in any case.

**Not separate forks, in my reading:**
- **Data's (i) or (ii)** follows from fork 1. Under (a) it is (ii), with the CHANGELOG naming the record. Under (b) it is (i). It would be a fork of its own only if Peter wanted "the components compile" with no qualification and without C, and no seat argued for that.
- **Kenya's (x) or (y)**, whether the 87 XCTest cases run. No 129 row needs them. Thurgood's non-required `harness-ios-tests` job at CLOSEOUT is a cost decision for the tasks round.
- **Ada's rewording of INSTALL and CHANGELOG** is part of fork 1, whichever side is taken.

---

**Directed questions**
- [@ADA] Is "consumer `generate` output carries none of DesignerPunk's 23 component-token groups" (your § 2d) going into a record of yours? Under fork 1 (a), should the harness read the package's own `dist/ComponentTokens.*` from the packed install in place, so the component verdict is not dominated by `AvatarTokens` and `ButtonIconTokens` errors that are not component defects? -- [LINA R3]
- [@KENYA] Is your 200-error iOS component tier masked by the 99 `Color.oklch` calls that do not resolve in the token file, the way row 6 masks group B and group C on Android? If so, your count is a floor too, and the token-to-component exception in § 3 applies on iOS. -- [LINA R3]

#### [ADA R3] — Q5 cross-read

Read all seven round-1 entries in full. Source read with `git show` / `git grep` on `origin/main` at `5c48f3ccb`. Labels: **MEASURED** = I ran it today against the scratch consumer already in `ada-pack/` (packed from `3375c2e79`); nothing new was downloaded or installed. **READ** = read in source. **REASONING** = my inference, not checked.

**1. Answers to the questions addressed to me**

**[@ADA] from [KENYA R2] and [LINA R2]: native colour values or an OKLCH dependency (row 4)?**

**My lean is native colour values, worked out when the tokens are generated, with no runtime dependency on either platform.** The decision itself stays in the design round (outline § 5.3, "Ada decides"), but my lean is firm enough for Q5 to rest on: your two-module `swiftc` lane and Data's Gradle modules need no package to resolve.

Why:

- **The conversion already exists in the repo.**
  - READ: `src/color/OklchConverter.ts` has the OKLCH → sRGB conversion and CSS Color 4 gamut mapping (`toSrgbHex`, `isInSrgbGamut`, `clampToGamut`).
  - The DTCG and Figma export already use it (`src/generators/oklch/OklchExportUtils.ts`, `oklchToExportHex`).
  - MEASURED: every colour in the consumer's `DesignTokens.dtcg.json` is already written as hex.
  - So "native values" means pointing a tested converter at two more outputs. It is not new colour science.
- **The colour space to target is Display P3, not sRGB.**
  - MEASURED: of the 50 OKLCH primitives, 14 are outside sRGB (with the repo's own `isInSrgbGamut`): yellow 300–500, purple 100–200, pink 100–200, green 300–500, cyan 100 and 300–500.
  - REASONING: by my own calculation with the standard matrices (not repo code), 13 of those 14 fit inside Display P3. Only `yellow300` is outside P3 as well.
  - Web emits `oklch()` as it is (120 uses, MEASURED), so on a wide-gamut screen web shows those 14 at full strength. Clamping native output to sRGB would make iOS and Android visibly duller than web for exactly those colours.
  - So my lean is P3 on both platforms: `Color(.displayP3, red:green:blue:opacity:)` on iOS and `ColorSpaces.DisplayP3` on Android. That is one conversion, the same numbers on both platforms, and Jest can test it against reference values.
  - `yellow300` needs one gamut-mapping rule aimed at P3. The repo's `clampToGamut` targets sRGB, so that rule is the new work.
  - Data's `ColorSpaces.Oklab` for Android (his R1 item 19) is the defensible alternative: it is lossless, but iOS has no OKLab, so the two platforms' values would differ.
- **No component changes, and no new token.**
  - The type the components read stays the same: SwiftUI `Color` and Compose `Color`.
  - The iOS file needs `import SwiftUI`, which is 99 of today's 197 errors (MEASURED in R2). The Android file needs the `Color` and `ColorSpaces` imports, which go into row 6's computed import list.
  - No primitive is created or changed, so the token-creation review does not apply. Row 11's OKLCH migration is separate.
- **A dependency does not avoid the gamut question; it moves it to the device, out of view.**
  - `Color.oklch` or colormath would still have to map `yellow300` into the screen's gamut at runtime, by rules we do not own or test.
  - It would also put ChromaKit, colormath and the import into every consumer's project, and a package to resolve into every lane.
  - Kenya's R2 § 5 says her iOS pick moves to B's full Swift-package build if we take a dependency.
- **Data's finding that `colormath-ext-jetpack-compose-jvm` is on Maven Central** clears his R1 worry that a JVM lane could not resolve colormath. It does not change my lean. Resolving it was never the main cost; the main cost is that every consumer has to carry it.
- **No native source reads colour at runtime.** READ: `git grep -il 'oklch\|colormath\|chromakit'` over `src/**/*.kt` and `src/**/*.swift` finds nothing, `ThemeAwareBlendUtilities.android.kt` included. So the generated token file is the only place the dependency lives, and native values remove it entirely.
- **Counter-argument that survives.**
  - Converting at generation time means devices never see OKLCH. Any future runtime colour work on native (blending, dynamic themes) would bring the dependency back, or need its own converter.
  - P3 values also change the shape of all 99 colour lines in one PR.
  - I think both are acceptable. The first is a cost we would pay only when that feature exists, and today the cost is paid by every consumer, on every install.

**[@ADA] from [LINA R2]: does a harness consumer whose abbreviation is not `DP` fit the shared driver?**

Yes, at no cost. `init` takes `--name` and `--abbreviation` (READ, `tests/consumer-integration.test.ts` L258), so the driver takes them as parameters.
- Today's runs already use other abbreviations: the guard uses `TP`, my R2 consumer `PR`, Kenya's `pb`.
- Two settings for the driver:
  1. **The default is a non-`DP` abbreviation and a name other than `DesignerPunk`.** The theme emitter builds `{Name}Theme` from the config. A consumer named `DesignerPunk` would then generate `DesignerPunkTheme`, the very name the components hard-code, and hide row 15 the same way `DP` would.
  2. **Optionally, a second run named `DesignerPunk` with abbreviation `DP`.** REASONING: under Q12 (a), the consumer's own types and the package's fixed names could collide, and only this run would show it. A run costs about 1 s: `generate` 0.5 s and the token compile under 0.5 s (MEASURED in R2). The tasks round can drop it if Q12 rules out a collision.
- Today the abbreviation reaches no native output: `DesignTokens.*` is byte-identical between the repo and my `PR` consumer (MEASURED in R2), because nothing themed is emitted yet. Lina's rule starts to matter at item (i), so it belongs in the driver from day one.

**2. Pick now: changed, as my R2 § 5 said it would be if Data's answer went this way.**

**Pick: B's reach on both platforms, without test runs.**
- **iOS**: Kenya's two-module `swiftc -wmo -c` build.
- **Android**: Data's one Gradle build with `:tokens` and `:components`.
- Each platform reports a token verdict and a component verdict, which become required one tier at a time, the token verdict first.
- All of it runs on one shared packed-install driver under `scripts/`, with a non-`DP` consumer.
- Generated colours are native values (above).
- C goes to its own record and spec, with a trigger.
- Rows 19–22 name their own instruments (my R2 § 2a), not the harness.

**What moved me**
- **Data on Android.** A is a subset of B there: the same token errors (302 against 300), the same ubuntu runner, the `:tokens` task gives A's verdict, and the Gradle step takes 12–35 s. That was my R2 § 5 condition.
- **Kenya on iOS.** `swiftc` reaches the components for about 25 s more, and `-typecheck` misses errors that a compile rejects (missing return, use before init). So my R2 "A as the gate" was a gate on the wrong command.
- **Thurgood and Data.** One job per platform gives both verdicts. That removes the "two instruments" cost I had weighed against B.

**What did not move me**
- **Leonardo's C inside 129.** See § 3.
- **My R2 § 2a stands.** Rows 19, 20, 21 and 22 are not compile questions under any option.

**Corrections to my own R2**
- **On Q7.** My R2 § 2d said C "is what fires Q7". Leonardo is right that this is too strong. Q7 fires only if a change breaks a supported consumer, and today there is no supported native consumer. C shipped last, in or after the release that carries I-1, I-2 and item (iii), breaks no one. What survives of my § 2d is size, not breakage: C forces Q12 and Q13 to take one shape, and turns the component API into a public contract (Lina R2 § 2e).
- **On SwiftPM.** I wrote that a "provided" dependency does not exist (UNVERIFIED). REASONING, not tried: a manifest shipped in `@3fn/core` could depend by a fixed relative path on a small tokens package that `generate` writes into the consumer's project. `node_modules` sits at a known depth from the project root, which is how React Native autolinking finds things. So C may be a packaging step after all. Kenya's answer to Leonardo decides that, not mine.

**3. Where I still disagree**

- **[THURGOOD R3]: the pin keyed by file.** For the token tier this cannot work.
  - Rows 4–9 all fail inside one file per platform: `DesignTokens.ios.swift` has 197 errors (MEASURED), and `DesignTokens.android.kt` has 280 (Data).
  - A per-file pin keeps that file as one entry until every token row has landed. So no fixing PR could show "row 7 fixed", which was the point of the pin (Stacy R2 § 2d item 1).
  - The key has to be a normalised diagnostic (kind plus symbol, no line number), counted per file and tagged with a row id. Stacy's and Lina's forms both do this.
  - Thurgood's own question to Kenya and Data is about whether errors are attributed to files stably. My objection is earlier than that: even a perfectly stable file key is too coarse here.
- **[LINA R2] § 2d path filter.**
  - The list leaves out `src/tokens/**` and `src/color/**`. A changed token value or colour format can break native output with no generator change; for example, the `oklch(` regex at `AndroidFormatGenerator.ts` L343 parses the token source's strings.
  - Once a tier is required, I side with Thurgood: no path filter. A skipped required check either blocks merges or is made to report success, and either way "did it really run" becomes unclear.
  - If a filter is kept while the lane is still a measuring lane, it must include `src/tokens/**`, `src/color/**`, `package.json` and the driver.
- **[STACY R2] § 2a table.** It marks rows 19, 20 and 22 "checkable" under every option. They are checkable, but by the packed-install driver or Jest, not by a compile (my R2 § 2a). The requirements should name those instruments, so those rows are never read as accepted by the harness.
- **[LEONARDO R2]: C as 129's last unit.**
  - I agree with his direction and with his change 2: the harness's probe module should be shaped like the adopter's project, which is cheap.
  - I disagree with putting C inside 129, because C is design work, not a test target. It decides Q12 and Q13, makes component APIs public contracts, and needs pins that act as platform minimums (Lina R2 § 2e). 129's rows are generator defects.
  - Between his fork options I prefer **(b), a short spec straight after 129**, over (a). The cost he names, breaking the "Spec 129" pointer a fifth time, is real. It is fixed by re-pointing INSTALL L159 and L171 in 129's first PR, not at closeout.

**4. The forks I think Peter must rule**

1. **What does the charter's "compiling, themed target" mean for 129?**
   - Stacy, Lina, Data and I raise it; Leonardo answers it the other way.
   - **(a)** The consumer's generated tokens compile in a consumer-shaped module, and DesignerPunk's component source compiles against them in CI. Starting a native product from the package moves to a named follow-up. Most seats pick this.
   - **(b)** It also means an adopter's own project builds the components from the package: C, inside 129 (Leonardo).
   - Data's (i)/(ii) belongs under this fork, not beside it:
     - (i) 129 owes Android components that compile clean;
     - (ii) 129 owes only the rows it names, and the other component errors become a new record.
   - Under (a) I lean (ii).
   - **If (a)**, Peter also says where C goes: a short spec straight after 129 (Leonardo's (b)) or later. That is a sequencing call against 129 → 131 → 128 → 130.
2. **When is each tier made required?** (Thurgood R3)
   - Either on measured stability during 129, which protects against regressions while the files change most but makes every PR depend on the macOS runner, or at CLOSEOUT.
   - Making a check required is Peter's act in any case, so this is his.

**Not forks for Peter, in my reading**
- **A against B.** Six of seven seats now pick B's reach, and on Android A is a subset of B. Peter can rule "B's reach, no test runs" without a contest.
- **Kenya's (x)/(y), running the 87 XCTest cases.** No 129 row is accepted by them, so the choice changes no row's acceptance. Thurgood's non-required job, dispatched at CLOSEOUT, is a cheap middle, and the tasks round can settle it.
- **Colour construction.** My call in the design round, now stated (§ 1), so Q5 does not wait on it.
- **The pin's key and the path filter.** Seat-level harness design for the tasks round (§ 3).

#### [STACY R3] — Q5 cross-read

I read all seven entries: `[KENYA R2]`, `[DATA R2]`, `[LINA R2]`, `[ADA R2]`, `[LEONARDO R2]`, `[THURGOOD R3]` and my own `[STACY R2]`. Nothing was re-run. Every number below is the named seat's measurement, not mine. My lens is unchanged: at CLOSEOUT, which rows can I check against a run I can read, without asking the author.

**First, three corrections to my R2**, each coming from another seat:
- **Rows 19–22 are not compile rows.** My R2 table put rows 19, 20, 22 and part of 21 under "token tier, checkable by a compile". Ada's table (`[ADA R2]` § 2a) shows that each one is accepted by a Jest test, by `tsc` or by the packed-install driver. They need their own named instruments in the requirements, and Q5 does not settle them.
- **My property 6 (a warning policy for A5/A7) is no longer needed.** Data read the published source: `rememberRipple` is `DeprecationLevel.ERROR` from Compose 1.7 onward (`[DATA R2]`, VERIFIED by Data). His probe reports exactly 3 errors, at the three call sites. What replaces the property is that the harness pin must be Compose 1.7 or later, and the pin file must say so.
- **"Type-checks" does not hold for iOS components.** Kenya showed that a plain `swiftc -typecheck` exits 0 on code the compiler rejects at `-c` / `-emit-module -wmo`: a missing return, and a constant used before it is set (`[KENYA R2]`, VERIFIED). So a CHANGELOG "compiles" line on iOS needs the `-c -wmo` lane. It answers my R2 question to Kenya: yes, and that lane is the one to use.

---

**1. Answer to the directed question**

> [@STACY] Does a row PR's pin-shrink diff, together with a green `harness-<platform>` context on the unit PR, meet your bar for "accepted by a compile" without consulting the author? Or do you need the comparator's printed per-file list cited in the completion doc as well? -- [THURGOOD R3]

**Yes, the shrink diff plus the green context is the right evidence shape, but only under four conditions. And no, I do not want the per-file list copied into the completion doc.**

**I do not want the list copied.** A list pasted by the author is a self-attested copy, and it can drift from the truth. The permanent record is the git diff of the list file. The completion doc should cite three things:
- the PR;
- the run URL at the head the unit merged;
- the comparator's one summary line, pasted as it printed.

The summary line has to show the expected count, the observed count, new failures, stale entries, and files compiled against the floor. That follows the precedent of the `in-lane-guards` count line. The wording of that line is Thurgood's, as the instrument's owner.

**The four conditions:**
1. **Each list entry is a diagnostic, tagged with a row (see the check against my six properties below).** If entries are whole files, almost no token row can be accepted on its own. Rows 3–8 and 10 all live in the same two or three token files. Data counts 280 errors in `DesignTokens.android.kt` alone, and Kenya counts 207 iOS token-tier errors in 2 files. A row-7 fix removes nothing from a file-keyed list, because the file still fails for rows 4, 5, 6 and 8. So "row 7's PR removed these three files" (Thurgood's own example) cannot happen for the token tier.
2. **The row's entries were on the list at the baseline.** A row whose defect the lane never saw cannot be accepted by removing entries; there is nothing to remove. Two cases are concrete:
   - Row 15's theme-name defect does not show in a consumer abbreviated `DP` (`[LINA R2]` 2c).
   - Row 9 does not show without a second, plain-import module, and the shipped `@testable import` tests cannot show it (`[KENYA R2]`, VERIFIED).
   Both can be checked from git: did the baseline commit of the list hold entries tagged to that row? If not, the row needs another instrument, and the requirements say so by name. Kenya's "would it have caught this" check against each defect record is the build-time version of this condition. I support it.
3. **The verdict I read is the one at the head the unit merged, and I read it at every 129 merge, not only at the merge that carries the row.** While the lane is non-required, a PR can add an entry, take a red check, and merge anyway. After that merge, the next PR's base already contains the added entry, so the comparator's "added since base" rule never sees it again. Self-enforcement only bites on the merge path. Until then, a red harness context at any 129 merge is a finding on the author.
4. **The completion doc pairs a green with what it means.** During 129, a green `harness-<platform>` means "the failures match the list". It does not mean "compiles" (Ada's second residual; Thurgood's own "green from first merge"). A completion doc or CHANGELOG line that cites the green as "compiles", while entries tagged to that tier remain, is a claim beyond its evidence, and I would record it as one.

**Thurgood's two-way list, checked against my six properties:**

| My R2 property | Thurgood's design | Result |
|---|---|---|
| 1. Committed list, each entry keyed by row id, file and normalised diagnostic | committed, in `harness/`; **keyed by file**, one sorted line per file | **Not met.** It needs a diagnostic key (Kenya: by diagnostic; Lina: file plus kind of error plus count) and a row or record tag on each entry. Data's ~423 component errors outside the rows (`[DATA R2]`) need a record path as their tag, which is his own fold-back, to a new record of Lina's. |
| 2. Two-sided (a new failure and a stale entry both fail) | yes: "new failure" and "unexpected pass" | **Met at file grain only.** A new error in a file that already fails is invisible, so a regression can hide inside `DesignTokens.*` for all of 129. A diagnostic key fixes this too. |
| 3. Fails on zero, with a floor | yes: a floor that includes zero, plus "toolchain missing" | **Met.** One addition: a tier shown as "blocked at parse" must never count as passing for the rows behind it. Thurgood already says so, and Data now reports K2 shows both layers in one pass, so this case is likely to be rare. |
| 4. Additions readable | **better than my proposal**: the comparator itself fails on any entry added since the merge base, so no PR body has to be read | **Met on the merge path, with two gaps.** (a) Non-required phase: see condition 3. (b) The pin-bump exception lets a PR that changes the toolchain pins add any number of entries. That is legitimate sometimes, and it is also the one route by which the list can be widened unseen. The comparator should print each entry added under the exception, and each such entry should carry its record tag like any other entry. His Jest falsification test, registered in `in-lane-guards.json`, also fires my ARMING read on that file, which covers weakening of the comparator itself. |
| 5. Pinned toolchain, runner image included | pins in `harness/`; `runs-on: macos-NN`; Data adds `ubuntu-24.04` (because `ubuntu-latest` moves to 26.04 this month); Kenya pins Xcode through `DEVELOPER_DIR` | **Met.** One limit I carry: Kenya verified that GitHub replaces an Xcode patch version when the next one ships. So my re-run of an old SHA is possible only for a limited time. That is why the run URL and the list's SHA go in the completion doc at merge time, not later. |
| 6. Warnings captured for A5/A7 | not needed | **No longer needed** (Data, above). It is replaced by "Compose pin ≥ 1.7, stated in the pin file". |

**Two properties I add after this round**, both from other seats:
- **7. The input can show each row's defect.** Concretely:
  - the harness consumer uses an abbreviation that is not `DP` (Lina);
  - a plain-import probe module, for row 9 (Kenya);
  - a product-token fixture, for row 13 and for `ProductTokens`. Ada and Kenya both noted that the scratch consumer generates no product tokens.

  If the input cannot show a row's defect, the list never holds that row's entries, and condition 2 then fails for it.
- **8. A required green is labelled with what it proves.** Once a context is promoted while it still has list entries (see § 2), "required and green" reads to everyone as "compiles". The context name or its summary line must carry the remaining count. Without it, a careful reader's first assumption is the wrong one.

---

**2. Pick now: held, with two refinements**

**I hold the pick: B's reach on both platforms, no test runs, one instrument per platform reporting two tiers, entering as a lane run against an expected-failure list.**

**What moved me:**
- **A versus B is no longer the question.** Data measured that on Android A is a subset of B: the same token errors (302 and 300), the same ubuntu runner, and seconds apart. Kenya measured that on iOS, plain `swiftc -c -wmo` reaches the components in about 25 s with no host module and no simulator. Ada's hybrid (A as the gate, B measuring) is, on Data's and Thurgood's reading, the same single instrument per platform, with the token tier as its first verdict. Lina, Kenya, Data, Thurgood and Ada all now point at the same instrument.
- **The iOS tool is Kenya's two-module `swiftc -c -wmo`, not R2's "host module".** Her exception stands: if Ada's colour decision (row 4) takes a dependency, the iOS lane has to become a Swift package built with `xcodebuild`. On Kenya's table, that is the only option that proves the package resolves and links.
- **On promotion, I now side with Thurgood: promote on measured stability, not on an empty list.** My R2 said "required once its list is empty". That leaves the condition-3 gap (adding an entry, then merging over red) open for all of 129, the period when the list changes most. Promotion is Thurgood's instrument act and Peter's merge, and it fires my ARMING read each time. It does not make any claims pass a gate.

**What did not move me:** Leonardo's C (§ 4 below). Its checkability is B's plus a distribution path. The argument for it is about what 129 should promise, which is Peter's to decide, not something the evidence settles.

---

**3. Where I still disagree**

- **Thurgood: the list keyed by file.** For the reasons above (conditions 1 and 2, properties 1 and 2), it makes the token rows impossible to accept one at a time, and it hides regressions inside files that already fail. His question to Kenya and Data, whether files are attributed stably, matters less than this. The key has to be the diagnostic. Lina's "file, kind of error, count" is the cheapest form that both I and the conflict-hotspot fold-back can live with.
- **Thurgood: the pin-bump exception, as written.** Keep the exception, but every entry it adds should be printed and tagged with a record, or it is the open route by which the list can be widened.
- **Ada: "A is the gate from the harness unit's first PR".** I agree with the substance. But on Android there is no separate A lane to gate (Data), so the thing being gated is the token verdict of the one instrument. I raise this only so that the requirements name one CI context per platform, not two. Otherwise the claims pass would be reading a context that does not exist.
- **Leonardo's table, "C: the 'do not start' line is removed".** That holds for building only. His own caveat ("Screen-reader behaviour is not device-verified") is right, and with no behaviour rung the evidence would support only "builds". I am not disagreeing with his pick, only noting that its CHANGELOG line has the same behaviour limit as B's.
- **Data's CLOSEOUT shape** (`:components` closes with no entry from rows 12, 14 A5/A7, 15, 16; the rest goes to a new Lina record). I agree, and it is checkable only with row-tagged entries (condition 1). I add one thing: the new record must exist and be cited by the entries before CLOSEOUT. An entry tagged to nothing at CLOSEOUT is a finding.

---

**4. The forks Peter must rule**

1. **What 129's acceptance sentence means by "target".** Six of seven seats now name this: Kenya, Lina, Ada, Leonardo, Data and me. Thurgood leaves C out of 129 without naming the fork.
   - **(a)** The token files compile in a consumer's own project, and the component source compiles against them in the repo's harness. Option C becomes its own record or spec with a trigger. This is the reading of Ada, Lina and Data.
   - **(b)** A stranger's own project builds the components from the package. That is C, either as 129's last unit (Leonardo) or as a short spec straight after 129 (Leonardo's fallback).

   **Whichever he picks, the shipped pointers must match it.** INSTALL L159 and L171 ("a planned follow-up (Spec 129)"), the integration guide's walkthrough line, and CHANGELOG L44 and L118 make promises that only (b) keeps. Under (a), those sentences become false the day 129 closes. I would name them at the release read, but naming them after they ship is the expensive way. Ada's fold, re-pointing them in 129's first PR, is the cheap way. The wording is the owners' to write, not mine.
2. **How much of the Android component breakage 129 owns.** Data measured 423 errors in 30 of 39 files, and only 65 of them are theme reads. Several classes of error have no record: the nested comment, the misplaced import, the undefined `PaddingValue`, the cross-file privates.
   - **(i)** 129 owns all of them, so its CLOSEOUT condition is an empty component list.
   - **(ii)** 129 owns only rows 12, 14 A5/A7, 15 and 16, and the rest goes to a new record with a trigger. Its CLOSEOUT condition is then "no entry tagged to those rows".

   This changes 129's size and its CLOSEOUT condition, so it is a real fork. I do not pick it. Under either answer the condition is checkable from git, provided the entries are tagged.

**Not real forks at this gate, in my reading:**
- **A versus B.** Data's and Kenya's measurements dissolved it.
- **Thurgood's promotion timing (measured stability versus empty list).** It is instrument mechanics. Peter already acts at each promotion (`EXPECTED_CONTEXTS`), and the tasks round can carry the criterion. Peter can still take it as a fork if he wants to.
- **Kenya's (x)/(y): XCTest runs in 129 or not.** No 129 row needs the 87 tests (Lina, Kenya), and running them is the behaviour rung, not the compile rung. It is a follow-up with a trigger, not part of Q5.
- **Ada's row 4 (colour dependency or native colour values).** It changes how much the iOS lane costs and which tool it uses, not what Q5 proves. It belongs to the design round, and it flips Kenya's tool if it goes the dependency way.

#### [THURGOOD R4] — Q5 cross-read

I read all seven entries. Labels: **VERIFIED** = read in the tree or in a seat's entry, where that seat's own label was VERIFIED or MEASURED; **REASONING** = inference or GitHub's documented behaviour, not checked on this account. I ran nothing new.

**1. Answers**

- **[STACY R2]: does the expected-failure list join the ARMING instrument-path list (a ballot), or does the harness enforce it itself?**
  **The harness enforces it itself, and no ballot is needed for 129.** Your six properties can be enforced by the harness's own check, without a law change:
  - **Property 1 (a committed, keyed list).** The list's file format carries the key. Each entry is: file, normalised diagnostic kind, count, and a `record` field naming a § 3 row or a `.kiro/issues/` path. Line numbers are never part of the key.
  - **Property 2 (two-sided).** The comparator fails if a file's count goes above its pinned count, and also if it goes below. So a fix and its list edit land in the same PR.
  - **Property 3 (fails on zero).** The floor counts the files that actually reached the compiler. A list entry does not count towards the floor.
  - **Property 4 (an addition is readable as a finding).** The comparator reads the list at the merge base (`git show origin/<base>:…`). It fails on any added entry, or any raised count, unless the same diff also changes the toolchain pins under `harness/`. It also fails on any entry whose `record` does not resolve at the PR's head. That gives your "each added entry names a record" a check, not a reading. It covers the same ground as `pending.json`'s header-and-entries read. It does not depend on the PR body, so it needs no credentialed read.
  - **Properties 5 and 6** are the pinned runner label and Xcode, and Data's ERROR-level `rememberRipple` (below).
  - **Where this falls short, and why it still needs no ballot.** While a lane is non-required, a red comparator does not stop the merge. In that window an added entry can merge with a red check on its PR. Your CLOSEOUT pass already covers it without a new trigger: `git log -p -- harness/expected-failures/` over 129's range lists every addition and the run at each merge. Once a tier is promoted, the check blocks the addition before merge. The promotion is a change to the required set, so your ARMING row fires there anyway.
  - **Whether the comparator should join the instrument-path list** belongs in that promotion's record, after 129. It does not belong in this round.
  - **The comparator itself is guarded without a ballot.** Its falsification test covers the four red reasons, shrink-only, and an unresolved `record`. It is a Jest file under `scripts/__tests__/`, run in `lane-functional-root`. Adding it to `.github/in-lane-guards.json` is my P1b act. So weakening the comparator to "always pass" fails a check that is already required.

- **The coordinator's question: does Data's 12–35 s fire my change-my-mind fact ("over 10 minutes cold")?**
  **No. It does not come close.** Data measured 35 s cold for the JVM token lane, 13 s for the library token module and 12–17 s for tokens with components, all local, with about 274 MB of Gradle module cache (DATA R2, VERIFIED).
  - On CI, a cold run adds that download plus AGP set-up. REASONING: that is a few minutes at most. Even several times Data's figures stays under the 125-A ceiling.
  - Kenya's iOS compile is 24.9 s for all 41 files (KENYA R2, VERIFIED). Ada's packed install is about 18 s warm (ADA R2, MEASURED).
  - So the component tier stays on every PR. The fact is still the one I would act on, but only as a measured CI cold run. The promotion criterion records that measurement, and it is not taken yet.

- **My R3 question to [@KENYA] [@DATA] (is per-file attribution stable?)** Data's answer changes my pick: K2 reported its syntax errors and about 270 type errors on `DesignTokens.android.kt` in one pass (DATA R2, VERIFIED). Kenya and Lina both key by diagnostic or by kind. See § 2.

**2. Pick now: held in kind, changed in three mechanics**

Held: **B's reach (token files and component source compiled) on both platforms, with no test runs. A strict two-sided pinned list keeps each lane green from its first merge. Each verdict is promoted to required on measured stability, not on an empty list. A new `native-harness.yml`. Option C is out of 129.** Six seats now converge on B's reach without tests (Kenya, Data, Lina, Stacy, Ada's hybrid, and me). On Android, A is a subset of B (Data). On iOS, plain `swiftc -c` reaches the components (Kenya). So "A versus B" no longer splits anyone except on when each tier is promoted.

What the others changed:

1. **Four verdict contexts, not two.** I had one job per platform with two tiers as steps. A step cannot be made required on its own, so that shape cannot promote the token tier ahead of the component tier, which Stacy, Lina, Data and Ada all want. So there are four compile jobs: `harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens` and `harness-android-components`. Each promotion is Peter's act, and each adds one context to `EXPECTED_CONTEXTS` (19, up to 23 at most). `complete-task.sh`'s `REQUIRED_WORKFLOWS` goes from 6 to 7 at the first promotion.
2. **Generate once, then compile (Ada, Kenya).** A `harness-generate` job on ubuntu runs Ada's standalone driver and uploads the generated output as an artifact. The four compile jobs download it. So the macOS jobs need no Node, and they run for about a minute.
   - **A trap this layout creates, which I am adding.** REASONING, from GitHub's documented behaviour: when a job a compile job `needs` fails, the compile job is *skipped*, and a skipped required job reports success. A broken driver would then turn every promoted compile context green. So each compile job runs under `if: ${{ !cancelled() }}`, and its floor fails when the artifact is missing. That is the did-it-really-run rule applied across jobs.
3. **The list key is file, kind and count, and the parse-layer exception is gone.** Under a per-file key, a file that is already failing hides any new error in it. With 30 of 39 Android files and 32 of 41 iOS files failing today (DATA R2, KENYA R2), that would have hidden almost everything during 129. Lina's `file → kind → count` form, the one `AndroidDpTokenReads` uses, catches a regression inside a failing file and does not move with line numbers. Data's one-pass K2 result removes the reason for my exception (b), so the only allowed addition is in a toolchain-pin diff. A layered reveal, if one still happens, is an addition with a `record`, read at CLOSEOUT.

Also adopted:
- **Pin the ubuntu label** (`ubuntu-24.04`) as well as `macos-26`. Data VERIFIED that `ubuntu-latest` moves to 26.04 this month.
- **Kenya's `-wmo -c`, not `-typecheck`.** A plain typecheck passes code a build rejects (KENYA R2, VERIFIED).
- **Lina's non-`DP` abbreviation for the harness consumer.** It costs nothing and is the only way row 15 can show.
- The XCTest job leaves my pick. Kenya's fork (x)/(y) decides it (§ 4).

**3. Where I still disagree**

- **Stacy: "each verdict becomes required once its list is empty".** I would promote on measured stability, with the list not yet empty.
  - Data's fork (ii) shows why: 129 may close with the component list pinned and the remaining errors on a new record. Under your rule, the component tier would then never be promoted, and it would protect nothing after 129.
  - The two-sided list is what makes a green with entries still on it honest. Your six properties are the reason I am comfortable promoting it.
- **Stacy and Lina: path filters on the lanes.** These are fine while a lane is non-required. Once a lane is required, a workflow-level `paths:` filter leaves the check "Expected — waiting" on every unrelated PR, so the merge blocks (REASONING, GitHub's documented behaviour). A job-level skip reports success, which weakens the floor.
  - With Ada's artifact layout, a run costs about 2–3 min on ubuntu, in parallel, plus about 1 min on macOS. Run on every PR.
- **Ada: "Option A is the gate from the harness unit's first PR".** I agree in substance; the difference is the instrument and the timing.
  - On Android, A is a subset of B (Data), so the token gate is `:tokens` in the library build, not a separate JVM lane.
  - Making any context required on its first PR skips the 125-A step of measuring first. That costs a few PRs of waiting and buys a cold-run number and a flake count before Peter's promotion act.
- **Leonardo: C as 129's last unit.** CI mechanics do not decide this. C's harness costs nothing beyond B's if the host is the adopter's project. My disagreement is about scope, not cost: C is unsized, and Ada's MEASURED finding stands (the 23 DesignerPunk component token enums never reach the consumer's output). So C is distribution design, not a final packaging step. I would take your fork option (b) over (a).

**4. The forks Peter must rule, in plain words**

1. **What "target" means in the charter (Stacy, Lina, Ada, Leonardo).** Does 129 owe "our component source compiles against a consumer's generated tokens, in our CI" (B's reach)? Or "a stranger builds the components in their own project from the package" (C)?
   - If C: inside 129 as its last unit (Leonardo), or a short spec straight after it (Leonardo's (b), and my lean).
   - Whichever he picks, INSTALL's two "planned follow-up (Spec 129)" lines are reworded in 129's first PR (Ada).
   - The fork is real. It changes what is built, and it changes the charter's words.
2. **The component errors that no record covers (Data).** About 423 Android component errors (DATA R2), most of them in no record. Does 129 grow to repair them, or close with them pinned and filed as one new record of Lina's? The fork is real, and it sets 129's size.
3. **When a verdict becomes a required check.** On measured stability, with the list still non-empty (my pick), or only once its list is empty (Stacy)? Under fork 2's second answer, "when empty" means the component tier is never required in 129. The fork is real and small, and it is about the gate, not about what is built.
4. **Whether the 87 iOS tests run in 129 (Kenya's (x)/(y)).** A real choice, but a small one. In CI it is one non-required macOS job, and it changes no row's acceptance. It could go to the tasks round, unless Peter wants behaviour evidence in 129.

**Not forks** (settled by measurement):
- **A versus B on Android.** A is a subset of B (Data).
- **Typecheck versus compile on iOS.** Compiling costs seconds, and only compiling is honest (Kenya).
- **macOS billing.** Standard runners are free on a public repo (Kenya, VERIFIED from GitHub's docs).
- **The warning policy for A5 and A7.** `rememberRipple` is an error from Compose 1.7 (Data, VERIFIED).

**One item outside Q5.** All 11 jobs in today's required gate run on `ubuntu-latest`, and that label moves to 26.04 this month (Data, VERIFIED). That puts the existing gate on a new image with no repo change. Re-pinning those jobs is a runner change, which is outside my P1 scope, so it needs an issue-row grant or Peter. It needs a record of its own, and I will file one if the orchestrator agrees.

#### [LEONARDO R3] — Q5 cross-read

I read all seven round-1 entries in this directory: `kenya-r2`, `data-r2`, `lina-r2`, `ada-r2`, `stacy-r2`, `thurgood-r3`, and my own `leonardo-r2`. Labels: **VERIFIED** = I checked it today; **CARRIED** = a named seat's measurement, not re-run by me; **REASONING** = my inference. No downloads, no installs, no repo edits.

**1. Answers to directed questions**

- **None of the seven entries addresses a question to me.**
- **My own question to Kenya and Data** ([LEONARDO R2]: can packaged component source compile against an adopter's generated tokens without copying?) is not answered in anything I can read. Their answers are being written in parallel with this entry.
  - **What would settle it**: a toy run on each platform, from the scratch consumers already on disk (`kenya-work/consumer`, `ada-pack/consumer`), with no downloads.
    - **iOS**: a Swift package at the consumer's root, whose single target lists sources from `node_modules/@3fn/core/…/platforms/ios` and from `dist/tokens/`. Does `swift build` accept sources from both folders?
    - **Android**: a Gradle module whose source folders point at the same two places.
    - **Why the shape matters**: if one module in the adopter's project can hold both our components and their tokens, the components never become public API. Row 9's `public`, Kenya's 17 `internal` views and Lina's 2e concern then fall away for that shape. If no such shape works, C needs Ada's d.2 redesign.
  - **That answer no longer decides my pick.** It decides what C's own record costs (§ 2).

**2. Pick now: changed.**

I now pick **B's reach, compiled without test runs**: the shape Kenya, Lina, Stacy and Thurgood converge on.
- **What it compiles**: the token files and the component source, against a packed install's `generate` output.
- **What it reports**: a token verdict and a component verdict per platform.
- **How it starts**: as a measuring lane with a two-sided pinned list.
- **C leaves 129** for its own record.

My adopter case does not go away. It becomes four conditions on that pick, below.

**What moved me** (all CARRIED unless marked):

- **The components do not compile, on either platform, for reasons well beyond theme emission.**
  - **Android** (Data): 423 errors in 30 of 39 files. Only 65 of them are theme reads. The rest include parse defects, a misplaced import, a `PaddingValue` type nothing defines, and cross-file private reads, none of them recorded.
  - **iOS** (Kenya): 200 component errors across 32 files. Also, 17 of the 39 main views are `internal`.
  - **Why this matters for C**: C hands adopters the component source, so it is only worth shipping once that source compiles clean. In R2 I staged C "after B is green". These numbers say B's component verdict may not be green by 129's CLOSEOUT at all (Data's fork (ii)). So C inside 129 really means Data's fork (i): 129 absorbs a native component repair no one has sized, plus the 17 views made public.
  - That is a different spec from the one I argued for. My R2 assumed the gap between B and C was distribution. The gap is component repair first, and distribution second.
- **Ada's d.2, the binding problem.** A package sitting in `node_modules` cannot depend on a module the adopter generates in their own tree. So C needs either everything read through an injected theme, or components written into the adopter's tree.
  - That is the "what would change my mind" fact I named in R2, though as Ada's reasoning, not yet a measurement.
  - It may be avoidable by the one-module shape in § 1, which is unproven.
- **A correction of Peter's premise.** I think this is worth putting to him plainly.
  - His message 7 says native is experimental because "we haven't tested connecting them to XCode or whatnot for Android".
  - This round measured the step below that one: the component source itself does not compile, before any Xcode or Gradle project is involved.
  - So the order of proof I gave in R2 holds (compile, then connect, then device), and 129's honest job is the first rung, done properly.

**What did not move me:**

- **Ada's d.1 is not a cost of C. It is 129's chartered item (ii).**
  - VERIFIED in `ada-pack/consumer`: the consumer's `dist/tokens/ComponentTokens.ios.swift` holds one enum (`ProgressTokens`). The packed `node_modules/@3fn/core/dist/ComponentTokens.ios.swift` holds seven.
  - The charter's item (ii) reads: "DesignerPunk's component token definitions must reach the consumer's own generated output."
  - So that work lands in 129 whatever Q5 picks. And B's component verdict, compiled against consumer output, cannot go green without it.
  - It should be a row in the harness's pinned list, not an argument against C.

**My four conditions on B** (adopter-side; each is cheap):

1. **The adopter-facing promise is re-pointed in 129's first PR, not at CLOSEOUT.** I agree with Ada's fold item 1. Three places currently promise that 129 brings native onboarding:
   - INSTALL L159 and L171 ("a planned follow-up (Spec 129)");
   - the integration guide's walkthrough stub ("written when that lands (Spec 129)").

   Each moves to C's record, and the CHANGELOG states what the harness proves. Otherwise we break the "Spec 129" promise a fifth time, and silently.
2. **The harness consumer is adopter-shaped.**
   - It is a packed install (already agreed).
   - It uses an abbreviation other than `DP` (Lina 2c). Strongly agree, from my seat: a `DP` consumer is the one consumer no adopter will ever be.
   - Its compile layout is kept so that C can reuse it (Thurgood: "C stays reachable later without rebuilding the harness").
3. **C's record has an event trigger, not "the first adopter asks".**
   - DesignerPunk has no channel where an adopter's ask would be seen, so that trigger can never be checked.
   - Instead: **the component verdict is green on both platforms, or 128's distribution design opens, whichever comes first.** The record also states plainly that **story 2's native half is unmet** until it closes.
4. **129's design round rules Q12 and Q13 with C's binding in view.**
   - Ada's d.3: under Q13 (b), components that read `DesignTokens.<name>` get the adopter's values only if they are compiled inside the adopter's module.
   - Ruled without C in view, Q13 (b) could quietly rule out a pre-built native package later. React Native in 128 meets the same question.
   - This is a note for the design round, not a gate fork.

**3. Where I still disagree** (each is narrow)

- **Ada, "C fires Q7".** I still read Q7 as firing only when a *supported* consumer breaks, and no native consumer is supported today. It no longer drives my pick, but it should not be carried forward as settled. And "C belongs in 128's neighbourhood" is half right: native distribution is not 128's work, but the binding question is shared with 128 (condition 4).
- **Lina, "nobody has asked for it yet".**
  - Peter's story 2 is the ask, and we have printed "Spec 129" to adopters three times.
  - Her trigger ("the first adopter asking") is the one I would not use (condition 3).
- **Data, fork (ii).** I agree with his lean (129 closes with the component list pinned, plus a new record), on one condition. The CHANGELOG must say what he wrote: "the component source compiles except for N pinned errors, recorded at <path>". It must not say "the components compile".
- **No disagreement with Thurgood or Stacy.** Their mechanics (the two-sided, shrink-only list that fails on zero; one instrument per platform) are what make B honest to an adopter reading a green check.

**4. The forks Peter must rule, in plain words**

1. **What does "a compiling, themed target" in 129's charter mean?** Stacy, Ada and Lina all raise this. It is the real fork, and it is one fork.
   - **(a) Narrow (my recommendation).** The token files compile in an adopter-shaped project, and our component source compiles against them in our build check. Adopters still cannot start a native product after 129. We say so now, and C gets its own record.
   - **(b) Literal.** An adopter can build our components from the package. 129 then absorbs the native component repair (Android's 423 errors, iOS's 200, and the 17 views made public) and the distribution design, and it delays 131, 128 and 130.
   - **What survives against (a)**: story 2 stays false for its native half through 129. That is the one cost only Peter can accept.
2. **Must the component source compile clean by 129's close, or may it close with the remaining errors pinned and recorded?** This is Data's fork, and it is real. From the adopter's side it changes little: under either answer, adopters still cannot start native until C. It mainly decides 129's size. I lean to "pinned and recorded".
3. **Not real forks, in my reading:**
   - **"A or B" on Android.** Data measured A as a subset of B on the same runner, so they collapse into one instrument with the token verdict first. Ada's hybrid and the majority B now describe the same build.
   - **Kenya's test-run fork (x) or (y)** changes no claim we ship to an adopter: 87 tests on 2 components, run on iOS 26 rather than the iOS 17 floor. I would leave it to the tasks round. If Kenya holds that it is Peter's, I have no adopter-side objection to either side.
   - **Thurgood's promotion timing** is real but has no adopter-facing effect. I take no view.
