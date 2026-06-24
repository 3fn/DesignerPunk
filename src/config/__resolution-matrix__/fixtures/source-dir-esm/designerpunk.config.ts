/**
 * Matrix row: source-directory import (ESM-authored).
 *
 * Faithfully reproduces the "source-directory import" failure: an ESM-syntax
 * `.ts` config under a typeless package that imports a DIRECTORY (`./src/config`)
 * with no explicit `/index.ts`. Under Node's strict-ESM resolver this fails with
 * `Directory import ... is not supported`. A TS-aware loader must resolve the
 * directory to its index module.
 *
 * The sentinel (`SENTINEL`) is produced ONLY by the directory's index module,
 * so a positive sentinel assertion proves the directory import actually resolved.
 */
import { makeConfig, SENTINEL } from './src/config';

export default makeConfig({ sentinel: SENTINEL });
