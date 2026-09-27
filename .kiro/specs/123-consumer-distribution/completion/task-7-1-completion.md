# Task 7.1 Completion — Script + self-test + empty-URL branch

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 7 · **Agent**: Thurgood (Sonnet)

## What changed

- **`scripts/verify-publish-rail.sh`** (new): the drawn form from design.md C9, reproduced exactly — `set -euo pipefail`; `check_version` (the 6.2 scope-explicit `npm view` form, verbatim); `check_host` (the 6.8 hardening, host-pattern match on `https://registry.npmjs.org/*`); `--self-test-host` (exits 12, never reaches `PASS`, never runs `check_version`); the empty-tarball-URL branch (`FAIL[host-empty]`, exit 13, guarding the `set -e` command-substitution gap named in C9). Made executable (`chmod +x`).

## shellcheck

Two runs, both clean:

1. **Initial pass, `npx --no-install shellcheck`** (a cached npm-distributed binary, version 0.11.0): `scripts/verify-publish-rail.sh` → exit 0, no findings.
2. **Re-run per the coordinator's mid-task note**: Peter installed the official ShellCheck binary at `/Users/3fn/bin/shellcheck` on 2026-09-27 (not on `PATH` — called by full path). `/Users/3fn/bin/shellcheck --version` → `ShellCheck - shell script analysis tool, version: 0.10.0`. Re-ran against `scripts/verify-publish-rail.sh` and both fake-`npm` shims under `scripts/__bites__/` → **all three exit 0, no findings**, matching the earlier `npx` result. Full transcript committed at `scripts/__bites__/shellcheck.txt`.

**This replaces an earlier draft of this note that would have read "⚠️ not installed"** — by the time that draft would have been written, `npx --no-install shellcheck` had already succeeded (a cached binary was available), so no such gap was ever recorded; the coordinator's note is addressed here regardless, with the official-binary re-run as the recorded result of record.

## Exit-path outputs — each committed under `scripts/__bites__/`

Files use `.txt`, not `.log` — the repo's `*.log` gitignore rule would otherwise silently exclude these from the commit.

| Path | File | Exit |
|---|---|---|
| PASS | `pass-real-version.txt` | 0 (real registry, `VERSION=14.1.0`) |
| `FAIL[version]` | `bite-2-version-mismatch-exit10.txt` | 10 (real registry, `VERSION=99.99.99`) |
| `FAIL[host]` | `bite-3-host-shim-exit11.txt` | 11 (PATH-shimmed `npm`, production path) |
| `--self-test-host` (good host) | `self-test-host-exit12.txt` | 12 |
| `--self-test-host` (bad host) | `self-test-host-exit12.txt` (second block) | 11 — a bad host fails inside `check_host` before the self-test's own `exit 12` is reached, proving `check_host` fires identically whether called from the self-test or the production line |
| **Empty-URL branch** | `empty-url-branch-exit13.txt` | 13 (PATH-shimmed `npm`: valid version, empty `dist.tarball`) |

The empty-URL branch was exercised with a second fake-`npm` shim (`scripts/__bites__/fake-npm-empty-tarball/npm`) that returns a valid version string but an empty string for `dist.tarball` — simulating the network/registry-error case the branch exists for (under `set -e`, a failing command substitution used as an argument does not itself abort, so without this branch a network failure would misreport as "wrong rail").

## Targeted tests + result

- `bash -n scripts/verify-publish-rail.sh` — syntax check, clean.
- Manual exercise of all five exit codes (0, 10, 11, 12, 13) plus the self-test's bad-host sub-case, all captured to committed logs above.
- No Jest suite exercises this script (it is a release-time shell tool, not code Jest can import); `npm test` and `npm run test:scripts` both pass in full (see Task 7 parent's Additional Verification).

## Application-time adaptations

- **The empty-URL branch required a second fake-`npm` shim**, not reachable via the real registry (a real 404 always returns a non-empty error, not an empty success) — built `scripts/__bites__/fake-npm-empty-tarball/npm` alongside the host-shim used for bite 3.
- **shellcheck was run twice**: once via a cached `npx --no-install shellcheck` before Peter's install note arrived, once via the official `/Users/3fn/bin/shellcheck` per his instruction. Both agree (clean, 0 findings); the official-binary run is recorded as the result of record per his note.
