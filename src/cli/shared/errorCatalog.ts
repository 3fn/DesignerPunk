/**
 * The loud-failure catalog — exact strings (Spec 123, design.md § "Error Handling —
 * the loud-failure catalog (exact strings)"). ONE source for every birth-detection-
 * related refusal/status message, consumed by `generate`'s refusals (Task 1.5) and
 * the MCP servers' unavailable/refusal logging (Task 1.6) — a single copy so the
 * two call sites can never drift (the project's named recurring failure mode).
 *
 * Every function here returns EXACTLY the design's catalog string with its `<…>`
 * slots filled — no paraphrasing, no added punctuation. The Task 1.6 conformance
 * test asserts string equality against these rows.
 */
import type { PartialCase } from './bornRepo';

/** design.md catalog row: `partial: config-no-tier`. */
export function partialConfigNoTierMessage(root: string, tokenSource: string | undefined): string {
  const tokenSourceSlot = tokenSource ?? '(a non-literal tokenSource value in designerpunk.config.ts)';
  return (
    `found designerpunk.config.ts at ${root} but no DesignerPunk token tier at ${tokenSourceSlot} — ` +
    `this repo looks partly initialized. Refusing rather than guessing. Inspect it, or complete it ` +
    `deliberately: npx designerpunk init --re-scaffold`
  );
}

/** design.md catalog row: `partial: unused-local-tier`. */
export function partialUnusedLocalTierMessage(root: string): string {
  return (
    `found a token tier at ${root}/src/tokens but your config omits tokenSource, so generate would use ` +
    `DesignerPunk's tokens, not yours. Add tokenSource: './src/tokens' to designerpunk.config.ts. ` +
    `(Refusing to generate until then.)`
  );
}

/** design.md catalog row: `partial: tier-no-config`. */
export function partialTierNoConfigMessage(root: string): string {
  return (
    `found a DesignerPunk token tier at ${root}/src/tokens but no designerpunk.config.ts — refusing to ` +
    `generate or serve DesignerPunk's reference index as yours. Restore the config, or run: ` +
    `npx designerpunk init --re-scaffold`
  );
}

/** design.md catalog row: `partial: manifest-only`. */
export function partialManifestOnlyMessage(root: string): string {
  return (
    `found designerpunk.manifest.json at ${root} but no config or token tier — the design system files ` +
    `are missing. Restore them from version control, or run: npx designerpunk init --re-scaffold`
  );
}

/** Dispatch to the right partial-case message (all four sub-cases). */
export function partialCaseMessage(
  root: string,
  partialCase: PartialCase,
  attemptedTokenSource: string | undefined
): string {
  switch (partialCase) {
    case 'config-no-tier':
      return partialConfigNoTierMessage(root, attemptedTokenSource);
    case 'unused-local-tier':
      return partialUnusedLocalTierMessage(root);
    case 'tier-no-config':
      return partialTierNoConfigMessage(root);
    case 'manifest-only':
      return partialManifestOnlyMessage(root);
  }
}

/** design.md catalog row: `package-mode posture (D2-B1; no longer partial), index absent or empty`. */
export function packageModeIndexAbsentMessage(): string {
  return (
    `this repo runs in package mode (designerpunk.config.ts has no tokenSource), so its token index is ` +
    `DesignerPunk's tokens — run 'npx designerpunk generate' to build it. To make a design system of ` +
    `your own: npx designerpunk init --re-scaffold`
  );
}

/** design.md catalog row: `born, token index absent or empty`. */
export function bornIndexAbsentMessage(root: string): string {
  return `no token index in this design system (${root}/token-index is absent or empty) — run 'npx designerpunk generate'`;
}

/** design.md catalog row: `explicit TOKEN_INDEX_DIR missing`. */
export function explicitTokenIndexMissingMessage(explicitPath: string): string {
  return `TOKEN_INDEX_DIR is set to ${explicitPath}, which is absent or empty — unset it, or run generate`;
}

// ---------------------------------------------------------------------------
// `init`-specific catalog strings (Spec 123 Task 2 — design.md C1 row 0 /
// C27 / Req 15A.3, 15.8, 15.9, 2.5). Extends the catalog established at Task
// 1.6 rather than duplicating it in a second file (per the project's
// duplicated-resolution-logic warning) — `init.ts` is the only caller today.
// ---------------------------------------------------------------------------

/** design.md catalog row: `init` in a born repo (A7), with the 2026-10-03 erratum (R2, Leonardo L-RC3) applied: the personal-note step reads "fill in your personal note (generate creates it; your agent can walk you through it)". */
export function initBornRepoMessage(root: string): string {
  return (
    `this repo already has a design system (${root}) — init is the birth event and runs once. ` +
    `To join it: npm install → npx designerpunk generate → fill in your personal note ` +
    `(generate creates it; your agent can walk you through it) → restart your agent session (approve DesignerPunk's MCP servers if asked). ` +
    `Using a different agent tool than this repo was set up for? Also run: npx designerpunk attach ` +
    `--target=<cc|kiro> to attach a harness (agents + MCP config + approvals). To deliberately re-scaffold: ` +
    `npx designerpunk init --re-scaffold`
  );
}

/**
 * design.md catalog row: **restart line — sequenced** (erratum, Le-T1 + Le-T5).
 * `init` and born-repo `attach` output; printed LAST, as the final next step.
 */
export function restartLineSequencedMessage(): string {
  return (
    `when the steps above are done, restart your agent session — DesignerPunk's MCP servers and your ` +
    `personal note load when a session starts, so this session cannot see them yet (approve the servers ` +
    `if your tool asks)`
  );
}

/** design.md catalog row: **clone hatch** (erratum, Le-T1; `init` output). */
export function cloneHatchMessage(): string {
  return (
    `want to own the engine too? Clone github.com/3fn/DesignerPunk — init already made the token language ` +
    `yours; the clone adds the engine and the components`
  );
}

/** design.md catalog row: **personal-note naming** (erratum, Le-T1; `init` output). */
export function personalNoteNamingMessage(): string {
  // Corrected 2026-10-03 (design erratum R2, Leonardo L-RC3): three slots and the walkthrough.
  return (
    `fill in .designerpunk/personal-note.local.md — who you are, what you and your organization value, and how ` +
    `you like to work together — or, after the restart, ask your agent to walk you through it. ` +
    `Your agents read it every session (it stays on your machine)`
  );
}

/**
 * design.md § C27 (A13): the truthful `jest.config.js` collision string — states
 * the CONSEQUENCE of the skip, not just the skip (Req 19.3).
 */
export function jestConfigCollisionMessage(): string {
  return (
    `skipped: jest.config.js (already exists) — the DesignerPunk jest preset is not applied; to test your own ` +
    `components with it, add ...require('@3fn/core/jest-preset') to your config (in this version @3fn/core/testing ` +
    `does not load under the preset; see the Integration Guide's "Running Component Tests")`
  );
}

/**
 * Req 13 — the consumer profile's DECLARED DEGRADATION (Spec 123 Task 16.1; design C20:
 * "Degradation in the consumer profile = warn and exit 0"). Printed once per unresolvable
 * member when the consumer emission lane (`dist/generator/consumer-entry.js`) finds a member
 * missing from the installed package — a diet defect or a partial install. The charter is
 * emitted without that member and the command exits 0.
 *
 * AUTHORED AT 16.1, not copied: design § Error Handling carries this row as
 * `consumer degradation | (unchanged; warning, exit 0)` with no text, so there is no catalog
 * string to be equal to. `consumer-entry.degradation.test.ts` asserts THIS function's output.
 *
 * - `member`: what is missing, e.g. `governance doc 'contract-system-reference'`.
 * - `where`: where the lane looked, relative to the package root.
 * - `consequence`: what was emitted without it.
 *
 * THE REMEDY CLAUSE (corrected 2026-10-02): a correctly built package emits no warning (the
 * parity test asserts `warnings` is empty over the built `dist/consumer-canonical`), so every
 * warning is either a damaged install or a package that shipped without the member (a diet
 * defect, a tool the shipped manifest does not declare, a missing prepack dispositions file).
 * A reinstall repairs only the first, so the text says what a failed reinstall means instead of
 * promising a repair. It asks for a CLEAN reinstall because `npm install` over an existing
 * `node_modules` does not re-extract a package already present, so a damaged copy survives it;
 * and it names no cause, because a linked or `file:` install fails the same way. The design
 * catalog row for this text is owed under
 * `.kiro/issues/2026-10-01-design-erratum-req-13-degradation-warning-text.md`.
 */
export function consumerDegradationMessage(member: string, where: string, consequence: string): string {
  return (
    `warning: ${member} is missing from the installed @3fn/core (${where}) — ${consequence}. ` +
    `Generation continued without it. If a clean reinstall (remove node_modules, then npm install) ` +
    `does not restore it, the package you installed does not contain it.`
  );
}

/**
 * design.md catalog row: **managed region — markers missing** (Task 16.4, C7 region
 * grain). `RegionGrain.spliceRegion` returns this string — never throws, never
 * writes — when a managed region's begin/end marker pair is absent or unmatched
 * in `<file>` (e.g. `CLAUDE.md`, `.gitignore`).
 */
export function managedRegionMarkersMissingMessage(file: string): string {
  // The target-free `.gitignore` block: `attach` never writes it, so "re-run attach" would be false
  // (catalog-wording.md § 6, Leonardo). Every other managed region keeps the design row's remedy.
  if (file === '.gitignore') {
    return (
      `the DesignerPunk-managed block in .gitignore is missing its markers — not rewriting the file. ` +
      `Restore the lines '# designerpunk:managed:begin' and '# designerpunk:managed:end' around the block, ` +
      `and 'npx designerpunk sync' keeps it current again.`
    );
  }
  return (
    `the DesignerPunk-managed region in ${file} is missing its markers — not rewriting the file. ` +
    `Restore the markers (see install guide § "Your agent layer") or re-run attach`
  );
}

/**
 * design.md catalog row: **managed region — edited inside** (Task 16.5, C7 region
 * grain). `sync` reports it for a recorded region whose contents differ from both
 * the package's and the recorded baseline; the region is replaced only with
 * `--apply` (or `--overwrite <file>#managed`), never on the terminal's batch
 * confirmation alone.
 */
export function managedRegionEditedInsideMessage(file: string): string {
  return (
    `you edited inside the DesignerPunk-managed region of ${file} — those edits will be replaced. ` +
    `Move them outside the region; not applying without --apply`
  );
}

// ---------------------------------------------------------------------------
// `attach`-specific catalog strings (Spec 123 Task 16.2 — design.md § "C20.
// The consumer emission lane" / § "Error Handling", the `attach` and restart
// rows). Extends the catalog established at Tasks 1.6/2/16.1/16.4.
// ---------------------------------------------------------------------------

/** design.md catalog row: `attach` in an unborn repo (A8). */
export function attachUnbornRepoMessage(): string {
  return (
    `no design system here. To create one: npx designerpunk init. Only reading DesignerPunk's docs ` +
    `and components? No init needed: npx designerpunk attach --target=<cc|kiro> --reference`
  );
}

/**
 * design.md catalog row: **restart line — now** (erratum, Le-T5).
 * `attach --reference` output only, where the restart IS the next step.
 */
export function restartLineNowMessage(): string {
  return (
    `restart your agent session now — DesignerPunk's MCP servers load when a session starts, so ` +
    `this session cannot see them yet (approve them if your tool asks)`
  );
}

// ---------------------------------------------------------------------------
// Issue-row catalog strings (the 15.0.0 upgrade rehearsal, 2026-10-02). Their
// source is the grant issue named on each, not a design.md row: design.md is
// outside those grants. A design catalog row for each is owed at 123's next
// design touch.
// ---------------------------------------------------------------------------

/**
 * An MCP config already carries one of DesignerPunk's server keys, so `init`/`attach`
 * leaves it unchanged. The remedy names `attach` — the verb that rewrites MCP wiring
 * in a born or migrated repo; `init` is the once-ever birth event.
 * Source: `.kiro/issues/2026-10-02-sync-steering-dir-suggestion-writes-broken-path.md`.
 */
export function existingMcpEntryMessage(configFile: string, key: string, target: 'cc' | 'kiro'): string {
  return (
    `${configFile} already has '${key}' entry; left unchanged. If it is outdated, delete the entry ` +
    `and re-run: npx designerpunk attach --target=${target} — or update it by hand.`
  );
}

/**
 * `generate` stopped because a component-token file in the consumer's tree failed
 * `defineComponentTokens`'s family-mismatch guard (#127) while it loaded. Names the FILE
 * (the guard names only the component), carries the guard's own message verbatim, and
 * names ONLY remedies that work for that file (the 15.0.0 upgrade rehearsal, run 2):
 *
 * - **always**: split the file's `defineComponentTokens()` into one call per family;
 * - **a copied `src/tokens/**` file**: the package ships that file's source, but with the
 *   package-internal import `'../../build/tokens'` that `init` rewrites on copy — so the
 *   re-copy must take the same rewrite to `'@3fn/core/build'` (a verbatim copy fails to
 *   load: `Cannot find module '../../build/tokens'`);
 * - **an unedited `src/components/core/**` copy**: delete it. The package ships no source
 *   for those token files (only `dist/`), so there is nothing to re-copy; deleting also
 *   removes that component's tokens from the consumer's generated `ComponentTokens.*`.
 *
 * `file` is repo-relative with `/` separators. Pre-123 `init` copied two such files in the
 * pre-fix single-family form (`src/tokens/component/progress.ts`,
 * `src/components/core/Button-Icon/buttonIcon.tokens.ts`).
 * Source: `.kiro/issues/2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md`.
 */
export function componentTokenFamilyMismatchMessage(file: string, guardMessage: string): string {
  let alternative = '';
  if (file.startsWith('src/tokens/')) {
    alternative =
      ` Or, if an earlier DesignerPunk init copied this file, replace it with the package's version at ` +
      `node_modules/@3fn/core/${file} and change its '../../build/tokens' import to '@3fn/core/build'.`;
  } else if (file.startsWith('src/components/core/')) {
    alternative =
      ` Or, if this is an unedited copy an earlier DesignerPunk init made, delete it — its component tokens ` +
      `then leave your generated ComponentTokens.* files.`;
  }
  return (
    `generate stopped — ${file} declares a component token in the wrong family's defineComponentTokens() call. ` +
    `${guardMessage} ` +
    `To fix it, split that file's defineComponentTokens() into one call per token family.` +
    `${alternative} Nothing was written.`
  );
}

/**
 * `generate` stopped because a component-token file in the consumer's tree threw while it
 * loaded, for any reason other than the family guard. Names the file and the FIRST line of
 * the reason — Node's module-not-found message carries a multi-line `Require stack:` list of
 * absolute paths that is noise here.
 * Source: as {@link componentTokenFamilyMismatchMessage}.
 */
export function componentTokenFileLoadFailedMessage(file: string, reason: string): string {
  const firstLine = reason.split(/\r?\n/, 1)[0].trim();
  return `generate stopped — ${file} could not be loaded: ${firstLine} Fix the file and run generate again. Nothing was written.`;
}

// ---------------------------------------------------------------------------
// The `.gitignore` managed block (Spec 123 Task 20.2; design.md C24's PR-9 erratum and § "Error
// Handling — the loud-failure catalog (exact strings)" rows "`.gitignore` block — offer" and
// "— report"). The block's content lives in `gitignoreRegion.ts`; its strings live here.
// ---------------------------------------------------------------------------

/**
 * design.md catalog row **`.gitignore` block — offer** (PR-9; `sync`, interactive; only when
 * `git check-ignore -q .designerpunk/` exits 1). Asked as its OWN question, after `sync`'s report,
 * default No — the `[y/N]` is part of the row's text.
 */
export function gitignoreBlockOfferMessage(): string {
  return (
    `.designerpunk/ is not ignored by git here, so a personal note in it could be committed and shared with your team. ` +
    `Add DesignerPunk's .gitignore block (it ignores .designerpunk/ and token-index/)? [y/N]`
  );
}

/**
 * design.md catalog row **`.gitignore` block — report** (PR-9; `sync`, non-interactive, including
 * `--apply` off a TTY; writes nothing). Carries the remedy the `untracked-new` row's
 * `attach --target` cannot give for a target-free region.
 */
export function gitignoreBlockReportMessage(): string {
  return (
    `.designerpunk/ is not ignored by git here, so a personal note in it could be committed and shared with your team. ` +
    `To fix it: answer the prompt when running 'npx designerpunk sync' in a terminal, or add the line .designerpunk/ to .gitignore ` +
    `(your agent can do this with your go). Nothing was changed.`
  );
}

/**
 * `init` or `sync` could not load `designerpunk.config.ts`, so the platform-output path for the
 * block's commented line is unknown. The block is NOT written, and no path is guessed
 * (tasks.md Task 20, R2 Lina A-2).
 *
 * AUTHORED AT 20.2, not copied: design.md § Error Handling carries no row for this case (the
 * criterion says "init reports and writes no block" and names no text), so there is no catalog
 * string to be equal to. `gitignoreRegion.test.ts` asserts THIS function's output. The design
 * catalog row is owed (see `task-20-instruments.md` § "Found later").
 */
export function gitignoreBlockConfigUnreadableMessage(reason: string): string {
  const firstLine = reason.split(/\r?\n/, 1)[0].trim();
  return (
    `DesignerPunk's .gitignore block was not written — designerpunk.config.ts could not be loaded (${firstLine}), ` +
    `so the platform output path is unknown and none was guessed. ` +
    `Add the lines token-index/ and .designerpunk/ to .gitignore yourself, or fix the config and run 'npx designerpunk sync'.`
  );
}

/**
 * The confirmation after the block is written (by `init`, or by `sync` after a yes). AUTHORED AT
 * 20.2: the design catalog has no row for it (the existing "✓ Created …" lines are literals in
 * `init.ts`; the row is owed with the one above).
 */
export function gitignoreBlockAddedMessage(): string {
  return `.gitignore: added DesignerPunk's block (it ignores .designerpunk/ and token-index/)`;
}

// ---------------------------------------------------------------------------
// The starter specs (Spec 123 Task 21.3; design.md C25, DD15). Both strings are AUTHORED AT 21.3:
// the design catalog carries no row for either (the criterion says `init` "reports on collision" and
// names no text); the existing generic `skipped: <label> (already exists)` literal in `init.ts` names
// the skip but not its consequence (the C27 / A13 rule: a collision string states what the skip means).
// `init.test.ts` asserts THESE functions' output. The design rows are owed (see `task-21-3-completion.md`).
// ---------------------------------------------------------------------------

/** A starter-spec path already exists: it is kept as it is, and the starter's version is not written. */
export function starterSpecCollisionMessage(relPath: string): string {
  return `skipped: ${relPath} (already exists) — your file is kept as it is; the starter spec's version was not written`;
}

/** The summary line after the starter specs are scaffolded into `specs/`. */
export function starterSpecsWrittenMessage(fileCount: number, specNames: string[]): string {
  return `specs/: ${fileCount} starter spec file${fileCount === 1 ? '' : 's'} (${specNames.join(', ')}) — run them with your agent`;
}

// ---------------------------------------------------------------------------
// The personal note (Spec 123 Task 22.1; design.md C26's 2026-10-03 errata, mechanism B — PR-4) and
// `generate`'s `Themes:` line. Strings are the design rows' corrected text, verbatim; the `Themes:` suffix
// is Leonardo's final wording (`design-inputs/catalog-wording.md` § 1), the design erratum for which is owed.
// ---------------------------------------------------------------------------

/**
 * design.md catalog row **generate created the personal note** (Le-R1; corrected 2026-10-03, R2 — Leonardo
 * L-RC3: three slots and the walkthrough). Printed by every command that creates the note except `init`
 * and `sync --migrate-legacy`, which print the naming row.
 */
export function personalNoteCreatedMessage(): string {
  return (
    `created .designerpunk/personal-note.local.md from the template — fill it in, or ask your agent to walk you through it. ` +
    `Your agents read it every session (it stays on your machine)`
  );
}

/**
 * design.md catalog row **personal note unfilled** (mechanism B, PR-4; wording Leonardo, R2/R3). A warning,
 * exit 0 (Req 13, 18.5(iii)); printed by any command that finds an existing unfilled note, never in the
 * same run as a creation row.
 */
export function personalNoteUnfilledMessage(): string {
  return (
    `your personal note (.designerpunk/personal-note.local.md) is still the unfilled template, so your agents set it aside. ` +
    `Your answers go under the headings, outside the guidance block. ` +
    `Fill it in yourself, or ask your agent to walk you through it: who you are, what you and your organization value, ` +
    `and how you like to work together. Rather not keep one? Replace it with a line of your own and this message stops. ` +
    `(It stays on your machine.)`
  );
}

/**
 * design.md catalog row **personal note created in an unignored directory** (PR-13 RULED; Leonardo's L-RC8
 * text). Printed by `generate` and `attach` immediately after their creation row, only when
 * `git check-ignore -q .designerpunk/` exits 1.
 */
export function personalNoteUnignoredMessage(): string {
  return (
    `.designerpunk/ is not ignored by git in this repo, so the personal note just created could be committed and shared with your team. ` +
    `Add the line .designerpunk/ to .gitignore (or run 'npx designerpunk sync' in a terminal to add DesignerPunk's block).`
  );
}

/**
 * design.md catalog row **generate — registered theme not emitted** (R3; Ada's draft, Leonardo's FINAL
 * wording — `design-inputs/catalog-wording.md` § 1). `generate` prints its registered themes on ONE
 * comma-joined line, so the line gets one suffix. It comes off by dated amendment when Spec 129 item (i) lands.
 */
export function generateThemesLine(themes: ReadonlyArray<{ name: string; mode: string }>): string {
  return (
    `Themes: ${themes.map((t) => `${t.name} (${t.mode})`).join(', ')} — registered, not applied yet: ` +
    `a theme you register does not change your generated output; dark mode and the wcag theme apply DesignerPunk's built-in overrides to your tokens`
  );
}

// ---------------------------------------------------------------------------
// `init`'s terminal output, completed (Spec 123 Task 22.2; design.md C27 and its erratum).
// ---------------------------------------------------------------------------

/** Display names for the harness targets the notice names; an undeclared id is shown as itself. Presentation only: the declared set is the profile's (C12). */
const HARNESS_DISPLAY_NAMES: Readonly<Record<string, string>> = Object.freeze({ cc: 'Claude Code', kiro: 'Kiro' });
const harnessName = (target: string): string => HARNESS_DISPLAY_NAMES[target] ?? target;

/**
 * design.md catalog row **bare `init` default notice (A2)** (Leonardo A2): printed FIRST on bare `init`
 * (no `--target`); the sequenced restart row stays LAST. `defaultTarget` and `targets` come from the
 * packaged profile, never a literal list; with the shipped two-target profile and `cc` as the default the
 * string is the row's, verbatim. A `--skip-agents` run prints no notice (nothing was set up for a harness).
 */
export function namedDefaultNoticeMessage(defaultTarget: string, targets: readonly string[]): string {
  const others = targets.filter((t) => t !== defaultTarget);
  const using = others.map((t) => `Using ${harnessName(t)}? npx designerpunk attach --target=${t}`).join(' ');
  return `no --target given — set up for ${harnessName(defaultTarget)} (the default).${using ? ` ${using}` : ''}`;
}

/** What `init` actually did, so its next steps list only steps a skip has not made untrue. */
export interface InitNextStepsContext {
  /**
   * `@3fn/core` is installed in this repo (`node_modules/@3fn/core`). False only when `init` ran from somewhere else (for
   * example `npx` with no install first): the config `init` wrote imports from `@3fn/core`, so `generate` needs it, and the
   * one step to print is `npm install @3fn/core`. The bare `npm install` `init` used to print is never needed: `init`
   * changes no dependency and never writes the consumer's `package.json`.
   */
  packageInstalledHere: boolean;
  /** `jest.config.js` was written (false: an existing one was kept, so the optional install-jest line would be untrue). */
  jestConfigScaffolded: boolean;
  /** The starter specs are in `specs/` (written now, or already there). */
  starterSpecNames: string[];
  /** DesignerPunk's `.gitignore` block is in place (false: the config would not load, or the markers were gone). */
  gitignoreBlockInPlace: boolean;
  /** The agent layer was emitted (false under `--skip-agents`). */
  agentLayerEmitted: boolean;
}

/**
 * The block of next steps `init` prints before the clone hatch, the personal-note naming row and the
 * sequenced restart row (which stays the LAST thing). It lists positively what this repo needs next, and
 * names the `.gitignore` block and the `specs/` scaffold (C27 erratum, 2026-10-03). A step a skip made
 * untrue is omitted. AUTHORED AT 22.2: the design catalog carries no row for the block as a whole.
 */
export function initNextStepsMessage(name: string, ctx: InitNextStepsContext): string {
  // The numbered list begins at `generate` (install → init → generate → note → restart is the founder path).
  const steps: string[] = [];
  if (!ctx.packageInstalledHere) steps.push('npm install @3fn/core (it is not installed in this repo, and the config init wrote imports from it)');
  steps.push('npx designerpunk generate');
  if (!ctx.agentLayerEmitted) steps.push('npx designerpunk attach --target=<cc|kiro> to attach a harness (agents + MCP config + approvals)');
  if (ctx.starterSpecNames.length > 0) {
    steps.push(`specs/ holds your starter specs (${ctx.starterSpecNames.join(', ')}): run them with your agent when you are ready`);
  }
  if (ctx.gitignoreBlockInPlace) {
    steps.push('commit .gitignore with the rest: DesignerPunk\'s block in it ignores .designerpunk/ and token-index/');
  }
  const optional = ctx.jestConfigScaffolded
    ? '\nOptional, to test your own components: npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @types/node\n'
    : '';
  return `Your product "${name}" is ready.

Next steps:
${steps.map((t, i) => `  ${i + 1}. ${t}`).join('\n')}
${optional}
To customize your visual language:
  • Edit src/tokens/ to change base values and design intent
  • Run \`npx designerpunk generate\` after changes

Note: Token values have mathematical relationships (modular scale,
baseline grid). \`generate\` does not check these relationships, and
\`npx designerpunk validate\`'s check for them currently fails even on
unmodified token source (a known defect in the checker, not in your tokens).

💡 After future upgrades, run \`npx designerpunk sync\` to apply updates.`;
}

