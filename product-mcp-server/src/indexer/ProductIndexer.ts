/**
 * ProductIndexer — orchestrates indexing of all product data.
 *
 * Extracted from the original single-file server (Spec 081).
 * Owns all data stores and exposes getters for the server shell.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md § "ProductIndexer Interface"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import type { Principle } from '../models';
import { parsePrinciples } from './PrinciplesParser';

const SERVER_NAME = 'mcp-product-server';

export class ProductIndexer {
  private productDir: string;
  private indexed: boolean = false;
  private lastIndexTime: string = '';
  private warnings: string[] = [];

  private overview: Record<string, unknown> | null = null;
  private experienceMap: Array<Record<string, unknown>> = [];
  private screenSpecs: Map<string, Record<string, unknown>> = new Map();
  private domainObjects: Map<string, Record<string, unknown>> = new Map();
  private templates: Array<Record<string, unknown>> = [];
  private oneOffComponents: Map<string, Record<string, unknown>> = new Map();
  private principles: Principle[] = [];

  constructor(productDir: string) {
    this.productDir = productDir;
  }

  async index(): Promise<void> {
    this.warnings = [];
    this.overview = null;
    this.experienceMap = [];
    this.screenSpecs.clear();
    this.domainObjects.clear();
    this.templates = [];
    this.oneOffComponents.clear();
    this.principles = [];

    this.indexOverview();
    this.indexPrinciples();
    this.indexExperienceMap();
    this.indexTemplates();
    this.indexDomainObjects();
    this.buildDomainCrossRefs();
    this.indexOneOffComponents();

    // Placeholder: walk UI trees for reverse indexes and gap detection (Task 2.3)
    for (const [, spec] of this.screenSpecs) {
      this.walkUiTree(spec);
    }

    this.indexed = true;
    this.lastIndexTime = new Date().toISOString();
    console.error(
      `[${SERVER_NAME}] Indexed: ${this.screenSpecs.size} screens, ` +
      `${this.domainObjects.size} domain objects, ${this.templates.length} templates, ` +
      `${this.oneOffComponents.size} one-off components`
    );
  }

  // --- Getters ---

  getOverview(): Record<string, unknown> | null { return this.overview; }
  getScreenSpec(name: string): Record<string, unknown> | undefined { return this.screenSpecs.get(name); }
  getScreenSpecs(): Map<string, Record<string, unknown>> { return this.screenSpecs; }
  getDomainObject(name: string): Record<string, unknown> | undefined { return this.domainObjects.get(name); }
  getTemplates(): Array<Record<string, unknown>> { return this.templates; }
  getOneOffComponent(name: string): Record<string, unknown> | undefined { return this.oneOffComponents.get(name); }
  getOneOffComponents(): Map<string, Record<string, unknown>> { return this.oneOffComponents; }
  getPrinciples(): Principle[] { return this.principles; }
  getExperienceMap(): Array<Record<string, unknown>> { return this.experienceMap; }
  getWarnings(): string[] { return this.warnings; }
  isIndexed(): boolean { return this.indexed; }
  getLastIndexTime(): string { return this.lastIndexTime; }

  getHealth(): Record<string, unknown> {
    return {
      status: this.indexed ? 'healthy' : 'empty',
      indexed: this.indexed,
      lastIndexTime: this.lastIndexTime,
      counts: {
        screens: this.screenSpecs.size,
        domainObjects: this.domainObjects.size,
        templates: this.templates.length,
        oneOffComponents: this.oneOffComponents.size,
      },
      warnings: this.warnings,
    };
  }

  // --- Indexing steps ---

  private indexOverview(): void {
    const overviewPath = path.join(this.productDir, 'overview.yaml');
    if (fs.existsSync(overviewPath)) {
      this.overview = this.loadYaml(overviewPath);
    }
  }

  private indexPrinciples(): void {
    const principlesDir = path.join(this.productDir, 'principles');
    this.principles = parsePrinciples(principlesDir, this.warnings);

    // Backward compatibility: attach to overview for get_product_overview
    if (this.principles.length > 0) {
      const principlesMap: Record<string, string> = {};
      for (const p of this.principles) {
        principlesMap[p.name] = p.content;
      }
      if (this.overview) {
        (this.overview as any).principles = principlesMap;
      } else {
        this.overview = { principles: principlesMap };
      }
    }
  }

  private indexExperienceMap(): void {
    const expDir = path.join(this.productDir, 'experience-map');
    if (!fs.existsSync(expDir)) return;
    for (const typeDir of ['verticals', 'flows', 'pages']) {
      const typePath = path.join(expDir, typeDir);
      if (!fs.existsSync(typePath)) continue;
      const type = typeDir === 'pages' ? 'feature-page' : typeDir.replace(/s$/, '');

      for (const entry of fs.readdirSync(typePath, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          this.indexScreenDirectory(path.join(typePath, entry.name), entry.name, type);
        } else if (entry.isFile() && entry.name.endsWith('.yaml')) {
          const name = entry.name.replace('.yaml', '');
          this.indexScreenFile(path.join(typePath, entry.name), name, type);
        }
      }
    }
  }

  private indexTemplates(): void {
    const templatesDir = path.join(this.productDir, 'templates');
    if (!fs.existsSync(templatesDir)) return;
    for (const file of this.listFiles(templatesDir, '.yaml')) {
      const data = this.loadYaml(file);
      if (data) this.templates.push(data);
    }
  }

  private indexDomainObjects(): void {
    const domainsDir = path.join(this.productDir, 'domain-objects');
    if (!fs.existsSync(domainsDir)) return;
    for (const file of this.listFiles(domainsDir, '.yaml')) {
      const data = this.loadYaml(file);
      if (data && (data as any).name) {
        this.domainObjects.set((data as any).name, data);
      }
    }
  }

  private buildDomainCrossRefs(): void {
    for (const [screenName, spec] of this.screenSpecs) {
      const refs = this.extractDomainRefs(spec);
      for (const ref of refs) {
        const obj = this.domainObjects.get(ref);
        if (obj) {
          const referencedBy = ((obj as any).referencedBy || []) as string[];
          if (!referencedBy.includes(screenName)) referencedBy.push(screenName);
          (obj as any).referencedBy = referencedBy;
        }
      }
    }
  }

  private indexOneOffComponents(): void {
    const componentsDir = path.join(this.productDir, 'components');
    if (!fs.existsSync(componentsDir)) return;
    for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const compDir = path.join(componentsDir, entry.name);
      const schemaFile = this.listFiles(compDir, '.schema.yaml')[0];
      if (!schemaFile) continue;
      const schema = this.loadYaml(schemaFile) || {};
      const contractFile = this.listFiles(compDir, '.contracts.yaml')[0];
      if (contractFile) {
        (schema as any).contracts = this.loadYaml(contractFile);
      }
      const name = (schema as any).name || entry.name;
      this.oneOffComponents.set(name, schema);
    }
  }

  // --- UI tree walk (placeholder for Task 2.3) ---

  private walkUiTree(_spec: Record<string, unknown>): void {
    // Placeholder — will be wired to ReverseIndexBuilder and GapDetector in Task 2.3
  }

  // --- Helpers ---

  private indexScreenFile(filePath: string, name: string, type: string): void {
    const data = this.loadYaml(filePath);
    if (!data) return;
    (data as any).name = (data as any).name || name;
    (data as any).type = (data as any).type || type;
    this.screenSpecs.set((data as any).name, data);
    this.experienceMap.push({
      name: (data as any).name,
      type: (data as any).type,
      status: (data as any).status || {},
    });
  }

  private indexScreenDirectory(dirPath: string, name: string, type: string): void {
    const yamlFiles = this.listFiles(dirPath, '.yaml');
    if (yamlFiles.length === 0) return;
    const primaryFile = yamlFiles.find(f => path.basename(f, '.yaml') === name) || yamlFiles[0];
    const assembled = this.loadYaml(primaryFile) || {};
    (assembled as any).name = (assembled as any).name || name;
    (assembled as any).type = (assembled as any).type || type;

    for (const file of yamlFiles) {
      if (file === primaryFile) continue;
      const facetData = this.loadYaml(file);
      if (facetData) Object.assign(assembled, facetData);
    }

    this.screenSpecs.set((assembled as any).name, assembled);
    this.experienceMap.push({
      name: (assembled as any).name,
      type: (assembled as any).type,
      status: (assembled as any).status || {},
    });
  }

  private extractDomainRefs(spec: Record<string, unknown>): string[] {
    const refs: string[] = [];
    const text = JSON.stringify(spec);
    for (const [name] of this.domainObjects) {
      if (text.toLowerCase().includes(name.toLowerCase())) refs.push(name);
    }
    return refs;
  }

  loadYaml(filePath: string): Record<string, unknown> | null {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return yaml.load(content) as Record<string, unknown>;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.warnings.push(`Failed to parse ${filePath}: ${msg}`);
      console.error(`[${SERVER_NAME}] Skipping malformed YAML: ${filePath} — ${msg}`);
      return null;
    }
  }

  listFiles(dir: string, ext: string): string[] {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(ext))
      .map(f => path.join(dir, f));
  }
}
