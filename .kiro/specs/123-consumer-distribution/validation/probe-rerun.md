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

*Written by Thurgood, 2026-10-15, from `/tmp/dp-trio/probe-rerun-1/out/` (read-only) and Peter's paste-back. Quotations are from the files; where the paste-back and a file differ, the file is quoted. Transcripts and deliverables are not committed; the excerpts below are.*

### Run facts (both sessions)

- `run-id:` probe-rerun-1 · run 21:48:20Z → 22:40:57Z (2026-10-15)
- `session-launched-by:` Peter (macOS Terminal) — every session: the preflight (step 4), session A (step 5), the restart (step 6b) and session B (step 6c). Step 6d was **not** run.
- `launch-commit:` `COMMIT=539387fa2` (this file at the launch; the block's placeholder was filled in Peter's terminal, not in the file).
- `candidate:` `/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0-d6b6c7445.tgz`, sha1 **`326d798dcd71320129267cbeb97a2d59c13bfba7`** (step 2 = the Expect value), built by `release-publish.ts --dry-run d6b6c7445` (`completion/task-28-2-completion.md`). Its version string reads 15.1.0; it is the release-4 candidate, not the published 16.0.0. A's lock: `node_modules/@3fn/core` 15.1.0, `resolved` the candidate's path.
- `inputs:` step 1's six sha1s **match** § Frozen inputs exactly (`out/inputs-sha1.txt`); both folders held `README.md components package.json tokens.json` and nothing else at launch.
- `harness:` Claude Code **2.1.301** — `out/host.txt` (both the `npx` CLI and the `PATH` binary) and both sessions' init events (`claude_code_version`). Model `claude-fable-5-1`. Isolation `CLAUDE_CONFIG_DIR=/tmp/dp-trio/probe-rerun-1/home/.claude`, real `HOME`. Preflight (`out/preflight-214839.typescript`): theme → login method → browser sign-in ("Logged in as peter@designerpunk.ai") → security notes → terminal setup ("No, maybe later") → "Yes, I trust this folder" (the empty folder) → the notice "Auto mode is now Claude Code's default permission mode."
- **`permissionMode` (read from each init event, PQ-1)**: session A **`auto`**; session B **`default`**. Both on 2.1.301 in the same run store. Why they differ is **cannot-tell** from these files (B's folder was trusted at 6b and carries a project `.claude/settings.json`; A's folder was never opened interactively; the interactive B open itself showed "auto mode on").
- `operator-log:` none — no Ctrl-C, no typing beyond the blocks, no 6d (paste-back).
- `writes-outside-folder:` `/tmp/claude-501` and `/tmp/cc-socks` — the orchestrator session's harness directories (unrelated); **`/tmp/zeb_def_ipc_57361` — unattributed** (not the agent's by any transcript line; not the orchestrator's by its account). The run store gained the expected session files (`projects/-private-tmp-dp-trio-probe-rerun-1-{a,b,empty}/`, `history.jsonl`, `.claude.json` and backups, caches, `settings.json`). Inside the folders, the docs MCP wrote `mcp-server/logs/` in both (R1-3's class; `.kiro/issues/2026-10-02-docs-mcp-logs-dir-cwd-relative.md`), and A's folder also gained `logs/`.
- `source-access:` audit **0 hits** (`out/source-access-audit.txt`). Session A did read **its own run-store spill file** (`/tmp/dp-trio/probe-rerun-1/home/.claude/projects/…/tool-results/b2lmcsqat.txt`, the harness's "Output too large … saved to" file for its own earlier `Bash` result) — the harness's, inside the run; not DesignerPunk source.

### Session A — the September path, release-4 artifact

- `mcp-connection:` `[{"name":"designerpunk-docs","status":"connected","source":"dynamic"}]` (as September).
- `result:` `success`, **34** turns, `completed`, `is_error: false`, **$2.76**, **226737 ms**; `permission_denials: []`; stderr empty.
- `deliverable:` `meridian-disabled-states.md`, **16026** bytes, 343 lines — **written through a `Bash` heredoc**, not `Write`.
- `tool-calls:` docs MCP **23** — `get_section` 9 (one `SectionNotFound`), `find_docs` 6, `get_document_summary` 6, `get_document_full` 2 (n=1: 13 / 2 / 3 / 0). Other: **`Bash` 9, all admitted** (`ls`/`find`, three `grep` sweeps of `node_modules/@3fn/core/governance/`, a read of its own spill file, one `python3 -I` contrast computation, the heredoc write), `ToolSearch` 1. `--allowedTools` does not list `Bash`; **auto mode admitted all nine** (n=1 on 2.1.278: 7 `Bash`, 3 denied).
- `sequence (docs MCP):` `find_docs` ×4 ("disabled state", "opacity", "interaction states hover focus pressed", "accessibility aria-disabled") → `get_document_full` Token-Family-Opacity, Component-Family-Button → `get_document_summary` ×6 (Form-Inputs, Test-Behavioral-Contract-Validation, Token-Family-Color, Token-Family-Blend, Web-Authoring-Standards, Contract-System-Reference) → `get_section` ×8 (Test-Behavioral-Contract-Validation "Disabled State Exclusion Guard Validation"; Blend "Anti-Patterns to Avoid"; Contract-System-Reference "Exclusion Fields", "Three States", "state (16)"; Form-Inputs "Contract Details", "Accessibility Considerations"; Web-Authoring-Standards "Hard Rules") → `find_docs` ×2 ("adjudication exclusion guard", "loading state validate on blur unavailable action") → three `Bash` sweeps → `get_section` Component-Templates **"No Disabled States — Standardized Exclusion" → `SectionNotFound`**, suggestions `Overview, Schema Format Templates, Inheritance Pattern Templates, Behavioral Contract Templates, Quick Reference: Template Selection, Related Documentation` → `Bash grep` on the file finds it: **`751:#### No Disabled States — Standardized Exclusion`** — an H4.

- `discovery (per question):`

| Question the agent was answering | Call(s) | Discovery | Evidence |
|---|---|---|---|
| How does DesignerPunk treat disabled states? | `find_docs "disabled state"` | **succeeded** | 4 rows, all `strong` (Test-Behavioral-Contract-Validation first) |
| What does it say about opacity for disabled? | `find_docs "opacity"`; `get_document_full` Token-Family-Opacity | **succeeded** | Opacity § Disabled States: "Applying opacity to simulate a disabled state is the exact pattern the ruling prohibits" |
| How are interaction states handled? | `find_docs "interaction states hover focus pressed"`; Button `get_document_full` | **succeeded** | 10 rows (1 `strong`, 9 `partial`) |
| What are the accessibility rules (aria-disabled)? | `find_docs "accessibility aria-disabled"`; Form-Inputs sections; Web-Authoring-Standards "Hard Rules" | **succeeded** (partial match) | 8 rows, all `partial`; acted on the sections, not the ranking |
| Where is the ruling itself? | `find_docs "adjudication exclusion guard"`; Contract-System-Reference sections | **failed** for the record (the adjudication issue file is not in the package); **succeeded** for its content via the exclusion guard and template text | 1 `partial` row |
| What replaces disabled (loading, validation)? | `find_docs "loading state validate on blur unavailable action"` | **succeeded** (partial) | 10 `partial` rows; Component-Family-Loading among them |
| The "No Disabled States" template text | `get_section` Component-Templates | **failed** (`SectionNotFound`; the heading is an H4 the server cannot address); **recovered by `grep` on the file**, not by the suggestions (which list H2 only) | the error payload above; `u5nf81` result |
| Contrast of the proposed colours | `Bash python3 -I` | succeeded (admitted by auto mode) | "white on brand-blue 5.42:1 …" |

- `banner:` **met twice — both through `Bash grep` over the package's `governance/` files, never through the MCP.** The two `Audience framing` hits are inside the results of the `rAR1p3` and `wGgi7N` sweeps (Component-Development-Guide's banner). The bannered docs A fetched through the MCP — Contract-System-Reference (summary + 3 sections) and Test-Behavioral-Contract-Validation (summary + 1 section) — returned **no banner**: summaries and sections do not carry a doc's preamble, where the banner sits. **What A did with it**: nothing observable — no transcript text and no deliverable line mentions audience, worked example or transferable.
- `reference-guidance:` **not met** (`grep -c 'Reference use is a sanctioned mode'` → 0). Nothing on this path points the agent to INSTALL, and it did not read it.
- `the n=1's four gaps, re-read:`
  1. *a signal that reference use is sanctioned* — **not observed** (the prompt supplied the framing, as in September).
  2. *`Last Reviewed` weighed when docs disagree* — **not exercised**: the disagreement the n=1 navigated (Opacity's "use opacity for disabled" vs the July ban) is gone from the release-4 corpus (Opacity § Disabled States was reconciled by #170). A states the July ruling and no conflict.
  3. *`SectionNotFound` retried with `suggestions`* — **not observed, and could not have worked**: the suggestions list H2 only, and the target is an H4 `get_section` cannot reach (`.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md`). A **did recover** — by grepping the file — which September's agent did not.
  4. *quotes re-verified* — **one miss**: A puts "dim it with opacity to look disabled" in quotation marks; the served text is "Applying opacity to simulate a disabled state is the exact pattern the ruling prohibits" (a paraphrase presented as a quote).
- `spot-checks` (against `/tmp/dp-trio/probe-rerun-1/a/node_modules/@3fn/core/governance/`):
  1. "a formal ruling in July 2026 and applied to every component with zero exceptions" — **verified** (Component-Templates L753–756: "Per the 2026-07-15 adjudication … corpus-wide with zero exceptions").
  2. "explicitly deprecated the one colour-blending token it had for disabled styling" — **verified** (Token-Family-Blend L31, L73: `blend.disabledDesaturate` "DEPRECATED 2026-07-15").
  3. "read-only … never disabled semantics" — **verified** (Component-Inheritance-Structures L84: "`state_readonly` … — never disabled semantics").
  - Contrast figures re-computed (WCAG 2.1): 5.42, 3.45, 3.12, 6.05, 1.43 — **all correct**; the opacity case 2.13 (recomputed 2.11; compositing rounding).
- `intent-vs-execution:` **PASS** — zero DesignerPunk names, values or code in Meridian's tokens or CSS (grep for DesignerPunk token or contract names → 0; hex values are Meridian's own). Stricter than September: it carries the ban further (no `disabled` token at all; one constrained `aria-disabled` "inert" style marked as a divergence). `idiom:` **PASS** — flat hex, px, plain web CSS.
- `findings:` P-1, P-2, P-4, P-5, P-6 (below, § Findings).

### Session B — the shipped path (INSTALL § 2)

- `attach:` "✓ Created .mcp.json (designerpunk-docs + designerpunk-application) · ✓ Created .claude/settings.json (27 approved tools) · ✓ Reference-wired cc — MCP config + approvals (docs + application servers), no agents", then "restart your agent session now — … (approve them if your tool asks)". `.mcp.json`: `designerpunk-docs` → `./node_modules/@3fn/core/dist/mcp/docs-mcp.js`, `designerpunk-application` → `…/application-mcp.js`. `.claude/settings.json`: 27 `permissions.allow` entries, no `defaultMode`. A `designerpunk.manifest.json` (`posture: consume`) was also written.
- `restart:` (`out/b-open-222913.typescript`, verbatim) — first "Quick safety check: Is this a project you created or one you trust? … ⚠ This folder pre-approves 27 tool permissions in .claude/settings.json: mcp__designerpunk-docs__find_docs, … and 19 more. These will apply without asking. Only proceed if you trust this configuration." → **Yes, I trust this folder**; then "2 new MCP servers found in this project. Select any you wish to enable. MCP servers may execute code or access system resources. All tool calls require approval." (both preselected) → **Enable selected**. Banner "⏵⏵ auto mode on". `/mcp`: "Project MCPs (…/b/.mcp.json): ✔ designerpunk-application 21 tools, ✔ designerpunk-docs 8 tools; claude.ai: ✔ claude.ai Claude Docs 8 tools; Built-in: ◯ computer-use". **This matches INSTALL** (two asks, preselected, "Enable selected").
- `project-config-honoured-headless:` **YES** — the headless `-p` session, with no `--mcp-config`, connected both project servers: `{"name":"designerpunk-docs","status":"connected","source":"project"}`, `{"name":"designerpunk-application","status":"connected","source":"project"}` (plus the account connector `claude.ai Claude Docs` `pending`, unused). **Design open input 18 is answered for Claude Code on this path**: a headless session honours the project config and the enablement given at the interactive open. `fallback used:` **no**.
- `result:` `success`, **37** turns, `completed`, `is_error: false`, **$2.48**, **225718 ms**; stderr empty; **`permission_denials`: 1** — `Bash` `python3 -I -c '…'` (a contrast check run *after* the deliverable was written): "This command requires approval" (default mode; September's pattern).
- `deliverable:` **12711** bytes, written with `Write`.
- `tool-calls:` docs MCP **25** — `get_section` 13, `find_docs` 8, `get_document_summary` 4, `get_document_full` **0**; application MCP 2 — `get_design_rules`, `get_design_philosophy`; `Read` 4 (README, tokens.json, button.css, **`designerpunk.manifest.json`**); `Bash` 2 (a `find`, admitted; the `python3`, denied); `ToolSearch` 2; `Write` 1.
- `discovery (per question):`

| Question the agent was answering | Call(s) | Discovery | Evidence |
|---|---|---|---|
| How does DesignerPunk treat disabled states? | `find_docs "disabled state"` | **succeeded** | 4 `strong` rows |
| Opacity for disabled | `find_docs "disabled opacity"`; Opacity summary + "Disabled States", "Semantic Opacity Tokens", "Accessibility Considerations" | **succeeded** | the "exact pattern the ruling prohibits" text |
| Interaction states | `find_docs "interaction states hover focus pressed disabled"`; Button/Form-Inputs "Behavioral Contracts" | **succeeded** | 1 `strong` + 9 `partial` |
| Accessibility of disabled controls | `find_docs "accessibility contrast disabled controls"` | **succeeded** | 1 `strong` + 9 `partial` |
| `aria-disabled` | `find_docs "aria-disabled"` | **failed** | 0 rows, `matchConfidence: none`; it moved on (no action on the empty result — the certainty rule held) |
| Where is the ruling itself? | `find_docs "button-cta-disabled-state-adjudication"`, `"adjudication unavailable action not rendered"` | **failed** for the record (not in the package); content found via the exclusion-guard section and Blend's anti-pattern | 5 and 1 `partial` rows |
| Forced colours, focus | Web-Authoring-Standards "6. High Contrast Mode", "4. Focus Patterns" | **succeeded** | "Interactive elements must remain visible in forced-colors mode … hard requirement" |
| What replaces disabled (busy) | `find_docs "loading state busy async pending"` | **succeeded** (partial) | 12 `partial` rows |
| The system's design principles | `get_design_rules`, `get_design_philosophy` (application MCP) | **succeeded** | rule list; "Electric Precision" |

- `banner:` **none met** (`grep -c 'Audience framing'` → 0). B fetched bannered docs only by summary or section (Test-Behavioral-Contract-Validation: summary + "Disabled State Exclusion Guard Validation") and never called `get_document_full`, so no banner reached it — **P-1**.
- `reference-guidance:` **not met** (0). `attach --reference`'s output points at no guidance; B read the manifest, which carries none.
- `the n=1's four gaps, re-read:` 1 **not observed** (prompt-supplied); 2 **not exercised** (no disagreement left in the corpus); 3 **not exercised** (no `SectionNotFound`); 4 **held** — its one quoted phrase, "for usability and accessibility reasons", is verbatim in the served Test-Behavioral-Contract-Validation L315 it fetched; it **disclosed** that its contrast numbers are hand-computed because the check was denied.
- `spot-checks:`
  1. "In July 2026 DesignerPunk ruled that no component may have a disabled state, with zero exceptions, 'for usability and accessibility reasons.'" — **verified** (Component-Templates L753–756; the quoted phrase at Test-Behavioral-Contract-Validation L315).
  2. "calls disabled-via-opacity the exact pattern its ruling prohibits" — **verified** (Token-Family-Opacity L373–376).
  3. "Forced-colors support is a hard rule for anything interactive" — **verified** (Web-Authoring-Standards L155).
  - Contrast (hand-computed): 4.55, 5.33, 1.18 — **correct** (re-computed 4.55, 5.33, 1.17).
- `intent-vs-execution:` **PASS** — zero DesignerPunk names, values or code in Meridian's tokens or CSS. Closer to September than A: it adopts the preference order, then defines a styled `disabled` fallback with `disabled-background #EDEDED` and `disabled-text #6B6B6B` — the same two values September proposed. `idiom:` **PASS** — flat hex, px, plain CSS, a `forced-colors` block with system keywords.
- `findings:` P-1, P-2, P-3 (below).

### Findings

**Forced negative, written, per session**: session A — **no product failure in the agent's work** (intent extraction PASS, idiom PASS, three spot-checks verified, one paraphrase presented as a quote); session B — **no product failure in the agent's work** (PASS, PASS, three verified, the one quote verbatim). Every finding below is about what the **product delivered** to the agent, the **instrument**, or the **comparator**.

| # | Session | Finding | Evidence | Route |
|---|---|---|---|---|
| **P-1** | A, B | **Audience banners do not reach a reference-mode agent through the docs MCP's summary-first path.** `get_document_summary` and `get_section` omit a doc's preamble, where every banner sits; only `get_document_full` returns it. Both sessions fetched bannered docs that way and received none; A met banner text only by `grep`-ing the package files, and neither used it. **On this evidence Req 20.8's "reference-mode framing rides the banner language" is not delivered on the MCP path** | the tool_result scan above; the banner predicate's 20 docs vs the fetched docs; re-checked 2026-10-15 on the steward docs MCP: `get_document_summary` and `get_section("Overview")` on bannered `process-hook-operations` both return no banner (the summary carries metadata and outline; the first section starts at its `##`) | **Thurgood** (docs MCP / banner convention, U4 Task 23) |
| **P-2** | A, B | **INSTALL § 2's reference bullets ("For the agent reading this corpus") reached neither agent.** Nothing on either path — `attach --reference`'s output, the manifest, the MCP — points to them | `grep` → 0 in both transcripts | **Thurgood** (install doc / reference-mode delivery) |
| **P-3** | (corpus) | **`Token-Family-Opacity` reads `Last Reviewed: 2026-03-06`** though its § Disabled States was rewritten on 2026-09-18 (#170). INSTALL's rule "defer to the more recently reviewed one" would weigh it wrongly in a future conflict | the served header; `git log` of the file | **Thurgood** (metadata, Civitas) → **Ada** (content owner reviews) |
| **P-4** | A | **`SectionNotFound` suggestions cannot reach an H4**, so INSTALL's "retry using the `suggestions` field" fails exactly where A needed it; A recovered by `grep` | the error payload; `u5nf81` | **Thurgood** — home `.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md` (now with a consumer-path instance) |
| **P-5** | A, B | **Instrument: the two sessions ran in different permission modes** (A `auto`, B `default`) on the same CLI. `--allowedTools` did not bound A (9 `Bash` admitted, including `python3` and a heredoc file write); B's `python3` was denied, as in September. Tool-use differences between A and B (and between A and the n=1) are **not attributable to the product** | init events; `permission_denials` | **Leonardo** (protocol; PQ-1's class: an explicit `--permission-mode`) |
| **P-6** | — | **Comparator corrections** (read against `git show v14.1.0:governance/…`): (i) the n=1's "no such heading exists" was wrong — "No Disabled States — Standardized Exclusion" existed at 14.1.0 as an **H4** (Component-Templates L751), so its `SectionNotFound` was the H4 defect, not a hallucinated heading; (ii) its "unsourced addition" was wrong — "for usability and accessibility reasons" is verbatim at 14.1.0 Component-Templates L774 (unverified *by that agent*, not unsourced) | `git show v14.1.0:governance/Component-Templates.md` | **Thurgood** — erratum appended to `probes/reference-corpus-probe-record.md` (2026-10-15) |

Also recorded, not findings: the docs MCP's `mcp-server/logs/` in both folders (R1-3's existing record); `/tmp/zeb_def_ipc_57361` unattributed; B's `claude.ai Claude Docs` connector `pending` and unused (account state).

### Comparison

- **A vs the n=1** (same path; release-4 candidate vs 14.1.0; CLI 2.1.301 `auto` vs 2.1.278 default):
  - **The corpus changed under the task**: the March-vs-July conflict the n=1 adjudicated is gone (#170), so A reports one consistent ruling. That is a product improvement the re-run can see.
  - A went further than September in carrying the ban (no `disabled` token; one constrained `aria-disabled` style), and **recovered** from the same `SectionNotFound` September dead-ended on.
  - More `find_docs` (6 vs 2), `get_document_full` used (2 vs 0), `Bash` unbounded by auto mode (9 admitted vs 3 denied). The mode difference (P-5) blocks attributing the tool-use change to the product.
- **B vs A** (same candidate; shipped path vs hand-wired; `default` vs `auto`):
  - The shipped path **works headless**: project config honoured, both servers connected, no fallback.
  - B also used the application MCP (design rules, philosophy), which only the shipped path wires.
  - B never met a banner; A met it only outside the MCP (P-1).
  - B's proposal sits closer to September's (a styled `disabled` fallback, the same two hex values); A's is stricter. One run per arm: **this difference cannot be attributed** to the path, the mode or chance.

### Verdict and the scoped Evidence sentence

- **Session A: SUPPORTS** the reference-corpus mode. *For*: intent extracted and re-argued for Meridian's constraints, zero transplanted names, three spot-checks verified, and recovery from a failed lookup. *Residual against*: one paraphrase in quotation marks, and the framing the product now ships for this mode reached it only by accident (P-1, P-2).
- **Session B: SUPPORTS** the reference-corpus mode, through the shipped entry path. *For*: the documented install and restart, project config honoured headless, three spot-checks verified, its one quote verbatim, an honest disclosure of an unverified computation. *Residual against*: **no** reference-mode framing reached it — no banner, no INSTALL bullets (P-1, P-2).
- **Req 20.8 / row 1.10**: the banner question is answered **no** for this task on both paths. The mode works on the agent's own reasoning plus the prompt's framing; the shipped framing is not what carried it.

**Evidence sentence (C1)**:
> *Requirement 26.7 states the n=1 "MEASURED A PRE-CHANGE ARTIFACT … n=1, one corpus, one task, one harness." This re-run adds two data points on the same corpus and the same task, byte-identical to the n=1's (`53a551e3c`), in one harness (Claude Code 2.1.301), against the release-4 candidate tarball (`326d798dcd71320129267cbeb97a2d59c13bfba7`, built at `d6b6c7445`), not the published 16.0.0: session A on the n=1's hand-wired path (SUPPORTS), session B on the shipped INSTALL § 2 path (SUPPORTS; the headless session honoured `attach --reference`'s project config). It is evidence about this corpus, this task and this harness only — and on it, the reference-mode framing the product ships (banners, INSTALL § 2's bullets) reached neither agent through the served path (P-1, P-2).*
