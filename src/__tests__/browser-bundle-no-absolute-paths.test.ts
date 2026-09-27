/**
 * @jest-environment node
 * @category evergreen
 * @purpose Guard: the published browser bundles never embed the build
 * machine's absolute filesystem path (Spec 123 Task 9.0(a) —
 * `.kiro/issues/2026-09-27-bundle-absolute-path-leak.md`).
 *
 * The leak was esbuild's own `// <namespace>:<path>` module-boundary comment
 * (written above each inlined-CSS module's output in non-minified bundles),
 * using whatever path `scripts/esbuild-css-plugin.js`'s `css-as-string`
 * plugin returned from `onResolve` — previously an absolute path
 * (`/Users/<name>/…/src/components/…/X.web.css`), now package-root-relative
 * (`src/components/…/X.web.css`). `scripts/build-name-contract.ts`'s
 * `bundleModules()` parser was updated in the same change to prefer this
 * relative form (it already accepted a bare `src/…` prefix).
 *
 * This test asserts over `dist/browser/*.js` — the bundles `npm run
 * build:browser` writes for the tested commit. It does not build them
 * itself, matching the existing
 * `src/__tests__/browser-distribution/bundler-resolution.test.ts` precedent:
 * CI's `lane-functional-root` required check runs a full `npm run build`
 * (which includes `build:browser`) before `npm test`
 * (`.github/workflows/lane-timing.yml`), so the bundles it asserts over are
 * always fresh for the commit under test. Locally, run `npm run
 * build:browser` (or `npm run build`) before this test — it fails loudly,
 * not silently, if `dist/browser` is missing.
 *
 * Never `test:scripts` — no CI workflow runs that lane
 * (`.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md`).
 *
 * Bite (2026-09-27): reverting `esbuild-css-plugin.js`'s `onResolve` to
 * return the absolute path and rebuilding turns this test red (27
 * occurrences found in `designerpunk.esm.js` alone before the fix; 0 after).
 * Recorded in
 * `.kiro/specs/123-consumer-distribution/completion/task-9-0-completion.md`.
 *
 * Limit (R26.8, tasks.md): this guard knows exactly three build-machine
 * prefix families — `/Users/`, `/home/`, and a single-letter Windows drive
 * (`C:\` or `C:/`). A build root outside those three families would pass
 * undetected.
 */

import * as fs from 'fs';
import * as path from 'path';

const PROJECT_ROOT = process.cwd();
const BROWSER_DIR = path.join(PROJECT_ROOT, 'dist', 'browser');

// `/Users/…` (macOS), `/home/…` (Linux), or a single-letter drive root
// (`C:\` / `C:/`) — the three prefix families this guard covers (R26.8).
// `\b` on the drive-letter branch keeps it from matching mid-word (e.g.
// "http://" has no letter-immediately-before-colon word boundary, since
// every character in "http" is a word character with no boundary between
// them).
const ABSOLUTE_BUILD_MACHINE_PATH = /\/Users\/|\/home\/|\b[A-Za-z]:[\\/]/;

describe('Browser bundles carry no build-machine absolute path', () => {
  let bundleFiles: string[];

  beforeAll(() => {
    if (!fs.existsSync(BROWSER_DIR)) {
      throw new Error(
        'dist/browser is missing — run `npm run build:browser` (or `npm run build`) ' +
          "before this test. This test only asserts over existing build output; it " +
          "doesn't build it (CI's lane-functional-root builds first)."
      );
    }
    bundleFiles = fs.readdirSync(BROWSER_DIR).filter((f) => f.endsWith('.js'));
  });

  it('finds a non-trivial set of bundle files to check, including ESM and UMD', () => {
    expect(bundleFiles.length).toBeGreaterThan(0);
    expect(bundleFiles).toEqual(
      expect.arrayContaining(['designerpunk.esm.js', 'designerpunk.umd.js'])
    );
  });

  it('contains no absolute build-machine path in any dist/browser/*.js bundle', () => {
    const offenders: Array<{ file: string; line: number; text: string }> = [];
    for (const file of bundleFiles) {
      const content = fs.readFileSync(path.join(BROWSER_DIR, file), 'utf8');
      content.split('\n').forEach((line, i) => {
        if (ABSOLUTE_BUILD_MACHINE_PATH.test(line)) {
          offenders.push({ file, line: i + 1, text: line.trim().slice(0, 200) });
        }
      });
    }
    expect(offenders).toEqual([]);
  });
});
