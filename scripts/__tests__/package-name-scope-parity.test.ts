/**
 * Package-name scope rule <-> SCAN_DIRS parity (Spec 123 Task 17.4; ballot B-U2 F-2, ruled Peter 2026-09-28)
 *
 * Two copies of one list are held in step by this STANDING test:
 *   - the `rule:` string of the yaml block under `### package-name-scope-drift` in
 *     `governance/classification-map.md` (its one parenthesized group of path-shaped members), and
 *   - `SCAN_DIRS` in `scripts/check-package-name-drift.js`.
 *
 * It fails loud if the block, the `rule:` string, or exactly one path-shaped group is absent, and
 * asserts the two sets are set-equal with equal lengths. Scope: it establishes that the rule and the
 * script AGREE, not that either is correct.
 *
 * `SCAN_DIRS` is read by a typed `require`, never an `import`: `typecheck:scripts` reads
 * `scripts/**\/*`, and importing the `.js` (no declaration file) fails under strict mode.
 */

import * as fs from 'fs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SCAN_DIRS } = require('../check-package-name-drift.js') as { SCAN_DIRS: readonly string[] };

const CLASSIFICATION_MAP = path.resolve(__dirname, '..', '..', 'governance', 'classification-map.md');
const BLOCK_HEADING = '### package-name-scope-drift';

/**
 * The directories named by the one parenthesized group of path-shaped members (each ending `/`)
 * in the `rule:` string of the yaml block under `### package-name-scope-drift`, trailing slashes
 * stripped. Throws, naming what is missing, rather than returning an empty or partial answer.
 */
function parseRuleDirs(markdown: string): string[] {
  const headingAt = markdown.indexOf(`\n${BLOCK_HEADING}\n`);
  if (headingAt === -1) {
    throw new Error(`parity: the "${BLOCK_HEADING}" block is absent from the classification map`);
  }
  const afterHeading = markdown.slice(headingAt + BLOCK_HEADING.length + 2);
  const nextHeading = afterHeading.search(/\n#{1,6} /);
  const section = nextHeading === -1 ? afterHeading : afterHeading.slice(0, nextHeading);

  const fence = section.match(/```yaml\n([\s\S]*?)\n```/);
  if (!fence) {
    throw new Error(`parity: no yaml block under "${BLOCK_HEADING}"`);
  }
  const ruleLine = fence[1].split('\n').find((line) => line.startsWith('rule:'));
  const ruleMatch = ruleLine?.match(/^rule:\s*"(.*)"\s*$/);
  if (!ruleMatch) {
    throw new Error(`parity: no quoted "rule:" string in the yaml block under "${BLOCK_HEADING}"`);
  }

  const pathShapedGroups: string[][] = [];
  for (const group of ruleMatch[1].matchAll(/\(([^()]*)\)/g)) {
    const members = group[1].split(',').map((member) => member.trim());
    if (members.length > 0 && members.every((member) => member.length > 1 && member.endsWith('/'))) {
      pathShapedGroups.push(members);
    }
  }
  if (pathShapedGroups.length !== 1) {
    throw new Error(
      `parity: expected exactly one parenthesized group of path-shaped members (each ending "/") in the rule string, found ${pathShapedGroups.length}`,
    );
  }
  return pathShapedGroups[0].map((member) => member.replace(/\/+$/, ''));
}

describe('package-name-scope-drift rule <-> SCAN_DIRS parity (standing)', () => {
  it('the rule enumeration is set-equal to SCAN_DIRS, with equal lengths', () => {
    const ruleDirs = parseRuleDirs(fs.readFileSync(CLASSIFICATION_MAP, 'utf-8'));

    expect(ruleDirs.length).toBe(SCAN_DIRS.length);
    expect(new Set(ruleDirs)).toEqual(new Set(SCAN_DIRS));
  });

  describe('parseRuleDirs fails loud (synthetic input)', () => {
    const block = (rule: string) =>
      `intro\n\n${BLOCK_HEADING}\n\n\`\`\`yaml\nrule: "${rule}"\nboundary_call:\n  class: functional\n\`\`\`\n\n### next\n`;

    it('parses the one path-shaped group and ignores other parentheses', () => {
      expect(parseRuleDirs(block('Every ref (alpha/, beta/gamma/) SHALL match (a note) here'))).toEqual([
        'alpha',
        'beta/gamma',
      ]);
    });

    it('throws when the block is absent', () => {
      expect(() => parseRuleDirs('# nothing here\n')).toThrow(/block is absent/);
    });

    it('throws when the block has no yaml fence', () => {
      expect(() => parseRuleDirs(`x\n${BLOCK_HEADING}\n\nprose only\n`)).toThrow(/no yaml block/);
    });

    it('throws when the rule string is absent', () => {
      expect(() => parseRuleDirs(`x\n${BLOCK_HEADING}\n\n\`\`\`yaml\nother: "a"\n\`\`\`\n`)).toThrow(/no quoted "rule:"/);
    });

    it('throws when no path-shaped group exists', () => {
      expect(() => parseRuleDirs(block('Every ref (not paths) SHALL match'))).toThrow(/found 0/);
    });

    it('throws when two path-shaped groups exist', () => {
      expect(() => parseRuleDirs(block('Every ref (alpha/) and also (beta/) SHALL match'))).toThrow(/found 2/);
    });
  });
});
