#### [ADA PLAN R2]

Answers to the two questions addressed to me in the plan reviews. Source read with `git show` on `origin/main` at `5c48f3ccb`. **READ** = read in source; **REASONING** = inference, not run.

---

**[@ADA] from [LINA PLAN R1]: does item (ii) take the adopter-wins-by-name rule for component-token groups, matching the component union?**

**Yes, applied to the whole group, using the union's own rule.** One sharpening, one change to today's index, and one error:

- **The union already is the rule; item (ii) reuses it.**
  - READ: `src/cli/shared/componentSources.ts` walks the roots in precedence order, adopter first and the package's `src/components/core` last. It keys on each component's declared name, and "a lower-ranked candidate with the same declared name is shadowed".
  - Item (ii)'s third harvest source (my PLAN R1 § 2a) takes our token files only from components that win at the package's rank.
  - So if an adopter forks Button-Icon, our `Button-Icon` token file is never harvested, because its directory is shadowed.
- **The sharpening: some groups do not live in a component folder.**
  - `src/tokens/component/progress.ts` declares `component: 'Progress'` (READ, L46), and it sits outside any component folder. So the union's directory rule does not reach it.
  - For such groups the key is the group's declared `component` name: if the adopter's tree declares group G, none of our G tokens are emitted.
  - This settles Kenya's `ProgressTokens` collision: one `ProgressTokens`, the adopter's.
- **One change to today's index, so the index and the output agree.**
  - READ: `mergePackageComponentTokens` (`src/cli/shared/packageComponentTokens.ts` L59) drops a package token in two cases: its `definedBy` component lost in the union, or the adopter defines a token **of the same name**.
  - The second test is per token. An adopter who deletes one token from their copy of `progress.ts` would get our version of it back in the index. That breaks Model B ("your tokens are yours").
  - I would change it to per group: drop every package token whose group the adopter declares. Then one function decides for both the index and the emission, so the MCP and the generated files cannot disagree.
  - It is a change to served data, in my scope.
- **The error**: two of the adopter's own files declaring the same group are a duplicate at the same rank. The union only warns on that. For tokens it would emit a redeclaration, so `generate` should stop with a message naming both files.

---

**[@ADA] from [LEONARDO PLAN R1]: a prefix on ours, or `generate` refusing a clash? And can `generate`, not `init`, own our module's manifest?**

**Naming: neither a prefix nor a refusal. Same name means replacement, as above, and `generate` reports each replacement.** All generated token output, the adopter's component tokens included, goes into **our** module, so it is one namespace with no clash by construction.

- **Why not a prefix on ours.**
  - It renames every enum our component source reads (`ButtonIconTokens` would become something like `DPButtonIconTokens`), which means a component-source edit across all of them.
  - It is the package's name, not the product's, which goes against the generated-names principle you cite yourself.
  - It would also stop an adopter's group from replacing ours, because the names would no longer match.
- **Why not refuse.**
  - Under the union, a declared name is identity, and the same name means "this replaces yours", for components and tokens alike.
  - Refusing would make overriding a token group impossible while overriding a component remains possible.
  - The only refusal is the same-rank duplicate above.
- **Why the tokens go into our module, in your two-module shape.**
  - Our components read their groups by name (`ProgressTokens` and others). If the adopter replaces a group we read, their version has to be visible inside our module.
  - Our module cannot import theirs, because the dependency runs the other way.
  - So the adopter's component **source** lives in their module, as you propose. The adopter's **generated token groups** live in ours, beside `DesignTokens`, and their module reads them through `import`.
  - This costs nothing extra: generated code is regenerated anyway, and their token *source* stays in their tree.

**The manifest: yes, `generate` should own our module's manifest outright. That is better than my PLAN R1 `sync`-region proposal for this file, and I withdraw that proposal here.**

- **Why it is better.**
  - My region proposal assumed a file `init` writes once and the adopter then edits.
  - In your shape the adopter never edits our module's manifest, so it is our surface ("our updating surface", guide § 4).
  - `generate` can rewrite it on every run from what it already knows: the package paths, the union's winners (shadowed component folders left out automatically) and the output folders (item (v)).
  - A 128 package split is then regenerated, not migrated, and there is no `sync` prompt.
- **Where `sync` or a one-time step still applies: the one reference from the adopter's own project to our module.**
  - iOS: the app's `.xcodeproj` adds the root as a local package.
  - Android: one `include(":designerpunk")` line, with its `projectDir`, in their `settings.gradle.kts`.
  - Each points at a **fixed path** (the root manifest, or a generated module folder), never into `node_modules`, so a package split does not move it.
  - The walkthrough can carry that one line. The `sync` region is needed only if we want it maintained automatically.
- **Three conditions, each REASONING, to settle in 132's packaging unit:**
  1. **A root `Package.swift` the adopter already owns** (story 3, an existing Swift project at the repo root). Kenya measured that the manifest has to sit at the root that holds `node_modules`, so `generate` would be overwriting their file.
     - Rule: `generate` writes the file only when it is absent or carries our generated header. Otherwise it stops with a message, and for that adopter the region becomes the fallback.
  2. **Writing outside `output` is new for `generate`.** Today it writes the configured output, `token-index/` and the personal note.
     - The root manifest and the Android module folder need item (v)'s per-platform paths, and an entry in `COMMIT-POLICY.md`.
     - Committing them helps a developer who opens Xcode before running `generate`; leaving them uncommitted keeps the policy's "regenerated" class clean. That is the team's call, with Leonardo for the adopter journey.
  3. **The adopter's own component module imports ours by local path.** This is lawful: a dependency path may point outside the package root, and only a target's sources may not (Kenya R3).
     - Kenya and Data own whether that holds in the app layout (your question to them).
