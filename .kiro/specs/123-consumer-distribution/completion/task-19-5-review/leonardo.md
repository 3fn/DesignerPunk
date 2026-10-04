# 19.5 — Leonardo's whole-document review (Spec 123 Task 19)

**Read at**: `task/123-u3-onboarding` `b8987db1c`, read-only (clean tree before and after). **Date**: 2026-10-03.

**Read, in order**:
- `docs/consumer/INSTALL.md` once per path: founder, joining, joining-cross-harness, reference-no-init.
- The guide's `## Reference` (`governance/DesignerPunk-Integration-Guide.md` L253–951).
- README § "Getting Started" and its diff against `origin/main`.
- `docs/consumer/COMMIT-POLICY.md`.
- What `init` prints, in order: `src/cli/init.ts` L256–413; `errorCatalog.ts` `initNextStepsMessage` L485–511, the clone hatch, the naming row, the restart row.
- The personal-note rows (`errorCatalog.ts` L94–132, L395–436).
- The placed template and the `product/` scaffold under `src/cli/templates/`.
- The starter specs.

**Plan list, checked rather than trusted**: all present.
- Region markers: 2 in the guide.
- Remainder table: `task-19-4-completion.md` L51.
- Widened grep: L100.
- Preservation (#268): `task-19-4-completion.md` L112 and the B-U3 ballot § 5.
- Kenya's and Data's confirmations: `completion/task-19-4-owner-review/{kenya,data}.md`.
- `example-home.yaml` placed: byte-equal to `design-inputs/` (`cmp`; the template, the overview and `home-layout.yaml` too).

**Tests (my runs)**: `npm run test:scripts` 397/397; `personalNote.test.ts` 51/51. I did not re-run the full `npm test` (the orchestrator's 9544/9544 is cited, not mine).

**Path steps**: founder 5, joining 5, cross-harness 6, reference 3. Each numbered list matches `path-steps` (INSTALL L2; lists at L40–42, L57–61, L202–206, L212–217). The README list has 5, in C23 order.

---

## Verdict

**CONFIRMED-WITH-CORRECTIONS.**
- **Fold now**: items 1, 2, 6, 7, 8, 9 and 10. Each has exact text below.
- **Conditional on Peter's #300 fix decision**: items 3, 4 and 5. If he fixes the defect, the item closes. If not, the text below lands before the tag.
- **No NOT-CONFIRMED item.** The region teaches the four paths without contradicting itself, and the scope sentence is kept everywhere I read.

**Counts**: CORRECTION 5 (items 1, 6, 8, 9, 10) · CONTRADICTION 2 (items 2, 3) · MISLEADING-SILENCE 3 (items 4, 5, 7) · polish-for-charter: 8 lines, listed separately at the end.

## README reading (Thurgood's strict "only"): CONFIRMED

My R2 text (L-A4, `tasks.md` L1046) was meant to stop the README from becoming a second install doc: no platform cause sentences, no second command list. Thurgood read it that way, and I confirm what he removed:
- **The `sync` and `attach` command lines**: they duplicate the lifecycle that INSTALL § 4 and "Adding a second harness" teach, with their reasons.
- **"sync never touches your tokens"**: taught at INSTALL § 4.
- **The 14.x pointer**: one click away, at INSTALL L99.
- **The old guide link**: INSTALL L142 points into the guide's reference.

**The one real loss**: "Not comfortable with terminal commands? Ask your AI agent to follow these steps." It is designer-facing and true. Step 4 already offers the walkthrough, so the loss is polish, not a correction; it is listed for the charter (P1).

---

## Items

### 1. Demoting the old sections under `## Reference` broke heading lookups for every section now at H4 or H5 — CORRECTION

- **Where**:
  - The guide's `####` headings at L286 (Token Source Configuration), L306 (Themes), L508–754 (the seven Product MCP sections), L838–877 (the three MCP query tables), L915–945 (four Upgrading sections), L429–477 (four test sections), and L328/L340.
  - The `#####` headings at L651–709.
- **What is wrong**:
  - The docs MCP indexes only H2 and H3 (`mcp-server/src/indexer/section-parser.ts:86`, "Only H2/H3 are parsed"; `:96`, `/^(#{2,3})\s+(.+)$/`).
  - The demotion moved 20 sections that were addressable H3 before the sweep (at `dc80b1fae`: L768–1024, L1101–1134, L1176–1202, L622–716) to H4.
  - Measured on a local rebuild (this checkout, not `main`):
    - `get_section("designerpunk-integration-guide", "Platform Branching in UI Trees")` → `SectionNotFound`.
    - `"Themes"` → `SectionNotFound`.
    - `"Product MCP Setup"` → `SectionNotFound`.
    - The `suggestions` list only the 13 H2 headings. INSTALL L49 tells the agent to retry from those suggestions, which leads to `"Reference"`, an 8,906-token section.
  - The guide's own cross-references name H4 sections that cannot be looked up: L282 (`see "Product Tokens"`, `see "Themes"`) and L395 (`see "Themes"`).
  - **Answers my 19.4 unverified item**: the demotion breaks lookups; no route breaks. Only my charter routes to this doc, and it does so with no section. But every agent that follows a cross-reference, or works the doc section by section, pays the cost.
- **Summary-first route**: intact. `get_document_summary` lists Prerequisites, 1–9 with § Platforms › Web/iOS/Android, then Reference with its 13 H3 subsections. A reader lands on the install steps first.
- **Fix** (keeps ONE `## Reference`; B-U3/19.4's shape holds). Promote one level:
  - L286 `#### Token Source Configuration` → `### Token Source Configuration`
  - L306 `#### Themes` → `### Themes`
  - L508–754: under `### Specifying screens (Product MCP)`, delete the L508 heading `#### Starting the Product MCP` so its text sits directly under the H3. Then every other `####` there becomes `###`, and every `#####` becomes `####`.
  - L838, L864, L877 (the three MCP tables) `####` → `###`
  - L915, L925, L933, L945 (Upgrading's four) `####` → `###`
  - Leave L328, L340 and L429–477 as `####`: nothing names them, and their parents are H3.
- **Cost**: Reference's outline grows from 13 to about 26 H3 entries. The summary stays about 300 tokens.
- **Owner**: Thurgood (structure). My Product MCP sections move with no text change.

### 2. `init`'s next steps contradict the founder path: two install commands the install doc never mentions — CONTRADICTION

- **Where**: `src/cli/shared/errorCatalog.ts:486-488` (`initNextStepsMessage`); design row "`init` — next steps" (`design.md:998`).
- **What is wrong**:
  - INSTALL § 3 (L57–61) says that after `init` comes `generate`.
  - `init` prints `1. npm install` and then `2. npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @types/node` before `generate`. The second line is printed whenever `jest.config.js` was written, which is every fresh `init` (`init.ts` Step 9).
  - `init` changes no dependency: it never writes the consumer's `package.json`; it only reads the package's (`init.ts:585`). So step 1 is a no-op for a founder who just ran INSTALL step 1.
  - Step 2 is optional: it is only for testing your own components (guide Reference, "Running Component Tests").
  - A designer reading the terminal sees 2 required-looking steps the doc never mentions, and the founder's 5 becomes 7.
- **Fix** (string; the design row follows):
  - Drop the `npm install` step.
  - Move the jest line out of the numbered list, as one line after it: `Optional, to test your own components: npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @types/node`
  - The numbered list then begins at `npx designerpunk generate`, which matches INSTALL step 3.
- **Owner**: Lina (string, and its test in `init.test.ts`). Thurgood (design row 998 by erratum).
- **Check with Lina first**: whether `npm install` was meant for a case I don't see (for example `init` run through `npx` without step 1). If it was, keep it and name that case. Don't keep it bare.

### 3. The jest collision string promises `@3fn/core/testing`, which the guide says does not work — CONTRADICTION (#300 item 1; conditional)

- **Where**: `src/cli/shared/errorCatalog.ts:140-144` (`jestConfigCollisionMessage`): "…to test your own forked components with @3fn/core/testing, add ...require('@3fn/core/jest-preset')…"
- **Contradicts**: the guide's Reference, "Shared Test Utilities" (guide L473–475): "In this version they do not work under the preset in an installed package." That is criterion C3 ("collision strings are truthful") failing on a string that ships.
- **Truthfulness check for #300 item 1**: the guide is truthful; INSTALL is silent, which is acceptable because testing is not on any path. This CLI string is the one untruthful surface.
- **Fix, if Peter does not fix the preset in U3**:
  `skipped: jest.config.js (already exists) — the DesignerPunk jest preset is not applied; to test your own components with it, add ...require('@3fn/core/jest-preset') to your config (in this version @3fn/core/testing does not load under the preset; see the Integration Guide's "Running Component Tests")`
- **Owner**: Lina (string). Thurgood (design catalog row, C27/A13).

### 4. `generate` prints ✅ and exits 0 after an override-validation abort; the guide does not say so — MISLEADING-SILENCE (#300 item 3; conditional)

- **Where**: guide L303 (Token Source Configuration rules): "If one is missing, `generate` reports an "Orphaned override key" and writes no token files."
- **What is wrong** (the sentence is true, but stops short):
  - `generateTokenFiles` returns `EMPTY_MODE_RESOLVED` without throwing (`src/generators/generateTokenFiles.ts:132,161`).
  - So `runGenerate` then prints `✅ System tokens generated` (`src/cli/designerpunk.ts:293`) and does not exit 1 (`:319-325`).
  - A designer, or an agent reading the exit code, takes the run as a success.
- **Truthfulness check for #300 item 3**: INSTALL is silent; this one sentence is half-true.
- **Fix, if not fixed in code**: append to L303:
  ` In this version `generate` still prints "✅ System tokens generated" and exits 0 after that report (a known defect): read the lines above it.`
- **Owner**: Ada (Token Source Configuration).

### 5. The committed-output default does not say every `generate` rewrites a timestamp in every file — MISLEADING-SILENCE (#300 item 2; conditional)

- **Where**: `docs/consumer/COMMIT-POLICY.md` § "Platform output is committed by default" (L35–39); INSTALL § 8 L228.
- **What is wrong**:
  - Every platform file carries a wall-clock `Generated:` line (`src/generators/TokenFileGenerator.ts:301-307, 376-382, 455-461`), plus DTCG `generatedAt` (`DTCGFormatGenerator.ts:238`) and the product-token emitters.
  - So under the committed-by-default policy, every `generate` shows every output file as changed, even with no token change.
  - The CI-needs spec's N1 handles this (`starter-specs/ci-needs/needs.md:24`, "Ignore the timestamp lines…"). The commit policy, which sets the default, does not, and a designer's first `git status` after `generate` is all red.
- **Truthfulness check for #300 item 2**: INSTALL § 8 stays true (its check comes from N1, which ignores the stamps). COMMIT-POLICY is silent.
- **Fix, if not fixed in code**: append to COMMIT-POLICY § "Platform output is committed by default", after its first paragraph:
  `In this version every `generate` run rewrites a timestamp line in each generated file, so committed output shows as changed after every run even when no token changed (a known defect). Compare with the timestamp lines ignored, as the CI-needs spec's N1 check does.`
- **Owner**: Lina (COMMIT-POLICY, 20.1).

### 6. "Starting the MCP servers by hand" still calls an empty `product/` the new-project case — CORRECTION

- **Where**: guide L320: "The Product MCP starts with empty data if no `product/` directory exists yet; that is expected for a new project…"
- **What is wrong**: since 22.3, `init` scaffolds `product/`, with the overview, `home-layout` and `example-home` (`src/cli/init.ts:256-263`). A new project's Product MCP is not empty, and `find_screens` returns `example-home`.
- **Fix**: replace that sentence with:
  `The Product MCP starts with an empty index where no `product/` directory exists; a repo `init` created has one, with an example screen (see "Specifying screens (Product MCP)" below).`
- **Owner**: Lina (this section was hers at 19.4).

### 7. "Product Data Directory" does not say what `init` actually put there — MISLEADING-SILENCE

- **Where**: guide L521–552.
- **What is wrong**: the tree shows an illustrative product (legislation, dashboard). A reader, or an agent, never learns that `init` scaffolded three real files. The tree also shows pages as directories (`pages/dashboard/dashboard.yaml`), while the scaffold uses the file form (`pages/example-home.yaml`). Both are indexed (`product-mcp-server/src/indexer/ProductIndexer.ts:257-263`).
- **Fix**: insert after the L521 heading, before the tree:
  `` `init` scaffolds three of these: `overview.yaml` (fill in its `TODO`s), `templates/home-layout.yaml`, and `experience-map/pages/example-home.yaml`, a worked example screen to read, keep or delete. The tree below shows a fuller product. A screen can be a single file (`pages/<name>.yaml`) or a directory of facet files (`pages/<name>/<name>.yaml`). ``
- **Owner**: Leonardo (mine; Thurgood folds).

### 8. The UI-tree convention does not mention text content, which `example-home.yaml` uses — CORRECTION

- **Where**: guide L651–678 (Node Structure). The example's explanation node carries `content: {heading, body}` (`src/cli/templates/product/experience-map/pages/example-home.yaml`, the `Container-Base` with no props).
- **Why the key exists**: the system's empty-state pattern says that text "is not a DesignerPunk component — rendered as text content" (Application MCP `get_experience_pattern "empty-state"`). The indexer ignores the key (`ProductIndexer.ts:332-366`), so the scaffold indexes clean (`example-home.record.md`).
- **Fix** (two insertions):
  - In the Node Structure YAML block, after the `repeat:` line (guide L665):
    `  content:                        # Optional. Text the screen shows that no component carries (a heading, body copy). NOT indexed.`
    `    heading: "Section Title"`
  - In the table, after L674:
    `| `content` | object (string values) | No | Not indexed |`
- **Owner**: Leonardo (mine).

### 9. One document, two names: the CLI says "install doc", the docs say "install guide" — CORRECTION (Req 15B.5: vocabulary consistent across the install doc, terminal output and starter specs)

- **Where**:
  - CLI: `src/cli/sync/NameContract.ts:69` ("See: install doc § "When sync reports a missing token""), reproduced verbatim at INSTALL L175; and `errorCatalog.ts:199` (markers missing, agent-layer form: "see install doc § "Your agent layer""; the `.gitignore` form at L189–195 already carries the remedy from my `catalog-wording.md` § 6).
  - Docs: INSTALL's H1 "DesignerPunk install guide" (L5), README's asserted label "Install guide" (L139), COMMIT-POLICY L56, `ci-needs/needs.md:47`.
- **Fix**: the two CLI strings say `install guide` (`See: install guide § "…"`, `see install guide § "Your agent layer"`), and INSTALL L175 follows on re-derive.
  - The markers-missing string is already open with Peter, so this rides with it.
- **Owner**: Lina (strings and their tests). Thurgood (catalog rows by erratum).

### 10. INSTALL's pointer to the guide gives a path that only exists inside the package — CORRECTION (low)

- **Where**: INSTALL L142 (guide L156): "…the Integration Guide (`governance/DesignerPunk-Integration-Guide.md`)."
- **What is wrong**: a consumer reads INSTALL from `node_modules/@3fn/core/docs/consumer/` once 22.3b ships it, so the bare path resolves to nothing in their repo. COMMIT-POLICY L56 already uses the right form ("… in the `@3fn/core` package").
- **Fix**: `…the Integration Guide (`governance/DesignerPunk-Integration-Guide.md` in the `@3fn/core` package; your agent reads it as `designerpunk-integration-guide`).`
- **Owner**: Thurgood (region).

---

## Known open items: are the docs honest about them as shipped today?

- **The edited example of Peter's note (dangling pointer)**: the template (`src/cli/templates/personal-note.template.md:18`) states the example exists. **Release condition, not a new item**: if the example and its approval have not landed by 22.3b, the pointer line must come out of the template before the tag. Owner: Leonardo, in the same placement-and-equality cycle.
- **#300 item 4, `validate` red on unmodified source**: truthful on every surface — INSTALL L78, the guide's "Generating tokens — options", and `init`'s customize note (`errorCatalog.ts:505-508`). No item.
- **#300 items 1–3**: items 3, 5 and 4 above, conditional on Peter's decision.
- **`docs/consumer/**` is not in `files[]` yet** (`package.json`, by grep: no `docs/consumer` line). 22.3b is Ada's. Until it lands, three references point to an unshipped file: COMMIT-POLICY's "in the `@3fn/core` package", the CLI's install-doc pointer, and the template's pointer. **Release condition**: 22.3b before the tag.
- **The build-claim wording and the markers-missing remedy**: open with Peter, not re-raised. Item 9 rides with the remedy.

## Not verified

- **The post-merge docs-MCP rebuild on `main`**: still owed. My rebuild indexed this checkout (83 docs, 2,833 sections).
- **Item 2's intent behind `npm install`**: I found no write to the consumer's `package.json`, but I did not run `init` end to end.
- **CC actually loading the note** (as opposed to the import being emitted, which is verified at `tools/agent-generator/consumer-entry.ts:405-408`): stays U5.
- **The full `npm test`**: not re-run by me.

---

## Polish for the rewrite charter (input to `.kiro/issues/2026-10-03-integration-guide-designer-friendly-rewrite-charter.md`; NOT 19.5 items)

- **P1**: README lost "Not comfortable with terminal commands? Ask your AI agent to follow these steps." Restore it as the walkthrough's front door when the rewrite lands.
- **P2**: README steps 2–3 read with two em dashes each ("`init` … — `init` is the birth event — runs once…"). Reword when the vocabulary forms allow.
- **P3**: INSTALL § 3 never says what `init` leaves in the repo (`product/` with an example screen, `specs/`, the `.gitignore` block, test configs, the note). This is the first walkthrough candidate: "see what `init` made".
- **P4**: `init` says `Your product "<name>" is ready`, while the doc says "design system". Fix the vocabulary in the rewrite.
- **P5**: COMMIT-POLICY L32 starts a sentence with lowercase "it" ("…token queries. it is derived…").
- **P6**: the Product Data Directory tree's illustrative domain (legislation) and the Writing Screen Specs example (dashboard): replace them with the scaffold's `example-home` once the rewrite has walkthroughs.
- **P7**: three names for two documents (install guide / install doc / Integration Guide). The rewrite should pick one name per document and say it once.
- **P8**: the `init` tip "run `npx designerpunk sync` to apply updates" undersells `sync`'s report-first behaviour (INSTALL L92). It is not contradictory, so it is polish.
