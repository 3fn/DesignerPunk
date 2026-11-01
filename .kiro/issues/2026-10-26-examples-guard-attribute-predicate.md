# The governance-examples guard's attribute and value check needs its predicate (16.1.0 post-walk rule, clause 6)

**Date**: 2026-10-26
**Filed by**: Lina, under README rules 5 and 10, as the successor of plan item 3 of `2026-10-26-cdg-button-variant-and-container-attribute-examples.md` (RL-35), which closes in the PR that files this record. That record's Close moves item 3 "to Thurgood's record for the guard" if it is still open; no such record exists at `0218632d1`, so the predicate half, which is mine, moves here. Rule 9 applies to every later edit.
**Owner**: Lina (the predicate). Thurgood owns the instrument (`scripts/governance-examples/`, ballot `2026-10-26-governance-examples-guard`), its build and the ballot amendment; they are his to record, and this record does not file them for him.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-26, Lina, rule 12. The guard as ratified checks token names, declared paths and the import surface; it does not check what a web example's attributes and values do, which is the gap RL-35 (A) and (B) fell through. A guard weaker than its claim is `(guard)`.)*
**Trigger**: `release:16.3.0:phase-1` — the event that owes the close is the merge of the amendment or build PR of ballot `2026-10-26-governance-examples-guard` that carries the predicate text below (§ "The predicate text"), no later than 16.3.0's S. The text is written and in this record; the amendment, its ratification and the build are Thurgood's, so they cannot land before 16.2.0's S. *(Re-ruled 2026-11-01, Lina, owner, rules 9 and 11. Disposition: the owner's act is done now (the predicate text, here); the close follows Thurgood's amendment, fix-now by 16.3.0's S (sheet r2.1 row A1, "the examples-guard predicate (~2 h)"). Authority: Peter's one-off delegation, `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` (`.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "Delegation"), and R10 fork 1 (a), `R10@ee5ea2b80e58c26a6dea7e6dfd538d006193f755`, under which the rows disposed of under DLG and R8 count as a valid state for 16.2.0. Owner's recommendation: the 16.2.0 escalation package, Lina's file, as cross-read by the collective. The superseded line is quoted verbatim at the end of this record.)*

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

## The predicate text (2026-11-01, Lina, owner, rule 9)

*Written in the form of the guard ballot's § 8.4 rules, for Thurgood's amendment of ballot `2026-10-26-governance-examples-guard` (a version bump of the governance-examples guard). Facts read at `71768119a`: 35 `src/components/**/platforms/web/*.web.ts` files call `customElements.define('<tag>', …)` with a literal tag; 33 declare `static get observedAttributes()` returning an array literal; `src/browser-entry.ts` registers the same tags through `safeDefine`.*

````
- **A-1: scope.** Fenced blocks tagged `html`, or not tagged, and the JSX of blocks tagged `tsx` or `jsx`. Only elements whose tag name contains a hyphen are read. Inline code spans are out of scope in this version.
- **A-2: the registered tags.** A tag is DesignerPunk's when a `customElements.define('<tag>', …)` call with a string-literal tag appears in `src/components/**/platforms/web/*.web.ts`. A hyphenated tag in scope that no such call registers fails (a misspelled or retired tag, e.g. `<input-text>`). `<!-- example: consumer -->` skips **only** this check: a consumer's own elements are not DesignerPunk's. A-3 to A-5 still run for every registered tag in the block.
- **A-3: attributes.** Each attribute on a registered tag must be one of:
  (a) a string in that element's `observedAttributes` array literal;
  (b) the argument of a `getAttribute`, `hasAttribute` or `toggleAttribute` call with a string literal, in the same `*.web.ts` file;
  (c) a global HTML attribute: `id`, `class`, `style`, `slot`, `part`, `hidden`, `title`, `lang`, `dir`, `tabindex`, `role`, `inert`, any `aria-*`, any `data-*`, or any `on[a-z]+` event-handler content attribute.
  An attribute that matches none fails. The check compares the hyphenated attribute names, never the schema's camelCase prop names: `borderRadius` is Container-Base's prop, and as an attribute it fails, because the element observes `border-radius`.
- **A-4: enumerated values.** For an attribute that passes A-3 (a) or (b), find the element's schema prop: the prop whose name equals the attribute with hyphens removed, compared case-insensitively (`test-id` → `testID`). If that prop's `type` is a union of quoted string literals (`"'primary' | 'secondary' | 'tertiary'"`) or the prop carries `validation.enum`, the attribute's value must be one of them (`variant="danger"` fails). Boolean props, values containing `${` or `{{`, and attributes with no schema prop are not value-checked.
- **A-5: CSS self-reference.** In fenced blocks tagged `css`, a declaration whose property is a custom property (`--name`) fails when its value contains `var(--name` for the same name: the declaration redeclares a token as itself (RL-31 (i)).
- **A-6: the check reads syntax and does not render or run anything.** HTML is read by a tolerant tokenizer, with no DOM. The element sources are read by `ts.createSourceFile`, with no program and no `dist/`. An `observedAttributes` that is not an array literal (a spread, a computed list) is reported as **not read** for that element, counted in the report line, never as a pass. **A twin-agreement test** pins the syntax read to the running elements: for every registered tag, the syntactic `observedAttributes` equals the built class's runtime `observedAttributes` (jsdom, after `define`), and the test fails on any difference.
- **A-7: markers and keys.** `<!-- example: generic -->` skips the block entirely. Key: doc, half (`tag`, `attribute`, `value` or `css-self-reference`), the failing string, and its occurrence index in the doc. The line number is informational only. Hits found at adoption go on the pending list, each homed in a record, as § 2.4 does for the existing halves.
````

**Limits, stated**: A-3 cannot see an attribute the element reads some other way (a `dataset` read, a generic `attributeChangedCallback` loop), so such a valid attribute fails. That is the safe direction, and it is cleared by a marker or by naming the attribute in `observedAttributes`. A-4 reads values only through the schema, so an element that validates a value the schema does not list is not checked. *Signed: Lina, 2026-11-01.*

*(2026-11-01, Lina, owner, rules 9 and 11: Trigger re-ruled as above. The superseded Trigger line, verbatim:)*

> **Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S: the rule's clause 6 makes the check due before the next release's walk. **Lapse condition**: if this record is still open at that S, it lapses there and, being P2 `(guard)`, goes to Peter at that first lapse (rule 11), which is clause 6's own "the standing question returns to Peter at that walk".
