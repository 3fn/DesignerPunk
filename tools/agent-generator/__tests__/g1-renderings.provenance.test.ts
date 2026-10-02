/**
 * g1-renderings.provenance.test.ts — Spec 123 Task 13.4, criterion "The G1 renderings are copied
 * fixtures with pinned provenance".
 *
 * Every fixture under `tools/agent-generator/__fixtures__/g1-renderings/` names its source run
 * record and that record's blob SHA (the sidecar `manifest.yaml`; format in the directory's
 * README). This test asserts the record's CURRENT bytes hash to the pinned blob and the fixture
 * equals the marked rendering block in it — so a changed run record turns this red rather than
 * silently changing the fixture. It also asserts the copy is complete: every marked block in the
 * three sources has a fixture.
 *
 * Scope (the criterion's own): it establishes the fixture is the gate's rendering, byte for byte.
 * It says nothing about the scores — `triviality.g1.test.ts` pins those, against the record state
 * each fixture names.
 */
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { G1_RENDERINGS_DIR, loadG1Manifest, readG1Rendering, type G1Fixture } from '../__fixtures__/g1-renderings';
import { REPO_ROOT } from './triviality.helpers';

/** `git hash-object` for a file's bytes, computed in-process (no git dependency). */
const gitBlob = (bytes: Buffer): string =>
  crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`), bytes])).digest('hex');

const RUN_RECORD = /(<!-- rendering \S+ \S+ \S+ -->)\n````text\n([\s\S]*?)````\n/g;
const BEGIN_END = /(<!-- (G|Gprime)-rendering:begin -->)\n````text\n([\s\S]*?)````\n<!-- \2-rendering:end -->/g;

/** Every marked block in a source, as marker → body, under the named grammar. */
function blocks(text: string, grammar: G1Fixture['grammar']): Map<string, string[]> {
  const out = new Map<string, string[]>();
  const re = grammar === 'run-record' ? RUN_RECORD : BEGIN_END;
  re.lastIndex = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    const body = grammar === 'run-record' ? m[2] : m[3];
    out.set(m[1], [...(out.get(m[1]) ?? []), body]);
  }
  return out;
}

const manifest = loadG1Manifest();
const sources = [...new Set(manifest.map((f) => f.source))];

describe('G1 renderings — copied fixtures with pinned provenance (13.4)', () => {
  it('has the 22 fixtures G1 scored (17 run 1, 3 run 2, G and G′) — count asserted', () => {
    expect(manifest.length).toBe(22);
    expect(sources.sort()).toEqual([
      '.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-1.md',
      '.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-2.md',
      '.kiro/specs/123-consumer-distribution/completion/task-11-3-exemplars-g-gprime.md',
    ]);
  });

  it('every .txt in the directory has a manifest entry, and every entry has its file', () => {
    const onDisk = fs.readdirSync(G1_RENDERINGS_DIR).filter((f) => f.endsWith('.txt')).sort();
    expect(onDisk).toEqual(manifest.map((f) => f.file).sort());
  });

  describe.each(manifest.map((f) => [`${f.exemplar} ${f.anchor}`, f] as const))('%s', (_label, fixture) => {
    const bytes = fs.readFileSync(path.join(REPO_ROOT, fixture.source));

    it('its source run record hashes to the pinned blob', () => {
      expect(`${fixture.source} blob ${gitBlob(bytes)}`).toBe(`${fixture.source} blob ${fixture.sourceBlob}`);
    });

    it('equals the marked block in its source, byte for byte (marker occurs once)', () => {
      const found = blocks(bytes.toString('utf8'), fixture.grammar).get(fixture.marker) ?? [];
      expect(found.length).toBe(1);
      expect(readG1Rendering(fixture)).toBe(found[0]);
    });
  });

  it.each(sources)('every marked block in %s has a fixture (the copy is complete)', (source) => {
    const text = fs.readFileSync(path.join(REPO_ROOT, source), 'utf8');
    const markers = [...blocks(text, 'run-record').keys(), ...blocks(text, 'begin-end').keys()].sort();
    expect(markers).toEqual(manifest.filter((f) => f.source === source).map((f) => f.marker).sort());
  });
});
