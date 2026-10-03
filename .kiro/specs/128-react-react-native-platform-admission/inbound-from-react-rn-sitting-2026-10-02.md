# Inbound from the React + React Native Sitting — for Spec 128

**Date**: 2026-10-03 (sitting held 2026-10-02, main-loop session, Peter + Claude orchestrator + seven agent seats)
**Source**: Peter's direction statements in session, seven seat consults (two rounds plus two cross-reads), and the orchestrator's synthesis. Assessments recorded here with Peter's direction to capture them.
**Status**: VISION INPUT at design-outline grain — NOT a settled outline. An orchestration record for Thurgood to formalize through the full pipeline (outline → feedback → requirements → design → tasks). Nothing here is ratified; the identity questions in § 8 are Peter's and are open.
**Gate**: do not formalize before the v15.0.0 tag is cut and the completion-criteria-parity required-flip has merged (ballot 70f8fe54). Discussion and outline drafting are permitted before the gate; nothing lands.

---

## 1. The direction, in Peter's words (provenance preserved)

1. **The question that opened the sitting**: what makes DesignerPunk more than "another design system with some agents and a couple MCPs." Eight seats answered independently and converged: the differentiator is that the system's judgment, rules, and self-knowledge are stored as data machines can read, check, and fail on; and the system writes down what does not work yet. That answer is the premise the rest of this inbound protects.
2. **The proposal**: "A fourth platform target, React AND React Native as build-time platforms."
3. **The direction** (verbatim, lightly trimmed): "I'm imagining widening the scope of what DesignerPunk can cover. So much of the industry is on the React + React Native train, and that's something I just have to accept if I'm interested in people adopting this thing. So I'm thinking of expanding to create similar verticals for React and React Native as we do iOS, Android, and Web. An adopter should be able to create and leverage tokens and components of their own shape."
4. **The correction**: "I think you're discounting the value of the tokens." Accepted. The orchestrator had costed verticals as 34 components each; tokens are the vertical that matters for adoption, they are cheap to emit, and they are where DesignerPunk is actually different.
5. **The split idea**: "What if we split the project: DesignerPunk Native and DesignerPunk React?" Considered as proposal P5 below; the four owning seats declined it and Peter asked for this record.

**What the direction settles**: adoption is the goal; React and React Native are in scope as platforms; adopter-authored tokens and components are the product shape. **What it does not settle**: the identity forks in § 8.

---

## 2. Verified repo facts the formalization starts from (2026-10-02)

| Surface | Fact | Verified by |
|---|---|---|
| Platform type | `TargetPlatform = 'web' \| 'ios' \| 'android'` in `src/types/TranslationOutput.ts` and `src/integration/BuildSystemInterface.ts` | orchestrator |
| Hard-coded three-platform lists | ~17 non-test source files, 73 test files, `application-mcp-server/src/indexer/ComponentIndexer.ts:772`, Product MCP `ProductTokenIndexer.ts:13` | orchestrator, Lina, Thurgood, Leonardo |
| Per-platform token values | Stored on every primitive as `platforms: PlatformValues` with closed keys `{web, ios, android}` (`src/types/PrimitiveToken.ts:64`), built by 26 token files; `TokenFileGenerator.ts` (~2,075 lines) has ~57 platform-literal branches | Ada |
| Contract platform lists | 234 `platforms:` lists across `contracts.yaml` files, every one `[web, ios, android]`; syntax is open | Lina |
| Shared interface | `types.ts` per component is types-only, no DOM coupling, JSX-shaped examples with `onPress`; importable directly by React and React Native, mirrorable only by Swift/Kotlin | orchestrator, Lina |
| Web CSS portability | `ButtonCTA.web.css` has zero `:host`, `::slotted`, `::part` rules; plain class CSS injected via `<style>`; reusable by a React component as-is | Sparky |
| React consumption today | Primitive props work; breaks on SSR (classes extend HTMLElement at module scope, `connectedCallback` reads `document`/`getComputedStyle`), controlled inputs (only InputRadioBase is `formAssociated`; values in `event.detail`), React 18 object props, custom-event binding | Sparky, Leonardo |
| Web element API defects | `focus`/`blur` dispatched as CustomEvents (collide with native names); `selection-change` vs `selectionchange`; parallel `onChange` property + `change` event; `variant` in types vs `buttonVariant` on the element | Sparky |
| DTCG export | `dist/DesignTokens.dtcg.json` exists, px/rem units, light/dark in `$extensions.modes`, NOT in package `exports`, untyped, no per-theme values — does not serve a React consumer | Ada |
| Native readiness | 2 of 34 components production-ready on iOS and Android; 4 native test files; nothing compiles Swift or Kotlin in CI; build-verification harness chartered not built (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`); native onboarding unsupported in 15.0.0 | Lina, Kenya, Data |
| Theme emission | Registered custom themes not emitted on any platform in 15.0.0 (`.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`, ballot `2026-10-02-integration-guide-native-scoping.md`) | Ada, Sparky |
| Governance status of "no React Native" | No ballot, register row, or steering doc bans React Native. The line lives only in `.kiro/specs/070-agent-architecture/alignment-record.md` § True Native Commitment (Working Class = three native apps). Spec 034 outline: "NOT code-sharing (React/React Native), but conceptual consistency." Core Goals Layer 1: "Build-time platform separation (web/iOS/Android) rather than runtime detection." | Thurgood |
| One-package assumptions | Specs 118, 123, 125 all assume one package (`@3fn/core`, no workspaces, 15 export paths, one bin) in one repo | Thurgood |
| Provenance fields | Experience patterns and layout templates already carry `source: 'system' \| 'project'`; components do not | Leonardo |
| History | `preserved-knowledge/true-native-architecture-concepts.md` says v1 began with "a React-based approach for web platform" and moved off it; no reason recorded. Recover before bringing React back. | Thurgood, orchestrator |

---

## 3. The classification the seats converged on

- **React web is a framework binding over the existing web platform, not a platform.** Same CSS custom properties, same contracts, same tokens. Calling it a platform is a category error (Lina). It needs a spec and doc updates, not a ballot (Thurgood).
- **React Native is a genuine new render target** with no DOM. Internally it is **two emissions, rn-ios and rn-android**, because the token surface and the component surface both split by OS inside React Native (iOS shadow props vs Android elevation; per-OS font family names; zIndex vs elevation; `BackHandler`, `android_ripple`, OS-only accessibility props). Externally it is **one target to the adopter**, with OS selection resolved by Metro's platform-extension files (`.ios.tsx` / `.android.tsx`) at the adopter's build. Ada's one-target-or-two fork dissolved on this reading (Ada R2).
- **The admission criterion that follows**: "OS selection resolved by the platform's build toolchain, not by runtime branches in emitted code." The shipped npm artifact may contain both files; the adopter's bundle contains one. This satisfies Core Goals' build-time separation as written (Thurgood R2).

---

## 4. Proposals considered and their dispositions

| # | Proposal | Disposition |
|---|---|---|
| P1 | Do not split the project. Split the front door and, later, the packaging: one core (token definitions + derivation, contracts, schemas, MCPs, Civitas) with platform packages on top (web elements, react, react-native, ios, android), each with quickstart, readiness column, declared support tier, release notes. "DesignerPunk for React" is a landing page and install path. | **Recommended by all four owning seats** (Ada, Lina, Thurgood, Leonardo) with the amendments in § 5 |
| P2 | Platform admission ballot with declared tiers (production / experimental / community) and a platform registry replacing the hard-coded lists; the § 3 criterion | **Recommended**; the class-level option |
| P3 | Sequence (orchestrator's first cut: theme fix → RN tokens → registry → RN reference set → adopter indexer) | **Resequenced** — see § 5 |
| P4 | React as primary edition, Native as reference edition proving contracts on real toolkits (inverts 070) | **Not recommended as an inversion.** "Reference" is a museum without the native harness (Lina, Leonardo). Its marketing is available without the inversion: React may lead the front door while contracts stay platform-neutral. Identity call is Peter's (Thurgood). |
| P5 | Full project split: DesignerPunk Native and DesignerPunk React | **Declined by all four.** Doubles branch protection, 7 workflows, health checks, claims passes; ballots lose their home; tokens and contracts need a third repo or duplicate and drift; contract edits stop merging atomically; reopens 118, 123, 125 (Thurgood). The only acceptable split is both repos depending on a core neither can edit, which is P1 under another name (Ada, Lina). |

---

## 5. The recommended shape and sequence (carry into the outline)

**Core stays one.** Core owns the single source of token definitions and the derivation step (unitless definitions, formulas, primitive → semantic → resolved per mode/theme) and exports one platform-neutral resolved model. Each platform owns only its emitter (unit converter, format, theme idiom), plugged into a registry contract that core defines and tests with conformance fixtures. An emitter may read the resolved model but may not hold definitions; a conformance test asserts every emitter's numbers match core's (Ada R2).

**Contracts stay one.** One `contracts.yaml` per component in core, Lina-owned. Platform packages carry implementations, tests, and a readiness manifest (platform key, support tier, evidence tier, core contract version verified against). A contract change is a semver event in core that marks every platform's manifest stale until re-verified; readiness cannot sit silently green against an old contract (Lina R4).

**Civitas stays one installation.** Steering, ballots, register, agent prompts and generator, three MCPs, CI gate, claims passes, health check: one place. Release notes, readiness, quickstarts, support tiers may live per package as **outputs generated from the registry**, never hand-written and never deciding anything (Thurgood R3).

**Monorepo with workspaces** so a contract change and its implementations land in one PR (Lina R4). Hold the physical package split until a second package is actually ready to publish (Thurgood R3).

| Step | What | Owner | Cost (seat estimate) |
|---|---|---|---|
| 0 | Nothing lands before the v15.0.0 tag and the parity required-flip | Peter | none |
| 1 | Identity ballot amending Core Goals: platform admission rule, tiers, the § 3 criterion; iOS and Android declared **experimental** until the native harness exists. A second, PR-atomic conforming-edits ballot for the records in § 7. | Thurgood drafts, Peter ratifies | one session each |
| 2 | Compute `PlatformValues` at emit time (retire the stored closed union); platform registry with web, iOS, Android as its first passing tenants; readiness generated from the registry | Ada (tokens), Lina (components, indexer) | one spec, multi-week |
| 3 | Theme emission fixed against the three existing emitters (the theme part of the emitter contract is defined here) | Ada | inside step 2's spec |
| 4 | Adopter-authored components: declare implemented contracts; indexer scans adopter-configured roots with provenance tags (`core` / `adopter:<pkg>`); `validate_assembly` checks declared conformance, not component names; namespaced local-concept extension (`x_<org>_…`) that validates but never merges without a ballot | Lina, Leonardo | one spec |
| 5 | React Native token emitter (two emissions, one entry, platform-extension files) + typed `tokens.ts` React export as a format | Ada | 1–2 weeks after step 2 |
| 6 | Generated React web wrappers with form association and SSR fixes (`'use client'`, no layout reads at render, `useId`, stylesheet not runtime injection); element API cleanup as a **breaking change** riding a 16.0.0 | Sparky, Lina | small spec |
| 7 | React Native reference set chosen by **contract-category coverage** (≥1 each of interaction, state, accessibility, composition), not popularity; evidence split into `unit` (RNTL in Jest) and `assistive-tech` (device/simulator), readiness never "reviewed" on `unit` alone | new React Native seat | weeks |
| 8 | Physical package split, only when a second package is ready to publish; extends 118 and 123 | Thurgood, Ada | extends existing specs |

**Why this order** (the two findings that changed it): the registry moved ahead of React Native because adding rn-ios/rn-android before the emit-time refactor adds a fourth hard-coded key to ~17 lists and migrates it twice (Ada R2, Thurgood R3). Adopter contract conformance (step 4) moved ahead of the reference set (step 7) because adopter-shaped components need something to validate against before DesignerPunk's own reference components matter (Leonardo R2).

---

## 6. How React and React Native components are expressed in Stemma (Lina R3, Sparky R2 — carry into formalization)

- **Directories per toolchain, keys per OS.** `platforms/react/*.tsx`; `platforms/react-native/` with Metro `.ios.tsx` / `.android.tsx` splits only where behavior differs, suffix-less shared files. Contract keys and readiness columns: `web, ios, android, react, rn-ios, rn-android`. A shared RN file counts as evidence for both rn keys only if its tests run under both `Platform.OS` values.
- **The shared interface is literally shared code for the first time.** React and RN import `types.ts` directly. **Guardrail (write before the first React component)**: `types.ts` stays free of React types (`children`, `ref`, `style`, React event types); each platform extends it in a platform-local `props.ts`. The JSX in examples is notation, not a dependency.
- **Token idiom.** RN: theme Provider + `useTheme()` feeding `StyleSheet` (the analog of `@Environment(\.dpTheme)` and `LocalDPTheme.current`). React web: CSS custom properties under `data-theme`, no runtime CSS-in-JS; one CSS source per component consumed by both web verticals (prefixed global stylesheet or accept CSS Module hashing).
- **One behavioral contract, two expressions.** The contract says press once; the element emits `CustomEvent('press')`, React exposes `onPress`. The element keeps DOM idioms; only names and `detail` shapes are normalized.
- **Contract verification.** `validation` / `test_approach` lines translate to React Testing Library and RNTL (role- and label-based queries); contract names carry over unchanged; the current shadow-root test mechanics do not. Jest proves declared props, not what VoiceOver/TalkBack announce: necessary, not sufficient, for a contract with a `wcag:` line. The same honesty applies to Swift and Kotlin today.
- **Adopter component minimum**: schema validated against core's schema version (name, type, registry platform keys, own tokens, readiness), `types.ts`, `component-meta.yaml`, and `contracts.yaml` only when the component has behavior, using catalog concepts or the namespaced local extension. Family membership not required.

---

## 7. Records that change (Thurgood R3)

Two ballots: **(a) identity ballot** amending `core-goals.md` (what the project is, what proves it, the platform list and admission rule, tiers); **(b) conforming-edits ballot**, PR-atomic, for: Spec 070 alignment record (True Native Commitment — needs Peter's ruling plus amendment by its product owners), Spec 034 outline (code-sharing line), `governance/technology-stack.md`, `governance/platform-implementation-guidelines.md` (one Lina-owned doc, a section per platform), `governance/cross-platform-vs-platform-specific-decision-framework.md` (currently silent on wrappers/code-sharing), both System Overviews, `Agent-Directory.md` (platform-agent roles, a React Native seat), `governance/DesignerPunk-Integration-Guide.md`.

---

## 8. Forks for Peter — OPEN (every seat declined to pick)

1. **Uniform governance or tier-scoped gates.** A React package adopters actually see would sit behind claims passes, per-platform criteria, and unverified native surfaces. Lighter criteria for experimental and community tiers would relieve the pressure that motivated the split idea; P1 does not absorb it (Thurgood R3). A governance-law change.
2. **Adopter tokens: enforce Rosetta's mathematics or only their structure.** Enforcement protects the consistency claim; structure-only lowers the adoption barrier. Adopter tokens that skip the formulas will still emit cleanly to every platform. Decide before step 4 is built (Ada R2, Thurgood R3).
3. **Lead with copy-and-own reference components or with contracts.** React teams adopt from components outward; "tokens plus contracts plus governance" is abstract against a copy-paste library. A copy-and-own reference set (the shadcn model) is a defensible front door and changes what step 7 produces (Leonardo R2).
4. **Is the split about code or identity.** Everything above answers the code version. If what Peter wants is a separate identity, a landing page may not satisfy it (Lina R4).
5. **Does Working Class remain the True Native proof case** (070), and does its platform priority (iOS first) survive (Kenya, Lina).
6. **React web: generated binding everywhere, or hand-written vertical.** Sparky's residual: two hand-written web implementations of 34 components is permanent double maintenance even with shared CSS and types; his alternative is generated wrappers plus hand-written React only for SSR-critical and form components.

**Surviving counter-arguments the recommendation does not absorb** (recorded per AI-Collaboration-Principles): six readiness columns behind one contract core make every contract change a six-way re-verification, and that cost lands on velocity, which adoption needs most; tiers soften it and do not remove it (Lina, orchestrator). Deferring React Native keeps DesignerPunk a proof its most likely adopters cannot use (Lina R1, Leonardo R1) — this is why React Native is in the sequence at all rather than deferred indefinitely. Native-first architects will read the tier declaration as a retreat (orchestrator).

---

## 9. Dependencies, gates, and interactions

- **v15.0.0 tag + parity required-flip** (ballot 70f8fe54): the formalization gate for this spec.
- **Theme emission** (`.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`, Ada): prerequisite to any new emitter; absorbed as step 3.
- **Platform build-verification harness** (`.kiro/issues/2026-09-17-...harness-candidate.md`, Kenya/Data): prerequisite before anything is called "reference"; the tier declaration in step 1 is the honest interim.
- **Specs 118 / 123 / 125**: one-package assumptions (consumer guard, publish-rail-guard, package-name-scope-drift register rows, exports contract, gate context list). Step 8 extends them; P5 would have reopened them.
- **Spec 123 Model B ruling** (2026-09-26): DesignerPunk births and runs the consumer's OWN design system. Adopter-authored tokens and components of their own shape is the Model B thesis extended to React platforms; this spec must not contradict it.
- **Spec 070 Working Class**: the no-RN commitment is a product-spec decision, not law; changing it is Peter's ruling plus a 070 amendment (§ 7).
- **Q2 parity-checker arming** and the claims-pass regime: this spec's parents will run under the 127 convention from the start.

---

## 10. Questions the seats need answered before formalization

1. Who is the first consumer: Working Class, Peter's new organization, or a hypothetical adopter? (every seat)
2. What does that consumer ship: Expo or bare React Native, Next.js with SSR, React 18 or 19? Is SSR a hard requirement? (Sparky, Leonardo)
3. Is the element-API cleanup (§ 2) allowed as a breaking change on a 16.0.0? (Sparky)
4. Who staffs the React Native seat, and does Kenya's/Data's SwiftUI and Compose work continue alongside? (Leonardo, Kenya, Data)
5. Is device-level assistive-technology testing in scope for anyone, on any platform? (Lina)
6. Is a monorepo with workspaces acceptable? (Lina)
7. Is Expo acceptable? What RN version/architecture (decides `boxShadow` availability)? (Kenya, Ada)
8. Does the Android minimum version get set first? (Data)

---

## 11. Defects surfaced incidentally — route, do not lose

- Web element event-name defects and the `variant` / `buttonVariant` mismatch (§ 2) → Lina (owner), Sparky (finder). Breaking; batch with step 6.
- Zero `forced-colors` support across 29 web CSS files against the web Hard Rules; 20 of 29 handle `prefers-reduced-motion` → Lina/Sparky. Independent of this spec.
- `validate_assembly` and `check_composition` accept any nesting by default (Button inside Badge passes) because most schemas declare no composition constraints → Lina/Leonardo. Bears on step 4's conformance validation.
- `find_screens` returns `[]` and the Product MCP reports `status: failed` in this repo → Leonardo. Pre-existing.

---

## 12. Consult ledger (read-only consults; no artifact edited)

| Seat | Rounds | One-line read |
|---|---|---|
| Ada | R1, R2 | PlatformValues stored not computed; RN splits by OS at the token layer; fork dissolved via platform-extension files; DTCG does not serve React; registry before RN; adopter-token math fork |
| Lina | R1–R4 | React web is a binding; RN is two targets keyed per OS; types-drift guardrail; unit vs assistive-tech evidence; contracts one-per-component in core; monorepo condition; contract-version pinning |
| Thurgood | R1–R3 | No law bans RN; Layer 1 reads build-time; two ballots; P5 doubles the gate and loses ballots' home; readiness generated from registry; tiers settle grandfathering; hold physical split |
| Leonardo | R1, R2 | React web is adapter work; RN needs a seat; one index with provenance; conformance validation before reference set; copy-and-own vs contracts fork |
| Sparky | R1, R2 | React consumption works with four rough edges; CSS portable; one contract two expressions; SSR minimum; element defects |
| Kenya | R1 | Defer; additive if forced; gate on iOS harness; True Native principle-or-preference question |
| Data | R1 | Defer; build Android harness first; RN hides the Compose gap more than it fixes it |

---

## 13. What this inbound is NOT

Not a settled outline, not a requirements draft, not a ratification of any identity change, not authorization for any build work. It is the durable capture of Peter's direction and the seats' positions so formalization starts from the record instead of a memory.
