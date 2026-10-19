# Deferred: release-integrity safety nets

**Date**: 2026-06-12
**Status**: Deferred — approved by Peter, not urgent
**Owner**: Thurgood (Civitas / test & release governance)
**Origin**: investigation of `.kiro/issues/2026-06-12-product-generator-unit-drop.md`
**Trigger**: `path:.gitignore` — the next commit that edits the root `.gitignore`, the file whose unanchored `build/` pattern caused the incident this record exists for; at that PR guard #2 is built or this record is re-ruled or dropped (guard #2 only; guard #1 is closed below). *(Set 2026-10-18, Thurgood. This record had no token line: its trigger lived in the prose paragraph "Walk 2026-10-17" below, "the next PR that edits RELEASE-FLOW law text", which fired at #408 (`c470a248f`, 2026-10-18) and is discharged by the Triage section at the end. Authority: the owner's Trigger-line right (README rule 9), re-ruled under rule 11 in a diff carrying this dated reason, and Peter's routing of 2026-10-18 ("Go on the W-1 records PR and the capped sitting", relayed in the orchestrator's brief; the PR body cites it).)*
**Class**: P3 improvement · owed-act *(set 2026-10-18, Thurgood, rule 12. Guard #2 is an approved, not-urgent prevention for a failure mode that guard #1 now catches at release time; no reader is misled and no guard is claimed that does not hold.)*

## Context

A customer-reported product-token bug traced back to a version-control gap: an unanchored `build/`
pattern in `.gitignore` was silently excluding the `src/build/` product-token pipeline source
(generator, emitters, `defineComponentTokens` helper) from the repository. Because `git add` skips
ignored files, fixes were applied to disk but never committed — so v12.0.0–12.0.4 were published from
working-tree state that wasn't in git, and the committed tree wasn't buildable from a clean checkout.

Root cause fixed in commit `d8eb8501` (pattern anchored to `/build/`, 26 source files recovered).
The two guards below prevent recurrence.

## Approved (Peter, 2026-06-12) — both, not urgent

1. **Release reproducibility gate.** Before any tag/publish, a clean checkout (`git archive` or fresh
   clone) + `npm ci` + `npm run build` must succeed. This would have caught the missing-source problem
   before it ever shipped.

2. **Source-ignore guard.** CI fails if any source under `src/` is gitignored (scope
   `git status --ignored` to `src/`; allowlist generated dirs such as `src/types/generated/`). Targets
   the exact failure mode — source silently swallowed by an output-ignore pattern.

## Notes

- If guard #1 changes the release process, the `Release Management System.md` update is a ballot
  measure requiring Peter's sign-off.
- Implementation is Thurgood's domain (test/release machinery), not Ada's. Ada surfaced and logged it.

**Walk 2026-10-17 — a trigger fired without a record.** "Revisit at release-manager retirement execution" fired on 2026-08-12 (#117/#118), and no revisit was recorded; the 2026-09-19 walk missed it. Since then the hermetic-publish law (ballot `2026-10-03-hermetic-publish-path`, the `publish-rail-guard` and `hermetic-publish-path` register rows) has covered much of this file's ground. **New trigger**: the next PR that edits RELEASE-FLOW law text. At that PR, Thurgood reads this file's items against the current RELEASE-FLOW and either closes them as covered or carries the rest by name. Owner unchanged (Thurgood).

## Triage (2026-10-18)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **Guard #1 (release reproducibility gate) — CLOSED 2026-10-18 as covered.** `.kiro/hooks/RELEASE-FLOW.md` step 5.1 (L135–136 at `c470a248f`) runs `npx tsx scripts/release-publish.ts --dry-run <S>` before the tag is pushed; "It works in a fresh clone at S: `npm ci`, then `check:drift`, then `npm pack` with lifecycle scripts on, so `prepack` builds", and 5.3 repeats it in a fresh clone at the tag (L148). That is this guard's text (clean checkout, `npm ci`, build, before any tag or publish) with a stronger pack-assert on top. The Notes line "if guard #1 changes the release process, the update is a ballot measure" was discharged by ballot `2026-10-03-hermetic-publish-path`, which ratified the path.
- **Guard #2 (source-ignore guard) — NOT FOUND, carried by name.** `grep` of `scripts/`, `.github/`, `tools/agent-generator/*.{ts,sh}` and the register finds no check that fails when a file under `src/` is gitignored (`git status --ignored`, `git check-ignore` appear only in the packaging scripts' comments, `diff-guard.ts`'s input closure and one test). It is carried with the Trigger and Class above.
  - **An honest narrowing, not a close**: a source file that is gitignored and never committed is also absent from every fresh clone, so the PR-gate's lane jobs, which build from a clean checkout (`.github/workflows/lane-timing.yml` L182 notes `npm run build` there), and 5.1's fresh-clone build both fail when anything imports it. Guard #2's residual is therefore a source file nothing imports (a test, a doc, a script). That reading is mine and **not verified against the 2026-06 incident**; the close or drop is Peter's, since he approved both guards on 2026-06-12.
- **Walk 2026-10-17's "New trigger" fired at #408**: `c470a248f` edited `.kiro/hooks/RELEASE-FLOW.md` (the first law-text PR to do so since the 2026-10-17 walk). This section is the "read this file's items against the current RELEASE-FLOW and either close them as covered or carry the rest by name" that trigger owed.
