# Ballot Measure: the A-5 erratum — CSS self-reference gains its token boundary (attribute and value predicate, version 2), an amendment of ballots `2026-10-26-governance-examples-guard` and `2026-11-08-governance-examples-guard-attribute-predicate`

**Date**: 2026-11-27 (drafted)
**Drafted by**: Lina, the author and owner of the attribute and value predicate (A-1 to A-7; the attribute-predicate ballot § 2 item 1, "Lina's text, byte-exact"). Thurgood owns the instrument, `scripts/governance-examples/`, and executes the application. Brief: the orchestrator, 2026-11-27, relaying Peter (2026-11-27): "Yes, brief Lina now, please".
**Authority to draft**: Peter, 2026-11-12T13:29:02Z, "As recommended", on row 6 of the 16.3.0 rule-11 batch: "`2026-11-09-examples-guard-a5-token-boundary` | Lina (predicate), Thurgood (instrument) | **fix-now**, via an A-5 erratum ballot that Peter ratifies. If it is not ratified by 16.4.0's S, the record lapses and fix-now is gone". Record: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md`. The obligation: `.kiro/issues/2026-11-09-examples-guard-a5-token-boundary.md`, § "Disposition (2026-11-12)", Trigger `release:16.4.0:phase-1`.
**Status**: **DRAFT**. This ballot has one item, **item 1** (§ 2), and one fork, **F-1** (§ 5). Peter's ratifying words name both, for example: *"Ratified, item 1 (A-5 v2), F-1 (a)"*. At ratification the record-first Status commit replaces this line with `**RATIFIED (Peter, <time, ISO 8601 UTC>)**, item 1, F-1 <answer>: "<his words, verbatim>". Record: <path>.`
**Required reviewer**: **Stacy**. The guard is an armed barrier (register row `governance-examples`, `check_state: armed`); `scripts/governance-examples/**` is in her ARMING instrument-path limb, so her ARMING read fires at the application PR's merge; and she is the census reader.
**Consulted**: Thurgood — **owed before Peter**: the instrument's owner, consulted on the census, the scratch diff as the code he would ship, the test's comparands (F-1) and the application's sites; the orchestrator dispatches the consult; in consult-163 R2 (2026-11-12) he accepted "the application PR in my instrument, with Lina on the `**Agent**:` line for the `pending.json` entries"; Ada — none needed: no edit to her docs or her predicate; `governance/Token-Family-Shadow.md` L380 and L388 stop failing and are not edited; Stacy — required reviewer (above); in consult-163 R2 she agreed the row-6 route.
**Class**: LAW. It changes a rule of an armed barrier's predicate, which is a version bump of the guard (the attribute-predicate ballot's Class line: "a version bump of the guard (the guard ballot § 8.1's header: 'a version bump is any change to … a resolution rule')"). It narrows A-5 only: every hit under v2 is a hit under v1, so it adds no failure.
**Retroactivity**: none. No merged doc turns red. Two parked pending entries go stale and are deleted in the application PR (§ 3).

> **Conflict of interest, stated first.** I wrote A-5 v1, and its substring reading is the defect this ballot fixes. I also own the record that the fix closes. The checks on me are Thurgood's consult on the instrument, Stacy's review and census read, and Peter's ratification.

---

## 1. The gap

A-5 v1 fails a `--name` declaration when its value "contains `var(--name`" for the same name. The build applies that as a substring test, as written (`check.ts`, module-header readings: "A-5: 'contains `var(--name`' is applied as a substring test, as written. A longer name that begins with the declared one fires too"). So a declaration that references a **longer** property fires:

- `governance/Token-Family-Shadow.md` L380: `--shadow-container: var(--shadow-container-offset-x) …`
- `governance/Token-Family-Shadow.md` L388: `--shadow-fab: var(--shadow-fab-offset-x) …`

Both are correct examples. Both ship parked in `pending.json`, each noted "false fire, A-5 v2" (Peter, 2026-11-09T02:16:20Z, ride-along 2). At `3a3bd072b` they are the guard's only `css-self-reference` hits: the report line reads `2 css self-references`, and both are false. A guard that fires on a correct example asks the doc's owner to fix a non-defect; the parked entries also count in P, which the RELEASE pass reads as failing strings (guard ballot § 8.3: "the P strings fail and are not read as passing").

## 2. The measure

### Item 1 — A-5 version 2 (Lina's text, byte-exact), and the predicate's version 1 → 2

**The A-5 line, before** (v1, at `3a3bd072b`, in `scripts/governance-examples/attribute-predicate.md` L9, the guard ballot § 8.11 and the attribute-predicate ballot § 2 item 1):

````
- **A-5: CSS self-reference.** In fenced blocks tagged `css`, a declaration whose property is a custom property (`--name`) fails when its value contains `var(--name` for the same name: the declaration redeclares a token as itself (RL-31 (i)).
````

**After** (v2):

````
- **A-5: CSS self-reference.** In fenced blocks tagged `css`, a declaration whose property is a custom property (`--name`) fails when its value contains `var(--name` for the same name and the character after it does not continue a custom-property name (it is not `A`–`Z`, `a`–`z`, `0`–`9`, `-` or `_`; the end of the value also ends the name): the declaration redeclares a token as itself (RL-31 (i)). `--a: var(--a)` and `--a: var(--a, 1px)` fail; `--a: var(--a-offset)` passes, because it names a longer property.
````

**Why this boundary.** The name characters are the class the declaration reader already uses to read `--name` (`cssDeclarations`, `--[A-Za-z0-9_-]+`), so the property read and the boundary read agree on where a name ends. The test is "not a name character", not "is `,`, `)` or whitespace" (my record's first wording): it also ends the name at the end of the value and before a comment, and it lists no terminator that could be missed. A value with two references (`var(--a-x) var(--a)`) fails on the second.

The block (from `scripts/governance-examples/attribute-predicate.md` at `3a3bd072b`, byte-exact except the A-5 line above; version 2, the block the application carries in that file and in the guard ballot § 8.11):

````
- **A-1: scope.** Fenced blocks tagged `html`, or not tagged, and the JSX of blocks tagged `tsx` or `jsx`. Only elements whose tag name contains a hyphen are read. Inline code spans are out of scope in this version.
- **A-2: the registered tags.** A tag is DesignerPunk's when a `customElements.define('<tag>', …)` call with a string-literal tag appears in `src/components/**/platforms/web/*.web.ts`. A hyphenated tag in scope that no such call registers fails (a misspelled or retired tag, e.g. `<input-text>`). `<!-- example: consumer -->` skips **only** this check: a consumer's own elements are not DesignerPunk's. A-3 to A-5 still run for every registered tag in the block.
- **A-3: attributes.** Each attribute on a registered tag must be one of:
  (a) a string in that element's `observedAttributes` array literal;
  (b) the argument of a `getAttribute`, `hasAttribute` or `toggleAttribute` call with a string literal, in the same `*.web.ts` file;
  (c) a global HTML attribute: `id`, `class`, `style`, `slot`, `part`, `hidden`, `title`, `lang`, `dir`, `tabindex`, `role`, `inert`, any `aria-*`, any `data-*`, or any `on[a-z]+` event-handler content attribute.
  An attribute that matches none fails. The check compares the hyphenated attribute names, never the schema's camelCase prop names: `borderRadius` is Container-Base's prop, and as an attribute it fails, because the element observes `border-radius`.
- **A-4: enumerated values.** For an attribute that passes A-3 (a) or (b), find the element's schema prop: the prop whose name equals the attribute with hyphens removed, compared case-insensitively (`test-id` → `testID`). If that prop's `type` is a union of quoted string literals (`"'primary' | 'secondary' | 'tertiary'"`) or the prop carries `validation.enum`, the attribute's value must be one of them (`variant="danger"` fails). Boolean props, values containing `${` or `{{`, and attributes with no schema prop are not value-checked.
- **A-5: CSS self-reference.** In fenced blocks tagged `css`, a declaration whose property is a custom property (`--name`) fails when its value contains `var(--name` for the same name and the character after it does not continue a custom-property name (it is not `A`–`Z`, `a`–`z`, `0`–`9`, `-` or `_`; the end of the value also ends the name): the declaration redeclares a token as itself (RL-31 (i)). `--a: var(--a)` and `--a: var(--a, 1px)` fail; `--a: var(--a-offset)` passes, because it names a longer property.
- **A-6: the check reads syntax and does not render or run anything.** HTML is read by a tolerant tokenizer, with no DOM. The element sources are read by `ts.createSourceFile`, with no program and no `dist/`. An `observedAttributes` that is not an array literal (a spread, a computed list) is reported as **not read** for that element, counted in the report line, never as a pass. **A twin-agreement test** pins the syntax read to the running elements: for every registered tag whose `observedAttributes` is an array literal, the syntactic list equals the built class's runtime `observedAttributes` (jsdom, after `define`), and the test fails on any difference. For a not-read element, A-3 runs with (a) empty. The report line prints the count, e.g. `not read: 10 of 34`.
- **A-7: markers and keys.** `<!-- example: generic -->` skips the block entirely. Key: doc, half (`tag`, `attribute`, `value` or `css-self-reference`), the failing string, and its occurrence index in the doc. The line number is informational only. Hits found at adoption go on the pending list, each homed in a record, as § 2.4 does for the existing halves.
````

**Limits, stated** (one sentence added to the § 8.11 limits paragraph, re-signed): "A-5 reads `var(` followed directly by the name, so `var( --a )`, which CSS allows, is not read; there is none in scope at `3a3bd072b`. *Signed: Lina, <application date>.*"

**The version.** The attribute and value predicate goes from version 1 to **version 2**: `ATTRIBUTE_PREDICATE_VERSION = 2`, and `--census`'s last line reads `…; predicate v1, file-shape rule v1, attribute predicate v2`. Ada's token-name predicate and the file-shape rule stay at version 1.

**What does not change**: A-1 to A-4, A-6 and A-7; the header grammar; the report-line grammar; the pending header (A-5 v2 adds no entry, so clause 4 of the adoption ballot is not engaged); RL-31 (i)'s true case (`--a: var(--a)` still fails).

## 3. Edit sites and application (after the Status commit)

1. **The Status commit** (record-first): Peter's words naming item 1 and F-1, the ruling record, and the ballots README roll entry, on this ballot's branch.
2. **The application PR**, Thurgood's, in his standing scope (`scripts/governance-examples/**`), Peter-merged (it edits `governance/classification-map.md`). Sites, under F-1 (a):
   - **2a. `scripts/governance-examples/attribute-predicate.md`**: L9 becomes the v2 A-5 line. The file equals the v2 block byte for byte.
   - **2b. `scripts/governance-examples/check.ts`**: `isSelfReference` applies the boundary (the census appendix's scratch diff is the reference implementation; Thurgood ships his own, and the shipped code's `--census` digest must equal the proposed digest below, README "Re-runs"); `ATTRIBUTE_PREDICATE_VERSION = 2`; the module header's § 8.11 heading line reads "version 2"; the A-5 entry of "Readings for § 8.11" is deleted, since the text now states the boundary; the opening paragraph's "the attribute and value half are Lina's (version 1 each)" gives the attribute half's version as 2.
   - **2c. `scripts/governance-examples/__tests__/governance-examples.test.ts`**: the version expectation reads 2; the A-5 fixture's third expectation (`--x: var(--x-offset)`) flips to `[]`, and its comment goes; added cases: `--a: var(--a, 1px)` red, a value ending `var(--a` red, `var(--a-x) var(--a)` red, `--shadow-container: var(--shadow-container-offset-x)` green; the § 8.11 comparand moves from the attribute-predicate ballot to this ballot (F-1 (a)). The PR body names this file and this ballot, its Status RATIFIED at the merge (Stacy's ARMING deletion read, adoption ballot site 1b).
   - **2d. `.kiro/docs/ballots/2026-10-26-governance-examples-guard.md`**: § 8.11's heading reads "version 2", its A-5 line becomes v2, its limits paragraph gains the § 2 sentence, and one pointer follows the heading: `*(amended <date> by ballot 2026-11-27-governance-examples-guard-a5-token-boundary-erratum item 1; prior text at <SHA>)*`. § 2.7's heading and sentence read "version 2", with the same pointer.
   - **2e. `.kiro/docs/ballots/2026-11-08-governance-examples-guard-attribute-predicate.md`**: its block is the ratified v1 record and is **not** edited. One dated line follows it: `*A-5 superseded (<date>): ballot 2026-11-27-governance-examples-guard-a5-token-boundary-erratum item 1 (A-5 v2). The current block is the guard ballot § 8.11.*`
   - **2f. `governance/classification-map.md`, row `governance-examples`** (EXECUTION of this item): the `rule:` line's "(Lina's predicate v1)" reads "(Lina's predicate v2)"; the comment's "attribute and value Lina's (v1)" reads "(v2)"; the LAW HOME gains "ballot 2026-11-27-governance-examples-guard-a5-token-boundary-erratum (A-5 v2)"; one history line: `{ date: <application date>, change: "A-5 gains its token boundary: the attribute and value predicate v1 → v2 (ballot 2026-11-27-governance-examples-guard-a5-token-boundary-erratum, RATIFIED <ruling>); the two Token-Family-Shadow css-self-reference false fires leave pending.json; check_state unchanged (armed)", by: thurgood }`.
   - **2g. `scripts/governance-examples/pending.json`**: the two Shadow entries (`--shadow-container` and `--shadow-fab`, `css-self-reference`, occurrence 0) are deleted. They go stale under v2, and a stale entry fails the required check. Their home, `.kiro/issues/2026-11-09-examples-guard-attribute-half-adoption-hits.md`, has an `**Owners**:` field that parses to Lina under adoption § 2 clause 2(a), so the PR's **`**Agent**:` line names Lina** beside Thurgood, and Lina makes this commit. The header is unchanged (clause 4).
   - **2h. Records** (Lina's commits): the a5 record's rule-5 outcome line naming the PR, and its archive move; the adoption-hits record's two Shadow rows get a dated line, "left `pending.json` in #<N> (A-5 v2)". That record stays open for its `start-up-tasks.md` row.
3. **Checks**: `npm run test:scripts` (each new case red at v1, green at v2); `npm test`; `check-section-citations`; `check:122:diff-guard` (the lock moves: `governance/` is a closure root); the census re-run at the PR's base (§ 6), whose delta must equal this ballot's; the straggler sweep line for `check.ts` (README "Straggler sweep on an instrument PR").
4. **ARMING** at the application PR's merge: Stacy's reads of the armed barrier (code change, test deletion read, `pending.json` read).
5. **Deadline.** The a5 record's Trigger is `release:16.4.0:phase-1`, and the event that closes it is the **merge** of the application PR, not ratification. Ratification by 16.4.0's S is necessary and not sufficient: if the application PR has not merged by S, the record lapses and returns without fix-now (rule 11). The record re-tokens to `merge:#<N>` when the PR opens.

## 4. Recommendation, counter-argument (fold-back applied), residual

**I recommend item 1, with F-1 (a).**

**The counter-argument.** This is a ballot, a version bump, a census and an ARMING read to clear two false fires that are already parked, cost nothing at the walk and are labelled as false. Parking was the cheap and honest answer, and a version bump on a lexical guard is one more place the guard and the docs can disagree.

**What fold-back changed.**
- **The boundary is negative**, "not a name character", rather than my record's "followed by `,`, `)` or whitespace", which missed the end of the value and a comment.
- **The class matches the declaration reader**, so the guard's two reads of a name cannot disagree.
- **It narrows only.** The census confirms it: 1 doc changes, the 2 false fires leave, and no hit is added (§ 6). So the header and clause 4 are untouched, and item 1 is separable from the header-restore ballot (`2026-11-27-governance-examples-pending-header-restore`), which applies alone.
- **The leading-whitespace case** (`var( --a )`) is stated as a limit, not added. Adding it would widen A-5, and there is no instance in scope.

**What survives.**
1. **Parked false fires are cheap, but they are not free.** They count in P, and P is read as failing strings (§ 8.3). They teach that a guard's red can be a label, and RL-62 shows the ARMING read that watches the list can run late. That is why I prefer the fix to the park. The cost of the fix is real.
2. **Leading whitespace remains a false miss**, in the unsafe direction, until a later version reads it.
3. **The deadline is tight.** Ratification and the application merge both have to land before 16.4.0's S, and the application waits on Thurgood's capacity.

**Class option**: none beyond this ballot. The class is "a predicate reads a name without its boundary". A-5 is the attribute half's only rule that matches a name by containment: A-2 and A-3 compare whole tag and attribute names, and A-4 compares whole values. Ada's token-name pattern already has both boundaries (`(?<!…)` and `(?!…)`). *Unverified beyond this reading of the five texts*; Thurgood's consult can confirm it from the code.

## 5. Forks for Peter

**F-1, where the current A-block lives, and what the guard's test compares it with.** At `3a3bd072b` the test (`governance-examples.test.ts` L137) asserts that the sibling file equals **both** the attribute-predicate ballot's block and the guard ballot § 8.11. Both ballots carry v1.

- **(a) Recommended: the guard ballot § 8.11 carries the current text.** § 8.11 is rewritten to v2 with a dated pointer and its prior SHA (site 2d). The attribute-predicate ballot's block stays v1 as its ratified record, with one superseded line (site 2e). The test compares the sibling file with § 8.11 and with this ballot's v2 block, replacing the attribute-predicate ballot as the second comparand (site 2c). *Cost*: a ratified ballot's resolved text is rewritten in place, and a test assertion is changed, which Stacy's deletion read must clear. *Precedent*: the attribute-predicate ballot amended the guard ballot in place (its site 1a), and the register row names the guard ballot § 8 as the LAW HOME. *Counter that survives*: a reader of the guard ballot who quotes § 8.11 from an old checkout gets v1 with no warning there; the pointer only helps a reader at the new text.
- **(b) The ballots stay as ratified; this ballot is the home of the current block.** Neither earlier block is edited. The register row's LAW HOME names this ballot for § 8.11's current text, and the test compares the sibling file with this ballot's block only. *Cost*: the guard ballot § 8.11, which the register still names, reads v1 with no pointer to v2, so the law home holds stale text. *Counter that survives*: two places then claim to be § 8.11's text, and the test checks only one.

## 6. Census

The edit sites include a file the guard's command loads (`check.ts`), a law the instrument's code cites (the guard ballot § 8.11), and an instrument code change to follow. The item is presumptively in scope under all three conditions.

- `**Census**: npx tsx scripts/governance-examples/check.ts --census over governance/*.md and the eight packaged steering docs @ 3a3bd072b — current 9392dc71b6159512887e53913266bbc5331243f8fd18791922794b127aace7ad → proposed 0e3af16393b51c38e26e914b3962f312aebd1cbcc1dd0b5c66583f7b873373a7; 1 docs change (delta: § Census appendix)`. The one doc is `governance/Token-Family-Shadow.md`, `180:2:1` → `180:0:1`: its two failing reads leave, and its opted-out count is unchanged. The selected count line also changes, `attribute predicate v1` → `v2`. Under the scratch diff, the report line's `2 css self-references` becomes `0`, and the guard reports exactly two `FAIL (stale pending entry: remove it)` lines, for Shadow L380 and L388, which site 2g deletes. Run in a throwaway detached worktree at `3a3bd072b`, after `npm run build` (the import surface reads the built types); nothing was committed there.
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/classification-map.md is an ordinary closure input; no rule, pattern or grammar of the diff guard changes; the lock is refreshed at the application PR, where its verdict is read`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds, renames or removes a get_section or get_document_* citation`
- `**Census**: not in scope — audience-banner guard (scripts/audience-banner/predicate.ts, SCAN_SCOPE governance/*.md) — governance/classification-map.md keeps its banner; the edit adds no governed doc and removes no banner`

## 7. Review round record

*(Reviews are entered here in the Spec-Feedback-Protocol stamp format.)*

#### [THURGOOD R1] — the instrument owner's consult, on the draft at `dc6a6dea5` (2026-11-27)

**How I read it.** I worked in detached scratch worktrees at `3a3bd072b` (the base), `dc6a6dea5` (this ballot) and `6116418d4` (the header ballot). In the base worktree I ran `npm ci` and `npm run build`, then the census. I applied each scratch diff with `git apply`, reverted each one, and committed nothing.

**The digests reproduce.** At `3a3bd072b` the current `--census` is `9392dc71b6159512887e53913266bbc5331243f8fd18791922794b127aace7ad`. Under the appendix's scratch diff it is `0e3af16393b51c38e26e914b3962f312aebd1cbcc1dd0b5c66583f7b873373a7`. The `diff` is the appendix's two hunks exactly. The report line is the appendix's line byte for byte, and the two `FAIL (stale pending entry: remove it)` lines are the appendix's two lines. With site 2g simulated as well (the two Shadow entries deleted, no other byte of `pending.json` moved), the guard exits 0 with `1 pending`. In that state, `governance-examples.test.ts` fails 2 of 55: the version constant and A-5's third expectation, which are exactly the two edits site 2c names. Under the header ballot's scratch diff the digest stays `9392dc71…aace7ad` and the test passes 55 of 55, as that ballot states.

1. **The scratch diff as shipped code: agree, and I ship it verbatim.** The `indexOf` loop builds no regex from the property, so it has no escaping hazard. Only the `isSelfReference` docstring is rewritten. Because the shipped code is the scratch code, README "Re-runs" equality at the PR's base holds by construction. I still run both and print both digests in the PR body. If the base has moved past `3a3bd072b`, inputs changed since then are listed, as the rule requires. I probed the edges against the v2 text:
   - red: `var(--a/*c*/)`, `--a:var(--a)`, a value ending `var(--a`, and `var(--a-x) var(--a)`;
   - green: `var(--a_b)`, `--a-b: var(--a)`, `var(--A)` (case-sensitive, as CSS is) and `var( --a )` (your stated limit).

   Each result matches the v2 text → § 2 item 1; § Census appendix

2. **F-1: (a) is workable, and I prefer it.** `fromBallot` takes the first line beginning `The block (from` and the next four-backtick fence after it. In this ballot those are L43 and L45. Nothing before L43 begins that way, and § 7's entries, mine included, come after it. `block('8.11')` keys on `### 8.11 `, so a reworded heading and a second pointer line are both safe.
   - **The law home.** Yes, the guard ballot § 8 is the right home to rewrite in place. It is my ballot, and as its drafter I consent. The register row names it as the LAW HOME, and § 8.11 itself was added in place by the attribute-predicate ballot (its site 1a).
   - **A third form, considered and rejected.** Form (c) would compare the sibling file with § 8.11 only. I rejected it because the ratified-ballot comparand is what makes an unballoted edit to § 8.11 and the sibling file together fail the required check.
   - **The counter that survives (a), mine.** The second comparand now follows the newest amending ballot, so every later version bump moves it. That costs one constant per bump.
   - **Optional, in the same hunk.** § 8.11's heading still says "module header", which has been stale since the site-1b erratum. "version 2" could carry `scripts/governance-examples/attribute-predicate.md` in its place.

   → § 5 F-1; § 3 sites 2c–2e

3. **Version bump: agree, on two grounds.** It changes a resolution rule (by § 8.1's definition, borrowed as the attribute-predicate ballot's Class line borrowed it). And the census last line is the only machine-visible mark that separates v1 runs from v2 runs for Stacy's RELEASE read. It only narrows, so adoption § 2 clause 4 is not engaged → § 2 "The version"

4. **The site list is complete except for six lines in my instrument.** All six are comment-only, so they are out of the census and inside the straggler sweep.
   - (a) the `ATTRIBUTE_PREDICATE_VERSION` JSDoc (`check.ts` L179, "version 1 (§ 8.11)");
   - (b) the module header's opening attribution (L2–L5, "as amended by ballot …attribute-predicate"), which gains this ballot;
   - (c) the module header's § 8.11 pointer lines (L125–L128, "The test compares that file with the ballot's block"), which name the two comparands under (a);
   - (d) the `isSelfReference` docstring (L1126–L1128). Site 2b should name it, because today it states the substring reading;
   - (e) the test's `@purpose` item 8 (L20–L22), which gains this ballot;
   - (f) the test's `ATTRIBUTE_BALLOT` constant and the L137 test title, which move with the comparand.

   What needs no edit:
   - **Fixtures**: none. The A-5 cases are inline, and no `__fixtures__/` file reads css.
   - **The twin test**: it does not read A-5.
   - **`.github/in-lane-guards.json`**: its record string names no version, and P1b lets me add entries only.
   - **Archived records, the #838 ARMING-reads file and the row's 2026-11-09 history line**: all historical.
   - **Other surfaces**: nothing else prints or cites the attribute predicate's version (`git grep` at `3a3bd072b`).

   One addition I will make in the same PR: the § 8.6 fix of item 8, carried as its own EXECUTION hunk → § 3 site 2b

5. **The `**Agent**:` line and Stacy's reads: agree, both reads are met.**
   - **Site 1c (the `pending.json` read).** The header is unchanged, and no entry is added or re-keyed. Each deleted entry's home is a record whose `**Owners**:` field, cut at the first `(`, parses to `Lina`, and Lina is on the `**Agent**:` line. This ballot also admits the deletions by class, so the read has a second route.
   - **Site 1b (the deletion read).** The PR body names the test file and this ballot, RATIFIED at `<m>`. That one line covers every deleted line in the test: the flipped A-5 expectation, the version constant, and the comparand move.
   - **Ada.** The record's row cells read "Lina (A-5); Ada (doc)". She is not an owner under 2(a), and her doc is not edited. I will send her a heads-up, not owe her a consult → § 3 sites 2c, 2g

6. **Order: two application PRs, not one.**
   - **Why.** The decisive reason in consult-163 R3 was that the header restore should not wait on A-5's census and version bump. One PR would bring that coupling back. The two PRs touch different lines of `pending.json` (L2 and the last two entries), so either can merge first and the other rebases cleanly. Each still reads cleanly under site 1c: the header PR changes only the header, and this PR leaves it alone.
   - **A wording point in the header ballot (Lina's text).** § 3 site 2 says "nothing else in `pending.json`" and in the same bullet list provides for a combined PR. If you keep the combined option, the first phrase should read "nothing else from this item".
   - **The header-pin class option.** I carry it in the header PR, not in this one. It is one assertion and one message string, and it changes no rule → header ballot § 3

7. **Deadline and capacity: my part fits.** The code, tests and doc sites take one session. I will build the application branch while ratification is pending and open the PR the day the Status commit merges. I found no date on record for 16.4.0's S, so "fits" is conditional. The binding constraints are elsewhere:
   - Peter's ratification sitting.
   - The lock queue. This PR refreshes `canonical/generated.lock`, because `governance/` is a closure root. B2's application and the records-home application refresh it too, and they merge one at a time.
   - My other fix-now work due by the same S: #460's application and the records-home application.

   Stacy's ARMING read comes after the merge and does not gate it → § 3 item 5

8. **§ 8.6: a slip, and it is mine.**
   - **Why it is mine.** I drafted the attribute-predicate ballot and built #838. Its item 2 is headed "(§ 8.6)" and gives both after-texts, but its site 1a never listed § 8.6.
   - **It is not deliberately v1.** `check.ts` cites § 8.6 as the law for the header and the report line (L214, L1444, L1550) and implements the after-texts.
   - **A second stale copy.** § 2.4 L87 restates the four-kind header too.
   - **The fix.** It is EXECUTION of attribute-predicate item 2. It needs no ballot and no ruling. I carry it in this application PR as its own hunk, with its own dated pointer citing item 2. If this PR misses S, the fix goes alone, because it does not depend on A-5.
   - **The record.** I file a record for it (owner Thurgood, `release:next:phase-1`) in my next commit, so the obligation does not live only in a PR body.

   This ballot needs no edit for it. If you want the scope pre-declared for Stacy, one line in § 3 noting the extra hunk would do it → § 3 site 2d

9. **Class option check: the code agrees with you.**
   - **The attribute half.** A-2 is a `Map` lookup on the whole tag. A-3 is an array `includes`, a `Set` lookup, or the anchored `GLOBAL_ATTRIBUTE_RE`. A-4 is a `Map` lookup on the de-hyphenated, lowercased name and an array `includes` on the whole value. The `${`/`{{` test is containment, but the text says "values containing", and it is not a name match.
   - **The rest of the guard.** The candidate pattern has both boundaries. L-3's suffix is bounded by `/`, and rule 4's namespace by `.`. Rule 1's glob is an unbounded prefix by its stated meaning.
   - **So** A-5 v1 is the only unbounded name match that no text declares → § 4 "Class option"

**On the two points that may reach Peter.**
- **(i) Not a fork, in my reading.** Rule 11 defines fix-now as "a git-visible trigger no later than the next release's S". So the close, which is the application merge, is due by S. Row 6's "if it is not ratified by 16.4.0's S" states a consequence and does not relax the rule. Your § 3 item 5 is right, and Peter should be told: a notification, not a question.
  - **The gap I see is in item 5's last sentence.** Re-tokening to `merge:#<N>` when the PR opens counts as a re-rule. After it, nothing fires at S, so the S deadline becomes prose only. I recommend keeping `release:16.4.0:phase-1` until this PR closes the record in its own diff. That is your call as owner (rule 1). The same pattern sits in my two fix-now records (b-ci and records-home), and I will re-rule those the same way.
  - **Class option.** One sentence in rule 11: "a fix-now record keeps its release token until its fixing PR closes it". It is my ballot in the issues README, LAW. Cost: one short ballot and the re-rules of the open fix-now records. My B2 draft (`2026-11-27-rule-11-lapse-window-b2`) does not close this gap: a re-token inside B2's window is still a re-rule. The sentence could ride B2, at the price of widening a ballot that has its own deadline. Surviving counter: a `merge:#<N>` token fires at the merge itself, so a fixing PR that merges without closing its record is seen at once. Under the release token it is seen only at S.
- **(ii) Not a fork.** It is my EXECUTION slip, and the fix is set out in item 8. Peter merges the PR because it is a ballots path, and he rules nothing.

**Forks for Peter.** F-1 only. My view is (a), with your surviving counter and mine (item 2). No other fork.

*Signed: Thurgood, 2026-11-27.*

---

## Census appendix

**Base**: `origin/main` `3a3bd072b2bef97bd1fbb80d8389cb81ff7788b0`, after `npm run build`.

**Scratch diff** (applies with `git apply` at the base; touches only the instrument's code; the reference implementation, not the shipped code):

```diff
diff --git a/scripts/governance-examples/check.ts b/scripts/governance-examples/check.ts
index f46a26201..647aea16a 100644
--- a/scripts/governance-examples/check.ts
+++ b/scripts/governance-examples/check.ts
@@ -177,7 +177,7 @@ export const PREDICATE_VERSION = 1;
 /** Lina's file-shape rule (L-1, L-2, L-3) and the import surface (F-2 (c)), version 1 (§ 8.4). */
 export const FILE_SHAPE_RULE_VERSION = 1;
 /** Lina's attribute and value predicate (A-1 to A-7), version 1 (§ 8.11). */
-export const ATTRIBUTE_PREDICATE_VERSION = 1;
+export const ATTRIBUTE_PREDICATE_VERSION = 2;
 
 /** The one doc both halves exclude (P-2, Peter: yes). Stated once, here. */
 export const EXCLUDED_DOCS: readonly string[] = ['governance/classification-map.md'];
@@ -1127,7 +1127,11 @@ export function cssDeclarations(lines: FenceLine[]): CssDecl[] {
  * substring test, so a longer name that begins with the declared one (`var(--name-x)`) fires too.
  */
 export function isSelfReference(d: CssDecl): boolean {
-  return d.value.includes('var(' + d.property);
+  const at = 'var(' + d.property;
+  for (let i = d.value.indexOf(at); i !== -1; i = d.value.indexOf(at, i + 1)) {
+    if (!/[A-Za-z0-9_-]/.test(d.value.charAt(i + at.length))) return true;
+  }
+  return false;
 }
 
 // ============================================================================
```

**Delta** (`diff` of the current and proposed `--census` outputs):

```text
69c69
< governance/Token-Family-Shadow.md	180:2:1
---
> governance/Token-Family-Shadow.md	180:0:1
92c92
< selected: 1968 (1949 token-name candidates, 4 declared paths, 1 token-file shapes, 14 import lines) over 91 docs; predicate v1, file-shape rule v1, attribute predicate v1
---
> selected: 1968 (1949 token-name candidates, 4 declared paths, 1 token-file shapes, 14 import lines) over 91 docs; predicate v1, file-shape rule v1, attribute predicate v2
```

**The report line under the scratch diff**:

```text
1949 candidates; 1945 resolve (1832 key, 16 channel, 88 namespace, 8 dtcg-path, 1 glob); 4 file names; 4 declared paths (4 resolve); 1 token-file shapes (1 pass); 14 import lines (14 type-check); 155 tags (154 registered); 393 attributes (393 pass); 88 enumerated values (88 pass); 0 css self-references; not read: 10 of 34; 28 opted out (26 generic, 2 consumer; 26 would fail if read); 3 pending
FAIL (stale pending entry: remove it)	governance/Token-Family-Shadow.md:380	css-self-reference	--shadow-container	#0
FAIL (stale pending entry: remove it)	governance/Token-Family-Shadow.md:388	css-self-reference	--shadow-fab	#0
```
