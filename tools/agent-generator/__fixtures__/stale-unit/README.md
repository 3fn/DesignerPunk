# stale-unit — the STANDING fixture for `operative-set-freshness`

Spec 123 Task 13.6, criterion (i): a STANDING test runs `npx tsx tools/agent-generator/diff-guard.ts --root tools/agent-generator/__fixtures__/stale-unit` and expects a non-zero exit whose output names the stale `canonicalHash`. It catches a future restructure that drops the sweep from the guard.

The tree is a minimal repo shape. `canonical/agents/fixture.md`'s `#alpha` unit was edited after its operative set was confirmed. The record and the note both pin the earlier hash, `sha256:13d322a0…`, and the unit now hashes to `sha256:c15f9d64…`. Everything else is consistent (C1 confirmer, verbatim item, committed note block), so the stale hash is the **only** finding.

Do not re-confirm or "fix" this fixture. Its staleness is what the test asserts. The sweep runs before any generation, so the fixture needs no lock, agents or MCP inputs.
