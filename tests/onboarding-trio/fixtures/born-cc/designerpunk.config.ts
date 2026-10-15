import { defineConfig } from '@3fn/core/config';
import { darkSemanticOverrides } from './src/tokens/themes/dark/SemanticOverrides.ts';
import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';

export default defineConfig({
  name: 'Order Status',
  abbreviation: 'OST',
  tokenSource: './src/tokens',
  componentTokens: ['./src/components', './src/tokens/component'],
  themes: [
    { name: 'dark', mode: 'dark', overrides: darkSemanticOverrides },
    { name: 'wcag', mode: 'light', overrides: wcagSemanticOverrides },
  ],
  // Kept out of dist/: that is the service's tsc build output and is gitignored,
  // while DesignerPunk's platform output is committed by default.
  output: './design-tokens',
});
