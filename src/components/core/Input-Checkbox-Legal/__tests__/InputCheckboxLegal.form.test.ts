/**
 * @category evergreen
 * @purpose Verify Input-Checkbox-Legal web form participation through its own ElementInternals: submission value per state transition, explicit consent, name propagation, reset, and the D1 disabled neutralization
 * @jest-environment jsdom
 */
/**
 * Input-Checkbox-Legal Form Participation Tests
 *
 * Contract: `validation_form_integration`, inherited from Input-Checkbox-Base
 * (Input-Checkbox-Legal/contracts.yaml `inherits: Input-Checkbox-Base`).
 * Defect record: `.kiro/issues/2026-10-20-web-element-api-and-form-participation.md` (E1).
 *
 * Why Legal has its own internals: Legal renders its wrapped
 * `<input-checkbox-base>` inside Legal's OWN shadow root. A form owns only
 * controls in its own tree, so the nested Base can never reach the
 * consumer's form; Legal's host must report the value itself.
 *
 * jsdom limits (see InputCheckboxBase.form.test.ts): no setFormValue, no
 * formResetCallback calls, no FACE entries in FormData. The tests spy on
 * Legal's internals and assert the registered value; real submission is
 * verified in a browser on the demo page (Sparky; see the PR).
 *
 * @module Input-Checkbox-Legal/__tests__/form
 */

import { cleanupDOM } from '../../../../__tests__/helpers/web-component-test-utils';
import { InputCheckboxLegalElement } from '../platforms/web/InputCheckboxLegal.web';
import { InputCheckboxBaseElement } from '../../Input-Checkbox-Base/platforms/web/InputCheckboxBase.web';
import { IconBaseElement } from '../../Icon-Base/platforms/web/IconBase.web';

type SpyInternals = { setFormValue: jest.Mock };

const tick = () => new Promise(resolve => setTimeout(resolve, 0));

/** Create a Legal checkbox whose internals are a spy, installed before connect. */
function createWithSpy(attrs: Record<string, string> = {}): {
  legal: InputCheckboxLegalElement;
  setFormValue: jest.Mock;
} {
  const legal = document.createElement('input-checkbox-legal') as InputCheckboxLegalElement;
  legal.setAttribute('label', 'I agree to the Terms of Service');
  for (const [k, v] of Object.entries(attrs)) legal.setAttribute(k, v);
  const setFormValue = jest.fn();
  (legal as unknown as { _internals: SpyInternals })._internals = { setFormValue };
  return { legal, setFormValue };
}

function nestedBase(legal: InputCheckboxLegalElement): InputCheckboxBaseElement {
  return legal.shadowRoot!.querySelector('input-checkbox-base') as InputCheckboxBaseElement;
}

function nativeInput(legal: InputCheckboxLegalElement): HTMLInputElement {
  return nestedBase(legal).shadowRoot!.querySelector('.checkbox__input') as HTMLInputElement;
}

describe('Input-Checkbox-Legal Form Participation (validation_form_integration)', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeAll(() => {
    if (!customElements.get('icon-base')) {
      customElements.define('icon-base', IconBaseElement);
    }
    if (!customElements.get('input-checkbox-base')) {
      customElements.define('input-checkbox-base', InputCheckboxBaseElement);
    }
    if (!customElements.get('input-checkbox-legal')) {
      customElements.define('input-checkbox-legal', InputCheckboxLegalElement);
    }
  });

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanupDOM();
    consoleWarnSpy.mockRestore();
  });

  describe('Form association', () => {
    it('is a form-associated custom element in its own right', () => {
      expect((InputCheckboxLegalElement as unknown as { formAssociated: boolean }).formAssociated).toBe(true);
    });

    it('attaches its own ElementInternals at construction', () => {
      const legal = document.createElement('input-checkbox-legal') as InputCheckboxLegalElement;
      expect((legal as unknown as { _internals: ElementInternals | null })._internals).toBeInstanceOf(ElementInternals);
    });
  });

  describe('Submission value on each state transition', () => {
    it('registers no entry when connected unchecked', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('registers its value when the user checks it, and null when the user unchecks it', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();

      nativeInput(legal).click();
      await tick();
      expect(legal.checked).toBe(true);
      expect(setFormValue).toHaveBeenLastCalledWith('accepted');

      nativeInput(legal).click();
      await tick();
      expect(legal.checked).toBe(false);
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('has the value registered before consent-change and change listeners run', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();

      const seen: unknown[] = [];
      const lastRegistered = () => setFormValue.mock.calls[setFormValue.mock.calls.length - 1][0];
      legal.addEventListener('consent-change', () => seen.push(lastRegistered()));
      legal.addEventListener('change', () => seen.push(lastRegistered()));
      nativeInput(legal).click();
      expect(seen).toEqual(['accepted', 'accepted']);
    });

    it('submits "on" when no value attribute is set (native default)', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos' });
      document.body.appendChild(legal);
      await tick();
      nativeInput(legal).click();
      expect(legal.value).toBe('on');
      expect(setFormValue).toHaveBeenLastCalledWith('on');
    });

    it('submits the empty string for an explicit value="" (native semantics)', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: '' });
      document.body.appendChild(legal);
      await tick();
      nativeInput(legal).click();
      expect(legal.value).toBe('');
      expect(setFormValue).toHaveBeenLastCalledWith('');
    });

    it('registers the new value when value changes while checked', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'v1' });
      document.body.appendChild(legal);
      await tick();
      nativeInput(legal).click();

      legal.value = 'v2';
      expect(setFormValue).toHaveBeenLastCalledWith('v2');
    });
  });

  describe('Explicit consent (validation_explicit_consent) and submission', () => {
    it('never registers a value for a refused pre-check', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted', checked: '' });
      document.body.appendChild(legal);
      await tick();

      expect(legal.checked).toBe(false);
      expect(setFormValue).not.toHaveBeenCalledWith('accepted');
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('never registers a value for a refused programmatic check', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();

      legal.checked = true;
      expect(legal.checked).toBe(false);
      expect(setFormValue).not.toHaveBeenCalledWith('accepted');
    });

    it('registers the value for a pre-check when requires-explicit-consent="false"', async () => {
      // Opt-out set before checked: from script, enforcement reads the
      // opt-out at the moment `checked` is set (existing behaviour)
      const { legal, setFormValue } = createWithSpy({
        'requires-explicit-consent': 'false', name: 'tos', value: 'accepted', checked: ''
      });
      document.body.appendChild(legal);
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith('accepted');
    });

    /**
     * Regression (found while fixing E1): the user's own click reached Legal
     * as a `checked` attribute change and was refused as if it were a
     * pre-check. The box drew checked while `checked` read false, a
     * "Pre-checked state not allowed" warning fired, and the form value
     * would have stayed empty.
     */
    it('accepts the user\'s own click as consent: checked stays true, no warning', async () => {
      const { legal } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();

      nativeInput(legal).click();
      await tick();

      expect(legal.checked).toBe(true);
      expect(legal.hasAttribute('checked')).toBe(true);
      expect(nestedBase(legal).checked).toBe(true);
      expect(consoleWarnSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('Pre-checked state not allowed')
      );
    });

    it('keeps the user\'s check when another attribute changes afterwards', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();
      nativeInput(legal).click();
      await tick();

      // e.g. the consumer shows a message after the user ticks the box
      legal.setAttribute('helper-text', 'Thanks');
      await tick();

      expect(legal.checked).toBe(true);
      expect(nestedBase(legal).checked).toBe(true);
      expect(nativeInput(legal).checked).toBe(true);
      expect(setFormValue).toHaveBeenLastCalledWith('accepted');
    });
  });

  describe('Name propagation and the nested Base', () => {
    it('forwards name and value to the nested Base', async () => {
      const { legal } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();

      expect(nestedBase(legal).getAttribute('name')).toBe('tos');
      expect(nestedBase(legal).getAttribute('value')).toBe('accepted');

      legal.name = 'terms';
      await tick();
      expect(nestedBase(legal).getAttribute('name')).toBe('terms');
      expect(nativeInput(legal).getAttribute('name')).toBe('terms');
    });

    it('keeps its registered value when name changes (the UA reads Legal\'s name at submission)', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();
      nativeInput(legal).click();

      legal.name = 'terms';
      expect(setFormValue).toHaveBeenLastCalledWith('accepted');
    });

    it('places the nested Base where no form can own it, so Legal\'s is the only entry', async () => {
      const { legal } = createWithSpy({ name: 'tos', value: 'accepted' });
      const form = document.createElement('form');
      form.appendChild(legal);
      document.body.appendChild(form);
      await tick();

      const base = nestedBase(legal);
      // The nested Base's tree is Legal's shadow root: it has no form
      // ancestor and is not in the form's tree, so it has no form owner and
      // contributes nothing to the submission (no duplicate 'tos' entry).
      expect(base.getRootNode()).toBe(legal.shadowRoot);
      expect(base.closest('form')).toBeNull();
      expect(form.contains(base)).toBe(false);
      expect(legal.shadowRoot!.querySelector('form')).toBeNull();
      expect(legal.closest('form')).toBe(form);
    });
  });

  describe('Disabled attribute (D1: inert, never drops the value)', () => {
    it('strips a consumer-set disabled attribute and keeps the registered value', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();
      nativeInput(legal).click();
      expect(setFormValue).toHaveBeenLastCalledWith('accepted');

      legal.setAttribute('disabled', '');
      await tick();
      expect(legal.hasAttribute('disabled')).toBe(false);
      expect(setFormValue).toHaveBeenLastCalledWith('accepted');
    });

    it('treats formDisabledCallback as a no-op', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      document.body.appendChild(legal);
      await tick();
      nativeInput(legal).click();
      const callsBefore = setFormValue.mock.calls.length;

      legal.formDisabledCallback(true);

      expect(legal.checked).toBe(true);
      expect(setFormValue.mock.calls.length).toBe(callsBefore);
    });
  });

  describe('Form reset', () => {
    it('formResetCallback unchecks Legal and its nested Base and registers no entry', async () => {
      const { legal, setFormValue } = createWithSpy({ name: 'tos', value: 'accepted' });
      const form = document.createElement('form');
      form.appendChild(legal);
      document.body.appendChild(form);
      await tick();
      nativeInput(legal).click();
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith('accepted');

      legal.formResetCallback();
      await tick();

      expect(legal.checked).toBe(false);
      expect(nestedBase(legal).checked).toBe(false);
      expect(nativeInput(legal).checked).toBe(false);
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('does not also attach the reset listener when form association is supported', async () => {
      const { legal } = createWithSpy({ name: 'tos', value: 'accepted' });
      const form = document.createElement('form');
      form.appendChild(legal);
      document.body.appendChild(form);
      await tick();
      nativeInput(legal).click();
      await tick();

      // jsdom does not call formResetCallback; an attached fallback listener
      // would uncheck the box here
      form.reset();
      await tick();
      expect(legal.checked).toBe(true);
    });

    it('falls back to a reset listener where form association is unsupported', async () => {
      const legal = document.createElement('input-checkbox-legal') as InputCheckboxLegalElement;
      legal.setAttribute('label', 'I agree');
      const form = document.createElement('form');
      form.appendChild(legal);
      document.body.appendChild(form);
      await tick();
      nativeInput(legal).click();
      await tick();
      expect(legal.checked).toBe(true);

      form.reset();
      await tick();
      expect(legal.checked).toBe(false);
      expect(nestedBase(legal).checked).toBe(false);
    });
  });
});
