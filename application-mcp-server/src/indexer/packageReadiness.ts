/**
 * Recorded readiness for the components the package ships (release-3 ruling item 5, 2026-10-13).
 *
 * Readiness is derived from the files in a component's directory (Spec 086 Decision 4): a
 * platform implementation file, its tests, `types.ts`, plus the schema's `reviewed` flags. The
 * published package ships each component's schema, contracts and meta, but not its web source,
 * `types.ts` or any test (`package.json` `files`). So in a consumer the same file scan read every
 * DesignerPunk component as web `not-started` and native `scaffold`, whatever its real state
 * (#312 finding 8; `.kiro/issues/2026-10-12-consumer-birth-friction-for-123-u3.md` row 8).
 *
 * The fix records what the scan reads in THIS repository, where the files are present, in
 * `packageReadiness.generated.ts`. The record is a TS module, so the Application MCP bundle
 * carries it, and the indexer serves it for a component it loads from the installed package
 * (a path under `node_modules/`). A component in the consumer's own tree is still derived from
 * its own files. `PackageReadiness.test.ts` fails when the record differs from a fresh scan;
 * regenerate with `UPDATE_PACKAGE_READINESS=1 npx jest --config application-mcp-server/jest.config.js PackageReadiness`.
 */

import type { PlatformReadiness } from '../models';
import { PACKAGE_READINESS } from './packageReadiness.generated';

/** The recorded readiness for a shipped component, by declared name; a copy, or null if unrecorded. */
export function recordedPackageReadiness(name: string): PlatformReadiness | null {
  const r = PACKAGE_READINESS[name];
  return r ? (JSON.parse(JSON.stringify(r)) as PlatformReadiness) : null;
}

/** The text of `packageReadiness.generated.ts` for a record (sorted keys, so a regeneration is stable). */
export function renderPackageReadinessModule(record: Record<string, PlatformReadiness>): string {
  const sorted: Record<string, PlatformReadiness> = {};
  for (const name of Object.keys(record).sort()) sorted[name] = record[name];
  return (
    `// GENERATED — do not hand-edit. Source: a readiness scan of src/components/core in this repo.\n` +
    `// Regenerate: UPDATE_PACKAGE_READINESS=1 npx jest --config application-mcp-server/jest.config.js PackageReadiness\n` +
    `// Why it exists: packageReadiness.ts.\n\n` +
    `import type { PlatformReadiness } from '../models';\n\n` +
    `export const PACKAGE_READINESS: Record<string, PlatformReadiness> = ${JSON.stringify(sorted, null, 2)};\n`
  );
}
