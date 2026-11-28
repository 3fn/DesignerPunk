# Issue: Spec 132's sitting-2 owed acts — P-4's reason classes, P-13's checks and usage lines, P-16's validator and `.tint` check, the claim text, two SYMPTOM passes

**Date**: 2026-11-28
**Owner**: Thurgood (filer, and Spec 132's formalizer, who recorded the rulings). Items name their seats: A Lina, with Thurgood for the checker; B Lina and Kenya; C Kenya, Lina, Leonardo and Ada; D Leonardo; E Stacy; F Leonardo.
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — the event that owes this record's close is Spec 132's requirements: the commit that adds them takes these items in or leaves them out with a reason (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec").
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Thurgood, owner, rule 12: Peter's rulings create these acts; no reader is misled while 132 has made no support claim.)*
**Source**: Peter's sitting-2 rulings on Spec 132's design outline (#880), each recorded with his words and receipt time in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md`: § "[PETER] P-4" (2026-11-28T03:48:12Z, 03:49:46Z), § "[PETER] P-7" (03:19:49Z), § "[PETER] P-13" (03:57:33Z, 03:59:04Z, 04:18:53Z), § "[PETER] P-16" (04:24:26Z, 04:39:39Z). Filed under `.kiro/issues/README.md` rule 10 in the PR that records the rulings. Each owner may re-class or re-rule their own item under rules 9 and 12.

---

## Items

- **A. P-4's closed list of reason classes** (Lina; the checker with Thurgood). Peter ruled (b), as new work: today exclusions carry free-text reasons (40 entries across 25 `contracts.yaml` files), the 19 web-only contracts carry none, and nothing counts them (Lina R10).
  - A reason-class list, grounded in a classification of the first family's 46 contracts per platform, for Peter to approve once. It rides the per-platform contract-validation ballot, `.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md`.
  - A reason, class plus text, on every platform removal, not only on exclusions.
  - The 40 exclusions and the 19 web-only contracts re-sorted into those classes.
  - A checker that rejects any reason off the list and counts each class (Thurgood, with Lina).
- **B. P-16's guards** (Lina; Kenya). Peter ruled (C), with Lina's (A): per platform, `rendering: { kind: drawn | platform, reason }`.
  - The schema validator rejects a missing reason (Lina).
  - Whether SwiftUI `.tint` colours the text selection as well as the caret, checked on iOS before Input-Text-Base's family is claimed (Kenya). If it does not, (B) reopens, and T-1's identifier returns with it.
- **C. P-13's checks, usage lines and tokens** (Kenya; Lina; Leonardo; Ada).
  - Whether SwiftUI `.fontWeight` works with `Font.custom`, owed under either option (Kenya; Ada R13).
  - Android's matching small-text fix, in the same unit as the six iOS texts moved to caption (Lina).
  - The set checked on the patterns screen at AX5, before the first claim (Leonardo).
  - The served usage line saying h4/h5 and h2/h3 may swap at the largest sizes, so hierarchy must not rely on size alone (Leonardo).
  - The served line, verbatim: "`segment*` are for the labels of segmented selection controls only, not a general bold 16/18pt style." (Leonardo).
  - `typography.segmentLg` and `typography.segmentMd` created in 132's typography work, as Peter's token-creation review approved them; and, after the scale role lands, a ballot adding a scale-role section to Token-Family-Typography (Ada).
- **D. The support-claim text** (Leonardo): the text as a whole, naming only the claimed components (D10's adopter component is not ours to claim; Stacy R4) and carrying the line that colours may change (P-7, item 4).
- **E. Two SYMPTOM-class audit passes, each with a committed record, by this record's trigger** (Stacy): Spec 005's Dynamic Type completion claim, which implemented only shrink-to-fit, as a false-claim finding (Ada R11); and the claim side of `InteractionStateAudit.test.ts`'s false assurance (Stacy R9).
- **F. A clean-room build that follows only the guide, before the first per-family announcement** (Leonardo R6, R13). It was never put to Peter, so it is a proposal: the requirements round takes it in or leaves it out with a reason.

*Signed: Thurgood, 2026-11-28.*
