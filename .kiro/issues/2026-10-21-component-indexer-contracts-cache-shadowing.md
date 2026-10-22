# `ComponentIndexer` keys `contractsCache` by declared name, not provenance — a same-named component in a higher-ranked root replaces core contracts silently; correct for a fork, wrong for a Spec 128 story-3 adopter

**Date**: 2026-10-21
**Owner**: Lina (Stemma; `application-mcp-server/src/indexer/ComponentIndexer.ts` is the code, in my standing write scope)
**Found by**: Lina, 2026-10-21 read on the orchestrator's brief — recorded verbatim as [LINA R1] item 2 in `.kiro/specs/128-react-react-native-platform-admission/inbound-from-peter-user-stories-2026-10-21.md` § 7 (PR #434, squash `739673c5b`); re-verified by the orchestrator; every citation below re-read by Lina in this tree at `d7385b4c2`
**Class**: P3 improvement · defect *(set 2026-10-21, Lina, rule 12. A LATENT defect. Today the only way a same declared name reaches a higher-ranked root under Model B is a consumer fork — a copied component dir whose `contracts.yaml` still says `component: Button-CTA` — and for a fork the replacement is the designed, tested behaviour (Spec 123 C3 / L-D2, Req 2.5; `MultiRootIndexing.test.ts` L35, L123). No reader is misled and no claim exceeds its guard, so not P2. It becomes P1 consumer-blocking the day an adopter's pre-existing component is indexed under one of our names without being a fork — Spec 128 story 3 ("integrate an existing React/RN design system", extract-and-map). The surviving argument for P2 `(guard)`: a cross-rank collision emits NO warning (only a same-rank one does, L266-270), so a consumer who deliberately authors our name on a non-fork today gets silent redefinition. I class P3 because that route requires writing a DesignerPunk declared name by hand, which is a fork in all but copy method. A dated line re-classes when 128's indexing of adopter roots lands. Peter can re-class.)*
**Trigger**: `path:.kiro/specs/128-react-react-native-platform-admission/requirements.md` — the first commit that adds Spec 128's requirements, where this record is taken in (an `implements:` conformance key, a provenance-keyed cache, or a rejected non-fork collision — § Fix shape) or left out with a reason. *(Set 2026-10-21, Lina, rule 9. `path:` over `manual` on Ada's reasoning for her 129 records: the 128 directory exists and its requirements round is the computable event that decides how story-3 components relate to ours. The readiness-union half (`:854-858`) is 129's seed under Peter's 2026-10-20 ruling and is cross-referenced, not owned, here.)*

---

## The defect

The union's first pass resolves one winner per DECLARED component name in root-precedence order (consumer root rank 0, package root after — design C3, `collectComponentSources` ranks by roots order). The winner's `contracts.yaml` is written to `contractsCache` under `data.component`. A lower-precedence same-named source is skipped. The cache key carries no root, so a higher-ranked root's `Button-CTA` does not sit beside ours — it IS ours for every reader of the cache. The comment at L272 states the assumption: "the consumer's fork wins". The mechanism cannot tell a fork from an unrelated component that happens to declare the same name.

## Evidence — VERIFIED in this tree (Lina, 2026-10-21, `d7385b4c2`)

```
$ sed -n '264,280p' application-mcp-server/src/indexer/ComponentIndexer.ts
    for (const source of this.collectComponentSources(roots)) {
      const owner = this.ownerByDeclaredName.get(source.declaredName);
      if (owner) {
        if (owner.rank === source.rank) {
          this.indexWarnings.push(
            `Duplicate declared component name ${source.declaredName}: ${source.dirPath} is shadowed by ${owner.dirPath}`
          );
        }
        // A lower-precedence root's same-named component is shadowed (the consumer's fork wins).
        continue;
      }
      this.ownerByDeclaredName.set(source.declaredName, { dirPath: source.dirPath, rank: source.rank });
      winners.push(source);
      const contractsResult = parseContractsYaml(path.join(source.dirPath, 'contracts.yaml'));
      if (contractsResult.data) {
        this.contractsCache.set(contractsResult.data.component, contractsResult.data);
      }
    }
$ sed -n '854,858p' application-mcp-server/src/indexer/ComponentIndexer.ts
    const platforms: Array<{ key: 'web' | 'ios' | 'android'; implPattern: RegExp; testPatterns: RegExp[] }> = [
      { key: 'web', implPattern: /\.web\.ts$/, testPatterns: [/\.test\.ts$/] },
      { key: 'ios', implPattern: /\.ios\.swift$/, testPatterns: [/Tests\.swift$/] },
      { key: 'android', implPattern: /\.android\.kt$/, testPatterns: [/Test\.kt$/] },
    ];
$ grep -n 'contractsCache' application-mcp-server/src/indexer/ComponentIndexer.ts
184:  private contractsCache = new Map<string, ParsedContracts>();
231:    this.contractsCache.clear();
279:        this.contractsCache.set(contractsResult.data.component, contractsResult.data);
384:      this.contractsCache.set(contractsResult.data.component, contractsResult.data);
677:        parent = this.contractsCache.get(contractsResult.data.inherits) ?? null;
$ grep -rn 'PLATFORM_KEYS' application-mcp-server/src src
(no output — the constant exists nowhere in source today)
```

- L259-262 (comment) — the union is "Spec 123 C3 / L-D2"; the cache is filled "consumer first, then package" so "an inheritance lookup from any root sees every root's parents". VERIFIED against `.kiro/specs/123-consumer-distribution/design.md:222-224` ("Precedence keys on the DECLARED component name … A fork whose directory name differs still collides correctly").
- `declaredNameOf` L623-634 — the `component:` field of `contracts.yaml`, else the schema `name:`, else the directory basename. `isComponentDir` L612-617 — a directory is indexed only if it holds a `*.schema.yaml` or a `contracts.yaml`.
- Pinned by `application-mcp-server/src/indexer/__tests__/MultiRootIndexing.test.ts` L35 ("applies the union at pass 1: a fork … wins on its DECLARED name") and L123 ("reindexComponent respects precedence: a shadowed package dir does not overwrite the fork"). The fork case is the only case tested; no test covers a non-fork collision, because none exists today.

## Who reads the replaced contracts — Model B impact today

- **One consumer of the cache** (VERIFIED, grep above): L677, the `inherits:` parent lookup inside assembly. Writers are L279 (union) and L384 (`reindexComponent`, which first honours precedence at L365-367).
- **The readiness scan does not read the cache** (VERIFIED: `derivePlatformReadiness` L843 onward has no `contractsCache` reference). No readiness path is affected by shadowing today.
- **What the replacement therefore changes**: the shadowed name's own assembly (the fork — intended), and the *inherited* contracts of every component, in any root, whose `inherits:` names the shadowed name. Nine core components inherit a core parent (VERIFIED, `grep -l '^inherits:' src/components/core/*/contracts.yaml` → 9: `Badge-Count-Notification`, `Chip-Filter`, `Chip-Input`, `Input-Checkbox-Legal`, `Input-Text-Email`, `Input-Text-Password`, `Input-Text-PhoneNumber`, `Nav-Header-App`, `Nav-Header-Page`). REASONING: a consumer who forks `Input-Text-Base` thereby changes what the served, un-forked core `Input-Text-Email` reports as its inherited contracts. That is inside the design's stated intent (the union exists so a fork can inherit a package parent), but it is the un-forked direction, and no warning names it.
- **No adopter component collides today** (VERIFIED by L612-634): a pre-existing React `Button/` with no DesignerPunk schema or contracts is not a component dir and is not indexed at all — [LINA R1] item 2's "not served at all until the indexer scans their roots". The collision needs our declared name written into their artifact, which 128's extract-and-map would do if it maps their component onto `component: Button-CTA`.
- Cross-rank collisions are silent; only same-rank ones warn (L266-270). VERIFIED.

## Spec 128 story-3 implication

The brief's statement holds on re-verification (REASONING on 128's design, which is not written): if an adopter's `Button` is mapped to `component: Button-CTA`, the first pass makes it the owner, our `contracts.yaml` for `Button-CTA` is never cached, and any `inherits: Button-CTA` resolves against theirs — our contract has been redefined by a component that never implemented it. The 2026-10-18 priorities record § 5 table does not list the indexer among the shared surfaces (VERIFIED, L70-78); this record names it.

## Related records

- `.kiro/specs/128-react-react-native-platform-admission/inbound-from-peter-user-stories-2026-10-21.md` § 7, [LINA R1] items 2 and 5 — the source read; item 5 notes the component-readiness side of the registry is unnamed in slice 1.
- `.kiro/issues/2026-10-03-react-react-native-platform-admission-charter.md` — the 128 charter.
- `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 5 (shared surfaces) and walk log 2026-10-20 (`PLATFORM_KEYS` as 129's registry seed, Peter's ruling).
- `.kiro/specs/123-consumer-distribution/design.md` § C3 "Indexer (`ComponentIndexer.ts`, L-D2)" L222-226 and the test table L292 — the design that introduced the union, and Req 2.5 it serves.

## Fix shape (not done here; for Spec 128's requirements round)

- Adopter components declare conformance, not identity: `implements: Button-CTA@<version>` (or equivalent) against our `contracts.yaml`, evidenced per contract — they are never the cache owner of our name. Only a fork (same artifact lineage) may own a core name, and a fork is the one case the current union already handles.
- Key `contractsCache` by provenance (root + declared name), or have the registry reject a cross-rank same-name collision that is not a fork, with a named warning either way — the silent `continue` at L273 is the line that changes.
- Open the readiness scan's closed `'web' | 'ios' | 'android'` union (`:854-858`) to registry-provided keys — 129 item (v)'s `PLATFORM_KEYS` (Ada's seed; nowhere in source today). Readiness rows for `react` / `react-native` cannot exist before that, which is why 128's step 2 precedes step 4.

**No fix is authorized by this record.**
