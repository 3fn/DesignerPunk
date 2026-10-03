/**
 * Derive `docs/consumer/INSTALL.md` from the Integration Guide's install region
 * (Spec 123 Task 19.4; design.md C23 erratum, Peter's PR-1).
 *
 * The install doc is the marked region that opens
 * `governance/DesignerPunk-Integration-Guide.md`. `docs/consumer/INSTALL.md`
 * is its **committed** derivation, never written at build time: a build-time
 * write would ship unreviewed bytes through `scripts/release-publish.ts` (Ada,
 * the 2026-10-03 amendment). `scripts/__tests__/install-doc.test.ts` asserts
 * that the committed file equals `deriveInstallDoc(<guide>)` byte for byte.
 *
 * The derived file is:
 *   1. a front-matter block carrying the guide's `path-steps` map (front matter
 *      must open the file to be front matter);
 *   2. a fixed header that cites its source by repo-relative path;
 *   3. the region, verbatim, without its markers.
 *
 * Run: `npx tsx scripts/derive-install-doc.ts` (no package.json script line).
 */

import * as fs from 'fs';
import * as path from 'path';

export const GUIDE_REL = 'governance/DesignerPunk-Integration-Guide.md';
export const INSTALL_REL = 'docs/consumer/INSTALL.md';
export const REGION_BEGIN = '<!-- designerpunk:install-region:begin -->';
export const REGION_END = '<!-- designerpunk:install-region:end -->';

/** The region between the two markers, trimmed of surrounding blank lines. Throws unless each marker occurs exactly once, in order. */
export function extractRegion(guide: string): string {
  const lines = guide.split('\n');
  const begins = lines.flatMap((l, i) => (l === REGION_BEGIN ? [i] : []));
  const ends = lines.flatMap((l, i) => (l === REGION_END ? [i] : []));
  if (begins.length !== 1 || ends.length !== 1) {
    throw new Error(`${GUIDE_REL}: expected exactly one of each region marker, found begin=${begins.length}, end=${ends.length}`);
  }
  if (ends[0] < begins[0]) throw new Error(`${GUIDE_REL}: the region's end marker precedes its begin marker`);
  return lines.slice(begins[0] + 1, ends[0]).join('\n').trim();
}

/** The guide's front-matter `path-steps:` line, verbatim. */
export function pathStepsLine(guide: string): string {
  const lines = guide.split('\n');
  if (lines[0] !== '---') throw new Error(`${GUIDE_REL}: no front matter`);
  const end = lines.indexOf('---', 1);
  const line = lines.slice(1, end).find((l) => l.startsWith('path-steps:'));
  if (!line) throw new Error(`${GUIDE_REL}: front matter has no path-steps`);
  return line;
}

/** The full derived text of `docs/consumer/INSTALL.md`. */
export function deriveInstallDoc(guide: string): string {
  return [
    '---',
    pathStepsLine(guide),
    '---',
    '',
    '# DesignerPunk install guide',
    '',
    `> This file is generated from the install region of \`${GUIDE_REL}\`. Do not edit it: edit the region there, then run \`npx tsx scripts/derive-install-doc.ts\`. A test fails if the two differ.`,
    '',
    extractRegion(guide),
    '',
  ].join('\n');
}

if (require.main === module) {
  const root = path.resolve(__dirname, '..');
  const guide = fs.readFileSync(path.join(root, GUIDE_REL), 'utf8');
  const out = path.join(root, INSTALL_REL);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, deriveInstallDoc(guide));
  console.log(`wrote ${INSTALL_REL} from ${GUIDE_REL}`);
}
