# Issue: the consumer Stacy charter's owed-set query exits FATAL without `docs/claims-pass-adoption.md`, and nothing in a born repo creates that file

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**:
- **Stacy** for the overlay text: `canonical/profiles/consumer/stacy.overlay.md`.
- **Thurgood** for the consumer profile: `canonical/consumer-profile.yaml`, and whatever `init` or the profile scaffolds.

**Trigger**: **the first consumer-profile PR after Spec 123 U3 merges.**
**Source**: Stacy's seam finding, raised during the Spec 123 U3 owner reviews (2026-10-03) and relayed by the orchestrator. This record is drafted by Ada at the orchestrator's request. Ada's own verification is marked below; this is not Ada's domain.

---

## The gap

**VERIFIED by Ada's reading at `ea348aa76`:**
- `canonical/profiles/consumer/stacy.overlay.md:108` sets `ADOPTION=docs/claims-pass-adoption.md`.
- `:109` reads the date with `grep -m1 '^Adopted: '`.
- `:110` exits with `FATAL: no adoption date in $ADOPTION` if no date was read.
- No file named `claims-pass-adoption` exists in this repo's tracked tree (`git ls-files`).
- No file under `src/`, `scripts/`, `tools/` or `canonical/consumer-profile.yaml` mentions it, apart from two generator test fixtures:
  - `tools/agent-generator/__fixtures__/g1-renderings/run1.E.…txt:7`;
  - `tools/agent-generator/__fixtures__/semantics-guard/…/semguard.overlay.md:8`.
- So nothing that `init` or the consumer profile writes appears to create it.

**Derived, not run.** In a born repo, the documented query prints a grep error for the missing file and then the FATAL line, before reporting any owed spec. The query is shell in a charter, not a committed script.

**Unverified by Ada:**
- That `init` writes no `docs/` adoption file by any other path. I read `git grep` results, not `init`'s full scaffold.
- Whether the consumer Stacy charter elsewhere tells the user to create the file. I read only `:100-115`.
- Stacy's and Thurgood's own runs, if any.

## Fix shape (not done here; for the owners)

Choose one:
1. **Scaffold it.** `init` (or the consumer profile) writes `docs/claims-pass-adoption.md` with an `Adopted: <birth date>` line.
2. **Instruct it.** The overlay tells the user, or the agent, to create the record on first use. The query's FATAL message names that step.
3. **Default it.** With no record, the query treats adoption as the repo's first commit date and says so.

The pick is the owners', with Peter's go.

## Grant paths

None proposed. `canonical/**` is governance surface and changes through the ballot or charter process. If option 1 touches `src/cli/init.ts`, its owner names that grant when the PR opens.

**No fix is authorized by this record.**
