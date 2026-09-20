# Requirements Document: 123 — Consumer Distribution

**Date**: 2026-09-20
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: Requirements Phase — **R1 ROUND COMPLETE, R2 INCORPORATED (2026-09-20). Awaiting a targeted R2 verification pass, then the requirements PR.** Authored from the settled outline (merged at `a062f44b`, PR #194 — Peter's merge was the formal settle act). Per the sequential formalization gate, `design.md` does not open until this round completes.
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
| **U3** | Onboarding: install doc, starter specs, personalization | 15–19, **19A** |
| **U4** | Content policy execution | 20–21 |
| **U5** | Validation & closeout | 22–25 |
| **all** | Execution constraints (cross-cutting) | 26 |

**Ordering is UNCONDITIONAL: U1 → U2 → U3 → U4 → U5.** The conditional that once governed it (*"U4 precedes U2 and U3 iff gate 4 prunes the served corpus"*) was **discharged by gate 4a** — the corpus ships whole, so nothing prunes by ruling. *Traces: outline § 9.1.*

### Explicit exclusions (decisions, not oversights)

- **125 Phase 3 (consumer-side enforcement) is OUT**, and package layout SHALL NOT preclude it. *Traces: outline § 12.*
- **No re-fixing F-C1 / F-C2 / F-C6**, and **no re-implementation of MCP server-side data-root fallback** — closed by 118's contract and the F-C2 patch. *Traces: outline §§ 4.1, 12.*
- **No plugin / third-party-contribution contract**; **no benchmark harness** (manual-first). *Traces: outline § 12.*
- **The `*.refs.ts` rename is NOT a 123 requirement** — it is Lina's own bounded issue, **landing before Requirement 8's lint merges in U1** (her R2 declaration, tighter than the original gate). *Traces: outline § 4.5 (Q8, ruled by Lina).*
- **The Q6 release-manager retirement execution** stays its own session. *Traces: outline § 12.*
- **The MCP infra-ring consolidation** is out; `FileWatcher`'s divergence is a named issue, not 123 scope. *Traces: outline § 4.7.*
- **The trio's RECURRING per-release obligation is not a 123 requirement** — it is a named handoff; see Requirement 23.7.

### Framing obligation, carried at the top

> **§ 7.2's re-grounding check has failed falsification twice and is NOT signed off.** These requirements specify it as ruled — including the substrate Peter bought and the criterion pre-stated for pass four — but **nothing here should be read as evidence the check works.** A green deterministic sweep is not evidence that a consumer charter was re-grounded; that is the exact error the two failed passes exist to prevent. *Traces: outline § 7.2; `feedback/design-outline.md` § [STACY R2], § [STACY R3].*

---

## Requirements

## UNIT 1 — Distribution substrate & packaging truth

> **U1's internal sequence is itself a requirement, because each step's correctness depends on the one before it:**
>
> **decide the authoring API (R1) → decide what `init` emits and copies (R19A) → extend the packed-install arbiter (R3) → diet to the resulting floor (R4) → RE-CERTIFY against the post-diet pack (R3.9).**
>
> A diet run before the API decision cuts against an unknown contract; a diet certified by a blind arbiter is not certified; **and an arbiter extended before the diet certifies a package that no longer exists** — `npm pack` is silent about both over- and under-inclusion, so a `files[]` change is precisely the class only a packed-install run catches. *Traces: outline §§ 4.2, 6.4; Ada B1/B2/B3, Ada R2 B2; Leonardo R2 Le-B1.*

### Requirement 1: Consumer authoring API surface (Q6 condition — Ada)

**User Story**: As a solo technical founder who has installed the package, I want a supported path to author my own themes and component tokens against the package, so that package-primary consumption does not silently require me to own copies of DesignerPunk's source. *Traces: outline § 4.2, § 3.8 (R7 → Q6 ruled); Ada B1, Ada R1 Q6 position.*

#### Acceptance Criteria

1. The package SHALL expose a **public token-authoring export subpath** exporting `SemanticOverrideMap` and **the shipped reference theme overrides as a set** (three today — `dark`, `dark-wcag`, `wcag`; **stated as a set, not an enumeration**, because `dark-wcag` is the accessibility-relevant one and a literal pair excludes the override set a WCAG-conscious consumer most wants) *(Ada R2 A1)*, so a consumer can import the shipped overrides as a starting point through the exports map rather than through a filesystem path. *(Today they are encapsulated dead weight — the compiled overrides ship, and Node's `exports` encapsulation blocks importing them.)*
2. `generateConfig()` SHALL emit a config carrying **none of its four current raw-`src/` couplings**, enumerated so none is missed *(Ada R2 B3 — the earlier text named one of four, and 19.1 did not remove the copy it was paired with)*:
   - **(i) `tokenSource: './src/tokens'` — DROPPED.** Without this, package-mode default never engages and Requirement 3.2 certifies a mode `init` never produces. **R7's "default" is a default nothing defaults to until this line goes.**
   - **(ii)+(iii) the `./src/tokens/themes/{…}/SemanticOverrides.ts` imports — RE-POINTED** at 1.1's export subpath.
   - **(iv) `componentTokens: ['./src/components/core', './src/tokens/component']` — RE-POINTED** at the consumer's own authoring directory. Both paths are consumer-relative and empty post-gate-4b, and the second names a layout this repo does not have *(Lina R2 A4)*.
   **The copy steps these pair with are decided at Requirement 19A**, not 19.1 — the earlier cross-reference pointed at a requirement that removed the wrong pair, so the matched pair was inert.
3. The **C′ consumer-aware catalog property SHALL be written as an acceptance criterion of this unit, not inherited from the outline's "pre-solved substrate" table** — and it SHALL assert **BOTH halves**: *(i)* a consumer-authored token name resolves, **and** *(ii)* the resolved root's **`source !== 'package'`**. *Traces: Ada's Q6 position; Ada R2 B4.*
   - **Why both**: `resolveConsumerOwnedRoot` falls through env → cwd-non-empty → **`source: 'package'`**, so "the MCP answers about the consumer's design system" is **true-looking when the consumer's `token-index/` was never generated and the package's shipped index answered instead.** A name that resolves is a token standing in for the property it evidences — **the presence-of-a-token class, fifth instance** (R26.8).
   - The existing guard's C′ block is **component-side by construction**, so a **token-side C′ case** is owed at Requirement 3.
4. A **second consumer-relative hardcode on this property SHALL be resolved**: `src/cli/designerpunk.ts` resolves a component-schema root for the **token index** with **no package fallback at all**. Two surfaces, one property, different resolution rules. *Traces: Lina R2 A5 (flagged cross-domain to Ada).*
5. **The `defineComponentTokens` discovery question is ANSWERED, and what remains is a RECORDED DECISION, not a measurement.** Measured *(Ada R2 A2)*: both harvest filters are `.ts`-hard and the loader is `scopedTsRequire`, so a compiled `dist/**/*.tokens.js` is **invisible to it today** — component-token authoring is package-primary-ready on the **export** side and raw-`src` on the **discovery** side. The open item is therefore a **design decision with that code fact as its input**: extend the filter plus a non-TS module loader, **versus** keep `.tokens.ts` on the floor, **versus** re-point the config template. **It SHALL be recorded as a decision**; it SHALL NOT be discharged by running one command, reading "no", and defaulting to the floor branch without anyone deciding.
6. Requirements 1.1–1.4 are **hard preconditions on package-primary (Q6)**. Both domain owners recorded their support as wholly contingent — Ada: *if the diet cuts `src/tokens`, package-primary collapses into dependency-consumption and the positioning counter is simply correct.*

### Requirement 2: Component catalog merges, never replaces (Q6 condition — Lina, Leonardo)

**User Story**: As a consumer authoring my first component, I want my component to appear **alongside** the ecosystem's components rather than replacing them, so that my most predictable first action does not silently delete my component library. *Traces: outline § 4.2; Lina B2 (blocking), Leonardo A14.*

#### Acceptance Criteria

1. The consumer-owned component root SHALL resolve as **union-with-precedence**: package components ∪ consumer components, with the consumer winning on name collision. It SHALL NOT resolve as first-non-empty-wins.
   - **The union SHALL apply to the resolved root SET INCLUDING THE ENV-SUPPLIED ROOT.** *(Lina R2 L-B1, blocking: `resolveConsumerOwnedRoot` returns on `envValue` **unconditionally**, with no existence check and no package fallback, and `init` **always** writes `COMPONENTS_DIR`. A union implemented in the cwd branch is dead code that no deployed consumer's process ever evaluates.)* **Env names the consumer's root; it does not name the only root.**
   - **Measured consequence this corrects, which is worse than the shadowing originally filed**: with the env var always set and the copy removed, the consumer's path does not exist, the env branch returns it anyway, and **the catalog is zero from minute one, before they author anything** — reported `healthy`.
   - Requirement 2 SHALL state **whether union semantics apply to all consumer-owned roots or to the component root only.** *(Lina R2 A8: the resolver also serves `tokenIndex` and the product server's roots, and the servers consume it through an **unchecked `as` cast against a hand-written interface** — so a return-shape change that misses one declaration site compiles clean and fails at runtime as a zero-component catalog reported healthy. Because the infra-ring consolidation is out of scope, this lands in three declaration sites, and that interaction is named here rather than discovered.)*
2. WHEN a consumer's component directory is **empty OR ABSENT** THEN the catalog SHALL present the full ecosystem component set. *(Leonardo R2 A2 — under a stopped copy the scaffolded value is **absent**, not empty; Lina R2 confirms both resolve identically today only in the branches the env short-circuit prevents from running.)* WHEN the consumer adds one component THEN the catalog SHALL present the ecosystem set **plus** that component — never that component alone.
3. The scaffolded `COMPONENTS_DIR` SHALL NOT resolve to a location that produces a **silently empty** catalog under package-primary, **and Requirement 19A SHALL name what the scaffolded value becomes.** *(Leonardo R2 A2: 2.3 forbade the outcome and named no positive resolution.)* *Traces: Leonardo A14 — "every screen-specification workflow dies quietly with a healthy-looking index."*
4. Requirement 2.1 SHALL land **before U2 or U3 depend on the catalog's contents.**
5. The per-component ownership path SHALL be this merge, not a command: **a consumer drops their fork in and it wins on its name; everything else continues to come from the package.** The install doc SHALL present this as the *first* ownership answer, with the repo clone as the whole-system escalation (Requirement 15.6). *Traces: Lina R1 Q6 — this answers § 14's "fork one component rather than the system" better than the retired `eject` would have.*

### Requirement 3: The certification arbiter covers the paths it certifies

**User Story**: As anyone who will later read "certified by the packed-install consumer guard" in a completion doc, I want the arbiter to actually exercise the path package-primary makes default, so that a green gate is not evidence about a path no consumer takes. *Traces: outline § 4.1 (arbiter qualification); Ada B2 (blocking), Lina B3 (blocking), Ada A4, Stacy R2 Part 2.*

#### Acceptance Criteria

1. **The arbiter is the packed-install consumer guard (`npm run test:consumer`). Certification SHALL NEVER be claimed from an in-repo load** — that false-greens. This rule is restated here rather than inherited, because three R1 findings showed the "pre-solved substrate" table stating arbiter rows as unqualified truths.
2. The guard SHALL gain a **packed-install package-mode case**: token resolution with `tokenSource` omitted, through real scoped resolution in a packed install. *(Today the only packed-install arbiter exercises `init`'d local mode every time, and the in-repo package-mode test states its own limit: "Real scoped resolution in a packed install is certified by the consumer guard" — and it was not.)* *Traces: Ada B2.*
3. The guard SHALL gain a **silent-zero hardening on the component surface**: `get_component_catalog`'s count from a packed install with an **empty or absent** consumer components directory SHALL **EQUAL the count of component directories in the package's shipped component root** — **derived on both sides, no magic number to update when a component lands.** *(Lina R2 A1: "non-zero" is satisfied by a catalog of 1, so the floor case is caught and partial loss passes.)* *(The existing assertion is `expect(get_component_health()).toBeDefined()`, and a zero-component index returns a perfectly well-defined health response. The token surface was hardened against this exact class; components never were.)* *Traces: Lina B3.*
4. The guard SHALL gain a **consumer-component-alongside case** asserting a consumer-added component appears **with** the ecosystem components, not instead of them (Requirement 2.2's arbiter).
5. The **Class C′ fixture SHALL be re-premised**: it builds on the **`src/components/core` copy, which Requirement 19A removes** *(Leonardo R2 Le-B1 — gate 4b removes the `governance/` and steering copies, not the component copy; the re-premising was right and its stated authority did not exist)*. It SHALL be re-authored to build the consumer's component tree **from nothing** — which is the stronger test, proving C′ for a consumer owning zero schemas. *Traces: Ada A4, Lina B3.*
6. Each new guard case SHALL ship with a **bite recipe** — introduce the deliberate failure, observe red, revert — recorded with the case.
   - **And each SHALL run with the scaffolded env vars SET** *(Lina R2 A2)*. `COMPONENTS_DIR` is always written by `init`; a case that leaves it unset exercises branches the deployed consumer never reaches. **This is 3.8's own rule applied to the two cases 3.8 exists to protect.**
7. A **token-side C′ case** SHALL assert Requirement 1.3's two halves — a consumer-authored token name resolves **and** the resolved root's `source !== 'package'`. *(Ada R2 B4: the existing C′ block is component-side by construction, so the token half has no case at all.)* *Traces: Stacy R2 Part 2 — "a guard case added to an existing suite is the single most likely place for a silently-not-running test."*
8. Requirements 3.2–3.7 are **hard preconditions on package-primary** and are owed in **U1, not U5**. *Traces: Stacy R2 Part 2 — in U5 they validate something already built on an uncertified default; in U1 they are the certification that makes the default adoptable.*
9. **THE DIET'S CERTIFICATION OF RECORD IS A CONSUMER-GUARD RUN AGAINST THE POST-NARROWING PACK**, and the U1 completion doc SHALL cite that run's date and commit. *(Ada R2 B2, blocking.)* An arbiter extended at step 2 and never re-run certifies the **pre-diet** package — *"a diet certified by a blind arbiter is not certified" satisfied in letter while the certification is about a package that no longer exists.* **`files[]` changes are the class only a packed-install run catches**: `npm pack` is silent about both over- and under-inclusion.
   - **This is the DURABLE arbiter of the floor, and Requirement 4.2's enumeration is a snapshot.** Stated here in the arbiter's own requirement because Ada's priority is explicit: *"if only one of the two is taken, take B2 — I would rather the floor be wrong and caught than right and unwatched."*
10. **Every row of the outline's "pre-solved substrate" table SHALL carry the path it was proven on** when restated in design or tasks artifacts. *Traces: Stacy R2 Part 2 — "a table of pre-solved things is exactly where a spec stops re-verifying."*

### Requirement 4: The packaging floor is a decision, and it is pinned

**User Story**: As a consumer's agent reasoning about an installed package, I want the package to contain what consumption needs and not the material that only DesignerPunk's own development needs, so that I reason past less irrelevant surface — without any load-bearing asset silently disappearing. *Traces: outline § 6.4; Ada B3 (blocking), Ada A3, Lina B1 (blocking), Lina R2 § 1.*

#### Acceptance Criteria

1. The floor SHALL be **decided downstream of the authoring API (Requirement 1), not discovered by measurement.** *Traces: Ada B3 — "measurement tells you what resolves today, and today everything resolves because `init` copies."*
2. **The floor IS THE RUNTIME-RESOLUTION CLOSURE of the package-mode generate entry, derived mechanically. The bullets below are the DECLARED members; the closure is the COMPLETE one.** *(Ada R2 B1, blocking: `src/tokens/**` is loaded as raw TS at generate-time, so its runtime import closure is on the floor with it — and the escaping value-position imports include `TokenCategory`, an **`enum`, a runtime value**, which transpilation does not erase. An enumeration treated as the floor rather than as a minimum breaks package-mode `generate` — the exact failure B3 exists to prevent, reproduced inside the requirement that absorbed it.)*
   - **Recipe**: resolve every non-`import type` relative import escaping `src/tokens/**` and take the transitive closure.
   - **The recorded closure is a SNAPSHOT with known decay, and this is stated in the requirement rather than in a feedback entry**: it holds under *this* transpiler's erasure semantics, and a type-only import that vanishes today can become a value import tomorrow without any source change. **The durable arbiter is Requirement 3.9's post-diet packed run, not this list.**
   - The declared members, expressed as **explicit `files[]` entries**, never inherited from a wholesale `src/` that a later narrowing can silently take:
   - `src/tokens/**` — load-bearing at generate-time in package mode
   - `src/styles/`, `src/assets/fonts/**` — the `./fonts/*.css` and `./grid.css` exports resolve here; the dist glob excludes `woff2`
   - `src/cli/templates/`
   - **`src/components/**/*.{schema.yaml,contracts.yaml,component-meta.yaml}`** — the component metadata floor
3. WHEN the component metadata is absent from the resolved root THEN the component catalog is **empty in package mode**, and `get_component_health` reports that as **healthy** — so this floor member SHALL be pinned and SHALL be covered by Requirement 3.3's assertion. *(No compiler emits these: `find dist -name "*.schema.yaml"` returns zero, because the dist glob carries no `.yaml`.)* *Traces: Lina B1.*
4. `__tests__` and `examples` under `src/components/**` SHALL NOT ship. *Traces: Lina R2 — ~1.54 MB, "the only place in the diet where an item is mass rather than hygiene," and 30× the audit's named dead directories combined.*
5. The disposition of **`.swift` and `.kt` component sources** SHALL be decided by **Kenya and Data**, not by this spec's authors, **and the tasks round SHALL give that decision a named landing artifact or it becomes a conversation** *(Lina R2 A9)*. `dist` carries three `.swift` and three `.kt` files in total, so **`src/` is the only rail platform sources reach consumers on**; cutting the tree wholesale would ship iOS and Android consumers a design system with **no component implementations at all**, while web consumers remain served by compiled `dist`. *Traces: Lina R2 § 1 — this is the content of § 14's recorded platform-agent trigger.*
6a. **A CONDITIONAL member**: IF Requirement 1.5's recorded decision keeps `.tokens.ts` discovery on the raw-`src` path THEN `src/components/**/*.tokens.ts` joins the floor. *(Ada R2 A3: without a forward pointer, 1.5 and 4.2 can be satisfied independently and disagree.)*
6b. **Two `files[]` entries SHALL be REMOVED**, both consequences of Requirement 14.5's deletion that its reference sweep did not reach *(Ada R2 A4; Lina R2 L-B5)*: **`"product-template/"`** — the directory contains only `agents/`, so the deletion empties it, and **`npm pack` is silent about a `files[]` entry pointing at nothing**; and **`".kiro/agents/"`** — 32 files including **16 `*.attribution.json` sidecars, each a literal index from shipped steward output back to `canonical/agents/<agent>.md#body`**, so shipping it hands a consumer the un-re-grounded steward charters **and a map to their source.** *(Lina's answer to Ada's directed question: **DROP**, do not replace with `canonical/_consumer-output/` — that is a CI sweep surface so this repo has something to guard, not a delivery artifact, and shipping it recreates a second tree and invites the copy reflex back. Consumer artifacts are generated at `init`.)*
6c. `designerpunk.config.ts`'s `componentTokens` names `./src/tokens/component`, **a directory this repo does not have** — a shipped template asserting a layout we lack. Hygiene, corrected at Requirement 19A. *(Lina R2 A4.)*
6. The audit's dead directories (`src/performance/`, `src/workflows/`, unimported `.example.ts`) SHALL be deleted as hygiene, with the zero-importer claim verified first — **and SHALL NOT be described as the diet**, since they are ~0.5% of the mass. *Traces: Ada A3.*
7. U1 SHALL **declare a tarball target** derived from the decided floor, naming **which lever it measures**; U5 asserts against that declared target (Requirement 25.3). A bare delta SHALL NOT be used as a criterion — *"a delta with no direction and no floor is satisfied by any value, including a positive one."* *Traces: Stacy A4, Ada A3.*

### Requirement 5: Scaffold and registry repairs

**User Story**: As a consumer who ran `init` before these fixes, I want `sync` to detect and repair what the old scaffolder wrote into my repo — **and I want the scaffolder's own outputs generated rather than hand-maintained** — so that a defect repaired in the package is repaired both in the repos it already damaged and in every repo it creates next. *(Leonardo R2 A10: 5.3–5.4 are template-generation requirements sitting under a repair story; the story is widened rather than the clauses moved, since both halves exist to stop the same drift.)* *Traces: outline §§ 1.3, 4.3, 4.4; D-live-5 issue record; Leonardo A7 (D-live-6).*

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
5. It SHALL carry a **register row** in `governance/classification-map.md` with an owner and a `check_state`, **and the row SHALL state its post-merge disposition as the ADJUDICATED case.** *(Stacy R2 S-A4: `audit:coverage-map` is zero-blank-row **or adjudicated**, and an unmarked row invites the next ARMING event to "repair" it into the PR check 6.6 forbids.)*
6. It SHALL NOT be registered as a PR required check — **the event it verifies happens after merge**, so there is nothing at PR time to gate. Its armed evidence is the recorded red from 6.3, not gate registration. *(Ruled sufficient by Stacy, R2 Part 3.)*
7. **Liveness SHALL be detected by the RELEASE claims pass** reading whether the guard ran and what it returned — **and the release step SHALL RECORD its invocation and result at a NAMED LOCATION**, on the `RELEASE-FLOW.md` step-5a precedent. *(Stacy R2 S-B4, blocking: the RELEASE pass reads the release delta plus what the checklist pasted, and **a guard run is an event in the release PROCESS, not a diff in the delta** — so without a paste target the read has nothing to read and degrades to reconstructing process history from memory, which is the trust-the-reported-result failure the pass exists to avoid. The irony of shipping an unexecutable mitigation inside the requirement born from an unverified one is named here deliberately.)* This is Stacy's seat and uses her existing mechanism — a post-merge guard that silently stops running otherwise has no ARMING event to catch it and no required-check set to fall out of. *Traces: Stacy R2 Part 3.*
8. **Ada's `dist.tarball` host-provenance candidate is VERIFIED** *(Ada R2 A5 — run today, it returns `https://registry.npmjs.org/@3fn/core/-/core-14.1.0.tgz`; field name correct, host assertion implementable as described)*. Two consequences: **(i)** it composes with **6.2's scope-explicit flag form VERBATIM** — A8's original bare-`--registry` form is **void**, and a reader following the citation would inherit the void flag *(Ada R2 A6)*; **(ii)** because the host assertion asserts the **answer's** provenance rather than the **question's**, it is **strictly stronger** than 6.2's version check, so U1 SHALL **decide and record whether it AUGMENTS or SUPERSEDES 6.2** — the earlier text forbade merging *before* verification and was silent about after, *"and that silence is where an armed guard quietly stays a candidate."* **Leonardo A15's hermetic invocation** (`npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null`). *Rationale: the founding finding of this requirement was that an unverified guard shipped as a mitigation.*

### Requirement 7: Product MCP wiring (Leonardo B1)

**User Story**: As a consumer's Leonardo, I want the product MCP server wired and a product tree scaffolded, so that the five product-content tools routed to me at Spec 122's cutover can actually be called. *Traces: outline § 4.6; Leonardo B1 (blocking).*

#### Acceptance Criteria

1. The scaffolded MCP config SHALL declare a **third server entry** for the product MCP with `PRODUCT_DIR`. *(The runner already exists — `runMcpProduct()`, and `build:mcp` bundles `dist/mcp/product-mcp.js`. The wiring does not.)*
2. The two-server **equality assertion** in `src/cli/__tests__/init.test.ts` SHALL be updated **deliberately**, as a declared change — not discovered as a failing test. *(The omission is currently guarded, not incidental.)*
3. **The third entry's `autoApprove` SHALL be GENERATED per Requirement 5.3, like the other two.** *(Leonardo R2 A1: the product server is the one surface with **no legacy hand-list to inherit** — it can be **born clean** — and 13 `designerpunk-product` tools are WHEN/THEN obligations in his charter. A hand-written or empty list here re-creates D-live-6 on the one surface that could have avoided it.)*
4. Whether `product-mcp-server/src/` belongs in `files[]` SHALL be decided and recorded. *(The other two server sources ship; it does not.)*
5. The `product/` tree scaffold is **U3 scope** (Requirement 19.5); the acceptance that a consumer's Leonardo answers a real product query is **U5 scope** (Requirement 25.4) — **and 19.5's worked example screen IS the artifact 25.4 queries**, named in both, so the acceptance is self-contained rather than depending on a run-time authoring step that would quietly downgrade it to *"the server started."* *(Leonardo R2 A8.)* *Traces: Leonardo B1's four deliverables, placed in the units where the work lives — "a one-clause placement in the wrong unit is how this arrives at U5 undone."*

### Requirement 8: The harvest-zero lint (Q8 — ruled by Lina)

**User Story**: As a consumer who named a semantic-reference map `tokens.ts`, I want to be told at the moment of confusion why my component tokens did not register, so that I do not have to read the package's source to discover that two mechanisms wear one filename. *Traces: outline § 4.5 (Q8, Lina's call); Ada's directed question; Leonardo's Q8 position.*

#### Acceptance Criteria

1. A lint SHALL warn when a scanned `tokens.ts` / `*.tokens.ts` file **exports no `defineComponentTokens`-BRANDED value**, with a named explanation directing the author to `defineComponentTokens`. *(Lina R2 corrects the trigger: **"harvests zero component tokens" is a false-positive generator**, because the loader dedupes by token name **first-seen-wins across modules** — so a fully branded, entirely legitimate file whose names were already harvested from an earlier-scanned module contributes zero and would be told to call a function it already called. The branded-export test is the property the message asserts and is immune to scan-order dedupe.)*
2. The lint SHALL read the signal 124's brand already computes; it SHALL NOT introduce a second detection mechanism. **It is not a pure read, and U1 SHALL NOT size it at zero**: the brand check runs inside a harvest that pushes into a **shared array with no per-file attribution**, so the scan needs instrumenting to record a per-file branded-export count. Bounded, but a loader change. *(Lina R2.)*
3. WHERE the consumer is in package-primary mode the lint is **the only feedback channel** — there is no copied neighbour set to diff against. *Traces: Lina R2 § 2 — "package-primary removes that self-service path."*
4. The `*.refs.ts` rename is **out of scope for 123** and is Lina's own bounded issue. **Her declaration, which is now the binding timing and is strictly tighter than the earlier gate: the rename lands BEFORE this lint merges in U1** — she targets before U1 execution begins, since the work has zero dependency on any 123 artifact. *(Scope re-measured: **7 files** to rename plus **12 importing files**; the scan-reachable denominator is **14**, correcting her own earlier figure.)*
   - **Why the gate moved earlier than "before U3"**: the lint's trigger set is our own filenames. Merging the lint first produces **7 warnings against our own source**, resolving as either an exemption list (*"we lint consumers for what we ship"*, made mechanical and permanent) or suppression (which teaches the warning is noise before a consumer ever sees it). **Landing the rename first makes the lint's launch state zero false positives — the only state in which its first firing is informative.**
   - **IF reduce-not-grow defers the rename anyway THEN this requirement SHALL state that the lint ships with a recorded exemption list, named as a known defect** — not discovered at merge. *(Lina's surviving counter: she is tightening a gate on herself and putting a dependency in front of U1, and accepts that rather than soften it.)*

---

## UNIT 2 — Consumer generation profile

### Requirement 9: The generation profile dimension (Q9 — ruled shape (ii))

**User Story**: As the generator, I want profile to be an emission dimension rather than a new target, so that one canonical source produces both steward and consumer renderings without a second adapter to keep in sync. *Traces: outline §§ 7.1, 7.3, 10 (Q9 ruled (ii)); Lina A1, Lina R2 § 3.*

#### Acceptance Criteria

1. Profile SHALL be threaded as an **`AdapterContext` field**, not as a new `TargetAdapter.target` union value. The `target` union SHALL remain unchanged and the ~20 `.target` references across the pipeline SHALL remain untouched.
2. Adapters SHALL read `ctx.profile`; emission logic SHALL remain single-sourced. No adapter SHALL be duplicated or subclassed for the consumer profile. *Traces: Lina A1 — a duplicated emitter "recreates the hand-fork D-live-3 is the tombstone for."*
3. `skills-map.yaml` and `field-dispositions.yaml` SHALL gain **zero to two** rows, not the 20 a third target would have required.
4. The profile-aware sweeps SHALL **iterate over profiles**, not handle a new target's semantics.
5. A **checked-in, diff-guarded consumer rendering of all eight agents** SHALL exist in this repo at `canonical/_consumer-output/<target>/`, following the existing `generateFixture` remap precedent — **for a DECLARED target set, and that set SHALL be the same set Requirement 23.6's runs are distributed across.** *(Stacy R2 S-A5: `<target>` had no declared set, so one target checked in against two targets run would leave the diff-guard covering half the evidence with the criterion green — a denominator by reference.)* *(Without it the real rendering exists only in a stranger's repo at `init` time and CI has nothing to sweep.)* *Traces: Lina R2 § 3.*
6. **Lina's surviving counter is recorded, not dissolved**: (ii) front-loads pipeline work with nothing demoable until finished, and it makes the profile axis **permanent** — a standing cognitive tax on every future sweep, guard and lock author. Both costs are owned.

### Requirement 10: Section-granular attribution provenance (Fork (B) — ruled)

**User Story**: As the re-grounding check, I want provenance at the granularity of a section rather than of a whole rendered body, so that a claim about where a function went can be verified against generator-emitted evidence rather than taken on the profile author's word. *Traces: outline § 7.2 (Fork (B), ruled Peter 2026-09-20); Stacy R3's measurement.*

#### Acceptance Criteria

1. The generator SHALL emit **section-granular attribution spans for charter bodies**, replacing the single `passthrough → …#body` span. *(Measured: 373 rendered lines of `stacy-prompt.md` are one span.)*
2. The generator SHALL emit **per-section spans for always-set members**. *(`CLAUDE.md` currently carries one `resolve` span per whole doc-id — the always-set inherits the charter-body defect rather than having its own.)*

**10.G — THE GRAIN, DECLARED** *(Stacy R2 S-B8, blocking — the finding that decides whether Fork (B) bought anything)*

3. **The span grain and clause (ii)'s application unit SHALL be THE SAME PARTITION, and that partition is THE FINEST STABLE STRUCTURAL UNIT THE DOCUMENT ACTUALLY HAS.**
   - **Why this is derived rather than chosen**: a generator emitting one span per `##` is *section-granular* in plain English and satisfies a grain-silent requirement — **while attack (a) survives verbatim**, because 11.4's *"S, or a sub-range of S"* is then satisfied by the very span that also contains the destination. Measured: `### The trigger set` and `### The owed-set pipeline` share the parent `## Operational Mode: Claims Audit`. **At `##` grain Fork (B) buys a finer `#body` and nothing else.**
   - Concretely: **charters** — the finest heading level present; **always-set prose members** — the heading set where headings exist, **the document's own top-level enumeration where they do not** *(`start-up-tasks.md` has zero `^## ` and seven numbered items)*; **template members** — the declared slot set.
   - **The splitter SHALL be FENCE-AWARE.** *(Lina R2: `Spec-Feedback-Protocol.md` carries 4 fenced `^## ` lines inside a ```` ```markdown ```` block — a naive scan mis-parses **25%** of that member's unit set as document sections.)*
   - **ONE splitter, THREE consumers**: charter-body spans (10.1), always-set spans (10.2), and clause (ii)'s application unit (11.3.2 / 12.3).

**10.S — THE SOURCE-ATTRIBUTION SEMANTICS, DECLARED** *(Stacy R2 S-B10, blocking; decided jointly with Lina per her requirement that the answer come from the owners rather than from the text)*

4. **A span's `source` names the CANONICAL ORIGIN whenever one exists, REGARDLESS OF TRANSFORMATION. The `op` field names how it got there.**
   - transformed re-grounded section → `{ op: 'render', source: 'canonical/agents/<a>.md#<section>' }`
   - verbatim carried section → `{ op: 'passthrough', source: '…#<section>' }`
   - **profile-ORIGINATED text with no canonical counterpart** → `{ op: 'render', source: '<profile>:<id>' }`
5. **Rationale, because the decision is contestable and the reasoning is the thing to contest**: `source` means **provenance — where content came from**. Encoding *whether it was transformed* into `source` conflates two facts the schema **already separates into two fields**. The dichotomy the round exposed (R11.4 needs `source: S`; an alternative repair needed `source: <profile>`) is **real in the text and false in the schema.**
6. **Two consequences, both stated here rather than discovered at pass four**: *(i)* R11.4's DERIVATION test is satisfiable by an honest re-pointing and **rejects attack (a)**, whose destination span sources a different section; *(ii)* any triviality test that discriminates on *sourced-to-profile-means-rewritten* is **inert** under this semantics — which is why Requirement 11.6's rework is **extensional** rather than provenance-based.
7. Provenance SHALL be **generator-emitted, never profile-declared.** The profile names a disposition; the generator supplies the evidence; the check compares them.
8. **The split SHALL be an EXACT PARTITION and the concatenation SHALL be BYTE-IDENTICAL to the source body** — every line assigned to exactly one block, **including the preamble before the first heading and any trailing content**. *(Lina R2 A6: `renderPassThrough` is the identity function **by contract** — *"pass-through prose is never synthesized, summarized, or rewritten"* — so a splitter that drops a blank line between sections breaks that contract **and** the tiling check simultaneously.)*
9. **The tiling invariant is granularity-agnostic and does NOT collide with per-section spans** *(Lina R2 A6, discharging Stacy's carried R3 question)*: `checkAttributionTotality` constrains **coverage, not span count**, and the accumulator assigns lines and advances a cursor, so splitting one block into N sub-blocks whose line counts sum to the original is invisible to it.
10. The existing totality check SHALL be understood and documented as **an output-coverage proof that is structurally silent about input coverage** — a charter gutted to 40 lines tiles perfectly with one passthrough span. It SHALL NOT be cited as evidence for any clause of Requirement 11.
11. This work SHALL compose with Requirements 9.5, 14.1 and 14.2 rather than being scheduled in isolation — **that composition is why Fork (B) was priced as affordable.**

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
9. **The FULL CLAUSE SET (i)–(v) PLUS 11.4's criterion** SHALL be run **on Thurgood's rendered consumer output as a named acceptance item**, not on the set average. *(Ada R2 A7: the earlier text said "the check" two clauses after 11.3.7 demoted verb-presence to a smoke test, so the item was dischargeable by running the **retired** check on the right agent. Her A7's substance is unchanged — a non-collapsing agent reporting no collapse is near-worthless as testimony; her own charter subtracts to ~1 line and proves nothing about his.)*

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
   - **The denominator, named**: *rows disposed `no-consumer-counterpart` / total dispositions, per agent*; the comparison population is *across releases*.
   - **123's U2 is release 1, so within this spec it produces a BASELINE, not a detection.** That is correct and it SHALL be stated, because a requirement reading *"the rate detector is Stacy's"* invites a U2 Evidence cell claiming a detector is in place and operating. **Baseline in 123; detector from the second population onward.** *(Stacy R2 S-B2.)*
   - **The seam, named because it falls between two seats otherwise**: the counting block lives in **127's claims-pass template, which is THIS AUTHOR's artifact**; the **duty** is Stacy's. **The template edit is Thurgood's to make; the counting is hers to do.** The earlier text assigned the duty and named only her.
   - **Rider, stated against the instrument**: a counted-but-unrouted rate is an **observation, not a guard** — true of every row in that counting block by design. The rot mode is a reader treating the count as a guard.
4. **C2 — the asymmetry repair**: refusal SHALL be a **one-flag return** (*"this should re-point"*) routed back to the profile author who owns the authoring, and the signature SHALL be **per-row, not per-batch**. *Rationale: assent is free and refusal is expensive, so a signer facing 30 rows of which 28 are true approves the batch and the one that matters rides in — the repair removes the expensive side rather than adding ceremony to the cheap one.*
5. **One hard mechanical floor**: a consumer charter in which **every** operational-mode section is disposed `no-consumer-counterpart` **SHALL FAIL by construction** — R5 ruled the role ships intact. Between that floor and full retention the check **routes to review rather than guessing.**

**11.6 "Trivial" — C3 v2, REWORKED against the delivered exemplars**

> **C3's first candidate came back FALSIFIABLE-AND-BREAKS** (Stacy, four exemplars; Lina, two independent constructions on a different charter). **The structural diagnosis, which v2 is built against**: *the candidate is **EXISTENTIAL over kinds** where the function it guards is **EXTENSIONAL*** — the counterpart supplied the list of kinds to look for and never a quantity to compare against, so the satisfaction floor sat at **one instance of one kind**, and obligation is the cheapest kind there is because it is a grammatical mood.

1. **(a) DOMAIN RESTRICTION.** WHERE the canonical counterpart carries **zero operative items**, triviality is **INAPPLICABLE — not vacuously true.** Such a section is outside clause (ii)'s trigger; its removal is covered by (iii). *(Lina's repair 1, adopted; Stacy: "clears — I can construct no residual against it." It kills the vacuity on expository sections, which otherwise fired hardest on `## Identity` — precisely where R5's "the ROLE ships intact" is carried, generating a mandatory false finding on all eight agents in the place the ruling lives.)*
2. **(b) THE BAR IS EXTENSIONAL, COUNTED PER ITEM.** A section is **trivial with respect to its canonical counterpart** if its rendering **retains fewer than half of the counterpart's OPERATIVE ITEMS**, where an **operative item** is an individual **obligation, procedure step, enumeration member, route, or command** — **counted, never kind-checked.**
3. **Definitional and expository content is NOT operative, regardless of formatting** — a definitional enumeration is prose in a list. *(This is what prevents the false-positive population Stacy identified as **not** the paraphrase class clause (iii) deliberately routes to humans: a faithful compression of definitional prose must not trip the trigger, and rationale is a large fraction of charter mass.)*
4. **(c) LABEL-RETENTION IS NOT RETENTION.** An operative item counts as retained **only if its own operative content survives.** Keeping a heading, a step title, or a table row's key while emptying its body retains **nothing.**
5. **The exemplars this is written against, with their required verdicts** — *(Stacy's four, Lina's two; any future revision SHALL be re-checked against all six)*:

| Exemplar | Construction | Required verdict | Clause that produces it |
|---|---|---|---|
| **A** | 8-item enumerated set + obligations → one imperative sentence | trivial | (b) — ~1 of ~10 |
| **B** | Named procedure + 4-stage script + enumerated exclusion classes + commands → one sentence, disposed `re-pointed` | trivial | (b) — **verdict-bearing: triviality is the ONLY quality bar on the `re-pointed` lane** |
| **C(c1)** | Counterpart carries zero operative kinds; rendering byte-identical | **inapplicable** | (a) |
| **C(c2)** | Definitional enumerated set, faithfully compressed to one declarative sentence | **inapplicable** | (a)+(3) — definitional content is not operative |
| **D** | 11-row table → 1 row retained | trivial | (b) — 1 of 11 |
| **Lina-1** | Section reduced to three sub-headings with one bullet each, losing the rule, the conventions and the contract | trivial | (b)+(c) — bare headings are discounted |
| **Lina-2** | Seven step headings retained, every body reduced to *"Create the file."* | trivial | **(c) does the work** — seven labels, zero operative content |

6. **Two honesties carried in the requirement's own text.** **(i) The number is the author's and it is arbitrary** — **clause (c) does the real work** and *half* is a coarse backstop; it is expected to be attacked. **(ii) This is item-COUNTING, not item-granular SPANS** — a text analysis, not a provenance analysis — so it builds on the **section-granular** substrate Fork (B) bought and **does not silently assume the item-grain Lina correctly flagged as an unbought fork.** *(Her sentence, and it is why this is said out loud: "a 'trivial' definition that silently assumes item-grain would be the fourth iteration of the same substrate mistake.")*
7. **C3 v2 GOES TO ITS OWN FALSIFICATION BEFORE PASS FOUR, not as part of it.** *(Stacy's directed question, answered: pass four is scoped to attack (a) verbatim, and attack (a) **runs through the triviality bar** — so an unfalsified C3 would make pass four an open-ended read, which is the thing Fork (B)'s condition was bought to prevent. Two passes, sequenced. The extra pass is a real cost and it is preferred to smuggling a threshold into the one-line verification.)*
8. **Owner: Thurgood** (the vocabulary's owner, per the Q5 boundary). **Stacy owns the exemplars** — delivered, and now enumerated at 11.6.5. **Neither half is open any longer; what is open is the verification.**

**11.7 The check's named limitations, carried in the contract's own text**
1. Every trigger concerns what canonical **had**. **Nothing constrains what the rendering GAINED** — profile-added text with no canonical source and no repo-specifics passes every clause.
2. **Semantic inversion inside a fully retained section** (*"owns" → "advises on"*) triggers no disposition. Both are largely covered by generator diff-guard on a reviewed profile — *"but 'largely covered by review' is the sentence that precedes the next finding."* *Traces: Stacy R3 attack (e).*

**11.8 Sign-off — the gate binds its CONSEQUENCE, not only its occurrence** *(Stacy R2 S-B1, blocking; this is the single normative home, and 24.4 points here rather than mirroring it, because a rule stated twice is a rule that drifts)*

1. § 7.2 **IS NOT SIGNED OFF.** Pass four is a **U2 acceptance gate**, not a settle precondition, and **the author is recused.**
2. **U2 SHALL NOT be accepted until pass four has been RUN, its verdict recorded, AND THE BRANCH THAT VERDICT SELECTS EXECUTED AND EVIDENCED in the U2 completion doc.**
   - *Why the earlier form failed*: **occurrence alone is satisfiable by any outcome.** *"Pass four ran; verdict: FAILS"* discharged the gate with U2 shipping and nothing changed — the satisfiable-by-zero class one level up. And *"Fork A fires"* named a state change **with no artifact**: nobody owned the edit, the timing, or the evidence.
   - **This specifies no verdict. It specifies that each verdict COSTS AN ARTIFACT EDIT.**

| Verdict | Consequence that SHALL be executed and evidenced |
|---|---|
| **PASSES** | (v)'s mechanical half moves into Requirement 24.3's deterministic list — **the table edit is the artifact** |
| **FAILS** | **Fork A executes**: (v)'s mechanical half is struck, the behavioral instruments own the property, 24.3's labelling is updated — **the demotion edit is the artifact** |
| **NOT-RUNNABLE** | **Treated as FAILS for consequence purposes**, and recorded in the closed negative form (*not re-verified — <reason>*). **An unverifiable row never rolls into a ✅** — that rule is not optional at spec grain either |

3. **NOT-RUNNABLE is an enumerated state, not an edge case.** 11.4.2 scopes pass four to re-running attack (a) verbatim; if the emission makes that construction unbuildable, the honest record is the closed negative string and there must be a slot for it.
4. **The recusal seam**: the pass-four record is **a committed artifact at a named path, authored by Stacy.** The U2 completion doc's Evidence cell **CITES THE PATH and does not restate the verdict** — pointer, not paraphrase. *(11.8.1 recuses the author from the pass; the executing agent still authors the doc that claims the pass happened, and this is the seam that keeps the claim from becoming an interpretation.)*

### Requirement 12: The always-set re-grounds as a class (Lina B5)

**User Story**: As a consumer's agent loading identity content unconditionally, I want that content to be about my repo, so that law I cannot follow does not arrive as always-loaded context. *Traces: outline §§ 6.2 (option (d)), 7.2; Lina B5 (blocking); Stacy R3 attack 5.*

#### Acceptance Criteria

1. The nine always-set members SHALL receive **consumer renderings**, and **Requirement 11's clauses APPLY to those renderings** — the title says *re-grounds as a class* and one clause must say it, rather than leaving coverage for seven of nine members to arrive by implication from 12.3's application unit. *(Stacy R2 S-A10: "receives a rendering through the pipeline" is satisfied by a **byte-identical** rendering.)* `personal-note`'s template-ization (Requirement 18) is **the pattern, not the exception**.
1a. **THE PRECONDITION, DECIDED: path (B) — the shipped steering doc IS the canonical counterpart, with a profile transform at embed time.** *(Lina R2 L-B4, blocking: the nine are **not canonical-authored** — charters live at `canonical/agents/*.md`, the nine are plain `.kiro/steering/*.md` resolved by doc id, and there is no `canonical/` source for any of them. 12.1 named an outcome whose precondition was unstated, and the precondition is most of U2's always-set mass.)*
   - **Decided on SCOPE grounds, not preference**: path **(A) canonicalize the nine** would put **always-loaded identity docs under generator control in this repo** — a change to how identity content is authored and maintained, i.e. a **Civitas-layer governance change requiring a ballot 123 cannot grant itself.** This spec's own § 2 states *"Not a rewrite of the substrate."*
   - **Lina's reasoning is the recorded ground**: the always-set's delivery is `file` for every member on every target, so there is **no per-target rendering variance to justify canonicalizing**, and (A) would put nine hand-authored docs under generation to buy a property (B) already provides.
   - **(B)'s cost is accepted and stated rather than discovered**: for always-set members the "canonical counterpart" in Requirement 11's clauses is a **shipped artifact rather than a canonical source**, so **11.3.3's applicability verification — which reads canonical alongside rendered output — SHALL be told which is which.**
   - **(A) is deferred, not foreclosed**: it remains available as a future governance change with its ballot precondition named.
2. A consumer rendering SHALL exist for **each of the nine**, and **each SHALL have a non-empty clause-(ii) unit set** — the testable form of "re-grounds under R5's logic", which as a bare rationale was not an outcome. *(Lina R2 A9, EARS hygiene.)* `Task-Completion-Protocol.md` and `start-up-tasks.md` are named instances — *a* completion protocol and *a* startup checklist for *their* repo — and SHALL NOT be deleted or merely banded. *Rationale: a banner is a reading instruction; the always-layer is not read, it is loaded. And banding buys the reference-corpus mode nothing, because identity docs are never MCP-served.*
3. **The application unit for clause (ii) — SHAPE CONFIRMED by Lina, SOURCE AMENDED.** It SHALL be **DERIVED from the member's own source text at emission**, by the fence-aware splitter Requirement 10.G already owes — **never recorded in an authored field.** *(Lina R2 L-B2, blocking: `canonical/shared/always-set.yaml` records **no heading set for any member** — the earlier text named a field that does not exist. And an authored field would be a **hand-maintained duplicate of a derivable fact**: the doc's headings change, the YAML does not, and clause (ii) silently checks a stale section set — the drift surface she argued against at Q5 and Q9, arriving through the back door.)*
   - **Heading set where headings exist; the document's own TOP-LEVEL ENUMERATION where they do not.** *(`start-up-tasks.md` — one of the two documents that motivated the class — has **zero `^## ` headings** and **seven numbered top-level items**; under the earlier text its application unit was **the whole document**, which is the granularity defect Fork (B) was bought to repair, reproduced inside the always-set.)*
   - **Rationale, generalized to the grain rule at 10.G**: the unit must be **the finest stable structural unit the document actually has.**
   - **The DEGENERATE case is a DECLARED STATE, not a clean pass**: a member with neither headings nor a top-level enumeration has **one unit** and SHALL be recorded as such in the U2 completion doc.
   - **Template members: CONFIRMED as written**, no amendment — the declared slot set is the right unit, and `personal-note.md` is its only instance today.
   - **Lina's residual, recorded because it is the cost of her own call**: derivation makes the unit set a function of prose, so an editor merging two headings silently changes the check's application unit with no review signal. She chose derivation anyway — a stale recorded set fails silently in the *other* direction, and the generator's diff-guard surfaces a derived-set change as an output diff.
5. This work lands in **U2, not U4** — it is generator work, which is also what removes the second U2↔U4 coupling.

### Requirement 13: Declared degradation on missing docs (Lina B4)

**User Story**: As a consumer whose installed package is missing a corpus member — **a diet defect or a partial install** — I want generation to warn rather than crash, so that my first command does not fail on a file I never touched. *Traces: outline § 9.1; Lina B4 (blocking); Lina R2 L-B3.*

> **THE TRIGGER IS RE-ANCHORED, and the behavior is unchanged** *(Lina R2 L-B3)*. The original story — *a stranger deleted a governance doc from their own repo* — **is unreachable once gate 4b stops `init` writing `governance/` into their repo.** The behavior still ships; its justification was the wrong one, and *"a guard justified by an unreachable story is the first thing a cut-line removes."* The reachable triggers are named above, and Requirement 4's diet makes the first one a live possibility rather than a hypothetical.

#### Acceptance Criteria

1. The **steward profile SHALL keep the throw** — in this repo a missing always-set member or ambient embed **is** a generator bug.
2. The **consumer profile SHALL degrade with a named warning**: emit the charter minus the unresolvable member, warn, exit zero.
3. The distinction SHALL be documented as a statement about **corpus ownership** — throw where the corpus is ours and controlled; degrade where it is theirs and mutable. *Traces: Lina R2 — "this makes the throw a statement about corpus ownership rather than a defensive default."*
4. This behavior is required **regardless of ordering**: no ordering rule protects against a member absent from the installed package.
5. **Requirement 13 SHALL carry a BITE RECIPE, like every sibling guard in this spec** (3.6, 6.3, 17.1): a test asserting the **warning TEXT and `exit 0`**, plus its bite — delete a resolvable member from a packed install, observe the warning and the charter-minus-member, revert. *(Lina R2 A3: **degradation is the canonical dormant behavior** — the warning path silently reverts to a throw, or worse to silence, and nothing notices.)*

### Requirement 14: Generator delivery mechanics and the legacy-path deletion

**User Story**: As a consumer running `init --target`, I want the generator to run from the installed package without a TypeScript runtime and to emit only my artifacts, so that generation works and my repo does not receive DesignerPunk's governance telemetry. *Traces: outline §§ 4.6, 7.1, 7.3, 6.2 (gate 4b); Lina A2, A3, A5, A6; D-live-2, D-live-3.*

#### Acceptance Criteria

1. A **compile lane** SHALL build the generator (esbuild alongside `build:mcp` is the named precedent), with a bin subcommand and `files[]` entries. *(Today `tools/agent-generator/**` is not compiled by `npm run build` and is not in `files[]`; its only invocation is `npx tsx`, which would violate 118's no-TS-runtime guarantee for consumers.)* *Traces: Lina A3.*
2. A **distinct consumer emission entry point** SHALL exist. `generateAll(repoRoot)` SHALL NOT be re-pointed: one `repoRoot` currently serves canonical **inputs**, doc-id **resolution**, and **output** paths. **All THREE jobs are assigned here, because the earlier text named the middle one and dropped it** *(Lina R2 L-B3, blocking)*:
   - canonical **inputs** → **package root**
   - **doc-id resolution → PACKAGE ROOT.** *Derivation: gate 4b stops `init` writing `governance/` into the consumer's repo, so a consumer-rooted resolution resolves against a directory that **by ruling does not exist** — nine guaranteed misses on every install, making Requirement 13's degradation **the primary path, undeclared**, nine warnings deep. Rooted at the package, the degradation fires on the cases Requirement 13 now names.*
   - **output** paths → **consumer root**
   *(§ 4.1's "dual path-context" row is about `resolvePackageRoot` for the MCP and does not cover the generator.)* *Traces: Lina A2, L-B3.*
3. The consumer entry point SHALL emit **only agent artifacts and the always-layer** — **the allow-list is the operative test and the following deny-list is ILLUSTRATIVE OF IT, not exhaustive**: `canonical/registry/*`, `canonical/manifests/*`, `coverage-map.yaml`, `coverage-manifest.yaml`, `demotion-delta.json`, the `_fixture-output/` tree — *"none of that belongs in a stranger's repo."* *(Stacy R2 S-A9: the deny-list is longer and more specific than the allow-list and will out-anchor it, so a future generator artifact absent from it would pass. Same class as clause (i)'s declared limit, and the same cheap fix.)*
4. **Gate 4b**: `init` SHALL drop the `governance/` and `.kiro/steering/` copy steps. The MCP serves the corpus from `node_modules` (bannered per Requirement 20); **identity delivery to consumer agents is the generated always-layer.** D-live-2's repair is therefore a **clean deletion**, not a filtering exercise.
5. `product-template/agents/` SHALL be deleted — **and since `product-template/` contains ONLY `agents/`, the deletion removes the whole tree.** Its **enumerated reference sweep**, corrected and completed *(Lina R2 L-B5, blocking)*, with **dispositions that differ by entry**:
   - **`package.json` `files[]` → `"product-template/"` REMOVED.** *(Was MISSING from the enumeration. After the deletion the entry points at nothing and **npm tolerates it silently**, which is exactly why it survives a sweep — **an enumerated sweep that omits the packaging manifest is the defect the enumeration exists to prevent.**)* See also 4.6b, which removes `".kiro/agents/"` on the same reasoning.
   - **`governance/DesignerPunk-Integration-Guide.md` § "4b"** → **EDITED**. It currently *teaches* `cp -r`.
   - **`governance/classification-map.md` L686** → **EDITED, AND NAMED AS BALLOT TERRITORY**: it is a **rule** enumerating `product-template/` as a package-scope reference surface, so editing it is a **governance-law change** — named here so U2 does not discover it.
   - **`governance/MCP-Evolution-Roadmap.md` L217** → **RECLASSIFIED: verified as a dated historical sweep record, LEFT UNEDITED, and recorded as such.** *(Lina R2: it is not a live instruction; the same document states its own convention — "Historical spec/completion docs were left as-is (record of their era)" — and editing it to match the present is the opposite of what that doc does everywhere else. **A different verb from the other three, deliberately not riding the same one.**)*
6. **`check-package-name-drift.js` `SCAN_DIRS` SHALL be verified to no-op rather than throw on the missing directory BEFORE the deletion lands.** It lists **`'product-template'` — the parent, which is what disappears** — and it is wired into `prepublishOnly`, so **this is the actual firing condition, not a precaution.** *(Lina R2: verified correct as a requirement; its necessity was understated.)*
7. The three converging consumer paths SHALL be retired into one generator output: `init`'s wholesale `.kiro/agents/` copy, the Integration Guide's `cp -r product-template/agents/`, and the stale fork. *(Spec 101 recorded the two-path inconsistency five months ago and deferred it to "a follow-up spec"; **123 is that follow-up** — carried in the Introduction's traceability rather than as an AC, since it is a documentation act. *Lina R2 A9, EARS hygiene.*)* *Traces: Lina A6.*
8. **Q5 — filtered-by-derivation**: what ships SHALL be **derived by the profile pipeline** (Requirement 9.5's renderings plus the profile-filtered canonical inputs `sync` needs), with the filter itself diff-guarded. It SHALL NEVER be a hand-curated second tree. **IF it cannot be made derivable THEN it ships whole** — a hand-filtered canonical is worse than an unfiltered one — **and that determination SHALL BE DECIDED AND RECORDED**, matching the pattern 7.4 and 21.2 use for exactly this shape. *(Stacy R2 S-A11: the underivable finding is the kind that is otherwise made by not making it.)* *Traces: outline § 7.3, ruled; Lina's rule.*
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

### Requirement 19A: What `init` emits and copies under Q6 (the requirement three reviewers found missing)

**User Story**: As an execution agent implementing package-primary, I want every `init` copy step and every emitted-config coupling decided by name, so that the mechanisms the other requirements specify are actually reachable in the configuration a consumer runs. *Traces: Leonardo R2 Le-B1 (blocking), Ada R2 B3 (blocking), Lina R2 L-B1 (blocking) — three symptoms, one root.*

> **THE ROOT, stated once because it is a class and not three items**: the requirements specified mechanisms for the **post-Q6 world** while the **live `init` configuration short-circuits every one of them.** Requirement 2's union is dead code because `COMPONENTS_DIR` is always set; Requirement 3.2's package-mode case is unreachable because `tokenSource` is always emitted; Requirement 1.2's matched pair was inert and 3.5 cited an authority that did not exist, because **no requirement removed the copies they assumed gone.** *Three requirements individually faithful and jointly inert — **a requirement can be faithful to its ruling and still unreachable if the configuration it runs in was never specified.***

#### Acceptance Criteria

1. **`src/types` copy — DROPPED.** Types resolve through the exports map (118's contract, re-established by PR #193's repair). A copy re-creates the pin that repair removed.
2. **`src/components/core` copy — DROPPED.** Requirement 2's union-with-precedence **is** the replacement, and Lina L-B1 proves the inverse: keeping the copy is *what makes the union dead code.* Q6's clone hatch covers whole-system ownership; per-component ownership is the merge (2.5).
3. **The emitted config's four raw-`src/` couplings — resolved per Requirement 1.2**: `tokenSource` **dropped**, the two theme imports **re-pointed** at 1.1's subpath, `componentTokens` **re-pointed** at the consumer's own authoring directory (and no longer naming `./src/tokens/component`, a layout this repo does not have).
4. **`.kiro/agents/`, `.kiro/steering/`, `governance/` copies — DROPPED** (gate 4b; mechanism at 14.4).
5. **The scaffolded `COMPONENTS_DIR` value SHALL be named**, and it SHALL NOT be a value that produces a silently empty catalog (2.3).

**19A.F — THE ONE FORK, NARROWED RATHER THAN ESCALATED**

6. **The `src/tokens` copy is OPEN between two options**, and the choice turns on **one mechanism fact**:
   - **CONFIG-ONLY** — the consumer's design system is **their themes** (1.1) + **their component tokens** + **their components** (Req 2). No token tree is written into their repo.
   - **SEED** — `init` scaffolds a **small consumer-owned token surface** they author into, with the package supplying the rest by merge: the token-side analogue of Requirement 2's component ruling.
7. **The settling fact, owed by Ada**: *can a consumer author a new semantic token in package mode with no local token source, and does their generated `token-index/` then satisfy Requirement 1.3's `source !== 'package'` discriminator?* Her own Q6 position states C′ delivers *"from **their** generated `token-index/` regardless of where primitives resolve from"* — **IF that holds with zero local token source THEN CONFIG-ONLY follows and no further decision is required.**
8. **IF the answer is that no path exists for consumer semantic-token authoring in package mode THEN the fork escalates to Peter** as a three-way: build the merge (seed) · ship the seed without merge (accepting a fork of our tokens — the D-live-3 class) · scope consumer semantic-token authoring out of 123. **The author's lean, recorded: SEED-with-merge**, as the exact analogue of the component ruling and because the discriminator is a condition of Ada's Q6 support. *(Escalation is withheld deliberately: one measurement may dissolve the fork, and Peter's attention is not spent on forks a measurement can settle.)*

---

### Requirement 19: `init` UX, and the populated-repo gap

**User Story**: As a founder installing into a repository that already has files in it, I want `init` to tell me what it skipped, so that I do not follow next-step instructions that cannot work. *Traces: outline §§ 5.3, 6.2 (gate 4b); Leonardo R2, A17; Leonardo B1.*

#### Acceptance Criteria

1. `init` SHALL NOT copy `governance/` or `.kiro/steering/` (gate 4b; the mechanism is Requirement 14.4).
2. `init --target=<tool>` SHALL generate the consumer's agent artifacts for the named tool (Requirement 9).
3. WHEN a scaffold target already exists in the host repo THEN `init` SHALL **report the skip and its consequence**, not silently proceed. *(Measured: `createFileIfNotExists` skips `jest.config.js` and `tsconfig.test.json` in a populated repo, so the DesignerPunk jest preset never applies — while next-step 4 still says `npx jest`. A founder with an existing repo follows our instructions and gets a silent no-op or a confusing failure.)* *Traces: Leonardo R2.*
4. WHEN `init` prints next steps THEN those steps SHALL be consistent with what `init` actually did in that repo.
5. `init` SHALL scaffold a `product/` tree matching the Product Indexer's directories, with **one worked example screen** and a statement of what the tree is for. *(Today it scaffolds one file of seven directories, in markdown-flavoured pseudo-YAML with `[CUSTOMIZE]` placeholders, and no server reads it.)* *Traces: Leonardo B1 (iii).*
6. Terminal output SHALL carry the session-restart line and the clone hatch (Requirements 15.8, 15.9).
7. **WHEN `init` runs WITHOUT `--target` THEN it SHALL either emit a declared default target's artifacts OR refuse with a named instruction — NEVER complete silently with no agent layer.** *(Leonardo R2 Le-B2, blocking: today's CLI has no `--target` and copies `.kiro/agents/` unconditionally; **after 14.4 retires the copy, a founder running plain `npx designerpunk init` — the command the install doc will print — gets no agents and no always-layer at all, silently, which is a strict regression from copy mode.**)*
8. **WHEN a GENERATION output path is already occupied by consumer content THEN the generator SHALL report the collision and its consequence, and SHALL NOT silently skip or overwrite** — the same rule as 5.5, applied to the generator rather than to `sync`. *(19.3 covers **scaffold** targets; a generated artifact is not a scaffold target, and gate 4b made generated output the **sole identity-delivery rail** — so the risk moved onto a surface with no collision rule.)*
9. **`CLAUDE.md` is the instance that forces the stronger form and SHALL be named**: it is an **import set, not a file we own**, and every Claude Code user already has one. The rule is **merge into a delimited, regenerable region — never write the file.** A silent skip leaves every charter's routing dead behind a healthy-looking index; a silent overwrite destroys the consumer's own file. *(Under Requirement 2's merge principle we refuse to let a consumer's first action silently delete their component library; the same refusal applies to their agent layer.)*

---

## UNIT 4 — Content policy execution

### Requirement 20: The audience banner and its guard (gate 4a — ruled)

**User Story**: As a consumer's agent fetching a governance doc, I want to be told at the top whether I am reading DesignerPunk's worked example or transferable guidance, so that I do not adopt authorities my repo does not have. *Traces: outline §§ 6.1, 6.2 (gate 4a, ruled); Ada A5; Stacy A3; Lina A7; Leonardo A10; probe record.*

#### Acceptance Criteria

1. The governance corpus SHALL **ship whole and MCP-served**. Nothing SHALL be pruned from the served set.
2. **Audience-framing banners** SHALL be applied to the docs carrying repo-internal authority — the measured set (~18 at drafting; **0 of 15 `Token-Family-*.md` docs require one**).
3. **A NAMED, EXECUTABLE MEMBERSHIP PREDICATE SHALL be versioned with the banner convention**, and 20.2's number is **its illustrative output**, not the set. *(Ada R2 B5, blocking: "re-measure at execution" named no membership function, so the guard could only check *"docs on some list carry a banner"* — and that list is hand-maintained, **relocating the drift 20.3 exists to prevent from the count into the list.** **The predicate is the artifact and the set is merely its output.**)*
   - Her predicate reproduces today (`grep -lE "complete-task\.sh|Peter merges|RATIFIED|ballot" governance/*.md` → **18 of 83**; over `governance/Token-Family-*.md` → **0 of 15**), so it is mechanical, cheap and re-runnable — *which is what makes 20.5's guard implementable at all.*
   - **The predicate's UNDER-INCLUSION LIMIT SHALL be carried in the convention's own text**, on 11.3.1's pattern: a doc can carry repo-internal authority with **none** of those strings — a stewardship cadence, `.kiro/specs/**` as law. **A declared limit recorded only in a feedback record is an undeclared limit at the second reading.** *(Ada's own surviving counter, and Stacy's condition (i).)*
   - **The guard's CLAIM SHALL be scoped to its predicate**: it reports *"N docs match the predicate; N carry banners"* — **never "the corpus is bannered."** *(Stacy's condition (ii): a guard that names its own denominator cannot be misread as coverage — the same rule her claims passes carry.)*
   - **Why this clears the arming bar where two prior mitigations did not** *(Stacy, answering Ada)*: `--registry` was void because **it does not do the thing it says**; verb-presence was void because it is **satisfied by construction by the failure it targets**. This predicate's coverage is **real, non-zero and positively correlated**, and its failure direction is **under-inclusion** — for a presence guard, the safe side: a missed doc ships unbannered (the status quo) rather than an unbannered doc being certified bannered. Same failure-direction argument 11.3.4 already ratifies.
   - **What it does not clear, kept as a concession**: presence is not correctness (20.10).
4. Banding SHALL NOT be applied corpus-wide. *Rationale: dilution is the sharpest form of the banner's own surviving counter — a banner is what a hurrying reader elides first.* *Traces: Ada A5.*
5. **A PRESENCE GUARD SHALL ship with the banner convention, checking `predicate-match ⇒ banner-present`. Banner-without-guard is a named NON-OPTION.** *(P2 applied inward: an unguarded convention is the DORMANT failure mode in prose form.)* *Traces: Stacy A3, rung-5 condition.*
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
2. **THE PATH is the assertable property**: a **bounded step count**, countable from the install doc **with no run required** — **and the bound SHALL BE DECLARED IN U3, where the install doc is authored, and ASSERTED IN U5**, mirroring 4.7/25.3's declare-then-assert pattern verbatim in shape. *(Stacy R2 S-B3, blocking, converging with Leonardo R2 A3 who filed it advisory: **"every finite document has a finite step count"** — as written the *assertable* property asserted nothing, which is the *"a delta with no direction and no floor is satisfied by any value"* defect reappearing on the lane B6 was not watching. Leaving the number to be invented at the tasks round is **precisely where 22.5's forbidden step-count-on-the-RUN form will look reasonable.**)*
3. **THE RUN is recorded instrument output**: wall-clock, findings and preconditions SHALL be recorded per run. **Wall-clock SHALL NEVER be asserted.** **An overrun SHALL be a FINDING, never a criterion failure** — and **"overrun" is relative to the instrument's OWN RECORDED PRIOR RUNS, never to a target.** *(Stacy R2 S-A2: with no target — correctly — *overrun* had no referent, and **the tempting repair is to invent one**, which re-imports the number 22.6 forbids.)*
4. **A STOP SHALL be a recorded event with its reason, from a CLOSED VOCABULARY, never a silent omission.** *(Stacy R2 S-A3: an open-prose stop reason is auditable only by reading; a closed form is **countable**, which is what makes the un-re-verified string work. The precedent is already in this spec at 11.2 — one mechanism, two uses.)* A looping run must end somehow; the property that keeps this alive is that **an unrecorded truncation SHALL NEVER roll into a green.**
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
7. **HANDOFF WITH A CREATION STEP, not a naming**: the trio is a **standing regression instrument re-run per release**. U5 executes the first runs; the recurring obligation's home in the release recipe is a ballot-measure change and therefore outside this spec — **so the obligation SHALL EXIT CLOSEOUT AS A COMMITTED RECORD with an owner and its trigger, walked by the monthly Civitas health check**, per the ratified tracking convention. *(Stacy R2, item-6 verdict: **"needs a post-123 home" is a NEED, and needing is not creating** — 23.7 lived only in requirements.md prose, and when 123 closes the prose closes with it.)*
8. **Peter's own run is MECHANICS validation — non-blocking, and explicitly NOT a cold-human run.** He is the author; he cannot be cold.
9. **The cold-human run remains an OPEN OBLIGATION** with the generic trigger *"the first willing stranger."* **IF unfired at closeout THEN it SHALL EXIT CLOSEOUT AS A COMMITTED RECORD with an owner and its generic trigger, walked by the monthly Civitas health check** — the same mechanism as 23.7, which already exists and is already walked. **No date is invented**; *a date we would not honour is worse than a generic trigger.* *(Leonardo R2 A7, extended to 23.7 by Stacy: **"an item 'reported open' inside a closed spec's completion doc is, operationally, dropped — nobody re-reads a closed spec's closeout."** Leonardo's counter is recorded and not pretended away: a charter walked monthly with a trigger that never fires is a recurring reminder of an item nobody is going to do, and the health check's cost is real. A visible undone item is still preferred to an invisible one.)*
10. **The instrument's limitation SHALL be carried in the requirement's own text**: persona agents **role-play** ignorance rather than possessing it. **The trio measures instruction clarity and path completeness; a human measures confusion.** The named rot mode is **a green trio read as "a stranger succeeded."**
11. IF the trio is ever reduced THEN persona **(a) or (b) SHALL be kept, never (c)** — a no-floor run fails at everything and attributes nothing. *Traces: Leonardo A4.*

### Requirement 24: Behavioral conformance for the re-grounding contract

**User Story**: As the property that no deterministic clause currently reaches, I want a behavioral instrument that a hollow charter fails, so that a truthfully-and-legitimately hollowed charter is caught by something. *Traces: outline §§ 7.4, 7.2; Stacy B2, A2, R2's interim posture.*

#### Acceptance Criteria

1. **U5 SHALL execute Thurgood's re-grounding spec against a scratch consumer install** — packed install, no repo access, preconditions recorded (Requirement 23.2) — **and the conformance criterion SHALL carry a BAR, not only a citation.** The run SHALL establish that **consumer-Thurgood performed the spec-formalization work the spec assigns**, and a run producing *"consumer-Thurgood could not formalize a spec"* SHALL be recorded as a **FAILED conformance**, not as a discharged criterion. *(Stacy R2 S-B1, second site: *"execute the spec and cite that run"* is **occurrence-shaped for a criterion the requirement itself calls *the conformance criterion*** — satisfied by any outcome. **That this recurs in two independent places is the evidence it is a pattern in this spec and not a one-off.**)* *(The prior criterion verified presence while claiming conformance evidence from an event owned by no unit — "it cannot be both unowned and load-bearing.")* *Traces: Stacy B2 (blocking).*
2. The **direction-(ii) behavioral probe SHALL ride the trio runs**: a consumer agent asked to do a task in its own domain in a foreign repo. **A hollow charter fails behaviorally and passes textually**, which is the discriminator the lexical check was not.
2a. **THE SAMPLE SHALL BE DECLARED — which agents, how many of eight, recorded per run — AND IT SHALL INCLUDE CONSUMER-STACY BY NAME.** *(Stacy R2 S-B9, blocking: 24.5 makes the behavioral instruments the **owner of the positive property**, and the sample is three trio runs driven by founder-onboarding tasks, which will exercise whichever agents those tasks touch. **Consumer-Thurgood is covered by 24.1. Consumer-Stacy is covered by nothing — and hers is the charter BOTH surviving attacks were constructed and measured on, i.e. the known worst case.** A sampling instrument that does not declare its sample produces a ✅ on *"behavioral backstop executed"* covering eight charters **with no denominator** — a false ✅ on a reproduced row, in the requirement that is supposed to be the backstop.)* *Traces: Stacy A2.*
3. The acceptance table SHALL label the three instruments **honestly and separately**:
   - **deterministic clauses** — (i), (ii), (iii) with applicability verification, (iv) present-routes, and the all-`no-consumer-counterpart` floor;
   - **the routed clause** — `no-consumer-counterpart` signatures, which are *mechanically enforced routing of a judgment the check cannot make*;
   - **the behavioral backstop** — non-deterministic, per-release, sampling.
4. **(v)'s mechanical half SHALL NOT be listed among the deterministic clauses UNTIL PASS FOUR RETURNS `PASSES`** — the condition is keyed to **the verdict**, not to the substrate. **The gate and its three consequences live once, at Requirement 11.8, and this clause points there rather than mirroring it.** *(Stacy R2 S-B1: the earlier key — *until Requirement 10's substrate ships* — was **the wrong event**, because **substrate-ships makes (v) implementable while pass four establishes that the implementation works.** As written the table could list (v) as deterministic before anything verified it, and a FAILS verdict would then have to walk back a table already published.)* *(C4, bound; "destination-exists" was falsified — span-exists is not function-lives-there.)*
5. The honest posture SHALL be stated in the artifact rather than in a feedback entry: **the contract is not unguarded — it is guarded non-deterministically, per-release, by a sampling instrument.** *Traces: Stacy R2.*
6. **Charter-identity probe**: **a NAMED collapse-prone agent — Thurgood or Stacy, or the declared set** *(Leonardo R2 A4: *"an agent SHALL answer"* permits running it on the agent least likely to collapse, and 11.3.9 already names Thurgood's rendering for exactly this reason)* — SHALL answer, in a **fresh** session in the consumer repo, its domain, one routed tool it owns, and one thing outside its scope — **AND the answers SHALL MATCH the consumer rendering's declared domain, routes and out-of-scope.** *(Stacy R2 S-A6, additive to Leonardo's: he asks **which agent**, she asks **against what**, and neither substitutes for the other. Without the correctness bar, *"an agent answers"* is satisfied by any three answers — **answer-presence standing for identity delivery, the fifth instance in the presence-of-a-token count.*)* *(The prior criterion — "loads in that tool" — was a file-existence check wearing a behavior check's clothes; files in `.kiro/agents/` prove nothing about a Claude Code consumer, where delivery is the generated `CLAUDE.md` import set.)* *Traces: Leonardo A5.*

### Requirement 25: Closeout

**User Story**: As the spec's closing act, I want the acceptance evidence gathered in one place and the declared targets asserted, so that closeout reports measured outcomes rather than intentions. *Traces: outline § 9.1 (U5); Stacy A4, A7; Leonardo B1 (iv).*

#### Acceptance Criteria

1. U5 SHALL record the **trio runs and their triage findings**, with preconditions, host fixtures and targets per run (Requirement 23) — **findings recorded PER PERSONA, attributed to the axis they fell on, with a finding reproduced across personas recorded as such.** *(Leonardo R2 A5: nothing forbade pooling three runs into one finding list, **which silently converts a three-axis instrument back into the one-run union the persona redefinition was made to escape** — and per-persona attribution is the whole reason the trio costs three runs.)*
2. U5 SHALL record **Peter's mechanics run** as non-blocking and explicitly not a cold-human run.
3. U5 SHALL **re-measure the tarball and assert against U1's declared target** (Requirement 4.7), naming which lever was measured.
4. U5 SHALL demonstrate **a consumer's Leonardo answering a real `get_product_overview` / `find_screens` query in a consumer repo**. *Traces: Leonardo B1 (iv).*
5. **EVERY probe and EVERY run SHALL carry a forced negative** — *findings: none* written, never implied — **and a run that files NO list is still owed it**, plus a **per-question discovery-succeeded/failed record**, so a transcript can be **audited rather than merely possessed**. *(Stacy R2 S-B6, blocking: the earlier `WHERE any probe or run produces a finding list` put the rule **behind a conditional a silent run escapes** — *no list* reads identical to *no findings*, which is A7's own defect re-entering through the antecedent. **Per Leonardo A5 the negative is owed PER PERSONA**, or a pooled *findings: none* hides two silent axes behind one diligent one.)*
6. U5 SHALL record the status of **the ENUMERABLE SET of open obligations**: the **Open inputs table** plus the named handoffs at **23.7, 23.9, 21.2, 4.5, 6.8 and 11.6** — not *"the outline's named open obligations… the cold-human run at minimum"*, which is **a denominator by reference dischargeable by recording the one named minimum.** *(Stacy R2 S-A7: the enumerable set already exists in this document.)*
7. **A U5 RE-RUN OF THE REFERENCE-CORPUS PROBE against the shipped artifacts** SHALL be performed. *(Leonardo R2 A6, his option (a), adopted: the n=1 was gathered **without** the reference-corpus section, **without** banners, via a path undocumented at the time — *"the measured mode is a different product."* Stacy's answer to him identifies why (a) rather than (b): **a re-run is the only evidence Requirement 20.8's "reference-mode framing rides the banner language" will ever have**, which she notes is currently verified by nothing. 26.7 also states the pre-change scoping, so both halves land.)*

---

## CROSS-CUTTING — all units

### Requirement 26: Execution constraints

**User Story**: As every unit of this spec, I want the completion conventions and the recorded risks to bind execution, so that the spec's own evidence meets the standard it asks of consumers. *Traces: outline §§ 11, 13.*

#### Acceptance Criteria

1. **Spec 127's completion-claims convention is ratified law and binds this spec's execution.** Every parent completion doc SHALL reproduce its `tasks.md` success-criterion rows **verbatim** with Status and Evidence, SHALL carry the **forced-negative line**, and SHALL carry the **unconditional fixed-form delegated-tier line**. Every ticked subtask SHALL carry its subtask completion doc. The `completion-criteria-parity` instrument applies.
2. **Claims passes fire per Stacy's events.** A **CLOSEOUT** pass at the final unit's merge. **A MIDPOINT pass is OWED, NOT CONDITIONAL** — ratified law is that MIDPOINT is owed by any spec declaring **≥ 3 merge units**, fires at most once, and has its **carrier unit DECLARED at the tasks round**, not judged later. **123 declares five.** *(Stacy R2 S-B5, blocking: *"MIDPOINT if the arc runs long"* **softened ratified law**, and 123 is the first ≥3-unit spec to close under it.)*
   - **The record path is PINNED**: a MIDPOINT record is **`completion/claims-pass-midpoint.md`, NEVER `completion/claims-pass.md`** — the latter **silently discharges `closeout-owed(123)`** with a pass covering part of the spec. *(The exact collision 127's tasks round caught; **123 is the first spec where it can actually happen.**)*
   - `tasks.md` SHALL name the carrier unit. Findings route to owning agents as **explicit messages**, not as files in a directory.
3. **Units are DECLARED in `tasks.md`** per Task-Completion-Protocol § "Coherent Units", in the order U1 → U2 → U3 → U4 → U5, with **release between units** as the answer to time-to-first-value pressure. *(The release is the value unit and the spec is the planning unit.)*
   - **The EXPECTED RELEASE COUNT SHALL be named at the tasks round.** *(Stacy R2 S-A8: up to four inter-unit releases means **up to four RELEASE claims passes**, each non-negotiable, each owing the owed-set query paste and 6.7's publish-guard read. She argued for release-between-units and still does — the residual is that **nobody has costed it**, and if the passes are skipped, LIVENESS records *events without records = finding* **against this spec.** Naming the count makes the cost visible before it is incurred.)*
4. **The reduce-not-grow cut-line has three rungs, every one costing capability**, and SHALL be applied in this order if invoked: (1) U4 collapses to **banner + guard + the always-set re-grounding** (the always-set clause is hard floor and does not collapse); (2) starter specs reduce from two to one, keeping the CI-needs spec — **residual: this loses the only instrument executed by the consumer rather than by us, and half of R6's pair, and with it the demonstration that the spec method is inheritable**; (3) the trio reduces from three runs to one, keeping (a) or (b).
5. **The split tripwire's firing rule SHALL be NAMED, NOT GESTURED AT.** *(Stacy R2 S-B7, blocking: the previous formulation said *"grows by **a named threshold**"* — **unnamed, with no namer and no deadline** — and *"misses a second successive **planned merge**"*, while 26.3 requires units to be **declared, not dated**, so the limb had no referent. **This is A8's own defect surviving one level down**: firing condition, owner and reading event were all supplied, and the firing condition was itself generic. Under her gate-5 position this tripwire is the fallback that makes *do not split now* safe, so it has to carry that weight.)*
   - **The threshold SHALL be named by the author at the TASKS ROUND, per unit, as a declared figure in `tasks.md`** — the same declare-then-assert pattern 4.7, 22.2 and 25.3 use. A threshold named after the growth it measures is not a threshold.
   - **The second limb is re-anchored on a referent that exists**: *a unit whose declared scope grows past its named threshold*, **or** *a unit that has not merged after its successor unit's work has begun* — the latter observable from branch and merge state, which 26.3 does produce, rather than from merge dates, which it does not.
   - **Read at each unit's completion review. Peter owns the read.**
6. **Accepted risks, carried and not re-argued**: spec quality in unknown harnesses · support surface at solo scale · the scaffolder-not-integrations tripwire · two profiles to guard, with the consumer profile the one that will quietly rot · **the dual-publish tax, whose mitigation was void before it was ever used** · a generically-triggered obligation is a weakly-held one · starter specs are shipped surface we cannot observe running · **"defaults are the product," knowingly accepted under Q6** · the strategic counter that the plan optimizes toward an unvalidated market.
7. **The reference-corpus mode has ONE data point, AND IT MEASURED A PRE-CHANGE ARTIFACT.** The probe SUPPORTS the mode; that retires *unobserved*, not *unproven* — n=1, one corpus, one task, one harness. **And the corpus it ran against had no reference-corpus section, no banners, and an undocumented entry path** — *"the measured mode is a different product"* — so 26.7 SHALL state the scoping plainly **and** Requirement 25.7's re-run supplies the post-change evidence. *(Leonardo R2 A6; Stacy's answer to him: an Evidence cell scoped to what was measured is a **pass**, an unscoped one is a **promised-vs-shipped FINDING** — so the scoping sentence must land in **26.7 and in the U5 Evidence cell**, not in a feedback record.)* **The carry-forward is the residual**: the mode's output is strongest in its reasoning and weakest in its provenance claims, which is the inverse of how a reader would rank them.
8. **EVERY MECHANICAL CLAUSE SHALL STATE WHAT ITS PASSING ESTABLISHES AND WHAT IT DOES NOT.** *(Stacy R2, item-10 finding, promoted from framing lesson to **review obligation on the strength of a measured recurrence count, not a preference**: **six instances inside one review round, found by two reviewers** — v1 checked **verbs** were present, v2 **citations**, v3 a **destination**, C3's first candidate an **operative kind**, 24.6 an **answer**, and Ada B4 that **a token resolves** while the resolved root may be the package's own snapshot. *"A class with a 6/6 hit rate inside one review round is not a framing lesson; it is a review obligation."* Ada independently asked for the same shape at the end of her B5.)*
   - This spec already **instantiates** the rule twice — 11.3.1 (*a zero-hit sweep is evidence about the enumeration, not about the charter*) and 10.10 (*an output-coverage proof structurally silent about input coverage*) — and had it **nowhere as a rule**.
   - **Its own rot mode is named, because the rule would otherwise instantiate the defect it indicts**: **a negative-space statement can itself become a ritual stub** — the `adaptations: none` class. It is adopted anyway, on the recurrence count, with the rot mode written here so a later reader can catch it.

---

## Open inputs (dated, owned, and not silent)

| # | Input | Owner | Due |
|---|---|---|---|
| 1 | **"Trivial" — C3 v2** (Requirement 11.6). **The exemplars are DELIVERED** and enumerated at 11.6.5; the definition is **reworked against all six**. What remains is **its own falsification pass, sequenced BEFORE pass four** | **Stacy** (falsification) | **Before pass four** |
| ~~2~~ | ~~Always-set application unit confirmation~~ | ~~Lina~~ | **✅ DISCHARGED at R1** — shape confirmed, source amended to derived-not-recorded (12.3) |
| ~~3~~ | ~~`*.refs.ts` rename timing declaration~~ | ~~Lina~~ | **✅ DISCHARGED at R1** — declared **before Requirement 8's lint merges in U1**, tighter than the original gate (8.4) |
| 4 | **§ 7.2 pass four** (Requirement 11.8) | **Stacy** (author recused) | **U2 acceptance gate** |
| 5 | **`.swift` / `.kt` shipping disposition** (Requirement 4.5) | **Kenya and Data** | **Tasks round** |
| ~~6~~ | ~~Hardening-candidate verification — the `dist.tarball` field name~~ | ~~Ada~~ | **✅ CLOSED at R1** — verified: returns `https://registry.npmjs.org/@3fn/core/-/core-14.1.0.tgz`. What remains is the **augments-or-supersedes decision** at 6.8, which is U1 work, not an open input *(Ada R2 A5/A6)* |
| **7** | **The `src/tokens` copy fork** (Requirement 19A.6–19A.8) — *can a consumer author a new semantic token in package mode with no local token source, and does their `token-index/` then satisfy `source !== 'package'`?* **A measurement, not a judgment** — and it settles the fork or escalates it | **Ada** | **R2 round** |
| **8** | **Which agents the three persona tasks actually exercise** (Requirement 24.2a) — load-bearing on the behavioral sample rule | **Leonardo** | **R2 round** |

---

## What resisted translation to EARS grain — R1 verdicts folded

> **Reviewer verdicts on this list**: Leonardo — *items 1, 2, 3, 4, 6, 7, 8, 10 handled right*; Stacy — *2, 3, 7, 8, 9 correctly handled, no AC wanted*. **Five items moved**: 1 (predicate owed), 4 (consequence unbound), 5 and 6 (durability), 9 (pre-change artifact), 10 (one of three promoted to a rule). **Posting the list was the mechanism that surfaced them** — three of the five were found *because* the handling was stated rather than assumed.

Recorded as round input, not as a defect list. Each of these is real content from the settled outline that does not become a testable acceptance criterion, and reviewers should say whether the handling is right.

1. **The banner's measured set (~18 docs)** — *(R1: handled right, and **incomplete**.)* The *set* is rightly unenumerable; **the PREDICATE was owed and is now required** (20.3, Ada B5) — *the predicate is the artifact and the set is merely its output.* **Resolved.**
2. **"Trivial"** — *(R1: the handling was right and the candidate was used the way it was posted.)* It came back **FALSIFIABLE-AND-BREAKS** from two reviewers independently; **11.6 is now a rework against six enumerated exemplars**, with its own falsification pass sequenced before pass four. **No longer resisted — scheduled.**
3. **Q5's "if it cannot be made derivable, ship whole"** (14.8) — a conditional design decision whose antecedent is not mechanically testable at requirements grain. Stated as a conditional; the determination is a design-phase finding.
4. **The § 7.2 sign-off's OUTCOME** — the seam is right and both reviewers who examined it agree the verdict stays unwritten. **But occurrence alone was a gate no outcome could fail**, so 11.8 now binds **the consequence**: three verdict states, each costing an artifact edit, NOT-RUNNABLE treated as FAILS. *(Leonardo read item 4 as handled; Stacy filed it BLOCKING. They agree on the seam and differ on **whether a gate whose every outcome costs nothing is a gate.** She is right.)* **Resolved.**
5. **The cold-human run's generic trigger** (23.9) — *(R1: honest on TIMING, insufficient on DURABILITY.)* Still no invented date. But *"an item reported open inside a closed spec's completion doc is, operationally, dropped."* It now **exits closeout as a committed record with an owner and its trigger, walked by the monthly health check** — **and the same fix extends to 23.7.** **Resolved, with Leonardo's counter recorded.**
6. **The trio's recurring per-release obligation** (23.7) — genuinely outside this spec. But *"**needs a post-123 home" is a NEED, and needing is not creating**"* — a handoff living only in requirements prose closes when the spec closes. It now carries a **creation step**, as at item 5. **Resolved.**
7. **"Defaults are the product"** and the other accepted counter-arguments (26.6) — recorded positions, not requirements. They bind reasoning, not behavior, and flattening them into ACs would misrepresent them.
8. **The cut-line's residuals** (26.4) — the residual at each rung is *why* the order is what it is. It is prose whose job is to be read by whoever proposes the cut, and it survives as prose.
9. **The probe's n=1 status** (26.7) — the qualifier is right and was **missing that the n=1 measured a PRE-CHANGE artifact**. 26.7 states the scoping; **25.7 adds a U5 re-run**, which is also the only evidence 20.8 will ever have. **Resolved.**
10. **The three framing lessons the round produced** — *(R1: one of the three **NEEDS AN AC**, on a measured 6/6 recurrence. **Adopted at 26.8**; the other two remain correctly prose, and the *reads-prose-misses-config* lesson is now homed better by Ada's B5 than a rule would have homed it.)* Originally: — *the survey reads prose and misses machine-readable config*; *span-exists is not function-lives-there*; *presence of a token standing in for the property the token evidences* — bind how future work is reviewed, not what is built. They are carried in the Introduction's framing obligation and in Requirement 11's limitations, and a reviewer who thinks they need a home in an AC should say so.

---

*Requirements phase, draft. Feedback round opens at `.kiro/specs/123-consumer-distribution/feedback/requirements.md`. Per the sequential formalization gate, `design.md` does not open until that round completes.*
