# Ballot Measure: on web, a served prop is a JS property of the served name, or an attribute only, marked — the prop-mapping rule's property half

**Date**: 2026-10-30
**Drafted by**: Thurgood (ballots steward), who drafts the file. **Lina authors the measure** and owns both docs' substance (`lina-property-half-sites.md`). **The rule sentence is Sparky's**, verbatim (`collective-r3b-sparky.md`). Drafter's clock: 2026-10-30T17:53:01Z (`date -u`).
**Status**: **DRAFT** (R2)
**Authority**: Peter, R8 item 6, chat, relayed, received before 2026-10-30T17:23:42Z (the orchestrator's clock; the R8 message), verbatim as relayed: *"Re: 6, Ratify"*. It applies to the property-half ballot, Sparky's R3b sentence, "when filed". His word binds the text as recommended here; the Status commit records it after the R1 round. The record is `R8@<its PR squash>`, beside `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`. The collective sheet is r2.1, § E.
**Base**: `d34fc7786` (`origin/main` when this was cut). Every Before and anchor block below was cut at that SHA and checked by script (byte-exact).
**Owner**: Lina.
**Required reviewer**: **Stacy**, as census reader.
**Reviewers**: Sparky (the sentence), Leonardo (the narrowed form), Ada (the banners and predicate v2's merge order).
**Consulted**: Sparky — R1: site 1 byte for byte his; `helperText` true at the base; "property by default" false for most props at merge, so one application PR; no schema uses `type: callback`; props reached neither way are a fork for Lina; the guard test uses `prop in`; Leonardo — R1: the narrowed form as read; site 2's last sentence reworded for consumers; the guard test into the checks; Lina — R1: the 2e anchor is L8; the merge order #576, v2, this; markers and test in one PR; the tool-description sentence; Stacy — R1: a `122-sweep-1-refs` line owed, the canonical-vs-truth line corrected; test the predicate version, not ancestry; the G-4 precondition by `git cat-file -e`; site 1's `.kiro/issues/` path is unframed in a served doc; #568 owes two census lines; Ada — <pending R3>
**Class**: LAW. It adds a web rule beside L70's identical-names rule, and a schema field. Sites 1e and 2e (the banners) are EXECUTION of ballot `2026-10-13-123-b-u4-release-recipe` § "Banners", and are conditional (§ 3).
**Class option**: none in this ballot. The class, how a web element takes every served prop including callbacks, is G-4's to design (the G-4 charter). This ballot settles the property half only, as Peter's R8 item 6 and the sheet's § E scope it. The class fix for "absence means property" is Lina's guard test (§ 4, not a site).
**Amends** (one application PR, Peter-merged):
- `governance/platform-implementation-guidelines.md` (Lina's; Data's charter loads it as governance-as-law, and Kiro-Data reads the whole file through `file://`, `.kiro/agents/data.json` L29):
  - **site 1**: § "2. Property Name Consistency", two paragraphs after the rules table (L77–L78 anchor);
  - **site 1e**: a banner after the H1 (L9), conditional.
- `governance/Component-Schema-Format.md`:
  - **site 2**: a new subsection, § "Web Access (`web`)", after § "Property Types" (L169 closing fence; between L170 and L171);
  - **site 2e**: a banner after the H1 (L8), conditional.
- **Not sites**: Lina's application work in her standing scope (§ 4).

**Census** (ballots README § "Conventions", "Instrument census"), measured with sites 1, 2, 1e and 2e applied to a scratch copy at `d34fc7786`, then reverted:
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts; census mode --census) — both docs are scoped; site 2's yaml fence is a schema example, not a token-file shape, and the sites add no token-name candidate, declared path or @3fn/core import line; measured: --census byte-identical (sha256 6c5b98efdd10b5e30f6d3efecb60f220cb21aa715be8a719fe8e32b18fba4573), and the guard exits 0 with the same report line (15 declared paths, 3 token-file shapes, 69 pending)`
- `**Census**: not in scope — 122-canonical-vs-truth (governanceAsLaw mustContain over asserted sections; Data's asserts on platform-implementation-guidelines are "Android Implementation Patterns" and "3. Token Usage Consistency"; "System-First Value Selection" is an assert on product-token-governance (Stacy R1)) — site 1 is in § "2. Property Name Consistency", outside every asserted section; measured: exit 0 before and after, with every asserted section's served size unchanged (only the whole-document size moves)`
- `**Census**: not in scope — 122-sweep-1-refs (tools/agent-generator/sweeps/sweep-1-refs.ts) — it resolves every canonical route and law section by verbatim heading; seven charter routes point into these docs (platform-implementation-guidelines: Data L33 and L130, Kenya L84 and L122, Leonardo L75, Lina L159, Sparky L104; component-schema-format: Lina L49 and L175); site 2 adds one heading, Web Access (web), containing no routed heading; no heading is removed or renamed; site 1's lead is bold text, not a heading`
- `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts) — the sites add no get_section / get_document_* citation (their § references are prose); measured: PASS`
- `**Census**: not in scope — package-name-scope-drift (scripts/check-package-name-drift.js; governance/ in SCAN_DIRS) — the sites add no package name; measured: exit 0, output identical`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an input-closure root (L62–L72), so the lock's inputClosure hash moves and is refreshed at application; no CC rendering carries § "2. Property Name Consistency" or the schema doc's text (git grep of .claude/agents, .kiro/agents and canonical/_consumer-output: 0 hits), so no generated output changes`
- **No line owed**:
  - **The audience-banner guard** is in no row's `checks`. Measured:
    - under v1 with sites 1 and 2 only, "24 match; 22 carry", with both docs `[MISSING]`;
    - under v1 with 1e and 2e applied, "24 match; 24 carry", and its test passes 51/51;
    - under a v2-style strip of pointer spans, with sites 1 and 2 only, both docs drop to 22 match.
  - **`src/figma/DesignExtractor.ts`** reads platform-implementation-guidelines § "State Management Consistency" (L3045), which is untouched. It is in no row's `checks`.
  - `node scripts/validate-steering-metadata.js`: PASS.

**Cap**: two paragraphs in one doc, one subsection in the other, and two conditional banners.

**Retroactivity**: none. Existing schemas carry no `web` key, and § 4's sweep fills the markers.

> **Conflicts, stated first.** I steward the banner convention and lean to a merge order that may strike two of these sites. Lina owns the text, and Stacy and Ada read the condition.

---

## 1. The measure

- **Sparky's sentence** (collective round, R3b), verbatim: "On web, the served schema states how the element takes each non-callback prop: as a JS property of the served name, or, where none exists, as its kebab-case attribute only, marked attribute-only. The served name is never changed to match the element, and the element is not renamed. Every attribute-only prop is a listed G-4 finding."
- **The marker** is a schema field, `web: attribute-only` (site 2). Its real case is Input-Text-Base's `helperText`: `InputTextBase.web.ts` observes `helper-text` and reads it through `getAttribute`, with no `helperText` property (Sparky R3b; `types.ts` L37).
- **Not settled here**: how a served callback maps to an element event. That is G-4's, and the web patterns block's `event_handling: Custom Events` line (L673–L675) is untouched.

## 2. Edit sites (Lina's text)

### Site 1 — `governance/platform-implementation-guidelines.md` § "2. Property Name Consistency", after the rules table (LAW)

**Anchor** (L77–L78 at `d34fc7786`, verbatim). The text goes after L79 (blank), with one blank line after it, before "**Cross-Platform Property Example**" (L80):

```
| Same default values | `disabled: false` | Predictable defaults |
| Same required status | `label: required` | Consistent validation |
```

**Inserted**:

```
**Web: how an element takes a served prop.** On web, the served schema states how the element takes each non-callback prop: as a JS property of the served name, or, where none exists, as its kebab-case attribute only, marked attribute-only. The served name is never changed to match the element, and the element is not renamed. Every attribute-only prop is a listed G-4 finding. *(added <application date> by ballot 2026-10-30-web-prop-property-or-attribute-only, site 1)*

The marker is the property's `web: attribute-only` field (Component Schema Format § "Property Definitions"). The list of attribute-only props lives in the G-4 charter, `.kiro/issues/2026-10-30-g4-web-element-public-contract-charter.md` § 4. How a served callback maps to an element event is not settled here; it is G-4's to design.
```

**Why here**: L70's rule ("All platforms MUST use identical property names") is the one Sparky's second sentence keeps. Its web consequence belongs beside it.

### Site 2 — `governance/Component-Schema-Format.md` § "Property Definitions", a new subsection after § "Property Types" (LAW)

**Anchor**: § "Property Types" ends at its closing fence, L169 at `d34fc7786`. L170 is blank and L171 is `---`. The subsection and one blank line go between L170 and L171.

**Inserted**:

````
### Web Access (`web`)

A non-callback property that the web element takes **only as an attribute** carries `web: attribute-only`. Its attribute is the property name's kebab-case form (`helperText` → `helper-text`). A property with no `web` key is one the web element exposes as a JS property of the same name. A callback carries no `web` key: how a callback maps to an element event is not yet settled. *(added <application date> by ballot 2026-10-30-web-prop-property-or-attribute-only, site 2)*

```yaml
properties:
  helperText:
    type: string
    required: false
    description: Helper text displayed below the field
    web: attribute-only
```

The served name never changes to match the web element (Platform Implementation Guidelines § "2. Property Name Consistency"). A `web: attribute-only` property is a known gap: a later release may add the JS property, which does not change the attribute.
````

### Sites 1e and 2e — the audience banners (EXECUTION of ballot `2026-10-13-123-b-u4-release-recipe` § "Banners"; conditional, § 3)

**1e**: in `governance/platform-implementation-guidelines.md`, after the H1 at L9 (`# Platform Implementation Guidelines`), with one blank line. Subject "components":

```
> **Audience framing**: this describes **DesignerPunk's own components**, not yours. **Worked example**: the component names, file paths, the amendment notes and their ballot paths, the G-4 charter it points to, and the tests it names are DesignerPunk's. **Transferable**: the behavioral-contract rules, identical property names across platforms, how a web element takes a served prop, the per-platform implementation patterns, and the tolerance levels.
```

**2e**: in `governance/Component-Schema-Format.md`, after the H1 at **L8** (`# Component Schema Format Specification`; Lina's file says L9, but L9 is the blank line after it), with one blank line. Subject "components":

```
> **Audience framing**: this describes **DesignerPunk's own components**, not yours. **Worked example**: the component names in the examples, the amendment notes and their ballot paths, and the web-element contract spec it points to are DesignerPunk's. **Transferable**: the schema structure, the property, inheritance, composition and token sections, the web-access marker, and the validation rules.
```

## 3. The banner condition (merge order with Ada's predicate v2)

- **Why the banners are owed at all**: neither doc matches banner predicate v1 today (0 hits each), and the `added … by ballot …` pointers on sites 1 and 2 bring in "ballot". This is RS-51's class, the same collision #573's site B settles.
- **Ada's predicate v2** (#573, F-1 (α), ruled by the seats under DLG) stops a dated-pointer span from counting toward a match. It lands as her own PR, before #573's application.
- **The condition, decidable from git at this application's base** (Stacy R1: the version, not ancestry, because v2's SHA does not exist yet): `git show <base>:scripts/audience-banner/predicate.ts`, read `PREDICATE_VERSION`. The PR body pastes the guard's report line, which prints `predicate v<N>`.
  - **`PREDICATE_VERSION` ≥ 2**: sites 1e and 2e are **struck**. No banner is owed: under v2 the two docs' only "ballot" strings sit inside pointers (measured: both drop).
  - **`PREDICATE_VERSION` is 1** (v1 in force): sites 1e and 2e are **applied**. A later v2 changes nothing: each banner's own text contains "ballot paths", so the docs keep matching and keep carrying a banner (measured: 24/24 under both v1 and the v2-style strip).
- **My lean**: sequence this application after Ada's v2, so the banners are struck. A banner on a doc whose only repo-internal strings are its change notes is the noise (α) exists to remove. That is a lean on order, not a fork: the text is right either way.

## 4. Application (after the Status commit)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**`, with R8 item 6 quoted and its clock bound.
2. **Preconditions**:
   - `.kiro/issues/2026-10-30-g4-web-element-public-contract-charter.md`, which site 1 cites, is on `main`: `git cat-file -e <base>:<that path>`, falling back to `archive/` under the same filename (README rule 3). At this ballot's base it exists only on a branch (#576). The merge order is #576, then Ada's v2, then this (Lina R1).
   - The banner condition (§ 3) is read and stated in the PR body.
3. **Lina, the application PR** (branch `chore/apply-web-prop-property-or-attribute`), in one authoring commit:
   - sites 1 and 2;
   - 1e and 2e only if `PREDICATE_VERSION` is 1 at the base;
   - the sweep's markers and the guard test (step 5), in the same PR (R2: Sparky, Leonardo, Lina, Stacy).

   `<application date>` is the date of the application PR's merge, as its squash commit records it.
4. **Lock**: the lock's inputClosure hash moves, because `governance/` is in the closure. The refresh is Thurgood's, done by a full-run-green `check:122:diff-guard` and then read no-op-green, because `canonical/generated.lock` is outside Lina's write scope. If a generated output changes, the application stops and reports.
5. **Not sites, in Lina's standing scope (`application-mcp-server/**`, `src/components/**`), EXECUTION, in the application PR itself**:
   - **`application-mcp-server/src/models/index.ts`**: `PropertyDefinition` gains `web?: 'attribute-only'`. Properties already pass to `get_component_full` raw (`ComponentIndexer.ts` L768), so no indexer change is needed.
   - **A schema-check test** in the Application MCP's indexer tests: `web` takes only `attribute-only`, and never appears on a callback. A callback is detected by a `=>` signature in its `type` or an `on[A-Z]…` name, because no schema uses `type: callback`; only Component Schema Format L154 and L163 teach it (Sparky R1, finding 2). That doc-versus-schema gap is a record for Lina. Root `npm test` does not run this suite, so the PR runs `application-mcp-server`'s own.
   - **One sentence in `get_component_full`'s tool description** naming the `web` property field (Lina R1 (b)). It re-bases the tool-registry hash.
   - **The guard test for "absence means property"** (Lina's class fix), under `src/components/__tests__/`. It reads each schema and an upgraded instance of each web element (`document.createElement(tag)` after `define`), and asserts two things:
     - every served non-callback prop without `web` satisfies `prop in` the instance, which is React's own check, so inherited `HTMLElement` properties count (Sparky R1);
     - every `web: attribute-only` prop is in `observedAttributes`, in kebab-case.

     Callbacks are detected as above. Props that reach the element neither way are Lina's fork at R3 (Sparky finding 3). Without the test, a missing key overstates.
   - **The sweep** (`.kiro/issues/2026-10-25-web-elements-served-prop-sweep.md` § "Method"), steps 3 and 4 as Lina's file states them. Each attribute-only find is appended to the G-4 charter's § 4 list. Served callbacks are listed, not changed.
   - **The records**:
     - `.kiro/issues/2026-10-25-web-prop-mapping-rule-gap.md`: its property half closes (rule 5 line), and its Trigger is re-ruled to the G-4 charter's event for the event half, citing R8 and DLG.
     - The G-4 charter's § 5 item 3 then reads as carried.
6. **Checks**, each pasted in the PR body with its result:
   - `npm test`;
   - `npm run test:scripts` (the banner guard; the count measured at the PR's base);
   - `application-mcp-server`'s suite;
   - `npm run -s check:section-citations`;
   - `node scripts/validate-steering-metadata.js`;
   - `npx tsx scripts/governance-examples/check.ts --census` (digest equal to the census line's);
   - `npm run -s check:122:canonical-vs-truth`;
   - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: both docs read `ok`;
   - **the guard test**: its file named and its run pasted (Stacy R1: so her RELEASE pass reads that it landed).
7. **The PR body carries**:
   - `**Edit kind**: governance/platform-implementation-guidelines.md L<site 1> — LAW (.kiro/docs/ballots/2026-10-30-web-prop-property-or-attribute-only.md)`;
   - `**Edit kind**: governance/Component-Schema-Format.md L<site 2> — LAW (…)`;
   - where 1e and 2e apply, `**Edit kind**: <doc> L<banner> — EXECUTION (.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md § "Banners")`;
   - the grant;
   - the `**Consulted**:` line;
   - the census lines, re-run at its base.
8. **Owed after merge**:
   - the docs MCP's `rebuild_index` and `validate_metadata` on both docs;
   - a CHANGELOG line at the next release (both docs ship), by the release author.

**Grant (activated by this ratification)**: Peter's ratification is the line (the #568 and #573 precedent), until the application PR merges. It grants:
- **Lina**: `governance/platform-implementation-guidelines.md` and `governance/Component-Schema-Format.md` (sites 1, 2, 1e and 2e, byte for byte).
- **Thurgood**: `canonical/generated.lock`, the refresh only.

No `.github/**` path is touched.

## 5. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: ratify sites 1 and 2 as written, with 1e and 2e conditional on merge order. Sequence the application after Ada's v2.

**Counter-arguments, run against it, and what they changed**:
- **(1) "Two banners are owed, so draft them unconditionally."** They are owed only under v1. Making them conditional on a fact decidable from git avoids landing banners that (α) would make unnecessary, and keeps them ready if order goes the other way.
- **(2) "A key on every prop (`property | attribute-only`) is more explicit."** Lina leans to the marker plus a guard test. The test makes absence verified rather than assumed. That costs about half a day, against an edit to every schema's every prop.

**What survives**:
- **Absence overstates without the test** (Lina, Stacy). A schema with no `web` key reads as "has a property", which is true only where the guard test has run. The test now lands in the application PR and is named in its body. If it is dropped there, the served schema overstates from the merge on.
- **The known-defect list is long at birth** (Sparky): more than 29 entries in two components alone, each a prop a React user loses silently until G-4 adds the property.
- **The merge chain** (Lina): this application waits on #576 and Ada's v2. Near 16.3.0's S, the honest fallback is a dated re-rule of the prop-mapping record, never a weakened citation.
- **Each attribute-only find is a served known defect** (Sparky) until G-4 adds the element properties.
- **The event half is unsettled**, so a served callback's web mapping stays G-4's open question.

## 6. Review round record

Questions for R1:
- **Sparky**:
  - **Sp-1**: Is site 1's first paragraph your sentence, byte for byte?
  - **Sp-2**: Is site 2's `helperText` example, and its kebab-case rule, true of `InputTextBase.web.ts` at the base?
- **Leonardo**:
  - **Le-1**: Is the narrowed form (the property half only, with callbacks left to G-4) the one you read at the collective round?
- **Stacy** (required, census reader):
  - **S1**: The five census lines and the "no line owed" list. Is any instrument that reads `governance/Component-Schema-Format.md` missing? I found no registered check whose command loads it. Its readers are the docs MCP, `validate-steering-metadata.js`, the governance-examples guard and discovery fixtures.
  - **S2**: Is the banner condition (§ 3) decidable for your claims-pass read of the application?
- **Ada** (owner of `scripts/audience-banner/**`):
  - **A-1**: Is the condition right against your v2 as you will build it? In particular, does a banner's own "ballot paths" text keep a doc matching under v2, so that a banner landed under v1 needs no follow-up?
  - **A-2**: Do you agree with the merge-order lean: this application after your v2?
- **Lina** (author, for her own read):
  - **Li-1**: Site 2e anchors on L8, not L9. Your file's L9 is the blank line after the H1. Confirm.
  - **Li-2**: Is the G-4 charter record's merge before this application (§ 4 step 2) in your plan?

#### [SPARKY R1]
- **Sp-1: YES, byte for byte.** Checked by script: the text between the bold lead and the `*(added …)*` note on site 1 equals my R3b sentence exactly, and so does § 1's quoted measure. → ballot § 2 "Site 1"; § 1.
- **Sp-2: YES at `d34fc7786`.** `InputTextBase.web.ts` has one accessor, `get shadowRoot()` at L98. L112 observes `helper-text`, and L232 reads it with `getAttribute('helper-text')`. There is no `helperText` property, while `types.ts` L37 and schema L84 serve `helperText`. Kebab-case `helperText` gives `helper-text` as site 2 says. The React consequence is VERIFIED from React DOM 19.2 source (my collective R1): if `'helperText' in el` is false, React calls `setAttribute('helperText')`, which HTML stores as `helpertext`, so the value is silently dropped. That consequence is mine and is not in the ballot text, which is right: it belongs in G-4. → § 2 "Site 2".
- **Finding 1, which changes § 4 order: site 2's "no `web` key means a JS property" is false at merge for nearly every web prop.** At the base, Input-Text-Base serves 13 non-callback props that the element takes only as kebab-case attributes (`id`…`maxLength`). Container-Base serves 16 (every prop except `ignoresSafeArea`/`children`), with no accessors at all. My sentence made the property the default, so I own part of this. The counter "absence overstates without the test" understates it: absence overstates on most elements until the sweep lands. **Fold-in I ask for: sites 1 and 2, the sweep's markers and the "absence means property" guard test in ONE application PR**, not "or straight after it". → § 4 step 5; § 5 "What survives".
- **Finding 2: the schemas have no `type: callback`.** `git grep "type: callback"` finds 0 schemas; only CSF L154/L163 teach it. Real callbacks use signature strings (Input-Text-Base `onChange: type: "(value: string) => void"`). So the schema-check test ("never on a `type: callback` property") and the guard's "non-callback" need a predicate: a `=>` signature, or a name matching `on[A-Z]`. Otherwise the test is vacuous and the guard flags every callback. The CSF-vs-schema drift is Lina's to record. → § 4 step 5 (both tests).
- **Finding 3, a gap in my own sentence: some served props the element takes as neither a property nor an attribute.** `testID`/`className` on Input-Text-Base: the element takes neither as a property or attribute. `className` would be the host's `class`; `testID`'s web form isn't served. Container-Base's `ignoresSafeArea` is iOS-only. `children` is slot content. The guard test will go red on them. **Fork, not picked (Lina's surface):** (a) site 2 says such props are outside the marker and listed as G-4 findings; (b) a third marker value. (a) keeps my site 1 sentence unchanged and the ratified text intact. → § 2 "Site 2"; § 4 step 5.
- **Fold-in for the guard test:** assert with React's own check, `prop in` an upgraded instance (`document.createElement(tag)` after `define`), not a regex over `*.web.ts`. Inherited `HTMLElement` properties (`id`) then count, as they do for React. → § 4 step 5.
- **Banner condition and merge order (§ 3): no web stake.** The condition can be decided from git (`merge-base --is-ancestor`), and the order changes nothing a web consumer reads. I defer to Ada and Stacy. → § 3.
- **Surviving counter (mine), restated:** the `web:` field is Lina's schema surface. Every `attribute-only` marker is a known defect served to consumers, and a React user loses those props silently until G-4 adds the properties. Findings 1 and 3 make that list long at birth: more than 29 entries in two components alone. → § 5 "What survives".

#### [LEONARDO R1]

*Read-only. Ballot at `a71ad3bd8` (wt-wp), §§ 1–2 and 4–5.*

- **Le-1: yes. This is the narrowed form I read at the collective round** (`collective-r3-leonardo.md` (3)). All four parts are in Sparky's sentence (site 1) and the marker (site 2):
  - the property where one exists;
  - attribute-only, marked, with its attribute in kebab-case;
  - the served name never changed, and the element not renamed;
  - additions waiting for G-4, as listed G-4 findings.

  Callbacks are left to G-4, as I asked. My condition at that round was that the sweep fixes a mismatch in the served name, never by renaming the element. Site 1's "The served name is never changed to match the element, and the element is not renamed" meets it. → § 1; § 2 site 1
- **No objection to serving the known-defect list.** It is the honest state. Without it, `get_component_full` overstates `helperText` as a JS property. As the architect who specs web screens against it, I would rather read `web: attribute-only` than learn it from a broken React wrapper. **One wording change in site 2's last sentence**, which ships to consumers: "a finding for the web-element contract spec: an element property to add" names an internal spec a consumer's install does not have. That is the class of string the 16.1.0 trio saw consumer agents echo (R1-17). **Proposed**: "A `web: attribute-only` property is a known gap: a later release may add the JS property, which does not change the attribute." The G-4 link stays in site 1, which already points to the charter. → § 2 site 2
- **Surviving counter.** The marker is only as true as the guard test in § 4 step 5. It is EXECUTION in Lina's scope, "in the application PR or straight after it", so the ratified rule can land and be served before the test that backs it. In that gap, a missing key is a served claim nobody has checked. **The fold I would make**: move the guard test into the application PR's checks (§ 4 step 6), so the rule and its test merge together. The cost is Lina's half day, moved earlier. **What survives the fold**: the test reads `*.web.ts` text, not the running element. An accessor defined some other way (a mixin, `Object.defineProperty`) would read as missing and overstate the defect list instead of understating it. That is the safe direction. → § 4 steps 5–6; § 5

#### [LINA R1]

*Read-only, 2026-10-30, at `a71ad3bd8` (wt-wp): the ballot whole, plus `git show d34fc7786:` of both docs' first ten lines. @-mention scan: Li-1 and Li-2 are answered below.*

- **Li-1: confirmed, and my error.** The schema doc's H1 is L8 at `d34fc7786`; L9 is blank. Site 2e anchors on L8. The guidelines' H1 is at L9, so site 1e is right. → § 2 site 2e

- **Li-2, the precondition: yes, it is in my plan.** The order is:
  1. #576 (the G-4 charter) merges;
  2. Ada's predicate v2 merges (#573 site B);
  3. this ballot's application.
  
  Site 1 cites the charter by its root path. If it is not on `main`, the citation is a broken pointer under the issues README rule 3, so the precondition must hold as written. If #576 waits on Peter, this application waits with it. That is the cost of citing the charter. The alternative, putting the list in the guidelines themselves, would turn a served doc into a known-defect register, and I would not take it. → § 4 step 2

- **The banner condition and the merge-order lean: agreed.**
  - "Struck if v2 is an ancestor of the application's base" is decidable from git (`git merge-base --is-ancestor <v2> <base>`). The banner texts I drafted both contain "ballot paths", so a banner landed under v1 keeps its doc matching under v2. No follow-up is owed either way.
  - My F1 CORRECTION (#577) touches the same guidelines file at L744–L776. Its pointer has no "ballot", so it does not change the condition. Its lines sit after site 1's, so site 1's anchor holds in either merge order.
  
  → § 3

- **The not-sites list: two additions, one of which changes timing.**
  - **(a) The guard test and the sweep's markers must land in the same PR.** Otherwise the test is red the day it lands. At the base, nine web elements have zero or one property accessor (Container-Base, the three Nav-Headers, Progress-Bar-Base, the four Input-Texts; counted in the G-4 charter § 4), and their served props carry no `web` key yet. The other form, a guard that pins today's known list and only lets it shrink, is weaker and needs nothing new. I take the same-PR form.
  - **(b) Optional: one sentence in `get_component_full`'s tool description** naming the `web` property field, so an agent reading a served schema knows what it means. It re-bases the tool-registry hash, and it is in my scope. Without it, the field is served undescribed. I lean to including it.
  - The rest is complete as listed:
    - the `PropertyDefinition` type;
    - the value-check test, run in `application-mcp-server`'s own suite;
    - the guard test;
    - the sweep's method;
    - the prop-mapping record's close and re-rule;
    - the charter's § 5 item 3.
  - I checked for anything that would reject the new key and found none. Nothing that reads `*.schema.yaml` (the indexer, `src/__tests__/stemma-system/**`, the CLI readers) allow-lists property keys.
  
  → § 4 step 5

- **The surviving counter stands as written, plus one sequencing residual.** This application now waits on two other merges, #576 and Ada's v2. Its due date is no later than 16.3.0's S, so one stalled PR in the chain pushes the property half, and the sweep that depends on it, toward that deadline. If #576 is still open close to the deadline, the honest fallback is to re-rule the prop-mapping record with a dated reason. Weakening the citation is not. → § 5

#### [STACY R1]

*Read at `a71ad3bd8` (DRAFT) on base `d34fc7786`, 2026-10-30, read-only. (verified) means a command I ran at the base.*

- **S1: the five census lines hold, but one line is missing: `122-sweep-1-refs`.** → Census
  - sweep-1 resolves every canonical route and law section against the docs MCP by verbatim heading (`sweep-1-refs.ts` L5–L8, L87–L117). Seven routes point into these two docs (verified):
    - `platform-implementation-guidelines`: Data L33 and L130, Kenya L84 and L122, Leonardo L75, Lina L159, Sparky L104;
    - `component-schema-format`: Lina L49 (`§ "Schema Structure"`) and L175.
  - The command therefore loads both docs, so the line is owed. Its ground is decidable: site 2 adds one heading, `### Web Access (\`web\`)`, which contains no routed heading. No heading is removed or renamed. Site 1's lead is bold text, not a heading.
  - **canonical-vs-truth: the conclusion holds, but the line names one section wrongly.** Data's asserts on this doc are two: `Android Implementation Patterns` and `3. Token Usage Consistency` (`data.md` L36, L40). `System-First Value Selection` is an assert on `product-token-governance` (the next `governanceAsLaw` entry), not on this doc, so the census line should drop it from "Data's asserts on platform-implementation-guidelines". Site 1 sits in `### 2. Property Name Consistency` (L68–L114), outside both. No agent asserts on `component-schema-format`; Lina's two entries are routes. (verified) The before and after `exit 0` runs are relayed.
  - **governance-examples**: the digest at the base, `6c5b98ef…fba4573`, is the one I reproduced for #573 (same base). The with-sites run is relayed.
  - **Other readers of `Component-Schema-Format.md`**: none is a registered instrument.
    - `.kiro/sync-manifest.json` holds a hash of the doc, but it is a 12.0.2 dogfood relic (last touched `573baaaba`, 2026-07-08). It is read only by the consumer `sync` CLI, so it is not a check.
    - Lina's ambient baseline and the demotion delta carry `component-schema-format` as a demoted id. sweep-8 reads their `replaces:` keys, and the sites touch none.
    - So no further line is owed.
  - **A miss of my own, carried here.** My #568 R2 confirmed that ballot's five census lines. It missed that Leonardo's `governanceAsLaw` asserts on the framework, at § "Decision Framework" (`leonardo.md` L22–L30, two `mustContain` strings), and that sweep-1 resolves that section too. #568 therefore owes `not in scope` lines for `122-canonical-vs-truth` and `122-sweep-1-refs`, on the ground Lina gave (no site touches L34–L93). Its application PR re-runs the census at its base, and it should carry both lines.

- **S2: the banner condition is decidable. I would test the version, not ancestry.** → § 3, § 4 step 2
  - Ancestry needs v2's squash SHA, which does not exist yet. The instrument states its own version: `PREDICATE_VERSION = 1` at the base (`predicate.ts` L68), and the guard's report line prints `predicate v<N>` (L242). (verified)
  - So the condition reads at the application's base: `git show <base>:scripts/audience-banner/predicate.ts`, then `PREDICATE_VERSION` ≥ 2 means 1e and 2e are struck; otherwise they are applied. The PR body pastes the guard's report line.
  - **"A banner landed under v1 needs no follow-up" holds.** Each banner's own text says "ballot paths" outside any pointer, so the doc keeps matching, and keeps carrying its banner, under v2. That is self-sustaining but consistent.

- **The precondition on G-4 is decidable**: `git cat-file -e <base>:.kiro/issues/2026-10-30-g4-web-element-public-contract-charter.md`. After the charter closes, the README's rule 3 resolves it to `archive/` under the same filename. → § 4 step 2

- **Before and anchor blocks: byte-exact at `d34fc7786`.** (verified) → § 2
  - guidelines L77–L78, with L79 blank, L80 the example and L9 the H1;
  - schema doc L169 the closing fence, L170 blank and L171 `---`.
  - Site 2e's anchor is **L8**, the H1 (`# Component Schema Format Specification`); L9 is blank. The correction is right.

- **A gap the merge-order lean opens: site 1 brings a repo-internal path into a served doc that has none today.** → § 2 site 1, § 3
  - Neither doc contains any `.kiro/` path at the base (`grep -c '\.kiro/'` gives 0 for each; verified). Site 1's second paragraph cites `.kiro/issues/2026-10-30-g4-web-element-public-contract-charter.md` § 4.
  - Under the lean (v2 first, 1e struck), a consumer and Kiro-Data, which reads the file live, meet a path their install does not have, with no framing.
  - The predicate does not see it. `.kiro/issues` is not in v1's strings, and (α) does not add it. That is the guard's under-inclusion, now in a doc it no longer selects.
  - **Property needed** (either works): the served prose names the G-4 spec without a repo path, or 1e is applied whatever the predicate version, because the internal reference is in the prose, not in a pointer. The text is Lina's, and the predicate is Ada's (her `KNOWN_UNDER_INCLUSIONS`). I propose no wording.

- **My surviving counter-argument.** Lina's residual is the real one. A schema with no `web` key reads as "a property of that name exists", and that is true only where her guard test has run. The test is listed in § 4 as "not a site, in Lina's standing scope". No criterion and no check makes it land with the application. If it slips, the served schema overstates from the merge on. I would want the PR body to name the test file and its run, so my RELEASE pass can read its presence.

#### [THURGOOD R2]

*Incorporation of SPARKY R1, LEONARDO R1, LINA R1 and STACY R1, at `a71ad3bd8` on base `d34fc7786`, 2026-10-30. The four entries are spliced above byte for byte. Ada's R1 is queued behind her predicate-v2 work, to be spliced at R3.*

- **One application PR** (Sparky finding 1, Leonardo, Lina (a), Stacy): sites 1 and 2, the sweep's markers and the guard test land in the same PR.
  - Why: "no `web` key means a JS property" is false at the base for most served props. Input-Text-Base has 13 attribute-only props, and Container-Base has 16 with no accessors. Without the markers, the test is red on its first day; without the test, the rule overstates from the merge on.
  - The guard test moves into § 4's checks, and the PR body names its file and its run, so Stacy's RELEASE pass can read that it landed.

  → § 4 steps 3, 5, 6
- **The guard test reads the running element** (Sparky): `prop in` an upgraded instance (`document.createElement(tag)` after `define`), not a regex over `*.web.ts`. Inherited `HTMLElement` properties then count, as React counts them. A source regex would also mis-list mixin and `defineProperty` accessors (Leonardo). That is the safe direction, but `in` is better. → § 4 step 5
- **Callback detection** (Sparky finding 2): no schema uses `type: callback`; only Component Schema Format L154 and L163 teach it. Real callbacks are signature strings (`"(value: string) => void"`). Both tests therefore detect a callback by a `=>` signature or an `on[A-Z]…` name. The gap between the doc and the schemas is a record for Lina. → § 4 step 5
- **Site 2's last sentence is replaced** with Leonardo's wording, because the sentence ships to consumers and named an internal spec: "A `web: attribute-only` property is a known gap: a later release may add the JS property, which does not change the attribute." The G-4 link stays in site 1. → § 2 site 2
- **Census** (Stacy S1):
  - A `122-sweep-1-refs` line is added. Seven charter routes point into the two docs; site 2 adds one heading that contains no routed heading, and nothing is renamed.
  - The canonical-vs-truth line is corrected: Data asserts "Android Implementation Patterns" and "3. Token Usage Consistency" on this doc. "System-First Value Selection" is an assert on product-token-governance. The conclusion holds.

  → Census
- **The banner condition** now tests `PREDICATE_VERSION` at the application's base, not ancestry, because v2's SHA does not exist yet (Stacy S2): 2 or more strikes 1e and 2e; otherwise they are applied, and the PR body pastes the guard's report line. The G-4 precondition is decidable by `git cat-file -e`, with the README's rule-3 fallback to `archive/`. Site 2e's anchor at L8 is confirmed (Lina Li-1). → § 3, § 4 step 2
- **Stacy's gap: site 1 brings a `.kiro/issues/…` path into a served doc that has no `.kiro/` path today.** If v2 lands first and 1e is struck, a consumer and Kiro-Data meet an unresolvable path with no framing, and neither predicate version sees it. Two forms:
  - (i), my lean: name the G-4 work without a repo path. Draft for Lina: "DesignerPunk lists every attribute-only prop for its web-element contract work (G-4)."
  - (ii): apply 1e whatever the predicate version.

  I lean (i) because it matches Leonardo's P3 record on unresolvable paths in packed docs. But Lina's R1 prefers citing the charter by path, so the text is hers to choose. → § 2 site 1, § 3
- **Lina's additions to the not-sites list**:
  - (b) one sentence in `get_component_full`'s tool description naming the `web` field. It re-bases the tool-registry hash, and it is in her scope.
  - The merge order is #576, then Ada's v2, then this.
  - The fallback near 16.3.0's S: re-rule the prop-mapping record with a dated reason, never weaken the citation.

  → § 4 step 5, § 5
- **Questions for Lina at R3** (her ballot, so these are hers to answer, not Peter's):
  - [@LINA] Fork, Sparky finding 3: served props that reach the element as **neither** a property **nor** an attribute would turn the guard test red. They include `testID` and `className` on Input-Text-Base, Container-Base's iOS-only `ignoresSafeArea`, and `children` as slot content, and there are more than 29 entries in two components at the start. Choose:
    - (a) site 2 says such props are outside the marker and are listed as G-4 findings, and the guard test excludes them, with Sparky's sentence unchanged;
    - (b) a third marker value.
    
    → § 2 site 2, § 4 step 5 -- [THURGOOD R2]
  - [@LINA] Stacy's gap: (i) name G-4 without a repo path in site 1's second paragraph, which is my lean, or (ii) keep the path and apply 1e whatever the predicate version. Give your wording if (i). → § 2 site 1 -- [THURGOOD R2]
- **Carried to #568** (Stacy's miss there): #568's application PR body owes `not in scope` lines for `122-canonical-vs-truth` and `122-sweep-1-refs`, because Leonardo asserts on the framework's § "Decision Framework" and no site touches L34–L93. I note it in #568's § 4 in its own commit.
