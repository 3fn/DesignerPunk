/**
 * normalize.test.ts — the four-rule normalization + the checkbox mask
 * (Spec 127, design C1; Reqs 2.5.1, 2.3.2). Property-style cases incl. pipes,
 * `<br>`, NBSP, glyph passthrough (design § Testing Strategy).
 */

import { normalizeCell, maskCheckboxes } from '../normalize';

describe('normalizeCell — the four rules, in order', () => {
  test('(i) unescapes table-pipe escapes', () => {
    expect(normalizeCell('a \\| b')).toBe('a | b');
    expect(normalizeCell('\\|start and end\\|')).toBe('|start and end|');
  });

  test('(ii) <br> tags become a single space', () => {
    expect(normalizeCell('line one<br>line two')).toBe('line one line two');
    expect(normalizeCell('line one<br/>line two')).toBe('line one line two');
    expect(normalizeCell('line one<br />line two')).toBe('line one line two');
    expect(normalizeCell('line one<BR>line two')).toBe('line one line two');
  });

  test('(iii) collapses Unicode whitespace runs — line breaks, NBSP, thin space, narrow NBSP', () => {
    expect(normalizeCell('a\nb')).toBe('a b');
    expect(normalizeCell('a\r\n  b')).toBe('a b');
    expect(normalizeCell('a b')).toBe('a b'); // NBSP
    expect(normalizeCell('a b')).toBe('a b'); // thin space
    expect(normalizeCell('a b')).toBe('a b'); // narrow NBSP
    expect(normalizeCell('a \t  b')).toBe('a b');
    expect(normalizeCell('  padded  ')).toBe('padded');
  });

  test("(iii) strips zero-width characters and BOM (rule (iii)'s bounded scope)", () => {
    expect(normalizeCell('a​b')).toBe('ab'); // ZWSP
    expect(normalizeCell('a‌b')).toBe('ab'); // ZWNJ
    expect(normalizeCell('a‍b')).toBe('ab'); // ZWJ
    expect(normalizeCell('﻿a b')).toBe('a b'); // BOM
  });

  test('(iv) NOTHING ELSE — bold, backticks, and visible glyphs pass through untouched', () => {
    expect(normalizeCell('**bold** and `code`')).toBe('**bold** and `code`');
    expect(normalizeCell('CSS → Swift, Δ=0, x₂')).toBe('CSS → Swift, Δ=0, x₂');
    expect(normalizeCell('Web')).not.toBe(normalizeCell('web')); // no case folding
    expect(normalizeCell('a — b')).toBe('a — b'); // no punctuation normalization
  });

  test('a wrapped-line reflow and its single-line form normalize equal', () => {
    const wrapped = 'The checker fails loudly\n  when a block is missing';
    const single = 'The checker fails loudly when a block is missing';
    expect(normalizeCell(wrapped)).toBe(normalizeCell(single));
  });

  test('a real word change survives normalization (the predicate still bites)', () => {
    expect(normalizeCell('all platforms verified')).not.toBe(
      normalizeCell('web platform verified')
    );
  });
});

describe('maskCheckboxes — the one named mask beyond the four rules', () => {
  test('masks [x]/[X]/[ ] at checkbox position to [·]', () => {
    expect(maskCheckboxes('- [x] 1. Done task')).toBe('- [·] 1. Done task');
    expect(maskCheckboxes('- [X] 1. Done task')).toBe('- [·] 1. Done task');
    expect(maskCheckboxes('- [ ] 2. Open task')).toBe('- [·] 2. Open task');
    expect(maskCheckboxes('  - [x] 1.1 Indented subtask')).toBe('  - [·] 1.1 Indented subtask');
  });

  test('tick-only difference vanishes under the mask (immaterial by construction)', () => {
    expect(maskCheckboxes('- [ ] 3. Build the thing')).toBe(
      maskCheckboxes('- [x] 3. Build the thing')
    );
  });

  test('does not touch bracket text outside checkbox position', () => {
    expect(maskCheckboxes('see the [x] marker mid-line')).toBe('see the [x] marker mid-line');
  });
});
