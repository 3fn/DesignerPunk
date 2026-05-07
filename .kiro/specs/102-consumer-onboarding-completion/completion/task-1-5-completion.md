# Task 1.5 Completion: Scaffold `.kiro/settings/mcp.json` in init.ts (Gap 5)

**Date**: 2026-05-07
**Task**: 1.5 Scaffold `.kiro/settings/mcp.json` in init.ts (Gap 5)
**Type**: Implementation
**Status**: Complete

---

## Artifacts

- **Modified**: `src/cli/init.ts` — added new step 8 in `runInit()` invoking new `scaffoldMcpConfig()` helper; renumbered final "Next steps" message to step 9

---

## Implementation Details

### New Helper: `scaffoldMcpConfig(templatePath, destPath)`

Reads the canonical template from `src/cli/templates/mcp-config.json.template` (created in Task 1.1) and applies one of three behaviors based on destination state:

**Case 1 — Destination doesn't exist**: Create by copying the template verbatim. Output:
```
✓ Created .kiro/settings/mcp.json (designerpunk-docs + designerpunk-application)
```

**Case 2 — Destination exists, no DesignerPunk entries**: Merge — add `designerpunk-docs` and `designerpunk-application` to existing `mcpServers` object; preserve consumer's other MCP entries. Output:
```
✓ .kiro/settings/mcp.json: added designerpunk-docs + designerpunk-application
```

**Case 3 — Destination exists with one or more conflicting entries**: Partial merge — add DesignerPunk entries that aren't already present; skip conflicts with prominent warning. Output:
```
✓ .kiro/settings/mcp.json: added designerpunk-application
  ⚠️  .kiro/settings/mcp.json already has 'designerpunk-docs' entry; left unchanged. If outdated, delete the entry and re-run init, or update manually.
```

**Edge cases handled**:
- Template missing → warning emitted, function returns (defensive; shouldn't happen since Task 1.1 adds template to `files` array)
- Template is invalid JSON → warning emitted, function returns
- Destination exists but isn't valid JSON → warning emitted, function returns (leaves consumer's file unchanged)
- Destination has no `mcpServers` key → initializes empty object, proceeds with merge

### Key Decisions

**Static-path template over scaffold-time substitution**: Matches Task 1.1's design. The template file's paths (`./node_modules/@3fn/core/dist/mcp/docs-mcp.js`, etc.) work verbatim for any consumer repo since they resolve against CWD. Zero runtime transformation, zero risk of path-substitution bugs, single source of truth.

**Partial merge over all-or-nothing**: When Case 3 hits (consumer has a conflicting entry), we still add the OTHER DesignerPunk entry if it's not conflicting. Example: consumer has custom `designerpunk-docs` but no `designerpunk-application` → we skip docs with warning, add application. This maximizes value delivered to the consumer while respecting the "never clobber consumer customizations" principle. The prior-art alternative — skip-all-if-any-conflict — would leave the consumer without the application entry until they manually resolve the docs conflict.

**Rewrite destination file via `JSON.stringify(..., null, 2)`**: 2-space indentation matches the canonical template's formatting and conventional `.kiro/settings/*.json` style. Preserves consumer's other entries exactly as they were (pass-through JSON object mutation, re-serialized).

**Step numbering**: Inserted as new step 8, pushing "Next steps" console.log to step 9. Preserves the readable "1, 2, 3, ..." progression in init output.

### Validation

Ad-hoc scratch-repo functional test of all three cases (fresh tmp dirs):

| Case | Initial `.kiro/settings/mcp.json` state | Init output | Final `mcpServers` keys |
|------|---------------------------------------|-------------|------------------------|
| 1 | doesn't exist | `✓ Created .kiro/settings/mcp.json (designerpunk-docs + designerpunk-application)` | `designerpunk-docs, designerpunk-application` |
| 2 | `{mcpServers: {some-other-mcp: {...}}}` | `✓ .kiro/settings/mcp.json: added designerpunk-docs + designerpunk-application` | `some-other-mcp, designerpunk-docs, designerpunk-application` |
| 3 | `{mcpServers: {designerpunk-docs: {args: ['/custom/experimental/docs-mcp.js']}}}` | `✓ .kiro/settings/mcp.json: added designerpunk-application` + ⚠️ warning | `designerpunk-docs` (custom path preserved), `designerpunk-application` (newly added) |

Full test suite: ✅ 325 suites / 8,281 tests pass post-change.

### Integration Points

- **Depends on Task 1.1's canonical template** — `scaffoldMcpConfig` reads `src/cli/templates/mcp-config.json.template` which must exist
- **Closes Gap 5 from consumer-onboarding-gaps.md** — `npx designerpunk init` now produces a working MCP config out of the box; consumers don't need to hand-author the file
- **Composes cleanly with Gap 4 (Task 1.8)** — both Gap 4 and Gap 5 pull from the same canonical template, so the Integration Guide's documented example and the scaffolded file are guaranteed to match
- **Enables Task 1.6 integration test** — test can create scratch repos in each of the three states and assert the correct output + final file contents

### Notes

**On the ⚠️ emoji in warnings**: Matches the existing convention in the MCP docs (`⚠️ ...` used in other consumer-facing warnings). Standardizing on this symbol for "your attention is needed but we didn't break anything" class of message.

**On the "If outdated, delete the entry and re-run init" guidance**: Intentionally direct. When a consumer sees the warning, they have two valid responses — keep their custom entry (do nothing) or replace it with our canonical version (delete + re-run). The warning message gives them the second option without being paternalistic about which choice is right.

**What's NOT in scope for this task**: re-running init after deleting a conflict entry. The delete-and-rerun flow works because Case 2 would then apply (no DesignerPunk entry present), but we don't prescribe or test that workflow — it's the consumer's choice whether to take it.
