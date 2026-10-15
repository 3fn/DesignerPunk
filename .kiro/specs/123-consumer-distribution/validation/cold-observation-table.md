# Cold-observation table — target × {founder-cold, teammate-cold}

**Spec**: 123-consumer-distribution · **Task**: 26.4 · **Author**: Leonardo (operator) · **Date**: 2026-10-15
**Rule** (Task 26 criterion 4): only clean-state records count as cold. Each cell reads "observed" or "not observed cold — state not clean". A `cannot-tell` record is footnoted, never counted. **Input to 26.5** (Thurgood): the install doc is corrected only for cells observed cold.

| Target | founder-cold (Task 25) | teammate-cold (Task 26) |
|---|---|---|
| **cc** (Claude Code 2.1.300) | **observed** — `validation/trio-1-backend.md` F16 (state clean, F7)¹ | **observed** — `validation/join-kiro-to-cc.md` J15 (state clean, J7)² |
| **kiro** (kiro-cli 2.12.1) | **observed** — `validation/trio-3-pm.md` F16 (state clean, F7)³ | **observed** — `validation/join-cc-to-kiro.md` J15 (state clean, J7)⁴ |

## What was observed in each cell (verbatim sources in the records)

- **cc, founder and teammate alike — two prompts before the input prompt:**
  1. the folder-trust prompt, which surfaces the committed or attached pre-approvals: "⚠ This folder pre-approves 40 tool permissions in .claude/settings.json … These will apply without asking. Only proceed if you trust this configuration." (trio-1 F15; join-kiro-to-cc J14);
  2. a separate server prompt: "3 new MCP servers found in this project. Select any you wish to enable." All three were pre-checked; answer "Enable selected" (same sources).
  - **Before trust, the allow-list is ignored**: "Ignoring 40 permissions.allow entries from .claude/settings.json: this workspace has not been trusted" (trio-1 F17; join-kiro-to-cc J16, K-1).
  - **The enablement is stored per clone** in `.claude/settings.local.json`. Nothing DesignerPunk writes ignores that file (`join-cc-to-kiro` J-3; `trio-1-backend` erratum to R1-12).
- **kiro, founder and teammate alike: nothing was asked.** The first session reached its prompt with the three servers running (`/mcp`: docs 8, product 14, application 21 tools) (trio-3 F15; join-cc-to-kiro J14). The generated `.kiro/settings/mcp.json` carries per-server `autoApprove` lists.

## Footnotes

1. **trio-1-backend**: clean for DesignerPunk-relevant state. Its caveat: account-level state (the `claude.ai` connector, synced skills) came with the login under `CLAUDE_CONFIG_DIR`, and no inspection was taken at the start of preflight attempt 2. Attempt 1 (a fresh `HOME`) ended `auth-required`.
2. **join-kiro-to-cc**: `.claude/settings.json` was written by the joiner's `attach`, not received by clone. **The by-clone case was observed the same way** in `join-cc-to-kiro`'s same-harness probe: the same two prompts on a fresh clone of the CC-born repo, before `generate`. That probe is a same-harness observation and is not counted in this table.
3. **trio-2-designer** (kiro founder-cold): **`cannot-tell`**. The first open's capture was overwritten by a second open session (`script` overwrites its file; fixed in protocol § 11 after Run 2). It does not count; the cell rests on `trio-3-pm`. Note also that trio-3's founder reached Kiro through a bare `init` and a recovery (DD9); her successful `init` carried `--target=kiro`.
4. **join-cc-to-kiro**: clean. One caveat: step 8b's check that the real profile's global server (`fetch`) is absent was not repeated in this run. It held in all three trio runs under the same mechanism (`KIRO_HOME`).

**No cell reads "not observed cold — state not clean".**
