# Obligation: the `cannot-tell` cells in Spec 123's U5 records (exited at Task 28.4, criterion C8)

**Date**: 2026-10-15
**Status**: ACTIVE
**Owner**: **Leonardo** (rows 1–4: the trio's operator; the class fix for each is an instrument change). **Ada** (row 5).
**Trigger**: `release:next:phase-1` — release 5's prep (the first release trio run after 16.0.0, the firing event of `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`): rows 1–4 are re-observed there or the record says why not; row 5 (Ada) is attributed and carried to the same release. *(was: rows 1–4 — **the first release trio run after 16.0.0** (the firing event of `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`): each row is re-observed there, or its record says why not. Row 5 — **release-4 prep** (an `npm audit` of the candidate alone is minutes).)*
**Class**: P2 obligation (record) · owed-act *(set 2026-10-20, Leonardo, rule 12. The cells are honest `cannot-tell` values, so no reader is misled and the guard is not weaker than its claim; what is owed is the re-observation and its recorded line.)*
**Source**: Task 28 criterion C8 ("any `cannot-tell` / not-observed-cold cells" exit as committed records with owner and trigger). Read as: every U5 record cell whose value is `cannot-tell` or "not observed cold" (instruments block O-8). The cold-observation table (`validation/cold-observation-table.md`) reads **observed** in all four cells and has **no** "not observed cold — state not clean" cell, so every row below is a `cannot-tell`.
**Grant paths**: none.
**Consulted**: none needed — a listing of committed cells with their committed routes.

---

| # | Cell | Record (path:line) | Why it cannot tell | Covered elsewhere? | Exit |
|---|---|---|---|---|---|
| 1 | `cold-observation: kiro founder-cold: cannot-tell` | `.kiro/specs/123-consumer-distribution/validation/trio-2-designer.md` L177 | The first open's `script` capture was overwritten by a second open (R2-9) | **Yes, for the table**: `trio-3-pm` F16 observed kiro founder-cold, and the table counts that run (`cold-observation-table.md` footnote 3). The protocol now gives every interactive session its own capture file (§ 11) | Closed for coverage. The cell itself stays `cannot-tell` — a record is not rewritten. Re-observed at the next Kiro founder run as a matter of course |
| 2 | The personal note at session start: `cannot-tell` | `validation/trio-2-designer.md` L183 | Kiro loads the note as an agent resource; nothing in the Kiro transcript shows it was read | No | Next Kiro trio run: record whether the note loaded (the Kiro equivalent of CC's `/context` memory-file count), or say why it cannot be observed |
| 3 | probe-sparky `get_component_full` → result content `cannot-tell` | `validation/trio-2-designer.md` L232 | kiro-cli 2.12.1 prints tool calls, not tool results (R3-7) | No | Next Kiro trio run: a capture that shows tool results (a kiro-cli flag or log, if one exists), or the cell is recorded `cannot-tell` again with the same reason — the instrument limit stated, not hidden |
| 4 | probe-leonardo `get_product_overview`, `find_screens`, `get_design_philosophy` → result content `cannot-tell` | `validation/trio-3-pm.md` L265–267 | As row 3 (R3-7) | **For Task 28.3's bar, yes**: 28.3 runs its own consumer-Leonardo session on Claude Code, whose `stream-json --verbose` captures tool results (`validation/product-query.md`; prompt `validation/prompts/product-query-leonardo.md` @ `67275cfee`) | The Kiro-side observation: as row 3 |
| 5 | `npm install` "37 vulnerabilities (3 low, 5 moderate, 29 high)" — attribution `cannot-tell` (R1-14, J-6) | `validation/trio-1-backend.md` L291; `validation/join-cc-to-kiro.md` L58, L241 | The count includes the fixture's own `jest`, `ts-jest` and `typescript` | No | **Ada**: `npm audit` of the candidate tarball installed alone in an empty project, at release-4 prep; the result attributes the count (ours / the fixture's) and goes in this file |

## Walk

At each monthly health check: has the first release trio after 16.0.0 run? If yes, does its record carry a line for each of rows 2–4? Row 5: is the audit result appended below? **Fired without the line = finding.**

## Outcomes

*(appended by the owners)*

- **Row 5 — attributed** *(2026-10-15; Ada's attribution, ruled with Peter's release-4 rulings item 15, `.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md`; written by Thurgood in the release-4 records PR)*.
  - **The 37 `npm install` vulnerabilities**: 2 low are DesignerPunk's own dependencies, `diff`, and esbuild via `tsx`. The rest come from the fixture's own `jest` chain. The cell's `cannot-tell` is resolved by this attribution; the record cells stay as written.
  - **Bundled code `npm audit` cannot see**: the MCP bundles inline three libraries that carry advisories: `@modelcontextprotocol/sdk` 1.29.0 (an advisory against its OAuth client), `fast-uri` 3.1.3 and `js-yaml` 4.2.0. None of the three bundles contains the sdk's OAuth client: they use the stdio transport only.
  - **The class**: a consumer's `npm audit` cannot see bundled code, because inlined libraries are not in the dependency tree it reads. So neither the 37 count nor a clean audit says anything about the three advisories above.
  - **Disposition**: carried to release 5 with this record. The remedy is Ada's to name there. Nothing here blocks 16.0.0 (rulings item 15).

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 72, call BACK-FILL (Leonardo))**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `release:next:phase-1` · `P2 obligation (record) · owed-act`.

## Co-owner line (2026-10-25, Ada, rule 9): row 5's remedy at 16.1.0

Found in the 16.1.0 walk (row 18). Row 5 has two remedies. They are separated here so the row has one open act.

- **Open act, minutes, at 16.1.0 release prep**: run `npm audit --omit=dev` on the root tree (the tree `build:mcp`'s esbuild bundles from; package.json L149) and on the lockfiles of the two servers. Append the result below, at S, naming the tree each count came from. Bump any inlined library that has a fixed version before tagging. The lockfiles disagree on `js-yaml` (4.2.0 root, 3.14.2 in `mcp-server`, 4.1.1 in `application-mcp-server`), so the run states which tree the bundle actually resolves.
- **Moved to its own record**: the bundle manifest (`dist/mcp/bundled-packages.json`, written from esbuild's metafile) is `.kiro/issues/2026-10-25-mcp-bundled-packages-manifest.md` (P3, `manual`). This row closes on the audit result appended, not on the manifest.

*Signed: Ada, 2026-10-25.*

## Owner line (2026-10-25, Ada, rule 9): ruling cite for row 5

On Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are now committed in this record.* Read against the 16.1.0 walk (row 18, row 5). The ruling is **the audit at release prep**, as the co-owner line above already states: `npm audit --omit=dev` on the root tree and the two servers' lockfiles, result appended at S, naming each tree; any inlined library with a fixed version bumped before tagging. The bundle manifest stays in its own P3 record. Trigger unchanged, `release:next:phase-1`.

*Signed: Ada, 2026-10-25.*

## Owner line (2026-10-25, Leonardo, rule 9): rows 1–4 discharge at the 16.1.0 Kiro runs

On Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are now committed in this record.* Under (A) the trio runs before S (`.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`, owner line of the same date). **Rows 1–4 discharge at the 16.1.0 Kiro runs: trio-2 and trio-3 are `kiro`.** Each of rows 1–4 gets its line in those records:

- **Row 1**: re-observed as a matter of course at the Kiro founder run; each interactive session has its own capture file (protocol section 11).
- **Row 2**: record whether the personal note loaded, or say why it cannot be observed.
- **Rows 3–4**: try `kiro-cli chat -v` in one session. If it shows tool results, record them. If not, record `cannot-tell` again with the same reason; the instrument limit stated, not hidden.

This is not a first lapse: the cells are read at the runs ruled for before S. **Row 5 is not changed here** (Ada's, `2026-10-25` owner line above). The Trigger token `release:next:phase-1` is unchanged; it follows the trio record's re-token.

*Signed: Leonardo, 2026-10-25.*

