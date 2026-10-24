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
| **Lina** | She built the disposition modules (rows 1–3); `runGuard`'s freshness call is in her scope; she owns readiness (row 19) and P2 | Rows 1–3, 7 and 19; § 8's definition of "pure deletion" |
| **Ada** | Token tier of the compile lane; token governance (row 18); F17's filing failure (row 13); freeze fork F-5 | Rows 13 and 18; F-5; § 7's 129 dependency |
| **Leonardo** | Consumer surfaces (rows 17 and 19); the fixture's design; P10a; F-6 | Rows 17 and 19; F-6; § 5's "outside source of purpose" |
| **Kenya** | iOS half of the compile lane and the consumer fixture | § 7: who owns the fixture, and where it lives (129 or 131) |
| **Data** | Android half of the compile lane and the consumer fixture | § 7, the same question |
| **Sparky (ask (c) only)** | Every seat lives under AI-Collaboration-Principles, so all eight weigh in on ask (c) | R1 ask (c) only |
| **Outside read (orchestrator-run)** | One charter-free read at R1, because every seat is one model family | Smoothed-over forks; whether the map re-creates the complexity it diagnoses |

Sparky is tagged for ask (c) only (no web-specific surface beyond P2, which Lina carries). Peter rules; he is not a round reviewer.

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
