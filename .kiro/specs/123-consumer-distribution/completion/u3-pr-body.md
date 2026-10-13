Spec: 123-consumer-distribution
Unit: U3 — Onboarding (Tasks 19–22)
Task: 19–22 (gating parent: 22, Personal note, `init` UX completion, product scaffold, and DD9)
Agent: Thurgood (19, 21); Lina (20, 22); Leonardo (22.0, 22.3 content, 22.5 DD9, 19.5 review); Ada (22.3b, wording); Kenya, Data, Sparky (19.4 platform wording); Stacy (G2 backstop read)
Completion docs: `.kiro/specs/123-consumer-distribution/completion/task-19-completion.md`, `task-20-completion.md`, `task-21-completion.md`, `task-22-completion.md` (summaries: `docs/specs/123-consumer-distribution/task-19-summary.md`, `task-20-summary.md`, `task-21-summary.md`, `task-22-summary.md`)
Validation: Tier 3 local at the final tree: `npm test` 395 suites / 9550; `tsc` 0; `test:scripts` 408; `test:agent-generator` 1686; `test:consumer` 53 passed, 1 skipped; `mcp-server` 612; `application-mcp-server` 432; `test:pack-contents` 103/105 (2 FAIL in the pre-existing contamination class, `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`); `check:122:diff-guard` no-op-green; `verify-signing-chain --ci` PASS; completion-criteria parity SUMMARY: parents evaluated 28, pass 28, fail 0.

**Consulted**: Stacy — (b) + waiver, (a) not hers; Lina — recorded red, did not waive; Peter ruled A 2026-10-13

Tripwire: declared 16, now 18; parents unchanged; successor branch: none

## What this unit ships

The onboarding path: the install guide (`governance/DesignerPunk-Integration-Guide.md`), the commit policy and the `.gitignore` managed block, the personal note and `init`/`generate`/`sync` UX, the product scaffold, the starter specs, and the release-3 CHANGELOG entry (planned, above 15.0.0). No release is cut by this PR; release-3 prep follows.

## Peter's rulings in this unit

B-U3 ordering; O-2; Setup Loop kept; owner review per section; COMMIT-POLICY pointer; personal-note approval; A on knowledge bases (U3g); the Grant; and ruling A of 2026-10-13: a one-time waiver for the `package.json` no-overlap hit at 22.4, with Task 29's input-set entry narrowed to `package.json`'s `scripts` block (recorded as dated amendments in `tasks.md`).

## Ratification and carve-outs

- **B-U3 ratifies at this merge**: `.kiro/docs/ballots/2026-10-03-123-b-u3-install-guide.md` (status DRAFT until merge; preservation table includes the two #268 content changes).
- **Governance carve-out**: the diff touches `governance/DesignerPunk-Integration-Guide.md`, so this PR is Peter-merged.
- **Owed after merge**: the RELEASE (release 3) claims event (Stacy); `rebuild_index` on `main` for the docs MCP (orchestrator).

## Open items for Peter (not criterion failures)

- Build-claim wording in the guide (Task 19 C15: Kenya's fork F and Data's C-5): owners' wording is in, never ruled.
- #312 rows 2 and 8 (abbreviation default; Application MCP readiness in a consumer).
- Release-3 fixes A/B/C (the `generate` abort exit status and the `validate` mathematical-relationships failure, listed under Known limitations).
- The `.gitignore` "markers missing" remedy for someone who removed the block on purpose.
- RS-1; the profile-scope fork.
- The jest preset (#300 item 1), listed under Known limitations.

## Records to follow

C6 flake record; #300 addendum. The four Task 19 warning rows (C7c `rebuild_index`; C11 Running Component Tests/preset; C20 lock, discharged by the last lock refresh `73ba4fc5f`; C15 build-claim strings) are in `task-19-completion.md`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
