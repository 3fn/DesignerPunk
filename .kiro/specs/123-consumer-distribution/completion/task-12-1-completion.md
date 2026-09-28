# Task 12.1 Completion — Request G1 from Stacy against the committed exemplar records

**Spec**: 123 — Consumer Distribution · **Unit**: U2a · **Parent**: Task 12 (G1 gate parent; U2a's gating parent) · **Agent**: Thurgood (Opus), the executing agent

## What changed

This doc is the formal G1 request (design § "Gates and sequencing", U2 step 4; Req 11.6.7). It is committed so that the request, and the exact state it names, are a record, not a conversation.

### The request

**To Stacy.** Please run **C3's own falsification pass (G1)** over **all eleven exemplars** — A, B, C(c1), C(c2), D, E, F, Lina-1, Lina-2, G and G′ — against the committed state below. Record exactly one verdict, **HOLDS / BREAKS / NOT-RUNNABLE**, at:
- `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` (the current verdict);
- `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-1.md` (this run, kept).

The record carries the G1 domain line and your closed-negative disclosure (Task 12, criterion 1).

**The state you run against — unit branch `task/123-u2a-g1` at `2b8304f4`**. Each blob SHA below is from `git rev-parse 2b8304f4:<path>`.

| Role | Path | Blob SHA |
|---|---|---|
| Operative-set record (A, B/E, C(c1), C(c2), D) | `canonical/operative-sets/stacy.yaml` | `1a6b159891afc1a205eba367c81fbe7ada5c0e67` |
| Operative-set record (Lina-1, Lina-2) | `canonical/operative-sets/lina.yaml` | `6bf4dbe8111ed88bafd725c6b1fec5a82fef51b0` |
| Operative-set record (F) | `canonical/operative-sets/component-family-navigation.yaml` | `0eb805ccfc277dd4fb04fe3ec0b8b48c4c788014` |
| Operative-set record (G, G′) | `canonical/operative-sets/start-up-tasks.yaml` | `9e3a727cc9c0a1790e6ba0efdd8ef44181c39e60` |
| Confirmation note | `canonical/profiles/consumer/confirmations/stacy.md` | `4f374f4b3128c02e498d72351bd5fbbd812f10ce` |
| Confirmation note | `canonical/profiles/consumer/confirmations/lina.md` | `0196056075d9c7a76963ad35ee486eeb63045f43` |
| Confirmation note | `canonical/profiles/consumer/confirmations/component-family-navigation.md` | `ed0aa923df5518c989d24fa6f2cd442b309add40` |
| Confirmation note (C1 carve-out) | `canonical/profiles/consumer/confirmations/start-up-tasks.md` | `c085efa6d384d3041d9534a86773561d8a32533f` |
| G/G′ constructions + required verdicts | `.kiro/specs/123-consumer-distribution/completion/task-11-3-exemplars-g-gprime.md` | `f8eea289d5d8dcb6046451c1c064f75cb411d4a9` |
| Canonical source | `canonical/agents/stacy.md` | `df288a5b54f640ca5c9ce36e8138039b3ea7bb69` |
| Canonical source | `canonical/agents/lina.md` | `558afcefe32edc2a02531856293592a0f0030913` |
| Canonical source | `governance/Component-Family-Navigation.md` | `f686a7b83acafbf95644f3fcd2683a982fd83fce` |
| Canonical source (always-set member) | `.kiro/steering/start-up-tasks.md` | `16fc0455bf8acde6a4b60e61a5662e81e720cfa7` |
| The records' mechanical check (temporary) | `src/__tests__/operative-set-records.test.ts` | `3eabe2f2963aefae8f079ac15222379959c81a57` |

- **The records' mechanical state at `2b8304f4`.** The precursor test gives 22/22, `audit:coverage-map` passes, and the records are owner-confirmed: `.kiro/specs/123-consumer-distribution/completion/task-11-completion.md`, rows 1–4 and 7. These establish the declared seat, verbatim text and fresh hashes; they do not establish completeness.
- **If canonical text or a record changes after `2b8304f4`, before your run**: the blob SHAs above stop matching, and the run is against a state this request did not name. Say which state you ran.

**The C3 text under test** (the definition owner's text, as it stands at `2b8304f4`):
- **`.kiro/specs/123-consumer-distribution/requirements.md`** (blob `1bf45227139dd92bc0ded953fbd8844aff479479`), **§ 11.6 "Trivial" — C3 v2**, lines 403–455. By section:
  - **11.6.1** (a) domain restriction;
  - **11.6.2** (b) the extensional, per-item bar;
  - **11.6.3** non-operative content, governed by 5c;
  - **11.6.4** (c) label retention is not retention;
  - **11.6.5** the exemplar table and its required verdicts;
  - **5a** exemplar E;
  - **5b** the correspondence rule: a routed judgment with a one-sided mechanical floor, clearing only when there are no repo-specific removals;
  - **5d** the operative-item set fixed on the canonical side;
  - **5c** the classifier, which keys on normativity, not form;
  - **11.6.6** the two honesties;
  - **11.6.7** the consequence per outcome;
  - **11.6.8** ownership.
- **`.kiro/specs/123-consumer-distribution/design.md`** (blob `21ff416778f9625f662f87e0274d0e941a55ee65`), **§ C18 "The triviality floor"**, lines 621–631. This is the design-grain form of the floor: the entry set, domain restriction, the strict comparand of complete item `text`, routing, and the hard floor. **No code implements C18**; `triviality.ts` must not exist before a HOLDS or branch-A record (Task 12's and Task 13's criteria). **G1 is therefore a falsification of the definition over the committed records, not a run of code.**
- **The amendment in force** — **`.kiro/specs/123-consumer-distribution/tasks.md`** (blob `6188f771e81d36f2205cb72ac7e5185bb35b5fcc`), header **"Item 4 — Amendment 2026-09-27, ruled by Peter (option (ii))"** (line 31), merged as #220:
  - **C(c1)'s zero-item premise is false.** Your 11.2 confirmation found 2 + 2 operative items.
  - The record stands and C(c1) is not re-instantiated.
  - **Clause (a) is exercised by F's `#purpose` only.**
  - Req 11.6.5's C(c1) row is superseded in execution; it is not edited.
- **For C(c1), the question the pass answers is therefore** what C3 v2 says of two units that each carry 2 operative items, not "inapplicable". **What its required verdict now is, given the superseded row, is yours to state in the record.** I do not supply it: the required verdicts are the exemplar owner's.

**The domain inputs**: `.kiro/specs/123-consumer-distribution/completion/task-11-completion.md` § "G1 domain-line inputs for Task 12" (blob `a76bce4e6be873fb43eb5cbbe7fa7ad81271a6a8`). They cover:
- what is exercised: body only; heading and preamble units on two charters and one family doc; enumeration-kind item units on one always-set member; item kinds obligation / step / member / command;
- what is not exercised: frontmatter, shared-catalog members, `#doc:preamble`, degenerate `#doc`, the `route` kind, and other always-set members;
- clause (a)'s single exemplar;
- the `stacy.md` corpus fact.

They are inputs. **The domain line is yours to write.**

**Handed to you to settle in the verdict — the grain question.**
- The 11.6.5 verdicts were written **per section**. The records are **per unit** (Task 10's finest grain): Lina-1 is 5 units, Lina-2 is 8, C(c1) is 2, and B and E share one unit.
- C18 applies per unit.
- **Please state in the record** whether each required verdict is applied per unit, or how a section verdict aggregates over its units. For example: is Lina-2 "trivial" when every one of its 8 units is, or when some are?
- Task 13's "Lina-2 scores 0/7" is section-grain wording; Lina carries its restatement to 13.4.
- **This request takes no position on the answer.**

**Also yours, named in your 11.3 record**: the entailment-across-redundant-items question for G and G′.

### Recusal posture

- **I author no line of your verdict records**, and I do not review or pre-read them before they are committed.
- **I execute the branch your verdict selects**, and Task 12's completion doc **cites the record path(s) and never paraphrases the verdict** (Req 11.8.4):
  - HOLDS → U2a proceeds to 12.3;
  - BREAKS or NOT-RUNNABLE → C3 returns to me as its owner for rework, then a re-run request to you;
  - a second consecutive BREAKS → branch A (P2-a).
- **I own C3's definition and the classifier (5c), and I drafted nine of the eleven records.** That is why the pass is yours.
- If your run finds a defect in **my drafting** rather than in C3, it is still a finding against my seat. It returns to me under the same rework path.

## Targeted checks + result

- Every blob SHA in the table: `git rev-parse 2b8304f4:<path>`, run in the main checkout on `task/123-u2a-g1`. HEAD equals `2b8304f4` (`git log --oneline -1`).
- `grep -n '^\*\*11\.6 "Trivial"\|^\*\*11\.7 ' requirements.md` → lines 403 and 456, so § 11.6 spans 403–455. `grep -n '^#### C18\|^#### C19' design.md` → lines 621 and 632. `grep -n 'Item 4 — Amendment' tasks.md` → line 31.
- No record, note or canonical source changed in this subtask. The only files changed are this doc and the 12.1 checkbox in `tasks.md`.

## Application-time adaptations

- **Design C18 was added to "the C3 text under test"** alongside requirements § 11.6. The coordinator's brief named § 11.6. C18 is the floor's design-grain statement, and a falsification of 11.6 that ignored it could pass a definition the design then operationalizes differently. Naming both is the complete statement. The verdict's scope is Stacy's to set.
- **The C(c1) required verdict is left for Stacy to state.** The amendment superseded the row's "inapplicable" but wrote no replacement verdict. Supplying one from the definition owner's seat would be answering the exemplar owner's question.
