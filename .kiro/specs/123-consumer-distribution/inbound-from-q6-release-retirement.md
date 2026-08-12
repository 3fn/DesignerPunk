# Inbound from the Q6 Release-Manager Retirement — for Spec 123

**Date**: 2026-08-12
**Source**: Q6 ballot (`.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md`, RATIFIED) + its execution (PRs #117/#118) + the Stacy consult on the rewritten `governance/release-management-system.md`
**Status**: two routed questions for 123's formalization — recorded deferrals, not decisions.

---

## 1. Should DesignerPunk's release notes ship/serve to consumers? (ballot C1 deferral)

Today `docs/releases/*.md` are repo-only: not in `package.json` `files[]`, not MCP-served. Consumers on `npm update` get new behavior with **no in-package record of what changed or why** — the hand-authored notes exist but don't travel. This belongs with 123's upgrade/sync story (the `sync`-refresh watch item): if consumers should answer "what changed between my installed versions?", the notes (or a curated subset) need to ship or be served. Counter-consideration: notes are written for DesignerPunk's own framing and may want a consumer-facing edit pass before becoming package content.

## 2. Internal-vs-consumer framing for the shipped governance corpus (Stacy consult, systemic finding)

`governance/` ships wholesale (~80+ docs) and many teach **repo-internal process** (spec workflow, completion docs, hook operations) with no marker telling a consumer's agent "these paths, scripts, and authorities are DesignerPunk's, not yours." The rewritten `release-management-system.md` now carries an **audience-framing banner** (worked-example framing; role-named authorities) — the first doc to do so, and the pattern candidate. 123's consumer-surface story should decide: banner-per-doc for internal-process docs, a corpus-level convention, or a served/not-served split. This composes with the onboarding-CI vision inbound's P1 (needs-declaration over environment-assumption) and the U1b audience ruling flagged there.

## Pointers

- The banner precedent: `governance/release-management-system.md` (top of doc)
- The consult record: `.kiro/issues/2026-08-12-release-manager-retirement-execution.md` § "Stacy consult record"
- Related inbound: `inbound-from-onboarding-ci-vision.md` §4 (the U1b audience ruling; Q6 intersection)
