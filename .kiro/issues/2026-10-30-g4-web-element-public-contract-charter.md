# Charter: G-4, the web-element public contract spec. How each web element takes its served props, events and callbacks, and how it takes part in a form

**Date**: 2026-10-30
**Owner**: Lina (charter, and the component surface it governs). **Formalizer**: Thurgood (spec formalization). **Web verifier**: Sparky. **Consumer of the gate**: Leonardo, who owns 128's outline round.
**Trigger**: `path:.kiro/specs/128-*/requirements.md` — the event is Spec 128's requirements file being created. At that event, G-4's design outline is opened (the spec number is assigned then), and it names the three records below. *(Set 2026-10-30, Lina, rule 1. A path token fires on git-visible work, before 128's design starts; it was Leonardo's form in the collective round. Not `manual`, because the gate below needs a readable event. Not `release:next:phase-1`, because the spec starts at 128's round, not at a release.)*
**Class**: P2 obligation (record) · charter *(set 2026-10-30, Lina, rule 12. It charters a spec and carries three records. No served text is false because of this file.)*
**Authority**:
- Peter's one-off delegation, `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "Delegation", `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`. It covers how fork 5 (G-4) is chartered and triggered.
- **The gate is Peter's own sentence**: chat, relayed by the orchestrator, received before 2026-10-30T17:23:42Z, "Re: 5, Gate". It is being recorded as R8 in the same record. Until R8 merges, cite that record path; after, cite `R8@<squash>`.
**Consulted**: Sparky (React DOM 19.2 source read, R1 and R3b); Leonardo (the gate's narrowed form, the trigger, and the attribute-only objection); Thurgood (formalizer, collective sheet E); Ada and Stacy (concurred on chartering, then on the gate after Sparky's read). These were collective rounds 1–3 and r2.1, 2026-10-30, all read-only seat consults.

---

## 1. What G-4 settles

The served schema names props, events and callbacks once, for every platform. On web there is no written contract for how an element takes them, and each component follows its own conventions. Sparky checked this against the 34 `platforms/web/*.web.ts` files at `2c00cea49` (VERIFIED, collective R1 (2)):
- Events use three naming styles: `selection-change` (Nav-TabBar, Nav-SegmentedChoice), `selectionchange` (Chip-Filter), and `consent-change`/`toggle-visibility`. Native names are reused too: `focus`/`blur` on 5 components, plus `select` and `change`.
- `onX` callback properties exist on 10 components and on none of the 7 `Input-*` components, although the Input `types.ts` files declare `onChange`.
- The number of property accessors ranges from 0 to 26. Form association is on 3 of 34 elements, and so is `delegatesFocus`.

G-4 designs the contract:
1. **The mapping rule.** For each served prop: a JS property, a kebab-case attribute, or both. For each served callback: the event name and whether an `onX` property exists. Plus the list of names that collide with native and React events.
2. **The rename and addition plan.** Event renames are breaking: 17.0.0 or an alias table. Adding a property is additive.
3. **Form participation.** `ElementInternals`, including through Input-Text-Email's nested shadow root; the Radio-Set group question; the real-browser lane for `FormData` submission.
4. **`delegatesFocus`** across the interactive elements.

**Not G-4**: the property half of the mapping rule, which is ballotted now as Sparky's R3b sentence (collective sheet E). G-4 inherits that sentence and its attribute-only findings list (§ 4) as input.

## 2. The gate

> **128's React (web) binding design is not approved before G-4's design merges.**

- **Whose**: Peter's, "Re: 5, Gate". It is an insertion into the ruled order 129 → 131 → 128 → 130, and Peter can overturn it with his word alone.
- **Scope**: as Leonardo narrowed it. 128's outline round and its React Native half are not gated, only the React (web) binding design.
- **Why**: Sparky's React DOM 19.2 read (§ 3). A wrapper design needs settled property names, event names and the collision list before it starts, or React wrappers fix today's accidental element API in place.
- **Residual** (Sparky): "not approved" is the half that can be enforced. 128's author can still draft against an unsettled contract and then redo it.

## 3. Evidence: React 19 and custom elements

Sparky read `setPropOnCustomElement` in React DOM 19.2.0's `react-dom-client.development.js`, in a copy bundled with a desktop app, outside this repo. Nothing in this repo depends on React. **VERIFIED by Sparky from source; SSR UNVERIFIED.**
- **Events**: a function-valued `onX` prop that is not a React synthetic event becomes `addEventListener(key.slice(2))`. The case is kept, and the element's `onX` property is never set.
  - `<button-cta onPress={f}>` listens for `Press`, but the element fires `press`. The handler never runs, and nothing reports it. The same happens to `onSelectionChange`.
  - `onFocus`/`onBlur` map to focusin/focusout. `onSelect` is React's text-selection plugin, so Input-Radio-Base's `select` event cannot be reached.
  - `onChange` does reach a bubbling `change`, but with a SyntheticEvent, not the `(value: string)` that `types.ts` declares.
- **Props**: any other prop is set as a property if `key in element`. Otherwise it is set as an attribute under its own name. So `<input-text-base helperText="x">` produces the attribute `helpertext`, never `helper-text`, and the value is dropped silently (R3b).
- **Consequence**: the draft rule "`onX` property plus `x` event" (`2026-10-25-web-prop-mapping-rule-gap.md`, its fix shape) is exactly what React 19 ignores. The event half is G-4's to design, not a line to ballot now.

## 4. Input: the attribute-only findings list

Under the property-half sentence, every served non-callback prop that a web element takes only as an attribute is marked attribute-only in the served schema, and listed as a G-4 finding. That list is the sweep's output (`2026-10-25-web-elements-served-prop-sweep.md`, fix-now by 16.3.0).
- **Known now**: elements with no property accessor, or only `shadowRoot`, at `d34fc7786`. Counted by Lina from accessor definitions in each `*.web.ts` (VERIFIED as a count; per-prop detail is the sweep's):
  - 0 accessors: Container-Base, Nav-Header-App, Nav-Header-Base, Nav-Header-Page, Progress-Bar-Base;
  - 1 accessor: Input-Text-Base, Input-Text-Email, Input-Text-Password, Input-Text-PhoneNumber.
- Leonardo's objection, verified by Sparky (R3b): `InputTextBase.web.ts` observes `helper-text` and reads it through `getAttribute`, with no `helperText` property, although `types.ts` L37 declares `helperText`.

## 5. The records this charter carries

Each is re-ruled to this charter's Trigger in the same commit that files it, with a dated reason.
1. **`2026-10-20-web-element-api-and-form-participation.md`**: E2–E5 and E8 (b). This is Peter's G-4 ruling of 2026-10-25, "Re: 6. Spec".
2. **`2026-10-26-form-needs-submit-action-fires-on-refused-semantic.md`**: the fork between aligning the checker (A) and widening the schema (B). B decides a form-container design that E8 (b) owns. The class fix (`AccessibilityChecker` reads enums from the served schema) rides that work.
3. **`2026-10-25-web-prop-mapping-rule-gap.md`, its event and callback half.** Its property half closes at the property-half ballot's application (collective sheet E), which is due before 16.2.0's S. That record's Trigger is re-ruled at that application, not here. The event half moves to this charter then.

## 6. What closes this charter

G-4's design outline merges and names the three records (rule 11's spec answer). Then this file gets rule 5's dated outcome line and moves to `archive/`. The three records stay open, each closing in its own fixing PR inside G-4.

*Signed: Lina, 2026-10-30.*
