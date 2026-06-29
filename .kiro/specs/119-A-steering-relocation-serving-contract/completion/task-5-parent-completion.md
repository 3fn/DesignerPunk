# Task 5 Completion: Filename Normalization (Mass-Rename of 10 Space-Bearing Files)

**Date**: 2026-06-29
**Task**: 5. Filename Normalization (Mass-Rename of 10 Space-Bearing Files)
**Type**: Parent
**Status**: Complete (pending main-loop re-verification + commit)
**Agent**: Thurgood / Docs-MCP infra & Civitas
**Validation**: Tier 3 — Comprehensive

> Sequencing step 3 (design.md § "Sequencing"): rename runs AFTER the resolver (Task 2) + frozen legacy-path manifest (Task 3) are live, and BEFORE relocation (Task 6). The frozen manifest already keys the ORIGINAL space-bearing paths, so old-path references keep resolving via `legacy-fallback` after the rename. **Not committed** — the main loop reviews, re-verifies, rebuilds the index, spot-checks renames + resolution, and commits on `spec-119a-relocation`.

---

## Artifacts Created / Modified

**Renamed (`git mv`, history preserved — `R` status):** the 10 verified space-bearing files in `.kiro/steering/` → kebab-case/no-spaces (mapping table below). Content and frontmatter (including the Task-4-frozen `id:`) byte-unchanged; only the filename changed.

**Modified (functional `always`-inclusion wiring keyed on the renamed filenames):**
- `.kiro/agents/{ada,kenya,sparky,stacy,data,lina,leonardo,thurgood}.json` — `resources[]` entries (`file://` / `skill://`) repointed to the new filename. Schemes preserved; directory portion (`.kiro/steering/`) unchanged (this is the rename, not the relocation).
- `scripts/governance-check.sh` — `STARTUP_FILE` path constant (`:107`) repointed `Start Up Tasks.md` → `start-up-tasks.md` (the Civitas governance-date updater for the Start Up Tasks identity doc).
- `src/__tests__/browser-distribution/mcp-queryability.test.ts` — load-bearing `.kiro/steering/Browser Distribution Guide.md` path literals + the `toContain('Browser Distribution Guide.md')` on-disk-filename assertion → kebab.
- `src/__tests__/browser-distribution/mcp-format-compliance.property.test.ts` — load-bearing path literal + filename constant → kebab.

**Recorded (subtask 5.2):** the kebab-case/no-spaces steering-filename standard (below; feeds the Task 12 conventions doc — full doc NOT authored here).

---

## 5.1 — Rename the 10 space-bearing files

### Rename mappings (old → new), `id:` confirmed unchanged

| # | Old filename | New filename | Frozen `id:` (unchanged) | inclusion |
|---|---|---|---|---|
| 1 | `00-Steering Documentation Directional Priorities.md` | `00-steering-documentation-directional-priorities.md` | `steering-documentation-directional-priorities` | `always` (meta-guide, Task 10 removal target) |
| 2 | `A Vision of the Future.md` | `a-vision-of-the-future.md` | `a-vision-of-the-future` | `manual` |
| 3 | `Browser Distribution Guide.md` | `browser-distribution-guide.md` | `browser-distribution-guide` | `manual` |
| 4 | `Completion Documentation Guide.md` | `completion-documentation-guide.md` | `completion-documentation-guide` | `manual` |
| 5 | `Core Goals.md` | `core-goals.md` | `core-goals` | `always` (identity) |
| 6 | `Cross-Platform vs Platform-Specific Decision Framework.md` | `cross-platform-vs-platform-specific-decision-framework.md` | `cross-platform-vs-platform-specific-decision-framework` | `manual` |
| 7 | `Personal Note.md` | `personal-note.md` | `personal-note` | `always` (identity) |
| 8 | `Release Management System.md` | `release-management-system.md` | `release-management-system` | `manual` |
| 9 | `Start Up Tasks.md` | `start-up-tasks.md` | `start-up-tasks` | `always` (identity) |
| 10 | `Technology Stack.md` | `technology-stack.md` | `technology-stack` | `manual` |

- **`git mv` used for all 10** — git reports all as pure renames (`R`), so history is preserved.
- **Each `id:` is byte-unchanged** (Task 4 wrote it; the rename touches only the filename). Verified post-rename: every renamed file still carries its original `id:`, and each matches the frozen legacy-path manifest entry exactly (Req 3 AC3).
- **`.kiro/steering` post-rename**: 89 `.md` files, **zero** space-bearing filenames remaining.
- Targets are the canonical human kebab mapping (lowercase, spaces → `-`); cross-checked against the slug logic. Note: the kebab *filename* deliberately differs from the doc `id` for the meta-guide (`00-steering-documentation-directional-priorities.md` vs id `steering-documentation-directional-priorities`) — the leading `00-` is a filename-ordering artifact stripped from the title-slug id. This is correct and consistent with the addressing-plane / filename decoupling (Req 2 AC7, Req 3 AC3).

### `always`-inclusion wiring updated (Req 3 AC4)

The agent-definition `resources[]` arrays are Kiro's **functional** `always`-inclusion wiring: Kiro's `file://`/`skill://` resource loader reads the literal path off disk per session. **This is NOT covered by the legacy-path fallback** — the fallback is the Docs-MCP resolver's secondary lookup (the five path-taking MCP tools), not Kiro's resource loader. A renamed file leaves these `resources` entries pointing at a vanished filename, so they MUST be updated by filename.

Updated entries (filename-only; directory stays `.kiro/steering/`):
- **Identity docs** (stay in `.kiro/steering/`): `core-goals.md` (8 agents), `personal-note.md` (8 agents), `start-up-tasks.md` (8 agents). After this filename-only edit these entries are FULLY correct — Task 7.3 leaves identity entries alone, so nothing further is owed for them.
- **Non-identity docs that also appear in `resources`** (will relocate to `governance/` at Task 6/7.3): `completion-documentation-guide.md` (thurgood, stacy), `cross-platform-vs-platform-specific-decision-framework.md` (leonardo, lina), `technology-stack.md` (kenya, data, leonardo, sparky). See "Scope decision" below.

Other functional wiring updated: `scripts/governance-check.sh:107` (`STARTUP_FILE` literal) — without this, `[ -f "$STARTUP_FILE" ]` returns false after the rename and the monthly governance-health date silently fails to update (a Civitas-loop degradation). This is an identity doc that stays in `.kiro/steering/`, so a filename-only repoint is complete.

All 8 agent JSONs re-validated as well-formed JSON after the edit.

### Scope decision — non-identity `resources` entries (flagged, not silent)

The rename breaks the **filename** of `resources` entries regardless of which directory the file lives in. Three non-identity docs that relocate at Task 6 are also present in some agents' `resources`. I updated the **filename** portion of those entries now (to `.kiro/steering/<kebab>.md`) rather than leaving the whole entry for Task 7.3's relocation repoint.

- **Rationale**: between Task 5 (this rename) and Task 7.3, the non-identity files physically live at `.kiro/steering/<kebab>.md` (relocation to `governance/` is Task 6). Leaving the old space-bearing filename in the JSON would leave those resources broken for the entire Task 5 → Task 7.3 window. Fixing the filename now removes that window and leaves Task 7.3 a clean directory-only repoint (`.kiro/steering/` → `governance/`) for the non-identity subset.
- **No double-work concern of substance**: Task 7.3 was always going to touch these entries (the directory repoint); this just makes that a one-segment change.
- **Boundary respected**: Task 7.3 still owns the `governance/` directory repoint and the "leave identity entries" discipline. This task only normalizes filenames.

### Judgment call — the meta-guide (`00-Steering Documentation Directional Priorities.md`)

**Decision: renamed it per Req 3 AC2 for convention uniformity. No risk found; the rename does not complicate Task 10's removal.**

Evidence gathered before deciding:
- The meta-guide is **NOT in any agent `resources[]` array** — so no Kiro `always`-inclusion wiring breaks on its rename. Its always-load is driven by its own frontmatter `inclusion: always`, which travels with the file regardless of filename.
- Its `#[[file:...]]` bulk-load is confirmed **already removed** (`grep` → 0 occurrences; per commit `5489b6cf`).
- The only functional reference outside specs/docs is `scripts/extract-doc-structure.sh:45` — a one-shot **spec-020** (2025) analysis-artifact generator that writes into a historical spec directory. It is not inclusion wiring, not in the Task 1.3 MUST-FIX set, and not part of any live workflow. **Left as-is** (out of Task 5 scope; a historical/R3 surface). Flagged here for awareness; it would `extract_structure` a now-missing path if ever re-run, but it is a dormant 2025 script.
- Task 10 removes whatever filename exists; renaming it to convention is harmless and arguably makes the removal cleaner. No wiring makes the rename risky.

## 5.2 — Record the kebab-case filename standard

**Standard recorded (captured here; the full conventions doc is Task 12):**

> **Steering-doc filename standard (Spec 119-A, Req 3 AC1):** Steering-doc filenames SHALL be **kebab-case with no spaces** — lowercase ASCII, words separated by `-`, no spaces or shell-unsafe characters. A leading numeric ordering prefix (e.g. `00-`) is permitted on the filename and is NOT part of the doc's title-slug `id`. The filename is decoupled from document identity: identity is the immutable frontmatter `id` (kebab-slug of `name:`/H1), and a rename changes only the filename, never the `id`.

This is the input-of-record for the Task 12 conventions governance doc (which will document `id` / `aliases` / filename conventions together, under the ballot-measure model). No full convention doc is authored here.

---

## Post-Rename Verification (performed by Thurgood)

- **Index rebuilt** (`rebuild_index`): `status: healthy`, **89 documents indexed**, 0 errors, 0 warnings.
- **Both resolution directions proven** for 2 samples (one identity, one non-identity), via a throwaway Jest probe driving the real on-disk `DocumentIndexer` (probe removed after use):
  - `core-goals` (by id) → `strategy: 'id'`; OLD `.kiro/steering/Core Goals.md` → `strategy: 'legacy-fallback'`; both resolve to the **same indexed key**.
  - `technology-stack` (by id) → `strategy: 'id'`; OLD `.kiro/steering/Technology Stack.md` → `strategy: 'legacy-fallback'`; same indexed key.
- **Tests + tsc (run by Thurgood):**
  - mcp-server: `npx jest --runInBand` → **35 suites / 582 tests**, 1 transient failure in `tests/property/parsing-properties.test.ts` (the known unseeded fast-check flake, untouched by this branch) which **passed green on serial re-run** (12/12). `tsc --noEmit` clean.
  - root: `npm test` → **377 suites / 8990 tests / 0 failed** (after updating the 2 test files that hardcoded the old `Browser Distribution Guide.md` path — these are Thurgood-domain test-infra files in `src/__tests__/`, within write scope). `tsc --noEmit` clean.

### Live-MCP note (re-verify after restart)

The currently-running Docs-MCP server process returned `FileNotFound` for the OLD space-bearing paths (and resolved NEW paths only via legacy exact-match). This indicates the **live server process is stale** — it predates the Task 2/3 resolver + legacy-seeding code (or its `rebuild_index` re-seed needs a process restart). The on-disk source is correct and proven via the indexer directly. **The live MCP server should be restarted** (not merely `rebuild_index`-ed) for the legacy-fallback to be observable through the MCP tools. Flagged for the main loop's re-verification pass.

---

## Honest Notes

- **The legacy-path fallback does NOT cover Kiro's `file://`/`skill://` resource loader** — only the Docs-MCP resolver. That is why the agent `resources[]` filename updates were mandatory, not optional, and why prose references (which DO go through the MCP resolver) were left to the fallback.
- **Historical / spec / completion doc references to the old filenames were intentionally left as-is** (Req 10 AC2: historical docs not rewritten; prose path refs resolve via the fallback during the window). The grep over the corpus surfaces many such references — none are functional inclusion wiring.
- **`sync-manifest.json` still keys the 10 OLD paths** — deliberately left; it is regenerated with `governance/` keys at Task 7.3 (not a Task 5 surface).
- **`extract-doc-structure.sh`** (spec-020 dormant script) references old paths; left as-is, flagged above.
- **Meta-guide filename ≠ its `id`** by design (leading `00-` prefix); not a defect.

## Next

- **Not committed** — main loop re-runs both suites + tsc, **restarts the live MCP server** + rebuilds the index, spot-checks the 10 renames (`R` status, `id:` intact) and both resolution directions, then commits on `spec-119a-relocation`.
- Unblocks Task 6 (relocate non-identity docs → `governance/`) — the rename preserves each frozen `id`; relocation then moves the non-identity subset and Task 7.3 repoints the `resources` directory portion for those.
