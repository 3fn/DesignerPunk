# Task 16.2 — Operative-set re-quotes, overlay pins, dispositions (profile-author acts)

**Agent**: Thurgood (Sonnet) · **Branch**: `task/129-16-thurgood`, merged with Kenya's unit branch (head `03052d970`)

## What changed

- `448d4fe7d` committed Kenya's and Data's drafts verbatim under F12′ (credited in the message): the iOS and Android theming units in `canonical/agents/{kenya,data}.md` and both consumer overlays; the operative-set items (`theming-1`..`-10` for Kenya, `-1`..`-9` for Data); Kenya's stale-text fixes (a) `scope-2`, (b) `product-tokens-3`, (c) the `commands[platform-tokens]` cue; Data's (a) and (b). (d) is owed to U12, Task 17.
- `89aa1604d` committed their corrected sentence for the false claim "the semantic colours are not on `DesignTokens`" (now "theme-varying"), in each charter, overlay and `theming-1` item; Data's `theming-1` label follows his new text.
- Overlay pins moved to the new canonical hashes (Kenya: `#in-scope`, `#ios-theming-spec-094`, `commands[platform-tokens]`; Data: `#in-scope`, `#android-theming-spec-094`), as authoring acts.
- No `canonicalHash`, confirmation note, signature object or signature sheet moved by me; nothing regenerated.
- Retained-row reading: `#product-tokens-spec-108109` (bare `retained`) needs a confirmation only, no signature row. A retained unit renders equal to its canonical text, so C18 does not enter it; an edited retained unit's record `canonicalHash` goes stale and the confirmer re-confirms. Freshness showed `unsigned-routed: 0` and I opened no row.

## Targeted checks and result

- `npx tsx tools/agent-generator/diff-guard.ts` after `89aa1604d`: the only findings were the seat acts owed (10 stale rows: confirmations and signatures; two confirmation notes whose item counts differ from the records); no stale-overlay finding and no item-substring or orphan finding; `unsigned-routed: 0`.
- A re-run after merging Kenya's branch could not load in this worktree (`Cannot find module '../../mcp-server/dist/index'`, an unbuilt dist, not a finding); the post-merge result is the unit PR's to show.

## Application-time adaptations

- F12′: Kenya and Data cannot commit their own charters, so I committed their drafts verbatim and did not reword any.
- A second commit (`89aa1604d`) was needed because each seat found the same false sentence in its own committed text at the 16.3 read.
