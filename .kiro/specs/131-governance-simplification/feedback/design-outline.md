# Spec Feedback: 131 — Governance Simplification

**Spec**: 131-governance-simplification
**Created**: 2026-10-24
**Structure**: split by phase (Spec-Feedback-Protocol § "The Feedback Document"). This file is the Design Outline phase. `requirements.md`, `design.md` and `tasks.md` feedback files open at their phases. The sequential gates are **not waived** (Peter, 2026-10-24).

---

## Design Outline Feedback

### Stakeholder identification

| Reviewer | Why | Asked to look at |
|---|---|---|
| **Stacy (required)** | She specified several layers the map retires, she owns the claims passes that row 10 reshapes, and she is the verifiability reader | The whole outline; especially the "Delivered?" cells, rows 1–3, 5, 7, 9, 10 and 20, and metric 2's denominator |
| **Lina** | She built the disposition modules (rows 1–3), which import Thurgood's `signatures.ts`; she owns readiness (row 19) and P2. *(R2 correction, from `[LINA R1]` item 1: `runGuard`, `diff-guard.ts` and `regrounding/{freshness,signatures,c1,verify-signing-chain}.ts` are Thurgood's under the six-roots ballot § 4, Option B, not hers.)* | Rows 1–3, 7 and 19; the definition of "pure deletion" (now § 9) |
| **Ada** | Token tier of the compile lane; token governance (row 18); F17's filing failure (row 13); freeze fork F-5 | Rows 13 and 18; F-5; § 7's 129 dependency |
| **Leonardo** | Consumer surfaces (rows 17 and 19); the fixture's design; P10a; F-6 | Rows 17 and 19; F-6; § 5's "outside source of purpose" |
| **Kenya** | iOS half of the compile lane and the consumer fixture | § 7: who owns the fixture, and where it lives (129 or 131) |
| **Data** | Android half of the compile lane and the consumer fixture | § 7, the same question |
| **Sparky (ask (c) only)** | Every seat lives under AI-Collaboration-Principles, so all eight weigh in on ask (c) | R1 ask (c) only |
| **Outside read (orchestrator-run)** | One charter-free read at R1, because every seat is one model family | Smoothed-over forks; whether the map re-creates the complexity it diagnoses |

Sparky is tagged for ask (c) only (no web-specific surface beyond P2, which Lina carries). Peter rules; he is not a round reviewer.

*(R2, from `[OUTSIDE R1]` item 6.)* No consumer sits on this table: none exists to ask. The test01 rehearsal (`evidence/`) stands in as consumer evidence, and Leonardo carries the designer's view. That is a stated gap, not a reviewer.

### Context for Reviewers

- **Settled, not re-opened.** 16.1.0 ships under current rules through its tag (item 0a, (i)). P1's scope (i) is a hypothetical planning input (item 1a), not a ruling. No suspension record is issued outside this spec → `synthesis-2026-10-23.md` § "Rulings"
- **Peter's words are carried verbatim**: concern, aim, problem, vehicle, gates and his four definitions → `design-outline.md` § "1. The problem, in Peter's words" and § "4. Design principles (PROPOSAL)"
- **Priority**: 129 → 131 → 128 → 130 (Peter, 2026-10-24) → `design-outline.md` header; `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § "Walk log"
- **Facts are the synthesis's command-verified § 1 (F1–F31).** Dispute a fact by command, not by recollection → `synthesis-2026-10-23.md` § "1. Settled facts"
- **Closed in round A** (L3, L5, L6, L8; L7 superseded by the vehicle ruling) → `synthesis-2026-10-23.md` § "3. Disagreements"
- **Under review — all PROPOSALS**: the outcome map (§ 3), the principles and their two proposed additions (§ 4), the requirements approach, the self-sustaining list and the metrics (§ 5), the tasks-phase idea (§ 8)
- **Open forks, attributed and unresolved**: F-1 to F-8 → `design-outline.md` § "6. Open forks (attributed, unresolved)". Reviewers may add evidence to a fork. They do not pick it; that is Peter's.
- **The map's outcome cells cite each layer's own ballot or requirement.** If a cell misstates what a layer was built for, cite the § that says otherwise. "Unmeasured" cells are requests for a fact.
- **Conflicts, stated**: the author wrote much of what is retired (F31). Read the "Delivered?" cells with that in mind → `design-outline.md` § "Conflicts, stated"
- **Out of scope**: the release work (disclosure wording, Ada's parse fixes, #450's held questions) and building the compile lane, which is Spec 129's
- **New evidence: the first real-use run since June.** A scratch copy of test01 was upgraded from 12.0.5 to 16.0.0 using only the consumer docs. It needed six undocumented repairs, and three failures were silent → `evidence/2026-10-24-test01-upgrade-rehearsal.md`
- **Peter's R0 views are below** (`[PETER R0]`). Read them before your own round.

### R1 asks

- **(a) The four-values lens (every reviewer).** Run the outline's proposals through Peter's four values (thorough, sustainable, holistic, thoughtful, as defined verbatim in `design-outline.md` § "4. Design principles (PROPOSAL)"). For each proposal, record which value it serves and which it strains.
- **(b) Lifecycle validation (Ada, Lina, Thurgood).** Check three things about the component and token lifecycle procedures: that they exist, that they agree with each other, and that they describe what the system actually does. Readiness's three disagreeing answers (synthesis F11) are the known crack. **This is not 131 scope** (Peter, item 4 below). Findings feed 131 only where its changes touch them, and anything else is filed with its owner.
- **(c) One ballot question for Peter after R1: two identity-level changes.** (i) The four values become shared values for agents and humans: **stated in AI-Collaboration-Principles** (always loaded) and **elaborated in AI-Collaboration-Framework**, with Core Goals pointing to them rather than copying them. That is Peter's direction (item 10, option (c)); the ballot still ratifies it. (ii) The Humorphism traits are stated briefly in Principles, and their patterns go in the Framework, under the three cautions (item 8). Proactive means surfacing and drafting in line with the values, never acting beyond authorization. Growth of the always-loaded set is accepted for values and offset by moving procedural detail out of it. The source is paraphrased and cited, never copied.
  - **All eight seats weigh in at R1** on (i) and (ii). Each view is recorded as **from an interested party**, because the doc shapes every session that seat runs.
  - **Read the source first**: `https://humorphism.com/llms-full.txt` (`curl -sL` works) is the site's full text for LLMs: about 5.5k words, 7 traits, 21 patterns. No license is stated, so paraphrase and cite, never copy patterns or examples. The manifesto (Hector Ouilhet, "Manifesto", humorphism.com, 2026-04-20) is a JavaScript page that curl cannot read, and it is not in the full text. Thurgood read the full text on 2026-10-24, and the manifesto is still unread.
  - **The ballot is its own file** under `.kiro/docs/ballots/`, drafted by Thurgood (Civitas content) after R1 reports, with R1's four-values results as input. It is not gated on 131's later phases. Peter did not object to this, and the orchestrator treats that as a yes. It is identity-level law, so it is ratified record-first.

#### [PETER R0]

*Peter's words, chat, relayed — verbatim (relayed by the orchestrator, 2026-10-24). Typos corrected at Peter's request (2026-10-24); wording and meaning otherwise unchanged.*

1. **Signing** → `design-outline.md` § 3 rows 1–2; § 6 F-8
   > "It's a bit of both mechanical and a signal of ownership: a sign that a promise was kept that teammates were partnered with. The signature is just evidence that the promise was fulfilled. We haven't evolved too many of those notions in a while, and I've been thinking about it more as the industry is similarly aligning to these collaborative practices (https://humorphism.com)."

   and later:
   > "Agreed; but if we think there's a better method or mechanic than signing, let's discuss it. I think one of the risks in building that system was "an agent can sign anything in anyone's name", but that's true — there are humans that totally do that and it's wrong. So the signature isn't the outcome; the outcome is that output is clean, useful, works as intended, is achieving the goal in a way that aligns with the values we discussed earlier."

2. **His read** → § 3 row 20; § 6 F-6 (L4)
   > "This is tricky; because, as a designer, I don't really have the technical prowess to do an informed review of code. I'm better suited to read reports and make decisions based on the findings."

   and later:
   > "Yes, but I wouldn't cap it to having to be one page. The risk in capping is missing items that should be reviewed in denser specs because they didn't fit the format."

3. **Consumer emphasis** → § 3, the last line of "What the map shows" (P10a); § 7 (Spec 128)
   > "You've been quite focused on this, and I understand why. The consumer emphasis starts to return around spec 128 — where we started building infrastructure for React and React Native. But don't discount the work we did around onboarding, which is entirely customer focused — which was done very recently. We've just needed to resolve issues that hinder our ability to deliver on the promises the system makes. In that case, the work is performed on the system that supports the customer rather than working on something the customer uses directly."

   and, on the test01 rehearsal (→ `evidence/2026-10-24-test01-upgrade-rehearsal.md`):
   > "I love that idea"

4. **The boundary, and his vision** → § 6 F-2; § 5 "Peter's role"; R1 ask (b)
   > "I'd like to get to a place where humans are making design decisions, and the system knows the best way to support those decisions. Example: If a designer needs a new component, the system knows to inquire if this component is validated or experimental. The system knows the procedures and architectural guidelines to follow. The system knows what tokens and other assets it can leverage with accuracy and call out what it needs. The system knows how to evaluate and promote tokens and/or components. All those procedures and requirements that go into making the system a constant until humans identify a new variable that the system needs to evolve to meet — redesigns, new products or direction, evolving customer needs, etc."

   and on scope:
   > "That shouldn't be part of 131. In fact, I would think that's already part of the system, so it might be something Ada, Lina, and Thurgood can validate."

5. **Human conventions** → § 4; § 5 (mechanisms belong to design)
   > "One other thing I'm thinking about: many of the constructs we've been using are based on human conventions — which is my bias as a human. We also need to think about what the optimal constructs are for AI agents to achieve these same goals. Just something to consider about as we start thinking about actual solutions."

6. **Reviews, context and transparency** → § 5 "What self-sustaining requires"; § 6 F-4; § 3 rows 13 and 17
   > "Just some responses to the human-agent convention fits: We have had instances where agents don't deliver on what they're asked to build — either because of technical mishaps, misalignment of priorities, etc. Agents don't always catch things on their first view of the problem — which is why we have multiple reviews and reviewers. Think of how in this session that the other agents have better informed your thinking, facts, etc. But the context costs and rule/law overload is very real, and it's something I'd like to address. Not sure if/how that impacts how you think the agents might be better served. One of the principles we've been developing at my job is that "AI agents have agency to do the work, and do so with transparency." Humans see the work happening at a high level as it's happening. They don't need to see the actions happening, but they need to see the actions ARE happening. Just something to think about."

7. **The review lens** → § 4; R1 asks (a) and (c)
   > "The only other thing I'd add is I recommend we run their proposals through the lens of those four values we defined — which we might actually want to consider making part of our steering documentation."

8. **Humorphism, folded into the collaboration docs** → R1 ask (c)
   > "We also might want to fold in the Humorphism principles into the AI-Human collaboration framework."

   and, on the orchestrator's three cautions:
   > "Re: Caution 1, Agreed, so long as the surfacing and drafting is in alignment with the values. Re: Caution 2, Agreed. Re: Also, Agreed."

   and:
   > "Yes, add to 455 before it merges."

   *The three cautions he agreed to (orchestrator's words, summarized):*
   1. Humorphism's "Proactive" trait conflicts with Start Up Tasks' stop-and-wait. It is reconciled as proactive in surfacing and drafting, never in acting beyond authorization. Peter's condition: the surfacing and drafting align with the four values.
   2. AI-Collaboration-Principles is always loaded, so it takes only the gaps (Empowering, Attentive, and Proactive once reconciled), with existing text cut or merged so the doc does not grow. The rest goes to the served AI-Collaboration-Framework.
   3. Humorphism is someone else's published work: paraphrase and cite it, never copy its patterns or examples. The drafter reads the manifesto and the full pattern set first.

9. **The values are shared, and not conditional** → R1 ask (c)
   > "Well, you can't add without growing, so that makes sense. The thing about values is they're not conditional; they inform everything from how one contextualizes content to decision making."

   and then:
   > "That's why I'm wondering if the four values should also be part of the AI-Collaboration framework, too — the idea being they need to be shared values between agents and humans to work as a team."

   *Orchestrator's readings (Peter did not object): proposals for the drafter, not settled.*
   - Values are always loaded; context economy applies to procedures, whose detail (TCP, Start Up Tasks, Spec-Feedback-Protocol mechanics) moves to skills or served docs.
   - One home, AI-Collaboration-Principles; Core Goals points to it (two copies drift).
   - "Shared" runs both ways: agents may hold human decisions to the values. Shared values are not shared authority; Peter decides.
   - Existing rules may regroup under the values and shrink the doc (counter-argument → thoughtful; certainty calibration → thorough; consult-first → holistic, thoughtful). Humorphism's traits become practices; its patterns go to the served framework.
   - Proportionality must not read as conditioning the values: they always apply; what scales is the effort to satisfy them.

10. **Where the shared values live, and who weighs in** → R1 ask (c)
   > "Re: 1, Let's go (c)"

   *(Option (c), as offered to him: the values are stated in AI-Collaboration-Principles and elaborated in AI-Collaboration-Framework.)*

   > "Re: 2, I think there's an argument for the Humorphism values to be in the Principles doc, too. Maybe this is something we should ask the other agents to weigh in on since they have digital skin in the game, too."

   and then:
   > "Yes, brief Thurgood to add item 10 and brief the agents, please"

**Orchestrator notes for R1 (not Peter's words).** Each is a **proposal for reviewers**.
- **Promises, not signatures.** Accountability attaches to named promises and their checks. Each promise has a named owner, who records their own found items in their own voice wherever no check reaches. → F-8, row 1
- **Peter's read is a release findings report.** Decisions first, findings ranked by severity, then a machine-generated list of every check that ran; no length cap. Every claim cites a check's output or is marked unverified. → F-6, row 20
- **The boundary.** Design decisions are human. Knowing and following the procedures, and checking correctness against the stated design, are the system's. "Constant until humans identify a new variable" is the growth rule. Any later delegation means earning autonomy per procedure class (Humorphism's "Earn autonomy" pattern; source read 2026-10-24). → F-2, L1
- **Agent-native inside, human-legible at the edge.** This means:
  - executable rules over declarative ones;
  - derivation over attestation;
  - context economy: just-in-time loading and a small always-set;
  - machine-readable state and evidence by construction;
  - independence through different lenses and tools, not headcount;
  - stop rules.

  Multiple reviews stay: in this synthesis, what worked was evidence-bearing review from different inputs, not reviewer count or signatures.
- **Transparency.** Low ceremony per action; high-level visibility generated from state and checks, never an agent-written summary (test01's "up to date" is the failure mode).
- **test01.** One real-use run found three silent failures: only use finds new classes (§ 3's last line).

[Agent feedback rounds here]

---

### Round 1 (R1)

*Each entry below was written by its seat in its own staging file and assembled here verbatim by the orchestrator, 2026-10-24, in this order: required reviewer first, then system seats, product seats, the ask-(c)-only seat, the author's ask-(b) part, and the charter-free outside read. Views on ask (c) are from interested parties. Incorporation is the author's R2.*

#### [STACY R1]
- **Pre-step**: no `[@STACY]` mentions (`grep -rn "@STACY"` over the spec folder). Sources: `.kiro/specs/123-consumer-distribution/completion/claims-pass*.md` (MP, 15.0, 15.1, 16.0, CL) unless stated.

**A. Facts for the "Delivered?" cells** → design-outline.md § "3. The outcome map"
1. **Row 1 (corrects F3)**: "0 refusals" is the standing count. **25 refusals were issued** at the first render, each resolved (MP L215); **0 issued since** (15.1 L311, 16.0 L311). Blind re-judgment: **9 of 46 acts divergent** (15.0 L267). So per-row signing worked once, then decayed, and about 1 in 5 judgments does not reproduce. It sharpens the verdict, not reverses it.
2. **Row 3**: no instance in my records of a stale-list re-sign changing shipped text; I never counted it. "Unmeasured" stands.
3. **Row 4**: ratified 2026-10-18; my last pass was 2026-10-17. One dry run only (CL OB-12, one hunk, would pass). Never read, which is not the same as not delivering.
4. **Row 5**: presence **31/31**; divergence 4/31; `plan held` spot-checks 5/27 found **1 contradiction** (MP-4, via commit trailers), so the ballot's "artifact-undetectable" (§ 4) was beaten once. Recalibration use: **none**. `Process-Orchestration-Model-Selection.md` has had no content change since 2026-07-09 apart from #329's audience line (`git log`). **D** is supported.
5. **Row 6**: presence **43/43** unique trigger-surface PRs; `none needed` on a trigger surface 3 (#244, #298, #369); 9 spot-checks, none contradicted. The count has **never produced a finding**; deterrence and no-op look identical. D is defensible.
6. **Row 9**: **148/151** ticked subtasks had docs (MP 92/92, 15.1 38/41, CL 18/18). Two came late (#370); 30.3 is unwritten after two releases, its owner disputed (16.0 L377). Whether anyone read the adaptations downstream is unmeasured.
7. **Row 12**: about 58 self-reported gaps, against **1** found by a pass. Task 28 had 5 `MISSING` rows resolved before code (CL L142): the outcome, working. The cost sits in the header line: its grammar failed 3 times (MP-3, CL-2). Keep the block; cut the header.

**B. Checks that cannot fail** → § "3", § "5. Requirements approach, aim and metrics"
8. **P10b's sunset** ("N releases with zero FOUND") pays the reader for finding nothing. Proposed falsifier: a SYMPTOM traced to a changed rendered path whose owner recorded `found: none`.
9. **Rows 11 and 13** have no failing observation. Row 11 could count `Standards implications` that add rules against those that narrow them, computable from the pass records.
10. **Metric 4 is gamed by F17's own mode**: a defect nobody files has no age. Guard: count pass and SYMPTOM findings that have no record.
11. **Metric 3 leaves out `tools/agent-generator/**`**, where 4,260 lines of signing code live (F19). **Metric 2's** denominator must be committed at a sha before its first reading; native behaviour starts at 0. **Metric 1** can only count questions someone wrote down.
12. **No metric has a reader or a trigger** (the F20 pattern). The RELEASE record is the natural home. It adds to my seat; Peter picks.

**C. How the passes would work in practice** → § "3" rows 10, 20; § "6" F-6
13. **A fork for Peter**: P6 caps records at about 3k words; Peter, R0 item 2: "I wouldn't cap it to having to be one page." Cap the record and generate an uncapped report, or no cap anywhere.
14. **Checks whose actor is not the pass seat or CI did not run**: Peter's sample, 0/309; blind re-judgment NOT RUN at 15.1 and 16.0, with 6 seats owed ("This seat cannot spawn seats", 15.1 L352, 16.0 L360). Proposed rule: the release report holds only what CI or the pass seat can run alone, and every other line reads `owed — needs <actor>`.
15. **Promise-plus-check** works only if the "unverified" vocabulary stays closed (`not re-verified — <why>`). A promise with no check then appears as a row, never as a ✅.
16. **Request**: the 16.1.0 RELEASE pass runs under current rules anyway (ruling 0a). It can supply rows 4, 6 and 12, the first delegate-audit reading and the falsity floor's first firing (F28) before requirements are written,.

**D. Ask (a), the four values**
17. Deleting rows 2, 5 and 6: serves **sustainable**; **thorough** holds on the facts above. Deleting row 4 unread: strains **thoughtful** ("tested to ensure they delivered"). P10b with a zero-found sunset: strains **thorough**. Metrics with no reader: strain **sustainable** (they need another mechanism). Row 9 to one line: serves **sustainable** and **holistic** (the owner dispute goes away). An uncapped report: serves **holistic** and **thorough**, and stays **sustainable** only if generated. Row 20: **thoughtful** means writing "never ran", not B.

**E. Ask (c), from an interested party** (both docs shape every session I run)
18. **Values**: I support (c). The risk is citation ritual. "Thorough" is cheap to assert, like reflexive `plan held` (9/9 at 15.1 L372). Proposal: a value is never cited as evidence; only its paired check (§ 4 addition 2) is. Value adherence is unverifiable from my seat; I will say so, not grade it.
19. **Humorphism** (humorphism.com/llms-full.txt, read 2026-10-24; paraphrased): AICP already covers "push back" (counter-argument) and "uncertainty made actionable" (certainty calibration). Two patterns can be checked: "show your work" (separate what was done, what was checked and what needs the person) is the release report's shape; "earn autonomy" only with its step-back-after-correction half, keyed to recorded findings, never to self-report. That is F-2's mechanism. Do not import "keep the work moving after the person leaves": it conflicts with stop-and-wait (caution 1).


#### [LINA R1]
No `[@LINA]` mentions open. Verified at `6a9f3e820`.

**Corrections and missed dependencies**
1. **`runGuard`'s freshness call is Thurgood's code, not mine.** Six-roots § 4 Option B (L155–157) gives him `diff-guard.ts` and `regrounding/{freshness,signatures,c1,verify-signing-chain}.ts`. My files are coupled to them: `dispositions.ts` imports `signatures.ts` (L65) and checks every row's `signature` (L280–283). So rows 2 and 3 and P5 are code changes in two seats, and they touch shared core (`hash.ts`, `operative-sets.ts`). § 8's "pure deletion" has to allow edits to the files that import the deleted ones. → design-outline.md § "8. Tasks phase"; Stakeholder table
2. **Keep the attribution read when the signing code goes.** `readConsumerSpans` (`derive.ts` L571) maps each rendered consumer line to its canonical source through `.attribution.json` sidecars. P10b's changed-paths list is a `git diff <last-tag>` over `canonical/_consumer-output/**` joined to those sidecars: cheap, and per release, which is when consumers receive changes. Row 3's outcome survives at that grain; F-3's gap shrinks to the first reduced release. → § 3 rows 1, 3; P5
3. **Operative sets lose their readers.** Once signatures and freshness go, `operative-sets.ts` is read only by `derive.ts`'s orphaned-key check (L175). "Item lists stay" would then mean records no check reads. They either become what P10b's reads cite, or they go too. That fork is Peter's. → § 3 row 3
4. **One OWNERS file serves rows 1, 7(b) and 15.** The only machine unit→seat map today is C1 plus dispositions, which rows 1–2 delete, so OWNERS lands with or before them. Building it means a new source in `source.ts`/`schema.ts` (shared core, so Thurgood is consulted), rendered through `adapters/cc.ts` (the read-only clause) and `adapters/kiro.ts` (`allowedPaths`). **Order matters**: if OWNERS lands while signatures still exist, all 123 signed `writeScope[...]` rows (six-roots Errata (a)) must be re-signed. → § 3 rows 7, 15; § 8
5. **Row 7(a) is already behavioural only.** Kiro `allowedPaths` is static, so no grant can widen it. On Claude Code the only barrier is the rendered "Treat paths outside this set as read-only" sentence. Replacing the grants is one canonical edit plus one adapter change: buildable, but law, so Peter merges it. → § 3 row 7
6. **Row 19 conflicts with row 13.** `knownDefects` needs a component field in issue records, and no such field exists. So it must be one of the ≈5 README rules. `compiles: unverified` can ship now and stay until 129's lane writes the real value. `ReadinessCompliance.test.ts` (L36–40) copies the indexer's patterns, so it checks the code against itself and cannot catch F11. P2 replaces this test rather than extending it. Its web pattern `/\.test\.ts$/` also counts `*.ios.test.ts` text checks as web tests. → § 3 row 19

**test01 → my surfaces.** Three of the six repairs (F-3, F-5, F-7) are about component forks.
- With F-3/F-5, a fork of a semantic component can't reach its base's internals through `exports`.
- With F-7, which version wins on web depends on import order.
- With F-8, the application MCP's default `COMPONENTS_DIR` is `src/components/core` (`index.ts` L24), the folder the migration deletes, and the MCP still reports "healthy".

Each is a check reporting OK on something broken, the class rows 1 and 19 address: evidence for derivation over attestation. [@LEONARDO] Unless the P4 fixture includes a consumer-owned fork, the fixture can't see this class of failure. -- [LINA R1] [@ADA] Is it your packaging call whether to open subpaths in `exports` that forks can reach? -- [LINA R1] I'll file the health-check record and the default-directory record myself.

**(a) Four values**
- Rows 1–3 + P10b. *Serves*: sustainable (4,260 lines removed) and thorough (reads record what was found, not assent). *Strains*: thoughtful, because of the gap release.
- OWNERS. *Serves*: holistic and sustainable (one source, three uses). *Strains*: thorough, if the order in item 4 goes wrong.
- Row 19. *Serves*: thorough and holistic. *Strains*: sustainable (a public downgrade, plus a new field).

**(b) Lifecycle check (component tier)**
- **Do the procedures exist?**
  - Promotion is prose only (Integration Guide L944, my charter; they agree). No component counterpart to the tokens' `promotionCandidate` (Product-Token-Governance L258–266); none has ever run.
  - **No procedure asks "validated or experimental?"** The Governance Gradient (L934–942) assigns a tier by blast radius, and the designer is never asked.
- **Do they agree?** No; four vocabularies. Readiness-Status L40–43 (production-ready/beta/placeholder/deprecated); Schema-Format L124 (adds development); Metadata-reference L47 (production-ready/development/experimental); code, `models/index.ts` L139 (not-started/scaffold/development/production-ready/not-applicable). Schemas carry per-platform `{reviewed: bool}`.
- **Are they true?** No.
  - Readiness-Status L422–424 claims a readiness value validator; none exists.
  - Its example marks Input-Text-Base deprecated (L203–205), while Form-Inputs L80 marks it 🟢. Plus F11.
- **To file (owner: Lina)**: one shared vocabulary (this is P2, and the only item that touches 131, via row 19), a tier question asked at intake, and a component promotion signal.

**(c) From an interested party: I live under this doc.**
- (i) Yes, with one home for the values. They explain rules I follow: fold-back is *thoughtful*, certainty calibration *thorough*.
- (ii) State *Hand off judgment calls*, which is close to our fork rule, and *Earn autonomy*, which is the right model for delegation per procedure class. Leave out *Keep the work moving*: it means working on after the person has left, the opposite of stop-and-wait. *Present one clear identity* (humorphism.com, "Trustworthy") answers F-8: a seat writing its found items in its own voice carries the partnership without a signature. My bias: Opinionated and Proactive widen my seat; discount my support.


#### [ADA R1]
- No `[@ADA]` mentions. Read at `6a9f3e820`.
- **Row 18: split it in three.** (18a) Hooks: all four `.kiro/hooks/ada-*.kiro.hook` are `userTriggered` `askAgent` prompts (F23), so all four go (**D**). Correcting P9's "three of four": `ada-token-health-check` only reruns suites the gate runs. (18b) Creation review: **S**. Its non-model check covers *fit* only ((b) item 3). (18c) Component-token *usage* approval has its own outcome: "Using them should be a deliberate decision" (Token-Governance § "Component Token Usage", "Why?"). P9 narrows it to creation, so the row needs that verdict written as **D**, with the residual stated: "is the semantic tier insufficient?" then gets asked only at creation. Whether it ever ran is **unmeasured**. Lens: *sustainable* ↑; the residual strains *thoughtful*. → design-outline.md § "3. The outcome map"
- **Compile lane and "no rise".** Agreed. Two additions. (1) Take the ratchet's baseline from the packed tarball at the sha where 129's lane arms. The synthesis's 197 + 29 predates P3 and #453. (2) Rows 10 and 19 should name the ratchet as their non-model check. The token tier reaches **E** once "no rise" is required, not at "= 0". Lens: *thorough* and *sustainable*. Strain on *holistic*: native consumers still get output that doesn't compile until the count is 0; the P3 disclosure carries them. → design-outline.md § "7. Dependencies"
- **F-5, evidence against my own objection.** F17's defects are still not filed as records. Three of them exist only as "Candidate for Ada" lines in `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` L143–145, and my four P1s have no fixing PR. That supports the freeze's premise; I don't pick the fork. → design-outline.md § "6. Open forks"
- **P8: token docs that must stay served.** Token-Governance, Product-Token-Governance, Token-Quick-Reference, Token-Semantic-Structure, Token-Resolution-Patterns, rosetta-system-principles and all 15 Token-Family-* docs: consumer agents select tokens from these. Two conditions. (a) Label or strip the Token-Family native samples first (F18). (b) The move's acceptance check is the **served-doc count in a migrated consumer**, run in the fixture, not the pack listing. test01 F-8 found a docs MCP serving 9 of 83 docs while rating its matches `strong`. [@LEONARDO] Should Rosetta-System-Architecture stay served? Its § "Module-Resolution Contract" governs how consumer `.ts` files load. -- [ADA R1] → design-outline.md § "3. The outcome map" row 17
- **test01 on my surface (`src/cli/**`), not filed (per Peter's ruling).** I'd own these:
  - F-8 (consult Thurgood: `shared/mcpConfig/**`)
  - F-9: `sync/Reporter.ts:135` prints the all-clear whenever the manifest diff is empty
  - F-10: `sync/Migration.ts:503`, `sync/index.ts:409`, `shared/componentSources.ts:158`, `sync/SteeringDirCheck.ts:149` (consult Thurgood)
  - F-11: `designerpunk.ts:322/367` check source mtime only
  - F-3 and F-5 (consult Lina)
  - F-4: `loadComponentTokens.ts:85` `if (!fs.existsSync(dir)) continue;`

  F-1 is a doc fix (INSTALL comes from Thurgood's `scripts/derive-install-doc.ts`). **Class**: all three silent failures report success from the CLI's own bookkeeping (hashes, mtime, a skipped directory), not from the end state. **Class option**: derive each command's final line from post-condition checks: served-doc count, configured directories exist, output token count against the previous run. Cost: one check per command. Lens: *thorough* and *thoughtful* ↑. *Sustainable* holds, because the checks replace false all-clears rather than add attestation. → design-outline.md § "5. Requirements approach"
- **(b) Token lifecycle. NOT 131 scope; for filing with owners.**
  1. *Selection order disagrees.* Core Goals § "Token Selection Priority": semantic → primitive → *create* a component token → hard-coded. Token-Governance § "Token Selection Matrix": semantic → *existing* component token → primitive → stop and create. Steps 2 and 3 are inverted, and Core Goals puts creation inside selection. My charter embeds the latter, so seats load both. Owners: me; Peter for Core Goals.
  2. *Pattern.* Token-Governance § "Creating Component Tokens" says the family segment is "Always `color`", but its own example is `family: 'spacing'`, and 8 `defineComponentTokens` files use spacing or sizing. Owner: me.
  3. *Conformance is claimed, not checked.* The docs say "Custom values must conform to the token family's mathematical foundation", but the value path in `src/build/tokens/defineComponentTokens.ts` (~L273–281) records any number. The family-mismatch guard covers references only. A grep finds no `ValidationCoordinator` or `TokenEngine` call from `src/cli/designerpunk.ts` or `scripts/generate-platform-tokens.ts`. `Button-VerticalList-Item.tokens.ts:53` (11px) has sound reasoning that nothing checks. Owner: me.
  4. *Promotion has three routes.* Product-Token-Governance § "Promotion Signals": Stacy → Ada → Peter. MCP-Relationship-Model § "Promotion Path" adds a Tier-3 escalation and Thurgood's triage. Integration Guide L944 says "the full spec process". No Lessons Synthesis Review record exists (`git ls-files`), so it has never run. This is the gap in Peter's "the system knows how to evaluate and promote". Owners: me, Stacy, Thurgood.
  5. *Creation review* exists, and the docs agree on it. In practice it is Peter's merge, and nothing marks a PR as adding tokens. A candidate: a generated tokens-added/removed line in the PR body, diffed from `token-index/`.
- **(c) From an interested party.** Principles loads into every session I run.
  - (i) I support it, with paired checks only where proportionality calls for them. On my surface regrouping shrinks text: semantic-first is *holistic*, creation review is *thoughtful*.
  - (ii) Invested, Opinionated and Trustworthy are largely in AICP already. The gaps are Empowering and Attentive.
  - Cautions: Humorphism's "Keep the work moving" pattern (a teammate who doesn't stop when the person leaves) contradicts stop-and-wait, so the reconciliation should name that pattern, not only the trait. "Earn autonomy" (autonomy built from a track record) holds only if non-model checks keep that record. If the seats grade themselves, it's F-2's bias again. (Paraphrased from humorphism.com/llms-full.txt, read 2026-10-24.)

  → design-outline.md § "4. Design principles"


#### [LEONARDO R1]

No `[@LEONARDO]` mentions were open in the feedback file at this round.

1. **Rows 17 and 19 carry Peter's vision, but the map files them as layers.** Peter (item 4) wants a system that "knows what tokens and other assets it can leverage with accuracy". Rows 19 and 17 are that sentence for components (F11) and for guidance. No row names the designer. Proposal: § 5 adds one designer-facing outcome: a consumer's agent answers "can I use X on iOS?" and "which token for Y?" from served truth, with confidence that drops when its sources do. *Values*: serves holistic and thorough; strains sustainable only if written as a mechanism. → design-outline.md § "3. The outcome map" rows 17, 19; § "5. Requirements approach"

2. **Row 17 has a second half: what is served after an upgrade.** The cell measures what ships (F15). In test01, the docs MCP indexed 9 of 83 docs and reported itself "degraded", yet it still rated matches `strong`. `sync` then said "Everything DesignerPunk manages is up to date" (evidence F-8; steps 11 and 11b). That defeats AI-Collaboration-Principles § "Certainty Calibration", which relies on `matchConfidence`. A pack listing cannot see this. Same class: "pre-123" jargon (F-10), and a consumer identity doc that has the consumer write a date into a `sync`-managed file (evidence § "Friction"). Proposal: row 17's check adds a served-corpus probe after install and upgrade (step 11's method). Nothing filed; fixes route per the evidence header. *Values*: serves thorough; no strain if the probe runs inside the fixture. → § "3. The outcome map" row 17

3. **Row 19: honest labels need no compile lane.** `compiles: unverified` is true for native today, and setting it removes a false claim. Native shows "scaffold" only through a pattern miss (F11); F12's fix would flip it to production-ready on code nothing compiles. Proposal: P2's labels land before 129; its evidence waits. Peter's words are "validated or experimental": the designer reads one derived word, which the fields derive. Lina's call. *Values*: serves thorough and holistic. It strains thoughtful slightly (two steps). → § "3. The outcome map" row 19; § "7. Dependencies"

4. **The fixture cannot replace test01.** P4's fixture is a fresh install from the release-candidate tarball (synthesis P4). Four of the six repairs (F-1, F-3, F-5, F-8) exist only on upgrade. The rehearsal also never exercised "An agent actually working in the upgraded repo" (evidence § "Not exercised"): the designer's half. Proposal: P10a, each release, is:
   - an upgrade rehearsal on a standing consumer (the copy method);
   - one design task by that consumer's agents: Peter's item-4 scenario (ask for a new component; does the system ask "validated or experimental?").

   *Values*: serves thorough and thoughtful ("tested to ensure they delivered on their purposes"). It strains sustainable (about 35 minutes, evidence § "Time") and needs an owner and trigger, or it repeats F20. → § "3. The outcome map", "What the map shows"; § "5." item 5

5. **Fixture home and owner (interested party: this gives me a duty).**
   - **Home: 129.** The fixture runs on the harness's pack → init → generate driver (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`, evaluation item 5), 129's acceptance instrument; building it in 131 builds that driver twice. 131 states the outcome: rows 10 and 19 cite fixture results.
   - **Owners, proposed.** I own the fixture's content (the screen spec, what it exercises, its pass conditions) and P10a's design task. Kenya, Data and Sparky own their builds under 129's grant. Stacy cites the results. This keeps that record's § 4 rule: "They build tools; the verifier verifies."

   *Values*: serves holistic and sustainable (one driver). It strains thorough until 129's design names the fixture. → § "7. Dependencies"
   - [@KENYA] [@DATA] Does a screen-level fixture fit your host module's test target, or does it need its own? → § "7. Dependencies" -- [LEONARDO R1]

6. **F-6, evidence only.** Peter says he is "better suited to read reports and make decisions based on the findings". The rehearsal is such a report; he welcomed it ("I love that idea"). A real-use report may be the human read this fork needs. → § "6. Open forks" F-6

7. **Additions 1–2.** Proportionality: accept; serves sustainable if it scales effort, never whether values apply (Peter, item 9). Paired checks: accept, adding "the designer using the system" to holistic's stakeholders; strains sustainable, per Thurgood's counter. → § "4. Design principles"

**Ask (c), from an interested party: this doc shapes every session I run.**
- **(i) Support.** Values go in the always-loaded set as definitions only; paired checks go in the Framework, or the always-set holds a mechanism.
- **(ii) Support.** Most traits map onto text already in Principles:
  - Opinionated ≈ § "Counter-Argument Requirement".
  - Trustworthy ≈ § "Certainty Calibration".
  - Empowering ≈ "Surface forks".
  - Invested ≈ § "Exploratory vs Directive Questions".

  The real gaps are Attentive (know when to speak; hold what can wait, which suits Peter's bursty pace) and Proactive (caution 1). Two cautions:
  - "Accept richer input", "Share the whole canvas" and "Show up where the work happens" are interface patterns: design guidance for AI products built with DesignerPunk, not collaboration law.
  - "Present one clear identity" prefers one relationship to "several disconnected assistants". Eight seats strain that; our answer, the orchestrator facing Peter (Agent-Directory § "Primary Agent"), should be stated.
- Source: humorphism.com, "Design AI to work like a teammate" (`llms-full.txt`, read 2026-10-24), paraphrased; manifesto unread.


#### [KENYA R1]
*No open `[@KENYA]` mentions. "Row N" = my harness evaluation entry (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`, "iOS — Kenya", measured at `94451995c`). No new compile run.*

1. **The fixture's iOS leg lives in 129, inside the harness.**
   - Row 4's SwiftPM host plus one screen: one `Package.swift`.
   - Kenya owns it as maintainer: she keeps it running and tells lane faults from output faults. Output failures go to Ada and Lina, the screen's content to Leonardo, and the results to Stacy. That keeps charter § 4: platform seats build tools; the verifier verifies.
   - **Lens**: holistic and sustainable, because a named owner closes F20. It strains sustainable: my seat takes on a standing duty.
   - **Survives**: a product screen grows 129, which is ranked first.
   - **Fork, Peter's**: inside 129's harness unit, or a 129 follow-on unit.

   → design-outline.md § "7. Dependencies"

2. **"No rise" on a raw count has two holes.**
   - **The count is fungible.** P3's fixes remove 26 distinct errors (8 font-family + 18 WCAG; row 6). Against a committed baseline of 197, 26 new defects then pass green. Fix: make the baseline main's last measurement, or key the count on fingerprints (message + declaration name; line numbers shift).
   - **It rewards lost output.** test01's F-4 silently dropped component tokens. All 29 `ComponentTokens` errors are reference errors, so an empty file reads 29 → 0. Fix: add an inventory floor, the declarations per file from the same run.
   - Count distinct diagnostics (Swift prints each twice). Make `-wmo` mandatory: without it, the second file's errors never print (394 vs 452 raw, row 1).
   - **Lens**: thorough, because the number is derived. It strains sustainable slightly: two numbers instead of one.

   → synthesis P4

3. **"`swiftc`/`xcodebuild`" names two verbs, and neither one renders.**
   - Typecheck proves the code compiles. The host build proves it resolves and links.
   - Rendering, which F24's lesson asks for, needs a simulator test target, for example an `ImageRenderer` snapshot under `xcodebuild test` (REASONING; verify). Without it, row 10's "for behaviour, never" closes only as far as compiling.
   - The leg is red until 129 fixes the generator defects and wires theme emission (26 of 39 component files read `dpTheme`, row 4). Until then it is a measuring lane, non-required and labelled.
   - F7 settles row 3's UNVERIFIED billing: the repo is public, so the cost is concurrency and minutes.
   - **Lens**: thorough. It strains holistic: an unlabelled red lane costs Peter attention.

   → design-outline.md § 3 row 10

4. **Row 19's `compiles` field is attributed, never invoked per file.**
   - Take each value from the diagnostics' file paths in the whole-package `-wmo` run. The `AvatarTokens` and `BadgeLabelBaseTokens` redeclarations appear only when files share an invocation (row 2).
   - iOS `contractEvidence: runtime` is reachable for 2 components, because only two `*Tests.swift` files exist. For the rest, the honest value is `none`.
   - **Lens**: thorough and holistic for consumers. It strains: shipped claims get downgraded in public (P2 "Survives").

   → design-outline.md § 3 row 19

5. **Ask (c), from an interested party: these docs shape every session I run.**
   - **(i)** I support one home, with Core Goals pointing to it, because two copies drift. Risk: "thorough" gets cited to justify new layers. Adopt proportionality (§ 4, addition 1) with the values.
   - **(ii)** The seven traits (Invested, Opinionated, Proactive, Adaptive, Trustworthy, Empowering, Attentive; humorphism.com/llms-full.txt, read 2026-10-24). I support Empowering and Attentive in Principles. Three tensions:
     - "Keep the work moving" recovers, then reports. Fine for an agent's work, not an instrument's: a harness that repairs what it measures hides the defect (row 5). test01's six undocumented repairs are unreported repair.
     - "Present one clear identity" means no human costume. Our seats carry human names, so Principles should say the names honour people and do not impersonate them (bears on F-8).
     - Adaptive's "remember across sessions" pattern: seats have no per-seat memory. Stating it is a said-vs-built gap.

- [@DATA] One shared pack → init → generate driver, and the same maintainer duty? -- [KENYA R1]
- [@ADA] Ratchet baseline: a committed number, or main's last measurement? -- [KENYA R1]
- [@LEONARDO] Is the Settings spec stable enough to be fixture input? -- [KENYA R1]


#### [DATA R1]

*Lens: the Android compile lane and the consumer fixture. There are no `[@DATA]` mentions. Counts were re-run at `6a9f3e820` unless a line is cited. "Charter" means `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`.*

1. **§ 7: the fixture lives in 129. Its Android leg is my host module plus one screen.** P4 asks for "a Gradle compile" on Android (synthesis L119). My host lane is already a Gradle module over the 43 packed `.kt` files (charter L180). A 131 fixture would mean a second Android Gradle project for the same compile. I build it under a 129 tasks-row grant (charter L182). No Compose Settings screen exists (`find -iname '*settings*'` → only `experience-patterns/settings.yaml` and ledgers), so it gets written from Leonardo's spec. Who keeps it green is the F20 gap. Charter § 4 rules out Kenya and me as standing verifiers. **Fork for Peter**: Leonardo (the fixture as a product, P10a) or Stacy (she re-runs it as a command). → design-outline.md § "7. Dependencies"
   - *Values*: serves thorough and holistic. Strains sustainable: it starts red (item 2).

2. **On Android, "once P4 exists" does not mean "once P4 is green."** The token file has 0 imports, 99 `Oklch(` calls with no dependency, and 39 `Typography(` calls with no definition (charter L184ff). 25 of 39 component files read `LocalDPTheme`, which nothing emits (re-run). Whether 129 or 128 owns theme emission is still open (129 outline L59). Under the order 129 → 131 → 128, if 128 gets it, Android stays red through all of 131. Rows 10 and 19 should therefore say "**E / close B** per platform, at green," and § 7 should name theme emission. → § 3 rows 10, 19; § 7
   - [@THURGOOD] Can § 7 state "129 owns native theme emission, or Android rows 10 and 19 stay B through 131"? -- [DATA R1]
   - *Values*: serves thorough. Omitting it strains holistic.

3. **Row 19's `compiles` has to name which compile.** Android has two: JVM `kotlinc` (token tier, no SDK) and the host's `compileDebugKotlin`. 13 of 39 component files import `android.*` (re-run), and no JVM jar provides those. So a component can only get `compiles` from the host. A bare boolean would turn F11's three answers into four. Proposal: `compiles: {verb, sha, result}`, generated. → § 3 row 19
   - *Values*: serves thorough and sustainable (derived, not attested).

4. **Row 10 overstates what the fixture covers on native.** A compile proves the code resolves and typechecks. It does not prove the code behaves: `radius_half = 50.dp` compiles and is wrong (charter L218). Behaviour on Android needs `createComposeRule` on an emulator. Only 2 `*Test.kt` files exist, and neither is packed (L180). Suggest: "covers compile-class defects on native; behaviour stays outside, stated in each pass." → § 3 row 10
   - *Values*: serves thorough and thoughtful.

5. **Metric 2 should sort checks by what they execute.** #453's two Android guards are non-model, but they read text. Its own body says "No Android build was run." Counting them as verified Android claims games metric 2 unintentionally. Proposed classes: *executes the artifact*, *reads text*, *model*. The guards also model § 5's admission rule: each one names its outcome and a retirement criterion. → § 5 metric 2
   - *Values*: serves thorough and sustainable.

6. **Android is CI-only by default. That is normal, not a gap.** There is no local `kotlinc`, JDK or SDK (charter L159), and every workflow runs on `ubuntu-latest` (re-run). "Agent-native" here means the lane prints the failing generated line, so no toolchain is needed locally. → § 4, orchestrator note "Agent-native inside"

**Ask (c), from an interested party** (both docs shape every session I run):
- **(i) Support.** One home, and Core Goals points to it. My VERIFIED/REASONING labels already serve *thorough*.
- **(ii) Support, with two cautions.** This paraphrases humorphism.com/llms-full.txt (read 2026-10-24).
  - "Keep the work moving" (Proactive) gives an example of working around a failed step and reporting afterwards. The harness must never do that: it never fixes what it finds (charter L182). Reconcile it at the pattern level, not only at the trait level.
  - Humorphism describes a person working with an AI teammate, not seat-to-seat protocol (Peter's item 5). Apply it at the human edge.


#### [SPARKY R1]

*Interested party. Ask (c) only. Read: R1 asks, `[PETER R0]` 5–10, outline § 4, AICP, `governance/AI-Collaboration-Framework.md`, and Humorphism's `llms-full.txt` (humorphism.com, 2026-10-24, paraphrased; manifesto unread).*

1. **(i) Yes.** Shared values let me hold a spec to more than my preference. My charter tells me to flag a spec that would "hurt sustainability or scalability" (`sparky.md` § "Candid Over Comfortable") but defines neither word. Peter's definitions run 109 words (Task-Completion-Protocol alone: 3,800). Put them at the **top** of AICP: the middle of a long always-loaded set is what gets skimmed. → § "R1 asks"
2. **What I'd use.** Deciding, I reach for short imperatives (the counter-argument template, "ask if unsure"), not definitions. So pair each value with **one question** in AICP (outline § 4, addition 2, phrased as questions). Written answers stay optional, scaled by proportionality. If those answers become required lines, we have rebuilt the delegated-tier line (map row 5). → design-outline.md § 4
3. **"One home" has to include the charters, not only Core Goals.** The fold-back rule is written out three times: AICP, Framework Protocol 1, and almost word for word in `sparky.md` § "Counter-Arguments Are Mandatory". That is the drift item 9 warns about. → § "[PETER R0]" item 9
4. **(ii) Yes, but only the traits that fill gaps, one line each.** Most traits already have a home:
   - Opinionated ("make the case once, then defer") = counter-argument + § "When Human and AI Disagree"
   - Trustworthy (actionable uncertainty) = certainty calibration
   - Empowering (hand-off) = "the pick is the human's"
   - **Real gaps:** Earn autonomy and Attentive (when to interrupt, what to batch; this fits Peter's bursty pace).
5. **Two patterns need guardrails in the Framework:**
   - **"Make a repeated fix a rule"** is the growth engine this spec diagnoses (F29). Pair it with *sustainable*: a proposed rule names what it retires or merges.
   - **"Recover, then report"** is allowed *inside* an authorized task; across task boundaries, only drafting is. Without that line, seats will read stop-and-wait as "never retry a failed build", or read Proactive as permission to keep going.
6. **Web observation.** Several patterns are product-UI patterns: shared canvas, reading cursor hesitation, gaze/tone, a pointing "mark". They describe AI-teammate screens Leonardo would spec and I'd build, not seat conduct, and raise consent/WCAG questions (inferring intent from hover). Keep them out of the collaboration docs. → § "R1 asks"
7. **Counter-argument, after fold-back.** Adding text to the always-loaded set means more gets skimmed. Folded in: values placed first, one question per value, gap traits only, charter duplicates cut. **What survives:** the added length pays off only if procedural text leaves the always-loaded set **in the same unit**. Otherwise my context grows and the values still compete with procedure.

- [@THURGOOD] Does the ballot cut AICP restatements in charters (e.g. `sparky.md` § "Collaboration Standards") down to pointers, in the same unit? -- [SPARKY R1]
- [@LEONARDO] Do Humorphism's product-UI patterns belong in product design guidance rather than the Framework? -- [SPARKY R1]


#### [THURGOOD R1 — ask (b)]
- **Method.** Read and grep at main `6a9f3e820`; no MCP calls, so served behaviour is read from the indexer code. I check agreement between surfaces and with code; correctness is Ada's and Lina's.
- **1. The procedures exist, but none asks Peter's first question.** Lifecycle text exists: readiness transitions (`governance/Component-Readiness-Status.md`), family phases 1–6 (`Component-Development-Standards.md`), token steps (`Component-Development-Guide.md` L142–216), two promotion paths (`DesignerPunk-Integration-Guide.md` L938–944; `MCP-Relationship-Model.md` L157–182). "Validated or experimental?" appears only as the blast-radius tier (Integration Guide L938–942; Lina's "Governance gradient"). Nothing asks it at request time. `Process-Spec-Planning.md` has no tier or readiness step. `experimental` is listed as a readiness value only in `component-metadata-schema-reference.md` L47, and no code produces it.
- **2. The real promotion step is undocumented, and following the documented one demotes the component.**
  - Served readiness is derived (`ComponentIndexer.ts` L844–906): implementation file, baseline files, a pattern-matching test file, `reviewed: true`.
  - Spec 086: `reviewed` is "the only human-judgment input" (`design.md` L316); one commit set it on every schema (`fdebf33b6`, 091 Task 4.1); no `governance/` doc mentions it.
  - The readiness doc's promotion step says "Update schema: `readiness: production-ready`" (L305, L398). The parser accepts that string silently (`parsers.ts` L123), `reviewed` then reads false, and the MCP serves `development`.
- **3. Readiness has four answers, not three.** Besides F11's three, `Component-Quick-Reference.md` L38–53 rates 9 families 🟢, while the readiness doc (L545–558) rates only Buttons 🟢.
- **4. Tokens.** The development guide contradicts Core Goals (table below). Its `tokens.ts` example (L570) and Token-Governance's location and import (L565, L580) don't match the code. Code: `defineComponentTokens` from `'../../../build/tokens'`, 7 files under `src/components/core/<Name>/`, 5 not named `tokens.ts`.
- **5. A route that no seat receives.** Tier 3 escalations go to "Thurgood triages" (`Product-Handoff-Protocol.md` L129–150; `MCP-Relationship-Model.md` L176). My charter has no triage duty.
- **6. Findability: partial.** Agent-Directory → Lina → standards and readiness docs, which hold items 2–3. 56 inline `.kiro/steering/(Component|Token)*.md` paths in 8 `governance/` files point where only identity docs now live — including the readiness doc's own query example (L620).

| Claim A | Claim B | Code |
|---|---|---|
| Schema `readiness` is a scalar: `production-ready\|beta\|placeholder\|deprecated` (Readiness L436–447; Standards L288; Schema-Format L124, which adds `development`) | A string: `production-ready\|development\|experimental` (metadata-schema-ref L47) | Neither: a per-platform `{reviewed}` object in 34/34 schemas, with 5 served statuses (`models/index.ts` L138–149) |
| Button-CTA/Icon are 🟢 (`Component-Family-Button.md` L85–86) | 🟡 with mobile at scaffold (Readiness L566+) | web `production-ready`, native `scaffold` (F11) |
| Production-ready needs >80% coverage and contract tests (Readiness L49–60) | Any matching test file plus `reviewed` | B |
| A primitive fallback is "✅ OK" with a TODO (CDG L165) | Ask first and never assume (CDG L167–176; Core Goals) | No check either way |
| The agent creates component tokens (CDG § Step 3) | "Creating ANY token: Always requires human review" (Core Goals; T-G § "Universal Rule") | No check either way |

- **Where 131 touches this.**
  - **Row 19 (P2).** Cover every surface stating readiness, or the new fields become a fifth answer. **Class option:** one served answer, with prose status columns either generated from it or deleted. Cost: Lina's P2 scope grows by about six docs.
  - **Row 18.** "Creation review: yes" — but the guide teaches creation without a checkpoint, and Peter can't review the diff (R0 item 2). I'd mark it **unmeasured**; asking Ada for a fact.
  - **Ask (c), "one home":** token governance is stated three times (Core Goals, Token-Governance, the guide).
- **Residual.** The strict prose bar may be deliberate abstraction, not drift — Lina's call under the three-layer boundary; flagged, not resolved.
- **Outside 131, to file with their owners (not filed):**
  1. Undocumented `reviewed` gate; demoting transition steps (Lina).
  2. The schema-vocabulary docs disagree (Lina).
  3. The Quick Reference and family-doc statuses disagree (Lina).
  4. The development guide's token steps contradict Core Goals (Ada and Lina).
  5. Token-Governance's component-token location and import are stale (Ada).
  6. The Tier 3 triage duty has no seat (Thurgood, with Peter, because it is a charter edit).
  7. The 56 stale paths (Thurgood). Unchecked: whether the scan sees inline paths.
  8. No intake step asks the tier (Lina and Thurgood).


#### [OUTSIDE R1]
*An orchestrator-run, charter-free read, not a seat. Same model family as the seats: low independence. Claims cite a file or grep.*

1. **The binding constraint is fixing, not detecting, and the outline never names it.** → design-outline.md § 3 "What the map shows" (last line); § 9
   - Lina's 2026-10-02 rehearsal on test01 (`.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`) already found R4, the false "✅ Everything DesignerPunk manages is up to date" that test01's F-9 found again on 10-24. It also found R2, the same `.npmrc`-pin class as F-1.
   - Since then the record has been through two lapses, a waiver, two re-triggers and a third-lapse escalation rule (lines 6–7, 74–81). It is still unfixed.
   - So use did happen after June (F24 is overstated); the records system then carried its findings for three weeks.
   - Row 13's "**E**, if the age signal triggers action": it already triggers re-ruling, not repair. Measure fix latency, not record age.

2. **None of the 14 test01 records is filed, including a P0-guess.** → § 7
   - `ls .kiro/issues | grep 2026-10-24` shows only a component-token file. No file outside 131 cites the rehearsal.
   - F-8 (docs MCP serves 9/83 docs, rated `strong`) breaks the always-loaded Certainty Calibration rule in every migrated consumer, because that rule trusts `matchConfidence`.
   - A spec about A3 leaves A3 undone for its own evidence. The cheapest outcome act available is to re-run the rehearsal on the 16.1.0 candidate before its tag.

3. **Row 1's replacement is the same layer renamed.** → § 3 row 1; § 6 F-8
   - P10b's "record what they **found**" is model-written attestation, so `surviving: []` becomes "found: none".
   - Its sunset (zero FOUND for N releases) *rewards* finding nothing. Every metric in § 5 gets a gaming guard; P10b gets none.
   - Peter answered F-8 in `[PETER R0]` item 1: the outcome is output that "works as intended". The rehearsal measures that; a read does not. Row 1's **E** should rest on the rehearsal.

4. **Row 10 overstates "for packaging and text, yes".** → § 3 row 10
   - 16.0.0 passed its RELEASE pass. test01 then found false shipped text (`--help` "No configuration needed", the `sync` all-clear) and packaging defects (`exports` points at the unminified bundle; the badge links an unshipped file).
   - Passes check listed claims, not the consumer's path.

5. **Net mechanisms likely rise.** → §§ 3, 5, 6
   - Four true deletions.
   - About eleven new or re-shaped mechanisms: the OWNERS file, touch report, P10b path-print and sunset counter, age signal, evidence-command column, fixture, pack-diff, word budget, freeze, admission rule, and five metrics with guards. The metrics have no owner or trigger (the F20 pattern).
   - Rows 1, 7 and 13 and § 5 fail § 4's own *sustainable* check: each needs another mechanism to work.

6. **The four values, applied to the outline itself.**
   - **Thorough**: six of the "Delivered?" cells say Unmeasured, yet row 9 and row 12 are kept and row 5 is dropped without evidence. No rule says how an unmeasured row is judged.
   - **Holistic**: the reviewer table names no consumer, though rows 17 and 19 and 16.1.0 land on consumers. The always-loaded set is about 11.7k words (`wc -w` over the nine identity docs), and R1 ask (c) grows it.
   - **Thoughtful**: only one approach was explored (the map). No fix-first alternative was weighed, and no check is re-run after shipping.
   - **Sustainable**: see item 5.

7. **A much simpler version.**
   - (a) Fix the 10-02 and 10-24 findings.
   - (b) Make "the test01 rehearsal passes on a scratch copy" a scripted release step, owned by one named seat.
   - (c) Do the four true deletions.
   - (d) Admit no new governance law except deletions until the rehearsal is green for N releases. Then retire the rows nobody missed.
   - What survives: the rehearsal covers web and package only, so native still waits for 129. Even so, § 9's "if 129 slips, 131 can only delete" is false: the web-and-package rehearsal can run today, in about 35 minutes.

8. **Vision and principle (items 4 and 6): mostly rearrangement.**
   - No row or metric tests whether the system knows the procedures for a designer's request. Metric 1 counts Peter's decisions, not whether the system supported them.
   - Transparency gets no proposal: test01's false "up to date" is that failure, and no row owns it.
   - Item 5 (human conventions) is unaddressed: ballots, signatures, OWNERS file and metrics are all human constructs.
   - The outline would move toward the vision only if a non-model sensor became its primary mechanism. Today that sensor appears as P10a, in the map's last line only.

9. **Minor.** Row 20's **B** rebuilds a review Peter says he can't do (item 2). F-8's "No seat has answered" is stale (item 1).


---

#### [PETER R1]

*Peter's words, chat, relayed by the orchestrator, 2026-10-24; typos corrected, meaning unchanged.*

1. **"Validated or experimental" is the product tier** → R1 entries [THURGOOD R1 — ask (b)] item 1, [LINA R1] lifecycle findings; outline row 19; R1 ask (b)
   > "Re: 'validated or experimental', I thought that experimental components and tokens were intentionally not promoted to the system level. I think it was something to the effect of a product component and/or product token. It's a subsystem within Rosetta and Stemma, IIRC."

**Orchestrator note for R2 (not Peter's words; checked against the docs, 2026-10-24).** Peter's recollection matches the written design:
- **The tiers.** `governance/DesignerPunk-Integration-Guide.md` § "Governance Gradient" (L934). The *product extending* tier holds product tokens (`product/tokens/`) and one-off components, under lighter review. The *design system* tier gets full review.
- **The promotion path.** It runs *product → system* only when an artifact proves reusable (L944). `governance/MCP-Relationship-Model.md` § "Promotion Path" (L157) gives the signal: two or more verticals independently define the same semantic need. The route is Stacy's Lessons Synthesis Review, then a Tier 3 escalation that Thurgood triages to Ada or Lina, then Peter's approval.
- **The authoring stance.** `governance/Product-Token-Governance.md` L24: "deviation is welcome; deviation without communication is not."

So "experimental" means product-tier, deliberately not promoted until proven. R1's "never asked" overstated the gap. The construct exists. What R1 found, restated for R2:
- (a) No step at intake routes a designer's request into the tier choice.
- (b) Promotion has never run: no Lessons Synthesis Review record exists (Ada, Lina).
- (c) The Tier 3 triage step has no charter owner (Thurgood ask (b)).
- (d) The Product MCP is listed as "conceptual" (`.kiro/steering/Civitas-System-Overview.md` L39). How much of the product subsystem is live is unverified.

This is a said-vs-built gap in an existing design, not missing design. It stays outside 131's scope per `[PETER R0]` item 4.

---

### Round 2 (R2)

#### [THURGOOD R2]

*Author's incorporation round. The outline is rewritten to current text (`design-outline.md`, R2 draft); this entry is the ledger. Section numbers below are the R2 outline's: § 3a binding constraint, § 3b map, § 3d adds vs removes, § 4 approaches, § 5 principles and outcomes, § 6 metrics, § 7 seat review, § 8 dependencies, § 9 tasks ideas, § 10 forks.*

**Mentions addressed to me**
- [@THURGOOD] from DATA R1 (theme emission): **yes, as a conditional.** § 8 now reads: a native platform's rows 10 and 19 change only at that lane's green; if 128 owns native theme emission, native rows 10 and 19 stay B through 131. I can't state that 129 owns emission: 129's outline holds that open (L59), and it is 129's question to settle, not 131's. -- [THURGOOD R2]
- [@THURGOOD] from SPARKY R1 (charter restatements): **yes. I will draft the values ballot so that its execution unit also cuts the charters' AICP restatements to pointers.** I'll find the sites by grep at draft time, not by hand count. Each seat is consulted on its own charter, and Peter merges (`canonical/agents/**`). Your residual is why it has to be the same unit: the added length pays off only if restated and procedural text leaves with it. Counter: that makes the unit touch all eight charters and a regeneration. If Peter wants it smaller, the cut moves to P7's charter rewrites and your residual stands unanswered until then. -- [THURGOOD R2]

**Incorporation ledger**

*[STACY R1]*
- 1 (F3 corrected): incorporated, row 1. The verdict holds on different evidence: signing worked once, then decayed.
- 2: incorporated, row 3 stays unmeasured. 3: incorporated, row 4 reads "unread", held for 16.1.0. 4: incorporated, row 5 **D**. 5: incorporated, row 6. 6: incorporated, row 9. 7: incorporated, row 12 (block kept, header **D**).
- 8 (sunset falsifier): incorporated in § 5 ("sunsets with falsifiers") and F-10.
- 9: incorporated, row 11's check.
- 10: incorporated; metric 4 is now fix latency, guarded by a count of unfiled findings.
- 11: incorporated, metrics 2 and 3. 12: carried as **F-15**.
- 13: carried as **F-14**. 14 and 15: incorporated in § 5's release findings report.
- 16: incorporated as § 3b's rule for unmeasured rows.
- 17 (four values): used in the § 3b verdicts and § 11.
- 18: incorporated in § 5 addition 2 ("a value is never cited as evidence").
- 19: incorporated in F-2's evidence. The Humorphism reading itself goes to the values ballot.

*[LINA R1]*
- 1 (ownership): incorporated in the conflicts block, the § 9 "pure deletion" definition, and the stakeholder table (corrected above).
- 2 (`readConsumerSpans`): incorporated, row 3 and F-3.
- 3: carried as **F-11**.
- 4 (OWNERS ordering): incorporated, § 9. OWNERS lands no later than the signature deletion, in the same unit.
- 5: incorporated, row 7.
- 6: incorporated, rows 13 and 19. The `/\.test\.ts$/` detail goes to P2's design.
- test01, the fork class: incorporated in § 8 (the fixture includes a consumer-owned fork). Your two self-filed records: noted.
- (b): filed with you, outside 131, except the shared vocabulary, which rides row 19.
- (c): to the values ballot.

*[ADA R1]*
- Row 18 split: incorporated as 18a/18b/18c. 18b reads "unmeasured in practice"; your tokens-added line is listed as a candidate, not counted.
- Ratchet baseline and naming the ratchet as the check: incorporated, § 6 and row 10.
- F-5 evidence: incorporated.
- P8 list and both conditions: incorporated, row 17.
- test01 on `src/cli/**` and the post-condition class option: incorporated in § 5 (transparency) and § 8 (routing). The fixes stay yours.
- (b) items 1–5: filed with their owners, outside 131. Item 5 is the 18b candidate.
- (c): to the values ballot.

*[LEONARDO R1]*
- 1: incorporated as **O-1**, § 5.
- 2: incorporated in row 17's check (the served-corpus probe after install and upgrade).
- 3: incorporated, row 19 (`compiles: unverified` may land before 129).
- 4: incorporated, § 3c and approach B (b), including the design task.
- 5: home incorporated in § 8 (proposed 129). Your content ownership: incorporated. Keeper: **F-12**.
- 6: incorporated, F-6. 7: incorporated, § 5.
- (c): to the values ballot.

*[KENYA R1]*
- 1: incorporated in § 8. The keeper is **F-12**, the unit is **F-13**.
- 2: incorporated, § 6 (fingerprints, inventory floor, `-wmo`).
- 3: incorporated, row 10.
- 4: incorporated, row 19.
- (c): to the values ballot.

*[DATA R1]*
- 1: incorporated in § 8 and F-12.
- 2: incorporated, § 8; see my mention answer.
- 3: incorporated, row 19 (`compiles: {verb, sha, result}`).
- 4: incorporated, row 10.
- 5: incorporated, metric 2.
- 6: not incorporated. It is true, and no outline change follows from it.
- (c): to the values ballot.

*[SPARKY R1]*
- 2: incorporated, § 5 addition 2.
- 1, 3–7: to the values ballot. Item 7's residual is carried in my mention answer.

*[OUTSIDE R1]*
- 1: incorporated as § 3a. F24 is restated there.
- 2: incorporated in § 8 (owners' filing is owed now; the 16.1.0 re-run is handed to the release work). **I did not file the records**: this unit's write scope is the spec folder, and filing is the owners' act. My own two items (F-1/F-2, the install doc) are listed in § 8.
- 3: incorporated. Row 1's **E** rests on the rehearsal, and P10b is now **F-10**.
- 4: incorporated, row 10.
- 5: answered with a count, § 3d: removes 14, adds 9 (4 of them replacements), so net −5, or −2 with every add-fork taken.
- 6: thorough → § 3b's unmeasured rule. Holistic → the note under the stakeholder table. Always-set growth → the values ballot. Thoughtful → § 4 (two approaches) and the rehearsal as the re-run's home.
- 7: incorporated as approach B and proposed as the spine (**F-9**).
- 8: incorporated as O-1, the transparency items, the agent-native line, and B's sensor-first spine.
- 9: incorporated, row 20 **D** and F-8.

*[PETER R1]*: incorporated, § 2. The gap is wiring and exercise, outside 131.

*Brief item 4 (Peter, 2026-10-24)*: the two-part seat review is § 7.

**Declined, with reason**
- Ada's tokens-added PR line: listed, not adopted. It is Ada's design call, and adopting it would add a mechanism without retiring one.
- Any change from Data 6 (above).
- Restating the ask-(c) views in the outline: they are inputs to a separate ballot, so the outline points to it rather than absorbing them.

**My four values, applied to my own revision**: § 11 of the outline. In one line each:
- Thorough: five rows are still unmeasured.
- Sustainable: five net-new mechanisms, and the rehearsal is a standing duty for one owner.
- Holistic: native consumers wait on 129, and the seats cut duties they carry.
- Thoughtful: approach B is reasoned, not tested.

**Length**: the outline is about 4,540 words, just over the ~4,500 guide. The 20-row map needed its R1 facts inline so that it can be checked without opening this file.

**Forks for Peter after R2** (one line each; the full text is in outline § 10)
- F-1 · `Agent:`-trailer check inside the touch report: yes or no.
- F-2 · Self-governance boundary: (b) with a deletion asymmetry, or Peter samples deletions too.
- F-3 · Freshness gap at the first reduced release: keep freshness until then, or accept the gap.
- F-4 · Word budget: adopt or not.
- F-5 · Freeze: adopt or not, and whether it exempts 129.
- F-6 · Peter's read: are reports plus rehearsal plus pack-diff enough, or a sampled read of shipped claims too?
- F-7 · The unset numbers.
- F-8 · Partnership: answered toward own-voice found items; remains only as F-10.
- **F-9 (new)** · Spine: fix-first (B) with the map as backlog, or the map (A).
- **F-10 (new)** · An owner read of changed paths: keep it with Stacy's falsifier, or drop it and let the rehearsal carry row 1.
- **F-11 (new)** · Operative item lists: kept as what reads cite, or retired with their readers.
- **F-12 (new)** · Fixture keeper: Leonardo or Stacy (with Kenya's platform-maintainer variant).
- **F-13 (new)** · Fixture unit: inside 129's harness unit, or a 129 follow-on.
- **F-14 (new)** · Claims-pass length: cap the record and generate an uncapped report, or no cap anywhere.
- **F-15 (new)** · Metrics reader: the release report Peter reads, or Stacy's RELEASE record.

**Mentions to other seats still unanswered (carried to those seats)**
- [@LEONARDO] from LINA R1: must the fixture include a consumer-owned fork? It is in § 8 as a proposal; the fixture's content owner confirms.
- [@ADA] from LINA R1: is opening `exports` subpaths that forks can reach your packaging call? This is release work, outside 131.
- [@LEONARDO] from ADA R1: should Rosetta-System-Architecture stay served (its § "Module-Resolution Contract")?
- [@DATA] from KENYA R1: one shared driver, yes (your item 1). On the same maintainer duty, your entry reads it the other way, so this is carried as F-12 for you to confirm.
- [@ADA] from KENYA R1: ratchet baseline, a committed number or main's last measurement? Your R1 gives the packed tarball at the arming sha; whether a fingerprint key changes that is still yours.
- [@LEONARDO] from KENYA R1: is the Settings spec stable enough to be fixture input?
- [@LEONARDO] from SPARKY R1: do Humorphism's product-UI patterns belong in product design guidance? This is also a values-ballot input.
- Answered in R1: [@KENYA] [@DATA] from LEONARDO R1 (Kenya item 1; Data item 1).

---

#### [PETER R2]

*Peter's words, chat, relayed by the orchestrator, 2026-10-24; typos corrected, meaning unchanged ("parody" → "parity").*

1. **The layer test** → `design-outline.md` § 1 ("What this spec is, then")
   > "Re: 'A layer can go when its outcome is sustained by something cheaper, when it is enhanced by something better, or when it is knowingly dropped for a stated reason.' I would frame closer to something like: 'A layer can go when its outcome is sustained by something that provides parity, or enhancement, at cheaper cost or faster execution, or is knowingly dropped for a stated reason.'"
2. **The ballot audit and triggers** → `evidence/2026-10-24-ballot-audit.md`; outline § 3a
   > "Re: the ballot audit, does this more-or-less mean we need a triggering mechanism to surface the ballots? (Because another layer is exactly what we need... this is sarcasm)"
   > "Re: 2, this is not a suggestion, but could tying the ballots to CI be effective?"
3. **Holistic, amended** → outline § 5 (design principles); Peter's own definition
   > "We might consider a reframe to something like 'the needs of those negatively impacted are appropriately mitigated' to 'additional burdens are appropriately acknowledged, mitigated and supported'"
4. **A proactive learning loop** → outline self-sustaining requirements; the composed learning loop (`2026-09-19-completion-claims-integrity.md` R6; `canonical/agents/stacy.md` L425)
   > "Re: self-sustaining requirements, we might consider including pro-active learning loop: the ability to proactively learn from errors, mistakes, and recognize the need to act on and/or preserve those learnings. I think we have a framing for that somewhere in our documentation already maybe."
   > "Re: 4, we might think of a simple mechanic to flag when a learning should be converted to a rule. 1. Record the learning 2. Keep a counter of the number of times the learning's applied. 3. Each time the agent applies the learning, update the count. 4. When the counter reaches an appropriate threshold, convert to rule ... maybe, I'm not sure."
5. **The next round** → this feedback doc
   > "I'm very interested to see how the agents assess this outline in the framing of the values and what their suggestions/proposals are"

**Orchestrator notes for the round (not Peter's words; proposals for reviewers):**
- *Layer test (1):* "cost" should name context and human attention, not only maintenance — or a fast replacement that adds always-loaded text or questions for Peter passes the test while making things worse.
- *Triggers (2):* the audit points away from a surfacing layer. Rules lapse when their triggers are prose and their duties scattered. Non-layer moves: put the rule in the command or check where the work happens (RS-13's "guards in the command the operator runs"); fewer rules, fewer triggers; a rule whose trigger passed unnoticed is evidence it wasn't load-bearing. On CI: the register already ties rules to checks, and rules **with** a CI check are the ones that held; the audit's lapses are rules ratified with `checks: []` (three since 2026-09-19). The tie works when the check *is* the rule — replacing the prose, not added beside it — and a rule that can't be checked is ratified as advice.
- *Holistic (3):* full text as amended: "consideration for the needs of stakeholders in the blast radius of a decision or solution, and that additional burdens placed on them are appropriately acknowledged, mitigated and supported."
- *Learning loop (4):* the existing loop is run unreliably (its one-line outcome is missing in 4 of 7 passes, audit) and has been a growth engine. Proposed shape: **learn → act or preserve** — act defaults to fix, delete or narrow; preserve puts the learning where it is read when it matters (a check, the operating rules, the owner's records), not a new ballot. On Peter's counter: counting *applications* relies on self-report (seats don't persist across sessions, so "I applied it" is attestation) and is bookkeeping per use. Counting **recurrences of the mistake** a recorded learning was meant to prevent is cheaper and not self-reported: a finding that matches a recorded learning cites it; at N recurrences the learning is promoted — preferably to an executable check. A learning applied reliably without a rule may not need one.

---

### Values-lens round (reviewers' R2)

*Each entry below was written by its seat in its own staging file and assembled here verbatim by the orchestrator, 2026-10-24: required reviewer first, then system seats, product seats, and the charter-free outside read. Every seat reviewed the R2 outline through Peter's four values (holistic as amended in `[PETER R2]`) and the amended layer test, with the ballot audit (#458) as evidence. Views on F-2 and F-6 are from interested parties. Peter ruled to keep the outside read's line about the orchestrator's auto-memory (2026-10-24).*

#### [STACY R2]
- **Pre-step**: no open `[@STACY]` mentions (`grep -rn "@STACY"`; THURGOOD R2's carried list names none). Sources at `0972178f4`: the claims passes, `canonical/agents/stacy.md`, the ballot audit (PR #458) and my cross-check.

**1. The values, from the verifier's lens** → design-outline.md § "11. Counter-argument, and the values applied to this revision"
- **Thorough.** *Meets*: § 3a ties verdicts to fix evidence. *Strains*: the audit (§ 3) lists mechanisms the map has no row for, including the one armed completion check (`completion-criteria-parity`), the publish path and the `**Open for Peter**:` hold. These held; none should be cut without a row. Also, "unfired" in a "Delivered?" cell can hide a lapse: four events had passed with their rule unapplied (cross-check § "Patterns").
- **Sustainable.** *Meets*: net −5. *Strains*: § 3d counts mechanisms, not event duties. My charter's claims-audit section is 5,216 words loaded every session; its counting block is one 776-word line, and it grows by a line per ballot (audit § 2, claims family). Cost includes context (orchestrator note on `[PETER R2]` 1: agreed).
- **Holistic** (as amended). *Strains*: F-12 may give the about-35-minute rehearsal to my seat, which also runs RELEASE. § 8 does not acknowledge or support that burden.
- **Thoughtful.** *Strains*: B (d) "retire rows nobody missed" is the zero-found sunset I flagged in R1 item 8. It needs a falsifier: a SYMPTOM or rehearsal finding traced to the removed layer's outcome brings the layer back.

**2. Proposals (net reduction)** → § "3b. The map", § "5. Design principles and outcomes"
- **P-A · A trigger is computable or it is advice.** Events visible in git (instrument-path PRs, `.github/**` PRs, closeouts) print in `./scripts/owed-set.sh`, already pasted at LIVENESS and RELEASE-FLOW 5a. Prose-only events (the dial, counterexample routing, TND F-3) are re-ratified as advice or dropped. **Retires**: (a) six-roots' instrument-path ARMING limb (fired at least 5 times, 0 reads, my seat's miss; RELEASE covers the delta by its own text); (b) the steward-verb carve-out, whose drop limb's event passed at 123 MIDPOINT (cross-check row 127-settle). On `[PETER R2]` 2: yes, tie rules to CI, but only where the check replaces the prose.
- **P-B · Generate the counting block or drop it.** Computable counts move into the metrics script; uncomputable counts that never produced a finding go: delegated-tier, consult line, census, edit-kind, re-grounding, delegate-audit pointer. **Retires** most of the 776-word line. **Kept**: promised/claimed/shipped findings, the closed `not re-verified — <why>` string, and the deferral walk-back.
- **P-C · One learning ledger.** **Retires** my Incremental Capture Rule (`lessons-in-progress.md`: 0 files in the repo, ever) and the composed loop's one-line outcome (absent in 4 of 7 passes, per the audit). Both are replaced by the RS-numbered `Standards implications` ledger the passes already keep (§ 4).

**3. Identity forks** → § "10. Open forks"
- **F-9**: **B**, on one condition: audit § 3's "new row" items get rows before any deletion unit cites them. The rehearsal is the only sensor that found new classes after my 16.0.0 pass (§ 3a; row 10).
- **F-2** *(interested party)*: **(b) with the asymmetry.** "Peter samples deletions" is row 20 again: 0/314 ever ran (cross-check). Key the step-back to recorded findings. A traced SYMPTOM suspends self-deletion in that area.
- **F-6** *(interested party)*: **reports, rehearsal and pack-diff are enough** on the consumer path. Non-model sensors are more independent than another read. The condition: the report lists every uncovered claim as `owed — needs <actor>`, never a ✅. System specs with no consumer path stay with the passes.

**4. Learning promotion: count recurrences** → § "5", self-sustaining
- The passes already count recurrences. RS-13 (pre-release obligations with no detector) was evidenced again three times and escalated at the third (`claims-pass.md` L331). It was promoted into the obligation-drain ballot (L362). R2, R4 and R6 still lapsed afterwards (§ 3a). So recurrence works as a detector; the promotion target should be an executable check where the work happens. A recurrence after promotion means the promotion failed (16.1.0's walk tests RS-13).
- Application counts are self-report with no shipped-side referent, like reflexive `plan held` (9/9, 15.1.0 L372). Once a learning is a check, its run log is the application count, at no cost.


#### [LINA R2]
No `[@LINA]` mentions open (at `bc468a411`). The audit leaves TND F-3 on #452 to "Lina's read". **My read: not fired.** The values didn't change: 56/72/80 became `size700`/`size900`/`size1000` (`SizingTokens.ts` L20–23). But #452's body records no read, and whether "rendering" means the source or the output needs its author.

**(1) The four values**
- **Thorough.** *Meets*: § 9 names both seats' files (`dispositions.ts` L65, L280–283). *Strains*: TND (#38) is not on the map (audit § 3), and its F-1 `rendering` field is in 0 of 34 `component-meta.yaml`. Row 1 should split. The `signature` fields go (40 lines in `canonical/profiles/consumer/`). The explicit rows and the missing-row refusal (DD25) stay: they derive, they don't attest. → § "3b. The map" rows 1, 19
- **Sustainable.** *Meets*: net −5; one OWNERS file for three uses; `verify-signing-chain.ts` (1,727 lines), `freshness.ts` (697) and `signatures.ts` (205) go. *Strains*: § 3d leaves out context cost. My always-loaded charter is 4,296 words. Of those, 273 are the six-roots scope bullet and 130 the delegate signing audit, which Ada's and Leonardo's charters also carry. → § "3d. Adds vs removes"
- **Holistic.** *Meets*: P5's removal gate; the fork in the fixture (§ 8). *Strains*: row 19's public downgrade burdens consumers and Leonardo's selection. Under Peter's "acknowledged, mitigated and supported", the support is `find_components` returning the fields, so selection needs no doc. And § 3a is partly my seat: 10-02 R2, R4 and R6 lapsed twice, and my two R1-promised records are still unfiled at `0972178f4`. → § "3a"; row 19
- **Thoughtful.** *Meets*: two approaches, dissent kept. *Strains*: B is untested (§ 11). The 16.1.0 rehearsal, its cheapest test, is handed away (§ 8); its fix outcome isn't B's first datum. → § "4. Approaches considered"

**(2) Proposals (net-reduction)**
1. **Row 19 absorbs TND F-1 and F-3.** `rendering: designed | native` becomes a per-platform readiness field. F-3's "modified" is computed: a diff under `platforms/**` or `contracts.yaml` puts the component in row 3's changed-path list as "floor evidence owed". *Retires*: the audit's proposed new TND row; F-1's homeless separate site; F-3's prose trigger, which nothing detects. *Records*: TND § 8, F-1 (iv) item 1 and F-3 (L318); audit § 3; audit cross-check, #452. → row 19
2. **§ 3d counts always-loaded words** per mechanism removed or added. That puts context into the layer test's "cheaper cost" (orchestrator R2 note) and shows what OWNERS saves (row 15). *Adds*: nothing standing; it is part of the one-time count. *Records*: `[PETER R2]` 1; the charter counts above. → § "3d"
3. **Promote a learning on recurrence.** A finding that matches a recorded learning cites it. At N recurrences the learning becomes a **check**, not a ballot, and its prose is deleted. *Retires*: the prose at promotion, and any application counter. *Records*: the #445 lesson was promoted to ballot #47, which is still unbuilt with 0 hits (audit § 1). It composes with `Standards implications` (`stacy.md` L424), so Stacy is consulted. → § "5" (self-sustaining)

**(3) Forks**
- **F-9: B.** My seat is its evidence. My R2/R4/R6 fix PR before 16.1.0 phase 1 is B (a)'s first measured fix; otherwise the third lapse goes to Peter, as ruled.
- **F-2 (interested party: my duties and code are cut).** (b) with the asymmetry, plus two lines. Required checks on shipped bytes never sunset for rarity. Anything a consumer reads (readiness, MCP contracts, `component-meta` guidance) stays Peter's: a pass missed 10-24's false shipped text (row 10).
- **F-6 (interested party: rehearsal owner).** No sampled read. Pack-diff and the rehearsal run the artifact; nothing runs the guidance's *meaning*. The rehearsal's design task (`[LEONARDO R1]` 4) is that read, if its transcript excerpt goes into the report.

**(4) Count recurrences, not applications.** Application counts are self-reports from seats that don't persist across sessions. They reward citing a learning, not avoiding the mistake. A learning applied reliably shows zero recurrences: it needs no rule. Recurrences come from findings that cite the learning, not from self-report. Their weak point is filing (§ 3a: F17 and my two records are unfiled), so metric 4's unfiled guard must exist first. Keep Peter's counter only as a falsifier: a learning cited as applied whose mistake still recurs lives in the wrong place.


#### [ADA R2]
*Read at #457, #458, main `0972178f4`.*

**Mentions**
- [@ADA] from LINA R1, `exports` for forks: the call is mine (Module-Resolution Contract); no charter `writeScope` lists root `package.json`. **Don't open deep subpaths.** Each makes component internals a semver surface Lina must hold. The fix is mine: `--migrate-components` keeps an unmodified base that a kept fork imports, and says so (test01 F-5(b)). *Survives*: the consumer keeps a base copy. Outside 131. -- [ADA R2]
- [@ADA] from KENYA R1, baseline: **a committed fingerprint set**, measured from the packed tarball at the arming sha. Main's last measurement lives in expiring, unreviewable CI artifacts. Any new fingerprint fails, whatever the count. **Self-tightening**: an entry no longer produced fails as stale until the same PR deletes it. -- [ADA R2] → design-outline.md § "6. Metrics"

**(1) Values**
- **Thorough.** *Strains*: (a) row 18b says validators check "fit, not need". They don't check fit for custom values: `defineComponentTokens.ts` L273 records any number under a "family-conformant value" comment. (b) § 8 calls native emission open. My served law says "Emitting them is planned in Spec 129" (Token-Governance L274, re-signed in #451); 129's outline L59 asks. One must change; I'd pick 129 (interested: generator owner), or the `dpTheme` files (26/39 iOS, 25/39 Android) keep native "= 0" out of reach. → design-outline.md § "3b. The map", § "8. Dependencies"
- **Sustainable.** *Strains*: B runs on owners' fixes, and mine are the biggest pile: test01 F-4 and F-8–F-11 (`src/cli/**`) and F17's Swift defects are unfiled. I'm part of § 3a's constraint. → § "3a"
- **Holistic.** § 5 needs Peter's R2 amendment. On my surface: pre-123 consumers with forks (F-5(b), unrepairable today), and O-1's "which token for Y?" while served docs teach non-key names (the 2026-10-23 non-key-names P0, partly mine). O-1 fails until fixed. → § "5"
- **Thoughtful.** *Strains*: 18b and 18c are unmeasured; nothing re-runs them.

**(2) Proposals**
1. **A tokens-added/removed section in the pack-diff** (already counted), diffed from `token-index/` between the last tag and the candidate. *Retires*: 18b's "unmeasured", and the inventory floor's exception step (a removed token is a legitimate drop on the same diff). Records: [ADA R1] (b) 5; test01 F-4 (35 → 10 component tokens, silently). → § "3b" row 18b
2. **The rehearsal script asserts CLI post-conditions** (served-doc count, configured directories exist, token count vs the last run). *Retires*: the manual diagnosis that took most of the ~35 minutes (rehearsal L138), and row 10's read of CLI final lines. Cost: one check per command. Records: [ADA R1] class option; `sync/Reporter.ts` L135. → § "4" B (b)
3. **Core Goals' token section** (364 words, always loaded) **becomes a pointer** to Token-Governance, with one selection order. The two disagree on steps 2–3 ([ADA R1] (b) 1); Peter picks the order. It rides the Core Goals ballot fix-now 4 already needs (audit § 4) and removes Core Goals' part of the P0 record (L68). *Retires*: about 300 always-loaded words and a contradiction. → § "5"

**(3) Forks**
- **F-9: B.** *Folded*: B (d)'s "no new law" must exempt CORRECTION edits, or it freezes Proposal 3 and the P0 fix. *Survives*: B measures fix latency; it can't make me fix.
- **F-2** (interested: (b) widens my seat): (b), with the asymmetry limited to governance mechanisms. For tokens it runs the other way: removing a token breaks consumers; adding rarely does. Removal stays Peter's; Proposal 1's list is his read.
- **F-6** (interested: he reads my output): reports, rehearsal and pack-diff cover the consumer path, not served prose. Rather than a sampled read, check that every token name in served docs resolves in `token-index/` (the P0 record's class option).

**(4) Count recurrences.** Applications are self-report from seats that don't persist (row 1's decay pattern), and track how often a situation arises, not whether a rule is needed. Recurrences show up in findings: citable, and non-model where a check fingerprints them. Promote at the second recurrence after recording (the first shows the prose didn't hold), to a check where one can exist (for tokens, a formula or generator test). *Survives*: matching a finding to a learning is a model judgment, and counting is reactive. The proactive half is "act or preserve" at the first occurrence.


#### [LEONARDO R2]

*Read at PR #457 and the ballot audit (#458). Interested party throughout: I operate the onboarding trio and author the fixture's content.*

**Mentions**
- [@LEONARDO] from LINA R1: **yes, one fork.** It is Button-VerticalList-Item with a trailing value and chevron, which is what a consumer builds while G4 is open (`.kiro/issues/2026-10-13-component-gaps-from-settings-ledger.md` § G4). It exercises F-3, F-5 and F-7. → design-outline.md § "8. Dependencies" -- [LEONARDO R2]
- [@LEONARDO] from ADA R1: **in part.** The Token Consumption Rule lives only in `governance/Rosetta-System-Architecture.md` (L37–61), and consumers need it. Module-Resolution class B (L569 onward) is the consumer's half; the rest is engine law. Its authoring sample imports an engine path (L483). See proposal 3. → § "3b. The map" row 17 -- [LEONARDO R2]
- [@LEONARDO] from KENYA R1: **stable in intent, not in bytes.** The spec was accepted 2026-10-13 (archived ledger). Two things fail today: Button-CTA `size: md` (T3) and the missing Input-Radio-Set `accessibilityLabel` (required since #352). T1 also adds 9 false errors. I correct the spec when committing it; T1 is Lina's to settle first. → § "8. Dependencies" -- [LEONARDO R2]
- [@LEONARDO] from SPARKY R1: **not now.** No product screen needs these patterns. Under the admission rule, guidance without an unmet outcome is a layer, and intent-from-hover needs a consent and WCAG contract. It comes in as an experience pattern when a product specs such a surface. (Interested: it would be mine.) -- [LEONARDO R2]

**(1) Values**
- **Thorough.** *Meets*: § 3a cites its records. *Strains*: the onboarding trio, already owed at 16.1.0 prep (`.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`; RELEASE-FLOW step 6), is never named. § 3d adds a rehearsal beside it. → § "3d. Adds vs removes"
- **Sustainable.** *Strains*: each release runs the trio (about 76 min and 16.7k record words; `validation/trio-*.md`), the rehearsal (about 35 min) and the fixture. → § "3d. Adds vs removes"
- **Holistic.** *Meets*: O-1. *Strains*: Peter launches every trio session (Decision 1, 2026-10-14), and metric 1 cannot see that. → § "6. Metrics"
- **Thoughtful.** *Strains*: B is untested (§ 11). 16.1.0 fires the trio and the rehearsal together, so comparing their findings tests B. → § "4. Approaches considered"

**(2) Proposals**
1. **One consumer instrument, three legs** (interested party):
   - the 129 fixture in CI (path, compile, `validate_assembly` on the committed spec);
   - the rehearsal as the trio protocol's fourth run;
   - persona runs only when row 3's changed-path list touches the install doc or CLI output.

   **Retires**: the per-release trio cadence (Req 23.7, which Peter ratifies) and the rehearsal as a separate mechanism (adds 9 → 8). **Survives**: a CLI string outside the trigger list escapes. → § "3d. Adds vs removes"
2. **Fixed probes replace my open-ended design task** (`[LEONARDO R1]` 4): "can I use X on iOS?" and "which token for Y?", diffed against the generated readiness fields and token index. "Validated or experimental?" joins once intake is wired (§ 2). **Retires**: an unrepeatable model judgment. → § "5. Design principles and outcomes" O-1
3. **Split Rosetta-System-Architecture.** The Consumption Rule moves to Token-Quick-Reference and class B to the Integration Guide; the remainder leaves the served corpus. **Retires**: about 3.7k served words. → § "3b. The map" row 17

**(3) Forks**
- **F-9**: B, if B (b) names the trio. Otherwise fix-first duplicates an owed instrument.
- **F-2** (interested party): (b), with the asymmetry keyed to the consumer path: a deletion that touches what ships needs a green consumer run at its sha. Peter sampling would spend attention he says he lacks.
- **F-6** (interested party, since I would produce the report): reports, the rehearsal and the pack-diff cover shipped claims. They miss whether the system put design decisions to the human. Peter's read belongs on probe 3's output.

**(4) Recurrences.** Counting applications is self-report from seats that keep no memory between sessions; row 5's line was present 31 of 31 times and never used. A recurrence is seen by someone else, because the finding cites the learning. R4 recurred from 10-02 to 10-24 with no "application" recorded. My ledger's wrong-`strong` result recurred at D8–D10, which became R3. I'd set N=2 for consumer-visible classes, promoted to an executable check. A learning that never recurs needs no rule.


#### [KENYA R2]
*No open `[@KENYA]` mentions; mine are carried to Data, Ada and Leonardo. "Harness" = `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` § "iOS — Kenya". No new compile run.*

**(1) Values**
- **Thorough.** *Meets*: § 8's theme-emission condition, and § 6's fingerprints, inventory floor and `-wmo`. *Strains*: O-2 promises upgrade and install, but the rehearsal skipped native (rehearsal L160), and the fixture is install-only. test01's `dist/tokens/` already holds `DesignTokens.ios.swift` and `ComponentTokens.ios.swift` (`find`, 2026-10-24), which nobody compiles. F-4 (35 → 10 tokens, silent) is the inventory floor's class, on upgrade. § 1 L27 and § 5 L110 still predate `[PETER R2]`. → design-outline.md § "5. Design principles and outcomes"
- **Sustainable.** *Strains*: § 3d leaves "129's fixture and ratchet" off both sides, yet its own definition counts them. macOS is a new runner class: 11 `ubuntu-latest`, 0 macOS (harness item 3). → § "3d. Adds vs removes"
- **Holistic.** My duty (F-12) and red native output (§ 11) are acknowledged. Peter's attention is unmitigated until the red lane is labelled and non-required (`[KENYA R1]` 3). → § "8. Dependencies"
- **Thoughtful.** B (b) was tested once on web, in about 35 minutes. Native is untested: my two-session estimate and the `ImageRenderer` path are REASONING (harness item 4). → § "4. Approaches considered"

**(2) Proposals**
1. **The ratchet retires itself.** At 0 distinct diagnostics, the baseline, the fingerprint list and "no rise" go. The compile exit code and the inventory floor stay. *Retires*: three artifacts per platform; also puts the ratchet in § 3d's count. → § "6. Metrics"; `[KENYA R1]` 2
2. **New fingerprints route themselves.** The lane prints each *new* fingerprint with its generated line and source owner: tokens → Ada, components → Lina (harness item 4). The owner files at hand-off (§ 7). *Retires*: the triage step in my F-12 variant, and unfiled compile-class defects (F17's three, § 3a). Metric 4 then starts at detection. → § "3a. The binding constraint"
3. **One release step.** Typecheck the rehearsal copy's `output` directory: one driver, owner and trigger. *Retires*: the fixture's separate release trigger; narrows F-12 to keeping the lane working. *Residual*: test01 has no Swift consumer code, so the fixture screen still carries components and rendering. → § "3c"; § "10" F-12, F-13

**(3) Forks**
- **F-9**: B. 129 gates native under A or B. B's admission rule keeps native rows 10 and 19. *Residual*: B (d)'s "green N releases" is not native health while the rehearsal is web-only.
- **F-2** (interested party): (b), with the asymmetry keyed on metric 2's classes. Deleting an *executes* check needs Peter. *Reads text* or *model* checks: the owner deletes, with the reason printed in the release report. Sampling deletions asks a code read Peter says he cannot do (R0 item 2).
- **F-6** (interested party; my lane feeds it): reports suffice if they show, per platform, the share of shipped claims resting on an *executes* check, with `owed` for the rest. Neither rehearsal nor pack-diff covers native today.

**(4) Count recurrences.** Applications are self-report from seats with no memory between sessions (`[KENYA R1]` 5). Counting them also rewards citation ritual (`[STACY R1]` 18). Recurrences can be detected, and a fingerprint is the recurrence key. Forgetting `-wmo` hides 58 errors (394 vs 452, harness item 1): the recurrence shows; the application does not. *Counter*: a rare, irreversible mistake may never recur. Proportionality promotes it at N = 1, preferably to a check.


#### [DATA R2]

*Lens: Android lane, fixture, theme emission. At `bc468a411`, 25 of 39 Android component files read `LocalDPTheme`. "Charter" = `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`. Nothing compiled: no local toolchain (charter L159).*

**Mention from KENYA R1.** Shared driver: yes (charter L182). Same maintainer duty: **I change my R1 read and converge with Kenya.** Charter § 4 forbids per-pass *claim* verification ("they build tools; the verifier verifies"). Keeping the instrument running is tool work. Split by fault: lane faults (SDK, AGP, runner image) go to the platform seat, on the event. Output faults go to Ada and Lina. Stacy reads results as evidence by re-running the harness (§ 4). Interested party: the duty lands on my seat. → design-outline.md § "10. Open forks" F-12

**(1) The values**
- **Thorough.** Meets: § 8's theme condition; row 19's `{verb, sha, result}`. Strains: § 8 names one Android dependency, but green needs three. The other two are the generator defects and the colour decision. A JVM `colormath-ext-jetpack-compose` artifact is unverified; a shim would mask it (charter L173). → § 8
- **Sustainable.** Meets: compile values are derived. Strains: Android carries two compile lanes plus an emulator job, each with a fingerprint and a floor (§ 6). None is retired. → § 6
- **Holistic** (as amended: burdens "acknowledged, mitigated and supported"). Strains: § 3d counts the fixture and lanes on neither side, so the platform seats' burden goes uncounted. Non-compiling Android components are acknowledged in § 11; consumers learn it only from row 19's early `compiles: unverified`. → § 3d, row 19
- **Thoughtful.** Strains: B is untested on native; B (d)'s freeze keys to a web-and-package rehearsal, so it could lift while Android stays red. → § 4

**(2) Proposals (net reduction)**
1. **The check replaces the prose, per platform.** The PR that makes a native lane required also retires three things for that platform's compile class: the method-line clause (charter § 2(a)), the unverified-claim count (§ 5), and the JVM typecheck lane once the host gates (L180; 129's pick). Peter's CI question, answered as the audit's "Patterns" point: checked rules held, prose triggers lapsed. Adds nothing. → § 9
2. **Name all three Android dependencies in § 8, and key B (d) per platform.** Retires the implicit claim that web green speaks for native. → § 8, § 4
3. **Dissolve F-12 by fault class.** The lane's failure output names the generated line and its OWNERS entry, so the handoff is mechanical (§ 7; F17). Retires the fork and a keeper role. → F-12

**(3) Forks**
- **F-9**: B. What survives: on native, B *is* 129's lane, so 131 adds nothing native before that lane is green.
- **F-2** (interested party): (b), with the asymmetry keyed to metric 2's classes. If an *executes* check carries a deleted layer's outcome, the deletion is self-governed. If it leans on a *reads-text* or *model* check, it goes to Peter.
- **F-6** (interested party): no sampled read for native. Reading Kotlin is not executing it, and neither the rehearsal nor the pack-diff runs Android code. The report states per platform what is check-verified and what is `owed`.

**(4) Recurrences, not applications.** Application counts are self-report from seats with no memory across sessions (KENYA R1 (ii)), and climb fastest for learnings that already work and need no rule. A recurrence is an outside event: a finding, or a red lane. § 6's fingerprint already counts recurrences. Precedent: the `.dp` guideline became `TokenCompliance.test.ts` L615, a *reads-text* check; promote to *executes* where possible. What survives: recurrence counts only what a detector sees; Android defects recurred unseen for months. Where nothing detects, build the detector.


#### [SPARKY R2]

*Whole outline, web lens. Interested party on F-2 and F-6: my shipped charter is among the texts they govern. Read: R2 outline, `[THURGOOD R2]`, `[PETER R2]`, test01 evidence, ballot audit (#458).*

**1. The values**
- **Thorough.** *Meets*: § 3a rests on the one web-consumer run. *Strains*: "Web and package run today" overclaims. The render check (step 17) was a hand comparison in a browser. The repo has jsdom only (F26), which evaluates no media queries, so no release verifies reduced motion or forced colors. Two web defects are runtime behaviour: import order decides which component wins (F-7), and `exports` → unminified file grew the bundle 3.3× (F-6). → design-outline.md § "4. Approaches considered"; row 10
- **Sustainable.** *Strains*: B (b)'s "passes" is undefined. A written verdict brings row 1 back. → § "4. Approaches considered"
- **Holistic.** *Strains*: web consumers are the only real consumers (129 outline L50), and they carry F-8. With 9 of 83 docs served and matches rated `strong`, the shipped Sparky, whose charter routes everything through MCP, loses its knowledge. → row 17
- **Thoughtful.** *Strains*: my own P0 (`.kiro/issues/archive/2026-10-03-data-theme-scope-charter-vs-generator.md`) was filed on 10-03 and fixed on 10-23 (#451), once its trigger became `release:next:phase-1`. The release gate got it fixed; the lapse ladder did not. → § "3a. The binding constraint"; metric 4

**2. Proposals**
- **P-a · B (b) passes on post-conditions**: install, build and generate exit 0; served docs = packed docs (F-8); `tools/list` covers autoApprove and the shipped charters' routing (F-8's config lists `get_documentation_map`, which my charter calls removed); `customElements.get(name)` returns each fork's class (F-7; jsdom can do this); bundle bytes compared with the last release (F-6). Render and media-query claims print as `owed — needs browser`. *Retires*: step 17's hand comparison as a claimed check, and `sync`'s all-clear as evidence. → § "4. Approaches considered"; § "5. Design principles and outcomes"
- **P-b · If the rehearsal fails again, the tag is blocked.** That failure is the record's trigger. A waiver is Peter's decision, made in the report. *Retires*: the lapse/waiver ladder for that record class (10-02 R2/R4/R6: two lapses, one waiver, still open). This answers Peter's CI question: the check *is* the rule. → § "3a. The binding constraint"; row 13
- **P-c · Metric 2 classes jsdom like native targets.** It counts as *executes* for registration, DOM and ARIA, not for cascade, media queries or form association (F26). Web render claims start at 0. *Retires*: the unstated "web is covered". Precedent: Chromium only, Safari and Firefox owed (`.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`). → § "6. Metrics"

**3. Forks**
- **F-9**: B. On web, only B's sensor exists today. *Residual*: it depends on owners fixing (§ 11); P-b is my answer to that.
- **F-2** *(interested party)*: (b) with the asymmetry, if stepping back is triggered by a non-model signal. A rehearsal or SYMPTOM regression traced to a deletion restores that rule and returns its class to Peter. *Residual*: F31. "Peter samples deletions" would fit better as the report listing each deleted law sentence with its reason: that is prose, which he reads (`[PETER R0]` 2).
- **F-6** *(interested party)*: no. The rehearsal and pack-diff miss shipped prose claims that the fixture never exercises; my theme falsity would have passed test01. The report's `owed` list covers them, not a code read.

**4. Count recurrences.** Application counts are self-report from seats that don't persist, plus per-use bookkeeping (row 5: present 31/31, used 0). Recurrences show up in findings; nobody has to remember. *Caveat*: silent classes (F-7, F-8) recur unseen. Promote them when they are first detected, straight to a post-condition check.


#### [OUTSIDE R2]
*Orchestrator-run, charter-free, not a seat; same model family. Read at `bc468a411`.*

1. **B hands its first leg to the step the audit shows does not happen.** → design-outline.md § 4; § 8; § 11
   - B (a), "owners fix", is outside 131. § 11 concedes 131 can measure fixes, not cause them.
   - Not happening: `ls .kiro/issues | grep 2026-10-24` returns none of the 14 rehearsal records. The 10-02 residuals record is still ACTIVE. The audit adds four rules whose events passed unapplied, one in the verifier's own seat (six-roots ARMING: at least 5 PRs, 0 reads).
   - Within reach: 131's first unit cannot open while a cited finding has no record. A gate on an existing event, not a layer.

2. **On the audit, R2 rearranges unless it adopts the class rule the audit implies.** → § 3b; § 4 "Proposal"
   - The lapses sit in unchecked rules. The register's 61 `check_state` scopes: 27 armed, 1 dormant, 19 none, 14 proposed; 33 carry `checks: []` (grep, `classification-map.md`).
   - R2's admission rule governs *adding* map rows. The ~20 unmapped mechanisms (audit § 3) keep running unjudged; B (d)'s retirement reaches map rows only.
   - **Class option: a rule with no executing check is advice.** It keeps its text and loses its duty, trigger and lapse ledger. One ruling covers both. Cost: some advice gets ignored, as now. Survives: some unchecked rules carry real behaviour (consult-first, 43/43). They persist because they are cheap to follow.

3. **Where R2 still fails the amended values.** → § 5; § 6; § 11
   - **Holistic**: burdens acknowledged, not supported. The rehearsal is ~35 minutes per release for one owner, no backup. 16.1.0's pass fires every claims-pass duty ratified after 10-17 at once (audit § "Patterns") *and* measures rows 4, 6, 12, on the seat being measured. Peter faces 15 forks (8 after R1); F-7 holds five-plus numbers. Metric 1 is rising on 131 itself. § 5 L110 still has the old Holistic text.
   - **Layer test, context cost**: no metric counts always-loaded words. The identity set is 11,650 (`wc -w`); the values ballot adds to it. Metric 3 counts commits, not what each session reads.
   - **Thorough**: row 1's "0 issued since" is stale: #397 (123 first signatures) and #445 (20 by 7 seats) post-date 16.0.0 (`git log`; Stacy's cross-check). Signing is live recurring cost. That strengthens **D**'s cost case and removes its "decayed" evidence.
   - **Thoughtful**: B is untested; trial B (b) on the 16.1.0 candidate.

4. **Learning promotion: count recurrences, changed twice.** → § 5 "Self-sustaining requires"
   - **Applications** are self-reported across sessions that do not persist, reward citing, and promote learnings that already work and need no rule: a growth engine.
   - **Recurrences** are not self-reported, but break where filing breaks (item 1): an unfiled finding never recurs on paper. N recurrences also tolerates N failures.
   - **So**: count recurrences from executing checks and rehearsal output, not filed prose; threshold 1 for P0; promote to a check or code fix, never a prose rule.
   - **No seat can see this**: the orchestrator's auto-memory, outside the repo, holds ~50 indexed learnings loaded every orchestrator session. It is the loop that actually runs, with no counter, sunset or other reader. In scope, or stated out.

5. **A simpler path.**
   1. Owners file and fix the 10-02 and 10-24 findings; 131's first unit is gated on it.
   2. The rehearsal script is the release gate, non-zero on a false post-condition.
   3. One ruling: unchecked rules are advice. Delete rows 2, 5, 18a.
   4. Learnings promote only to checks, on recurrence.
   5. Peter rules design and forks that change what ships; seats rule the rest, shown in the generated release report.

6. **Likely missed.** → § 4 B (d); § 7; § 3a
   - **B (d)'s freeze breaks on its own spec**: the values ballot (before § 7), OWNERS and the admission rule are new law. Name exemptions.
   - **The rehearsal source is test01 at 12.0.5**: each release re-tests a 12-to-N jump no consumer takes. N green runs from one stale source is a weak sunset signal. Add a one-hop leg (prior release to candidate) (Lina's 10-02 shape).


---

#### [PETER R3]

*Peter's words, chat, relayed by the orchestrator, 2026-10-24.*

1. **The outside read's memory line** → `[OUTSIDE R2]` item 4
   > "Keep the memory line."
2. **F-9, the spine: RULED** → `design-outline.md` § 4, § 10 F-9
   > "Re: F-9, proceed as recommended."

   *What was recommended (orchestrator's words, as put to Peter):* approach **B, fix-first**, with the six conditions the values-lens round attached:
   - the missing map rows are added before any deletion cites them (Stacy);
   - the existing onboarding persona trio is named, not paralleled (Leonardo);
   - the freeze is per platform (Data);
   - the freeze exempts CORRECTION edits (Ada);
   - a failing rehearsal blocks the release tag, and that failure is the record's trigger (Sparky);
   - Lina's R2/R4/R6 fix is the first measured fix.

   **And the two mechanisms that make fix-first more than a hope:** Sparky's blocking rehearsal gate, and `[OUTSIDE R2]`'s rule that no 131 unit opens while a finding it cites has no record.
