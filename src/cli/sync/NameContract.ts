/**
 * The name contract (Req 5A) and the type contract (DD11) — `sync`'s one report
 * about the consumer's token language. It REPORTS and NEVER WRITES (Req 5A.2 /
 * 5.8): nothing here adds, aliases, or defaults a token into the consumer's tier.
 *
 * Spec 123 Task 6 (design.md § "C7" name contract; DD10, DD11, DD17; P1 ruled YES).
 *
 * - **Source**: `<package>/dist/name-contract.json`, built from the COMPILED web
 *   surface by `scripts/build-name-contract.ts` (never from src at sync time).
 * - **Check**: referenced names, tier-filtered — **semantic ALWAYS · primitive YES ·
 *   component NEVER** — minus the custom properties DEFINED in the consumer's
 *   generated web token CSS (`<outputDir>/DesignTokens.web.css`, the output
 *   directory from her config).
 * - **No generated web output → `cannot check`**, never a clean report.
 * - A component carrying an `uncovered` dynamic site gets a standing
 *   "not checked" line — never silently clean (R26.8).
 * - Scope: web-surface names only (Task 3.5's decision record — native out).
 */

import * as fs from 'fs';
import * as path from 'path';

export const NAME_CONTRACT_REL = 'dist/name-contract.json';
export const GENERATED_WEB_CSS = 'DesignTokens.web.css';

export type ContractTier = 'semantic' | 'primitive' | 'component';

/** P1 (Peter, 2026-09-26). Applied here AND at build — the check never trusts the file's filtering. */
export const TIER_FILTER: Record<ContractTier, boolean> = {
  semantic: true, // ALWAYS
  primitive: true, // YES (P1)
  component: false, // NEVER (DD17)
};

export interface ContractName {
  name: string;
  tier: ContractTier;
  token: string;
  part?: string;
  value: string;
  usedBy: string[];
  declaredUse: string;
}

export interface NameContractFile {
  schemaVersion: number;
  referencedNames: ContractName[];
  notChecked?: Array<{ component: string; site: string }>;
  typeContract?: { hash: string; members: string[] };
}

// ---------------------------------------------------------------------------
// Catalog rows (design.md § "Error Handling") — exact strings
// ---------------------------------------------------------------------------

/** Row "name contract — missing (A9)". */
export function missingTokenMessage(a: {
  name: string;
  declaredUse: string;
  components: string[];
  tierPath: string;
  value: string;
  dpToken: string;
}): string {
  return (
    `components now expect token '${a.name}' — ${a.declaredUse} (used by ${a.components.join(', ')}). ` +
    `Add it to your set in ${a.tierPath}. Your tokens are yours; DesignerPunk never adds to them. ` +
    `DesignerPunk's value, for reference: ${a.value} ('${a.dpToken}' in DesignerPunk's language). ` +
    `See: install doc § "When sync reports a missing token".`
  );
}

/** Row "name contract — cannot check". */
export function cannotCheckMessage(outputDir: string): string {
  return `cannot check the name contract — no generated web token output found at ${outputDir}. Run 'npx designerpunk generate' first. (This is not a clean report.)`;
}

/** Row "type contract changed". DD11's no-member-diff case fills the parenthetical with its residual string. */
export function typeContractChangedMessage(removed: string[], added: string[]): string {
  const detail =
    removed.length === 0 && added.length === 0
      ? NO_MEMBER_CHANGES
      : `removed: ${removed.length ? removed.join(', ') : 'none'}; added: ${added.length ? added.join(', ') : 'none'}`;
  return `the token type contract changed (${detail}). Run 'npx tsc --noEmit' — fix each file it names; removed members are listed above.`;
}

/** DD11 residual, verbatim: a cosmetic `.d.ts` change moves the hash with no member diff. */
export const NO_MEMBER_CHANGES = 'no member changes detected — shape or formatting changed';

// ---------------------------------------------------------------------------
// Strings authored at Task 6 (no catalog row) — pinned by sync.name-contract.test.ts
// ---------------------------------------------------------------------------

/** Standing line for a component with an `uncovered` dynamic site (tasks.md Task 6). */
export function notCheckedMessage(component: string): string {
  return `not checked: ${component} builds token names dynamically`;
}

/** Clean — what it establishes (design C7 § "What a clean report establishes"). */
export function cleanMessage(outputDir: string): string {
  return `name contract: clean — every semantic and primitive token name DesignerPunk's web components reference is defined in your generated web CSS at ${outputDir}.`;
}

/** Req 5A.4 / R26.8 — what a clean report does NOT establish. Printed with every checked report. */
export const SCOPE_MESSAGE =
  "(A clean name contract does not establish that your values suit the components. DesignerPunk's component-tier tokens and the iOS/Android surfaces are not checked.)";

export function contractMissingMessage(pkgRoot: string): string {
  return `cannot check the name contract — the installed package has no ${NAME_CONTRACT_REL} (${pkgRoot}). (This is not a clean report.)`;
}

export function configUnreadableMessage(error: string): string {
  return `cannot check the name contract — designerpunk.config.ts could not be loaded (${error}), so the generated output directory is unknown. (This is not a clean report.)`;
}

// ---------------------------------------------------------------------------
// The check
// ---------------------------------------------------------------------------

export function loadNameContract(pkgRoot: string): NameContractFile | null {
  const p = path.join(pkgRoot, NAME_CONTRACT_REL);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8')) as NameContractFile;
}

/** The package's type-contract hash (DD11) for the manifest's `contractHash`; '' when the package ships no contract. */
export function readContractHash(pkgRoot: string): string {
  try {
    return loadNameContract(pkgRoot)?.typeContract?.hash ?? '';
  } catch {
    return '';
  }
}

/** Custom properties DEFINED in the consumer's generated web token CSS; `null` = no output. */
export function readPresentNames(outputDir: string): Set<string> | null {
  const p = path.join(outputDir, GENERATED_WEB_CSS);
  if (!fs.existsSync(p)) return null;
  const css = fs.readFileSync(p, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const out = new Set<string>();
  for (const m of css.matchAll(/(--[A-Za-z_][A-Za-z0-9_-]*)\s*:/g)) out.add(m[1]);
  return out;
}

export interface NameContractContext {
  /** Display form of the generated output directory (e.g. `dist`). */
  outputDirDisplay: string;
  /** Display form of the consumer's semantic tier (e.g. `src/tokens/semantic/`). */
  semanticTierPath: string;
  /** Display form of the consumer's primitive tier (e.g. `src/tokens/`). */
  primitiveTierPath: string;
}

export interface NameContractResult {
  status: 'cannot-check' | 'clean' | 'missing';
  missing: ContractName[];
  notChecked: string[];
  lines: string[];
}

export function checkNameContract(
  contract: NameContractFile,
  present: Set<string> | null,
  ctx: NameContractContext,
): NameContractResult {
  const notChecked = [...new Set((contract.notChecked ?? []).map((n) => n.component))].sort();
  const notCheckedLines = notChecked.map(notCheckedMessage);
  if (present === null) {
    return { status: 'cannot-check', missing: [], notChecked, lines: [cannotCheckMessage(ctx.outputDirDisplay), ...notCheckedLines] };
  }
  const missing = contract.referencedNames.filter((r) => TIER_FILTER[r.tier] === true && !present.has(r.name));
  const lines = missing.map((r) =>
    missingTokenMessage({
      name: r.name,
      declaredUse: r.declaredUse,
      components: r.usedBy,
      tierPath: r.tier === 'primitive' ? ctx.primitiveTierPath : ctx.semanticTierPath,
      value: r.value,
      dpToken: r.token,
    }),
  );
  if (missing.length === 0) lines.push(cleanMessage(ctx.outputDirDisplay));
  lines.push(...notCheckedLines, SCOPE_MESSAGE);
  return { status: missing.length ? 'missing' : 'clean', missing, notChecked, lines };
}

// ---------------------------------------------------------------------------
// The type contract (DD11)
// ---------------------------------------------------------------------------

export function diffMembers(before: string[], after: string[]): { removed: string[]; added: string[] } {
  const a = new Set(after);
  const b = new Set(before);
  return { removed: before.filter((m) => !a.has(m)), added: after.filter((m) => !b.has(m)) };
}

/**
 * Compare a recorded type contract with the installed one. `null` when unchanged,
 * or when nothing was recorded yet (no baseline — the first recording is not a change).
 */
export function checkTypeContract(
  recorded: { hash: string; members: string[] } | null,
  current: { hash: string; members: string[] },
): string | null {
  if (!recorded || !recorded.hash || recorded.hash === current.hash) return null;
  const { removed, added } = diffMembers(recorded.members, current.members);
  return typeContractChangedMessage(removed, added);
}
