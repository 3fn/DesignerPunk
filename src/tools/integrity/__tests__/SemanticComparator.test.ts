import { SemanticComparator } from '../SemanticComparator';
import { ArtifactRef } from '../types';

const yamlArtifact = (path = 'token-index/primitives.yaml'): ArtifactRef => ({
  path,
  kind: 'yaml',
  optional: false,
});

describe('SemanticComparator', () => {
  const cmp = new SemanticComparator();

  it('reports no divergence for deeply equal structures (key order independent)', () => {
    const a = { tokens: { space100: { family: 'spacing', value: 8 } } };
    const b = { tokens: { space100: { value: 8, family: 'spacing' } } }; // reordered keys
    expect(cmp.compare(yamlArtifact(), a, b)).toEqual([]);
  });

  it('reports a differing leaf with a precise locator', () => {
    const a = { tokens: { space100: { value: 8 } } };
    const b = { tokens: { space100: { value: 9 } } };
    const divs = cmp.compare(yamlArtifact(), a, b);
    expect(divs).toHaveLength(1);
    expect(divs[0].locator).toBe('tokens.space100.value');
    expect(divs[0].committedValue).toBe(8);
    expect(divs[0].freshValue).toBe(9);
  });

  it('reports a missing token subtree as a single component-presence divergence (R4 drift)', () => {
    const artifact = yamlArtifact('token-index/components.yaml');
    const a = { tokens: { 'buttonicon.size.small': { component: 'ButtonIcon' } } };
    const b = { tokens: {} }; // fresh emptied
    const divs = cmp.compare(artifact, a, b);
    expect(divs).toHaveLength(1);
    expect(divs[0].locator).toBe('tokens.buttonicon.size.small');
    expect(divs[0].freshValue).toBeUndefined();
    expect(divs[0].dimension).toBe('component-presence');
  });

  it('tags an rgba→oklch color change as color-format (Finding 1)', () => {
    const a = { tokens: { gray100: { family: 'color', value: { light: { base: 'rgba(178, 188, 196, 1)' } } } } };
    const b = { tokens: { gray100: { family: 'color', value: { light: { base: 'oklch(0.78 0.02 260)' } } } } };
    const divs = cmp.compare(yamlArtifact(), a, b);
    expect(divs).toHaveLength(1);
    expect(divs[0].locator).toBe('tokens.gray100.value.light.base');
    expect(divs[0].dimension).toBe('color-format');
  });

  it('produces a stable, manifest-matchable id from path and locator', () => {
    const a = { tokens: { x: { value: 1 } } };
    const b = { tokens: { x: { value: 2 } } };
    const divs = cmp.compare(yamlArtifact('token-index/primitives.yaml'), a, b);
    expect(divs[0].id).toBe('token-index/primitives.yaml#tokens.x.value');
  });

  it('does a positional line diff for text artifacts', () => {
    const css: ArtifactRef = { path: 'dist/DesignTokens.web.css', kind: 'css', optional: false };
    const divs = cmp.compare(css, ':root {\n  --space-100: 8px;\n}', ':root {\n  --space-100: 9px;\n}');
    expect(divs).toHaveLength(1);
    expect(divs[0].locator).toBe('line 2');
  });
});
