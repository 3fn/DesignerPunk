# Issue: release-4 (16.0.0) floor grants — V-CLI-min, V-DOC, CL-1 (three sections, no pooled path list)

**Date**: 2026-10-15
**Status**: ACTIVE (three grants; each does nothing until Peter's merge of the PR whose body names this file activates it, and each expires at its own fixing PR's merge)
**Owner**: the executor named in each section. The record is kept by the orchestrator (a records write, declared; RS-18's open class).
**Trigger**: release-4 prep (the rulings record `.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md`, items 2, 1, 3–6, 10). Each section's PR lands before the 16.0.0 tag, in the sequencing the rulings record gives.
**Source**: `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` (the walk) and Stacy's CLOSEOUT (`completion/claims-pass.md` § Findings, CL-1); Thurgood's round-2 grant shape (three sections, no pooled list, the derived file AND its guard named — the RS-21 lesson).
**Rule** (`.kiro/issues/README.md` rule 8): the fixing PR cites its section's path list and is diffed against it as it stood at the activating merge; an out-of-list edit is a claims-pass finding. `governance/**` is never granted here — those hunks go under the governance carve-out, Peter-merged, with a `**Consulted**:` line. A section's paths do not extend to another section's PR, even where a path appears in two sections (the PRs merge one after the other).

---

## § 1 — V-CLI-min (executor: Lina; `fix/init-noninteractive-args`)

Rulings items 1 (harm row) and 2: `init` refuses off a terminal and names both flags (R3-1); the two `--help` lines R3-1 makes false; `node_modules/` seeded as a host line above the managed `.gitignore` block when `init` creates the file (R2-5/R3-11/K-3); the join-path restart sentence in the error catalog (26.5-add), copied verbatim from Thurgood's observed words. Tests for each.

**Grant paths**: `src/cli/init.ts`, `src/cli/designerpunk.ts`, `src/cli/shared/errorCatalog.ts`, `src/cli/shared/gitignoreRegion.ts`, `src/cli/__tests__/init.test.ts`, `src/cli/__tests__/errorCatalog.test.ts`, `src/cli/__tests__/gitignoreRegion.test.ts`, `scripts/__tests__/install-doc.test.ts` (it imports `initBornRepoMessage` and so guards the L99 sentence — the RS-21 catch), `CHANGELOG.md`

- Not granted: `src/generators/**` (R1-7(a) is waived to release 5, rulings item 13); `governance/**`; the `design.md` catalog row (Thurgood's erratum under `.kiro/specs/`, no grant needed).
- Validation: `npm test`, `npm run test:scripts`, `npm run verify:token-index-clean`.
- Expires at this PR's merge.

## § 2 — V-DOC (executor: Thurgood; `fix/install-doc-release-4`)

Rulings items 3–6, 12's R4 sentence, 13's known-limitation line: the install region of the Integration Guide (derived into INSTALL by `scripts/derive-install-doc.ts`), README, the CHANGELOG `## [Unreleased]` hunks (R1-6 paragraph with Ada's revised sentence; the header-only-diff Upgrading line; the `get_token_consumers` limitation line; a "Changed" line for the install-guide additions), and the test that guards the derived file. Additions are prose or bullets, never numbered lists (the test asserts exactly four numbered lists in the region).

**Grant paths**: `README.md`, `CHANGELOG.md`, `docs/consumer/INSTALL.md` (the derived file), `scripts/__tests__/install-doc.test.ts` (its guard)

- Under the governance carve-out (Peter-merged, `**Consulted**: Ada; Lina` in the PR body, kind and authority named per hunk — OB-12's line as a dry run): `governance/DesignerPunk-Integration-Guide.md` (install region), `governance/browser-distribution-guide.md` (L305 property names, Ada's; the "Your own tokens" paragraph, Lina's), `governance/Token-Family-Opacity.md` (one header line; the L384 `state_loading` wording), `governance/classification-map.md` (the no-disabled row's dated history line, if it does not ride Lina's C-1 PR).
- Order: after V-CLI-min merges (R3-1 makes INSTALL L63 true; the L99 test pin lands in V-CLI and V-DOC rebases on it).
- Validation: `npm run test:scripts` (install-doc test), `node scripts/validate-steering-metadata.js`, docs-MCP `rebuild_index` after merge.
- Expires at this PR's merge.

## § 3 — CL-1 class fix (executor: Thurgood; Lina consents as tool owner)

Rulings item 10: declared foreign trees. A root `.gitattributes` with a `dp-foreign-tree` attribute for `**/fixtures/**`, `**/__fixtures__/**` and `.kiro/specs/123-consumer-distribution/probes/reference-corpus-probe-inputs-2026-09-20/**`; `readLaneInputs` reads it with one `git check-attr --stdin` call; `FIXTURE_TREE_PATTERN` is retired in the same PR; #361's cases still pass (an unloadable config under a real tool root is still discovered). PR body: `**Consulted**: Lina — consents; tool owner`.

**Grant paths**: `tools/agent-generator/coverage-map.ts`, `tools/agent-generator/__tests__/coverage-map.test.ts`, `.gitattributes`

- Validation: `npm run audit:coverage-map` green on the PR head; `npm run test:scripts`.
- Expires at this PR's merge.

---

## Not in this record (their own vehicles)

- **PR A** (Ada, publish-path rows 1–5 + delegated row 6): grant already active via `.kiro/issues/2026-10-14-publish-path-instrument-rows.md` (#354).
- **O-1** (Thurgood, one line in `governance/Process-Cross-Reference-Standards.md`): carve-out, Peter-merged.
- **C-1** (Lina, Button-CTA contract amendment): her charter scope (`src/components/**`); the Component-Family-Button hunk under the carve-out, Peter-merged.
- **V-PROF** (Thurgood, consumer overlays for Leonardo and Sparky + regeneration): `canonical/**` under the carve-out, Peter-merged; two re-sign acts under the signing-act chain.
- **The records PR** (Thurgood, errata CL-2/3/4/6, OB-1 line, DO-2 line, hermetic follow-ups status line): `.kiro/specs/**` and `.kiro/issues/**` lines — the issues-dir write-scope gap (`.kiro/issues/2026-10-02-issues-dir-write-scope-gap-and-grant-advisories.md`) still applies; the orchestrator writes the issue-file lines if the steward's charter does not reach them.
