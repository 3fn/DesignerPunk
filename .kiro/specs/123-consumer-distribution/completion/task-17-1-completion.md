# Task 17.1 Completion — `SCAN_DIRS` drop, `main()` guard, `SCAN_DIRS` export, and the no-op test

**Spec**: 123 — Consumer Distribution · **Unit**: U2b (Task 17) · **Parent**: Task 17 · **Agent**: Lina (Sonnet)

**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-17-instruments.md` rows 1.2–1.5 (built here), 1.1, 1.6–1.8 (exist), 4.1, 5.2 (the 17.1 half). The block commits before this subtask's code (`fc56be32`).

## What changed

- `scripts/check-package-name-drift.js` — three edits, nothing else: the legacy directory leaves `SCAN_DIRS` and its docblock line; `main()` is wrapped in `if (require.main === module)`; the module exports `{ SCAN_DIRS }`. `walkDir`'s existence guard (L128 after the edit) is untouched. The CLI behaves as before under `node scripts/check-package-name-drift.js` and `npm run check:drift`, because `require.main === module` is true there.
- `scripts/__tests__/check-package-name-drift.test.ts` (new, by the #252 grant) — the script is SPAWNED (`process.execPath`) in a temp cwd holding only a scoped `package.json`:
  1. Every scan directory absent → exit 0, stderr empty, and the `No package name drift detected (0 files scanned)` line. A precondition assertion pins that the temp project holds only `package.json`.
  2. Positive control: a wrong-scope reference under a present scan directory (`src/`) → exit 1 and the drift report. It keeps a vacuous early exit from passing.
  No `import` of the `.js`. No legacy-path literal anywhere in the test or in the script (`grep -c` returns 0 for both). `SCAN_DIRS` is not read here (17.4's parity test reads it, with a typed `require`).

## Targeted tests and result

All run from the main checkout at the unit head plus this subtask's two files.

- `npm run test:scripts` → `Test Suites: 12 passed, 12 total · Tests: 221 passed, 221 total`. The new file is one of the 12: `PASS scripts/__tests__/check-package-name-drift.test.ts`.
- `npm run typecheck:scripts` (`tsc -p tsconfig.scripts.json`) → exit 0, no diagnostics.
- `npm run check:drift` → `✓ No package name drift detected (3402 files scanned)`, scanning `governance, .kiro/steering, src, .kiro/agents, dist`. **Measured locally, and a local `dist/` DID exist** (51 entries), so this count includes it. CI runs the same script with no `dist/`, so the count there differs by design. The temp-cwd test never reads the repo's `dist/`.

## The bite (recorded on a TEMP COPY; the real script was never edited for it)

Scratch dir: `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/07af3405-cf65-4fd4-9ae6-d36fe6a77303/scratchpad/bite2/`. The script was copied there, `walkDir`'s guard line `if (!fs.existsSync(dir)) return;` was deleted from the copy only (`diff` against the real file showed that single line), the new test was copied beside it, and jest was run with the repo's `scripts/jest.config.js` and `--rootDir` on the scratch dir. Exact output (ANSI stripped, scratch path shortened where marked `…`):

```
FAIL …/bite2/scripts/__tests__/check-package-name-drift.test.ts
  check-package-name-drift (spawned in a temp project)
    ✕ is a no-op (exit 0, zero files scanned) when every scan directory is absent (28 ms)
    ✕ still fails (exit 1) on a wrong-scope reference under a present scan directory (26 ms)

  ● … › is a no-op (exit 0, zero files scanned) when every scan directory is absent
    Expected: 0
    Received: 1
  ● … › still fails (exit 1) on a wrong-scope reference under a present scan directory
    Expected substring: "Package name drift detected"
    Received string:    "node:fs:1583
      const result = binding.readdir(
    Error: ENOENT: no such file or directory, scandir '/private/var/folders/…/T/drift-script-ubimHa/governance'
        at walkDir (scripts/check-package-name-drift.js:129:22)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

The first case turns red because the stripped guard lets `readdirSync` throw ENOENT (exit 1, not 0). The second goes red for the same reason: `governance/` is absent, so the walk throws before reaching the present `src/`. The same two tests pass on the real script (`npm run test:scripts` above). The bite uses the real test file unchanged, so it measures the shipped assertions.

## Application-time adaptations

- The brief and the Primary Artifacts clause say the bite strips `walkDir`'s guard. On the bitten copy the positive control also fails (ENOENT on the first absent directory), which is a stronger signal than the task asked for and no change in the test.
- `canonical/generated.lock` was not touched (`git status --porcelain canonical/` empty). `check:122:diff-guard` was not run.
- No other adaptation: none.
