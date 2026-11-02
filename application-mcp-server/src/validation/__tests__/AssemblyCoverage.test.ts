/**
 * AssemblyCoverage.test.ts — `validate_assembly` states its own coverage (V1 of
 * .kiro/issues/2026-10-25-validate-assembly-empty-result-overstates-coverage.md).
 *
 * The 16.1.0 trio read `{"valid": true, "accessibility": []}` as clean for a tree it never checked
 * for nested interactive controls, with an Icon-Base `name` it could not check. The result now
 * carries `coverage`: the accessibility rules that ran, and each given prop whose value was not
 * checked, so an empty list is read against what was checked.
 */
import * as path from 'path';
import { ComponentIndexer } from '../../indexer/ComponentIndexer';
import { AssemblyValidator } from '../AssemblyValidator';
import { AccessibilityChecker, ACCESSIBILITY_RULES } from '../AccessibilityChecker';
import type { AssemblyNode } from '../../models';

const COMPONENTS_DIR = path.resolve(__dirname, '../../../../src/components/core');

describe('validate_assembly coverage', () => {
  let validator: AssemblyValidator;
  beforeAll(async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents(COMPONENTS_DIR);
    validator = new AssemblyValidator(indexer);
  });

  it('names the accessibility rules that ran, on every result', () => {
    const r = validator.validate({ component: 'Container-Base' });
    expect(r.coverage.accessibilityRules).toEqual(['form-needs-accessible-name', 'form-needs-submit-action', 'page-needs-accessible-name']);
  });

  it('the trio tree: valid with no accessibility issue, and coverage says what was not checked', () => {
    const tree: AssemblyNode = {
      component: 'Container-Card-Base',
      props: { interactive: true },
      children: [
        { component: 'Icon-Base', props: { name: 'tool-drill' } },
        { component: 'Button-CTA', props: { label: 'Request to borrow' } },
      ],
    };
    const r = validator.validate(tree);
    expect(r.accessibility).toEqual([]);
    // Nested interactive controls are not among the rules that ran (V2 is owed), so an empty list
    // does not say the tree is free of them.
    expect(r.coverage.accessibilityRules).not.toContain('no-nested-interactive');
    // Icon-Base's `name` is typed IconBaseName with no values list: accepted, and listed as unchecked.
    expect(r.coverage.notChecked).toContainEqual({ path: 'root.children[0]', component: 'Icon-Base', prop: 'name', type: expect.stringContaining('IconBaseName') });
  });

  it('a checkable value is not listed as unchecked', () => {
    const r = validator.validate({ component: 'Button-CTA', props: { label: 'Go', size: 'medium' } });
    expect(r.coverage.notChecked.filter((n) => n.prop === 'size' || n.prop === 'label')).toEqual([]);
  });

  it('ACCESSIBILITY_RULES lists every rule the checker emits (the two stay in step)', () => {
    const emitted = new Set<string>();
    const checker = new AccessibilityChecker();
    const trees: AssemblyNode[] = [
      { component: 'Container-Base', props: { semantic: 'fieldset' } },
      { component: 'Container-Base', props: { semantic: 'main' } },
    ];
    for (const t of trees) for (const issue of checker.check(t)) emitted.add(issue.rule);
    expect([...emitted].sort()).toEqual([...ACCESSIBILITY_RULES].sort());
  });
});
