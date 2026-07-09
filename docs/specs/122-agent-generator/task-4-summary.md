# Task 4 Summary — Registry generator (Spec 122, U1)

**Status**: Done on branch `task/122-substrate` (parent inside unit U1; accepted at U1's merge, Task 8).
**Date**: 2026-07-09

Built the master tool registry generator (design C5): `registry.ts` spawns all three MCP servers from their compiled entries over stdio (`initialize` + `tools/list`), hashes each tool's input schema through the canonical serializer, and emits `canonical/registry/tool-registry.json` — servers and tools sorted, no timestamps, pure assembly separated from I/O. A boot failure throws loud; no cached-registry fallback exists. Importing the module never introspects (`require.main` guard).

**Registry contents**: application 21 tools · docs 8 · product 14.

**Both design proofs recorded on live cases**: the product MCP's index is empty in this repo yet all 14 tools still declared and generated (index-agnostic, Req 7 AC2); two real generation runs produced byte-identical output (the C6 determinism precondition). The docs-server list was independently truth-checked against a direct live introspection from earlier in the session — exact match, retired `get_documentation_map` absent.

**Validation**: agent-generator lane 129/129; full `npm test` 8987/8987; tsc clean.

**Execution**: one Sonnet subagent, main-loop (Fable 5) verification including the independent registry truth-check.

**Forward**: the registry is now the 125 tool-boot-smoke manifest-in-waiting (125-A Task 9's deferred handback can collect it); it becomes a diff-guarded surface at 122 Task 6.
