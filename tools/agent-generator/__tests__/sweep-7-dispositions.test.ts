/**
 * Sweep 7 (config-field disposition) tests — Spec 122 Task 7.2.
 * Prove-it-bites: add a fake config key (Req 19 AC2).
 */

import { runSweep7, uncoveredKeyPaths } from '../sweeps/sweep-7-dispositions';
import type { FieldDispositionTable } from '../adapters/index';

const table: FieldDispositionTable = {
  configFields: [
    { field: 'name', cc: 'handled-elsewhere', reason: 'identity' },
    { field: 'keyboardShortcut', cc: 'drop-with-reason', reason: 'no hotkeys' },
    { field: 'hooks.agentSpawn', cc: 'transform', into: 'pre-flight note' },
    { field: 'toolsSettings.write.allowedPaths', cc: 'transform', into: 'write-scope note' },
  ],
  runtimeToolRefs: [],
};

describe('sweep 7 — config-field disposition', () => {
  it('passes a config whose every key path is covered (mixed granularity)', () => {
    const report = runSweep7({
      configs: [
        {
          agent: 'ada',
          config: {
            name: 'Ada',
            keyboardShortcut: 'ctrl+shift+a',
            hooks: { agentSpawn: [{ command: 'x', timeout_ms: 1 }] },
            toolsSettings: { write: { allowedPaths: ['src/tokens/**'] } },
          },
        },
      ],
      dispositions: table,
    });
    expect(report.pass).toBe(true);
  });

  it('PROVE-IT-BITES: a fake config key FAILS, naming the exact dotted path', () => {
    const report = runSweep7({
      configs: [{ agent: 'ada', config: { name: 'Ada', fakeInventedField: true } }],
      dispositions: table,
    });
    expect(report.pass).toBe(false);
    expect(report.findings[0].path).toBe('fakeInventedField');
    expect(report.findings[0].agent).toBe('ada');
  });

  it('an unknown NESTED path under a finer-grained parent fails at its own path', () => {
    const config = {
      name: 'Ada',
      toolsSettings: { write: { allowedPaths: [], sneakyExtra: 1 } },
      hooks: { agentSpawn: [], onExit: [] },
    };
    const uncovered = uncoveredKeyPaths(config, table);
    expect(uncovered).toEqual(['toolsSettings.write.sneakyExtra', 'hooks.onExit']);
  });

  it('arrays are leaves — table grain never enters array elements', () => {
    const uncovered = uncoveredKeyPaths(
      { hooks: { agentSpawn: [{ command: 'x', notAField: true }] } },
      table
    );
    expect(uncovered).toEqual([]);
  });

  it('records a vacuous PASS on zero configs', () => {
    const report = runSweep7({ configs: [], dispositions: table });
    expect(report.pass).toBe(true);
    expect(report.findings[0].verdict).toBe('INFO');
  });
});
