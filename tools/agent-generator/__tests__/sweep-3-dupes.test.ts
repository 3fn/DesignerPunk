/**
 * Sweep 3 (resources double-load) tests — Spec 122 Task 7.1.
 * The prove-it-bites are the design's FREE POSITIVES (live kenya.json/leonardo.json
 * double-loads) — exercised here on the exact live shape, and recorded live via the CLI's
 * `--all-configs` run in the Task 7.1 completion doc.
 */

import { runSweep3, normalizeResourceUri } from '../sweeps/sweep-3-dupes';

describe('sweep 3 — resources double-load', () => {
  it('normalizes file:// and skill:// URIs to the same doc path', () => {
    expect(normalizeResourceUri('file://governance/Product-Token-Governance.md')).toEqual({
      scheme: 'file',
      docPath: 'governance/Product-Token-Governance.md',
    });
    expect(normalizeResourceUri('skill://governance/Product-Token-Governance.md').docPath).toBe(
      'governance/Product-Token-Governance.md'
    );
    expect(normalizeResourceUri('file://./x.md').docPath).toBe('x.md');
  });

  it('PROVE-IT-BITES (free positive, kenya.json shape): file:// + skill:// same doc FAILS', () => {
    const report = runSweep3({
      configs: [
        {
          agent: 'kenya',
          resources: [
            'file://governance/Product-Token-Governance.md',
            'skill://.kiro/steering/start-up-tasks.md',
            'skill://governance/Product-Token-Governance.md',
          ],
        },
      ],
    });
    expect(report.pass).toBe(false);
    const fail = report.findings.find((f) => f.verdict === 'FAIL');
    expect(fail?.agent).toBe('kenya');
    expect(fail?.path).toBe('governance/Product-Token-Governance.md');
    expect(fail?.observed).toContain('file://');
    expect(fail?.observed).toContain('skill://');
  });

  it('passes a config with no duplicates', () => {
    const report = runSweep3({
      configs: [{ agent: 'ada', resources: ['file://a.md', 'skill://b.md'] }],
    });
    expect(report.pass).toBe(true);
  });

  it('records a visible vacuous PASS on zero in-scope configs (pre-cutover)', () => {
    const report = runSweep3({ configs: [] });
    expect(report.pass).toBe(true);
    expect(report.findings[0].verdict).toBe('INFO');
    expect(report.findings[0].observed).toContain('vacuous PASS');
  });

  it('handles rich knowledgeBase OBJECT entries (ada.json/lina.json live shape) via their source URI', () => {
    const report = runSweep3({
      configs: [
        {
          agent: 'ada',
          resources: [
            'file://./src/tokens',
            { type: 'knowledgeBase', source: 'file://./src/tokens', name: 'RosettaTokenSource' },
            { type: 'knowledgeBase', name: 'no-source-object' },
          ],
        },
      ],
    });
    expect(report.pass).toBe(false); // string + object both load src/tokens
    expect(report.findings[0].path).toBe('src/tokens');
  });

  it('also flags a same-scheme duplicate (still a double-load)', () => {
    const report = runSweep3({
      configs: [{ agent: 'x', resources: ['file://a.md', 'file://a.md'] }],
    });
    expect(report.pass).toBe(false);
  });
});
