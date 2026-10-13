# CI needs: what this design system needs verified, and why

DesignerPunk's guarantees depend on a few verifications existing in your repo. This file declares them as **needs**. It does not prescribe a CI vendor, a workflow syntax or a repo layout: you map each need onto whatever CI your repo has, or none yet. `tasks.md`, beside this file, is how your agent and you do that.

Each need carries:
- **Tier**: `minimal core` (adopt these first) or `optional hardening` (adopt when its condition applies).
- **Why**: what goes wrong without it.
- **Check**: what the check must verify. The commands shown are how to run it, not a CI configuration.
- **Bite recipe**: introduce this deliberate failure, and the check must go red; then revert. A check that has never gone red has not been shown to check anything.
- **Price**: what skipping it costs, and what adopting it costs, in one line.

The commands below use DesignerPunk's lifecycle verbs:
- `generate`: the pipeline — run on every token change.
- `sync`: reports package updates against the installed package — reports, never writes silently.
- `validate`: validates token definitions against the active source.

## Needs

### N1. Committed platform output matches `generate`

- **Tier**: minimal core
- **Why**: by default your repo commits the platform output `generate` writes (the commit policy), so the files you preview are the files you ship. If a token changes and nobody runs `generate`, the committed CSS, Swift and Kotlin no longer say what your token source says, and nothing tells you.
- **Applies when**: you commit generated platform output (the default). If your build or deploy runs `generate` itself and you do not commit the output, this need does not apply.
- **Check**: run `npx designerpunk generate --force` (`--force` regenerates product tokens even when their files look unchanged; without product tokens it changes nothing), then fail if any file under the `output` directory in `designerpunk.config.ts` differs from its committed version, or is new and uncommitted. Ignore the timestamp lines: every `generate` run rewrites a timestamp in each stamped file (a `Generated:` line, the DTCG file's `"generatedAt"` value, and a `Product tokens — generated` line in product-token files), so a byte comparison would be red on every run. With git 2.30 or later:
  - `git diff --exit-code -I 'Generated: |generatedAt|Product tokens — generated' -- <your output directory>` exits non-zero on a real difference;
  - `git ls-files --others --exclude-standard -- <your output directory>` prints nothing (no new, uncommitted output file).
- **Bite recipe**: change one token value in `src/tokens/` (for example a spacing value in `src/tokens/SpacingTokens.ts`) and commit it without running `generate`. The check goes red. Revert the change.
- **Price**: skip it, and a token change can ship without its platform output, with nothing to report the mismatch; adopt it, and you run `generate` in CI on every change and keep this bite proof working.

### N2. After a package update, the name contract is clean

- **Tier**: minimal core
- **Why**: DesignerPunk's components are its updating surface, and your tokens are your language. An update can make a component expect a token name your set does not define. `sync` reports that ("components now expect token …") and never adds the token for you, so without a check the report is easy to miss.
- **Applies when**: always; it matters most on any change to `package.json` or the lockfile.
- **Check**: run `npx designerpunk generate`, then `npx designerpunk sync --dry-run`, and pass only if the output contains `name contract: clean`. `sync`'s exit code does not reflect its report, so the check reads the report text.
- **Bite recipe**: rename one semantic token that DesignerPunk's components reference, for example the `normal` key of the grouped spacing tokens in `src/tokens/semantic/SpacingTokens.ts` (to `normalx`). The check goes red, and `sync` prints `components now expect token '--space-grouped-normal'`. Revert the rename.
- **Price**: skip it, and after an update a component can read a token your CSS does not define, with nothing to report it; adopt it, and you add one CI step that runs `generate` and `sync --dry-run`, and keep this bite proof working.

### N3. Your own component tests run

- **Tier**: optional hardening
- **Why**: a component you put in `src/components/` wins over DesignerPunk's on its declared name, and DesignerPunk's own tests do not cover your version.
- **Applies when**: you own at least one component in `src/components/`.
- **Check**: run `npx jest --passWithNoTests` with the `jest.config.js` that `init` writes. It fails on any failing test. Keep `--passWithNoTests`: a repo with no tests yet makes Jest exit non-zero.
- **Bite recipe**: add a test under `src/components/__tests__/` that asserts `expect(1).toBe(2)`. The check goes red. Delete the test.
- **Price**: skip it, and a regression in a component you own reaches your users unnoticed; adopt it, and you install the five test devDependencies, write the tests, run them in CI, and keep this bite proof working.
- **Note**: in this version, `@3fn/core/testing`'s helpers do not resolve under the Jest preset in an installed package. Plain tests run. The install guide's "Running Component Tests" says what works.

### N4. Product token references resolve

- **Tier**: optional hardening
- **Why**: a product token can reference a system token by name. If that name is not in your token set, the product token points at nothing.
- **Applies when**: `designerpunk.config.ts` sets `productTokens`.
- **Check**: run `npx designerpunk generate` (it refreshes `token-index/`), then `npx designerpunk validate --product-tokens`. It exits non-zero on any broken reference.
- **Bite recipe**: change one product token's `ref:` to a name that does not exist (for example `space999`). The check goes red. Revert.
- **Price**: skip it, and a product token can reference a system token your set lacks, with nothing to stop it merging; adopt it, and you add one CI step, meaningful only once you have product tokens, and keep this bite proof working.

## Need count

4: two minimal core (N1, N2) and two optional hardening (N3, N4).
