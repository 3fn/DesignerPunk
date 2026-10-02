/**
 * Net-new stale-`MCP_STEERING_DIR` detection for `npx designerpunk sync`.
 *
 * Post Spec 119-A, the docs MCP serves the relocated non-identity corpus from
 * `governance/` (the env var NAME `MCP_STEERING_DIR` is retained as a stable API
 * contract; only the value moves). A consumer whose MCP config still points
 * `MCP_STEERING_DIR` at a `.kiro/steering` path will index only the identity docs
 * and miss the 80 relocated docs. `sync` had zero `mcp.json` awareness before this;
 * this module adds detection + a consumer prompt to update.
 *
 * Detection is advisory and non-destructive: it never rewrites the consumer's
 * config automatically — it surfaces the stale value and the recommended value,
 * and (interactively) offers to update it.
 *
 * @see Spec 119-A — Requirement 5 AC4/AC5 (Task 7.2)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { resolvePackageRoot } from '../shared/resolvePackageRoot';

/** The post-119-A served corpus directory the docs MCP should index. */
export const EXPECTED_STEERING_DIR_SEGMENT = 'governance';
/** The pre-119-A location — a value still pointing here is stale. */
const STALE_STEERING_DIR_SEGMENT = '.kiro/steering';

/** Known consumer MCP-config locations, relative to project root. */
const MCP_CONFIG_CANDIDATES = [
  '.cursor/mcp.json',
  '.kiro/settings/mcp.json',
];

export interface StaleSteeringDirFinding {
  /** Project-relative path of the config file. */
  configPath: string;
  /** The MCP server key whose env carries the stale value. */
  serverKey: string;
  /** The current (stale) MCP_STEERING_DIR value. */
  currentValue: string;
}

/**
 * Scan known consumer MCP configs for an `MCP_STEERING_DIR` still pointing at the
 * pre-relocation `.kiro/steering` location. Returns one finding per stale entry.
 *
 * A value is "stale" when it references `.kiro/steering` and does NOT reference
 * the new `governance` segment. Configs that already point at `governance` (or
 * that have no `MCP_STEERING_DIR`) produce no finding.
 */
export function detectStaleSteeringDir(projectRoot: string): StaleSteeringDirFinding[] {
  const findings: StaleSteeringDirFinding[] = [];

  for (const rel of MCP_CONFIG_CANDIDATES) {
    const abs = path.join(projectRoot, rel);
    if (!fs.existsSync(abs)) continue;

    let parsed: unknown;
    try {
      parsed = JSON.parse(fs.readFileSync(abs, 'utf-8'));
    } catch {
      // Malformed config — not our job to fix here; skip silently.
      continue;
    }

    const servers = (parsed as { mcpServers?: Record<string, unknown> })?.mcpServers;
    if (!servers || typeof servers !== 'object') continue;

    for (const [serverKey, serverVal] of Object.entries(servers)) {
      const env = (serverVal as { env?: Record<string, unknown> })?.env;
      const value = env?.MCP_STEERING_DIR;
      if (typeof value !== 'string') continue;

      const isStale =
        value.includes(STALE_STEERING_DIR_SEGMENT) &&
        !value.includes(EXPECTED_STEERING_DIR_SEGMENT);

      if (isStale) {
        findings.push({ configPath: rel, serverKey, currentValue: value });
      }
    }
  }

  return findings;
}

/** The package's MCP-config template, relative to the package root — the value a fresh `init`/`attach` writes. */
export const MCP_TEMPLATE_REL = 'src/cli/templates/mcp-config.json.template';

/**
 * The `MCP_STEERING_DIR` value the package's MCP template carries for the docs
 * server — read from the template itself, never a second hard-coded copy. `null`
 * when the template cannot be read (a damaged install): the caller then makes no
 * recommendation rather than guessing one.
 *
 * This module sits at `src/cli/sync/` (`dist/cli/sync/` packed) — THREE levels below
 * the package root — so it hands `resolvePackageRoot` its parent directory, which
 * satisfies that util's two-levels-down contract.
 */
export function templateSteeringDir(
  pkgRoot: string = resolvePackageRoot(path.join(__dirname, '..')),
): string | null {
  try {
    const template = JSON.parse(fs.readFileSync(path.join(pkgRoot, MCP_TEMPLATE_REL), 'utf-8')) as {
      mcpServers?: Record<string, { env?: Record<string, unknown> }>;
    };
    const value = template.mcpServers?.['designerpunk-docs']?.env?.MCP_STEERING_DIR;
    return typeof value === 'string' && value.length > 0 ? value : null;
  } catch {
    return null;
  }
}

/**
 * Compute the recommended value for a stale entry.
 *
 * - **Package-prefixed** (the value reaches into `node_modules/`, e.g.
 *   `./node_modules/@3fn/core/.kiro/steering`): swap the `.kiro/steering` segment for
 *   `governance`, keeping the prefix → `./node_modules/@3fn/core/governance`.
 * - **No package prefix** (the pre-123 `init` wrote the bare `./.kiro/steering`,
 *   pointing at the consumer's OWN copies): the swap would give `./governance`, a
 *   directory no consumer repo has — the docs MCP then indexes nothing. Recommend the
 *   template's value instead (`.kiro/issues/2026-10-02-sync-steering-dir-suggestion-writes-broken-path.md`).
 *   `null` when the template cannot be read.
 */
export function recommendedSteeringDir(
  currentValue: string,
  templateValue: string | null = templateSteeringDir(),
): string | null {
  if (currentValue.includes('node_modules/')) {
    return currentValue.replace(/\.kiro\/steering\/?$/, EXPECTED_STEERING_DIR_SEGMENT);
  }
  return templateValue;
}

/**
 * Report stale findings to the consumer and (interactively) offer to update them.
 * In dry-run / non-TTY mode this only reports. Returns the number of configs updated.
 */
export async function reportAndMaybeFixStaleSteeringDir(
  projectRoot: string,
  options: { dryRun: boolean },
  rl?: readline.Interface,
): Promise<number> {
  const findings = detectStaleSteeringDir(projectRoot);
  if (findings.length === 0) return 0;

  console.log(
    `\n⚠ MCP_STEERING_DIR points at the pre-119-A '.kiro/steering' location in ` +
      `${findings.length} config${findings.length === 1 ? '' : 's'}. ` +
      `The docs MCP now serves the relocated corpus from 'governance/'.`,
  );
  const templateValue = templateSteeringDir();
  let recommendable = 0;
  for (const f of findings) {
    const recommended = recommendedSteeringDir(f.currentValue, templateValue);
    if (recommended !== null) recommendable++;
    console.log(
      `    ${f.configPath} → ${f.serverKey}: "${f.currentValue}" ` +
        (recommended !== null
          ? `(recommended: "${recommended}")`
          : `(no recommendation: the installed @3fn/core's ${MCP_TEMPLATE_REL} could not be read)`),
    );
  }

  // Dry-run / non-interactive: advisory only. Nothing to offer when no entry has a recommendation.
  if (options.dryRun || !process.stdin.isTTY || recommendable === 0) {
    console.log(
      '    Update MCP_STEERING_DIR to the recommended value so the docs MCP indexes the relocated docs.',
    );
    return 0;
  }

  const ownRl = !rl;
  if (!rl) {
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  }

  let updated = 0;
  const answer = await new Promise<string>(resolve =>
    rl!.question(`\n  Update MCP_STEERING_DIR to the recommended value in the above config(s)? [Y/n]: `, resolve),
  );

  if (answer.toLowerCase().trim() !== 'n') {
    for (const f of findings) {
      if (applySteeringDirFix(projectRoot, f, templateValue)) updated++;
    }
    console.log(`  ✓ Updated MCP_STEERING_DIR in ${updated} config${updated === 1 ? '' : 's'}.`);
  } else {
    console.log('  ⏭ Left MCP_STEERING_DIR unchanged.');
  }

  if (ownRl) rl.close();
  return updated;
}

/**
 * Rewrite a single stale entry in place, preserving formatting as best we can
 * by parsing and re-serializing with 2-space indent. Writes nothing (returns
 * `false`) when there is no recommendation for the entry.
 *
 * @internal Exported for testing.
 */
export function applySteeringDirFix(
  projectRoot: string,
  finding: StaleSteeringDirFinding,
  templateValue: string | null = templateSteeringDir(),
): boolean {
  const abs = path.join(projectRoot, finding.configPath);
  try {
    const parsed = JSON.parse(fs.readFileSync(abs, 'utf-8'));
    const env = parsed?.mcpServers?.[finding.serverKey]?.env;
    if (!env || typeof env.MCP_STEERING_DIR !== 'string') return false;
    const recommended = recommendedSteeringDir(env.MCP_STEERING_DIR, templateValue);
    if (recommended === null) return false;
    env.MCP_STEERING_DIR = recommended;
    fs.writeFileSync(abs, JSON.stringify(parsed, null, 2) + '\n', 'utf-8');
    return true;
  } catch {
    return false;
  }
}
