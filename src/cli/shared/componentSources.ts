/**
 * The component universe, resolved once (R1-7; `.kiro/issues/2026-10-15-123-u5-instrument-findings.md`).
 *
 * Given the component ROOT SET `resolveComponentRoots` (`./mcpDataRoots`) produces — the
 * consumer root first, the package's `src/components/core` last — this module answers
 * "which component directories make up this design system, and which one wins when two
 * declare the same component". It is the rule `ComponentIndexer.collectComponentSources`
 * applies at pass 1 in the Application MCP (Spec 123 C3, L-D2, L-D8), lifted out so that
 * `generate`'s token-index consumer map reads the SAME universe the MCP serves. Before it,
 * `generate` read only the consumer's own schemas (`resolveComponentSchemaDir`, retired),
 * so `get_component_full` (the union) and `get_token_consumers` (consumer only) disagreed
 * about which components exist.
 *
 * The rule:
 * - Roots are walked in precedence order; rank = the root's index (0 = highest).
 * - Under a root, every child directory is a candidate component directory, except a
 *   `core/` directory that is not itself a component directory but holds component
 *   directories: that is ONE legacy level (the pre-123 copy layout), whose components rank
 *   with the root that contains it. A `core/` directory that is itself another root in the
 *   set (the steward repo: `src/components/core` is the package root) is left to that root.
 * - A candidate's DECLARED name is its `contracts.yaml` `component` field; else its first
 *   `*.schema.yaml`'s `name`; else the directory name.
 * - Precedence keys on the declared name: the first candidate (highest rank) wins; a
 *   lower-ranked candidate with the same declared name is shadowed (a consumer's fork of a
 *   package component replaces it). Two candidates of the SAME rank with one declared name
 *   is a duplicate: the first wins, with a warning.
 *
 * ADOPTION STATUS: `generate` and the steward build (`scripts/generate-platform-tokens.ts`)
 * read through this module. `ComponentIndexer` still carries its private copy of the same
 * rule (its file is outside this module's owner's write scope); the parity test
 * `src/cli/__tests__/componentSources.test.ts` runs both over the same fixtures and fails if
 * they pick different winners, until the indexer adopts this module.
 *
 * NOT imported by `./mcpDataRoots`: this module needs `js-yaml`, and `mcpDataRoots` is
 * loaded from source by the application-mcp-server lane, which installs no root
 * dependencies.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/** The pre-123 consumer layout level: a `core/` directory holding component directories. */
export const LEGACY_LEVEL_DIR = 'core';

/** One component directory found in the root set. */
export interface ComponentSource {
  /** Absolute path to the component directory. */
  dirPath: string;
  /** The directory's own name. */
  dir: string;
  /** Index of the root it belongs to (0 = highest precedence). */
  rank: number;
  /** The root it belongs to (for a legacy-level component, the root that holds `core/`). */
  root: string;
  /** The declared component name precedence keys on. */
  declaredName: string;
  /** True when the directory sits in a legacy `core/` level under its root. */
  legacy: boolean;
}

/** The resolved component universe. */
export interface ComponentSourcesResult {
  /** The normalized root set (absolute, deduped), in precedence order. */
  roots: string[];
  /** One winner per declared name, in walk order (highest-precedence root first). */
  winners: ComponentSource[];
  /** Candidates that lost to a same-named winner. */
  shadowed: Array<{ source: ComponentSource; by: ComponentSource }>;
  /** Legacy-level and duplicate-name warnings, in the indexer's wording. */
  warnings: string[];
}

/** Resolve, dedupe and order a root set (a single root is the legacy single-root form). */
export function normalizeComponentRoots(componentRoots: string | string[]): string[] {
  const list = Array.isArray(componentRoots) ? componentRoots : [componentRoots];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const r of list) {
    if (!r) continue;
    const abs = path.resolve(r);
    if (seen.has(abs)) continue;
    seen.add(abs);
    out.push(abs);
  }
  return out;
}

/** A component directory holds a `*.schema.yaml` or a `contracts.yaml`. */
export function isComponentDir(dirPath: string): boolean {
  try {
    const files = fs.readdirSync(dirPath);
    return files.some(f => f.endsWith('.schema.yaml')) || files.includes('contracts.yaml');
  } catch {
    return false;
  }
}

function loadYamlObject(filePath: string): Record<string, unknown> | null {
  try {
    const raw = yaml.load(fs.readFileSync(filePath, 'utf-8'));
    return raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/**
 * The declared component name of a directory: the `contracts.yaml` `component` field; the
 * first `*.schema.yaml`'s `name` when there is none; the directory name as a last resort.
 */
export function declaredComponentName(dirPath: string): string {
  const contracts = loadYamlObject(path.join(dirPath, 'contracts.yaml'));
  const fromContracts = contracts ? String(contracts.component ?? '') : '';
  if (fromContracts) return fromContracts;
  try {
    const schemaFile = fs.readdirSync(dirPath).find(f => f.endsWith('.schema.yaml'));
    if (schemaFile) {
      const schema = loadYamlObject(path.join(dirPath, schemaFile));
      const fromSchema = schema ? String(schema.name ?? '') : '';
      if (fromSchema) return fromSchema;
    }
  } catch { /* fall through */ }
  return path.basename(dirPath);
}

/** Every candidate component directory across the root set, in precedence (walk) order. */
export function collectComponentSources(componentRoots: string | string[]): {
  roots: string[];
  sources: ComponentSource[];
  warnings: string[];
} {
  const roots = normalizeComponentRoots(componentRoots);
  const rootSet = new Set(roots);
  const sources: ComponentSource[] = [];
  const warnings: string[] = [];

  roots.forEach((root, rank) => {
    if (!fs.existsSync(root)) return;
    const children = fs.readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
    const legacyDirs: string[] = [];
    for (const dir of children) {
      const dirPath = path.join(root, dir);
      if (dir === LEGACY_LEVEL_DIR && !rootSet.has(dirPath)) {
        const nested = fs.readdirSync(dirPath, { withFileTypes: true })
          .filter(d => d.isDirectory() && isComponentDir(path.join(dirPath, d.name)))
          .map(d => d.name);
        if (nested.length > 0 && !isComponentDir(dirPath)) {
          legacyDirs.push(...nested);
          continue;
        }
      }
      if (dir === LEGACY_LEVEL_DIR && rootSet.has(dirPath)) continue;
      sources.push({ dirPath, dir, rank, root, declaredName: declaredComponentName(dirPath), legacy: false });
    }
    if (legacyDirs.length > 0) {
      const legacyRoot = path.join(root, LEGACY_LEVEL_DIR);
      warnings.push(
        `Legacy component level: ${legacyRoot} holds ${legacyDirs.length} component(s) in the pre-123 'core/' layout — indexed as one legacy level; move them up to ${root}`
      );
      for (const dir of legacyDirs) {
        const dirPath = path.join(legacyRoot, dir);
        sources.push({ dirPath, dir, rank, root, declaredName: declaredComponentName(dirPath), legacy: true });
      }
    }
  });

  return { roots, sources, warnings };
}

/** The component universe: one winner per declared name, consumer first. */
export function resolveComponentSources(componentRoots: string | string[]): ComponentSourcesResult {
  const { roots, sources, warnings } = collectComponentSources(componentRoots);
  const ownerByDeclaredName = new Map<string, ComponentSource>();
  const winners: ComponentSource[] = [];
  const shadowed: ComponentSourcesResult['shadowed'] = [];

  for (const source of sources) {
    const owner = ownerByDeclaredName.get(source.declaredName);
    if (owner) {
      if (owner.rank === source.rank) {
        warnings.push(
          `Duplicate declared component name ${source.declaredName}: ${source.dirPath} is shadowed by ${owner.dirPath}`
        );
      }
      shadowed.push({ source, by: owner });
      continue;
    }
    ownerByDeclaredName.set(source.declaredName, source);
    winners.push(source);
  }

  return { roots, winners, shadowed, warnings };
}
