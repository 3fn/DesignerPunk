# Ballot Measure: a guard on the examples the served governance docs teach (token names that are keys; files and shapes that exist)

**Date**: 2026-10-26
**Drafted by**: Thurgood (Civitas steward; the instrument would sit in my lane scope). At Peter's direction: Peter, chat, 2026-10-26, relayed by the orchestrator: *"Re: 3, let's go with the class move"* (00:28:49Z, clock), then *"Proceed as the team recommends"* (00:38:29Z, clock). The class move answers the instances below. Ada's and Lina's records each found by hand what a mechanical read of the served examples would have found.
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT records the measure, ratifies nothing, and answers no fork in § 6.
**Required reviewers**: **Ada** (R1). The token-name half's predicate is hers: what counts as a token reference in a served example, and what counts as a key. **Lina** (R1). The file-shape half's rule is hers: which code blocks must compile, against which types, and what a declared file path must resolve to. **Stacy** (R1, census reader). This ballot introduces an instrument, so it carries a census line.
**Class**: LAW. It adds a requirement on every served governance doc (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds"). Today a doc may show a token name that is not a key, or a file the repo does not have; after application, a new instance fails a required check.
**Amends**:
- New instrument: `scripts/governance-examples/` (the check, its test, its pending list).
- `.github/in-lane-guards.json`: one added entry (my standing lane scope, P1b additive).
- `governance/classification-map.md`: one new row, `governance-examples`.
- No edit to any governance doc's text: the pending list carries today's hits (§ 2.4).

**Census**:
- `**Census**: exempt — (1) the instrument does not exist at a95d6bf3d; ran: the measurements in § 1 (a token-index key set of 443; 258 `ts`/`typescript` fences in `governance/*.md`; 11 docs naming `@3fn/core`); count: heuristic, no instrument`
- The new register row is a file loaded by two instruments (condition 1):
  - `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the new row carries no get_section / get_document_* citation`
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — an ordinary closure input; the lock is refreshed at application`
- `.github/in-lane-guards.json` is read by the in-lane guard registry check:
  - `**Census**: not in scope — the in-lane registry check — the edit adds one entry, and the additivity predicate holds by construction (P1b)`
  - The entry's own count line (`N registered; N selected`) is read at application.

**Cap**: one instrument with two halves, one pending list, one registry entry, one register row. **Retroactivity**: none for doc authors. Every hit at adoption goes on the pending list (§ 2.4).

> **Conflict of interest, stated first.** I would own the instrument, and I own several of the docs it reads (Civitas shared docs). A guard I own that reads text I wrote is exactly the configuration where its predicate could be drawn to miss my own docs. The predicates are Ada's and Lina's for that reason (§ 2), and Stacy reads the census.

---

## 1. The instances

- **Token names (Ada's record)**: `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md` (P2 `(record)`). After the named-site fix (#471, #472), served token docs still hold strings that look like token names and are not keys. Lina's list was made by grep, and Ada re-reads it. Measured against the committed `token-index/` (443 keys over `primitives.yaml`, `semantics.yaml` and `components.yaml`): `color.primary` and `color.error` (`Token-Semantic-Structure.md`, `Token-Resolution-Patterns.md`) are not keys, and neither is `space.inset.comfortable` (`Product-Token-Governance.md`). The class has already shipped twice: `2026-06-25-component-schema-token-name-drift.md` (schemas) and `archive/2026-10-23-served-docs-teach-non-key-token-names.md` (served docs, P0).
- **File shapes (Lina's record)**: `.kiro/issues/2026-10-25-cdg-component-token-files-teaches-a-reference-map.md` (P2 `(record)`). `governance/Component-Development-Guide.md` § "Component Token Files" opens its example with `// ButtonCTA/tokens.ts`. `src/components/core/Button-CTA/` has no tokens file, and no component has the plain-object shape the example teaches. **Measured: every token name in that example is a key** (`space.inset.100`, `space.inset.050`, `space400`, `color.action.primary`, `color.text.default`, `typography.buttonMd`, `radius100`). So the token-name half alone does not catch this instance; the file-shape half has to (§ 2.2).
- **Why a guard, not another sweep**: each instance was found by a person reading. The schema half of the class already has a guard (`src/generators/__tests__/schemaTokenRefs.test.ts`, Ada's: every schema `tokens:` value is an exact key). The served-doc half has none, so the next example written in a doc ships unread.

## 2. The instrument (proposed)

### 2.1 Token-name half (Ada's predicate class)

- **Scope**: `governance/*.md` and the eight shipped steering docs named in `package.json` `files[]`. Fork **F-1** asks whether component READMEs join (Ada's record, item B).
- **Candidates**: strings inside fenced code blocks and inline code spans that match a **token-reference predicate**. The predicate is **Ada's text, versioned like the audience-banner predicate** (`scripts/audience-banner/predicate.ts`, "PREDICATE VERSION 1"): it is the artifact, and the set it selects is only its output. The drafter does not write it.
- **Shape of the predicate**: dot-notation names whose first segment is a token family, and the flat primitive forms (`space100`, `radius100`). Ada decides the family list, the forms, and what is excluded: CSS custom properties, platform identifiers and prop names.
- **The key set**: the union of keys in the committed `token-index/{primitives,semantics,components}.yaml`. The match is exact and case-sensitive, by the same rule `schemaTokenRefs.test.ts` states ("No allowlist, no case-folding, no notation normalization"). The guard reads the committed index, so a doc that names a token before the index has it fails until the index is regenerated, as the schema guard does.
- **Verdict**: a candidate that is not a key fails, unless it is opted out (§ 2.3) or pending (§ 2.4).

### 2.2 File-shape half (Lina's file shapes)

- **Declared paths**: a fenced block whose first line is a comment naming a repo path (for example `// ButtonCTA/tokens.ts`, `// platforms/web/ButtonCTA.web.ts`) must name a file that exists under `src/components/core/` or the repo root, by the resolution rule Lina states. Otherwise it is opted out or pending. **This is the check that catches the CDG instance.**
- **Compiled blocks**: a fenced `ts` or `typescript` block that imports from `@3fn/core` (or a subpath its `exports` map lists) is type-checked with `tsc --noEmit` against the package's built types (`dist/**/*.d.ts`, the files a consumer resolves).
  - Blocks that import nothing from the package are counted as "not compiled". They are not checked.
  - Fork **F-2** asks whether the compiled set widens.
  - Lina decides the tag rule and the compiler options. The default is the consumer `tsconfig` that `init` writes, if one exists, and `strict` otherwise.
- **Verdict**: a declared path that does not resolve, or a compiled block that does not type-check, fails, unless it is opted out or pending.

### 2.3 Opt-out marker

- **Form**: one HTML comment, `<!-- example: generic -->`, on the line directly before a fence, or at the end of a line that carries an inline code span. It marks a deliberately generic example (a placeholder `<component>.<property>`, a hypothetical name in a teaching contrast), which the guard then skips.
- **Visible in the report**: the guard prints the opt-out count, so a doc that opts out of everything shows in the count, and Stacy's claims pass can read it.
- **Not a pending entry**: an opt-out is permanent and authored. A pending entry is temporary and comes from adoption.

### 2.4 The pending list at adoption (the audience-banner pattern)

- **At adoption**, the guard's first run lists every hit in `scripts/governance-examples/pending.json`: doc, line, the failing string, and which half failed. **Each entry names the owner's record it is homed in.** Today's token-name hits go to Ada's record, and the CDG hits to Lina's. A hit with no home record is filed under rule 10 in the adoption PR.
- **The list only shrinks.**
  - A new hit not on the list fails.
  - An entry that no longer fails is stale and fails too, so it must be removed in the PR that fixes it. That makes the fix PR close its own entry.
  - No PR adds an entry after adoption, except by a ballot that names it.
- **The guard's claim is scoped**, as the audience-banner guard's is. It reports `N candidates; N resolve; M opted out; P pending; Q not compiled` over its scope, and never says the corpus is correct.

### 2.5 Where it runs, and who owns what

- **Lane**: a jest test under `scripts/governance-examples/__tests__/`, picked up by `npm run test:scripts` (`scripts/jest.config.js`, `testMatch: **/__tests__/**/*.test.ts`) in the required `lane-functional-root` job. **No workflow edit.** One entry in `.github/in-lane-guards.json`, in the audience-banner entry's form (`file`, `config`, `context`, `record`).
- **The compiled half needs `dist/`**: `lane-functional-root` runs `npm run build` before its tests (the `no-disabled-states` row's note: `lane-timing.yml` builds before `npm test`). If that step is ever removed, the test must throw, not pass empty, as the CSS-bundle guard does ("fails loudly rather than going silently dormant").
- **Register row `governance-examples`**: `class: functional` (a key lookup and a compile are mechanical); `owner: thurgood` (the instrument); the predicates are Ada's (token-name) and Lina's (file-shape). `check_state` is `proposed` at the build PR and `armed` at its merge, with `checks` naming the test.
- **Write scope for the build**: `scripts/governance-examples/**` is in no seat's standing scope. The build PR takes a rule-8 grant record naming those paths, activated by Peter's merge of a PR whose body names it, and Ada and Lina are named as the predicates' authors. Adding the paths to my standing scope is a charter edit (LAW, `canonical/agents/**`), left to a later write-scope round. It is not in this cap.

## 3. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: both halves, with the pending list, scoped as § 2.1 and the § 2.2 default, built under a grant after ratification.

**Counter-argument, run against it**:
- **(i)** A lexical predicate over code spans will catch prop names, file names and platform identifiers. That is Ada's record's own warning ("most of them may be prop names"). The pending list starts long, and the opt-out marker becomes the way to get green, which turns the guard into a ritual.
- **(ii)** Compiling 258 `ts` fences against the package types tests the docs' TypeScript, not their teaching. A block can compile and still teach the wrong thing, as the CDG's plain object does.
- **(iii)** It adds one more required check at a time when Spec 131 is simplifying governance.

**Folded in**:
- From (i): the predicate is Ada's, versioned, and measured before adoption, as the audience-banner predicate was (18 of 83 docs, with a re-measured count at each version bump). The opt-out count is printed, so ritual use shows.
- From (ii): v1 compiles only blocks that import from `@3fn/core`, and the declared-path check carries the teaching instance.
- From (iii): the guard adds no lane and no context. It runs in `test:scripts`, which already runs, and it replaces a sweep that otherwise recurs by hand.

**What survives**:
1. **Presence is not correctness.** A name that is a key but the wrong token for the use passes. So does the CDG example's real defect, its job: "defines which tokens the component uses" is false, and no lexical or compile check reads that (Lina's record, item 2). The guard catches names and files, not teaching.
2. **Under-inclusion.** Token names written in prose outside code spans, and docs outside the scope, are not read. A zero count is evidence about the predicate, not about the docs, which is the audience-banner guard's stated limit, carried over.
3. **(iii) stands in part.** It is one more guard whose predicate someone must keep current as the token families grow.

## 4. Edit sites and application (after ratification)

1. **The Status commit** (record-first), and the ballots README roll entry.
2. **A grant record** (rule 8) for `scripts/governance-examples/**`, owner Thurgood, naming Ada and Lina as the predicates' authors.
3. **The build PR**, under that grant:
   - The instrument and its test. Ada's predicate text, byte-exact, with its version. Lina's file-shape rule.
   - The first run's pending list, each entry homed in a record.
   - The registry entry.
   - The register row at `proposed`, flipped to `armed` with `checks` at merge.
   - The PR body carries the census re-read at its own base (README § "Re-runs"), and the guard's report line.
   - Peter merges it: `governance/classification-map.md` is a governance path (`**Edit kind**: … — EXECUTION (this ballot § 4)`), and the carve-out applies.
4. **Checks**: `npm run test:scripts` (the new test, red on an injected non-key name, a missing declared path and a non-compiling block, then green); `npm test`; `check:section-citations`; `check:122:diff-guard`; the in-lane registry step (`N registered; N selected`).

## 5. Cost, retroactivity

- **Cost**:
  - Ada: the predicate text and its measurement, about an hour.
  - Lina: the file-shape rule and the resolution rule, about an hour.
  - Thurgood: the instrument, about half a day to a day, then the build PR.
  - Stacy: the census read.
  - Peter: F-1 and F-2, ratify, merge the grant and the build PR.
- **Retroactivity**: none. Today's hits are pending, homed in Ada's and Lina's records, and close in those records' own fixing PRs. Ada's sweep PR and Lina's CDG rewrite each remove their entries.

## 6. Forks for Peter (none is picked here)

- **F-1: scope.**
  - **(a)** `governance/*.md` and the eight shipped steering docs: everything the docs MCP serves or `init` copies as identity.
  - **(b)** (a) plus the component READMEs (shipped, not MCP-served; Ada's record item B). That adds Lina's 24 known lines at adoption.
  - Drafter's lean: (a) for v1, with (b) as a version bump once item B's lines are fixed. Surviving cost: a README can teach a non-key name unguarded meanwhile.
- **F-2: which code blocks compile.**
  - **(a)** Only blocks that import from `@3fn/core`.
  - **(b)** Every `ts`/`typescript` block, with snippets that are not modules opted out.
  - Drafter's lean: (a). Surviving cost: a block that shows a shape without importing passes unchecked. That is the CDG case, which the declared-path check carries instead.

## 7. Review round record

*(Ada R1, Lina R1 and Stacy's census read are recorded here, stamped per the Spec-Feedback-Protocol.)*

#### [LINA R1]

**Verdict: ACCEPT-WITH-CHANGES** on the file-shape half (§ 2.2) and on F-1/F-2. Changes L-1 to L-7 are below; my refusal conditions are in item 5. No @ mentions were addressed to me. Every count here is mine, made at `a95d6bf3d` with scratch scripts over `governance/*.md` plus the eight shipped steering docs. They are **heuristic, not an instrument** (Census convention). The type-check runs used the main checkout's `dist/`, built 2026-10-17, which is older than `a95d6bf3d`. I checked each failure it reported against source at `a95d6bf3d`, and each holds there. A block's line number below is the line its fence opens on.

**1. Is the file-shape rule right and sufficient for my instance? It is right, but not sufficient. It catches the path, not the class.**

- **What the draft catches.** The declared-path check fails `// ButtonCTA/tokens.ts` only because the name is wrong. Suppose my rewrite fixed the comment to `// Button-Icon/buttonIcon.tokens.ts` and kept the plain map of strings. The path would resolve, and the block imports nothing from `@3fn/core`, so neither F-2 option would compile it. Even under F-2 (b), a bare object literal is valid TypeScript and passes `tsc`. **No part of § 2.2 as drafted fails the shape my record is about.**
- **The shipping code already has the predicate.** `src/cli/loadComponentTokens.ts` has a harvest-zero lint (Spec 123 C11, Req 8; my Q8 call). It applies to any file named `tokens.ts` or `*.tokens.ts` that exports no value branded by `defineComponentTokens`. Such a file draws the warning "this scanned file harvested zero component tokens; if you meant to register values, call `defineComponentTokens`". The CDG example is exactly a file `generate` warns about. The guard should apply that same rule to examples.
- **L-1: add a declared-kind shape check.** When a block's declared path has a basename that the loader's `isTokenFileName` accepts, the block must contain at least one exported binding whose initializer is a call to `defineComponentTokens(...)`. The check keys on the declared **basename** and runs whether or not the path resolves. So a consumer-located `// src/components/MyCard/MyCard.tokens.ts` holding a plain map fails too, which is the case that matters for consumers.
- **L-2: the check reads syntax and does not compile or run the block.** Use `ts.createSourceFile`, with no program and no `dist/`. Teaching blocks are partial on purpose. The CDG's own good example at L203 uses `spacingTokens` without importing it and puts `// 'inset.large' → space150` in place of entries. A compiled or executed predicate would fail the correct example. That makes the syntax check a static copy of a runtime signal (the brand is non-enumerable and the return type `ComponentTokenValues<T>` does not carry it), so the copy has to be pinned. **A twin-agreement test** runs the syntax predicate and the loader's `getTokenContract` harvest over the seven real token files and one plain-map fixture, and asserts they agree on every file. Req 8.2 ("no second detection mechanism") binds the loader. This copy sits outside the loader and is held to it by the test.
- **Measured.** Two declared token-file blocks are in scope: CDG L576 (`ButtonCTA/tokens.ts`) and **CDG L956** (`// tokens.ts`, `paddingX: 'space.inset.100'`, in § "Cross-Platform Token Consumption"). Both fail L-1. **L956 is a second instance my record did not list.** It is in the very section my record's fix shape (c) says consumption should point to. So the record's fix shape is too narrow, and I will append to the record before adoption (item 4).
- **What L-1 still does not reach, stated plainly.** It does not reach a block that shows a token file without declaring a path. It does not reach prose that says what a token file is: L571 and L669's "defines which tokens the component uses" are prose, and only my rewrite fixes them. And it does not reach the wrong-job problem (§ 3 residual 1 stands). L-1 turns "caught because the example's name was wrong" into "caught because the example's shape is wrong", and nothing more.
- **Later kinds, as a version bump and not in this cap.** The same rule extends to `*.schema.yaml` and `contracts.yaml` through the parsers the Application MCP indexer already uses. An instance exists today: `governance/Test-Development-Standards.md` L1884 declares `# Input-Text-Email.schema.yaml` and puts `behavioral_contracts:` with `email_validation` in it. That shape no schema has, and the name does not follow `{category}_{concept}`. I am not proposing that kind for v1. I am naming it so the bump has its instance.

**L-3: the resolution rule for declared paths (the rule § 2.2 leaves to me).** A declared path resolves if it exists from the repo root, or if it is a suffix of exactly one tracked path (`git ls-files`). A suffix that matches no path fails. A suffix that matches several paths also fails: it does not tell the reader which file. This replaces "under `src/components/core/` or the repo root".
- **Measured.** 16 declared-path blocks are in scope. 6 resolve: 2 from the root, and 4 by a unique suffix (CDG L602/L616/L630, which point to `Button-CTA/platforms/*`, and TDS L1884). 10 fail:
  - CDG L576 and L956 (mine; L956 matches two `tokens.ts` files, so it is ambiguous);
  - TDS L1556, L1583, L1620, L1659 (an `Input-Text-Search` component that does not exist) and L1902;
  - Token-Resolution-Patterns L204 and L247 (two `scripts/` files that do not exist);
  - Integration Guide L699 (`product/tokens/layout.yaml`). That path is **correct**: it is in the consumer's repo.
- Under the draft's two roots, the three CDG platform blocks would also fail even though they name real files, so the draft rule fails 13 blocks and this rule 10.

**2. F-2: which blocks get compiled. My pick is neither (a) nor (b). It is (c), an import-surface check.**

- **(c), the rule.** Take every fenced block tagged `ts`, `typescript`, `tsx`, `js`, `javascript`, or not tagged. Extract only the import and `export … from` declarations whose specifier begins with `@3fn/core`. Type-check those lines alone against the built types, resolved through the `exports` map. The options are stated, because `init` writes no consumer `tsconfig` (only `tsconfig.test.json`), so the draft's default does not exist: `moduleResolution: "bundler"`, `module: "esnext"`, `strict: true`, `skipLibCheck: true`, `noEmit: true`, `types: []`. **A specifier that the `exports` map does not list is a failure, not a reason to skip the block.** The draft's wording, "imports from `@3fn/core` (or a subpath its `exports` map lists)", could be read as a filter that drops exactly the defects below.
- **Measured.** 7 blocks import from the package; none of them are in the steering docs. Under (c), 3 fail, and **all three are real consumer defects; none is noise**:
  - CDG L1108, `@3fn/core/ThemeAwareBlendUtilities` (mine). That subpath is not exported; the right one is `@3fn/core/blend`.
  - Token-Family-Blend L88, the same dead subpath (Ada's).
  - Token-Family-Layering L76, `import { zIndexTokens } from '@3fn/core'` (Ada's). `src/browser-entry.ts` has no `zIndex` export at `a95d6bf3d`. This block is also JSX in a `typescript` fence, and under (c) that does not matter.
- **Under the draft's (a), compiling whole blocks**, the same 7 blocks give 1 clean pass, the same 3 defects, and 4 failures that are noise. Three import consumer-relative files (`./src/tokens/themes/dark/SemanticOverrides.ts`, and `./themes/my-theme/SemanticOverrides` in Rosetta-System-Architecture L548 and Token-Governance L246). The fourth is a class body left partial on purpose (`this._hoverColor`). Under (a), 4 of 7 need opt-outs on day one, the ritual the § 3 counter-argument (i) warns about. **(b)** is all 257 fences, most of them in-repo code or deliberately partial. I reject it on noise alone.
- **Cost.** (c) needs `dist/**/*.d.ts` in the lane, the same as (a). `lane-functional-root` runs `npm run build` before `npm run test:scripts` (the step order in `lane-timing.yml`), and the guard throws if the files are missing (§ 2.5 keeps that). The compile itself is about 7 short files. Deliberately partial blocks need nothing, because partiality lives in bodies and an import line is never partial. A block that shows a wrong import on purpose, as a teaching contrast, takes `generic`.
- **Surviving counter-argument to (c).** A block whose imports resolve but whose body misuses the API passes, for example a wrong argument shape to `defineConfig`. For the one file kind where the body's shape is what is taught, L-1 carries it. For the others, I judge that four noise failures in seven cost more than they catch. That is a judgment, and Peter may weigh it the other way.

**3. F-1: component READMEs. My pick is (a), out of v1. The premise of (b) needs a correction first.**

- **L-4: correct the premise.** F-1 (b) says the READMEs are "(shipped, not MCP-served …)", and Ada's record item B says "Shipped but not MCP-served". **They are not shipped.** `npm pack --dry-run` at `a95d6bf3d` lists 1752 files, and the only README under `src/components` is `Icon-Base/platforms/android/res/drawable/README.md`, which `platforms/android/res/**` pulls in. `files[]` ships the component YAML and the native platform files, and no `README.md`. No MCP indexer reads them either. Their only readers are agents and people in this repo, through the file system (my charter's knowledge fallback greps `src/components/**`). The ballot's F-1 text should say so. Item B's wording is Ada's record, so I flag it to her rather than edit it.
- **Why (a).** The guard's scope is what reaches consumers and agents through the package and the MCP. READMEs are in-repo hygiene, a different class. If they are ever guarded, the right oracle is not the key set. It is **agreement with the component's own `.schema.yaml` `tokens:` list**, which Ada's `schemaTokenRefs.test.ts` already holds to the index. That catches a README naming the wrong key and a README naming a correct key the component does not use.
- **Item B's 24 lines get fixed regardless**, in a `src/components/**` PR of mine, as Ada's record asks; I will say which PR when I open it.
- **Surviving cost.** Until then, an in-repo agent reading a README can still pick up a retired name, such as Button-VerticalList-Item's `color.select.*` table.

**4. The opt-out marker and the pending list, from the owner's side.**

- **L-5: the marker takes a reason from a closed set of two.**
  - `<!-- example: generic -->` skips the block entirely.
  - `<!-- example: consumer -->` skips **only** path resolution. The import-surface check (item 2) and the shape check (L-1) still run.
  - Consumer-located examples are a large and legitimate class in a consumer-facing corpus (Integration Guide L699, `designerpunk.config.ts`, the `SemanticOverrides` imports). Marking them `generic` would be false, and it would fill the one count that is meant to show ritual use. With `consumer`, a consumer's own token file is still held to `defineComponentTokens` and `@3fn/core/build`, which is the teaching that matters for them.
  - The report prints the two counts separately.
- **L-6: key pending entries on content, not line.**
  - Key: doc, half, the failing string or declared path, and its occurrence index in the doc. The line number is informational only.
  - Why: under line keys, any edit above an entry shifts it, the entry reads as stale, and an unrelated PR goes red. Ada's sweep and my CDG rewrite both edit CDG above L956 and L1108.
  - The stale-entry rule ("an entry that no longer fails must be removed by the PR that fixes it") is right as drafted, and it is what makes my rewrite close its own entries.
- **Ask: the edit kind of a marker-only hunk.** § 2.3 should name the edit kind of a hunk that only adds or removes a marker on a governance path. I read it as `EXECUTION (this ballot § 2.3)`. Without that, every marker needs a ballot or an observation record.
- **Accepted cost, stated so nobody is surprised.** The suffix rule (L-3) reads tracked files, so a component rename or file move in a `src/components/**` PR of mine can turn a governance doc red. That PR then touches a governance path and becomes Peter-merged. I accept this: it is the rename sweeping its docs, and that is the guard's purpose.
- **Homes, at adoption.**
  - Mine: CDG L576, L956 and L1108 go in `.kiro/issues/2026-10-25-cdg-component-token-files-teaches-a-reference-map.md`. **I owe an append to that record before the build PR**, in its own commit under rule 9: the L956 instance, the L1108 dead subpath, and the widened fix shape. I am not making it in this commit, which by the brief touches one file.
  - Ada's: Token-Family-Blend L88, Token-Family-Layering L76, and Token-Resolution-Patterns L204 and L247.
  - Thurgood's: TDS L1556–L1902, including L1884, which shows my file kind in a shape no schema has.
  - Integration Guide L699 takes `consumer`. It is not a pending entry.

**5. Refusal conditions: what makes me withhold the file-shape half's sign-off at the build PR.**

- **R-a.** The half ships path resolution with no declared-kind shape check (L-1). The register row would then say my rule guards file shapes, and it would not.
- **R-b.** The shape predicate ships without the twin-agreement test (L-2), or it compiles or runs blocks instead of reading their syntax.
- **R-c.** The compiled half compiles whole block bodies (F-2 (a) or (b)) when Peter has not ruled for it over (c). If Peter rules (a) or (b), I follow the ruling and record this alternative in `.kiro/docs/alternative-paths-log.md`.
- **R-d.** Any part of the half passes when `dist/` or the `exports` map cannot be read, instead of throwing.
- **R-e.** My rule text (L-1, L-3, the item 2 options, L-5) appears in the build PR in a form other than byte-exact, without my R2.
- **R-f.** The pending list adopts an entry homed in a record of mine before my append (item 4) has merged.
- **R-g.** The scope reaches `src/components/**` without an F-1 ruling for it.

**Requested changes, not refusals.** L-4 (the F-1 premise), L-6 (content keys), the marker edit-kind sentence, and the F-2 wording fix in item 2 ("a specifier the `exports` map does not list fails").

#### [ADA R1]

**Verdict: ACCEPT-WITH-CHANGES** on the token-name half (§ 2.1) and on F-1/F-2. My changes are A-1 to A-7 below, and my refusal conditions are in item 6. No @ mentions were addressed to me. Lina's R1 routed four hits and one wording fix to me (item 5). I accept her L-6 content keys and her marker edit-kind ask (`EXECUTION (this ballot § 2.3)`). Every count here is mine, made with a scratch script at `a95d6bf3d`. They are **heuristic, not an instrument** (Census convention). I read this worktree at `7bc1edee6`. Its diff from `a95d6bf3d` touches only this ballot, so `governance/`, `.kiro/steering/` and `token-index/` are identical to S. The build PR's instrument re-measures, and its count is the one that counts.

**1. The predicate (A-1). The rules are my text, byte-exact. The lists are what they produce at S.**

```text
TOKEN-NAME PREDICATE, VERSION 1 (Ada's text, byte-exact)

SCOPE. Every governance/*.md except governance/classification-map.md, and the eight
.kiro/steering/*.md files that package.json files[] names.

REGIONS. Code spans and fenced code blocks as CommonMark defines them. A candidate is read
only from:
  (a) an inline code span: the whole span;
  (b) a fenced block whose info string's first word, lowercased, is in PROGRAM_LANGS: only
      the contents of '...', "..." and `...` string literals, line by line;
  (c) any other fenced block (untagged, yaml, json, text, markdown, and the rest): the whole
      line.
  PROGRAM_LANGS = ts typescript tsx js javascript jsx mjs swift kotlin kt java css scss

THE NAME SET, read from the committed token-index/{primitives,semantics,components}.yaml:
  KEYS     every key under `tokens:`;
  CHANNELS every value of a `channels:` map (the OKLCH hue, lightness and chroma names).
Derived from KEYS at run time, never hand-kept:
  FAMILIES the first segments of the dotted keys;
  STEMS    the leading lowercase word of each undotted key that ends in three or four digits.
Hand-kept, changed only by a version bump:
  RETIRED_FAMILIES = spacing
  It names a family the index does not have and docs were measured using. The test asserts it
  shares no member with FAMILIES.

CANDIDATE. Each match of this JavaScript pattern, with FAMILY the alternation of FAMILIES and
RETIRED_FAMILIES and STEM the alternation of STEMS, longest first:
  (?<![A-Za-z0-9_$./\-])((?:FAMILY)(?:\.[A-Za-z0-9]+)+|(?:STEM)(?:[A-Z][a-z]*)*[0-9]{3,4})(\*?)(?![A-Za-z0-9_(\-])
Group 1 is the candidate. Group 2 marks a glob.

RESOLUTION. The first rule that holds decides. Exact and case-sensitive; no case-folding, no
notation normalization, no allowlist of names.
  0 retired    its first segment is in RETIRED_FAMILIES: it fails (or rule 6 applies);
  1 glob       group 2 is "*", and some key in KEYS starts with the candidate;
               a glob that rule 1 does not resolve fails;
  2 key        the candidate is in KEYS;
  3 channel    the candidate is in CHANNELS;
  4 namespace  the candidate followed by "." is a prefix of some key in KEYS (space.inset);
  5 dtcg-path  the candidate is <f>.<rest>, with <f> in FAMILIES and <rest> in KEYS
               (color.green500, the DTCG alias form);
  6 file-name  the candidate ends in .ts .tsx .js .jsx .mjs .cjs .md .yaml .yml .json .swift
               .kt .css .html .sh. It is counted as a file name, not as a token;
  otherwise it fails.

REPORT. "<N> candidates; <R> resolve (<k> key, <c> channel, <n> namespace, <d> dtcg-path,
<g> glob); <f> file names; <M> opted out; <P> pending". It never says the docs are correct.

A version bump is any change to SCOPE, REGIONS, PROGRAM_LANGS, RETIRED_FAMILIES, the
pattern, a resolution rule or the derivation of FAMILIES or STEMS. Ada decides it, with a
re-measured count.
```

- **Why the lists are derived, not decided (fold-back).** I first wrote FAMILIES and STEMS as fixed lists pinned to the index by a twin test. The counter-argument: a token PR that adds a family would turn a test red in `scripts/governance-examples/**`, a path its author cannot write. Derived lists remove that coupling. A new family's names in docs simply become candidates. The rules are the artifact. The 23 families and 24 stems they produce at S are illustrative, as the banner guard's "18 of 83" is. The one hand-kept list is RETIRED_FAMILIES (`spacing`). It is backed by an instance (below).
- **What is excluded, and how.** CSS custom properties (`--color-…`) have no dot, and a hyphen comes before them. Platform constants and property paths (`DesignTokens.size700`, `theme.colorFeedbackSuccessText`, `MaterialTheme.typography.h1`) have a dot before them. Android names (`space_100`) do not match. Undotted names with no digits (`radiusMax`, `fontFamilyBody`, `gridGutterSm`) are not candidates. I measured that form and dropped it: its 16 failures were all identifiers or correct iOS names (`densityValue`, `tapAreaValue`, `radiusNone`). Unquoted identifiers in a program block are not read (Swift `spaceInset100`, `shadow.offset`). That costs nothing at S and removes 19 noise hits (6 in CDG, 7 in Token-Family-Spacing, 5 in Token-Family-Shadow, 1 in Component-Primitive-vs-Semantic-Philosophy).
- **Product tokens.** They are not in DesignerPunk's index. In a consumer example they take a marker (A-3). At S, no consumer-located block in scope names a family-prefixed product token.
- **Deprecated and retired names.** The predicate does not exclude them, because they are the drift class itself (`color.select.*`, `color.error`). A deliberate mention, such as a history line, a "there is no X" contrast or a hypothetical in a checkpoint example, takes `generic` (A-3). The marker does not check a dated pointer.

**2. Measured at S (91 docs: 83 `governance/*.md` plus 8 steering docs; 1163 fences, 460 of them program blocks).**

- **1958 candidates. 1898 resolve**: 1796 key, 10 channel, 84 namespace, 7 dtcg-path, 1 glob. **4 are file names. 56 fail, in 15 docs. None of the failures is in the steering docs** (9 candidates there, all keys).
- **36 of the 56 are true positives**: a name that is not a key, taught as a current name.
  - `Token-Semantic-Structure.md` (12): L85, L150, L171, L232, L625 (`color.primary`, `color.error`); L86, L152, L233, L637 (`spacing.grouped.normal`, `spacing.related.normal`). The `spacing` hits are the four that RETIRED_FAMILIES adds, with no noise.
  - `Token-Resolution-Patterns.md` (11): L100, L133–136, L142, L179–180, L211–212 (`color.primary`, `color.secondary`, `color.success`, `color.error`, `shadow.afternoon`).
  - `Rosetta-System-Architecture.md` (5): L77, L78, L85 (`pinkL300`, `pinkC300`; the index names them `pinkLightness300` and `pinkChroma300`); L220 (`color.primary`).
  - `Transformer-Development-Guide.md` (3): L318, L324, L326 (`color.primary`, `shadow.elevation200`, `typography.heading200`).
  - `Token-Family-Layering.md` (2): L273 (`shadowBlurDepth200`, retired by Spec 089), L275 (`color.shadow.default`; `ColorTokens.ts` L34–35 says that tier was removed).
  - `Product-Token-Governance.md` L157 (`space.inset.comfortable`); `MCP-Relationship-Model.md` L225 (`color.primary`); `Test-Behavioral-Contract-Validation.md` L291 (`color.error`).
- **20 of the 56 are correct mentions that need `generic`**:
  - `Token-Family-Blur.md` L111–112 (7): pre-Spec-089 names in its History section.
  - `Token-Family-Spacing.md` L199, L488 (3), `Layout-Specification-Vocabulary.md` L78 (1), `Token-Family-Shadow.md` L124 (1): "there is no X" contrasts.
  - `Token-Governance.md` L388, L443, L446 (3): proposed tokens in a checkpoint example.
  - `DTCG-Integration-Guide.md` L117, L198 (3): DTCG group names (`glow.blur`, `glow.opacity`), which `DTCGFormatGenerator.ts` L1040–1073 emits.
  - `Component-Family-Container.md` L311, L322 (2): Card prop shorthand, which the doc itself labels "not token names".
- **Precision: 36 of 56 (64%).** Without the namespace rule, 84 more correct names would fail, mostly category names such as `space.inset` and `accessibility.focus`. Without the channel and DTCG-path rules, 17 more would fail.
- **Lina's raw list, compared.** Four of her lines are outside the predicate, and item 3 names each one. `a-vision-of-the-future.md` L213 and L418 and `Token-Semantic-Structure.md` L691 are prose, outside any code span. `Token-Resolution-Patterns.md` L218 is a platform path, `DesignTokens.color.primary`. Her other lines are all in the 36.

**3. The under-inclusion limit (A-2). This is the convention's own text, and it goes into the module header beside the predicate, byte-exact.**

```text
UNDER-INCLUSION LIMIT (declared here, in the predicate's own text).

This predicate is lexical. A pass is evidence that the strings it selects are names the
committed index carries. It is not evidence that a doc names the right token for its use.
A run with zero failures is evidence about this predicate, not about the docs. It does not read:
  - prose outside code spans and fences, or indented code blocks (known at version 1:
    a-vision-of-the-future.md L213 and L418, Token-Semantic-Structure.md L691, "color.primary"
    in plain text);
  - names whose first segment is not in FAMILIES or RETIRED_FAMILIES (bodyMd, colour.primary),
    undotted names without three or four trailing digits (fontFamilyPrimary), names on a
    stem the palette lacks (blue500), and component tokens in display case
    (ButtonIcon.inset.medium);
  - platform identifiers (DesignTokens.radius.input, theme.colorPrimary, --color-primary).
    A dot or a hyphen comes before them, so they are not candidates, and a wrong platform name
    passes (known at version 1: platform-implementation-guidelines.md L145, L156, L310, L321;
    Token-Resolution-Patterns.md L218);
  - unquoted identifiers in a program block;
  - governance/classification-map.md, whose rows quote names as they were found;
  - any doc outside SCOPE, including component READMEs.
It also resolves more than keys. A namespace (color.feedback.select), a DTCG path whose tail
is a key, and a glob prefix all pass. So a namespace taught as if it were a token passes, and
so does a DTCG alias with a stale value (known at version 1: MCP-Integration-Guide.md L237,
"{color.green400}" for color.feedback.success.text, which the index maps to green500).
```

**4. Changes to the draft.**

- **A-1. § 2.1 carries the predicate in item 1.** The predicate replaces "Shape of the predicate" and "The key set". It departs from `schemaTokenRefs.test.ts`'s exact-key-only rule on purpose. A schema's `tokens:` value is a reference, so it must be a key. A doc also names namespaces, globs, DTCG paths and channels, correctly. No case-folding, no normalization and no allowlist of names still holds.
- **A-2. The limit text** in item 3 goes into the module header, as the banner guard's does.
- **A-3. The markers on the token-name half.**
  - `<!-- example: generic -->` skips the half.
  - `<!-- example: consumer -->` does **not** skip it, which fits Lina's L-5 ("skips only path resolution"). A consumer example still has to name DesignerPunk's keys correctly. A product token in a consumer example takes `generic`.
  - I propose no third `retired` value. There is one site at S (Blur L111–112), and the closed set stays at two.
- **A-4. The token-name half's report line** is the one in item 1.
- **A-5. One equality test**: RETIRED_FAMILIES shares no member with FAMILIES. If a retired family comes back into the index, it must leave the list.
- **A-6. Homes.** All 56 failures go pending in `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md`, keyed per Lina's L-6: doc, `token-name`, candidate, occurrence index. My sweep PR removes them. It fixes the 36 and puts markers on the 20. For a doc I do not own, its owner reviews the text, as the record's fix shape says.
- **A-7. The scope excludes `governance/classification-map.md`.** Its three hits are the hypothetical `opacity112` (L253) and `color.primary` quoted from past findings (L579, L601). That is ledger text, and by Peter's 2026-10-19 class principle a ledger keeps the text as found. The doc is Thurgood's. If he keeps it in scope, those three go pending and take `generic`, and the scope line drops its exception (a version bump before adoption costs nothing).
- **§ 3 residual 1 gets its instance**: MCP-Integration-Guide L237 passes and is stale.

**5. F-1 and F-2.**

- **F-1: I agree with Lina: (a), READMEs out of v1.**
  - I confirmed her L-4 premise independently. `files[]` has no `README.md` pattern. `npm pack --dry-run --ignore-scripts` in this worktree (705 files, with no `dist/` built) lists one README under `src/components`, `Icon-Base/platforms/android/res/drawable/README.md`, the same as her 1752-file run.
  - Her oracle for READMEs is the better one: agreement with the component's own `.schema.yaml` `tokens:` list. That list is already held to the index.
  - **Surviving counter-argument**: in-repo agents still read READMEs through file-system fallback, so a retired name there (`color.select.*`) can reach an agent until her PR fixes the 24 lines.
- **F-2: I agree with Lina: (c), the import surface only.**
  - From the token side: both of my routed defects (Blend L88, Layering L76) are import-surface defects, and (c) catches both.
  - The names that matter in a TypeScript body are string literals, and region (b) of my predicate already reads those without compiling. So (c) plus the token-name half covers what (a) would, without (a)'s four noise failures out of seven.
  - **Surviving counter-argument**: (c) passes a body that misuses an export it imports correctly. For example, `zIndexTokens['zIndex.modal'].value` would pass, if the export existed, even with the wrong shape. And (c) needs `npm run build` to run before `test:scripts` in `lane-functional-root`. That ordering stays load-bearing, and a missing `dist/` must throw.

**6. Refusal conditions: what makes me withhold the token-name half's sign-off at the build PR.**

- **R-1.** The predicate or the limit text appears in a form other than byte-exact, or without a `PREDICATE_VERSION` constant, and without my R2.
- **R-2.** FAMILIES or STEMS ships as a hand-kept list, or RETIRED_FAMILIES ships without the equality test (A-5).
- **R-3.** Resolution adds a rule beyond 0 to 6: case-folding, normalization, or an allowlist of names.
- **R-4.** The guard reads anything other than the committed `token-index/` for its name set (`src/tokens`, `dist`, a regenerated index), or it passes when the index cannot be read instead of throwing.
- **R-5.** The report claims more than item 1's line, or the test lacks red cases for: `color.primary` in a span, `'space.inset.comfortable'` in a `ts` string, `color.select.*` as a glob, and `spacing.grouped.normal`. It also lacks green cases for: `--color-primary` and `DesignTokens.size700` (not candidates), `space.inset.*` and `space.inset` (glob, namespace), `pinkLightness300` (channel), and `{color.green500}` (dtcg-path).
- **R-6.** A pending entry is homed in my record before the record carries the vetted list. My append, in the commit after this one, does that.
- **R-7.** `consumer` skips the token-name half.

**Cost, re-stated.** The predicate and its measurement are done (this entry). My sweep PR covers 36 corrections and 20 markers across 15 docs, plus the four routed hits (item 5 of the record append). It is Peter-merged, with one `**Edit kind**:` line per file.

#### [STACY R1]

**Role: census reader (README § "Conventions", "Instrument census") and the future reader of this instrument in the claims passes.** **Verdict: the census is not yet VALID.** The exempt line's ground holds; its count slot and one missing edit-site line are returned for weaving (S-1, S-3). Everything else is ACCEPT-WITH-CHANGES (S-2, S-4 to S-9). No @ mentions were addressed to me. I read the draft at `7bc1edee6` and Lina's and Ada's R1 at `87b994e59`. My counts are mine, made at `a95d6bf3d`, and are **heuristic, not an instrument**. `main` is now `a19481725`. Between the two, the diff touches no fence line and no `@3fn/core` line in `governance/`, `.kiro/steering/` or `token-index/`, so none of the counts below moved. I audit; I do not write criteria or text, so each change below is a finding for Thurgood to weave or reject.

**1. The census lines.**

- **Exempt line: the ground is right; the grammar is not.**
  - *Ground.* Ground (1), "the instrument does not exist at `a95d6bf3d`", holds, and still holds at `a19481725`: `scripts/governance-examples/` is absent. No registered instrument covers the new check, so there is no digest to reproduce.
  - *Reproduced.* The token-index key set is 443 (217 primitives, 193 semantics, 33 components). 11 docs in scope name `@3fn/core` (none in steering). The eight steering docs are exactly the eight in `package.json` `files[]`.
  - *Not reproduced as written: 258 fences.* 258 is the count of lines opening a `ts`/`typescript` fence. A fence-pairing parser gives **257**. The difference is `governance/Token-Family-Layering.md` L358–L371: a ` ```typescript ` example nested inside a ` ```markdown ` fence. Lina's "257" is the paired count. The guard's fence parser has to say which it uses, because the nested block is a candidate under one reading and content under the other. Ada's predicate says "as CommonMark defines them", which gives 257. The ballot should say so once, in the instrument's text.
  - *Grammar (S-1).* The form is `ran: <input actually run, or none>; count: <hand count labelled heuristic, or no count>`. The draft puts the numbers in `ran:` and writes `count: heuristic, no instrument`, which is a label with no count. At application, "an exempt item's application run is compared with its count" (README, "Re-runs"). As written there is nothing to compare, so the re-run cannot stop the item. The count slot should carry the hits the pending list will start with, per half, with the parse rule: Ada's 56 failing of 1,958 candidates over 91 docs (36 true positives, 20 needing `generic`); Lina's 10 failing declared paths (CDG L576 and L956 also fail her L-1 shape rule) and 3 failing `@3fn/core` import lines.
- **The three `not in scope` lines.**
  - `check-section-citations`: right. Its citing roots are `governance/`, `.kiro/steering/` and `canonical/`. The claim "the new row carries no citation" is a property of text not yet written, so it is checked at the build PR with a grep of the row. It is not a reason to change the line.
  - `122-diff-guard`: right. `governance/` is an input-closure root, and the edit is an ordinary input.
  - **The in-lane registry line (S-2): keep it, change its ground.** "The additivity predicate holds by construction" is the P1b *PR-time read* (mine, at ARMING), not a fact about the instrument's verdict surface. The entry is an ordinary input that the check must select, which is the wording the 2026-10-20 ballot's own census lines use ("an ordinary input"). One more observation: `check-in-lane-guards` is named in no register row's `checks` (0 hits); the register mentions the registry only inside one row's prose scope string. Whether it is a "registered instrument" is therefore arguable, and the line costs nothing, so I would keep it with the corrected ground. No dispute to Peter.
- **Items in the measure's scope with no census line, or no edit-site line.**
  - **The marker is a missing edit site (S-3).** The Amends list says "No edit to any governance doc's text". Lina's L-5 puts Integration Guide L699 under `consumer` and says "not a pending entry", and Ada's sweep PR adds 20 `generic` markers. Those are governance-path hunks. Either the build PR applies the L699 marker, and the Amends list names it as an edit site, or L699 goes on the pending list. The draft does both of neither. This is a finding on the draft, not a census-line defect.
  - **Edit kind of a marker-only hunk.** I read it as Lina does, `EXECUTION (this ballot § 2.3)`, if § 2.3 says so in one sentence and adds one condition (S-6 below).
  - **The pending list as a record.** It needs no census line of its own: it is part of the instrument that ground (1) exempts, and its starting size belongs in the count slot (S-1).
  - **A census mode (S-4).** The register row will be `proposed`, so the instrument becomes registered at the build PR. Ada's predicate says a version bump is "decided by Ada with a re-measured count", and that re-measured count is a census. Ballots on the predicate or Lina's rule will then be presumptively in scope (condition 3). I ask the build PR to write the row's optional `census:` field with a census mode that prints one sorted line per doc (`<doc>\t<candidates>:<failing>:<opted out>`), since the guard already enumerates per doc. Without it, the first bump takes ground (2) with `census: none — <why>`, and the re-measure is a hand count, which the convention says never substitutes. If the owners decline, `none — <why>` in the owner's words is lawful; I record it.
  - **Classification-map.** Ada's A-7 removes `governance/classification-map.md` from the token-name scope. The register row for this guard therefore sits in a doc the token-name half does not read. I accept the ledger-text reason. Two requests: say whether Lina's half also excludes it (S-5), and state the exclusion once, in the instrument's text, so the report cannot read as "all of `governance/`".

**2. What the guard makes checkable for the claims pass, and what it does not.**

- **Becomes mechanical at a stated SHA.** The claims "no served doc teaches a non-key token name" (the #471/#472 named-site fix; Ada's sweep PR), "every declared path resolves", "every token-file example calls `defineComponentTokens`" and "every `@3fn/core` import line type-checks" were all trust-the-reported-result in an Evidence cell. They become a command the pass can run at `git show <S>`, with the report line pasted. The import half needs `npm run build` first. If the pass cannot build, the row is `not re-verified — toolchain unavailable`, never a ✅.
- **Does not become checkable (carried into the claims pass as judgment).**
  - Right key, wrong token for the use. Ada's own instance already passes: MCP-Integration-Guide L237, `{color.green400}`, stale against the index.
  - Namespaces, DTCG paths and globs, which resolve although they are not tokens (84 namespaces at S).
  - Prose outside code spans, and indented code blocks.
  - A block with no declared path, or a token file shown without the shape.
  - What a doc says a file is *for*. CDG L571 and L669 ("defines which tokens the component uses") are prose, and only the rewrite fixes them.
  - Platform identifiers, a wrong one included.
  - Docs outside scope. READMEs are out; so are shipped surfaces `docs/consumer/*.md`, `family-guidance/`, `experience-patterns/`, `layout-templates/`, `design-language/`, `src/cli/templates/` and the shipped agent prompts (`dist/consumer-canonical`). A crude inline-span pattern of my own found 0 non-key family-first names in those at `a95d6bf3d` (heuristic, not Ada's predicate), so this is a boundary, not a finding.
  - The oracle itself: the guard agrees with the committed index and cannot know the index is right.
  - A marker's truth. Opted-out strings are not read.
- **The under-inclusion limit I would want in the convention's own text.** Ada's A-2 text is good and goes in byte-exact. I ask for these sentences beside it, covering the whole module and not only the token-name half:

```text
A pass is evidence that every string and path the guard selected, in the docs it scans, resolved against the committed index, the tracked files and the built types. A pass with P pending entries is not a clean corpus: the P strings fail and are not read as passing. A string under an <!-- example: ... --> marker is not read, and the marker is the author's assertion. Surfaces that ship but are not scanned include docs/consumer, family-guidance, experience-patterns, layout-templates, design-language, src/cli/templates and the shipped agent prompts. Presence is not correctness: a real key that is the wrong token passes, and a doc that says what a file is for is read by no part of this guard.
```

- **The report line (S-7).** It is the claims pass's emission to read, as `promised-artifact-exists` will be for artifacts. Two requests. (a) The opt-out count prints split by value and with the subset that would fail: `M opted out (g generic, c consumer; K would fail if read)`. At S, Ada's sweep puts 20 correct-but-non-key mentions under `generic`, so K starts at about 20 and growth in K is the signal. Without K, the total can rise on hypotheticals and read as innocent. (b) The guard is runnable as a command that prints the report at a given SHA, as `scripts/audience-banner/predicate.ts` is, so the pass does not depend on a CI log it cannot read.
- **A charter note.** My counting block is a closed list. If this ballot wants the pass to read the report, a counting-block line (opt-outs by value and K, pending against baseline, predicate and rule versions, the spot-check fraction) is a charter edit, LAW under `canonical/agents/**`. It is Thurgood's to draft and Peter's to ratify. Without it the read is optional, and I will still do it as a courtesy line. I name it so the ballot does not rest the marker count's visibility on a duty that does not exist.

**3. The pending list as a claims instrument.**

- **Shrink-only: half enforced, half not.**
  - Mechanical: a new hit not listed fails, and an entry that no longer fails is stale and fails.
  - Not mechanical: **growth of the list.** The guard reads whatever the committed file says, so a PR that adds a line to `pending.json` turns its own hit green. "No PR adds an entry after adoption, except by a ballot that names it" is law with no instrument behind it.
  - **A second laundering route is the marker, and it is the planned one.** Ada's sweep closes 20 of 56 entries by adding `generic`. The entry leaves the list (the list shrinks), nothing is fixed, and the total opt-out count rises. The list and the marker count can only be read together.
- **What I ask for (S-8), in order of cost.**
  - *Cheapest:* `pending.json` carries a header `adopted: <sha> <date>; entries: <N> (token-name <a>, file-shape <b>, import <c>)`, and the test asserts `entries.length <= adopted count`. A new entry then needs two edits, one of them to a number named as the adopted baseline. It raises the cost of laundering and does not prevent it.
  - *Detection:* put `scripts/governance-examples/**` on the instrument-path list of the 2026-10-17 ARMING trigger. Today the list names the checkers and sweeps, and this path is on none of them, so a PR that weakens this guard fires nothing. The trigger text I carry says so ("nothing else fires on a weakened checker that leaves the required-check set unchanged"), and RELEASE is the backstop. Adding the path is an edit to the ballot's § 4 B list and to my charter row (LAW; Thurgood drafts, Peter ratifies). With it, my read of such a PR is: `git diff --numstat` additions to `pending.json` are 0 (entries added = a finding on the author, routed to Peter as an unadmitted weakening); deletions are matched one-for-one to a fixed string or a marker named in the PR body; deletions under `__fixtures__/**` and the test are 0; the PR body cites the fixture run. This is audit, never a gate.
  - *Counter-argument, run against my own ask.* The ceiling is a number someone edits next to the entry they add; the ARMING read is post-merge, after the entry has gone green. Neither prevents anything. What survives: **growth is detectable, not preventable**, and the ballot should say so instead of "the list only shrinks". The fork between "accept detectable" and "make it preventable" is real. Preventing it needs the base-ref list in the test (`git show origin/main:…`, which needs a deep fetch in CI), and that is a cost for Thurgood and Peter to weigh. I do not pick.
- **Content keys (Lina's L-6): accepted, with three definitions the ballot should state.**
  - For the token-name half the key is doc, `token-name`, candidate, occurrence index (Ada's A-6). For the file-shape half the "failing string" has to be named per sub-check: declared path; the token-file path for the shape rule; the import specifier for the import surface.
  - Fixing the first of two identical strings in a doc shifts the second's index, so the fixing PR must rewrite one entry. This fails closed and costs the fixer one line. I accept it.
  - Each entry carries `home`, which must resolve to a committed record at the build PR's merge, and the record must hold the per-hit disposition (fix, or marker with reason). An entry homed in a record that lacks the disposition is homed in name only. Ada's R-6 and Lina's R-f guard the same thing from the owner side.
- **What "adopted" means for the RELEASE pass (S-9).**
  - *Adopted* = the register row reads `armed` at the build PR's merge M, **and** `pending.json` at M carries the header baseline above. Armed alone is not adopted: the baseline is what lets the pass compute a trend from `git show M:…` and not from memory.
  - *At RELEASE phase 1, on S:* the pass runs the guard and pastes the report line; P at S against the baseline (non-increasing, or a named ballot); the opt-out counts against the baseline measured **after** Ada's sweep merges (pending→marker conversions are expected there and each is named in her record); each remaining entry's home record is open and has a trigger. A closed home record with its entries still listed is "claimed fixed, shipped not fixed", the promised/claimed/shipped shape of my seat.
  - *What armed does not license:* a ✅ on "served examples are right". The row reads "this armed check selects these strings".
  - **A question the ballot does not ask: are pending entries shipping known-failing examples to consumers a walk row?** The 16.1.0 walk has floor-class rows for surfaces false at their reader, and a pending entry is such a surface when the string is a true positive (36 of Ada's 56). Options: (a) each true-positive entry is a walk row until closed (cost: dozens of rows at the first release, shrinking); (b) not a row; the RELEASE pass reads P and its trend, and the release notes carry the count (cost: known-wrong examples ship with a count and no per-release disposition). My lean is (b) while P is falling, and (a) for any entry still present two releases after adoption. This is Peter's to rule; I do not pick, and I ask for it as F-3.

**4. F-1 and F-2.**

- **F-1: (a), READMEs out.** I agree with Lina and Ada, and I confirmed the premise independently: `package.json` `files[]` has no `README.md` pattern, and `find src/components -name README.md` lists 32 files, none of them shipped except the Android resource README. The ballot's F-1 text ("shipped, not MCP-served") is wrong and should be corrected before Peter rules on it. **Surviving counter-argument:** the claims pass for any spec that edits READMEs (Lina's 24 lines) gets no guard and reads by hand. The in-repo agents also read READMEs. Lina's proposed oracle, agreement with the component's own schema `tokens:` list, is the right one when they join.
- **F-2: (c), the import surface.** I agree with Lina, and from the claims side (c) is the better instrument: one `tsc` over extracted import lines is a command the pass can re-run, and it cost the pass nothing in noise. **Surviving counter-argument:** (c) proves that an import resolves and says nothing about the body. A wrong call shape passes (Ada's `zIndexTokens['zIndex.modal'].value`). Untagged fences (249 of the 1,210) are in (c)'s population, so extraction must not match prose or trees that quote an import line; Lina measured 7 package-importing blocks at S, so the false-positive risk is measured at S and not beyond it. A block whose shape matters is carried by L-1 and nothing else. The claims pass keeps the body-misuse class as judgment.

**5. Refusal conditions at the build PR.** This seat is a post-acceptance audit and never a gate, so these are the findings I will record and the reads I will mark `not VALID`, not conditions on the merge.

- **C-a.** The PR body lacks the guard's report line at the PR's own base, or its pending counts per half differ from the ballot's exempt line (once woven per S-1) in an input unchanged since the census SHA. Per README "Re-runs", that stops the item, and the stop is the author's.
- **C-b.** A pending entry has no `home`, or its home does not resolve at M, or the home record lacks the per-hit disposition. Finding on Thurgood.
- **C-c.** `pending.json` carries no adopted-baseline header, or the test does not assert against it (if S-8's first ask is accepted).
- **C-d.** Predicate or rule text is not byte-exact (Ada's R-1, Lina's R-e) or carries no version constant. Finding on the PR author. I can read byte-exactness only against the ballot's text.
- **C-e.** The fixture set lacks any of these, which I specify and do not write: a stale pending entry goes red; a new hit absent from the list goes red; an unknown marker value (`<!-- example: other -->`) goes red; the guard throws when `dist/`, the `exports` map or `token-index/` cannot be read, instead of passing empty; **the guard throws on a zero-candidate run** (an empty scope or a broken glob must not read as green; the lane's selection floors are the precedent); a candidate under `generic` is not read but is counted in K; and a marker that precedes a fence covers only that fence (not the next one).
- **C-f.** The marker's scope is undefined for the inline form. "At the end of a line that carries an inline code span" can cover every span on that line, so a real defect can sit beside a placeholder. Either per-span or the line scope is stated, and a fixture shows a real non-key on the same line as a marked span.
- **C-g.** `check_state` flips to `armed` without `checks` naming the test, or the in-lane entry's `record` does not name the guard, or the step's line does not read `N registered in-lane guards; N selected` with N the file's entry count (the P1b reads). Those are my ARMING reads, listed so the PR author can pre-empt them.
- **C-h.** The `Edit kind` lines are missing for the register row, for any marker hunk, or for the classification-map exclusion, or a marker hunk lacks its per-marker line `marker: <doc> <string> — <reason>` in the PR body. Finding on the author, counted apart (missing vs no-authority) in the governance-edit-kind read.

**Summary of changes asked of the draft.** S-1 census count slot and the fence parse rule; S-2 the registry line's ground; S-3 the marker edit sites in the Amends list; S-4 a census mode and `census:` field; S-5 one stated scope exclusion for both halves; S-6 the marker-only hunk's edit kind, with the one condition that a marker added where a pending entry stood is named in the PR body (the entry's removal and the marker's addition are the same diff, which is how I read the conversion); S-7 the report's K and the runnable report command; S-8 the pending-list baseline header and, as a fork, whether growth is detected or prevented; S-9 the definition of "adopted" for RELEASE, and F-3 on whether true-positive pending entries are walk rows. Standards implications: none beyond the charter note in item 2.
