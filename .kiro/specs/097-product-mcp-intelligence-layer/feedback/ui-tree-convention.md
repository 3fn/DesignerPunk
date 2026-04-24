# UI Tree Convention — Draft

**Author**: Leonardo
**Date**: 2026-04-23
**Status**: Draft — subject to revision after real screen spec authoring
**Context**: Spec 097 (Product MCP Intelligence Layer) — the indexer needs a predictable UI tree structure for component extraction, token extraction, and gap detection.

---

## Purpose

Define the expected structure of `ui-tree` in screen spec YAML files so that:
1. The Product MCP indexer can reliably traverse and extract references
2. Spec authors know what the indexer will and won't see
3. Platform agents can parse the tree without guessing at conventions

This is a convention, not a schema. The indexer should handle deviations gracefully (log warnings, index what it can), not reject specs.

---

## Node Structure

A UI tree node is an object with the following fields:

```yaml
- component: ComponentName        # Required. System component or product one-off name.
  props:                          # Optional. Component configuration.
    variant: elevated
    label: "Section Title"
  tokens:                         # Optional. Design token references for this node.
    background: color.structure.surface
    padding: space.inset.normal
    text: color.contrast.onLight
  children:                       # Optional. Array of child nodes.
    - component: ChildComponent
      props: { ... }
      tokens: { ... }
  repeat: "for-each item in data.items"  # Optional. List rendering expression.
```

### Field Rules

| Field | Type | Required | Indexed By |
|-------|------|----------|------------|
| `component` | string | Yes | Reverse index (component→screens), gap detector |
| `props` | object | No | Not indexed |
| `tokens` | object (string keys, string values) | No | Reverse index (token→screens) |
| `children` | array of nodes | No | Traversed recursively |
| `repeat` | string | No | Not indexed |

### What the indexer does per node

1. Reads `component` → adds to component→screens reverse index, checks against gap detector
2. Reads `tokens` → iterates values, adds each to token→screens reverse index
3. Recurses into `children`
4. Ignores `props`, `repeat`, and any other fields

### What the indexer ignores

- `props` values are never treated as token references. If a token should be discoverable, it goes in `tokens:`, not in `props:`.
- Fields other than `component`, `tokens`, and `children` are passed through but not indexed.
- Unknown nesting keys (anything other than `children`) are not traversed. If nodes are nested under a custom key, the indexer won't find them.

---

## Platform Branching

The `ui-tree` key supports platform branching at the top level:

```yaml
ui-tree:
  shared:
    - component: Nav-Header-App
      tokens:
        background: color.structure.surface
    - component: Container-Base
      children:
        - component: Chip-Filter
        - component: legislation-card
          repeat: "for-each bill in data.bills"
          tokens:
            background: color.structure.surfaceVariant
  ios:
    navigation: NavigationStack push
  android:
    navigation: Scaffold topBar
  web:
    navigation: client-side route
```

### Branching rules

- `shared` contains nodes common to all platforms. Always traversed.
- `ios`, `android`, `web` contain platform-specific content. Traversed only when that platform is requested.
- When queried without a platform filter, the indexer traverses `shared` only for reverse indexes. Platform branches are included in the stored spec but not indexed separately — the reverse index reflects the shared tree.
- When queried with a platform filter (`get_screen_spec({ platform: 'ios' })`), the server merges `shared + ios` per the existing `filterPlatform` logic.
- Platform branches can contain node arrays (additional UI tree nodes) or non-node metadata (navigation strategy, platform-specific annotations). Only node arrays are traversed for indexing.

### How the indexer identifies traversable content in platform branches

A platform branch value is traversed if it's an array of objects where at least one object has a `component` field. Otherwise it's stored as metadata but not walked.

```yaml
# Traversed — array of nodes with component fields
ios:
  - component: Button-CTA
    props: { label: "iOS-only action" }

# Not traversed — metadata object
ios:
  navigation: NavigationStack push
```

---

## Token Reference Format

Token values in `tokens:` blocks are strings. The indexer stores them as-is with exact string matching.

```yaml
tokens:
  background: color.structure.surface       # Dot-notation semantic token
  padding: space.inset.normal               # Dot-notation semantic token
  text: color.contrast.onLight              # Dot-notation semantic token
  iconSize: icon.size100                    # Dot-notation component/semantic token
  gap: space100                             # Flat primitive token name
  fontSize: bodyMd                          # Flat typography token name
```

### Rules

- Use the canonical token name as it appears in Rosetta documentation.
- Dot-notation and flat names are both valid — different token families use different conventions.
- The indexer does not validate token names. A reference to a nonexistent token is stored and indexed without warning. (Token gap detection is a known future consideration, not in Spec 097 scope.)
- Token keys (left side: `background`, `padding`, etc.) are descriptive labels for the spec author's clarity. They are not indexed and have no enforced vocabulary.

---

## Worked Example

A realistic screen spec UI tree for a legislation list screen:

```yaml
ui-tree:
  shared:
    - component: Nav-Header-App
      props:
        title: "Legislation"
      tokens:
        background: color.structure.surface
        text: color.contrast.onLight

    - component: Container-Base
      tokens:
        padding: space.inset.normal
      children:
        - component: Chip-Filter
          props:
            options: [All, Active, Passed, Failed]
          tokens:
            gap: space.inline.normal

        - component: legislation-card
          repeat: "for-each bill in data.bills"
          props:
            title: bill.title
            status: bill.status
          tokens:
            background: color.structure.surfaceVariant
            padding: space.inset.tight
            gap: space.stack.normal

  ios:
    - component: Button-CTA
      props:
        label: "Track New Bill"
        placement: floating-action
      tokens:
        background: color.action.primary
        text: color.contrast.onPrimary

  web:
    navigation: client-side route /legislation
```

What the indexer extracts from this tree:

**Components** (reverse index): `Nav-Header-App`, `Container-Base`, `Chip-Filter`, `legislation-card`, `Button-CTA` (ios only)

**Tokens** (reverse index): `color.structure.surface`, `color.contrast.onLight`, `space.inset.normal`, `space.inline.normal`, `color.structure.surfaceVariant`, `space.inset.tight`, `space.stack.normal`, `color.action.primary`, `color.contrast.onPrimary`

**Gap detection**: Each component name checked against `component-meta.yaml` catalog + one-off components. `legislation-card` passes (one-off). `Nav-Header-App`, `Container-Base`, `Chip-Filter` pass (in catalog). `Button-CTA` passes (in catalog). Any unrecognized name flagged as `not-found`.

---

## What This Convention Does NOT Cover

- **State model structure** — separate convention, defined by `state-model:` key in screen specs
- **Accessibility annotations** — may live alongside UI tree nodes or in a separate `accessibility:` section; not yet standardized
- **Conditional rendering** — `repeat` is documented; `if`/`when` conditionals are not yet needed
- **Slot composition** — if a component uses named slots, the convention for expressing that in the tree is undefined
- **Component substitution across platforms** — if iOS uses ComponentA where web uses ComponentB for the same role, the branching pattern handles it but there's no explicit "substitution" annotation

These will be addressed if and when real screen specs require them. The convention is intentionally minimal for M0a.

---

## Revision Expectations

This convention will be revised after 3-5 real screen specs have been authored. Expected areas of revision:
- Accessibility annotation placement (inline vs separate section)
- Conditional rendering expressions beyond `repeat`
- Slot/named-children patterns for complex compositions
- Whether token keys need a controlled vocabulary or remain freeform

---

## Development Guidance

### Why Define This Now

The Product MCP indexer (Spec 097) makes real assumptions about UI tree structure — `node.component`, `node.children`, `node.tokens`, platform branching via `shared`/`ios`/`web`/`android` keys. Without a documented convention:
- The indexer is built against implicit assumptions that aren't written down
- Spec authors (primarily Leonardo) author specs against assumptions that aren't validated
- Silent indexing failures occur when tree shape doesn't match traversal expectations (Lina flagged this in requirements review — "every component name" is only as good as the traversal's assumptions)

### When to Formalize

**Now (Spec 097, Req 11 — Integration Guide)**: Include this convention as a draft section in the Integration Guide. The indexer is being built; the convention should ship alongside it. This is the minimum viable documentation — enough for the indexer to be predictable and for spec authors to know what's expected.

**After 3-5 real screen specs**: Revisit and either promote to stable or revise. Real authoring will reveal gaps in the convention (accessibility placement, conditional rendering, slot composition). Don't revise speculatively — revise based on what actually came up.

**Not as a separate spec**: This is a convention, not an architecture. It belongs in the Integration Guide, not in its own requirements/design/tasks cycle. The overhead of a full spec for a convention document would exceed the value.

### How to Handle Deviations

The indexer should be tolerant, not strict:
- **Log warnings** for nodes it can't parse (missing `component` field, unexpected nesting structure)
- **Index what it can** — a partially parseable tree is better than a rejected spec
- **Never reject a spec** because it doesn't match the convention. Screen specs are authored iteratively; a half-written spec with a partial UI tree should still be indexable.
- **Surface warnings in health** — `get_product_health` should report parsing warnings so authors know their tree has structural issues the indexer couldn't fully process

### What to Avoid

- **JSON Schema validation at index time**: Too rigid for iterative authoring. Validation belongs in a linter or CI check, not in the indexer's hot path.
- **Trying to cover every node type now**: We don't know what we don't know. Define the common case, leave room for extension.
- **Premature lock-in**: The draft status is intentional. If the convention needs to change after real usage, it changes. The indexer adapts. No spec author should feel constrained by a convention that predates real screen specs.
