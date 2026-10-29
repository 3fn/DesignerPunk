# Operative-set confirmation — `civitas-system-overview` (C1 carve-out)

**Record**: `canonical/operative-sets/civitas-system-overview.yaml`. Heuristically drafted by Thurgood (profile author) at Spec 123 Task 15.4, then confirmed and corrected here.
**Source**: `.kiro/steering/Civitas-System-Overview.md`. This is an always-set identity doc, loaded into every consumer agent's context.
**Owner**: no domain seat; the profile author drafted it. **Confirmer**: **Stacy**, under the C1 carve-out: the owner's seat is the profile author's, so the counterpart verification seat confirms (Req 11.6.5d).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase one, run 2.

**Criterion**: 5c as narrowed on 2026-09-29, the classifier owner's "can contradict" reading: an item is operative if and only if a consumer's agents could act against it.
- That includes stated facts about a name, path, type shape or spelling they build against.
- Orientation, rationale, history, illustration, and rosters or counts that no agent acts on are not operative.
- Repo-specificity is a signing question, never an exclusion.

**The 11.3 convention**:
- A condition that scopes an obligation is part of that obligation's text.
- An item's own title line, and pure group labels, are labels (clause (c)).
- List markers are formatting.

**5d**: every zero is declared.

**Format**: the convention in `confirmations/stacy.md`. Record edits are made in the same commit as this note.

## `#civitas-system-overview:preamble`

confirmer: stacy
canonicalHash: sha256:8432dd89e8983effa2ffc3acccfa4ff1a882621d6c4612b72f5eb9d691f75940
items: none
date: 2026-10-17

**Re-confirmed 2026-10-17 (Req 11.6.5d).**
- **What changed**: the body line `**Last Reviewed**: 2026-09-21` left the unit; the stamp now lives in the YAML frontmatter as `lastReviewed:`, which `splitFrontmatter` keeps outside `canonicalHash`. Ballot `.kiro/docs/ballots/2026-10-17-no-volatile-metadata-in-signed-units.md` (RATIFIED, Peter, 2026-10-17, #393) § 3.2; authoring commit `0274210a8` (Thurgood). No other text in the unit changed. The canonicalHash moves from `sha256:261e7f3fe63802d69ea320635254b04b9a5f8b49be25e3bdf1e540aab4bf8844` to the value above.
- **Re-ruled**: what remains is the title and the metadata block (`Date`, `Purpose`, `Organization`, `Scope`, `Layer`, `Relevant Tasks`). No agent acts against doc metadata, and the removed line was never an item. The zero stays declared (5d).

**Ruling: CONFIRMED at 0, declared.**

**Ruling: CONFIRMED at 0, declared.** Doc metadata.

## `#overview`

confirmer: stacy
canonicalHash: sha256:e27d3c131615f18f5b656491e1cd7c2beff89d5a86acadfea0132830701efdc8
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** Orientation, etymology and an architecture description. There is nothing an agent acts against.

## `#what-civitas-contains`

confirmer: stacy
canonicalHash: sha256:8bd2b48ef0fb20b950c7c1dd0466f7a4c96154da800d5787bc142536fab4533f
items: what-civitas-con-2, what-civitas-con-3, what-civitas-con-4, what-civitas-con-5, what-civitas-con-6, what-civitas-con-7, what-civitas-con-8, what-civitas-con-9, what-civitas-con-10, what-civitas-con-17
date: 2026-10-27

**Re-confirmed 2026-10-27 (Req 11.6.5d): the count pointers (O-23, scope (b)).**
- **What changed**: five figures in the unit became pointers to how each count is read. Steering CORRECTION on branch `fix/overview-section-counts` (`506da09b0` for L30, L37 and L38; `b3b447d57` for L46 and L50). Peter ruled scope (b) on 2026-10-27, before 02:25:42Z, relayed by the orchestrator: "Cool. Let's go with my answers plus (b) for O-23". My O23-C1 read agreed with (b) beforehand.
  - the steering-docs line: "93 docs across 4 layers; 84 MCP-served + 9" → "4 layers; the MCP-served docs + 9 …; the docs MCP serves the current served count via `get_index_health`";
  - Docs MCP: "84 docs, 2,535 sections, 331 cross-references" → "it serves its current document, section and cross-reference counts via `get_index_health`";
  - Application MCP: "34 components, 443 tokens, 9 experience patterns" → "it serves its current component, token and experience-pattern counts via `get_component_health`";
  - Automation: "12 hooks + 5 shell scripts" → the two `git ls-files … | wc -l` commands;
  - Knowledge bases: "13 definitions" → the `knowledgeBases:` entries in `canonical/agents/*.md`.
  Thurgood re-authored the `text` of items `what-civitas-con-6` and `-7` at `b3b447d57`, under the grant `.kiro/issues/2026-10-26-overview-counts-pointer-grant.md` (#526), whose dated owner line (2026-10-27) names L46/L50 and the new pin. Labels unchanged.
- **The hash**: the canonicalHash moves from `sha256:77dc3cb69a10ba754447dfc278d64cead1ff80013763931a9235e8fd574f8a26` to the value above. `operative-set-freshness` (`check:122:diff-guard --base 08b9c7a8e` at `b3b447d57`) printed it, and I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts` (unit body lines 23–55); the two agree, and they equal the overlay pin.
- **`what-civitas-con-6` and `-7`, read against the unit**: each `text` is verbatim (`grep -F`: 1 hit each). Their pointers resolve: `mcp-server/src/index.ts` handles `get_index_health`, and `application-mcp-server/src/index.ts` registers `get_component_health`. Each item is still operative, on the same ground as before (which server to query), and the pointer adds one more thing an agent acts on: where to read the count. Neither item carries a number now.
- **L46 and L50 are not items**, as before (my 2026-09-29 ruling removed `-12` to `-15`). Their pointers, re-run at `b3b447d57`: hooks → 12, shell scripts → 5, knowledge-base entries in the eight non-fixture charters → 13 (ada 3, data 2, kenya 2, leonardo 0, lina 2, sparky 1, stacy 3, thurgood 0). Thurgood's owner line gives the same figures at `08b9c7a8e`.
- **Known false clause, not this act's object**: `what-civitas-con-8` still says "built in Spec 081: 14 tools". Thurgood's record `.kiro/issues/2026-10-27-civitas-overview-product-mcp-provenance-false.md` finds that Spec 081 built 7 (scope (c), not taken). The item is verbatim and still operative on its role, so the set does not change. The record's fix re-confirms this unit again. My 2026-10-24 line "the server's first commit is Spec 081 Task 2.1" stays true; it never verified the count as history.
- **What did not change**: the set, still 10 items. The other 8 items are untouched and still verbatim.

**Re-confirmed 2026-10-24, second time (prior record, superseded; canonicalHash `sha256:77dc3cb69a10ba754447dfc278d64cead1ff80013763931a9235e8fd574f8a26`, 10 items) (Req 11.6.5d): the count correction.**
- **What changed**: counts only, plus one clause. Steering CORRECTION `cf53ef403` (Peter, 2026-10-25, relayed: "Let's fix them"):
  - steering docs 92 (83 + 9) → 93 (84 + 9);
  - Docs MCP 83 docs / 2,833 sections / 333 cross-references → 84 / 2,535 / 331;
  - hooks 13 → 12;
  - knowledge bases 24 → 13;
  - the shell-scripts line drops "release management".
  Thurgood re-authored item `what-civitas-con-6`'s `text` at `d25990912`, under the grant `.kiro/issues/2026-10-25-identity-doc-stale-counts-grant.md`, which #466 (`311d3a42f`) activated. The canonicalHash moves from `sha256:1cf39e5cf23bce5b04edc831db1e0d71c5881b086a58fddbd862115c9797937b` to the value above. `operative-set-freshness` printed it, and I recomputed it independently; the two agree.
- **`what-civitas-con-6`, read against the unit**: its text is verbatim (`grep -F`: 1 hit). Its numbers are true by command, which I re-ran myself at `d25990912` after `cd mcp-server && npm run build`. The steward's `docs-count.js` (`DocumentIndexer.indexDirectory(<worktree>/governance)`, `getIndexHealth().metrics`) gives `"totalDocuments":84,"totalSections":2535,"totalCrossReferences":331`, and `ls governance/*.md | wc -l` gives `84`. The counts ride inside the item text; they are not items (my 2026-09-29 ruling).
- **Other numbers in the unit, re-run**, not items:
  - `ls .kiro/steering/*.md | wc -l` → 9;
  - hooks (`git ls-files '.kiro/hooks/*.kiro.hook' ':!.kiro/hooks/archive/**'`) → 12, and shell scripts → 5. None of the five does release work.
  - knowledge-base entries in the canonical charters → 13;
  - charters excluding `_fixture` → 8;
  - `*mcp-server` directories → 3;
  - application MCP `get_component_health` → 34 components, 217 + 193 + 33 = 443 tokens, 9 patterns.
  The knowledge-base count follows the steward's definition (canonical declarations, 13; the emitted Kiro configs carry 6). It is not an item, so the definition question does not reach this confirmation.
- **What did not change**: the set, still 10 items. The other 9 items are untouched and still verbatim.

**Re-confirmed 2026-10-24, first time (prior record, superseded; canonicalHash `sha256:1cf39e5cf23bce5b04edc831db1e0d71c5881b086a58fddbd862115c9797937b`, 10 items) (Req 11.6.5d).**
- **What changed**: one line of the unit. The Product MCP line said "(conceptual — specs 081, 096, 097)". It now says the server reads a consumer's `product/` directory, has 14 tools and ships as `dist/mcp/product-mcp.js`, and that this repository has no `product/` directory. Steering CORRECTION `d4bd2ea49`, Peter-merged under the carve-out (Spec 131 ballot audit fix-now item 8). Thurgood re-authored item `what-civitas-con-8` (`label`, `text`) at `0e2a2bd41`, under the issue-row grant `.kiro/issues/2026-10-24-product-mcp-correction-signed-units-grant.md`, which #464 (`2eafd7296`) activated. The canonicalHash moves from `sha256:6d5bb7e904c10be1b5bf04b25fd03b6f5222b3e5ea2b46c92b40aa4b6debf137` to the value above. `operative-set-freshness` printed it, and I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts`; the two agree.
- **`what-civitas-con-8`, read against the unit**: its `text` is a verbatim substring of the unit (`grep -F`: 1 hit), with the list marker left out as formatting. The sweep no longer reports it as not verbatim. Its facts hold at `0e2a2bd41`:
  - `product-mcp-server/src/index.ts` registers 14 tools;
  - `DEFAULT_PRODUCT_DIR = 'product'`;
  - `build:mcp` writes `dist/mcp/product-mcp.js`, which `files` ships under `dist/**/*.js`;
  - the server's first commit is Spec 081 Task 2.1 (`3a8ab1385`);
  - there is no `product/` at the repository root.
  The item stays operative: it says which server serves product context and where that server reads. Under the 11.3 convention, the repo-scoped clause is part of the item's text.
- **What did not change**: the set, still 10 items. The other 9 items are untouched and still verbatim.

**Ruling: CORRECTED 18 → 10.**
- **Removed** inventory that no agent acts on:
  - `what-civitas-con-1`, the "Steering documentation (92 docs …)" label with its counts;
  - `-11`, the config and prompt-file shape;
  - `-12` and `-13`, the hook and script inventory;
  - `-14` and `-15`, the knowledge-base inventory;
  - `-16`, the spec count;
  - `-18`, the list of systems.
- **Kept**:
  - the four layer definitions (agents act on "Layer 1 … loaded by all agents" and "Layer 2 … queryable via MCP");
  - the three MCP server roles (which server to query);
  - the two agent-tier lines;
  - the spec workflow order.
- The counts inside kept items (for example "83 docs, 2,833 sections") ride along inside the item text; they are not items. Several drafted kinds say `obligation` where `member` fits. Kind is never matched, so I left them.

## `#what-civitas-does-not-contain`

confirmer: stacy
canonicalHash: sha256:103fb411efb491817aa7c4f3b8b4f2f0462674a3d46545efc79ddaf292d6b502
items: what-civitas-doe-1, what-civitas-doe-2, what-civitas-doe-3
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.**

## `#relationship-to-rosetta-and-stemma`

confirmer: stacy
canonicalHash: sha256:ea95bc9f062954f30ffc47d8755ecb21248fc5b7c06be917a1cf7e119c53bdb6
items: relationship-to--1, relationship-to--2, relationship-to--3
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.**

## `#the-three-layer-boundary`

confirmer: stacy
canonicalHash: sha256:07a57ddc3770e58fd778f308e53b46af5663158ed9c8332885ab516db02a27fa
items: layer-correctness, layer-consistency, layer-infrastructure, the-three-layer--1, the-three-layer--2, the-three-layer--3
date: 2026-09-29

**Ruling: CORRECTED 3 → 6.** Added `layer-correctness`, `layer-consistency` and `layer-infrastructure`, the three ownership rules. The draft carried only the resolution path.

## `#governance-processes`

confirmer: stacy
canonicalHash: sha256:48af3eb551057bd0d40cb4379bdb9f1e0a8953447545978ab8973de5e7651bd4
items: governance-proce-1, governance-proce-2, governance-proce-3, governance-proce-4
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.** The "documented in Thurgood's prompt" and "For detailed process documentation" lines are orientation.

## `#external-representation`

confirmer: stacy
canonicalHash: sha256:8af46c59fb00c2d1b0f8ce157cd6f3d4ab3550156853c51d366914b5bd505c9a
items: external-represe-1, external-represe-2, external-represe-3
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.** `external-represe-1` is widened to carry the obligation's condition ("In external-facing materials … Civitas should be represented as …:"). The closing sentence is description.

## `#document-access`

confirmer: stacy
canonicalHash: sha256:6bc5c92dbd79c125b497c35a6c88f5257913263b559f610306984985adf0ba9b
items: document-access-1, document-access-2
date: 2026-09-29

**Ruling: CORRECTED 1 → 2.** Added `document-access-2`: point with an in-document § reference, not an MCP call. This matches the parallel unit in Spec-Feedback-Protocol.
