# C-3: the served `process-spec-planning` binds the Instruments block to a parser the consumer profile removes (floor row shipped in 16.0.0)

**Date**: 2026-10-18
**Status**: FIXED — closes at the merge of PR `fix/c3-c4-h4-served-text` (rule 5's outcome line below; rule 11)
**Owner**: Thurgood (the served-doc text and the consumer profile). Filed by Thurgood under `.kiro/issues/README.md` rule 10, as ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2 directs ("C-3 (no home record found — *unverified*; Thurgood files one under M1)").
**Trigger**: `release:next:phase-1` — fixed before release-5 phase 1 (Peter, 2026-10-17, release-4 rulings row 28: "C-3 and C-4 are fixed before release-5 phase 1; no 16.0.1 patch").
**Class**: P0 false-claim · defect *(a statement false in a served doc, at a consumer agent's reader — Peter ruled it a floor row that shipped in 16.0.0, row 28 (1))*
**Source**: Spec 123 U5 conformance beat 1, row C-3 (`.kiro/specs/123-consumer-distribution/validation/conformance-beat-1.md`), corroborated by beat 2 row D-2 (S1, `conformance-beat-2.md` L125); carried by the release-4 walk in `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 3 (row C-3 / BD-2) and ruled at row 28 of `.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md`.
**Consulted**: none needed — filing only; the fix PR names its kind and consults per ballot 2026-10-18-governance-edit-kinds.

## The defect

`governance/process-spec-planning.md` § "The Instruments block (M4) — in force from the first tasks round after `P`" (L482 at `71bbd1085`) is served to consumer agents and binds a spec's plan-time Instruments block to the instruments parser. The package's own `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` records that parser's removal for consumers, so a consumer agent reading the served section is told to rely on a tool its repo does not have.

## The fix homes (row 28 (2))

- **A CONTENT CORRECTION** under ballot 2026-10-18-governance-edit-kinds (the referent: the consumer dispositions recording the parser's removal), **or**
- **a consumer cue** in the consumer profile (V-PROF), Thurgood.

The fixing PR closes this record by adding rule 5's dated outcome line in the same PR (rule 11).

## Not here

- C-4 (consumer-Stacy's owed-set query path) lives at `.kiro/issues/2026-10-03-consumer-stacy-owed-set-needs-adoption-record.md` (Stacy writes the text).
- C-6 (DesignerPunk-only paths in served routed-format sections) is inapplicable, not false (row 28 (1)), and stays under `.kiro/issues/2026-10-13-src-path-convention-for-served-governance-docs.md`.

## Fixed (2026-10-18)

- **Home picked: the CONTENT CORRECTION** (ballot 2026-10-18-governance-edit-kinds § 2), not the consumer cue. Row 28 named the CORRECTION first and the item-23 sitting has now ratified the kind. The false sentence is in the served text itself. A cue elsewhere would leave it there: the docs MCP carries the audience banner in the summary payload only (`mcp-server/src/indexer/audience-banner.ts`, P-1), so a `get_section` on this routed section never shows the banner.
- **The edit**: one sentence added to the section's opening paragraph in `governance/Process-Spec-Planning.md` § "The Instruments block (M4)". It says the parser is part of DesignerPunk's own `completion-criteria-parity` instrument (`scripts/completion-claims/`), that the consumer package does not ship it, and that in a consumer repo no parser collects or checks the block and `P` is a merge in DesignerPunk's repo. No requirement changes for this repo or for a consumer.
- **Referent** (held before this PR; neither governance text nor enforcement code changed in it): the package `files` list in `package.json` (no `scripts/` entry; `tsconfig.json` `rootDir` is `./src`, so `scripts/completion-claims/` is never compiled into `dist/`), and the consumer profile's own record of the removal, `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` (the `completion-criteria-parity` instrument removed under `subtraction-3`).
- **Not done here**: whether a consumer spec should write the block at all. Saying so would be a requirement for consumers (LAW, not a CORRECTION), so it is left out. — Thurgood
