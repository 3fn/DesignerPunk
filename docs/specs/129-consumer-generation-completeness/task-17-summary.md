# Task 17 Summary: the native root files retire

**Spec**: 129 · **Unit**: U12 · **Agent**: Ada

The package no longer ships `dist/DesignTokens.{ios.swift,android.kt}` and `dist/ComponentTokens.{ios.swift,android.kt}`. `package.json` `files[]` excludes them and `pack-assert` asserts each absent; the web CSS pair and the web CSS exports still ship and are asserted present. The in-repo build still writes the four files for its freshness and integrity reads. `CHANGELOG.md` `[Unreleased]` announces the retirement, says the consumer's own `generate` emits what the snapshot carried, and names item (iii), I-1 (Android sizing as `Dp`) and I-2 (Android `fontSize` as `TextUnit`) as changes that may break a consumer. Charter item (iii) cites Peter's 7 (a). `canonical/generated.lock` was not moved; Lina refreshes it at the unit's end.
