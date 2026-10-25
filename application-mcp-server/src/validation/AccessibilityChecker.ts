/**
 * Accessibility Checker
 *
 * Assembly-level accessibility checks derived from pattern interviews.
 * Hardcoded checks in isolated module per D4. Refactor to declarative
 * assertions when pattern count exceeds ~5.
 *
 * Checks:
 * 1. Form containers need accessible names (WCAG 1.3.1)
 * 2. Form containers need a submit action (WCAG 1.3.1)
 * 3. Page containers need a heading or accessible name (WCAG 2.4.2)
 *
 * @see .kiro/specs/067-application-mcp/interviews/pattern-a-interview.md
 * @see .kiro/specs/067-application-mcp/interviews/pattern-c-interview.md
 */

import { AssemblyNode, AccessibilityIssue } from '../models';

const FORM_SEMANTICS = ['form', 'fieldset'];

export class AccessibilityChecker {
  check(assembly: AssemblyNode): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    this.walk(assembly, issues);
    return issues;
  }

  private walk(node: AssemblyNode, issues: AccessibilityIssue[]): void {
    const semantic = node.props?.semantic as string | undefined;

    if (semantic && FORM_SEMANTICS.includes(semantic)) {
      if (!node.props?.accessibilityLabel) {
        issues.push({
          rule: 'form-needs-accessible-name',
          wcag: '1.3.1',
          message: `${node.component} with semantic="${semantic}" must have an accessibilityLabel`,
          severity: 'error',
        });
      }
      // The message names the web wiring: Button-CTA's web element is not form-associated and
      // renders type="button", so a bare Button-CTA does not submit its form (F-E8 fix (a);
      // .kiro/issues/2026-10-20-web-element-api-and-form-participation.md § E8).
      // TODO: Hardcodes Button-CTA. When role-based component flexibility is resolved,
      // check for any component with a submit-action role instead. (Thurgood, Task 3.2 review)
      if (!this.hasDescendant(node, 'Button-CTA')) {
        issues.push({
          rule: 'form-needs-submit-action',
          wcag: '1.3.1',
          message: `${node.component} with semantic="${semantic}" has no submit action (no Button-CTA descendant). On web, Button-CTA does not submit a form by itself: it renders type="button" and is not form-associated, so call form.requestSubmit() from its press event and handle Enter in the page (browser-distribution-guide § ButtonCTA). On iOS and Android, call your submit handler from onPress.`,
          severity: 'warning',
        });
      }
    }

    if (semantic === 'main' && !node.props?.accessibilityLabel) {
      issues.push({
        rule: 'page-needs-accessible-name',
        wcag: '2.4.2',
        message: `${node.component} with semantic="main" must have an accessibilityLabel or heading`,
        severity: 'error',
      });
    }

    for (const child of node.children ?? []) {
      this.walk(child, issues);
    }
  }

  private hasDescendant(node: AssemblyNode, component: string): boolean {
    for (const child of node.children ?? []) {
      if (child.component === component || this.hasDescendant(child, component)) return true;
    }
    return false;
  }
}
