# Issue: the publish-path instrument rows — script floor, nested-roots hint, closure regeneration, required `--expect-sha`, the 10e widening; and the `check:drift` `@<scope>:registry` class fix

**Date**: 2026-10-14
**Status**: ACTIVE (an open obligation and a grant; the grant does nothing until Peter's merge activates it)
**Owner**: Ada (the publish-path instrument: `scripts/release-publish.ts`, `scripts/pack-assert.ts`; register row `hermetic-publish-path`, `owner: ada`). The `check:drift` class fix: register owner Thurgood (row `package-name-scope-drift`); Ada proposes the pattern.
**Trigger**: Ada's first burst after the 15.1.0 follow-up records PR (the PR that files this record) merges. **Hard deadline: merged before release 4's RELEASE phase 1.**
**Source**:
- `.kiro/specs/123-consumer-distribution/tasks.md` § "Expected release count" (L220–222): "Ada's four publish-path rows … plus the `check:drift` `@<scope>:registry` class fix … and the section-10e machine-path scan widening (Ada)", with "Record: MISSING → Ada … filed before release-prep" (R2, Ada RC-4/RC-5).
- Ballot `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md`: Stacy's residuals (i) script floor, (ii) row-(j) habit, (v) `floor-closure.json`; the `--expect-sha` observation ("Residual: an operator who drops the flag gets ancestry plus a version match, not identity with S").
- RL-3, Stacy's RELEASE claims pass for 15.1.0 (`completion/claims-pass-release-15.1.0.md` L85, L234–235).

---

## Lapse, recorded (2026-10-14)

This obligation was due before release 3's RELEASE phase 1. It lapsed: no issue was filed, and none of `scripts/{pack-assert,release-publish,check-package-name-drift}` changed after #321. 15.1.0 shipped without these rows (RL-3, Medium; nothing blocked the tag). It is **re-homed here** with the trigger above. This record files late; it does not re-rule the plan.

## The rows

1. **Script floor** (ballot residual (i)). `release-publish.ts` refuses when pack-assert's `PASS: publish path:` count is below the section-10 floor (16 at ballot time; derive it from pack-assert's own section-10 assertion list, never a literal that goes stale upward). Today the script refuses only on a failed finding, so a refactor that drops section 10 passes the script. CI's `≥ 14` floor (#287) stays as it is.
2. **10d nested-roots hint** (residual (ii)). When 10d finds nested `node_modules` roots, its detail line adds: "nested `node_modules` present? In a working checkout this red is row (j); the script's fresh clone never shows it". This keeps a learned "expected red" in the main checkout from being carried over to a script red.
3. **`floor-closure.json` regeneration** (residual (v)). In its fresh clone, the script runs `scripts/floor-closure.ts`, then refuses if the result differs from the committed `floor-closure.json` (the `verify:token-index-clean` pattern). pack-assert § 1 then reads a closure proven current at S. If the file is stale today, the fixing PR regenerates and commits it.
4. **`--expect-sha` required in publish mode.** `release-publish.ts <version>` refuses without `--expect-sha <S>` (`parseArgs`, today L83–97). Dry-run mode is unchanged (it already names its commit). This makes the tag↔S identity a script check, not a check that only holds if the operator types the right command. *(15.1.0's 5.3 was run with `--expect-sha e49359e49dc338078669a90aa5b37aa2436b60a4` — the orchestrator's command line, recorded in the follow-up records PR.)*
5. **10e widening.** Section 10e's machine-path scan (`findMachinePaths`, which today scans only `dist/`) covers every packed text file: `governance/`, `.kiro/steering/`, `docs/consumer/`, `token-index/`, `src/**`, `CHANGELOG.md` and the other `files[]` roots. Needles: `/Users/`, `/home/`, the clone root (given and realpath), and `/private/var/folders/`.
   - **Ordering**: one shipped hit exists today, `governance/Process-Cross-Reference-Standards.md:501` (`/Users/peter/…`, O-1, Thurgood). The widening lands **after O-1's fix**. Otherwise it ships with that single path as a named, dated exception that the O-1 fix removes. Peter picks which, if O-1 has not landed first.
6. **`check:drift` `@<scope>:registry` class fix** (register owner Thurgood; Ada proposes). `SCOPE_PATTERN` matches only `@<scope>/<pkg>`, so a stale `@designerpunk:registry=…` line (#312 finding 3) passes. Proposed pattern: a second matcher `@([a-z0-9][a-z0-9-]*):registry\b`, flagging any scope that is not `package.json`'s scope and is not on a named allowlist of third-party scopes (empty today).
   - **For Thurgood**: whether `SCAN_DIRS` also takes `docs/consumer` (it ships and is not scanned today). That is his row's boundary, not this grant's.

**Candidate, not granted here**: make the pack deterministic (`TokenTypes.*` and `dist/mcp/tool-manifest.json` still carry wall-clock stamps), so 5.1's sha1 equals 5.3's for the same commit. That would let the dry run vouch for the published bytes. It needs its own record and paths; Peter decides whether to open one.

## Fixing PR and tests

- **One `fix/` PR** for rows 1–5 (Ada). It carries unit cases and a recorded bite for each row in `scripts/__tests__/{release-publish,pack-assert}.test.ts`, e.g.: publish mode without `--expect-sha` is refused; a section-10-less pack-assert output is refused; a stale `floor-closure.json` is refused; a `/Users/` string in a packed non-`dist/` file goes red.
- **Row 6 rides the same PR or Thurgood's own**, at his choice, with cases in `scripts/__tests__/check-package-name-drift.test.ts`: `@designerpunk:registry` → red; `@3fn:registry` → green.
- **Validation**: `npm run test:scripts`; `npx tsx scripts/release-publish.ts --dry-run <head>` at the fixing PR's head, tally pasted; `npm run check:drift` green on `main`'s tree.

**Grant paths**: `scripts/release-publish.ts`, `scripts/__tests__/release-publish.test.ts`, `scripts/pack-assert.ts`, `scripts/__tests__/pack-assert.test.ts`, `floor-closure.json`, `scripts/check-package-name-drift.js`, `scripts/__tests__/check-package-name-drift.test.ts`

- The last two paths are for Thurgood's class fix. They are exercised by Ada only if Thurgood delegates the edit in the fixing PR's body.
- `scripts/floor-closure.ts` is read, not edited.
- **Not granted, by rule**: `governance/**` (the `package-name-scope-drift` and `hermetic-publish-path` register rows; the RELEASE-FLOW 5.1 list's 10e wording is Thurgood's law text), `.kiro/hooks/**`, `.github/**`.
- **The fixing PR is diffed against this list. An out-of-list edit is a claims-pass finding.**

## Duration

The grant expires at the fixing PR's merge. If row 6 lands in a separate Thurgood PR, that PR cites this record and its two paths, and the grant over those two paths expires at its merge.

## Outcome (2026-10-16, walk write) — RESOLVED

**Rows 1–4 and 6 merged in #373** (`7f8e06530`: `--expect-sha` required and a full 40-character match, the publish-path floor, the 10d nested-roots hint, the `floor-closure.json` regeneration check, and the `check:drift` `@<scope>:registry` pattern). **Row 5 merged in #374** (`1e02fa4f4`) after the ordering condition above was met by O-1's fix (#367): **Peter ruled (a) on 2026-10-16** — a path-boundary match for the machine-path scan, with no exception list: a needle hits only at a path boundary, so vendored text such as `abc.com/home/{pathArg}` no longer hits, and the accepted misses (a machine path glued to a word character; paths inside binaries) are recorded in #374's body. The law text for the widened scan landed in #376. The grant expired at #373's merge and (row 5) at #374's merge. The "candidate, not granted" deterministic-pack item stays unopened. **Status: RESOLVED** — the Status line above is left as written; this outcome supersedes it. Per `.kiro/issues/README.md` rule 5 this record belongs in `archive/` (`git mv`, content unchanged), in the PR that closes it.
