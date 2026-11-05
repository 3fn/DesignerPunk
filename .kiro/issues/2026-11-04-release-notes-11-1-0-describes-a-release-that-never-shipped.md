# `docs/releases/RELEASE-NOTES-11.1.0.md` describes a release that was never published or tagged

**Date**: 2026-11-04
**Status**: ACTIVE
**Owner**: **Thurgood** (release author; the file is a release-notes surface)
**Filed by**: Thurgood, under README rule 10, in the application PR of ballot `2026-11-04-waiting-spec-row` (§ 8, from [ADA R1] row 9). The ballot did not delete or edit the file.
**Trigger**: `release:16.3.0:phase-1` — the walk reads whether the file was corrected, removed or left with a reason. A re-rule names another git-visible event.
**Class**: P3 improvement · defect *(proposed by the filer, 2026-11-04, Thurgood, rule 12. `docs/releases/` is not in `package.json` `files`, so no consumer reads the file and no packed text is false. The file is a tracked record that says a release happened that did not.)*
**Source**: Spec 102 (`102-consumer-onboarding-completion`), closed as "abandoned in part" in the first pass of ballot `2026-11-04-waiting-spec-row` (Appendix B row 9; [ADA R1]).

---

## What is wrong

- There is no tag `v11.1.0`. Spec 102's parent 2 ("publish 11.1.0") never ran. 102's work shipped in `v11.2.0` (`9f954cf68`, via Spec 103).
- `docs/releases/RELEASE-NOTES-11.1.0.md` is still on `main`. It opens "# Release 11.1.0", dated 2026-05-07, and its body is Spec 101's 11.0.0 summary (reconciliation and publish preparation, "Publish 11.0.0 and Verify"), so it describes a release that never shipped under a version that was skipped.
- Its only citations are in Spec 102's own `tasks.md` (L221, L259, L302), which ask for it to be produced.

## The choice for the owner

Delete it, correct it with a banner saying 11.1.0 was skipped and 102's work shipped in 11.2.0, or leave it with a reason. The record does not pick. Spec 102's tasks.md is a ledger and keeps its citations either way.
