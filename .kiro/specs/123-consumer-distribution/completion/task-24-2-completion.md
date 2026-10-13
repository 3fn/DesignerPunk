# Task 24.2 Completion: B-U4 record-first; ratified edits

**Date**: 2026-10-13
**Agent**: Thurgood (Opus), PRIMARY on Task 24
**Branch**: `task/123-u4-content` (head at writing: `fd18cab72`)

## What changed

- **B-U4** (`.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md`):
  - drafted as U4's first content commit (`757803488`);
  - brought to its ruled form in `bdfdc9951` (record `completion/u4-rulings-2026-10-13.md`, `67587cf49`: form r1, fork (B), F-1/F-2 granted, R-1/R-2 confirmed). `**Status**` stays DRAFT until Peter's merge of the U4 PR (r1).
  - This subtask aligned § 3 item 2 and § 6 to ruling 6's settled wording: the two declared docs sit outside the predicate's guard and its `N match; N carry` claim, and their presence is asserted by a separate, scoped declared-list test. The bare word "unguarded" is dropped.
- **`tasks.md`**: Task 23 criterion 3's amendment note gets the same wording alignment (L1456).
- **`governance/release-management-system.md`**: B-U4 § 5 applied verbatim, every hunk below the L11 banner:
  - R-1 (step 4: the consumer `CHANGELOG.md` entry, L40);
  - R-2 (new step 6: the onboarding trio re-run, L42);
  - R-3 ("Discovering What Changed" item 2 gains `CHANGELOG.md`, L49);
  - R-4 (`Last Reviewed` / `Last Updated` set to 2026-10-13, L14–15).
- **`.kiro/hooks/RELEASE-FLOW.md`**: F-1 (step 2 names the release notes and the consumer CHANGELOG entry, L118) and F-2 (the onboarding-trio item in "Deriving the delta", L31), verbatim. This file entered Task 24's Primary Artifacts by ruling 2.

## Targeted tests and result

- **STRAGGLER sweep** (`grep -n -F -x <after-text> <file>`, one per edit site, after-texts read programmatically from B-U4 § 5's blockquotes):

```
R-1: grep -n -F -x <after-text> governance/release-management-system.md -> 1 hit(s) at L40
R-2: grep -n -F -x <after-text> governance/release-management-system.md -> 1 hit(s) at L42
R-3: grep -n -F -x <after-text> governance/release-management-system.md -> 1 hit(s) at L49
F-1: grep -n -F -x <after-text> .kiro/hooks/RELEASE-FLOW.md -> 1 hit(s) at L118
F-2: grep -n -F -x <after-text> .kiro/hooks/RELEASE-FLOW.md -> 1 hit(s) at L31
R-4: grep -n -F -x '**Last Reviewed**: 2026-10-13' governance/release-management-system.md -> L14
R-4: grep -n -F -x '**Last Updated**: 2026-10-13' governance/release-management-system.md -> L15
```

  Each site has exactly one hit. The R-1, R-3 and F-1 before-texts were replaced in place, and the apply step asserted each occurred exactly once before replacing.
- **Separability (B-U4 § 2, shared file; Task 24 instruments O-4)**: `git show -U0 --format= fd18cab72 -- governance/release-management-system.md` → one hunk, `@@ -11 +11 @@` (23.2's banner). This subtask's hunks in that file are `@@ -14,2 +14,2 @@`, `@@ -40 +40 @@`, `@@ -41,0 +42 @@` and `@@ -48 +49 @@`, all below L11. No hunk falls in the other parent's range.
- **B-U4 § 2 ordering instrument (r1)**: run over the U4 governance-text commits so far.

```
$ git merge-base HEAD origin/main
8007105faed01868347a537bced9be44cd2e2865
$ git rev-list --no-merges $(git merge-base HEAD origin/main)..HEAD -- 'governance/*.md' .kiro/hooks/RELEASE-FLOW.md
fd18cab72d22dd5cc5e1d8fc7a1f21d88007458f
$ git merge-base --is-ancestor 757803488 fd18cab72; echo $?
0
```

  This subtask's own commit does not exist at writing, so its line is owed: the same `--is-ancestor 757803488 <24.2 commit>` check runs at Task 24's close (24.3), over the full governed set.
- **No code tests**. The edits are doc text. The docs-MCP `rebuild_index` after U4's merge, and `node scripts/validate-steering-metadata.js` on the edited doc, are owed post-unit (Task 24 instruments N1).

## Application-time adaptations

- **R-2 and F-2 are new list items**, inserted directly after step 5 (`release-management-system.md`) and after item 5 of "Deriving the delta" (`RELEASE-FLOW.md`). Their B-U4 site lines ("a new step 6 after L41"; "a new item after item 5 (L30)") hold at `8007105fa`, because 23.2 did not change the line count above them (its banner stayed on L11).
- **The wording alignment** for the declared two-doc band is applied to `tasks.md` and B-U4 only. `predicate.ts` and Task 23's docs are the Task 23 seat's.
