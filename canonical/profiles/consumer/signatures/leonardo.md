# Signature evidence — `leonardo` (C1, owner seat)

**Rows**: `canonical/profiles/consumer/leonardo.dispositions.yaml` — the 5 ROUTED body rows and the 4 `no-consumer-counterpart` frontmatter rows on the regenerated sheet (`60b0fdb5`).
**Signer**: **Leonardo**. Under C1 the owner signs, because the owner is not the profile author (Req 11.4.1, 11.5.6; design C17).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase two.

**How I read each body row (Req 11.6.5e)**: only the unit's own rendering in `canonical/_consumer-output/_canonical/agents/leonardo.md`, checked against the overlay's `## @unit` text for that unit (they agree byte for byte in content). A statement anywhere else in the rendered charter credits nothing here. `surviving` lists exactly the confirmed items (`canonical/operative-sets/leonardo.yaml`) that this rendering **entails**, whether verbatim or re-pointed.

**The re-pointing all five body rows share**: subtraction-2 removes *Peter* (an authority claim naming a person) and re-grounds the seat at *your human lead* (with *his* → *their*). My test for each re-pointed item: does the consumer sentence still impose the same obligation on the same seat, relative to the consumer's own human lead? For all six re-pointed items the answer is yes. Only the name of the authority changed; the obligation and who it binds did not. So each is credited by entailment. None of them strict-matches, and that under-count is expected (see confirmations/leonardo.md).

**Referent candidates (sheet § 3): no widening.** All six hits end on a colon by design: `config-surface`, `spec-follow-workflow`, `consistent-not-identical`, `load-trigger`, `slop-run`, `onboarding-trigger`. I added or kept each one as a trigger or anchor sentence at phase one. Their units are all `retained`, so none of them is a row signed here: each renders verbatim, and the lists they introduce render with them. Widening an item to take in the list below it would bundle list members (which are already items) into the trigger and double-count them. The candidates are the known false positives Thurgood named.

## `#identity`

signer: leonardo
canonicalHash: sha256:bf53cb67509dba2252d5fdcdaecfd027b6af0dfa337b2128d1111258bfb1cd9a
renderedHash: sha256:45154d43422c0c69fba19ef67c0ef8036a1a3b10e48f616400d869c85aa506f2
assent: surviving 6 of 6 — leo-role, leo-translate, leo-domain, leo-coordinate-system, leo-human-decides, leo-partner

- `leo-role`, `leo-translate`, `leo-domain`, `leo-coordinate-system`: verbatim in the rendering.
- `leo-human-decides` (*"Peter is the human lead. He makes final decisions."*) → *"Your human lead makes final decisions."* This still establishes a human lead and puts final decisions with them. The obligation is not to make the final call, and it is intact. Credited by entailment.
- `leo-partner` (*"You are his partner, not his tool."*) → *"You are their partner, not their tool."* Same relation, re-pointed. Credited by entailment.
- The subtraction-2 removal is honest: nothing in the unit but the name left.

## `#out-of-scope`

signer: leonardo
canonicalHash: sha256:abdff9e39c869c5423faf28f9fd4e313fdf541537c7e5751df7664cb29f12286
renderedHash: sha256:312c5d3e17b94f1df4733b56b3b9759a6e47a17f89b1ca5d475ec0cd6d32ce0f
assent: surviving 6 of 6 — out-1, out-2, out-3, out-4, out-5, out-6

- `out-1` to `out-5`: verbatim.
- `out-6` (*"… — Peter's job"*) → *"… — your human lead's job"*. Product decisions stay outside my seat and stay with the human. Credited by entailment.

## `#with-peter`

signer: leonardo
canonicalHash: sha256:4644e5cc88b3e90c001f9beecb33d825cdcc7d441d0f9d01b6e336e43cc857ff
renderedHash: sha256:5e4c9ff03ce0144633708c28479a2f92086efb07458d425852a4a81c6701efb0
assent: surviving 1 of 1 — human-1

- `human-1` → *"Your human lead may provide direct feedback; respect their design eye; explain cross-platform technical constraints in accessible terms"*. All three obligations are intact, now owed to the consumer's lead. Credited by entailment. (The heading's re-point to *With Your Human Lead* is a label and carries no item.)

## `#platform-currency-awareness`

signer: leonardo
canonicalHash: sha256:d22b6e7f861f59374271b2c3f3a75e257e18f0f6cafebdd3c7707070688bba0c
renderedHash: sha256:272862541cfa3bc952a10a9f570f921ca2b66bd3792a69cf8824874dec90c440
assent: surviving 3 of 3 — currency-1, currency-2, currency-3

- `currency-1`, `currency-3`: verbatim.
- `currency-2` (*"… flag it to Peter"*) → *"… flag it to your human lead"*. The escalation is still to the human decision-maker. Credited by entailment.

## `#when-you-and-peter-disagree`

signer: leonardo
canonicalHash: sha256:fc99b47e67403652f801bf4602ecbf53d6b62c005d06f7b9db5424e8ef3cee01
renderedHash: sha256:e9be4bd512776d5b81cbe3fa85bb9226d5423245bfcd649fa17ed6e33384b4d1
assent: surviving 1 of 1 — disagree

- `disagree` → *"Provide your counter-arguments; if your human lead proceeds, respect it; proceed constructively; revisit when relevant."* All four steps are intact. Credited by entailment.

## `#frontmatter:routes.docs[dev-workflow-detail]`

signer: leonardo
canonicalHash: sha256:d8dd2983f526c61544653aadb9ecf807db5d8fcdbf9411d7551285f519deaeb8
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
assent: surviving [] — no-consumer-counterpart confirmed (subtraction-4)

- The route targets `process-development-workflow`, which is DesignerPunk's own task-completion sequence, git/commit standards, hook system and Kiro hook chains. That is this repo's workflow law (15.4 class policy, subtraction-4).
- The doc does ship under `governance/`, so this is not a subtraction-5 case. The question is whether it applies, and it does not: a consumer product repo has its own workflow, and routing my consumer seat into ours would impose ours as law.
- The cite is shown to apply: the route's `when` names "the development workflow … beyond the always-loaded law".
- Nothing renders, so `surviving: []`.

## `#frontmatter:routes.docs[file-organization]`

signer: leonardo
canonicalHash: sha256:140957b75ae4911267ee722e655262d2db2dc32849ce04117540426a051b7f20
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
assent: surviving [] — no-consumer-counterpart confirmed (subtraction-4)

- `process-file-organization` is DesignerPunk's steering-metadata and directory standard (required metadata fields, organization values, this repo's directory structure). It is workflow law for our corpus, not a standard a consumer's product specs follow.
- My spec-format routes (`process-spec-planning`) stay retained, which is correct: those are the transferable part.

## `#frontmatter:writeScope[docs/specs/**]`

signer: leonardo
canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
assent: surviving [] — no-consumer-counterpart confirmed (subtraction-4)

- `docs/specs/**` is where this repo keeps parent-task summary docs, one half of our two-document completion workflow.
- My consumer write scope keeps its real counterpart: `.kiro/specs/**` is re-pointed to `specs/**` (DD15, where the starter specs live).
- A second, summary-doc write root has no consumer meaning.
