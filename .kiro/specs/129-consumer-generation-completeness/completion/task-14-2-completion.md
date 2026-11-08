# Task 14.2 — The theme registry from config; the registration-keyed bridge; package mode; the `{ light, dark }` form; the golden; cases (a)-(d)

**Agent**: Ada (Sonnet)

## What changed

- `src/themes/resolveThemeMaps.ts` (new): the theme-source resolver. For `dark`, `wcag` light and `wcag` dark: registered reads the adopter's map; registered-but-missing fails naming `<tokenSource>/themes/<dir>/SemanticOverrides.ts`; unregistered in local mode reads the package's built-in at run time through `TokenSet.builtinTheme` (which uses `scopedTsRequire`) with the bridge warning; package mode reads the built-ins, no warning. `ConfigTheme.overrides` accepts `{ light, dark }`; `init` writes `wcag` in that form with `mode: 'both'`.
- `generateTokenFiles.ts`: the static imports of the three maps (L19-21) are gone; the registry is built from the config's themes; each other registered theme becomes a `ThemeOverrideSet` that reaches the web blocks and the native emitter; the first-run count prints once per change of a registered map (marker `<output>/.theme-notice.json`, written only after validation).
- `errorCatalog.ts`: the bridge warning (design § 10, verbatim), the count notice, the missing-map message, and the `Themes:` line, which now says "registered and applied" (amended in Spec 123's design row and `catalog-wording.md`, with the prior text kept).
- `tests/fixtures/pre-u9-theme-css/`: the golden, captured from a tarball built in a worktree at `261cd1a3c`; its header names the SHA and the command; `capture.sh` and `mutate-fixture.cjs` reproduce it.
- `Consumer Guard` cases (a), (b), (c), (d), the missing-file case and the group-2 edit case; `src/themes/__tests__/resolveThemeMaps.test.ts` (3 maps x 3 states x 2 modes, plus the count and the pair form).
- `scripts/harness/consumer.ts` writes `pair: true` for a `{ light, dark }` entry; `consumer.test.ts` shows a pair entry carried as `mode: 'both'`, `pair: true`.

## Targeted tests and result

`npm test -- src/themes src/generators src/cli`: green. `npx jest --config scripts/jest.config.js scripts/harness`: 731 pass. `npm run test:consumer -- -t "Spec 129 Task 14"`: 14 pass, including (a): everything before the WCAG block is byte-identical to the golden; inside it only the two tokens the fixture's `wcag` copy changed move, in their light half; the first run prints "2 of its values differ"; the bridge warnings for `dark` and `wcag` dark print word for word on two consecutive runs and the count does not repeat.

## Application-time adaptations

- Case (b)'s "removal case runs here" is run in the six-groups `describe`, whose install is a fresh `init` (it registers all three maps); it removes the package's own token modules, themes included.
- The golden was captured after 14.1's generator edits existed on the branch, from a worktree at the base SHA, so the bytes are the base's.
- The count notice needs a marker file in the output folder (the design says "first run"); it is the one new file `generate` writes.
