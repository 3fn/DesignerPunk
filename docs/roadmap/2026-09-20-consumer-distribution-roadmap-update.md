# Roadmap Update: Consumer Distribution (Spec 123) — Kickoff State & Decision Gates

**Date**: 2026-09-20
**Status**: Current — the live strategic view for the 123 arc. Supersedes the *sequence* in `2026-07-04-wordpress-thesis-strategy.md` (that note's thesis, positioning, and counter-arguments still stand; its spine is complete).
**Source**: Kickoff synthesis of all ten Spec 123 formalization inputs (the nine `inbound-from-*` docs in `.kiro/specs/123-consumer-distribution/` + the 119-B handoff), read together 2026-09-19/20 (main-loop session, Peter + Claude).
**Rule**: This doc is strategy-altitude and pointer-heavy by design. The spec inbounds are the canonical formalization inputs — detail lives there; this doc must never be the only home of a decision or requirement. Conflicts are **noted, not resolved** (§ Conflicts); resolutions are Peter's, at or before formalization.

---

## 1. Where the spine stands (what completed since the July strategy note)

The 2026-07-04 recommended sequence (`125 Phase 0/1 → validator → 122 → 123 → Phase 2 marketing`) is executed up to 123:

- **125-A** (PR gate, mechanical arming) — COMPLETE 2026-07-10; 7 required checks with did-it-really-run guards.
- **Spec 122** (agent generator) — COMPLETE 2026-07-11; all 8 agents generator-SSOT, `TargetAdapter` seam proven.
- **Spec 118 / 117 / 124 / 121** — the module-resolution contract, consumer token loading, and MCP delivery layer 123 builds on all shipped (v13.0.0, 2026-07-05, cold-install verified).
- **125-B** (classification map + prune campaign) — campaign CLOSED COMPLETE 2026-09-18. No observation-window bookkeeping burdens 123 (the 119-B handoff's "waves run in parallel" coordination note is obsolete in 123's favor).
- **Spec 127** (completion-claims integrity) — FULLY CLOSED 2026-09-19. Its convention is ratified law that **123's execution runs under** — that sequencing was deliberate (Peter, 2026-09-19).
- **Q6** — release manager RETIRED (ballot 2026-08-12, kill-and-rewrite); execution issue open (36-file inventory, own session). Bears on 123's release-notes question (§ Conflicts C4).

**123 is the next major arc** (Peter's ratified order, 2026-09-19), in its own session, all gates open.

## 2. The shape of 123 (three axes — grown well beyond the stub)

1. **Mechanics** (largely pre-solved substrate; 123 assembles): `init --target`, dual path-context via `resolvePackageRoot()`, MCP config wiring to bundled `dist/mcp`, `files[]` glob extension, `sync` repair + vendored-prompt refresh. One core technical decision left open by 118's boundary marker: **consumer source distribution form** (raw `.ts` copy vs shipped-package vs compiled). Plus the 124 authoring-convention seed (Lina) and the 122 handbacks (consumer-side CC always-layer delivery; Product MCP population; Cursor as proof-of-additivity).
2. **Experience** (the new spine — Peter's onboarding + CI-integration vision, 2026-08-12 inbound): the package ships **declared needs, not environment assumptions**. Install doc declares verification needs + why; onboarding scaffolds a spec in the consumer's repo; their agent maps needs onto their CI. Principles P1–P6 settled (P2 gate-bite recipes non-negotiable; P6 consumer-agent profile deliberately deferred). The five-minute test (WordPress-thesis Adjustment 2) is the proposed acceptance bar.
3. **Content policy** (converging from Q6 + 119-B + the audit): what parts of the corpus ship to consumers and in whose voice — audience-framing banner vs corpus convention vs served/not-served split; release-notes ship/serve; packaging diet (A6: 2,547 files / 31.4MB unpacked at 13.0.0; `personal-note.md` ships to public npm today, A10).

## 3. Decision gates (Peter's, before or at outline settle)

| # | Gate | Recommended timing | Source |
|---|------|-------------------|--------|
| 1 | First-user persona | **Before outline drafting** | WordPress-thesis DP1 |
| 2 | Primary distribution rail (public npm / GH Packages / agent-runtime marketplaces) | **Before outline drafting** | WordPress-thesis DP2/DP3 + 13.0.0 empirics |
| 3 | Five-minute test as explicit requirement | Outline round | WordPress-thesis Adj 2 |
| 4 | Consumer corpus policy (banner / split / both) + release-notes ship/serve + packaging diet incl. `personal-note.md` | Outline round | Q6 inbound + audit A6/A10 |
| 5 | Scope boundary: one spec w/ declared multi-parent units vs split (core distribution / onboarding-CI) | Outline round | Onboarding inbound §1 vs fold-in pressure (§ Conflicts C1) |

New-since-the-inbounds coupling: 123's parent completion docs supply the remaining in-scope parents toward the Q2 parity-checker arming floor (127 supplies 3 of N≥5), and a 123-era release fires Q2's release-prep guard — **the arming decision likely comes due during this arc.**

## 4. Conflicts (noted, both sides kept — per Peter's instruction 2026-09-20)

- **C1 — Scope direction.** The WordPress-thesis note and audit fold-ins push 123's scope UP (five-minute test, packaging diet, benchmark rider); Peter's own 2026-08-11 refinement holds that scope "can likely be *reduced*, not grown." Both are recorded intent. Resolution = gate 5.
- **C2 — Do agents ship to consumers in 123?** Three docs pull differently: the five-minute test's bar as written promises "*working agents* … in their chosen tool"; the onboarding vision's **P6** deliberately defers the consumer-agent-profile question out of 123; the 122 handback assigns "consumer-side CC always-layer delivery" to 123. These are not simultaneously satisfiable as written — either the five-minute bar is restated agent-optional, or P6's deferral is narrowed, or the always-layer delivery ships without a full agent profile. Named here so formalization resolves it explicitly rather than by drift.
- **C3 — Distribution channel.** The M0a-era plan (m0a-roadmap) targeted GitHub Packages; the 13.0.0 empirics show GH-Packages auth is a locked door in front of the five-minute test; the runtime-marketplace option (DP2) would make 122's per-target generation the channel itself. Evidence currently leans public-npm-or-marketplace; the call is gate 2. (Consumer-side hazard either way: a stale `@3fn` `.npmrc` scope-mapping is a silent registry pin — design `init`/`sync` around it.)
- **C4 — Release notes to consumers.** Q6's C1 deferral says consumers get new behavior on `npm update` with no in-package record of what changed (argues ship/serve); the counter-consideration is that notes are internally framed and need a consumer edit pass — and the tool that generated them is now retired, so there is no rendering pipeline to lean on. Couples gate 4 to the Q6 retirement execution.
- **C5 — RESOLVED (provenance preserved).** The onboarding vision's original form ("ship the Agent Experience Architecture in its entirety") vs the refined landing shape (needs-declaration inversion) — resolved by Peter's own 2026-08-11 correction; the inbound preserves the evolution. Recorded so the original framing is not re-proposed as new.

## 5. Owed checks (not conflicts; don't drop)

- **U1b audience-ruling backward check**: the onboarding inbound flagged a "who is the education layer for" ruling as needed before 125-B waves pruned consumer-served (`governance/`) docs; the campaign closed without an explicit ruling on record. When 123 settles the consumer-corpus question (gate 4), a one-time check of the campaign's prunes against consumer-serving needs is owed.
- **119-B delivery constraints** bind the install doc's authoring: section-less route form, calibration-cue signal-scoping (never independently assert emitter lists), identity-doc links broken-by-construction on the MCP surface, zero backstop aliases, G1 accepted misfit moves through the generator only.
- **Consumer guard is the arbiter**: certification is `npm run test:consumer` (packed install) — never an in-repo load (false-greens).
- **125 Phase 3** (consumer-side enforcement) stays out of 123; don't preclude it in package layout.

## 6. The record (where the detail lives)

| Input | Home |
|---|---|
| Scope stub + gate history | `.kiro/specs/123-consumer-distribution/design-outline.md` |
| Nine inbounds (117, 118, 121, 122, 124, 13.0.0 empirics, onboarding-CI vision, Q6 residue, WordPress thesis) | `.kiro/specs/123-consumer-distribution/inbound-from-*.md` |
| 119-B handoff (tenth input) | `.kiro/specs/119-B-capability-routing-measurement/inbound-to-123-from-119-B.md` |
| Thesis, positioning, loops lens, counter-arguments (still standing) | `docs/roadmap/2026-07-04-wordpress-thesis-strategy.md` |
| Audit findings A6/A10 | `docs/roadmap/2026-07-04-full-project-audit.md` |
| Q6 retirement (release-notes coupling) | `.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md` + `.kiro/issues/2026-08-12-release-manager-retirement-execution.md` |
| Authoring model for the kickoff | Ratified 2026-09-19: Thurgood-subagent authors spec artifacts, one agent continued per unit, full pipeline (Q5: no compressed forms) |
