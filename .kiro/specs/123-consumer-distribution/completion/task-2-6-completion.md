# Task 2.6 Completion — Integration Guide: the lines U1 falsifies

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 2 · **Agent**: Thurgood (Sonnet)

**Delegated-tier**: plan held

## What changed

Three lines in `governance/DesignerPunk-Integration-Guide.md` were corrected against the current shipped behavior of `init` (Ada's Tasks 1–2.5, verified directly against `src/cli/shared/mcpDataRoots.ts::resolveComponentRoots`, `src/cli/init.ts`, and `src/cli/templates/mcp-config.json.template` before writing — not taken on trust from the brief):

| Line (pre-edit) | Before | After | Why |
|---|---|---|---|
| L202 | `"COMPONENTS_DIR": "./src/components/core"` | `"COMPONENTS_DIR": "./src/components"` | `init` no longer copies `src/components/core` into the consumer; the consumer's own component root under the birth-aware resolver is `<bornRoot>/src/components` (matches the already-corrected `src/cli/templates/mcp-config.json.template`, commit `383e65b0`). |
| L454 | `npx jest src/components/core/     # Run component tests only` | `npx jest src/components/          # Run your own component tests, once you've added some` | Same reason — `src/components/core` doesn't exist in a freshly-born consumer repo (empty `src/components/` + README only). |
| L576 | `- Default: \`src/components/core\`` | `- Default: \`src/components\` (your own component directory, once you've added components)` | This is the Product MCP's `COMPONENT_DIR` default, described in a "product repo" (i.e. born-consumer) context. Verified against `product-mcp-server/src/index.ts`: `resolveComponentRoots()` returns `roots[0] = <bornRoot>/src/components` for a born consumer with no env override; `DEFAULT_COMPONENT_DIR = 'src/components/core'` in that file is only the pre-birth-resolution dev-repo fallback (cwd == package root there), not the documented consumer-facing default. |

One adjacent line (immediately following L576, at the "In a product repo…" sentence introducing the `COMPONENT_DIR=./node_modules/@3fn/core/src/components/core …` example) was reworded — not because its own line is false, but because the corrected default above made it read ambiguously. Added "…the installed package's own components instead — useful for validating screen-spec references against DesignerPunk's own component set rather than your own" so the two examples (your own tree vs. the package's own tree) don't collapse into each other. The command line itself (`COMPONENT_DIR=./node_modules/@3fn/core/src/components/core npx designerpunk mcp:product`) is unchanged — it is still a correct, valid override.

`Last Reviewed` bumped to 2026-09-26 (Civitas metadata hygiene on a content edit to an MCP-served doc).

## The grep instrument (recorded after the edits above)

```
$ grep -n "src/components/core" governance/DesignerPunk-Integration-Guide.md
367:   - Component platform files: `node_modules/@3fn/core/src/components/core/*/platforms/ios/`
390:   - Component platform files: `node_modules/@3fn/core/src/components/core/*/platforms/android/`
580:COMPONENT_DIR=./node_modules/@3fn/core/src/components/core npx designerpunk mcp:product
886:| designerpunk-application | `node_modules/@3fn/core/src/components/core` | `**/*.ts`, `**/*.yaml` | Component source and metadata |
```

(Pre-edit, the same grep additionally matched L202, L454, and L576 — those three no longer match, confirming the corrections above.)

### Disposition of each remaining hit

| Line | Hit | Disposition | Reasoning |
|---|---|---|---|
| 367 | `Component platform files: node_modules/@3fn/core/src/components/core/*/platforms/ios/` | **Task 19.4** | Names an iOS platform path. Per the brief's scope line, platform paths (iOS/Android/web source paths) are Task 19.4's — not touched here. |
| 390 | `Component platform files: node_modules/@3fn/core/src/components/core/*/platforms/android/` | **Task 19.4** | Same — Android platform path. |
| 580 | `COMPONENT_DIR=./node_modules/@3fn/core/src/components/core npx designerpunk mcp:product` | **Correct-as-is** | Names the *package's* own internal component tree, which is unchanged by U1 (`init` only stopped copying components into the consumer; the package's own `src/components/core` layout is untouched). This line is an explicit override pointing INTO the installed package — still valid and still resolves correctly (verified: `resolveComponentRoots` with an env value set returns that env value as `roots[0]`, the winner ProductIndexer consumes). |
| 886 | Knowledge Base table row: `node_modules/@3fn/core/src/components/core` | **Correct-as-is** | Same reasoning as L580 — this is the recommended knowledge-base index path for DesignerPunk's *own* component source (for agent deep-dives), which lives at the package's unchanged internal `src/components/core` path, not the consumer's tree. |

## Targeted check + result

- `grep -n "src/components/core" governance/DesignerPunk-Integration-Guide.md` — run and recorded above (4 hits, all dispositioned; 0 unaccounted-for).
- No test suite parses or asserts on this markdown file's content (`grep -rl "DesignerPunk-Integration-Guide" --include="*.ts" src/` → no results), so there is no Jest suite this edit could regress. This is a documentation-only change to a governance file; `npm test` was not run as a targeted check because no code changed and no test exercises this file's prose.
- Confirmed the write-scope grant (`.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`) reads **RATIFIED** before the first edit.

## Application-time adaptations

None — the three corrected lines and their exact "why" matched Ada's handoff suggestions after independent verification against the source files named in the brief (`mcpDataRoots.ts`, `init.ts`, `mcp-config.json.template`, and additionally `product-mcp-server/src/index.ts` for the L576 default, which the brief didn't name but which was the actual authority for that specific claim).
