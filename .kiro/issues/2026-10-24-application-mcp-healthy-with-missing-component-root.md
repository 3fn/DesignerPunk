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

## Outcome (2026-10-25)

**2026-10-25 — Lina (owner): RESOLVED-pending-merge, branch `fix/release-16.1.0-floor-lina`, in the commit that adds this line.** Authority: Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)" (release 16.1.0 walk, Floor batch line 5: items 1–5 before S).
- **Item 1.** `IndexComponentsOptions` takes `rootSources` (parallel to the root set) and `envVarName`. `DataPaths` carries them from `resolveComponentRoots`'s `sources` and the bootstrap's `componentsEnvVarName`. A missing `env` root pushes `missingEnvRootWarning(...)`: "COMPONENTS_DIR points at <path>, which does not exist, so your own components are not indexed; only DesignerPunk's are. Point it at src/components (the default), or remove it." Health is then `degraded`. The "only DesignerPunk's are" clause is dropped when no other root exists, since it would then be false. The record's resolver (`mcpDataRoots.ts`, Ada's) is unchanged.
- **Item 2.** The boot log prints the same line, `[mcp-component-server] WARNING: <line>`, after "Indexed N components". Seen live on the built `application-mcp-server/dist/index.js` with `COMPONENTS_DIR` set to a missing folder: "Indexed 34 components (1 warnings)", then the line.
- **Item 3, changed at application time.** As written, the item set `DEFAULT_COMPONENTS_DIR = 'src/components'` "matching C3". On reading C3, that was wrong. The constant runs only on the dev fallback, in a DesignerPunk checkout. That checkout is `package-mode` (`findDesignSystemRoot` on this repo), and there C3 gives the package root `src/components/core` and no `bornRoot/src/components`. So the old value already matched C3. Probed: `src/components` as a root degrades health with "Component directory has no schema.yaml: __tests__" and the legacy-level warning for `core/`. What landed: the constant is renamed `DEFAULT_PACKAGE_COMPONENTS_DIR`, with the reason in its comment, and the fallback now builds C3's set (the env value first, if set, then the package root; previously the env value was the only root) with its sources, so item 1 also works there.
- **Item 4.** `application-mcp-server/src/__tests__/missingEnvComponentRoot.test.ts`, 10 tests: a missing env root with the package root gives `degraded` and the exact text; `COMPONENT_DIR` is named when it set the root; an existing env root stays `healthy`; a missing default (`cwd`) root is not a warning; all roots missing gives `failed` without the false clause; a re-index over a now-existing root clears it.
- **Item 5.** `get_component_full` and `get_component_summary` carry the same line first in their `warnings` field, for a found name and a not-found name (both tested through `createTestableServer().callTool`).
- **Tests.** `application-mcp-server` suite (not in root `npm test`): 37 suites, 523 tests pass (was 36 / 513). Mutation check: six mutations (no health warning; `cwd` treated as `env`; the clause always on; either query-engine path drops the line; the boot-log loop removed), and each turns at least one test red.
- **Residual (unchanged from the walk).** This discloses the missing root and does not repair the migrated config. The class closes with row 15 (`2026-10-24-migrated-mcp-config-keeps-pre-123-components-dir.md`, Ada's).
- **Archive.** Under rule 5, this record moves to `archive/` after the merge, at the next walk or in phase 1.
