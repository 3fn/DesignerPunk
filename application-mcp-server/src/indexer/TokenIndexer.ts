/**
 * Token Indexer
 *
 * Loads the build-time token index (primitives.yaml, semantics.yaml, components.yaml)
 * and provides search, detail, family, and consumer lookup queries.
 *
 * @see .kiro/specs/096-mcp-infrastructure-for-products/design.md
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface TokenIndexEntry {
  name: string;
  tier: 'primitive' | 'semantic' | 'component';
  family?: string;
  category?: string;
  component?: string;
  value: string | number;
  formula?: string;
  primitiveReferences?: Record<string, string>;
  themeVarying?: boolean;
  platforms: { web: string; ios: string; android: string };
  consumers?: string[];
}

export interface TokenConsumer {
  component: string;
  context: string;
}

export interface TokenHealth {
  primitives: number;
  semantics: number;
  componentTokens: number;
}

export class TokenIndexer {
  private primitives = new Map<string, TokenIndexEntry>();
  private semantics = new Map<string, TokenIndexEntry>();
  private componentTokens = new Map<string, TokenIndexEntry>();
  private consumerIndex = new Map<string, string[]>();
  private warnings: string[] = [];

  async indexTokens(tokenIndexDir: string): Promise<void> {
    this.primitives.clear();
    this.semantics.clear();
    this.componentTokens.clear();
    this.consumerIndex.clear();
    this.warnings = [];

    if (!fs.existsSync(tokenIndexDir)) {
      this.warnings.push(`Token index directory not found: ${tokenIndexDir}`);
      return;
    }

    this.loadTier(path.join(tokenIndexDir, 'primitives.yaml'), 'primitive', this.primitives);
    this.loadTier(path.join(tokenIndexDir, 'semantics.yaml'), 'semantic', this.semantics);
    this.loadTier(path.join(tokenIndexDir, 'components.yaml'), 'component', this.componentTokens);

    this.buildConsumerIndex();
  }

  search(params: { family?: string; tier?: string; name?: string }): TokenIndexEntry[] {
    let results: TokenIndexEntry[] = [];

    const maps = this.getMapsForTier(params.tier);
    for (const map of maps) {
      for (const entry of Array.from(map.values())) {
        results.push(entry);
      }
    }

    if (params.family) {
      const f = params.family.toLowerCase();
      results = results.filter(e => (e.family || e.category || '').toLowerCase() === f);
    }
    if (params.name) {
      const n = params.name.toLowerCase();
      results = results.filter(e => e.name.toLowerCase().includes(n));
    }

    return results;
  }

  getDetails(name: string): TokenIndexEntry | null {
    return this.primitives.get(name) || this.semantics.get(name) || this.componentTokens.get(name) || null;
  }

  getFamily(family: string): TokenIndexEntry[] {
    const f = family.toLowerCase();
    const results: TokenIndexEntry[] = [];
    for (const map of [this.primitives, this.semantics, this.componentTokens]) {
      for (const entry of Array.from(map.values())) {
        if ((entry.family || entry.category || '').toLowerCase() === f) {
          results.push(entry);
        }
      }
    }
    return results;
  }

  getConsumers(token: string): TokenConsumer[] {
    const consumers = this.consumerIndex.get(token) || [];
    return consumers.map(c => ({ component: c, context: `references ${token}` }));
  }

  getHealth(): TokenHealth {
    return {
      primitives: this.primitives.size,
      semantics: this.semantics.size,
      componentTokens: this.componentTokens.size,
    };
  }

  getWarnings(): string[] {
    return this.warnings;
  }

  // --- Private ---

  private loadTier(filePath: string, tier: 'primitive' | 'semantic' | 'component', map: Map<string, TokenIndexEntry>): void {
    if (!fs.existsSync(filePath)) return;

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = yaml.load(content) as { tokens?: Record<string, any> };
      if (!data?.tokens) return;

      for (const [name, entry] of Object.entries(data.tokens)) {
        map.set(name, { name, tier, ...entry });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.warnings.push(`Failed to parse ${filePath}: ${msg}`);
    }
  }

  private buildConsumerIndex(): void {
    for (const map of [this.primitives, this.semantics, this.componentTokens]) {
      for (const entry of Array.from(map.values())) {
        if (!entry.consumers) continue;
        for (const component of entry.consumers) {
          const existing = this.consumerIndex.get(entry.name) || [];
          if (!existing.includes(component)) existing.push(component);
          this.consumerIndex.set(entry.name, existing);
        }
      }
    }
  }

  private getMapsForTier(tier?: string): Map<string, TokenIndexEntry>[] {
    if (!tier) return [this.primitives, this.semantics, this.componentTokens];
    switch (tier.toLowerCase()) {
      case 'primitive': return [this.primitives];
      case 'semantic': return [this.semantics];
      case 'component': return [this.componentTokens];
      default: return [this.primitives, this.semantics, this.componentTokens];
    }
  }
}
