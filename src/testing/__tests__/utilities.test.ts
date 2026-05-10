/**
 * @jest-environment jsdom
 */

import {
  registerComponent,
  cleanupDOM,
  waitForShadowDOM,
  createComponentFixture,
  setupTokenProperties,
  cleanupTokenProperties,
  setupBlendColorProperties,
  cleanupBlendColorProperties,
} from '../index';

/** Factory: creates a unique component class per call (jsdom requires unique constructors per tag). */
function makeComponent() {
  return class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.innerHTML = '<slot></slot>';
    }
  };
}

describe('registerComponent', () => {
  test('registers a custom element', () => {
    const Comp = makeComponent();
    registerComponent('test-reg-one', Comp);
    expect(customElements.get('test-reg-one')).toBe(Comp);
  });

  test('skips registration if already defined', () => {
    const Comp = makeComponent();
    registerComponent('test-reg-two', Comp);
    const Other = makeComponent();
    expect(() => registerComponent('test-reg-two', Other)).not.toThrow();
    expect(customElements.get('test-reg-two')).toBe(Comp);
  });
});

describe('cleanupDOM', () => {
  test('removes all children from document.body', () => {
    document.body.appendChild(document.createElement('div'));
    document.body.appendChild(document.createElement('span'));
    expect(document.body.childNodes.length).toBe(2);

    cleanupDOM();
    expect(document.body.childNodes.length).toBe(0);
  });

  test('preserves custom element registry', () => {
    const Comp = makeComponent();
    registerComponent('test-cleanup-reg', Comp);
    document.body.appendChild(document.createElement('test-cleanup-reg'));

    cleanupDOM();

    expect(customElements.get('test-cleanup-reg')).toBe(Comp);
    const el = document.createElement('test-cleanup-reg');
    expect(el).toBeInstanceOf(Comp);
  });
});

describe('waitForShadowDOM', () => {
  test('resolves when shadow DOM attaches', async () => {
    const Comp = makeComponent();
    registerComponent('test-shadow-sync', Comp);
    const el = document.createElement('test-shadow-sync');
    document.body.appendChild(el);

    await waitForShadowDOM(el);
    expect(el.shadowRoot).not.toBeNull();

    cleanupDOM();
  });

  test('throws on timeout with element tag name', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    await expect(waitForShadowDOM(el, 100)).rejects.toThrow(
      'Timeout waiting for shadow DOM on <div>'
    );

    cleanupDOM();
  });
});

describe('createComponentFixture', () => {
  const TAG = 'test-fixture-comp';

  beforeAll(() => {
    registerComponent(TAG, makeComponent());
  });

  afterEach(() => {
    cleanupDOM();
  });

  test('creates element and appends to DOM', () => {
    const { element, cleanup } = createComponentFixture(TAG);

    expect(element.tagName.toLowerCase()).toBe(TAG);
    expect(document.body.contains(element)).toBe(true);

    cleanup();
  });

  test('sets props via property assignment', () => {
    const fn = jest.fn();
    const { element, cleanup } = createComponentFixture(TAG, {
      title: 'hello',
      onClick: fn,
    });

    expect((element as any).title).toBe('hello');
    expect((element as any).onClick).toBe(fn);

    cleanup();
  });

  test('cleanup removes element from DOM', () => {
    const { element, cleanup } = createComponentFixture(TAG);

    expect(document.body.contains(element)).toBe(true);
    cleanup();
    expect(document.body.contains(element)).toBe(false);
  });
});

describe('setupTokenProperties / cleanupTokenProperties', () => {
  const props = {
    '--color-primary': '#ff0000',
    '--space-100': '8',
  };

  test('sets CSS custom properties on documentElement', () => {
    setupTokenProperties(props);

    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#ff0000');
    expect(document.documentElement.style.getPropertyValue('--space-100')).toBe('8');

    cleanupTokenProperties(props);
  });

  test('removes CSS custom properties from documentElement', () => {
    setupTokenProperties(props);
    cleanupTokenProperties(props);

    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('');
    expect(document.documentElement.style.getPropertyValue('--space-100')).toBe('');
  });
});

describe('setupBlendColorProperties / cleanupBlendColorProperties', () => {
  test('sets blend color properties', () => {
    setupBlendColorProperties();

    expect(document.documentElement.style.getPropertyValue('--color-action-primary')).toBe('rgba(0, 240, 255, 1)');
    expect(document.documentElement.style.getPropertyValue('--color-contrast-on-action')).toBe('rgba(0, 0, 0, 1)');
    expect(document.documentElement.style.getPropertyValue('--color-background')).toBe('#FFFFFF');

    cleanupBlendColorProperties();
  });

  test('cleans up blend color properties', () => {
    setupBlendColorProperties();
    cleanupBlendColorProperties();

    expect(document.documentElement.style.getPropertyValue('--color-action-primary')).toBe('');
    expect(document.documentElement.style.getPropertyValue('--color-contrast-on-action')).toBe('');
    expect(document.documentElement.style.getPropertyValue('--color-background')).toBe('');
  });
});
