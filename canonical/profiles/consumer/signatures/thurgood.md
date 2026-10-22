# Signatures — `thurgood` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/thurgood.dispositions.yaml`. **Signer**: Stacy. For consumer-Thurgood's rows she signs in the C1 carve-out seat, because the owner is the profile author.
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 1**, 2026-09-29, Spec 123 Task 15.5.

## `#identity`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#identity` (re-pointed; ROUTED)
canonicalHash: sha256:e396aa201b6a31a256a242b1b52f267804e02bca71865fd8721df8f47afd2255
renderedHash: sha256:3a407bdcfe27238327d36a8025209dd2dd2a7c30971796a17a3133cd2a0f576d
verdict: assent — surviving 5/5

"for DesignerPunk" → "for this design system — its Civitas"; Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#in-scope`

signer: stacy
date: 2026-10-20
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#in-scope` (re-pointed; ROUTED)
canonicalHash: sha256:7beb0570510b6af92be4cf368831f0ea152bbfdf9c1a6867bcd92c1fb792de39
renderedHash: sha256:5ac2d4d30cbdce5a9e34a0a66dff621d3e78e87f4500dee9f715f39f2fc72037
verdict: assent — surviving 19/29; not surviving: `scope-12`, `scope-13`, `scope-14`, `scope-15`, `scope-16`, `scope-17`, `scope-18`, `scope-19`, `scope-20`, `scope-21`

**Re-signed 2026-10-20** (prior signature: assent 19/29, 2026-10-17, against `sha256:1ea9098706cf802cea50bde68a44d02b417aeceade432f429b8358c1ad0f38b2`). Stale because the canonical unit changed: ballot `2026-10-20-in-lane-guard-registry-additive-entries` (P1b; RATIFIED, Peter, 2026-10-20) added a sentence to the CI-regime bullet (`scope-12`) for `.github/in-lane-guards.json`: an entry may be added, never changed or removed. Thurgood applied it at `ae68f130b`; I re-confirmed the set at 29 items (`8674be2e5`); he pinned the overlay and regenerated (`ebc83c6b5`). The rendering did not change by a byte: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to the prior signature's.
- **Judged against**: the rendered unit at this revision and the operative set at 29 items.
- **`scope-12` still does not survive, and the new sentence goes with it.** The bullet is a repo CI grant: it names `lane-timing.yml`, `EXPECTED_CONTEXTS` and a registry file that only DesignerPunk's `lane-functional-root` check reads. A consumer's CI has none of them, and the rendering states none of it (checked: no "in-lane" or "additiv" text under `canonical/_consumer-output`, and the grep for the registry path, P1b and the predicate in consumer output returns 0). The whole-bullet removal (`subtraction-2`) quotes the bullet, and Thurgood rewrote its text to the new bullet. No refusal follows.
- **Unchanged from the 2026-10-17 signature**: the same 19 items survive and the same 10 are not credited, for the reasons in the prior record below.
- **C1 collapse**: I signed this assent on a row of Thurgood's charter in the counterpart seat; it is in Peter's sample as Stacy-signed.

**Prior signature record (superseded, 2026-10-17)**:

> signer: stacy
> date: 2026-10-17
> row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#in-scope` (re-pointed; ROUTED)
> canonicalHash: sha256:1ea9098706cf802cea50bde68a44d02b417aeceade432f429b8358c1ad0f38b2
> renderedHash: sha256:5ac2d4d30cbdce5a9e34a0a66dff621d3e78e87f4500dee9f715f39f2fc72037
> verdict: assent — surviving 19/29; not surviving: `scope-12`, `scope-13`, `scope-14`, `scope-15`, `scope-16`, `scope-17`, `scope-18`, `scope-19`, `scope-20`, `scope-21`
>
> **RE-SIGNED 2026-10-17 — ASSENT, surviving 19 of 29.** Judged against the 29-item set I confirmed at `0dc7213d1`.
> - **What changed**: in canonical, only the six-roots bullet (ballot 2026-10-17-standing-write-scope-six-roots). The rendering did not change by a single byte (renderedHash recomputed, equal to the prior signature's), because the row removes the whole bullet under `subtraction-1`.
> - **The nineteen prior survivors stand** as at the 2026-09-29 signature. `civitas-8` survives, re-grounded to "the docs your team owns that no single domain agent does". `scope-12` still does not survive: it is a repo CI grant with no consumer counterpart.
> - **The nine new items do not survive, and I agree they should not.** The rendering states none of them, so a compliant consumer implementation can break each one. Each is bound to this steward repo:
>   - `scope-13` grants this repo's files: the `scripts/` checks, the docs MCP source and tests, the `.kiro/hooks/` completion tooling, `.kiro/issues/**`, and the generator's checkers and sweeps, with this repo's test-assignment rule;
>   - `scope-14`, `scope-15` and `scope-19` are this repo's PR and consult mechanics over those files and its task-row and issue-row grants;
>   - `scope-16`, `scope-17` and `scope-18` name this repo's legacy scripts, `RELEASE-FLOW.md` and README rule 9;
>   - `scope-21` is `canonical/agents/**` law.
> - **Some of these paths reach a consumer, but only as read-only package contents.** `mcp-server/src/` is in the package's `files`, and the docs MCP is also bundled as `dist/mcp/docs-mcp.js`. `signatures.ts`, `check-catalog.ts` and `workflow-rules-guard.ts` are inlined into the shipped `dist/generator/consumer-entry.js`. A change to any of them goes upstream. None is a duty to re-key (subtraction 1).
> - **The one I weighed hardest is `scope-20`.** "Owning an instrument never authorizes changing the law it serves without a ballot" reads as general. But it is stated over this repo's instruments and its ballot law, and the consumer rendering grants the seat no standing write scope over any instrument for it to attach to. Removing the bullet leaves consumer-Thurgood with no standing write grant at all, which is stricter, not looser.
>
> No refusal.

## `#boundary-cases`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#boundary-cases` (re-pointed; ROUTED)
canonicalHash: sha256:4d88ea810df219fc662c033fc3718d69cee169d8eac3784cf1256e95aca2e3d4
renderedHash: sha256:897d222a732569af1be2dae8e9486b63e24ecb41f8effd908c6baa6393420350
verdict: assent — surviving 3/3

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#operational-mode-spec-formalization:preamble`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#operational-mode-spec-formalization:preamble` (re-pointed; ROUTED)
canonicalHash: sha256:a6d50d930cd412e1ad58cd585ffd2f77b308ca1b771fa372d39447e922eaa666
renderedHash: sha256:6e2c8354aad2688d2a4abf70f2280d24ced70cda65bccee0851385079ead4b99
verdict: assent — surviving 1/1

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#step-0-read-the-records-that-name-the-spec`

signer: stacy
date: 2026-10-21
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#step-0-read-the-records-that-name-the-spec` (no-consumer-counterpart; first signature)
canonicalHash: sha256:ad3c60d3e1b78b06d44a01035a84a5b2d9c97ef90a935f8d77f5261928117be3
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/1; not surviving: `read-records-first`

No consumer counterpart, confirmed; I agree with the disposition and the cite (`subtraction-3`). The unit is Step 0 of Spec Formalization, added by ballot `2026-10-20-manual-records-routed-readers` (RATIFIED, Peter, 2026-10-20) E2 (site 4, Thurgood `fadc095e4`): run Process-Spec-Planning's pre-formalization grep over the root `.kiro/issues/` records and write the disposition lines in the requirements feedback round before Step 1. I confirmed the set at 1 item (`17702702b`).
- **The cite**: the step is an obligation to read this repo's stewardship record system, the root issue records and their `**Trigger**:` lines, with a disposition convention that section defines for this repo's issue corpus. A consumer install has neither the records nor the convention. That is a stewardship instrument carried as an obligation (`subtraction-3`). `subtraction-1` is the near miss: the step names no tool by invocation. Steps 1 to 5 of this mode are retained for consumers, so consumers do formalize specs; the narrower ground is why this step alone has no counterpart.
- **Rendering, checked**: 0 rendered pieces for this unit in the fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`; 113 of 113 consumer-output files byte-identical to the committed tree), so the renderedHash is the empty-span hash. A grep of the fresh and committed rendering for "Records That Name the Spec", "pre-formalization grep" and `issues-owned` returns 0. I assent that nothing survives, and `read-records-first` is not credited.

## `#spec-formalization-is-not-autonomous`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#spec-formalization-is-not-autonomous` (re-pointed; ROUTED)
canonicalHash: sha256:6910a07a551539e061d95f125e78fb596d39574dc6204e633fad7de7e128daec
renderedHash: sha256:5da6aac879e9db54254c711167aa98b2c14e6ca27bf0fd7c9a01af96d57c68d0
verdict: assent — surviving 2/2

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#operational-mode-audit:preamble`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#operational-mode-audit:preamble` (re-pointed; ROUTED)
canonicalHash: sha256:2e57eb4ac8d7e695f422198ee9ee33b1a7136723a134742fc31fa9f0a0a77d5f
renderedHash: sha256:8e4371b2e200ad21f66761f8fecb8177757bedbb30b68c0a6ac0d12824677064
verdict: assent — surviving 1/1

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#step-2-gather-evidence`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#step-2-gather-evidence` (re-pointed; ROUTED)
canonicalHash: sha256:d89dcc2c0b9d368ebe7b85a858952248ed7a034281899b8f48baea748fc50f00
renderedHash: sha256:3420212c69ffad14793820fcc7776dafe8cbfd7c16a61142e20dddbe46bfa358
verdict: assent — surviving 6/7; not surviving: `evidence-dir-4`

`evidence-3` and `evidence-dir-1` to `-3` survive re-grounded ("scan your repo's test directories … read its test configuration … group them by what they test: shared infrastructure, tokens, components"). `evidence-dir-4` (validator tests) is not entailed: the rendering's grouping names three kinds and no validators.

## `#step-5-flag-domain-specific-issues`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#step-5-flag-domain-specific-issues` (re-pointed; ROUTED)
canonicalHash: sha256:a58ebb7928eabb0d614829559d7e9e42540105cf7e4dcfa4fd1a5aa07b864cb8
renderedHash: sha256:8e42e80cb1f4c5c83e5833007f7a4097f2bbd7fd82d54bfe0f1070cee752571a
verdict: assent — surviving 4/4

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#operational-mode-test-governance`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#operational-mode-test-governance` (re-pointed; ROUTED)
canonicalHash: sha256:a2f9b49ea33e0c12fb4b93056b91e00d30b7007a17b6fa5f43e4ab96c71e9a28
renderedHash: sha256:f95a6d57834f2729f75ad97340287b9054f7d08563e45729b7104fb37d0eac49
verdict: assent — surviving 5/5

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#resolution-path-for-flagged-inconsistencies`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#resolution-path-for-flagged-inconsistencies` (re-pointed; ROUTED)
canonicalHash: sha256:e694a69734be01ee779a87b0fcf7d4d4d62ee088b34db6334ece5ea64cfd85be
renderedHash: sha256:bf375f4207dc46c1160c087ff425aae4884d5464bcdb42fc859273d3d21f7193
verdict: assent — surviving 3/3

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#trigger-types`

signer: stacy
date: 2026-10-22
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#trigger-types` (re-pointed; ROUTED)
canonicalHash: sha256:032199e154a7922469a7310d32e68bec6979556093fd8650420434b2a074b036
renderedHash: sha256:da5352d42da3a81edb6708dfbbcf6d045da4e019d331e7a473c98729ce7e5f67
verdict: assent — surviving 11/27; not surviving: `instruments-named`, `event-post-doc`, `liveness-release-complete`, `liveness-charter-walk`, `liveness-grant-activations`, `liveness-grant-activations-query`, `owed-set-roles`, `owed-set-predicate`, `owed-set-row-classes`, `owed-set-candidates-not-verdicts`, `owed-set-count-line`, `owed-set-unavailable`, `owed-set-unit-classes`, `owed-set-anchor-proxy`, `owed-set-wrong-result`, `register-read`

**Re-signed 2026-10-22** (prior signature: assent 11/23, 2026-10-21, against canonical `sha256:c0eae177…` and rendered `sha256:da5352d4…`). Stale because the canonical unit changed: its owed-set paragraph now describes the committed script (LIVENESS read 1 names `bash scripts/owed-set.sh`; the pasted pipeline, the exclusion-classes paragraph and the ladder paragraph are replaced by the script contract; Thurgood, `1b51c1f87`, record `b7c32ae44`), and I re-confirmed the set at 27 items (`3c8c43a55`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering of the worktree at `060894526` (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to the prior signature's.
- **Judged against**: the rendered unit at this revision and the operative set re-confirmed at 27 items.
- **`liveness-owed-set` survives, re-grounded.** Its canonical text changed (it now names `bash scripts/owed-set.sh` and "the owed-set query below"); the rendering reads *"Is the closeout-owed set empty?" — run Stacy's owed-set query and read its output*. The path is this repository's; the consumer's call is in consumer-Stacy's owed-set unit (re-signed in this same set, `bash node_modules/@3fn/core/scripts/owed-set.sh --specs-dir specs`). The step and its pointer survive.
- **The eight new items are not credited, on the 2026-09-29 ground, and the removal (`subtraction-2`) applies.** They describe the script and its roles: `owed-set-predicate` (changed text, still not credited), `owed-set-row-classes`, `owed-set-candidates-not-verdicts`, `owed-set-count-line`, `owed-set-unavailable`, `owed-set-unit-classes` and `owed-set-anchor-proxy` live in consumer-Stacy's owed-set unit and are reached here through "run Stacy's owed-set query", as the predicate, pipeline, classes, ladder and three-copies clause were. `owed-set-roles` and `owed-set-wrong-result` assign authorship and maintenance of the script to the steward and fix wrong results in this repository's test file; a consumer receives the script in the package, and its counterpart (report a wrong result as a script defect, call the same script from every place) is consumer-Stacy's `owed-set-one-code-path`. No consumer counterpart exists to re-point to in this seat, so no refusal follows. The removal label ("The owed-set query (`bash scripts/owed-set.sh`) and its ballot ratification date", `subtraction-2`) names the material; I checked it applies, and the consumer rendering contains no `scripts/owed-set.sh`, row-class or count-line text (grep over the fresh rendering: 0).
- **The closest call**: `owed-set-candidates-not-verdicts`. A steward reading LIVENESS read 1 alone could report a candidate as owed. It is reached through the pointer to Stacy's query, whose rendered unit states it ("candidates, not verdicts ... a candidate for a spec still in progress is expected and is not a finding"), and the unit's `liveness-records-not-verdicts` bound survives. I credit the pointer, not the item.
- **Unchanged from the 2026-10-21 signature**: the eleven survivors (`instruments-computed`, `event-post-spec`, `event-post-prompt`, `cadence-health-check`, `return-edge`, `liveness-records-not-verdicts`, `liveness-owed-set`, `liveness-records`, `discovery-spec`, `discovery-feedback`, `discovery-audit`) and the other non-survivors (`instruments-named`, `event-post-doc`, `liveness-release-complete`, `liveness-charter-walk`, `liveness-grant-activations`, `liveness-grant-activations-query`, `register-read`), on the same grounds; their canonical and rendered text did not move. Surviving count: 11 of 27.

**Prior signature record (superseded, 2026-10-21; canonical `sha256:c0eae177…`)**:

> signer: stacy
> date: 2026-10-21
> row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#trigger-types` (re-pointed; ROUTED)
> canonicalHash: sha256:c0eae17781843d50c34fec00c2c31a7772924a04ce3e9c017f1efa2cbc1205fd
> renderedHash: sha256:da5352d42da3a81edb6708dfbbcf6d045da4e019d331e7a473c98729ce7e5f67
> verdict: assent — surviving 11/23; not surviving: `instruments-named`, `event-post-doc`, `liveness-release-complete`, `liveness-charter-walk`, `liveness-grant-activations`, `liveness-grant-activations-query`, `owed-set-three-copies`, `owed-set-predicate`, `owed-set-pipeline`, `owed-set-exclusion-classes`, `owed-set-promotion`, `register-read`
>
> **Re-signed 2026-10-21** (prior signature: assent 11/21, 2026-10-17, against `sha256:b4d484bc616d3215424be7d346e2729bca7e8178564925e0a0590795ba38a961`). Stale because the canonical unit changed: LIVENESS gained a fourth read, item 4, **Grant activations**, with its query (ballot `2026-10-20-grant-ci-deletions-and-activating-merge-read` (RATIFIED, Peter, 2026-10-20) § 2 A-2, edit site 3; Thurgood, `3fa2565fa`), and I re-confirmed the set at 23 items (`17702702b`). He pinned the overlay and regenerated (`77ea79b0d`). the rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/_tmp_render.ts`), 113 of 113 consumer-output files byte-identical to the committed tree, equal to the prior signature's value.
> - **Judged against**: the rendered unit at this revision and the operative set re-confirmed at 23 items.
> - **`liveness-grant-activations` and `liveness-grant-activations-query` are not credited, and their removal (`subtraction-3`) applies.** The read walks root `.kiro/issues/` `**Grant paths**` blocks and the DesignerPunk civitas-health-checks records and routes an `OWED` candidate to a claims seat's ARMING duty that consumers do not receive (consumer-Stacy's ARMING row is removed whole, `signatures/stacy.md`). It is a stewardship instrument carried as an obligation, the same ground as `liveness-charter-walk` and `register-read`. The removal Thurgood added ("The grant-activation read (LIVENESS item 4) and its query over `.kiro/issues/` grant records", `subtraction-3`) names both; I checked it applies. The consumer rendering of the unit contains no grant-activation text (grep over the fresh and committed rendering: 0), so nothing is falsely entailed. No refusal follows.
> - **Unchanged from the 2026-10-17 signature**: the eleven survivors (`instruments-computed`, `event-post-spec`, `event-post-prompt`, `cadence-health-check`, `return-edge`, `liveness-records-not-verdicts`, `liveness-owed-set`, `liveness-records`, `discovery-spec`, `discovery-feedback`, `discovery-audit`) and the ten other non-survivors, on the same grounds; their canonical and rendered text did not move. Surviving count: 11 of 23.
>
> **Prior signature record (superseded, 2026-10-17)**:
>
> > signer: stacy
> > date: 2026-10-17
> > row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#trigger-types` (re-pointed; ROUTED)
> > canonicalHash: sha256:b4d484bc616d3215424be7d346e2729bca7e8178564925e0a0590795ba38a961
> > renderedHash: sha256:da5352d42da3a81edb6708dfbbcf6d045da4e019d331e7a473c98729ce7e5f67
> > verdict: assent — surviving 11/21; not surviving: `instruments-named`, `event-post-doc`, `liveness-release-complete`, `liveness-charter-walk`, `owed-set-three-copies`, `owed-set-predicate`, `owed-set-pipeline`, `owed-set-exclusion-classes`, `owed-set-promotion`, `register-read`
> >
> > **Re-signed 2026-10-17** (prior signature: assent 11/21, 2026-10-03, against `sha256:50cfe904…189414c0`). Stale because the canonical unit and its rendering both moved: the cadence-driven step now reads the newest health-check record instead of a date in Start Up Tasks (canonical `2df26ddee`, the consumer overlay `038ba7838`; Thurgood, as consistency edits to ballot `2026-10-17-no-volatile-metadata-in-signed-units`). renderedHash recomputed from `canonical/_consumer-output/` at this revision with the generator's own `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`.
> > - **Judged against**: the rendered unit at this revision and the set re-confirmed at 21 (`8f2639d2c`).
> > - **`cadence-health-check` survives, re-grounded**: *"When the newest health-check record is older than your team's cadence, run the health check, review the findings, flag issues to domain agents as needed, and commit the check's record."* That states the step's whole function: the staleness test (against the newest record, at the team's cadence in place of "monthly"), the run, the review, the flag and the closing commit of the record. The record directory is removed (`subtraction-3`, replacing the old `Start Up Tasks` removal); "there" loses its referent with it and is not needed, since the consumer's record location is the team's (as in `start-up-tasks` `#item-civitas-governance-health-check`, re-signed `d4fdd609c`). The step and the start-up item now say the same thing on both sides, which the old pair ("record the new date" / "keep its date recorded here") also did.
> > - **Unchanged from the 2026-10-03 signature, below**: the ten other survivors and the ten non-survivors, on the same grounds; their canonical and rendered text did not move.
>
> **Prior signature record (superseded, 2026-10-03)**:
>
> > signer: stacy
> > date: 2026-10-03
> > canonicalHash: sha256:50cfe90475442c31152e04f7f6786332694f9c9e0fc85797ab3b4af8189414c0
> > renderedHash: sha256:91410d9f7178c41b379e2852047aefc7af3f877160a60fccd3d3e672980456f1
> > verdict: assent — surviving 11/21
>
> **Re-signed 2026-10-03** (prior signature: assent 11/20, 2026-09-29, against `sha256:563ec186…`). Stale because LIVENESS read 2 gained one sentence (ballot `2026-10-03-hermetic-publish-path` § 5 item 6 (2b) and A8, canonical commit `59e2b7ff`); the rendering did not change (renderedHash recomputed from `canonical/_consumer-output/` at this revision: unchanged).
> - **Judged against**: the rendered unit at this revision and the operative set re-confirmed at 21 items (`9ebc06ba`), which carries the sentence as its own item, `liveness-release-complete`.
> - **`liveness-release-complete` is not credited, and its removal (`subtraction-3`) applies.** The sentence tests a RELEASE record for this repo's two-phase form: phase 1 on the release squash, the `publish-rail liveness: owed` state, a phase 2 drafted against the open step-6 PR and its merge-confirmation line. Those are this repo's release instruments as obligations. No consumer counterpart exists to re-point to, and consumer-Stacy's RELEASE row carries no two-phase form either (`signatures/stacy.md` `#the-trigger-set-…`), so re-pointing it here would test consumer records for a form their own claims seat never produces. No refusal follows.
> - **`liveness-records` still survives verbatim**: its text did not change, and "events without records = finding" holds for a consumer as written.
> - Unchanged from the 2026-09-29 signature, below: the ten other survivors and the nine other non-survivors, on the same grounds.
> - **History**: on PR #284 (closed, kept at `refs/pull/284/head`) an earlier seat held this re-sign (`94ab3909`) pending the operative-set correction, then signed assent 11/21 (`c526dd09`). The hold was a sheet edit, which the signing-chain instrument reads as a failed act; the branch was re-cut without it (follow-ups issue § 4). This act is taken afresh and stands on its own.
>
> **Prior signature record (superseded, 2026-09-29)**:
>
> > signer: stacy
> > date: 2026-09-29
> > canonicalHash: sha256:563ec1867eb08981fc5ff1f09e849ef8a0d6da784fb7c581b27e4a158596fe9d
> > renderedHash: sha256:91410d9f7178c41b379e2852047aefc7af3f877160a60fccd3d3e672980456f1
> > verdict: assent — surviving 11/20
>
> **2026-09-29 grounds — survive, re-grounded**: `instruments-computed` ("your repo's own checks"), `event-post-spec`, `event-post-prompt`, `cadence-health-check` (the team's cadence), `return-edge`, and `liveness-owed-set` (re-pointed to Stacy's owed-set query). `liveness-records-not-verdicts`, `liveness-records` and the three discovery steps survive verbatim. **Not surviving**: `instruments-named` (this repo's scripts); `event-post-doc` (the rendering drops "layer assignment", DesignerPunk's layering); the active-charter walk and the proposed-row register read (this repo's issue and register conventions); and the owed-set predicate, pipeline, classes, ladder and three-copies clause, which live in consumer-Stacy's owed-set unit and are reached here through "run Stacy's owed-set query".

## `#steering-doc-lifecycle`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#steering-doc-lifecycle` (re-pointed; ROUTED)
canonicalHash: sha256:8ea268cb6f24e9f84d5760dc6134f38de20257fc19c87b2ecbd082daaecf819a
renderedHash: sha256:cddfbaaf4ddbe7df7f8d325405dd1c1cf29ba7b83763fb654c70ffd8dde810cc
verdict: assent — surviving 4/4

All four survive re-grounded: "validate the metadata before the doc merges", "your team's periodic health check", and deprecation "requires your human lead's decision, with rationale" (the ballot model's function).

## `#the-charter-cut-ratified-verbatim`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#the-charter-cut-ratified-verbatim` (re-pointed; ROUTED)
canonicalHash: sha256:359a3c7d4a4fbe610444f54e02b424faf53339f44b8fffd81015a82007a91611
renderedHash: sha256:9bd202da8b460899bad8f6dfdd3dfb92a5bace7809a792debcd6edff5fce52e1
verdict: assent — surviving 2/4; not surviving: `you-retain`, `steward-verb-carve-out`

Both cuts survive verbatim. `you-retain` is not entailed as a whole: the rendered list drops STRAGGLER and the register row, which are repo-bound. The steward-verb carve-out names the docs-MCP steward verbs over DesignerPunk's own corpus, which a consumer does not steward.

## `#the-composed-learning-loop-your-standing-duties-on-every-claims-pass`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#the-composed-learning-loop-your-standing-duties-on-every-claims-pass` (re-pointed; ROUTED)
canonicalHash: sha256:6575df29c6e7994654ba2670352bb5b2f935d1d979f128b7b887b7c7d900ae1e
renderedHash: sha256:7a5fc024f6b95ad0a4b1cb3da68c43e1f059717e140a5ad6f44e264c300196b6
verdict: assent — surviving 5/5

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#the-three-boundary-bounds-ratified-unsoftened`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#the-three-boundary-bounds-ratified-unsoftened` (re-pointed; ROUTED)
canonicalHash: sha256:a8cdcf53203a837c37ed918cdab99d8c28a667c02fad088c11d8c7715cb5bdd8
renderedHash: sha256:b5ce5aad899e580ccd4d5ab7ca72ddc925bad6c16a396fb1ee830a91e3783c4d
verdict: assent — surviving 5/5

`framing-sentence` survives re-grounded ("any reading of a green check as evidence of claim honesty has made the error claims passes exist to prevent").

## `#trust-by-default`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#trust-by-default` (re-pointed; ROUTED)
canonicalHash: sha256:bb15abae7190ec88718ce51fad8a5330f94c0c13a50489e0019990fa9c3d7094
renderedHash: sha256:cea0f9c0255a0ae2081611ed19f3d6d6d83cc3af1d7b1b80c1c0e4b817bb9a19
verdict: assent — surviving 3/3

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#obligation-to-flag`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#obligation-to-flag` (re-pointed; ROUTED)
canonicalHash: sha256:7ff4447458c792fc53a512af33b0886a2ae5ab637ca513143c52593c049a6efe
renderedHash: sha256:0765b6b9c561c855fb967d141f0f36d1f5c4f9985027aa8c327687a89e6167c5
verdict: assent — surviving 4/4

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#graceful-correction`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#graceful-correction` (re-pointed; ROUTED)
canonicalHash: sha256:c6fe9573c12cbe0bd99195eae036c3a3db6d245652d52a9c08773a44bc15c9df
renderedHash: sha256:958b96239d6a7182697613486d1bf2ef9b550172932f0eab93f47584bc5fd06e
verdict: assent — surviving 3/3

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#the-process`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#the-process` (re-pointed)
canonicalHash: sha256:2c4db7b65be7f3bf074ab8f761d34aa9450e25295881e5eed70545aea9b1f5fc
renderedHash: sha256:8b00b71b34ce4d0244307d6df17b5932da5672a10ab2993d7226f67e45464c2d
verdict: assent — surviving 4/4

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 4). All four survive. `ballot-1` is re-grounded to the team's governance, process and shared docs, with the upstream rule added (a change to a doc shipped in the installed package is proposed to DesignerPunk, never applied locally). `ballot-4` gains the same rule. "Peter" → "your human lead".

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#the-process` (re-pointed; ROUTED)
> canonicalHash: sha256:2c4db7b65be7f3bf074ab8f761d34aa9450e25295881e5eed70545aea9b1f5fc
> renderedHash: sha256:7992c934c008e1a65fcae7cd3469d8d37bed5462315e034253fd6b1f5be86717
> verdict: assent — surviving 4/4
>
> Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#what-this-means-in-practice`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#what-this-means-in-practice` (re-pointed; ROUTED)
canonicalHash: sha256:87e9a365cd107209c071e5ebbd21a251acf28b33d5835d8fbeb05bce776989b8
renderedHash: sha256:b8367b5ed3ad301af57c27abae5bdf662122d779ace019b79fd6b192cc9f0692
verdict: assent — surviving 5/5

`practice-1` survives re-grounded (DesignerPunk's shipped docs and the generated identity files are not written; the team's shared docs change only through this process). So does `practice-2` ("your process or standards docs"). Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#mcp-practice-notes`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#mcp-practice-notes` (re-pointed; ROUTED)
canonicalHash: sha256:61b6534dc4861bf69477f5db596cf4018372215da9b47591e9931a5b699be07a
renderedHash: sha256:12f983871a77723c1b9933690f75901ce474a1821f24d301d7bcb32f4f3932cd
verdict: assent — surviving 3/5; not surviving: `rebuild-docs`, `prompts-not-indexed`

`monitor-exceptions` and `mcp-fallback` survive, and `kb-fallback` survives re-grounded ("your repo's test directories"). `rebuild-docs` and `prompts-not-indexed` have no consumer counterpart: a consumer's docs MCP serves DesignerPunk's shipped corpus, which the consumer's edits do not feed.

## `#when-you-and-peter-disagree`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#when-you-and-peter-disagree` (re-pointed; ROUTED)
canonicalHash: sha256:c82414480e057b4ae6d51c4d8d99d73b456dcdb5b64a01f116d5e4cbeef4ce20
renderedHash: sha256:74127edfce1de10aa6e5ca65ecf41a4ac048bef09ca732235bce850c6ab0162a
verdict: assent — surviving 1/1

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#what-you-dont-own`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#what-you-dont-own` (re-pointed; ROUTED)
canonicalHash: sha256:70487f45dd219578781ab15f503fe5648890766d3c31d25a76c211419f7b0eaa
renderedHash: sha256:81cce7718173bc23f1005880c0ea07cb4634761933ac08df4eb4a22d981af8a2
verdict: assent — surviving 4/5; not surviving: `jest-not-vitest`

The four ownership lines survive. `jest-not-vitest` is this repo's runner; the re-grounding ("run tests with your repo's own test runner … read them from its package.json") is its correct consumer counterpart, and it does not entail "Jest, never Vitest".

## `#frontmatter:ambient[process-development-workflow#task-completion-workflow]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `ambient[process-development-workflow#task-completion-workflow]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:6c4ce7e83d412bf375c77cc62bb9588b88ded2108f0f9851ab931f527886fba4
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own ambient embed of DesignerPunk's PR-flow law. A consumer runs its own completion flow. I assent that nothing survives.

## `#frontmatter:routes.docs[completion-doc-guidance]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.docs[completion-doc-guidance]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:b35801bbab081386eb68c4ef8e068a8c6f5ba4599e2a7cac6139e2ff7110dad0
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[build-system-setup]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.docs[build-system-setup]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:a3980eb1051e023126305278eefed29ec8cb7c6767aef4ce305f02d511b3183e
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[completion-docs-beyond]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.docs[completion-docs-beyond]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:8cd095049e861687db97d272e73e8336a4b3f0c74183249dedaf61d3833daeaa
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[file-organization]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.docs[file-organization]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:140957b75ae4911267ee722e655262d2db2dc32849ce04117540426a051b7f20
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[hook-ops-detail]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.docs[hook-ops-detail]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:6ed76d213afbd193724c2327a9ce078d49918e2b0d1aa67916f6b9e40d33bdaa
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[ci-enforced-guards]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.docs[ci-enforced-guards]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:bd061e8920b6c72587e5533d0bd15fad39e348d1343169e57010a1b129dafe32
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[dev-workflow-detail-add]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.docs[dev-workflow-detail-add]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:65c5b492bb3a39cd79dd5d8b239e9709e0908bd0b301a7d240364355bc62cae2
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.cues[1]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.cues[1]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:962d8a2fa53a8a20e1dfef28b610959a729b0a3fb35697fdd175b87130282cce
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own steward-verb cue over DesignerPunk's docs corpus, which a consumer does not steward. I assent that nothing survives.

## `#frontmatter:routes.cues[2]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.cues[2]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:1c072f1b083170f9bbb5cd4d74cc3dd51d632dc31b49b8632649e02a4d3545c6
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own steward-verb cue over DesignerPunk's docs corpus, which a consumer does not steward. I assent that nothing survives.

## `#frontmatter:routes.cues[4]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `routes.cues[4]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:5bb4dd9efd3586f5413040503ca5def009de788c50ed4a290da16a391719d0fb
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own steward-verb cue over DesignerPunk's docs corpus, which a consumer does not steward. I assent that nothing survives.

## `#frontmatter:commands[governance-health-check]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[governance-health-check]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:0a46253a4a60e82db0d9e50d2824aef4224ffb5e5e1f2cb30dd3726ee620da61
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[validate-steering-metadata]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[validate-steering-metadata]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:28714fff3e29d8456490d66a3629b9ed2579732fb5cff78a64eaa8837c734d8d
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[scan-cross-references]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[scan-cross-references]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:40e06230dd15e190c2296d2b6131c43d2fd73c84ebc9350c265674ede41fcfb6
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[detect-affected-steering-docs]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[detect-affected-steering-docs]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:e942ec4ed1fc1d535e7813a1c999e9a9cc0b8192a0971a3cec9217be78b93118
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[functional-suite]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[functional-suite]` (superseded-by)
canonicalHash: sha256:486cf419abf0a92c57d8a600b0a99892e35f0c7e7d9d7d4c52be6bcefbc354be
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 0). Assent to the changed disposition, `superseded-by #what-you-dont-own`. That unit's rendering carries the function: "run tests with your repo's own test runner and scripts — read them from its `package.json`".

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[functional-suite]` (no-consumer-counterpart; no-consumer-counterpart)
> canonicalHash: sha256:486cf419abf0a92c57d8a600b0a99892e35f0c7e7d9d7d4c52be6bcefbc354be
> renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
> verdict: assent — surviving 0/0
>
> No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[full-suite-with-performance]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[full-suite-with-performance]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:0533118bfe4bc1613fa4ad70be352ea134e49b898e0826b3c39d410f9aeec8d2
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[performance-lane]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[performance-lane]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:e9f6b29a1d51bef63da0f1962cb8f346bfbc63a9be1b08a1f9633e55ce388865
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[performance-isolated]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `commands[performance-isolated]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:b7e1fcb9bc2b2c35bbc4c75828720405339f465b6bb5608e1451db99824c38b2
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:writeScope[docs/specs/**]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[docs/specs/**]` (superseded-by)
canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 0). Assent to `superseded-by writeScope[.kiro/specs/**]`, which renders as `specs/**`. It covers the re-pointed summary location, `specs/[spec]/task-N-summary.md`.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[docs/specs/**]` (no-consumer-counterpart; no-consumer-counterpart)
> canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
> renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
> verdict: assent — surviving 0/0
>
> No consumer counterpart, confirmed: this entry names this repo's own write path. I assent that nothing survives.

## `#frontmatter:writeScope[.github/workflows/lane-timing.yml]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.github/workflows/lane-timing.yml]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:ace15778cda93bf6a09a8ef9992347ede436f4c1eed2033fb680d776a97b0faf
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own write path. I assent that nothing survives.

## `#frontmatter:writeScope[.github/in-lane-guards.json]`

signer: stacy
date: 2026-10-20
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.github/in-lane-guards.json]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:579d3495739862a0f62b7fd4b572c3f843f5c07f1f608edc87e7b41abb83a20f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 2). `.github/in-lane-guards.json`: the glob added by ballot `2026-10-20-in-lane-guard-registry-additive-entries` (P1b) so the steward may add entries to DesignerPunk's in-lane guard registry. The file is read only by this repo's `lane-functional-root` check against its `EXPECTED_CONTEXTS`; a consumer repo has no such registry and no CI-regime standing scope, so there is no copy to own. It is the same ground as `writeScope[.github/workflows/lane-timing.yml]`. The row's renderedHash is the empty-span hash (0 pieces, fresh render and committed rendering agree). I assent that nothing survives.

## `#frontmatter:writeScope[scripts/completion-claims/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/completion-claims/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:afcd81bdec54ba0b6c48b9e65c7dca385fa0c9cf572973261d3d1166debeea9c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/completion-claims/**`: This repo's `completion-criteria-parity` checker modules and their fixtures. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/check-completion-criteria-parity.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/check-completion-criteria-parity.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:28cf50f2a38be6e471b6a63c693f262ad8a674c13917d476e08991121f096d60
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/check-completion-criteria-parity.ts`: The CLI of this repo's `completion-criteria-parity` check. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/discovery-dry-run.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/discovery-dry-run.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:d21b4a559c2cc5fdff0fa24ef1b7687b984ab7130746bd094d196f0af1a9a759
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/discovery-dry-run.ts`: Spec 119-A's discovery dry-run runner. It is a thin CLI over a core in `mcp-server/src/discovery-dry-run/`, which ships read-only inside `mcp-server/src/`. This wrapper is not in the package's `files`. A change to either goes upstream. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/discovery-study-stage1.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/discovery-study-stage1.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:0c8deb64b399577ab1e343c88777539ba6a0f2679e2e938cfa2805512421eb41
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/discovery-study-stage1.ts`: A temporary instrument of this repo's discovery study, retiring with the study. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/discovery-indexer-fix-run.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/discovery-indexer-fix-run.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:b8994eafb26a49da187041bb9189bf068a640ba0aae783775475428e1b2d6103
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/discovery-indexer-fix-run.ts`: A temporary runner for this repo's indexer-fix findings, retiring with them. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/governance-check.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/governance-check.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:1210503bd3a034ff1baa3116cf63471211dbb9f1544244cbc38cf15f91e176ff
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/governance-check.sh`: This repo's Civitas health-check script. It is not in the package's `files`, so a consumer has no copy to own. A consumer-Thurgood keeps a health cadence over their own corpus with their own tooling; this script is not that tooling. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/validate-steering-metadata.js]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/validate-steering-metadata.js]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:1f680a36af98ffa2e1d1babb55d20e979fd2ce977a2afd7471d61d7ab51f3f0e
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/validate-steering-metadata.js`: This repo's steering-corpus tooling (steering metadata validation). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/detect-stale-metadata.js]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/detect-stale-metadata.js]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:ed3bc7603a81e3309a2734bd9bab4b49f11971669b2c751d3790b1efa0fc7718
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/detect-stale-metadata.js`: This repo's steering-corpus tooling (stale-metadata detection). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/detect-affected-steering-docs.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/detect-affected-steering-docs.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:43835ba436ebb32e5a5a127ae2316bbfc405c8da5ca15cd8c8deeaae67de024f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/detect-affected-steering-docs.sh`: This repo's steering-corpus tooling (which steering docs a change affects). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/verify-prompt-alignment.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/verify-prompt-alignment.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:773743bed221e6265942e7ee021675ebac9b8a1265edadbee90a310e6e505462
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/verify-prompt-alignment.sh`: This repo's prompt-to-steering alignment check over its own agent prompts. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/scan-cross-references.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/scan-cross-references.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:9f831c7977a45264889b95a3479ee2101eb30d4ecbf3abdec247f274a0163842
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/scan-cross-references.sh`: This repo's steering-corpus tooling (cross-reference scan). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/validate-cross-reference-format.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/validate-cross-reference-format.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:109d2de63ebf8147f45e93211e3a77ff28e41e74ffd691ee515d35dc609cff2c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/validate-cross-reference-format.sh`: This repo's steering-corpus tooling (cross-reference format check). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/check-id-uniqueness.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/check-id-uniqueness.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:1961949575888eb0a402b3525722e259fe122ea7802eb41514eaca1779774af0
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/check-id-uniqueness.ts`: The CI leg of Spec 119-A's doc `id` uniqueness guard. It is a thin CLI over a core in `mcp-server/src/id-guard/`, which ships read-only inside `mcp-server/src/`. This wrapper is not in the package's `files`. A change to either goes upstream. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/check-section-citations.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/check-section-citations.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:f8b5fbf02311a092ef05f483b41da057fed2e7f1a4c32552337498788ceb744d
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/check-section-citations.ts`: This repo's dead-citation guard over its steering corpus (register row `section-citation-resolution`). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/backfill-doc-ids.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/backfill-doc-ids.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:5d2b009a01e4b149661ab96d8f977335fd602bef3340da67cc115dd5de9b32b6
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/backfill-doc-ids.ts`: Spec 119-A's one-time `id` backfill codemod over this repo's docs. It is a thin CLI over a core in `mcp-server/src/id-guard/`, which ships read-only inside `mcp-server/src/`. This wrapper is not in the package's `files`. A change to either goes upstream. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/validate-metadata-parsing.js]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/validate-metadata-parsing.js]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:e7a8ae19a6fd27a00444ecdd4070f220eb41b500629934d403f9100db70425e3
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/validate-metadata-parsing.js`: This repo's steering-corpus tooling (metadata parsing check). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/validate-structure-parsing.js]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/validate-structure-parsing.js]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:deb78e7a7bce1e1d4a815d53b6d9c017a97f132f3949a41460067a021e9a6e63
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/validate-structure-parsing.js`: This repo's steering-corpus tooling (structure parsing check). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/validate-task-vocabulary.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/validate-task-vocabulary.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:6686f8e25c4f944d6b99345cf03b35e86bf9c7e48fb5e64cf9f959fc1f46958b
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/validate-task-vocabulary.sh`: Checks task type names in this repo's metadata analysis against its standard vocabulary. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/add-metadata-to-file.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/add-metadata-to-file.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:f9c7f6a93076b149a293d07e50fd9038e883ab4b2f6542e916d28b6a16b6f13b
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/add-metadata-to-file.sh`: This repo's steering-corpus tooling (adds metadata headers). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/analyze-metadata.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/analyze-metadata.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:f75c39ed23cb56476713050772d6386eeb2cd845fed1f83231e5a100408b1583
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/analyze-metadata.sh`: This repo's steering-corpus tooling (metadata analysis). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/extract-doc-structure.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/extract-doc-structure.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:e92a946a26d74c3d79f227a234e084dd1a29fdef8cafb26ae2755d5beb21776e
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/extract-doc-structure.sh`: This repo's steering-corpus tooling (document structure extraction). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/find-duplicate-content.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/find-duplicate-content.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:52c2f199d809e5804b8923a61957e357c504f339721ab97ec517b557d5b6d1fd
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/find-duplicate-content.sh`: This repo's steering-corpus tooling (duplicate-content scan). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/consolidate-structure-maps.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/consolidate-structure-maps.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:4c00883a64e03965146ff2dd6d17fe4a4ff47f4bb8069435c629ec8d9cbf1335
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/consolidate-structure-maps.sh`: This repo's steering-corpus tooling (consolidates structure maps). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/convert-date-formats.js]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/convert-date-formats.js]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:1005f0a5ae488d3895b8afb7184c7e12b78d454d68bd53022c1a2c46461b93b7
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/convert-date-formats.js`: This repo's steering-corpus tooling (converts steering dates to ISO 8601). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/calculate-baseline-metrics.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/calculate-baseline-metrics.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:a014a70ce6962a70c7969e638617a6f96e20106e1104189dc4036b0a3773924c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/calculate-baseline-metrics.sh`: This repo's steering-corpus tooling (baseline metrics). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/generate-legacy-path-manifest.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/generate-legacy-path-manifest.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:1832303295edbc3e15159fca3b1656e3c4b0e65a472166005207aa0e3f040d1b
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/generate-legacy-path-manifest.ts`: Spec 119-A's legacy-path forwarding manifest producer. It is a thin CLI over a core in `mcp-server/src/legacy-path/`, which ships read-only inside `mcp-server/src/`. This wrapper is not in the package's `files`. A change to either goes upstream. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/relocation-integrity-gate.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/relocation-integrity-gate.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:3ac3948c74f411c8057bd8bb87ed35834a1e60467326672045725580c66c5c17
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/relocation-integrity-gate.ts`: Spec 119-A's relocation exit check. It is a thin CLI over a core in `mcp-server/src/relocation-integrity-gate/`, which ships read-only inside `mcp-server/src/`. This wrapper is not in the package's `files`. A change to either goes upstream. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/derive-install-doc.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/derive-install-doc.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:900677d7778004a896a1540672c57ec446015cca16ecf9f55cd7970a4f59ef59
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/derive-install-doc.ts`: Derives `docs/consumer/INSTALL.md` from the Integration Guide's install region. The output ships in `files`; the script does not. A consumer reads the install doc and has no derivation to run. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/categorize-tests.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/categorize-tests.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:7c037f5b278d0912307f1050de0d2e01d96afe1b2c1883afad86b6c02b74623a
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/categorize-tests.ts`: Adds categorization metadata to this repo's test files. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[mcp-server/src/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[mcp-server/src/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:4f060ca19a04f17876ecfe817a34c0b9592b7fa778339aba0cb4ef6ce6277b57
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `mcp-server/src/**`: The docs MCP source. It **does** reach a consumer, read-only: `mcp-server/src/` is in the package's `files`, and the server also ships bundled as `dist/mcp/docs-mcp.js`. A consumer serves their corpus through it but does not edit it; a change goes upstream. Write scope over it has no consumer counterpart. I assent that nothing survives.

## `#frontmatter:writeScope[mcp-server/tests/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[mcp-server/tests/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:d725e6f969cac32cc51ceda1afe932ba8ff18ed6ab0508ca01dfd2758d28b9e9
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `mcp-server/tests/**`: The docs MCP's integration, performance and property suites. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[mcp-server/docs/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[mcp-server/docs/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:3018560de137a497460b54bce876e9122c027ce7f82f227434ecfd9b981e3f02
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `mcp-server/docs/**`: The docs MCP's internal report (`empirical-validation-report.md`). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[mcp-server/README.md]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[mcp-server/README.md]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:f9fbc81bf5f105a625e0cf4fc66768e010ccc1221eb52c85dc589e9131c06c1f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `mcp-server/README.md`: The docs MCP's README. Only `mcp-server/src/`, `package.json` and `tsconfig.json` are in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/complete-task.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/complete-task.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:fa577ec2fbf4294a207c5a4960d23a7c170b662d257461f284e8a8d230244927
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/complete-task.sh`: This repo's PR-flow completion tooling. It is not in the package's `files`, so a consumer has no copy to own, and `init` writes no hooks. A consumer's completion flow is their own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/README.md]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/README.md]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:4fc9b1ec1212465aff48907071295a5e5f1c79ba2266abe60fda36e7c31c9610
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/README.md`: The README of this repo's hooks directory. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/task-completion-agent-hook.md]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/task-completion-agent-hook.md]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:2296313dccdce6014ad3579f601b8601ffbd858a6a61c50c63d25c0bacbb7e4b
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/task-completion-agent-hook.md`: Legacy completion tooling of this repo's old commit flow, owned only to retire it (§ 2.4; the second-walk retirement trigger). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/commit-task.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/commit-task.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:44d4aef7298ae5397652831e48359bcdd981eed6196e5d56c911cc7abc7874e9
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/commit-task.sh`: Legacy completion tooling of this repo's old commit flow, owned only to retire it (§ 2.4; the second-walk retirement trigger). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/commit-task-organized.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/commit-task-organized.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:bca8f8e9f64edacebc8f315ba14b225dd29595ceccadfa9d952d2634b486e087
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/commit-task-organized.sh`: Legacy completion tooling of this repo's old commit flow, owned only to retire it (§ 2.4; the second-walk retirement trigger). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/task-completion-commit.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/task-completion-commit.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:da886e40f6f8207e638b77a6dce49e6968722abeed259dcab741005b8fdbff3e
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/task-completion-commit.sh`: Legacy completion tooling of this repo's old commit flow, owned only to retire it (§ 2.4; the second-walk retirement trigger). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/organize-after-completion.kiro.hook]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/organize-after-completion.kiro.hook]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:c7b587af5b1217bd8332e1a267571232d4c054ed8a1e54c7394f58f14fcedf95
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/organize-after-completion.kiro.hook`: Legacy completion tooling of this repo's old commit flow, owned only to retire it (§ 2.4; the second-walk retirement trigger). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/organize-by-metadata.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/organize-by-metadata.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:a5e83c13216be03c633f4ca93949d0c0de63629e0b964e2c96dd648324bb5f91
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/organize-by-metadata.sh`: Legacy completion tooling of this repo's old commit flow, owned only to retire it (§ 2.4; the second-walk retirement trigger). It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/archive/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/archive/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:dd00f6b6ff4bc44f87d3276c097ad0a68b2606dfb8387c839291dec2d9458fc9
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/archive/**`: This repo's retired hooks. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/hooks/thurgood-*.kiro.hook]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/hooks/thurgood-*.kiro.hook]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:daf196badc1ed1268c7eae9322daa78d07f54c667238e7fd80f2da266b0f8084
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `.kiro/hooks/thurgood-*.kiro.hook`: This repo's Kiro audit hooks for the steward seat. It is not in the package's `files`, so a consumer has no copy to own, and `init` writes no hooks. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/issues/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[.kiro/issues/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:da4495fd22d50dccd4d3a7df6a11f943bb2e7a4bb57d21ccb8131f388be1768f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite. `.kiro/issues/**` is this repo's issue records, walked at its monthly health check under README rules 1–9, and rule 9 makes an out-of-rule edit a claims-pass finding. Those are our stewardship cadence and instruments as obligations (subtraction 3). `init` creates no `.kiro/issues/` and the package ships none, so there is nothing to re-point to. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/diff-guard.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/diff-guard.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:addf95a5d64c5b351236b73bac3f5fe28a90ed048b4a22d6f2f545b67e8a4877
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/diff-guard.ts`: This repo's generator diff guard (the `122-diff-guard` check). It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/canonical-vs-truth.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/canonical-vs-truth.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:9ce0b192dae5ac78261ef39474a3d3e1af17b1d737b737afb752abac20241f12
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/canonical-vs-truth.ts`: This repo's canonical-vs-truth check. It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/coverage-map.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/coverage-map.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:577f215827354f05ee4bbe95476b3b38696878237bddedf0c156691e00615a88
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/coverage-map.ts`: This repo's coverage-of-coverage audit. It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/sweeps/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/sweeps/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:622a75d6a7e394a52a8d819cfc6cb4e68ec0c4d4855927a3de800192dfb030b9
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/sweeps/**`: This repo's generator sweeps. It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/verify-gate-registration.sh]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/verify-gate-registration.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:21749fc39b1084099920ffe85a1ef554745a94fd314584ca7584507e76d47739
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/verify-gate-registration.sh`: This repo's check that its required contexts are still registered on its PR gate. It is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/workflow-rules-guard.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/workflow-rules-guard.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:783768fe7f359641522f5e450244e5725bd26239927bbb4c57307defddcee072
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/workflow-rules-guard.ts`: The WORKFLOW_RULES wiring and anti-duplication guard. It **does** reach a consumer, read-only: it is inlined into the shipped `dist/generator/consumer-entry.js` (`dist/generator/**` is in `files`), and the consumer runs it as part of the installed generator. There is no source in the consumer's repo to write; a change goes upstream. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/child-process-guard.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/child-process-guard.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:02157d1d0aca5416f12ea126613bb9f4b99f157c40d838b3b696e7a2f94f28ac
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/child-process-guard.ts`: The lifetime guard for the steward harness's spawned MCP servers. It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/regrounding/verify-signing-chain.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/regrounding/verify-signing-chain.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:4e5594feda006fde7bbc18363eda5a2f751130bd16cd8059139d148b61c5aa65
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/regrounding/verify-signing-chain.ts`: This repo's signing-chain verifier. It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/regrounding/signatures.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/regrounding/signatures.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:b87961f74d649f0a9fc83033928553112eec105142e184e37d84096be7c38f21
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/regrounding/signatures.ts`: The signature format and its checks. It **does** reach a consumer, read-only: it is inlined into the shipped `dist/generator/consumer-entry.js` (`dist/generator/**` is in `files`), and the consumer runs it as part of the installed generator. There is no source in the consumer's repo to write; a change goes upstream. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/regrounding/c1.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/regrounding/c1.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:159909d41a3fbde20c34f579fa544ac5ed722d0b8ddc37f4ecc29450e61cf7e9
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/regrounding/c1.ts`: The C1 seat function. The consumer entry imports it, but it is tree-shaken out: it contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/regrounding/freshness.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/regrounding/freshness.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:247dbed09d247a386ffdd8f982db5366b2e965cf3c7db86e71688c34c785dbbe
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/regrounding/freshness.ts`: This repo's operative-set freshness sweep. It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/regrounding/check-catalog.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/regrounding/check-catalog.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:5e3d0c4bc66f94cbb39653fe1270ed40adb2e353e2740bd46669ae9344e14028
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/regrounding/check-catalog.ts`: The registry of the nine re-grounding refusals. It **does** reach a consumer, read-only: it is inlined into the shipped `dist/generator/consumer-entry.js` (`dist/generator/**` is in `files`), and the consumer runs it as part of the installed generator. There is no source in the consumer's repo to write; a change goes upstream. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/regrounding/triviality.ts]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/regrounding/triviality.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:a3cb250a87f41d8f0b586c84723c1eab4de3d6982be4153249f0ca189ea9556f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/regrounding/triviality.ts`: This repo's triviality floor. It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#frontmatter:writeScope[tools/agent-generator/__fixtures__/stale-unit/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[tools/agent-generator/__fixtures__/stale-unit/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:0ec963d1fcfd7d3d738db6c87bd20cf1977ce0e3b270a492330998d14a71beab
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `tools/agent-generator/__fixtures__/stale-unit/**`: The stale-unit fixture of this repo's freshness tests. It contributes no code to the shipped `dist/generator/consumer-entry.js` and is not in the package's `files`, so a consumer has no copy to own. I assent that nothing survives.

## `#the-q5-boundary-execution-claims-verification-is-stacys:preamble`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#the-q5-boundary-execution-claims-verification-is-stacys:preamble` (re-pointed)
canonicalHash: sha256:0cfc85cf5a6e9680bf8b9a0f82af9fa56d6ea1d139ff132a4a24edf8341f6886
renderedHash: sha256:03068d533336a7e647c8ba2778306de9340f03470411ade3fc36d2c33bbbcdaf
verdict: assent — surviving 1/1

**Re-signed 2026-09-29, in the re-sign run** (prior signature: refuse). **Refusal resolved.** `authority-precedence` now survives: "where this text and that recorded decision disagree, the decision governs".

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · body · `#the-q5-boundary-execution-claims-verification-is-stacys:preamble` (re-pointed; ROUTED)
> canonicalHash: sha256:0cfc85cf5a6e9680bf8b9a0f82af9fa56d6ea1d139ff132a4a24edf8341f6886
> renderedHash: sha256:e6fe38dba2350bc75397a54d45ac199fa7e40d5095d35ce973966a2afb814185
> verdict: refuse: should-re-point
>
> `authority-precedence` (the co-signed documents govern where this text and they disagree) has a consumer counterpart, and the rendering drops it. The rendering names the authority ("your team's own decision to run claims audits, recorded where your team records such decisions") but not its precedence over this text. **Should re-point**: where this text and that recorded decision disagree, the decision governs. The pointer to the co-signed documents is repo-bound; the precedence rule is not.

## `#frontmatter:writeScope[scripts/issues-owned.sh]`

signer: stacy
date: 2026-10-21
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/issues-owned.sh]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:20a312e01fe45da7c36b8ced6634065ad4e9f91e6585b11baf4cf89cdcc870f5
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/issues-owned.sh`: the owner's session-start command (`./scripts/issues-owned.sh <Seat>`), a repo-internal script. Added to the charter's write scope by ballot `2026-10-20-manual-records-routed-readers` (RATIFIED, Peter, 2026-10-20) F-1 (a), so the steward may author the owner's session-start read (Thurgood, `fadc095e4`). It reads this repo's root `.kiro/issues/` records and `origin/main`, and is not in the package's `files`, so a consumer has no copy to own. 0 rendered pieces (fresh temp-tree rendering as above, 113 of 113 byte-identical), so the renderedHash is the empty-span hash. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/__tests__/issues-owned.test.ts]`

signer: stacy
date: 2026-10-21
row: `canonical/profiles/consumer/thurgood.dispositions.yaml` · frontmatter · `writeScope[scripts/__tests__/issues-owned.test.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:957cd6438338999dd33e7079983e3d719d53b18bc3b688698f95528fc62df62d
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/__tests__/issues-owned.test.ts`: the Jest file that tests that command (18 cases, including the offline and timeout fixtures). Added to the charter's write scope by ballot `2026-10-20-manual-records-routed-readers` (RATIFIED, Peter, 2026-10-20) F-1 (a), so the steward may author the owner's session-start read (Thurgood, `fadc095e4`). It reads this repo's root `.kiro/issues/` records and `origin/main`, and is not in the package's `files`, so a consumer has no copy to own. 0 rendered pieces (fresh temp-tree rendering as above, 113 of 113 byte-identical), so the renderedHash is the empty-span hash. I assent that nothing survives.
