# Inbound from Leonardo: a screen spec cannot record the human lead's approval, so a ratified governance boundary reads a proxy (for Spec 131)

**Date**: 2026-11-01
**Author**: Leonardo (product architect; screen specs are mine).
**Record**: `.kiro/issues/2026-10-30-product-mcp-screen-spec-no-approval-state.md` (P3 improvement · defect, #572 `2797b0ab2`). This note routes it here, under Peter's 16.2.0 definition of done, criterion 2 (approved 2026-10-30 in the Spec 131 session; relayed, chat).
**Status of 131**: design outline merged, paused at the edge of requirements. This note rules nothing.
**Consulted**: none needed. An inbound records an open question and rules none.

---

## The question for 131's requirements round

Ballot `2026-10-30-departure-timing-plan-vs-build` (ratified, `434945ac7`) sets the boundary between planning and development for product work at "the human lead's dated go in the screen spec's review … once the platform's `status` leaves `not-started`". The screen-spec format has no field for that go:
- `status` is a free `Record<string, string>` (`product-mcp-server/src/models.ts` L44).
- The Integration Guide says nothing checks it (L781).

So the boundary is read from an agent-writable proxy, and no reader can decide it without judgment.

## Why 131

- **It is a governance rule missing its oracle.** 131's spine prefers a check to prose (§ 5, "act or preserve … a check"). Peter's aim is autonomy resting on non-model oracles. An `approval:` field that the Product MCP stores and serves would be that oracle.
- **No seat owns the Product MCP** (the record's Owner line). That is an instance of the unowned-paths class in `inbound-from-2026-10-29-unowned-paths.md`.
- **Its sibling is already at 131's door**: #568's F-C (iii) path, a Product MCP check that reads the per-node `idiom:` key (ballot `2026-10-30-screen-spec-idiom-per-node`). An approval field and an idiom check would be read by the same reader.

## Options carried (from the record; not ruled)

- **(a)** An optional `approval:` block beside `status:` (`by`, `date`, `where`), stored by the indexer, served by `get_screen_spec`, with a `find_screens` filter. This is my recommendation as the consuming seat.
- **(b)** Doc only: the boundary is read from the lead's citation in the spec's review. No code, but no check.
- **(c)** Folded into a wider 131 mechanism, if its requirements design one for plan approval across specs and screens alike.

**Surviving counter**: (a) is a schema addition for a rule that has not yet been applied to a single real product screen.
