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
import { isImmutableContext } from '../staleness/StalenessGate';

// ---------------------------------------------------------------------------
// Multi-root component indexing (Spec 123 Task 1.4 — design C3 "Indexer", L-D2/L-D8)
// ---------------------------------------------------------------------------

/**
 * Options for a full index beyond the legacy positional data dirs (Spec 123 C3).
 */
export interface IndexComponentsOptions {
  /**
   * C3 `projectRoot = bornRoot` (unborn → the package root). The anchor for the guidance
   * companion check, the theme readers and the token reindex path. OMITTED → the legacy
   * derivation from the LOWEST-precedence (package) root, `root/../../..` — the pre-123
   * behavior, kept for single-root callers.
   */
  projectRoot?: string;
  /**
   * The caller's own resolved live tier (`DesignSystemRoot.tierDir`, from
   * `findDesignSystemRoot` — Spec 123 Task 1.5, DD24). Threaded to `resolveThemeTierRoot`
   * as the SECOND-precedence theme-root source (after `token-index/meta.json`'s `tierDir`,
   * before the legacy `<projectRoot>/src/tokens` default). OMITTED → meta.json or the
   * legacy default decide alone.
   */
  tierDir?: string;
}

/**
 * The component roots that are MUTABLE — the ones the file watcher, the staleness gate and
 * `ComponentIndexer.dataDirs` scan (Spec 123 C3 / Task 1 criterion "the watcher and
 * StalenessGate watch the consumer root; the package root is exempt as immutable").
 *
 * The exemption keys on actual immutability (`isImmutableContext` — the data lives under
 * `node_modules/`), which is where the package root always sits in a consumer install. In the
 * steward repo the package root is the working tree and stays watched (it is not immutable
 * there, and the steward's own env names it as the consumer root anyway).
 */
export function mutableComponentRoots(roots: string[]): string[] {
  return roots.filter(r => !isImmutableContext(r));
}

/** Normalize the pass-1 root set: accept a single root (legacy callers), resolve, dedupe. */
function normalizeRoots(componentsDir: string | string[]): string[] {
  const list = Array.isArray(componentsDir) ? componentsDir : [componentsDir];
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

/** The legacy pre-123 consumer layout level (L-D8): a `core/` directory holding component dirs. */
const LEGACY_LEVEL_DIR = 'core';

/** One component directory found at pass 1, with its root's precedence rank (0 = highest). */
interface ComponentSource {
  dirPath: string;
  dir: string;
  rank: number;
  declaredName: string;
}

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
  /**
   * The anchoring root (C3 `projectRoot = bornRoot`; unborn → the package root), set by every
   * full index from the caller's explicit anchor — never re-derived from a component root. The
   * token reindex path reads it (Spec 123 Task 1.4 (iv); replaces `lastProjectRoot`, issue 2026-09-12).
   */
  private bornRoot: string | undefined;
  /** `options.tierDir` from the last full index (Spec 123 Task 1.5) — threaded to the theme readers. */
  private explicitTierDir: string | undefined;
  /** The pass-1 root set, precedence order (consumer first, package last). */
  private componentRoots: string[] = [];
  /** Declared component name → the precedence winner's source (Spec 123 C3: precedence keys on the DECLARED name). */
  private ownerByDeclaredName = new Map<string, { dirPath: string; rank: number }>();
  /** Component directory → the index key (schema name) it produced — lets a reindex remove exactly its own entry. */
  private indexKeyByDir = new Map<string, string>();
  private lastIndexTime = '';
  private lastIndexTimeMs = 0;
  private indexWarnings: string[] = [];
  private dataDirs: string[] = [];
  /** Keyword index built at index time — Task 2, Spec 121 */
  private keywordIndex: KeywordIndex = new Map();

  /**
   * Scan the component root set and build the index.
   *
   * `componentsDir` is the pass-1 ROOT SET in precedence order — consumer root first, package
   * root last (Spec 123 C3; `resolveComponentRoots` produces it). A single string is the legacy
   * single-root form. The union is applied AT PASS 1: the contracts cache is filled from every
   * root before any component is assembled, so a consumer fork inheriting a package parent
   * resolves (Req 2.5). Precedence keys on the DECLARED component name (the contracts
   * `component` field; the schema `name` when a component has no contracts), never the
   * directory name.
   */
  async indexComponents(
    componentsDir: string | string[],
    patternsDir?: string,
    templatesDir?: string,
    guidanceDir?: string,
    tokenIndexDir?: string,
    options: IndexComponentsOptions = {}
  ): Promise<void> {
    this.index.clear();
    this.contractsCache.clear();
    this.keywordIndex.clear();
    this.ownerByDeclaredName.clear();
    this.indexKeyByDir.clear();
    this.indexWarnings = [];

    const roots = normalizeRoots(componentsDir);
    this.componentRoots = roots;
    // The package root is the LOWEST-precedence root; package-relative legacy defaults derive from it.
    const packageComponentsRoot = roots[roots.length - 1] ?? path.resolve(String(componentsDir));
    const legacyProjectRoot = path.resolve(packageComponentsRoot, '..', '..', '..');
    // C3: projectRoot = bornRoot (explicit anchor); the legacy derivation only for single-root callers.
    const projectRoot = options.projectRoot ? path.resolve(options.projectRoot) : legacyProjectRoot;
    this.bornRoot = projectRoot;
    this.explicitTierDir = options.tierDir;

    // ComponentIndexer.dataDirs: the MUTABLE component roots (the package root in a consumer
    // install is exempt as immutable) plus the other data dirs.
    this.dataDirs = [...mutableComponentRoots(roots), patternsDir, templatesDir, guidanceDir, tokenIndexDir]
      .filter(Boolean) as string[];

    const existingRoots = roots.filter(r => fs.existsSync(r));
    if (existingRoots.length === 0) {
      for (const r of roots) this.indexWarnings.push(`Components directory not found: ${r}`);
      this.lastIndexTime = new Date().toISOString();
      return;
    }

    // First pass: the UNION, applied here (Spec 123 C3 / L-D2). Every root's component dirs are
    // collected in precedence order and resolved to one winner per DECLARED name; the contracts
    // cache is filled from the winners (consumer first, then package) BEFORE assembly, so an
    // inheritance lookup from any root sees every root's parents.
    const winners: ComponentSource[] = [];
    for (const source of this.collectComponentSources(roots)) {
      const owner = this.ownerByDeclaredName.get(source.declaredName);
      if (owner) {
        if (owner.rank === source.rank) {
          this.indexWarnings.push(
            `Duplicate declared component name ${source.declaredName}: ${source.dirPath} is shadowed by ${owner.dirPath}`
          );
        }
        // A lower-precedence root's same-named component is shadowed (the consumer's fork wins).
        continue;
      }
      this.ownerByDeclaredName.set(source.declaredName, { dirPath: source.dirPath, rank: source.rank });
      winners.push(source);
      const contractsResult = parseContractsYaml(path.join(source.dirPath, 'contracts.yaml'));
      if (contractsResult.data) {
        this.contractsCache.set(contractsResult.data.component, contractsResult.data);
      }
    }

    // Load mode classifier (reads SemanticOverrides.ts for Level 2 keys)
    this.modeClassifier.load(projectRoot, tokenIndexDir, options.tierDir);

    // Second pass: assemble the precedence-resolved set
    for (const source of winners) {
      const key = this.assembleComponent(source.dirPath);
      if (key) this.indexKeyByDir.set(source.dirPath, key);
    }

    // Third pass: resolve composed tokens across BOTH roots (the index is already the union)
    this.resolveComposedTokens();

    // Index experience patterns
    const effectivePatternsDir = patternsDir || path.join(legacyProjectRoot, 'experience-patterns');
    await this.patternIndexer.indexPatterns(effectivePatternsDir);

    // Index layout templates
    const effectiveTemplatesDir = templatesDir || path.join(legacyProjectRoot, 'layout-templates');
    await this.layoutTemplateIndexer.indexTemplates(effectiveTemplatesDir);

    // Index family guidance (must run after components and patterns for cross-reference validation)
    const effectiveGuidanceDir = guidanceDir || path.join(legacyProjectRoot, 'family-guidance');
    await this.guidanceIndexer.indexGuidance(effectiveGuidanceDir);

    // Cross-reference validation (components + patterns must be indexed first)
    const componentNames = new Set(Array.from(this.index.keys()));
    const patternNames = new Set(this.patternIndexer.getCatalog().map(p => p.name));
    this.guidanceIndexer.validateCrossReferences(componentNames, patternNames, projectRoot);

    // Index token data (if token index directory exists). projectRoot is passed explicitly so
    // the token indexer reads the SAME theme override files the mode classifier does
    // (issue 2026-09-12 — get_token_details reporting light values as dark).
    if (tokenIndexDir) {
      await this.tokenIndexer.indexTokens(tokenIndexDir, projectRoot, options.tierDir);
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
   * Re-index a single component after a file change (watcher path).
   *
   * Precedence-aware (Spec 123 C3): a directory whose declared name is owned by a
   * higher-precedence source is shadowed and left out; a consumer component ADDED over a
   * package one of the same declared name replaces it. Only the entry this directory
   * produced is removed first (the pre-123 removal loop deleted an arbitrary first entry —
   * `path.basename(componentDir) === dir` was always true).
   */
  async reindexComponent(componentDir: string): Promise<void> {
    const dirPath = path.resolve(componentDir);
    const rank = this.rankOf(dirPath);
    const declaredName = this.declaredNameOf(dirPath);

    const owner = this.ownerByDeclaredName.get(declaredName);
    if (owner && owner.dirPath !== dirPath && owner.rank <= rank && fs.existsSync(owner.dirPath)) {
      return; // shadowed by a higher-precedence (or earlier same-root) source
    }

    // Remove exactly the entry this directory produced (its name may have changed)
    const oldKey = this.indexKeyByDir.get(dirPath);
    if (oldKey !== undefined) {
      this.index.delete(oldKey);
      this.keywordIndex.delete(oldKey);
      this.indexKeyByDir.delete(dirPath);
    }
    for (const [name, src] of this.ownerByDeclaredName) {
      if (src.dirPath === dirPath) this.ownerByDeclaredName.delete(name);
    }

    // Re-parse contracts for cache
    const contractsResult = parseContractsYaml(path.join(dirPath, 'contracts.yaml'));
    if (contractsResult.data) {
      this.contractsCache.set(contractsResult.data.component, contractsResult.data);
    }

    this.ownerByDeclaredName.set(declaredName, { dirPath, rank });
    const key = this.assembleComponent(dirPath);
    if (key) this.indexKeyByDir.set(dirPath, key);
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

  /**
   * Re-index token data from the given directory (file-watcher path).
   * Anchors on `bornRoot` — the explicit anchor the last full index was given (C3
   * `projectRoot = bornRoot`) — so theme overrides resolve from the same place a full reindex
   * uses (issue 2026-09-12). Never re-derived from a component root (Spec 123 Task 1.4 (iv)).
   *
   * Spec 123 Task 1.5 (DD24): `indexTokens` re-reads `<tokenIndexDir>/meta.json` on EVERY
   * call (including this one), so a `generate` re-run that changes the recorded `tierDir`
   * is picked up here too — the theme root "follows the served index," never a stale
   * snapshot from the last full index.
   */
  async reindexTokens(tokenIndexDir: string): Promise<void> {
    await this.tokenIndexer.indexTokens(tokenIndexDir, this.bornRoot, this.explicitTierDir);
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

  /**
   * Collect every component directory across the root set, in precedence order.
   * Under a root, a `core/` directory that holds component directories is recognized as ONE
   * legacy level (L-D8 — the pre-123 copy layout), with a named warning on each load; its
   * components rank with that root. A legacy level that IS another root in the set (the steward
   * repo: `src/components/core` is the package root) is left to that root.
   */
  private collectComponentSources(roots: string[]): ComponentSource[] {
    const sources: ComponentSource[] = [];
    const rootSet = new Set(roots);
    roots.forEach((root, rank) => {
      if (!fs.existsSync(root)) return;
      const children = fs.readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
      const legacyDirs: string[] = [];
      for (const dir of children) {
        const dirPath = path.join(root, dir);
        if (dir === LEGACY_LEVEL_DIR && !rootSet.has(dirPath)) {
          const nested = fs.readdirSync(dirPath, { withFileTypes: true })
            .filter(d => d.isDirectory() && this.isComponentDir(path.join(dirPath, d.name)))
            .map(d => d.name);
          if (nested.length > 0 && !this.isComponentDir(dirPath)) {
            legacyDirs.push(...nested);
            continue;
          }
        }
        if (dir === LEGACY_LEVEL_DIR && rootSet.has(dirPath)) continue;
        sources.push({ dirPath, dir, rank, declaredName: this.declaredNameOf(dirPath) });
      }
      if (legacyDirs.length > 0) {
        const legacyRoot = path.join(root, LEGACY_LEVEL_DIR);
        this.indexWarnings.push(
          `Legacy component level: ${legacyRoot} holds ${legacyDirs.length} component(s) in the pre-123 'core/' layout — indexed as one legacy level; move them up to ${root}`
        );
        for (const dir of legacyDirs) {
          const dirPath = path.join(legacyRoot, dir);
          sources.push({ dirPath, dir, rank, declaredName: this.declaredNameOf(dirPath) });
        }
      }
    });
    return sources;
  }

  /** A component directory holds a `*.schema.yaml` or a `contracts.yaml`. */
  private isComponentDir(dirPath: string): boolean {
    try {
      const files = fs.readdirSync(dirPath);
      return files.some(f => f.endsWith('.schema.yaml')) || files.includes('contracts.yaml');
    } catch { return false; }
  }

  /**
   * The DECLARED component name of a directory — the contracts `component` field; the schema
   * `name` when there are no contracts; the directory name only as a last resort (so the
   * assembly step still reports the directory's own warning).
   */
  private declaredNameOf(dirPath: string): string {
    const contracts = parseContractsYaml(path.join(dirPath, 'contracts.yaml')).data;
    if (contracts?.component) return contracts.component;
    try {
      const schemaFile = fs.readdirSync(dirPath).find(f => f.endsWith('.schema.yaml'));
      if (schemaFile) {
        const schema = parseSchemaYaml(path.join(dirPath, schemaFile)).data;
        if (schema?.name) return schema.name;
      }
    } catch { /* fall through */ }
    return path.basename(dirPath);
  }

  /** Precedence rank of a component directory: the index of the longest root containing it. */
  private rankOf(dirPath: string): number {
    let best = -1;
    let bestLen = -1;
    this.componentRoots.forEach((root, i) => {
      if ((dirPath === root || dirPath.startsWith(root + path.sep)) && root.length > bestLen) {
        best = i;
        bestLen = root.length;
      }
    });
    return best === -1 ? 0 : best;
  }

  /** Assemble one component directory into the index; returns its index key (schema name) or null. */
  private assembleComponent(dirPath: string): string | null {
    const dir = path.basename(dirPath);

    // Find schema.yaml (named {ComponentName}.schema.yaml)
    const schemaFile = fs.readdirSync(dirPath).find(f => f.endsWith('.schema.yaml'));
    if (!schemaFile) {
      this.indexWarnings.push(`Component directory has no schema.yaml: ${dir}`);
      return null;
    }

    const schemaResult = parseSchemaYaml(path.join(dirPath, schemaFile));
    if (!schemaResult.data) {
      if (schemaResult.warning) this.indexWarnings.push(schemaResult.warning);
      return null;
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
    return schema.name;
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
