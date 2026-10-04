# Task 19.5 Completion — Leonardo's whole-document review, and the fold (IN PROGRESS: not ticked)

**Date**: 2026-10-03
**Agent**: Thurgood (Opus) · PRIMARY, Task 19
**Review record**: `completion/task-19-5-review/leonardo.md`, byte-equal to the copy the orchestrator relayed. Read at `b8987db1c`. Verdict: CONFIRMED-WITH-CORRECTIONS, with 5 corrections, 2 contradictions, 3 misleading silences, and 8 polish lines held for the rewrite charter. He confirmed the README reading.
**State**: every item has a disposition. **19.5 is not ticked**: the routed items are not back, and items 3–5 wait on Peter's #300 decision.

## Disposition table

| # | Item (Leonardo's class) | Owner | Disposition | Evidence |
|---|---|---|---|---|
| 1 | Demotion under `## Reference` broke heading lookups (CORRECTION) | Thurgood (structure; Civitas surface) | **APPLIED**: Leonardo's fix, option (b) below. Reading recorded for Peter | The docs MCP parses H2/H3 only (`mcp-server/src/indexer/section-parser.ts:86,96`). Local rebuild (83 docs, 2,849 sections): `get_section` "Themes" and "Product Tokens" were `SectionNotFound` before and return after; "UI Tree Convention (Draft)" returns its H4 children inline. A new guard test with two bites: `install-doc.test.ts`, "cross-references name headings the docs MCP can return" |
| 2 | `init`'s next steps contradict the founder path (CONTRADICTION) | Lina (string `errorCatalog.ts:486-488` + `init.test.ts`); Thurgood (the design row) | **ROUTED to Lina** with Leonardo's text. Her answer is needed first: was the `npm install` step meant for a case he did not find? The design row follows her answer | `leonardo.md` item 2; `init.ts:585` (only reads the package's `package.json`) |
| 3 | Jest collision string recommends `@3fn/core/testing` (CONTRADICTION; #300 item 1) | Lina (string `errorCatalog.ts:140-144`); Thurgood (catalog row, C27/A13) | **ROUTED to Lina; which text ships depends on Peter's #300 decision.** If the preset is fixed in U3, the string becomes true and the item closes. If not, Leonardo's truthful-now text lands before the tag | `leonardo.md` item 3; guide § "Shared Test Utilities" |
| 4 | `generate` prints ✅ and exits 0 after an override abort; L303 stops short (MISLEADING-SILENCE; #300 item 3) | Ada (Token Source Configuration) | **ROUTED to Ada**, with Leonardo's appended sentence. Recommendation: apply it now, since it is truthful today, and take it out when the code is fixed. Held only if Peter fixes the code in U3 | `generateTokenFiles.ts:132,161`; `designerpunk.ts:293,319-325` (per Leonardo, not re-read here) |
| 5 | COMMIT-POLICY silent on the per-run timestamps (MISLEADING-SILENCE; #300 item 2) | Lina (COMMIT-POLICY, 20.1) | **ROUTED to Lina**, with Leonardo's paragraph. Recommendation: apply it now; it comes out when Ada's determinism fix lands | `TokenFileGenerator.ts:301-307,376-382,455-461`; Thurgood's 21.1 born-repo run (7 files differ, timestamp lines only) |
| 6 | L320 calls an empty `product/` the new-project case (CORRECTION) | Lina (section owner at 19.4) | **ROUTED to Lina** with Leonardo's replacement sentence | `init.ts:256-263` scaffolds `product/` (per Leonardo) |
| 7 | "Product Data Directory" silent on what `init` scaffolds (MISLEADING-SILENCE) | Leonardo (his section, his text) | **APPLIED**, verbatim, after the heading | guide § Product Data Directory; `ProductIndexer.ts:257-263` (per Leonardo) |
| 8 | UI-tree convention omits `content` (CORRECTION) | Leonardo (his section, his text) | **APPLIED**, verbatim: the YAML line pair and the table row | `example-home.yaml` L37 `content:` (read here); `ProductIndexer.ts:332-366` (per Leonardo) |
| 9 | "install doc" vs "install guide" (CORRECTION, Req 15B.5) | Lina (strings `NameContract.ts:69`, `errorCatalog.ts:199` + tests); Thurgood (catalog rows; region § 5 re-quote and re-derive) | **ROUTED to Lina.** It rides with the "markers missing" remedy, which is open with Peter. **Coupling**: `install-doc.test.ts` imports `missingTokenMessage`. When her string changes, region § 5's quote goes red until Thurgood re-quotes it and re-derives INSTALL.md, so the two land together | `leonardo.md` item 9 |
| 10 | INSTALL's pointer path exists only inside the package (CORRECTION) | Thurgood (region) | **APPLIED**, verbatim, at region L156. INSTALL.md re-derived | guide L156 |
| — | README reading (strict "only") | Leonardo | CONFIRMED; no action | `leonardo.md` § README reading |
| P1–P8 | Polish | Leonardo | **Charter input**: held for `.kiro/issues/2026-10-03-integration-guide-designer-friendly-rewrite-charter.md`. Not 19.5 items | `leonardo.md` § Polish |

## Item 1 — the options, and the reading applied

- **(a) `## Reference` as a divider, with the reference sections as sibling `##`s after it.**
  - Gain: every former section is reachable at H2 or H3 again.
  - Cost: "under one `## Reference`" becomes "after", by position only. The summary outline mixes reference H2s with the region's H2s at one level. The install-doc test "exactly one `## Reference`" still holds, but the structure it was meant to evidence does not.
- **(b) Keep the single `## Reference`, and promote one level so every section a reader or pointer names is H3** (Leonardo's fix).
  - Gain: PR-1's words hold literally. Every pointer target is reachable, and the guard test keeps it so.
  - Cost: Reference's outline grows from 13 to 29 H3 entries, about 300 tokens of summary. Some grouping becomes positional: Product MCP's subsections and Upgrading's are now H3 siblings, not children. H4s whose parent H3 returns them inline stay H4: Configure Agent Connections' two, Running Component Tests' four, and UI Tree's four. So `get_section("Platform Branching in UI Trees")` still fails, and the section reaches the reader through "UI Tree Convention (Draft)".
  - One heading line was removed, `#### Starting the Product MCP`. Its text now sits directly under `### Specifying screens (Product MCP)`; Leonardo proposed this and owns the section.
- **(c) Teach the indexer to parse H4.**
  - Gain: every heading in every served doc becomes reachable.
  - Cost: it is outside Task 19's artifacts. It is an `mcp-server/src` change, an input-closure root, so the lock moves. It changes section counts and suggestions corpus-wide, which needs its own record and tests. It also does not address that the `SectionNotFound` suggestions list only H2s, as seen in the rebuild.
- **Applied: (b).**
  - It is inside PR-1's intent ("the rest of the guide sits under one top-level `## Reference` heading" still reads true) and inside the owner's authority: Thurgood owns the guide's structure and the docs-MCP surface.
  - Heading text is unchanged, so it is not a retitle under Peter's top-level-only retitle ruling; only levels and one heading line moved.
  - **Recorded for Peter at the U3 merge.**
  - **Class input, not U3**: H4 reachability and H2-only suggestions are corpus-wide docs-MCP behaviours, a Civitas follow-up. The orchestrator files it; `.kiro/issues/` is outside Thurgood's write scope.

## Release conditions carried to Task 19's parent completion (stated dependencies, not items)

- **The template's pointer to Peter's example** (`src/cli/templates/personal-note.template.md:18`) comes out before the tag if the example and its approval record have not landed by 22.3b. Owner: Leonardo.
- **`docs/consumer/**` is not in `files[]` until 22.3b** (Ada). Until then, three surfaces name a file that does not ship: COMMIT-POLICY's "in the `@3fn/core` package", the CLI's install-doc pointer, and the template's pointer.

## Targeted tests + result

- `install-doc.test.ts`: 56/56, including the new reachability guard.
- **Bites**:
  - `### Themes` turned back to `####` → red;
  - the whole pre-fix guide (`b8987db1c`) → red, listing `Product Tokens (H4)` and `Themes (H4)` ×2;
  - restored.
- The full lanes: see the commit's validation note.
