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
