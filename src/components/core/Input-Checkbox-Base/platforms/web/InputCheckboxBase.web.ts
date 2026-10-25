/**
 * Input-Checkbox-Base Web Component
 * 
 * Web platform implementation of the Input-Checkbox-Base component using Web Components.
 * Implements a binary selection control with three size variants, configurable label
 * alignment, and support for checked, unchecked, and indeterminate states.
 * 
 * Stemma System: Form Inputs Family
 * Component Type: Primitive (Base)
 * Naming Convention: [Family]-[Type]-[Variant] = Input-Checkbox-Base
 * 
 * Features:
 * - Form-associated custom element (ElementInternals): the host element takes
 *   part in its form's submission and reset, like a native checkbox
 * - Shadow DOM with a visually hidden native checkbox for interaction and AT
 * - Three size variants (sm, md, lg) with token-based sizing
 * - Label alignment (center, top) for single/multi-line labels
 * - Attribute reflection for reactive updates
 * - CSS logical properties for RTL support
 * - Icon-Base integration for checkmark/minus icons
 * - Blend utilities for hover state (8% darker border)
 * 
 * DesignerPunk Philosophy: NO DISABLED STATES
 * 
 * @module Input-Checkbox-Base/platforms/web
 * @see Requirements: 8.1, 8.2, 8.4, 2.1-2.9, 3.1-3.4, 1.4, 7.4
 */

import {
  CheckboxSize,
  LabelAlignment,
  LabelTypography,
  INPUT_CHECKBOX_BASE_OBSERVED_ATTRIBUTES,
  INPUT_CHECKBOX_BASE_DEFAULTS
} from '../../types';
import { createIconBase } from '../../../Icon-Base/platforms/web/IconBase.web';
import { IconBaseSize } from '../../../Icon-Base/types';

// Import theme-aware blend utilities for hover state color calculations
// Uses getBlendUtilities() factory for consistent state styling across components
// @see Requirements: 1.4, 7.4 - Hover applies blend.hoverDarker to border
import { getBlendUtilities, BlendUtilitiesResult } from '@3fn/core/blend';

// Import CSS as string for browser bundle compatibility
// The esbuild CSS-as-string plugin transforms this import into a JS string export
import checkboxStyles from './InputCheckboxBase.web.css';

/** Counter for generating unique IDs when none provided */
let checkboxIdCounter = 0;

/**
 * Maps checkbox size to Icon-Base icon size.
 * 
 * - sm: icon.size050 (16px → rendered as 16px)
 * - md: icon.size075 (20px)
 * - lg: icon.size100 (24px)
 * 
 * @see Design doc: Token Usage by Size table
 */
const ICON_SIZE_MAP: Record<CheckboxSize, IconBaseSize> = {
  sm: 13,   // icon.size050 → 16px rendered
  md: 20,   // icon.size075 → 20px
  lg: 24    // icon.size100 → 24px
};

/**
 * Input-Checkbox-Base Web Component
 * 
 * Custom element implementing a checkbox with Shadow DOM encapsulation,
 * a visually hidden native input for interaction, and token-based styling.
 * 
 * Form participation (contract `validation_form_integration`): the native
 * input lives in the shadow root, and a form owns only controls in its own
 * tree, so the inner input never reaches the outer form. The HOST element is
 * therefore form-associated and reports its own value through
 * ElementInternals, matching native `<input type="checkbox">` semantics:
 * - checked   → one entry, `name` = `value` (`value` defaults to "on")
 * - unchecked → no entry
 * - indeterminate is visual only; the entry follows `checked`
 * - no `name` → no entry (the UA skips an unnamed control)
 * - form reset → the state the element had when it first connected (its
 *   authored `checked` and `indeterminate`), as the contract states. The
 *   element writes its current state back to the `checked` attribute, so
 *   the attribute cannot hold the default the way a native input's does;
 *   the default is remembered at first connect instead. Spec 046 Req 8.8,
 *   amended 2026-10-25 (.kiro/issues/2026-10-25-checkbox-reset-semantics-contract-vs-code.md).
 * 
 * @example
 * ```html
 * <input-checkbox-base
 *   label="Accept terms"
 *   size="md"
 *   label-align="center"
 * ></input-checkbox-base>
 * ```
 */
export class InputCheckboxBaseElement extends HTMLElement {
  /**
   * Marks this as a form-associated custom element, so the UA lists the host
   * among its form's controls and calls the form lifecycle callbacks below.
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#form-associated-custom-elements
   * @see contracts.yaml validation_form_integration
   */
  static formAssociated = true;

  /** Shadow DOM root */
  private _shadowRoot: ShadowRoot;

  /**
   * ElementInternals for form association: carries the host's submission
   * value. Null where the UA has no attachInternals (pre-FACE browsers).
   */
  private _internals: ElementInternals | null;

  /** Reference to the hidden native checkbox */
  private _input: HTMLInputElement | null = null;

  /**
   * Parent form, for the reset fallback used only where form-associated
   * custom elements are unsupported (see _attachToForm).
   */
  private _form: HTMLFormElement | null = null;

  /**
   * The authored state, remembered at FIRST connect and restored by a form
   * reset (contract `validation_form_integration`: "Form reset restores
   * initial checked state"). Null until the element first connects. Later
   * changes to `checked` / `indeterminate` (by attribute, property or the
   * user's click) are state, never a new default; moving the element
   * (disconnect, then connect) keeps the first default.
   */
  private _defaultState: { checked: boolean; indeterminate: boolean } | null = null;

  /** Change callback (JS property, not attribute) */
  onChange: ((checked: boolean) => void) | null = null;

  /** Generated unique ID for label association */
  private _generatedId: string;

  /** Theme-aware blend utilities instance for hover state calculations */
  private _blendUtils: BlendUtilitiesResult;

  /** Cached hover border color (8% darker than default border) */
  private _hoverBorderColor: string = '';

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._generatedId = `checkbox-${++checkboxIdCounter}`;

    // Form association. Guarded: calling attachInternals where it does not
    // exist would throw and break the element outright; without it the
    // element still renders and resets, it just cannot submit.
    // @see contracts.yaml validation_form_integration
    this._internals = typeof this.attachInternals === 'function'
      ? this.attachInternals()
      : null;
    
    // Initialize theme-aware blend utilities
    // Uses getBlendUtilities() factory for consistent state styling
    // @see Requirements: 1.4, 7.4 - Hover applies blend.hoverDarker to border
    this._blendUtils = getBlendUtilities();
  }

  // ---------------------------------------------------------------------------
  // Observed Attributes
  // ---------------------------------------------------------------------------

  static get observedAttributes(): string[] {
    // 'disabled' is observed in addition to INPUT_CHECKBOX_BASE_OBSERVED_ATTRIBUTES
    // (which stays the shared reactive-attribute contract) purely so
    // attributeChangedCallback can neutralize it. See the D1 comment there.
    return [...INPUT_CHECKBOX_BASE_OBSERVED_ATTRIBUTES, 'disabled'];
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  connectedCallback(): void {
    // Remember the authored state once, before anything can change it.
    // Whatever the element holds at first connect is authored: a `checked`
    // attribute in markup, or a `checked` property set before insertion
    // (which writes the same attribute).
    // @see contracts.yaml validation_form_integration
    if (this._defaultState === null) {
      this._defaultState = { checked: this.checked, indeterminate: this.indeterminate };
    }

    // Calculate blend colors for hover state
    // @see Requirements: 1.4, 7.4 - Hover applies blend.hoverDarker to border
    this._calculateBlendColors();
    
    // Reset fallback for UAs without form-associated custom elements
    // @see Requirements: 8.8 (amended 2026-10-25) - Form reset restores the authored state
    this._attachToForm();
    
    this.render();
    this._attachListeners();

    // Register the initial submission value
    // @see contracts.yaml validation_form_integration
    this._updateFormValue();
  }

  disconnectedCallback(): void {
    this._detachListeners();
    this._detachFromForm();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    // D1: form-data hazard neutralization, the same shape as Input-Radio-Base.
    // This element has no disabled state (contracts.yaml excludes
    // state_disabled), but because it is form-associated, the mere PRESENCE
    // of a `disabled` attribute would make the UA drop its value from the
    // form's submission while the control still renders and responds. The
    // 2026-09-19 ruling makes a consumer-set `disabled` inert, so the
    // attribute is stripped the instant it is observed.
    // @see .kiro/docs/ballots/2026-09-19-disabled-input-parity.md (D1)
    if (name === 'disabled') {
      if (newValue !== null) {
        this.removeAttribute('disabled');
      }
      return;
    }

    if (oldValue === newValue) return;
    if (this.isConnected) {
      this.render();
      this._attachListeners();

      // checked and value decide the submission value; name is read by the
      // UA at submission time. Cheap and idempotent, so run on every change.
      // @see contracts.yaml validation_form_integration
      this._updateFormValue();
    }
  }

  /**
   * Form-associated lifecycle callback: the owning form was reset.
   * Replaces the hand-wired `reset` listener wherever the UA supports
   * form-associated custom elements. Per the HTML spec the UA calls it for
   * whatever form owns the element, including an owner set by `form="id"`,
   * which a closest('form') listener cannot see.
   * @see Requirements: 8.8 (amended 2026-10-25) - Form reset restores the authored state
   */
  formResetCallback(): void {
    this._resetToDefault();
  }

  /**
   * Form-associated lifecycle callback: the computed disabled state changed
   * (an ancestor `<fieldset disabled>`, or a `disabled` attribute in the
   * instant before attributeChangedCallback strips it).
   *
   * Intentionally a no-op, as on Input-Radio-Base (D1). A `<fieldset
   * disabled>` ancestor excluding this control from submission is a
   * platform-level exclusion the component cannot override from inside,
   * and is out of D1's scope.
   * @see .kiro/docs/ballots/2026-09-19-disabled-input-parity.md (D1)
   */
  formDisabledCallback(_formDisabled: boolean): void {
    // Intentional no-op; see doc comment above.
  }

  // ---------------------------------------------------------------------------
  // Property Accessors (attribute reflection)
  // ---------------------------------------------------------------------------

  get checked(): boolean {
    return this.hasAttribute('checked');
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get indeterminate(): boolean {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(value: boolean) {
    if (value) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  get size(): CheckboxSize {
    const attr = this.getAttribute('size');
    if (attr === 'sm' || attr === 'md' || attr === 'lg') return attr;
    return INPUT_CHECKBOX_BASE_DEFAULTS.size;
  }

  set size(value: CheckboxSize) {
    this.setAttribute('size', value);
  }

  get labelAlign(): LabelAlignment {
    const attr = this.getAttribute('label-align');
    if (attr === 'center' || attr === 'top') return attr;
    return INPUT_CHECKBOX_BASE_DEFAULTS.labelAlign;
  }

  set labelAlign(value: LabelAlignment) {
    this.setAttribute('label-align', value);
  }

  /**
   * Label typography override.
   * 
   * Allows overriding the default label typography which normally matches the size variant.
   * When set to 'inherit' (default), typography matches the size variant.
   * When set to 'sm', 'md', or 'lg', forces that typography regardless of size.
   * 
   * @see Requirements: 9.1 - Legal uses lg box + labelSm typography
   */
  get labelTypography(): LabelTypography {
    const attr = this.getAttribute('label-typography');
    if (attr === 'inherit' || attr === 'sm' || attr === 'md' || attr === 'lg') return attr;
    return INPUT_CHECKBOX_BASE_DEFAULTS.labelTypography;
  }

  set labelTypography(value: LabelTypography) {
    this.setAttribute('label-typography', value);
  }

  get helperText(): string | null {
    return this.getAttribute('helper-text');
  }

  set helperText(value: string | null) {
    if (value) {
      this.setAttribute('helper-text', value);
    } else {
      this.removeAttribute('helper-text');
    }
  }

  get errorMessage(): string | null {
    return this.getAttribute('error-message');
  }

  set errorMessage(value: string | null) {
    if (value) {
      this.setAttribute('error-message', value);
    } else {
      this.removeAttribute('error-message');
    }
  }

  get testID(): string | null {
    return this.getAttribute('test-id');
  }

  set testID(value: string | null) {
    if (value) {
      this.setAttribute('test-id', value);
    } else {
      this.removeAttribute('test-id');
    }
  }

  /**
   * Form field name for form submission.
   * 
   * When provided, the checkbox value will be included in form submission
   * data under this name.
   * 
   * @see Requirements: 8.5, 8.7 - Form submission includes checkbox value
   */
  get name(): string | null {
    return this.getAttribute('name');
  }

  set name(value: string | null) {
    if (value) {
      this.setAttribute('name', value);
    } else {
      this.removeAttribute('name');
    }
  }

  /**
   * Value submitted with form when checkbox is checked.
   * 
   * Defaults to 'on' when the attribute is absent (standard HTML checkbox
   * behavior). An explicit empty `value=""` submits the empty string, as a
   * native checkbox does.
   * 
   * @see Requirements: 8.5, 8.7 - Form submission includes checkbox value
   */
  get value(): string {
    return this.getAttribute('value') ?? 'on';
  }

  set value(value: string) {
    this.setAttribute('value', value);
  }

  // ---------------------------------------------------------------------------
  // Blend Color Calculation
  // ---------------------------------------------------------------------------

  /**
   * Calculate blend colors for hover state using theme-aware blend utilities.
   * 
   * Reads the default border color from CSS custom properties and calculates
   * the hover border color by applying blend.hoverDarker (8% darker).
   * 
   * @see Requirements: 1.4 - Hover feedback on border
   * @see Requirements: 7.4 - Web hover applies blend.hoverDarker to border
   */
  private _calculateBlendColors(): void {
    // Get computed styles to read CSS custom properties
    const computedStyle = getComputedStyle(document.documentElement);
    
    // Get the default border color (unchecked state)
    // This is --color-feedback-select-border-default
    const defaultBorderColor = computedStyle.getPropertyValue('--color-feedback-select-border-default').trim();
    
    if (defaultBorderColor) {
      // Calculate hover border color using blend.hoverDarker (8% darker)
      // @see Requirements: 7.4 - Hover applies blend.hoverDarker to border
      this._hoverBorderColor = this._blendUtils.hoverColor(defaultBorderColor);
    }
  }

  // ---------------------------------------------------------------------------
  // Form Integration
  // ---------------------------------------------------------------------------

  /**
   * Whether the UA supports form-associated custom elements here: the
   * element has internals AND they can carry a submission value. False on
   * pre-FACE browsers and in jsdom (which has attachInternals but no
   * setFormValue).
   */
  private get _isFormAssociationSupported(): boolean {
    return typeof this._internals?.setFormValue === 'function';
  }

  /**
   * Register the host's submission value with ElementInternals.
   * 
   * Native checkbox semantics: checked → `value`; unchecked → null (no entry).
   * Indeterminate does not affect it. An absent or empty `name` is left to
   * the UA, which skips an unnamed form-associated element when it builds
   * the entry list, exactly as it skips an unnamed native checkbox.
   * 
   * @see contracts.yaml validation_form_integration
   * @see Requirements: 8.5, 8.7 - Form submission includes checkbox value
   */
  private _updateFormValue(): void {
    if (!this._isFormAssociationSupported) return;
    this._internals!.setFormValue(this.checked ? this.value : null);
  }

  /**
   * Reset fallback: attach a `reset` listener to the closest parent form.
   * 
   * Used ONLY where form-associated custom elements are unsupported. Where
   * they are supported, the UA calls formResetCallback instead, and adding
   * this listener as well would run the reset twice.
   * 
   * @see Requirements: 8.8 (amended 2026-10-25) - Form reset restores the authored state
   */
  private _attachToForm(): void {
    if (this._isFormAssociationSupported) return;
    this._form = this.closest('form');
    if (this._form) {
      this._form.addEventListener('reset', this._onFormReset);
    }
  }

  /**
   * Detach from parent form.
   * 
   * Removes the reset event listener when the component is disconnected.
   */
  private _detachFromForm(): void {
    if (this._form) {
      this._form.removeEventListener('reset', this._onFormReset);
      this._form = null;
    }
  }

  /**
   * Handle form reset event (fallback path; see _attachToForm).
   */
  private _onFormReset = (): void => {
    this._resetToDefault();
  };

  /**
   * Restore the authored state (remembered at first connect) and register
   * its submission value. Like a native reset, this fires no `change`
   * event and does not call `onChange`.
   * 
   * @see contracts.yaml validation_form_integration
   * @see Requirements: 8.8 (amended 2026-10-25) - Form reset restores the authored state
   */
  private _resetToDefault(): void {
    const { checked, indeterminate } = this._defaultState ?? { checked: false, indeterminate: false };
    this.checked = checked;
    this.indeterminate = indeterminate;
    
    // Sync the native input
    if (this._input) {
      this._input.checked = checked;
      this._input.indeterminate = indeterminate;
    }

    // Unchanged state → no attribute change fired above, so register explicitly
    this._updateFormValue();
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  private render(): void {
    const id = this.getAttribute('id') || this._generatedId;
    const inputId = `${id}-input`;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const labelText = this.label;
    const size = this.size;
    const labelAlign = this.labelAlign;
    const labelTypography = this.labelTypography;
    const isChecked = this.checked;
    const isIndeterminate = this.indeterminate;
    const helperText = this.helperText;
    const errorMessage = this.errorMessage;
    const hasError = !!errorMessage;
    const testId = this.testID;
    const inputName = this.name;
    const inputValue = this.value;

    // Build CSS class list
    // Typography override class is only added when labelTypography is not 'inherit'
    // @see Requirements: 9.1 - Legal uses lg box + labelSm typography
    const classes = [
      'checkbox',
      `checkbox--${size}`,
      labelAlign === 'top' ? 'checkbox--align-top' : '',
      labelTypography !== 'inherit' ? `checkbox--label-${labelTypography}` : '',
      isChecked ? 'checkbox--checked' : '',
      isIndeterminate ? 'checkbox--indeterminate' : '',
      hasError ? 'checkbox--error' : ''
    ].filter(Boolean).join(' ');

    // Build icon HTML (only when checked or indeterminate)
    let iconHTML = '';
    if (isIndeterminate) {
      iconHTML = createIconBase({
        name: 'minus',
        size: ICON_SIZE_MAP[size],
        color: 'inherit'
      });
    } else if (isChecked) {
      iconHTML = createIconBase({
        name: 'check',
        size: ICON_SIZE_MAP[size],
        color: 'inherit'
      });
    }

    // Build test-id attribute
    const testIdAttr = testId ? ` data-testid="${testId}"` : '';

    // Build aria-describedby attribute for accessibility
    // Associates helper text and error message with the checkbox
    // @see Requirements: 5.5, 5.6 - aria-describedby for error and helper text association
    const describedByParts: string[] = [];
    if (errorMessage) describedByParts.push(errorId);
    if (helperText) describedByParts.push(helperId);
    const ariaDescribedBy = describedByParts.length > 0 
      ? ` aria-describedby="${describedByParts.join(' ')}"` 
      : '';

    // Build helper text HTML
    // @see Requirements: 5.1 - Helper text displayed below checkbox
    const helperTextHTML = helperText 
      ? `<span class="checkbox__helper" id="${helperId}">${helperText}</span>` 
      : '';

    // Build error message HTML
    // @see Requirements: 5.2 - Error message displayed below helper text
    const errorMessageHTML = errorMessage 
      ? `<span class="checkbox__error" id="${errorId}" role="alert">${errorMessage}</span>` 
      : '';

    // Build name attribute for form submission
    // @see Requirements: 8.5, 8.7 - Form submission includes checkbox value
    const nameAttr = inputName ? ` name="${inputName}"` : '';

    // Build label ID for explicit for/id association
    // @see Requirements: 6.1 - Associate label with checkbox via for/id
    const labelId = `${id}-label`;

    // Render shadow DOM
    // Structure uses explicit for/id association for accessibility
    // @see Requirements: 6.1 - Label associated with checkbox via for/id
    // @see Requirements: 6.2 - Screen reader announces state changes via aria-checked
    // @see Requirements: 6.4 - Space key toggle handled by native checkbox
    // @see Requirements: 6.6 - Touch target minimum 44px via CSS
    this._shadowRoot.innerHTML = `
      <style>${checkboxStyles}</style>
      <div class="checkbox-container">
        <div class="${classes}"${testIdAttr}>
          <input
            type="checkbox"
            class="checkbox__input"
            id="${inputId}"${nameAttr}
            value="${inputValue}"
            aria-labelledby="${labelId}"
            ${isChecked ? 'checked' : ''}
            ${isIndeterminate ? 'aria-checked="mixed"' : `aria-checked="${isChecked}"`}
            ${hasError ? 'aria-invalid="true"' : ''}${ariaDescribedBy}
          />
          <label for="${inputId}" class="checkbox__touch-target">
            <span class="checkbox__box">
              ${iconHTML}
            </span>
            <span class="checkbox__content">
              <span class="checkbox__label" id="${labelId}">${labelText}</span>
            </span>
          </label>
        </div>
        ${helperTextHTML}
        ${errorMessageHTML}
      </div>
    `;

    // Store reference to native input
    this._input = this._shadowRoot.querySelector('.checkbox__input');
    
    // Store reference to the checkbox wrapper for applying blend colors
    const checkboxWrapper = this._shadowRoot.querySelector('.checkbox') as HTMLElement;
    
    // Apply blend colors as CSS custom properties
    // @see Requirements: 1.4, 7.4 - Hover applies blend.hoverDarker to border
    if (checkboxWrapper && this._hoverBorderColor) {
      checkboxWrapper.style.setProperty('--_checkbox-hover-border', this._hoverBorderColor);
    }

    // Sync indeterminate property (not settable via attribute)
    if (this._input) {
      this._input.indeterminate = isIndeterminate;
    }
  }

  // ---------------------------------------------------------------------------
  // Event Handling
  // ---------------------------------------------------------------------------

  private _onInputChange = (): void => {
    if (!this._input) return;

    const newChecked = this._input.checked;

    // Update attribute to reflect new state
    if (newChecked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }

    // Clear indeterminate on user interaction
    if (this.indeterminate) {
      this.removeAttribute('indeterminate');
    }

    // Submission value is current before any listener runs
    // @see contracts.yaml validation_form_integration
    this._updateFormValue();

    // Fire callback
    this.onChange?.(newChecked);

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: newChecked },
        bubbles: true,
        composed: true
      })
    );
  };

  private _attachListeners(): void {
    this._input?.addEventListener('change', this._onInputChange);
  }

  private _detachListeners(): void {
    this._input?.removeEventListener('change', this._onInputChange);
  }
}

// Register custom element
if (!customElements.get('input-checkbox-base')) {
  customElements.define('input-checkbox-base', InputCheckboxBaseElement);
}
