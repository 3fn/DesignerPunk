# Changelog

All notable consumer-facing changes to `@3fn/core` are recorded here, one entry per release, in plain language for the people who install this package. Internal-only changes (governance, test infrastructure, spec process) are not listed — see this repository's release history (https://github.com/3fn/DesignerPunk/releases) for the full hand-authored delta if you need that detail.

This file starts with Spec 123 ("Consumer Distribution"). Earlier releases are not backfilled here.

## [Unreleased] — planned Release 3 (the install guide, the commit policy, starter specs and `init`'s onboarding)

This release is ready for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input, so don't start a native product on this release. On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output yet; light and dark mode work.

This is the third planned entry in the plan's numbering ("Release N" labels the Nth planned entry, not a count of tags; 15.0.0 carried the first two). It adds the install guide, the commit policy, the starter specs and the personal note, and finishes `init`'s output.

### Added

- **An install guide, `docs/consumer/INSTALL.md`**, shipped in the package. It teaches the four ways in (read DesignerPunk's docs, build a design system of your own, join one a teammate built, add a second agent tool) in the order you type them. The Integration Guide opens with the same text and keeps everything else under a "Reference" heading.
- **A commit policy, `docs/consumer/COMMIT-POLICY.md`**, shipped in the package: which files `init` and `generate` leave for you to commit (your config, tokens, components, `product/`, `specs/`, the manifest, the generated agent files, and the generated platform output by default), and which each person regenerates or keeps local (`token-index/`, `.designerpunk/`).
- **`init` adds a `.gitignore` block** that ignores exactly `token-index/` and `.designerpunk/`, with a commented line, in your own configured output path, for the case where your build runs `generate` and you do not want to commit platform output. **`sync` offers the same block** to a repo born on 15.0.0, only when git is not already ignoring `.designerpunk/`: it asks first (default no), and off a terminal it prints the fix and writes nothing.
- **Two starter specs in `specs/`**, placed by `init` and never overwriting a file you have: a CI-needs spec (what a design system needs verified, how to check it, and what skipping each need costs) and a re-grounding spec for your agent to run. A path you already have is kept and reported.
- **A personal note.** `init`, `generate`, `attach` and `sync` create `.designerpunk/personal-note.local.md` from a template when it is absent, so a teammate's fresh clone has one. It stays on your machine. A note that is still only the template tells your agents to set it aside and offers to walk you through it; the command that finds it unfilled prints one warning. A finished example note (an edited copy of the project owner's own) ships at `node_modules/@3fn/core/src/cli/templates/personal-note.example.md`; write your own rather than copying it. If `generate` creates the note in a directory git is not ignoring, it says so.
- **A `product/` tree** from `init`: your product overview, a product layout template and a worked example screen, so the Product MCP starts with something real to index. `init` fills in your product's name.
- **`init` names the target it chose** when you give none (`no --target given — set up for Claude Code (the default). Using Kiro? …`), prints its next steps starting at `generate`, and lists the `.gitignore` block and the `specs/` scaffold among them. The jest install is one optional line after the steps.

### Changed

- **`generate`'s `Themes:` line is honest**: a registered theme is "registered, not applied yet". Dark mode and the `wcag` theme apply DesignerPunk's built-in overrides to your tokens; a theme you register does not change your generated output.
- **Your agents' ground-truth section reads accurately.** The line that tells an agent not to read generated build outputs no longer calls them "stale", and the Kiro prompts put a blank line before the "Ground truth" heading.
- **The iOS and Android agents (Kenya and Data) no longer say `generate` produces theme code.** They state what `generate` produces today (no theme types) and that DesignerPunk plans to address it (Spec 129, no date). The "regenerate your platform token output — including your theme Swift/Kotlin" cue is removed.
- **Kiro agent prompts carry a knowledge-base fallback note.** A Kiro knowledge base that is declared by glob only, which Kiro drops, now appears as a "search these paths" note in the prompt.
- **Names are consistent:** the CLI says "install guide" where it used to say "install doc" (the missing-token message, the "markers missing" message), and the `src/components/README.md` that `init` writes points at the install guide's "Ownership" section and states the declared-name rule.
- **Messages say what a skip means.** An existing `jest.config.js` is kept and the message says the preset is not applied.
- **The agent-profile derivation check now runs on what ships.** The check that each re-worded section of a shipped agent really comes from its source section now runs over the shipped consumer profile and its renderings, in every change to them. A re-worded section can no longer name an enclosing or neighbouring section as where its content went, and a section emptied to blank lines no longer passes. This closes the two limits 15.0.0 disclosed (the check was not applied to the shipped profile; a one-token variant of an emptied section passed). Still not covered: a section changed in place that names itself as its destination passes the check. That includes a write permission widened in place, and the shared governance rule emptied in place, which no reviewer reads.

### Fixed

- **`init` in a born repo says what is true.** Its refusal now reads "fill in your personal note (generate creates it; your agent can walk you through it)", and `generate` does create it. In 15.0.0 the same sentence promised a file `generate` did not write.
- **`init` wrote a `product/overview.yaml` the Product MCP could not read** (a Markdown-shaped file that is not valid YAML, so the Product MCP indexed nothing). It now writes a valid overview.
- **Customize note in `init`'s output:** it no longer says the validator warns when your tokens break their mathematical relationships during `generate`. `generate` does not check them, and `validate`'s check for them currently fails even on unmodified token source (a known defect in the checker, not in your tokens).
- **The Application MCP reports DesignerPunk's components at their real readiness in your project.** It read every DesignerPunk web component as `not-started` (and the native ones as `scaffold`), because the package does not ship the source files and tests that readiness is worked out from. It now reports the readiness DesignerPunk recorded when the package was built. Components in your own `src/components/` are still read from your files.
- **The Jest preset works in an installed package.** `@3fn/core/jest-preset` mapped `@3fn/core/testing`, `/types`, `/blend`, `/config` and `/build` to source files the package does not ship (or ships as raw TypeScript Jest will not compile), so a test importing the shared test utilities, a test of the token source `init` copied into your repo, or a test of a component token file failed with "Could not locate module" or "Must use import to load ES Module". The preset now maps each one to the compiled file the package's exports serve.
- **`sync`'s "markers missing" message for `.gitignore` says how to silence it.** If you removed DesignerPunk's `.gitignore` block on purpose, add the line `.gitignore` to `.designerpunkignore` and `sync` stops reporting it.
- **`generate` now fails when your token source fails its own checks.** If a semantic token points at a primitive you don't have, or your source lacks a semantic token that DesignerPunk's dark or WCAG overrides name ("Orphaned override key"), `generate` prints the reason and exits 1. It writes no token files and leaves `token-index/` as it was. Before this fix it printed "✅ System tokens generated", exited 0 (so CI passed), and rewrote `token-index/` with every theme-varying flag lost.

### Known limitations in this release

- Every `generate` rewrites a timestamp line in each generated file, so committed platform output shows as changed after every run even when no token changed. Compare with the timestamp lines ignored.
- `npx designerpunk validate`'s mathematical-relationships check fails even on unmodified token source, so `validate` exits non-zero. It is a defect in the checker, not in your tokens; its other checks are still worth reading.

## [15.0.0] — 2026-10-02

**This is a breaking (major) release for anyone running an earlier `@3fn/core`.** It ships, as one release, what was planned as two: the distribution substrate and the generated agent layer. To upgrade a 14.x install, see "Upgrading from 14.x" at the end of this entry. **In 15.0.0, the web path and the generated agent layer are ready; native (iOS/Android) onboarding is not supported yet** (see "Known limitations").

### Breaking

- **`init` no longer copies `.kiro/agents/`, `.kiro/steering/`, `governance/`, `src/types` or `src/components/core` into your repo.** It creates an empty `src/components/` for your own components and generates DesignerPunk's agent layer for one target (see "Added"). Token types are imported from `@3fn/core/types`; DesignerPunk's own components stay in the package. The MCP servers serve DesignerPunk's docs from the installed package.
- **`src/` no longer ships wholesale.** The package ships only the source files it still needs: the token source `init` copies, the files that token source imports, the iOS and Android component and blend sources, and a small declared set of styles, fonts and component metadata.
- **No longer in the package: `designerpunk.config.ts`, `product-template/`, the steward agent prompts (`.kiro/agents/`), and the full `.kiro/steering/` folder.** In place of the steering folder the package ships, by name, the eight identity documents the generated agent layer reads.
- **The Inter font is removed: `@3fn/core/fonts/inter.css` no longer resolves**, and the Inter font files no longer ship. Drop the import, or use `@3fn/core/fonts/rajdhani.css`, `figtree.css` or `commit-mono.css`.
- **Four semantic colours are no longer in the iOS and Android base token files** (`dist/DesignTokens.ios.swift`, `dist/DesignTokens.android.kt`): `colorFeedbackSuccessText`, `colorTextDefault`, `colorTextMuted`, `colorTextSubtle` (Kotlin: `color_feedback_success_text`, `color_text_default`, `color_text_muted`, `color_text_subtle`). Their dark-mode values were corrected for contrast, which makes them theme-varying, and the native files do not emit theme-varying colours (see "Known limitations"). If your native code references them, keep your 14.1.0 values for these four. The web CSS still carries all four.
- **`init` now refuses to run against a born, partial, or package-mode repository**, printing a named error instead of silently re-copying or half-copying files. `--re-scaffold` lists every file it would re-add before writing anything.
- **`generate` now refuses to run in a half-set-up repo** (for example, a config file whose `tokenSource` points at no token tree), printing a named error that says what is missing, instead of guessing from the current directory.
- **`sync` no longer refreshes your token tier, your `src/types`, or your pre-existing component copies.** Once `init` has copied your tokens into your repo, they are yours — DesignerPunk's own token updates never flow back into them again. `sync` now manages only what DesignerPunk itself still owns: its MCP configuration keys, and the generated agent files for the targets you have attached.
- **`sync --force` and `--accept-all` are retired** (they print a notice and are ignored). `sync` now prints its full report before changing anything: run from a script or CI (no terminal), it writes nothing unless you pass `--apply`; at a terminal it asks once. A file you edited is overwritten only with `--overwrite <path>`, and a file you deleted is restored only with `--restore <path>`.
- **The sync manifest moved** from `.kiro/sync-manifest.json` to `designerpunk.manifest.json` at the repo root. `sync` converts the old file and leaves a one-line pointer in it for this release. Commit the new file.
- **A `tsconfig.test.json` written by an earlier `init` no longer resolves**: it pinned `@3fn/core` subpaths to raw `src/` files, several of which no longer ship. `sync` offers `--repair-tsconfig` to remove just those entries (and `--repair-npmrc` for an old `.npmrc` GitHub Packages pin).
- **Component-copy migration, opt-in**: if you installed before this release, `sync --migrate-components` judges each of your existing component copies against what DesignerPunk actually shipped in each version up to the one you have installed, and can relocate your own edits and remove copies you never touched. Nothing changes without the flag; undecidable cases are reported as "cannot tell" with an explanation, never guessed.

### Added

- **A generated agent layer.** `init` generates DesignerPunk's agents for your agent tool instead of copying prompt files into your repo. It generates the agent definitions, the always-loaded identity files, and the MCP configuration and approvals, for one target: Claude Code (`--target=cc`, the default) or Kiro (`--target=kiro`).
- **`npx designerpunk attach --target=<cc|kiro>`** adds a target to a repo: a second agent tool, or a repo that `init` did not create. **`attach --reference`** sets up only the MCP configuration and approvals. Use it to read DesignerPunk's docs and components without setting up a design system.
- **`sync --migrate-legacy`**, offered only together with `attach`. It removes the agent, steering and governance files that an earlier `init` copied into your repo, then attaches the generated layer, in the same run. Copies you edited stay on disk as yours and are no longer tracked. Nothing changes unless you pass the flag.
- **Generation warns instead of failing when the installed package is missing a member.** If a document, identity file or tool that an agent expects is missing from the installed package, that agent is generated without it. A warning names what is missing and ends: "If a clean reinstall (remove node_modules, then npm install) does not restore it, the package you installed does not contain it." The command still exits 0.
- **The generator ships compiled** (`dist/generator/`), so generating agents needs no TypeScript runtime.
- **`generate` warns about a `tokens.ts` / `*.tokens.ts` file that exports no `defineComponentTokens` value** — usually a plain reference map that should not wear that filename.
- **`@3fn/core/types` exports the `Oklch` type.**
- **The application MCP server indexes your own `src/components/` alongside DesignerPunk's**, and reindexes when your components change. Its `get_token_details` gains a `themeResolutions.dark` field.

### Changed

- **`sync` keeps the generated agent files up to date** for the targets you have attached.
- **`sync`'s MCP-key management is now key-grained, not whole-file.** A config key DesignerPunk owns (in `.kiro/settings/mcp.json`, `.mcp.json`, or `.claude/settings.json`) is compared by its parsed value, so your own keys and rules living in the same file are left untouched. If none of DesignerPunk's keys changed, the file isn't rewritten at all.
- **Both harnesses' MCP scaffolds (Kiro and Claude Code) now auto-approve exactly the tools each server marks read-only** — generated at build time from each server's own tool registrations, not a hand-maintained list. (The previous static list was already out of date: it was missing an approval for the main discovery tool and had one for a tool no server provides.) An existing install is not corrected automatically: if `sync` lists an approval under "Removed from package", it leaves it in place — remove it yourself.
- **A third MCP server entry, `designerpunk-product`, is now scaffolded** alongside the existing docs and application servers.
- **`sync` now reports two new seams instead of silently drifting**: a *name contract* (which token names DesignerPunk's web components reference, checked against your own generated web CSS) and a *type contract* (what changed in the public token type surface since your last sync). Neither writes your tokens for you — they tell you what to look at.
- **The Integration Guide** now teaches `attach` in its "Set up agent prompts" step, says plainly that native onboarding is not supported in this version, distinguishes DesignerPunk's base web CSS from your own generated CSS, and points its "Upgrading" section at this release's upgrade path.
- **The published tarball is meaningfully smaller** (about 6.4MB packed, down from about 8.4MB in 14.1.0).

### Fixed

- **DTCG and Figma exports now read the same OKLCH colour source as CSS, Swift and Kotlin**, resolving the colour divergence disclosed as a known issue in 14.1.0; dark-mode values now reach the Figma export.
- **Contrast corrections (WCAG AA)**: `color.feedback.success.text` (green500 light, green300 dark) and the dark-mode text hierarchy (`color.text.default`, `.muted`, `.subtle`). In an existing install, the light-mode change is in the token source, so it does not reach the token tier you already copied. The dark-mode and WCAG values come from the installed package on your next `generate`, so an existing install picks those up.
- **`generate` no longer crashes with a stack trace when one of your component-token files declares a token in the wrong family's `defineComponentTokens()` call.** It stops with one message that names the file and the fix, and writes nothing.
- **`sync`'s suggested fix for an old `MCP_STEERING_DIR` value now points at the installed package's docs** (`./node_modules/@3fn/core/governance`). For the value an earlier `init` wrote, it used to suggest `./governance`, a folder a consumer repo does not have. The "already has an entry" advice now names `attach`, not `init`.
- Container-Base and Input-Text referenced CSS variables that did not exist; they now resolve. The Input-Text-Password visibility toggle now has a hover state.
- Button-VerticalList-Item no longer throws when `.disabled` is set (the value is ignored), and Input-Radio-Base ignores a consumer-set `disabled` so it can no longer drop its value from form submission — consistent with 14.0.0's no-disabled-states rule.
- The published browser bundles (`designerpunk.esm.js`, `designerpunk.umd.js`) no longer embed the publishing machine's filesystem path in an internal module comment — a build-machine-identity leak with no functional effect on consumers, now removed.
- Removed four unused `Input-Text-*` browser-build files (`InputTextBase.browser.ts`, `InputTextEmail.browser.ts`, `InputTextPassword.browser.ts`, `InputTextPhoneNumber.browser.ts`, and their compiled `.js`/`.d.ts` output) from the package. They were never imported by the shipped bundle or by any documented usage path; removing them has no effect on any documented integration.

### Known limitations

- **Native (iOS/Android) onboarding is not supported in 15.0.0.** DesignerPunk's iOS and Android components read a theme surface that neither the package's token files nor your own `generate` emits in this version, so copying the native files does not yield a compiling target.
- **The iOS and Android token files do not emit theme-varying colours**, neither as constants nor through a theme type. Fourteen semantic colours are affected (among them `colorActionPrimary` and `colorStructureCanvas`), including the four listed under "Breaking"; ten of them were already missing in 14.1.0.
- **A theme you register in `designerpunk.config.ts` is not emitted yet, on any platform.** No `[data-theme="<name>"]` block is generated for web, and no theme structs or instances for iOS/Android. The web CSS carries DesignerPunk's base light/dark values and the built-in `data-theme="wcag"` block.
- **In a consumer repo, the application MCP's health check reports `degraded`**, with one "companion path not found: governance/Component-Family-….md" warning per component family. Component and token queries still answer; the companion docs are served by the docs MCP.
- **`--migrate-components` reports every copy as "cannot tell" when your registry access fails** (for example, an `.npmrc` pin to GitHub Packages with an expired token), including the version you have installed.
- **`sync --migrate-legacy` does not set up your personal note.** See step 4 of "Upgrading from 14.x".

### Upgrading from 14.x

1. `npm install @3fn/core@15.0.0`
2. `npx designerpunk sync` — review the report. Nothing is written before it prints.
3. `npx designerpunk sync --migrate-legacy --target=cc` (or `--target=kiro`), adding `--repair-tsconfig`, `--repair-npmrc` or `--migrate-components` if the report offers them. This converts the manifest, removes the copies you never edited, and generates the agent layer, in one run.
4. Create `.designerpunk/personal-note.local.md` (who you are and how you want to be worked with). Your agents read it every session; the migration does not create it.
5. Run `npx designerpunk generate`. If it stops on a component-token file an earlier `init` copied (`src/tokens/component/progress.ts` or `src/components/core/Button-Icon/buttonIcon.tokens.ts`), use the fix its message names: split the file's `defineComponentTokens()` into one call per family; or, for the `src/tokens/` file, replace it with the package's version and change its `'../../build/tokens'` import to `'@3fn/core/build'`; or, for an unedited `src/components/core/` copy, delete it.
6. Restart your agent session, then run `npx designerpunk sync` once more to review.
