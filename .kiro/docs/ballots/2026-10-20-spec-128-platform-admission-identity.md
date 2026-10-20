# Ballot Measure: Spec 128 — Platform Admission Identity (React and React Native)

**Date**: 2026-10-20
**Drafted by**: Thurgood (Civitas steward; Spec 128 formalization owner), at Peter's direction (2026-10-20, relayed by the orchestrator): *"Let's work on 128's six-fork ruling sitting."*
- R0 (`0f291b6f3`): six forks, four carried decisions, edit sites pending the rulings.
- R1 (this revision, same day): folds the seven read-only R1 reads (§ 7). D1–D3 and a new D5 each get their own ruling line. D4 became fork F-7. A new fork, F-8, comes from Data's read.
**Status**: **DRAFT (R1)**. The rulings slots are open (§ 6). **No text is proposed for any edit site.** The Core Goals wording follows Peter's rulings, at the text round.
**Kind**: **LAW** (README § "When a governance edit needs a ballot"). It changes what the Layer 1 identity docs say the project is.
**Origin**: the charter's first deliverable (`.kiro/issues/2026-10-03-react-react-native-platform-admission-charter.md`). Its trigger fired on 2026-10-03: the v15.0.0 tag exists, and the parity required-flip merged in #292 and was confirmed ARMED in #294. The charter's walk rule counts "trigger fired, no identity-ballot draft" as a finding. R0 discharged that finding.
**Source record**: `.kiro/specs/128-react-react-native-platform-admission/inbound-from-react-rn-sitting-2026-10-02.md` (cited below as "inbound § N"). This ballot cites it and does not restate it.
**Reviewers of record**:
- **Required**: **Stacy** (governance tiers; claims passes) and **Leonardo** (adopter front door).
- **R1 reviewers**: **Ada, Lina, Sparky, Kenya, Data**.
- All seven R1 reads are in § 7, verbatim.
**Unit**: standalone draft. The application PR edits `.kiro/steering/**`, `canonical/**` and `governance/**`, so **Peter merges it** under the governance carve-out.
**Consulted**: Stacy, Leonardo, Ada, Lina, Sparky, Kenya, Data. All seven reads were read-only, on R0 at `0f291b6f3`; one-line reads are in § 8.

---

## 1. What the ballot settles

**The premise, in Peter's words** (inbound § 1, verbatim):

> "I'm imagining widening the scope of what DesignerPunk can cover. So much of the industry is on the React + React Native train, and that's something I just have to accept if I'm interested in people adopting this thing. So I'm thinking of expanding to create similar verticals for React and React Native as we do iOS, Android, and Web. An adopter should be able to create and leverage tokens and components of their own shape."

> "I think you're discounting the value of the tokens."

**Already settled by Peter, and not reopened here.** Inbound § 1 settles exactly three things (Stacy (b)):
- **Adoption is the goal.**
- **React and React Native are in scope as platforms.**
- **Adopter-authored tokens and components are the product shape.**

**The project is not split.** P5 was declined by all four owning seats (inbound § 4), and the charter records it (§ 1). Fork F-4 asks only whether Peter wants a separate *identity* on top of one project.

**What this ballot settles, once ruled**:
1. **The platform list.** Core Goals L21 reads "Build-time platform separation (web/iOS/Android)".
2. **The admission rule.** It has two parts: the True Native floor, and the inbound § 3 criterion, *"OS selection resolved by the platform's build toolchain, not by runtime branches in emitted code."*
3. **The tier names and their rule.** **Tier assignments stay out of Core Goals** (Stacy (c)5). Promoting a platform is a fact changing, not law (ballot W-9 § 2). Core Goals states the rule and the tier names; the registry holds which platform sits where. Otherwise every promotion would need a re-sign.
4. **What proves the project.** Today the proof case is a product-spec commitment (Spec 070), not a Core Goals statement. F-5 decides it.

**The seats' recommendations: each needs its own ruling line (§ 6).** *[THURGOOD R1] R0 carried these as "ratify unless modified". Stacy (b): none comes from inbound § 1, and the inbound says "carry into the outline" (§ 5) and "not a ratification" (§ 13). So "ratify unless modified" would have made them law with no ruling line. Each is now ruled on its own line.*

- **D1: React web is a framework binding over the existing web platform**, not a separate platform (inbound § 3).
  - *R1 fold*: inbound § 6 still gives `react` its own contract key and readiness column. Sparky (c) agrees with that column, because RTL evidence is not the element's evidence. Stacy (b) found the conflict: if React web is not a platform, it has no tier, and the F-1 cap cannot apply to the React package.
  - **Class option, Sparky (c)**: registry rows are typed **`kind: platform | binding`**, and a binding declares **`over: web`**. A binding has a readiness column and a tier, but no emitter and no theme path. It costs one field.
  - This also answers Ada (c): token emission has five keys and component readiness has six. With `kind:`, that is one list with flags, not two views.
  - Leonardo (e): under D1 the Product MCP needs no `react` platform value, and React screens stay `web`. His review still needs a React column.
- **D2: React Native is one target to the adopter, with two keys inside**, `rn-ios` and `rn-android` (inbound § 3; Ada R2; Lina R3).
  - *R1 fold, from Lina (d), Kenya (b) and Data (b)*: the text will read "two keys; **tokens** emitted twice; **components** one shared source, split by OS only where behaviour differs."
  - **Each key has its own readiness column and its own tier.** `rn-android` may sit at `experimental` while `rn-ios` moves up, or the reverse; F-8 asks whether that is allowed. Merging the keys would let Android evidence turn `rn-ios` green (Kenya).
  - Inbound § 6's evidence rule comes with D2 (Stacy (b)): a shared RN file counts for both keys only if its tests run under both `Platform.OS` values.
  - `rendering:` gets two entries, `rn-ios` and `rn-android` (Lina (d)).
  - `rn-android` is a **sibling emitter reading the resolved model**, never a derivative of the `android` key (Data (b)).
- **D3: a platform registry replaces the hard-coded three-platform lists**, with web, iOS and Android as its first tenants and readiness generated from it (inbound § 4 P2, § 5 step 2).
  - *R1 fold, cost row, Ada (b)*: **the direction is decided and the design is open**. Four things are still open: where per-platform data that cannot be computed lives (font stacks, Android `elevation`, iOS `shape`, `sp` vs `dp`), the emitter interface and its theme idiom, whether platforms can be registered from config, and the conformance fixtures.
  - It is **the largest item in 128**: one spec, several weeks. `TokenFileGenerator.ts` has 47 platform-literal matches, 15 non-test source files hold closed lists, and `token-index/` carries a closed platform map in a public format.
  - **It touches adopters' own token files.** Under Model B, `init` copies `src/tokens` into the adopter's repo, and those files build `platforms:` against the closed `PlatformValues` type (`src/types/PrimitiveToken.ts:64-68`, verified). Making the values computed, with `platforms` kept optional, is the only shape that does not edit adopters' files. A migration path is still owed.
  - F-1 (c), F-5's class option and F-7 all depend on D3 (Stacy (b)). **If D3 falls, they collapse.**
- **D5 (new): a contract-version pin and staleness rule** (Lina (g), from her R4 and inbound § 5 "Contracts stay one").
  - A platform's readiness manifest records the core contract version it was verified against. A contract change marks it stale until it is re-verified.
  - **Cost**: a manifest field and one comparison in step 2 or 4. Today `version` is parsed (`parsers.ts:172`) and never compared (verified).
  - F-1 (c) and F-3 (c) both depend on it. Stacy (a) names it as the velocity lever: a stale status is generated and visible, instead of six readiness rows required in the same spec.
  - **What survives D5**: six keys still mean a six-way re-verification. D5 makes the cost visible; it does not shrink it (Lina).

**The True Native floor already admits both targets.** The ballot was ratified 2026-10-18 (`.kiro/docs/ballots/2026-10-18-true-native-development-is-not-true-native-design.md` § 1.1) and executed in #425. Floor part 1 reads *"build-time platform separation and **the platform's own rendering and accessibility stack**"*. Lina confirmed the wording on 2026-10-18, verbatim: *"The new phrase admits React (DOM plus ARIA) and React Native (native views plus native accessibility APIs), which is what Spec 128 needs. It still excludes self-drawn surfaces such as canvas or Flutter-style rendering, which is the intent."* No ruling here can admit a platform the floor excludes.

**Not settled here**: any Core Goals text, any build work, and the conforming edits (§ 3).

---

## 2. The forks

Each fork gives the question, the options with their costs, the seats' positions, what is already decided, my recommendation and its surviving counter, and a class option. R0's forks keep their numbers. R1 adds F-7 (from D4) and F-8 (from Data).

### F-1. Uniform governance, or tier-scoped gates

**Question**: do experimental and community platforms run under the same completion standard and claims passes as production, or under lighter ones?

| Option | Cost |
|---|---|
| (a) **Uniform**: one completion standard, per-platform criteria and claims passes at every tier. | The React package carries the native surfaces' verification debt inside the same specs. The cost lands on velocity (inbound § 8, counter 1). |
| (b) **Tier-scoped gates**: lighter completion criteria for experimental and community. | Two evidence standards. Tier assignment becomes the cheapest way to lower evidence, and "experimental" becomes a cheap place to stay (Stacy (a): a Goodhart lever). |
| (c) **Uniform scrutiny, tier-bounded claims**: one process, where the tier caps what may be claimed. | Tier and evidence-tier fields in the registry and the readiness generator (inside D3). It relieves no authoring cost. |

**(c)'s conditions** (Stacy (a)). Without them, a claims pass cannot decide whether the cap held.
1. **A closed word list per tier**: which surfaces are capped, and which words are forbidden at each tier. Today the tier would be `production` and the readiness string is `production-ready`, and the two do not even match.
2. **One meaning for `experimental`.** The word already has two other meanings: a component readiness value (`governance/component-metadata-schema-reference.md` L47: `production-ready`, `development`, `experimental`; verified), and the computed per-platform status vocabulary (`application-mcp-server/src/models/index.ts:139`; verified).
3. **The tier is read as it stood at the merge** (`git show <merge>:<registry>`), not its current value.
4. **The interim is declared.** Until D3's generator lands, the cap is prose law that only Stacy's sampling enforces. The ballot must say when the cap takes effect and what stands in until then. Otherwise every readiness read is a finding: two native components show `production-ready` today.

**Seats' positions**:
- **Stacy picks (c)**, with the conditions above.
- **Data (e)** adds a rule: no `rn-*` column may be claimed above `experimental` on `unit` evidence alone.
- Step 7's rule, that readiness is never reviewed on `unit` evidence alone, should bind every platform (Data (c)).

**What is already decided**:
- **The floor cannot be tiered.** True Native F-3 binds every new control, and every React and React Native component is new.
- **No claims pass ever blocks a merge** (127's merge-path status).

**Recommendation**: **(c), with conditions 1–4 and Data's `unit`-evidence rule.**
- **Plainly: (c) does not relieve velocity.** On the question as asked, "lighter standards?", choosing (c) means **no**. It answers "what may we say about a platform", not "can we go faster" (Stacy (a)).
- The velocity lever is elsewhere: **the scope of each parent's criteria**, together with D5's staleness rule. A contract change marks other platforms stale, visibly, instead of requiring their rows in the same spec. That is a follow-up for me and Lina, not for this ballot.

**Surviving counter**:
- Velocity is not relieved.
- The prose half of the cap is checked only by sample.
- The generated half waits on a multi-week D3 build.

**Class option**: (c). It applies to every future platform.

### F-2. Adopter tokens: Rosetta's mathematics, or only its structure

**Question**: are adopter-authored tokens held to Rosetta's mathematics, or only to its structure?

*R1 fold*: Ada (a) found that R0 did not say which "maths" it meant.
- **Honesty**: the formula a token states matches its own value.
- **Membership**: the value actually lies on the family's scale or grid.

The adopter's only maths instrument, `designerpunk validate`, checks honesty only, and it is **red on 102 correct tokens** (`.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`, verified). The membership check exists only on paths that never run in an adopter repo.

| Option | Cost |
|---|---|
| (a) **Enforce both** (blocking). | It applies only to dimensional families: colour, font family and easing are categorical (Ada). An off-scale brand value has no route. No exception mechanism exists today. |
| (b) **Structure only**. | The claim holds only in this repo, because under Model B nothing in the adopter's repo is DesignerPunk's own after birth (Ada). The consumer always-set line *"All tokens must follow Rosetta System: mathematical relationships…"* (`canonical/profiles/consumer/always-set/core-goals.overlay.md` L35) becomes false, so a re-sign is owed. |
| (c) **Structure blocking; the maths checked and recorded, advisory.** | The record goes unread (Ada (f)): Rosetta already ships two departure fields nobody reads (`isStrategicFlexibility`, `PrimitiveToken.ts:110`, verified; the product-token `rationale:`). L35 becomes false, so a re-sign is owed. |
| (c′) **Ada's tightening: the declaration blocks, the value is free.** An optional `conformance` field (`on-scale`, `flexibility`, or `{ offScale: "<reason>" }`) replaces `isStrategicFlexibility`. `validate` checks both honesty and membership, **blocks on undeclared off-scale**, and reports declared off-scale. The result is indexed next to `formula` in `token-index/`, so `get_token_details` returns it. | The parser-gaps fix lands first, with its per-family split of mathematical and categorical families. A fifth `validate` section. L35 changes, so a re-sign is owed. |

**Seats' positions**:
- **Ada picks (c′)**, and says it is Peter's call.
- **Leonardo (d)** sets an adopter-side condition: the field must appear where he queries (`get_product_tokens`, `get_token_details`, and the `tokens:` blocks in screen specs). He also says **accessibility floors block whatever F-2 rules**: contrast pairs and touch targets are WCAG floors, not Rosetta maths.
- Ada does not hold that "the maths IS the product". In her words: "The maths is the method. The product claim is that *every value can be explained*."

**What is already decided**: in this repo the maths stays blocking under every option, through the Jest formula suites (Ada). Cross-platform numeric consistency depends on D3, not on F-2: today a token can emit different numbers per platform and still emit cleanly (Ada (a)).

**Recommendation**: **(c′), with Leonardo's condition, and the accessibility floors blocking on adopter roots under every option.**
- The parser-gaps issue becomes a listed dependency (§ 4), with its trigger tied to 128 step 4.
- *Correction to R0*: L35 changes under (b), (c) and (c′). Only (a) leaves it as written.

**Surviving counter**:
- The reason is free text that nothing judges, so "brand" can become the reason for every token. Blocking undeclared values stops *silent* drift, not *declared* drift.
- (c′) cannot be built until the parser-gaps fix lands, and that fix has no date.

**Class option**: (c′). It records the departure where agents read it, the same class as True Native F-1 (iv)'s `rendering:` field. It repairs an existing unread field rather than adding a new axis (Ada (f)).

### F-3. Lead with copy-and-own components, or with contracts — and on which platform

**Question**: is the front door a copy-and-own component set (the shadcn model), or tokens plus contracts plus governance? And does the answer differ between React web and React Native?

*R1 fold*:
- **R0 did not name the platform.** Step 7 is the *React Native* reference set, but R0's counter treated it as the React front door (Leonardo (a)).
- **F-3 and F-6 are coupled on React web.** Copying a generated wrapper makes almost no sense: it is about 30 lines of glue over hundreds of lines of Shadow-DOM element. What a team copies is an *authored* React component (Sparky (b)). So: **generated = installed** (it keeps the contract pin and the upgrade path); **authored = copyable**.

| Option | Cost |
|---|---|
| (a) **Contracts first**; reference components are proof. | Abstract next to copy-paste libraries. React teams adopt from components outward (Leonardo R2). |
| (b) **Copy-first everywhere.** | A copy freezes today's defects into every adopter repo (zero `forced-colors`; `CustomEvent('focus')`), and fixes never reach it (Leonardo (a)). A copy edited before 129 lands hard-codes values. |
| (c) **Platform-scoped.** React web is **install-first**: generated wrappers, upgradable, with copy-and-own as the eject path for authored components. React Native: copy-and-own may lead (Leonardo (a)). Every copy keeps an `implements: <Component>@<contract-version>` declaration, which step 4 validates and reports as stale against core (Leonardo; Lina (b)). | Step 4 must build what today's indexer lacks (below). |

**What today's code does** (Lina (b), verified): a copy that keeps its declared name **shadows** the package component. Its own `contracts.yaml` replaces the core one in the contracts cache, and the original is left out (`application-mcp-server/src/indexer/ComponentIndexer.ts:264-281`). So **R0's "a copy that drifts fails validation visibly" is false today.**

**Step 4 must add** (Lina (b)):
- `implements:` as a relation separate from `inherits:`;
- catalog-name validation in the indexer for adopter roots, including `x_<org>_` names (today that check is a Jest test hard-wired to `src/components/core`);
- comparison of the pin against core's version (D5);
- a name-shadowing rule: a copy takes a new name, or the shadow is recorded and reported.

**Seats' positions**:
- **Leonardo** picks (c), amended: the pin carries the contract version, and the step-4 indexer reports staleness. The reference set is **demand-drawn and coverage-constrained**. He says the front door is partly a catalog-gap question: dialog, select, switch and toast are missing, so "half of what a React team copies on day one isn't in the catalog". No fork in this ballot addresses that.
  - **His fork**: install-first (upgrades, DesignerPunk's look) or copy-first (ownership, no upgrades).
- **Sparky**: rule F-3 and F-6 together, or have F-6's criterion say that "a copyable front-door component" is **not** a reason to author. Adopted in F-6.
- **Lina**: (c) is checkable only after step 4 and D5.

**What is already decided**: under True Native F-1 (iv), DesignerPunk's components ship `designed` by default, which is DesignerPunk's look. Custom theme emission is unwired on every platform today, so "their own shape" holds only after 129.

**Recommendation**: **(c)**.
- **Rule now** the identity-grade part: the front door is components and the product is contracts; React web leads with install.
- **Carry to the outline round**: the React Native lead, and which components the set contains.

**Surviving counter**:
- The declaration is opt-in. An adopter who deletes `implements:` loses validation, and nothing notices.
- Staleness notices do not fix accessibility defects in code DesignerPunk no longer controls.
- The catalog gap stands whatever F-3 rules.

**Class option**: conformance by declaration, with a version pin. It is the same mechanism for every adopter component.

### F-4. Is the split about code, or about identity

**Question**: with the project unsplit, does Peter want a separate identity (a name, an edition, a front door) for the React audience?

| Option | Cost |
|---|---|
| (a) **Code only.** "DesignerPunk for React" is a landing page and an install path (P1). | If the motive was identity, it goes unmet. |
| (b) **A sub-identity over one core.** A named edition with its own front door, release notes generated from the registry, and plausibly its own `init` profile and consumer rendering (Leonardo (b)). | A brand surface and a second front door. A name is cheap to add and expensive to retract. |

**R1 fold.** Lina (c) puts the question underneath this fork: **which problem was the split idea meant to solve?** Engineering velocity is answered by P1 and F-1, and F-1 (c) does not relieve it. Audience and positioning is answered by (b).

**Leonardo (b) reframes the question.** Under (a), `designerpunk init` tells the adopter's agents that this is a "True Native cross-platform design system… web/iOS/Android" (overlay L7, L13–16). So the identity an adopter meets is decided by **edit site 1a**, whatever F-4 rules. His question for Peter: *"If the first outside adopter is a React-only team that will never touch iOS or Android, should anything they see, whether docs, init output or what their agents are told, mention True Native?"* No points to (b), with a separate consumer rendering. Yes points to (a).

**Recommendation**: none on intent, because only Peter knows the motive. *R1 fold*: R0's default, "(a) until a first adopter exists", is **not neutral** (Leonardo). The first impression forms through the init rendering before any adopter exists.

**Surviving counter**: under (a), True Native framing on a React install may read as "a native project with a React port". That is the retreat reading from the other side (Leonardo).

**Class option**: none. This is a question of intent.

### F-5. Working Class, the proof case, and iOS-first

**Question**: does Spec 070's Working Class stay three native apps as the proof case, with iOS first? And what counts as a proof consumer for each platform?

| Option | Cost |
|---|---|
| (a) **Working Class stays native, iOS first.** | It proves nothing until the native harness exists (2 of 34 production-ready; nothing compiles Swift or Kotlin in CI). |
| (b) **Working Class adds or moves to React Native.** | A 070 amendment. Data: "RN hides the Compose gap more than it fixes it". Two Android builds of one product stop the proof from discriminating. |
| (c) **Working Class stays the native proof; React and React Native get their own named proof consumer.** | That consumer does not exist yet (Leonardo: none exists for React Native). |
| (c-WC-web) **Leonardo's candidate 1**: Working Class's *web* app is consumed through the React binding. | One product spec gives a native binding and a React binding, the strongest parity proof. But Web Components lose their standalone proof, the React proof waits behind iOS-first, and it needs a 070 reading or amendment. |

**What is already decided**: the True Native floor admits React Native, so 070's "No React Native" line is a product preference, not law. Kenya accepts this answer to her R1 question. 070 has **no named product owner** (Kenya (d), verified: participants "Peter, Thurgood"), so the decision is Peter's.

**R1 folds into the class option.** "Every production-tier platform names a proof consumer":
- **A proof consumer is defined** (Leonardo (c)): a repo that persists; a named product owner; at least N screens specified through the Product MCP; inspectable by a claims pass. The scratch Settings consumer does not qualify.
- **`harness` and `consumer` are separate** (Kenya (a)). A harness host module compiles; a consumer is a real product exercising components with assistive-tech evidence. Only `consumer` satisfies the rule.
- **The consumer must have a passing build** (Data (a)). A name is not evidence: Working Class Android is named, not built.
- **Narrow "iOS first" to the SwiftUI Working Class vertical** (Kenya (a)). Once `rn-ios` exists, "iOS first" is ambiguous. It is **a proof ordering, not an adoption ordering** (Leonardo (c)); adopters meet web or React first (Integration Guide L23).
- **Web fails the class rule on ratification day** (Stacy (e)1). No proof consumer is recorded for web, and Working Class is unbuilt. Either web drops to experimental, contradicting Integration Guide L23 ("ready for building web products"), or the rule needs a grandfather clause or a named web consumer. This is sub-fork **F-5w**.

**Seats' positions**:
- **Kenya**: (c) plus the class option, iOS-first holding, narrowed to SwiftUI. Her fork: if Q1's answer is a React Native product, it becomes the first proof consumer and SwiftUI-first drops to second.
- **Data**: (c), with a separate React Native consumer, not an RN build of Working Class. His fork: Working Class's screen specs as a **fixture** the React Native consumer also renders. Leonardo owns that question.
- **Leonardo**: (c) plus the class option and the definition. His fork: candidate 1 versus waiting for Q1.

**Recommendation**: **(c), with the class option as defined above**, iOS-first narrowed to the SwiftUI vertical, and **F-5w answered by a dated grandfather clause**: web keeps its current claim until a named web consumer exists or the next major, whichever comes first.
- Candidate 1 and Data's fixture idea go to Leonardo's outline-round read.
- Data's ask is folded in § 4: Android harness evaluation is decoupled from Working Class's Android kickoff.

**Surviving counter**:
- No React or React Native proof consumer exists, so both may stay experimental indefinitely. Candidate 1 is the only option that shortens that, and it reopens 070.
- The grandfather clause is the same "cheap place to stay" risk in another form, so it needs a date.

**Class option**: a proof consumer per production-tier platform, with the definition above.

### F-6. React web: generated, authored, or a mix

**Question**: which React web components are generated wrappers over the web elements, and which are hand-written React?

*R1 fold*: **"SSR-critical" is struck from the criterion.** Server-side rendering safety is not a property of single components here. All 34 web modules define their element class and call `customElements.define` at module scope; only `ButtonVerticalListSet.web.ts` has a `typeof` guard (Sparky (a); Lina (a); verified). SSR is fixed once for the whole vertical, in the element and the wrapper generator, or not at all.

**The deciding rule.** Two versions are on record:
- **Sparky (a)**: a component is authored if it has **(F) form participation** or **(R) a cross-root ARIA reference**; otherwise it is generated. A borderline component stays generated until a failing test shows the rule applies. Today that gives **8 authored** (the four Input-Text, Input-Checkbox-Base, Input-Checkbox-Legal, Input-Radio-Base, Input-Radio-Set) and **26 generated**.
- **Lina (a)**: a component is authored if it carries `validation_form_integration` or holds a controlled value.
- **The two do not yet agree.** `validation_form_integration` appears in only 2 contracts (Input-Checkbox-Base, Input-Radio-Base; verified), so Lina's first prong picks fewer than Sparky's (F). Reconciling them is outline-round work for the two seats.
- **"A copyable front-door component" is not a reason to author** (Sparky (b)). This holds F-3 and F-6 apart.

**Record, not a field.** Lina (a): do not store `react:`. Authored-ness is visible from the files, as readiness detects implementations today. The rule becomes one check: a component the rule says must be authored, with no authored file, is a finding. Sparky would keep the field, but Stacy (d) notes either is mechanically checkable. **I take Lina's form**, because it removes a metadata axis.

| Option | Cost |
|---|---|
| (a) **Generated everywhere.** | Forms break: only InputRadioBase is form-associated (verified). There are no cross-root IDREFs, and `ref.focus()` does nothing on most inputs (Sparky (a)2). |
| (b) **Authored, all 34.** | Permanent double maintenance (Sparky R2). |
| (c-eager) **Author the 8 form components from the start.** | Robust React forms on day one; permanent double maintenance on the most complex components. |
| (c-gated) **Fix the elements in 17.0.0 and generate all 34; promote to authored only on a failing test.** The fixes are `ElementInternals` on all 8, no `innerHTML` re-render on state attributes, and `delegatesFocus`. Lina's alternative, (a) plus fixing forms in the element itself, is the same shape. | One implementation, and plain web adopters are fixed too. React forms wait on 17.0.0. The cross-root reference gap stays open (ARIA reference-target support is unverified). |

**Sequencing, whichever option wins** (Lina (a); Sparky (a)): **generated wrappers do not ship before the 17.0.0 element cleanup.** Five of the 26 generated components carry element defects: ButtonVerticalListItem, NavTabBar, NavSegmentedChoice, ChipFilter and ButtonCTA. Sparky's counter: a pre-17 alias table, accepted only with an expiry pinned to 17.0.0. That cleanup is owed to plain web consumers anyway. It is not a React cost, and R0's (a) cost line wrongly charged it to the wrappers.

**What is already decided**: every option sits on DOM plus ARIA (True Native floor parts 1–2). An authored React component needs its own `rendering:` entry; a generated wrapper inherits the web entry.

**Seats' positions**:
- **Sparky** leans (c-gated), "also the simpler option, so check my bias".
- **Lina** puts (c)-narrowed against (a) plus element fixes, and does not pick.

**Recommendation**:
- **Rule now**: the criterion without the SSR prong, the not-a-front-door-reason clause, and the sequencing rule.
- **Carry to after inbound § 10 Q2** (is SSR a hard requirement?): the choice between c-eager and c-gated, and the authored list. Q2 decides F-6 more than any criterion does (Sparky). If SSR is a hard requirement, every generated wrapper is client-only, and the hybrid collapses toward (b) or an unproven Declarative Shadow DOM path.
- My lean is c-gated, for the same reason as Sparky's, with the same bias warning.

**Surviving counter**:
- The authored subset holds the components with the most contracts.
- One contract verified by two harnesses (shadow-DOM element tests and light-DOM RTL) can pass in one and fail in the other (Lina).
- Even under c-gated, the cross-root ID-reference limit is a real Shadow-DOM ceiling (Sparky).

**Class option**: the deciding rule, with authored-ness derived from files. It decides once, so the choice is never re-argued per component.

### F-7 (new; was D4). What the native platforms may claim, and what lifts them

**Question**: what tier do iOS and Android sit at today, and what exact, checkable condition moves them up?

*R1 fold* (Stacy (b); Kenya (c); Data (c)): R0 framed D4 as a demotion. **It is an upgrade.**
- The shipped Integration Guide already says native is "not supported" and "reference source, not a build input" (L23, L164, L178; verified). In a production / experimental / community list, `experimental` reads as "usable at your own risk", which is more.
- The consumer guard asserts no tier and no native build, so D4 breaks none of Spec 123's records (`tests/consumer-integration.test.ts` L2122; verified).
- What D4 does demote: the 2 of 34 components whose computed readiness shows `production-ready` on iOS and Android. Data verified that the Android claims have **never been executed**: nothing in `.github/workflows` runs gradle or kotlinc (verified), and no JDK, Android SDK, gradle or kotlinc is reachable on this machine (verified). The release that ships the generator must disclose the drop (Stacy).

| Option | Cost |
|---|---|
| (i) **A tier matching the guide**: "source shipped, not a build input". | A fourth tier name. |
| (ii) **Define `experimental` to include "not a build input".** | It stretches one word over two states, on top of condition 2 of F-1. |
| (iii) **`experimental` plus an evidence tier**, e.g. `source-only` or `unbuilt`, using F-1 (c)'s evidence-tier field (Kenya (c)). | No new tier, but a value in a field. It may read worse to native-first architects (Kenya's own residual). |

**A checkable exit.** R0's "until the harness exists" is met by a harness that is built but not required. The exit needs all of these:
- the harness is a **registered required check** and **green on that platform's tree**, generated tokens included (Stacy; Kenya);
- **compile evidence per component**;
- **a proof consumer** under F-5's class option. As drafted, D4 (lifted by the harness) and F-5 (lifted by a consumer) disagreed, and this reconciles them;
- for Android, **a declared minimum version** (Data (c); inbound § 10 Q8; Core Goals L27–28). "Platform-correct" is undefined without one.
- **Assistive-tech evidence is tracked per component, apart from the tier** (Kenya (c)3).

**Data's minimum Android harness**: a Gradle compile of a host module holding the generated tokens and the component `.kt` files, plus Robolectric semantics tests on the JVM. Emulator and TalkBack runs are not in the minimum; they are `assistive-tech` evidence.

**Seats' positions**:
- **Kenya**: "right call; if anything, generous". She picks (iii).
- **Data**: "right call, and more honest than the draft says".
- **Stacy**: make it a fork, with options (i)–(iii).

**Recommendation**: **(iii), with the exit list above.** It uses a field F-1 (c) already needs, so the law and the published guide say the same thing.

**Surviving counter, and a question that decides it**: inbound § 10 Q5 asks whether device-level assistive-tech testing is in scope for anyone. If the answer is no, a production bar that includes assistive-tech evidence is **unreachable for every platform, web included**. The reachable alternative bar (compiles, unit tests, named consumer) claims less (Kenya). Q5 is in § 6.

**Class option**: the evidence tier, which applies to every platform.

### F-8 (new). React Native tiers that move faster than Compose

**Question**: may `rn-android` sit above `android`, given that its `unit` evidence (RNTL in Jest) runs in today's CI while Kotlin tests run nowhere?

| Option | Cost |
|---|---|
| (A) **Accept the asymmetry, labeled.** Tiers move independently, and the evidence kind is shown. | Under F-1 (c) the registry may show RN greener than Compose purely because its instruments are cheaper. Data: "'RN hides the Compose gap' turned into a mechanism". |
| (B) **Cap `rn-android`'s tier at `android`'s.** | A coherent Android story, but React Native pays for Compose's debt, against the adoption premise. |

**Seats' positions**: **Data** raised the fork and did not pick. Kenya's D2 read (separate columns, each at its own tier) is consistent with (A).

**Recommendation**: **(A), with F-1's rule that no `rn-*` column is claimed above `experimental` on `unit` evidence alone.** That rule removes the cheapest path, and the labels show the rest.

**Surviving counter**: the instrument-cost gap is structural: a JDK, the Android SDK, CI minutes and gate governance, against nothing new for Jest. Labeling makes it visible, not gone (Data).

**Class option**: none beyond F-1's evidence rule.

---

## 3. Edit sites the rulings would drive — all PENDING THE RULINGS

No text is proposed. At the text round each site gets before→after text, and each presumptively in-scope item gets its `**Census**:` line (README § "Instrument census"). No item exists yet, so no census line is owed at R1.

| # | Site | Driven by | Owner | Merge rule |
|---|---|---|---|---|
| 1 | **The `#core-project-context` unit, all four files** (Stacy (c)6): `.kiro/steering/core-goals.md` (L18 identity line, L21 platform list, L27–28 minimum versions, plus the admission rule, tier names and proof statement); `canonical/operative-sets/core-goals.yaml`; `canonical/profiles/consumer/always-set/core-goals.dispositions.yaml`; `canonical/profiles/consumer/confirmations/core-goals.md`. **Re-sign** (C1 signer Stacy, `canonical/profiles/consumer/signatures/core-goals.md`). | § 1, F-1, F-5, F-7 | Identity doc with no domain owner. Thurgood drafts; Stacy signs and confirms. | Peter |
| 1a | Its consumer rendering: `canonical/profiles/consumer/always-set/core-goals.overlay.md` L7 and L13–16, **and L35 under F-2 (b), (c) or (c′)** (Ada's correction). | 1, F-2, F-4 | Thurgood; signer Stacy | Peter |
| 2 | `.kiro/specs/070-agent-architecture/alignment-record.md`: § True Native Commitment (L27–28), **§ Platform Priority (L20–21)**, which narrows "iOS first" to the SwiftUI vertical, and **§ Context (L11)**, "a civic engagement iOS app", which contradicts "three native apps" (Kenya (d)). | F-5 | **No named product owner.** Peter decides; Thurgood (070's author) drafts; Leonardo consulted. | Peter |
| 3 | `.kiro/specs/034-component-architecture-system/design-outline.md` L56. Lina's approach: the historical line stays and a dated 128 amendment is appended. | D1, F-6 | Lina | Peter |
| 4 | `governance/technology-stack.md` (per-platform sections L42–55) | D1, D2, F-6 | **No owner recorded.** Lina would take it if assigned (Lina (e)). Peter's assignment. | Peter |
| 5 | `governance/platform-implementation-guidelines.md`. Lina's plan: React (binding) and React Native sections under L650; RTL/RNTL with the unit vs assistive-tech split in Validation Phase 3; a prohibition on choosing the OS by runtime branch. | D1, D2, F-6 | Lina | Peter |
| 6 | `governance/cross-platform-vs-platform-specific-decision-framework.md`. Lina's plan: a "Code-sharing and bindings" section. Types and pure logic may be shared; the rendering and accessibility layer never is. | D1, D2, F-6 | Lina | Peter |
| 7 | `governance/DesignerPunk-Integration-Guide.md` § 4, Reference, and new React and React Native subsections. The parser-fix PR removes L94 and L427 (Ada (e)). | F-2, F-3, F-4, F-7, D1, D2 | Ada; Leonardo consulted (front door) | Peter |
| 8 | Both System Overviews: `DesignerPunk-Systems-Overview.md` (L224, L275) and `Civitas-System-Overview.md` L64 | § 1 | Thurgood; identity docs, so **re-sign** | Peter |
| 9 | `.kiro/steering/Agent-Directory.md`: a React / React Native seat? A new seat also means a `canonical/agents/**` charter. | inbound § 10 Q4 | Thurgood (directory); Peter (staffing). A write-scope or role change is always LAW. | Peter |

**What the text round must show Stacy for site 1** (Stacy (c)):
- the whole unit before and after, with the new `canonicalHash`;
- the operative-set changes: principle-1's new text and whether it keeps its id, and each new item with its id, kind and exact text;
- whether React and React Native get minimum-version members (leaving them out is itself a decision);
- **the dispositions removal texts still matching the source exactly**. Subtraction-2 removes "DesignerPunk is a True Native cross-platform design system" from L18, and subtraction-5 removes the L32–35 block (verified). A rewrite of L18 or L33 must update its removal in the same commit;
- the consumer rendering after the edit, with its `renderedHash`;
- the content question: does principle-1 bind a Model B adopter to DesignerPunk's platform list, or to the registry's?

**Straggler sweep at application.** A first grep finds 11 hits for "web/iOS/Android" or "three platforms" across `canonical/agents/*.md` and `.kiro/steering/*.md`, outside the sites above. The count is heuristic. An example is `canonical/profiles/consumer/lina.overlay.md` L13.

**One ballot or two** (Peter's pick). If the text round names each site's edit in this ballot, sites 2–9 apply as **PRE-DECLARED EXECUTION**, with no second ballot (ballot `2026-10-18-governance-edit-kinds`). **Counter**: one larger review round.

**Core Goals: edited once or twice.** *[THURGOOD R1] correction*: R0 said P1 "could ride at no extra re-sign". Stacy (c) showed this is wrong.
- P1 (L33) and P4 (L35) are both inside `#core-project-context`. The count is **two re-signs** whether 128 goes alone or takes P1. It drops to one only if all three edits go together.
- P1 riding alone would also split the triage issue's single planned ballot (`.kiro/issues/2026-10-18-principles-kind-and-preserved-knowledge-triage.md` L14, L76). That is a charter change.
- **Recommendation (Stacy's)**: edit twice. The second edit is a removal-only re-sign with an unchanged rendering, which takes minutes. Do not tie this sitting to Ada's trigger 2. If trigger 2 fires before the text round, combine all three.
- **Counter**: P1 repoints to the decision framework's § Key Principle, and site 6 edits that framework, so landing them apart may point P1 at text 128 is about to rewrite.

---

## 4. Dependencies and sequencing

The priorities record fixes the order (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3). R1 adds the seats' corrections.

1. **Spec 129 comes first.** Its first task evaluates the platform build-verification harness. *R1 corrections, Ada (d)*:
   - **129 item (i) covers iOS and Android only** (verified: `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` L25). React web consumes `data-theme` CSS, and web custom themes emit nowhere today (Integration Guide L158; verified). **Recommendation to 129's owners: widen (i) to web**; `generateWebThemeBlock` already exists.
   - **The theme source must be the adopter's registered themes** (`ThemeRegistry`). That means 129's item (vi), the Model B leak, has to be decided that way, with (i) built on it.
   - **R0's "rather than building either twice" overstates it.** Theme emission is built once in 129 and *moved* once in 128. That is cheap, but it is a cost.
   - **The transitive limitation carries over**: shadows that reference overridden colour primitives get base values on native, and `rn-ios` `shadowColor` will inherit this. 128 either fixes it or accepts it explicitly.
   - **129 item (v)** should use one exported `PLATFORM_KEYS` constant as D3's seed, so it does not ship a closed public platform list (Ada (b); recommendation to 129).
2. **Spec 128.** This sitting runs now, and implementation comes after 129. *R1 additions*:
   - **Step 6 (generated wrappers) comes after the 17.0.0 element cleanup** (Lina (g); Sparky (a)). The cleanup is Lina's (inbound § 11) and owed to web consumers regardless.
   - **The parser-gaps issue** (`.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`) **is a prerequisite of F-2 (c′) and of step 4.** Its trigger should be tied to 128 step 4 (Ada (a)).
   - **Android harness evaluation has its own trigger** inside 129's first task. It is not reattached to Working Class's iOS-first sequencing (Data (a), (e)). Data (c) answered charter interim (c): no Android toolchain is reachable locally. The realistic host is CI, which is gate territory.
3. **Spec 130 just in time.** **128 never binds Input-Checkbox-Base in a switch role** (130 § 7.3). Lina (f) placed the record: it goes in **128's outline, as a dependency with a named retirement event**: "no switch or toggle binding until Input-Switch-Base merges" (130's P-8 (c), stated from 128's side). When step 6 is specced, it becomes a **check in the binding generator**. 130's P-8 is still open; the line lands in my seat whichever option Peter picks.

**Other dependencies**:
- Specs 118, 123 and 125 assume one package, so the physical split is held (inbound § 5 step 8).
- The Spec 123 Model B ruling: F-2 and D3 are where it bites (Ada (b)).
- Inbound § 10: **Q1** (the first consumer) bears on F-4 and F-5; **Q2** (SSR) decides F-6; **Q5** (assistive-tech testing) decides F-7's bar; **Q8** (Android minimum) gates F-7's Android exit; **Q3** now targets 17.0.0.

---

## 5. Counter-arguments (after fold-back)

**Carried from the inbound** (§ 8):
- Six readiness columns make every contract change a six-way re-verification. D5 makes that visible and does not shrink it (Lina (g)).
- Deferring React Native keeps DesignerPunk a proof its likeliest adopters cannot use (Lina R1; Leonardo R1).
- Native-first architects will read the tiers as a retreat. *R1*: F-7 shows that the published guide already says less than `experimental` (Kenya (c)), so the retreat reading is answered by the existing record.

**R1 additions from the seats**:
- **The front door is partly a catalog gap** (Leonardo (a)). Dialog, select, switch and toast are missing, and no fork here closes that.
- **The instrument-cost gap is structural** (Data (e)). Jest-verifiable React Native evidence is cheap, and Compose evidence needs a toolchain no CI has.
- **Assistive-tech evidence fails first** (Stacy (d)). Nothing here can reproduce it, so every such claim becomes `not re-verified — toolchain unavailable`. The field can then turn into a self-attested ✅ generator.
- **One web spec, two state models** (Leonardo (e)). Controlled inputs, SSR and Suspense add states the element binding lacks. Cross-platform review needs a React column even though React is not a platform.

**Mine, after fold-back**:
- **Six forks became eight.** *Folded*: any fork may be carried to the outline round (§ 6). But **site 1 does not apply while F-1, F-5 or F-7 is unruled**, because its tier and proof text depends on them (Stacy (e)7). *Residual*: design-grade rulings made now rest on less evidence than the round would bring. F-6 is now explicitly split into what to rule now and what waits for Q2.
- **The React history is lost** (inbound § 2). *Folded*: question slot Q-0 (§ 6). *Residual*: 128 may repeat a failure whose cause is lost.
- **The same move, repeatedly.** R0 flagged that I recommended "record, don't block" three times. *R1*: Stacy (d) counts fewer axes than I did. Lina removed one (`react:` is derived from files). Ada (f) showed that F-2's field repairs an existing unread field rather than adding one. **What remains**: tier and evidence tier per platform, `rendering:` and evidence per component per platform, conformance per adopter token, and a proof consumer per platform. Stacy (d) sets two conditions before she can carry them: a validator per axis, and a named reader and falsifier per axis. *Residual*: this project already ships departure fields nobody reads (Ada (f)). Each new field is only better than none if it is indexed where agents read it and its missing state blocks.

---

## 6. Rulings (Peter) — OPEN

*When Peter rules, the session that receives the ruling records it here first and commits that record before anything is applied (README § "The Ratification Protocol"). **Site 1 waits until F-1, F-5 and F-7 are all ruled** (Stacy (e)7).*

- **Ratify / modify / reject**: — *(open)*
- **D1** (React web is a binding, with `kind: platform | binding`, `over: web`): — *(open)*
- **D2** (two RN keys, each with its own column and tier; the shared-file evidence rule): — *(open)*
- **D3** (platform registry; design open; adopter migration owed): — *(open)*
- **D5** (contract-version pin and staleness rule): — *(open)*
- **F-1, tier-scoped gates** (recommended: (c) with conditions 1–4; it does not relieve velocity): — *(open; or carry)*
- **F-2, adopter tokens** (recommended: (c′), with floors blocking): — *(open; or carry)*
- **F-3, front door** (recommended: (c), platform-scoped; set contents carried): — *(open; or carry)*
- **F-4, code or identity** (Leonardo's question; no recommendation): — *(open; or carry)*
- **F-5, proof case** (recommended: (c) with the defined class option, iOS-first narrowed to SwiftUI) — *(open; or carry)*
  - **F-5w, web and the class rule** (recommended: a dated grandfather clause): — *(open)*
- **F-6, React web** (rule the criterion and sequencing now; c-eager vs c-gated after Q2): — *(open; or carry)*
- **F-7, native tier and exit** (recommended: (iii) with the exit list): — *(open; or carry)*
- **F-8, RN vs Compose asymmetry** (recommended: (A) with the `unit`-evidence rule): — *(open; or carry)*
- **Inbound § 10 questions that decide forks**:
  - Q1, the first consumer (F-4, F-5): — *(open)*
  - Q2, SSR a hard requirement? (F-6): — *(open)*
  - Q5, assistive-tech testing in scope? (F-7): — *(open)*
  - Q8, Android minimum version (F-7): — *(open)*
- **Site 4 owner** (`technology-stack.md`; Lina offered): — *(open)*
- **One ballot or two (§ 3)**: — *(open)*
- **Core Goals edited once or twice (§ 3)** (recommended: twice, unless trigger 2 fires first): — *(open)*
- **Q-0 (optional)**: does Peter recall why v1 moved off React? — *(open)*

---

## 7. Review rounds

*Stamp format per Spec-Feedback-Protocol. Each seat's read is entered verbatim, as saved by the orchestrator, and is not paraphrased. The author's fold is woven into §§ 1–6 and summarised under [THURGOOD R1].*

#### [THURGOOD R1] — 2026-10-20 — fold of the seven R1 reads

- **Structure**: D1–D3 and the new D5 get their own ruling lines (Stacy). D4 became F-7 (Stacy; Kenya; Data). F-8 is new (Data). F-5 gained sub-fork F-5w (Stacy). The inbound § 10 questions that decide forks now have slots.
- **Corrections to R0**:
  - L35 changes under F-2 (c), not only (b) (Ada).
  - "A copy that drifts fails validation visibly" is false against today's indexer (Lina; verified).
  - "SSR-critical" sorts nothing (Sparky; Lina; verified).
  - D4 upgrades the claim rather than demoting it (Stacy; verified against the guide).
  - "P1 rides at no extra re-sign" was wrong (Stacy).
  - "Building twice" overstates it, and 129 (i) is iOS/Android only (Ada; verified).
  - F-6 (a)'s cost line charged web-owed element defects to React (Sparky).
- **Recommendations changed**:
  - F-2 moves to (c′) (Ada's tightening).
  - F-3 is platform-scoped (Leonardo; Sparky).
  - F-4's default is no longer called neutral (Leonardo).
  - F-5 gains the proof-consumer definition and narrows iOS-first (Leonardo; Kenya; Data).
  - F-6 rules the criterion now and the eager/gated choice after Q2 (Sparky).
  - The Core Goals edit count changed to twice (Stacy).
- **Divergences I did not resolve, recorded for the outline round**: Lina's and Sparky's F-6 deciding rules select different sets (verified: `validation_form_integration` appears in 2 contracts). Field vs file-derived authored-ness: I took Lina's form.
- **Inbound erratum, recorded here and not edited there** (Sparky): inbound § 2 says "zero `:host` rules", but that is true of `ButtonCTA.web.css` only. 20 of 29 web CSS files have `:host` rules.
- **Caller-out check** (my charter § "The caller-out duty"): no seat proposed criterion language for me to carry. The seats proposed options, conditions and definitions, which the text round will word.

#### [STACY R1] — 2026-10-20 — read-only, on R0 (`0f291b6f3`), required reviewer; VERBATIM (as saved by the orchestrator)

> # [STACY R1 — read-only consult on the Spec 128 identity ballot, R0 (0f291b6f3)] — VERBATIM (2026-10-20)
>
> ## (a) F-1: I pick (c), with three conditions it needs to be checkable
> Can a claims pass decide "the tier caps the claim"? Only partly, as drafted. The cap applies to two kinds of surface the ballot doesn't separate: Generated readiness ("an experimental platform cannot show `production`") is a rule about the generator — a fixture test checks it (Thurgood's instrument); I only read the result. Prose claims (completion docs, summaries, release notes, the Integration Guide) my pass judges by sample.
> What an `experimental` platform's completion doc may claim: criteria rows ✅ only where the evidence reproduces in this environment; "implemented"; "unit tests pass (Jest/RNTL)"; `not re-verified — toolchain unavailable` for every native/RN row whose evidence is a reported result. Words that would be a finding: "production-ready", "production" or "supported" applied to the platform or any component on it; "reference" before the harness exists (inbound § 9); a `wcag:` criterion ✅ on `unit` evidence alone (inbound § 5 step 7, § 6); "verified" on a native row with no reproduced command. A `community` platform: "listed, not claimed" means any ✅ row about it is a finding — say so in one sentence.
> Three conditions: 1. A closed word list per tier (which surfaces are capped, which words forbidden at each tier — as `not re-verified — toolchain unavailable` is a closed string; today `production` (tier) and `production-ready` (readiness string) don't even match). 2. One meaning for `experimental` — it already exists as a component-level readiness value (`component-metadata-schema-reference.md` L47: `production-ready | development | experimental`); the computed per-platform status is a third vocabulary (`application-mcp-server/src/models` L139: `not-applicable | not-started | scaffold | development | production-ready`). 3. The tier is read as it stood at the merge (`git show <merge>:<registry>`), not the current value.
> Does (c) relieve velocity? No. (c) is (a) plus a cap on what can be claimed; writing and verifying claims costs the same; no release-cadence help either (no pass blocks a merge). Not a disguised (b); the risk is Peter hearing it as an answer to fork 1 — it answers "what may we say about a platform", not "can we go faster"; on the question as asked ("lighter standards?") choosing (c) means "no". Where velocity cost comes from: § 5 counter 1 — every contract change re-verifies six readiness columns; the lever is the SCOPE of each parent's criteria, not lighter evidence; Lina R4's staleness rule points at it (a contract change marks other platforms stale — generated and visible — instead of requiring rows for them in the same spec); a question for Thurgood and Lina; a stale status would be easy for me to check.
> Why (c) over (b): (b) creates two evidence standards → which pages a pass covers depends on tier → tier assignment becomes the cheapest way to lower evidence (a Goodhart lever) and "experimental" becomes a cheap place to stay; (c) keeps full evidence while a platform sits there. Surviving counter: velocity not relieved; the prose half is checked by sample; the generated half depends on D3 (multi-week build) — from ratification until the generator merges, the cap is prose law enforced only by my sampling.
>
> ## (b) D1–D4: none is Peter's, and D4 should be its own fork
> Inbound § 1 settles exactly three things: adoption is the goal; React and RN are in scope; adopters author their own tokens and components. None of D1–D4 comes from there; all four are seat recommendations (§ 3, § 4 P2, § 5); § 5 says "carry into the outline", § 13 says "not a ratification". Listed, not hidden — but "ratify unless modified" promotes them to law with no ruling line. ASK: give each D its own line in § 6.
> D1 — low stakes, but conflicts with inbound § 6, which makes `react` a contract key and readiness column; if React web isn't a platform it has no tier and the F-1 (c) cap can't apply to the React package. The R1 text must say whether `react` is a registry tenant with its own tier. D2 — fine to carry; bring inbound § 6's evidence rule with it (a shared RN file counts for both keys only if its tests run under both `Platform.OS` values), or I judge it fresh every pass. D3 — a design decision that is also a multi-week build, placed inside identity law; F-1 (c) and F-5's class option depend on it; needs an explicit ruling line — if D3 falls, both collapse. D4 — its own fork. Kenya and Data haven't read it (§ 8 "then"). Its effect runs the opposite way from the framing: it demotes nothing in Spec 123's release records (the Integration Guide already says native is "not supported", "reference source, not a build input", "don't start a native product" — L23, L164, L178); the consumer guard asserts no tier and no native build (`tests/consumer-integration.test.ts` L2122 checks a not-started status; L2224–2226 check Kenya's/Data's KB paths) — D4 breaks none of it; it actually UPGRADES the claim: in a production/experimental/community list, `experimental` reads as "usable at your own risk", more than "don't start a native product". The real fork: (i) add a tier matching the guide ("source shipped, not a build input"); (ii) define `experimental` to include "not a build input"; (iii) something else. What it DOES demote: the 2/34 components whose computed readiness shows `production-ready` on iOS and Android (consumer agents read that through the Application MCP); the release that ships the generator must disclose it; my RELEASE pass reads it. The exit can't be checked: "until the harness exists" is satisfied by a harness built but not required; a checkable exit = the harness is a registered required check + compile evidence per component (+ a proof consumer if F-5's class option holds).
>
> ## (c) The re-sign
> I confirm both seats: C1 signer of `#core-project-context` (`signatures/core-goals.md`, 2026-09-29, 8/8 surviving) and its confirmer. Peter samples my assents; my acts go to the delegate audit. What the R1 text round must show me: 1. The whole unit before/after + the new canonicalHash. 2. The operative-set changes (`core-goals.yaml`): principle-1's new text and whether it keeps its id; each new item (admission rule, tier list, proof statement) with id, kind, exact text; whether React and RN get "Platform Minimum Versions" members (leaving them out is itself a decision). 3. The dispositions row (`always-set/core-goals.dispositions.yaml`): removal texts must still match the source exactly — subtraction-2 removes "DesignerPunk is a True Native cross-platform design system" from L18 (if L18 is rewritten, that removal silently stops matching); subtraction-5 removes the L32–35 block. 4. The consumer rendering after the edit (overlay L7, L13–16), its renderedHash, the surviving items; the content question: principle-1 is an obligation on a Model B adopter — does it bind them to DesignerPunk's platform list or the registry's? 5. Keep per-platform tier ASSIGNMENTS out of the signed unit (W-9 § 2: promoting a platform is a fact changing, not law; Core Goals states the rule and tier names; assignments live in the registry) — otherwise every promotion means another re-sign. 6. Site 1 should name all four files (confirmations file and dispositions row are missing).
> Edit Core Goals once or twice? P1 (L33) and P4 (L35) are both inside `#core-project-context`; every edit means re-signing the same unit. "P1 rides at no extra cost" saves nothing: P4 still forces a second re-sign; count is 2 whether 128 goes alone or takes P1; drops to 1 only if all three go together. P1 riding alone would split the triage issue's single planned ballot (L14, L76) — a charter change, must be said. My read: edit twice (a removal-only re-sign with unchanged rendering takes minutes; don't tie the 128 sitting to Ada's trigger 2; if trigger 2 fires before the R1 text round, combine all three). Counter: P1 repoints to the decision framework's § Key Principle, and site 6 edits that framework — if they land separately P1 may point at text 128 is about to rewrite; argues for riding.
>
> ## (d) Four metadata axes: I can carry them, under two conditions
> The count is lower than four per component per platform: tier is per platform (~6 rows); token conformance per adopter token; `react:` one key only; only `rendering:` and the evidence tier are truly per component per platform. Condition 1: a validator per axis (schema check for presence and allowed values — Thurgood's instrument; my pass samples truth; presence-checking by hand fails at volume, as the delegated-tier line did in the interim). Condition 2: a named reader and falsifier per axis (`react: generated` is mechanically checkable via generated-file provenance; "off-scale with a reason" can be counted but the reason can't be checked; a record nobody reads is write-only — Thurgood's own counter on F-2). Where it fails first: evidence tier `assistive-tech` — nothing here can reproduce it (inbound § 10 Q5 unanswered); every such claim becomes `not re-verified — toolchain unavailable` and the field turns into a self-attested ✅ generator (same class as delegated-tier: consistency, never proof).
>
> ## (e) What would be a finding at the next claims pass if ratified as written
> 1. Web may break F-5's class option the day it's ratified: no platform reaches production without a proof consumer, D4 leaves web the only candidate, Working Class is unbuilt and no proof consumer is recorded for web — either web violates the rule at ratification or drops to experimental and contradicts Integration Guide L23 ("ready for building web products"); needs a grandfather clause or a named web consumer. 2. D4's word contradicts the shipped guide. 3. `experimental` collides with the existing component readiness value (L47). 4. The interim is undeclared: the cap says `production`, the readiness string is `production-ready`; two native components show `production-ready` today; until D3's generator lands every readiness read is a finding unless the ballot says when the cap takes effect and what stands in until then. 5. D1 leaves `react` with no tier (inbound § 6). 6. D4's exit can't be checked. 7. Carried forks against site 1: if F-1 or F-5 is carried to the outline round and the ballot still ratifies, site 1's tier/proof text depends on an unruled fork — applying it would be a finding; § 6 should say site 1 waits for both. The open slots themselves are surfaced, not findings, under the walk rule.

#### [LEONARDO R1] — 2026-10-20 — read-only, on R0 (`0f291b6f3`), required reviewer; VERBATIM (as saved by the orchestrator)

> # [LEONARDO R1]: Spec 128 identity ballot DRAFT (R0), read-only consult (adopter front door) — VERBATIM (2026-10-20)
>
> Facts I checked: Live catalog: web is production-ready on 30 of 34 components. iOS and Android are production-ready on 2 of 34. Integration Guide L23 and L123: web is the only supported platform today. The Settings ledger produced six gap records, G1–G6, in `.kiro/issues/2026-10-13-component-gaps-from-settings-ledger.md`. The scratch consumer from that study was ruled disposable (charter D1 = b1, now archived). Unverified: what React teams copy first. That list is my judgment, not a measurement.
>
> ## (a) F-3: copy-and-own or contracts (ballot § 2 F-3; inbound § 8.3, § 5 step 7)
> What a React team wants first, roughly in order: 1. Button 2. Text input (with email and password variants) 3. Dialog / modal 4. Select / dropdown 5. Checkbox and switch 6. Card 7. Tabs 8. Toast / tooltip.
> What DesignerPunk has for that list: Exists: Button-CTA, Button-Icon, Input-Text-Base/Email/Password, Input-Checkbox-Base, Container-Card-Base, and Nav-SegmentedChoice-Base (tabs). Missing: dialog (G2), select (no record), switch (G1, now Spec 130) and toast/tooltip. So half of what a React team copies on day one isn't in the catalog. My one real screen (Settings) hit G1, G2, G3 and G4. The front-door question is partly a catalog-gap question, and no fork in this ballot addresses that.
> Does a coverage-picked set match what teams want? Only partly. "At least one each of interaction, state, accessibility and composition" can be met by Button-CTA, Input-Checkbox-Base, Badge-Count-Notification and Button-VerticalList-Set. That set overlaps the wanted set only at Button and Checkbox. Coverage is a floor, not a selection rule. I'd change it to demand-drawn, coverage-constrained: take the components a first real screen needs (the ledger method), then check them against coverage.
> Two defects in the fork text: 1. Step 7 is the React Native reference set, but F-3's counter treats it as the React front door. The ballot should say which platform, or both, F-3 governs. 2. F-3 (c) and F-6 (c) collide on React web. If React web is generated wrappers (F-6), copying generated code cuts it off from regeneration. My read: on React web the front door is install (wrappers, which can be upgraded), and copy-and-own is the eject path for teams that want "their own shape". On React Native, copy-and-own may lead.
> No upgrade path: is that acceptable? shadcn shows React teams will accept ownership in exchange for no upgrades. DesignerPunk is different because it is accessibility-first and ships with known defects: zero `forced-colors` support (inbound § 11); focus/blur dispatched as CustomEvents (`InputTextEmail.web.ts:204`). A copy freezes today's defects into every adopter repo, and our fixes never reach them. Copying before Spec 129 is worse. Theme emission is unwired, so a team that edits a copy to change its look will hard-code values. That defeats token-first.
> My pick: (c), with two amendments: 1. The `implements:` declaration carries the contract version, and the step-4 indexer reports staleness against core ("your copy implements v N; core is at v M; these changes affect you"). This extends Lina's R4 manifest pin to adopter copies. It notifies; it doesn't repair. 2. The reference set is demand-drawn and coverage-constrained, and step 7 stays after 129 (already the order in § 4). The identity-grade part, "the front door is components and the product is contracts", can be ruled now. Which components go in the set can be carried to the outline round.
> Surviving counter: The declaration is opt-in. An adopter who deletes `implements:` loses validation, and nothing notices. Teams who modify copies on purpose will drift on purpose. Visible failures may train them to ignore validation or drop the declaration. Staleness notices don't fix accessibility defects in code we no longer control.
> Fork for Peter: should the lead be install-first (upgrades, DesignerPunk's look) or copy-first (ownership, no upgrades)? This ties to F-4 and F-6.
>
> ## (b) F-4: code or identity (ballot § 2 F-4; inbound § 8.4)
> What an adopter sees under (a), code only: A React subpath or package under `@3fn/*`; A "for React" section of the Integration Guide; A readiness column that says `react: experimental`; The same MCPs. Most important, `designerpunk init` writes the consumer always-set into their repo. Their agents are then told this is a "True Native cross-platform design system… web/iOS/Android" (consumer `core-goals.overlay.md` L7 and L13–16). For a React-only team, that is the identity they meet, whatever F-4 rules. Edit site 1a decides it, not F-4.
> What an adopter sees under (b), a named edition: Its own landing page and package name; Release notes generated from the registry; Plausibly its own `init` profile and consumer rendering.
> Does a name change adoption? At the margin, yes: discovery ("React design system") and a signal of first-class commitment. But adoption turns on install-to-first-screen time and on whether the component they need exists. Today dialog, select and switch don't. A name over that gap makes the disappointment louder. A named edition whose readiness column reads `experimental` everywhere (F-1 (c)) is also a mixed message. A name is cheap to add later and expensive to retract.
> My read: (a) is the right default for packaging. Thurgood's "defer until a first adopter exists" is not neutral, though: the first impression forms before that adopter exists, through the init rendering.
> The question Peter should answer: "If the first outside adopter is a React-only team that will never touch iOS or Android, should anything they see, whether docs, init output or what their agents are told, mention True Native?" No points to (b), with a separate consumer rendering. Yes points to (a); True Native stays the identity and React is one of its platforms.
> Surviving counter: under (a), True Native framing on a React install may read as "a native project with a React port". That is the retreat reading in inbound § 8 counter 3, from the other side.
>
> ## (c) F-5: Working Class and iOS-first (ballot § 2 F-5; inbound § 10 Q1)
> Pick: (c) with the class option, plus one amendment. The class option needs a definition of a proof consumer: a repo that persists; a named product owner; at least N screens specified through the Product MCP; inspectable by a claims pass. Without that definition, a scratch consumer meets the field trivially.
> My scratch Settings consumer does not qualify. It was ruled disposable evidence scaffolding (archived charter § 2, D1 = b1). It sits at `../scratch-consumer-settings` and may be deleted. It has one screen, no product owner, and targets Web Components, not React.
> Candidates: 1. Working Class's web app consumed through the React binding. 070's line is "No React Native or cross-platform runtime" (`alignment-record.md` L28). React web is arguably not banned by that line. Under D1 and F-6 (c), the generated wrappers still exercise the web elements underneath. That gives one product spec, a native binding and a React binding: the strongest parity proof from my seat. It also gives a known product owner. Counters: Framework-free Web Components lose their standalone proof. The React proof waits behind iOS-first sequencing. It still needs a 070 reading, or an amendment, by its product owner. 2. Peter's new organization (inbound § 10 Q1). The most realistic real product, especially for React Native. But it sits outside this repo's governance. Stacy cannot inspect it, so it cannot back a readiness claim. 3. A new in-house product. It risks being a proof built to prove: it is not a real product, so it proves little.
> I cannot name an existing React Native proof consumer. None exists.
> Product owner: for any in-house candidate it is Peter. Product decisions are his, and he is the only human. An outside adopter owns its product but not our evidence.
> iOS-first: no evidence has been presented against it. It is a proof ordering, not an adoption ordering, since adopters meet web or React first (Integration Guide L23). The Core Goals text should keep the two apart.
> Surviving counter: the class option could leave both React targets experimental indefinitely, as the ballot already says. Candidate 1 is the only one that shortens that, and it reopens 070.
> Fork for Peter: candidate 1 versus waiting for Q1's answer.
>
> ## (d) F-2, from the adopter side only (ballot § 2 F-2; inbound § 8.2)
> A screen spec references semantic tokens by name. Nothing breaks at emit. The inbound is right that off-formula tokens emit cleanly. What breaks: 1. Relative semantics. My specs and the named design rules express relationships: "one type step up for hierarchy", "group spacing is two steps above item spacing", baseline rhythm. On an adopter scale that isn't proportional, "one step" means something different at each step. A spec stays valid by name and loses its intent. 2. Derived geometry of system components. Component tokens resolve against the adopter's primitives (for example `buttonIcon.inset.medium = space125`; the 56×32 switch). An off-scale base yields values off the grid inside our components, whether installed or copied. 3. Accessibility floors, if they ride the maths validator. Contrast pairs and touch-target minimums (`tapAreaRecommended`) are WCAG floors, not Rosetta maths. F-2's options blur the two. Floors must block on adopter roots whatever F-2 rules, because Core Goals says accessibility-first.
> Adopter-side condition for (c): the conformance field must show up where I query: `get_product_tokens`, `get_token_details` and the `tokens:` blocks in screen specs. Then I see "off-scale (reason)" while specifying.
> Surviving counter: even surfaced, it is per token and advisory. Nobody will check it token by token.
>
> ## (e) D1: React web as a binding over web (ballot § 1 D1; inbound § 3)
> Yes, one web spec with two bindings matches how I'd specify. These stay one: component tree, tokens, layout regions, accessibility guarantees and information architecture. React differences go in the Web platform notes as a binding sub-note: `onPress` vs the `press` event, controlled vs uncontrolled inputs, and the `'use client'` boundary. Under D1 the Product MCP needs no new `react` platform value. React screens stay `web`.
> Surviving counter: the state model is where "one spec" strains. Under React, the host app owns input state: controlled inputs, with values read from `event.detail` today. SSR and server components add states the element binding lacks: server-rendered, hydrating, interactive. Suspense and streaming change loading states. If F-6 (c) hand-writes the form components, React form behaviour, such as validation timing, can diverge from the element's under one spec. So my cross-platform review needs a React column even though React isn't a platform. In practice that is a fourth review target. D1 does not cover React Native. An RN screen spec should inherit iOS and Android interaction notes (back gesture, `BackHandler`), not web ones. That supports D2's internal rn-ios/rn-android split.

#### [ADA R1] — 2026-10-20 — read-only, on R0 (`0f291b6f3`), R1 reviewer; VERBATIM (the seat's SubagentHandback report, extracted verbatim from the transcript the orchestrator saved)

> **Ada: read-only consult on the Spec 128 identity ballot DRAFT (R0)**
> Ballot: `/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/.kiro/docs/ballots/2026-10-20-spec-128-platform-admission-identity.md` @ 0f291b6f3. Inbound: `/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/.kiro/specs/128-react-react-native-platform-admission/inbound-from-react-rn-sitting-2026-10-02.md`. I edited nothing and committed nothing. Every file:line below I read today unless it is marked UNVERIFIED.
>
> ---
>
> ## (a) F-2: my pick is (c), tightened in one place
>
> **The verified facts the pick rests on:**
>
> 1. **"The maths" means two different properties, and the ballot does not say which one F-2 is about.**
>    - *Honesty*: the formula a token states matches its own value. `MathematicalRelationshipParser.validate()` (`src/validators/MathematicalRelationshipParser.ts:267-350`) computes `familyBaseValue op operand` and compares it to `baseValue`. A token that says `base × 1.37` with value 10.96 passes. Descriptive strings skip the check entirely (L278-308).
>    - *Membership*: the value is actually on the family's scale or grid. `ErrorValidator.validateBaselineGridCompliance` (`src/validators/ErrorValidator.ts:460-520`) checks this, but only for spacing and radius. It sits on the `TokenEngine`/`ValidationCoordinator` path, and `TokenEngine` is never constructed outside tests (grep, 2026-10-20).
>    - In this repo, membership is enforced by the Jest formula suites (`src/tokens/__tests__/*FormulaValidation*`). Those never run in an adopter's repo.
> 2. **The adopter's only maths instrument is red on our own tokens.** `npx designerpunk validate` runs four checks (`src/cli/validate.ts:39`). The maths check (L102-114) checks honesty only, and it fails on 102 correct tokens (`.kiro/issues/2026-06-28...`: no; the parser issue is `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`, addendum 2026-10-03). The Integration Guide says so (L94, L427).
> 3. **The departure pattern behind (c) already exists in Rosetta twice. Nothing reads either field.**
>    - `isStrategicFlexibility: boolean` (`src/types/PrimitiveToken.ts:110`) has no reason field and is self-declared. `ErrorValidator.ts:470` skips the grid check for any token that sets it.
>    - Spec 109 product-token YAML carries a `rationale:` field next to raw values (`src/build/product/__tests__/fixtures/tokens/layout.yaml:9,20`). `ProductTokenGenerator` never reads it (`src/build/product/ProductTokenGenerator.ts:131-155`).
>
> **What "checked and recorded" means mechanically, as I would build it:**
> - **Prerequisite.** The parser-gaps fix lands first, with its per-family call on which families are *mathematical* and which are *categorical*. That classification decides which tokens the conformance field applies to: dimensional families do; colour, font family and easing do not. Running (c) on a checker that is red on 102 tokens teaches people to ignore it from day one. The ballot's § 4 does not list this dependency; it should.
> - **The field.** Replace `isStrategicFlexibility` with an optional `conformance` field: `on-scale` | `flexibility` (named in the family's list) | `{ offScale: "<reason>" }`. It must be optional so that adopters' copied token files still typecheck.
> - **Validator and output.** `validate` gets a fifth section, "Rosetta conformance", that checks both honesty and membership (the grid logic generalised past spacing and radius). It prints counts of on-scale, flexibility, off-scale with reasons listed, and undeclared.
> - **What blocks.** `validate` exits non-zero on **undeclared** off-scale, meaning a value that fails membership with no `conformance` declared. That is a missing field, so it is structure. Declared off-scale is reported and does not block. `generate` warns on the same condition and does not block.
> - **This is my one tightening of (c), and it is Peter's call.** As drafted, (c) makes the maths advisory. My version makes the *declaration* blocking and leaves the *value* free.
> - **Where the record lives.** On the token in the adopter's source, and in `token-index/` next to the existing `formula` key (`src/generators/generateTokenIndex.ts:188-198`). That way `get_token_details` returns it to the adopter's agents every time they pick a token. No separate record file.
>
> **Does a token that skips the formulas emit cleanly to every platform? Yes, and the gap is wider than the inbound says.**
> - `generate` stops only on semantic-reference and override validation (`src/generators/generateTokenFiles.ts:72-104`).
> - The format generators emit the stored `token.platforms.<p>` exactly as written (`src/providers/WebFormatGenerator.ts:36-58`, `iOSFormatGenerator.ts:45,53`, `AndroidFormatGenerator.ts:30`). The emit path never reads `baseValue`, `mathematicalRelationship` or `isStrategicFlexibility`.
> - So a token can also emit **different numbers per platform**, or a number that contradicts its own `baseValue`, and still emit cleanly. Nothing in the adopter path checks that the platforms agree (`CrossPlatformConsistencyValidator` runs only on the test-only path).
> - A token missing a platform key does *not* emit cleanly: it throws (`WebFormatGenerator.ts:55-57`).
> - The conclusion matters for F-2: **the cross-platform consistency claim depends on D3 (computing `PlatformValues` at emit time), not on F-2.**
>
> **What an adopter loses if the maths is advisory:**
> - Derived values stop being guaranteed to land on the grid when their inputs leave the scale. This is reasoning, not measured per family.
> - Vertical rhythm stops being predictable.
> - Agents can no longer reason by scale ("one step up"). Without a record, the Token-Family docs their agents read describe a scale their tokens no longer follow. The record answers this, because agents read `get_token_details` on every selection even when people ignore reports.
> - They keep the primitive → semantic → mode/theme pipeline either way.
>
> **I do not hold that "the maths IS the product."** The maths is the method. The product claim is that *every value can be explained*. (a) does not work across families: colours and easing are categorical, so blocking can only ever apply to dimensional families. Also, under Model B nothing in the adopter's repo is "DesignerPunk's own" after birth, so (b)'s "the claim narrows to DesignerPunk's tokens" really means the claim holds only in this repo. In this repo the maths stays blocking through the Jest suites under every option.
>
> **Correction to the ballot.** Site 1a says overlay L35 changes "if F-2 is (b)". **It also changes under (c).** "All tokens must follow Rosetta System: mathematical relationships" (`canonical/profiles/consumer/always-set/core-goals.overlay.md:35`) is false once off-scale-with-reason is allowed. Only (a) leaves L35 as written. Under (b) or (c), the re-sign is owed.
>
> **Surviving counter:**
> - The reason is free text and nothing judges it, so "brand" can become the reason for every token. Blocking undeclared tokens stops *silent* drift, not *declared* drift.
> - (c) cannot be built until the parser-gaps work lands, and that work has no date: its trigger is "first Ada token-validator session after U3 merges, or a `fix/` on Peter's go". That trigger should be tied to 128 step 4.
>
> ## (b) D3, the platform registry: the direction is decided, the design is open
>
> - **Decided**: a registry, web/iOS/Android as its first tenants, readiness generated from it. All four owning seats agree (inbound § 4 P2, § 5 step 2).
> - **Still open**:
>   1. Where platform-authored data goes once `PlatformValues` is computed. Some values cannot be derived from `baseValue`: font stacks, Android `elevation` (`src/types/SemanticToken.ts:80-87`), iOS `shape`, Android `percent`, and `sp` vs `dp`. So "compute at emit time" still needs a place for per-platform data, keyed by registry key.
>   2. The emitter interface, including the theme idiom.
>   3. Whether adopters or community can register platforms from config. F-1 lists community platforms, which would make this a `defineConfig` change.
>   4. Conformance fixtures.
> - **Cost in my pipeline**:
>   - `TokenFileGenerator.ts` is 2,072 lines with 47 platform-literal matches.
>   - 15 non-test source files hold closed lists (my grep 2026-10-20), including `ProductTokenGenerator.ts:58` and both MCP indexers. `token-index/` also carries a closed `platforms: {web, ios, android}` name map (`generateTokenIndex.ts:194-198`), which is a public index format.
>   - The inbound counts 73 test files.
>   - My R2 estimate stands: one spec, several weeks, the largest single item in 128.
> - **A cost nobody has priced: the Model B migration.**
>   - `init` copies the whole `src/tokens` tree into the adopter's repo (`src/cli/init.ts:229-246`). Those files build `platforms:` against the closed `PlatformValues` type, imported from `@3fn/core/types`.
>   - So changing `PlatformValues`, whether by adding RN keys or making it computed, touches the **adopter's own copy**, which Model B says DesignerPunk never writes to.
>   - Making it computed (with `platforms` kept optional and ignored for a deprecation window) is the only shape where an existing adopter gets new platform output without us editing their language. It still needs a migration path (sync detection, the same class as residual R1).
> - **Does 129 need D3 first? Not for item (i).** Item (i) wires `generateThemeOverrideBlocks` (`TokenFileGenerator.ts:1024`), which already exists and is tested, into `generatePlatformTokens` (L1633). Doing that on today's three platforms is cheap, and 128 later moves it into emitters once.
> - **But item (v), per-platform output paths through the M0b `platforms:` config, would ship a new consumer-facing platform list.** If it ships with closed `web/ios/android` keys, 128 has to migrate a public config schema. My recommendation: 129 (v) uses a single exported `PLATFORM_KEYS` constant, with the type derived from it, as the seed of D3. That costs one constant. Counter: designing a seam for another spec inside 129.
>
> ## (c) D2, React Native emitted twice: right at the package boundary; inside, two registry keys reading one source
>
> - **To the adopter**: one target, and Metro picks `.ios`/`.android`. My R2 position stands (inbound § 3).
> - **Inside the pipeline**: two registry tenants, `rn-ios` and `rn-android`. They share the resolved model and one React Native formatting module (unitless numbers, StyleSheet-ready objects, hex/rgba colours). They differ only in a small per-OS table:
>   - shadow: iOS `shadow*` props vs `elevation`, unless RN's new-architecture `boxShadow` is available (inbound Q7);
>   - font family names.
> - **Two gaps the inbound's "1–2 weeks after step 2" does not include:**
>   - React Native needs one font family name per OS. Today every platform stores the same CSS stack (`src/tokens/FontFamilyTokens.ts:11-17`), so per-OS names exist nowhere yet. That is new token data, in my seat.
>   - Colour conversion. UNVERIFIED: to my knowledge, React Native's colour parser does not accept `oklch()`, which would force a conversion. The `src/generators/oklch` transformers may cover it.
> - **What it does to `PlatformValues`**:
>   - If D3 lands first: nothing. Its emitters compute values, and the per-OS table supplies the rest.
>   - If React Native lands first: two new required keys on a closed interface (`PrimitiveToken.ts:64-68`), in 26 token files and in every adopter's copy (see (b)). That is a breaking change for adopters. This supports the sequence of registry first, React Native second (inbound § 5).
> - **A D1/D3 interaction to flag.** Lina's readiness columns are `web, ios, android, react, rn-ios, rn-android`. But for tokens, React web is not an emission target: it consumes the web CSS, plus an optional typed `tokens.ts` as a *format*. So token emission has five keys and component readiness has six. The registry needs to say whether those are one list with flags or two views.
>
> ## (d) Theme emission: dependency confirmed, with four corrections
>
> **Confirmed**: 129 first, and 128 inherits the theme wiring. **Corrections:**
> 1. **129 item (i) covers iOS and Android only** (the charter's scope (i); the 094 issue's fork 3 says to "treat web separately"). Web custom themes emit nowhere today (Integration Guide L158). React web consumes `data-theme` CSS (inbound § 6). So 128 needs web custom-theme emission, and 129 does not cover it. Recommendation: widen (i) to web. `generateWebThemeBlock` already exists.
> 2. **The source of themes.** The 094 fix's fork 2 builds from the "resolved legacy contexts", meaning the package's own dark and WCAG themes. That is item (vi)'s Model B leak (`generateTokenFiles.ts` statically imports the package's overrides). For "their own shape", 128 needs (vi) decided in favour of the **adopter's registered themes** (`ThemeRegistry`), and (i) built on that source. Otherwise 128 re-wires it.
> 3. **"Rather than building either twice" (ballot § 4) overstates it.** The inbound put step 3 inside step 2 so the theme part of the emitter contract is defined once. Under the new order, theme emission is built once in 129 and *moved* once in 128. That is cheap, but the ballot should name it.
> 4. **The transitive limitation carries over.** Token-governance records that theme-varying is determined directly, not transitively: shadows that reference overridden colour primitives get base values on iOS and Android. `rn-ios` `shadowColor` will inherit this. 129 (i) does not address it, so 128 must either fix it or accept it on React Native explicitly.
>
> ## (e) Integration Guide changes under each F-2 option
>
> My site 7 also needs F-2 (and D1/D2, for new React and React Native Platforms subsections) added to its "Driven by" column.
> - **(a)**: § 4 says your dimensional tokens must be on Rosetta's scale and that `validate`/`generate` refuse off-scale ones. It must also say how an adopter gets an exception, and nothing exists for that today.
> - **(b)**: § 4 says the maths is DesignerPunk's own method and your tokens are checked only for structure. `validate` drops to three checks, and the known-defect sentences (L94, L427) go with the fourth.
> - **(c)**: § 4 and Reference "Token Source Configuration" document the `conformance` field, the conformance report, and failure on undeclared off-scale tokens. The parser-fix PR removes L94 and L427.
>
> ## (f) Surviving counter against the ballot as drafted, from the token seat
>
> - **D3 is carried as a settled decision with no cost row.** It is the largest and riskiest work in 128, and it changes adopters' copied token files under Model B. Ratifying it at identity grain without saying "design open, adopter migration owed" invites treating a multi-week design spec as settled. 129 (v) can also ship a closed platform list before D3 exists.
> - **F-2 is ruleable now, but under any option except (b) the instrument it relies on is broken, and the membership half does not exist in the adopter path.** The ballot neither states that nor lists the parser-gaps issue as a dependency. Site 1a's "L35 only under (b)" is wrong: (c) changes it too.
> - **A partial rebuttal of Thurgood's "same move three times" residual, for F-2 only.** (c) is not a new metadata axis. It repairs a departure pattern Rosetta already has twice (`isStrategicFlexibility`, `rationale:`) and never reads. That cuts both ways: the record shows this project already ships departure fields nobody reads. (c) is only better than the status quo if the field is indexed and the undeclared case blocks. Without both, it is a third unread field.

#### [LINA R1] — 2026-10-20 — read-only, on R0 (`0f291b6f3`), R1 reviewer; VERBATIM (as saved by the orchestrator)

> # Lina: read-only consult on the Spec 128 identity ballot DRAFT (R0) — VERBATIM (2026-10-20)
>
> Two corrections to the brief: the `rendering: designed | native` field comes from the True Native ballot F-1 (iv) (L286–288, L670); Spec 130 applies it, doesn't define it. Ballot § 3 gives me sites 3, 5 and 6: the 034 outline, `platform-implementation-guidelines.md` and the decision framework. The System Overviews are site 8 (Thurgood; identity docs, re-sign). `technology-stack.md` is site 4, no owner.
>
> ## (a) F-6: generated wrappers or hand-written React
> What a generated wrapper gives: typed props; event names normalised (`CustomEvent('press')` → `onPress`, value lifted out of `detail`); a ref to the host element; in React 18, object/array props set as properties (otherwise "[object Object]" attributes). React 19's own custom-element support covers much of this; the wrapper's lasting value is types and event normalisation.
> Where it breaks (checked in source): 1. SSR — importing the module on the server throws (`ButtonCTA extends HTMLElement` at module scope, `ButtonCTA.web.ts:122`; `connectedCallback` reads `document.readyState`/`getComputedStyle(document.documentElement)` L180, L235); even with a guarded define + `'use client'`, the server sends an empty host tag — no Declarative Shadow DOM, so content and accessible name appear only after upgrade. 2. Forms — only `InputRadioBase.web.ts` is form-associated; `InputTextBase` has no `attachInternals`; FormData, React 19 form actions, `form.reset()`, native constraint validation can't see the value; value read back from an attribute (`InputTextEmail.web.ts` `getAttribute('value')`), so React's controlled pattern fights the element's internal state. 3. Event collisions — five components dispatch bubbling, composed `CustomEvent('focus')`/`('blur')` (Input-Text-Base/-Email/-Password/-PhoneNumber, Button-VerticalList-Item; Email at :204); native focus doesn't bubble, so consumers see a fake one, possibly two; a wrapper passes the defect on or hides it (hiding bakes a breaking change into the wrapper's API). 4. ARIA across the shadow boundary (the floor point) — our inputs render their own `<label>` and `aria-describedby` inside the shadow root (`InputTextBase.web.ts:290`, `:306`), so the element meets the floor by itself; but a React team's own `<label htmlFor>`, external hint, or error-summary `aria-describedby` can't reach the inner `<input>` (IDREFs don't cross shadow roots; `useId` doesn't help); RTL's `getByRole` doesn't see into shadow roots → inbound § 6's RTL plan doesn't work as-is for generated wrappers.
> My pick: (c), narrowed, with two fold-ins. The deciding rule comes from the CONTRACT, not judgment: a component is authored when it carries `validation_form_integration` or holds a controlled value (where breaks 2 and 4 bite; a light-DOM native `<input>` with `<label htmlFor>` meets DOM+ARIA better than a wrapper). SSR is not a per-component property: if required (inbound § 10 Q2) fix it once for the whole package in the element + wrapper-generator layer (guarded define, no `document` reads before connect, `'use client'`); not a reason to hand-write React. Don't store a `react:` field: authored-ness is visible from files (`platforms/react/*.tsx` exists), as readiness detects implementations today (`ComponentIndexer.ts:880`); the rule becomes one check: a form-contract component with no authored file is a finding — removes one of Thurgood's four metadata axes.
> Fork for Peter (not picking): (c)-narrowed, or (a) plus fixing forms in the element itself (`ElementInternals` form association + `delegatesFocus` on the inputs — one implementation, helps vanilla web adopters too; cost: controlled values through a shadow `<input>` stay awkward, external label/describedby IDREFs can't cross until ARIA reference-target ships everywhere).
> What survives: the authored subset = the components with the most contracts; verified twice by different harnesses (shadow-DOM element tests vs light-DOM RTL) — "one contract" can pass in one and fail in the other. With the element-API cleanup now at 17.0.0, generated wrappers must not ship before it, or React adopters take a breaking change in their first major.
>
> ## (b) F-3: can "conformance by declaration" be checked with today's indexer?
> No. The indexer unions several roots, consumer root first (`ComponentIndexer.ts:214–290`, Spec 123 C3); resolves `inherits:` and warns on a missing parent (`InheritanceResolver.ts:41`); parses `version` from contracts.yaml (`parsers.ts:172`) but never compares it. It does not validate concept names against the catalog (that check is a Jest test hard-wired to `src/components/core`: `contract-catalog-name-validation.test.ts:22`, never runs on adopter roots), check any version pin, carry a provenance tag beyond root rank, or understand `implements:`.
> The defect that matters: a copy that keeps its declared name currently SHADOWS the package component — its own contracts.yaml replaces the core one in the contracts cache and the original is "left out" (L264–281, L355). A copied component that edits its contracts quietly redefines the contract, and nothing fails. F-3 (c)'s claim "a copy that drifts fails validation visibly" is FALSE against today's code.
> Step 4 must add: `implements: <Component>@<contract-version>` as a relation separate from `inherits:` (a copy is a fork, not a family child); catalog-name validation in the indexer for adopter roots incl. `x_<org>_`; comparison of the pin against core's version; a name-shadowing rule (a copy takes a new name, or the shadow is recorded and reported).
> What a drifting copy owes: code drifts, contract unchanged → nothing new (declaration can't see it; readiness self-attested, capped below `production`); contract drifts → every removed/changed contract declared as an exclusion with a reason, additions use catalog concepts or `x_<org>_`; core moves on → the pin goes stale, reported as a warning not an error (their code; they owe an honest pin, not upstream tracking).
>
> ## (c) F-4, in two sentences
> Everything the seats proposed (P1, tiers, the registry) answers how to ship React without splitting the repo. But "DesignerPunk Native / DesignerPunk React" may have been about how the project is named and seen by an audience, and a landing page doesn't answer that. I need Peter to say which problem the split idea was meant to solve: engineering velocity (answered by P1 and F-1) or audience and positioning (F-4 (b)). If positioning, which audience leads the front door?
>
> ## (d) D1/D2: one RN implementation per component, or two?
> One by default, with two keys (my R3, inbound § 6): a suffix-less shared `.tsx` under `platforms/react-native/`; Metro `.ios.tsx`/`.android.tsx` splits only where behaviour differs; two readiness/contract keys `rn-ios`, `rn-android`; a shared file counts for both only if its tests run under both `Platform.OS` values. D2's "emitted twice" is true for tokens (Ada), not components (authored, not emitted). R1 text should say: "two keys; tokens emitted twice; components one shared source, split by OS only where behaviour differs."
> `rendering:` gets two entries, `rn-ios` and `rn-android`, not one `rn` ("native" = different host views per OS: RN `Switch` is a UISwitch on iOS, a Material switch on Android). A generated React web wrapper inherits the `web` entry; an authored React component needs a `react` entry, though on the web `native` is close to meaningless (Sparky, True Native ballot L574).
>
> ## (e) Sites 3, 5 and 6 — I own all three
> Site 3 (034 outline L56): leave the historical line; append a dated 128 amendment (code shared where toolchains share a language — `types.ts` imported by React and RN; Swift/Kotlin mirror it); the outline is a record, don't rewrite. Site 5 (`platform-implementation-guidelines.md`): add React (binding) and React Native sections under "Platform-Specific Implementation Patterns" (L650) — the generated/authored rule, the `props.ts` guardrail, the SSR minimum, the Provider + `useTheme()` idiom, the two-key evidence rule; add RTL/RNTL with the unit vs assistive-tech evidence split to Validation Phase 3; add one prohibited category: choosing the OS by runtime branch where behaviour differs. Site 6 (decision framework): add a "Code-sharing and bindings" section — types and pure logic may be shared; the rendering and accessibility layer never is (the floor); a binding is generated or authored by the F-6 rule; an RN component splits by OS when behaviour differs; styling-only differences go through theme tokens. Site 4 `technology-stack.md` (per-platform sections L42–55): I'd take it if assigned; not claiming it.
>
> ## (f) Where Spec 130 § 7.3 / P-8 belongs in 128
> Neither the registry (per platform) nor the proof-consumer rule (platform tiers) fits a per-component, per-role constraint. It belongs in 128's OUTLINE as a dependency with a named retirement event (130's P-8 (c) from 128's side): 128's binding list includes no switch or toggle until Input-Switch-Base merges — walkable. When step 6 is specced it becomes a CHECK in the binding generator: no binding export maps to a switch role unless an indexed component declares it. Thurgood's seat (ballot § 4); agreed.
>
> ## (g) Surviving counter from the component seat
> The ballot carries the registry (D3) but not the CONTRACT-VERSION PIN and staleness rule (inbound § 5 "Contracts stay one", my R4). F-1 (c) (caps claims) and F-3 (c) (validates copies) both depend on that pin, and it exists nowhere in the code: `version` is parsed and never compared. Two of Thurgood's three recommendations rest on a mechanism nobody is committed to build; with the shadowing behaviour in (b), copy-and-own today fails SILENTLY. Add it as a carried D5: contract-version pin plus staleness marking (cost: a field in the platform manifest + one comparison in step 2/4), or take the "visible drift" claim out of F-3. What survives D5: six keys still mean every contract change is a six-way re-verification; D5 makes that visible, not smaller. Second: with the element-API cleanup at 17.0.0, step 6 (generated wrappers) must be sequenced after it — not recorded in § 4.

#### [SPARKY R1] — 2026-10-20 — read-only, on R0 (`0f291b6f3`), R1 reviewer; VERBATIM (as saved by the orchestrator)

> # Sparky: read-only consult on the Spec 128 identity ballot DRAFT (R0) — VERBATIM (2026-10-20)
>
> Labels: [verified] checked in the repo today; [reasoning] follows from DOM/React behaviour I'm confident of; [unverified] platform knowledge that may be out of date.
> Correction to my own R2 fact (inbound § 2 "Web CSS portability") [verified]: "zero `:host` rules" is true of `ButtonCTA.web.css` only; 20 of 29 web CSS files have `:host` rules (Progress-Indicator-Node-Base has 8; NavTabBar also uses `::slotted`). The CSS still ports, but an authored React component needs a small `:host` → root-class rewrite.
>
> ## (a) F-6: React web, generated or hand-written
> The repo finding that changes the drafted criterion [verified]: SSR is not a property of individual components here. All 34 web modules declare `class … extends HTMLElement` and call `customElements.define` at module scope; only `ButtonVerticalListSet.web.ts` has any `typeof` guard; every one renders nothing on the server until it upgrades. So SSR import-safety is vertical-wide. The ballot's "SSR-critical" prong would pick none or all of the 34; it can't sort them. Fix SSR once in the generator (`'use client'`, guarded or lazy define, server-safe fallback markup, no layout reads at render), or don't. Whether it MUST be fixed is inbound § 10 Q2, unanswered.
> The deciding rule as I'd write it: A component is `react: authored` iff it meets (F) or (R); otherwise `react: generated`. (F) Form participation — it owns a user-editable value that must (i) submit or reset with an ancestor `<form>` or take part in constraint validation, or (ii) round-trip as a React-controlled TEXT value on every keystroke where caret, IME or composition is at stake; controlled SELECTION state (booleans, chosen values) does not qualify. (R) Cross-root ARIA reference — its accessible name, description or error must reference, or be referenced by, DOM the adopter supplies outside the component (`<label for>`, `aria-labelledby`, `aria-describedby`, `aria-controls`); ID references cannot cross a shadow root. SSR is not a per-component criterion — decided once for the vertical, after Q2. Tie-break: a borderline component stays `generated` until a failing RTL or integration test shows the rule applies; promotion needs evidence, so the list cannot grow by argument.
> Classification today: Authored (8): Input-Text-Base, -Email, -Password, -PhoneNumber, Input-Checkbox-Base, Input-Checkbox-Legal, Input-Radio-Base, Input-Radio-Set (Spec 130's Input-Switch-Base would land here). Generated (26): Avatar-Base; Badge-Count-Base/-Notification; Badge-Label-Base; Button-CTA/-Icon/-VerticalList-Item/-VerticalList-Set; Chip-Base/-Filter/-Input; Container-Base/-Card-Base; Icon-Base; Nav-Header-App/-Base/-Page; Nav-SegmentedChoice-Base; Nav-TabBar-Base; the 7 Progress-*. Borderline, generated by the tie-break: Button-VerticalList-Set (`select`/`multiSelect` hold a selection value — (F)(i) moves it if submitted with a form); Chip-Filter; Nav-SegmentedChoice-Base.
> What a generated wrapper over a Shadow-DOM element cannot do for React: 1. SSR/hydration — empty host on the server; content and accessible names only after JS; layout shift, empty no-JS a11y tree; Declarative Shadow DOM could fix it (elements render from template strings) — [unverified] whether React 19 renders `<template shadowrootmode>` cleanly/hydrates without mismatch; needs a spike. 2. Refs — `ref.current` is the host; only ButtonVerticalListItem, ButtonVerticalListSet, InputRadioSet use `delegatesFocus` [verified]; on every text input and checkbox `ref.current.focus()` does nothing ("focus the first invalid field" is a core React forms pattern). 3. Synthetic events — native `change`/`select` are not composed, never leave the shadow root; React sees only the composed CustomEvents with the value in `event.detail`; [unverified] how React 19 binds `onChange`/`onFocus` on a custom element. 4. Controlled inputs — the `value` attribute path preserves focus [verified], but changing `error-message` or `is-success` falls through to a full `render()` rebuilding the shadow DOM with `innerHTML` [verified] — with live validation, focus and caret are lost while typing; an element defect a wrapper can't fix. 5. Form participation via ElementInternals — only Input-Radio-Base is `formAssociated` [verified]; DP text inputs and checkboxes don't contribute to `FormData` in a plain web `<form>` either — a web defect independent of React; route to Lina. Input-Text-Email/-Password/-PhoneNumber nest `<input-text-base>` inside their own shadow root [verified for Email] — form association and labelling cross two boundaries.
> Element API defects — is the 17.0.0 cleanup a prerequisite for ANY wrapper? For generated wrappers: yes. For authored: no. [verified] defects: `focus`/`blur` CustomEvents in the four Input-Text files and ButtonVerticalListItem (942/957); `selection-change` in NavTabBar and NavSegmentedChoice but `selectionchange` in ChipFilter; a parallel `onChange` property plus a `change` event on inputs/checkboxes; `variant` in `types.ts` but `buttonVariant` on ButtonCTA. [reasoning] native focus is already composed → host listeners fire twice, ancestors see a bubbling focus native never produces. The generator maps `types.ts` mechanically; every mismatch becomes a hand-kept exception table — the maintenance a generator exists to remove. Even under the hybrid, 5 generated components carry defects (ButtonVerticalListItem, NavTabBar, NavSegmentedChoice, ChipFilter, ButtonCTA). Authored React doesn't touch the element → not a code prerequisite there, still a contract-parity concern (§ 6 "one contract, two expressions"). Counter: a wrapper could ship before 17.0.0 with an alias table, making the later element break non-breaking for React — accept only with an expiry pinned to 17.0.0. The cleanup is owed to plain web consumers regardless.
> My pick: rule the class option now — the `react: generated | authored` field plus the criterion above, with "SSR-critical" removed; carry the list of authored components to the outline round, after Q2 and the element cleanup is scoped. Working my counter against my own R2 residual changed my position: most reasons for authoring the 8 form components are element defects every web consumer also has (form association, `innerHTML` re-render, `delegatesFocus`, event names); once fixed in the element, the intrinsic Shadow-DOM gaps are SSR (vertical-wide) and cross-root ID references; (R) is narrower than it looks (contracts already pass label/helper/error as props rendered inside the shadow root). That exposes a FORK, Peter's: (c-eager) author the 8 form components from the start — robust React forms day one; permanent double maintenance on the most complex components. (c-gated) fix the elements in 17.0.0 (ElementInternals on all 8, no `innerHTML` re-render on state attributes, `delegatesFocus`), generate all 34, promote to authored only on a failing test — one implementation, web gets fixed too; React forms wait on 17.0.0; the cross-root reference gap stays open ([unverified] ARIA reference-target support). I lean (c-gated); it's also the simpler option, so check my bias.
> Surviving counter: if Q2 says SSR is a hard requirement (Next.js App Router), every generated wrapper renders client-only; the hybrid collapses toward (b) hand-written React for all 34, or an unproven DSD path. Q2 decides F-6 more than any criterion; ruling the authored list before Q2 risks ruling the wrong option.
>
> ## (b) F-3 from the web seat
> Copy-and-own of a generated wrapper makes almost no sense (~30 lines of glue; the substance is the element — hundreds of lines of Shadow-DOM TS + CSS; copying the element = owning a Web Component, what a shadcn-style team doesn't want; their draw is plain JSX and CSS they edit). What a team realistically copies is an AUTHORED React component (`.tsx`, its CSS — token custom properties stay, `data-theme` still reaches it — and `types.ts`). Natural split: generated = installed (keeps the contract-version pin + upgrade path, removing Lina's R4 concern for those 26); authored = copyable (carries F-3 (c)'s `implements:`). Unstated coupling: F-3 and F-6 are linked; if Peter wants copy-and-own for primitives like Button (shadcn's most-copied), F-3 (b)/(c) pulls Button-CTA etc. into `authored` for front-door reasons, not technical ones — rule them together, or have the F-6 criterion state "copyable front-door component" is NOT a reason to author.
>
> ## (c) D1 and the floor
> I agree with D1 (shares DOM, CSS custom properties, `data-theme`, ARIA; a typed `tokens.ts` export is a format, not a platform, if from the same resolved model with matching numbers). What would make React a separate platform: its own emitter or theme idiom (diverging values/units; theming via Provider or runtime CSS-in-JS instead of `data-theme` — inbound § 6 rules out runtime CSS-in-JS; keep that line, it holds D1 true). Its own readiness row does NOT make it a platform, but the draft is ambiguous: inbound § 6 gives `react` its own contract key/readiness column (right: RTL evidence ≠ the element's), D3's registry would list it next to web/iOS/Android and someone will count "six platforms". Class option: registry rows typed `kind: platform | binding`, a binding declaring `over: web`; a binding has a readiness column but no emitter and no theme path. Cost: one field. The floor: synthetic events don't violate it [reasoning] (React delegates native DOM events at the root; the a11y tree is DOM+ARIA; `onChange`-on-every-input differs semantically from native `change` but isn't a stack violation). Portals don't violate it in themselves but are where it breaks in practice: a portaled dialog/popover sits elsewhere in the DOM — focus order and the a11y tree follow the DOM — an APG dialog needs focus management, `aria-modal`, inerting (an implementation failure, not a license problem); a portaled tooltip referencing a trigger inside a wrapped element's shadow root breaks the ID reference — criterion (R) again.
>
> ## (d) Surviving counter against the ballot as drafted
> 1. F-6's class option can't be applied as written: "SSR-critical" isn't a per-component property here; the (a)-vs-(c) costs read as though (c) avoids "SSR breaks" and it doesn't; ruling F-6 before Q2 risks the wrong option — rule only the field and criterion now (no SSR prong), or carry F-6 to the outline round. 2. F-6 (a)'s cost line charges the element-defect cleanup to the wrappers; most of it is owed to plain web consumers whatever F-6 decides; charging it to React makes the hybrid look cheaper than (c-gated). 3. F-3 and F-6 are coupled, and D1 conflicts with § 6's readiness column unless the registry separates bindings from platforms — neither named. 4. Residual: even with (c-gated), the cross-root ID-reference limit is a real Shadow-DOM ceiling for adopter-composed accessibility; whether the platform has closed it I can't confirm; if not, some adopter forms need authored React regardless. Incidental for Lina: DP text inputs and checkboxes don't submit with a native `<form>` today; changing `error-message`/`is-success` on Input-Text-Base rebuilds the shadow DOM — web defects independent of React.

#### [KENYA R1] — 2026-10-20 — read-only, on R0 (`0f291b6f3`), R1 reviewer; VERBATIM (as saved by the orchestrator)

> # KENYA — read-only consult on the Spec 128 identity ballot DRAFT (R0) — VERBATIM (2026-10-20)
>
> Branch `chore/128-identity-ballot-draft` at 0f291b6f3. Edited nothing, committed nothing, no call denied. Read: the ballot; the inbound; `.kiro/specs/070-agent-architecture/alignment-record.md`; `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`; `.kiro/issues/2026-10-03-ios-theme-environment-key-missing-backslash.md`; `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` (I1); `governance/DesignerPunk-Integration-Guide.md` L23 and L164–174. Status labels: VERIFIED = I read the line; REPORTED = a seat's claim; UNCERTAIN = may be past my training data, check current RN/Apple docs.
>
> ## (a) F-5: Working Class as the proof case, and iOS-first
> My R1 question is answered, and I accept the answer. The ratified floor admits React Native, so 070's "No React Native or cross-platform runtime" (alignment-record § True Native Commitment) is a product preference, not law. Ballot § 2 F-5 "What is already decided" is correct.
> My pick: (c) plus the class option, and iOS-first holds. But it needs two narrowings before it is written into the record.
> 1. Narrow "iOS first" to the SwiftUI Working Class vertical, not the iOS OS. Once `rn-ios` exists, "iOS first" is ambiguous. 070 § Platform Priority gives four reasons (richest native demo; simpler layout model; "validates iOS implementations that have never run in a real app context"; most compelling demo) — all about the SwiftUI vertical. The amendment to site 2 should say so.
> 2. What iOS-first is FOR today: Working Class shipping: yes (the forcing function; harness charter § 6: "the first product spec forces most of this infrastructure anyway"). VoiceOver as the assistive-tech oracle: yes, for both iOS columns. SwiftUI idiom as the reference: NO — our SwiftUI output is not a reference for `rn-ios`: it does not type-check as shipped (nine files read `@Environment(.dpTheme)` without the key-path backslash — VERIFIED in the backslash record); `ContainerCardBase.ios.swift` does not parse (unterminated comment L816–962 — VERIFIED; Integration Guide L164); its checkbox carries probable role drift (I1, `.isButton` L306). The reference for both iOS columns is the platform's documented trait pattern (True Native § 1.2), not our implementation. A reason 070 does not give: Xcode is confirmed available to the iOS seat; whether an Android SDK is reachable anywhere is an open charter question (§ 2(c)) — iOS is the cheapest place to build the first harness host module. That reason survives React Native.
> Fold-back on the class option: a harness host module could be passed off as a "consumer", emptying the rule. The registry field should separate `harness` (it compiles) from `consumer` (a real product exercising components with assistive-tech evidence). Only `consumer` satisfies the rule.
> Surviving counter: iOS-first plus a native Working Class means the first proof lands on the vertical with the smallest adopter audience and the largest repair debt; the cheapest adoption evidence (RN tokens, inbound § 5 step 5) sits behind it. Working Class has no start date, so the class option ties iOS's production tier to an undated product.
> Fork to surface, not pick: inbound § 10 Q1 is unanswered. If the first real consumer is Peter's new organization and it ships React Native, the first proof consumer should be React Native, and SwiftUI-first drops to second. That pick is Peter's.
>
> ## (b) D2: one React Native target emitted twice
> "One target" is honest for emission and for the adopter (Metro picks the file). It is not honest for readiness or tier, and D2 as written does not say so. Inbound § 6 already keys readiness as `react, rn-ios, rn-android` and requires shared files tested under both `Platform.OS` values. D2 should state outright that each RN key has its own readiness column and can sit at a different tier. `rn-ios` needs its own column (implicit via § 6; make it explicit in D2).
> What a shared emission must get right on iOS vs SwiftUI: Safe areas (SwiftUI respects by default; RN needs a safe-area context library; core `SafeAreaView` status UNCERTAIN). Dynamic Type (SwiftUI per-style curve vs RN `allowFontScaling` single multiplier capped by `maxFontSizeMultiplier` — typography emission needs a recorded decision; I have not verified whether our SwiftUI uses `@ScaledMetric`/`relativeTo:`). VoiceOver: `accessibilityRole`/`accessibilityState` map onto UIAccessibility traits through RN's table; tri-state checkbox `checked: 'mixed'` announcement UNCERTAIN; iOS-only props are part of the contract (`accessibilityViewIsModal`, `accessibilityElementsHidden`, `onAccessibilityEscape`, `accessibilityIgnoresInvertColors`); grouping differs (`.accessibilityElement(children: .combine)` vs `accessible` containers). Haptics: SwiftUI `.sensoryFeedback`/UIImpactFeedbackGenerator vs core RN `Vibration` only → native module; inbound Q7 (Expo or bare) decides which. Reduce Motion/Increase Contrast: `@Environment(\.accessibilityReduceMotion)` vs `AccessibilityInfo` + listener; contrast variants need `DynamicColorIOS`. Color gamut: we emit OKLCH; RN color strings probably need sRGB conversion, losing P3 (RN OKLCH/P3 support UNCERTAIN). Shadows and font family names: inbound § 3.
> The point D2 hides: Jest with `Platform.OS = 'ios'` proves declared props, not what VoiceOver says (inbound § 6). `rn-ios` assistive-tech evidence needs a simulator or device — the same Xcode-host harness the SwiftUI vertical lacks. Data's R1 "RN hides the Compose gap more than it fixes it" applies equally to iOS.
> Surviving counter to a separate column: six columns make every contract change a six-way re-verification (inbound § 8); splitting RN keys adds work on one OS with one VoiceOver oracle. Real cost, but merging would let Android evidence turn `rn-ios` green, which is worse.
>
> ## (c) D4: iOS and Android become `experimental`
> Right call. If anything, generous. The shipped Integration Guide already tells adopters iOS is "not supported ... reference source, not a build input", and the tree neither parses nor type-checks. "Experimental" reads as "usable at your own risk", more than iOS can back today. Not a fourth tier: use F-1 (c)'s evidence-tier field, e.g. `experimental` with evidence tier `unbuilt` or `source-only`, so law and the published guide say the same thing. D4 writes the guide's admission into law; the "retreat" reading (inbound § 8 counter 3) is answered by the record already saying this publicly.
> What moves iOS to `production`: not the harness alone. 1. A harness that is GREEN on the iOS tree (generated tokens + component sources), not one that merely exists — D4's exit "until the harness exists" should be "harness green on the iOS tree". 2. A proof consumer, per F-5's class option — as drafted, D4 (lifted by harness) and F-5's class option (lifted by a consumer) DISAGREE; reconcile. 3. Assistive-tech evidence per component for any contract with a `wcag:` line, kept separate from the platform tier.
> Surviving counter / fork for Peter: inbound § 10 Q5 (is device-level assistive-tech testing in scope for anyone?) is unanswered. If no, item 3 makes `production` unreachable for every platform, web included; the alternative bar (compiles, unit tests, named consumer) is reachable but claims less.
>
> ## (d) Who owns 070's "iOS first" line
> No named owner found (participants "Peter, Thurgood"; no Working Class product owner on record). The decision is Peter's (his product). Amendment text: Thurgood authored 070; Leonardo consulted (cross-platform priority is his). Site 2 should also reconcile 070's internal tension: § Context calls Working Class "a civic engagement iOS app"; § True Native Commitment says three native apps — fix both lines, not only L27–28.
>
> ## (e) Surviving counter against the ballot as drafted
> 1. D4's wording over-claims and its exit condition is wrong ("experimental" > the published "not supported"; "until the harness exists" disagrees with F-5's class option) — wording fixes. 2. D2 hides that `rn-ios` inherits the iOS harness gap — state per-key tier/readiness + the shared assistive-tech toolchain dependency. 3. "iOS first" is undefined once `rn-ios` exists — narrow to the SwiftUI vertical or site 2 gets argued twice. 4. Thurgood's four-metadata-axes residual is concrete on iOS: two readiness rows with one oracle, on top of `rendering:`, evidence tier and proof consumer. Residual on my own position: an evidence-tier value adds another field and may read worse to native-first architects than plain "experimental"; matching the published guide outweighs it.

#### [DATA R1] — 2026-10-20 — read-only, on R0 (`0f291b6f3`), R1 reviewer; VERBATIM (as saved by the orchestrator)

> # Data: read-only consult on the Spec 128 identity ballot DRAFT (R0) — VERBATIM (2026-10-20)
>
> Facts I verified that change the picture: Android "production-ready" has never been executed — two components claim it (Button-VerticalList-Item, Button-VerticalList-Set); their evidence is `createComposeRule` UI tests in `*Test.kt`; nothing in `.github/workflows` runs gradle or kotlinc, and this machine has no JDK (`/usr/bin/java` is the macOS stub), no Android SDK, no gradle, no kotlinc — the Android production claim is self-reported. Charter interim (c) is now answered: no Android toolchain is reachable here (no prior record of that answer). Android components use three packages (`com.designerpunk.components.core` ×32, `.button` ×6, `.avatar` ×3; 38 imports from `androidx.compose.material3`). No Android minimum version exists (`minSdkVersion` 24 only as a build-config default in `ConfigHelpers.ts`, checked ≥21 in `BuildOrchestrator.ts:616`; Core Goals says "Not yet constrained"; inbound § 10 Q8 unanswered).
>
> ## (a) F-5
> Does iOS-first cost Android anything real? Yes, two bounded costs. 1. Parity lag gets longer and Android's harness slips with it: charter § 3 trigger 1 + § 6's deflation means the Android host module arrives when Working Class Android kicks off — second in line; Android is already 32/34 scaffold with no tests that run. 2. Accessibility behavior gets interpreted VoiceOver-first (traits, rotor, label phrasing, grouping); TalkBack differs (`Role`, `stateDescription`, `mergeDescendants`; traversal order and custom actions; live regions). Mitigation is cheap: contract text stays platform-neutral; the Android oracle is the Compose semantics tree on its own terms (the True Native floor supports that). No evidence to overturn iOS-first; I ask that Android's harness evaluation be DECOUPLED from Working Class's Android kickoff (today it rides 129's first task — fine as long as it doesn't reattach to iOS-first sequencing).
> My pick: (c), a separate RN proof consumer, not an RN build of Working Class — "RN hides the Compose gap more than it fixes it"; two Android builds of one product stop the proof discriminating and the convenient path (RN, Jest-verifiable) starves Compose. Fold-back on the class option: a NAME is not evidence (Working Class Android is named, not built) — the registry field should require a consumer with a PASSING BUILD (the harness command), not just a name. Surviving counter: an RN Working Class would give the best parity oracle (Leonardo's same screen spec in Compose and RN-android side by side); a second consumer doesn't exist, so RN can sit experimental indefinitely. Fork to surface: Working Class's screen specs as a FIXTURE the RN proof consumer also renders — keeps the comparison without a dual-runtime product; costs spec reuse across products; Leonardo owns that question.
>
> ## (b) D2
> What a shared RN emission must carry for `rn-android`: edge-to-edge/insets (Android 15+ enforces at targetSdk 35; gesture vs 3-button nav; system-bar contrast; keyboard `windowSoftInputMode` vs `KeyboardAvoidingView`; Nav-Header/Nav-TabBar safe-area contracts need Android inset semantics); TalkBack via RN props that exist on one OS only (Android: `accessibilityLiveRegion`, `importantForAccessibility`, `accessibilityLabelledBy`; iOS: `accessibilityViewIsModal`, `accessibilityElementsHidden`) — e.g. Badge-Count-Notification's live region = `accessibilityLiveRegion="polite"` on rn-android, an announce call on rn-ios; a shared file carries both or splits. Font scale (Compose `sp`; RN plain numbers × font scale under `allowFontScaling`/`maxFontSizeMultiplier`; Android 14 nonlinear up to 200%; RN `lineHeight` can clip — verify RN's nonlinear support). Predictive back (`BackHandler`/OnBackInvoked emission for Nav-Header-Page — verify RN's support). Ripple (RN has none: `android_ripple` vs the token pressed-state blend is a per-component `rendering:` choice, recorded for rn-android). Elevation vs shadow (`boxShadow` only on the new architecture, inbound Q7); 48dp touch targets vs `hitSlop`; per-OS font family names.
> Is "one target" honest? At the adopter's install/API layer yes; at the evidence layer no. Inbound § 6 keys contracts and readiness as `rn-ios`/`rn-android`; D2's wording should say each emitted key has its own readiness column AND its own tier — rn-android must be able to sit at experimental while rn-ios moves up. Mocking `Platform.OS` in RNTL is `unit` evidence and exercises no TalkBack behavior.
> Kotlin constants: step 2 retires the closed union `PlatformValues {web, ios, android}` (`PrimitiveToken.ts:64`) — my ask: a before/after GOLDEN DIFF on the Kotlin output (DesignTokens, ComponentTokens, ProductTokens `.android.kt`, theme types); until the harness exists that diff is the only guard on Kotlin. Package `com.designerpunk.tokens` unchanged. `rn-android` must be a SIBLING emitter reading the resolved model, never a derivative of the `android` key (Compose units `sp`, `percent`, `Color(0x…)`, shape would leak). Cheap cross-check: a conformance fixture asserting rn-android numbers equal android numbers where units are comparable.
>
> ## (c) D4
> Right call, and more honest than the draft says: the two Android production claims rest on tests nothing has ever run. The ballot should STATE the consequence: under F-1 (c) an experimental platform cannot show `production`, so those two components' Android readiness display drops too.
> Minimum Android harness: 1. Compile — a host Gradle Android-library module (pinned compileSdk, Kotlin + Compose compiler plugin, pinned Compose BOM) holding the generated token files and the 41 component `.kt` files, `./gradlew :host:compileDebugKotlin` (covers charter § 1's failure class). 2. Semantics tests, one per drawn control — the existing `createComposeRule` tests on the JVM via Robolectric (`testDebugUnitTest`), no emulator: role, contentDescription/stateDescription, toggleable state, merged semantics, `assertTouchHeightIsAtLeast` vs the tap-area token. 3. Not in the minimum: emulator `connectedAndroidTest` / on-device TalkBack (= `assistive-tech` evidence, inbound Q5).
> Would the harness alone move Android to production? No — the instrument, not the evidence. Production also needs per-component evidence (32/34 scaffold, `hasTests: false`), a proof consumer with a passing build, and a DECLARED Android minimum version ("platform-correct" is undefined without one: predictive back and edge-to-edge depend on API level). Robolectric semantics tests are `unit` evidence; step 7's "readiness never reviewed on `unit` alone" should bind Android too. Q8 + Core Goals L27–28 sit on site 1 — not a seventh fork, but they gate any Android production criterion.
> What blocks evaluating the harness today: 1. Toolchain — none reachable locally (interim (c) answered); the realistic host is CI (I believe GitHub ubuntu runners ship a JDK and Android SDK — verify); a new required check is gate territory under 125-A → governance path. 2. No minimum version for the host module's minSdk (Q8). 3. Write scope — mine is specs/docs/issues; designing is fine, authoring the workflow and host module needs a tasks-row grant. 4. No tally of charter § 5's evidence criterion ("Android not re-verified" lines in claims-pass Method sections). 5. Sequencing — parked on 129's first task (129 outline L16, L47), right home provided it doesn't slip behind iOS-first.
>
> ## (d) D3: what an Android registry row must carry
> Identity: key `android`; OS `android` (so OS-grouped queries pair it with `rn-android` without inheriting fields); render + accessibility stack (Jetpack Compose semantics / TalkBack). Tier fields: tier, evidence tier, proof consumer WITH its build command. Outputs, one entry per artifact (path, suffix `.android.kt`, package, top-level symbol): `DesignTokens` (`com.designerpunk.tokens`, object `DesignTokens`); `ComponentTokens`; `ProductTokens` (`com.designerpunk.product.tokens`, `Product{Category}` objects); blend utilities; theme types (`{Name}Theme`, `{Name}Themes`, `Local{Abbr}Theme`, uppercase-abbreviation rule). Emitter rules: unit mapping (dp, sp, unitless, percent, Color literal), identifier case transform, Kotlin keyword escaping list, static vs theme-varying split (Composable getter), theme idiom (CompositionLocal). Component source + test globs; ONE component package convention (settle the three-package drift). Verification: harness compile + test commands and the evidence kinds each produces. Platform lint rules: the `.dp` token-compliance pattern (`/[1-9]\d*\.dp\b/`) belongs with the row. Versions (minSdk, compileSdk, targetSdk, Kotlin, Compose BOM, material3 dependency): the row POINTS TO the harness host module as single source (counter: a second lookup; a pointing-only registry can't render readiness pages alone). Also: Product MCP `ProductTokenIndexer.ts:13` and `ComponentIndexer.ts:772` must read the registry, or the row is decoration.
>
> ## (e) Surviving counter from the Android seat
> D4, F-5 (c), iOS-first and D2 compound against Compose: Android drops to experimental; its proof consumer is second in line; its harness rides a 129 task; meanwhile `rn-android` arrives as a second Android column whose `unit` evidence (RNTL in Jest) runs in today's CI while Kotlin tests run nowhere. Under F-1 (c) the registry could show rn-android greener than android purely because its instruments are cheaper — "RN hides the Compose gap" turned into a mechanism. Folded in: the ballot/outline should state (i) no rn-* column may be claimed above `experimental` on `unit` evidence alone, (ii) Android harness evaluation is its own trigger, not tied to Working Class sequencing. Residual: the instrument-cost gap is structural (JDK + SDK + CI minutes + gate governance vs nothing new for Jest); labeling makes it visible, not gone. Fork for Peter: (A) accept the asymmetry, labeled — tiers move independently with evidence kind shown; (B) cap rn-android's tier at android's — coherent Android story, but RN pays for Compose's debt, against the adoption premise. Unverified: RN predictive-back status; RN nonlinear font scaling; whether hosted GitHub runners ship the Android SDK and JDK.

---

## 8. Consult ledger

- **R0** (Thurgood, 2026-10-20, `0f291b6f3`): drafted from the inbound, the charter, the STUB outline, Core Goals, the True Native ballot, the priorities record and Spec 130 § 7.3. No seat was consulted. The 2026-10-02 sitting's ledger is in inbound § 12.
- **R1 reads**: read-only, on R0, 2026-10-20, run in parallel by the orchestrator. The verbatim text is in § 7.

| Seat | One-line read |
|---|---|
| Stacy (required) | F-1 (c) with three conditions, and it does not relieve velocity. D1–D4 need ruling lines. D4 is its own fork and upgrades the claim. Re-sign: keep tier assignments out of the unit, name all four files, edit twice. Seven would-be findings. |
| Leonardo (required) | F-3 is unscoped by platform and collides with F-6 on React web: install-first, copy as the eject path. The catalog gap. F-4: site 1a decides what adopters meet. F-5: a proof-consumer definition and candidate 1. F-2: accessibility floors block. D1 holds, with a React review column. |
| Ada | F-2: honesty vs membership; (c′) tightening; 102-red instrument; L35 changes under (c). D3 has no cost row, an open design and a Model B migration. D2: two keys, one formatter, per-OS fonts. Theme corrections to § 4. |
| Lina | F-6: contract-derived rule, no `react:` field, SSR is vertical-wide. F-3: indexer shadowing makes drift silent. D5 pin. Sites 3, 5 and 6 planned. P-8 belongs in 128's outline. Wrappers come after 17.0.0. |
| Sparky | F-6: SSR not per component (verified), (F)/(R) rule, 8/26, c-eager vs c-gated, Q2 decides. F-3: generated = installed, authored = copyable. D1: `kind: platform | binding`. `:host` erratum. |
| Kenya | F-5: (c), narrow iOS-first to SwiftUI, `harness` vs `consumer`. D2: per-key column and tier. D4 generous: use the evidence tier; the exit must be "harness green", reconciled with F-5. Q5 decides the bar. |
| Data | Android production never executed; no toolchain locally. F-5: (c), a consumer with a passing build, decouple the Android harness. D2: rn-android is a sibling emitter, Kotlin golden diff. Minimum harness. F-8 asymmetry fork. |

**Parallel and blind.** The R1 reads were run in parallel, so no seat read another's position. The cross-read is this fold. Before Peter rules, a short cross-read round on F-6's deciding rule (Lina and Sparky) and on F-5's candidate 1 (Leonardo, Kenya, Data) would test the collisions named in [THURGOOD R1].
