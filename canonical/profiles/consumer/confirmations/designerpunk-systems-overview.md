# Operative-set confirmation — `designerpunk-systems-overview` (C1 carve-out)

**Record**: `canonical/operative-sets/designerpunk-systems-overview.yaml`. Heuristically drafted by Thurgood (profile author) at Spec 123 Task 15.4, then confirmed and corrected here.
**Source**: `.kiro/steering/DesignerPunk-Systems-Overview.md`. This is an always-set identity doc, loaded into every consumer agent's context.
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

## `#designerpunk-systems-overview:preamble`

confirmer: stacy
canonicalHash: sha256:56dabfbc13a893407ca6899b55c1625ac4728276c3b48207c7295ff45475b6d1
items: none
date: 2026-10-17

**Re-confirmed 2026-10-17 (Req 11.6.5d).**
- **What changed**: the body line `**Last Reviewed**: 2026-09-21` left the unit; the stamp now lives in the YAML frontmatter as `lastReviewed:`, which `splitFrontmatter` keeps outside `canonicalHash`. Ballot `.kiro/docs/ballots/2026-10-17-no-volatile-metadata-in-signed-units.md` (RATIFIED, Peter, 2026-10-17, #393) § 3.2; authoring commit `0274210a8` (Thurgood). No other text in the unit changed. The canonicalHash moves from `sha256:a81ba036a8683b7f30a77c88663f6998b785552410e420d0d33b162868a445a1` to the value above.
- **Re-ruled**: what remains is the title and the metadata block (`Date`, `Purpose`, `Organization`, `Scope`, `Layer`, `Relevant Tasks`). No agent acts against doc metadata, and the removed line was never an item. The zero stays declared (5d).

**Ruling: CONFIRMED at 0, declared.**

**Ruling: CONFIRMED at 0, declared.** Doc metadata.

## `#overview`

confirmer: stacy
canonicalHash: sha256:4f50e69ed22fe9e8024e017d05ad08a6cf807613016abb64a5c12af3d8b741d2
items: overview-1, overview-2, overview-3
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.** The three system definitions are names agents route against. "This document provides …" and the Civitas pointer are orientation.

## `#pointer-1-module-resolution-contract-spec-118`

confirmer: stacy
canonicalHash: sha256:cffe92ec071aeb070f4fee21c68bae47fcb88b79ed0b84e393e7cc28b227931e
items: module-resolution-pull, module-resolution-route
date: 2026-09-29

**Ruling: CORRECTED 0 → 2.** The unit is an instruction ("pull it before touching those surfaces") plus its route. The drafted zero was declared, but it was wrong.

## `#high-level-designerpunk-three-system-architecture`

confirmer: stacy
canonicalHash: sha256:11ade1ad6da002d22718fb043fbc35828e0eecb4feb449a3a47020d8b4ba6254
items: none
date: 2026-10-24

**Re-confirmed 2026-10-24 (Req 11.6.5d).**
- **What changed**: one diagram node. `C_Steer["Steering Docs (92: 83 MCP-served + 9 identity)"]` now reads `(93: 84 MCP-served + 9 identity)`. Steering CORRECTION `cf53ef403` (Peter, 2026-10-25, relayed: "Let's fix them").
- **The numbers hold at `d25990912`**: `ls .kiro/steering/*.md | wc -l` → 9; the docs MCP indexer over `governance/` → `totalDocuments` 84 (and `ls governance/*.md | wc -l` → 84).
- **The hash**: the canonicalHash moves from `sha256:cb4d6d996773c1253896915cd34e6f718679dac9766a2ee86020a25779f203b0` to the value above. `operative-set-freshness` printed it, and I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts`; the two agree.
- **Re-ruled**: still an illustration with one orientation line. No agent acts against a diagram count, so the zero stays declared (5d).

**Ruling: CONFIRMED at 0, declared.** A Mermaid illustration with one orientation line.

## `#rosetta-system-token-pipeline-and-layers`

confirmer: stacy
canonicalHash: sha256:9a42eba814e35b74f06ccbbb72df81e5cfdce8ee227cedd345078cb6c086c676
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** An illustration. The token hierarchy it pictures is stated operatively in Core Goals and the token docs.

## `#stemma-system-families-and-inheritance`

confirmer: stacy
canonicalHash: sha256:b898e08b85ef79769ab48747424402d9df08985b80987a1d93fbdd78ce52c454
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** An illustration.

## `#civitas-system-governance-infrastructure`

confirmer: stacy
canonicalHash: sha256:dc689ab05d1bb5afbd36b80878f69e0190da89ec9709b804496a42f8204ff028
items: none
date: 2026-10-24

**Re-confirmed 2026-10-24, second time (Req 11.6.5d): the count correction.**
- **What changed**: one diagram node. `DocsMCP["Docs MCP<br/>83 docs, 2,833 sections"]` now reads `84 docs, 2,535 sections`. Steering CORRECTION `cf53ef403` (Peter, 2026-10-25, relayed: "Let's fix them").
- **The numbers hold**: I re-ran the docs MCP indexer at `d25990912` (`DocumentIndexer.indexDirectory(<worktree>/governance)`), and it gives `totalDocuments` 84 and `totalSections` 2535. The node `AppMCP` (34 / 443) is unchanged and still true: `get_component_health` → 34 components, 217 + 193 + 33 tokens.
- **The hash**: the canonicalHash moves from `sha256:9751b1889d6e335ee645e098db78bc7d94ef3df5c7023e34cad717ce2e14e790` to the value above. `operative-set-freshness` printed it, and I recomputed it independently; the two agree.
- **Re-ruled**: still an illustration, so the zero stays declared (5d).

**Re-confirmed 2026-10-24, first time (prior record, superseded; canonicalHash `sha256:9751b1889d6e335ee645e098db78bc7d94ef3df5c7023e34cad717ce2e14e790`) (Req 11.6.5d).**
- **What changed**: one diagram node. `ProdMCP["Product MCP<br/>(conceptual)"]` now reads `ProdMCP["Product MCP<br/>14 tools, reads product/"]`. Steering CORRECTION `d4bd2ea49`, Peter-merged under the carve-out (Spec 131 ballot audit fix-now item 8). Both facts hold at `0e2a2bd41`: `product-mcp-server/src/index.ts` registers 14 tools and sets `DEFAULT_PRODUCT_DIR = 'product'`. The canonicalHash moves from `sha256:05dfb306f63dc5eacf86ccaa02dd41897f8fef417b887f5c051dee41ee10ad06` to the value above. `operative-set-freshness` printed it, and I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts`; the two agree.
- **Re-ruled**: the unit is still a diagram with its caption. No agent acts against a diagram node, so the zero stays declared (5d).

**Ruling: CONFIRMED at 0, declared.** An illustration.

## `#integration-tokens-components-platforms`

confirmer: stacy
canonicalHash: sha256:6299782dc541681b506a0273ccbf89ebec37e67a02510da583540fab61e8d6b4
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** An illustration.

## `#combined-overview-single-diagram`

confirmer: stacy
canonicalHash: sha256:52cbf96c06f39c3c4ae1b07b0a529528797072b11cd5c11cec2e03d3efeb5077
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** An illustration.

## `#related-documentation`

confirmer: stacy
canonicalHash: sha256:cdd4df7d51710aa622848052c914bc58765bb44f7ea9cd1309a089dd9bdf4dac
items: none
date: 2026-09-29

**Ruling: CORRECTED 19 → 0, declared.** A further-reading list. No agent can act against a list of links, and the doc ids are reachable through `find_docs`. The draft counted every link as an obligation.
