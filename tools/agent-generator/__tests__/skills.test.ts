/**
 * @category evergreen
 * @purpose Verify SkillsMap resolution (C2.2): parsing the real committed
 *          canonical/shared/skills-map.yaml, the canonical-keyed row lookup
 *          (resolveSkillRow), the per-target reference-syntax renderers
 *          (kiroSkillRef / ccSkillRef) — including the nested-kiro-path
 *          `theming/styles` transform named explicitly per design § Testing
 *          Strategy — and the byte-identical, deterministic per-target
 *          skill-tree emit (emitSkillTrees) against a temp fixture.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  ccSkillRef,
  emitSkillTrees,
  kiroSkillRef,
  parseSkillsMap,
  resolveSkillRow,
  skillKey,
  type SkillsMap,
} from '../skills';

const REAL_MAP_PATH = path.resolve(__dirname, '..', '..', '..', 'canonical', 'shared', 'skills-map.yaml');

describe('parseSkillsMap — against the real committed substrate', () => {
  it('parses skills-map.yaml to 6 rows, each canonical path existing on disk with a SKILL.md', () => {
    // 5 real skills + the Spec 122 C10.3 standing-fixture row (`skills/_fixture-skill`,
    // added Task 8.1 — an inert round-trip specimen, owner thurgood).
    const map = parseSkillsMap(fs.readFileSync(REAL_MAP_PATH, 'utf8'));
    expect(map.rows).toHaveLength(6);

    const repoRoot = path.resolve(__dirname, '..', '..', '..');
    for (const row of map.rows) {
      const skillMdPath = path.resolve(repoRoot, row.canonical, 'SKILL.md');
      expect(fs.existsSync(skillMdPath)).toBe(true);
    }
  });

  it('tolerates an empty rows list', () => {
    expect(parseSkillsMap('rows: []').rows).toEqual([]);
    expect(parseSkillsMap('rows:').rows).toEqual([]);
  });
});

describe('skillKey — canonical-keyed row lookup', () => {
  it('is the basename of row.canonical', () => {
    expect(skillKey({ canonical: 'skills/theming-styles', targets: { cc: 'x', kiro: 'y' }, owners: [] })).toBe(
      'theming-styles'
    );
  });
});

describe('the theming/styles nested-kiro-path transform (design § Testing Strategy — REQUIRED NAMED TEST)', () => {
  it('resolves the row whose targets.kiro nests under android/theming/styles: skillKey "theming-styles", kiroSkillRef the nested skill:// path, ccSkillRef the flat "theming-styles" name', () => {
    const map = parseSkillsMap(fs.readFileSync(REAL_MAP_PATH, 'utf8'));
    const row = resolveSkillRow(map, 'theming-styles');

    expect(row.targets.kiro).toBe('.kiro/skills/android/theming/styles');
    expect(kiroSkillRef(row)).toBe('skill://.kiro/skills/android/theming/styles/SKILL.md');
    expect(ccSkillRef(row)).toBe('theming-styles');
  });
});

describe('resolveSkillRow — hit + loud miss', () => {
  const map: SkillsMap = {
    rows: [
      { canonical: 'skills/adaptive', targets: { cc: '.claude/skills/adaptive', kiro: '.kiro/skills/android/adaptive' }, owners: ['data'] },
      { canonical: 'skills/impeccable', targets: { cc: '.claude/skills/impeccable', kiro: '.kiro/skills/impeccable' }, owners: ['leonardo'] },
    ],
  };

  it('resolves a known key to its row', () => {
    expect(resolveSkillRow(map, 'adaptive').canonical).toBe('skills/adaptive');
  });

  it('throws naming the missing key and the known keys on a miss', () => {
    expect(() => resolveSkillRow(map, 'nonexistent-skill')).toThrow(/nonexistent-skill/);
    expect(() => resolveSkillRow(map, 'nonexistent-skill')).toThrow(/adaptive/);
    expect(() => resolveSkillRow(map, 'nonexistent-skill')).toThrow(/impeccable/);
  });
});

describe('kiroSkillRef / ccSkillRef — per-target reference syntax', () => {
  it('renders the Kiro skill:// path form', () => {
    const row = { canonical: 'skills/edge-to-edge', targets: { cc: '.claude/skills/edge-to-edge', kiro: '.kiro/skills/android/edge-to-edge' }, owners: ['data'] };
    expect(kiroSkillRef(row)).toBe('skill://.kiro/skills/android/edge-to-edge/SKILL.md');
  });

  it('renders the CC flat-name form as the basename of targets.cc', () => {
    const row = { canonical: 'skills/edge-to-edge', targets: { cc: '.claude/skills/edge-to-edge', kiro: '.kiro/skills/android/edge-to-edge' }, owners: ['data'] };
    expect(ccSkillRef(row)).toBe('edge-to-edge');
  });
});

describe('emitSkillTrees — byte-identical, deterministic per-target emit (temp fixture)', () => {
  let tmpRoot: string;

  beforeEach(() => {
    tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-emit-test-'));
    // A tiny fake canonical skill tree: SKILL.md + a nested subdir file.
    const canonicalDir = path.join(tmpRoot, 'skills', 'fake-skill');
    fs.mkdirSync(path.join(canonicalDir, 'references'), { recursive: true });
    fs.writeFileSync(path.join(canonicalDir, 'SKILL.md'), '---\nname: fake-skill\ndescription: A fake skill for testing.\n---\nBody content.\n');
    fs.writeFileSync(path.join(canonicalDir, 'references', 'notes.md'), 'nested reference content\n');
  });

  afterEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  function fakeMap(): SkillsMap {
    return {
      rows: [
        {
          canonical: 'skills/fake-skill',
          targets: { cc: '.claude/skills/fake-skill', kiro: '.kiro/skills/nested/fake-skill' },
          owners: ['data'],
        },
      ],
    };
  }

  it('copies both targets byte-identical to canonical, including the nested subdir file', () => {
    emitSkillTrees(fakeMap(), tmpRoot);

    const canonicalSkillMd = fs.readFileSync(path.join(tmpRoot, 'skills', 'fake-skill', 'SKILL.md'));
    const ccSkillMd = fs.readFileSync(path.join(tmpRoot, '.claude', 'skills', 'fake-skill', 'SKILL.md'));
    const kiroSkillMd = fs.readFileSync(path.join(tmpRoot, '.kiro', 'skills', 'nested', 'fake-skill', 'SKILL.md'));
    expect(ccSkillMd.equals(canonicalSkillMd)).toBe(true);
    expect(kiroSkillMd.equals(canonicalSkillMd)).toBe(true);

    const canonicalNotes = fs.readFileSync(path.join(tmpRoot, 'skills', 'fake-skill', 'references', 'notes.md'));
    const ccNotes = fs.readFileSync(path.join(tmpRoot, '.claude', 'skills', 'fake-skill', 'references', 'notes.md'));
    const kiroNotes = fs.readFileSync(path.join(tmpRoot, '.kiro', 'skills', 'nested', 'fake-skill', 'references', 'notes.md'));
    expect(ccNotes.equals(canonicalNotes)).toBe(true);
    expect(kiroNotes.equals(canonicalNotes)).toBe(true);
  });

  it('reports both targets written, sorted by canonical row order', () => {
    const result = emitSkillTrees(fakeMap(), tmpRoot);
    expect(result.targets).toEqual(['cc', 'kiro']);
    expect(result.written.some((f) => f.includes(path.join('.claude', 'skills', 'fake-skill', 'SKILL.md')))).toBe(true);
    expect(result.written.some((f) => f.includes(path.join('.kiro', 'skills', 'nested', 'fake-skill', 'SKILL.md')))).toBe(true);
  });

  it('two emits produce identical file sets (determinism)', () => {
    const result1 = emitSkillTrees(fakeMap(), tmpRoot);
    const result2 = emitSkillTrees(fakeMap(), tmpRoot);
    expect(result2.written).toEqual(result1.written);
  });
});
