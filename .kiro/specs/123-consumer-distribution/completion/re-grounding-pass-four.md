# G2: pass four (§ 7.2's re-grounding check). Verdict record

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Gate**: G2 (design § "Gates and sequencing", U2 step 8; Req 11.8)
**Verdict author**: Stacy. This record sits outside every delegated-tier line. Thurgood, the profile author, is recused: he authored no line of this record and was not asked anything for it.
**Date**: 2026-10-02
**Request**: Lina's record `.kiro/specs/123-consumer-distribution/completion/task-18-1-completion.md`, at `063236bf`. It names H = `c1b67b8f09897cf2b3b17859d8aa182e73188e8c`. I checked it against my conditions R1–R9 and accept it. Nothing in it framed an outcome.
**Tree read**: H. The branch head was `063236bf` (H plus the request record only), and `git status --porcelain` was empty. My own guard run there gave `operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)` and `diff-guard: no-op-green`. No file was written.

---

## The verdict

**Verdict**: PASSES with respect to attack (a)
**Domain line**: body: exercised, held; frontmatter: exercised, held; always-set: exercised, held
**Findings**: 3 — see § Findings

What PASSES means here, and nothing more:
- The derivation check, run over the real generator's output, rejected attack (a) on every target artifact.
- It also rejected the attack's frontmatter and always-set analogues.

What PASSES does not mean:
- It does not mean the check runs anywhere on the shipped profile. It does not run anywhere today (finding G2-F2).
- It does not mean the check rejects attacks other than (a). A one-token variant of attack (a) passes it (finding G2-F1).

Req 11.8.5 requires exactly this form: the verdict with respect to attack (a), and other attacks routed as findings, never absorbed into the verdict.

## Scope

- **Scope half (1)**: attack (a), verbatim, re-run against the new substrate (Req 11.4.2).
  - Source: my construction in `feedback/design-outline.md` § "[STACY R3]", "attack (a), FALSE RE-POINTING".
  - The pre-statement is in `design-outline.md` § "PRE-STATED FALSIFICATION CRITERION", the paragraph "Pass four, scoped in advance".
  - The construction, on my own charter (`canonical/agents/stacy.md`): empty `### The owed-set pipeline`, dispose it `re-pointed`, and name `### The trigger set` as the destination. The two are siblings under one `##` parent.
- **Scope half (2)**: the check reads the committed operative-set record, never a denominator supplied by the rendering (Req 11.6.5d).
- **Domains** (design § "Gates and sequencing", the G2 domain line):
  - **body**: attack (a) itself.
  - **frontmatter**: the design's analogue — empty `commands[<id>]` and point its destination at a sibling entry.
  - **always-set**: the same construction on an identity member's unit.

## How the pass was run

**The substrate under test is the real one**, not a fixture:
- the real `generateAll` (`tools/agent-generator/generate.ts`), which renders the consumer profile through both declared targets' adapters (cc, kiro);
- the real `checkDerivation` (`tools/agent-generator/regrounding/derivation.ts`, design C15);
- the real C18 floor and freshness sweep for half (2).

**The scratch harness.**
- The tree at H was copied with `git archive c1b67b8f`. Built directories (`node_modules`, `dist`, the MCP servers' `dist`) were symlinked from the main checkout.
- The docs MCP served from the main checkout at H.
- Every mutation was made in the scratch copy, never in the repo. `git status --porcelain` in the repo was empty after every step.
- The scripts are not committed. Each variant is specified below exactly enough to reproduce:
  - Profile edits are one `destination` value in one dispositions row, plus the text of one overlay block.
  - Signatures and removals were left as committed.

**Control — the harness reproduces the substrate.** Over the unmodified copy, the generator's consumer output equals the committed `canonical/_consumer-output/**` byte for byte: 57 of 57 artifacts. All 56 attribution sidecars carry identical span lists.

### Half (1): attack (a) and its analogues

**What "evaluated" covers.** Each case was evaluated on every consumer artifact that renders the source: the cc agent file and the Kiro prompt, which are the two declared targets, plus `_canonical/` for completeness. The verdict is read on the two targets.

**Why `_canonical/` is not an evaluation surface for frontmatter.** It carries no per-entry frontmatter spans. Its honest control returns `FAIL_NO_DERIVATION` too (row K0 below).

| # | Variant | Profile edit (scratch) | cc | kiro |
|---|---|---|---|---|
| S0 | **Control, honest** (the committed row: S re-grounded in place, destination S) | none | `VERIFIED` | `VERIFIED` |
| **A1** | **Attack (a) verbatim**: S emptied entirely, `re-pointed`, destination = the trigger set | `stacy.dispositions.yaml` S row `destination` → `#the-trigger-set-the-114-superset-table-names-never-numbers`; `stacy.overlay.md` S block → empty | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` |
| **A2** | Attack (a), S emptied to its heading (label kept) | as A1, overlay = S's heading line only | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` |
| C1 | Control, false label on true content (S's committed re-grounding kept, destination = trigger set) | destination only | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` |
| B1 | Boundary, **not** attack (a): S hollowed **in place** (heading + one pointer sentence), destination S | overlay only | `VERIFIED` | `VERIFIED` |
| K0 | Control, honest (frontmatter): Kenya `commands[ios-build-test]` as committed | none | `VERIFIED` | `VERIFIED` (`_canonical/`: `FAIL_NO_DERIVATION`) |
| **F3** | **Frontmatter analogue**: `commands[ios-build-test]` emptied (key set kept, `gap`/`cue` = `""`), destination = sibling `commands[product-screen-commands]` | `kenya.dispositions.yaml` row + `kenya.overlay.md` entry | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` |
| F4 | Frontmatter analogue, values replaced by "see product-screen-commands", sibling destination | as F3 | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` |
| T0 | Control, honest (always-set): Task-Completion-Protocol `#for-subtasks` as committed | none | `VERIFIED` | `VERIFIED` |
| **AS1** | **Always-set analogue**: `#for-subtasks` emptied, destination = sibling `#for-parent-tasks-implementation-or-architecture-type` | `always-set/task-completion-protocol.{dispositions.yaml,overlay.md}` | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` |
| AS2 | Always-set analogue, emptied to its heading | as AS1 | `FAIL_DISHONEST_NAMING` | `FAIL_DISHONEST_NAMING` |
| A3 | **Variant, not verbatim** (finding G2-F1): S emptied, destination = S's own `##` parent | destination → `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut` | `VERIFIED` | `VERIFIED` |
| F5 | **Variant, not verbatim** (finding G2-F1): as F3, destination = the parent entry `commands` | destination → `frontmatter:commands` | `VERIFIED` | `VERIFIED` |

**Notes on the table:**
- **A1 reached the rendering.** The owed-set section is gone from both targets. One blank line remains, attributed to S (cc line 207, kiro line 173).
- **Two shapes derive() refused**, and so never reached the check. F1 kept only the `class` key; F2 used an empty map. Both were refused because "a re-pointed entry's value keeps the canonical value's … key set". F3 and F4 are the shapes an author can actually commit.
- **Half (1), per domain:** every attack-(a) row (A1, A2, F3, F4, AS1, AS2) is rejected on both targets, and every honest control (S0, K0, T0) verifies. That is "exercised, held" for body, frontmatter and always-set.
- **Not NOT-RUNNABLE:** the construction was buildable on the emitted substrate.
- **Not FAILS:** in no case did the check accept attack (a).

### Half (2): the denominator is the committed record

**The floor.** `tools/agent-generator/regrounding/triviality.ts` takes each unit's items as an input. `classifyCharter` refuses a unit that has no committed set rather than reading it as zero items. Nothing in the file classifies text as operative.

**Its only caller that CI runs over the real profile** is `tools/agent-generator/__tests__/consumer-profile.real.test.ts`, in `test:agent-generator`, which `lane-timing.yml` runs. That caller reads the items from `canonical/operative-sets/<record>.yaml`. The Task 15 drafting scripts under `first-render/drafting/` also import the floor; CI does not run them.

**Nothing in the profile can supply items.** The dispositions schema and the overlay format carry no item list.

**Run.** S's committed record holds 14 items. The floor over S's rendering in base, A1 and B1 returned `ROUTES 0/14 (below-half)` each time: the rendering moves only the numerator.

**Bite on the record itself** (scratch):
- Narrowing S's committed record to 1 item, with the confirmation note untouched, made the freshness sweep refuse: `[confirmation] … note items (14) ≠ record items (1)`.
- Narrowing it to 0 items did the same: `note items (14) ≠ record items (0)`.
- With the record restored, there were 0 findings.
- What the narrowing would have bought over A1's rendering if it had not been refused: `ROUTES 0/1` and `INAPPLICABLE` respectively.

**Result.** The denominator moves only together with its confirmation note, whose confirmer is the C1 seat.

**The limit, carried from C16 and not re-verified here:** a forged confirmation note is caught by authorship, not by this sweep. There is one git identity, and the confirmation is a signing act under `verify-signing-chain --ci`'s trailer link. This pass did not exercise that link.

**Half (2) holds where the check runs.** Where the check does not run is finding G2-F2.

### The derivation suites at the head, for provenance (not evidence for the verdict)

`npx jest --config tools/agent-generator/jest.config.js derivation grain-guard semantics-guard` → 5 suites, 57 tests, all passed.

## Findings

Two routes apply to each finding: an explicit message to the owning agent, and the standards line below.

**Lina condition 2 binds remediation.** No machinery is patched inside U2. A machinery fix is a new falsification cycle, with its own record and a new G2 request after U2b's merge.

### G2-F1 (High): clause (2) accepts any ancestor of S as the destination — attack (f), routed rather than absorbed

**Shape.** The check reads clause (2) as "at least one span in D lies within the destination" (design C15). The requirement's text reads differently: "the destination named in the disposition is among the spans satisfying (1)" (Req 11.4, clause (2)). The implemented direction (span ⊆ destination) accepts S's parent, and every ancestor above it, as an "honest" destination.

**Measured (rows A3 and F5).**
- An emptied S whose destination is its own `##` parent → `VERIFIED` on both targets.
- An emptied `commands[ios-build-test]` whose destination is `commands` → `VERIFIED` on both targets.
- **F5 reaches no human at all:**
  - `derive()` accepts it;
  - the freshness sweep returns 0 findings, because the row is unsigned;
  - no signature is owed, because frontmatter re-pointings are outside the C18 routing population.
- That is attack (a)'s sharpest property ("nothing routes to a human"), in the frontmatter domain, and it would survive even if the check were wired.
- In the body domain, A3 is caught downstream rather than by (v): the C18 floor routes the emptied unit, and a signed row goes stale.

**Owner:**
- **Lina** (C15 machinery).
- **Thurgood** (the design C15 text against Req 11.4's clause (2) text; a spec-standards question).

### G2-F2 (High): the derivation check is applied to nothing on the shipped profile

**Shape.** `checkDerivation` has no importer outside `tools/agent-generator/__tests__/`. Those tests apply it to fixture renderings only. No lane, guard or pipeline step applies (v)'s mechanical half to the committed consumer profile or rendering. This pass's scratch harness was its first application to the real generator's output for the real profile.

**Measured.**
- **C1** (a true rendering under a false sibling destination) passes `derive()` and the freshness sweep with 0 findings.
- **F3** (the frontmatter analogue of attack (a), verbatim shape) does the same, and owes no signature.
- Each is rejected by the check only when the check is run.

**What already covers this, and what does not.**
- The pre-declared PASSES rows (`g2-consequence-texts.md` @ C0 `30186762`) already list it as a limit: "that the derivation check is applied to the committed consumer rendering".
- That limit makes the consequence honest. It does not give the gap an owner.

**Owner:** Lina (C15 application). Whether Req 11.4.1's "implemented … against Requirement 10's substrate" requires application to the committed profile is a standards reading for Thurgood. I hold no position on it.

**MIDPOINT note:** I will read Task 14's completion evidence against this.

### G2-F3 (Medium): clause (1) is satisfied by construction on the re-pointed lane; the pre-statement and Task 14's rows describe a test model, not the generator's emission of attack (a)

**Shape.**
- `emitSpans` renders every re-pointed body unit's overlay in place, attributed to S. An emptied overlay still yields a one-line span (`ensureTrailingNewline('')` → `'\n'`).
- A re-pointed frontmatter entry keeps its canonical origin through `entryOrigin`.
- So clause (1) (DERIVATION) never fails for a re-pointed row that has an overlay, and every discrimination (v) makes on that lane rests on clause (2). Clause (2) is the clause G2-F1 widens.

**Measured (rows A1, A2, F3, AS1, AS2).** All return `FAIL_DISHONEST_NAMING` (clause 2), not `FAIL_NO_DERIVATION`.

**Where this contradicts written expectations:**
- the pre-statement ("so (1) fails");
- Task 14's rows "attack (a) → `FAIL_NO_DERIVATION`" and "`commands[<name>]` emptied with a sibling destination → `FAIL_NO_DERIVATION`".

**Why those expectations were met in tests.** They hold for the tests' models: S disposed `superseded-by`, or its spans omitted (`derivation.test.ts` L70–76; `derivation.frontmatter.test.ts` L54–63). Neither is attack (a) verbatim (a `re-pointed` row).

**The outcome is unaffected:** attack (a) is rejected either way.

**Owner:** Lina (Task 14 PRIMARY). Also a MIDPOINT read item.

**Standards implications**: G2-F1 and G2-F3 bear on how the pre-stated criterion's clause (2) is written relative to design C15. That is the spec text's question, routed to Thurgood through the EDUCATION route. G2-F2 bears on whether "implemented" in Req 11.4.1 includes application to the committed artifact. None of the three asks a standard to change inside U2.

## Method and honesty

**Sample.** Not sampled. Every variant ran through the real generator end to end. Every artifact that renders the source was checked: 3 per case, 2 of them the declared targets. The table has 13 rows: 3 honest controls (S0, K0, T0), 1 false-label control (C1), 6 attack-(a) rows, 1 boundary (B1) and 2 variants (A3, F5). Two further shapes (F1, F2) were refused by `derive()` before rendering and are recorded above.

**Per-domain honesty.** Each domain was exercised by its own construction and its own honest control. No domain is inferred from another.

**Unverified:**
- the trailer link that guards confirmation authorship (half (2), limit) — `not re-verified — not exercised in this pass`;
- the Kiro and CC harnesses consuming the rendering — out of scope for G2.

**Disclosures.**
- I constructed attack (a) (design-outline R3) and pinned the containment reading of clause (1) (R4).
- I confirmed the operative sets of exemplars A–E, and I signed my own charter's consumer rows, including the owed-set row mutated in scratch here.
- Lina authored the machinery under test (C13–C15) and the VALVE-1 spans (her disclosure R9). MIDPOINT checks that Task 18's applied edit is byte-equal to its pre-declared text and confined to the domains named above.
- **Closed negative:** *not independently re-verified — read by the auditing seat that constructed the attack.*

**The counter-argument I weighed, and its residual.** Against PASSES: with G2-F2 and G2-F1 standing, a reader may call this verdict hollow. The check runs on nothing shipped, and a one-token change to attack (a) passes it. I folded that in:
- The verdict is scoped by Req 11.4.2 and 11.8.5 to attack (a) verbatim. Widening it at the verdict would break the narrow scope that was my own Fork (B) condition.
- The three findings are recorded at the severity they carry.
- The pre-declared PASSES rows name "Attacks other than (a)" and the application gap as limits.

**What survives:** Req 24.3's table will list (v)'s mechanical half as deterministic, with respect to attack (a), for a check that today guards nothing on the shipped profile. The limits column is the only place that reads true, and a reader who skips it is misled. That is R26.8's backstop doing its job, not a remedy. The remedy is G2-F1 and G2-F2, after U2b, in their owners' cycle.

**Honest reach (Req 11.8.7):** U2's acceptance on this verdict is a human acceptance condition, not a mechanically enforced one. The detector for its consequence being applied as declared is the MIDPOINT claims pass, after U2b's merge.
