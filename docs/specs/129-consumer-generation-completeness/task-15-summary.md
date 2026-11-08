# Task 15 Summary: `init` runs `generate`, and `platforms:` writes each platform where its build reads it (U10)

**Spec**: 129 - Consumer-Generation Completeness · **Unit**: U10 · **Date**: 2026-11-08

## What changed for an adopter

- `npx designerpunk init` now runs `generate`, so your token output and `token-index/` exist as soon as `init` finishes. The founder path is four steps: install, `init`, your personal note, restart. If `generate` fails inside `init`, your config, token source and agent layer are still written; `init` prints the command to re-run first, then `generate`'s message, and exits non-zero.
- `init` closes with: "Your token output is in `<output>`. Run `npx designerpunk generate` after every token change."
- `designerpunk.config.ts` accepts `platforms: { ios: { output: './ios/DesignerPunk' }, android: { output: './android/designerpunk' } }`. The keys are `web`, `ios` and `android`. A platform you name is written to its own folder, which holds only that platform's generated files; every other platform, web and the DTCG and Figma JSON included, stays at `output`. An unknown key, an entry with no `output`, or a folder outside your project fails `generate`, naming it.
- `pack-assert` fails the package if a packaged native source file has the name of a file `generate` writes (a Swift package refuses a file name used twice).

## Release-note text

"**`init` runs `generate`.** A new project has its token output and `token-index/` as soon as `init` ends, and the install path is one step shorter. If `generate` fails inside `init`, the project is still made and `init` tells you what to re-run. **Per-platform output folders.** `platforms:` in `designerpunk.config.ts` writes iOS and Android output where each build reads it, for example `ios/DesignerPunk` and `android/designerpunk`, without moving your web CSS."

## Open

The README "Getting Started" list still has five steps: two `install-doc.test.ts` cases stay red until grant #776 merges and Thurgood edits the README. The lock (`canonical/generated.lock`) is not refreshed in this diff; the 122 diff-guard reads `input-closure-changed` from the Guide edits, and Lina refreshes it when U10 is next in the queue. The four harness contexts run from the PR and are pasted into the completion doc at head H.
