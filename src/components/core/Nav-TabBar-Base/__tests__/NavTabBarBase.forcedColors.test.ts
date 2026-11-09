/**
 * Forced-colors pin for Nav-TabBar-Base (drawn-control record W1 extension).
 * CSS-text presence only: jsdom cannot evaluate media queries, so visibility is
 * verified in a browser (see .kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md).
 */
import * as fs from 'fs';
import * as path from 'path';

const css = fs.readFileSync(
  path.resolve(__dirname, '../platforms/web/NavTabBarBase.styles.css'),
  'utf8'
);
const block = css.slice(css.indexOf('@media (forced-colors: active)'));

describe('Nav-TabBar-Base forced-colors', () => {
  it('declares a forced-colors block', () => {
    expect(css).toContain('@media (forced-colors: active)');
  });

  it('draws the active dot with a Highlight border and fill', () => {
    expect(block).toMatch(/\.tab-bar__dot\s*\{[^}]*border:[^;]*solid Highlight/);
    expect(block).toMatch(/\.tab-bar__dot\s*\{[^}]*background-color:\s*Highlight/);
  });

  it('drops the decorative glow gradient', () => {
    expect(block).toMatch(/\.tab-item\[aria-selected="true"\]::before\s*\{[^}]*background:\s*none/);
  });

  it('keeps a visible focus ring in ButtonText', () => {
    expect(block).toMatch(/\.tab-item:focus-visible\s*\{[^}]*outline:[^;]*ButtonText/);
  });

  it('does not use forced-color-adjust (system colours are honoured as authored)', () => {
    expect(block).not.toContain('forced-color-adjust');
  });
});
