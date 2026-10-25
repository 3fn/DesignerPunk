/**
 * @category evergreen
 * @purpose Verify Input-Checkbox-Base web form participation: the submission value registered through ElementInternals on every state transition, reset, and the D1 disabled neutralization
 * @jest-environment jsdom
 */
/**
 * Input-Checkbox-Base Form Participation Tests
 *
 * Contract: `validation_form_integration` (contracts.yaml), which reads
 * "Checkbox participates in native form submission. Value is included in
 * form data when checked." Defect record:
 * `.kiro/issues/2026-10-20-web-element-api-and-form-participation.md` (E1).
 *
 * What jsdom can and cannot prove (jsdom 26.1.0, read in source):
 * - jsdom has `attachInternals()` but its ElementInternals has no
 *   `setFormValue`, never calls `formResetCallback`, and does not put a
 *   form-associated custom element into `form.elements` or `new FormData()`.
 *   So no test here can observe a real submission.
 * - These tests therefore substitute a spy for the element's internals and
 *   assert the value the component REGISTERS with the UA after each state
 *   transition, and call `formResetCallback()` the way a UA does. That the
 *   UA turns the registered value into a FormData entry is browser
 *   behaviour, verified by hand on the demo page (Sparky; see the PR).
 *
 * Native semantics matched (HTML `<input type="checkbox">`):
 * checked → `value` (default "on"); unchecked → no entry; indeterminate is
 * visual only. Reset → the authored state, remembered at first connect
 * (Spec 046 Requirement 8.8 as amended 2026-10-25; defect record
 * `.kiro/issues/2026-10-25-checkbox-reset-semantics-contract-vs-code.md`).
 *
 * @module Input-Checkbox-Base/__tests__/form
 */

import { cleanupDOM } from '../../../../__tests__/helpers/web-component-test-utils';
import { InputCheckboxBaseElement } from '../platforms/web/InputCheckboxBase.web';
import { IconBaseElement } from '../../Icon-Base/platforms/web/IconBase.web';

type SpyInternals = { setFormValue: jest.Mock };

/** Let custom element reactions and microtasks settle. */
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

/**
 * Create a checkbox whose ElementInternals is replaced by a spy BEFORE it
 * connects, so the element takes its form-associated path (as in a browser)
 * and every registered submission value is observable.
 */
function createWithSpy(attrs: Record<string, string> = {}): {
  checkbox: InputCheckboxBaseElement;
  setFormValue: jest.Mock;
} {
  const checkbox = document.createElement('input-checkbox-base') as InputCheckboxBaseElement;
  checkbox.setAttribute('label', 'Receive updates');
  for (const [k, v] of Object.entries(attrs)) checkbox.setAttribute(k, v);
  const setFormValue = jest.fn();
  (checkbox as unknown as { _internals: SpyInternals })._internals = { setFormValue };
  return { checkbox, setFormValue };
}

function nativeInput(checkbox: InputCheckboxBaseElement): HTMLInputElement {
  return checkbox.shadowRoot!.querySelector('.checkbox__input') as HTMLInputElement;
}

describe('Input-Checkbox-Base Form Participation (validation_form_integration)', () => {
  beforeAll(() => {
    if (!customElements.get('icon-base')) {
      customElements.define('icon-base', IconBaseElement);
    }
    if (!customElements.get('input-checkbox-base')) {
      customElements.define('input-checkbox-base', InputCheckboxBaseElement);
    }
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('Form association', () => {
    it('is a form-associated custom element', () => {
      expect((InputCheckboxBaseElement as unknown as { formAssociated: boolean }).formAssociated).toBe(true);
    });

    it('attaches ElementInternals at construction', () => {
      const checkbox = document.createElement('input-checkbox-base') as InputCheckboxBaseElement;
      const internals = (checkbox as unknown as { _internals: ElementInternals | null })._internals;
      expect(internals).toBeInstanceOf(ElementInternals);
    });

    it('still constructs and renders where attachInternals does not exist', async () => {
      const proto = HTMLElement.prototype as unknown as { attachInternals?: unknown };
      const original = proto.attachInternals;
      delete proto.attachInternals;
      try {
        const checkbox = new InputCheckboxBaseElement();
        // The simulation took: no attachInternals anywhere on the chain
        expect((checkbox as unknown as { attachInternals?: unknown }).attachInternals).toBeUndefined();
        expect((checkbox as unknown as { _internals: unknown })._internals).toBeNull();
        checkbox.setAttribute('label', 'Legacy UA');
        checkbox.setAttribute('checked', '');
        document.body.appendChild(checkbox);
        await tick();
        expect(nativeInput(checkbox).checked).toBe(true);
      } finally {
        proto.attachInternals = original;
      }
    });
  });

  describe('Submission value on each state transition', () => {
    it('registers no entry (null) when connected unchecked', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes' });
      document.body.appendChild(checkbox);
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('registers its value when connected checked', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes', checked: '' });
      document.body.appendChild(checkbox);
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
    });

    it('registers its value when the user checks it, and null when the user unchecks it', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes' });
      document.body.appendChild(checkbox);
      await tick();

      nativeInput(checkbox).click();
      await tick();
      expect(checkbox.checked).toBe(true);
      expect(setFormValue).toHaveBeenLastCalledWith('yes');

      nativeInput(checkbox).click();
      await tick();
      expect(checkbox.checked).toBe(false);
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('has the value registered before its change listeners run', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes' });
      document.body.appendChild(checkbox);
      await tick();

      let registeredAtChange: unknown = 'not-called';
      checkbox.addEventListener('change', () => {
        registeredAtChange = setFormValue.mock.calls[setFormValue.mock.calls.length - 1][0];
      });
      nativeInput(checkbox).click();
      expect(registeredAtChange).toBe('yes');
    });

    it('follows programmatic checked changes (property and attribute)', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes' });
      document.body.appendChild(checkbox);
      await tick();

      checkbox.checked = true;
      expect(setFormValue).toHaveBeenLastCalledWith('yes');

      checkbox.removeAttribute('checked');
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('submits "on" when no value attribute is set (native default)', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'remember', checked: '' });
      document.body.appendChild(checkbox);
      await tick();
      expect(checkbox.value).toBe('on');
      expect(setFormValue).toHaveBeenLastCalledWith('on');
    });

    it('submits the empty string for an explicit value="" (native semantics)', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'remember', value: '', checked: '' });
      document.body.appendChild(checkbox);
      await tick();
      expect(checkbox.value).toBe('');
      expect(setFormValue).toHaveBeenLastCalledWith('');
    });

    it('registers the new value when value changes while checked', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'plan', value: 'basic', checked: '' });
      document.body.appendChild(checkbox);
      await tick();

      checkbox.value = 'pro';
      expect(setFormValue).toHaveBeenLastCalledWith('pro');
    });

    it('keeps no entry when value changes while unchecked', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'plan', value: 'basic' });
      document.body.appendChild(checkbox);
      await tick();

      checkbox.value = 'pro';
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('keeps its registered value when name changes (the UA reads name at submission)', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'old-name', value: 'yes', checked: '' });
      document.body.appendChild(checkbox);
      await tick();

      checkbox.name = 'new-name';
      expect(checkbox.getAttribute('name')).toBe('new-name');
      expect(nativeInput(checkbox).getAttribute('name')).toBe('new-name');
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
    });
  });

  describe('Indeterminate (visual only; the entry follows checked)', () => {
    it('registers no entry for indeterminate + unchecked', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'all', value: 'yes', indeterminate: '' });
      document.body.appendChild(checkbox);
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('registers the value for indeterminate + checked', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'all', value: 'yes', indeterminate: '', checked: '' });
      document.body.appendChild(checkbox);
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
    });

    it('does not change the registered value when indeterminate toggles', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'all', value: 'yes', checked: '' });
      document.body.appendChild(checkbox);
      await tick();

      checkbox.indeterminate = true;
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
      checkbox.indeterminate = false;
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
    });

    it('registers the value when the user clicks an indeterminate box (clears indeterminate, checks)', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'all', value: 'yes', indeterminate: '' });
      document.body.appendChild(checkbox);
      await tick();

      nativeInput(checkbox).click();
      await tick();
      expect(checkbox.indeterminate).toBe(false);
      expect(checkbox.checked).toBe(true);
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
    });
  });

  describe('Disabled attribute (D1: inert, never drops the value)', () => {
    /**
     * Because this element is now form-associated, a `disabled` attribute on
     * the host would make the UA leave it out of the submission. The
     * component has no disabled state (contracts.yaml excludes
     * state_disabled), so D1 strips the attribute on sight, as on
     * Input-Radio-Base.
     * @see .kiro/docs/ballots/2026-09-19-disabled-input-parity.md (D1)
     */
    it('strips a consumer-set disabled attribute immediately', async () => {
      const { checkbox } = createWithSpy({ name: 'updates' });
      document.body.appendChild(checkbox);
      await tick();

      checkbox.setAttribute('disabled', '');
      expect(checkbox.hasAttribute('disabled')).toBe(false);
    });

    it('keeps the registered value when a consumer sets disabled', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes', checked: '' });
      document.body.appendChild(checkbox);
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith('yes');

      checkbox.setAttribute('disabled', '');
      await tick();
      expect(checkbox.hasAttribute('disabled')).toBe(false);
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
    });

    it('treats formDisabledCallback as a no-op (state and value unchanged)', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes', checked: '' });
      document.body.appendChild(checkbox);
      await tick();
      const callsBefore = setFormValue.mock.calls.length;

      checkbox.formDisabledCallback(true);
      checkbox.formDisabledCallback(false);

      expect(checkbox.checked).toBe(true);
      expect(setFormValue.mock.calls.length).toBe(callsBefore);
    });

    it('does not observe disabled as part of the shared reactive-attribute list', () => {
      // 'disabled' is appended for neutralization only; the shared constant
      // in types.ts stays free of it (no disabled prop, by design).
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { INPUT_CHECKBOX_BASE_OBSERVED_ATTRIBUTES } = require('../types');
      expect(INPUT_CHECKBOX_BASE_OBSERVED_ATTRIBUTES).not.toContain('disabled');
      expect(InputCheckboxBaseElement.observedAttributes).toContain('disabled');
    });
  });

  describe('Form reset', () => {
    it('formResetCallback restores an authored checked + indeterminate state and registers its value', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'all', value: 'yes', checked: '', indeterminate: '' });
      const form = document.createElement('form');
      form.appendChild(checkbox);
      document.body.appendChild(form);
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith('yes');

      // The user clicks: indeterminate clears, the box unchecks
      nativeInput(checkbox).click();
      await tick();
      expect(checkbox.checked).toBe(false);
      expect(checkbox.indeterminate).toBe(false);
      expect(setFormValue).toHaveBeenLastCalledWith(null);

      // A UA calls this when the owning form resets
      checkbox.formResetCallback();
      await tick();

      expect(checkbox.checked).toBe(true);
      expect(checkbox.indeterminate).toBe(true);
      expect(nativeInput(checkbox).checked).toBe(true);
      expect(nativeInput(checkbox).indeterminate).toBe(true);
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
    });

    it('formResetCallback unchecks a box authored unchecked that the user checked, and registers no entry', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes' });
      const form = document.createElement('form');
      form.appendChild(checkbox);
      document.body.appendChild(form);
      await tick();
      nativeInput(checkbox).click();
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith('yes');

      checkbox.formResetCallback();
      await tick();
      expect(checkbox.checked).toBe(false);
      expect(nativeInput(checkbox).checked).toBe(false);
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('state set after first connect is state, not a new default: reset returns to the authored state', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes' });
      document.body.appendChild(checkbox);
      await tick();

      checkbox.setAttribute('checked', '');
      checkbox.indeterminate = true;
      await tick();
      expect(setFormValue).toHaveBeenLastCalledWith('yes');

      checkbox.formResetCallback();
      await tick();
      expect(checkbox.checked).toBe(false);
      expect(checkbox.indeterminate).toBe(false);
      expect(setFormValue).toHaveBeenLastCalledWith(null);
    });

    it('a checked property set before first connect is authored (it writes the same attribute)', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes' });
      checkbox.checked = true;
      document.body.appendChild(checkbox);
      await tick();
      checkbox.checked = false;
      await tick();

      checkbox.formResetCallback();
      await tick();
      expect(checkbox.checked).toBe(true);
      expect(setFormValue).toHaveBeenLastCalledWith('yes');
    });

    it('moving the element keeps the default from its first connect', async () => {
      const { checkbox } = createWithSpy({ name: 'updates', value: 'yes', checked: '' });
      const first = document.createElement('form');
      const second = document.createElement('form');
      document.body.append(first, second);
      first.appendChild(checkbox);
      await tick();

      checkbox.checked = false;
      second.appendChild(checkbox); // disconnect + connect
      await tick();

      checkbox.formResetCallback();
      await tick();
      expect(checkbox.checked).toBe(true);
    });

    it('a reset fires no change event and does not call onChange (native reset semantics)', async () => {
      const { checkbox } = createWithSpy({ name: 'updates', value: 'yes', checked: '' });
      document.body.appendChild(checkbox);
      await tick();
      checkbox.checked = false;
      await tick();

      const onChange = jest.fn();
      const changeListener = jest.fn();
      checkbox.onChange = onChange;
      checkbox.addEventListener('change', changeListener);

      checkbox.formResetCallback();
      await tick();
      expect(checkbox.checked).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
      expect(changeListener).not.toHaveBeenCalled();
    });

    it('formResetCallback on an already-unchecked box still registers no entry', async () => {
      const { checkbox, setFormValue } = createWithSpy({ name: 'updates', value: 'yes' });
      document.body.appendChild(checkbox);
      await tick();
      setFormValue.mockClear();

      checkbox.formResetCallback();
      expect(setFormValue).toHaveBeenCalledWith(null);
    });

    it('does not also attach the reset listener when form association is supported (no double reset)', async () => {
      const { checkbox } = createWithSpy({ name: 'updates', value: 'yes', checked: '' });
      const form = document.createElement('form');
      form.appendChild(checkbox);
      document.body.appendChild(form);
      await tick();

      // jsdom does not call formResetCallback, so if the fallback listener
      // were attached too, this reset would uncheck the box here.
      form.reset();
      await tick();
      expect(checkbox.checked).toBe(true);
    });

    it('falls back to a reset listener where form association is unsupported, restoring the authored state', async () => {
      // No spy: jsdom's internals lack setFormValue, i.e. the fallback path
      const checkbox = document.createElement('input-checkbox-base') as InputCheckboxBaseElement;
      checkbox.setAttribute('label', 'Receive updates');
      checkbox.setAttribute('checked', '');
      const form = document.createElement('form');
      form.appendChild(checkbox);
      document.body.appendChild(form);
      await tick();

      nativeInput(checkbox).click();
      await tick();
      expect(checkbox.checked).toBe(false);

      form.reset();
      await tick();
      expect(checkbox.checked).toBe(true);
    });

    it('the fallback reset unchecks a box authored unchecked', async () => {
      const checkbox = document.createElement('input-checkbox-base') as InputCheckboxBaseElement;
      checkbox.setAttribute('label', 'Receive updates');
      const form = document.createElement('form');
      form.appendChild(checkbox);
      document.body.appendChild(form);
      await tick();
      nativeInput(checkbox).click();
      await tick();
      expect(checkbox.checked).toBe(true);

      form.reset();
      await tick();
      expect(checkbox.checked).toBe(false);
    });
  });
});
