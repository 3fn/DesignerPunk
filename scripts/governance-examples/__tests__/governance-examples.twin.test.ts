/**
 * @jest-environment jsdom
 * @category evergreen
 * @purpose Lina's twin-agreement test for the attribute and value half (A-6, § 8.11 of ballot
 * 2026-10-26-governance-examples-guard, added by ballot 2026-11-08-governance-examples-guard-attribute-
 * predicate). The guard reads each element's `observedAttributes` by syntax. This test pins that read
 * to the running elements: for every registered tag whose `observedAttributes` is an array literal, the
 * syntactic list equals the built class's runtime `observedAttributes` (jsdom, after `define`). It also
 * checks that every registered tag is defined by the built bundle, and prints the not-read count.
 *
 * The built bundle is `dist/browser/designerpunk.umd.js` (`npm run build`; the lane builds before
 * test:scripts).
 */

import * as fs from 'fs';
import * as path from 'path';
import { loadElements, trackedFiles } from '../check';

const REPO = path.resolve(__dirname, '..', '..', '..');
const BUNDLE = path.join(REPO, 'dist/browser/designerpunk.umd.js');

describe("Lina's twin-agreement test (A-6): the syntactic observedAttributes equals the built class's", () => {
  const elements = loadElements(REPO, trackedFiles(REPO));

  beforeAll(() => {
    if (!fs.existsSync(BUNDLE)) throw new Error(`${BUNDLE} is not built; run \`npm run build\``);
    // The UMD bundle registers every element on the jsdom window's customElements as it loads.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(BUNDLE);
  });

  it('every registered tag is defined by the built bundle', () => {
    const missing = [...elements.keys()].filter((t) => !customElements.get(t));
    expect(missing).toEqual([]);
  });

  it('agrees on every tag whose observedAttributes is an array literal; the rest are counted as not read', () => {
    const literal = [...elements.values()].filter((e) => e.observed !== undefined);
    const notRead = elements.size - literal.length;
    // eslint-disable-next-line no-console
    console.log(`not read: ${notRead} of ${elements.size}`);
    expect(literal.length).toBeGreaterThan(0);
    const disagree = literal
      .map((e) => {
        const ctor = customElements.get(e.tag) as unknown as { observedAttributes?: readonly string[] } | undefined;
        return { tag: e.tag, syntactic: e.observed, runtime: ctor?.observedAttributes ? [...ctor.observedAttributes] : undefined };
      })
      .filter((x) => JSON.stringify(x.syntactic) !== JSON.stringify(x.runtime));
    expect(disagree).toEqual([]);
  });
});
