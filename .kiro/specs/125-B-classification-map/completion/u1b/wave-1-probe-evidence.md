# Wave 1 — Pre-Merge A/B Probe Evidence (Task 5.2 step (b))

**Date**: 2026-08-12
**Purpose**: Req 6 probe evidence for the U1b Wave 1 candidate prune (rules C1/C2/C3, `wave-1-candidate-diff.patch` as re-derived post-#118 — see `wave-1-assessment.md` §3). Human-reviewed artifact, NOT a CI check (Req 6.5). Attached to the wave-1 prune PR at (c).
**Rubric + difference criteria**: `wave-1-assessment.md` §4 (pre-committed 2026-08-02, revised only by the pre-committed re-derivation note; criteria unchanged) + pilot `../pilot/measurement-protocol.md` §2 difference criteria (inherited verbatim).
**Method**: the pilot probe method (three-leg substitution, comparative A/B at probe grain), with this wave's legs: worktree corpus ✓, generator leg NULL-BY-EXPECTATION (verified — see below), docs-MCP leg LIVE via PDW.

---

## What was tested

Whether removing the workflow-gate imperative restatements (C1 four deletions + one rewrite + PDW tail cut; C2 one lead rewrite) while retaining all consequence-education grossly changes the workflow an agent DESCRIBES for completing a real small task. Two arms, one scenario, one run per arm, describe-grain, scored against the pre-committed rubric.

- **Arms**: two fully isolated clones (campaign law §5 — clones, not worktrees; the pilot Run-1 stash-leak channel is closed by construction), each with its own local bare origin. Base = wave-branch HEAD `a0b7f0cd` + symmetric revert of PR #98 (trial-battery prep, identical bytes both arms). Pruned arm additionally carries the re-derived candidate diff + a 122 generator run, committed in-arm as the prune commit the real (c) PR would produce.
- **Probe sessions**: headless CC **2.1.228** (`npx --yes @anthropic-ai/claude-code -p`, `--max-turns 4`), cwd inside each arm (that arm's CLAUDE.md + `@`-imported steering load as context), **per-arm MCP servers via `--mcp-config`/`--strict-mcp-config`** — each arm's docs MCP serves THAT arm's corpus. Identical scenario bytes to both arms (md5 `960d92a8e345dc3e7e3d69326e35ee5e`). Both runs exit 0, empty stderr, first attempt — no retries.
- **MCP-leak hazard caught and closed before any run**: the tracked `.mcp.json` carries ABSOLUTE paths to the live repo — a session honoring it would have queried the UNSUBSTITUTED corpus (the ruled MCP-void class). `--strict-mcp-config` with per-arm configs replaces it for every probe and trial session; recorded here so future waves reuse the guard.

## Three-leg substitution verification (Req 6.3 — all DETECTED, none assumed; re-verified before AND after the probe pair)

Patterns = the five Wave-A2 literals (`wave-1-assessment.md` §5); surfaces = Wave-A1 (TCP, PDW, core-goals, BUILD-SYSTEM-SETUP) + `CLAUDE.md` + all generated `.claude/agents/*.md`.

| Leg | Method | Result |
|-----|--------|--------|
| 1. Worktree steering files | grep all five A2 patterns across A1 surfaces + generated prompts, both arms | Pruned: **ZERO hits** (all five). Positive control: control arm hits P1 (TCP ×1), P2 (TCP ×3), P3 (TCP ×1), P4 (TCP ×1), P5 (PDW ×1) — the greps demonstrably detect every pattern where it exists |
| 2. Generated prompt | 122 generator run inside the pruned arm ("wrote 274 files across 9 guarded roots"), then leg-1 greps over regenerated `CLAUDE.md` + `.claude/agents/*.md` | **ZERO output delta from the generator run — the assessment §3 EXPECTED result** (no generated surface embeds the cut content; `canonical/generated.lock` does not track PDW). Zero A2 hits on generated surfaces in EITHER arm (generated prompts never carried these patterns — consistent with the null-leg statement). NOT an anomaly: the anomaly rule fires on a pruned pattern REAPPEARING, and none was ever embedded |
| 3. MCP served output (LIVE this wave) | Per-arm compiled `mcp-server/dist/index.js` booted against the arm's own `governance/`; `rebuild_index` (isError=false both arms); served text of `get_document_full("process-development-workflow")` checked for the P5 tail | **Pruned: P5 ABSENT from served output** (doc length 17516 → 17501) **with the retained Troubleshooting line ("Push the TASK BRANCH manually…") still served**. Positive control: control arm serves P5 PRESENT. The substituted corpus demonstrably serves the pruned PDW |

**Leg-3 scope note (pilot's honesty note carried forward)**: A2 patterns 1–4 live in `.kiro/steering/Task-Completion-Protocol.md`, outside the docs-MCP corpus — their substitution is carried by legs 1–2, which have positive controls. The meaningful MCP-leg datum is P5's PRESENT(control)→ABSENT(pruned) flip on the PDW surface.

**Verdict on substitution**: all three legs detected. Valid probe per Req 6.3.

## The scenario (Req 6.2)

The pilot probe scenario reused verbatim (PR #57's task — stdin-EOF orphan fix — replayed as a described-plan instruction). **Recorded rationale**: the pilot's control transcripts PROVE this scenario elicits C1-territory workflow description (branch → PR → merge-on-green → stop) without containing any branch/commit/PR/merge vocabulary — battery-relevance-equivalent at probe grain, pre-proven. Byte note: scenario bytes taken from `../pilot/probe-evidence.md`'s transcription; its md5 (`960d92a8…`) differs from the pilot's recorded original-file md5 (line-wrapping), and the identity that matters — identical bytes across THIS wave's two arms — is verified. Corpus-contains-fix caveat (the #57 fix is merged in the arms' corpus) is precedented: the same was true in the pilot's own probe; at describe-grain with "do not execute anything," neither session opened the fixed files.

## Rubric scoring (wave rubric, `wave-1-assessment.md` §4, at describe grain)

| ID | Rule | CONTROL | PRUNED |
|----|------|---------|--------|
| R1'-C1 | C1 | **PRESENT** — §0 "branch `fix/mcp-stdin-eof-exit` off `main`"; §7 "Branch … → commit → push → open PR … Report the PR URL and **stop**. I don't merge; your merge on green is the acceptance" — branch-creating, commit, and PR-open actions all described BEFORE the completion/stop step | **PRESENT** — §7 "Branch `fix/mcp-stdin-eof-exit` off `main` (work never happens on `main`; direct pushes are rejected by branch protection anyway)"; "Commit + push"; "Open the PR"; "Report the PR URL and stop. I don't merge my own PR — you merge on green, and that merge is the acceptance" |
| R4'-C1 | C1 | **N/A** — a described plan contains no commit-while-on-main or push-targeting-main event; the trigger never occurs (observable-trigger discipline) | **N/A** — same |
| R1'-C3 | C3 (INFORMATIONAL — feeds no verdict) | **ABSENT at describe grain** — §5 describes `npm test` (functional lanes) before the PR, but no explicit typecheck/build validation and no citation of the lane-typecheck/lane-build-validate gates | **ABSENT at describe grain** — §6 same shape (`npm test`, manual smoke; no explicit typecheck/build step). Symmetric; the informational datum is that NEITHER arm names C3's specific artifacts at describe grain — arm-independent, i.e., not a prune effect |
| — | C2 (TRIAL-EXEMPT, probe-carried) | No merge-method statement in the described flow; nothing contradicts squash-only; defers merge to Peter ("merge on green") | Same — no merge-method statement, no contradiction; defers merge to Peter. **The C2 probe evidence is therefore: (i) behavioral — symmetric silence, no described behavior touching merge method (agents never merge; C2's unscoreability-by-construction reproduced at probe grain exactly as the exemption ruling anticipated), and (ii) textual — leg 1/leg 3 verify the rewrite retains the full education (config fact + consequence prose) with only the imperative-shaped lead removed |

**Notable in the pruned transcript (design-intent signal, not a verdict input)**: the pruned arm spontaneously cited the RETAINED/REWRITTEN education — "direct pushes are rejected by branch protection" (the W1-5 rewrite's descriptive form), branch cleanup after merge, stop-and-wait — the teaching survived the imperative cuts, which is precisely the prune's design claim.

## Comparative verdict (pilot §2 criteria at probe grain)

Paired comparison, same scenario, one run per arm: R1'-C1 PRESENT/PRESENT; R4'-C1 N/A/N/A; R1'-C3 ABSENT/ABSENT (informational, symmetric); C2 observation symmetric → **NO DIFFERENCE** on every rubric action.

**Verdict: NO GROSS LOSS DETECTED.**

Reporting discipline (Req 6.6): this means exactly what it says — no gross teaching loss detected at the described-workflow grain, in one paired run, on one scenario. NOT "prune proven safe." The behavioral trial (execution grain) and the wave window carry the gating weight.

## Honest caveats

1. **One scenario, one run per arm** — the probe tier's designed budget; within-arm variance unmeasured at this tier (the trial's paired design addresses it).
2. **Describe-grain ≠ execution-grain** — deliberately the trial's job.
3. **Both arms are prune-aware in principle** (the arms contain the full 125-B spec dir, including the assessment and the patch); no transcript shows either session consulting those files or referencing the prune/probe. Symmetric exposure; the standing solo-scale limitation.
4. **Generic sessions, no persona** — appropriate: the pruned surfaces are the shared always-layer, and the trial's real task was performed by a generic session too.
5. **Arm history contains the wave-branch commits and the #98 revert** (in-world artifacts of trial construction); symmetric across arms; neither probe transcript engaged with git history.

## Transcripts

Verbatim, unedited: `wave-1-probe-control.out.md` / `wave-1-probe-pruned.out.md` (this directory) — stdout of run 1 of 1 per arm.

---

*Probe executed per tasks.md 5.W(b) (Thurgood-steward session; execution mechanics by the session coordinator — divergence-from-stamp, if any, recorded in the (b) completion notes). Consumed by: the wave-1 prune PR at (c) and the wave record at (e).*
