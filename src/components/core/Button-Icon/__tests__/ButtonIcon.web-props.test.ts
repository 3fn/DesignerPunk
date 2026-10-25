/**
 * @category evergreen
 * @purpose ButtonIcon web element exposes the served prop names: `variant` and `onPress` are
 *          real JS properties (E5, release 16.1.0 walk 12b(i)), not only attributes / an event.
 * @jest-environment jsdom
 *
 * The served schema lists `variant` and `onPress` as properties. Before this, the element
 * had `buttonVariant` and a `press` event only, so `el.variant = 'secondary'` and
 * `el.onPress = fn` silently did nothing. `buttonVariant` stays as an alias; `press` still
 * fires. Setting `onPress` attaches a `press` listener (as Chip-Base does), so a callback
 * fires once per press, alongside any `press` listener the consumer also wires.
 *
 * Bite (recorded in the PR): remove the `variant` accessor or the `onPress` accessor from
 * ButtonIcon.web.ts -> the matching tests go red.
 */

import { ButtonIcon } from '../platforms/web/ButtonIcon.web';
import { createButtonIcon, cleanupButtonIconTokens, registerButtonIcon } from './test-utils';

const variantClass = (el: ButtonIcon) => el.shadowRoot?.querySelector('button')?.className ?? '';

describe('ButtonIcon web props: variant and onPress', () => {
  let el: ButtonIcon;

  beforeAll(() => { registerButtonIcon(); });

  afterAll(() => { cleanupButtonIconTokens(); });

  beforeEach(async () => {
    el = await createButtonIcon({ icon: 'plus', ariaLabel: 'Add' });
  });

  afterEach(() => {
    el.remove();
  });

  describe('variant', () => {
    it('property set re-renders and reflects the attribute', () => {
      el.variant = 'secondary';
      expect(el.getAttribute('variant')).toBe('secondary');
      expect(variantClass(el)).toContain('button-icon--secondary');
      expect(variantClass(el)).not.toContain('button-icon--primary');
    });

    it('attribute set reads back through the property', () => {
      el.setAttribute('variant', 'tertiary');
      expect(el.variant).toBe('tertiary');
      expect(variantClass(el)).toContain('button-icon--tertiary');
    });

    it('buttonVariant still works as an alias in both directions', () => {
      el.buttonVariant = 'secondary';
      expect(el.variant).toBe('secondary');
      el.variant = 'tertiary';
      expect(el.buttonVariant).toBe('tertiary');
    });

    it('defaults to primary', () => {
      expect(el.variant).toBe('primary');
    });
  });

  describe('onPress', () => {
    const press = () => el.shadowRoot!.querySelector('button')!.click();

    it('is null until set, and reads back what was set', () => {
      expect(el.onPress).toBeNull();
      const fn = jest.fn();
      el.onPress = fn;
      expect(el.onPress).toBe(fn);
    });

    it('fires once on a press', () => {
      const fn = jest.fn();
      el.onPress = fn;
      press();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('the press event still fires', () => {
      const listener = jest.fn();
      el.addEventListener('press', listener);
      press();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('does not double-fire when a consumer wires both onPress and a press listener', () => {
      const cb = jest.fn();
      const listener = jest.fn();
      el.onPress = cb;
      el.addEventListener('press', listener);
      press();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('re-assigning replaces the callback and never stacks', () => {
      const first = jest.fn();
      const second = jest.fn();
      el.onPress = first;
      el.onPress = second;
      press();
      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalledTimes(1);
    });

    it('setting null detaches', () => {
      const fn = jest.fn();
      el.onPress = fn;
      el.onPress = null;
      expect(el.onPress).toBeNull();
      press();
      expect(fn).not.toHaveBeenCalled();
    });

    it('fires on keyboard activation (Enter) too', () => {
      const fn = jest.fn();
      el.onPress = fn;
      el.shadowRoot!.querySelector('button')!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
      );
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
