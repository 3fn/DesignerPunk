/**
 * DesignerPunk Shared Test Utilities
 *
 * Generic test helpers for web component testing in product repos.
 * Exported via @3fn/core/testing subpath.
 *
 * @see Spec 105 design.md § "Shared Test Utilities"
 */

/**
 * Register a custom element safely. Skips if already defined.
 * Prevents "already defined" errors across test files in jsdom.
 */
export function registerComponent(tagName: string, ComponentClass: CustomElementConstructor): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ComponentClass);
  }
}

/**
 * Safely remove all child nodes from document.body without destroying
 * jsdom's custom element registry.
 *
 * DO NOT use `document.body.innerHTML = ''` in jsdom tests — it breaks
 * customElements.define() for subsequent createElement() calls.
 */
export function cleanupDOM(): void {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}

/**
 * Wait for Shadow DOM to attach to an element.
 * Required for async component initialization in jsdom.
 *
 * @param element - The custom element to wait for
 * @param timeout - Maximum wait time in ms (default: 1000)
 */
export async function waitForShadowDOM(
  element: HTMLElement,
  timeout: number = 1000
): Promise<void> {
  const startTime = Date.now();
  while (!element.shadowRoot) {
    if (Date.now() - startTime > timeout) {
      throw new Error(
        `Timeout waiting for shadow DOM on <${element.tagName.toLowerCase()}>`
      );
    }
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  await new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Create a component fixture: instantiate, set props, append to DOM.
 * Returns the element and a cleanup function.
 *
 * Props are set via property assignment (not attributes) to support
 * functions, objects, and arrays.
 *
 * @throws Error if `document` is undefined (missing jsdom environment)
 */
export function createComponentFixture<T extends HTMLElement>(
  tagName: string,
  props?: Record<string, any>
): { element: T; cleanup: () => void } {
  if (typeof document === 'undefined') {
    throw new Error(
      `createComponentFixture requires a DOM environment.\n` +
      `Add this to the top of your test file:\n` +
      `  /** @jest-environment jsdom */`
    );
  }

  const element = document.createElement(tagName) as T;

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      (element as any)[key] = value;
    }
  }

  document.body.appendChild(element);

  return {
    element,
    cleanup: () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    },
  };
}

/**
 * Set CSS custom properties on document.documentElement.
 * Use in beforeEach to provide token values for component rendering.
 */
export function setupTokenProperties(props: Record<string, string>): void {
  for (const [name, value] of Object.entries(props)) {
    document.documentElement.style.setProperty(name, value);
  }
}

/**
 * Remove CSS custom properties from document.documentElement.
 * Use in afterEach to clean up token values.
 */
export function cleanupTokenProperties(props: Record<string, string>): void {
  for (const name of Object.keys(props)) {
    document.documentElement.style.removeProperty(name);
  }
}

/** Blend color properties needed for components using blend utilities. */
const BLEND_PROPERTIES: Record<string, string> = {
  '--color-action-primary': 'rgba(0, 240, 255, 1)',
  '--color-contrast-on-action': 'rgba(0, 0, 0, 1)',
  '--color-background': '#FFFFFF',
};

/**
 * Set up CSS custom properties required by blend utility components
 * (Button-CTA, etc.). Convenience wrapper over setupTokenProperties.
 */
export function setupBlendColorProperties(): void {
  setupTokenProperties(BLEND_PROPERTIES);
}

/**
 * Clean up blend color CSS custom properties.
 * Convenience wrapper over cleanupTokenProperties.
 */
export function cleanupBlendColorProperties(): void {
  cleanupTokenProperties(BLEND_PROPERTIES);
}

/**
 * Read a component's CSS source from disk.
 *
 * The jest-preset style-mock returns '' for CSS imports, so tests that
 * verify CSS content (contract tests checking custom property declarations)
 * must read the file directly. This utility encapsulates that pattern.
 *
 * @param dirname - Pass `__dirname` from the test file
 * @param relativePath - Relative path to the CSS file (e.g., '../platforms/web/Component.styles.css')
 */
export function readComponentCSS(dirname: string, relativePath: string): string {
  const fs = require('fs');
  const path = require('path');
  return fs.readFileSync(path.resolve(dirname, relativePath), 'utf-8');
}
