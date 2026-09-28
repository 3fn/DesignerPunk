# Task 11.3 completion: construct exemplars G and G′

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Parent**: Task 11 · **Agent**: Stacy (Opus), the tiered secondary on 11.3. Thurgood (Opus) is the parent's PRIMARY.
**Date**: 2026-09-27 · **Branch**: `task/123-u2a-g1-stacy`, cut from `task/123-u2a-g1` @ `285d8bd4`. The orchestrator merges it into the unit branch.
**Tick**: not ticked here. Thurgood owns `tasks.md` on this unit.

**Closed-negative disclosure** (Task 12's G1 record reuses this line verbatim): *Not independently re-verified. Confirmed by the auditing seat: Stacy confirmed exemplars A–E, G and G′, constructed G and G′, and runs G1 over all eleven.*

## What changed

- **`canonical/operative-sets/start-up-tasks.yaml`** (new; a C1 carve-out artifact). It is the C16 operative-set record for the two units G and G′ use.
  - It records `source`, `owner: thurgood` and `confirmer: stacy`. The owner is the profile author, so under C1 the counterpart seat confirms.
  - Each unit carries its `canonicalHash`, its items (`id`, `kind`, a human-only `label`, and the complete verbatim `text`) and its `confirmation:` path.
  - G's unit has 7 items. G′'s unit has 4.
- **`canonical/profiles/consumer/confirmations/start-up-tasks.md`** (new; a C1 carve-out artifact). This is my C1 confirmation of those two operative sets. For each unit it gives the classification rule applied, the reason each item is operative, and the text excluded as non-operative.
- **`.kiro/specs/123-consumer-distribution/completion/task-11-3-exemplars-g-gprime.md`** (new). This holds:
  - both constructions in full, between extractable markers;
  - the **required verdicts, committed before G1 runs**: **G → TRIVIAL** by (b) through 5b, with (c) verdict-bearing; strict 0/7, judged 0/7, most lenient 1/7, and it flips only at ≥4/7. **G′ → NOT TRIVIAL** by 5b; strict 0/4, with an independent route under S3-A1 because its removals cite subtractions 2 and 3; judged 4/4, and it flips only if 3 of 4 are denied;
  - the pair's stated non-discrimination limits;
  - one question named for G1 before the run: entailment across redundant items.

## Targeted checks + result

- **Partition golden test**: `npx jest -c tools/agent-generator/jest.config.js tools/agent-generator/__tests__/partition.golden.test.ts` → **45/45 pass**. This includes `the start-up-tasks item anchors Task 11 names (G and G′) exist`.
- **Record checks** (the script below, run from the worktree root with `npx tsx <script>`) → **ALL PASS**:
  - C1 owner/confirmer;
  - 2 of 2 anchors resolve;
  - 2 of 2 canonicalHash values equal `sha256(unit.text)`;
  - 11 of 11 item texts are verbatim substrings;
  - 2 of 2 confirmation fragments resolve to note headings;
  - the note carries the same hashes and item ids.
  - **Strict retention over the committed renderings: G = 0/7, G′ = 0/4.**
- **Bites on the checks themselves**:
  - With `BITE_IDENTITY=1`, the canonical unit text is scored as its own rendering. Result: **7/7 and 4/4**, so the strict count is not vacuous.
  - Paraphrasing `wait-3` in the YAML (`continue` → `proceed`) produced **`FAIL verbatim substring: wait-3`**, so the substring check is not vacuous. I then restored the YAML and re-ran it: ALL PASS.
- **`npm run audit:coverage-map`** → **FAIL, as expected and sequenced.**
  - It reports 2 unadjudicated blank rows, which are exactly the two new canonical files, plus `adjudicated-blank: 1`, the pre-existing `canonical/generated.lock`.
  - F3 at 11.5 is the scheduled disposition for these rows.
- **`npm run check:122:diff-guard`**: **not re-verified. The toolchain is unavailable in this worktree** (`Cannot find module '../../mcp-server/dist/index'`: the worktree has no built MCP dist).
  - Expected state: **red** until 11.5 regenerates `canonical/coverage-map.yaml`. The new canonical files add rows to that generated output and change the input-closure lock.
- **Main checkout untouched**: `git -C <main checkout> status --porcelain` → empty.

<details><summary>The record-check script (uses paths relative to cwd)</summary>

```ts
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
const W = process.cwd();
const { load } = require(W + '/node_modules/js-yaml');
const { splitFrontmatter } = require(W + '/tools/agent-generator/frontmatter');
const { partition, slugify } = require(W + '/tools/agent-generator/partition');
const rec: any = load(fs.readFileSync(W + '/canonical/operative-sets/start-up-tasks.yaml', 'utf8'));
const src = fs.readFileSync(path.join(W, rec.source), 'utf8');
const tree = partition(splitFrontmatter(src).body);
const unitText = (a: string) => tree.units.find((u: any) => u.anchor === a)?.text;
let fail = 0;
const ok = (c: boolean, m: string) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fail++; };
ok(rec.confirmer === 'stacy' && rec.owner === 'thurgood', 'C1: owner thurgood == profile author thurgood -> confirmer stacy');
const record = fs.readFileSync(W + '/.kiro/specs/123-consumer-distribution/completion/task-11-3-exemplars-g-gprime.md', 'utf8');
const rendering = (tag: string) => {
  const m = record.match(new RegExp(`<!-- ${tag}-rendering:begin -->\\n\`\`\`\`text\\n([\\s\\S]*?)\`\`\`\`\\n<!-- ${tag}-rendering:end -->`));
  if (!m) throw new Error('no rendering ' + tag); return m[1];
};
const renders: Record<string, string> = {
  '#item-critical-wait-for-user-authorization-before-starting-new-tasks': rendering('G'),
  '#item-civitas-governance-health-check': rendering('Gprime'),
};
for (const [anchor, u] of Object.entries<any>(rec.units)) {
  const t = unitText(anchor);
  ok(t !== undefined, `anchor resolves: ${anchor}`);
  const h = 'sha256:' + crypto.createHash('sha256').update(t).digest('hex');
  ok(h === u.canonicalHash, `canonicalHash matches: ${anchor}`);
  for (const it of u.items) ok(t.includes(it.text), `verbatim substring: ${it.id} (${JSON.stringify(it.text).slice(0, 60)})`);
  const [p, frag] = u.confirmation.split('#');
  const note = fs.readFileSync(path.join(W, p), 'utf8');
  const heads = note.split('\n').filter((l) => /^#{1,6} /.test(l)).map((l) => slugify(l.replace(/^#+ /, '')));
  ok(heads.includes(frag), `confirmation resolves: ${u.confirmation}`);
  ok(note.includes(u.canonicalHash), `confirmation note carries the same hash: ${anchor}`);
  for (const it of u.items) ok(note.includes('| ' + it.id + ' |'), `confirmation note lists item ${it.id}`);
  const r = process.env.BITE_IDENTITY ? t : renders[anchor];
  const kept = u.items.filter((it: any) => r.includes(it.text)).map((it: any) => it.id);
  console.log(`STRICT ${anchor}: ${kept.length}/${u.items.length} verbatim [${kept.join(',')}]`);
}
console.log(fail ? `FAILURES: ${fail}` : 'ALL PASS');
process.exit(fail ? 1 : 0);
```

</details>

## Application-time adaptations

- **The source is the shipped steering doc, not a `canonical/` copy.** The brief assumed a `canonical/` copy of `start-up-tasks.md`, and none exists. Under path (B) (Req 12.1a), the always-set counterpart is `.kiro/steering/start-up-tasks.md`, so `source:` names that file.
- **Reconciled with Thurgood's 11.1 scheme.** His draft files appeared in the main checkout during this subtask, and I read them without editing (`canonical/operative-sets/{stacy,lina,component-family-navigation}.yaml`, uncommitted).
  - **Filename**: source-keyed, one file per source. `start-up-tasks.yaml` already matched.
  - **Hash convention**: `sha256:` + hex over the unit's exact UTF-8 bytes from `partition(splitFrontmatter(src).body)`. Already matched.
  - **`kind` vocabulary**: his scheme uses `obligation | step | member | route | command`. I had used `enumeration-member`, and I changed it to `member` in the record and the note before committing.
  - **One convention difference, kept on purpose and documented in the record's header.** His header says list markers and indentation are not part of an item's text, and that multi-line items keep their internal bytes. `wait-1` is a multi-line item: its `WHEN … THEN you MUST:` trigger scopes the obligation, so the `   - ` between its two lines stays in the text. Removing the trigger would truncate the operative condition, which is C16's one dependence.
- **G's construction differs from my tasks-round sketch** (*"Wait for the user before continuing."*).
  - Worked item by item, the sketch reaches 4/7 under an entailment-counting judge, so it cannot carry a required verdict.
  - I replaced it with the (c)-shaped gutting the plan describes. The unit, the required verdict and the item count of about 7 are unchanged.
  - The entailment question the sketch exposed is named for G1 in the construction record. It is not a twelfth exemplar, because the plan asserts the count at eleven.
- **Coverage-map count discrepancy for 11.5, surfaced and not resolved here.** Task 11's F3 criterion requires `grep -c "expires when 123 Task 13.6"` → **N, where N equals the audit's `adjudicated-blank` count**. That count already includes 1 pre-existing row (`canonical/generated.lock`, ruling `intentional-trim`, owner Thurgood). As written, the equality cannot hold once the time-boxed rows are added: `adjudicated-blank` will be N + 1.
  - The criterion text is Thurgood's, so how to read it is his call or Peter's.
  - I need that reading before I run 11.5.
