# Task 25.4 Completion: Run (c) — `trio-3-pm`, bare `init` in Kiro

**Date**: 2026-10-14
**Agent**: Leonardo (Opus), PRIMARY on Task 25 — operator · **Launcher**: Peter (macOS Terminal)

## What changed

- **New**: `.kiro/specs/123-consumer-distribution/validation/trio-3-pm.md`, the record of persona (c), Priya, on kiro-cli 2.12.1. Her first `init` was bare. It printed the DD9 notice, then blocked on a `Product name:` prompt inside Kiro's shell.
- **The path**: she was born on Kiro at her third `init` (`--target=kiro`, taken from `--help`). She never read the install guide.
- **Cold observation**: `kiro founder-cold: observed`. Kiro asked nothing before the prompt.
- **15B.3**: held, in behaviour only.
- **DD9**: she recovered via the notice combined with `--help`, not with the notice's own `attach` command. One run cannot establish the majority harness.
- **The probe, consumer-Leonardo (`subject: leonardo`)**: "partly working". A coherent plan, but written under `specs/`, which the Product MCP cannot read. His rendered write scope is `specs/**` only (R3-5). He also skipped `validate_assembly`, used pixel values, and gave no counter-argument (R3-6).
- **12 findings, R3-1–R3-12.** The most serious is R3-1: `init` prompts on stdin with no terminal check (`src/cli/init.ts` L188–193), so a bare `init` run by an agent hangs, contrary to INSTALL § 3.
- **Task 28.3 assessment**: the transcript does not meet the bar as written, because kiro-cli prints tool calls, not results (R3-7). Thurgood decides.

## Targeted check and result

- The § 9 schema check over the record: all 25 labels, 4 stop lines, a well-formed `cold-observation`, both signed strings, no forbidden wording.
- Every quoted passage was checked against `birth.txt` and `probe-leonardo.txt`.
- The `init` source lines were read at the unit head. The run folder was only read.

## Application-time adaptations

- **Two operator interventions in the birth session** (Ctrl-U, Return, Return, each at `init`'s stdin prompt; Peter, at the orchestrator's instruction). They are logged under `operator-log` as a deviation from § 6. Afterwards the protocol gained `operator-unblock:<reason>`, a logged act that is not a stop (Instruments `## Found later`, row 2.6).
- The preflight capture kept the pre-revision file name (`preflight.typescript`). There was one session, so nothing was lost.
