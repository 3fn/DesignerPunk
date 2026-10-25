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
canonicalHash: sha256:1cf39e5cf23bce5b04edc831db1e0d71c5881b086a58fddbd862115c9797937b
items: what-civitas-con-2, what-civitas-con-3, what-civitas-con-4, what-civitas-con-5, what-civitas-con-6, what-civitas-con-7, what-civitas-con-8, what-civitas-con-9, what-civitas-con-10, what-civitas-con-17
date: 2026-10-24

**Re-confirmed 2026-10-24 (Req 11.6.5d).**
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
