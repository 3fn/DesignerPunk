/**
 * Versioned stop-word module — unit tests (Spec 121 Task 5.1)
 *
 * Pins the legible-knob behavior: the list is versioned, frozen, and filters the
 * salient-token set (the coverage denominator) predictably.
 */

import {
  STOP_WORD_LIST_VERSION,
  STOP_WORDS,
  isStopWord,
  filterSalientTokens,
} from '../stop-words';

describe('versioned stop-word module', () => {
  it('exposes a numeric version constant (the auditable knob)', () => {
    expect(typeof STOP_WORD_LIST_VERSION).toBe('number');
    expect(STOP_WORD_LIST_VERSION).toBeGreaterThanOrEqual(1);
  });

  it('is frozen so a consumer cannot silently mutate the shared vocabulary', () => {
    expect(Object.isFrozen(STOP_WORDS)).toBe(true);
  });

  it('isStopWord identifies closed-class function words', () => {
    expect(isStopWord('the')).toBe(true);
    expect(isStopWord('with')).toBe(true);
    expect(isStopWord('avatar')).toBe(false);
    expect(isStopWord('ears')).toBe(false);
  });

  it('filterSalientTokens drops stop words + empties (the coverage denominator)', () => {
    const salient = filterSalientTokens(['the', 'spec', 'planning', '', 'of']);
    expect(salient).toEqual(['spec', 'planning']);
  });

  it('a stop-word-only token list reduces to zero salient tokens (→ none upstream)', () => {
    expect(filterSalientTokens(['the', 'and', 'of', 'with'])).toEqual([]);
  });
});
