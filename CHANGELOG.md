# Changelog

All notable consumer-facing changes to `@3fn/core` are recorded here, one entry per release, in plain language for the people who install this package. Internal-only changes (governance, test infrastructure, spec process) are not listed — see `docs/releases/` for the full hand-authored delta if you need that detail.

This file starts with Spec 123 ("Consumer Distribution"). Earlier releases are not backfilled here.

## [Unreleased] — planned Release 1 (substrate & packaging truth)

**This is a breaking (major) release for anyone already running an earlier `@3fn/core`.** The exact version number is assigned at release-prep (see `.kiro/hooks/RELEASE-FLOW.md`); the changes below are what will ship in it.

### Breaking

- **The package no longer ships your authoring surface.** `src/` used to ship wholesale; it now ships only the pieces DesignerPunk itself needs at build/runtime (the token pipeline, platform closures, and a small declared floor). Your own component and type source is created by `init`, once, in your own repo — it is not re-shipped by the package on every install.
- **`designerpunk.config.ts` no longer ships in the package.**
- **`init` now refuses to run against a born, partial, or package-mode repository**, printing a named error instead of silently re-copying or half-copying files. `--re-scaffold` lists every file it would re-add before writing anything.
- **`sync` no longer refreshes your token tier, your `src/types`, or your pre-existing component copies.** Once `init` has copied your tokens into your repo, they are yours — DesignerPunk's own token updates never flow back into them again. `sync` now manages only what DesignerPunk itself still owns: its MCP configuration keys, and — for this release only — the copied agent/steering/governance files (see "Retained for now" below).
- **Component-copy migration, opt-in**: if you installed before this release, `sync --migrate-components` judges each of your existing component copies against what your installed version actually shipped (using your own npm setup to fetch it), and can relocate your own edits and remove copies you never touched. Nothing changes without the flag; undecidable cases are reported as "cannot tell" with an explanation, never guessed.

### Changed

- **`sync`'s MCP-key management is now key-grained, not whole-file.** A config key DesignerPunk owns (in `.kiro/settings/mcp.json`, `.mcp.json`, or `.claude/settings.json`) is compared by its parsed value, so your own keys and rules living in the same file are left untouched. If none of DesignerPunk's keys changed, the file isn't rewritten at all.
- **Both harnesses' MCP scaffolds (Kiro and Claude Code) now auto-approve exactly the tools each server marks read-only** — generated at build time from each server's own tool registrations, not a hand-maintained list. (The previous static list was already out of date: it was missing an approval for the main discovery tool and had one for a tool that no longer exists.)
- **A third MCP server entry, `designerpunk-product`, is now scaffolded** alongside the existing docs and application servers.
- **`sync` now reports two new seams instead of silently drifting**: a *name contract* (which token names your components reference, checked against your own generated CSS) and a *type contract* (what changed in the public token type surface since your last sync). Neither writes your tokens for you — they tell you what to look at.
- **The published tarball is meaningfully smaller** (roughly 5.9MB packed, down from 7.3MB) — the wholesale `src/` tree, `product-template/`, and `designerpunk.config.ts` are gone; what remains is an explicit, closure-verified list.

### Retained for now

- Copied agent, steering, and governance files (`.kiro/agents/`, `.kiro/steering/`, `governance/`) are still copied wholesale by `init` and still managed by `sync` in this release, unchanged from before. Their move to a generated, per-consumer profile is planned for a later release — this release's `sync` migration report says so explicitly and does not offer to remove them yet.

### Fixed

- The published browser bundles (`designerpunk.esm.js`, `designerpunk.umd.js`) no longer embed the publishing machine's filesystem path in an internal module comment — a build-machine-identity leak with no functional effect on consumers, now removed.
- Removed four unused `Input-Text-*` browser-build files (`InputTextBase.browser.ts`, `InputTextEmail.browser.ts`, `InputTextPassword.browser.ts`, `InputTextPhoneNumber.browser.ts`, and their compiled `.js`/`.d.ts` output) from the package. They were never imported by the shipped bundle or by any documented usage path; removing them has no effect on any documented integration.

### Publishing

- Every release from this one forward is verified live on `registry.npmjs.org` — including the tarball's actual host — before it is announced, by a committed script (`scripts/verify-publish-rail.sh`) that is now a mandatory step in the release process rather than a manual instruction. GitHub Packages continues to receive a mirrored publish for internal reasons; it is not, and will not be, referenced in anything you install from.
