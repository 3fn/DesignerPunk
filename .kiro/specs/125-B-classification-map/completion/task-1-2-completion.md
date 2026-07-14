# Task 1.2 Completion: Create the Register Scaffold

**Date**: 2026-07-14
**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Task**: 1.2 Create the register scaffold (Implementation, Tier 2 — Standard)
**Agent**: Thurgood (Sonnet) — as planned in tasks.md; no divergence
**Requirements**: 1.1–1.7; Design: C1, DD1

---

## What Was Created

`governance/classification-map.md` — the register scaffold, entries deliberately empty (1.3/1.4 add the first rows). Contents:

1. **Steering metadata header** per house convention (verified against `governance/Token-Governance.md` and `governance/Steering-Addressing-Conventions.md`): YAML frontmatter (`id: classification-map`, `inclusion: manual`, `name`, `description`, `aliases` seeded per Convention 4) + the markdown header block (Date / Last Reviewed / Purpose / Organization / Scope / Layer / Relevant Tasks). Location `governance/` per DD1 (unguarded, MCP-served, inside U3's CODEOWNERS path set).
2. **About This Register** — the three per-entry decisions (boundary call / verification disposition + owner / education disposition), the governing-methodology pointer (125 outline §2 via the merged 125-B spec), and the LIVING-register rule (changes dated and attributed via `history`, supersede-never-rename — Req 1.5).
3. **Addressing and Citation (Req 1.6)** — citation grammar `governance/classification-map.md § "<entry-id>"` (sweep-1's `path § "heading"` grammar); entry-ids are `###` headings, kebab-case, NEVER renamed once cited; **unique AND non-substring-prefixes of one another**, with the WHY recorded: sweep-1 resolves headings by verbatim substring (`common.ts:186`), so a colliding id mis-resolves silently (C1's ADA R1 mandate).
4. **Entry Schema** — the fenced-YAML shape per design § Data Models (fields below), including the `scoped` sentinel semantics, per-scope `checks`/`check_state`, and the `dormant` check-state definition (armed-but-empty/stale selection, Req 1.3).
5. **Illustrative example** — inside a four-backtick fenced block, explicitly labeled documentation-not-a-row, using a fictional id (`example-rule-id`) so it cannot be cited, resolved by sweep-1, or collide with future real entry-ids.
6. **Entries** section header, empty, with an HTML comment pointing authors at the constraints.

## Schema Fidelity Against Design § Data Models

Field-for-field check against the design's fenced-YAML model (design.md lines 124–152):

- `rule` (one line) — ✓
- `boundary_call.class` (`functional | operational | ideological`) + `rationale` (scalar-row one-liner; scoped rows may push rationale into `scope[]`) — ✓
- `verification.disposition` (`barrier | record-check | warn | none | scoped`) — ✓, with the ADA R1 sentinel rule verbatim in intent: scope[] present ⇒ top-level disposition SHALL be `scoped` (or omitted — documented default); a scoped row has NO valid scalar (barrier flags the definition layer; none misses consumption) — ✓
- `verification.owner` — ✓
- `verification.check_state` (`none | proposed | armed | dormant | retired`, Req 1.3) incl. the DORMANT definition — ✓
- `verification.checks` (concrete check names when armed) — ✓
- `verification.scope[]` — optional; REQUIRED when boundary is surface-dependent (Req 1.2 additive clause); each entry `surface` / `disposition` / per-scope `check_state` + `checks` / `rationale` — ✓
- `education.disposition` — ✓. **Fidelity note**: the tasking brief's summary mentioned "disposition + notes"; design § Data Models defines only `education.disposition`, and per implement-don't-redesign the scaffold documents exactly the design's field. If a `notes` field is wanted, that is a schema amendment for the design owner, not a scaffold liberty.
- `crossRef` (reciprocal half, Req 4.3) — ✓
- `history` (`{ date, change, by }` list) — ✓

## Validation (Tier 2)

- Header matches the governance/ house style (frontmatter + seven-field markdown header) — verified against two existing governance docs before writing.
- `id: classification-map` checked unique against both steering roots (no existing doc carries it; filename kebab-case per Convention 3).
- The illustrative example is fence-enclosed — its `### example-rule-id` line is inert to markdown heading parsing and sweep-1 resolution.
- No register entries created (1.3/1.4's scope); no `completion/pilot/` files touched (1.1 runs in parallel).

## Follow-ups (owned by later subtasks)

- 1.3/1.4: first real entries (authority row; npm-test pilot row).
- 1.5: `record-first-ratification` entry + crossRef re-point reciprocal half.
- Post-U1-s merge (parent task post-completion): docs-MCP `rebuild_index` so the register is queryable.
