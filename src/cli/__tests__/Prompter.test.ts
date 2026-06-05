/**
 * @category evergreen
 * @purpose Verify Prompter interactive conflict resolution (Spec 111, R5/R6)
 */

import * as readline from 'readline';
import { Readable, Writable } from 'stream';
import { resolveConflicts, confirmSourceUpdates } from '../sync/Prompter';
import type { ClassifiedFile } from '../sync/Classifier';

function makeConflict(relativePath: string, reason = 'locally modified'): ClassifiedFile {
  return {
    relativePath,
    classification: 'conflict',
    tier: 'source',
    packageHash: 'pkg',
    projectHash: 'proj',
    reason,
  };
}

/**
 * Create a readline interface that responds with pre-defined answers.
 */
function mockRl(answers: string[]): readline.Interface {
  let idx = 0;
  const input = new Readable({ read() {} });
  const output = new Writable({ write(_chunk, _enc, cb) { cb(); } });
  const rl = readline.createInterface({ input, output });

  // Override question to immediately respond with next answer
  (rl as any).question = (_q: string, cb: (answer: string) => void) => {
    cb(answers[idx++] || '');
    return rl;
  };

  return rl;
}

describe('Prompter', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe('resolveConflicts', () => {
    test('skip decision records correctly', async () => {
      const rl = mockRl(['s']);
      const conflicts = [makeConflict('src/tokens/Color.ts')];

      const results = await resolveConflicts(conflicts, '/pkg', '/proj', rl);

      expect(results).toHaveLength(1);
      expect(results[0].decision).toBe('skip');
      expect(results[0].file.relativePath).toBe('src/tokens/Color.ts');
      rl.close();
    });

    test('overwrite decision records correctly', async () => {
      const rl = mockRl(['o']);
      const conflicts = [makeConflict('src/tokens/Color.ts')];

      const results = await resolveConflicts(conflicts, '/pkg', '/proj', rl);

      expect(results[0].decision).toBe('overwrite');
      rl.close();
    });

    test('handles multiple conflicts sequentially', async () => {
      const rl = mockRl(['s', 'o']);
      const conflicts = [
        makeConflict('src/tokens/A.ts'),
        makeConflict('src/tokens/B.ts'),
      ];

      const results = await resolveConflicts(conflicts, '/pkg', '/proj', rl);

      expect(results[0].decision).toBe('skip');
      expect(results[1].decision).toBe('overwrite');
      rl.close();
    });

    test('diff option re-prompts after display', async () => {
      // d → (shows diff, re-prompts) → s
      const rl = mockRl(['d', 's']);
      const conflicts = [makeConflict('src/tokens/Color.ts')];

      const results = await resolveConflicts(conflicts, '/pkg', '/proj', rl);

      expect(results[0].decision).toBe('skip');
      rl.close();
    });

    test('invalid input re-prompts', async () => {
      const rl = mockRl(['x', 'o']);
      const conflicts = [makeConflict('src/tokens/Color.ts')];

      const results = await resolveConflicts(conflicts, '/pkg', '/proj', rl);

      expect(results[0].decision).toBe('overwrite');
      expect(logSpy).toHaveBeenCalledWith('  Please enter s, o, or d.');
      rl.close();
    });

    test('accepts full words "skip" and "overwrite"', async () => {
      const rl = mockRl(['skip', 'overwrite']);
      const conflicts = [makeConflict('a.ts'), makeConflict('b.ts')];

      const results = await resolveConflicts(conflicts, '/pkg', '/proj', rl);

      expect(results[0].decision).toBe('skip');
      expect(results[1].decision).toBe('overwrite');
      rl.close();
    });
  });

  describe('confirmSourceUpdates', () => {
    test('Y confirms', async () => {
      const rl = mockRl(['Y']);
      const files = [makeConflict('a.ts')];

      const result = await confirmSourceUpdates(files, rl);

      expect(result).toBe(true);
      rl.close();
    });

    test('empty input (enter) confirms (default Y)', async () => {
      const rl = mockRl(['']);
      const files = [makeConflict('a.ts')];

      const result = await confirmSourceUpdates(files, rl);

      expect(result).toBe(true);
      rl.close();
    });

    test('n declines', async () => {
      const rl = mockRl(['n']);
      const files = [makeConflict('a.ts')];

      const result = await confirmSourceUpdates(files, rl);

      expect(result).toBe(false);
      rl.close();
    });

    test('list shows files then confirms', async () => {
      const rl = mockRl(['list', 'Y']);
      const files = [makeConflict('src/tokens/A.ts'), makeConflict('src/tokens/B.ts')];

      const result = await confirmSourceUpdates(files, rl);

      expect(result).toBe(true);
      expect(logSpy).toHaveBeenCalledWith('    src/tokens/A.ts');
      expect(logSpy).toHaveBeenCalledWith('    src/tokens/B.ts');
      rl.close();
    });
  });
});
