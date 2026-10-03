# Task 19.3 Completion — the ten owed-AC rows, with quoted passages

**Date**: 2026-10-03
**Agent**: Thurgood (Opus) · PRIMARY, Task 19
**Branch**: `task/123-u3-onboarding`, after 19.4 (`f45ccce7e`)
**Order** (C19): written after 20.1's `docs/consumer/COMMIT-POLICY.md` exists (Lina: `96628612d`, then `7e838ed10`), and after the 19.4 owner reviews, so every quoted passage is the **reviewed** text.

## What changed

- This document is the record. It holds Task 19 criterion 3's table: one row per owed AC, with the install-doc passage quoted as Evidence.
- **Rows: 10**, which is the count criterion 3 asserts: 15.3 · 15.4 · 15.5 · 15.6 · 15.7 · 15.8 · 15.9 · 15B.4 · 15B.6 · 15B.8.
  - **Count check**: the ten headings below are `### Row 1` to `### Row 10` (`grep -c '^### Row'` = 10). Their ACs equal criterion 3's list in order.
- **Class guard** (Peter's ruling of 2026-10-03, `tasks.md` Task 19 C11): every behaviour, path or count claim in a quoted passage cites `file:line` or a ratified record under "Claim sources". Guidance with no behaviour claim says `none`.
- **No guide text changed in 19.3.** The single-string residuals 15.5, 15.6 and 15.7 are also asserted in `scripts/__tests__/install-doc.test.ts` (19.2).

## The table

### Row 1 — Req 15.3

**Owed**: a reference-corpus section, the CONSUME posture: what is worked execution and what is transferable intent, and a documented NO-INIT path (`npm install`, wire the docs MCP at `node_modules/@3fn/core/governance`, do not run `init`).

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L50–58, L61. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> ## 2. CONSUME — the reference corpus, no init
>
> Use this posture when you want DesignerPunk's docs and components as a reference, or as a library, without a design system of your own. **Do not run `init`.**
>
> 1. `npm install @3fn/core`
> 2. `npx designerpunk attach --target=<cc|kiro> --reference`
> 3. Restart your agent session (approve DesignerPunk's MCP servers if asked).
>
> `attach` will attach a harness (agents + MCP config + approvals), for one target. With `--reference`, it writes only the MCP config and the approvals, and no agents. The docs server reads `node_modules/@3fn/core/governance`.
> - **Reference use is a sanctioned mode.** Using DesignerPunk's docs as a reference for a system that is not DesignerPunk is a supported use, not a misuse. Separate DesignerPunk's worked execution (its exact tokens, components and process) from the transferable intent (why it is built that way), and say which one you are carrying over.

**Claim sources (class guard)**: `--reference` writes only the docs and application servers and no agents: `src/cli/attach.ts:345` (`REFERENCE_SERVERS`), 344–353. The docs server reads the package `governance`: `src/cli/templates/mcp-config.json.template:9` (`MCP_STEERING_DIR`).

**Note**: The "wire the docs MCP" step is `attach --reference`, which writes that config, not a hand-written one.

### Row 2 — Req 15.4

**Owed**: reference use is a sanctioned mode.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L61. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> - **Reference use is a sanctioned mode.** Using DesignerPunk's docs as a reference for a system that is not DesignerPunk is a supported use, not a misuse. Separate DesignerPunk's worked execution (its exact tokens, components and process) from the transferable intent (why it is built that way), and say which one you are carrying over.

**Claim sources (class guard)**: none (guidance to the agent, no behaviour claim)

### Row 3 — Req 15.5

**Owed**: citation fidelity: quoted text and dates are claims requiring re-verification.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L62. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> - **Quoted text and dates are claims requiring re-verification.** A passage you quote, or a date you cite, may be stale or misattributed. Check it against the doc before relying on it.

**Claim sources (class guard)**: none (guidance); asserted string, `install-doc.test.ts` ("15.5 — citation fidelity")

### Row 4 — Req 15.6

**Owed**: retry on `SectionNotFound` using the server's `suggestions` field.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L63. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> - **When a heading lookup fails** with `SectionNotFound`, retry using the `suggestions` field the server returns in the error. Don't guess a heading.

**Claim sources (class guard)**: `suggestions` in the error payload: the docs MCP's `SectionNotFound` response (this session's `get_section` call returned `"error": "SectionNotFound"` with a `suggestions` array); asserted strings in `install-doc.test.ts` ("15.6")

### Row 5 — Req 15.7

**Owed**: `lastReviewed` conflicts: defer to the more recently reviewed doc.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L64. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> - **When two docs disagree, defer to the more recently reviewed one**: compare their `Last Reviewed` dates.

**Claim sources (class guard)**: none (guidance); asserted string in `install-doc.test.ts` ("15.7")

### Row 6 — Req 15.8

**Owed**: the session-restart line, in BOTH the install doc and the CLI terminal output.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L75, L83. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> 5. Restart your agent session (approve DesignerPunk's MCP servers if asked).
> **Step 5, the restart, and why.** Your agent tool loads its MCP configuration when a session starts. The session that ran `init` cannot see the servers `init` just configured, so its first queries would fail. **This is a rule, not a one-off**: any later change to the MCP configuration, such as adding a server or updating the package, also needs a new session. Some tools ask you once to approve project-declared MCP servers; approve DesignerPunk's.

**Claim sources (class guard)**: CLI half: `restartLineSequencedMessage()` (`src/cli/shared/errorCatalog.ts:110-116`), printed by `init` (`src/cli/init.ts:367`) and by `attach` (`src/cli/attach.ts:468`). `attach --reference` prints `restartLineNowMessage()` (`attach.ts:488`).

**Note**: The "why" (15B.9) is in L83. That the harness loads its MCP config at session start is a harness fact, not a DesignerPunk code fact; it stands as Req 15.8's premise (Leonardo A6), not as a cited line.

### Row 7 — Req 15.9

**Owed**: the clone-hatch paragraph, re-anchored to Model B (the clone gets the engine and the components; `init` already made the language yours), with the per-component answer first (Req 2.5); also named in `init`'s terminal output.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L250, L252. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> **To own one component**, put your version in your repo's `src/components/`, declaring the component's name (the `component:` field of its `contracts.yaml`). Yours wins on its name, and every other component continues to come from the package.
> **To own the engine too**, clone `github.com/3fn/DesignerPunk`. `init` already made the token language yours; the clone adds the engine and the components.

**Claim sources (class guard)**: Per-component precedence keys on the declared name: `application-mcp-server/src/indexer/ComponentIndexer.ts:178-181`. CLI half: `cloneHatchMessage()` (`src/cli/shared/errorCatalog.ts:119-124`), printed by `init` (`src/cli/init.ts:363`). Clause equality is asserted in `install-doc.test.ts` ("§ 9 carries the clone hatch's clause").

**Note**: L252 contains no "to really own it" framing.

### Row 8 — Req 15B.4

**Owed**: explains Req 5A's name-contract message: what it means, and why it is a report rather than a change.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L184–194. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> ## 5. When sync reports a missing token
>
> After an update, `sync` may print a line like this:
>
> ```
> components now expect token '<name>' — <what it is for> (used by <components>). Add it to your set in <your token source>. Your tokens are yours; DesignerPunk never adds to them. DesignerPunk's value, for reference: <value> ('<token>' in DesignerPunk's language). See: install doc § "When sync reports a missing token".
> ```
>
> It means an updated component references a token name that your token set does not define. DesignerPunk's own value for that token is shown for reference only. **It is a report, not a change.** `sync` cannot add the token for you, because your tokens are your language: adding to them is your decision. Add the token to your set, choosing its value, and then run `npx designerpunk generate`.
>
> This is the one place where the two postures meet after birth: our updating surface asks something of your language, and the answer is yours.

**Claim sources (class guard)**: The message text is `missingTokenMessage` (`src/cli/sync/NameContract.ts:57-70`), quoted byte-equal (asserted by `install-doc.test.ts`). `sync` never writes the token source: `src/cli/sync/index.ts:4-9`.

### Row 9 — Req 15B.6

**Owed**: the update lifecycle: `npm update` refreshes components and never tokens; `sync` after it reports; `generate` after you change your own tokens; three verbs, one sentence each, and the asymmetry named as intended.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L104–109. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> **The update lifecycle: three verbs, one sentence each.**
> - **`npm update @3fn/core`** refreshes DesignerPunk's updating surface, the components, and never your language, the tokens.
> - **`npx designerpunk sync`** comes after it: it reports package updates against the installed package — reports, never writes silently. It prints its report before changing anything, and changes DesignerPunk's MCP configuration and generated agent files only on your go.
> - **`npx designerpunk generate`** comes after you change your own tokens.
>
> **The asymmetry is intended.** After an update, a component may look different while your colours do not, because the components are ours to improve and the tokens are yours to change. The exception above still applies: the dark and WCAG override values come from the installed package, so the next `generate` after an update can change them. If an updated component needs a token your set does not have, `sync` tells you (section 5).

**Claim sources (class guard)**: Tokens are copied into the consumer's repo at birth: `src/cli/init.ts:193-202`. `sync` reports before writing: `src/cli/sync/index.ts:511-530`. The override exception: `src/generators/generateTokenFiles.ts:19-21` (Ada). The verb descriptions are `vocabulary.ts`'s `LIFECYCLE_VERBS` (asserted).

**Note**: L106 uses `vocabulary.ts`'s "reports, never writes silently". Req 15B.6's "never writes" is narrower; the vocabulary form governs (15B.5), and L106 says what `sync` changes on your go.

### Row 10 — Req 15B.8

**Owed**: the agent layer's posture: regenerated inside a self-labelled managed region, extensible outside it.

**Evidence**: the install doc's passage, `governance/DesignerPunk-Integration-Guide.md` L198. The derived `docs/consumer/INSTALL.md` carries the same text, under the identity test.

> The agent files that `init` and `attach` generate are regenerated inside a self-labelled managed region, and are yours to extend outside it. Write your own additions outside the region's markers: `sync` refreshes what is inside them and leaves the rest alone.

**Claim sources (class guard)**: Managed-region markers: `src/cli/sync/RegionGrain.ts:58-69` (`regionMarkers`); `attach` writes the region: `src/cli/attach.ts:275-280` (per `owner-review/lina.md`).

## The joining path agrees with `COMMIT-POLICY.md` (C19's reason for the order)

Region § 7 (L210–234) was read against `docs/consumer/COMMIT-POLICY.md` at `7e838ed10`:
- **`init` is never the join mechanism**: the region says so at L212, and COMMIT-POLICY's last section says the same. Agree.
- **The note is not inherited**:
  - region (L222): "Your note is your own. You never inherit the founder's: it stays on each person's machine";
  - COMMIT-POLICY, `.designerpunk/` row: "a joiner never inherits yours … `generate` creates it when it is absent".
  - Agree. Both are DESIGN-ONLY until 22.1; see the 19.4 doc § "Held and open items".
- **The cross-harness step**:
  - region: "If you use a different agent tool than the founder, or the agent layer is not committed, add one step after step 3: … `npx designerpunk attach --target=<cc|kiro>`";
  - COMMIT-POLICY: committed agent artifacts mean "a teammate on the same agent tool needs no extra step; a teammate on a different tool runs `npx designerpunk attach --target=<cc|kiro>` once".
  - Agree. The region also covers the "not committed" case (Req 15A.1).
- **The lockfile**:
  - region § 4 L111: "Commit your lockfile, so that a teammate installs the version you built against";
  - COMMIT-POLICY: "commit the lockfile, so a teammate installs the version you built against".
  - Agree.
- **The pointer**: COMMIT-POLICY sends the reader to "7. Joining an existing design system" in `docs/consumer/INSTALL.md`. That heading exists verbatim (region L210, and INSTALL.md by derivation). It is stable.
- **Pointer from region § 7 back to COMMIT-POLICY** (L233: "set by the commit policy (`docs/consumer/COMMIT-POLICY.md`)"): the file exists.

No disagreement was found. The region needs no change for 20.1.

## Targeted tests + result

- `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts`: 54/54. These include the 15.5, 15.6 and 15.7 string assertions, the clone-hatch clause, the name-contract message and the vocabulary forms that rows 5–9 cite.
- Nothing else was run: 19.3 changes no code or guide text.

## Application-time adaptations

1. **Rows 6 and 7 cite the CLI half by source line, not by a run.** Req 15.8 and 15.9 require the line "in both" surfaces. The CLI half is cited at the `errorCatalog.ts` function and at the `init` and `attach` print sites. The install-doc half is quoted.
2. **Row 1's NO-INIT "wire the docs MCP" step** is `attach --reference`, which writes the config. It is not a hand-written config. The Req says "wire the docs MCP at `node_modules/@3fn/core/governance`", and the template's `MCP_STEERING_DIR` is that path.
3. **Row 9 uses the vocabulary form of `sync`**: "reports, never writes silently". Req 15B.6 says "never writes". The vocabulary governs (Req 15B.5), and the passage states what `sync` changes on your go.
