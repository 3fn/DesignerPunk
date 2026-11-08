# Grant: the root `package.json`'s `postpublish` key, for Ada, to retire the dead script (row (h))

**Date**: 2026-11-08
**Owner**: Ada, who is also the grantee. `scripts/release-publish.ts` and the publish path are in her standing scope, and row (h) was hers in the parent record. The owner and the grantee are one seat, as in the earlier `package.json` grants.
**Filed by**: Ada, under README rules 8 and 10, for the fixing PR of `.kiro/issues/2026-11-01-retire-postpublish-row-h.md` (that record's "The fix", step 1: "the PR needs a grant record naming it, filed before that PR"). The disposition is "fix-now by 16.3.0's S", ruled under Peter's delegation `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`, and carried in Thurgood's release triage, relayed by the orchestrator, 2026-11-08. Rule 9 applies to every later edit.
**Class**: P2 obligation (record) · grant *(set 2026-11-08, Ada, rule 12. The script runs on no permitted path, so no reader is misled by the key itself; the false text is RELEASE-FLOW's, which Thurgood corrects.)*
**Trigger**: `release:16.3.0:phase-1` — the same event as the record it serves. `merge:#<N>` is not written because the fixing PR does not exist yet. The fixing PR closes the row-h record with rule 5's outcome line, and this grant archives at that PR's merge (rule 5).

---

## What the grant is for

Remove the `postpublish` key from `package.json` (L213 at `5386f93ba`: `"postpublish": "git diff --quiet token-index/ || echo '⚠️  token-index/ changed during publish …'"`). It is dead: a tarball publish runs no lifecycle scripts, and a folder publish is refused by `prepublishOnly` before `postpublish` would run (row-h record, "What is owed").

`git grep -n postpublish -- scripts src tests` at `5386f93ba` finds no reader and no test that pins the key. The only references are in `.kiro/hooks/RELEASE-FLOW.md` (L10, L162, L254) and in records.

## The RELEASE-FLOW half is not this grant

RELEASE-FLOW is Thurgood's file and a governance path. His edit to L162 and L254 is a CORRECTION that cites the fixing PR as the truth, made on his seat branch and joined to the fixing PR. This grant covers no governance path.

**Grant paths**: `package.json`, `.kiro/issues/2026-11-08-package-json-postpublish-key-grant.md`

- **Grantee**: Ada, this record's owner.
- **Limit**: in `package.json`, the `scripts.postpublish` key only. Any other byte of the file is outside the list. The record path is listed so that the fixing PR can archive it (rule 5). The fixing PR also edits `.kiro/issues/2026-11-01-retire-postpublish-row-h.md`, which is in Ada's standing scope (`.kiro/issues/**`) and needs no grant.
- **Fixing PR**: branch `fix/retire-postpublish`. It cites this path list, and it is diffed against the list as it stood at the activating merge (rule 8).
- **Activation**: Peter's merge of the PR that files this record, whose body names this section (rule 8). The grant expires at the fixing PR's merge.
- **Not a governance-law path, and not `.github/**`**: no ARMING line or `**Deleted lines**:` block is owed.
