# Issue: until 17.0.0, `main` stays releasable as 16.x — breaking changes deprecated first, removed only in their major

**Date**: 2026-11-28
**Owner**: Thurgood (filer, and the rule's owner as RELEASE-FLOW's owner; P-7 named no owner, so this is Thurgood's proposal, open to re-ruling).
**Trigger**: `tag:v17.0.0` — the event that owes this record's close is the 17.0.0 tag, where the rule ends. Until then, the priorities record's § 7 row reprints it at every release's walk (RELEASE-FLOW item 3a).
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Thurgood, owner, rule 12: Peter's ruling creates this standing act; no reader is misled while no breaking change ships unannounced.)*
**Source**: Peter, received 2026-11-28T03:19:49Z, verbatim: "This is getting a little complicated for me, so let's go with the collective relevant team's lean on the optimal path forward. My preference would be to avoid too many changing messages we have to update, track, and communicate to potential adopters. Honest thoughts?" — adopting the team's lean, whose item 2 is this rule (`.kiro/specs/132-native-components-in-app/feedback/design-outline.md` § "[PETER] P-7"; Stacy R4 asked for an owner and a § 7 row). Kept by the pivot (§ "[PETER] pivot"). Filed under `.kiro/issues/README.md` rule 10.

---

## Items

- **A. The rule** (Thurgood): no 16.x release ships a breaking change that was not deprecated first. A breaking change is removed only in its major. The rule does not cover unclaimed reference-only native source (Lina). At each 16.x release, the walk owner reads the release's 🔴 rows (RELEASE-FLOW "Deriving the delta", step 2): a 🔴 row with no prior deprecation is a finding against this record.
- **B. The priorities record's § 7 row** (Thurgood, its steward), so RELEASE-FLOW item 3a reprints the rule at every release until 17.0.0.
- **C. Whether RELEASE-FLOW needs step text for the rule** (Thurgood): a LAW question. If it does, it goes to Peter as a ballot; until then, items A and B hold it.

*Signed: Thurgood, 2026-11-28.*
