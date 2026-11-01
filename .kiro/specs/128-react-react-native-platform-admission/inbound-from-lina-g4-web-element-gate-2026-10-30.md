# Inbound from Lina: the G-4 gate on 128's React (web) binding design (2026-10-30), Spec 128

**Date**: 2026-10-30
**Source**: the G-4 charter, `.kiro/issues/2026-10-30-g4-web-element-public-contract-charter.md`, and Peter's word on its gate: "Re: 5, Gate". Chat, relayed by the orchestrator, received before 2026-10-30T17:23:42Z, recorded as R8 in `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md`.
**Status**: an input to 128's outline round. The gate is Peter's ruling. Everything else here is Lina's position.

## What the outline must carry

1. **The gate**: "128's React (web) binding design is not approved before G-4's design merges."
   - It does not gate 128's outline, its requirements, or its React Native half.
   - G-4 opens when this spec's `requirements.md` is created (the charter's Trigger, `path:.kiro/specs/128-*/requirements.md`).
2. **What the React (web) design will read from G-4**:
   - each element's property names;
   - the attribute-only list;
   - event names;
   - the collision list (native and React event names);
   - the form-participation contract.
   
   Until G-4's design merges, a React wrapper design has nothing settled to wrap. On today's element API, React 19 silently drops `onPress` and camelCase attribute-only props (the charter's § 3, Sparky's source read).
3. **What 128 does not need to wait for**: the property-half rule, ratified now (collective sheet E), which says how each served non-callback prop is taken on web today.

**Surviving counter**: the gate adds G-4's design to 128's critical path. G-4's form-participation half (`ElementInternals` through nested shadow roots) is the slow part. If 128's React (web) work only needs the mapping rule, the gate holds it for form work it does not need. The outline round may ask Peter to narrow the gate to the mapping half.
