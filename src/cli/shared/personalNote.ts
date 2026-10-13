/**
 * The personal note: creation, the unfilled/filled detection rule, and the rows the commands print
 * (Spec 123 Task 22.1; design.md C26 and its 2026-10-03 errata; tasks.md Task 22's mechanism-B
 * amendments — PR-4, PR-8, PR-13).
 *
 * MECHANISM B. The note is `.designerpunk/personal-note.local.md`: per person, never committed
 * (Req 18.5). The reference to it is always emitted into the agent layer; what changes is that every
 * command that touches the note CREATES it when it is absent, so an absent note cannot outlast any
 * DesignerPunk command. The file created is the template itself (PR-8: "the doc itself could be the
 * template"), and a note that holds nothing but the template reads as UNFILLED, so agents set it aside.
 *
 * THE DETECTION RULE (one function, no copy of the template at run time, no template version). A note
 * is **unfilled** iff, after removing the MARKED TEMPLATE BLOCK (`<!-- dp:template -->` through
 * `<!-- /dp:template -->`, markers included), every other HTML comment, every Markdown heading line and
 * every bare `TODO` token, only whitespace remains. Markers are matched as whole trimmed lines, the
 * first pair wins, after CRLF normalization; an unmatched marker removes nothing, so the guidance text
 * it leaves behind counts as hers.
 *
 * Nothing in this module writes outside `<root>/.designerpunk/`, and it never overwrites a file.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { BirthState } from './bornRepo';
import { designerpunkDirIgnoreState } from './gitignoreRegion';
import {
  personalNoteCreatedMessage,
  personalNoteNamingMessage,
  personalNoteUnfilledMessage,
  personalNoteUnignoredMessage,
} from './errorCatalog';

/** The note's path relative to the design system's root. */
export const PERSONAL_NOTE_REL = '.designerpunk/personal-note.local.md';

/** The template's source, relative to the package root (design.md C5 erratum, FK-1 (b)). */
export const PERSONAL_NOTE_TEMPLATE_REL = 'src/cli/templates/personal-note.template.md';

export const TEMPLATE_BEGIN = '<!-- dp:template -->';
export const TEMPLATE_END = '<!-- /dp:template -->';

/** Remove the first matched template block (markers included). Unmatched markers remove nothing. Pure. */
function removeTemplateBlock(lines: string[]): string[] {
  const begin = lines.findIndex((l) => l.trim() === TEMPLATE_BEGIN);
  if (begin < 0) return lines;
  const end = lines.findIndex((l, i) => i > begin && l.trim() === TEMPLATE_END);
  if (end < 0) return lines;
  return [...lines.slice(0, begin), ...lines.slice(end + 1)];
}

/**
 * Whether `text` is an UNFILLED note (see the module header for the rule). An empty file is unfilled.
 * Pure: no template copy, no I/O.
 */
export function isNoteUnfilled(text: string): boolean {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const rest = removeTemplateBlock(lines)
    .filter((l) => !/^\s{0,3}#{1,6}(\s|$)/.test(l)) // Markdown heading lines
    .join('\n')
    .replace(/<!--[\s\S]*?-->/g, '') // every other HTML comment (an unmatched marker is one)
    .replace(/(^|\s)TODO(?=\s|$)/g, '$1'); // bare TODO tokens only: `TODO: later` is text
  return rest.trim() === '';
}

export type PersonalNoteStatus =
  /** The note was absent and has been created from the template. */
  | 'created'
  /** The note exists and holds nothing but the template: unfilled. Not overwritten. */
  | 'unfilled'
  /** The note exists and holds her words. Not touched. */
  | 'filled'
  /** The note was absent and `create` was false (a dry run): nothing was written. */
  | 'absent'
  /** The posture gate: not a born repo (the steward checkout, package mode, partial, unborn). Nothing read or written. */
  | 'skipped-posture'
  /** The note was absent and the package carries no template to create it from. Nothing written. */
  | 'template-missing';

/**
 * Create the note when absent; classify it when present. Never overwrites, including an empty or
 * unfilled file (Req 18.3).
 *  - `dsState`: the design system's birth state; the note is created only in a BORN repo.
 *  - `create: false`: report only (`sync --dry-run`) — an absent note stays absent.
 */
export function ensurePersonalNote(opts: { root: string; pkgRoot: string; dsState: BirthState; create?: boolean }): PersonalNoteStatus {
  if (opts.dsState !== 'born') return 'skipped-posture';
  const notePath = path.join(opts.root, PERSONAL_NOTE_REL);
  if (fs.existsSync(notePath)) {
    return isNoteUnfilled(fs.readFileSync(notePath, 'utf-8')) ? 'unfilled' : 'filled';
  }
  if (opts.create === false) return 'absent';
  const templatePath = path.join(opts.pkgRoot, PERSONAL_NOTE_TEMPLATE_REL);
  if (!fs.existsSync(templatePath)) return 'template-missing';
  fs.mkdirSync(path.dirname(notePath), { recursive: true });
  fs.writeFileSync(notePath, fs.readFileSync(templatePath));
  return 'created';
}

/** Who prints what (design.md C26, R2 Leonardo L-RC2): the row a command prints when it CREATES the note. */
export type CreationRow = 'created' | 'created-only' | 'naming' | 'silent';

/**
 * Print the rows for `status`. **No run prints both a creation row and the warning**: they are
 * exclusive by status.
 *  - `created` + `'created'`: the "created" row, then (PR-13) the unignored-directory row when
 *    `git check-ignore -q .designerpunk/` exits 1 — never on exit 128 or with no `git`.
 *  - `created` + `'created-only'` (non-migrating `sync`): the "created" row alone. PR-13 names `generate` and
 *    `attach`; `sync` has its own answer to an unignored directory, the `.gitignore` block's offer (PR-9).
 *  - `created` + `'naming'` (`sync --migrate-legacy`): the naming row.
 *  - `created` + `'silent'` (`init`, whose next steps carry the naming row themselves).
 *  - `unfilled`: the unfilled-note warning, whatever the command.
 *  - every other status prints nothing here (the caller reports `template-missing`).
 */
export function printPersonalNoteRows(status: PersonalNoteStatus, root: string, creationRow: CreationRow): void {
  if (status === 'unfilled') {
    console.log(`⚠️  ${personalNoteUnfilledMessage()}`);
    return;
  }
  if (status !== 'created') return;
  if (creationRow === 'created' || creationRow === 'created-only') {
    console.log(`ℹ️  ${personalNoteCreatedMessage()}`);
    if (creationRow === 'created' && designerpunkDirIgnoreState(root) === 'not-ignored') {
      console.log(`⚠️  ${personalNoteUnignoredMessage()}`);
    }
  } else if (creationRow === 'naming') {
    console.log(`ℹ️  ${personalNoteNamingMessage()}`);
  }
}
