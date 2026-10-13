/**
 * Term normalization — stop words + plural folding (defect record 2026-10-07 items 1–2).
 * @see ../termNormalization.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  COMPONENT_STOP_WORDS,
  COMPONENT_STOP_WORD_LIST_VERSION,
  foldPlural,
  normalizeTerms,
} from '../termNormalization';
import { tokenizeForMatch, tokenizeString, splitConceptKey } from '../ComponentIndexer';

const DOCS_STOP_WORDS_PATH = path.resolve(__dirname, '../../../../mcp-server/src/query/stop-words.ts');

describe('components stop-word list', () => {
  it('is versioned', () => {
    expect(COMPONENT_STOP_WORD_LIST_VERSION).toBe(1);
  });

  it('DRIFT GUARD: contains every word of the docs list it was copied from (mcp-server stop-words.ts)', () => {
    // Copied, not imported (rootDir boundary). If the docs list grows, this fails until the
    // copy is refreshed and COMPONENT_STOP_WORD_LIST_VERSION is bumped.
    const src = fs.readFileSync(DOCS_STOP_WORDS_PATH, 'utf-8');
    const setBody = src.slice(src.indexOf('new Set<string>(['), src.indexOf(']),'));
    const docsWords = Array.from(setBody.matchAll(/'([a-z]+)'/g)).map(m => m[1]);
    expect(docsWords.length).toBeGreaterThan(40);
    for (const w of docsWords) expect(COMPONENT_STOP_WORDS.has(w)).toBe(true);
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
