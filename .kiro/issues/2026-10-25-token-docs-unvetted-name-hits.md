# Other token docs hold raw hits for token names nobody has vetted against the token index

**Date**: 2026-10-25
**Filed by**: Ada, lead owner of the record it came out of, under README rule 10, in the PR that closes `archive/2026-10-23-served-docs-teach-non-key-token-names.md`. Rule 9 applies to every later edit.
**Owner**: Ada (token docs). Lina is co-owner of item B (her component READMEs).
**Class**: P2 obligation (record) · defect *(set 2026-10-25, Ada, rule 12. The named-site fix (#471, #472) closed the sites with a scan and a grep proof. These docs were outside every scan, and the hits are raw: a hit is a string that looks like a token name, and most of them may be prop names, file names, platform identifiers or hypothetical examples. A reader may be misled where one is a wrong key, so the record is wrong in places; nothing here is a guard claim, and the P0 reading is not made until a hit is vetted as a key the index lacks. Only Peter downgrades a P0. Stacy may press the P0 reading.)*
**Trigger**: `release:next:phase-1` — closes at the sweep PR's merge; `merge:#<N>` at its open.
**Source**: Lina's 2026-10-25 line in `archive/2026-10-23-served-docs-teach-non-key-token-names.md` ("Seen, not touched, for the owners", "Lina's part fixed"), and her "Not done here" line for item B.

---

## What is owed

**A. Vet the raw hits, then correct the ones that are wrong** (CORRECTION; truth `token-index/`, with the rule in `src/generators/__tests__/schemaTokenRefs.test.ts` as the definition of a key). Lina's list is raw and unvetted: it came from a grep of `color.primary`, `space.inset.comfortable` and bare camelCase names, not a scan against the 443 keys. The scripts that scanned the component docs and the steering docs are `scratchpad/lina-scan.py` and `lina-scan2.py` in the session that ran them; the rule they apply (every backticked name, every family-prefixed or camelCase name, tested against the keys of the three `token-index/*.yaml` files) is in her part of the archived record, and Ada re-writes the scan as a script in the sweep PR rather than leaning on scratch.

- Line-level, as Lina listed them: `Token-Semantic-Structure.md` L85, L150, L171, L232, L691 (`color.primary`, `color.error`); `Token-Resolution-Patterns.md` L100, L133, L179, L211, L218 (`color.primary`, `color.secondary`); `Rosetta-System-Architecture.md` L220; `Product-Token-Governance.md` L157 (`space.inset.comfortable`); `Transformer-Development-Guide.md` L318; `MCP-Relationship-Model.md` L225; `a-vision-of-the-future.md` L213 and L418.
- Hit counts only, not read: `Token-Family-{Shadow,Blend,Layering,Accessibility,Typography,Spacing,Blur}.md`, `DTCG-Integration-Guide.md`, `Process-Cross-Reference-Standards.md`, `MCP-Integration-Guide.md`.
- Line numbers were taken at Lina's branch before #472; Ada re-reads them at the sweep PR's base.

**B. The 24 component README lines on the five-name grep** (Lina's, deferred in #471). Shipped but not MCP-served. They are not renames: Button-VerticalList-Item's table also names the retired `color.select.*` and `color.error.*` palette, which maps onto `color.feedback.select.*` by state, so each state needs a read of the CSS. Lina decides whether they ride the sweep PR or a `src/components/**` PR of her own, and says which when she opens it.

## Fix shape

One sweep PR across A, with B in it or beside it. Each edit is to a governance path, so the PR carries an `**Edit kind**:` line per file (ballot 2026-10-18-governance-edit-kinds) and Peter merges it. Surviving counter-argument: the ranking. These docs are Layer 2 and Layer 3 references that agents pull on demand, and the named-site fix already took the docs that teach by example; a raw-hit list may turn up mostly prop names and platform identifiers, in which case the sweep is a day of reading for a handful of edits. The cost of not doing it is the drift the first record named: an agent that follows a wrong key declares a name the index does not hold.

*Signed: Ada, 2026-10-25.*

---

## Corrections and the vetted list (2026-10-26, Ada)

I made these at S `a95d6bf3d` while writing `[ADA R1]` on the DRAFT ballot `.kiro/docs/ballots/2026-10-26-governance-examples-guard.md` (§ 7). The text above stays as written, and these lines correct it.

**1. Item B's wording is wrong.** "Shipped but not MCP-served" should read **"Not shipped, and not MCP-served"**. `package.json` `files[]` names no `README.md` under `src/components`. `npm pack --dry-run` lists one README there, `Icon-Base/platforms/android/res/drawable/README.md`, which `platforms/android/res/**` pulls in. Lina found this (ballot § 7 `[LINA R1]` L-4), and I re-ran it. The readers are agents and people in this repo, through the file system. Item B's work does not change.

**2. Item A is vetted.** Predicate v1 (ballot § 7 `[ADA R1]` item 1) finds **56 failures in 15 docs**. They replace the raw list above as what the sweep owes:
- **36 corrections** (CORRECTION; truth `token-index/`):
  - `Token-Semantic-Structure.md` L85, L86, L150, L152, L171, L232, L233, L625, L637
  - `Token-Resolution-Patterns.md` L100, L133–136, L142, L179–180, L211–212
  - `Rosetta-System-Architecture.md` L77, L78, L85, L220
  - `Transformer-Development-Guide.md` L318, L324, L326
  - `Token-Family-Layering.md` L273, L275
  - `Product-Token-Governance.md` L157
  - `MCP-Relationship-Model.md` L225
  - `Test-Behavioral-Contract-Validation.md` L291
- **20 correct mentions to mark `<!-- example: generic -->`** (EXECUTION, ballot § 2.3, once ratified):
  - `Token-Family-Blur.md` L111–112
  - `Token-Family-Spacing.md` L199, L488
  - `Layout-Specification-Vocabulary.md` L78
  - `Token-Family-Shadow.md` L124
  - `Token-Governance.md` L388, L443, L446
  - `DTCG-Integration-Guide.md` L117, L198
  - `Component-Family-Container.md` L311, L322
- **Outside the predicate, still owed by hand:**
  - prose: `a-vision-of-the-future.md` L213, L418 and `Token-Semantic-Structure.md` L691;
  - a platform path: `Token-Resolution-Patterns.md` L218 (`DesignTokens.color.primary`);
  - a stale alias value: `MCP-Integration-Guide.md` L237 (`{color.green400}`; the index maps `color.feedback.success.text` to `green500`).
- **Seen, not mine to fix**, for Lina: `platform-implementation-guidelines.md` L145, L156 (`DesignTokens.radius.input`) and L310, L321 (`DesignTokens.motion.floatLabel.duration`). Neither name is a key, and neither is an iOS or Android name the index carries.
- Where a doc in the 36 is not mine, its owner reviews the text, as § "Fix shape" says.

**3. The hits Lina routed to me** (ballot § 7 `[LINA R1]` item 4). Each is a CORRECTION.
- **`Token-Family-Blend.md` L88** (fence; the specifier is on L93) imports from `@3fn/core/ThemeAwareBlendUtilities`. The `exports` map has no such subpath. The right one is `@3fn/core/blend` (`exports["./blend"]` → `dist/blend/index.d.ts`). It exports `getBlendUtilities`, `createBlendUtilities` and `BlendTokenValues` (`src/blend/index.ts` L31–33). Truth: `package.json` `exports`.
- **`Token-Family-Layering.md` L76** (fence; the import is on L78) has `import { zIndexTokens } from '@3fn/core'`.
  - No entry of the `exports` map exports `zIndexTokens`. `src/browser-entry.ts` and the `config`, `types`, `build`, `blend` and `testing` entry sources neither name it nor re-export it with `export *`. It is defined only in `src/tokens/semantic/ZIndexTokens.ts`.
  - A web consumer reads `var(--z-index-modal)`, the web name the index carries for `zIndex.modal`.
  - The same doc uses `zIndexTokens` again at L113, in a block that imports nothing. The import-surface check (F-2 (c)) does not compile that block, so the sweep fixes it by hand.
  - Truth: `package.json` `exports` and `token-index/`.
- **`Token-Resolution-Patterns.md` L204 and L247** declare `scripts/generate-token-resolvers.ts` and `scripts/validate-token-references.ts`. `git ls-files` returns neither file. Both sketches are labelled "out of scope for current spec".
  - What L247 sketches exists in substance: `src/generators/__tests__/schemaTokenRefs.test.ts` for schemas, and this ballot's guard for docs once it is built.
  - The L100 block says the type unions "Should be generated". `scripts/generate-token-types.ts` already generates `ColorTokenName`, `ShadowTokenName` and `OpacityTokenName`.
  - The sweep rewrites the section to point at what exists. If the resolver sketch at L204 stays, it takes `generic`.

**4. The fix shape gains one clause.** If the guard is built before the sweep merges, these 56 go pending in it, homed here (ballot § 2.4, keyed per `[LINA R1]` L-6), and the sweep PR removes them. If the sweep merges first, nothing is pending for them. The trigger does not change.

*Signed: Ada, 2026-10-26.*
