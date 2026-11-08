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
 * 4. A pressable node holds no interactive descendant (WCAG 4.1.2) — needs a component resolver
 *
 * @see .kiro/specs/067-application-mcp/interviews/pattern-a-interview.md
 * @see .kiro/specs/067-application-mcp/interviews/pattern-c-interview.md
 */

import { AssemblyNode, AccessibilityIssue, ComponentMetadata } from '../models';

const FORM_SEMANTICS = ['form', 'fieldset'];

/**
 * Every rule this checker can emit, by id. `validate_assembly` reports this list as
 * `coverage.accessibilityRules`, so a rule that is not here is a check that did not run.
 * Adding a rule means adding its id here (AccessibilityChecker.test.ts holds the two in step).
 */
export const ACCESSIBILITY_RULES = ['form-needs-accessible-name', 'form-needs-submit-action', 'page-needs-accessible-name', 'no-nested-interactive'] as const;

/** Looks a component up by name; the nested-interactive rule reads contracts through it. */
export type ComponentResolver = (name: string) => ComponentMetadata | null | undefined;

export class AccessibilityChecker {
  /**
   * `resolve` lets the nested-interactive rule read each node's active contracts. Without it that
   * rule cannot run (AssemblyValidator always passes it).
   */
  constructor(private resolve?: ComponentResolver) {}

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
          message: `${node.component} with semantic="${semantic}" has no submit action (no Button-CTA descendant). On web, Button-CTA does not submit a form by itself: it renders type="button" and is not form-associated, so call form.requestSubmit() from its press event and handle Enter in the page (browser-distribution-guide § "ButtonCTA (\`<button-cta>\`)"). On iOS and Android, call your submit handler from onPress.`,
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

    if (this.resolve && this.isPressable(node)) {
      const inner = this.findInteractiveDescendant(node);
      if (inner) {
        issues.push({
          rule: 'no-nested-interactive',
          wcag: '4.1.2',
          message: `${node.component} is pressable (role "button" or "link" makes its children presentational) and holds ${inner.component}, which is also interactive (${inner.contract}). The inner control is unreachable to a screen reader or is a nested control. Move it out of the ${node.component}, or make the ${node.component} non-interactive.`,
          severity: 'error',
        });
      }
    }

    for (const child of node.children ?? []) {
      this.walk(child, issues);
    }
  }

  /**
   * Whether a node's own `interaction_pressable` contract is in force. The contract is read from
   * the component's active contracts (excludes are not active, so Badge and Avatar never match).
   * A component whose schema has an `interactive` prop applies the contract only when that prop is
   * true (Container-Card-Base: "When interactive=true"); the given value wins, else the schema default.
   * Other components (Button-CTA, Chip-Base) are read as pressable.
   */
  private isPressable(node: AssemblyNode): boolean {
    const meta = this.resolve!(node.component);
    if (!meta || !meta.contracts?.active?.interaction_pressable) return false;
    return this.interactiveFlag(node, meta);
  }

  private interactiveFlag(node: AssemblyNode, meta: ComponentMetadata): boolean {
    const prop = meta.properties?.interactive;
    if (!prop) return true;
    const given = node.props?.interactive;
    return (given !== undefined ? given : prop.default) === true;
  }

  private findInteractiveDescendant(node: AssemblyNode): { component: string; contract: string } | null {
    for (const child of node.children ?? []) {
      const meta = this.resolve!(child.component);
      const active = meta?.contracts?.active;
      if (meta && active && this.interactiveFlag(child, meta)) {
        const contract = ['interaction_pressable', 'interaction_focusable'].find((c) => active[c]);
        if (contract) return { component: child.component, contract };
      }
      const deeper = this.findInteractiveDescendant(child);
      if (deeper) return deeper;
    }
    return null;
  }

  private hasDescendant(node: AssemblyNode, component: string): boolean {
    for (const child of node.children ?? []) {
      if (child.component === component || this.hasDescendant(child, component)) return true;
    }
    return false;
  }
}
