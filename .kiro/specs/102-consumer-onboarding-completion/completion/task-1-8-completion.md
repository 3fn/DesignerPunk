# Task 1.8 Completion: Update Integration Guide Step 4 with MCP config documentation (Gap 4)

**Date**: 2026-05-07
**Task**: 1.8 Update Integration Guide Step 4 with MCP config documentation (Gap 4)
**Type**: Documentation
**Status**: Complete

---

## Artifacts Modified

- `.kiro/steering/DesignerPunk-Integration-Guide.md`
  - § "4. Configure Agent Connections" — restructured into sub-sections 4a (MCP config) and 4b (agent prompts)
  - Embedded canonical MCP config template verbatim from Task 1.1's `src/cli/templates/mcp-config.json.template`
  - Added restart-agent-session note
  - Added template source citation linking back to the canonical source
  - `Last Reviewed` date updated to `2026-05-07`

## Implementation Details

### Approach

Replaced the single vague paragraph at Step 4 ("Connect your Kiro agents to the running MCP servers using the connection details printed at startup") with a concrete walkthrough organized into two sub-sections:

**4a. Configure MCP server connections** — new content, ~50 lines. Embeds the complete canonical JSON template verbatim, with explanation of the direct-node invocation pattern, the restart-agent-session requirement, troubleshooting checklist for connection failures, and a source-citation note pointing back to `src/cli/templates/mcp-config.json.template` as the canonical template.

**4b. Set up agent prompts** — existing content preserved intact. The original product-template copy instruction belongs logically after MCP config setup (agents need MCP connections to connect to, then prompts that tell them what to do with those connections).

### Key Decisions

**Embed JSON verbatim, not as reference**: Per Ada R3's canonical-template-as-source-of-truth refinement, the template file ships at `src/cli/templates/mcp-config.json.template`. The Integration Guide could have cited that file location and told consumers to read it, but verbatim embedding is better consumer UX — consumers can copy directly from the guide without needing to locate the template in node_modules.

The trade-off: if the template file changes, the Integration Guide must update in sync. Task 1.8 anchors this by explicitly citing the template source; future maintainers know the two surfaces must stay aligned.

**Sub-section split (4a / 4b) rather than single continuous prose**: The original Step 4 read as one paragraph. After adding ~50 lines of MCP config content, keeping it as single-paragraph flow would have been unreadable. Split into 4a (MCP config) and 4b (agent prompts) makes the two distinct configuration concerns visible and skimmable. Follows the convention used elsewhere in the guide where sub-sections scale with content volume.

**Direct-node invocation explanation**: Added a plain-language note ("Kiro spawns the MCP server binaries directly from `node_modules/@3fn/core/dist/mcp/`, rather than going through the `npx designerpunk mcp:*` CLI wrappers") so consumers understand WHY the config uses node invocation paths rather than `npx designerpunk mcp:docs`. Without this context, the config looks arbitrary. With it, consumers understand they're configuring Kiro to bypass a less-reliable wrapper — useful knowledge if they later debug a connection issue.

**Troubleshooting bullets**: Added three troubleshooting items for the failure mode "MCP server reports connection failure." These anticipate the actual failure modes that surfaced during Spec 101 Task 2.3 consumer verification (missing dist files, incomplete install, path resolution issues). Preemptively documenting these saves consumers from repeating Peter's discovery work.

### Integration Points

- **Task 1.1** (canonical template): the JSON content is derived 1:1 from the template file. If the template file changes post-11.1.0 (e.g., new MCP server added, autoApprove array modified), the Integration Guide must update in sync. Cited the source location in the guide so future maintainers know where the dependency points.
- **Task 1.5** (init scaffolding): init's `npx designerpunk init` scaffolds `.kiro/settings/mcp.json` from the same template. The guide's source-citation note mentions init; consumers who ran init will recognize the file. Consumers who skipped init (manual setup) get the full config from the guide.
- **Task 2.5** (post-publish verification): Gap 4 closure verified here. The verification step is "Integration Guide Step 4 documents the mcp.json config — follow it standalone" — i.e., a consumer with only the published guide can configure MCP correctly. This completion should satisfy that criterion once consumed from the published 11.1.0 package.

## Validation (Tier 1: Minimal)

### Syntax Validation
- ✅ Markdown renders correctly (sub-sections 4a/4b properly hierarchized under Step 4)
- ✅ JSON block syntax valid — confirmed by comparison against canonical template file (both are valid JSON)
- ✅ Code fence language hints correct (`json`, `bash`)

### Artifact Verification
- ✅ Step 4 content now includes concrete `.kiro/settings/mcp.json` template
- ✅ Restart-agent-session note present
- ✅ Template source citation points at `src/cli/templates/mcp-config.json.template` (verified file exists)
- ✅ Existing 4b (agent prompts section) preserved intact
- ✅ `Last Reviewed` date updated to `2026-05-07`

### Basic Structure Validation
- ✅ Embedded JSON matches canonical template exactly (diff shows only whitespace around code fences)
- ✅ Step 4 now flows logically: configure MCP connections (4a) → set up agent prompts (4b)
- ✅ Subsequent Step 5 (Verify) unaffected

### Gap 4 Closure Requirement
- ✅ Gap 4 per `.kiro/issues/2026-05-07-consumer-onboarding-gaps.md`: "Integration Guide Step 4 is vague about MCP config." Post-fix, Step 4 contains the actual config content, restart requirement, and troubleshooting guidance. A consumer following only the published guide can now configure MCP correctly without reverse-engineering from the DesignerPunk-v2 dev repo.
