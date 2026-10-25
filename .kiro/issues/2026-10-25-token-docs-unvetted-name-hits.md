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
