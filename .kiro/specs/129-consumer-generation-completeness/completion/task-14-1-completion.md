# Task 14.1 — One loaded token set from the consumer's barrel; the value-import guard; the removal case

**Agent**: Ada (Sonnet) · **Unit branch**: `task/129-14-consumer-source`

## What changed

- `src/generators/TokenSet.ts` (new): the `TokenSet` interface (`mod(key)`, `has(key)`) and `TokenModules`, a type-only map from a path under `src/tokens/` to that module's type.
- `src/config/TokenSetLoader.ts` (new): `loadTokenSet(root, loader)` reads every module of the set from the token source in one scoped load, on first use, and names the missing file in its failure. `packageTokenSet()` is DesignerPunk's own, read lazily; a generator uses it only when its caller passes no set. `src/config/scopedTsRequire.ts` gains `scopedTsRequireMany`.
- `resolveTokens` returns `tokenSet` beside the two arrays; `generateTokenFiles`, `generateTokenIndex` and `scripts/generate-platform-tokens.ts` pass it on.
- The palette, opacity, motion and layering, icon-size inputs, `ColorTokens` and the DTCG export's 41 imports now read through `tokens.mod(...)` in `TokenFileGenerator`, `DTCGFormatGenerator`, the three format generators and `SemanticValueResolver`. The DTCG export takes its dark override map as an argument.
- `TokenValueImportGuard.test.ts` (new) fails on a value import of `src/tokens` under the four directories; its allowed list holds what U9 leaves, with reasons (four files `generate` never constructs, and `generateTokenFiles.ts`'s override maps, which 14.2 removes). `token-read-sites.json` loses the six rows that no longer read the package.
- `tests/consumer-integration.test.ts`: a `Consumer Guard` `describe` edits groups 1, 3, 4, 5 and 6 in the copied source and finds the value in the generated CSS (the DTCG file for group 6), and a removal case deletes the package's own token modules (Spacing and Sizing stay, which the harvested component token files import) and finds byte-identical output. Group 2 (the override maps) is 14.2's.

## Targeted tests and result

`npm test -- src/generators src/providers src/resolvers src/cli src/validators src/config src/themes`: 123 suites pass (after `npm run build:generator`, which the worktree needed). `npx tsc --noEmit` clean. `npm run test:consumer -- -t "Task 14"`: 6 passed.

## Application-time adaptations

- The row says "passed to every generator". Four files `generate` never constructs (`BlendCalculator`, `BlendValueGenerator`, `ResponsiveGridGenerator`, `WebUnitConverter`) keep their package import and sit on the guard's allowed list with the reason; the design's "no generation file imports `../tokens` for values" holds for the `generate` path.
- A set loaded lazily and all at once, not per module: one scoped load keeps a module two others import a single instance, and `validate` and the sync tests that only resolve tokens do not load the palette.
