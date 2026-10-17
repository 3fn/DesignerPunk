/**
 * Pre-exposure lists for the components calibration instrument
 * (charter `.kiro/issues/2026-10-17-components-calibration-instrument-charter.md` § 2, § 10).
 *
 * A seat phrase is PRE-EXPOSED if, after the matcher's own normalization
 * (`tokenizeForMatch` joined by single spaces), it string-equals the same normalization of any
 * entry below. The flag is mechanical: no judgment, no fuzzy match. Every list is copied
 * VERBATIM from its source; do not edit an entry to "fix" it.
 */

import { tokenizeForMatch } from '../indexer/ComponentIndexer';

/** Stage 0 reproductions — archived defect record (2026-10-07), before/after table rows 1–7 (incl. 2a, 2b). */
export const STAGE0_REPRODUCTIONS: readonly string[] = [
  'a toast for errors',
  'toggle',
  'switch to turn a setting on or off',
  'tabs',
  'email field with validation',
  'loading spinner while data fetches',
  'progress through onboarding steps',
  'bottom navigation between sections',
];

/** Settings call ledger (archived 2026-10-12), `find_components` keyword arguments of rows D8, D9, D10. */
export const LEDGER_D8_D10: readonly string[] = [
  'on/off switch',
  'confirm sheet or dialog',
  "brief message that a change didn't save",
];

/** Lina's probe set (2026-10-17, author-exposed; 68 queries) — charter § 10, row "Probe list". */
export const LINA_PROBES: readonly string[] = [
  'on/off switch', 'confirm sheet or dialog', "brief message that a change didn't save", 'a toast for errors',
  'toggle', 'switch to turn a setting on or off', 'tabs', 'email field with validation',
  'loading spinner while data fetches', 'progress through onboarding steps', 'bottom navigation between sections',
  'primary action button', 'text input field', 'login', 'onboarding', 'onboarding flows', 'container', 'button',
  'input', 'avatar', 'checkbox', 'radio group', 'page header with back button', 'progress bar',
  'notification badge', 'segmented control', 'tab bar', 'password field', 'phone number input',
  'pagination dots', 'filter chip', 'card', 'list of buttons', 'user profile picture', 'divider line', 'icon',
  'select one option from a set', 'show unread count', 'header for app', 'step indicator', 'loading',
  'error message on input', 'avatar image', 'rounded avatar', 'large checkbox', 'small icon button',
  'legal consent checkbox', 'email address', 'circular profile photo', 'stepper with labels', 'tab navigation',
  'chip that can be removed', 'spinner', 'modal', 'dialog', 'toast', 'dropdown', 'stepper', 'badge', 'tag',
  'header', 'link', 'navigation', 'form', 'progress', 'nav', 'large dark checkbox', 'compact avatar for comments',
];

/** Thurgood's probe set (2026-10-17, author-exposed) — charter Appendix A. */
export const THURGOOD_PROBES: readonly string[] = [
  'on/off switch', 'confirm sheet or dialog', "brief message that a change didn't save", 'a toast for errors',
  'toggle', 'loading spinner while data fetches', 'bottom navigation between sections', 'avatar',
  'primary action button', 'text input field', 'tabs', 'email field with validation',
  'progress through onboarding steps', 'profile picture', 'user photo', 'checkbox', 'segmented control',
  'page dots', 'stepper', 'notification badge', 'accept terms', 'password', 'phone number', 'filter chips',
  'content switcher', 'icon only button', 'loading bar', 'list of choices', 'card', 'close button',
  'back button', 'select one option', 'tag', 'label',
];

export type PreExposureSource = 'stage0' | 'ledger-d8-d10' | 'lina-probes' | 'thurgood-probes';

const SOURCES: ReadonlyArray<[PreExposureSource, readonly string[]]> = [
  ['stage0', STAGE0_REPRODUCTIONS],
  ['ledger-d8-d10', LEDGER_D8_D10],
  ['lina-probes', LINA_PROBES],
  ['thurgood-probes', THURGOOD_PROBES],
];

/** The matcher's own normalization, as a comparable string. */
export function normalizeForFlag(phrase: string): string {
  return tokenizeForMatch(phrase).join(' ');
}

/** Sources whose normalized entries string-equal the normalized phrase (empty = not pre-exposed). */
export function preExposureSources(phrase: string): PreExposureSource[] {
  const n = normalizeForFlag(phrase);
  return SOURCES.filter(([, list]) => list.some(q => normalizeForFlag(q) === n)).map(([s]) => s);
}
