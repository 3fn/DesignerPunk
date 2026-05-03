# Ada Missing Application MCP Access

**Date**: 2026-05-03
**Source**: Spec 098 surface area inventory, Spec 099 Known Gaps
**Severity**: Moderate — Ada cannot verify token content served by Application MCP
**Owner**: Peter (agent config change)

## Description

Ada's agent config (`ada.json`) does not include Application MCP (`@designerpunk-components`) access. The Application MCP serves token query tools (`search_tokens`, `get_token_details`, `get_token_family`, `get_token_consumers`) that are squarely in Ada's content domain.

This means:
- Ada cannot programmatically verify token metadata served by the Application MCP
- Ada cannot audit whether the token index (437 tokens) is in sync with source token definitions
- Thurgood (Civitas steward) can monitor MCP health but can't verify token content accuracy

## Resolution

Add `"@designerpunk-components"` to Ada's `allowedTools` array in `ada.json`. One-line config change.

## Related

- Spec 098: `findings/surface-area-inventory.md` § "Application MCP Dual Role"
- Spec 099: design-outline.md § "Known Gaps"
