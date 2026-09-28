# Issue: `.kiro/agents/*.attribution.json` sidecars ship in `files[]` for no consumer reader

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Ada (owner of `package.json` `files[]` since U1 Task 3's packaging diet)
**Trigger**: at Ada's next `files[]` touch, or before release 2 at the latest — no deadline; low priority.
**Source**: Spec 123 U2a Task 10 (Lina) regenerated the sidecars on `task/123-u2a-g1` (head `c6e5c42d`). The orchestrator confirmed the `files[]` intersection on 2026-09-27 and flagged it ahead of Task 12's G1 gate; Peter ruled on disposition the same day.

## The gap

Eight per-file JSON sidecars — `.kiro/agents/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}-prompt.md.attribution.json` — are inside `package.json`'s `files[]` via the `.kiro/agents/` entry. Each sidecar maps line ranges of a generated agent prompt to its canonical source section (e.g. `canonical/agents/lina.md#ownership`); Lina's carries 104 spans after Task 10, each file ~17 KB.

Verified 2026-09-27: `npm pack --dry-run --json --ignore-scripts` file list ∩ `git diff --name-only 90fb0e71..c6e5c42d` = exactly those 8 paths. Rendered agent text (the `.md` files themselves) changed 0 files in the same diff — Task 10's diff-guard criterion held; only the sidecars moved.

**Who reads them**: only our own steward tooling — `tools/agent-generator/attribution.ts`, `generate.ts`, `adapters/index.ts`, `sweeps/sweep-3-dupes.ts`, `sweeps/sweep-7-dispositions.ts`. Nothing in a consumer install reads them.

**How they reach a consumer**: `src/cli/init.ts` step 6 does an unfiltered `copyDir(pkgRoot/.kiro/agents → dest/.kiro/agents)`. A BECOME consumer (install + `init`) gets all eight copied into their repo and recorded as managed in their manifest. An install-only consumer holds them inertly in `node_modules` — copied nowhere, read by nothing. dp-portfolio (`test01`) lacks them only because it was initialized in June, before Spec 122 introduced sidecars — not because the shipping path excludes them. Release 1 is unpublished, so no consumer has received them yet.

## Why it is low priority

Peter's ruling (2026-09-27): this is a workspace-hygiene leftover, the same category as U1 Task 3's `files[]` diet (2567 → 1597 entries) — the sidecars contain only our repo's own paths, carry no dependency or runtime value to a consumer, and the only case for removing them now is delivering a cleaner build absent our workspace metadata. **No action is required before release 1**, and none is scheduled — this issue exists so the cleanup isn't forgotten, not because it's blocking anything.

Peter also ruled: **F1 stands** — U2a still cuts no release. Task 12's "U2a changes no shipped file" check will report this non-empty intersection; the disposition is this ruling, cited at Task 12, not a reopened release decision.

## Scope

- Exclude `*.attribution.json` from the shipped `files[]` entry for `.kiro/agents/` (the install-only posture — install-only consumers should never have received these paths in the first place).
- Confirm Task 16 (U2b, C20 — consumer-side agent generation replacing the init copy step) emits no sidecars into a born consumer repo (the BECOME posture). If Task 16's design already guarantees this, this issue closes with a citation to that guarantee; if not, Task 16 should add it.
- Note: `canonical/_fixture-output/**` sidecars (test fixtures) are not shipped — this issue is scoped to the `.kiro/agents/` entry only.

## Filed by

Steward (Thurgood, main-loop), 2026-09-27, at Peter's direction, recording his ruling on the U2a G1 finding.
