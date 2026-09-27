# Task 7.2 Completion — The committed measurement and the recorded bites

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 7 · **Agent**: Thurgood (Sonnet)

**Reworked 2026-09-27** after Stacy's review (`task-7-3-stacy-review.md`) and Peter's ruling on R1-1 (drop `npm`, query the registry over HTTP). This doc replaces the original 7.2 doc's content in full; the three bites it described (all npm-based) are superseded by the re-measured evidence below. It also corrects a false claim the original doc made, flagged by Stacy under "Adjacent findings." **Reworked a second time same day** after Stacy's re-check (same doc, "Re-check addendum," commit `2d83f266`, ACCEPT with five non-blocking fixes): `curl -q` added (script re-run, PASS re-committed), a fourth bite added for the new unset-`VERSION` usage exit, the 404-after-publish note added to the `FAIL[version]` message, and the live PASS is no longer called a "bite" — this doc's own title is corrected to match (Stacy: "bite" means a recorded red in this register).

## What changed

Committed one measurement plus three bites under `scripts/__bites__/`, re-measured against the HTTP-based guard. None performs a real publish or writes to any registry:

1. **`pass-real-version.txt`** — **the committed measurement**, not a bite: the exact step-6 command, run against the real public registry for the real published version (`14.1.0`):
   ```
   VERSION=14.1.0 ./scripts/verify-publish-rail.sh
   ```
   → `PASS: @3fn/core@14.1.0 visible on npmjs; tarball host verified`, exit 0. **This is the measurement Stacy's R1-1 review made a precondition for ratification** — no committed record previously exercised the guard's real invocation form against a live version; every earlier bite ran either without the (broken) hermetic env vars or against a bogus version. **Re-run and re-committed in the second rework** after `curl -q` was added, to confirm the flag change didn't alter the PASS.

2. **`bite-2-version-mismatch-exit10.txt`** — `VERSION=99.99.99 ./scripts/verify-publish-rail.sh` against the real registry → `FAIL[version]: @3fn/core@99.99.99 is not visible on https://registry.npmjs.org (HTTP 404) — do not announce this release. If you published in the last few minutes, the registry may not show it yet — wait a minute and re-run.`, **exit 10**, via a real, non-shimmed HTTP 404. Proves the red comes from the *required* line, using a real network call. **The trailing sentence is new in the second rework** (the 404-after-publish note, short, no automatic retry).

3. **`bite-3-host-shim-exit11.txt`** — a `PATH`-shimmed `curl` (`scripts/__bites__/fake-curl-github-tarball/curl`) that returns HTTP 200 with a JSON body whose `version` matches (`99.99.99-fake`) and whose `dist.tarball` is a GitHub-Packages-shaped URL. Running the **full, unmodified script** with that shim on `PATH` → `FAIL[host]: tarball for @3fn/core@99.99.99-fake is served from 'https://npm.pkg.github.com/download/@3fn/core/99.99.99-fake/abcd1234.tgz', not https://registry.npmjs.org — wrong rail`, **exit 11**, through the production `check_host` call site — not a direct function call. *(If the production `check_host` line were deleted, this bite would go green-with-`PASS`, which is exactly the red it exists to show.)*

4. **`bite-4-unset-version-exit2.txt`** (new, second rework) — running the script with `VERSION` unset → `USAGE: VERSION=<version> ./scripts/verify-publish-rail.sh [--self-test-host <tarball-url>] — VERSION is required and was not set`, **exit 2**. No network call is made — the usage check runs before anything else.

No real publish occurred; no registry was written to.

### Correction: what "no `.npmrc` was read" actually meant (Stacy's "Adjacent findings")

The original doc claimed *"`.npmrc` and no credential file were read at any point."* Stacy flagged this as false as written: **on the prior, npm-based bites**, the guard invoked the `npm` CLI, and npm loads its config layers (`~/.npmrc`, the project `.npmrc`, global config) on every invocation — that's how npm resolves scope mappings at all. The bites did not run with the hermetic env vars, so npm's normal config-loading behavior was in effect. **What was actually true, stated precisely**: the agent opened no credential file directly, and printed none; the `npm` CLI loaded its config layers as usual, which is how the scope-explicit flag's measurement (beating the project's `@3fn` → GitHub-Packages mapping) was demonstrated in the first place. **This correction is now moot for the guard itself**: the rewritten HTTP-based script (Task 7.1) never invokes `npm` and never reads any `.npmrc` at all — not because of isolation, but because there is no npm CLI call left in the script to load config for. This doc's own three bites (above) involve no npm CLI call anywhere.

## Targeted tests + result

Each bite's full stdout/exit-code transcript is committed to its named `.txt` file under `scripts/__bites__/` (renamed from `.log` — the repo's `*.log` gitignore rule would otherwise silently exclude these from the commit; see file listing). Re-run manually to confirm reproducibility:

```
$ VERSION=14.1.0 ./scripts/verify-publish-rail.sh; echo $?
PASS: @3fn/core@14.1.0 visible on npmjs; tarball host verified
0
$ VERSION=99.99.99 ./scripts/verify-publish-rail.sh; echo $?
FAIL[version]: @3fn/core@99.99.99 is not visible on https://registry.npmjs.org (HTTP 404) — do not announce this release. If you published in the last few minutes, the registry may not show it yet — wait a minute and re-run.
10
$ PATH="$(pwd)/scripts/__bites__/fake-curl-github-tarball:$PATH" VERSION=99.99.99-fake ./scripts/verify-publish-rail.sh; echo $?
FAIL[host]: tarball for @3fn/core@99.99.99-fake is served from 'https://npm.pkg.github.com/download/@3fn/core/99.99.99-fake/abcd1234.tgz', not https://registry.npmjs.org — wrong rail
11
$ unset VERSION; ./scripts/verify-publish-rail.sh; echo $?
USAGE: VERSION=<version> ./scripts/verify-publish-rail.sh [--self-test-host <tarball-url>] — VERSION is required and was not set
2
```

## Application-time adaptations

- **The measurement and bites are re-measured, not patched**, following the R1-1 rewrite: the PASS changes in *kind* from the original "bite 1: the 6.3 verbatim command → red," because the HTTP form's "required line" is now proven by showing it *works* against a live version, not by showing a doomed npm invocation fail loudly.
- **The fake-`npm` shims from the original 7.1/7.2 are deleted, not kept as superseded artifacts** — `scripts/__bites__/fake-npm-github-packages/` and `scripts/__bites__/fake-npm-empty-tarball/` no longer correspond to anything the script calls. Two new fake-`curl` shims replace them: `fake-curl-github-tarball/` (this bite) and `fake-curl-empty-tarball/` (Task 7.1's empty-tarball branch).
- **The "no `.npmrc` was read" claim is corrected, not deleted** — the false claim and its correction are both recorded above (per the coordinator's instruction to say exactly what happened rather than silently fix it), since the underlying measurement it supported (the scope-explicit flag beating the project's scope map) was itself real and is preserved in this spec's history even though that specific flag form is now superseded.
- **Second rework**: a fourth bite (unset `VERSION` → exit 2) was added rather than folded into an existing one, since it exercises a distinct code path (the usage check, before any network call) with its own exit code and message. The PASS measurement was re-run (not just re-labeled) after `curl -q` was added, on the chance the flag changed behavior — it didn't, but the doc records a re-run rather than an assumption.
