# Issue: the consumer Stacy charter's owed-set query exits FATAL without `docs/claims-pass-adoption.md`, and nothing in a born repo creates that file

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Stacy, Thurgood (owners confirmed as listed below — Peter, 2026-10-17)
- **Stacy** for the overlay text: `canonical/profiles/consumer/stacy.overlay.md`.
- **Thurgood** for the consumer profile: `canonical/consumer-profile.yaml`, and whatever `init` or the profile scaffolds.

**Trigger**: `release:next:phase-1` — fixed before release-5 phase 1 (Peter, 2026-10-17, rulings row 28); re-ruled 2026-10-18, see § "Re-ruled (2026-10-18)". Was: "the first consumer-profile PR after Spec 123 U3 merges" (fired at #337 and lapsed, § "Lapse (2026-10-17)").
**Class**: P0 false-claim · defect
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

---

## Lapse (2026-10-17)

**The trigger fired and lapsed without a fix.** Trigger: "the first consumer-profile PR after Spec 123 U3 merges." **Verified 2026-10-17 by `git log` on `main`:** the U3 onboarding unit merged as #321 (`cdb8296fa`, 2026-10-13); the first PR after it to touch `canonical/profiles/consumer/` was **#337** (`5ac23b74c`, 2026-10-13: Kenya and Data overlays, dispositions and signatures), and the second was **#378** (`51d8273a7`, 2026-10-15: V-PROF, Leonardo and Sparky). **Neither touched `stacy.overlay.md`**, and **#377** (`d0f5d3653`) touched no file under `canonical/profiles/consumer/`. (Earlier consumer-profile PRs #307 and #313, 2026-10-12, may also count, depending on which U3 merge the trigger meant; unverified. The firing PR is #337 on the strictest reading.) `stacy.overlay.md:108` still reads `ADOPTION=docs/claims-pass-adoption.md`; no fix was made, and the record was not walked when the trigger fired. The walk (#379) carried the row as C-4 and shipped 16.0.0 with it.

**Ruled by Peter, 2026-10-17** (`.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md`, row 28): C-4 is false at a consumer agent's reader and shipped in 16.0.0 as a floor miss, a recorded one-time exception. **New deadline: fixed before release-5 phase 1** (no 16.0.1 patch). The fix is a profile PR, Stacy writes the overlay text; the pick among the three fix shapes above remains the owners', with Peter's go.

---

## Re-ruled (2026-10-18)

**Signed: Stacy (co-owner), 2026-10-18** — the back-fill ballot `.kiro/docs/ballots/2026-10-18-obligation-drain-and-release-falsity-floor.md` M2 assigns to me (rule 9: the owner writes the Trigger and Class lines).
- **Authority**: Peter's ruling of 2026-10-17, `.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md` row 28 (2): "C-3 and C-4 are fixed before release-5 phase 1; **no 16.0.1 patch.**" Its fix home names this record and me for the text.
- **The Trigger line**: the old event ("the first consumer-profile PR after Spec 123 U3 merges") fired and lapsed (§ "Lapse (2026-10-17)"). The deadline row 28 set sat only in prose under it, where the walk's grep (RELEASE-FLOW item 3a) cannot see it. The token is now `release:next:phase-1`: per M2, `next` is the first release whose S has this commit as a first-parent ancestor. That is release 5, because this commit lands after 16.0.0's S (`13adf005a`).
- **The Class line, my read as owner (rule 12)**: **P0 false-claim · defect.** The consumer Stacy charter's owed-set query (`canonical/profiles/consumer/stacy.overlay.md` L108–110) points at `docs/claims-pass-adoption.md`, which no born repo has, and so exits FATAL before it reports any owed spec. That is a false statement in an agent charter, which is a surface where a consumer's agent meets it (M7's P0 definition). Row 28 rules it "false at a consumer agent's reader". It is a `defect`, not an `owed-act`, because the shipped text itself is wrong. The fix is the act that is owed.
- **Escalation (rule 11)**: a P0 goes to Peter at its first lapse. Row 28 is that decision: a fixed deadline no later than the next release's S, which is fix-now in rule 11's terms. That mapping is my reading. Peter's words are row 28's, and rule 11 postdates them. A second lapse at release 5's S would return the record to Peter **without** the fix-now option.
- **Still owed**: the fix, a consumer-profile PR. I write the overlay text, and the owners pick among the three fix shapes above, with Peter's go. Nothing here is a fix.
