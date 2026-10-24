> **Provenance (Spec 131 evidence, header added by Thurgood, 2026-10-24).** A side session acting as a consumer ran this on 2026-10-24 on a **scratch copy** of Peter's test01, upgraded from 12.0.5 to **16.0.0** using only the consumer docs. The body below is that session's report, unedited.
> **Not filed.** None of the 14 suggested records is filed here. Fixes route separately to the owners of the CLI (`src/cli/**`, Ada, per ballot `2026-10-17-standing-write-scope-six-roots` § 2.1) and of the consumer onboarding docs. This spec cites the run as evidence only.
> **Artifacts** listed at the end lived in that session's scratchpad. They are not committed and may not survive.

# test01 upgrade rehearsal: 12.0.5 → 16.0.0 (first real-use run of the consumer onboarding docs)

**Date**: 2026-10-24 · **Run by**: a side session acting as a consumer, on a scratch copy only
**Installed**: `@3fn/core@16.0.0` from public npm. It was the `latest` dist-tag at run time; **16.1.0 was not published yet**, so none of its P0 fixes are in this run.
**Real project**: `/Users/3fn/Documents/Work Projects/Kiro/test01` was not modified (status clean, HEAD `1db44a5`). The copy was made without `node_modules`, without `.env`, and with the `.npmrc` auth-token line stripped.
**Guides used**: the package's `README.md`, `docs/consumer/INSTALL.md`, `docs/consumer/COMMIT-POLICY.md`, `governance/DesignerPunk-Integration-Guide.md`, `CHANGELOG.md` (which INSTALL calls "the 15.0.0 release notes"), `npx designerpunk --help`, and the CLI's own output. No DesignerPunk specs, ballots, issues or source were read to work around a problem.
**Environment**: macOS, Node 22.20.0, npm 10.9.3, non-interactive shell (an agent's shell, so no TTY).

## Bottom line

The upgrade **can** be done. It ended with a site that builds and renders identically to the pre-upgrade build (same component sizes, colours, fonts and page height, no console errors), working MCP servers for both harnesses, and 35 of 36 consumer tests passing. The one failing test predates the upgrade.

But it took **six manual repairs that no doc describes**. Three of them were **silent failures**: the CLI reported success or "up to date" while something was broken.

1. The old `.npmrc` registry pin blocks the install. The repair tool for it lives in the version you can't yet install.
2. `--migrate-components` deleted the component copies the site imports, so the build broke.
3. `--migrate-components` relocated the forks without rewriting their relative imports, so `generate` broke.
4. **Silent:** `designerpunk.config.ts` still points `componentTokens` at the deleted folder, so the fork's component tokens dropped from output with no warning.
5. **Silent:** the migrated MCP config keeps stale entries. The docs MCP served 9 of 83 docs, rated its matches "strong", and `sync` said "Everything DesignerPunk manages is up to date".
6. **Silent:** the application MCP's `COMPONENTS_DIR` pointed at the deleted folder, health said "healthy", and it ignored the consumer's forks.

An experienced engineer would get through items 1–4 in roughly an hour with build errors to guide them. Items 5 and 6 never show up as errors. A consumer would only notice when agents start giving thin or wrong answers. That is the "gap between what it says and what it does" pattern this test was meant to probe.

## Steps taken, in order

| # | Step | Doc source | Result |
|---|---|---|---|
| 0 | Read `product/lessons-learned/` and `.kiro/@3fn-core-feedback/` for context | task brief | Prior friction: the v12 upgrade needed manual `cp` because `sync --force` was a no-op off-TTY. 16.0.0 retired `--force` and made off-TTY behaviour explicit, and that fix held in this run. |
| 1 | `npm view @3fn/core` → 16.0.0 latest | — | 16.1.0 not published |
| 2 | Choose a path. test01 is on **12.0.5**. INSTALL covers only "Upgrading from 14.x: follow the 15.0.0 release notes". I used the 14.x recipe, targeting 16.0.0 directly. | INSTALL § 4 "Upgrading from 14.x"; CHANGELOG 15.0.0 "Upgrading from 14.x" | Ambiguous (F-2) |
| 3 | `npm install @3fn/core@16.0.0` | CHANGELOG 14.x step 1 (version substituted); README Getting Started | **E401**: the old `.npmrc` `@3fn:registry=https://npm.pkg.github.com` pin (F-1) |
| 3b | Deleted `.npmrc` (INSTALL prerequisite: "no `.npmrc` and no access token are needed"), re-ran | INSTALL § Prerequisites | Installed in 6 s. `package.json` went from an exact `12.0.5` pin to `^16.0.0` (npm default). |
| 4 | `npx designerpunk sync` (report only, off-TTY) | CHANGELOG 14.x step 2 | Clear and detailed report: legacy copies, component-copy judgement, tsconfig repair, name contract clean. It also says "✅ Everything DesignerPunk manages is up to date" in the same report that lists the pending migrations (F-9). It uses internal jargon: "pre-123", "pre-119-A" (F-10). |
| 5 | Baseline `npm run build` on 16.0.0 before any migration | — | Passed |
| 6 | `sync --migrate-legacy --target=kiro --repair-tsconfig --migrate-components --dry-run`, then `--apply` | CHANGELOG 14.x step 3 ("adding … if the report offers them"); INSTALL § 4 | Applied in one run: 104 legacy copies removed, 1 edited copy kept, 24 component copies removed, 10 relocated to `src/components/<Name>/`, tsconfig repaired, kiro attached (121 files), personal note created. The dry-run named no file it would delete or move (F-3). |
| 7 | `npm run build` | — | **Failed: 6 unresolved imports** (F-3) |
| 7b | Rewrote `src/scripts/components.ts`: fork first, then `import '@3fn/core'`. Removed a deleted-sibling import in a product component. | INSTALL § Platforms › Web; § 9 Ownership | Built. Bundle went from **180.5 KB to 594.5 KB** (F-6). Fork-before-bundle ordering is not documented (F-7). |
| 8 | `npx designerpunk generate` | CHANGELOG 14.x step 5 | Stopped on `src/tokens/component/progress.ts`, **exactly as the doc predicts**, with an actionable message |
| 8b | Replaced it with the package's version and changed the import to `@3fn/core/build` | CHANGELOG 14.x step 5 | `generate` passed. Component tokens went from 35 to 10. The fork's NavHeaderApp tokens dropped with no warning (F-4). |
| 9 | Changed `componentTokens: ['./src/components/core']` to `['./src/components']` | Integration Guide config example | `generate` **stopped**: the relocated fork's `tokens.ts` imports `'../../../tokens/SizingTokens'`. 19 relative imports newly broken across the relocated forks (F-5). |
| 9b | Deleted the 8 forks test01 doesn't use. Fixed the import depth in `Nav-Header-App/tokens.ts` and one test path. | judgement (no doc) | `generate` passed. NavHeaderApp component tokens restored (12). |
| 10 | `generate` reported "Product tokens up-to-date (source unchanged since 6/12/2026)" after a 12→16 upgrade. Ran `generate --force`. | `--help` | Header-only change this time (F-11) |
| 11 | Probed all three MCP servers over stdio with the migrated `.kiro/settings/mcp.json` (stands in for "restart your agent session") | INSTALL § 3 step 5 | **docs: 9 docs indexed (not 83)**, "degraded", matches still rated `strong`. **application: `COMPONENTS_DIR` → deleted folder**, health "healthy", falls back to package components only. autoApprove lists nonexistent tools (`get_documentation_map`, `validate_component`) and lacks `find_docs` (F-8). |
| 11b | Deleted the stale `designerpunk-docs` / `designerpunk-application` entries and re-ran `attach --target=kiro` | the CLI's own warning text | Fixed: docs 83 docs, healthy. Application reads `src/components` first. autoApprove correct. |
| 12 | Added `token-index/` and `.designerpunk/` to `.gitignore` by hand (sync offers this only in a terminal) | COMMIT-POLICY § .gitignore block | OK. `token-index/` was already committed in test01, and nothing says to untrack it (F-12). |
| 13 | `npx designerpunk sync` (review) | CHANGELOG 14.x step 6 | "124 managed items unchanged ✅". Clean, though it can't see F-3/F-4/F-5. |
| 14 | `npx designerpunk attach --target=cc` (second harness) | INSTALL "Adding a second harness" | Clean: `.mcp.json` with correct env, `.claude/settings.json` (40 tools), 8 agents, `CLAUDE.md` managed region, identity docs. Identity docs are consumer-adapted (no internal scripts). |
| 15 | `npx jest` | Integration Guide (jest-preset) | 35/36 pass. The failure (`--nav-glow-color` missing from the fork CSS) predates the upgrade: the fork CSS is byte-identical to the original. |
| 16 | `npx designerpunk validate` | INSTALL § 4 | Exit 1 on "mathematical relationships" only, **exactly as disclosed** |
| 17 | Served the pre-upgrade `_site` and the upgraded `_site` locally and compared them in a browser | — | Visually identical. The measured metrics of `button-cta`, `button-icon`, `icon-base` and `nav-header-app` match exactly, and page height is the same (8466 px). No console errors. All custom elements registered. |

## What worked (credit where due)

- **Public-npm install** works with no token, once the old pin is gone.
- **The `sync` report is genuinely good**: it correctly finds the pre-123 manifest, the legacy copies, the one edited steering doc, the tsconfig pins and the stale `MCP_STEERING_DIR`, and it says what each repair flag does. Off-TTY it wrote nothing without `--apply`, as documented. This directly fixes the v12-era complaint that `sync --force` was a silent no-op.
- **`--migrate-legacy` is a real one-shot**: legacy copies removed, the edited one kept, the manifest converted, the old manifest kept with a note (as INSTALL says), kiro attached, and the personal note created.
- **`generate`'s `progress.ts` stop** matches the doc word for word, and its message gives two working fixes.
- **`attach --target=cc`** on a migrated repo is clean, and the generated MCP config is correct.
- **The re-attach repair** suggested by the CLI warning works.
- **Disclosed limitations were accurate**: `validate`'s failing check, "custom theme registered, not applied" (generate says so at run time), and native not supported.
- **The jest preset** works for consumer tests on 16.0.0.
- **The rendered site is unchanged.**

## Where a doc's claim didn't match what happened

**F-1. The `.npmrc` pin blocks the upgrade, and the documented repair is unreachable.**
- INSTALL § Prerequisites: *"Installs `@3fn/core` from the public npm registry; no `.npmrc` and no access token are needed"*. CHANGELOG 15.0.0: *"`sync` offers … `--repair-npmrc` for an old `.npmrc` GitHub Packages pin"*.
- Result: `npm install @3fn/core@16.0.0` → `E401 … npm.pkg.github.com … authentication token not provided`. `--repair-npmrc` lives in the package version this pin prevents you from installing. Nothing tells an upgrader to delete the pin first.
- Every pre-public-npm consumer has this pin; `init` wrote it.
- **Not tested**: with a *valid* GitHub token the install would go to GitHub Packages. I don't know whether 16.0.0 is published there. If it is not, the error would be a confusing 404 rather than a 401.

**F-2. No upgrade path for anything older than 14.x.**
- INSTALL § 4 and the Integration Guide § Upgrading cover only "Upgrading from 14.x: follow the 15.0.0 release notes". The README's Getting Started doesn't mention upgrading.
- test01 is on 12.0.5. The 14.x recipe happened to work, but the reader has to guess that it applies.
- The recipe also says `npm install @3fn/core@15.0.0`. It doesn't say whether to step through 15.0.0 → 15.1.0 → 16.0.0 or jump straight to latest. I jumped.
- "The 15.0.0 release notes" isn't a file name: it means the CHANGELOG section. The README's version badge links `docs/releases/release-16.0.0.md`, which the package doesn't ship.

**F-3. `--migrate-components` breaks consumer code that imports the copies it removes. The report and dry-run don't warn about it.**
- Report: *"these 24 unmodified copies … shadow package updates — remove them to receive updates"*. The CHANGELOG recipe says to add `--migrate-components` "if the report offers" it, and it did.
- Result: it removed `Button-CTA`, `Button-Icon`, `Badge-Label-Base` and `Icon-Base`, which `src/scripts/components.ts` imports by relative path. `npm run build` failed with 6 unresolved imports.
- The dry-run output is identical to the plain report: it lists no paths to be deleted and no importers.
- Nothing in the docs says what replaces a relative import of a removed copy. The answer is `import '@3fn/core'`, the whole bundle (see F-6).

**F-4. Config `componentTokens` is left pointing at the deleted `src/components/core`, and `generate` doesn't warn.**
- INSTALL § 9: *"To own one component, put your version in your repo's `src/components/`… Yours wins on its name"*. The migration relocated the forks there.
- Result: `designerpunk.config.ts` still says `componentTokens: ['./src/components/core']`. `generate` exited 0 and dropped the fork's NavHeaderApp component tokens; `ComponentTokens.web.css` went from 35 tokens to 10. There was no warning that the configured directory doesn't exist.

**F-5. The `--migrate-components` relocation doesn't rewrite relative imports, and some forks can't be repaired at all.**
- Report: *"relocates modified copies to src/components/<Name>/"*.
- Result: 19 relative imports newly broken (1 was already broken before). Two kinds:
  - **(a) Depth.** The forks moved up one level, so `'../../../tokens/SizingTokens'` now points outside `src/`. `generate` stops on the first one (`Avatar-Base/avatar-sizing.tokens.ts`).
  - **(b) Deleted siblings.** Forks import internals of siblings the same run deleted as "unmodified": `Icon-Base/types`, `Input-Text-Base/{stateManagement,tokens,types}`, `Container-Base`, `Progress-Indicator-Node-Base/types`.
- Kind (b) can't be repaired from the package: its `exports` map blocks deep imports, so `Input-Text-Password`, for example, has no way to reach `Input-Text-Base` internals. I deleted 8 unused forks to get through. A consumer who actually uses those forks is stuck, unless they restore the deleted siblings, and nothing says they may.

**F-6. Whole-bundle only: the site's component bundle grew 3.3×.**
- The INSTALL § Web imports and the Integration Guide § Available Imports offer only `@3fn/core` / `@3fn/core/components` (all 34 components).
- Result: `public/scripts/components.js` went from 180.5 KB to 594.5 KB unminified, for a page that uses 5 components. The package ships `designerpunk.esm.min.js` (252 KB), but the `exports` map points at the unminified file. Nothing documents per-component imports or tree-shaking.

**F-7. "Yours wins on its name" depends on import order, and that's undocumented.**
- INSTALL § 9: *"Yours wins on its name, and every other component continues to come from the package"*.
- On web, both the fork and the bundle guard with `if (!customElements.get(...))`, so whichever registers **first** wins. Import the bundle before your fork and the package silently wins. It worked here only because I imported the fork first.

**F-8. Migration leaves the MCP config stale and `sync` calls it up to date (silent, worst finding).**
- `sync --migrate-legacy` "does what `attach` does", and `attach` prints *"already has 'designerpunk-docs' entry; left unchanged. If it is outdated, delete the entry and re-run"*. The final line still says *"✅ Everything DesignerPunk manages is up to date"*. `--help` says *"MCP servers resolve data paths from the installed package automatically. No configuration needed for default usage."*
- Result with the migrated config:
  - **Docs MCP** indexes `.kiro/steering`, which after migration holds only the 8 identity docs plus 1 kept file: **9 docs, not 83**. `find_docs` still returns `matchConfidence: "strong"` hits, so an agent has no signal that the governance corpus (token governance, component families) is missing.
  - **Application MCP** has `COMPONENTS_DIR=./src/components/core`, a folder the same run deleted. Health says `"healthy"`, it falls back to package components, and **it never sees the consumer's forks**.
  - **Stale autoApprove**: it lists tools no server provides and omits `find_docs`, so in Kiro every discovery call would prompt. CHANGELOG 15.0.0 discloses that *"An existing install is not corrected automatically"*, but only in the CHANGELOG and only for approvals.
- The `MCP_STEERING_DIR` warning *is* printed (with the fix). The `COMPONENTS_DIR` problem gets no specific warning. The final "up to date" line undercuts both.
- Fix that worked: delete both entries, then `attach --target=kiro`.

**F-9. `sync` contradicts itself.**
- The same report lists 104 legacy copies, 24+10 component copies and a tsconfig repair as pending, then ends with "✅ Everything DesignerPunk manages is up to date". It's true only in a narrow sense (managed hashes) and it reads as an all-clear.

**F-10. Internal jargon in consumer-facing CLI output.**
- "pre-123 manifest", "pre-123 component copies", "pre-119-A '.kiro/steering' location". A consumer can't know what spec 123 or 119-A are.

**F-11. The product-token staleness check ignores the package version.**
- Result: after 12.0.5 → 16.0.0, `generate` skipped product tokens as "up-to-date (source unchanged since 6/12/2026)".
- CHANGELOG 15.1.0 says to expect a one-time header change after upgrading. For product tokens that only happens with `--force`.
- Here the forced output differed only in its header. A future generator change would ship stale product output silently.

**F-12. Already-committed `token-index/` isn't handled.**
- COMMIT-POLICY says not to commit `token-index/`. test01 had committed it (pre-policy). No doc says to `git rm --cached` it, and `sync`'s gitignore offer is TTY-only (documented).

## Friction and time sinks (beyond the mismatches)

- **Hand-edited generated output.** test01's committed `public/tokens/DesignTokens.web.css` had been hand-patched (`--color-action-primary` cyan vs pink in `dist/`), and every `npm run build` overwrites it. This is a pre-existing consumer workflow problem, not a package bug. The upgrade surfaces it as an unexplained colour diff, which costs time when reviewing the upgrade.
- **Component tokens were never linked on the site** before or after: `--navheaderapp-*` resolves to nothing. INSTALL says to import `@3fn/core/component-tokens.css` "on every path", but it doesn't say whether a consumer with forks should *also* link their own generated `ComponentTokens.web.css`. Unclear either way.
- **The product MCP** (newly added by migration) reports `overview.yaml` as malformed: test01's 11.8.0-era file has markdown in YAML. That's the consumer's data, but an upgrade that adds a server reading old files could say so.
- `--help` says *"See the DesignerPunk repo's designerpunk.config.ts for an example"*. The package no longer ships it (CHANGELOG 15.0.0), so the consumer has to go to GitHub. The Integration Guide does carry an example.
- `start-up-tasks` (the consumer identity doc) says to keep the health-check date "recorded here", inside a managed file that `sync` regenerates and would flag as a conflict.
- `npm audit`: 47 vulnerabilities, almost all from test01's own `astro`, `figma-console-mcp` and `concurrently`; `@3fn/core` is "low". Noted, not attributed to DesignerPunk.
- **Time**: about 35 minutes of wall-clock for an agent with fast shell access, most of it on F-3/F-5 diagnosis and F-8 verification. A human consumer without an MCP probe would likely not find F-8 at all.

## Knowledge a consumer wouldn't have

- That the `.npmrc` pin must go **before** installing, and that it's safe to delete (F-1).
- Which upgrade recipe applies to 12.x, and whether to step through versions (F-2).
- That `componentTokens` must be edited by hand after `--migrate-components` (F-4).
- That relocated forks need their imports rewritten, and that forks depending on deleted siblings can't be fixed through the package (F-5).
- That fork-before-bundle import order matters on web (F-7).
- That the MCP config must be deleted and re-attached, and that a gutted docs corpus still returns "strong" matches. I found F-8 only by starting the servers over stdio, which a consumer wouldn't do (F-8).

## What I exercised, and what I didn't

**Exercised**: public-npm install; off-TTY `sync` report, `--dry-run` and `--apply`; `--migrate-legacy`, `--repair-tsconfig` and `--migrate-components`; `generate` (normal and `--force`); `validate`; `attach` for kiro (including re-attach after deleting stale entries) and for cc; all three MCP servers started from the generated configs and called over stdio; consumer jest suite; Astro build; browser render comparison before and after.

**Not exercised**:
- A real Kiro or Claude Code session restart and its trust/approval UI (simulated by stdio probes).
- An agent actually working in the upgraded repo.
- Interactive (TTY) `sync`, including its `.gitignore` prompt.
- `--repair-npmrc` (I deleted the pin by hand because the tool couldn't be reached).
- Stepping 12 → 15.0 → 15.1 → 16.
- Installing with a valid GitHub Packages token.
- Native platforms, Figma, `figma:push`, and Product MCP beyond health.
- Deploying the site.
- 16.1.0, which wasn't published.

## Suggested issue records (for owner triage; none filed)

| # | Title | Doc/promise it breaks | Severity guess |
|---|---|---|---|
| 1 | Migrated MCP config keeps stale `MCP_STEERING_DIR` / `COMPONENTS_DIR` / autoApprove. Docs MCP serves 9/83 docs with "strong" matches while `sync` says "up to date". | `--help` "No configuration needed"; `sync --migrate-legacy` = attach; INSTALL § 4 lifecycle | **P0/high**: silent, and it guts the agent layer's knowledge |
| 2 | `--migrate-components` relocation doesn't rewrite relative imports, and deletes siblings that kept forks depend on (unrepairable through the package `exports`) | Report: "relocates modified copies"; INSTALL § 9 Ownership | **High**: breaks `generate`, and some forks can't be fixed |
| 3 | `--migrate-components` removes copies the consumer imports by relative path. No importer scan, and the dry-run lists no paths. | CHANGELOG 14.x step 3 "add if the report offers"; report "remove them to receive updates" | **High**: breaks the consumer build |
| 4 | Config `componentTokens` left pointing at the removed `src/components/core`. `generate` silently drops the fork's component tokens. | INSTALL § 9 "Yours wins on its name" | **High**: silent output loss |
| 5 | The old GitHub Packages `.npmrc` pin blocks installing the version that carries `--repair-npmrc`. The install guide doesn't tell upgraders to remove it first. | INSTALL § Prerequisites "no .npmrc needed"; CHANGELOG 15.0.0 `--repair-npmrc` | **High** for every pre-public-npm consumer (one-line doc fix) |
| 6 | No documented upgrade path from ≤13.x, and none for jumping to latest vs stepping through versions | INSTALL § 4 / Integration Guide § Upgrading ("from 14.x" only) | Medium |
| 7 | `sync` ends with "Everything DesignerPunk manages is up to date" in a report that lists pending migrations and repairs | The INSTALL § 4 sync contract ("reports") | Medium (it reads as an all-clear) |
| 8 | Web: only whole-bundle imports exist, pointing at the unminified ESM. A 5-component page went from 180 KB to 595 KB. | INSTALL § Platforms › Web | Medium |
| 9 | Fork-wins-on-name depends on registration order on web; undocumented | INSTALL § 9 | Medium |
| 10 | Product-token staleness check ignores the `@3fn/core` version, so it skips regen after an upgrade | CHANGELOG 15.1.0 "one-time header change after upgrading"; "generate is the pipeline" | Low–medium |
| 11 | Internal spec numbers ("pre-123", "pre-119-A") in consumer CLI output | Consumer-facing plain language | Low |
| 12 | No guidance to untrack an already-committed `token-index/` | COMMIT-POLICY | Low |
| 13 | README version badge links to `docs/releases/release-16.0.0.md`, which isn't shipped. `--help` points to a repo config example the package no longer ships. | README; `--help` | Low |
| 14 | Unclear whether a consumer with forks should link their own `ComponentTokens.web.css` alongside `@3fn/core/component-tokens.css` | INSTALL § Platforms › Web | Low–medium |

## Artifacts (scratchpad)

`test01-copy/` (the upgraded copy, uncommitted) · `snapshot-pre-migrate.tgz` (state after install, before migration) · `sync-1.txt`, `sync-2-dryrun.txt`, `sync-3-apply.txt`, `sync-4-review.txt` · `generate-1..5*.txt` · `build-0..3*.txt` · `attach-kiro-2.txt`, `attach-cc.txt` · `mcp-after-migrate.json` (the stale config) · `broken-imports.txt` · `tools/mcp-probe.mjs` (stdio MCP probe) · `check-imports.mjs`
