# Task 8 Completion: Identity Lock + Discovery Safety (Calibration Text, 118 Pointer, Cross-Refs)

**Date**: 2026-06-29
**Task**: 8. Identity Lock + Discovery Safety
**Type**: Parent
**Status**: Complete for subtasks 8.1, 8.2, 8.3, 8.5, **and 8.4 (aliases seeding — done; verified by the Task 10.4 lift). 4 concepts flagged for adjudication as structurally unliftable via aliases-only (see § 8.4).**
**Agent**: Thurgood (Civitas steward)
**Validation**: Tier 3 — Comprehensive

> **Not committed by me** — the main loop reviews, re-verifies, rebuilds the index, and commits on `spec-119a-relocation`.
>
> **8.4 deferral is by design.** Per the task brief and Task 8.4's own blocking dependency (the 10.3 floor WEAK/MISS set IS the alias-seeding worklist; the 10.4 lift re-run is its verification gate), aliases seeding cannot run before the dry-run harness + floor baseline exist. 8.4 is carried forward to post-10.3.

---

## 8.1 — Lock the `always` ambient core; demote the two process docs; create Task Completion Protocol

**Created the new always-loaded identity doc** `.kiro/steering/Task-Completion-Protocol.md`:
- Frontmatter `id: task-completion-protocol`, `inclusion: always`, `name: Task-Completion-Protocol`, full metadata block (Date/Last Reviewed/Purpose/Organization/Scope/Layer/Relevant Tasks).
- Content = the end-of-task operational law moved out of Start Up Tasks: the parent-vs-subtask completion sequence, tier selection (subtask → completion doc; parent → completion + summary), the stop-and-wait rule, and the `get_section` pointers to the Completion Documentation Guide (referenced by **id** `completion-documentation-guide`, not legacy path).

**Refocused** `.kiro/steering/start-up-tasks.md`:
- Retained the pre-task checklist concerns: date check, Civitas governance health check, authorization-to-START rules, Jest command rules, test-command selection guidelines.
- Replaced item 6 (the old "Task Completion Sequence" block — the full parent/subtask sequence + completion-doc paths) with a short pointer to the now-always-loaded Task Completion Protocol, restating only the one start-relevant rule (STOP-and-wait-for-authorization on completion).
- Updated frontmatter `description` + `Purpose` to reflect the start-vs-end split.
- Incidental currency fix: removed the stale Kiro `ctrl+shift+t` hotkey from the governance-health flag text (no agent-swap hotkeys in this runtime) — reworded to "Thurgood should run the monthly health check."

**Demoted the two process docs** (both already relocated to `governance/` in Task 6): frontmatter `inclusion: always` → `manual`:
- `governance/Process-Development-Workflow.md`
- `governance/Process-File-Organization.md`

**Assertion — no doc outside the AC1 set is `always`** (grep both roots): PASS. The `always` set on disk is exactly the 9 AC1 docs + the meta-guide (`00-steering-documentation-directional-priorities.md`, scheduled for Task 10 removal). `governance/` has **zero** `always` docs.

**AXA five-class overlay (non-binding annotation).** Recorded here as an overlay that does NOT change any 119-A inclusion mode (per Req 6 AC1 + the doc-inventory § 2a):
- personal-note → formative; core-goals → formative/operational; ai-collaboration-principles → reflexive-principle; spec-feedback-protocol → reflexive-principle; designerpunk-systems-overview → orientation reference (retained ambient); civitas-system-overview → orientation reference (retained ambient); start-up-tasks → governance-as-law; task-completion-protocol → governance-as-law (new); agent-directory → capability-routing.

**Agent-Directory → capability-catalog forward-reference (119-B/122).** Agent-Directory stays `inclusion: always` in 119-A. Its hand-curated cross-domain routing table is capability routing that the AXA model relocates into the *generated* capability catalog (owned by 122, sequenced 119-B). 119-A does NOT decompose, trim, or relocate Agent-Directory — only this forward-reference is recorded (Req 6 AC6).

### Knock-ons handled
- `src/cli/__tests__/init.test.ts` — steering-count assertions updated **9 → 10** (and the post-merge readdir count **10 → 11** = 10 package identity files + 1 pre-seeded custom `designerpunk.md`). The 80 governance assertions are unchanged. Comments updated to explain the new Task-Completion-Protocol and the later Task-10 meta-guide removal (which returns the count to 9).
- `.kiro/sync-manifest.json` — added entry keyed `.kiro/steering/Task-Completion-Protocol.md` with `managed: true` and the raw-byte sha256 `7b176dcf2407c7fa888610a9626a489e299074aca67c7bda034fd2edcaa2a283` (same hashing the canonical `FileScanner` uses). Manifest steering keys: 9 identity (incl. meta-guide) + the new doc = 10 `.kiro/steering/` keys; 80 `governance/`.
- `package.json files[]` ships `.kiro/steering/` as a glob → the new doc auto-ships, no `files[]` edit needed.

_Req 6.1, 6.2, 6.3, 6.4, 6.6_

---

## 8.2 — Certainty-calibration rule TEXT (forward-compatible)

Added a new section **"Certainty Calibration: Finding Guidance Before You Guess"** to `.kiro/steering/AI-Collaboration-Principles.md` (the always-loaded reflexive-principle doc), placed just before the "MCP Query for Full Framework" section. Behavioral content (paraphrased):

> When unsure where guidance lives: search before guessing — run `find_docs` plus a cheap fallback (e.g. `Grep`) before answering from memory; never act confidently on empty/weak results. Weight by match strength — **strong** (act), **partial** (treat as candidate; propose best guess + confirm), **none** (do not fabricate; say what you searched, propose best guess, ask the human for a go/no-go). When still unsure, surface it and ask.

Phrased forward-compatibly in the **strong / partial / none** shape of Spec 121's shipped `matchConfidence` signal, with an explicit note that 119-B formalizes it against the signal and propagates it into the 8 prompts via 122. **TEXT ONLY** — no formalization, no prompt propagation here.

_Req 6.5_

---

## 8.3 — 118 Module-Resolution-Contract pointer

Added a **distinct, numbered surface** to `.kiro/steering/DesignerPunk-Systems-Overview.md` (always-loaded), as its own H2 `## Pointer 1: Module-Resolution Contract (Spec 118)` placed immediately after the Overview and before the first diagram — it cannot fall between prose and a table because it is its own top-level section. The line (~25 tokens of payload):

> Module resolution — runtime-TS loading, package exports, the bin, consumer `.ts`, and component tokens — is governed by the **Module-Resolution Contract**; pull it before touching those surfaces. See `rosetta-system-architecture` § "Module-Resolution Contract".

References the RSA section by **id** (`rosetta-system-architecture`); contract depth stays in the manual/MCP-served RSA.

_Req 7.1, 7.2, 7.3_

---

## 8.5 — Migrate active-doc intra-doc cross-references to `id`s

**Form used: bare `id` (no `.md`), resolver-strategy-1 consistent.** A migrated markdown link reads `[Token Governance](token-governance)`; with an anchor, `[…](token-governance#section)`. This is the only resolver-consistent form (see the FLAG below) and matches Req 2 AC7's `docid#sectionid` inert grammar and Req 10 AC1 ("migrated to doc `id`s ... not to new physical `governance/…` paths").

**Executed via an auditable codemod** (`scratchpad/migrate-crossrefs.mjs`, dry-run-then-apply) over BOTH active roots (`governance/` + `.kiro/steering/`), built off the on-disk frontmatter `id` map. It rewrites only in-corpus targets; out-of-corpus / glob / unresolvable targets are left untouched and reported as exceptions.

- **Migrated: 226 markdown-link cross-refs across 43 active docs.** Heaviest (matches the spec's note): `DesignerPunk-Systems-Overview` (20), `stemma-system-principles` (12), `Component-Schema-Format` (11), `Component-MCP-Document-Template` (10), `Rosetta-System-Architecture` (10), `Token-Governance` (8).
- **Stale-ref repairs folded in (Req 10 / the brief's call-out):**
  - `./Core%20Goals.md` (URL-encoded old filename in Token-Governance) → `core-goals` (now an identity doc).
  - 3 doubly-stale traversal refs in `governance/Figma-Workflow-Guide.md` written as `./../.kiro/steering/<Name>.md` (wrong depth AND old location) → `token-governance`, `component-development-guide`, `process-spec-planning`.
  - Other space/encoded legacy filenames (`./Technology Stack.md`, `./Spec%20Planning%20Standards.md`, `./Cross-Platform vs …`, etc.) resolved to current ids.
- **Identity-doc MCP-query path examples migrated by hand** (the always-loaded, highest-visibility set — these are `get_*({ path: "…" })` snippets, not markdown links, so the link codemod did not touch them; I migrated them for consistency since every agent sees them every session):
  - `AI-Collaboration-Principles.md` (3 refs → `ai-collaboration-framework`)
  - `core-goals.md` (2 → `token-governance`)
  - `Civitas-System-Overview.md` (3 → `civitas-system-overview`)
  - `Spec-Feedback-Protocol.md` (3 → `spec-feedback-protocol`)

**Exceptions surfaced (115 distinct out-of-corpus targets), NOT silently physical-pathed (Req 10 AC3).** All are genuinely non-indexed / out-of-corpus and correctly left as-is: prior-spec paths (`../.kiro/specs/…`, `../../.kiro/specs/…`), `docs/` paths (`../../docs/token-system-overview.md`, platform-integration setup docs), `src/components/**/README.md`, `preserved-knowledge/*`, external GitHub URLs, absolute filesystem paths, template placeholders (`./path/to/document.md`, `./guide-2.md`, `./document.md#section-name`, the `[spec-name]`/`task-N` template tokens), and the `./Token-Family-*.md` glob. None of these has an in-corpus `id` to migrate to.

**Historical docs left as-is (Req 10 AC2 / Decision 7).** The codemod scope is the active corpus only (`governance/` + `.kiro/steering/`). Prior specs and completion docs under `.kiro/specs/**` and `docs/specs/**` were not touched.

### FLAG for your review (Req 10 / addressing-grammar ambiguity — flagged, not guessed)

There is a real tension between the **resolver** and the **cross-ref parser**, and I picked the resolver-consistent side deliberately:

- **`resolveRef` (the path-taking MCP tools)** resolves a **bare `id`** via strategy 1 (`idIndex` is keyed on the bare slug). `token-governance.md` would NOT resolve (strategy 1 misses the bare-id index; strategies 2/3 miss the `governance/Token-Governance.md` keyspace). So an agent who takes a link target and feeds it to `get_document_full`/`get_section` needs the **bare `id`**.
- **`list_cross_references` (the cross-ref parser, `cross-ref-parser.ts`)** extracts only link targets that `.includes('.md')` and does NOT resolve them — it just reports the raw string. So a **bare-`id` link is invisible to `list_cross_references`** (no `.md`).

I migrated to the **bare `id`** because that is what Req 10 AC1 literally mandates ("doc `id`s ... not physical paths"), what Req 2 AC7's grammar specifies (inert `docid#sectionid`, no extension), and what actually resolves through the tools agents use. The cost is that `list_cross_references` no longer enumerates these migrated links — but that tool is a navigation aid, not the resolution path, and giving it `id`-awareness is itself net-new parser work that belongs in 119-B (the same sweep that repoints the 60 prompt refs). **Decision recorded; flagging so you can veto if you'd rather keep `list_cross_references` enumeration working at the cost of resolver-resolvability.**

### Second FLAG — scope cut on the 176 governance-corpus MCP-query `path:` snippets (flagged, bounded)

Beyond markdown links, the active **governance** corpus contains **176 `get_*({ path: ".kiro/steering/X.md" })` MCP-query example snippets** (instructional code-fences inside ~22 governance docs) still on legacy paths. These resolve fine TODAY via the legacy-path fallback. I did NOT mass-migrate them in this pass because:
- They overlap the explicitly **deferred prose-path sweep** (Req 10 note: ~30 component READMEs by prose path are fallback-covered and their sweep is out of 119-A scope).
- They are instructional snippets, not navigational cross-refs — closer to the deferred prose category than to the "Related Documentation" links Req 10 targets.
- A 176-edit pass across 22 docs is a meaningfully larger blast radius that I'd rather you size deliberately.

I DID migrate the identity-doc subset of these (the 11 always-loaded ones above) since they are seen every session. **Flagging the governance-corpus 176 for your scope call**: include them in 8.5 now (I can run a second codemod pass keyed on the `path: "…"` form), or roll them into the 119-B sweep alongside the 60 prompt refs. They are fallback-covered either way, so this is not a relocation-integrity break.

_Req 10.1, 10.2, 10.3, 10.4_

---

## 8.4 — aliases seeding (DONE; verified by the Task 10.4 lift)

**Status:** executed. The 10.3 floor worklist (21 WEAK/MISS) drove the seeding; the 10.4 lift re-run is the verification gate (see task-10-parent-completion § 10.4). **Diff is `aliases:`-only — no `id` changed (verified by `git diff` grep; `check:id-uniqueness` PASS).**

**Mechanism (Req 9 AC2/AC3).** `aliases` is a HIGH-signal field in `QueryEngine.findDocsConcept` (tier weight 3, equal to title/sections/description). It is parsed as a single comma-separated frontmatter line (`frontmatter-parser.ts`: `fm.aliases.split(',')`) and tokenized like any other field. Seeding an alias that contains a concept's salient query tokens makes the intended doc match those tokens at high signal, lifting its score above competitors that match fewer. `aliases` lives on the discovery plane only — no `id` touched.

**Docs seeded (the 21-concept worklist → the EXPECTED doc) + representative aliases:**

MISS lifts (3):
- `token-semantic-structure` ← `aliases: dark mode theme overrides, light dark mode theme switching overrides, semantic token architecture mode keys, mode-keyed semantic token values, theme variant token resolution` (covers BOTH `dark mode theme overrides` and `semantic token architecture mode keys`).
- `rosetta-system-architecture` ← `aliases: modular scale mathematical foundation, modular scale ratio mathematical foundations, baseline grid mathematical token foundation` (scoped to "modular scale" so it does NOT pollute `system architecture overview rosetta stemma civitas`, whose expected doc is `mcp-relationship-model`).
- `test-behavioral-contract-validation` AND `component-development-guide` both ← a `focus management keyboard navigation` alias (only one expected needs rank ≤ 2; scorer takes the best-ranked expected).

WEAK lifts — the cross-domain agent-query + map-concept cases:
- `integration-methodology` ← `cross-spec integration dependency management, …` (this doc had NO `name`/`description` in frontmatter — title came from H1 "Integration Methodology", matching only `integration`; the alias supplies the other 4 salient tokens).
- `token-governance` ← `how do i pick the right token, …`; `mcp-integration-guide` ← `programmatic dtcg token consumption, …`; `a-vision-of-the-future` ← `designerpunk vision context, …`; `process-file-organization` ← `steering doc metadata validation governance, …`; `primitive-vs-semantic-usage-philosophy` ← `primitive vs semantic component decisions, …`; `mcp-relationship-model` ← `system architecture overview rosetta stemma civitas, …` (full 6-token coverage to beat rosetta/stemma-principles which match 4).
- `platform-implementation-guidelines` ← `true native architecture platform separation, cross-platform implementation patterns, …`; `cross-platform-vs-platform-specific-decision-framework` ← `platform-specific vs shared decisions, …`.
- `component-family-templates` ← `how do i scaffold a new component, …` (secondary expected for that query alongside component-development-guide).

**The family-doc disambiguation nuance (the floor's hard sub-problem).** Several WEAK cases lost because the intended family doc and a *more-specific / incidentally-matching* doc TIED at full token coverage, and the scorer breaks ties by corpus (readdir) order — a dimension aliases cannot influence. Example: `color token work` salient tokens are `[color, token, work]`; `token-family-color` matches all three from title + alias, but so does `component-family-icon` (its description says "automatic color inheritance" → `color`, sections → `token`) and `token-family-blend` (description is literally about color modification). All three tie at score 9 / 3 matched tokens, and icon (idx 12) + blend (idx 48) sort before color (idx 51).

To lift the 6 originally-WEAK family concepts (`color/typography/shadow/opacity/accessibility token work`, `icon family work`) the canonical `X token work` / `X family work` alias was seeded on the intended doc — and, because adding the generic `work` token to only those 6 docs then poisoned previously-passing sibling families (any `work`-bearing doc that incidentally mentions another family's term out-ranks that family), the seeding was **made uniform across all token-family and component-family docs**. Uniform seeding is the fixpoint: it gives every family query a 3-token intended match and is strictly better than partial seeding (4 residual WEAK vs 10). The seeded aliases are genuine discovery phrasings ("color token work" is a real way an agent searches), so this respects Req 9's discovery-plane intent.

**Files carrying new `aliases` (41 total):** the 20 worklist-target docs above PLUS the uniform family backstop on the remaining token-family docs (spacing, border, radius, blend, glow, responsive, blur, layering [`layering z-index token work`], motion [`motion easing token work`], sizing) and component-family docs (avatar, badge, button, chip, container, data-display, divider, loading, modal, navigation, progress). (Form-Inputs already had its pre-existing RTL aliases — untouched.)

**Flagged for adjudication — 4 concepts NOT liftable to rank ≤ 2 via aliases-on-intended-docs (do NOT loosen the gate; do NOT force):** `color token work`, `shadow token work`, `opacity token work`, `cross-platform implementation patterns`. These are **provably unsatisfiable** under the current scorer + the aliases-only constraint:
- For `color token work`: `token-family-color` (idx 51) and `token-family-blend` (idx 48) **mutually mention each other's family term** (blend's description is about color; color has a "blend model" section). Whichever doc carries `work` wins BOTH queries on corpus order; the other loses its own query. There is no alias configuration in which both `color token work` → color AND `blend token work` → blend pass. Proven by enumerating the conflict (see § below). Same shape for shadow (conflicts with blur/layering/container, which mention shadow) and opacity (conflicts with glow/container, which mention opacity).
- For `cross-platform implementation patterns`: the two docs out-ranking `platform-implementation-guidelines` — `Process-Cross-Reference-Standards` (idx 34) and `cross-platform-vs-platform-specific-decision-framework` (idx 74) — match all 4 query tokens via FROZEN body content (titles/sections), not via my aliases. I cannot reduce a frozen-content competitor's match count by editing the intended doc.
- **Root cause (one sentence):** the docs `find_docs` rubric weights ALL high-signal fields equally (`title = sections = description = aliases = 3`), so a doc whose *title* is the family term cannot out-rank a doc that merely *mentions* the term, and exact ties fall to corpus order. Two non-gate-loosening fixes exist but are OUT of 119-A's aliases-only scope and belong with the rubric owner: (a) give `title`/`name` strictly higher weight than `description`/`sections` so the dedicated doc wins, or (b) accept these 4 generic-phrase concepts as oracle entries the discovery plane structurally cannot disambiguate and adjudicate the oracle. I did NOT touch the scorer or the oracle.

**Empirical proof the 4 are structural, not a phrasing gap:** a maximal alias (`color token work, color tokens work, working color tokens, color token family work`) on `token-family-color` left it at rank 3 — because the query has only 3 distinct salient tokens, color already matches all 3, and richer aliases add no new query-matching tokens. Verified and reverted.

_Req 9.1, 9.2, 9.3, 9.5_ (9.4 — domain owners author / Civitas executes — is satisfied operationally here: Civitas authored+executed the seeds in this dry-run; Ada/Lina/Leonardo review is recommended for the domain phrasings, consistent with Req 9 AC4.)

---

## Verification (run by me)

- **id-uniqueness guard** (`npm run check:id-uniqueness`): **PASS** — 90 docs scanned across both roots (89 + new Task-Completion-Protocol), 0 derived, `task-completion-protocol` unique.
- **Root `tsc --noEmit`**: exit 0.
- **Root `npm run typecheck:scripts`**: exit 0.
- **mcp-server `tsc --noEmit`**: exit 0.
- **Root `npm test`**: 376 suites passed / 1 "failed" = **8989 passed, 1 failed of 8990**. The single failure is `src/integration/__tests__/ComponentTokenValidation.test.ts › should scale linearly` — a wall-clock NFR timing test (0.416 vs 0.352 threshold) unrelated to this doc/test/manifest change; it **passes 42/42 in isolation** on re-run. Pre-existing machine-timing flake, not a regression.
- **mcp-server `npx jest --runInBand`**: **582 passed / 35 suites**, 0 failed.
- **`always`-set assertion**: PASS — exactly the 9 AC1 docs + the meta-guide on disk; 0 `always` in `governance/`.
- **`.kiro/steering/` file count**: 10 (9 AC1 identity − Task-Completion-Protocol pending? no: 8 existing identity + new Task-Completion-Protocol + meta-guide = 10; the 9th AC1 doc IS Task-Completion-Protocol, meta-guide is the +1 pending Task-10 removal).

## To re-verify in the main loop

- `rebuild_index` (on-disk corpus changed: new always doc, demoted process docs, 226+ cross-ref edits). The new doc is `always` so it is NOT in the governance-only MCP index — expected; confirm `get_index_health` stays healthy at 80 governance docs.
- Spot-check a migrated cross-ref resolves by id through a path-taking tool (e.g. `get_document_summary({ path: "token-governance" })`) once the live server is restarted (Task 7 note: the live server needs a restart, not just rebuild, to serve `governance/`).
- Decide the two FLAGS above (bare-id vs `list_cross_references` enumeration; and whether the 176 governance MCP-query `path:` snippets join 8.5 or 119-B).
