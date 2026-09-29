/**
 * m1-tally.ts — Spec 123 Task 15.5 (Thurgood): the B-U2 M1 counts, mechanically.
 *   - `no-consumer-counterpart` rate per bucket at the working-tree commit (body vs frontmatter/members separately);
 *   - signature EVENTS from history: every distinct signature object ever committed for a row, over every commit
 *     reachable from HEAD that touched the file (merged seat branches included); per signer, split routed
 *     (body units classifyCharter ROUTES at HEAD) vs non-routed; assent vs refuse.
 * LIMIT, stated: a re-sign that commits a byte-identical signature object (e.g. a disposition flip whose hashes and
 * surviving list are unchanged) is not a distinct object and is invisible here — the evidence notes record it.
 * Run from the repo root: npx tsx .kiro/specs/123-consumer-distribution/first-render/drafting/m1-tally.ts [since-ref]
 */
import * as fs from 'fs';
import { execFileSync } from 'child_process';
const R = process.cwd() + '/';
const { load } = require(R + 'node_modules/js-yaml');
const { splitFrontmatter } = require(R + 'tools/agent-generator/frontmatter');
const { partition } = require(R + 'tools/agent-generator/partition');
const { parseOverlay } = require(R + 'tools/agent-generator/regrounding/overlay');
const { classifyCharter } = require(R + 'tools/agent-generator/regrounding/triviality');
const P = 'canonical/profiles/consumer/';
const AG = ['ada', 'lina', 'thurgood', 'sparky', 'leonardo', 'data', 'kenya', 'stacy'];
const IDS = ['core-goals', 'ai-collaboration-principles', 'spec-feedback-protocol', 'start-up-tasks', 'task-completion-protocol', 'agent-directory', 'designerpunk-systems-overview', 'civitas-system-overview'];
const buckets: [string, string, string][] = [...AG.map((a) => [a, `${P}${a}`, a] as [string, string, string]), ['_shared', `${P}_shared`, ''], ...IDS.map((i) => [`always-set/${i}`, `${P}always-set/${i}`, i] as [string, string, string])];
const git = (...a: string[]) => execFileSync('git', a, { cwd: R, maxBuffer: 1 << 28 }).toString();
const since = process.argv[2];

const rate: string[] = ['| Bucket | Body: ncc / rows | Frontmatter+members: ncc / rows | Bucket: ncc / rows |', '|---|---|---|---|'];
let tN = 0, tR = 0, tbN = 0, tbR = 0, tfN = 0, tfR = 0;
type Ev = { signer: string; routed: boolean; refuse: boolean };
const events: Ev[] = [];
for (const [name, stem, rec] of buckets) {
  const file = stem + '.dispositions.yaml';
  const d: any = load(fs.readFileSync(R + file, 'utf8'));
  const c = (sec: any) => { const v = Object.values(sec ?? {}) as any[]; return [v.filter((r) => r.disposition === 'no-consumer-counterpart').length, v.length]; };
  const [bn, br] = c(d.body); const [fn, fr] = c({ ...(d.frontmatter ?? {}), ...(d.members ?? {}) });
  tbN += bn; tbR += br; tfN += fn; tfR += fr; tN += bn + fn; tR += br + fr;
  rate.push(`| ${name} | ${bn} / ${br} | ${fn} / ${fr} | ${bn + fn} / ${br + fr} |`);
  // routed body units at HEAD
  const routed = new Set<string>();
  if (rec) {
    const r: any = load(fs.readFileSync(R + `canonical/operative-sets/${rec}.yaml`, 'utf8'));
    const { body } = splitFrontmatter(fs.readFileSync(R + d.source, 'utf8'), d.source);
    const units = new Map(partition(body).units.map((u: any) => [u.anchor, u.text]));
    const ov = fs.existsSync(R + stem + '.overlay.md') ? parseOverlay(fs.readFileSync(R + stem + '.overlay.md', 'utf8'), stem) : { units: {} };
    const rendered = new Map(); for (const [a, t] of units) { const row = d.body[a]; if (row.disposition === 'retained') rendered.set(a, t); if (row.disposition === 're-pointed') rendered.set(a, (ov as any).units[a].text); }
    for (const x of classifyCharter({ canonicalUnits: units, renderedUnits: rendered, items: new Map(Object.entries(r.units).map(([a, u]: any) => [a, u.items])), rows: new Map(Object.entries(d.body)) }))
      if (x.entered && x.verdict === 'ROUTES') routed.add(x.anchor);
  }
  // history: distinct signature objects per row
  const shas = git('log', '--format=%H', ...(since ? [`${since}..HEAD`] : []), '--', file).trim().split('\n').filter(Boolean);
  const seen = new Map<string, Set<string>>();
  for (const h of shas) {
    let doc: any; try { doc = load(git('show', `${h}:${file}`)); } catch { continue; }
    for (const sec of ['body', 'frontmatter', 'members']) for (const [k, row] of Object.entries<any>(doc?.[sec] ?? {})) {
      if (!row?.signature) continue;
      const key = `${sec} ${k}`; const js = JSON.stringify(row.signature);
      if (!seen.has(key)) seen.set(key, new Set()); seen.get(key)!.add(js);
    }
  }
  for (const [key, set] of seen) for (const js of set) {
    const s = JSON.parse(js); events.push({ signer: s.signer, routed: key.startsWith('body ') && routed.has(key.slice(5)), refuse: !!s.refuse });
  }
}
rate.push(`| **Profile** | **${tbN} / ${tbR}** | **${tfN} / ${tfR}** | **${tN} / ${tR}** |`);
console.log(rate.join('\n'));
console.log('\n| Signer | Routed: assent / events | Routed refusals | Non-routed: assent / events | Non-routed refusals | All events |');
console.log('|---|---|---|---|---|---|');
for (const s of ['ada', 'lina', 'sparky', 'leonardo', 'data', 'kenya', 'stacy']) {
  const e = events.filter((x) => x.signer === s); const r = e.filter((x) => x.routed); const n = e.filter((x) => !x.routed);
  console.log(`| ${s} | ${r.filter((x) => !x.refuse).length} / ${r.length} | ${r.filter((x) => x.refuse).length} | ${n.filter((x) => !x.refuse).length} / ${n.length} | ${n.filter((x) => x.refuse).length} | ${e.length} |`);
}
