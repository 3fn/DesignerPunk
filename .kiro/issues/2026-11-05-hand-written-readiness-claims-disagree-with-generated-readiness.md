# Hand-Written Readiness Claims in 13 Governance Docs Disagree with the Readiness the Application MCP Serves, and Nothing Checks Them Against It

**Date**: 2026-11-05
**Filed by**: Lina, under rule 10, on Peter's words, received 2026-11-05T05:26:29Z (`date -u` at receipt, orchestrator relay): "661, 662 and 663 are merged; yes, file the record". The question he read: "Three or more docs restate readiness by hand, and nothing checks them against the generated readiness file, so they drift. The class fix would be to generate those tables from `packageReadiness.generated.ts`, or to add a test that fails when a doc's claim disagrees with it. Lina owns the content and Thurgood the cross-surface check. Do you want me to have them file a record with a trigger…?" The class defect is Thurgood's, found while correcting #663. Read at `origin/main` `97519f6a3`.
**Owner**: Lina (the content of the component docs). **Consulted**: Thurgood (the cross-surface check; his #663 report named the class and the check, and his read of the two options below is not yet on this record, so the guard option is a question to him at the fixing step, not a decision).
**Class**: P2 obligation (guard) · defect *(set 2026-11-05, Lina, rule 12. The record's subject is a guard weaker than its claim: `governance/Component-Readiness-Status.md` § "Consistency Requirements" says "Readiness status MUST be consistent across all documentation surfaces" and lists "Integration tests verify status across surfaces". I found no such test: a search of `src/`, `application-mcp-server/src/`, `scripts/`, `tools/`, `tests/` and `.github/` for the names of the readiness docs returns component READMEs and one fixture, and the only readiness test, `PackageReadiness.test.ts`, compares the generated file to a fresh scan of the component directories, not to any doc. Why not P1: no adopter is blocked by this record; the two components where an adopter's build would have failed were corrected the same day (#660, #663). Why not (record): readers are misled today, which rule 12 excludes from (record). **The opposing read is P0, and it is real**: each wrong claim below is a false sentence in a served doc, which is where the release falsity floor (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7) says a falsehood cannot be disclosed, only fixed. M7 makes a row "floor-class" whether or not this line says P0, so the class does not hide the instance claims from the next release's walk; I name them there as floor-class candidates (§ "What the walk is owed"). I class the record by what it asks for (a guard), and leave the P0 reading of the instances to the walk, to Stacy and to Peter, who alone downgrades a P0.)*
**Trigger**: `release:next:phase-1` — the fixing PR rides the next release's phase 1, or `merge:#<N>` once that PR exists. *(Set 2026-11-05, Lina, rules 1 and 9: a P2 that would ride a release takes `release:next:phase-1`. The event that owes the close is the merge of the fixing PR; the release is only where the walk reads whether it happened.)*

---

## What is true at `97519f6a3`

**The reference.** `application-mcp-server/src/indexer/packageReadiness.generated.ts` (34 components) is the per-platform readiness the Application MCP serves for the shipped package. It is generated: `PackageReadiness.test.ts` fails when it differs from a scan of `src/components/core`. At this base the 34 components read:

| Web | iOS | Android | Components |
|---|---|---|---|
| `production-ready` | `scaffold` | `scaffold` | 28 |
| `production-ready` | `development` | `development` | 2 (Button-VerticalList-Item, Button-VerticalList-Set) |
| `scaffold` | `scaffold` | `scaffold` | 4 (Nav-Header-App, Nav-Header-Base, Progress-Indicator-Connector-Base, Progress-Indicator-Label-Base) |
| `production-ready` | `production-ready` | `production-ready` | 0 |

That is 28 + 2 + 4 + 0 = 34: **28 web-ready with scaffold native, 2 web-ready with `development` native, 4 scaffold on every platform, 0 production-ready on any native platform**. No shipped component is production-ready on iOS or Android, so **any unqualified "🟢 Production Ready" in a doc, on a component or a family, is wrong against Component-Readiness-Status's own definition ("across ALL declared platforms")**.

**The one hand-written table that agrees.** `Component-Readiness-Status.md` § "Individual Component Status": 34 rows, compared this session with a script against the generated file, 0 mismatches (web / iOS / Android on every row). It agrees because of #663 and the earlier passes, not because anything holds it there.

**The sites that disagree.** A site is a line carrying a readiness claim for a component or family. A claim disagrees when it is an unqualified 🟢 or "Production" on something the generated file does not read as production-ready on every platform, or when it states a value (here, "Development") the file does not hold for that component. Counted by `grep` over `governance/`, then each hit read against the generated file:

| Doc | Sites that disagree | Where |
|---|---|---|
| `Component-Quick-Reference.md` | 11 | 9 family rows (Chips, Form Inputs, Checkboxes, Radio Buttons, Containers, Icons, Avatars, Badges, Progress Indicators) read 🟢 Production, L39–L47; the Type Primitives row for Container-Card-Base, L66; the "Family Count" line, L56, reads 8 Production Ready where its own table has 9 |
| `Component-Family-Form-Inputs.md` | 17 | family header L25; 8 component rows L80–L97; 8 `**Status**` lines L293–L812 |
| `Component-Family-Progress.md` | 13 | "🟡 Development", a third value: family header L22, 6 rows L67–L77, 6 `**Status**` lines. The file reads web `production-ready` for 4 of the 6 components (Node, Pagination, Stepper-Base, Stepper-Detailed) and `scaffold` for Connector and Label; "Development" is neither. Not the same error as the others, and the same three-docs-three-values symptom: this family reads 🟢 in the Quick Reference, 🟡 "web-ready, mobile-scaffold" in Readiness-Status and Inheritance-Structures, and 🟡 "Development" here |
| `Component-Family-Button.md` | 8 | header L24; rows L85–L88 (all four Buttons, including the two now `development`); `**Status**` lines L159, L266, L350. Button-CTA and Button-Icon are web-ready with scaffold native; the two VerticalList components are web-ready with `development` native whose native source does not compile (#660) |
| `Component-Family-Badge.md` | 7 | header L24; rows L63, L64, L70; `**Status**` lines L155, L204, L265 |
| `Component-Family-Chip.md` | 7 | header L24; rows L69, L75, L76; `**Status**` lines L124, L174, L223 |
| `Component-Family-Container.md` | 5 | header L24; rows L73, L79; `**Status**` lines L157, L277 |
| `Component-Family-Icon.md` | 3 | header L24; row L67; `**Status**` L151 |
| `Component-Family-Avatar.md` | 2 | header L24; row L65 |
| `Component-Family-Navigation.md` | 2 | rows L76 and L77 (Nav-SegmentedChoice-Base, Nav-TabBar-Base) read 🟢 Production; the family header, L24, reads 🟡 Beta and is not counted |
| `Component-Inheritance-Structures.md` | 2 | L116, `## 2. Buttons Family`, `**Status**: 🟢 Production Ready` (#663 corrected the member rows, L131–L134, and left this line); and the diagram's subgraph "Production Ready 🟢 (all platforms)", L745, which holds Button-VerticalList-Item and -Set |
| `Component-MCP-Document-Template.md` | 1 | L38 names "Form Inputs, Buttons, Containers, Icons" as families with production-ready components |
| `component-mcp-query-guide.md` | 2 | L54 and L86 show Badge-Count-Base as `"readiness": "production-ready"`, a string; the served value is the per-platform object, and its native platforms read `scaffold` |
| `Component-Readiness-Status.md` | 0 | the 34-row table agrees; the doc's own "Consistency Requirements" claim of automated validation is the unbacked sentence the Class line cites |
| **Total** | **80 sites in 13 docs** (67 of the unqualified-🟢 kind; 13 of the Progress third-value kind) | |

**Adjacent, counted separately and not in the 80:**

- **Schema examples.** `stemma-system-principles.md` (L591, L637, for Input-Text-Base and Input-Text-Email), `Component-Development-Standards.md`, `Component-Templates.md`, `Component-Schema-Format.md` (L124) and `component-metadata-schema-reference.md` show `readiness: production-ready` as a scalar on the schema. The shipped schemas declare per-platform `reviewed` flags (`readiness: { web: { reviewed: true }, … }`), and the status is derived. That is a defect in the format those docs teach, not in a readiness table; it belongs to the schema-format docs and is named here only so the sweep is not read as complete without it.
- **Component READMEs.** 16 files under `src/components/core/*/README.md` carry a 🟢 / "Production Ready" / "All Platforms Implemented" line (for example Button-VerticalList-Item and -Set, Button-CTA, Nav-TabBar-Base, Input-Checkbox-Base). Whether each is served I did not verify. They are the same class and my own files; they are not swept row by row here.
- **Unread.** `docs/figma-component-generation-exploration.md`, `docs/roadmap/north-star-design-system-ecosystem.md` and `docs/roadmap/archive/north-star-feedback.md` contain the phrase and I did not read them for component claims; they are exploratory documents, not served readiness tables. The release notes under `docs/releases/` are point-in-time and are not swept.

**Why it recurs.** Each family doc was authored when its components were: the 🟢 meant "implemented and reviewed on web" and was never a roll-up of three platforms. Component-Readiness-Status later defined 🟢 as all-platform and added the web-ready / mobile-scaffold roll-up (🟡), and the Inheritance-Structures summary was brought to it; the family docs and the Quick Reference were not. Nothing compares them, so each correction (#660, #663) fixes the rows its author happened to be looking at. #663 itself left L116 and the diagram in the file it was correcting.

## What the walk is owed

The 80 sites are, individually, false sentences in docs the MCP serves. Under M7 they are floor-class candidates at the next release's walk whatever this record's Class line says, to be fixed at the place the reader meets them, not disclosed. The fixing PR below is the act that makes the walk row `fixed`. If the release has to carry the record instead, the carry is a floor-class row to Peter.

## The class fix: two options, and a lean

The instance fix is hand-editing 80 sites to match the file. It repeats at the next readiness change, because the file moves with the next native review and the docs do not. The class fix removes the second source of truth or checks it.

**Option A — generate the tables from `packageReadiness.generated.ts`.** A script rewrites marked regions in each doc (the per-component rows and status lines), run in the same step that regenerates the file, so a regeneration cannot leave a doc stale.
- **Cost.** A generator and a marker convention in about 12 served docs; the family docs' tables are authored prose around rows, so each needs its rows lifted into a marked region; the docs are governance paths, so the change is a ballot-measure edit with Edit-kind lines, not a free edit; the per-family roll-up (what makes a family 🟡 or 🟢) is a judgment the file does not hold and needs a ruled rule before it can be generated.
- **Residual.** (1) The file is itself a scan of file presence and `reviewed` flags; if the scan is wrong (the archived `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` was that class), every doc copies the error faithfully and nothing disagrees. (2) The narrative status lines (`**Status**: 🟢 …` under each component, headers) are not table rows; generating them means removing them or templating prose. (3) Hand-written prose elsewhere ("Safe for production on all platforms") is untouched.

**Option B — a Jest guard that compares each doc's readiness claims to the generated file.** It reads the same governance docs, extracts each component or family claim, and fails when a claim names a status the file does not hold (and, for an unqualified 🟢 / "Production", when any native platform is not `production-ready`).
- **Cost.** A parser for five table and line shapes (family-header line, component row, `**Status**` line, count line, the diagram); a roll-up rule for family claims (the same ruling Option A needs); the guard is born red on the 80 sites, so the hand edit comes first or the guard lands with the fix; and it is a new named guard, so Thurgood's registration and cross-surface scope are involved.
- **Residual.** It catches the shapes it parses and misses a new phrasing, so it is a floor, not a proof; a reader who rewords "Production Ready" to "ready for production" passes. It keeps two sources of truth and makes disagreement loud instead of impossible. It does not help the READMEs unless it reads them too.

**My lean: A for the per-component rows, plus removal of the restatements that need no table, with B as a small backstop only for the family roll-up lines that A cannot generate.** The reason is the shape of the failure: three docs gave three values for one family, so the problem is that there are many places to say it. Fewer places beat a checker over many. Concretely: the family docs' per-component status columns and `**Status**` lines are generated or replaced by a pointer to Component-Readiness-Status § "Individual Component Status"; that table is generated from the file; the family-level headers keep a hand roll-up, guarded by B.

**The counter-argument, worked against my own lean, and what survives it.** Folded in: I first leaned on A alone; the counter-argument that generation cannot reach the headers, the count lines and the diagrams is right, which is why B remains as the backstop. What survives: (1) generating rows from a scan moves the trust from the docs to the scan, and the scan has been wrong before; a doc that was wrong in a visible way becomes wrong in an invisible one if the scan errs. A guard that compares a doc to the file has the same dependence, but it leaves two artifacts to disagree, which is a signal; generation leaves none. (2) Removing per-component status from the family docs costs locality: an agent that opens only `component-family-button` no longer reads the status on the same page, and I cannot show it will follow the pointer. (3) The roll-up rule is a ruling neither option makes, and both options depend on it; I do not know which side Peter or Ada would pick for a family with one `development` member. **The fork this exposes, which I do not pick**: generate-and-prune (A), or keep-and-check (B). It changes what is built and which docs are touched, so it is Peter's, with Thurgood's read on B before he rules.

## The interim rule

Until the fixing PR merges: **no hand-edited readiness claim in a doc without the generated value beside it.** A PR that adds or changes a 🟢, "Production" or "Production Ready" claim on a component or family in a served doc quotes, in its body, the component's three lines from `packageReadiness.generated.ts` at its base SHA, and the claim is stated per platform or as "web-ready, mobile-scaffold" where the file says so. An unqualified 🟢 on a component the file does not read production-ready on every platform is not added. This binds my own edits first.

## Done

- The 80 sites above read against the generated file at the fixing PR's base and each either corrected or removed (the adjacent schema examples and READMEs disposed or filed separately).
- Peter's pick between A and B on the record, with Thurgood's read on B quoted first.
- The family roll-up rule ruled and written once.
- Whichever guard or generator lands is registered where Thurgood's cross-surface check lives, and Component-Readiness-Status § "Consistency Requirements" names it, so the sentence about automated validation is true.
- This record closes under rule 5 with a dated outcome line in the fixing PR.
