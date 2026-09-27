# Task 7 Completion — The publish-rail guard, ballot B-U1, and the CHANGELOG's start

**Spec**: 123 — Consumer Distribution · **Unit**: U1 — Distribution substrate & packaging truth (Tasks 1–9, gated at Task 9) · **Type**: Implementation · **Validation**: Tier 3
**Agent (plan)**: PRIMARY Thurgood (Sonnet)
**Delegated-tier**: plan held
**Traces**: Reqs 6.1–6.8, 21.2 · design C9, DD12, DD13 (split), DD16 · SLOT T2 (the queried tag)

---

## Success Criteria

These rows are exactly what `parseTasksMd` extracts for parent 7: **10 rows** (6 top-level bullets; the "Three bites plus one committed measurement" bullet decomposes into itself plus its 4 nested bullets).

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The script matches the drawn form (`set -euo pipefail`; exits 10/11/12/13; `--self-test-host` exits 12 before `PASS`) *(Erratum 2026-09-27 — Stacy R1-1, Peter's ruling: "the drawn form" now means design.md C9's corrected HTTP form — a direct, unauthenticated `curl` GET against `registry.npmjs.org`, with `node -e` parsing and no `npm` CLI anywhere in the line. The original `npm view`-based drawn form is SUPERSEDED; it broke under its own required hermetic isolation env vars and would not have been hermetic even fixed, per C9's own erratum note.)* *(Second erratum, same date, Stacy re-check: the drawn form also gains exit `2` — a named USAGE error for an unset `VERSION`, never bash's own unbound-variable exit 1 — and `curl -q` as its first argument so `~/.curlrc` is never read, with standard proxy env vars deliberately still honoured. "Exits 10/11/12/13" above reads as "exits 2/10/11/12/13.")*. `shellcheck` (the official `/Users/3fn/bin/shellcheck` binary only — never `npx shellcheck`, a third-party wrapper) is clean, and each exit path's output is committed. | ✅ verified met | `scripts/verify-publish-rail.sh` — `set -euo pipefail` (L38); exits `2`/`10`/`11`/`12`/`13` all present and named; `--self-test-host` exits 12 before `PASS` (confirmed: a good host reaches `SELF-TEST ONLY`, exit 12, never `PASS`). `/Users/3fn/bin/shellcheck scripts/verify-publish-rail.sh` → exit 0, no findings (`scripts/__bites__/shellcheck.txt`, official binary only, version 0.10.0). Six exit-path transcripts committed: `pass-real-version.txt` (0), `bite-4-unset-version-exit2.txt` (2), `bite-2-version-mismatch-exit10.txt` (10), `bite-3-host-shim-exit11.txt` (11), `self-test-host-exit12.txt` (12 + the bad-host 11 sub-case), `empty-url-branch-exit13.txt` (13) |
| **Three bites plus one committed measurement** *(Erratum 2026-09-27: re-measured against the HTTP form; second erratum, same date: a PASS is a measurement, never a "bite" — that word is reserved for a recorded red, per Stacy's re-check — and a fourth bite is added for the new usage exit)*: | ✅ verified met | `.kiro/specs/123-consumer-distribution/completion/task-7-2-completion.md` — the committed measurement plus three bites, each with its command and transcript |
| the exact step-6 command, run against the real registry for the real published version (`14.1.0`) → **PASS**, the committed measurement — supersedes the original "6.3 verbatim command → red" bite, which quoted the now-superseded `npm view` form; | ✅ verified met | `VERSION=14.1.0 ./scripts/verify-publish-rail.sh` → `PASS: @3fn/core@14.1.0 visible on npmjs; tarball host verified`, exit 0 — `scripts/__bites__/pass-real-version.txt` |
| (1) `VERSION=99.99.99` → exit 10, via a real HTTP 404 from the live registry; | ✅ verified met | `VERSION=99.99.99 ./scripts/verify-publish-rail.sh` → `FAIL[version]: … (HTTP 404) … wait a minute and re-run.`, exit 10 — `scripts/__bites__/bite-2-version-mismatch-exit10.txt` |
| (2) a PATH-shimmed **`curl`** (not `npm`) returning a fixture JSON body whose `dist.tarball` is a GitHub Packages URL → exit 11 **through the production line**; | ✅ verified met | `PATH=".../fake-curl-github-tarball:$PATH" VERSION=99.99.99-fake ./scripts/verify-publish-rail.sh` → `FAIL[host]: … wrong rail`, exit 11 — `scripts/__bites__/bite-3-host-shim-exit11.txt`; shim source at `scripts/__bites__/fake-curl-github-tarball/curl` |
| (3) unset `VERSION` → exit 2, the `USAGE` message (new, second erratum). | ✅ verified met | `unset VERSION; ./scripts/verify-publish-rail.sh` → `USAGE: VERSION=<version> ./scripts/verify-publish-rail.sh [--self-test-host <tarball-url>] — VERSION is required and was not set`, exit 2 — `scripts/__bites__/bite-4-unset-version-exit2.txt` |
| **T2 ruled (B)**: the guard queries the version as drawn; no tag is involved. | ✅ verified met | `scripts/verify-publish-rail.sh` — no `--tag`/dist-tag argument or variable anywhere in the script; `VERSION` alone selects what is queried |
| **B-U1** is RATIFIED *(Erratum 2026-09-27, Task 7.3: the `Ratified-machine:` line is OMITTED, deliberately — following the T1-(B)/`delegated-tier-capture` precedent, not the `2026-09-19-completion-claims-integrity.md` precedent. That mechanism belongs to the one ballot `completion-criteria-parity` parses for its in-force date; reproducing it on B-U1 would create a second parseable record for a checker built to read exactly one. See the ballot's own `Status` block for the reasoning stated in full.)*, before its edits apply. It carries the RELEASE-FLOW step with the paste target, and the register row. The straggler sweep is recorded. **B-U1 cross-references the standalone T1-(B) ballot** (`.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`, RATIFIED Peter 2026-09-26), **whose merge precedes the U1 branch point** (cited by merge commit) (erratum 2026-09-26; it replaces the planned first-commit section). | ✅ verified met | `.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md`: `Status: RATIFIED (Peter, 2026-09-27)`, no `Ratified-machine:` line, reasoning stated in the `Status` block. `.kiro/hooks/RELEASE-FLOW.md` step 6 applied (paste target `docs/releases/<v>/publish-verification.txt`); `governance/classification-map.md § "publish-rail-guard"` applied. Both `diff`-verified identical to the ratified ballot text — `.kiro/specs/123-consumer-distribution/completion/task-7-3-completion.md` § "Applied edits". Straggler sweep recorded at the ballot § 5. Cross-reference to T1-(B) at the ballot's header line, merge SHA `314dbaa7` (Task 7.0) |
| **`CHANGELOG.md` exists with release 1's consumer-facing entry**, and is in `files[]` (pack check). The entry names what changed for release-1 consumers, including the retained copied agents (Leonardo A5 (ii)), **the removal of the four orphaned Input-Text `.browser.ts` files, and the browser bundles no longer carrying build-machine paths** (both Task 9.0, which runs before Task 7; amendment 2026-09-27). | ✅ verified met | `/CHANGELOG.md` — `[Unreleased] — planned Release 1` section, four subsections (Breaking/Changed/Retained for now/Fixed); "Retained for now" names the copied agent/steering/governance files; "Fixed" carries both Task 9.0 items verbatim from its hand-off. `package.json` `files[]` includes `"CHANGELOG.md"`. `npm pack --dry-run --json --ignore-scripts` → `CHANGELOG.md present: true` |
| *Scope stated*: npmjs visibility and tarball host only. | ✅ verified met | `scripts/verify-publish-rail.sh`'s own header: "SCOPE … this checks REGISTRY PUBLICATION STATE ONLY" — the script asserts nothing about a consumer's own npm config or install resolution |

Unmet or partially met criteria: None

---

## Additional verification

**Primary Artifacts: all shipped as declared** — `scripts/verify-publish-rail.sh`, `scripts/__bites__/` (9 files: 4 `.txt` bites + 1 `.txt` measurement + `shellcheck.txt` + 2 fake-`curl` shim directories), `.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md`, `.kiro/hooks/RELEASE-FLOW.md`, `governance/classification-map.md`, `CHANGELOG.md`, `package.json`.

No `**Merge gate:**` block is declared for this parent (`parseTasksMd` → `mergeGate: []`). No artifact is deferred to a later unit.

### Validation

Run before this doc's commit (branch `task/123-u1-substrate`):

- `npx tsc --noEmit` → 0 errors.
- `npm test` → **384 suites, 9266 tests passed** (unchanged from before Task 7 — this task adds no source-code test surface; it adds shell scripts, docs, and governance artifacts).
- `npm run test:scripts` → **11 suites, 219 tests passed** (unchanged).
- `npx tsx scripts/pack-assert.ts` → **40/40 assertions passed**.
- `npm pack --dry-run --json --ignore-scripts` → `CHANGELOG.md present: true`, 1602 entries.
- `npm run check:completion-criteria-parity` → see § "Parity result" below.
- Build noise (`docs/tokens.css`, `token-index/semantics.yaml`, `token-index/meta.json`) was reverted before every commit.

### Parity result

```
SUMMARY: parents evaluated 10, pass 10, fail 0; emissions 0; reds 0
```

(Recorded after this doc's own commit ticks parent 7 — see the task's final report for the exact run.)

---

## Peter's rulings, this parent

1. **R1-1 (via Stacy's finding)**: drop the `npm` CLI entirely from the publish-rail guard; query `registry.npmjs.org` directly over HTTP. The scope-explicit `npm view` form plus its required hermetic isolation env vars (Leonardo A15, Req 6.8) broke npm 10.9.3 outright and would not have been hermetic even fixed (the project's own `.npmrc` scope mapping loads regardless of user/global isolation).
2. **The parenthetical addition, before ratifying**: Peter reviewed the final step-6 text, the `FAIL[version]` message, and the unset-`VERSION` `USAGE` message verbatim, and ruled: add *"(nor `~/.curlrc`; standard proxy environment variables such as `HTTPS_PROXY` are honoured)"* directly after the `.npmrc` clause, in both the ballot and what lands in `RELEASE-FLOW.md` — then ratify. Applied at Task 7.3.
3. **Ratification**: B-U1 RATIFIED (Peter, 2026-09-27), conditional on item 2, applied before the `Status` flip.

## Stacy's two reviews (`.kiro/specs/123-consumer-distribution/completion/task-7-3-stacy-review.md`)

1. **First review — ACCEPT-WITH-CHANGES**: two Critical findings. **R1-1**: the `npm view` form's required hermetic env vars made npm 10.9.3 exit before resolving config, false-redding a live release; even fixed, the isolation would not have excluded the project's `.npmrc` scope mapping — reproduced by Stacy at head. **R1-2**: the `.log` paste target is gitignored, and step 6 named no route from a post-publish working tree to protected `main`. Four further corrections (R1-3..R1-6 required; R1-7 recommended) on the register row's honesty, reader accuracy, and Req 6.1 coverage claim.
2. **Second review ("Re-check addendum," commit `2d83f266`) — ACCEPT**: re-ran everything herself rather than trusting the recorded transcripts. Ruled the `armed` fork her first review surfaced: **`check_state: armed` STANDS**, binding condition — only if the row and step 6 land in the same commit (they did; see Task 7.3). Named five non-blocking fixes (applied below) and one CHANGELOG re-check (C1–C10 re-verified, no new errors, one process note for release-prep).

## The `armed` ruling and its binding condition

`governance/classification-map.md § "publish-rail-guard"`: `check_state: armed`, `armed_at: tool-time`. **Binding, per Stacy's ruling**: this state is honest only because the register row and `RELEASE-FLOW.md` step 6 landed in the same commit (Task 7.3) — a split application (row committed without step 6, or vice versa) would have demoted the row to `proposed`. Verified same-commit landing: both edits are part of the single commit that also flipped the ballot's `Status` to `RATIFIED`.

## The five non-blocking fixes (Stacy's re-check, applied at Task 7's second rework)

1. `task-7-4-completion.md`'s Req 6.1 claim narrowed to `CHANGELOG.md` only (the Integration Guide still names GitHub Packages — issue #214, routed to Task 19.4 — see below).
2. `curl -q` added as the script's first argument (`~/.curlrc` never read either); "hermetic-from-config" reworded everywhere to the precise claim (no npm config, no curl config file; standard proxy env vars deliberately honoured) — script header, ballot, register row history, design.md C9, requirements.md Req 6.8. The real `14.1.0` PASS was re-run and re-committed after the flag change.
3. An unset `VERSION` now exits `2` (a named `USAGE` error) instead of falling through to bash's own unbound-variable exit `1` — documented in the script header, design.md C9's exit table, and the ballot; a fourth bite recorded.
4. A short, no-auto-retry 404-after-publish note added in exactly two places: the `FAIL[version]` message and the ballot's `RELEASE-FLOW.md` step-6 text.
5. "Bite" reserved for a recorded red; the live PASS is named "the committed measurement" throughout (script comments, doc titles, register row, ballot).
6. **The Peter-ordered sixth addition (post-ACCEPT, pre-ratification)**: the `~/.curlrc`/proxy parenthetical, above.

## Release-day 404 residual (named, not fixed)

Stacy's re-check named this explicitly as surviving her `armed` ruling: the registry's per-version endpoint can briefly 404 immediately after `npm publish` (indexing lag). The guard has never yet run right after a real publish. This is a liveness/usability risk, not an arming defect — the script fails loud and safe either way, its message says to wait and re-run by hand, and Stacy's RELEASE claims pass will see the outcome in the committed evidence file regardless.

## Req 6.1 / #214 routing

`governance/DesignerPunk-Integration-Guide.md` §§ "Prerequisites"/"1. Install" still document installing via GitHub Packages with the wrong scope (`@designerpunk`, not `@3fn`) — a live Req 6.1 violation, predating Spec 123, found during this task's straggler sweep. **Not fixed here** (out of Task 7's write scope; Task 19.4 reconciles the Integration Guide). **Committed record**: `.kiro/issues/2026-09-27-integration-guide-install-section-stale.md` (PR #214, merged to `main`). The register row's `education` field states plainly that it does **not** verify Req 6.1, and cites this issue rather than an unrecorded "reported separately."

## The `npx shellcheck` slip

Early in Task 7.1, `npx --no-install shellcheck` (a cached, third-party npm-distributed binary, version 0.11.0) was run once before Peter installed the official ShellCheck binary at `/Users/3fn/bin/shellcheck`. Once his message arrived, every subsequent shellcheck run in this task — including both reworks — used **only** the official `/Users/3fn/bin/shellcheck` (version 0.10.0), per his explicit instruction never to use the third-party wrapper. The official-binary runs are the record (`scripts/__bites__/shellcheck.txt`); the one-time `npx` run predates that instruction and is superseded, not carried forward as a second data point.

## Disclosed out-of-list edits (the brief's minimal, disclosed rule)

1. `.kiro/docs/ballots/README.md` — one index entry added under "Ballots on record" for B-U1, per the convention every other ratified ballot follows. Not in Task 7's `Primary Artifacts` list; explicitly authorized by the coordinator (relaying Peter's ruling) as part of the ratification instructions (Task 7.3).

## Findings routed (not fixed)

- **Integration Guide install section** (Req 6.1) — see above; routed to Task 19.4, committed issue #214.
- **`armed_at` enum gap** (Stacy's standards implications, both reviews): no enum value exists for a check that runs after its verified event and is halted by a human, not a mechanical gate. `tool-time` is stretched to cover it — the first such row. If a second appears, the enum needs its own amendment.
- **The `*.log` gitignore trap** (Stacy, both reviews): it has now bitten twice in one task (Task 7.1's bites, then the paste-target convention). Any future standard naming a committed record location should name a filename git will actually commit.

## Subtask completion docs

`.kiro/specs/123-consumer-distribution/completion/task-7-0-completion.md`, `task-7-1-completion.md`, `task-7-2-completion.md`, `task-7-3-completion.md`, `task-7-4-completion.md`.
