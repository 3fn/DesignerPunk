# Task 8.2 Completion — Tally + warning + fixture test

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 8 · **Agent**: Ada (Sonnet)

## What changed

- **`src/cli/loadComponentTokens.ts`**:
  - Added `brandedCountByFile: Map<string, number>` and `scannedTokenFiles: Set<string>`, threaded through both discovery sources (`{tokenSourceRoot}/component/` and `componentTokenDirs`) and into `harvestModule`/`scanForTokenFiles`.
  - `harvestModule` now increments `brandedCountByFile` for every distinct branded export it finds, **before** the cross-module `seenNames` dedupe — this is the Req 8.1 false-positive fix Lina's R2 named: the trigger is "exports no branded value," not "harvested zero *net* tokens," so a fully branded file whose token names were already harvested from an earlier-scanned module still counts non-zero and does not warn.
  - Added `isTokenFileName(name)` — true for `tokens.ts` or `*.tokens.ts` — applied uniformly to files reached through **either** discovery source (Source 2's scan already filters on this pattern; Source 1's `{tokenSourceRoot}/component/` scan accepts any `.ts` file, so the naming test is applied there too, matching Req 8.1's literal condition — "a scanned `tokens.ts` / `*.tokens.ts` file" — rather than narrowing the lint's scope to Source 2 only).
  - After the harvest and registry write, iterates `scannedTokenFiles` and calls `console.warn(harvestZeroWarning(file))` for any file whose branded count is `0`. **This reuses `getTokenContract` — the same brand check the harvest already runs — introducing no second detection mechanism** (Req 8.2).
  - Added `export function harvestZeroWarning(file: string): string` — the exact warning string, factored out so the fixture test can assert string-equality against the same source of truth rather than a duplicated literal.

- **`src/cli/__tests__/loadComponentTokens.test.ts`**:
  - New `describe('harvest-zero lint (Spec 123 C11, Req 8)')`: (1) an unbranded `tokens.ts` (a plain semantic-reference map, `module.exports = { widgetColor: "#000000" }`) fires **exactly one** warning, asserted string-equal to `harvestZeroWarning(filePath)`; (2) a branded `*.tokens.ts` (calling the real `defineComponentTokens` via `require.resolve('../../build/tokens')`, following the `consumer-package-mode.test.ts` precedent for loading the real module by absolute path from a tmpdir fixture) fires **no** warning.
  - Updated the pre-existing `'discovers *.tokens.ts files recursively in componentTokenDirs'` test: its two fixture files (`buttonIcon.tokens.ts`, `avatar.tokens.ts`) are deliberately unbranded (`module.exports = {}`) — a discovery-only test, not a branding test — and now legitimately trip the new lint. Added a local `jest.spyOn(console, 'warn').mockImplementation(() => {})` around the call, following this repo's documented house pattern (`console-allowlist.json`'s first entry: "wraps it in a local `jest.spyOn(console,'warn')`...which per `console-fail-setup.ts`'s documented shadow behavior fully swallows the output before this hook ever sees it") rather than adding a global allowlist entry for what is really local, expected fixture noise.

## The warning string — catalog status

No `design.md` catalog row exists for this exact string; C11's entry reads only "Unchanged" (pointing at the draft/outline, not a literal string). The implemented wording follows `design-outline.md` § 4.5's proposed phrasing (Lina, R1) as closely as an implementation string can:

> `⚠️  ${file}: this scanned file harvested zero component tokens; if you meant to register values, call \`defineComponentTokens\`.`

**Flagged for a Thurgood erratum**: add this row to design.md's C11 catalog rather than leaving `loadComponentTokens.ts`'s own docstring as the sole source of truth for the string. Recorded in the source docstring above `harvestZeroWarning` as well, so the flag survives independent of this doc.

## Targeted tests + result

`npm test -- src/cli/__tests__/loadComponentTokens.test.ts` → **11/11 passed** (Test Suites: 1 passed) — the two new lint tests, plus the nine pre-existing tests (one updated with a local spy, as above), all green.

### Bite recorded red

Commented out the `console.warn(harvestZeroWarning(file));` call (body replaced with a no-op comment, condition left intact) → re-ran the same test file → **RED**: `an unbranded tokens.ts fires exactly one warning, exact string` failed with `Expected number of calls: 1, Received number of calls: 0` (the sibling "fires no warning" test stayed green, as expected — removing the warn call cannot turn a false negative into a false positive). Restored the original `console.warn(harvestZeroWarning(file));` line from a pre-edit backup copy; re-ran → 11/11 green again. `git diff --stat src/cli/loadComponentTokens.ts` after restore showed the same net diff as before the bite (no stray edits left behind).

## Application-time adaptations

1. **Lint scope widened to both discovery sources, not Source 2 alone.** Req 8.1's literal trigger names a filename pattern ("a scanned `tokens.ts` / `*.tokens.ts` file"), not a discovery source. `{tokenSourceRoot}/component/` (Source 1) scans any `.ts` file by convention (today's real fixture there, `src/tokens/component/progress.ts`, doesn't match the pattern and so never warns) — but a consumer could still place a `tokens.ts`-named file there, and the requirement's condition would apply. Implemented the naming test uniformly across both sources rather than narrowing to Source 2, since narrowing would leave a real corner of the stated trigger uncovered with no textual basis in the requirement for the narrower reading.
2. **Per-file count is a "distinct branded export" count, not a "net tokens contributed" count.** This is the deliberate Req 8.1 correction (Lina R2) already called out above — surfaced here because it's the one place the implementation departs from the more literal (and wrong) reading of "harvest-zero."
3. No fork requiring escalation was encountered; both adaptations above are direct applications of the requirement text rather than judgment calls between competing readings.
