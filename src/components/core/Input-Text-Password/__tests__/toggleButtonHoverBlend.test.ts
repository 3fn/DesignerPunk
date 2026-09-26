/**
 * @jest-environment jsdom
 */

/**
 * @category evergreen
 * @purpose Behavioral verification that the Input-Text-Password toggle button's hover
 *          background is a real, JS-computed blend value — not just a string reference.
 *
 * Prior to this test, `.toggle-button:hover` referenced `var(--color-background-hover)`,
 * a literal that does not exist in generated CSS (see
 * `.kiro/issues/archive/2026-09-26-input-text-phantom-css-vars.md`). The fix wires the
 * same blend pattern Button-Icon and Chip-Base use: darken the surface the element sits
 * on by `blend.hoverDarker` via `getBlendUtilities().hoverColor()`, and expose the result
 * as a private custom property (`--_itp-hover-bg`) that isn't a token reference at all —
 * a static resolve-guard can't verify it. This test verifies the actual computed value
 * instead: it independently computes the expected darker color from the same blend
 * utility and asserts the component's rendered custom property matches it exactly (and
 * differs from the un-blended base color, so a no-op "just echo the base color" bug would
 * also be caught).
 */

import { describe, it, expect, beforeEach, afterEach, beforeAll } from '@jest/globals';
import { getBlendUtilities } from '@3fn/core/blend';
import '../platforms/web/InputTextPassword.web';

const CANVAS_COLOR = 'rgba(255, 255, 255, 1)';

describe('Input-Text-Password — toggle button hover background (blend-computed)', () => {
  beforeAll(() => {
    if (!customElements.get('input-text-password')) {
      // Importing the module above registers it; this is a defensive no-op guard
      // matching the sibling test convention (see touchTargetSizing.test.ts).
    }
  });

  beforeEach(() => {
    document.documentElement.style.setProperty('--color-structure-canvas', CANVAS_COLOR);
  });

  afterEach(() => {
    document.documentElement.style.removeProperty('--color-structure-canvas');
    document.body.innerHTML = '';
  });

  function createComponent(): HTMLElement {
    const component = document.createElement('input-text-password');
    document.body.appendChild(component);
    return component;
  }

  /** Extract the `--_itp-hover-bg: <value>;` declaration from the shadow root's <style>. */
  function readHoverBgDeclaration(component: HTMLElement): string | null {
    const style = (component as any).shadowRoot?.querySelector('style');
    const text: string = style?.textContent ?? '';
    const match = text.match(/--_itp-hover-bg:\s*([^;]+);/);
    return match ? match[1].trim() : null;
  }

  it('sets --_itp-hover-bg to a non-empty, real color value', () => {
    const component = createComponent();
    const value = readHoverBgDeclaration(component);
    expect(value).not.toBeNull();
    expect(value).not.toBe('');
  });

  it('computes --_itp-hover-bg as darkerBlend(color.structure.canvas, blend.hoverDarker) — matches the blend utility exactly', () => {
    const component = createComponent();
    const value = readHoverBgDeclaration(component);

    const expected = getBlendUtilities().hoverColor(CANVAS_COLOR);
    expect(value).toBe(expected);
  });

  it('the hover value is actually darker than the base canvas color (not a pass-through)', () => {
    const component = createComponent();
    const value = readHoverBgDeclaration(component);

    expect(value).not.toBe(CANVAS_COLOR);
    // A pass-through bug would emit the base color unchanged; a real darkerBlend
    // application changes it. We don't re-derive the color math here (that's the
    // blend utility's own test suite's job) — we only assert this component actually
    // invokes it rather than echoing the input.
  });

  it('the toggle-button:hover rule references the computed custom property, not a literal token', () => {
    const component = createComponent();
    const style = (component as any).shadowRoot?.querySelector('style');
    const text: string = style?.textContent ?? '';
    expect(text).toMatch(/\.toggle-button:hover[\s\S]*?background-color:\s*var\(--_itp-hover-bg\)/);
    expect(text).not.toContain('--color-background-hover');
  });
});
