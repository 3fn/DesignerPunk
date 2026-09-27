# Task 10.3 Completion — Entry tree

**Spec**: 123 — Consumer Distribution · **Unit**: U2a · **Parent**: Task 10 · **Agent**: Lina (Opus)

## What changed

- **`entryTree(frontmatter) → PartitionTree<EntryLeaf>`** in `tools/agent-generator/partition.ts`. It shares the `PartitionTree` class with the body tree, so containment is structural in one `nodes` map and `isDescendantOrSelf` behaves identically on both (C13, C15). Root id: `<frontmatter>`.
- **Keying** (design C13; Stacy S-D-B2-(a)):
  - maps decompose into their keys (`routes` → `routes.docs`; `kiro.keyboardShortcut`);
  - **list- and map-valued fields are keyed per member**: `writeScope[<glob>]`, `skills[<id>]`, `toolSubset.<server>[<tool>]`, `knowledgeBases[<name>]`, `preflight[<command>]`;
  - list members and scalar leaves are the atomic entries (one route, one command, one glob);
  - identity: `id` for doc routes; **`name` for commands, never `cmd`** (a named-gap command, which has no `name`, keys by `class`); `target` for agent routes; `name` for knowledge bases; `command` for preflight; the member's value for scalar lists; index only when there is no identity (cues, standing facts);
  - `ambient.governanceAsLaw` → `ambient[<docid>]` → `ambient[<docid>#<section-slug>]`, one leaf per distinct asserted section (the de-duplication `buildEmbeds` applies);
  - `kiro.agentSpawn` → `preflight` (its rendered concept, the name the design uses);
  - duplicate identities take `-2`.
- **`tools/agent-generator/__tests__/entry-tree.test.ts`** (new) — 15 tests over `canonical/agents/lina.md`'s real frontmatter, plus two keying-rule unit cases.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/entry-tree.test.ts` → **15/15**.

### Bites recorded red (applied to `partition.ts`, the file run, reverted; then 15/15)

| Mutation | Red |
|---|---|
| key commands by `cmd` (`LIST_IDENTITY.commands = ['cmd', 'class']`) | `Tests: 3 failed, 12 passed, 15 total` — `✕ each command is an entry keyed by its name`, `✕ no entry path is keyed by a command string`, `✕ editing a command's cmd leaves every entry key unchanged…` |
| lists atomic (a list is one leaf, not per-member) | `Tests: 10 failed, 5 passed, 15 total` — incl. `✕ writeScope is a list whose globs are individual leaf entries`, `✕ toolSubset is a map of servers, each a list keyed per tool…` |

## Application-time adaptations

1. **`toolSubset` keys as `toolSubset.<server>[<tool>]`, not the design's illustrative `toolSubset[<tool>]`.** `lina.md` grants `rebuild_index` under two servers, so `toolSubset[<tool>]` would collide. The generic rule (maps decompose, lists key per member) gives the server level, and a test asserts the two grants stay distinct.
2. **An intermediate `ambient[<docid>]` node** sits between `ambient` and `ambient[<docid>#<section>]`. The CC embed block is ONE block per doc id (`buildEmbeds` joins the sections), so 10.4 needs a node to source that block to. Containment is unchanged: every section leaf remains a descendant of `ambient`.
3. **Identity fields the design did not name** (`target` for agent routes, `command` for preflight, `class` for named-gap commands, `artifact` for ground-truth trims) are declared in one table, `LIST_IDENTITY`, in `partition.ts`. **Cues key by index**: a cue has no identity field, and keying on its `when` text would orphan a row on every wording edit, which is the `cmd` problem the design rejects. *Residual*: inserting a cue renumbers the ones after it. That is the design's accepted cost of "index only when they have none".
4. **Out-of-list**: `entry-tree.test.ts` under `__tests__/`. *Authority*: the criterion "a test over `lina.md`'s frontmatter".
