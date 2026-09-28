# Task 11.2 completion (Stacy's half): owner confirmations under C1 for `stacy.md`

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Parent**: Task 11 · **Agent**: Stacy (Opus), the tiered secondary. Thurgood (Opus) is PRIMARY.
**Date**: 2026-09-27 · **Branch**: `task/123-u2a-g1-stacy` @ `87742c71`. The orchestrator merges it into the unit branch.
**Scope**: my charter's six exemplar units only. Lina's units and `component-family-navigation` are **not** in this half: her write grant is a fork with Peter.
**Tick**: not ticked here. 11.2 has further halves, and Thurgood owns `tasks.md`.

**Closed-negative disclosure**: *not independently re-verified. Confirmed by the auditing seat.* I constructed A–E, I confirm their operative sets, and I run G1.

## What changed

- **`canonical/profiles/consumer/confirmations/stacy.md`** (new). My C1 confirmation of the six units in Thurgood's proposed note format, which I adopted unchanged: a `` ## `#anchor` `` heading, then `confirmer:` / `canonicalHash:` / `items:` / `date:`, then a written ruling per unit.
- **`canonical/operative-sets/stacy.yaml`** (edited as confirmer). Four corrections, each ruled in the note:
  - `#the-charter-cut-ratified-verbatim`: 0 → 2 items (`cut-thurgood`, `cut-stacy`).
  - `#honest-reach-…`: 0 → 2 items (`reach-artifact-truth`, `reach-green-is-not-honesty`).
  - `#the-owed-set-pipeline-…`: 15 → 14 items. `owed-set-midnight-pin` is removed as rationale; the `00:00` pin stays operative inside stages 1a and 1b.
  - `#what-parity-means`: the trailing lead-in `It means:` is trimmed from `parity-not-identical`.
  - Unit comments are updated to the new counts.
- **`canonical/profiles/consumer/confirmations/start-up-tasks.md`** (format only). I added the same four key lines to both 11.3 unit blocks so that one mechanical check covers every note. Confirmed content is unchanged.
- **The three rulings Thurgood's 11.1 listed for me**:
  1. **C(c1)**: both named units carry operative items under 5c (2 + 2). C(c1)'s zero-item premise is false on both. **This is carried to G1 as an instantiation fork**: re-instantiate C(c1), or record that clause (a) is exercised only by F's `#purpose`. It is not a BREAKS of the definition.
  2. **Owed-set**: **14 items**, not 15. My "~10" was an estimate by kind, and it was low.
  3. **Trigger set**: **13 items, confirmed**. That is the 11 rows, the retired BURST row included because its retirement is violable, plus the two paragraphs.
- **Also confirmed**: Audit Checklist at 30 and What Parity Means at 7. **New finding for 13.4 (Lina, `triviality.ts`)**: `documentation-3` and `lessons-learned-capture-2` share one text. A strict matcher that uses `includes` over-counts by one when only one copy survives — the clearing direction. The property needed: credit at most as many same-text items as there are occurrences in the rendering.

## Targeted checks + result

- **Record-and-note check** (the script below; `npx tsx <script> canonical/operative-sets/<stem>.yaml`, run from the worktree root):
  - `stacy.yaml` → **ALL PASS (253 checks)**.
  - `start-up-tasks.yaml` → **ALL PASS (50 checks)**.
  - The checks cover:
    - the C1 confirmer;
    - that every anchor resolves under `partition()`;
    - that every hash equals `sha256(unit.text)`;
    - unique ids;
    - that each item text is a verbatim substring;
    - no leading or trailing whitespace;
    - that each `kind` is one of the five;
    - that each confirmation fragment resolves to a `## ` block whose `confirmer:`, `canonicalHash:` and `items:` lines equal the record's, and which carries a `date:`.
- **Bites**:
  - Dropping one id from a note's `items:` line → `FAIL note items == record items: the-charter-cut-ratified-verbatim (1 vs 2)`.
  - Corrupting a note's hash → `FAIL note hash: what-parity-means`.
  - Both were restored, and the check was re-run: ALL PASS.
  - Before the retrofit, `start-up-tasks.yaml` failed 8 checks, all on the note's missing key lines. That confirms the check reads them.
- **The 11.3 G/G′ check** (`task-11-3-completion.md`'s script) → still **ALL PASS**, with strict retention G 0/7 and G′ 0/4 unchanged.
- **`npm run audit:coverage-map`** → **FAIL, as expected**: 6 unadjudicated blank rows (four operative-set files and two confirmation notes), plus `adjudicated-blank: 1` (`generated.lock`). 11.5 handles these. The audit's rewrite of `coverage-map.yaml` was reverted.
- **`npm run test:agent-generator`** → 221/221 tests pass in the 19 suites that load.
  - The other 11 suites **could not be re-verified here: the toolchain is unavailable**. Every failure is `Cannot find module '…/mcp-server/dist/index'`, and this worktree has no built MCP dist.
  - Thurgood's 11.1 run in the main checkout reported 30 suites and 405 tests passing.
- **Main checkout untouched** by me.

<details><summary>The record-and-note check script</summary>

```ts
// Usage (from repo root): npx tsx <this> canonical/operative-sets/<stem>.yaml
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
const W = process.cwd();
const { load } = require(W + '/node_modules/js-yaml');
const { splitFrontmatter } = require(W + '/tools/agent-generator/frontmatter');
const { partition, slugify } = require(W + '/tools/agent-generator/partition');
const recPath = process.argv[2];
const rec: any = load(fs.readFileSync(path.join(W, recPath), 'utf8'));
const tree = partition(splitFrontmatter(fs.readFileSync(path.join(W, rec.source), 'utf8')).body);
let fail = 0, n = 0;
const ok = (c: boolean, m: string) => { n++; if (!c) { fail++; console.log('FAIL ' + m); } };
const PROFILE_AUTHOR = 'thurgood';
const c1 = (owner: string) => owner === PROFILE_AUTHOR ? 'stacy' : owner;
ok(rec.confirmer === c1(rec.owner), `confirmer ${rec.confirmer} == C1(${rec.owner})`);
const notes: Record<string, string> = {};
for (const [anchor, u] of Object.entries<any>(rec.units)) {
  const unit = tree.units.find((x: any) => x.anchor === anchor);
  ok(!!unit, `anchor resolves: ${anchor}`); if (!unit) continue;
  ok('sha256:' + crypto.createHash('sha256').update(unit.text).digest('hex') === u.canonicalHash, `hash: ${anchor}`);
  const ids = u.items.map((i: any) => i.id);
  ok(new Set(ids).size === ids.length, `ids unique: ${anchor}`);
  for (const it of u.items) {
    ok(unit.text.includes(it.text), `verbatim: ${anchor} ${it.id}`);
    ok(it.text === it.text.trim(), `no edge whitespace: ${it.id}`);
    ok(['obligation', 'step', 'member', 'route', 'command'].includes(it.kind), `kind: ${it.id}`);
  }
  const [np, frag] = u.confirmation.split('#');
  const note = notes[np] ??= fs.readFileSync(path.join(W, np), 'utf8');
  // the block under the matching `## ` heading, up to the next `## `
  const blocks = note.split(/^(?=## )/m);
  const block = blocks.find((b) => b.startsWith('## ') && slugify(b.split('\n')[0].replace(/^## /, '')) === frag);
  ok(!!block, `confirmation resolves: ${u.confirmation}`); if (!block) continue;
  const field = (k: string) => (block.match(new RegExp(`^${k}: (.*)$`, 'm')) || [])[1]?.trim();
  ok(field('confirmer') === rec.confirmer, `note confirmer: ${frag}`);
  ok(field('canonicalHash') === u.canonicalHash, `note hash: ${frag}`);
  const noteIds = field('items') === 'none' ? [] : (field('items') || '').split(',').map((s) => s.trim()).filter(Boolean);
  ok(JSON.stringify(noteIds) === JSON.stringify(ids), `note items == record items: ${frag} (${noteIds.length} vs ${ids.length})`);
  ok(/^date: \d{4}-\d{2}-\d{2}$/m.test(block), `note date: ${frag}`);
  console.log(`${anchor}: ${ids.length} items`);
}
console.log(fail ? `FAILURES: ${fail}/${n}` : `ALL PASS (${n} checks)`);
process.exit(fail ? 1 : 0);
```

</details>

## Application-time adaptations

- **Four record edits, made in the confirmer's seat**, as 11.6.5d places them. The drafter's text was corrected by me, not by him.
- **One of the four is a narrowing** (the owed-set unit, 15 → 14). The note states it as the direction 5d watches, and gives its size: B's clearing threshold moves from 8/15 to 7/14.
- **The 11.3 note was retrofitted** to the adopted key-line format, so that one check covers both notes. The retrofit adds key lines only; the confirmed content is unchanged.
- **The C(c1) fork is surfaced, not picked.** Re-instantiating an exemplar changes the construction the requirements table names, so the pick belongs to the orchestrator or Peter, before G1 runs.
