#!/usr/bin/env node
/**
 * DesignerPunk CLI — bin entry point
 *
 * Registers tsx for TypeScript imports, then invokes the CLI's __main().
 *
 * Why __main() instead of relying on module-level execution:
 * Node 22 sets require.main to THIS file (bin/designerpunk.js), not the
 * CLI module. A `require.main === module` guard in designerpunk.ts would
 * prevent execution in consumer context (npx from node_modules).
 * __main() bypasses this — the bin entry explicitly triggers the CLI.
 *
 * @see .kiro/issues/2026-06-10-cli-bundle-remove-wildcard-export.md
 */

require('tsx/cjs/api').register();
require('../src/cli/designerpunk.ts').__main();
