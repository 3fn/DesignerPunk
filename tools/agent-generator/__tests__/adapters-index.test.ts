/**
 * @category evergreen
 * @purpose Verify the TargetAdapter seam's shared parsers against the REAL authored
 *          substrate files: field-dispositions.yaml (incl. the authored fourth
 *          disposition value `handled-elsewhere`) and shared-catalog.yaml (the three
 *          cross-agent members every generated catalog receives).
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseFieldDispositions, parseSharedCatalog } from '../adapters/index';

const SHARED = path.resolve(__dirname, '..', '..', '..', 'canonical', 'shared');

describe('parseFieldDispositions — against the committed C2.3 table', () => {
  const table = parseFieldDispositions(fs.readFileSync(path.join(SHARED, 'field-dispositions.yaml'), 'utf8'));

  it('parses every configFields row with a known disposition kind', () => {
    expect(table.configFields.length).toBeGreaterThanOrEqual(13);
    const kinds = new Set(table.configFields.map((r) => r.cc));
    for (const k of kinds) {
      expect(['carry', 'transform', 'drop-with-reason', 'handled-elsewhere']).toContain(k);
    }
  });

  it('every transform row carries `into`; every drop/handled row carries `reason`', () => {
    for (const row of table.configFields) {
      if (row.cc === 'transform') expect(row.into?.length).toBeGreaterThan(0);
      if (row.cc === 'drop-with-reason' || row.cc === 'handled-elsewhere') {
        expect(row.reason?.length).toBeGreaterThan(0);
      }
    }
  });

  it('carries the two runtime tool-ref rows (taskStatus, getDiagnostics)', () => {
    expect(table.runtimeToolRefs.map((r) => r.ref).sort()).toEqual(['getDiagnostics', 'taskStatus']);
  });
});

describe('parseSharedCatalog — against the committed C2.5 members', () => {
  const members = parseSharedCatalog(fs.readFileSync(path.join(SHARED, 'shared-catalog.yaml'), 'utf8'));

  it('carries the three cross-agent members with their kinds', () => {
    const byId = Object.fromEntries(members.map((m) => [m.id, m.kind]));
    expect(byId['complete-task-tooling']).toBe('command');
    expect(byId['find-docs-discovery']).toBe('tool-cue');
    expect(byId['record-first-ratification']).toBe('governance-rule');
  });
});
