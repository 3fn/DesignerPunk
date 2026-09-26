/**
 * @category evergreen
 * @purpose Verify the CLI runner's `spawnServer` (Spec 123 Task 1.3): user-set
 * data-root env wins over the runner's own defaults, and no `cwd` option is ever
 * passed to the spawned child.
 * @see .kiro/specs/123-consumer-distribution/design.md § "C3. The root-policy table as code"
 */
import { EventEmitter } from 'events';

jest.mock('child_process', () => ({
  spawn: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawn } = require('child_process') as { spawn: jest.Mock };

function fakeChild() {
  const emitter = new EventEmitter();
  return emitter;
}

describe('spawnServer', () => {
  let exitSpy: jest.SpyInstance;

  beforeEach(() => {
    spawn.mockReset();
    spawn.mockImplementation(() => fakeChild());
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(((() => undefined) as unknown) as () => never);
  });

  afterEach(() => {
    exitSpy.mockRestore();
  });

  test('user-set data-root env wins over the runner default', () => {
    const originalEnv = process.env.COMPONENTS_DIR;
    process.env.COMPONENTS_DIR = '/user/set/components';
    try {
      // Re-require so the module reads the env we just set (no caching concern —
      // spawnServer reads process.env at call time, not at import time).
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { spawnServer } = require('../designerpunk');
      spawnServer('/entry.js', { COMPONENTS_DIR: '/runner/default/components' }, true);

      expect(spawn).toHaveBeenCalledTimes(1);
      const [, , options] = spawn.mock.calls[0];
      expect(options.env.COMPONENTS_DIR).toBe('/user/set/components');
    } finally {
      if (originalEnv === undefined) delete process.env.COMPONENTS_DIR;
      else process.env.COMPONENTS_DIR = originalEnv;
    }
  });

  test('the runner default is used when the user has not set the env var', () => {
    const originalEnv = process.env.COMPONENTS_DIR;
    delete process.env.COMPONENTS_DIR;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { spawnServer } = require('../designerpunk');
      spawnServer('/entry.js', { COMPONENTS_DIR: '/runner/default/components' }, true);

      const [, , options] = spawn.mock.calls[0];
      expect(options.env.COMPONENTS_DIR).toBe('/runner/default/components');
    } finally {
      if (originalEnv === undefined) delete process.env.COMPONENTS_DIR;
      else process.env.COMPONENTS_DIR = originalEnv;
    }
  });

  test('no cwd option is ever passed to the spawned child', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { spawnServer } = require('../designerpunk');
    spawnServer('/entry.js', { SOME_VAR: 'value' }, true);

    const [, , options] = spawn.mock.calls[0];
    expect(options.cwd).toBeUndefined();
    expect(Object.prototype.hasOwnProperty.call(options, 'cwd')).toBe(false);
    // BITE (recorded red in the Task 1.3 completion doc): adding `cwd:
    // process.cwd()` (or any fixed path) to spawnServer's options turns this red.
  });
});
