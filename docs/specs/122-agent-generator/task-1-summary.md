# Task 1 Summary — Canonical source substrate (Spec 122, U1)

**Status**: Done on branch `task/122-substrate` (parent inside unit U1; accepted at U1's merge, Task 8).
**Date**: 2026-07-09

Built the canonical source substrate the agent generator reads:

- **`canonical/` root + `skills/` neutral root** per the design's repository layout, with ledger/coverage-map stubs.
- **C1 agent schema** (`tools/agent-generator/schema.ts`) — the full frontmatter/body type model plus the five validate-stage rules (silent-failure discriminator, volatile-fact lint over body + frontmatter strings, per-claim assert keying + regex governance, run-context enum, membership hygiene). 35 unit tests.
- **Four shared substrate files** — `always-set.yaml` (9 identity docs, classes sourced to 119-A Req 6 AC1), `field-dispositions.yaml` (full Kiro-config-field union + runtime tool refs), `shared-catalog.yaml` (completion tooling, `find_docs`, record-first ratification rule), `skills-map.yaml` (skeleton). Plus the WORKFLOW_RULES import + anti-duplication guard. 8 more tests (43 total).

**Validation**: agent-generator suite 43/43; `npm test` 8985/8987 (the 2 failures are a pre-existing, unrelated `init.test.ts` doc-count drift — spawned `task_29d847eb`). Zero failures introduced.

**Open items** (tracked, non-blocking): rule-1 per-doc enforcement wires in at Task 2.1 (C3); the `shared-catalog` ratification crossRef awaits a target (125-B doesn't exist yet) — needs a Peter decision before Task 7; two always-set docs carry an unresolved orientation-reference class. See the completion doc for detail.
