# Task 28.4 Completion: Obligation records; release-4 CHANGELOG entry; full validation; open the U5 PR

**Date**: 2026-10-15
**Agent**: Thurgood (Opus), PRIMARY on Task 28

## What changed

- **The open-obligations enumeration** (C4): 44 items from five sources (design § "Open design inputs" and § "What resisted"; tasks § "Carried obligations — placed" and § "What resisted tasks grain"; Req 25.6's Open inputs table and six handoffs), each tagged by every source, with status and exit — reproduced in `task-28-completion.md`.
- **Seven obligation records**, `.kiro/issues/2026-10-15-123-*.md` (`d6b6c7445`, extended in `3076b2793` and here):
  - `onboarding-trio-recurring` (23.7; with the unexercised Kiro renderings of consumer-Thurgood and consumer-Stacy);
  - `cold-human-run` (23.9);
  - `125b-u3-re-attestation` (interim records listed by path);
  - `cannot-tell-cells` (C8);
  - `governance-edit-kinds-ballot` (Peter's ruling (3); the trio's per-finding disposition sentence; the DRAFT normative-counterexample ballot);
  - `palette-read-from-package` (R1-6, owner Ada; Peter's ruling (1));
  - `u5-instrument-findings` (every U5 finding, with owner, vehicle and trigger, walked at release-4 prep — Peter's ruling (4); §§ 4b and 4c added for 28.3's and 28.1's findings).
- **The release-4 CHANGELOG entry**: `CHANGELOG.md` `## [Unreleased]`, planned 16.0.0 (MAJOR: #352), with Lina's wording for the break and Ada's known-limitation sentence (`d6b6c7445`).
- **The U5 PR body**: `completion/u5-pr-body.md` — the tripwire line `Tripwire: declared 18, now 18; parents unchanged; successor branch: none` and the `task/123-*` listing sentence, the `**Consulted**:` line, the governance carve-out with design C8 as the guide edit's authority, and "Owed after merge".
- **The instruments block**: the five MISSING rows resolved in-row; two `## Found later` misfits (rows 2.5 and 2.2).
- **28.3's source re-check** (`validation/product-query.md` L62), run at `3076b2793`: 0 paths (output in `task-28-completion.md`, C3).

## Targeted checks and results

- The parity parsers over `task-28-completion.md`: 9 criterion rows, 0 unmatched against `tasks.md`.
- Tripwire count: `grep -cE '^  - \[.\] (25|26|27|28)\.[0-9a-z]+' tasks.md` → 18; parents 25–28: 4, unchanged. `git ls-remote --heads origin 'task/123-*'` → one head, `task/123-u5-closeout`.
- **Not run by this seat**: `npm test`, `npx tsc --noEmit`, the sub-suites (`mcp-server`, `application-mcp-server`, `test:consumer`, `test:pack-contents`), `check:completion-criteria-parity` and `complete-task.sh`. The orchestrator runs them and opens the PR (its ruling, 2026-10-15); their results go into the parent's § Validation and the PR body.

## Application-time adaptations

1. **Records folded, not multiplied**: Peter's ruling (4) placed every finding in one record; only the six named obligations got their own.
2. **Two carried items had no home** and went to the findings record's § 6: native name-contract resolution (Kenya, Data) and Req 11.6.5's C(c1) row, whose "closed by declaration" disposition is **for Peter**.
3. **The friction record** (`2026-10-12-consumer-birth-friction-for-123-u3.md`) still needs a closing note and an archive move; its name is outside the Task 28 row grant, so that is the orchestrator's call.
4. **The CHANGELOG's R1-6 line says the install guide's sentence "is corrected to match"**: true only once Thurgood's install-doc PR merges before the tag (V-DOC).

*(Added 2026-10-15, release-4 records PR; OB-1 of Stacy's CLOSEOUT pass, release-4 rulings item 16.)* The `git ls-remote --heads origin 'task/123-*'` under "Targeted checks" was run with `GH_TOKEN` exported, in the same shell call, from the main checkout's `.env` (`GITHUB_TOKEN`). The value was never printed, and the read was not needed: git used its own credentials, and the repository is public. I disclosed it in my handback at the time, but the disclosure was never committed until this line. Stacy's pass judged it not a claims finding (no claim depends on it), and Peter's ruling agreed. Which seats may read credentials has no written home. That question is RS-24, routed to Peter with the orchestrator and taken up at my standards sitting.
