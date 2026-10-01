import * as fs from 'fs';
const R = process.cwd() + '/';
const { load } = require(R + 'node_modules/js-yaml');
const { splitFrontmatter } = require(R + 'tools/agent-generator/frontmatter');
const { partition } = require(R + 'tools/agent-generator/partition');
const { parseOverlay } = require(R + 'tools/agent-generator/regrounding/overlay');
const { classifyCharter } = require(R + 'tools/agent-generator/regrounding/triviality');
const P = 'canonical/profiles/consumer/';
const buckets: [string, string, string][] = [];
for (const a of ['ada','lina','thurgood','sparky','leonardo','data','kenya','stacy']) buckets.push([a, `${P}${a}`, a]);
buckets.push(['_shared', `${P}_shared`, '']);
for (const id of ['core-goals','ai-collaboration-principles','spec-feedback-protocol','start-up-tasks','task-completion-protocol','agent-directory','designerpunk-systems-overview','civitas-system-overview']) buckets.push([`always-set/${id}`, `${P}always-set/${id}`, id]);
const rows: string[] = ['| Bucket | Body rows (ret / re-pt / ncc) | Frontmatter or member rows (ret / re-pt / ncc) | `ncc` rate | Units / items recorded | Routed units | Signer (C1) |', '|---|---|---|---|---|---|---|'];
const tot = { rows: 0, ncc: 0, units: 0, items: 0, routed: 0 };
for (const [name, stem, rec] of buckets) {
  const d = load(fs.readFileSync(R + stem + '.dispositions.yaml', 'utf8'));
  const cnt = (sec: any) => { const c: any = { retained: 0, 're-pointed': 0, 'no-consumer-counterpart': 0, 'superseded-by': 0 }; for (const r of Object.values(sec ?? {}) as any[]) c[r.disposition]++; return c; };
  const b = cnt(d.body), f = cnt(d.frontmatter ?? d.members);
  const all = Object.values(b).reduce((x: any, y: any) => x + y, 0) as number + (Object.values(f).reduce((x: any, y: any) => x + y, 0) as number);
  const ncc = b['no-consumer-counterpart'] + f['no-consumer-counterpart'];
  let units = '—', routed = 0, signer = 'thurgood→stacy';
  if (rec) {
    const r = load(fs.readFileSync(R + `canonical/operative-sets/${rec}.yaml`, 'utf8'));
    const nItems = Object.values(r.units).reduce((x: number, u: any) => x + (u.items?.length ?? 0), 0);
    units = `${Object.keys(r.units).length} / ${nItems}`; tot.units += Object.keys(r.units).length; tot.items += nItems as number;
    signer = r.confirmer;
    const src = d.source; const text = fs.readFileSync(R + src, 'utf8'); const { body } = splitFrontmatter(text, src);
    const unitsMap = new Map(partition(body).units.map((u: any) => [u.anchor, u.text]));
    const ov = fs.existsSync(R + stem + '.overlay.md') ? parseOverlay(fs.readFileSync(R + stem + '.overlay.md', 'utf8'), stem) : undefined;
    const rendered = new Map(); for (const [a, t] of unitsMap) { const row = d.body[a]; if (row.disposition === 'retained') rendered.set(a, t); if (row.disposition === 're-pointed') rendered.set(a, ov.units[a].text); }
    const res = classifyCharter({ canonicalUnits: unitsMap, renderedUnits: rendered, items: new Map(Object.entries(r.units).map(([a, u]: any) => [a, u.items])), rows: new Map(Object.entries(d.body)) });
    routed = res.filter((x: any) => x.entered && x.verdict === 'ROUTES').length;
  }
  tot.rows += all; tot.ncc += ncc; tot.routed += routed;
  rows.push(`| ${name} | ${b.retained} / ${b['re-pointed']} / ${b['no-consumer-counterpart']} | ${f.retained} / ${f['re-pointed']} / ${f['no-consumer-counterpart']} | ${ncc} / ${all} | ${units} | ${routed} | ${signer} |`);
}
rows.push(`| **Total** | | | **${tot.ncc} / ${tot.rows}** | **${tot.units} / ${tot.items}** | **${tot.routed}** | |`);
console.log(rows.join('\n'));
