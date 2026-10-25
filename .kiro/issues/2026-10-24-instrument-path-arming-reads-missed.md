# The instrument-path ARMING read was missed at seven merges

**Date**: 2026-10-24
**Status**: ACTIVE — the eight owed reads are DISCHARGED (2026-10-25, § 5 below); the class option (§ 4) is still unpicked and keeps the record open. *(2026-10-25, Stacy, owner, rule 9. Was: "ACTIVE — owed. Seven reads are owed, and #459's read is owed at its merge.")*
**Owner**: Stacy. The reads are hers: her charter's ARMING row, the instrument-path limb (ballot `.kiro/docs/ballots/2026-10-17-standing-write-scope-six-roots.md` § 3 item 4, applied to `canonical/agents/stacy.md` by #397, `096e11f99`, 2026-10-17).
**Trigger**: `release:next:phase-1` — the next RELEASE phase-1 record reads whether each read owed below is appended here, or ruled not owed with a dated reason. RELEASE is this limb's named backstop over the release delta. All seven merges fall after 16.0.0, so they are in the next release's delta.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-24, Stacy, rule 12. The limb is the only reader of a weakened checker that leaves the required-check set unchanged, as my charter says. Each missed read leaves that guard weaker than its claim. No finding is known to hide behind any of the seven; none was looked for. It is (guard), not (record).)*
**Source**:
- The finding: my cross-check in `.kiro/specs/131-governance-simplification/evidence/2026-10-24-ballot-audit.md`, row `2026-10-17-standing-write-scope-six-roots`: the limb "fired at least 5 times with no read". This record replaces "at least 5" and "probably" with the full count.
- My only ARMING read since the row landed is the registry-path read for #427 (`.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md`). It records this limb as "not fired" for #427 alone.
**Consulted**: none needed — this records a missed duty of my own seat.

---

## 1. The merges (count, not sample)

Command, run from the repository root at `e4e61eea2`: `git log --first-parent --format='%h %ad %s' --date=short 096e11f99..e4e61eea2 -- <the instrument paths>`, where the paths are the instrument-path list in my charter's ARMING row. Run it under bash, not zsh, so the path list word-splits. It prints 7 merges. `git diff-tree --name-only -r <sha> -- <paths>` gives the paths each one touched:

| Merge | Date | Instrument paths touched | Read |
|---|---|---|---|
| `ef9c5a9d2` | 2026-10-19 | `regrounding/verify-signing-chain.ts` | owed |
| `8d62ed8c5` | 2026-10-19 | `scripts/completion-claims/materiality.ts`, its test | owed |
| `43f22d47b` | 2026-10-19 | `scripts/check-completion-criteria-parity.ts`, `scripts/completion-claims/verdict.ts`, its test | owed |
| `8033f3a3e` | 2026-10-19 | `regrounding/verify-signing-chain.ts` | owed |
| `bd49e28d5` | 2026-10-19 | `scripts/completion-claims/{completion-doc,verdict}.ts`, two tests, 28 files under `scripts/completion-claims/__fixtures__/**` | owed |
| `9359c3805` | 2026-10-21 | `regrounding/{freshness,verify-signing-chain}.ts` | owed |
| `05513944e` | 2026-10-23 | `regrounding/{freshness,signatures,triviality}.ts` | owed |

`bd49e28d5` is the one to read first, because it touches fixtures, and a deletion under `__fixtures__/**` without a named spec amendment is the limb's first read.

**Also owed**: #459 (`fix/ballot-audit-fix-now-corrections`) touches `scripts/check-completion-criteria-parity.ts`, a header comment only. Its read is owed at its merge and goes here. I did not read it before the merge. The limb "reads after acceptance … never read pre-merge" (my charter, ARMING row).

## 2. Why it was missed (the class)

Nothing fires this limb. Its sibling, the registry-path limb, has a standing record with a `path:` Trigger, so `scripts/issues-owned.sh` prints `FIRED@<sha>` at my session start. This limb has no record and no token. Its paths are about 19 globs, and rule 1's `path:` token takes one glob. No LIVENESS item asks for it either. The audit's own words describe this shape: rules with prose triggers have no detector, "so unfired and dead look alike" (ballot audit, Stacy's cross-check, closing paragraph).

## 3. What I will do

- Each read is decidable from git and the PR body. The PR body needs `gh pr view <n> --json body`, run by a session holding credentials. I perform the seven reads after acceptance, which is the form the limb requires, and append each one below, dated, with its commands.
- Once #459 merges, I append its read here as well.

## 4. Class option (surfaced, not picked)

Two options would give this limb a detector. Both add a reader obligation or change tooling, so both are LAW or owner tooling, not mine to apply:
- **(a) A standing home plus a multi-path token.** This record becomes the standing home for the limb's reads, like the registry record. Rule 1's grammar, or `scripts/issues-owned.sh`, learns a token that names a path list, for example a register row's instrument list. *Cost*: a rule 1 edit (LAW) and a tooling change by its owner (Thurgood).
- **(b) A LIVENESS query.** Thurgood's LIVENESS gains an item that lists instrument-path merges in the window that have no appended read here, and prints `OWED` for each, as his item 4 does for grant activation reads. *Cost*: one charter row in Thurgood's seat (LAW), and minutes per walk.

*Counter-argument*: both add a mechanism to a governance system that Spec 131 is trying to shrink. *What survives*: without one of them, this limb depends on my memory, and it has already failed seven times. The next RELEASE pass catches it only after the delta has grown.

---

## 5. The reads — Stacy, 2026-10-25

**The 8 owed reads, performed after acceptance** (at `652074c6b`).
**Verdict: no merge weakened a checker or a floor; 8 of 8 read; 0 FAIL; 4 formal findings (Low, unnamed deletions, executing agent Thurgood in all four); EXPECTED_CONTEXTS unchanged at all 8 (count 19, `verify-gate-registration.sh` PASS at 652074c6b).** Method: per merge `<m>` against `<m>^`: (1) `git diff --numstat --no-renames <m>^ <m>` deletions under any `__fixtures__/**`, `tools/agent-generator/__tests__/fixtures/**`, and in any generator test the tests-follow-the-module rule assigns to a § 4 B checker (module whose basename equals the test's stem, else its first `../` import); (2) the PR body cites the fixture test run; (3) `EXPECTED_CONTEXTS` unchanged (`git diff <m>^ <m> -- tools/agent-generator/verify-gate-registration.sh .github` empty at all 8). **PR bodies: read from files pasted by the coordinator (`gh` is not available to this seat); every "body says" below is that paste.** Whether a named deletion weakened an assertion is not decided by the limb; I note what each deleted line is.

| merge (PR) | fixtures deletions | assigned-test deletions | body: fixture run cited | EXPECTED_CONTEXTS | result |
|---|---|---|---|---|---|
| `ef9c5a9d2` (#409) | 0 (body says 0) | **1** — `verify-signing-chain.test.ts` (stem = module): the `../regrounding/verify-signing-chain` import line, widened by `AGENT_ABOVE_FINAL_PARAGRAPH`; **body names no test deletion** | yes — 60 suites / 1708 | unchanged (body says so) | **F1 (Low)** |
| `8d62ed8c5` (#417) | 0 | **1** — `materiality.test.ts` (stem = module): a header-comment line extended; **body names none** | yes — `test:scripts` 19/502 | unchanged (git; body silent) | **F2 (Low)** |
| `43f22d47b` (#422) | 0 (body: `22 0 verdict.test.ts` only) | 0 | yes — fixture suite 35/35, `test:scripts` 19/504 | unchanged, count 19 (body says so) | PASS |
| `8033f3a3e` (#423) | 0 (new tree `__tests__/fixtures/signing-chain/tree-signer/` is additions only) | **1** — `verify-signing-chain.audit.test.ts`: an import line widened. **By the letter not assigned** (stem `verify-signing-chain.audit` equals no module; first `../` import is `../frontmatter`); by intent it tests the checker. Body names none | yes — `test:agent-generator` 60/1735, 43 audit tests | unchanged (git; body silent) | PASS by the letter; **F3 (Low, if read by intent)** — see Standards implications |
| `bd49e28d5` (#424) | **1** — `scripts/completion-claims/__fixtures__/expected-classes.json`: `"ratification-record"` re-emitted as `"ratification-record",` beside an added `"status"` (a class added to the expected set). Body lists "scripts/** (instrument + tests + fixtures)" but **names neither this deletion nor an amendment line for it** | 0 | yes — `test:scripts` 20/547, nine fixtures bite old parser | unchanged (git; body silent) | **F4 (Low)** |
| `9359c3805` (#437) | 0 (body: deletions under `__tests__/**` + `__fixtures__/**` 0; git agrees) | 0 | yes — `test:agent-generator` 63/1804 | unchanged (`.github` 0 files; git) | PASS. **Census: not owed** — the M1 clause-3 erratum's record is dated 2026-10-17 (`archive/2026-10-17-first-signatures-not-on-stale-list.md`), before the census rule's ratification (2026-10-19, Q6); no ballot census line ruled on this PR's shipped change. The `census:` field it added reads: command `…verify-signing-chain.ts --census-routed` — present, equals the ballot's `<command>` |
| `05513944e` (#445) | 0 (none touched; git agrees) | **22 across 5 tests**: body names 4 with ballot § 3 site 4 / site 1 as the amendment (`freshness.unsigned-routed` 10, `verify-signing-chain.census-routed` 6, `verify-signing-chain.first-signature` 1, `triviality.assignment` 1 import line) and `consumer-profile.real.test.ts` (4) as not assigned; git matches those counts exactly | yes — `test:agent-generator` 63/1814 | unchanged, no `.github` path (body + git) | PASS. **Census (shipping-PR re-run, ballot 2026-10-19 path-list read): digests equal.** I ran the shipped code (`tools/agent-generator/regrounding/**` is byte-identical from `05513944e` to `652074c6b`) `--census-routed --at dae569756` → `1090 rows; 389 routed; 20 unsigned-routed; errors 0`, sha256 `079376c4a8e972ab4f128e93a1000f3320abebc3acbc741071ad74b96dc188bd` = the ballot § Census appendix "Application re-run" scratch arm and the PR's own line; `--at 9359c3805` and `--at b42874bd0` → `1089; 388; 19; 0`, `0f5c514495cb293accd3ac79a65196cf6c66f83be85a18d1b1cbd8e940573204` = the ratified § 4 proposed digest. No carve-out. **Not re-run by me this session: the scratch arm itself** (I rely on its recorded digest, which my census read of `0260546d3` reproduced) |
| `6cf38d7b5` (#459) | 0 | 0 | yes — `test:scripts` 22/22, 597/597 | unchanged; the one hunk (`scripts/check-completion-criteria-parity.ts` header comment) moves "stays OUT of EXPECTED_CONTEXTS" to "in EXPECTED_CONTEXTS", and the new claim is true (`verify-gate-registration.sh` L86 lists `completion-criteria-parity`; PASS 19) | PASS. **Disclosure:** I read this PR pre-merge as a teammate under F-2 (its body names the co-signer risk); this read is the separate post-acceptance ARMING act on the same hunk and is counted as same-reader, not independent |

**Findings F1–F4** — one class: the limb's "unless the PR body names the file and its spec amendment" fires on benign edits (an import widened, a header comment extended, a trailing comma beside an added entry) that no body names. None removes an assertion or a fixture entry. Routed: **the remediation route is Thurgood (executing agent); no message to Peter, because no deletion weakened a floor.** Standards implications: **list** — (1) the clause cannot tell an import/comment/comma edit from a removal, so 4 of 8 PRs trip it; a numstat that counts only lines removed *without* a corresponding addition would cut the noise (Thurgood's text; I do not draft it); (2) the tests-follow-the-module rule is ambiguous for dotted test names (`verify-signing-chain.audit.test.ts`: stem with or without `.audit`?); (3) only 3 of 8 bodies (#409, #422, #445) carry an explicit ARMING read; #437 and #459 carry partial ones; #417, #423 and #424 none — the limb needs no disclosure line, but they are the three the read owes the most git work for.
**Steward-verb tool files** (`mcp-server/src/tools/{validate-metadata,list-cross-references,rebuild-index}.ts`): touched by 0 of the 8, and by none since `096e11f99`.
**Counting block, this record:** reads owed 8 · done 8 · findings 4 (Low) · FAIL 0 · self-reported by the PR body 3 of 8 · digests reproduced 3 (`079376c4…`, `0f5c5144…` twice).

**Outcome line (rule 5, partial; Stacy, 2026-10-25):** the Trigger's condition — "whether each read owed below is appended here, or ruled not owed" — is met: 8 of 8 appended above, 0 FAIL, 4 Low findings routed to Thurgood. **The record does not close**: § 4's class option (a)/(b) has no pick (both are LAW or owner tooling, Peter's), so without it the limb still fires on nothing. It stays a P2 `(guard)` and rides the Trigger as written; if it is still open at 16.1.0's S it lapses (rule 11) and goes to Peter with spec / drop / fix-now, which is the fork it still owes.
