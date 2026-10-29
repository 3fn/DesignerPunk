# The publish rail's recorded bites cover neither its version-mismatch branch nor its network-error branch, and the bite named for the mismatch records a 404

**Date**: 2026-10-27
**Owner**: Ada (`scripts/verify-publish-rail.sh` and `scripts/__bites__/**` are in her standing write scope, ballot `2026-10-17-standing-write-scope-six-roots` § 2.6). **Consulted**: Thurgood, the owner of register row `publish-rail-guard`, whose `census` field says a changed verdict "is shown by its recorded bites".
**Filed by**: Ada, under README rule 10, on Peter's rulings on the batch ballot `2026-10-26-release-flow-batch-16-1` (PR #528), which are the "go" named in its § "Plans", P5. The finding was first stated in [ADA R3] item 1 on that ballot. Read at `origin/main` `08b9c7a8e`. Rule 9 applies to every later edit.
**Class**: P2 obligation (guard) · defect *(set 2026-10-27, Ada, rule 12. The guard decides correctly on every branch as written; what is weaker than its claim is the evidence. Two of its three exit-10 branches have no recorded bite, and a reader who goes by file names is told a third is covered. No consumer is blocked, and no release claim is false, because every step-6 record shows a PASS.)*
**Trigger**: `release:next:phase-1` — closes when the bite PR below merges. It becomes `merge:#<N>` when that PR opens (rule 1). *(Set 2026-10-27, Ada, rule 9. A P2 record takes a git-visible token. The next release's step 6 is the next run of the rail, so a release with this record open runs on a guard whose two branches are still unbitten.)*

---

## What is wrong

`scripts/verify-publish-rail.sh` (at `08b9c7a8e`) exits 10 on three separate branches:

| Branch | Lines | Recorded bite |
|---|---|---|
| network error: `curl` exits non-zero | L76–L77 | **none** |
| HTTP status other than 200 (a 404 included) | L80–L83 | `bite-2-version-mismatch-exit10.txt`: a real 404 for `VERSION=99.99.99` (its header says so) |
| 200, but the body's `version` differs from `VERSION` | L85–L93 | **none** |

The other branches are bitten: exit 11 (`bite-3-host-shim-exit11.txt`), exit 12 (`self-test-host-exit12.txt`), exit 13 (`empty-url-branch-exit13.txt`, by the `fake-curl-empty-tarball` PATH shim), exit 2 (`bite-4-unset-version-exit2.txt`), and PASS (`pass-real-version.txt`).

So:
- **(a)** the mismatch branch and the network-error branch have never been shown to bite;
- **(b)** `bite-2`'s name claims the mismatch branch, and its content is the HTTP-status branch.

## Fix

One bite PR in Ada's scope, Thurgood consulted on the row's `census` text if it changes:
1. **The mismatch bite.** A new PATH-shimmed `curl` (the `fake-curl-empty-tarball` pattern) that returns HTTP 200 with a body whose `version` differs, recorded as its own file with an honest name, exit 10, and the mismatch message.
2. **The network-error bite.** A shimmed `curl` that exits non-zero, recorded the same way, exit 10, with the "could not reach" message.
3. **`bite-2` keeps its file name.** Spec 123's `requirements.md` L246 and three of its completion docs cite it, and the batch ballot's E1 re-records it under that name. Its header is amended to say it bites the HTTP-status branch, not the mismatch, and the mismatch is pointed to the new file.
4. **`shellcheck.txt`** gains the two new shims.

**Order with #528.** The batch ballot's E1 re-records `bite-2` (its message changes to the two readings of an absent `time["<version>"]`). This PR lands after E1, or carries E1's re-record if E1 has not merged, so the two do not record `bite-2` twice with different headers.

## Counter-argument

Both branches are a few lines of plain shell, read by the shipping PR's reviewers, and no release has reached either. A bite for each adds two fixtures to keep current. *What survives*: the row's `census` field rests the guard's verdicts on its recorded bites, and two of its verdicts have none. That is the gap between the claim and the evidence this record exists to close, however small the branches are.

*Signed: Ada, 2026-10-27.*
