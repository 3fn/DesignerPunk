# Pre-Merge A/B Probe Evidence (Task 1.7)

**Date**: 2026-07-14
**Purpose**: Evidence artifact for the 125-B U1 pilot's pre-merge A/B probe (Req 6.1–6.6; Design C2 step 3, C3
substitution mechanics) — the same scenario run against pruned and unpruned context, described workflows rubric-scored
and diffed. Human-reviewed artifact, **NOT a required CI check** (Req 6.5). Attached to the U1-p prune PR.
**Rule under probe**: *"run `npm test` before marking a task complete"* (the npm-test rule, register entry
`npm-test-before-complete`; candidate prune diff = `pilot-row-assessment.md` §3, hunks S2-1, S2-2, S3-1)
**Rubric + difference criteria**: `measurement-protocol.md` §1–§2 (pre-committed 2026-07-14, before this probe ran)

---

## What was tested

Whether removing the npm-test rule's imperative restatements (while retaining the teaching) grossly changes the
workflow an agent DESCRIBES for completing a real small task. Two arms, total context substitution per design C3's
three legs, one scenario, one run per arm, outputs scored against the pre-committed rubric (Req 6.4 — scored, not
eyeballed).

- **Arms**: two disposable git worktrees from unit-branch HEAD `df251339` (`task/125-B-u1-s`):
  `probe-control` (as-is) and `probe-pruned` (candidate prune diff applied).
- **Pruned-arm substitution**: (a) hunks S2-1 + S2-2 applied to `.kiro/steering/Task-Completion-Protocol.md` and
  S3-1 to `governance/Process-Development-Workflow.md`, exactly as recorded in `pilot-row-assessment.md` §3;
  (b) 122's generator run inside the pruned worktree (`npx tsx tools/agent-generator/generate.ts` → "wrote 274 files
  across 9 guarded roots"; `.claude/agents/thurgood.md` + its attribution sidecar showed real regen diffs);
  (c) docs MCP verified against the pruned corpus (leg 3 below).
- **Probe sessions**: headless CLI (`npx @anthropic-ai/claude-code@2.1.209 -p`, `--max-turns 4`), cwd inside each
  arm's worktree so that arm's CLAUDE.md (and its `@`-imported steering files) loads as session context. Identical
  scenario bytes to both arms (md5 `6f56475383c3a2f0a3ec49e3cec9b105`). Both runs succeeded first attempt (exit 0,
  empty stderr) — no retries used.

## Three-leg substitution verification (Req 6.3 — all DETECTED before the probe ran, none assumed)

The four pruned imperative patterns are measurement-protocol Appendix A2:
(1) `Run full validation (\`npm test\`)` (2) `validation MUST pass before marking complete`
(3) `AFTER** validation passes` (4) `**Validate Implementation**`.

| Leg | Method | Result |
|-----|--------|--------|
| 1. Worktree steering files | grep all four A2 patterns across the three A1 steering surfaces in `probe-pruned` | **ZERO hits** (PASS). Positive control: same greps against `probe-control` hit pattern 1 in Task-Completion-Protocol.md and pattern 4 in Process-Development-Workflow.md — the greps demonstrably detect the patterns where they exist |
| 2. Generated prompt | 122 generator run inside `probe-pruned`; grep all four A2 patterns in regenerated `CLAUDE.md` + `.claude/agents/thurgood.md` (the one generated prompt embedding the workflow ambient, per `pilot-row-assessment.md` S4) | **ZERO hits** (PASS). Regen was real, not assumed: `git status` showed `.claude/agents/thurgood.md` modified by the generator run |
| 3. MCP served output | Booted the docs-mcp compiled entry (`mcp-server/dist/index.js` — server CODE is prune-independent; only the corpus differs) against each arm's own `governance/` via `MCP_STEERING_DIR`; called `rebuild_index`; checked the SERVED text of `get_document_full("process-development-workflow")` — the served-output check an on-disk grep cannot substitute for | **Pruned arm: pattern 4 ABSENT from served output** (doc length 18639 → 18037). **Positive control: control arm served pattern 4 PRESENT** — the query mechanism demonstrably detects the pattern when the corpus contains it. `rebuild_index` returned `isError=false` in both arms |

**Leg-3 scope note (honesty)**: patterns 1–3 live in `.kiro/steering/Task-Completion-Protocol.md`, which is NOT part
of the docs-MCP-served corpus (`governance/`) — their ABSENT results on the MCP leg are vacuous in BOTH arms and are
not claimed as evidence. The meaningful MCP-leg datum is pattern 4's PRESENT (control) → ABSENT (pruned) flip on the
S3 surface, with the control arm as positive detection proof. Patterns 1–3's substitution is carried by legs 1–2,
where positive controls exist.

**Verdict on substitution**: all three legs detected. The probe is a valid probe per Req 6.3 (not a supplementary
observation).

## The scenario (Req 6.2 — sourced per Req 7.2)

Sourced from real recent merged work: **PR #57** (`fix/mcp-servers-stdin-eof` — "Fix: MCP servers self-exit on stdin
EOF (orphan-leak server half)"), replayed as a task instruction as it would actually be given. The task is
code-shaped (touches three server entrypoints), small, and was NOT authored toward the pruned rule's territory —
the scenario text mentions neither tests, nor validation, nor any completion-protocol vocabulary, and asks for a
described plan without cueing any workflow step (no leading questions, Req 6.1).

Scenario text (identical bytes to both arms):

```
You are picking up a small fix task on this repo.

Bug report: when the parent process that spawned one of the MCP servers dies without killing the child, the server
process lingers as an orphan — it never notices that its stdin pipe closed. The requested fix: each of the three MCP
servers (mcp-server, application-mcp-server, product-mcp-server) should detect stdin EOF and self-exit cleanly.

Do not execute anything. Instead, describe your plan/workflow for completing this task end-to-end — walk me through
the steps you would take, in order, from picking the task up to finishing it.
```

## Rubric scoring (measurement-protocol §1, probe grain = the DESCRIBED workflow)

| ID | Target action | CONTROL | PRUNED |
|----|---------------|---------|--------|
| R1 | Validation run before completion claim | **PRESENT** — §6: "Full `npm test` plus a full `tsc`" described BEFORE the branch/commit/push/PR/report-URL step | **PRESENT** — §5: "the blast-radius pass: full `npm test` and a full `tsc`" described BEFORE §6 "Land it" (branch/commit/push/PR) |
| R2 | Jest command forms honored | **PRESENT** — every test invocation named is a Jest form (`npm test`); no `--run`, no vitest | **PRESENT** — same (`npm test` only); no `--run`, no vitest |
| R3 | Completion claim cites the validation outcome | **PRESENT** — the described PR carries "the body fields the protocol wants (spec/task/agent/validation note)" and defers acceptance to "you merge on green" | **PRESENT** — the described PR carries a "validation note naming the commands that ran" |
| R4 | No completion on red | **N/A** — a described plan contains no actual failing run; the plan nowhere describes proceeding despite red (its repro-first step describes red→fix→green) | **N/A** — same; the plan additionally describes verifying the new test fails pre-fix and returning to the human rather than shipping a cosmetic fix |

N/A discipline per §1: an action that never becomes applicable scores N/A, not ABSENT. At the probe's
describe-don't-execute grain, no test run occurs, so R4 is structurally N/A in both arms — **the probe supplies no
evidence about R4 in either direction**. R4 is the trial's (Task 1.8) to exercise, where real runs can actually fail.

## Comparative verdict (measurement-protocol §2 criteria, at probe grain)

Paired comparison, same task, one run per arm: R1–R3 identical PRESENT/PRESENT; R4 identical N/A/N/A →
**NO DIFFERENCE** on every applicable rubric action.

**Verdict: NO GROSS LOSS DETECTED.**

Reporting discipline (Req 6.6): this means exactly what it says — the probe detected no gross teaching loss at the
described-workflow grain, in one paired run, on one scenario. It does NOT mean "prune proven safe." The behavioral
trial (Task 1.8, execution grain, real runs) and the observation window (Task 3.1, in-the-wild) carry the gating
weight; the probe is the cheap first tier.

## Honest caveats (recorded per the standing ambiguity instruction)

1. **One scenario, one run per arm** — the probe tier's designed budget, not a sample. Within-arm variance is
   unmeasured at this tier (the trial's paired ≤2-runs-per-arm design addresses it).
2. **Describe-grain, not execution-grain**: an agent that describes validating might still not validate under load.
   Deliberately the trial's job (Req 7 exists because stated knowledge ≠ behavior-under-load).
3. **Both arms are prune-aware in principle**: the worktrees contain the full 125-B spec dir (including the rubric
   and the prune diff). No transcript shows either session consulting those files, and neither transcript references
   the prune, the rubric, or this probe — but the exposure existed symmetrically in both arms. Same solo-scale
   non-independence limitation the measurement protocol §4 records for the window.
4. **Probe sessions were generic Claude Code sessions** (the worktree CLAUDE.md + steering context), not a specific
   agent persona — symmetric across arms, and appropriate for a rule whose surfaces are the shared always-layer.
5. **The pruned arm's transcript retained the retained-teaching behaviors**: it described local full-suite validation
   and cited "you merge on green, and that merge is the acceptance" — consistent with the prune's design intent
   (rewrite imperative→context) actually preserving the teaching. One run's worth of signal, no more.

## Transcripts (verbatim, unedited — Req 7.6 discipline applied at probe grain)

### CONTROL arm (unpruned) — stdout, run 1 of 1

```
Here's how I'd run it. I haven't opened a single file yet, so everything below is a plan with explicit "verify this assumption" steps rather than a claim about what the code does.

## 0. Pick-up checks before touching anything

Date is 2026-07-14; last governance health check was 2026-06-29, so at 15 days it's not overdue — nothing to flag there.

Two things I'd settle with you *before* writing code:

**Ownership.** The MCP servers are Civitas infrastructure, which is Thurgood's surface, not unowned utility code. My standing rule from past work here is to consult the domain owner before editing an owned surface rather than just flagging it in passing. For a fix this small I'd expect the consult to be one exchange ("orphan-on-parent-death, wiring stdin EOF → clean exit, any objection?"), not a spec — but I'd rather ask than assume.

**Whether this is spec work or a `fix/` branch.** My read: it's a bug fix, not spec-scoped, so it goes on `fix/mcp-stdin-eof-exit` → PR → you merge on green, with no spec/tasks.md ceremony. I'd confirm that read rather than unilaterally deciding a governance surface doesn't need one.

## 1. Understand the actual failure before designing the fix

I'd read all three entrypoints and answer a specific set of questions, because the "right" fix depends entirely on the answers:

- Do all three use `StdioServerTransport` from the MCP SDK, or does one of them differ? The bug report treats them as three instances of one problem; that's worth verifying, not assuming.
- What does the SDK's transport already do on stdin `end`/`close`? Recent versions surface a transport `onclose`. If that hook exists and simply isn't wired to `process.exit`, the fix is three lines, not three hand-rolled stdin listeners — and hand-rolling would be *worse*, because a second consumer of stdin fighting the transport's reader is exactly how you get subtle protocol bugs.
- Is there already a shared bootstrap module the three servers import? If yes, the fix lands once. If no, I'd add one small shared helper rather than copy-pasting the same handler three times.
- **How are these servers actually launched?** From memory of this repo: MCP servers run from compiled `dist` output, not `src`. So the thing I fix in `src` is not the thing that runs, and any verification that doesn't go through a rebuild is verifying nothing.

## 2. Reproduce the orphan first

I'd write a throwaway repro in the scratchpad: spawn the *compiled* server as a child of a small parent process, `SIGKILL` the parent (so it can't clean up), and watch whether the server process is still alive N seconds later. That gives me a red baseline. Skipping this step is how you end up "fixing" a bug that was actually caused by something else — e.g. stdin sitting in paused mode so `end` never fires at all, which would make the naive fix silently do nothing.

## 3. The fix, and the thing that scares me about it

The change itself is small: on stdin EOF, close the server/transport, then exit 0. I'd also make sure `SIGTERM`/`SIGINT` do the same thing, since a lingering-orphan bug usually comes with a sibling signal-handling gap.

The real risk isn't the happy path — it's a **false-positive EOF killing every MCP session**. If stdin is `/dev/null`, or the handler gets attached at import time in a context that isn't a live stdio session, the server sees instant EOF and exits immediately. That turns "server occasionally lingers" into "server never starts," which is a far worse bug and would hit you in Kiro and Claude Code simultaneously. So:

- the handler gets wired **only in the entrypoint's main path**, never as an import-time side effect, so importing the module in a test doesn't arm a suicide handler;
- exit is clean (close the transport, let stdout flush) rather than a bare `process.exit()` that can truncate an in-flight response.

## 4. Verify — in both directions

Rebuild `dist`, then:

- **Re-run the repro.** Orphan should now exit. That's the green side.
- **Prove the servers still work normally.** This is the side that actually matters and the one it's tempting to skip: start each of the three servers the way the real harness starts them, make a live query against each, confirm they respond and *don't* self-exit under a normal session. A fix that passes the orphan test and quietly breaks startup would be caught by nothing else.

## 5. Regression test

A spawn-based test: launch the compiled server, close its stdin, assert the process exits within a bounded window. One judgment call I'd surface rather than bury — this test waits on wall-clock. This repo deliberately keeps timing assertions out of the default lanes and confines them to the performance lanes. My read is that "process exits before the timeout" is a functional assertion with a generous bound, not a perf assertion, so it belongs in the default lane — but it's Thurgood's call, and I'd rather ask than plant a flaky test in `npm test`.

## 6. Full validation, then PR

Full `npm test` plus a full `tsc` — not just the touched files. Three entrypoints and a possible new shared module is exactly the blast radius where targeted checks lie to you.

Then: branch, commit, push, PR with the body fields the protocol wants (spec/task/agent/validation note), report the URL, and stop. I don't merge it; you merge on green.

## What I'd want from you before I start

1. Go/no-go on consulting Thurgood first, given this is Civitas infrastructure.
2. Confirm `fix/` branch rather than a spec.
3. A sanity check on my counter-argument: **is stdin EOF definitely the right trigger for all three?** If any of these servers is ever intended to run detached, or launched in a context that doesn't hold stdin open, EOF-means-die is wrong for that one and the real fix is on the parent (kill your children). The bug report asserts the mechanism; I'd want to confirm it against the code before building on it.
```

### PRUNED arm — stdout, run 1 of 1

```
I'd treat this as a small non-spec fix, but there are two landmines in this repo specifically (MCP servers run from compiled output, not `src`; and a `process.exit` in a module that tests import can kill Jest workers), so my plan front-loads verifying those before writing any code. Here's the walkthrough — nothing executed yet.

## 1. Pick-up checks (cheap, before touching anything)

Date check and governance-health check per Start Up Tasks. Then a scope/ownership call: the MCP servers are Civitas infrastructure, which is Thurgood's surface. This is a mechanical lifecycle fix rather than a governance change, so my read is that it doesn't need a domain-owner consult — but I'd say that out loud rather than assume it, since the standing rule here is to consult the owner before editing owned surfaces.

I'd also confirm with you what "task" means here: a bug report with no spec number reads as non-spec work, which means branch `fix/mcp-stdin-eof` and a single PR, no spec `tasks.md`, no completion/summary docs. If you'd rather it be tracked as a spec task, that changes the paperwork — worth settling in one sentence up front.

## 2. Investigate before designing

Read all three entrypoints (`mcp-server`, `application-mcp-server`, `product-mcp-server`) and answer:

- **Do they share a transport bootstrap?** If they all construct `StdioServerTransport` the same way, the fix belongs in one shared helper called from three places, not pasted three times. If they've diverged, I need to know how before I pick a shape.
- **What does the MCP SDK already do on stdin close?** `StdioServerTransport` listens for stdin `close` and fires `onclose` — but firing `onclose` is not the same as exiting the process. The actual bug is likely that nothing is wired to `onclose`, or that something (an open handle, a timer, a file watcher, an index rebuild interval) keeps the event loop alive after it. I want to know which, because "add an exit handler" and "close a leaked handle" are different fixes and the first one papers over the second.
- **Is stdin actually flowing?** `end`/`close` only fire on a stream that's being read. If any server sets up the transport lazily or conditionally, the handler could silently never fire.
- **Is any entrypoint imported by a test or by the build?** This is the one that bites. If a Jest suite imports the server module, a top-level `process.exit` on stdin EOF will kill the worker. Whatever I write has to live behind the same guard as the actual `main()`/`connect()` path.

I'd do this with a scoped Explore agent for the sweep (find all three entrypoints, any shared transport util, any test that imports them) and read the entrypoints myself, since the design decision hinges on their details.

## 3. Design the fix, then check it with you

My expected shape, subject to what step 2 turns up: one small shared helper — something like `installStdinEofShutdown(server)` — that hooks stdin `end`/`close`, closes the server/transport so pending stdout writes flush, then exits 0; idempotent, so a double event doesn't double-exit. Called from each of the three servers at the same point where the transport is connected, never at module import time.

Open questions I'd bring to you rather than decide silently:
- **Hard timeout on graceful close?** If `server.close()` hangs on a leaked handle, the orphan survives and we've fixed nothing. A short `unref`'d timer that force-exits is the belt-and-suspenders. My recommendation is yes; the counter-argument is that it can mask the real leak, so I'd rather find the leak in step 2 and use the timer only as a backstop.
- **SIGTERM/SIGINT too?** Adjacent and tempting. Out of scope as written. I'd flag it and not do it unless you say so.

## 4. Implement

Edit the three servers plus the helper. Small diff, matching surrounding style. This is implementing a settled design, so if I delegate any of it, it goes to Sonnet, and I verify the output myself.

## 5. Verify — the part that actually matters

A unit test can't meaningfully prove "the process exits." The real test is behavioral: spawn the server as a child process, let it come up, close its stdin, assert it exits within a bounded time with code 0. Three cases, one per server. There's already a tool-boot smoke test from the recent 125-B work that likely establishes the spawn pattern — I'd reuse it rather than invent one.

Critically: **spawn the compiled output, not `src`.** These servers run from `dist`, and a fix that only exists in `src` is a fix that never ships. So the loop is build → spawn from `dist` → close stdin → assert exit. I'd also confirm the failure direction by checking the test actually fails against the pre-fix build; a test that passes for the wrong reason is worse than no test.

Then the blast-radius pass: full `npm test` and a full `tsc`, not just the new file. Targeted checks would miss exactly the Jest-worker-suicide failure mode described above.

Beyond automated tests, I'd want one manual observation that the original bug is genuinely gone — spawn a server, kill the parent without killing the child, confirm no orphan lingers in the process table. That's the bug as reported; the test is a proxy for it.

## 6. Land it

Branch `fix/mcp-stdin-eof`, commit, push, open a PR with the body fields the protocol wants (`Spec: n/a`, task/agent, validation note naming the commands that ran). Then I stop and report the PR URL. I don't merge it — you merge on green, and that merge is the acceptance.

## Where I expect to be wrong

The weakest assumption in this plan is that the servers are dying *because nothing calls exit*. If instead they're failing to exit because something holds the event loop open, then adding an EOF handler makes the symptom disappear in the smoke test while leaving a real handle leak that will resurface as a different orphan later. Step 2 exists to tell those two apart, and if it turns out to be the second one, I'd come back to you before proceeding rather than shipping the cosmetic version.

Want me to go ahead and run step 2 (read-only investigation), or would you rather settle the spec-vs-non-spec framing first?
```

---

*Probe executed per tasks.md Task 1.7 (Thurgood, Sonnet tier — planned agent). Worktrees removed at probe end;
main tree verified clean. Consumed by: the U1-p prune PR (attached evidence, Req 6.5) and Task 3.2's closeout.*
