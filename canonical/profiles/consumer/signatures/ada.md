# Signatures — `ada` (C1, owner seat)

**Dispositions**: `canonical/profiles/consumer/ada.dispositions.yaml` · **Record**: `canonical/operative-sets/ada.yaml` (confirmed at 15.5 phase one, `4c3835eb`)
**Rendering judged**: `canonical/_consumer-output/_canonical/agents/ada.md`. The `cc/` and `kiro/` copies carry the same body.
**Signer**: **Ada**. Under C1 the owner signs her own charter's routed and no-consumer-counterpart rows.
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase two · hashes from the sheet regenerated at `60b0fdb5`

**The rule applied (Req 11.6.5e)**: an item survives IFF every consumer implementation that complies with what **this unit's own rendering** states also complies with the item.
- The item is read with its repo-bound referents re-keyed to the consumer's repo (for example `Peter` → "your human lead").
- A function that survives only in another unit is not credited here.
- `surviving` lists exactly the entailed ids, in record order.

**A no-consumer-counterpart assent** (`surviving: []`) says two things: the entry has no consumer counterpart, and its function does not survive re-grounded elsewhere in the consumer rendering. Where a function DOES survive elsewhere, I refuse instead, because 11.6.5e says such a row takes `superseded-by` or `re-pointed`, never an absence.

**Referent widening (step 1): none.** All four § 3 candidates are ruled below, under their units:
- `shared-layer-not-unilateral` and `jest-not-vitest` are known false positives.
- `practice-all-changes`: "This" is the three sibling bullets, which are themselves items.
- `counter-provide`: it leads into illustration, not a referent.

## `#identity`

signer: ada

**ASSENT — surviving 5/5.**
- `ada-role`: "for DesignerPunk" is re-keyed to "for this design system — the token language this repo was born with from DesignerPunk, and every token your team adds to it". Same role; entailed.
- `ada-domain`: verbatim.
- `ada-handoff`: the roster is verbatim, and "recommend Peter" becomes "recommend your human lead". Entailed.
- `ada-human-decides`: "Peter is the human lead. He makes final decisions." becomes "Your human lead makes final decisions." Entailed.
- `ada-partner`: "You are their partner, not their tool." Entailed.
- **Fit**: the roster names Lina and Thurgood, and both routes are retained in the consumer frontmatter, so the hand-off targets exist.

## `#in-scope`

signer: ada

**RE-SIGNED 2026-09-29 — ASSENT, surviving 13/13** (stale; renderedHash now `sha256:6209aa1c…`).
- **What changed**: `scope-docs` now reads "Token documentation — your team's token docs; DesignerPunk's Token-Family and Rosetta architecture docs ship in the installed package (read them there; changes to them go upstream to DesignerPunk)". That is the re-pointing my phase-two observation asked for.
- The item "Token documentation (Token-Family docs, Rosetta architecture)", re-keyed to the consumer, is entailed. Documentation of the team's tokens is in scope, and the shipped docs are placed correctly: read locally, changed upstream.
- The other twelve bullets are unchanged from the phase-two judgment:
  - eleven are verbatim;
  - `scope-theme-registry` and `scope-pipeline-config` are re-keyed and entailed.

## `#boundary-cases`

signer: ada

**ASSENT — surviving 3/3.** "Recommend Peter coordinate" becomes "Recommend your human lead coordinate". The other two duties are verbatim.

## `#trust-by-default`

signer: ada

**ASSENT — surviving 3/3.** `trust-human` is re-keyed from Peter to "your human lead's final decisions". `trust-lina` and `trust-thurgood` are verbatim.

## `#obligation-to-flag`

signer: ada

**ASSENT — surviving 3/3.** `flag-impact` is re-keyed from Peter to "your human lead". The other two are verbatim.

## `#graceful-correction`

signer: ada

**ASSENT — surviving 3/3.** `correction-engage` is re-keyed from Peter to "your human lead". The other two are verbatim.

## `#what-this-means-in-practice`

signer: ada

**RE-SIGNED 2026-09-29 — ASSENT, surviving 5/5** (stale; renderedHash now `sha256:901f97a1…`).
- **What changed**: `practice-no-write`'s bullet gains "…and you change your team's shared docs only through this process". That is the scoping clause Lina's and Thurgood's renderings carry.
  - It strengthens the entailment of `practice-no-write`, re-keyed as "never write the shared governance layer": the shipped docs and identity files are forbidden, and the team's shared docs change only via the ballot.
- `practice-no-edit-docs`, `practice-propose`, `practice-all-changes` and `practice-ambient-law`: unchanged from the phase-two judgment, and entailed.

## `#mcp-practice-notes`

signer: ada

**ASSENT — surviving 3/4.**
- `rebuild-after-write`: verbatim.
- `rebuild-application`: now carries "(after `npx designerpunk generate`)". That is the consumer's generate step, so the route is re-keyed, not changed. Entailed.
- `mcp-fallback`: verbatim.
- **`rebuild-docs` does not survive**: the rendering drops the docs-MCP route.
  - That is correct for a consumer. The docs corpus is package-owned (`mcp-server/src/index.ts`, "PACKAGE-OWNED"), so a consumer never edits the content the docs index serves.
  - The removal is accounted (subtraction-3), so there is no refusal.

## `#when-you-and-peter-disagree`

signer: ada

**ASSENT — surviving 1/1.** Peter is re-keyed to "your human lead" in both the heading and the body.

## `#what-you-dont-own`

signer: ada

**ASSENT — surviving 2/3.**
- `not-own-contract-tests` and `not-own-audits`: verbatim.
- **`jest-not-vitest` is not credited.** Re-keyed, it says: use the project's actual runner, never another runner, and never another runner's flags. The rendering says: "Run token tests with your repo's own test runner and scripts — read them from its `package.json` before you run anything."
  - That entails the runner choice.
  - It does not entail the flag clause: an implementation that obeys it can still pass a foreign flag (e.g. `--run`) to its own runner.
  - Items are atomic, so partial survival is not survival. The lost clause is a DesignerPunk-specific idiom, and its removal is accounted (subtraction-1). The rendering is right for a consumer, so there is no refusal.
- **Not an item**: the pointer "Your test commands … are in the Commands section." It is removed with the rest of the sentence.

## `#frontmatter:routes.docs[completion-doc-guidance]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).**
- The route targets `completion-documentation-guide`, which is DesignerPunk's own completion-doc law. The doc does ship in the package corpus, but it does not govern the consumer.
- The consumer's rendered Task Completion Protocol is self-contained: its completion-doc elements and tiers are inline, and nothing points to the guide.
- The route's function (depth on DesignerPunk's two-document workflow) has no consumer counterpart. The disposition is uniform across all seven agents that carry this route.

## `#frontmatter:routes.docs[dev-workflow-detail]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).** `process-development-workflow` is DesignerPunk's development-workflow law. The consumer's workflow law is its rendered always-set, which never routes here.

## `#frontmatter:routes.docs[file-organization]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).**
- `process-file-organization` governs DesignerPunk's own file layout, which a consumer repo does not share.
- Side note, not this row: the consumer's rendered `always-set/civitas-system-overview.md` line 92 still says "see Process-File-Organization". It is flagged in the summary for the profile author.

## `#frontmatter:routes.cues[6]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).**
- The cue is "changed governance/token-family docs → docs MCP `rebuild_index`". A consumer does not change the docs the docs MCP serves, because the corpus is package-owned.
- This is the same judgment as `rebuild-docs` under `#mcp-practice-notes`.

## `#frontmatter:commands[validator-tests]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).** `src/validators/**` does not ship in the package's `files`, and a consumer has no validator suite. The consumer rendering has no function "run the validator suites" anywhere.

## `#frontmatter:commands[full-suite-with-performance]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).**
- `npm run test:all` runs DesignerPunk's performance lanes, which are DesignerPunk's infrastructure. A consumer's suite has no such lanes.
- The consumer body's "run token tests with your repo's own runner and scripts" does not carry a performance lane. Nothing survives elsewhere.

## `#frontmatter:knowledgeBases[TokenValidators]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).** The knowledge base indexes `src/validators/**`, which neither exists in a consumer repo nor ships in the package. The route cannot resolve.

## `#frontmatter:knowledgeBases[TokenGenerators]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).** It indexes `src/generators/**`, which neither exists in a consumer repo nor ships. The route cannot resolve.

## `#frontmatter:writeScope[src/validators/**]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).** A consumer has no validators tree to write.

## `#frontmatter:writeScope[src/generators/**]`

signer: ada

**ASSENT — no consumer counterpart (`surviving: []`).** A consumer has no generators tree to write.

## `#frontmatter:writeScope[docs/specs/**]`

signer: ada

**RE-SIGNED 2026-09-29 — the disposition flipped from `no-consumer-counterpart` to `superseded-by frontmatter:writeScope[.kiro/specs/**]`; ASSENT (`surviving: []`).**
- Re-judged:
  - the destination renders `specs/**` in the consumer frontmatter;
  - the consumer's rendered Task Completion Protocol now names the summary-doc location, `specs/[spec]/task-N-summary.md` (lines 33, 41, 106), which is inside that scope.
- The function "write the task summary docs" therefore survives in the re-pointed `specs/**` scope. `superseded-by` is more accurate than my phase-two absence assent, which it replaces.
- The cite (subtraction-4, DesignerPunk's `docs/specs/` layout) applies.

## `#the-process`

signer: ada

**RE-SIGNED 2026-09-29 — refusal 1 RESOLVED by re-authoring; ASSENT, surviving 4/4.** Re-judged in full against the new rendering (renderedHash `sha256:48794aa7…`; the removals now include "steering doc", cited subtraction-1).
- `ballot-propose`: "When you identify that one of your team's token docs or shared docs needs updating, draft the proposed change. A change to a DesignerPunk Token-Family doc (shipped in the installed package) is proposed upstream to DesignerPunk, never applied locally." The referent is re-keyed to docs the consumer owns, and the shipped-doc case is routed upstream. Entailed.
- `ballot-present` and `ballot-vote`: Peter is re-keyed to "your human lead". Entailed.
- `ballot-apply`: "If approved, apply precisely as approved — to your team's docs; an upstream proposal is filed with DesignerPunk, never applied by editing the installed package. If rejected, respect the decision and document the alternative." Entailed. **The defect is gone**:
  - Apply now has a writable target;
  - it agrees with the adjacent unit's ban on writing shipped docs, and with that unit's new clause "you change your team's shared docs only through this process";
  - the `node_modules` path is closed explicitly.
- **Residual, not a defect**: "filed with DesignerPunk" names no channel (issue tracker, PR). That is acceptable at charter grain and is not a reason to refuse.

## `#frontmatter:commands[functional-suite]`

signer: ada

**RE-SIGNED 2026-09-29 — refusal 2 RESOLVED by re-disposition; ASSENT to `superseded-by #what-you-dont-own` (`surviving: []`, since a frontmatter entry carries no operative items).**
- Re-judged against the new disposition: `superseded-by`, destination `#what-you-dont-own`, cites subtraction-1 (the `npm test` string is DesignerPunk's).
- The destination's rendering is unchanged and still carries the function: "Run token tests with your repo's own test runner and scripts — read them from its `package.json` before you run anything."
- This is exactly the disposition my refusal asked for. Thurgood's function-grain rule settles the fork I surfaced.

## `#frontmatter:commands[token-tests]`

signer: ada

**RE-SIGNED 2026-09-29 — refusal 3 RESOLVED by re-disposition; ASSENT to `superseded-by #what-you-dont-own` (`surviving: []`).**
- The same ground as `commands[functional-suite]`. "Run the token-specific suites" is carried by the destination's "Run token tests with your repo's own test runner and scripts …".
- The cite (subtraction-1, the repo-specific `npm test -- src/tokens/__tests__/`) applies.

## Signing run summary (2026-09-29, phase two)

- **Commits** on `task/123-u2b-fr2-ada`, from `60b0fdb5`, not pushed:
  - `5bb9efbc`: 21 assents, batched.
  - `4d233857`: refusal 1, `#the-process`.
  - `6c2027c5`: refusal 2, `commands[functional-suite]`.
  - `aa4f6876`: refusal 3, `commands[token-tests]`.
  - This summary is in a final docs-only commit.
- **Rows signed**: 24 of 24. The sweep passes with 0 findings (no stale, bare, wrong-signer or evidence findings).
- **Routed rows assented** (10), surviving vs items:
  - `#identity` 5/5
  - `#in-scope` 13/13
  - `#boundary-cases` 3/3
  - `#trust-by-default` 3/3
  - `#obligation-to-flag` 3/3
  - `#graceful-correction` 3/3
  - `#what-this-means-in-practice` 5/5
  - `#mcp-practice-notes` 3/4: `rebuild-docs` is dropped, which is correct because the docs corpus is package-owned.
  - `#when-you-and-peter-disagree` 1/1
  - `#what-you-dont-own` 2/3: `jest-not-vitest`'s flag clause is not entailed.
  - Total: 42 of 44 items credited.
- **No-consumer-counterpart rows assented** (11): `routes.docs[completion-doc-guidance]`, `routes.docs[dev-workflow-detail]`, `routes.docs[file-organization]`, `routes.cues[6]`, `commands[validator-tests]`, `commands[full-suite-with-performance]`, `knowledgeBases[TokenValidators]`, `knowledgeBases[TokenGenerators]`, `writeScope[src/validators/**]`, `writeScope[src/generators/**]`, `writeScope[docs/specs/**]`.
- **Rows refused** (3, each `should-re-point`):
  1. `#the-process`: the Apply step targets shipped Token-Family docs, which the adjacent unit forbids writing. Ada's rendering lacks the "change your team's shared docs only through this process" clause that Lina's and Thurgood's renderings carry.
  2. `commands[functional-suite]`: its function survives in `#what-you-dont-own`, so the row should be `superseded-by`, not `no-consumer-counterpart` (11.6.5e scope clause). This is a contested classification.
  3. `commands[token-tests]`: the same ground and the same fork as refusal 2.
- **Widenings**: none. All four § 3 candidates are ruled in the note's header.
- **Residuals**:
  1. **Refusals 2 and 3 are a profile-wide fork, not only Ada's.** The fork is the entry grain (the exact `cmd` has no counterpart → no-consumer-counterpart) against the function grain (the function survives in body prose → `superseded-by`).
     - Five agents carry `commands[functional-suite]` as no-consumer-counterpart.
     - Peter or Thurgood should rule once. Either ruling resolves both refusals, via a re-disposition or a recorded ruling followed by my re-sign.
  2. **`#in-scope`'s `scope-docs`** ("Token documentation (Token-Family docs, Rosetta architecture)") is the same seam as refusal 1. It is assented, but it is worth re-pointing in the same re-author. If that happens, its renderedHash changes and I re-sign.
  3. **Outside my seat**: the consumer's rendered `always-set/civitas-system-overview.md` line 92 still points to "Process-File-Organization", which has no consumer counterpart in the agents' routes. Flagged for the profile author.
  4. **Process hazard**: the shared scratchpad under the orchestrator session is written by parallel seats. My first helper script there was overwritten mid-run by a different script. No bad write resulted, because the chain failed closed. Seats should use per-seat subdirectories.
