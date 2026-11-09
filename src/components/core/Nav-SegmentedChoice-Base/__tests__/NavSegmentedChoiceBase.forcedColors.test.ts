/**
 * Forced-colors pin for Nav-SegmentedChoice-Base (drawn-control record W1 extension).
 * CSS-text presence only: jsdom cannot evaluate media queries, so visibility is
 * verified in a browser (see .kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md).
 */
import * as fs from 'fs';
import * as path from 'path';

const css = fs.readFileSync(
  path.resolve(__dirname, '../platforms/web/NavSegmentedChoiceBase.styles.css'),
  'utf8'
);
const block = css.slice(css.indexOf('@media (forced-colors: active)'));

describe('Nav-SegmentedChoice-Base forced-colors', () => {
  it('declares a forced-colors block', () => {
    expect(css).toContain('@media (forced-colors: active)');
  });

  it('draws the selected indicator with a Highlight border and no shadow', () => {
    expect(block).toMatch(/\.segmented-choice__indicator\s*\{[^}]*border:[^;]*solid Highlight/);
    expect(block).toMatch(/\.segmented-choice__indicator\s*\{[^}]*box-shadow:\s*none/);
  });

  it('keeps a visible focus ring in ButtonText', () => {
    expect(block).toMatch(/\.segmented-choice__segment:focus-visible\s*\{[^}]*outline:[^;]*ButtonText/);
  });

  it('does not use forced-color-adjust (system colours are honoured as authored)', () => {
    expect(block).not.toContain('forced-color-adjust');
  });
});
