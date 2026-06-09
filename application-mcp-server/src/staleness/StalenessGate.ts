/**
 * StalenessGate — Threshold-based staleness detection for MCP servers.
 *
 * Checks file mtimes against lastIndexTime on a configurable threshold (default 30s).
 * When stale files are detected, triggers a rebuild callback before the tool responds.
 * Skips all checks when running in immutable context (data in node_modules).
 *
 * @see Spec 106 design.md § "Threshold Staleness Gate"
 */

import * as fs from 'fs';
import * as path from 'path';

export interface StalenessGateConfig {
  /** Directories to scan for file mtime changes */
  dataDirs: string[];
  /** File extensions to scan (e.g., ['.yaml', '.md']) */
  fileExtensions: string[];
  /** Milliseconds between staleness checks (default: 30000) */
  thresholdMs?: number;
  /** True when data is in node_modules (consumer context — skip all checks) */
  isImmutable?: boolean;
  /** Callback to trigger full reindex when stale */
  onRebuild: () => Promise<void>;
}

export class StalenessGate {
  private readonly dataDirs: string[];
  private readonly fileExtensions: Set<string>;
  private readonly thresholdMs: number;
  private readonly isImmutable: boolean;
  private readonly onRebuild: () => Promise<void>;

  private lastCheckTime = 0;
  private lastIndexTime = 0;

  constructor(config: StalenessGateConfig) {
    this.dataDirs = config.dataDirs;
    this.fileExtensions = new Set(config.fileExtensions);
    this.thresholdMs = config.thresholdMs ?? 30_000;
    this.isImmutable = config.isImmutable ?? false;
    this.onRebuild = config.onRebuild;
  }

  /**
   * Call before every data-returning tool.
   * Returns true if a rebuild was triggered.
   */
  async checkAndRebuildIfNeeded(): Promise<boolean> {
    if (this.isImmutable) return false;

    const now = Date.now();
    if (now - this.lastCheckTime < this.thresholdMs) return false;

    this.lastCheckTime = now;
    const staleFiles = this.getStaleFiles();
    if (staleFiles.length === 0) return false;

    console.error('⚠️ Index stale — rebuilding...');
    await this.onRebuild();
    this.markIndexed();
    return true;
  }

  /** Update lastIndexTime after successful index/rebuild. */
  markIndexed(): void {
    this.lastIndexTime = Date.now();
  }

  /** Get files newer than lastIndexTime. */
  getStaleFiles(): string[] {
    if (this.isImmutable) return [];
    if (this.lastIndexTime === 0) return [];

    const stale: string[] = [];
    for (const dir of this.dataDirs) {
      if (!fs.existsSync(dir)) continue;
      this.scanDir(dir, stale);
    }
    return stale;
  }

  private scanDir(dir: string, stale: string[]): void {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        this.scanDir(fullPath, stale);
      } else if (this.fileExtensions.has(path.extname(entry.name))) {
        try {
          const mtime = fs.statSync(fullPath).mtimeMs;
          if (mtime > this.lastIndexTime) {
            stale.push(fullPath);
          }
        } catch {
          // Skip files that can't be stat'd
        }
      }
    }
  }
}

/** Detect whether data is in an immutable (node_modules) context. */
export function isImmutableContext(dataPath: string): boolean {
  return dataPath.includes('/node_modules/');
}
