# Native plan record (2026-11-05)

Holder: Thurgood. This folder records, byte for byte, the native-platform plan round and the order consult that followed the Q5 recommendation round (feedback: `../../feedback/design-outline.md` § "Q5 recommendation round (2026-11-04/05)"), and Peter's decisions on the plan.

- `plan-r2.md` is the plan Peter's decisions refer to. Its own header still reads "DRAFT R2", because the file is a record of the plan as the round left it and is not edited; the approval is recorded here and in `peter-2026-11-05.md`. The text is the file as committed at `b89163c41` (the commit that added it). Peter read the orchestrator's relay of the items he decided (what he read is quoted in `peter-2026-11-05.md`), not necessarily the file itself.
- Peter's words are in `peter-2026-11-05.md`, verbatim and in receipt order, with what he had read before each. The file is an append: an earlier committed copy ended before the last two paragraphs, and is a byte prefix of this one.
- The `*-plan-r1.md`, `*-plan-r2.md` and `plan-draft-r1.md` files are the seats' reviews and the draft they reviewed; `brief-plan.md` is the brief. `brief-131-first.md` and the three `*-order-r1.md` files are the order consult.
- The two briefs of the Q5 round itself are in `../2026-11-04-q5-round-briefs/`.

## What Peter decided, and when

All times are `date -u` at receipt, as `peter-2026-11-05.md` records them. His words are quoted there; the pointers below name the paragraph.

| Received (UTC, 2026-11-05) | His words (verbatim) | What it decides |
|---|---|---|
| 04:05:02Z | "Licence accepted; keep 129 first" | 129 stays first. Confirms the existing order and the ratified park of Spec 131 (`../../../131-governance-simplification/design-outline.md`, outcome lines). |
| 04:06:22Z | "Let's go (x′)" | Order (x′), as plan-r2 § 7 item 3 defines it. |
| 04:07:43Z | "A yes, B (a), C yes; (x′) as defined" | **A**: the two-spec plan is approved as a whole, 129 and a new Spec 132 under one goal. **B (a)**: 129's acceptance sentence is narrowed to the corrected wording (quoted in his last paragraph in `peter-2026-11-05.md`; the charter carries it), and his original sentence moves word for word into 132. **C**: the checks D1–D3 (plan-r2 § 1) are 129's part of "done". **(x′)**: 129, then 132's first family, then Peter re-places the remaining families against Spec 131 using that family's measured cost, then 131, 128, 130. |

## What "approved as a whole" covers

- **Fixed for 129**: the structure (129 and 132 under one goal), the narrowed acceptance sentence, rows D1, D2 and D3 as 129's definition of done, and order (x′). Changing a D row later is Peter's decision.
- **Not decided by this approval, deferred to the gate that owns it** (the orchestrator's split; Peter did not object, and his message above answers only A, B and C):

| Decisions (plan-r2) | Gate |
|---|---|
| D4–D10 (§ 1), and § 7 decisions 8, 9, 10 and 11 | Spec 132's outline round |
| § 7 decisions 4 (iOS minimum) and 5 (Android minimum and toolchain range), and 7 (when native becomes a semver promise) | Spec 129's design round |
| § 7 decision 6 (runner classes and required-check promotions) | Spec 129's tasks round |

- **Taken by the approval, in the plan's own wording**: § 7 item 1 as far as D1–D3 (C), item 2 (B (a)) and item 3 (x′). Item 1's D4–D10 remain with 132's outline.
- **The team's, per plan-r2 § 7's closing list**: tool choices, the comparator and the D6 checker, the module and naming design, the INSTALL pointer's form.

## Where each decision landed (the approval PR and its two siblings)

- Spec 129's design outline: Q5 answered, the acceptance and definition of done, the order and the deferred decisions (this PR).
- The priorities record `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md`: the order, and 132's place (this PR).
- Spec 131's outline: the park line, re-ask moved to 132's first family (this PR).
- The Integration Guide's install region, its walkthrough index and its walkthrough stub: the "Native status" passage (this PR).
- The narrowed acceptance sentence in the 129 charter: Ada's PR.
- The goal home in the distribution charter (lapse, re-class, trigger, Peter's sentence as 132's acceptance, the definition of done, the 20 views): Kenya's PR, with Data.

The two sibling PRs must merge before any commit touches `harness/**` (plan-r2 § 6 item 2).
