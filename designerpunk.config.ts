/**
 * DesignerPunk Pipeline Configuration
 *
 * Default configuration for the DesignerPunk repo itself.
 * Serves as both the working config and a reference example for product repos.
 *
 * Product repos create their own `designerpunk.config.ts` with:
 * - Custom name and abbreviation for generated type names
 * - Theme registrations with imported SemanticOverrides
 * - Component token directories
 * - Output directory
 *
 * @see docs/roadmap/integration-guide-draft.md
 */

import { defineConfig } from './src/config/defineConfig';

export default defineConfig({
  name: 'DesignerPunk',
  abbreviation: 'DP',
  themes: [],
  componentTokens: [
    './src/components/core',
    './src/tokens/component',
  ],
  output: './dist',
});
