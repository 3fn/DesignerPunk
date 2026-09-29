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
assent: surviving [] — to the CHANGED disposition, `superseded-by` → `frontmatter:writeScope[.kiro/specs/**]` (cites subtraction-4)

**Re-signed 2026-09-29 (re-sign run, unit head `dba93df5`). This replaces my phase-two no-consumer-counterpart assent.**
- **The row changed**: `no-consumer-counterpart` became `superseded-by` `frontmatter:writeScope[.kiro/specs/**]`. The hashes did not change: the canonical entry is the same, and the entry itself still renders nothing.
- **Superseded-by is the more accurate disposition, and my phase-two reasoning was wrong on one point.** This write root exists so the seat can write parent-task summary docs. In the consumer, that function has not disappeared. It has moved: the consumer's rendered Task Completion Protocol now puts the summary doc at `specs/[spec]/task-N-summary.md` (`_consumer-output/_canonical/always-set/task-completion-protocol.md`, lines 33, 41 and 106; the same text is in the CC and Kiro identity renderings). That path sits inside the destination row's rendered `specs/**` (`cc/.claude/agents/leonardo.md:474`, `kiro/.kiro/agents/leonardo.json:41`). I said in phase two that a second summary-doc root had "no consumer meaning". The accurate statement is that its meaning is carried by the other write root.
- **Subtraction-4 applies**: the `docs/specs/**` location itself is this repo's two-document workflow law. Only its function survives.
- It is a frontmatter entry with no operative items, so `surviving: []` is the itemized form.

## `#frontmatter:routes.cues[21]`

signer: leonardo
canonicalHash: sha256:9c97b17533725a447b8c36969b61e9edec718cd9bfd443dbaccbb9f399532251
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
refuse: should-re-point

**REFUSED.** The row is the cue *"you need the technology-stack reference (frameworks, build tooling, versions)"* → `get_section` (docs MCP), `replaces: technology-stack`. It is disposed `no-consumer-counterpart`, citing subtraction-1. **I refuse because this cue has a consumer counterpart, and the cite does not apply** (Req 11.4.1; mis-attribution is a finding, not only non-attribution, per clause (iii)).
- **The cite does not apply.** Subtraction-1 covers repo-internal tooling invocations. This cue invokes the docs MCP's `get_section`, which my consumer seat keeps (`toolSubset.designerpunk-docs[get_section]` is retained). The target `governance/technology-stack.md` ships in the package (`files[]` includes `governance/`), and the shipped docs MCP serves it (`mcp-server/src/index.ts`, `DEFAULT_STEERING_DIR = 'governance/'`). The route resolves in a consumer install.
- **The doc is mostly the consumer's stack too.** Its § "Platform Technologies" (Swift/SwiftUI, Kotlin/Compose, Web Components with logical-property CSS), § "Web CSS Standards" and § "True Native Architecture" are the stack a consumer's product screens are built on when they are built with DesignerPunk components. My own retained `#what-consistent-means-in-true-native` unit already assumes that stack for the consumer. Dropping the route leaves the charter asserting the stack with no way to look it up.
- **What is repo-bound**: only § "Build & Runtime Tooling" (`tsx`, the module-resolution ESLint rule), and the cue's *"build tooling"* wording that points at it.
- **The re-point I would expect** (Thurgood re-authors; the choice is his): keep the cue, narrow its `when` to the platform frameworks and standards, drop *"build tooling"*, and target § "Platform Technologies" (or the three consumer-applicable sections).
- **Counter-argument I weighed**: a consumer's product might not use DesignerPunk's platform stack. That does not rescue `no-consumer-counterpart`: this charter is for products *built with DesignerPunk*, whose components are exactly that stack.
- **Not in my seat, recorded only**: `sparky`, `kenya` and `data` carry the same cue under the same class. Their owners judge their own rows.

## Signing run summary (2026-09-29, phase two)

- **Commits** (branch `task/123-u2b-fr2-leonardo`, from `60b0fdb5`, not pushed):
  - `a7b2aaf2`: 8 assents.
  - `d5539796`: 1 refusal, in its own commit.
  - The commit that adds this summary.
- **Assented rows (8)**:
  - `#identity`: 6 of 6 surviving.
  - `#out-of-scope`: 6 of 6.
  - `#with-peter`: 1 of 1.
  - `#platform-currency-awareness`: 3 of 3.
  - `#when-you-and-peter-disagree`: 1 of 1.
  - Body total: 17 of 17. Six of these are credited by entailment through the subtraction-2 *Peter → your human lead* re-point: `leo-human-decides`, `leo-partner`, `out-6`, `human-1`, `currency-2`, `disagree`.
  - `no-consumer-counterpart` confirmed with `surviving: []`: `frontmatter:routes.docs[dev-workflow-detail]`, `frontmatter:routes.docs[file-organization]`, `frontmatter:writeScope[docs/specs/**]` (all subtraction-4).
- **Refused rows (1)**: `frontmatter:routes.cues[21]` (technology-stack cue), `should-re-point`. The route resolves in a consumer install, the platform-stack sections apply to consumers, and subtraction-1 is mis-attributed. Thurgood re-authors, then I re-sign; I do not resolve it myself.
- **Widenings**: none. The six referent candidates are deliberate trigger/anchor items in retained units.
- **Sweep**: PASS, 0 findings, after each commit.
- **Residuals**:
  1. One standing refusal is owed a re-author and a re-sign before U2b merges (S-T3, zero standing).
  2. The same technology-stack cue is `no-consumer-counterpart` in `sparky`, `kenya` and `data`; their owners judge those rows.
  3. The sweep does not flag a routed or NCC row that has no signature (presence is checked over the real profile at 15.5), so presence of all 9 rows was confirmed here by eye.
