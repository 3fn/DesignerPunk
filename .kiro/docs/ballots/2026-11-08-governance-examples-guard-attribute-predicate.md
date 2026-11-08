# Ballot Measure: the governance-examples guard gains its attribute and value half (Lina's predicate, version 1) — an amendment of ballot `2026-10-26-governance-examples-guard`

**Date**: 2026-11-08 (drafted)
**Drafted by**: Thurgood (owner of the instrument `scripts/governance-examples/`, ballot `2026-10-26-governance-examples-guard`, its build and this amendment).
**Authority to draft**: the 16.1.0 post-walk example-falsity rule, clause 6, as the seats confirmed it (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` L1863): "a behavior and attribute check, as a version bump of the governance-examples guard. It is Thurgood's instrument, and Lina writes the predicate." The record `.kiro/issues/2026-10-26-examples-guard-attribute-predicate.md` (owners Lina and Thurgood; Trigger `release:16.3.0:phase-1`, "fix-now by 16.3.0's S", re-ruled 2026-11-01 under Peter's delegation `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`) carries Lina's predicate text, and this ballot carries it verbatim. The orchestrator's queue at 2026-11-08, after Peter's go at 23:11:25Z: "clear what's owed to the next release" (relayed).
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Required reviewer**: **Stacy**. The guard is an armed barrier (register row `governance-examples`, `check_state: armed`), and its paths are in her ARMING instrument-path limb (ballot `2026-10-26-governance-examples-guard-adoption`, EXECUTION site 4). So her ARMING read fires at the build PR's merge. She is also the census reader.
**Consulted**: Lina — the predicate's author; her text (A-1 to A-7, with its limits) is carried byte-exact and is not reworded. Her read of this draft is owed before Peter. Ada — none needed. The amendment adds a half beside her token-name predicate v1 and changes none of its text.
**Class**: LAW. It adds a predicate to an armed barrier, which is a version bump of the guard (the guard ballot § 8.1's header: "a version bump is any change to … a resolution rule"), and it adds failures the guard did not report before.
**Retroactivity**: none. Hits found at adoption go on the pending list, each homed in a record (A-7, the § 2.4 rule), so adoption reds nothing that already merged.

> **Conflict of interest, stated first.** I own the instrument and draft its amendment. The predicate is Lina's, not mine. Stacy's review, Lina's read and Peter's ruling are the checks.

---

## 1. The gap

The guard as ratified checks three things: token names, declared paths (and token-file shape), and the `@3fn/core` import surface (the guard ballot § 2.1–§ 2.2, § 8.1–§ 8.4). It does not check what a web example's attributes and values do.

That is the gap RL-35 (A) and (B) fell through. Two instances from 16.1.0:
- `variant="danger"` on a button whose style union is `'primary' | 'secondary' | 'tertiary'`;
- `borderRadius` written as an HTML attribute where the element observes `border-radius`.

RL-31 (i) adds a CSS fence that declares a custom property as `var()` of itself.

**Heuristic count** (my scan at `5386f93ba`; served `governance/*.md` only, steering not counted; labelled heuristic, not the census):
- 156 hyphenated tags in fenced `html`, untagged, `tsx` and `jsx` blocks, in 9 docs, carrying about 468 attributes;
- 156 custom-property declarations in `css` fences, 2 of them self-referencing.

The build PR's census replaces these numbers (§ 5).

## 2. The measure

### Item 1 — the attribute and value half, version 1 (Lina's text, byte-exact)

**Site 1a.** The guard ballot `.kiro/docs/ballots/2026-10-26-governance-examples-guard.md` gains:
- a new § 2.7, "Attribute and value half (Lina's predicate, version 1)": one sentence pointing to § 8.11;
- a new § 8.11, "The attribute and value predicate, version 1 (Lina's text, byte-exact; module header)", whose body is the block below;
- a dated pointer on each: `*(added <date> by ballot 2026-11-08-governance-examples-guard-attribute-predicate item 1.)*`.

**Site 1b.** The module header of `scripts/governance-examples/check.ts` carries the same block between its own `====` lines, as § 8.1–§ 8.4 are carried, and the test compares it with the ballot byte for byte.

The block (from `.kiro/issues/2026-10-26-examples-guard-attribute-predicate.md` § "The predicate text", byte-exact):

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

**Limits, stated** (Lina's, byte-exact, carried beside the block as § 8.11's last paragraph):

> **Limits, stated**: A-3 cannot see an attribute the element reads some other way (a `dataset` read, a generic `attributeChangedCallback` loop), so such a valid attribute fails. That is the safe direction, and it is cleared by a marker or by naming the attribute in `observedAttributes`. A-4 reads values only through the schema, so an element that validates a value the schema does not list is not checked. *Signed: Lina, 2026-11-01.*

### Item 2 — the report line and the pending-list header (§ 8.6)

The new half's counts join the line, and its kinds join the header. Nothing is removed.

- Report line. **Before**: `<N> candidates; <R> resolve (<k> key, <c> channel, <n> namespace, <d> dtcg-path, <g> glob); <f> file names; <dp> declared paths (<dpr> resolve); <s> token-file shapes (<sr> pass); <i> import lines (<ir> type-check); <M> opted out (<gn> generic, <cn> consumer; <K> would fail if read); <P> pending`
- **After**: `<N> candidates; <R> resolve (<k> key, <c> channel, <n> namespace, <d> dtcg-path, <g> glob); <f> file names; <dp> declared paths (<dpr> resolve); <s> token-file shapes (<sr> pass); <i> import lines (<ir> type-check); <t> tags (<tr> registered); <a> attributes (<ar> pass); <v> enumerated values (<vr> pass); <cs> css self-references; <nr> elements not read; <M> opted out (<gn> generic, <cn> consumer; <K> would fail if read); <P> pending`
- Pending header. **Before**: `adopted: <sha> <date>; entries: <N> (token-name <a>, declared-path <b>, shape <c>, import <d>)`
- **After**: `adopted: <sha> <date>; entries: <N> (token-name <a>, declared-path <b>, shape <c>, import <d>, tag <e>, attribute <f>, value <g>, css-self-reference <h>)`

### Item 3 — the register row `governance-examples`

- **The `rule:` line** gains its fourth clause, after "and imports from …": "; and, in its web examples, uses only registered DesignerPunk tags, attributes each element observes or reads (or a global attribute), and enumerated values its schema lists, and declares no custom property as `var()` of itself (Lina's predicate v1)".
- **`education`**: the LAW HOME gains "§ 2.7 and § 8.11", and "Predicates: token-name Ada's (v1), file-shape Lina's" gains "attribute and value Lina's (v1)".
- **One history line**: `{ date: <application date>, change: "the attribute and value half added (ballot 2026-11-08-governance-examples-guard-attribute-predicate, RATIFIED <ruling>): Lina's predicate v1, A-1 to A-7, with its twin-agreement test; hits at adoption on the pending list; check_state unchanged (armed); ARMING at the build PR's merge (Stacy)", by: thurgood }`.

### Item 4 — the pending list after adoption

Ballot `2026-10-26-governance-examples-guard-adoption` § 2 bars any addition to `pending.json` without a ballot. **This ballot is that ballot, for one act only.** The build PR adds the attribute half's adoption hits, each homed in a record, as § 2.4 did for the first three halves, with the header's new counts. Any later addition takes its own ballot, as before.

## 3. Edit sites and application (after the Status commit)

1. **The Status commit** (record-first): Peter's words, and the ballots README roll entry.
2. **The build PR** (`scripts/governance-examples/**` is in my standing write scope, so no grant is owed). It carries:
   - the half in `check.ts`, with its module-header block byte-exact (site 1b);
   - the report line and pending header (item 2);
   - fixtures, one red per rule A-2 to A-5 and one for A-6's not-read case;
   - **Lina's twin-agreement test** (A-6: syntactic `observedAttributes` equals the built class's runtime list under jsdom, for every registered tag);
   - `pending.json`'s adoption entries, each homed (item 4);
   - the register row (item 3, a governance path, so Peter merges).

   **Site 1a** (the guard ballot's new § 2.7 and § 8.11) lands in the same PR.
3. **Checks**:
   - `npm run test:scripts` (each fixture red, then green);
   - `npm test`;
   - `check-section-citations`;
   - `check:122:diff-guard` (the lock moves: `governance/` is a closure root);
   - the in-lane registry step (`N registered; N selected`; the guard's entry is unchanged);
   - the census re-run (§ 5).
4. **The record** `.kiro/issues/2026-10-26-examples-guard-attribute-predicate.md`: Lina's rule-5 outcome line naming the build PR, and the archive move, in that PR.
5. **ARMING** at the build PR's merge: Stacy's read of the armed barrier whose code changes.

## 4. Recommendation, counter-argument (fold-back applied), residual

**I recommend items 1–4 as drafted.**

**The counter-argument.** This is a fourth predicate on a lexical guard, and it reads HTML with a tolerant tokenizer and element sources by syntax. A syntactic copy of a runtime signal is the shape the guard ballot already had to pin with a twin test (L-2). Each such copy is another place where the guard can disagree with what ships. The 156 tags in 9 docs will also land as a pending list on day one, and a pending list that large teaches readers that the guard's red is negotiable.

**What fold-back changed.**
- Lina's A-6 already pins the syntax read with a twin-agreement test against the built classes, and makes an unreadable `observedAttributes` a counted *not read*, never a pass.
- A-7's keys are content-addressed (doc, half, string, occurrence), so line moves do not churn the pending list.
- Item 4 limits the pending additions to this one adoption act.

**What survives.**
1. **The pending list will be large at adoption.** Its size is unknown until the build PR's census, and the heuristic says up to 156 tags across 9 docs. The guard is honest about the size, but every hit is owed a fix by its doc's owner, and that cost lands on Lina and the docs' owners after the release.
2. **A-3's limit is real.** An element that reads an attribute through `dataset` or a generic `attributeChangedCallback` loop fails a valid example. That is the safe direction, cleared by a marker or by naming the attribute in `observedAttributes`, but it is a false red until cleared.

**Forks**: none surfaced. Inline code spans are out of scope in this version (A-1); that is Lina's call in her text, not a fork.

## 5. Census

The guard's code is the instrument the amendment changes, and its module header is the law this ballot amends, so the item is presumptively in scope (conditions 2 and 3).

- `**Census**: npx tsx scripts/governance-examples/check.ts --census over governance/*.md and the eight packaged steering docs @ 5386f93ba — current c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd → proposed: not computed (no scratch diff at draft; the half is the build PR's); <N> docs change, PROJECTED: up to 9, from the heuristic in § 1 (delta: § Census appendix)`. This departs from the README form the same way the shape-review ballot's census line did (Stacy accepted that precedent there). The build PR runs the scratch diff and the shipped code at its own base, and their digests must be equal (README "Re-runs").
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds, renames or removes a get_section or get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an ordinary closure input; the lock is refreshed at the build PR`

## 6. Review round record

*(empty at R0)*

---

## Census appendix

`npx tsx scripts/governance-examples/check.ts --census` at `5386f93ba`, after `npm run build`: the last line reads `selected: 1968 (1949 token-name candidates, 4 declared paths, 1 token-file shapes, 14 import lines) over 91 docs; predicate v1, file-shape rule v1`, and the digest is `c13c9780…bfd`. There is no scratch diff, so no delta, at draft.
