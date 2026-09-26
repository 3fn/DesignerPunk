/**
 * GapDetector — validates component references against a catalog built from
 * component-meta.yaml files on disk.
 *
 * Root-set capable (issue 2026-09-26-product-server-component-root): the catalog is the
 * UNION of every root in a precedence-ordered root set (consumer first, package last —
 * the order `resolveComponentRoots` produces). This mirrors the pass-1 rule the
 * application server's ComponentIndexer follows (Spec 123 Task 1.4): in a born repo the
 * consumer's `src/components/` may hold nothing but a README, and the package root must
 * still count. A single string is the legacy single-root form.
 *
 * GapDetector answers "does this name exist anywhere?", so precedence does not change the
 * answer — the set is a union either way. The order is kept only for the legacy-level rule
 * below and for log readability.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md § "GapDetector Interface"
 */

import * as fs from 'fs';
import * as path from 'path';

const SERVER_NAME = 'mcp-product-server';

/** The pre-123 consumer layout level (Spec 123 L-D8): a `core/` directory holding component dirs. */
const LEGACY_LEVEL_DIR = 'core';

const META_FILE = 'component-meta.yaml';

/** Normalize the root set: accept a single root (legacy callers), resolve, dedupe, keep order. */
function normalizeRoots(componentDirs: string | string[]): string[] {
  const list = Array.isArray(componentDirs) ? componentDirs : [componentDirs];
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

export class GapDetector {
  private componentRoots: string[];
  private oneOffNames: Set<string>;
  private catalog = new Set<string>();

  /**
   * @param componentDirs the component root set in precedence order (consumer first,
   *   package last), or a single root (legacy form).
   */
  constructor(componentDirs: string | string[], oneOffNames: Set<string>) {
    this.componentRoots = normalizeRoots(componentDirs);
    this.oneOffNames = oneOffNames;
  }

  /**
   * Read component-meta.yaml files across the root set and build the name catalog (the union).
   * Gap detection is disabled only when NO root exists; a missing lower- or higher-precedence
   * root alongside an existing one is normal (e.g. an unborn repo has no consumer root).
   */
  loadCatalog(): void {
    this.catalog.clear();
    const existing = this.componentRoots.filter(r => fs.existsSync(r));
    if (existing.length === 0) {
      console.error(
        `[${SERVER_NAME}] Component directory not found: ${this.componentRoots.join(', ')} — gap detection disabled`
      );
      return;
    }

    const rootSet = new Set(this.componentRoots);
    for (const root of existing) {
      for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const dirPath = path.join(root, entry.name);

        if (entry.name === LEGACY_LEVEL_DIR) {
          // A `core/` that IS another root in the set (the steward repo: consumer
          // `src/components` + package `src/components/core`) is left to that root.
          if (rootSet.has(dirPath)) continue;
          // A `core/` that is not itself a component but holds components is ONE legacy
          // level (the pre-123 copy layout) — its components count with this root.
          if (!this.isComponentDir(dirPath)) {
            const nested = this.componentChildren(dirPath);
            if (nested.length > 0) {
              console.error(
                `[${SERVER_NAME}] Legacy component level: ${dirPath} holds ${nested.length} component(s) in the pre-123 'core/' layout — counted for gap detection; move them up to ${root}`
              );
              for (const name of nested) this.catalog.add(name);
              continue;
            }
          }
        }

        if (this.isComponentDir(dirPath)) {
          this.catalog.add(entry.name);
        }
      }
    }
  }

  /** Exact string match against catalog and one-offs. */
  check(componentName: string): 'ok' | 'not-found' {
    if (this.catalog.has(componentName)) return 'ok';
    if (this.oneOffNames.has(componentName)) return 'ok';
    return 'not-found';
  }

  getCatalogSize(): number {
    return this.catalog.size;
  }

  /** A component directory is recognized by its component-meta.yaml. */
  private isComponentDir(dirPath: string): boolean {
    return fs.existsSync(path.join(dirPath, META_FILE));
  }

  private componentChildren(dirPath: string): string[] {
    return fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(d => d.isDirectory() && this.isComponentDir(path.join(dirPath, d.name)))
      .map(d => d.name);
  }
}
