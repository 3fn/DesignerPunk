# Task 25.2 Completion: Run (a) — `trio-1-backend`

**Date**: 2026-10-14
**Agent**: Leonardo (Opus), PRIMARY on Task 25 — operator · **Launcher**: Peter (macOS Terminal)

## What changed

- **New**: `.kiro/specs/123-consumer-distribution/validation/trio-1-backend.md`, the record of persona (a), Dana, on Claude Code 2.1.300.
- **The path**: all 5 founder-path steps were walked (`init --target=cc`; birth in 41 turns).
- **The probes**: consumer-Ada and consumer-Lina both behaved as their charters say.
- **Cold observation**: `cc founder-cold: observed`.
- **14 findings, R1-1–R1-14.** The most serious: R1-6, consumer-Ada's report that the consumer's colour palette and theme maps are inert, so `generate` reads the package's copies (high; needs Ada's verification). Also: `init` breaks a TypeScript host's build (R1-1); the default output lands in `dist/` (R1-2); `get_token_consumers` returns `[]` in a consumer (R1-7).

## Targeted check and result

- The protocol § 9 schema check over the record: all 25 labels present, 6 stop lines from the vocabulary, a well-formed `cold-observation`, both signed strings verbatim, no forbidden wording (pasted in `task-25-5-completion.md`).
- Every quoted passage was checked against `birth.jsonl`, `probe-*.jsonl` and the captures.

## Application-time adaptations

- Preflight attempt 1 (fresh `HOME`) ended `auth-required` because of the keychain hazard. Every later CC session ran under `CLAUDE_CONFIG_DIR`.
- **The relayed paste-back said no login was asked; the capture shows a browser sign-in.** The record quotes the capture.
- **Disclosed slip**: after the run, I dry-ran a revised step-10 block against the run's out folder. It rewrote three files from unchanged inputs and created `tmp-writes.txt`. This is disclosed in the record's integrity note.
