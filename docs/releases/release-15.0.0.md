# Release 15.0.0

**Date**: 2026-10-02
**Previous**: 14.1.0
**Bump**: major

> **Authorship note (recorded, not buried)**: these notes are HAND-AUTHORED from the merged delta (`v14.1.0..main`), per the post-Q6 convention used for 14.0.0 and 14.1.0. No release tool was involved. This one release contains what was planned as two: Spec 123's "Release 1" (the distribution substrate) and "Release 2" (the generated agent layer). Peter ruled on 2026-10-02 to ship them together as one major. The major bump has three independent causes: a removed `exports` subpath, removed shipped files on paths the docs used to teach, and CLI commands that now refuse states they used to accept. The upgrade path below was rehearsed twice on a copy of a real pre-123 consumer repo, from a fresh-clone packed tarball; what that rehearsal found is in these notes.

**Scope of this release, plainly**: the **web** path and the **generated agent layer** (Claude Code and Kiro) are ready. **Native (iOS/Android) onboarding is not supported in 15.0.0** (see Known limitations).

## 🔴 Breaking: read this first if you run 14.x

**What changes when you upgrade.** DesignerPunk now treats the repo that `init` created as **yours**:
- Your tokens are your own copy. Package updates no longer flow into them.
- DesignerPunk's agents are **generated** for your agent tool, not copied into your repo.
- Everything else DesignerPunk needs is read from the installed package.

### Upgrading an existing 14.x install (one hop)

1. **Install**: `npm install @3fn/core@15.0.0`.
2. **Review**: `npx designerpunk sync` (add `--dry-run` if you only want to look). Nothing is written before the report prints. The report lists:
   - the agent, steering and governance files an earlier `init` copied into your repo ("Legacy copies from an earlier init");
   - any old component copies ("Migrating from a pre-123 install");
   - any repairs on offer;
   - the name-contract check of your own web tokens.
3. **Migrate, in one run**: `npx designerpunk sync --migrate-legacy --target=cc` (or `--target=kiro`). Add any offered repair flags to the same command:
   - `--repair-tsconfig` if the report says `tsconfig.test.json` pins `@3fn/core` subpaths to raw `src/`;
   - `--repair-npmrc` if it names your `.npmrc` GitHub Packages pin;
   - `--migrate-components` if you want your old component copies moved or removed.

   This run does four things:
   - converts your `.kiro/sync-manifest.json` into the new root `designerpunk.manifest.json` (the old file keeps a one-line pointer for this release);
   - removes the copies you never edited, keeps any you edited on disk as yours, and stops tracking them;
   - generates the agent layer for that target;
   - records the target as attached.

   **Nothing is removed if the attach step cannot run.** You get a message saying why.

   If `sync` offers to update `MCP_STEERING_DIR`, accept: it now recommends `./node_modules/@3fn/core/governance`, the installed package's docs.
4. **Create your personal note**: `.designerpunk/personal-note.local.md` — who you are and how you want to be worked with. Your generated agents read it every session. `init` reminds a new repo to fill it in; **the migration does not create it or remind you** (tracked, see Known limitations). If you had edited the old copied `.kiro/steering/Personal Note.md`, the migration kept it on disk, and you can move its content across.
5. **Generate**: `npx designerpunk generate`. **It may stop on one of two files an earlier `init` copied**, `src/tokens/component/progress.ts` and `src/components/core/Button-Icon/buttonIcon.tokens.ts`. Both are in the single-family form that 14.1.0's `defineComponentTokens` family guard rejects, and since your token tier is now yours, `sync` neither updates nor flags them. `generate` stops with one message naming the file. The fixes that work, as that message states them:
   - **any such file**: split its `defineComponentTokens()` into one call per token family;
   - **the copied `src/tokens/component/progress.ts`**: or replace it with the package's version at `node_modules/@3fn/core/src/tokens/component/progress.ts` **and** change its `'../../build/tokens'` import to `'@3fn/core/build'` (a verbatim copy fails to load);
   - **an unedited `src/components/core/` copy** such as `buttonIcon.tokens.ts`: or delete it. The package ships no source for it to re-copy, and deleting it also removes that component's tokens from your generated `ComponentTokens.*` files.

   In the rehearsal, each file needed one such fix, after which `generate` ran green on all three platforms.
6. **Restart your agent session** so it picks up the agents and MCP servers. Then run `npx designerpunk sync` once more to review the migrated repo.

The Integration Guide's § "Upgrading" still describes the pre-15.0.0 flow and carries a dated pointer to these notes; **for upgrading, these notes are authoritative.**

### The breaking list

- **`init` no longer copies `.kiro/agents/`, `.kiro/steering/`, `governance/`, `src/types` or `src/components/core` into your repo.**
  - It creates an empty `src/components/` for your own components.
  - It generates the agent layer for one target: Claude Code (`--target=cc`, the default) or Kiro (`--target=kiro`).
  - Token types come from `@3fn/core/types`. DesignerPunk's own components stay in the package.
- **`src/` no longer ships wholesale.** The package ships only what it still needs:
  - the token source `init` copies, and the files it imports;
  - the iOS and Android component and blend sources;
  - a small declared set of styles, fonts and component metadata.
- **No longer in the package**:
  - `designerpunk.config.ts`;
  - `product-template/` (including the `agents/*-prompt.md` files the 14.x Integration Guide told you to copy; `attach` replaces them);
  - the steward agent prompts (`.kiro/agents/`);
  - the full `.kiro/steering/` folder. Only the eight identity documents the generated layer reads ship now, by name.
- **The Inter font is gone.**
  - **`@3fn/core/fonts/inter.css` no longer resolves**, and the Inter files no longer ship. The 14.x Integration Guide listed it as legacy and deprecated.
  - **Migration**: drop the import, or use `@3fn/core/fonts/rajdhani.css`, `figtree.css` or `commit-mono.css`.
- **Four semantic colours are missing from the iOS and Android base token files** (`dist/DesignTokens.ios.swift`, `dist/DesignTokens.android.kt`):
  - Swift: `colorFeedbackSuccessText`, `colorTextDefault`, `colorTextMuted`, `colorTextSubtle`;
  - Kotlin: `color_feedback_success_text`, `color_text_default`, `color_text_muted`, `color_text_subtle`.
  - **Why**: their dark-mode values were corrected for WCAG AA contrast, which made them theme-varying. Theme-varying colours are left out of the native files' static constants, and nothing emits the theme surface that would carry them (see Known limitations). Your own `generate` omits them the same way.
  - **Who is affected**: native code that copied these files and referenced those names will not compile.
  - **What to do**: keep your 14.1.0 values for these four. The web CSS is unaffected: it carries all four, with `light-dark()` values.
- **`init` refuses to run against a born, partial or package-mode repository** and prints a named error, instead of silently re-copying or half-copying. `--re-scaffold` lists every file it would re-add before writing anything.
- **`generate` refuses to run in a half-set-up repo** (for example, a config whose `tokenSource` points at no token tree) and prints a named error that says what is missing.
- **`sync` no longer touches your token tier, your `src/types` or your old component copies.** It manages only what DesignerPunk owns:
  - its MCP configuration keys;
  - the generated agent files for the targets you attached.
- **`sync --force` and `--accept-all` are retired.** They print a notice and are ignored.
  - `sync` prints its whole report before changing anything.
  - Run without a terminal, it writes nothing unless you pass `--apply`. At a terminal it asks once.
  - A file you edited is overwritten only with `--overwrite <path>`; a file you deleted is restored only with `--restore <path>`.
- **The sync manifest moved** from `.kiro/sync-manifest.json` to `designerpunk.manifest.json` at the repo root. `sync` converts it, and you commit the new file.
- **A 14.x `tsconfig.test.json` stops resolving.** It pinned `@3fn/core/*` subpaths to raw `src/` files, several of which no longer ship. `sync --repair-tsconfig` removes those entries.

## 🟡 New

- **A generated agent layer.** `init` and `attach` generate DesignerPunk's agents, the always-loaded identity files, and the MCP configuration and approvals, for Claude Code or Kiro.
- **`npx designerpunk attach --target=<cc|kiro>`** adds a target to a repo: a second agent tool, or a repo `init` did not create. **`attach --reference`** sets up the MCP configuration and approvals only. Use it to read DesignerPunk's docs and components without becoming a DesignerPunk design system.
- **`sync --migrate-legacy`** (offered only together with `attach`) removes what an earlier `init` copied and attaches the generated layer in the same run.
- **The degradation warning.** If a document, identity file or tool an agent expects is missing from the installed package, that agent is generated without it. A warning names what is missing and ends: "If a clean reinstall (remove node_modules, then npm install) does not restore it, the package you installed does not contain it." The command still exits 0.
- **The generator ships compiled** (`dist/generator/`), so generating agents needs no TypeScript runtime.
- **`sync` manages MCP configuration per key**, not per file. In `.kiro/settings/mcp.json`, `.mcp.json` and `.claude/settings.json`, your own keys and rules are left alone, and a file whose DesignerPunk keys did not change is not rewritten.
- **MCP approvals are generated.** Both scaffolds auto-approve exactly the tools each server marks read-only, from the servers' own registrations.
  - The 14.x list was wrong both ways: it missed `find_docs` and approved a tool no server has.
  - **An existing install is not corrected automatically.** If `sync` lists an approval under "Removed from package", it leaves it in place: remove it yourself.
- **A third MCP server entry**, `designerpunk-product`, is scaffolded.
- **Two new `sync` reports:**
  - the *name contract*: which token names DesignerPunk's web components reference, checked against your generated web CSS;
  - the *type contract*: what changed in the public token types since your last sync.

  Neither one writes your tokens.
- **The harvest-zero lint.** `generate` warns when a `tokens.ts` / `*.tokens.ts` file you wrote exports no `defineComponentTokens` value.
- **`@3fn/core/types` exports `Oklch`.**
- **The application MCP** indexes your own `src/components/` alongside DesignerPunk's, reindexes live when your components change, and adds a `themeResolutions.dark` field to `get_token_details`.
- **Served docs**: a token-documentation accuracy pass (88 corrections across 13 token-family and governance docs), served through the docs MCP.
- **The Integration Guide tells the truth for 15.0.0** (ballot `2026-10-02-integration-guide-native-scoping`): native onboarding is stated as not supported in this version; `@3fn/core/tokens.css` is described as DesignerPunk's base (the zero-config evaluation path), to be replaced by your own generated `DesignTokens.web.css` after `generate`, with `@3fn/core/component-tokens.css` kept on every path; custom themes are stated as not yet emitted; the removed Inter import is gone from its imports table; and its § "Upgrading" points here.

## 🔵 Fixes

- **DTCG/Figma export colours now match the platforms.** This resolves 14.1.0's disclosed known issue: `DesignTokens.dtcg.json` and `DesignTokens.figma.json` read the OKLCH source, and dark-mode values reach Figma.
- **WCAG AA contrast**: `color.feedback.success.text` (green500 light, green300 dark) and the dark text hierarchy (`color.text.default/muted/subtle` → white100/white300/white500).
  - Visible in the web CSS.
  - **In an existing install**: the **light** value change lives in the semantic token source, so it does not reach the token tier you already copied. The **dark and WCAG** values come from the installed package on your next `generate` (`generateTokenFiles` uses the package's own `dark`/`wcag`/`dark-wcag` overrides, not your copied tier's), so an existing install picks up the dark-mode corrections without touching its tier. *Measured on the rehearsal consumer's `generate` output: `--color-text-default`'s dark value is `oklch(1 0 260)` and `--color-feedback-success-text`'s is `oklch(0.78 0.208 154)`, matching the package, while the success text's light value stayed the copied tier's.*
- **`generate` no longer crashes with "Unexpected error" and a stack trace** when a component-token file fails the `defineComponentTokens` family guard. It stops with one catalogued message that names the file, carries the guard's own explanation and the fixes that work, and writes nothing.
- **`sync`'s `MCP_STEERING_DIR` suggestion is fixed.** For the bare `./.kiro/steering` value an earlier `init` wrote, it used to recommend `./governance`, a folder a consumer repo does not have; accepting it (the default at a terminal) left the docs MCP indexing nothing. It now recommends the package's `./node_modules/@3fn/core/governance`. The "already has an entry" advice from `attach` now names `attach --target=<t>`, not `init`.
- Container-Base and Input-Text referenced CSS variables that did not exist; they now resolve. The Input-Text-Password toggle has a hover state.
- Button-VerticalList-Item no longer throws when `.disabled` is set; the value is ignored. Input-Radio-Base ignores a consumer-set `disabled`, so the value is no longer dropped from form submission. This matches the no-disabled-states rule from 14.0.0.
- The published browser bundles no longer embed the build machine's filesystem path.
- Four unused `Input-Text-*` browser-build files were removed from the package.
- **The package is smaller**: about 6.4MB packed, down from about 8.4MB for 14.1.0.

## ⚠️ Known limitations (disclosed, tracked)

- **Native (iOS/Android) onboarding is not supported in 15.0.0.** DesignerPunk's iOS and Android components read a theme surface (`@Environment(\.dpTheme)`, `LocalDPTheme.current`) that neither the package's token files nor your own `generate` emits in this version. Copying the native files into an Xcode project or Android module does not yield a compiling target. The Integration Guide says so. Tracked: `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` (the next planned work) and `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`.
- **Native theme-varying colours.** The iOS/Android token files omit the **14 theme-varying semantic colours** (among them `colorActionPrimary` and `colorStructureCanvas`). Ten were already missing in 14.1.0; four are new in 15.0.0 (listed under Breaking). No shipped or generated file supplies any of the fourteen to native code.
- **Custom themes are not emitted yet, on any platform.** A theme you register in `designerpunk.config.ts` is listed by `generate` but does not change its output: no `[data-theme="<name>"]` block for web, no theme structs or instances for iOS/Android. What the web CSS does carry is DesignerPunk's base light/dark values (through `light-dark()`) and the built-in `data-theme="wcag"` block.
- **Your `generate` takes its dark-mode and WCAG values from the installed package**, not from your copied token tier (see the contrast fix above). That is how existing installs receive the dark-mode corrections; it also means those values follow the package version you install. Tracked as the completeness spec's line (vi).
- **The application MCP reports `degraded` in a consumer repo.** Its health check lists one warning per component family, "companion path not found: governance/Component-Family-….md", because it looks for the family docs under your repo rather than the installed package. Component and token queries still answer (34 components and the full token index, in the rehearsal); the family docs themselves are served by the docs MCP. *Not yet in a tracked issue file at this writing.*
- **Copied component-token files are not detected by `sync`.** The two files in upgrade step 5 are reported only when `generate` stops on them. Migration-side detection is tracked: `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` (R1).
- **`--migrate-components` reports every copy as "cannot tell" when your registry access fails** — for example, an `.npmrc` that pins `@3fn` to GitHub Packages with an expired token. It does so even for the version you have installed. Tracked: same file (R2).
- **The migration does not set up the personal note** (upgrade step 4). Tracked: same file (R3).
- **The Integration Guide's § "Upgrading"** still describes the pre-15.0.0 `sync` flow under a dated pointer to these notes, and its § "Native Platform Sync — Target Model (M0b)" describes a target model, not a shipped command. Both are reconciled by Spec 123 Task 19.4.
- **The re-grounding check's findings.** G2's pass-four findings on the consumer profile's derivation check are tracked at `.kiro/issues/2026-10-02-g2-pass-four-findings.md`.
- **The derivation check's application limit**, as Spec 123's acceptance table states it (`task-18-completion.md` § "24.3 acceptance table"): a pass does not establish "that the derivation check is applied to the committed consumer rendering (at C0, `checkDerivation` has no importer outside `tools/agent-generator/__tests__/`; those tests read real canonical sources, the renderings and dispositions they check come from test fixtures, and none reads `canonical/_consumer-output/`)".

## 🔵 Internal (provenance, not consumer surface)

- **Spec 123's machinery behind the generated layer**: the splitter, spans and dispositions; operative sets; the G1 and G2 gates; owner signatures. It ships only as its compiled output.
- **The shipped token index's `meta.json` stores its theme-tier path relative to the index** (`../src/tokens`), not as the build machine's absolute path. The defect was new in this release cycle and fixed before the tag; the file is now committed, so the pre-publish `verify:token-index-clean` gate covers it.
- **Governance law ratified this cycle**:
  - the completion-claims integrity law (Spec 127);
  - counter-argument fold-back;
  - orchestrator consult-first;
  - the tasks-row and issue-row write-scope grants;
  - the instrument-existence check;
  - the signing-act chain;
  - the CI-regime standing scope.

  Several of these change the text of the eight shipped identity documents.
- Publish verification is now a committed step (`scripts/verify-publish-rail.sh`, RELEASE-FLOW step 6).
- This release is published under three manual guards (fresh-clone publish; packed-contents listing with scripts on; native-member diff against 14.1.0), per Peter's 2026-10-02 ruling in `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`. A mechanical publish-time check replaces them from the next release.
- Dead iOS/Web/Android build paths were swept.
