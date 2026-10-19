/**
 * @category evergreen
 * @purpose The named-guard selection floor's own test (step 1 of
 * `.kiro/issues/2026-10-13-named-guard-selection-floor-then-map-column-derivation.md`).
 * Exercises `scripts/ci/check-in-lane-guards.ts` against Stacy's falsification fixtures
 * (`__fixtures__/in-lane-guards/`, her specification in that record § "Falsification fixtures"):
 * red cases (a)–(g) plus item 7 (unknown context), the green case, and the CLI's exit wiring.
 * Real jest only — every case runs the real `npx jest --config <cfg> --listTests`.
 *
 * This file registers itself in `.github/in-lane-guards.json` (asserted below).
 *
 * Fixture hazard (Stacy item 1): `scripts/jest.config.js` selects `**\/__tests__/**\/*.test.ts`
 * from the repo root, so fixture guard files end in `.guard-fixture.ts`, never `.test.ts`, and
 * each case carries its own jest config whose rootDir is the case dir.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { DEFAULT_REGISTRY, REPO_ROOT, checkInLaneGuards, summaryLine } from '../ci/check-in-lane-guards';

const FIXTURES = path.join(__dirname, '__fixtures__', 'in-lane-guards');
const CHECKER = path.join(REPO_ROOT, 'scripts', 'ci', 'check-in-lane-guards.ts');
const SCOPED_LINE = /^\d+ registered in-lane guards; \d+ selected$/;

function runCase(name: string) {
  const dir = path.join(FIXTURES, name);
  return checkInLaneGuards({ registryPath: path.join(dir, 'registry.json'), root: dir });
}

function failLines(lines: string[]): string[] {
  return lines.filter((l) => l.startsWith('FAIL: '));
}

jest.setTimeout(120_000);

describe('check-in-lane-guards — red cases (Stacy item 3), each exits non-zero naming the offender', () => {
  it('(a) empty registry', () => {
    const r = runCase('empty');
    expect(r.exitCode).toBe(1);
    expect(failLines(r.lines).join('\n')).toMatch(/registry is empty/);
  });

  it('(b) malformed registry — bad JSON', () => {
    const r = runCase('malformed-json');
    expect(r.exitCode).toBe(1);
    expect(failLines(r.lines).join('\n')).toMatch(/not valid JSON/);
  });

  it('(b) malformed registry — wrong version', () => {
    const r = runCase('wrong-version');
    expect(r.exitCode).toBe(1);
    expect(failLines(r.lines).join('\n')).toMatch(/version must be 1, found 2/);
  });

  it('(b) malformed registry — missing field, naming the entry and the field', () => {
    const r = runCase('missing-field');
    expect(r.exitCode).toBe(1);
    expect(failLines(r.lines).join('\n')).toMatch(/entry 0 \("guards\/alpha\.guard-fixture\.ts"\): missing or empty field\(s\): record/);
  });

  it('(c) registered file absent', () => {
    const r = runCase('file-absent');
    expect(r.exitCode).toBe(1);
    expect(failLines(r.lines).join('\n')).toMatch(/entry 1 \(guards\/absent\.guard-fixture\.ts\): registered file is absent/);
    expect(r.lines[r.lines.length - 1]).toBe(summaryLine(2, 1));
  });

  it('(d) registered config absent', () => {
    const r = runCase('config-absent');
    expect(r.exitCode).toBe(1);
    expect(failLines(r.lines).join('\n')).toMatch(/entry 0 \(guards\/alpha\.guard-fixture\.ts\): registered config is absent/);
  });

  it('(e) the dormancy case — file exists, config loads, testMatch does not select it', () => {
    const r = runCase('dormant-testmatch');
    expect(r.exitCode).toBe(1);
    const fails = failLines(r.lines);
    expect(fails).toHaveLength(1);
    expect(fails[0]).toMatch(/entry 1 \(guards\/dormant\.guard-fixture\.ts\): DORMANT/);
    expect(r.lines[r.lines.length - 1]).toBe(summaryLine(2, 1));
  });

  it('(f) dormancy via roots', () => {
    const r = runCase('dormant-roots');
    expect(r.exitCode).toBe(1);
    const fails = failLines(r.lines);
    expect(fails).toHaveLength(1);
    expect(fails[0]).toMatch(/entry 1 \(guards\/dormant\.guard-fixture\.ts\): DORMANT/);
  });

  it('(f) dormancy via rootDir', () => {
    const r = runCase('dormant-rootdir');
    expect(r.exitCode).toBe(1);
    const fails = failLines(r.lines);
    expect(fails).toHaveLength(1);
    expect(fails[0]).toMatch(/entry 1 \(guards\/dormant\.guard-fixture\.ts\): DORMANT/);
  });

  it('(g) a duplicate entry never counts twice', () => {
    const r = runCase('duplicate');
    expect(r.exitCode).toBe(1);
    expect(failLines(r.lines).join('\n')).toMatch(/entry 2 \(guards\/alpha\.guard-fixture\.ts\): duplicate of entry 0/);
    // three entries, two distinct: the summary counts each guard once
    expect(r.lines[r.lines.length - 1]).toBe(summaryLine(2, 2));
  });

  it('(7) an entry whose context is not in EXPECTED_CONTEXTS fails', () => {
    const r = runCase('unknown-context');
    expect(r.exitCode).toBe(1);
    expect(failLines(r.lines).join('\n')).toMatch(/entry 0 \(guards\/alpha\.guard-fixture\.ts\): context "lane-not-a-required-context" is not a required context/);
  });
});

describe('check-in-lane-guards — green case (Stacy item 4)', () => {
  it('N entries all selected → exit 0 and exactly the scoped line', () => {
    const r = runCase('green');
    expect(r.exitCode).toBe(0);
    expect(r.lines).toEqual(['2 registered in-lane guards; 2 selected']);
  });

  it('the line is a claim over registered guards only — it never claims every in-lane guard', () => {
    const line = summaryLine(3, 3);
    expect(line).toMatch(SCOPED_LINE);
    expect(line).not.toMatch(/\b(all|every|each)\b/i);
    for (const l of runCase('green').lines) expect(l).not.toMatch(/\b(all|every|each)\b/i);
  });
});

describe('check-in-lane-guards — the CLI as the lane step runs it', () => {
  const cli = (name: string) =>
    spawnSync('npx', ['tsx', CHECKER, '--registry', path.join(FIXTURES, name, 'registry.json'), '--root', path.join(FIXTURES, name)], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    });

  it('green exits 0 and prints the scoped line on stdout', () => {
    const r = cli('green');
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('2 registered in-lane guards; 2 selected');
  });

  it('dormancy exits 1 and names the dormant entry', () => {
    const r = cli('dormant-testmatch');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/entry 1 \(guards\/dormant\.guard-fixture\.ts\): DORMANT/);
  });
});

describe('the real registry', () => {
  const reg = JSON.parse(fs.readFileSync(DEFAULT_REGISTRY, 'utf8')) as {
    version: number;
    guards: { file: string; config: string; context: string; record: string }[];
  };

  it('registers this test under scripts/jest.config.js (the floor registers itself)', () => {
    expect(reg.version).toBe(1);
    expect(reg.guards).toContainEqual(
      expect.objectContaining({ file: 'scripts/__tests__/in-lane-guards.test.ts', config: 'scripts/jest.config.js', context: 'lane-functional-root' }),
    );
  });

  it('registers the audience-banner guard (the charter\'s first instance)', () => {
    expect(reg.guards).toContainEqual(
      expect.objectContaining({ file: 'scripts/audience-banner/__tests__/audience-banner.test.ts', config: 'scripts/jest.config.js' }),
    );
  });

  it('names no fixture path', () => {
    for (const g of reg.guards) expect(`${g.file} ${g.config}`).not.toMatch(/__fixtures__/);
  });
});

describe('fixture hazard (Stacy item 1)', () => {
  it('no fixture file ends in .test.ts, so none is selected by scripts/jest.config.js', () => {
    const walk = (d: string): string[] =>
      fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
    const files = walk(FIXTURES);
    expect(files.length).toBeGreaterThan(0);
    expect(files.filter((f) => /\.test\.[jt]sx?$/.test(f))).toEqual([]);
  });
});
