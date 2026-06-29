# Task 1 Completion: Doc Inventory + Comprehensive Steering-Path Coupling Sweep

**Date**: 2026-06-29
**Task**: 1. Doc Inventory + Comprehensive Steering-Path Coupling Sweep
**Type**: Parent
**Status**: Complete — foundation task; introduces no code, modifies no document content
**Agents**: Thurgood (audit + drafting, Opus); orchestrator (independent re-verification of consequential findings)

---

## Artifacts Produced

- `.kiro/specs/119-A-steering-relocation-serving-contract/inventory/doc-inventory.md` — all 89 docs enumerated with current path, `inclusion` mode, and post-migration role (Subtasks 1.1 + 1.2)
- `.kiro/specs/119-A-steering-relocation-serving-contract/inventory/coupling-sweep.md` — every `.kiro/steering/…`-coupled surface, classified MUST-FIX / DEFERRABLE / R3, plus inbound family-guidance couplings (Subtasks 1.3 + 1.4)

These two artifacts are the **authoritative source** for the counts they record, superseding the spec's "verified 2026-06-27" figures wherever they differ. Downstream tasks (esp. Task 3 manifest, Task 7 rewiring, Task 11 gate) consume them directly.

## Implementation Details

### 1.1 — Doc inventory + role assignment
- Enumerated via the MCP index as single source of truth (`find_docs`), cross-checked against on-disk `.kiro/steering/*.md`. Disk and index agree filename-for-filename.
- **Count: exactly 89 — no drift.** Index `healthy`, 0 errors/warnings.
- Roles: **8 identity (on disk) + 80 relocated + 1 removed = 89.** The locked identity set is 9 post-119-A; the 9th — **Task Completion Protocol — does not exist yet** (NEW, authored in Task 8.1), so on-disk identity = 8. No un-assignable docs (no exceptions surfaced).
- **Two relocated docs still wrongly carry `inclusion: always`** (`Process-Development-Workflow`, `Process-File-Organization`) — the Req 6 AC3 demotion targets. Flagged for Task 8.1 (demote always→manual) and Task 6 (relocate).

### 1.2 — Staleness triage (flag, do not fix)
- Content-stale docs flagged for the separate Thurgood-led R3 governance audit. No content modified. (See coupling-sweep Bucket C for the code-side stale-string catches.)

### 1.3 — Comprehensive coupling sweep (three buckets)
- **MUST-FIX-119-A** (no MCP fallback; relocation breaks the surface): `sync-manifest.json` (89 steering keys), agent `resources` arrays (170 entries / 50 identity / 120 relocating), `.cursor/mcp.json` + Docs MCP `DEFAULT_STEERING_DIR`, `init.ts`/`designerpunk.ts`, `figma/VariantAnalyzer.ts`+`DesignExtractor.ts`, `scripts/extract-component-meta.ts`, plus the Req 5 packaging surfaces. All with verified `file:line` locations.
- **DEFERRABLE** (rescued by the Req 2 AC3 fallback; swept 119-B): the agent `-prompt.md` path refs (~57 live).
- **R3 / scope-out** (flag, don't fix): `src/validators/Stemma*.ts` stale guidance constants; `.claude/settings.local.json` allowlist.

### 1.4 — Inbound family-guidance couplings
- **22 `companion:` = 9 top-level (gate-visible) + 13 nested (gate-blind)** — no drift. `FamilyGuidanceIndexer.ts:49-52` parses top-level only.
- README companion template at `README.md:32`; 3 reverse-coupling `../../family-guidance/*.yaml` links (Button:659, Container:660, Form-Inputs:1359) — no drift.
- App-MCP baseline: healthy, 0 warnings — the gate axis (Req 8 AC6) asserts this stays zero.

## Drifts from the spec's 2026-06-27 figures (independently re-verified)

| Surface | Spec figure | Live (2026-06-29) | Disposition |
|---|---|---|---|
| Agent `resources` steering entries | "file:// entries only" | **170 total / 120 relocating, across `file://` AND `skill://`** (118 skill / 52 file) | **Scope correction.** Task 7.3 must repoint all 120 (both schemes), not the ~52 a `file://`-only grep returns. Leave the 50 identity entries. |
| Prompt `.kiro/steering/…md` refs | 60 | **~57** (.md refs; 53 by a space-intolerant regex) | Task 3 manifest producer + Task 11 gate key off the **live grep set at freeze time**, never the hardcoded 60. |
| Docs missing `name:` frontmatter | (not noted) | **14** (6 identity) | Heads-up for Task 4.3 `id` backfill — H1-fallback path used more than expected. |

Orchestrator independently re-verified each: doc count (89), resource-scheme split (170 = 52 file:// + 118 skill://), prompt-ref order-of-magnitude (~53–57, not 60), missing-`name:` count (14), and read the full coupling-sweep artifact. Findings confirmed.

## Validation (Tier 3: Comprehensive)

✅ Doc count 89 confirmed three ways (disk, `documentsIndexed`, `find_docs({list})`)
✅ Role assignment complete; no un-assignable docs; identity/relocated/removed = 8/80/1
✅ Every MUST-FIX surface verified live with `file:line`
✅ Family-guidance 22 (9+13) / README:32 / 3 reverse-links all re-verified
✅ App-MCP + Docs-MCP baselines both healthy, 0 warnings
✅ No document content modified; no code introduced
✅ Consequential drifts independently re-verified in the main loop

## Requirements Compliance

✅ Req 1 (AC1–AC7 inventory + classified coupling sweep + family-guidance enumeration), Req 4 AC6 / Req 8 AC6 (family-guidance axis targets enumerated). Staleness handled as triage-only per Req 1 AC4 + the R3 out-of-scope note.

## Notes / Forward-References

- **`StemmaErrorGuidanceSystem.ts:190-192`** points at three doc paths that do not exist today (`form-inputs-components.md`, `button-components.md`, `container-components.md`) — stale independent of relocation; routed to the R3 audit, not 119-A.
- The two `always` relocated docs are tracked for Task 6 + Task 8.1.
- Inventory artifacts are the count-authority for downstream tasks; spec body not rewritten (artifacts supersede).

## Related Documentation

- [Task 1 Summary](../../../../docs/specs/119-A-steering-relocation-serving-contract/task-1-summary.md)
- Inventory: [doc-inventory.md](../inventory/doc-inventory.md), [coupling-sweep.md](../inventory/coupling-sweep.md)
