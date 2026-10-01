# Operative-set confirmation — `component-family-navigation` (C1, owner seat)

**Record**: `canonical/operative-sets/component-family-navigation.yaml` (drafted by Thurgood at 11.1; confirmed here, items unchanged)
**Source**: `governance/Component-Family-Navigation.md`
**Owner**: Lina (component-family docs are Stemma content) · **Profile author**: Thurgood · **Confirmer**: **Lina**, under C1's general rule (Req 11.6.5d; design C16).
**Date**: 2026-09-27 · Spec 123 Task 11.2 (Lina's half; write grant: Task 11's row as amended by PR #220)
**Scope**: exemplar F's two units only. *Extended 2026-09-28 (Spec 123 Task 13.0, U2b-cut amendment #225): F's third unit, `#family-overview:preamble` — see its block below.*

**Disclosure**: *confirmed by the proposing seat.* I proposed F at R2. Thurgood instantiated it (a conflicted-seat construction, disclosed at 11.1); I rule on that instantiation here.

**Format and criterion**: as in `confirmations/lina.md`. An item is operative if and only if a consumer implementation could violate it (5c).

## The F instantiation — KEPT

> **Superseded in part, 2026-09-28 (Task 13.0).** The "not re-pointed" ruling below still stands: `#purpose` and `#key-characteristics` remain F's pair. The *decline of `#family-overview:preamble` as a third unit* is superseded. Peter ruled the residual below in (Item 1 of `.kiro/issues/2026-09-27-task-11-deferred-lina-items.md`), and the U2b-cut tasks amendment (#225) added the unit at Task 13.0. Per that amendment's addendum, the Task 11 and Task 12 *"`#purpose` only"* wording was **not** edited: it stays true of G1's eleven exemplars. The third unit joins G2's domain. The reasoning below is kept as the 11.2 record.

**Ruling: keep `#purpose` (inapplicable) against `#key-characteristics` (operative). Not re-pointed.**

- **Why F cannot be instantiated as worded.** I confirm Thurgood's measurement: no family doc has an `## Overview` / `### Inheritance` bullet pair. My R2 wording named the wrong sections. The label-shaped bullets live under `## Family Overview`.
- **Why keep, not re-point to `#family-overview:preamble`.** Thurgood's alternative (`**Family**` / `**Shared Need**` / `**Readiness**`, label-shaped and non-binding) holds form constant, so it would catch a classifier that errs in *either* direction. The current pair catches only the classifier that reads label-shaped bullets as definitional. **That is the dangerous direction**: it shrinks the denominator, and 5d exists because a shrunk denominator clears wrongly. The other error (label-shape read as operative) inflates the denominator, which routes a unit that did not need it. That costs reviewer time and never files a false finding or a false clear. The current pair already tests the direction that matters.
- **The plan already names `#purpose`.** The merged Task 11 and Task 12 amendments (#220) state that clause (a) is exercised by *F's `#purpose` only*, and Stacy's G1 domain line must say so. Re-pointing, or adding the preamble as a third unit, would make that ruled text false.
- **Residual (not absorbed): F does not discriminate a classifier that keys on label form in the operative direction.** A rule of *"label-shaped bullets are operative, prose is not"* passes F. If Peter wants that direction covered too, the preamble can be added as a third F unit (0 items, required verdict inapplicable). That needs a tasks amendment, because it changes the *"`#purpose` only"* wording. **Surfaced, not picked.**

## `#purpose`

confirmer: lina
canonicalHash: sha256:d53f8e98d51d8941832cb60f1639ceba0af9a91d1f9b1ed3bf5f0be57892523a
items: none
date: 2026-09-27

**Ruling: CONFIRMED at 0 items → clause (a), inapplicable.** This is now the only exemplar that exercises clause (a), so here is the strongest case against zero, and why it fails:
- *"The Navigation family provides components for user wayfinding and switching between views."* This is an orienting sentence about what the family is for, 5c's own named example of non-operative content.
- *"Implemented components include a segmented control for mutually exclusive content views and a primary bottom tab bar for top-level app destinations."* This is the only candidate.
  - Read as an **inventory** (members), it is a statement of fact about this repo, not a constraint. A consumer install without one of the components makes it false in their repo. That is repo-specifics territory, clauses (i) and (iv), not something an implementation violates.
  - Read as **usage rules** (*for* mutually exclusive views, *for* top-level destinations), its binding forms live elsewhere: *"Exactly one option active at all times"* in `#key-characteristics`, and *"between 2–5 mutually exclusive content views"* and *"between 3–5 top-level app destinations"* in `#when-to-use`. Here it only summarizes them.
- **No sentence in this unit is one a consumer implementation could violate.**

**Re-confirmation, 2026-09-27 (after U2a merged, #222).** The inventory sentence was corrected from two components to five, executing Item 2 of `.kiro/issues/2026-09-27-task-11-deferred-lina-items.md`. It now reads: *"Five components are implemented: a segmented control for mutually exclusive content views, a primary bottom tab bar for top-level app destinations, and three top-of-screen navigation headers (Nav-Header-Base, Nav-Header-Page, Nav-Header-App)."*
- **Hash**: `sha256:6e5be410…` → `sha256:d53f8e98…`.
- **Still 0 items.** The new sentence is an inventory statement with the same two purpose phrases as before, plus three component names. It adds no usage rule. I deliberately left out the header components' binding rule, *"Internal only — use Nav-Header-Page or Nav-Header-App"*, which belongs in the Nav-Header-Base metadata unit. **Clause (a) keeps its exemplar.**

**Fragility, as recorded at 11.2 (resolved by the re-confirmation above):** the sentence is **stale**. Five Nav components exist (`Nav-SegmentedChoice-Base`, `Nav-TabBar-Base`, `Nav-Header-Base`, `Nav-Header-Page`, `Nav-Header-App` under `src/components/core/`), and the doc's `**Readiness**` line says *"2 components implemented"*. The natural fix is a canonical edit to this unit. That changes its hash, so the freshness sweep will demand my re-confirmation. **If the fix adds binding content, clause (a) loses its only exemplar.** The fix should go through a ballot that checks this first.

## `#key-characteristics`

confirmer: lina
canonicalHash: sha256:5df158450211b650b1b92b9a1f237ec04668fdf201b0f60a350968e1eee60f77
items: nav-mutually-exclusive-selection, nav-animated-indicators, nav-equal-width-distribution, nav-no-disabled-states, nav-icon-text-variants
date: 2026-09-27

**Ruling: CONFIRMED at 5 items → operative.** Each `**Label**: value` bullet binds, and each text carries its label:
- A multi-select or none-selected state violates *Mutually Exclusive Selection*.
- An instant indicator jump, or a different phase choreography, violates *Animated Indicators*.
- Content-sized segments, or targets below the minimum, violate *Equal-Width Distribution*.
- A greyed-out option violates *No Disabled States*.
- A text-labelled tab bar violates *Icon + Text Variants* (v1).

The unit holds no expository residue to exclude. The set is complete at five.

## `#family-overview:preamble`

confirmer: lina
canonicalHash: sha256:0b09be78566cb1466b5d4ea062b5c3344499cbf60ef4f4e4f4f0bb9e28c81f0c
items: none
date: 2026-09-28

**Ruling: CONFIRMED at 0 items → clause (a), inapplicable.** This is F's third unit, added at Task 13.0. It is **label-shaped but descriptive**: it holds the `**Label**: value` form constant against `#key-characteristics` while normativity varies. It therefore catches a classifier that reads label **shape** as operative, the direction F's pair could not discriminate (the residual above).

**The text confirmed** is the unit as of #223's merge (`14aa8c23` on `main`). #223 edited it: the `**Readiness**` line went from `2 components implemented` to `5 components implemented`. `git diff 14aa8c23 -- governance/Component-Family-Navigation.md` is empty on the confirming branch. The unit is 170 bytes:

- `## Family Overview`: a heading, so a label and never an item (clause (c)).
- *`**Family**: Navigation`*: a classification label. The binding naming rule (the `Nav-` prefix) lives in the Stemma naming convention, not here. Nothing a consumer implementation does can violate it.
- *`**Shared Need**: Wayfinding and view switching`*: an orienting purpose, the same content as `#purpose`'s first sentence. This is 5c's named example of non-operative content.
- *`**Readiness**: 🟡 Beta (5 components implemented, family hierarchy evolving)`*: the only line #223 changed, so it is re-verified here and not carried over from the 11.2 reading. It is a maturity status and an inventory count about this repo. A consumer install with a different component set makes it false in their repo; that is repo-specifics territory, clauses (i) and (iv), not a constraint an implementation violates. The edit changed only the number. It added no usage rule and named no components.
- **No sentence in this unit is one a consumer implementation could violate.**

**Residual (not absorbed), surfaced for Peter, not picked.** Form is held constant at the `**Label**: value` shape but **not at the list marker**. These three lines carry no `- `, so they render as one paragraph with soft breaks, while `#key-characteristics` is a `- **Label**: value` list. A classifier keyed on *list-item* label bullets would still pass all three F units. The one unit here that also holds the marker constant is `#stemma-system-integration` (`- **Implemented Primitives**: …`). It is not a clean substitute:
- it is stale (Item 2's residual: it lists two primitives and counts Header as a planned variant);
- its `**Cross-Platform**` bullet (*"All three platforms implemented with shared behavioral contracts"*) is a borderline obligation, not a clean zero.

Covering that variant would need a docs fix first, then a fourth unit and a tasks amendment.
