import * as fs from 'fs';
import * as path from 'path';
import { extractMetadata } from './metadata-parser';
import { extractFrontmatterInfo } from './frontmatter-parser';
import { extractHeadingStructure } from './heading-parser';
import { resolveSection, SectionLookup } from './section-parser';
import { extractCrossReferences } from './cross-ref-parser';
import { estimateTokenCount } from '../utils/token-estimator';
import { determineIndexHealth } from './index-health';
import { seedLegacyPathsFromFrozenManifest } from '../legacy-path';
import {
  DocumentationMap,
  DocumentMetadata,
  DocumentSummary,
  DocumentFull,
  Section,
  CrossReference,
  MetadataValidation,
  ValidationIssue,
  IndexHealth,
  LegacyPathManifest
} from '../models';

/**
 * How a ref resolved to its indexed key (Spec 119-A Component 3).
 *   - 'id'             — matched the stable `id` index (the primary case).
 *   - 'indexed-key'    — matched a known indexed (relative) key directly.
 *   - 'legacy-fallback'— matched an original pre-rename `.kiro/steering/…` string
 *                        via the transition-only legacy-path manifest.
 */
export type ResolutionStrategy = 'id' | 'indexed-key' | 'legacy-fallback';

/** The outcome of resolving a ref (Spec 119-A Component 3). */
export interface ResolvedRef {
  /** The indexed (relative) key documentContent is keyed on. */
  indexedKey: string;
  strategy: ResolutionStrategy;
  /** The doc's stable id (always known post-resolution; '' for an unaddressed doc). */
  id: string;
}

/**
 * DocumentIndexer - Core indexing class for MCP Documentation Server
 * 
 * Responsibilities:
 * - Index all markdown files in a directory
 * - Extract metadata, headings, sections, and cross-references mechanically
 * - Maintain in-memory index for fast queries
 * - Support re-indexing of individual files
 * 
 * Uses mechanical parsing (regex/parsing) to extract structure without
 * interpreting content, preventing context load loops.
 */
export class DocumentIndexer {
  private documentMap: Map<string, DocumentMetadata> = new Map();
  private documentContent: Map<string, string> = new Map();

  /**
   * Spec 119-A addressing plane. Both map to the SAME indexed (relative) key
   * `documentContent` is keyed on (`path.join(dirPath, entry.name)`), NEVER an
   * absolute path. Maintained on every path that touches `documentContent`:
   * cleared in `indexDirectory`, populated in `indexFile`, and pruned in
   * `reindexFile`'s delete branch (see the index-maintenance invariant).
   */
  private idIndex: Map<string, string> = new Map();          // id → indexedKey
  private legacyPathIndex: Map<string, string> = new Map();  // normalizedLegacyPath → indexedKey

  private lastIndexTime: string | undefined;
  private directoryPath: string | undefined;
  private logsDirectory: string;

  /**
   * Create a new DocumentIndexer
   * 
   * @param logsDirectory - Directory for log files (default: 'logs')
   */
  constructor(logsDirectory: string = 'logs') {
    this.logsDirectory = logsDirectory;
  }

  /**
   * Index all documentation files in the specified directory
   * Uses mechanical parsing to extract structure without interpreting content
   * 
   * @param directoryPath - Path to directory containing markdown files
   */
  async indexDirectory(directoryPath: string): Promise<void> {
    // Verify directory exists
    if (!fs.existsSync(directoryPath)) {
      throw new Error(`Directory not found: ${directoryPath}`);
    }

    // Store directory path for later use
    this.directoryPath = directoryPath;

    // Log state change
    this.logIndexStateChange('indexing_started', { directoryPath });

    // Clear existing index. The Spec 119-A addressing maps MUST be cleared
    // alongside documentMap/documentContent on a full re-scan, or a removed doc
    // leaves a stale id/legacy entry (index-maintenance invariant, design-verified
    // DocumentIndexer.ts:69-70).
    this.documentMap.clear();
    this.documentContent.clear();
    this.idIndex.clear();
    this.legacyPathIndex.clear();
    // RE-SEED OBLIGATION (Task 3.2): legacyPathIndex is seeded out-of-band from a
    // build-time manifest via loadLegacyPathManifest — it is NOT derived from
    // on-disk scanning (the original `.kiro/steering/…` paths no longer exist
    // post-relocation, so they cannot be discovered here). Because a full re-scan
    // (incl. rebuildIndex) clears it per the invariant above, the index-build
    // wiring MUST call loadLegacyPathManifest AFTER indexDirectory/rebuildIndex.
    // Until Task 3 wires the artifact, this map is simply empty — correct, since
    // there is nothing to forward yet (every ref resolves via id or indexed-key).

    // Scan directory for markdown files
    const files = this.scanDirectory(directoryPath);

    // Index each file
    for (const filePath of files) {
      await this.indexFile(filePath);
    }

    // RE-SEED (Task 3.2): legacyPathIndex was cleared above, and idIndex is now
    // fully populated, so seed the frozen legacy-path manifest HERE — at the tail
    // of indexDirectory, the single chokepoint every index-build path funnels
    // through (startup, StalenessGate rebuild, rebuild_index). This honors the
    // re-seed obligation in one place: legacy refs keep resolving after EVERY
    // full re-scan, not just the first index. No-op when the frozen artifact is
    // absent (pre-Task-3 / deployment without it) — the resolver then simply has
    // no legacy fallback (correct degraded behavior).
    this.seedLegacyPaths();

    // Update last index time
    this.lastIndexTime = new Date().toISOString();

    // Log state change
    this.logIndexStateChange('indexing_completed', { 
      directoryPath, 
      documentsIndexed: this.documentMap.size 
    });
  }

  /**
   * Re-index a specific file after changes detected
   * Updates index structures without full re-scan
   * 
   * @param filePath - Path to file to re-index
   */
  async reindexFile(filePath: string): Promise<void> {
    // Verify file exists
    if (!fs.existsSync(filePath)) {
      // File was deleted - remove from index, INCLUDING the Spec 119-A addressing
      // maps that point at this now-vanished key (index-maintenance invariant,
      // design-verified DocumentIndexer.ts:96-101). Without this, a renamed/deleted
      // doc leaves a stale id/legacy entry resolving to a key that no longer exists.
      this.pruneAddressingEntriesForKey(filePath);
      this.documentMap.delete(filePath);
      this.documentContent.delete(filePath);
      this.lastIndexTime = new Date().toISOString();
      return;
    }

    // Re-index the file (the re-add branch repopulates idIndex via indexFile).
    await this.indexFile(filePath);
    this.lastIndexTime = new Date().toISOString();
  }

  /**
   * Get all indexed document metadata entries
   * Used by find_docs for concept search and paginated catalog enumeration
   *
   * Returns a stable-ordered array (insertion order, which follows filesystem scan order).
   */
  getAllDocuments(): DocumentMetadata[] {
    return Array.from(this.documentMap.values());
  }

  /**
   * Get the complete documentation map (4-layer structure)
   * Returns metadata for all indexed documents
   */
  getDocumentationMap(): DocumentationMap {
    const layers: DocumentationMap['layers'] = {
      '0': { name: 'Meta-Guide', documents: [] },
      '1': { name: 'Foundation', documents: [] },
      '2': { name: 'Frameworks and Patterns', documents: [] },
      '3': { name: 'Specific Implementations', documents: [] }
    };

    // Group documents by layer
    for (const metadata of this.documentMap.values()) {
      const layerKey = metadata.layer.toString();
      if (layers[layerKey]) {
        layers[layerKey].documents.push(metadata);
      }
    }

    return { layers };
  }

  /**
   * Get summary for a specific document
   * Returns metadata + outline (~200 tokens)
   * 
   * @param filePath - Path to document
   */
  getDocumentSummary(filePath: string): DocumentSummary {
    const content = this.getDocumentContent(filePath);
    const metadata = extractMetadata(content);

    // Extract heading structure
    const outline = extractHeadingStructure(content);

    // Extract cross-references
    const crossReferences = extractCrossReferences(content, filePath);

    // Convert CrossReference[] to CrossReferenceInfo[]
    const crossReferenceInfo = crossReferences.map(ref => ({
      target: ref.target,
      context: ref.context,
      section: ref.section
    }));

    // Estimate token count for full document
    const tokenCount = estimateTokenCount(content);

    return {
      path: filePath,
      metadata: {
        purpose: metadata.purpose,
        layer: metadata.layer,
        relevantTasks: metadata.relevantTasks,
        lastReviewed: metadata.lastReviewed || '',
        organization: metadata.organization || '',
        scope: metadata.scope || ''
      },
      outline,
      crossReferences: crossReferenceInfo,
      tokenCount
    };
  }

  /**
   * Get full content for a specific document
   * Returns complete markdown content
   * 
   * @param filePath - Path to document
   */
  getDocumentFull(filePath: string): DocumentFull {
    const content = this.getDocumentContent(filePath);
    const metadata = extractMetadata(content);
    const tokenCount = estimateTokenCount(content);

    return {
      path: filePath,
      content,
      metadata: {
        purpose: metadata.purpose,
        layer: metadata.layer,
        relevantTasks: metadata.relevantTasks,
        lastReviewed: metadata.lastReviewed || '',
        organization: metadata.organization || '',
        scope: metadata.scope || ''
      },
      tokenCount
    };
  }

  /**
   * Get specific section by heading (back-compat signature).
   * Returns section content with parent context, now additionally carrying the
   * stable `sectionId` and `siblingHeadings` adjacency cue (Spec 121 Req 5).
   *
   * NOTE: this overload preserves the legacy "heading only" contract. For a
   * NON-UNIQUE heading it throws an AmbiguousHeading error (the Finding-3 fix)
   * rather than silently returning the first match. Use `getSectionAddressed`
   * with `parent`/`sectionId` to disambiguate.
   *
   * @param filePath - Path to document
   * @param heading - Section heading to retrieve
   */
  getSection(filePath: string, heading: string): Section {
    return this.getSectionAddressed(filePath, { heading });
  }

  /**
   * Get specific section with optional disambiguation (Spec 121 Req 5).
   *
   * Resolution:
   *   - `sectionId` (stable positional ID) — resolves a specific occurrence,
   *     stable across heading-string drift (Req 5.2 / Finding 2).
   *   - `heading` (+ optional `parent`) — disambiguates a non-unique heading by
   *     parent context (Req 5.1). A non-unique heading with NO disambiguator
   *     throws an AmbiguousHeading error listing candidate parents/sectionIds
   *     instead of silently returning the first match (Req 5.1 / Finding 3).
   *
   * The returned Section carries `siblingHeadings` (Req 5.4 / Finding 1).
   *
   * @param filePath - Path to document
   * @param opts - { heading?, parent?, sectionId? }
   */
  getSectionAddressed(
    filePath: string,
    opts: { heading?: string; parent?: string; sectionId?: string },
  ): Section {
    const content = this.getDocumentContent(filePath);
    const lookup: SectionLookup = resolveSection(content, filePath, opts);

    if (lookup.kind === 'section') {
      return lookup.section;
    }

    if (lookup.kind === 'ambiguous') {
      // Finding 3: signal ambiguity + list candidate occurrences rather than
      // silently returning the first match.
      const candidateLines = lookup.candidates
        .map(
          (c) =>
            `  - sectionId: ${c.sectionId}` +
            (c.parent ? ` (parent: "${c.parent}")` : ' (top-level, no parent)'),
        )
        .join('\n');
      const error = new Error(
        `Heading "${lookup.heading}" is ambiguous in ${filePath}: it occurs ` +
        `${lookup.candidates.length} times. Disambiguate with "parent" or ` +
        `"sectionId". Candidates:\n${candidateLines}`,
      );
      (error as any).errorType = 'AmbiguousHeading';
      (error as any).heading = lookup.heading;
      (error as any).candidates = lookup.candidates;
      throw error;
    }

    // not_found — provide helpful error with available sections.
    const outline = extractHeadingStructure(content);
    const availableSections = outline.map((s) => s.heading);
    const what = opts.sectionId
      ? `Section id "${opts.sectionId}"`
      : `Section "${opts.heading}"` + (opts.parent ? ` under parent "${opts.parent}"` : '');
    const error = new Error(
      `${what} not found in ${filePath}. ` +
      `Available sections: ${availableSections.join(', ')}`,
    );
    (error as any).errorType = 'SectionNotFound';
    (error as any).availableHeadings = availableSections;
    throw error;
  }

  /**
   * List cross-references in a document
   * Returns links without following them
   * 
   * @param filePath - Path to document
   */
  listCrossReferences(filePath: string): CrossReference[] {
    const content = this.getDocumentContent(filePath);
    return extractCrossReferences(content, filePath);
  }

  /**
   * Validate metadata for a document
   * Returns validation results with issues
   * 
   * @param filePath - Path to document
   */
  validateMetadata(filePath: string): MetadataValidation {
    const content = this.getDocumentContent(filePath);
    const metadata = extractMetadata(content);

    const issues: ValidationIssue[] = [];

    // Check required fields
    const requiredFields = ['purpose', 'layer', 'relevantTasks', 'lastReviewed', 'organization', 'scope'];
    
    for (const field of requiredFields) {
      const value = metadata[field as keyof typeof metadata];
      
      if (value === undefined || value === null || value === '') {
        issues.push({
          field,
          issue: 'Missing required field',
          severity: 'error'
        });
      } else if (field === 'layer') {
        const layer = metadata.layer;
        if (layer < 0 || layer > 3) {
          issues.push({
            field: 'layer',
            issue: `Invalid layer value: ${layer}. Must be 0-3`,
            severity: 'error'
          });
        }
      } else if (field === 'relevantTasks' && Array.isArray(value) && value.length === 0) {
        issues.push({
          field: 'relevantTasks',
          issue: 'Empty relevantTasks array',
          severity: 'warning'
        });
      }
    }

    return {
      path: filePath,
      valid: issues.filter(i => i.severity === 'error').length === 0,
      metadata: metadata as Record<string, any>,
      issues
    };
  }

  /**
   * Scan directory recursively for markdown files
   * 
   * @param dirPath - Directory to scan
   * @returns Array of file paths
   */
  private scanDirectory(dirPath: string): string[] {
    const files: string[] = [];

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        files.push(...this.scanDirectory(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Index a single file
   * 
   * @param filePath - Path to file to index
   */
  private async indexFile(filePath: string): Promise<void> {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');

    // Store content for later retrieval
    this.documentContent.set(filePath, content);

    // Extract metadata
    const metadata = extractMetadata(content);

    // Extract frontmatter (high-signal title/description) + doc-level viability
    // gate (Spec 121 Req 6). Additive — undefined/all-false when no markers.
    const frontmatter = extractFrontmatterInfo(content);

    // Extract heading structure for section list
    const outline = extractHeadingStructure(content);
    const sections = outline.map(s => s.heading);

    // Estimate token count
    const tokenCount = estimateTokenCount(content);

    // Resolve the doc's stable addressing id (Spec 119-A). Derived at read time
    // when no on-disk `id:` exists; '' for the rare unaddressable doc (no `id:`,
    // `name:`, or H1) — those are NOT added to idIndex (an empty id is not a key).
    const id = frontmatter.id ?? '';

    // Store metadata in index
    const documentMetadata: DocumentMetadata = {
      path: filePath,
      id,
      purpose: metadata.purpose,
      layer: metadata.layer,
      relevantTasks: metadata.relevantTasks,
      lastReviewed: metadata.lastReviewed || '',
      organization: metadata.organization || '',
      sections,
      tokenCount,
      title: frontmatter.title,
      description: frontmatter.description,
      aliases: frontmatter.aliases,
      viability: frontmatter.viability,
    };

    this.documentMap.set(filePath, documentMetadata);

    // Build the id index (id → indexed key). First drop any PRIOR id forward-entry
    // that still points at this same key — covers an in-place id rewrite (reindexFile
    // re-add branch with NO delete event), which would otherwise leave a stale
    // old-id → key entry. A doc with no id contributes nothing.
    for (const [existingId, existingKey] of this.idIndex) {
      if (existingKey === filePath && existingId !== id) this.idIndex.delete(existingId);
    }
    if (id) {
      this.idIndex.set(id, filePath);
    }
    // legacyPathIndex is NOT populated here — it is seeded from the build-time
    // manifest (loadLegacyPathManifest), not derived from the current tree.
  }

  /**
   * Remove any addressing-map entries that point at `indexedKey` (Spec 119-A
   * index-maintenance invariant, delete branch). Scans by value because the
   * forward maps are id→key / legacyPath→key; on a delete we only know the key.
   */
  private pruneAddressingEntriesForKey(indexedKey: string): void {
    for (const [id, key] of this.idIndex) {
      if (key === indexedKey) this.idIndex.delete(id);
    }
    for (const [legacyPath, key] of this.legacyPathIndex) {
      if (key === indexedKey) this.legacyPathIndex.delete(legacyPath);
    }
  }

  /**
   * Seed the legacy-path forwarding manifest into legacyPathIndex (Spec 119-A
   * Component 3 / Data Models). Idempotent and re-callable: each entry's
   * normalized legacyPath maps to the indexed key its target id currently
   * resolves to. Entries whose target id is not (yet) indexed are skipped — the
   * manifest is transition-only and a missing target is a normal post-sweep miss.
   *
   * MUST be called AFTER indexDirectory/rebuildIndex (which clear the map), per
   * the re-seed obligation in indexDirectory. Until Task 3 wires the artifact,
   * this is simply never called and the map stays empty (correct — nothing to
   * forward yet).
   */
  loadLegacyPathManifest(manifest: LegacyPathManifest): void {
    for (const entry of manifest.entries) {
      const indexedKey = this.idIndex.get(entry.id);
      if (!indexedKey) {
        // Target id not indexed (e.g. identity doc, not in the served corpus, or
        // a not-yet-migrated id). Skip — it resolves as a normal miss if probed.
        continue;
      }
      this.legacyPathIndex.set(this.normalizeRef(entry.legacyPath), indexedKey);
    }
  }

  /**
   * Optional override of the frozen legacy-path-manifest location (Task 3.2).
   * Production uses the checked-in default (`legacy-path/legacy-path-manifest.json`);
   * tests point this at a fixture before indexing to exercise the re-seed path.
   */
  private legacyManifestPath: string | undefined;
  setLegacyManifestPath(manifestPath: string | undefined): void {
    this.legacyManifestPath = manifestPath;
  }

  /**
   * Seed legacyPathIndex from the FROZEN manifest (Task 3.2 re-seed obligation).
   * Called at the tail of every indexDirectory so the seed survives full re-scans
   * (rebuild_index / StalenessGate). No-op when the artifact is absent.
   */
  private seedLegacyPaths(): void {
    seedLegacyPathsFromFrozenManifest(this, this.legacyManifestPath);
  }

  /**
   * Resolve an incoming reference (id | indexed key | legacy steering path) to
   * the indexed (relative) key documentContent is keyed on (Spec 119-A
   * Component 3 / Design Decision 1). This is the SINGLE chokepoint all five
   * path-taking tools route through (via getDocumentContent), so they inherit
   * id-resolution without per-tool changes.
   *
   * Resolution order (Req 2 AC2/AC3/AC9):
   *   1. id index           — the primary, stable case.
   *   2. indexed key        — a known indexed (relative) key (ref normalized first).
   *   3. legacy-path fallback — original pre-rename `.kiro/steering/…` string.
   * Throws DocumentNotResolved (errorType, carrying ref + tried strategies; the
   * message preserves the legacy "Document not found" substring) on a miss.
   *
   * Guard-ordering invariant: QueryEngine.validatePath runs BEFORE this and
   * rejects any ref containing `..`. The legacy keyspace is `..`-free by
   * construction, so normalization stays AFTER the guard — do not move it ahead.
   */
  resolveRef(ref: string): ResolvedRef {
    // Strategy 1: id index (probe the raw ref — ids are not path-normalized).
    const idHit = this.idIndex.get(ref);
    if (idHit !== undefined) {
      return { indexedKey: idHit, strategy: 'id', id: ref };
    }

    // Normalize ONCE; shared by strategy 2 and strategy 3 (single helper).
    const key = this.normalizeRef(ref);

    // Strategy 2: known indexed (relative) key. MUST normalize before the probe,
    // or a ref with a stray './' or trailing slash silently skips this strategy.
    if (this.documentContent.has(key)) {
      return {
        indexedKey: key,
        strategy: 'indexed-key',
        id: this.documentMap.get(key)?.id ?? '',
      };
    }

    // Strategy 3: legacy-path fallback (transition-only), keyed on the SAME
    // normalized form.
    const legacyHit = this.legacyPathIndex.get(key);
    if (legacyHit !== undefined) {
      return {
        indexedKey: legacyHit,
        strategy: 'legacy-fallback',
        id: this.documentMap.get(legacyHit)?.id ?? '',
      };
    }

    // Strategy 4: miss.
    throw this.documentNotResolved(ref, ['id', 'indexed-key', 'legacy-fallback']);
  }

  /**
   * The single normalization used by BOTH strategy 2 and strategy 3 of
   * resolveRef (Spec 119-A Component 3). Brings a ref to the indexed-key form
   * documentContent is keyed on: trim, strip a leading `./`, normalize backslashes
   * to forward slashes, collapse repeated slashes, and strip a trailing slash.
   * Does NOT touch `..` (that is the guard's job, which runs earlier).
   */
  private normalizeRef(ref: string): string {
    let r = ref.trim();
    r = r.replace(/\\/g, '/');     // OS backslashes → '/'
    r = r.replace(/^\.\//, '');    // strip a single leading './'
    r = r.replace(/\/{2,}/g, '/'); // collapse repeated '/'
    r = r.replace(/\/+$/, '');     // strip trailing slash(es)
    return r;
  }

  /**
   * Build the DocumentNotResolved error (Spec 119-A Error Handling). Carries the
   * ref + tried strategies for gate attribution, and preserves the legacy
   * "Document not found" message substring so existing callers/tests still match.
   */
  private documentNotResolved(ref: string, triedStrategies: ResolutionStrategy[]): Error {
    const availableDocs = Array.from(this.documentContent.keys());
    const error = new Error(
      `Document not found: ${ref} could not be resolved ` +
      `(tried: ${triedStrategies.join(', ')}). ` +
      `Available documents: ${availableDocs.join(', ')}`
    );
    (error as any).errorType = 'DocumentNotResolved';
    (error as any).ref = ref;
    (error as any).triedStrategies = triedStrategies;
    return error;
  }

  /**
   * Get document content from index, routing the incoming ref through the
   * Spec 119-A resolver chokepoint (Design Decision 1). All five path-taking
   * tools funnel through here, so they all inherit id/legacy resolution.
   *
   * @param ref - id, indexed key, or legacy `.kiro/steering/…` path
   * @returns Document content
   */
  private getDocumentContent(ref: string): string {
    const { indexedKey } = this.resolveRef(ref);
    // resolveRef only returns a key that hit one of the indexes, so this get is
    // guaranteed present; the `!` documents that post-resolution invariant.
    return this.documentContent.get(indexedKey)!;
  }

  /**
   * Validate index integrity on startup
   * Checks for missing documents, stale index, and malformed metadata
   * 
   * @returns IndexHealth with status, errors, warnings, and metrics
   * Requirements: 9.1, 9.2, 9.5
   */
  validateIndexOnStartup(): IndexHealth {
    this.logIndexStateChange('validation_started', {});

    // If no directory path set, index is empty/not initialized
    if (!this.directoryPath) {
      const health: IndexHealth = {
        status: 'failed',
        documentsIndexed: 0,
        lastIndexTime: new Date().toISOString(),
        errors: ['Index not initialized: no directory path set'],
        warnings: [],
        metrics: {
          totalDocuments: 0,
          totalSections: 0,
          totalCrossReferences: 0,
          indexSizeBytes: 0
        }
      };
      this.logIndexStateChange('validation_completed', { status: health.status, errors: health.errors });
      return health;
    }

    // Use determineIndexHealth for comprehensive health check
    const health = determineIndexHealth({
      indexedDocuments: this.documentContent,
      directoryPath: this.directoryPath,
      lastIndexTime: this.lastIndexTime
    });

    this.logIndexStateChange('validation_completed', { 
      status: health.status, 
      errors: health.errors,
      warnings: health.warnings
    });

    return health;
  }

  /**
   * Rebuild the index from scratch
   * Used for manual recovery when index corruption is detected
   * 
   * @returns IndexHealth after rebuild
   * Requirements: 9.1, 9.2, 9.5
   */
  async rebuildIndex(): Promise<IndexHealth> {
    this.logIndexStateChange('rebuild_started', {});

    // If no directory path set, cannot rebuild
    if (!this.directoryPath) {
      const health: IndexHealth = {
        status: 'failed',
        documentsIndexed: 0,
        lastIndexTime: new Date().toISOString(),
        errors: ['Cannot rebuild: no directory path set. Call indexDirectory() first.'],
        warnings: [],
        metrics: {
          totalDocuments: 0,
          totalSections: 0,
          totalCrossReferences: 0,
          indexSizeBytes: 0
        }
      };
      this.logIndexStateChange('rebuild_failed', { error: health.errors[0] });
      return health;
    }

    try {
      // Re-index the directory
      await this.indexDirectory(this.directoryPath);

      // Validate the rebuilt index
      const health = this.validateIndexOnStartup();

      this.logIndexStateChange('rebuild_completed', { 
        status: health.status,
        documentsIndexed: health.documentsIndexed
      });

      return health;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const health: IndexHealth = {
        status: 'failed',
        documentsIndexed: this.documentMap.size,
        lastIndexTime: this.lastIndexTime || new Date().toISOString(),
        errors: [`Rebuild failed: ${errorMessage}`],
        warnings: [],
        metrics: {
          totalDocuments: this.documentMap.size,
          totalSections: 0,
          totalCrossReferences: 0,
          indexSizeBytes: 0
        }
      };
      this.logIndexStateChange('rebuild_failed', { error: errorMessage });
      return health;
    }
  }

  /**
   * Log index state changes to logs/index-state.log
   * Provides state tracking for debugging and monitoring
   * 
   * @param event - Event type (e.g., 'indexing_started', 'validation_completed')
   * @param details - Additional details about the event
   * Requirements: 9.5
   */
  logIndexStateChange(event: string, details: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      event,
      ...details
    };

    const logLine = JSON.stringify(logEntry) + '\n';

    // Ensure logs directory exists
    if (!fs.existsSync(this.logsDirectory)) {
      fs.mkdirSync(this.logsDirectory, { recursive: true });
    }

    const logPath = path.join(this.logsDirectory, 'index-state.log');
    
    // Append to log file
    fs.appendFileSync(logPath, logLine, 'utf-8');
  }

  /**
   * Get the current index health status
   * Convenience method that calls validateIndexOnStartup
   * 
   * @returns IndexHealth
   */
  getIndexHealth(): IndexHealth {
    return this.validateIndexOnStartup();
  }
}
