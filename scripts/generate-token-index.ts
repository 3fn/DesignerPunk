#!/usr/bin/env ts-node
/**
 * Token Index Generator (standalone script)
 *
 * Thin wrapper around src/generators/generateTokenIndex.ts.
 * Outputs to `token-index/` at the repo root.
 *
 * @see Spec 096 design.md
 */

import * as path from 'path';
import { generateTokenIndex } from '../src/generators/generateTokenIndex';

const OUTPUT_DIR = path.resolve(__dirname, '..', 'token-index');

generateTokenIndex(OUTPUT_DIR);
