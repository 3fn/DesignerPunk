# Ballot Measure: screen specs name the platform idiom per node (`idiom:`) — #568's F-C (ii)

**Date**: 2026-10-30
**Drafted by**: Thurgood (ballots steward), who drafts the file. **Leonardo authors the measure's text** (`leonardo-fc-sites.md`), and it is carried verbatim. The one substitution: his `<ballot id>` placeholder is filled with this ballot's id. Drafter's clock: 2026-10-30T17:36:03Z (`date -u`).
**Status**: **DRAFT**
**Authority**: Peter's pick of #568's F-C, R8 item 4, chat, relayed, received before 2026-10-30T17:23:42Z (the orchestrator's clock), verbatim as relayed: *Re: 4, "Ratify as recommended", plus F-C: "(ii)" Leonardo's own small ballot*. The record is `R8@<its PR squash>`, beside `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`, and the citation is filled after the release seat's record PR merges. Ratified in #568 (`434945ac7` on its branch), § 6, "Ruled: F-C".
**Timing**: fix-now. The application merges no later than 16.3.0's S.
**Base**: `d34fc7786` (`origin/main` when this was cut). Every Before block below was cut from `governance/DesignerPunk-Integration-Guide.md` at that SHA and checked by script (byte-exact).
**Required reviewer**: **Stacy**. She is the census reader, and she reads whether `idiom:` can be read at phase 1.
**Reviewers**:
- **Kenya**: it is her upstream fix, and the per-node form departs from her "existing branch" wording.
- **Lina**: her F-A read on #568.
- **Ada**: owner of `scripts/audience-banner/**` (her standing `writeScope`, `canonical/agents/ada.md` L262) and of its predicate's versions, for site B.
**Consulted**: Leonardo — the author; he found the banner collision and will not reword the pointer to avoid it; Kenya, Lina, Stacy, Ada — <pending R1>
**Class**: LAW. It adds a spec-author convention to a served, packed `governance/` doc. Site B is LAW too (the banner convention), in either branch of F-1.
**Class option**: site B's (α) is the class fix for RS-51: a dated amendment pointer stops matching banner predicate v1 by itself. Every future LAW edit to an unbannered served doc then stops forcing a banner. The cost is one predicate version bump, Ada's, with a re-measured count, and no doc changes status today (§ 3 site B).
**Amends** (one application PR, Peter-merged):
- `governance/DesignerPunk-Integration-Guide.md`, Leonardo's text. The guide is served by the docs MCP, packed via `governance/`, routed from Leonardo's charter (`integration-onboarding-guide`), and embedded by no charter.
  - **F-C.1**: a new `idiom:` paragraph after L786;
  - **F-C.2**: the Node Structure example, L809–L812;
  - **F-C.3**: a new field-table row after L821.
- **Site B**: the banner collision, resolved by F-1.
  - **(α)**, recommended: `scripts/audience-banner/predicate.ts` predicate v2, Ada's. A dated-pointer span does not count toward a match, so the guide owes no banner.
  - **(β)**: a consumer-addressed banner template, plus a banner on the guide.
- Not edited: the Product MCP, the screen-spec schema and the indexer. `get_screen_spec` returns the key as written (`product-mcp-server/src/index.ts` L294–L315).

**Census** (ballots README § "Conventions", "Instrument census"):
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts; census mode --census) — F-C.1–F-C.3 edit a scoped doc, governance/DesignerPunk-Integration-Guide.md, and the added example's values are angle-bracketed placeholder strings, not token names, declared paths, token-file shapes or @3fn/core import lines; measured, heuristic: --census at d34fc7786 as committed and with F-C.1–F-C.3 applied is byte-identical (sha256 6c5b98efdd10b5e30f6d3efecb60f220cb21aa715be8a719fe8e32b18fba4573; selected 1990 over 91 docs; the guide's line 34:0:1 both times)`
- `**Census**: not in scope — package-name-scope-drift (scripts/check-package-name-drift.js; governance/ in its SCAN_DIRS) — the sites add no package name; measured: exit 0 and byte-identical output at d34fc7786 as committed and with the sites applied`
- `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts, citing corpus governance/, .kiro/steering/, canonical/) — the sites add no get_section / get_document_* citation (F-C.1's "Cross-Platform vs Platform-Specific Decision Framework, Q4" is prose); measured: PASS with the sites applied`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an input-closure root (L62–L72), so the sites move the lock's inputClosure hash, refreshed at application; Leonardo's charter routes to the guide and embeds none of it, so no generated output changes`
- **Site B (α)** changes a check's code, `predicate.ts`. That check is the audience-banner guard, which no register row's `checks` names, so no census line is owed (as in #568). The measured delta is still given, so the reader has it: under v1, 22 docs match at the base and 23 with F-C applied. With pointer spans stripped, 22 and 22. The only doc that changes is the guide.
- **No line owed**: the install-doc derivation (`scripts/derive-install-doc.ts`) reads only `<!-- designerpunk:install-region -->`, L21–L260, and the sites sit at L786–L821. `install-doc.test.ts` passed with the sites applied. The derivation is in no row's `checks`.

**Cap**: three sites in the guide (six added lines in all), and one predicate change or one banner.

**Retroactivity**: none. Existing screen specs carry no `idiom:`. A node with no entry "makes no claim" (F-C.1).

> **Conflicts, stated first.** I own the banner convention's steward role (the U4 ballot's banner half was mine to draft), and site B (α) is my lean. Ada owns the predicate and decides its versions. Stacy's review and Peter's ratification are the checks.

---

## 1. The measure (Leonardo's design, from his file)

- **One key, one grammar**: `idiom:`, on any UI-tree node, is a map keyed by platform, with `{ follows }` or `{ parts, reason }`.
- **It is written on the node wherever the node lives**, in `shared` or in a platform branch. It is not only in `ui-tree.<platform>:`, which departs from Kenya's "existing branch" wording. The Product MCP concatenates a platform branch after `shared` (`product-mcp-server/src/index.ts` L302–L303, `filtered[key] = [...shared, ...platformData]`), so restating a shared node in a platform branch adds a second node. Kenya's constraint holds: no schema change, no indexer change.
- **It is served today**: the indexer "Ignores everything else" (Guide L823), and `get_screen_spec` copies nodes untouched. A later Product MCP check, the (iii) path, can read it without a format change.
- **It composes with #568**: a conflict the node's `idiom:` names is one "the plan already showed", so it is planning-stage (#568 site 1a). One the key does not name, found during the build, is `not in plan` in the `**Departures**:` line.

## 2. Edit sites — the Integration Guide (Leonardo's text)

### Site F-C.1 — § "Writing Screen Specs", a new paragraph after the `tokens:` convention (LAW)

**Anchor** (L785–L786 at `d34fc7786`, verbatim). The paragraph and one blank line go between L786 and L787:

```
Use canonical Rosetta token names as-is (dot-notation for semantic tokens like `color.action.primary`, flat names for primitives like `space100` or `bodyMd`). The indexer stores token names exactly as written — no normalization.

```

**Inserted**:

```
**`idiom:` convention**: When a node's look or behavior on a platform is a choice between that platform's idiom and a departure from it, the node states the choice in an `idiom:` map keyed by platform: `follows: <the idiom>`, or `parts: <the idiom>` with `reason: <the user need or brand reason>` (the design philosophy's Native-Behavior Rule). Write it on the node wherever the node lives, in `shared` or in a platform branch; a platform branch is appended to `shared`, so restating a shared node there adds a second node. Name only real choices; a node with no `idiom:` entry for a platform makes no claim about it. A departure the key names was shown by the plan, so it is decided while planning; one found during the build that the key does not name is `discoverable: not in plan` (Cross-Platform vs Platform-Specific Decision Framework, Q4). The key is not indexed; `get_screen_spec` returns it as written. *(added <application date> by ballot 2026-10-30-screen-spec-idiom-per-node, site F-C.1)*

```

### Site F-C.2 — § "Node Structure", the example block, L809–L812 (LAW)

**Before** (L809–L812 at `d34fc7786`, verbatim):

````
  repeat: "for-each item in data.items"  # Optional. List rendering. NOT indexed.
  content:                        # Optional. Text the screen shows that no component carries (a heading, body copy). NOT indexed.
    heading: "Section Title"
```
````

**After**:

````
  repeat: "for-each item in data.items"  # Optional. List rendering. NOT indexed.
  content:                        # Optional. Text the screen shows that no component carries (a heading, body copy). NOT indexed.
    heading: "Section Title"
  idiom:                          # Optional. A platform-idiom choice, per platform. NOT indexed; returned as written.
    ios: { follows: "<the platform idiom>" }
    android: { parts: "<the platform idiom>", reason: "<the user need or brand reason>" }
```
````

### Site F-C.3 — § "Node Structure", the field table, after L821 (LAW)

**Before** (L821 at `d34fc7786`, verbatim):

```
| `content` | object (string values) | No | Not indexed |
```

**After**:

```
| `content` | object (string values) | No | Not indexed |
| `idiom` | object (platform keys; each `{ follows }` or `{ parts, reason }`) | No | Not indexed; returned as written by `get_screen_spec` *(added <application date> by ballot 2026-10-30-screen-spec-idiom-per-node, site F-C.3)* |
```

L823 ("Ignores everything else") and L825 are unchanged, and both stay true.

## 3. Site B — the banner collision (F-1)

**The collision** (Leonardo found it):
- The dated pointers on F-C.1 and F-C.3 contain "ballot". That string is in banner predicate v1 (`scripts/audience-banner/predicate.ts`: `complete-task\.sh|Peter merges|RATIFIED|ballot` over `governance/*.md`).
- The guide has 0 hits at the base. With the sites applied it matches. Measured: "23 match; 22 carry", `[MISSING] governance/DesignerPunk-Integration-Guide.md`, and the live guard test fails (`npm run test:scripts`, 2 failed).
- The only banner `renderBanner` writes (L145) says "this describes **DesignerPunk's own …**, not yours". That is false for the Integration Guide, which is written to the consumer.
- **Leonardo will not reword the pointer to avoid the predicate, and I agree.** The pointer forms are ballots README L31's, ratified.

**The two defensible resolutions:**
- **(α) Predicate v2: a dated-pointer span does not count toward a match** (recommended).
  - **What changes**: `matchesPredicate` strips the L31 pointer forms before testing: `*(added|amended|moved|corrected <YYYY-MM-DD> …)*`. `PREDICATE_VERSION` becomes 2, and the header's under-inclusion text is re-measured.
  - **Measured**:
    - at the base, 22 docs match under v1 and 22 under v2, with no doc dropped;
    - with F-C applied, 23 under v1 and 22 under v2, where only the guide drops.
  - **Why**:
    - The predicate exists to find docs that carry repo-internal *authority* (`predicate.ts` L6–L8).
    - A pointer is provenance: its date and ballot path say where a sentence came from, not what to do.
    - It fixes RS-51's class: no future LAW edit to an unbannered served doc forces a banner.
    - The convention gives Ada the predicate's versions ("decided by Ada with a re-measured count", `predicate.ts` L23–L24), and she holds `scripts/audience-banner/**` standing. So (α) is her change, ratified here as text.
  - **Sequencing**: her PR merges before this application, or the guard fails at the application.
- **(β) A consumer-addressed banner form, with a banner on the guide.**
  - **What changes**: a second template beside `renderBanner`, for docs written to the consumer. In outline: "this is written **for you**. **DesignerPunk's own**: the amendment notes and their ballot paths." `hasBanner` would recognize both forms. The guide then carries that banner.
  - **Why it is defensible**: the predicate fired truly. The guide now holds DesignerPunk-internal strings, and the banner tells the consumer exactly which ones.
  - **Cost**: it changes the convention's "one template, one symbol" (U4 ballot § "Banners"), which is LAW. Ada builds it; Leonardo writes the guide's banner text. It leaves RS-51's class open: every consumer-addressed doc that gains a pointer gets a banner about its change notes.
- **Not offered**:
  - a declared exclusion list beside `KNOWN_UNDER_INCLUSIONS`: a hand-kept list that weakens the guard's one direction;
  - the empty `PENDING_UNTIL_23_2` list: a migration device;
  - rewording the pointer: refused.

**Open for Peter**: F-1 — the banner collision the guide's new dated pointers create: **(α)**, recommended (Thurgood): banner predicate v2, in which a dated-pointer span does not count toward a match (Ada's change under her version rule, merged before this application; measured: no doc changes status at the base, only the guide drops with F-C applied; it closes RS-51's class); or **(β)**: a second, consumer-addressed banner template and a banner on the guide (a convention change, LAW; Ada builds it, Leonardo writes the banner; RS-51's class stays open). Under (α), if Ada declines at R1, the ballot comes back with (β) as its text.

## 4. Application (after the Status commit)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**`, with his words, their clock bound, and F-1's answer.
2. **Under (α), first**: Ada's predicate v2 PR (`scripts/audience-banner/**`, her standing scope; EXECUTION of this ballot, site B). It carries:
   - its test: a fixture where a pointer alone does not match, and one where a pointer plus "RATIFIED" in prose does;
   - the re-measured header count;
   - the measured line "22 match; 22 carry" at its base.

   It merges before step 3.
3. **Leonardo, the application PR** (branch `chore/apply-screen-spec-idiom`), in one authoring commit: F-C.1–F-C.3, as written (and under (β), the banner on the guide and Ada's template commit before it). `<application date>` is the date of the application PR's merge, as its squash commit records it.
4. **Lock**: `governance/` is in the generator's input closure, so the lock's inputClosure hash moves. The refresh is done by a full-run-green `check:122:diff-guard`, then read no-op-green. The refresh is Thurgood's (named in the grant), because Leonardo's seat does not run the generator. If a generated output changes, the application stops and reports.
5. **Checks**, each pasted in the PR body with its result:
   - `npm test`;
   - `npm run test:scripts` (the banner guard: under (α), "22 match; 22 carry");
   - `npm run -s check:section-citations`;
   - `node scripts/validate-steering-metadata.js`;
   - `npx tsx scripts/governance-examples/check.ts --census`, whose digest equals the census line's;
   - `node scripts/check-package-name-drift.js`;
   - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: the guide reads `ok`.
6. **The PR body carries**:
   - `**Edit kind**: governance/DesignerPunk-Integration-Guide.md L<F-C.1>, L<F-C.2>, L<F-C.3> — LAW (.kiro/docs/ballots/2026-10-30-screen-spec-idiom-per-node.md)`. Under (β), add a line for the banner.
   - the grant;
   - the `**Consulted**:` line;
   - the census lines, re-run at its base.
7. **Owed after merge**:
   - the docs MCP's `rebuild_index` and `validate_metadata` on the guide;
   - a CHANGELOG line at the next release (the guide ships), by the release author;
   - Leonardo's P3 record `2026-10-30-product-mcp-screen-spec-no-approval-state.md` is unaffected: an `approval:` block would sit beside `status:`, not in nodes.

**Grant (activated by this ratification)**: Peter's ratification is the line (the #568 and 2026-10-25 precedent), until the application PR merges. It grants:
- **Leonardo**, as author: `governance/DesignerPunk-Integration-Guide.md` (F-C.1–F-C.3, byte for byte, and under (β) its banner). He holds no `governance/` scope, and an issue grant cannot grant a governance-law path (`.kiro/issues/README.md` rule 8).
- **Thurgood**: `canonical/generated.lock`, the refresh only.
- **Ada** needs no grant: `scripts/audience-banner/**` is her standing scope.
- No `.github/**` path is touched.

## 5. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: ratify F-C.1–F-C.3 as Leonardo wrote them, with F-1 (α).

**Counter-arguments, run against it, and what they changed**:
- **(1) "Put the key only in `ui-tree.<platform>:`" (Kenya's wording).** Leonardo's evidence, the MCP's concatenation, makes that add a second node. So the key goes on the node wherever it lives, with no schema change.
- **(2) "Reword the pointer to dodge the predicate."** Refused (Leonardo, and me): that would bend a ratified form to suit a lexical check.
- **(3) "A banner variant is the narrow fix."** It is narrow, and it leaves RS-51's class open. (α) costs one version bump and changes no doc's status today.

**What survives**:
- **The key is opt-in and self-reported** (Leonardo). An author who does not think of an idiom writes no entry, so a conflict that author missed lands as `not in plan` and proceeds with a notice. Until a Product MCP check reads it (the (iii) path), "no entry" cannot be told apart from "considered, no choice".
- **Under (α), a consumer reading a pointer meets a DesignerPunk ballot path with no framing.** The pointer's own form ("added <date> by ballot …") is the framing.
- **Under (α), the predicate's `ballot` string now means "ballot outside a pointer".** A doc whose only repo-internal authority sits inside a pointer would be missed. None does today (measured).

## 6. Review round record

Questions for R1:
- **Kenya**:
  - **K-1**: Does the key on the node wherever it lives (not only `ui-tree.<platform>:`) meet your upstream fix? Is `idiom: { ios: { follows } | { parts, reason } }` what you would read at Step 1?
  - **K-2**: Is a node with no `ios` entry, which "makes no claim", workable for you, given #568's `in-plan` field?
- **Lina**:
  - **Li-1**: Does F-C.1's last sentences ("shown by the plan … decided while planning"; "not in plan") match your F-A read on #568 as ratified?
- **Stacy** (required):
  - **S1**: Can your phase-1 read, or your departures read (#568 site 4), read `idiom:` decidably from a screen spec at a PR's base, to check an `in-plan` citation of the form `<path> uiTree.<node>`?
  - **S2**: Census: the four lines and site B's measured delta. Is any instrument missing?
- **Ada** (owner of `scripts/audience-banner/**`):
  - **A-1**: Will you make (α), predicate v2 (dated-pointer spans do not count), under your version rule, with the re-measured count? If not, is (β) yours to build?
  - **A-2**: Is the pointer pattern (the README L31 forms) the right strip set, or should a ballot citation `*(ballot …)*` also be stripped? (I lean no: it is not a dated pointer.)
- **Leonardo** (author, for his own read):
  - **L-1**: F-C.1 says `discoverable: not in plan`. #568 as ratified renamed the field to `in-plan`, with three values, so the form is `in-plan: not in plan (<the plan artifact searched>)`. Please correct your text, which is yours to change.
