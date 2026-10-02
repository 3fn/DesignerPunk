/**
 * Loader for the copied G1 renderings (Spec 123 Task 13.4). Format: README.md in this directory.
 * Read-only helpers — the provenance test (`g1-renderings.provenance.test.ts`) is what establishes
 * that each fixture is the gate's rendering, byte for byte.
 */
import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';

export const G1_RENDERINGS_DIR = __dirname;

export type MarkerGrammar = 'run-record' | 'begin-end';

export interface G1Fixture {
  /** File name in this directory; its bytes are the rendering. */
  file: string;
  /** The exemplar label the run record uses (A, AX-1, Lina-2, G′, …). */
  exemplar: string;
  /** The operative-set record the rendering is scored against. */
  record: string;
  /** The canonical unit's partition anchor. */
  anchor: string;
  /** That record unit's `canonicalHash` when the fixture was copied — the state it is scored against. */
  canonicalHash: string;
  /** The run record the rendering was copied from (repo-relative). */
  source: string;
  /** Git blob SHA-1 of `source` at copy time. */
  sourceBlob: string;
  grammar: MarkerGrammar;
  /** The exact opening marker line in `source`. */
  marker: string;
}

export function loadG1Manifest(): G1Fixture[] {
  const doc = loadYaml(fs.readFileSync(path.join(G1_RENDERINGS_DIR, 'manifest.yaml'), 'utf8')) as { fixtures: G1Fixture[] };
  return doc.fixtures;
}

export function readG1Rendering(fixture: G1Fixture): string {
  return fs.readFileSync(path.join(G1_RENDERINGS_DIR, fixture.file), 'utf8');
}

/** The one fixture for (exemplar, anchor); throws if absent or ambiguous. */
export function g1Fixture(exemplar: string, anchor: string): G1Fixture {
  const hits = loadG1Manifest().filter((f) => f.exemplar === exemplar && f.anchor === anchor);
  if (hits.length !== 1) throw new Error(`g1-renderings: ${hits.length} fixtures for ${exemplar} ${anchor} (want 1)`);
  return hits[0];
}
