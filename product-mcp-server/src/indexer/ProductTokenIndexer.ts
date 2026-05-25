/**
 * ProductTokenIndexer — parses product/tokens/*.yaml, validates entries, resolves refs.
 *
 * @see .kiro/specs/108-product-tokens-source-format/design.md § "ProductTokenIndexer"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { TokenRefResolver } from './TokenRefResolver';
import type { ProductTokenEntry, ProductTokenCategory, ProductTokenHealth } from '../models';

const ALL_PLATFORMS = ['web', 'ios', 'android'];
const WEB_ONLY_UNIT_TYPES = ['ch'];

export class ProductTokenIndexer {
  private categories: ProductTokenCategory[] = [];
  private errors: string[] = [];
  private warnings: string[] = [];
  private resolver: TokenRefResolver;

  constructor(tokenIndexDir: string | undefined) {
    this.resolver = new TokenRefResolver(tokenIndexDir);
  }

  index(tokensDir: string): void {
    this.categories = [];
    this.errors = [];
    this.warnings = [];
    this.resolver.load();

    if (!fs.existsSync(tokensDir)) return;

    const files = fs.readdirSync(tokensDir).filter(f => f.endsWith('.yaml'));
    for (const file of files) {
      this.indexCategoryFile(path.join(tokensDir, file), file);
    }
  }

  query(filters: { category?: string; name?: string; platform?: string; promotionCandidate?: boolean }): {
    categories: ProductTokenCategory[];
    warnings: string[];
  } {
    let result = this.categories;

    if (filters.category) {
      result = result.filter(c => c.name === filters.category);
    }

    if (filters.name || filters.platform || filters.promotionCandidate !== undefined) {
      result = result.map(cat => {
        let tokens = cat.tokens;
        if (filters.name) tokens = tokens.filter(t => t.name === filters.name);
        if (filters.platform) tokens = tokens.filter(t => t.platforms.includes(filters.platform!));
        if (filters.promotionCandidate !== undefined) tokens = tokens.filter(t => t.promotionCandidate === filters.promotionCandidate);
        return tokens.length > 0 ? { ...cat, tokens } : null;
      }).filter((c): c is ProductTokenCategory => c !== null);
    }

    return { categories: result, warnings: this.warnings };
  }

  getHealth(): ProductTokenHealth {
    const tokenCount = this.categories.reduce((sum, c) => sum + c.tokens.length, 0);
    return {
      tokenCount,
      categoryCount: this.categories.length,
      errorCount: this.errors.length,
      warningCount: this.warnings.length,
      errors: this.errors,
      warnings: this.warnings,
    };
  }

  private indexCategoryFile(filePath: string, filename: string): void {
    const categoryName = filename.replace('.yaml', '');

    // Category filename validation
    if (!/^[a-z]([a-z\-]*[a-z])?$/.test(categoryName)) {
      this.errors.push(`Category '${categoryName}' must be lowercase ASCII letters and hyphens only (a-z, -).`);
      return;
    }

    let data: any;
    try {
      data = yaml.load(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      this.errors.push(`Failed to parse ${filename}: ${err instanceof Error ? err.message : String(err)}`);
      return;
    }

    if (!data || typeof data !== 'object') return;

    // Category field mismatch
    if (data.category && data.category !== categoryName) {
      this.errors.push(`Category field '${data.category}' does not match filename '${categoryName}'.`);
      return;
    }

    const description = data.description || '';
    const tokens: ProductTokenEntry[] = [];

    if (data.tokens && typeof data.tokens === 'object') {
      for (const [name, entry] of Object.entries(data.tokens)) {
        const token = this.validateAndBuildToken(name, entry as any, categoryName);
        if (token) tokens.push(token);
      }
    }

    if (tokens.length > 0 || Object.keys(data.tokens || {}).length === 0) {
      this.categories.push({ name: categoryName, description, tokens });
    } else if (tokens.length > 0) {
      this.categories.push({ name: categoryName, description, tokens });
    } else {
      // Category has tokens but all errored — still register category with empty tokens
      this.categories.push({ name: categoryName, description, tokens });
    }
  }

  private validateAndBuildToken(name: string, entry: any, categoryName: string): ProductTokenEntry | null {
    const tokenErrors: string[] = [];

    // camelCase validation
    if (!/^[a-z][a-zA-Z0-9]*$/.test(name)) {
      tokenErrors.push(`Token '${name}' must be camelCase (e.g., 'contentMaxWidth'). Product tokens are platform-agnostic source definitions — the generation pipeline handles platform-specific naming.`);
    }

    // description required
    if (!entry || !entry.description) {
      tokenErrors.push(`Token '${name}' is missing required 'description' field.`);
    }

    if (!entry || typeof entry !== 'object') {
      this.errors.push(...tokenErrors);
      return null;
    }

    const hasValue = entry.value != null;
    const hasRef = entry.ref != null;

    // Mutual exclusivity
    if (hasValue && hasRef) {
      tokenErrors.push(`Token '${name}' has both value and ref. Use one.`);
    }
    if (!hasValue && !hasRef) {
      tokenErrors.push(`Token '${name}' has neither value nor ref.`);
    }

    // Hard value requirements
    if (hasValue) {
      if (!entry.unitType) {
        tokenErrors.push(`Token '${name}' has value without unitType.`);
      }
      if (!entry.rationale) {
        tokenErrors.push(`Token '${name}' has hard value without rationale.`);
      }
    }

    // Platform-limited unitType check
    const platforms: string[] = entry.platforms || ALL_PLATFORMS;
    if (entry.unitType && WEB_ONLY_UNIT_TYPES.includes(entry.unitType)) {
      const nonWeb = platforms.filter(p => p !== 'web');
      if (nonWeb.length > 0) {
        tokenErrors.push(`Token '${name}' uses unitType '${entry.unitType}' which is not available on platform '${nonWeb[0]}'.`);
      }
    }

    // If structural errors, exclude token
    if (tokenErrors.length > 0) {
      this.errors.push(...tokenErrors);
      return null;
    }

    // Ref resolution (warning, not error)
    let resolvedValue: number | string | null = null;
    let resolvedUnitType: string | null = null;
    let resolutionDepth: 'full' | 'partial' | null = null;
    let themeVarying = false;

    if (hasRef) {
      const resolved = this.resolver.resolve(entry.ref);
      if (resolved) {
        resolvedValue = resolved.value;
        resolvedUnitType = resolved.unitType;
        resolutionDepth = resolved.depth;
        themeVarying = resolved.themeVarying;
      } else {
        this.warnings.push(`Token '${name}' references '${entry.ref}' which is not in token-index — verify index is current (\`npx designerpunk generate\`).`);
      }
    }

    return {
      name,
      value: hasValue ? entry.value : null,
      unitType: hasValue ? entry.unitType : null,
      ref: hasRef ? entry.ref : null,
      resolvedValue,
      resolvedUnitType,
      resolutionDepth,
      description: entry.description,
      rationale: entry.rationale || null,
      usage: entry.usage || null,
      platforms,
      promotionCandidate: entry.promotionCandidate || false,
      themeVarying,
    };
  }
}
