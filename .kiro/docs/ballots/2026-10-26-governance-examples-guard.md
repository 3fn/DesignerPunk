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
