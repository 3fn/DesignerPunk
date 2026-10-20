# Who charters 17.0.0, and when? Records owe work to a release that no record plans

**Date**: 2026-10-20
**Type**: OWED-ACT. It records the gap and plans nothing.
**Owner**: **Peter**. Release planning is his decision. Filed by **Thurgood** under rule 10, as the Spec 128 identity sitting's one slot kept out of the carry (Peter, 2026-10-20). Under rule 9, the body is Peter's to edit; any seat may append dated, signed lines.
**Trigger**: `release:next:phase-1` — the next release-prep, or the next health-check walk if that comes first (the walk reads this record under rule 6). It is closed by a dated outcome line naming the 17.0.0 charter's record, or by Peter's decision that no 17.0.0 is planned, with what then happens to the records below.
**Class**: P2 obligation (record) · owed-act *(Thurgood, 2026-10-20, rule 12. Open obligations cite a release that no record plans. That misleads no reader about shipped behaviour, so it is not a P0.)*
**Walked**: monthly, in the health check's active-charter walk (README rule 6).
**Status**: **OPEN**.

---

## The gap

`.kiro/issues/2026-10-16-blend-deprecation-next-major-doc-correction.md:17` reads: in a 16.0.0 package, "the next major version" means "17.0.0, which no record plans" (verified 2026-10-20).

## What hangs on it

- **`.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`** (Lina). Its items E2–E7 are owed no later than 17.0.0, and their start condition is the 17.0.0 charter (its L6). Its E1, a P0, has its own `release:next:phase-1` due point, which does not depend on this record.
- **Spec 128's generated-wrapper sequencing rule.** Generated React web wrappers do not ship before the 17.0.0 element cleanup (`.kiro/specs/128-react-react-native-platform-admission/inbound-from-identity-sitting-2026-10-20.md` § 2 F-6, "Sequencing rule").
- **The blend deprecation's next-major removal** (the 2026-10-16 record cited above).

## Why it is not a Spec 128 question

A major release's charter decides what breaking changes ship together and when. Spec 128 is one consumer of that decision among several. Peter's carry ruling (2026-10-20) kept this slot out of 128 so that it sits where the walk reads it.
