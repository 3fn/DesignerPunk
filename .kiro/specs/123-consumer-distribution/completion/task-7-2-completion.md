# Task 7.2 Completion — The three committed bites

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 7 · **Agent**: Thurgood (Sonnet)

## What changed

Committed three bites under `scripts/__bites__/`, per C9's recipe, none of which perform a real publish or write to any registry:

1. **`bite-1-6.3-verbatim.txt`** — the 6.3 verbatim command, run as written, against the real public registry (read-only `npm view`):
   ```
   npm view @3fn/core@99.99.99 version --@3fn:registry=https://registry.npmjs.org
   ```
   → non-zero exit (npm's own `E404`), confirming the recipe's red result.

2. **`bite-2-version-mismatch-exit10.txt`** — `VERSION=99.99.99 ./scripts/verify-publish-rail.sh` against the real registry → `FAIL[version]`, **exit 10**. Proves the red in bite 1 comes from the *required* line inside the script, not a different code path.

3. **`bite-3-host-shim-exit11.txt`** — a `PATH`-shimmed `npm` (`scripts/__bites__/fake-npm-github-packages/npm`) that returns a real-looking version for `npm view … version` and a GitHub-Packages-shaped tarball URL (`https://npm.pkg.github.com/download/@3fn/core/99.99.99-fake/abcd1234.tgz`) for `npm view … dist.tarball`. Running the **full, unmodified script** (`VERSION=99.99.99-fake ./scripts/verify-publish-rail.sh`) with that shim on `PATH` → `FAIL[host]`, **exit 11**, through the production `check_host` call site — not a direct function call. *(If the production `check_host` line were deleted, this bite would go green-with-`PASS`, which is exactly the red it exists to show.)*

No real publish occurred; no registry was written to. The only network call across all three bites is the read-only `npm view` in bites 1–2 against the real public registry. `.npmrc` and no credential file were read at any point.

## Targeted tests + result

Each bite's full stdout/exit-code transcript is committed to its named `.txt` file under `scripts/__bites__/` (renamed from `.log` — the repo's `*.log` gitignore rule would otherwise silently exclude these from the commit; see file listing). Re-run manually to confirm reproducibility:

```
$ VERSION=99.99.99 ./scripts/verify-publish-rail.sh; echo $?
FAIL[version]: @3fn/core@99.99.99 is not visible on registry.npmjs.org (checked scope-explicitly) — do not announce this release
10
$ PATH="$(pwd)/scripts/__bites__/fake-npm-github-packages:$PATH" VERSION=99.99.99-fake ./scripts/verify-publish-rail.sh; echo $?
FAIL[host]: tarball for @3fn/core@99.99.99-fake is served from 'https://npm.pkg.github.com/download/@3fn/core/99.99.99-fake/abcd1234.tgz', not registry.npmjs.org — wrong rail
11
```

## Application-time adaptations

- **The fake-`npm` shims are committed as reproducible fixtures**, not just transcripts — `scripts/__bites__/fake-npm-github-packages/npm` and `scripts/__bites__/fake-npm-empty-tarball/npm` (the latter built for 7.1's empty-URL branch, reused nowhere in this subtask's own three bites, but committed alongside since both are PATH-shim fixtures of the same class). Each shim is a two-branch bash script that only recognizes `npm view … version` / `npm view … dist.tarball` invocations and errors loudly on anything else, so it cannot silently mask an unexpected call shape.
