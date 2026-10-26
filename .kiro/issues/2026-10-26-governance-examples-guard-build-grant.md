# Grant: write scope for the governance-examples guard's build PR (`scripts/governance-examples/**`)

**Date**: 2026-10-26
**Owner**: Thurgood (the instrument's owner; ballot `2026-10-26-governance-examples-guard` § 2.6, register row `governance-examples`, `owner: thurgood`)
**Trigger**: `manual` — the event is the merge of the build PR, branch `feat/governance-examples-guard`, which is committed only after this record's activating merge; `merge:#<N>` at its open. The grant is activated by Peter's merge of a PR whose body names this file and lists the path below (`.kiro/issues/README.md` rule 8). It expires at the build PR's merge, and archives there (rule 5).
**Class**: P3 improvement · grant
**Source**: ballot `.kiro/docs/ballots/2026-10-26-governance-examples-guard.md`, **RATIFIED (Peter, 2026-10-26)**, merged in #495 (`f55bf3e04`). Its § 4 step 2 owes this record ("A grant record (rule 8): owner Thurgood; paths `scripts/governance-examples/**` only; Ada and Lina named as the predicates' authors"), and its § 8.9 fixes the grant line's text. The line below is § 8.9's block, byte-exact.

---

**Grant paths**: `scripts/governance-examples/**`. Owner Thurgood. The predicates' authors are Ada (token-name, v1) and Lina (file-shape). Activated by Peter's merge of a PR whose body names this grant; it expires at the build PR's merge. It does not cover the register row or the Integration Guide marker: both are governance paths, and each is EXECUTION of ballot 2026-10-26-governance-examples-guard (§ 4 step 3, § 2.3). It does not cover `.github/in-lane-guards.json` either, which is Thurgood's standing lane scope (P1b, additive).

## What the path is for

The instrument of ballot § 2 and § 4 step 3, and nothing else, under `scripts/governance-examples/`:

- **The check**, with the module header carrying § 8.1 (Ada's predicate v1), § 8.2 (her under-inclusion limit), § 8.3 (Stacy's whole-module sentences), § 8.4 (Lina's file-shape rule) and § 8.5 (marker scope), each byte-exact, and `PREDICATE_VERSION = 1`. It has the token-name half, the file-shape half (declared paths, L-3; token-file shape, L-1 and L-2) and the import-surface check (F-2 (c)).
- **The runnable report**: `npx tsx scripts/governance-examples/check.ts` prints § 8.6's report line and exits 1 on a failure; `--census` prints one sorted line per doc and the selected count (§ 2.6).
- **The test with fixtures** under `scripts/governance-examples/__tests__/`: Stacy's C-e list and Ada's R-5 cases (§ 2.5), the RETIRED_FAMILIES/FAMILIES disjointness test (A-5), and Lina's twin-agreement test against the loader's `getTokenContract` over the seven real token files and one plain-map fixture (§ 2.2, L-2). The test reads `src/cli/loadComponentTokens.ts`; it does not edit it.
- **`pending.json`**: § 8.6's baseline header, and one entry per hit at adoption, content-keyed (doc, half, failing string, occurrence index; the line informational, L-6), each with a `home` that resolves to a committed record holding the hit's disposition (§ 2.4).

## What this grant does not cover, and what the build PR rests on instead

- **`governance/classification-map.md`, the `governance-examples` row** (§ 8.8) and **`governance/DesignerPunk-Integration-Guide.md`, the one `<!-- example: consumer -->` line** (§ 8.10). Rule 8 never grants a governance-law path. Each is `EXECUTION` of the ballot (§ 4 step 3, § 2.3), Peter-merged under the governance carve-out, with its `**Edit kind**:` line in the build PR's body.
- **`.github/in-lane-guards.json`, the one added entry** (§ 8.7). Thurgood's standing CI scope, P1b: an added entry only, no other key changed, the additivity predicate `true` against the merge base, and the step's `N registered; N selected` line in the PR. ARMING audits that PR at its merge, as for every PR of the standing scope.
- **`.github/workflows/lane-timing.yml`**: no edit. The test runs in `npm run test:scripts`, which the required `lane-functional-root` job already runs after `npm run build` (§ 2.5: "No workflow edit"). `scripts/jest.config.js` already matches `**/__tests__/**/*.test.ts` under `scripts/`, so it needs no edit either.
- **`canonical/generated.lock`**: `governance/` is an input-closure root, so the two governance hunks move the lock (§ "Census", the 122-diff-guard line: "the lock is refreshed at the build PR"). The lock is regenerated, never authored, and it rides as `EXECUTION (regeneration)`, as in #496 and #505.
- **Any fix to a doc the guard reads.** Every hit at adoption is pending and homed (§ 2.4); each owner's fixing PR converts its own entries. This grant adds no marker and corrects no example.
- An edit outside the list, or outside the purposes above, is a claims-pass finding.

## The homes, on `main` at this record's base (`0218632d1`)

- **Ada's 56 token-name hits**, and the four file-shape and import hits she took (Token-Family-Blend L88, Token-Family-Layering L76, Token-Resolution-Patterns L204 and L247): `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md` § "Corrections and the vetted list (2026-10-26, Ada)", merged in #495 (`f55bf3e04`).
- **Lina's CDG hits** (L576 path and shape; L956 path and shape; L1108 import): `.kiro/issues/2026-10-25-cdg-component-token-files-teaches-a-reference-map.md`, L576 in its body and L956 and L1108 in her 2026-10-26 append (which reads them as L955–L958 and L1109), merged in #507 (`aff9a6e7b`).
- **The five Test-Development-Standards declared-path hits** (L1556, L1583, L1620, L1659, L1902): `.kiro/issues/2026-10-26-tds-workflow-examples-declare-files-that-do-not-exist.md` (Thurgood's rule-10 record), merged in #507 (`aff9a6e7b`). L1884 is in that record but is not a v1 failure, so it has no entry.
- **The Integration Guide L699 consumer path** is not pending: the build PR adds its marker (§ 8.10).
- The build PR checks that each `home` path is tracked at its base and holds the hit; one that does not stops the build PR.

## An entry fixed between adoption and the build PR's merge

Adoption is the build PR's merge M: the row reads `armed` at M, and `pending.json` at M carries the baseline header (§ 2.4, "Adopted"). The list is therefore the guard's run at the build PR's final base, not the ballot's census at `a95d6bf3d`:

- **A fix that merges first** (for example Lina's correction PR `fix/cdg-web-icon-examples-and-attributes`, which changes the CDG import to `@3fn/core/blend`): the build PR is updated from `main`, re-run, and the hit is not listed. A listed entry that no longer fails is stale and fails the test, so it cannot stay by accident. The baseline header carries the smaller count (import 2, not 3), and the PR body compares the re-run with the census line's count and names the fixing PR as the difference (ballots README § "Re-runs").
- **A fix that merges after M** removes its own entry from `pending.json` in the same PR, because the stale entry turns the required check red on that PR's merge ref (§ 2.4: "the fixing PR removes its own entry").
- **A gap this grant cannot close**: after M, `scripts/governance-examples/pending.json` is in no seat's standing scope (§ 2.6 defers adding the paths to Thurgood's), and in any case a fixing PR is usually Ada's or Lina's. So a fixing PR that merges after M has no scope over the entry it must remove, unless it carries a rule-8 grant of its own. Ballot § 2.6 defers three `canonical/agents/**` items to a ballot filed with the build PR; that ballot also has to say who may remove a pending entry, and on what ground (for example: the owner of the entry's `home` may delete exactly the entries homed there, and nothing else in the file). Until it lands, the cheapest order is the one above: a fixing PR already in flight merges before the build PR.

## Authority

- **The measure**: ballot `2026-10-26-governance-examples-guard`, RATIFIED (Peter, 2026-10-26), merged in #495 (`f55bf3e04`): *"Ratified"* (received before 2026-10-26T01:51:31Z), *"Proceeded as recommended"* (before 01:54:41Z), and *"yes"* on P-2 (before 01:58:00Z), as its Status line records.
- **The go to build now**: Peter, chat, relayed by the orchestrator, received before 2026-10-26T18:05Z (the orchestrator's clock), verbatim: *"If there are any other items of the list that can/should be done in parallel with those running, please, proceed"*, given after his go on Lina's correction PR. The orchestrator's brief to Thurgood names this guard's grant record and build PR as such an item.
- **The order** (grant record first, build commits after its merge): rule 8 and rule 10's last sentence; precedent #498 then #499, #501 then #503, #506 then the notes-fix PR.
- No ratification authority; additive to charter scope and nothing else.

*Signed: Thurgood, 2026-10-26.*
