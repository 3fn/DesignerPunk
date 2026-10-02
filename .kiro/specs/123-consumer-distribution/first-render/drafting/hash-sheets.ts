/**
 * hash-sheets.ts — Spec 123 Task 15.5 drafting aid (Thurgood). READ-ONLY sheets, one per C1 seat:
 *   1. the operative-set units whose confirmation note is owed (exactly the sweep's `confirmation` findings);
 *   2. the dispositions rows that take a signature: every ROUTED body unit (classifyCharter over the DRAFTED
 *      sets) and every `no-consumer-counterpart` row (Req 11.4.1), with the hashes the sweep will check.
 * Mechanical: every value comes from the sweep's own helpers (freshness.ts / derive.ts / hash.ts). No judgment.
 * Run: npx tsx .kiro/specs/123-consumer-distribution/first-render/drafting/hash-sheets.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { load } from 'js-yaml';
const ROOT = path.resolve(__dirname, '../../../../..');
const T = (m: string) => require(path.join(ROOT, 'tools/agent-generator', m));
const { splitFrontmatter } = T('frontmatter');
const { partition, entryTree } = T('partition');
const { parseOverlay } = T('regrounding/overlay');
const { classifyCharter } = T('regrounding/triviality');
const { runFreshnessSweep, evidenceFragment } = T('regrounding/freshness');
const { readConsumerSpans, rowSpanSource, renderedHashOf } = T('derive');
const { hashText, hashEntry } = T('regrounding/hash');
const { c1Seat } = T('regrounding/c1');

const OUT = path.join(__dirname, 'sheets');
const P = 'canonical/profiles/consumer';
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const AGENTS = ['ada', 'lina', 'thurgood', 'sparky', 'leonardo', 'data', 'kenya', 'stacy'];
const IDS = ['core-goals', 'ai-collaboration-principles', 'spec-feedback-protocol', 'start-up-tasks', 'task-completion-protocol', 'agent-directory', 'designerpunk-systems-overview', 'civitas-system-overview'];
const SEATS = ['ada', 'lina', 'sparky', 'leonardo', 'data', 'kenya', 'stacy'];
/** Optional batch base (argv[2]): rows whose disposition changed since it join the re-sign worklist. */
const BASE = process.argv[2];
const baseCache = new Map<string, any>();
function baseRows(file: string): any {
  if (!BASE) return undefined;
  if (!baseCache.has(file)) { try { baseCache.set(file, load(require('child_process').execFileSync('git', ['show', `${BASE}:${file}`], { cwd: ROOT }).toString())); } catch { baseCache.set(file, undefined); } }
  return baseCache.get(file);
}
const head = execHead();
function execHead(): string { return require('child_process').execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT }).toString().trim(); }

type Conf = { record: string; note: string; key: string; hash: string; items: string[] };
type Sig = { file: string; section: string; key: string; disposition: string; why: string; canonicalHash: string; renderedHash: string; evidence: string; rendering: string[]; overlay: string; work: string[] };
const conf: Record<string, Conf[]> = Object.fromEntries(SEATS.map((s) => [s, []]));
const sig: Record<string, Sig[]> = Object.fromEntries(SEATS.map((s) => [s, []]));

// 1. Confirmations owed — exactly the sweep's `confirmation` findings.
const sweep = runFreshnessSweep(ROOT);
const other = sweep.findings.filter((f: any) => f.check !== 'confirmation' && f.check !== 'stale-signature');
const staleKeys = new Set(sweep.findings.filter((f: any) => f.check === 'stale-signature').map((f: any) => `${f.file} ${f.key}`));
if (other.length) throw new Error(`sweep has non-confirmation findings; fix those first:\n${other.map((f: any) => f.message).join('\n')}`);
const recs = new Map<string, any>();
for (const f of (sweep.findings as { file: string; key: string; check: string }[]).filter((x) => x.check === 'confirmation')) {
  if (!recs.has(f.file)) recs.set(f.file, load(read(f.file)));
  const r = recs.get(f.file); const u = r.units[f.key];
  const name = path.basename(f.file, '.yaml');
  conf[r.confirmer].push({ record: f.file, note: `${P}/confirmations/${name}.md`, key: f.key, hash: u.canonicalHash, items: (u.items ?? []).map((i: any) => i.id) });
}

// 2. Rows to sign.
const spans = readConsumerSpans(ROOT);
if (!spans) throw new Error('no committed consumer rendering');
const buckets: [string, string][] = [...AGENTS.map((a) => [`${P}/${a}`, a] as [string, string]), [`${P}/_shared`, ''], ...IDS.map((id) => [`${P}/always-set/${id}`, id] as [string, string])];
for (const [stem, rec] of buckets) {
  const file = `${stem}.dispositions.yaml`; const d: any = load(read(file)); const src: string = d.source;
  const ovPath = `${stem}.overlay.md`; const ov = fs.existsSync(path.join(ROOT, ovPath)) ? parseOverlay(read(ovPath), ovPath) : undefined;
  const want = new Map<string, { section: string; why: string }>();
  const units = new Map<string, string>(); const entries = new Map<string, unknown>(); const members = new Map<string, any>();
  let owner = 'thurgood'; const memberOwner = new Map<string, string>();
  if (rec) {
    const r: any = load(read(`canonical/operative-sets/${rec}.yaml`)); owner = r.owner;
    const { frontmatter, body } = splitFrontmatter(read(src), src);
    for (const u of partition(body).units) units.set(u.anchor, u.text);
    for (const l of entryTree(frontmatter ?? {}).units) entries.set(l.path, l.value);
    const rendered = new Map<string, string>();
    for (const [a, t] of units) { const row = d.body[a]; if (row.disposition === 'retained') rendered.set(a, t); if (row.disposition === 're-pointed') rendered.set(a, ov.units[a].text); }
    const res = classifyCharter({ canonicalUnits: units, renderedUnits: rendered, items: new Map(Object.entries(r.units).map(([a, u]: any) => [a, u.items])), rows: new Map(Object.entries(d.body)) });
    for (const x of res) if (x.entered && x.verdict === 'ROUTES') want.set(`body ${x.anchor}`, { section: 'body', why: 'ROUTED' });
  } else {
    const cat: any = load(read(src)); for (const m of cat.members) { members.set(m.id, m); memberOwner.set(m.id, m.owner); }
  }
  for (const section of ['body', 'frontmatter', 'members']) for (const [k, row] of Object.entries<any>(d[section] ?? {}))
    if (row.disposition === 'no-consumer-counterpart' || row.disposition === 'superseded-by') { const w = want.get(`${section} ${k}`); want.set(`${section} ${k}`, { section, why: w ? `ROUTED + ${row.disposition}` : row.disposition }); }
  // Signed rows OUTSIDE the signed population (e.g. a re-pointed frontmatter entry, a retained
  // verdict) still carry a signature — a refusal, stale or changed one needs its owner's act.
  for (const section of ['body', 'frontmatter', 'members']) for (const [k, row] of Object.entries<any>(d[section] ?? {})) {
    if (want.has(`${section} ${k}`) || !row.signature) continue;
    const before = baseRows(file)?.[section]?.[k]; const strip = (x: any) => { if (!x) return x; const y = { ...x }; delete y.signature; return JSON.stringify(y); };
    if (row.signature.refuse || staleKeys.has(`${file} ${k}`) || (BASE && strip(before) !== strip(row))) want.set(`${section} ${k}`, { section, why: `signed ${row.disposition} row` });
  }
  for (const [sk, { section, why }] of want) {
    const key = sk.slice(section.length + 1); const row = d[section][key];
    const canon = section === 'body' ? hashText(units.get(key)) : section === 'frontmatter' ? hashEntry(entries.get(key)) : hashEntry(members.get(key));
    const source = rowSpanSource(src, section, key);
    const pieces = spans.get(source) ?? [];
    const seat = c1Seat(section === 'members' ? memberOwner.get(key) : owner);
    const note = `${P}/signatures/${rec || '_shared'}.md`;
    const ovKey = section === 'body' ? ov?.units?.[key] : ov?.entries?.[key];
    const work: string[] = [];
    if (!row.signature) work.push('unsigned');
    else {
      if (row.signature.refuse) work.push('refusal standing');
      if (staleKeys.has(`${file} ${key}`)) work.push('stale');
      const before = baseRows(file)?.[section]?.[key]; const strip = (x: any) => { if (!x) return x; const y = { ...x }; delete y.signature; return JSON.stringify(y); };
      if (BASE && strip(before) !== strip(row)) work.push(`row changed since ${BASE}`);
    }
    sig[seat].push({ file, section, key, disposition: row.disposition, why, canonicalHash: canon, renderedHash: renderedHashOf(spans, source), evidence: `${note}${evidenceFragment(section, key)}`, rendering: [...new Set<string>(pieces.map((p: any) => p.artifact))], overlay: ovKey ? ovPath : '—', work });
  }
}

// 3. Referent candidates (Ada/Lina's finding, phase one): an item whose text opens on a pronoun or demonstrative,
//    names a referent it does not carry ("this layer", "them", "the above"), or ends as a bare lead-in (":").
//    A CANDIDATE list for the confirmer, never an edit: widening is a re-confirmation in the confirmer's seat.
type Ref = { record: string; key: string; id: string; text: string; why: string };
const ref: Record<string, Ref[]> = Object.fromEntries(SEATS.map((s) => [s, []]));
const OPEN = /^(\*\*)?(this|these|those|that|it|they|them|its|their|such|here|above)\b/i;
const INNER = /\b(this layer|this section|these steps|the above|all of the above|as above)\b/i;
for (const f of fs.readdirSync(path.join(ROOT, 'canonical/operative-sets')).filter((x) => x.endsWith('.yaml')).sort()) {
  const r: any = load(read(`canonical/operative-sets/${f}`));
  for (const [key, u] of Object.entries<any>(r.units)) for (const it of u.items ?? []) {
    const t = String(it.text).trim();
    const why = OPEN.test(t) ? 'opens on a pronoun/demonstrative' : INNER.test(t) ? 'names a referent it does not carry' : /:\s*(\*\*)?$/.test(t) ? 'ends as a bare lead-in' : '';
    if (why) (ref[r.confirmer] ??= []).push({ record: `canonical/operative-sets/${f}`, key, id: it.id, text: t, why });
  }
}

fs.mkdirSync(OUT, { recursive: true });
const counts: string[] = [];
for (const seat of SEATS) {
  const L: string[] = [`# Hash sheet — ${seat} (C1 seat)`, '', `**Generated** from \`${head}\` by \`hash-sheets.ts\` — READ-ONLY, mechanical, no judgment. The sweep is the authority; re-run this after any record, overlay or canonical edit. Recipes: \`README.md\`.`, '', `**Counts**: ${conf[seat].length} confirmations owed · ${sig[seat].length} rows to sign.`, '', '## 1. Confirmations owed', ''];
  for (const rec of [...new Set(conf[seat].map((c) => c.record))]) {
    L.push(`### \`${rec}\` → note \`${conf[seat].find((c) => c.record === rec)!.note}\``, '', '| Unit key | canonicalHash | Drafted item ids (record order) |', '|---|---|---|');
    for (const c of conf[seat].filter((c) => c.record === rec)) L.push(`| \`${c.key}\` | \`${c.hash}\` | ${c.items.length ? c.items.map((i) => `\`${i}\``).join(', ') : '`none`'} |`);
    L.push('');
  }
  L.push('## 2. Rows to sign', '', 'Routing is computed from the **drafted** item sets; a confirmation that changes a set can change a unit\'s routing — re-run the sheet after confirmations land.', '');
  for (const file of [...new Set(sig[seat].map((s) => s.file))]) {
    L.push(`### \`${file}\``, '', '| Row (section · key) | Disposition | Why signed | canonicalHash | renderedHash | evidence | Rendering (committed) | Overlay |', '|---|---|---|---|---|---|---|---|');
    for (const s of sig[seat].filter((s) => s.file === file)) L.push(`| ${s.section} · \`${s.key}\` | ${s.disposition} | ${s.why} | \`${s.canonicalHash}\` | \`${s.renderedHash}\` | \`${s.evidence}\` | ${s.rendering.length ? s.rendering.map((r) => `\`${r}\``).join('<br>') : '— (not rendered)'} | ${s.overlay === '—' ? '—' : `\`${s.overlay}\``} |`);
    L.push('');
  }
  const wl = sig[seat].filter((s) => s.work.length > 0);
  L.push('## 4. Re-sign worklist' + (BASE ? ` (since ${BASE})` : ''), '', 'Rows in section 2 that need a signing act now: **unsigned** (newly signed population), **refusal standing**, **stale** (the sweep\'s own finding), or **row changed** since the batch base (a disposition flip leaves both hashes unchanged, so the sweep cannot see it — re-sign it anyway). Hashes are in section 2.', '');
  if (wl.length === 0) L.push('None.', ''); else { L.push('| Row (section · key) | File | Disposition | Why |', '|---|---|---|---|'); for (const x of wl) L.push(`| ${x.section} · \`${x.key}\` | \`${path.basename(x.file)}\` | ${x.disposition} | ${x.work.join('; ')} |`); L.push(''); }
  L.push('## 3. Referent candidates (read-only)', '', 'A mechanical scan (see `hash-sheets.ts`): each item below opens on a pronoun or demonstrative, names a referent it does not carry, or ends as a bare lead-in. **Candidates, not findings** — many carry their referent in the same sentence. Widening an item is a re-confirmation of its unit in your seat (update the note\'s `items:`/`date:` in the same commit as your signatures); never edited here.', '');
  if (ref[seat].length === 0) L.push('None.', '');
  else { L.push('| Record | Unit | Item | Why | Text |', '|---|---|---|---|---|'); for (const x of ref[seat]) L.push(`| \`${path.basename(x.record)}\` | \`${x.key}\` | \`${x.id}\` | ${x.why} | ${x.text.replace(/\|/g, '\\|').slice(0, 160)}${x.text.length > 160 ? '…' : ''} |`); L.push(''); }
  fs.writeFileSync(path.join(OUT, `${seat}.md`), L.join('\n'));
  counts.push(`${seat}: ${conf[seat].length} confirmations, ${sig[seat].length} signatures, ${sig[seat].filter((s) => s.work.length).length} re-sign worklist, ${ref[seat].length} referent candidates`);
}
console.log(counts.join('\n'));
console.log(`total: ${SEATS.reduce((n, s) => n + conf[s].length, 0)} confirmations, ${SEATS.reduce((n, s) => n + sig[s].length, 0)} signatures`);
