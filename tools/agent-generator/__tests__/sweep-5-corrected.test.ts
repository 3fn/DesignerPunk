/**
 * Sweep 5 (corrected-state-holds — PRE-CUTOVER GATE ONLY) tests — Spec 122 Task 7.2.
 * Prove-it-bites: re-introduce `.web.tsx` in the scanned input (Req 19 AC2).
 */

import { runSweep5, HISTORICAL_LINE } from '../sweeps/sweep-5-corrected';

const CLEAN_CONTRACT_DOC = [
  'description: catalog with all 136 concepts, naming convention',
  '',
  '136 concepts across 10 categories. Originally 116, derived from the Spec 078 audit.',
  'The Concept Catalog above lists all 136 concepts. For the historical migration mapping (113 source names → 104 canonical names), see findings.',
  'Current: 136 concepts.',
].join('\n');

describe('sweep 5 — corrected-state-holds (pre-cutover gate only)', () => {
  it('passes clean canonical source + a single distinct concept count, recording both count-asserts', () => {
    const report = runSweep5({
      scanFiles: { 'canonical/agents/lina.md': 'scaffold .web.ts files\n' },
      contractReferenceText: CLEAN_CONTRACT_DOC,
    });
    expect(report.pass).toBe(true);
    const infos = report.findings.filter((f) => f.verdict === 'INFO');
    expect(infos.find((f) => f.path === 'web-tsx-count')?.observed).toContain('0 `.web.tsx`');
    expect(infos.find((f) => f.path === 'contract-system-reference')?.observed).toContain(
      'single distinct concept-count: 136'
    );
  });

  it('PROVE-IT-BITES: a re-introduced `.web.tsx` FAILS, count-asserted, naming file:line', () => {
    const report = runSweep5({
      scanFiles: { 'canonical/agents/lina.md': 'ok line\nscaffold Button.web.tsx here\n' },
      contractReferenceText: CLEAN_CONTRACT_DOC,
    });
    expect(report.pass).toBe(false);
    const fail = report.findings.find((f) => f.verdict === 'FAIL');
    expect(fail?.path).toBe('canonical/agents/lina.md:2');
    expect(report.findings.find((f) => f.path === 'web-tsx-count')?.observed).toContain('1 `.web.tsx`');
  });

  it('L3: historical-context lines are excluded — a two-count doc passes when the second count is historical', () => {
    // Line 3 carries 116 next to "Originally" and line 4 carries 113/104 next to
    // "migration"/"source names" — the live lines 49/113 shape. Only 136 survives.
    const report = runSweep5({ scanFiles: {}, contractReferenceText: CLEAN_CONTRACT_DOC });
    expect(report.pass).toBe(true);
  });

  it('FAILS on two distinct non-historical concept counts (the 117-vs-136 self-contradiction class)', () => {
    const doc = 'Catalog: 136 concepts.\nElsewhere: 117 concepts today.\n';
    const report = runSweep5({ scanFiles: {}, contractReferenceText: doc });
    expect(report.pass).toBe(false);
    expect(report.findings.find((f) => f.verdict === 'FAIL')?.observed).toContain('2 distinct');
  });

  it('FAILS on ZERO extracted counts (broken extractor is loud, not silently green)', () => {
    const report = runSweep5({ scanFiles: {}, contractReferenceText: 'no counts here' });
    expect(report.pass).toBe(false);
    expect(report.findings.find((f) => f.verdict === 'FAIL')?.observed).toContain('ZERO');
  });

  it('the L3 exclusion pattern covers all four design tokens', () => {
    for (const token of ['Originally', 'historical', 'migration', 'source names']) {
      expect(HISTORICAL_LINE.test(`a line with ${token} in it`)).toBe(true);
    }
    expect(HISTORICAL_LINE.test('a current-catalog line')).toBe(false);
  });
});
