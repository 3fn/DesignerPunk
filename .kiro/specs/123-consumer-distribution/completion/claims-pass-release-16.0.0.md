# Claims Pass — RELEASE 16.0.0: Spec 123, release 4

**Date**: 2026-10-16 (phase 1)
**Grain**: RELEASE. Release 4, the plan's fourth CHANGELOG entry (`tasks.md` § "Expected release count"). A MAJOR, for #352.
**Auditor**: Stacy
**Release commit S**: `4b940c45d9f2479453d062d0711a9a1ca7ede6b2`, the squash of PR #381, merged by Peter 2026-10-16T12:35:29Z. Its tree `cbef2f66` equals the PR head `4d7805569`'s tree. **Superseded by the Addendum on S1 = `13adf005a` (2026-10-16, end of this file): RL-11 (a) was taken, and the tag goes on S1, never on S.**
**Firing event**: RELEASE, phase 1 (RELEASE-FLOW § "The sequence" step 6): on S, after 5.1 is green (5.1 record `createdAt` 2026-10-16T12:37:22Z) and before the tag (5.2).
**State at this writing**: no `v16.0.0` tag, local or on `origin` (`git ls-remote --tags origin` lists `v15.0.0` and `v15.1.0` only). `registry.npmjs.org/@3fn%2fcore`: `dist-tags.latest` = `15.1.0`, and neither `time` nor `versions` has a `16.0.0` key. `docs/releases/16.0.0/` does not exist. **Nothing is published.**
**Release delta**: `git log --first-parent v15.1.0..S` = **35** squash commits, #347–#381. The notes' count of 33 is the same range at `c466b3e10`, before the grants (#380) and the release PR (#381).
**Population**:
- **Spec 123 parents in the delta**: Tasks 25–28 (U5, #362). CLOSEOUT already audited them (`completion/claims-pass.md`, #364). **Cited, not re-audited.** No parent in this delta is new to a pass.
- **Issue-driven PRs** (their PR bodies and records are the claims): the release-4 floor arc #366–#379, plus #352, #358–#361.
- **The release PR #381**: Ada's classification, CHANGELOG `## [16.0.0]` and `docs/releases/release-16.0.0.md`, read against the 5.1 dry-run tarball.
- **Records PRs** in the delta (#347–#351, #353–#357, #363–#365, #380): read only where a claim depends on them.
- **Cited, not re-audited**: 15.1.0's RELEASE record (`completion/claims-pass-release-15.1.0.md`, both phases), CLOSEOUT, and my seat's ARMING read #357.

> **PHASE 1 (pre-tag, pre-publish).** **5.1 is green at S** (below). **`publish-rail liveness: owed`.** Phase 2 is a dated section appended to this file. It reads the committed step-6 `.txt` (the rail result and the 6b two-registry record) at the merge of the step-6 release-record PR. If it is drafted against that PR while it is open, it ends with the merge-confirmation line.

> **Filename convention, load-bearing.** This record is `claims-pass-release-16.0.0.md`, never `claims-pass.md`. The owed-set predicate keys on `completion/claims-pass.md`, which is CLOSEOUT's and already exists (#364).

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** #381 merged before this pass ran. This record gates neither the tag nor the publish. Where a finding meets the release floor Peter ruled on 2026-10-15 (RL-11), the record names the fork for him and does not pick it.

**Standards implications: list — five new items (RS-25 … RS-29); RS-10, RS-13 and RS-14 evidenced again. § "Standards implications" below.**

**The one item to read before the tag: RL-11.** The packed `CHANGELOG.md` (Upgrading step 5) and the release notes (L19, L85) say the only generated-output change is the version header. That is not true of `DesignTokens.dtcg.json`, which also carries #368's new `deprecatedReason` text. The harm is small: one line of text in a deprecated token's metadata. But under the ruled blocking test it is now a known falsehood at its reader, and the CHANGELOG sentence is inside the tarball. Peter's fork is in RL-11.

---

## Scope

| Dimension | This pass |
|---|---|
| New parents | **0**. U5's four (25–28) were read at CLOSEOUT and are cited. Parity at S: `npx tsx scripts/check-completion-criteria-parity.ts` → `SUMMARY: parents evaluated 34, pass 34, fail 0; emissions 0; reds 0` |
| Packed artifact | the orchestrator's 5.1 dry run at S, from the main checkout (fresh clone, scripts on). I copied the tarball, re-hashed it (sha1 equal) and extracted it. Compared with public 15.1.0, re-fetched from `registry.npmjs.org` (sha1 `f4dd5caa2f2801633cf351b8f3ffaaa94f7ff620`, equal to 15.1.0 phase 2) |
| Signing-act walk | all **35** PRs in the delta; **3 acts** in 1 PR (#378): anchored 3 · FAIL 0 · record absent 0 · unanchored 0 · anomaly 0 |
| J | frame 3 of 3 non-Stacy acts; check 4 read on 2 of 2 briefs, both non-directive; **blind re-judgment not run (owed)** |
| Peter sample | `0 / 0` Stacy-signed acts in this population |
| Floor arc | the 27 rulings items and the item-8 erratum (`completion/release-4-rulings-2026-10-15.md`), and the walk write (#379) |
| Out of scope | phase 2 (the tag, 5.3/5.4, the rail, the 6b record, cold-install smoke); the GitHub Packages registry (needs auth this seat does not hold) |

---

## RELEASE-FLOW 5.1 — the dry-run tally (pasted verbatim, as handed over)

Dry run at S from the main checkout, 2026-10-16:

```text
105/105 assertions passed.
files: 1675 bytes: 6494095 pack-assert: 105/105 publish path: 16 (floor 16)
sha1: 8edc478f4262a22778dfcbe94a55c837ff6aa031
tarball /var/folders/z2/kfvx4wfj7cb3hq2gn5c7smzr0000gn/T/dp-release-RNOjHI/out/3fn-core-16.0.0.tgz (kept)
full log: <orchestrator scratchpad>/r4-consults/dry-run-16.0.0-S.log
```

**My read of the log and record** (read, not re-run):
- L1: `release-publish: dry-run of @3fn/core@16.0.0 at 4b940c45d9f2479453d062d0711a9a1ca7ede6b2 (fresh clone of https://github.com/3fn/DesignerPunk.git)`. The full SHA of S.
- `check:drift`: `✓ No package name drift detected (1523 files scanned)`. Its pattern list now includes `@*:registry` (#373).
- **Floor-closure compare** (#373, new in this release): `Wrote floor-closure.json`, then `Closure 1: 54 files checked, 0 escaping references` and `Closure 2: 54 seed files, 16 closure files, 0 bare specifiers`. The compare prints nothing when it passes; it throws `Refusal` on a mismatch (`scripts/release-publish.ts` L313–314). The run continued past it, so it passed. **Silent on pass**, recorded as such.
- `verify:token-index-clean` ran after the pack, with no error line.
- **105 `PASS` lines, 0 `FAIL`**; 16 `PASS: publish path:` lines. They include `nested roots []` for all three MCP bundles and the widened machine-path scan (#374): `no machine path in any packed text file (/Users/ | /home/ | /private/var/folders/ | <clone root> ×2)`.
- The tally line ends `publish path: 16 (floor 16)` (#373's floor). `EXIT 0`.
- `release-publish-record.json`: `mode` `dry-run`, `commit` = S, `sha1` `8edc478f…`, `fileCount` 1675, `bytes` 6494095, `checks` 105/105, `publishedTo` `[]`, `createdAt` 2026-10-16T12:37:22.366Z.

**This tarball is not the published artifact.** 5.3 rebuilds at the tag. The build re-stamps `dist/mcp/tool-manifest.json` and `dist/types/generated/TokenTypes.*`, as it did for 15.1.0, so the published sha1 will differ from `8edc478f…`. 6b's comparand is the 5.3 record. 15.1.0 phase 2 showed the difference was exactly those three files.

---

## RELEASE-FLOW step 5a — the owed-set query, run by this pass

Run at S in the worktree (branch `chore/release-16-claims-pass-phase-1` at S, clean), 2026-10-16T12:38:48Z. The pipeline is the first ```` ```bash ```` block of `.kiro/hooks/RELEASE-FLOW.md` § 5a, extracted mechanically (36 lines) and run unedited:

```text
ratification date: 2026-09-19
specs with post-ratification merge activity: 7
OWED SET:
  086-component-meta-extraction-pipeline (b, anchor c9679e48b 2026-10-13)
  121-claude-code-portability (c, anchor e3bc68a6f 2026-10-13)
  122-agent-generator (a, anchor 7fa64c6d8 2026-09-28)
  128-react-react-native-platform-admission (b, anchor 869b29722 2026-10-03)
  129-consumer-generation-completeness (b, anchor e25fd5129 2026-10-03)
EXCLUSIONS: 2 closed; 3(a) / 3(b) / 1(c) per class; K excluded as pre-ratification (no first-parent activity since 2026-09-19)
exit=0
```

**My reading (the one judgment point RELEASE-FLOW names; the definition governs). Owed set by definition: empty. Ada's read is confirmed.** Every printed row is a proxy false positive:
- **All five anchors predate the delta**: `git merge-base --is-ancestor <anchor> v15.1.0` → true for `c9679e48b`, `e3bc68a6f`, `7fa64c6d8`, `869b29722`, `e25fd5129`. The only spec the delta touches is 123: `git log --first-parent v15.1.0..S -- .kiro/specs/` names 123 alone (11 commits).
- `086` (b) and `121` (c): post-closure maintenance touches, as read at 15.1.0. No final declared unit merged after ratification.
- `122` (a): final unit #67, merged 2026-07-11. Not owed.
- `128` and `129` (b): stub charters (`design-outline.md`, `feedback/`, and for 128 one inbound; no `tasks.md`). No unit exists, so none has merged.
- **The 2 closed are 123 (CLOSEOUT `completion/claims-pass.md`, #364) and 127.** 123 left the printed set at this release, correctly.

**Ladder**: this is the **fourth consecutive** release run whose printed set needed operator correction, now on the same five shapes. 15.0.0's RS-3 fork (is a corrected proxy row a "wrong result"?) is still unruled: no record names it in `.kiro/issues/`, `.kiro/docs/ballots/` or `.kiro/hooks/`. → RS-14, evidenced again.

## RELEASE-FLOW step 5b — the arming question

**Decided; nothing is open, so this release decides nothing new.** Both halves were decided at the 2026-10-02 sitting:
- **The CI half: ARMED.** `completion-criteria-parity` became required at #292 (2026-10-03; `EXPECTED_CONTEXTS` 18 → 19). At S, `audit:coverage-map` reads `required contexts : 19`. Peter's words, verbatim on the register row: "Go with A, arm now and land the flip after the tag" (2026-10-02) and "flip now and record the gap" (2026-10-03).
- **The authoring-time half: ADVISORY.** The register row's 2026-10-02 history entry (merged by #267, `70f8fe54`, Peter-merged under the governance carve-out) records: "`.kiro/hooks/complete-task.sh`'s parity check stays ADVISORY (Peter's PR #205 note, which this same sitting was to decide, is satisfied by this entry)". #267's body names it in the `**Consulted**` line. **Precisely**: Peter's verbatim words name only the CI half. The advisory local mode rides the same recorded entry, which Peter merged. 15.0.0's phase 1 read it the same way ("`complete-task.sh`'s authoring-time check stays advisory").
- **The brief's premise, corrected**: "advisory until a Q2 sitting decides" was true until 2026-10-02. The sitting decided advisory. RELEASE-FLOW 5b's "if arming is undecided, decide it now" therefore does not fire. Re-opening the local mode would be a new question for Peter, not an owed 5b act. I route nothing to him on 5b.
- **What the sitting left behind**: `complete-task.sh` still tells its operator the opposite, at the place the operator meets it. → **RL-15**.

`verify-gate-registration.sh` was not run: it needs credentials this seat does not hold.

---

## The release delta: what this pass reads

| PRs | What they carry | Claims read |
|---|---|---|
| #352 · #359 · #360 | the breaking change, `validate_assembly` prop values, `find_docs` paging (pre-floor) | the packed artifact; their guard suites at S |
| #362 · #363 · #364 · #365 | U5, its records, CLOSEOUT, the evidence pointer | cited (CLOSEOUT); CLOSEOUT's carry, below |
| #366 | release-4 rulings record + floor grants | the 27 items and the erratum, item by item (below) |
| #367 · #368 · #369 · #372 · #375 | O-1; PR 0 + the `deprecatedReason` string; C-1; V-CLI-min; V-DOC | the packed artifact |
| #370 | the errata and records PR | CL-2/3/4/6 errata present; RL-4 docs |
| #371 | CL-1 class fix | `audit:coverage-map` at S |
| #373 · #374 · #376 | publish-path rows 1–6, law text | the 5.1 log |
| #377 · #378 | adapter write scope; V-PROF with two signing acts | the packed adapter; the walk; J |
| #379 | the walk write | below |
| #380 · #381 | grants; the release PR | the grant out-of-list read |
| #347–#351, #353–#358, #361 | 15.1.0 records, Settings ledger, ARMING, a coverage-map fix | classification spot-check |

**Grant out-of-list read, #381** (`git diff --name-only S~1 S`): `CHANGELOG.md`, `README.md`, `canonical/generated.lock`, `docs/releases/release-16.0.0.md`, `docs/tokens.css`, `package-lock.json`, `package.json`. **⊆ the union of the two grants' lists** (`.kiro/issues/2026-10-16-release-16-0-{files,lock-refresh}-grant.md`): yes. `scripts/__tests__/install-doc.test.ts` was granted and not touched; #381's body says it pins only the 15.1.0 heading. `package-lock.json` changes in exactly its two root `version` fields (`git diff v15.1.0 S -- package-lock.json`).

**Classification spot-check** (Ada: 🔴 1 · 🟡 4 · 🔵 10 consumer-visible · 🔵 18 internal = 33). Every number #347–#379 appears exactly once in the notes' lists. **The notes' "13 commits touch a literal `files[]` path" is exact**: I listed every delta PR with a changed path in the packed listing, and got #352, #354, #355, #359, #360, #362, #367, #368, #369, #370, #372, #375, #376, plus #381 (outside the 33). #377 and #378 reach the package as build output (`dist/generator/`, `dist/consumer-canonical/`), as the notes' third count says. I did not re-derive the 19-with-build-inputs count.

---

## The packed artifact against the CHANGELOG and the release notes

**File set** (1675 entries vs public 15.1.0's 1673):
- **Removed: 0.**
- **Added: 2**: `application-mcp-server/src/validation/PropValueChecker.ts` (#359) and `mcp-server/src/query/__tests__/find-docs-limit.test.ts` (#360).
- **Changed: 59** (33 under `dist/`).
- `package.json`: only `version` differs. `exports` (15 keys), `files[]` (68 entries) and `bin` are equal.
- The packed `CHANGELOG.md`, `README.md`, `docs/consumer/INSTALL.md`, `governance/Token-Family-Blend.md` and `governance/browser-distribution-guide.md` are byte-equal to S's copies (`cmp`).

| Claim (CHANGELOG `## [16.0.0]` / notes) | Read | Result |
|---|---|---|
| "Nothing else a 15.1.0 install relies on was removed: no export, no shipped file, no token" | 0 files removed; `exports`, `files[]` and `bin` equal; the eight root token files differ from 15.1.0 only as in the next two rows | ✅ |
| "No token value changed" | `git diff v15.1.0 S -- src/tokens token-index`: one line, `BlendTokens.ts` `deprecatedReason`. Packed `DesignTokens.{web.css,ios.swift,android.kt}`, `ComponentTokens.*` and `dist/browser/tokens.css`: 0 diff lines besides the version header | ✅ |
| Notes L19: "rulings item 20's 'zero token-source changes' is, precisely, 'no token value changed; one deprecated-reason string changed in #368'" | the source diff above: exactly one string | ✅ the precise reading holds; item 20's own wording is off by that string (O-11) |
| Notes L19: the string "is not written to `token-index/` or to any generated platform file … The only generated-output difference is the version in each file's header"; CHANGELOG L51 and notes L85, Upgrading step 5: "commit the header-only change" | `token-index/`: unchanged ✅. **`dist/DesignTokens.dtcg.json`: two lines differ**, `rosettaVersion` 15.1.0 → 16.0.0 and L3972 `deprecatedReason`, which now ends `…: ruled alternative, not yet implemented (Button-CTA, 16.x).` (`DTCGFormatGenerator.ts` L727 copies `deprecatedReason` into `$extensions`). INSTALL L87 lists `DesignTokens.dtcg.json` among what a consumer's `generate` writes, and the known-limitations sentence says the whole DTCG export comes from the package | ❌ **RL-11** |
| The `Input-Radio-Set` break: web `accessibility-label` → `aria-label` on `role="radiogroup"`; console warning; empty or whitespace counts as missing; SwiftUI second argument after `selectedValue:`; Compose `String`, no default | packed `InputRadioSet.web.js`: the attribute, `aria-label` and `console.warn('InputRadioSet: Missing required "accessibility-label" attribute. …')`; `_hasAccessibleName()` trims. iOS `init(selectedValue:accessibilityLabel:required:…)`; the fixed "Radio group" label is replaced (L224). Android `accessibilityLabel: String,` with no default. Schema 2.0.0 `required: true`; `multi-section-form.yaml` L53 asks for the group name | ✅ (bytes). Native: `not re-verified — toolchain unavailable` for the compile-error claims |
| `validate_assembly` fails a wrong prop value and warns on unknown or missing required props | `PropValueChecker.ts` ships; `AssemblyValidator.test.ts` 25/25 at S | ✅ (test) |
| `find_components`: "Only the tool's description changed" | #359's `application-mcp-server/src/index.ts` diff is one `description:` line | ✅ |
| `find_docs` concept mode: 20 by default, `nextCursor`, cut after ranking | `FIND_DOCS_DEFAULT_LIMIT = 20` (`QueryEngine.ts` L564); `nextCursor` in the packed `docs-mcp.js`; `find-docs-limit.test.ts` 9/9 at S. The "up to 100" bound was not read | ✅ (test); max not re-verified |
| Button-CTA's contract no longer claims `state_loading`; `contracts.yaml` 2.0.0 | `state_loading` hits: 0 in packed `contracts.yaml` (v2.0.0), `component-meta.yaml`, `Component-Family-Button.md` and `Component-Inheritance-Structures.md`. The in-repo application MCP lists Button-CTA with 5 interaction contracts and the `whenNotToUse` "In-flight async actions — no loading state yet (16.x)" | ✅ |
| Write scope: a pre-approved set plus ask-then-confirm, per target; "All 16 consumer renderings carry it; the steward renderings are byte-identical" | packed `dist/generator/consumer-entry.js`: "these paths are pre-approved", "Paths outside this set are not pre-approved: ask your human lead … only after they confirm in this session.", the Kiro and the Claude Code clauses; 0 hits for "treat paths outside this set as read-only". `consumer-profile.adapters` + `.real` 93/93 at S | ✅ |
| "(in DesignerPunk's own Kiro runs, Sparky refused to write the screen code a Leonardo spec asked for)" (CHANGELOG L31) | the runs' committed-nowhere README and capture request lines: the request was "Create a file at `src/hello.ts` …", with and without an in-session grant | ⚠️ **RL-12** |
| Leonardo `product/**` + "Where it goes"; Sparky's token line | packed `dist/consumer-canonical/agents/leonardo.md` L224 `- product/**`, L320 the pointer; `sparky.md` L167 the own-`DesignTokens.web.css` line | ✅ |
| `init` refuses off a terminal and writes nothing; `--name=` works; `--help` lines; the install guide named | **ran the packed bin** (`bin/designerpunk.js init`, stdin a pipe held open, 10 s kill timer, empty scratch dir): `{"code":1,"signal":null}`, the catalog message on stderr, 0 files written. `--help`: required-off-terminal on `--name`, `--abbreviation` and `--yes`; `--re-scaffold` listed; `--skip-components` absent; `Install guide: node_modules/@3fn/core/docs/consumer/INSTALL.md`. `init`'s closing output ends `📖 The install guide: …` | ✅ (run) |
| A `.gitignore` that `init` creates gets `node_modules/` above the block | `gitignoreRegion.test.ts` passes at S; packed `gitignoreRegion.js` carries `node_modules/` | ✅ (test). My CLI probe could not reach it: the scratch dir had no `@3fn/core` installed, so `init` skipped the block and said so |
| The born-repo refusal says what Claude Code and Kiro ask | packed bundle string: "(Claude Code asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both; Kiro asks nothing)" | ✅ |
| Install guide: restart step; TypeScript hosts; no-build page over local HTTP; joiner commits and `settings.local.json`; the 14.x pre-apply report and kept manifest (R4) | packed `INSTALL.md` L61/L210/L221, L67, L134, L223, L101; README L137 the same restart line | ✅ |
| "yours wholesale" corrected (CLOSEOUT OB-6) | 0 hits in packed `INSTALL.md` and the Integration Guide | ✅ OB-6 closed |
| Browser guide: "six of the names they used did not" exist | names in the guide absent from packed `dist/browser/tokens.css`: **six at `v15.1.0`** (`--border-border-default`, `--color-error`, `--color-primary`, `--color-success`, `--color-surface`, `--typography-heading-lg-font-size`), **zero at S** | ✅ |
| Served-doc corrections: no home path in `Process-Cross-Reference-Standards.md`; Opacity "Section Revised" line | 0 `/Users/` hits; `Token-Family-Opacity.md` L12 `**Section Revised**: § Disabled States revised 2026-09-18 (#170)`, L385 the `state_loading` line | ✅ |
| The scope sentence | `grep -cF` of the full paragraph: 1 in packed `README.md`, 1 in `INSTALL.md`, 2 in `CHANGELOG.md` (15.1.0's and 16.0.0's entries), 1 in the notes and in the Integration Guide at S | ✅ |
| Known limitation: the token-source read list is the read-site inventory's | `TokenReadSiteInventory.test.ts` passes at S | ✅ (test); the sentence itself is not checked by the test, as the notes say |
| Known limitation: `blend.disabledDesaturate` etc. "still deprecated, not removed"; the served docs "still say so" (notes L67) | `Token-Family-Blend.md` L31 and `Token-Family-Color.md` L187 say "scheduled for removal in the next major version". **Also, not named by the notes**: the token's own `description`, shipped in `BlendTokens.js` and as `$description` in `DesignTokens.dtcg.json` L3963 ("Scheduled for removal in the next major version."). **The CHANGELOG carries no blend line**: 0 hits for `blend`, `deprecat` or `removal` in `## [16.0.0]` | ✅ in the notes; ⚠️ **RL-13** (the record and the PR-body claim) |
| Dependency disclosure: no embedded version changed; root-only resolution; sdk 1.29.0, zod 4.3.6, ajv 8.18.0, fast-uri 3.1.3, js-yaml 4.2.0; no sdk OAuth client in any bundle; "the 5.1 dry run at S should confirm them" | 5.1: `nested roots []` ×3. The root lock at S pins exactly these five. The bundled zod version object reads `{major: 4, minor: 3, patch: 6}`, the same as public 15.1.0. `node_modules/@modelcontextprotocol/sdk/dist/*/client` module paths: 0 in each bundle. `js-yaml` in `application-mcp.js` and `product-mcp.js` only | ✅ confirmed |
| The "not exercised" line: the trio, joins, conformance and product query ran on `aa3efdcf…` (packed at `4c875235a`), which has #352 but not #359/#360 or the floor PRs; the probe candidate (`d6b6c7445`) has #352, #359 and #360 | `git merge-base --is-ancestor`: #352 → yes/yes; #359 → no/yes; #360 → no/yes; #366 → no/no | ✅ honest; it is the reach limit of this release's evidence (OB-2 carried) |

**Sample**: 23 claim groups of the CHANGELOG and notes, chosen for consumer reach. **Not re-verified, the sample did not reach**: `validate_assembly`'s warning cases and its untested value types as run behaviour (their tests pass in the gate); `find_docs`' upper bound of 100; the experience patterns beyond `accessibilityLabel` presence; the 32/34 native `scaffold` figure and the other 15.1.0 carry-overs (each names a tracked file, presence only); the notes' "67 files across 19 docs", which the notes say they did not re-count.

**The test run, and one environmental red.** In the main checkout at S (clean before and after), I ran `npx jest TokenReadSiteInventory InputRadioSet src/cli/__tests__/init.test.ts errorCatalog gitignoreRegion`: 6 suites passed, and **1 test failed**: `init.test.ts` "THE BIN, spawned the way an agent shell runs it … no hang" → `signal: "SIGKILL"`. The case spawns `bin/designerpunk.js`, which runs the built `dist/`. The main checkout's `dist/cli/init.js` is dated 2026-10-13 and does not contain #372's message, so this is the pre-#372 binary. **The packed bin, run the same way, passes** (above). This is a stale-build red, not a regression. → O-9.

---

## The release-4 floor: the rulings record, item by item

Read at S against `completion/release-4-rulings-2026-10-15.md` (27 items plus the 2026-10-16 erratum to item 8).

| Item | Due | Read at S | State |
|---|---|---|---|
| 1 (walk scope + the `node_modules/` harm row) | before the tag | the walk ran (#379); the harm row is fixed in #372 | ✅ |
| 2 V-CLI-min | before the tag | #372; the packed bin run above | ✅ |
| 3–6 V-DOC | before the tag | #375; the packed INSTALL, browser guide and Opacity rows above. Item 6's Ada claims-vs-source review is post-tag | ✅ |
| 7 O-1 | first, its own PR | #367; 0 `/Users/` in the shipped doc; pack-assert's widened scan PASS | ✅ closes 15.1.0 RL-3 row O-1 |
| 8 V-PROF + erratum (F1) | before the tag | #378; the walk below; signing briefs offer both forms (J check 4) | ✅ |
| 9 C-1 | before the tag | #369 (contract 2.0.0 and both family docs); #370 (register history line); #368 (`BlendTokens.ts`); #375 (Opacity L385) | ✅ |
| 10 CL-1 | before phase 1 | #371; `npx tsx tools/agent-generator/coverage-map.ts` at S → `audit:coverage-map: PASS (surfaces PASS · lanes PASS)`, exit 0 | ✅ closes CLOSEOUT CL-1 |
| 11 publish-path rows 1–6 | merged before phase 1 | #373, #374, law text #376; the 5.1 log above shows all six in effect | ✅ closes 15.1.0 RL-3 rows (Ada's rows, `check:drift`) |
| 12 R2/R4/R6 | waived | waiver line in the one-hop record; R4's INSTALL sentence (L101) ships; new trigger "merged before release 5's RELEASE phase 1, or a dated re-ruling" (L80) | ✅ waived in writing; **carried to release 5** |
| 13 R1-7 | waived | the CHANGELOG known-limitation line ships | ✅ |
| 14 docs-MCP delivery gaps | post-tag | disclosed in the notes; owed after the tag | carried |
| 15 bundled advisories | release 5, with a record | the notes' table; row 5 in the cannot-tell record (not re-read) | ✅ presence |
| 16 OB-1 · 17 DO-2 · 21 errata · 22 hermetic status | records PR | #370. The CL-2/CL-4/CL-6 errata are present: Task 26 header `30 listed — exists 18 · built-here 12 …` (18 + 12 = 30); Task 28 `48 listed — exists 33 · built-here 15 · missing 0 · unlisted 2`; Task 26's class now `agent-evolution`; item 13's cell quotes L7 "OBTAINED". Hermetic item 6 reads RESOLVED | ✅ |
| 18 trigger (d) | keep as is | Thurgood's note at the next ballot touch (none yet) | carried by ruling |
| 19 RS-17 practice | step 6 of this release | phase 2 reads it | owed to phase 2 |
| 20 MAJOR | ratified | Peter, 2026-10-15; #381 is the bump | ✅ |
| 23 class option A (blocking-test ballot) · 24 option B · 26 option D | after the tag / after 16.0.0 / health check 2026-10-19 + sitting | not due | carried |
| 25 / 27 option C, PR 0 before the tag | before the tag | #368; `TokenReadSiteInventory.test.ts` passes; the limitation sentence ships corrected | ✅ |

**The walk write (#379).** Its counts are 24 fixed / 4 closed / 6 waived / 28 carried, over 62 rows. I spot-checked eight cells against the merged PRs: CL-1 → #371, CL-2/3/4/6 → #370, C-1 → #369, R3-5 → #378, P-3 → #375. All eight are true. The `rebuild_index` records it lists end at #378 (03:16Z). This session's docs MCP `get_index_health` reads `lastIndexTime 2026-10-16T03:16:57.262Z`, 83 / 2517 / 333, `healthy`. The application MCP reads `lastIndexTime 2026-10-16T03:16:55.573Z`, 34 components, `staleFiles: []`. No served content changed after 03:16Z: #379–#381 touch `.kiro/issues/`, `CHANGELOG.md`, `README.md` and the release files. That is my indirect read. **Verifying the acts themselves needs the steward verb, so it is Thurgood's under the carve-out** (this is the fourth steward-verb-gated encounter; he has exercised the carve-out once, at CLOSEOUT CL-5). **The three served-doc rows carried on the steward's judgment**: → **RL-14**.

---

## CLOSEOUT's "Carried to RELEASE 16.0.0", read at S

| # | Item | Now |
|---|---|---|
| 1 | CL-1 fixed or adjudicated | **fixed** (#371; audit green at S, run by me) |
| 2 | OB-6: V-DOC before the tag, so the CHANGELOG's "is corrected to match" is true | **fixed** (#375 merged 01:22:35Z; "yours wholesale" is gone) |
| 3 | OB-2: no consumer run exercised #359/#360 | **disclosed** in the notes' "not exercised" line, verified above. Carried as the release's reach limit |
| 4 | the u5-instrument-findings walk | **done** (#379); three rows carried by judgment → RL-14 |
| 5 | Ada's publish-path rows; Lina's R2/R4/R6; hermetic item 4 | rows **fixed** (#373/#374, before phase 1; record archived RESOLVED). R2/R4/R6 **waived in writing** (item 12) → release 5. Item 4 **carried** with its written line: its trigger has not fired, because V-PROF's round recorded no hold (both assents) |
| 6 | MAJOR; the signing-act walk; J and the Peter sample | MAJOR ratified (item 20); walk 35/35; J below; Peter sample `0 / 0` |

---

## Findings

Two routes for each, additive: an explicit message to the named owner (the orchestrator relays it), and standards implications where noted. **All six are Low.** RL-11 is the one that meets the ruled release floor.

### RL-11: Low (tag-relevant) — "header-only" is not true of `DesignTokens.dtcg.json`

- **Promised** (rulings record § "The walk's blocking test", ruled 2026-10-15): "Nothing ships that the release knows is false at the place where its reader meets it."
- **Claimed**:
  - notes L19: the #368 string "is not written to `token-index/` or to any generated platform file … The only generated-output difference is the version in each file's header";
  - **packed `CHANGELOG.md` L51** and notes L85, Upgrading step 5: "If you commit generated platform output, run `npx designerpunk generate` and commit the header-only change".
- **Shipped**: packed `dist/DesignTokens.dtcg.json` differs from public 15.1.0 in two lines: `rosettaVersion` and **L3972 `deprecatedReason`**, which now ends ": ruled alternative, not yet implemented (Button-CTA, 16.x)." The generator copies the field (`DTCGFormatGenerator.ts` L727). INSTALL L87 lists `DesignTokens.dtcg.json` among the files a consumer's `generate` writes, and the known limitations say the DTCG export comes from the installed package. So a consumer who commits generated output will see a non-header line change in that file. That consumer-side diff is inferred from those two texts; I did not run `generate` in an installed repo.
- **Cause, as I read it**: the notes reasoned from the source diff ("metadata text, not a value") and did not diff the packed generated files against the previous public artifact. The figma export, the CSS, the Swift and the Kotlin files all hold: each is header-only.
- **Impact**: small. It is one line of text in a deprecated token's metadata, and no value changed. But the sentence is false where its reader meets it, and once this record lands the release *knows* it.
- **Fork, surfaced, not picked (Peter)**:
  - **(a) Fix before the tag.** Correct CHANGELOG L51 (it is packed, so this means a new release PR, a new S, 5.1 again, and a dated phase-1 addendum on the new S; this delta read carries over and only the artifact reads re-run). Correct the notes L19/L85 in the same PR. This is the only option that meets the ruled test's letter.
  - **(b) Tag S and correct the notes before step 7.** `docs/releases/` is not packed, so the GitHub release body can be true without moving S. But the files grant over `docs/releases/release-16.0.0.md` expired at #381's merge, so this needs a grant. The CHANGELOG sentence then ships false and is corrected by an erratum in release 5's entry. That needs Peter to rule it an exception, as item 13 was for R1-7.
  - **(c) Ship as is**, with the correction carried in phase 2 and release 5. This also needs an exception ruling.
- **Route**: **Ada** (the notes' and CHANGELOG's author, #381); **Peter** (the fork). → RS-25.

### RL-12: Low — the CHANGELOG states an observation the cited runs did not make

- **Claimed** (packed `CHANGELOG.md` L31): "(in DesignerPunk's own Kiro runs, Sparky refused to write the screen code a Leonardo spec asked for)". The notes L44 put it as an inference ("so consumer-Sparky refused the screen code a Leonardo spec asks for"). #377's body states it as an inference too ("a consumer-Sparky therefore refuses the screen code the Leonardo → Sparky path depends on").
- **Shipped evidence** (outside the repo, `kiro-allowedpaths-check/`; I read its README and the request line of runs 1 and 2, filtering out anything that looked like an account identifier): runs 1–4 asked consumer-Sparky to "Create a file at `src/hello.ts` …", run 2 with an in-session grant. Each was refused from the prose. No Leonardo spec was involved, and no screen code was asked for.
- **Reading**: the inference is sound. A screen under `src/` would meet the same sentence, so the fix (#377) is grounded. The defect is narrow: a CHANGELOG reader is told something was observed that was not. It is the same class as CLOSEOUT CL-6, in a shipped file.
- **Route**: **Ada** (the line's author). The vehicle is the same as RL-11's fork, or an erratum at release 5. → RS-26.

### RL-13: Low — the blend fork (a) has no committed record, #381's body misstates where it is disclosed, and its post-tag obligation has no home

- **Claimed** (#381's body): the CHANGELOG's Known limitations carry "the deprecated blend still described as 'scheduled for removal in the next major version' — disclosed, docs corrected after the tag, Peter's fork (a)".
- **Shipped**:
  1. the `## [16.0.0]` entry has no blend line (0 hits for `blend`, `deprecat` or `removal`). Only the notes carry it (L67).
  2. "Peter's fork (a)" is recorded in no committed file. The rulings record's 2026-10-16 erratum covers F1 and the adapter caveat; the walk record covers F1 and row 5 (a). The blend ruling exists only in #381's body.
  3. "docs corrected after the tag" has no tracked home: no `.kiro/issues/` record names `Token-Family-Blend.md`, `Token-Family-Color.md` or the token's `description` with an owner and a trigger.
  4. The notes name the two served docs but not the token's own `description`, which ships in `BlendTokens.js` and as `$description` in the DTCG export with the same sentence.
- **Reading**: the disclosure itself is honest. In a 16.0.0 package, "the next major version" reads as 17.0.0, which no record plans; the notes say plainly that removal "was not planned for 16.0.0". The defects are the record: authority is a record, and an obligation without a home lapses silently, which is RS-13's class.
- **Route**:
  - **orchestrator**: one dated line recording Peter's blend ruling in the rulings record, and the PR-body correction;
  - **Ada** (owner of `Token-Family-Blend.md`/`-Color.md` content and `BlendTokens.ts`): the post-tag correction gets a record with a trigger.
- → RS-27.

### RL-14: Low — three served-doc rows are carried by the steward's judgment, with no ruling on record

- **Promised** (the ruled blocking test): "served docs, MCP contracts and agent charters are fixed, not disclosed".
- **Shipped** (#379): C-3/BD-2 (S1), C-6 and C-4 are served-doc defects at a consumer agent's reader, and each row says so. For example, C-3: "the served `process-spec-planning` text still binds the Instruments block to a parser consumers do not have". Each is "Carried by the walk, not by a ruling". #379's body put them to Peter: "If you judge any false at its reader, it becomes a floor row and blocks phase 1; say so and it gets a PR." Peter merged #379 without a recorded answer.
- **Reading**: the walk was transparent and did what the rule asks of a steward. What is unrecorded is the judgment the test needs: if these rows are false at their reader, the test says fix; if they are not, nothing records why.
- **Disclosure**: **C-4 is my own seat's consumer overlay** (consumer-Stacy's owed-set query hard-codes `docs/claims-pass-adoption.md`). I do not adjudicate it.
- **Fork, surfaced, not picked (Peter)**:
  - (a) the merge of #379 is the answer: the carry is accepted, and one dated line records it;
  - (b) a merge that does not answer a question in its body is not a ruling, and Peter rules the three rows now.
- **Route**: **Peter**; **Thurgood** (the record line either way). → RS-28.

### RL-15: Low — `complete-task.sh` tells its operator the parity row is `proposed` and the Q2 sitting undecided

- **Shipped**: `.kiro/hooks/complete-task.sh` L68–77 and L610–626. The comment says "check_state: proposed — arming is Q2's decision … stays advisory until the Q2 sitting decides otherwise". **The operator-facing warning prints**: "ADVISORY ONLY — not blocking this completion (register row completion-criteria-parity is check_state: proposed; arming is Q2's decision)".
- **Truth at S**: the row reads `check_state: armed` (2026-10-03 flip). The sitting decided the local mode on 2026-10-02 (5b above).
- **Impact**: a false statement at the place the operator meets it, in the tool that runs at every parent completion. The behaviour (advisory) is correct; the reason it gives is stale. It is RS-7's class ("guards live in the command the operator runs"), turned around: the command carries a stale law statement.
- **Route**: **Thurgood** (the parity row's instrument owner, and the steward of the completion tooling's governance text). → RS-29.

### RL-16: Low — three record-form defects in the release PR

- **The lock-refresh commit** `4d7805569` (`Agent: Thurgood`): the grant requires "The refresh commit's message states the `inputClosure` before/after and that `outputs` is unchanged". The message is one subject line. The facts are true (`inputClosure` 17d62253 → 83b91e3e, `outputs` 6d3ff0a5 unchanged, read from the diff) and #381's body carries them. The commit does not. The grant's own "Source" line quotes Ada's earlier figures (b8140dd0 → 06340486), measured at an earlier base.
- **The files grant** `2026-10-16-release-16-0-files-grant.md` was copied from 15.1.0's and not fully updated. It says "Peter's go for release-3 prep", that `## [Unreleased] — planned Release 3 (…)` becomes `## [16.0.0] — … — Release 3 (…)`, lists 15.1.0's CHANGELOG additions, and says "16.0.0 needs no governance edit — the release-3 guide corrections landed in #337". The path list, which is the operative part, is right.
- **The release commit** `aef91ed1a` carries no `Agent:` trailer; the seat is named only in the subject's parenthetical "(Ada; 123)". This repeats 15.1.0 O-3 and CLOSEOUT OB-5.
- **Route**: **orchestrator** (the grant text; #380 says it mirrored 15.1.0 "with versions and paths updated"); **Thurgood** (the commit-message clause). Acknowledgement is enough. No remedy is owed beyond this record.

### Observations (not findings)

- **O-9 — a stale-build red in `init.test.ts`.** Its bin-spawn case runs the checkout's built `dist/`. Where the build predates #372, the case fails `SIGKILL` (reproduced in the main checkout at S, whose `dist/cli/init.js` is dated 2026-10-13). CI builds first, so the gate is unaffected. A local `npm test` on an unbuilt checkout reads red with a message that suggests a regression.
- **O-10 — `verify-signing-chain --ci` is not reproducible after a squash.** Run over `d0f5d3653..51d8273a7` (the squash on `main`), it reads one signing commit and FAILs link 2 (`signing commit edits outside the signer's objects`) on every authoring path, by construction: the squash fuses authoring and signing. On the PR head (`refs/pull/378/head` `9e5ede42`): `3 row(s) checked across 2 signing commit(s)`, PASS. The workflow runs `--ci` on `pull_request` only, so nothing is red. The durable post-merge re-run is `--audit --pr`, which anchored all three. → RS-10, evidenced from the other side.
- **O-11 — rulings item 20's wording** ("Ada confirms zero token-source … changes") is off by #368's one string. The notes are the correction of record; the rulings record is unchanged.
- **O-12 — the adapter caveat's record.** The brief names it Peter's ruling "(b)". The committed records (the item-8 erratum; the walk's "Rulings of the day") call it a consensus of Sparky, Lina and Thurgood grounded in Peter's six runs, and #377 was Peter-merged under the agent-config carve-out. Those two descriptions are consistent but not the same act; the record says consensus.
- **O-13 — CLOSEOUT OB-11** (the one-hop record's L4 "no grant" status line, while it carries one) is still stale. **CLOSEOUT OB-3** (the friction record's closing note and archive move) is still owed. Both are Lina's or the orchestrator's lines.
- **O-14 — README test counts** ("9,377 tests passing across 390 test suites"; #381's validation: 399 / 9,591) are still stale. This is 15.1.0's O-2, Peter's call per the grant.
- **O-15 — RL-1's class did not bite in this population, by commit order.** The V-PROF seats' first `gitBranch` (`fix/consumer-profile-release-4`) was deleted at #378's merge, and link 6 still resolved, because the fallback commit's charter matched. The instrument is unchanged since #262.

---

## Re-grounding dispositions

**Population**: the signature events committed in this delta and reachable from a merged PR's head: **#378 only, 3 events**. This is the second population after the first render: the event metrics' baseline was 15.1.0's population, so **this is the first population in which the event metrics can detect** (Req 11.5.8).

**`no-consumer-counterpart` rate (state metric; only its change is meaningful)**, over the whole profile at S (PyYAML over `git show`):

| Bucket | At S | Change from `v15.1.0` |
|---|---|---|
| `_shared` | members: ncc 1/4 | none |
| `ada` | body 0/22 · frontmatter 10/70 | none |
| `data` | body 0/34 · frontmatter 6/65 | none |
| `kenya` | body 0/33 · frontmatter 8/62 | none |
| `leonardo` | body 0/44 · frontmatter **2/97** | +1 frontmatter row (`writeScope[product/**]`, `retained`) |
| `lina` | body 0/39 · frontmatter 8/83 | none |
| `sparky` | body 0/33 · frontmatter 15/71 | none |
| `stacy` | body 0/35 · frontmatter 10/73 | none |
| `thurgood` | body 0/47 · frontmatter 19/66 | none |
| `always-set/*` (8) | body ncc 0 in each (15, 9, 9, 3, 10, 15, 9, 13) | none |
| **All** | **body 0/370 · frontmatter 78/587 · members 1/4** | the ncc count is unchanged; the denominator is +1 |

**The delta's rows** (3 re-judged): ncc 0/3. They are `leonardo` `writeScope[product/**]` (new, `retained`), `leonardo` `#step-3-specify-the-screen:preamble` (`retained` → `re-pointed`), and `sparky` `#in-scope` (re-pointed, first signature).

**Assent rate per signer on routed rows** (from history): **leonardo 2/2 · sparky 1/1**. **Refusal count: 0 issued.** **Standing refusals at S: 0 of 247 signed rows** (244 at `v15.1.0`, +3).

**Spot-check of itemized assents: 2 / 3**, both read against the packed rendering:
- sparky `#in-scope`, surviving `scope-1…scope-8`: every item is present in packed `dist/consumer-canonical/agents/sparky.md` § In Scope. scope-2 and scope-3 are there in re-pointed form: the own-`DesignTokens.web.css` line, and "(referencing each component's assembled API through the application MCP)".
- leonardo `#step-3-specify-the-screen:preamble`, surviving `specify-1…specify-7`: all seven bullets are present, followed by the "Where it goes" pointer.
- The third act, `writeScope[product/**]` (`surviving: []`, a frontmatter entry), was read for presence only (L224).

**Stacy-signed: `0 / 0` sampled by Peter.** No Stacy act is in this population.

**Full-survival assent signal**: `not yet instrumented` (`.kiro/issues/2026-09-28-full-survival-assent-signal-instrument.md`). For reference, the full-survival assents in the population are sparky `#in-scope` (8/8) and leonardo step 3 (7/7).

---

## The signing-act walk (ballot `2026-10-01-signing-act-chain` § 5.1)

**Command**, in the worktree at S, once per PR, for all 35 PRs #347–#381: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --pr <N> --store ~/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2` (with `NODE_PATH` set to the main checkout's `node_modules`, because the worktree has none). Exit 0 on all 35. The tool fetches `refs/pull/<N>/head` into `FETCH_HEAD`; no ref or branch was written.

- **0 acts**: 34 PRs.
- **#378**: 3 acts, all **anchored**, `spawnDepth 1`, `model opus`:
  - Leonardo `writeScope[product/**]` and `#step-3-specify-the-screen:preamble`, signing commit `c18a02e0`;
  - Sparky `#in-scope`, `9e5ede42`.
  - Both transcripts are this orchestrator session's subagents.
- **The authoring commit** `afe59393f` carries `Agent: Thurgood` and is not a signing act. **Thurgood's lock commit** `4d7805569` in #381 carries `Agent: Thurgood` and is not a signing act (0 acts in #381).
- **`--ci` on the PR head**: `operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)`; `signing-chain: range d0f5d365..9e5ede42 — 3 commit(s)`; `3 row(s) checked across 2 signing commit(s)`; `PASS — consistency, not identity`. This equals #378's body. On the squash, see O-10.

**Counts** (beside the per-act lines in Appendix A, never in place of them; no total is green): **3 acts — anchored 3 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0.** Post-R: 3 of 3. **No signing PR reaches this RELEASE unwalked.**

## J — the judgment sample (§ 5.2)

**Frame**: all **3** non-Stacy acts in the population.
- refusals: 0;
- flips: 0 by a signer (#step-3's disposition change is the authoring commit's);
- ≥ 1 act per non-Stacy seat per PR: 2 (Leonardo, Sparky × #378);
- one blind assent per seat per render population (full-survival preferred): Leonardo step 3 (7/7) and Sparky `#in-scope` (8/8);
- widening: none (no FAIL).

**Fraction: 3 / 3.**

**Check 4 (once per brief): 2 of 2 read, both non-directive.** This is the remediation 15.1.0's RL-2 asked for, and rulings item 8 ruled it.
- Both spawn prompts say "Nothing is pre-decided".
- Both brief files (`sign-leonardo.md` L3, `sign-sparky.md` L3) say "Nothing in this brief tells you which" and give the ASSENT and the REFUSE form for each row. Sparky's also offers DECLINE.
- Neither pre-writes a ruling paragraph.
- **Recorded, not a finding**:
  - Leonardo's spawn prompt reminds him of his own prior intent ("Your 2026-10-16 consult said you would sign F1 as drafted … judge it fresh"). That is self-prior priming, not sibling outcome.
  - Sparky's says "Peter's six Kiro runs confirmed Kiro prompts rather than denies". That is context for an adjacent change, not his row.
- The briefs live in the orchestrator's scratchpad and are uncommitted. Ballot § 8 names the brief as the chain's unassured root, and that is unchanged.

**Meta**: both transcripts are `spawnDepth 1`, `model claude-opus-5-5`, and `agentType` is the signer.

**Blind re-judgment: NOT RUN — owed.** This seat cannot spawn seats, and no packets exist. Owed now: **2 blind seats for release 4** (Leonardo step 3; Sparky `#in-scope`), plus **15.1.0's 4**, still owed (RL-2). **Proposed, as at 15.1.0**: I author the packets, the orchestrator spawns the seats, and the results land in phase 2 or as a dated addendum. The nine 15.0.0 divergents stay carried by name.

## Peter sample (Stacy-signed acts, § 5.3)

**`Peter sample (Stacy-signed): 0 / 0`** in this population. The cumulative frame since MIDPOINT is unchanged at `0 / 314`, with 15.1.0's five (including #285's `FAIL 7`) inside it. Trigger (d): "keep as is" (rulings item 18). I name the zero; I do not adjudicate my own acts.

---

## Counting block

| Item | Reading |
|---|---|
| Criteria-block omissions | **0**: parity 34/34 at S, reds 0, emissions 0. No new parent in the delta |
| Criteria vagueness | n/a (no new criterion rows) |
| Declared-none rate | n/a (no new parents) |
| Fixed-string exemptions | 0 (no emissions) |
| Bundled-claim / incomplete-decomposition; `(platforms: …)` fallbacks | 0 / 0. The native rows in this pass (the `Input-Radio-Set` compile errors) read `not re-verified — toolchain unavailable` |
| Subtask-doc presence | **spec-wide, 1 ticked subtask with no doc** (30.3). 24.3 and 31.5 were written late, from committed records, in #370 (RL-4: 2 of 3 closed). #370 says 30.3 is Lina's; 15.1.0 routed it to Thurgood. The owner is unsettled between them. Carried |
| Delegated-tier capture | no new parent docs. Errata: 1 (Task 26's class `model-evolution` → `agent-evolution`, CL-4). Spot-check: n/a |
| Orchestrator consult line | population: the **9** delta PRs touching a trigger surface (#354, #355, #362, #367, #369, #370, #375, #376, #378; #362's `tasks.md` hunk is non-checkbox), read from PR bodies via the public API. **Presence 9/9.** **`none needed` on a trigger surface: 1** (#369, "Lina owns every hunk": the author is the owner). Grammar variants: #354 (three agents in one pair), #378 (four consulted, one being Peter). **Spot-check 2/9**: #375 → Ada's and Lina's confirms as PR comments (01:16:53Z, 01:17:06Z, before the 01:22:35Z merge); #376 → Ada's confirm comment (01:20:38Z). These are PR-record traces, not committed, so **self-attested** by the rule. #354, #355 and #362 were also in CLOSEOUT's population. Never a gate |
| Re-grounding dispositions | above: the first detecting population for the event metrics, at n = 3 |
| Instruments | no new parents. CL-2's errata verified: both headers' counts now equal their blocks (26: 18 + 12 = 30; 28: 33 + 15 = 48, U 2). Pass-found gaps: 0 |
| **M3** evidence presence | unchanged from CLOSEOUT (31/31 in U5); parity 34/34 at S |
| **M4** forced-negative line | unchanged (4/4 in U5) |
| **M5** failure vocabulary | unchanged; ❌ 0 |
| Carve-out data | the fourth steward-verb-gated encounter (the walk's `rebuild_index` records). Thurgood has exercised the carve-out once across 123's passes (CLOSEOUT CL-5). Neither falsification limb fires |

---

## Method

**Run by me at S** (worktree on `chore/release-16-claims-pass-phase-1` at S; `git status --porcelain` empty before, and only this file after):
- the 5a pipeline (a verbatim mechanical extract);
- `check-completion-criteria-parity`;
- `coverage-map.ts`;
- 35 `--audit` walks;
- `--ci` on `refs/pull/378/head`, and on the squash range (O-10);
- the ncc and standing-refusal tally;
- the ancestry checks on the five owed-set anchors and the two U5 candidates;
- the grant out-of-list read; the lock-refresh diff;
- the classification and `files[]` cross-read;
- the source diffs for `src/tokens`, `token-index` and `src/generators`;
- the browser-guide CSS-name check at `v15.1.0` and S;
- the tarball copy, re-hash and extraction; the file-set, `package.json` and per-file diffs against public 15.1.0 (re-fetched, sha1 `f4dd5caa…`);
- the string greps in the packed bytes; the bundled zod version and the sdk client-module absence;
- **the packed bin**: `init` off a terminal, `init` with both flags, and `--help`, each in an empty scratch dir with `NODE_PATH` set to the main checkout's `node_modules`;
- check 4 on 2 briefs and spawn prompts (this session's transcripts, read-only);
- `get_index_health` and `get_component_health` (not withheld verbs);
- the Button-CTA summary from the in-repo application MCP.

**Run by me in the main checkout at S** (read-only; `git status --porcelain` 0 before and after):
- `npx jest TokenReadSiteInventory InputRadioSet src/cli/__tests__/init.test.ts errorCatalog gitignoreRegion` → 7 suites, 227 / 228 passed. The 1 failure is O-9, stale build;
- `application-mcp-server`: `npx jest AssemblyValidator PropValue` → 1 suite, 25 passed;
- `mcp-server`: `npx jest find-docs-limit` → 9 passed;
- `npx jest --config tools/agent-generator/jest.config.js consumer-profile.adapters consumer-profile.real` → 2 suites, 93 passed;
- `npx jest --config scripts/jest.config.js install-doc` → 62 passed.

**Read via the public GitHub API** (no credentials): the bodies and merge facts of #375–#381; the comments on #375/#376; the `Consulted` lines of the 9 trigger-surface PRs; #267's body.

**Read outside the repository**: `~/Documents/Work Projects/Kiro/u5-pack/dp-trio-runs-2026-10-15/kiro-allowedpaths-check/README.md` in full, and the request lines of captures 1 and 2 (`grep` for the request text with lines carrying `@`, "email" or "account" dropped). No identifier is copied here.

**Read, not re-run**:
- the 5.1 dry run (the orchestrator's; I read its log and record and re-hashed its tarball);
- #381's validation line;
- the `rebuild_index` acts (steward verb);
- `verify-gate-registration.sh` (needs credentials);
- the lock refresh (a re-run writes a tracked file).

**Not run**:
- the root suite;
- `generate`/`sync` as CLI in an installed repo;
- a re-pack;
- any iOS/Android toolchain (the native compile-error claims: `not re-verified — toolchain unavailable`);
- the GitHub Packages registry;
- J's blind seats;
- the Kiro captures beyond two request lines.

**Disclosures**:
- **C-4 (RL-14) is my own seat's consumer overlay.**
- CLOSEOUT (#364), 15.1.0 phase 2 (#353) and the ARMING read (#357) in this delta are my seat's records. I cite them and do not re-audit them.
- I signed no act in this population.
- The 5.1 log and tarball are the orchestrator's evidence; this record's readings of them are mine.
- The `FETCH_HEAD` writes (37 fetches) are the only git writes besides this file.

---

## Open items carried (to phase 2, or to release 5 unless resolved first)

**To phase 2**:
1. The tag `v16.0.0` on S (or on a new S, if RL-11 (a) is taken).
2. 5.3/5.4.
3. The rail result, **every run pasted** (rulings item 19).
4. The 6b two-registry record: all four sha1s must equal the 5.3 record.
5. The published bytes against this phase's tarball (expect exactly the three timestamp files to differ).
6. The cold-install smoke.
7. The merge-confirmation line, if phase 2 is drafted against the open step-6 PR.
8. RL-11's fork outcome.
9. The J blind seats (2 for release 4, 4 for 15.1.0).

**To release 5** (or earlier, if resolved first):

| Item | State at S | Owner |
|---|---|---|
| RL-1: link 6 vs deleted branches (RS-10) | **carried**: instrument unchanged since #262; did not bite here (O-15) | Thurgood |
| RL-2: J blind seats for #337's acts | **carried**: not run. The brief class is **fixed** going forward (check 4 above) | orchestrator spawns; I author packets |
| RL-3: the nine lapsed release-3 obligations | **fixed 4**: hermetic item 6 (#354), O-1 (#367), Ada's rows and the 10e widening (#373/#374/#376), the `check:drift` class (#373). **Carried by ruling or written line 3**: hermetic item 4 (trigger unfired); trigger (d) (item 18); one-hop R2/R4/R6 (item 12, waived, R1/R5 → 129 landed). **Still open 1**: RS-1/2/4 signing errata (ballot unchanged since `dff78bcde`). **Lapsed again 1**: MP-1 … MP-7 routing record (none in `.kiro/issues/`; third consecutive read; CLOSEOUT's § 7 carry listed CL rows only) | as listed; Peter for any re-ruling |
| RL-4: subtask docs | 24.3 and 31.5 **fixed** (#370); **30.3 still unwritten** (Lina per #370) | Lina (or Thurgood) |
| RL-5's class | **fixed for this release**: the walk records every `rebuild_index`, and my indirect read agrees | Thurgood (verification) |
| RL-6: P1 ARMING lapse | **carried**: no P1 merge, no `.github/**` change and no gate-list change in this delta. ARMING owed: none | me |
| The 9 J divergents (15.0.0) | **carried by name**: RS-1 has not landed | Thurgood (RS-1) |
| RS-3 / RS-14 owed-set ladder fork | **carried, unruled**; fourth instance this run | Thurgood (text), Peter (grant) |
| RS-4 (J for #222/#223) | **carried** | me / orchestrator |
| RS-13 | **in the option-D ballot** (rulings item 26; sitting after the tag). This release met its preconditions because the rulings record sequenced them, which is positive evidence for measure (iii). The post-tag obligations (items 6, 14, 19, 23, and RL-13's blend docs) still live only in the rulings record and a PR body | Thurgood, Peter |
| 15.0.0 R-1 (steward theme claims) | **carried**: record ACTIVE | its owner |
| CLOSEOUT OB-3, OB-11 | **carried** (O-13) | orchestrator; Lina |
| RL-11 … RL-16 | as routed above | as routed |

---

## Standards implications

For Thurgood. He reads the pass in full and records a one-line outcome.

- **RS-25 (RL-11)**: "Deriving the delta" (RELEASE-FLOW) derives the change from `git log` and source diffs. Nothing compares the packed generated files with the previous public artifact before the notes state what changed in generated output. The 5.1 tarball and the public tarball are both available at that point, and one `diff` over the eight root files shows the answer. The class question is where an output-diff line belongs: step 2 (notes authoring) or 5.1 (the tally). **Owner**: Thurgood (RELEASE-FLOW text), Ada (the release seat). I name the gap and do not draft it.
- **RS-26 (RL-12)**: a CHANGELOG line grounded in out-of-repo evidence ("kept outside the repository") can be checked only on Peter's machine. A committed one-paragraph digest of each such evidence set (the question asked, the runs, the result) would let a later reader check the line's precision without the raw captures. **Owner**: Thurgood, with Peter (what may be committed).
- **RS-27 (RL-13)**: release-prep forks ruled in chat (2026-10-16: F1, row 5 (a), the adapter caveat, blend (a)) landed in three different homes (a rulings erratum, the walk record, a PR body), and one landed in none. This is direct evidence for option-D measure (i) ("a ruling or pass that creates an obligation files or appends an issue record in the same PR"). **Owner**: Thurgood (the option-D ballot draft).
- **RS-28 (RL-14)**: the blocking test has no procedure for a steward-judged carry of a row that meets its "fixed, not disclosed" clause. "Flagged in a PR body, then merged" is the only act, and whether a merge answers a question its body asks is undefined. This feeds item 23's `release-falsity-floor` ballot. **Owner**: Thurgood, with Peter.
- **RS-29 (RL-15)**: the 2026-10-03 flip changed a register row's `check_state`. The completion tooling's comments and its operator-facing warning, which name that state, were not in the flip's edit set. Script text that restates register state has no straggler sweep. **Owner**: Thurgood.
- **RS-10, evidenced again** (O-10, O-15): post-merge reproduction of signing evidence depends on pull refs (`--audit`), never on `main`'s squash (`--ci`) or on branch refs (link 6).
- **RS-13, evidenced again**: see the carried table.
- **RS-14, evidenced again**: the fourth run, with five proxy rows.

---

## Forced negative (this pass)

- **One packed sentence is false** (RL-11: CHANGELOG L51, "commit the header-only change"), and **the notes repeat it twice** (L19 "the only generated-output difference …"; L85, the same Upgrading step). The notes are not packed; they become the GitHub release body at step 7. **One packed sentence states as observed what was inferred** (RL-12, CHANGELOG L31).
- No other claim in the 23 sampled claim groups is false. No ❌ in any criterion row; no new parent.
- **No unverifiable claim was rolled into a ✅**: the native compile-error claims read `not re-verified — toolchain unavailable`, the GitHub Packages registry was not read, and behaviour claims verified only by tests say "(test)".
- Every walked signing act is anchored.
- The owed set is empty by definition, with five proxy rows printed.
- The 5b question is closed; its tool text is stale (RL-15).

## Surviving counter-argument to my own verdict

My verdict, "the 16.0.0 artifact matches its claims except RL-11 and RL-12", rests on three things: diffs, greps, and tests passing at S.

**First, the behaviours with the most consumer reach were not run as a consumer would run them.** These are #352's web break, `validate_assembly` failing a tree, and `find_docs` paging. They were read as strings in the tarball and as unit tests in the repo. OB-2 stands, and this pass did not narrow it: no one has run the 16.0.0 tarball as a consumer. I ran its bin's `init` and `--help` in a scratch dir, and that is all.

**Second, RL-11 was found only because I diffed against the previous public artifact.** The notes' author reasoned from source, and so would most readers. I checked the other generated files the same way, but not every claim class: for example, the bundles' behaviour beyond strings. The rate to weigh is that 2 of the 23 claim groups I read did not hold (one false on a mechanical diff, one overstated against its evidence), not that "the rest read true".

**Third, the fork in RL-11 is real, and this record cannot make it smaller.** The pass is never a gate. But the floor Peter ruled says a known falsehood does not ship, and this record makes RL-11 known. So the honest consequence is that a post-acceptance audit has put a tag-or-fix choice in front of the tag. If Peter takes (a), my phase 1 must be re-run on a new S. If he takes (b) or (c), the floor's first live test is an exception. I rated RL-11 Low on harm. Under the floor's letter, its weight is not low, and I cannot reconcile the two by choosing a severity.

---

## Phase 2 — placeholder

*To be appended as a dated section at the merge of the step-6 release-record PR (RELEASE-FLOW step 6). It reads:*
- the tag;
- the committed `docs/releases/16.0.0/publish-verification.txt`: every rail run with its exit code (rulings item 19), and the 6b record (the 5.3 record pasted, the 5.1 tally, and per registry the `time["16.0.0"]`, file count, `dist.shasum` and fetched-bytes sha1, all four equal to the 5.3 record);
- the published bytes against this phase's tarball;
- the cold-install smoke from public npm;
- RL-11's fork outcome;
- the J blind seats, if run;
- the merge-confirmation line, if drafted against the open PR.

**Until then: `publish-rail liveness: owed`.**

---

## Appendix A — signing-act walk, per-act lines (verbatim; the human-readable section of each run; the `--- machine-readable ---` JSON tail omitted)

```text
verify-signing-chain --audit — consistency, not identity — PR #347 (refs/pull/347/head = 79b50372); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #348 (refs/pull/348/head = 7b1f9953); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #349 (refs/pull/349/head = 3e3e18b1); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #350 (refs/pull/350/head = bf93bcb7); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #351 (refs/pull/351/head = 3399062a); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #352 (refs/pull/352/head = ddef6cad); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #353 (refs/pull/353/head = 2c87cac9); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #354 (refs/pull/354/head = e5ab1286); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #355 (refs/pull/355/head = 2139ce36); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #356 (refs/pull/356/head = 543312fc); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #357 (refs/pull/357/head = f55d8777); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #358 (refs/pull/358/head = 23e08ca6); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #359 (refs/pull/359/head = a0e5b010); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #360 (refs/pull/360/head = c7bbd56e); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #361 (refs/pull/361/head = 32d05123); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #362 (refs/pull/362/head = 8bae0346); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #363 (refs/pull/363/head = 1b8613e6); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #364 (refs/pull/364/head = c352ea13); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #365 (refs/pull/365/head = e2630c8b); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #366 (refs/pull/366/head = 6ce54022); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #367 (refs/pull/367/head = 496a0e6d); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #368 (refs/pull/368/head = 8173da49); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #369 (refs/pull/369/head = 0e79325c); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #370 (refs/pull/370/head = 35aef6b2); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #371 (refs/pull/371/head = 621be436); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #372 (refs/pull/372/head = a08203de); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #373 (refs/pull/373/head = 09503bc8); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #374 (refs/pull/374/head = f4e393ce); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #375 (refs/pull/375/head = 7ca5916b); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #376 (refs/pull/376/head = c5c0adce); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #377 (refs/pull/377/head = 3b36f356); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #378 (refs/pull/378/head = 9e5ede42); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
anchored — canonical/profiles/consumer/leonardo.dispositions.yaml#step-3-specify-the-screen:preamble — leonardo — c18a02e0 — transcript 315493a5-d087-42d0-8fce-bdc046647544/subagents/agent-aba4fdf0a6bbf0c50.jsonl — spawnDepth 1, model opus
anchored — canonical/profiles/consumer/leonardo.dispositions.yaml#frontmatter:writeScope[product/**] — leonardo — c18a02e0 — transcript 315493a5-d087-42d0-8fce-bdc046647544/subagents/agent-aba4fdf0a6bbf0c50.jsonl — spawnDepth 1, model opus
anchored — canonical/profiles/consumer/sparky.dispositions.yaml#in-scope — sparky — 9e5ede42 — transcript 315493a5-d087-42d0-8fce-bdc046647544/subagents/agent-ab6a1cf706d7b2cc4.jsonl — spawnDepth 1, model opus
counts (beside the per-act lines, never in place of them; no total is green): 3 act(s) — anchored 3 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #379 (refs/pull/379/head = 44fb3460); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #380 (refs/pull/380/head = f2c57882); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
verify-signing-chain --audit — consistency, not identity — PR #381 (refs/pull/381/head = 4d780556); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
counts (beside the per-act lines, never in place of them; no total is green): 0 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
```

---

## Addendum (2026-10-16) — phase 1 re-read on S1 = 13adf005a (RL-11 fork (a) taken)

**Release commit S1**: `13adf005a65d74ccf240a5c8a8b865962e5b67c1`, the squash of PR #383 (`chore/release-v16.0.0-rl11`), merged by Peter 2026-10-16T13:39:27Z; parent `308a588f3` (#382, this record). `origin/main` = S1 (`git ls-remote`, 13:44Z). **It replaces S.** Peter ruled RL-11 (a), fix before the tag, on 2026-10-16 (recorded in the rulings record's item-20 erratum).
**State at this writing**: no `v16.0.0` tag, local or on `origin` (tags end at `v15.1.0`). `registry.npmjs.org/@3fn%2fcore`: `dist-tags.latest` = `15.1.0`, no `16.0.0` in `versions` or `time` (13:44Z). **Nothing is published.**
**Firing event**: the same RELEASE phase 1, re-read on the new release commit. **This addendum gates nothing**, as the pass above gates nothing.

### What changed between S and S1

`git log --first-parent 4b940c45d..13adf005a` = #382 and #383. The union of their paths: this record; `CHANGELOG.md`; `docs/releases/release-16.0.0.md`; `.kiro/issues/2026-10-16-release-16-0-files-grant.md` (re-activation section appended); `.kiro/issues/2026-10-16-blend-deprecation-next-major-doc-correction.md` (new); `completion/release-4-rulings-2026-10-15.md` (item-20 erratum, the blend ruling line, RL-14 marked open). `git diff --name-only S S1 -- src token-index governance canonical package.json package-lock.json` → **0 paths**. No code, token, generated file, served doc, lock or charter changed. Branch commits: `a902c44b5`, `4d89605c9` (`Agent: Ada`), `c65ebd954` (orchestration record; no `Agent:` trailer, the PR body names the orchestrator).

### RELEASE-FLOW 5.1 at S1 (pasted as handed over; log and record read by me)

```text
105/105 assertions passed.
sha1:       13519dbbc58702ae94e9040655ec91caa132e8b1
files:      1675   bytes: 6494581   pack-assert: 105/105   publish path: 16 (floor 16)
record:     /var/folders/z2/kfvx4wfj7cb3hq2gn5c7smzr0000gn/T/dp-release-1fyiKs/out/release-publish-record.json
exit 0
```

`release-publish-record.json`: `mode` `dry-run`, `commit` = S1 (full SHA), `sha1` `13519dbb…`, `fileCount` 1675, `bytes` 6494581, `checks` 105/105, `publishedTo` `[]`, `createdAt` 2026-10-16T13:40:43.574Z. Log L1 names the full S1 SHA and a fresh clone. `check:drift` clean (1523 files); floor-closure `Closure 1: 54 … 0 escaping` / `Closure 2: … 0 bare specifiers`; `verify:token-index-clean` no error line; 105 `PASS`, 0 `FAIL`, 16 `PASS: publish path:` (`nested roots []` ×3; the machine-path scan). I copied the kept tarball and re-hashed it: sha1 equal, 6494581 bytes.

**S against S1, packed** (both dry-run tarballs extracted): file sets equal (1675 = 1675). `diff -rq` → exactly **4 files**: `CHANGELOG.md` (byte-equal to S1's, `cmp`) and the three build-timestamp files (`dist/mcp/tool-manifest.json` `generatedAt`; `dist/types/generated/TokenTypes.{d.ts,js}` `Generated:`), one line each. The +486 bytes are the CHANGELOG. `dist/DesignTokens.dtcg.json` is byte-equal at S and S1. This also confirms, between two of our own builds, the phase-2 expectation above: a rebuild moves exactly those three timestamp files.

### What carries over, and what I re-ran

- **Carried unchanged, because no served content, code or signing act changed** (paths above): the release-delta read (now 37 squash commits `v15.1.0..S1`; the two new are #382 and #383, read here); the parents (0 new; parity unchanged); the owed-set query and its reading; 5b; the 23-claim-group artifact table except the rows re-read below; the signing-act walk (35 PRs; **not re-run on #382/#383**: neither diff touches a signature or confirmation object, so 0 acts by inspection, not by instrument); J; the Peter sample; re-grounding dispositions.
- **Re-run against the S1 tarball**: the packed `CHANGELOG.md` and the notes at S1 for RL-11, RL-12 and RL-13; a package-wide grep for the blend removal sentence.

### RL-11: fixed at S1

- **Shipped (packed CHANGELOG L52)**: "commit what changes: the version number in each file, and, in `DesignTokens.dtcg.json`, one line of text, the deprecation reason on `blend.disabledDesaturate` (#368). No token value changed in this release." Notes L85 is the same; notes L19 now says the DTCG export carries the string as `$extensions.designerpunk.deprecatedReason`, and the Figma, CSS, Swift and Kotlin files differ in the version only (my phase-1 diff against public 15.1.0 holds for those: they are byte-equal at S and S1).
- Packed DTCG L3972 is unchanged, as expected: the fix discloses the line. "header-only" now appears once in the packed CHANGELOG, at L90, in the `## [15.1.0]` entry, where it is true of 15.1.0. 0 hits in the notes.
- O-11 (rulings item 20's wording) is **closed** by the item-20 erratum.

### RL-12: fixed at S1

Packed CHANGELOG L31: "Sparky refused to create a file at `src/hello.ts`, with and without a yes given in the session; a screen under `src/` meets the same sentence, so Sparky would refuse the screen code a Leonardo spec asks for". The observation and the inference are now separate, and the observation matches the runs as I read them. Notes L44 was the same class in the past tense (Ada's second commit) and now reads the same way.

### RL-13: each of the four defects closed at S1

1. **CHANGELOG blend line**: packed L43, under Known limitations. ✅
2. **The ruling's record**: the rulings record's "Blend ruling (2026-10-16, Peter …)" line, fork (a). ✅ #381's body is historical and unchanged; what it claimed for the CHANGELOG is now true of S1, though it was not true of S.
3. **The obligation's home**: `.kiro/issues/2026-10-16-blend-deprecation-next-major-doc-correction.md`, owner Ada, trigger `tag:v16.0.0` → one PR before release 5's phase 1. Its site list matches S1's source exactly (20 sites: `Token-Family-Blend.md` ×5, `Token-Family-Color.md` ×1, `BlendTokens.ts` ×3, the three wrappers ×3 each, `OklchBlendCalculator.ts` ×2). ✅
4. **The `description` named**: CHANGELOG L43 and notes L67 name it in `BlendTokens.js` and the DTCG and Figma exports (Figma L3140 carries it; I had not named Figma). ✅
- **The wrapper extension, and whether the disclosure is complete.** Ada found the sentence in the wrappers, a wider set than my finding named; my phase-1 read grepped the token and the docs, not the package, for the sentence. A package-wide grep at S1 for "next major" finds 15 files. Each is now either named by the disclosure (served docs; the description in `BlendTokens.{ts,d.ts,js}`, DTCG, Figma; the wrappers' `@deprecated`/`@Deprecated`/`@available` messages, web `.js`/`.d.ts`, iOS, Android) or a **code comment** of the same sentence: `dist/blend/OklchBlendCalculator.js` L25, and the web wrapper's JSDoc and comment re-bundled into `dist/browser/designerpunk.{esm,umd}.js`. **My reading: complete at the grain a reader meets (deprecation text and served docs)**. The comment-only sites are in the record by source, and the bundle regenerates from it. One unpacked site is in neither: `src/blend/__tests__/InteractionStateAudit.test.ts` L135 (a comment, "remove at the next major version"). → O-16, for the fixing PR's sweep.

### RL-14: open

The rulings record says "open — Peter's ruling (fork (a) the #379 merge accepted the carry; (b) rule the three rows now) is awaited". #383's body says the same. **I infer no ruling from #383's merge.** That would be exactly RS-28's undefined act: a merge answering a question its body leaves open. Still Peter's, with Thurgood writing the line either way.

### New finding

**RL-17: Low — two `.kiro/issues/` edits in #383 are outside both the grant list and the author's charter scope.**
- **Promised**: rule 8 (`.kiro/issues/README.md`): a grant covers "exactly those paths … An out-of-list edit is a claims-pass finding." Ada's charter `writeScope`: `src/tokens/**`, `src/validators/**`, `src/generators/**`, `.kiro/specs/**`, `docs/specs/**`.
- **Claimed** (#383 body): "`.kiro/issues/**` and `.kiro/specs/**/completion/**` records need no grant. Every touched path is on the list or is a record."
- **Shipped**: `a902c44b5` (`Agent: Ada`) creates the blend obligation record and appends the re-activation section to the files grant. Neither path is on the grant list (`CHANGELOG.md`, the notes) or in her scope. I find no written rule that exempts issue records: not in rule 8, the issues README, or a ballot (the only "needs no grant" clause is the C1 signing-act clause).
- **Reading**: the content is right, and it is what my RL-13 asked for. My route named Ada as the record's owner and no seat as its writer, so the cause is partly mine. Practice agrees with the body: in #380, Ada filed her own grant. The gap is that the practice has no written home. **Remedy**: acknowledgement only. **Route**: Ada (acknowledge); Thurgood → RS-30.

### Observations (not findings)

- **O-16 — sweep residue for the blend correction**: the unpacked test comment above; the browser bundles are derived from the listed sources. Re-grep the packed tarball after the fixing PR. That check is the release-5 phase 1 read of this record.
- **O-17 — the grant re-activated inside the PR it covers.** Rule 8 is met by its letter: activation is that merge, so "the list as it stood at that merge" is the PR's own list. The section states the deviation from the 15.1 precedent and quotes Peter's direction. The out-of-list read kept an external referent this time: #382's RL-11–13 named only these two files. In general, a list authored in the same diff it bounds makes rule 8's diff self-referential. This is RS-27's class (a direction ruled in chat, recorded only inside the artifact it authorizes). I name it and do not rule it.
- **O-18 — a same-class sentence outside the blend**: packed `src/tokens/index.ts` L322 and `dist/tokens/index.d.ts` L123: "`getAllTokens` … will be removed in v2.0" (since 2025-10-25, `a616ed790`). The package is 16.0.0. `dist/tokens/index` is not reachable through `exports` (only `.` and `./build` touch tokens), and no release claim states it. I judge it outside this release's claims. The floor's letter has no reach clause, though, so whether a known stale sentence at an unexported path is "where its reader meets it" is RS-28's question, not mine. **Route**: Ada (token source), for disposal or a line in the blend record.

### Standing, unchanged at S1

RL-15 (`complete-task.sh`'s stale `proposed` text) and RL-16 (record-form defects, incl. the files grant's copied 15.1.0 text, which the appended section did not touch); RS-25 … RS-29; RS-10, RS-13, RS-14; every row of "Open items carried", except that item 1 now reads **the tag `v16.0.0` on S1**, and item 8 (RL-11's fork) is **resolved: (a)**.
**New standards implication**:
- **RS-30 (RL-17)**: whether filing or appending an issue record (an obligation, a grant section) needs scope, and from where, is unwritten. Charters omit `.kiro/issues/**`. Rule 8 counts every out-of-list edit as a finding. Practice files records freely (#380, #383). **Owner**: Thurgood. I name the gap and do not draft it.

**Standards implications (this addendum): list — RS-30 new; RS-27 and RS-28 evidenced again (O-17, O-18, RL-14).**

### For the tag (my statement; the pass gates nothing)

On S1, every claim I re-read holds in the packed artifact and the notes. RL-11 and RL-12 are fixed in the packed `CHANGELOG.md`. RL-13's disclosure is complete at the grain a reader meets, and its correction has a home. **What remains is RL-14, which is open and Peter's.** Whether it bears on the tag is his call under the floor, not mine. RL-17 is a record-form finding and does not bear on the artifact. The 5.1 tally at S1 is 105/105, `publish path: 16 (floor 16)`, sha1 `13519dbb…`. **If a tag is cut, it goes on S1 = `13adf005a65d74ccf240a5c8a8b865962e5b67c1`; S is superseded.** 5.3's `--expect-sha` is S1.

**Surviving counter-argument**: this addendum rests on two of our own dry-run tarballs, greps and a source diff. It inherits phase 1's limits (OB-2: no one has run the 16.0.0 tarball as a consumer). RL-13's "complete" rests on grepping one phrase family; differently worded removal-schedule text would escape it. O-18 is what one widening of the phrase found. Also, I missed the wrapper sites at phase 1, and Ada found them. That is evidence my phase-1 greps were scoped to the finding, not to the sentence.

**`publish-rail liveness: owed`.** Phase 2 reads as placed above, on S1.
