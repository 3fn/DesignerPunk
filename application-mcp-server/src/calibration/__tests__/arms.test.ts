/**
 * Components calibration arms + scoring — pure functions over synthetic evidence rows
 * (charter `.kiro/issues/2026-10-17-components-calibration-instrument-charter.md` §§ 6, 8, 10).
 * No live corpus here: parity and R3 are never run on the real fixture by the test suite.
 */

import { MatchedOnEntry, deriveMatchConfidence } from '../../query/QueryEngine';
import { parityArm, r3Arm, RowEvidence, statusQuoArm } from '../arms';
import { acceptance, FixtureRow, QueryRun, rankUnderArm, scoreArm } from '../run';

const h = (term: string): MatchedOnEntry => ({ field: 'highSignal', term });
const l = (term: string): MatchedOnEntry => ({ field: 'lowSignal', term });
const ev = (name: string, family: string, matchedOn: MatchedOnEntry[], totalTokens: number): RowEvidence => ({
  name, family, matchedOn, matchedTokens: new Set(matchedOn.map(m => m.term)).size, totalTokens,
});

describe('statusQuoArm', () => {
  it('is the shipped deriveMatchConfidence', () => {
    const cases = [ev('X-Y', 'F', [h('a')], 3), ev('X-Y', 'F', [l('a'), l('b')], 2), ev('X-Y', 'F', [], 2)];
    for (const e of cases) expect(statusQuoArm(e)).toBe(deriveMatchConfidence(e.matchedOn, e.matchedTokens, e.totalTokens, { name: e.name, family: e.family }));
  });
});

describe('parityArm (≥ 0.5 any-field coverage with a high-signal hit)', () => {
  it('1/2 with a high-signal hit → strong (boundary inclusive)', () => {
    expect(parityArm(ev('A-B', 'F', [h('x')], 2))).toBe('strong');
  });
  it('1/3 with a high-signal hit → partial', () => {
    expect(parityArm(ev('A-B', 'F', [h('x')], 3))).toBe('partial');
  });
  it('low-signal-only full coverage → partial; zero → none', () => {
    expect(parityArm(ev('A-B', 'F', [l('x'), l('y')], 2))).toBe('partial');
    expect(parityArm(ev('A-B', 'F', [], 2))).toBe('none');
  });
});

describe('r3Arm — the six defining cases (charter § 10)', () => {
  it('single-token own-name hit → strong', () => {
    expect(r3Arm(ev('Input-Checkbox-Base', 'FormInput', [h('checkbox')], 1))).toBe('strong');
  });
  it('single-token family hit → strong', () => {
    expect(r3Arm(ev('Nav-TabBar-Base', 'Navigation', [h('navigation')], 1))).toBe('strong');
  });
  it('single-token purpose-only hit → partial', () => {
    expect(r3Arm(ev('Nav-SegmentedChoice-Base', 'Navigation', [h('switch')], 1))).toBe('partial');
  });
  it('lone concept-suffix hit at 1/2 → partial', () => {
    expect(r3Arm(ev('Button-VerticalList-Item', 'Button', [h('error')], 2))).toBe('partial');
  });
  it('2 of 3 matched with one high-signal → strong', () => {
    expect(r3Arm(ev('Avatar-Base', 'Avatar', [h('user'), l('profile')], 3))).toBe('strong');
  });
  it('low-signal-only full coverage → partial; zero → none', () => {
    expect(r3Arm(ev('Input-Text-Base', 'FormInput', [l('login'), l('form')], 2))).toBe('partial');
    expect(r3Arm(ev('Input-Text-Base', 'FormInput', [], 2))).toBe('none');
  });
  it('name hit with unmatched modifiers stays strong at 1/3', () => {
    expect(r3Arm(ev('Input-Checkbox-Base', 'FormInput', [h('checkbox')], 3))).toBe('strong');
  });
});

describe('rankUnderArm uses the shipped rankCompare (tier, coverage, own-name hit, name)', () => {
  it('a strong row outranks a partial with higher coverage', () => {
    const rows = [ev('Zed-Base', 'Z', [l('alpha'), l('zed')], 2), ev('Alpha-Base', 'A', [h('alpha')], 2)];
    expect(rankUnderArm(rows, 'status-quo').map(r => r.name)).toEqual(['Alpha-Base', 'Zed-Base']);
  });
});

describe('§ 6 scoring', () => {
  const key = (cls: 'positive' | 'gap', accept: string[]) => ({ class: cls, accept, closestSensible: [], f4: null, note: 'n' });
  const rows: FixtureRow[] = [
    { id: 'P1', seat: 's', phrase: 'p', need: 'n', seatLabel: 'A', preExposed: [], key: key('positive', ['Good']) },
    { id: 'G1', seat: 's', phrase: 'g', need: 'n', seatLabel: 'B', preExposed: ['stage0'], key: key('gap', []) },
  ];
  const runs: QueryRun[] = [
    { id: 'P1', byArm: { 'status-quo': [{ name: 'Good', tier: 'strong', rank: 1 }], r3: [{ name: 'Good', tier: 'partial', rank: 1 }] } },
    { id: 'G1', byArm: { 'status-quo': [{ name: 'Wrong', tier: 'strong', rank: 1 }], r3: [{ name: 'Wrong', tier: 'partial', rank: 1 }] } },
  ];
  it('counts CW pairs, TSL, net, R@1/R@2 and the acceptance verdict', () => {
    const sq = scoreArm(rows, runs, 'status-quo', () => true);
    const r3 = scoreArm(rows, runs, 'r3', () => true);
    expect([...sq.cw]).toEqual(['G1::Wrong']);
    expect(r3.cw.size).toBe(0);
    const acc = acceptance(sq, r3);
    expect(acc.fixedCW).toBe(1);
    expect(acc.tsl).toEqual(['P1']);
    expect(acc.net).toBe(0);
    expect(acc.r1).toEqual([1, 1]);
    expect(acc.accepted).toBe(false);
    expect(r3.gapOutcome.get('G1')!.outcome).toBe('partial');
  });
  it('the include predicate excludes pre-exposed rows', () => {
    const sq = scoreArm(rows, runs, 'status-quo', r => r.preExposed.length === 0);
    expect(sq.cw.size).toBe(0);
    expect(sq.positives).toBe(1);
  });
});
