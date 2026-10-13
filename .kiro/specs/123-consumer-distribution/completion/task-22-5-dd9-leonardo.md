# 22.5 — Leonardo's DD9 confirmation (Spec 123 U3)

**Read at**: `origin/task/123-u3-onboarding` `d637c7b5f`, read-only (every file read with `git show`; no branch switched, no worktree touched). **Date**: 2026-10-13.

## Verdict: DD9 CONFIRMED

**My words, for the criterion's quote:**
> "DD9 is confirmed, not flipped. Bare `init` sets up Claude Code and says so first, in one line that also hands a Kiro user the one command that corrects the guess. The install path never relies on the default, because every doc spells `--target=<cc|kiro>`. So the default costs a wrong guesser one command, and costs a reader of the docs nothing. The residual stands as DD9 wrote it: nothing shows `cc` is the persona's majority harness. The notice is what makes that acceptable, and U5's persona (c) running bare `init` in Kiro is where it gets tested."

**What DD9 asks** (`design.md:1091`, with `:153` and the tasks row L397): bare `init` emits `cc`, with the named-default notice. U3 confirms it. Criterion C5 (`tasks.md` Task 22): "DD9 confirmed or flipped by Leonardo, his words quoted. The notice string matches the catalog, and the founder count is unchanged."

| Claim | Evidence (`file:line` at `d637c7b5f`) | Status |
|---|---|---|
| Bare `init` emits `cc` | `canonical/consumer-profile.yaml:8-9` (`targets: [cc, kiro]`, `defaultTarget: cc`); `init` resolves the target from the packaged profile (`src/cli/init.ts:180-185`) | VERIFIED (read) |
| The notice prints FIRST, only on bare `init` (not with `--target`, not under `--skip-agents`) | `src/cli/init.ts:180-185`; tests `src/cli/__tests__/init.test.ts:1020-1026` (first line equals the notice; before `✓ Created`; before the restart row) and `:1029-1036` (no notice with `--target` or `--skip-agents`) | VERIFIED (read; I did not run the tests — the branch's CI and the orchestrator's 22.4 full run are the run) |
| The notice string matches the catalog | catalog row "bare `init` default notice (A2)", `design.md:950`: `no --target given — set up for Claude Code (the default). Using Kiro? npx designerpunk attach --target=kiro`. Function `src/cli/shared/errorCatalog.ts:462-466` builds it from the profile (`HARNESS_DISPLAY_NAMES` at `:453`). The literal row is asserted at `src/cli/__tests__/errorCatalog.test.ts:237` | VERIFIED (read) |
| The sequenced restart row stays LAST | `init.test.ts:1026`; `printNextSteps` order in `src/cli/init.ts` (notice … restart) | VERIFIED (read) |
| The founder count is unchanged (5) | `docs/consumer/INSTALL.md:2` and guide front matter: `path-steps: { founder: 5, … }`; INSTALL § 3 L57-61 (5 steps); README L133-137 (5 steps). The notice is reading, not a step (design C23 note, feedback/design.md L648) | VERIFIED (read) |
| Every doc spells the target, so no path leans on the default | INSTALL L58 `init --target=<cc\|kiro>`; README L134; the guide's CLI table (`--target=<cc\|kiro> picks the harness`) | VERIFIED (read) |

## The two items carried from my 19.5 review

**1. `example-home.yaml` as placed, against the guide's "UI Tree Convention": CONSISTENT.**
- **Placed equals authored**, byte for byte: `git rev-parse` of `src/cli/templates/product/experience-map/pages/example-home.yaml` and `design-inputs/example-home.yaml` are both `df3366d1…`. `overview.yaml` (`3b513185…`), `home-layout.yaml` (`b0af4ef8…`), the note template (`a1bfc86d…`) and Peter's approved example (`6b9556c5…`, the hash the approval record binds) are equal pairs too.
- **19.5 item 8 was applied** (my `content:` wording):
  - the YAML block line at guide L666: `content: # Optional. Text the screen shows that no component carries (a heading, body copy). NOT indexed.`;
  - the table row at L677: `` | `content` | object (string values) | No | Not indexed | ``.
- **Item 7** (what `init` scaffolds) was applied at guide L521.
- **Item 6** (the "new project" sentence) was applied at guide L320.
- **Item 1** (the headings promoted back to H3, so they resolve in the docs index): the outline shows `### Themes` L306, `### Product Tokens` L554, `### Writing Screen Specs` L598, `### UI Tree Convention (Draft)` L645, and so on.
- Every other key the example uses (`component`, `props`, `tokens`, `children`, plus the top-level `template`, `status`, `state-model`, `accessibility`) is in the guide's convention or the § "Writing Screen Specs" example.

**2. The 22.3 token-name check: STANDS.**
- `space.inset.200`: Application MCP `get_token_details` resolves it, value 16, a Container-Base consumer. Branch source: `src/tokens/semantic/SpacingTokens.ts:176` (`insetSpacing`), `:220` (`'200'`).
- `color.structure.canvas`: Application MCP resolves it (`themeVarying: true`, dark → `gray400`). Branch source: `src/tokens/semantic/ColorTokens.ts:501`.
- Components: `component-meta.yaml` exists at the branch for `Nav-Header-App`, `Container-Base` and `Button-CTA` (`git cat-file -e`).
- **Note, not a defect**: `color.structure.canvas` is theme-varying, so native output omits it (§ Platforms). The example's status is web-only, with iOS and Android `not-started`, so it promises nothing on native.
- The MCP answers come from my session's index; the branch `git grep` is the authority for "at `d637c7b5f`".

## G2 backstop — mechanical fact

```
$ git merge-base --is-ancestor 31a8c9194 origin/task/123-u3-onboarding; echo "exit=$?"
exit=0
```
- `31a8c9194` is "U3g G2 cycle 2: the corrected derivation check on the shipped profile (123) (#313)", and it is also an ancestor of `origin/main` (exit 0).
- **The first limb holds**: 22.5 may open the PR on the ancestry limb, and the PR body names that limb.

## The open ⚠️ at 22.4 (the widened no-overlap set printed `package.json`)

**It does not change my DD9 confirmation**: DD9 reads `init`, the profile and the docs, and none of these is the hit.
- **What the hit is**: the two `files[]` lines for `docs/consumer/{INSTALL,COMMIT-POLICY}.md` (22.3b, Ada; `task-22-4-completion.md` L27-29).
- **My read, for Stacy and Peter, not mine to rule**: those two lines are what make the install guide and the commit policy reach a consumer at all.
  - The CHANGELOG says both "ship in the package".
  - COMMIT-POLICY L56 and the `src/components/README.md` pointer depend on it.
  - So reading (a), "the wiring entry is the `scripts` block", matches what the trigger set was for.
- **What it does to 22.5**: by the criterion's letter, the red holds 22.5's PR-opening act. My DD9 confirmation can be recorded now; the PR waits for that lift.

## The release-3 CHANGELOG entry (`CHANGELOG.md` L7-42 at `d637c7b5f`) — first owner read, as product architect

**Overall**: plain, in the consumer's terms, and true to what I read. The scope sentence opens it (L9, identical to INSTALL L9 and README). The DD9 notice is quoted at L21. "Prints its next steps starting at `generate` … jest install is one optional line" matches `errorCatalog.ts:493-512`. The jest collision claim matches `:140-145`.

**C-1, MISLEADING-SILENCE (a CORRECTION): "Known limitations" omits the false-success defect.**
- The guide discloses it (L303): after an "Orphaned override key" report, `generate` still prints "✅ System tokens generated", exits 0, and rewrites `token-index/` without its theme-varying data.
- The code is unchanged at the branch (`src/cli/designerpunk.ts:293`).
- A consumer reads the CHANGELOG to learn what is broken, and this is the one defect that disguises itself as success.
- **Add to "Known limitations"**, as a third bullet:
  `- If your token source lacks a semantic token that DesignerPunk's dark or WCAG overrides name, `generate` reports an "Orphaned override key" and writes no token files, but still prints "✅ System tokens generated" and exits 0. Read the lines above the ✅.`
- **Owner**: Lina (the 22.4 entry). If the CHANGELOG-HOLDS byte-equality assertion covers only the HOLDS bullet, this addition does not touch it.

**C-2, CORRECTION (consistency inside the entry): the `validate` defect appears only as a "Fixed" bullet.**
- "Fixed" (L37) says `init`'s customize note now admits that `validate`'s relationships check "currently fails even on unmodified token source". That is a live defect, but "Known limitations" does not list it.
- A reader scanning that list (the section meant for "what won't work") misses it.
- **Add to "Known limitations"**:
  `- `npx designerpunk validate`'s mathematical-relationships check fails even on unmodified token source, so `validate` exits non-zero. It is a defect in the checker, not in your tokens; its other checks are still worth reading.`
- **Owner**: Lina.

**P-1, polish for the charter, not a correction: the "agent-profile derivation check" bullet** (`### Changed`, L31).
- It is the CHANGELOG-HOLDS text: byte-equal and asserted, so not mine to reword here.
- As consumer prose it is the hardest paragraph in the entry. The preamble (L3) promises that internal-only changes are not listed, and the bullet's last sentence ("the shared governance rule emptied in place, which no reviewer reads") will not mean anything to a designer.
- It belongs in the entry: it closes two limits 15.0.0 disclosed. When the HOLDS text is next revised, a one-sentence lead in consumer terms would help, for example "The checks behind your generated agents now run on what actually ships."
- Recorded as input to the rewrite charter and to U3g's owner.

**P-2, polish: the heading reads "planned Release 3", and the next paragraph explains the numbering** ("the Nth planned entry, not a count of tags"). A consumer never sees the plan, so the release label can go when the version number is known. Not a correction.

**Not raised** (outside a CHANGELOG): the native consumer profiles still don't say native onboarding is unsupported. That is in my profile-scope record (`records-2/consumer-profile-native-scope-gaps.md`), with Peter's fork open.

## Not verified by me
- I did not run `init.test.ts` or `errorCatalog.test.ts`; the evidence is source and test reads.
- I did not run `init` end to end at this SHA.
- The Application MCP read my session's index, not `d637c7b5f`'s `token-index/`; the branch `git grep` stands in for it.
