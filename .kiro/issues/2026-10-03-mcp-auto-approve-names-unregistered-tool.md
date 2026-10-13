# Issue: two hand-written MCP configs still auto-approve `validate_component`, which no server registers; the shipped templates and emitters are clean

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Lina, for the record and for the emitter and test side (which is clean). **The two residual sites are outside my charter**: the Integration Guide (`governance/`) belongs to Thurgood's Task 19.4 seat; the tracked `.kiro/settings/mcp.json` is the steward repo's own dev config and is Peter's call (routing proposed below).
**Trigger**: for the guide, **Task 19.4's rewrite of the Integration Guide's MCP region (Spec 123 U3)**, which must either remove or correct the hand-copied JSON; for `.kiro/settings/mcp.json`, **the next time Peter regenerates or touches the steward's Kiro MCP config, or a `fix/` PR on his go**, whichever fires first. If 19.4's completion doc does not name L215 as `removed` or `corrected`, the guide half stays open and the first trigger has fired without a record.
**Source**: Leonardo and Thurgood (Integration Guide consult, 2026-10-03; Thurgood verified zero occurrences of `validate_component` in `application-mcp-server/src`), relayed by the orchestrator. Peter's go was to file, not to fix. Verified below by me on branch `chore/issues-guide-rewrite-charter-and-cli-findings` (cut from `main` 981891e6).

---

## The gap

`validate_component` is not a tool on any DesignerPunk MCP server, but it appears as an auto-approved tool name in two hand-written configs.

### Where it still appears. VERIFIED (`grep -rl validate_component`, excluding `node_modules`, `.git`, `dist`)

1. **`governance/DesignerPunk-Integration-Guide.md:215`**, inside the `designerpunk-application` `autoApprove` array of the hand-copied Kiro `mcp.json` (guide §4a, L169–L224). The same block's `designerpunk-docs` array (L185–L194) includes `rebuild_index`, which the shipped policy does **not** approve (it is not read-only; `scripts/__tests__/tool-manifest.test.ts` L126–L133). The block is followed by a claim (L232, "Template source") that "this configuration is the canonical template shipped with `@3fn/core` at `src/cli/templates/mcp-config.json.template`", which is false: the shipped template carries no `autoApprove` at all (below).
2. **`.kiro/settings/mcp.json:38`** (tracked in git: `git ls-files .kiro/settings` lists it; last touched `74c860e8b`, 2026-06-23), the steward repo's own Kiro dev config, also in the `designerpunk-application` `autoApprove` array. It is hand-written with absolute local paths, and it is not in `package.json` `files`, so **it does not ship**. Its other names, checked against registered tools: docs (`find_docs`, `get_document_summary`, `get_document_full`, `get_section`, `list_cross_references`, `validate_metadata`, `get_index_health`, `rebuild_index`) all registered; application (`get_component_catalog`, `get_component_summary`, `get_component_full`, `find_components`, `get_component_health`, `rebuild_index`) registered; product (`get_product_overview`, `get_brand_context`, `get_product_tokens`, `get_product_health`, `find_screens`, `get_screen_spec`, `list_experience_map`, `rebuild_product_index`) registered. The registered-name list came from `grep "name: '…'"` over `mcp-server/src`, `application-mcp-server/src` and `product-mcp-server/src`, not from the manifest. `validate_component` is the one unregistered name. This config also auto-approves the mutating `rebuild_index` and `rebuild_product_index`, which the shipped policy deliberately omits; that is a policy difference, not an unregistered-name defect.

### What is clean (the question that mattered). VERIFIED

- **`src/cli/templates/mcp-config.json.template`**: no `autoApprove` key and no tool names anywhere (three servers, command/args/env/`disabled` only).
- **`src/cli/shared/mcpConfig/kiro.ts`**: `autoApprove` is generated per server from `dist/mcp/tool-manifest.json`'s `readOnlyHint: true` entries (`readApprovedToolNames`, L50–L68; applied at L94). No hand-listed names.
- **`src/cli/shared/mcpConfig/cc.ts`**: `permissions.allow` entries are `mcp__<server>__<tool>` built from the same generator (the loop over `readApprovedToolNames`); the template's `autoApprove`/`disabled` fields are stripped, not emitted. No hand-listed names.
- **The guard that covers it**: `scripts/__tests__/tool-manifest.test.ts`
  - L98–L105: each server's manifest tool NAME SET equals its own registration array exactly (identity, not count), so the manifest, and therefore every generated approval, can only name registered tools.
  - L135–L141: `validate_component` is registered by no server.
  - L31–L58: every registered tool declares `readOnlyHint`, with bite (L60–L77).
- **The emitter-side assertions**: `src/cli/__tests__/init.test.ts` L283–L293 (Kiro `autoApprove` is set-equal to the manifest's read-only set; `validate_component` absent) and L330 (cc `permissions.allow` does not contain `mcp__designerpunk-application__validate_component`).
- **What the guard does NOT cover**: hand-written config files. It checks what the emitters can emit, not what is typed into `governance/**` or the repo's own `.kiro/settings/mcp.json`. It also does not scan any doc for tool names. The two residual sites are exactly the uncovered surface.

So: **the shipped configuration is clean; the defect is the two hand-written copies.** I recommend filing, scoped to those two.

## Impact

- **Functionally harmless at runtime**: an auto-approve entry for a tool nothing registers never matches a call. No consumer is exposed to an unreviewed tool.
- **Misleading**: a consumer who hand-copies the guide JSON (the guide is served to agents through the docs MCP) gets a config that names a non-tool and that approves `rebuild_index`, contradicting the generated policy that `init` and `attach` write. It also teaches an agent a tool (`validate_component`) that does not exist; `validate_assembly` is the real application-server tool, and it is not in either list.
- **Drift evidence**: the steward's own dev config carries the same stale name, so the error was repeated by hand at least twice, which is the reason Spec 123 Task 4 moved the policy to generation.

## Relation to U3 Task 22 and Task 19.4

This is not a `src/cli/designerpunk.ts` matter; **Task 22 is not involved**. The guide half sits in the file Task 19.4 rewrites (`governance/DesignerPunk-Integration-Guide.md`, U3). The tasks.md text I checked (`grep -n validate_component tasks.md` returns only L543, the test row about generated approvals) does **not** name the guide's hand-copied JSON or this name. So whether 19.4 removes it is **UNVERIFIED**: it depends on how Thurgood's 19.4 handles the install region and the "remainder" sweep (tasks.md L996–L1005, one row per `##`/`###` section with `kept`/`corrected`/`removed`). The guide's step 4a is the section; its row should record this block. I am not expanding U3's scope: this record asks only that 19.4's section row for 4a name the JSON as `removed` (preferred: point to `attach` as the source, as the following 4b already does) or `corrected` to the manifest-derived set.

## Fix shape (not done here)

1. Guide §4a, L173–L224: replace the hand-copied JSON with a pointer to `npx designerpunk attach --target=kiro` (4b already says the prompts are generated, not copied), or, if a literal example must stay, regenerate it from the manifest and delete the "canonical template" claim. Owner: Thurgood, inside 19.4.
2. `.kiro/settings/mcp.json`: delete L38, and decide separately whether the steward's dev config should keep approving the two rebuild tools. Peter's decision; not a component or CLI file.
3. Optional class option: a small test that scans `governance/**` and tracked `.kiro/settings/mcp.json` for `"autoApprove"` blocks and asserts every name is in the manifest. Cost: a new instrument and a scan root that must be kept current; Thurgood's seat. I am not proposing it as the pick.

## Grant paths

**Proposed for Peter** (README rule 8; not activated by this record). Neither path is in my charter write scope:

- `governance/DesignerPunk-Integration-Guide.md`: **do not grant for this issue**; U3's Task 19.4 already owns the file, and `governance/**` is a governance-law path (rule 8: never granted).
- `.kiro/settings/mcp.json`: only if Peter wants me, rather than himself, to make the one-line deletion.

## Counter-argument and what survives

- **Against filing at all**: the shipped surface is clean, the guide half is likely to vanish in 19.4, and the dev-config half is a harmless stale string. Fold-back: I narrowed the title and scope to the two hand-written copies and said so plainly rather than implying a shipped defect. **What survives**: the dev-config half has no scheduled owner or event, so without this record it would outlive 19.4 untouched; and the uncovered-surface point (hand-written configs are outside the manifest guard) is real regardless of whether these two lines are fixed.
- **Against relying on 19.4**: tasks.md does not name this line, so 19.4 could rewrite around it and leave it. That is why the trigger says an unrecorded 19.4 completion means the first trigger fired without a record.
- **Unverified by me**: that the Kiro `autoApprove` semantics ignore unknown names (I did not run Kiro; Thurgood's and my reading is that an unmatched name is inert); the registered-name lists came from grep, not the manifest; `rebuild_product_index`'s `readOnlyHint` (I did not read the product registration).

**No fix is authorized by this record.**
