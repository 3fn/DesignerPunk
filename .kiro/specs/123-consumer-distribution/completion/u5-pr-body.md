Spec: 123-consumer-distribution
Unit: U5 — Validation & closeout (`task/123-u5-closeout`; parents 25–28; gating parent 28)
Task: 28 — Closeout (+ 25 — The persona trio; 26 — The two cross-target join runs and the install-doc correction; 27 — Re-grounding conformance)
Agent: Leonardo (Opus, Tasks 25–27 and 28.3); Thurgood (Opus, Task 26.5 and Task 28)
Completion docs:
- Task 25: `.kiro/specs/123-consumer-distribution/completion/task-25-completion.md`; subtasks `task-25-{1..5}-completion.md`; instruments `task-25-instruments.md`; summary `docs/specs/123-consumer-distribution/task-25-summary.md`
- Task 26: `.kiro/specs/123-consumer-distribution/completion/task-26-completion.md`; subtasks `task-26-{1..5}-completion.md`; instruments `task-26-instruments.md`; summary `docs/specs/123-consumer-distribution/task-26-summary.md`
- Task 27: `.kiro/specs/123-consumer-distribution/completion/task-27-completion.md`; subtasks `task-27-{1..4}-completion.md`; instruments `task-27-instruments.md`; summary `docs/specs/123-consumer-distribution/task-27-summary.md`
- Task 28: `.kiro/specs/123-consumer-distribution/completion/task-28-completion.md`; 28.2 attribution `completion/task-28-2-attribution/`; subtasks `task-28-{1..4}-completion.md` (28.3's written by Thurgood from Leonardo's record); instruments `task-28-instruments.md`; summary `docs/specs/123-consumer-distribution/task-28-summary.md`
- Records: `validation/trio-{1-backend,2-designer,3-pm}.md`, `validation/join-{cc-to-kiro,kiro-to-cc}.md`, `validation/cold-observation-table.md`, `validation/conformance-beat-{1,2}.md`, `validation/probe-rerun.md`, `validation/product-query.md`
- Obligation records: `.kiro/issues/2026-10-15-123-{onboarding-trio-recurring,cold-human-run,125b-u3-re-attestation,cannot-tell-cells,governance-edit-kinds-ballot,palette-read-from-package,u5-instrument-findings}.md`
Validation: Orchestrator, worktree `wt-u5b` at `d538ea4fd` (the records' commit; the PR's final commit adds only these filled validation lines in `task-28-completion.md` and `u5-pr-body.md`): `npx tsc --noEmit` exit 0 · `npm test` 398 suites / 9571 tests passed · `npm run test:scripts` 19 / 454 · `npm run test:pack-contents` 105/105 · completion-criteria-parity 34/34 PASS (parent 28 PASS; 0 reds). At `3076b2793` (no source path changed after it; later commits are docs and ticks only): `mcp-server` suite 44 / 730 (the first run had 2 failures in one suite while a seat was editing served docs in the same tree — the suite name was not captured; clean on the immediate re-run) · `application-mcp-server` suite 34 / 485 · `npm run test:pack-contents` first read 103/105 because the worktree build had left nested `node_modules` under both server folders (the nested-root assertion class, the same misfit as 28.2's target method); 105/105 after removing them and rebuilding `dist/mcp` from the root. `npm run test:consumer` not run locally (the Consumer Guard workflow runs it at the gate).

**Consulted**: Lina — 16.0.0 CHANGELOG wording for the Input-Radio-Set break (#352) and the #359 consumer lines, from the diffs, plus a sweep of what else shipped since 15.1.0; Ada — the known-limitation sentence for R1-6 (what `generate` reads from the package); Leonardo — 28.3 (his seat) and the trio/join/conformance records the obligation set is built from; Thurgood — owner and author of the Task 26.5 Integration Guide edit (design C8's pre-declared execution), and author of the Task 28 records

Tripwire: declared 18, now 18; parents unchanged; successor branch: none
`git ls-remote --heads origin 'task/123-*'` lists one head, `task/123-u5-closeout` @ PRHEAD_SHA at the PR head (at `3076b2793` and `d538ea4fd`: the same single head); U5 has no declared successor, so no other 123 head means no work began outside the declared units.

## What this unit ships

- **The persona trio** (Task 25): three cold runs against the packed candidate — `cc` (persona a) and `kiro` (personas b, c) — with the protocol, three committed fixtures and frozen prompts. Findings recorded per persona and attributed to an axis.
- **Two cross-target join runs** (Task 26): CC-born → Kiro and Kiro-born → CC, both `joined` on the agents' answers. The cold-observation table reads **observed** in all four cells.
- **The install-doc correction** (Task 26.5): the restart/approval line in `governance/DesignerPunk-Integration-Guide.md` (+4/−4), regenerated into `docs/consumer/INSTALL.md`, now says what each harness asks: Claude Code asks for folder trust and then to enable the three servers; Kiro asks nothing. Only the observed cells were corrected.
- **Re-grounding conformance** (Task 27): consumer-Thurgood formalized a starter spec; consumer-Stacy audited its claims, 30 of 30 opened. Both identity probes hold (on `cc`).
- **Closeout** (Task 28): the reference-corpus probe re-run against the release-4 candidate (two sessions, one record, scoped per Req 26.7): **both SUPPORT** the mode; the shipped path works headless (`attach --reference`'s project config honoured — design open input 18 answered for Claude Code); **the shipped reference-mode framing (banners, INSTALL § 2's bullets) reached neither agent through the served path** (P-1, P-2, routed); the tarball assertion against `tarball-target.json` with per-path attribution (shipping method at `d6b6c7445`: 1675 / 6485550 / 23504489, +78 entries and +10.30% unpacked vs target, 183 added / 41 removed paths attributed); consumer-Leonardo's product query (28.3): **met, n=1** — "Order Status" and `example-home` in the tool results and the answer; the open-obligations enumeration (44 items, five sources) and seven obligation records; the release-4 CHANGELOG entry.
- **The release-4 CHANGELOG entry** (`## [Unreleased]`, planned **16.0.0**): MAJOR, because `Input-Radio-Set` now requires `accessibilityLabel` (#352). Also #359 (`validate_assembly` prop-value checks, `find_components` description), #360 (`find_docs` concept-mode paging) and 26.5's install wording. Known limitation: part of the copied token source is not read yet (R1-6, ruled ship-with-limitation).

## Ratification and carve-outs

- **Governance carve-out: Peter-merged.** The diff touches `governance/DesignerPunk-Integration-Guide.md` (Task 26.5) and a non-checkbox hunk in `tasks.md` (`bb08de731`, Task 25 criterion 3, Peter's ruling (b), 2026-10-14).
- **The Integration Guide edit needs no ballot** (Peter, 2026-10-15): its authority is **design C8** — "U5's closeout edits it to the observed truth" — a pre-declared execution in a merged design, and its owner wrote it. Thurgood's 26.5 question (does a design-declared `governance/**` edit need a ballot?) is answered for this edit and **filed as a class** in `.kiro/issues/2026-10-15-123-governance-edit-kinds-ballot.md` (LAW / PRE-DECLARED EXECUTION / CONTENT CORRECTION, plus a claims-pass line).
- **Rulings recorded in the Task 28 completion doc** (Peter, 2026-10-15): 16.0.0 ships with the R1-6 known limitation; Req 25.2 recorded as not run (every instrument run was author-launched; not a cold-human run); the guide edit needs no ballot; findings sorted into one record walked at release-4 prep.

## Owed after merge

- **Stacy's CLOSEOUT** → `.kiro/specs/123-consumer-distribution/completion/claims-pass.md` (its absence makes `closeout-owed(123)` true). It cross-reads the `subject: leonardo` findings and the operator logs.
- **docs-MCP `rebuild_index`** on `main`: a served `governance/` doc changed (26.5). `tasks.md` L359 lists U1, U2b, U3 and U4 only; its stated reason applies to U5.
- **RELEASE, release 4 (16.0.0), phases 1–2** at the tag (two-phase, ballot `2026-10-03-hermetic-publish-path`). Peter ratifies the MAJOR at release prep (the plan said minor; instruments O-10).
- **Release-4 prep items**: walk `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` (every row fixed or waived in writing, or RELEASE phase 1 is blocked); Thurgood's install-doc `fix/` PR **before the tag**; Lina's CLI `fix/` PR; Ada's `npm audit` of the candidate (`…-cannot-tell-cells.md` row 5); the release PR retitles `## [Unreleased]`.
- The friction record `.kiro/issues/2026-10-12-consumer-birth-friction-for-123-u3.md`: a dated closing note and `git mv` to `archive/` (its open rows now live in the U5 findings record).

## Not criterion failures, stated

- The tarball target's own per-path listing was never committed. Attribution runs against `b32ce8ace` packed in a fresh clone (1533 entries), 64 short of the target's 1597; the gap is stated, not absorbed (Task 28 instruments, `## Found later`).
- The probe re-run measured the release-4 **candidate**, not the published 16.0.0 (version string, lock and CHANGELOG title differ). RELEASE's step-6 record carries the shipped tarball's numbers.
- The Kiro renderings of consumer-Thurgood and consumer-Stacy are not exercised by U5's conformance run; that exits through the trio-recurring record.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
