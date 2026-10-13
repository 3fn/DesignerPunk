#!/usr/bin/env node
/**
 * The audience-banner convention: its membership predicate, its banner template and
 * recogniser, and its presence guard. Spec 123 Task 23 (Req 20; design C28).
 *
 * THE CONVENTION, IN ONE PLACE. A `governance/*.md` doc that carries DesignerPunk's own
 * repo-internal authority opens with an AUDIENCE-FRAMING BANNER: a blockquote that tells a
 * consumer's agent whether it is reading DesignerPunk's worked example or transferable
 * guidance (Req 20.2, 20.7, 20.8). This module is the whole convention:
 *   - {@link matchesPredicate}: WHICH docs need one (the membership predicate, Ada's text);
 *   - {@link renderBanner} / {@link hasBanner}: WHAT a banner is (one template, one symbol,
 *     read by both the 23.2 authoring and the guard);
 *   - {@link auditBanners}: the PRESENCE GUARD, `predicate-match ⇒ banner-present` (Req 20.5).
 * The predicate is the artifact and the set is merely its output (Req 20.3); the number of docs
 * a run reports is illustrative, never a constant of the convention.
 *
 * PREDICATE VERSION 1 (versioned with the banner convention, Req 20.3). Ada's text, byte-exact
 * (feedback/requirements.md R2 B5; requirements.md Req 20.3):
 *
 *     grep -lE "complete-task\.sh|Peter merges|RATIFIED|ballot" governance/*.md
 *
 * It reproduced 18 of 83 `governance/*.md` docs and 0 of 15 `governance/Token-Family-*.md`
 * docs at its adoption. Change any of the four strings, or the scan scope, and the version bumps.
 * Extending the predicate is a version bump under this rule, decided by Ada with a re-measured count.
 *
 * ============================================================================
 * UNDER-INCLUSION LIMIT (Req 20.3 — declared HERE, in the convention's own text, on the pattern
 * of Req 11.3.1: "a zero-hit sweep is evidence about the enumeration, not about the charter").
 *
 * This predicate is a LEXICAL DENY-LIST. A match is evidence about four strings, not about a
 * doc's authority, and the absence of a match is evidence about the same four strings and
 * nothing more. A doc can carry repo-internal authority with NONE of them: a stewardship
 * cadence, `.kiro/specs/**` treated as law, or a claim about the readiness of DesignerPunk's own
 * COMPONENTS. Such a doc ships UNBANNERED, which is the status quo. That is the safe direction
 * for a presence guard: a missed doc stays as it was; an unbannered doc is never certified as
 * bannered.
 *
 * KNOWN UNDER-INCLUSIONS (Req 20.7's reason; Lina A7, feedback/design-outline.md): the docs
 * named in {@link KNOWN_UNDER_INCLUSIONS} read, in a consumer install, as claims about the
 * consumer's own system, and neither matches the predicate. v1 does not extend; extension is a
 * version bump decided by Ada with a re-measured count. Her measurement (v1 adoption): every
 * candidate string that catches the two docs adds at least 5 more docs (readiness emoji: 38;
 * `Production Ready` forms: 32; `Component-Family-*` references: 23), toward the corpus-wide
 * banding Req 20.4 forbids. Whether the two docs are banded OUTSIDE the predicate (declared, and
 * unguarded: a hand-kept list, the drift Req 20.3 exists to prevent) is a fork with Peter and is
 * not decided here.
 *
 * THE GUARD'S CLAIM IS SCOPED TO THE PREDICATE (Req 20.3): it reports "N docs match the
 * predicate; N carry banners" over the scan scope. It never says the corpus is covered, and
 * presence is not correctness, nor readership (Req 20.10).
 * ============================================================================
 *
 * Run it: `npx tsx scripts/audience-banner/predicate.ts` prints the scoped report and exits 1
 * when a matched doc lacks a banner. The test (`__tests__/audience-banner.test.ts`) is the
 * registered guard: `npm run test:scripts`, in the required `lane-functional-root` job.
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// The predicate (Ada's text, byte-exact)
// ============================================================================

export const PREDICATE_VERSION = 1;

/** The scan scope, as the predicate's own glob. */
export const SCAN_SCOPE = 'governance/*.md';

/** The four strings, in Ada's order. Never reword; a change is a version bump. */
export const PREDICATE_STRINGS: readonly string[] = [
  'complete-task\\.sh',
  'Peter merges',
  'RATIFIED',
  'ballot',
];

/** `grep -E`'s pattern, exactly as Req 20.3 prints it. */
export const PREDICATE_ERE = PREDICATE_STRINGS.join('|');

const PREDICATE_RE = new RegExp(PREDICATE_ERE);

/** True iff the doc's text contains any of the four strings (grep -l semantics: any line). */
export function matchesPredicate(text: string): boolean {
  return PREDICATE_RE.test(text);
}

/**
 * Docs known to read as repo-internal claims while matching NONE of the four strings (see the
 * UNDER-INCLUSION LIMIT above). The test asserts each exists and does NOT match: a name that
 * starts matching is stale here and must be removed with the header edited.
 */
export const KNOWN_UNDER_INCLUSIONS: readonly string[] = [
  'governance/Component-Readiness-Status.md',
  'governance/Component-Quick-Reference.md',
];

// ============================================================================
// The banner template and its recogniser (one symbol for authoring and for the guard)
// ============================================================================

/**
 * The label every banner opens with. `governance/release-management-system.md` L11 is the
 * precedent for the LABEL only, not the template: it bolds "DesignerPunk's own" instead of the
 * subject and has no Worked example / Transferable marks (23.2 rewrites it).
 */
export const BANNER_LABEL = '> **Audience framing**:';

/** What a banner says DesignerPunk's own thing is (Req 20.7: components, not only process). */
export const BANNER_SUBJECTS: readonly string[] = ['process', 'components', 'process and components'];

export const WORKED_EXAMPLE_MARK = '**Worked example**:';
export const TRANSFERABLE_MARK = '**Transferable**:';

export interface BannerParts {
  /** One of {@link BANNER_SUBJECTS}. */
  subject: string;
  /** What in this doc is DesignerPunk's worked example (its paths, scripts, roles, components). */
  workedExample: string;
  /** What in this doc a consumer can carry over to their own repo. */
  transferable: string;
}

/**
 * The banner template (Req 20.2, 20.7, 20.8). A single-line blockquote:
 *
 *   > **Audience framing**: this describes **DesignerPunk's own <subject>**, not yours.
 *   **Worked example**: <...> **Transferable**: <...>
 *
 * Rendered on one line; {@link hasBanner} also accepts the same text wrapped over consecutive
 * `>` lines.
 */
export function renderBanner(parts: BannerParts): string {
  if (!BANNER_SUBJECTS.includes(parts.subject)) {
    throw new Error(`renderBanner: subject must be one of ${BANNER_SUBJECTS.join(' | ')}, got "${parts.subject}"`);
  }
  const worked = parts.workedExample.trim();
  const transferable = parts.transferable.trim();
  if (worked === '' || transferable === '') {
    throw new Error('renderBanner: both the worked-example and the transferable sentences are required');
  }
  return `${BANNER_LABEL} this describes **DesignerPunk's own ${parts.subject}**, not yours. ${WORKED_EXAMPLE_MARK} ${worked} ${TRANSFERABLE_MARK} ${transferable}`;
}

/**
 * The lines of a doc's preamble: after any YAML front matter, up to (not including) the first
 * heading below H1. A banner is a reading instruction placed at the top, so a label further
 * down (prose ABOUT banners) must not count.
 */
function preambleLines(text: string): string[] {
  const lines = text.split('\n');
  let i = 0;
  if (lines[0]?.trim() === '---') {
    const end = lines.findIndex((l, idx) => idx > 0 && l.trim() === '---');
    if (end > 0) i = end + 1;
  }
  const out: string[] = [];
  for (; i < lines.length; i += 1) {
    if (/^#{2,}\s/.test(lines[i])) break;
    out.push(lines[i]);
  }
  return out;
}

/**
 * True iff the doc's preamble carries a conforming banner: the label line (and any consecutive
 * `>` lines that continue it) names DesignerPunk's own process / components, and carries a
 * non-empty worked-example part followed by a non-empty transferable part.
 */
export function hasBanner(text: string): boolean {
  const lines = preambleLines(text);
  const start = lines.findIndex((l) => l.startsWith(BANNER_LABEL));
  if (start === -1) return false;
  const block: string[] = [];
  for (let i = start; i < lines.length && lines[i].startsWith('>'); i += 1) {
    block.push(lines[i].replace(/^>\s?/, ''));
  }
  const banner = block.join(' ');
  const subjects = BANNER_SUBJECTS.map((s) => s.replace(/ /g, '\\s+')).join('|');
  if (!new RegExp(`\\*\\*DesignerPunk's own (?:${subjects})\\*\\*`).test(banner)) return false;
  const w = banner.indexOf(WORKED_EXAMPLE_MARK);
  const t = banner.indexOf(TRANSFERABLE_MARK);
  if (w === -1 || t === -1 || t < w) return false;
  const workedText = banner.slice(w + WORKED_EXAMPLE_MARK.length, t).trim();
  const transferableText = banner.slice(t + TRANSFERABLE_MARK.length).trim();
  return workedText !== '' && transferableText !== '';
}

// ============================================================================
// The presence guard: predicate-match ⇒ banner-present, scoped to the predicate
// ============================================================================

/** Repo-relative paths (`governance/<name>.md`) of every doc in the scan scope, sorted. */
export function listGovernanceDocs(repoRoot: string): string[] {
  const dir = path.join(repoRoot, 'governance');
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => `governance/${e.name}`)
    .sort();
}

/** The predicate's output set over the scan scope, sorted. */
export function matchedDocs(repoRoot: string): string[] {
  return listGovernanceDocs(repoRoot).filter((rel) =>
    matchesPredicate(fs.readFileSync(path.join(repoRoot, rel), 'utf8'))
  );
}

export interface BannerAudit {
  /** Docs in the scan scope (the denominator the predicate reads). */
  scanned: number;
  matched: string[];
  carrying: string[];
  /** matched ∖ carrying — the guard's findings. */
  missing: string[];
}

export function auditBanners(repoRoot: string): BannerAudit {
  const matched = matchedDocs(repoRoot);
  const carrying = matched.filter((rel) => hasBanner(fs.readFileSync(path.join(repoRoot, rel), 'utf8')));
  const carrySet = new Set(carrying);
  return {
    scanned: listGovernanceDocs(repoRoot).length,
    matched,
    carrying,
    missing: matched.filter((rel) => !carrySet.has(rel)),
  };
}

/**
 * The guard's report. The FIRST line is the scoped claim: predicate coverage over the scan
 * scope, `N match; N carry`, never a claim about the corpus (Req 20.3). Then every matched doc
 * by path (Lina's fold-back: the list, not only the counts).
 */
export function formatReport(audit: BannerAudit): string[] {
  const carrySet = new Set(audit.carrying);
  return [
    `audience-banner guard — predicate v${PREDICATE_VERSION} coverage over ${SCAN_SCOPE} (${audit.scanned} scanned): ` +
      `${audit.matched.length} match; ${audit.carrying.length} carry`,
    ...audit.matched.map((rel) => `  [${carrySet.has(rel) ? 'carry  ' : 'MISSING'}] ${rel}`),
  ];
}

// CLI: print the report; exit 1 if any matched doc lacks a banner.
if (require.main === module) {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const audit = auditBanners(repoRoot);
  for (const line of formatReport(audit)) console.log(line);
  process.exit(audit.missing.length === 0 ? 0 : 1);
}
