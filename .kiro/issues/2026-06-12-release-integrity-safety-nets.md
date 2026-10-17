# Deferred: release-integrity safety nets

**Date**: 2026-06-12
**Status**: Deferred — approved by Peter, not urgent
**Owner**: Thurgood (Civitas / test & release governance)
**Origin**: investigation of `.kiro/issues/2026-06-12-product-generator-unit-drop.md`

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
