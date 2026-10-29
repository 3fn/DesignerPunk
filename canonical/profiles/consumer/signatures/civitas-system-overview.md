# Signatures — `civitas-system-overview` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/civitas-system-overview.dispositions.yaml`. **Signer**: Stacy. This is an identity doc with no domain owner, so she signs in the C1 carve-out seat: the profile author drafted it, and the counterpart seat signs.
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 2**, 2026-09-29, Spec 123 Task 15.5.

## `#what-civitas-contains`

signer: stacy
date: 2026-10-27
row: `canonical/profiles/consumer/always-set/civitas-system-overview.dispositions.yaml` · body · `#what-civitas-contains` (re-pointed; ROUTED)
canonicalHash: sha256:8bd2b48ef0fb20b950c7c1dd0466f7a4c96154da800d5787bc142536fab4533f
renderedHash: sha256:3a0e750c68d74e1ea89c9a4be34382b395c5699b1f6306c1837c610bc67d2309
verdict: assent — surviving 7/10; not surviving: `what-civitas-con-2`, `what-civitas-con-4`, `what-civitas-con-5`

**Re-signed 2026-10-27: the count pointers (O-23, scope (b))** (prior signature: assent 7/10, 2026-10-24, against `sha256:77dc3cb69a10ba754447dfc278d64cead1ff80013763931a9235e8fd574f8a26`; the rendered hash did not move).
- **Why it was stale**: the canonical unit moved. The O-23 steering CORRECTION turned five figures into pointers: steering docs and the Docs MCP and Application MCP counts (`506da09b0`), hooks and shell scripts, and knowledge bases (`b3b447d57`). Thurgood re-authored `what-civitas-con-6` and `-7` and moved the overlay pin only (`b3b447d57`, under the #526 grant and its 2026-10-27 owner line); the overlay text is unchanged. My C1 re-confirmation at 10 items is `22fde5e0e`.
- **How the hashes were read**: renderedHash was recomputed from the committed `canonical/_consumer-output/` with `readConsumerSpans` / `renderedHashOf` / `rowSpanSource` (three pieces: `_canonical/`, `cc/`, `kiro/`), and it equals the prior value. canonicalHash was recomputed independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts`, and it equals the overlay pin and the sweep's value.
- **Judged against**: the rendered unit, `canonical/_consumer-output/_canonical/always-set/civitas-system-overview.md` § "What Civitas Contains" (L23–L43), read at `22fde5e0e`. It carries no count and no pointer; its MCP lines are the three servers' roles, under *"MCP servers (from the installed package)"*.
- **`what-civitas-con-6` and `-7` survive, re-grounded**, on their roles as before: *"Docs MCP: serves DesignerPunk's shipped documentation corpus, read-only"* and *"Application MCP: serves component and token metadata for this design system"*. Their new clauses point to where DesignerPunk's own counts are read (`get_index_health`, `get_component_health`). Those counts are the corpus inventory `subtraction-3` removes, so the pointers are not credited items, as the numbers were not. **Observation, not a refusal**: both tools ship with the installed servers, so a consumer agent can still reach them; the rendering does not name them, and nothing in it depends on them.
- **The other items**: they stand as judged below. `con-8`'s "built in Spec 081: 14 tools" is false as history (`.kiro/issues/2026-10-27-civitas-overview-product-mcp-provenance-false.md`). The rendering carries no count or provenance, so no consumer reader receives it, and `con-8` survives on its role as before.

**Re-signed 2026-10-24, second time (prior record, superseded; against `sha256:77dc3cb69a10ba754447dfc278d64cead1ff80013763931a9235e8fd574f8a26`): the count correction** (prior signature: assent 7/10, earlier the same day, against `sha256:1cf39e5cf23bce5b04edc831db1e0d71c5881b086a58fddbd862115c9797937b`; the rendered hash did not move).
- **Why it was stale**: the canonical unit moved. Steering CORRECTION `cf53ef403` corrected the unit's counts: steering docs, Docs MCP docs/sections/cross-references, hooks and knowledge bases. It also dropped "release management" from the shell-scripts line. Thurgood re-authored `what-civitas-con-6` and moved the overlay pin only (`d25990912`, under the #466 grant); the overlay text is unchanged. My C1 re-confirmation at 10 items is `3f2d178b9`.
- **How the hashes were read**: renderedHash was recomputed from the committed `canonical/_consumer-output/` with `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`, and it equals the prior value. canonicalHash was recomputed independently, and it equals the overlay pin and the sweep's value.
- **Judged against**: the same rendered unit, which carries none of the corrected numbers. They are DesignerPunk's own corpus inventory, removed by `subtraction-3`.
- **`what-civitas-con-6` survives, re-grounded**, as before: the docs server's role, *"Docs MCP: serves DesignerPunk's shipped documentation corpus, read-only"*. Its counts ride inside the item text and are not credited items.
- **The other items**: they stand as judged below. That includes the `con-8` observation (the rendering does not name `product/`), which still stands.

**Re-signed 2026-10-24, first time** (prior signature: assent 7/10, 2026-09-29, against `sha256:6d5bb7e904c10be1b5bf04b25fd03b6f5222b3e5ea2b46c92b40aa4b6debf137`; the rendered hash did not move).
- **Why it was stale**: the canonical unit moved. The steering CORRECTION `d4bd2ea49` (Spec 131 ballot audit fix-now item 8) replaced the Product MCP line's "(conceptual — specs 081, 096, 097)". Thurgood re-authored item `what-civitas-con-8` and moved the overlay pin only (`0e2a2bd41`, under the #464 grant); the overlay text is unchanged. My C1 re-confirmation at 10 items is `a7fb52020`.
- **How the hashes were read**: renderedHash was recomputed from the committed `canonical/_consumer-output/` with the generator's own `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`, and it equals the prior value. canonicalHash was recomputed from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts`, and it equals the overlay pin and the sweep's value.
- **Judged against**: the rendered unit at this revision, `canonical/_consumer-output/_canonical/always-set/civitas-system-overview.md` § "What Civitas Contains". Its MCP line: *"Product MCP: serves this product's screens, product tokens and context"*, under *"MCP servers (from the installed package)"*.
- **`what-civitas-con-8` survives, re-grounded**, on its role, as on 2026-09-29: which server serves the product's context, from the installed package. The repository clause ("This repository has no `product/` directory, so here it serves an empty product set") is this repo's fact, and the unit's removal of DesignerPunk's own MCP inventory (`subtraction-3`) covers it. So do the 14-tool count and the `dist/` path, which ride along inside the item text, as my confirmation rules for counts.
- **Observation, not a refusal**: the rendering does not name the consumer's `product/` directory, the default the server reads (`DEFAULT_PRODUCT_DIR = 'product'`). That fact is consumer-applicable. A consumer agent learns from this unit which server to query, but not where the product data must live. I credit the role alone, as I credited `start-up-tasks` `hc-4` (2026-10-17) and `-6` (2026-10-19) on the part the rendering states. Adding the directory to the overlay line would be authoring, the profile author's (Thurgood's) call, and would need a re-sign.
- **The other six survive, and `con-2`, `con-4` and `con-5` do not**, all as before. Their items and the rendering are unchanged.

**Survive, re-grounded**: `con-3` (the always-loaded identity members), `con-6` to `con-8` (the three servers' roles as a consumer has them), `con-9` and `con-10` (the tiers), and `con-17`. **Not surviving**: steering Layers 0, 2 and 3, which are DesignerPunk's own corpus layering. A consumer has none of its own.

## `#the-three-layer-boundary`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/civitas-system-overview.dispositions.yaml` · body · `#the-three-layer-boundary` (re-pointed; ROUTED)
canonicalHash: sha256:07a57ddc3770e58fd778f308e53b46af5663158ed9c8332885ab516db02a27fa
renderedHash: sha256:e1c6c4394d5be00118b7b70f042cc18968d20a553a07e40959e393cd50720fdd
verdict: assent — surviving 6/6

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#document-access`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/civitas-system-overview.dispositions.yaml` · body · `#document-access` (re-pointed; ROUTED)
canonicalHash: sha256:6bc5c92dbd79c125b497c35a6c88f5257913263b559f610306984985adf0ba9b
renderedHash: sha256:20fdb612e3333d352f26f6567e27db5e80f591e03fbbb21cdedf14d3be99b2bc
verdict: assent — surviving 2/2

`document-access-1` survives as a generated identity member.

## `#governance-processes`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/civitas-system-overview.dispositions.yaml` · body · `#governance-processes` (re-pointed)
canonicalHash: sha256:48af3eb551057bd0d40cb4379bdb9f1e0a8953447545978ab8973de5e7651bd4
renderedHash: sha256:2a2bc004ac29b3d2cac9e1ec035d790cde19b880033ac383a58794c572719353
verdict: assent — surviving 4/4

**Re-signed 2026-09-29, in the re-sign run** (prior signature: unsigned). Newly routed. All four items survive verbatim, and the pointer is re-authored to "your Thurgood agent's charter (its Civitas Steward mode)". Non-blocking, for Thurgood: the items keep DesignerPunk's own terms ("monthly health check", "ballot measure"). Consumer-Thurgood's rendering re-grounds those as "your team's periodic health check" and "your human lead's decision", so the two surfaces now differ in wording.
