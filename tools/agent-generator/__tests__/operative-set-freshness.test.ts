/**
 * operative-set-freshness.test.ts — Spec 123 Task 13.6 (design C16; design § "Testing Strategy":
 * "operative-set freshness — edit a canonical unit without re-confirming — red").
 *
 *   (i)  the STANDING test: `npx tsx tools/agent-generator/diff-guard.ts` against the committed
 *        stale-unit fixture exits non-zero, naming the stale hash. It catches a future
 *        restructure that drops the sweep from the guard;
 *   (v)  the ABSORPTION of the Task 11 precursor test (`src/__tests__/operative-set-records.test.ts`,
 *        deleted in this change): each of its assertions is shown to bite THROUGH THE SWEEP here —
 *        one `absorbs:` test per assertion, named after it;
 *   plus the other call sets the sweep runs (dispositions, signatures, overlays) and the guard's
 *   ordering (the sweep runs before the lock's no-op path).
 */
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { runGuard } from '../diff-guard';
import { runFreshnessSweep, surfaceGlobs, type FreshnessOptions } from '../regrounding/freshness';
import { hashText } from '../regrounding/hash';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FIXTURE = 'tools/agent-generator/__fixtures__/stale-unit';
const STALE = 'sha256:13d322a0e44fa36b7bee580b15fe2134c24783138fb2d6087302b8d8a39c6ad4';
const FRESH = 'sha256:c15f9d64f00a7acd9c6c200a49b0891f09bd34e439e68d703877cfe076ecac2c';
const RECORD = 'canonical/operative-sets/fixture.yaml';
const NOTE = 'canonical/profiles/consumer/confirmations/fixture.md';
const CHARTER = 'canonical/agents/fixture.md';

let root: string;
const read = (rel: string) => fs.readFileSync(path.join(root, rel), 'utf8');
const write = (rel: string, text: string) => {
  fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
  fs.writeFileSync(path.join(root, rel), text);
};
const edit = (rel: string, from: string | RegExp, to: string) => {
  const before = read(rel);
  const after = before.replace(from, to);
  expect(after).not.toBe(before); // the mutation really applied
  write(rel, after);
};
const allFiles = (): Set<string> => {
  const out = new Set<string>();
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else out.add(path.relative(root, p).split(path.sep).join('/'));
    }
  };
  walk(root);
  return out;
};
const sweep = (opts: FreshnessOptions = {}) => runFreshnessSweep(root, { tracked: allFiles(), ...opts });
const checks = (opts?: FreshnessOptions) => sweep(opts).findings.map((f) => f.check);

/** A FRESH copy of the stale-unit fixture (hashes re-pinned to the current unit) — the clean baseline. */
beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'freshness-'));
  fs.cpSync(path.join(REPO_ROOT, FIXTURE, 'canonical'), path.join(root, 'canonical'), { recursive: true });
  edit(RECORD, STALE, FRESH);
  edit(NOTE, STALE, FRESH);
});
afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

describe('(i) STANDING — the guard CLI against the committed stale-unit fixture', () => {
  it('npx tsx tools/agent-generator/diff-guard.ts --root <stale-unit> exits non-zero naming the stale canonicalHash', () => {
    const run = spawnSync('npx', ['tsx', 'tools/agent-generator/diff-guard.ts', '--root', FIXTURE], { cwd: REPO_ROOT, encoding: 'utf8' });
    expect(run.status).not.toBe(0);
    expect(run.stderr).toContain('diff-guard: FAIL (operative-set-freshness)');
    expect(run.stderr).toContain(
      `[operative-set-freshness] operative set ${RECORD} #alpha: canonicalHash ${STALE} is stale — the canonical unit is now ${FRESH}; the C1 confirmer re-confirms the unit's set (C16)`
    );
    // The staleness is the fixture's ONLY defect, so the failure is the sweep's and nothing else's.
    expect(run.stderr.split('\n').filter((l) => l.startsWith('  ['))).toHaveLength(1);
  }, 60_000);
});

describe('the sweep over the real repo', () => {
  it('is clean, and not vacuous (absorbs: "finds records to check (non-vacuity)")', () => {
    const report = runFreshnessSweep(REPO_ROOT);
    expect(report.findings).toEqual([]);
    expect(report.counts.records).toBeGreaterThanOrEqual(4);
    expect(report.counts.units).toBeGreaterThanOrEqual(24);
    expect(report.counts.notes).toBeGreaterThanOrEqual(4);
  });

  it('guards the two canonical globs the coverage map lists under 122-diff-guard', () => {
    expect(surfaceGlobs()).toEqual(['canonical/operative-sets/**', 'canonical/profiles/consumer/**']);
  });
});

describe('(v) the precursor test, absorbed — each assertion bites through the sweep', () => {
  it('the fresh fixture copy is clean (the baseline every mutation below departs from)', () => {
    expect(sweep().findings).toEqual([]);
  });

  it('absorbs: "edit a canonical unit without re-confirming" / "fresh canonicalHash"', () => {
    edit(CHARTER, 'completion.', 'completion. Again.');
    expect(sweep().findings.map((f) => f.message)).toEqual([
      `operative set ${RECORD} #alpha: canonicalHash ${FRESH} is stale — the canonical unit is now ${hashText(
        read(CHARTER).slice(read(CHARTER).indexOf('# Fixture'))
      )}; the C1 confirmer re-confirms the unit's set (C16)`,
    ]);
  });

  it('absorbs: "declares the confirmer the C1 function requires"', () => {
    edit(RECORD, 'confirmer: lina', 'confirmer: stacy');
    expect(checks()).toContain('wrong-confirmer');
  });

  it('absorbs: "names a source file that exists"', () => {
    fs.rmSync(path.join(root, CHARTER));
    expect(sweep().findings.map((f) => f.message)).toEqual([`operative set ${RECORD}: source ${CHARTER} does not exist`]);
  });

  it('absorbs: "keys every unit by a current partition anchor" (the orphaned-key refusal)', () => {
    edit(CHARTER, '## Alpha', '## Omega');
    expect(checks()).toContain('orphaned-key');
  });

  it('absorbs: "item text verbatim from its unit"', () => {
    edit(RECORD, 'text: Always run the suite before completion.', 'text: Always run the tests before completion.');
    expect(checks()).toEqual(['item-text-not-verbatim']);
  });

  it('absorbs: "unique ids, known kinds, no edge whitespace"', () => {
    edit(RECORD, 'kind: obligation', 'kind: wish');
    expect(checks()).toEqual(['operative-set-format']);
  });

  it('absorbs: "confirmation: fragment names its unit"', () => {
    edit(RECORD, 'fixture.md#alpha', 'fixture.md#beta');
    expect(sweep().findings.map((f) => f.message)).toEqual([`operative set ${RECORD} #alpha: confirmation fragment "#beta" does not name the unit`]);
  });

  it('absorbs: "confirmation note exists"', () => {
    fs.rmSync(path.join(root, NOTE));
    expect(sweep().findings.map((f) => f.message)).toEqual([`operative set ${RECORD} #alpha: confirmation note ${NOTE} does not exist`]);
  });

  it('absorbs: "confirmation note is committed" (git-tracked)', () => {
    const tracked = allFiles();
    tracked.delete(NOTE);
    expect(runFreshnessSweep(root, { tracked }).findings.map((f) => f.message)).toEqual([
      `operative set ${RECORD} #alpha: confirmation note ${NOTE} is not committed`,
    ]);
  });

  it('absorbs: "exactly one note block for the unit" (literal-anchor match; the real-repo run resolves the :preamble units)', () => {
    write(NOTE, read(NOTE) + '\n## `#alpha`\n\nconfirmer: lina\n');
    expect(sweep().findings.map((f) => f.message)).toEqual([`operative set ${RECORD} #alpha: confirmation resolves to 2 note blocks in ${NOTE} (want 1)`]);
  });

  it('absorbs: "note confirmer / canonicalHash / items / date lines match the record"', () => {
    edit(NOTE, 'confirmer: lina', 'confirmer: stacy');
    edit(NOTE, FRESH, STALE);
    edit(NOTE, 'items: fixture-run-suite', 'items: none');
    edit(NOTE, 'date: 2026-09-28', 'date: yesterday');
    expect(sweep().findings.map((f) => f.message)).toEqual([
      `operative set ${RECORD} #alpha: note confirmer stacy ≠ record confirmer lina`,
      `operative set ${RECORD} #alpha: note canonicalHash ≠ record canonicalHash`,
      `operative set ${RECORD} #alpha: note items (0) ≠ record items (1)`,
      `operative set ${RECORD} #alpha: note carries no date: YYYY-MM-DD line`,
    ]);
  });

  it('absorbs: "each record declares at least one unit"', () => {
    write(RECORD, `source: ${CHARTER}\nowner: lina\nconfirmer: lina\nunits: {}\n`);
    expect(sweep().findings.map((f) => f.message)).toEqual([`operative set ${RECORD} declares no units`]);
  });
});

describe('the other call sets the sweep runs', () => {
  const DISP = 'canonical/profiles/consumer/fixture.dispositions.yaml';
  const OVERLAY = 'canonical/profiles/consumer/fixture.overlay.md';
  const rows = (alpha: string) => `source: ${CHARTER}\nbody:\n  "#alpha": ${alpha}\nfrontmatter:\n  agent: { disposition: retained }\n`;

  it('a complete dispositions file is clean; a dropped row and an orphaned key refuse (13.5)', () => {
    write(DISP, rows('{ disposition: retained }'));
    expect(sweep().findings).toEqual([]);
    write(DISP, `source: ${CHARTER}\nbody:\n  "#beta": { disposition: retained }\nfrontmatter:\n  agent: { disposition: retained }\n`);
    expect(checks()).toEqual(['orphaned-key', 'missing-row']);
  });

  it('runs the 13.1 schema (the rejected term)', () => {
    write(DISP, rows('{ disposition: repo-bound-in-entirety }'));
    expect(checks()).toEqual(['repo-bound-in-entirety']);
  });

  const signed = (signer: string) =>
    rows(`\n    disposition: re-pointed\n    destination: "#alpha"\n    signature:\n      signer: ${signer}\n      canonicalHash: ${FRESH}\n      renderedHash: ${FRESH}\n      assent: { surviving: [fixture-run-suite] }\n      evidence: canonical/profiles/consumer/signatures/fixture.md#alpha`);

  it('a signature with no rendered hash available is REFUSED, never half-checked (fail-closed until Task 15)', () => {
    write(DISP, signed('fixture'));
    expect(sweep().findings.map((f) => f.check)).toEqual(['stale-signature']);
    expect(sweep().findings[0].message).toContain('its renderedHash cannot be verified');
  });

  it('with the renderer’s hash supplied: fresh passes, drifted is stale (13.2), wrong signer refuses (13.3)', () => {
    write(DISP, signed('fixture'));
    expect(checks({ renderedHash: () => FRESH })).toEqual([]);
    expect(checks({ renderedHash: () => STALE })).toEqual(['stale-signature']);
    write(DISP, signed('stacy'));
    expect(checks({ renderedHash: () => FRESH })).toEqual(['wrong-signer']);
  });

  it('overlays: a current pin is clean; a stale pin (13.2) and an orphaned key (13.5) refuse; an unpaired overlay refuses', () => {
    write(DISP, rows('{ disposition: re-pointed, destination: "#alpha" }'));
    write(OVERLAY, `## @unit #alpha @ ${FRESH}\nRe-grounded text.\n`);
    expect(sweep().findings).toEqual([]);
    write(OVERLAY, `## @unit #alpha @ ${STALE}\nRe-grounded text.\n## @unit #zeta @ ${FRESH}\nx\n`);
    expect(checks()).toEqual(['orphaned-key', 'stale-overlay']);
    fs.rmSync(path.join(root, DISP));
    expect(checks()).toEqual(['overlay-format']);
  });
});

describe('the guard runs the sweep first, on every run', () => {
  it('runGuard FAILs on a stale unit before the lock or generation is consulted', async () => {
    edit(CHARTER, 'completion.', 'completion. Again.');
    // No lock, no generation inputs in this tree: reaching them would throw, not FAIL.
    const result = await runGuard(root);
    expect(result.verdict).toBe('FAIL');
    expect(result.failedBy).toBe('operative-set-freshness');
    // The temp tree is not a git repo, so the note-is-committed check fails CLOSED alongside the stale hash.
    expect(result.freshness?.findings.map((f) => f.check)).toEqual(['operative-set-freshness', 'confirmation']);
    expect(result.freshness?.findings[1].message).toContain('(git ls-files failed)');
  });
});
