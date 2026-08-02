/**
 * Sweep 8 (demotion-diff) tests — Spec 122 Task 7.2.
 * Prove-it-bites: remove a doc from a fixture agent's ambient without a `replaces` cue
 * (Req 19 AC2). Also proves the D-A1 artifact-path namespace and the K-D1 unconditional
 * negative.
 */

import { runSweep8, serializeDemotionDeltas, collectReplacesKeys } from '../sweeps/sweep-8-demotion';
import type { CanonicalAgentDoc, GroundTruthManifestTrim } from '../schema';

const KT_TRIM: GroundTruthManifestTrim = {
  artifact: 'dist/android/DesignTokens.android.kt',
  fires: 'unconditional',
  cue: {
    negative: 'do NOT read dist/android/DesignTokens.android.kt',
    tool: 'get_token_details',
    mcp: 'application',
    replaces: 'dist/android/DesignTokens.android.kt',
  },
};

describe('collectReplacesKeys — promoted doc routes carry their demotion marker (119-B R6 AC3 amendment)', () => {
  it('collects replaces from routes.docs alongside routes.cues and trims', () => {
    const doc = {
      frontmatter: {
        routes: {
          cues: [{ when: 'w', tool: 'get_section', mcp: 'docs', replaces: 'cue-doc' }],
          docs: [
            { id: 'r1', doc: 'token-family-color', when: 'w2', replaces: 'token-family-color' },
            { id: 'r2', doc: 'other-doc', section: 'H', when: 'w3' },
          ],
        },
      },
    } as unknown as CanonicalAgentDoc;
    expect(collectReplacesKeys(doc).sort()).toEqual(['cue-doc', 'token-family-color']);
  });
});

describe('sweep 8 — demotion-diff', () => {
  it('PROVE-IT-BITES: a removal with no replaces cue FAILS naming the removed member', () => {
    const { report, deltas } = runSweep8({
      agents: [
        {
          agent: '_fixture',
          baseline: { agent: '_fixture', members: ['personal-note', 'dropped-doc'] },
          freshMemberIds: ['personal-note'],
          replacesKeys: [],
          trims: [],
          emittedText: '',
        },
      ],
    });
    expect(report.pass).toBe(false);
    expect(report.findings[0].path).toBe('dropped-doc');
    expect(deltas).toEqual([{ agent: '_fixture', removals: ['dropped-doc'] }]);
  });

  it('a removal WITH a replaces cue passes', () => {
    const { report } = runSweep8({
      agents: [
        {
          agent: '_fixture',
          baseline: { agent: '_fixture', members: ['dropped-doc'] },
          freshMemberIds: [],
          replacesKeys: ['dropped-doc'],
          trims: [],
          emittedText: '',
        },
      ],
    });
    expect(report.pass).toBe(true);
  });

  it('D-A1: artifact-path members participate in the set-difference (the platform-seat case)', () => {
    const { report, deltas } = runSweep8({
      agents: [
        {
          agent: 'data',
          baseline: {
            agent: 'data',
            members: ['platform-implementation-guidelines', 'dist/android/DesignTokens.android.kt'],
          },
          freshMemberIds: ['platform-implementation-guidelines'],
          replacesKeys: ['dist/android/DesignTokens.android.kt'],
          trims: [KT_TRIM],
          emittedText: 'do NOT read dist/android/DesignTokens.android.kt — use get_token_details',
        },
      ],
    });
    // The artifact removal registers AND is covered by its replaces cue; the negative renders.
    expect(deltas[0].removals).toEqual(['dist/android/DesignTokens.android.kt']);
    expect(report.pass).toBe(true);
  });

  it('K-D1: an unconditional trim whose negative is absent from the emitted output FAILS even with NO removal', () => {
    const { report, deltas } = runSweep8({
      agents: [
        {
          agent: 'data',
          baseline: { agent: 'data', members: [] }, // orphaned artifact: not a baseline member
          freshMemberIds: [],
          replacesKeys: [],
          trims: [KT_TRIM],
          emittedText: 'an emitted body with no negative in it',
        },
      ],
    });
    expect(deltas[0].removals).toEqual([]); // decoupled from the demotion-diff
    expect(report.pass).toBe(false);
    expect(report.findings[0].observed).toContain('orphaned-artifact coverage');
  });

  it('records a vacuous PASS on zero baselines (pre-cutover)', () => {
    const { report } = runSweep8({ agents: [] });
    expect(report.pass).toBe(true);
    expect(report.findings[0].verdict).toBe('INFO');
  });

  it('serializes deltas deterministically', () => {
    const a = serializeDemotionDeltas([{ agent: 'x', removals: ['b', 'a'] }]);
    const b = serializeDemotionDeltas([{ agent: 'x', removals: ['b', 'a'] }]);
    expect(a).toBe(b);
    expect(a).toContain('"removals"');
  });
});
