/**
 * ProductTokenGenerator — reads product token YAML, resolves refs, produces ResolvedCategory[].
 *
 * Build-time generator that transforms product/tokens/*.yaml into platform-ready data.
 * Platform emitters (Task 3) consume the ResolvedCategory[] output.
 *
 * @see .kiro/specs/109-product-tokens-validation-generation/design.md § "ProductTokenGenerator"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { TokenIndexReader, IndexEntry } from './TokenIndexReader';

export interface ResolvedToken {
  name: string;
  value: number | string | null;
  unitType: string | null;
  ref: string | null;
  resolvedPlatformPath: { web: string; ios: string; android: string } | null;
  themeVarying: boolean;
  description: string;
  platforms: string[];
}

export interface ResolvedCategory {
  name: string;
  description: string;
  tokens: ResolvedToken[];
}

export interface BrokenRef {
  token: string;
  ref: string;
  file: string;
}

/** A product token whose `ref` names a composite (typography, shadow, motion): refused, with the token named. */
export interface CompositeRef {
  token: string;
  ref: string;
  file: string;
  message: string;
}

export interface ValidationResult {
  categories: { file: string; tokenCount: number; valid: boolean }[];
  brokenRefs: BrokenRef[];
  compositeRefs: CompositeRef[];
}

export interface GeneratorConfig {
  productTokensDir: string;
  tokenIndexDir: string;
  outputDir: string;
  configName: string;
  configAbbreviation: string;
}

export interface GenerationResult {
  tokenCount: number;
  categoryCount: number;
  brokenRefs: BrokenRef[];
  compositeRefs: CompositeRef[];
  categories: ResolvedCategory[];
}

const ALL_PLATFORMS = ['web', 'ios', 'android'];

export class ProductTokenGenerator {
  private config: GeneratorConfig;
  private reader: TokenIndexReader;

  constructor(config: GeneratorConfig) {
    this.config = config;
    this.reader = new TokenIndexReader(config.tokenIndexDir);
  }

  generate(): GenerationResult {
    this.reader.load();
    const categories: ResolvedCategory[] = [];
    const brokenRefs: BrokenRef[] = [];
    const compositeRefs: CompositeRef[] = [];

    if (!fs.existsSync(this.config.productTokensDir)) {
      return { tokenCount: 0, categoryCount: 0, brokenRefs: [], compositeRefs: [], categories: [] };
    }

    const files = fs.readdirSync(this.config.productTokensDir).filter(f => f.endsWith('.yaml'));
    for (const file of files) {
      const result = this.parseCategory(path.join(this.config.productTokensDir, file), file);
      if (result) {
        categories.push(result.category);
        brokenRefs.push(...result.brokenRefs);
        compositeRefs.push(...result.compositeRefs);
      }
    }

    const tokenCount = categories.reduce((sum, c) => sum + c.tokens.length, 0);
    return { tokenCount, categoryCount: categories.length, brokenRefs, compositeRefs, categories };
  }

  validate(): ValidationResult {
    this.reader.load();
    const results: ValidationResult = { categories: [], brokenRefs: [], compositeRefs: [] };

    if (!fs.existsSync(this.config.productTokensDir)) return results;

    const files = fs.readdirSync(this.config.productTokensDir).filter(f => f.endsWith('.yaml'));
    for (const file of files) {
      const result = this.parseCategory(path.join(this.config.productTokensDir, file), file);
      if (result) {
        const fileBrokenRefs = result.brokenRefs;
        results.categories.push({
          file,
          tokenCount: result.category.tokens.length,
          valid: fileBrokenRefs.length === 0 && result.compositeRefs.length === 0,
        });
        results.brokenRefs.push(...fileBrokenRefs);
        results.compositeRefs.push(...result.compositeRefs);
      } else {
        results.categories.push({ file, tokenCount: 0, valid: true });
      }
    }

    return results;
  }

  private parseCategory(filePath: string, filename: string): { category: ResolvedCategory; brokenRefs: BrokenRef[]; compositeRefs: CompositeRef[] } | null {
    let data: any;
    try {
      data = yaml.load(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      return null;
    }

    if (!data || !data.tokens) return null;

    const categoryName = filename.replace('.yaml', '');
    const tokens: ResolvedToken[] = [];
    const brokenRefs: BrokenRef[] = [];
    const compositeRefs: CompositeRef[] = [];

    for (const [name, entry] of Object.entries(data.tokens as Record<string, any>)) {
      const platforms: string[] = entry.platforms || ALL_PLATFORMS;
      let resolvedPlatformPath: { web: string; ios: string; android: string } | null = null;
      let themeVarying = false;

      if (entry.ref) {
        const indexEntry = this.reader.lookup(entry.ref);
        if (indexEntry?.composite) {
          // A composite has no single value to read on any platform: refused, naming the token.
          compositeRefs.push({
            token: name,
            ref: entry.ref,
            file: filename,
            message: `Product token '${name}' (${filename}) refs '${entry.ref}', a composite token (typography, shadow or motion). ` +
              `A product token can ref a single-value token; give '${name}' the composite's members as separate tokens instead.`,
          });
        } else if (indexEntry) {
          resolvedPlatformPath = indexEntry.platforms;
          themeVarying = indexEntry.themeVarying;
        } else {
          brokenRefs.push({ token: name, ref: entry.ref, file: filename });
        }
      }

      tokens.push({
        name,
        value: entry.value ?? null,
        unitType: entry.unitType ?? null,
        ref: entry.ref ?? null,
        resolvedPlatformPath,
        themeVarying,
        description: entry.description || '',
        platforms,
      });
    }

    return {
      category: { name: categoryName, description: data.description || '', tokens },
      brokenRefs,
      compositeRefs,
    };
  }
}
