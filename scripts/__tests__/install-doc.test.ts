/**
 * @category evergreen
 * @purpose Spec 123 Task 19: the install doc (design.md C23 and its 2026-10-03
 * erratum). The install doc is the region that opens
 * `governance/DesignerPunk-Integration-Guide.md`; `docs/consumer/INSTALL.md` is
 * its committed derivation (Task 19.4).
 *
 * Built up across Task 19's subtasks:
 *   - 19.1: the README's native label (criterion 5).
 *   - 19.2: path-step counts (C1, incl. the README), heading order and the
 *     § Platforms shape (C2, C13), the scope sentence (C14), the native labels
 *     per platform (C15), the owed-AC residual strings 15.5–15.7 (C3), the
 *     harness-agnostic approval instruction (C4), the 119-B lint (C4, C17),
 *     the Req 3.2 guard (C18), the CLI strings imported from their modules
 *     (C6, C18), the README clause (C16), the stale-scope zero counts (C11).
 *   - 19.4: the markers, and region identity against the derivation (C9, C10).
 *
 * PENDING UNTIL 19.4: the old Setup Loop still sits below the region until
 * 19.4's sweep (Peter's ruling, 2026-10-03: kept as reference, de-numbered,
 * under `## Reference`), and the markers do not exist yet. Assertions that are
 * red by construction until then are registered with `test.failing` through
 * `pendingUntil194`. A `test.failing` test passes while its assertion fails,
 * and FAILS once the assertion holds, so 19.4 cannot satisfy one without
 * flipping it to a plain `test`. The ids are listed once in
 * `PENDING_UNTIL_19_4`, and a guard test asserts the registered set equals that
 * list. Nothing is skipped and no assertion is weakened.
 *
 * The scope sentence's CHANGELOG surface is asserted from 22.4, in this file
 * (Peter's O-2 ruling, 2026-10-03).
 */

import * as fs from 'fs';
import * as path from 'path';
import { LIFECYCLE_VERBS, ATTACH_OBJECT, attachUsage } from '../../src/cli/shared/vocabulary';
import { cloneHatchMessage, personalNoteNamingMessage } from '../../src/cli/shared/errorCatalog';
import { missingTokenMessage } from '../../src/cli/sync/NameContract';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const read = (rel: string): string => fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');

const GUIDE_PATH = 'governance/DesignerPunk-Integration-Guide.md';
const INSTALL_PATH = 'docs/consumer/INSTALL.md';
const README = read('README.md');
const GUIDE = read(GUIDE_PATH);

// ---------------------------------------------------------------------------
// Fixed expectations, each with its source
// ---------------------------------------------------------------------------

/** design.md C23, the step-unit table (`path-steps`). */
const C23_PATH_STEPS = { founder: 5, joining: 5, 'joining-cross-harness': 6, 'reference-no-init': 3 };

/**
 * tasks.md § "Expected release count", the asserted string (Leonardo's merge of
 * Ada's three parts; Ada's fact-check of the third sentence, feedback/tasks.md
 * [ADA R2]). Identical on the install doc, the README and (from 22.4) the
 * release-3 CHANGELOG entry.
 */
const SCOPE_SENTENCE =
  'This release is ready for building web products, with the agent layer for Claude Code and Kiro. ' +
  'Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as ' +
  "reference source, not a build input, so don't start a native product on this release. On web, a custom theme " +
  'you register in `designerpunk.config.ts` does not change your generated output yet; light and dark mode work.';

/** The two asserted label strings, version-free (tasks.md Task 19, criterion 5 made decidable). */
const LABEL_REFERENCE_SOURCE = 'reference source, not a build input'; // Task 3.5's core
const LABEL_NATIVE_ONBOARDING = 'Native onboarding is not supported'; // #268's core

/** The unlabelled sentence the README carried at `79a3b3bc` (L57). */
const UNLABELLED_NATIVE_CLAIM = 'True native implementations (Web Components, SwiftUI, Jetpack Compose)';

/** C23: the founder path's five steps, in order (one matcher per step). */
const FOUNDER_ORDER: RegExp[] = [
  /npm install @3fn\/core/,
  /npx designerpunk init --target=<cc\|kiro>/,
  /npx designerpunk generate/,
  /personal note/,
  /^Restart your agent session/,
];

/** C4: the approval instruction, harness-agnostic. Every path's last step reads exactly this. */
const RESTART_STEP = "Restart your agent session (approve DesignerPunk's MCP servers if asked).";
const HARNESS_NAMES = ['Claude Code', 'Kiro', 'cc', 'kiro'];

/**
 * design.md C23 erratum, "The region's order, stated here". Prefix matchers, so
 * the order and the identity of each section are fixed and wording is not.
 */
const REGION_HEADINGS: RegExp[] = [
  /^## Prerequisites$/,
  /^## 1\. Which posture\?/,
  /^## 2\. CONSUME\b/,
  /^## 3\. BECOME\b/,
  /^## 4\. Your language vs our updating surface/,
  /^## Platforms$/,
  /^### Web$/,
  /^### iOS$/,
  /^### Android$/,
  /^## 5\. When sync reports a missing token$/,
  /^## 6\. Your agent layer/,
  /^## Adding a second harness$/,
  /^## 7\. Joining an existing design system/,
  /^## 8\. CI needs/,
  /^## 9\. Ownership/,
];
const PLATFORMS = ['Web', 'iOS', 'Android'];

/** C17 (ii): the calibration cue's citation, and the emitting tools the region must not name. */
const CALIBRATION_CITATION = '`governance/classification-map.md § "certainty-calibration"`';
const EMITTER_DENYLIST = ['find_docs', 'find_components'];

/** C16 (L-A4): cause markers that belong in the guide's platform sub-sections, never on the README. */
const README_CAUSE_MARKERS = ['dpTheme', 'LocalDPTheme', 'DesignerPunkTheme', 'Gradle', 'Swift package', 'ContainerCardBase', 'theme-varying'];

/** C11: the stale-scope strings, asserted as plain zero counts (Stacy A-6). */
const STALE_SCOPE = ['npm.pkg.github.com', '@designerpunk:'];

// ---------------------------------------------------------------------------
// Parsing helpers (pure, on text)
// ---------------------------------------------------------------------------

/** The leading `---` front-matter block, as lines. */
export function frontMatter(text: string): string[] {
  const lines = text.split('\n');
  if (lines[0] !== '---') throw new Error('no front matter');
  const end = lines.indexOf('---', 1);
  if (end < 0) throw new Error('unterminated front matter');
  return lines.slice(1, end);
}

/** Parses `path-steps: { a: 1, b: 2 }` from front matter. */
export function pathSteps(fm: string[]): Record<string, number> {
  const line = fm.find((l) => l.startsWith('path-steps:'));
  if (!line) throw new Error('front matter has no path-steps');
  const body = /\{(.*)\}/.exec(line)?.[1];
  if (!body) throw new Error(`malformed path-steps: ${line}`);
  const out: Record<string, number> = {};
  for (const pair of body.split(',')) {
    const [k, v] = pair.split(':').map((s) => s.trim());
    out[k] = Number(v);
  }
  return out;
}

/**
 * INTERIM (until 19.4): the region runs from the line after the metadata
 * block's closing `---` to the `---` before `## Setup Loop`. 19.4 replaces this
 * with the two markers. The pending test `interim-delimiter-retired` makes
 * forgetting to do so go red.
 */
export const USING_INTERIM_DELIMITER = true;
export function region(guide: string): string {
  const lines = guide.split('\n');
  const rt = lines.findIndex((l) => l.startsWith('**Relevant Tasks**'));
  const open = lines.indexOf('---', rt);
  const setupLoop = lines.indexOf('## Setup Loop');
  if (rt < 0 || open < 0) throw new Error('region: metadata block not found');
  if (setupLoop < 0) throw new Error('region: `## Setup Loop` not found — the interim delimiter is retired; 19.4 switches to the markers');
  let end = setupLoop;
  while (end > open && (lines[end - 1].trim() === '' || lines[end - 1] === '---')) end--;
  return lines.slice(open + 1, end).join('\n').trim();
}

/** Everything in the guide that is not the region (front matter and metadata excluded). */
export function outsideRegion(guide: string): string {
  const r = region(guide);
  const idx = guide.indexOf(r);
  return guide.slice(idx + r.length);
}

/** Lines of the span from the heading matching `start` to the next heading of the same or higher level. */
export function span(text: string, start: RegExp): string[] {
  const lines = text.split('\n');
  const i = lines.findIndex((l) => start.test(l));
  if (i < 0) throw new Error(`span: no heading matching ${start}`);
  const level = /^(#+) /.exec(lines[i])![1].length;
  let j = i + 1;
  while (j < lines.length) {
    const m = /^(#+) /.exec(lines[j]);
    if (m && m[1].length <= level) break;
    j++;
  }
  return lines.slice(i + 1, j);
}

/** Markdown headings (`##`–`######`) outside fenced code blocks. */
export function headings(text: string): string[] {
  let fenced = false;
  const out: string[] = [];
  for (const l of text.split('\n')) {
    if (/^\s*```/.test(l)) fenced = !fenced;
    else if (!fenced && /^#{2,6} /.test(l)) out.push(l);
  }
  return out;
}

/** Contiguous numbered lists (`1. …`), each as its items' text. */
export function numberedLists(lines: string[]): string[][] {
  const lists: string[][] = [];
  let cur: string[] | null = null;
  for (const l of lines) {
    const m = /^(\d+)\. (.*)$/.exec(l);
    if (m) {
      if (!cur) lists.push((cur = []));
      cur.push(m[2]);
    } else {
      cur = null;
    }
  }
  return lists;
}

/** Paragraphs (blank-line separated), outside fenced code. */
export function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length > 0);
}

const stripTicks = (s: string): string => s.replace(/`/g, '');
const count = (hay: string, needle: string): number => hay.split(needle).length - 1;

/** C17 (i): route lines are section-less — `THEN consult <doc-id> (summary-first)`, no `§`. */
export function routeLineViolations(text: string): string[] {
  return text
    .split('\n')
    .filter((l) => l.includes('THEN consult'))
    .filter((l) => l.includes('§') || !/THEN consult [a-z0-9][a-z0-9-]* \(summary-first\)/.test(l));
}

/** C17 (ii): emitting tools named in the text. */
export function emittersNamed(text: string): string[] {
  return EMITTER_DENYLIST.filter((t) => text.includes(t));
}

/** C18 (Req 3.2): `generate` inside a code span or a numbered step, within the CONSUME span. */
export function consumeGenerateInstructions(regionText: string): string[] {
  const lines = span(regionText, /^## 2\. CONSUME\b/);
  return lines.filter((l) => {
    const inCode = (l.match(/`[^`]*`/g) ?? []).some((c) => /\bgenerate\b/.test(c));
    const inStep = /^\d+\. /.test(l) && /\bgenerate\b/.test(l);
    return inCode || inStep;
  });
}

/** C6 (whole guide, C11 § "CLI Commands"): table rows for a lifecycle verb whose description is not vocabulary.ts's. */
export function cliTableDrift(text: string): string[] {
  const out: string[] = [];
  for (const l of text.split('\n')) {
    const m = /^\| `npx designerpunk (init|generate|sync|validate|attach)\b[^`]*` \| (.*) \|$/.exec(l);
    if (!m) continue;
    const entry = LIFECYCLE_VERBS.find((e) => e.verb === m[1])!;
    if (!m[2].includes(entry.description)) out.push(l);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Pending-until-19.4 registry
// ---------------------------------------------------------------------------

const PENDING_UNTIL_19_4 = [
  'interim-delimiter-retired',
  'no-setup-loop-string-outside-region',
  'no-numbered-step-heading-outside-region',
  'one-reference-heading',
  'guide-zero-stale-scope',
  'install-md-zero-stale-scope',
  'cli-commands-table-uses-vocabulary',
] as const;
const registeredPending: string[] = [];
function pendingUntil194(id: (typeof PENDING_UNTIL_19_4)[number], name: string, fn: () => void): void {
  registeredPending.push(id);
  test.failing(`[pending 19.4: ${id}] ${name}`, fn);
}

// ---------------------------------------------------------------------------
// The region, once
// ---------------------------------------------------------------------------

const REGION = region(GUIDE);
const PATHS = pathSteps(frontMatter(GUIDE));

// ---------------------------------------------------------------------------
// 19.1 — the README native label (criterion 5)
// ---------------------------------------------------------------------------

/**
 * The Stemma `Deliverables` paragraph, where the unlabelled sentence lived. The
 * README has one `**Deliverables:**` paragraph per system, so the Stemma one is
 * found by its content (it names the native component frameworks), never by line.
 */
function stemmaDeliverablesParagraph(text: string): string {
  const matches = text
    .split('\n')
    .filter((l) => l.startsWith('**Deliverables:**') && l.includes('Jetpack Compose'));
  if (matches.length !== 1) {
    throw new Error(`README.md: expected exactly one "**Deliverables:**" paragraph naming Jetpack Compose, found ${matches.length}`);
  }
  return matches[0];
}

describe('README native label (Task 19 criterion 5)', () => {
  it('no longer carries the unlabelled "True native implementations" sentence', () => {
    expect(README).not.toContain(UNLABELLED_NATIVE_CLAIM);
  });

  it('carries both label strings in the labelled form that replaced it', () => {
    const deliverables = stemmaDeliverablesParagraph(README);
    expect(deliverables).toContain(LABEL_REFERENCE_SOURCE);
    expect(deliverables).toContain(LABEL_NATIVE_ONBOARDING);
  });
});

// ---------------------------------------------------------------------------
// 19.2
// ---------------------------------------------------------------------------

describe('path-steps (C1 — 22.2’s instrument: counts numbered items, never a run)', () => {
  it('the front matter declares C23’s map', () => {
    expect(PATHS).toEqual(C23_PATH_STEPS);
  });

  it('§ 2 CONSUME: one numbered list of reference-no-init steps', () => {
    const lists = numberedLists(span(REGION, /^## 2\. CONSUME\b/));
    expect(lists).toHaveLength(1);
    expect(lists[0]).toHaveLength(PATHS['reference-no-init']);
  });

  it('§ 3 BECOME: one numbered list of founder steps, in C23 order', () => {
    const lists = numberedLists(span(REGION, /^## 3\. BECOME\b/));
    expect(lists).toHaveLength(1);
    expect(lists[0]).toHaveLength(PATHS.founder);
    lists[0].forEach((item, i) => expect(item).toMatch(FOUNDER_ORDER[i]));
  });

  it('§ 7 Joining: the joining list, then the cross-harness list (joining + attach after step 3)', () => {
    const lists = numberedLists(span(REGION, /^## 7\. Joining\b/));
    expect(lists).toHaveLength(2);
    const [joining, cross] = lists;
    expect(joining).toHaveLength(PATHS.joining);
    expect(cross).toHaveLength(PATHS['joining-cross-harness']);
    expect(cross.slice(0, 3)).toEqual(joining.slice(0, 3));
    expect(cross[3]).toMatch(/npx designerpunk attach --target=<cc\|kiro>/);
    expect(cross.slice(4)).toEqual(joining.slice(3));
  });

  it('no other section of the region has a numbered item (one step = one numbered item in a path list)', () => {
    const total = numberedLists(REGION.split('\n')).reduce((n, l) => n + l.length, 0);
    expect(total).toBe(PATHS['reference-no-init'] + PATHS.founder + PATHS.joining + PATHS['joining-cross-harness']);
  });

  it('README § "Getting Started": exactly path-steps.founder numbered items, in C23 order', () => {
    const lists = numberedLists(span(README, /^## Getting Started$/));
    expect(lists).toHaveLength(1);
    expect(lists[0]).toHaveLength(PATHS.founder);
    lists[0].forEach((item, i) => expect(item).toMatch(FOUNDER_ORDER[i]));
  });
});

describe('heading order and the § Platforms shape (C2, C13)', () => {
  it('the region’s headings are C23’s, in C23’s order', () => {
    const hs = headings(REGION);
    expect(hs).toHaveLength(REGION_HEADINGS.length);
    hs.forEach((h, i) => expect(h).toMatch(REGION_HEADINGS[i]));
  });

  it('every platform sub-section sits under § Platforms, and nowhere else', () => {
    const inside = span(REGION, /^## Platforms$/).filter((l) => /^### /.test(l)).map((l) => l.slice(4));
    for (const p of PLATFORMS) expect(inside).toContain(p);
    const elsewhere = headings(REGION).filter((h) => /^#{2,6} (Web|iOS|Android)$/.test(h)).length;
    expect(elsewhere).toBe(PLATFORMS.length);
  });

  it('§ Platforms carries no numbered step', () => {
    expect(numberedLists(span(REGION, /^## Platforms$/))).toEqual([]);
  });
});

describe('scope sentence (C14 — install doc and README; the CHANGELOG from 22.4)', () => {
  it('is the region’s first paragraph, so it precedes Prerequisites and step 1', () => {
    expect(paragraphs(REGION)[0]).toBe(SCOPE_SENTENCE);
  });

  it('is the README’s status line, identical', () => {
    expect(paragraphs(span(README, /^## Getting Started$/).join('\n'))[0]).toBe(SCOPE_SENTENCE);
  });

  it('contains both label strings', () => {
    expect(SCOPE_SENTENCE).toContain(LABEL_REFERENCE_SOURCE);
    expect(SCOPE_SENTENCE).toContain(LABEL_NATIVE_ONBOARDING);
  });
});

describe('native labels per platform (C5, C15)', () => {
  it.each(['iOS', 'Android'])('§ Platforms › %s carries both asserted strings', (p) => {
    const body = span(REGION, new RegExp(`^### ${p}$`)).join('\n');
    expect(body).toContain(LABEL_REFERENCE_SOURCE);
    expect(body).toContain(LABEL_NATIVE_ONBOARDING);
  });
});

describe('owed-AC single-string residuals (C3: 15.5, 15.6, 15.7), in § 2 CONSUME', () => {
  const consume = span(REGION, /^## 2\. CONSUME\b/).join('\n');
  it('15.5 — citation fidelity', () => {
    expect(consume).toContain('Quoted text and dates are claims requiring re-verification');
  });
  it('15.6 — retry on SectionNotFound using the server’s suggestions', () => {
    expect(consume).toContain('`SectionNotFound`');
    expect(consume).toContain('`suggestions`');
  });
  it('15.7 — lastReviewed conflicts', () => {
    expect(consume).toContain('defer to the more recently reviewed one');
  });
});

describe('the approval instruction is harness-agnostic (C4)', () => {
  it('the asserted string names no harness', () => {
    for (const h of HARNESS_NAMES) expect(RESTART_STEP.split(/\W+/)).not.toContain(h);
    expect(RESTART_STEP).not.toMatch(/Claude Code/);
  });

  it('every path list, in the region and the README, ends with it', () => {
    const lists = [...numberedLists(REGION.split('\n')), ...numberedLists(span(README, /^## Getting Started$/))];
    expect(lists.length).toBe(5);
    for (const l of lists) expect(l[l.length - 1]).toBe(RESTART_STEP);
  });
});

describe('119-B lint (C4, C17), over the region', () => {
  it('(i) route lines are section-less', () => {
    expect(routeLineViolations(REGION)).toEqual([]);
  });

  it('(ii) the calibration cue cites the register entry and names no emitting tool', () => {
    expect(REGION).toContain(CALIBRATION_CITATION);
    expect(emittersNamed(REGION)).toEqual([]);
  });

  it('(ii) the cited register entry exists (check:section-citations reads only get_* calls, not § prose)', () => {
    expect(read('governance/classification-map.md').split('\n')).toContain('### certainty-calibration');
  });

  // (iii) no MCP citation targets an identity doc: `npm run check:section-citations`
  // (its identity-doc class; citing roots include governance/). Cited, not re-implemented.

  it('(iv) zero backstop aliases', () => {
    expect(frontMatter(GUIDE).some((l) => l.startsWith('aliases:'))).toBe(false);
  });

  // (v) G1's misfit moves through the generator only: a constraint on agent text, not the install doc.

  it('bites: the lint functions flag what they exist to flag', () => {
    expect(routeLineViolations('- WHEN x THEN consult token-governance § "Token Selection Matrix"')).toHaveLength(1);
    expect(routeLineViolations('- WHEN x THEN consult token-governance')).toHaveLength(1);
    expect(routeLineViolations('- WHEN x THEN consult token-governance (summary-first)')).toEqual([]);
    expect(emittersNamed('run find_docs first')).toEqual(['find_docs']);
  });
});

describe('Req 3.2 re-entry guard (C18): § 2 CONSUME never instructs generate', () => {
  it('no `generate` in a code span or numbered step inside the CONSUME span', () => {
    expect(consumeGenerateInstructions(REGION)).toEqual([]);
  });

  it('bite: the guard flags an instructing line', () => {
    const fixture = '## 2. CONSUME — x\n\n1. `npm install`\n2. `npx designerpunk generate`\n\n## 3. BECOME — y\n';
    expect(consumeGenerateInstructions(fixture)).toHaveLength(1);
  });
});

describe('CLI strings, imported — never literals (C6, C18)', () => {
  const regionPlain = stripTicks(REGION);

  it.each(LIFECYCLE_VERBS.map((e) => [e.verb, e.description]))('the region introduces `%s` with vocabulary.ts’s description', (_verb, description) => {
    expect(REGION).toContain(description);
  });

  it('`attach` appears with its object at its first prose use', () => {
    const first = paragraphs(REGION).find((p) => !/^\d+\. /.test(p) && /`attach`/.test(p));
    expect(first).toBeDefined();
    expect(first).toContain(attachUsage());
    expect(first).toContain(ATTACH_OBJECT);
  });

  it('§ 5 quotes the name-contract message, and the section it points to exists', () => {
    const msg = missingTokenMessage({
      name: '<name>',
      declaredUse: '<what it is for>',
      components: ['<components>'],
      tierPath: '<your token source>',
      value: '<value>',
      dpToken: '<token>',
    });
    expect(span(REGION, /^## 5\. /).join('\n')).toContain(msg);
    const target = /§ "([^"]+)"/.exec(msg)?.[1];
    expect(target).toBeDefined();
    expect(headings(REGION).some((h) => h.includes(target!))).toBe(true);
  });

  it('§ 9 carries the clone hatch’s clause', () => {
    const clause = cloneHatchMessage().split(' — ')[1];
    expect(regionPlain).toContain(clause);
  });

  it('§ 3 names the personal note with init’s purpose clause', () => {
    const clause = personalNoteNamingMessage().split(' — ')[1];
    expect(REGION).toContain(clause);
  });
});

describe('README clause (C16)', () => {
  it('links "Install guide" to docs/consumer/INSTALL.md', () => {
    expect(README).toContain(`[Install guide](${INSTALL_PATH})`);
  });

  it('carries no platform cause sentence', () => {
    for (const marker of README_CAUSE_MARKERS) expect(README).not.toContain(marker);
  });
});

describe('stale-scope zero counts (C11), active', () => {
  it.each(STALE_SCOPE)('README.md: zero `%s`', (s) => {
    expect(count(README, s)).toBe(0);
  });
});

describe('pending until 19.4 (test.failing: passes while red, fails once satisfied — flip it then)', () => {
  pendingUntil194('interim-delimiter-retired', 'the region is delimited by its markers, not the interim `## Setup Loop` anchor', () => {
    expect(USING_INTERIM_DELIMITER).toBe(false);
  });

  pendingUntil194('no-setup-loop-string-outside-region', 'no "Setup Loop" string outside the region (C9)', () => {
    expect(count(outsideRegion(GUIDE), 'Setup Loop')).toBe(0);
  });

  pendingUntil194('no-numbered-step-heading-outside-region', 'no numbered setup heading outside the region (C9)', () => {
    expect(headings(outsideRegion(GUIDE)).filter((h) => /^#{2,6} \d+[a-z]?\. /.test(h))).toEqual([]);
  });

  pendingUntil194('one-reference-heading', 'the remainder sits under exactly one `## Reference` heading (C9)', () => {
    expect(GUIDE.split('\n').filter((l) => l === '## Reference')).toHaveLength(1);
  });

  pendingUntil194('guide-zero-stale-scope', 'the guide: zero `npm.pkg.github.com` and zero `@designerpunk:` (C11)', () => {
    for (const s of STALE_SCOPE) expect(count(GUIDE, s)).toBe(0);
  });

  pendingUntil194('install-md-zero-stale-scope', 'docs/consumer/INSTALL.md exists, with zero stale-scope strings (C10, C11)', () => {
    const install = read(INSTALL_PATH);
    for (const s of STALE_SCOPE) expect(count(install, s)).toBe(0);
  });

  pendingUntil194('cli-commands-table-uses-vocabulary', 'every lifecycle-verb row in the guide uses vocabulary.ts’s description (C6 whole-guide, C11 § "CLI Commands")', () => {
    expect(cliTableDrift(GUIDE)).toEqual([]);
  });

  it('the registered pending set is exactly the declared list', () => {
    expect([...registeredPending].sort()).toEqual([...PENDING_UNTIL_19_4].sort());
  });
});
