#!/usr/bin/env node
/**
 * DesignerPunk CLI — bin entry point
 *
 * Registers tsx for TypeScript imports, then invokes the CLI's main().
 *
 * @see .kiro/issues/2026-04-08-cli-module-resolution.md
 */

require('tsx/cjs/api').register();
require('../src/cli/designerpunk.ts').__main();
