/**
 * @category evergreen
 * @purpose FileScanner: hashes files, respects excludeDirs, skips missing dirs,
 * forward-slash relative paths (Spec 111 R1; re-scoped at Spec 123 Task 5.4 —
 * the fixed MANAGED_DIRS list is gone, callers pass the managed roots).
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import { scanFiles, hashFile } from '../sync/FileScanner';
import * as FileScannerModule from '../sync/FileScanner';

describe('FileScanner', () => {
  let tmp: string;
  beforeEach(() => {
    tmp = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-scan-')));
  });
  afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }));

  function write(rel: string, content: string) {
    fs.mkdirSync(path.dirname(path.join(tmp, rel)), { recursive: true });
    fs.writeFileSync(path.join(tmp, rel), content);
  }

  test('hashes every file under the given roots with SHA-256; paths are forward-slash and sorted', () => {
    write('governance/b.md', 'B');
    write('governance/a/c.md', 'C');
    write('.kiro/steering/x.md', 'X');
    const files = scanFiles(tmp, ['governance', '.kiro/steering']);
    expect(files.map((f) => f.relativePath)).toEqual(['governance/a/c.md', 'governance/b.md', '.kiro/steering/x.md']);
    expect(files[1].hash).toBe(crypto.createHash('sha256').update('B').digest('hex'));
    expect(hashFile(path.join(tmp, 'governance/b.md'))).toBe(files[1].hash);
  });

  test('missing roots are skipped; excludeDirs apply at any depth', () => {
    write('governance/__tests__/t.md', 'T');
    write('governance/keep.md', 'K');
    expect(scanFiles(tmp, ['governance', 'absent'], { excludeDirs: ['__tests__'] }).map((f) => f.relativePath)).toEqual([
      'governance/keep.md',
    ]);
  });

  test('there is no fixed managed-directory list any more (what is managed is what the manifest recorded)', () => {
    expect((FileScannerModule as Record<string, unknown>).MANAGED_DIRS).toBeUndefined();
  });
});
