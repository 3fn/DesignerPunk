# Reference-corpus probe inputs (2026-09-20) — reconstruction

Recovered 2026-10-14 from Claude Code session logs under `~/.claude/projects/`.
The original scratch folder,
`/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/bc43eba2-6548-45f7-8173-2ede511d746c/scratchpad/probe-ref-corpus/`,
was swept by macOS temp cleanup (only `node_modules/.bin` symlinks remain).

## Byte-exact (taken from the Write tool calls that created them)

| File | Bytes | Matches `ls -la` captured during the run |
|---|---|---|
| `README.md` | 1622 | yes |
| `tokens.json` | 424 | yes |
| `components/button.css` | 536 | yes |
| `mcp-docs.original.json` | 291 | yes (absolute path inside is the old scratch path; `run.sh` regenerates it) |
| `prompt.txt` | — | the `<TASK>` text, copied from the first user message of the successful run's session log |

Sources: setup subagent `agent-a63efd1e5066c2d15` (Writes at 21:13:43–21:14:12Z) and
coordinator session `bc43eba2-6548-45f7-8173-2ede511d746c` (launch command at 21:41:15Z).

## Reconstructed from captured output (not byte-exact)

- `package.json` — transcribed from `cat package.json` output during setup. It was produced by `npm init -y` then `npm install @3fn/core`.
- `september-run-output/meridian-disabled-states.md` — the deliverable the September agent wrote, taken from its Write call in session `ff9e1954-4469-4745-8c4d-77b945895e07`. Baseline for comparison, not an input.

## Run facts from the September run

- Package: `@3fn/core@14.1.0` (latest published at the time; no `npx designerpunk init`).
- CLI: `@anthropic-ai/claude-code` 2.1.278 via `npx --yes`; `claude` was not on PATH.
- Attempts 1 and 2 (from the sandboxed subagent shell) failed on CLI auth. Attempt 3, launched by the coordinator from an unsandboxed shell at 21:41:15Z, succeeded: 36 turns, `is_error: false`.
- Exact command: see `run.sh`. Flags were `--mcp-config mcp-docs.json --strict-mcp-config --allowedTools "Read,Glob,Grep,Write,mcp__designerpunk-docs__{find_docs,get_document_summary,get_section,get_document_full}" --max-turns 25 --output-format stream-json --verbose`.
- Files that were NOT in the folder at launch: nothing besides the above plus `package-lock.json`, `node_modules/`, `mcp-server/logs/` (created by the docs server smoke test), `server-stdout.log`, `server-stderr.log`, and the then-in-progress `probe-record.md`.
