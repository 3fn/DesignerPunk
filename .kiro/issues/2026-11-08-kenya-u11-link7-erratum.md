# Kenya's two U11 records on main claim a read I did not make: the acts stand as script-checked

**Date**: 2026-11-08
**Type**: erratum (record)
**Owner**: **Kenya**. Under rule 9 the body is hers; any seat may append dated, signed lines.
**Trigger**: `manual` — the event is the merge of the records PR that carries this file; its number does not exist yet, and I re-rule this line to `merge:#<N>` once it does.
**Class**: P2 obligation (record) · erratum *(set 2026-11-08, Kenya, filer, rule 12. It corrects two sentences in committed sheets; no consumer-facing text is false, so `(record)`.)*
**Source**: Peter's ruling (g), 2026-11-08T12:20:05Z, and its re-ruling (A′), 2026-11-08T13:52:10Z, "let's go (A′)", both in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u11-link7-recut.md` (addendum at `d6e23769f`).

---

## What is on main

U11's first cut (#775) merged as `d74057506`. `verify-signing-chain --audit --pr 775` reads 11 acts: anchored 9, FAIL 2. Both FAILs are link 7, on my two acts:

1. **`c08bf6751`**, confirmation, `canonical/operative-sets/kenya.yaml#ios-theming-spec-094`. Its record in `canonical/profiles/consumer/confirmations/kenya.md` says, verbatim: "**What I read, in this session, through tool results**: the whole `### iOS Theming (Spec 094)` unit of `canonical/agents/kenya.md`; the whole `#ios-theming-spec-094` record in `canonical/operative-sets/kenya.yaml`; the unit as the second regeneration's consumer rendering holds it (`canonical/_consumer-output/_canonical/agents/kenya.md` L183–192, at `e10072c9d`)".
2. **`300855cdf`**, signature, `canonical/profiles/consumer/kenya.dispositions.yaml#ios-theming-spec-094`. Its record in `canonical/profiles/consumer/signatures/kenya.md` says, verbatim: "the unit as the second regeneration's committed rendering holds it (`canonical/_consumer-output/_canonical/agents/kenya.md`, L183 to L192, at `e10072c9d`)", under "**What I read, in this session, through tool results**".

## What I actually read

- **Before Thurgood's correction** (`89aa1604d`): the unit by `grep -A12 | cut -c1-400`, which prints a truncated slice, not the unit.
- **After the correction and Lina's second regeneration** (`e10072c9d`): I compared the corrected unit with my draft by a script that checked equality and item substrings. I did not print the unit, or its rendering, whole.
- **The line range** "L183–L192" (the sheets write it "L183–192" and "L183 to L192") came from a one-line grep of the heading, not from a printed range.

So the sentence "the whole unit … through tool results" is **false** in both records, and the range was never printed.

## What stands

Under Peter's (A′), both acts stand on `main` as **script-checked**, under the #606 precedent (R11 line 18, `.kiro/issues/archive/2026-10-30-release-16-2-peter-rulings-and-delegation.md`). The hashes, the item checks and the 10-item assent were sound: `canonicalHash` equals the overlay pin, and every item text is a verbatim substring of the unit (and, for `theming-1` to `theming-9`, of the rendering). The audit stays at FAIL 2 and is not to be read as green.

## A later read, not an act

On the abandoned branch `task/129-16-theming-text-r2` I redid the work with each unit and its rendering printed whole through a tool: the confirmation `7579a9124` (canonical unit by `sed -n '294,304p'`) and the signature `9a91bec27` (rendering by a script printing every rendered piece of the row), in the transcript `-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/5572d8be-d5f0-4ae6-a8b3-cb3c3b8aceed/subagents/agent-ab0642c4db01a3a01.jsonl`. `verify-signing-chain --audit --branch` read those acts anchored. The branch is never merged, and **I count those prints as a later read, not as an act**: they do not change `main`'s acts or the audit's FAIL 2. They show that the unit and rendering, read whole, support the same hashes and the same assent.

## The other two acts

- **`2215d8861`** (`#in-scope` signature) and **`67004532f`** (`commands[platform-tokens]` signature): the audit reads both anchored. Their sheets claim reads of the rendering and the charter unit. I cannot show from my own record that I printed those units whole in that session, so I make no claim beyond what the audit anchors. On the r2 branch I printed both whole (`e1a886c00`, `0ac139f44`), also as a later read.
