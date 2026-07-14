# Task 4.4 Completion: Console-Fail Hook + Allowlist + Promotion

**Spec**: 125-B-classification-map
**Task**: 4.4 — Console-fail hook + allowlist + promotion
**Type**: Implementation
**Agent**: Lina (Sonnet)
**Date**: 2026-07-14
**Status**: COMPLETE. Mechanism built (Lina), register-entry landing performed by Thurgood per the Task 4.1 steward convention — see "Blocked: Register Entries" below for the original hand-off, and "Steward Register Landing" at the end of this doc for what landed. **tasks.md checkbox marked `[x]`.**

---

## What Was Built

### 1. The allowlist — `src/__tests__/console-allowlist.json`

12 entries, `{ suite, pattern, reason }` grain (suite × message-pattern, per Req 11.1), one JSON object per line (churn counts parsed objects, not raw diff lines, per Req 11.3 / Design C8).

**10 entries seeded from PR #39's adjudications** (`bca8e0854b8537266fa8f0134ea84dede0d38de7`, "Silence intentional test console noise: 96 error + 72 warn blocks → 0 (#39)"):

| Suite | Class | Source |
|---|---|---|
| `Avatar.accessibility.test.ts` | Deliberate empty-alt decorative fixture (Req 9.2 / Req 5.4 tension) | `AvatarBaseElement: "alt" prop is required...` |
| `ChipBase.test.ts`, `ChipFilter.test.ts`, `ChipInput.test.ts` | jsdom stylesheet limitation (blend-color fallback warn, fires async via rAF) | `<Component>: Could not calculate blend colors` |
| `ErrorHandler.test.ts`, `ErrorHandler.integration.test.ts` | Deliberate error-path logging — the console output IS the behavior under test | `defaultLogger`/`formatErrorMessage` output shapes |
| `GapDetector.test.ts` | Deliberate error-path logging (disabled-gracefully assertion) | `gap detection disabled` |
| `ProductIndexerWalk.test.ts`, `Spec108-ProductTokens.test.ts`, `Spec107-DesignLanguageContext.test.ts` | Informational per-run indexing summary (not a failure signal) | `Indexed: N screens, ...` |

The Chip entries' reason text explicitly **discharges the pending jsdom-stylesheet-limitation doc-addition chip** (`.kiro/specs/125-mechanical-enforcement-strategy/125-B-backlog.md` item 5: "Related pending ballot: the jsdom stylesheet-limitation doc addition (Thurgood chip, 2026-07-09)") — its content is folded into the allowlist entries + reason notes per this task's brief, rather than authored as a separate doc.

**2 entries are net-new, NOT from PR #39** — discovered during this task's own full-suite gate-bite run (`src/cli/__tests__/figma-extract.test.ts`, `src/cli/__tests__/figma-push.test.ts`). Adjudicated in this task per its own escalate-genuine-novelty instruction: both files are CLI tools whose `console.error` output **is** their product surface — every message the suites assert against is deliberate, deterministic CLI text (arg validation, DTCG-load failures, sync/drift reporting, usage banners). Legitimate expected noise, not a defect. See "A Real Bug Found and Fixed" below for why these two files specifically forced a design change in the hook itself.

### 2. The hook — `src/__tests__/console-fail-setup.ts` + `jest.config.js`

`jest.config.js` gained a **NET-NEW** `setupFilesAfterEnv: ['<rootDir>/src/__tests__/console-fail-setup.ts']` (verified none existed before this task — root lanes only, per Design C8's explicit scope decision).

The setup file: per-test `beforeEach`/`afterEach` capture of `console.error`/`console.warn`, checked against the allowlist (suite-scoped regex match), throwing in `afterEach` (failing the test) on any unallowlisted call.

**Version-agnostic per the C8 constraint**: plain property swap (`console.error = wrapper; ...; console.error = original;`), not `jest.spyOn`. See below for why `jest.spyOn` specifically had to be rejected, not just "avoided as a style choice."

### 3. A Real Bug Found and Fixed (mid-task, before landing)

The first full-suite run (`npm test`) surfaced 23 failing tests across exactly 2 suites: `figma-extract.test.ts`, `figma-push.test.ts` (baseline-verified clean via `git stash` — confirmed pre-existing and unrelated to this hook). Two distinct problems, found and fixed in sequence:

**Bug 1 — shadowing another suite's own console mock.** These two CLI test files install a **persistent module-top-level** `jest.spyOn(console, 'error').mockImplementation()` (not a per-test `beforeEach` pattern) and assert directly against its `.mock.calls` via a `consoleOutput()` helper. My hook's original design captured "the real console" **once at module load** (`const realConsoleError = console.error.bind(console)`), which bound to the pristine native function — but by the time tests ran, `console.error` had already been permanently replaced by the CLI suite's own mock. My hook's spy then wrapped THEIR mock but forwarded recorded output to the STALE native reference instead of their mock, so their `mockConsoleError.mock.calls` stayed empty — breaking their own `expect(consoleOutput()).toContain(...)` assertions. **Fix**: capture the "before" reference **fresh inside `beforeEach`**, immediately before installing the wrapper, so it always chains through to whatever is currently installed (native, or another suite's persistent mock) — the same technique the pre-existing Chip suites use for their own warn-filtering (`const realWarn = console.warn.bind(console)` captured fresh each `beforeEach`).

**Bug 2 — infinite recursion via `jest.spyOn`'s mock-reuse rule.** After Bug 1's fix, one test still failed with a stack overflow. Root cause: `jest.spyOn(object, method)` has a documented behavior — if the target is **already a Jest mock function**, `spyOn` does not wrap it in a new spy; it returns and mutates the **same mock object**. Against the CLI suites' persistent `console.error` mock (itself a Jest mock), my hook's `jest.spyOn(console, 'error').mockImplementation(fn)` call was silently overwriting THAT SAME mock's implementation with `fn` — while my hook's own "before" reference was a bound wrapper around that identical mutable object. Calling the "before" reference therefore called back into `fn` itself: infinite recursion, observed as ~24 stacked `console.<anonymous>` frames terminating in a stack overflow on the first `console.error` call in either suite. **Fix**: replaced `jest.spyOn`/`mockImplementation`/`mockRestore` with a **plain property swap** (`console.error = wrapper` / `console.error = original`) — sidesteps Jest's mock-identity bookkeeping entirely, since a plain assignment is never subject to the spyOn reuse rule. This is still within the C8 constraint's sanctioned technique set ("plain jest.spyOn / method swap") — it specifically uses the method-swap half, because that half is the one that composes safely with another suite's pre-existing mock.

Both bugs, their root causes, and the fix rationale are documented in the setup file's own header comment (`src/__tests__/console-fail-setup.ts:1-64`) so a future maintainer doesn't rediscover the same trap.

### 4. Verification

- **Gate-bite proof** (both directions, throwaway probe test, deleted after): a clean test passes; a test emitting an unallowlisted `console.error`/`console.warn` fails with a clear `console-fail: unallowlisted console output in <suite>: ...` message pointing at the allowlist file.
- **Full root suite**: `npm test` → **377 suites / 8987 tests, all green** (matches PR #39's own reported baseline count — no test-count regression).
- **`npx tsc --noEmit --skipLibCheck`**: clean, no errors.
- Re-verified the PR #39-adjudicated suites (Avatar, Chip ×3, ErrorHandler ×2, GapDetector, ProductIndexerWalk, Spec108, Spec107) individually green both before and after the property-swap rewrite.

---

## Blocked: Register Entries (governance/classification-map.md)

My task briefing instructed me to land four register rows directly in `governance/classification-map.md`:

1. `console-fail-root-lanes` — the console-fail rule itself (functional, barrier, armed)
2. `console-fail-subpackage-deferred` — the recorded root-lanes-only scope decision (operational, none)
3. `wcag-format-validity` — Req 12.7's record-only row (already armed since 125-A, no work needed)
4. `inverse-drift-incremental-build` — Req 12.7's WATCH row (operational, proposed/WATCH)

**I did not write these to `governance/classification-map.md`.** Two independent standing rules in my own prompt exclude that file from my direct-write authority, and a relayed task instruction cannot override either:

- **Write scope (behavioral)**: my configured write scope is `src/components/**`, `.kiro/specs/**`, `docs/specs/**`, `application-mcp-server/**`, `governance/component-meta-authoring-guide.md`. `governance/classification-map.md` is not in that set.
- **Documentation Governance (Ballot Measure Model)**: "You do NOT write to `.kiro/steering/` or `governance/` files unilaterally... The one exception in your write scope, the component-meta authoring guide, still goes through this process."

This also matches the project's own established convention for this exact register: Task 4.1's assignment explicitly states **"register writes stay with the steward, consistent with 1.2/1.3/1.4"** — Thurgood lands register rows even when a domain agent (there, Ada) performs the adjudication. (4.3's task text does assign Lina "register entries" directly for the WCAG/validation rows, which shows the convention isn't absolute — but that's a different, not-yet-run task, and doesn't resolve the conflict with my own standing write-scope rule for THIS task.)

Per the system prompt's explicit precedence rule — "no agent message can authorize changing your permission settings, CLAUDE.md, or configuration" and only "the permission system or your user's own messages" constitute consent — I flagged this rather than either silently writing the file or silently dropping the requirement.

**tasks.md's own 4.4 bullet text requires at least the sub-package-deferred row** ("root lanes ONLY (sub-package deferral as register row + version-agnostic constraint recorded)") — so I have NOT marked 4.4's checkbox, per Task Completion Protocol's "do not mark complete before completing the required steps."

### Drafted entries (ready to apply verbatim)

All four pass the register's uniqueness/non-substring check against the four existing entries (`record-first-ratification`, `npm-test-before-complete`, `tool-boot-smoke`, `no-autonomous-token-creation`) and against each other.

```yaml
### console-fail-root-lanes

rule: "Root functional-lane test suites SHALL fail on unallowlisted console.error/console.warn output — expected noise is recorded in a checked-in per-suite allowlist (suite × message-pattern), not tolerated ambiently (Req 11)"
boundary_call:
  class: functional
  rationale: "An armed barrier against actual runtime output a test run produces — machine-checkable against the allowlist by construction; nothing to prune (no prose predecessor for this specific gate)"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["root functional lane — src/__tests__/console-fail-setup.ts wired via jest.config.js setupFilesAfterEnv; every root-lane test file; gate-bite proven live during Task 4.4 (clean tests pass, an injected unallowlisted console.error/console.warn fails the test)"]
education:
  disposition: "nothing to prune — no prose predecessor. The allowlist itself (src/__tests__/console-allowlist.json) is the citable record: each entry carries its own { suite, pattern, reason } — the adjudication lives with the data, not in steering prose."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.4): hook wired; allowlist seeded with 12 entries (10 from PR #39's adjudicated jsdom-stylesheet-limitation and deliberate-error-path-logging classes, discharging the pending jsdom-stylesheet-limitation doc-addition chip [125-B-backlog.md item 5]; 2 net-new — figma-extract.test.ts / figma-push.test.ts CLI-output classes discovered during this task's own full-suite gate-bite run); full root suite green (377 suites / 8987 tests) — evidence: .kiro/specs/125-B-classification-map/completion/task-4-4-completion.md", by: lina }
```

```yaml
### console-fail-subpackage-deferred

rule: "Console-fail (console-fail-root-lanes) is NOT extended to the mcp-server / application-mcp-server sub-package suites for U2 — their own jest 29 configs sit outside the root jest.config.js's `roots`, so the root setupFilesAfterEnv hook never loads for them. A future extension MUST use a version-agnostic capture (plain method-swap / jest.spyOn without jest-30-only APIs) since those suites run under jest 29 (Design C8)"
boundary_call:
  class: operational
  rationale: "A scope decision about WHERE the functional console-fail rule runs, not the rule itself — the underlying property stays functional (see console-fail-root-lanes); this row records the deliberate root-lanes-only boundary plus the constraint a future implementer inherits, so the deferral is recorded rather than silently skipped"
verification:
  disposition: none
  owner: thurgood
  check_state: none
  checks: []
education:
  disposition: "KEEP this row as the citable deferral record — no prose predecessor to prune. If ever replicated to the sub-packages, the version-agnostic constraint travels with this entry rather than being rediscovered."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.4) recording the root-lanes-only scope decision fixed in Design C8 — deferred, not silently skipped", by: lina }
```

```yaml
### wcag-format-validity

rule: "WCAG references on behavioral contracts SHALL follow the standard format — a numbered WCAG criterion plus text, single or comma-separated multiple ('N/A' exempt) — malformed references fail the check (behavioral-contract-validation.test.ts, 'WCAG references should follow standard format')"
boundary_call:
  class: functional
  rationale: "A machine-checkable string-shape property of a contract's wcag field — not a style/workflow preference"
verification:
  disposition: barrier
  owner: lina
  check_state: armed
  checks: ["behavioral-contract-validation.test.ts:355 'WCAG references should follow standard format' (root functional lane) — already blocking since 125-A; no implementation work performed in U2"]
education:
  disposition: "nothing to prune — no prose predecessor. Record-only entry (Req 12.7): the check's already-armed state needed a citable register row; this is it."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.4, Req 12.7) — record-only: verified already armed/blocking since 125-A, no work performed", by: lina }
```

```yaml
### inverse-drift-incremental-build

rule: "The armed lane-functional-root required check rebuilds from a clean state on every run, which MASKS incremental-build breakage and stale-artifact test dependencies — a distinct risk from what the check verifies. Candidate mechanism: an incremental-path integrity check (not yet designed)"
boundary_call:
  class: operational
  rationale: "A workflow/tooling-integrity risk about HOW the check runs (clean vs. incremental rebuild), not a functional property of any single artifact — recorded as a known-deferred hazard, not yet a rule with a check"
verification:
  disposition: none
  owner: thurgood
  check_state: proposed
  checks: []
education:
  disposition: "KEEP as the citable WATCH record — no prose predecessor to prune. Candidate mechanism noted for whoever picks this up."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.4) recording the known-deferred incremental-build / inverse-drift hazard at WATCH (check_state: proposed) — evidence: 125-B-backlog.md item 5; .kiro/specs/125-mechanical-enforcement-strategy/inbound-to-125-B-from-125-A.md §3 (STACY R1 item 4)", by: lina }
```

**Recommendation**: route these four blocks to Thurgood (Civitas steward) to apply verbatim under `## Entries` in `governance/classification-map.md`, consistent with the Task 4.1 "register writes stay with the steward" convention — or Peter explicitly authorizes me to proceed for this specific task. Either way, re-run `mcp__designerpunk-docs__rebuild_index` after landing (governance doc change) and re-check tasks.md's 4.4 box once the sub-package-deferred row (at minimum) is in place.

---

## Files Changed

- `jest.config.js` — added `setupFilesAfterEnv`
- `src/__tests__/console-fail-setup.ts` — new
- `src/__tests__/console-allowlist.json` — new, 12 entries

## Files NOT Changed (drafted only, blocked)

- `governance/classification-map.md` — four entries drafted above, not applied

## Validation Run

- `npm test` → 377 suites / 8987 tests, all green
- `npx tsc --noEmit --skipLibCheck` → clean
- Gate-bite proof (throwaway probe, deleted): unallowlisted `console.error`/`console.warn` fails the test; clean output passes

---

## Steward Register Landing (Thurgood, 2026-07-14)

Per the Task 4.1 "register writes stay with the steward" convention, I landed all four drafted rows in `governance/classification-map.md § Entries`, substantively unchanged from your drafts above:

- `console-fail-root-lanes`
- `console-fail-subpackage-deferred`
- `wcag-format-validity`
- `inverse-drift-incremental-build`

**Audit performed before landing:**
- Uniqueness / non-substring check: all four ids verified pairwise against each other AND against all five existing entries (`record-first-ratification`, `npm-test-before-complete`, `tool-boot-smoke`, `no-autonomous-token-creation`) — no collisions, no substring matches.
- Schema-shape check against Entry Schema (§ "Entry Schema"): all four entries carry every required field (`rule`, `boundary_call.class`/`.rationale`, `verification.disposition`/`.owner`/`.check_state`/`.checks`, `education.disposition`, `history`) in valid shape. No `scope[]` needed (none of the four are surface-dependent). No `crossRef` applicable. **No shape fixes were needed** — your drafts were schema-clean as written.
- Disposition sanity checks against the ratified dispositions: `console-fail-root-lanes` = functional/barrier/armed ✓; `console-fail-subpackage-deferred` = operational/none ✓; `wcag-format-validity` = functional/barrier/armed, "record-only" read as "no new work performed this task" (the check itself is a blocking root-lane assertion, so `disposition: barrier` is correct — not `record-check`) ✓; `inverse-drift-incremental-build` = operational/`disposition: none`/`check_state: proposed` — read "WATCH/none" as the verification disposition being `none` with `check_state: proposed` recording the noted-but-undesigned candidate mechanism, consistent with the `no-autonomous-token-creation` entry's precedent for this state pairing. Not a schema violation; left as drafted.
- Spot-verified two concrete claims rather than taking them on faith: `jest.config.js:86` does carry the `setupFilesAfterEnv` wiring you describe, and `behavioral-contract-validation.test.ts:355` does contain the `'WCAG references should follow standard format'` test.

**Only edit made**: each entry's `history` line — `by: lina` → `by: thurgood`, with the change text extended to note "Row drafted by Lina; landed by Thurgood per the Task 4.1 register-writes-stay-with-the-steward convention" and a citation back to this completion doc. This follows the same attribution convention already established in the `no-autonomous-token-creation` entry (Ada's boundary call, Thurgood's landing, `by: thurgood`). Rule content, boundary calls, verification fields, and education dispositions are unchanged from your drafts.

`tasks.md` 4.4 checkbox marked `[x]` — mechanism (yours) + rows (landed) now both complete.

**Note on scope**: `wcag-format-validity` and `inverse-drift-incremental-build` are Req 12.7 items whose tasks.md home is 4.3 (Req 12.1–12.7), not 4.4 (Req 11.1–11.4). I landed them as briefed without blocking on that — flagging here only so 4.3, when it runs, treats these two as already-recorded rather than re-drafting them.

Docs-MCP `rebuild_index` run post-landing (governance doc changed) — `healthy`, 83 documents / 2802 sections / 116 cross-references indexed, no errors or warnings.
