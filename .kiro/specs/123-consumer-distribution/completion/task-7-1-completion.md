# Task 7.1 Completion — Script + self-test + empty-URL branch

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 7 · **Agent**: Thurgood (Sonnet)

**Reworked 2026-09-27** after Stacy's review (`.kiro/specs/123-consumer-distribution/completion/task-7-3-stacy-review.md`, R1-1) and Peter's ruling: the guard is rewritten from an `npm view`-based form to a direct HTTP form. **Reworked a second time same day** after Stacy's re-check (same doc, "Re-check addendum," commit `2d83f266`, ACCEPT with five non-blocking fixes): `curl -q` added as the first argument; an unset `VERSION` now exits `2` instead of falling through to bash's unbound-variable exit `1`; the `FAIL[version]` message gained a short 404-after-publish note. This doc replaces the original 7.1 doc's content in full; the npm-based script it described no longer exists.

## What changed

- **`scripts/verify-publish-rail.sh`** (rewritten, then amended): queries `registry.npmjs.org` directly over HTTP with `curl -q -sS --max-time 15 -w '\n%{http_code}' https://registry.npmjs.org/@3fn%2fcore/${VERSION}`, parsing `version` and `dist.tarball` from the JSON response with `node -e` (no `jq` dependency). **`-q` is passed FIRST** (curl's own requirement) so `~/.curlrc` is never read either. **No `npm` CLI is invoked anywhere in the script, no `.npmrc` — project, user, or global — is ever read, and no curl config file is read.** Standard proxy environment variables ARE deliberately honoured, not overridden. `set -euo pipefail`, `--self-test-host` (exits 12, never reaches `PASS`, never runs the version check — and now also requires `VERSION`, since the usage check runs first unconditionally), and the empty-tarball-URL branch (`FAIL[host-empty]`, exit 13) are all retained from the drawn form, re-expressed over the HTTP response instead of two sequential `npm view` calls. **New in the second rework**: an unset `VERSION` exits `2` with a named `USAGE` message, and the `FAIL[version]` HTTP-error message ends with one short, no-auto-retry sentence about registry indexing lag right after publish.

### Why the rewrite (R1-1, Stacy's finding, Peter's ruling)

The original `npm view --@3fn:registry=https://registry.npmjs.org` form required Leonardo A15's hermetic isolation env vars (`npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null`, Req 6.8) to be honest about not reading local npm config. Stacy reproduced, at head, that those env vars make npm 10.9.3 (Node 22.20.0) **exit before it resolves config at all** — `double-loading config "/dev/null" as "global", previously loaded as "user"` — which `check_version`'s `>/dev/null 2>&1` silently swallowed, reporting `FAIL[version]` on a version that was actually live. Worse, even with two distinct empty files, the isolation would not have been hermetic: `npm config get @3fn:registry` from the repo root still returns the project `.npmrc`'s GitHub Packages mapping regardless of user/global isolation. **No committed bite ever exercised the hermetic form as drafted** — every prior bite ran without the env vars. Peter's ruling: drop `npm` entirely. An HTTP GET has no npm config layer to isolate. **Precise claim (corrected in the second rework, Stacy's low note)**: "hermetic-from-config" overstated it on first pass — `curl` has its own config file (`~/.curlrc`), disabled here by passing `-q` first. And the script is deliberately NOT hermetic against its whole environment: standard proxy variables are honoured on purpose, so a release run from behind a corporate or CI proxy still succeeds.

## shellcheck

Per the coordinator's instruction: **the official `/Users/3fn/bin/shellcheck` binary only, never `npx shellcheck`** (a third-party wrapper). Full transcript committed at `scripts/__bites__/shellcheck.txt`.

```
ShellCheck - shell script analysis tool
version: 0.10.0
```

- `scripts/verify-publish-rail.sh` → exit 0, no findings.
- `scripts/__bites__/fake-curl-github-tarball/curl` → exit 0, no findings.
- `scripts/__bites__/fake-curl-empty-tarball/curl` → exit 0, no findings.

The old fake-`npm` shims (`fake-npm-github-packages/`, `fake-npm-empty-tarball/`) are **deleted**, not superseded-in-place — an `npm`-based fixture has nothing left to shim now that the script never calls `npm`.

## Exit-path outputs — each committed under `scripts/__bites__/`

Files use `.txt`, not `.log` — the repo's `*.log` gitignore rule would otherwise silently exclude these from the commit.

| Path | File | Exit |
|---|---|---|
| PASS | `pass-real-version.txt` | 0 (real registry, `VERSION=14.1.0` — **the committed measurement Stacy's R1-1 precondition required**; re-run and re-committed after `-q` was added in the second rework) |
| **USAGE (unset `VERSION`)** | `bite-4-unset-version-exit2.txt` | 2 (new, second rework — a named usage error, never bash's own unbound-variable exit 1) |
| `FAIL[version]` | `bite-2-version-mismatch-exit10.txt` | 10 (real registry, `VERSION=99.99.99`, a real HTTP 404, now with the 404-after-publish note in the message) |
| `FAIL[host]` | `bite-3-host-shim-exit11.txt` | 11 (PATH-shimmed `curl`, production path) |
| `--self-test-host` (good host) | `self-test-host-exit12.txt` | 12 |
| `--self-test-host` (bad host) | `self-test-host-exit12.txt` (second block) | 11 — a bad host fails inside `check_host` before the self-test's own `exit 12` is reached |
| **Empty-tarball branch** | `empty-url-branch-exit13.txt` | 13 (PATH-shimmed `curl`: HTTP 200, valid matching version, no `dist.tarball` field) |

The empty-tarball branch uses a second fake-`curl` shim (`scripts/__bites__/fake-curl-empty-tarball/curl`) that returns HTTP 200 with a JSON body whose `version` matches but whose `dist` object has no `tarball` field — simulating a registry response the guard cannot read a tarball URL from.

## Targeted tests + result

- `bash -n scripts/verify-publish-rail.sh` — syntax check, clean.
- Manual exercise of all six exit codes (0, 2, 10, 11, 12, 13) plus the self-test's bad-host sub-case, all captured to committed `.txt` files above, against the real public registry where the check involves a real network call (PASS, exit 10) and against PATH-shimmed `curl` fixtures where it doesn't (exit 11, exit 13, per Task 7.2), plus the pure usage check (exit 2, no network call at all).
- No Jest suite exercises this script (it is a release-time shell tool, not code Jest can import); `npm test` and `npm run test:scripts` both pass in full (see Task 7 parent's Additional Verification).

## Application-time adaptations

- **The empty-tarball branch required a second fake-`curl` shim**, not reachable via the real registry (a real 404 always returns a non-200 status, not a 200 with a missing field) — built `scripts/__bites__/fake-curl-empty-tarball/curl` alongside the host-shim used for bite 3.
- **The whole script was rewritten mid-task**, after an initial `npm view`-based version was reviewed by Stacy and found broken under its own required hermetic isolation (R1-1). The rewrite is a redesign, not a patch: no line of the original `check_version`/`check_host` npm-calling code survives; only the exit-code contract (10/11/12/13, now also 2) and the `--self-test-host` behavior are unchanged.
- **shellcheck was run only via the official `/Users/3fn/bin/shellcheck` binary in this rework and its second pass**, per the coordinator's explicit instruction not to use `npx shellcheck` (a third-party wrapper). The first draft's `npx`-based run is superseded, not carried forward as a second data point.
- **The `-q` flag placement is load-bearing**: curl only honours `-q`/`--disable` when it is the very first argument. It is written first in every invocation, including inside the `RESPONSE=` assignment.
