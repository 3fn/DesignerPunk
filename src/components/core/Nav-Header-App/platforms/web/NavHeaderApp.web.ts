/**
 * Nav-Header-App — Web Implementation
 * Thin wrapper composing nav-header (Nav-Header-Base) with permissive slots.
 * @module Nav-Header-App/platforms/web
 */

/// <reference lib="dom" />

import '../../../Nav-Header-Base/platforms/web/NavHeaderBase.web'; // composes: nav-header-base

export class NavHeaderApp extends HTMLElement {
  private _shadowRoot: ShadowRoot;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  /**
   * The served attributes this wrapper forwards to its inner nav-header. Observed, so a change
   * after connection reaches the header too (the schema serves appearance, showSeparator and
   * testID as attribute-only on web: ballot 2026-10-30-web-prop-property-or-attribute-only).
   */
  static get observedAttributes(): string[] {
    return ['appearance', 'show-separator', 'test-id'];
  }

  attributeChangedCallback(): void {
    const header = this._shadowRoot.querySelector('nav-header') as HTMLElement | null;
    if (header) this.forwardAttributes(header);
  }

  private forwardAttributes(header: HTMLElement): void {
    header.setAttribute('appearance', this.getAttribute('appearance') || 'opaque');
    header.setAttribute('show-separator', this.getAttribute('show-separator') ?? 'true');
    if (this.getAttribute('test-id')) header.setAttribute('test-id', this.getAttribute('test-id')!);
    else header.removeAttribute('test-id');
  }

  connectedCallback(): void {
    const header = document.createElement('nav-header') as HTMLElement;
    this.forwardAttributes(header);

    header.innerHTML = `
      <slot name="leading" slot="leading"></slot>
      <slot name="center" slot="title"></slot>
      <slot name="trailing" slot="trailing"></slot>
    `;

    this._shadowRoot.appendChild(header);
  }
}

if (!customElements.get('nav-header-app')) {
  customElements.define('nav-header-app', NavHeaderApp);
}
