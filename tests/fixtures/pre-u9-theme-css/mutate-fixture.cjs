#!/usr/bin/env node
/**
 * Shapes a fresh `init` into the test01-shaped fixture of Spec 129 Task 14, case (a):
 * the consumer holds copies of all three built-in override maps, each different from the
 * package's, and its config registers only `wcag`, in mode `light` (as test01's does).
 *
 *   node mutate-fixture.cjs <consumer dir>
 *
 * What differs in the copies (everything else is as `init` copied it):
 *   - dark:      the three `color.text.*` overrides are removed (test01's `dark` copy lacks four text overrides);
 *   - wcag:      color.action.navigation teal500 -> teal400; color.background.primary.subtle teal100 -> teal200;
 *   - dark-wcag: color.action.navigation teal100 -> teal200; color.background.primary.subtle teal500 -> teal400.
 * The two tokens `wcag` changes are tokens `dark-wcag` also overrides, so the registered `wcag` copy
 * moves only their light half of the WCAG block, and the WCAG dark half stays the package's.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || '');
if (!process.argv[2] || !fs.existsSync(path.join(root, 'src', 'tokens', 'themes'))) {
  console.error('usage: node mutate-fixture.cjs <consumer dir with src/tokens/themes>');
  process.exit(2);
}

function edit(rel, steps) {
  const file = path.join(root, 'src', 'tokens', 'themes', rel, 'SemanticOverrides.ts');
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of steps) {
    if (!text.includes(from)) throw new Error(`${rel}: expected text not found: ${from}`);
    text = text.replace(from, to);
  }
  fs.writeFileSync(file, text);
}

edit('dark', [
  ["  'color.text.default': { primitiveReferences: { value: 'white100' } },\n", ''],
  ["  'color.text.muted': { primitiveReferences: { value: 'white300' } },\n", ''],
  ["  'color.text.subtle': { primitiveReferences: { value: 'white500' } },\n", ''],
]);
edit('wcag', [
  ["'color.action.navigation': { primitiveReferences: { value: 'teal500' } }", "'color.action.navigation': { primitiveReferences: { value: 'teal400' } }"],
  ["'color.background.primary.subtle': { primitiveReferences: { value: 'teal100' } }", "'color.background.primary.subtle': { primitiveReferences: { value: 'teal200' } }"],
]);
edit('dark-wcag', [
  ["'color.action.navigation': { primitiveReferences: { value: 'teal100' } }", "'color.action.navigation': { primitiveReferences: { value: 'teal200' } }"],
  ["'color.background.primary.subtle': { primitiveReferences: { value: 'teal500' } }", "'color.background.primary.subtle': { primitiveReferences: { value: 'teal400' } }"],
]);

fs.writeFileSync(path.join(root, 'designerpunk.config.ts'), [
  "import { defineConfig } from '@3fn/core/config';",
  "import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';",
  '',
  'export default defineConfig({',
  "  name: 'Probe',",
  "  abbreviation: 'PR',",
  "  tokenSource: './src/tokens',",
  "  componentTokens: ['./src/components', './src/tokens/component'],",
  "  themes: [",
  "    { name: 'wcag', mode: 'light', overrides: wcagSemanticOverrides },",
  '  ],',
  "  output: './dist/tokens',",
  '});',
  '',
].join('\n'));
