/**
 * AssemblyValidator Tests
 *
 * Integration tests against real component catalog.
 */

import * as path from 'path';
import { ComponentIndexer } from '../../indexer/ComponentIndexer';
import { AssemblyValidator } from '../AssemblyValidator';

const COMPONENTS_DIR = path.resolve(__dirname, '../../../../src/components/core');

describe('AssemblyValidator', () => {
  let validator: AssemblyValidator;

  beforeAll(async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents(COMPONENTS_DIR);
    validator = new AssemblyValidator(indexer);
  });

  it('validates a single valid component', () => {
    const result = validator.validate({ component: 'Button-CTA' });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects unknown component', () => {
    const result = validator.validate({ component: 'Nonexistent-Widget' });
    expect(result.valid).toBe(false);
    expect(result.errors[0].path).toBe('root');
    expect(result.errors[0].message).toContain('not found');
  });

  it('validates valid parent-child composition (Radio-Set with Radio-Base)', () => {
    const result = validator.validate({
      component: 'Input-Radio-Set',
      children: [
        { component: 'Input-Radio-Base' },
        { component: 'Input-Radio-Base' },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it('validates VerticalList-Set with VerticalList-Item children', () => {
    const result = validator.validate({
      component: 'Button-VerticalList-Set',
      children: [
        { component: 'Button-VerticalList-Item' },
        { component: 'Button-VerticalList-Item' },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it('rejects disallowed child in VerticalList-Set', () => {
    const result = validator.validate({
      component: 'Button-VerticalList-Set',
      children: [
        { component: 'Button-VerticalList-Item' },
        { component: 'Button-CTA' },
      ],
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.path === 'root.children[1]')).toBe(true);
  });

  it('checks requires constraint (VerticalList-Set needs VerticalList-Item)', () => {
    const result = validator.validate({
      component: 'Button-VerticalList-Set',
      children: [],
    });
    expect(result.errors.some(e => e.message.includes('Missing required'))).toBe(true);
  });

  it('checks minCount constraint', () => {
    const result = validator.validate({
      component: 'Button-VerticalList-Set',
      children: [
        { component: 'Button-VerticalList-Item' },
      ],
    });
    expect(result.errors.some(e => e.message.includes('at least'))).toBe(true);
  });

  it('validates nested tree (Container → VerticalList-Set → Items)', () => {
    const result = validator.validate({
      component: 'Container-Base',
      children: [
        {
          component: 'Button-VerticalList-Set',
          children: [
            { component: 'Button-VerticalList-Item' },
            { component: 'Button-VerticalList-Item' },
          ],
        },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it('reports errors at correct paths in nested tree', () => {
    const result = validator.validate({
      component: 'Container-Base',
      children: [
        {
          component: 'Button-VerticalList-Set',
          children: [
            { component: 'Button-VerticalList-Item' },
            { component: 'Nonexistent-Widget' },
          ],
        },
      ],
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.path === 'root.children[0].children[1]')).toBe(true);
  });

  it('returns empty accessibility array (populated by AccessibilityChecker later)', () => {
    const result = validator.validate({ component: 'Button-CTA' });
    expect(result.accessibility).toEqual([]);
  });

  it('includes accessibility errors from AccessibilityChecker', () => {
    const result = validator.validate({
      component: 'Container-Base',
      props: { semantic: 'form' },
      children: [{ component: 'Input-Text-Email' }],
    });
    expect(result.valid).toBe(false);
    expect(result.accessibility.some(a => a.rule === 'form-needs-accessible-name')).toBe(true);
  });

  it('validates leaf component with no children', () => {
    const result = validator.validate({ component: 'Input-Text-Email' });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Prop VALUE checks (T3, .kiro/issues/2026-10-13-component-gaps-from-settings-ledger.md)
// ---------------------------------------------------------------------------

describe('AssemblyValidator — prop values (schema-driven)', () => {
  let validator: AssemblyValidator;
  let indexer: ComponentIndexer;

  beforeAll(async () => {
    indexer = new ComponentIndexer();
    await indexer.indexComponents(COMPONENTS_DIR);
    validator = new AssemblyValidator(indexer);
  });

  it('D12: Button-CTA size "md" is an error naming the allowed small | medium | large', () => {
    const result = validator.validate({
      component: 'Button-CTA',
      props: { label: 'Delete account', variant: 'secondary', size: 'md' },
    });
    expect(result.valid).toBe(false);
    const err = result.errors.find(e => e.message.includes('"size"'));
    expect(err).toBeDefined();
    expect(err!.path).toBe('root');
    expect(err!.component).toBe('Button-CTA');
    expect(err!.message).toContain('"md"');
    expect(err!.message).toContain("'small' | 'medium' | 'large'");
  });

  it('valid enum values pass with no errors or warnings', () => {
    const result = validator.validate({
      component: 'Button-CTA',
      props: { label: 'Delete account', variant: 'secondary', size: 'medium' },
    });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
    expect(result.valid).toBe(true);
  });

  it('boolean props must be booleans; a string "true" is an error', () => {
    const ok = validator.validate({ component: 'Nav-Header-Page', props: { title: 'Settings', showSeparator: true } });
    expect(ok.errors).toHaveLength(0);
    const bad = validator.validate({ component: 'Nav-Header-Page', props: { title: 'Settings', showSeparator: 'true' } });
    expect(bad.errors.some(e => e.message.includes('"showSeparator"') && e.message.includes('boolean'))).toBe(true);
  });

  it('number props must be numbers', () => {
    const bad = validator.validate({ component: 'Badge-Count-Base', props: { count: 'five' } });
    expect(bad.errors.some(e => e.message.includes('"count"') && e.message.includes('number'))).toBe(true);
    const ok = validator.validate({ component: 'Badge-Count-Base', props: { count: 5 } });
    expect(ok.errors).toHaveLength(0);
  });

  it('unknown prop name is a warning (not an error) that names the prop', () => {
    const result = validator.validate({ component: 'Button-CTA', props: { label: 'Go', varient: 'primary' } });
    expect(result.errors).toHaveLength(0);
    expect(result.valid).toBe(true);
    expect(result.warnings.some(w => w.message.includes('Unknown prop "varient"'))).toBe(true);
  });

  it('a missing required prop is a warning; required callback props are exempt', () => {
    const result = validator.validate({ component: 'Input-Radio-Set', props: { selectedValue: 'light' }, children: [{ component: 'Input-Radio-Base', props: { label: 'Light', value: 'light' } }, { component: 'Input-Radio-Base', props: { label: 'Dark', value: 'dark' } }] });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings.some(w => w.path === 'root' && w.message.includes('Missing required prop "accessibilityLabel"'))).toBe(true);
    const cta = validator.validate({ component: 'Button-CTA', props: { label: 'Go' } });
    expect(cta.warnings.some(w => w.message.includes('"onPress"'))).toBe(false);
  });

  it('data-binding values are not checked', () => {
    const result = validator.validate({
      component: 'Input-Checkbox-Base',
      props: { label: 'Push notifications', checked: '{UserPreferences.pushNotifications}', size: 'md' },
    });
    expect(result.errors).toHaveLength(0);
  });

  it('inherited props are known: Chip-Filter accepts Chip-Base\'s label (declared only on the parent)', () => {
    expect('label' in indexer.getComponent('Chip-Filter')!.properties).toBe(false);
    expect('label' in indexer.getComponent('Chip-Base')!.properties).toBe(true);
    const result = validator.validate({ component: 'Chip-Filter', props: { label: 'Open now', selected: true } });
    expect(result.warnings.some(w => w.message.includes('Unknown prop "label"'))).toBe(false);
    expect(result.errors).toHaveLength(0);
  });

  it('free-form string props accept any string; non-checkable types (functions, objects) are skipped', () => {
    const result = validator.validate({
      component: 'Nav-Header-Page',
      props: { title: 'Anything at all', leadingAction: { type: 'back', accessibilityLabel: 'Back' } },
    });
    expect(result.errors).toHaveLength(0);
  });

  it('nested node errors carry the node path', () => {
    const result = validator.validate({
      component: 'Container-Base',
      children: [{ component: 'Button-CTA', props: { label: 'Go', size: 'md' } }],
    });
    expect(result.errors.some(e => e.path === 'root.children[0]' && e.message.includes('"size"'))).toBe(true);
  });

  it('token-name props: token index not loaded → warning, not error', () => {
    const result = validator.validate({ component: 'Container-Base', props: { background: 'color.structure.canvas' } });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings.some(w => w.message.includes('token index not loaded'))).toBe(true);
  });

  describe('with the served token index loaded', () => {
    let tokenValidator: AssemblyValidator;

    beforeAll(async () => {
      const withTokens = new ComponentIndexer();
      await withTokens.indexComponents(COMPONENTS_DIR);
      const repoRoot = path.resolve(__dirname, '../../../..');
      await withTokens.getTokenIndexer().indexTokens(path.join(repoRoot, 'token-index'), repoRoot);
      tokenValidator = new AssemblyValidator(withTokens);
    });

    it('an existing token of the right family passes', () => {
      const result = tokenValidator.validate({ component: 'Container-Base', props: { background: 'color.structure.canvas', shadow: 'shadow.container' } });
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });

    it('a non-existent token or a token of the wrong family is an error', () => {
      const missing = tokenValidator.validate({ component: 'Container-Base', props: { background: 'color.does.not.exist' } });
      expect(missing.errors.some(e => e.message.includes('"background"') && e.message.includes('color token'))).toBe(true);
      const wrongFamily = tokenValidator.validate({ component: 'Container-Base', props: { background: 'shadow.container' } });
      expect(wrongFamily.errors.some(e => e.message.includes('"background"'))).toBe(true);
    });
  });
});
