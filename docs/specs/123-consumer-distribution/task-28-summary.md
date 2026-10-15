# Task 28 Summary: Closeout (U5 gating parent)

**Date**: 2026-10-15
**Purpose**: Concise summary of Task 28 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

- **The reference-corpus probe, re-run (28.1)** against the release-4 candidate tarball, on the same task and the same foreign repo as the September n=1 (byte-identical inputs, recovered by Peter). Two sessions, one record: session A on the September hand-wired path, session B on the shipped path (`npm install`, `attach --target=cc --reference`, restart). **Both support the reference-corpus mode.** Session B's headless session honoured the project config `attach` wrote, so the shipped path works without hand-wiring.
- **The tarball assertion (28.2)**: the candidate measures 1675 entries / 6485550 packed / 23504489 unpacked bytes — above the U1 target on every lever (+78 entries, +10.30% unpacked). Every added and removed path is attributed to the PR that moved it; the target's own listing was never committed, and that gap is stated.
- **The product query (28.3, Leonardo)**: consumer-Leonardo, in a fresh Claude Code session in a consumer repo, answered from the Product MCP — "Order Status" and `example-home`, both in the tool results and in his answer. Met, n=1.
- **Closeout (28.4)**: 44 open obligations enumerated from five sources and exited; seven `.kiro/issues/` records (the recurring trio, the cold-human run, the 125-B U3 re-attestation, the `cannot-tell` cells, a governance-edit-kinds ballot, the palette pipeline, and one record of every U5 finding walked at release-4 prep); the release-4 CHANGELOG entry (planned 16.0.0, a major release for the Input-Radio-Set break); and the U5 PR body with its tripwire line.

## What It Found

- **The reference-mode framing the product ships does not reach a reference-mode agent through the docs MCP**: the audience banners sit in each doc's preamble, which `get_document_summary` and `get_section` do not return; and nothing on the reference path points the agent to the install guide's guidance (Thurgood).
- **A heading lookup can fail with suggestions that cannot help** (an H4 the server does not index; Thurgood, existing record).
- **One served doc's `Last Reviewed` date is older than its content** (Token-Family-Opacity; Thurgood → Ada).
- **The CLI's default permission mode is now `auto`**, so the instrument's sessions ran in different modes; tool-use differences between runs are not attributed to the product (Leonardo).
- **Two of the September record's spot-check judgments were wrong**; an erratum is appended.

## Rulings Applied (Peter, 2026-10-15)

- Release 4 ships as 16.0.0 with a known limitation: part of the copied token source is read from the package (pipeline fix: Ada's obligation record).
- Peter's mechanics run (Req 25.2) is recorded as not run; he launched every instrument run and observed the mechanics there.
- The Integration Guide edit needs no ballot (its authority is the design's pre-declared clause); the class goes to a governance-edit-kinds ballot.
- Every U5 finding goes in one record, walked at release-4 prep: fixed, or waived in writing, or RELEASE phase 1 is blocked.

## Related

- Completion: `.kiro/specs/123-consumer-distribution/completion/task-28-completion.md`
- Records: `.kiro/specs/123-consumer-distribution/validation/probe-rerun.md`, `validation/product-query.md`
- Obligations: `.kiro/issues/2026-10-15-123-*.md`
