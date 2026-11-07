/**
 * @category evergreen
 * @purpose The scaffolded dark-override file's header and its list match the token index's colour
 *          semantics (Spec 129 Task 11.1; design § 16): the file `init` copies names every
 *          `category: color` semantic, and its header states that count.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const root = path.resolve(__dirname, '../../..');
const file = fs.readFileSync(path.join(root, 'src/tokens/themes/dark/SemanticOverrides.ts'), 'utf8');
const index = yaml.load(fs.readFileSync(path.join(root, 'token-index/semantics.yaml'), 'utf8')) as {
  tokens: Record<string, { category?: string }>;
};
const colours = Object.keys(index.tokens).filter(k => index.tokens[k].category === 'color').sort();

/** Names the file lists, as commented entries (`// name: {…}`) or live keys (`'name': {…}`). */
const listed = (): string[] => {
  const names = new Set<string>();
  for (const m of file.matchAll(/^\/\/\s+((?:color|glow)\.[\w.]+):/gm)) names.add(m[1]);
  for (const m of file.matchAll(/^\s+'((?:color|glow)\.[\w.]+)':/gm)) names.add(m[1]);
  return [...names].sort();
};

describe('the scaffolded dark-override file', () => {
  it('lists exactly the index\'s colour semantics', () => {
    expect(colours.length).toBeGreaterThan(50);
    expect(listed()).toEqual(colours);
  });

  it('states that count in its header', () => {
    expect(file).toContain(`all ${colours.length} semantic color tokens`);
  });
});
