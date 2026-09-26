# Issue: Container-Base emitted 10 CSS custom properties that do not exist

**Date**: 2026-09-26
**Status**: RESOLVED (2026-09-26) — born closed. Fixed in PR `fix/container-base-phantom-vars` (commit `de205ed5`).
**Owner**: Lina
**Source**: Spec 123 tasks round, `feedback/tasks.md` § `[LINA R2]` item (d), finding **T2-L1**. It came up while answering Ada's closed-sets question: resolving the Container family's closed token maps against generated CSS turned up names that exist nowhere.

## The defect

Container-Base builds CSS variables at runtime from token-name maps (`tokenToCssVar`). Ten of the variables it emitted did not exist in `DesignTokens.web.css` / `ComponentTokens.web.css`, so the styles failed silently on web:

| Emitted (absent) | Cause | Real custom property |
|---|---|---|
| `--border-border-{default,emphasis,heavy}` | `borderTokenMap` held `'border.border.*'`, which assumed a category-prefix strip that `tokenToCssVar` never performed | `--border-{default,emphasis,heavy}` (tokens `border.*`) |
| `--zIndex-{container,navigation,dropdown,modal,toast,tooltip}` | `tokenToCssVar` only swapped dots, with no kebab-casing | `--z-index-*` |
| `--color-border` | `BORDER_COLOR_TOKEN = 'color.border'`, a token removed from the system (`ColorTokens.test.ts` asserts it is undefined) | `--color-structure-border` |

Effect: the web `border` and `layering` props, and the default border colour, rendered nothing.

**The unit tests pinned the broken strings** (`ContainerBase.test.ts`, e.g. `'border: var(--border-border-default) solid var(--color-border)'`). They checked text, not resolution — the patch-without-guard shape.

## The fix

- `borderTokenMap` → `border.{default,emphasis,heavy}`. The same phantom value is also fixed in Container-Card-Base's exported `cardBorderTokenMap`.
- `BORDER_COLOR_TOKEN` → `color.structure.border`.
- New **`tokenToCssCustomProperty`** mirrors the web generator's naming (kebab-case camelCase boundaries, hyphenate letter→digit). It **reproduces all 410 token-index web names exactly**. `tokenToCssVar` and both `getPropertyValue` sites (ContainerBase.web.ts, ContainerCardBase.web.ts) now go through it, so the family has one naming rule.
- Schema `tokens:` list corrected (`border.*`; `color.structure.border`); doc and comment mentions updated.
- The tests asserting the broken strings are corrected.

## The guard (so the class cannot recur here)

`src/components/core/Container-Base/__tests__/ContainerBase.token-resolution.test.ts` checks **resolution against the committed token index** (`token-index/*.yaml` `platforms.web`):

1. generator-name parity for every indexed token;
2. every closed-set token name the family emits resolves;
3. every literal `getPropertyValue` fallback resolves;
4. the oracle is asserted non-empty, so a vacuous pass is impossible.

**Bites, recorded red**:
- revert `borderTokenMap.default` → fails on `--border-border-default`;
- revert `BORDER_COLOR_TOKEN` → fails on `--color-border`;
- restore the dots-only rule → the parity and closed-set checks fail on `--zIndex-*`.

Spec 123 Task 6's gate 6.0 verifies this guard exists.

**Validation**: `npm test` 367/367 suites, 9059 tests; `npx tsc --noEmit` clean; `application-mcp-server` 24/24 suites.

## Left open, deliberately (separate follow-ups)

1. **Input-Text family — same defect class, different family.** `Input-Text-{Base,Email,Password,PhoneNumber}/platforms/web/*.browser.ts` use literal `var(--color-error)`, `var(--color-error-background)`, `var(--color-success-strong)` and `var(--color-background-hover)`. **None exist in generated CSS**, so the error and success state styling in the browser variants renders nothing. Needs its own fix and guard; this Container-scoped PR does not touch it.
2. **Cross-platform alias gap.** Native Container-Base accepts `borderColor = "color.border.default"` as an alias mapped to `color_structure_border` (Android `TokenMapping.kt`, iOS `TokenMapping.swift`). Web passes it straight through and would emit `--color-border-default`, which does not exist. The documented alias therefore works on native and not on web. Whether to add the alias on web or deprecate it on native is an API decision; it is recorded here and not changed.
3. **Schema color list.** Container-Base's schema still lists `color.background`, `color.surface`, `color.border.emphasis` and `color.canvas`, none of which is a registered token. The schema's colour list needs a truth pass against what the component actually consumes. That is metadata only (no runtime effect), but Spec 123 Task 6 reads `.schema.yaml tokens:` as a declared-use source.
4. **A repo-wide resolve-guard is not yet possible against the index alone.** Typography and motion composites expand into sub-properties (`-font-size`, `-duration`, …) that are not single index entries. A family-wide guard needs the generated CSS (gitignored) or a composite-expansion map.
