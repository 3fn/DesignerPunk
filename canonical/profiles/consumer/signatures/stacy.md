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
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#mcp-practice-notes` (re-pointed)
canonicalHash: sha256:64c55f317e18e344f8b476a9c73a8aff44b2ac4bca321671c415d779b2fa26f3
renderedHash: sha256:a13bda807e0d318bb79b32f1fafb0041f5dd33637216be8701e7bb225c2a73ca
verdict: assent — surviving 5/5

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 5). All five survive. `mcp-fallback` now carries the summaries (`specs/*/task-*-summary.md`) in place of `docs/specs/`. **Over-credit correction folded in**: my run-1 signature on this row credited 5/5 when that rendering earned 4/5, because it dropped `docs/specs/` with nothing in its place. The re-authored rendering earns 5/5.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#mcp-practice-notes` (re-pointed; ROUTED)
> canonicalHash: sha256:64c55f317e18e344f8b476a9c73a8aff44b2ac4bca321671c415d779b2fa26f3
> renderedHash: sha256:a23f87e92eeb1a90a00e1225e67402ae35d28d2f3ed426f7648453390ac20ce6
> verdict: assent — surviving 5/5
>
> All five survive: `ground-truth-computed` ("your repo's own audit and test commands"), `product-mcp-caveat` ("early in a product it may return a sparse index") and `mcp-fallback` (`specs/**/completion/`) re-grounded; the other two verbatim.

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
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `knowledgeBases[spec-summaries]` (re-pointed)
canonicalHash: sha256:01a07255b7a58397accf345c80ca08042755cd10b81e688a5c49a64baa572212
renderedHash: sha256:1e34755afa443056ebaede347a929648371ef00338f0a6d2418eec2311ec19f0
verdict: assent — surviving 0/0

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 0). Assent to the re-pointed entry: `docs/specs/**` → `specs/*/task-*-summary.md`. That is the summary location TCP's tier selection now names.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `knowledgeBases[spec-summaries]` (no-consumer-counterpart; no-consumer-counterpart)
> canonicalHash: sha256:01a07255b7a58397accf345c80ca08042755cd10b81e688a5c49a64baa572212
> renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
> verdict: assent — surviving 0/0
>
> No consumer counterpart, confirmed: this entry names this repo's own knowledge-base glob. I assent that nothing survives.

## `#frontmatter:writeScope[docs/specs/**]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `writeScope[docs/specs/**]` (superseded-by)
canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 0). Assent to `superseded-by writeScope[.kiro/specs/**]`, which renders as `specs/**` and covers the summary location.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `writeScope[docs/specs/**]` (no-consumer-counterpart; no-consumer-counterpart)
> canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
> renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
> verdict: assent — surviving 0/0
>
> No consumer counterpart, confirmed: this entry names this repo's own write path. I assent that nothing survives.

## `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble` (re-pointed)
canonicalHash: sha256:b9f4104614bde7bf3dcf7fc95a316fa126266e2816cc636ddabc2a555d94ffb1
renderedHash: sha256:dbacc688d209f5bf91e8911730fc5d9714173d4613f0ee7e704e977fcf5cb760
verdict: assent — surviving 1/1

**Re-signed 2026-09-29, in the re-sign run** (prior signature: refuse). **Refusal resolved.** `authority-precedence` now survives, re-grounded to the team's recorded decision.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble` (re-pointed; ROUTED)
> canonicalHash: sha256:b9f4104614bde7bf3dcf7fc95a316fa126266e2816cc636ddabc2a555d94ffb1
> renderedHash: sha256:62fd761373b55d6c61af941dadd08c48b662f4b5edb1572607b6fee1d268d579
> verdict: refuse: should-re-point
>
> `authority-precedence` has a consumer counterpart, and the rendering drops it. The rendering names the authority (the team's own recorded decision, on whose date the owed-set query keys) but not its precedence over this text. **Should re-point**: where this text and the recorded decision disagree, the decision governs. This is the same finding as consumer-Thurgood's Q5 preamble.

## `#the-trigger-set-the-114-superset-table-names-never-numbers`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-trigger-set-the-114-superset-table-names-never-numbers` (re-pointed)
canonicalHash: sha256:5055f134c5a6c6fc5ecd2f499d3eb428ff14a0679946152f88e630c0c8de3d7a
renderedHash: sha256:06dac47155245fbe852af23fa84f35bba0a952826efbf07c9d602b2e622501b5
verdict: assent — surviving 5/13; not surviving: `trigger-lens`, `trigger-release`, `trigger-closeout`, `trigger-arming`, `trigger-gate`, `trigger-straggler`, `trigger-liveness`, `trigger-burst`

**Re-signed 2026-09-29, in the re-sign run** (prior signature: refuse). **Refusal resolved.** The LENS row now carries the five verifiability questions inline, plus question 6.
- **`trigger-lens` is still not credited** under the crediting rule (run-2 summary): its M4 plan-time clause and its retire-to-emissions clause are dropped with nothing in their place. Both are keyed to this repo's instruments parser, so there is no consumer counterpart to re-point to, and no refusal follows.
- The other drops are unchanged from run 1: RELEASE (its Q2 guard), CLOSEOUT (rider (a)), ARMING, GATE, STRAGGLER, LIVENESS (the charter walk) and BURST.
- Surviving: `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing`, `merge-path-status`.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-trigger-set-the-114-superset-table-names-never-numbers` (re-pointed; ROUTED)
> canonicalHash: sha256:5055f134c5a6c6fc5ecd2f499d3eb428ff14a0679946152f88e630c0c8de3d7a
> renderedHash: sha256:9125e2b3608732006279ff89016052966e29a4b5a28369c25aba788f78e472fe
> verdict: refuse: should-re-point
>
> The LENS row (`trigger-lens`) keeps question 6 but replaces the **five verifiability questions** with one summary ("can each criterion be verified from the repo"). The five questions are: a criteria set exists; evidence of a named kind could exist; some state of the world reads UNMET; "met" is decidable without the author; and the task text promises no artifact the criteria do not cover. They are repo-independent and they are the seat's content. Only the pointer to the lifecycle amendment is repo-bound. **Should re-point**: carry the five questions inline. For the record, the rest of the unit would assent at `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing` and `merge-path-status` (5/13). Not surviving would be RELEASE (its Q2 guard), CLOSEOUT (the rider-(a) discharge), ARMING, GATE, STRAGGLER, LIVENESS (the charter walk) and BURST, all repo-bound.

## `#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference` (re-pointed)
canonicalHash: sha256:5ee037e6fcbfad1bfb0b13161645ec5942657afd355a34ed6a9cc65d8fa3577a
renderedHash: sha256:f960597172711b89e2548d4dbf51a86ebb87d2dabad202c4ca9b49e0418ca42d
verdict: assent — surviving 2/5; not surviving: `carve-out-scope`, `carve-out-falsification`, `carve-out-no-silent-rescope`

**Re-signed 2026-09-29, in the re-sign run** (prior signature: refuse). **Refusal resolved, by a changed disposition** (no-consumer-counterpart → re-pointed). The routing test and the tiebreak now survive verbatim. The verb enumeration, its falsification conditions and the re-scope clause are repo-bound, and they are dropped. Non-blocking, for Thurgood: the unit's heading still reads "The steward-verb carve-out (… enumerated …)" over content that no longer enumerates anything.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference` (no-consumer-counterpart; no-consumer-counterpart)
> canonicalHash: sha256:5ee037e6fcbfad1bfb0b13161645ec5942657afd355a34ed6a9cc65d8fa3577a
> renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
> verdict: refuse: should-re-point
>
> `no-consumer-counterpart` is not true of the whole unit. The steward-verb enumeration and its two falsification conditions are repo-bound, because a consumer does not steward DesignerPunk's docs corpus. But `carve-out-routing-test` ("was this claim verified?" → Stacy; "what must a completion doc contain?" → Thurgood) and `carve-out-tiebreak` (ambiguity resolves to Stacy, the seam fails toward the verifier) are the seam's arbitration, and a consumer's Stacy/Thurgood pair has the same seam. **Should re-point**: keep the routing test and the tiebreak, and drop the verb enumeration.

## Signing run summary (2026-09-29, phase two, run 1)

**Scope**: this run covers three dispositions files, 76 rows in all:
- consumer-Thurgood's rows in `thurgood.dispositions.yaml` (45; C1 carve-out);
- my own rows in `stacy.dispositions.yaml` (30; owner seat, with Peter sampling per F-3 (ii));
- the shared member `complete-task-tooling` in `_shared.dispositions.yaml` (1).

The identity docs under `always-set/` are run 2.

**Commits**, all `Agent: stacy`:

| Commit | Content |
|---|---|
| `bf07801a` | Thurgood, 44 assents |
| `c8bf23ee` | Thurgood refusal: Q5 preamble |
| `f85e9e17` | Stacy, 27 assents |
| `98bc13bc` | Stacy refusal: claims-audit preamble |
| `d0cb4203` | Stacy refusal: trigger set |
| `d4dfe030` | Stacy refusal: steward-verb carve-out |
| `8ddd4b1b` | `_shared`, 1 assent |
| the commit carrying this section | this summary |

**Referent widening**: none this run. The candidates the sheet lists for my two records are the ones I already ruled on in phase one, run 1 (in `confirmations/stacy.md`: left as drafted where widening would contain a sibling item, widened where it would not). The identity-doc candidates belong to run 2.

**Assented routed rows** (surviving / items):
- **Thurgood**:

  | Unit | Surviving |
  |---|---|
  | `#identity` | 5/5 |
  | `#in-scope` | 19/20 |
  | `#boundary-cases` | 3/3 |
  | spec-formalization `:preamble` | 1/1 |
  | `#spec-formalization-is-not-autonomous` | 2/2 |
  | audit `:preamble` | 1/1 |
  | `#step-2-gather-evidence` | 6/7 |
  | `#step-5-…` | 4/4 |
  | `#operational-mode-test-governance` | 5/5 |
  | `#resolution-path-…` | 3/3 |
  | `#trigger-types` | 11/20 |
  | `#steering-doc-lifecycle` | 4/4 |
  | `#the-charter-cut-…` | 2/4 |
  | `#the-composed-learning-loop-…` | 5/5 |
  | `#the-three-boundary-bounds-…` | 5/5 |
  | `#trust-by-default` | 3/3 |
  | `#obligation-to-flag` | 4/4 |
  | `#graceful-correction` | 3/3 |
  | `#the-process` | 4/4 |
  | `#what-this-means-in-practice` | 5/5 |
  | `#mcp-practice-notes` | 3/5 |
  | `#when-you-and-peter-disagree` | 1/1 |
  | `#what-you-dont-own` | 4/5 |

  **103/119 across 23 rows.**
- **Stacy**:

  | Unit | Surviving |
  |---|---|
  | `#identity` | 11/11 |
  | `#in-scope` | 8/10 |
  | `#out-of-scope` | 6/7 |
  | process-audit `:preamble` | 1/1 |
  | `#the-charter-cut-…` | 2/2 |
  | **`#the-claims-pass-record-…`** | **18/31** |
  | `#the-owed-set-pipeline-…` | 14/14 |
  | `#honest-reach-…` | 4/4 |
  | `#your-role` | 7/7 |
  | `#what-you-dont-do` | 3/3 |
  | `#with-thurgood-…` | 5/5 |
  | `#with-peter` | 3/4 |
  | `#mcp-practice-notes` | 5/5 |
  | `#ask-if-unsure` | 1/1 |
  | `#what-you-dont-own` | 3/4 |

  **91/109 across 15 rows.**
- The item ids not surviving, and the reason for each, are in each row's block above.

**Assented no-consumer-counterpart rows**, each `surviving: []`: Thurgood 21, Stacy 12, `_shared` 1.

**Refused rows**, each `refuse: should-re-point` in its own commit:
1. **Thurgood `#the-q5-boundary-…:preamble`** (routed): `authority-precedence` is dropped. The rendering names the team's recorded decision but not its precedence over this text.
2. **Stacy `#operational-mode-claims-audit-…:preamble`** (routed): the same finding.
3. **Stacy `#the-trigger-set-…`** (routed): the LENS row loses the five repo-independent verifiability questions; question 6 is kept. The rest of the unit would assent at 5/13.
4. **Stacy `#the-steward-verb-carve-out-…`** (no-consumer-counterpart): the routing test and the tiebreak toward the verifier are seam rules with a consumer counterpart. Only the verb enumeration and its falsification conditions are repo-bound.

**The tally, for the first-render block of B-U2 M1.** Signer: stacy. All of this is first render, and none of it is a baseline.

| Count | Value |
|---|---|
| Signature events | **76** |
| Assent events | **72** |
| Refusal events | **4** (3 on routed rows, 1 on a no-consumer-counterpart row) |
| **Assent rate on routed rows** (assent events / signature events) | **38/41** |
| Surviving / items over the 38 routed assents | **194/228** |
| Full-survival assents (every item surviving), counted by hand | **27/38** (Thurgood 17, Stacy 10) |
| No-consumer-counterpart signatures | 35 (34 assent, 1 refusal) |
| Rows signed on my own charter (self-audit, disclosed) | 30: 15 routed assents, 12 no-consumer-counterpart assents, 3 refusals |

- The full-survival count is informational. The instrumented signal remains `not yet instrumented`.
- Of the 27 full-survival assents, most are single substitutions ("Peter" → "your human lead") on small item sets. Two are item-by-item re-groundings: `#the-owed-set-pipeline-…` and `#honest-reach-…`.
- **Peter's sample of my own rows**: 0 / 30 at this commit. It is written here, not omitted (F-3 (ii)).
- Every refusal is a committed signature, so the refusal count is traceable in history (C3).

**Residuals**:
- **The counting-block unit.** The brief expected its rendering to carry the B-U2 items. I read those items as having no consumer counterpart, because consumer repos hold no consumer-profile dispositions, signatures or render populations. So I assented without them (18/31). If Peter or Thurgood reads it otherwise, that row is the place to re-judge.
- **Removal accounting (non-blocking, for Thurgood).** In that same row, the removals list names "**fixed-string exemption usage**" as removed. The rendering actually re-grounds it ("exemption usage … counted per waiver"), and I credited `counting-4`.
- **Judgment calls another signer could make differently**:
  - `evidence-dir-4` not credited (the rendering's grouping names no validators);
  - `counting-4` credited as re-grounded;
  - consumer-Thurgood `#trigger-types`: the owed-set items not credited in that unit, because they live in consumer-Stacy's unit;
  - `scope-12` removal accepted: the consumer gets no CI scope, which is stricter.
- **Each refused row must be re-judged in full at its re-sign.** No itemized set is carried over from the refusal.
- **No-consumer-counterpart signatures pin the empty-rendering hash**, so any future rendering of those entries stales them by design.

## Signing run summary (2026-09-29, phase two, run 2)

**Scope**: every routed row in the eight identity-doc dispositions files under `canonical/profiles/consumer/always-set/`, **30 rows**, all routed. No identity-doc row is disposed no-consumer-counterpart. The evidence notes are `canonical/profiles/consumer/signatures/<doc>.md`, which is the path each row's `evidence:` names and the one the sweep resolves.

**Commits**, all `Agent: stacy`:

| Commit | Content |
|---|---|
| `1eaf1f3b` | core-goals |
| `3af8e7ea` | ai-collaboration-principles |
| `a5653308` | spec-feedback-protocol |
| `4957ea91` | start-up-tasks |
| `c92bc0a8` | agent-directory |
| `c46291e2` | civitas-system-overview |
| `d9aff75e` | task-completion-protocol, 10 assents |
| `0115e4c3` | REFUSE: TCP completion-state |
| `cbd8d44a` | REFUSE: TCP tier-selection |
| the commit carrying this section | this summary |

**Referent widening**: none. I read all eight candidates the sheet lists, and in each, widening to carry the referent would contain a sibling item:
- AICP `provide` (it would contain the fold steps) and `calibrate-2` (the three responses);
- SFP `sequential-formalization-1` (the three steps) and `stamp-format-1` (`stamp-pattern`);
- Start Up Tasks `hc-1` (`hc-2`, in an 11.3 unit), `first-ask-whether` and `delegation-and-model-2` (the tier items).

The `document-access-1` items, in Civitas and SFP, are the known false positive: "This" refers to the document itself.

**The crediting rule, stated once** (it sharpens run 1's wording):
- An item is credited when each of its operative parts is stated in its unit's own rendering, or replaced there by its consumer counterpart (a path re-rooted, "Peter" → "your human lead", a tool replaced by the act).
- An operative part dropped **with nothing in its place** means the item is not credited, whether or not the dropped part was repo-bound.
- Non-operative parts (history, dates, examples, rationale) never block credit.

**Assented rows** (surviving / items):

| Doc | Unit | Surviving |
|---|---|---|
| core-goals | `#core-project-context` | 8/8 |
| core-goals | `#development-practices` | 21/23 |
| AICP | `#counter-argument-requirement` | 6/6 |
| AICP | `#when-human-and-ai-disagree` | 4/4 |
| SFP | `#the-feedback-document` | 7/7 |
| SFP | `#sequential-formalization-gate` | 6/6 |
| SFP | `#document-access` | 2/2 |
| Start Up Tasks | health check (exemplar G/G′) | 4/4 |
| Start Up Tasks | Jest item | 3/12 |
| Start Up Tasks | test selection | 6/10 |
| Start Up Tasks | instruments item | 3/6 |
| Agent Directory | orchestrator | 9/9 |
| Agent Directory | Thurgood | 3/4 |
| Agent Directory | Stacy (describes my seat) | 2/3 |
| Agent Directory | human lead | 4/4 |
| Civitas | contains | 7/10 |
| Civitas | three-layer | 6/6 |
| Civitas | document-access | 2/2 |
| TCP | critical | 1/2 |
| TCP | subtasks | 4/5 |
| TCP | parent Impl/Arch | 5/8 |
| TCP | parent Setup/Doc | 5/8 |
| TCP | coherent units | 3/7 |
| TCP | branch cleanup | 3/4 |
| TCP | conventions | 5/6 |
| TCP | merge rule | 2/3 |
| TCP | emergency | 1/3 |
| TCP | key rules | 4/9 |

**136/181 across 28 rows.** The not-surviving ids, and the reason for each, are in each doc's note.

**Refused rows**, each `should-re-point` in its own commit:
1. **TCP `#completion-state-in-the-pr-flow:preamble`**. The spine survives at 13/22, but two generic rules are dropped:
   - updating a green-but-unmergeable branch from `main` (`-19`);
   - the stacked-PR protocol (the `Stacked-on:` declaration and base-first merge order; `-7`).
2. **TCP `#tier-selection-…`**: the parent summary doc's **location** is dropped with nothing in its place. A consumer's agent cannot comply decidably, and the parent sections inherit the gap.

**The M1 tally, cumulative through run 2.** Signer: stacy. First render, not a baseline.

| Count | Run 2 | Cumulative |
|---|---|---|
| Signature events | 30 | **106** |
| Assent events | 28 | **100** |
| Refusal events | 2 | **6** (5 on routed rows, 1 on a no-consumer-counterpart row) |
| Assent rate on routed rows | 28/30 | **66/71** |
| Surviving / items over routed assents | 136/181 | **330/409** |
| Full-survival assents, counted by hand | 11/28 | **38/66** |

- The full-survival counts are informational. The instrumented signal remains `not yet instrumented`.
- No-consumer-counterpart signatures are unchanged at 35 (34 assent, 1 refusal).
- Self-audit rows are unchanged at 30 (my own charter), plus Agent Directory's Stacy unit, which is a disclosed self-description.
- **Peter's sample of Stacy-signed rows**: 0 / 30, written here, not omitted.

**Residuals**:
- **A run-1 over-credit (the dangerous direction), under the rule stated above.** Stacy `#mcp-practice-notes` `mcp-fallback` was credited 5/5, but its knowledge-base glob drops `docs/specs/` with nothing in its place. It should read 4/5. I have not re-signed it here: that row is merged, a re-sign is a new signature event, and Thurgood is re-authoring the batch. It is recorded for his re-author pass and for Peter's sample.
- **A canonical tension, flagged to Thurgood.** Start Up Tasks #5 says a regular task runs `npm test`, the full functional lane. TCP's "For SUBTASKS" says targeted tests. The rendering follows TCP. I did not credit `test-command-selecti-2`, and I did not refuse the row either, because the tension is in the canonical docs, not in the re-grounding.
- **Heavy compression in TCP.** Several dropped clauses have consumer counterparts but did not reach the refusal bar: the never-overwrite rule, the forced-negative line, the unit-branch CI provenance, and "surviving any delegation" on the merge carve-out. They are recorded as not credited, and the per-row notes name each one. Another signer could reasonably refuse on those.
- **The counting-block read (run 1, 18/31)** stays as recorded. Per your note, I am not re-judging it unless Thurgood re-authors.
