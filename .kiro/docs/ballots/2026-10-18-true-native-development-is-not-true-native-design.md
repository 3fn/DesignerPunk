# Ballot Measure: True Native Development is not True Native Design

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward), at Peter's direction.
**Status**: **DRAFT.** Nothing in § 4 is applied until this record says RATIFIED (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Origin**: Peter's answer on Spec 130 fork P-1, given in chat on 2026-10-18 and relayed by the orchestrator. It is recorded at `.kiro/specs/130-input-switch-base/feedback.md` § "[PETER R0]". He agreed the answer should become law through this ballot, not stay a feedback line.
**Required reviewers**: **Leonardo** (product architect; he consumes the design philosophy) and **Lina** (owner of `governance/cross-platform-vs-platform-specific-decision-framework.md`).
**Unit**: this draft is standalone. The application PR edits `governance/**`, so **Peter merges it** under the governance carve-out.

---

## 1. The principle (the rule, verbatim)

> **"True Native Development does not necessarily mean True Native Design, and design needs to be able to part from native design to solve a product team's own user needs and branding."** — Peter, 2026-10-18

## 2. What it changes

- **True Native Architecture is a development axis.** It means build-time platform separation and a native implementation on each platform: SwiftUI, Compose, Web Components, no runtime detection. It does **not** bind visual design to platform idiom.
- **The design axis is separate and named.** A product team's design may depart from the native look to serve its own users and brand, and the departure is still implemented natively. Native idiom is one input to that decision. It is never a default the design must justify leaving.

## 3. What it does NOT change

- **Accessibility semantics stay native-correct**, whatever the look: roles, states, focus, and reduced motion. A drawn control carries these in its behavioral contracts and their tests. It does not inherit them from the native control it replaced.
- **The decision framework's "it depends" stays.** Neither consistency nor idiom is always right. This ballot names the design axis explicitly. It does not pick an answer for any component.
- **The 2026-10-18 accessibility punt is a different question.** On P-6 and P-13, Peter deferred color contrast to a later redesign. That punt does not relax the semantics in this section, and this ballot does not touch it.
- **Build-time separation, the Rosetta pipeline and the behavioral contracts are unchanged.**

## 4. Edit sites (applied only after RATIFIED)

| # | Site | Owner | Merge rule | Edit |
|---|---|---|---|---|
| 1 | `governance/cross-platform-vs-platform-specific-decision-framework.md` L23, the "Key Principle" paragraph | Lina | `governance/**`, so Peter merges | Append one sentence. See 4.1. |
| 2 | `design-language/design-philosophy.yaml`, `philosophy.characteristics`, inserted after L21. This is the file the Application MCP's `get_design_philosophy` serves: `DesignPhilosophyIndexer.index()` reads `designLanguagePath`, which defaults to `design-language/design-philosophy.yaml` (`application-mcp-server/src/index.ts` L754, L814). | Peter is the author (Spec 107 Req 8); Leonardo is the consumer | Peter merges. The file ships in the package (`package.json` `files`: `design-language/`), so the line reaches consumers at the next release. | Add one line. See 4.2. |
| 3 | `preserved-knowledge/true-native-architecture-concepts.md`, end of file | Unowned. This is preserved knowledge, so it gets an addendum, never a rewrite. | Peter merges, riding the application PR. It is outside every charter's write scope, so the ratification names who writes it. | Add one addendum line. See 4.3. |
| 4 | `.kiro/specs/130-input-switch-base/design-outline.md` § "2. Settled decisions" | Thurgood | Applied at R1 incorporation and merged with that R1 unit | Add one row. See 4.4. |

**4.1, the Key Principle.** The current text at L23:
> **Key Principle**: Neither cross-platform consistency nor platform-specific idioms are always correct. The right choice depends on context, user expectations, and design system goals.

After the edit, the paragraph is the same text with this sentence appended:
> **Key Principle**: Neither cross-platform consistency nor platform-specific idioms are always correct. The right choice depends on context, user expectations, and design system goals. True Native Architecture governs how a component is built, not how it looks: a product team's design may depart from native visual idiom to serve its own users and brand, provided it is implemented natively and its accessibility semantics (roles, states, focus, reduced motion) stay native-correct.

**4.2, the philosophy line.** Inserted at the same indentation as L21:
```yaml
    - "True Native Development, not True Native Design: every platform is implemented natively, but the look may depart from native idiom to serve a product's users and brand; accessibility semantics stay native-correct"
```

**4.3, the preserved-knowledge addendum.** Appended after the closing italic line:
> **Addendum (2026-10-18, ballot `2026-10-18-true-native-development-is-not-true-native-design`)**: "True Native" in this document describes development (build-time separation, native implementation), not visual design; design may depart from native idiom while the implementation stays native.

**4.4, the Spec 130 settled row** (the existing table's columns):

| Decision | Source |
|---|---|
| True Native Development is not True Native Design. Native idiom does not bind the switch's look, so drawn or token-defined geometry is admissible on every platform. Accessibility semantics stay native-correct. | Ballot `2026-10-18-true-native-development-is-not-true-native-design` (Peter, 2026-10-18) |

**Straggler sweep (README edit discipline).** On 2026-10-18, a grep for `native (idiom|look|feel|design)|platform idiom|platform-appropriate` over `governance`, `.kiro/steering`, `design-language` and `canonical` hit 15 governance files and Leonardo's prompt. None of them says design must follow native idiom. They *allow* platform-appropriate variation, which is consistent with this ballot, so no further site is proposed. Core Goals ("True Native cross-platform design system"; build-time separation) is consistent and is not edited. That also spares a signed identity unit from re-signing. The application PR re-runs the sweep.

## 5. Consequences for Spec 130 P-1

- **Native idiom is not binding**, so drawn or token-defined geometry is admissible on iOS and web. Lina's (b) and (c) both become legitimate. (a), native look everywhere, stays legitimate too. It just stops being the presumed default.
- **This ballot does not pick between (b) and (c).** That choice is Lina's read and Peter's ruling at R1. Kenya, Data and Sparky give their platform reads there.
- **Whatever is drawn owns its semantics** (§ 3). This applies to P-1 (b)'s custom iOS `ToggleStyle` and to every drawn surface in (c).

## 6. Counter-arguments (after fold-back)

1. **Drawn controls give up the accessibility and motion that native controls provide for free**: VoiceOver/TalkBack traits, Dynamic Type, reduced motion, forced colors, haptics. *Folded in*: § 3 makes native-correct semantics part of the rule, not an afterthought, and puts them in contracts with tests.
2. **More load on the platform reviewers.** Every departure needs Kenya, Data or Sparky to verify that the drawn control behaves natively. *Folded in*: the ballot permits departure but never requires it, and the framework's "it depends" still governs.
3. **Consumer expectations on iOS.** Users expect the Settings switch to look like the Settings switch. *Folded in*: the principle says "may", and the call stays per product and per component.

**What survives:**
- **(R-1) The cost of owned accessibility is admitted, not removed.** Once departure is ordinary, each drawn control is accessibility code that DesignerPunk writes and tests on each platform it draws. That cost falls on Lina and the platform seats, and it recurs with every drawn component. Contracts make the cost visible. They do not make it smaller.
- **(R-2) A fork the principle exposes and does not settle: the system's own default look.** The ballot frees *product teams* to depart from native design. It does not say what DesignerPunk ships when a team makes no choice: **(i)** native look by default, with departure as the product's opt-in, or **(ii)** DesignerPunk's own look by default (Electric Precision, token geometry), with native look as the product's opt-in. Both are defensible. (i) keeps the free native behavior and lowers R-1. (ii) is what the brand philosophy reads as. **This is Peter's pick.** The ballot surfaces it and does not choose. It may also be left to each component (P-1 at R1).

## 7. Review rounds

#### [LEONARDO R1]
*(pending: read-only consult in progress, 2026-10-18)*

#### [LINA R1]
*(pending: read-only consult in progress, 2026-10-18)*

#### [THURGOOD R2]
*(incorporation, after both rounds)*

## 8. Rulings (Peter)

*(empty: the ballot is DRAFT)*
- Ratify / modify / reject:
- R-2, the system default (i) / (ii) / per component:
- Who writes edit site 3:

## 9. Consult ledger

- **Peter**, 2026-10-18 (relayed by the orchestrator): the principle, verbatim, and the instruction that it becomes law through a short ballot.
- **Leonardo**: pending (required reviewer; read-only consult in parallel).
- **Lina**: pending (required reviewer; owner of edit site 1).
- **Not consulted**: Kenya, Data and Sparky. They carry counter-argument 2's load. Peter decides whether they review this ballot or first meet it at Spec 130 R1.
