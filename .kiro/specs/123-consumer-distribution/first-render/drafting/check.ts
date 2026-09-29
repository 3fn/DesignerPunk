import * as fs from 'fs';
const { load: loadYaml } = require(process.cwd() + '/node_modules/js-yaml');
const R = process.cwd() + '/';
const AG = R + 'tools/agent-generator/';
const { splitFrontmatter } = require(AG + 'frontmatter');
const { partition, entryTree } = require(AG + 'partition');
const { validateDispositions } = require(AG + 'regrounding/dispositions');
const { checkDispositionKeys, keyUniverseOf, derive } = require(AG + 'derive');
const { parseOverlay } = require(AG + 'regrounding/overlay');
const { checkOperativeSet } = require(AG + 'regrounding/operative-sets');
const { classifyCharter, entrySet } = require(AG + 'regrounding/triviality');
const { validate } = require(AG + 'pipeline');
const [source, prefix, record] = process.argv.slice(2);
const text = fs.readFileSync(R + source, 'utf8');
const { frontmatter, body } = splitFrontmatter(text, source);
const dispFile = `canonical/profiles/consumer/${prefix}.dispositions.yaml`;
const disp = loadYaml(fs.readFileSync(R + dispFile, 'utf8'));
const tree = entryTree(frontmatter ?? {});
const out: string[] = [];
for (const f of validateDispositions(disp, dispFile, { entries: disp.counterpart ? undefined : tree })) out.push(`schema: ${f.message}`);
for (const f of checkDispositionKeys(disp, dispFile, keyUniverseOf(source, text))) out.push(`keys: ${f.message}`);
const ovPath = R + `canonical/profiles/consumer/${prefix}.overlay.md`;
const overlay = fs.existsSync(ovPath) ? parseOverlay(fs.readFileSync(ovPath, 'utf8'), `canonical/profiles/consumer/${prefix}.overlay.md`) : undefined;
let derived: any;
try { derived = derive({ source, frontmatter: disp.counterpart ? {} : frontmatter, body, dispositions: disp, overlay, dispositionsFile: dispFile }); } catch (e) { out.push(`derive: ${(e as Error).message}`); }
const rec = loadYaml(fs.readFileSync(R + `canonical/operative-sets/${record}.yaml`, 'utf8'));
const units = new Map(partition(body).units.map((u: any) => [u.anchor, u.text]));
for (const f of checkOperativeSet(rec, record, units)) out.push(`record: ${f.message}`);
if (derived && !disp.counterpart) {
  const v = validate({ frontmatter: derived.frontmatter, body: derived.body, sourcePath: 'x' }, ['personal-note','core-goals','ai-collaboration-principles','spec-feedback-protocol','start-up-tasks','task-completion-protocol','agent-directory','designerpunk-systems-overview','civitas-system-overview']);
  for (const e of v.schemaErrors) out.push(`validate: ${e.message}`);
  for (const e of v.duplicationErrors) out.push(`validate-dup: line ${e.line} ${e.matchedPhrase}`);
}
// triviality: rendered unit texts = canonical for retained, overlay text for re-pointed
const rendered = new Map<string, string>();
for (const [a, t] of units) {
  const row = disp.body?.[a];
  if (row?.disposition === 'retained') rendered.set(a, t as string);
  if (row?.disposition === 're-pointed') rendered.set(a, overlay?.units[a]?.text ?? '');
}
try {
  const items = new Map(Object.entries(rec.units).map(([a, u]: any) => [a, u.items]));
  const rows = new Map(Object.entries(disp.body ?? {}));
  const res = classifyCharter({ canonicalUnits: units, renderedUnits: rendered, items, rows });
  const tally: Record<string, string[]> = {};
  for (const r of res as any[]) (tally[r.entered ? r.verdict : 'passthrough'] ??= []).push(`${r.anchor}${r.total !== undefined ? ` ${r.retained ?? 0}/${r.total}` : ''}${r.routedBy?.length ? ' ' + r.routedBy.join('+') : ''}`);
  out.push(`triviality: ${JSON.stringify(tally)}`);
} catch (e) { out.push(`triviality: ${(e as Error).message}`); }
console.log(out.join('\n') || 'clean');
