# Isolation Audit — Mutable-Accumulate-Read-Back Singletons on the Consumer-Boundary Path

**Date**: 2026-06-26
**Spec**: 124 — Component-Token Return Contract
**Task**: 4.2 (class-invariant guard + isolation audit)
**Agent**: Thurgood
**Requirement**: R8 AC1 — state the class invariant and verify `ComponentTokenRegistry` was the only such singleton.

---

## The class invariant

**No mutable-accumulate-then-read-back state crosses the scoped (`scopedTsRequire`) boundary.**

A singleton is dangerous across the boundary only if it is **written in one module copy and read back from another**. `scopedTsRequire` loads a second copy of `@3fn/core/build`; any object compared by **shared identity** across that boundary desyncs. `ComponentTokenRegistry` was exactly this pattern: `defineComponentTokens` wrote it as an import side effect in the loaded (duplicate) copy, and `loadComponentTokens` read `getAll()` from the canonical (parent) copy → silent zero. Spec 124 converts that one seam to a return-value harvest, so the only cross-boundary carrier is now the brand, which compares **by value-equal string** (Decision 2, Option A).

## Audit method

Enumerated every module-level singleton (`export const X = new …`) reachable on the consumer-boundary load path (`designerpunk.ts generate → loadConfig / resolveTokens / loadComponentTokens → generateTokenIndex / TokenFileGenerator`):

```
src/registries/ComponentTokenRegistry.ts:292   export const ComponentTokenRegistry = new ComponentTokenRegistryImpl()
src/build/tokens/UnitConverter.ts:320          export const unitConverter = new UnitConverter()
src/generators/transformers/TransformerRegistry.ts:60  export const transformerRegistry = new TransformerRegistry()
```

For each, classified by whether it is **mutated in one copy and read back in another**.

## Findings

| Singleton | Pattern | Cross-boundary risk | Verdict |
|-----------|---------|---------------------|---------|
| **`ComponentTokenRegistry`** | mutable-accumulate (write via side effect) → read back via `getAll()` in the *other* copy | **YES — the bug** | Fixed by 124: harvest is sole writer; `defineComponentTokens` no longer self-registers. Pinned by the class-invariant guard. |
| `unitConverter` | **stateless** — pure unit conversion, no accumulation; nothing to desync | none | Benign when duplicated. |
| `transformerRegistry` | **populate-at-init, read-in-same-copy** — self-registers `FigmaTransformer` at module-load (`TransformerRegistry.ts:63`) and is read via `getAll()` within the *same* copy; never written in copy A and read from copy B | none | Benign when duplicated: each copy self-populates identically; no write-here-read-there path. |
| color `Map`s (palette lookups) | **immutable lookup tables** built once at module-load; read-only thereafter | none | Benign when duplicated. |

## Conclusion

`ComponentTokenRegistry` was the **only** mutable-accumulate-read-back singleton on the consumer-boundary path. `unitConverter` (stateless), `transformerRegistry` (populate-at-init / read-in-same-copy), and the color lookup `Map`s (immutable) are all **verified benign** when the scoped require duplicates `@3fn/core/build` — none is written in one copy and read from another. The class invariant (R8 AC1) holds after Spec 124, and the 124-local class-invariant guard (R8 AC2, in `loadComponentTokens.test.ts`) reds loudly if the side effect is reintroduced. The broader lint codification is flagged for 118's 9.4 / Task 11 (R8 AC3) — NOT built here.
