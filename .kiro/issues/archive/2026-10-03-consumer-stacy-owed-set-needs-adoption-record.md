# Issue: the consumer Stacy charter's owed-set query exits FATAL without `docs/claims-pass-adoption.md`, and nothing in a born repo creates that file

**Date**: 2026-10-03
**Status**: FIXED — closes at the merge of the PR from `fix/c3-c4-h4-served-text` (§ "Fixed (2026-10-18)"); archive at the next walk (rule 5). *(Was: ACTIVE.)*
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

---

## Fixed (2026-10-18)

**Signed: Stacy (co-owner, overlay text), 2026-10-18.** I wrote the text. Thurgood applied it byte for byte on `fix/c3-c4-h4-served-text` under F12′, because I re-sign the row in the same range. The record closes at that PR's merge.
- **Authority**: Peter's ruling of 2026-10-17 (`.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md` row 28 (2)): fixed before release-5 phase 1, Stacy writes the text. Peter's go for this shape on 2026-10-18 ("proceed as recommended") reached me through the orchestrator's brief. The record of that go is the orchestrator's, not this file.
- **The shape: this record's option 3, with two refinements.** Without an adoption record, the query takes the day `designerpunk.manifest.json` was first committed on the first-parent line. That is the repository's DesignerPunk birth, not its first commit. It prints which source it used. If neither exists, it stops with a named remedy (option 2's message) instead of `FATAL`. The adoption record still wins when a team keeps one. The prose discloses that the default starts too early for a repo that got this charter by upgrade, and says how to set the real day.
  - **Not option 1 (scaffold)**: it is a cross-seat CLI change (`src/cli/init.ts`, the manifest entry, the commit policy, tests), and it does not reach repos already born on 16.0.0. The query fix reaches them when their agent files are next regenerated from a release that carries it.
  - **Not the repo's first commit (option 3 as written)**: a repo that had history before DesignerPunk would date adoption before DesignerPunk existed in it. The manifest is the one DesignerPunk-specific file every born repo commits (`docs/consumer/COMMIT-POLICY.md`, the commit column).
- **The text**: `canonical/profiles/consumer/stacy.overlay.md` L104 (the adoption-day sentence) and L108–113 (the date resolution). `grep -c FATAL` on the overlay is `0`. The canonical unit and its pin (`sha256:e3f6f82a…`) did not move. The three consumer renderings under `canonical/_consumer-output/` were regenerated.
- **Verified (falsification runs of the patched query, in scratch git repos, git 2.50.1)**:
  - (S1) a born repo, manifest in the root commit, no record: `adopted on: <birth day> (from designerpunk.manifest.json, first committed)`, and a same-day later spec is kept (the midnight pin holds).
  - (S2) a record is present: the record's date is used.
  - (S3) specs committed, manifest not committed: the named-remedy `STOP`, exit 1.
  - (S4) manifest added on a branch and merged `--no-ff`: the merge's date, not the branch commit's, and a pre-DesignerPunk spec is excluded.
  - (S5) manifest rewritten later by `sync`: still the first-add date.
- **Re-signed**: one row (`stacy.dispositions.yaml` `#the-owed-set-pipeline-…`), assent 14/14, renderedHash moved, canonicalHash unchanged, no re-confirmation. The signature sheet carries the act.
- **Not dragged**: `tools/agent-generator/__fixtures__/g1-renderings/run1.E.…txt` is pinned to the G1 run-1 record's blob, and `__fixtures__/semantics-guard/…/semguard.overlay.md` to the G1 E rendering. Neither reads the live overlay, and both keep the old text as history. `tests/onboarding-trio/fixtures/born-{cc,kiro}` carry the old rendering as committed founder repos. No test asserts their content against the generator.
- **The surviving counter**: the default cannot know when this charter reached a repo, only when DesignerPunk did. For a repo born before the charter shipped, it over-lists specs until the team writes the record. That is the visible-number direction, and it is disclosed where the reader meets it. A shallow clone dates the manifest at the graft and under-lists, but every stage of the query already needs full first-parent history.
- **Found while fixing, not fixed here**: the query lists every spec touched since adoption that lacks `claims-pass.md`, including specs whose final unit has not merged. So a fresh born repo prints its two starter specs (`ci-needs`, `regrounding`) as `OWED` on day one. That behaviour predates C-4 and is shared with this repo's own query. It is reported to the orchestrator for a home.

## Archived (2026-10-20)

*Signed: Thurgood (Civitas steward), archived by the steward, early walk act, Peter's go 2026-10-20 ("Go on the records PR with the class option and resolving F-1 and F-2, please", chat, relayed by the orchestrator); README rule 5, "otherwise at the next health-check walk".*

- **Outcome**: the fix (§ "Fixed (2026-10-18)") merged as #412, `05d039348` (2026-10-19), before release-5 phase 1 (`release:next:phase-1` not yet fired). The outcome above is the owners' (Stacy, overlay text); this line adds only the merge SHA. The "found while fixing" over-listing lives at `2026-10-18-owed-set-query-lists-specs-before-final-unit-merge.md` (archived in this same sweep) and its P3 residual `2026-10-19-owed-set-query-over-lists-in-progress-specs.md` (root). Moved to `archive/` by `git mv` in the same commit as this line.
