# Task 15.3 — `platforms:`, `PLATFORM_KEYS`, validation, the file-name check; the harness consumer's D4 layout

**Spec**: 129-consumer-generation-completeness · **Agent**: Ada (Sonnet) · **Branch**: `task/129-15-init-platforms` · **Traces**: Req 12.1–12.4

## Consults (on the record)
- **Kenya (iOS)**: `ios/DesignerPunk`, generated `.swift` files flat in it, no lane change. `gen:` keys are relative to the folder (`harness/ios/lane.ts:690`), so they stay unchanged only if files sit directly in it. The folder comes from `manifest.platformOutputs.ios` (`lane.ts:670`, filled by `consumer.ts:360-366`). Stage C compiles packaged and generated files as one module and `selectFiles` fails on a shared base name, so the folder holds only generated Swift and is not the packaged source folder. `pins.yaml` § ios has no output path.
- **Data (Android)**: `android/designerpunk`, no lane change. The folder comes from `manifest.platformOutputs.android` (`lane.ts:277`) and is walked recursively for `.kt`; no package-matching directory is needed; generated output has no `res/`. `assertOneCopyPerName` throws on a duplicate name, so the folder holds only generated `.kt`. `pins.yaml` has no layout path to move.

## What changed
- `src/config/platforms.ts` (new): `PLATFORM_KEYS = ['web','ios','android']`, `PlatformKey`, `PlatformOutputs`, `platformOutputDir`. `defineConfig` accepts `platforms?`; `src/config/index.ts` exports the constant and the types.
- `src/cli/shared/platformOutputs.ts` (new): `resolvePlatformOutputs` imports `PLATFORM_KEYS`; an unknown key, an entry without `output`, or a folder that resolves outside the config's folder (or is the project root) throws, naming it (messages in `errorCatalog.ts`). `ConfigLoader` calls it, so `generate` fails with the message. `productTokenOutputPaths` lives here too.
- `src/generators/generateTokenFiles.ts`: each token and component result is written at its platform's folder (named) or `output`; DTCG and Figma follow `web`. No personal-note code.
- `src/cli/freshness.ts`, `generateProductTokens.ts`, `staleness.ts`, `shared/componentTokenReferences.ts`, `designerpunk.ts`: the freshness check compares each named platform folder; product-token native files go to the platform folder flat (web CSS stays under `output/product`); the name-contract read and the reserved-Kotlin scan follow the folders.
- `scripts/pack-assert.ts` section 12: `generatedNativeNameFindings` fails when a packaged native source under `src/` has the base name of a generated file (`DesignTokens`/`ComponentTokens`/`ProductTokens` × `.ios.swift`/`.android.kt`). The retired root `dist/*` snapshot is not read (U12 removes it). Its test file `scripts/__tests__/pack-assert.test.ts` follows `scripts/pack-assert.ts` (standing scope).
- Harness consumer (spec-row grant, U12 not merged): `harness/pins.yaml` § consumer gains `platforms: { ios: ios/DesignerPunk, android: android/designerpunk }`; `scripts/harness/consumer.ts` reads and validates it and writes `platforms:` into the consumer config (`addPlatforms`); `consumer.test.ts` updated. The four lists' `gen:` keys are unchanged: none of the four `harness/expected/*.tsv` carries a `gen:` key, and none was edited. No lane file, `harness/expected/**`, `protected-set.txt` or other `pins.yaml` section changed.

## Targeted tests
- `npm test -- src/cli/__tests__/platformOutputs`: 13 pass (key list, unknown key, outside-root, missing output, web/ios/android placement, folder contents, freshness per folder, product-token paths).
- `npx jest --config scripts/jest.config.js scripts/__tests__/pack-assert scripts/harness/__tests__/consumer`: 86 and 50 pass.
- `npm run test:consumer -- -t "15.3|init produces|generate failing"`: the D4 `Consumer Guard` case (ios and android files at their paths and alone there, web and the rest at `output`, no generated name equals a packaged native name), the unknown-key case and the outside-root case pass.
- `npx tsc --noEmit`: clean.

## Application-time adaptations
- Product-token native files move to the platform folders (flat), a place the criterion does not name but Req 12.4 ("holds only that platform's files") and the harness's own `ProductTokens.*` check need. Without `platforms:` they stay at `output/product`.
- `staleness.test.ts` mocks `generateProductTokens`, so the shared path function sits in `shared/platformOutputs.ts`; that test is unedited.
- Guide not edited for `platforms:`: its config reference does not mention the key (flag for Thurgood's lane, not in 15.3's list).
