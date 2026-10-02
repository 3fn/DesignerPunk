# Task 17.4 Completion — the standing register-rule and `SCAN_DIRS` parity test, with two-sided bites

**Spec**: 123 — Consumer Distribution · **Unit**: U2b (Task 17) · **Parent**: Task 17 · **Agent**: Lina (Sonnet)

**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-17-instruments.md` rows 5.1 (the test, built here), 5.2 (its two inputs: the 17.1 export and the 17.3 rule edit, both landed), 5.3 (the rule block, exists), 5.4 (the bites, built here), 1.6 and 1.7 (the runner and typecheck, exist). No row changed state, so none was appended. Row 5.3's "today the group lists …" clause is dated at the block's writing and is left as written.

**The test, named**: `scripts/__tests__/package-name-scope-parity.test.ts` — **green** on the real files (cited below). It is picked up by `npm run test:scripts` (`scripts/jest.config.js` `testMatch`) and by the `lane-timing.yml` scripts step with its floor; no lane edit.

**Lock**: this subtask touches `scripts/**` and `.kiro/specs/**` only, both outside the closure. `check:122:diff-guard` was not run; `git status` showed no `governance/**` or `canonical/**` change.

## What changed

`scripts/__tests__/package-name-scope-parity.test.ts` (new, one file in `scripts/`):

- `parseRuleDirs(markdown)` reads the `### package-name-scope-drift` block, takes its yaml fence, takes the `rule:` quoted string **only** (not the `history:` lines, which also contain slashes and parentheses), and finds the parenthesized groups whose members all end in `/`. It returns that one group's members with the trailing slash stripped. It **throws, naming what is missing**, if the block, the yaml fence, the `rule:` string, or exactly one such group is absent (zero or two groups both throw).
- The standing case reads the real `governance/classification-map.md` and asserts `ruleDirs.length === SCAN_DIRS.length` and `new Set(ruleDirs)` equals `new Set(SCAN_DIRS)`.
- Six synthetic-input cases pin the parser (one-group parse that ignores other parentheses; block absent; no yaml fence; no `rule:` string; zero groups; two groups).
- `SCAN_DIRS` is read by a typed `require('../check-package-name-drift.js') as { SCAN_DIRS: readonly string[] }` — no `import` of the `.js`. No legacy-path literal anywhere in the file (`grep -c` = 0), and the bites use a synthetic directory name.
- The paths are fixed repo-relative constants. There is **no test-only switch**: the bites below run this unchanged file against a copied mini-tree.

## Targeted tests and result

- On the real files, `npx jest --config scripts/jest.config.js scripts/__tests__/package-name-scope-parity.test.ts` → `Tests: 7 passed, 7 total`. The standing case passes: both sides are `governance, .kiro/steering, src, .kiro/agents, dist` (5 and 5).
- `npm run test:scripts` → `Test Suites: 13 passed, 13 total · Tests: 228 passed, 228 total`. The new file is `PASS scripts/__tests__/package-name-scope-parity.test.ts`. (Was 12 suites and 221 tests; the new file adds 7.)
- `npm run typecheck:scripts` (`tsc -p tsconfig.scripts.json`) → exit 0, no diagnostics.

## The bites (exact outputs; TEMP COPIES only, never the real script or the real map)

Method: for each bite, a scratch mini-tree `scripts/__tests__/<test>`, `scripts/check-package-name-drift.js`, `governance/classification-map.md` (copies, with `node_modules` linked) under `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/07af3405-cf65-4fd4-9ae6-d36fe6a77303/scratchpad/bite4{a,b,c,d}/`. The **unchanged** test file ran there with the repo's `scripts/jest.config.js` and `--rootDir` on the scratch tree. `__dirname`-relative paths made the copy self-consistent, so nothing is overridden. The real files are never edited. Paths in output shortened to `…`.

**Control** (`bite4c`, nothing modified): `Tests: 7 passed, 7 total` — the mini-tree is honest, since the unmodified copy is green.

**Bite (a)** — add a directory to `SCAN_DIRS` without the rule edit (copy of the script; `diff` against the real file: `58a59 >   'extra-dir',`) → **red**:

```
FAIL …/bite4a/scripts/__tests__/package-name-scope-parity.test.ts
  package-name-scope-drift rule <-> SCAN_DIRS parity (standing)
    ✕ the rule enumeration is set-equal to SCAN_DIRS, with equal lengths (3 ms)
  ● … › the rule enumeration is set-equal to SCAN_DIRS, with equal lengths
    expect(received).toBe(expected) // Object.is equality
    Expected: 6
    Received: 5
    > 69 |     expect(ruleDirs.length).toBe(SCAN_DIRS.length);
Tests:       1 failed, 6 passed, 7 total
```

**Bite (b)** — add a directory to the rule without `SCAN_DIRS` (copy of the map; the `rule:` line gains `extra-dir/, ` at the head of the group) → **red**:

```
FAIL …/bite4b/scripts/__tests__/package-name-scope-parity.test.ts
    ✕ the rule enumeration is set-equal to SCAN_DIRS, with equal lengths (2 ms)
  ● … › the rule enumeration is set-equal to SCAN_DIRS, with equal lengths
    expect(received).toBe(expected) // Object.is equality
    Expected: 5
    Received: 6
    > 69 |     expect(ruleDirs.length).toBe(SCAN_DIRS.length);
Tests:       1 failed, 6 passed, 7 total
```

**Extra bite (c)**, because the length assertion fires first in (a) and (b) and would otherwise leave the set assertion unexercised: replace one `SCAN_DIRS` entry with a synthetic name (`'dist'` → `'swapped-dir'`; equal lengths) → **red** on the set assertion:

```
  ● … › the rule enumeration is set-equal to SCAN_DIRS, with equal lengths
    expect(received).toEqual(expected) // deep equality
    - Expected  - 1
    + Received  + 1
      Set {
        ".kiro/agents",
        ".kiro/steering",
    +   "dist",
        "governance",
        "src",
    -   "swapped-dir",
      }
```

## Application-time adaptations

- **Parser grain**: the "path-shaped group" is a parenthesized group whose every member ends in `/`. The rule string also holds "(Spec 101 publish-readiness)", which is excluded by that definition, and the criterion's "exactly one such group" is enforced as a loud throw for zero or two.
- **Unrequested additions, both inside the one file**: the six synthetic-input parser cases and the extra bite (c). Neither adds an artifact or a switch.
- No yaml library is used: the `rule:` string is read with a line match, so a rule that moves off one quoted line fails loud and does not parse silently.
- Otherwise: none.
