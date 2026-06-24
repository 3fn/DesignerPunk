/**
 * @category evergreen
 * @purpose Spec 117 Task 5.1 — absolute correctness-property invariants (P3 no-rgba scoped to
 *          OKLCH-migrated primitives; P5 theme-varying base-scoped + anti-conflation guard).
 *
 * These assert the invariants the committed-vs-fresh re-diff CANNOT catch (defects intrinsic to
 * both sides). Each test pairs a positive case (corrected artifact passes) with a negative case
 * (a regression is caught and named) — "a changed timestamp is ignored; a changed value is not"
 * applied to invariants: a legacy rgba / a registry-wide leak must NOT pass.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  assertNoLegacyColorFormat,
  assertThemeVaryingBaseScoped,
  assertTokenIndexInvariants,
  rgbaColorPrimitives,
  themeVaryingTrueKeys,
  EXPECTED_BASE_THEME_VARYING,
  SHADOW_COLOR_PRIMITIVES,
} from '../Invariants';

const REPO_ROOT = path.resolve(__dirname, '../../../..');
const PRIMITIVES = path.join(REPO_ROOT, 'token-index/primitives.yaml');
const SEMANTICS = path.join(REPO_ROOT, 'token-index/semantics.yaml');

const readPrimitives = () => fs.readFileSync(PRIMITIVES, 'utf-8');
const readSemantics = () => fs.readFileSync(SEMANTICS, 'utf-8');

describe('Invariants — P3 no-rgba scoped to OKLCH-migrated primitives', () => {
  it('passes on the committed primitives.yaml (only the shadow family carries rgba)', () => {
    expect(assertNoLegacyColorFormat(readPrimitives())).toEqual([]);
  });

  it('confirms the rgba-bearing color primitives are EXACTLY the shadow family', () => {
    expect(rgbaColorPrimitives(readPrimitives()).sort()).toEqual([...SHADOW_COLOR_PRIMITIVES].sort());
  });

  it('catches a non-shadow OKLCH-migrated primitive that regressed to legacy rgba', () => {
    const yaml = [
      'tokens:',
      '  gray100:',
      '    family: color',
      '    value:',
      '      light:',
      '        base: rgba(255, 255, 255, 1)', // a legacy regression — gray100 must be oklch
      '      dark:',
      '        base: oklch(0.2 0 0)',
    ].join('\n');
    const violations = assertNoLegacyColorFormat(yaml);
    expect(violations).toHaveLength(1);
    expect(violations[0].invariant).toBe('P3-no-rgba');
    expect(violations[0].locator).toBe('gray100');
  });

  it('does NOT flag the shadow family for carrying rgba (the ratified scope)', () => {
    const yaml = [
      'tokens:',
      '  shadowBlack100:',
      '    family: color',
      '    value:',
      '      light:',
      '        base: rgba(0, 0, 0, 1)',
    ].join('\n');
    expect(assertNoLegacyColorFormat(yaml)).toEqual([]);
  });

  it('surfaces (does not silently pass) a shadow primitive that gained oklch — allowlist must be revisited', () => {
    const yaml = [
      'tokens:',
      '  shadowBlack100:',
      '    family: color',
      '    value:',
      '      light:',
      '        base: oklch(0 0 0)', // shadow migration landed → allowlist should shrink
    ].join('\n');
    const violations = assertNoLegacyColorFormat(yaml);
    expect(violations).toHaveLength(1);
    expect(violations[0].locator).toBe('shadowBlack100');
  });

  it('ignores non-color families even if (hypothetically) they contained an rgba-like string', () => {
    const yaml = [
      'tokens:',
      '  space100:',
      '    family: spacing',
      '    value: 8',
    ].join('\n');
    expect(assertNoLegacyColorFormat(yaml)).toEqual([]);
  });
});

describe('Invariants — P5 theme-varying base-scoped + anti-conflation', () => {
  it('passes on the committed semantics.yaml (exactly the 5 base keys)', () => {
    expect(assertThemeVaryingBaseScoped(readSemantics())).toEqual([]);
  });

  it('confirms the themeVarying:true set equals the expected base-scoped 5', () => {
    expect(themeVaryingTrueKeys(readSemantics()).sort()).toEqual([...EXPECTED_BASE_THEME_VARYING].sort());
  });

  it('catches the §4.1 regression: registry-wide WCAG-only over-marks leaking in', () => {
    // Simulate the index being re-wired to the registry-wide Set (10): the 5 base keys
    // PLUS the WCAG-only over-marks become themeVarying: true.
    const lines = ['tokens:'];
    for (const key of EXPECTED_BASE_THEME_VARYING) {
      lines.push(`  ${key}:`, `    themeVarying: true`);
    }
    // The leak — a WCAG-only over-mark.
    lines.push('  color.action.primary:', '    themeVarying: true');
    const violations = assertThemeVaryingBaseScoped(lines.join('\n'));
    // One "unexpected key" (exact-set) + one named anti-conflation sentinel.
    const sentinel = violations.find((v) => v.invariant === 'P5-anti-conflation');
    expect(sentinel).toBeDefined();
    expect(sentinel!.locator).toBe('color.action.primary');
  });

  it('catches an under-mark: a base key wrongly flipped to false', () => {
    const lines = ['tokens:'];
    // All but one of the base keys marked true.
    for (const key of EXPECTED_BASE_THEME_VARYING.slice(1)) {
      lines.push(`  ${key}:`, `    themeVarying: true`);
    }
    lines.push(`  ${EXPECTED_BASE_THEME_VARYING[0]}:`, `    themeVarying: false`);
    const violations = assertThemeVaryingBaseScoped(lines.join('\n'));
    const underMark = violations.find((v) => v.locator === EXPECTED_BASE_THEME_VARYING[0]);
    expect(underMark).toBeDefined();
    expect(underMark!.invariant).toBe('P5-theme-varying-base-scoped');
  });
});

describe('Invariants — aggregate over the committed token index', () => {
  it('all token-index invariants hold on the committed (corrected) artifacts', () => {
    expect(
      assertTokenIndexInvariants({
        primitivesYaml: readPrimitives(),
        semanticsYaml: readSemantics(),
      }),
    ).toEqual([]);
  });
});
