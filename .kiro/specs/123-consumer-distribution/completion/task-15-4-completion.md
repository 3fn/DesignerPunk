# Task 15.4 completion: operative sets for all units; dispositions and overlays for the 8 charters, the shared substrate and the identity docs; the knowledge-fallback re-points

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 15 · **Agent**: Thurgood (Opus), PRIMARY (the profile author)
**Date**: 2026-09-29 · **Branch**: `task/123-u2b-profile` (main checkout), from `39efff78` (Lina's Task 14 addendum merged behind 15.3)

**Status of this subtask**: authoring complete. It is **not ticked**, because its C9 row names an act in Stacy's seat: the counting-block unit's C1 confirmation, which the parent criterion binds to 15.4 (see § C9). The tick follows her confirmation commit.

**Write scope**:
- **Inside the grant**: `canonical/operative-sets/**`, `canonical/profiles/consumer/**` and `canonical/_consumer-output/**` (Task 15's Primary Artifacts).
- **Out-of-list, disclosed**:
  - `tools/agent-generator/__tests__/consumer-profile.real.test.ts` (new): the real-profile criteria.
  - `tools/agent-generator/__tests__/operative-set.checks.test.ts` (Task 13.3's): the frozen list of record files grows from 4 to 17, so the non-vacuity check reads the new population.
  - `canonical/coverage-map.yaml` (generated): rows for the new canonical surfaces.
  - `.kiro/specs/123-consumer-distribution/first-render/drafting/**` (the charter's own write scope): the drafting aids, committed so the method is reproducible.
  - `canonical/generated.lock` is not committed; it is refreshed at the parent.

**CI-provenance**: local — known-red window (the 15.5 confirmation notes are owed; see § Known red). Checkpoints were pushed `--no-ci`.

## What changed

**Coverage**: 17 dispositions files, 17 overlays, 17 operative-set records (13 new, and `lina` / `stacy` / `start-up-tasks` extended), and the committed consumer rendering: 113 files under `canonical/_consumer-output/`.
- **Rows**: every body unit, frontmatter leaf and shared member of the population carries an explicit row, 960 in all.
- **Records**: every body unit of every source is recorded, 370 units and 1356 items.
- **Confirmed records are kept byte-for-byte.** The drafting builder reads each record as committed at `e4dfa9e3` and appends the new units only; `git diff` shows additions only.

**Per-bucket counts** (criterion C4 asks for counts per agent). Methods:
- The `ncc` rate is the no-consumer-counterpart rows over all rows (B-U2 M1's state metric, a first-render baseline).
- *Routed* means entered the triviality floor and ROUTES, computed with `classifyCharter` over the drafted records and each unit's rendered text.

| Bucket | Body rows (ret / re-pt / ncc) | Frontmatter or member rows (ret / re-pt / ncc) | `ncc` rate | Units / items recorded | Routed units | Signer (C1) |
|---|---|---|---|---|---|---|
| ada | 11 / 11 / 0 | 55 / 2 / 13 | 13 / 92 | 22 / 66 | 11 | ada |
| lina | 26 / 13 / 0 | 71 / 1 / 11 | 11 / 122 | 39 / 122 | 13 | lina |
| thurgood | 23 / 24 / 0 | 44 / 1 / 21 | 21 / 113 | 47 / 148 | 23 | stacy |
| sparky | 23 / 10 / 0 | 49 / 2 / 20 | 20 / 104 | 33 / 120 | 8 | sparky |
| leonardo | 39 / 5 / 0 | 90 / 2 / 4 | 4 / 140 | 44 / 135 | 5 | leonardo |
| data | 21 / 13 / 0 | 48 / 4 / 13 | 13 / 99 | 34 / 134 | 11 | data |
| kenya | 20 / 13 / 0 | 43 / 4 / 15 | 15 / 95 | 33 / 123 | 11 | kenya |
| stacy | 17 / 17 / 1 | 59 / 2 / 12 | 13 / 108 | 35 / 196 | 16 | stacy |
| _shared | — | 2 / 1 / 1 | 1 / 4 | — | 0 | stacy (members are Thurgood's) |
| always-set/core-goals | 1 / 2 / 0 | — | 0 / 3 | 3 / 27 | 2 | stacy |
| always-set/ai-collaboration-principles | 7 / 2 / 0 | — | 0 / 9 | 9 / 24 | 2 | stacy |
| always-set/spec-feedback-protocol | 12 / 3 / 0 | — | 0 / 15 | 15 / 32 | 3 | stacy |
| always-set/start-up-tasks | 5 / 4 / 0 | — | 0 / 9 | 9 / 48 | 4 | stacy |
| always-set/task-completion-protocol | 1 / 12 / 0 | — | 0 / 13 | 13 / 76 | 12 | stacy |
| always-set/agent-directory | 11 / 4 / 0 | — | 0 / 15 | 15 / 48 | 4 | stacy |
| always-set/designerpunk-systems-overview | 8 / 2 / 0 | — | 0 / 10 | 10 / 22 | 0 | stacy |
| always-set/civitas-system-overview | 5 / 4 / 0 | — | 0 / 9 | 9 / 35 | 3 | stacy |
| **Total** | | | **111 / 960** | **370 / 1356** | **128** | |

**The class policy.** Every row was judged; these are the rules the judgments follow, stated so a signer can check a row against its class:

| Class | Disposition | Cite |
|---|---|---|
| "Peter" as the human lead, and any authority named by person | re-pointed to "your human lead" | subtraction-2 removal |
| DesignerPunk's own npm scripts, hooks and scripts (`runContext: this-repo`) | no-consumer-counterpart | subtraction-1 |
| Routes into DesignerPunk's workflow law (`completion-documentation-guide`, `process-development-workflow`, `process-file-organization`, `docs/specs/**`) | no-consumer-counterpart | subtraction-4 |
| Routes to the spec **formats** (`process-spec-planning`, `process-task-type-definitions`), test, contract and token standards — docs that ship and describe transferable standards | retained | — |
| `.kiro/specs/**` write scope | re-pointed → `specs/**` (DD15: the starter specs live at `specs/`) | — |
| Sources that do not ship (`src/validators`, `src/generators`, `platforms/web`, `application-mcp-server`, `*Test.kt` / `*Tests.swift`) | no-consumer-counterpart | subtraction-5 |
| DesignerPunk's stale `dist/*` snapshot guidance, ground-truth trims and repo facts | no-consumer-counterpart (frontmatter) / re-pointed (body) | subtraction-3 / subtraction-1 |
| Docs-MCP steward verbs over DesignerPunk's corpus (`validate_metadata`, `list_cross_references`, docs `rebuild_index` cues), and the steward-verb carve-out unit | no-consumer-counterpart | subtraction-3 |
| Ratification history (ballots, "Q5 … ratified", Spec 127/125-A citations) | removed inside re-pointed units | subtraction-2 |
| Tool grants (`toolSubset.*`), agent routes, skills, `preflight`, `kiro.*`, ambient embeds of shipped standards | retained | — |

- **The knowledge-fallback re-points (Kenya/Data R1)**:
  - `knowledgeBases[ios-components]` and `knowledgeBases[android-components]` are re-pointed to `node_modules/@3fn/core/src/components/core/*/platforms/{ios,android}/**`, where those sources ship.
  - `ios-tests` and `android-tests` are disposed no-consumer-counterpart (subtraction-5), because test sources are excluded from the package's `files[]`.
  - Both charters' in-scope and fallback prose is re-pointed to the same paths.
- **Stacy's owed-set pipeline** re-points to **G1 run 1's committed exemplar E rendering, verbatim** (the honest re-pointing, NOT TRIVIAL at G1).
- **The Kiro config** (block note N3, built at 15.3) now carries `resources` → the `designerpunk-*` member files and the installed package, and `allowedPaths` → `specs/**`.

## C9 — the counting-block unit (Task 13's ⚠️ discharge row)

- **Recorded**:
  - `canonical/operative-sets/stacy.yaml` carries `#the-claims-pass-record-claims-passmd-the-template`, drafted against its **post-13.8 text**.
  - `canonicalHash: sha256:8103d28ef4a140c355a2c82c2395c492fceb1b48c46a87b24f49b6713fb38ac7`, with 27 items.
  - The `volatile-ok` marker is inside the hash and is not an item.
  - The confirmation note is to be `canonical/profiles/consumer/confirmations/stacy.md#the-claims-pass-record-claims-passmd-the-template`.
- **Edit site 5 of the instrument ballot has reached U2b.** Stacy's "instruments read" bullet merged into U2b at `c34ee564` (an ancestor of `HEAD`), and `grep -c "The instruments read" canonical/agents/stacy.md` → 1. The text recorded here already contains it, so **no A4 re-confirmation is owed on U2b**.
- **The consumer rendering disposes of the marker**, never passing it through: the unit is re-pointed, and its overlay (a consumer claims-pass template) carries no `volatile-ok` comment.
- **Owed, in Stacy's seat**: the C1 confirmation (her record edits, if any, and the note block). The green freshness sweep over it follows her commit.

## Targeted tests + result

- `consumer-profile.real.test.ts` → **`Tests: 41 passed, 41 total`**. It covers:
  - the population: 17 dispositions files, and 57 committed consumer files (8 `_canonical` agents, the shared catalog, 8 `_canonical` identity docs, 8 CC agents, 16 Kiro agent files, 16 identity members);
  - no missing row or orphaned key over all 17 files;
  - every record covers every body unit, and the hard floor passes for all 8 charters;
  - survivor-sourced over every committed consumer artifact;
  - `derive()` refuses a stale pin and an orphaned key over the real profile;
  - the Kenya/Data paths.
- **Bites.** Each one mutated a file and ran the test; restoration was from a saved copy of `canonical/_consumer-output` and `canonical/profiles`, verified with `diff -r` / `cmp`:

  | # | Mutation | Red |
  |---|---|---|
  | R1a | ada's only knowledge base disposed, then regenerated | `grep -c "## Knowledge fallback"` in the consumer `ada.md`: 1 → **0**; restored and regenerated → **1** (**the header vanishes with its last member, and returns**) |
  | R1b | the same row disposed, not re-rendered | `✕ … every span of every committed consumer artifact … is survivor-sourced` |
  | R2 | one identity member file deleted | `✕ the committed rendering covers every agent × target, …` |
  | R3 | a row removed from `lina.dispositions.yaml` | `✕ …lina.dispositions.yaml: no missing row, no orphaned key` (and the survivor check) |
  | R4 | every ada body row set no-consumer-counterpart | `✕ ada` (the hard floor) |
  | R5 | Kenya's `ios-components` row retained, then regenerated | `✕ … knowledge-fallback paths are re-grounded … › kenya` |

- **The deny-list scan** over the committed rendering (`complete-task.sh | Peter merges | RATIFIED | .kiro/specs | .kiro/docs/ballots | ballot <date>`) finds only two lines. Both are the `.kiro/specs/063-…` sentence of the `contract-system-reference` **ambient embed** (Lina's and Sparky's); see § Residuals. Task 16 runs the packed-install scan.
- `npm run test:agent-generator` → **`Tests: 1 failed, 1478 passed, 1479 total`**. The one failure is the known-red window, not a defect: `the sweep over the real repo › is clean, and not vacuous` (freshness: 349 confirmation notes owed; see § Known red).
- `npm run audit:coverage-map` → `PASS (surfaces PASS · lanes PASS)`.
- `tsc -p tools/agent-generator` → 0.

## Known red, until the 15.5 confirmations

- `runFreshnessSweep` → `FAIL — 17 record(s), 373 unit(s), 4 note(s), 17 dispositions file(s), 17 overlay(s)`. **Every finding is `confirmation`**, 349 in all: each drafted unit's note is owed by its C1 confirmer.
  - by owner: ada 22 · lina 26 · sparky 33 · leonardo 44 · data 34 · kenya 33;
  - **Stacy 157**: her own 29 (including C9), thurgood 47, and the identity docs 81.
- There is no other finding kind: no stale hash, no orphan, no missing row, no stale pin, no wrong confirmer, no non-verbatim item.
- `122-diff-guard` is red for that reason alone, so checkpoints go `--no-ci` until the notes land.

## Application-time adaptations

1. **The identity docs' item sets are drafted by a stated heuristic**: every list line, and every prose sentence carrying a normative keyword; code fences, tables and headings skipped. It is refined by hand for the Agent Directory (role lines and routing-table rows) and core-goals (the operative bullets only). **Stacy's confirmation fixes them**: a narrowed set is a reviewed diff in her seat (Req 11.6.5d).
2. **Removal texts are partly descriptive.** Where a whole unit or several passages are re-grounded, `removals[].text` names what was removed rather than quoting every byte. Clause (iii)'s applicability check reads them.
3. **Spec-format routes are retained for every agent** (`process-spec-planning`, `process-task-type-definitions`): they are transferable standards. The completion, workflow and file-organization routes are dropped as DesignerPunk's workflow law. That was decided once, then applied to all 8 charters.
4. **Sparky's name story** ("Sarah Parks — Peter's engineering partner") is retained verbatim as naming lore, not an authority claim. Only the authority lines are re-pointed.
5. **The Civitas overview is re-grounded** as the consumer's own governance layer ("their Civitas, not ours", Req 11.1.1). **The DesignerPunk Systems Overview is retained** as the orientation reference to the upstream system, with only its relative links re-pointed to the `designerpunk-*` member names.

## Residuals, carried by name

- **DD19 embeds carrying repo-bound text** (an embed is retained whole or dropped whole):
  - Ada's `token-governance` embed says "Peter's explicit approval";
  - Lina's and Sparky's `contract-system-reference` embeds cite `.kiro/specs/063-…`.

  The remedy is an edit to the owning doc (Ada: Token-Governance; Lina: Contract-System-Reference), through its owner's normal path. Flagged for the orchestrator to route; not blocking.
- **The first-render load, measured**: 349 confirmations and about 239 signatures (128 routed units + 111 no-consumer-counterpart rows). **Stacy carries 157 confirmations and about 104 signatures.** That is the load Req 11.5.8 named.
