# Design Outline: 123 — Consumer Distribution

**Date**: 2026-09-20
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: **DRAFT (revised 2026-09-20 after Peter's second sitting) — awaiting the design-outline feedback round, then Peter's outline settle.** Not a settled outline; no requirements phase opens until settle (Spec-Feedback-Protocol § "Sequential Formalization Gate").

> **SECOND SITTING FOLDED IN (Peter, 2026-09-20, main-loop).** Ruling on this draft: **R4** persona-embodied cold-user trio (resolves the draft's Q3) → § 3.4 · **R5** all eight agents ship, contract = subtraction **+ re-grounding** (resolves the draft's Q4) → § 3.5 · **R6** pre-installed starter specs, launch set of two → § 3.6 · **`personal-note.md` template-ized** (dissolves audit A10) → § 3.7 · **R7 RECORDED LEAN** package-consumed-primary with the repo clone as ownership hatch — *open for round input, Ada named* → § 3.8. Out-of-band: **D-live-1 repaired** (PR #192) → § 1.3. Q1/Q2/Q5/Q7/Q8 and gates 4–5 remain open.

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

### 1.3 The four live defects the measurement surfaced

These are not hypotheticals for the round to weigh. They are (or were, for D-live-1) current published behavior, and three of them contradict rulings Peter made on 2026-09-20. **Dispositions are now recorded per defect** — one is repaired out-of-band; the rest are formally routed to units.

- **D-live-1 — `init` pinned every consumer to GitHub Packages. ✅ REPAIRED OUT-OF-BAND (2026-09-20).** `src/cli/init.ts` wrote `.npmrc` containing `@3fn:registry=https://npm.pkg.github.com`. Under **R2 (public npm primary)** this was a defect, not a policy: precisely the "stale `@3fn` scope-mapping is a silent registry pin" hazard named in `inbound-from-13.0.0-release.md` §2(c) — with DesignerPunk's own scaffolder creating it. A consumer who ran `init` then `npm update` hit GitHub's auth wall: the locked door in front of the five-minute test.
  - **A second instance of the same defect class, not in this outline's first survey**: `init`'s "Next steps" output additionally instructed consumers to *"Set GITHUB_TOKEN env var (read:packages scope)"* — the pin taught in prose as well as scaffolded in config. Worth recording, because it shows the class is *instructional* as well as mechanical: the survey found the file and missed the sentence, and content policy (Axis C) is exactly where sentences like that live.
  - **Fix** (PR #192, branch `fix/init-npmrc-registry-pin`): no `.npmrc` scaffold (an explanatory comment left at the site), the `GITHUB_TOKEN` next-step removed, and a regression guard in `src/cli/__tests__/init.test.ts` asserting `.npmrc` is NOT created. Record: `.kiro/issues/archive/2026-09-20-init-npmrc-registry-pin.md` (born-closed).
  - **Consequence for this spec**: **U1 no longer owes the template repair.** U1 keeps only the *sync-side* repair of already-pinned consumers (§ 4.3, § 4.4). Q7 (mirror vs drop) stays open and is unaffected — the fix stands under either disposition, which is the separation § 4.3 argued for, now load-tested.
- **D-live-2 — the imposter problem is already shipping.** `init` copies the 8 in-repo agent prompts and the 9 identity docs into consumer repos. Those artifacts instruct agents to run `./.kiro/hooks/complete-task.sh`, to treat Peter's merge as the authorization act, and to ratify law by ballot (`complete-task.sh` / "Peter merges" / "ballot" occurrences per shipped prompt, 2026-09-20: ada 2, data 2, kenya 2, leonardo 2, lina 4, sparky 2, stacy 7, thurgood 7). `Task-Completion-Protocol.md` and `start-up-tasks.md` ship the same law as always-loaded identity content. **This is the exact failure Peter's 2026-08-11 correction named** — and it is live in `14.1.0`, in advance of any decision to ship agents. R3's consumer generation profile is therefore **repair of a shipped defect**, not new risk taken on.
- **D-live-3 — `product-template/agents/` is a stale hand-copied fork.** Nine prompt files, last touched **2026-04-10**, unmanaged by the 122 generator (no reference to `product-template` anywhere in `tools/agent-generator/` or `canonical/`), shipping in `files[]`. `product-template/agents/ada-prompt.md` is 83 lines against the generated `.kiro/agents/ada-prompt.md`'s 217. A consumer reading the template gets a five-month-stale agent org. This is exactly the drift class 122 was built to eliminate, surviving in the one directory named for consumers.
- **D-live-4 — `personal-note.md` ships to public npm** (audit A10). Plus its dangling reference to a résumé file that does not ship. **Disposition RULED (Peter, 2026-09-20): template-ize inside 123** — see § 3.7 and § 6.4. A10 is dissolved rather than adjudicated.

**Routing of record** (from the D-live-1 issue record's "Out of scope (routed)" section): **D-live-2 → U2**, **D-live-3 → U2** (*"the spec is the fix; patching them ahead would front-run its core design decision"*), **sync-side pin repair → U1**, **mirror-vs-drop → Q7**. None of these are owed as out-of-band patches.

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

**Caveat carried, not buried**: persona agents **role-play** ignorance rather than possessing it, so they under-simulate genuine confusion. **The trio measures instruction clarity and path completeness; the human measures confusion.** Both stand; neither substitutes for the other. This is the counter-argument § 10 Q3 could not answer, now held as a standing limitation rather than resolved away.

### 3.5 R5 — All eight agents ship, and the contract is subtraction **plus RE-GROUNDING** (resolves Q4)

**All eight agents ship.** And Peter's reframe **supersedes pure subtraction**, which was this outline's draft framing and was the weaker idea:

> **The ROLE ships intact, re-pointed at the consumer's repo.** Consumer-Thurgood does spec formalization, test governance, and steering-doc health **for THEIR repo — their Civitas, not ours.** What is subtracted is never the role, only *this repo's specifics*: our ballots, our merge authority, our scripts.

This dissolves the draft's § 7.2 worry that an agent's charter might "reduce to near-nothing" — that outcome was an artifact of framing the contract as deletion. Under re-grounding there is no collapse case: a charter that looked repo-bound was mis-read as *about this repo* when it was about *a repo*. **Recording the author's own stake honestly**: Thurgood was the draft's named collapse candidate, and the reframe is what saves the charter — the author is not neutral about that, and the round should press on it if the reframe looks self-serving. The testable form is § 7.2's re-grounding contract, and it is mechanically checkable in both directions (no repo-specifics present; the role's verbs still present).

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

### 3.9 What the rulings do NOT settle

R1–R6 fix the persona, the rail, the agent-shipping question, the cold-user bar, the charter contract, and the starter-spec mechanism. They leave open: the five-minute test's *definition* (gate 3's remaining half — step-count bar), consumer corpus policy and packaging diet (gate 4), unit structure (gate 5), and Q5/Q6/Q7/Q8 (§ 10). **Do not read a ruling as having settled an adjacent question by implication** — R5 in particular settles *what ships*, not *how it is delivered* (Q5) or *what a consumer imports* (Q6).

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
| Packed-install consumer guard | 118 | **The certification arbiter — never an in-repo load** (false-greens) |
| `TargetAdapter` seam (`emitAgent`/`emitSkills`/`emitAlwaysLayer`/`toolRef`/`skillRef`/`renderWriteScope`/`dispositions`) | 122 | The extension point for the consumer profile (§ 7) |

The full module-resolution contract is served law: `rosetta-system-architecture` § "Module-Resolution Contract (Spec 118)".

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

**New consequence the clone-hatch creates — flagged for U1 and for Ada.** With no `eject` command, `src/` no longer has to ship *for ownership reasons*; the ownership path is the repo. That **raises the packaging diet's ceiling substantially** (`src/` is the single largest contributor to the 31.4 MB unpacked figure). It does **not** automatically mean `src/` ships nothing: consumer authoring against `defineComponentTokens`, `designerpunk.config.ts`, and the type surface must still resolve, and today some of that resolves through shipped `src/`. **U1 determines the floor by measurement, not by assumption** — and this is precisely the surface § 14 asks Ada to pressure-test.

**Surviving counter-argument (fold-back could not absorb it; still live even under the lean).** The copy model is what makes the consumer's design system *theirs* — the concrete expression of the C′ premise 118 ratified and of "installs a capability, not a library." Package-primary moves DesignerPunk one step toward being a component vendor with agent affordances, which is the Astryx position we claim not to occupy. The clone hatch answers *ownership* but not *defaults*, and **defaults are the product**: a consumer who never reads the hatch paragraph experiences DesignerPunk as a dependency. The lean accepts that cost in exchange for upgradeability; the round should say whether the trade is right. The decision is load-bearing for `sync` (§ 4.4), for the packaging diet (§ 6.4), and for what platform implementers import in a consumer repo (§ 14's deferral trigger) — and for nothing else.

### 4.3 DECISION D2 — GitHub Packages disposition (R2's open half)

Two separable things got bundled together in the C3 framing, and separating them changes the answer:

1. **The `init` `.npmrc` template writing a GH-Packages scope-mapping was a defect** (D-live-1) — repairable unconditionally, under any disposition. **✅ DONE out-of-band, 2026-09-20** (PR #192 + the born-closed issue record; § 1.3). The separation argued here was load-tested by that fix: it landed while Q7 remains open, exactly as predicted. **What remains in 123**: `sync` detects a pre-existing `@3fn` → GH-Packages mapping in a consumer repo and offers repair *with a named explanation* (per P4's priced-optionality discipline: never silent, never fine print). That is U1 scope, and it is now U1's *only* registry obligation.
2. **Whether to keep publishing a GH-Packages mirror is a separate call.** Dropping the mirror does not fix (1); fixing (1) does not require dropping the mirror.

**Recommendation: mirror-but-undocumented.** Keep the dual publish (near-zero marginal publish cost; preserves a private/gated rail if Peter ever wants early access or a paid tier), but remove GitHub Packages from **all** consumer-facing documentation, templates, and scaffolds, so no new consumer can land there by following our own instructions.

**Surviving counter-argument (the fork).** An undocumented mirror still carries a real verification tax, and we have already paid it once: at 13.0.0 a scope-mapping caused `npm view` to answer from GH Packages and produce a **false "it's live"** (`inbound-from-13.0.0-release.md` §2(c)). A mirror nobody documents is a mirror nobody checks — and a stale mirror version reads as current to exactly the tooling we verify with. **The fork for Peter**: accept the per-release verification tax to keep the private rail, or drop the mirror and delete the tax. I do not pick this one; both are defensible and the choice is about optionality Peter may want later, not about engineering.

### 4.4 `sync` — the upgrade-coherence surface

121 Req 4's watch item lands here: if `sync` does not refresh vendored prompts/docs on upgrade, swept references go stale in the consumer copy (the `get_documentation_map` → `find_docs` sweep is the recorded example — a consumer would reference a tool that no longer exists). Under R7's lean the vendored surface shrinks to **generated agent artifacts plus scaffolded onboarding files**, which makes this tractable rather than open-ended — a clone-based owner is outside `sync`'s remit by construction (they own a repo, not a vendored copy), which is a further simplification the clone hatch buys.

`sync` responsibilities in 123: refresh generated agent artifacts against the installed package version; refresh MCP config entries (`.kiro/settings/mcp.json`, `.mcp.json`, `.cursor/mcp.json`) including `autoApprove` tool-name drift; **detect and offer repair of an existing registry scope-pin** (§ 4.3 — U1's only registry obligation after PR #192); report scaffolded onboarding artifacts that have drifted from the package (report, never silently overwrite consumer-owned files — a personalized `personal-note.md` (§ 6.4) is the obvious case where overwrite would be destructive).

### 4.5 The 124 authoring-convention seed — **Lina's, flagged not decided**

`*.tokens.ts` / `tokens.ts` are worn by **two** mechanisms — `defineComponentTokens` value-registration files (harvested) and plain semantic-reference maps (not harvested). 124's brand makes the harvest correct; the *authoring model* stays fractured, and in a C′ world it is a live support question (*"I wrote a `tokens.ts` — why aren't my component tokens showing up?"*). Candidate directions recorded by 124: distinct filenames by mechanism, an authoring lint that warns when a scanned file harvests zero, or convergence.

**Owner: Lina** (`.kiro/specs/124-component-token-return-contract/findings/component-token-authoring-convention-seed.md`). 123 is the coupling point and must not settle it unilaterally — **explicitly routed to Lina in the feedback round** (§ 14). If Lina's answer is "lint," it is a small rider on U1; if it is "rename by mechanism," it is a breaking change to consumer authoring and belongs in its own spec with a migration — **that fork is Lina's to call, and its answer changes 123's scope**, so it is wanted early in the round.

### 4.6 The 122 handbacks 123 absorbs

- **Consumer-side CC always-layer delivery** (122 Req 16 AC4) — 122 delivered the always-layer for in-repo agents only. Consumer delivery is 123's, and under R3 it is part of the consumer profile (§ 7). Note the constraint from 119-B §5: identity docs are never MCP-served, so CC delivery of identity content is the generated `CLAUDE.md` import set — 122's mechanism, re-targeted.
- **Product MCP population** — intentionally empty in this repo; it serves the *installing product's* content. Tool declarations already drive per-agent cue generation regardless of index state (Req 7 AC2); at Stacy's cutover the 5 product-content tools routed to Leonardo. 123 is where a real product repo populates the index and routing goes live. **Leonardo reviews this surface.**
- **Cursor as proof-of-additivity** (122 Req 24 AC4) — a third adapter against the same interface; `.cursor/rules/designerpunk-core.mdc` is a named hand-maintained drift surface until it exists. **Proposed disposition: below the cut-line** (§ 9) — real, but not load-bearing for R1's persona, and additivity is already proven by the Kiro adapter landing against the unchanged interface.

### 4.7 MCP infra-ring duplication (audit finding, proposed rider)

`StalenessGate.ts` is byte-identical across the three MCP servers; `TokenRefResolver.ts` 92% duplicate; `FileWatcher.ts` already forked and diverged. All three servers esbuild-bundle from one repo, so consolidating into the existing `build:mcp-shared` seam is zero-cost at runtime. The audit flags it as *"the 117/118 parallel-paths-drift shape, latent in Civitas"* and names 123-adjacent MCP work as a candidate carrier. **Proposed: below the cut-line for 123** (it is repo-internal quality, invisible to consumers) — recorded here so the pointer does not evaporate. If Peter wants it, it is a clean U1 rider.

---

## 5. Axis B — Onboarding + CI experience

### 5.1 The inversion (settled, carried verbatim in substance)

The package stops shipping environment **assumptions** and ships declared **needs** — *"DesignerPunk's guarantees depend on these verifications existing"* — and the consumer's own agent maps needs onto their CI reality. Mechanism/policy split: we own the needs; they own the fulfillment. Quiet product bonus: the consumer's first DesignerPunk experience is *running a spec with their agent* — they inherit the method by doing it once.

### 5.2 Principles P1–P6

- **P1 — Needs-declaration over environment-assumption.** The install doc declares verification needs with their *why*; never a CI vendor, workflow syntax, or repo topology.
- **P2 — Every need ships with its arming proof. NON-NEGOTIABLE.** Each need carries a **gate-bite recipe**: introduce this deliberate failure → your check must go red → revert. This exports 125-A's hardest-won lesson and closes the DORMANT-check failure mode at consumer scale, in repos we never see. *Design consequence: a need whose bite recipe cannot be written does not ship as a need.* That is a real filter on P3's tier list, and I expect it to cut candidates.
- **P3 — Tiered needs.** A MINIMAL core (plausibly small: token-output drift, suite-runs-at-merge, perhaps a contract check) vs optional hardening. The internal 18-check set is mostly stewardship and does NOT ship as needs.
- **P4 — Priced optionality.** Skipping a need carries a NAMED degradation statement ("without X, token drift reaches your users undetected") — never fine print, never pretended harmless.
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

It also carries the **reference-corpus section** (R1 secondary): how a foreign design system's agents should read this corpus — what is DesignerPunk's worked execution versus what is transferable intent.

### 5.4 The CI-needs spec scaffold

An onboarding step (optionally skippable, priced per P4) scaffolds a **spec in the consumer's repo** that configures DesignerPunk's CI needs to their environment — and if they have no CI at all, the spec can establish it. The CLI scaffolds; their agent executes; **we do not maintain per-vendor integrations** (the scaffolder-not-integrations boundary, § 11).

Under **R6** this is no longer a one-off scaffold but the **first of two shipped starter specs** — the P2 vehicle. See § 5.6 for the pair and its per-spec growth discipline.

### 5.5 Gate 3 — the five-minute test

**The cold-user half is RULED (R4, § 3.4)**: the blocking bar is the **persona-embodied agent trio** (backend engineer / designer / first-time PM), a standing regression instrument re-run per release; Peter's own run is non-blocking mechanics validation and is explicitly not a cold-human run; a cold-human run stays an open obligation triggered by the first willing stranger. The carried caveat — the trio measures **instruction clarity and path completeness**, a human measures **confusion** — is a limitation of the instrument, not a defect in it, and belongs in the requirement's own text so nobody later reads a green trio as "a stranger succeeded."

**What remains open is the bar's definition** (§ 10 Q1): explicit requirement (recommended), stated as a **bounded step count** with wall-clock **observed and recorded but not asserted** as an acceptance condition — a stranger's machine and network are not ours to promise.

### 5.6 Starter specs as onboarding curriculum (R6, § 3.6)

The package ships **executable specs as curriculum**. The mechanism is the vision's *"inherit the method by doing it once"*, made concrete and given an owner.

**Launch set — exactly two.** The set is deliberately tiny because the **support-surface counter-argument applies per-spec**: every shipped spec is a failure mode we own in an environment we cannot see. Growth is earned by evidence, not assumed.

1. **The CI-needs spec** — the **P2 vehicle**. Declared needs with their *why* and their gate-bite recipes; the consumer's agent maps them onto whatever CI exists (or establishes one). Mechanism/policy split intact: we own the needs, they own the fulfillment.
2. **Thurgood's re-grounding spec** — **consumer-Thurgood's first assignment is running his own onboarding**: re-point his charter at their repo (R5's re-grounding, § 7.2), establish their steering/spec surface, and **report what does not transfer**. That report is the highest-value artifact in the onboarding flow and it costs us nothing to collect — it is a re-grounding conformance test executed by the agent whose charter is most exposed to the imposter problem, in the consumer's own repo.

**Why this is the right pair.** They are complements, not two samples of one idea: (1) proves the *package's* needs can be met in a foreign environment; (2) proves the *agents* can be re-grounded in one. Together they exercise both halves of what R3 committed to shipping. They are also self-demonstrating — a consumer who runs both has used the spec method twice before writing a line of product code.

**Structural placement**: the specs themselves are **authored in U2** (they are agent-charter artifacts and depend on the re-grounding contract being settled) and **delivered by U3** (they are onboarding scaffolds). Recorded explicitly because a spec authored in one unit and shipped by another is exactly the kind of seam that goes missing between units.

**Constraint inherited from P5**: the starter specs are **harness-agnostic scaffolded files**, not a flow the CLI drives. Any agent picks them up. The moment a starter spec assumes Claude Code or Kiro, the environment-alignment problem re-enters through the side door.

---

## 6. Axis C — Content policy (gate 4, OPEN)

### 6.1 The measured surface (2026-09-20, re-measure at consumption)

`governance/` = **83 docs**, shipping wholesale. Of those, **18** name repo-internal authorities directly (`complete-task.sh`, "Peter merges", `taskStatus`, ballot ratification); **41** reference repo-internal paths (`.kiro/specs/...`) in some form. `.kiro/steering/` = **9** identity docs, all shipping and all copied by `init`, including `personal-note.md` (A10) and the always-loaded workflow law (`Task-Completion-Protocol.md`, `start-up-tasks.md`).

The banner precedent exists and is good: `governance/release-management-system.md` opens with an **audience-framing banner** (worked-example framing, role-named authorities) and even points at this spec's open question by name.

### 6.2 The three options — and the R1 tension that reshapes them

| Option | What it is | Cost | Fit with R1 |
|---|---|---|---|
| **(a) Audience banner** | Per-doc (or corpus-convention) banner marking internal-process docs as *DesignerPunk's worked example, not your law* | ~18–41 docs to band; one convention to police; a generator-or-lint guard to keep new docs banded | **Strong** — preserves the reference-corpus mode's raw material |
| **(b) Served/not-served split** | Internal-process docs excluded from `files[]` / MCP index | Cheapest to *state*, expensive to *get right*; every cross-reference into a pruned doc breaks; the 119-B bare-id defect class multiplies | **Poor for the secondary mode** — it deletes exactly what that mode came for |
| **(c) Both** | Split the genuinely repo-bound, band the rest | Highest effort; two mechanisms to maintain | Middle |

**The new tension R1 creates, named as instructed**: the reference-corpus mode **wants** the internal-process docs — *the intent is the product*. A foreign design system's agents get value from reading how a governed system actually runs its specs, its completion evidence, its ballots. Aggressive splitting optimizes the primary persona's cleanliness by destroying the secondary mode's substrate. **This pulls the recommendation toward (a) framing-with-banners over (b) splitting.**

**Recommended (for the round to attack): (a), with a hard carve-out.** Band the internal-process corpus; split out only what is *personal or non-transferable* rather than *internal* — `personal-note.md` (A10) is the clear member, and it is a different category from `Process-Spec-Planning.md`. Guard the banner convention mechanically (a new governance doc without an audience band fails a check), because a convention that depends on authors remembering is the DORMANT failure mode in prose form.

**Surviving counter-argument**: banners are read by agents that are *already* in a hurry and are exactly the kind of prose that context-window pressure elides. A banner is a mitigation whose efficacy we cannot measure in repos we never see, whereas a split is mechanically certain. The honest statement is that (a) trades certainty for the secondary mode, and the trade is only correct if the secondary mode is real — **which is why § 8's probe is slotted early, before U4 executes.** That sequencing is deliberate: if the probe shows foreign agents cannot extract value from the corpus, the argument for (a) collapses and (b) or (c) should be reconsidered at U4's start.

### 6.3 Release notes to consumers (conflict C4)

Today `docs/releases/*.md` are repo-only. Consumers on `npm update` get new behavior with no in-package record of what changed. The Q6 ballot deferred this here. Complication: **the tool that generated notes is retired** (kill-and-rewrite, ballot 2026-08-12), so there is no rendering pipeline to lean on, and the retirement execution (36-file inventory) is an open issue in its own session.

**Proposed disposition: a minimal, decoupled answer.** Ship a `CHANGELOG.md`-shaped consumer-facing delta (hand-authored at release, consumer-framed, one entry per release) rather than shipping or serving the internally-framed `docs/releases/*.md`. This satisfies "what changed between my installed versions?" without waiting on the retirement execution and without an editing pass on internally-framed prose. **Below the cut-line if Peter invokes reduce-not-grow** — it is the most deferrable item in Axis C because `npm` already shows version deltas and the consumer's real upgrade risk surface is `sync` (§ 4.4), not prose.

### 6.4 Packaging diet (A6) and `personal-note.md` (A10)

Baseline at 13.0.0: **2,547 files / 8.3 MB packed / 31.4 MB unpacked**. Known dead weight shipping via `files: ["src/"]`: `src/performance/` (~1,283 LOC, 0 importers, 0 tests), `src/workflows/` (~1,524 LOC, test-only importer), ~630 LOC of unimported `.example.ts` in `src/build/`. The audit's disposition is *deletion beats testing*, with the zero-importer claim verified first.

**Proposal**: the diet rides U1 and is scoped by D1's outcome. **Under R7's lean the ceiling rises**: with the ownership hatch being `git clone` rather than a built `eject` (§ 4.2), `src/` no longer has to ship *for ownership reasons* at all. The floor is whatever consumer authoring genuinely needs to resolve (config, `defineComponentTokens`, the type surface) — **determined by measurement in U1, not asserted here**, and explicitly put to Ada in the round. **Re-measure the tarball at the start of U1 and at U5; the delta is a success criterion**, not a vanity metric — it is the direct proxy for how much unrelated material a consumer's agent must reason past.

**`personal-note.md` — RULED (Peter, 2026-09-20; § 3.7): template-ize inside 123, landing in U3.** The shipped form becomes a **template scaffold that onboarding personalizes per-user on install**, not Peter's personal letter. Audit finding **A10 is dissolved** — there is no exclude-vs-confirm adjudication left to make — and the already-deferred "Personal Note template" item is **pulled forward from its second-customer trigger**.

This is a better answer than the draft's recommended exclusion, and worth naming why: the *content* does not transfer, but the *slot* does. An always-loaded doc where a human tells their agents how they want to be worked with is a real part of the collaboration architecture; deleting it would have shipped the mechanism's absence as if it were the mechanism's irrelevance. Two execution consequences: (i) the dangling résumé reference disappears with the personalization pass rather than needing its own fix; (ii) `sync` must **never overwrite** a personalized note (§ 4.4).

### 6.5 The owed U1b audience-ruling backward check

**Slotted in U4, at gate 4's settle.** The 125-B campaign closed without an explicit "who is the education layer for" ruling on record; prunability is audience-relative (a clause redundant internally can be load-bearing for a consumer). Once gate 4 settles, a **one-time review of the campaign's prunes against consumer-serving needs** is owed — scoped to `governance/` prunes only, with any finding routed to the owning domain agent, not fixed in 123.

---

## 7. The consumer generation profile (R3's guardrail + R5's contract, made concrete) — UNIT U2

### 7.1 What it is

A **generation profile** in the 122 pipeline that emits *consumption-scoped* agent charters from the same canonical sources, via the same `TargetAdapter` interface, diff-guarded by the same guard surface. One canonical source; two profiles (steward / consumer); zero hand-maintained consumer prompts. `product-template/agents/` (D-live-3) is **deleted and replaced by generator output** — it is the standing proof of what hand-maintenance costs.

**Scope, per R5: all eight agents ship** (§ 3.5). The profile's job is re-grounding, not selection — there is no agent-by-agent ship/don't-ship judgment to make, which removes the draft's Q4 entirely.

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

**The check runs in both directions**, and that bidirectionality is what the pure-subtraction version was missing: (i) **no repo-specifics present** (the old sweep), and (ii) **the role's verbs still present** — a charter that lost its domain is a failed re-grounding, not a clean subtraction. A one-directional checker would score an empty file as perfect.

**Consequence: the "collapse case" dissolves.** The draft worried that an agent's charter might reduce to near-nothing — Thurgood's being the obvious candidate, since his scope reads as stewardship *of this repo*. That was a framing artifact: the charter is about stewarding *a* repo. **The author's stake is on the record** (§ 3.5) and the round should press if the reframe reads as self-serving; the defense is that it is testable, via (ii).

**Thurgood's re-grounding spec (§ 5.6) is this contract's conformance test**, executed in the consumer's own repo by the agent most exposed to the imposter problem, with "what did not transfer" as its deliverable.

### 7.3 Delivery form — generate-at-init vs ship-pre-generated

Recommended: **generate at `init --target`**, which requires shipping `canonical/` + the compiled generator + the consumer profile in `files[]`.

- Preserves 122's additivity property (a new target = a new adapter, no pipeline change) *in the consumer's hands*, which is what makes Cursor-or-whatever-comes-next cheap later.
- Avoids shipping N pre-generated artifact sets for M agents (and the guard surface to keep them all fresh).
- Makes `sync` coherent: regeneration is the refresh mechanism, so the 121 Req 4 staleness class closes structurally rather than by copy-diffing.

**Counter (real, and it is the packaging-diet tension)**: shipping `canonical/` + the generator adds weight to a package we are simultaneously putting on a diet, and it exposes internal authoring substrate to consumers. Pre-generating is lighter and more opaque. The counter partially folds back — the diet's savings (§ 6.4) exceed the generator's cost by an order of magnitude on current figures — but **the "exposes internal substrate" half survives**: `canonical/` is written in DesignerPunk's steward voice and shipping it hands consumers the un-subtracted source next to the subtracted output. Mitigation available: ship canonical *filtered by profile* rather than whole. That mitigation is itself a design question → § 10 Q5.

### 7.4 Acceptance for U2

A consumer repo, after `init --target=<tool>`, has agent artifacts for **all eight agents** that: (i) load in that tool; (ii) pass the **re-grounding contract check in both directions** — zero repo-specifics present AND the role's verbs still present (§ 7.2); (iii) route only to docs that exist in the consumer's install; (iv) are regenerable by `sync` after `npm update`; (v) are certified through the **packed-install consumer guard**, never an in-repo load; and (vi) include **Thurgood's re-grounding spec** (§ 5.6), whose execution in a consumer repo is the contract's end-to-end conformance test.

---

## 8. The reference-corpus secondary mode and its cheap validation probe

**The mode** (R1): a foreign design system's agents install `@3fn/core`, connect the docs MCP, and extract intent and worked execution — token governance reasoning, contract thinking, completion-evidence discipline — **without adopting DesignerPunk's artifacts**.

**The probe (proposed as an early task, and as an AC candidate)**: **one recorded transcript.** A fresh agent session with no DesignerPunk context, working in a *different* design system's repo, given the installed package and the docs MCP, asked to do a gap-fill task (e.g. "how should component token authoring be structured here, and why?" / "what would a behavioral contract for our button look like?"). Record: what it found, what it mis-took as binding on itself (the imposter test at reference grain), and where discovery failed.

**Why a probe and not a requirement**: the mode is *one observed behavior*, not proven demand. A probe costs an afternoon and produces evidence; a requirement costs a unit and produces a commitment. **Placement matters**: the probe runs **before U4 executes** because its result is live input to gate 4's banner-vs-split recommendation (§ 6.2). Acceptance for the probe is *a recorded transcript and a named finding list* — explicitly **not** a pass/fail bar, because we have no baseline to judge against and inventing one would be theater.

---

## 9. Proposed unit structure (gate 5) and the reduce-not-grow cut-line

Per Task-Completion-Protocol § "Coherent Units": large specs **declare** their merge units in `tasks.md`, named up front and reviewed in the tasks round, never judged at merge time.

### 9.1 Proposed declared merge units

| Unit | Content | Why it is coherent on its own |
|---|---|---|
| **U1 — Distribution substrate & packaging truth** | D1 under R7's lean (no `eject` command — the clone hatch replaces it) · `files[]` rescope + packaging diet (A6), floor set **by measurement** · raw-`.ts` export reconciliation (117 §2) · **`sync` registry-pin detection** (U1's only registry obligation; the template defect is already repaired by PR #192) · consumer-guard extension for all of the above | Ships a correct package; reviewable as one diff; nothing downstream can be trusted until the package's contents are true |
| **U2 — Consumer generation profile** | The profile + adapter work for **all eight agents** · **the re-grounding contract + its bidirectional sweep** (§ 7.2) · **authoring the two starter specs** (§ 5.6) · delete `product-template/agents/` (D-live-3) · consumer CC always-layer delivery (122 handback) · `sync` regeneration | R3's guardrail plus R5's contract, whole. Standalone-valuable even if onboarding slipped |
| **U3 — Onboarding: install doc, starter specs, personalization** | Install doc (incl. the reference-corpus section and the **clone-hatch paragraph**, under 119-B constraints) · P3 tier list filtered by P2 · gate-bite recipes · **delivery of both starter specs** · **`personal-note.md` template-ization + the per-user personalization step** (§ 3.7) · `init --target` UX for the persona | The experience spine; depends on U1's package truth and U2's agent set + starter specs being real |
| **U4 — Content policy execution** | Gate 4's outcome: banner convention + its guard · release-notes disposition (if kept) · the owed U1b backward check · Product MCP consumer-side population *(the `personal-note.md` item moved to U3 — it is now a personalization feature, not a corpus-policy call)* | One policy, applied once across the corpus |
| **U5 — Validation & closeout** | **Persona-trio cold runs (the blocking bar, R4)** + their triage findings · reference-corpus probe transcript (**runs early, lands here**) · Peter's non-blocking mechanics run · tarball re-measure · closeout + claims pass | The acceptance evidence, in one place |

**Ordering**: U1 → U2 → U3 → U5, with **U4 parallelizable against U2/U3 only on Peter's explicit direction** (default is sequential per TCP: dependent units branch from `main` after the prior merge). **U2 and U4 have a genuine two-way coupling** — U2's valid route set depends on U4's content policy (§ 7.2). Proposed resolution: **gate 4 settles at outline settle** (it is a decision gate, not an execution unit), so U2 executes against a settled policy even though U4 applies it later. If gate 4 does not settle at outline settle, U4 must move ahead of U2 and the ordering changes.

**One seam named explicitly** (R6's consequence): the **starter specs are authored in U2 and delivered by U3**. A deliverable split across two units is the classic between-units drop, so U2's success criteria must include *the specs exist and pass the re-grounding check*, and U3's must include *both specs are scaffolded into a consumer repo and executable there* — neither unit may claim the other's half.

**A trio-run note for U5**: the persona trio is a **standing regression instrument re-run per release**, not a one-time gate. U5 executes the first run; the *recurring* obligation outlives 123 and needs a home in the release recipe. Flagged rather than assigned here — it is a governance placement question, and placing it in `governance/release-management-system.md` would be a ballot-measure change, not a 123 edit.

### 9.2 The reduce-not-grow cut-line (what I would cut, in order, and what I would not)

C1 is the recorded tension — fold-in pressure scopes 123 up; Peter's 2026-08-11 refinement says scope can likely be *reduced*, not grown. **R3 sharpened it by adding a unit; R6 added a deliverable; R7 and PR #192 gave two back.** Net, the second sitting was close to scope-neutral, which is worth recording because it is not the direction these sittings usually go:

| Movement | Effect |
|---|---|
| R6 starter specs (two) | **+** U2 authoring, U3 delivery |
| R4 persona trio (three runs, not one proxy) | **+** U5 |
| R7 clone hatch replaces a built `eject` command | **−** U1 |
| PR #192 repairs D-live-1 out-of-band | **−** U1 |
| `personal-note.md` ruled (§ 3.7) | **=** moves U4 → U3; no adjudication needed |

Saying plainly what goes first, as instructed:

**Cut in this order:**
1. **Benchmark rider** (Astryx-vs-DP manual comparison) — out. It is marketing evidence, not distribution; it has no dependency on 123 and can run any time after the package is installable.
2. **Release-notes shipping** (§ 6.3) — defer to the Q6 retirement-execution session, where its natural owner already sits.
3. **Cursor adapter** — defer. Additivity is already proven by the Kiro adapter; `.cursor/rules/...` stays a named drift surface.
4. **MCP infra-ring consolidation** (§ 4.7) — out of 123; repo-internal quality, invisible to consumers.
5. **U4 collapses to banner-only** — drop any served/not-served split work; band the corpus and stop. (The split is the expensive half and § 6.2 already argues against it.)
6. **The persona trio reduces from three runs to one** — persona (c), the first-time PM, the no-floor case. This loses the *triage* property R4 was designed for (you learn **whether**, not **where**), so it is a genuine capability loss, not a trim. Named here so the cost is visible if it is ever taken.
7. **Starter specs reduce from two to one** — keep the **CI-needs spec** (P2's vehicle, non-negotiable content); defer **Thurgood's re-grounding spec**. This is the last cut before the floor, and it costs the conformance test for R5's contract (§ 7.2 would then be checked only by the static sweep, never end-to-end in a consumer repo).

**Hard floor — cannot be cut without breaking a ruling or a non-negotiable:**
- U1 (a package that ships dead source and cannot repair a pinned consumer fails any bar)
- U2 (R3's guardrail + R5's contract; and it repairs D-live-2, live today and formally routed here)
- U3's **install doc with P2 gate-bite recipes** (P2 is non-negotiable by Peter's own designation) **and the `personal-note.md` personalization** (ruled, § 3.7)
- U5's **persona-trio run** in whatever reduced form survives (R4's bar, by definition)
- The reference-corpus **probe** stays even under maximum reduction — it is the cheapest item in the spec (one transcript) and it is live input to U4.

**Candid note on the cut-line**: even fully cut, this is a four-unit spec. If Peter wants 123 genuinely small, the honest lever is not trimming items — it is **splitting U3+U4 into a successor spec (123-B, "Onboarding & Corpus Policy")** and landing U1+U2+U5 as "123 — Consumer Distribution: the package is correct and the agents ship." That is a real option and I am surfacing it rather than picking it; it costs a second formalization cycle and it delays the experience spine, which is the half Peter's own vision session was most animated about.

---

## 10. Open decision points for the feedback round and Peter

Gates 3 (remaining half), 4, 5 plus four execution questions. **Q3 and Q4 are RESOLVED by the second sitting and are retained below as closed items with their rulings, not deleted** — a question that vanishes silently invites its own re-asking.

**Q1 — GATE 3's remaining half: the bar's definition.** Make the five-minute test an explicit requirement (recommended by the record)? What does "minutes" mean — a measured wall-clock number, or a bounded step count? *Recommendation, unchanged by the sitting: an explicit requirement, stated as a bounded **step count**, with a wall-clock observation **recorded but not asserted** as an acceptance condition, because wall-clock on a stranger's machine and network is not ours to promise.* The *who* half is settled (R4).

**Q2 — GATE 4: consumer corpus policy.** Banner / split / both, plus release-notes and packaging diet. Recommendations in § 6; the R1 tension is named in § 6.2. **This gate should settle at outline settle** because U2's route set depends on it (§ 9.1). *(The `personal-note.md` sub-item has left this gate — ruled, § 3.7.)*

**Q3 — RESOLVED (Peter, 2026-09-20) → R4, § 3.4.** *Was: who is the cold user?* Ruled: **persona-embodied agent trio** (backend engineer / designer / first-time PM) as the blocking bar and a standing per-release regression instrument; Peter's own run is non-blocking mechanics validation and explicitly not a cold-human run; **cold-human remains an open obligation** with a named trigger (first willing stranger). The counter this outline could not answer — *an agent proxy cannot feel confusion* — was **not dissolved but institutionalized**: the trio measures instruction clarity and path completeness; the human measures confusion. Recording that distinction is the better outcome than a resolution would have been, because the limitation now travels with the instrument instead of being forgotten once the bar goes green.

**Q4 — RESOLVED (Peter, 2026-09-20) → R5, § 3.5.** *Was: does "full agent org" mean all eight charters, and what happens to one that collapses under subtraction?* Ruled: **all eight ship**, and the contract is **subtraction + re-grounding** — the role ships intact, re-pointed at the consumer's repo; only this repo's specifics are removed. **The collapse case was a framing artifact** and is dissolved (§ 7.2). The author was a named party and did not self-adjudicate; the reframe happens to preserve his charter, which is stated on the record so the round can press on it. **Note the ruling's reach**: it settles *what ships* and *what the charter must contain* — not Q5 (how it is delivered) or Q6 (what a consumer imports).

**Q5 — Ship `canonical/` whole, or filtered by profile?** (§ 7.3's surviving counter.) Whole is simpler and regenerable; filtered protects the steward voice from leaking next to the re-grounded output. Weight vs. opacity. **R5 sharpens this**: with re-grounding rather than subtraction, the un-filtered canonical source is not merely "more verbose than the output" — it is *addressed to a different repo*, which makes leakage more confusing, not less. Mild pull toward filtered; still open.

**Q6 — D1, OPEN WITH A RECORDED LEAN** (§ 4.2, § 3.8). Peter **leans package-consumed-primary**, with the GitHub repo clone as the DIY-ownership hatch and package mode positioned as the path for continual updates. He **explicitly wants round input**, and named **Ada** in particular: *what does package-primary mean for consumer token authoring?* The positioning counter (defaults are the product; package-primary reads as dependency, not capability) survives and is live. Argue the substance — the lean sets where the burden of persuasion sits, not that the matter is closed.

**Q7 — D2's mirror tax** (§ 4.3). Keep the undocumented GH-Packages mirror and pay per-release verification, or drop it and delete the tax. **Not picked, and unaffected by PR #192** — the template repair landed under either disposition, which is the separation argued in § 4.3, now load-tested rather than merely asserted.

**Q8 — Lina's 124 authoring convention** (§ 4.5). Lint rider (small, inside 123) vs rename-by-mechanism (breaking, its own spec). **Lina's call; wanted early in the round because it moves 123's scope.**

---

## 11. Accepted risks and recorded counter-arguments (AICP)

Carried from the onboarding inbound, unerased, plus new ones this outline creates:

- **Spec quality in unknown harnesses.** Our specs are good because of the pipeline around them; a consumer's agent of unknown quality produces a spec of unknown quality. Mitigations: P2's bite proofs (the spec is not done until each need PROVES armed) + verification recipes in the install doc. **Residual accepted knowingly.**
- **Support surface at solo scale.** Shipping onboarding flows means owning failure modes in environments we do not control (version skew, deleted docs, exotic CI). This bounds how much the install doc may promise — a design constraint, not just a caveat. **R6 gives it a concrete governor**: the counter applies **per starter spec**, so the launch set is two and growth is earned by evidence. That is the risk metabolized into a rule rather than left as a worry.
- **Scaffolder-not-integrations boundary.** If onboarding trends toward standing per-vendor CI integrations maintained by us, that is the escalate-don't-build smell at product scale. **Named as a tripwire, not a prohibition.**
- **R3's scope growth.** Peter took this on deliberately; § 9.2 states the cut-line rather than pretending the growth is free — and records that the second sitting was close to scope-neutral (R7 and PR #192 gave back roughly what R4 and R6 added).
- **Two profiles to guard.** One canonical source, two rendered profiles, two guard surfaces. 122's machinery makes this cheap, but "cheap" is not "free," and the steward profile carries all the ongoing churn — the consumer profile will be the one that quietly rots. *The bidirectional re-grounding sweep is the mitigation; its absence would be the rot.*
- **Persona agents under-simulate confusion (new, R4's carried caveat).** They **role-play** ignorance rather than possessing it. The trio measures instruction clarity and path completeness; a human measures confusion. **The named rot mode: a green trio read as "a stranger succeeded."** The mitigation is textual — the limitation belongs in the requirement itself (§ 5.5), not only in this outline — and it is weak precisely because it is textual. The cold-human obligation is the real mitigation, and it is unscheduled by construction.
- **Starter specs are shipped surface we cannot observe running (new).** Two executable specs in strangers' repos, executed by agents of unknown quality, against environments we never see. P2's bite proofs cover the CI spec's failure mode; **Thurgood's re-grounding spec has no equivalent proof-of-arming**, and its deliverable ("what did not transfer") only reaches us if a consumer chooses to send it. Accepted: the spec's value is local to the consumer even when we learn nothing.
- **The secondary mode is unproven (new).** One observed behavior. § 8's probe is sized to that uncertainty, and § 6.2's recommendation is explicitly contingent on the probe's outcome.
- **The strategic counter still standing** (WordPress-thesis note): *the plan optimizes toward an unvalidated market.* Zero external consumers today. The lean counter-position — get the rough package into three strangers' hands now rather than hardening it — has real merit, and 123 is precisely the spec where that argument bites hardest, because 123 IS the hardening. **The honest framing: if U1+U2 land and U3/U4 start sprawling, that is the signal to ship what exists and find a stranger.**

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

Selected per Spec-Feedback-Protocol § "Stakeholder Identification" — domain ownership, output consumption, governance stake, platform expertise.

| Reviewer | Status | Why, and what to attack |
|---|---|---|
| **Lina** | **REQUIRED** | Owns the 124 authoring-convention seed (§ 4.5, Q8 — **wanted early, it moves scope**); owns component packaging under R7's lean (§ 4.2) — including what the clone hatch means for a consumer who wants to fork one component rather than the system; owns the generator/adapter surfaces U2 extends (§ 7) |
| **Ada** | **REQUIRED — with a directed question from Peter** | **Peter named Ada specifically on Q6 (§ 3.8): what does package-consumed-primary mean for consumer token authoring?** Also: `src/`'s shipping floor under the clone hatch (§ 6.4 — the diet's ceiling rose and the floor is now an open measurement), `token-index/` shipping, consumer theme registration, and whether package-primary preserves the C′ consumer-aware catalog property |
| **Stacy** | **REQUIRED** | Process quality + claims (she was required on 127); owns the verifiability LENS on acceptance criteria — **especially Q1 and R4's trio**: "five-minute test", "persona-embodied trio", and "one recorded transcript" are exactly the criteria shapes that read as verifiable and are not. Two specific asks: (i) does the § 7.2 re-grounding check **falsify in both directions**, or only the subtraction one? (ii) is the U2-authors / U3-delivers seam on the starter specs (§ 9.1) a between-units drop waiting to happen? |
| **Leonardo** | **REQUIRED** | Product MCP consumer-side population (§ 4.6) is his routed surface; he is the closest thing we have to the consuming persona's advocate, so R1's install UX and **R4's three personas** are his to critique — are those the right three failure axes? |
| **Kenya / Data / Sparky** | **NOT TAGGED for R1** | Justification: 123 ships no platform implementations and changes no platform APIs. The cross-platform *generation* a consumer gets is Ada's pipeline and Lina's components; the platform agents' consumption patterns are unchanged by distribution form. **They come in at the tasks round IF Q6 lands on package-primary** (which is now the recorded lean, so treat this trigger as likely rather than hypothetical) — that changes what a platform implementer imports in a consumer repo. The trigger is recorded so the omission stays a decision, not an oversight |
| **Peter** | Settles | Gates 3 (remaining half), 4, 5 and Q5–Q8. Q3/Q4 already ruled (§ 3.4, § 3.5) |

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

---

*Draft. Feedback round open at `.kiro/specs/123-consumer-distribution/feedback/design-outline.md`.*
