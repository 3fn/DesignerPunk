/**
 * consumer-entry.degradation.test.ts — Spec 123 Task 16.1; Req 13 (2, 5); design C20 ("Degradation
 * in the consumer profile = warn and exit 0"), Testing Strategy row 13 ("delete a resolvable
 * member → warning, exit 0"); Task 16 criterion "Degradation: warning, exit 0".
 *
 * From an installed-package-shaped root, three resolvable members are deleted, one of each kind
 * the lane resolves:
 *   - an IDENTITY DOC (`core-goals`): no member file, no always-layer line, no Kiro resource;
 *   - a GOVERNANCE DOC that an agent embeds (`contract-system-reference`, Lina's ambient law):
 *     no embed in Lina's CC agent, no resource in her Kiro config;
 *   - a declared TOOL (`validate_assembly`, removed from the shipped manifest): no grant, and no
 *     cue routed to it, for every agent that held it.
 * The test asserts the warning TEXT (string-equal: the identity case against the literal string,
 * every case against the catalog function), the charter minus each member with every other
 * file unchanged, and `exit 0` from the CLI. The bite is recorded in the 16.1 completion doc.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { emitConsumer, TOOL_MANIFEST_PATH, type EmitConsumerResult } from '../consumer-entry';
import { consumerDegradationMessage } from '../../../src/cli/shared/errorCatalog';
import { governanceDocPath, identityDocPath, makePackageRoot, REPO_ROOT } from './consumer-entry.helpers';

let tmp: string;
let packageRoot: string;
let consumerRoot: string;
const intact = new Map<string, EmitConsumerResult>();
const degraded = new Map<string, EmitConsumerResult>();

const IDENTITY = 'core-goals';
const EMBEDDED = 'contract-system-reference';
const TOOL = { server: 'designerpunk-application', tool: 'validate_assembly' };

beforeAll(async () => {
  ({ tmp, packageRoot, consumerRoot } = makePackageRoot());
  for (const target of ['cc', 'kiro']) intact.set(target, await emitConsumer({ packageRoot, consumerRoot, target, mode: 'attach' }));
  fs.rmSync(path.join(packageRoot, identityDocPath(IDENTITY)));
  fs.rmSync(path.join(packageRoot, governanceDocPath(EMBEDDED)));
  const manifestPath = path.join(packageRoot, TOOL_MANIFEST_PATH);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as { servers: Record<string, { name: string }[]> };
  manifest.servers[TOOL.server] = manifest.servers[TOOL.server].filter((t) => t.name !== TOOL.tool);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  for (const target of ['cc', 'kiro']) degraded.set(target, await emitConsumer({ packageRoot, consumerRoot, target, mode: 'attach' }));
}, 60_000);

afterAll(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

const byPath = (r: EmitConsumerResult): Map<string, string> => new Map(r.files.map((f) => [f.path, f.content]));
/** The agents whose intact charter granted the tool (read from the intact CC rendering's `tools:`). */
const toolHolders = (): string[] =>
  intact
    .get('cc')!
    .files.filter((f) => f.path.startsWith('.claude/agents/') && f.content.includes(`  - mcp__${TOOL.server}__${TOOL.tool}\n`))
    .map((f) => path.basename(f.path, '.md'))
    .sort();

describe('Req 13 — the warning TEXT', () => {
  test('the identity-doc warning, string-equal to the authored text', () => {
    expect(degraded.get('cc')!.warnings).toContain(
      "warning: identity doc 'core-goals' is missing from the installed @3fn/core (.kiro/steering/) — its identity member file and its always-layer entry were not emitted. " +
        'Generation continued without it; reinstall the package (npm install) to restore it.'
    );
  });

  test.each(['cc', 'kiro'])('%s: exactly one warning per deleted member and holder, each from the catalog', (target) => {
    const holders = toolHolders();
    expect(holders.length).toBeGreaterThan(0);
    const expected = [
      consumerDegradationMessage(`identity doc '${IDENTITY}'`, '.kiro/steering/', 'its identity member file and its always-layer entry were not emitted'),
      ...holders.map((a) => consumerDegradationMessage(`tool '${TOOL.tool}' (${TOOL.server})`, TOOL_MANIFEST_PATH, `${a}'s grant of it, and any cue routed to it, was dropped`)),
      // The deleted doc resolves per ref: one warning per unresolved ambient claim and per route to it.
      ...degraded.get(target)!.warnings.filter((w) => w.includes(`governance doc '${EMBEDDED}'`)),
    ];
    const docWarnings = degraded.get(target)!.warnings.filter((w) => w.includes(`governance doc '${EMBEDDED}'`));
    const tail = ' is missing from the installed @3fn/core (governance/) — ';
    const embed = docWarnings.filter((w) => /^warning: section '.+' of governance doc 'contract-system-reference' is missing from the installed @3fn\/core \(governance\/\) — [a-z]+'s ambient embed of 'contract-system-reference' was dropped\. /.test(w));
    expect(embed.some((w) => w.includes(`${tail}lina's ambient embed of '${EMBEDDED}' was dropped. `))).toBe(true);
    const route = docWarnings.filter((w) => /^warning: (section '.+' of )?governance doc 'contract-system-reference' is missing from the installed @3fn\/core \(governance\/\) — [a-z]+'s route to it was dropped\. /.test(w));
    expect(embed.length + route.length).toBe(docWarnings.length); // every doc warning is one of the two forms
    for (const w of docWarnings) expect(w.endsWith('Generation continued without it; reinstall the package (npm install) to restore it.')).toBe(true);
    expect([...degraded.get(target)!.warnings].sort()).toEqual([...expected].sort());
  });
});

describe('Req 13 — the charter minus the unresolvable member', () => {
  test('cc: no core-goals member file or region line; no contract-system-reference embed; no validate_assembly grant or cue', () => {
    const before = byPath(intact.get('cc')!);
    const after = byPath(degraded.get('cc')!);
    expect(before.has(`.claude/identity/designerpunk-${IDENTITY}.md`)).toBe(true);
    expect(after.has(`.claude/identity/designerpunk-${IDENTITY}.md`)).toBe(false);
    expect(before.get('CLAUDE.md')).toContain(`designerpunk-${IDENTITY}.md`);
    expect(after.get('CLAUDE.md')).toBe(before.get('CLAUDE.md')!.replace(`@.claude/identity/designerpunk-${IDENTITY}.md\n`, ''));
    expect(before.get('.claude/agents/lina.md')).toContain(`### ${EMBEDDED}\n`);
    expect(after.get('.claude/agents/lina.md')).not.toContain(`### ${EMBEDDED}\n`);
    for (const a of toolHolders()) {
      expect(after.get(`.claude/agents/${a}.md`)).not.toContain(`mcp__${TOOL.server}__${TOOL.tool}`);
    }
  });

  test('kiro: no core-goals steering member or resource; no contract-system-reference resource; no granted cue to validate_assembly', () => {
    const before = byPath(intact.get('kiro')!);
    const after = byPath(degraded.get('kiro')!);
    expect(after.has(`.kiro/steering/designerpunk-${IDENTITY}.md`)).toBe(false);
    for (const [p, content] of after) {
      if (!p.endsWith('.json')) continue;
      expect(content).not.toContain(`designerpunk-${IDENTITY}.md`);
    }
    expect(before.get('.kiro/agents/lina.json')).toContain('Contract-System-Reference.md');
    expect(after.get('.kiro/agents/lina.json')).not.toContain('Contract-System-Reference.md');
    for (const a of toolHolders()) {
      expect(before.get(`.kiro/agents/${a}-prompt.md`)).toContain(`THEN use ${TOOL.tool} (application MCP)`);
      expect(after.get(`.kiro/agents/${a}-prompt.md`)).not.toContain(`THEN use ${TOOL.tool} (`);
    }
  });

  test('every file the deleted members do not touch is byte-unchanged', () => {
    const touched = (p: string): boolean =>
      p === 'CLAUDE.md' || p.includes(IDENTITY) || p.startsWith('.claude/agents/') || p.startsWith('.kiro/agents/');
    for (const target of ['cc', 'kiro']) {
      const before = byPath(intact.get(target)!);
      const after = byPath(degraded.get(target)!);
      for (const [p, content] of before) if (!touched(p)) expect({ p, content: after.get(p) }).toEqual({ p, content });
    }
    // An agent whose intact rendering names neither the deleted doc nor the dropped tool is untouched too.
    const spare = intact
      .get('cc')!
      .files.filter((f) => f.path.startsWith('.claude/agents/') && !f.content.includes(EMBEDDED) && !f.content.includes(TOOL.tool))
      .map((f) => path.basename(f.path, '.md'));
    expect(spare.length).toBeGreaterThan(0);
    for (const a of spare) {
      expect(byPath(degraded.get('cc')!).get(`.claude/agents/${a}.md`)).toBe(byPath(intact.get('cc')!).get(`.claude/agents/${a}.md`));
    }
  });
});

describe('Req 13 — exit 0', () => {
  test('the CLI prints every warning and exits 0', () => {
    const tsxCli = require.resolve('tsx/cli');
    const entry = path.join(REPO_ROOT, 'tools/agent-generator/consumer-entry.ts');
    const run = spawnSync(process.execPath, [tsxCli, entry, '--target', 'cc', '--package-root', packageRoot, '--consumer-root', consumerRoot], {
      cwd: consumerRoot,
      encoding: 'utf8',
    });
    expect(run.status).toBe(0);
    const printed = run.stderr.split('\n').filter((l) => l.length > 0);
    expect(printed).toEqual(degraded.get('cc')!.warnings);
  }, 60_000);
});
