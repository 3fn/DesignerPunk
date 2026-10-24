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
