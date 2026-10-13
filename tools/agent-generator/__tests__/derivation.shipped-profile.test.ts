/**
 * derivation.shipped-profile.test.ts — Spec 123 Task 29.4: THE STANDING APPLICATION of the 11.4
 * derivation check to the SHIPPED material (G2-F2; the G2 spec-text ruling R3; Peter's PR-5.4;
 * Stacy's condition (a)).
 *
 * WHAT IT RUNS ON: the committed consumer profile (`canonical/profiles/consumer/**`) and every
 * committed target rendering under `canonical/_consumer-output/{_canonical,cc,kiro}/**`, including
 * the Kiro agent JSON. `consumer-entry.parity.test.ts` (Task 16.1) ties those renderings to what
 * `dist/consumer-canonical` emits, so they are the shipped material. Surfaces, per-target pooling
 * and row aggregation are `checkShippedProfile`'s (derivation.ts, the § "THE STANDING APPLICATION").
 *
 * WHERE IT RUNS: `npm run test:agent-generator` (this file is selected by the colocated jest config's
 * `**\/__tests__/**\/*.test.ts`), the step in the required `Lane Timing / lane-functional-root` job,
 * on every PR, with its selection floor. No workflow edit, no new context.
 *
 * IT CANNOT PASS ON ZERO ROWS (Stacy R-8): the evaluated row count must EQUAL the count of
 * `re-pointed` rows read independently from the committed dispositions (not a literal), and be
 * non-zero. The root defaults to the repo; `U3G_SHIPPED_ROOT` points it at a planted copy for the
 * recorded bite (`__fixtures__/semantics-guard/__bites__/task-29-4-*`).
 *
 * WHAT IT DOES NOT ESTABLISH: that S's FUNCTION survives in the destination (the C18 floor and the
 * signer's); a hollowing in place with S as its destination (the ruling's named limit); that the
 * renderings are fresh against the generator (the 122 diff guard's).
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { checkShippedProfile, consumerDispositionsFiles, type ShippedRow } from '../regrounding/derivation';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const ROOT = process.env.U3G_SHIPPED_ROOT ?? REPO_ROOT;

/** The re-pointed rows the committed dispositions declare, read independently of the checker. */
function declaredRepointed(root: string): number {
  let n = 0;
  for (const rel of consumerDispositionsFiles(root)) {
    const doc = loadYaml(fs.readFileSync(path.join(root, rel), 'utf8')) as Record<string, Record<string, { disposition?: string }> | undefined>;
    for (const lane of ['body', 'frontmatter', 'members']) for (const row of Object.values(doc[lane] ?? {})) if (row?.disposition === 're-pointed') n += 1;
  }
  return n;
}

/** The standing assertions, as one function so the in-suite bites run exactly what the guard runs. */
function standing(root: string): { count: number; failures: string[] } {
  const rows = checkShippedProfile(root);
  const declared = declaredRepointed(root);
  if (declared === 0 || rows.length !== declared) throw new Error(`standing application: evaluated ${rows.length} rows, the committed dispositions declare ${declared} re-pointed rows — the count must be equal and non-zero`);
  const failures = rows.filter((r) => r.verdict !== 'VERIFIED').map((r: ShippedRow) => `${r.dispositionsFile}#${r.key} → ${r.destination}: ${r.verdict} ${JSON.stringify(r.perSurface)}`);
  return { count: rows.length, failures };
}

describe('the 11.4 check on the shipped profile (G2-F2; ruling R3)', () => {
  const result = standing(ROOT);

  it('evaluates every re-pointed row the committed dispositions declare — a derived, non-zero count', () => {
    console.log(`standing application: ${result.count} re-pointed rows evaluated (= the committed dispositions' count)`);
    expect(result.count).toBe(declaredRepointed(ROOT));
    expect(result.count).toBeGreaterThan(0);
  });

  it('every re-pointed row is VERIFIED on every surface that carries its source file', () => {
    expect(result.failures).toEqual([]);
  });

  it('the surfaces are the ruling’s: body on _canonical + every declared target; frontmatter and members on the declared targets; Kiro pools prompt + JSON', () => {
    const rows = checkShippedProfile(ROOT);
    const body = rows.filter((r) => r.lane === 'body');
    const fm = rows.filter((r) => r.lane === 'frontmatter');
    expect(body.length).toBeGreaterThan(0);
    expect(fm.length).toBeGreaterThan(0);
    expect(body.every((r) => Object.keys(r.perSurface).sort().join(',') === '_canonical,cc,kiro')).toBe(true);
    expect(fm.every((r) => Object.keys(r.perSurface).sort().join(',') === 'cc,kiro')).toBe(true);
  });
});

describe('the standing application bites (in a temp copy of the shipped inputs)', () => {
  /** Copy what `checkShippedProfile` reads: the profile, the consumer output and every cited source. */
  function copyInputs(): string {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'u3g-shipped-'));
    const copy = (rel: string): void => fs.cpSync(path.join(REPO_ROOT, rel), path.join(tmp, rel), { recursive: true });
    for (const rel of ['canonical/profiles/consumer', 'canonical/_consumer-output', 'canonical/consumer-profile.yaml']) copy(rel);
    for (const rel of consumerDispositionsFiles(REPO_ROOT)) copy((loadYaml(fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8')) as { source: string }).source);
    return tmp;
  }
  const STACY = 'canonical/profiles/consumer/stacy.dispositions.yaml';
  const S = '#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script';
  const T = '#the-trigger-set-the-114-superset-table-names-never-numbers';

  it('the copy is faithful: unplanted, it is clean with the same count', () => {
    const tmp = copyInputs();
    try {
      expect(standing(tmp)).toEqual({ count: declaredRepointed(REPO_ROOT), failures: [] });
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('E3 — plant one rejected row (C1: S’s committed re-grounding, destination its sibling) → the guard reports exactly that row', () => {
    const tmp = copyInputs();
    try {
      const file = path.join(tmp, STACY);
      const text = fs.readFileSync(file, 'utf8');
      const planted = text.replace(`"destination": "${S}"`, `"destination": "${T}"`);
      expect(planted).not.toBe(text);
      fs.writeFileSync(file, planted);
      const { failures } = standing(tmp);
      expect(failures).toHaveLength(1);
      expect(failures[0]).toContain(`${STACY}#${S} → ${T}: FAIL_DISHONEST_NAMING`);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('E2 — with the dispositions removed the guard refuses to pass on zero rows', () => {
    const tmp = copyInputs();
    try {
      for (const rel of consumerDispositionsFiles(tmp)) fs.rmSync(path.join(tmp, rel));
      expect(() => standing(tmp)).toThrow('the count must be equal and non-zero');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
