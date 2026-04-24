/**
 * GapDetector — validates component references against a catalog built from
 * component-meta.yaml files on disk.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md § "GapDetector Interface"
 */

import * as fs from 'fs';
import * as path from 'path';

const SERVER_NAME = 'mcp-product-server';

export class GapDetector {
  private componentDir: string;
  private oneOffNames: Set<string>;
  private catalog = new Set<string>();

  constructor(componentDir: string, oneOffNames: Set<string>) {
    this.componentDir = componentDir;
    this.oneOffNames = oneOffNames;
  }

  /** Read component-meta.yaml files from componentDir and build name catalog. */
  loadCatalog(): void {
    this.catalog.clear();
    if (!fs.existsSync(this.componentDir)) {
      console.error(
        `[${SERVER_NAME}] Component directory not found: ${this.componentDir} — gap detection disabled`
      );
      return;
    }

    for (const entry of fs.readdirSync(this.componentDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const metaPath = path.join(this.componentDir, entry.name, 'component-meta.yaml');
      if (fs.existsSync(metaPath)) {
        this.catalog.add(entry.name);
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
}
