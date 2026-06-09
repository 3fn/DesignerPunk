/**
 * Application MCP File Watcher
 *
 * Monitors all data source directories for changes and triggers
 * appropriate reindex on the ComponentIndexer.
 *
 * Data sources:
 * - components: schema.yaml, contracts.yaml, component-meta.yaml → reindexComponent
 * - patterns: *.yaml → reindexPatterns
 * - templates: *.yaml → reindexTemplates
 * - guidance: *.yaml → reindexGuidance
 * - token-index: *.yaml → reindexTokens
 *
 * @see Spec 106 R4 — expanded watching
 */

import * as fs from 'fs';
import * as path from 'path';
import { ComponentIndexer } from '../indexer/ComponentIndexer';

const COMPONENT_FILES = new Set(['contracts.yaml', 'component-meta.yaml']);

interface WatchConfig {
  dir: string;
  handler: (filename: string) => void;
}

export class FileWatcher {
  private watchers: fs.FSWatcher[] = [];
  private debounceTimers = new Map<string, NodeJS.Timeout>();

  constructor(
    private indexer: ComponentIndexer,
    private componentsDir: string,
    private patternsDir?: string,
    private templatesDir?: string,
    private guidanceDir?: string,
    private tokenIndexDir?: string,
    private debounceMs: number = 100,
  ) {}

  start(): void {
    this.stop();

    const configs: WatchConfig[] = [
      { dir: this.componentsDir, handler: (f) => this.handleComponentChange(f) },
    ];

    if (this.patternsDir) configs.push({ dir: this.patternsDir, handler: () => this.debounceReindex('patterns', () => this.indexer.reindexPatterns(this.patternsDir!)) });
    if (this.templatesDir) configs.push({ dir: this.templatesDir, handler: () => this.debounceReindex('templates', () => this.indexer.reindexTemplates(this.templatesDir!)) });
    if (this.guidanceDir) configs.push({ dir: this.guidanceDir, handler: () => this.debounceReindex('guidance', () => this.indexer.reindexGuidance(this.guidanceDir!)) });
    if (this.tokenIndexDir) configs.push({ dir: this.tokenIndexDir, handler: () => this.debounceReindex('tokens', () => this.indexer.reindexTokens(this.tokenIndexDir!)) });

    for (const config of configs) {
      if (!fs.existsSync(config.dir)) continue;
      try {
        const watcher = fs.watch(config.dir, { recursive: true }, (_event, filename) => {
          if (filename && filename.endsWith('.yaml')) config.handler(filename);
        });
        watcher.on('error', (err) => console.error(`FileWatcher error (${config.dir}): ${err.message}`));
        this.watchers.push(watcher);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`FileWatcher: could not watch ${config.dir}: ${msg}`);
      }
    }
  }

  stop(): void {
    for (const w of this.watchers) w.close();
    this.watchers = [];
    for (const timer of this.debounceTimers.values()) clearTimeout(timer);
    this.debounceTimers.clear();
  }

  isWatching(): boolean {
    return this.watchers.length > 0;
  }

  private handleComponentChange(filename: string): void {
    const base = path.basename(filename);
    if (!base.endsWith('.schema.yaml') && !COMPONENT_FILES.has(base)) return;

    const componentDir = path.join(this.componentsDir, path.dirname(filename));
    this.debounceReindex(componentDir, () => this.indexer.reindexComponent(componentDir));
  }

  private debounceReindex(key: string, action: () => Promise<void>): void {
    const existing = this.debounceTimers.get(key);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(async () => {
      this.debounceTimers.delete(key);
      try {
        await action();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`FileWatcher reindex failed (${key}): ${msg}`);
      }
    }, this.debounceMs);

    this.debounceTimers.set(key, timer);
  }
}
