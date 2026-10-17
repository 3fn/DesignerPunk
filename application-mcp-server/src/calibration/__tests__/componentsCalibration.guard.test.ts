/**
 * GUARD — components calibration instrument fixture q1
 * (charter `.kiro/issues/2026-10-17-components-calibration-instrument-charter.md` §§ 2, 3, 10, 11).
 *
 * The fixture is FROZEN at the pre-registration commit. Any byte change fails this test.
 * A deliberate change is an F3 event (charter § 11): it needs its own record, never a silent re-pin.
 * The runner's `--verify-only` reads the pinned value from THIS file (single source).
 */

import { buildEngine, countFixture, DEFAULT_FIXTURE, loadFixture, main, readPinnedHash, runQueries, sha256File, validateFixture } from '../run';

const PINNED_FIXTURE_SHA256 = '87de8a11a5fec5b48a57d20a5a58e6ceb513f6a41d6392240f9ce99d6af69a0c';

describe('components calibration fixture q1 — frozen', () => {
  it('fixture bytes match the pinned sha256', () => {
    expect(sha256File(DEFAULT_FIXTURE)).toBe(PINNED_FIXTURE_SHA256);
  });

  it('the runner reads the same pinned value from this file', () => {
    expect(readPinnedHash()).toBe(PINNED_FIXTURE_SHA256);
  });

  it('schema, § 3 floors, mechanical pre-exposure flags and catalog existence all hold', async () => {
    const rows = loadFixture(DEFAULT_FIXTURE);
    const { catalog } = await buildEngine();
    expect(validateFixture(rows, catalog)).toEqual([]);
    const c = countFixture(rows);
    expect(c.gaps).toBeGreaterThanOrEqual(8);
    expect(c.gapShare).toBeGreaterThanOrEqual(1 / 3);
  });

  it('status-quo arm reproduces the shipped tier and order on every fixture phrase (live corpus)', async () => {
    const rows = loadFixture(DEFAULT_FIXTURE);
    const { engine } = await buildEngine();
    // runQueries throws on any tier or order mismatch between the arm and the shipped engine.
    expect(() => runQueries(engine, rows, ['status-quo'])).not.toThrow();
  });

  it('the catalog-read control arm is specified, not run (§ 8)', async () => {
    const err = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    await expect(main(['--arms', 'control'])).resolves.toBe(2);
    err.mockRestore();
    log.mockRestore();
  });
});
