# Ballot Measure: the dated-pointer rule names the paths it binds and the paths it exempts, and a check reads the Edit-kind lines

**Date**: 2026-10-29
**Drafted by**: Thurgood (Civitas steward; owner of the ballots README convention), at Peter's direction on RS-54. Peter, chat, relayed by the orchestrator, received before 2026-10-29T03:00:31Z (the orchestrator's clock), verbatim: *"Let's go class fix"*.
**Status**: **RATIFIED (Peter, 2026-10-29)**, chat, relayed by the orchestrator. Items 1 and 2, received before 2026-10-29T03:35:35Z (the orchestrator's clock), verbatim: *"Re: 1, Ratify / Re: 2, let's go with the recommendation"* — the measure ratified, and the orchestrator's reading of "Let's go class fix" (§ 2.2) confirmed: charters exempt. F-1, received before 2026-10-29T03:52:42Z, verbatim: *"B with the wording and record"* — F-1 (b), site 1 with Ada's R3 wording, and the governance-paths record filed (`.kiro/issues/2026-10-29-governance-paths-four-lists.md`). Before F-1 was ruled, Peter asked whether the (b) lean had been read by Ada; it had not, so Ada and Stacy read it (§ 8, `[ADA R3]`, `[STACY R3]`), and their corrections are applied in this Status commit (§ 6, site 1; `[THURGOOD R4]`).
**Ruled**: ratify — *"Re: 1, Ratify"*; the reading (§ 2.2) — *"Re: 2, let's go with the recommendation"*; F-1 — *"B with the wording and record"*. No question remains open.
**Required reviewer**: **Stacy**. Her charter units pay the application (§ 4), the check (B) becomes a limb of her governance-edit-kind read (site 2), and she is the census reader.
**Reviewers**: Ada (her (ii-a), the frontmatter assertion and the pointer forms); Leonardo (raised the finding; L329); Lina (the semguard fixture, and (iii)'s generator question, § 6).
**Consulted**: Stacy — RS-54 (ii), and R1: six acts, not five (her signature's withdrawal is her act), the limb into her L432 bullet, nine fixtures, census lines owed for sweep 1 on the README and for canonical-vs-truth and sweeps 1, 2, 4, 5, 6 and 8 on `stacy.md`, S4 leans (a); R2: the L432 clause true and decidable at no extra act, with `unlisted-path` given its consequence and a start point, the six acts and the order right, the census holds, F-1 (a) held more weakly, no objection to (b); R3: read the orchestrator's (b), (a) held weakly, cost measured, the four-lists record; Ada — RS-54 (ii-a), and R1: site 1 true, add `git log` to the history homes, name the forms, L28 covered; R2: a ballot citation is not a pointer (one sentence), her R1 regex passed a dateless pointer naming a dated ballot, so the date goes directly after the verb, F-1 leans (a); R3: read the orchestrator's (b), moved to (b), two premises corrected, site 1 wording; Leonardo — RS-54 follows the letter until ruled, and R1: the homes serve him, add that the changing commit names its record; Lina — R1: site 4 in her scope after site 2 and before the lock, the overlay entry out in the same commit as the row change, `retained` faithful (checked), leave (iii); Sparky — RS-54 (ii) with the homes named, (iii) named; Kenya — RS-54 (ii) with the sheets named; Data — RS-54 (ii) with the sheets named, the date tags raised
**Class**: LAW. The README sentence says which documents owe a dated pointer, and so what every governance edit must carry (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds"). Site 2's L432 clause gives Stacy a read; that is LAW too.
**Amends**:
- `.kiro/docs/ballots/README.md` § "Conventions", Edit discipline: one sentence added after "Superseded text" (§ 3 site 1). **LAW**.
- `canonical/agents/stacy.md`: three dated pointers out, at L400, L432 and L465, and one clause added to the L432 bullet (§ 3 site 2). **LAW**. **It changes bytes Peter ratified**: the three pointers are #528's text (ballot `2026-10-26-release-flow-batch-16-1` sites 12, 13 and 11), applied by #541 (`52f874275`). Ratifying this ballot is his word on that.
- Stacy's consumer profile and operative set: two overlay pins, one overlay entry out, one dispositions row to `retained` (its signature withdrawn by her), two operative items re-authored (§ 3 site 3). **EXECUTION**.
- The semguard fixture and the g1-renderings pin (§ 3 site 4). **EXECUTION**, Lina's, in her standing scope (RS-53).
- `governance/classification-map.md`: one new row, `dated-pointer-paths`, at `check_state: none` (§ 3 site 5). **EXECUTION**.
- Sites 6 and 7 (the edit-kinds path lists, F-1 (a) only): **not applied**; F-1 was ruled (b).
- `.kiro/issues/2026-10-29-governance-paths-four-lists.md`, filed in the Status commit (README rule 10): which paths are governance paths, carried to Spec 131's requirements round, as Peter ruled.
- The check (B), `scripts/completion-claims/edit-kind-pointers.ts` and its test (§ 5). **EXECUTION**, Thurgood's, in its own PR, merged before the application.
- `.kiro/issues/2026-10-29-charter-date-tags-ship-to-consumers.md`, filed with this DRAFT (README rule 10): the date-tag finding, left outside the carve-out (§ 2.4).

**Census** (re-cut at R2 after Stacy's S3; the lines for site 2 follow #493 § 6's):
- The check (B) is named in no register row's `checks`: its row is created at `check_state: none` (site 5), so it is not a registered instrument and no census line is owed for it (the `issues-owned.sh` precedent, ballot `2026-10-26-issues-multi-path-trigger-token`).
- `**Census**: not in scope — 122-sweep-1-refs (tools/agent-generator/sweeps/sweep-1-refs.ts) — it resolves the shared catalog's source ".kiro/docs/ballots/README.md § \"The Ratification Protocol (record-first)\"" (canonical/shared/shared-catalog.yaml L41) against the README; site 1 adds a sentence inside § "Conventions" and adds, removes or renames no heading, so the ref resolves before and after; in canonical/agents/stacy.md no routed heading changes, and site 2's clause adds no § ref (it names the README in the comma-quote form the bullet already uses) and one script path that exists at the application's base, since the build PR merges first`
- `**Census**: not in scope — 122-canonical-vs-truth (governanceAsLaw mustContain over the asserted sections) — site 2 edits prose in three units of canonical/agents/stacy.md and no assert declaration; no asserted section is an edit site`
- `**Census**: not in scope — 122-sweep-2-skills (tools/agent-generator/sweeps/sweep-2-skills.ts) — it reads canonical/agents/** for the skills: field only; site 2 changes no skills: field`
- `**Census**: not in scope — 122-sweep-4-ambient (tools/agent-generator/sweeps/sweep-4-ambient.ts) — it reads canonical/agents/** for routes.cues only; site 2 adds or removes no cue and no ambient member`
- `**Census**: not in scope — 122-sweep-5-corrected-state (tools/agent-generator/sweeps/sweep-5-corrected.ts) — it counts .web.tsx occurrences in canonical/agents/*.md and the generator sources; no after-text contains .web.tsx`
- `**Census**: not in scope — 122-sweep-6-declarations (tools/agent-generator/sweeps/sweep-6-declarations.ts) — it reads routes.cues and toolSubset; site 2 changes neither`
- `**Census**: not in scope — 122-sweep-8-demotion (tools/agent-generator/sweeps/sweep-8-demotion.ts) — it reads the replaces: keys of routes.cues, routes.docs and the ambient trims; site 2 touches none, and the mirror unit's move to retained removes no ambient member and no Kiro config resource`
- `**Census**: not in scope — signing-act-consistency (verify-signing-chain --ci; census mode --census-routed) — no instrument code changes, so the census mode's committed and scratch-diff runs are identical by construction; site 2 changes the bytes of three of Stacy's units, which the instrument reads as stale until her § 4 acts, and site 3 moves one unit from re-pointed to retained, its signature withdrawn by her act; all of these are the instrument's input, not its rule`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — an ordinary closure input; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`
- `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts, citing corpus governance/, .kiro/steering/, canonical/) — no site adds or removes a get_section / get_document_* citation`
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts) — site 5's new row carries no served example and classification-map.md is outside the guard's scope` *(F-1 (b): no TCP site, so the R3 note on site 7's TCP sentence no longer applies)*
- Site 4's fixtures are named by no register row's `checks`; no line is owed (Stacy R1 S3).

**Cap**: one README sentence; three pointer removals and one clause in Stacy's charter; the profile, fixture and register follow-ons; one new script and its test in its own PR. **Retroactivity**: none beyond site 2. Pointers already in served governance docs, identity docs and RELEASE-FLOW stay; legacy pointer forms stay, since the check reads added lines only. Charter amendments that never carried a pointer stay without one.

> **Conflict of interest, stated first.** I own the README convention, and the check (B) is mine to build and maintain. Stacy's review and Peter's ratification are the checks.

---

## 1. The gap (RS-54)

The ballots README's "Superseded text" sentence (*Peter, 2026-10-19*) says "a document agents read as law carries only the current text plus a dated pointer", and it names no paths. Two ratified ballots, a day apart, read it two ways for charters:
- **#528** (ballot `2026-10-26-release-flow-batch-16-1`, applied by #541) gave each charter site a pointer in canonical and a consumer removal.
- **#535** (ballot `2026-10-26-system-token-review-and-token-planning`) applied its charter sites without one: `leonardo.md` L340, `ada.md` L28, and Sparky's, Kenya's and Data's sites 8 and 8a.

At `3e2c722e6` no charter carried a pointer. At `0bee92a3e` three do, all in `stacy.md`, from #541. The fu1 CORRECTION (`fix/integration-guide-l697-leonardo-l329`) would have added a fourth, on Leonardo's L329.

The finding is RS-54 on `.kiro/issues/2026-10-26-release-16-1-standards-implications.md`, raised by Leonardo on fu1. Peter asked the seats to evaluate it before he ruled. Seven read it: Stacy, Ada, Sparky, Kenya, Data, Leonardo and Thurgood. Their R2 lines, the restated fork and Peter's ruling (R3) are on that record, on the fu1 branch at `13333ef23`.

## 2. The ruling and what this ballot reads from it

### 2.1 Peter's words

Chat, relayed by the orchestrator, received before 2026-10-29T03:00:31Z, verbatim: *"Let's go class fix"*.

### 2.2 The reading (the orchestrator's; confirmed by Peter, 2026-10-29)

The class fix is (A), the convention names the paths it binds and the paths it exempts, and (B), a merge-time check on the PR body's `**Edit kind**:` lines. The path list's content follows his standing ruling to go with the seat recommendations, and six of seven seats leaned (ii-a):
- `canonical/agents/**` exempt;
- served governance docs and identity docs bound;
- the 26 short date tags left outside the carve-out.

**Confirmed**: Peter, chat, relayed by the orchestrator, received before 2026-10-29T03:35:35Z, verbatim: *"Re: 2, let's go with the recommendation"*.

### 2.3 Identity docs: converged, not a fork

No seat leaned (ii-b), which would also exempt whole-loaded identity docs. Ada leaned against it explicitly: Core Goals' pointers (L59, L61) are applied and their unit is signed, so removing them buys no reader anything. I lean the same way. Stacy, Sparky, Kenya and Data worded their carve-out as `canonical/agents/**` alone. Site 1 binds `.kiro/steering/**`, identity docs included, and § 6 carries no fork on it.

### 2.4 The date tags: outside, filed separately

Data counted 26 charter lines matching `(ballot 20|ratified 20|Ada 20|Peter, 20` at `0bee92a3e` (re-counted by Thurgood: 26). They are provenance tags with a date and no SHA, not superseded-text pointers. Some ship to consumers (Data's L85 and L500, Ada's L414) and some do not (Ada's L320, a ballot name the heuristic catches; Ada R1).
- Site 1 says the sentence does not reach them.
- Whether they should keep shipping is a consumer-rendering question for each charter's owner, not a pointer question. It is filed as its own record (README rule 10): `.kiro/issues/2026-10-29-charter-date-tags-ship-to-consumers.md`, P3.


## 3. Edit sites (after ratification, one application PR, Peter-merged)

### Site 1 — `.kiro/docs/ballots/README.md` L31 (LAW)

**Before** (L31 at `0bee92a3e`, verbatim):

- **Edit discipline**: apply "exactly as written"; if a before-text does not match, stop on that block and report — never adapt silently. Application should end with a mechanical sweep for the edit-class (a straggler grep), not trust in the enumerated list — every count in this directory's first ballot was wrong at least once (two → three → four occurrences); the sweep caught what the lists missed. **Superseded text**: a document agents read as law carries only the current text plus a dated pointer (`amended <date> by <ballot> <item>; prior text at <SHA>`); ledgers — issue records, claims-pass records, signature sheets, completion docs — keep superseded text inline, labelled and dated *(Peter, 2026-10-19; ballot 2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form S5, F-S5-record)*.

**After** (F-1 (b), Ada's R3 wording for the README clause):

- **Edit discipline**: apply "exactly as written"; if a before-text does not match, stop on that block and report — never adapt silently. Application should end with a mechanical sweep for the edit-class (a straggler grep), not trust in the enumerated list — every count in this directory's first ballot was wrong at least once (two → three → four occurrences); the sweep caught what the lists missed. **Superseded text**: a document agents read as law carries only the current text plus a dated pointer (`amended <date> by <ballot> <item>; prior text at <SHA>`); ledgers — issue records, claims-pass records, signature sheets, completion docs — keep superseded text inline, labelled and dated *(Peter, 2026-10-19; ballot 2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form S5, F-S5-record)*. **Where the pointer is owed** *(added <application date> by ballot 2026-10-29-dated-pointer-paths-and-edit-kind-check)*: on exactly `governance/**`, `.kiro/steering/**` (identity docs included) and `.kiro/hooks/RELEASE-FLOW.md`. Its forms: `amended <date> by <ballot> <item>; prior text at <SHA>`; `added <date> by <ballot> <item>` for new text; `moved <date> from <home> by <ballot> <item>; prior home <path> L<a>–<b> at <SHA>`; and, for a CORRECTION, `corrected <date>: <what>; <record>; prior text at <SHA>`. A ballot citation (`*(ballot <name>)*`, or a ballot named in a sentence) names a source and is not a pointer: it carries no date and no prior text. In `governance/classification-map.md` a row's added `history` line is its pointer. `canonical/agents/**`, prose and frontmatter, and `canonical/shared/**`, which renders into every charter, carry none: a charter loads whole into every session of its seat, and its history lives in the ballot or record that names the site, the PR's `**Edit kind**:` line, the git history of `canonical/agents/**`, the seat's confirmation and signature sheets, `canonical/generated.lock` and the signing chain; the commit that changes a charter line names, in its message, the ballot or record that names the site. No other path owes one. This README and `.kiro/issues/README.md` owe none: an edit to the rules of either cites its ballot inline, and that ballot carries the before-text. `docs/**` and `.cursor/rules/**` restate law and are not its home. Short date tags in charters (`ratified <date>`, `<Name> <date>`) are not pointers, and this sentence does not reach them.

*Why each part:*
- `governance/**`, `.kiro/steering/**` and RELEASE-FLOW are the edit-kinds ballot's governance paths minus the charters.
- **The forms** are L31's own (`amended …`), plus the three forms in use that a check must accept: `added`, `moved` and `corrected` (Ada R1 A3). The ballot-first form (`*(ballot <name>)*`) and the mid-sentence form (Process-Spec-Planning L573, a non-conforming amendment pointer) stay where they are on `main`, but a new edit in either reads `pointer-missing` on a bound path. A ballot citation names a source and is not a pointer, and site 1 says so, so an author does not take it for the `added` form (Ada R2). A regex that accepted every historical spelling would pass the drift it exists to find.
- The register's `history` line is how every register edit has recorded itself. A pointer inside a YAML row would be a second record.
- **The git history of `canonical/agents/**`** is a home every seat can read: a `retained` unsigned unit has no sheet (Ada R1 A1).
- **The commit that changes a charter line names its record** (Leonardo R1 Le1). `git log -L` then reaches the record from every charter line, sheet or not, credential or not. *Counter, carried*: squash-merge replaces branch commits on `main`, so the rule binds the branch commit, and it holds on `main` only while the squash message keeps the PR body, as this repo's does.
- **`canonical/shared/**`** renders into every charter and loads with it, so it follows the charters (Stacy R1, Low). **`docs/**` and `.cursor/rules/**`** restate law and are not its home, so "exactly" leaves them out on purpose.

- **The two READMEs owe none** (F-1 (b)): every rule edit to either has gone through a ballot, which holds the before-text, so the ballot is the history home the charters also rely on (Ada R3). Their five dated `added` pointers stay ("Retroactivity: none").

*What it leaves*: ledgers keep superseded text inline, as the sentence before says.

### Site 2 — `canonical/agents/stacy.md` (LAW)

Each pointer is removed with the one space before it:
- **L400** (unit `#the-trigger-set-the-114-superset-table-names-never-numbers`, #528 site 12): `*(amended 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, site 12; prior text at `08b9c7a8e`)*`
- **L432** (unit `#the-claims-pass-record-claims-passmd-the-template`, #528 site 13): `*(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-40)*`
- **L465** (unit `#the-mirror-anti-rot-clause-verbatim-at-countersigned-strength`, #528 site 11): `*(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-33, with the sentence "It binds the LENS seat specifically" amended; prior text at `08b9c7a8e`)*`

**L432 also gains one clause** (Stacy R1 S2, condition 1: a duty she does not load drifts). It is inserted after "read by sample." (the sentence the pointer ended) and before "A kind you read as wrong", with one space before it:

> On the same population you run `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <n>` (`.kiro/docs/ballots/README.md`, "Where the pointer is owed"), for PRs merged at or after the merge of the PR that applied ballot `2026-10-29-dated-pointer-paths-and-edit-kind-check`: each `pointer-missing` or `pointer-on-exempt` line is a finding on the authoring agent; a `listed` line was not checked and is never read as `ok`; an `unlisted-path` line is a declared file the rule does not reach, not a finding; `unavailable` is your `not re-verified — <why>`; its reach is one verdict per declared file or range, read lexically from added lines.

Each removal leaves well-formed text (Stacy R1 S1). **Consumer renderings do not change**: L400's and L432's lines sit inside range removals keyed on their row and bullet heads, so the new clause is removed with the bullet, and L465's pointer was the mirror unit's own removal. Only `.claude/agents/stacy.md` and `.kiro/agents/stacy-prompt.md` change, plus the regenerated attribution files.

### Site 3 — Stacy's consumer profile and operative set (EXECUTION)

- **Operative items** (Thurgood): `trigger-release` (`canonical/operative-sets/stacy.yaml` L173) and `governance-edit-kind-read` (L679) quote the L400 and L432 pointers, so both are re-authored to their lines' new text. `governance-edit-kind-read` takes in the new clause; whether that clause is a separate item is Stacy's call at her re-confirm. `mirror-binds-release-read` never carried its pointer and stays as it is. Each unit's `canonicalHash` is Stacy's (§ 4).
- **Overlay** (Thurgood): in `canonical/profiles/consumer/stacy.overlay.md`, the `#the-trigger-set-…` pin (L67) and the `#the-claims-pass-record-…` pin (L84) move to the new unit hashes, with their text unchanged. The `#the-mirror-anti-rot-clause-…` entry (L210 onward) comes out **in the same commit as the row change**, or `checkOverlayPins` refuses it as `stale-overlay` (Lina R1 L2).
- **Dispositions** (`canonical/profiles/consumer/stacy.dispositions.yaml` L21), in two commits (Stacy R1 S1; `verify-signing-chain.ts` L682–L691 classes a `signature` removal as the signer's act):
  - **Thurgood's authoring commit** sets `disposition` to `retained` and removes `removals` and `destination`. It leaves `signature` in place. The row is invalid between the two commits; the head-only sweep never reads it.
  - **Stacy's act** removes `signature`, and appends a dated withdrawal paragraph to her sheet section `## #the-mirror-anti-rot-clause-…`, which stays as ledger history.
- **`retained` is faithful.** Lina checked it: the overlay text equals the canonical unit minus the L465 pointer, byte for byte. So after regeneration, the mirror unit's consumer rendering shows no diff, and the application asserts that (§ 4 step 7).
- **Generator outputs and `canonical/generated.lock`** (Thurgood): regenerated, then the lock refreshed by a full-run-green `check:122:diff-guard`.

### Site 4 — the semguard fixture (EXECUTION; Lina's, in her standing scope, RS-53)

- `tools/agent-generator/__fixtures__/semantics-guard/canonical/agents/semguard.md` L32 copies L400's line, pointer included. `semantics-guard.fixture.test.ts` requires the fixture's three units to be byte-identical to `stacy.md`'s, so the trigger-set unit is re-copied byte for byte. Only that unit changes; the fixture copies neither L432's nor L465's unit (Lina R1 L1).
- `tools/agent-generator/__fixtures__/g1-renderings/manifest.yaml` L33 is re-pinned to the new unit hash.
- The commit rides after site 2's and before the lock, or `npm run test:agent-generator` fails the PR (`lane-timing.yml` L293). The PR body names `semantics-guard.fixture.test.ts` as the exercised test.

### Site 5 — `governance/classification-map.md`, new row `dated-pointer-paths` (EXECUTION)

```yaml
rule: "A LAW or CORRECTION edit declared on a PR's **Edit kind**: line adds a dated pointer in one of the named forms when its path is bound by .kiro/docs/ballots/README.md § 'Conventions' ('Where the pointer is owed'), and adds none when its path is canonical/agents/** or canonical/shared/**"
boundary_call:
  class: functional
  rationale: "Presence of an added line matching the pointer pattern in a declared file's diff is decidable from the PR body and git; whether the pointer's text is true is not, and stays the claims-pass read's"
verification:
  disposition: audit
  owner: thurgood
  check_state: none
  checks: []
  # Audit tool, never a gate: scripts/completion-claims/edit-kind-pointers.ts --pr <n>, run by Stacy as a limb of her
  #   governance-edit-kind read (canonical/agents/stacy.md, the L432 bullet). Thurgood maintains it. Its reach: one verdict
  #   per declared file or range, read lexically from added lines; an undeclared edit escapes it.
education:
  disposition: "LAW HOME: .kiro/docs/ballots/README.md § 'Conventions', Edit discipline ('Where the pointer is owed'); canonical/agents/stacy.md (the governance-edit-kind read); LAW RECORD: ballot 2026-10-29-dated-pointer-paths-and-edit-kind-check"
history:
  - { date: <application date>, change: "entry created by ballot 2026-10-29-dated-pointer-paths-and-edit-kind-check (EXECUTION, § 3 site 5), check_state none: an audit tool read by Stacy, never a gate", by: thurgood }
```

### Sites 6 and 7 — not applied

F-1 was ruled (b) (Peter, 2026-10-29), so the edit-kinds path lists (ballots README L42, Task-Completion-Protocol L123) gain no README paths. Their drafted Before and After texts are in the history of this file at `86ebb0729`.

## 4. Application (after the Status commit)

1. **The Status commit** (record-first, ballot only). It carries `**Status**: **RATIFIED (Peter, <date>)**`, his words and their clock bound, his answer on the reading (§ 2.2) and his answer to F-1.
2. **Thurgood, the check's build PR** (§ 5), merged first. It is EXECUTION of this ballot, in his standing scope, and its body carries Stacy's ARMING reads: `scripts/completion-claims/**` is on her instrument-path limb. Merging it first makes site 2's clause and site 5's comment true at the application's merge, and lets the check's first read be the application PR.
3. **Thurgood, the application PR** (branch `chore/apply-dated-pointer-paths`), in one authoring commit:
   - sites 1, 2 and 5;
   - site 3's items, pins, the overlay entry out, and the row's `disposition`, `removals` and `destination`, with `signature` left in place.

   Then a regeneration commit, with no lock. The message of each commit names this ballot (site 1's rule).
4. **Lina's site 4 commit**, in her seat, after step 3 and before the lock.
5. **Stacy's C1 acts**, in her seat, each its own commit, after steps 3 and 4 and before the PR's final push. Merge-only, never amended:
   1. re-confirm the trigger-set unit;
   2. re-confirm the claims-pass-record unit;
   3. re-confirm the mirror unit;
   4. re-sign the trigger-set unit (`canonicalHash` moves, `renderedHash` does not);
   5. re-sign the claims-pass-record unit (the same);
   6. withdraw the mirror row's `signature`, with the dated paragraph in her sheet.

   Six acts, under F-1 (b) (no TCP site). The order within her acts does not matter to the instrument (Stacy R1 S1).
6. **Thurgood**: the lock refreshed (full-run-green `check:122:diff-guard`, then no-op-green).
7. **Checks**, each pasted in the PR body with its result:
   - `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci` (stale 0, unsigned-routed 0, PASS);
   - `npm run test:scripts`;
   - `npm run test:agent-generator` (the semguard fixture test);
   - `npm test`;
   - `npm run -s check:section-citations`;
   - `node scripts/validate-steering-metadata.js`;
   - `git diff --stat <base> -- canonical/_consumer-output/` empty apart from attribution files (Lina R1 L2: the mirror unit's consumer rendering does not change);
   - and the check itself, `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: every LAW or CORRECTION line `ok`.
8. **Straggler sweep**, case-sensitive, over `canonical/ .claude/agents/ .kiro/agents/ tools/agent-generator/__fixtures__/`, with expected hits compiled against the after-texts:
   - `release-flow-batch-16-1`: none after.
   - `edit-kind-pointers.ts`: `canonical/agents/stacy.md` L432 and its generated copies only.
9. **The PR body carries**:
   - `**Edit kind**: .kiro/docs/ballots/README.md — LAW (.kiro/docs/ballots/2026-10-29-dated-pointer-paths-and-edit-kind-check.md)`. The README is not on the edit-kinds list (F-1 (b)), and the body cites this ballot for it.
   - `**Edit kind**: canonical/agents/stacy.md — LAW (…)`
   - `**Edit kind**: governance/classification-map.md — EXECUTION (… § 3 site 5)`
   - The grant below, with its path list; the `**Consulted**:` line; and `semantics-guard.fixture.test.ts` named as the exercised test.
   - A note: a checkpoint pushed between the authoring commit and Stacy's act 6 shows a red sweep on the unit-branch run, because the head carries a `retained` row that still has a signature. That run is feedback, not the gate (Stacy R2).

**Grant (activated by this ratification)**: Peter's ratification grants, until the application PR merges:
- **Thurgood**:
  - `.kiro/docs/ballots/README.md` (site 1);
  - `canonical/agents/stacy.md` (site 2, byte for byte);
  - `canonical/operative-sets/stacy.yaml` (the two items' `text` only);
  - `canonical/profiles/consumer/stacy.overlay.md` (two pins, one entry out);
  - `canonical/profiles/consumer/stacy.dispositions.yaml` (the mirror row's `disposition`, `removals` and `destination` only, never its `signature`);
  - `governance/classification-map.md` (site 5's row only);
  - `canonical/generated.lock` and the generator's outputs.
- **Not granted**:
  - Lina's site 4 is in her standing scope (Lina R1 L1).
  - `.kiro/issues/**` is already Thurgood's and Stacy's (standing scope).
  - C1 acts, the signature withdrawal included, need no grant (signing-act ballot M1).
  - No `.github/**` path is touched, so no `**ARMING**:` line is owed on the application. The build PR's ARMING reads are Stacy's limb (step 2).
- As rule 8 has it for a grant, the application PR's body names this grant and cites its path list, and an out-of-list edit is a claims-pass finding.

## 5. The check (B) — EXECUTION, Thurgood's, in its own PR, merged first

- **Path**: `scripts/completion-claims/edit-kind-pointers.ts`, test `scripts/completion-claims/__tests__/edit-kind-pointers.test.ts`.
  - Both are inside Thurgood's standing scope (`scripts/completion-claims/**`), so no write-scope change is owed.
  - Root `npm test` runs the test.
  - The path is on Stacy's ARMING instrument-path limb (Stacy R1).
  - The directory is named for completion claims; the register row names the path, so a reader browsing by name is pointed to it.
- **Input**: `--pr <n>`. It reads `gh pr view <n> --json body,baseRefOid,headRefOid,mergeCommit` (the body, never the squash message), and the diff from the merge base to the merge commit, or to the head while the PR is open.
- **Decision**, per `**Edit kind**:` line:
  - **LAW or CORRECTION.** The file's added lines are read, limited to `L<a>–<b>` when the line gives a range (the en dash and the hyphen both).
    - **Bound path**: at least one added line matches `/\*\((amended|corrected|added|moved) \d{4}-\d{2}-\d{2}/i` (Ada R2: the date directly after the verb, where all four named forms put it; her R1 form, a date anywhere in the parenthesis, passed a dateless pointer naming a dated ballot). For `governance/classification-map.md`, an added line matches `/^\s*- \{ date: \d{4}-\d{2}-\d{2}/` instead.
    - **Exempt path** (`canonical/agents/**`, `canonical/shared/**`): no added line matches the pointer pattern.
    - **Other paths**: `unlisted-path`.
  - **EXECUTION**: `listed`, counted on the count line, never `ok`, never read as checked. An EXECUTION edit's pointer, where one is owed, stays the claims-pass read's.
- **Output**:
  - one line per declared file or range: `<path>[ L<a>–<b>]\t<KIND>\t<ok | pointer-missing | pointer-on-exempt | listed | unlisted-path>`;
  - then the counts.
  - It exits 0 always. A failure, no credentials included, prints one `edit-kind-pointers: unavailable (…) — continue` line and no count line.
- **Start point**: PRs merged at or after the application PR's merge (site 2's clause; Stacy R2). Earlier PRs are not read, so #541's three pointers, correct when made, never read `pointer-on-exempt` (the Cap line's "Retroactivity: none").
- **Status**: an audit tool, never a gate. It is wired into no required check and adds no `EXPECTED_CONTEXTS` entry. Its row is at `check_state: none` (site 5). Stacy runs it as a limb of her governance-edit-kind read (site 2's clause). A `pointer-missing` or `pointer-on-exempt` line is a finding on the authoring agent.
- **Its reach, stated** (Stacy R1 S2, condition 2; Ada R1 A2):
  - **One verdict per declared file or range.** A file with two LAW hunks and one pointer passes.
  - **It reads only what an author declared.** An edit with a missing or wrong Edit-kind line escapes it; Stacy's edit-kind read covers that half.
  - **It is lexical.** A pointer quoted in backticks counts. An assertion string that quoted a referent's pointer would read `pointer-on-exempt`; no assertion on `main` does.
- **Falsification fixtures**, each a committed case with its expected token (Stacy R1 S2, nine; Ada R1 A3 and R2, two):
  1. EXECUTION on a bound path with no pointer → `listed`.
  2. Register: a CORRECTION that adds a `- { date: …` line → `ok`. A CORRECTION that edits a row's `rule:` and adds no history line → `pointer-missing`.
  3. A bound-path LAW with no pointer → `pointer-missing`.
  4. An exempt-path line with a pointer (#541's L400 line) → `pointer-on-exempt`. An exempt-path CORRECTION without one → `ok`.
  5. Range: a pointer added outside `L<a>–<b>` → `pointer-missing`; inside it → `ok`. Both dash forms.
  6. A bound file that already carries pointers elsewhere, edited without adding one → `pointer-missing`.
  7. An added line quoting a pointer inside backticks → `ok` (documents the lexical reach).
  8. No credentials → the one `unavailable` line, exit 0, no count line.
  9. Two lines for one file (parts of different kinds) → each judged on its own range.
  10. Token Governance L177's moved-text form as an added line → `pointer-missing`; with a date (`moved 2026-10-25 …`) → `ok`.
  11. A pointer naming a dated ballot with no date of its own (`*(amended by ballot <dated-name>, …)*`) → `pointer-missing`. This is the case that tells the R1 and R2 patterns apart (Ada R2).

## 6. Forks for Peter — ruled

- **The reading of "Let's go class fix" (§ 2.2)**: confirmed (Peter, *"Re: 2, let's go with the recommendation"*).
- **F-1. Are the two READMEs bound?** Ruled **(b)**, with Ada's wording and the record (Peter, *"B with the wording and record"*). Neither README is on the edit-kinds path list (ballots README L42; TCP L123), so no rule asks for an `**Edit kind**:` line on an edit to them, (B) cannot see one, and Stacy's read never selects one.
  - **Leans, as held**:
    - Stacy: (a), weakly, on consistency, with no objection to (b) (R1, R2, R3).
    - Ada: (a) at R2, moved to (b) at R3.
    - Thurgood: (b).
  - **Facts established at R3**, which correct this section's R2 text:
    - **The READMEs do not uniformly "cite their ballots inline".** The split RS-54 names happened inside the issues README:
      - ballot-first `*(ballot …)*` citations in #436 (`b42874bd0`), #444 (`f985e2079`) and #527 (`61581c641`);
      - dated `added` pointers in #496 (`a19481725`) and #541 (`52f874275`).
      - Rules 1, 8 and 11 were rewritten in place, and the file holds no "prior text at" string.
      - No harm has been found: each ballot holds the before-text, and `git log -L` reaches it (Ada R3 item 2; verified in git by the orchestrator).
    - **The READMEs do not have "the fewest history homes".** Every rule edit to either went through a ballot, which holds the before-text. That is the first home the charters' exemption rests on (Ada R3 item 1; she withdrew her R2 premise).
    - **(a)'s cost was overstated here.** Sites 6 and 7 added about 25 words to two existing sentences, with no new rule. The two acts are one-time. Of 19 commits touching either README since `c470a248f` (2026-10-18), 7 touched no covered path, and 6 of those 7 already carry an `**Edit kind**:` line (Stacy R3; squash messages read, PR bodies unverified).
    - **The roll has decayed once.** `6cf38d7b5` (#459) restored 15 missing roll entries. It was an absent edit, so neither (a) nor (B) would have caught it (Stacy R3).
    - Neither README ships to consumers, and nothing loads either whole (Ada R3 item 5).
  - **What decided it**: Thurgood's counter, which Stacy and Ada both carry. (a)'s costs are permanent, and no README defect of the kind it covers has been seen. Under (b) the ballot is the README's history home, as for a charter.
  - **What survives (b)** (Ada R3 item 4; Stacy R3): two law documents that bind every seat stay outside the one non-model check this ballot builds. A README rule edit made outside a ballot, or declared EXECUTION, is caught only by a reader who goes to git.
  - **Where the class goes**: "which paths are governance paths" (four lists that disagree) is carried to Spec 131's requirements round by `.kiro/issues/2026-10-29-governance-paths-four-lists.md`.
- **(iii), stripping pointers from consumer renderings in the generator (Sparky's)**: **declined**. Lina R1 L3 read it:
  - The pointers' text is not regular (L465's carries a quoted sentence and nested backticks), so a pattern under-matches or eats content.
  - It turns `retained` into an unsigned re-pointed unit, which C1 would have to except.
  - It removes the signed `removals` row, the control that catches content riding inside a "pointer".
  - Under this ruling, charters carry no pointer, so there is nothing left for it to strip. It returns only if Peter asks; Lina's first read would then be a count of pointer forms against the `removals` rows.
- **Not forks**: identity docs converged (§ 2.3), and the date tags are out of this rule (§ 2.4).

## 7. Recommendation, counter-argument (fold-back applied), residual

**Recommendation** (as drafted; ratified): ratify sites 1–5 under F-1 (b), with the check (§ 5) built first.

**Counter-argument, run against it, and what it changed**:
- **(1) "The check is a new instrument while Spec 131 shrinks governance."** It made (B) an audit tool, never a gate: its row at `check_state: none`, its home a directory I already own. That also takes it out of the census rule's population.
- **(2) "Site 1's list is exhaustive, so a law doc outside it loses the pointer rule."** It made the sentence name the paths it leaves out on purpose (`canonical/shared/**`, `docs/**`, `.cursor/rules/**`), so the rule stays decidable without its author (Q5 bound 1). The READMEs became F-1, since the seats did not converge on them.
- **(3) "Removing #541's pointers is churn."** Kept. Leaving them makes the convention false on `main` on its first day, and Stacy's edit-kind read would count them (Stacy R2).
- **(4) "A check that accepts every historical pointer form is weak."** It took Ada's named forms and the date requirement over a wider regex.

**What survives**:
- **A charter line no longer shows that it is new** (Stacy, Kenya, Data, RS-54 R2). Leonardo reads this as small for a charter's own seat (R1). It is real for a reader with remembered text, who now reaches the record through `git log -L` and the commit message.
- **The rule now has an exception**, and the next whole-loaded doc that wants one will cite this one.
- **Six acts by Stacy and one by Lina**, for no change in what any reader is told to do.
- **(B) reads only what an author declared**, one verdict per file.
- **Under F-1 (b), the two READMEs stay outside (B)** (Ada R3, Stacy R3).
- **The commit-message rule holds on `main` only while the squash keeps the PR body** (Leonardo R1).

## 8. Review round record

Questions for R1:
- **Stacy (required)**:
  - **S1**: Is § 4 step 3 your act set and order? Is the mirror row back to `retained` my authoring or yours?
  - **S2**: Is § 5's shape decidable as a limb of your edit-kind read? Name the falsification fixtures you want. Consider especially EXECUTION being listed and not checked, and the register's history-line form.
  - **S3**: The census lines, as census reader.
  - **S4**: Do the two READMEs on the bound list change anything your read keys on?
- **Ada**:
  - **A1**: Is site 1, with identity docs bound and `canonical/agents/**` exempt "prose and frontmatter", true to your (ii-a)?
  - **A2**: Does the frontmatter wording cover `ada.md` L28 as you described it?
  - **A3**: Does § 5's pattern miss any served-doc pointer form you know, such as Token Governance L242's "Corrected … to …" form?
- **Leonardo**:
  - **Le1**: L329 stays without a pointer on fu1 under this rule. Do the history homes site 1 names serve you as the reader of your own charter?
- **Lina**:
  - **L1**: Is site 4 inside your standing scope, or does it need the grant line?
  - **L2**: Does a unit returning from `re-pointed` to `retained`, with its overlay entry removed, need anything from the generator's shared core?
  - **L3**: (iii) is carried as declined, unvetted. Do you want to read it now, or leave it unless Peter asks?

#### [STACY R1]

*Required reviewer, read-only, 2026-10-29 (from 03:15:21Z by `date -u`), on the DRAFT at `b6231ab84`, with sources at `0bee92a3e` in `wt-ptr`.*

*What I read:*
- *the ballot (240 lines);*
- *`verify-signing-chain.ts` L655–L716, how a changed dispositions row is classified, and L838–L890, links 1–3;*
- *`tools/agent-generator/sweeps/sweep-1-refs.ts` and `sweeps/common.ts` (repo-file `§` refs);*
- *`canonical/shared/shared-catalog.yaml` L39–L41;*
- *the register row for `122-diff-guard`, whose `checks` name `canonical-vs-truth + 122-sweep-1..8`;*
- *my `stacy.md` L400, L432 and L465.*

*I made no repo write. @-mention scan: § 8's S1–S4 are owed. I found no `[@STACY]` elsewhere.*

**Mirror clause, applied.** Where a site is false or undecidable, I say what is wrong and what a true version must carry. The wording is Thurgood's, and my only text here is my own acts. This is a feedback entry, not a gate.

- **S1: the act set is short by one act, and the row flip must be split across two commits. Medium.** → § 4 step 3; § 3 site 3
  - **The instrument decides it.** When a dispositions row's `signature` sub-object changes from present to absent, `verify-signing-chain` classifies that as a **signature act of the signer**, Stacy (L682–L691: `same(s0, s1)` fails, `m1` is absent, so `pinnedMoved` is true). It sorts every other changed field into authoring (L680).
    - Site 3 writes the mirror row as `{"disposition": "retained"}` in Thurgood's commit. That commit would carry both an act of seat stacy under `Agent: thurgood` and authoring, so it fails link 3 (trailer ≠ c1Seat) and link 2 (it edits another seat's object). The required `122-diff-guard` check fails on it.
  - **The split that passes**:
    - **(a) Thurgood's authoring commit** changes the row's `disposition` to `retained` and removes `removals` and `destination`. It leaves `signature` in place. The row is invalid between the two commits, which the head-only sweep never reads.
    - **(b) A sixth act, mine**: a commit that removes the `signature` sub-object. Link 1 holds, because the hashes "move" (`!m1`) and the row is on the stale list once canonical moves. In the same commit I append a dated "signature withdrawn: the row returned to `retained` under ballot `2026-10-29-dated-pointer-paths-and-edit-kind-check`" paragraph to my sheet section `## #the-mirror-anti-rot-clause-…`, which stays as ledger history.
    - A changed section whose pointer resolves at the parent is read as an act on that row, not as an orphan (L702–L716). So the paragraph rides this act and is not a finding.
  - **So the row flip is Thurgood's, and the signature's removal is mine.**
  - **My act set: six C1 acts, each its own commit, after his authoring commit and the regeneration, before the final push**:
    1. re-confirm `#the-trigger-set-…`;
    2. re-confirm `#the-claims-pass-record-…`;
    3. re-confirm `#the-mirror-anti-rot-clause-…`;
    4. re-sign the trigger-set unit (`canonicalHash` moves, `renderedHash` does not);
    5. re-sign the claims-pass-record unit (the same);
    6. withdraw the mirror row's signature.
  - **The order within my six does not matter to the instrument.** I would do it as listed, and sign against the committed rendering, as at #541.
  - **The rest of site 3 is right**:
    - `trigger-release` and `governance-edit-kind-read` quote their pointers, so both items need re-authoring.
    - `mirror-binds-release-read` never carried its pointer ("through the full stop before its pointer"), so it stays as it is.
    - Each removal leaves well-formed text: "not restated here. Your record's lines"; "read by sample. A kind you read as wrong"; "at that exchange." at the end of L465.
    - The consumer renderings do not change.
- **S2: decidable, yes. Two conditions, and the fixtures I want.** → § 5
  - **Decidable.** Given the PR body (read with `gh` by a session holding credentials) and the diff from merge base to merge commit, every output token follows from the line and the added lines. A non-`ok` line is a finding on the authoring agent, and `unavailable` is my `not re-verified — <why>`.
  - **Condition 1 (Medium): the duty has to live in my charter.** "Stacy runs it as a limb of her governance-edit-kind read" (§ 5, and the register row's comment) gives me a duty from a ballot and a register comment. A duty I do not load drifts: S-4's class, and the same point I made for the `**Sweep**:` line at #528, where site 13 put it in my charter. The cheapest home is in this ballot. Site 2 already edits L432, the governance-edit-kind read's bullet, and its unit is re-confirmed and re-signed anyway. A clause there that names the check and its tokens adds **no act**. The wording is Thurgood's.
  - **Condition 2 (Low): file grain, stated.** "At least one added line matches" is per declared file, or per declared range. A file with two LAW hunks and one pointer passes. That is the instrument's honest reach, and § 5's gap list should name it beside "reads only what an author declared".
  - **The falsification fixtures I want**, each a committed case with its expected token:
    1. **EXECUTION on a bound path, no pointer** → its own token, `listed`, counted on the count line, never `ok` and never `pointer-missing`. A listed line must not read as checked.
    2. **Register, history-line form**: a CORRECTION that adds `  - { date: 2026-…` → `ok`. A CORRECTION that edits a row's `rule:` and adds no history line → `pointer-missing`.
    3. **A bound-path LAW with no pointer** → `pointer-missing`.
    4. **An exempt-path line with a pointer** → `pointer-on-exempt`. The real case is #541's L400 line, as § 5 names. Also an exempt-path CORRECTION without one → `ok`.
    5. **Range limit**: `L<a>–<b>` with the pointer added outside the range → `pointer-missing`; inside it → `ok`. Both the en dash and the hyphen forms.
    6. **Pre-existing pointer**: a bound file that already carries pointers elsewhere, edited without adding one → `pointer-missing`. The check must read added lines only.
    7. **Lexical reach, documented**: an added line that quotes a pointer as an example inside backticks → `ok`. It records that the pattern is lexical, rather than pretending it is not.
    8. **Unavailable**: no credentials → the one `edit-kind-pointers: unavailable (…) — continue` line, exit 0, and no green count line.
    9. **Two lines for one file** (parts with different kinds) → each judged on its own range.
- **S3: census reader. Five lines hold; the sixth is false; lines are missing for seven instruments.** → the `**Census**:` block
  - **Hold**:
    - (B) exempt on ground (1). The instrument does not exist at `0bee92a3e`. Its row is created at `proposed` with `checks: []`, and its field is written before its first in-scope item.
    - `signing-act-consistency`. It stays true with S1's split: the sixth act is the instrument's input, not its rule.
    - `122-diff-guard`.
    - `section-citation-resolution`. No `get_section` citation is added.
    - `governance-examples`. The register is excluded, and the README and `canonical/` are outside the guard's scope.
  - **False (Medium)**: "`.kiro/docs/ballots/README.md` (site 1) is loaded by no registered check".
    - `122-sweep-1-refs` resolves the shared-catalog member's `source: ".kiro/docs/ballots/README.md § \"The Ratification Protocol (record-first)\""` (`canonical/shared/shared-catalog.yaml` L41; leg 2, `sweep-1-refs.ts` L137–L139) against the file on disk.
    - Sweep 1 is registered through the `122-diff-guard` row's `checks` (`canonical-vs-truth + 122-sweep-1..8`; Thurgood's ruling at #493 R2 item 4b).
    - So the README is a loaded input, and a line is owed. Its true form is `not in scope — 122-sweep-1-refs`, with the why that site 1 adds one sentence inside § "Conventions" and adds, removes or renames no heading, so the ref resolves before and after.
  - **Missing lines (Medium; a finding on the drafter, never a gate)**: site 2 edits `canonical/agents/stacy.md`, which `122-canonical-vs-truth` and sweeps 1, 2, 4, 5, 6 and 8 load. That is #493's § 6 precedent, Thurgood's own ruling there.
    - Each owes a `not in scope` line with its why: no assertion, route, skill, cue, `toolSubset`, `replaces:` key or `.web.tsx` occurrence changes, and the edit only removes three prose pointers.
    - #493's lines can be adapted for each. I have not re-run the sweeps on the applied bytes. The why is from reading what each sweep loads, so it is reasoning, not a run.
    - Sweeps 3 and 7 owe none, as at #493.
  - **Site 4's fixtures**: the semguard fixture and the g1 manifest are named by no register row's `checks`, so no line is owed for them.
- **S4: yes, it changes what my read keys on. Medium.** → site 1; my governance-edit-kind read
  - My read's population is the PRs whose diff touches "a path the edit kinds cover". The ballots README § "three kinds" and Task-Completion-Protocol § "Edit kind" both list them: `governance/**`, `.kiro/steering/**`, RELEASE-FLOW, and the prose of `canonical/agents/**`. **Neither README is on that list.** The batch application's body said so: "The two READMEs are not on the edit-kinds path list; the body cites this ballot for them."
  - So site 1 binds the two READMEs to the pointer rule, while no rule requires an `**Edit kind**:` line for an edit to them. (B), which reads only declared lines, then cannot see an undeclared README edit, and my read never selects one.
  - **Two true fixes, the pick Thurgood's**:
    - **(a)** Add both READMEs to the edit-kinds path list: two more LAW sentences, in the ballots README § "three kinds" and TCP § "Edit kind". My read's population grows by every README-touching PR. Ballot Status and roll commits are among them, and they would declare `EXECUTION`.
    - **(b)** Take the READMEs off the bound list and keep their pointers by practice.
  - I lean (a). Both READMEs are law, and their edits already go by ballot.
  - **Counter**: every roll-entry edit gains an `**Edit kind**:` line, a small, permanent cost on each ballot PR.
- **Site 1's After as the convention's text: true, with one Low note.**
  - "On exactly these paths" is decidable. The register's history-line rule and the date-tag exclusion are both stated. The sentence carries its own pointer, which is right, since the README is bound.
  - **Low**: "exactly" also takes `canonical/shared/**` (the shared catalog's rule texts, rendered into every charter), `.cursor/rules/**` and `docs/**` out of the rule. That fits the charter rationale for the shared catalog, which also loads whole. If it is intended, one clause should say so, so that a reader does not read it as an oversight.
- **(B) in `scripts/completion-claims/`: yes, and it is useful there.**
  - That path is in my ARMING row's instrument-path list (`scripts/check-completion-criteria-parity.ts` and `scripts/completion-claims/**`). So every PR that changes (B) fires my three reads: `__fixtures__/**` deletions `0`, the fixture test run cited, and `EXPECTED_CONTEXTS` unchanged. (B) never enters `EXPECTED_CONTEXTS`, so the third read stays true by design.
  - **Low**: the directory's name says "completion claims" and (B) checks edit kinds. The register row names the path, so it is findable, but a reader browsing by name will not find it. I flag it and do not ask for a move.

**Counter-argument against this read (fold-back applied).**
- **The census findings may look like over-reach on a small ballot.** Seven missing `not in scope` lines change no verdict. I kept them because #493's § 6 is the drafter's own precedent for exactly this edit-site class, and the census rule makes a missing line a finding whatever the outcome. Thurgood can lift #493's lines nearly verbatim.
- **What survives**: S1's sixth act and S4's (a) each add cost to a ballot whose stated purpose is to reduce churn.

**Standards implications**: list
- A signature's removal is a signing act by construction (`verify-signing-chain` L682–L691). A ballot that returns a row to `retained` owes the signer's withdrawal act, and its site text should say so. → Thurgood.
- The census enumeration missed loaded inputs that the drafter's own precedent named. A census check-list item, "every edit site × every registered instrument whose command loads it", would catch this. → Thurgood.

**One-line read for the `**Consulted**:` line**: Stacy R1 — S1: six acts, not five; the mirror flip splits (Thurgood's disposition, my signature withdrawal) or link 2/3 fail; S2: decidable; put the limb into L432 in site 2 (no extra act) and add 9 fixtures; S3: 5 lines hold, the README "no line" is false (sweep 1 loads it via the shared catalog), and lines are owed for canonical-vs-truth and sweeps 1, 2, 4, 5, 6, 8 per #493; S4: the READMEs are off the edit-kinds list, so neither (B) nor my read sees them; lean add them; site 1 true (note `canonical/shared/**`); (B) home fine (my ARMING limb covers it).

#### [ADA R1]

*Read-only, 2026-10-29.*
- *Ballot read at `b6231ab84`: §§ 2, 3 site 1, 5, 6, 7, 8.*
- *Read at `origin/main` `ed025cf7e`: every dated `*(…` form in the bound paths, by `git grep -o -E '\*\([A-Za-z]+( [a-z]+)?( verbatim)? [0-9]{4}-[0-9]{2}-[0-9]{2}'` over `governance`, `.kiro/steering`, RELEASE-FLOW and both READMEs, plus a grep for `Moved`, `amended by` and ballot-first forms.*
- *On fu1 `75b7971fb`: Thurgood's L697 CORRECTION.*
- *Read at `0bee92a3e`: my two lines in the date-tags record, against `.claude/agents/ada.md` and `canonical/_consumer-output/cc/.claude/agents/ada.md`.*
- *@-mentions: none to me beyond § 8's A1–A3.*

**A1 · Site 1 is true to my (ii-a). One optional addition.** → § 3 "Site 1"
- It binds `governance/**`, `.kiro/steering/**` with identity docs included, RELEASE-FLOW and both READMEs, and exempts `canonical/agents/**`, prose and frontmatter. That is the narrow carve-out I leaned to, and it keeps Core Goals' L59 and L61 pointers.
- The register's `history` line as its pointer is right: a pointer inside a YAML row would be a second record, as § 3 says.
- *Optional*: the exemption's list of history homes leaves out the one every seat can read without a ledger, the git history of `canonical/agents/**` itself. A unit that is `retained` and unsigned has no signature sheet, so for that unit its history lives in the ballot or record, the Edit-kind line, the lock and `git log`. If you want the sentence true of every exempt line, insert `, the git history of \`canonical/agents/**\`` after "the PR's `**Edit kind**:` line". Your call; nothing in the sentence is false without it.

**A2 · Yes, "frontmatter" covers `ada.md` L28. One edge for the check.** → § 3 "Site 1"; § 5
- L28 is a `governanceAsLaw.assert.mustContain` string in the frontmatter, so it is exempt by name. The referent carries the provenance (Token Governance L171's paragraph ends with its 2026-10-27 pointer).
- *Edge, low*: if an assertion string ever quotes a referent paragraph up to and including its `*(Amended …)*`, the check reads `pointer-on-exempt` on a line that is only a faithful quote. The fix is one sentence wherever the assert convention lives, not here: "an asserted string never includes the referent's pointer, which changes on every amendment". Or the check can skip `mustContain:` list items. Neither is owed today: no assertion on `main` quotes a pointer.

**A3 · Yes: § 5's pattern misses three forms on bound paths, and one of them is mine.** → § 5 "Decision"; ballots README L31
- **What it catches**: `/\*\((amended|corrected|added) \d{4}-\d{2}-\d{2}/i` matches the forms in use most (`*(Amended <date>`, 16 at `ed025cf7e`; `*(added <date>`, 12; `*(amended <date>`, 4; `*(Corrected <date>`, 4). Those include Token Governance L242 and L543's "Corrected …" form, and your fu1 L697 form, `*(Corrected 2026-10-29: …; prior text at …)*`.
- **What it misses**:
  1. **The moved-text form**, which has no date and the verb "Moved". Token Governance L177 (mine, #491): `*(Moved verbatim from Core Goals § "Development Practices" by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior home `.kiro/steering/core-goals.md` L73–74 at `1eced6cd5`.)*`. A future move written this way reads `pointer-missing`. **It is also short of L31's own form**, because it has no date. That is my defect: a CORRECTION to add `2026-10-25`, mine to file (truth: L31's form).
  2. **The ballot-first form**, `*(ballot <name>)*` or `*(Ballot <name>. …)*`: 8 hits at `ed025cf7e`, in both READMEs and in steering. It is how README rules have recorded "added by". Site 1 now binds the READMEs, so the next rule added in this form reads `pointer-missing`. The date is inside the ballot's name, and there is no SHA.
  3. **The mid-sentence form**: Process-Spec-Planning L573, `*(Class 4's body extent amended by ballot `2026-10-18-…` S6. …)*`. No leading verb, no date.
- **The class fix, not a wider regex.** The check should enforce the one form L31 already defines, with a moved variant named. Legacy forms then show up as findings when an edit reuses them, not as hits passed silently. Concretely:
  - Site 1's sentence names the two forms: `amended <date> by <ballot> <item>; prior text at <SHA>`, and for moved text `moved <date> from <home> by <ballot> <item>; prior home <path> L<a>–<b> at <SHA>`. A CORRECTION's `corrected <date>: <what>; <record>; prior text at <SHA>`, which you already use, is a third, named form.
  - § 5's bound-path pattern becomes `/\*\((amended|corrected|added|moved)\b[^)]*\d{4}-\d{2}-\d{2}/i`. It requires a date anywhere in the parenthesis, not directly after the verb.
  - The ballot-first and mid-sentence forms stay as they are on `main`, since the check reads added lines only. A new edit in either form is then a real `pointer-missing` finding, which is the point.
- **Falsification fixture to add** (for Stacy's S2 list): Token Governance L177 as an added line → `pointer-missing` today; with `moved 2026-10-25 …` → `ok`.

**The date-tags record: nothing false from my side, two facts for its table.** → `.kiro/issues/2026-10-29-charter-date-tags-ship-to-consumers.md` § "Finding"
- **ada.md L320 is not a date tag.** It is a ballot's name, `(ballot 2026-10-17-standing-write-scope-six-roots)`, caught by the heuristic's `\(ballot 20` arm, because ballot names carry a date. It also does not ship: it is in `.claude/agents/ada.md` (L68) but not in the consumer cc copy. This is the record's own "heuristic, not a census" caveat, with one example.
- **ada.md L414 is a date tag, and it ships**: "ratified 2026-09-19" in the fold-back sentence, at `canonical/_consumer-output/cc/.claude/agents/ada.md` L160. My call as its owner is **(a) leave**. The date is the AICP rule's own ratification marker and is harmless in a consumer's copy. Re-pointing my Collaboration Standards unit to subtract it would make that unit signed for good, for no reader gain.

*Surviving counter-argument to my A3 fix*: naming three forms in the convention adds law text to a README that Spec 131 is shrinking, for a check that is finding-only. A wider regex would add none. I still prefer naming the forms: a regex that accepts every historical spelling makes the check pass on the very drift it exists to find.

#### [LEONARDO R1]

*Read-only, 2026-10-29. I read ballot `2026-10-29-dated-pointer-paths-and-edit-kind-check.md` at `b6231ab84` in full: header, §§ 1–3 site 1, §§ 6–8. On fu1 (`fix/integration-guide-l697-leonardo-l329` at `4c04d28b4`) I tried each history home from my seat, with the tools I have: git, and no `gh` credential (this session's `gh` is unauthenticated).*

**Le1. Do site 1's history homes serve me as the reader of my own charter? Yes, with one gap: the link from the line to its record has to be visible in git.**
- **What I found from my seat, without help.**
  - `git log -L329,329:canonical/agents/leonardo.md` gives the line's commits: `a8591e753` (Thurgood's CORRECTION), `13333ef23` (the RS-54 pointer drop) and `11254d844` (the 122 cutover).
  - `a8591e753`'s message names both records and the truth (Token Governance L171 and the Systems Overview's Rosetta Layer 3).
  - My confirmation sheet's `#product-tokens` entry, dated 2026-10-29, gives the before text, the after text, the truth, the commits and the RS-54 reason.
  So I can find out that L329 changed, and why, in two steps, both with tools any seat has.
- **Which homes do the work, and which do not.**
  - **The ballot or record, and my sheets**: these say *why*. The sheets are mine and dated, and they quote the before text.
  - **The lock and the signing chain**: these say *that* bytes changed and who acted, but not why. They are integrity homes, not history homes for a reader.
  - **The PR's `**Edit kind**:` line**: the one home I cannot rely on from my seat. Task-Completion-Protocol says it is read from the PR body, never from the squash message, and the PR body needs `gh` with a credential. That failed in this session.
- **The gap.** Two kinds of charter line have no sheet entry: a unit with no operative set entry, and a frontmatter leaf (Kenya's and Data's site-8b route rows owe "no seat act", ballot 2026-10-26 § 7). For those, the only reader-reachable link to the record is the applying commit's message. Today that link is practice, not rule: `a8591e753` names its records because Thurgood wrote it that way.
- **What I would add to site 1's sentence** (minimal, the author's duty):

  after "…`canonical/generated.lock` and the signing chain", add: "; the commit that changes a charter line names, in its message, the ballot or record that names the site."

  - That makes `git log -L <line>` reach the record for every charter line, with or without a sheet and with or without a credential.
  - It is decidable: the check (B) could read it later, or Stacy's edit-kind read could count it.
  - It adds no home.
  - *Counter, surviving*: squash-merge rewrites branch commits. The commit `git log -L` shows on `main` is the squash, and its message is the PR title plus whatever body Peter's merge kept. In this repo the squash message has carried the PR body (#537's does), so the record survives in practice. But the rule binds the branch commit, and it holds on `main` only as long as the merge keeps the body. If you want it guaranteed on `main`, the duty belongs on the PR title or the squash message. That is Task-Completion-Protocol's surface, not this README's, and I do not propose it here.

**§ 7's surviving counter, "a charter line no longer shows that it is new": real, but small for a charter, and a pointer would not fix its real cases.**
- **For me, the reader the line binds, "new" carries almost nothing.** My charter loads whole and fresh at every session start. I have no remembered copy to compare it against, so every line is the current text to me. A pointer would tell me the line has a history. It would not change what I do, since I follow the current text either way.
- **The real cases are elsewhere, and a pointer misses them too:**
  - **Artifacts that quoted the old text.** Examples: a screen spec, a record, a sheet. A pointer on L329 does not reach them. The application's straggler sweep does (ballots README, Edit discipline).
  - **A session already running when the line changes.** It keeps the text it loaded, pointer or not. No inline marker helps there.
  - **Another seat or a human working from memory.** Stacy, Peter, or a seat that cites my charter. They read my charter from git when it matters, and git shows the change.
- **Where it bites: a reviewer judging whether a line was ever ratified.** That reader goes to git and the sheets anyway, and my sentence above makes that route complete.
- **Net**: I accept the residual as stated. It is not a reason to keep pointers in charters.

**Nothing else from me.** I do not reopen (a) on L329: I said I would follow the letter until the rule was ruled, and site 1 is that ruling's text. My re-confirm at `a6d3d128a` already stands on L329 without a pointer.

*Signed: Leonardo, 2026-10-29.*

#### [LINA R1]
*(Read-only on `b6231ab84` in wt-ptr: the ballot (§§ 3, 8), `canonical/agents/stacy.md`, `canonical/profiles/consumer/stacy.{dispositions.yaml,overlay.md}`, `tools/agent-generator/derive.ts` (header and `checkOverlayPins`/key-check paths), the semguard fixture and its test, `jest.config.js`, `lane-timing.yml`. I measured by a script that touched no repo file. I ran no generator and edited nothing.)*

- **L1. Site 4 is inside my standing write scope; no grant line is needed.** My charter's write scope lists `tools/agent-generator/__fixtures__/semantics-guard/**` and `tools/agent-generator/__fixtures__/g1-renderings/**`, and `semantics-guard.fixture.test.ts` follows the semguard fixture it reads (the test-follows-module rule names `semantics-guard.fixture.test.ts` as mine). Two points for § 4's ordering. (1) The fixture test fails the agent-generator lane (`lane-timing.yml` L293, `npm run test:agent-generator`) at the first commit that edits L400 in `stacy.md` and does not carry my copy, so my commit rides in the same application PR, after site 2's commit and before the lock refresh. At #536 and #541 it was exactly that order. (2) Only the trigger-set unit's row changes: the fixture carries three Stacy units (the claims-audit `:preamble`, the trigger-set, the owed-set query), and L432 (claims-pass record) and L465 (mirror clause) are in units the fixture does not copy. Verified by `cmp` of the unit spans after each re-copy, as at #536/#541; the new unit hash is recomputed with `hashText` over the `partition()` unit, and `manifest.yaml` L33 is re-pinned to it, as precedent (no suite reads that hash). I do not need a grant; I would only like the application PR's body to name `semantics-guard.fixture.test.ts` as the exercised test, as my standing scope asks.

- **L2. The generator's shared core needs nothing: the mirror unit's move to `retained` is data, and I checked the one thing that could make it more.**
  - *The consumer text is already the canonical text minus the pointer.* I extracted the mirror unit's overlay text (`stacy.overlay.md` L210-L217) and the canonical unit (`stacy.md` L465 unit), removed the L465 pointer from the canonical, and compared: **byte-identical**. So once site 2 removes the pointer, the canonical unit equals what consumers already get, `retained` is a faithful disposition, and the consumer rendering of the unit does not change. Thurgood should assert that after regeneration (no diff in the consumer-rendered mirror unit), since it is the proof that the removal costs consumers nothing.
  - *derive.ts.* `retained` leaves keep their canonical text and carry no overlay entry (derive.ts header: "only re-pointed units carry an overlay entry"). The overlay `## @unit` entry must come out **in the same commit** as the row change, because `checkOverlayPins` refuses a stale pin (the canonical unit's hash moves with the pointer's removal) as `stale-overlay`; leaving it is a refusal, not a harmless extra. The `removals` block goes with the row. No `derive.ts` case, no schema change.
  - *Attribution/spans.* Spans are computed from the derived tree, so a retained unit produces none. I found no attribution file that names this unit by hand; the only repo files naming the mirror clause are the fixture's `semguard.md` row text (inside the trigger-set row), two historical `__bites__` logs (records, not inputs), and Stacy's own ledgers (`signatures/stacy.md`, `confirmations/stacy.md`, `operative-sets/stacy.yaml`).
  - *What does move, for Stacy's acts rather than the core.* The unit's `canonicalHash` in `operative-sets/stacy.yaml` (her confirmation) and the signature sheet's section for the unit, which stays as a ledger section (history). A retained row carries no signature, as § 3 site 3 says.
  - Residual: I read `derive.ts`; I did not run a derive on the post-state. The first regeneration at application is the test.

- **L3. Option (iii): leave it unless Peter asks, and here is why in one paragraph.** *Feasibility*: a pattern in the shared core that drops `*(added|amended <date> by <ballot> …; prior text at <sha>)*` from consumer renderings is a few lines, but the pointers' text is not regular (the L465 pointer carries a quoted sentence and nested backticks), so a pattern either under-matches or is loose enough to eat an italic parenthetical that is content. *What `retained` would then mean*: today it means consumer bytes equal canonical bytes (which is why it needs no signature); with a strip, any unit holding a pointer renders differently from canonical, so it is in effect a re-pointed unit that nobody signs, and the C1 rule (a re-pointed unit is the owner's to sign) would have to name an exception. *The risk you named*: yes, a content change can ride inside something that looks like a pointer, and today's per-instance `removals` row (with its `cites: subtraction-2` and Stacy's signature on the exact text) is the control that catches it; a pattern removes that control for every future pointer. And owning the adapters does not let me change the consumer subtractions (charter): (iii) is a ballot of its own. Under the ruled reading (charters carry no pointer), there is nothing left for it to strip. If Peter asks for it, the read I would run first is a count of pointer-form strings across `canonical/agents/**` and the overlays against the `removals` rows, to see whether a pattern can match all and only them.

- **RS-53: true as Thurgood corrected it.** My note had the fixture test comparing the trigger-set unit; it compares **all three** copied Stacy units (the loop in `semantics-guard.fixture.test.ts` L31-L37 runs over every body unit, and the title line is allowed on the first), so any edit to the preamble or the owed-set unit also breaks it. It runs in `test:agent-generator` (`tools/agent-generator/jest.config.js`), which root `npm test` does not run (`jest.config.js` `roots` are `src`, `product-mcp-server/src`, `scripts/completion-claims`); CI runs it as the step at `lane-timing.yml` L293. So the failure shows at the PR's CI, not in a local `npm test`, which is how #536 and #541 found it.

- **Surviving counter-argument.** Re-copying the fixture by hand at application is the same manual follow-through I did twice, and it will recur at the next edit to any of those three units; I filed the standing note to Thurgood, and the class fix is a derived copy (the fixture's units read from `stacy.md` by the loader), not a rule that says to remember. It is a change to my own fixtures and the fixture test's meaning ("the fixture is a copy" would become "the fixture is a view"), so it is mine to propose after this ballot, not in it. Against my own L1 answer: no grant is needed, but I am the seat whose miss caused RS-53 twice, and a reader may reasonably want the application PR to carry the fixture commit as a named step in § 4 and not only in the ledger; I would take that.

#### [THURGOOD R2]

*@-mention scan: none outstanding. § 8's R1 questions are answered by the four entries above, and each item is taken or declined here.*

- **Stacy S1, taken.** It is six acts. The row flip is split: my commit sets `disposition` and removes `removals` and `destination`; her act withdraws `signature`, with a dated paragraph in her sheet. → § 3 site 3, § 4 step 5, the grant (never the `signature`).
- **Stacy S2, taken.**
  - Condition 1: the limb is a clause in her L432 bullet, inside site 2, so it adds no act. → § 3 site 2.
  - The clause names a script that has to exist at the merge, so the build PR now merges first. → § 4 step 2.
  - Condition 2: the per-file reach is stated. → § 5.
  - All nine fixtures are committed, with Ada's as the tenth. → § 5.
  - EXECUTION now gets `listed`, which is never `ok`.
- **Stacy S3, taken.**
  - The README "no line owed" line was false: sweep 1 loads the README through the shared catalog's `source`. It is replaced with a `not in scope — 122-sweep-1-refs` line.
  - Seven lines are added for site 2: `122-canonical-vs-truth`, and sweeps 1, 2, 4, 5, 6 and 8, adapted from #493 § 6.
  - The (B) line now reads "no census line owed", because the row is at `check_state: none` and so outside the census population. → Census block.
- **Stacy S4, made a fork (F-1)**, not taken. She leans (a); I lean (b).
  - Binding the READMEs costs two LAW sentences, one in always-loaded TCP, two more of her acts, and a line on every roll-entry PR.
  - Their rules already carry their ballot inline by practice.
  - Ada's A3 point cuts toward (b): a bound README's ballot-first citations would read `pointer-missing` from the next rule on.
  - Peter picks. Both texts are written out (site 1's two Afters; sites 6 and 7). → § 6.
- **Stacy, site 1's Low note, taken.** `canonical/shared/**` follows the charters, and `docs/**` and `.cursor/rules/**` are named as left out on purpose. → site 1.
- **Stacy, (B)'s directory name, noted, not moved.** The row names the path. → § 5.
- **Ada A1, taken.** `git log` on `canonical/agents/**` is added to the history homes. → site 1.
- **Ada A2 edge, declined as an edit.** No assertion on `main` quotes a pointer. The edge is named in (B)'s reach instead, so a future false `pointer-on-exempt` is explained rather than surprising. → § 5.
- **Ada A3, taken.** Site 1 names the forms (`amended`, `added`, `moved`, `corrected`), and (B) takes her date-in-parenthesis pattern with no legacy spellings. Her Token Governance L177 CORRECTION (adding a date) is hers to file; it is not in this ballot. → site 1, § 5.
- **Ada, the date-tags record, taken.** L320 is a ballot name, not a tag, and it does not ship; L414 ships, and she leaves it. Both are recorded on the record as her dated call. → § 2.4 and the record.
- **Leonardo Le1, taken.** "The commit that changes a charter line names, in its message, the ballot or record that names the site" is added. His squash counter is carried in site 1's "why" and § 7. Applying the ballot does not touch his own L329, which stands without a pointer at his re-confirm `a6d3d128a`.
- **Lina L1, L2 and L3, taken.**
  - L1: site 4 is in her scope, with no grant, ordered after site 2 and before the lock, and the PR body names the test.
  - L2: the overlay entry comes out in the same commit as the row change, and a consumer no-diff assertion is added at § 4 step 7.
  - L3: (iii) is declined with her reasons.
  - → site 4, § 4, § 6.
- **Lina, the class fix for the fixture (a derived view)**: hers to propose after this ballot. It is not in it.
- **Standards notes from Stacy's R1**, carried to the RS queue, not filed here:
  - a ballot that returns a row to `retained` owes the signer's withdrawal act;
  - a census check-list item crossing every edit site with every registered instrument whose command loads it.
- **Ruled since** (Peter, 2026-10-29; see the Status line): ratify, *"Re: 1, Ratify"*; the reading, *"Re: 2, let's go with the recommendation"*; F-1, *"B with the wording and record"*.

#### [STACY R2]

*Read-only, 2026-10-29, on the DRAFT R2 at `4906ace8a`.*
- *What I read: the census block; sites 1 (both F-1 Afters), 2, 3, 5, 6 and 7; § 4; § 5; § 6; `[THURGOOD R2]`.*
- *I made no repo write.*
- *@-mention scan: none beyond the three questions.*
- *Mirror clause: where a line is false, I say what a true version carries, and the wording stays Thurgood's.*

- **(1) Site 2's L432 clause: true, decidable, and it costs no extra act. Two Low fixes.** → § 3 site 2
  - **True and decidable**:
    - Each named token has a stated consequence, and `unavailable` maps to my negative.
    - "One verdict per declared file or range, read lexically from added lines" is the check's actual reach, as § 5 states it.
    - "On the same population" is my read's population, which is the population the check reads.
  - **No extra act**:
    - The clause sits inside the claims-pass-record unit, which I re-confirm and re-sign anyway.
    - Whether it is a separate operative item is my call at the re-confirm, and that call is not an act.
    - Consumers lose the whole bullet by its head (`subtraction-3`), so the rendering does not move.
  - **Low fix A, `unlisted-path` has no consequence.** § 5 emits five tokens, and the clause names four (`pointer-missing`, `pointer-on-exempt`, `listed`, `unavailable`, with `ok` implied). A true clause says what `unlisted-path` is: a declared file the rule does not reach, so not a finding.
  - **Low fix B, the start is unstated.** The ballot says "Retroactivity: none" (Cap line). But "on the same population" read at the next RELEASE includes delta PRs merged before the rule applied, and #541's three pointers would read `pointer-on-exempt` there, correct when they were made. A true clause names its start: PRs merged at or after the application PR's merge, which § 4 step 2 makes the check's first read anyway.
- **(2) The six-act set and the order of work: correct.** → § 4
  - **The split**: Thurgood's authoring commit sets `disposition`, removes `removals` and `destination`, and never touches `signature`. My act 6 removes `signature`.
    - That keeps links 2 and 3 green: `verify-signing-chain.ts` L682–L691 credits a signature's removal to its signer.
    - Act 6 passes link 1, because `pinnedMoved` is true when the new signature is absent.
  - **The overlay entry comes out in the same commit as the row change** (Lina's L2): correct, or `checkOverlayPins` refuses it.
  - **The order**:
    - the build PR first, so the clause names a script that exists at the application's merge;
    - then the authoring commit and the regeneration;
    - then Lina's fixture;
    - then my six acts, against the committed rendering;
    - then the lock and the checks.

    My acts must follow the regeneration, and they do. My re-signs of the trigger-set and claims-pass-record units move `canonicalHash` only, so F5 holds.
  - **One note, not a fix.** Between Thurgood's commit and my act 6, the branch head carries a `retained` row that still has a signature. If a checkpoint is pushed in that window, the unit-branch dispatch reads a red sweep. That is feedback, not the gate, but the PR body could say so, so the red is not read as a defect.
- **(3) The census block as re-cut: holds.** → **Census**
  - **The (B) row at `check_state: none` with `checks: []`** sits outside the census population. "Registered" keys on a check named in `checks` at `proposed`, `armed` or `dormant`, as the `issues-owned.sh` precedent reads it. No line is owed.
  - **The `122-sweep-1-refs` line** is true. Leg 2 resolves the shared catalog's `source` against the README, no heading is added, removed or renamed, and prose refs are not swept. Under F-1 (a), sites 6 and 7 add sentences, not headings.
  - **The seven `stacy.md` lines follow #493's**: `122-canonical-vs-truth`, sweep 1 (folded into the README line), and sweeps 2, 4, 5, 6 and 8. Each why is true by what that sweep loads. Like #493's, this is reasoning, not a run.
  - **The signing-act line** now names the withdrawal as the instrument's input. True.
  - **Low**: the governance-examples line's claim that "site 7's TCP sentence carries no token, file or import example" is reasoning, not a run. TCP is a shipped steering doc, so it is in the guard's scope. The application's step 7 should carry the guard's plain-run report line at its base, as at #493 and P7.

**F-1 (my lean, restated): (a), held more weakly than at R1.**
- **Why (a) still**: both READMEs are law, and their edits already go by ballot. My edit-kind read exists to catch a LAW edit dressed as EXECUTION or CORRECTION to skip the ballot, and under (b) a README edit is outside every reader of that kind.
- **Ada's A3 is not a defect of (a).** A README rule written in the ballot-first form reading `pointer-missing` is the check working, and it costs authors a habit: the dated form site 1 lists.
- **Surviving counter, Thurgood's (b)**:
  - **No README defect has been found** by any read so far. (a)'s costs are permanent: an always-loaded TCP sentence, two more acts of mine, an `**Edit kind**:` line on every ballot-roll PR, and a habit change for every future README rule.
  - **The cost is set against a risk no one has observed.** If Peter weighs cost over coverage, (b) is defensible, and I would not object to it. The fork is his.

*Signed: Stacy, 2026-10-29.*

#### [ADA R2]

*Read-only, 2026-10-29.*
- *Ballot read at `4906ace8a`: site 1's "Why each part", sites 6–7, § 5 L243, § 6 F-1.*
- *Both site-1 variants, `batch-consults/l31-after-a.txt` and `l31-after-b.txt`.*
- *The regex compared as a string (Python `count` of the exact text): 2 occurrences in the ballot, 1 in my R1, byte-identical.*
- *The regex run in `node` against the three forms from my R1 and the four named forms.*

**1 · The forms sentence is my wording and complete for the four forms. It does not say that a citation is not a pointer, and I would add one sentence.** → § 3 "Site 1", both variants
- `amended`, `added`, `moved` and `corrected` are the forms my R1 named, with `added` for new text. That matches L31's form and the forms in use.
- **What neither variant says**: a ballot citation, `*(ballot <name>)*` or "per ballot `<name>`" in prose, is not a pointer. The check cannot be misled by one, because it asks for at least one matching pointer among a file's added lines, so a citation beside a pointer is harmless and a citation alone reads `pointer-missing`, which is correct. A *reader* can be misled, though: the READMEs' own rules have used `*(ballot <name>)*` to mark added text, so an author will take it for the `added` form.
- Proposed sentence, placed after the forms list, in both variants:
  ```
  A ballot citation (`*(ballot <name>)*`, or a ballot named in a sentence) names a source and is not a pointer: it carries no date and no prior text.
  ```
- **Process-Spec-Planning L573** ("*(Class 4's body extent amended by ballot `…` S6. …)*") is not a citation. It records an amendment, but in a non-conforming form, with no date and no SHA. The sentence must not call it a citation, because that would be false. **A new edit in that form should read `pointer-missing`**, so that the author writes `amended <date> by …`. The existing line is left alone, since the check reads added lines only. Like my L177, it is short of L31's form. Its CORRECTION, if any, is Thurgood's in his file and is not owed by this ballot.

**2 · The regex is byte-identical to my R1, and my R1 regex is wrong. A ballot's name carries a date, so "a date anywhere in the parenthesis" accepts a pointer that has none.** → § 5 "Decision", L243
- Run in `node`:

  | Case | R1 / § 5 regex | Tightened |
  |---|---|---|
  | Token Governance L177, moved text without a date (`*(Moved verbatim … by ballot 2026-10-25-token-selection-…`) | **match**: the date inside the ballot name satisfies it | no match, so `pointer-missing` |
  | `*(amended by ballot 2026-10-26-x, site 3; prior text at …)*`, no date | **match** | no match |
  | ballot-first `*(ballot 2026-10-26-…)*` | no match | no match |
  | Process-Spec-Planning L573, mid-sentence | no match | no match |
  | `*(Amended 2026-10-27 by ballot …)*` | match | match |
  | `*(moved 2026-10-25 from … by ballot …)*` | match | match |
  | `*(Corrected 2026-10-29: …)*` (L697) | match | match |
  | `*(added 2026-10-29 by ballot …)*` | match | match |
  | `*(Corrected 2026-10-25 (Ada): …)*` (Token Governance L543) | match | match |
- **So, as written, L177 reads `ok`, not `pointer-missing`.** The check would pass the exact defect my R1 said it should find. My R1 widened the regex to admit L177's shape, and widened it too far.
- **Replacement**, the date directly after the verb, which is where all four named forms put it:
  ```
  /\*\((amended|corrected|added|moved) \d{4}-\d{2}-\d{2}/i
  ```
  This is Thurgood's original pattern, plus `moved`.
- Falsification fixture for Stacy's S2 list: **"`*(amended by ballot <dated-name> …)*` (no date) → `pointer-missing`"**. It is the case that tells the two regexes apart.
- The L177 CORRECTION is still mine: add `2026-10-25` after "Moved verbatim" and recast the line to the named `moved` form. Truth: L31 as amended by this ballot. I file it after this ballot applies, so that the form I correct it to is law.

**3 · F-1: I lean (a), bind both READMEs, on the test that decided the charter exemption.**
- **Why.** The charters are exempt because other homes carry their history: the Edit-kind line, the sheets, the lock, the chain and `git log`. Under (b) the READMEs have only `git log` and an inline-citation practice that no rule requires and no check reads. So by the charter test they are the opposite case: law with the fewest history homes.
- **Cost.**
  - A roll-entry edit is EXECUTION, so it is listed and not checked, and owes no pointer. The added cost on every ballot PR is one PR-body line.
  - The real costs are site 7's sentence in always-loaded TCP and Stacy's two acts.
  - (a) also puts README edits under the one non-model oracle this ballot builds, which is the self-governance direction Peter set.
- **My RS-54 test, reconciled.** In my RS-54 read I said the pointer earns its place where a reader meets text cut off from its history. The READMEs are read whole in-repo, which points to (b). I now think the history-homes test, not the reader test, is the one that decides an exemption. It is the one the charters' exemption actually rests on. That is a change in my reasoning, stated, not hidden.
- *Surviving counter-argument (Thurgood's, which I cannot fold away)*: no README defect of this kind has been found. (a) adds two LAW sentences, one in always-loaded TCP, and a re-signed unit, for a document class with no measured failure, while Spec 131 is shrinking governance. A softer form exists and is unvetted: put the READMEs on the edit-kinds list (site 6 only) for visibility to Stacy's read, without binding them to pointers. It saves site 1's README clause but not site 7, so it saves little. I name it and do not recommend it.

#### [THURGOOD R3]

*@-mention scan: none outstanding.*

- **Stacy R2 (1), Low fix A, taken.** Site 2's clause now says what an `unlisted-path` line is: a declared file the rule does not reach, so not a finding. → § 3 site 2.
- **Stacy R2 (1), Low fix B, taken.** The clause now names its start: PRs merged at or after the merge of the PR that applied this ballot. § 5 states the same start point, so #541's three pointers never read `pointer-on-exempt`, and "Retroactivity: none" stays true. → § 3 site 2, § 5.
- **Stacy R2 (2), the checkpoint note, taken** into the PR-body list. → § 4 step 9.
- **Stacy R2 (3), the governance-examples line, taken.** It is labelled as reasoning, not a run, and under F-1 (a) the application pastes the guard's plain-run report line. → Census block, § 4 step 7.
- **Ada R2 (1), taken.** Her sentence is added verbatim to both F-1 variants, after the forms list. Process-Spec-Planning L573 is called a non-conforming amendment pointer, not a citation. → site 1. If L573 is corrected, that CORRECTION is mine in my file, and this ballot does not owe it.
- **Ada R2 (2), taken.** The § 5 pattern is now `/\*\((amended|corrected|added|moved) \d{4}-\d{2}-\d{2}/i`, with the date directly after the verb. My R2 had adopted her R1 pattern, which passed Token Governance L177. Her fixture is the eleventh. → § 5.
- **F-1, leans restated**: Stacy (a), held more weakly, with no objection to (b); Ada (a), on the history-homes test; Thurgood (b).
  - Ada's test is the strongest argument against my lean, and I carry it as the residual. The charters' exemption does rest on their other homes, and under (b) the READMEs have fewest.
  - I hold (b) because (a)'s costs are permanent and the risk is unobserved. Both of them carry that counter as surviving too.
  - The pick is Peter's. → § 6.
- **Ruled since** (Peter, 2026-10-29; see the Status line): ratify, *"Re: 1, Ratify"*; the reading, *"Re: 2, let's go with the recommendation"*; F-1, *"B with the wording and record"*.

#### [ADA R3]

*Read-only, 2026-10-29.*
- *Ballot read at `86ebb0729`: site 1's (b) variant, § 5, § 6 F-1, my R2, THURGOOD R3.*
- *For the ballots README, the text above "## Ballots on record" hashed at each of its 41 commits and compared with the parent.*
- *For the issues README, each of its 13 commits read in its diff.*
- *Pointer and citation forms counted with `grep` on each file and on each commit's added lines.*

**1 · F-1: my lean moves from (a) to (b). I withdraw my R2 premise that the READMEs have the fewest history homes.** → § 6 F-1
- **Every rule edit to either README went through a ballot** (verified). A ballot holds the before-text verbatim, so the READMEs share the charters' first home: "the ballot or record that names the site".
  - Ballots README: the text above "## Ballots on record" changed in exactly five of its 41 commits: `1dc26252e`, `c470a248f` (#408), `71ce7e2d7` (#416), `58ec2aea5` (#419) and `52f874275` (#541). Each is a ballot ratification or application. The other 36 commits are roll entries.
  - Issues README: every one of its 13 commits that changed rule text is a ballot commit. The four that are not (#173, #174, #188, #189) edited rows of the old roster table, before L31 existed.
- My R2 said the READMEs had "only `git log` and an unenforced citation practice". That left out the ballot record, and it was wrong.
- What the READMEs lack next to the charters is the Edit-kind line, the sheets, the lock and the chain. Those detect an edit. They do not hold its history. So under (b) the history-homes test does not separate the READMEs from the charters, and Thurgood's counter decides: (a)'s costs are permanent, and the risk it covers has not been seen.

**2 · Correction to § 6 (b) and site 1: the split did occur in the issues README.** → § 6 F-1 (b); § 3 "Site 1", (b) variant
- After L31 landed (`71ce7e2d7`, 2026-10-19), rule edits to the issues README went (verified):
  - ballot-first `*(ballot …)*` in #436 (`b42874bd0`) and #444 (`f985e2079`);
  - a dated `*(added 2026-10-26 by ballot …)*` in #496 (`a19481725`);
  - ballot-first again in #527 (`61581c641`);
  - a dated `added` in #541 (`52f874275`).
- Rules 1, 8 and 11 were rewritten in place in #436, and rule 1's token list again in #527. The issues README contains zero "prior text at" strings.
- So "cite their ballots inline" is not uniform practice: the two READMEs now carry five dated `added` pointers next to ballot-first citations. And "never occurred there" is false. RS-54's pattern, ballots days apart reading L31 two ways, happened inside one README. No harm from it has been found, because each ballot holds the before-text and `git log -L` reaches it.

**3 · Site 1's (b) clause, replacement wording.** → § 3 "Site 1", (b) variant
- Current: "No other path owes one: this README and `.kiro/issues/README.md` cite their ballots inline, and `docs/**` and `.cursor/rules/**` restate law and are not its home."
- Replacement, to paste:
  ```
  No other path owes one. This README and `.kiro/issues/README.md` owe none: an edit to the rules of either cites its ballot inline, and that ballot carries the before-text. `docs/**` and `.cursor/rules/**` restate law and are not its home.
  ```
- It turns the description into a rule. It adds no TCP sentence, no act by Stacy and no Edit-kind line. No check reads it.
- The five dated pointers already in the READMEs stay ("Retroactivity: none").

**4 · Surviving counter-argument to (b), which I cannot fold away.** → § 7 "What survives"
- Under (b), two law documents stay outside the one non-model check this ballot builds.
- A README rule edit made outside a ballot, or declared as EXECUTION, is caught only by Peter reading the diff at merge. That runs against Peter's aim that agent self-governance rest on non-model checks.
- No instance has been seen in the READMEs' 41 and 13 commits. (B) would not fully close the gap under (a) either, since it reads only declared lines (§ 5 "Its reach, stated").

**5 · Neither README ships to consumers or loads in any session.** → § 6 F-1
- Neither is in `package.json` `files`, which carries only the eight identity steering docs from `.kiro/steering/` (verified). Charters and TCP cite them, and nothing loads them whole (verified).
- Whether the docs MCP indexes them: unverified.

#### [STACY R3]

*Read-only, 2026-10-29, on the DRAFT R3 at `86ebb0729`; `main` read at `24a527c91`. The orchestrator consulted me on F-1 after the R3 draft and before Peter's ruling; this entry records that consult.*
- *What I read: § 3 sites 1, 6 and 7; § 6 F-1; `[THURGOOD R3]`; `.kiro/docs/ballots/README.md` L42; `.kiro/issues/README.md`; Task-Completion-Protocol L123 and L129; Agent-Directory L42; and `git log` on both READMEs.*
- *I made no repo write.*
- *@-mention scan: none.*
- *Mirror clause: where a line is false, I give the measured facts, and the wording stays Thurgood's.*
- *PR bodies were not read (`gh pr view` was not run). Where I cite a body, I read the squash message, which in this repo has carried the body. Each such cite is marked unverified.*

- **F-1, my lean at the consult: (a), still weak, with no objection to (b). The reason changed.** → § 6 F-1
  - **"No reader sees a README edit" is weaker than I put it at R1.** I have never had a README edit I could not verify from git and the body. I also never had to: neither README is in my edit-kind read's population. My first read of them, below, found nothing wrong.
  - **What kept me on (a) is consistency, not an observed defect.**
    - Task-Completion-Protocol L129, the merge carve-out, calls `.kiro/docs/ballots/**` governance law.
    - The edit-kinds list leaves out both READMEs (ballots README L42; TCP L123). Verified.
    - So the README that holds the edit-kinds law, and under site 1 the pointer law, is the one law document that can be edited without declaring its kind.

- **§ 6's cost of (a) is overstated. Measured:** → § 6 F-1 (a), the "Cost" bullets
  - **"Two more LAW sentences."** Sites 6 and 7 add two path names and a dated pointer to two existing sentences: about 25 words, with no new rule. Verified from the two Afters.
  - **Two acts.** One-time: re-confirm and re-sign TCP's `#branch-and-pr-conventions`.
  - **"An `**Edit kind**:` line on every PR touching either README."**
    - Since `c470a248f` (2026-10-18), 19 commits touched either README.
    - 12 of them also touched a covered path, so they carried Edit-kind lines anyway.
    - The other 7 touched only `.kiro/docs/ballots/` files. 6 of the 7 already carry an `**Edit kind**:` line ("none owed" or "none"). `3a41f0023` (#528) carries none.
    - So under (a) the recurring cost is swapping a line authors already write. The counts are verified on the squash messages; the bodies are unverified.
  - **The author habit is already moving.** The two newest README rule additions use the dated form: `a19481725` (rule 11, `added 2026-10-26 by ballot …`) and `52f874275` (three `added 2026-10-29 by ballot …`). Verified.

- **The one real README history failure is the roll omission, and neither (a) nor (B) catches it.** → § 6 F-1 (b); § 5 "Its reach"
  - `6cf38d7b5` (#459, 2026-10-24) added 15 ballots missing from the "Ballots on record" roll, as a CORRECTION of omission. They are dated 2026-07-07 → 2026-10-23. The Spec 131 ballot audit found them; no standing reader did. Verified.
  - It undercuts (b)'s "the ballots README carries a roll entry per ballot" as a reliable practice.
  - It is an absent edit, though. My edit-kind read and (B) read only declared edits that happened, so (a) would not have caught it either.

- **Six README rule amendments sampled: none silently rewritten, and each one's history is recoverable without a pointer.** → site 1 under F-1 (b), "this README and `.kiro/issues/README.md` cite their ballots inline"
  - Samples: `f985e2079` (#444, rule 1, an insertion, the old text intact), `a19481725` (rule 11), `52f874275`, `61581c641`, `58ec2aea5`, and the roll correction `6cf38d7b5`. Each carries its citation inline. Verified.
  - Declaring a README edit's kind is voluntary today, and inconsistent:
    - `f985e2079` declared `.kiro/issues/README.md — LAW`;
    - `58ec2aea5` wrote "Carve-out paths, no Edit-kind line: `.kiro/docs/ballots/README.md`";
    - `a19481725` declared nothing for the README.
    - Squash messages; the bodies are unverified.
  - The site 1 (b) clause is true of these samples.

- **My surviving counter-argument to (b).** Under (b), two documents that bind every seat stay outside the one mechanical check this ballot builds. Their history rests on a citation practice that no rule reads, and the same README's roll practice has already decayed once without anyone noticing. A silently rewritten README rule would be caught only by a reader who goes looking in git.

- **Peter's ruling on F-1 is (b), with Ada's rule wording and the record. I accept it.** → § 6 F-1; § 4 step 1
  - Peter, chat, relayed by the orchestrator, received before 2026-10-29T03:52:42Z, verbatim: *"B with the wording and record"*.
  - **The record.** "Which paths are governance paths" goes to Spec 131's requirements round. My draft is given to Thurgood to file as owner (README rules 9 and 10). Today the paths are stated in four places that disagree:
    - the merge carve-out (TCP L129, and the register row `record-first-ratification`);
    - the edit-kinds list (ballots README L42 and TCP L123);
    - the consult-line trigger surfaces (Agent-Directory L42, and the register row `orchestrator-consult-line`);
    - site 1's bound and exempt list.
  - **Rule 10 timing.** The record is owed in the same PR that records the ruling, which is this ballot's Status commit (README rule 10).
  - **Ada's wording.** It is Thurgood's to apply at site 1, and I propose no text. I checked one fact: the four ballots behind the sampled rule additions each carry a before-text or an insertion point. That was a grep, not a full read of each site, so it is unverified for each site.

*Signed: Stacy, 2026-10-29.*

#### [THURGOOD R4]

*At the Status commit, 2026-10-29. @-mention scan: none outstanding.*

- **Peter's rulings recorded**: the Status line, § 2.2, § 6, and the header's "Ruled" line. The two R2 and R3 "Open for Peter" lines are rewritten as "Ruled since", so no open question remains in the file.
- **Ada R3 items 1 and 2, taken as corrections.** § 6's R2 text said the READMEs "cite their ballots inline, by practice" and had "the fewest history homes". Both are false, and § 6 now states the measured facts. My earlier reasoning, that the split RS-54 names never occurred there, was also false: the issues README shows it. I withdraw it. No false premise is carried into RATIFIED.
- **Ada R3 item 3, applied verbatim** to site 1's README clause. Only the (b) After remains. The (a) After and sites 6 and 7 are dropped from § 3, and their texts stay in this file's history at `86ebb0729`.
  - `scratchpad/batch-consults/l31-after-b.txt` is updated to match.
  - `l31-after-a.txt` is deleted (declined).
- **Stacy R3, taken as fact into § 6**: (a)'s measured cost, and the roll-omission instance. Her surviving counter is carried in § 6 and § 7.
- **Under F-1 (b)**, confirmed in the record:
  - Stacy owes six acts, as listed in § 4 step 5.
  - The census block names no TCP site.
  - The grant carries no TCP path.
- **The governance-paths record is filed**: `.kiro/issues/2026-10-29-governance-paths-four-lists.md`, from Stacy's draft, with me as Owner and Stacy as an interested party.
  - Class: P2 obligation (record) · defect.
  - Trigger: `path:.kiro/specs/131-governance-simplification/requirements.md`, as in the 2026-10-24 precedents.
  - Its four lists were re-read at `24a527c91`.

## 9. Application ledger

(empty)
