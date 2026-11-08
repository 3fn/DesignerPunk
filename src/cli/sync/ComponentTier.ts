/**
 * What `sync` says about the component tier next to the name contract (Spec 129 U8, Req 5.4, 5.8).
 * REPORT ONLY: nothing here writes, and `sync` never runs `generate`.
 *
 * - **Freshness (R5, Req 5.8)**: the name contract reads the generated web CSS, so a clean report
 *   against output written before an upgrade is a false all-clear. This regenerates into a
 *   temporary directory and says so when the output on disk is not byte-identical to it
 *   (`../freshness`, by content, not by file times).
 * - **Names (Req 5.4)**: a primitive that DesignerPunk's component tokens read, which the
 *   consumer's generated output no longer defines on some platform, with the reference an upgrade
 *   introduced marked as such. Reads every platform's output (`../shared/componentTokenReferences`).
 *   The component tier is outside `NameContract.ts`'s P1 filter, which stays as it is.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { loadConfig, type ConfigModuleLoader } from '../../config/ConfigLoader';
import type { TsModuleLoader } from '../../config/scopedTsRequire';
import { checkGeneratedOutputFresh } from '../freshness';
import { findDesignSystemRoot } from '../shared/bornRepo';
import { resolveComponentRoots } from '../shared/mcpDataRoots';
import { resolveComponentSources } from '../shared/componentSources';
import { mergePackageComponentTokens, readPackageComponentTokenIndex } from '../shared/packageComponentTokens';
import {
  findMissingReferences,
  missingReferenceMessage,
  readDeclaredNames,
  readPackagePrimitiveNames,
  type ComponentTokenReference,
} from '../shared/componentTokenReferences';

export interface ComponentTierOutcome {
  /** The generated output is not what `generate` would write now. */
  stale: boolean;
  /** Primitives DesignerPunk's component tokens read that the generated output does not define. */
  missing: number;
  lines: string[];
}

/** Row: the generated output is behind its inputs. Names how, so a reader can tell upgrade from edit. */
export function staleOutputMessage(outputDirDisplay: string, differing: readonly string[], missing: readonly string[]): string {
  const shown = (xs: readonly string[]) => xs.slice(0, 3).join(', ') + (xs.length > 3 ? `, and ${xs.length - 3} more` : '');
  const parts = [
    differing.length > 0 ? `${differing.length} file${differing.length === 1 ? '' : 's'} differ (${shown(differing)})` : '',
    missing.length > 0 ? `${missing.length} not written yet (${shown(missing)})` : '',
  ].filter(Boolean);
  return (
    `your generated token output in ${outputDirDisplay} is not what \`npx designerpunk generate\` would write now: ${parts.join('; ')}. ` +
    `The name contract above was read from that older output, so its answer may not hold. Run \`npx designerpunk generate\` and \`sync\` again.`
  );
}

export function freshnessNotCheckedMessage(reason: string): string {
  return `not checked: whether your generated output matches what \`generate\` would write now (${reason}). Run \`npx designerpunk generate\` to be sure.`;
}

export async function componentTierSection(
  projectRoot: string,
  pkgRoot: string,
  opts: { configLoader?: ConfigModuleLoader; tsLoader?: TsModuleLoader } = {},
): Promise<ComponentTierOutcome> {
  const lines: string[] = [];
  let stale = false;
  let missingCount = 0;

  const fresh = await checkGeneratedOutputFresh({ projectRoot, configLoader: opts.configLoader, tsLoader: opts.tsLoader });
  let config;
  try {
    const dsRoot = findDesignSystemRoot(projectRoot);
    config = opts.configLoader ? await loadConfig(dsRoot.root ?? projectRoot, opts.configLoader) : await loadConfig(dsRoot.root ?? projectRoot);
  } catch {
    return { stale: false, missing: 0, lines };
  }
  const display = (abs: string) => { const r = path.relative(projectRoot, abs).split(path.sep).join('/'); return r === '' ? '.' : r.startsWith('..') ? abs : r; };

  if (fresh.state === 'stale') {
    stale = true;
    lines.push(staleOutputMessage(display(config.outputDir), fresh.differing, fresh.missing));
  } else if (fresh.state === 'cannot-check') {
    lines.push(freshnessNotCheckedMessage(fresh.reason));
  }

  // Names: the references the installed package's component tokens would put in the consumer's index.
  const dsRoot = findDesignSystemRoot(projectRoot);
  const shipped = readPackageComponentTokenIndex(pkgRoot);
  const primitives = readPackagePrimitiveNames(pkgRoot);
  if (shipped.index && primitives.names) {
    const indexFile = path.join(dsRoot.root ?? projectRoot, 'token-index', 'components.yaml');
    let indexed: Record<string, Record<string, unknown>> = {};
    try { indexed = (yaml.load(fs.readFileSync(indexFile, 'utf-8')) as { tokens?: Record<string, Record<string, unknown>> } | null)?.tokens ?? {}; } catch { /* no index yet */ }
    const tagged = (e: Record<string, unknown> | undefined) => Boolean(e && e.source && typeof e.source === 'object');
    const own = new Set(Object.keys(indexed).filter(n => !tagged(indexed[n])));
    const ownGroups = new Set(Array.from(own).map(n => indexed[n]?.component).filter((g): g is string => typeof g === 'string'));
    const expected = mergePackageComponentTokens(
      shipped.index,
      resolveComponentSources(resolveComponentRoots({ dsRoot, packageRoot: pkgRoot }).roots),
      own,
      ownGroups,
    );
    const references: ComponentTokenReference[] = [];
    const introduced = new Map<string, boolean>();
    for (const m of expected) {
      const value = (m.entry.primitiveReferences as { value?: unknown } | undefined)?.value;
      if (typeof value !== 'string' || !primitives.names.has(value)) continue;
      references.push({ token: m.name, primitive: value });
      const before = (indexed[m.name]?.primitiveReferences as { value?: unknown } | undefined)?.value;
      introduced.set(`${m.name}\u0000${value}`, before !== value && Object.keys(indexed).length > 0);
    }
    const missing = findMissingReferences(references, readDeclaredNames(config.outputDir), primitives.names);
    missingCount = missing.length;
    const tierPath = `${display(config.tokenSourceRoot)}/`;
    for (const m of missing) {
      const added = m.tokens.filter(t => introduced.get(`${t}\u0000${m.primitive}`));
      lines.push(missingReferenceMessage(m, tierPath, added.length > 0 ? { by: `${shipped.index.name} ${shipped.index.version}`, tokens: added } : undefined));
    }
  }
  return { stale, missing: missingCount, lines };
}
