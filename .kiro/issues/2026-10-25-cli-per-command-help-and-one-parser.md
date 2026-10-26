# The CLI's subcommands run when asked for help, and drop flags they do not know

**Date**: 2026-10-25
**Filed by**: Lina, under rule 10, from the 16.1.0 trio's R1-15 (`tests/onboarding-trio/records/16.1.0/trio-1-backend.md` L368), routed to me by the orchestrator. Also the home of release-4 rulings item 24, which had none.
**Owner**: Lina (`src/cli/`). **Consulted when the fix opens**: Thurgood, for the packed-bin smoke lane's CI wiring (rulings item 24 puts it in his standing lane scope).
**Class**: P3 improvement · owed-act *(set 2026-10-25, Lina, rule 12. No served text is false: the global `--help` line says "Show this help" and that is what it does. Per-command `--help` is missing, and unknown flags are dropped without a word; both are defects in how the CLI reads its arguments, and the owed act is the one parser Peter ruled on 2026-10-15. Residual, stated plainly: a P3 `manual` record still unfired at two walks is archived stale (rule 5), and that would leave rulings item 24 with no live home again. If Peter wants item 24 held to a release, he re-classes it; I do not claim P2 for it, because no reader is misled and no guard claims more than it holds.)*
**Trigger**: `manual` — the event that owes the close is the merge of the CLI PR that gives every subcommand one argument parser (C1 and C2 below, rulings item 24). Items C3 and C4 close in that PR or are re-ruled here at its merge.

---

## What was seen (16.1.0 trio, run 1)

Dana ran `npx designerpunk init --help`. It ran `init`. Off a terminal it refused for want of a name and wrote nothing ("❌ init needs --name and --abbreviation … Nothing was written."). In a terminal it would have printed the harness notice and asked "Product name:", the first step of a birth into the current directory. **Not run in a terminal**; the in-terminal path is read from source.

## Verified in source (Lina, 2026-10-25, worktree at `c543bc29f`)

- `src/cli/designerpunk.ts` `main()` (L50–95) handles `--help` and `-h` only as the command itself (L89–91). Every other command gets its flags and nothing looks for `--help` in them.
- Four parsers, each its own loop, each silently skipping what it does not know: `parseInitArgs` (`src/cli/init.ts` L441–480), `parseAttachArgs` (`src/cli/attach.ts` L85), `parseSyncArgs` (`src/cli/sync/index.ts` L262–281), and `generate`'s `flags.includes(...)` checks (`designerpunk.ts` L54–58). So `generate --help` runs `generate`, `sync --help` runs `sync`, and a mistyped flag (`--dryrun`) is dropped without a word. `parseAttachArgs` also reads only `--target=<t>`, so `attach --target cc` (the space form `init` and `sync` accept) drops the target without a word: item 24's "`--x=v` and `--x v`" is still owed there.

## Items

- **C1 — one argument parser for every subcommand** (rulings item 24, first half: `--x=v` and `--x v`, one place). It knows each command's flags, prints that command's usage on `--help` / `-h` and exits 0 without doing anything, and refuses an unknown flag with the command's usage, writing nothing.
- **C2 — one `ask()`** that refuses off a terminal and names the flag (rulings item 24, second half), replacing `prompt()` and `confirmReScaffold`'s own check in `init.ts`; and the **smoke lane on the packed bin with stdin held open** (item 24, third part; CI wiring is Thurgood's).
- **C3 — the global help's config pointer** (the residual of U5 row R3-4 (CLI)): "See the DesignerPunk repo's designerpunk.config.ts for an example" (`designerpunk.ts` L576) points to a repo a consumer does not have. `init` writes `designerpunk.config.ts` into theirs; the line should say so.
- **C4 — the notice before an empty answer** (the residual of U5 row R3-3): in a terminal, a founder who answers the name prompt with nothing sees the harness notice and then "❌ Name and abbreviation are required." (`init.ts` L194, then L199 and L206). C2's `ask()` refuses an empty answer at the prompt, so the notice no longer comes before a failure. Not observed in any run.

## Carried rows this record is the home of

The U5 findings record (`.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 2) carries rows whose cells read "Trigger: Lina's CLI follow-up", a vehicle no record held: **R2-4**, **R1-1 / R1-2 (code)**, **J-3 / K-5 (code)**, **R1-5 (code)** and **FR-2**. Their cells, and the release-6 walk's reading of them, stay in that record. This record is where their vehicle is named: each is fixed in the C1 PR or re-ruled here at its merge.

## Not in this record

- How `init` explains "abbreviation" (Dana read `dist/cli/init.js` to find out). That is FR-2's neighbour and goes with it.

*Signed: Lina, 2026-10-25.*
