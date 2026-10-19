/**
 * check-agent-trailer — the local early check (regrounding/check-agent-trailer.ts). Fixture commits
 * are built in a temp repo with the verify-signing-chain helpers.
 */

import { findOffenders, HINT } from '../regrounding/check-agent-trailer';
import { AGENT_ABOVE_FINAL_PARAGRAPH } from '../regrounding/verify-signing-chain';
import { cleanupTmp, commit, g, head, makeRepo, resign, write } from './fixtures/signing-chain/helpers';

function pr(): [string, string] {
  const repo = makeRepo();
  const base = head(repo);
  g(repo, ['switch', '-q', '-c', 'pr']);
  return [repo, base];
}

afterAll(() => cleanupTmp());

describe('check-agent-trailer', () => {
  test('signing commit with the trailer in the final paragraph → clean', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 't1' });
    commit(repo, 'Re-sign #identity', ['Agent: kenya', 'Co-Authored-By: Fixture <f@example.invalid>']);
    expect(findOffenders(repo, base, 'HEAD')).toEqual([]);
  });

  test('Agent: above the final paragraph → offender with the above-final-paragraph hint', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 't2' });
    commit(repo, 'Re-sign #identity', ['Agent: kenya', '', 'Co-Authored-By: Fixture <f@example.invalid>']);
    const o = findOffenders(repo, base, 'HEAD');
    expect(o).toHaveLength(1);
    expect(o[0].message).toBe(AGENT_ABOVE_FINAL_PARAGRAPH);
  });

  test('no Agent: line at all → offender with the plain hint', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 't3' });
    commit(repo, 'Re-sign #identity', []);
    const o = findOffenders(repo, base, 'HEAD');
    expect(o).toHaveLength(1);
    expect(o[0].message).toContain(HINT);
  });

  test('a commit touching no signing path is never an offender', () => {
    const [repo, base] = pr();
    write(repo, 'notes/unrelated.md', 'x\n');
    commit(repo, 'Unrelated', []);
    expect(findOffenders(repo, base, 'HEAD')).toEqual([]);
  });
});
