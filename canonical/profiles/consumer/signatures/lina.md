# Signature evidence — `lina` (C1, owner seat)

**Rows**: `canonical/profiles/consumer/lina.dispositions.yaml` · **Signer**: Lina (C1: the owning agent of `canonical/agents/lina.md`) · Spec 123 Task 15.5 phase two, 2026-09-29.

**Rule applied** (Req 11.6.5e): an item survives **iff every implementation that complies with what the unit's OWN rendering states also complies with it**, its repo-bound referents re-keyed to the consumer's repo (5b). Entailment is read within the unit's own rendering only (`canonical/_consumer-output/_canonical/agents/lina.md`, the unit's lines as its attribution sidecar assigns them), never from another unit. A `no-consumer-counterpart` row is signed as the owner's agreement that the entry has no consumer counterpart; such an entry carries no operative-set items (C16, frontmatter leaves), so an assent is `surviving: []`.

## `#identity`

signer: lina

**ASSENT — surviving: lina-role, lina-domain, lina-handoff, lina-human-decides, lina-partner.** All five entailed, re-keyed. `lina-role`: "the Stemma component system specialist for this design system" ("for DesignerPunk" re-keyed to the consumer's system). `lina-domain` is verbatim. `lina-handoff`: "recommend your human lead bring them in" (Peter → the human lead). `lina-human-decides`: "Your human lead makes final decisions". `lina-partner`: "You are their partner, not their tool".

## `#in-scope`

signer: lina

**ASSENT — surviving: scope-scaffolding, scope-platforms, scope-docs, scope-contract-tests, scope-token-integration, scope-schema, scope-token-mapping, scope-inheritance, scope-parity, scope-theme-consumption, scope-data-theme, scope-one-off, scope-promotion, scope-maintained-docs.** (Re-sign 2026-10-19, against canonical `sha256:fa62f165…` and rendered `sha256:25e69652…`, judged against the 23-item set; ballot 2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form, S5.) The canonical unit changed only by the "Delegate signing audit" bullet, which the record splits into `scope-delegate-audit-run`, `scope-delegate-audit-file` and `scope-delegate-audit-report`. Thurgood pinned the overlay at `5842fee82` (pin `a78c65a5…` → `fa62f165…`, the whole bullet removed under `subtraction-3`) and regenerated at `a3f8b6053`. I recomputed the rendered hash from the committed consumer rendering's attribution sidecars (`readConsumerSpans` / `renderedHashOf`, the freshness sweep's own path): `sha256:25e69652685da607769bb96dc8d392144e1f3bb8cf9f6fbe737987fcfca94e8c`, equal to the 2026-10-17 value. The consumer rendering did not change a byte, because the row removes the new bullet. The same fourteen survive, so assent is 14/23 (it was 14/20); the survivors' judgments below stand unchanged.

**The three new items do not survive, and I agree they should not**: `scope-delegate-audit-run`, `scope-delegate-audit-file`, `scope-delegate-audit-report`. The rendering states none of them, so a compliant implementation can violate each. Each is bound to this steward repo: a consumer has no signing chain, no Stacy-signed acts, no ballot, and no delegate rotation, so there is nothing to re-key to. The citation is `subtraction-3` (our stewardship cadences and instruments as obligations); `subtraction-1` also applies (the `verify-signing-chain` invocation), but a removal carries exactly one `cites`, so only the primary is recorded. The deny-list hits for the citation are stated in `5842fee82`'s commit body. No refusal.

---

**Prior signature (superseded by the re-sign above)**

**SUPERSEDED (2026-10-17 signing; kept as the prior record) — ASSENT — surviving: scope-scaffolding, scope-platforms, scope-docs, scope-contract-tests, scope-token-integration, scope-schema, scope-token-mapping, scope-inheritance, scope-parity, scope-theme-consumption, scope-data-theme, scope-one-off, scope-promotion, scope-maintained-docs.** (Re-sign 2026-10-17, against canonical `sha256:a78c65a5…` and rendered `sha256:25e69652…`, judged against the 20-item set.) The canonical unit changed only by the six-roots bullet (ballot 2026-10-17-standing-write-scope-six-roots); the rendering is byte-unchanged, because the row removes that bullet under `subtraction-1`. The fourteen survive as at the 2026-09-29 signing: 13 members verbatim, and `scope-maintained-docs` re-keyed to "**Your team's component guidance docs** (content correctness and updates …)" — DesignerPunk's two named docs are read-only in the installed package, so the consumer's counterpart is their own guidance docs (5b).

**Not surviving, and I agree they should not**: `scope-standing-grant`, `scope-standing-pr-names-file`, `scope-standing-rule-9`, `scope-standing-grants-compose`, `scope-standing-scope-moves`, `scope-standing-law`. The rendering states none of them, so a compliant implementation can violate each. Each is bound to this steward repo: the generator and its tests, these `scripts/` files, the `lina-*` hooks, `.kiro/issues/` rule 9, this repo's task-row grants and `canonical/agents/**` law. A consumer installs none of them and has no counterpart to re-key to (subtraction 1). The one I weighed hardest is `scope-standing-law`: "a tool never authorizes changing the law it serves" reads as general, but in the consumer it has no tool to attach to (the consumer seat owns no generator, adapters or subtractions), and the consumer's own change discipline is carried by `#the-process` and `#what-this-means-in-practice`, not by this unit. No refusal.

## `#boundary-cases`

signer: lina

**ASSENT — surviving: boundary-flag, boundary-component-side, boundary-coordinate.** Flag and handle the component side, both verbatim. `boundary-coordinate` is re-keyed: "Recommend your human lead coordinate with Ada for the token side".

## `#step-1-verify-component-family-doc`

signer: lina

**ASSENT — surviving: step1-check-family-doc, step1-draft-family-doc.** Check is verbatim. Draft-and-present is re-keyed ("present it to your human lead for approval (ballot measure model) before proceeding").

## `#token-selection-priority-must-follow-this-order`

signer: lina

**ASSENT — surviving: priority-semantic, priority-primitive, priority-component, priority-hardcoded.** All four steps, in order. `priority-primitive` is re-keyed ("or your human lead's acknowledgment"). The ordering constraint in the heading is also rendered, though as a label it is not an item (phase-one residual).

**Re-signed 2026-10-25 (served-docs token-name correction).** The first step's examples were corrected in the canonical source to `color.contrast.onAction` and `space.inset.100`; the rendering carries the corrected text. Re-read against the rendering at 94ce930bf: all four steps still stated, in order, each with its condition and approval requirement. Surviving list unchanged.

## `#trust-by-default`

signer: lina

**ASSENT — surviving: trust-ada, trust-thurgood, trust-human.** Ada and Thurgood are verbatim. `trust-human` is re-keyed: "Trust your human lead's final decisions after you've provided your analysis".

## `#obligation-to-flag`

signer: lina

**ASSENT — surviving: flag-semantic, flag-test-pattern, flag-impact.** Two are verbatim. `flag-impact` is re-keyed: "recommend your human lead coordinate with Ada".

## `#graceful-correction`

signer: lina

**ASSENT — surviving: correction-engage, correction-uncertain, correction-gap-feedback.** `correction-engage` is re-keyed ("… or your human lead, engage constructively"); the other two are verbatim.

## `#the-process`

signer: lina

**ASSENT — surviving: ballot-propose, ballot-present, ballot-vote, ballot-apply** (re-sign run 2026-09-29, against the post-batch rendering and hashes). All four entailed in the NEW rendering. **Propose**: any of your team's component or shared docs gets a drafted change, and a DesignerPunk Component-Family doc gets an upstream proposal. That re-keys "a Component-Family doc or steering doc" to the consumer's two kinds of doc, and every doc needing an update still gets a proposal. **Present** and **Vote** are re-keyed to the human lead. **Apply**: "apply precisely as approved — to your team's docs". An approved change to a shipped doc is filed upstream, since the package is never edited; that is the only place an application can happen, so "apply precisely as approved" survives wherever applying is possible. The rejected branch is verbatim. History: assented at `b9e2a919` against the earlier rendering; that signature went stale when the batch re-authored the unit (the shipped-doc application rule).

## `#what-this-means-in-practice`

signer: lina

**ASSENT — surviving: practice-no-write, practice-no-edit-docs, practice-propose, practice-all-changes.** `practice-no-write` is re-keyed: the steward's `.kiro/steering/` / `governance/` become DesignerPunk's shipped docs and the generated identity files (never written), plus "your team's shared docs only through this process". That also subsumes the removed component-meta-guide exception. `practice-no-edit-docs` is verbatim. `practice-propose` is re-keyed. `practice-all-changes`: "This applies to ALL documentation changes, no matter how small". The dropped clause ("including the two steering docs whose content you maintain") is entailed by ALL documentation changes.

## `#mcp-practice-notes`

signer: lina

**ASSENT — surviving: mcp-query-parent, schema-own-tokens, schema-no-inherited, schema-verify-own-code, rebuild-after-write, rebuild-application, mcp-fallback.** 7 of 8. Six are verbatim. `mcp-fallback` is re-keyed: grep your repo's `src/components/` or the installed package's `node_modules/@3fn/core/src/components/` in place of the steward's `application-mcp-server/`. **Not surviving: `rebuild-docs`** (governance/component doc changes → the docs MCP's `rebuild_index`). The removed route WAS its constraint. The surviving "trigger the matching rebuild" names the goal without the mapping, and 11.6.5e (a goal named without its constraint entails nothing, exemplar B) does not credit it. It is not a refusal: the route names this repo's `governance/` tree, which a consumer does not index. It is a legitimate subtraction, and whether its citation applies is clause (iii)'s question.

## `#when-you-and-peter-disagree`

signer: lina

**ASSENT — surviving: disagree.** Re-keyed: "Provide your counter-arguments; if your human lead proceeds, respect it; proceed constructively; revisit when relevant." All four parts, in order.

## `#what-you-dont-own`

signer: lina

**ASSENT — surviving: not-own-audits, not-own-governance, not-own-formula-tests, jest-not-vitest.** Three members verbatim. `jest-not-vitest` is re-keyed: its function is to run this project's actual test runner and never a wrong runner's flags. "Run component tests with your repo's own test runner and scripts — read them from its `package.json` before you run anything" makes that impossible to violate. "Jest" was this repo's fact, not the obligation.

## `#frontmatter:routes.docs[completion-doc-guidance]`

signer: lina

**ASSENT — surviving: [] (nothing survives).** Agree: no consumer counterpart. The route reaches DesignerPunk's own completion-doc tiering for `.kiro/specs/**` tasks (subtraction 4, spec workflow as law); a consumer's completion practice is its own.

## `#frontmatter:routes.docs[dev-workflow-detail]`

signer: lina

**ASSENT — surviving: [] (nothing survives).** Agree: `process-development-workflow` is this repo's task workflow (subtraction 4).

## `#frontmatter:routes.docs[file-organization]`

signer: lina

**ASSENT — surviving: [] (nothing survives).** Agree: `process-file-organization` is this repo's file-organization law (subtraction 4).

## `#frontmatter:routes.cues[8]`

signer: lina

**ASSENT — surviving: [] (nothing survives).** Agree: the cue rebuilds the docs MCP after `governance/` / component doc changes. That is this repo's corpus index over its own governance tree (subtraction 3); a consumer does not edit the docs that index serves. Consistent with `rebuild-docs` not surviving in `#mcp-practice-notes`.

## `#frontmatter:knowledgeBases[ApplicationMCPServerSource]`

signer: lina

**ASSENT — surviving: [] (nothing survives).** Agree: `application-mcp-server/**` is the steward's server source, not present in a consumer's repo (subtraction 5). Component source stays reachable through the retained `StemmaComponentSource`.

## `#frontmatter:writeScope[docs/specs/**]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (re-sign run 2026-09-29, against the post-batch rendering and hashes). **Disposition changed by the batch**: `no-consumer-counterpart` → `superseded-by` `frontmatter:writeScope[.kiro/specs/**]`. I assent. The destination renders the glob `specs/**` (both targets' write scope lists `- \`specs/**\``). The row's function is permission to write the spec summaries, which in a consumer's layout live at `specs/[spec]/task-N-summary.md`, so `specs/**` makes that write permitted. **Dependency, stated**: this entailment holds because the consumer's summary location is under `specs/`. If a later re-grounding moves summaries elsewhere, this row must be re-judged. History: signed `no-consumer-counterpart` at `b9e2a919`; the function turned out to have a counterpart, so the new disposition is the more accurate claim.

## `#frontmatter:writeScope[application-mcp-server/**]`

signer: lina

**ASSENT — surviving: [] (nothing survives).** Agree: the steward's MCP server source; no consumer counterpart (subtraction 1).

## `#frontmatter:writeScope[governance/component-meta-authoring-guide.md]`

signer: lina

**ASSENT — surviving: [] (nothing survives).** Agree: this repo's governance doc. The consumer reads DesignerPunk's copy read-only in the package (subtraction 3), consistent with `practice-no-write`'s re-grounding.

## `#frontmatter:writeScope[scripts/extract-component-meta.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: `scripts/extract-component-meta.ts` is one of this repo's component scripts, granted by file (ballot 2026-10-17-standing-write-scope-six-roots § 2.2). It is not in the package's `files`, so a consumer has no copy to own (subtraction 1).

## `#frontmatter:writeScope[scripts/figma-component-generator.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: `scripts/figma-component-generator.ts` is one of this repo's component scripts, granted by file (ballot 2026-10-17-standing-write-scope-six-roots § 2.2). It is not in the package's `files`, so a consumer has no copy to own (subtraction 1).

## `#frontmatter:writeScope[scripts/audit-component-tokens.js]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: `scripts/audit-component-tokens.js` is one of this repo's component scripts, granted by file (ballot 2026-10-17-standing-write-scope-six-roots § 2.2). It is not in the package's `files`, so a consumer has no copy to own (subtraction 1).

## `#frontmatter:writeScope[scripts/validate-examples.js]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: `scripts/validate-examples.js` is one of this repo's component scripts, granted by file (ballot 2026-10-17-standing-write-scope-six-roots § 2.2). It is not in the package's `files`, so a consumer has no copy to own (subtraction 1).

## `#frontmatter:writeScope[.kiro/hooks/lina-*.kiro.hook]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: this repo's own Kiro hooks for the Lina seat (§ 2.4). The package installs no hooks and `src/cli/templates/` carries none, so a consumer has nothing at this path to own (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/render.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/render.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/adapters/**]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/adapters/**`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/compose.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/compose.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/derive.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/derive.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/generate.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/generate.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/pipeline.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/pipeline.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/skills.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/skills.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/consumer-entry.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/consumer-entry.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/consumer-profile.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/consumer-profile.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/attribution.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/attribution.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/spans.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/spans.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/registry.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/registry.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/registry-manifest.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/registry-manifest.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/resolve.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/resolve.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/resolve-stdio.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/resolve-stdio.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/workflow-rules-accessor.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/workflow-rules-accessor.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/regrounding/derivation.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/regrounding/derivation.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/regrounding/dispositions.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/regrounding/dispositions.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/regrounding/overlay.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/regrounding/overlay.ts`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/__fixtures__/g1-renderings/**]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/__fixtures__/g1-renderings/**`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/__fixtures__/semantics-guard/**]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/__fixtures__/semantics-guard/**`, the generator's rendering, adapters and emitters; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/schema.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/schema.ts`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/partition.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/partition.ts`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/frontmatter.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/frontmatter.ts`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/canonical-json.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/canonical-json.ts`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/source.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/source.ts`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/regrounding/hash.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/regrounding/hash.ts`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/regrounding/operative-sets.ts]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/regrounding/operative-sets.ts`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/__fixtures__/golden-partition/**]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/__fixtures__/golden-partition/**`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/jest.config.js]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/jest.config.js`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[tools/agent-generator/tsconfig.json]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: the agent generator's source (`tools/agent-generator/tsconfig.json`, the generator's shared core; § 4, F-1 Option B). A consumer receives only the compiled `dist/generator/**`, read-only inside the installed package, so there is no consumer path to write (subtraction 1).

## `#frontmatter:writeScope[.kiro/issues/**]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (first signature, 2026-10-17). Agree: this repo's issue records, written under its own `.kiro/issues/README.md` rule 9 (§ 2.5). That convention is a stewardship instrument of this repo; the package ships neither the records nor the convention, and the consumer's tracking practice is theirs to set (subtraction 3, as cited).

## `#frontmatter:commands[functional-suite]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (re-sign run 2026-09-29, against the post-batch rendering and hashes). **Refusal (`928b7980`) resolved by the changed disposition**, per Thurgood's function-grain ruling. The row is now `superseded-by #what-you-dont-own`, and I assent to it. That unit's own rendering ("Run component tests with your repo's own test runner and scripts — read them from its `package.json` before you run anything") entails this command's function: run the tests that validate component work, with the project's actual runner and never a wrong runner's flags. `surviving: []`: a frontmatter leaf carries no operative-set items (C16), and the function lives at the destination.

## `#frontmatter:commands[component-tests]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (re-sign run 2026-09-29, against the post-batch rendering and hashes). **Refusal (`3a003c2d`) resolved by the changed disposition**: `superseded-by #what-you-dont-own`, assented. "Run component tests with your repo's own test runner and scripts" entails running the component-specific suites. `surviving: []`, as above.

## `#frontmatter:commands[full-suite-with-performance]`

signer: lina

**ASSENT — surviving: [] (nothing survives)** (re-sign run 2026-09-29, against the post-batch rendering and hashes). **Refusal (`6f7b882e`) withdrawn: ASSENT-ON-RULING** (my ruling response below). The disposition is unchanged, `no-consumer-counterpart`, and I now agree with it. Under strict 5e, "run component tests with your repo's own test runner" does not entail "run ALL tests including the performance lanes". No rendering carries the full-suite-with-perf function; its lanes and idle-machine caution are this repo's instruments.

## `#frontmatter:writeScope[.kiro/specs/**]`

signer: lina

**FIRST SIGNATURE 2026-10-23 - ASSENT to `re-pointed` (`surviving: []`).** The row was routed (`re-pointed-entry`) with no signature; this is its first.
- `.kiro/specs/**` re-points to `specs/**`. The consumer repo has no `.kiro/` spec tree: its rendered Task Completion Protocol puts completion docs at `specs/[spec]/completion/...` and summary docs at `specs/[spec]/task-N-summary.md` (`_consumer-output/_canonical/always-set/task-completion-protocol.md`, lines 23, 31-32, 39), so `specs/**` is the consumer's spec root and covers where I write spec, completion and summary docs.
- My rendered write scope is `src/components/**` and `specs/**` (`cc/.claude/agents/lina.md:414-415`, `kiro/.kiro/agents/lina.json`), so the seat keeps its component root and its spec root and nothing here widens it.
- `writeScope[docs/specs/**]` is already `superseded-by` this entry, so one rendered scope entry carries both canonical paths and nothing is left unreachable.
- The re-pointed value is the same `specs/**` that Ada, Data, Kenya and Leonardo signed; I judged it from my own rendering, not from theirs. The hash covers all three rendered pieces (cc agent, kiro prompt, kiro json).
- It is a frontmatter entry with no operative items, so `surviving: []` is the itemized form.

## Signing run summary (2026-09-29, phase two)

**Seat**: Lina (C1 signer of `canonical/agents/lina.md`'s rows), Spec 123 Task 15.5 phase two · **Branch**: `task/123-u2b-fr2-lina` from `60b0fdb5` · **Sheet**: `first-render/drafting/sheets/lina.md` at `60b0fdb5` (24 rows; hashes taken from it).

**Commits** (this summary is a fifth, docs-only commit):
- `b9e2a919`: 21 signatures (13 routed assents + 8 no-consumer-counterpart agreements) and this note;
- `928b7980`: **REFUSE** `commands[functional-suite]`;
- `3a003c2d`: **REFUSE** `commands[component-tests]`;
- `6f7b882e`: **REFUSE** `commands[full-suite-with-performance]`.

**Referent widenings: none.**
- The sheet's § 3 lists 7 candidates.
- Three are known false positives: `scaffold-follow-stemma`, `shared-layer-not-unilateral` (widened at phase one) and `jest-not-vitest`.
- `counter-provide` is a false positive too: its lead-in introduces an example.
- `step6-meta-content` and `practice-all-changes` carry their referent in the same unit's preceding line.
- `step4-platform-separation`'s layout block is covered by its unit's other items (confirmed at 11.2).
- No re-confirmation was needed.

**Assented rows (13 routed)**, surviving / items, each read within its own `_canonical` rendering (Req 11.6.5e):

| Row | Surviving / items | Note |
|---|---|---|
| `#identity` | 5 / 5 | re-keyed (Peter → your human lead; DesignerPunk → this design system) |
| `#in-scope` | 14 / 14 | `scope-maintained-docs` re-keyed to your team's component guidance docs |
| `#boundary-cases` | 3 / 3 | re-keyed |
| `#step-1-verify-component-family-doc` | 2 / 2 | re-keyed |
| `#token-selection-priority-must-follow-this-order` | 4 / 4 | re-keyed |
| `#trust-by-default` | 3 / 3 | re-keyed |
| `#obligation-to-flag` | 3 / 3 | re-keyed |
| `#graceful-correction` | 3 / 3 | re-keyed |
| `#the-process` | 4 / 4 | re-keyed |
| `#what-this-means-in-practice` | 4 / 4 | the steward doc trees re-keyed to shipped docs + your team's docs |
| `#mcp-practice-notes` | **7 / 8** | **`rebuild-docs` not entailed**: its removed route was its constraint (5e, exemplar B). A legitimate subtraction, not a refusal |
| `#when-you-and-peter-disagree` | 1 / 1 | re-keyed |
| `#what-you-dont-own` | 4 / 4 | `jest-not-vitest` re-keyed to "your repo's own test runner" |

Totals: **53 of 54 routed items survive.**

**No-consumer-counterpart agreements (8, `surviving: []`)**: `routes.docs[completion-doc-guidance]`, `routes.docs[dev-workflow-detail]`, `routes.docs[file-organization]`, `routes.cues[8]`, `knowledgeBases[ApplicationMCPServerSource]`, `writeScope[docs/specs/**]`, `writeScope[application-mcp-server/**]`, `writeScope[governance/component-meta-authoring-guide.md]`. Each reason is in its block above.

**Refused rows (3), `refuse: should-re-point`:**
- **Which**: `commands[functional-suite]`, `commands[component-tests]`, `commands[full-suite-with-performance]`.
- **Why**: the **disposition is wrong**. These test invocations have a consumer counterpart, and their function survives in `#what-you-dont-own`'s own rendering ("Run component tests with your repo's own test runner and scripts…"). A function that survives elsewhere takes `superseded-by` (destination `#what-you-dont-own`) or `re-pointed`, never `no-consumer-counterpart`, which would also inflate the baselined rate.
- **Suggested resolution**: re-dispose `superseded-by`, destination `#what-you-dont-own`, in its own commit; then I re-sign. **Not resolved here** (refusal protocol).

**Verification**: `runFreshnessSweep` over this worktree → `operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)`, `{}`, **lina findings: 0**. This was after the assents and again after the three refusals. The sweep does not flag a standing refusal; zero-standing is Task 15.5's own check.

**Residuals (recorded, not mine to fix here):**
1. **`contract-system-reference` embed citing `.kiro/specs/063-uniform-contract-system/findings/canonical-name-mapping.md`.** Its two section rows in `lina.dispositions.yaml` (`ambient[contract-system-reference#naming-convention]` and `…#classification-rules]`) are disposed **`retained`**, so they are not routed and carry no signature. That is why they are not on my sheet. The retained naming-convention section therefore **ships a steward spec path** to consumers: a clause (i) deny-list class that this signing run does not reach.
   - An embed cannot be `re-pointed` (DD19). The options are an edit to the section by its owning doc's owner (a governance change), or re-disposing the row `superseded-by` / `no-consumer-counterpart` (which loses the naming convention itself).
   - **Recommended**: the doc owner drops or neutralizes the historical-mapping sentence at source, since it is history, not law. Flagged for the orchestrator to route; not mine to fix here.
2. **The derived canonical renames one heading.** `#when-you-and-peter-disagree` renders as "### When You and Your Human Lead Disagree". Its attribution still sources the canonical anchor (correct, 10.S), but the derived charter's own partition anchor differs from canonical. This is a Task 16 consideration (mine) for any consumer-side key that reads `_canonical/` anchors.
3. **The ordering constraint in `#token-selection-priority-…`'s heading** (a phase-one residual) is unchanged.

### Ruling response (2026-09-29)

**ASSENT-ON-RULING — `commands[full-suite-with-performance]`: I withdraw the refusal and will re-sign it `no-consumer-counterpart`, `surviving: []`, when the batch lands.** Thurgood's strict 5e read is right. "Run component tests with your repo's own test runner and scripts" entails running *component* tests. It does not entail "run ALL tests including the performance lanes (wall-clock-sensitive — idle machine)": that is a different, broader function, whose lanes and idle-machine caution are this repo's instruments, and I read "compatible with" as "entails". My refusal grouped the three command rows by entry kind. Under his function-grain order only two of them, `functional-suite` and `component-tests`, are entailed by `#what-you-dont-own`'s rendering, and those two refusals stand as upheld.

## Re-sign run summary (2026-09-29)

**Seat**: Lina (C1) · **Branch**: `task/123-u2b-fr3-lina` from `dba93df5` (Thurgood's re-author batch) · **Worklist**: `sheets/lina.md` § 4, five acts, hashes from § 2 · **Commit**: the one that adds this section. It is the only commit on this branch and carries the five re-signatures, their rewritten evidence blocks and this summary. Each fragment still has exactly one `## ` block.

| Row | Act | Result |
|---|---|---|
| `#the-process` | stale → re-judged against the NEW rendering | **ASSENT 4/4**: all four ballot steps are still entailed under the shipped-doc rule (local docs applied; DesignerPunk's shipped docs proposed upstream, never edited in the package). New `renderedHash` `sha256:599ae71c…`. |
| `commands[functional-suite]` | refusal `928b7980` resolved by the changed disposition (`superseded-by #what-you-dont-own`) | **ASSENT**, `surviving: []`. The destination's rendering entails the function. |
| `commands[component-tests]` | refusal `3a003c2d` resolved likewise | **ASSENT**, `surviving: []`. |
| `commands[full-suite-with-performance]` | refusal `6f7b882e` **withdrawn** (my ASSENT-ON-RULING) | **ASSENT** to `no-consumer-counterpart`, `surviving: []`. |
| `writeScope[docs/specs/**]` | disposition flipped `no-consumer-counterpart` → `superseded-by` `writeScope[.kiro/specs/**]` | **ASSENT**, `surviving: []`. The destination renders `specs/**`, which covers the consumer summary location `specs/[spec]/task-N-summary.md`. That dependency is stated in the block. |

**Refusals**: none issued; none standing from me. All three earlier refusals are resolved: two by changed disposition, one withdrawn on the ruling. None of them was resolved by assent alone.

**One act invisible in the dispositions file, recorded here**: `writeScope[docs/specs/**]`'s signature is **byte-identical** before and after. The disposition flip left both hashes unchanged (as the sheet warns), and the assent was already `surviving: []`. The re-sign act is carried by its rewritten evidence block and this commit. **A signature cannot record which disposition it assented to**, so a flip-only re-sign leaves no trace in the row itself. That is a limit of the row format, recorded here, not fixed.

**VALVE-1 trim note** (README): not applicable. None of my five rows is a `groundTruthManifest` trim.

**Verification**: `runFreshnessSweep` over this worktree → **lina findings: 0**. The run as a whole still reports `{"stale-signature":31}`, all in other seats' rows.
