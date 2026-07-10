# Task 7.1 Completion: Sweeps 1–4 with prove-it-bites

**Date**: 2026-07-10
**Task**: 7.1 Implement sweeps 1–4 with prove-it-bites (Implementation, Tier 2)
**Agent (planned)**: Thurgood — **executed by the main loop (Fable 5)**; delta note below
**Spec**: 122-agent-generator
**Branch**: task/122-substrate

---

## What was built

`tools/agent-generator/sweeps/` — new module following the C7 idiom (pure injectable
`runSweepN(inputs)` + `require.main` CLI, run via `npx tsx`):

- **`common.ts`** — shared sweep infrastructure: `SweepFinding` (FAIL / ADJUDICATE / INFO),
  `assembleReport` (a recorded adjudication covers an ADJUDICATE delta; `pass` = no FAIL and
  no uncovered ADJUDICATE), `formatSweepReport` (renders `ADJUDICATE:` blocks naming the
  owner per C8's never-auto-resolve rule), repo-file `<path> § "Heading"` ref resolution,
  and the production readers (all tolerate substrate emptiness).
- **`sweep-1-refs.ts`** (`122-sweep-1-refs`) — reference-resolution: canonical law refs +
  `routes.docs` via the running docs MCP (interim section form, Req 3 AC2, both legs named);
  shared-catalog `source`/`crossRef` repo-file § refs against the filesystem; the
  retired-name scan (`get_documentation_map`, `ts-node` — Req 3 AC3 / Req 5 AC2) over
  authored canonical source + templates with explicit `retired-mention-ok(<reason>)`
  annotation as the only exemption; and the **INTERIM crossRef enumeration** (INFO on every
  run — the standing-visibility backstop for the Peter-approved interim targeting,
  2026-07-10).
- **`sweep-2-skills.ts`** (`122-sweep-2-skills`) — skills round-trip, both directions:
  every `skills/` dir ↔ exactly one skills-map row; CC discovery contract (flat dir +
  SKILL.md + frontmatter name + activation description **byte-equal** to canonical, D-A2);
  Kiro emitted path exists + generated `skill://` refs resolve; declared keys resolve;
  `skills: []` → recorded PASS `0 declared / 0 emitted` (visible INFO, never a silent skip).
- **`sweep-3-dupes.ts`** (`122-sweep-3-dupes`) — resources double-load: normalize every
  emitted-Kiro-config resource URI (scheme + `./` stripped) and FAIL on any duplicate.
  Standing scope = cutover-ledger agents (emitted configs); `--all-configs` is the
  bite/diagnostic mode over the hand configs. Handles the rich knowledgeBase resource
  OBJECTS live in ada.json/lina.json (normalizes their `source` URI — found live when the
  bite run crashed on the object shape; the schema carry remains the Task 5 open item).
- **`sweep-4-ambient.ts`** (`122-sweep-4-ambient`) — ambient set-difference:
  `designed = Task-9 block ∪ always-set` (gap #7's union resolution rule, b7c3c148:
  inlined always-set members are class annotations, never membership selection) vs the
  emitted ambient manifest; BOTH differences reported; every delta an owner-routed
  ADJUDICATE covered only by a recorded adjudication. Includes the mechanical Task-9 block
  parser (validated against the LIVE design doc: 8 blocks; Data includes `start-up-tasks`).
  Same machinery runs Req 10 AC4 set-inclusion (consumer App/Product-MCP cues ⊆ generated
  catalog).
- **`canonical/adjudications.yaml`** (new, empty) — the machine-readable adjudication record
  sweeps consume. **INTERPRETATION CALL flagged for review**: C10.2 records adjudications in
  the cutover sweep report (prose); a STANDING check needs a machine-readable record so a
  ruled `intentional-trim` delta (which persists forever as a set-difference) stops failing
  every PR while staying visible (`[adjudicated:<ruling>]` in every report). Every row must
  cite a `record` — authority is a record. Data's b7c3c148 case needed NO row (resolved by
  fixing the designed input via the union rule — the preferred path).

Folded-in pre-items (Peter, 2026-07-10):
- `canonical/shared/shared-catalog.yaml` — `record-first-ratification.crossRef` re-pointed
  from the sweep-blinding TODO to the **interim target**
  (`.kiro/docs/ballots/README.md § "The Ratification Protocol (record-first) — approved by Peter, 2026-07-05"`),
  with machine-readable `crossRefStatus: interim` + `crossRefResolveWhen`. Two
  `retired-mention-ok` annotations added (negation-context mentions of the removed tool).
- `SharedCatalogMember` extended (`crossRefStatus` / `crossRefResolveWhen`) —
  `tools/agent-generator/adapters/index.ts` (crossRef is sweep metadata; never rendered).
- **`.kiro/specs/125-mechanical-enforcement-strategy/inbound-to-125-B-from-122.md`** (new) —
  the re-point obligation recorded at 125-B's formalization decision point (umbrella dir;
  no 125-B directory exists yet, per Peter).

## Prove-it-bites (Req 19 AC2 — recorded before cutover trust)

| Sweep | Bite | Result |
|---|---|---|
| 1 | induced bogus doc id (`bogus-doc-id-does-not-exist`) | FAIL naming id + owner (test `PROVE-IT-BITES`, sweep-1-refs.test.ts) |
| 1 | unannotated `ts-node` mention | FAIL naming file:line (test) |
| 2 | mangled row `cc` path (`.claude/skills/adaptive-MANGLED`) | FAIL (test); byte-equal description violation separately proven (D-A2 truncation test) |
| 3 | **free positives, live `--all-configs` run** | **FAIL ×4** — see below |
| 4 | Data's `start-up-tasks` drop, pre-correction shape (b7c3c148) | owner-routed ADJUDICATE with key `data/designed-minus-generated/start-up-tasks` (test); post-union live shape = no-delta (test) |

**Sweep 3's live bite exceeded the design's prediction.** The design named two free
positives (leonardo.json, kenya.json). The live run found **four** configs double-loading
`governance/Product-Token-Governance.md` (`file://` + `skill://`): **data, kenya, leonardo,
sparky** — recorded here as pre-cutover truth. These are hand configs (input-of-record; NOT
edited by this task); each resolves at its agent's cutover, where sweep 3 gates the emitted
config (leonardo's resolution is already a named C10.2 acceptance signal).

Live CLI runs (all four sweeps, current substrate): sweep 1 **PASS** with the interim
crossRef enumerated as INFO; sweep 2 **PASS** (5↔5 round-trip, descriptions byte-equal);
sweeps 3+4 **PASS** with recorded vacuous-scope INFO (pre-cutover: empty ledger, no emitted
manifests).

## Validation (Tier 2)

- `npx tsc --noEmit -p tools/agent-generator/tsconfig.json` — clean.
- `npm run test:agent-generator` — **253/253** (21 suites; +31 over Task 6).
- Live CLI runs recorded above (exit codes verified: 0/0/0/0 standing; 1 on the bite run).

## Interpretation calls flagged (for Thurgood/Peter review)

1. **`canonical/adjudications.yaml`** as the standing machine-readable adjudication record
   (rationale above).
2. **Retired-name scan scope** = authored canonical (`canonical/agents`, `canonical/shared`)
   + templates (`render.ts`, `adapters/*.ts`); introspected/generated artifacts
   (`canonical/registry` etc.) excluded — the live find_docs description legitimately says
   "Supersedes get_documentation_map" (external truth, kept honest by C6/C7, not this scan).
3. **`retired-mention-ok(<reason>)`** annotation as the only negation-context exemption
   (a demotion-style cue must NAME what it retires — same principle as sweep 8's negatives).
4. **Repo-file § heading resolution** = substring-of-a-heading-line (a ref may quote the
   stable stem of a heading carrying a date/ratifier suffix); MCP refs stay verbatim-exact.
5. **Sweep 3 standing scope** = ledger agents only (emitted configs); hand configs enter
   per-agent at cutover. `--all-configs` preserved as the diagnostic/bite mode.

## Delegated-tier capture

Planned `Agent: Thurgood`; executed in the **main loop (Fable 5)** — continuity with the
session holding the full C8 design context + live adjudication of in-flight surprises (the
knowledge-base object shape, the 4-config bite). Agent-evolution signal (routing), not
model-evolution.
