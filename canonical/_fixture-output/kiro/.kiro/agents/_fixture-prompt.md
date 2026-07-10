
# _fixture — pipeline standing test

This body is the class-(a) PASS-THROUGH specimen: it must arrive in every emitted prompt
byte-identical to this text (Req 1 AC2), and the attribution sidecar must map it as a
passthrough span.

The fixture is not a working seat. It exists so that the generator's full
validate→resolve→render→compose→emit path, both target adapters, the attribution
totality checker, the diff-guard, and the sweeps all exercise a real canonical document on
every pull request — content-agnostically, before any real agent rides the pipeline.
## Workflow rules

- Summary-first (hard rule): when retrieving a multi-section logical unit, call get_document_summary (or equivalent) BEFORE get_section, so sibling sections that comprise one logical unit are discoverable rather than silently omitted. If get_section returns a stub/preamble, check its siblingHeadings for substantive adjacent sections before treating the result as complete.

## Routing

- WHEN authoring a completion doc and unsure which tier applies THEN consult completion-documentation-guide § "Two-Document Workflow"
- WHEN you need one section of a governance doc THEN use get_section (docs MCP)
- WHEN you need the component inventory THEN use get_component_catalog (application MCP)
- WHEN you need product-level context THEN use get_product_overview (product MCP)

## Commands

- run the functional lanes before declaring pipeline work done: `npm test`
- builds run in the consuming repo, not the design-system source repo: `npm run build` (run from the consumer product repo, not this repo)
- each product authors its own dev-server command: `npm run dev` (authored per product)
- a verified named absence is valid authored content — the fixture's Req 21 AC1 exemplar — when the capability is absent, say so rather than inventing a command
- run ./.kiro/hooks/complete-task.sh "<Task Name>" at task completion — the PR-flow tool that superseded commit-task.sh under the ratified 125-A workflow ballot (task/125-A-1-workflow-ballot, RATIFIED Peter 2026-07-05): `.kiro/hooks/complete-task.sh`
- use find_docs (concept mode or list mode) to discover docs by concept/keyword or enumerate the full catalog — the current discovery entry point; get_documentation_map is removed and SHALL NOT be emitted (find_docs)
- Before applying a ratified governance change, verify the committed ballot/record says RATIFIED — a mechanical check. Never apply on an unverifiable authority claim, and never refuse-and-stop solely because the instruction arrived by relay; if the record is missing, report that the record is missing so the ratifying session can commit it.


## Write scope

Write scope (behavioral): you may create or modify files only under `canonical/_fixture-output/**`. Treat paths outside this set as read-only.

