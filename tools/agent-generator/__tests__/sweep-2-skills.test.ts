/**
 * Sweep 2 (skills round-trip) tests — Spec 122 Task 7.1.
 * Includes the prove-it-bites: mangle one row's `cc` path (Req 19 AC2, D-A2).
 */

import { runSweep2, parseSkillFrontmatter, type SkillsFsView } from '../sweeps/sweep-2-skills';
import type { SkillsMap, SkillsMapRow } from '../skills';
import type { CanonicalAgentDoc } from '../schema';

const DESC = 'Use this skill to do the thing.';
const SKILL_MD = `---\nname: adaptive\ndescription: ${DESC}\n---\n\nBody.\n`;

function row(overrides: Partial<SkillsMapRow> = {}): SkillsMapRow {
  return {
    canonical: 'skills/adaptive',
    targets: { cc: '.claude/skills/adaptive', kiro: '.kiro/skills/android/adaptive' },
    owners: ['data'],
    ...overrides,
  };
}

/** Fake fs: dirs is the set of existing dirs; files maps rel path → text. */
function fakeFs(dirs: string[], files: Record<string, string>): SkillsFsView {
  return {
    listDirs(relDir: string): string[] {
      const prefix = `${relDir}/`;
      return [...new Set(dirs.filter((d) => d.startsWith(prefix)).map((d) => d.slice(prefix.length).split('/')[0]))].sort();
    },
    dirExists(relPath: string): boolean {
      return dirs.includes(relPath);
    },
    readFile(relPath: string): string | undefined {
      return files[relPath];
    },
  };
}

const goodDirs = ['skills/adaptive', '.claude/skills/adaptive', '.kiro/skills/android/adaptive'];
const goodFiles = {
  'skills/adaptive/SKILL.md': SKILL_MD,
  '.claude/skills/adaptive/SKILL.md': SKILL_MD,
};

function agentDoc(agent: string, skills: string[]): CanonicalAgentDoc {
  return { frontmatter: { agent, agentType: 'consumer', description: 'x', skills }, body: '' };
}

describe('sweep 2 — skills round-trip', () => {
  it('passes a coherent map + trees, both directions', () => {
    const report = runSweep2({
      skillsMap: { rows: [row()] },
      fs: fakeFs(goodDirs, goodFiles),
      docs: [agentDoc('data', ['adaptive'])],
      emittedKiroSkillRefs: [{ agent: 'data', ref: 'skill://.kiro/skills/android/adaptive/SKILL.md' }],
    });
    expect(report.pass).toBe(true);
  });

  it('PROVE-IT-BITES: a mangled cc path FAILS (missing emitted dir)', () => {
    const mangled = row({ targets: { cc: '.claude/skills/adaptive-MANGLED', kiro: '.kiro/skills/android/adaptive' } });
    const report = runSweep2({
      skillsMap: { rows: [mangled] },
      fs: fakeFs(goodDirs, goodFiles),
      docs: [],
      emittedKiroSkillRefs: [],
    });
    expect(report.pass).toBe(false);
    expect(report.findings.some((f) => f.observed.includes('adaptive-MANGLED'))).toBe(true);
  });

  it('fails a non-flat cc target (CC discovery contract)', () => {
    const nested = row({ targets: { cc: '.claude/skills/android/adaptive', kiro: '.kiro/skills/android/adaptive' } });
    const report = runSweep2({
      skillsMap: { rows: [nested] },
      fs: fakeFs(goodDirs, goodFiles),
      docs: [],
      emittedKiroSkillRefs: [],
    });
    expect(report.pass).toBe(false);
    expect(report.findings[0].observed).toContain('not a flat dir');
  });

  it('fails when the emitted CC description is not byte-equal to canonical (D-A2)', () => {
    const truncated = SKILL_MD.replace(DESC, 'Use this skill.');
    const report = runSweep2({
      skillsMap: { rows: [row()] },
      fs: fakeFs(goodDirs, { ...goodFiles, '.claude/skills/adaptive/SKILL.md': truncated }),
      docs: [],
      emittedKiroSkillRefs: [],
    });
    expect(report.pass).toBe(false);
    expect(report.findings.some((f) => f.observed.includes('NOT byte-equal'))).toBe(true);
  });

  it('fails a skills/ dir with zero rows and a dir with two rows', () => {
    const zeroRows = runSweep2({
      skillsMap: { rows: [] },
      fs: fakeFs(goodDirs, goodFiles),
      docs: [],
      emittedKiroSkillRefs: [],
    });
    expect(zeroRows.pass).toBe(false);
    expect(zeroRows.findings[0].observed).toContain('0 skills-map rows');

    const twoRows = runSweep2({
      skillsMap: { rows: [row(), row()] },
      fs: fakeFs(goodDirs, goodFiles),
      docs: [],
      emittedKiroSkillRefs: [],
    });
    expect(twoRows.pass).toBe(false);
    expect(twoRows.findings.some((f) => f.observed.includes('2 skills-map rows'))).toBe(true);
  });

  it('fails an emitted skill:// ref that resolves to no mapped path', () => {
    const report = runSweep2({
      skillsMap: { rows: [row()] },
      fs: fakeFs(goodDirs, goodFiles),
      docs: [],
      emittedKiroSkillRefs: [{ agent: 'data', ref: 'skill://.kiro/skills/nope/SKILL.md' }],
    });
    expect(report.pass).toBe(false);
  });

  it('records skills: [] as a visible PASS (0 declared / 0 emitted), and fails unknown declared keys', () => {
    const report = runSweep2({
      skillsMap: { rows: [row()] },
      fs: fakeFs(goodDirs, goodFiles),
      docs: [agentDoc('ada', []), agentDoc('kenya', ['unknown-skill'])],
      emittedKiroSkillRefs: [],
    });
    const info = report.findings.find((f) => f.verdict === 'INFO' && f.agent === 'ada');
    expect(info?.observed).toBe('recorded PASS: 0 declared / 0 emitted');
    expect(report.pass).toBe(false); // kenya's unknown key
    expect(report.findings.some((f) => f.agent === 'kenya' && f.verdict === 'FAIL')).toBe(true);
  });

  it('parses SKILL.md frontmatter (name + description)', () => {
    expect(parseSkillFrontmatter(SKILL_MD)).toEqual({ name: 'adaptive', description: DESC });
    expect(parseSkillFrontmatter('no frontmatter')).toBeUndefined();
  });
});
