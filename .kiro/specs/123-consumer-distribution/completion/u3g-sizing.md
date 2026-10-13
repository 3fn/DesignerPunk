# U3g sizing (29.0): the read-only re-run on the ruled text, the ceiling check, and the dry run of 29.3

**Date**: 2026-10-12 · **Agent**: Lina (Opus), PRIMARY Task 29
**Tree**: `task/123-u3g-g2c2` worktree, cut from `origin/main` @ `c25470eac`, after the instruments block `6f5c3eaf0`. The tree carries the ruling (`905dd1e62`) and U3c (`8a0c0e46a`), so the sizing runs on a `main` that carries U3c (criterion C2). **Read-only**: no repo file was written by any run below (`git status` clean after each run).
**Ruled text applied**: `.kiro/specs/123-consumer-distribution/g2-spec-text-ruling.md` @ `905dd1e62`, R1–R3:
- R1 identity: mutual `isDescendantOrSelf` in one tree. The shared member is decided in member-id space.
- R2: a body span is out of `D` if its rendered text is empty after `trim()`. A frontmatter entry is out of `D` if its derived value is `null`, `[]` or a string that is empty after `trim()`. The derived value comes from `derive()`'s own `overlayValue`.
- R3 surfaces:
  - body and always-set rows: `_canonical`, `cc`, `kiro`;
  - frontmatter rows: `cc` and `kiro`;
  - the member row: every target that renders the shared catalog.
  - A surface counts only if it carries the row's source file. A row is `VERIFIED` only if it is `VERIFIED` on every one of its surfaces. The count is in rows.
**Harness**: two scratch scripts, reproduced verbatim in § "Appendix" (`$WT` stands for the worktree root). They import the merged modules: `derivation.ts`, `partition.ts`, `derive.ts`, `overlay.ts`, `frontmatter.ts`. They read the committed sidecars through `readConsumerSpans`. Next to the ruled verdict they also report the **merged machinery's** verdict (`checkDerivation` as merged, containment, no R2).

## 1. The run (ruled text)

```
declared re-pointed rows (from the committed dispositions): 169
evaluated rows: 169
  body: 141 evaluated · ruled VERIFIED 141 · ruled FAIL 0 · merged-machinery FAIL 0
  frontmatter: 27 evaluated · ruled VERIFIED 21 · ruled FAIL 6 · merged-machinery FAIL 6
  members: 1 evaluated · ruled VERIFIED 1 · ruled FAIL 0 · merged-machinery FAIL 1
ruled text: 163 VERIFIED · 6 FAIL
destination identical to S: 169 / 169
--- failing rows under the ruled text (per surface) ---
canonical/agents/ada.md  frontmatter  description  ->  {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"}   (merged: {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"})
canonical/agents/data.md  frontmatter  knowledgeBases[android-components]  ->  {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"}   (merged: {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"})
canonical/agents/kenya.md  frontmatter  knowledgeBases[ios-components]  ->  {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"}   (merged: {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"})
canonical/agents/leonardo.md  frontmatter  description  ->  {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"}   (merged: {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"})
canonical/agents/stacy.md  frontmatter  knowledgeBases[completion-docs]  ->  {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"}   (merged: {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"})
canonical/agents/stacy.md  frontmatter  knowledgeBases[spec-summaries]  ->  {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"}   (merged: {"cc":"VERIFIED","kiro":"FAIL_NO_DERIVATION"})
--- rows whose ruled verdict differs from the merged machinery ---
canonical/shared/shared-catalog.yaml  members  record-first-ratification: merged FAIL -> ruled VERIFIED
```

**Against the provisional sizing** (2026-10-03: 168 rows, 6 fail):
- **169 rows**, where the provisional count was 168. The provisional count left out the one `members:` row; R1 brings it in.
- **163 VERIFIED, 6 FAIL**: the **same six** frontmatter rows, each failing only on `kiro` with `FAIL_NO_DERIVATION`.
- **169/169 destinations equal S**, so R1 moves no committed row.
- **R2 moves no committed row.**
- **The member row** `record-first-ratification` is `VERIFIED` in member-id space (R1). The merged machinery reads it as `FAIL_NO_DERIVATION`, because it has no member-id space. 29.1 builds that space (instruments row 4.2).
- **0 body or always-set rows fail**, on any of the three surfaces.

## 2. The harness can fail (four bites, in memory, nothing written)

Each bite changes one input in memory and re-runs. The expected row goes red each time, and the merged machinery's verdict is shown beside it.

```
== BITE=parent
ruled text: 162 VERIFIED · 7 FAIL
canonical/agents/stacy.md  body  #operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble  ->  {"_canonical":"FAIL_DISHONEST_NAMING","cc":"FAIL_DISHONEST_NAMING","kiro":"FAIL_DISHONEST_NAMING"}   (merged: {"_canonical":"VERIFIED","cc":"VERIFIED","kiro":"VERIFIED"})
canonical/shared/shared-catalog.yaml  members  record-first-ratification: merged FAIL -> ruled VERIFIED
canonical/agents/stacy.md  body  #operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble: merged VERIFIED -> ruled FAIL
== BITE=fm-parent
ruled text: 162 VERIFIED · 7 FAIL
canonical/agents/kenya.md  frontmatter  commands[platform-tokens]  ->  {"cc":"FAIL_DISHONEST_NAMING","kiro":"FAIL_DISHONEST_NAMING"}   (merged: {"cc":"VERIFIED","kiro":"VERIFIED"})
canonical/shared/shared-catalog.yaml  members  record-first-ratification: merged FAIL -> ruled VERIFIED
canonical/agents/kenya.md  frontmatter  commands[platform-tokens]: merged VERIFIED -> ruled FAIL
== BITE=member
ruled text: 162 VERIFIED · 7 FAIL
canonical/shared/shared-catalog.yaml  members  record-first-ratification  ->  {"cc":"FAIL_DISHONEST_NAMING","kiro":"FAIL_DISHONEST_NAMING"}   (merged: {"cc":"FAIL_NO_DERIVATION","kiro":"FAIL_NO_DERIVATION"})
== BITE=blank
ruled text: 162 VERIFIED · 7 FAIL
canonical/agents/stacy.md  body  #identity  ->  {"_canonical":"FAIL_NO_DERIVATION","cc":"FAIL_NO_DERIVATION","kiro":"FAIL_NO_DERIVATION"}   (merged: {"_canonical":"VERIFIED","cc":"VERIFIED","kiro":"VERIFIED"})
canonical/shared/shared-catalog.yaml  members  record-first-ratification: merged FAIL -> ruled VERIFIED
canonical/agents/stacy.md  body  #identity: merged VERIFIED -> ruled FAIL
```

- `parent`: Stacy's `…the-q5-cut:preamble` row with its `##` parent as destination (attack (f), body). Ruled: `FAIL_DISHONEST_NAMING` on all three surfaces. Merged: `VERIFIED`, which is G2-F1.
- `fm-parent`: Kenya's `commands[platform-tokens]` row with destination `frontmatter:commands` (F5's shape on a committed row). Ruled: `FAIL_DISHONEST_NAMING`. Merged: `VERIFIED`.
- `member`: the shared member row with a sibling member id as destination. Ruled: `FAIL_DISHONEST_NAMING`.
- `blank`: Stacy's `#identity` rendered as `'\n'` on every surface (attack (a) as the generator emits it, G2-F3). Ruled: `FAIL_NO_DERIVATION`. Merged: `VERIFIED`.

## 3. The dry run of 29.3 (criterion C2, R3 Lina RC2-4 (b))

**Method**:
- For each agent, list every leaf entry the Kiro JSON renders, following `kiro.ts` `emitConfig` L242–303:
  - `agent` and `description`;
  - `toolSubset.*`;
  - `skills[*]`;
  - `ambient[*]`;
  - `knowledgeBases[*]` **that carry a string `source`**;
  - `writeScope[*]`;
  - `preflight[*]`;
  - `kiro.keyboardShortcut` and `kiro.welcomeMessage`.
- Leave out every entry that is disposed away (`no-consumer-counterpart`, `superseded-by`).
- For every **signed** row whose entry is on that list, add one Kiro-JSON piece to its span source in a copy of the span map, and recompute `renderedHashOf` (VALVE-1's own hash) against the row's signed `renderedHash`.
- Any added piece changes the hash, so the would-move set does not depend on 29.3's exact line ranges. A row is in the set exactly when it would gain a JSON piece at all.

```
signed agent rows: 210; fresh against the committed renderings before the dry run: 210
entries the Kiro JSON renders (per-entry span candidates): 234
would-move signed rows: 0
JSON-rendered knowledgeBases/description entries:
  ada: description
  ada: knowledgeBases[RosettaTokenSource]
  data: description
  kenya: description
  leonardo: description
  lina: description
  lina: knowledgeBases[StemmaComponentSource]
  sparky: description
  stacy: description
  thurgood: description
```

- The method is sound: all 210 signed agent rows hash fresh against the committed renderings before the dry run.
- **Would-move signed rows: 0.** The plan expected one: Stacy's `knowledgeBases[spec-summaries]`.
- **Red** ("a would-move row other than Stacy's `knowledgeBases[spec-summaries]`"): **not red**. No row would move.
- The diff guard, no-write mode (`runGuard(root, { refreshLock: false })`) at the cut: `no-op-green`, freshness findings 0 (17 records, 373 units).

## 4. The ceiling check (PR-5.1; adopted at the amendment's merge)

| Limb | Threshold | Measured | Exceeded? |
|---|---|---|---|
| (i) failing rows | > 12 | 6 | no |
| (ii) disposition re-authorings | > 3 | 0 (none needed by any row measured; see § 5 for the fork that decides the four KB rows' fix) | no |
| (iii) a second seat re-signs | > 1 seat | 0 seats would move under 29.3 as planned (dry run, § 3) | no |
| (iv) any body or always-set row fails | any | 0 of 141 | no |

**No limb is exceeded, so the plan's stop does not fire at 29.0.**

## 5. Finding: the plan's premise for four of the six rows does not hold (criterion C7). A fork, surfaced and not picked

**What the plan says** (C7): "The six Kiro-JSON frontmatter rows pass because `adapters/kiro.ts` emits per-entry spans for the JSON fields their entries render into. **The JSON bytes are unchanged; only the attribution sidecars change**." The provisional sizing said: "All six are frontmatter entries that render into the Kiro agent JSON."

**What the run shows** (verified: run, code, sidecars):
- **`description` (ada, leonardo)**: renders into the Kiro JSON's `"description"` field. Per-entry spans fix these two as planned.
- **`knowledgeBases[android-components]` (data), `[ios-components]` (kenya), `[completion-docs]` and `[spec-summaries]` (stacy)**: these render **nowhere in the Kiro target**.
  - `emitConfig` puts into `resources` only the knowledge bases that carry a string `source` (`kiro.ts` L259–260, `.filter((kb) => typeof kb.source === 'string')`). These four are glob-only (`globs:`, no `source`). The committed Kiro JSONs for data, kenya and stacy carry no knowledge-base object.
  - The Kiro prompt deliberately renders no knowledge note (`kiro.ts` L428–434, "(e) Knowledge fallback: NOT emitted for Kiro … Kiro has the native /knowledge surface").
  - No `kiro` sidecar carries a `knowledgeBases` span.
  - The steward leg behaves the same way: `.kiro/agents/stacy.json` carries no knowledge-base object.
  - So **glob-only knowledge bases are dropped on Kiro on both legs.** The `kiro.ts` comment's premise, that Kiro carries them through config declarations, holds only for source-bearing knowledge bases.
- **Consequence**:
  - Per-entry JSON spans cannot make these four rows derive on `kiro`, because there is nothing for a span to attribute.
  - Under R3's aggregation (a row is `VERIFIED` only on every surface that carries its source file; `kiro` carries `stacy.md`, `data.md` and `kenya.md` through their body spans), the four rows stay `FAIL_NO_DERIVATION` after 29.3 as planned.
  - The dry run's 0 would-move rows is the same fact seen from the signing side: Stacy's `spec-summaries` gains no JSON piece.

**The fork** (decide before 29.3; it does not block 29.1, 29.2 or 29.4 once the attack file exists):
- **(A) Kiro renders glob-only knowledge bases.** For example, a knowledge-fallback note in the Kiro prompt, as the CC adapter already renders.
  - This fixes a real defect on both legs: Kiro agents today lose those knowledge bases entirely.
  - Within the ceiling: the only signed row it moves is Stacy's `spec-summaries`, so one seat, as the plan budgeted. The other three rows are unsigned.
  - **Cost**:
    - It changes Kiro **rendered** bytes (the prompts, on the consumer and steward legs). That contradicts C7's "JSON bytes unchanged; only the sidecars change" and its `git diff --stat` instrument, so it needs a dated plan amendment.
    - It adds a content change that Kenya, Data and Stacy would read.
    - It widens the moved-outputs list at 29.6.
  - **Not verified**: whether Kiro's native `knowledgeBase` resource object accepts globs, which would allow a JSON-only route.
- **(B) R3's surface set excludes a target that by design renders none of a field family.**
  - The four rows then verify on `cc`, and 29.3 shrinks to the two `description` rows. The Kiro knowledge-base drop is routed as its own defect.
  - **Cost**: a change to Thurgood's recorded reading (R3). It is a ruling change, not U3g's to author, and Thurgood is recused from U3g's text. It needs Peter.
  - **Counter-argument**: (B) narrows the check exactly where shipped content fails to reach a consumer, which is G2-F2's class ("applied to less than the shipped material").
- **Class option**:
  - The class is "a canonical field family that a target never renders, under a check that aggregates over every target that carries the file".
  - The class-level answer:
    - each target declares which entry families it renders (`canonical/shared/field-dispositions.yaml` already declares per-target placement for config fields);
    - the check's surfaces for a frontmatter row are the targets whose declaration renders that family;
    - a separate assertion requires that every re-pointed row renders on at least one target, and that a declared family is never silently dropped.
  - **Cost**: a C15/C20 design touch plus a ruling amendment, which is larger than U3g.
- **My lean (not a pick)**: (A). It fixes the defect the measurement exposed instead of narrowing the instrument around it, and it stays inside the ceiling.
  - **Surviving counter**: (A) turns a sidecar-only parent into a content change on both Kiro legs, under a criterion whose text says the opposite.

## Appendix: the two harness scripts (verbatim; `$WT` = the worktree root)

### `size.ts`

```ts
/* 29.0 read-only sizing harness (Lina). Reads the committed profile + renderings; writes nothing in the repo. */
import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from '$WT/node_modules/js-yaml';
import { splitFrontmatter } from '$WT/tools/agent-generator/frontmatter';
import { entryTree, partition } from '$WT/tools/agent-generator/partition';
import { parseOverlay } from '$WT/tools/agent-generator/regrounding/overlay';
import { overlayValue, readConsumerSpans } from '$WT/tools/agent-generator/derive';
import { checkDerivation, parseRef, spanRef, containedIn, type TreeRef, type DerivationTrees } from '$WT/tools/agent-generator/regrounding/derivation';

const ROOT = process.argv[2];
const PROFILE = path.join(ROOT, 'canonical/profiles/consumer');
const TARGETS = ['_canonical', 'cc', 'kiro'] as const;
const SHARED = 'canonical/shared/shared-catalog.yaml';
const spansBy: Record<string, Map<string, { artifact: string; text: string }[]>> = {};
for (const t of TARGETS) spansBy[t] = readConsumerSpans(ROOT, `canonical/_consumer-output/${t}`) as any;

const files = [...fs.readdirSync(PROFILE).filter((f) => f.endsWith('.dispositions.yaml')).map((f) => f),
  ...fs.readdirSync(path.join(PROFILE, 'always-set')).filter((f) => f.endsWith('.dispositions.yaml')).map((f) => `always-set/${f}`)].sort();

const isEmptyValue = (v: unknown) => v === null || v === undefined || (Array.isArray(v) && v.length === 0) || (typeof v === 'string' && v.trim() === '');
const sameNode = (x: TreeRef, s: TreeRef, trees: DerivationTrees) => containedIn(x, s, trees) && containedIn(s, x, trees);

type Row = { file: string; lane: 'body' | 'frontmatter' | 'members'; key: string; destination: string };
const rows: Row[] = [];
const out: string[] = [];
let declared = 0;
const results: { row: Row; perTarget: Record<string, string>; merged: Record<string, string>; ruled: string; mergedRow: string }[] = [];

for (const rel of files) {
  const text = fs.readFileSync(path.join(PROFILE, rel), 'utf8');
  const doc = loadYaml(text) as any;
  const source: string = doc.source;
  const overlayRel = rel.replace(/\.dispositions\.yaml$/, '.overlay.md');
  const overlayAbs = path.join(PROFILE, overlayRel);
  const overlay = fs.existsSync(overlayAbs) ? parseOverlay(fs.readFileSync(overlayAbs, 'utf8'), overlayRel) : undefined;
  let trees: DerivationTrees = { body: partition('') };
  let leafValue = new Map<string, unknown>();
  if (source !== SHARED) {
    const sp = splitFrontmatter(fs.readFileSync(path.join(ROOT, source), 'utf8'), source);
    const body = doc.counterpart !== undefined ? sp.body : sp.body;
    const et = entryTree(sp.frontmatter);
    trees = { body: partition(body), entry: et };
    leafValue = new Map(et.units.map((l: any) => [l.path, l.value]));
  }
  for (const lane of ['body', 'frontmatter', 'members'] as const) {
    for (const [key, row] of Object.entries((doc[lane] ?? {}) as Record<string, any>)) {
      if (row?.disposition !== 're-pointed') continue;
      declared++;
      let dest = row.destination;
      const BITE = process.env.BITE;
      if (BITE === 'parent' && source === 'canonical/agents/stacy.md' && key === '#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble') dest = '#operational-mode-claims-audit-execution-claims-verification-the-q5-cut';
      if (BITE === 'fm-parent' && source === 'canonical/agents/kenya.md' && key === 'commands[platform-tokens]') dest = 'frontmatter:commands';
      if (BITE === 'member' && key === 'record-first-ratification') dest = 'complete-task-tooling';
      const r: Row = { file: source, lane, key, destination: dest };
      // the derived value of a re-pointed entry (R2, frontmatter): derive()'s own overlayValue
      const derivedValue = (p: string): unknown => {
        const rp = (doc.frontmatter ?? {})[p];
        if (rp?.disposition === 're-pointed') return overlayValue(overlay?.entries[p]?.text, leafValue.get(p)).value;
        return leafValue.get(p);
      };
      const surfaces = lane === 'body' ? TARGETS : (['cc', 'kiro'] as const);
      const perTarget: Record<string, string> = {}; const merged: Record<string, string> = {};
      for (const t of surfaces) {
        const map = spansBy[t];
        const prefix = lane === 'members' ? `${SHARED}#` : `${source}#`;
        const all = [...map.entries()].filter(([src]) => src.startsWith(prefix));
        if (all.length === 0) continue; // this surface does not carry the source file
        const flat = all.flatMap(([src, pieces]) => pieces.map((p) => ({ source: src, text: (process.env.BITE === 'blank' && src === source + key && key === '#identity' && source === 'canonical/agents/stacy.md') ? '\n' : p.text })));
        if (lane === 'members') {
          const d = flat.filter((x) => x.source === `${SHARED}#${key}`);
          const dR2 = d.filter((x) => x.text.trim() !== '');
          perTarget[t] = dR2.length === 0 ? 'FAIL_NO_DERIVATION' : (r.destination === key ? 'VERIFIED' : 'FAIL_DISHONEST_NAMING');
          merged[t] = 'FAIL_NO_DERIVATION'; // merged machinery: no member-id space (parseRef/spanRef mismatch, no tree)
          continue;
        }
        const S = lane === 'frontmatter' ? `frontmatter:${key}` : key;
        merged[t] = checkDerivation({ file: source, trees, spans: flat, s: S, destination: r.destination }).verdict;
        const sRef = parseRef(S); const dRef = parseRef(r.destination);
        const D = flat.map((x) => ({ ...x, ref: spanRef(x.source, source) }))
          .filter((x) => x.ref !== undefined && containedIn(x.ref!, sRef, trees))
          .filter((x) => x.ref!.tree === 'body' ? x.text.trim() !== '' : !isEmptyValue(derivedValue(x.ref!.id)));
        perTarget[t] = D.length === 0 ? 'FAIL_NO_DERIVATION' : D.some((x) => sameNode(x.ref!, dRef, trees)) ? 'VERIFIED' : 'FAIL_DISHONEST_NAMING';
      }
      const vals = Object.values(perTarget); const mvals = Object.values(merged);
      const ruled = vals.length === 0 ? 'NO_SURFACE' : vals.every((v) => v === 'VERIFIED') ? 'VERIFIED' : 'FAIL';
      const mergedRow = mvals.length === 0 ? 'NO_SURFACE' : mvals.every((v) => v === 'VERIFIED') ? 'VERIFIED' : 'FAIL';
      results.push({ row: r, perTarget, merged, ruled, mergedRow });
    }
  }
}
const by = (f: (x: any) => boolean) => results.filter(f).length;
console.log(`declared re-pointed rows (from the committed dispositions): ${declared}`);
console.log(`evaluated rows: ${results.length}`);
for (const lane of ['body', 'frontmatter', 'members']) {
  const rs = results.filter((x) => x.row.lane === lane);
  console.log(`  ${lane}: ${rs.length} evaluated · ruled VERIFIED ${rs.filter((x) => x.ruled === 'VERIFIED').length} · ruled FAIL ${rs.filter((x) => x.ruled !== 'VERIFIED').length} · merged-machinery FAIL ${rs.filter((x) => x.mergedRow !== 'VERIFIED').length}`);
}
console.log(`ruled text: ${by((x) => x.ruled === 'VERIFIED')} VERIFIED · ${by((x) => x.ruled !== 'VERIFIED')} FAIL`);
console.log(`destination identical to S: ${by((x) => (x.row.lane === 'frontmatter' ? `frontmatter:${x.row.key}` : x.row.key) === x.row.destination)} / ${results.length}`);
console.log('--- failing rows under the ruled text (per surface) ---');
for (const x of results.filter((x) => x.ruled !== 'VERIFIED')) console.log(`${x.row.file}  ${x.row.lane}  ${x.row.key}  ->  ${JSON.stringify(x.perTarget)}   (merged: ${JSON.stringify(x.merged)})`);
console.log('--- rows whose ruled verdict differs from the merged machinery ---');
for (const x of results.filter((x) => x.ruled !== x.mergedRow)) console.log(`${x.row.file}  ${x.row.lane}  ${x.row.key}: merged ${x.mergedRow} -> ruled ${x.ruled}`);
```

### `dryrun.ts`

```ts
/* 29.0 dry run of 29.3 (read-only): which SIGNED rows would move if the Kiro JSON carried per-entry spans. */
import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from '$WT/node_modules/js-yaml';
import { splitFrontmatter } from '$WT/tools/agent-generator/frontmatter';
import { entryTree } from '$WT/tools/agent-generator/partition';
import { readConsumerSpans, rowSpanSource, renderedHashOf } from '$WT/tools/agent-generator/derive';
const ROOT = process.argv[2];
const spans = readConsumerSpans(ROOT)!;
const PROFILE = path.join(ROOT, 'canonical/profiles/consumer');
const agents = fs.readdirSync(PROFILE).filter((f) => f.endsWith('.dispositions.yaml') && !f.startsWith('_')).map((f) => f.replace('.dispositions.yaml', ''));
let signed = 0, fresh = 0; const moves: string[] = []; const jsonRendered: string[] = [];
// The JSON's entry-sourced fields (kiro.ts emitConfig L242-303): name<-agent, description, allowedTools<-toolSubset.*,
// resources<-ambient governance members + skills[*] + knowledgeBases[*] WITH a string source, toolsSettings.write.allowedPaths<-writeScope[*],
// hooks.agentSpawn<-preflight[*], keyboardShortcut/welcomeMessage<-kiro.*.
const inJson = (p: string, value: any, fm: any) =>
  p === 'agent' || p === 'description' || p.startsWith('toolSubset.') || p.startsWith('skills[') || p.startsWith('writeScope[') ||
  p.startsWith('preflight[') || p === 'kiro.keyboardShortcut' || p === 'kiro.welcomeMessage' ||
  (p.startsWith('ambient[') ) ||
  (p.startsWith('knowledgeBases[') && typeof (value?.source) === 'string');
for (const a of agents) {
  const doc = loadYaml(fs.readFileSync(path.join(PROFILE, `${a}.dispositions.yaml`), 'utf8')) as any;
  const src = doc.source as string;
  const { frontmatter } = splitFrontmatter(fs.readFileSync(path.join(ROOT, src), 'utf8'), src);
  const leaves = new Map(entryTree(frontmatter).units.map((l: any) => [l.path, l.value]));
  const fmRows = doc.frontmatter ?? {};
  const rendered = (p: string) => !['no-consumer-counterpart', 'superseded-by'].includes(fmRows[p]?.disposition);
  const jsonSet = new Set([...leaves.entries()].filter(([p, v]) => rendered(p) && inJson(p, v, frontmatter)).map(([p]) => p));
  jsonSet.forEach((p) => jsonRendered.push(`${a}: ${p}`));
  for (const lane of ['body', 'frontmatter'] as const) for (const [key, row] of Object.entries((doc[lane] ?? {}) as Record<string, any>)) {
    if (!row?.signature) continue; signed++;
    const s = rowSpanSource(src, lane, key);
    if (renderedHashOf(spans, s) === row.signature.renderedHash) fresh++;
    if (lane === 'frontmatter' && jsonSet.has(key)) {
      const sim = new Map(spans); sim.set(s, [...(spans.get(s) ?? []), { artifact: `canonical/_consumer-output/kiro/.kiro/agents/${a}.json`, text: 'x\n' }]);
      if (renderedHashOf(sim, s) !== row.signature.renderedHash) moves.push(`${a}.dispositions.yaml#${key} (${row.disposition}, signer ${row.signature.signer})`);
    }
  }
}
console.log(`signed agent rows: ${signed}; fresh against the committed renderings before the dry run: ${fresh}`);
console.log(`entries the Kiro JSON renders (per-entry span candidates): ${jsonRendered.length}`);
console.log(`would-move signed rows: ${moves.length}`); moves.forEach((m) => console.log('  ' + m));
console.log('JSON-rendered knowledgeBases/description entries:'); jsonRendered.filter((x) => /knowledgeBases|description/.test(x)).forEach((x) => console.log('  ' + x));
```
