# Issue: the materiality extractor truncates criteria bodies at in-block prose (D3)

**Date**: 2026-09-26
**Status**: ACTIVE *(2026-10-19, Thurgood, second line: Peter ruled (a) and S6 is applied in PR `chore/ballot-sitting-2-s6-application` — law text and instrument fix together; the class-4 defect is fixed at its merge. The record stays open for one item only, § "Residual: three deeper-heading sections".)* *(Earlier, 2026-10-19, Thurgood: S6 ratified; held at application on the census stop condition; § "S6 held at application (2026-10-19)" and § "Residual: three deeper-heading sections".)*
**Owner**: Thurgood (the `completion-criteria-parity` instrument, Spec 127)
**Trigger**: `path:scripts/completion-claims/materiality.ts` — the next commit that edits the materiality extractor after this re-rule; at that PR the residual's boundary question (§ "Residual: three deeper-heading sections") is decided with the real instrument against the 87 correct stops, or this record is re-ruled. *(Re-ruled 2026-10-19, Thurgood: the prior token keyed the close to "the PR that lands S6", which is the PR carrying this line, and that PR fixes the defect but not the residual, which this record carries open by the ballot's § 6 row 11. The extractor is the surface any boundary decision must change, so its next touch owes the decision. Authority: the owner's Trigger-line right (README rule 9), re-ruled under rule 11 in a diff carrying this dated reason, and Peter's ruling (a) of 2026-10-19 (ballot § 8). The superseded line, verbatim, is the next line.)*
**Superseded trigger (re-ruled 2026-10-19, second; verbatim)**: `manual` — the PR that lands S6: the class-4 pattern-set amendment in `governance/Process-Spec-Planning.md` together with, or before, the code fix (`collectBulletBody`'s class-4 caller, its fixtures and bite, the `--verify-extraction` re-run and the new digest), once the census stop condition below is resolved. *(Re-ruled 2026-10-19, Thurgood: S6 was ratified ("fix now", § 8), but at application its stop condition held (§ "S6 held at application (2026-10-19)" below), so S6's law text did not land in the application PR and the close moves to the PR that lands it. Authority: the owner's Trigger-line right (README rule 9) and ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` (RATIFIED, Peter 2026-10-18/19). The superseded 2026-10-18 Trigger line, verbatim, is the next line.)*
**Superseded trigger (re-ruled 2026-10-19; verbatim)**: `manual` — the capped sitting's ballot (sitting item S6, a rider) merges; the code fix follows it. Written as `merge:#<N>` once that PR is known. *(Re-ruled 2026-10-18, Thurgood: the Q2 sitting fired 2026-10-02 and the check was armed 2026-10-03, so the record's own sentence "the defect bites at arming" is now true of the required gate; `scripts/completion-claims/materiality.ts` has not been touched since #181. Authority: the owner's Trigger-line right (README rule 9), re-ruled under rule 11 in a diff carrying this dated reason, and Peter's routing of 2026-10-18 ("Go on the W-1 records PR and the capped sitting", relayed in the orchestrator's brief; the PR body cites it). The superseded trigger, verbatim:)* **the Q2 sitting OR the next touch of `scripts/completion-claims/materiality.ts`, whichever comes first**
**Class**: P2 obligation (guard) · defect *(set 2026-10-18, Thurgood, rule 12. A required instrument's materiality surface is truncated at in-block prose, so a reworded or deleted criterion after the stop point can read immaterial and skip its declaration; the guard is weaker than its claim. The census (7 legacy blocks in 7 files) bounds today's reach; the direction is the costly one, Req 2.3.4.)*
**Source**: the extraction audit behind the parser fix PR `fix/parity-parser-blank-line-extraction` (found at Spec 123 U1 Task 5). Peter ruled 2026-09-26: D1 and D2 are fixed in that PR; D3 is filed here.

## The defect

`collectBulletBody` in `scripts/completion-claims/materiality.ts` computes the promise surface for the "materially amended" test (Req 2.3). It stops a criteria-label body at the same shapes the strict parser used to stop at:

- a blank line followed by a non-bullet line;
- an indented bold-leading line (a sub-label).

Every bullet after the stop point is missing from the surface. **The parser fix does not touch this module.** C4 is deliberately independent of C2's strict grammar (design C4; Req 2.3.1).

## Why this is the costly direction (Req 2.3.4)

Req 2.3.4 states that "a false-material costs one declaration line; a false-immaterial reopens B4's side door."

A truncated surface can only cause false-**im**material results. If a PR rewords, relaxes or deletes a criterion that sits after the stop point in a legacy file, the canonical-form comparison sees no change. So the amendment gets no criteria-mode declaration, and the file stays legacy. The generous pattern set exists to prevent exactly this.

**Current reach**:
- The amendment duty only fires once the check is armed (Req 2.3.5).
- Until then, the claims pass owns materiality as judgment.
- So nothing is mis-decided today. The defect bites at arming.

## Census (heuristic, recorded not asserted — the corpus moves)

This census corrects the "8 blocks in 6 legacy files" figure from the first audit report. That report came from a census whose filter hid stops at label-shaped lines, so it missed 010 and counted 123's two unfiltered blocks as legacy. The corrected census reads every criteria-label block, runs the extractor's stop rule, and lists every block where bullets resume after the stop point and before a structural boundary. Each stop line was then classified by hand.

- **Blocks scanned**: 904 criteria-label blocks across `.kiro/specs/*/tasks.md` (155 files, `main` at `95bdcc39`).
- **Truncations within criteria, legacy (the materiality population)**: **7 blocks in 7 files**.

| File:label line | Stops at | Bullets lost |
|---|---|---|
| `001-token-data-quality-fix/tasks.md:399` | `Spec is complete when:` (intro prose) | 6 (the whole body) |
| `002-test-infrastructure-fixes/tasks.md:305` | `Spec is complete when:` | 7 (whole body) |
| `003-release-analysis-test-cleanup/tasks.md:186` | `Spec is complete when:` | 5 (whole body) |
| `web-format-cleanup/tasks.md:388` | `Spec is complete when:` | 6 (whole body) |
| `010-container-component/tasks.md:591` | `**Functional Requirements**:` (sub-label) | 5, plus the later sub-groups |
| `011-release-system-test-fixes/tasks.md:476` | `**Critical Success** (Required):` (sub-label) | 13 |
| `012-release-system-test-fixes/tasks.md:207` | `**Critical Success** (Required):` (sub-label) | 12 |

- **The same shape in the declared population**: Spec 123 parents 5, 13 and 26 (`tasks.md` L373, L570, L872). The amendment duty binds only legacy files, and the strict parser now fails these blocks loudly (D1). So they are listed here for completeness only.
- **Classified as correct stops (not defects)**: 87 blocks stop at a separate label that starts a new block:
  - `**Artifacts Created:**` ×47;
  - `**Completion Documentation:**` ×31;
  - `**Post-Completion:**` ×2;
  - one each of `**Estimated Effort**`, `**Artifacts to Review/Correct:**`, `**Implementation Constraint**` (033), `**Critical**` (068, a scope note) and `**Known structural elements:**` (117).

  Telling a sub-label inside a criteria body apart from a new block is judgment. That is why this census is heuristic.

## Fix shape (proposed; owner decides at trigger)

C4 must stay generous and must not import C2's strictness. Candidate: continue a criteria body across non-bullet lines until the next promise-block label, checkbox, heading or thematic break, taking in intervening prose and sub-labels. Over-inclusion is the safe direction for this extractor (Req 2.3.4).

Anything that changes the extracted surface is a change to the ballot's closed, enumerated pattern set (Req 2.3.4 "closed, enumerated verbatim in the law ballot"). That makes it a **recorded amendment**, not a code fix alone:
- re-run `--verify-extraction`;
- record the new digest against the ballot's per-class counts.

**Test**: fixtures for each stop shape above (intro prose, bold sub-label). A reworded criterion after the stop point must read material. Bite: the current `collectBulletBody` must go red on them.

## Triage (2026-10-18)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **Re-verified live**: `collectBulletBody` is at `scripts/completion-claims/materiality.ts` L69 and is unchanged since #181. "Until then, the claims pass owns materiality as judgment" ended at the 2026-10-03 flip; the amendment duty (Req 2.3.5) now fires on a required check.
- **Why a rider and not a code fix first**: the fix changes the extracted surface, which this record already classes as a **recorded amendment** to the ballot's closed, enumerated pattern set (Req 2.3.4), not a code fix alone. The pattern-set amendment is law text and rides the capped sitting's parity-instrument ballot (**item S6, a rider on the sitting-2 ballot, which also carries S3, S4 and S5**). The code fix (the continue-across-prose rule, fixtures for each stop shape, a bite that turns the current `collectBulletBody` red, `--verify-extraction` re-run and the new digest recorded) follows the ballot in its own PR, inside my standing scope (`scripts/completion-claims/**`).
- **Rule 11 note**: see § "Lapse (2026-10-18)" below; the first lapse of this P2 `(guard)` escalates to Peter, and item S6 is the proposed fix-now vehicle.
- **Closes** when the code-fix PR merges with the dated outcome line and the archive move.

## Lapse (2026-10-18)

*Signed: Thurgood (owner), observed under README rule 11 as applied in #408.*

- **Fired event**: the old trigger's first clause, the Q2 sitting, #267, `70f8fe54fbd7e92d60746e3135aee22c4f90b3bf` (2026-10-02), the arming sitting that recorded Q2 (the flip followed 2026-10-03). The second clause (a touch of `materiality.ts`) has not fired. No commit that is an ancestor of the event's commit closed this record (rule 5's dated outcome line, or the archive move) or re-ruled it (its Trigger line changed in a diff carrying a dated reason and authority).
- **Consequence (rule 11)**: first lapse of a P2 (guard) → escalation to Peter: spec / drop / fix-now. The sitting-2 ballot's D3 rider (item S6) is the proposed fix-now vehicle, so Peter's go on the sitting answers it; **answered 2026-10-19 (sitting 2 S4/S6 ratified)**.

## S6 held at application (2026-10-19)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **Ruled**: ballot `.kiro/docs/ballots/2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form.md` S6, **fix now** (Peter, 2026-10-18/19, § 8): the class-4 amendment and the rows 2–3 wording ratified as drafted, with the instrument census re-run as a stop condition at application.
- **The census re-run with the real instrument** (application branch `chore/ballot-sitting-2-application`, after its S1–S4 commits; `.kiro/specs/*/tasks.md` unchanged from main `3b84122c9`): the current rule is `scripts/completion-claims/materiality.ts` as committed; the proposed rule is a scratch copy of that file with only the class-4 caller changed (the body runs to the next heading of any level, a thematic break or a top-level checkbox line, taking in every line between). 17 class-4 headings.
  - **Stacy's seven change, exactly, by bullets**: `001-token-data-quality-fix/tasks.md:399` 0 → 6; `002-test-infrastructure-fixes/tasks.md:305` 0 → 7; `003-release-analysis-test-cleanup/tasks.md:186` 0 → 5; `010-container-component/tasks.md:591` 0 → 13; `011-release-system-test-fixes/tasks.md:476` 0 → 13; `012-release-system-test-fixes/tasks.md:207` 0 → 12; `web-format-cleanup/tasks.md:388` 0 → 6.
  - **Seven more class-4 sections change their canonical surface** (0 bullets under both rules, but the proposed rule takes in their lines): `011-inset-token-renaming/tasks.md:391`, `034-component-architecture-system/tasks.md:1044`, `119-B-capability-routing-measurement/tasks.md:143`, `issue-fix-file-organization-reliability/tasks.md:212`, `issue-fix-infrastructure-usability/tasks.md:138` and `release-detection-trigger-fix/tasks.md:403` carry their criteria as a **numbered list** (`1. …`), which the current rule drops whole (not a bullet); `054d-hierarchical-design-extraction/tasks.md:303` gains its intro prose line (its criteria are top-level checkboxes, already class 1).
  - Files whose canonical surface changes: **14**, not 7. Corpus digest: current `sha256:653e5a5d4ee2cd58949c2a408b182539d2a974ace6e8c84c94a15dffc09c4d1f` (9,803 segments; per-class counts P1=1159 P2=824 P3=66 P4=17 P5=741 P6=17 P7=4 P8=1, unchanged by the rule); proposed `sha256:0bffa3cd6027e77c040d3f75bcd2b8fd6e938891f7e8c8ad14f7b715432a3799` (9,971 segments).
- **So the stop condition holds**: the instrument's result differs from Stacy's re-implementation (which matched the seven), and the ballot says the application stops on S6 and reports. S6's PSP text (rows 2–4 and the sentence after the table) was **not** applied. The numbered-list shape is a second truncation shape the census did not name (the current rule loses those six sections' criteria entirely); whether the ratified rule, which takes them in, stands as written or returns to Peter is not decided here.
- **2026-10-19 (Thurgood): ruled (a).** Peter, in chat, to the fork "(a) apply as ratified (14 sections) · (b) narrow to the seven · (c) hold": **"(a)"** (recorded by the orchestrator; the committed record of the words is the ballot's § 8). The 14-file footprint is accepted, the numbered-list shape included. S6 is applied in PR `chore/ballot-sitting-2-s6-application`; § "S6 applied (2026-10-19)" below.

## Residual: three deeper-heading sections (2026-10-19)

*Signed: Thurgood (owner). A named residual from ballot S6 (Stacy R1, S6 item 2), not folded into the fix.*

- `029-test-failure-audit/tasks.md:279`, `cross-platform-build-system/tasks.md:654` and `mathematical-token-system/tasks.md:1367` lose their whole criteria body under **both** the current and the proposed rule: each `## Success Criteria` heading has its criteria under deeper sub-headings (`### Parent Task 1: Audit Phase`, `### Foundation Success`), and "the next heading of any level" stops at the first. **Confirmed by the instrument re-run above** (0 bullets under both).
- A boundary of "the next heading of the same or a higher level" would take them in, but it is not instrument-checked and the 87 correct stops have not been checked against it. **Open**, owner Thurgood, carried on this record; it closes only with a recorded decision on the boundary.

- 2026-10-19 (Thurgood): trigger fired at #413 (`3b84122c9`, the sitting's ratification); read as re-ruled by the ratification it carried, which named this record's fix vehicle, so no lapse under rule 11; token re-keyed to the PR that lands S6 (Trigger line above). *(The coordinator's reading, recorded as such; reversible if Peter reads it otherwise.)*

## S6 applied (2026-10-19)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **Ruled**: (a), apply as ratified (§ "S6 held at application (2026-10-19)", its last line; ballot § 8).
- **Law text**: `governance/Process-Spec-Planning.md`, the pattern-set table: rows 2 and 3 gain "with their bullet bodies"; row 4 takes its whole section, to the next heading of any level, thematic break or top-level checkbox line; one sentence after the table attributes the digest change to S6 by name.
- **Instrument**: `scripts/completion-claims/materiality.ts`, the class-4 caller only (`collectClass4Section`); classes 2, 3, 5 and 6 keep `collectBulletBody` unchanged. Tests in `scripts/completion-claims/__tests__/materiality.test.ts`: one per stop shape (intro prose, bold sub-label, numbered list), a reworded or deleted criterion after the old stop point reads material, a `**Primary Artifacts:**` label inside a class-4 section is taken in with no change to the normalized surface (Stacy R1, S6 item 3), and the three boundaries. **Bite**: against the pre-S6 extractor, five of the six new tests go red; the Primary Artifacts pin passes under both rules, which is what it pins.
- **`--verify-extraction`** (`npx tsx scripts/check-completion-criteria-parity.ts --verify-extraction`, `.kiro/specs/*/tasks.md` unchanged from main `71ce7e2d7`): before `sha256:653e5a5d4ee2cd58949c2a408b182539d2a974ace6e8c84c94a15dffc09c4d1f`, 9,803 segments; after `sha256:0bffa3cd6027e77c040d3f75bcd2b8fd6e938891f7e8c8ad14f7b715432a3799`, 9,971 segments. Per-class counts unchanged (P1=1159 P2=824 P3=66 P4=17 P5=741 P6=17 P7=4 P8=1). The applied rule **reproduces the census's proposed digest exactly**. The canonical surface changes in the same 14 files the census named; segment counts change in 17, the extra three being the residual's sections, which gain blank lines only (no change to their normalized surface).
- **Gate pins**: none. Neither `.github/workflows/completion-criteria-parity.yml` nor any test pins the corpus digest or the class-4 extent; the full scan reads `parents evaluated 34, pass 34, fail 0; emissions 0; reds 0` after the fix. The materiality comparison runs the same extractor on both sides of a diff, so the change makes no legacy file read as amended.
- **Class**: unchanged, P2 obligation (guard) · defect: the residual is still a guard weaker than its claim, for three sections.
- **Open**: the residual only (§ "Residual: three deeper-heading sections"). The record closes under rule 5 when the residual does.
- **Not fence-aware** (Stacy, read-only review, 2026-10-19): `HEADING_RE` does not track fenced code blocks, so a `# comment` line inside a fence within a class-4 section ends the body early. This is the ratified rule as written, and the failure runs in the costly direction only for sections that contain fences. Noted, not fixed; it rides the residual's boundary decision.
- **The re-rule does not fire its own trigger** (Stacy's question, 2026-10-19): the squash commit that lands this PR also edits `materiality.ts`, but M2 (ballot `2026-10-18-obligation-drain-and-release-falsity-floor`) defines a `path:` firing commit as the first commit of `git log --first-parent --reverse <token-commit>..main -- ':(glob)<glob>'`, and that range excludes the token-writing commit itself; separately, under rule 11 the merge commit carrying the re-rule is its own ancestor (`git merge-base --is-ancestor X X`), the reading recorded for #413. Both readings agree: this merge does not fire it; the first later commit touching the extractor does.
- **Exposure, not a block** (Stacy, 2026-10-19): this P2 (guard) record lapsed once (§ "Lapse (2026-10-18)"), and under rule 11 a record still open lapses again at each later release's S. If nothing touches the extractor before release 5's S, the residual lapses a second time; so either the boundary is decided before release 5's S, or the record is re-ruled explicitly at that point.
- **Provenance of the census figures** (2026-10-19, Thurgood, from R2 on the census ballot): "14 files change" counts canonical-surface changes from an uncommitted scratch harness over the instrument's exported `canonicalSurface` (scratchpad `census/run.ts`, through its own `normalizeCell(maskCheckboxes(…))`; reproduced on the shipped code at `bbec3fe0e`), and the "0 → N bullets" figures are that harness's regex count, not instrument output; "17" is `--verify-extraction`'s own per-file segment-count changes (the three residual sections gain one segment each, which normalizes away); the before and after digests are reproduced by the real `--verify-extraction` (the proposed one first came from `census/digest.ts`, a copy of `verifyExtraction`'s hash loop).
