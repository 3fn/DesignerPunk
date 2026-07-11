/**
 * @category evergreen
 * @purpose Verify the child-process guard (U3 orphan-leak fix): registered children are
 *          SIGTERMed by the reap pass; released (gracefully closed) children are not;
 *          pid-less transports are skipped without error; guardChild returns its input
 *          for inline wrapping.
 */

import { guardChild, noteChildPid, releaseChild, _reapForTest, type GuardedChild } from '../child-process-guard';

describe('child-process guard (U3 orphan-leak fix)', () => {
  const killed: Array<{ pid: number; signal: string | number | undefined }> = [];
  let killSpy: jest.SpyInstance;

  beforeEach(() => {
    killed.length = 0;
    _reapForTest(); // drain registrations left by other tests/modules
    killSpy = jest.spyOn(process, 'kill').mockImplementation(((pid: number, signal?: string | number) => {
      killed.push({ pid, signal });
      return true;
    }) as typeof process.kill);
  });

  afterEach(() => {
    killSpy.mockRestore();
  });

  it('guardChild returns the transport it was given (inline-wrap contract)', () => {
    const child: GuardedChild = { pid: 11111 };
    expect(guardChild(child)).toBe(child);
    _reapForTest();
  });

  it('reaps a registered child with SIGTERM', () => {
    guardChild({ pid: 22222 });
    const count = _reapForTest();
    expect(count).toBe(1);
    expect(killed).toEqual([{ pid: 22222, signal: 'SIGTERM' }]);
  });

  it('does NOT reap a released (gracefully closed) child', () => {
    const child: GuardedChild = { pid: 33333 };
    guardChild(child);
    releaseChild(child);
    _reapForTest();
    expect(killed).toEqual([]);
  });

  it('skips pid-less transports (never spawned / already dead) without error', () => {
    guardChild({ pid: null });
    guardChild({});
    expect(() => _reapForTest()).not.toThrow();
    expect(killed).toEqual([]);
  });

  it('a second reap pass is a no-op (children reaped once)', () => {
    guardChild({ pid: 44444 });
    _reapForTest();
    killed.length = 0;
    expect(_reapForTest()).toBe(0);
    expect(killed).toEqual([]);
  });

  it('reaps via the pid SNAPSHOT when the transport pid was nulled (SDK close-window)', () => {
    // The SDK's close() nulls its _process (and .pid) IMMEDIATELY, then waits ~2s for the
    // child to exit — a signal landing in that window must still reap the live child.
    const transport: GuardedChild = { pid: null };
    guardChild(transport);
    transport.pid = 55555; // child spawns (connect)
    noteChildPid(transport); // caller snapshots post-connect
    transport.pid = null; // SDK close() begins: pid unreadable, child still alive
    _reapForTest();
    expect(killed).toEqual([{ pid: 55555, signal: 'SIGTERM' }]);
  });

  it('noteChildPid on an unregistered transport is a no-op', () => {
    const transport: GuardedChild = { pid: 66666 };
    noteChildPid(transport); // never guarded
    _reapForTest();
    expect(killed).toEqual([]);
  });
});
