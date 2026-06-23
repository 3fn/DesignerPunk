import { Normalizer } from '../Normalizer';

describe('Normalizer — semantic equality (Design D1, R2 AC2)', () => {
  const n = new Normalizer();

  describe('the core requirement: timestamp ignored, value not', () => {
    it('ignores a changed volatile timestamp field in structured content', () => {
      const a = n.normalize('lastIndexTime: 2026-06-13T10:00:00.000Z\ntokens:\n  space100:\n    value: 8\n', 'yaml');
      const b = n.normalize('lastIndexTime: 2026-06-13T23:59:59.000Z\ntokens:\n  space100:\n    value: 8\n', 'yaml');
      expect(a).toEqual(b);
    });

    it('does NOT ignore a changed token value', () => {
      const a = n.normalize('tokens:\n  space100:\n    value: 8\n', 'yaml');
      const b = n.normalize('tokens:\n  space100:\n    value: 9\n', 'yaml');
      expect(a).not.toEqual(b);
    });

    it('ignores a changed generated-header timestamp line in text artifacts', () => {
      const a = n.normalize('/* Generated 2026-06-13T10:00:00Z */\n:root { --space-100: 8px; }\n', 'css');
      const b = n.normalize('/* Generated 2026-06-13T23:59:59Z */\n:root { --space-100: 8px; }\n', 'css');
      expect(a).toEqual(b);
    });

    it('does NOT ignore a changed value in text artifacts', () => {
      const a = n.normalize('/* Generated 2026-06-13T10:00:00Z */\n:root { --space-100: 8px; }\n', 'css');
      const b = n.normalize('/* Generated 2026-06-13T10:00:00Z */\n:root { --space-100: 9px; }\n', 'css');
      expect(a).not.toEqual(b);
    });
  });

  describe('structured volatile stripping', () => {
    it('strips volatile keys recursively, regardless of value type', () => {
      const out = n.normalize('tokens:\n  x:\n    value: 1\n    generatedAt: \'2026-06-13T10:00:00Z\'\n', 'yaml') as {
        tokens: { x: unknown };
      };
      expect(out.tokens.x).toEqual({ value: 1 });
    });

    it('strips ISO-datetime-valued string fields under any key name', () => {
      const out = n.normalize("builtOn: '2026-06-13T10:00:00.000Z'\nkeep: hello\n", 'yaml');
      expect(out).toEqual({ keep: 'hello' });
    });

    it('preserves a non-timestamp value that merely contains digits', () => {
      const out = n.normalize('value: 8\nname: space100\n', 'yaml');
      expect(out).toEqual({ value: 8, name: 'space100' });
    });
  });

  describe('JSON parsing', () => {
    it('parses and strips volatile keys from JSON artifacts', () => {
      const out = n.normalize('{"generatedAt":"2026-06-13T10:00:00Z","color":{"$value":"#fff"}}', 'json');
      expect(out).toEqual({ color: { $value: '#fff' } });
    });
  });

  describe('text normalization', () => {
    it('trims trailing whitespace and normalizes CRLF line endings', () => {
      const a = n.normalize(':root {  \r\n  --x: 1;  \r\n}\r\n', 'css');
      const b = n.normalize(':root {\n  --x: 1;\n}\n', 'css');
      expect(a).toEqual(b);
    });
  });
});
