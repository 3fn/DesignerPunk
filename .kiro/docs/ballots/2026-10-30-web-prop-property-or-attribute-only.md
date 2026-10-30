# Ballot Measure: on web, a served prop is a JS property of the served name, or an attribute only, marked — the prop-mapping rule's property half

**Date**: 2026-10-30
**Drafted by**: Thurgood (ballots steward), who drafts the file. **Lina authors the measure** and owns both docs' substance (`lina-property-half-sites.md`). **The rule sentence is Sparky's**, verbatim (`collective-r3b-sparky.md`). Drafter's clock: 2026-10-30T17:53:01Z (`date -u`).
**Status**: **DRAFT**
**Authority**: Peter, R8 item 6, chat, relayed, received before 2026-10-30T17:23:42Z (the orchestrator's clock; the R8 message), verbatim as relayed: *"Re: 6, Ratify"*. It applies to the property-half ballot, Sparky's R3b sentence, "when filed". His word binds the text as recommended here; the Status commit records it after the R1 round. The record is `R8@<its PR squash>`, beside `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`. The collective sheet is r2.1, § E.
**Base**: `d34fc7786` (`origin/main` when this was cut). Every Before and anchor block below was cut at that SHA and checked by script (byte-exact).
**Owner**: Lina.
**Required reviewer**: **Stacy**, as census reader.
**Reviewers**: Sparky (the sentence), Leonardo (the narrowed form), Ada (the banners and predicate v2's merge order).
**Consulted**: Sparky — the sentence is his R3b, verbatim; Leonardo — the narrowed form (the collective sheet, § E); Ada — <pending R1: the banner condition against her predicate v2>; Stacy — <pending R1>
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
- `**Census**: not in scope — 122-canonical-vs-truth (governanceAsLaw mustContain over asserted sections; Data's asserts on platform-implementation-guidelines are "Android Implementation Patterns", "3. Token Usage Consistency" and "System-First Value Selection") — site 1 is in § "2. Property Name Consistency", outside every asserted section; measured: exit 0 before and after, with every asserted section's served size unchanged (only the whole-document size moves)`
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

The served name never changes to match the web element (Platform Implementation Guidelines § "2. Property Name Consistency"). Every `web: attribute-only` property is a finding for the web-element contract spec: an element property to add.
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
- **The condition, decidable from git at this application's base**:
  - **v2 is an ancestor of the application's base**: sites 1e and 2e are **struck**. No banner is owed: under v2 the two docs' only "ballot" strings sit inside pointers (measured: both drop).
  - **v2 is not an ancestor** (v1 in force): sites 1e and 2e are **applied**. A later v2 changes nothing: each banner's own text contains "ballot paths", so the docs keep matching and keep carrying a banner (measured: 24/24 under both v1 and the v2-style strip).
- **My lean**: sequence this application after Ada's v2, so the banners are struck. A banner on a doc whose only repo-internal strings are its change notes is the noise (α) exists to remove. That is a lean on order, not a fork: the text is right either way.

## 4. Application (after the Status commit)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**`, with R8 item 6 quoted and its clock bound.
2. **Preconditions**:
   - `.kiro/issues/2026-10-30-g4-web-element-public-contract-charter.md`, which site 1 cites, is on `main`. At this ballot's base it exists only on a branch.
   - The banner condition (§ 3) is read and stated in the PR body.
3. **Lina, the application PR** (branch `chore/apply-web-prop-property-or-attribute`), in one authoring commit:
   - sites 1 and 2;
   - 1e and 2e only if v2 is not an ancestor of the base.

   `<application date>` is the date of the application PR's merge, as its squash commit records it.
4. **Lock**: the lock's inputClosure hash moves, because `governance/` is in the closure. The refresh is Thurgood's, done by a full-run-green `check:122:diff-guard` and then read no-op-green, because `canonical/generated.lock` is outside Lina's write scope. If a generated output changes, the application stops and reports.
5. **Not sites, in Lina's standing scope (`application-mcp-server/**`, `src/components/**`), EXECUTION, in the application PR or straight after it**:
   - **`application-mcp-server/src/models/index.ts`**: `PropertyDefinition` gains `web?: 'attribute-only'`. Properties already pass to `get_component_full` raw (`ComponentIndexer.ts` L768), so no indexer change is needed.
   - **A schema-check test** in the Application MCP's indexer tests: `web` takes only `attribute-only`, and never appears on a `type: callback` property. Root `npm test` does not run that suite, so the PR runs `application-mcp-server`'s own.
   - **The guard test for "absence means property"** (Lina's class fix), under `src/components/__tests__/`. It reads each web element's `*.web.ts` and each schema, and asserts two things:
     - every served non-callback prop without `web` has a JS property of that name;
     - every `web: attribute-only` prop is in `observedAttributes`, in kebab-case.

     Without it, a missing key overstates.
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
   - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: both docs read `ok`.
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
- **Absence overstates without the test** (Lina). A schema with no `web` key reads as "has a property", which is true only where the guard test has run. If the test is cut for time, the served schema overstates.
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
