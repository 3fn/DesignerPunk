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

/** design.md catalog row: `init` in a born repo (A7). */
export function initBornRepoMessage(root: string): string {
  return (
    `this repo already has a design system (${root}) — init is the birth event and runs once. ` +
    `To join it: npm install → npx designerpunk generate → fill in .designerpunk/personal-note.local.md ` +
    `(generate creates it) → restart your agent session (approve DesignerPunk's MCP servers if asked). ` +
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
  return (
    `fill in .designerpunk/personal-note.local.md — who you are and how you want to be worked with; your ` +
    `agents read it every session (it stays on your machine)`
  );
}

/**
 * design.md § C27 (A13): the truthful `jest.config.js` collision string — states
 * the CONSEQUENCE of the skip, not just the skip (Req 19.3).
 */
export function jestConfigCollisionMessage(): string {
  return (
    `skipped: jest.config.js (already exists) — the DesignerPunk jest preset is not applied; to test your ` +
    `own forked components with @3fn/core/testing, add ...require('@3fn/core/jest-preset') to your config`
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
  return (
    `the DesignerPunk-managed region in ${file} is missing its markers — not rewriting the file. ` +
    `Restore the markers (see install doc § "Your agent layer") or re-run attach`
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
