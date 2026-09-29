# Signatures — `stacy` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/stacy.dispositions.yaml`. **Signer**: Stacy. She signs her own charter's rows as its owner, and Peter samples her assents (B-U2 F-3 (ii)).
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 1**, 2026-09-29, Spec 123 Task 15.5.

## `#identity`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#identity` (re-pointed; ROUTED)
canonicalHash: sha256:43defd686fc5d68ce4f4d13231c8b98631b1292cdf2135f489299b751d856700
renderedHash: sha256:e088fc56dc4910ecf0c6cbc1b6446bf74d349f5badb5ca95db8e4daa3528cd81
verdict: assent — surviving 11/11

`stacy-claims-both-tiers` survives without its ratification date. Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#in-scope`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#in-scope` (re-pointed; ROUTED)
canonicalHash: sha256:c5c798aafe80cf38d78e3023987450a2dae382e5f1a46effc4f10fe99df45579
renderedHash: sha256:0a31d551a2bb64728a193c7895f502c1fc3a1956edb4d7663fb99eaca0640145
verdict: assent — surviving 8/10; not surviving: `scope-8`, `scope-10`

`scope-8` is not entailed as a whole: the rendering keeps the claims-audit scope but drops the M3/M4/M5 metrics (Spec 127's). `scope-10` (this repo's register rows) has no consumer counterpart.

## `#out-of-scope`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#out-of-scope` (re-pointed; ROUTED)
canonicalHash: sha256:be1ba8ba9bf4d3c3c2ff657fc3b6aabf428cd21aff585d49d44b0268b058f4ab
renderedHash: sha256:938c670d4259a89225df8ee869262e701de2f969b1dddca4fd0890d39700e820
verdict: assent — surviving 6/7; not surviving: `out-7`

`out-5` is re-pointed to the human lead. `out-7` (the claims instrument is Thurgood's) is not in this rendering. Its boundary, "checks you do not maintain", survives in `out-6`.

## `#operational-mode-process-audit:preamble`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#operational-mode-process-audit:preamble` (re-pointed; ROUTED)
canonicalHash: sha256:87470ed51c60c7908225d504f181d60b464fe7468c8fcebc2ac93f18a042ab4d
renderedHash: sha256:ebc19b7eeec091aef048bc68f88ce85dfd92f01ab92a853b0bef5a4a40962c6f
verdict: assent — surviving 1/1

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#the-charter-cut-ratified-verbatim`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-charter-cut-ratified-verbatim` (re-pointed; ROUTED)
canonicalHash: sha256:faf006560fb7d64d617114bc38e435003c2d75fcc7d07100aeb367ce7e55b191
renderedHash: sha256:12116dca8e4e4fd69ffa64f9276c97aa497813f4461a0bcd3afa1ab4203e9355
verdict: assent — surviving 2/2

Both cuts survive verbatim.

## `#the-claims-pass-record-claims-passmd-the-template`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-claims-pass-record-claims-passmd-the-template` (re-pointed; ROUTED)
canonicalHash: sha256:8103d28ef4a140c355a2c82c2395c492fceb1b48c46a87b24f49b6713fb38ac7
renderedHash: sha256:ac788d09a695a9a4f828e4e9c5ea3c3c1d51d96eb387c3ce2c65a13447ee5e75
verdict: assent — surviving 18/31; not surviving: `counting-6`, `counting-8`, `counting-9`, `counting-10-buckets`, `counting-10-ncc-rate`, `counting-10-assent-refusal`, `counting-10-spot-check`, `counting-10-full-survival`, `counting-11`, `counting-12`, `emission-reading`, `delegated-tier-read`, `instruments-read`

**Judged strictly, as briefed.**
- The `volatile-ok` marker is dropped.
- **Survive**: `closeout-path` (with a generic specs dir), `section-findings` (the 112 taxonomy replaced by its kinds inline), `counting-4` (the fixed-string exemption re-grounded to "every criterion your process lets a parent waive, counted per waiver"; a count of every waiver entails it), `counting-7` (without its ratification date), and the rest verbatim.
- **Not surviving**: the counting items tied to this repo's machinery. That is the `(platforms: …)` fallback, the delegated-tier line, the consult line and M3/M4/M5, and it includes the B-U2 re-grounding-disposition metrics and their populations. It also covers the emission-reading, delegated-tier and instruments reads.
- **On the B-U2 items, where I differ from the brief**: I read that they have **no consumer counterpart**. A consumer's repo holds no consumer-profile dispositions, signatures or render populations to count; those exist only in DesignerPunk's generator. So dropping them is correct, and I assent without them.

## `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script` (re-pointed; ROUTED)
canonicalHash: sha256:e3f6f82a3b33e37b2e4862e259510551fd4c3d33b19da0357164b26f2742f837
renderedHash: sha256:8e4651c8af28921399677f9ad9a7791f3df9c2aeffd295bc716b2f051e47ddde
verdict: assent — surviving 14/14

**Every item survives, re-grounded.** The predicate is keyed to the team's adoption record, the pipeline to `$SPECS_DIR` and `$ADOPTION` (the midnight pin kept), the three classes are restated, three-copies becomes "keep every copy the same text", the ladder becomes "a second wrong result → a committed script", and git history is kept. This is the G1 exemplar E rendering. **It is a full-survival assent**, earned item by item; see the tally.

## `#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument` (re-pointed; ROUTED)
canonicalHash: sha256:7b2a7c8edaa9ba38463e8afa521851f7b4350e0892cf5ed9596497f90aaeaa18
renderedHash: sha256:8135bd3a87b7b17a48adef6f05db28afc98e3092cbe82c8f86c87ac0f3586653
verdict: assent — surviving 4/4

All four survive re-grounded: "green to any presence check", "platforms you cannot build here … never as re-verified", "Artifact truth is owned by the claims pass", and the framing sentence.

## `#your-role`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#your-role` (re-pointed; ROUTED)
canonicalHash: sha256:b48ed925de0d75bad9fb8f62563b35ff500e393402e815e79bea67c85dc5e7c5
renderedHash: sha256:2aee390089f24c58852a4cd04cbb5273c87e9a655ce418c0d2d34932cc066110
verdict: assent — surviving 7/7

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#what-you-dont-do`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#what-you-dont-do` (re-pointed; ROUTED)
canonicalHash: sha256:7f0f4de7aab0d9183809ae4a9c6cb875d3651c04461ca28090f87688babccfd6
renderedHash: sha256:0d3f608159411ddfd0393cfdb17279be89b6a45c33bcda2c51dbf98011cd8783
verdict: assent — surviving 3/3

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#with-thurgood-system-counterpart`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#with-thurgood-system-counterpart` (re-pointed; ROUTED)
canonicalHash: sha256:e5aa54f1f1a72f07c1f25d602eac46a08c738839516f23bd779091715e35931c
renderedHash: sha256:075b8a32dc28f5039f7d049a17209ba546d22b3abe8c3d00f0eb96cb7f0a9517
verdict: assent — surviving 5/5

"(DesignerPunk infrastructure)" → "(the design system's infrastructure)"; Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#with-peter`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#with-peter` (re-pointed; ROUTED)
canonicalHash: sha256:0c18fa9f023514cba761392331f1235750a385855b9601e56e3a2787b74b1f15
renderedHash: sha256:8022986bccfcbba8356625c1e1bc0bfa82eb533ab315c2ce9c216413ee1ca757
verdict: assent — surviving 3/4; not surviving: `human-4`

`human-4` (Peter's skillset lives in design) is a fact about this lead, with no consumer counterpart. Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#mcp-practice-notes`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#mcp-practice-notes` (re-pointed; ROUTED)
canonicalHash: sha256:64c55f317e18e344f8b476a9c73a8aff44b2ac4bca321671c415d779b2fa26f3
renderedHash: sha256:a23f87e92eeb1a90a00e1225e67402ae35d28d2f3ed426f7648453390ac20ce6
verdict: assent — surviving 5/5

All five survive: `ground-truth-computed` ("your repo's own audit and test commands"), `product-mcp-caveat` ("early in a product it may return a sparse index") and `mcp-fallback` (`specs/**/completion/`) re-grounded; the other two verbatim.

## `#ask-if-unsure`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#ask-if-unsure` (re-pointed; ROUTED)
canonicalHash: sha256:88270860692bc1f9fd962527d4132c79951301a4de895af5c3ef0e29bd279ff0
renderedHash: sha256:75bc336d4c478ec0cab2d16bb07f8b09d39f76462d6a36d8b8f72d63243f06ad
verdict: assent — surviving 1/1

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#what-you-dont-own`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#what-you-dont-own` (re-pointed; ROUTED)
canonicalHash: sha256:4108acaf8110eaee5e9ea615b318c75057946bf2fec0bf903da6d49b9aa6dcab
renderedHash: sha256:f7a1b9a373ca6dd943a702f712f74b960abfcd1512a330747bc3a5cb6c24228e
verdict: assent — surviving 3/4; not surviving: `jest-not-vitest`

The three ownership lines survive. `jest-not-vitest` is this repo's runner; the re-grounding ("run your repo's own audit and test scripts … package.json") is its consumer counterpart.

## `#frontmatter:routes.docs[completion-doc-guidance]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `routes.docs[completion-doc-guidance]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:a8aedb1dfe5141050c1a5959aef0079056d721bf98d2c00859a7de26cc0d87a5
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[dev-workflow-detail]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `routes.docs[dev-workflow-detail]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:d8dd2983f526c61544653aadb9ecf807db5d8fcdbf9411d7551285f519deaeb8
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[file-organization]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `routes.docs[file-organization]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:da2bab5d14c97b35a5a877205a97b280e1000b038fa96836ae08a2853ef35df7
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[completion-docs-beyond]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `routes.docs[completion-docs-beyond]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:02e17c6a786cd83d402b3a6d06d750964f9fd6f0cd5c378fa4bf8ce2482357d6
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:commands[audit-coverage-map]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[audit-coverage-map]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:f2b4a2b4460cb65ec913cce1dfcc114cd8d088875b46dbd44efd3774417d9ff4
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[audit-mode-parity]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[audit-mode-parity]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:523e31268c72df1ff47bdf49cc4716075cf18a4c051c8631791360aa616c149c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[audit-theme-drift]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[audit-theme-drift]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:9aaaa44f6bce04f642cd94be71760ae2e4a455e522820b6f18ef54a82edf42e9
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[test-coverage]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[test-coverage]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:6492eef872eb13e233ab9bbdd76e098de2dd13bd9a126b395d174e15969cc2cf
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[governance-health-check]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[governance-health-check]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:b2b4620fd8fc7de85d014492886972c2af130419693bcf8b29b9b2f6e0ad6e7c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[verify-gate-registration]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[verify-gate-registration]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:194b68857ae054e223dd422e53d04e7abb2ee5e9f5363f1411f882431b03e7af
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:knowledgeBases[spec-summaries]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `knowledgeBases[spec-summaries]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:01a07255b7a58397accf345c80ca08042755cd10b81e688a5c49a64baa572212
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own knowledge-base glob. I assent that nothing survives.

## `#frontmatter:writeScope[docs/specs/**]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `writeScope[docs/specs/**]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own write path. I assent that nothing survives.

## `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble` (re-pointed; ROUTED)
canonicalHash: sha256:b9f4104614bde7bf3dcf7fc95a316fa126266e2816cc636ddabc2a555d94ffb1
renderedHash: sha256:62fd761373b55d6c61af941dadd08c48b662f4b5edb1572607b6fee1d268d579
verdict: refuse: should-re-point

`authority-precedence` has a consumer counterpart, and the rendering drops it. The rendering names the authority (the team's own recorded decision, on whose date the owed-set query keys) but not its precedence over this text. **Should re-point**: where this text and the recorded decision disagree, the decision governs. This is the same finding as consumer-Thurgood's Q5 preamble.

## `#the-trigger-set-the-114-superset-table-names-never-numbers`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-trigger-set-the-114-superset-table-names-never-numbers` (re-pointed; ROUTED)
canonicalHash: sha256:5055f134c5a6c6fc5ecd2f499d3eb428ff14a0679946152f88e630c0c8de3d7a
renderedHash: sha256:9125e2b3608732006279ff89016052966e29a4b5a28369c25aba788f78e472fe
verdict: refuse: should-re-point

The LENS row (`trigger-lens`) keeps question 6 but replaces the **five verifiability questions** with one summary ("can each criterion be verified from the repo"). The five questions are: a criteria set exists; evidence of a named kind could exist; some state of the world reads UNMET; "met" is decidable without the author; and the task text promises no artifact the criteria do not cover. They are repo-independent and they are the seat's content. Only the pointer to the lifecycle amendment is repo-bound. **Should re-point**: carry the five questions inline. For the record, the rest of the unit would assent at `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing` and `merge-path-status` (5/13). Not surviving would be RELEASE (its Q2 guard), CLOSEOUT (the rider-(a) discharge), ARMING, GATE, STRAGGLER, LIVENESS (the charter walk) and BURST, all repo-bound.
