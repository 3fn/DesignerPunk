/**
 * Shared read-only helpers for the triviality tests (Spec 123 Task 13.4). Not a test file.
 * Reads the COMMITTED operative-set records and the canonical units they key — the same
 * splitter + partition every consumer uses (design C14, C16).
 */
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { splitFrontmatter } from '../frontmatter';
import { partition } from '../partition';
import type { OperativeItem } from '../regrounding/triviality';

export const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
export const RECORDS_DIR = 'canonical/operative-sets';

export interface RecordUnit {
  canonicalHash: string;
  items: (OperativeItem & { kind: string })[];
}
export interface OperativeSetRecord {
  source: string;
  units: Record<string, RecordUnit>;
}

export const sha256 = (text: string): string => 'sha256:' + crypto.createHash('sha256').update(text, 'utf8').digest('hex');

export const recordFiles = (): string[] =>
  fs
    .readdirSync(path.join(REPO_ROOT, RECORDS_DIR))
    .filter((f) => f.endsWith('.yaml'))
    .sort()
    .map((f) => `${RECORDS_DIR}/${f}`);

export const readRecord = (rel: string): OperativeSetRecord =>
  loadYaml(fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8')) as OperativeSetRecord;

const unitCache = new Map<string, Map<string, string>>();
/** anchor → canonical unit text, in canonical order. */
export function canonicalUnits(source: string): Map<string, string> {
  let units = unitCache.get(source);
  if (!units) {
    const file = fs.readFileSync(path.join(REPO_ROOT, source), 'utf8');
    units = new Map(partition(splitFrontmatter(file, source).body).units.map((u) => [u.anchor, u.text]));
    unitCache.set(source, units);
  }
  return units;
}

/** Every (record, anchor) unit in every committed record, with its canonical text. */
export function liveUnits(): { record: string; anchor: string; unit: RecordUnit; canonical: string }[] {
  const out: { record: string; anchor: string; unit: RecordUnit; canonical: string }[] = [];
  for (const rel of recordFiles()) {
    const record = readRecord(rel);
    const units = canonicalUnits(record.source);
    for (const [anchor, unit] of Object.entries(record.units)) {
      const canonical = units.get(anchor);
      if (canonical === undefined) throw new Error(`${rel}: ${anchor} names no canonical unit`);
      out.push({ record: rel, anchor, unit, canonical });
    }
  }
  return out;
}

/**
 * The INVALID implementation C18 names — plain per-item `includes`. Kept here ONLY as the
 * contrast the bites need (it must score AX-1 15/30 and fail the deletion invariant on exactly
 * the shared-text pair); never used by triviality.ts.
 */
export const includesCount = (rendering: string, items: readonly OperativeItem[]): number =>
  items.filter((i) => rendering.includes(i.text)).length;
