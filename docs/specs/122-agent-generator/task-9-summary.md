# Task 9 Summary: Ada's cutover (U2 — the first CC cutover)

**Spec**: 122-agent-generator · **Unit**: U2 · **Date**: 2026-07-10
**Status**: PR open at this completion — accepted at Peter's merge (agent configs stay Peter-merged).

## What landed

Ada is the first real agent generated from canonical source, on both targets. Her canonical
source carries the full input-of-record (two-section token-governance law embedded inline in
CC; 20 trimmed docs each covered by a `replaces:` cue; her three Kiro knowledgeBases
preserved byte-faithfully; commands, routes, write scope, hooks all carried). The runtime
generation lane went live with her: ledger-driven emission, ledger-derived guarded surfaces,
generator-emitted demotion delta.

## The gates bit — three times, in their designed order

1. **Ada's seat confirmation DISPUTED**: a CC adapter bug namespaced her application-MCP
   `rebuild_index` cue to the docs server (subset-order search). Fixed at the seam
   (`cueToolRef` — cues namespace by their own `mcp`), regression-tested, re-confirmed.
2. **The classification pass** caught missing routing parity (completion-doc/spec-planning) —
   two routes added rather than adjudicated.
3. **Stacy's audit** caught `routes.agents` being structured but never rendered (a dangling
   body pointer on both targets) — `renderAgentRoute` added to both adapters.

All three fixed-before-merge; zero regressions adjudicated away. Acceptance signals measured
exactly on the design's predictions (baseline 30, union 10, per-agent members 1, shrink 20,
targets agree) — twice, independently.

## Validation

Full suite 8987/8987 · lane 308/308 · both typechecks clean · all ten checks + C7 (grant
surfaces newly armed) + coverage audit green · Ada CONFIRMED · Stacy CONFIRMED.
