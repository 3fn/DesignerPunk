# Task 13 Summary: The component tier reaches `generate` (U8)

**Spec**: 129 - Consumer-Generation Completeness · **Unit**: U8 · **Date**: 2026-11-08

## What changed for an adopter

- `@3fn/core` now ships its six component-token definition files, and `generate` harvests them into your iOS and Android output as a third source, bound to your own primitives by name. Web is unchanged: it keeps `@3fn/core/component-tokens.css`.
- A group of component tokens you declare replaces DesignerPunk's whole group, and `generate` says so. Two of your files declaring one group fail `generate`, naming both.
- `generate` and `sync` report a primitive that DesignerPunk's component tokens read and your output no longer defines, on any platform. A report, not a failure.
- `generate` warns, naming the file, on a `.kt` file of yours in `com.designerpunk.tokens` or `com.designerpunk.components.*`.
- `sync` says when your generated output is not what `generate` would write now. Freshness is judged by content, not file times.
- A new check, `scripts/harness/d2-check.ts`, runs in `harness-generate`: every component token in the index appears in the generated iOS and Android output and no other does, and DesignerPunk's index entries equal the shipped definitions.

## Release note draft

"Component tokens: your iOS and Android token output now includes DesignerPunk's component tokens (`AvatarTokens`, `ButtonIconTokens` and the rest), read from your own primitives. Declare a group of the same name to replace ours. If you hand-wrote an enum with one of these names, remove it. `generate` fails if two of your own files declare one group."

## Open

The PR-run harness annotations at head H, the floor-3 comparison (owed from U8's successors) and the owners' outcome lines are in `completion/task-13-completion.md`.
