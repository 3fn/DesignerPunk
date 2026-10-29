# `docs/collaboration.md` L70–71 state the token-autonomy levels as they stood before #491 and #535

**Date**: 2026-10-27
**Owners**: Thurgood (applies the correction under the grant below; the page's drafting seat, Spec 084 `tasks.md` Task 2.4) and Ada (filer; the token rules the two lines state). Peter assembled and approved the page (Spec 084 Task 2.7) and approves the bytes at the fixing PR's merge.
**Filed by**: Ada, under README rule 10, in the application PR of ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (#535; § 5 "Not edited"; § 12 step 11; § "Plans (Peter's condition)" row 3; [THURGOOD R2] item 3). The § 12 step 6 straggler sweep expected this hit and left it. Rule 9 applies to every later edit.
**Class**: P3 improvement · defect *(set 2026-10-27, Ada, rule 12. The page is the public Jekyll showcase. It does not ship in the package, it is not served to agents, and no tool or agent acts on it, so it is not one of M7's P0 surfaces and blocks no consumer. Its human readers are told two token rules that are no longer the law, which is why this is a defect and not only an improvement. Stacy may read it otherwise; that is a finding to Peter, never an upgrade by her.)*
**Trigger**: `manual` — closes at the merge of its fixing PR, Thurgood's, which applies the two lines under the grant below. *(Set 2026-10-27, Ada, rules 1 and 9. A P3 takes `manual`, naming its own fixing PR. If it is unfired at two consecutive walks, it is archived stale (rule 5), and rule 4 brings it back.)*

---

## What is wrong

Read at the application branch head `8d3e4a237`:

- **L70**: "- **Component tokens**: Requires explicit human approval". This has been stale since #491 (ballot `2026-10-25-token-selection-order-one-rule`): a component's own token is used freely inside that component, and any other use needs approval (Core Goals § "Development Practices").
- **L71**: "- **Creating any token**: Always requires human review". It becomes false at #535's merge: human review binds the creation of *system* tokens, and product tokens are planned at screen specification and discussed before implementation (Core Goals L59; Token Governance § "Token Creation Governance"; Product-Token-Governance § "Authoring Workflow").

## Fix

The bytes are Thurgood's to write and Peter's to approve. Offered, in the Core Goals wording:

```
- **Component tokens**: Agents use them freely inside the component they belong to; any other use requires explicit human approval
- **Creating any system token** (primitive, semantic or component): Always requires human review. Product tokens are planned at screen specification and discussed before implementation
```

The fix applies after #535 merges, so L71's new text is true when it lands. `docs/` is not a governance path, so the fixing PR needs no edit-kind line and no ballot.

**Grant paths**: `docs/collaboration.md`, `.kiro/issues/2026-10-27-collaboration-page-token-autonomy-lines.md`

- **Grantee**: Thurgood, a named owner of this record.
- **Activation**: Peter's merge of the PR whose body names this section, #535 (`.kiro/issues/README.md` rule 8).
- **Limit**: L70–71 only. Any other edit to the page is out of the list.

## Noted, not this record's

The page is stale beyond these two lines: it describes "three specialized AI agents", and there are eight (`docs/index.md` L69 says the same). Whether the showcase is refreshed is Peter's call ([THURGOOD R2] item 3).

*Signed: Ada, 2026-10-27.*
