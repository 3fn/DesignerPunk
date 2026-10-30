# Grant: the root `package.json`'s `prepublishOnly` message, for Ada, because it prints a publish command the script refuses and omits the 5.4 mode

**Date**: 2026-10-29
**Owner**: Ada, who is also the grantee. Her `scripts/release-publish.ts` is the command the message names (ballot `2026-10-17-standing-write-scope-six-roots` § 2.2), so the owner and the grantee are one seat, as in the earlier release grants.
**Filed by**: Thurgood, under README rule 10, on Peter's ruling of the `package.json` fork. Chat, relayed by the orchestrator, received before 2026-10-29T23:42:52Z, verbatim: *"Let's go with your lean of (i) and be sure that this issue and the similar one surfaced earlier are tracked with a captured POSSIBLE solution in 131 (possibly as an inbound)."* Option (i) is this record: a per-instance grant over the root `package.json`, for one string. The class half of his ruling is `.kiro/specs/131-governance-simplification/inbound-from-2026-10-29-unowned-paths.md`, filed in the same PR. Rule 9 applies to every later edit.
**Class**: P2 obligation (record) · grant *(set 2026-10-29, Thurgood, rule 12, as filer; the owner may re-class it. The message is a known falsehood in a packed file, `package.json`, which a package reader meets through none of the P0 surfaces. So M7's O-18 makes it P2 `(record)` or P3, never P0. I chose P2 over P3 because the falsehood ships in every tarball until it is fixed, and the next release's walk should see it. I chose `(record)` over `(guard)` because the tripwire still works: a folder publish exits 1. Only its advice is wrong, and the advised command fails closed, with the script's own usage line, so nobody is led into a wrong publish.)*
**Trigger**: `release:next:phase-1` — the next release's S. A P2 that would ride another change takes this token (rule 1); `merge:#<N>` is not written because the fixing PR does not exist yet. The fixing PR, branch `fix/package-json-prepublishonly-message`, closes this record with rule 5's outcome line in the same PR (rule 11), and a grant archives at its fixing PR's merge (rule 5), so the record lapses at that S only if the fix has not merged by then.

---

## What is wrong

The string, at `cf902a1b2` (`package.json` L202, `scripts.prepublishOnly`):

> `✖ Folder publish refused. @3fn/core is published ONLY as one tarball built in a fresh clone at the tag: npx tsx scripts/release-publish.ts <version> (dry run: --dry-run <S>). See .kiro/hooks/RELEASE-FLOW.md step 5 and ballot 2026-10-03-hermetic-publish-path.`

- **It prints a publish command that the script refuses.** `release-publish.ts <version>` without `--expect-sha <S>` is refused: `usage: release-publish.ts --dry-run <S> | <version> --expect-sha <S> [--source <url>] [--keep] | --npmjs <record> | --census [--source <repo>]` (`scripts/release-publish.ts` L156 at `cf902a1b2`).
  - **When it became false**: at #373 (`7f8e06530`, 2026-10-15), which made `--expect-sha` required. The message dates from #279 (`762b8c209`), and at #279 `--expect-sha` was optional (that commit's usage line: `<version> [--source <url>] [--expect-sha <S>] [--keep]`). So it was true when written and has not been updated since. The orchestrator's brief dated it to #279; the git history above corrects that.
- **It omits the 5.4 mode.** Since #560 (`ef7fcee92`), RELEASE-FLOW 5.4 is `npx tsx scripts/release-publish.ts --npmjs <record>`, and the message names no path to public npm.

## What the string must say

The referent is the script's own usage, at the fixing PR's base:
- **5.1**, the dry run: `npx tsx scripts/release-publish.ts --dry-run <S>`;
- **5.3**, the publish: `npx tsx scripts/release-publish.ts <version> --expect-sha <S>`;
- **5.4**, public npm: `npx tsx scripts/release-publish.ts --npmjs <record>`;

with the same pointers to RELEASE-FLOW (§ "The sequence", steps 5.1, 5.3 and 5.4) and ballot `2026-10-03-hermetic-publish-path`. The wording is Ada's. If the script's usage changes before the fix lands, the string follows the usage at the fixing PR's base.

- **No test pins the string**: `git grep -n "Folder publish refused"` at `cf902a1b2` finds it only in `package.json`, plus one quoted transcript.
- **The quoted transcript stays**: `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md` L317 is a ledger, and ledgers keep superseded text (ballots README § "Conventions", "Superseded text").
- **No Edit-kind line, no ballot**: `package.json` is not a governance path (Task-Completion-Protocol § "Branch and PR Conventions", "Edit kind"), so the fixing PR is EXECUTION-grade.

**Grant paths**: `package.json`, `.kiro/issues/2026-10-29-root-package-json-prepublishonly-grant.md`

- **Grantee**: Ada, this record's owner.
- **Limit**: in `package.json`, the value of `scripts.prepublishOnly` only. Any other byte of the file is outside the list. The record path is listed so that the fixing PR can add the outcome line and archive the record (rule 5).
- **Fixing PR**: branch `fix/package-json-prepublishonly-message`. It cites this path list, and it is diffed against the list as it stood at the activating merge (rule 8).
- **Activation**: Peter's merge of the PR that files this record, whose body names this section (rule 8). The grant expires at the fixing PR's merge.
- **Not a governance-law path, and not `.github/**`**: no ARMING line or `**Deleted lines**:` block is owed.

## The class this is an instance of

**The root `package.json` has no standing owner.** Ballot `2026-10-17-standing-write-scope-six-roots` § 2.3 gives Ada `mcp-server/package.json`, and nothing gives anyone the root file. A grep of every `canonical/agents/*.md` at `cf902a1b2` finds root `package.json` only as `source: package.json` command provenance, never in a `writeScope`. So every touch to it costs a grant record like this one. Peter's ruling routes that class to Spec 131 as a captured possible solution: `.kiro/specs/131-governance-simplification/inbound-from-2026-10-29-unowned-paths.md`, instance (a). This record fixes the instance only.

**Consulted**: Ada — the orchestrator relayed her read that `package.json` is outside her standing scope, which this record confirms; the bytes are hers to write under the grant.

*2026-10-30 (Ada), outcome:* PR #564 (`0aaddd4f0`) rewrites the `scripts.prepublishOnly` value: the tripwire names the script's three publish-path commands (5.1 `--dry-run <S>`, 5.3 `<version> --expect-sha <S>`, 5.4 `--npmjs <record>`), pointers to RELEASE-FLOW step 5 and ballot 2026-10-03-hermetic-publish-path kept, `process.exit(1)` unchanged; the grant is spent; the record closes at #564's merge and is archived in it (rule 5).
