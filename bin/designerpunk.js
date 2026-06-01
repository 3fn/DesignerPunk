#!/usr/bin/env node
/**
 * DesignerPunk CLI — bin entry point
 *
 * Thin wrapper that registers tsx for TypeScript imports, then loads
 * the CLI source. The pipeline, generators, config, and MCP servers
 * are all TypeScript — tsx enables the entire import chain.
 *
 * This file is plain JS so it can be the bin entry point without
 * requiring a TypeScript loader to already be registered.
 *
 * @see .kiro/issues/2026-04-08-cli-module-resolution.md
 */

require('tsx/cjs/api').register();
require('../src/cli/designerpunk.ts');
