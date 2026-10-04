# Task 21.2 Completion — the re-grounding starter spec

**Date**: 2026-10-03
**Agent**: Thurgood (Opus) · PRIMARY, Task 21
**Branch**: `task/123-u3-onboarding`, in the same commit as 21.1 (the structure test covers both)

## What changed

- **`src/cli/templates/starter-specs/regrounding/tasks.md`** (new): consumer-Thurgood's first assignment, per Req 16.1 ("re-point his charter at their repo, establish their steering/spec surface, and report what does not transfer"). It has six checkbox tasks:
  1. read the charter against the repo;
  2. decide each item in the closed vocabulary: `re-pointed` / `superseded-by` / `no-consumer-counterpart` (Req 11.2), with the rejected framing named;
  3. establish `specs/` and the repo's standing-guidance locations, writing `specs/README.md`;
  4. **formalize one real spec**, the work Req 24.1's beat 1 needs to observe;
  5. **report what did not transfer**, in `specs/regrounding/report.md`;
  6. **Stacy**, not Thurgood, verifies the formalized spec's claims (Req 24.1b's beat 2), with the closed negative form "not exercised — no spec was produced".
- It also states one standing rule: do not edit the generated agent files; record re-pointings in the report instead.
- **`scripts/__tests__/starter-specs.test.ts`** asserts, for this spec:
  - the report task;
  - the formalization task;
  - Stacy's seat for task 6, and the negative form;
  - the closed vocabulary present, and the rejected term `repo-bound-in-entirety` absent;
  - the vocabulary, harness and deny-list blocks.

## Claim ledger (class guard)

| Claim | Source | Mark |
|---|---|---|
| "`npx designerpunk init` placed this spec in your repo" | Task 21.3 (Lina) | DESIGN-ONLY |
| Thurgood is the agent for spec formalization, test governance and standing-guidance health | consumer rendering, `canonical/_consumer-output/cc/.claude/agents/thurgood.md` (In Scope: spec formalization, L55), and its write scope `specs/**` | VERIFIED-CODE |
| "His charter arrived written for DesignerPunk's own repo, and was re-pointed at yours where it could be" | Req 11.1 (re-ground and subtract) and U2's consumer profile (ratified record: Spec 123 U2a/U2b, merged) | VERIFIED-DOC |
| The generated agent files are regenerated, and a hand-edit is reported, not kept; example paths `.claude/agents/thurgood.md`, `.kiro/agents/thurgood-prompt.md` | each file's generated header ("`npx designerpunk sync` regenerates it and reports hand-edits instead of overwriting them": `canonical/_consumer-output/cc/.claude/agents/thurgood.md:27`, `…/kiro/.kiro/agents/thurgood-prompt.md:1`); `src/cli/sync/Classifier.ts:117` (`conflict`, "locally modified") | VERIFIED-CODE |
| `specs/` is repo state, committed | `docs/consumer/COMMIT-POLICY.md` (`specs/**` row) | VERIFIED-DOC |
| Stacy exists in the consumer's agent layer | `canonical/_consumer-output/_canonical/agents/stacy.md` | VERIFIED-CODE |
| The disposition vocabulary is closed, and "it was ours, so it goes" is not a disposition | Req 11.2.1–11.2.3 | VERIFIED-DOC |
| Beat 1 / beat 2, recorded separately; the negative form | Req 24.1, 24.1b | VERIFIED-DOC |
| "Whether to share it with DesignerPunk's maintainers is your human's decision" | outline risk "Starter specs are shipped surface we cannot observe running … its deliverable only reaches us if a consumer sends it" (`design-outline.md` L1072) | VERIFIED-DOC (no return path is promised) |

**Bite recipe**: none. This spec declares no CI need, and its proof is the U5 conformance run (Req 24.1). The outline records the concession: "the re-grounding spec has no equivalent proof-of-arming".

## Targeted tests + result

As in 21.1 (one file, one commit): `starter-specs.test.ts` 27/27; `test:scripts` 396/396; `tsc` exit 0; `npm test` 9426/9426.

**Bites**, each turning its own test red:
- "Report what did not transfer" retitled;
- "Formalize one real spec" retitled;
- the negative form changed to "a fail";
- the `.kiro/` example path removed (one harness only);
- `repo-bound-in-entirety` added.

## Application-time adaptations

1. **The two-beat structure lives inside the spec.** Task 6 is Stacy's, after task 4, and is recorded under her own heading in the same report. Req 24.1b's separate recording is kept by the separate heading and the closed negative form.
2. **Both harness paths are named as examples**, never one alone (P5), and the test asserts both or neither.
3. **Who should confirm it**: this spec puts words in consumer-Thurgood's and consumer-Stacy's mouths.
   - Stacy should confirm task 6 (her seat).
   - Lina should confirm the agent-file paths and the regeneration rule (generator output).
   - Its author, Thurgood, reviewing his own consumer seat is a stated residual.

## Addendum (2026-10-03) — Stacy's confirmation applied

Record: `completion/task-21-owner-review/stacy.md` § B.

| Task | Owner | Verdict | Applied |
|---|---|---|---|
| 5 Report what did not transfer | Stacy | CONFIRMED | — |
| 6 Verify the claims | Stacy | NOT-CONFIRMED as written: four defects in total. The negative form was not Req 24.1b's string; the audit object was unnamed (task 4 never executes a spec, so "its completion claims" pointed at nothing); task 6 ran before task 5 created `report.md`; approvals were uncheckable; there was no method line | her task-6 text, verbatim: promised / claimed / shipped, the "how many claims she opened, out of how many" line, and "After tasks 4 and 5" |
| the spec's "Who does what" line | Thurgood (consequential) | — | "Task 6 is Stacy's, after task 4" → "after tasks 4 and 5", to match her task 6 |

**The Req 24.1b check (Thurgood, independently)**: `requirements.md:830` reads "IF beat 1 produces no formalization THEN beat 2 SHALL be recorded in the closed negative form — *not exercised — upstream beat produced no artifact*". `tasks.md:1528` repeats it. Stacy's reading is right. The starter spec's earlier "not exercised — no spec was produced" was a second spelling of a closed form.

**Test fixed**: `scripts/__tests__/starter-specs.test.ts` now asserts the ratified string, and that task 6 follows the report task and reads "After tasks 4 and 5". **Bites**: the old string back in → red; "After task 4" back in → red; restored.

**Stacy's seam (outside Task 21)**: the consumer Stacy charter's owed-set query exits `FATAL` without `docs/claims-pass-adoption.md`, and nothing in a born repo creates that file. Reported to the orchestrator for routing. It touches `canonical/**`, under U3's no-overlap guard, so it is not fixed here.
