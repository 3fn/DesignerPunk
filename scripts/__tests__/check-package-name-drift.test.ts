/**
 * Package Name Drift Detection — the no-op property (Spec 123 Task 17.1)
 *
 * `scripts/check-package-name-drift.js` scans a fixed list of directories (`SCAN_DIRS`).
 * A scan directory that does not exist must be a no-op, not an error: the list can name
 * directories a given checkout lacks (CI has no `dist/`; a directory leaves the list before
 * it leaves the tree). This test pins that property.
 *
 * The script is SPAWNED as a child process in a temp cwd that holds only a scoped
 * `package.json`, so every `SCAN_DIRS` entry is absent and the result never depends on
 * whether the real repo has a `dist/`. It is never `import`ed: `typecheck:scripts` reads
 * `scripts/**\/*`, and importing the `.js` file (no declaration file) fails under strict mode.
 *
 * The positive control keeps a vacuous early exit from passing: a wrong-scope reference
 * under a PRESENT scan directory must still exit 1.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const SCRIPT = path.resolve(__dirname, '..', 'check-package-name-drift.js');

// eslint-disable-next-line no-control-regex
const stripAnsi = (text: string): string => text.replace(/\x1b\[[0-9;]*m/g, '');

function makeTempProject(name = '@example-scope/core'): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'drift-script-'));
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, version: '0.0.0' }));
  return dir;
}

function runScript(cwd: string) {
  const result = spawnSync(process.execPath, [SCRIPT], { cwd, encoding: 'utf-8' });
  return {
    status: result.status,
    stdout: stripAnsi(result.stdout ?? ''),
    stderr: stripAnsi(result.stderr ?? ''),
  };
}

describe('check-package-name-drift (spawned in a temp project)', () => {
  let projectDir: string;

  beforeEach(() => {
    projectDir = makeTempProject();
  });

  afterEach(() => {
    fs.rmSync(projectDir, { recursive: true, force: true });
  });

  it('is a no-op (exit 0, zero files scanned) when every scan directory is absent', () => {
    // Precondition: the temp project holds only package.json, so no scan dir exists.
    expect(fs.readdirSync(projectDir)).toEqual(['package.json']);

    const result = runScript(projectDir);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('No package name drift detected (0 files scanned)');
    expect(result.stderr).toBe('');
  });

  it('still fails (exit 1) on a wrong-scope reference under a present scan directory', () => {
    const srcDir = path.join(projectDir, 'src');
    fs.mkdirSync(srcDir);
    fs.writeFileSync(path.join(srcDir, 'note.md'), 'See @other-scope/core for details.\n');

    const result = runScript(projectDir);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Package name drift detected');
    expect(result.stderr).toContain('@other-scope/core');
  });
});

/**
 * The `@<scope>:registry` class fix (publish-path instrument rows, row 6; register row
 * `package-name-scope-drift`, Thurgood's, delegated to the fixing PR). Before it, only
 * `@<scope>/<pkg>` was matched, so a stale `@designerpunk:registry=…` line (#312 finding 3)
 * passed. The project here is scoped `@3fn`, as the real package is.
 */
describe('check-package-name-drift — @<scope>:registry lines', () => {
  let projectDir: string;

  beforeEach(() => {
    projectDir = makeTempProject('@3fn/core');
    fs.mkdirSync(path.join(projectDir, 'governance'));
  });

  afterEach(() => {
    fs.rmSync(projectDir, { recursive: true, force: true });
  });

  it('BITES on a stale @designerpunk:registry line (red, exit 1, the expected key named)', () => {
    fs.writeFileSync(
      path.join(projectDir, 'governance', 'install.md'),
      'Add to .npmrc:\n\n    @designerpunk:registry=https://npm.pkg.github.com\n',
    );

    const result = runScript(projectDir);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('governance/install.md:3');
    expect(result.stderr).toContain('found:    @designerpunk:registry');
    expect(result.stderr).toContain('expected: @3fn:registry');
  });

  it('passes the package scope\'s own @3fn:registry line (green, exit 0)', () => {
    fs.writeFileSync(
      path.join(projectDir, 'governance', 'install.md'),
      'Add to .npmrc:\n\n    @3fn:registry=https://npm.pkg.github.com\n\nThen `npm install @3fn/core`.\n',
    );

    const result = runScript(projectDir);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('No package name drift detected (1 files scanned)');
    expect(result.stderr).toBe('');
  });
});
