# Operative-set confirmation — `component-family-navigation` (C1, owner seat)

**Record**: `canonical/operative-sets/component-family-navigation.yaml` (drafted by Thurgood at 11.1; confirmed here, items unchanged)
**Source**: `governance/Component-Family-Navigation.md`
**Owner**: Lina (component-family docs are Stemma content) · **Profile author**: Thurgood · **Confirmer**: **Lina**, under C1's general rule (Req 11.6.5d; design C16).
**Date**: 2026-09-27 · Spec 123 Task 11.2 (Lina's half; write grant: Task 11's row as amended by PR #220)
**Scope**: exemplar F's two units only.

**Disclosure**: *confirmed by the proposing seat.* I proposed F at R2. Thurgood instantiated it (a conflicted-seat construction, disclosed at 11.1); I rule on that instantiation here.

**Format and criterion**: as in `confirmations/lina.md`. An item is operative if and only if a consumer implementation could violate it (5c).

## The F instantiation — KEPT

**Ruling: keep `#purpose` (inapplicable) against `#key-characteristics` (operative). Not re-pointed.**

- **Why F cannot be instantiated as worded.** I confirm Thurgood's measurement: no family doc has an `## Overview` / `### Inheritance` bullet pair. My R2 wording named the wrong sections. The label-shaped bullets live under `## Family Overview`.
- **Why keep, not re-point to `#family-overview:preamble`.** Thurgood's alternative (`**Family**` / `**Shared Need**` / `**Readiness**`, label-shaped and non-binding) holds form constant, so it would catch a classifier that errs in *either* direction. The current pair catches only the classifier that reads label-shaped bullets as definitional. **That is the dangerous direction**: it shrinks the denominator, and 5d exists because a shrunk denominator clears wrongly. The other error (label-shape read as operative) inflates the denominator, which routes a unit that did not need it. That costs reviewer time and never files a false finding or a false clear. The current pair already tests the direction that matters.
- **The plan already names `#purpose`.** The merged Task 11 and Task 12 amendments (#220) state that clause (a) is exercised by *F's `#purpose` only*, and Stacy's G1 domain line must say so. Re-pointing, or adding the preamble as a third unit, would make that ruled text false.
- **Residual (not absorbed): F does not discriminate a classifier that keys on label form in the operative direction.** A rule of *"label-shaped bullets are operative, prose is not"* passes F. If Peter wants that direction covered too, the preamble can be added as a third F unit (0 items, required verdict inapplicable). That needs a tasks amendment, because it changes the *"`#purpose` only"* wording. **Surfaced, not picked.**

## `#purpose`

confirmer: lina
canonicalHash: sha256:6e5be41076b8f9320f49e2226c16b526a6623508190847b1c4923fe1697fd589
items: none
date: 2026-09-27

**Ruling: CONFIRMED at 0 items → clause (a), inapplicable.** This is now the only exemplar that exercises clause (a), so here is the strongest case against zero, and why it fails:
- *"The Navigation family provides components for user wayfinding and switching between views."* This is an orienting sentence about what the family is for, 5c's own named example of non-operative content.
- *"Implemented components include a segmented control for mutually exclusive content views and a primary bottom tab bar for top-level app destinations."* This is the only candidate.
  - Read as an **inventory** (members), it is a statement of fact about this repo, not a constraint. A consumer install without one of the components makes it false in their repo. That is repo-specifics territory, clauses (i) and (iv), not something an implementation violates.
  - Read as **usage rules** (*for* mutually exclusive views, *for* top-level destinations), its binding forms live elsewhere: *"Exactly one option active at all times"* in `#key-characteristics`, and *"between 2–5 mutually exclusive content views"* and *"between 3–5 top-level app destinations"* in `#when-to-use`. Here it only summarizes them.
- **No sentence in this unit is one a consumer implementation could violate.**

**Fragility (flag, not a fix — `governance/` is outside my write scope):** the sentence is **stale**. Five Nav components exist (`Nav-SegmentedChoice-Base`, `Nav-TabBar-Base`, `Nav-Header-Base`, `Nav-Header-Page`, `Nav-Header-App` under `src/components/core/`), and the doc's `**Readiness**` line says *"2 components implemented"*. The natural fix is a canonical edit to this unit. That changes its hash, so the freshness sweep will demand my re-confirmation. **If the fix adds binding content, clause (a) loses its only exemplar.** The fix should go through a ballot that checks this first.

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
