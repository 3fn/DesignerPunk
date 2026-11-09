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

The block (from `.kiro/issues/2026-10-26-examples-guard-attribute-predicate.md` § "The predicate text", byte-exact, as amended by Lina at R1 in A-6, § 6 [LINA R1]; the record's copy is hers to update):

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
- **A-6: the check reads syntax and does not render or run anything.** HTML is read by a tolerant tokenizer, with no DOM. The element sources are read by `ts.createSourceFile`, with no program and no `dist/`. An `observedAttributes` that is not an array literal (a spread, a computed list) is reported as **not read** for that element, counted in the report line, never as a pass. **A twin-agreement test** pins the syntax read to the running elements: for every registered tag whose `observedAttributes` is an array literal, the syntactic list equals the built class's runtime `observedAttributes` (jsdom, after `define`), and the test fails on any difference. For a not-read element, A-3 runs with (a) empty. The report line prints the count, e.g. `not read: 10 of 34`.
- **A-7: markers and keys.** `<!-- example: generic -->` skips the block entirely. Key: doc, half (`tag`, `attribute`, `value` or `css-self-reference`), the failing string, and its occurrence index in the doc. The line number is informational only. Hits found at adoption go on the pending list, each homed in a record, as § 2.4 does for the existing halves.
````

**Limits, stated** (Lina's, byte-exact, carried beside the block as § 8.11's last paragraph):

> **Limits, stated**: A-3 cannot see an attribute the element reads some other way (a `dataset` read, a generic `attributeChangedCallback` loop), so such a valid attribute fails. That is the safe direction, and it is cleared by a marker or by naming the attribute in `observedAttributes`. A-4 reads values only through the schema, so an element that validates a value the schema does not list is not checked. *Signed: Lina, 2026-11-01.*

### Item 2 — the report line and the pending-list header (§ 8.6)

The new half's counts join the line, and its kinds join the header. Nothing is removed.

- Report line. **Before**: `<N> candidates; <R> resolve (<k> key, <c> channel, <n> namespace, <d> dtcg-path, <g> glob); <f> file names; <dp> declared paths (<dpr> resolve); <s> token-file shapes (<sr> pass); <i> import lines (<ir> type-check); <M> opted out (<gn> generic, <cn> consumer; <K> would fail if read); <P> pending`
- **After**: `<N> candidates; <R> resolve (<k> key, <c> channel, <n> namespace, <d> dtcg-path, <g> glob); <f> file names; <dp> declared paths (<dpr> resolve); <s> token-file shapes (<sr> pass); <i> import lines (<ir> type-check); <t> tags (<tr> registered); <a> attributes (<ar> pass); <v> enumerated values (<vr> pass); <cs> css self-references; not read: <nr> of <tt>; <M> opted out (<gn> generic, <cn> consumer; <K> would fail if read); <P> pending`
- Pending header. **Before**: `adopted: <sha> <date>; entries: <N> (token-name <a>, declared-path <b>, shape <c>, import <d>)`
- **After**: `adopted: <sha> <date>; attribute half adopted: <sha> <date>; entries: <N> (token-name <a>, declared-path <b>, shape <c>, import <d>, tag <e>, attribute <f>, value <g>, css-self-reference <h>)`
- `--census`'s last line gains the new half's version: `…; predicate v1, file-shape rule v1, attribute predicate v1`.
- The per-doc `--census` line (`<doc>\t<candidates>:<failing>:<optedOut>`) counts the new half's reads in its three numbers. That is: tags, attributes, values and css declarations read; their hits; and their opted-out reads.

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
   - **Lina's twin-agreement test** (A-6: syntactic `observedAttributes` equals the built class's runtime list under jsdom, for every registered tag whose `observedAttributes` is an array literal);
   - `pending.json`'s adoption entries, each homed (item 4). The PR body names this ballot, lists every entry added (doc, half, string, occurrence, home), and gives the header before → after. That is what Stacy's `pending.json` ARMING read checks against the diff.
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
- Stacy's replay corrects the counter-argument's size: 156 is tags read, not hits (residual 1).

**What survives.**
1. **The share not read, not the size of the list.** Stacy's replay ([STACY R1] § 2, corrected at [STACY R2]) projects 6 adoption hits in 4 docs, one of them a false fire: `<test-file-path>`, a placeholder in an untagged fence. 156 is the number of tags read, not the number that fail. What survives is that 10 of the 34 registered elements return `observedAttributes` as a constant or a spread. A-6 reports them as not read, so their attributes are checked only through A-3 (b) and (c).
2. **A-3's limit is real.** An element that reads an attribute through `dataset` or a generic `attributeChangedCallback` loop fails a valid example. That is the safe direction, cleared by a marker or by naming the attribute in `observedAttributes`, but it is a false red until cleared.
3. **What A-1 does not read.** PascalCase JSX and inline code stay out of scope. `governance/Token-Family-Radius.md` L351–359 writes `borderRadius` as an attribute on `<Card>`, `<Button>` and `<Avatar>`, which is RL-35 (B)'s shape, and this version does not read them.

**Forks**: one. **F-1, what the per-doc `--census` line counts.**
- **(a) Recommended (Thurgood, Stacy): the new half's reads.** `<N>` projects 21 docs (§ 2 item 2; [THURGOOD R3] item 2). *Cost*: the census delta to read at the build PR is 21 docs, not 4. *Counter that survives*: 17 of the 21 lines change with no hit in them, so most of the delta is count growth that a reader must check is only that.
- **(b) Token-name reads only, with the new half shown in the last line.** `<N>` projects the 4 docs with a hit, and § 2 item 2's per-doc bullet reads instead: "The per-doc `--census` line counts token-name reads only; the new half's counts are in the last line." *Cost*: a doc's own line does not show that doc's tag, attribute, value or css reads and hits; they show only in the last line and the report line. *Counter that survives*: the per-doc line and the report line then count different reads, so a doc's line can read clean while the report is red.

Inline code spans are out of scope in this version (A-1); that is Lina's call in her text, not a fork.

## 5. Census

The guard's code is the instrument the amendment changes, and its module header is the law this ballot amends, so the item is presumptively in scope (conditions 2 and 3).

- `**Census**: npx tsx scripts/governance-examples/check.ts --census over governance/*.md and the eight packaged steering docs @ 5386f93ba — current c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd → proposed: not computed (no scratch diff at draft; the half is the build PR's); <N> docs change, PROJECTED: 21, the docs carrying a hyphenated tag in scope (10) or a css custom-property declaration (12) that the new half reads, with one doc in both; 4 of them have a hit (Stacy's heuristic replay, [STACY R2]) (delta: § Census appendix)`. This departs from the README form: the proposed digest is not computed at draft, and the count below is a heuristic, not a census. The shape-review ballot's PROJECTED line held by construction, and this one does not. So the ruling is on the projection, and the build PR's body carries the census in its first form at its own base: the current digest, the proposed digest, the docs that change, and the hits per half (`tag`, `attribute`, `value`, `css-self-reference`) with the elements not read. Stacy's ARMING read compares those hits with the projection here. A difference is a finding routed to Peter. PROJECTED hits (Stacy's heuristic replay at `5386f93ba`, as corrected at [STACY R2]): tag 3, attribute 1, value 0, css-self-reference 2, in 4 docs; 10 of 34 elements not read. One tag hit, `<test-file-path>` at `.kiro/steering/start-up-tasks.md` L98, is a placeholder in an untagged, indented fence, so it is a false fire of A-1's untagged scope. The R1 replay missed it because it did not read indented fences.
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds, renames or removes a get_section or get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an ordinary closure input; the lock is refreshed at the build PR`

## 6. Review round record

#### [STACY R1] — required reviewer, census reader and ARMING reader, on the attribute-predicate amendment

**Read at** `733cbff6e` (`origin/chore/ballot-examples-guard-attribute-predicate`), against `main` = `5386f93ba`. That is the ballot's own census base: `git diff --stat 5386f93ba origin/main -- governance src/components scripts/governance-examples` is empty. Date: 2026-11-08. This was a read-only review: I committed nothing.

**Verdict: CHANGES.** There are five pairs on Thurgood's text, in § 3 below. Two questions go to Lina on her own text, in § 4, and I propose no wording for them. The measure itself is sound. My objections are to the census line, the residual's arithmetic, and what the build PR must carry for my reads.

---

### 1. Does the build fire my ARMING read? Yes, at the build PR's merge, with four reads

- **The instrument-path limb.** `scripts/governance-examples/**` is on my list. I owe its three reads:
  - deletions `0` in `scripts/governance-examples/__tests__/*.test.ts` and under `__tests__/__fixtures__/**`, unless the body names the file and this ballot;
  - the body cites the fixture test run, which is every A-2 to A-5 fixture red and then green, the A-6 not-read fixture, and the twin-agreement test;
  - `EXPECTED_CONTEXTS` is unchanged.
- **The `pending.json` read**, my row's fourth read, which item 4 triggers.
  - The header changes, and entries are added.
  - Both are findings unless the PR body:
    - names this ballot, RATIFIED at the merge;
    - lists every added entry;
    - gives the header before → after;
    - and the list equals the entries the diff adds.
  - § 3 does not require that body list today (pair P3).
- **The census-digest read.** It cannot be performed as the ballot stands. There is no ballot scratch diff, so "the ballot's scratch diff and the shipped code, each run at the PR's own base" compares the build with itself (pair P1).
- **Not fired**:
  - the Status commit;
  - P1, P1b and P1c (the in-lane registry entry is unchanged, as § 3 step 3 says);
  - the required-check set, because the guard is already armed.
- **Next RELEASE phase 1** (the record's `release:16.3.0:phase-1`): my governance-examples read compares P at S with the header's counts, and reads the predicate and rule versions that `--census` prints. Both need the new half to be visible (pairs P4 and P5).

### 2. The false-fire and false-miss arithmetic, against `5386f93ba`

**My heuristic replay, labelled heuristic.** It is my regex scan, not the census:
- **Scope**: the guard's own scope, which is `governance/*.md` except `EXCLUDED_DOCS` (`classification-map.md`), plus the eight `files[]` steering docs.
- **Registered tags**: 34, from literal `customElements.define` calls.

| Rule | Read | Projected hits |
|---|---|---|
| A-1/A-2 | 157 hyphenated-tag occurrences, 24 distinct, in 10 docs | **2**: `<list-item>` and `<card-header>` in `Component-Family-Badge.md` (L403 and L412). Neither tag is registered, and neither block carries a marker. A third, `<entry-id>` in an untagged fence, is in `classification-map.md`, which is excluded. |
| A-3 | 396 attributes on registered tags | **1**: `autocomplete` on `<input-text-password>` in `Component-Family-Form-Inputs.md`. The element sets its own `autocomplete` and reads none. |
| A-4 | 89 values checked, on the 26 of 34 elements whose schema has an enumerated prop | **0**. The RL-35 (A) instance `variant="danger"` is already gone from the docs. |
| A-5 | 146 custom-property declarations | **2**: `--shadow-container` and `--shadow-fab` in `Token-Family-Shadow.md` |
| A-6 | the elements' `observedAttributes` | **10 of 34 not read**: `chip-base`, `chip-filter`, `chip-input`, `input-checkbox-base`, `input-checkbox-legal`, `input-radio-base`, `input-radio-set`, `nav-header`, `nav-segmented-choice`, `nav-tab-bar`. Each returns an imported constant or a spread, not an array literal. |

**What the replay shows:**
- **About 5 adoption hits in 3 docs.** The ballot's § 4 residual 1 says the list is up to 156 tags across 9 docs. That counts candidates as hits: 156 is the number of tags read, not the number that fail. The pending-list counter-argument does not survive at the size it is stated (pair P2).
- **What does survive is the share not read.** 10 of the 34 elements (29%) have their attributes read only through A-3 (b) and (c).
  - On today's docs that costs nothing: every attribute on those 42 tag occurrences is matched by a `getAttribute`/`hasAttribute` literal or is a global.
  - What it means for a future example depends on a reading Lina's text leaves open (§ 4).
- **False misses the measure does not name.**
  - **PascalCase JSX is out of A-1's scope.** `governance/Token-Family-Radius.md` L351–359 still writes `<Card borderRadius="radius.normal">`, `<Button borderRadius=…>` and `<Avatar borderRadius=…>`. That is RL-35 (B)'s shape (a camelCase prop written as an attribute), on tags A-1 never reads.
  - Inline code is also out of scope (A-1).

  The ballot cites RL-35 (B) as the gap it closes. It should say which instances of that class stay unread (pair P2).

### 3. The pairs

**P1: § 5, the census line's departure sentence.** The precedent it cites does not transfer. I accepted shape-review departure 4 because its count held by construction: all 261 rows pin one value (that ballot, R2 N-9 and the departure-4 ruling). Here the projection is a heuristic, and the proposed digest is not computed. That leaves my census-digest read nothing to compare.

Before:
> This departs from the README form the same way the shape-review ballot's census line did (Stacy accepted that precedent there). The build PR runs the scratch diff and the shipped code at its own base, and their digests must be equal (README "Re-runs").

After:
> This departs from the README form: the proposed digest is not computed at draft, and the count below is a heuristic, not a census. The shape-review ballot's PROJECTED line held by construction, and this one does not. So the ruling is on the projection, and the build PR's body carries the census in its first form at its own base: the current digest, the proposed digest, the docs that change, and the hits per half (`tag`, `attribute`, `value`, `css-self-reference`) with the elements not read. Stacy's ARMING read compares those hits with the projection here. A difference is a finding routed to Peter. PROJECTED hits (Stacy's heuristic replay at `5386f93ba`, [STACY R1] § 2): tag 2, attribute 1, value 0, css-self-reference 2, in 3 docs; 10 of 34 elements not read.

**P2: § 4, "What survives", item 1, plus one item added.**

Before:
> 1. **The pending list will be large at adoption.** Its size is unknown until the build PR's census, and the heuristic says up to 156 tags across 9 docs. The guard is honest about the size, but every hit is owed a fix by its doc's owner, and that cost lands on Lina and the docs' owners after the release.

After:
> 1. **The share not read, not the size of the list.** Stacy's replay ([STACY R1] § 2) projects about 5 adoption hits in 3 docs. 156 is the number of tags read, not the number that fail. What survives is that 10 of the 34 registered elements return `observedAttributes` as a constant or a spread. A-6 reports them as not read, so their attributes are checked only through A-3 (b) and (c).
> 3. **What A-1 does not read.** PascalCase JSX and inline code stay out of scope. `governance/Token-Family-Radius.md` L351–359 writes `borderRadius` as an attribute on `<Card>`, `<Button>` and `<Avatar>`, which is RL-35 (B)'s shape, and this version does not read them.

**P3: § 3 step 2, a body requirement for the `pending.json` read.**

Before:
> - `pending.json`'s adoption entries, each homed (item 4);

After:
> - `pending.json`'s adoption entries, each homed (item 4). The PR body names this ballot, lists every entry added (doc, half, string, occurrence, home), and gives the header before → after. That is what Stacy's `pending.json` ARMING read checks against the diff.

**P4: § 2 item 2, the pending header, so the RELEASE read can baseline the new kinds.**

Before:
> - **After**: `adopted: <sha> <date>; entries: <N> (token-name <a>, declared-path <b>, shape <c>, import <d>, tag <e>, attribute <f>, value <g>, css-self-reference <h>)`

After:
> - **After**: `adopted: <sha> <date>; attribute half adopted: <sha> <date>; entries: <N> (token-name <a>, declared-path <b>, shape <c>, import <d>, tag <e>, attribute <f>, value <g>, css-self-reference <h>)`

**P5: § 2 item 2, the `--census` version line.** My RELEASE read takes the versions from `--census`. The appendix shows that its last line prints `predicate v1, file-shape rule v1` only.

Before: (no bullet)

After (a bullet after the pending-header pair):
> - `--census`'s last line gains the new half's version: `…; predicate v1, file-shape rule v1, attribute predicate v1`.

### 4. To Lina, on her text: questions only, no wording proposed

- **[@LINA]** A-6 makes a non-literal `observedAttributes` "not read … never as a pass". For such an element, does A-3 run with (a) empty, or is A-3 skipped?
  - If A-3 runs with (a) empty, an attribute the element observes through its constant, but reads only through `attributeChangedCallback`, fails. That is a false fire.
  - If A-3 is skipped, every attribute on 10 of the 34 elements goes unchecked. Those are false misses.
  - On today's docs the two readings give the same 0. They diverge on the next example.
- **[@LINA]** The twin-agreement test is "for every registered tag". For the 10 not-read tags, the syntactic list does not exist. Is a not-read tag a failure of the test, which would make the build red at once, or an exclusion? If it is an exclusion, is the excluded count printed, so that 24 of 34 is not read as all of them?

### 5. The census line's other entries

The two `not in scope` lines (check-section-citations and 122-diff-guard) are correct as stated: no site adds a `get_section` citation, and `governance/` is an ordinary closure input.

**Standards implications**: none. The pairs are execution requirements on this ballot.

**Review**: CHANGES, P1–P5. Questions to Lina on A-6. ARMING is owed at the build PR's merge (four reads), and the governance-examples read at 16.3.0's RELEASE phase 1.

#### [LINA R1]

*Her read-back at `733cbff6e`, spliced byte for byte:*

Lina on origin/chore/ballot-examples-guard-attribute-predicate @ 733cbff6e: APPROVE, no changes.

1. A-1 to A-7 byte check: every non-blank line of my block (issue record on main, lines 34-47) appears verbatim in the ballot draft, including A-3's (a)-(c) sub-lines.
2. Predicate: not coded on main (check.ts has no customElements/observedAttributes), so I could not run the guard. I did a regex scan of governance/, .kiro/steering/, docs/, canonical/ against the 34 registered tags. Ten hyphenated tags in untagged/html/tsx/jsx fences are unregistered: sl-button and sp-button (Component-Development-Guide) are real hits; test-file-path, your-file-key, figma-url, doc-id, one-line, entry-id, last-tag, review-base are placeholders in untagged fences, likely shell/prose, so A-1's "or not tagged" would fire on them. A-7's pending list at adoption covers this; the predicate is right but the adopter should expect these ten.

*Her answer to [STACY R1] § 4 on A-6, relayed by the coordinator and applied byte for byte to the block in § 2 item 1:*
- **Before**: "for every registered tag, the syntactic `observedAttributes` equals"
- **After**: "for every registered tag whose `observedAttributes` is an array literal, the syntactic list equals"
- **Appended to A-6**: "For a not-read element, A-3 runs with (a) empty. The report line prints the count, e.g. `not read: 10 of 34`."

#### [THURGOOD R2] — incorporation

1. **[STACY R1] P1–P5: applied as written.**
   - P1 is in § 5's departure sentence.
   - P2 is in § 4 "What survives", items 1 and 3.
   - P3 is in § 3 step 2.
   - P4 and P5 are in § 2 item 2.
2. **[LINA R1] A-6: applied byte for byte.** The block's intro line now says "as amended by Lina at R1". The record's copy, `.kiro/issues/2026-10-26-examples-guard-attribute-predicate.md` § "The predicate text", is hers to update. Her answer settles both of Stacy's § 4 questions:
   - A-3 runs with (a) empty, which is the safe direction and the one her Limits paragraph already names;
   - a not-read tag is excluded from the twin test, and the count is printed.
3. **Consequential edits to my own text** (none to Stacy's or Lina's):
   - item 2's report-line field now reads `not read: <nr> of <tt>`, Lina's form, where `<tt>` is the registered elements;
   - § 3's twin-test bullet carries Lina's "whose `observedAttributes` is an array literal";
   - § 4 gains a fold-back bullet for the corrected size;
   - § 5's census line now projects 3 docs, from Stacy's replay, where it said "up to 9".
4. **The counts, reconciled.**
   - My 156 and Stacy's 157 count tags **read**, not hits. Stacy's count includes the steering docs; mine did not.
   - Lina's ten come from a wider scan: `docs/`, `canonical/`, all of `.kiro/steering/`, and `classification-map.md`, which `EXCLUDED_DOCS` removes. The guard reads none of those.
     - `sl-button` and `sp-button` (`governance/Component-Development-Guide.md` L412–413) are inline code, which A-1 does not read.
     - `figma-url`, `doc-id` and `last-tag` are inline code in governance docs.
     - `your-file-key` is in `docs/`, and `entry-id` is in the excluded `classification-map.md`.
     - I did not find `one-line` or `review-base` in the guard's scope.
   - **One of Lina's ten is in scope, and both heuristic replays missed it.** `<test-file-path>` sits in an untagged fence in `.kiro/steering/start-up-tasks.md` L98, the decision tree, which is a `files[]` steering doc. A-1 reads it, and A-2 fails it. That makes the projection tag 3, in 4 docs.
     - [@STACY] Do you want P1's PROJECTED line changed to count it? The line is your replay, so I have not edited it.
     - The doc is Layer 1 and Peter-merged, and the hit would go on the pending list, homed in a record, at the build PR.

#### [STACY R2] — the final draft at `6e6847aec`, read against my pairs

**Read at** `6e6847aec`, against `main` = `5386f93ba`. Date: 2026-11-08. This was a read-only review: I committed nothing.

**Verdict: four pairs remain, R1 to R4.** P1–P5 are applied as I wrote them. Lina's A-6 change answers both of my questions.

The recount is right, and the miss was mine. My R1 replay matched fences only at column 0. `start-up-tasks.md` L98 is inside a fence indented three spaces, so the replay never read it. I re-ran the replay with indented fences (up to three spaces) and with `classification-map.md` excluded. It now gives:

| Half | Hits | Where |
|---|---|---|
| tag | 3 | `<list-item>`, `<card-header>`, `<test-file-path>` |
| attribute | 1 | `autocomplete` on `<input-text-password>` |
| value | 0 | 89 values checked |
| css-self-reference | 2 | `Token-Family-Shadow.md` |

That is 6 hits in 4 docs (Badge, Form-Inputs, start-up-tasks, Shadow), with 10 of 34 elements not read. `<test-file-path>` is a placeholder, not an example element. It is a **false fire** of A-1's "or not tagged" scope, which is the class Lina's R1 names.

**A second error, in the census line's unit.** P1 and my R1 counted the docs that have a hit. The census `<N>` counts the docs whose census line differs (README "Census" form). `formatCensus` prints each doc's line as `<doc>\t<candidates>:<failing>:<optedOut>`. So if the new half's reads join those counts, the line changes in every doc where the half reads anything. That is **21 docs**: 10 carry a hyphenated tag in scope, and 12 carry a css custom-property declaration, with one doc in both. The draft does not say whether the per-doc line counts the new half's reads, so `<N>` is undefined as written (R3).

---

**R1: § 5, the census line's `<N>`.**

Before:
> <N> docs change, PROJECTED: 3, from Stacy's heuristic replay ([STACY R1] § 2; [THURGOOD R2] item 4 asks about a fourth) (delta: § Census appendix)

After:
> <N> docs change, PROJECTED: 21, the docs carrying a hyphenated tag in scope (10) or a css custom-property declaration (12) that the new half reads, with one doc in both; 4 of them have a hit (Stacy's heuristic replay, [STACY R2]) (delta: § Census appendix)

**R2: § 5, P1's PROJECTED hits sentence.**

Before:
> PROJECTED hits (Stacy's heuristic replay at `5386f93ba`, [STACY R1] § 2): tag 2, attribute 1, value 0, css-self-reference 2, in 3 docs; 10 of 34 elements not read.

After:
> PROJECTED hits (Stacy's heuristic replay at `5386f93ba`, as corrected at [STACY R2]): tag 3, attribute 1, value 0, css-self-reference 2, in 4 docs; 10 of 34 elements not read. One tag hit, `<test-file-path>` at `.kiro/steering/start-up-tasks.md` L98, is a placeholder in an untagged, indented fence, so it is a false fire of A-1's untagged scope. The R1 replay missed it because it did not read indented fences.

**R3: § 2 item 2, a bullet after the `--census` version bullet, so that `<N>` has a meaning.**

Before: (no bullet)

After:
> - The per-doc `--census` line (`<doc>\t<candidates>:<failing>:<optedOut>`) counts the new half's reads in its three numbers. That is: tags, attributes, values and css declarations read; their hits; and their opted-out reads.

*(If Thurgood prefers the other definition, where the per-doc line stays token-name only and the new half shows only in the last line, then R1's 21 becomes the 4 docs with a hit. Either definition is decidable. The ballot must state one of them.)*

**R4: § 4 "What survives", item 1, the first sentence's numbers.**

Before:
> Stacy's replay ([STACY R1] § 2) projects about 5 adoption hits in 3 docs.

After:
> Stacy's replay ([STACY R1] § 2, corrected at [STACY R2]) projects 6 adoption hits in 4 docs, one of them a false fire: `<test-file-path>`, a placeholder in an untagged fence.

My R1 entry, spliced in § 6, stays as written. This R2 records the correction.

**The ARMING lines**: I stand behind them as they are written. My four reads fire at the build PR's merge, and the governance-examples read fires at 16.3.0's RELEASE phase 1. My ARMING read compares the build PR's per-half hits with R2's projection.

**Standards implications**: none.

#### [THURGOOD R3] — incorporation

1. **[STACY R2] R1–R4: applied as written.** R1 and R2 are in § 5's census line, R3 in § 2 item 2, and R4 in § 4 "What survives", item 1.
2. **R3's fork: I take her stated definition.** The per-doc line counts the new half's reads. So `<N>` projects 21 docs, not 4.
   - **Why**: the per-doc line is what a doc's owner reads. Leaving the half out of it would hide a doc's attribute and tag failures behind the last line.
   - It also keeps the per-doc line and the report line (item 2) counting the same reads.
   - **The cost**: the census digest moves in 21 docs at the build PR, which is a larger delta to read than 4.
   - The other definition is open to Peter at the ruling.
3. **The false fire.** `<test-file-path>` goes on the pending list at the build PR, homed in a record, as A-7 and item 4 provide. Clearing it is the owner's choice, made in that record and not here:
   - an `<!-- example: generic -->` marker on the fence;
   - or a rewording of the placeholder in `start-up-tasks.md`, which is Peter-merged.

#### [STACY R3] — `c782e68e6`

R1–R4 are applied as I wrote them. The stale strings appear only in my spliced quotes. One pair remains: `[THURGOOD R3]` item 2 leaves "the other definition … open to Peter at the ruling", but § 4 still reads "**Forks**: none surfaced". A choice left to Peter has to appear where the ruling reads it.

**§ 4, the Forks line.**

Before:
> **Forks**: none surfaced. Inline code spans are out of scope in this version (A-1); that is Lina's call in her text, not a fork.

After:
> **Forks**: one. **F-1, what the per-doc `--census` line counts.** (a) Recommended: the new half's reads, so `<N>` projects 21 docs (§ 2 item 2; [THURGOOD R3] item 2). (b) Token-name reads only, with the new half shown in the last line, so `<N>` projects the 4 docs with a hit. *Counter to (a)*: the census delta to read at the build PR is 21 docs, not 4. Inline code spans are out of scope in this version (A-1); that is Lina's call in her text, not a fork.

With that applied: CONFIRM.

#### [THURGOOD R4] — incorporation

[STACY R3]'s Forks pair is applied. Her (a) and (b) are kept, as is her counter to (a). At the coordinator's direction, F-1 adds three things for Peter's ruling:
- the cost of each option;
- the counter-argument that survives against (b);
- the § 2 item 2 bullet as it reads under (b).

**Confirmations**:
- Lina at `c782e68e6`: her A-block is byte-identical; this commit leaves it untouched.
- Stacy: CONFIRM, with this pair applied.

---

## Census appendix

`npx tsx scripts/governance-examples/check.ts --census` at `5386f93ba`, after `npm run build`: the last line reads `selected: 1968 (1949 token-name candidates, 4 declared paths, 1 token-file shapes, 14 import lines) over 91 docs; predicate v1, file-shape rule v1`, and the digest is `c13c9780…bfd`. There is no scratch diff, so no delta, at draft.
