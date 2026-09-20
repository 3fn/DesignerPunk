# Requirements Document: 123 — Consumer Distribution

**Date**: 2026-09-20
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: Requirements Phase — **DRAFT, awaiting the requirements feedback round.** Authored from the settled outline (merged at `a062f44b`, PR #194 — Peter's merge was the formal settle act). Per the sequential formalization gate, `design.md` does not open until this round completes.
**Dependencies**: Spec 118 (module-resolution contract — shipped) · Spec 122 (agent generator; `TargetAdapter` seam — complete) · Specs 117 / 121 / 124 (consumer token loading, MCP delivery layer, component-token return contract — complete) · Spec 127 (completion-claims convention — ratified law this spec's execution runs under) · Spec 101 (its deferred two-consumer-paths finding; 123 is the named follow-up)

---

## Introduction

Spec 123 makes `@3fn/core` install into a stranger's repository and work. The decision surface closed at the settle sitting (Peter, 2026-09-20): **sixteen decisions are ruled**, and these requirements formalize them. **They decide nothing and reopen nothing.**

Every requirement traces to its source, cited inline as *Traces:*. Where a restatement here and its source disagree, **the source governs**, in this order:

1. `design-outline.md` — **SETTLED** (merged `a062f44b`), including the settle-sitting rulings (gate 4a, gate 4b, gate 5, Q5, Q6) and the three prior sittings (R1–R9, Q1, Q3, Q4, Q7, Q9, the § 7.2 fork).
2. `feedback/design-outline.md` — the full round record: R1 (four reviews, 18 blocking), R2/R3/R4 incorporations, **Stacy's two falsification passes**, and the settle record.
3. `probes/reference-corpus-probe-record.md` — the reference-corpus probe (**SUPPORTS**, with the citation-fidelity residual).

**The requirements feedback round reviews formalization fidelity and surfaces execution consequences. It is not a re-litigation surface.** Reviewer attribution is preserved throughout — where a reviewer's finding became a requirement, the requirement names them, because a condition that loses its author loses its reason.

### Structure: five declared units

Gate 5 ruled **one spec, five units** (the unanimous round position). Requirements map to units; the units are declared in `tasks.md` at that phase per Task-Completion-Protocol § "Coherent Units".

| Unit | Scope | Requirements |
|---|---|---|
| **U1** | Distribution substrate & packaging truth | 1–8 |
| **U2** | Consumer generation profile | 9–14 |
| **U3** | Onboarding: install doc, starter specs, personalization | 15–19 |
| **U4** | Content policy execution | 20–21 |
| **U5** | Validation & closeout | 22–25 |
| **all** | Execution constraints (cross-cutting) | 26 |

**Ordering is UNCONDITIONAL: U1 → U2 → U3 → U4 → U5.** The conditional that once governed it (*"U4 precedes U2 and U3 iff gate 4 prunes the served corpus"*) was **discharged by gate 4a** — the corpus ships whole, so nothing prunes by ruling. *Traces: outline § 9.1.*

### Explicit exclusions (decisions, not oversights)

- **125 Phase 3 (consumer-side enforcement) is OUT**, and package layout SHALL NOT preclude it. *Traces: outline § 12.*
- **No re-fixing F-C1 / F-C2 / F-C6**, and **no re-implementation of MCP server-side data-root fallback** — closed by 118's contract and the F-C2 patch. *Traces: outline §§ 4.1, 12.*
- **No plugin / third-party-contribution contract**; **no benchmark harness** (manual-first). *Traces: outline § 12.*
- **The `*.refs.ts` rename is NOT a 123 requirement** — it is Lina's own bounded issue, gated to land before U3 ships the install doc. *Traces: outline § 4.5 (Q8, ruled by Lina).*
- **The Q6 release-manager retirement execution** stays its own session. *Traces: outline § 12.*
- **The MCP infra-ring consolidation** is out; `FileWatcher`'s divergence is a named issue, not 123 scope. *Traces: outline § 4.7.*
- **The trio's RECURRING per-release obligation is not a 123 requirement** — it is a named handoff; see Requirement 23.7.

### Framing obligation, carried at the top

> **§ 7.2's re-grounding check has failed falsification twice and is NOT signed off.** These requirements specify it as ruled — including the substrate Peter bought and the criterion pre-stated for pass four — but **nothing here should be read as evidence the check works.** A green deterministic sweep is not evidence that a consumer charter was re-grounded; that is the exact error the two failed passes exist to prevent. *Traces: outline § 7.2; `feedback/design-outline.md` § [STACY R2], § [STACY R3].*

---

## Requirements

## UNIT 1 — Distribution substrate & packaging truth

> **U1's internal sequence is itself a requirement, because each step's correctness depends on the one before it: decide the authoring API (R1) → extend the packed-install arbiter (R3) → diet to the resulting floor (R4).** A diet run before the API decision cuts against an unknown contract; a diet certified by a blind arbiter is not certified. *Traces: outline §§ 4.2, 6.4; Ada B1/B2/B3.*

### Requirement 1: Consumer authoring API surface (Q6 condition — Ada)

**User Story**: As a solo technical founder who has installed the package, I want a supported path to author my own themes and component tokens against the package, so that package-primary consumption does not silently require me to own copies of DesignerPunk's source. *Traces: outline § 4.2, § 3.8 (R7 → Q6 ruled); Ada B1, Ada R1 Q6 position.*

#### Acceptance Criteria

1. The package SHALL expose a **public token-authoring export subpath** exporting `SemanticOverrideMap` and the reference theme overrides (`dark`, `wcag`), so a consumer can import the shipped overrides as a starting point through the exports map rather than through a filesystem path. *(Today they are encapsulated dead weight — the compiled overrides ship, and Node's `exports` encapsulation blocks importing them.)*
2. `generateConfig()` SHALL emit a config that imports from that subpath, NOT a relative path into a copied `src/` tree. **WHEN the copy steps are removed (Requirement 19.1) THEN the previously emitted relative import SHALL NOT dangle** — this criterion and that one are a matched pair and neither is complete alone.
3. The **C′ consumer-aware catalog property SHALL be written as an acceptance criterion of this unit, not inherited from the outline's "pre-solved substrate" table.** The property: the Application MCP answers about **the consumer's** design system, resolved from their active config/source. *Traces: Ada's Q6 position — "what makes the consumer's design system theirs is not owning our source files, it is the catalog answering about their tokens."*
4. The resolution of consumer `defineComponentTokens` authoring SHALL be determined and recorded: **whether the harvest can read the package's compiled `dist/components/*/[Name].tokens.js`.** IF it can THEN the `.ts` web-implementation mass leaves the shipping floor; IF it cannot THEN either the `.tokens.ts` files stay on the floor or the config template re-points. *(One command; it is Requirement 4's floor question one layer down.)* *Traces: Lina R2 § 1, joint item; Ada B1.*
5. Requirements 1.1–1.3 are **hard preconditions on package-primary (Q6)**. Both domain owners recorded their support as wholly contingent — Ada: *if the diet cuts `src/tokens`, package-primary collapses into dependency-consumption and the positioning counter is simply correct.*

### Requirement 2: Component catalog merges, never replaces (Q6 condition — Lina, Leonardo)

**User Story**: As a consumer authoring my first component, I want my component to appear **alongside** the ecosystem's components rather than replacing them, so that my most predictable first action does not silently delete my component library. *Traces: outline § 4.2; Lina B2 (blocking), Leonardo A14.*

#### Acceptance Criteria

1. The consumer-owned component root SHALL resolve as **union-with-precedence**: package components ∪ consumer components, with the consumer winning on name collision. It SHALL NOT resolve as first-non-empty-wins.
2. WHEN a consumer's component directory is empty THEN the catalog SHALL present the full ecosystem component set. WHEN the consumer adds one component THEN the catalog SHALL present the ecosystem set **plus** that component — never that component alone.
3. The scaffolded `COMPONENTS_DIR` SHALL NOT resolve to a location that produces a **silently empty** catalog under package-primary. *Traces: Leonardo A14 — "every screen-specification workflow dies quietly with a healthy-looking index."*
4. Requirement 2.1 SHALL land **before U2 or U3 depend on the catalog's contents.**
5. The per-component ownership path SHALL be this merge, not a command: **a consumer drops their fork in and it wins on its name; everything else continues to come from the package.** The install doc SHALL present this as the *first* ownership answer, with the repo clone as the whole-system escalation (Requirement 15.6). *Traces: Lina R1 Q6 — this answers § 14's "fork one component rather than the system" better than the retired `eject` would have.*

### Requirement 3: The certification arbiter covers the paths it certifies

**User Story**: As anyone who will later read "certified by the packed-install consumer guard" in a completion doc, I want the arbiter to actually exercise the path package-primary makes default, so that a green gate is not evidence about a path no consumer takes. *Traces: outline § 4.1 (arbiter qualification); Ada B2 (blocking), Lina B3 (blocking), Ada A4, Stacy R2 Part 2.*

#### Acceptance Criteria

1. **The arbiter is the packed-install consumer guard (`npm run test:consumer`). Certification SHALL NEVER be claimed from an in-repo load** — that false-greens. This rule is restated here rather than inherited, because three R1 findings showed the "pre-solved substrate" table stating arbiter rows as unqualified truths.
2. The guard SHALL gain a **packed-install package-mode case**: token resolution with `tokenSource` omitted, through real scoped resolution in a packed install. *(Today the only packed-install arbiter exercises `init`'d local mode every time, and the in-repo package-mode test states its own limit: "Real scoped resolution in a packed install is certified by the consumer guard" — and it was not.)* *Traces: Ada B2.*
3. The guard SHALL gain a **silent-zero hardening on the component surface**: `get_component_catalog` asserting a non-zero ecosystem component count from a packed install with an **empty** consumer components directory. *(The existing assertion is `expect(get_component_health()).toBeDefined()`, and a zero-component index returns a perfectly well-defined health response. The token surface was hardened against this exact class; components never were.)* *Traces: Lina B3.*
4. The guard SHALL gain a **consumer-component-alongside case** asserting a consumer-added component appears **with** the ecosystem components, not instead of them (Requirement 2.2's arbiter).
5. The **Class C′ fixture SHALL be re-premised**: it currently builds on the `init` copy that gate 4b removes, and its own comment says so. It SHALL be re-authored to build the consumer's component tree **from nothing** — which is the stronger test, proving C′ for a consumer owning zero schemas. *Traces: Ada A4, Lina B3.*
6. Each new guard case SHALL ship with a **bite recipe** — introduce the deliberate failure, observe red, revert — recorded with the case. *Traces: Stacy R2 Part 2 — "a guard case added to an existing suite is the single most likely place for a silently-not-running test."*
7. Requirements 3.2–3.5 are **hard preconditions on package-primary** and are owed in **U1, not U5**. *Traces: Stacy R2 Part 2 — in U5 they validate something already built on an uncertified default; in U1 they are the certification that makes the default adoptable.*
8. **Every row of the outline's "pre-solved substrate" table SHALL carry the path it was proven on** when restated in design or tasks artifacts. *Traces: Stacy R2 Part 2 — "a table of pre-solved things is exactly where a spec stops re-verifying."*

### Requirement 4: The packaging floor is a decision, and it is pinned

**User Story**: As a consumer's agent reasoning about an installed package, I want the package to contain what consumption needs and not the material that only DesignerPunk's own development needs, so that I reason past less irrelevant surface — without any load-bearing asset silently disappearing. *Traces: outline § 6.4; Ada B3 (blocking), Ada A3, Lina B1 (blocking), Lina R2 § 1.*

#### Acceptance Criteria

1. The floor SHALL be **decided downstream of the authoring API (Requirement 1), not discovered by measurement.** *Traces: Ada B3 — "measurement tells you what resolves today, and today everything resolves because `init` copies."*
2. The following SHALL be on the shipping floor and SHALL be expressed as **explicit `files[]` entries**, never inherited from a wholesale `src/` that a later narrowing can silently take:
   - `src/tokens/**` — load-bearing at generate-time in package mode
   - `src/styles/`, `src/assets/fonts/**` — the `./fonts/*.css` and `./grid.css` exports resolve here; the dist glob excludes `woff2`
   - `src/cli/templates/`
   - **`src/components/**/*.{schema.yaml,contracts.yaml,component-meta.yaml}`** — the component metadata floor
3. WHEN the component metadata is absent from the resolved root THEN the component catalog is **empty in package mode**, and `get_component_health` reports that as **healthy** — so this floor member SHALL be pinned and SHALL be covered by Requirement 3.3's assertion. *(No compiler emits these: `find dist -name "*.schema.yaml"` returns zero, because the dist glob carries no `.yaml`.)* *Traces: Lina B1.*
4. `__tests__` and `examples` under `src/components/**` SHALL NOT ship. *Traces: Lina R2 — ~1.54 MB, "the only place in the diet where an item is mass rather than hygiene," and 30× the audit's named dead directories combined.*
5. The disposition of **`.swift` and `.kt` component sources** SHALL be decided by **Kenya and Data**, not by this spec's authors. `dist` carries three `.swift` and three `.kt` files in total, so **`src/` is the only rail platform sources reach consumers on**; cutting the tree wholesale would ship iOS and Android consumers a design system with **no component implementations at all**, while web consumers remain served by compiled `dist`. *Traces: Lina R2 § 1 — this is the content of § 14's recorded platform-agent trigger.*
6. The audit's dead directories (`src/performance/`, `src/workflows/`, unimported `.example.ts`) SHALL be deleted as hygiene, with the zero-importer claim verified first — **and SHALL NOT be described as the diet**, since they are ~0.5% of the mass. *Traces: Ada A3.*
7. U1 SHALL **declare a tarball target** derived from the decided floor, naming **which lever it measures**; U5 asserts against that declared target (Requirement 25.3). A bare delta SHALL NOT be used as a criterion — *"a delta with no direction and no floor is satisfied by any value, including a positive one."* *Traces: Stacy A4, Ada A3.*

### Requirement 5: Scaffold and registry repairs

**User Story**: As a consumer who ran `init` before these fixes, I want `sync` to detect and offer to repair what the old scaffolder wrote into my repo, so that a defect repaired in the package is also repaired in the repos it already damaged. *Traces: outline §§ 1.3, 4.3, 4.4; D-live-5 issue record; Leonardo A7 (D-live-6).*

#### Acceptance Criteria

1. `sync` SHALL detect a pre-existing `@3fn` → GitHub-Packages scope-mapping in a consumer `.npmrc` and offer repair **with a named explanation** — never silently, never as fine print (P4's discipline applied inward). *(The template defect itself was repaired out-of-band at PR #192; this is the already-pinned population.)*
2. `sync` SHALL detect and offer repair of a scaffolded `tsconfig.test.json` carrying `paths` overrides that re-pin package subpaths to raw `src/`. *(Template repaired at PR #193; record `.kiro/issues/archive/2026-09-20-init-tsconfig-src-repin.md`.)*
3. The scaffolded MCP config's `autoApprove` lists SHALL be **generated from the servers' tool registrations**, not hand-maintained. *(Measured drift: the docs entry omits `find_docs` — the discovery entry point every routing row in every charter begins with — and the application entry approves `validate_component`, which is not a registered tool, while omitting 15 of 21 that are.)* *Traces: Leonardo A7.*
4. WHEN a server's registered tool set changes THEN the generated `autoApprove` list SHALL change with it, with no hand edit required.
5. `sync` SHALL **report, never silently overwrite** consumer-owned files — and SHALL **report, never silently skip** where a scaffold target already exists (Requirement 19.3's inverse). *Traces: outline § 4.4; Leonardo A17 — "both directions of that rule are load-bearing and only one of them is currently written down."*
6. `sync` SHALL implement **three-way comparison** — package baseline vs consumer current vs newly generated — so it can distinguish "we changed it" from "they changed it" from "both". It SHALL NOT reuse the generator's bidirectional diff-guard semantics, under which *a hand-edited file, a stale extra, or a missing output all FAIL* — correct in this repo, wrong in a consumer's, where a hand-edited agent is legitimate. This requires shipping or recording a baseline, which nothing does today. *Traces: Lina A4.*
7. WHERE a consumer file is a personalized artifact (Requirement 18) `sync` SHALL treat overwrite as destructive and SHALL NOT perform it. *Traces: Stacy's Q6 process consequence — under package-primary `sync` is the sole upgrade-coherence surface.*

### Requirement 6: The publish-rail guard (Q7 — ruled R9)

**User Story**: As the release process, I want publish verification that cannot be answered by the wrong registry, so that "it's live" means it is live on the rail consumers install from. *Traces: outline §§ 3.10, 4.3; Stacy B7 (measured), Stacy R2 Part 3, Ada A8, Leonardo A15.*

#### Acceptance Criteria

1. The dual-publish to GitHub Packages SHALL continue (R9, ruled **against the outline's recommendation**; the recurring tax is accepted knowingly). GitHub Packages SHALL NOT appear in any consumer-facing document, template or scaffold.
2. The verification step SHALL use the **scope-explicit form**, verbatim — it is the only form measured to beat an npmrc scope map:
   ```
   npm view @3fn/core@<version> version --@3fn:registry=https://registry.npmjs.org
   ```
   *(A bare `--registry` flag is void for a scoped package: `@scope:registry` in an npmrc takes precedence. Reproduced in five commands.)*
3. It SHALL ship with its **gate-bite recipe**, verbatim, and the recipe's red result SHALL be recorded and committed with the guard:
   ```
   npm view @3fn/core@99.99.99 version --@3fn:registry=https://registry.npmjs.org
   # → non-zero, 404
   ```
4. The guard SHALL be a **committed script**, invoked as a **mandatory step in the release recipe** (`.kiro/hooks/RELEASE-FLOW.md` + `governance/release-management-system.md`) — not a documented instruction.
5. It SHALL carry a **register row** in `governance/classification-map.md` with an owner and a `check_state`.
6. It SHALL NOT be registered as a PR required check — **the event it verifies happens after merge**, so there is nothing at PR time to gate. Its armed evidence is the recorded red from 6.3, not gate registration. *(Ruled sufficient by Stacy, R2 Part 3.)*
7. **Liveness SHALL be detected by the RELEASE claims pass** reading whether the guard ran and what it returned. This is Stacy's seat and uses her existing mechanism — a post-merge guard that silently stops running otherwise has no ARMING event to catch it and no required-check set to fall out of. *Traces: Stacy R2 Part 3.*
8. Two **hardening candidates** SHALL be evaluated at U1 and SHALL NOT be merged into the required form before verification: **Ada A8's `dist.tarball` host-provenance assertion** (mechanism high-confidence, **field name self-declared unverified** — one command settles it) and **Leonardo A15's hermetic invocation** (`npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null`). *Rationale: the founding finding of this requirement was that an unverified guard shipped as a mitigation.*

### Requirement 7: Product MCP wiring (Leonardo B1)

**User Story**: As a consumer's Leonardo, I want the product MCP server wired and a product tree scaffolded, so that the five product-content tools routed to me at Spec 122's cutover can actually be called. *Traces: outline § 4.6; Leonardo B1 (blocking).*

#### Acceptance Criteria

1. The scaffolded MCP config SHALL declare a **third server entry** for the product MCP with `PRODUCT_DIR`. *(The runner already exists — `runMcpProduct()`, and `build:mcp` bundles `dist/mcp/product-mcp.js`. The wiring does not.)*
2. The two-server **equality assertion** in `src/cli/__tests__/init.test.ts` SHALL be updated **deliberately**, as a declared change — not discovered as a failing test. *(The omission is currently guarded, not incidental.)*
3. Whether `product-mcp-server/src/` belongs in `files[]` SHALL be decided and recorded. *(The other two server sources ship; it does not.)*
4. The `product/` tree scaffold is **U3 scope** (Requirement 19.5); the acceptance that a consumer's Leonardo answers a real product query is **U5 scope** (Requirement 25.4). *Traces: Leonardo B1's four deliverables, placed in the units where the work lives — "a one-clause placement in the wrong unit is how this arrives at U5 undone."*

### Requirement 8: The harvest-zero lint (Q8 — ruled by Lina)

**User Story**: As a consumer who named a semantic-reference map `tokens.ts`, I want to be told at the moment of confusion why my component tokens did not register, so that I do not have to read the package's source to discover that two mechanisms wear one filename. *Traces: outline § 4.5 (Q8, Lina's call); Ada's directed question; Leonardo's Q8 position.*

#### Acceptance Criteria

1. A lint SHALL warn when a scanned `tokens.ts` / `*.tokens.ts` file **harvests zero component tokens**, with a named explanation directing the author to `defineComponentTokens`.
2. The lint SHALL read the signal 124's brand already computes; it SHALL NOT introduce a second detection mechanism.
3. WHERE the consumer is in package-primary mode the lint is **the only feedback channel** — there is no copied neighbour set to diff against. *Traces: Lina R2 § 2 — "package-primary removes that self-service path."*
4. The `*.refs.ts` rename is **out of scope for 123** and is Lina's separate bounded issue, gated to land **before U3 ships the install doc** (Requirement 15). *Traces: outline § 4.5; Lina R2 § 2 — her lean hardened to a recommendation because R7 makes the shipped component root the permanent read-only exemplar set.*

---

## UNIT 2 — Consumer generation profile

### Requirement 9: The generation profile dimension (Q9 — ruled shape (ii))

**User Story**: As the generator, I want profile to be an emission dimension rather than a new target, so that one canonical source produces both steward and consumer renderings without a second adapter to keep in sync. *Traces: outline §§ 7.1, 7.3, 10 (Q9 ruled (ii)); Lina A1, Lina R2 § 3.*

#### Acceptance Criteria

1. Profile SHALL be threaded as an **`AdapterContext` field**, not as a new `TargetAdapter.target` union value. The `target` union SHALL remain unchanged and the ~20 `.target` references across the pipeline SHALL remain untouched.
2. Adapters SHALL read `ctx.profile`; emission logic SHALL remain single-sourced. No adapter SHALL be duplicated or subclassed for the consumer profile. *Traces: Lina A1 — a duplicated emitter "recreates the hand-fork D-live-3 is the tombstone for."*
3. `skills-map.yaml` and `field-dispositions.yaml` SHALL gain **zero to two** rows, not the 20 a third target would have required.
4. The profile-aware sweeps SHALL **iterate over profiles**, not handle a new target's semantics.
5. A **checked-in, diff-guarded consumer rendering of all eight agents** SHALL exist in this repo at `canonical/_consumer-output/<target>/`, following the existing `generateFixture` remap precedent. *(Without it the real rendering exists only in a stranger's repo at `init` time and CI has nothing to sweep.)* *Traces: Lina R2 § 3.*
6. **Lina's surviving counter is recorded, not dissolved**: (ii) front-loads pipeline work with nothing demoable until finished, and it makes the profile axis **permanent** — a standing cognitive tax on every future sweep, guard and lock author. Both costs are owned.

### Requirement 10: Section-granular attribution provenance (Fork (B) — ruled)

**User Story**: As the re-grounding check, I want provenance at the granularity of a section rather than of a whole rendered body, so that a claim about where a function went can be verified against generator-emitted evidence rather than taken on the profile author's word. *Traces: outline § 7.2 (Fork (B), ruled Peter 2026-09-20); Stacy R3's measurement.*

#### Acceptance Criteria

1. The generator SHALL emit **section-granular attribution spans for charter bodies**, replacing the single `passthrough → …#body` span. *(Measured: 373 rendered lines of `stacy-prompt.md` are one span.)*
2. The generator SHALL emit **per-heading spans for always-set members**. *(`CLAUDE.md` currently carries one `resolve` span per whole doc-id — the always-set inherits the charter-body defect rather than having its own.)*
3. Provenance SHALL be **generator-emitted, never profile-declared.** The profile names a disposition; the generator supplies the evidence; the check compares them.
4. The existing totality check SHALL be understood and documented as **an output-coverage proof that is structurally silent about input coverage** — a charter gutted to 40 lines tiles perfectly with one passthrough span. It SHALL NOT be cited as evidence for any clause of Requirement 11.
5. This work SHALL compose with Requirements 9.5, 14.1 and 14.2 rather than being scheduled in isolation — **that composition is why Fork (B) was priced as affordable.**

### Requirement 11: The re-grounding contract (§ 7.2 v3 + the pre-stated criterion)

**User Story**: As a consumer whose repo has none of DesignerPunk's authorities, I want the shipped agents' roles re-pointed at my repo rather than deleted or left carrying instructions I cannot follow, so that the agent organization is a capability rather than an imposter. *Traces: outline §§ 3.3 (R3 guardrail), 3.5 (R5), 7.2; Stacy B1/R2/R3; Leonardo B2; Ada A6/A7; Lina B5.*

#### Acceptance Criteria

**11.1 The contract's two halves**
1. **RE-GROUND**: the ROLE SHALL ship intact, re-pointed at the consumer's repo. Consumer-Thurgood does spec formalization, test governance and steering-doc health **for their repo — their Civitas, not ours.**
2. **SUBTRACT**: only this repo's specifics SHALL be removed — repo-internal tooling invocations, authority claims naming people or this repo's gates, our stewardship cadences and instruments as obligations, `.kiro/specs/**` workflow as *law*, and routes to docs not present in the consumer's install.

**11.2 The closed disposition vocabulary**
1. The vocabulary SHALL name a **destination, not an origin**: `re-pointed` · `superseded-by` · `no-consumer-counterpart`.
2. **`repo-bound-in-entirety` SHALL NOT exist in the vocabulary**, and SHALL be retained as a **named rejected term** emitting a specific error: *"not a disposition. Under R5, a repo-bound section is the paradigm case for re-pointing. Choose `re-pointed`, `superseded-by`, or `no-consumer-counterpart`."* *Traces: Stacy R2 attack 3 — the term "converted R5's central claim into its opposite exactly where R5 matters most."*
3. **No term meaning "it was ours, so it is gone" SHALL exist.** That absence is the repair.

**11.3 The clauses**
1. **(i) NO REPO-SPECIFICS PRESENT** — a deny-list sweep over rendered output. The contract text SHALL carry its own limit: *a zero-hit sweep is evidence about the **enumeration**, not about the charter.* *Traces: Stacy A9.*
2. **(ii) STRUCTURAL RETENTION WITH DECLARED DISPOSITION** — the rendering retains its canonical source's section set; the trigger is **emptied, reduced-to-triviality, or absent**.
3. **(iii) DELETION ACCOUNTING WITH APPLICABILITY VERIFICATION** — every removed block cites the subtraction clause that authorized it, **and the citation is shown to apply**: bullets 1–4 must be shown to have contained a deny-list hit; bullet 5 a non-resolving route. **Mis-attribution is a finding, not only non-attribution.** *Traces: Stacy R2 attack 2.*
4. Clause (iii)'s **failure direction is deliberately chosen**: it will false-positive on paraphrase removals, and *a mis-flagged legitimate removal routes to a human; a mis-attributed illegitimate removal routes to nobody.*
5. **(iv) TOOL ROUTES** — every **present** tool route and `autoApprove` entry resolves to a server in the scaffolded MCP config and a tool that server registers; **every ABSENT route (present in canonical, absent in the rendering) is an emptied function taking a (v) disposition.** Zero routes SHALL NEVER be a clean pass. *Traces: Leonardo B2, Stacy R3 attack 4.*
6. **(v) RE-GROUNDING DISPOSITION** — every section carrying operational content in canonical that is emptied, reduced or absent SHALL show **where the function went**, via exactly one vocabulary term.
7. **Lexical verb-presence SHALL survive only as a smoke test, never as a criterion.**
8. The sweep SHALL run **per-agent against rendered output, never against the catalog** — one bad shared-catalog entry mis-grounds all eight agents at once. *Traces: Ada A6.*
9. The check SHALL be run **on Thurgood's rendered consumer output as a named acceptance item**, not on the set average. *Traces: Ada A7 — "a non-collapsing agent reporting no collapse is near-worthless as testimony."*

**11.4 The pre-stated falsification criterion (verbatim)**

> **A `re-pointed` disposition on canonical section S verifies IF AND ONLY IF both hold:**
>
> **(1) DERIVATION** — at least one span in the consumer rendering declares **S, or a sub-range of S, as its `source`**. Something in the shipped charter demonstrably *derives from* S.
> **(2) HONEST NAMING** — the destination named in the disposition is **among the spans satisfying (1)**.
>
> **Provenance is GENERATOR-EMITTED, never profile-declared.** The profile names the disposition; the generator supplies the evidence; the check compares them.
>
> **Zero spans sourcing S ⇒ FAILURE, not a routed review.**

1. The criterion above SHALL be implemented as specified against Requirement 10's substrate.
2. **Pass four SHALL be scoped to re-running attack (a) verbatim** against the new substrate. *Traces: outline § 7.2 — "so the fourth pass is a one-line verification rather than another open-ended read."*
3. IF pass four fails THEN **Fork A fires with the evidence already in hand**: the property moves to the behavioral instruments (Requirement 24) and the deterministic clauses stand as what they are.

**11.5 The routed path and its conditions**
1. Every `no-consumer-counterpart` claim SHALL be enumerated in the U2 completion doc and **signed by the owning domain agent, not the profile author.**
2. **C1 — the self-signing carve-out**, as a general rule: **the signer is the owning domain agent, EXCEPT where that is the profile author, in which case it is the counterpart verification seat; and if both roles collapse onto one agent, it escalates to Peter.** **Concretely: consumer-Thurgood's rows are signed by Stacy.** *Traces: Stacy R3 attack (d).*
3. **C2 — the rate detector is Stacy's**, in her seat, using her existing mechanism: **`no-consumer-counterpart` rates per agent per release, in the claims-pass counting block** that already watches declared-none and `adaptations: none` rates as ritual-stub signals. *(Declared-none rot is observed in this repo, not hypothesized.)*
4. **C2 — the asymmetry repair**: refusal SHALL be a **one-flag return** (*"this should re-point"*) routed back to the profile author who owns the authoring, and the signature SHALL be **per-row, not per-batch**. *Rationale: assent is free and refusal is expensive, so a signer facing 30 rows of which 28 are true approves the batch and the one that matters rides in — the repair removes the expensive side rather than adding ceremony to the cheap one.*
5. **One hard mechanical floor**: a consumer charter in which **every** operational-mode section is disposed `no-consumer-counterpart` **SHALL FAIL by construction** — R5 ruled the role ships intact. Between that floor and full retention the check **routes to review rather than guessing.**

**11.6 "Trivial" — C3, an explicitly dated OPEN INPUT**
1. *Reduced-to-triviality* (11.3.2) and *non-trivial* (11.4) are load-bearing and currently undefined. **Owner: Thurgood** (the vocabulary's owner, per the Q5 boundary). **Due before pass four, not at settle** — an undefined threshold would let pass four inherit the hole it exists to close.
2. **A candidate definition is proposed here as NON-BINDING round input, so the gap is not silence**: *a section is **trivial with respect to its canonical counterpart** if it carries none of the counterpart's operative content kinds — no obligation, no named procedure, no enumerated set, and no route or command.* It is deliberately **relational and structural rather than a line count**, so it cannot be satisfied by padding: clearing it requires adding operative content, which is the property wanted.
3. **Stacy owes the exemplars** against which the definition is falsified — not the author who wrote the threshold. *Traces: Stacy R3 C3, including her Goodhart flag: any threshold invites the sit-just-above play, which is why the owner was the gap rather than the number.*

**11.7 The check's named limitations, carried in the contract's own text**
1. Every trigger concerns what canonical **had**. **Nothing constrains what the rendering GAINED** — profile-added text with no canonical source and no repo-specifics passes every clause.
2. **Semantic inversion inside a fully retained section** (*"owns" → "advises on"*) triggers no disposition. Both are largely covered by generator diff-guard on a reviewed profile — *"but 'largely covered by review' is the sentence that precedes the next finding."* *Traces: Stacy R3 attack (e).*

**11.8 Sign-off**
1. § 7.2 **IS NOT SIGNED OFF.** Pass four is a **U2 acceptance gate**, not a settle precondition, and **the author is recused.**
2. U2 SHALL NOT be accepted until pass four has been **run and its verdict recorded**. *(This requirement specifies that the pass occurs and is recorded; it does not and cannot specify its outcome — the verdict is Stacy's to reach.)*

### Requirement 12: The always-set re-grounds as a class (Lina B5)

**User Story**: As a consumer's agent loading identity content unconditionally, I want that content to be about my repo, so that law I cannot follow does not arrive as always-loaded context. *Traces: outline §§ 6.2 (option (d)), 7.2; Lina B5 (blocking); Stacy R3 attack 5.*

#### Acceptance Criteria

1. The nine always-set members SHALL receive **consumer renderings through the same canonical pipeline** as charters. `personal-note`'s template-ization (Requirement 18) is **the pattern, not the exception**.
2. `Task-Completion-Protocol.md` and `start-up-tasks.md` SHALL re-ground under R5's logic — *a* completion protocol and *a* startup checklist for *their* repo — and SHALL NOT be deleted or merely banded. *Rationale: a banner is a reading instruction; the always-layer is not read, it is loaded. And banding buys the reference-corpus mode nothing, because identity docs are never MCP-served.*
3. **The application unit for clause (ii)** SHALL be: for a **prose member**, the document's own top-level heading set as recorded in its `canonical/shared/always-set.yaml` entry; for a **template member**, the template's declared slot set.
4. Requirement 12.3 **awaits Lina's confirmation in the requirements round** — she scoped the class in, and the unit should not be settled over her. *Traces: Stacy R3 attack 5, directed to Lina.*
5. This work lands in **U2, not U4** — it is generator work, which is also what removes the second U2↔U4 coupling.

### Requirement 13: Declared degradation on missing docs (Lina B4)

**User Story**: As a stranger who deleted a governance doc from my own repo, I want `init` to warn rather than crash, so that my first command does not fail on a file I am entitled to remove. *Traces: outline § 9.1; Lina B4 (blocking).*

#### Acceptance Criteria

1. The **steward profile SHALL keep the throw** — in this repo a missing always-set member or ambient embed **is** a generator bug.
2. The **consumer profile SHALL degrade with a named warning**: emit the charter minus the unresolvable member, warn, exit zero.
3. The distinction SHALL be documented as a statement about **corpus ownership** — throw where the corpus is ours and controlled; degrade where it is theirs and mutable. *Traces: Lina R2 — "this makes the throw a statement about corpus ownership rather than a defensive default."*
4. This behavior is required **regardless of ordering**: no ordering rule protects against a stranger deleting a doc.

### Requirement 14: Generator delivery mechanics and the legacy-path deletion

**User Story**: As a consumer running `init --target`, I want the generator to run from the installed package without a TypeScript runtime and to emit only my artifacts, so that generation works and my repo does not receive DesignerPunk's governance telemetry. *Traces: outline §§ 4.6, 7.1, 7.3, 6.2 (gate 4b); Lina A2, A3, A5, A6; D-live-2, D-live-3.*

#### Acceptance Criteria

1. A **compile lane** SHALL build the generator (esbuild alongside `build:mcp` is the named precedent), with a bin subcommand and `files[]` entries. *(Today `tools/agent-generator/**` is not compiled by `npm run build` and is not in `files[]`; its only invocation is `npx tsx`, which would violate 118's no-TS-runtime guarantee for consumers.)* *Traces: Lina A3.*
2. A **distinct consumer emission entry point** SHALL exist. `generateAll(repoRoot)` SHALL NOT be re-pointed: one `repoRoot` currently serves canonical **inputs**, doc-id **resolution**, and **output** paths, and consumer generation needs package-root for the first and consumer-root for the third. *Traces: Lina A2.*
3. The consumer entry point SHALL emit **only agent artifacts and the always-layer**. It SHALL NOT emit `canonical/registry/*`, `canonical/manifests/*`, `coverage-map.yaml`, `coverage-manifest.yaml`, `demotion-delta.json`, or the `_fixture-output/` tree — *"none of that belongs in a stranger's repo."*
4. **Gate 4b**: `init` SHALL drop the `governance/` and `.kiro/steering/` copy steps. The MCP serves the corpus from `node_modules` (bannered per Requirement 20); **identity delivery to consumer agents is the generated always-layer.** D-live-2's repair is therefore a **clean deletion**, not a filtering exercise.
5. `product-template/agents/` SHALL be deleted, **with its enumerated reference sweep**: `governance/DesignerPunk-Integration-Guide.md` § "4b. Set up agent prompts" (which currently *teaches* the copy) · `governance/MCP-Evolution-Roadmap.md` L217 · `governance/classification-map.md` L686 (a **rule** whose enumeration includes `product-template/`) · `scripts/check-package-name-drift.js` `SCAN_DIRS`. *Traces: Lina A5.*
6. **`check-package-name-drift.js` SHALL be verified to no-op rather than throw on the missing directory BEFORE the deletion lands** — it is wired into `prepublishOnly`.
7. The three converging consumer paths SHALL be retired into one generator output: `init`'s wholesale `.kiro/agents/` copy, the Integration Guide's `cp -r product-template/agents/`, and the stale fork. **Spec 101 recorded the two-path inconsistency and deferred it to "a follow-up spec"; 123 is that follow-up**, and the requirements SHALL say so. *Traces: Lina A6.*
8. **Q5 — filtered-by-derivation**: what ships SHALL be **derived by the profile pipeline** (Requirement 9.5's renderings plus the profile-filtered canonical inputs `sync` needs), with the filter itself diff-guarded. It SHALL NEVER be a hand-curated second tree. **IF it cannot be made derivable THEN it ships whole** — a hand-filtered canonical is worse than an unfiltered one. *Traces: outline § 7.3, ruled; Lina's rule.*
9. **Q5's recorded residual**: filtering makes the consumer's regeneration non-reproducible against **our** lock hashes. That is correct rather than costly — their guard surface is theirs, per R5 — and it is **decided knowingly rather than discovered in U2.**

---

## UNIT 3 — Onboarding: install doc, starter specs, personalization

### Requirement 15: The install doc

**User Story**: As a consumer's agent reading the shipped install doc, I want declared verification needs with their reasons and no assumptions about my environment, so that I can map them onto whatever CI my repo actually has. *Traces: outline §§ 5.1–5.3; onboarding-CI vision P1–P5; 119-B delivery constraints; probe residuals.*

#### Acceptance Criteria

1. The install doc SHALL be a **shipped, versioned release artifact**, and SHALL declare verification **needs with their why** — never a CI vendor, workflow syntax, or repo topology (P1).
2. It SHALL be authored under the **119-B delivery constraints**, all of them: **section-less route form** (`THEN consult <doc-id> (summary-first)`) · **calibration-cue signal-scoping** — it cites `governance/classification-map.md § "certainty-calibration"` and **never independently asserts the emitter list** · **no MCP-routed links to identity docs**, which are never MCP-served and are therefore broken-by-construction on that surface · **zero backstop aliases** for any doc 123 adds · **G1's accepted misfit moves through the generator only**, all three entries together.
3. It SHALL carry a **reference-corpus section** stating what is DesignerPunk's worked execution and what is transferable intent, **and a documented NO-INIT path**: `npm install`, wire the docs MCP at `node_modules/@3fn/core/governance`, **do not run `init`**. *Traces: Leonardo A9; probe record (the no-init path is the one the probe used).*
4. **Probe residual — say that reference use is a sanctioned mode.** *Traces: probe record — "nothing in the installed package's own docs told the agent that `designerpunk-docs` could or should be used as a reference corpus for a foreign system; that framing came entirely from the probe's external task prompt."*
5. **Probe residual — citation-fidelity guidance**: the reference-corpus section SHALL state that **quoted text and dates are claims requiring re-verification**. *Traces: probe record — two of three spot-checked provenance claims were inaccurate, while the reasoning was sound; "the mode's output needs a provenance-accuracy check layered on top of the intent-extraction check."*
6. **Probe residual — retry-on-`SectionNotFound` guidance**: a failed heading lookup is a cue to retry using the server's own `suggestions` field, returned in the error payload. *Traces: probe record — this produced the run's weakest claim.*
7. **Probe residual — `lastReviewed`-conflict guidance**: *when two docs disagree, defer to the more recently reviewed one.* *Traces: probe record — the agent reconstructed this rule correctly on its own, "which is exactly why it would be safer as documented guidance than as an emergent inference."*
8. It SHALL carry the **session-restart line**: the agent session must be restarted before the MCP that `init` just scaffolded is visible. This SHALL appear in **both** the install doc and the CLI's terminal output. *Traces: Leonardo A6 — the agent that ran `init` cannot query what `init` configured, and its first three queries fail.*
9. It SHALL carry the **clone hatch** paragraph (*"prefer owning every line? clone the repo"*), and the hatch SHALL **also** be named in `init`'s terminal output — *the founder reads the terminal; their agent reads the doc.* Per Requirement 2.5, the **per-component** ownership answer comes first and the clone is the whole-system escalation.
10. The install doc's promises SHALL be bounded by the **support surface at solo scale** — failure modes in environments we do not control are owned by whoever ships the promise. *Traces: outline § 11, accepted risk.*

### Requirement 16: Starter specs as onboarding curriculum (R6)

**User Story**: As a newcomer, I want my first DesignerPunk experience to be running a spec with my own agent, so that I inherit the method by doing it once. *Traces: outline §§ 3.6 (R6), 5.6; Stacy B3, Leonardo A13.*

#### Acceptance Criteria

1. Exactly **two** starter specs SHALL ship: **the CI-needs spec** (the P2 vehicle) and **Thurgood's re-grounding spec** (consumer-Thurgood's first assignment is running his own onboarding — re-point his charter at their repo, establish their steering/spec surface, and report what does not transfer).
2. The launch set SHALL stay at two, because **the support-surface counter applies per-spec**; growth is earned by evidence, not assumed.
3. **Both starter specs, the P3 tier list, and the P2 bite recipes SHALL be ONE ATOMIC DELIVERABLE in U3.** U2 owes only the re-grounding contract they instantiate. *Traces: Stacy B3 (blocking) + Leonardo A13 — the earlier split would have authored the CI-needs spec without the content it exists to carry, with both units reading green.*
4. They SHALL be **harness-agnostic scaffolded files**, not a flow the CLI drives (P5).
5. **Thurgood's re-grounding spec crosses three units** — the contract is defined in U2, the artifact is authored in U3, and the run happens in U5 — so **all three SHALL carry criteria for it.** *Traces: Lina R1 — the seam she named as the one more worth worrying about.*

### Requirement 17: The CI-needs declaration and its arming proofs

**User Story**: As a consumer's agent, I want each declared need to arrive with a proof that the check I build actually bites, so that I do not ship a check that runs green while verifying nothing. *Traces: outline § 5.2 (P1–P6); onboarding-CI vision.*

#### Acceptance Criteria

1. **P2 is NON-NEGOTIABLE**: every declared CI need SHALL ship with a **gate-bite recipe** — introduce this deliberate failure → your check must go red → revert.
2. **A need whose bite recipe cannot be written SHALL NOT ship as a need.** This is a real filter on the tier list.
3. **P3**: needs SHALL be tiered — a MINIMAL core versus optional hardening. The internal check set is mostly stewardship and SHALL NOT ship as needs.
4. **P4 — BOTH SIDES IN ONE LINE.** Every need SHALL state what skipping costs **and what adopting costs** (stand up CI, then maintain a gate-bite proof per need, alone, indefinitely). *Rationale: a skip-only price is backwards for this persona — "token drift reaches your users" is near-zero for a solo founder pre-PMF, so one-sided pricing reads as a scold and gets skipped wholesale, which is the worst outcome for P2.* *Traces: Leonardo A8.*
5. An onboarding step SHALL scaffold the CI-needs spec into the consumer's repo; the CLI scaffolds and **their** agent executes. **We SHALL NOT maintain per-vendor CI integrations** — the scaffolder-not-integrations boundary is a named tripwire.
6. **Accepted risk, recorded**: a consumer's agent of unknown quality produces a spec of unknown quality. Mitigations are P2's bite proofs and the install doc's verification recipes; **the residual is accepted knowingly.**

### Requirement 18: `personal-note.md` is template-ized

**User Story**: As a consumer, I want a slot to tell my agents how I want to be worked with, rather than receiving another person's letter to theirs. *Traces: outline §§ 3.7 (ruled), 6.4; audit A10 (dissolved).*

#### Acceptance Criteria

1. The shipped form SHALL be a **template scaffold**; onboarding personalizes it per user on install.
2. The dangling résumé reference SHALL disappear with the personalization pass, requiring no separate fix.
3. `sync` SHALL **never overwrite** a personalized note (Requirement 5.7).
4. **Audit A10 is dissolved, not adjudicated** — there is no exclude-versus-confirm decision remaining. *Rationale recorded: the content does not transfer but the slot does; deleting it would ship the mechanism's absence as if it were the mechanism's irrelevance.*

### Requirement 19: `init` UX, and the populated-repo gap

**User Story**: As a founder installing into a repository that already has files in it, I want `init` to tell me what it skipped, so that I do not follow next-step instructions that cannot work. *Traces: outline §§ 5.3, 6.2 (gate 4b); Leonardo R2, A17; Leonardo B1.*

#### Acceptance Criteria

1. `init` SHALL NOT copy `governance/` or `.kiro/steering/` (gate 4b; the mechanism is Requirement 14.4).
2. `init --target=<tool>` SHALL generate the consumer's agent artifacts for the named tool (Requirement 9).
3. WHEN a scaffold target already exists in the host repo THEN `init` SHALL **report the skip and its consequence**, not silently proceed. *(Measured: `createFileIfNotExists` skips `jest.config.js` and `tsconfig.test.json` in a populated repo, so the DesignerPunk jest preset never applies — while next-step 4 still says `npx jest`. A founder with an existing repo follows our instructions and gets a silent no-op or a confusing failure.)* *Traces: Leonardo R2.*
4. WHEN `init` prints next steps THEN those steps SHALL be consistent with what `init` actually did in that repo.
5. `init` SHALL scaffold a `product/` tree matching the Product Indexer's directories, with **one worked example screen** and a statement of what the tree is for. *(Today it scaffolds one file of seven directories, in markdown-flavoured pseudo-YAML with `[CUSTOMIZE]` placeholders, and no server reads it.)* *Traces: Leonardo B1 (iii).*
6. Terminal output SHALL carry the session-restart line and the clone hatch (Requirements 15.8, 15.9).

---

## UNIT 4 — Content policy execution

### Requirement 20: The audience banner and its guard (gate 4a — ruled)

**User Story**: As a consumer's agent fetching a governance doc, I want to be told at the top whether I am reading DesignerPunk's worked example or transferable guidance, so that I do not adopt authorities my repo does not have. *Traces: outline §§ 6.1, 6.2 (gate 4a, ruled); Ada A5; Stacy A3; Lina A7; Leonardo A10; probe record.*

#### Acceptance Criteria

1. The governance corpus SHALL **ship whole and MCP-served**. Nothing SHALL be pruned from the served set.
2. **Audience-framing banners** SHALL be applied to the docs carrying repo-internal authority — the measured set (~18 at drafting; **0 of 15 `Token-Family-*.md` docs require one**).
3. **The set SHALL be re-verified at U4 execution and SHALL NOT be frozen from a point-in-time count.** Ada's figure is a D1-contract measurement. Banding a doc that has since acquired repo-internal language, or banding one that has since lost it, are both defects the frozen number would cause.
4. Banding SHALL NOT be applied corpus-wide. *Rationale: dilution is the sharpest form of the banner's own surviving counter — a banner is what a hurrying reader elides first.* *Traces: Ada A5.*
5. **A PRESENCE GUARD SHALL ship with the banner convention. Banner-without-guard is a named NON-OPTION.** *(P2 applied inward: an unguarded convention is the DORMANT failure mode in prose form.)* *Traces: Stacy A3, rung-5 condition.*
6. WHEN the presence guard arms THEN **Stacy's ARMING event fires** — `npm run audit:coverage-map` + `./tools/agent-generator/verify-gate-registration.sh`. *(A guard that lives only in a script nobody registered is the same artifact as no guard.)*
7. The banner's **vocabulary** SHALL cover *"this describes DesignerPunk's own **components**"*, not only *"…own **process**"*. *(`Component-Readiness-Status` asserts readiness for our 34 components, which in a consumer install reads as a claim about theirs.)* *Traces: Lina A7.*
8. **Reference-mode framing rides the banner language** — the band states what is worked example and what is transferable, which is the reference reader's exact question answered at the top of every doc. One mechanism, both audiences. *Traces: Leonardo A10; probe evidence SUPPORTS.*
9. WHERE a component family doc would be pruned, it SHALL NOT be: the set ships whole or not at all, because `Component-Quick-Reference` is a routing table by doc id and 119-B left **zero backstop aliases**. Under 20.1 nothing prunes, so this is satisfied by construction and recorded as a constraint on any future narrowing. *Traces: Lina A7.*
10. **Accepted risk, recorded**: banner efficacy cannot be measured in repos we never see. The guard makes banners **present**, never **read**.

### Requirement 21: Owed checks and dispositions

**User Story**: As the governance system, I want the checks this spec inherited to be discharged rather than quietly dropped at closeout. *Traces: outline §§ 6.3, 6.5.*

#### Acceptance Criteria

1. WHEN gate 4's policy is applied THEN the **U1b audience-ruling backward check** SHALL be performed: a one-time review of the 125-B campaign's prunes against consumer-serving needs, scoped to `governance/` prunes only, with any finding **routed to the owning domain agent** rather than fixed in 123.
2. The **release-notes disposition** SHALL be decided and recorded: a consumer-facing delta (hand-authored, consumer-framed, one entry per release) versus deferral to the Q6 retirement-execution session. *(It is the most deferrable item in this axis: `npm` already shows version deltas, and the consumer's real upgrade-risk surface is `sync`.)*

---

## UNIT 5 — Validation & closeout

### Requirement 22: The onboarding-path requirement (R8 — gate 3 ruled)

**User Story**: As the acceptance bar for this spec, I want the onboarding path's length asserted as a property of the shipped artifacts and the runs recorded as evidence, so that the instrument produces data about where onboarding drags instead of being truncated to satisfy a number. *Traces: outline §§ 3.9 (R8), 5.5; Stacy B6.*

#### Acceptance Criteria

1. The onboarding path SHALL be a **formal requirement of this spec**, and *"five-minute"* SHALL be understood as **philosophical, not literal**. *Peter's framing: "Keep it relatively short, but don't cut off important learnings just to satisfy an arbitrary time requirement. Good data is valuable."*
2. **THE PATH is the assertable property**: a **bounded step count**, countable from the install doc **with no run required**. This is what an acceptance criterion may assert.
3. **THE RUN is recorded instrument output**: wall-clock, findings and preconditions SHALL be recorded per run. **Wall-clock SHALL NEVER be asserted.** **An overrun SHALL be a FINDING, never a criterion failure.**
4. **A STOP SHALL be a recorded event with its reason, never a silent omission.** A looping run must end somehow; the property that keeps this alive is that **an unrecorded truncation SHALL NEVER roll into a green.**
5. **The following forms are FORBIDDEN and SHALL be named as forbidden in the requirement's own text:**
   - **a step-count assertion applied to the RUN** (*"the trio run completes in ≤ N steps"*) — this is the one that passes review: it obeys 22.2's letter, asserts no wall-clock, reads as fully compliant, **and still truncates the instrument, at a step boundary instead of a time boundary**;
   - *"the run SHALL demonstrate the five-minute test"* — unfalsifiable, then resolved operationally by whoever stops at five minutes because the label says so;
   - a record template reading `elapsed: ___ (target: 5 min)` — recorded-not-asserted in form, asserted in practice.
6. **The requirement SHALL be given a NON-NUMERIC NAME.** *"WordPress five-minute test"* may appear **once**, as provenance. *Rationale: any requirement titled "the five-minute test" re-imports the literal number every time a reader meets the label without the ruling attached.* *Traces: Stacy B6 sub-finding.*

### Requirement 23: The persona-embodied trio (R4)

**User Story**: As the spec's standing evidence instrument, I want three cold agent runs that vary the failure axis, so that the result tells us **where** onboarding confuses rather than only **whether**. *Traces: outline §§ 3.4 (R4), 5.5; Stacy A5; Leonardo R2, A1/A2/A3/A4, A16.*

#### Acceptance Criteria

1. The blocking bar SHALL be **three persona-embodied cold agent runs**, varying: **(a)** a backend engineer with little-to-no frontend experience — **design vocabulary**; **(b)** a designer with some HTML/CSS and no engineering beyond it — **toolchain mechanics**; **(c)** a first-time-app product manager — **agent-harness fluency** (never configured an MCP server, does not know what a charter is). *(Persona (c)'s axis was redefined from "everything," which isolated nothing — a refinement of R4's instrument, not a change to the ruling.)* *Traces: Leonardo A1/A2, per Peter.*
2. **PRECONDITION CLAUSE (i): NO ACCESS TO THE DESIGNERPUNK SOURCE TREE.** Packed install only, recorded per run, **all three personas, no exception for (a)**. *Rationale: (a)'s axis is not handicapped by the hermetic bar, it is constituted by it — a vocabulary acquirable only by reading DesignerPunk's repo is precisely the finding persona (a) exists to produce.* *(The shipped corpus reached over MCP from `node_modules` is not "access granted to the run" — it is the product under test.)*
3. **PRECONDITION CLAUSE (ii): A NAMED HOST-REPO FIXTURE PER PERSONA**, recorded per run — **(a)** a small existing TS service with its own `tsconfig`/`jest.config` and no frontend; **(b)** a static HTML/CSS site with no build tooling; **(c)** a near-empty repo.
4. Clause (ii)'s **primary justification is FEASIBILITY, not realism**: the behavioral re-grounding probe rides these runs, and **an empty scratch directory gives the probe no task to perform — the contract's only end-to-end check would run against nothing and pass.** *Traces: Leonardo R2.*
5. **Fixtures SHALL be committed artifacts**, not per-run improvisation. *"A fixture chosen fresh each release makes cross-release findings incomparable, which is the quiet way a regression instrument stops regressing anything."* *Traces: Leonardo A16.*
6. Runs SHALL be **distributed across at least two `--target` harnesses**, with the target recorded per run. *(P5 otherwise has no evidence attached.)* *Traces: Leonardo A3.*
7. **HANDOFF, NOT A 123 REQUIREMENT**: the trio is a **standing regression instrument re-run per release**. U5 executes the first runs; **the recurring obligation needs a post-123 home in the release recipe**, which is a ballot-measure change to `governance/release-management-system.md` and therefore **outside this spec**. It is named here so it is handed off rather than dropped.
8. **Peter's own run is MECHANICS validation — non-blocking, and explicitly NOT a cold-human run.** He is the author; he cannot be cold.
9. **The cold-human run remains an OPEN OBLIGATION** with the generic trigger *"the first willing stranger."* **IF unfired at closeout THEN it survives 123's closeout as an open item** — a completed 123 is not evidence it was discharged. *(Recorded caveat: a generic trigger is the easiest kind to let slide.)*
10. **The instrument's limitation SHALL be carried in the requirement's own text**: persona agents **role-play** ignorance rather than possessing it. **The trio measures instruction clarity and path completeness; a human measures confusion.** The named rot mode is **a green trio read as "a stranger succeeded."**
11. IF the trio is ever reduced THEN persona **(a) or (b) SHALL be kept, never (c)** — a no-floor run fails at everything and attributes nothing. *Traces: Leonardo A4.*

### Requirement 24: Behavioral conformance for the re-grounding contract

**User Story**: As the property that no deterministic clause currently reaches, I want a behavioral instrument that a hollow charter fails, so that a truthfully-and-legitimately hollowed charter is caught by something. *Traces: outline §§ 7.4, 7.2; Stacy B2, A2, R2's interim posture.*

#### Acceptance Criteria

1. **U5 SHALL execute Thurgood's re-grounding spec against a scratch consumer install** — packed install, no repo access, preconditions recorded (Requirement 23.2). The conformance criterion SHALL cite **that run**. *(The prior criterion verified presence while claiming conformance evidence from an event owned by no unit — "it cannot be both unowned and load-bearing.")* *Traces: Stacy B2 (blocking).*
2. The **direction-(ii) behavioral probe SHALL ride the trio runs**: a consumer agent asked to do a task in its own domain in a foreign repo. **A hollow charter fails behaviorally and passes textually**, which is the discriminator the lexical check was not. *Traces: Stacy A2.*
3. The acceptance table SHALL label the three instruments **honestly and separately**:
   - **deterministic clauses** — (i), (ii), (iii) with applicability verification, (iv) present-routes, and the all-`no-consumer-counterpart` floor;
   - **the routed clause** — `no-consumer-counterpart` signatures, which are *mechanically enforced routing of a judgment the check cannot make*;
   - **the behavioral backstop** — non-deterministic, per-release, sampling.
4. **(v)'s mechanical half SHALL NOT be listed among the deterministic clauses until Requirement 10's substrate ships.** *(C4, bound. "Destination-exists" was falsified — span-exists is not function-lives-there.)* *Traces: Stacy R3 C4.*
5. The honest posture SHALL be stated in the artifact rather than in a feedback entry: **the contract is not unguarded — it is guarded non-deterministically, per-release, by a sampling instrument.** *Traces: Stacy R2.*
6. **Charter-identity probe**: an agent SHALL answer, in a **fresh** session in the consumer repo, its domain, one routed tool it owns, and one thing outside its scope. *(The prior criterion — "loads in that tool" — was a file-existence check wearing a behavior check's clothes; files in `.kiro/agents/` prove nothing about a Claude Code consumer, where delivery is the generated `CLAUDE.md` import set.)* *Traces: Leonardo A5.*

### Requirement 25: Closeout

**User Story**: As the spec's closing act, I want the acceptance evidence gathered in one place and the declared targets asserted, so that closeout reports measured outcomes rather than intentions. *Traces: outline § 9.1 (U5); Stacy A4, A7; Leonardo B1 (iv).*

#### Acceptance Criteria

1. U5 SHALL record the **trio runs and their triage findings**, with preconditions, host fixtures and targets per run (Requirement 23).
2. U5 SHALL record **Peter's mechanics run** as non-blocking and explicitly not a cold-human run.
3. U5 SHALL **re-measure the tarball and assert against U1's declared target** (Requirement 4.7), naming which lever was measured.
4. U5 SHALL demonstrate **a consumer's Leonardo answering a real `get_product_overview` / `find_screens` query in a consumer repo**. *Traces: Leonardo B1 (iv).*
5. WHERE any probe or run produces a finding list, the list SHALL carry a **forced negative** — *findings: none* written, never implied — and a **per-question discovery-succeeded/failed record**, so a transcript can be **audited rather than merely possessed**. *(An empty finding list otherwise reads identical to a diligent one.)* *Traces: Stacy A7.*
6. U5 SHALL record which of the outline's **named open obligations remain open** at closeout — the cold-human run (23.9) at minimum — rather than closing silently.

---

## CROSS-CUTTING — all units

### Requirement 26: Execution constraints

**User Story**: As every unit of this spec, I want the completion conventions and the recorded risks to bind execution, so that the spec's own evidence meets the standard it asks of consumers. *Traces: outline §§ 11, 13.*

#### Acceptance Criteria

1. **Spec 127's completion-claims convention is ratified law and binds this spec's execution.** Every parent completion doc SHALL reproduce its `tasks.md` success-criterion rows **verbatim** with Status and Evidence, SHALL carry the **forced-negative line**, and SHALL carry the **unconditional fixed-form delegated-tier line**. Every ticked subtask SHALL carry its subtask completion doc. The `completion-criteria-parity` instrument applies.
2. **Claims passes fire per Stacy's events** — a CLOSEOUT pass at the final unit's merge, MIDPOINT if the arc runs long. Findings route to owning agents as **explicit messages**, not as files in a directory.
3. **Units are DECLARED in `tasks.md`** per Task-Completion-Protocol § "Coherent Units", in the order U1 → U2 → U3 → U4 → U5, with **release between units** as the answer to time-to-first-value pressure. *(The release is the value unit and the spec is the planning unit.)*
4. **The reduce-not-grow cut-line has three rungs, every one costing capability**, and SHALL be applied in this order if invoked: (1) U4 collapses to **banner + guard + the always-set re-grounding** (the always-set clause is hard floor and does not collapse); (2) starter specs reduce from two to one, keeping the CI-needs spec — **residual: this loses the only instrument executed by the consumer rather than by us, and half of R6's pair, and with it the demonstration that the spec method is inheritable**; (3) the trio reduces from three runs to one, keeping (a) or (b).
5. **The split tripwire has a firing rule**: it fires when **a unit's declared scope grows by a named threshold after its tasks are written, or a unit misses a second successive planned merge**; it is **read at each unit's completion review**; **Peter owns the read.** *(Recorded because the previous formulation was generically triggered — the defect the same section indicts.)* *Traces: Stacy A8.*
6. **Accepted risks, carried and not re-argued**: spec quality in unknown harnesses · support surface at solo scale · the scaffolder-not-integrations tripwire · two profiles to guard, with the consumer profile the one that will quietly rot · **the dual-publish tax, whose mitigation was void before it was ever used** · a generically-triggered obligation is a weakly-held one · starter specs are shipped surface we cannot observe running · **"defaults are the product," knowingly accepted under Q6** · the strategic counter that the plan optimizes toward an unvalidated market.
7. **The reference-corpus mode has ONE data point.** The probe SUPPORTS it; that retires *unobserved*, not *unproven* — n=1, one corpus, one task, one harness. **The carry-forward is the residual**: the mode's output is strongest in its reasoning and weakest in its provenance claims, which is the inverse of how a reader would rank them.

---

## Open inputs (dated, owned, and not silent)

| # | Input | Owner | Due |
|---|---|---|---|
| 1 | **"Trivial" — the definition** (Requirement 11.6). A **non-binding candidate is proposed** at 11.6.2; **Stacy owes the exemplars** it is falsified against | **Thurgood** (definition) / **Stacy** (exemplars) | **Before pass four** |
| 2 | **Always-set application unit confirmation** (Requirement 12.4) | **Lina** | **This round** — so it does not drift |
| 3 | **`*.refs.ts` rename timing declaration** (Requirement 8.4) — out of 123 scope, but its landing is gated before U3 | **Lina** | **This round** — the declaration; the work, before U3 |
| 4 | **§ 7.2 pass four** (Requirement 11.8) | **Stacy** (author recused) | **U2 acceptance gate** |
| 5 | **`.swift` / `.kt` shipping disposition** (Requirement 4.5) | **Kenya and Data** | **Tasks round** |
| 6 | **Hardening-candidate verification** (Requirement 6.8) — the `dist.tarball` field name | **Ada** | **U1** |

---

## What resisted translation to EARS grain

Recorded as round input, not as a defect list. Each of these is real content from the settled outline that does not become a testable acceptance criterion, and reviewers should say whether the handling is right.

1. **The banner's measured set (~18 docs)** — a count under the D1 reading contract cannot be an AC. Handled by making **re-measurement at execution** the criterion (20.3) and the number illustrative. The *set* is unenumerable now by design.
2. **"Trivial"** — carried as a dated open input with a non-binding candidate (11.6), because a definition invented to satisfy a requirements deadline is exactly the Goodhart threshold Stacy flagged.
3. **Q5's "if it cannot be made derivable, ship whole"** (14.8) — a conditional design decision whose antecedent is not mechanically testable at requirements grain. Stated as a conditional; the determination is a design-phase finding.
4. **The § 7.2 sign-off's OUTCOME** — 11.8.2 requires the pass to **occur and be recorded**, not to **pass**. Requiring a verdict would be specifying Stacy's conclusion, which is not ours to write.
5. **The cold-human run's generic trigger** (23.9) — no date, no name, no firing mechanism. Handled by requiring that it be **reported as still open at closeout** rather than by inventing a schedule that would be fiction.
6. **The trio's recurring per-release obligation** (23.7) — genuinely outside this spec; it needs a ballot-measure change to the release recipe. Named as a handoff rather than smuggled in as an AC.
7. **"Defaults are the product"** and the other accepted counter-arguments (26.6) — recorded positions, not requirements. They bind reasoning, not behavior, and flattening them into ACs would misrepresent them.
8. **The cut-line's residuals** (26.4) — the residual at each rung is *why* the order is what it is. It is prose whose job is to be read by whoever proposes the cut, and it survives as prose.
9. **The probe's n=1 status** (26.7) — an epistemic qualifier on evidence, not a requirement.
10. **The three framing lessons the round produced** — *the survey reads prose and misses machine-readable config*; *span-exists is not function-lives-there*; *presence of a token standing in for the property the token evidences* — bind how future work is reviewed, not what is built. They are carried in the Introduction's framing obligation and in Requirement 11's limitations, and a reviewer who thinks they need a home in an AC should say so.

---

*Requirements phase, draft. Feedback round opens at `.kiro/specs/123-consumer-distribution/feedback/requirements.md`. Per the sequential formalization gate, `design.md` does not open until that round completes.*
