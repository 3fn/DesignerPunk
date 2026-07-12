# Inbound to 125-B from 125-A: the seed note (deferred items + observed candidates)

**Date**: 2026-07-10
**Source**: 125-A Task 9 closeout — the physical home named in 125-A tasks.md (ratified v2)
**Status**: Handoff records, NOT ratified classification rows. 125-B formalizes after Spec 122 calcifies (umbrella outline, DECIDED).

> **DISPOSITION (2026-07-11): LIVE — FOLDED into `125-B-backlog.md`.** Item map: §1 findings 1/3 →
> backlog item 4 (SHOULD); §2 tool-boot smoke → item 3 (SHOULD); §3 warn→fail → item 5; §4 governance
> layers → items 1 & 6; §5 PAT asymmetry → **RESOLVED, dropped**; §5 jest split → item 8 (WATCH). This
> note remains the detailed source; the backlog is the canonical read.

---

## 1. Open bake-in findings carried BY LEDGER NUMBER (125-A `bake-in-ledger.md`)

- **Finding 1** — `completion-documentation-guide.md:351` still instructs pre-PR `release-manager.sh auto`; release *detection* was out of the Phase-0 ballot's scope. Peter-accepted (2026-07-10) and routed here: 125-B decides where release detection lives under the PR flow.
- **Finding 3** — the post-merge release-analysis job succeeds silently; its output was never consulted during the entire soak. Candidate: surface it (release-PR comment or equivalent) — or retire it consciously.

*(Findings 2/5 were RESOLVED during the soak; 4/6 Peter-accepted at closure — deliberately NOT carried; do not re-open.)*

## 2. Tool-boot smoke — the manifest EXISTS now

122's `canonical/registry/tool-registry.json` (122 Task 4, on `task/122-substrate` pending U1's merge) enumerates all three MCPs' declared tools with repo-relative `entry` paths — the designed manifest for the boot smoke (**declared-and-responds, NEVER returns-data** — the Stacy calibration guard; a declared-but-index-empty tool is correct, e.g. the Product MCP in this repo). This is a live buildable candidate, no longer a wait-for-existence deferral. Home: a 125-B check or a 122-side registration — 125-B adjudicates.

## 3. Warn→fail candidates observed during the arming

- **Fail-on-unexpected-console**: the test-noise sweep (PR #39: 96 error + 72 warn blocks → 0) was the manual pass; a global guard (allowlist expected output, fail on anything new) would convert the whole class into a mechanical check. Initial-triage cost is real (Lina's per-suite review pattern applies). Related pending ballot: the jsdom stylesheet-limitation doc addition (Thurgood chip, 2026-07-09).
- **Inverse-drift (STACY R1 item 4, ratified for this list)**: the armed `lane-functional-root` rebuilds from clean, which MASKS incremental-build breakage and stale-artifact test dependencies. Out of 125-A's scope by ruling; named here so it is known-deferred, not silent. Candidate: an incremental-path integrity check.

## 4. The governance layers deferred by design

- **CODEOWNERS + PR-approval-as-ratification** (the 125 outline's Phase 2 / ratification layer 2): the gate now verifies mechanics; authority remains record-first ballots. 125-B/Phase 2 decides when Peter's PR approval supersedes the manual RATIFIED record for gated surfaces.
- **Classification-map seed entries**: Task 1's what/why splits (the ballot's prune-with-arm rows) remain the map's seed material — handoff records, not ratified rows.

## 5. Ergonomics findings routed forward

- **PAT scope asymmetry**: the repo-root `.env` PAT can PATCH branch protection but CANNOT dispatch workflows (`workflow_dispatch` → 403). Cold-cache runs need Peter's UI click. Either scope the PAT deliberately (record the decision) or accept the manual step as the norm.
  - **RESOLVED (Peter, 2026-07-10 — deliberate scoping, recorded per this item's own ask):** the fine-grained PAT gained **Workflows: Read and write** (verified: a workflow-bearing ref push that had been rejected that morning succeeded) and **Actions: Read and write** (verified: `workflow_dispatch` on lane-timing.yml → HTTP 204). Both legs of the asymmetry are closed; 125-B can drop this item.
- **Sub-package jest major-version split** (root jest 30, both sub-packages jest 29): discovered when a jest-30 CLI flag was silently ignored by jest 29 during Task 7's bites (masking an intended selection-emptying). Not currently harmful; a quiet interop hazard for any future cross-package test tooling.
