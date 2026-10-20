# Issue: principles as a kind, not a directory — and the per-doc triage of `preserved-knowledge/`

**Date**: 2026-10-18
**Status**: ACTIVE (chartered; nothing executes in the charter unit)
**Owner**: Thurgood (Civitas steward: content consistency, the pointer ledger, the `kind:` mechanism, the `preserved-knowledge/README.md` label, the "contamination vectors" item, the follow-up ballot).
**Co-owners, by item**:
- **Ada**: the comparison of `preserved-knowledge/token-architecture-2-0-mathematics.md` against `governance/rosetta-system-principles.md`, the Token-Family docs and the validators. She authors any extraction into her own docs, and she owns the repoint target for the three token-mathematics pointers.
- **Lina**: the True Native pointers in her two docs (`governance/Component-Development-Guide.md` L31; `governance/cross-platform-vs-platform-specific-decision-framework.md` L351). The repoint target is the decision framework's § Key Principle, as rewritten by the True Native ballot's site 1 (her text).
- **Leonardo**: the index page's routing line in his charter, and the seam between that page and the architectural line in `design-language/design-philosophy.yaml` (the "build-time platform separation" characteristic, a surface he owns per the True Native ballot's site 4).
**Trigger**: `manual` — the events listed under **Triggers** below (unchanged). *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Class**: P3 improvement · charter *(set 2026-10-20, Thurgood, rule 12. A charter. Nothing executes in the charter unit.)*
**Triggers** (events; the item is walked monthly under `.kiro/issues/README.md` rule 6):
1. **The True Native ballot's EXECUTION PR merges.** That is the application PR of `.kiro/docs/ballots/2026-10-18-true-native-development-is-not-true-native-design.md`. Ratification alone is not the trigger. This fires the True Native rows of the pointer ledger.
2. **Ada's comparison record exists**: a committed record comparing `token-architecture-2-0-mathematics.md` with Rosetta principles, the Token-Family docs and the validators, naming anything not yet encoded. This fires the token-mathematics rows.

The follow-up ballot (§ 3) is drafted when **both** triggers have fired, so that Core Goals is edited once.
**Source**: Peter, 2026-10-18 (relayed by the orchestrator): "Approved. Let's also be mindful of any updates to the agents we'd need to make as a result." It approves the converged recommendation from Thurgood's and Leonardo's read-only consults: a kind rather than a directory, Leonardo's human index page, the per-doc triage, and one chartered issue with two triggers. The same ballot's § 6.5 records the follow-up this issue charters.

---

## 1. The ruling and its reasoning

- **What `preserved-knowledge/` is.** Peter, verbatim (True Native ballot § 8): *"The preserved-knowledge directory is context and lessons learned from the previously failed attempts at building what is now DesignerPunk. They're the ideas DP is built from, so they're historical context rather than anything that we would point to today as reference material."* Live docs therefore must not point into it as current guidance.
- **Principles are governance in this system.** They change by ballot (the True Native ballot is a principle being ratified as law), they are Peter-merged, and they trigger consults. A separate folder would put them outside the `governance/**` lists that three law texts name by path: the Merge Rule carve-out, the orchestrator's consult triggers, and Stacy's population (iii).
- **Approved: kind, not directory.** A `kind:` frontmatter key (§ 4) marks a document as a principle wherever it lives. Principles already live in four homes, and each has its own reader:
  - `governance/` (Rosetta and Stemma principles, the vision), served by the docs MCP;
  - `design-language/design-philosophy.yaml`, served by the Application MCP and shipped to consumers;
  - the steering identity docs (Core Goals, AI-Collaboration-Principles), always loaded;
  - `preserved-knowledge/`, served by nothing.
- **The reader fork is decided for agents** unless Peter says otherwise. The surviving counter is that a kind is invisible to a human browsing GitHub. Leonardo's index page (§ 4.2) is the partial answer.
- **Peter's three open choices, recorded and not decided here:**
  1. **Rename `preserved-knowledge/` to something like `history/`?** The current name reads to a newcomer as "kept because valuable". The cost is about 60 links in `strategic-framework/` (10 docs) plus the exclusion entry in `.kiro/hooks/organize-by-metadata.sh` L159.
  2. **Where does decision-framework L351 go?** Either fold it into the True Native execution PR (cheaper, but it reopens that ballot's confirmations at R5), or keep it in this follow-up as the ballot's § 6.5 says. **Thurgood leans toward the follow-up.**
  3. **Does the human reader warrant a `governance/principles/` subfolder** once the triage gives a real count of principle documents (estimated at 6–8)? A subfolder is not a new root: the indexer scans recursively (`mcp-server/src/indexer/DocumentIndexer.ts:514`), `STEERING_ROOTS` covers it (`mcp-server/src/id-guard/check-id-uniqueness.ts:165`), and every `governance/**` list inherits it. Its cost is about 32 live files that cite these docs by path (19 for `stemma-system-principles.md` alone), some of them in `canonical/agents/`, which means regeneration.

## 2. The triage table (14 files)

The kind test asks four questions: does it constrain behaviour; can compliance be checked; does it change by ballot; is the reader an agent acting or a human understanding. Dispositions:
- **archive+repoint**: the content is encoded elsewhere; label it historical and retire the pointers.
- **extract-reverified**: load-bearing but not encoded; the owner extracts it into their governance doc, re-verified against today's source.
- **history-label**: covered by the README label; no pointers to retire.

| File (lines) | Kind | Encoded where | Disposition | Owner |
|---|---|---|---|---|
| `true-native-architecture-concepts.md` (441) | Principle, past tense (constrains nothing, uncheckable, dated 2025-01-09, labelled "PURE CONCEPTUAL PRESERVATION") | The live kernel (build-time platform separation, cross-platform API consistency) is in Core Goals § Key Principles, `design-philosophy.yaml`, and the decision framework's Key Principle, which the True Native ballot is rewriting. Stale parts: "four-layer component architecture" appears nowhere in the live corpus; L429's "native … user experience" is the wording the ballot narrows. | archive+repoint (after trigger 1) | Lina (pointers); Leonardo consulted (the yaml seam) |
| `token-architecture-2-0-mathematics.md` (341) | Governance-shaped (formulas, tolerance tiers, contrast thresholds: constrains, checkable) | Expected in Rosetta principles, the Token-Family docs and the validators. Not yet verified: that is trigger 2. | archive+repoint, or extract-reverified for any part Ada's record finds unencoded | Ada |
| `ai-collaboration-framework-with-skepticism.md` (418) | Governance, superseded | `governance/AI-Collaboration-Framework.md` has the same section structure (Mandatory Skepticism, Devil's Advocate, Objective Validation Gates, Bias Detection, Anti-Patterns). Already classed "historical record — never edited" by ballot `2026-09-19-counter-argument-fold-back`. | history-label. **No live pointer**: the four hits in `governance/a-vision-of-the-future.md` (L549, L588, L601, L604) are transcript, the same never-edited class. | Thurgood |
| `sustainable-development-practices.md` (1571) | Mixed: methodology plus history | Mostly history. **One live dependency**: Core Goals L90, "Maintain concept-based documentation preventing contamination vectors", relies on a concept defined only here (`governance/Token-Semantic-Structure.md` mentions it without defining it). | history-label, plus the **contamination-vectors item** (below) | Thurgood |
| `grid-and-breakpoint-systems-report.md` (843) | Report (2025-11-05) | Responsive and spacing token families. Cited only by historical records (`.kiro/audits/`, closed specs, `strategic-framework/`). | history-label. Ada may confirm coverage inside her trigger-2 pass; this is optional. | Ada (optional confirm) |
| `fresh-repository-roadmap.md` (483) | History (roadmap artifact) | n/a | history-label | Thurgood |
| `fresh-repository-steering-structure.md` (435) | History (roadmap artifact) | Replaced by the current Layer 0–3 steering scheme | history-label | Thurgood |
| `mass-abandonment-log.md` (267) | History (abandonment log) | n/a | history-label | Thurgood |
| `specification-category-abandonment-log.md` (272) | History | n/a | history-label | Thurgood |
| `configuration-category-abandonment-log.md` (224) | History | n/a | history-label | Thurgood |
| `source-code-category-abandonment-log.md` (223) | History | n/a | history-label | Thurgood |
| `documentation-category-abandonment-log.md` (206) | History | n/a | history-label | Thurgood |
| `pre-filter-abandonment-log.md` (203) | History | n/a | history-label | Thurgood |
| `steering-pre-filter-analysis.md` (**0**) | Empty file | n/a | **delete** | Thurgood |

**The contamination-vectors item** (Thurgood). There are two options:
- **(a) Extract.** Write a short definition into a governance process doc (candidate: `governance/Process-File-Organization.md` or `governance/Process-Integration-Methodology.md`) and leave the Core Goals clause unchanged. **This costs zero signatures.**
- **(b) Drop the clause from Core Goals.** That changes the `#development-practices` unit and its consumer rendering: the clause renders to consumers via `canonical/profiles/consumer/always-set/core-goals.overlay.md` L73 and `canonical/operative-sets/core-goals.yaml` L138. It costs one re-sign.

**Thurgood recommends (a).**

## 3. The pointer ledger (verified 2026-10-18)

| # | Site | Points to | Repoints when | Target | Owner |
|---|---|---|---|---|---|
| P1 | `.kiro/steering/core-goals.md` L33 | True Native concepts | after trigger 1 | decision framework § Key Principle (post-ballot) | Thurgood (the Core Goals ballot) |
| P2 | `governance/Component-Development-Guide.md` L31 ("WHEN building new components THEN read: … True Native Architecture", an agent-facing reading-priority line) | True Native concepts | after trigger 1 | decision framework § Key Principle | Lina |
| P3 | `governance/cross-platform-vs-platform-specific-decision-framework.md` L351 (§ Related Documentation) | True Native concepts, **via a broken path `../../preserved-knowledge/`** | after trigger 1, unless Peter folds it into the execution PR (choice 2) | **remove, don't fix** (it would be self-referential once the Key Principle carries the principle) | Lina |
| P4 | `.kiro/steering/core-goals.md` L35 | Token mathematics | after trigger 2 | Ada names it (expected: `rosetta-system-principles`) | Thurgood (the Core Goals ballot) |
| P5 | `governance/Component-Development-Guide.md` L50 | Token mathematics | after trigger 2 | Ada names it | Lina edits; Ada names the target |
| P6 | `governance/rosetta-system-principles.md` L590 (§ Related Documentation, "Detailed mathematical formulas") | Token mathematics, **via a broken path `../../preserved-knowledge/`** | after trigger 2 | **remove, don't fix**, once any unencoded formulas have landed in Ada's docs | Ada |

- **The two broken links (P3, P6)** have pointed outside the repo since the 119 relocation moved those docs out of `.kiro/steering/`. Repairing the path would bring back a pointer to history.
- **One Core Goals ballot, not two.** P1 and P4 (and the contamination-vectors clause, only if option (b) were chosen) ride a single ballot. Core Goals is an identity doc, so the ballot carries a re-sign of the `#core-project-context` row (signer Stacy).
  - The consumer profile already strips these exact pointer lines (`canonical/profiles/consumer/always-set/core-goals.dispositions.yaml`, removal `subtraction-5`). The consumer rendering should not change; the canonical hash does.
  - The row's `removals` entry, which quotes the removed text, is edited in the same PR.
- **Where the governance-doc edits go.** P2, P3, P5 and P6 are governance-doc edits under the ballot model. They ride the same follow-up ballot, with Lina and Ada consulted for their own docs.
- **`strategic-framework/`.** Its roughly 60 links into `preserved-knowledge/` are history citing history and are **not** part of this ledger.

## 4. The mechanism

1. **`kind:` is a new frontmatter key, adopted by ballot.** The precedent is Spec 102's addition of `token-documentation` to the metadata vocabulary.
   - It sits in the YAML frontmatter beside `id:`. Proposed values to settle in the ballot: `principle`, plus whatever else the triage count justifies. It is **optional**: absent means "standard".
   - Implementation:
     - `mcp-server/src/indexer/frontmatter-parser.ts` parses the key;
     - `find_docs` and `get_document_summary` surface it;
     - `scripts/validate-steering-metadata.js` validates the value set.
     All three are in Thurgood's standing scope.
   - **Consulted**: Stacy, because `find_docs` output is read in claims passes and adding a field changes a public tool contract; and every seat whose charter routes through `find_docs` gets a notification, not a consult.
   - **It is NOT `Organization`.** That field is a filing route, not a kind. `organize-by-metadata.sh` (L236–267) moves files by its value, and an unknown value is routed to the repo root. `find_docs` also surfaces `organization` under the label **`owner`** (`mcp-server/src/query/QueryEngine.ts:872`, `:897`). So `Organization: principle` would render as `owner: "principle"`.
2. **Leonardo's index page, "What DesignerPunk believes."** One governance doc (Layer 2, `kind: principle`) that links the four homes in § 1 and says in one line what each is for. Leonardo owns its routing line (§ 5); Thurgood keeps its links current at the monthly walk.
3. **`preserved-knowledge/README.md`.** It says "historical context, not current guidance", carries Peter's words from § 1, and has a superseded-by table (each concept doc → the live doc that replaced it, from § 2). The other files stay unedited (never-edited class); only the empty file is deleted. The README sits in a folder nothing indexes, so there is no indexer impact.
4. **The `Organization`-decay finding (Thurgood), recorded here rather than as its own file** because this unit is one file. It splits into its own issue if it grows past a validator/hook alignment.
   - **Finding**: `organize-by-metadata.sh` accepts 9 values (L145–155), but `scripts/validate-steering-metadata.js` accepts 6 (L126–133).
   - The hook's routes predate 119: `process-standard` → `.kiro/steering/`, `token-documentation` → `docs/tokens/`.
   - The hook's `.kiro/hooks/organize-after-completion.kiro.hook` is `"enabled": false`, but the routing table is live code.
   - **Fix (Thurgood's scope)**: retire the routing or align it, and settle the `owner` label in `find_docs`. Same triggers as this issue; it rides the `kind:` work because both touch the same vocabulary.

## 5. Agent updates (Peter's ask): the inventory

These greps ran on 2026-10-18 over `canonical/agents/**`, `canonical/operative-sets/**`, `canonical/profiles/**`, `.kiro/steering/**` and the generated `canonical/_consumer-output/**`. They looked for `preserved-knowledge` and the three concept-doc names, reliance on `Organization`, and routing lines that would gain the index page or `kind:`.

**What the greps found:**
- **No agent charter references `preserved-knowledge/`.** Every agent route to a principle doc is **by doc id**, not by path (`ada.md` L70 `rosetta-system-principles`; `stemma-system-principles` in `lina.md` L135, `leonardo.md` L87, `kenya.md` L102, `data.md` L102, `sparky.md` L108). Kind-not-directory therefore moves no agent route.
- **No agent relies on `Organization`** except the one metadata-creation line in Thurgood's charter (row 3 below).
- **`canonical/operative-sets/ai-collaboration-principles.yaml`** L162/L166 routes to `ai-collaboration-framework` (the live successor). It is unaffected.

| # | File | Change | Owner | Signing cost |
|---|---|---|---|---|
| 1 | `.kiro/steering/core-goals.md` (identity doc) → `canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` `#core-project-context` | P1 and P4 removed or repointed; the row's `removals` text updated | Thurgood (ballot); Stacy signs | **1 re-sign** (Stacy). The consumer rendering is expected unchanged (subtraction-5 already strips the lines). Regenerate. |
| 2 | Same file, `#development-practices` (contamination clause) | **None under option (a)**; one clause dropped under (b) | Thurgood | **0** under (a); 1 re-sign plus a consumer rendering change under (b) |
| 3 | `canonical/agents/thurgood.md` L567 (§ "Steering Doc Lifecycle", Creation line, which lists the required metadata including `Organization`) | **None if `kind:` is optional** (recommended). If the ballot makes it required, `kind` is added to the list. | Thurgood | **0** if optional; otherwise 1 re-confirm/re-sign of `#steering-doc-lifecycle` (routed, signer Stacy) plus regeneration |
| 4 | `canonical/agents/thurgood.md`, stewardship of the `kind:` vocabulary | **No new line.** It is covered by the existing In Scope bullet "Steering doc metadata enforcement (creation and update)" (L343). | — | 0 |
| 5 | `canonical/agents/leonardo.md` frontmatter `routes.docs` | **One new route** to the index page (e.g. "WHEN you need what DesignerPunk believes, across its four homes"). He sets its consumer disposition. | Leonardo | **0** if `retained` (retained rows carry no signature); **1 C1 first signature** if routed (`no-consumer-counterpart`). If a first signature, it pastes both lists per `.kiro/issues/2026-10-17-first-signatures-not-on-stale-list.md`. Regenerate. |
| 6 | Index page routes for other seats (Thurgood; optionally Ada/Lina) | Optional. **Not recommended at first.** Leonardo is the named human-facing consumer, and the other seats already route to their own principle docs by id. | each seat | 0 unless added (then the same as row 5) |
| 7 | `governance/` edits P2/P3/P5/P6, the index page, the README | Governance docs, not agent bodies. Checked: none of the pointer lines sits inside a section an agent embeds. Leonardo's ambient is the decision framework's `#decision-framework` section; L351 is in § Related Documentation. Component-Development-Guide and Rosetta principles are not embedded by section. | Lina / Ada / Thurgood / Leonardo | 0 signatures; Peter-merged under the governance carve-out |
| 8 | Consumer renderings (`canonical/_consumer-output/**`) | Expected unchanged under the recommended options. Under option (b), Core Goals' `#development-practices` rendering changes. | generator | follows rows 1–2 |

**Total expected signing cost:**
- **1** (Stacy's re-sign of `#core-project-context`) under the recommended options: contamination (a), `kind:` optional, Leonardo's route `retained`.
- **Upper bound 4**: plus option (b), a required `kind:`, and a routed Leonardo row.

Every `canonical/**` edit regenerates and is Peter-merged under the carve-out, with the affected seat consulted.

## 6. Sequencing and size

- **Order:**
  1. The True Native ballot is ratified **and** its execution PR merges (trigger 1).
  2. Ada's comparison record exists (trigger 2). It can run before or in parallel with step 1.
  3. Thurgood drafts **one** follow-up ballot carrying: the Core Goals edit, P1–P6, the `kind:` key, the index page, the README, and the `Organization` alignment.
  4. The application PR is Peter-merged.
- **It is not part of Spec 130 R1.** Spec 130 consumes the True Native law, not this cleanup.
- **It gates none of 128, 129 or 130.** It is gap-filler work for the space between bursts.
- **Estimated size:**
  - Ada's comparison: one bounded read (341 lines against her docs).
  - The ballot: one drafting session plus one consult round (Lina, Ada, Leonardo, Stacy).
  - The application PR: about 8 files edited, 1–2 created (index page, README), 1 deleted, plus the parser/validator/`find_docs` change with tests.
  - Signing: 1 expected (§ 5).
- **Closing**: the outcome is recorded in this file (dated), then it is `git mv`'d to `archive/` (README rule 5).
