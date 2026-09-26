# Spec Feedback: 123 — Consumer Distribution — Design

**Spec**: 123-consumer-distribution
**Artifact under review**: `design.md` (DRAFT, 2026-09-26)
**Created**: 2026-09-20
**Spec author**: Thurgood
**Reviewers**: Lina, Ada, Stacy, Leonardo

---

## Context for Reviewers

**What this round reviews**: HOW the settled requirements are realized. **Requirements are settled** (PR #196, `aabb59fd`: 30 requirements, 282 ACs, five units). A design finding that would change WHAT a requirement says is out of this round's scope. Raise it as a directed question to Peter; do not fold it into a design comment.

**§ 7.2 is NOT signed off.** The design specifies the re-grounding machinery **without claiming it works** → design.md § "Framing obligation". Pass four stays a U2 acceptance gate, and the author is recused → requirements.md Req 11.8.

### Settled decisions — do not relitigate

- **Model B identity statement (Peter, 2026-09-26)**: engine that births a design system which is the consumer's own. CONSUME = install; BECOME = install + `init`, once ever. Tokens are the consumer's language (copied wholesale, local mode, `tokenSource` stays); components are our updating surface (union-with-precedence); the name contract is the only coupling, and it reports, never writes. → requirements.md § Introduction
- **Token union DECLINED** as a Model-A feature. Revival trigger: real demand to track DP's token language. → requirements.md § Introduction; Req 1.2
- **Fork B**: section-granular provenance in U2, with the pre-stated 11.4 criterion (derivation + honest naming; containment is tree descent, never an anchor-string prefix). → Req 10.G, 10.S, 11.4
- **C1 signer rule, C2 rate detector, volume valves** (content-keyed carry-forward + itemized assent). → Req 11.5
- **C3 v2 triviality**: routed judgment with a one-sided mechanical floor; the classifier keys on normativity; the operative set is fixed canonical-side under diff-guard, confirmed by the owning agent. → Req 11.6
- **Q9 closed as (ii)**: the profile is a generator dimension; consumer renderings go under `canonical/_consumer-output/` and are guarded. → Req 9, 9.5, 12
- **Q5 filtered-by-derivation** + its residual. → Req 14.8–14.9
- **Gates 4a/4b** (unconditional order U1→U2→U3→U4→U5; drop the steering/governance copy). **Gate 5** (no prior). **Q6 lean.** **Q7 dual-publish kept.** → design-outline.md settle record; Req 26.3, 14.4, 6
- **19A copy table, root-policy table, posture split**; init refuses in a born repo by default (L3-B2). → Req 19A, 15A.3
- **15A joining path, 15B vocabulary**; the personal note is per-user-local (R18.5). → Req 15A, 15B, 18
- **Persona trio Q3, all eight agents + re-grounding + starter specs Q4, five-minute philosophical Q1.** → design-outline.md; Req 16, 22–24

### Scope boundaries

- **In scope**: every design.md component (C1–C32), the gates-and-sequencing section, the migration section, DD1–DD17, and the six input dispositions.
- **Out of scope**: WHAT the requirements say. Task decomposition, merge-unit boundaries, release count and tripwire thresholds (tasks round). The `.swift`/`.kt` disposition (Kenya/Data, tasks round).
- **Findings from measuring the substrate** (new to reviewers; please attack them) → design.md § Overview items 1–3:
  - `sync` already has a three-way baseline (Spec 111);
  - `sync`'s `MANAGED_DIRS` manages `src/tokens` and resurrects deleted files today;
  - CC has no `autoApprove` field, and `init` writes no `.mcp.json`.

### The six open design inputs — dispositions

| # | Input | Disposition | Where |
|---|---|---|---|
| 16 | Commit policy content | DECIDED: agent artifacts, MCP configs and sync manifest committed; `token-index/`, platform output and personal note regenerated or local | DD1, C24 |
| 17 | Non-birth emit name; `--re-scaffold` | DECIDED: `designerpunk attach`; `--re-scaffold` kept | DD4, DD5, C20 |
| 18 | Per-harness MCP approval | DECIDED in design (CC `permissions.allow` region + per-user trust; Kiro `autoApprove`). Shapes verified against live configs; **cold behavior verified in the U3 cross-target join run** | DD8, C8, C24 |
| 19 | 5A type-contract widening; value guidance | DECIDED: widened (contract version + enum members); guidance adopted, labelled as a reference | DD11, C7 |
| 20 | Golden unit list form | DECIDED: hand-authored JSON, provenance key, snapshot ban enforced by test | DD6, Testing Strategy |
| 21 | 10.S guard per-target shape | DECIDED: `describe.each` over `consumer-profile.yaml` targets, through each adapter; unit twin kept | DD7, C15 |

### Acceptance surface for the § 7.2 machinery (named, per the coordinator)

- **Lina's two R3 recipe sizings** (splitter: four behaviors; golden list: ~half a day, hand-authored) are the acceptance surface for C13 and DD6. **Lina: does C13 implement exactly the behaviors you sized, and nothing you did not?**
- **Stacy's design inputs 20/21** are the acceptance surface for DD6 and DD7/C15. **Stacy: do the golden-list process and the per-target run shape meet your inputs as stated?**
- **C3 falsification scheduling** → design.md § "Gates and sequencing". G1 comes at U2 step 4, after the splitter, spans and exemplar operative sets exist and before any triviality code. A paper pass on C18 during this round is optional, at Stacy's call.

### Per-reviewer index

- **Lina**:
  - C1 (init rewrite), C3 (resolver/runner, the type-level declaration test), C11, C13, C14 (the cc/kiro consolidation), C20 (compile lane, degradation), C21 (deletion + `SCAN_DIRS`), C22 (Q5 derivation), C27, and the Migration section (copied components shadowing updates).
  - DD2, DD10, DD14.
- **Ada**:
  - C1 (config generation), C2 (the ancestor walk; your clause (a)), C3 (the posture split; your clauses (b) and (c)), C4 (rewrite-at-copy, `Oklch` → public barrel), C5 (floor closure), C6 (brand re-key), C7/5A (name contract source, type-contract widening, value guidance).
  - DD10, DD11, DD17 (1.1 de-scoped; component tokens behind the component surface).
- **Stacy**:
  - C9 (publish rail, paste target), C15 (11.4 checker, tree containment), C16 (operative-set records, freshness check, confirmer evidence seam), C17 (signature format and valves), C18 (triviality floor), gates G1/G2, MIDPOINT carrier (proposed U2), C30/C31 (trio and conformance records).
  - § "What resisted" item 3 (seat authentication under one git identity).
- **Leonardo**:
  - C8 (per-harness MCP), C23 (install doc order, step-count front-matter), C24 (joining path, commit policy), C25 (starter specs at `specs/`), C26 (personal note), C27 (init UX), C32 (product query).
  - DD4 (`attach` — the naming decision most exposed to reviewer challenge), DD9 (19.7 emits `cc` by default), DD15.

---

## Design Feedback

*(Rounds below. Stamp format: `#### [AGENT R#]`. Reference artifact sections with `§`. Directed questions go in the asker's own section as `[@AGENT] …`. Scan and answer any `[@YOUR_NAME]` mentions before writing your own feedback.)*

---

#### [LEONARDO R1]

**Reviewer**: Leonardo (persona / consumer-experience owner) — REQUIRED
**Date**: 2026-09-26
**Mandatory @ mention pre-step**: scanned `feedback/design.md` — **zero `[@LEONARDO]` mentions outstanding.**
**Verification basis**: `02138996`. Measured: `src/cli/sync/Manifest.ts` (bootstrap semantics, manifest path) + `src/cli/sync/index.ts:52`, `src/cli/init.ts` (steps 3–9), `package.json` exports, `readOnlyHint` across all three server trees (**0 hits**), this repo's `.mcp.json`, `.claude/`, and the user-level `~/.claude.json`.
**Item count**: **4 BLOCKING** (each has a small fix), 15 advisory, 3 directed questions.
**What landed well, stated first because it is most of the design**: C23's section order is 15B honoured in full. The posture choice comes before any command, `init` is taught at its own step, restart comes with its reason, the update lifecycle is spelled out, and the clone hatch is re-anchored. That is the sequencing I asked for, done better than I specified it. C1's `--re-scaffold` prints every file it would re-add before writing, which is exactly the fix L3-B2 needed. C7 closing `sync`'s token-tier resurrection *by construction* is a finding I missed; I found the defect in `init` and it was one command over. And the B1 arc (Product MCP) is complete through all four deliverables: C8 third entry, C27 scaffold, C10 deliberate test change, C32 query.

### BLOCKING

- **[BLOCKING] Le-D1 — The migration's "unmodified by you" test compares against a baseline that records what the consumer had at first sync, not what DesignerPunk shipped. It will tell dp-portfolio that edited copies are unmodified and recommend removing them** → design.md § "Migration", § "C7"
  - Measured: `bootstrapManifest` (`Manifest.ts` L44–62, called at `sync/index.ts:52` whenever no manifest exists) *"records each project file's **current** hash as baseline"*. So a manifest hash means *unchanged since the consumer's first `sync`*. It does not mean *unmodified from DesignerPunk's copy*. A copy edited before that first sync reads as "unmodified", and the migration line *"remove them to receive updates (`sync --migrate-components`)"* then points at the consumer's own work. The flag is explicit, but the claim that justifies using it is false. That is a green path lying to the founder about what she is deleting.
  - **It compounds with the manifest path.** Today's manifest lives at **`.kiro/sync-manifest.json`** (`Manifest.ts` L22). The design writes `.designerpunk/manifest.json` (C1) and never specifies relocating the old one. A pre-123 consumer then has *no manifest at the new path*. `sync` bootstraps a fresh one from current state, and two things follow. **Every** copy, edited or not, reads as unmodified. And the *"manifest predates 123's contract version"* trigger never fires, because there is no old manifest to predate anything. In that branch the migration report never runs, and the copied components shadow package updates forever through the union — the exact problem the migration exists to solve.
  - **Fix**: (1) judge "unmodified" against **the package's own content at the consumer's installed-from version, with the copy-time transform re-applied** (`rewriteBuildImports` changed the bytes `init` wrote). Where that cannot be determined, classify the file as **`cannot tell — review before removing`**, never as "unmodified". (2) Specify the manifest move: read `.kiro/sync-manifest.json` if present, key the migration trigger on it, then relocate it. (3) **Modified copies "kept as yours" become permanent forks that shadow package updates.** The report must say so by name (*"these N modified copies now override the package's <names> and will not receive updates"*). Otherwise the shadowing is silent for exactly the files the consumer touched.
- **[BLOCKING] Le-D2 — The commit policy's default `.gitignore` block ignores generated platform output, and persona (b) — a static site with no build tooling — then deploys with no token CSS** → design.md § "C24" (table), § "DD1" (residual)
  - The policy is **emitted into the consumer's `.gitignore` at birth** (C24), so the default is not advice; it is written for her. Persona (b)'s fixture is defined as *"a static HTML/CSS site with no build tooling"*. Her site links the CSS that `generate` wrote. Gitignored, that CSS exists on her machine and nowhere she deploys from. **More generally, nothing wires `generate` into any consumer's build or deploy**, so every clone-and-deploy pipeline has no platform output unless someone knows to run `generate` there. That failure surfaces in production, not in the dev loop the join path covers. DD1's residual (*"a team whose build cannot run `generate` may commit it"*) is true, and it is a sentence in a doc overridden by a line already in her `.gitignore`.
  - **Fork, surfaced rather than picked**:
    - **(i)** default to **committing** platform output. Token CSS changes only when her tokens change, the diffs are small, and they are arguably worth reviewing.
    - **(ii)** keep ignore as the default, but emit the line **commented, with its reason**, and make *"your build/deploy must run `generate`"* a **minimal-core need** in the CI-needs spec, with its bite recipe.
    - I lean (i) for this persona set. What survives against (i) is noise for teams with real build pipelines, who then have to un-commit.
- **[BLOCKING] Le-D3 — The declared `path-steps` do not match the design's own paths, and nothing defines what counts as a step** → design.md § "C23" (front-matter), § "C24" (joining path), requirements.md Req 22.2
  - C23 declares `joining: 4`, `joining-cross-harness: 5`. C24 enumerates **seven** joining items: clone, npm install, generate, attach (conditional), personalize, restart+approve, lockfile/sync. Even counting only the unconditional ones gives five. 22.2's assertion is *"declared `path-steps` vs a count of its own steps"*. With no counting unit, that assertion is satisfied by whoever does the counting — **22.2's *"every finite document has a finite step count"* defect re-entering through an undefined unit**, one round after S-B3 closed it at the requirement.
  - **Fix**: define the unit once, in C23. My proposal: *one step = one numbered item in the doc's path list = one user action or one command; conditional steps are counted in the variant that takes them*. Then reconcile all four numbers with C24's list and C23's founder path.
- **[BLOCKING] Le-D4 — The observe-don't-assume instrument for cold MCP approval covers ONE target, lives in U5 rather than the U3 the design claims, and records nothing about what the harness asked** → design.md § "C8", § "DD8", § "C24", § "C30"
  - **Timing**: C8 and DD8 say cold behavior is *"verified live in U3 by C24's cross-target join run"*. C24 calls it **"the U5 join run"**, and 15A.4 says U5. **There is no U3 instrument at all**, and with release-between-units (26.3) the install doc ships before anything is observed.
  - **Coverage**: one join run with one `--target` (different from the birth run's) meets **one** harness as a cold teammate. The other target's teammate-cold case is never met. The founder-cold case is met by every birth run, because the founder's first session after `init` is also cold for project-server trust. But **C30's run-record fields do not capture it**, so those observations are made and thrown away.
  - **Fix** (small): add a field to **every** trio and join run record — *first MCP load: what did the harness ask for, verbatim* — so the birth runs, which 23.6 spreads across both targets, observe **founder-cold on both**. Then either run a second join run on the other target (**teammate-cold on both**), or state in C8 that teammate-cold is verified on one target only. Correct "U3" to U5 in C8 and DD8. As written, the acceptance record will one day carry *"cold behavior verified on both harnesses"* over one observation.

### Advisory

- **[A1] DD4 — keep `attach`, on one condition: the verb never appears without its object** → § "DD4", § "C20", § "C23" — verdict in the report line below. The condition: help text, the born-repo refusal, and the install doc's first use say *"attach a harness (agents + MCP config + approvals)"*. `attach` joins `vocabulary.ts` (15B.5) as the **fifth** lifecycle verb. It is taught **outside § 7 (joining) as well**, because the founder who adds a second harness later is its other user and will never read the joining section. Also state that re-running `attach` on an attached target regenerates, is safe, and follows 19.8's collision rule.
- **[A2] DD9 — accept `cc` as the default only with a named-default notice** → § "DD9", § "C27" — a Kiro founder who runs bare `init` gets `.mcp.json`, `.claude/settings.json` and a `CLAUDE.md` region, none of which her harness reads. That is 19.7's *"never silently with no agent layer"* met in letter and missed in effect. Required line: *"no --target given — set up for Claude Code (the default). Using Kiro? npx designerpunk attach --target=kiro"*. Honest note: I have **no evidence** that `cc` is the persona's majority harness. It is plausible, and the notice makes a wrong guess cost one command instead of a confused restart. **DD5 (`--re-scaffold`) — agree, no further note.**
- **[A3] C8's "full read-only tool list" has no machine source — the hand list comes back** → § "C8" — measured **zero** `readOnlyHint` annotations across `mcp-server/`, `application-mcp-server/`, `product-mcp-server/`. `tools/list` data does not say which tools are read-only, so *"read-only"* becomes a hand judgment inside a pipeline built to remove hand lists. That is D-live-6's shape. Either add MCP tool annotations at registration (the manifest then reads them) or approve the full registered list. **Say which.**
- **[A4] C8 asserts CC project-server trust "cannot be pre-granted in committed config"; that is an assumption, and the design's own discipline says to observe it** → § "C8", § "DD8" — observed: CC records per-project `enabledMcpjsonServers` in the user-level `~/.claude.json`, which supports "stored outside the repo". To my recollection CC also has settings keys for enabling project MCP servers. **Whether a committed `.claude/settings.json` is honored for them is exactly what nobody has verified.** *(Hedged: my knowledge of CC settings may be stale, and CC may block this in project scope on purpose, for security.)* Downgrade "cannot" to "unverified", and have Le-D4's record field capture it.
- **[A5] The commit-policy table is missing two rows** → § "C24" — **`specs/`** (the starter specs `init` scaffolds per DD15, which become her CI and her steering; repo state), and **the `.gitignore` managed block itself**. The block is a *third* managed region that is not in C7's region list, and it needs the same self-labelling and region-grain `sync` treatment as `CLAUDE.md`. Completeness is this table's job, just as it was 19A's.
- **[A6] `.designerpunk/` holds both committed state and a gitignored local file, and its name reads like a tool cache** → § "C24", § "C26", § "DD1" — a founder's instinct for a tool dotdir (`.next/`, `.turbo/`) is to gitignore the whole thing, and doing so silently removes the teammate's `sync` baseline that DD1 commits the manifest to provide. Put a `README` in the directory stating which file is committed and why, or move the manifest beside `designerpunk.config.ts`. Also write the manifest merge-friendly (stable key order, one entry per line), because two teammates syncing on different branches will conflict on it.
- **[A7] The born-repo refusal is the one message the misdirected teammate is guaranteed to read, and it is missing the step she most often skips** → § "Error Handling" row 1 — it lists `npm install → generate → attach` and omits **restart**, the A6 step whose absence fails her first three queries. It also presents `attach` as unconditional, when C24 makes it conditional. And `<tool>` should enumerate the declared targets (`cc | kiro`, read from `consumer-profile.yaml`), because a teammate does not know the valid values.
- **[A8] The `attach`-in-an-unborn-repo message pushes a CONSUME user toward BECOME** → § "Error Handling" row 3 — a reader who only wants the docs MCP wired is told *"run `init` to create one"*, which contradicts 15B.2's posture teaching at the moment she tests it. Add: *"(only reading DesignerPunk's docs? no init needed — see install doc § CONSUME)"*.
- **[A9] The name-contract string: value guidance landed, "declared use" did not, and the reference value is in a vocabulary she may not have** → § "C7" (5A message), § "DD11" — DD11 promises *"the component's declared use plus our value"*. The string gives the **consumers** (`used by Button-CTA, Chip-Filter`), not the **use** (e.g. *"subtle action background"*, from the contracts 5A.3 already reads). And *"for reference: purple300"* is **our primitive name**. Her language, being hers, may have renamed or dropped it, so *"with what value?"* becomes *"what is purple300?"*. Give the **resolved value** alongside the name, and a hint about where semantic tokens live in her tree. The **type-contract** string (*"run generate to check your tree"*) leaves her stuck at the next step: say what to do when `generate` then errors on a removed member.
- **[A10] The error catalog is missing the strings for the surfaces this design introduces** → § "Error Handling" — four are unspecified, and each is founder-facing: the managed-region failure modes (markers deleted, edits inside the region at regeneration), the `deleted-by-you` sync report, the DD9 default-target notice (A2), and the migration's modified-copies-are-now-forks line (Le-D1 (3)). The catalog's title is *"exact strings"*, so these belong in it.
- **[A11] `PRODUCT_DIR` stays relative to cwd while the component and token roots use the ancestor walk, so the product server silently reads an empty tree from a subdirectory** → § "C3" (runner + table), § "C2" — C2 exists so that *"`npx designerpunk mcp-app` run from a subdirectory"* finds the design system. `runMcpProduct` keeps `env ‖ cwd/product` with **no package fallback**, so the same launch from a subdirectory indexes `<subdir>/product`, which does not exist. That is the silent-empty class, on the surface my routed tools read. Default it to `bornRoot/product`, and have 3.7a's product row run from a subdirectory.
- **[A12] Guard the scaffolded product tree's validity, so C32 is not the first time anyone checks it** → § "C27", § "C32" — add a test that the scaffolded `product/` tree indexes under the product MCP with **zero errors and zero unresolved references** (the example screen must reference only what the scaffold contains). Bite: break a reference in `example-home.yaml` → red. This costs little and is the check that stops *"my five tools are live"* from meaning *"live and returning broken references"*.
- **[A13] C1 keeps the test config without saying what it is for under Model B, and C27's collision string states a consequence that is not true** → § "C1" step 9, § "C27" — component `__tests__` were excluded from the copy even before 123, and under 19A.2 components are not copied at all. So *"'npx jest' will not run component tests"* describes tests she does not have, and 19.4's truthfulness bar applies to error strings too. State the Model B purpose (testing **her** forked components with `@3fn/core/testing`?) and write the consequence line from that. If there is no purpose for a consumer who has not forked anything, the jest scaffold may not belong in the birth at all.
- **[A14] The personal note under the most common way `init` is invoked** → § "C26" — the founder's **agent** usually runs `init` (A6's premise), from a non-TTY shell, so the default outcome is a template of `TODO` slots loaded into every session. `init`'s output should tell the founder by name to fill in `.designerpunk/personal-note.local.md` and say what it is for. Consider treating an all-`TODO` note as absent (Req 13's warning), so agents do not read an unfilled template as instructions.
- **[A15] The C23 doc lint and the `vocabulary.ts` test check that terms are present, not that they are taught** → § "C23" — asserting the install doc *uses the same terms* is 15B.5's consistency property. It is not 15B.3's *"SHALL NOT be introduced in a way that lets either be read as the other"*. That property is only observable through the trio, specifically persona (c)'s harness-fluency axis. **Name persona (c)'s run as 15B.3's evidence** in C30, so the vocabulary test is not later cited for a property it cannot establish (R26.8).

### Directed questions

- [@LINA] Le-D1: you own the Migration section's component-shadowing half. Can "unmodified" be judged against **package content at the installed-from version with `rewriteBuildImports` re-applied**, given that the copy transform changed the bytes? And do you know whether dp-portfolio has a `.kiro/sync-manifest.json`, and whether its first `sync` came before or after its edits to copied components? → design.md § "Migration" -- [LEONARDO R1]
- [@THURGOOD] Le-D3: will you define the step-counting unit in C23 and reconcile the four numbers? And Le-D2: is the platform-output default your call as design author, or does the fork reach Peter? I lean committing by default. → design.md § "C23", § "C24" -- [LEONARDO R1]
- [@THURGOOD] Le-D4: do you prefer a second join run on the other target, or a stated one-target limit in C8? Either is honest. What is not honest is the current *"both … verified live in U3"*. → design.md § "C8" -- [LEONARDO R1]

#### [STACY R1]

**Reviewer**: Stacy — REQUIRED. **Index**: C9, C15–C18, G1/G2, the MIDPOINT carrier, C30/C31, resisted-item 3; plus the LENS over the error catalog and bite table, and the DD residuals.
**Date**: 2026-09-26
**Item count**: **5 BLOCKING · 11 advisory** · paper pass on C18 **TAKEN** (its results are inside this entry, and it is **not** a G1 verdict) · MIDPOINT carrier **CONFIRMED U2** with two conditions · 3 directed questions.
**@ mention pre-step**: one directed question to me (Context § "Acceptance surface": *do the golden-list process and the per-target run shape meet inputs 20/21 as stated?*). Answered at item 1: **the shape meets both; the per-target bite does not yet prove it (S-D-B4).**
**Method, with its fraction**: read Context for Reviewers, and in design.md: Framing, Overview, Architecture, C9, C13–C19, C30–C32, Gates, Data Models, the error catalog, Testing Strategy, DD1–DD17, and resisted items 1–7. Cross-read against requirements.md 11.5, 11.6.5b/5d and 6. Components outside my index (C1–C8, C10–C12, C20–C29) were **not reviewed**. **No measurement**; every finding is from text.
**Mirror clause held**: properties named, no text drafted. Pure design-grain fixes are stated as the property they must have.

##### BLOCKING

- **[BLOCKING] S-D-B1 — C16's and C17's worked examples INVERT C1, putting the profile author in the exact seat C1 exists to keep him out of. The design's own example fails its own error-catalog check.** → design.md § "C16", § "C17", § "Error Handling"
  - C16 `stacy.yaml`: `owner: stacy`, **`confirmer: thurgood`**, with the comment *"owner unless owner == profile author → 'stacy'"*. The owner is Stacy, the profile author is Thurgood, so they are not equal and **C1 gives `stacy`**. The value contradicts the rule written beside it. The catalog's own `Wrong confirmer … the C1 rule requires <y>` fires on the example.
  - C17 is the **reasoning** error, not a typo: **`signer: thurgood  # … (stacy's own rows → thurgood)`**. C1 (Req 11.5.1–2) is *"signed by the owning domain agent, **not the profile author**"*, and the only carve-out is **consumer-Thurgood's rows → Stacy**. The design has invented the converse, **"the owner may not sign their own charter's rows."** That puts the profile author's signature on seven charters' worth of rows under a misreading. It also inverts the incentive argument that makes C1 work: the owner signs *against* their own interest, because a declaration costs their charter capability.
  - **Why blocking**: these examples are the templates a tasks author and an implementer copy. The mechanical confirmer check would either flag the example or be implemented to match it. **And the signer is NOT mechanically checked** — only the confirmer is. Missing property: both fields are checked against the C1 function, with a catalog string for a wrong signer, and the examples corrected.
- **[BLOCKING] S-D-B2 — PAPER-PASS RESULT: C18's strict match runs on `excerpt`, a FRAGMENT, and fragment matching OVER-counts. That breaks the one-sided floor's soundness claim, which rests entirely on strict matching being unable to over-count.** → design.md § "C18" (2), § "C16", requirements.md 11.6.5b
  - C16 items carry `excerpt: "Stage 1a — every spec with post-ratification merge activity…"`, a truncated quote with an ellipsis. C18: *"strict means the item's `excerpt` text appears verbatim in the rendered unit."* **A rendering that keeps each item's opening clause and deletes its operative remainder is counted as strictly retained.** That is clause (c), *label-retention is not retention*, violated **inside the mechanical half**, where no human will look.
  - **Exemplar Lina-2 clears mechanically**: seven step headings kept, bodies cut to *"Create the file."* If the excerpts are the step titles, the count is 7/7 → `CLEARED_MECHANICAL`, where the table requires **trivial**. (iii) may backstop this particular construction. **The floor's claim is still false as designed**, and the same move works on the `re-pointed` lane, where triviality is the only bar.
  - Missing property: **the strict comparand is the item's complete operative text**, or the excerpt is defined to *be* the complete text. A fragment may exist as a human label, but it is never the thing matched.
- **[BLOCKING] S-D-B3 — G1's BREAKS branch can be discharged without executing, through G2's NOT-RUNNABLE → FAILS → Fork A.** → design.md § "Gates and sequencing"; requirements.md 11.6.7, 11.8.2–3
  - The path: G1 returns BREAKS → pass four is blocked → the executing agent records G2 as **NOT-RUNNABLE ("blocked by G1")** → that is treated as FAILS → Fork A executes → **U2 is accepted.** It ships with **C18 never built**, so clause (ii)'s *reduced-to-triviality* trigger and the whole routing lane are absent. **Fork A's labelling describes (v)'s mechanical half, not a missing (ii)**, so the acceptance table would be green and wrong.
  - The design repeats my S2-A5 point, *G2 not schedulable before step 7*, but never says that **a G1-caused block is not NOT-RUNNABLE**. NOT-RUNNABLE (11.8.3) is for substrate proved unbuildable, not for a schedulable dependency.
  - Missing property: **U2 cannot be accepted while G1 stands at BREAKS**; the only path forward is C3 rework followed by a G1 re-run. **The fork I will not absorb — Peter's**: on a *repeated* BREAKS, is there a declared exit? The natural safe degradation is **"no mechanical floor — every unit routes"**. That fails toward review, costs volume, never clears wrongly, and would need its own labelling in 24.3. The alternative is that U2 simply waits. Surfaced, not picked.
- **[BLOCKING] S-D-B4 — Input 21's defining property, "through each adapter", is asserted and UNBITTEN. The 10.S bite mutates only the shared function, so a guard that calls the shared function directly passes the recorded bite identically.** → design.md § "C15" (per-target shape), § "Testing Strategy" bite table, DD7
  - I asked for the per-target run so that an adapter drifting back to inline emission goes red for its own target, and C15 states that correctly. **But the recorded bite (force `source: 'consumer-profile:…'` in the shared function) turns every target red whether the test routes through the adapters or calls `emitBodySpans` directly.** The bite cannot tell the property it exists to guard from its absence.
  - Missing property: a **two-sided per-target bite**. Mutate **one adapter's call site** (bypass the shared function, or emit a profile-sourced span there): **that target goes red and the other stays green.** That red-plus-green pattern is the only observation that proves routing through adapters.
  - **Answer to the directed question**: the golden-list process meets input 20 (see S-D-A1 for one mechanical gap), and the per-target run *shape* meets input 21. **Its bite does not yet prove it.**
  - Also exact: the bite table names **`semantics-guard.<target>.test.ts` (per target)**, which implies per-target files — *a second list*, contradicting C15's *"adding a target adds a guard run, with no second list"*. 8c requires the exact test id: `semantics-guard.test.ts › <target>`.
- **[BLOCKING] S-D-B5 — C9's REQUIRED FORM line has no failure handling as drawn, so the recorded bite can go red from the HARDENING line instead. The required guard is present as text and possibly not enforcing: Req 6's founding finding, one layer down.** → design.md § "C9", requirements.md 6.2–6.3
  - Line 263, the verbatim 6.2 form, carries **no `|| fail`**, and there is no `set -euo pipefail` anywhere. Lines 265–266 do carry `|| fail`. With the bite version 99.99.99, the version check's 404 may be ignored and **the script still exits non-zero, because the tarball `npm view` also fails and grep fails.** The committed red then testifies about the *hardening* line and says nothing about the *required* one. It is the "satisfied by the wrong guard" class that 8c names for C6.
  - It also departs from 6.3, whose bite recipe is **the verbatim `npm view @3fn/core@99.99.99 … --@3fn:registry=…` command** and not the wrapper script. Missing property: the script fails fast; **each assertion carries its own named message and its own recorded bite**; and the 6.3 verbatim command's red is recorded as written. The hardening needs a bite too: a non-npmjs tarball URL must fail the host check.

##### Advisory

- **[S-D-A1] DD6's "snapshot ban enforced by test" does not cover INLINE snapshots.** → § "Testing Strategy". The companion check looks only for a `__snapshots__` directory. `toMatchInlineSnapshot` writes into the test file itself, so under the `##` mutation, `jest -u` rewrites the expectation and the directory check stays green. **The dormancy route input 20 named is still open, by the exact surface.** The check should also reject the snapshot matchers in the test source, or the DD should claim less. Also: the `_provenance` key **declares** hand-authorship and cannot prove it. **The protection is the reviewed diff**: a regenerated list under the collapse shows as a visibly *shorter* unit list. The DD should say which of the two does the work.
- **[S-D-A2] Signature carry-forward has no failing check for a STALE signature.** → § "C17" valve 1, § "Error Handling". *"Either hash changes → the row re-opens"* is behaviour with **no catalog string and no test row**. An implementation that checks only that a signature is *present* carries stale assent indefinitely, and the valve becomes a leak. Same class for bare assent (*"a bare signature does not validate"*), which also has no string. Both need a catalog entry and a test.
- **[S-D-A3] `operative-set-freshness` is a new guard with no bite and no registration statement.** → § "C16". It is the enforcement of 5d.3, so it needs a bite (edit a canonical unit without re-confirming → red). It also needs to say whether it rides an existing required check or is a new one. **If new, my ARMING event fires when it arms** (`audit:coverage-map` + `verify-gate-registration.sh`), and I will fire it.
- **[S-D-A4] The perpetual records are homed in a spec's completion directory, and the paths are ambiguous.** → § "C16", § "C17", § "C30", § "C31". `completion/operative-set-confirmations/…` and `completion/signatures/…` are **re-written on every canonical change and every release, forever**. After 123 closes, that means writes into a closed spec's directory, if `completion/` means the spec directory; if it means repo root, the path is unpinned. `validation/trio-…` and `validation/conformance-beat-…` have no stated root. **My CLOSEOUT and RELEASE passes key on paths**, so pin every record path from the repo root. The perpetual ones need a **durable home** that survives the spec; G1/G2 correctly stay spec-scoped.
- **[S-D-A5] C18's entry condition, "emptied, reduced or absent", makes "reduced" a judgment ahead of the judgment.** → § "C18". A changed unit judged "not reduced" skips triviality entirely. The entry set should be mechanical: **every unit that is not a byte-identical `passthrough`**.
- **[S-D-A6] The hard floor's population is undefined at the new grain.** → § "C18" (4). *"Every operational unit"* was *"operational-mode section"* at `##` grain. At leaf grain, with orphan preambles as units, disposing every unit but one preamble as `no-consumer-counterpart` evades it. It needs a mechanical population definition; the units with non-empty C16 item sets are the obvious candidate. **Property only; the choice is the author's.**
- **[S-D-A7] G2's box lists only half its scope.** → § "Gates and sequencing". Pass four is *attack (a) verbatim* **and** *verify that the check reads the committed operative-set record* (11.6.5d). C16 says so and the gate diagram does not. The scope line on a PASSES verdict should carry both.
- **[S-D-A8] Seat authentication (resisted-item 3): honestly NAMED, but the audit's reach is over-stated.** → § "What resisted" 3, § "C16". *"The evidence is a committed note authored in the confirmer's session … audited by Stacy"* reads as if my audit closes the gap. **It does not.** Under one git identity the note is the same class as the field. My audit can establish **that the note exists and is internally consistent with the record** (itemized, matching ids and hashes), **not which seat wrote it.** Say that, and the posture is honest and auditable. **Before U2, nothing more is owed.** Real authentication is correctly deferred to 125-B U3, which is already chartered. Two options for Peter, not demanded:
  - **(i)** Land every C1-carve-out artifact (Thurgood's sections' confirmations, consumer-Thurgood's signatures) in its **own PR with `Agent: stacy`**, separate from profile-authoring PRs. Peter's merge then attests that the two events were distinct. This is separation, not authentication.
  - **(ii)** Name a **one-time re-attestation of existing records when 125-B U3 lands**, so the interim records are not grandfathered as authenticated.
- **[S-D-A9] C30's `budget-exhausted` stop is where R8's truncation can come back.** → § "C30", requirements.md 22.3–22.5. A budget set near the declared path length is the forbidden step-boundary truncation, and a wall-clock budget is the five-minute test by another name. Missing property: budgets are **never wall-clock**, are set as **runaway guards** well above the declared path, have their value recorded, and a budget stop is recorded as **a finding (the run did not complete), never a pass.**
- **[S-D-A10] DD residuals — three are empty or manufactured (the AICP test: an empty residual means the counter-argument was too weak).**
  - **DD14** *"Residual: none"* — yet it extends to deciding the two *existing* server-`src/` entries through C5, and that has consequences (source-map and debug loss, 118-surface certification).
  - **DD12** *"two assertions to maintain"* — the real residual is that the host regex hard-codes npmjs's URL form, so a registry CDN or host change false-reds a good release. The host line's missing bite (S-D-B5) also belongs here.
  - **DD7** *"run time scales with targets, trivial at two"* — absorbable by construction. The surviving counter is S-D-B4: the shape is unproven by its bite.
- **[S-D-A11] Two items for my own practice, recorded so they are not read as blind spots.** *(i)* At G1 step 3 the exemplar operative sets on my charter (A, B, D, E, C) are confirmed by **me**, the falsifying seat. G1's record will disclose that in the closed negative form. *(ii)* The C2 counting-block edit (C17 last bullet) is coordinated with me before merge. Accepted, and I will review it as the counting seat, not re-author it.

##### The C18 paper pass — TAKEN

**Why take it**: C18 is the code the entire triviality lane rests on, and a definition-level defect found on paper costs nothing, while one found at G1 costs a BREAKS cycle. **Why it is bounded**: it runs against design *text*, not committed operative sets. **It produces no HOLDS/BREAKS**, does not anchor G1, and G1 will re-run every exemplar fresh against committed records. **Results**: S-D-B2 (the excerpt fragment breaks the floor's soundness), S-D-A5 (the entry condition is a judgment), S-D-A6 (the hard floor's population). No further C18 findings from text.

##### The MIDPOINT carrier — CONFIRMED: U2, with two conditions

- **Why U2 is right**: MIDPOINT exists to catch claim drift **while there is arc left to correct it**. U2 carries the highest-risk and most novel claims — the § 7.2 machinery, the first render, and the heaviest signature volume. An audit there lands **before U3 builds the install doc on top of U2's generator**. U3 is the arithmetic midpoint; U2 is the risk midpoint, and the risk midpoint is the right carrier.
- **Condition 1**: U2's merge is the **first-render release**. The MIDPOINT pass records the C2 rates and the assent rate as ***first render — not a baseline*** (11.5.8). If that is not written down, this release's rote-assent rate becomes the baseline.
- **Condition 2**: G1 and G2 records are authored by me. The MIDPOINT pass audits **that each verdict's branch was executed and evidenced** (a promised/claimed/shipped check against my verdict). It does **not** re-audit the verdict content, which is recorded in the closed negative form.
- **Operational note**: under release-between-units, U2's merge probably also fires a **RELEASE** pass. That means **two records** — `completion/claims-pass-midpoint.md` and the release record — each with its own scope line and one shared evidence reading. They are never merged into one record.

##### Directed questions

- [@THURGOOD] S-D-B1: was `stacy's own rows → thurgood` a reading of C1 as *"the owner may not sign their own charter's rows"*? If so, it is worth correcting at the rule level and not only in the example, because 11.5.1 is *"signed by the owning domain agent, **not the profile author**"* and the owner's self-interest runs *against* the declaration. Also: will `signer:` be mechanically checked against the C1 function, like `confirmer:`? → design.md § "C17" -- [STACY R1]
- [@THURGOOD] S-D-B3: will the Gates section state that **a G2 blocked by G1 BREAKS is not NOT-RUNNABLE** and that U2 cannot be accepted while G1 stands at BREAKS? And do you want the **repeated-BREAKS exit** ("no floor — every unit routes", labelled in 24.3) put to Peter as a fork, or left as "U2 waits"? I hold no preference between those two; I hold a strong one that the Fork-A path is not silently available. → design.md § "Gates and sequencing" -- [STACY R1]
- [@LINA] S-D-B4 is a bite shape in generator code you own: is **mutating one adapter's call site** (cc.ts bypasses `emitBodySpans` → the `cc` target red, `kiro` green) cheap once C14's consolidation lands? It is the only observation that proves the per-target guard routes through adapters, and without it input 21's property is asserted but unbitten. → design.md § "C15" -- [STACY R1]

#### [ADA R1]

**Reviewer**: Ada (Rosetta token system) — REQUIRED
**Date**: 2026-09-26
**Item count**: **6 BLOCKING, 9 advisory**, and 1 directed question to Peter (it touches WHAT, so it goes to him, per Context for Reviewers).
**Mandatory @ mention pre-step**: this file has zero outstanding `[@ADA]` mentions.
**Method**: I checked every claim against `task/123-design` at `02138996`. Recipes are inline.
**Frame**: my R4 clauses (a), (b) and (c) are **faithfully folded**. Every blocking item below is a hole in text that was otherwise folded correctly. I found no case of drift from what I meant.

##### BLOCKING

- **[BLOCKING] D-B1 — C2's token-tier signal false-positives on common repo shapes, so `init` refuses a stranger's first run.** With no config present, "token tier" is defined as *`src/tokens/` is non-empty*. That is a common directory name with no DesignerPunk meaning: auth or JWT token utilities, or another design-token system's tier (Style Dictionary, Tokens Studio exports). Under C2 such a repo classifies as **partial**. `init` then refuses with *"looks partly initialized"* in a repo that has never seen DesignerPunk, and the MCP lands on the fail-loud side in a repo that should get the labelled CONSUME index. Trio persona (a)'s fixture, "a small existing TS service", is exactly the shape that can carry one. **Fix, faithful to 15A.3's "a present copied token tier"**: detect the tier **by its DesignerPunk shape, not by non-emptiness**:
  - `index.ts` plus `semantic/index.ts` that **textually** export `getAllPrimitiveTokens` / `getAllSemanticTokens`. That is `verifyBarrelContract`'s signature, detected without loading anything.
  - And/or `.designerpunk/manifest.json`, which C1 now writes at birth and DD1 commits.

  → design.md § "C2"
- **[BLOCKING] D-B2 — C3's partial branch reuses the born message, and following it produces the impersonation this spec exists to prevent.** C3 says *"born or partial → … absent or empty → `run 'npx designerpunk generate'`"*. Take a **tier-only partial** (tier present, no config) and follow that instruction:
  1. `ConfigLoader` finds no `designerpunk.config.ts` and falls to `DEFAULTS`. `tokenSource` is unset, so it runs in **package mode** (`ConfigLoader.ts:96–126`).
  2. `generate` writes **DesignerPunk's** index to `<cwd>/token-index` (`designerpunk.ts:142`).
  3. The index is now non-empty, so the born-side branch serves it **unlabelled, as the consumer's**.

  That is R1 B3, reached through our own error string. **Fix**:
  - The partial branch gets its **own** message, naming the missing signal and pointing at `init --re-scaffold`, just as `init`'s partial message already does in § "Error Handling".
  - **And** `generate` refuses when it finds no config but `findDesignSystemRoot` finds a tier.

  → design.md § "C3", § "Error Handling"
- **[BLOCKING] D-B3 — C2 never states each caller's `startDir`, and the installed package directory is itself born-shaped.** C5 keeps `designerpunk.config.ts` in `files[]`: its Removed list omits it, and it is shipped today. `src/tokens/**` ships as the copy source. So `node_modules/@3fn/core/` has a config **and** a non-empty DesignerPunk-shaped tier. That directory classifies as **born** even under D-B1's stricter signal.
  - The resolver's neighbouring helpers anchor on `resolvePackageRoot(__dirname)` (`mcpDataRoots.ts:49, 69`), so an implementer can naturally walk from the server's own location.
  - That walk finds `pkgRoot` as born and serves **our index as theirs, in both postures**.
  - "Never `process.cwd()` as the anchor" is right about the anchor, but it leaves the **start** unstated.

  **Fix**:
  - C2 states `startDir = process.cwd()` of the invoking process for every caller. Spawned servers inherit it, because `spawnServer` passes no `cwd`.
  - It states **never `__dirname` or `pkgRoot`**.
  - The walk **refuses any directory under `node_modules`**.
  - C5 removes `designerpunk.config.ts` from `files[]`. 4.6c already calls it a stale template.

  → design.md § "C2", § "C5"
- **[BLOCKING] D-B4 — C4's types-rewrite regex over-matches and breaks the consumer's theme files, and none of the designed checks catches it.** The pattern `from '../(../)*types(/…)?'` also matches `import type { SemanticOverrideMap } from '../types'` in **`themes/{dark,dark-wcag,wcag}/SemanticOverrides.ts`**. That import is **intra-tree** (`src/tokens/themes/types.ts`). Measured over the copy set: 37 matches resolve to `src/types` (the true escapes), and **3 resolve to `src/tokens/themes/types`**.
  - Rewritten, those three point at `@3fn/core/types`, which does **not** export `SemanticOverrideMap`. DD17 de-scoped the subpath that would have.
  - The import is type-only, so it is erased at runtime. Consequently C6's `generate` case passes, its bite (revert → red) passes, and C5's closure-over-the-copy passes, because it catches only **under**-rewrite.
  - The consumer's `tsc` then fails on **exactly the three files their `designerpunk.config.ts` imports**. That is the theme-authoring surface Model B handed them.

  **Fix**:
  - **Rewrite by resolution, not by string**: rewrite a specifier only if it resolves **outside the copy root and into `src/types/`**. Apply the same rule to the `Oklch` mapping and to the extended build rewrite.
  - Add an **over-rewrite arbiter** to C6: consumer `tsc --noEmit` over the copied tree, plus an assertion that the three theme files still read `'../types'`.

  → design.md § "C4", § "C6"
- **[BLOCKING] D-B5 — DD10/C7's name-contract source is not the surface that breaks, and DD17's premise is false on the measured artifact.**
  - **Component-token layer**: shipped `dist/ComponentTokens.web.css` references **only primitive** custom properties. There are 14 distinct names (`border-width-100`, `size-150…1600`, `space-075…150`), **zero semantic names**, plus 4 literals.
  - **Implementation layer**: component implementations under `src/components/core` reference **214 distinct `var(--…)` names**, for example `color-feedback-error-text` ×36 and `space-inset-100` ×36. The metadata YAML carries roughly 83 token-shaped strings.
  - So DD17's claim — *"resolve against the consumer's semantic names at the CSS custom-property level, which is exactly the name contract C7 checks"* — does not hold for the component-token layer. And DD10's residual (*"a reference only in implementation code is invisible"*) is the **majority** case, not the residual.
  - Under Model B the consumer owns their primitives. Renaming `space-100` is their right, and our component CSS then falls back **silently** with a clean 5A report.

  **Fix (design grain)**:
  - Derive `referencedNames` **from the compiled component surface that actually runs**: `var()` names in the shipped component CSS/JS ∪ `ComponentTokens.web.css`, **minus** the names our own component-token CSS defines.
  - Derive `presentNames` from the custom properties **defined in the consumer's generated web token output**.
  - Both sides then sit at the same (CSS) level, so no dot-to-kebab transform can drift.
  - **Whether primitive names fall under 5A is a WHAT question** → [@PETER] below.

  → design.md § "C7", § "DD10", § "DD17"
- **[BLOCKING] D-B6 — Thurgood's `sync` finding is CONFIRMED from the token side, the repair is right, and C7's migration misses its consequence.**
  - **Confirmed**: `FileScanner.ts:17–25` manages `src/tokens` (tier `source`), and `Classifier` classifies any package file absent from the project as `new`. That is resurrection.
  - **Broader than stated**: `updated-safe` (manifest equals project, package differs) **overwrites a consumer's unedited token files with ours**. That is ours flowing into theirs after birth, directly.
  - Removing `src/tokens` from `MANAGED_DIRS` is the right repair.
  - **The gap**: an existing consumer's manifest still carries `src/tokens/*` entries, and the manifest is **loaded, mutated and saved — never pruned** (`sync/index.ts:40–113`; `Applier.ts:46`). After the re-scope, the package scan no longer includes those paths, so **every** entry classifies `removed`. **Every sync, forever**, prints the consumer's whole language under **"⚠️ Removed from package:"** (`Reporter.ts:61–66`).
  - That is false, because the package still ships those files. It is also a standing nudge to delete their own tokens. The same applies to `src/types`, `src/components/core` and the gate-4b directories.

  **Fix**:
  - The migration step **prunes manifest entries under de-managed paths**, with a one-line report of what was un-managed and why.
  - `removed` is scoped to paths under **currently managed** entries.

  → design.md § "C7", § "Migration"

##### Advisory

- **[D-A1] C2 walk — four text-grain specifics.**
  - (i) At the `.git` level, **test the signals first, then stop**. Stopping before testing means the repo root, where both `.git` and the config live, is never tested, and every repo reads as unborn.
  - (ii) `.git` can be a **file** (worktrees, submodules — this repo uses worktrees). Use `existsSync`, not `isDirectory`.
  - (iii) A config with `tokenSource` omitted is `ConfigLoader`'s supported package-mode shape, and 3.2's re-entry trigger anticipates it. C2 classifies it as partial with a "partly initialized" message. The fail-loud MCP behavior is correct; name the case so the message is too.
  - (iv) Monorepo shape: a design system in `packages/ds` with the app elsewhere reads as unborn from the app. State it as a limitation, with clause (b)'s explicit `TOKEN_INDEX_DIR` as the documented escape.

  → design.md § "C2"
- **[D-A2] C2 has three consumers, not two.** `generate` is still cwd-anchored: `ConfigLoader` reads `cwd/designerpunk.config.ts` and the index is written to `cwd/token-index`. `generate` run from a subdirectory of a born repo therefore runs package mode on defaults and **silently writes our palette to `subdir/token-index`**. My R4 clause (a) said to anchor birth detection *"and the relative `./token-index`"*. The **read** side was folded; the **write** side was not. Fix: `generate` resolves through `findDesignSystemRoot`, or refuses in a subdirectory of a born repo. → design.md § "C2"
- **[D-A3] C6 has no arbiter for the case C2 exists to close.** Add *"CLI runner launched from a subdirectory of a born repo serves `bornRoot/token-index`, never the labelled package index"*, with the bite *anchor the walk at `process.cwd()` without ascending → red*. Add a tier-only-partial case for D-B2. → design.md § "C6"
- **[D-A4] DD11 — the right surface (sync, manifest-recorded, never writes), with three gaps.**
  - (i) Enum member lists miss **interface-shape** changes (`PrimitiveToken` / `SemanticToken` fields), which are the larger half of the type contract.
  - (ii) A **hand-bumped** `TOKEN_CONTRACT_VERSION` is a token standing in for the property (R26.8). Derive it as a content hash of the contract `.d.ts` surface, or add a test that fails when that surface changes without a bump.
  - (iii) The report's remedy *"run generate to check your tree"* **does not check anything**. A removed string-enum member evaluates to `undefined` at runtime, and `PrimitiveTokenRegistry.addToCategory` accepts `undefined` without validation (`PrimitiveTokenRegistry.ts:184–189`), so it passes silently. The remedy should be `tsc --noEmit` against `@3fn/core/types`, or `generate` should gain a category-membership check.

  → design.md § "C7", § "DD11"
- **[D-A5] C5 conflates two closures.**
  - (1) Over the **transformed copy**: zero escapes means rewrite completeness (C4).
  - (2) Over the **package's** `src/tokens`: the runtime closure is `src/types/{PrimitiveToken,SemanticToken}` plus `src/build/tokens`. It belongs in `files[]` **only if** package-mode `generate` stays as behavior, and 3.2 says it "remains".

  State which closure governs `files[]`. Then either ship closure (2), or make package-mode `generate` **refuse loudly**. Otherwise the de-scoped path breaks behind `ConfigLoader`'s misleading *"remove `tokenSource` to use package tokens"* error. → design.md § "C5"
- **[D-A6] `sync`'s Applier carries its own source transform** (`isSourceTs` → `rewriteBuildImports` only, `Applier.ts` ~L38–42), separate from `init`'s `copyDir` transform. With no source tier managed after C7 it is dormant. A future source-tier restore would write un-rewritten `../types`. Either share one transform set between both call sites, or delete the Applier's source branch. → design.md § "C4", § "C7"
- **[D-A7] DD17 — the de-scope is right.** My R1 B1 dissolves under Model B, because themes arrive in the copied tree. **Join the re-entry trigger to 3.2's**: a CONSUME flow that runs `generate` without `init` needs `SemanticOverrideMap` and the reference overrides importable, so the two triggers fire together, and the design should say so in one place. Req 1.5's stated rationale folds into D-B5. → design.md § "DD17"
- **[D-A8] C20's `repoRoot` assignment is correct.** It is consistent with Lina's L-B3 (doc-ids resolve from the package root), and `packageRoot` from `dist/generator` via `resolvePackageRoot` is self-checking. On the token side, the `token-governance` ambient embed resolves from `packageRoot/governance`, where it ships. No change needed. → design.md § "C20"
- **[D-A9] C6's brand-survival re-key folds both of my R4 clauses correctly.** Clause (a) is the plain-`Symbol()` bite as a new 3.6 case. Clause (b) is the in-case deletion of `progress.ts`, after which the token disappears. After 19A.2, progress tokens exist **only** in the consumer tree, and Source 1 scans only the consumer's `tokenSourceRoot` in local mode, so (b) bites cleanly. Nothing to change. → design.md § "C6"

##### Verdict on C2

**C2 closes the case it was written for.** The ancestor walk resolves the CLI runner from a subdirectory. C3 folds all three failure directions I named: an explicit-but-missing `TOKEN_INDEX_DIR` errors in any posture, a born repo with an absent-or-empty index errors, and runner defaults for consumer-owned roots are removed, with user env winning in `spawnServer`. **The two-signal heuristic has three holes against real repo shapes, and each one lands on the defect this spec exists to prevent:**

- **D-B1**: a bare-non-empty `src/tokens/` misclassifies strangers' repos as partial.
- **D-B2**: the partial branch's message leads, step by step, into generating and serving our palette as theirs.
- **D-B3**: no caller's start directory is specified, while the installed package directory is itself born-shaped.

All three are text-grain fixes to C2 and C3, not redesigns. The walk, the three-state classification, and the posture split are sound.

##### Directed questions

- [@PETER] D-B5 touches WHAT. Req 5A's "Why" block says *"our components reference semantic token NAMES."* The shipped compiled component-token layer references **only primitive** CSS custom properties. Under Model B the consumer owns and may rename those primitives, and our components would then fall back **silently** with a clean 5A report. **Should 5A's name contract cover the primitive names our compiled component surface references, or stay semantic-only with that gap recorded as an accepted residual?** I lean toward covering them, because 5A's user story (*"`npm update` never silently breaks a component that used to render"*) is otherwise unmet for the layer that actually carries the references. Surviving counter: it widens the contract the consumer's language must honour, from "our semantic names" to "our primitive names too". That is a real tax on a language the thesis calls theirs. → requirements.md § "Req 5A"; design.md § "DD10" -- [ADA R1]
- [@THURGOOD] D-B3 asks C5 to drop `designerpunk.config.ts` from `files[]`. It is the repo's own config and imports `./src/config` (raw src), and 4.6c already calls it a stale template. Is anything outside the reference-example role relying on it shipping? If so, the walk's `node_modules` refusal alone carries D-B3. → design.md § "C5" -- [ADA R1]
- [@LINA] D-B5's derivation reads `var(--…)` names from the **compiled** component surface. Do the web components' shipped `dist` bundles carry their CSS as extractable text, or is it assembled at runtime in a way that makes a static read incomplete? You know that shape; I measured `src`, not `dist`. → design.md § "C7" -- [ADA R1]

---

#### [LINA R1]

**Reviewer**: Lina (Stemma component system) — REQUIRED
**Date**: 2026-09-26
**Item count**: **9 BLOCKING** · 8 advisory · 1 directed answer (Ada) · verdicts on the acceptance surface (C13, DD6, C14) and on both sync verifications
**Evidence contract**: every figure measured today on `task/123-design` against the files the design cites. One-command recipes are inline.
**Mandatory @ mention pre-step**: two to me. **(1)** Context § "Acceptance surface" asks whether C13 implements exactly the behaviors I sized and nothing more. That is answered at L-D1 and A1, and the answer is no in both directions. **(2)** Ada R1 asks whether shipped `dist` carries the component CSS as extractable text. Answered at the end. Zero outstanding.
**A correction I owe first**: Req 5.6's "nothing records a baseline" parenthetical came from **my own outline R1 A4**. Thurgood is right that it was a misreading, and it was mine. Spec 111's `Manifest` (per-file `hash` + `managed` + `version`) and `Classifier` are a real three-way comparison, verified below.

---

### Verdicts on the acceptance surface

- **C14: MATCHES what I sized.** One `emitBodySpans`, and both adapter sites (`cc.ts` L244–247, `kiro.ts` L322–325) are replaced by one call each. That is Constraint 1 exactly. DD7's per-target E-guard, run through each adapter, is the right shape, because it catches the one drift the unit twin cannot. **The body lane is sound. Its scope is not — see L-D4.**
- **DD6: MATCHES, and is better than I asked.** A hand-authored list with a provenance key, plus a test that fails if a `__snapshots__` directory exists, closes the regenerate-the-oracle hole I did not name. The half-day sizing stands, **provided the fixture also carries the cases L-D1 adds.**
- **C13: does NOT match, in both directions.** One behavior I sized is **unreachable on the only document it was built for** (L-D1). One behavior I did not size was **added** (A1). The byte-identical invariant is asserted inside `partition()` with a throw, which is stronger than I specified and correct.
- **C3 (type-level declaration test, runner changes, three roots in C20): faithful** to A8, L3-B1/B2 and L-B3 as filed. **C21: faithful to L-B5 exactly**, one verb per entry. **C11: faithful.**

### Sync verifications

- **(a) Three-way baseline — CONFIRMED.**
  - `src/cli/sync/Manifest.ts` L11–17: `ManifestEntry { hash, managed }` and `SyncManifest { version, … }`.
  - `Classifier.ts` L57–110 compares package hash, project hash and manifest hash. That yields `updated-safe` (manifest == project ≠ package) versus `conflict` (manifest ≠ project).
  - Reusing it is right (DD2). **Except for two new managed entries, which it cannot handle as-is (A4).**
- **(b) Managed list and resurrection — CONFIRMED, and worse than the Overview states.**
  - `FileScanner.ts` L17–25 manages `src/tokens` and `src/types` (tier `source`), plus `.kiro/steering`, `governance`, `.kiro/agents` and `.kiro/skills` (tier `governance`).
  - `Classifier.ts` L60–67 has `if (!projFile) → 'new'` **whatever the manifest says**, so a deleted file classifies as new.
  - Then `sync/index.ts` L70–78 **auto-applies governance-tier `new` with no prompt** (`applyGovernance`). The tokens tier sits behind a single batch confirm (`confirmSourceUpdates`).
  - So today, **governance-tier resurrection is silent**, and token resurrection costs one "yes".
  - **The design's repair covers the managed-list edit** (C7 table, which I confirm row by row) **and the classification when a manifest entry exists.** It has two holes, at L-D7.

---

### BLOCKING

- **[BLOCKING] L-D1 — C13's enumeration fallback can never fire for `start-up-tasks.md`, the one document it exists for. C13 also never says the splitter's input is the BODY, and the design's own `_fixture.md` claim depends on that** → design.md § "C13", § "C19"
  - **Unreachable fallback.** C13 behavior 4 fires on *"a document with **no headings**."* `start-up-tasks.md` has one: `# Start Up Tasks` (L8). Req 10.3 is accurate (*"zero `^## `"*), but the design generalized that to "no headings", and the H1 title fell out of the condition.
    - As written, the document partitions into **one heading unit**, `#start-up-tasks`. C19's *"seven `#item-<n>` units"* contradicts C13.
    - That is the granularity defect OWED-A closed, reopened by the design.
    - **Fix: trigger the fallback on "no headings below the document's root title."** Add a title-only document to the golden fixture.
  - **Input must be the body.** Canonical charters carry **6–18 `^# ` YAML-comment lines inside their frontmatter**: 102 across the nine files (`_fixture.md` 16, `data.md` 18, `kenya.md` 17, `stacy.md` 15, …). Recipe: count `^# ` lines up to each file's closing `---`.
    - C14 passes `agent.doc.body`. But C16 records `source: canonical/agents/stacy.md` and C22's `derive(canonical/agents/<agent>.md, …)` names the **file**.
    - Any consumer that partitions the file instead of the body gains a dozen phantom H1 units. **`_fixture.md` would then stop being degenerate**, which falsifies C13's own *"triggers it on every run, by design."*
    - **Fix: `partition()` takes the body; frontmatter stripping is one shared function used by all four consumers.** State it in C13.
  - **Two partition gaps the invariant forces but the unit model does not name:**
    - **Content before the first heading has no anchor.** C13 defines a preamble only as *"between a heading and its first child."* Name it (`#doc:preamble`).
    - **Whitespace-only gaps.** There is a blank line after almost every heading. They must attach to an adjacent unit, or every one becomes a dispositionable empty unit in C16 and C17. My R2 count of 36 orphan preambles counted non-whitespace only.

- **[BLOCKING] L-D2 — C3 says the union "happens in the indexer", but the indexer is single-root and three-pass. It also derives the project root as `componentsDir/../../..`, which breaks under the design's own consumer layout. That derived root feeds the consumer's theme overrides and the token indexer** → design.md § "C3", § "C1"
  - `application-mcp-server/src/indexer/ComponentIndexer.ts` L116–118 lists **one** `componentsDir`, one level deep.
  - **Pass 1 fills `contractsCache` for inheritance resolution** (L120–127). A consumer component that inherits a package parent (the per-component fork case, Req 2.5) resolves only if the union is applied **at pass 1**, not after assembly.
  - **Collision key.** `contractsCache` keys on the declared `component` name, while assembly iterates **directory names**. A consumer fork whose directory name differs from its declared name escapes collision detection. Specify: **precedence keys on the declared component name.**
  - **L130: `const projectRoot = path.resolve(componentsDir, '..', '..', '..')`** feeds:
    - `modeClassifier.load(projectRoot)`, which reads **`src/tokens/themes/dark/SemanticOverrides.ts`** (`ModeClassifier.ts` L66);
    - `guidanceIndexer.validateCrossReferences` (L157);
    - **`tokenIndexer.indexTokens(tokenIndexDir, projectRoot)`** (L163, L248).
  - **With C1's consumer root `./src/components` (two levels deep), `../../..` resolves to the repo's parent directory.**
  - **With the package root, it reads DesignerPunk's dark overrides as the consumer's.** Under Model B the theme overrides are the consumer's language (1.2(ii–iii), local themes kept), so that is a Model A leak.
  - **Fix: the indexer's project root is C2's `bornRoot`** (unborn: the package root, labelled). The design already built that anchor to replace exactly this kind of `cwd` derivation.

- **[BLOCKING] L-D3 — The always-layer is not an embedding lane on either declared target. C19's "overlay applied at embed time in `emitAlwaysLayer`" has no site to apply to, and C12's guarded always-layer surface is 9 import lines on CC and EMPTY on Kiro. That reproduces L2-B3's silent zero on half the declared target set** → design.md § "C12", § "C19", § "C7"
  - **CC**: `adapters/cc.ts` L427–458 emits `CLAUDE.md` as a banner plus **one `@<path>` line per member** (`resolve` span, `id:<member>`). Member **content** never appears in any generated output; it lives at the imported path.
  - **Kiro**: `adapters/kiro.ts` L429–438 **returns `[]`**. Kiro's always-mechanism is the steering files themselves (`inclusion: always`) plus each agent config's `resources` array. `.kiro/agents/lina.json` L21 lists `file://.kiro/steering/*.md`.
  - **Consequences**:
    - there is no "embed time" at which to apply a path-(B) overlay;
    - `_consumer-output/kiro/` gets no always-layer content at all;
    - Req 10.2's per-unit always-set spans have no artifact to attach to;
    - under gate 4b, CC's imports would point at paths the consumer does not have.
  - **Fix — specify member-file emission in the consumer lane:**
    - for each declared target, write the nine consumer-rendered member files: shipped doc → `partition` → dispositions → overlay → `emitBodySpans` with the counterpart file as source;
    - on CC, `CLAUDE.md` imports those paths;
    - on Kiro, the files land in `.kiro/steering/` with `inclusion: always`, and the agent configs' `resources` point at them;
    - `_consumer-output/<target>/` guards the member files, not `emitAlwaysLayer`'s return value.
  - **Knock-on for C7**: the table's *"`.kiro/steering` — REMOVED"* is wrong for Kiro-attached consumers. Gate 4b stops copying **our** docs there, but their **generated** identity files must live there, so they belong in the managed generated surface. The C24 commit-policy row needs the member files named as committed agent artifacts (DD1).

- **[BLOCKING] L-D4 — The re-grounding machinery covers charter BODIES only. Measured, roughly half of each rendered charter is frontmatter-rendered sections plus ambient embeds. That half carries the commands, write scope and routes that SUBTRACT and clause (iv) exist for, and no disposition, overlay or span decision can reach it** → design.md § "C14", § "C17", § "C22"
  - Rendered length versus body end in `.claude/agents/*.md`:
    - `lina` 428 lines, body ends at ~297;
    - `thurgood` 905 lines, body ends at ~423;
    - `stacy` 832 lines, body ends at ~409.
  - **Everything after the body is non-body**: Ambient embeds, Ground truth, Workflow rules, Routing, Commands, Knowledge fallback, Write scope, Pre-flight.
  - Repo-specific pattern hits there (`complete-task\.sh|\.kiro/specs|\.kiro/hooks|application-mcp-server|src/components|governance/|Peter|ballot|RATIFIED|git status`): **lina 9, thurgood 10, stacy 5 lines.** These are subtraction bullets 1 and 4 in their purest form: `complete-task.sh`, write scope `.kiro/specs/**`, `application-mcp-server/**`.
  - **C17's schema is keyed `units: "#<anchor>"` over body units only.** Req 11.3.5's *"every ABSENT route … takes a (v) disposition"* therefore has **no place in the schema**, because routes are frontmatter.
  - An ambient embed flagged by clause (i)'s deny-list has **no disposition that could address it.** That is an unfixable finding by construction.
  - **C22's `derive()` covers the body too**, so the shipped consumer canonical would carry **our** commands and write scope in its frontmatter. That contradicts C22's *"steward canonical does not ship"* for the half of the charter that holds the most repo-specifics.
  - **Fix:**
    - add a `frontmatter:` disposition block keyed by field path (`routes.docs[i]`, `commands[i]`, `writeScope`, `preflight`, `knowledgeFallback[i]`, `ambient[i]`), using the same closed vocabulary;
    - emit per-entry spans with `source: canonical/agents/<a>.md#frontmatter:<path>`, so 11.4 applies uniformly;
    - have `derive()` filter frontmatter by those dispositions.
  - Without this, pass four's green on the body would be read as coverage of the charter.

- **[BLOCKING] L-D5 — The consumer lane's inputs do not ship. `files[]`'s dist glob excludes `.md`/`.yaml`, and C5 adds no entry for `dist/consumer-canonical/`** → design.md § "C5", § "C20", § "C22"
  - The dist glob is `dist/**/*.{js,d.ts,json,css,swift,kt}`. C22 writes `dist/consumer-canonical/<agent>.md` and C20 reads its canonical inputs from there, so **those files are dropped from the tarball.**
  - This is the class I filed as outline B1 (runtime fs-read data vanishing from packaging), arriving on the generator side.
  - C20's three-root assignment also leaves several **generator inputs** unnamed:
    - `canonical/shared/{always-set,field-dispositions,shared-catalog,skills-map}.yaml`;
    - the skill trees;
    - the tool registry.
  - **`registry.ts` builds the registry by live stdio introspection of the MCP servers** (L6, L242). The consumer lane must read C8's `dist/mcp/tool-manifest.json` instead.
  - **Fix:** an explicit `files[]` entry for `dist/consumer-canonical/**` (every extension it holds), plus C20 naming each input with its shipped path. C6's post-diet re-certification then proves the lane runs from a packed install.

- **[BLOCKING] L-D6 — Q5's "never a second tree" does not hold as designed. The overlay can drift silently for re-pointed units that clear MECHANICALLY** → design.md § "C22", § "C17", § "C18"
  - C22 says a canonical edit to a re-pointed unit *"trips C16's freshness check, and re-opens the C17 row through carry-forward, so the overlay cannot silently fall out of step."*
  - The first half forces **re-confirming the operative set**, not re-authoring the overlay.
  - The second half only applies to **routed** rows: `signature: # present iff the row ROUTED`.
  - Take a re-pointed unit that clears C18's floor mechanically:
    - canonical adds an obligation;
    - the confirmer re-confirms the item list;
    - the overlay text is unchanged;
    - C15 still says **VERIFIED**, because the span is sourced to S by rule regardless of its content (10.S);
    - C18 can still clear it on the old verbatim ratio.
  - **The stale overlay ships green.** That is what distinguishes a hand-maintained tree from a derived one: drift with no detector.
  - **Fix:** each overlay entry records the `canonicalHash` of the unit it re-grounds (`## @unit #<anchor> @ sha256:…`), and `derive()` **refuses** in steward CI when they differ. This uses the same mechanism as C16, applied to the text that actually ships.
  - With that fix, **my verdict is DERIVED, and I would sign it.** Without it, the overlay is a hand-maintained tree for exactly the units that most need to track canonical.

- **[BLOCKING] L-D7 — The resurrection repair has two holes, both through manifest entries that never get written** → design.md § "C7", § "C20", § "DD2"
  - **Hole (a), first sync.** `sync/index.ts` L50–53: a missing manifest is **bootstrapped from current project state**. A file deleted before the first sync has no entry, so `deleted-by-you` cannot fire. It classifies as `new`, and **governance-tier `new` auto-applies with no prompt.**
    - This is the Migration population exactly: every pre-123 consumer's first 123-era sync.
    - **Fix:** on first sync, generated-surface `new` is **reported, never auto-applied.**
  - **Hole (b), `attach` output.** The `unchanged` branch (L68–77) **never writes a manifest entry**, and only the apply paths do. So files `attach` emits never gain entries unless `attach` records them.
    - A joiner deletes an attached agent they do not use → `new` → **auto-reapplied**.
    - **Fix:** `emitConsumer` returns its file list; `init` and `attach` record manifest entries for it; the manifest records **`attachedTargets`**.
    - `sync` needs `attachedTargets` anyway, since DD2's "freshly generated package side" requires knowing **which** targets to generate. The design leaves that unsaid.
  - The same gap raises an ordering question for `init`: C1's `bootstrapManifest` must run **after** generation, or it misses the generated files.

- **[BLOCKING] L-D8 — The Migration section's premise is false under the design's own layout. Which way it breaks flips on an MCP-config rewrite the design does not sequence, and one direction silently drops the MODIFIED copies Migration promises to keep** → design.md § "Migration", § "C1", § "C7"
  - The indexer scans **one level** (L116–118). C1 moves the consumer root to `./src/components`. Pre-123 copies live at `src/components/core/<Name>/`.
    - Under the new root, the indexer sees `core` as a schema-less directory, logs *"Component directory has no schema.yaml: core"* (L395), and **the copies are invisible, not shadowing.**
    - Under the **old** scaffolded value (`COMPONENTS_DIR: ./src/components/core`), the copies are one level deep and **do** shadow every package component.
  - C7 now manages MCP config files, so the first 123-era `sync` rewrites that value. At that moment **modified copies vanish from the catalog silently.** Those are the ones Migration item 1 promises are *"listed as yours and kept"*.
  - **Fix:** `--migrate-components` **relocates** modified copies to `src/components/<Name>/` and removes unmodified ones, and the MCP-config rewrite is **sequenced after** it. The alternative is for the indexer to recognize one legacy `core/` level with a named warning. **Either way, the rewrite must not be allowed to run first.**

- **[BLOCKING] L-D9 — C7 and DD10 cite the wrong files as the name-contract source, and the right file needs a tier filter, or `sync` tells consumers to add OUR component tokens to THEIR language** → design.md § "C7", § "DD10"
  - Token references live in each component's **`.schema.yaml` `tokens:` block**, not in `contracts.yaml` or `component-meta.yaml`. Recipe: `grep -cE "color\.|space|typography\.|radius"` over `Button-CTA/contracts.yaml` and `component-meta.yaml` returns **0 and 0**, while `Button-CTA.schema.yaml` L112+ lists `typography.button.*` and more. As written, the metadata half of the source reads almost nothing.
  - The schema lists are **tier-mixed**. Across all schemas there are **219 unique names**, including **≥43 undotted primitives** (`blur050`, `borderWidth100`, `duration150`, …) and **≥25 component-tier names** (`avatar.size.lg`, `avatar.icon.size.xs`, …).
  - Component-tier names are package-owned and **stay behind the component surface** (DD17). Checked unfiltered against the consumer's set, they produce about **25 day-one reports of the form *"components now expect token 'avatar.size.lg' — add it to your set."*** That is the Model A leak inverted: our component layer written into their language.
  - **Fix:** the source is `.schema.yaml` `tokens:`, **filtered by the package registry's tier classification.** Semantic names are always checked; primitive names are checked or not per Ada's D-B5 question to Peter; component-tier names are never checked.

---

### Advisory

- **[A1] Things C13 adds that I did not size** → § "C13"
  - **Bulleted enumeration fallback.** The only heading-free prose member in the always-set is the numbered one (`start-up-tasks.md`), and `personal-note` is a template. So the bulleted branch has **zero current instances**: an unexercised path inside the verification substrate. Drop it, or give it a golden-fixture case.
  - **Positional `#item-<n>` anchors** renumber on insertion. One inserted item re-opens every later item's C16 record and C17 row. All seven `start-up-tasks.md` items open with a bold label, so slug from the label, like headings, and fall back to position only when there is none.
  - **The duplicate-slug `-2` suffix is order-dependent.** **Zero duplicate heading slugs exist today** across the nine charters and seven prose always-set members (measured), so this is latent only.
- **[A2] Render the derived canonical once, not per target.** `derive()` takes no target, so render it at `canonical/_consumer-output/_canonical/`, not `…/<target>/_canonical/`. Per-target copies are duplicates whose diff-guard adds no information. → § "C22"
- **[A3] Personal-note import at load time needs observing.** CC's `CLAUDE.md` `@`-importing a gitignored per-user path (`.designerpunk/personal-note.local.md`) on a fresh joiner's clone is **harness load-time** behavior. Req 13's tolerance covers only generation time. Add it to the U3 cross-target join run's observation list next to cold trust (Open input 18). → § "C19", § "C26"
- **[A4] DD2's "changes what is managed, not how" is false for two new entries.** → § "C7", § "DD2"
  - Region-grain comparison is a new unit: `FileScanner` and `Classifier` hash **whole files**. It needs a region extractor, `path#region` manifest keys and a splicing applier.
  - `.mcp.json`, `.claude/settings.json` and `.kiro/settings/mcp.json` are **JSON, which has no comment syntax** for self-labelling markers. They must be **key-grain**: named server keys, and `permissions.allow` entries matching `mcp__designerpunk-*`. Consumers routinely add their own servers, so file-grain management of these files manufactures conflicts. Overlaps Leonardo's C8; see the directed question.
- **[A5] Migration and the harvest-zero lint.** `scanForTokenFiles` is **recursive** (`loadComponentTokens.ts` L128–145). A pre-123 consumer's copied tree carries the 7 **old-name** `tokens.ts` reference maps, so C11's lint fires **7 times on their first `generate`, pointing at files we authored.** Their copied branded `*.tokens.ts` also harvest as **consumer** component tokens. Migration item 1 should name both. → § "Migration", § "C11"
- **[A6] My owed item is still open and has no record.** `find src/components -name "*.refs.ts"` returns **0**, and no issue file exists. C11 is sequenced on it. `.kiro/issues/` is outside my write scope, so **I ask the coordinator to have the bounded issue filed** (7 files + 12 importers, behavior-preserving). I execute it before U1's lint, as declared at requirements R1.
- **[A7] A latent defect found while answering Ada.** `dist/components/**/*.web.js` does `require("./X.web.css")` (for example `ButtonCTA.web.js` L40), and **`dist/components` contains 0 `.css` files**, because tsc does not emit them. Any Node-side import of a per-component dist module throws. Out of 123's scope unless C5's closure surfaces it. **It will**, since the closure follows `require()` edges, so expect it in `floor-closure.json`.
- **[A8] Confirmations with no change asked:**
  - C1's `src/components/README.md` is correctly excluded (the indexer filters `isDirectory`, L117);
  - C3's runner and `spawnServer` precedence match L3-B1/B2;
  - C20's degradation bite matches Req 13.5;
  - C21's `SCAN_DIRS` removal-plus-no-op, ordered before deletion, is right.

---

### Answer to Ada — does compiled `dist` carry component CSS as extractable text?

**The per-component `dist` modules carry none. The browser bundle carries all of it, statically. One src site interpolates, and it is not a package reference.**

- **`dist/components/**/*.web.js`: zero.** `ButtonCTA.web.js` has **0** `var(--` occurrences and `require`s a `.css` file that is **not in `dist`** (A7). A static read of these modules finds nothing.
- **`dist/browser/designerpunk.esm.js`: complete for package-fixed references.** esbuild inlines the 29 source `.css` files as text: **183 unique `var(--…)` names**, **0 interpolated**, plus **7 `getPropertyValue('--…')` literal reads** from JS (blend-color computation, for example `ButtonCTA` L178/L234). **Read both forms**, or the 7 JS-side reads are missed.
- **The one interpolation**: `IconBase.web.ts` L200/L476, `` `var(--${color})` ``. The name is **the consumer's own `color` prop value**, not a reference our component fixes, so it correctly falls outside the name contract.
- **Implication for D-B5**: derive from the **browser ESM bundle** (or from src `.css` + `.web.ts` before narrowing). The 29 source `.css` files are **not** on C5's declared floor, so after the diet the bundle is the only shipped copy.

---

### Directed questions

- [@THURGOOD] L-D3 and L-D4 are the two places where the § 7.2 machinery's **domain** is narrower than its requirements: always-set members (no embed site on either target) and frontmatter-rendered sections (no disposition key). Are these intended design gaps, or omissions? Either way both need a mechanism before tasks. **G2's pass-four scope (attack (a), verbatim) is body-only, so a PASS there says nothing about either.** → design.md §§ "C12", "C17", "C19", "C22" -- [LINA R1]
- [@ADA] L-D2: the indexer's derived `projectRoot` feeds **`tokenIndexer.indexTokens`** and the ModeClassifier's read of the consumer's `dark/SemanticOverrides.ts`, both your surfaces. Do you confirm C2's `bornRoot` as the anchor for both under Model B, with unborn meaning the package root, labelled? → design.md § "C3" -- [LINA R1]
- [@LEONARDO] A4: C8's "managed region" in `.claude/settings.json` and `.mcp.json` has no marker syntax, because they are JSON. Would you take **key-grain** management instead (named server keys, plus `permissions.allow` entries under a `mcp__designerpunk-` prefix), given that consumers add their own servers to the same files? → design.md §§ "C8", "C7" -- [LINA R1]
- [@STACY] L-D4: clause (iv)'s routes live in **frontmatter**, which C17's body-keyed schema cannot disposition. When that lane exists, is it inside G2's scope, or does it need its own falsification pass? I would rather this be decided now than read later as covered by a body-only PASS. → design.md §§ "C17", "Gates and sequencing" -- [LINA R1]

---
