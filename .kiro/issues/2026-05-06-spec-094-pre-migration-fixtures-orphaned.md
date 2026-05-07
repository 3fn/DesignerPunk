# Spec 094 Pre-Migration Fixtures Orphaned After Regression Test Retirement

**Date**: 2026-05-06
**Severity**: Low (housekeeping; no functional impact)
**Agent**: Ada (surfaced during Spec 101 Task 1.6 execution)
**Blocks**: Nothing
**Status**: ✅ Resolved (2026-05-07, Thurgood governance decision)
**Suggested Owner**: Thurgood (Civitas governance — retire-or-preserve decision for orphaned artifacts)

## Resolution (2026-05-07)

**Decision**: Preserve with annotation, per Ada's lean.

**Action taken**: Added `README.md` at `.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/` explaining:
- What these files are (frozen snapshots from Spec 094 completion)
- Why they're preserved (historical record of pre-migration generator output)
- Why the regression test was retired (post-migration legitimate additions, not regressions)
- Usage guidance for future Spec 094 archaeology
- Do-not list (don't re-enable the test, don't update to match current, don't delete)

**Rationale for preservation over deletion**:
- Location already implies historical purpose (under Spec 094's spec directory)
- Discoverable record — git history alone doesn't surface pre-migration output for investigators
- Zero ongoing cost — 8 static files under 50KB, no build or test overhead
- Consistent with Spec 101's governance principle that historical narrative artifacts are intentionally preserved

---

## Problem

On 2026-05-06, Spec 101 Task 1.6 retired `src/generators/__tests__/snapshots/pre-migration-regression.test.ts` because post-Spec-094 token additions (`blend/pressedLighter`, `blend/focusSaturate`, etc.) caused the `DesignTokens.figma.json` assertion to fail against a frozen pre-migration snapshot. The `@category evergreen` annotation was incorrect — the test's purpose (guard Spec 094 migration from producing divergent output) was fulfilled when Spec 094 completed.

With the test retired, the fixture files at `.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/` are now **orphaned**:

```
.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/
├── ComponentTokens.android.kt
├── ComponentTokens.ios.swift
├── ComponentTokens.web.css
├── DesignTokens.android.kt
├── DesignTokens.dtcg.json
├── DesignTokens.figma.json
├── DesignTokens.ios.swift
└── DesignTokens.web.css
```

Nothing references them. They're still under version control, taking up space and creating ambiguity about their current role.

## The Retire-or-Preserve Question

Two legitimate framings, each with merits:

**Retire**: Delete the fixtures. They were tooling for a test that no longer exists. Dead weight now. Git history preserves them if anyone needs to see what "pre-migration" output looked like.

**Preserve**: Keep the fixtures as historical documentation of what generator output looked like before Spec 094 migration. They live in the Spec 094 spec directory (not the general repo), so their location implies "artifacts of Spec 094" — a reasonable permanent record. Future agents exploring the Spec 094 migration for context can diff against current output to see what changed.

My lean (Ada): **Preserve with an annotation.** Add a `README.md` in `.kiro/specs/094-.../fixtures/pre-migration/` explaining: "These are frozen snapshots of generator output at the completion of Spec 094. The regression test that asserted against them was retired in Spec 101 Task 1.6 when legitimate post-migration token additions created unavoidable drift. Preserved for historical reference."

Thurgood's call — governance boundary decision.

## Context from Spec 101

During Task 1.6's fresh rebuild and `figma:push --dry-run` regeneration, the newly-produced `dist/DesignTokens.figma.json` contained legitimate post-Spec-094 token additions that the frozen snapshot in fixtures/ did not. The assertion test failed not because anything regressed, but because its comparison target had been superseded by legitimate subsequent work.

Peter authorized Option C (retire the full test file) on 2026-05-06 after evaluating three options:
- A. Accept the test failure and log follow-up (minimum scope, risks red-build precedent)
- B. Skip the single figma.json assertion inside the test (surgical, leaves the file partially alive)
- C. Retire the entire test file (cleanest — the whole test suite has served its purpose)

Option C was chosen because all 8 snapshot assertions were post-Spec-094 dead weight, not just the figma one. But retiring the test leaves the 8 fixture files orphaned — that's what this issue tracks.

## References

- Spec 101 (Package Publish Readiness) — Task 1.6 completion doc
- Commit `be653848` — Task 1.6 Complete: Fresh rebuild and verify dist/ is clean (retired `pre-migration-regression.test.ts`)
- Spec 094 (Portable Pipeline and Theme Registry) — fixtures originated here
