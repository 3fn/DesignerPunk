# Spec 094 Pre-Migration Fixtures

**Status**: Preserved for historical reference
**Date Retired from Active Use**: 2026-05-06 (Spec 101 Task 1.6)
**Governance Decision**: 2026-05-07 (Thurgood, per issue `2026-05-06-spec-094-pre-migration-fixtures-orphaned.md`)

---

## What These Files Are

These eight files are frozen snapshots of token generator output captured at the completion of Spec 094 (Portable Pipeline and Theme Registry):

- `ComponentTokens.android.kt`
- `ComponentTokens.ios.swift`
- `ComponentTokens.web.css`
- `DesignTokens.android.kt`
- `DesignTokens.dtcg.json`
- `DesignTokens.figma.json`
- `DesignTokens.ios.swift`
- `DesignTokens.web.css`

They represent the pre-migration baseline against which Spec 094's regression test (`src/generators/__tests__/snapshots/pre-migration-regression.test.ts`) asserted to guard against Spec 094 producing divergent output during migration.

## Why They're Here and Not Deleted

The regression test was retired on 2026-05-06 during Spec 101 Task 1.6 when legitimate post-Spec-094 token additions (`blend/pressedLighter`, `blend/focusSaturate`, etc.) caused the `DesignTokens.figma.json` assertion to fail against this frozen baseline. The test's purpose — guarding Spec 094 migration — had been fulfilled when Spec 094 completed; post-migration token additions were valid evolution, not regressions. Peter authorized retirement of the full test file on 2026-05-06 (commit `be653848`).

With the test gone, these fixtures became orphaned — still under version control, but with nothing consuming them.

**The retire-or-preserve governance call** (2026-05-07): preserve, with this annotation.

**Rationale**:

1. **Location already implies historical purpose.** These live under `.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/` — the Spec 094 spec directory. That location already says "artifacts of Spec 094's work." Preserving them here is consistent with how other historical spec artifacts are treated.

2. **Discoverable historical record.** Git history alone doesn't surface what "pre-migration generator output" looked like unless someone knows to go looking. Preserved files with this README make the historical record explicit and easy to find.

3. **Zero ongoing cost.** Eight static files under 50KB combined. No build or test overhead; they just exist. The cost of preservation is trivial compared to the occasional investigator value.

4. **Consistent with Spec 101's governance principle.** Spec 101 established that historical narrative artifacts (spec directories, release notes, completion docs) are intentionally preserved as-is, even when they contain content that wouldn't pass current validation (e.g., the `@designerpunk/core` references in pre-reconciliation specs). These fixtures follow the same pattern — they're historical, and their historical nature is the point.

## How to Use These (If You Ever Need To)

If a future investigator is looking at Spec 094's migration and wants to see what generator output looked like before the migration landed:

```bash
diff .kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/DesignTokens.web.css dist/DesignTokens.web.css
```

The diff will show a mix of:
- Spec 094 migration changes (original purpose of the comparison)
- Post-Spec-094 legitimate additions (e.g., `blend/pressedLighter`)
- Potentially later changes (anything that shipped after Spec 101)

Read diffs with that context — these fixtures are frozen at a specific historical moment, not a rolling baseline.

## EXCLUDED from any generated-token-output guard

**Added 2026-09-14 (Ada, disposition F-3).** These files are committed *generated token outputs* by construction, so any future guard over "committed generated token outputs" — a regenerate-and-diff check on the Spec 122 diff-guard pattern, for example — would **RED on every one of them**, and a well-meaning author would then "fix" them by regenerating, destroying the only thing they are for.

**Any such guard MUST carry this path as an explicit exclusion.** The exclusion is recorded in the ratified register row `governance/classification-map.md § "never-hand-edit-generated-token-outputs"` (scope entry: *deliberately-frozen spec fixtures*, `disposition: none`, `check_state: none`), and is repeated here so it is visible at the files themselves rather than only in the register.

Related: `.kiro/issues/2026-09-13-docs-tokens-css-stale-published.md` (F-3).

## Do Not

- **Do not re-enable `pre-migration-regression.test.ts`** — it will fail against any current output because legitimate post-migration changes have accumulated. The retirement was the correct call.
- **Do not update these files to match current output** — that would erase their historical value. Their whole point is being a snapshot of a specific moment.
- **Do not delete them** — that would erase a recorded historical reference that someone may need for Spec 094 archaeology.

## References

- **Spec 094** (Portable Pipeline and Theme Registry) — origin of these fixtures
- **Spec 101 Task 1.6** — retired the regression test that referenced them (commit `be653848`)
- **Issue `2026-05-06-spec-094-pre-migration-fixtures-orphaned.md`** — the retire-or-preserve decision that resulted in this README
