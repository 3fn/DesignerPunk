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

**ASSENT — surviving 13/13.**
- Eleven bullets are verbatim.
- `scope-theme-registry`: the `src/themes/ThemeRegistry.ts` path is replaced by "declared in your `designerpunk.config.ts`; the registry itself ships in the installed package". The same scope (registration, validation, theme-varying computation) is re-keyed; entailed.
- `scope-pipeline-config`: the `src/config/…` paths are replaced by "`designerpunk.config.ts`, read by the installed package's loader". Entailed.
- **Observation, not a refusal**: `scope-docs` still reads "Token documentation (Token-Family docs, Rosetta architecture)", and in a consumer those docs ship inside the package. Re-keyed, it reads as the team's token documentation, so it is entailed. But it is the same seam as the `#the-process` refusal. **Recommend that the re-author of `#the-process` also consider re-pointing this bullet**, as Lina's consumer in-scope already does ("Your team's component guidance docs … DesignerPunk's own …").

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

**ASSENT — surviving 5/5.**
- `practice-no-write`: "`.kiro/steering/` or `governance/` files" becomes "DesignerPunk's shipped docs (inside the installed package) or … the generated `designerpunk-*` identity files". In a consumer, those are the shared governance layer.
  - The team's own shared docs are not named in this bullet. They are covered within this unit by the next bullet's "or any shared knowledge doc", and the unit as a whole entails no direct writes to the shared layer.
- `practice-no-edit-docs` and `practice-all-changes`: verbatim. For `practice-all-changes`, "This" is the sibling bullets, which are items, so it is not widened.
- `practice-propose`: Peter re-keyed to "your human lead".
- `practice-ambient-law`: verbatim, and the ambient embeds are retained.

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

**ASSENT — no consumer counterpart (`surviving: []`).**
- `docs/specs/**` is DesignerPunk's location for summary docs. The consumer's rendered Task Completion Protocol names no such location.
- Spec work is covered by the re-pointed `specs/**` write scope.

## `#the-process`

signer: ada

**REFUSE — `should-re-point`** (refusal 1 of this run). The four steps survive textually, with Peter re-keyed to "your human lead", but the rendering is wrong for a consumer.
- **The defect**:
  - Step 1 (`ballot-propose`) still names "a Token-Family doc or steering doc" as the thing to propose changes to, and step 4 (`ballot-apply`) says "If approved, apply precisely as approved."
  - In a consumer, Token-Family docs ship **inside the installed package**, and the adjacent unit's rendering forbids writing them ("You do NOT write to DesignerPunk's shipped docs (inside the installed package) …").
  - An approved change therefore has no applicable target. A consumer Ada either contradicts the next unit, or edits `node_modules`, which is lost on the next install.
  - The charter creates this contradiction, and the human-lead vote is left to catch it.
- **Evidence that this is an authoring miss, not a design choice**: Lina's and Thurgood's consumer renderings of the sibling unit carry the scoping clause "…and you change your team's shared docs only through this process". Ada's `#what-this-means-in-practice` rendering does not. With that clause, Apply targets the team's docs. Without it, Apply targets shipped docs.
- **Possible re-authoring** (Thurgood's pick, not mine):
  - (a) Re-point step 1's referent to the team's own token docs, and send proposed changes to DesignerPunk's shipped docs upstream rather than applying them locally.
  - (b) Add Lina's and Thurgood's scoping clause to Ada's `#what-this-means-in-practice`. That changes its renderedHash, so I re-sign it too.
  - (a) and (b) together is the closest match to the siblings.
  - The `scope-docs` observation under `#in-scope` is the same seam and may ride the same re-author.

## `#frontmatter:commands[functional-suite]`

signer: ada

**REFUSE — `should-re-point`** (refusal 2 of this run). The disposition should be `superseded-by #what-you-dont-own`, not `no-consumer-counterpart`.
- The entry's function (cue: "run the functional lanes to validate token work"; cmd `npm test`) **survives, re-grounded, elsewhere in the consumer rendering**. `#what-you-dont-own` renders "Run token tests with your repo's own test runner and scripts — read them from its `package.json` before you run anything."
- That sentence is where this row's function went. The `#what-you-dont-own` removal (subtraction-1) deletes exactly the pointer "Your test commands (with their triggering cues) are in the Commands section." together with the Jest line, and replaces it with that sentence.
- **Req 11.6.5e, scope clause**: "A function that survives only elsewhere takes a disposition for this unit (`superseded-by`, or `re-pointed` with that destination)". An absence assent would attest a no-counterpart that I judge false. It would also inflate the recorded no-consumer-counterpart rate (B-U2 M1).
- **Resolution I expect**: re-dispose as `superseded-by` with destination `#what-you-dont-own`, then I re-sign under C1.
- **This is a contested-classification refusal, surfaced as a fork, not a settled defect.** The other reading is that a commands entry is its exact `cmd`, which has no consumer counterpart. The consumer rendering is identical under either label.
  - The pattern is profile-wide: five agents carry `commands[functional-suite]` as no-consumer-counterpart.
  - If Peter or Thurgood rule the entry-grain reading, that ruling is the re-authoring, and I re-sign as an absence assent.
