# Task 7 Summary: Eight sweeps (C8) + gate registration (C9)

**Spec**: 122-agent-generator · **Unit**: U1 (Substrate) · **Date**: 2026-07-10
**Status**: done-on-branch (`task/122-substrate`) — accepted at U1's merge (PR opens at Task 8)

## What landed

The eight C8 drift sweeps, each a mechanical algorithm with a recorded prove-it-bites, and
all ten 122 check contexts registered as REQUIRED checks on the armed 125-A gate.

- **Sweeps 1–8** (`tools/agent-generator/sweeps/`): reference-resolution (+ retired-name
  scan + interim-crossRef enumeration), skills round-trip (CC description byte-equality,
  D-A2), Kiro resources double-load, ambient set-difference (designed ∪ always-set vs
  generated, gap #7's union rule), corrected-state-holds (pre-cutover only; L3 exclusions),
  phantom-route/declaration-diff (declaration-keyed), config-field disposition (all 8 live
  configs pass), demotion-diff (D-A1 doc-id ∪ artifact-path namespace; K-D1 orphaned
  negatives). Deltas are never auto-resolved: `ADJUDICATE:` blocks name the owner; recorded
  rulings live in the new `canonical/adjudications.yaml`.
- **Gate registration**: `.github/workflows/agent-generator.yml` — ten named jobs,
  unfiltered `pull_request` trigger, shared setup + built-MCP artifact, C6 no-op lock
  early-exit (hash evidence printed). Branch protection now carries **17 required contexts,
  count-asserted** by `verify-gate-registration.sh` (run at cutovers + monthly health check).

## Notable findings

- Sweep 3's bite run found **four** live configs double-loading Product-Token-Governance
  (design predicted two) — resolves per-agent at cutover.
- **Window note**: until U1 merges, unrelated PRs block on the ten "Expected" contexts
  (workflow is branch-only until then). Task 8 is next; Peter controls sequencing.
- Live repo slug is `3fn/DesignerPunk` (docs saying `DesignerPunkv2` now 301) — routed to
  Thurgood for doc cleanup.
- The crossRef interim-targeting (Peter, 2026-07-10) is live: sweep 1 lists the interim on
  every run; the 125-B re-point obligation is recorded in
  `.kiro/specs/125-mechanical-enforcement-strategy/inbound-to-125-B-from-122.md`.

## Validation

`npm test` 8987/8987 · lane 276/276 · root + project tsc clean · protection PATCH
platform-verified · verify script PASS (N=17).
