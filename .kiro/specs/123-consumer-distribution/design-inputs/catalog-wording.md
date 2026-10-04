# Catalog wording owed by Leonardo (source for 22.1 and for Thurgood's single design erratum in the 22.2 window)

**Date**: 2026-10-03 · **Author**: Leonardo · **Resolves**: instruments row 17.1 (the `Themes:` suffix). It also gives the wording for the catalog-row gaps recorded at 20.2 and 21.3 (`task-20-instruments.md` § "Found later"; `task-21-3-completion.md`).
**Read at**: `task/123-u3-onboarding` HEAD `55bbc1243`. The strings in `errorCatalog.ts`, `designerpunk.ts`, `sync/index.ts`, `gitignoreRegion.ts` and `RegionGrain.ts` are unchanged since `c434d8466`.

Every row below belongs in design.md § "Error Handling — the loud-failure catalog (exact strings)". In `<…>` placeholders, the bracketed text is filled at run time. Thurgood formalizes the rows as one erratum. Lina's functions then equal these strings.

---

## 1. generate — registered theme not emitted (row exists, `design.md:992`) — instruments row 17.1

**Ada's draft** (the row as it stands): `Themes: <name> (<mode>) — registered; not yet emitted (see the install guide)`

**Final**:
```
Themes: <name> (<mode>)[, <name> (<mode>)…] — registered, not applied yet: a theme you register does not change your generated output; light and dark mode and the wcag theme use DesignerPunk's built-in values
```

| Reason | Class | Source |
|---|---|---|
| The themes print on ONE comma-joined line, so the line gets one suffix, not one per theme | VERIFIED-CODE | `src/cli/designerpunk.ts:241-242` |
| Every born repo prints this line, because `init` writes `dark` and `wcag` entries into the config | VERIFIED-CODE | `src/cli/init.ts:719-735` (`generateConfig`) |
| Dark mode and the `wcag` block do reach the output, from the package's own override maps, not from the config entries. So a bare "not yet emitted" would be false for those two names | VERIFIED-CODE | `src/generators/generateTokenFiles.ts:19-21` (static imports), `:126-165` (registration and context resolution) |
| The wording echoes the scope sentence's third sentence ("…does not change your generated output yet; light and dark mode work") | VERIFIED-CODE | `governance/DesignerPunk-Integration-Guide.md:23` |
| No doc pointer: "the install guide" would now be ambiguous (`docs/consumer/INSTALL.md` is the region copy; the guide's § Reference "Themes" is a separate place) | DESIGN-ONLY | judgement |

It comes off by dated amendment when Spec 129 item (i) lands, as the row already says.

## 2. `.gitignore` block — config unreadable (NEW row; Lina's 20.2 string, one cut)

**Lina's** (`src/cli/shared/errorCatalog.ts:343-349`): `… none was guessed. Nothing was written to .gitignore. Add the lines …`

**Final** (the redundant sentence "Nothing was written to .gitignore" is cut; the opening clause already says so):
```
DesignerPunk's .gitignore block was not written — designerpunk.config.ts could not be loaded (<first line of the load error>), so the platform output path is unknown and none was guessed. Add the lines token-index/ and .designerpunk/ to .gitignore yourself, or fix the config and run 'npx designerpunk sync'.
```

- **Printed by**: `init`, and `sync`; both then write nothing.
- **The "run sync" remedy is true**: once the config loads, `sync` offers the block whenever git is not ignoring `.designerpunk/`. That is VERIFIED-CODE at `src/cli/sync/index.ts:297-319` and DESIGN-ONLY per design.md § "C24" PR-9 erratum.
- **No "re-run init"**: `init` is the once-only birth event.

## 3. `.gitignore` block — added (NEW row; Lina's 20.2 string, reordered)

**Lina's** (`errorCatalog.ts:357-358`): `.gitignore: added DesignerPunk's block (it ignores token-index/ and .designerpunk/)`

**Final**:
```
.gitignore: added DesignerPunk's block (it ignores .designerpunk/ and token-index/)
```

- **Why**: the same path order as the offer and report rows (`errorCatalog.ts:313-330`), which name `.designerpunk/` first because the personal note is the reason the block is offered.
- **Printed by**: `init`, and `sync` after a yes.

## 4. starter spec — collision (NEW row; Lina's 21.3 string, accepted verbatim)

```
skipped: <specs/path> (already exists) — your file is kept as it is; the starter spec's version was not written
```

- **Source**: `errorCatalog.ts:370-371`.
- It states what the skip means, as the C27/A13 rule requires (design.md § "C27").
- *Optional, not owed* (Lina's call, because it changes the function's argument): a tail `— read node_modules/@3fn/core/src/cli/templates/starter-specs/<path> to compare`.

## 5. starter specs — written (NEW row; Lina's 21.3 string, accepted verbatim)

```
specs/: <n> starter spec file(s) (<spec names, comma-separated>) — run them with your agent
```

- **Source**: `errorCatalog.ts:375-376`; the `(s)` follows the count.
- It agrees with the guide's § 8 ("Your agent runs it").

## 6. managed region — markers missing (row exists; the remedy is corrected for `.gitignore` only)

**Current** (`errorCatalog.ts:185-189`): `the DesignerPunk-managed region in <file> is missing its markers — not rewriting the file. Restore the markers (see install doc § "Your agent layer") or re-run attach`

**Why it is false for `.gitignore`** (all VERIFIED-CODE or VERIFIED by reading):
- `attach` does not write the target-free region (`src/cli/shared/gitignoreRegion.ts:105-114`, the block's own apply path).
- § "Your agent layer" says nothing about `.gitignore`.
- `docs/consumer/COMMIT-POLICY.md` § "The `.gitignore` block" does not print the marker text.

**Final: the row becomes two strings, chosen by file.**
- Agent-layer files (`CLAUDE.md` and the others), unchanged:
  `the DesignerPunk-managed region in <file> is missing its markers — not rewriting the file. Restore the markers (see install doc § "Your agent layer") or re-run attach`
- `.gitignore`, new:
```
the DesignerPunk-managed block in .gitignore is missing its markers — not rewriting the file. Restore the lines '# designerpunk:managed:begin' and '# designerpunk:managed:end' around the block, and 'npx designerpunk sync' keeps it current again.
```

**Marker text**: VERIFIED-CODE at `src/cli/sync/RegionGrain.ts:61` (`GITIGNORE_COMMENT = { open: '#' }`) and `:69-74` (`regionMarkers`: `designerpunk:managed:begin` / `designerpunk:managed:end`).

**UNRESOLVED (mechanism gap → Lina; not a wording fix):** a person who deleted the `.gitignore` block **on purpose** has no remedy.
- When the manifest records the block but its markers are gone, every run prints this row and writes nothing (`gitignoreRegion.ts:112-113`).
- The only true remedy to offer is "restore it".
- Honouring an intentional removal, for example by dropping the manifest entry after one report, is a mechanism decision for Lina and Peter. No string can fix it.
