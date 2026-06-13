/**
 * TokenIndexReader — reads token-index YAML files and returns platform paths + metadata.
 *
 * Build-time reader for the product token generator. Returns the platform-specific
 * access path and themeVarying status for any canonical token name.
 *
 * @see .kiro/specs/109-product-tokens-validation-generation/design.md § "TokenIndexReader"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface IndexEntry {
  platforms: { web: string; ios: string; android: string };
  themeVarying: boolean;
  family?: string;
  category?: string;
  component?: string;
}

export class TokenIndexReader {
  private entries = new Map<string, IndexEntry>();
  private tokenIndexDir: string;

  constructor(tokenIndexDir: string) {
    this.tokenIndexDir = tokenIndexDir;
  }

  load(): void {
    this.entries.clear();
    if (!fs.existsSync(this.tokenIndexDir)) return;

    this.loadFile('primitives.yaml', (key, entry) => {
      this.entries.set(key, {
        platforms: entry.platforms || {},
        themeVarying: false,
        family: entry.family,
      });
    });

    this.loadFile('semantics.yaml', (key, entry) => {
      this.entries.set(key, {
        platforms: entry.platforms || {},
        themeVarying: entry.themeVarying || false,
        category: entry.category,
      });
    });

    this.loadFile('components.yaml', (key, entry) => {
      this.entries.set(key, {
        platforms: entry.platforms || {},
        themeVarying: false,
        component: entry.component,
      });
    });
  }

  lookup(canonicalName: string): IndexEntry | null {
    return this.entries.get(canonicalName) || null;
  }

  private loadFile(filename: string, handler: (key: string, entry: any) => void): void {
    const filePath = path.join(this.tokenIndexDir, filename);
    if (!fs.existsSync(filePath)) return;
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = yaml.load(content) as { tokens?: Record<string, unknown> };
      if (data?.tokens) {
        for (const [key, entry] of Object.entries(data.tokens)) {
          handler(key, entry);
        }
      }
    } catch {
      // Silently skip unparseable files
    }
  }
}
