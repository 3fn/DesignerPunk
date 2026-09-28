# G1: C3's falsification pass, run 2

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Gate**: G1 (design § "Gates and sequencing", U2 step 4; Req 11.6.7) · **Run**: 2 (run 1 BREAKS, `35610fef`)
**Verdict author**: Stacy. This record sits outside every delegated-tier line. Thurgood, the executing agent, is recused as C3's owner and as the profile author.
**Date**: 2026-09-27 · **Branch**: `task/123-u2a-g1-stacy12` @ `a5d1d2a5`
**Requested by**: `task-12-2-completion.md` (`a5d1d2a5`)

---

## VERDICT: **HOLDS**

- **All eleven exemplars reproduce their required verdicts under the reworked text.** That includes every per-unit restatement committed in run 1, and in particular Lina-1 `#ios` and `#android`, which run 1 left dependent on the judge.
- **No attack I constructed breaks a clause.** B-1 is closed: AX-1 now routes, and the occurrence assignment survives its edge cases. B-2 is determined: 5e settles the implied items, and applied as written it rejects the owner's own lenient 4/7 reading of G's sketch.
- **Consequence** (Req 11.6.7; Task 12, criterion 3):
  - U2a proceeds to submission (12.3), and G2 (pass four) is schedulable;
  - Task 13 proceeds in U2b.
- **Findings carried, not verdict-bearing.** One is high priority and must land before the first routed signature: **R2-F1**, the scope of 5e's "the rendering" (below). There are four drift notes and three advisories.

**G1 runs: 2**, so M-1 fires: after U2a's acceptance I perform the scoped post-acceptance read (`completion/u2a-task-12-scoped-read.md`).

**Closed-negative disclosure**: *not independently re-verified. Confirmed by the auditing seat.*
- I confirmed the operative sets of A–E, G and G′.
- I constructed A–E, G and G′.
- In run 1 I instantiated the table's constructions as renderings, restated the verdicts per unit, and stated C(c1)'s replacement required verdict. **This run tests those same commitments, unchanged.** Nothing required was edited between runs.

---

## What was tested, and against what state

- **The text under test** (the reworked text at `a5d1d2a5`):
  - `requirements.md` (blob `deeb810b`) § 11.6, lines 403–479, including the new 5e (line 446) and 5f (line 457); and 11.7.2 (line 482);
  - `design.md` (blob `bf8d57b7`) § C18, lines 621–640.
- **Both blobs match the "after" column** of `task-12-2-completion.md`.
- **All other inputs are byte-identical to run 1's pinned blobs.** I checked the four records, the four notes, the 11.3 record and the four canonical sources, and `git diff 2b8304f4 HEAD -- canonical/` is empty.
- **The renderings are run 1's**, read from `re-grounding-c3-falsification-run-1.md` (blob `dd69678b`, committed in `35610fef`) by the Appendix script, with no copy kept here. Run 2 adds three judgment-attack renderings, in its own Appendix.
- **The strict floor is computed three ways**: plain `includes` (the pre-rework comparand, now named invalid); **C18 clause 2 as reworked**, a greedy valid occurrence assignment as the owner describes; and the **maximum** valid assignment, found exhaustively, which checks whether greedy under-counts where it matters.

---

## Reproduction, exemplar by exemplar, under the reworked text

The routed judgment applies **5e literally**: an item is retained if and only if **every** implementation that complies with what the unit's rendering states also complies with the item. **I name a counter-implementation wherever I deny an item.**

| Exemplar | Unit | Required (run 1) | Strict floor: includes / assigned / max | 5e judgment | Reproduced? |
|---|---|---|---|---|---|
| **A** | `#audit-checklist` | TRIVIAL | 0 / 0 / 0 → routes | "Audit the work against the standards." refers to standards it never states, so an auditor can skip every listed question and still comply → **0/30** | **yes** |
| **B** | owed-set pipeline | TRIVIAL | 0 / 0 / 0 → routes (also routes under S3-A1) | a goal with no predicate (5e's own worked exclusion) → **0/14** | **yes** |
| **C(c1)** | two units | NOT A FINDING | byte-identical → outside the entry set; 2 / 2 / 2 CLEARS if entered | n/a | **yes** |
| **C(c2)** | `#what-parity-means` | TRIVIAL | 0 / 0 / 0 → routes | "Not same code" is compatible with `parity-not-identical`, but a reviewer who demands identical token strings still complies with the rendering. "Same structure" is compatible with, but does not entail, the same IA → **0/7** | **yes** |
| **D** | `#the-trigger-set-…` | TRIVIAL | 1 / 1 / 1 → routes | the CLOSEOUT row is stated; nothing else is entailed → **1/13** | **yes** |
| **E** | owed-set pipeline | NOT TRIVIAL | 0 / 0 / 0 → routes (also routes under S3-A1) | every item entailed once its referents are re-keyed (predicate → their adoption record; stages → `$SPECS_DIR`; Q2 sitting → subtraction-3) → **14/14** | **yes** |
| **F** | `#purpose` / `#key-characteristics` | INAPPLICABLE / OPERATIVE | n/a | unaffected by the rework: 0 items → (a); 5 items → 5c | **yes** |
| **Lina-1** | preamble | TRIVIAL | 0 / 0 / 0 | a label only → **0/2** | **yes** |
| | `#web` | TRIVIAL | 0 / 0 / 0 | "Use Web Components." is met by custom elements without Shadow DOM, so it does not entail the Component Model item. Styling, extension and the key rule are not stated → **0/4** (run 1 judged 1/4; 5e is stricter here) | **yes** |
| | `#ios` | **NOT TRIVIAL** | 0 / 0 / 0 | SwiftUI is stated. A SwiftUI UI cannot be written in anything but Swift, so "Swift (native)" is entailed. `.ios.swift` is not → **2/3** | **yes (B-2 determined)** |
| | `#android` | **NOT TRIVIAL** | 0 / 0 / 0 | Compose is stated, and Compose is Kotlin-only, so Kotlin is entailed. `.android.kt` is not → **2/3** | **yes (B-2 determined)** |
| | `#cross-platform-consistency` | ABSENT | — | clause (ii)'s trigger | **yes** |
| **Lina-2** | preamble | NOT A FINDING | byte-identical; 1 / 1 / 1 if entered | n/a | **yes** |
| | steps 1–7 | TRIVIAL ×7 | 0 each | the headings are labels, and "Create the file." constrains nothing → **0/k** each | **yes** |
| **G** | `#item-critical-wait-…` | TRIVIAL | 0 / 0 / 0 | "Report that the task is complete" is a tautology on the trigger. "Follow your team's conventions" is a reference. "❌ Leave a completed task unreported" is a different prohibition → **0/7** | **yes** |
| **G′** | `#item-civitas-governance-health-check` | NOT TRIVIAL | 0 / 0 / 0 → routes (also routes under S3-A1) | the 30-day cadence and the steward are our referents (subtractions 3 and 2). With them re-keyed, all four items are entailed → **4/4** | **yes** |

**Section cross-check (pooled; not a verdict)**: Lina-1 is 4/14 → trivial. Lina-2 is 1/25 → trivial.

---

## Attacks constructed, and outcomes

**R2-AX-1 — B-1, re-run → CLOSED.**
- AX-1 gives `includes` 15/30 CLEARS, `assigned` **14/30 routes**, and `max` 14.
- **The routed judgment on AX-1, stated so it is not hidden**: 5e credits both same-text items once their shared constraint is entailed, so the judge reads **15/30 = half → NOT TRIVIAL**. Counted by *distinct* constraints, the rendering keeps 14 of 29.
  - The declared choice is "the judgment counts function; only the mechanical count is occurrence-bound". That is visible to the human who judges, and clause (iii) flags the 16 uncited removals.
  - **Advisory R2-A1**: duplicates double-count in the judgment. At the exact half boundary that moves a verdict, which is 11.6.6(i)'s arbitrary number on a new shape. It is not a break: the judgment half claims no soundness property of the "can only under-count" kind.

**R2-AX-2 — the assignment rule's edge cases → holds; advisory R2-A2.** These are synthetic cases (Appendix, `EDGE` lines):
- a shared text rendered twice in one sentence → 2 credited;
- a shared text rendered once → 1;
- a contained text where only the container is rendered → 1;
- overlapping texts in one span → 1;
- adjacent, non-overlapping texts → 2;
- an occurrence inside a gained quote is credited, which is 11.7.2's named class.

**"Any valid assignment is sound" is true as worded.** A valid assignment's size never exceeds the maximum disjoint retention, and anything smaller routes.

**R2-A2**: the owner's named implementation, greedy by earliest end, is **not maximal**. With a contained text that also occurs on its own (`"alpha beta gamma. beta"`, items `alpha beta gamma` and `beta`), greedy assigns `beta` inside the container and credits **1**, while the maximum is **2**.
- This is the safe direction, and the definition permits it.
- But it means a near-verbatim unit can route falsely, and the property "a verbatim unit gets full credit" does not follow from greedy in general. It holds on today's corpus only because the corpus has no contained texts; the owner's own identity-rendering check confirms that.
- This is for 13.4 (Lina) to decide: accept false routes, or implement a maximal assignment (a small bipartite matching).

**R2-AX-3 — the clearing surface entailment opens: the G sketch, "Wait for the user before continuing." → holds (2/7, TRIVIAL).** Read literally, 5e is stricter than the owner's own reading of 4/7. The counter-implementation that denies four items is an agent that reports completion, waits for the user's next message, receives "thanks!", and starts the next task.
- That agent complies with the rendering, since it waited for the user, but it violates:
  - `wait-1` (no authorization);
  - `wait-3` (it assumed continuation);
  - `wait-4` (no explicit request);
  - `wait-7` (it implemented without an explicit request).
- A second agent that reads next-task files while it waits also complies, and violates `wait-6`.
- **Entailed**: `wait-2` (no automatic proceeding) and `wait-5` (no announce-and-start in the same turn).
- **2/7 → TRIVIAL.**
- **What this shows**: 5e is **determinate in form**, because every denial is settled by exhibiting a compliant-but-violating implementation. Judge variance survives in practice all the same: the rule's author over-credited "wait for the user" as "wait for authorization". **Advisory R2-A3**: the signer's assent should be read expecting this over-credit. A committed calibration exemplar for a partial compression would pin it, but the count is asserted at eleven, so that would be a tasks amendment and is the owner's or Peter's to take up.

**R2-AX-4 — a sweeping statement that entails many items → holds.**
- "Do not start any task." (rendering G-blanket) makes **all seven** of G's items impossible to violate, including vacuously, because every item is a stop, wait or prohibition. So **7/7 → NOT TRIVIAL**.
- That is **correct for C3**: no constraint was hollowed, and the rendering over-constrains. The harm is **gained restriction, which is 11.7.1's named limitation**, not triviality's.
- Units with positive obligations resist it: `#audit-checklist` under "Do nothing." scores 0/30.

**R2-AX-5 — entailment through a referent the rendering itself re-keys → holds.**
- G′ re-keys `hc-1`'s ">30 days" to "(or more than the interval your team has recorded)". An implementation with a 90-day interval does not flag at day 45, which violates the literal 30-day item.
- 5e reads the item **with its repo-bound referents re-keyed** (5b), and our cadence is repo-bound (subtraction-3), so the re-keyed item is entailed.
- **So 5e's result depends on which parts of an item the judge treats as repo-bound**, and it inherits the subtraction list's enumeration limit (A9). That dependency is 5b's, not new. The line between a re-keyed **referent** (allowed: "their adoption record") and a **reference** that outsources the constraint itself (excluded: `wait-4`'s "your team's conventions") is drawn by judgment. E, G′ and G land on the right side of it.

**R2-AX-6 — entailment from outside the unit → holds under the governing reading. This produces R2-F1 (HIGH, carried).**
- **The construction**:
  - Lina-1 `#ios` is emptied to its heading.
  - A **different** section of the consumer charter, one gained or retained elsewhere, states "iOS: SwiftUI in Swift; files end `.ios.swift`".
  - **Unit-scope reading**: 0/3 → TRIVIAL → clause (ii) demands a disposition. The honest one is `superseded-by`.
  - **Charter-scope reading**: 3/3 entailed by "another surviving statement" → NOT TRIVIAL → **no disposition is ever demanded**. The emptied unit's function moved without declaration, and **pass four's derivation criterion never runs on it**, because it keys on a disposition.
  - **That is attack (a)'s move ("a lucky adjacent section") delivered through the bar instead of through a declared destination.**
- **Why this holds, not breaks**:
  - The governing clause (b) fixes the subject: "**its** rendering retains". 5f fixes "section" as a unit.
  - C18's entry set and C17's per-unit `renderedHash` make the judged object the unit's rendering.
  - Read against (b), "what the rendering states" in 5e is the unit's rendering.
- **Why it is still HIGH**:
  - 5e itself does not say so. Its "**another surviving statement**" invites the charter-wide reading.
  - 5f's scoping sentence covers (a), (b) and 5b, **but not 5e**.
  - "The rendering" means the whole consumer charter elsewhere in Req 11 (clause (ii); 11.7.1).
  - **The gap also predates the rework**: 5b's "its FUNCTION survives" was always unscoped. Run 1 did not construct this attack, and that was a miss in run 1. 5e made the gap easier to reach.
- **R2-F1, the property owed** (I supply no text): the definition must state that entailment is read **within the unit's own rendering**, so that a function that survives only elsewhere takes a disposition. This must hold before **the first routed signature (Task 15's first render)**.
  - **I will read it at U2b's MIDPOINT claims pass.**
  - **G2 should run the no-disposition, cross-unit variant of attack (a) beside the verbatim one.** Adding that to G2's scope needs the plan's owner, so it is surfaced, not assumed.

**R2-AX-7 — are 5e's exclusions a closed list a gutting can escape? → holds.** The universal test does the rejecting; label, reference and bare goal are consequences of it, not an allow-list. I tried:
- a higher abstraction ("Follow good process.");
- an example-only rendering (G's example block kept alone);
- a permissive inversion ("continue when you judge the user is satisfied");
- a tautology on the trigger.

Each leaves a compliant-but-violating implementation, so each entails nothing.

**R2-AX-8 — does 5f match run 1's grain rule in effect? → yes for every current exemplar; drift note DR-4 below.**

---

## Drift beyond the findings

I read the full diff, `2b8304f4..a5d1d2a5`, over `requirements.md` and `design.md`. (a), (b), 11.6.3, 5a, 5c, 5d and 11.6.6–11.6.8 are byte-unchanged, and the 11.6.5 rows are not rewritten; a pointer is added.

| Id | Where | Drift | Weight |
|---|---|---|---|
| **DR-1** | C18 clause 2, "Required bite (13.4)" | **A promised artifact with no criterion row.** Task 13's criteria (`tasks.md`) do not carry the AX-1 occurrence bite or "per-item `includes` is invalid". A claims pass at U2b would find it only by reading C18. | **Medium.** Owed to the tasks owner before 13.4 runs, as a claims-surface gap, not a C3 defect |
| DR-2 | 5e, last bullet | Redefines what 11.5.6's itemized assent lists ("items the signer finds **entailed**", which was "surviving"). It follows from B-2 and adds no behaviour beyond it, but it reaches into C17's signature semantics without an edit there. | Low; note for the C17/11.5.6 reader |
| DR-3 | 5e, "Direction" bullet | Says "entailment is stricter than 'the function is mentioned'". That is true, but it is one-sided: 5e is also **wider** than the own-content-stated reading, because it credits implied items (B-2's purpose; `#ios` goes 1/3 → 2/3). Do not read the bullet as "5e only narrows". | Low |
| DR-4 | 5f | Codifies run 1's rule for **gutting** exemplars. It omits the **faithful-exemplar** direction ("every unit NOT TRIVIAL") and the line "pooled count is a cross-check only". No current effect, since E and G′ are single-unit. | Low; for the table fold |

**Stale context, not drift**: "Against the exemplars" still reads B ~0/10 and D 1/11, but the records say 14 and 13. That is left for the table fold.

---

## Findings carried (none verdict-bearing)

| Id | Class | Owner | Lands before |
|---|---|---|---|
| **R2-F1** | **HIGH**: the scope of 5e's "the rendering" (and of 5b's "survives"), R2-AX-6 | Thurgood (C3) | the first routed signature (Task 15); I check it at the U2b MIDPOINT |
| DR-1 | Medium: the C18 required bite has no Task 13 criterion row | Thurgood (`tasks.md`) | 13.4 |
| R2-A1 | Advisory: duplicates double-count in the judgment at the boundary | Thurgood (C3) | the next requirements touch |
| R2-A2 | Advisory: greedy earliest-end is not maximal | Lina (13.4) | 13.4 |
| R2-A3 | Advisory: authors and signers over-credit under 5e; no calibration exemplar pins partial compressions | Thurgood / Peter (a tasks amendment) | optional |
| DR-2 – DR-4 | Notes | Thurgood | the next requirements touch |

**The fold-back, and what survives.**
- **The counter-argument**: R2-F1's consequence is attack (a) through the bar, the exact thing Fork B was bought to prevent, so it should be BREAKS. And a HOLDS lets the unscoped sentence reach signers.
- **Folded in**:
  - R2-F1 is carried as HIGH, with a named landing point before any signer uses 5e (Task 15);
  - a named re-check at the U2b MIDPOINT;
  - a recommendation that G2 run the variant.
- **What survives**:
  - The verdict rests on reading 5e through (b)'s "**its** rendering". A signer who reads 5e alone could take the charter-wide reading, and the text does not stop them.
  - **If Peter judges that governing-clause reading insufficient, the correct response is a third rework, not branch A.** Branch A removes the mechanical floor, and the gap is in the routed judgment that branch A keeps.
  - I record this so a later reader does not take the HOLDS as the scope question settled.
- **No fork is surfaced for the verdict itself**; the verdict is this seat's.

---

## G1 DOMAIN LINE (run 2: unchanged from run 1; the exemplars and records are identical)

- **Exercised: the body domain only.**
- **Sources**: two charters (`stacy.md`, `lina.md`), one Layer-3 family doc (`Component-Family-Navigation.md`), and one always-set member (`start-up-tasks.md`).
- **Unit kinds**:
  - heading leaf units (`stacy.md` ×6, `lina.md` ×11, Navigation ×2);
  - `#<parent>:preamble` units ×2 (`lina.md`);
  - **enumeration-kind `#item-…` units ×2 on one always-set member** (G, G′).
- **Item kinds**: obligation, step, member, command, and route (G′ `hc-2`).
- **Content forms**: lists, a table, a fenced script, `**Label**: value` bullets, and blockquotes.
- **Clause (a) is exercised by F `#purpose` ONLY.**
  - **C(c1)'s zero-item premise is false**: both named units carry 2 operative items (Stacy 11.2; #220 item 4).
  - **The corpus fact**: every preamble on `stacy.md` carries a trigger, an instruction or a precedence rule, so no zero-item unit exists there.
  - **Fragility**: `#purpose`'s inventory sentence is stale.
- **Run 2 adds**: the occurrence assignment, exercised by AX-1 plus synthetic edge cases, which are not exemplars; and 5e, exercised on every routed unit plus R2-AX-3 to R2-AX-7.
- **NOT EXERCISED**:
  - frontmatter entries;
  - shared-catalog members;
  - `#doc:preamble`;
  - the degenerate `#doc`;
  - always-set members other than `start-up-tasks.md`;
  - any heading or preamble unit on an always-set member;
  - C18's hard floor;
  - dispositions, overlays and signatures (C17);
  - **cross-unit entailment against a real rendering.** R2-AX-6 is a construction, and no consumer charter is rendered until U2b.

## What this record does not establish

- **That any code computes these counts** (13.4 builds it); that the check reads the committed record (G2 half (2)); or § 7.2's derivation criterion (G2 half (1)).
- **That signers will apply 5e as literally as this record does** (R2-A3).
- **That the threshold is discriminated.** It is not, as in run 1.
- **Seat authentication.** One git identity. This record lands in its own `Agent: stacy` commit.

**Standards implications:**
1. R2-F1: state the unit scope of entailment (C3; before Task 15).
2. DR-1: carry C18's required bite into Task 13's criteria, since a design-promised bite with no criterion row is the promised-artifact gap (`tasks.md`; before 13.4).
3. R2-A2: whether 13.4's assignment should be maximal.
4. The table fold at the next requirements touch should also take in DR-4 and the stale "Against the exemplars" counts.

---

## Appendix: run 2's added renderings, the check, and its output

These are judgment attacks, not exemplars. Their strict counts are computed alongside run 1's renderings.

<!-- rendering G-sketch start-up-tasks #item-critical-wait-for-user-authorization-before-starting-new-tasks -->
````text
3. **CRITICAL: Wait for User Authorization Before Starting New Tasks**
   
   Wait for the user before continuing.

````

<!-- rendering G-blanket start-up-tasks #item-critical-wait-for-user-authorization-before-starting-new-tasks -->
````text
3. **CRITICAL: Wait for User Authorization Before Starting New Tasks**
   
   Do not start any task.

````

<!-- rendering A-blanket stacy #audit-checklist -->
````text
### Audit Checklist
Do nothing.

````

### The check (run from the repo root: `npx tsx <script> .kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-1.md .kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-2.md`)

```ts
// G1 run-2 strict-floor computation. Usage (repo root):
//   npx tsx <this> <run-1 record> <run-2 record>
// Renderings are read from both records (and G/G′ from the 11.3 record); items come from the committed
// operative-set records, canonical units from partition(). Three counts per rendering:
//   includes  = plain per-item `includes` (C18 before the rework; named INVALID by the rework);
//   assigned  = C18 clause 2 AS REWORKED: a valid occurrence assignment, built greedily (earliest-ending
//               occurrence first, no shared or overlapping occurrences). Any valid assignment is sound;
//   maximum   = the largest valid assignment (exhaustive over small cases), to check greedy is not
//               under-counting where it matters.
import * as fs from 'fs';
const W = process.cwd();
const { load } = require(W + '/node_modules/js-yaml');
const { splitFrontmatter } = require(W + '/tools/agent-generator/frontmatter');
const { partition } = require(W + '/tools/agent-generator/partition');
const rec = (stem: string) => load(fs.readFileSync(`${W}/canonical/operative-sets/${stem}.yaml`, 'utf8'));
const unitsOf = (src: string) => Object.fromEntries(partition(splitFrontmatter(fs.readFileSync(W + '/' + src, 'utf8')).body).units.map((u: any) => [u.anchor, u.text]));
type Iv = [number, number];
const occs = (hay: string, n: string): Iv[] => { const r: Iv[] = []; let i = 0; while ((i = hay.indexOf(n, i)) !== -1) { r.push([i, i + n.length]); i += 1; } return r; };
const overlaps = (a: Iv, b: Iv) => a[0] < b[1] && b[0] < a[1];
// Greedy: repeatedly take the (item, occurrence) pair with the earliest end among unassigned items
// whose occurrence overlaps nothing taken.
export function greedy(text: string, items: string[]): number {
  const cand: [number, Iv][] = []; items.forEach((t, k) => occs(text, t).forEach((o) => cand.push([k, o])));
  cand.sort((x, y) => x[1][1] - y[1][1] || x[1][0] - y[1][0]);
  const used = new Set<number>(); const taken: Iv[] = [];
  for (const [k, o] of cand) if (!used.has(k) && !taken.some((t) => overlaps(t, o))) { used.add(k); taken.push(o); }
  return used.size;
}
export function maximum(text: string, items: string[]): number {
  const per = items.map((t) => occs(text, t)); let best = 0;
  const go = (k: number, taken: Iv[], n: number) => { if (n + (items.length - k) <= best) return; if (k === items.length) { best = Math.max(best, n); return; }
    for (const o of per[k]) if (!taken.some((t) => overlaps(t, o))) go(k + 1, [...taken, o], n + 1);
    go(k + 1, taken, n); };
  go(0, [], 0); return best;
}
const blocks: [string, string, string, string][] = [];
const re = /<!-- rendering (\S+) (\S+) (\S+) -->\n````text\n([\s\S]*?)````\n/g;
for (const f of [...process.argv.slice(2), '.kiro/specs/123-consumer-distribution/completion/task-11-3-exemplars-g-gprime.md']) {
  const t = fs.readFileSync(f.startsWith('/') ? f : W + '/' + f, 'utf8'); let m;
  while ((m = re.exec(t))) blocks.push([m[1], m[2], m[3], m[4]]);
  const g = /<!-- (G|Gprime)-rendering:begin -->\n````text\n([\s\S]*?)````\n/g;
  while ((m = g.exec(t))) blocks.push([m[1] === 'G' ? 'G' : 'G′', 'start-up-tasks', m[1] === 'G' ? '#item-critical-wait-for-user-authorization-before-starting-new-tasks' : '#item-civitas-governance-health-check', m[2]]);
}
const stU = unitsOf('canonical/agents/stacy.md');
for (const a of ['#the-charter-cut-ratified-verbatim', '#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument']) blocks.push(['C(c1)', 'stacy', a, stU[a]]);
blocks.push(['Lina-2', 'lina', '#component-scaffolding-workflow:preamble', unitsOf('canonical/agents/lina.md')['#component-scaffolding-workflow:preamble']]);
for (const [lab, stem, anchor, text] of blocks) {
  const r = rec(stem); const u = r.units[anchor]; if (!u) { console.log(`${lab} ${anchor}: NO RECORD UNIT`); continue; }
  const canon = unitsOf(r.source)[anchor]; const items = (u.items as any[]).map((i) => i.text); const n = items.length;
  const inc = items.filter((t) => text.includes(t)).length, gr = greedy(text, items), mx = maximum(text, items);
  const c = (k: number) => (n > 0 && k / n >= 0.5 ? ' CLEARS' : ' routes');
  console.log(`${lab.padEnd(8)} ${anchor.slice(0, 56).padEnd(56)} ident=${text === canon ? 'Y' : 'n'} n=${n} includes=${inc}${c(inc)} assigned=${gr}${c(gr)} max=${mx}`);
}
// Synthetic edge cases for the assignment rule (not exemplars).
const cases: [string, string, string[], number][] = [
  ['shared text rendered twice in one sentence', 'X ok. X ok.', ['X ok.', 'X ok.'], 2],
  ['shared text rendered once', 'X ok.', ['X ok.', 'X ok.'], 1],
  ['contained text; only the container rendered', 'alpha beta gamma', ['alpha beta gamma', 'beta'], 1],
  ['contained text rendered separately too', 'alpha beta gamma. beta', ['alpha beta gamma', 'beta'], 2],
  ['overlapping texts, one rendering spanning both', 'p q r', ['p q', 'q r'], 1],
  ['adjacent texts, no overlap', 'p qq r', ['p q', 'q r'], 2],
];
for (const [name, text, items, want] of cases) { const g = greedy(text, items), m = maximum(text, items); console.log(`EDGE ${name}: assigned=${g} max=${m} expected=${want} ${g === want && m === want ? 'OK' : 'CHECK'}`); }
```

### Its output at this commit

```
A        #audit-checklist                                         ident=n n=30 includes=0 routes assigned=0 routes max=0
B        #the-owed-set-pipeline-your-command-catalogs-owed-set-en ident=n n=14 includes=0 routes assigned=0 routes max=0
C(c2)    #what-parity-means                                       ident=n n=7 includes=0 routes assigned=0 routes max=0
D        #the-trigger-set-the-114-superset-table-names-never-numb ident=n n=13 includes=1 routes assigned=1 routes max=1
E        #the-owed-set-pipeline-your-command-catalogs-owed-set-en ident=n n=14 includes=0 routes assigned=0 routes max=0
Lina-1   #platform-implementation-true-native-architecture:preamb ident=n n=2 includes=0 routes assigned=0 routes max=0
Lina-1   #web                                                     ident=n n=4 includes=0 routes assigned=0 routes max=0
Lina-1   #ios                                                     ident=n n=3 includes=0 routes assigned=0 routes max=0
Lina-1   #android                                                 ident=n n=3 includes=0 routes assigned=0 routes max=0
Lina-2   #step-1-verify-component-family-doc                      ident=n n=2 includes=0 routes assigned=0 routes max=0
Lina-2   #step-2-create-typests                                   ident=n n=1 includes=0 routes assigned=0 routes max=0
Lina-2   #step-3-author-contractsyaml                             ident=n n=5 includes=0 routes assigned=0 routes max=0
Lina-2   #step-4-create-platform-implementations                  ident=n n=5 includes=0 routes assigned=0 routes max=0
Lina-2   #step-5-create-tests                                     ident=n n=1 includes=0 routes assigned=0 routes max=0
Lina-2   #step-6-create-or-review-component-metayaml              ident=n n=9 includes=0 routes assigned=0 routes max=0
Lina-2   #step-7-create-readme                                    ident=n n=1 includes=0 routes assigned=0 routes max=0
AX-1     #audit-checklist                                         ident=n n=30 includes=15 CLEARS assigned=14 routes max=14
G-sketch #item-critical-wait-for-user-authorization-before-starti ident=n n=7 includes=0 routes assigned=0 routes max=0
G-blanket #item-critical-wait-for-user-authorization-before-starti ident=n n=7 includes=0 routes assigned=0 routes max=0
A-blanket #audit-checklist                                         ident=n n=30 includes=0 routes assigned=0 routes max=0
G        #item-critical-wait-for-user-authorization-before-starti ident=n n=7 includes=0 routes assigned=0 routes max=0
G′       #item-civitas-governance-health-check                    ident=n n=4 includes=0 routes assigned=0 routes max=0
C(c1)    #the-charter-cut-ratified-verbatim                       ident=Y n=2 includes=2 CLEARS assigned=2 CLEARS max=2
C(c1)    #honest-reach-carried-so-you-never-inherit-an-over-claim ident=Y n=2 includes=2 CLEARS assigned=2 CLEARS max=2
Lina-2   #component-scaffolding-workflow:preamble                 ident=Y n=1 includes=1 CLEARS assigned=1 CLEARS max=1
EDGE shared text rendered twice in one sentence: assigned=2 max=2 expected=2 OK
EDGE shared text rendered once: assigned=1 max=1 expected=1 OK
EDGE contained text; only the container rendered: assigned=1 max=1 expected=1 OK
EDGE contained text rendered separately too: assigned=1 max=2 expected=2 CHECK
EDGE overlapping texts, one rendering spanning both: assigned=1 max=1 expected=1 OK
EDGE adjacent texts, no overlap: assigned=2 max=2 expected=2 OK
```
