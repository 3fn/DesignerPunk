# Issue: `.kiro/agents/*.attribution.json` sidecars ship in `files[]` for no consumer reader

**Date**: 2026-09-27
**Status**: CLOSED 2026-10-02 (see § "Closed — 2026-10-02" at the end of this file)
**Owner**: Ada (owner of `package.json` `files[]` since U1 Task 3's packaging diet)
**Trigger**: at Ada's next `files[]` touch, or before release 2 at the latest — no deadline; low priority.
**Source**: Spec 123 U2a Task 10 (Lina) regenerated the sidecars on `task/123-u2a-g1` (head `c6e5c42d`). The orchestrator confirmed the `files[]` intersection on 2026-09-27 and flagged it ahead of Task 12's G1 gate; Peter ruled on disposition the same day.

## The gap

Sixteen per-file JSON sidecars — two per agent, `.kiro/agents/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}-prompt.md.attribution.json` AND `.kiro/agents/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}.json.attribution.json` — are inside `package.json`'s `files[]` via the `.kiro/agents/` entry. Each sidecar maps line ranges of a generated agent artifact (prompt or config) to its canonical source section (e.g. `canonical/agents/lina.md#ownership`); Lina's `-prompt.md` sidecar carries 104 spans after Task 10, each file ~17 KB.

Verified 2026-09-27: `npm pack --dry-run --json --ignore-scripts` file list ∩ `git diff --name-only 90fb0e71..c6e5c42d` = exactly 8 paths — the eight `-prompt.md.attribution.json` sidecars, which is Task 10's **diff delta**, not the shipped population: Task 10 only touched the `-prompt.md` sidecars, so the eight `.json.attribution.json` sidecars are also shipped but sit outside this diff, unchanged. The two counts (16 shipped, 8 changed) are not in tension — they answer different questions. Rendered agent text (the `.md` files themselves) changed 0 files in the same diff — Task 10's diff-guard criterion held; only the sidecars moved.

**Who reads them**: only our own steward tooling — `tools/agent-generator/attribution.ts`, `generate.ts`, `adapters/index.ts`, `sweeps/sweep-3-dupes.ts`, `sweeps/sweep-7-dispositions.ts`. Nothing in a consumer install reads them.

**How they reach a consumer**: `src/cli/init.ts` step 6 does an unfiltered `copyDir(pkgRoot/.kiro/agents → dest/.kiro/agents)`. A BECOME consumer (install + `init`) gets all eight copied into their repo and recorded as managed in their manifest. An install-only consumer holds them inertly in `node_modules` — copied nowhere, read by nothing. dp-portfolio (`test01`) lacks them only because it was initialized in June, before Spec 122 introduced sidecars — not because the shipping path excludes them. Release 1 is unpublished, so no consumer has received them yet.

## Why it is low priority

Peter's ruling (2026-09-27): this is a workspace-hygiene leftover, the same category as U1 Task 3's `files[]` diet (2567 → 1597 entries) — the sidecars contain only our repo's own paths, carry no dependency or runtime value to a consumer, and the only case for removing them now is delivering a cleaner build absent our workspace metadata. **No action is required before release 1**, and none is scheduled — this issue exists so the cleanup isn't forgotten, not because it's blocking anything.

Peter also ruled: **F1 stands** — U2a still cuts no release. Task 12's "U2a changes no shipped file" check will report this non-empty intersection; the disposition is this ruling, cited at Task 12, not a reopened release decision.

## Scope

- Exclude `*.attribution.json` from the shipped `files[]` entry for `.kiro/agents/` (the install-only posture — install-only consumers should never have received these paths in the first place).
- Confirm Task 16 (U2b, C20 — consumer-side agent generation replacing the init copy step) emits no sidecars into a born consumer repo (the BECOME posture). If Task 16's design already guarantees this, this issue closes with a citation to that guarantee; if not, Task 16 should add it.
- Note: `canonical/_fixture-output/**` sidecars (test fixtures) are not shipped — this issue is scoped to the `.kiro/agents/` entry only.
- **Mechanism (Ada)**: `package.json`'s `files[]` already uses in-array negation (e.g. `"!dist/**/__tests__/**"`), so the fix is one additional line after the `.kiro/agents/` entry — `"!.kiro/agents/*.attribution.json"` — since all sixteen sidecars sit flat in that directory. When executed, add a one-line pack assertion in the Task-3 style: `PASS: attribution sidecars ABSENT`. Note the relocation-integrity gate already filters `*.attribution.json` when reading `.kiro/agents/` and would become a harmless no-op once the sidecars stop shipping.

## Filed by

Steward (Thurgood, main-loop), 2026-09-27, at Peter's direction, recording his ruling on the U2a G1 finding.

## Closed — 2026-10-02

*Recorded 2026-10-02 by Ada (owner), after Spec 123's U2b merged to `main` (PR #262, squash `669b51b0`). Nothing above is rewritten; the Status line is the only edit outside this section.*

**Outcome**: both halves of § "Scope" are discharged by U2b. The fix was wider than the one-line negation this issue proposed: the whole `.kiro/agents/` entry left `files[]`, so the sidecars stop shipping along with the agent copies they described.
- **Shipping half (install-only posture)**: Task 16.3's deferred `files[]` row (`tasks.md` Task 16 criteria, L775 at `669b51b0`: "REMOVE `.kiro/agents/` discharges the shipping half of `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`"). Checked on `main` at `669b51b0`: `package.json` `files[]` has no `.kiro/agents/` entry, and its only `.kiro` entries are the eight identity docs by name. `scripts/pack-assert.ts` asserts it twice: `deferred REMOVE absent: nothing under .kiro/agents/` (L249–250) and `attribution sidecars ABSENT: no packed *.attribution.json` (L260–262). The packed-install consumer lane asserts that nothing ships under `.kiro/agents/` in the installed package (`tests/consumer-integration.test.ts` L369 test, assertion at L388).
- **BECOME half (born consumer repo)**: C20 emits the agent layer at `init`/`attach` instead of copying it, and emits no sidecar. Asserted in `tools/agent-generator/__tests__/consumer-entry.paths.test.ts` L98–105 (`no attribution sidecar`: the emitted set filtered on `.attribution.json` equals `[]`).
- **Never reached a consumer**: the sidecars shipped in v14.1.0's `.kiro/agents/` entry, as did Task 10's regenerated copies on `main` from U2a's merge until U2b's. No release was cut in that window (newest tag `v14.1.0`), and Peter ruled 2026-10-02 that releases 1 and 2 ship together, so no package built from that window will be published. *Point-in-time caveat*: v14.1.0 itself shipped the pre-Task-10 sidecars to any consumer installing it. That is the status quo this issue's own § "Why it is low priority" ruled harmless, and release 15.0.0 removes them.
- **Trigger**: fired as stated: Ada's next `files[]` touch (the 16.3 row, applied by Lina with Ada consulted), before release 2.
- **Write-scope note**: `.kiro/issues/**` is outside Ada's charter write scope. This closing entry follows the practice recorded in `.kiro/issues/2026-10-02-issues-dir-write-scope-gap-and-grant-advisories.md` (owner closes on a `chore/` branch; Peter's merge is the authorization).
