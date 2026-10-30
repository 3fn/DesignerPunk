# A migrated MCP config keeps the pre-123 `COMPONENTS_DIR=./src/components/core`, which points the application MCP at the folder `--migrate-components` deletes; `sync` never checks it

**Date**: 2026-10-24
**Owner**: Ada (`src/cli/**`, ballot `2026-10-17-standing-write-scope-six-roots` § 2.1)
**Consulted**: the paths a fix is likely to touch, `src/cli/shared/mcpConfig/**`, `src/cli/attach.ts`, `src/cli/sync/SteeringDirCheck.ts` and `src/cli/templates/mcp-config.json.template`, are shared with Thurgood under § 2.1 (j), so Thurgood is consulted on the fix.
**Filer**: Lina, 2026-10-24 (README rule 10). Rule 9 applies to every later edit: the body and the Trigger line are Ada's from here.
**Class**: P2 obligation (guard) · defect *(Accepted 2026-10-24, Ada, owner, rule 12: P2 `(guard)`, not P0, because the false all-clear is CLI output, which is not one of M7's P0 surfaces; the P0 reader-facing falsehood is the MCP health answer, in the related record. Set by the filer for the owner to confirm or change, rule 12. `sync`'s "up to date" check is weaker than what it claims: it never reads the MCP entries it leaves in place. The false MCP answers this causes are the P0 in the related record, `2026-10-24-application-mcp-healthy-with-missing-component-root.md`.)*
**Trigger**: `release:next:phase-1` — the fixing PR merged before the next release's RELEASE phase 1. *(Set 2026-10-24, Ada, owner, rules 1 and 9: accepted as the filer proposed; rule 1 gives a P2 that rides another change this token. As a `(guard)` P2, its first lapse goes to Peter (rule 11). Proposed by the filer.)*
**Source**:
- test01 upgrade rehearsal, 12.0.5 → 16.0.0, 2026-10-24: Spec 131 evidence `.kiro/specs/131-governance-simplification/evidence/2026-10-24-test01-upgrade-rehearsal.md`, **F-8** ("Migration leaves the MCP config stale and `sync` calls it up to date": "`COMPONENTS_DIR=./src/components/core`, a folder the same run deleted"; "The `COMPONENTS_DIR` problem gets no specific warning"), step 11 and step 11b (the repair that worked: delete the entries, then `attach --target=kiro`).
- Lina's code read, 2026-10-24, at `e4e61eea2`.

---

## Correction to how this was first framed

It was framed (orchestrator brief, 2026-10-24) as "the `COMPONENTS_DIR` default itself (`src/components/core`) is wrong for a post-migration consumer". **The consumer's default is not `src/components/core`**:
- with no `COMPONENTS_DIR`, the application MCP uses `<bornRoot>/src/components` (`src/cli/shared/mcpDataRoots.ts` L197–199, C3);
- the template that `init` and `attach` write today sets `"COMPONENTS_DIR": "./src/components"` (`src/cli/templates/mcp-config.json.template` L19).

The `src/components/core` value comes from a **pre-123 `init`**, which wrote it into the consumer's MCP config. Migration keeps it: `sync --migrate-legacy`'s attach step, like `attach`, leaves an existing `designerpunk-application` entry unchanged and prints `existingMcpEntryMessage` (`src/cli/shared/mcpConfig/kiro.ts` L136, `cc.ts` L76). Then `--migrate-components` deletes `src/components/core/`. The one place `src/components/core` is a default, `DEFAULT_COMPONENTS_DIR` in `application-mcp-server/src/index.ts` L24, is the dev fallback only; the related record aligns it.

## The fix to make (the owner's choice; options)

1. **Report it in `sync`.** Detect a `COMPONENTS_DIR` (or `COMPONENT_DIR`) in `.kiro/settings/mcp.json` or `.mcp.json` that names `src/components/core` or a directory that does not exist, and report it with the template's value as the recommendation, as `SteeringDirCheck.ts` does for `MCP_STEERING_DIR`. Also count it as pending, so the closing line is never the all-clear beside it: the R4 gate in `src/cli/sync/index.ts` (fixed 2026-10-24, the one-hop residuals record) takes a label for exactly this.
2. **Repair it in the migration.** When `--migrate-components` removes `src/components/core/`, or `--migrate-legacy`'s attach step meets a pre-123 `designerpunk-application` entry, rewrite that one env value (the npmrc and tsconfig repairs' shape: only that key, everything else kept), or offer a `--repair-mcp-config` flag.
3. Both: report always, repair under a flag.

Out of this record's scope, noted for the owner: F-8's sibling staleness in the same entries. A stale `MCP_STEERING_DIR` is already warned, with a remedy. A stale autoApprove list (tools no server provides, `find_docs` missing) is disclosed only in CHANGELOG 15.0.0.

*(2026-10-24, Ada, owner)* **Scope**: the fix includes the stale autoApprove list in the same entries (tools no server provides, `find_docs` missing). Without it, `sync` would still print the all-clear beside a stale config. At least option 1 applies to it: report it and count it as pending. Thurgood is consulted on the fix, as above.

## Owner line (2026-10-25, Ada, rule 9): RULED option 3, with an honest disposition

On Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are now committed in this record.* Read against the 16.1.0 walk (row 15).
- **Ruled**: option 3, report always and repair under a flag. The report covers the stale `COMPONENTS_DIR` and the stale autoApprove list (scope line above), counts both as pending, and the repair rewrites only those keys under the flag.
- **Disposition, stated plainly**: the fix goes before S **only after** the P0 fixes land: the born-repo index (row 2), the served-docs CORRECTION PR (row 3) and the selection-order ballot with its application (row 6). It is P2 `(guard)` and rides last, because the P0s block S and this does not. If those three consume the prep, this record **lapses at S** and its **first lapse goes to Peter** (rule 11, a guard) as spec / drop / fix-now; I would then choose fix-now, no later than the next S. I am not promising it before S.
- **Trigger**: unchanged, `release:next:phase-1`; it becomes `merge:#<N>` when the fixing PR opens, in that diff. Thurgood is consulted on the fix (§ 2.1 (j)).

*Signed: Ada, 2026-10-25.*

## Lapse (2026-10-29)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S). No ancestor of S closed or re-ruled this record: it is in Stacy's recount, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S", and no heading named this SHA. Appended by the walker at release 16.2.0's walk (`.kiro/issues/2026-10-29-release-16.2.0-walk.md`; rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else; the owner's disposition stands. Signed Thurgood (steward, rule 11), 2026-10-29.
