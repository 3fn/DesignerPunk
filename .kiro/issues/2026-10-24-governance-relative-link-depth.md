# Issue: governance/ relative links kept their depth-2 `../../` after the docs moved; the completion-doc templates teach the wrong depth

**Date**: 2026-10-24
**Status**: ACTIVE
**Owner**: Thurgood (the class option, the template corrections, the two side findings). Co-sweepers for their own files: Ada (Rosetta/token docs), Lina (Stemma/component docs).
**Trigger**: `manual` — the event that owes the close is Peter's dated ruling on the § 6 fork, appended to this record; the § 7 side findings are disposed (fixed or filed) in the same append. Re-ruled to `merge:#<N>` by the owner if a fixing PR for the chosen option opens first (rule 1).
**Class**: P3 improvement · charter *(set 2026-10-24, Thurgood; the CORRECTIONS in § 3 and § 4 ship in the PR that files this record, so what stays open is a decision and two side findings, none of which misleads a reader today beyond what § 3 already fixed)*
**Filed by**: Thurgood, under rule 10, in the PR that carries the corrections (branch `fix/governance-link-depth-sweep`). The observation is Ada's (item 4 audit, 2026-10-24, § 5 of her read, which is in session notes and nowhere committed); this record is its committed form.

---

## 1. The class

Docs written at depth 2 (`.kiro/steering/`) were moved to `governance/` (depth 1) and kept their `../../` links. From `governance/`, `../../` lands above the repo root. Ada found the class on 2026-10-24 while auditing the `preserved-knowledge` pointers.

## 2. The predicate and the counts

Predicate: `python3 -I resolve-links.py <tree>` (no `--all`): it parses markdown links in `governance/**/*.md`, skips URLs and anchors, excludes links inside code fences and inline code, resolves each path against the file's directory, and reports any that do not exist. It checks file existence only, not `#anchor` validity, and it is **not a repo file** (it lives in the orchestrator's side-session notes); the PR body pastes its output.

- On main `e4e61eea2`, without `--all`: **51 unresolved**. **48** are fixed in this PR (Ada's and Lina's re-depth commit, plus one glob pointer deleted: `./Token-Family-*.md` in Rosetta-System-Architecture). **3** are fixed by PR #459: `cross-platform-vs-platform-specific-decision-framework.md` L360 and `rosetta-system-principles.md` L588 and L590.
- With `--all` (fenced links included; inline code still skipped): **108** on main, so 57 fenced links. At this PR's HEAD the fenced count by file is 44 in Process-Cross-Reference-Standards, 5 in Process-Spec-Planning and 4 in completion-documentation-guide. They stay out of the done-condition because a fenced example's correct base is the example's hypothetical location, which the resolver cannot know.
- **Resolver caveat.** The resolver has no root-containment check. In a nested worktree, a link that climbs above the worktree root can resolve against the enclosing main checkout. PSP L2533 does so after the fix (4 levels from `governance/` lands in the main checkout's `docs/`), so it is absent from the `--all` list although it is a fenced example the resolver cannot judge. I re-ran with containment: of the 68 non-fenced links, only the three #459 links escape the tree.

## 3. The completion-doc templates teach the wrong depth

A detailed completion doc at `.kiro/specs/<s>/completion/` is four levels below the repo root; a summary at `docs/specs/<s>/` is three. Process-Spec-Planning and completion-documentation-guide taught two for summary to detailed, and Process-Spec-Planning taught three for detailed to summary. The real files copied it: `.kiro/specs/release-detection-trigger-fix/completion/task-1-parent-completion.md` L83 and L285 use three levels (to `.kiro/docs/specs/...`, which does not exist), and `docs/specs/release-detection-trigger-fix/task-1-summary.md` L36 uses two (to `docs/.kiro/...`, which does not exist).

Measured across the repo (every `](../…/.kiro/specs|docs/specs/…)` link, resolved from its own file):

| Direction | Depth | Links | Resolve |
|---|---|---|---|
| summary to detailed (`docs/specs/*/`) | 2 | 334 | none |
| summary to detailed | 3 | 24 | all |
| detailed to summary (`.kiro/specs/*/completion/`) | 4 | 109 | all |
| detailed to summary | 3 | 13 | none |

**Corrected in this PR (both standards docs, templates and the calculation prose):**

- Process-Spec-Planning: L2438, L2487, L2508, L2515 (summary to detailed: 2 to 3 levels); L2526, L2533 (detailed to summary: 3 to 4 levels); L2559-2560 and L2563-2564 (the "Relative Path Calculation" paths and "up to root" breakdowns); L2511 and L2529 ("Example from" to "Example for": after the fix the quoted link is no longer what the real file contains).
- completion-documentation-guide: L532, L546, L553 and the L570 table row (2 to 3 levels). L563 and the L571 row already used four levels and are unchanged.

**Checked, by resolving each corrected path against its example's directory** (`docs/specs/release-detection-trigger-fix/` for the summary templates, `.kiro/specs/release-detection-trigger-fix/completion/` for the detailed ones): all PSP lines resolve. The CDocG lines resolve to the right directory, but its example filename `task-1-completion.md` does not exist (the real file is `task-1-parent-completion.md`). That is a naming discrepancy in CDocG L553 and is **not** a depth defect; it is left as written and filed as § 7 item 3.

**Why this is a CORRECTION and not LAW.** Each line states a relative path to a file. The obligation to link with a relative path that reaches the target already stands: Process-Spec-Planning L2568 ("Always use relative paths") and L2570 ("Test links by clicking them"), and Process-Cross-Reference-Standards L134 and L638. The old numbers did not satisfy it, since they led nowhere; the new numbers do. No reader is asked to do anything they were not already asked to do, and no template gains or loses a field. The "Example from" to "Example for" change removes a claim ("this text is in that real file") that is false in the rest of the repo's history. The truth referent for every line is the filesystem.

**Left alone, deliberately.** The 334 summary links and the 13 detailed-to-summary links in the real `docs/specs/**` and `.kiro/specs/**/completion/**` are historical records that the claims passes read; rewriting them is not a CORRECTION of a standard (law docs carry current text, records keep what they said). They are listed here, not edited. The sweep to fix them, if wanted, is a separate decision for the doc owners and Peter.

## 4. Why the corrections are scoped to templates and prose

Process-Cross-Reference-Standards already assigns the right form by target class (corpus doc: bare `id`; identity doc and repo file: relative path; L126-134) and already requires a relative-path check (L638). The class was a violation of the standard, not a gap in it, so no PCRS edit is made. A rule such as "a moved doc must re-depth its relative links" would be a LAW addition and needs a ballot; it is not in this PR.

## 5. Residual: consumer copies still dangle (a decision for Peter, not a CORRECTION)

`governance/` ships in the npm package (`package.json` `files`). `docs/`, `.kiro/specs/`, `preserved-knowledge/` and component READMEs do not (only `docs/consumer/*`, `*.schema.yaml`, `contracts.yaml` and `component-meta.yaml` do). So a re-depthed link to a non-shipped target resolves in this repo and dangles in an installed copy. Links to shipped `*.schema.yaml` files resolve in both. The PR's "0 unresolved" means 0 in the repo. Whether governance docs should link to non-shipped files at all is Peter's decision (the bare-id and plain-path alternative is option C below).

## 6. The class option, as a fork (surfaced, not decided; Peter picks)

- **A.** An evergreen jest test in `src/__tests__/` that walks `governance/**/*.md` and asserts zero unresolved relative links (fences and inline code excluded), reporting resolves-but-not-shipped as an advisory count. Runs in the existing required `npm test` job: no new context, no workflow edit, no `EXPECTED_CONTEXTS` change. Cost: about 80-120 lines, a falsification fixture, a `governance/classification-map.md` register row (`proposed`; a ballot), and a new blocking check on every PR that touches `governance/`. Owner: Thurgood; Ada and Lina fix findings in their own files. It needs the root-containment fix of § 2.
- **B.** An advisory step in `scripts/governance-check.sh --full` (monthly walk). Cheapest; non-blocking; late detection.
- **C.** A policy that governance docs link only by bare `id` and cite repo files as plain code paths. No instrument; a LAW change to PCRS; removes the shipped-or-not question; loses click-through in repo views.
- **D.** Nothing beyond this PR. PCRS L638 already says to check; it did not catch this class.

**Thurgood's lean: A**, with the advisory shipped-class count. A lean, not a ruling. **Surviving counter-argument:** a fence-aware check cannot see teaching examples, which is where the longest-lived defect here sat (§ 3); one more blocking check cuts against Spec 131's adds-versus-removes count; C needs no instrument. A green A is evidence about link existence only, never about claim honesty.

## 7. Side findings

1. **Stale counts in two identity docs.** Civitas-System-Overview and DesignerPunk-Systems-Overview state "83 docs, 2,833 sections, 333 cross-references"; the live docs MCP index reports 84 documents, 2,535 sections and 333 cross-references (2026-10-24, `get_index_health`). Identity docs are Peter-merged law; the correction needs its own PR and the Edit kind line. Pre-existing; not this PR's.
2. **`scripts/validate-cross-reference-format.sh` is stale-scoped.** It scans `.kiro/steering` only (`STEERING_DIR`), which is the pre-move location; the governance corpus is not covered. Owner Thurgood; the fix belongs with the option picked in § 6.
3. **completion-documentation-guide L553 names a file that does not exist** (`task-1-completion.md`; the real file is `task-1-parent-completion.md`). Naming, not depth; check against the guide's Naming Conventions section before choosing which side moves.

## 8. Edit kind, for the PR that carries this

All changed `governance/` files in the sweep are `CORRECTION`, with this record as the observation record and the filesystem as the truth referent. This file is under `.kiro/issues/`, which is not a governance path, so it carries no Edit kind line.
