# Release 14.1.0

**Date**: 2026-08-25
**Previous**: 14.0.0
**Bump**: minor

> **Authorship note**: hand-authored from the merged delta (`v14.0.0..main`), per the post-Q6 convention — the release manager was retired this cycle (#116/#117) and these notes are the manual playbook's product. The minor bump is driven by the new `defineComponentTokens` validation guard (stricter behavior in a shipped API); the headline codegen repairs are fixes riding along.

## 🟡 Minor

- **`defineComponentTokens`: family-mismatch guard** *(Token API)* (#126, #127)
  Component-token definitions now fail fast when a registered token's family doesn't match its value source (e.g. a sizing token defined inside a spacing-family call). Previously such mislabels registered silently and produced broken generated output downstream (see the Button-Icon fix below — this guard prevents the entire class). A definition that was silently mislabeled before will now throw at build time; that's the defect surfacing, not a regression.
- **Docs MCP corpus: mode-resolution model corrected + contract names canonicalized** *(Docs MCP)*
  The served governance corpus this package ships took a substantial accuracy pass:
  - The two-level mode-resolution teaching was factually wrong in three docs (a Level-1 model with zero instances in the system, and an unexecutable remediation instruction) — corrected with source-verified worked examples in Token-Quick-Reference, Rosetta-System-Architecture, and Component-Development-Guide (#136).
  - **141 stale pre-Spec-063 contract-name occurrences across 9 component family docs, the scaffolding templates, and the inheritance structures** replaced with canonical names (#132) — previously, authoring from these surfaces produced contracts the WCAG allowlist check silently never selected.
  - Component-Development-Standards: the schema `required_fields` list aligned to the live validator; the worked example's `disabled` prop removed per the no-disabled-states adjudication (#132, #134).
  - Education prunes from the 125-B classification campaign (waves 1–2, #124/#133): imperative restatements of mechanically-enforced rules removed; the retained education now teaches the gates instead of impersonating them, and the contract-schema field table teaches the accurate `'N/A'`-sentinel semantics.

## 🔵 Fixes

- **Button-Icon: generated iOS/Android token output was non-compiling** *(Codegen)* (#126)
  v14.0.0's generated Swift/Kotlin for Button-Icon referenced non-existent `SpacingTokens.size*` members (a token-family mislabel; nothing in-repo compiles those outputs, so it shipped undetected). Fixed by splitting the family registration (spacing vs sizing). **Consumer token names are unchanged** (`buttonIcon.inset.*`, `buttonIcon.size.*`); web output is unchanged; the iOS/Android outputs now compile.
- **Avatar: same-class icon-size family mislabel fixed** *(Codegen)* (#127) — plus the guard above so the class is closed, not just these instances.

## ⚠️ Known Issues (disclosed, tracked, fix scheduled)

- **DTCG/Figma export color divergence.** `dist/DesignTokens.dtcg.json` / `dist/DesignTokens.figma.json` primitive `$value`s are read from a legacy color source while CSS/Swift/Kotlin read the OKLCH source: **19 of 50 shared primitives differ** (worst ≈0.21 OKLCH lightness — the gray ramp and a hue drift), and one shipped token contradicts itself between `$value` and its `$extensions.designerpunk.modes`. Platform outputs are internally consistent and unaffected; the impact is design-tool sync (`figma:push` consumers receive stale colors). Diagnosed 2026-08-25 with the fix direction identified; tracked at `.kiro/issues/2026-08-25-dual-color-source-divergence.md`. If you consume the DTCG/Figma artifacts, prefer the `$extensions.designerpunk.modes` values (OKLCH, correct) over primitive `$value`s until the fix ships.

## 🔵 Internal (provenance, not consumer surface)

- Release manager retired (Q6, #116/#117) — releases are hand-authored per the recorded playbook; this is the first post-retirement release.
- 125-B classification campaign waves 1–2 executed (rows, prunes, probe/trial evidence, two observation windows standing); monthly Civitas health check 2026-08-25 (all mechanicals green, 34 branches swept); verification-grade review standard adopted for routed doc reviews.
