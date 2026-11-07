/**
 * Import lists for the generated Kotlin files (Spec 129 design § 5; row 6).
 *
 * The import list is computed from what the file's text uses: a symbol is imported when the file
 * uses it, and not otherwise. Every import line precedes the first declaration. A file that uses
 * nothing from the table gets no import block.
 */

/** A symbol the generated Kotlin can use, how to find a use of it, and the import it needs. */
const SYMBOLS: ReadonlyArray<{ uses: RegExp; import: string }> = [
  { uses: /\.dp\b/, import: 'androidx.compose.ui.unit.dp' },
  { uses: /\.sp\b/, import: 'androidx.compose.ui.unit.sp' },
  { uses: /\.em\b/, import: 'androidx.compose.ui.unit.em' },
  { uses: /\bColor\(/, import: 'androidx.compose.ui.graphics.Color' },
  { uses: /\bColorSpaces\./, import: 'androidx.compose.ui.graphics.colorspace.ColorSpaces' },
  { uses: /\bFontWeight\(/, import: 'androidx.compose.ui.text.font.FontWeight' },
  { uses: /\bFontFamily\./, import: 'androidx.compose.ui.text.font.FontFamily' },
  { uses: /\bTextStyle\(/, import: 'androidx.compose.ui.text.TextStyle' },
  { uses: /\bCornerSize\(/, import: 'androidx.compose.foundation.shape.CornerSize' },
  { uses: /\bCubicBezierEasing\(/, import: 'androidx.compose.animation.core.CubicBezierEasing' },
];

/** The text with block, doc and line comments removed, so a word in a comment imports nothing. */
function withoutComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
}

/** The sorted import lines (`import a.b.C`) the file's text needs. */
export function computeKotlinImports(source: string): string[] {
  const code = withoutComments(source);
  return SYMBOLS
    .filter(sym => sym.uses.test(code))
    .map(sym => `import ${sym.import}`)
    .sort();
}

/**
 * Insert the computed import block after the `package` line (and one blank line), before the first
 * declaration. Returns the source unchanged when it needs no import or has no `package` line.
 */
export function withKotlinImports(source: string): string {
  const imports = computeKotlinImports(source);
  if (imports.length === 0) return source;
  const lines = source.split('\n');
  const pkg = lines.findIndex(l => /^package\s+\S+/.test(l));
  if (pkg === -1) return source;
  lines.splice(pkg + 1, 0, '', ...imports);
  return lines.join('\n');
}
