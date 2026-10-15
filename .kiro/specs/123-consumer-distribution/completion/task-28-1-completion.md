# Task 28.1 Completion: Probe re-run with scoping

**Date**: 2026-10-15
**Agent**: Thurgood (Opus), PRIMARY on Task 28 · **Launcher**: Peter (macOS Terminal; every session)

## What changed

- **`validation/probe-rerun.md`**, in two commits:
  - **Frozen before the run** (`539387fa2`): the n=1's inputs reproduced verbatim from the recovered folder (`53a551e3c`; six sha1s pinned, each reproduction `cmp`-identical), § Scope with 26.7's quote and the re-run's own scope in the same form, and launch blocks for two sessions (fork (c), Peter 2026-10-14).
  - **§ Record** (this subtask): both sessions written up from `/tmp/dp-trio/probe-rerun-1/out/` and Peter's paste-back — run facts, per-session discovery tables, banner and reference-guidance lines, the n=1's four gaps re-read, three spot-checks each, findings P-1–P-6 with the forced negative per session, the comparison, and the scoped Evidence sentence.
- **The result**: session A (the September `run.sh`, `PKG` = the candidate) and session B (INSTALL § 2, `attach --target=cc --reference`) both **SUPPORT** the reference-corpus mode on the release-4 candidate (`326d798d…`, built at `d6b6c7445`). Session B's headless session honoured the project config `attach` wrote, with no `--mcp-config` (design open input 18, answered for Claude Code on this path). **The shipped reference-mode framing reached neither agent through the served path** (P-1 banners, P-2 INSTALL bullets).
- **An erratum appended to the comparator**, `probes/reference-corpus-probe-record.md` (P-6): two of the n=1's spot-check judgments were wrong when read against `v14.1.0`.
- **Findings routed** into `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 4c.

## Targeted checks and results

- Step 1's six input sha1s = § Frozen inputs (`out/inputs-sha1.txt`); step 2's candidate sha1 = the Expect value; step 5a's derivation `diff` = exactly lines 8 and 22.
- Each session's init event and result read with `jq` (permission mode, servers, turns, cost, denials); every `tool_result` scanned for `Audience framing` and `SectionNotFound`.
- Spot-checks against the package's served `governance/` (both sessions, three each): all verified. Contrast figures re-computed: all correct.
- The n=1's disputed claims checked against `git show v14.1.0:governance/Component-Templates.md` (L751, L774).
- P-1 re-checked on the steward docs MCP: `get_document_summary` and `get_section` on a bannered doc return no banner.

## Application-time adaptations

1. **The two sessions ran in different permission modes** (A `auto`, B `default`) on the same CLI, so tool-use differences are not attributed to the product (P-5, with PQ-1's class).
2. **Gap 2 could not be exercised**: the March-vs-July disagreement the n=1 navigated is gone from the release-4 corpus (#170).
3. **Gap 3 could not succeed by design**: the heading is an H4, and the suggestions list H2 only (P-4). Session A recovered by `grep`.
4. **`/tmp/zeb_def_ipc_57361`** is recorded as unattributed.
5. **The erratum on the n=1 record** sits outside Task 28's listed Primary Artifacts; it is append-only and dated, and nothing above it was edited.
