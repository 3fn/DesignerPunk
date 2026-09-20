# Spec 123 § 8 Reference-Corpus Probe — Run Record

**Date**: 2026-09-20
**Status**: COMPLETE. Attempts 1 and 2 (run from this sandboxed session) both failed on CLI authentication before any MCP tool call occurred. **Attempt 3**, run by the coordinator from an unsandboxed shell after fixing auth, succeeded end-to-end: `transcript.jsonl` (exit 0), `run-stderr.log`, and the deliverable `meridian-disabled-states.md` (13,257 bytes) are all present. Full scoring below is against attempt 3's artifacts, cross-checked by re-querying the live MCP server myself.

---

## Setup facts (all PASSED)

- **Package installed**: `@3fn/core@14.1.0` (latest published on npm at probe time) via plain `npm install @3fn/core`, no auth, no `.npmrc` overrides. Install was clean: "added 122 packages, and audited 123 packages" — 3 low-severity advisories only (npm audit noise, not install failures), no missing peer deps, no postinstall errors.
- **No-init path confirmed**: no `npx designerpunk init` was run. Scratch dir root is a bare `npm init -y` project with `@3fn/core` as its only dependency.
- **Meridian scaffold**: created at the scratch dir root — `tokens.json` (flat hex colors: `brand-blue #2B6CB0`, `brand-blue-dark #1A4E85`, `brand-red #C0392B`, etc.; px spacing list `[4, 8, 12, 16, 24, 40]`; no scale formula), `components/button.css` (default + secondary variants, `:hover` only — no `:focus`, no `:disabled`), `README.md` documenting Meridian as a small in-house web-only DS and explicitly naming the disabled-state gap (no token, no CSS rule, no doc coverage).
- **MCP config**: `mcp-docs.json` written with an absolute path to `node_modules/@3fn/core/dist/mcp/docs-mcp.js`. `MCP_STEERING_DIR` was deliberately left unset.
- **Server boot sanity check** (`initialize` + `tools/list` over stdio): server started cleanly and reported, on stderr:
  ```
  [MCP Server] Data root steering: <scratch-dir>/node_modules/@3fn/core/governance (source: package)
  [MCP Server] Starting mcp-documentation-server v0.1.0
  [MCP Server] Indexing <scratch-dir>/node_modules/@3fn/core/governance...
  [MCP Server] Indexing complete
  [MCP Server] Starting file watcher...
  [MCP Server] File watcher started
  [MCP Server] Server started and listening
  ```
  This confirms **package-relative data-root resolution with zero env wiring** — the exact behavior the no-init reference-corpus path depends on. `tools/list` returned a full, well-formed tool schema (`find_docs`, `get_document_summary`, `get_document_full`, `get_section`, `list_cross_references`, etc.) over JSON-RPC on the first request. This half of the probe is a clean PASS.

## Attempts 1–2 (this sandboxed session — both failed on auth)

- **Command** (identical to attempt 3): `npx --yes @anthropic-ai/claude-code -p "<TASK>" --mcp-config mcp-docs.json --strict-mcp-config --allowedTools "Read,Glob,Grep,Write,mcp__designerpunk-docs__find_docs,mcp__designerpunk-docs__get_document_summary,mcp__designerpunk-docs__get_section,mcp__designerpunk-docs__get_document_full" --max-turns 25 --output-format stream-json --verbose`
- **CLI version resolved by npx**: `2.1.278 (Claude Code)`, all attempts.
- **MCP connection**: on both failed attempts, the `init` system event in `transcript.jsonl` showed `"mcp_servers":[{"name":"designerpunk-docs","status":"connected","source":"dynamic"}]` — the server connected successfully and its 8 tools appeared in the session's tool list before the auth failure killed the turn. This confirmed the MCP wiring itself (config file, absolute path, `--strict-mcp-config`) was never the problem — only headless CLI auth was.
- **Turns/tool calls**: 1 turn, 0 tool calls, on both attempts — the run terminated before the model could act.

### Attempt 1 (2026-09-20, before reported re-auth)
- Session `2ba6c066-163b-4b1b-a908-e095f46bd47f`. Failure: `"Failed to authenticate: OAuth session expired and could not be refreshed"`, `"error":"authentication_failed"`, `"is_error":true`, `"terminal_reason":"api_error"`, `"total_cost_usd":0`.
- Per the probe's stop condition, no workaround was attempted.

### Attempt 2 (2026-09-20, after the coordinator first reported the human had re-authenticated)
- Session `fdfc5e52-6bba-4d47-be4b-5b0548d01144`. Failure was **byte-for-byte identical** to attempt 1: `"Failed to authenticate: OAuth session expired and could not be refreshed"`, `"error":"authentication_failed"`, `"is_error":true`, `"terminal_reason":"api_error"`, `"total_cost_usd":0`, `"num_turns":1`.
- I did not attempt to diagnose the CLI's local credential storage (e.g. inspecting `~/.claude/` or the OS keychain) — that action was blocked outright by the permission system as credential exploration, and I did not pursue an alternate route around it, consistent with "do not work around it."
- Per the mandated stop condition ("If auth fails AGAIN, stop and report exactly that"), I stopped after this second identical failure and made no further attempts from this sandboxed session. The auth problem turned out to be specific to this sandbox — resolved when the coordinator ran the identical command from an unsandboxed shell (attempt 3, below).

---

## Attempt 3 (succeeded — coordinator's unsandboxed shell)

### Run facts

- `transcript.jsonl`: 189 lines, `terminal_reason: "completed"`, `is_error: false`, `subtype: "success"`.
- **Turns**: `num_turns: 36` per the CLI's own result summary (63 raw `assistant`-typed stream events, which include intermediate deltas — 36 is the turn count that matters). `duration_ms: 251017` (~4.2 min), `total_cost_usd: 1.92`.
- **Package-relative confirmation**: the `init` event's `mcp_servers` shows `[{"name":"designerpunk-docs","status":"connected","source":"dynamic"}]` — connected before any tool call, same as my own sanity check. I independently re-ran the stdio boot myself against the same `node_modules/@3fn/core/dist/mcp/docs-mcp.js` and got the identical data-root line as before (`.../node_modules/@3fn/core/governance (source: package)`), so this is doubly confirmed, not just asserted by the transcript.
- **MCP tool calls by name** (`mcp__designerpunk-docs__*`, 18 total):
  | Tool | Count |
  |---|---|
  | `get_section` | 13 |
  | `get_document_summary` | 3 |
  | `find_docs` | 2 |
  | `get_document_full` | 0 |
- **Other tool calls**: `Bash` 7 (3 denied, 4 succeeded — see Failure Modes), `Read` 4, `Grep` 3, `Write` 2 (one throwaway `contrast.js` for a denied Bash call, one the final deliverable), `ToolSearch` 1.
- **Tool-call sequence** (docs MCP only, in order): `find_docs("disabled state")` → `find_docs("interaction states accessibility contrast")` → `get_document_summary` on Token-Family-Opacity.md, Component-Family-Button.md, Component-Family-Form-Inputs.md → `get_section` ×4 on Token-Family-Opacity.md (Disabled States, Disabled State Accessibility, Semantic Token Details, Opacity and Color Contrast) → `get_section` ×2 on Component-Family-Button.md (Contract Details, Accessibility Considerations) → `get_section` on Contract-System-Reference.md (Concept Catalog) → `get_section` on Web-Authoring-Standards.md (Hard Rules) → `get_section` on Contract-System-Reference.md (Three States) → `get_section` ×2 on Component-Family-Form-Inputs.md (Contract Details) → `get_section` on Component-Family-Button.md (Base Contracts) → `get_section` on Component-Templates.md (**"No Disabled States — Standardized Exclusion" — this call FAILED**, see Failure Modes). This is a coherent summary-first → section-drill-down pattern, not flailing.

### The deliverable (`meridian-disabled-states.md`, quoted)

> "Meridian should add disabled-state support, but should add it as a **narrow last resort with three named alternatives ranked above it** — not as a general-purpose 'grey it out' affordance."

> "That system can ban disabled states because it controls every component, has a contract system to enforce the ban mechanically, and has loading/validation/error states already built to absorb the cases the ban displaces. Meridian has one hand-written button with a hover state, no JS layer, no loading state, and no error state. Banning disabled controls here would displace work onto product teams that Meridian currently gives them no tools to do."

> "The transferable insight is not the ban. It is the **claim that motivates the ban**: a disabled control is a dead end that does not explain itself."

### Intent-vs-execution assessment: PASS

I read the full 283-line deliverable. Zero DesignerPunk token names, values, or code appear anywhere in Meridian's actual proposal (the tokens/CSS it tells Meridian to add are 100% Meridian-native: `disabled-background: #EDEDED`, `disabled-text: #6B6B6B`, `disabled-border: #C9C9C9`, plain CSS with `:disabled`/`[aria-disabled]`). DP token names (`opacity048`, `blend.hoverDarker`) appear only in prose *describing* the reference corpus, never injected into Meridian's tokens/CSS. More importantly, the deliverable explicitly identifies DP's actual policy (an outright ban on disabled states, adjudicated 2026-07-15) and **explicitly declines to copy it**, giving a reasoned, Meridian-specific argument for why the ban doesn't transfer (no contract-enforcement mechanism, no loading/error states to absorb displaced cases) while still extracting and keeping DP's underlying accessibility rationale. This is the clearest possible behavioral signature of intent-extraction over execution-copying — an agent that were merely echoing the reference corpus would have recommended the ban itself, or copied opacity-based dimming; this one did neither.

### Idiom-translation check: PASS

Flat hex only, no opacity/alpha tokens (the doc explicitly argues **against** DP's opacity-based approach and gives a technical reason — contrast composability — for why Meridian's flat-hex idiom is "genuinely better suited, not merely different" for this specific case). Spacing/sizing untouched (no scale math introduced). Web-only plain CSS, including a `forced-colors` block using system keywords rather than tokens. No iOS/Android content anywhere. This is real idiom-fitting, not surface find-and-replace.

### Hallucination spot-check (3 claims verified against the live MCP server myself)

1. **"Opacity token family docs, reviewed 2026-03-06: disabled states exist; render at 48% opacity."** — VERIFIED EXACT. I queried `get_document_summary` and `get_section` on Token-Family-Opacity.md myself: `lastReviewed: "2026-03-06"` and its "Disabled States" section literally reads `<Button disabled opacity="opacity048">  // 48% opacity`. No discrepancy.
2. **Quoted DP rationale**: the deliverable presents in quotation marks: *"does not support disabled states for usability and accessibility reasons. If an action is unavailable, the component should not be rendered."* — PARTIALLY VERIFIED. I pulled Token-Family-Blend.md § "Anti-Patterns to Avoid" myself; the actual source text is a code comment: `// WRONG: DesignerPunk does not support disabled states (adjudicated 2026-07-15). // If an action is unavailable, do not render the component.` The core claim and the 2026-07-15 date are accurate, but **the deliverable's quotation marks present a paraphrase as verbatim, and the clause "for usability and accessibility reasons" does not appear in this source sentence at all** — it's an unsourced addition (plausible in spirit, but not a documented quote). Minor-to-moderate embellishment.
3. **Citation table row**: "Component templates, Button family, Form-Inputs family | 2026-07-15 | Disabled-state contracts banned corpus-wide, zero exceptions." — MIXED. I checked `lastReviewed` on all three named docs myself: Component-Templates.md is genuinely `2026-07-15` (this is the real match), but Component-Family-Button.md is actually `lastReviewed: "2026-01-25"` and Component-Family-Form-Inputs.md is `lastReviewed: "2026-08-02"` — **neither matches the date the table implies for them**. The table compresses three docs' different review dates into a single shared date, overstating how uniformly "dated" the corpus-wide ban is. The underlying fact (a corpus-wide ban exists, and it was adjudicated 2026-07-15) is real, but the citation table's specific attribution is imprecise.
4. **Bonus finding, not one of the original 3 but directly relevant to hallucination risk**: the deliverable's most specific claim — that a section literally titled around "banned corpus-wide, zero exceptions" exists in Component-Templates.md — traces to the transcript's **final** MCP call, `get_section(Component-Templates.md, "No Disabled States — Standardized Exclusion")`, which **failed with `SectionNotFound`** (I reproduced the identical failure myself against the live server; the real headings in that doc are Overview / Schema Format Templates / Inheritance Pattern Templates / Behavioral Contract Templates / Quick Reference / Related Documentation — no such heading exists). The agent never retried with a corrected heading or one of the server's own suggestions before writing the deliverable. So the "corpus-wide, zero exceptions" framing is a synthesized inference (built from Contract-System-Reference.md's real `excludes:` mechanism plus the Blend anti-pattern comment), not a directly-confirmed passage — presented with more specificity than the agent actually verified.

### Failure modes observed

- **3 of 7 Bash calls denied**: all three were attempts to run Node for WCAG contrast-ratio verification (a heredoc script, then two direct `node contrast.js` invocations, one with `dangerouslyDisableSandbox: true`), each rejected with "This command requires approval" or a shell-parsing error. Notably, **Bash was not in `--allowedTools` at all**, yet 4 *other* Bash calls (plain `ls`, `find`, `grep`) succeeded — the harness appears to auto-permit read-only shell recon in headless mode while still gating arbitrary script execution behind an approval that headless mode can't grant. This is a probe-methodology footnote (the `--allowedTools` restriction wasn't airtight) rather than a critique of the reference-corpus mode itself.
- **Graceful, transparent degradation**: rather than silently presenting unverified contrast numbers, the agent computed them by hand and flagged the limitation directly in the deliverable: *"Computed... by hand (`node` was unavailable in this sandbox, so please re-verify in a checker before adopting)."* This is good behavior — it did not hide the gap.
- **One unresolved `SectionNotFound`** on the last MCP call before writing the deliverable (detailed above) — a genuine section-citation miss that the agent did not recover from before finalizing its most specific corpus claim.
- **No wrong-tool flailing** otherwise: `find_docs` was used exactly twice (efficient, not repeated blind guessing), and the summary-first → section-drill-down sequence matches the tool's own documented usage pattern.
- `num_turns: 36` exceeds the `--max-turns 25` value passed on the command line, yet the run completed successfully rather than being cut off (`terminal_reason: "completed"`, not a max-turns termination). Worth a note for whoever reruns this: either turn-counting in the result summary differs from the enforced budget, or turn accounting changed between CLI versions — not itself evidence about the reference-corpus mode, but worth flagging if `--max-turns` is being relied on elsewhere as a hard cost ceiling.

### What the no-init path failed to provide (install-doc input)

- Nothing in the installed package's own docs told the agent that `designerpunk-docs` could or should be used as a reference corpus for a *foreign* system — that framing came entirely from this probe's external task prompt. An agent that stumbled onto this MCP unprompted would have no signal that cross-architecture reference use is a sanctioned mode at all.
- No guidance flagged that `lastReviewed` dates carry adjudication weight and can conflict across docs on the same topic (the March opacity guidance vs. the July blend ban) — the agent had to reconstruct that timeline itself by comparing metadata across unrelated-looking docs. A reference-corpus consumer benefits specifically from being told "when two docs disagree, defer to the more recently reviewed one," since that's exactly the reasoning move this run made correctly on its own — it would be safer as documented guidance than as an emergent inference.
- No corpus-side signal that a specific claim needs re-verification once a heading lookup fails — the agent treated its own `SectionNotFound` as a dead end rather than a cue to retry with the server's own `suggestions` field (which was returned right there in the error payload). This is a tool-usage gap independent of docs content, but worth noting since it's exactly the failure mode that produced this run's weakest claim.

## Honest verdict line

**SUPPORTS the reference-corpus mode**, with a real residual.

**Strongest evidence for**: the deliverable's explicit "Why Meridian should *not* copy the outright ban" section — it correctly identified DesignerPunk's actual, current policy (ban disabled states entirely), explicitly declined to import that conclusion because Meridian lacks the enforcement mechanism and fallback states that make the ban affordable for DP, and instead distilled the ban's underlying accessibility rationale into a Meridian-native decision ladder and token/CSS/markup proposal using zero DP names, values, or code. That is intent-extraction working as designed, not surface transplantation.

**Strongest evidence against (the residual — not absorbed by the above)**: two of three spot-checked claims about DP had real inaccuracies — a "quoted" sentence with an unsourced added clause, and a citation table that misattributes a shared adjudication date across three docs with actually-different `lastReviewed` values — and the single most specific claim in the whole deliverable (a literal "banned corpus-wide, zero exceptions" section) rests on an MCP query that failed (`SectionNotFound`) and was never retried. A team relying on this deliverable's *provenance* claims at face value, rather than just its *reasoning*, would be misled about exactly which documents and dates back the ban. This is a citation-fidelity gap, not an intent-extraction failure — but it means the mode's output needs a provenance-accuracy check layered on top of the intent-extraction check before it's trusted unsupervised.
