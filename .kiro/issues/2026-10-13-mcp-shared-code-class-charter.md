# Charter: code two MCP sub-packages both need and `rootDir` blocks — the shared-code class

**Date**: 2026-10-13
**Type**: **CHARTER** (class record + interim rules + one grant). Not a ballot; no governance law changes. Opened by Peter's ruling on the tokenizer-twin extraction consult.
**Ruled**: Peter, 2026-10-13 — **Option A with Lina's split, plus this charter** (§ 1).
**Owner**: **Thurgood** (this charter, its walk, the grant below). The class spec, when it fires, is co-owned by **Ada** (module resolution, packaging), **Lina** (`application-mcp-server/**`) and **Thurgood** (docs matcher, test governance).
**Trigger**: any ONE of the three in § 3 fires the spec. Walked at each monthly Civitas health check (README rule 6).
**Grant paths** (README rule 8 — Thurgood's write scope over exactly these, **header comment text only**, on the one fixing PR; activation is this charter's merge):
- `mcp-server/src/query/stop-words.ts` (header only)
- `mcp-server/src/query/token-atoms.ts` (header only)

**Consulted**: Thurgood ×3, Lina ×3, Ada ×3 (read-only, parallel; cross-read round between rounds 1 and 2), plus the orchestrator's reproduction of Ada's JSON probe. Ledger § 7.
**Class option**: this charter IS the class option of the consult — one shared-module policy for the three MCP sub-packages, decided once in a spec rather than per duplicate.

---

## 1. The ruling (Peter, 2026-10-13)

**A — keep the twins, harden the guards, with Lina's split.** Executed by Lina on her own branch and PR (her charter scope, `application-mcp-server/**`; no grant).
- **Token atoms — a bound twin.** The components list must equal the docs list. The guard loads the real docs module (an untyped `require` of `mcp-server/src/query/token-atoms.ts` source, the U1 pattern — not a regex read of its text), asserts exact equality, pins the docs version, and checks `protectAtoms` gives the same output on a shared probe set.
- **Stop words — a seeded fork.** Lina owns her whole list; the docs list is its origin, not a binding. A **review pin** (`REVIEWED_DOCS_STOP_WORD_LIST_VERSION`) records the docs version she last reviewed. A test loads the real docs module and fails when the docs version moves past the pin, so a docs bump forces a same-PR edit on her side: she either absorbs the change or records that she declines it. A docs-side removal is no longer drift, by design.
- **This charter**, authored the same sitting.

**DEAD — shared TypeScript via dist-require at module scope (O1).** The tokenizer needs the list at index time, ahead of the entry point's try/catch, with no sane fallback (a fallback is a local copy, which is A again). It would make the root-install-free sub-package lanes fail on a clean checkout unless jest maps the dist path to source — and **a moduleNameMapper for code under test is refused** (the tests would run different code from what ships). It would also give the in-repo `.mcp.json` launch (`mcp-server/dist/index.js`, `application-mcp-server/dist/index.js`) a hard dependency on a fresh root dist: absent → crash; stale → silently old vocabulary.

**PRE-VETTED, not adopted — the shared-JSON shape (O3).** Ada's probe, reproduced by the orchestrator under the pinned TypeScript 5.9.3 and esbuild: a sub-package with `rootDir: ./src` importing a JSON file from outside `rootDir` compiles clean with a FLAT emit (no nesting; the JSON is not copied), the tsc artifact reads the JSON from SOURCE at runtime (dist mirrors src depth — no stale-dist hazard), the esbuild bundle inlines it, and jest needs no mapper. Both sub-packages already set `resolveJsonModule`. This is the **pre-vetted extraction shape the class spec must ratify or retire.** Its surviving counter-argument, unabsorbed:
- it rests on **undocumented compiler behaviour** (a JSON import from outside `rootDir`) in a project whose named recurring failure is module resolution — a TypeScript upgrade would break it loudly, but nothing sanctions it;
- it **cannot carry logic** (`protectAtoms`, `TokenRefResolver` stay where they are) and has no comment header, so the legible-knob header and changelog must live in a TS wrapper or JSON fields;
- it adds a **third cross-boundary pattern** beside the dist-require (`mcpDataRoots`) and the text-parse (`SemanticOverrideReader`).
- Precondition if adopted: a required-lane typecheck of BOTH sub-packages (today CI builds only `mcp-server`; `application-mcp-server`'s tsc runs in no lane), so "breaks loudly" is true on both sides.

## 2. The class

**Code that two MCP sub-packages both need and that their tsc `rootDir` boundary blocks.** Cause: three separate tsc roots (`mcp-server`, `application-mcp-server`, `product-mcp-server`, each `rootDir: ./src`) plus the root build — a static TS import across them fails with TS6059 or nests the dist. Cure (for the spec to choose): one shared internal build unit, or a shared-module policy naming the sanctioned crossing pattern(s).

| Member | Where | Kind | State after the ruling |
|---|---|---|---|
| Stop-word base list | `mcp-server/src/query/stop-words.ts` ↔ `application-mcp-server/src/indexer/termNormalization.ts` | data | seeded fork + review pin |
| Token atoms + `protectAtoms` | `mcp-server/src/query/token-atoms.ts` ↔ `application-mcp-server/src/indexer/tokenAtoms.ts` | data + a 3-line function | bound twin, guarded |
| `TokenRefResolver` | `product-mcp-server/src/indexer/TokenRefResolver.ts` → ported verbatim to `application-mcp-server/src/indexer/TokenRefResolver.ts` | logic | unguarded copy; its header already names the durable fix (BACKLOG, "Decision 7 / Carried-Forward 2") |

**OUT — `SemanticOverrideReader`** (`application-mcp-server/src/indexer/SemanticOverrideReader.ts`). It text-parses theme token source **by design**: the Application MCP must not couple to the token pipeline, and that source is absent from some consumer installs. It is not a copy of another package's code, and extraction would not remove it.

## 3. Triggers (any one fires the spec)
1. **A third duplicated module** — any new code or data copied across an MCP sub-package boundary.
2. **The first drift incident in a guarded twin** — a guard catching a real divergence after merge, or a divergence found that a guard missed.
3. **A review-pin bump where Lina declines the docs change** — the seeded fork has actually diverged from its origin. *(Added at Lina's request.)*

**Backstop**: the monthly walk asks "has any trigger fired?" — a fired trigger without a spec charter or a dated disposition here is a walk finding against Thurgood.

## 4. Interim rules (Ada; binding until the spec fires)
1. **No new cross-boundary consumer.** No new module or data file is consumed across an MCP sub-package boundary — by any pattern — before this charter fires; a new need of that kind IS trigger 1.
2. **Cross-boundary requires are bare.** esbuild silently keeps an unresolved `require` inside try/catch as a runtime require, so a forgotten `build:mcp-shared` entry ships a silent fallback instead of a build failure. Any cross-boundary require added or edited under an exception must not be wrapped in try/catch. The three existing entry-point requires of `../../dist/cli/shared/*` (`mcp-server/src/index.ts` L413; `application-mcp-server/src/index.ts` L701–703) sit inside try/catch with a defaults fallback by design (Spec 121 F-C2); they are **grandfathered** and are the live instances of this hazard the spec must address.

## 5. Later — when a trigger fires
A **multi-unit spec** (Ada / Lina / Thurgood; rough cost 3–5 parents, 2–4 sessions) choosing the shared build unit or policy and migrating the class members, plus a **ballot amending the Module-Resolution Contract** (`rosetta-system-architecture` § "Module-Resolution Contract (Spec 118)") to name the sanctioned crossing pattern(s). It must ratify or retire § 1's pre-vetted JSON shape and decide the grandfathered try/catch requires (§ 4.2).

## 6. The grant (§ header) — scope and overlap
- **Purpose**: one header-correction PR after this charter merges. `stop-words.ts` says the application MCP consumes the list "so the two discovery surfaces share one normalization vocabulary" — false under the split (the components list is a seeded fork). `token-atoms.ts` says "NOT SHARED with the components tokenizer … Lina's surface and her call" — stale (it is now a bound, guarded twin). Both headers become cross-citing and point here.
- **Header comment text only**: no change to any exported list, version constant, or function; the fixing PR's diff touches only the leading comment block of each file. No matcher re-run is owed (no tokenizer change; the alias-hygiene rule excludes tokenizer changes and none occurs).
- **Overlap with row 12**: the follow-ups record (`2026-10-13-discovery-study-stage1-followups.md`) row 12 was said to carry the `token-atoms.ts` header fix, but that file carries **no `**Grant paths**:` list** (verified 2026-10-13). **This charter's grant governs both header edits.** Any later row-12 grant covers matcher code only.

## 7. Consult ledger (2026-10-13; read-only seats, parallel, then a cross-read)
| Seat | Round 1 | Round 2 (cross-read) | Round 3 (on the orchestrator's recommendation) |
|---|---|---|---|
| **Thurgood** | O0-hardened + class charter; O1 needs a root build or a mapper (refused) and a Spec 118 ballot; O3 "dead" (wrong for JSON — corrected) | moved to O3 if Lina chose "twin"; mapper refused unless a required lane also exercises the unmapped dist path; yields Spec 118 judgement to Ada | accepts A with the split + charter now; the pin and atom guards must load the real module; the `stop-words.ts` header needs a grant |
| **Lina** | O0-hardened (~30 lines, her scope); re-open on a third shared artifact, two more list changes, or the class ballot; would accept a mapper | chose the split: atoms bound, stop words a seeded fork with a review pin | A with her split; the charter is wanted but not load-bearing; added trigger 3 |
| **Ada** | no standing scope covers `src/cli/**`, `package.json`, `scripts/**`, `mcp-server/**`; O1 costliest; O3 viable (probed); placement not in `src/cli/shared` | O1 needs a consumption-contract header line, not a 118 amendment; O3 partial (no logic, no header) | agrees charter now, spec later; asked for the two interim rules (§ 4) |
| **Orchestrator** | reproduced Ada's O3 probe (tsc 5.9.3: exit 0, flat emit, runtime read from source, esbuild inlines); confirmed both sub-package lanes are required contexts with no root build | — | recommended A with the split, paired with this charter |
