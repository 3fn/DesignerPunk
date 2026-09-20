# Design Outline: 123 — Consumer Distribution

**Date**: 2026-09-20
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: **DRAFT — R2 INCORPORATED (2026-09-20). Awaiting two settle preconditions, then Peter's outline settle.** Not a settled outline; no requirements phase opens until settle (Spec-Feedback-Protocol § "Sequential Formalization Gate").

> **R1 ROUND COMPLETE — four reviews, 18 BLOCKING, all incorporated at R2; one advisory position declined with reason** (the decline was **accepted on the merits** by its author at R2, with a named residual now written at cut-rung 7). Full round and per-item dispositions: **`feedback/design-outline.md`**.
>
> **R2 VERIFICATION ROUND COMPLETE — and its headline is a FAILURE, deliberately surfaced rather than buried: § 7.2 v2 FAILED Stacy's falsification pass.** Her **authorized emptying** attack hollowed her own charter's operational instrument — **~104 lines, 10 live repo-hits, every statement true, every clause passing.** Root diagnosis, accepted: *four negative clauses cannot establish a positive property; the check implemented SUBTRACT, SHAPE and ROUTES and never implemented RE-GROUND.* **§ 7.2 is now v3** and **awaits her SECOND pass**.
>
> **The six changes a returning reader most needs**: **(1)** § 7.2 **v3** — a first positive clause (*show where the function went*), the `repo-bound-in-entirety` term **deleted** (it inverted R5 exactly where R5 matters most), mis-attribution and the vacuous zero-route pass closed, the always-set given an application unit. **(2)** § 7.4's acceptance row **split into deterministic / routed / behavioral**, because *"deterministic, CI-able"* was advertising a guarantee the check does not have. **(3)** Trio preconditions **settled in two clauses** — no source-tree access (unbent) **plus a per-persona host fixture**, which is a *feasibility* requirement for the behavioral probe, not just realism. **(4)** The component floor is **the metadata, not the directory** — and the 1.54 MB of tests+examples is the only place in the diet where an item is mass rather than hygiene. **(5)** Gate 4 is **two decisions** plus a required third mechanism for the nine always-set docs. **(6)** **D-live-5 repaired out-of-band** (PR #193), lifting a `src/` diet constraint rather than working around it.
>
> **R3 VERIFICATION ROUND: § 7.2 v3 ALSO FAILED — and the failure was SUBSTRATE, which turned it into a ruling rather than a redraft.** Stacy's surviving attack is **false re-pointing**: empty a section, disposition `re-pointed`, name any surviving adjacent section as the destination — **every clause passes and nothing routes to a human.** Her measurement of *why*: charter bodies render as **one attribution span** (`[3,375] passthrough → …#body`), so there is no section-granular provenance for clause (v) to verify against. **She fired the author's pre-committed landing place and narrowed its wording against both parties' comfort**, from an unfalsifiable *"a static check cannot carry this property"* to a **buyable substrate condition** — and Peter bought it.
>
> **RULED (Peter, 2026-09-20): FORK (B) — BUY SECTION-GRANULAR PROVENANCE IN U2**, with the **falsification criterion PRE-STATED** in § 7.2 so pass four is a one-line verification. **And Q9 CLOSED: shape (ii), the profile dimension** — the two rulings compound, since (ii)'s checked-in consumer renderings are what the new spans get swept against.
>
> **ONE SETTLE PRECONDITION REMAINS — and this ruling REMOVED the other.** § 7.2's sign-off buys its substrate in U2, i.e. *after* settle, so it **moves from an outline-settle precondition to a U2 acceptance gate**. What is left: **the reference-corpus probe**, currently **PARTIAL** — setup half PASSED (no-init path works, docs MCP boots package-relative zero-env, 8-tool schema served), **consumption half BLOCKED** on headless CLI auth.
>
> **§ 7.2 IS NOT SIGNED OFF** — v3 failed, no conditional sign-off was given, and a fourth pass is explicitly anticipated.
>
> **Peter rules at settle on**: **gate 4** (×2, probe-gated), **gate 5** (the round converged on **no split**), **Q5**, and **Q6's conditions**. *(Q8's rename fork is contingent on reduce-not-grow, not a standing settle item; Q1/Q3/Q4/Q7/Q8/Q9 are ruled.)*

> **SECOND SITTING FOLDED IN (Peter, 2026-09-20, main-loop).** **R4** persona-embodied cold-user trio (resolves the draft's Q3) → § 3.4 · **R5** all eight agents ship, contract = subtraction **+ re-grounding** (resolves the draft's Q4) → § 3.5 · **R6** pre-installed starter specs, launch set of two → § 3.6 · **`personal-note.md` template-ized** (dissolves audit A10) → § 3.7 · **R7 RECORDED LEAN** package-consumed-primary with the repo clone as ownership hatch — *open for round input, Ada named* → § 3.8. Out-of-band: **D-live-1 repaired** (PR #192) → § 1.3.
>
> **THIRD SITTING FOLDED IN (Peter, 2026-09-20, final pre-round).** **R8** the five-minute test IS a formal requirement; *"five-minute" is philosophical, not literal*; runs are never truncated at a time boundary — **closes Q1 and gate 3 entire** → § 3.9 · **R9** KEEP the GH-Packages dual-publish — **closes Q7**, ruled **against this outline's recommendation**, tax accepted knowingly → § 3.10 · **cold-human trigger named generically** ("the first willing stranger"), with the survives-closeout consequence recorded → § 5.5 · **gate 5 held with NO PRIOR** — the round weighs scope shape fresh → § 9.3. Also confirmed: the `eject` retirement (§ 4.2) and the R5 author-stake handling (Stacy's press stands).
>
> **STILL OPEN for the round**: **gate 4** (Q2), **gate 5** (§ 9.3 — no prior held), **Q5**, **Q6** (lean recorded), **Q8**.

> **PROVENANCE — this document supersedes the 2026-06-23 PLACEHOLDER STUB.** The stub (in git history at `.kiro/specs/123-consumer-distribution/design-outline.md`, last modified at `3507a0b4`, 2026-08-12) recorded scope, dependencies, and cross-references only, under an explicit "no design decisions recorded here" rule, because formalization was **direction-gated on Spec 118**. Gate history, preserved: 118's direction decision landed and 118 COMPLETED (v13.0.0, 2026-07-05); the 125-B U1-c verdict ratified (#105); 119-B completed (#107) with its handoff. The stub's own dated note (2026-08-12) recorded **ALL formalization gates OPEN**. Peter's ratified order of 2026-09-19 made 123 the next major arc. The stub's scope survives here — refined, not discarded — in § 4.

**Formalization inputs (ten, all committed)**:
- `inbound-from-117.md` · `inbound-from-118.md` · `inbound-from-121.md` · `inbound-from-122.md` · `inbound-from-124.md` · `inbound-from-13.0.0-release.md` · `inbound-from-onboarding-ci-vision.md` · `inbound-from-q6-release-retirement.md` · `inbound-from-wordpress-thesis.md` (all in this directory)
- `.kiro/specs/119-B-capability-routing-measurement/inbound-to-123-from-119-B.md` (the tenth)
- Strategic view: `docs/roadmap/2026-09-20-consumer-distribution-roadmap-update.md` (spine status, three axes, gates 1–5, conflicts C1–C5, owed checks). This outline is written to be consistent with it; where they diverge, **this outline is the formalization artifact and the roadmap doc is strategy-altitude context**.

**Reading contract (D1, inherited from the 119-B handoff)**: every count and file-state figure below is **measured at drafting (2026-09-20) and is never load-bearing** — the consuming task re-measures at start. Figures are evidence for framing decisions, not inputs to acceptance criteria.

---

## 1. Problem

### 1.1 The goal, framed for the persona

A **solo technical founder building with agents** (R1) should be able to install DesignerPunk into their repo and, in minutes, have: a themed cross-platform design system, MCP-served documentation their agent can query, and a working agent organization in the tool they already use — without reading this repository's governance, without authenticating to a private registry, and without inheriting instructions that reference authorities their repo does not have.

That is the WordPress five-minute test, restated for the persona. **Today none of the three clauses hold end-to-end**, and the third is actively violated.

### 1.2 What a consumer gets today — measured 2026-09-20

Package at `14.1.0`. `files[]` ships, among other roots: `src/` (whole), `dist/**` (glob model, 118 Task 9.5.3), `.kiro/steering/` (9 identity docs), `governance/` (83 docs), `.kiro/agents/` (8 Kiro-shaped agent prompts + attribution), `product-template/`, `mcp-server/src/`, `application-mcp-server/src/`, `token-index/`, `family-guidance/`, `experience-patterns/`, `layout-templates/`, `design-language/`.

`npx designerpunk init` (`src/cli/init.ts`) copies into the consumer's repo: `src/types`, `src/tokens` (+ `src/tokens/component` with a build-import transform), `src/components/core`, `product/overview.yaml`, **`.kiro/agents/` wholesale**, **`.kiro/steering/` wholesale**, **`governance/` wholesale**, a scaffolded `.kiro/settings/mcp.json`, a `designerpunk.config.ts`, and an `.npmrc`.

Verified working (do not re-solve): package-relative MCP boot with zero env wiring (13.0.0 cold-install proof, `inbound-from-13.0.0-release.md` §1); `resolvePackageRoot()` surviving compile-to-`dist`; consumer-authored component tokens loading in package mode via the 124 return-harvest contract; the `files[]` drift-resistant glob model; the packed-install consumer guard (`npm run test:consumer` → `tests/consumer-integration.test.ts`) as the certification arbiter.

### 1.3 The live defects — six, after R1 (two found by reviewers)

These are not hypotheticals for the round to weigh. They are (or were, for D-live-1) current published behavior. **Dispositions are recorded per defect.**

> **The lesson the class teaches, generalized at R1 (Leonardo A7).** D-live-1's second instance taught *"the survey found the file and missed the sentence."* Two more instances found in review sharpen it: the survey **reads prose and misses machine-readable config**. D-live-5 (a scaffolded tsconfig) and D-live-6 (a shipped autoApprove list) were both invisible to a prose-oriented audit. **Content policy (Axis C) must reach scaffolded config, not only shipped documents** — that is now a stated requirement on gate 4's copy-side decision (§ 6.2), not an observation.

- **D-live-1 — `init` pinned every consumer to GitHub Packages. ✅ REPAIRED OUT-OF-BAND (2026-09-20).** `src/cli/init.ts` wrote `.npmrc` containing `@3fn:registry=https://npm.pkg.github.com`. Under **R2 (public npm primary)** this was a defect, not a policy: precisely the "stale `@3fn` scope-mapping is a silent registry pin" hazard named in `inbound-from-13.0.0-release.md` §2(c) — with DesignerPunk's own scaffolder creating it. A consumer who ran `init` then `npm update` hit GitHub's auth wall: the locked door in front of the five-minute test.
  - **A second instance of the same defect class, not in this outline's first survey**: `init`'s "Next steps" output additionally instructed consumers to *"Set GITHUB_TOKEN env var (read:packages scope)"* — the pin taught in prose as well as scaffolded in config. Worth recording, because it shows the class is *instructional* as well as mechanical: the survey found the file and missed the sentence, and content policy (Axis C) is exactly where sentences like that live.
  - **Fix** (PR #192, branch `fix/init-npmrc-registry-pin`): no `.npmrc` scaffold (an explanatory comment left at the site), the `GITHUB_TOKEN` next-step removed, and a regression guard in `src/cli/__tests__/init.test.ts` asserting `.npmrc` is NOT created. Record: `.kiro/issues/archive/2026-09-20-init-npmrc-registry-pin.md` (born-closed).
  - **Consequence for this spec**: **U1 no longer owes the template repair.** U1 keeps only the *sync-side* repair of already-pinned consumers (§ 4.3, § 4.4). Q7 (mirror vs drop) stays open and is unaffected — the fix stands under either disposition, which is the separation § 4.3 argued for, now load-tested.
- **D-live-2 — the imposter problem is already shipping.** `init` copies the 8 in-repo agent prompts and the 9 identity docs into consumer repos. Those artifacts instruct agents to run `./.kiro/hooks/complete-task.sh`, to treat Peter's merge as the authorization act, and to ratify law by ballot (`complete-task.sh` / "Peter merges" / "ballot" occurrences per shipped prompt, 2026-09-20: ada 2, data 2, kenya 2, leonardo 2, lina 4, sparky 2, stacy 7, thurgood 7). `Task-Completion-Protocol.md` and `start-up-tasks.md` ship the same law as always-loaded identity content. **This is the exact failure Peter's 2026-08-11 correction named** — and it is live in `14.1.0`, in advance of any decision to ship agents. R3's consumer generation profile is therefore **repair of a shipped defect**, not new risk taken on.
- **D-live-3 — `product-template/agents/` is a stale hand-copied fork, and a SHIPPED doc teaches consumers to install it** (understated in the first survey; corrected by **Lina A5**). Nine prompt files, last touched **2026-04-10**, unmanaged by the 122 generator (no reference to `product-template` anywhere in `tools/agent-generator/` or `canonical/`), shipping in `files[]`. `product-template/agents/ada-prompt.md` is 83 lines against the generated `.kiro/agents/ada-prompt.md`'s 217.
  - **Not passive dead weight — a taught install path.** `governance/DesignerPunk-Integration-Guide.md` § "4b. Set up agent prompts" (L238, L241) instructs `cp -r node_modules/@3fn/core/product-template/agents/ .kiro/agents/` and points at the fork's own README. `governance/` ships, so the five-month-stale fork is **the documented way to get agents**.
  - **U2's deletion owns an enumerated reference sweep** (assigning it here resolves Lina's reverse U2→U4 coupling by ownership rather than ordering): Integration Guide § 4b · `governance/MCP-Evolution-Roadmap.md` L217 · `governance/classification-map.md` L686 (a **rule** whose enumeration includes `product-template/`) · `scripts/check-package-name-drift.js` `SCAN_DIRS` L54–58 — **the last verified to no-op rather than throw on a missing dir BEFORE deletion**, since it is wired into `prepublishOnly`.
  - **Three consumer paths converge here, and the third was flagged five months ago** (Lina A6): `init`'s wholesale `.kiro/agents/` copy (D-live-2), the Integration Guide's `cp -r product-template/agents/`, and the fork itself. Spec 101 recorded the two-path inconsistency verbatim and deferred it to "a follow-up spec." **123 is that follow-up.** A deferred finding resurfacing five months later in the directory named for consumers is the strongest single argument for U2 existing at all.
- **D-live-4 — `personal-note.md` ships to public npm** (audit A10). Plus its dangling reference to a résumé file that does not ship. **Disposition RULED (Peter, 2026-09-20): template-ize inside 123** — see § 3.7 and § 6.4. A10 is dissolved rather than adjudicated.
- **D-live-5 — `init` scaffolded a `tsconfig.test.json` re-pinning five subpaths to raw source. ✅ REPAIRED OUT-OF-BAND (2026-09-20).** (**Ada A2**.) `paths` entries mapped `@3fn/core/blend|build|types|testing|config` to `./node_modules/@3fn/core/src/**`; the exports map was reconciled to compiled `dist` (118 Increment 3b, guarded) and **the scaffolder undid it** — D-live-1's exact shape, in config rather than prose.
  - **Fix** (PR #193, `fix/init-tsconfig-src-repin`): `paths` + `baseUrl` removed from the scaffold, regression guard in `init.test.ts`, **consumer-guard-verified**. Record: `.kiro/issues/archive/2026-09-20-init-tsconfig-src-repin.md` (born-closed).
  - **The R2 routing call was correct and is now load-tested twice** — same discriminator as D-live-1: *the spec is not the fix*.
  - **A diet constraint is LIFTED, not worked around**: with consumers no longer type-resolving into `src/`, **`src/` can leave `files[]`** (the issue record states this explicitly). § 6.4's floor is now a free decision rather than one taken around a live pin.
  - **Sync-side tsconfig repair joins U1's repair scope**, alongside the registry-pin repair.
- **D-live-6 — the shipped MCP config template's `autoApprove` lists are drifted** (**Leonardo A7**, new at R1). The docs entry approves `list_cross_references` / `validate_metadata` but **omits `find_docs`** — the discovery entry point every routing row in every charter begins with. The application entry approves `validate_component` (**not a registered tool**) and omits 15 of 21 registered tools, including all four Impeccable design tools, `validate_assembly`, `search_tokens`, and `get_token_details`. A founder's first design-direction query prompts for permission; the doc-discovery call fails to be pre-approved. **Routed to U1/U3 as a repair, with the structural fix: generate `autoApprove` from the servers' tool registrations rather than hand-maintaining it.**

**Routing of record** — from the D-live-1 issue record's "Out of scope (routed)" section, extended for the two new defects:

| Defect | Route | Why |
|---|---|---|
| D-live-1 | ✅ repaired, PR #192 | template defect; no design decision |
| D-live-2 | **U2** | *"the spec is the fix; patching ahead would front-run its core design decision"* |
| D-live-3 (+ reference sweep) | **U2** | same; the deletion needs the generator output to replace it |
| D-live-4 | **U3** | ruled template-ization (§ 3.7) |
| **D-live-5** | ✅ **repaired, PR #193** (routed issue-driven at R2; executed same day) | same class, same file, same fix shape as #192 — and **the spec is not the fix**. Sync-side repair of already-scaffolded consumers → **U1** |
| D-live-6 | **U1** (config generation) + **U3** (scaffold output) | the fix is a generation change, not a doc edit |
| sync-side pin repair | **U1** | U1's only remaining registry obligation |
| mirror-vs-drop | **CLOSED → R9** | keep the dual-publish (§ 3.10) |

**Why this framing matters for the round.** The instinct on a "distribution" spec is to treat it as packaging plumbing. The measurement says otherwise: the package's *content policy* and its *agent delivery* are where consumers are currently mis-served, and the mechanics are mostly pre-solved. That is why the axes below are weighted the way they are.

### 1.4 Why this is the make-or-break spec

Recorded positioning (`docs/roadmap/2026-07-04-wordpress-thesis-strategy.md`, still standing): *Astryx improves a consumer's execution loop; DesignerPunk installs their outer loops.* The differentiator is the shipped capability — the agent organization, the governed corpus, the cross-platform token foundation — not component breadth. 123 is the only spec that turns that claim into something a stranger can experience. WordPress's pitch **was** the install.

---

## 2. What Spec 123 IS

**In scope**: making `@3fn/core` install into a stranger's repo and work — the package's content policy, its agent delivery, its onboarding experience, and the mechanics that assemble the already-shipped substrate into that experience.

**Three axes** (from the roadmap update § 2, carried):

| Axis | Character | Weight |
|---|---|---|
| **A — Mechanics** | Largely pre-solved by 117/118/121/122/124; 123 *assembles*. One core open decision (source distribution form) + the 122 handbacks. | Medium |
| **B — Onboarding + CI experience** | The new spine (Peter's 2026-08-12 vision). Declared needs, not environment assumptions. | High |
| **C — Content policy** | What ships to consumers and in whose voice. Converging from Q6 + 119-B + the audit. Where three of four live defects sit. | High |

**Not a rewrite of the substrate.** Where 117/118/121/122/124 shipped a mechanism, 123 consumes it. The inbounds are explicit about this and the outline honors it (§ 4.1).

---

## 3. Settled rulings — Peter, 2026-09-20 (not reopened in this round)

Raise execution *consequences* freely; the decisions themselves are closed.

**Two sittings, both 2026-09-20.** **R1–R3** were ruled *before* drafting and shaped the outline. **R4–R6** were ruled *on the draft* in a main-loop sitting and are folded in below — they resolve what this outline had opened as **Q3** and **Q4**, and they add a mechanism (starter specs) the draft did not contain. **R7 is a RECORDED LEAN, not a closed ruling** — it is stated here so the round argues *with* it rather than around it.

### 3.1 R1 — Persona

**PRIMARY: the solo technical founder building with agents.** Init UX, install-doc voice, template choices, and the five-minute test are staged for that person.

**NAMED SECONDARY consumption mode: the reference corpus.** Another design system's agents install the package, connect the docs MCP, and extract *intent and worked execution* from the corpus **without adopting the artifact**. This mode gets its own (small) acceptance check and its own install-doc section. It is **one observed behavior, not proven demand** — hence the cheap validation probe in § 8.

**Design-engineering teams: served, not optimized for.** No requirement is written for them; nothing is deliberately broken for them.

*This resolves gate 1 (WordPress-thesis DP1).*

### 3.2 R2 — Channel

**PUBLIC NPM IS THE PRIMARY RAIL.** The GitHub-Packages disposition (mirror vs drop) is this outline's to propose → § 4.3, where it is proposed **and** a residual fork is surfaced for Peter.

Design around the recorded consumer hazard regardless of that disposition: a stale `@3fn` scope-mapping in a consumer `.npmrc` is a silent registry pin (`inbound-from-13.0.0-release.md` §2(c); live as **D-live-1**).

*This resolves gate 2 (WordPress-thesis DP2/DP3) and conflict C3.*

### 3.3 R3 — The full agent org ships to consumers in 123

**Resolves conflict C2.** The five-minute test's "working agents … in their chosen tool" now stands **literal**. This deliberately **narrows the onboarding inbound's P6** (which had deferred the consumer-agent-profile question out of 123) and **accepts scope growth**.

**HARD GUARDRAIL riding the ruling — it does not reverse Peter's 2026-08-11 consumption/stewardship correction.** Shipping agents requires a **consumer generation profile**: consumption-scoped charters emitted through the 122 `TargetAdapter` / generator pipeline. **Agents must not carry repo-internal law into repos where those authorities do not exist** — no `complete-task.sh`, no ballot ratification, no "Peter merges on green," no Civitas stewardship cadence, no `.kiro/specs/` workflow presumption. That is the imposter problem, exported; it is currently live (**D-live-2**).

The consumer generation profile is **its own declared merge unit** (§ 7, § 9 U2), not a footnote on a packaging task.

### 3.4 R4 — The cold-user bar is a persona-embodied agent trio (resolves Q3's blocking half)

The blocking acceptance bar for the five-minute test is a **cold-agent proxy, upgraded to a persona-embodied TRIO** (Peter's design). Three fresh agent sessions with no DesignerPunk context, each role-playing a distinct newcomer:

| Persona | Failure axis it varies |
|---|---|
| (a) **Backend engineer**, little-to-no frontend experience | **Design vocabulary** — tokens, semantic layers, contracts as concepts |
| (b) **Designer** with some HTML/CSS, no engineering beyond it | **Toolchain mechanics** — npm, CI, build steps, module resolution |
| (c) **Product manager** building their first app | **Everything** — the no-floor case |

**Why a trio and not one proxy**: varying the axis makes the instrument *triage* — it tells us **where** onboarding confuses, not merely **whether**. It is also a **standing regression instrument, re-run per release**, not a one-time gate.

**Peter's own run is MECHANICS validation — non-blocking, and explicitly does NOT satisfy the cold-human criterion.** He is the author; he cannot be cold. Recording this prevents the most likely rot mode (an author dry-run quietly promoted to "we validated it").

**Cold-HUMAN remains an OPEN OBLIGATION with a named trigger**: the first willing stranger (candidates on record with the orchestrator). It is not blocking and it is not cancelled.

**Caveat carried, not buried**: persona agents **role-play** ignorance rather than possessing it, so they under-simulate genuine confusion. **The trio measures instruction clarity and path completeness; the human measures confusion.** Both stand; neither substitutes for the other.

**PRECONDITIONS — two clauses, settled at R2 (Stacy A5 asked; Leonardo answered, and the answer turned on separating a conflation).** Three different things were being called "repo/corpus access," and only one is the false-green surface:

1. **This repo's source tree** — the surface § 4.1's *"never an in-repo load"* rules out.
2. **The shipped corpus reached as a stranger reaches it** — `governance/` served over MCP from `node_modules/@3fn/core/`. Every persona gets this **by construction**; it is not access granted to the run, it is *the product under test*.
3. **The host repo the persona installs into** — unspecified in the draft, and where the real question lived.

> **CLAUSE (i) — NO ACCESS TO THE DESIGNERPUNK SOURCE TREE. Packed install only. Recorded per run. All three personas, no exception for (a).**
> The bar does not bend here, and Leonardo's reason is why: **(a)'s axis is not handicapped by the hermetic bar — it is *constituted* by it.** The design-vocabulary axis asks whether a backend engineer can learn "semantic token," "contract," "primitive vs semantic" *from what ships*. If the runner can read our source tree that question is unanswerable, and **a vocabulary acquirable only by reading DesignerPunk's repo is precisely the finding persona (a) exists to produce.** Granting corpus access "to be fair" would delete the axis in the name of protecting it.
>
> **CLAUSE (ii) — A NAMED HOST-REPO FIXTURE PER PERSONA. Recorded per run.** **(a)** a small existing TS service with its own `tsconfig`/`jest.config` and no frontend · **(b)** a static HTML/CSS site with no build tooling · **(c)** a near-empty repo — for the first-time PM, empty *is* the realistic context, so she is the only persona for whom a scratch dir is honest.
>
> **Clause (ii)'s primary justification is FEASIBILITY, not realism** — and it came out of the composition rather than from any one reviewer. Once the behavioral direction-(ii) probe rides the trio (§ 7.4), *a consumer-Lina needs components to work on and a consumer-Leonardo needs a product surface*; **an empty scratch dir gives the probe no task to perform, so the re-grounding contract's only end-to-end check would run against nothing and pass.** Realism is the secondary benefit: an empty-scratch run is structurally blind to the whole class of *"the install must survive contact with pre-existing host code"* — a class that is **live and measurable today** (see § 5.3's `createFileIfNotExists` finding).
>
> **Fixtures are committed artifacts, not per-run improvisation** (Leonardo A16): three tiny fixture repos, or three `git init` recipes, committed with the trio's protocol. *A fixture chosen fresh each release makes cross-release findings incomparable, which is the quiet way a regression instrument stops regressing anything.*

### 3.5 R5 — All eight agents ship, and the contract is subtraction **plus RE-GROUNDING** (resolves Q4)

**All eight agents ship.** And Peter's reframe **supersedes pure subtraction**, which was this outline's draft framing and was the weaker idea:

> **The ROLE ships intact, re-pointed at the consumer's repo.** Consumer-Thurgood does spec formalization, test governance, and steering-doc health **for THEIR repo — their Civitas, not ours.** What is subtracted is never the role, only *this repo's specifics*: our ballots, our merge authority, our scripts.

This dissolves the draft's § 7.2 worry that an agent's charter might "reduce to near-nothing" — that outcome was an artifact of framing the contract as deletion. Under re-grounding there is no collapse case: a charter that looked repo-bound was mis-read as *about this repo* when it was about *a repo*. **Recording the author's own stake honestly**: Thurgood was the draft's named collapse candidate, and the reframe is what saves the charter — the author is not neutral about that, and the round was right to press.

> **THE PRESS WAS ANSWERED AT R1, AND HALF OF IT LANDED (Stacy B1).** Her finding, accepted verbatim in substance: *R5's **conclusion** survives scrutiny and is not self-serving — the role/repo distinction is independently verifiable and holds for charters with no Thurgood stake (consumer-Ada governing their tokens is coherent on its own terms). **What was self-serving-shaped was the DEFENSE***: this paragraph and § 7.2 both rested the answer on *"it is testable, via (ii)"* — **and (ii) was the direction that could not fail.** ***"An interested author offering an unfalsifiable falsifier as his own check is the finding; the ruling is not."***
>
> **The defense is therefore rewritten, not repeated** — and **rewritten twice**, because v2 failed her falsification too. It now rests on things the author cannot self-certify: **§ 7.2 v3's positive clause (v)** — *show where the emptied function went* — whose `no-consumer-counterpart` path **requires the OWNING DOMAIN AGENT's signature, not the profile author's**; and the **behavioral probe riding the trio runs** (§ 7.4), where a hollow charter fails behaviorally even when it passes textually. Ada A7 adds the instance that matters: run it **on Thurgood's rendered consumer output as a named acceptance item** — *"a non-collapsing agent reporting no collapse is near-worthless as testimony."* **v3 awaits her second pass.**

### 3.6 R6 — Pre-installed starter specs are an onboarding mechanism; launch set of TWO

The package ships **executable specs as curriculum**. This unifies the onboarding vision's *"the consumer inherits the method by doing it once"* with a named owner for the doing.

**Launch set — exactly two** (the support-surface counter-argument applies **per-spec**, so the set starts tiny and **earns** growth):

1. **The CI-needs spec** — the P2 vehicle: declared needs + their gate-bite recipes, executed by the consumer's agent against their environment.
2. **Thurgood's re-grounding spec** — **consumer-Thurgood's first assignment is running his own onboarding**: re-point his charter at their repo, establish their steering/spec surface, and report what does not transfer.

Design consequence: R6 is the bridge between U2 (the agents exist, re-grounded) and U3 (the onboarding experience). Detail: § 5.6.

### 3.7 `personal-note.md` — RULED: template-ize inside 123

The shipped form becomes a **template scaffold that onboarding personalizes per-user on install** — not Peter's personal letter. This **dissolves audit finding A10** (no exclude-vs-confirm adjudication is needed) and **pulls the existing "Personal Note template" deferred item forward** from its second-customer trigger. Lands in **U3**. See § 6.4.

### 3.8 R7 — RECORDED LEAN (explicitly NOT a closed ruling): package-consumed-primary

Peter **leans** package-consumed-primary, with the **GitHub repo clone blessed as the DIY-ownership escape hatch** — an install-doc paragraph pointing agents at it: *"prefer owning every line? clone the repo."* Package mode is positioned as **the path for continual updates**.

**He explicitly wants feedback-round input on this**, and named **Ada** in particular: what does package-primary mean for **consumer token authoring**? The question is therefore framed **open-with-a-lean** (§ 4.2, § 10 Q6), not settled. Reviewers should argue the substance; the lean tells you where the burden of persuasion sits, not that the matter is closed.

### 3.9 R8 — GATE 3 CLOSED: the five-minute test is a formal requirement, and "five-minute" is philosophical, not literal

*Third sitting, 2026-09-20. Closes Q1 and therefore gate 3 entire.*

**It is a formal requirement.** Peter's framing, verbatim: *"Keep it relatively short, but don't cut off important learnings just to satisfy an arbitrary time requirement. Good data is valuable."*

Concretely, three clauses the requirement must carry:

1. **The bounded step count is the assertable bar.** That is what an acceptance criterion may be written against.
2. **Wall-clock is recorded per run as evidence, never asserted.** A stranger's machine and network are not ours to promise (§ 5.5), but the number is worth having across runs.
3. **A run is NEVER truncated at a time boundary.** A run that goes long is **good data about where onboarding drags** — the single most useful output the trio produces — not a failure to abort. Anyone writing the AC should read a long run as a finding, not a violation.

**Why this is the better shape than the draft's instinct**: the draft treated "five minutes" as a measurement problem to be defined away. The ruling treats it as a *design intent* — short is the goal, learning is the constraint — which is the only version compatible with R4's trio being a **triage** instrument. A bar that stopped the clock at five minutes would destroy exactly the data the trio exists to collect.

### 3.10 R9 — Q7 CLOSED: KEEP the GitHub Packages dual-publish

*Third sitting, 2026-09-20. Closes Q7.*

**Ruled: keep dual-publishing.** Public npm remains primary (R2) and remains the only rail named in consumer-facing docs, templates, and scaffolds (§ 4.3); the GH-Packages mirror continues to be published.

**Recorded plainly, per AICP: this ruling went against the outline's recorded recommendation** (§ 4.3 recommended mirror-but-undocumented while surfacing the drop as the fork; the drop was the cheaper option and is the one not taken). The trade-off is **accepted knowingly**, and it recurs:

- **The tax**: the dual-publish release friction is real and per-release — the 2FA-on-publish / `--access public` / scope-mapping flag playbook, and the **false-live `npm view` hazard** (at 13.0.0 a scope-mapping caused `npm view` to answer from GH Packages and report a version as published when it was not).
- **What it buys**: continuity for any GH-pinned consumer, and the private/gated rail stays available without a re-decision.
- **Where the cost lands**: the release-playbook cost **rides into U1 / release-process scope as a known tax, not a surprise**. It should appear in the release recipe as a step with its verification, not as tribal knowledge — an undocumented mirror nobody checks is how the false-live happened the first time.

### 3.11 What the rulings do NOT settle

R1–R6, R8 and R9 fix the persona, the rail (both halves), the agent-shipping question, the cold-user bar, the charter contract, the starter-spec mechanism, and gate 3. They leave open: **consumer corpus policy and packaging diet (gate 4)**, **unit structure (gate 5 — deliberately held open for the round; § 9.3)**, and **Q5**, **Q6** (lean recorded), **Q8**. **Do not read a ruling as having settled an adjacent question by implication** — R5 in particular settles *what ships*, not *how it is delivered* (Q5) or *what a consumer imports* (Q6).

---

## 4. Axis A — Mechanics

### 4.1 Pre-solved substrate — consume, do not re-derive

| Mechanism | Owner spec | 123's use |
|---|---|---|
| `resolvePackageRoot()` (Class C), survives compile-to-`dist` | 118 T9.5.2 | Foundation for dual path-context; do not re-derive package-root logic |
| Consumer-aware catalog (Class C′) — token index + component→token map reflect the *consumer's* system | 118 T9.5.2 | The pattern `init --target` generalizes |
| Per-root MCP data-root resolution (env → cwd-when-consumer-owned → package-relative) | F-C2 patch, `src/cli/shared/mcpDataRoots.ts` | **Do NOT re-implement server-side fallback.** Only MCP *config* wiring remains |
| `files[]` as drift-resistant build-tracking globs | 118 T9.5.3 | Extend the glob model; never re-curate a hand list |
| Registerless bin under plain `node` (`dist/cli/designerpunk.js`) | 118 T9.5.3 | Assume compiled-dist execution; consumer installs no TS runtime |
| Component tokens load in package mode via **return-value harvest** (not import side-effect) | 117 R4 + 124 | Consumer component-token authoring works; authored API unchanged |
| Packed-install consumer guard | 118 | **The certification arbiter — never an in-repo load** (false-greens). **⚠ QUALIFIED AT R1 — see the note below; the arbiter does not currently cover the path R7 makes default** |
| `TargetAdapter` seam (`emitAgent`/`emitSkills`/`emitAlwaysLayer`/`toolRef`/`skillRef`/`renderWriteScope`/`dispositions`) | 122 | The extension point for the consumer profile (§ 7) |

The full module-resolution contract is served law: `rosetta-system-architecture` § "Module-Resolution Contract (Spec 118)".

> **⚠ ARBITER QUALIFICATION — three converging R1 findings. Read this before treating any row above as settled.** The row that says "the certification arbiter" is true in name and **currently false on three surfaces**, and R7 elevates the uncovered path to default:
>
> - **Ada B2** — `ConfigLoader` resolves `tokenSourceRoot` package-relatively when `tokenSource` is omitted, but `init` writes `tokenSource: './src/tokens'` every time, so the only packed-install arbiter exercises **local mode, always**. The in-repo package-mode test states its own limit: *"Real scoped resolution in a packed install is certified by the consumer guard"* — and it is not. **Adopting R7 without extending the guard ships exactly the false-green class the arbiter exists to prevent.**
> - **Lina B3** — the guard's only application-MCP assertion is `expect(get_component_health()).toBeDefined()`. **A zero-component index returns a perfectly well-defined health response.** The token surface was hardened against this exact silent-zero at L97; components never were.
> - **Ada A4 / Lina B3** — the Class C′ fixture's premise is *the `init` copy R7 removes*. Its comment says so in its own words. Remove the copy and the fixture is testing something else while B2's regression sails underneath.
>
> **Consequence, and it is a sequencing one**: extending the guard is a **hard precondition on R7**, owed in **U1**, not U5. The three additions are named in § 9.1. Until they land, no measurement of the diet and no outcome on D1 can be trusted, because the instrument that would falsify them is blind on the relevant surfaces.
>
> **WHY THIS HAD TO BE CAUGHT AT OUTLINE STAGE, AND CANNOT BE CAUGHT LATER** (Stacy R2, answering Ada's directed question — and this is the operative half): *"An AC written against a mis-scoped arbiter is **perfectly well-formed** — falsifiable, deterministic, cites a named instrument, passes every test I am able to apply."* Her LENS bites at the tasks round on **criterion text**; it cannot say *"your arbiter covers the wrong path,"* because by then the arbiter's scope is inherited, settled, and upstream of the sentence in front of her. **The defect is invisible at the only stage the routine lens operates.** The eventual completion doc saying *"certified by the packed-install consumer guard"* would be **true, green, and evidence about a path no consumer takes** — the exact class `completion-criteria-parity` cannot reach.
>
> **And the guard extension carries a BITE RECIPE** (her addition): break package-mode resolution deliberately → the new case must go red → revert. *A guard case added to an existing suite is the single most likely place for a silently-not-running test* — and § 4.1 names that suite the arbiter for everything else in this spec.
>
> **THE GENERALIZATION, IMPLEMENTED IN THE TABLE ABOVE, NOT JUST NOTED.** Three reviewers hit variants of the same defect (Ada B2, Lina B3, Stacy B1-family). *"A table of pre-solved things is exactly where a spec stops re-verifying — that is what 'pre-solved' means."* So **every row now carries the path it was proven on**, and rows proven only on the `init`-copies path are marked as such, because R7 changes that path.

### 4.2 DECISION D1 — consumer source distribution form (118's explicit boundary, 123's call)

118's `tasks.md` carries: *"[BOUNDARY — Spec 123] consumer source distribution form (copied raw `.ts` vs shipped-package vs compiled) is 123's call … Flag, don't pre-empt."*

**Today the answer is an undeclared hybrid**: `init` copies raw `.ts` (tokens, component tokens, core components, types) into the consumer *and* the package ships compiled `dist` *and* raw `.ts` is re-exported on three subpaths (`./blend`, `./build`, `./types` — `inbound-from-117.md` §2).

**Peter's RECORDED LEAN (R7, § 3.8) — package-consumed-primary, with the GitHub repo clone as the DIY-ownership hatch. Open for round input; Ada named specifically.**

The proposal, as the lean reshapes it:

- Default `init` wires the consumer to the installed package (compiled `dist` + `.d.ts`), registers their themes, scaffolds their config, and leaves their design system as *their* authored layer on top (their component tokens harvest correctly — 117 R4 + 124). Package mode is positioned as **the path for continual updates**.
- **The ownership hatch is `git clone`, not a command we build.** An install-doc paragraph points agents at the public repo: *"prefer owning every line? clone the repo."* This **replaces the draft's proposed `designerpunk eject [scope]` command** — the hatch exists already, costs nothing to maintain, and cannot drift. Recorded as a deliberate simplification under reduce-not-grow: a built `eject` stays available as a later refinement **only if** demand for *per-scope* forking (rather than whole-system ownership) actually appears.
- 118's per-site scoped-tsx seams hold under this (the inbound says so for *any* outcome that keeps raw-`.ts` authoring; the cloned repo keeps it).
- The three raw-`.ts` export subpaths get reconciled to compiled output in the same unit (117 §2's coherence item).

**Why**: copy-by-default forks a consumer from upgrades on install day. `npm update` cannot reach copied source, which silently voids the backwards-compatibility promise 121's additive MCP contract exists to keep, and it makes the `sync`-refresh watch item (§ 4.4) unwinnable by construction for the copied half.

**The R1 round found the lean's substrate is not ready, and corrected a framing error in this section.** Both reviewers who own the surfaces support the lean and **both condition their support**; a third found a silent-catalog failure. This is not a reason to abandon the lean — it is the work the lean requires, and it re-shapes U1.

- **Consumer THEME authoring has no package path at all (Ada B1).** `SemanticOverrideMap` is exported from neither `@3fn/core/types` nor `@3fn/core/config`, and no export subpath reaches `src/tokens/themes/**` — so Node's `exports` encapsulation blocks a consumer from importing the shipped `dark`/`wcag` overrides even though their compiled forms ship (encapsulated dead weight). Invisible today only because `init` copies them and writes a relative import. **Delete the copy and `generateConfig()`'s emitted line dangles.** Fix: a public token-authoring export subpath, `generateConfig()` re-pointed at it. This is **the half of token authoring R7's own text names** ("registers their themes").
- **The first component a consumer authors silently deletes the other 34 (Lina B2, Leonardo A14).** `resolveConsumerOwnedRoot()` is `env → cwd-if-non-empty → package fallback`, and `src/components/core` is a consumer-owned root. Masked today only because `init` copies all 34. Remove the copy and the sequence is: empty dir → package fallback → 34 visible → consumer writes **one** component → **cwd wins entirely → catalog = 1**. No error; the symptom ("my component library disappeared") does not name its cause; it fires on the most predictable first action there is. **Fix: union-with-precedence** (package ∪ consumer, consumer wins on name collision), in U1, before U2/U3 depend on it.
- **That same fix answers § 14's "fork one component, not the system" question better than `eject` would have (Lina).** Today, copying one component in shadows the other 33 — so per-component ownership is broken by the same bug. With union-with-precedence: drop your fork in, it wins on its name, everything else keeps coming from the package. **No command required.** The install doc leads with this as the *first* ownership answer and keeps clone as the whole-system escalation.
- **"Floor set by measurement" was wrong, and Ada B3 is right about why.** Measurement tells you what resolves *today*, and today everything resolves because `init` copies. **The floor is a decision downstream of the authoring API, not a discovery.** § 6.4 now names it.

**U1's internal sequence, which follows directly: decide the authoring API → extend the packed-install guard → diet to that floor.** In that order, because each step's correctness depends on the one before it. A diet run before the API decision cuts against an unknown contract; a diet certified by a blind arbiter is not certified.

**Surviving conditionality, stated as the reviewers stated it**: Ada's and Lina's support for R7 is **wholly contingent** on these landing. Lina is explicit that *if B2 is not fixed, copy-by-default is genuinely the better model for components* and she would argue against the lean. Ada is explicit that if the diet cuts `src/tokens`, `generate` stops, the consumer's `token-index/` never exists, the MCP answers our catalog behind a hint string, **and package-primary does collapse into dependency-consumption — at which point the positioning counter is simply correct.**

**Surviving counter-argument (fold-back could not absorb it; still live even under the lean).** The copy model is what makes the consumer's design system *theirs* — the concrete expression of the C′ premise 118 ratified and of "installs a capability, not a library." Package-primary moves DesignerPunk one step toward being a component vendor with agent affordances, which is the Astryx position we claim not to occupy. The clone hatch answers *ownership* but not *defaults*, and **defaults are the product**: a consumer who never reads the hatch paragraph experiences DesignerPunk as a dependency. The lean accepts that cost in exchange for upgradeability; the round should say whether the trade is right. The decision is load-bearing for `sync` (§ 4.4), for the packaging diet (§ 6.4), and for what platform implementers import in a consumer repo (§ 14's deferral trigger) — and for nothing else.

### 4.3 DECISION D2 — GitHub Packages disposition (R2's open half)

**RULED (R9, § 3.10): keep the dual-publish.** The analysis below is preserved as the record of what was argued — it recommended mirror-but-undocumented and surfaced drop-the-mirror as the fork; **the fork was taken toward keeping**, and the recurring tax is accepted knowingly. What survives operationally from this section is (1) the consumer-facing silence about GH Packages, and (2) the verification discipline the mirror requires.

Two separable things got bundled together in the C3 framing, and separating them changes the answer:

1. **The `init` `.npmrc` template writing a GH-Packages scope-mapping was a defect** (D-live-1) — repairable unconditionally, under any disposition. **✅ DONE out-of-band, 2026-09-20** (PR #192 + the born-closed issue record; § 1.3). The separation argued here was load-tested by that fix: it landed while Q7 remains open, exactly as predicted. **What remains in 123**: `sync` detects a pre-existing `@3fn` → GH-Packages mapping in a consumer repo and offers repair *with a named explanation* (per P4's priced-optionality discipline: never silent, never fine print). That is U1 scope, and it is now U1's *only* registry obligation.
2. **Whether to keep publishing a GH-Packages mirror is a separate call.** Dropping the mirror does not fix (1); fixing (1) does not require dropping the mirror.

**Recommendation: mirror-but-undocumented.** Keep the dual publish (near-zero marginal publish cost; preserves a private/gated rail if Peter ever wants early access or a paid tier), but remove GitHub Packages from **all** consumer-facing documentation, templates, and scaffolds, so no new consumer can land there by following our own instructions.

**Surviving counter-argument (the fork, as it was put to Peter).** An undocumented mirror still carries a real verification tax, and we have already paid it once: at 13.0.0 a scope-mapping caused `npm view` to answer from GH Packages and produce a **false "it's live"** (`inbound-from-13.0.0-release.md` §2(c)). A mirror nobody documents is a mirror nobody checks — and a stale mirror version reads as current to exactly the tooling we verify with. **The fork**: accept the per-release verification tax to keep the private rail, or drop the mirror and delete the tax.

**→ TAKEN: keep** (R9, § 3.10). The counter-argument above is therefore **not retired — it is the accepted cost**, and it recurs every release.

> **⚠ THE MITIGATION THIS SECTION NAMED DOES NOT WORK. Measured and retired at R1 (Stacy B7).** The previous text committed U1 to *"publish verification must name the registry explicitly (`npm view --registry`)."* **For a scoped package, an `@scope:registry` npmrc mapping takes precedence over `--registry`** — so the mitigation was void against the exact hazard R9 knowingly accepted. Reproduced in five commands: with a bogus scope map and a good `--registry` flag the query still went to the mapped host; with a good scope map and a **bogus** flag it returned `14.1.0`, proving the flag was ignored; the control (no scope map, bogus flag) failed as expected.

**The guard, in its measured working form — verbatim from Stacy B7, which is the only form proven to beat an npmrc scope map:**

```
npm view @3fn/core@<version> version --@3fn:registry=https://registry.npmjs.org
```

**Its gate-bite recipe, also measured — P2 applied to ourselves, so the guard arrives armed rather than dormant:**

```
npm view @3fn/core@99.99.99 version --@3fn:registry=https://registry.npmjs.org
# → exits non-zero, 404. The guard goes red on demand.
```

**Registration, and one honest limitation.** The guard is a committed script invoked as a **mandatory step in the release recipe** (`.kiro/hooks/RELEASE-FLOW.md` + `governance/release-management-system.md`), with a **register row in `governance/classification-map.md`** carrying an owner and a `check_state`. It **cannot be a PR required check** — the event it verifies happens after merge, so there is nothing at PR time to gate; its "armed" evidence is therefore the **recorded red from the bite recipe, committed with the guard**, not gate registration. Saying that plainly beats claiming a registration mechanism it cannot use.

> **RULED SUFFICIENT AT R2 — with the liveness detector the author did not have** (Stacy R2 Part 3). *"Requiring PR-gate registration would be a category error, and you were right to say so plainly rather than claim a mechanism it cannot use."* **But**: a post-merge guard that silently stops running has **no ARMING event to catch it and no required-check set to fall out of** — the A3-does-not-apply note left it without a firing detector.
>
> **The detector already exists and is hers: the RELEASE claims pass fires at the release tag, over the release delta, and can read whether the guard ran and what it returned.** So the register row's plan is now **three parts, not two**: (1) the committed script as a mandatory release-recipe step; (2) the register row in `governance/classification-map.md` with owner and `check_state`; **(3) the guard's run-and-result added to what a RELEASE claims pass reads** — which supplies liveness with **no new mechanism, in her seat rather than ours.** Leonardo independently agreed with the limitation and with keeping unverified hardening candidates layered rather than merged (A18).

**Two hardening candidates, recorded as candidates and deliberately NOT merged into the required form** (the finding here was that an unverified guard shipped as a mitigation; repeating that would be perverse): **Ada A8** — assert the *answer's* provenance via `dist.tarball`'s host, which a wrong-rail answer cannot spoof because the URL is minted by whichever registry served the metadata; high confidence on the mechanism, **self-declared unverified on the field name**, one command at U1 settles it. **Leonardo A15** — make the check hermetic (`npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null`) so ambient config cannot redirect it at all. Both layer on top of the measured form; neither replaces it.

This section's recommendation was the other option; the ruling is recorded rather than quietly overwritten so the trade-off stays legible the next time the tax is felt. **R9's cost is now armed instead of procedural** — which matters, because § 11's own entry conceded a procedural-only mitigation "is exactly the kind that decays," and this one had already decayed to void before it was ever used.

### 4.4 `sync` — the upgrade-coherence surface

121 Req 4's watch item lands here: if `sync` does not refresh vendored prompts/docs on upgrade, swept references go stale in the consumer copy (the `get_documentation_map` → `find_docs` sweep is the recorded example — a consumer would reference a tool that no longer exists). Under R7's lean the vendored surface shrinks to **generated agent artifacts plus scaffolded onboarding files**, which makes this tractable rather than open-ended — a clone-based owner is outside `sync`'s remit by construction (they own a repo, not a vendored copy), which is a further simplification the clone hatch buys.

`sync` responsibilities in 123: refresh generated agent artifacts against the installed package version; refresh MCP config entries (`.kiro/settings/mcp.json`, `.mcp.json`, `.cursor/mcp.json`) including `autoApprove` drift (**and D-live-6 says that drift is live in the shipped template today — a U1/U3 repair, not only a `sync` responsibility**); **detect and offer repair of an existing registry scope-pin** (§ 4.3 — U1's only registry obligation after PR #192); report scaffolded onboarding artifacts that have drifted from the package.

> **`sync` regeneration is NOT free, and "sync regenerates" reads as free in § 7.3. Corrected at R1 (Lina A4).** `tools/agent-generator/diff-guard.ts` compares **bidirectionally** over guarded roots — *a hand-edited file, a stale extra, or a missing output all FAIL*. That is correct in our repo and **wrong in a consumer's, where a hand-edited agent is legitimate**. What `sync` needs is a **three-way** comparison: package baseline (what we shipped last time) vs consumer current vs newly generated, so it can distinguish "we changed it" from "they changed it" from "both." **That requires shipping or recording a baseline, which nothing does today** — it is a different algorithm, not a configuration of the existing one, and it is U1/U2 scope rather than a free rider.

> **"Report, never silently overwrite" earns its own criterion, not a clause (Stacy, Q6 process consequence).** Under package-primary, `sync` becomes the **sole** upgrade-coherence surface, which makes this the single most load-bearing behavior in the unit — and a **personalized `personal-note.md`** (§ 3.7) is the case where getting it wrong is destructive rather than merely noisy.

### 4.5 The 124 authoring-convention seed — **Lina's, flagged not decided**

`*.tokens.ts` / `tokens.ts` are worn by **two** mechanisms — `defineComponentTokens` value-registration files (harvested) and plain semantic-reference maps (not harvested). 124's brand makes the harvest correct; the *authoring model* stays fractured, and in a C′ world it is a live support question (*"I wrote a `tokens.ts` — why aren't my component tokens showing up?"*). Candidate directions recorded by 124: distinct filenames by mechanism, an authoring lint that warns when a scanned file harvests zero, or convergence.

**Owner: Lina** (`.kiro/specs/124-component-token-return-contract/findings/component-token-authoring-convention-seed.md`).

**LINA'S CALL, made at R1 — split the answer in two:**

- **The harvest-zero lint ships as a U1 rider** — it fires in the consumer's repo, at the moment of confusion, with a named explanation (*"this scanned file harvested zero component tokens; if you meant to register values, call `defineComponentTokens`"*). Small, additive, breaks nothing, and 124's brand already computes the signal the lint reads. This is the half that helps a consumer who names a ref-map `tokens.ts` anyway.
- **The `*.refs.ts` rename is right but is NOT a 123 rider** — it is a **separate bounded issue Lina owns**, gated to land **before U3 ships the install doc that teaches authoring**. Scope: 7 semantic-reference-map files plus their platform-impl import specifiers; behavior-preserving by construction, since they are not harvested today. Folding it into 123 would be scope sophistry — settled design, bounded inventory, and the only true coupling is *ordering*, which an issue can carry.
- **Convergence (the seed's third direction) is ruled out**: value registration and semantic reference are genuinely different mechanisms; merging them would make the registry accept things that are not token definitions. *The incoherence is in the naming, not the design.*

**UPDATED AT R2 — Ada's directed question moved Lina's position, and her lean HARDENED into a recommendation.** Ada asked whether R7 strengthens the lint or the rename. Lina's answer: **both, and it breaks the tie.**

- **It strengthens the lint** (Ada's direction): under package-primary the lint is the only signal reaching a consumer who never opens `node_modules`. In copy mode a confused author could diff against 15 copied neighbours; **package-primary removes that self-service path**, so the diagnostic stops being redundant with reading the source and becomes the *only* feedback channel.
- **It strengthens the rename MORE — and this is the part neither of us had seen: R7 changes what an EXEMPLAR IS.** Under copy mode our filenames were a starting point a consumer immediately owned. Under package-primary **the filtered component root we ship (§ 6.4) IS the exemplar set — permanently, read-only, at whatever version they installed.** Shipping two mechanisms under one filename then means **shipping the fracture as the reference model**, with no local copy to compensate.
- **So the timing argument sharpens rather than softens**: the migration price **steps up discontinuously at 123's release** — not gradually with consumer count — because that release is when the exemplar becomes read-only and canonical.
- **RECOMMENDATION (no longer a lean): the `*.refs.ts` rename lands BEFORE U3 ships the install doc.** Still Lina's separate bounded issue — 7 behavior-preserving files plus platform import specifiers — not a 123 rider.

**Her surviving counter, unchanged in shape and worse in magnitude**: if reduce-not-grow defers the rename, lint-only is the floor, and *we lint consumers for reproducing a confusion we ship as the reference example.* **R7 raises that cost rather than creating it. The fork remains Peter's.** Leonardo's consumer-side read (don't execute a breaking rename with no field evidence about which fork confuses people) is the opposing case on record.

### 4.6 The 122 handbacks 123 absorbs

- **Consumer-side CC always-layer delivery** (122 Req 16 AC4) — 122 delivered the always-layer for in-repo agents only. Consumer delivery is 123's, and under R3 it is part of the consumer profile (§ 7). Note the constraint from 119-B §5: identity docs are never MCP-served, so CC delivery of identity content is the generated `CLAUDE.md` import set — 122's mechanism, re-targeted.
- **Product MCP — the gap is WIRING, not population, and the outline had it in the wrong unit (Leonardo B1, blocking).** Measured: `src/cli/templates/mcp-config.json.template` declares **two** servers (docs, application) — **no `designerpunk-product`** — and `src/cli/__tests__/init.test.ts` L139 **pins that two-server set with an equality assertion**, so the omission is *guarded*, not incidental. Meanwhile `runMcpProduct()` already exists (`src/cli/designerpunk.ts` L266–284, defaulting `PRODUCT_DIR` to `<cwd>/product`) and `build:mcp` bundles `dist/mcp/product-mcp.js`. **The runner exists; the wiring does not.** Separately, `ProductIndexer` expects a seven-directory tree and `init` scaffolds **one** file of it — `product/overview.yaml`, in markdown-flavoured pseudo-YAML with `[CUSTOMIZE]` placeholders and no statement of what the tree is for. *A consumer who fills it in observes nothing, because no server reads it.*
  - **Four named deliverables, placed in the units where the work actually lives** (the previous single clause inside U4 was, in Leonardo's words, *"how this arrives at U5 undone"*): **(i)** the third server entry with `PRODUCT_DIR` — **U1**; **(ii)** the deliberate update of the two-server equality guard in `init.test.ts` — **U1**; **(iii)** a `product/` tree scaffold matching the indexer's directories with one worked example screen — **U3**; **(iv)** an acceptance that a consumer's Leonardo answers a real `get_product_overview` / `find_screens` query in a consumer repo — **U5**. Plus a U1 decision: does `product-mcp-server/src/` belong in `files[]`? The other two server sources ship; it does not.
- **Cursor as proof-of-additivity** (122 Req 24 AC4) — a third adapter against the same interface; `.cursor/rules/designerpunk-core.mdc` is a named hand-maintained drift surface until it exists. **Proposed disposition: below the cut-line** (§ 9) — real, but not load-bearing for R1's persona, and additivity is already proven by the Kiro adapter landing against the unchanged interface.

### 4.7 MCP infra-ring duplication (audit finding, proposed rider)

`StalenessGate.ts` is byte-identical across the three MCP servers; `TokenRefResolver.ts` 92% duplicate; `FileWatcher.ts` already forked and diverged. All three servers esbuild-bundle from one repo, so consolidating into the existing `build:mcp-shared` seam is zero-cost at runtime. The audit flags it as *"the 117/118 parallel-paths-drift shape, latent in Civitas."*

**Out of 123 — but `FileWatcher` gets a named issue rather than an outline pointer that evaporates** (Lina A9 and Ada converging). The two stable duplicates are harmless while frozen; `FileWatcher` is *already diverged*, and the application server's copy is the one watching the three component YAML names — so divergence there is divergence in **when a consumer's component edits become visible to their agent**. Ada's framing is the decisive one: it is the only below-the-line item that **gets more expensive by waiting**; everything else on that list is static.

---

## 5. Axis B — Onboarding + CI experience

### 5.1 The inversion (settled, carried verbatim in substance)

The package stops shipping environment **assumptions** and ships declared **needs** — *"DesignerPunk's guarantees depend on these verifications existing"* — and the consumer's own agent maps needs onto their CI reality. Mechanism/policy split: we own the needs; they own the fulfillment. Quiet product bonus: the consumer's first DesignerPunk experience is *running a spec with their agent* — they inherit the method by doing it once.

### 5.2 Principles P1–P6

- **P1 — Needs-declaration over environment-assumption.** The install doc declares verification needs with their *why*; never a CI vendor, workflow syntax, or repo topology.
- **P2 — Every need ships with its arming proof. NON-NEGOTIABLE.** Each need carries a **gate-bite recipe**: introduce this deliberate failure → your check must go red → revert. This exports 125-A's hardest-won lesson and closes the DORMANT-check failure mode at consumer scale, in repos we never see. *Design consequence: a need whose bite recipe cannot be written does not ship as a need.* That is a real filter on P3's tier list, and I expect it to cut candidates.
- **P3 — Tiered needs.** A MINIMAL core (plausibly small: token-output drift, suite-runs-at-merge, perhaps a contract check) vs optional hardening. The internal 18-check set is mostly stewardship and does NOT ship as needs.
- **P4 — Priced optionality, BOTH SIDES (amended at R1, Leonardo A8).** Skipping a need carries a NAMED degradation statement ("without X, token drift reaches your users undetected") — never fine print, never pretended harmless. **And every need states the ACCEPT cost in the same line**: stand up CI, then maintain a gate-bite proof per need, alone, indefinitely. One-sided pricing is backwards for this persona — *"token drift reaches your users"* is a real cost to a company with users and near-zero to a solo founder pre-PMF, so a skip-only price **reads as a scold and gets skipped wholesale**, which is the worst outcome for P2 since the needs they most need are in the minimal tier.
- **P5 — Harness-agnostic CLI.** The CLI scaffolds files; any agent picks them up. The moment the CLI assumes a harness, environment-alignment re-enters through the side door.
- **P6 — NARROWED BY R3, then given its contract by R5.** The consumer agent profile is no longer deferred out of 123; it is § 7 and unit U2. P6's *caution* survives as the § 3.3 guardrail — what is reversed is the deferral, not the concern. **R5 (§ 3.5) supplies the form the caution takes**: subtraction **plus re-grounding**, so the concern is discharged by re-pointing roles, not by hollowing them out.

### 5.3 The install doc — and the constraints on authoring it

The install doc is a **shipped, versioned release artifact** read by the consumer's agent during onboarding. Its authoring is bound by the 119-B delivery constraints (all of them, non-optional):

- **Section-less route form**: `THEN consult <doc-id> (summary-first)` — `DocRoute.section` is optional; any tooling that reads `canonical/agents/*.md` or re-renders prompts for consumers MUST handle section-less routes.
- **Calibration-cue signal-scoping**: the emitting-tools enumeration is ILLUSTRATIVE; signal emission is the operative test; the canonical home is `governance/classification-map.md § "certainty-calibration"`. **The install doc cites that entry; it never independently asserts the emitter list.**
- **Identity-doc links are broken-by-construction on the MCP surface** — identity docs are never MCP-served. Consumer-facing cross-references must not route to them through MCP; CC delivery of identity content is the generated-`CLAUDE.md` import mechanism.
- **Backstop aliases are ZERO.** Do not reintroduce `<family> work`-style aliases for docs 123 adds; discovery rests on the title rank tie-breaker (discovery-gate law: rank ≤ 2 at ≥ partial).
- **G1 accepted misfit** (three rule-shaped shared members rendering under `## Commands`) moves **through the generator only**, in both adapters, all three entries together — never per-output. If consumer rendering reorganizes sections, coordinate with that fix.
- Docs-MCP index health reads **`degraded` by design** (OB-1). A 123 session must not treat it as a blocker or a novel discovery.

It also carries the **reference-corpus section** (R1 secondary): how a foreign design system's agents should read this corpus — what is DesignerPunk's worked execution versus what is transferable intent. **That section must document a NO-INIT path** (Leonardo A9): today the only documented entry is `init`, whose first act is copying ~100 files of our governance into a foreign design system's repo — actively hostile to a reader who came to extract intent *without adopting the artifact*. Minimal serving is three lines: `npm install`, wire the docs MCP at `node_modules/@3fn/core/governance`, **do not run `init`**. Without it, § 8's probe measures a mode nobody can enter cleanly.

**Two more install-doc obligations surfaced at R1:**

- **The session-restart line** (Leonardo A6) — *the agent session must be restarted before the MCP that `init` just scaffolded is visible.* `init`'s next-steps never says it, so the agent that ran `init` cannot query what `init` configured and its first three queries fail. Plausibly the cheapest real onboarding fix in the spec. It belongs in the install doc **and** in the CLI's terminal output, which is the surface a founder actually reads.
- **The clone hatch is named in the terminal, not only the doc** (Leonardo, Q6) — *the founder reads the terminal; their agent reads the doc.* A hatch paragraph the human never sees does not change a default.
- **The POPULATED-HOST-REPO collision, live today — a U3 scope item in its own right** (Leonardo R2). `init` uses `createFileIfNotExists` for `jest.config.js` and `tsconfig.test.json`, so in a host repo that already has them it prints `skipped: … (already exists)` and moves on — **the DesignerPunk jest preset never applies, while next-step 4 still says `npx jest # Run component tests`.** A founder with an existing repo follows our instructions and gets a silent no-op or a confusing failure. This is the **inverse of § 4.4's rule and equally load-bearing: report, never silently SKIP** (Leonardo A17 — *both directions of that rule matter for a founder whose repo is not empty, and only one of them is currently written down*). It is also the class persona (a)'s host fixture exists to surface (§ 3.4), which is why an empty-scratch trio could never have found it.

### 5.4 The CI-needs spec scaffold

An onboarding step (optionally skippable, priced per P4) scaffolds a **spec in the consumer's repo** that configures DesignerPunk's CI needs to their environment — and if they have no CI at all, the spec can establish it. The CLI scaffolds; their agent executes; **we do not maintain per-vendor integrations** (the scaffolder-not-integrations boundary, § 11).

Under **R6** this is no longer a one-off scaffold but the **first of two shipped starter specs** — the P2 vehicle. See § 5.6 for the pair, its per-spec growth discipline, and the R1 correction that makes the specs and their contents **one atomic deliverable in U3**.

### 5.5 Gate 3 — the five-minute test (CLOSED: R4 + R8)

**The cold-user half (R4, § 3.4)**: the blocking bar is the **persona-embodied agent trio** (backend engineer / designer / first-time PM), a standing regression instrument re-run per release; Peter's own run is non-blocking mechanics validation and is explicitly not a cold-human run. The carried caveat — the trio measures **instruction clarity and path completeness**, a human measures **confusion** — is a limitation of the instrument, not a defect in it, and **belongs in the requirement's own text** so nobody later reads a green trio as "a stranger succeeded."

**The definition half (R8, § 3.9)**: it **is** a formal requirement; "five-minute" is **philosophical, not literal**.

#### The AC shape — separate by object (Stacy B6, adopted in full)

R8 clause 3 is a constraint on the **instrument's operation**, not a property of a deliverable, so AC authoring had nowhere to put it — which is exactly how it would have been dropped. The fix is to split the criterion by what it is *about*:

| Object | Status | Shape |
|---|---|---|
| **The PATH** | **Assertable artifact property** | A bounded step count, **countable from the install doc with no run required**. This is what an AC may assert. |
| **The RUN** | **Recorded instrument output** | Wall-clock, findings, preconditions. **An overrun is a FINDING, never a criterion failure.** |
| **A STOP** | **A recorded event with its reason** | A looping run must end somehow, so stopping is operationally necessary. The property that keeps clause 3 alive is that **a stop is never a silent omission** — closed-vocabulary honesty, the same discipline the claims-pass template uses for un-re-verified rows. **An unrecorded truncation must never roll into a green.** |

**FORBIDDEN FORMS — named because the obvious failure will be caught and these will not:**

1. **A step-count assertion applied to the RUN** (*"the trio run completes in ≤ N steps"*). This is the one that passes review: it obeys clause 1's letter, asserts no wall-clock, reads as fully compliant — **and still truncates the instrument**, just at a step boundary instead of a time boundary.
2. ***"The run SHALL demonstrate the five-minute test"*** — unfalsifiable, then resolved operationally by whoever runs it, who stops at five minutes because the label says so.
3. **A record template reading `elapsed: ___ (target: 5 min)`** — recorded-not-asserted in form, asserted in practice.

**The requirement gets a NON-NUMERIC NAME** (Stacy B6 sub-finding — the cheapest high-leverage item in the round). Any requirement titled *"the five-minute test"* re-imports the literal number every time a reader meets the label without the ruling attached. *"WordPress five-minute test"* survives **once**, as provenance. This is the single most durable protection for clause 3 and it costs nothing.

#### Trio operation (R1 refinements — these refine R4's instrument, they do not touch the ruling)

- **Persona (c)'s axis is redefined to agent-harness fluency** (Leonardo A1/A2, per Peter): (a) isolates design vocabulary, (b) isolates toolchain mechanics, and "everything" isolated nothing — *a union run tells you the product failed, not where.* Meanwhile all three personas were tacitly assumed fluent at driving an agent org, which is where § 1.4's whole differentiator lives and where the failure density is expected. **Keep Peter's first-time-PM persona; define her axis as never-configured-an-MCP-server, does-not-know-what-a-charter-is.** Costs zero runs and converts a control into a diagnostic. The trio now reads **vocabulary / mechanics / agent-org fluency**.
- **Preconditions — SETTLED at R2, two clauses, recorded per run: (i) no DesignerPunk source-tree access, all three personas; (ii) a named host-repo fixture per persona, committed as an artifact.** Full reasoning and the fixtures at § 3.4. Stacy's directed question to Leonardo is **answered and closed**: the bar **stands unbent on the source tree** and **bends on the host repo, which was never specified** — and clause (ii) is a *feasibility* requirement for the behavioral probe, not only a realism one.
- **Runs distribute across at least two `--target` harnesses, and the target is recorded per run** (Leonardo A3). P5 (harness-agnostic) is otherwise a principle with no evidence attached, and three runs in one harness make a standing regression instrument a single-target one. Nearly free at trio scale.
- **If ever reduced, keep (a) or (b), never (c)** (Leonardo A4): a no-floor run fails at everything and attributes nothing; a run with a floor still localizes its failure. This inverts the draft's cut-line item — see § 9.2.

**The cold-human obligation — trigger NAMED, and named generically: "the first willing stranger."** No individual is designated.

> **Honest caveat, recorded because the failure mode is predictable**: a generic trigger is the easiest kind to let slide. There is no date, no name, and no mechanism that fires it — it depends on someone noticing an opportunity. **Consequence, stated up front: if unfired, the obligation survives 123's closeout as an open item** — it does not close with the spec, and closing 123 is not evidence it was discharged. Anyone reading a completed 123 should expect to find this still open.

### 5.6 Starter specs as onboarding curriculum (R6, § 3.6)

The package ships **executable specs as curriculum**. The mechanism is the vision's *"inherit the method by doing it once"*, made concrete and given an owner.

**Launch set — exactly two.** The set is deliberately tiny because the **support-surface counter-argument applies per-spec**: every shipped spec is a failure mode we own in an environment we cannot see. Growth is earned by evidence, not assumed.

1. **The CI-needs spec** — the **P2 vehicle**. Declared needs with their *why* and their gate-bite recipes; the consumer's agent maps them onto whatever CI exists (or establishes one). Mechanism/policy split intact: we own the needs, they own the fulfillment.
2. **Thurgood's re-grounding spec** — **consumer-Thurgood's first assignment is running his own onboarding**: re-point his charter at their repo (R5's re-grounding, § 7.2), establish their steering/spec surface, and **report what does not transfer**. That report is the highest-value artifact in the onboarding flow and it costs us nothing to collect — it is a re-grounding conformance test executed by the agent whose charter is most exposed to the imposter problem, in the consumer's own repo.

**Why this is the right pair.** They are complements, not two samples of one idea: (1) proves the *package's* needs can be met in a foreign environment; (2) proves the *agents* can be re-grounded in one. Together they exercise both halves of what R3 committed to shipping. They are also self-demonstrating — a consumer who runs both has used the spec method twice before writing a line of product code.

**Structural placement — CORRECTED AT R1. Both starter specs live wholly in U3.** The draft split authoring (U2) from delivery (U3) and defended the seam with paired success criteria. Stacy B3 and Leonardo A13 independently showed that is the wrong fix:

- **The real drop was the CI-needs spec's CONTENTS, not its hand-off** (Stacy B3). The draft assigned *"authoring the two starter specs"* to U2 while assigning *"P3 tier list · gate-bite recipes"* to U3 — so the CI-needs spec would be authored **without the declared needs and P2 recipes it exists to carry**, and delivered by a line item not phrased as belonging to it. Both units read green; the delivered spec is a shell missing **P2's non-negotiable content**; nobody owns "carries its recipes." The named seam guarded the artifact's *traversal*, not its *completeness*.
- **Their content is pedagogy, which is U3's competence** (Leonardo A13) — what a newcomer's agent should do first. *Splitting one deliverable across two units and then defending the seam with paired criteria is more machinery than moving it.*

**So: both starter specs, the P3 tier list, and the bite recipes are one atomic deliverable in U3. U2 owes only the re-grounding contract the Thurgood spec instantiates.** A unit may **depend** on a prior unit's output without **owning** the artifact; the draft confused the two. General rule adopted from Stacy B3: *split a deliverable across units only when each half is independently shippable — neither half here is.*

**Stacy's surviving residual, recorded**: U3 gets heavier, which sharpens gate 5 — under a split the curriculum leaves with U3, and U2 would ship an agent org with no curriculum and no conformance test. In practice this is now moot, since all four reviewers argued against splitting (§ 9.3).

**Constraint inherited from P5**: the starter specs are **harness-agnostic scaffolded files**, not a flow the CLI drives. Any agent picks them up. The moment a starter spec assumes Claude Code or Kiro, the environment-alignment problem re-enters through the side door.

---

## 6. Axis C — Content policy (gate 4 — now TWO decisions, OPEN)

### 6.1 The measured surface (2026-09-20, re-measure at consumption)

`governance/` = **83 docs**, shipping wholesale. Of those, **18** name repo-internal authorities directly (`complete-task.sh`, "Peter merges", `taskStatus`, ballot ratification); **41** reference repo-internal paths in some form. `.kiro/steering/` = **9** identity docs, all shipping and all copied by `init`.

**Ada A5 sharpens the target and the sharpening matters**: **0 of 15** `governance/Token-Family-*.md` docs contain any repo-internal authority language. **The banner target is the measured 18, not 41 and not 83.** Banding docs that carry no repo-internal authority **dilutes the banner exactly where it must stay legible** — and dilution is the sharpest form of § 6.2's own surviving counter, since a banner is what a hurrying agent elides first.

The banner precedent exists and is good: `governance/release-management-system.md` opens with an **audience-framing banner** and even points at this spec's open question by name.

#### The surface is TWO surfaces, and the second is already dead weight (Leonardo B3, blocking)

`init.ts` L110–113 copies `governance/` → `<consumer>/governance/`, while the scaffolded MCP config sets `MCP_STEERING_DIR: "./node_modules/@3fn/core/governance"`. **The served corpus is the package's. The copied corpus is read by nothing** — except the consumer's own file search, *which is precisely the path by which their agent ingests our law unbannered and unbidden.*

| Surface | What it is | Banner economics | Recorded default |
|---|---|---|---|
| **MCP-served** (`node_modules/@3fn/core/governance`) | What the docs MCP indexes; agent-queried; invisible in the consumer's tree | **Strong** — the agent gets the banner in the same payload as the content (Leonardo A10) | **(a) banner**, scoped to the measured 18 |
| **init-copied** (`<consumer>/governance/`, `<consumer>/.kiro/steering/`) | ~100 files of someone else's process at the top of a founder's first `ls`; grep-visible; served by nothing | **Irrelevant** — nothing reads it as a document; a grep does not see a banner | **STOP COPYING** |

**This is the change that most shrinks U4** — and it means gate 4's banner decision applies to exactly one surface instead of being smeared across two with different cost curves.

**And it must reach scaffolded config, not only documents** (the D-live-5/D-live-6 lesson, § 1.3): the copy-side decision governs `.npmrc`, `tsconfig.test.json`, `autoApprove` lists, and next-steps prose as much as it governs markdown.

### 6.2 The options, after R1 — one axis was missing

The draft's three options all operate on a single axis (ship-with-framing vs don't-ship). **Lina B5 showed the corpus has two populations with different delivery *physics*, and the options as written cannot reach the second.**

| Option | What it is | Cost | Fit with R1 |
|---|---|---|---|
| **(a) Audience banner** | Banner marking internal-process docs as *DesignerPunk's worked example, not your law* | **18** docs to band (Ada A5), one convention to police, **plus its guard** | **Strong** — and per Leonardo A10 the banner is a *feature* for the reference mode: a well-written band states what is worked example and what is transferable, which is that reader's exact question answered at the top of every doc |
| **(b) Served/not-served split** | Internal-process docs excluded from `files[]` / the index | Expensive to get right; cross-references into pruned docs break; the 119-B bare-id defect class multiplies | **Poor for the secondary mode** — deletes what that mode came for |
| **(c) Both** | Split the genuinely repo-bound, band the rest | Two mechanisms | Middle |
| **(d) RE-GROUND — NEW, and required** | The nine always-set identity docs get consumer renderings through the canonical pipeline | Bounded: **nine members, enumerated in a locked YAML** (`canonical/shared/always-set.yaml`) | **The only option that reaches them at all** |

#### Why (d) is not optional (Lina B5, blocking)

*"A banner is a reading instruction. The always-layer is not read — it is loaded."*

`canonical/shared/always-set.yaml` locks nine members, every one `delivery: {cc: file, kiro: file}` — **unconditionally in every agent's context**. Two are pure repo-internal law: `Task-Completion-Protocol.md` (branch/PR flow, "Peter merges on green", `complete-task.sh`, ballot ratification) and `start-up-tasks.md` (Jest lane law, the governance health check). **Framing prose cannot neutralize law that arrives as unconditional context.** And banding them buys the secondary mode nothing — identity docs are **never MCP-served** (119-B), so the reference reader never sees them. *Banding these nine buys the secondary mode nothing and costs the primary persona everything.*

Meanwhile § 7.2's contract subtracts repo-specifics from **charters**, and the always-set is not a charter. **Between § 6.2 and § 7.2 there was a nine-document hole, precisely where D-live-2's evidence is strongest.**

**Adopted**: the nine re-ground through the same canonical pipeline. `personal-note`'s § 3.7 ruling becomes **the pattern, not the exception**; `Task-Completion-Protocol` and `start-up-tasks` re-ground cleanly under R5's own logic — *a* completion protocol and *a* startup checklist for *their* repo. **Placement, which matters for ordering: this is generator work, so it lands in U2, not U4** (§ 9.1).

**Lina's own counter, recorded**: this makes gate 4 two policies, which is shape (c) — the option § 6.2 costed as "highest effort." Her defense, which I accept: the second mechanism has **nine enumerated members in a locked file**, so it is bounded and mechanically checkable, unlike the 18-to-41-document split (b) was costed against. *"It is 'both' only in the sense that a nine-item exception list is a second mechanism."*

#### The recommendation, restated after R1

**(a) banner for the served corpus, scoped to the measured 18 + its mechanical guard; STOP COPYING on the copy surface; (d) re-grounding for the nine always-set docs.** Three reviewers converged on this shape from three directions.

Two riders: **banner-without-guard is a named non-option** (Stacy A3 — P2 applied inward: every need ships with its arming proof, and an unguarded convention is the DORMANT failure mode in prose form). And **the component-doc set ships whole or not at all** (Lina A7): `Component-Quick-Reference` is a routing table by doc id and 119-B left **zero backstop aliases**, so pruning any family doc dangles its route with no fallback. Her content-correctness flag shapes the banner's **vocabulary**: `Component-Readiness-Status` asserts readiness for *our* 34 components, which in a consumer install reads as a claim about theirs — so the band must cover *"this describes DesignerPunk's own components,"* not only *"…own process."*

**Surviving counter-argument, weakened but not gone**: banners are what a hurrying reader elides. Leonardo A10 weakens it for the *agent* reader specifically (an MCP fetch delivers banner and content in one payload, unlike a human scrolling past). What survives is that we cannot measure banner efficacy in repos we never see — **which is why the probe is now a settle precondition rather than a U5 artifact** (§ 8, Stacy B5).

### 6.3 Release notes to consumers (conflict C4)

Today `docs/releases/*.md` are repo-only. Consumers on `npm update` get new behavior with no in-package record of what changed. The Q6 ballot deferred this here. Complication: **the tool that generated notes is retired** (kill-and-rewrite, ballot 2026-08-12), so there is no rendering pipeline to lean on, and the retirement execution (36-file inventory) is an open issue in its own session.

**Proposed disposition: a minimal, decoupled answer.** Ship a `CHANGELOG.md`-shaped consumer-facing delta (hand-authored at release, consumer-framed, one entry per release) rather than shipping or serving the internally-framed `docs/releases/*.md`. This satisfies "what changed between my installed versions?" without waiting on the retirement execution and without an editing pass on internally-framed prose. **Below the cut-line if Peter invokes reduce-not-grow** — it is the most deferrable item in Axis C because `npm` already shows version deltas and the consumer's real upgrade risk surface is `sync` (§ 4.4), not prose.

### 6.4 Packaging diet (A6) and `personal-note.md` (A10)

Baseline at 13.0.0: **2,547 files / 8.3 MB packed / 31.4 MB unpacked**. The audit named `src/performance/`, `src/workflows/`, and unimported `.example.ts` as dead weight shipping via `files: ["src/"]`, disposition *deletion beats testing*.

> **⚠ THE DIET'S FRAMING WAS WRONG IN TWO WAYS. Both corrected at R1.**
>
> **(1) "Floor set by measurement in U1" is the wrong instrument (Ada B3, blocking).** Measurement tells you what resolves *today*, and today **everything resolves because `init` copies**. The floor is a **decision about the consumer authoring API**, not a discovery — and as written the framing invites cutting what C′ needs. Cut `src/tokens/**` and: `npx designerpunk generate` dies → the consumer's `token-index/` is never produced → `resolveConsumerOwnedRoot` falls back to the package snapshot → **the Application MCP answers DesignerPunk's catalog instead of the consumer's, behind a soft hint string.** C′ regressed to a warning, silently.
>
> **(2) The named targets are ~0.5% of the mass (Ada A3).** Measured on disk: `src/` = **18.7 MB** — `src/assets/fonts` **4.8 MB**, `src/components/core` **6.4 MB**, `src/build` 1.4 MB, `src/tokens` 1.1 MB — against `src/performance` **44 KB** and `src/workflows` **52 KB**. The zero-importer claims verify, so deleting them is correct **hygiene**; it is not a diet. Note also that `src/assets/fonts` is **not** double-shipped: the dist glob excludes `woff2`, so the `src` copy is load-bearing for the four `./fonts/*.css` exports and `./grid.css`.

**The floor, NAMED NOW rather than measured later** (Ada B3 + Lina B1):

| Floor member | Why it cannot be cut |
|---|---|
| `src/tokens/**` | load-bearing at generate-time in package mode; cutting it kills `generate` and regresses C′ to a hint string |
| `src/styles/`, `src/assets/fonts/**` | the `./fonts/*.css` + `./grid.css` exports resolve here; `woff2` is excluded from the dist glob |
| `src/cli/templates/` | scaffolding inputs |
| **`src/components/**/*.{schema.yaml,contracts.yaml,component-meta.yaml}`** | **Lina B1** — 34 × 3 YAMLs reach consumers **only** via `files: ["src/"]`; `find dist -name "*.schema.yaml"` → **zero**, because the dist glob has no `.yaml`. `ComponentIndexer` fs-reads these at index time. Drop or narrow `src/` and **the component catalog is empty in package mode** — which takes out `get_component_catalog` / `find_components`, i.e. **clause 2 of the acceptance bar**. This is the runtime-fs-read-asset class the repo has already been bitten by. **Pin it explicitly in `files[]` so a later `src/` narrowing cannot silently take it.** |
| `src/components/core` | **ANSWERED AT R2 — ship a FILTERED root: the floor is the METADATA, not the directory** (Lina R2). See the breakdown below |

#### `src/components/core` — decided, with two named owners for the remainder (Lina R2)

Measured on this branch (D1 — re-measure at consumption): **6.2 MB total** = YAML **616 KB** (102 files) · `__tests__` **1.5 MB / 89 files** · `.swift`+`.kt` **1.5 MB** · READMEs **388 KB** · examples **40 KB** · ~2.2 MB `.ts`.

- **MUST SHIP — 616 KB of YAML.** B1's pinned floor. And the *why* is sharper than the token case: **the component half degrades harder**, because there is no soft-hint fallback — an absent root yields a zero-component catalog that `get_component_health` reports as **healthy** (L-B3's silent-zero). Clause 2 of the acceptance bar is gone with no error anywhere.
- **MUST NOT SHIP — 1.54 MB of `__tests__` + examples (25% of the tree).** Zero consumer value; the cheapest real cut in the diet. **This is the only place in the whole diet where an item is MASS rather than hygiene** — *30× `src/performance` + `src/workflows` combined* — which sharpens Ada A3 from "wrong idea" to **"wrong list."**
- **OPEN, and it is Kenya's and Data's — the 1.5 MB of `.swift`/`.kt`.** New measurement: **`dist` contains 3 `.swift` and 3 `.kt` files total**, so despite the dist glob naming those extensions, **`src/` is the only rail platform sources reach consumers on.** Cut the tree wholesale and an **iOS or Android consumer receives a design system with no component implementations at all**, while the web consumer is fine via compiled `dist`. This is now the stated **content** of § 14's Kenya/Data trigger, not a generic "package-primary changes what they import."
- **OPEN, joint Ada/Lina — the ~2.2 MB of `.ts`.** Web impls are redundant with `dist` for consumption, but 8 `defineComponentTokens` files under `src/components/**` are harvest inputs and the config template points `componentTokens` at consumer-relative paths that are **empty under package-primary**. *Can the harvest read the package's compiled `dist/components/*/[Name].tokens.js`?* If yes the `.ts` goes; if no, either the `.tokens.ts` files stay or the template re-points. **One command at U1, inside Ada's B1 authoring-API decision — the same question one layer down.**
- **Net**: a filtered root at roughly **616 KB + platform sources pending**, versus 6.2 MB today — expressed as **explicit `files[]` entries**, never a wholesale `src/components/` a later diet can silently narrow.

**The real levers, restated**: `src/assets/fonts` (irreducible in content), the **1.54 MB of tests+examples** (the actual mass), and the two open questions above. **Everything else is hygiene.**

**Sequence inside U1: decide the authoring API (Ada B1) → extend the packed-install guard (Ada B2, Lina B3) → diet to that floor.** In that order.

**The success-criterion shape** (Stacy A4 — *"a delta with no direction and no floor is satisfied by any value, including a positive one"*): **U1 decides the floor and DECLARES a target; U5 asserts against the declared target** — the same two-step R8 uses for the path/run split. And per Ada A3, the declaration must say **which lever it measures**, since a delta that silently means "we deleted 96 KB of dead code" is not the claim anyone would read it as.

**`personal-note.md` — RULED (Peter, 2026-09-20; § 3.7): template-ize inside 123, landing in U3.** The shipped form becomes a **template scaffold that onboarding personalizes per-user on install**, not Peter's personal letter. Audit finding **A10 is dissolved** — there is no exclude-vs-confirm adjudication left to make — and the already-deferred "Personal Note template" item is **pulled forward from its second-customer trigger**.

This is a better answer than the draft's recommended exclusion, and worth naming why: the *content* does not transfer, but the *slot* does. An always-loaded doc where a human tells their agents how they want to be worked with is a real part of the collaboration architecture; deleting it would have shipped the mechanism's absence as if it were the mechanism's irrelevance. Two execution consequences: (i) the dangling résumé reference disappears with the personalization pass rather than needing its own fix; (ii) `sync` must **never overwrite** a personalized note (§ 4.4).

### 6.5 The owed U1b audience-ruling backward check

**Slotted in U4, at gate 4's settle.** The 125-B campaign closed without an explicit "who is the education layer for" ruling on record; prunability is audience-relative (a clause redundant internally can be load-bearing for a consumer). Once gate 4 settles, a **one-time review of the campaign's prunes against consumer-serving needs** is owed — scoped to `governance/` prunes only, with any finding routed to the owning domain agent, not fixed in 123.

---

## 7. The consumer generation profile (R3's guardrail + R5's contract, made concrete) — UNIT U2

### 7.1 What it is

A **generation profile** in the 122 pipeline that emits *consumption-scoped* agent charters from the same canonical sources, via the same `TargetAdapter` interface, diff-guarded by the same guard surface. One canonical source; two profiles (steward / consumer); zero hand-maintained consumer prompts. `product-template/agents/` (D-live-3) is **deleted and replaced by generator output** — it is the standing proof of what hand-maintenance costs.

**Scope, per R5: all eight agents ship** (§ 3.5). The profile's job is re-grounding, not selection — there is no agent-by-agent ship/don't-ship judgment to make, which removes the draft's Q4 entirely.

> **⚠ "One canonical source; two profiles" describes a machine that does not exist yet (Lina A1).** `grep -rni "profile" tools/agent-generator --include="*.ts"` → **zero hits**. `TargetAdapter.target` is the closed union `'kiro' | 'cc'`; `AdapterContext` has no profile field; `generateAll(repoRoot)` takes no profile; adapters hardcode their own output paths. **122's ratified additivity property is TARGET-additivity, not PROFILE-additivity** — Req 24 AC3 proved that adding a *target* needs no rearchitecture, and a profile is an **orthogonal second axis**. Threading it touches `AdapterContext`, `resolveForEmission`, every sweep, `guardedRoots`, `coverage-map`, and `generated.lock`: a pipeline change, which is the thing additivity promised a new target would *not* need.
>
> **The outline's lean on that proof as evidence the profile is cheap is withdrawn.** The inference was mine and Lina's measurement retires it. **Q9 is CLOSED — Peter ruled shape (ii), the profile dimension** (2026-09-20, on her costed read; § 10). Her measurement was decisive: *the target axis is keyed on OUTPUT LOCATION; a profile is a difference in CONTENT at the same location* — so (i) would not have avoided the pipeline change, only deferred it and paid duplication on top. **(ii) is also the substrate Fork (B)'s section-granular provenance lands on**: its checked-in `canonical/_consumer-output/<target>/` renderings are what the new spans get swept against.

**Three delivery paths converge into one generator output here** (Lina A6): `init`'s wholesale `.kiro/agents/` copy (D-live-2), the Integration Guide's taught `cp -r product-template/agents/` (D-live-3), and the stale fork itself. **Spec 101 recorded the two-path inconsistency verbatim five months ago and deferred it to "a follow-up spec." 123 is that follow-up**, and the outline says so because a deferred finding resurfacing in the directory named for consumers is the strongest available argument for U2 existing at all.

### 7.2 The re-grounding contract (R5) — subtraction is only half of it

**Superseded framing, recorded**: this section previously stated a pure **subtraction** contract — a list of things a consumer charter must not carry. Peter's R5 reframe (§ 3.5) replaces it, and the replacement is better in a way worth stating plainly: subtraction alone describes what is *removed* and leaves what remains undefined, which is how you get a hollowed-out charter that passes a checker and teaches nothing. **Re-grounding defines what remains.**

**The contract, in two halves — both mechanically checkable:**

**(1) RE-GROUND: the ROLE ships intact, re-pointed at the consumer's repo.** Consumer-Thurgood does spec formalization, test governance, and steering-doc health **for their repo — their Civitas, not ours**. Consumer-Ada governs *their* token system; consumer-Lina *their* components; consumer-Stacy *their* execution claims. The verbs, the boundaries, the counter-argument discipline, the domain expertise, the collaboration principles, and the MCP query fluency all survive, because none of them were ever about this repository.

**(2) SUBTRACT: only this repo's specifics.** Never the role — only the particulars that name authorities a consumer repo does not have:

- Repo-internal tooling invocations (`complete-task.sh`, `governance-check.sh`, the scripts catalog)
- Authority claims naming people or this repo's gates ("Peter merges on green", ballot ratification, the record-first protocol)
- **Our** stewardship cadences and instruments as obligations (the monthly Civitas health check *of this repo*, LIVENESS/owed-set, our claims-pass events) — note the re-grounded form survives: *a* health cadence over *their* corpus is exactly consumer-Thurgood's job
- `.kiro/specs/**` workflow as *law* — the spec method ships as a **template and a curriculum** (§ 5.6), never as an obligation with our authorities attached
- Routes to docs that do not ship or are not served in the consumer's install (composes directly with gate 4: **U4's content policy determines U2's valid route set** — see § 9's ordering note)

#### The check — REDESIGNED AT R1, and the author is RECUSED from certifying it

> **⚠ The draft's direction (ii) — "the role's verbs still present" — DOES NOT FALSIFY. Demonstrated by Stacy B1, and the demonstration stands.**
>
> **Mechanism**: subtraction operates paragraph-wise on repo-specifics, and in every canonical charter the repo-specifics concentrate in the **operational sections** while the role verbs live in **Identity / Domain Boundaries** headers — which carry no repo-specifics and therefore **survive any subtraction pass untouched**. Measured on `canonical/agents/thurgood.md`: verbs at `## Identity` / `### In Scope` (L247–288); repo-bound mass at `## Operational Mode: Civitas Steward` and below (L414–506).
>
> **Hollow-pass exemplar**: a consumer charter reduced to *"Identity: … In Scope: spec formalization, test governance, steering-doc health."* Every verb present, zero repo-specifics, **zero operational content** — no out-of-scope, no routing, no hand-offs, no commands. **It scores perfect in both directions and teaches nothing.** The false-pass rate approaches 1 on the population it is applied to; *its passing is anti-correlated with the risk.*
>
> **And the author-stake verdict, which I accept in full**: R5's *conclusion* survives scrutiny; what was self-serving-shaped was the **defense** — § 3.5 and § 7.2 both rested the answer on *"it is testable, via (ii)"*, and (ii) is the direction that cannot fail. ***An interested author offering an unfalsifiable falsifier as his own check is the finding; the ruling is not.***

> **AND v2 ALSO FAILED — Stacy's falsification pass, 2026-09-20. VERDICT: FAILS. Surviving attack: AUTHORIZED EMPTYING.**
>
> A charter can be hollowed to a shell **through the front door** — every emptying truthful, in-vocabulary, correctly accounted, applicability-verifiable — and **all four v2 clauses pass**. No gaming required: *the attack IS the check operating exactly as specified.* Measured on her own charter: **~104 lines, 10 live repo-hits, the entire operational instrument of her primary seat**, emptied with nothing false stated. What ships is a consumer-Stacy who retains the *vocabulary* of claims auditing and possesses **no instrument to compute what is owed** — she can say a CLOSEOUT pass is owed and cannot determine when.
>
> **Root diagnosis, accepted: all four clauses are "nothing bad is present" tests, and four negative clauses cannot establish a positive property.** v2 implemented **SUBTRACT** (i, iii), **SHAPE** (ii) and **ROUTES** (iv) — and **never implemented RE-GROUND.** A section titled *"subtraction is only half of it"* carried a check that was, mechanically, entirely the subtraction half.
>
> **Corroborating attack 4**: consumer-Leonardo with every tool route deleted passes (iv) **vacuously** — *every clause's trivially-passing configuration is "less of it."* **Attack 2** (heading-preserving gutting) also escaped, on one word: (iii) made *absence* of attribution a finding but not *wrong* attribution.

> **AND v3 ALSO FAILED — Stacy's second falsification pass, 2026-09-20. VERDICT: FAILS. Surviving attack: FALSE RE-POINTING.**
>
> Empty `### The owed-set pipeline` (46 lines, 10 deny-list hits); disposition **`re-pointed`**; destination **`### The trigger set`** — which survives, is 19 lines, is non-trivial, and even *mentions* the owed-set query. **(i) pass · (ii) in-vocabulary · (iii) applicability verifies TRUTHFULLY (10 hits) · (v) destination exists, non-trivial → pass.** Every clause passes, **nothing routes to a human**, and the function is not there. Worse than v2's: it runs down the `re-pointed` lane advertised as *fully mechanical*, needing **no signature and no human at all** — where v2's surviving attack at least ended at a routed review. And **the mechanism rewards hollowing**: every emptied section can name a survivor as its destination, and the more you empty the more the survivors serve as destinations for each other.
>
> **THE THROUGH-LINE OF ALL THREE FAILURES, and the sentence v4 is written against**: *v1 checked that **verbs were present**; v2 checked that **citations were present**; v3 checks that a **destination is present**. Presence of a token standing in for the property the token evidences.* **Span-exists is not function-lives-there.**
>
> **And the finding is SUBSTRATE, not drafting — this is what makes it a ruling rather than a redraft.** Measured: `tools/agent-generator/attribution.ts` emits `AttributionSpan = { lines, op, source }` over the *rendered* artifact, and **373 rendered lines of `stacy-prompt.md` are ONE span: `[3,375] passthrough → canonical/agents/stacy.md#body`.** `CLAUDE.md` carries one `resolve` span **per whole doc-id**, so the always-set inherits the same defect. And `checkAttributionTotality` **proves the spans tile the OUTPUT** — a charter gutted to 40 lines tiles perfectly with one passthrough span. **It is a coverage proof on the output and is structurally silent about input coverage**, which is exactly the property (v) exists to establish.
>
> **The pre-committed landing place FIRED — and Stacy narrowed it against her own interest and mine. Her wording is adopted over the author's:**
>
> > **The positive property requires section-granular provenance the generator does not emit.** Charter bodies render as a single `passthrough` span; the totality check proves output coverage and is structurally silent about input coverage. **Until that substrate changes, no wording of clause (v) can make `re-pointed` mechanically verifiable.**
>
> The author's pre-committed wording was *"a static check cannot carry this property."* **That over-claimed** — it was, in her phrase, *"the direction that happens to be most comfortable for both of us."* Hers is **falsifiable and buyable**; the author's was neither. **She also recorded a reversal against herself**: she began drafting a *"scoped v3.1, one span-relation away"* recommendation and **her own measurement falsified it.**
>
> **Credit, recorded because a FAILS verdict should not erase it** (her paragraph, carried): v3 **closed attack 2**, **closed attack 4 without a special case**, **killed attack 3's original path by deletion rather than amendment**, and **defined attack 5's unit.** *"Four named defects, four real fixes. The failure is in the one clause that had to be positive, and it fails on substrate rather than on drafting."*

### RULED — Peter, 2026-09-20: FORK (B), BUY SECTION-GRANULAR PROVENANCE IN U2

Stacy surfaced the fork and declined to pick it. Peter picked (B).

**U2 gains the provenance work**: the generator emits **section-granular attribution spans for charter bodies** and **per-heading spans for always-set members**, replacing the single `#body` passthrough.

**Why (B) priced as affordable rather than as scope-creep — it composes with three things U2 already owes:**

- **Lina A3's compile lane** — the generator is **not built at all today** (`rootDir: "./src"`), so its emission path is being touched regardless;
- **Lina A2's distinct consumer emission entry point** — which is where per-section spans are produced;
- **Q9(ii)'s checked-in, diff-guarded consumer renderings** (now RULED) — which is **what the spans are swept against**, in our repo, in CI.

Without Q9(ii) the provenance would exist only in a stranger's repo at `init` time and **there would be nothing to sweep.** **Q9's closure and Fork B's affordability are the same fact seen twice**; the two rulings compound rather than merely coexisting.

**Fork A (demote now) is NOT taken but remains the fallback the pre-commitment points at** — if the criterion below fails at pass four, the demotion fires *with the evidence already in hand*: the property moves to the behavioral instruments and the static clauses stand as what they demonstrably are, *"a cheap, deterministic filter that catches the crude failures — and it catches four of them, which is not nothing."*

#### PRE-STATED FALSIFICATION CRITERION — so pass four is a one-line verification, not a fourth design round

Stacy's condition on Fork B, honoured here in the outline where the U2 author will meet it rather than in a feedback entry:

> **A `re-pointed` disposition on canonical section S verifies IF AND ONLY IF both hold:**
>
> **(1) DERIVATION** — at least one span in the consumer rendering declares **S, or a sub-range of S, as its `source`**. Something in the shipped charter demonstrably *derives from* S.
> **(2) HONEST NAMING** — the destination named in the disposition is **among the spans satisfying (1)**.
>
> **Provenance is GENERATOR-EMITTED, never profile-declared.** The profile names the disposition; the generator supplies the evidence; the check compares them.
>
> **Zero spans sourcing S ⇒ FAILURE, not a routed review.**

**Why two parts, and why this is sharper than checking the named destination's source range alone**: **(1)** is the substantive test — it asks whether the function went *anywhere*, so a profile **cannot pass by naming a lucky adjacent section**, which is attack (a)'s entire move. **(2)** keeps the declaration honest — a profile that re-points truthfully but names the *wrong* destination is a finding, because a false label on a true fact still misdirects the next reader. A one-part form checking only the named destination leaves (1) unasserted and can be satisfied by coincidence.

**The failure disposition is FAILURE, not routed review**, because attack (a)'s sharpest property was that **it never reached a human at all.**

**Pass four, scoped in advance**: re-run attack (a) verbatim. Its destination span sources `### The trigger set`, not `### The owed-set pipeline`, so **(1) fails**. *If it passes, the landing place fires with the evidence already in hand.*

#### Sign-off status — stated flatly, because the temptation to overstate it is real

> **§ 7.2 IS NOT SIGNED OFF. v3 FAILED the second pass and Stacy gave NO conditional sign-off.** She explicitly anticipated **a fourth pass**.

**The sign-off MOVES rather than resolving, and that has a structural consequence that UNBLOCKS SETTLE**: the substrate is bought **in U2** — execution, *after* settle. So **§ 7.2's sign-off can no longer be an outline-settle precondition; it becomes a U2 ACCEPTANCE GATE.** That leaves **the reference-corpus probe as the only remaining settle precondition** (§ 10).

**The scheduling residual, carried in her words**: *this was the third design and the second falsification, and each pass costs round time that gate 5 and settle are waiting on.* The pre-stated criterion is the mechanism that stops pass four from being a fourth open-ended read.

### v3 — the clause set as it stands (v4 = v3 + the criterion above, once the substrate lands)

**The design consequence of the diagnosis, and it is why v3 is shaped differently**: adding a fifth *negative* clause is precisely the move the diagnosis predicts would fail again. **v3 adds the first clause that requires something to BE there**, and only one.

#### The vocabulary defect — closed by DELETION, not amendment

Stacy's sharpest finding: **`repo-bound-in-entirety` is, under R5, the paradigm case for RE-POINTING** — a section wholly about *this* repo is the clearest instance of something about *a* repo. **The term converted R5's central claim into its opposite exactly where R5 matters most.**

**It is deleted from the vocabulary** — and retained as a **named rejected term**, so the check emits a specific error rather than an unknown-token error:

> `repo-bound-in-entirety` is not a disposition. Under R5, a repo-bound section is the paradigm case for re-pointing. Choose `re-pointed`, `superseded-by`, or `no-consumer-counterpart`.

**The replacement vocabulary names a DESTINATION, not an origin.** That is the structural repair: every v2 term named where content *came from*; none named where it *went*.

| Term | Meaning | Verification |
|---|---|---|
| `re-pointed` | The function exists in consumption, re-keyed to the consumer's equivalents | **Mechanical** — the sidecar carries a **destination span**; the destination exists in rendered output and is non-trivial. *(The owed-set pipeline's honest disposition: the same predicate keyed to **their** ratification record and **their** completion path.)* |
| `superseded-by` | The function is provided by a different section of the consumer rendering | **Mechanical** — names a section that exists and is non-trivial |
| `no-consumer-counterpart` | The function has no analogue in a consumed design system | **NOT mechanical** — routed; see (v). The expensive path, by design |

**There is no term meaning "it was ours, so it is gone." That absence is the repair.**

#### The clauses

**(i) NO REPO-SPECIFICS PRESENT** — a deny-list sweep over rendered output.
- **Limit carried in the contract's own text (Stacy A9)**: *a zero-hit sweep is evidence about the **enumeration**, not about the charter.* Closed enumeration, open class — and the outline supplies its own proof in D-live-1's prose instance, where the pin was *taught in a sentence* after the config was fixed.

**(ii) STRUCTURAL RETENTION WITH DECLARED DISPOSITION.** The consumer rendering retains its canonical source's **section set**; the trigger is **emptied, reduced-to-triviality, or absent** (widened from v2's *emptied*, which is attack 2's other half).
- **Who declares:** the **standard** owns the **closed vocabulary** above; the **profile** invokes one term per section per agent as declared data; the check verifies the term is in-vocabulary and that an invocation exists wherever the trigger fires. Neither alone works — a standard enumerating per-agent shapes cannot stay current, and a freely-declaring profile is self-certifying.

**(iii) DELETION ACCOUNTING, WITH APPLICABILITY VERIFICATION** *(attack 2, adopted as Stacy specified)*. Every removed block cites the subtraction clause that authorized it — **and the citation must be shown to apply**: a removal citing subtraction bullets 1–4 must be shown to have **contained a deny-list hit** (reusing clause (i)'s enumeration); a removal citing bullet 5 must be shown to have **contained a non-resolving route** (reusing (iv)'s resolution). **Mis-attribution is now a finding, not only non-attribution.**
- **Failure direction, deliberately chosen** (her fold-back, carried): applicability verification *will* false-positive on paraphrase removals — and **that is the correct direction.** *A mis-flagged legitimate removal routes to a human; a mis-attributed illegitimate removal routes to nobody.* The false-positive population is exactly the paraphrase class a human most needs to see.
- **One qualification, recorded rather than inherited**: this reuses existing tooling but requires the check to read **the canonical source alongside the rendered output** — v2's clauses could all run against rendered output alone. A new *input* requirement, not a new checker. It lands on Q9: Lina's option (ii) already provides the checked-in diff-guarded consumer rendering beside its canonical source; option (i) would have to build it.

**(iv) TOOL ROUTES — and the vacuous pass is closed by UNIFICATION, not a special case** *(attack 4)*. Every **present** route and `autoApprove` entry resolves to a server present in the scaffolded MCP config and a tool that server registers *(unchanged)* — **and an ABSENT route (present in canonical, absent in the consumer rendering) is an emptied function that takes a (v) disposition like any other.**
- So **zero routes is never a clean pass**: it is either a **failure** (canonical had routes, no disposition) or a **declared state**.
- **This composes with Leonardo B1 rather than needing an exception**: once the product server is wired into the scaffolded config (§ 4.6), `re-pointed` becomes the *truthful and mechanically verifiable* disposition for consumer-Leonardo's 13 product tools — **the attack's own exemplar resolves correctly.**

**(v) RE-GROUNDING DISPOSITION — the only positive clause.** Every section carrying operational content in canonical that is emptied, reduced or absent in the consumer rendering **must show WHERE THE FUNCTION WENT**, via exactly one vocabulary term.
- **`re-pointed` / `superseded-by` → MECHANICAL ONLY ONCE U2 SHIPS SECTION-GRANULAR PROVENANCE.** *Destination-exists-and-is-non-trivial* is the test that **attack (a) defeated** — it is `span-exists`, not `function-lives-there`. **The verifying form is the pre-stated criterion above** (derivation + honest naming, against generator-emitted spans). **Until U2 delivers the substrate this half is NOT deterministic**, and § 7.4 (ii-a) says so rather than advertising otherwise (C4).
- **`no-consumer-counterpart` → routed, and the ROUTING is the mechanical part.** The check cannot adjudicate whether consumer-Stacy needs an owed-set computation; that is a domain judgment, and a check pretending otherwise would be the fourth version of the same mistake. Instead: **every claim is enumerated in the U2 completion doc and signed by the OWNING DOMAIN AGENT, not the profile author.**
  - **C1 — SELF-SIGNING CARVE-OUT (Stacy attack (d)), as a general rule because the defect is structural and will recur:**
    > **The signer is the owning domain agent — EXCEPT where that is the profile author, in which case it is the counterpart verification seat; and if both roles collapse onto one agent, it escalates to Peter.**
    **Concretely: consumer-Thurgood's rows are signed by STACY.** She is the counterpart seat under the Q5 cut, and **signing a row is a verification act — her charter — not an authoring act**, so it does not breach her mirror clause. The reciprocal holds for consumer-Stacy's rows (author Thurgood, owner Stacy — already separated by the default rule, which is why only *his* charter needed the carve-out). *Ada A7's remedy was applied to the **check** and not to the **signature**; same defect, one surface missed.*
  - **C2 — RATE DETECTOR + ASYMMETRY REPAIR (Stacy attack (b)).** *"The cheap path costs a domain owner's name"* is true, but **the cost asymmetry runs the wrong way: assent is free, refusal is expensive** — refusing obliges the signer to say what the re-pointed form should be, which is U2 authoring they do not own. A signer facing 30 rows of which 28 are genuinely true **approves the batch, and the one that matters rides in.** This is **observed in this repo, not hypothesized** — her claims-pass counting block already watches declared-none and `adaptations: none` rates as ritual-stub signals.
    - **The detector is HERS, in her seat, with no new instrument**: `no-consumer-counterpart` rates per agent per release, in the existing counting block.
    - **The asymmetry repair removes the expensive side rather than adding cost to the cheap one** — adding ceremony to 28 true rows is how the batch gets rubber-stamped. **Refusal becomes a one-flag return** (*"this should re-point"*) routed **back to the profile author**, who owns the authoring the signer does not. And **the signature is per-row, not per-batch** — batch approval was the named failure mode. Per-row assent plus one-flag refusal makes the two costs comparable without inflating either.
- **C3 — "TRIVIAL" GETS AN OWNER (Stacy attack (c)).** *Reduced-to-triviality* (ii) and *non-trivial* (v) are each load-bearing and neither was defined. **Owner: the STANDARD side — this author, as the vocabulary's owner**, under the Q5 boundary. Two riders answering her Goodhart flag: the definition must be **falsifiable by example, with the exemplars supplied by her**, not by the author who wrote the threshold; and **under Fork B it is load-bearing again on the mechanical lane, so it must be settled BEFORE pass four, not after** — an undefined "non-trivial" would let pass four inherit the hole it exists to close.
- **One hard mechanical floor, non-arbitrary because it is derived from the ruling rather than chosen**: a consumer charter in which **every** operational-mode section is disposed `no-consumer-counterpart` **FAILS by construction** — R5 ruled the role ships intact, so a charter with zero retained operational content contradicts the ruling it implements. Zero-vs-nonzero needs no threshold. **Between that floor and full retention the check routes to review rather than guessing** — which is stated plainly rather than papered over with an invented percentage.

**Lexical verb-presence survives only as a smoke test, never as a criterion.**

**A NAMED LIMITATION OF THE CHECK'S SHAPE, recorded rather than silently inherited (Stacy attack (e), advisory).** Every trigger is about what **canonical HAD** — emptied, reduced, absent. **Nothing constrains what the rendering GAINED**: profile-added text with no canonical source and no repo-specifics passes every clause. Nor does anything catch a **semantic inversion inside a fully retained section** (*"Stacy **owns** execution-claims verification"* → *"**advises on**"*) — not emptied, not reduced, not absent, no removal to account for, no disposition triggered. Both are *largely* covered by generator diff-guard on a reviewed profile, which is why they are advisory. **But "largely covered by review" is the sentence that precedes the next finding, so it is written here: the check is subtraction-shaped even now.**

**Where the sweep runs** (Ada A6): **per-agent, against rendered output — never against the catalog.** Her measurement cuts both ways: `complete-task.sh` occurs in exactly **one** canonical input (`canonical/shared/shared-catalog.yaml`), not in the eight per-agent files. **Upside** — the consumer profile is mostly one shared-member profile plus per-agent write-scope rewrites, so U2 shrinks. **Downside** — it is a single point of failure: **one bad shared entry mis-grounds all eight agents at once.**

#### The contract extends to the ALWAYS-SET as a class (Lina B5) — with an application unit, now DEFINED (Stacy attack 5)

*"Extends to the always-set" was an assertion without an application unit*: the always-set is not per-agent, and clause (ii) keys on *"its canonical source's section set."* Defined:

- **Prose members** (`Task-Completion-Protocol.md`, `start-up-tasks.md`, `core-goals.md`, …): the retention unit is **the document's own top-level heading set**, recorded in its `canonical/shared/always-set.yaml` member entry. Clause (ii) keys on that set; clause (v) applies per heading. `Task-Completion-Protocol` re-grounds under R5's own logic — *a* completion protocol for *their* repo — so its headings are **retained and dispositioned, not deleted**.
- **Template members** (`personal-note.md`, per § 3.7): the unit is **the template's declared slot set** — a personalized note has no canonical prose to retain.
- **Awaiting Lina's confirmation**, since she scoped the class in and this should not be settled over her.
#### Recusal, and what the round still owes

**The "collapse case" dissolves** — the draft's worry that a charter might reduce to near-nothing was a framing artifact; the charter is about stewarding *a* repo. The *defense* of that rests on v3's clause (v) **plus** the behavioral probe folded into the trio runs (§ 7.4) — **not** on any clause the author can certify.

> **§ 7.2 IS NOT SIGNED OFF, AND THE SIGN-OFF HAS MOVED — it is now a U2 ACCEPTANCE GATE, not an outline-settle precondition.** v1 failed pass one; v3 failed pass two. Under Peter's Fork (B) ruling the substrate is bought in U2, so **pass four happens when U2 delivers section-granular provenance** — verified against the **pre-stated criterion above**, by re-running attack (a) verbatim. The author remains recused throughout. Ada A7's instance holds: **run the check on Thurgood's rendered consumer output as a named acceptance item** — *"a non-collapsing agent reporting no collapse is near-worthless as testimony."*
>
> **The pre-commitment already fired once and it worked — that is worth recording as a result.** The landing place was written to make a failure *sayable*. It became sayable, Stacy fired it, and she then **narrowed the author's wording against both parties' comfort** — replacing an unfalsifiable *"a static check cannot carry this property"* with a falsifiable substrate condition that Peter could, and did, **buy**. A pre-commitment that survives contact by being *corrected* is a better outcome than one that is honoured as written.
>
> **It remains armed for pass four**: if the pre-stated criterion fails, Fork A fires **with the evidence already in hand** — the property moves to the behavioral instruments and the static clauses stand as what they are.

### 7.3 Delivery form — generate-at-init vs ship-pre-generated

Recommended: **generate at `init --target`**, which requires shipping `canonical/` + the compiled generator + the consumer profile in `files[]`.

- Preserves 122's additivity property (a new target = a new adapter, no pipeline change) *in the consumer's hands*, which is what makes Cursor-or-whatever-comes-next cheap later.
- Avoids shipping N pre-generated artifact sets for M agents (and the guard surface to keep them all fresh).
- Makes `sync` coherent: regeneration is the refresh mechanism, so the 121 Req 4 staleness class closes structurally rather than by copy-diffing.

**Counter (real, and it is the packaging-diet tension)**: shipping `canonical/` + the generator adds weight to a package we are simultaneously putting on a diet, and it exposes internal authoring substrate to consumers. Pre-generating is lighter and more opaque. The counter partially folds back — the diet's savings exceed the generator's cost by an order of magnitude — but **the "exposes internal substrate" half survives** → Q5.

**Two costs R1 found that this section treated as free:**

- **"Ship the compiled generator" is net-new build work that does not exist** (Lina A3). Root `tsconfig.json` is `include: ["src/**/*"]`, `rootDir: "./src"` — **`tools/agent-generator/**` is not compiled by `npm run build` and is not in `files[]`**, and its only invocation today is `npx tsx`. A tsx-invoked generator **violates § 4.1's no-TS-runtime guarantee**. So U2 owes: a compile lane (esbuild alongside `build:mcp` is the obvious precedent), a bin subcommand, and `files[]` entries for the bundle plus `canonical/` or its filtered derivative. *(One thing that is not a problem: `js-yaml` is already a runtime dependency.)*
- **`generateAll(repoRoot)` cannot simply be re-pointed** (Lina A2). One `repoRoot` serves three different jobs — canonical **inputs**, doc-id→path **resolution** (`.kiro/steering/**` + `governance/**`), and **output** paths — and consumer generation needs package-root for the first and consumer-root for the third. § 4.1's "dual path-context" row is about `resolvePackageRoot` for MCP and does not cover the generator. Worse, `generateAll` also emits `canonical/registry/*`, `canonical/manifests/*`, `coverage-map.yaml`, `coverage-manifest.yaml`, `demotion-delta.json`, and a `_fixture-output/` tree — **none of which belongs in a stranger's repo.** U2 owes a **distinct consumer emission entry point** that emits only agent artifacts + the always-layer.

**On Q5, the round split and it reframed the question** (§ 10 Q5): Lina — *filtered, but **derived at pack time** by the same pipeline with the filter itself diff-guarded; never a second hand-maintained tree, because that is D-live-3 with better intentions*; and her mechanical argument is the strongest one offered — **the attribution sidecars are a literal index from re-grounded output back to steward source** (`<path>.attribution.json`, per-span provenance), so shipping whole `canonical/` beside them gives a consumer agent *a map* to the un-subtracted source rather than a chance to stumble on it. Ada — filtered, and A6's measurement makes it cheap (mostly one file rendered twice). Stacy — mild support for filtered, on the ground that un-filtered canonical puts **two charters for the same agent** in the consumer's repo with nothing marking which is binding. **Leonardo argues the other way and reframes it**: if the reference-corpus mode is real, `canonical/` is the **highest-density transferable-intent artifact in the package**, and filtering ships that mode a redacted version of its best asset — *but a consumer's agent does not only read what we serve, it greps*, so **this is a placement question masquerading as a filtering question: ship whole if it can sit outside the agent-discoverable path (or be MCP-served rather than file-copied); filter if it must live where their agent greps.** That reframe is recorded as the fork; the pick is Peter's.

### 7.4 Acceptance for U2

Rewritten at R1. **Stacy A6 named (iii) as the strongest criterion in the outline** — *"route only to docs that exist in the consumer's install"* is deterministic, resolvable against the shipped set, and fails loudly — **and it is now the model the others are written to.**

A consumer repo, after `init --target=<tool>`, has agent artifacts for **all eight agents** that:

> **The (ii) row is now THREE rows, and that is a truthfulness repair, not a formatting one** (Stacy R2's third directed question). The previous single row advertised the contract's guarantee as *"deterministic, CI-able."* Her falsification showed the deterministic clauses **do not reach authorized emptying**, and that what actually catches it today is *"a non-deterministic per-release sampling instrument."* Her sentence, carried: **the contract is not currently unguarded — it is guarded non-deterministically, per-release, by a sampling instrument.** That difference belongs in the acceptance table, not in a feedback entry.

| # | Criterion | Observable |
|---|---|---|
| **(i)** | The agent **answers a charter-identity probe** in a *fresh* session in the consumer repo — its domain, one routed tool it owns, one thing outside its scope | *Was:* "load in that tool" — **a file-existence check wearing a behavior check's clothes** (Leonardo A5). Files in `.kiro/agents/` prove nothing about a Claude Code consumer, where delivery is the generated `CLAUDE.md` import set |
| **(ii-a)** | **Deterministic clauses** — (i) no repo-specifics · (ii) structural retention with declared disposition · (iii) accounting **with applicability verification** · (iv) present routes resolve · the all-`no-consumer-counterpart` floor. Run **per-agent against rendered output**, and **on Thurgood's output as a named item** (Ada A7). **(v)'s mechanical half is NOT in this row** — see (ii-d) | **Deterministic, CI-able — honest scope.** Catches: the hollow charter, silent wholesale removal, heading-preserving gutting, mis-attribution, vacuous zero-route passes, total hollowing. **Four of Stacy's five attacks; the fifth is (ii-d)** |
| **(ii-d)** | **(v)'s mechanical half — `re-pointed`/`superseded-by` verification. NOT DETERMINISTIC TODAY; returns when U2 ships section-granular provenance** (Peter's Fork (B) ruling), verified against § 7.2's **pre-stated criterion** | **C4, bound.** *Destination-exists* was falsified by attack (a) — *span-exists is not function-lives-there*. Listing it as deterministic is the one thing this table was inaccurate about, and the row now says when it returns rather than quietly claiming it already works |
| **(ii-b)** | **Routed clause** — every `no-consumer-counterpart` claim enumerated in the U2 completion doc and **signed by the owning domain agent** | Not mechanical. **Mechanically enforced routing of a judgment the check cannot make** |
| **(ii-c)** | **Behavioral backstop** — the direction-(ii) probe riding the trio runs (§ 5.5) + U5's scratch-consumer execution (vi) | **NON-deterministic, per-release, sampling.** Catches what no static clause reaches: a charter that is *truthfully and legitimately* hollowed, **and — until U2 ships the substrate — a falsely `re-pointed` one.** *"The contract is not unguarded; it is guarded non-deterministically, per-release, by a sampling instrument"* is the operative posture for (ii-b) and (ii-d), not an interim note |
| **(iii)** | Routes only to docs that exist in the consumer's install | Unchanged — the model criterion |
| **(iii-b)** | **Every PRESENT tool route and `autoApprove` entry resolves** to a server in the scaffolded MCP config and a tool it registers (Leonardo B2) — **and every ABSENT route carries a (v) disposition** (Stacy attack 4) | Both sides are declared data. **Zero routes is never a clean pass** |
| **(iv)** | Regenerable by `sync` after `npm update` | **Needs a named fixture** (Stacy A6) — and note `sync` needs three-way semantics, not diff-guard's (§ 4.4, Lina A4) |
| **(v)** | Certified through the **packed-install consumer guard**, never an in-repo load | Subject to § 4.1's arbiter qualification — the guard must first be extended |
| **(vi)** | **Both starter specs exist and satisfy the re-grounding contract** — authored in U3 (§ 5.6) | **REWRITTEN.** *Was:* "include Thurgood's re-grounding spec, whose execution in a consumer repo is the contract's end-to-end conformance test" |

> **Why (vi) changed — Stacy B2, blocking.** The old criterion verified **presence** (a file existing in *our* repo) while claiming **conformance evidence** from *"execution in a consumer repo"* — an event happening post-ship, in a repo we never see, **owned by no unit of this spec**. That is promised-vs-shipped: the artifact ships, the claimed verification does not. Compounding it, § 11 already conceded the deliverable *"only reaches us if a consumer chooses to send it."* **It cannot be both unowned and load-bearing.**
>
> **Resolved by giving it an owner, not by dropping it** — dropping would leave direction (ii) resting entirely on a static check right after conceding the textual direction was unfalsifiable. So: **U5 executes the re-grounding spec against a scratch consumer install** (packed install, no repo access, preconditions recorded per Stacy A5), and the conformance criterion cites **that run**.
>
> **And the behavioral check rides the trio (Stacy A2)**: a hollow charter **fails behaviorally and passes textually**, so the behavioral probe is the discriminator the lexical check was not. **Two instruments, different jobs** — the structural check is the deterministic CI gate; the behavioral probe is the per-release findings instrument. This is also why the trio becomes the *last* thing cut (§ 9.2).

---

## 8. The reference-corpus secondary mode and its cheap validation probe

**The mode** (R1): a foreign design system's agents install `@3fn/core`, connect the docs MCP, and extract intent and worked execution — token governance reasoning, contract thinking, completion-evidence discipline — **without adopting DesignerPunk's artifacts**.

**The probe (proposed as an early task, and as an AC candidate)**: **one recorded transcript.** A fresh agent session with no DesignerPunk context, working in a *different* design system's repo, given the installed package and the docs MCP, asked to do a gap-fill task (e.g. "how should component token authoring be structured here, and why?" / "what would a behavioral contract for our button look like?"). Record: what it found, what it mis-took as binding on itself (the imposter test at reference grain), and where discovery failed.

**Why a probe and not a requirement**: the mode is *one observed behavior*, not proven demand. A probe costs an afternoon and produces evidence; a requirement costs a unit and produces a commitment.

> **⚠ PLACEMENT CHANGED — the probe now runs BEFORE OUTLINE SETTLE. Stacy B5, blocking, and she is right that it was a contradiction with execution teeth.**
>
> The draft asserted three incompatible things: § 6.2 made the (a) recommendation *"explicitly contingent on § 8's probe"*; § 9.1 and § 10 Q2 said gate 4 *"should settle at outline settle"* so U2 can execute; § 8 placed the probe *"before U4 executes"* and landed it in **U5**. **These cannot all hold** — and it is not cosmetic, because the probe's outcome selects between (a) and (b)/(c), *and that selection is exactly what determines the unit ordering* (Stacy B4).
>
> **Resolution: run it before settle.** It needs nothing 123 builds — `14.1.0` is published — so there was never a reason it waited. This is now a **settle precondition** (§ 10), and it **dissolves B4** as well: with the probe's evidence in hand, gate 4 settles on evidence rather than a guess, and the ordering condition resolves rather than hanging.
>
> **It uses Leonardo's A9 no-init path** (§ 5.3): `npm install`, wire the docs MCP at `node_modules/@3fn/core/governance`, do not run `init`. Otherwise the probe measures a mode nobody can enter cleanly — the only documented entry today begins by copying ~100 files of our governance into a foreign design system's repo.

> **PROBE STATUS 2026-09-20: PARTIAL — setup half PASSED, consumption half BLOCKED. Gate 4 remains probe-gated.**
>
> **Setup half PASSED, and the facts are worth having on their own**: published `14.1.0` installs clean · **the no-init path works exactly as Leonardo A9 specified** · the **docs MCP booted package-relatively with ZERO env wiring** · it **served an 8-tool schema**. That is direct evidence the reference mode is **enterable** — which is precisely what A9 was about, and it was not previously demonstrated.
>
> **Consumption half BLOCKED** on headless CLI auth; Peter's re-login pending. So nothing is yet known about whether a foreign agent can **extract intent** from the corpus — **which is the half gate 4's (a) recommendation is contingent on.** Recording the split explicitly rather than reporting "probe in progress," because the passed half answers a *different* question from the one gate 4 asks, and a summary status would blur them.

**Acceptance for the probe** is a recorded transcript and a named finding list — explicitly **not** a pass/fail bar, because we have no baseline and inventing one would be theater. **With two properties added at R1 (Stacy A7),** because *"a named finding list" is satisfiable by a list of zero and an empty list reads identical to a diligent one*: the **forced negative** (*findings: none* written, never implied — the 127 convention applied here) and a **per-probe-question discovery-succeeded/failed record**, so the transcript can be **audited rather than merely possessed**.

---

## 9. Proposed unit structure (gate 5) and the reduce-not-grow cut-line

Per Task-Completion-Protocol § "Coherent Units": large specs **declare** their merge units in `tasks.md`, named up front and reviewed in the tasks round, never judged at merge time.

### 9.1 Proposed declared merge units

| Unit | Content | Why it is coherent on its own |
|---|---|---|
| **U1 — Distribution substrate & packaging truth** | **Sequenced internally: decide the authoring API → extend the guard → diet.** Theme-authoring export surface + `generateConfig()` re-point (Ada B1) · **union-with-precedence** in `resolveConsumerOwnedRoot` (Lina B2, Leonardo A14) · **guard extension**: packed-install package-mode case (Ada B2), `get_component_catalog count >= 34` with an empty consumer dir + a consumer-component-alongside case (Lina B3), C′ fixture re-authored from nothing (Ada A4) · `files[]` rescope + diet **to the named floor** incl. the **pinned component-YAML floor** (Lina B1) · **`sync` registry-pin detection** + the **registered publish-rail guard** (Stacy B7) · **`autoApprove` generated from tool registrations** (D-live-6) · **third MCP server entry + `PRODUCT_DIR` + the deliberate `init.test.ts` guard update** (Leonardo B1 i–ii) · harvest-zero lint rider (Lina, Q8) · `sync` three-way baseline (Lina A4). **REMOVED: raw-`.ts` export reconciliation — Ada A1 shows it already shipped and is already guarded** | Ships a correct package; nothing downstream can be trusted until the package's contents are true — and until the arbiter can see them |
| **U2 — Consumer generation profile** | The profile work for **all eight agents** — **Q9 CLOSED: shape (ii), the profile dimension** (Peter, 2026-09-20; Lina's costed read) · **SECTION-GRANULAR ATTRIBUTION PROVENANCE** for charter bodies and per-heading for always-set members (**Peter's Fork (B) ruling** — the substrate § 7.2's clause (v) needs; composes with the compile lane, the emission entry point, and the checked-in `canonical/_consumer-output/<target>/` renderings that are what it gets swept against) · **the § 7.2 v3 re-grounding contract (five clauses incl. the positive disposition clause) + its per-agent-against-rendered-output sweep**, plus the `no-consumer-counterpart` **domain-owner signature** enumeration in the completion doc · **re-grounding the nine always-set identity docs** (Lina B5 — generator work, so it lands here, not U4) · **declared degradation** on missing docs in the consumer profile (Lina B4) · distinct consumer emission entry point (Lina A2) · generator compile lane + bin subcommand + `files[]` (Lina A3) · delete `product-template/agents/` **with its enumerated reference sweep** (D-live-3 / Lina A5) · consumer CC always-layer delivery. **REMOVED: authoring the starter specs — moved to U3** | R3's guardrail plus R5's contract, whole |
| **U3 — Onboarding: install doc, starter specs, personalization** | Install doc (reference-corpus section + **no-init path** + **clone-hatch paragraph** + **session-restart line**, under 119-B constraints) · **BOTH starter specs as one atomic deliverable, with the P3 tier list and P2 bite recipes** (Stacy B3, Leonardo A13) · P4 **two-sided** pricing · **`personal-note.md` template-ization + per-user personalization** · **`product/` tree scaffold with a worked example screen** (Leonardo B1 iii) · `init --target` UX + terminal-output fixes | The experience spine, with the curriculum now whole inside it |
| **U4 — Content policy execution** | Gate 4's **served-surface** outcome: banner convention **+ its guard** (Stacy A3), scoped to the measured 18 (Ada A5) · **stop-copying on the copy surface** (Leonardo B3) · release-notes disposition (if kept) · the owed U1b backward check. *(Always-set re-grounding → U2; `personal-note.md` → U3; Product MCP → U1/U3/U5 — three items left this unit at R1, and it is materially smaller for it)* | One policy, applied once, to one surface |
| **U5 — Validation & closeout** | **Persona-trio cold runs** (blocking bar, R4 + § 5.5 refinements; ≥2 harnesses; preconditions recorded) **carrying the behavioral direction-(ii) probe** (Stacy A2) · **scratch-consumer execution of the re-grounding spec** (Stacy B2) · **a consumer Leonardo answering a real product-MCP query** (Leonardo B1 iv) · Peter's non-blocking mechanics run · tarball assertion **against U1's declared target** (Stacy A4) · closeout + claims pass | The acceptance evidence, in one place — and it now has instruments, not just artifacts |

*(The reference-corpus probe has LEFT U5 — it is a settle precondition now, § 8.)*

#### Ordering — ADJUDICATED at R2 (the round contested it; here is the reasoning and the cost)

**ORDER: U1 → U2 → U3 → U4 → U5**, with one recorded conditional that currently evaluates **false**.

**The condition, in Stacy B4's corrected form** (the draft's was wrong — it fired on *whether* gate 4 settles, and omitted U3, which carries the identical dependency):

> **U4 precedes U2 *and* U3 iff gate 4 settles on an option that PRUNES the served corpus.**

**Why it currently evaluates false, step by step:**

1. **Stacy's rule is the right rule** — only a *pruning* outcome changes the doc set generation resolves against.
2. **Leonardo B3 changed what gate 4 does.** Split into two surfaces, the served-corpus decision converges on **(a) banner, which prunes nothing** — Ada A5 scopes it to 18 docs, Lina A7 forbids partial prunes (zero backstop aliases), Leonardo A10 and the reference mode both argue against deletion. The copy-side decision (*stop copying*) changes `init`'s behavior, not the served corpus. **Nothing disappears from the set generation reads, so Lina's throw condition does not fire systemically.**
3. **Lina B5's always-set re-grounding is generator work, so it lands in U2** — which *removes* one of the two U2↔U4 couplings rather than deepening it.
4. **Lina A5's reverse coupling is resolved by ownership**: U2's deletion of the stale fork owns the enumerated sweep of the three `governance/` docs it breaks. *A deletion that breaks references owns the repair* — that is not an ordering problem.
5. **Lina B4's substantive finding survives independently and is adopted** (below).

**The honest cost**: if gate 4 settles on any pruning outcome, the condition fires and U4 moves ahead of **both** U2 and U3. **Lina's preferred order (U1+U4 → U2 → U3 → U5) was defeated by B3's re-shaping of gate 4, not by disagreement with her mechanism** — and if the round disputes the no-pruning convergence, her order is the correct one.

#### Missing-doc handling: a decided design point, not a catch block (Lina B4)

`tools/agent-generator/adapters/cc.ts` L444–448 **throws** on a missing always-set member, and the per-agent ambient lane throws on an absent embed — deliberately, and correctly in our repo, where a missing doc **is** a generator bug. **Fatal in a consumer's**: `npx designerpunk init --target=cc` would crash on a stranger's machine at minute one.

**Decided here rather than discovered in U2: the steward profile keeps the throw; the CONSUMER profile degrades with a named warning** — emit the charter minus the unresolvable member, warn, exit zero. *Throw where the corpus is ours and controlled; degrade where it is theirs and mutable.* Adopted **regardless of ordering**, because no ordering rule protects against a stranger deleting a doc.

**The starter-spec seam is gone, not guarded** (§ 5.6). **Lina's unnamed third seam survives and is real**: Thurgood's re-grounding spec is authored in U3, satisfies a contract defined in U2, and is *executed* in U5 — **it crosses three units**, so all three carry criteria for it (U2: the contract · U3: the artifact · U5: the run).

**A trio-run note for U5**: the persona trio is a **standing regression instrument re-run per release**, not a one-time gate. U5 executes the first run; the *recurring* obligation outlives 123 and needs a home in the release recipe. Flagged rather than assigned here — it is a governance placement question, and placing it in `governance/release-management-system.md` would be a ballot-measure change, not a 123 edit.

### 9.2 The reduce-not-grow cut-line — REBUILT at R1

C1 is the recorded tension. Movement so far:

| Movement | Effect |
|---|---|
| R6 starter specs (two) | **+** U3 (both, after the R1 relocation) |
| R4 persona trio | **+** U5 |
| R7 clone hatch replaces a built `eject` | **−** U1 |
| PR #192 repairs D-live-1 | **−** U1 |
| Ada A1 — raw-`.ts` reconciliation already shipped | **−** U1 (a dead item removed) |
| **R1 findings: Ada B1/B2, Lina B1/B2/B3, Leonardo B1, D-live-6, the guard extensions** | **+ + +** U1 — **U1 is re-scoped, not trimmed** |
| Lina B5 always-set re-grounding | **+** U2 |
| Leonardo B3 stop-copying + Ada A5's scoping | **−** U4, materially |

**Net: the spec grew at R1, concentrated in U1.** Saying that plainly, because the previous version of this section reported near-neutrality and that is no longer true.

> **⚠ THE LADDER WAS PADDED. Stacy A1, and it is the most consequential distortion in the gate-5 material.** Four of the seven rungs *free nothing* — every one is **already out of scope by the outline's own text**: the benchmark harness is a **§ 12 non-goal**; the Cursor adapter is already *"below the cut-line"* at § 4.6; the MCP infra-ring is already *"below the cut-line"* at § 4.7; release-notes shipping is already *"below the cut-line if Peter invokes reduce-not-grow"* at § 6.3. **Listing them made the real cuts look four steps further away than they are.**

**ALREADY OUT OF SCOPE — not cuts, and not available to cut again**: benchmark harness (§ 12) · Cursor adapter (§ 4.6) · MCP infra-ring consolidation (§ 4.7, with `FileWatcher` carved out to a named issue) · release-notes shipping (§ 6.3).

**THE REAL LADDER — three rungs, and every one costs capability:**

1. **U4 collapses to banner-only — but ONLY in the corrected form** (Stacy A3 + Lina A8): *"banner for `governance/**` **plus its guard**, **plus re-grounding for the nine always-set docs**; drop the served/not-served split work."* **Banner-without-guard is a named NON-OPTION** — P2 applied inward forbids shipping a convention without its arming proof, and an unguarded convention is the DORMANT failure mode in prose form. **And the always-set clause moves to the hard floor**, because banner-only leaves the nine docs exporting repo-internal law as unconditional context (Lina B5) — i.e. the draft's rung 5 was not a trim, it was B5's hole with a name.
2. **Starter specs reduce from two to one** — keep the **CI-needs spec** (P2's vehicle, non-negotiable content); defer **Thurgood's re-grounding spec**. *(Promoted above the trio: see the swap below.)*
   - **THE RESIDUAL, NAMED — because after the A2 fold this rung is no longer a test-loss and will otherwise be mis-read as nothing** (Leonardo R2, the condition on which he accepted the decline): cutting it loses **(a) the only instrument EXECUTED BY THE CONSUMER rather than by us**, and **(b) half of R6's launch pair — and with it the demonstration that the spec method is inheritable, which is § 5.6's entire thesis.** *"Smaller than the trio's loss, which is all the ordering claims; not zero, which is how an unnamed residual reads two months later."*
3. **The persona trio reduces from three runs to one** — and **if reduced, keep (a) or (b), NEVER (c)** (Leonardo A4): a no-floor run *"fails at everything and attributes nothing"*, while a run with a floor still localizes its failure. This loses the **triage** property R4 was designed for and is a genuine capability loss.

**The 2↔3 swap, and why** (Stacy A2, conditional on the § 7.2 redesign landing — it has): the trio is *"the spec's only consumer-facing evidence instrument,"* and with the behavioral direction-(ii) check folded into the trio runs (§ 7.4) it now carries **two jobs**. The re-grounding starter spec destroys less evidence when cut, because § 11 already concedes its deliverable *"only reaches us if a consumer chooses to send it."* **So the trio is the last thing cut.**

**Hard floor — cannot be cut without breaking a ruling or a non-negotiable:**
- **U1** — and it is now the largest unit, not the most trimmable: an uncertified arbiter (§ 4.1), a catalog that empties on the consumer's first component (Lina B2), and no theme-authoring path (Ada B1) each independently fail the acceptance bar
- **U2** — R3's guardrail + R5's contract; repairs D-live-2 and D-live-3, both live and both formally routed here
- **U3's install doc with P2 gate-bite recipes**, **the `personal-note.md` personalization** (ruled), and **at least one starter spec**
- **U4's re-grounding of the nine always-set docs** (promoted from rung 1 per Lina A8)
- **U5's persona-trio run** in whatever reduced form survives
- **The reference-corpus probe** — which is no longer even in the spec to cut: it is a **settle precondition** (§ 8)

**Candid note, revised**: with a three-rung ladder where every rung costs capability, *there is no third option that saves meaningful scope without losing capability* (Stacy's framing). **The honest choice is: accept a five-unit spec, or split and defer validation.** That pick is Peter's — and § 9.3 records that all four reviewers argued against splitting.

### 9.3 Gate 5 — the round's verdict (Peter rules at settle)

**Peter held no prior** (third sitting). The round weighed it fresh, and it converged.

#### CONVERGENCE: all four reviewers argue DO NOT SPLIT

| Reviewer | Position | Core reason |
|---|---|---|
| **Stacy** | One spec, five units | *"The split at U3+U4 is **not a scope reduction; it is a validation deferral**."* U5's trio runs the *onboarding experience*, which is U3 — a split leaves U5 with nothing to run and forces 123 to close with a correct package, eight re-grounded charters, and **zero evidence any of it works for a stranger**. *"Cutting the spec at the seam between building and proving is the reported-done-not-verified shape at spec grain."* |
| **Lina** | One spec | B5 adds scope that has to land somewhere, and splitting adds a formalization cycle to a spec whose whole thesis is *get a stranger to success*. |
| **Ada** | One spec | The install doc **teaches token authoring against the API U1 defines** — putting U3 in 123-B ships the API in one spec and its only documentation in another, with a formalization cycle in between for them to drift. |
| **Leonardo** | One spec | *"A '123 = U1+U2+U5' split asks the trio to cold-run an install doc that has not been written."* |

**THE OUTLINE'S OWN PROPOSED SPLIT LINE (U3+U4) IS WITHDRAWN.** Three reviewers independently showed it strands U5's acceptance instrument. I accept that; the line was mine and it was wrong.

**Fallback lines, if Peter splits anyway** (preserved because they disagree, and the disagreement is informative): **Lina** — `123 = U1+U4` ("the package and the corpus are true") | `123-B = U2+U3+U5`; she notes this version still *substantially mitigates D-live-2* without the generator profile, since U1 stops the wholesale copies and U4 re-grounds the always-set. **Leonardo** — cut **U4 alone** as 123-B, since content-policy *execution* is the only genuinely separable half once its decision settles, and B3 shrinks it further. **Stacy** — no split now; instead declare it as a **tripwire with a firing rule** so it becomes right *later, on evidence* (§ 11), and answer the time-to-first-value motive by **releasing between units** rather than splitting: *the release is the value unit, the spec is the planning unit, and conflating them is what makes the split look necessary.*

#### Still Peter's, at settle

Ordering is adjudicated (§ 9.1) with its condition and its cost recorded. What remains: **accept the five-unit spec, or split and defer validation** — and if split, which line. Stacy's framing of the choice is the one I would put to him, because it is the honest binary and she declined to absorb it: *there is no third option that saves meaningful scope without losing capability.*

---

## 10. Open decision points — after R3

> **FOUR ITEMS REMAIN FOR PETER AT SETTLE: gate 4 (two decisions, probe-gated) · gate 5 · Q5 · Q6's conditions.**
>
> **Ruled**: Q1 (R8) · Q3 (R4) · Q4's ruling (R5) with its check now under Fork (B) · Q7 (R9) · Q8 (Lina) · **Q9 (Peter, shape (ii))** · **the § 7.2 fork (Peter, (B))**. All are retained below with their rulings — *a question that vanishes silently invites its own re-asking.*
>
> **ONE SETTLE PRECONDITION**, down from two: **the reference-corpus probe** (PARTIAL — setup half passed, consumption half blocked on headless CLI auth). **§ 7.2's sign-off is no longer a settle precondition** — Fork (B) buys its substrate in U2, so it became a **U2 acceptance gate**. *That is a consequence of the ruling, not a relaxation of the standard: the author is still recused and the pass still has to happen.*
>
> **Not settle items, recorded so their absence is a decision**: **Q8's rename fork** is contingent on reduce-not-grow, and the rename is Lina's own bounded issue gated before U3 · the **always-set application unit** awaits Lina's confirmation (reviewer item) · **C3's "trivial" definition** is owed by this author **before pass four**, not at settle.

**Q1 — RESOLVED (Peter, third sitting) → R8, § 3.9.** Formal requirement; *"five-minute" philosophical, not literal*. **R1 gave clause 3 the AC slot it lacked** (Stacy B6): the **path** is the assertable property, the **run** is recorded output where an overrun is a finding, and **a stop is a recorded event with its reason**. Three **forbidden look-alikes** are now named in § 5.5 — chiefly the step-count applied to the *run*, which passes review while truncating the instrument. The requirement is **renamed to a non-numeric name**.

**Q2 — GATE 4: OPEN, and it is now TWO decisions** (Leonardo B3). **(1) The MCP-served corpus** — recommended **(a) banner, scoped to the measured 18** (Ada A5), **plus its guard** (Stacy A3; banner-without-guard is a named non-option), with component docs shipping **as a set** (Lina A7). **(2) The init-copied corpus** — recommended default **STOP COPYING** `governance/` and `.kiro/steering/`; banner economics are irrelevant to a surface nothing serves. **Plus a required third mechanism**: **(d) re-ground the nine always-set identity docs** (Lina B5) — *"a banner is a reading instruction; the always-layer is not read, it is loaded."* **The settle-vs-probe contradiction is resolved** (Stacy B5): the § 8 probe runs **before settle**, so this gate settles on evidence.

**Q3 — RESOLVED (Peter) → R4, § 3.4.** Persona trio blocking; Peter's run non-blocking; cold-human an open obligation on a generic trigger, surviving 123's closeout if unfired. **R1 refinements to the instrument (not the ruling)**: persona (c)'s axis redefined to **agent-harness fluency** (Leonardo A1/A2, per Peter); **preconditions recorded per run** — packed install, no repo access (Stacy A5); **runs distributed across ≥2 `--target` harnesses** (Leonardo A3); if ever reduced, **keep (a) or (b), never (c)** (Leonardo A4).

**Q4 — RULING intact; its CHECK has failed falsification TWICE, and the second failure produced a RULING rather than a redraft** (§ 3.5, § 7.2). All eight ship; subtraction **+ re-grounding** — the ruling has never been in question. **R1 retired v1's defense** (direction (ii) could not fail). **R2 FAILED v2** — authorized emptying, ~104 lines of her own charter, every clause passing; root diagnosis *four negative clauses cannot establish a positive property.* **R3 FAILED v3** — **false re-pointing**, running down the one lane advertised as fully mechanical, *needing no signature and no human at all*. The through-line: *v1 checked verbs were present, v2 that citations were present, v3 that a destination was present — presence of a token standing in for the property it evidences.* **Span-exists is not function-lives-there.**

**But R3's finding was SUBSTRATE, not drafting** — charter bodies render as **one attribution span**, so clause (v) assumed a granularity that does not exist. Stacy **fired the author's pre-committed landing place and narrowed its wording against both parties' comfort**, from an unfalsifiable *"a static check cannot carry this property"* to a **buyable substrate condition** — and **Peter bought it: FORK (B), section-granular provenance in U2**, with the **falsification criterion pre-stated** so pass four is a one-line verification. **§ 7.2 is NOT signed off** and the author remains recused; the sign-off **moved to a U2 acceptance gate**. Conditions **C1–C4 bind** regardless of fork.

**Q5 — OPEN, and R1 REFRAMED IT** (§ 7.3). Three reviewers say **filtered** — Lina adds the strongest mechanical argument (**the attribution sidecars are a literal index from re-grounded output back to steward source**, so shipping whole canonical hands a consumer agent *a map* to the un-subtracted originals) plus the discipline that it must be **derived at pack time and diff-guarded, never a second hand-maintained tree**; Ada says A6's measurement makes filtering cheap; Stacy says un-filtered puts **two charters for the same agent** in the repo with nothing marking which binds. **Leonardo argues the other way and reframes the question**: `canonical/` is the **highest-density transferable-intent artifact in the package** and filtering ships the secondary mode a redacted version of its best asset — *but a consumer's agent greps*, so **the real question is PLACEMENT, not filtering**: ship whole if it can sit outside the agent-discoverable path (or be MCP-served rather than file-copied); filter if it must live where their agent greps. **Peter's pick.**

**Q6 — D1, OPEN WITH A RECORDED LEAN, and both domain owners now SUPPORT IT CONDITIONALLY** (§ 3.8, § 4.2). **Ada**: support, **conditional on B1 (theme-authoring export path) and B2 (packed-install package-mode certification) landing in U1** — and her positive argument is the best one on record: *what makes the consumer's design system theirs is not owning our source files, it is the catalog answering about **their** tokens*, which C′ delivers regardless of where primitives resolve from. **Lina**: support for components, **conditional on B1+B2+B3** — and her argument is the opposite of the intuition: *schemas and contracts are claims the MCP makes to an agent; a copied set silently drifts from the package the agent is actually importing, and the MCP then lies with full confidence.* **Both are explicit that the conditions are load-bearing**: Lina would argue *against* the lean if B2 is unfixed; Ada says that if the diet cuts `src/tokens`, package-primary *does* collapse into dependency-consumption and the positioning counter is simply correct. **The positioning counter survives unchanged** (Leonardo: *"defaults are the product, and a hatch paragraph does not change a default"* — his asked-for mitigation is that `init`'s **terminal output** names the clone hatch, since the founder reads the terminal and their agent reads the doc).

**Q7 — RESOLVED (Peter, third sitting) → R9, § 3.10.** Keep the dual-publish, against the outline's recommendation, tax accepted knowingly. **R1 retired the mitigation that came with it**: Stacy B7 measured that `@scope:registry` in an npmrc **takes precedence over `--registry`**, so the named guard was **void against the exact hazard R9 accepted**. Replaced with her measured, bite-tested, scope-explicit form, **registered** rather than documented-only (§ 4.3) — with Ada A8 and Leonardo A15 recorded as hardening candidates.

**Q8 — RESOLVED by Lina (R1), UPDATED at R2 after Ada's directed question** (§ 4.5). **Harvest-zero lint ships as a U1 rider**; the **`*.refs.ts` rename is a separate bounded issue she owns**, landing **before U3 ships the install doc**; convergence ruled out. **Her lean HARDENED to a recommendation** on a point neither had seen: **R7 changes what an exemplar is** — under package-primary the shipped component root **IS the exemplar set, permanently and read-only**, so shipping two mechanisms under one filename ships the fracture *as the reference model*, and the migration price **steps up discontinuously at 123's release** rather than gradually with consumer count. **The fork is still Peter's**: rename-now vs lint-only (*"we lint consumers for reproducing a confusion we ship as the reference example"*). Leonardo's opposing consumer-side read is on record.

**Q9 — CLOSED (Peter, 2026-09-20): shape (ii), THE PROFILE DIMENSION** (§ 7.1). Ruled on Lina's costed read.

**Her framing correction to her own R1 item, and it is decisive because it is a measurement rather than a preference**: *the target axis is keyed on **OUTPUT LOCATION**; a profile is a difference in **CONTENT at the same location**.* The CC adapter hardcodes its paths and `guardedRoots()` re-derives that same triple per agent — so a `cc-consumer` target **cannot** emit to `.claude/agents/` in our repo (collision with steward output) yet **must** emit exactly there in a consumer's. **(i) therefore does not avoid the pipeline change; it defers it and pays duplication on top.**

| Surface | (i) third target | (ii) profile as an emission dimension |
|---|---|---|
| `TargetAdapter` | union +1; **20 `.target` refs across 5 files** each need a completeness review | **Signature unchanged**; the 20 refs untouched; `AdapterContext` +1 field |
| New adapter code | **~830 lines** duplicated/subclassed — *D-live-3's shape with better intentions* | **None** |
| `skills-map.yaml` | **+5** rows, every one a duplicate of the `cc` path — a drift surface by construction | **0** |
| `field-dispositions.yaml` | **+15** rows | **0–2** |
| Sweeps | 4 of 8 gain a new target's *semantics* | the same 4 gain a profile *iteration* |
| Consumer output path | **UNSOLVED** — needs the indirection anyway | solved by the indirection A2 already owes |
| Kiro-consumer later | **doubles everything** (4 adapters) | additive |

**(ii) also serves the re-grounding check**, which now matters more than when she wrote it: v3's applicability verification needs **the canonical source beside a checked-in consumer rendering**, and `canonical/_consumer-output/<target>/` following the existing `generateFixture` precedent is exactly that. It is also the concrete home for **Ada A7's named acceptance item** — the check run on *Thurgood's* rendered consumer output becomes **a committed file rather than an intention**.

**Her surviving counter is PRESERVED ON THE RECORD rather than dissolved by the ruling**: (ii) front-loads pipeline work with **nothing demoable until finished**, whereas (i) could have put a crude consumer rendering in front of Peter in a day; and (ii) makes the profile axis **permanent** — a standing cognitive tax on every future sweep, guard and lock author that (i) would have localized in one file. Both costs are now owned rather than avoided.

**And the ruling COMPOUNDS with Fork (B)**: (ii)'s checked-in `canonical/_consumer-output/<target>/` renderings are **what the new section-granular spans get swept against in CI**. Without them the provenance would exist only in a stranger's repo at `init` time and there would be nothing to check. **Q9's closure and Fork B's affordability are the same fact seen twice** — which is also why (ii)'s front-loading counter is smaller in practice than it was when priced in isolation: the pipeline work it front-loads is now work U2 owes anyway.

> **CORRECTION TO THE AUTHOR'S OWN FRAMING, accepted and standing.** I wrote that Q9 *"materially sizes U2 and therefore gate 5"* and asked for a cost read on that basis. **Her measurement retires the premise**: the options differ by roughly **a day**, and U2's mass is elsewhere — B5's always-set re-grounding, A3's compile lane for a generator **that is not built at all today**, A2's emission entry point, L-B4(b)'s degrade path, A5's reference sweep, Le-B2's tool-route clause, **and now Fork B's provenance work.** The gate-5 ruling never needed to wait on Q9.

**GATE 5 — OPEN; Peter holds no prior; the round CONVERGED** (§ 9.3). **All four reviewers argue DO NOT SPLIT**, for four different reasons, the sharpest being Stacy's: *the split at U3+U4 is not a scope reduction, it is a validation deferral* — it strands U5's instrument and closes 123 with **zero evidence any of it works for a stranger**. **The outline's own proposed split line is withdrawn.** Ordering is **adjudicated** (§ 9.1: U1 → U2 → U3 → U4 → U5, with Stacy's corrected condition recorded and currently false). What remains for Peter is the binary Stacy declined to absorb: **accept a five-unit spec, or split and defer validation** — and if split, which line (three fallback lines are on record).
---

## 11. Accepted risks and recorded counter-arguments (AICP)

Carried from the onboarding inbound, unerased, plus new ones this outline creates:

- **Spec quality in unknown harnesses.** Our specs are good because of the pipeline around them; a consumer's agent of unknown quality produces a spec of unknown quality. Mitigations: P2's bite proofs (the spec is not done until each need PROVES armed) + verification recipes in the install doc. **Residual accepted knowingly.**
- **Support surface at solo scale.** Shipping onboarding flows means owning failure modes in environments we do not control (version skew, deleted docs, exotic CI). This bounds how much the install doc may promise — a design constraint, not just a caveat. **R6 gives it a concrete governor**: the counter applies **per starter spec**, so the launch set is two and growth is earned by evidence. That is the risk metabolized into a rule rather than left as a worry.
- **Scaffolder-not-integrations boundary.** If onboarding trends toward standing per-vendor CI integrations maintained by us, that is the escalate-don't-build smell at product scale. **Named as a tripwire, not a prohibition.**
- **R3's scope growth — and R1 grew it further, concentrated in U1.** § 9.2's movement table is honest about this: the previous revision reported near-scope-neutrality and that is **no longer true**. Six blocking findings landed in U1 alone.
- **Two profiles to guard — and the machine for it does not exist yet (Lina A1).** One canonical source, two rendered profiles, two guard surfaces. **The outline's claim that 122's additivity proof makes this cheap is withdrawn**: 122 proved *target*-additivity; a profile is an orthogonal axis. **Q9 is now ruled — shape (ii)** — so the axis is real and permanent, and Lina's counter (a standing cognitive tax on every future sweep author) is a cost owned rather than avoided. The steward profile carries all the ongoing churn, so **the consumer profile is the one that will quietly rot** — and Ada A6 sharpens both halves: re-grounding concentrates in **one shared catalog file**, which shrinks the work *and* makes it a **single point of failure where one bad entry mis-grounds all eight agents at once.** The mitigation is the redesigned sweep, run **per-agent against rendered output**.
- **Persona agents under-simulate confusion (R4's carried caveat).** They **role-play** ignorance rather than possessing it. **The named rot mode: a green trio read as "a stranger succeeded."** The mitigation is textual and therefore weak; the cold-human obligation is the real one, and it is unscheduled by construction.
- **The dual-publish tax, accepted knowingly (R9) — and the mitigation named with it was VOID.** Stacy B7 measured that scope-mapping beats `--registry`, so the guard this outline proposed did not work against the hazard R9 accepted. **Now armed** (§ 4.3: measured form + bite recipe + register row). What remains accepted is the recurring per-release friction, plus the honest limitation that a post-merge check **cannot be a PR required check**, so its armed evidence is a recorded red rather than gate registration. *A mitigation that was void before it was ever used is the strongest possible illustration of § 11's own "procedural mitigations decay" bullet.*
- **A generically-triggered obligation is a weakly-held one.** The cold-human trigger is "the first willing stranger" — no name, no date, no firing mechanism. The obligation **outlives 123's closeout if unfired**, and a completed 123 is not evidence it was discharged.
- **Starter specs are shipped surface we cannot observe running.** Executable specs in strangers' repos, run by agents of unknown quality. P2's bite proofs cover the CI spec; **the re-grounding spec has no equivalent proof-of-arming**, and its deliverable only reaches us if a consumer sends it. **That concession is exactly why Stacy B2 forced the conformance run into U5** — a criterion may not lean on evidence with no return path.
- **The secondary mode is unproven.** One observed behavior. The probe is sized to that uncertainty and is now a **settle precondition**, so gate 4 settles on evidence rather than on a contingency that could not resolve in time (Stacy B5).
- **The re-grounding contract's direction (i) is a closed enumeration against an open class (Stacy A9).** A deny-list sweep is bounded by its list, and **the outline supplies its own proof** — D-live-1's `GITHUB_TOKEN` pin was *taught in prose* after the config pin was fixed. A paraphrased authority claim clears any string list. **Carried inside the contract's own text**: *a zero-hit sweep is evidence about the enumeration, not about the charter.*
- **The strategic counter still standing** (WordPress-thesis note): *the plan optimizes toward an unvalidated market.* Zero external consumers today; the lean counter-position — get the rough package into three strangers' hands now — has real merit, and 123 IS the hardening.
  - **The tripwire that made "do not split now" safe was itself generically triggered — the defect this section indicts two bullets above (Stacy A8).** *"If U1+U4 land and U3/U4 start sprawling, that is the signal to ship what exists"* had no firing condition, no owner and no reading event. **Given one**: the split tripwire fires when **a unit's declared scope grows by a named threshold after its tasks are written, or a unit misses a second successive planned merge**; it is **read at each unit's completion review** (the natural reading event, since a unit boundary is where scope growth becomes visible); and **Peter owns the read**. Stacy's gate-5 position leans on this tripwire to carry the "split later, on evidence" case, so it has to bear weight rather than sit as prose.
---

## 12. Non-goals

- **125 Phase 3 (consumer-side enforcement) stays OUT.** Teeth stop at the repo boundary. **Do not preclude it in package layout** — the needs/tiers structure in § 5.2 is deliberately shaped so consumer-side checks could later ship as *our* artifacts without re-architecting.
- **Re-fixing F-C1 / F-C2 / F-C6.** Addressed by 118's contract; not 123's.
- **Re-implementing MCP server-side data-root fallback.** Closed by the F-C2 patch; only config wiring remains.
- **A plugin/third-party-contribution contract.** Named on the north star; process-first says do not build it yet.
- **A benchmark harness.** Manual-first; see § 9.2 cut item 1.
- **Deciding the 124 authoring convention** (§ 4.5) — Lina's.
- **The Q6 release-manager retirement execution** (36-file inventory) — its own session.

---

## 13. Process notes for this spec's execution

- **Spec 127's completion-claims convention is ratified law and 123's execution runs under it.** Every parent completion doc reproduces its `tasks.md` success-criterion rows **verbatim** with Status + Evidence, carries the **forced-negative line**, and carries the **unconditional fixed-form delegated-tier line**. Every ticked subtask carries its subtask completion doc (S-4). The `completion-criteria-parity` instrument applies.
- **Claims passes fire per Stacy's events** — a CLOSEOUT pass at the final unit's merge; MIDPOINT if the arc runs long. Findings route to owning agents as explicit messages, not files in a directory.
- **Q2 arming likely comes due during this arc**: 123's parent completion docs supply the remaining in-scope parents toward the N≥5 floor (127 supplied 3), and a 123-era release fires the release-prep guard. Expect the arming decision inside 123's window; it is **not** 123's to make.
- **Sequential formalization gate applies** (Spec-Feedback-Protocol): outline → round → settle → requirements → round → design → round → tasks → round. No compressed forms (Q5 ruling, 2026-09-19).
- **Authoring model**: Thurgood-subagent authors the spec artifacts, one agent continued per unit; reviewers self-write their round entries (transcription retired, Peter's ruling 2026-09-19).
- **Civitas health check** marker is 2026-09-19; the next is due ~mid-October and will land inside this arc.

---

## 14. Stakeholders and review plan

**R1 COMPLETE, R2 VERIFICATION COMPLETE (both 2026-09-20)** — four R1 reviews (**18 blocking**, all incorporated), then three R2 entries: **Stacy's falsification pass (FAILED v2)**, Leonardo's directed answer + fixtures, Lina's two answers + the Q9 cost read. Full round and per-item dispositions: `feedback/design-outline.md`.

| Reviewer | Outcome across R1–R2 | Still owes |
|---|---|---|
| **Stacy** | R1: 7 blocking, 9 advisory. R2: **FAILED v2** (authorized emptying, measured on her own charter) + the root diagnosis + Ada's LENS answer + the publish-guard liveness detector. R3: **FAILED v3** (false re-pointing) — and went **to the substrate rather than the text**, measuring that charter bodies render as one span; **fired the author's pre-commitment and narrowed its wording against her own drafted position**, which her own measurement had falsified mid-pass | **Pass FOUR, at U2 — no longer a settle precondition** (Fork (B) buys the substrate in execution). Scoped in advance to re-running attack (a) against § 7.2's **pre-stated criterion**. **C2's rate detector is hers**; **C3's exemplars are hers** |
| **Lina** | R1: 5 blocking, 9 advisory — the **silent-catalog deletion** (B2), the **MCP data floor** (B1), the **generation throw** (B4), the **nine-document hole** (B5). R2: both Ada answers + the Q9 cost read (**now RULED (ii)**), including a framing correction to the author's own sizing claim | **Confirm the always-set application unit** defined at § 7.2 (Stacy's attack 5 — the class-scoping is hers). Her `*.refs.ts` rename issue lands before U3. **U2 now also carries Fork (B)'s provenance work on her generator surface** |
| **Ada** | R1: 3 blocking, 8 advisory. Answered Peter's directed Q6 with **conditional support**; corrected the diet's framing from measurement to decision (B3); found the **theme-authoring gap** (B1) and the **uncertified default path** (B2) | **The `.tokens.ts`-from-`dist` harvest question** (Lina R2's joint item — one command, inside her B1 authoring-API decision at U1); A8's `dist.tarball` field-name verification (U1-time, not settle) |
| **Leonardo** | R1: 3 blocking, 14 advisory — gate 4's **two surfaces** (B3), the **tool-route hole** (B2), the **Product MCP placement error** (B1). R2: answered Stacy's directed question by **separating a conflation** (the bar stands on the source tree, bends on the host repo), **accepted the R2 decline on the merits** and asked only that its residual be named | Nothing outstanding |
| **Kenya / Data** | **Not tagged for R1**, as planned — **and the trigger now has CONTENT, measured** | **They come in at the tasks round, on a specific question: the 1.5 MB of `.swift`/`.kt` in `src/components/core`.** `dist` carries **3 `.swift` and 3 `.kt` files total** (Lina R2), so despite the dist glob naming those extensions, **`src/` is the only rail platform sources reach consumers on.** Cut the tree wholesale and an **iOS or Android consumer receives a design system with no component implementations at all**, while the web consumer is fine via compiled `dist`. That is their call, not Lina's and not Ada's |
| **Sparky** | **Not tagged**, and now for a *measured* reason rather than a presumed one | The web consumer is served by compiled `dist/components` under package-primary; his consumption pattern is the one that is genuinely unchanged |
| **Peter** | Ruled Q1/Q3/Q4/Q7 across three sittings | **At settle**: gate 4 (two decisions), gate 5 (no prior held; the round converged on no-split), **Q5** (reframed as placement, not filtering), **Q6** (conditions named), **Q9** (new) |
---

## 15. The record (where detail lives)

| Input | Home |
|---|---|
| Strategic view, gates, conflicts C1–C5, owed checks | `docs/roadmap/2026-09-20-consumer-distribution-roadmap-update.md` |
| The nine inbounds | `.kiro/specs/123-consumer-distribution/inbound-from-*.md` |
| The tenth input (delivery constraints) | `.kiro/specs/119-B-capability-routing-measurement/inbound-to-123-from-119-B.md` |
| Standing thesis, positioning, loops lens, counter-arguments | `docs/roadmap/2026-07-04-wordpress-thesis-strategy.md` |
| Audit findings (packaging A6, `personal-note.md` A10 — now dissolved by § 3.7, MCP infra ring) | `docs/roadmap/2026-07-04-full-project-audit.md` §§ 2–4 + "Prioritized Actions" |
| D-live-1 repair + the formal routing of D-live-2/3 and the sync pin-repair | `.kiro/issues/archive/2026-09-20-init-npmrc-registry-pin.md` (born-closed) · PR #192, branch `fix/init-npmrc-registry-pin` |
| Module-resolution contract (served law) | `rosetta-system-architecture` § "Module-Resolution Contract (Spec 118)" |
| 118's boundary marker for D1 | `.kiro/specs/118-module-resolution-coherence/tasks.md` (`[BOUNDARY — Spec 123]`) |
| 124 authoring-convention seed (Lina) | `.kiro/specs/124-component-token-return-contract/findings/component-token-authoring-convention-seed.md` |
| Banner precedent | `governance/release-management-system.md` (top of doc) |
| Q6 retirement + execution issue | `.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md` · `.kiro/issues/2026-08-12-release-manager-retirement-execution.md` |
| Calibration law (cited, never re-asserted) | `governance/classification-map.md § "certainty-calibration"` |
| Completion-claims law this spec executes under | Spec 127 (`.kiro/specs/127-completion-claims-integrity/`) + `completion-documentation-guide` |
| The superseded stub | git history, this path, at `3507a0b4` (2026-08-12) |
| **R1 round — four reviews, 18 blocking, and the R2 dispositions** | `.kiro/specs/123-consumer-distribution/feedback/design-outline.md` |
| Spec 101's deferred two-consumer-paths finding (123 is its follow-up) | `.kiro/specs/101-package-publish-readiness/design-outline.md` (cited by Lina A6) |

---

*Draft. Feedback round open at `.kiro/specs/123-consumer-distribution/feedback/design-outline.md`.*
