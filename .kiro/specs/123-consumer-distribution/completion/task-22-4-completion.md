# Task 22.4 Completion — the release-3 CHANGELOG entry, the lock refresh, the no-overlap re-run, full validation

**Date**: 2026-10-13
**Agent**: Lina (Sonnet) · PRIMARY, Task 22
**Branch**: `task/123-u3-onboarding`, after U3 merged `main` (`581862904`, with U3g `31a8c9194` and U3c). **Instruments block**: `completion/task-22-instruments.md` (rows 7.2, 7.3, 18.1, 19.1, 19.2, 20.1–20.4 are this subtask's).
**Delegated-tier**: plan held (subtask; no parent line owed).

## What changed

- **`canonical/generated.lock`** (its own commit, `fd53431e6`, "Lock refresh after U3 merged main (22.4)"): the guard's own write from a clean tree after the merge. `git diff` shows **only `inputClosure` moved** (`81fdcddb…` → `861e029a…`); **`outputs` did not move**, so no path outside `canonical/_consumer-output/**`, `.claude/agents/**`, `.kiro/agents/**` moved, and the "outputs moved → stop" rule did not fire. A second guard run after the CHANGELOG and test edits printed `no-op-green`.
- **`CHANGELOG.md`**: a `## [Unreleased] — planned Release 3 (…)` entry above 15.0.0, following the label rule (releases are not renumbered; the entry is the Nth planned one, "Release N" labels the Nth planned entry). Its first paragraph is the scope sentence, verbatim. It carries the **`CHANGELOG-HOLDS`** block from `completion/g2-cycle-2-consequence-texts.md` § 5, **byte-equal** (the verdict is HOLDS at `31a8c9194`), and **not** `CHANGELOG-LIFTED`. It names the `initBornRepoMessage` fix. Sections: Added, Changed, Fixed, Known limitations.
- **`scripts/__tests__/install-doc.test.ts`** (Peter's O-2): the scope sentence is asserted as the entry's first paragraph (identical to the install doc's); one planned-Release-3 entry exists, above 15.0.0; `CHANGELOG-HOLDS` is contained exactly once, byte-equal, read from the consequence-texts file at run time, and `CHANGELOG-LIFTED` is absent; the born-repo "(generate creates it; your agent can walk you through it)" fix is in the entry and in `initBornRepoMessage`. **Bites** (made, run red, restored): altering the scope sentence in the entry → red; altering one word of the HOLDS block → red.
- `tasks.md`: 22.4 ticked.

## The no-overlap test, re-run, widened to Task 29's declared input set (`task-29-4-completion.md` § "The declared input (trigger) set")

Merge base is `origin/main` = `31a8c9194` (U3 merged `main`, so the diff is U3's own net delta).

```
$ git diff --name-only $(git merge-base HEAD origin/main) HEAD -- canonical/profiles/consumer canonical/operative-sets canonical/agents canonical/shared canonical/consumer-profile.yaml canonical/_consumer-output tools/agent-generator .kiro/steering
(prints nothing)

$ git diff --name-only $(git merge-base HEAD origin/main) HEAD -- <the above> .kiro/steering/{AI-Collaboration-Principles,Agent-Directory,Civitas-System-Overview,DesignerPunk-Systems-Overview,Spec-Feedback-Protocol,Task-Completion-Protocol,core-goals,start-up-tasks}.md package.json .github/workflows/lane-timing.yml
package.json
```

- **The original set prints nothing.** The widened set prints **one path: `package.json`**. Task 29 added it to the set as a wiring file because the `test:agent-generator` script lives there (`task-29-4-completion.md`, "(added: the wiring)").
- **What the hit is**: `git diff 31a8c9194 HEAD -- package.json` is two lines in `files[]`, `"docs/consumer/INSTALL.md"` and `"docs/consumer/COMMIT-POLICY.md"` (Task 22.3b, Ada, planned and ruled). The `scripts` block, including `test:agent-generator`, is unchanged, and `lane-timing.yml` is untouched.
- **I have not waived it.** The criterion reads "Red: any path printed. A red holds 22.5." So by the letter this row is **red**, for a reason that is not the one the trigger set names. The hold is the orchestrator's and Stacy's to lift; the resolution options are (a) the wiring entry is read as the `scripts` block only, (b) a dated amendment narrows `package.json` out of the set for U3's packaging edit. Neither is mine to pick. ⚠️ recorded here; nothing else in the 22.4 work depends on it.

## Validation (local; the tree carrying the 22.4 commit)

- `npx tsc --noEmit` → 0. `npm test` → 395 suites, 9550 passed. `npm run test:scripts` → 18 suites, 408 passed. `npm run test:agent-generator` → 59 suites, 1686 passed (including `consumer-entry.parity.test.ts` and the freshness sweep, now clean). `npm run test:consumer` → 53 passed, 1 skipped. `npm run check:122:diff-guard` → `no-op-green`. `npm run check:completion-criteria-parity` → 26 evaluated, 26 pass.
- **Non-root lanes run**: `mcp-server` jest 37 suites / 612 passed; `application-mcp-server` jest 31 suites / 432 passed; `npm run test:pack-contents` → **103/105; 2 FAIL**: `dist/mcp/application-mcp.js` and `dist/mcp/docs-mcp.js` "resolves every module from the root node_modules/ (nested roots)". These are two of the three pre-existing contamination-class failures Task 20 recorded (the in-repo-`generate` class, `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`); the third (62 dist leftovers) did not reproduce in this clean worktree. Not chased.
- **Not run**: the standalone `product-mcp-server` suite (inside the root `npm test` roots).
- A first `npm test` run on this tree hit six timing-sensitive Button-Icon / Button-VerticalList-Set property-test failures under load; the same 14 suites pass in isolation and the full rerun was clean (9550). Flaky under load, not related to this diff.

## #312 (the Settings-screen scratch consumer's birth friction): the eight findings, as dispositioned (the orchestrator is asking Peter on 2 and 8)

| # | Finding | Disposition | Asserting test |
|---|---|---|---|
| 1 | Build leaves ` M docs/tokens.css` (a `Generated:` timestamp) | **Not U3's.** Reproduced on this tree; a generator/known-build-noise class (the timestamp defect, #300 item 2), Ada's side. | — |
| 2 | `init` has no abbreviation default | **Held for Peter.** The one-line install-doc fix (step 2 naming `init --target=… --name=… --abbreviation=…`) is Thurgood's at Task 19's close, no plan change; a code default is new behaviour needing a dated amendment. | — |
| 3 | Guide's install step names the wrong registry scope | **Fixed on U3** (Task 19). | `scripts/__tests__/install-doc.test.ts` › "stale-scope zero counts (C11), active" and the flipped "the guide: zero `npm.pkg.github.com` and zero `@designerpunk:`" / "docs/consumer/INSTALL.md exists, with zero stale-scope strings" |
| 4 | Guide's MCP step covered only Kiro, two servers | **Fixed on U3** (19.4: "The files `init` and `attach` write"). | `tests/consumer-integration.test.ts` › "the MCP config and approval keys are present and recorded in the manifest" (all three servers per target) |
| 5 | `init`'s next steps began at `npm install` | **Fixed on U3** (22.2 and the 19.5 second pass: the list begins at `generate`; the jest line is optional). | `src/cli/__tests__/errorCatalog.test.ts` › "init next steps: list positively…" and "the ONE case for an install step"; `init.test.ts` › "the next steps are the catalog function's output…"; the packed `init` case in `tests/consumer-integration.test.ts` |
| 6 | Generated `product/overview.yaml` not valid YAML (highest severity) | **Fixed on U3** (22.3: Leonardo's valid overview, name substituted and escaped). | `src/cli/__tests__/productScaffold.test.ts` (the substituted overview parses back to any name; the guard); `tests/consumer-integration.test.ts` › "PRODUCT GUARD …" (status `healthy`, warnings `[]`, one screen, one template, before `generate`) |
| 7 | `TOKEN_INDEX_DIR` set but absent before `generate` | **Not U3's.** No change needed: on the documented path the restart row is last, so `generate` has run before any server starts, and the message already says "unset it, or run generate" (`errorCatalog.ts` `explicitTokenIndexMissingMessage`). | — |
| 8 | Readiness wrong in a consumer (web `not-started` everywhere) | **Held for Peter.** Cause verified: `application-mcp-server/src/indexer/ComponentIndexer.ts:810-859` derives readiness from file presence (`.web.ts` etc.); the package ships no web source. Needs a dated amendment (indexer or shipped readiness data); mine and Ada's. | — |

## Claims, and what each rests on

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | The lock refresh moved `inputClosure` only | `git diff` of `canonical/generated.lock` at `fd53431e6`; the guard's `full-run-green (input-closure-changed)` then `no-op-green` | VERIFIED-CODE |
| 2 | The release-3 entry's first paragraph is the scope sentence, and it carries `CHANGELOG-HOLDS` byte-equal | `CHANGELOG.md`; `install-doc.test.ts` (3 cases + 2 bites) | VERIFIED-CODE |
| 3 | The entry's statements about behaviour (`init`, `sync`, `generate`, the note, the scaffold) are true | each is a behaviour built and tested in Tasks 20–22 (their completion docs' claims tables) | VERIFIED-CODE (by those tables); the prose is mine and was not independently re-read by an owner |
| 4 | The two "Known limitations" are real in this version | the timestamp lines (`TokenFileGenerator.ts:307,382,461`); the preset's unshipped mapped files (reproduced against the packed tarball in my 19.4 review) | VERIFIED-CODE |
| 5 | The widened no-overlap set prints nothing | — | **⚠️ red by the letter: prints `package.json`** (reason and options above); original set prints nothing |

## Notes

- **Not in the entry on purpose**: the `generate`-prints-✅-after-an-override-abort defect (Ada's report; I did not verify it), and the intentional-removal case for the `.gitignore` block (open with Peter). If either is fixed or ruled before the tag, release-prep edits the entry.
- **Counter-argument and residual**: a CHANGELOG entry written by the implementer describes what the implementer built; a reader at release-prep (Thurgood, Ada) is the independent check on the prose, and none has read it yet.
