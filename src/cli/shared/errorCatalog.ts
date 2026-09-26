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
