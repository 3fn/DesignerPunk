# Grant: `floor-closure.json` for the 16.3.0 release PR (the dry run refuses it as stale)

**Date**: 2026-11-09
**Owner**: Thurgood (the 16.3.0 release author)
**Trigger**: `merge:#852` — the 16.3.0 release PR, whose merge closes this record and ends the grant (README rule 8).
**Class**: P2 obligation (guard) · grant *(set 2026-11-09, Thurgood, rule 12. The publish path's own guard refuses the candidate until the file is current, so the release cannot proceed without this act.)*
**Source**: `npx tsx scripts/release-publish.ts --dry-run 308408140e59b0778a63d244e33eae3ac56bd484` (the release branch's pushed head), RELEASE-FLOW step 2 and 5.1. It refused with "floor-closure.json is stale: regenerated at this commit, it differs from the committed file (generatedAt aside). Run `npx tsx scripts/floor-closure.ts`, commit the result, and cut the release from that commit."
**Consulted**: Ada — owner of `scripts/floor-closure.ts`, whose output this file is; to confirm on the activating PR

---

**Grant paths**: `floor-closure.json`

## The act

- **What**: commit the output of `npx tsx scripts/floor-closure.ts` at the release branch's head, unedited. The regenerated file differs from the committed one in `filesChecked` and `seedFileCount` (54 → 55) and in `generatedAt`. No path in its closures changes.
- **Why it moved**: the file dates from #215 (Spec 123 U1). Spec 129 Task 13 added the six component-token definition files to `files[]`, and the floor's seed set counts `files[]` source entries. No PR in that window regenerated the file.
- **Where**: on `release/16.3.0` (#852), the fixing PR. The trio's candidate is packed from that PR's head (protocol § 17.1, "the batching PR's candidate"), so the file need not land on `main` first.
- **Not in this grant**: `scripts/floor-closure.ts` and its test, which are Ada's and unchanged.

## Activation, expiry and close

- **Activation**: Peter's merge of the record-only PR that adds this file.
- **Expiry**: #852's merge.
- **Close**: #852 adds rule 5's dated outcome line here and moves this file to `archive/` in the same PR.

## Outcome (2026-11-09)

Closed by its fixing PR, #852 (`release/16.3.0`), under rule 5. Thurgood.
- **The act**: `npx tsx scripts/floor-closure.ts` was run at the release branch after merging `main` (`de4ae81e0`), and its output committed unedited. `filesChecked` and `seedFileCount` move from 54 to 55, and `generatedAt` moves from `2026-09-26T23:23:20.952Z` to the run time. No closure path changes.
- **In the list**: the one path the grant names, `floor-closure.json`. `scripts/floor-closure.ts` and its test are untouched.
- **No ARMING line**: no `.github/**` path.
