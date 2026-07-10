# Task 6 Completion — Diff-guard (C6) + canonical-vs-truth (C7)

**Spec**: 122 — Agent Generator
**Unit**: U1 (Substrate) — parent inside a multi-parent unit; **no PR at this completion** (U1's PR opens at Task 8).
**Type**: Parent
**Date**: 2026-07-10
**Branch**: `task/122-substrate`

---

## What was built

### 6.1 — The regenerate-and-diff guard + closure lock (Architecture, main loop)
- **`generate.ts`** — the generation entry point: assembles `AdapterContext` from the canonical shared files, regenerates the full guarded surface (registry via live introspection; both skill trees via the adapters; ledger-driven agent lane that **fails loud** until the cutover wiring exists). The guard and real regeneration share this one code path — the guard cannot diverge from what generation does (S-D1's derive-don't-redeclare, applied to the generator itself).
- **`diff-guard.ts`** — C6 verbatim: bidirectional temp-vs-tree compare over the guarded roots (**changed / missing / extra all FAIL**, per-file detail); the DD7 `canonical/generated.lock` with the input closure **complete over both resolve-by-id roots** (`governance/**` + `.kiro/steering/**` — the S-D3 fix) and the output hash over sorted `(path, content-hash)` pairs (S-D5: added/dropped surfaces break the lock, not only changed bytes). `.gitkeep` scaffolding excluded from the guarded surface (first-run adjudication; stays in the input closure where it is harmlessly conservative).
- **Live lifecycle proven**: full-run-green ~5s wall (three MCP boots + regeneration + compare — registry and both skill trees byte-clean against fresh generation); **no-op-green 0.46s** (the Req 20 AC2 fast no-op, measured).

### 6.2 — Both prove-it-bites forms (recorded: scratchpad `task6-bites.log` + this doc)
1. **Hand-edit form (output-hash leg)**: one line appended to `.claude/skills/adaptive/SKILL.md` → `diff-guard: FAIL (outputs-changed) / changed: .claude/skills/adaptive/SKILL.md` — caught and **named**. Revert → `no-op-green`.
2. **Edit-an-embedded-section form (S-D3 closure-completeness leg)**: one sentence appended to `governance/Token-Governance.md`, **no other closure-root change** → the lock forced `full-run (input-closure-changed)` — the resolve-by-id roots are provably in the closure. **Recorded split**: the fail-on-the-stale-embed half of this form requires an actual embed consumer and completes at Task 8 when the fixture (which carries a law ref) exists — collected by C13 item 3.

### 6.3 — The canonical-vs-truth check (Architecture, Opus subagent)
`canonical-vs-truth.ts` + 28 tests: all five C7 classes + the D-A3 glob-currency check, pure/injectable (fake corpus + registry + fs in tests; the real stdio client + live introspection in the CLI):
- (a) governance-integrity with **materialized predicates per named claim** (a failure names WHICH claim moved; documented normalization); the permissive-pattern lint deliberately NOT duplicated (schema.ts owns it at validate time) with unsatisfiable-input defense.
- (b) agent-routes vs the cutover ledger with `not-yet-ported` dispositions honored.
- (c) per-runtime grants — **both legs, the server-grant leg a first-class FAIL** (L1: `toolSubset` servers ⊆ emitted `grantedServers`).
- (d) command-string currency — script-name lookup, script-path exists+executable, and the **D-A5 rule** (empty-string annotation FAILS like missing) on the seat-authored cue/gap surface.
- (e) live-tool against the declaration-keyed registry (the declared-but-index-empty carve-out is structural — the registry never consults index state).
- (D-A3) knowledgeBases glob-resolves with `expected-empty` exemption (read via safe cast; schema formalization = a one-line follow-up, below).
- Report grouped by adjudicator (flagged entry + truth observed + canonical claim); CLI clean-exits on the current zero-agent substrate: `canonical-vs-truth: clean (0 agents in canonical/)`.

## Found + fixed in flight

- **`.claude/skills/` was gitignored** ("dry-run artifacts *pending a generator*"). The generator now exists — the ignore's own condition was fulfilled, and keeping it violated Req 17 AC1 (generated outputs SHALL be committed). Ignore removed; the 97-file generated tree is now tracked, committed, diff-guarded surface. (Meta: `git status` silence reads identically for ignored-vs-clean — the silent-green class this spec hunts, found in our own hygiene.)
- macOS case-insensitivity gotcha recorded (`token-governance.md` edited the real `Token-Governance.md`; git reverts are case-sensitive — the first bite run contaminated itself and was redone cleanly).

## Verification (main-loop, Fable 5)
- 6.1/6.2 built + proven live in the main loop. 6.3's nine flagged interpretation calls reviewed — all accepted (notably the MCP-short-name→server mapping mirroring `serverTable`, and the this-repo-named-gap skip).
- **Unit lane**: `npm run test:agent-generator` → **222/222** (16 suites; +36 over Task 5). **Typecheck** clean. **CLI** clean-exit verified.
- **Parent validation**: full `npm test` → **8987/8987** — zero regressions.

## Delegated-tier capture
6.1/6.2 main loop (Fable 5 — the guard is the crux architecture of generate-don't-curate); 6.3 an **Opus** subagent (Architecture-typed per tasks.md — decide tier honored) with main-loop verification. Conscious tiering, plan held.

## Open items (carried forward)
1. **S-D3 fail-leg completion** → Task 8 (the fixture's embed makes the stale-embed FAIL provable; C13 item 3 collects both bite runs with CI URLs once Task 7 registers the contexts).
2. **`expected-empty` on KnowledgeBaseDeclaration** → one-line schema.ts formalization (schema owner; currently read via safe cast).
3. **CI registration of `122-diff-guard` + `122-canonical-vs-truth` contexts** → Task 7.3 (the checks exist and run locally; the gate wiring is Task 7's).
