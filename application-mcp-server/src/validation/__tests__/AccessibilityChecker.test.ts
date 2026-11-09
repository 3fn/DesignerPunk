/**
 * AccessibilityChecker Tests
 */

import { AccessibilityChecker } from '../AccessibilityChecker';

describe('AccessibilityChecker', () => {
  const checker = new AccessibilityChecker();

  describe('form-needs-accessible-name (WCAG 1.3.1)', () => {
    it('errors when form container lacks accessibilityLabel', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'form' },
      });
      expect(issues.some(i => i.rule === 'form-needs-accessible-name')).toBe(true);
    });

    it('errors for fieldset without accessibilityLabel', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'fieldset' },
      });
      expect(issues.some(i => i.rule === 'form-needs-accessible-name')).toBe(true);
    });

    it('passes when form has accessibilityLabel', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'form', accessibilityLabel: 'Login' },
        children: [{ component: 'Button-CTA' }],
      });
      expect(issues.some(i => i.rule === 'form-needs-accessible-name')).toBe(false);
    });
  });

  describe('form-needs-submit-action (WCAG 1.3.1)', () => {
    it('warns when form lacks Button-CTA', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'form', accessibilityLabel: 'Login' },
        children: [{ component: 'Input-Text-Email' }],
      });
      const issue = issues.find(i => i.rule === 'form-needs-submit-action');
      expect(issue).toBeDefined();
      expect(issue!.severity).toBe('warning');
    });

    it('names the web wiring and does not recommend a bare Button-CTA as the submit', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'form', accessibilityLabel: 'Login' },
        children: [{ component: 'Input-Text-Email' }],
      });
      const issue = issues.find(i => i.rule === 'form-needs-submit-action');
      expect(issue!.message).toContain('does not submit a form by itself');
      expect(issue!.message).toContain('form.requestSubmit()');
      expect(issue!.message).toContain('press event');
      expect(issue!.message).toContain('browser-distribution-guide § "ButtonCTA (`<button-cta>`)"');
      expect(issue!.message).not.toContain('for form submission');
    });

    it('passes when form contains Button-CTA', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'form', accessibilityLabel: 'Login' },
        children: [{ component: 'Input-Text-Email' }, { component: 'Button-CTA' }],
      });
      expect(issues.some(i => i.rule === 'form-needs-submit-action')).toBe(false);
    });

    it('finds Button-CTA in nested children', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'form', accessibilityLabel: 'Login' },
        children: [{
          component: 'Container-Base',
          children: [{ component: 'Button-CTA' }],
        }],
      });
      expect(issues.some(i => i.rule === 'form-needs-submit-action')).toBe(false);
    });
  });

  describe('page-needs-accessible-name (WCAG 2.4.2)', () => {
    it('errors when main container lacks accessibilityLabel', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'main' },
      });
      expect(issues.some(i => i.rule === 'page-needs-accessible-name')).toBe(true);
    });

    it('passes when main has accessibilityLabel', () => {
      const issues = checker.check({
        component: 'Container-Base',
        props: { semantic: 'main', accessibilityLabel: 'Settings' },
      });
      expect(issues.some(i => i.rule === 'page-needs-accessible-name')).toBe(false);
    });
  });

  it('returns no issues for non-semantic components', () => {
    const issues = checker.check({ component: 'Button-CTA' });
    expect(issues).toHaveLength(0);
  });

  it('checks nested containers', () => {
    const issues = checker.check({
      component: 'Container-Base',
      props: { semantic: 'main', accessibilityLabel: 'Page' },
      children: [{
        component: 'Container-Base',
        props: { semantic: 'form' },
      }],
    });
    expect(issues.some(i => i.rule === 'form-needs-accessible-name')).toBe(true);
  });

  describe('no-nested-interactive (WCAG 4.1.2)', () => {
    const meta = (active: string[], props: Record<string, unknown> = {}) =>
      ({
        properties: props,
        contracts: { active: Object.fromEntries(active.map((c) => [c, {}])) },
      }) as any;
    const table: Record<string, any> = {
      Card: meta(['interaction_pressable'], { interactive: { type: 'boolean', default: false } }),
      Btn: meta(['interaction_pressable', 'interaction_focusable']),
      Field: meta(['interaction_focusable']),
      Badge: meta([]),
      Box: meta([]),
    };
    const c = new AccessibilityChecker((n) => table[n]);
    const rules = (t: any) => c.check(t).filter((i) => i.rule === 'no-nested-interactive');

    it('errors for a pressable node holding a pressable child', () => {
      const [i] = rules({ component: 'Card', props: { interactive: true }, children: [{ component: 'Btn' }] });
      expect(i.severity).toBe('error');
      expect(i.wcag).toBe('4.1.2');
    });
    it('errors for a focusable descendant at any depth', () => {
      expect(rules({ component: 'Card', props: { interactive: true }, children: [{ component: 'Box', children: [{ component: 'Field' }] }] })).toHaveLength(1);
    });
    it('reads the interactive prop: a non-interactive card (given or default) is not pressable', () => {
      expect(rules({ component: 'Card', props: { interactive: false }, children: [{ component: 'Btn' }] })).toEqual([]);
      expect(rules({ component: 'Card', children: [{ component: 'Btn' }] })).toEqual([]);
    });
    it('does not flag non-interactive children', () => {
      expect(rules({ component: 'Card', props: { interactive: true }, children: [{ component: 'Badge' }, { component: 'Box' }] })).toEqual([]);
    });
    it('does not flag a pressable inside a non-pressable parent', () => {
      expect(rules({ component: 'Box', children: [{ component: 'Btn' }] })).toEqual([]);
    });
    it('does not run without a resolver', () => {
      expect(new AccessibilityChecker().check({ component: 'Card', props: { interactive: true }, children: [{ component: 'Btn' }] })).toEqual([]);
    });
  });
});
