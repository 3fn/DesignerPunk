/**
 * Font family stacks for the native token files (Spec 129 design §§ 5 and 7).
 *
 * A font-family primitive is a CSS stack: `Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI",
 * Roboto, sans-serif`. Written as one string literal it has unescaped quotes, and neither platform
 * resolves a stack, so each platform takes the part of it that platform can use:
 *
 *   iOS     `String?`: the first entry, unquoted; `nil` when that entry is a generic or system
 *           keyword, because `Font.custom("", …)` does not give the system font (design § 7).
 *   Android `FontFamily`: the stack's generic family (`sans-serif` → `FontFamily.SansSerif`).
 *           A named brand font is not loadable from a name on Android, so it is left in a comment.
 */

/** CSS generic families, and what Compose's `FontFamily` calls them. */
const ANDROID_GENERIC: Record<string, 'SansSerif' | 'Serif' | 'Monospace' | 'Cursive'> = {
  'sans-serif': 'SansSerif',
  serif: 'Serif',
  monospace: 'Monospace',
  cursive: 'Cursive',
};

/**
 * Entries that name the platform's own UI font rather than a font a consumer can load by name.
 * On Apple platforms `-apple-system` and `BlinkMacSystemFont` are the web's spelling of the system
 * font, and `Font.custom` cannot resolve them.
 */
const SYSTEM_KEYWORDS = new Set([
  'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'ui-rounded',
  '-apple-system', 'blinkmacsystemfont',
  ...Object.keys(ANDROID_GENERIC),
]);

/** Split a stack at top-level commas and strip one level of quotes from each entry. */
export function parseFontStack(stack: string): string[] {
  const entries: string[] = [];
  let current = '';
  let quote: string | null = null;
  for (const ch of stack) {
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === ',') {
      entries.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  entries.push(current.trim());
  return entries.filter(e => e !== '');
}

/** The first entry of the stack, unquoted, or `null` when it is a generic or system keyword. */
export function iosFontFamilyName(stack: string): string | null {
  const first = parseFontStack(stack)[0];
  if (first === undefined) return null;
  return SYSTEM_KEYWORDS.has(first.toLowerCase()) ? null : first;
}

/** The Compose `FontFamily` member the stack's generic family maps to; `Default` when it names none. */
export function androidFontFamilyMember(stack: string): 'SansSerif' | 'Serif' | 'Monospace' | 'Cursive' | 'Default' {
  const entries = parseFontStack(stack).map(e => e.toLowerCase());
  for (const entry of entries) {
    if (ANDROID_GENERIC[entry]) return ANDROID_GENERIC[entry];
  }
  return 'Default';
}

/** A Swift string literal for `value`: backslash and quote escaped. */
export function swiftStringLiteral(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}
