/**
 * Term normalization — stop words + plural folding (defect record 2026-10-07 items 1–2).
 * @see ../termNormalization.ts
 */

import {
  COMPONENT_STOP_WORDS,
  COMPONENT_STOP_WORD_LIST_VERSION,
  REVIEWED_DOCS_STOP_WORD_LIST_VERSION,
  foldPlural,
  normalizeTerms,
} from '../termNormalization';
import { tokenizeForMatch, tokenizeString, splitConceptKey } from '../ComponentIndexer';

/** Shape-only view of the docs module — no logic, avoids a typed cross-sub-package import. */
interface DocsStopWordsModule {
  STOP_WORD_LIST_VERSION: number;
}

/**
 * The REAL docs module, loaded from its TS source (ts-jest transpiles outside this package's
 * rootDir). An untyped `require`, not an `import`: this package's tsconfig compiles `__tests__`.
 */
function loadDocsStopWords(): DocsStopWordsModule {
  return require('../../../../mcp-server/src/query/stop-words') as DocsStopWordsModule;
}

describe('components stop-word list', () => {
  it('is versioned', () => {
    expect(COMPONENT_STOP_WORD_LIST_VERSION).toBe(1);
  });

  it('REVIEW PIN: the last docs version reviewed here equals the docs STOP_WORD_LIST_VERSION', () => {
    // SEEDED FORK (Peter, 2026-10-13): the lists are NOT asserted equal — a docs removal or
    // addition is not drift. A docs version bump fails here until this side reviews the change
    // and moves REVIEWED_DOCS_STOP_WORD_LIST_VERSION, whether or not the change is taken
    // (see the termNormalization.ts header).
    expect(REVIEWED_DOCS_STOP_WORD_LIST_VERSION).toBe(loadDocsStopWords().STOP_WORD_LIST_VERSION);
  });

  it('covers the function words named in the defect record reproductions', () => {
    for (const w of ['a', 'to', 'on', 'or', 'off', 'with', 'for', 'between', 'while', 'through']) {
      expect(COMPONENT_STOP_WORDS.has(w)).toBe(true);
    }
  });

  it('does NOT treat spatial prepositions as stop words (they carry layout meaning in UI)', () => {
    for (const w of ['above', 'below', 'over', 'under', 'inside', 'outside', 'behind', 'near', 'bottom', 'top']) {
      expect(COMPONENT_STOP_WORDS.has(w)).toBe(false);
    }
  });
});

describe('foldPlural (conservative suffix rule, not a stemmer)', () => {
  it.each([
    ['tabs', 'tab'],
    ['errors', 'error'],
    ['steps', 'step'],
    ['sections', 'section'],
    ['settings', 'setting'],
    ['menus', 'menu'],
    ['entries', 'entry'],
    ['categories', 'category'],
    ['switches', 'switch'],
    ['checkboxes', 'checkbox'],
    ['classes', 'class'],
    ['sizes', 'size'],
    ['badges', 'badge'],
  ])('%s → %s', (input, expected) => {
    expect(foldPlural(input)).toBe(expected);
  });

  it.each([
    'status', 'focus', 'radius', 'canvas', 'alias', 'news', 'series', 'progress', 'class',
    'axis', 'bus', 'ios', 'tab', 'navigation', 'selection', 'validation', 'container',
  ])('leaves %s unchanged', (word) => {
    expect(foldPlural(word)).toBe(word);
  });
});

describe('normalizeTerms / tokenizeForMatch', () => {
  it('drops stop words and folds plurals', () => {
    expect(normalizeTerms(['a', 'toast', 'for', 'errors'])).toEqual(['toast', 'error']);
  });

  it('an all-stop-word input normalizes to nothing', () => {
    expect(tokenizeForMatch('to a on or off')).toEqual([]);
  });

  it('tokenizeForMatch = tokenizeString + normalization; tokenizeString stays raw', () => {
    expect(tokenizeString('Switch to turn a setting on or off')).toEqual(
      ['switch', 'to', 'turn', 'a', 'setting', 'on', 'or', 'off'],
    );
    expect(tokenizeForMatch('Switch to turn a setting on or off')).toEqual(['switch', 'turn', 'setting']);
  });

  it('component names tokenize the same way on both sides (Nav-TabBar-Base ↔ "tabs")', () => {
    expect(tokenizeForMatch('Nav-TabBar-Base')).toContain('tab');
    expect(tokenizeForMatch('tabs')).toEqual(['tab']);
  });
});

describe('splitConceptKey', () => {
  it('splits {category}_{concept} at the first underscore', () => {
    expect(splitConceptKey('validation_form_integration')).toEqual({ prefix: 'validation', suffix: 'form_integration' });
    expect(splitConceptKey('interaction_focusable')).toEqual({ prefix: 'interaction', suffix: 'focusable' });
  });

  it('a key without an underscore has no prefix', () => {
    expect(splitConceptKey('focusable')).toEqual({ prefix: '', suffix: 'focusable' });
  });
});
