/**
 * @category evergreen
 * @purpose Spec 129 Task 10.2 (Req 13.2): a DesignerPunk component token whose custom value is off its
 * family's grid, with no offGridReason, fails the repository's lane. Runs the family rule over the REAL
 * component token files (the validator's other tests build their own fixtures), and shows the rule
 * red on a token that does not conform.
 */
import * as fs from 'fs';
import * as path from 'path';
import { componentTokenConformanceErrors, validateFamilyConformance } from '../ValidationCoordinator';
import { getTokenContract, defineComponentTokens } from '../../build/tokens/defineComponentTokens';
import type { RegisteredComponentToken } from '../../registries/ComponentTokenRegistry';
import { PrimitiveTokenRegistry } from '../../registries/PrimitiveTokenRegistry';

const SRC = path.resolve(__dirname, '../..');

/** DesignerPunk's own component token definition files: the two roots `generate` reads in this repo. */
function realTokenFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { if (e.name !== '__tests__') walk(full); continue; }
      if (!e.name.endsWith('.ts') || e.name.endsWith('.test.ts') || e.name.endsWith('.d.ts')) continue;
      if (dir.startsWith(path.join(SRC, 'tokens', 'component')) || e.name === 'tokens.ts' || e.name.endsWith('.tokens.ts')) {
        out.push(full);
      }
    }
  };
  walk(path.join(SRC, 'components', 'core'));
  walk(path.join(SRC, 'tokens', 'component'));
  return out;
}

function harvest(): RegisteredComponentToken[] {
  const tokens: RegisteredComponentToken[] = [];
  for (const file of realTokenFiles()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(file) as Record<string, unknown>;
    for (const exported of Object.values(mod)) {
      tokens.push(...(getTokenContract(exported) ?? []));
    }
  }
  return tokens;
}

describe('DesignerPunk component tokens conform to their family (Spec 129 Task 10.2, Req 13.2)', () => {
  const real = harvest();

  it('harvests the real set (not vacuous)', () => {
    expect(realTokenFiles().length).toBeGreaterThanOrEqual(7);
    expect(real.length).toBeGreaterThan(20);
    // the four value-path tokens of the record, 2026-10-24
    const valuePath = real.filter(t => !t.primitiveReference).map(t => t.name).sort();
    expect(valuePath).toEqual(expect.arrayContaining([
      'badgelabelbase.maxWidth', 'verticallistitem.paddingBlock.rest',
    ]));
  });

  it('every DesignerPunk component token conforms (the lane fails on one that does not)', () => {
    const failures = real.flatMap(t => componentTokenConformanceErrors(t));
    expect(failures).toEqual([]);
  });

  describe('the rule, red on a token that does not conform', () => {
    const tok = (over: Partial<RegisteredComponentToken & { offGridReason?: string }>) => ({
      name: 'x.y', component: 'X', family: 'spacing', value: 11, reasoning: 'r', ...over,
    }) as RegisteredComponentToken;

    it('an off-grid value with no offGridReason is reported, naming the token', () => {
      const errors = componentTokenConformanceErrors(tok({}));
      expect(errors).toHaveLength(1);
      expect(errors[0]).toContain('x.y');
      expect(errors[0]).toContain('offGridReason');
    });

    it('the same value with a derivation conforms; an empty or blank reason does not', () => {
      expect(componentTokenConformanceErrors(tok({ offGridReason: '(48 - 24) / 2 - 1 = 11' }))).toEqual([]);
      expect(componentTokenConformanceErrors(tok({ offGridReason: '' }))).toHaveLength(1);
      expect(componentTokenConformanceErrors(tok({ offGridReason: '   ' }))).toHaveLength(1);
    });

    it('a primitive reference is not checked for its value', () => {
      expect(componentTokenConformanceErrors(tok({ primitiveReference: 'space125', value: 10 }))).toEqual([]);
    });

    it('defineComponentTokens carries offGridReason onto the registered token', () => {
      const t = defineComponentTokens({
        component: 'Probe', family: 'spacing',
        tokens: { a: { value: 11, reasoning: 'r', offGridReason: 'derived' }, b: { value: 12, reasoning: 'r' } },
      });
      const rich = getTokenContract(t)!;
      expect((rich[0] as { offGridReason?: string }).offGridReason).toBe('derived');
      expect('offGridReason' in rich[1]).toBe(false);
    });
  });

  describe('the grid (D-8): BASE × k × step, k whole, no upper cap; sizing is validated too', () => {
    const reg = new PrimitiveTokenRegistry();
    it.each([['spacing', 120], ['spacing', 640], ['sizing', 12], ['sizing', 64], ['sizing', 120]])(
      '%s %d is on the grid', (family, value) => {
        expect(validateFamilyConformance(family, value, reg).valid).toBe(true);
      });
    it.each([['spacing', 11], ['sizing', 11], ['sizing', 13], ['spacing', -2]])(
      '%s %d is off the grid', (family, value) => {
        expect(validateFamilyConformance(family, value, reg).valid).toBe(false);
      });
    it('sizing no longer falls to the unknown-family warning', () => {
      expect(validateFamilyConformance('sizing', 12, reg).warning ?? '').not.toMatch(/does not have specific validation rules/);
    });
  });
});
