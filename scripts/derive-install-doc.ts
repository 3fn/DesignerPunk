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
 *   3. the region, verbatim, without its two region markers and without its
 *      limitation markers.
 *
 * Limitation markers (Spec 129 Task 7, Req 15.2): a sentence in the region that
 * a Spec 129 row fixes carries ` <!-- limitation: .kiro/issues/<file>.md -->`
 * right after it, naming the record whose archival makes the sentence false. A
 * marker is maintenance metadata that points at a path a consumer cannot open,
 * so the derivation strips it (the space before it too), and
 * `checkLimitationMarkers` fails a marked record that is under `archive/` or
 * missing while its sentence remains.
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

/** A well-formed limitation marker, with the one space that precedes it. Group 1 is the record's repo-relative path. */
const LIMITATION_MARKER = / <!-- limitation: (\.kiro\/issues\/[^\s/]+\.md) -->/g;
/** Anything that opens a limitation marker, well-formed or not (the leak test). */
export const LIMITATION_OPENER = '<!-- limitation:';

/** The region with every well-formed limitation marker (and the space before it) removed. */
export function stripLimitationMarkers(region: string): string {
  return region.replace(LIMITATION_MARKER, '');
}

/** The records the region's limitation markers name, in order, with the 1-based line (within the region) of each. */
export function limitationMarkers(region: string): { record: string; line: number }[] {
  return region.split('\n').flatMap((text, i) => Array.from(text.matchAll(LIMITATION_MARKER), (m) => ({ record: m[1], line: i + 1 })));
}

/**
 * Problems with the guide's limitation markers, as messages; an empty list is a pass. `root` holds
 * `.kiro/issues/` (the repository root, or a fixture tree). A marked record must be at the issues
 * root: one under `archive/` or absent means its sentence is false (or its marker is wrong) and the
 * sentence still stands. A marker that is not well-formed, or sits outside the install region, is a
 * problem too, so that none reaches a reader.
 */
export function checkLimitationMarkers(guide: string, root: string): string[] {
  const problems: string[] = [];
  const region = extractRegion(guide);
  const wellFormed = limitationMarkers(region);
  const openers = region.split(LIMITATION_OPENER).length - 1;
  if (openers !== wellFormed.length) {
    problems.push(`${openers - wellFormed.length} limitation marker(s) in the install region are not of the form " <!-- limitation: .kiro/issues/<file>.md -->"`);
  }
  const outside = guide.split(LIMITATION_OPENER).length - 1 - openers;
  if (outside > 0) problems.push(`${outside} limitation marker(s) sit outside the install region, where they have no effect`);
  for (const { record, line } of wellFormed) {
    const atRoot = path.join(root, record);
    const archived = path.join(root, path.dirname(record), 'archive', path.basename(record));
    if (fs.existsSync(atRoot)) continue;
    problems.push(
      fs.existsSync(archived)
        ? `region line ${line}: ${record} is under archive/ and its sentence remains`
        : `region line ${line}: ${record} is missing and its sentence remains`,
    );
  }
  return problems;
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
    stripLimitationMarkers(extractRegion(guide)),
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
