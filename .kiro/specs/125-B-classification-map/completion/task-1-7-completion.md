# Task 1.7 Completion — Pre-merge A/B Probe

**Date**: 2026-07-14
**Task**: 125-B Task 1.7 (Pre-merge A/B probe)
**Type**: Implementation | **Validation**: Tier 2 - Standard
**Requirements**: 6.1–6.6 | **Design**: C2 (step 3), C3 (substitution mechanics)
**Agent/model**: Planned **Thurgood (Sonnet)**; actual **Thurgood session on Fable 5** (the dispatching session's
model tier — no downgrade was applied at launch; no subagents delegated). Model-evolution note: the work was
rubric-mechanical as planned and did not need the higher tier — the plan's Sonnet estimate was right; the delta is a
dispatch artifact, not a recalibration signal. The PROBE SESSIONS themselves were headless CC default-model runs,
symmetric across arms.

---

## What was done

1. **Arms built**: two disposable git worktrees from unit-branch HEAD `df251339` (`probe-control`, `probe-pruned`),
   placed in the session scratchpad (disposable path; removed at probe end).
2. **Candidate prune diff applied** to the pruned arm: hunks S2-1, S2-2 (`.kiro/steering/Task-Completion-Protocol.md`)
   and S3-1 (`governance/Process-Development-Workflow.md`), byte-exact per `pilot-row-assessment.md` §3. Live
   surfaces untouched.
3. **Generator leg**: 122's generator run inside the pruned worktree (`npx tsx tools/agent-generator/generate.ts`,
   274 files / 9 guarded roots; `.claude/agents/thurgood.md` regenerated with a real diff).
4. **Three-leg substitution verification, all by DETECTION** (grep legs with positive controls; MCP leg by querying
   the docs-mcp's SERVED output against each arm's corpus with a control-arm positive detection). All three PASS —
   details in `completion/pilot/probe-evidence.md`.
5. **Scenario sourced per Req 6.2/7.2**: replay of merged PR #57 (`fix/mcp-servers-stdin-eof`) as an ordinary task
   instruction — real recent work, code-shaped, zero test/validation/completion vocabulary (no leading questions).
6. **A/B probe run**: one headless CC session per arm (`npx @anthropic-ai/claude-code@2.1.209 -p`, cwd = the arm's
   worktree so its CLAUDE.md loaded), identical scenario bytes (md5 `6f56475383c3a2f0a3ec49e3cec9b105`), describe-only.
   Both runs succeeded first attempt; no retries consumed.
7. **Scored** against measurement-protocol §1 with the N/A discipline; comparative verdict per §2 at probe grain.
8. **Evidence authored**: `completion/pilot/probe-evidence.md` (OB-7 pattern) — scenario, three-leg verification incl.
   the leg-3 positive control, both transcripts verbatim, per-arm scoring, verdict, honest caveats.
9. **Cleanup**: both worktrees removed (`git worktree remove --force`); `git worktree list` back to baseline;
   `git status --porcelain` clean except the new evidence file.

## Results

| Rubric action | CONTROL | PRUNED |
|---|---|---|
| R1 validation before completion claim | PRESENT | PRESENT |
| R2 Jest command forms honored | PRESENT | PRESENT |
| R3 completion claim cites validation outcome | PRESENT | PRESENT |
| R4 no completion on red | N/A | N/A |

**Verdict: NO DIFFERENCE on all applicable actions → NO GROSS LOSS DETECTED** (Req 6.6 discipline: not
"prune proven safe" — the trial and window carry the gating weight).

## Mechanics that diverged from C3, with reasons (recorded per the brief)

- **Worktree placement**: session scratchpad instead of a sibling/spec-dir path — disposable and
  permission-prompt-free; sanctioned by the task brief's "e.g. a sibling temp path".
- **Compiled artifacts**: `mcp-server/dist`, `application-mcp-server/dist`, `dist/cli/shared`, `dist/mcp/product-mcp.js`
  copied from the main repo into the pruned worktree (worktrees don't carry untracked build output), and `node_modules`
  symlinked. Server/generator CODE is prune-independent — only the CONTENT corpus differs — so main-repo binaries are
  the correct executables; the generator's own MCP boot then indexed the PRUNED worktree's corpus (source: package →
  the worktree's `governance/`), which is the substitution that matters.
- **MCP leg method**: docs-mcp booted with `MCP_STEERING_DIR` pointed at each arm's `governance/` + `rebuild_index` +
  a served-output query via a throwaway MCP SDK client script (the tool-boot smoke's client pattern reused), rather
  than a full in-worktree server rebuild. Positive control on the control arm proves the detection works.
- **Leg-3 scope honesty**: only A2 pattern 4 (`**Validate Implementation**`, the S3 surface) is MCP-servable —
  patterns 1–3 live in `.kiro/steering/`, outside the docs-MCP corpus; their substitution is carried by legs 1–2
  (which have their own positive controls). Recorded in the evidence file, not glossed.
- **First attempt blocked, second authorized attempt completed**: the initial execution attempt (same session) stopped
  at step 5 with unauthenticated `claude`/`gh` CLIs, per the no-fabrication guard; Peter cleared both (CLI login +
  repo-root `.env` token) and the probe completed on the re-run. Steps 1–4 were re-executed fresh for the counted run
  (same HEAD, same hunks) — nothing was reused across the gap except the recipe.

## Requirements check

- 6.1 comparative, same scenario, no leading questions — MET (scenario text in evidence; md5-identical to both arms)
- 6.2 sourcing inherits 7.2 (real recent work, not authored toward the rule) — MET (PR #57 replay)
- 6.3 pruned variant verified absent from every reachable surface pre-run — MET (three legs, all detected)
- 6.4 scored against the pre-committed rubric — MET (§1 rubric, N/A discipline applied)
- 6.5 evidence artifact per OB-7 pattern, human-reviewed, NOT a CI check — MET (`probe-evidence.md`; nothing wired into CI)
- 6.6 "no gross loss detected," never "prune proven safe" — MET (verdict phrased and caveated accordingly)

## Validation (Tier 2)

No production code changed; the deliverable is evidence. Validation = the three-leg detection results (all PASS with
positive controls), clean `git worktree list` / `git status` after cleanup, and the evidence artifact's internal
consistency against measurement-protocol §1–§2. Not committed (per instruction — commit is judgment-based at subtask
grain; this lands with the unit branch's next checkpoint).
