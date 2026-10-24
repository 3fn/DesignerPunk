# Issue: deprecate Container-Base's native `borderColor = "color.border.default"` alias

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Lina (component API) + Kenya (iOS) + Data (Android)
**Class**: P3 improvement · defect *(set 2026-10-20, Lina, rule 12. Accepted. The alias still exists on native (iOS TokenMapping.swift L205; Android TokenMapping.kt L229 and L343) and not on web, but deprecating it removes a second vocabulary and breaks no consumer; no reader is misled.)*
**Trigger**: `manual` — the PR that adds the native deprecation warning and the README naming `color.structure.border` (iOS `TokenMapping.swift`, Android `TokenMapping.kt`); P3, so `manual` naming its own fixing PR is the form (rule 1). Start condition, prose: the next native Container-Base touch, or the native-component-distribution follow-up (`2026-09-26-native-component-distribution.md`), whichever comes first. This doesn't block Spec 123. *(re-ruled 2026-10-23, Lina, owner, rule 11; reason in the dated line below.)*
**Source**: Container-Base phantom-vars record (`archive/2026-09-26-container-base-phantom-css-vars.md`, "Left open" item 2). Peter deferred it to Spec 123 Task 6's context. Task 6 (Ada) analysed it, and **Peter ruled option (N) on 2026-09-27**.

## The inconsistency

Native Container-Base accepts `borderColor = "color.border.default"` as an alias mapped to `color_structure_border` (Android `TokenMapping.kt`, iOS `TokenMapping.swift`). On web the value passes straight through and would emit `--color-border-default`, which doesn't exist. So the documented alias works on native and not on web. `color.border.default` isn't a registered token name.

## Ruling (N): deprecate on native, don't add on web

- Adding it on web (option W) would keep a second vocabulary alive on a third platform, pointing at a name that doesn't exist. Declined.
- Web TypeScript callers already get a type error for it.
- Task 6 showed the alias has **no effect on the name contract (5A) either way**: on web it's class (iii), consumer-supplied, which 5A deliberately doesn't check.

## Scope

Deprecate the alias on iOS and Android: a warning at use, and docs/README updated to name `color.structure.border`. Plan the removal for a later major. Check whether any product screen or demo uses it.

## Filed by

Steward (main-loop), 2026-09-27, at Peter's direction.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 28, call BACK-FILL (Lina))**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `path:src/components/core/Container-Base/**` · `P3 improvement · defect`.

## Owner line, trigger fired and re-ruled (2026-10-23, Lina, owner; rules 9 and 11)

**Fired at**: branch `fix/schema-token-name-drift-and-consumer-index` (PR number not yet assigned), commit `14281f27b`, which edits `src/components/core/Container-Base/Container-Base.schema.yaml`. The `path:src/components/core/Container-Base/**` token matches any file there, so it fired at that PR's merge.

**Is that edit this record's event? No.** The event this record owes is the native deprecation: a warning at use of `borderColor = "color.border.default"` on iOS and Android, and the README naming `color.structure.border` (Scope above). `14281f27b` renames three `radius:` entries in the schema's `tokens:` list (`radius-050`, `radius-100`, `radius-200` to `radius050`, `radius100`, `radius200`, Ada's drift ruling). It touches no native file, no alias, no README, and does not deprecate anything. This record stays open and unchanged in substance.

**Why the old token was the wrong shape**: `path:` over the whole directory fires on every unrelated Container-Base edit (this one, and any later schema or web change), and a record that lapses at a firing it was never owed would lapse here. Rule 1 says a trigger names the event that owes the close, not a path the work hopes to ride; this P3 would ride a native touch or the distribution follow-up, so it takes `manual`, naming its own fixing PR as the event. **Re-ruled** from `path:src/components/core/Container-Base/**` to `manual` in this commit. Authority: rule 11 (a Trigger-line change in a diff carrying a dated reason) and rule 9 (owner writes it). The record cannot lapse at this PR's merge: this commit, an ancestor of that merge, is the re-ruling. Rule 5 applies later: if this P3 is still unfired at two consecutive walks it is archived stale, and rule 4 brings it back. Class unchanged (P3 improvement · defect).

*Signed: Lina, 2026-10-23.*
