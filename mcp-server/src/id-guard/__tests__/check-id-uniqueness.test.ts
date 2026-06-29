/**
 * `checkIdUniqueness` — unit tests (Spec 119-A Task 4.1).
 *
 * Covers: explicit collision, derived collision (treated identically), the
 * derived worklist output, totalDocs, the missing-root (governance/) graceful
 * empty, and the `idSource: 'none'` exception surfacing.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  checkIdUniqueness,
  scanCorpus,
  verdictFromScan,
} from '../check-id-uniqueness';

const TMP = path.join(__dirname, 'fixtures-guard');

function withName(name: string): string {
  return `---\nname: ${name}\ndescription: fixture\n---\n\n# ${name}\n\nbody\n`;
}
function withExplicitId(id: string, name: string): string {
  return `---\nid: ${id}\nname: ${name}\n---\n\n# ${name}\n\nbody\n`;
}
function h1Only(h1: string): string {
  return `# ${h1}\n\nbody, no frontmatter\n`;
}
function noId(): string {
  // No name, no H1 — idSource: 'none'.
  return `---\ndescription: orphan\n---\n\nbody with no heading\n`;
}

function scaffold(files: Record<string, string>): { root: string; steering: string } {
  const root = path.join(TMP, `proj-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const steering = path.join(root, '.kiro', 'steering');
  fs.mkdirSync(steering, { recursive: true });
  for (const [basename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(steering, basename), content);
  }
  return { root, steering };
}

afterAll(() => {
  if (fs.existsSync(TMP)) fs.rmSync(TMP, { recursive: true, force: true });
});

describe('checkIdUniqueness — collision detection', () => {
  it('passes when every id is unique', () => {
    const { root } = scaffold({
      'Token-Governance.md': withName('Token Governance'),
      'Core Goals.md': withName('Core Goals'),
    });
    const r = checkIdUniqueness(['governance', '.kiro/steering'], root);
    expect(r.ok).toBe(true);
    expect(r.collisions).toEqual({});
    expect(r.totalDocs).toBe(2);
  });

  it('detects an EXPLICIT collision (two docs with the same on-disk id:)', () => {
    const { root } = scaffold({
      'a.md': withExplicitId('shared-id', 'Doc A'),
      'b.md': withExplicitId('shared-id', 'Doc B'),
    });
    const r = checkIdUniqueness(['governance', '.kiro/steering'], root);
    expect(r.ok).toBe(false);
    expect(Object.keys(r.collisions)).toEqual(['shared-id']);
    expect(r.collisions['shared-id']).toHaveLength(2);
  });

  it('detects a DERIVED collision (two same-titled docs slug to one id) identically to explicit', () => {
    const { root } = scaffold({
      'one.md': withName('Token Governance'),
      'two.md': withName('Token  Governance'), // collapses to the same slug
    });
    const r = checkIdUniqueness(['governance', '.kiro/steering'], root);
    expect(r.ok).toBe(false);
    expect(r.collisions['token-governance']).toHaveLength(2);
  });

  it('detects a derived id colliding with an explicit id (mixed)', () => {
    const { root } = scaffold({
      'explicit.md': withExplicitId('token-governance', 'Something Else'),
      'derived.md': withName('Token Governance'),
    });
    const r = checkIdUniqueness(['governance', '.kiro/steering'], root);
    expect(r.ok).toBe(false);
    expect(r.collisions['token-governance']).toHaveLength(2);
  });
});

describe('checkIdUniqueness — derived worklist + totalDocs', () => {
  it('reports the derived worklist (docs lacking on-disk id:) and not the explicit ones', () => {
    const { root } = scaffold({
      'frozen.md': withExplicitId('already-frozen', 'Frozen'),
      'needs-name.md': withName('Needs Backfill'),
      'needs-h1.md': h1Only('H1 Only Doc'),
    });
    const r = checkIdUniqueness(['governance', '.kiro/steering'], root);
    expect(r.ok).toBe(true);
    expect(r.totalDocs).toBe(3);
    // derived = the two without an on-disk id:, by relPath
    expect(r.derived.some((p) => p.endsWith('needs-name.md'))).toBe(true);
    expect(r.derived.some((p) => p.endsWith('needs-h1.md'))).toBe(true);
    expect(r.derived.some((p) => p.endsWith('frozen.md'))).toBe(false);
    expect(r.derived).toHaveLength(2);
  });
});

describe('checkIdUniqueness — graceful missing root + exceptions', () => {
  it('treats a non-existent governance/ root as empty (does not throw)', () => {
    const { root } = scaffold({ 'x.md': withName('X Doc') });
    // governance/ does not exist in the scaffold
    expect(() => checkIdUniqueness(['governance', '.kiro/steering'], root)).not.toThrow();
    const r = checkIdUniqueness(['governance', '.kiro/steering'], root);
    expect(r.totalDocs).toBe(1);
  });

  it("surfaces idSource:'none' docs as exceptions, not collisions, never id: ''", () => {
    const { root } = scaffold({
      'good.md': withName('Good Doc'),
      'orphan.md': noId(),
    });
    const r = checkIdUniqueness(['governance', '.kiro/steering'], root);
    expect(r.exceptions.some((p) => p.endsWith('orphan.md'))).toBe(true);
    // The orphan must NOT appear as a collision under '' or anything else.
    expect(r.collisions['']).toBeUndefined();
    expect(r.ok).toBe(true);
  });
});

describe('verdictFromScan / scanCorpus composition', () => {
  it('checkIdUniqueness === verdictFromScan(scanCorpus(...))', () => {
    const { root } = scaffold({ 'a.md': withName('Alpha'), 'b.md': withName('Beta') });
    const composed = verdictFromScan(scanCorpus(['governance', '.kiro/steering'], root));
    const direct = checkIdUniqueness(['governance', '.kiro/steering'], root);
    expect(composed).toEqual(direct);
  });
});
