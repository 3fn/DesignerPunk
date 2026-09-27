# Changelog

All notable consumer-facing changes to `@3fn/core` are recorded here, one entry per release, in plain language for the people who install this package. Internal-only changes (governance, test infrastructure, spec process) are not listed — see this repository's release history (https://github.com/3fn/DesignerPunk/releases) for the full hand-authored delta if you need that detail.

This file starts with Spec 123 ("Consumer Distribution"). Earlier releases are not backfilled here.

## [Unreleased] — planned Release 1 (substrate & packaging truth)

**This is a breaking (major) release for anyone already running an earlier `@3fn/core`.** The exact version number is assigned at release-prep, following this project's internal release process; the changes below are what will ship in it.

### Breaking

- **`src/` no longer ships wholesale.** The package now ships only the source files it still needs: the token source `init` copies into your repo, the files that token source imports, the iOS and Android component sources, and a small declared set of styles, fonts and component metadata. **`init` no longer copies `src/types` or `src/components/core` into a repo.** It creates an empty `src/components/` for your own components; token types are imported from `@3fn/core/types`, and DesignerPunk's own components stay in the package.
- **`designerpunk.config.ts` no longer ships in the package.**
- **`init` now refuses to run against a born, partial, or package-mode repository**, printing a named error instead of silently re-copying or half-copying files. `--re-scaffold` lists every file it would re-add before writing anything.
- **`generate` now refuses to run in a half-set-up repo** (for example, a config file whose `tokenSource` points at no token tree), printing a named error that says what is missing, instead of guessing from the current directory.
- **`sync` no longer refreshes your token tier, your `src/types`, or your pre-existing component copies.** Once `init` has copied your tokens into your repo, they are yours — DesignerPunk's own token updates never flow back into them again. `sync` now manages only what DesignerPunk itself still owns: its MCP configuration keys, and, for now, the copied agent/steering/governance files (see "Retained for now" below).
- **`sync --force` and `--accept-all` are retired** (they print a notice and are ignored). `sync` now prints its full report before changing anything: run from a script or CI (no terminal), it writes nothing unless you pass `--apply`; at a terminal it asks once. A file you edited is overwritten only with `--overwrite <path>`, and a file you deleted is restored only with `--restore <path>`.
- **Component-copy migration, opt-in**: if you installed before this release, `sync --migrate-components` judges each of your existing component copies against what DesignerPunk actually shipped in each version up to the one you have installed, and can relocate your own edits and remove copies you never touched. Nothing changes without the flag; undecidable cases are reported as "cannot tell" with an explanation, never guessed.

### Changed

- **`sync`'s MCP-key management is now key-grained, not whole-file.** A config key DesignerPunk owns (in `.kiro/settings/mcp.json`, `.mcp.json`, or `.claude/settings.json`) is compared by its parsed value, so your own keys and rules living in the same file are left untouched. If none of DesignerPunk's keys changed, the file isn't rewritten at all.
- **Both harnesses' MCP scaffolds (Kiro and Claude Code) now auto-approve exactly the tools each server marks read-only** — generated at build time from each server's own tool registrations, not a hand-maintained list. (The previous static list was already out of date: it was missing an approval for the main discovery tool and had one for a tool no server provides.) An existing install is not corrected automatically: if `sync` lists an approval under "Removed from package", it leaves it in place — remove it yourself.
- **A third MCP server entry, `designerpunk-product`, is now scaffolded** alongside the existing docs and application servers.
- **`sync` now reports two new seams instead of silently drifting**: a *name contract* (which token names DesignerPunk's web components reference, checked against your own generated web CSS) and a *type contract* (what changed in the public token type surface since your last sync). Neither writes your tokens for you — they tell you what to look at.
- **The published tarball is meaningfully smaller** (about 5.9MB packed, down from about 8.4MB in the last published release) — the wholesale `src/` tree, `product-template/`, and `designerpunk.config.ts` are gone; what remains of `src/` is an explicit list, checked against the files it actually imports. *(This figure is re-measured at release-prep — packaging work continues right up to release 1.)*

### Retained for now

- Copied agent, steering, and governance files (`.kiro/agents/`, `.kiro/steering/`, `governance/`) are still copied wholesale by `init` and still managed by `sync` in this release, unchanged from before. Their move to a generated, per-consumer profile is planned for a later release — this release's `sync` migration report says so explicitly and does not offer to remove them yet.

### Fixed

- The published browser bundles (`designerpunk.esm.js`, `designerpunk.umd.js`) no longer embed the publishing machine's filesystem path in an internal module comment — a build-machine-identity leak with no functional effect on consumers, now removed.
- Removed four unused `Input-Text-*` browser-build files (`InputTextBase.browser.ts`, `InputTextEmail.browser.ts`, `InputTextPassword.browser.ts`, `InputTextPhoneNumber.browser.ts`, and their compiled `.js`/`.d.ts` output) from the package. They were never imported by the shipped bundle or by any documented usage path; removing them has no effect on any documented integration.
