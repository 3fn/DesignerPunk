# The application MCP reports "healthy" when its consumer component root is missing, and silently serves the package's components in place of the consumer's forks

**Date**: 2026-10-24
**Owner**: Lina (`application-mcp-server/**` is in her standing write scope)
**Class**: P0 false-claim · defect *(set 2026-10-24, Lina, rule 12. My reading: two MCP responses are false where an agent reads them, which is the P0 definition in ballot `2026-10-18-obligation-drain-and-release-falsity-floor` M7 ("an MCP contract or response"). `get_component_health` answers `"healthy"` while the root it was configured to read does not exist, and `get_component_full` answers for a name the consumer forked with the package's component, not hers. Only Peter downgrades a P0; Stacy may dispute the reading.)*
**Trigger**: `release:next:phase-1` — the fixing PR merged before the next release's RELEASE phase 1. Being P0, this record is a floor-class row at that release's walk: fixed, or carried to Peter in the walk's batch.
**Source**:
- test01 upgrade rehearsal, 12.0.5 → 16.0.0, 2026-10-24: Spec 131 evidence `.kiro/specs/131-governance-simplification/evidence/2026-10-24-test01-upgrade-rehearsal.md`, **F-8** (second bullet: "Application MCP has `COMPONENTS_DIR=./src/components/core`, a folder the same run deleted. Health says `"healthy"`, it falls back to package components, and it never sees the consumer's forks"), step 11, and "Bottom line" item 6.
- Lina's code read, 2026-10-24, at `e4e61eea2`.
- Related: `2026-10-24-migrated-mcp-config-keeps-pre-123-components-dir.md` (why the root is missing after a migration; Ada's).

---

## What happens

After `sync --migrate-components` removes `src/components/core/` and relocates the consumer's forks to `src/components/<Name>/`, a migrated MCP config still sets `COMPONENTS_DIR=./src/components/core` (the related record). The application MCP then:
- builds its component root set as that env root plus the package root (`src/cli/shared/mcpDataRoots.ts` `resolveComponentRoots`, L194–203: an env value is the consumer root, used as given);
- drops the missing env root without a word (`application-mcp-server/src/indexer/ComponentIndexer.ts` L252: `roots.filter(r => fs.existsSync(r))`; the "Components directory not found" warning fires only when **every** root is missing);
- indexes the package's components, so `get_component_health` (`ComponentIndexer.getHealth`, L457–473) has a non-empty index, no warnings and no stale files, and answers `"healthy"`;
- never reads the forks, so every query for a forked name returns DesignerPunk's component.

The boot log names the root (`Data root components[0]: … (source: env)`), but stderr is not where an agent looks.

A stale constant sits beside this: `DEFAULT_COMPONENTS_DIR = 'src/components/core'` (`application-mcp-server/src/index.ts` L24). It is used only on the dev fallback path (the root `dist` is not built), never on a consumer's path, where the C3 default is `<bornRoot>/src/components`. It is not the cause here; it should match C3 anyway.

## The fix to make

1. When a consumer component root whose source is `env` does not exist, the indexer records a warning that names the variable, the path and the remedy, for example: `COMPONENTS_DIR points at <path>, which does not exist, so your own components are not indexed; only DesignerPunk's are. Point it at src/components (the default), or remove it.` `getHealth` is then `degraded` with that warning (the existing rule: any warning degrades).
2. The same line goes to the boot log.
3. `DEFAULT_COMPONENTS_DIR` becomes `src/components`, matching C3.
4. Tests in `application-mcp-server/`: a missing env root with an existing package root gives `degraded` and the warning text; an existing env root is unchanged (`healthy`); a missing **default** root (a born repo with no `src/components/`) is not a warning, since a consumer with no forks is normal.

Not in this record: the resolver (`mcpDataRoots.ts`, Ada's) needs no change; the warning belongs where the index is built.

## Owner line (2026-10-25, Lina, rule 9): RULED, items 1–5 before S

On Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". *Unverified here: chat only (chat, relayed). Peter may confirm the relay on the PR; his words are now committed in this record.* Read against the 16.1.0 walk (row 5). The adoption is of my recommendation: fix before S, items 1–4 as written in "The fix to make" and an item 5.
- **Item 5 (added today)**: while an env component root is missing, the `get_component_full` and `get_component_summary` responses carry the same warning in a field, so the false "healthy" is disclosed at the agent's meeting point and not only in `get_component_health`. Tests for it join item 4's.
- **Branch**: `fix/release-16.1.0-floor-lina` (shared with sub-row 3a's YAML and row 8). About half a day for items 1–5. After the code, the Application MCP `rebuild_index`.
- **Trigger**: stays `release:next:phase-1`. I change it to `merge:#<N>` when the fixing PR opens.
- **Surviving residual (unchanged)**: item 5 discloses the problem and does not repair it. The class closes only when the migrated config stops keeping the pre-123 `COMPONENTS_DIR` (Ada's record `2026-10-24-migrated-mcp-config-keeps-pre-123-components-dir.md`).

*Signed: Lina, 2026-10-25.*
