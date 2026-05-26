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

// Register component tokens for standalone script (not needed in CLI path — loadComponentTokens handles it)
import '../src/components/core/Button-Icon/buttonIcon.tokens';
import '../src/components/core/Button-VerticalList-Item/Button-VerticalList-Item.tokens';
import '../src/components/core/Avatar-Base/avatar.tokens';
import '../src/components/core/Badge-Label-Base/tokens';
import '../src/tokens/component/progress';

const OUTPUT_DIR = path.resolve(__dirname, '..', 'token-index');

generateTokenIndex(OUTPUT_DIR);
