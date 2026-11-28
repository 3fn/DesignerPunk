/**
 * Build provenance — the contract-bound twin guard.
 *
 * This server's `BuildProvenance.ts` and the docs server's
 * (`mcp-server/src/build-provenance/BuildProvenance.ts`) are two copies of one contract
 * (.kiro/issues/2026-11-27-mcp-build-provenance-contract.md § 6; a member of the shared-code
 * class, .kiro/issues/2026-10-13-mcp-shared-code-class-charter.md § 2). The health walk reads
 * both surfaces by these strings, so a drift in one would be a silent miss.
 *
 * Pinned here: the two warning prefixes, the record's file name and schema, and the warning
 * behaviour of the four states. Not pinned: the package name (it differs by design) and the
 * source walk and hash (each server compares only with its own record).
 *
 * A guard, not a consumer (charter § 8): the docs module is loaded only in this test.
 */

import * as path from 'path';
import {
  BUILD_INFO_FILENAME,
  BUILD_INFO_SCHEMA,
  STALE_WARNING_PREFIX,
  UNRECORDED_WARNING_PREFIX,
  provenanceWarning,
} from '../BuildProvenance';
import { BuildProvenanceReport } from '../../models';

/** Shape-only view of the docs module — no logic, avoids a typed cross-sub-package import. */
interface DocsBuildProvenanceModule {
  BUILD_INFO_FILENAME: string;
  BUILD_INFO_SCHEMA: number;
  STALE_WARNING_PREFIX: string;
  UNRECORDED_WARNING_PREFIX: string;
  provenanceWarning(report: BuildProvenanceReport): string | null;
}

/**
 * The REAL docs module, loaded from its TS source (ts-jest transpiles outside this package's
 * rootDir). An untyped `require`, not an `import`: this package's tsconfig compiles `__tests__`,
 * and a static import would pull a file outside `rootDir` into that program (the token-atoms
 * twin's pattern, `src/indexer/__tests__/tokenAtoms.test.ts`).
 */
function loadDocsBuildProvenance(): DocsBuildProvenanceModule {
  return require('../../../../mcp-server/src/build-provenance/BuildProvenance') as DocsBuildProvenanceModule;
}

describe('BOUND TWIN of mcp-server build-provenance (contract § 6)', () => {
  let docs: DocsBuildProvenanceModule;
  beforeAll(() => {
    docs = loadDocsBuildProvenance();
  });

  it('the warning prefixes, record file name and schema equal the docs copy', () => {
    expect({
      STALE_WARNING_PREFIX,
      UNRECORDED_WARNING_PREFIX,
      BUILD_INFO_FILENAME,
      BUILD_INFO_SCHEMA,
    }).toEqual({
      STALE_WARNING_PREFIX: docs.STALE_WARNING_PREFIX,
      UNRECORDED_WARNING_PREFIX: docs.UNRECORDED_WARNING_PREFIX,
      BUILD_INFO_FILENAME: docs.BUILD_INFO_FILENAME,
      BUILD_INFO_SCHEMA: docs.BUILD_INFO_SCHEMA,
    });
  });

  it.each(['fresh', 'stale', 'unrecorded', 'not-applicable'] as const)(
    'state %s gives the same warning text in both copies',
    (state) => {
      const report: BuildProvenanceReport = {
        state,
        reason: 'the same reason',
        distDir: path.join('/tmp', 'some-package', 'dist'),
        recorded: { sourceHash: 'sha256:a', sourceFiles: 1, sourceCommit: '0123456789abcdef', sourceDirty: false, builtAt: 'T' },
        current: { sourceHash: 'sha256:b', sourceFiles: 1 },
      };
      expect(provenanceWarning(report)).toBe(docs.provenanceWarning(report));
    },
  );
});
