/**
 * @category evergreen
 * @purpose Spec 123 Task 16.5 — the release-1 cohort and legacy migration (tasks.md Task 16 criteria
 * "Legacy migration" and "The release-1 cohort"; design.md § "C7" Migration item 4 and its tasks-round
 * erratum, Ada D-T-B2). Instrument rows 5.1–5.2 and 6.1–6.4.
 *
 * The fixture is `fixtures/release-1-cohort/` — the manifest release-1 `init` wrote (current format, 124
 * `origin: 'copy'` entries under `.kiro/agents` / `.kiro/steering` / `governance`) and the file list it
 * copied, drift-guarded by `cohort.fixture.test.ts`; it is read here, never regenerated. The fixture holds
 * no file contents (its README says so), so the on-disk tree is SYNTHESIZED at the fixture's paths. Where a
 * case needs "unmodified" copies, the copy entries' hashes are re-bound, in memory, to the synthesized
 * bytes; every other field (origin, grain, path, the key and generated entries) is the fixture's.
 *
 * Asserted:
 *  - `sync` REPORTS the copies as legacy copies and OFFERS `--migrate-legacy` + attach; none is classified
 *    (no `conflict`, no `removed`, nothing else) — not even `.kiro/agents/ada.json`, a generated path on Kiro;
 *  - after `--migrate-legacy` (removal, then attach, one flow): ZERO `origin: 'copy'` entries remain under
 *    those paths, and the next `sync` does not re-detect the repo as a cohort member;
 *  - `--migrate-legacy` is NEVER offered without the attach step, and refuses (removing nothing) without it.
 *
 * Bite (recorded in completion/task-16-5-completion.md): key the detection on the manifest's version
 * instead of `origin` → the cohort case goes red.
 */

import * as fs from 'fs';
import * as path from 'path';
import { runSync } from '../sync';
import { MANIFEST_FILE, COPY_ROOTS, parseManifest, serializeManifest, isUnder } from '../sync/Manifest';
import type { DesignerPunkManifest } from '../sync/Manifest';
import {
  legacyCopiesMessage,
  migrateLegacyOfferMessage,
  migrateLegacyUnavailableMessage,
  migrateLegacyRefusedMessage,
  legacyCopyEntries,
} from '../sync/Migration';
import { attachUsage } from '../shared/vocabulary';
import {
  restartLineSequencedMessage,
  personalNoteNamingMessage,
  personalNoteCreatedMessage,
  personalNoteUnfilledMessage,
} from '../shared/errorCatalog';
import { REPO_ROOT, createScratch, writeFile, readText, captureConsole, dirHash, sha } from './syncTestKit';

const FIXTURE_DIR = path.join(__dirname, 'fixtures/release-1-cohort');
const FIXTURE_MANIFEST_TEXT = fs.readFileSync(path.join(FIXTURE_DIR, 'manifest.json'), 'utf-8');
const FILE_LIST = JSON.parse(fs.readFileSync(path.join(FIXTURE_DIR, 'file-list.json'), 'utf-8')) as Record<string, string[]>;
const COHORT_ROOTS = ['.kiro/agents', '.kiro/steering', 'governance'];
const COHORT_PATHS = COHORT_ROOTS.flatMap((root) => FILE_LIST[root].map((f) => `${root}/${f}`));

const DECLARED = ['cc', 'kiro'];

const synthesized = (rel: string) => `release-1 copy of ${rel}\n`;

function copyEntriesUnderCohortRoots(m: DesignerPunkManifest): string[] {
  return Object.entries(m.entries)
    .filter(([k, e]) => e.origin === 'copy' && COHORT_ROOTS.some((r) => isUnder(k, r)))
    .map(([k]) => k);
}

/**
 * A born consumer repo (config + tier), the real package installed under node_modules, the fixture's
 * manifest, and the copied tree synthesized at the fixture's paths. `rebind` re-binds the copy hashes to the
 * synthesized bytes (so the copies read as unmodified).
 */
function cohortRepo(scratch: string, opts: { rebind: boolean; installPackage?: boolean; born?: boolean }): DesignerPunkManifest {
  if (opts.born !== false) {
    writeFile(scratch, 'src/tokens/index.ts', '\nexport function getAllPrimitiveTokens() { return []; }\n');
    writeFile(scratch, 'src/tokens/semantic/index.ts', '\nexport function getAllSemanticTokens() { return []; }\n');
    writeFile(scratch, 'designerpunk.config.ts', `export default { name: 'CohortFixture', abbreviation: 'CF', tokenSource: './src/tokens' };\n`);
  }
  fs.mkdirSync(path.join(scratch, '.git'));
  if (opts.installPackage !== false) {
    fs.mkdirSync(path.join(scratch, 'node_modules/@3fn'), { recursive: true });
    fs.symlinkSync(REPO_ROOT, path.join(scratch, 'node_modules/@3fn/core'), 'dir');
  }
  const m = parseManifest(FIXTURE_MANIFEST_TEXT);
  for (const rel of COHORT_PATHS) {
    writeFile(scratch, rel, synthesized(rel));
    if (opts.rebind) m.entries[rel] = { ...m.entries[rel], hash: sha(synthesized(rel)) };
  }
  writeFile(scratch, MANIFEST_FILE, serializeManifest(m));
  return m;
}

describe('sync — the release-1 cohort (Task 16.5)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;
  beforeEach(() => {
    scratch = createScratch('dp-sync-cohort-');
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('the fixture as captured: REPORTED as legacy copies, --migrate-legacy + attach OFFERED, none classified (no conflict, not silent)', async () => {
    const m = cohortRepo(scratch, { rebind: false });
    expect(legacyCopyEntries(m.entries)).toHaveLength(124);
    const before = dirHash(scratch);

    const out = await runSync({ projectRoot: scratch, dryRun: true });

    // Reported (never silently beside the generated agents).
    expect(out.legacyCopies).toBeDefined();
    expect(con.output()).toContain(legacyCopiesMessage(124, COHORT_ROOTS));
    // Offered — with the attach step named, and only because attach is available here.
    expect(out.attach).toEqual({ available: true, targets: ['cc', 'kiro'], declared: DECLARED });
    expect(con.output()).toContain(migrateLegacyOfferMessage(['cc', 'kiro'], DECLARED));
    expect(migrateLegacyOfferMessage(['cc', 'kiro'], DECLARED)).toContain(attachUsage());
    // Never classified — not as a conflict, not as anything (incl. `.kiro/agents/ada.json`, a generated Kiro path).
    const g = out.generated!.files;
    const classified = [...g.new, ...g.updatedSafe, ...g.conflicts, ...g.unchanged, ...g.removed, ...g.deletedByYou, ...g.untrackedNew, ...g.adoptable]
      .map((f) => f.relativePath);
    for (const rel of COHORT_PATHS) expect(classified).not.toContain(rel);
    expect(COHORT_PATHS).toContain('.kiro/agents/ada.json');
    expect(out.generated!.contents.has('.kiro/agents/ada.json')).toBe(true); // the package DOES emit that path
    expect(dirHash(scratch)).toEqual(before);
  });

  test('--migrate-legacy creates the personal note and prints the NAMING row (never the "created" row or the warning), BEFORE the sequenced restart row, which stays last (Task 22.1; R3)', async () => {
    cohortRepo(scratch, { rebind: true });
    const out = await runSync({ projectRoot: scratch, isTTY: false, migrateLegacy: true });
    expect(out.personalNote).toBe('created');
    expect(fs.existsSync(path.join(scratch, '.designerpunk/personal-note.local.md'))).toBe(true);
    const lines = con.output().split('\n');
    const naming = lines.indexOf(`ℹ️  ${personalNoteNamingMessage()}`);
    expect(naming).toBeGreaterThan(-1);
    expect(lines.indexOf(`ℹ️  ${personalNoteCreatedMessage()}`)).toBe(-1);
    expect(lines.indexOf(`⚠️  ${personalNoteUnfilledMessage()}`)).toBe(-1);
    expect(naming).toBeLessThan(lines.indexOf(restartLineSequencedMessage()));
  });

  test('--migrate-legacy: removal THEN attach in one flow — ZERO origin:"copy" entries remain; edits are kept as hers; the next sync does not re-detect the cohort', async () => {
    cohortRepo(scratch, { rebind: true });
    const EDITED_GOV = 'governance/Token-Governance.md';
    const EDITED_KIRO = '.kiro/agents/lina-prompt.md'; // an edited copy on a generated Kiro path
    const DELETED = '.kiro/steering/core-goals.md';
    expect(COHORT_PATHS).toEqual(expect.arrayContaining([EDITED_GOV, EDITED_KIRO, DELETED]));
    writeFile(scratch, EDITED_GOV, 'her edits to the copied governance doc\n');
    writeFile(scratch, EDITED_KIRO, 'her edits to the copied prompt\n');
    fs.rmSync(path.join(scratch, DELETED));

    const out = await runSync({ projectRoot: scratch, isTTY: false, migrateLegacy: true });

    // One flow, removal first, then the attach step for each target.
    const steps = out.trace.filter((t) => t.startsWith('migrate-legacy:') || t.startsWith('attach:'));
    expect(steps).toEqual([`migrate-legacy:removed:${124 - 3}`, 'attach:cc', 'attach:kiro']);
    expect(out.legacyRemoval!.keptAsYours.sort()).toEqual([EDITED_KIRO, EDITED_GOV].sort());
    expect(out.legacyRemoval!.dropped).toEqual([DELETED]);

    const after = parseManifest(readText(scratch, MANIFEST_FILE));
    expect(copyEntriesUnderCohortRoots(after)).toEqual([]);
    expect(Object.values(after.entries).filter((e) => e.origin === 'copy')).toEqual([]);
    // Replaced by generated.
    expect(after.entries['.kiro/agents/ada.json']).toMatchObject({ grain: 'file', origin: 'generated' });
    expect(after.entries['.kiro/steering/designerpunk-core-goals.md']).toMatchObject({ origin: 'generated' });
    expect(after.entries['.claude/agents/ada.md']).toMatchObject({ origin: 'generated' });
    expect(after.attachedTargets).toEqual(['cc', 'kiro']);
    // Disk: unmodified copies gone; her edits kept, untouched, untracked (attach reported the Kiro one as a collision).
    expect(fs.existsSync(path.join(scratch, 'governance/Agent-Directory.md'))).toBe(false);
    expect(fs.existsSync(path.join(scratch, '.kiro/steering/personal-note.md'))).toBe(false);
    expect(fs.existsSync(path.join(scratch, '.kiro/agents/ada.json.attribution.json'))).toBe(false);
    expect(readText(scratch, EDITED_GOV)).toBe('her edits to the copied governance doc\n');
    expect(readText(scratch, EDITED_KIRO)).toBe('her edits to the copied prompt\n');
    expect(after.entries[EDITED_KIRO]).toBeUndefined();
    expect(readText(scratch, '.kiro/agents/ada.json')).not.toBe(synthesized('.kiro/agents/ada.json'));
    // The restart row is the final line, as born-repo attach prints it.
    expect(con.output().trimEnd().endsWith(restartLineSequencedMessage())).toBe(true);

    // Never re-detected as a cohort member.
    const again = await runSync({ projectRoot: scratch, dryRun: true });
    expect(again.legacyCopies).toBeUndefined();
    expect(again.attach).toBeUndefined();
  });
});

describe('sync — --migrate-legacy is offered ONLY with the attach step (Task 16.5; T-L1, design Migration item 4)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;
  beforeEach(() => {
    scratch = createScratch('dp-sync-legacy-gate-');
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  /** Every line naming --migrate-legacy as something to run must carry the attach step with its object. */
  function offerLines(output: string): string[] {
    return output.split('\n').filter((l) => l.includes('sync --migrate-legacy'));
  }

  test('attach unavailable (no agent-layer lane): NOT offered; the copies are reported; --migrate-legacy refuses and removes nothing', async () => {
    cohortRepo(scratch, { rebind: true });
    const reason = 'the agent-layer lane is unavailable';

    const report = await runSync({ projectRoot: scratch, dryRun: true, agentLayer: null });
    expect(report.attach).toEqual({ available: false, reason });
    expect(con.output()).toContain(legacyCopiesMessage(124, COHORT_ROOTS));
    expect(con.output()).toContain(migrateLegacyUnavailableMessage(reason));
    expect(offerLines(con.output())).toEqual([]);

    const before = dirHash(scratch);
    const out = await runSync({ projectRoot: scratch, isTTY: false, migrateLegacy: true, agentLayer: null });
    expect(out.trace).toContain('migrate-legacy:refused');
    expect(out.trace.some((t) => t.startsWith('attach:') || t.startsWith('migrate-legacy:removed'))).toBe(false);
    expect(con.output()).toContain(migrateLegacyRefusedMessage(reason));
    // Task 22.1 (mechanism B): a born-posture `sync` creates the personal note when it is absent, so the
    // refused run's only write is the note. "Removes nothing" still holds for every other byte.
    expect(out.personalNote).toBe('created');
    fs.rmSync(path.join(scratch, '.designerpunk'), { recursive: true, force: true });
    expect(dirHash(scratch)).toEqual(before);
    expect(copyEntriesUnderCohortRoots(parseManifest(readText(scratch, MANIFEST_FILE)))).toHaveLength(124);
  });

  test('attach would refuse the repo (not born): NOT offered; --migrate-legacy removes nothing', async () => {
    cohortRepo(scratch, { rebind: true, born: false });
    const out = await runSync({ projectRoot: scratch, dryRun: true });
    expect(out.attach?.available).toBe(false);
    expect(offerLines(con.output())).toEqual([]);

    const before = dirHash(scratch);
    const run = await runSync({ projectRoot: scratch, isTTY: false, migrateLegacy: true });
    expect(run.trace).toContain('migrate-legacy:refused');
    expect(dirHash(scratch)).toEqual(before);
  });

  test('when offered, every line naming --migrate-legacy carries the attach step (attach a harness …), never the removal alone', async () => {
    cohortRepo(scratch, { rebind: true });
    await runSync({ projectRoot: scratch, dryRun: true });
    const lines = offerLines(con.output());
    expect(lines.length).toBeGreaterThan(0);
    for (const l of lines) expect(l).toContain(attachUsage());
  });

  // This is the standing pin of the literal. The 119-A relocation-integrity gate's leg A7 also held it until that leg
  // was retired (Peter, 2026-10-01; .kiro/issues/2026-10-01-relocation-integrity-gate-vs-123-install-shape.md).
  test('COPY_ROOTS keeps the release-1 roots it recognizes (this test is the pin; the 119-A gate leg A7 that also held it is retired)', () => {
    expect([...COPY_ROOTS]).toEqual(['.kiro/agents', '.kiro/steering', 'governance', '.kiro/skills']);
  });
});
