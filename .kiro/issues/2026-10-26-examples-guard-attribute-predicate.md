# The governance-examples guard's attribute and value check needs its predicate (16.1.0 post-walk rule, clause 6)

**Date**: 2026-10-26
**Filed by**: Lina, under README rules 5 and 10, as the successor of plan item 3 of `2026-10-26-cdg-button-variant-and-container-attribute-examples.md` (RL-35), which closes in the PR that files this record. That record's Close moves item 3 "to Thurgood's record for the guard" if it is still open; no such record exists at `0218632d1`, so the predicate half, which is mine, moves here. Rule 9 applies to every later edit.
**Owner**: Lina (the predicate). Thurgood owns the instrument (`scripts/governance-examples/`, ballot `2026-10-26-governance-examples-guard`), its build and the ballot amendment; they are his to record, and this record does not file them for him.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-26, Lina, rule 12. The guard as ratified checks token names, declared paths and the import surface; it does not check what a web example's attributes and values do, which is the gap RL-35 (A) and (B) fell through. A guard weaker than its claim is `(guard)`.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S: the rule's clause 6 makes the check due before the next release's walk. **Lapse condition**: if this record is still open at that S, it lapses there and, being P2 `(guard)`, goes to Peter at that first lapse (rule 11), which is clause 6's own "the standing question returns to Peter at that walk".

---

## What is owed

The 16.1.0 post-walk example-falsity rule, clause 6, as the seats confirmed it (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` L1863): "a behavior and attribute check, as a version bump of the governance-examples guard. It is Thurgood's instrument, and Lina writes the predicate."

The predicate checks, in a packed served doc's fenced examples:
- every attribute on a packed web tag against that element's `observedAttributes` and its `getAttribute`/`hasAttribute` reads. Those are the hyphenated attribute names, not the schema's camelCase prop names: a check against schema props would pass `borderRadius`, because `borderRadius` *is* Container-Base's prop;
- every enumerated attribute value against the prop's type union (`variant="danger"` against `ButtonStyle = 'primary' | 'secondary' | 'tertiary'`);
- CSS fences for a `var()` that references the property being declared.

## Plan

1. **The predicate text.** Lina writes it, in the form of the guard ballot's § 8.4 rules, for Thurgood's amendment of ballot `2026-10-26-governance-examples-guard` after the guard's v1 is built. **Owner**: Lina. **Due**: before the next release's walk.
2. **Not owed here**: the build, the version bump and the ballot amendment (Thurgood's).

## Close

When the predicate text is in a merged amendment or build PR, the owner adds rule 5's dated outcome line naming that PR and archives this record.
