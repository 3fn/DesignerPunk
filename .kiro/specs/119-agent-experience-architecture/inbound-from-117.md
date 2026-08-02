# Inbound from Spec 117 (Token-Index Generation Integrity) — for Spec 119

**Date**: 2026-06-24
**Status**: 117 complete & on `main`.

117's Task 6 (steering-doc updates via the ballot-measure process) was an unintended **live field-test of 119's core hypotheses**. Three data points:

## 1. Stale section IDs — "address by path+heading, not section ID" confirmed in practice

The Task-6 ballot drafted edits keyed on docs-MCP `sectionId`s. By the time edits were applied, **re-indexing had shifted the IDs** (e.g. OKLCH `s2→s3`, Component-Token `s15→s16`, Token-Quick-Reference Context-Resolution `s3→s7`). The edits had to be re-addressed by path + heading. This is concrete, fresh confirmation of the 119/121 principle that section addressing must be **stable (path+heading/parent)**, not ID-based — IDs drift on every re-index.

## 2. "Orientation in diagrams, reference in prose" → better `get_section` retrieval

The re-architecture (after 3 domain consults) converged on a structural principle worth folding into 119's redesign: the RSA ASCII diagrams were doing **two jobs** — *orientation* ("what exists") and *reference* ("how it works"). Splitting them (diagrams stay minimal; reference detail moves to prose/tables below, each under its own addressable heading) both reduced density **and** improves `get_section` retrieval (a logical unit gets its own heading rather than being buried mid-diagram). Evidence/rationale: `.kiro/specs/117-token-index-generation-integrity/completion/task-6-completion.md` + `task-6-ballot-proposals-v2.md` + the Ada/Lina/Leonardo consult verdicts.

## 3. Two steering docs were just restructured — redesign against their *current* state

`Rosetta-System-Architecture.md` and `Token-Quick-Reference.md` were edited (behavioral-accuracy + the structural principle above) and the docs index rebuilt. 119's redesign should start from their current `main` state, not a pre-2026-06-24 version.

## Also (delivery-completeness data point)

117 filed `.kiro/issues/2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md` — `get_token_details` serves the correct `themeVarying` flag but its `resolvedValue` doesn't apply per-mode semantic overrides (a token-index *format* limitation). Likely 119/121-adjacent (what the MCP can serve), flagging in case it informs the delivery-layer scope.
