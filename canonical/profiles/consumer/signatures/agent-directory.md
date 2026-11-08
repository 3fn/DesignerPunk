# Signatures — `agent-directory` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/agent-directory.dispositions.yaml`. **Signer**: Stacy. This is an identity doc with no domain owner, so she signs in the C1 carve-out seat: the profile author drafted it, and the counterpart seat signs.
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 2**, 2026-09-29, Spec 123 Task 15.5.

## `#primary-agent-orchestrator`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#primary-agent-orchestrator` (re-pointed; ROUTED)
canonicalHash: sha256:642bbb51f16d0e994f9678e54a7ad63dd3e5ae1f3ae73c03623bf024bc3c43cf
renderedHash: sha256:0cead21464b762aa9065f5181dee92430b1531773bcf02ac9d12d4088ec0648e
verdict: assent — surviving 9/9

All nine survive. The trigger surfaces are re-grounded to "your team's governance and shared docs, agent charters …", and re-pointing "Peter" → "your human lead" carries the same obligation.

## `#ada-rosetta-token-specialist`

signer: stacy
date: 2026-11-08
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#ada-rosetta-token-specialist` (re-pointed; ROUTED; first signature)
canonicalHash: sha256:3efb4e1d59b836719e3acc4747940fc53db7556ecaef4bb1d11c4785e110fd49
renderedHash: sha256:b1cc57f54479dcc29d2ed6a4c37d363ff3a4926c4bb8671d796d86f5aa7f8f12
verdict: assent — surviving 1/2; not surviving: `ada-rosetta-to-role-1`

**FIRST SIGNATURE 2026-11-08.** The row was `retained` until ballot `2026-11-07-native-lane-ownership` (RATIFIED, Peter, 2026-11-08T00:24:24Z; #748) site 9 (c) added a clause and a dated pointer to Ada's **Owns** line (L58). Thurgood made it `re-pointed` at `67de94640`, with two removals and an overlay unit; I re-confirmed the unit at 2 items in the same commit as this signature.
- **Judged against**: the consumer rendering of the unit, printed in full first (all three pieces identical), and the operative set at 2 items.
- **renderedHash**: computed from a fresh temp-tree rendering of this branch (`generateAll` → `writeOutputs(<scratchpad temp dir>)` → `readConsumerSpans` → `renderedHashOf` over `rowSpanSource`, three pieces: the `_canonical` always-set copy, the CC identity doc and the Kiro steering doc). It equals the committed rendering's value. The fresh `_consumer-output/` artifacts equal the committed ones (`diff -rq`); only this doc's three attribution sidecars differ, where this ballot's re-pointed units turn `op` from `passthrough` to `render`, which the profile author's regeneration commits. The render needed built MCP servers, so I copied the main checkout's ignored `dist/`, `mcp-server/dist/` and `application-mcp-server/dist/` into the worktree (their sources equal this branch's: `git diff c07951b38 5f8a2c600` touches two docs only) and removed them after. Nothing tracked was written.
- **The removals are right, and their cites stay right.** Each occurs once in the unit and in none of the three pieces (checked by script). The unit with both removals taken out equals the rendering, whitespace aside. The lane clause (`subtraction-1`) names harness paths a consumer does not have: `harness/` and `scripts/harness/` are not in the package's `files`, and the consumer output carries no `scripts/harness` or `harness/` path. The pointer (`subtraction-2`) is this repository's ballot history. The rendering is the line as it read before the ballot, byte for byte.
- **Credits**: `ada-rosetta-to-role-2` (**When to involve**) survives unchanged. `ada-rosetta-to-role-1` (**Owns**) is not credited: the item is the whole line, and the consumer line drops the harness clause with nothing in its place. This is the reading I gave `thurgood-test--role-1` for the same kind of clause. I assent that the drop is right: a consumer's Ada owns no harness.
- **C1 collapse**: I signed this assent on a row of Thurgood's shared doc in the counterpart seat, so it is in Peter's sample as Stacy-signed.

## `#thurgood-test-governance-spec-standards-civitas-steward`

signer: stacy
date: 2026-11-08
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#thurgood-test-governance-spec-standards-civitas-steward` (re-pointed; ROUTED)
canonicalHash: sha256:09451915f38ff6403ba828894314356e618ac2d6e3d925aca35c518bea0247e6
renderedHash: sha256:34ad033f3fe6cd10fb16d3e417c11407a17a25b280d3c766db4c2957f04ebb06
verdict: assent — surviving 3/4; not surviving: `thurgood-test--role-1`

**Re-signed 2026-11-08** (prior signature: assent — surviving 3/4; not surviving: `thurgood-test--role-1`, 2026-11-07, against canonical `sha256:f4c12c98bf64fbc344b80c8d27f5e10a82bf16d67001a9beae4d5d994b47d8e6`). Stale because Thurgood's **Owns** line changed under ballot `2026-11-07-native-lane-ownership` (RATIFIED, Peter, 2026-11-08T00:24:24Z; #748) site 9 (d): the compile-harness clause names `compare.ts` too ("stability script, rules module and comparator"), and the dated pointer is extended. Data applied it at `4be514236`; Thurgood rewrote the clause removal and the pointer removal and re-pinned the overlay at `67de94640`; I re-confirmed the unit at 4 items in the same commit as this signature. I checked that the re-pin changes only the `@unit` header line, to the hash I computed.
- **Judged against**: the consumer rendering of the unit, printed in full first, and the operative set at 4 items.
- **renderedHash**: computed from a fresh temp-tree rendering of this branch (`generateAll` → `writeOutputs(<scratchpad temp dir>)` → `readConsumerSpans` → `renderedHashOf` over `rowSpanSource`, three pieces: the `_canonical` always-set copy, the CC identity doc and the Kiro steering doc). It equals the committed rendering's value. The fresh `_consumer-output/` artifacts equal the committed ones (`diff -rq`); only this doc's three attribution sidecars differ, where this ballot's re-pointed units turn `op` from `passthrough` to `render`, which the profile author's regeneration commits. The render needed built MCP servers, so I copied the main checkout's ignored `dist/`, `mcp-server/dist/` and `application-mcp-server/dist/` into the worktree (their sources equal this branch's: `git diff c07951b38 5f8a2c600` touches two docs only) and removed them after. Nothing tracked was written. The value also equals the prior signature's renderedHash: the rendering did not move by a byte.
- **Removals, re-judged against the moved body.** All six occur once in the unit and in none of the three pieces (checked by script). The two rewritten ones quote the clause and the pointer as they stand now, with their cites unchanged (`subtraction-1`, `subtraction-2`).
- **Verdict unchanged**: assent, surviving 3/4. `thurgood-test--role-1` still does not survive: the consumer **Owns** line names neither the CI regime nor the harness.
- **C1 collapse**: in Peter's sample as Stacy-signed.

**Prior signature record (superseded, 2026-11-07)**: assent — surviving 3/4; not surviving: `thurgood-test--role-1`, against `sha256:f4c12c98bf64fbc344b80c8d27f5e10a82bf16d67001a9beae4d5d994b47d8e6`, as below.

**Re-signed 2026-11-07** (prior signature: assent — surviving 3/4; not surviving: `thurgood-test--role-1`, 2026-11-01, against canonical `sha256:d90b650ba35fa2ad3c2e707e595a6a7d9134aaa9480d813af59c707b26e58399`). Stale because Thurgood's **Owns** line changed. Ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` (RATIFIED, Peter, 2026-11-07T22:30:08Z) site 4: the CI-regime clause gains `merge-hold.yml`, a compile-harness clause follows it, and the line gains a dated pointer. Thurgood applied it at `a064ea06c`; I rewrote and added the removals and re-pinned the overlay at `f5e6a10a2`, and re-confirmed the set at 4 items at `db81c96d8`. renderedHash recomputed from a fresh temp-tree rendering of this branch (`generateAll` → `writeOutputs(<scratchpad temp dir>)` → `readConsumerSpans` → `renderedHashOf` over `rowSpanSource`, three pieces). It is equal to the committed rendering's value and to the prior signature's, and the fresh `_consumer-output/` tree equals the committed one (`diff -rq`: no differences). The rendering did not move by a byte.
- **Read before this act**: the consumer rendering of the unit, `cat -n canonical/_consumer-output/_canonical/always-set/agent-directory.md` L65–L78, through a tool call before this commit; `canonical/_consumer-output/` is unchanged on this branch since `e0df47b3f`. The `cc/` (L65–L78) and `kiro/` (L70–L83) copies were compared with it by `diff` and are identical.
- **Judged against**: the rendered unit at this revision and the operative set at 4 items.
- **Removals, re-judged against the moved body.** Each occurs once in the unit and in none of the three renderings (checked by script).
  - `subtraction-2`'s CI-regime text is rewritten to the clause as it stands now.
  - **Added**: the compile-harness clause (`subtraction-1`, repo-internal tooling); the 2026-11-07 pointer (`subtraction-2`); and the 2026-11-01 pointer on the "Charter cut" line (`subtraction-2`).
  - **The 2026-11-01 pointer is a correction of my own record.** My 2026-11-01 signature said the steward-verb drop "added no repository-only text to the unit". It added that pointer, which the rendering drops and which no removal accounted for. The rendering was right; my accounting was incomplete. It changes no verdict.
- **Verdict unchanged**: assent, surviving 3/4. `thurgood-test--role-1` still does not survive. The consumer **Owns** line names neither the CI regime nor the harness.
- **C1 collapse**: I signed this assent on a row of Thurgood's shared doc in the counterpart seat, so it is in Peter's sample as Stacy-signed.

**Prior signature record (superseded, 2026-11-01)**:

> signer: stacy
> date: 2026-11-01
> row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#thurgood-test-governance-spec-standards-civitas-steward` (re-pointed; ROUTED)
> canonicalHash: sha256:d90b650ba35fa2ad3c2e707e595a6a7d9134aaa9480d813af59c707b26e58399
> renderedHash: sha256:34ad033f3fe6cd10fb16d3e417c11407a17a25b280d3c766db4c2957f04ebb06
> verdict: assent — surviving 3/4; not surviving: `thurgood-test--role-1`
>
> **Re-signed 2026-11-01** (prior signature: assent — surviving 3/4; not surviving: `thurgood-test--role-1`, 2026-10-20, against canonical `sha256:99951e0293f59b5326e3e09be329d46fac3e14d8cc8b0c64fd3d797e0beba169` and rendered `sha256:701eb853779969dce6ed0f6a72ce375a3e0f91b06d71e5dd6ab9188317e88e9a`). *(This re-does `4b6fbbb66`, whose read claim was false. Erratum: `.kiro/issues/2026-11-01-stacy-c1-acts-read-claim-false.md`; re-cut under R11 line 18.)* It was stale because the canonical cut line lost its steward-toolset clause. That is the steward-verb drop, Thurgood `c9fb5300d`, under R5 fork 2 and R8 item 9; I re-confirmed the unit at 4 items at `8e84d59a0`.
> - **The rendering moved; read whole via `cat -n`** at `bdc0d9aaa`, before this commit: `canonical/_consumer-output/_canonical/always-set/agent-directory.md` L65–L78, `canonical/_consumer-output/cc/.claude/identity/designerpunk-agent-directory.md` L65–L78 and `canonical/_consumer-output/kiro/.kiro/steering/designerpunk-agent-directory.md` L70–L83. The overlay's "Charter cut" line drops the same clause.
>   - Each now reads "…, and the mechanical checks that enforce it — he does **not** adjudicate whether a particular execution claim was true".
>   - "steward toolset" occurs in none of them (checked by script).
> - **Hashes**:
>   - canonicalHash `sha256:d90b650ba35fa2ad3c2e707e595a6a7d9134aaa9480d813af59c707b26e58399`, recomputed independently; it equals the overlay pin and my confirmation.
>   - renderedHash `sha256:34ad033f3fe6cd10fb16d3e417c11407a17a25b280d3c766db4c2957f04ebb06`, recomputed with `readConsumerSpans` / `renderedHashOf` / `rowSpanSource` over the committed `canonical/_consumer-output/` (three pieces).
> - **Removals re-judged against the moved body**: the three stand unchanged (the instrument clause, the CI-regime standing scope and "(Q5, ratified 2026-09-17)"). Each still occurs in the unit and in none of the renderings. The drop added no repository-only text to the unit.
> - **Verdict unchanged**: assent, surviving 3/4. `thurgood-test-govern-1` survives as the narrower cut, verbatim apart from the consumer's dropped label. `thurgood-test--role-1` still does not survive.
**Prior signature record (superseded, 2026-10-20)**: assent — surviving 3/4; not surviving: `thurgood-test--role-1`, against `sha256:99951e0293f59b5326e3e09be329d46fac3e14d8cc8b0c64fd3d797e0beba169`, as below.

**Re-signed 2026-10-20** (prior signature: assent 3/4, 2026-09-29, against `sha256:3f53109f6af5f444299a6f76e65007a510b10470fc034e1554980b530c69fafb`). Stale because the canonical **Owns** line changed: ballot `2026-10-20-in-lane-guard-registry-additive-entries` (P1b; RATIFIED, Peter, 2026-10-20) site 3 added "and added entries in `.github/in-lane-guards.json`" and "amended 2026-10-20" to its CI-regime clause. Thurgood applied it at `ae68f130b`; I re-confirmed the set at 4 items (`8674be2e5`); he pinned the overlay and regenerated (`ebc83c6b5`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to the prior signature's.
- **Judged against**: the rendered unit at this revision and the operative set at 4 items.
- **`thurgood-test--role-1` still does not survive.** The clause is removed whole under `subtraction-2` (consumers have no CI-regime standing scope and no registry file); the removal's text was rewritten to the new clause (I checked it occurs once in the unit). The other two removals are unchanged. The consumer rendering still states the charter cut without the ratification date, and `role-1` drops the CI-regime scope with nothing in its place.
- **Unchanged from the 2026-09-29 signature**: `thurgood-test-govern-1`, `thurgood-test--role-2` and `thurgood-test--role-3` survive; `role-1` is not credited.
- **C1 collapse**: I signed this assent on a row of Thurgood's shared doc in the counterpart seat; it is in Peter's sample as Stacy-signed.

**Prior signature record (superseded, 2026-09-29)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#thurgood-test-governance-spec-standards-civitas-steward` (re-pointed; ROUTED)
> canonicalHash: sha256:3f53109f6af5f444299a6f76e65007a510b10470fc034e1554980b530c69fafb
> renderedHash: sha256:701eb853779969dce6ed0f6a72ce375a3e0f91b06d71e5dd6ab9188317e88e9a
> verdict: assent — surviving 3/4; not surviving: `thurgood-test--role-1`
>
> The charter cut survives without its ratification date. `role-1` (**Owns**) drops the CI-regime scope with nothing in its place, so it is not credited. The instrument is substituted by "the checks that enforce completion standards".

## `#kenya-ios-platform-engineer`

signer: stacy
date: 2026-11-08
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#kenya-ios-platform-engineer` (re-pointed; ROUTED; first signature)
canonicalHash: sha256:53af8b4593793e90539a90abe7ffaeda01d3a6c9c33507252bc29e0fccdc89d4
renderedHash: sha256:b60b2c47737b6d453fbcbab4707ab52e39bad1f6dc406a8f11dc6825d4896adf
verdict: assent — surviving 1/2; not surviving: `kenya-ios-plat-role-1`

**FIRST SIGNATURE 2026-11-08.** The row was `retained` until ballot `2026-11-07-native-lane-ownership` (RATIFIED, Peter, 2026-11-08T00:24:24Z; #748) site 9 (b) added a clause and a dated pointer to Kenya's **Owns** line (L114). Thurgood made it `re-pointed` at `67de94640`, with two removals and an overlay unit; I re-confirmed the unit at 2 items in the same commit as this signature.
- **Judged against**: the consumer rendering of the unit, printed in full first (all three pieces identical), and the operative set at 2 items.
- **renderedHash**: computed from a fresh temp-tree rendering of this branch (`generateAll` → `writeOutputs(<scratchpad temp dir>)` → `readConsumerSpans` → `renderedHashOf` over `rowSpanSource`, three pieces: the `_canonical` always-set copy, the CC identity doc and the Kiro steering doc). It equals the committed rendering's value. The fresh `_consumer-output/` artifacts equal the committed ones (`diff -rq`); only this doc's three attribution sidecars differ, where this ballot's re-pointed units turn `op` from `passthrough` to `render`, which the profile author's regeneration commits. The render needed built MCP servers, so I copied the main checkout's ignored `dist/`, `mcp-server/dist/` and `application-mcp-server/dist/` into the worktree (their sources equal this branch's: `git diff c07951b38 5f8a2c600` touches two docs only) and removed them after. Nothing tracked was written.
- **The removals are right, and their cites stay right.** Each occurs once in the unit and in none of the three pieces (checked by script). The unit with both removals taken out equals the rendering, whitespace aside. The lane clause (`subtraction-1`) names harness paths a consumer does not have: `harness/` and `scripts/harness/` are not in the package's `files`, and the consumer output carries no `scripts/harness` or `harness/` path. The pointer (`subtraction-2`) is this repository's ballot history. The rendering is the line as it read before the ballot, byte for byte.
- **Credits**: `kenya-ios-plat-role-2` (**When to involve**) survives unchanged. `kenya-ios-plat-role-1` (**Owns**) is not credited: the item is the whole line, and the consumer line drops the harness clause with nothing in its place. This is the reading I gave `thurgood-test--role-1` for the same kind of clause. I assent that the drop is right: a consumer's Kenya owns no harness.
- **C1 collapse**: I signed this assent on a row of Thurgood's shared doc in the counterpart seat, so it is in Peter's sample as Stacy-signed.

## `#data-android-platform-engineer`

signer: stacy
date: 2026-11-08
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#data-android-platform-engineer` (re-pointed; ROUTED; first signature)
canonicalHash: sha256:ed0f3918ff55d8e359f6d019874093984b1628c88ca014a37b4ab2333d06295d
renderedHash: sha256:acefeb7283e74b64f3756557d8630985283e4c61b7911c657ad413ed7ea49492
verdict: assent — surviving 1/2; not surviving: `data-android-p-role-1`

**FIRST SIGNATURE 2026-11-08.** The row was `retained` until ballot `2026-11-07-native-lane-ownership` (RATIFIED, Peter, 2026-11-08T00:24:24Z; #748) site 9 (a) added a clause and a dated pointer to Data's **Owns** line (L122). Thurgood made it `re-pointed` at `67de94640`, with two removals and an overlay unit; I re-confirmed the unit at 2 items in the same commit as this signature.
- **Judged against**: the consumer rendering of the unit, printed in full first (all three pieces identical), and the operative set at 2 items.
- **renderedHash**: computed from a fresh temp-tree rendering of this branch (`generateAll` → `writeOutputs(<scratchpad temp dir>)` → `readConsumerSpans` → `renderedHashOf` over `rowSpanSource`, three pieces: the `_canonical` always-set copy, the CC identity doc and the Kiro steering doc). It equals the committed rendering's value. The fresh `_consumer-output/` artifacts equal the committed ones (`diff -rq`); only this doc's three attribution sidecars differ, where this ballot's re-pointed units turn `op` from `passthrough` to `render`, which the profile author's regeneration commits. The render needed built MCP servers, so I copied the main checkout's ignored `dist/`, `mcp-server/dist/` and `application-mcp-server/dist/` into the worktree (their sources equal this branch's: `git diff c07951b38 5f8a2c600` touches two docs only) and removed them after. Nothing tracked was written.
- **The removals are right, and their cites stay right.** Each occurs once in the unit and in none of the three pieces (checked by script). The unit with both removals taken out equals the rendering, whitespace aside. The lane clause (`subtraction-1`) names harness paths a consumer does not have: `harness/` and `scripts/harness/` are not in the package's `files`, and the consumer output carries no `scripts/harness` or `harness/` path. The pointer (`subtraction-2`) is this repository's ballot history. The rendering is the line as it read before the ballot, byte for byte.
- **Credits**: `data-android-p-role-2` (**When to involve**) survives unchanged. `data-android-p-role-1` (**Owns**) is not credited: the item is the whole line, and the consumer line drops the harness clause with nothing in its place. This is the reading I gave `thurgood-test--role-1` for the same kind of clause. I assent that the drop is right: a consumer's Data owns no harness.
- **C1 collapse**: I signed this assent on a row of Thurgood's shared doc in the counterpart seat, so it is in Peter's sample as Stacy-signed.

## `#stacy-product-governance-quality-assurance-execution-claims-verification`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#stacy-product-governance-quality-assurance-execution-claims-verification` (re-pointed; ROUTED)
canonicalHash: sha256:99500e6e909a023dbcffd8b50438bcbbb45583cadd6f599357d31273628030b2
renderedHash: sha256:5efc12c923a652b126e28edde0dedd55217e0f212e82a1038375728edbe3b498
verdict: assent — surviving 2/3; not surviving: `stacy-product--role-1`

The charter cut survives without its date. `role-1` drops ARMING from the firing events, so it is not credited. This is consistent with my run-1 trigger-set read, where ARMING is repo-bound. This unit describes my seat, and it is disclosed.

## `#human-lead`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#human-lead` (re-pointed; ROUTED)
canonicalHash: sha256:b5cf76cd151486e6e3bf7c8c7a7815b10f9729ea9fbd631a3d3c4df086bea0a6
renderedHash: sha256:6e03c7c59360a25a63dc3e535443b381eec065b0b780591ddcc2dcd9784e418d
verdict: assent — surviving 4/4

"Peter Michaels Allen" → "Your human lead". All four survive.
