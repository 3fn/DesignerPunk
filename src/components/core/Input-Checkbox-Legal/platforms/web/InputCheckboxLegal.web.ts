/**
 * Input-Checkbox-Legal Web Component
 * 
 * Web platform implementation of the Input-Checkbox-Legal component using Web Components.
 * Wraps Input-Checkbox-Base with legal consent-specific functionality and fixed configuration.
 * 
 * Stemma System: Form Inputs Family
 * Component Type: Semantic Variant (wraps Base)
 * Naming Convention: [Family]-[Type]-[Variant] = Input-Checkbox-Legal
 * 
 * Key Differences from Input-Checkbox-Base:
 * - Fixed sizing: lg box (40px) with labelSm typography
 * - Fixed label alignment: top (for multi-line legal text)
 * - No indeterminate state support
 * - Explicit consent enforcement (prevents pre-checking)
 * - Audit trail support (timestamp, legalTextId, version)
 * - Required indicator visible by default
 * - No label truncation
 * 
 * Implementation Pattern:
 * This component wraps Input-Checkbox-Base, configuring it with fixed props
 * (size="lg", label-align="top", label-typography="sm") and adding Legal-specific
 * features on top. This reduces code duplication by ~80% and ensures Legal
 * inherits Base improvements automatically.
 * 
 * Form Participation (contract `validation_form_integration`, inherited):
 * The wrapped Input-Checkbox-Base sits inside THIS element's shadow root,
 * where no form can own it, so Legal is form-associated in its own right and
 * reports its own submission value through its own ElementInternals:
 * - checked   → one entry, Legal's `name` = Legal's `value` (default "on")
 * - unchecked → no entry
 * - the audit trail (legalTextId, legalTextVersion, timestamp) is NOT
 *   submitted: it is delivered on `consent-change`, and the consumer owns
 *   persistence (contracts.yaml validation_audit_trail)
 * The nested Base never submits: it has no form owner (no form element in
 * Legal's shadow tree), so a checked Legal produces exactly one entry.
 * 
 * DesignerPunk Philosophy: NO DISABLED STATES
 * 
 * @module Input-Checkbox-Legal/platforms/web
 * @see Requirements: 9.1-9.11
 */

import {
  ConsentChangeData,
  INPUT_CHECKBOX_LEGAL_OBSERVED_ATTRIBUTES,
  INPUT_CHECKBOX_LEGAL_DEFAULTS
} from '../../types';
// Import Base component to ensure it's registered
import { InputCheckboxBaseElement } from '../../../Input-Checkbox-Base/platforms/web/InputCheckboxBase.web';

// Import CSS as string for browser bundle compatibility
import legalStyles from './InputCheckboxLegal.web.css';

/** Counter for generating unique IDs when none provided */
let legalCheckboxIdCounter = 0;

/**
 * Input-Checkbox-Legal Web Component
 * 
 * Custom element wrapping Input-Checkbox-Base with legal consent functionality.
 * Uses fixed lg box size with labelSm typography for legal text readability.
 * 
 * @example
 * ```html
 * <input-checkbox-legal
 *   label="I agree to the Terms of Service and Privacy Policy"
 *   legal-text-id="tos-v2"
 *   legal-text-version="2.0.0"
 * ></input-checkbox-legal>
 * ```
 */
export class InputCheckboxLegalElement extends HTMLElement {
  /**
   * Marks this as a form-associated custom element. Legal needs its own:
   * the wrapped Base is in Legal's shadow root and cannot reach the form.
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#form-associated-custom-elements
   * @see Input-Checkbox-Base contracts.yaml validation_form_integration
   */
  static formAssociated = true;

  /** Shadow DOM root */
  private _shadowRoot: ShadowRoot;

  /**
   * ElementInternals for form association. Null where the UA has no
   * attachInternals (pre-FACE browsers).
   */
  private _internals: ElementInternals | null;

  /** Reference to the wrapped Input-Checkbox-Base element */
  private _baseCheckbox: InputCheckboxBaseElement | null = null;

  /**
   * Parent form, for the reset fallback used only where form-associated
   * custom elements are unsupported (see _attachToForm).
   */
  private _form: HTMLFormElement | null = null;

  /** Generated unique ID for label association */
  private _generatedId: string;

  /** Flag to track if explicit consent warning has been shown */
  private _consentWarningShown: boolean = false;

  /** Flag to prevent re-syncing Base when change originates from Base */
  private _isHandlingBaseChange: boolean = false;

  /** Base onChange callback (JS property, not attribute) */
  onChange: ((checked: boolean) => void) | null = null;

  /** Consent change callback with audit trail data (JS property, not attribute) */
  onConsentChange: ((data: ConsentChangeData) => void) | null = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._generatedId = `legal-checkbox-${++legalCheckboxIdCounter}`;

    // Form association, guarded as in Input-Checkbox-Base
    this._internals = typeof this.attachInternals === 'function'
      ? this.attachInternals()
      : null;
  }

  // ---------------------------------------------------------------------------
  // Observed Attributes
  // ---------------------------------------------------------------------------

  static get observedAttributes(): string[] {
    // 'disabled' is observed only so attributeChangedCallback can neutralize
    // it (D1, as in Input-Checkbox-Base and Input-Radio-Base).
    return [...INPUT_CHECKBOX_LEGAL_OBSERVED_ATTRIBUTES, 'disabled'];
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  connectedCallback(): void {
    // Enforce explicit consent before rendering
    this._enforceExplicitConsent();
    
    // Reset fallback for UAs without form-associated custom elements
    this._attachToForm();
    
    this.render();
    this._attachListeners();

    // Register the initial submission value (after consent enforcement, so
    // a refused pre-check never registers a value)
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
    // D1: form-data hazard neutralization. Legal has no disabled state
    // (contracts.yaml excludes state_disabled); because it is
    // form-associated, a consumer-set `disabled` would silently drop its
    // value from submission, so the attribute is stripped on sight.
    // @see .kiro/docs/ballots/2026-09-19-disabled-input-parity.md (D1)
    if (name === 'disabled') {
      if (newValue !== null) {
        this.removeAttribute('disabled');
      }
      return;
    }

    if (oldValue === newValue) return;
    
    // Re-enforce explicit consent when the checked attribute is changed by
    // the consumer, but NOT when the change is the user's own click arriving
    // from the wrapped Base (_onBaseChange). Enforcing on that path removed
    // the attribute the user had just given consent through: the box drew
    // checked, `checked` read false, a "pre-checked" warning fired, and the
    // form value stayed empty. Explicit consent IS the user's click.
    // @see contracts.yaml validation_explicit_consent
    if (name === 'checked' && !this._isHandlingBaseChange) {
      this._enforceExplicitConsent();
    }
    
    // Warn if indeterminate is set (not supported)
    if (name === 'indeterminate' && newValue !== null) {
      console.warn(
        'Input-Checkbox-Legal: Indeterminate state is not supported for legal consent checkboxes. ' +
        'Legal consent is binary (checked/unchecked).'
      );
    }
    
    if (this.isConnected && !this._isHandlingBaseChange) {
      this._updateBaseCheckbox();
    }

    // Runs on the Base-originated path too (_isHandlingBaseChange), which
    // is how a user's click reaches the submission value.
    // @see Input-Checkbox-Base contracts.yaml validation_form_integration
    if (this.isConnected) {
      this._updateFormValue();
    }
  }

  /**
   * Form-associated lifecycle callback: the owning form was reset.
   * Replaces the hand-wired `reset` listener where FACE is supported.
   */
  formResetCallback(): void {
    this._resetToUnchecked();
  }

  /**
   * Form-associated lifecycle callback: computed disabled state changed.
   * Intentionally a no-op (D1; see Input-Checkbox-Base).
   * @see .kiro/docs/ballots/2026-09-19-disabled-input-parity.md (D1)
   */
  formDisabledCallback(_formDisabled: boolean): void {
    // Intentional no-op
  }

  // ---------------------------------------------------------------------------
  // Property Accessors (attribute reflection)
  // ---------------------------------------------------------------------------

  get checked(): boolean {
    return this.hasAttribute('checked');
  }

  set checked(value: boolean) {
    // Enforce explicit consent when setting checked programmatically
    if (value && this.requiresExplicitConsent) {
      this._showConsentWarning();
      this.removeAttribute('checked');
      return;
    }
    
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
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
   * Value submitted when checked. Defaults to 'on' when the attribute is
   * absent; an explicit `value=""` submits the empty string (native
   * checkbox semantics).
   */
  get value(): string {
    return this.getAttribute('value') ?? 'on';
  }

  set value(value: string) {
    this.setAttribute('value', value);
  }

  get requiresExplicitConsent(): boolean {
    const attr = this.getAttribute('requires-explicit-consent');
    if (attr === null) return INPUT_CHECKBOX_LEGAL_DEFAULTS.requiresExplicitConsent;
    return attr !== 'false';
  }

  set requiresExplicitConsent(value: boolean) {
    if (value) {
      this.setAttribute('requires-explicit-consent', '');
    } else {
      this.setAttribute('requires-explicit-consent', 'false');
    }
  }

  get legalTextId(): string | null {
    return this.getAttribute('legal-text-id');
  }

  set legalTextId(value: string | null) {
    if (value) {
      this.setAttribute('legal-text-id', value);
    } else {
      this.removeAttribute('legal-text-id');
    }
  }

  get legalTextVersion(): string | null {
    return this.getAttribute('legal-text-version');
  }

  set legalTextVersion(value: string | null) {
    if (value) {
      this.setAttribute('legal-text-version', value);
    } else {
      this.removeAttribute('legal-text-version');
    }
  }

  get showRequiredIndicator(): boolean {
    const attr = this.getAttribute('show-required-indicator');
    if (attr === null) return INPUT_CHECKBOX_LEGAL_DEFAULTS.showRequiredIndicator;
    return attr !== 'false';
  }

  set showRequiredIndicator(value: boolean) {
    if (value) {
      this.setAttribute('show-required-indicator', '');
    } else {
      this.setAttribute('show-required-indicator', 'false');
    }
  }

  // ---------------------------------------------------------------------------
  // Form Integration
  // ---------------------------------------------------------------------------

  /**
   * Whether the UA supports form-associated custom elements here (false on
   * pre-FACE browsers and in jsdom, which lacks setFormValue).
   */
  private get _isFormAssociationSupported(): boolean {
    return typeof this._internals?.setFormValue === 'function';
  }

  /**
   * Register Legal's own submission value: checked → `value`, unchecked →
   * null (no entry). An unnamed Legal is skipped by the UA, like an unnamed
   * native checkbox.
   */
  private _updateFormValue(): void {
    if (!this._isFormAssociationSupported) return;
    this._internals!.setFormValue(this.checked ? this.value : null);
  }

  /**
   * Reset fallback, used ONLY where FACE is unsupported; otherwise the UA
   * calls formResetCallback and this listener would run the reset twice.
   */
  private _attachToForm(): void {
    if (this._isFormAssociationSupported) return;
    this._form = this.closest('form');
    if (this._form) {
      this._form.addEventListener('reset', this._onFormReset);
    }
  }

  private _detachFromForm(): void {
    if (this._form) {
      this._form.removeEventListener('reset', this._onFormReset);
      this._form = null;
    }
  }

  private _onFormReset = (): void => {
    this._resetToUnchecked();
  };

  /**
   * Reset to unchecked (Spec 046 Requirement 8.8) and clear the submission
   * value. Unchecking never needs consent, so this is always allowed.
   */
  private _resetToUnchecked(): void {
    this.checked = false;
    if (this._baseCheckbox) {
      this._baseCheckbox.checked = false;
    }
    // Already unchecked → no attribute change fired above, so clear explicitly
    this._updateFormValue();
  }

  // ---------------------------------------------------------------------------
  // Explicit Consent Enforcement
  // ---------------------------------------------------------------------------

  private _enforceExplicitConsent(): void {
    if (this.requiresExplicitConsent && this.hasAttribute('checked')) {
      this._showConsentWarning();
      this.removeAttribute('checked');
    }
  }

  private _showConsentWarning(): void {
    if (!this._consentWarningShown) {
      console.warn(
        'Input-Checkbox-Legal: Pre-checked state not allowed with requiresExplicitConsent. ' +
        'Overriding to unchecked. Legal consent must be explicitly given by the user.'
      );
      this._consentWarningShown = true;
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  private render(): void {
    const id = this.getAttribute('id') || this._generatedId;
    const showRequired = this.showRequiredIndicator;

    // Build required indicator HTML
    const requiredHTML = showRequired 
      ? '<span class="checkbox__required" aria-hidden="true">Required</span>' 
      : '';

    // Render shadow DOM with wrapped Input-Checkbox-Base
    this._shadowRoot.innerHTML = `
      <style>${legalStyles}</style>
      <div class="checkbox-container checkbox--legal">
        ${requiredHTML}
        <input-checkbox-base
          id="${id}-base"
          size="lg"
          label-align="top"
          label-typography="sm"
        ></input-checkbox-base>
      </div>
    `;

    // Store reference to base checkbox
    this._baseCheckbox = this._shadowRoot.querySelector('input-checkbox-base') as InputCheckboxBaseElement;
    
    // Update base checkbox with current attributes
    this._updateBaseCheckbox();
  }

  /**
   * Update the wrapped Input-Checkbox-Base with current attribute values.
   * Forwards relevant attributes to Base while maintaining fixed configuration.
   */
  private _updateBaseCheckbox(): void {
    if (!this._baseCheckbox) return;

    // Forward relevant attributes to Base
    // Note: size, label-align, and label-typography are fixed and set in render()
    
    // Label
    if (this.label) {
      this._baseCheckbox.setAttribute('label', this.label);
    }
    
    // Checked state (already enforced for explicit consent)
    if (this.checked) {
      this._baseCheckbox.setAttribute('checked', '');
    } else {
      this._baseCheckbox.removeAttribute('checked');
    }
    
    // Helper text
    if (this.helperText) {
      this._baseCheckbox.setAttribute('helper-text', this.helperText);
    } else {
      this._baseCheckbox.removeAttribute('helper-text');
    }
    
    // Error message
    if (this.errorMessage) {
      this._baseCheckbox.setAttribute('error-message', this.errorMessage);
    } else {
      this._baseCheckbox.removeAttribute('error-message');
    }
    
    // Test ID
    if (this.testID) {
      this._baseCheckbox.setAttribute('test-id', this.testID);
    } else {
      this._baseCheckbox.removeAttribute('test-id');
    }
    
    // Form name
    if (this.name) {
      this._baseCheckbox.setAttribute('name', this.name);
    } else {
      this._baseCheckbox.removeAttribute('name');
    }
    
    // Form value
    this._baseCheckbox.setAttribute('value', this.value);
    
    // Never set indeterminate on Base (not supported for Legal)
    this._baseCheckbox.removeAttribute('indeterminate');
  }

  // ---------------------------------------------------------------------------
  // Event Handling
  // ---------------------------------------------------------------------------

  /**
   * Handle change event from wrapped Input-Checkbox-Base.
   * Transforms to consent-change event with audit trail data.
   */
  private _onBaseChange = (event: Event): void => {
    // Prevent the base's change event from bubbling up
    event.stopPropagation();
    
    const customEvent = event as CustomEvent<{ checked: boolean }>;
    const newChecked = customEvent.detail.checked;

    // Set flag to prevent attributeChangedCallback from re-syncing Base
    // (which would cause infinite loop or state reset)
    this._isHandlingBaseChange = true;
    
    // Update our checked attribute to reflect new state
    if (newChecked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    
    // Clear flag after attribute update
    this._isHandlingBaseChange = false;

    // Generate ISO 8601 timestamp
    const timestamp = new Date().toISOString();

    // Fire base onChange callback
    this.onChange?.(newChecked);

    // Build consent change data with audit trail
    const consentData: ConsentChangeData = {
      consented: newChecked,
      timestamp
    };

    // Include audit trail data if provided
    if (this.legalTextId) {
      consentData.legalTextId = this.legalTextId;
    }

    if (this.legalTextVersion) {
      consentData.legalTextVersion = this.legalTextVersion;
    }

    // Fire consent change callback
    this.onConsentChange?.(consentData);

    // Dispatch custom consent-change event
    this.dispatchEvent(
      new CustomEvent('consent-change', {
        detail: consentData,
        bubbles: true,
        composed: true
      })
    );

    // Also dispatch standard change event for compatibility
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: newChecked },
        bubbles: true,
        composed: true
      })
    );
  };

  private _attachListeners(): void {
    this._baseCheckbox?.addEventListener('change', this._onBaseChange);
  }

  private _detachListeners(): void {
    this._baseCheckbox?.removeEventListener('change', this._onBaseChange);
  }
}

// Register custom element
if (!customElements.get('input-checkbox-legal')) {
  customElements.define('input-checkbox-legal', InputCheckboxLegalElement);
}
