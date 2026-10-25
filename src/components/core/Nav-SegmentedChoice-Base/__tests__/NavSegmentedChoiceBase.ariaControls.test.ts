/**
 * @category evergreen
 * @purpose Verify each segment's aria-controls reference resolves to its panel in the ADOPTER's tree (contract accessibility_aria_controls; record 2026-10-20 E6)
 * @jest-environment jsdom
 */
/**
 * Nav-SegmentedChoice-Base — aria-controls across the shadow boundary (E6)
 *
 * The segments live in the component's shadow root, and the panels belong to
 * the adopter. An `aria-controls` ID reference is resolved in the element's
 * OWN root only, so it cannot reach them. The component therefore sets an
 * element reference through `ariaControlsElements`, which may point outward.
 *
 * jsdom 26 has no `ariaControlsElements`. These tests install a test double
 * that follows the HTML spec's reflection algorithm for `FrozenArray<T>?`
 * (html.spec.whatwg.org, "Reflecting content attributes in IDL attributes",
 * read 2026-10-25):
 * - getter, explicitly set elements: keep each one that "is a descendant of
 *   any of element's shadow-including ancestors";
 * - getter, from the content attribute: each ID is looked up among elements
 *   whose "root is the same as element's root";
 * - setter: null → clear and delete the attribute; otherwise set the
 *   attribute to the empty string, then store the elements;
 * - attribute change steps: a change to the attribute clears the stored ones.
 * What a browser then exposes to assistive technology is not provable here;
 * that is Sparky's Chromium check (accessibility tree, "Controls").
 *
 * @module Nav-SegmentedChoice-Base/__tests__/ariaControls
 */

import { cleanupDOM } from '../../../../__tests__/helpers/web-component-test-utils';
import { NavSegmentedChoiceBase } from '../platforms/web/NavSegmentedChoiceBase.web';

const SEGMENTS = JSON.stringify([
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
]);

const tick = () => new Promise(resolve => setTimeout(resolve, 0));

// ---------------------------------------------------------------------------
// Spec double for Element.ariaControlsElements
// ---------------------------------------------------------------------------

const ATTR = 'aria-controls';
const explicit = new WeakMap<Element, Element[]>();
const originalSetAttribute = Element.prototype.setAttribute;
const originalRemoveAttribute = Element.prototype.removeAttribute;

function shadowIncludingAncestors(el: Node): Node[] {
  const out: Node[] = [];
  let n: Node | null = el instanceof ShadowRoot ? el.host : el.parentNode;
  while (n) {
    out.push(n);
    n = n instanceof ShadowRoot ? n.host : n.parentNode;
  }
  return out;
}

function installSpecDouble(): void {
  Element.prototype.setAttribute = function (this: Element, name: string, value: string) {
    if (name.toLowerCase() === ATTR) explicit.delete(this);
    return originalSetAttribute.call(this, name, value);
  };
  Element.prototype.removeAttribute = function (this: Element, name: string) {
    if (name.toLowerCase() === ATTR) explicit.delete(this);
    return originalRemoveAttribute.call(this, name);
  };
  Object.defineProperty(Element.prototype, 'ariaControlsElements', {
    configurable: true,
    get(this: Element): ReadonlyArray<Element> | null {
      const set = explicit.get(this);
      if (set) {
        const ancestors = shadowIncludingAncestors(this);
        return set.filter(target => ancestors.some(a => a !== target && a.contains(target)));
      }
      const value = this.getAttribute(ATTR);
      if (value === null) return null;
      const root = this.getRootNode() as Document | ShadowRoot;
      return value.split(/\s+/).filter(Boolean)
        .map(id => root.getElementById(id))
        .filter((e): e is HTMLElement => e !== null);
    },
    set(this: Element, value: ReadonlyArray<Element> | null) {
      if (value === null) {
        explicit.delete(this);
        originalRemoveAttribute.call(this, ATTR);
        return;
      }
      this.setAttribute(ATTR, ''); // runs the attribute change steps first
      explicit.set(this, [...value]);
    },
  });
}

function removeSpecDouble(): void {
  delete (Element.prototype as unknown as Record<string, unknown>).ariaControlsElements;
  Element.prototype.setAttribute = originalSetAttribute;
  Element.prototype.removeAttribute = originalRemoveAttribute;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeControl(id?: string): NavSegmentedChoiceBase {
  const el = document.createElement('nav-segmented-choice') as NavSegmentedChoiceBase;
  el.setAttribute('segments', SEGMENTS);
  el.setAttribute('selected-value', 'daily');
  if (id) el.setAttribute('id', id);
  return el;
}

function makePanel(id: string): HTMLDivElement {
  const p = document.createElement('div');
  p.id = id;
  p.setAttribute('role', 'tabpanel');
  return p;
}

type Reflecting = HTMLButtonElement & { ariaControlsElements: ReadonlyArray<Element> | null };

function segments(el: NavSegmentedChoiceBase): Reflecting[] {
  return Array.from(el.shadowRoot!.querySelectorAll('.segmented-choice__segment')) as Reflecting[];
}

/** The element each segment's aria-controls resolves to (one per segment, or null). */
function resolved(el: NavSegmentedChoiceBase): (Element | null)[] {
  return segments(el).map(b => (b.ariaControlsElements && b.ariaControlsElements[0]) || null);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Nav-SegmentedChoice-Base aria-controls reaches the adopter\'s panels (E6)', () => {
  beforeAll(() => {
    // The import above is type-only after compilation; register explicitly.
    if (!customElements.get('nav-segmented-choice')) {
      customElements.define('nav-segmented-choice', NavSegmentedChoiceBase);
    }
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('where the browser reflects element references (spec double)', () => {
    beforeAll(installSpecDouble);
    afterAll(removeSpecDouble);

    it('the bare attribute alone would resolve to nothing across the shadow root (the E6 defect, under the spec\'s rules)', async () => {
      const panel = makePanel('freq-panel-daily');
      document.body.appendChild(panel);
      const btn = document.createElement('button') as Reflecting;
      const host = document.createElement('div');
      host.attachShadow({ mode: 'open' }).appendChild(btn);
      document.body.appendChild(host);
      btn.setAttribute('aria-controls', 'freq-panel-daily');
      expect(btn.ariaControlsElements).toEqual([]);
    });

    it('resolves each segment to its panel in the document', async () => {
      const daily = makePanel('freq-panel-daily');
      const weekly = makePanel('freq-panel-weekly');
      document.body.append(daily, weekly);
      const el = makeControl('freq');
      document.body.appendChild(el);
      await tick();

      expect(resolved(el)).toEqual([daily, weekly]);
      // The spec's setter sets the attribute to the empty string
      expect(segments(el).map(b => b.getAttribute('aria-controls'))).toEqual(['', '']);
    });

    it('a segment whose panel does not exist resolves to nothing, never to another element', async () => {
      const daily = makePanel('freq-panel-daily');
      const unrelated = makePanel('weekly');
      document.body.append(daily, unrelated);
      const el = makeControl('freq');
      document.body.appendChild(el);
      await tick();

      expect(resolved(el)).toEqual([daily, null]);
      expect(segments(el)[1].getAttribute('aria-controls')).toBe('freq-panel-weekly');
    });

    it('resolves panels the adopter adds after the control renders', async () => {
      const el = makeControl('freq');
      document.body.appendChild(el);
      await tick();
      expect(resolved(el)).toEqual([null, null]);

      const wrapper = document.createElement('section');
      const daily = makePanel('freq-panel-daily');
      const weekly = makePanel('freq-panel-weekly');
      wrapper.append(daily, weekly);
      document.body.appendChild(wrapper);
      await tick();

      expect(resolved(el)).toEqual([daily, weekly]);
    });

    it('follows a panel the adopter replaces (a re-rendered element with the same id)', async () => {
      const first = makePanel('freq-panel-daily');
      document.body.appendChild(first);
      const el = makeControl('freq');
      document.body.appendChild(el);
      await tick();
      expect(resolved(el)[0]).toBe(first);

      first.remove();
      const second = makePanel('freq-panel-daily');
      document.body.appendChild(second);
      await tick();
      expect(resolved(el)[0]).toBe(second);
    });

    it('drops the reference when the adopter removes the panel', async () => {
      const daily = makePanel('freq-panel-daily');
      document.body.appendChild(daily);
      const el = makeControl('freq');
      document.body.appendChild(el);
      await tick();
      expect(resolved(el)[0]).toBe(daily);

      daily.remove();
      await tick();
      expect(resolved(el)[0]).toBeNull();
      expect(segments(el)[0].getAttribute('aria-controls')).toBe('freq-panel-daily');
    });

    it('resolves a panel whose id the adopter sets after render', async () => {
      const panel = document.createElement('div');
      document.body.appendChild(panel);
      const el = makeControl('freq');
      document.body.appendChild(el);
      await tick();
      expect(resolved(el)[0]).toBeNull();

      panel.id = 'freq-panel-daily';
      await tick();
      expect(resolved(el)[0]).toBe(panel);
    });

    it('inside an enclosing shadow root, resolves in THAT tree, not the document', async () => {
      const outerHost = document.createElement('div');
      const outer = outerHost.attachShadow({ mode: 'open' });
      const decoy = makePanel('freq-panel-daily'); // same id, in the document
      document.body.append(decoy, outerHost);
      const inner = makePanel('freq-panel-daily');
      const el = makeControl('freq');
      outer.append(el, inner);
      await tick();

      expect(resolved(el)[0]).toBe(inner);
      expect(resolved(el)[0]).not.toBe(decoy);
    });

    it('re-resolves when the control\'s id changes', async () => {
      const a = makePanel('one-panel-daily');
      const b = makePanel('two-panel-daily');
      document.body.append(a, b);
      const el = makeControl('one');
      document.body.appendChild(el);
      await tick();
      expect(resolved(el)[0]).toBe(a);

      el.id = 'two';
      await tick();
      expect(resolved(el)[0]).toBe(b);
    });

    it('without id: no aria-controls attribute and no element reference', async () => {
      const el = makeControl();
      document.body.append(makePanel('freq-panel-daily'), el);
      await tick();
      for (const btn of segments(el)) {
        expect(btn.hasAttribute('aria-controls')).toBe(false);
        expect(btn.ariaControlsElements).toBeNull();
      }
    });

    it('stops watching the adopter\'s tree when disconnected', async () => {
      const el = makeControl('freq');
      document.body.appendChild(el);
      await tick();
      el.remove();
      await tick();

      const observer = (el as unknown as { _panelObserver: MutationObserver | null })._panelObserver;
      expect(observer).toBeNull();
    });
  });

  describe('where the browser has no ariaControlsElements (jsdom as is)', () => {
    it('keeps the [id]-panel-[value] attribute as the fallback and watches nothing', async () => {
      expect('ariaControlsElements' in Element.prototype).toBe(false);
      const el = makeControl('freq');
      document.body.append(makePanel('freq-panel-daily'), el);
      await tick();
      expect(segments(el).map(b => b.getAttribute('aria-controls'))).toEqual(['freq-panel-daily', 'freq-panel-weekly']);
      expect((el as unknown as { _panelObserver: MutationObserver | null })._panelObserver).toBeNull();
    });

    it('updates the fallback attribute when the control\'s id changes', async () => {
      const el = makeControl('one');
      document.body.appendChild(el);
      await tick();
      el.id = 'two';
      await tick();
      expect(segments(el).map(b => b.getAttribute('aria-controls'))).toEqual(['two-panel-daily', 'two-panel-weekly']);
    });
  });
});
