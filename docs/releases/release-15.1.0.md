# Release 15.1.0

**Date**: 2026-10-14
**Previous**: 15.0.0
**Bump**: minor

> **Authorship note (recorded, not buried)**: these notes are HAND-AUTHORED from the merged delta (`v15.0.0..main`, `main` at `5ac23b74c`), per the post-Q6 convention used since 14.0.0. No release tool was involved. This is Spec 123's "Release 3", the third planned entry ("Release N" labels the Nth planned entry, not a count of tags; 15.0.0 carried the first two).
>
> **The delta, derived** (RELEASE-FLOW § "Deriving the delta", step 1):
> - `git log v15.0.0..main --oneline`: **66** squash commits (#272–#339; #284 and #290 are not in the delta).
> - The same log scoped to the shipped surface, `package.json` `files[]`:
>   - **15** commits touch a tracked `files[]` path, read literally (`dist/` is build output and untracked);
>   - **16** with `src/` (the source `dist/` is built from) and `package.json` added;
>   - **20** with the other build inputs of `dist/` added (`canonical/`, `tools/agent-generator/`, `product-mcp-server/`, `scripts/`).
>   - The shipped-surface roots: `CHANGELOG.md`; `dist/**` (browser bundles, compiled code and token files, `consumer-canonical/`, `generator/`, `mcp/tool-manifest.json`, `name-contract.json`); `bin/`; `src/cli/templates/`; `docs/consumer/INSTALL.md` and `docs/consumer/COMMIT-POLICY.md` (new in this release); the eight `.kiro/steering/` identity documents; `governance/`; `mcp-server/` and `application-mcp-server/` (`src/`, `package.json`, `tsconfig.json`); `family-guidance/`; `experience-patterns/`; `layout-templates/`; `token-index/`; `family-registry.yaml`; `design-language/`; `src/tokens/**`; `src/styles/`; `src/assets/fonts/**`; the component schema, contract and meta files under `src/components/**`; the named `src/types`, `src/build`, `src/registries` and `src/constants` files; the native component and blend sources.
>   - *A count of 64 was quoted in the release-prep brief. It is not reproduced by any scoping above; scoping to all of `.kiro/` gives 63. The counts above are the ones these notes stand on.*
>
> **Classification** (step 2): **0 breaking · 1 minor (#321, the onboarding unit) · 15 consumer-facing fixes or changes · 50 internal**. The token source (`src/tokens/`) and the token index did not change in this release.
>
> **Why minor, and the counter-argument that survives.** Nothing a 15.0.0 install relies on was removed: no export, no shipped file, no token. Three changes alter behaviour a 15.0.0 user can see, and each was weighed as a possible break:
> - **`generate` now exits 1 when the token source fails its own checks** (#335). In 15.0.0 it printed ✅ and exited 0 while writing no token files. That was a disclosed defect (15.0.0's Known limitations named it), not a contract, and the token source is unchanged here, so a repo that generated correctly on 15.0.0 is unaffected.
> - **Generated file headers change once** (#339), and the DTCG file's `$extensions.designerpunk.generatedAt` field is no longer written. No API changed; the field was never documented.
> - **The Jest preset's mappings changed** (#336). The old mappings could not load in an installed package; a config that replaces `moduleNameMapper` keeps its own mappings.
>
> **What survives**: on the strict reading "anything a 15.0.0 user must change is breaking", the first item qualifies. A 15.0.0 repo whose token source already fails validation had a green CI and will have a red one after upgrading, with no change on its side. These notes hold that the green was false (no token files were written), so the change is a fix. A reader who weighs the exit code as the contract would call this release 16.0.0. **Peter ratifies the bump by merging the release PR.**

**Scope of this release, plainly**: This release is ready for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input, so don't start a native product on this release. On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output yet; light and dark mode work.

## 🟡 Added

All from the onboarding unit (#321, Spec 123 Tasks 19–22) unless marked.

- **An install guide, `docs/consumer/INSTALL.md`, shipped in the package.** It teaches four ways in, in the order you type them: read DesignerPunk's docs; build a design system of your own; join one a teammate built; add a second agent tool. It is a committed copy of the opening region of the Integration Guide, held identical by a test. The rest of the guide sits under one "Reference" heading, swept against source by each section's owner.
- **A commit policy, `docs/consumer/COMMIT-POLICY.md`, shipped in the package.** It lists which files you commit (config, tokens, components, `product/`, `specs/`, the manifest, the generated agent files, and the generated platform output by default) and which each person regenerates or keeps local (`token-index/`, `.designerpunk/`).
- **A `.gitignore` block.** `init` writes one that ignores exactly `token-index/` and `.designerpunk/`, plus a commented line for your configured output path. `sync` offers the same block to a repo born on 15.0.0, only when git is not already ignoring `.designerpunk/`. It asks first (default no); off a terminal it prints the fix and writes nothing.
- **Two starter specs in `specs/`**, placed by `init`, never overwriting a file you have:
  - a CI-needs spec: what a design system needs verified, how to check each need, and what skipping it costs;
  - a re-grounding spec for your agent to run.
- **A personal note.** `init`, `generate`, `attach` and `sync` create `.designerpunk/personal-note.local.md` from a template when it is absent, so a teammate's fresh clone gets one. A note that is still only the template is set aside by your agents, which offer to walk you through it. An edited example ships at `node_modules/@3fn/core/src/cli/templates/personal-note.example.md`. Whether the agent's walkthrough personalizes the note in practice is not yet verified by a recorded run (Spec 123 U5).
- **A `product/` tree from `init`**: a product overview, a layout template and a worked example screen, so the Product MCP starts with something real to index.
- **`init` finishes its output.** It names the target it chose when you give none, prints next steps starting at `generate`, and lists the `.gitignore` block and the starter specs among them.
- **Kiro agent prompts carry a knowledge-base fallback note** (#313). A knowledge base declared only by glob, which Kiro drops, now appears in the prompt as a "search these paths" note.

## 🔵 Changed

- **`generate`'s `Themes:` line is honest** (#321): a registered theme reads "registered, not applied yet".
- **Consumer agent corrections** (#307, #337). The ground-truth line no longer calls build outputs "stale"; the Kiro prompts get their missing blank line. Kenya and Data no longer say `generate` produces theme code; they say it produces no theme types today and that DesignerPunk plans to address it. Both now also say native onboarding is not supported on this release. These reach your repo through `sync`, as regenerated agent files.
- **The agent-profile derivation check runs on what ships** (#313). This closes the two limits 15.0.0 disclosed. A section changed in place that names itself as its destination still passes; that limit is carried, as the CHANGELOG states.
- **Search in the MCP servers** (#303, #325, #328, #330, #319):
  - **`find_docs`** ignores heading-like lines inside code blocks, can match a document's single best `###`/`####` heading (a new `subsections` evidence class), and treats `iOS`-family names as one word. Accepted on a pre-registered fresh blind query set: net +2 of 30, no new confidently-wrong answer.
  - **`find_components`** drops stop words, folds plurals, splits on `/`, keeps `iOS`-family names whole, and never ranks `partial` above `strong`. **Tiers move**: a query whose only strong word is a contract category (`validation`, `interaction`, `state`, …) now reports `partial`, not `strong`.
  - Sibling components that shared one `whenToUse` or `alternatives` text (Button, form-input and Progress families) now describe themselves (`component-meta.yaml`).
  - Two governance docs gained a search alias each.
  - *Limit*: for `find_components` this shows the recorded defects are fixed and nothing regressed, not that discovery improved; no components blind set exists.
- **Served governance docs** (#329, #283, #292). Twenty docs open with an "Audience framing" note saying whose process or components they describe and what transfers. `release-management-system.md` and `classification-map.md` changed with DesignerPunk's own release law (hermetic publish path, the consumer CHANGELOG step, the parity register row). These are consumer-visible, because the docs MCP serves them from the package; none asks anything of a consumer.

## 🔵 Fixed

- **`generate` fails when the token source fails its own checks** (#335): exit 1, no token files written, `token-index/` left as it was. Before: "✅ System tokens generated", exit 0, and `token-index/` rewritten with every theme-varying flag lost.
- **Generated output is deterministic** (#339). No wall-clock stamps; headers read `Generated by: @3fn/core <version>`. The DTCG file no longer writes `generatedAt`. Verified by running `generate` twice on one machine; file order across different filesystems is not verified.
- **The Jest preset works in an installed package** (#336). `@3fn/core/testing`, `/types`, `/blend`, `/config` and `/build` map to the compiled files the package's `exports` serve. Verified in a packed install with Jest 30 and ts-jest.
- **The Application MCP reports DesignerPunk's web components at their recorded readiness in a consumer** (#338), from a build-time record, not `not-started`.
- **`sync`'s `.gitignore` "markers missing" message names its remedy** (#336): list `.gitignore` in `.designerpunkignore`.
- **`sync --migrate-legacy` creates the personal note and names it** (#321). This was a 15.0.0 known limitation.
- **`init` in a born repo** says "generate creates it", which is now true. **`init`'s `product/overview.yaml`** is valid YAML the Product MCP can index. **The customize note** no longer claims `generate` checks mathematical relationships (#321).
- **The Integration Guide's Reference section** now matches `generate`'s abort behaviour and the Jest preset (#337).

## ⚠️ Known limitations (disclosed, tracked)

- **`validate`'s mathematical-relationships check fails on unmodified token source**, so `validate` exits non-zero. Peter ruled it a known limit for this release (release-3 rulings, item 4). Tracked: `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`.
- **Native onboarding is not supported**: no theme surface is emitted, the 14 theme-varying semantic colours are absent from the native token files, and nine shipped iOS files misspell the theme key. Unchanged from 15.0.0. Tracked: Spec 129 (`.kiro/specs/129-consumer-generation-completeness/`), `.kiro/issues/2026-10-03-ios-theme-environment-key-missing-backslash.md`.
- **Custom themes are not emitted on any platform.** Unchanged from 15.0.0.
- **Your `generate` takes dark-mode and WCAG values from the installed package**, not from your copied token tier. Unchanged from 15.0.0.
- **In a consumer repo the Application MCP still reports `degraded`**: one "companion path not found" warning per component family with a companion doc. Tracked: `.kiro/issues/2026-10-03-app-mcp-degraded-companion-paths-in-consumer.md`. *That record's trigger reads "the fix PR merges before release 3's tag", and no fix PR has merged at this writing. If one merges before the tag, this bullet and its CHANGELOG twin must be removed.*
- **The Application MCP reads 32 of 34 DesignerPunk native implementations as `scaffold`**, in this repo too, because its native test patterns miss the repo's test files. Tracked: `.kiro/issues/2026-10-13-native-readiness-test-patterns-miss-repo-tests.md`.
- **Upgrading from 14.x**: `sync` does not detect copied component-token files in the pre-fix form (R1), and `--migrate-components` reports "cannot tell" for every copy when registry access fails (R2). Tracked: `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`.
- **Product-token staleness**: a plain `generate` decides from the product YAML's file times alone, and `--product-only` resolves from the current directory. Tracked: `.kiro/issues/2026-10-12-generate-staleness-decided-by-file-times.md`, `.kiro/issues/2026-10-03-generate-product-only-resolves-from-cwd.md`.
- **19 served governance docs name 67 `src/` files** that exist in DesignerPunk's repository but not in the package. Tracked: `.kiro/issues/2026-10-13-src-path-convention-for-served-governance-docs.md`.
- **`SemanticOverrideMap`**, the type a theme's overrides are written in, is not exported from `@3fn/core/config`. Tracked: `.kiro/issues/2026-10-03-semantic-override-map-type-not-exported.md`.

## Upgrading from 15.0.0

1. `npm install @3fn/core@15.1.0`.
2. **`npx designerpunk generate`.**
   - **A one-time header change** on every generated file: `Generated by: @3fn/core 15.1.0` replaces the `Generated:` time and `Version: 1.0.0` lines, the product-tokens line names the version, and `DesignTokens.dtcg.json` drops `generatedAt`. Commit it. After that, committed output changes only when a token changes or you upgrade `@3fn/core`, once per upgrade.
   - **If your token source fails its own checks, `generate` now exits 1** and writes nothing. Fix the reported token; there is no flag to restore the old exit code.
   - **If `.designerpunk/personal-note.local.md` is missing, `generate` creates it** from the template and says so. It warns if git is not ignoring `.designerpunk/`.
3. **`npx designerpunk sync`, in a terminal.**
   - It refreshes the generated agent files: the Kenya/Data and Kiro changes above arrive this way.
   - It **offers DesignerPunk's `.gitignore` block** (default no) if git is not ignoring `.designerpunk/`. Off a terminal it prints the fix and writes nothing.
   - **It creates the personal note if absent, even without a terminal and without `--apply`.** That is one exception to 15.0.0's "off a terminal, `sync` writes nothing unless you pass `--apply`". `--dry-run` still writes nothing.
4. **Jest**: a config that spreads the preset the way `init` writes it (`...require('@3fn/core/jest-preset')`) picks up the fixed mappings with no change. A config that sets its own `moduleNameMapper` after the spread replaces the preset's and keeps working as before, without the fix. To get the fix there, spread `require('@3fn/core/jest-preset').moduleNameMapper` into yours.
5. **Restart your agent session** so it reloads the regenerated agents and MCP servers.

**Upgrading from 14.x**: follow the 15.0.0 release notes (`docs/releases/release-15.0.0.md`), installing 15.1.0 at step 1. The one-hop rehearsal was run for 15.0.0 and has **not** been re-run for 15.1.0. One difference: 15.1.0's `sync --migrate-legacy` creates the personal note, so 15.0.0's step 4 is done for you except for filling it in.

## 📦 Dependency disclosure (ballot `2026-10-03-hermetic-publish-path` § 7)

This release's public-npm artifact is built from the root lock, in a fresh clone (the hermetic publish path, #279). Public 15.0.0 was built from the nested sub-package locks. The bundled MCP servers' embedded dependencies therefore change against **public 15.0.0**; against **GitHub Packages 15.0.0**, which already had the root-lock shape, they do not:

| Embedded in | Dependency | Public 15.0.0 | 15.1.0 |
|---|---|---|---|
| `dist/mcp/docs-mcp.js`, `dist/mcp/application-mcp.js` | `zod` | 3.25.76 | 4.3.6 |
| `dist/mcp/docs-mcp.js`, `dist/mcp/application-mcp.js` | `ajv` | 8.20.0 | 8.18.0 (a lower version) |
| `dist/mcp/application-mcp.js` | `js-yaml` | 4.1.1 | 4.2.0 (same major) |

**Where these figures come from.**
- **The 15.1.0 column** was re-read from the bundles of a fresh-clone dry run (`release-publish.ts --dry-run 5ac23b74c`, 105/105 assertions): every module in the three bundles resolves from the root `node_modules/`, which pins `zod` 4.3.6, `ajv` 8.18.0, `js-yaml` 4.2.0 and `@modelcontextprotocol/sdk` 1.29.0.
- That dry run was at `main`'s head, before this release's version bump. The release changes no dependency; only the root `version` fields move in `package-lock.json`.
- **The public 15.0.0 column** is copied from the ballot's § 7 (2026-10-03). It was not re-read from the public 15.0.0 tarball for these notes.
- **The 5.1 dry run at S should confirm the 15.1.0 column.**

The `@modelcontextprotocol/sdk` declared range accepts `zod ^3.25 || ^4.0`.

## 🔵 Internal (provenance, not consumer surface)

Fifty PRs changed nothing a consumer installs or runs:
- **The hermetic publish path and its records**: #277, #278, #279 (`scripts/release-publish.ts`, the `pack-assert` publish-path checks, the folder-publish tripwire in `prepublishOnly`), #280, #281, #282, #285, #286, #287, #288. #283 ratified it; its served-doc text is listed under Changed.
- **15.0.0 records and claims passes**: #272, #273, #274, #275.
- **Completion-criteria parity**, armed as a required check: #289, #291, #293, #294 (#292's register row is under Changed).
- **Spec 123 plan, rulings and gate records**: #296, #304, #310, #316, #323, #324, #327, #331.
- **Issues and charters**: #276 (Spec 128), #295 (Spec 129), #297, #298, #299, #300, #308, #312, #332, #333, #334.
- **The discovery shadow study and its records**: #301, #302, #305, #306, #309, #311, #314, #315, #317, #318, #320, #322, #326. #315's scoring module and #325's compare module ship as inert source under `mcp-server/src/discovery-dry-run/`; the running server does not load them.

The served governance docs (`governance/**`) and `component-meta.yaml` files are consumer-visible; their changes are listed under Changed, not here.
