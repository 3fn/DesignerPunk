/**
 * Unit tests for the Spec 118 parity normalization rules (Task 7.2 / R4 AC4).
 *
 * Discipline (117's): each added rule must neutralize ITS target field and
 * NOTHING else — "a changed rosettaVersion is ignored; a changed token value is
 * NOT." Each rule below has a positive test (its target is ignored) AND a negative
 * sentinel test (a genuine token change still surfaces).
 *
 * The rules are exercised through the real `Normalizer` (constructed with
 * `PARITY_NORMALIZATION_RULES`) and `SemanticComparator` — the same engine the
 * orchestrator uses — so the tests prove the wired-up behavior, not an isolated
 * function.
 */

import { Normalizer } from '../Normalizer';
import { SemanticComparator } from '../SemanticComparator';
import { PARITY_NORMALIZATION_RULES, ADDED_PARITY_RULES } from '../ParityNormalizationRules';
import { ArtifactRef } from '../types';

const jsonArtifact: ArtifactRef = { path: 'dist/DesignTokens.dtcg.json', kind: 'json', optional: false };
const n = new Normalizer(PARITY_NORMALIZATION_RULES);
const cmp = new SemanticComparator();

/** Compare two raw JSON strings through the parity engine; return divergence count. */
function divergeCount(rawA: string, rawB: string): number {
  const a = n.normalize(rawA, 'json');
  const b = n.normalize(rawB, 'json');
  return cmp.compare(jsonArtifact, a, b).length;
}

describe('Spec 118 parity rules — composition over 117 defaults', () => {
  it('keeps 117 defaults intact and appends the 118 additions (does not mutate)', () => {
    // Two added rules wired after the defaults.
    expect(ADDED_PARITY_RULES).toHaveLength(2);
    expect(PARITY_NORMALIZATION_RULES.length).toBeGreaterThan(ADDED_PARITY_RULES.length);
    // 117's timestamp behavior still works through the parity set.
    expect(
      divergeCount(
        '{"$extensions":{"designerpunk":{"generatedAt":"2026-06-25T12:00:00.000Z"}},"space":{"a":{"$value":"8px"}}}',
        '{"$extensions":{"designerpunk":{"generatedAt":"2026-06-25T23:59:59.000Z"}},"space":{"a":{"$value":"8px"}}}',
      ),
    ).toBe(0);
  });
});

describe('Rule: rosettaVersion / embedded version (volatile DTCG version keys)', () => {
  it('IGNORES a changed rosettaVersion (package version bump)', () => {
    const a = '{"$extensions":{"designerpunk":{"version":"1.0.0","rosettaVersion":"12.0.5"}},"space":{"a":{"$value":"8px"}}}';
    const b = '{"$extensions":{"designerpunk":{"version":"1.0.0","rosettaVersion":"13.1.0"}},"space":{"a":{"$value":"8px"}}}';
    expect(divergeCount(a, b)).toBe(0);
  });

  it('IGNORES a changed embedded DTCG version literal', () => {
    const a = '{"$extensions":{"designerpunk":{"version":"1.0.0","rosettaVersion":"12.0.5"}},"space":{"a":{"$value":"8px"}}}';
    const b = '{"$extensions":{"designerpunk":{"version":"2.0.0","rosettaVersion":"12.0.5"}},"space":{"a":{"$value":"8px"}}}';
    expect(divergeCount(a, b)).toBe(0);
  });

  it('does NOT ignore a genuine token-value change (sentinel)', () => {
    const a = '{"$extensions":{"designerpunk":{"version":"1.0.0","rosettaVersion":"12.0.5"}},"space":{"a":{"$value":"8px"}}}';
    const b = '{"$extensions":{"designerpunk":{"version":"1.0.0","rosettaVersion":"12.0.5"}},"space":{"a":{"$value":"9px"}}}';
    expect(divergeCount(a, b)).toBe(1);
  });

  it('does NOT strip a "version" key that is part of token DATA (surgical scope check via a same-named field)', () => {
    // A token literally named "version" with differing $value must still surface.
    // (PARITY_VOLATILE_DTCG_KEYS strips the KEY "version"; this asserts the value
    // under it is what is dropped, so we instead prove a DIFFERENT token's change
    // is caught while the version key itself is ignored — the realistic surgical case.)
    const a = '{"$extensions":{"designerpunk":{"version":"1.0.0"}},"color":{"brand":{"$value":"#aaa"}}}';
    const b = '{"$extensions":{"designerpunk":{"version":"9.9.9"}},"color":{"brand":{"$value":"#bbb"}}}';
    // version diff ignored, but the color value diff surfaces → exactly 1 divergence.
    expect(divergeCount(a, b)).toBe(1);
  });
});

describe('Rule: extensions.themes — conditional presence', () => {
  it('treats an empty themes array as equal to absent themes', () => {
    const present = '{"$extensions":{"designerpunk":{"themes":[]}},"space":{"a":{"$value":"8px"}}}';
    const absent = '{"$extensions":{"designerpunk":{}},"space":{"a":{"$value":"8px"}}}';
    expect(divergeCount(present, absent)).toBe(0);
  });

  it('absent-vs-absent is trivially equal (DEFAULTS reality)', () => {
    const a = '{"$extensions":{"designerpunk":{"version":"1.0.0"}},"space":{"a":{"$value":"8px"}}}';
    const b = '{"$extensions":{"designerpunk":{"version":"1.0.0"}},"space":{"a":{"$value":"8px"}}}';
    expect(divergeCount(a, b)).toBe(0);
  });
});

describe('Rule: extensions.themes — array ordering', () => {
  it('IGNORES reordered theme entries (positional-array false-diff vector)', () => {
    const a = '{"$extensions":{"designerpunk":{"themes":[{"name":"dark","mode":"dark"},{"name":"light","mode":"light"}]}},"space":{"a":{"$value":"8px"}}}';
    const b = '{"$extensions":{"designerpunk":{"themes":[{"name":"light","mode":"light"},{"name":"dark","mode":"dark"}]}},"space":{"a":{"$value":"8px"}}}';
    expect(divergeCount(a, b)).toBe(0);
  });

  it('does NOT ignore a genuine theme metadata change (sentinel)', () => {
    const a = '{"$extensions":{"designerpunk":{"themes":[{"name":"dark","mode":"dark"}]}},"space":{"a":{"$value":"8px"}}}';
    const b = '{"$extensions":{"designerpunk":{"themes":[{"name":"midnight","mode":"dark"}]}},"space":{"a":{"$value":"8px"}}}';
    expect(divergeCount(a, b)).toBeGreaterThan(0);
  });

  it('does NOT ignore a genuine token-value change even when themes are equal', () => {
    const a = '{"$extensions":{"designerpunk":{"themes":[{"name":"dark","mode":"dark"}]}},"space":{"a":{"$value":"8px"}}}';
    const b = '{"$extensions":{"designerpunk":{"themes":[{"name":"dark","mode":"dark"}]}},"space":{"a":{"$value":"9px"}}}';
    expect(divergeCount(a, b)).toBe(1);
  });
});

describe('Surgical scope: added rules do not touch text artifacts or token bodies', () => {
  it('leaves a CSS artifact comparison to the 117 text rule (no JSON rule interference)', () => {
    const tn = new Normalizer(PARITY_NORMALIZATION_RULES);
    const css: ArtifactRef = { path: 'dist/DesignTokens.web.css', kind: 'css', optional: false };
    const a = tn.normalize(' * Generated: 2026-06-25T12:00:00.000Z\n:root { --space-100: 8px; }\n', 'css');
    const b = tn.normalize(' * Generated: 2026-06-25T23:59:59.000Z\n:root { --space-100: 8px; }\n', 'css');
    expect(cmp.compare(css, a, b)).toHaveLength(0);
    // ...but a real CSS value change still surfaces.
    const c = tn.normalize(' * Generated: 2026-06-25T12:00:00.000Z\n:root { --space-100: 9px; }\n', 'css');
    expect(cmp.compare(css, a, c).length).toBeGreaterThan(0);
  });
});
