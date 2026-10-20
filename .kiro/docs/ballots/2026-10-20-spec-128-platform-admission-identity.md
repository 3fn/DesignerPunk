# Ballot Measure: Spec 128 — Platform Admission Identity (React and React Native)

**Date**: 2026-10-20
**Drafted by**: Thurgood (Civitas steward; Spec 128 formalization owner), at Peter's direction (2026-10-20, relayed by the orchestrator): *"Let's work on 128's six-fork ruling sitting."*
**Status**: **DRAFT (R0)**. Six rulings slots are open (§ 6). **No text is proposed for any edit site.** The Core Goals wording follows Peter's rulings, at the R1 text round.
**Kind**: **LAW** (README § "When a governance edit needs a ballot"). It changes what the Layer 1 identity docs say the project is.
**Origin**: the charter's first deliverable (`.kiro/issues/2026-10-03-react-react-native-platform-admission-charter.md`). Its trigger fired on 2026-10-03: the v15.0.0 tag exists, and the parity required-flip merged in #292 and was confirmed ARMED in #294. The charter's walk rule counts "trigger fired, no identity-ballot draft" as a finding. This draft discharges that finding.
**Source record**: `.kiro/specs/128-react-react-native-platform-admission/inbound-from-react-rn-sitting-2026-10-02.md` (cited below as "inbound § N"). This ballot cites it and does not restate it. Read it for the long argument.
**Reviewers of record**:
- **Required**: **Stacy** (governance tiers; claims passes) and **Leonardo** (adopter front door).
- **R1 slots**: **Ada, Lina, Sparky, Kenya, Data**.
**Unit**: standalone draft. The application PR edits `.kiro/steering/**`, `canonical/**` and `governance/**`, so **Peter merges it** under the governance carve-out.
**Consulted**: none for R0. It was drafted from the 2026-10-02 sitting record (inbound § 12 holds that sitting's consult ledger). The parallel consults follow; the reading order is in § 8.

---

## 1. What the ballot settles

**The premise, in Peter's words** (inbound § 1, verbatim):

> "I'm imagining widening the scope of what DesignerPunk can cover. So much of the industry is on the React + React Native train, and that's something I just have to accept if I'm interested in people adopting this thing. So I'm thinking of expanding to create similar verticals for React and React Native as we do iOS, Android, and Web. An adopter should be able to create and leverage tokens and components of their own shape."

> "I think you're discounting the value of the tokens."

**Already settled, and not reopened here**:
- **Adoption is the goal.** React and React Native are in scope as platforms. Adopter-authored tokens and components are the product shape (inbound § 1).
- **The project is not split.** P5 was declined by all four owning seats (inbound § 4), and the charter records it (§ 1). Fork F-4 asks only whether Peter wants a separate *identity* on top of one project.

**What this ballot settles, once ruled**:
1. **The platform list.** Core Goals L21 reads "Build-time platform separation (web/iOS/Android)".
2. **The admission rule.** Admission requires the True Native floor (below) and the inbound § 3 criterion: *"OS selection resolved by the platform's build toolchain, not by runtime branches in emitted code."*
3. **Support tiers**: production, experimental and community.
4. **What proves the project.** Today the proof case is a product-spec commitment (Spec 070), not a Core Goals statement. F-5 decides it.

**Carried decisions.** The seats recommended these. They ratify with the ballot as a whole unless Peter modifies one.

| # | Decision | Record |
|---|---|---|
| D1 | React web is a **framework binding over the existing web platform**, not a separate platform. | inbound § 3 (Lina; Thurgood) |
| D2 | React Native is **one target to the adopter, emitted twice**, as `rn-ios` and `rn-android`, selected by Metro platform-extension files. | inbound § 3 (Ada R2; Lina R3) |
| D3 | A **platform registry** replaces the hard-coded three-platform lists. Web, iOS and Android are its first tenants. Readiness is generated from the registry. | inbound § 4 P2, § 5 step 2 |
| D4 | **iOS and Android are declared `experimental`** until the platform build-verification harness exists. | inbound § 5 step 1; harness charter `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` |

**The True Native floor already admits both targets.** It was ratified 2026-10-18 (`.kiro/docs/ballots/2026-10-18-true-native-development-is-not-true-native-design.md` § 1.1) and executed in #425. Floor part 1 reads *"build-time platform separation and **the platform's own rendering and accessibility stack**"*. The wording was chosen for Spec 128 (Sparky (a)1). Lina confirmed it on 2026-10-18, verbatim: *"The new phrase admits React (DOM plus ARIA) and React Native (native views plus native accessibility APIs), which is what Spec 128 needs. It still excludes self-drawn surfaces such as canvas or Flutter-style rendering, which is the intent."* No ruling here can admit a platform the floor excludes.

**Not settled here**: any Core Goals text, any build work, and the conforming edits (§ 3).

---

## 2. The six forks

Every seat declined to pick on every fork (inbound § 8). The "leans" lines record what each seat said, by round. Each recommendation is mine, with the counter that survived fold-back.

### F-1. Uniform governance, or tier-scoped gates

**Question**: do experimental and community platforms run under the same completion standard and claims passes as production, or under lighter ones?

| Option | Cost |
|---|---|
| (a) **Uniform**: one completion standard, per-platform criteria and claims passes at every tier. | The React package adopters see carries the native surfaces' verification debt inside the same specs. The cost lands on velocity (inbound § 8, surviving counter 1). |
| (b) **Tier-scoped gates**: lighter completion criteria for experimental and community. | A change to completion-evidence law, and two standards. "Experimental" becomes the cheap place to stay. That is the rot Leonardo named for undesigned controls (True Native ballot § 8, F-1 counters). |
| (c) **Uniform scrutiny, tier-bounded claims**: one process, where the tier caps what may be *claimed*. Readiness is generated from the registry. An experimental platform cannot show `production`, whatever its evidence says. A community platform is listed, not claimed. | Tier and evidence-tier fields in the registry and the readiness generator (inside D3's spec). It relieves no authoring cost. |

**Leans**: Thurgood R3 raised the fork and did not pick. P1 does not absorb it.

**What is already decided**:
- **The floor cannot be tiered.** F-3 of the True Native ballot binds every new control, and every React and React Native component is new.
- **No claims pass ever blocks a merge.** This is 127's merge-path status. The pressure is the cost of writing and verifying claims, not a blocked merge.

**Recommendation**: **(c)**. It applies the premise that the system writes down what does not work yet: the tier *is* that record.

**Surviving counter**: (c) does not relieve the velocity pressure that produced the split idea. If adopters need release cadence, (c) will not give it. Also, I author completion standards, so Stacy, the verifier, should test this first.

**Class option**: (c) is the class option. It applies to every future platform, not only React.

### F-2. Adopter tokens: enforce Rosetta's mathematics, or only its structure

**Question**: are adopter-authored tokens validated against Rosetta's formulas, or only against its structure (hierarchy, unitless values, naming, per-mode completeness)?

| Option | Cost |
|---|---|
| (a) **Enforce the mathematics** (blocking). | It raises the barrier. A brand value that is off the scale has no route except a workaround or a fork. |
| (b) **Structure only**. | The consistency claim narrows to DesignerPunk's own tokens. Model B consumers are already told otherwise: the consumer always-set renders *"All tokens must follow Rosetta System: mathematical relationships, unitless values, primitive→semantic hierarchy"* (`canonical/profiles/consumer/always-set/core-goals.overlay.md` L35; Core Goals L52). So (b) changes a signed consumer rendering. |
| (c) **Structure blocking; mathematics checked and recorded**. Each adopter token carries its conformance (conforming, or off-scale with a reason). The validators run as advisory on adopter roots, and their result is written down. | A conformance field and an advisory validator mode (Ada's step 2/4 work). The claim becomes "every token states whether it is mathematical". |

**Leans**: Ada R2 and Thurgood R3 raised the fork. Neither picked. Both say decide it before step 4 is built.

**What is already decided**: nothing directly. The True Native ballot leaves the Rosetta pipeline unchanged (§ 4). Its pattern, "depart with a recorded reason", is the analogy behind (c). The Spec 123 Model B ruling (2026-09-26) puts the adopter's own system under DesignerPunk's running. This fork decides how much of Rosetta that system inherits.

**Recommendation**: **(c)**.

**Surviving counter**: advisory checks get ignored. "Off-scale with a reason" could become the default for every brand color, and the mathematical claim would shrink to a field nobody reads. Ada may hold that the mathematics *is* the product, and that (a) is the point.

**Class option**: (c), the record-the-departure pattern. It is the same class as True Native F-1 (iv)'s `rendering:` field.

### F-3. Lead with copy-and-own reference components, or with contracts

**Question**: is the React front door a copy-and-own component set (the shadcn model), or tokens plus contracts plus governance?

| Option | Cost |
|---|---|
| (a) **Contracts first**. Reference components are proof, not product. | It is abstract next to copy-paste libraries. React teams adopt from components outward (Leonardo R2). |
| (b) **Copy-and-own reference set**. | A copy leaves the contract-version pin (Lina R4), so readiness cannot follow it and later fixes never reach it. Look is the second cost; see "already decided". |
| (c) **Copy-and-own components that carry their contract declaration**. Each copy keeps an `implements:` declaration. The adopter-root indexer (step 4) validates it, with an `adopter:<pkg>` provenance tag. The front door is components; the product stays contracts. | Step 4 must land before step 7 (already the sequence, inbound § 5). A copy that drifts fails validation visibly, not silently. |

**Leans**: Leonardo R2 raised the fork and did not pick.

**What is already decided**: under True Native F-1 (iv), DesignerPunk's own components ship `designed` by default, which is DesignerPunk's look. A copied set ships that look until the adopter's theme reaches it. Custom theme emission is unwired on every platform today (Spec 129 item (i)). So "their own shape" holds only after 129.

**Recommendation**: **(c)**.

**Surviving counter**:
- Copy-and-own has no upgrade path. Validation shows drift; it does not repair it.
- Step 7 picks its reference set by contract-category coverage, not popularity, and that may not be the set React teams want to copy.

**Class option**: (c), conformance by declaration. It is the same mechanism step 4 builds for every adopter component.

### F-4. Is the split about code, or about identity

**Question**: with the project unsplit, does Peter want a separate identity (a name, an edition, a front door) for the React audience?

| Option | Cost |
|---|---|
| (a) **Code only**. "DesignerPunk for React" is a landing page and an install path (P1). | Nothing beyond P1. If the motive was identity, it goes unmet. |
| (b) **A sub-identity over one core**: a named edition with its own front door, and release notes generated from the registry. | A brand surface to maintain, and a second front door. No repository or gate split. |

**Leans**: Lina R4 raised it.

**What is already decided**: the full split (P5) is out (§ 1).

**Recommendation**: none on intent, because only Peter knows the motive. If the motive is identity, (b) is reachable without reopening the split. My default is (a) until a first external adopter exists; inbound § 10 Q1 is still unanswered.

**Surviving counter**: inbound § 8's third counter says native-first architects will read the tiers as a retreat. A separate edition name may be exactly what fixes that reading, and deferring identity may cost the first impression with React adopters.

**Class option**: none. This is a question of intent, not a class of problem.

### F-5. Does Working Class stay the True Native proof case, and does iOS-first survive

**Question**: does Spec 070's Working Class stay three native apps (SwiftUI, Compose, Web Components) as the proof case, with iOS first?

| Option | Cost |
|---|---|
| (a) **Working Class stays native, iOS first**. | The proof covers the platforms adopters use least. It proves nothing until the native harness exists: 2 of 34 components are production-ready, and nothing compiles Swift or Kotlin in CI (inbound § 2). |
| (b) **Working Class adds or moves to React / React Native**. | A 070 amendment. The native verticals lose their only proof consumer. |
| (c) **Working Class stays the native proof; React and React Native get their own named proof consumer** (inbound § 10 Q1). | A second consumer that does not exist yet. |

**Leans**:
- Kenya R1: defer; asked whether True Native is a principle or a preference.
- Data R1: defer; build the Android harness first.
- Lina raised the fork.

**What is already decided**: the True Native floor now **admits** React Native (§ 1, Lina's confirmation). So 070's *"No React Native or cross-platform runtime"* (`.kiro/specs/070-agent-architecture/alignment-record.md` L28) is a product choice narrower than the law, not a requirement of it. Kenya's question is answered at the law level. What survives is the product question.

**Recommendation**: **(c), with the class option**. Keep iOS first; no evidence has been presented to change it.

**Surviving counter**:
- No React or React Native proof consumer exists today. The class option could keep both experimental indefinitely, which is the "proof adopters cannot use" counter (Lina R1; Leonardo R1).
- A native Working Class depends on a harness that is chartered, not built.

**Class option**: **every production-tier platform names a proof consumer in the registry, and no platform reaches `production` without one.** Cost: one registry field. A platform with no consumer stays experimental.

### F-6. React web: generated binding everywhere, or a hand-written vertical

**Question**: are the React components generated wrappers over the web elements, hand-written React, or a mix?

| Option | Cost |
|---|---|
| (a) **Generated wrappers everywhere**. | SSR breaks: classes extend `HTMLElement` at module scope, and `connectedCallback` reads `document`. Controlled inputs break: only InputRadioBase is form-associated (inbound § 2). Wrappers also inherit the element API defects, which are still present at 16.0.0 (`InputTextEmail.web.ts:204` dispatches `CustomEvent('focus')`). The breaking cleanup inbound § 10 Q3 placed on "a 16.0.0" now needs 17.0.0. |
| (b) **Hand-written React for all 34**. | Permanent double maintenance, even with shared CSS and types (Sparky R2). |
| (c) **Sparky's hybrid**: generated wrappers, plus hand-written React only for SSR-critical and form components. | Two code paths in one vertical. |

**Leans**: Sparky R2's residual is (c).

**What is already decided**:
- **Every option sits on DOM plus ARIA.** True Native floor parts 1 and 2 apply: on the web, "platform-correct" means the WAI-ARIA role contract, the APG keyboard pattern and the HTML-AAM mappings. Hand-written React earns no license off the floor.
- **F-1 (iv)'s `rendering:` choice is per component per platform.** A generated wrapper inherits the web entry. An authored React component needs its own.

**Recommendation**: **(c), with the class option**.

**Surviving counter**:
- The authored subset is forms and SSR, where defects cost the most. So the double-maintenance cost concentrates where it hurts.
- The criterion's list will grow.
- Whether SSR is a hard requirement is unknown (inbound § 10 Q2).

**Class option**: **a per-component field, `react: generated | authored`, with the criterion written once** (SSR-critical or form-participating). This is the F-1 (iv) pattern, so the choice is never re-argued per component. Cost: one field and one criterion.

---

## 3. Edit sites the rulings would drive — all PENDING THE RULINGS

No text is proposed. At the R1 text round each site gets before→after text, and each presumptively in-scope item gets its `**Census**:` line (README § "Instrument census"). No item exists yet, so no census line is owed at R0.

| # | Site | Driven by | Owner | Merge rule |
|---|---|---|---|---|
| 1 | `.kiro/steering/core-goals.md` § Core Project Context: L21 (platform list), L27–28 (minimum versions), plus the admission rule, tiers and proof statement | § 1, F-1, F-5 | Identity doc with no domain owner. Thurgood drafts. **Re-sign** of `#core-project-context` (C1 signer Stacy, `canonical/profiles/consumer/signatures/core-goals.md`) | Peter |
| 1a | Its consumer rendering: `canonical/profiles/consumer/always-set/core-goals.overlay.md` L7 and L13–16, and L35 if F-2 is (b); `canonical/operative-sets/core-goals.yaml` | 1, F-2 | Thurgood; signer Stacy | Peter |
| 2 | `.kiro/specs/070-agent-architecture/alignment-record.md` § True Native Commitment, L27–28 | F-5 | Peter's ruling, then 070's product owners amend it (inbound § 9). The owner is to be named at R1. | Peter |
| 3 | `.kiro/specs/034-component-architecture-system/design-outline.md` L56, "NOT code-sharing (React/React Native)" | D1, F-6 | Lina | Peter |
| 4 | `governance/technology-stack.md` | D1, D2, F-6 | **No owner recorded.** To be named at R1; the steward resolves it if it stays unowned. | Peter |
| 5 | `governance/platform-implementation-guidelines.md` (a section per platform) | D1, D2, F-6 | Lina | Peter |
| 6 | `governance/cross-platform-vs-platform-specific-decision-framework.md` (silent on wrappers and code-sharing; its Key Principle already carries the 128 wording from #425) | D1, F-6 | Lina | Peter |
| 7 | `governance/DesignerPunk-Integration-Guide.md` | F-3, F-4 | Ada (author of the 2026-10-02 native-scoping ballot); Leonardo consulted (front door) | Peter |
| 8 | Both System Overviews: `DesignerPunk-Systems-Overview.md` (platform diagrams, L224 and L275) and `Civitas-System-Overview.md` L64 ("web/iOS/Android") | § 1 | Thurgood; identity docs, so **re-sign** | Peter |
| 9 | `.kiro/steering/Agent-Directory.md`: a React / React Native seat? A new seat also means a `canonical/agents/**` charter. | inbound § 10 Q4 | Thurgood (directory); Peter (staffing). A write-scope or role change is always LAW. | Peter |

**Straggler sweep at application.** The README rule applies: every count in this directory's first ballot was wrong at least once. A first grep finds 11 hits for "web/iOS/Android" or "three platforms" across `canonical/agents/*.md` and `.kiro/steering/*.md`, outside the sites above. The count is heuristic. One example is `canonical/profiles/consumer/lina.overlay.md` L13.

**One ballot or two (my recommendation; Peter's pick).** Inbound § 7 planned a second, PR-atomic conforming-edits ballot for sites 2–9. Under ballot `2026-10-18-governance-edit-kinds`, the R1 text round can instead name each site's edit in *this* ballot. Those sites would then apply as **PRE-DECLARED EXECUTION**, with no second ballot. **Counter**: one larger review round, with seven seats reading at once.

**Core Goals is edited twice unless the edits are combined.** `.kiro/issues/2026-10-18-principles-kind-and-preserved-knowledge-triage.md` plans one Core Goals ballot for pointers P1 (L33) and P4. Its trigger 1 fired when #425 merged. Trigger 2, Ada's comparison record, has not fired. This ballot also edits Core Goals. P1 could ride this application, which costs no extra re-sign; P4 would still need its own. Or both wait. A sequencing choice for Peter; it is not a seventh fork.

---

## 4. Dependencies and sequencing

The priorities record fixes this order (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3).

1. **Spec 129 first.** That covers consumer-generation completeness, including theme emission, item (i). Its first task evaluates the platform build-verification harness. 128 absorbs theme emission as step 3, and it is **the same generator code** (record § 5). So 128 inherits the theme pipeline and the harness rather than building either twice.
2. **Spec 128.** **This fork sitting runs now, in parallel with 129.** It is decisions, not generator work. **Implementation comes after 129.**
3. **Spec 130 (Input-Switch-Base) just in time.** It is pulled forward only as far as 128's first binding requires. **128 never binds Input-Checkbox-Base in a switch role** (130 § 7.3). How that dependency is recorded is 130's fork P-8, which is open. Whichever option Peter picks, the line lands in 128's outline, which is in my seat. This ballot binds nothing against the placeholder.

**Other dependencies**:
- **Specs 118, 123 and 125** assume one package. The physical split is held until a second package is ready to publish (inbound § 5 step 8).
- **The Spec 123 Model B ruling** must not be contradicted; F-2 is where it bites.
- **Inbound § 10 questions are still unanswered.** Q1, the first consumer, bears on F-4 and F-5. Q3 now targets 17.0.0 (F-6).

---

## 5. Counter-arguments (after fold-back)

**Carried from the inbound** (§ 8; not absorbed by any ruling here):
- Six readiness columns behind one contract core make every contract change a six-way re-verification. That cost lands on velocity. Tiers soften it and do not remove it (Lina; orchestrator).
- Deferring React Native keeps DesignerPunk a proof its likeliest adopters cannot use (Lina R1; Leonardo R1).
- Native-first architects will read the tier declaration, D4 especially, as a retreat (orchestrator).

**Mine, after fold-back**:
- **Six forks in one sitting.** F-1, F-4 and F-5 are identity-grade. F-2 is too, because Core Goals' token law renders to consumers. F-3 and F-6 are design-grade and could ride the outline round, which the charter's secondary trigger allows. *Folded*: all six stay as slots, as Peter directed, and any of them may be carried to the outline round instead (§ 6). *Residual*: a design-grade ruling made now, before the outline round, may be ruled on less evidence than the round would bring.
- **The React history is lost.** `preserved-knowledge/true-native-architecture-concepts.md` says v1 began on React and moved off it, with no reason recorded (inbound § 2). Peter described that directory on 2026-10-18 as lessons learned from failed attempts. *Folded*: an optional question slot (§ 6, Q-0). *Residual*: if nobody remembers why, 128 may repeat the failure.
- **I made the same move three times.** I recommended "record, don't block" on F-1, F-2 and F-6. That may be pattern-matching to the True Native ruling rather than three separate judgments. *Residual*: each recommendation adds a field and a generator path (tier and evidence tier, token conformance, `react: generated | authored`) on top of `rendering:`. Together they are four metadata axes per component per platform.

---

## 6. Rulings (Peter) — OPEN

*When Peter rules, the session that receives the ruling records it here first and commits that record before anything is applied (README § "The Ratification Protocol").*

- **Ratify / modify / reject**: — *(open)*
- **F-1, uniform governance or tier-scoped gates**: — *(open; or carry to the outline round)*
- **F-2, adopter tokens, mathematics or structure**: — *(open; or carry)*
- **F-3, copy-and-own or contracts**: — *(open; or carry)*
- **F-4, code or identity**: — *(open; or carry)*
- **F-5, Working Class proof case and iOS-first**: — *(open; or carry)*
- **F-6, React web generated or hand-written**: — *(open; or carry)*
- **Carried decisions D1–D4**: ratify with the ballot unless modified — *(open)*
- **One ballot or two (§ 3)**: — *(open)*
- **Q-0 (optional)**: does Peter recall why v1 moved off React? — *(open)*

---

## 7. Review rounds

*Stamp format per Spec-Feedback-Protocol. Each round is woven into §§ 1–5 by the author and recorded here.*

- **[STACY R1]** (required): — *(empty)*
- **[LEONARDO R1]** (required): — *(empty)*
- **[ADA R1]**: — *(empty)*
- **[LINA R1]**: — *(empty)*
- **[SPARKY R1]**: — *(empty)*
- **[KENYA R1]**: — *(empty)*
- **[DATA R1]**: — *(empty)*

---

## 8. Consult ledger

- **R0** (Thurgood, 2026-10-20): drafted from the inbound, the charter, the STUB outline, Core Goals, the True Native ballot, the priorities record and Spec 130 § 7.3. **No seat was consulted for R0.** The 2026-10-02 sitting's ledger is in inbound § 12.
- **Recommended first readers, by fork** (for the parallel consults that follow; every seat may read every fork):

| Fork | Reads first | Then |
|---|---|---|
| F-1 | **Stacy** (claims passes; verifies what I author) | Leonardo, Lina |
| F-2 | **Ada** (Rosetta) | Leonardo (Model B adopter view) |
| F-3 | **Leonardo** (front door) | Lina (contract pin; step 4), Sparky |
| F-4 | **Leonardo** (front door), then **Lina** (raised it, R4) | — (Peter's intent) |
| F-5 | **Kenya** (raised principle-or-preference) | Data, Lina; 070's product owner |
| F-6 | **Sparky** (web; the hybrid's author) | Lina (component expression) |
| D1–D4, § 3 sites | Lina (sites 3, 5, 6), Ada (site 7), Stacy (site 1 signer) | Kenya and Data on D4 |
