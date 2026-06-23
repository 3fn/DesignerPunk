/**
 * Component Indexer
 *
 * Scans component directories, parses source files, assembles metadata,
 * and maintains the in-memory index. Integrates InheritanceResolver for
 * contract merging.
 *
 * @see .kiro/specs/064-component-metadata-schema/design.md — Requirements 1.1–1.4
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  ComponentMetadata,
  ComponentCatalogEntry,
  IndexHealth,
  ResolvedContracts,
  ExperiencePattern,
  PatternCatalogEntry,
  FamilyGuidance,
  LayoutTemplate,
  LayoutTemplateCatalogEntry,
  PlatformReadiness,
  PlatformReadinessStatus,
} from '../models';
import { parseSchemaYaml, parseContractsYaml, parseComponentMetaYaml, ParsedContracts, ParsedSchemaReadiness } from './parsers';
import { resolveInheritance, validateOmits } from './InheritanceResolver';
import { deriveContractTokenRelationships } from './ContractTokenDeriver';
import { PatternIndexer } from './PatternIndexer';
import { FamilyGuidanceIndexer } from './FamilyGuidanceIndexer';
import { LayoutTemplateIndexer } from './LayoutTemplateIndexer';
import { TokenIndexer } from './TokenIndexer';
import { ModeClassifier } from './ModeClassifier';

// ---------------------------------------------------------------------------
// Keyword index structures (Task 2 — Spec 121)
// ---------------------------------------------------------------------------

/**
 * Per-component tokenized keyword index, auto-derived at build time.
 * Grouped by signal class per the Components rubric in discovery-confidence-rubric.md.
 */
export interface ComponentKeywordEntry {
  /** High-signal: tokenized name, tokenized family, purpose, contract concept/category names */
  highSignal: Set<string>;
  /** Low-signal: whenToUse, contexts, alternatives[].reason, description */
  lowSignal: Set<string>;
  /** Optional reactive aliases — absence must not block auto-derived matching (Req 1.9) */
  aliases?: Set<string>;
}

export type KeywordIndex = Map<string, ComponentKeywordEntry>;

/**
 * Tokenize a string: split on whitespace / camelCase / hyphen / punctuation; lowercase.
 * Term-level, NOT substring — required by Req 1.3.
 * E.g. "primary action button"          → ["primary", "action", "button"]
 *      "Button-CTA"                      → ["button", "cta"]
 *      "whenToUse"                       → ["when", "to", "use"]
 *      "registration, login, or contact" → ["registration", "login", "or", "contact"]
 */
export function tokenizeString(input: string): string[] {
  if (!input) return [];
  // 1. Split on hyphens and underscores
  // 2. Split camelCase: insert space before uppercase letters preceded by lowercase
  // 3. Split on remaining whitespace
  // 4. Strip leading/trailing punctuation from each token
  // 5. Lowercase, filter empty
  const dehyphenated = input.replace(/[-_]+/g, ' ');
  const decameled = dehyphenated.replace(/([a-z])([A-Z])/g, '$1 $2');
  return decameled
    .split(/\s+/)
    .map(t => t.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').toLowerCase())
    .filter(t => t.length > 0);
}

export class ComponentIndexer {
  private index = new Map<string, ComponentMetadata>();
  private contractsCache = new Map<string, ParsedContracts>();
  private patternIndexer = new PatternIndexer();
  private guidanceIndexer = new FamilyGuidanceIndexer();
  private layoutTemplateIndexer = new LayoutTemplateIndexer();
  private tokenIndexer = new TokenIndexer();
  private modeClassifier = new ModeClassifier();
  private lastIndexTime = '';
  private lastIndexTimeMs = 0;
  private indexWarnings: string[] = [];
  private dataDirs: string[] = [];
  /** Keyword index built at index time — Task 2, Spec 121 */
  private keywordIndex: KeywordIndex = new Map();

  /**
   * Scan component directories and build initial index.
   */
  async indexComponents(
    componentsDir: string,
    patternsDir?: string,
    templatesDir?: string,
    guidanceDir?: string,
    tokenIndexDir?: string
  ): Promise<void> {
    this.index.clear();
    this.contractsCache.clear();
    this.keywordIndex.clear();
    this.indexWarnings = [];
    this.dataDirs = [componentsDir, patternsDir, templatesDir, guidanceDir, tokenIndexDir].filter(Boolean) as string[];

    if (!fs.existsSync(componentsDir)) {
      this.indexWarnings.push(`Components directory not found: ${componentsDir}`);
      this.lastIndexTime = new Date().toISOString();
      return;
    }

    const dirs = fs.readdirSync(componentsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    // First pass: parse all contracts (needed for inheritance resolution)
    for (const dir of dirs) {
      const contractsPath = path.join(componentsDir, dir, 'contracts.yaml');
      const contractsResult = parseContractsYaml(contractsPath);
      if (contractsResult.data) {
        this.contractsCache.set(contractsResult.data.component, contractsResult.data);
      }
    }

    // Load mode classifier (reads SemanticOverrides.ts for Level 2 keys)
    const projectRoot = path.resolve(componentsDir, '..', '..', '..');
    this.modeClassifier.load(projectRoot);

    // Second pass: assemble full metadata
    for (const dir of dirs) {
      this.assembleComponent(componentsDir, dir);
    }

    // Third pass: resolve composed tokens (needs all components indexed first)
    this.resolveComposedTokens();

    // Index experience patterns
    const effectivePatternsDir = patternsDir || path.resolve(componentsDir, '..', '..', '..', 'experience-patterns');
    await this.patternIndexer.indexPatterns(effectivePatternsDir);

    // Index layout templates
    const effectiveTemplatesDir = templatesDir || path.resolve(componentsDir, '..', '..', '..', 'layout-templates');
    await this.layoutTemplateIndexer.indexTemplates(effectiveTemplatesDir);

    // Index family guidance (must run after components and patterns for cross-reference validation)
    const effectiveGuidanceDir = guidanceDir || path.resolve(componentsDir, '..', '..', '..', 'family-guidance');
    await this.guidanceIndexer.indexGuidance(effectiveGuidanceDir);

    // Cross-reference validation (components + patterns must be indexed first)
    const componentNames = new Set(Array.from(this.index.keys()));
    const patternNames = new Set(this.patternIndexer.getCatalog().map(p => p.name));
    this.guidanceIndexer.validateCrossReferences(componentNames, patternNames, projectRoot);

    // Index token data (if token index directory exists)
    if (tokenIndexDir) {
      await this.tokenIndexer.indexTokens(tokenIndexDir);
    }

    this.lastIndexTime = new Date().toISOString();
    this.lastIndexTimeMs = this.computeMaxMtime();
  }

  /** Compute the maximum mtime across all tracked files. */
  private computeMaxMtime(): number {
    let max = 0;
    for (const dir of this.dataDirs) {
      if (!fs.existsSync(dir)) continue;
      this.walkMaxMtime(dir, (mtime) => { if (mtime > max) max = mtime; });
    }
    return max || Date.now();
  }

  private walkMaxMtime(dir: string, cb: (mtime: number) => void): void {
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        this.walkMaxMtime(fullPath, cb);
      } else {
        try { cb(fs.statSync(fullPath).mtimeMs); } catch { /* skip */ }
      }
    }
  }

  /**
   * Re-index a single component after file change.
   */
  async reindexComponent(componentDir: string): Promise<void> {
    const dir = path.basename(componentDir);
    const componentsDir = path.dirname(componentDir);

    // Re-parse contracts for cache
    const contractsPath = path.join(componentDir, 'contracts.yaml');
    const contractsResult = parseContractsYaml(contractsPath);
    if (contractsResult.data) {
      this.contractsCache.set(contractsResult.data.component, contractsResult.data);
    }

    // Remove old entry (might have different name)
    for (const [name, meta] of this.index) {
      if (meta.name === dir || path.basename(componentDir) === dir) {
        this.index.delete(name);
        this.keywordIndex.delete(name);
        break;
      }
    }

    this.assembleComponent(componentsDir, dir);
    this.resolveComposedTokens();
    this.lastIndexTime = new Date().toISOString();
  }

  /** Re-index experience patterns from the given directory. */
  async reindexPatterns(patternsDir: string): Promise<void> {
    await this.patternIndexer.indexPatterns(patternsDir);
    this.lastIndexTime = new Date().toISOString();
    this.lastIndexTimeMs = this.computeMaxMtime();
  }

  /** Re-index layout templates from the given directory. */
  async reindexTemplates(templatesDir: string): Promise<void> {
    await this.layoutTemplateIndexer.indexTemplates(templatesDir);
    this.lastIndexTime = new Date().toISOString();
    this.lastIndexTimeMs = this.computeMaxMtime();
  }

  /** Re-index family guidance from the given directory. */
  async reindexGuidance(guidanceDir: string): Promise<void> {
    await this.guidanceIndexer.indexGuidance(guidanceDir);
    this.lastIndexTime = new Date().toISOString();
    this.lastIndexTimeMs = this.computeMaxMtime();
  }

  /** Re-index token data from the given directory. */
  async reindexTokens(tokenIndexDir: string): Promise<void> {
    await this.tokenIndexer.indexTokens(tokenIndexDir);
    this.lastIndexTime = new Date().toISOString();
    this.lastIndexTimeMs = this.computeMaxMtime();
  }

  /**
   * Get assembled metadata for a single component.
   */
  getComponent(name: string): ComponentMetadata | null {
    return this.index.get(name) ?? null;
  }

  /**
   * Get lightweight catalog of all components.
   */
  getCatalog(): ComponentCatalogEntry[] {
    return Array.from(this.index.values()).map(m => ({
      name: m.name,
      type: m.type,
      family: m.family,
      purpose: m.annotations?.purpose ?? null,
      readiness: m.readiness,
      platforms: m.platforms,
      contractCount: Object.keys(m.contracts.active).length,
    }));
  }

  /**
   * Get index health status.
   */
  getHealth(): IndexHealth {
    const count = this.index.size;
    const patternHealth = this.patternIndexer.getHealth();
    const guidanceHealth = this.guidanceIndexer.getHealth();
    const layoutHealth = this.layoutTemplateIndexer.getHealth();
    const tokenHealth = this.tokenIndexer.getHealth();
    const allWarnings = [...this.indexWarnings, ...patternHealth.warnings, ...guidanceHealth.warnings, ...layoutHealth.warnings, ...this.tokenIndexer.getWarnings()];
    const staleFiles = this.getStaleFiles();

    let status: 'healthy' | 'degraded' | 'failed';
    if (count === 0) {
      status = 'failed';
    } else if (staleFiles.length > 0 || allWarnings.length > 0) {
      status = 'degraded';
    } else {
      status = 'healthy';
    }

    return {
      status,
      componentsIndexed: count,
      patternsIndexed: patternHealth.patternsIndexed,
      guidanceFamiliesIndexed: guidanceHealth.familiesIndexed,
      layoutTemplatesIndexed: layoutHealth.templatesIndexed,
      tokensIndexed: tokenHealth,
      lastIndexTime: this.lastIndexTime,
      errors: [],
      warnings: allWarnings,
      staleFiles,
    };
  }

  /** Get files newer than lastIndexTime across all data directories. */
  getStaleFiles(): string[] {
    if (this.lastIndexTimeMs === 0) return [];
    const stale: string[] = [];
    for (const dir of this.dataDirs) {
      if (!fs.existsSync(dir)) continue;
      this.scanForStaleFiles(dir, stale);
    }
    return stale;
  }

  private scanForStaleFiles(dir: string, stale: string[]): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch { return; }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        this.scanForStaleFiles(fullPath, stale);
      } else if (entry.name.endsWith('.yaml') || entry.name.endsWith('.md') || entry.name.endsWith('.ts')) {
        try {
          if (fs.statSync(fullPath).mtimeMs > this.lastIndexTimeMs) {
            stale.push(fullPath);
          }
        } catch { /* skip */ }
      }
    }
  }

  /** Get a single experience pattern by name. */
  getPattern(name: string): ExperiencePattern | null {
    return this.patternIndexer.getPattern(name);
  }

  /** Get lightweight catalog of all experience patterns. */
  getPatternCatalog(): PatternCatalogEntry[] {
    return this.patternIndexer.getCatalog();
  }

  /** Get family guidance by family or component name. */
  getGuidance(familyOrComponent: string): FamilyGuidance | null {
    return this.guidanceIndexer.getGuidance(familyOrComponent);
  }

  /** Get all indexed guidance family names. */
  getGuidanceFamilies(): string[] {
    return this.guidanceIndexer.getAllFamilies();
  }

  /** Get a single layout template by name. */
  getLayoutTemplate(name: string): LayoutTemplate | null {
    return this.layoutTemplateIndexer.getTemplate(name);
  }

  /** Get lightweight catalog of all layout templates. */
  getLayoutTemplateCatalog(): LayoutTemplateCatalogEntry[] {
    return this.layoutTemplateIndexer.getCatalog();
  }

  /** Expose token indexer for tool handlers */
  getTokenIndexer(): TokenIndexer {
    return this.tokenIndexer;
  }

  /** Expose index for query engine */
  getIndex(): Map<string, ComponentMetadata> {
    return this.index;
  }

  /** Expose keyword index for query engine (Task 2, Spec 121) */
  getKeywordIndex(): KeywordIndex {
    return this.keywordIndex;
  }

  // ---------------------------------------------------------------------------
  // Private
  // ---------------------------------------------------------------------------

  private assembleComponent(componentsDir: string, dir: string): void {
    const dirPath = path.join(componentsDir, dir);

    // Find schema.yaml (named {ComponentName}.schema.yaml)
    const schemaFile = fs.readdirSync(dirPath).find(f => f.endsWith('.schema.yaml'));
    if (!schemaFile) {
      this.indexWarnings.push(`Component directory has no schema.yaml: ${dir}`);
      return;
    }

    const schemaResult = parseSchemaYaml(path.join(dirPath, schemaFile));
    if (!schemaResult.data) {
      if (schemaResult.warning) this.indexWarnings.push(schemaResult.warning);
      return;
    }
    const schema = schemaResult.data;

    // Parse contracts
    const contractsResult = parseContractsYaml(path.join(dirPath, 'contracts.yaml'));
    let contracts: ResolvedContracts;
    const warnings: string[] = [];

    if (contractsResult.data) {
      // Resolve inheritance
      let parent: ParsedContracts | null = null;
      let parentHasParent = false;
      if (contractsResult.data.inherits) {
        parent = this.contractsCache.get(contractsResult.data.inherits) ?? null;
        if (parent?.inherits) parentHasParent = true;
      }
      const resolved = resolveInheritance(contractsResult.data, parent, parentHasParent);
      contracts = resolved.contracts;
      warnings.push(...resolved.warnings);
    } else {
      if (contractsResult.warning) warnings.push(contractsResult.warning);
      contracts = { inheritsFrom: null, active: {}, excluded: {}, own: [], inherited: [] };
    }

    // Parse component-meta.yaml
    const metaResult = parseComponentMetaYaml(path.join(dirPath, 'component-meta.yaml'));
    // No warning for missing meta — expected for components without annotations yet

    // Validate omits against parent properties
    if (schema.omits.length > 0) {
      const parentName = contracts.inheritsFrom;
      const parentMeta = parentName ? this.index.get(parentName) : null;
      const omitsResult = validateOmits(
        schema.name,
        schema.omits,
        parentName,
        parentMeta?.properties ?? null,
      );
      warnings.push(...omitsResult.warnings);
    }

    // Assemble
    const metadata: ComponentMetadata = {
      name: schema.name,
      type: schema.type,
      family: schema.family,
      version: schema.version,
      readiness: this.derivePlatformReadiness(dirPath, schema.readiness),
      description: schema.description,
      platforms: schema.platforms,
      properties: schema.properties,
      tokens: schema.tokens,
      composition: schema.composition,
      omits: schema.omits,
      contracts,
      annotations: metaResult.data ? {
        purpose: metaResult.data.purpose,
        usage: metaResult.data.usage,
        contexts: metaResult.data.contexts,
        alternatives: metaResult.data.alternatives,
      } : null,
      contractTokenRelationships: deriveContractTokenRelationships(contracts, schema.tokens),
      resolvedTokens: { own: schema.tokens, composed: {} },
      tokenModeMap: this.modeClassifier.classifyAll(schema.tokens),
      indexedAt: new Date().toISOString(),
      warnings,
    };

    this.index.set(schema.name, metadata);

    // Build keyword index entry for this component (Task 2.1, Spec 121)
    this.buildKeywordEntry(schema.name, metadata);
  }

  /**
   * Build the per-component keyword index entry.
   * Auto-derived from existing metadata at index-build time (Req 1.8).
   * Grouped by signal class per the Components rubric (discovery-confidence-rubric.md).
   *
   * High-signal: tokenized name, tokenized family, purpose, contract concept/category names.
   * Low-signal: whenToUse, contexts, alternatives[].reason, description.
   * EXCLUDES whenNotToUse — negative-signal trap (Req 1.4 / Lina R1 Q1).
   *
   * O2b confirmed: reads parsed `whenToUse` (camelCase) — the indexer operates on the
   * assembled ComponentMetadata where parsers.ts:198 has already mapped
   * usage.when_to_use → whenToUse. The raw snake_case key is irrelevant here.
   */
  private buildKeywordEntry(name: string, meta: ComponentMetadata): void {
    const highSignal = new Set<string>();
    const lowSignal = new Set<string>();

    // High-signal: tokenized component name
    for (const t of tokenizeString(name)) highSignal.add(t);

    // High-signal: tokenized family name
    if (meta.family) {
      for (const t of tokenizeString(meta.family)) highSignal.add(t);
    }

    // High-signal: purpose (already a string; tokenize it)
    if (meta.annotations?.purpose) {
      for (const t of tokenizeString(meta.annotations.purpose)) highSignal.add(t);
    }

    // High-signal: contract concept keys and category names
    for (const [conceptKey, contract] of Object.entries(meta.contracts.active)) {
      for (const t of tokenizeString(conceptKey)) highSignal.add(t);
      if (contract.category) {
        for (const t of tokenizeString(contract.category)) highSignal.add(t);
      }
    }

    // Low-signal: whenToUse strings (O2b: reads parsed whenToUse on annotations.usage)
    // parsers.ts:198 maps raw usage.when_to_use → annotations.usage.whenToUse
    const whenToUse = meta.annotations?.usage?.whenToUse ?? [];
    for (const phrase of whenToUse) {
      for (const t of tokenizeString(phrase)) lowSignal.add(t);
    }

    // Low-signal: contexts array
    for (const ctx of meta.annotations?.contexts ?? []) {
      for (const t of tokenizeString(ctx)) lowSignal.add(t);
    }

    // Low-signal: alternatives[].reason
    for (const alt of meta.annotations?.alternatives ?? []) {
      for (const t of tokenizeString(alt.reason)) lowSignal.add(t);
    }

    // Low-signal: description
    if (meta.description) {
      for (const t of tokenizeString(meta.description)) lowSignal.add(t);
    }

    this.keywordIndex.set(name, { highSignal, lowSignal });
  }

  /**
   * Derive per-platform readiness from filesystem scan + schema reviewed flags.
   * Design Decision 4 (Spec 086).
   */
  private derivePlatformReadiness(
    componentDir: string,
    schemaReadiness: ParsedSchemaReadiness | string,
  ): PlatformReadiness {
    // Check component-level baseline artifacts
    const hasSchema = fs.readdirSync(componentDir).some(f => f.endsWith('.schema.yaml'));
    const hasContracts = fs.existsSync(path.join(componentDir, 'contracts.yaml'));
    const hasTypes = fs.existsSync(path.join(componentDir, 'types.ts'));
    const baselineComplete = hasSchema && hasContracts && hasTypes;

    const platforms: Array<{ key: 'web' | 'ios' | 'android'; implPattern: RegExp; testPatterns: RegExp[] }> = [
      { key: 'web', implPattern: /\.web\.ts$/, testPatterns: [/\.test\.ts$/] },
      { key: 'ios', implPattern: /\.ios\.swift$/, testPatterns: [/Tests\.swift$/] },
      { key: 'android', implPattern: /\.android\.kt$/, testPatterns: [/Test\.kt$/] },
    ];

    const result: Record<string, PlatformReadinessStatus> = {};

    for (const p of platforms) {
      // Parse reviewed flag from schema
      const reviewed = typeof schemaReadiness === 'object'
        ? schemaReadiness[p.key]?.reviewed === true
        : false;
      const notApplicable = typeof schemaReadiness === 'object'
        ? schemaReadiness[p.key]?.status === 'not-applicable'
        : false;
      const naReason = typeof schemaReadiness === 'object'
        ? schemaReadiness[p.key]?.reason
        : undefined;

      if (notApplicable) {
        result[p.key] = { status: 'not-applicable', reason: naReason, reviewed: false, hasImplementation: false, hasTests: false };
        continue;
      }

      // Scan platform directory
      const platformDir = path.join(componentDir, 'platforms', p.key);
      const hasImpl = fs.existsSync(platformDir) &&
        fs.readdirSync(platformDir).some(f => p.implPattern.test(f));

      // Scan for tests — check platform dir and component __tests__ dir
      const testsDir = path.join(componentDir, '__tests__');
      const hasTests = (
        (fs.existsSync(platformDir) && fs.readdirSync(platformDir).some(f => p.testPatterns.some(tp => tp.test(f)))) ||
        (fs.existsSync(testsDir) && fs.readdirSync(testsDir).some(f => p.testPatterns.some(tp => tp.test(f))))
      );

      // Status derivation
      let status: PlatformReadinessStatus['status'];
      if (!hasImpl) {
        status = 'not-started';
      } else if (!baselineComplete || !hasTests) {
        status = 'scaffold';
      } else if (!reviewed) {
        status = 'development';
      } else {
        status = 'production-ready';
      }

      result[p.key] = { status, reviewed, hasImplementation: hasImpl, hasTests };
    }

    return result as unknown as PlatformReadiness;
  }

  /**
   * Resolve composed tokens for all indexed components (depth-1 only).
   * Collects tokens from internal and children.requires relationships.
   */
  private resolveComposedTokens(): void {
    for (const meta of this.index.values()) {
      if (!meta.composition) continue;

      const composed: Record<string, string[]> = {};
      const childNames = new Set<string>();

      for (const rel of meta.composition.internal) childNames.add(rel.component);
      if (meta.composition.children?.requires) {
        for (const r of meta.composition.children.requires) childNames.add(r);
      }

      for (const name of childNames) {
        const child = this.index.get(name);
        if (child) {
          composed[name] = child.tokens;
        } else {
          composed[name] = [];
          meta.warnings.push(`Composed child ${name} not indexed — tokens unavailable`);
        }
      }

      if (Object.keys(composed).length > 0) {
        meta.resolvedTokens = { own: meta.tokens, composed };
      }
    }
  }
}
