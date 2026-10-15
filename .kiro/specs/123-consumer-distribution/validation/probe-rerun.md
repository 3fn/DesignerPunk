# Task 28.1 — The reference-corpus probe, re-run against the release-4 candidate (two sessions, one record)

**Spec**: 123 — Consumer Distribution · **Unit**: U5 (`task/123-u5-closeout`) · **Subtask**: 28.1 · **PRIMARY**: Thurgood (Opus) · **Launcher**: Peter, every session, from macOS Terminal (Decision 1, 2026-10-14) · `session-launched-by: Peter`
**Ruling**: 28.1 fork **(c)**, Peter, 2026-10-14 — run **both**: **session A** = the recovered `run.sh` with `PKG=<the candidate tarball>` (the September path, `--mcp-config` hand-wired) **first**; **then session B** = the shipped entry path, INSTALL § 2 (`npm install`, `attach --target=cc --reference`, restart). Two sessions, **one record** (this file).
**Comparator**: `.kiro/specs/123-consumer-distribution/probes/reference-corpus-probe-record.md` (the n=1, 2026-09-20, `@3fn/core@14.1.0`, Claude Code 2.1.278).
**Inputs**: recovered by Peter and committed at `53a551e3c` (`probes/reference-corpus-probe-inputs-2026-09-20/`, byte-exact per its `PROVENANCE.md`). **The re-run is therefore the same probe by bytes, not a reconstruction** (instruments block O-1 resolved): the same task prompt and the same foreign repo.
**Status**: § Frozen inputs and § Launch blocks are committed **before** either session runs. § Record is empty until Peter's paste-back.

**Traces**: Req 25.7 (the re-run), 26.7 (the scoping sentence), 25.5 (forced negative, per-question discovery), 20.8 (reference-mode framing rides the banner language).

---

## Scope — what this re-run can establish, and what it cannot

Requirement 26.7, quoted (`requirements.md` L881, its lead sentence and its scope clause):

> "**The reference-corpus mode has ONE data point, AND IT MEASURED A PRE-CHANGE ARTIFACT.**" … "n=1, one corpus, one task, one harness."

**This re-run's own scope, in the same form**: **two data points, one corpus, one task, one harness** — the same corpus (DesignerPunk's served docs), the same task and the same foreign repo as the n=1 (byte-identical, `53a551e3c`), on Claude Code (version recorded at step 3), against **the release-4 candidate tarball** (built by `release-publish.ts --dry-run` at the U5 head; sha1 recorded at step 2) — **not the published 16.0.0**, whose version string, lock and CHANGELOG title differ (instruments O-2). Session A changes only the artifact; session B also changes the entry path. Together with the n=1 the mode has **n=3, all in one corpus, one task, one harness**.

**What it can establish**: whether the shipped artifact's reference-corpus surface (the INSTALL § 2 section, the audience banners, `attach --reference`) is met by an agent doing this task, and what the agent does with it (Req 25.7 / 20.8: "the only evidence Requirement 20.8's 'reference-mode framing rides the banner language' will ever have").
**What it cannot establish**: the mode's behaviour on another corpus, task or harness; a stranger's experience (agents role-play nothing here; the prompt names the mode); whether a difference between A and the n=1 is the product rather than the CLI version or run-to-run variance (n=1 per arm).

**The Evidence sentence, in the form C1's cell will carry it** (values filled from § Record):
> *Requirement 26.7 states the n=1 "MEASURED A PRE-CHANGE ARTIFACT … n=1, one corpus, one task, one harness." This re-run adds two data points on the same corpus and the same task, byte-identical to the n=1's (`53a551e3c`), in one harness (Claude Code `<version>`), against the release-4 candidate tarball (`<sha1>`, built at `<head>`), not the published 16.0.0: session A on the n=1's hand-wired path (`<verdict>`), session B on the shipped INSTALL § 2 path (`<verdict>`). It is evidence about this corpus, this task and this harness only.*

---

## Frozen inputs

**Source of every byte**: `git show 53a551e3c:.kiro/specs/123-consumer-distribution/probes/reference-corpus-probe-inputs-2026-09-20/<file>`. Step 1 extracts them from the launch commit and prints their sha1s; each must equal the value below.

| File | sha1 at `53a551e3c` | Enters the agent's folder? |
|---|---|---|
| `README.md` | `0fe6c22e881451a035eb51fc8bde4f0baa31b39c` | yes (both sessions) |
| `tokens.json` | `67560f91dcae8d06eb88e747c7de81f66fb34685` | yes (both sessions) |
| `components/button.css` | `4927b0698ac40cdd3d09e67d3124d4121c653f77` | yes (both sessions) |
| `package.json` | `05b5075d81899fc009078ea52437f8c9dfb8e088` | yes (both sessions; reconstructed, not byte-exact — `PROVENANCE.md`) |
| `prompt.txt` | `819d8d18242b5c39969573b2439fb778e4c3681c` | **no** — read from `$R/out/prompt.txt` (no trailing newline) |
| `run.sh` | `02882dffa84c82dff5130a74aa8afcc54f52f54f` | **no** — session A runs `$R/run-a.sh`, derived from it (below) |

**Kept out of the folder, and why**: `PROVENANCE.md` and `september-run-output/` (the n=1's own deliverable — an agent that read it would be copying, not reasoning), `mcp-docs.original.json` (the old scratch path; `run.sh` regenerates `mcp-docs.json`), and `run.sh` / `prompt.txt` (neither was in the September folder, and `run.sh`'s first comment names the probe). **Declared differences from the September folder**: it also held `mcp-server/logs/`, two server logs and the then-in-progress `probe-record.md` (`PROVENANCE.md` § "Run facts"); none is recreated.

### The task prompt (`prompt.txt`, verbatim)

```text
You are the design-system agent for Meridian, the design system in this directory (read its README and files first). Meridian has no disabled-state guidance at all — no tokens, styles, or rules for disabled controls. A DesignerPunk documentation MCP (designerpunk-docs) is available: it documents a DIFFERENT design system whose architecture (mathematical token scales, cross-platform, semantic token hierarchy) does NOT match Meridian's. Use it as a reference corpus: find how DesignerPunk reasons about disabled states, extract the INTENT and rationale (not the implementation), and write meridian-disabled-states.md proposing how Meridian should handle disabled states in its own idiom (flat hex tokens, px spacing, web-only CSS). Do not copy DesignerPunk token names, values, or code; translate the reasoning.
```

### The foreign repo — `README.md` (verbatim)

```markdown
# Meridian Design System

Meridian is a small, in-house, **web-only** design system maintained by a single product team. It is intentionally minimal — flat color tokens, a simple pixel-based spacing scale, and a handful of hand-written CSS components. There is no build pipeline, no cross-platform output, and no mathematical relationship between token values (they were picked by eye and refined through use).

## What exists

- `tokens.json` — flat token definitions:
  - `colors`: hex values (`brand-blue`, `brand-blue-dark`, `brand-red`, `text-primary`, `text-secondary`, `background`, `border`)
  - `spacing`: a fixed pixel list `[4, 8, 12, 16, 24, 40]` — no scale formula, just the values the team has needed so far
  - `radius`: three named pixel values
  - `fontSizes`: four named pixel values
- `components/button.css` — a single button component with a default and secondary visual style, and a `:hover` state. No focus style, no active/pressed style, and **no disabled state at all**.
- This README.

## Known gap

Meridian has **no disabled-state guidance anywhere** in the system:
- No `disabled` token (color, opacity, or otherwise) in `tokens.json`
- No `.meridian-button:disabled` or `[disabled]` styling in `components/button.css`
- No documentation describing how a disabled control should look, behave, or be marked up for accessibility

This gap has come up in product reviews more than once but has never been resolved. The team would like guidance on how to add disabled-state support that fits Meridian's existing style (flat hex tokens, px spacing, plain CSS) — not a wholesale redesign.
```

### `tokens.json` (verbatim)

```json
{
  "colors": {
    "brand-blue": "#2B6CB0",
    "brand-blue-dark": "#1A4E85",
    "brand-red": "#C0392B",
    "text-primary": "#1A1A1A",
    "text-secondary": "#5C5C5C",
    "background": "#FFFFFF",
    "border": "#D8D8D8"
  },
  "spacing": [4, 8, 12, 16, 24, 40],
  "radius": {
    "small": 2,
    "medium": 4,
    "large": 8
  },
  "fontSizes": {
    "small": 12,
    "body": 14,
    "large": 18,
    "heading": 24
  }
}
```

### `components/button.css` (verbatim)

```css
/* Meridian Button — basic web button component */

.meridian-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #2B6CB0;
  background-color: #2B6CB0;
  color: #FFFFFF;
  cursor: pointer;
}

.meridian-button:hover {
  background-color: #1A4E85;
  border-color: #1A4E85;
}

.meridian-button--secondary {
  background-color: #FFFFFF;
  color: #2B6CB0;
}

.meridian-button--secondary:hover {
  background-color: #F0F4F8;
}
```

### The September command — `run.sh` (verbatim)

```bash
#!/usr/bin/env bash
# Re-run of the 2026-09-20 reference-corpus probe (Spec 123 § 8).
# Usage: copy this folder to a fresh scratch dir, then:
#   PKG=@3fn/core@<release-4 version> ./run.sh
# Everything below mirrors the September command exactly except PKG and the
# absolute path inside mcp-docs.json, which must point at THIS folder.
set -euo pipefail
cd "$(dirname "$0")"
PKG="${PKG:-@3fn/core@14.1.0}"   # September run used 14.1.0 (latest published then)
rm -rf node_modules package-lock.json
npm install "$PKG" 2>&1 | tail -3
cat > mcp-docs.json <<JSON
{
  "mcpServers": {
    "designerpunk-docs": {
      "command": "node",
      "args": ["$(pwd)/node_modules/@3fn/core/dist/mcp/docs-mcp.js"]
    }
  }
}
JSON
TASK="$(cat prompt.txt)"
npx --yes @anthropic-ai/claude-code -p "$TASK" \
  --mcp-config mcp-docs.json --strict-mcp-config \
  --allowedTools "Read,Glob,Grep,Write,mcp__designerpunk-docs__find_docs,mcp__designerpunk-docs__get_document_summary,mcp__designerpunk-docs__get_section,mcp__designerpunk-docs__get_document_full" \
  --max-turns 25 --output-format stream-json --verbose \
  > transcript.jsonl 2> run-stderr.log
echo "exit=$?"
ls -la meridian-disabled-states.md 2>/dev/null || echo "deliverable NOT produced"
```

**PKG** = the candidate tarball, `$TGZ` (step 0), the same file in both sessions; its sha1 is checked at step 2. September's value was `@3fn/core@14.1.0`.

### Session A — `run.sh`, two lines re-pointed

`$R/run-a.sh` is `run.sh` with exactly two lines changed, so that the agent's folder holds what September's held and nothing that names the probe. Step 5 prints this `diff`, and anything else in it is a stop:

```diff
8c8
< cd "$(dirname "$0")"
---
> cd "$R/a"
22c22
< TASK="$(cat prompt.txt)"
---
> TASK="$(cat "$R/out/prompt.txt")"
```

Two further differences are environmental, declared here and recorded at steps 3–5: **`CLAUDE_CONFIG_DIR="$R/home/.claude"`** with the real `HOME` (an isolated Claude Code store; September used the real user store — the trio's R1-13 lesson, never `HOME=`), and **the CLI** (`npx --yes @anthropic-ai/claude-code` resolves the current release; September resolved 2.1.278). `--max-turns 25` is passed as September passed it; on the 2.1.29x–2.1.30x line it is accepted, not enforced (trio R1-11), and the n=1 also ran past it (36 turns).

### Session B — the shipped path (INSTALL § 2)

Same scaffold in a second folder, `$R/b`. Then, in order:
1. `npm install "$TGZ"` — INSTALL § 2 step 1 with the candidate in place of the registry name (the trio's `file:` substitution).
2. `npx designerpunk attach --target=cc --reference` — step 2. It writes `.mcp.json` (docs + application servers) and `.claude/settings.json` (read-only tools pre-approved), and no agents (`src/cli/attach.ts` L482–497).
3. **The restart** — step 3: one interactive open, captured, in which Peter answers what Claude Code asks as INSTALL says (trust the folder; enable the servers), types `/mcp`, and exits. No task is typed.
4. The headless session: **`run.sh`'s command with `--mcp-config mcp-docs.json --strict-mcp-config` removed** — every other flag, the allow-list, the prompt and the output file names identical to session A — so the servers come from the project config `attach` wrote.

**Unverified, and recorded either way** (design open input 18): whether a headless `-p` session honours the project `.mcp.json` and the enablement given at the interactive open. If the init event shows `designerpunk-docs` not `connected`, that is a **finding**, and the fallback (step 6c) re-runs with `--mcp-config .mcp.json`, logged under `operator-log`.

---

## Launch blocks — one per step, for Peter

**How to use these.** One new macOS Terminal window (zsh), kept open for the whole run: later steps use step 0's variables. Paste one block at a time, wait for it to finish, and paste its output back to the orchestrator. Nothing needs editing except `COMMIT=` and `TGZ=` in step 0, which the orchestrator fills (the commit carrying this file; the candidate tarball). **Every interactive session gets its own capture file** (the time is in its name) — a second open is fine, say so; nothing is overwritten. Leave `/tmp/dp-trio/probe-rerun-1/` in place: the record is written from it. **If macOS ever asks about your keychain, click Cancel — never reset — press Ctrl-C, and tell the orchestrator.** Run these from macOS Terminal, never from a shell inside the Claude app (friction row 9).

**Step 0 — variables and checks.** Expect: `0` (no nested-session variables), then `record found at commit`, then `inputs found at commit`, then the candidate's path from `ls`.

```sh
RUN=probe-rerun-1
COMMIT=FILL_IN_RECORD_COMMIT
DP="/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2"
TGZ="/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0-d6b6c7445.tgz"
R="/tmp/dp-trio/$RUN"
P=".kiro/specs/123-consumer-distribution/probes/reference-corpus-probe-inputs-2026-09-20"
REC=".kiro/specs/123-consumer-distribution/validation/probe-rerun.md"
AL="Read,Glob,Grep,Write,mcp__designerpunk-docs__find_docs,mcp__designerpunk-docs__get_document_summary,mcp__designerpunk-docs__get_section,mcp__designerpunk-docs__get_document_full"
env | grep -c -E '^(CLAUDECODE|CLAUDE_CODE_)'
git -C "$DP" cat-file -e "${COMMIT}:${REC}" && echo "record found at commit"
git -C "$DP" cat-file -e "${COMMIT}:${P}/run.sh" && echo "inputs found at commit"
ls -la "$TGZ"
```

**Step 1 — run folder, inputs, two scaffold copies.** Expect: six sha1 lines equal to § Frozen inputs' table, then `a` and `b` each listing `README.md components package.json tokens.json` and nothing else. If it prints `STOP`, stop and tell the orchestrator.

```sh
if [ -e "$R" ]; then echo "STOP: $R already exists"; else mkdir -p "$R/home" "$R/empty" "$R/src" "$R/a" "$R/b" "$R/out" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/start.utc" && touch "$R/out/start.stamp" && git -C "$DP" archive "${COMMIT}" "$P" | tar -x -C "$R/src" --strip-components=5 && (cd "$R/src" && shasum -a 1 README.md tokens.json components/button.css package.json prompt.txt run.sh | tee "$R/out/inputs-sha1.txt") && cp "$R/src/prompt.txt" "$R/out/prompt.txt" && for d in a b; do cp -R "$R/src/README.md" "$R/src/tokens.json" "$R/src/package.json" "$R/src/components" "$R/$d/"; echo "$d: $(ls -A "$R/$d" | tr '\n' ' ')"; done; fi
```

**Step 2 — the candidate's sha1.** Expect: `326d798dcd71320129267cbeb97a2d59c13bfba7`. Any other value: stop.

```sh
shasum -a 1 "$TGZ" | tee "$R/out/candidate-shasum.txt"
```

**Step 3 — host facts.** Paste the whole output. (The first `npx` line may download the CLI; that is expected.)

```sh
{ date -u +%Y-%m-%dT%H:%M:%SZ; hostname -s; sw_vers -productVersion; uname -m
echo "node $(node -v) / npm $(npm -v)"
echo "npx CLI: $(npx --yes @anthropic-ai/claude-code --version)"
echo "PATH claude: $(claude --version 2>&1)"
echo "isolation: CLAUDE_CONFIG_DIR=$R/home/.claude (real HOME)"
} > "$R/out/host.txt" 2>&1; cat "$R/out/host.txt"
```

**Step 4 — preflight (interactive): sign in to the isolated store, in an empty folder.** Expect Claude Code's first-run screens: theme, login method, a browser sign-in, security notes, terminal setup, trusting this (empty) folder. Choose the defaults, sign in, type no message. At the input prompt, type `/exit`. Paste back each screen and what you chose.

```sh
cd "$R/empty" && CLAUDE_CONFIG_DIR="$R/home/.claude" script -q "$R/out/preflight-$(date -u +%H%M%S).typescript" npx --yes @anthropic-ai/claude-code
```

**Step 5 — session A (headless; the September path).** First the derivation check — Expect exactly the two-hunk `diff` shown in § Frozen inputs (lines 8 and 22). Then the run: it prints the install's last lines, then nothing until the session ends (minutes), then `exit=…` and the deliverable's `ls` line. Then run the check block and paste all three outputs.

```sh
sed -e 's|^cd "\$(dirname "\$0")"$|cd "$R/a"|' -e 's|^TASK="\$(cat prompt.txt)"$|TASK="$(cat "$R/out/prompt.txt")"|' "$R/src/run.sh" > "$R/run-a.sh" && diff "$R/src/run.sh" "$R/run-a.sh"
```

```sh
date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/a.start.utc"; R="$R" PKG="$TGZ" CLAUDE_CONFIG_DIR="$R/home/.claude" bash "$R/run-a.sh" 2>&1 | tee "$R/out/a-run.txt"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/a.end.utc"
```

```sh
T="$R/a/transcript.jsonl"; head -c 600 "$R/a/run-stderr.log"; echo
jq -c 'select(.type=="system" and .subtype=="init") | {cwd, model, claude_code_version, mcp_servers}' "$T"
jq -c 'select(.type=="result") | {subtype, num_turns, terminal_reason, is_error, total_cost_usd, duration_ms}' "$T"
jq -r 'select(.type=="assistant") | .message.content[]? | select(.type=="tool_use") | .name' "$T" | sort | uniq -c
echo "banner lines met: $(grep -c 'Audience framing' "$T")"; echo "INSTALL reference bullets met: $(grep -c 'Reference use is a sanctioned mode' "$T")"
grep -n -A3 '"node_modules/@3fn/core"' "$R/a/package-lock.json" | head -4; ls -la "$R/a"
```

**Step 6a — session B: install and `attach` (INSTALL § 2 steps 1–2).** Expect: npm's `added … packages` line; then `✓ Reference-wired cc — MCP config + approvals (docs + application servers), no agents`; then `.mcp.json` naming `designerpunk-docs` and `designerpunk-application` only, and `.claude/settings.json` present. Paste the whole output.

```sh
cd "$R/b" && npm install "$TGZ" 2>&1 | tail -3 | tee "$R/out/b-install.txt" && npx designerpunk attach --target=cc --reference 2>&1 | tee "$R/out/b-attach.txt"; jq -r '.mcpServers | keys[]' "$R/b/.mcp.json"; ls -la "$R/b" "$R/b/.claude"; cp "$R/b/.mcp.json" "$R/out/b-mcp.json"; cp "$R/b/.claude/settings.json" "$R/out/b-settings.json"
```

**Step 6b — session B: the restart (interactive, captured; INSTALL § 2 step 3).** Do not type a task. Before you type anything, note every prompt Claude Code shows, word for word. Answer as INSTALL says: trust the folder; enable DesignerPunk's servers ("Enable selected" if offered). Then type `/mcp`, wait for the list, press Esc, and type `/exit`. Paste back each prompt word for word with your answer, and the `/mcp` list.

```sh
cd "$R/b" && CLAUDE_CONFIG_DIR="$R/home/.claude" script -q "$R/out/b-open-$(date -u +%H%M%S).typescript" npx --yes @anthropic-ai/claude-code
```

**Step 6c — session B: the headless run.** The same command as session A's, without `--mcp-config mcp-docs.json --strict-mcp-config`. It prints nothing until the session ends. Then run the check block from step 5 with `a` replaced by `b` (the block below), and paste both outputs.

```sh
cd "$R/b" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/b.start.utc" && CLAUDE_CONFIG_DIR="$R/home/.claude" npx --yes @anthropic-ai/claude-code -p "$(cat "$R/out/prompt.txt")" --allowedTools "$AL" --max-turns 25 --output-format stream-json --verbose > transcript.jsonl 2> run-stderr.log; echo "exit=$?" | tee "$R/out/b.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/b.end.utc"; ls -la meridian-disabled-states.md 2>/dev/null || echo "deliverable NOT produced"
```

```sh
T="$R/b/transcript.jsonl"; head -c 600 "$R/b/run-stderr.log"; echo
jq -c 'select(.type=="system" and .subtype=="init") | {cwd, model, claude_code_version, mcp_servers}' "$T"
jq -c 'select(.type=="result") | {subtype, num_turns, terminal_reason, is_error, total_cost_usd, duration_ms}' "$T"
jq -r 'select(.type=="assistant") | .message.content[]? | select(.type=="tool_use") | .name' "$T" | sort | uniq -c
echo "banner lines met: $(grep -c 'Audience framing' "$T")"; echo "INSTALL reference bullets met: $(grep -c 'Reference use is a sanctioned mode' "$T")"
ls -la "$R/b"
```

**Step 6d — ONLY IF step 6c's init line shows `designerpunk-docs` missing or not `connected`.** Tell the orchestrator first; the record logs it under `operator-log` as the fallback, and the failure stays a finding. It moves 6c's outputs aside (nothing is overwritten), then re-runs with the project config passed explicitly.

```sh
cd "$R/b" && for f in transcript.jsonl run-stderr.log meridian-disabled-states.md; do [ -e "$f" ] && mv "$f" "$R/out/b-noserver-$f"; done; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/b2.start.utc" && CLAUDE_CONFIG_DIR="$R/home/.claude" npx --yes @anthropic-ai/claude-code -p "$(cat "$R/out/prompt.txt")" --mcp-config .mcp.json --allowedTools "$AL" --max-turns 25 --output-format stream-json --verbose > transcript.jsonl 2> run-stderr.log; echo "exit=$?" | tee "$R/out/b2.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/b2.end.utc"; jq -c 'select(.type=="system" and .subtype=="init") | {mcp_servers}' transcript.jsonl
```

**Step 7 — after: copies, writes outside the folder, the source-access audit.** Paste the whole output. That ends the run.

```sh
for s in a b; do for f in transcript.jsonl run-stderr.log meridian-disabled-states.md; do [ -e "$R/$s/$f" ] && cp -p "$R/$s/$f" "$R/out/$s-$f"; done; done
find "$R/home" -type f -newer "$R/out/start.stamp" | sed "s|$R/home|HOME|" | grep -v -E "/(plugins|skills|statsig|shell-snapshots)/" | sort | head -30
find /tmp/ -maxdepth 1 -newer "$R/out/start.stamp" 2>/dev/null | grep -v -E "^/tmp/$|^/tmp/dp-trio$" | tee "$R/out/tmp-writes.txt"
grep -n -i -E 'DesignerPunk-v2|wt-u5|claude-501|github\.com/3fn/DesignerPunk|raw\.githubusercontent\.com/3fn' "$R"/out/a-transcript.jsonl "$R"/out/b-transcript.jsonl > "$R/out/source-access-audit.txt"; echo "source-access audit hits: $(wc -l < "$R/out/source-access-audit.txt" | tr -d " ")"
date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/end.utc"; ls -la "$R/out"
```

**What to paste back**: the output of steps 0–7; every prompt you answered in steps 4 and 6b, word for word, with your answer; anything you typed that the steps did not tell you to type, and why; any Ctrl-C and why. Then: "`probe-rerun-1` done; files in `/tmp/dp-trio/probe-rerun-1/out`."

---

## Record

*Empty until the run. Written by Thurgood from `$R/out/` and Peter's paste-back. Every field is owed for each session; "none" is written, never implied (Req 25.5).*

### Run facts (both sessions)

- `run-id:` probe-rerun-1
- `session-launched-by:` Peter (macOS Terminal) — every session, including the preflight and 6b
- `candidate:` path, sha1 (step 2), the head it was built at, the `release-publish.ts --dry-run` record
- `inputs:` step 1's six sha1s vs § Frozen inputs (match / mismatch)
- `harness:` CLI version (step 3; and the init event's `claude_code_version`), isolation, preflight screens
- `operator-log:` every act Peter took beyond the blocks, verbatim, with the reason; the 6d fallback if used; `none` if none
- `writes-outside-folder:` step 7's lists, each entry classed (agent / harness / unrelated)
- `source-access:` audit hit count and each hit classed

### Session A — the September path, release-4 artifact

- `mcp-connection:` the init event's `mcp_servers`
- `result:` subtype, `num_turns`, `terminal_reason`, `is_error`, cost, duration
- `deliverable:` produced? path, bytes
- `tool-calls:` the docs-MCP calls by name with counts (n=1: `get_section` 13, `get_document_summary` 3, `find_docs` 2, `get_document_full` 0), the docs-MCP sequence in order, and the other tools' counts with any denials
- `discovery (per question)` — one row per thing the agent went looking for:

| Question the agent was answering | Call(s) | Discovery | Evidence (transcript line / tool_result excerpt) |
|---|---|---|---|
| | | succeeded / failed | |

- `banner:` did a served doc's "Audience framing" banner reach the agent (count, which docs)? What it did with it — quoted the worked-example / transferable split, used it to decide what to carry over, or ignored it (quote). `none met` written if none (row 1.10; Req 25.7 / 20.8)
- `reference-guidance:` did the agent meet INSTALL § 2's reference bullets (by reading INSTALL, or not at all)? On this path, nothing points it there; `not met` is expected and still written
- `the n=1's four gaps, re-read` — for each, `observed` / `not observed` / `cannot-tell`, with the transcript evidence:
  1. a signal that reference use of a foreign system is a sanctioned mode
  2. `Last Reviewed` dates weighed when two docs disagree
  3. a `SectionNotFound` retried with the server's `suggestions`
  4. quoted text and dates re-verified before being presented as quotes
- `spot-checks:` three of the deliverable's claims about DesignerPunk, each checked against the served doc (the n=1's method): verified / partially / not
- `intent-vs-execution:` PASS / FAIL with the reason (DesignerPunk names, values or code in Meridian's proposal?); `idiom:` flat hex, px, web-only CSS?
- `findings:` numbered (P-A1, …), each with its owner — **Forced negative, written**: `findings: none` if none

### Session B — the shipped path (INSTALL § 2)

- `attach:` 6a's output; `.mcp.json` servers; `.claude/settings.json` allow-list count
- `restart:` each prompt 6b showed, word for word, with Peter's answer; the `/mcp` list
- `project-config-honoured-headless:` yes / no, from 6c's init event (design open input 18); `fallback used:` no / yes (6d, logged)
- then every Session A field above, for session B (including its own discovery table, banner, reference-guidance and four-gaps lines)
- `findings:` numbered (P-B1, …) — **Forced negative, written**

### Comparison

- **A vs the n=1** (same path, release-4 artifact vs 14.1.0, CLI version differs): what moved, per field.
- **B vs A** (same artifact, shipped entry path vs hand-wired): what moved, per field.
- What a difference can and cannot be attributed to (one run per arm).

### Verdict and the scoped Evidence sentence

- Verdict per session: SUPPORTS / DOES NOT SUPPORT the reference-corpus mode, with the strongest evidence for and the residual against (the n=1's form).
- The Evidence sentence from § Scope, with its values filled.
