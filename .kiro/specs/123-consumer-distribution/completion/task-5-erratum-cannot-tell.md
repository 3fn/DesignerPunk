# Design-Text Erratum — the "migration — cannot tell" catalog row

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Agent**: Thurgood (Sonnet) · **Authorized**: Peter, 2026-09-26 (Task 2.6 seat)

## What changed

`design.md`'s error-catalog table (§ "Error Handling — the loud-failure catalog (exact strings)"), row `migration — cannot tell`:

- Amended in place with a dated `*(Erratum 2026-09-26: …)*` note (this spec's existing convention — see `tasks.md` L9, L43), original row text left visible before the note.
- Added a new row, `migration — cannot tell (remedy)`, for `cannotTellRemedyMessage` — a new user-facing exact string introduced by Task 5.5 that had no catalog row at all. Judgment call, made because: the catalog's purpose is to pin every exact user-facing string for audit/drift protection, this remedy line is exactly that kind of string (Task 5.5 calls it "actionable" and load-bearing), and leaving it unpinned would let it drift silently the way the original row's reason clause did.

## Why

Task 5's migration work (Lina, `task-5-5-completion.md`) found the original row's reason clause — "the package content for version `<v>` could not be retrieved" — is true for only one of three `cannot-tell` causes:
1. offline / fetch failed → content really could not be retrieved (original text correct here);
2. installed component versions 11.3.0–11.8.x → the content WAS retrieved, but that version's copy transform was private to its own `init.ts` and cannot be recovered;
3. installed version unknown → `<v>` itself is unknown (the code prints "version unknown").

Peter ruled option **(A)** on 2026-09-26: keep the 11.3–11.8 transform unknown rather than build extraction (revival trigger recorded in `task-5-5-completion.md`: build option (B) only if a consumer's copies actually date from that window). That ruling is what the erratum cites as settling cause (2) rather than leaving it open.

## Before → after (the erratum'd row)

**Before:**
```
cannot tell whether <path> was modified — the package content for version <v> could not be retrieved. Review before removing.
```

**After** (original text kept, erratum appended in the same cell):
```
cannot tell whether <path> was modified — the package content for version <v> could not be retrieved. Review before removing.

*(Erratum 2026-09-26: this reason clause held for only one of three `cannot-tell` causes found at Task 5.5 (Lina) — offline/fetch-failed. The other two: the content for version `<v>` WAS retrieved, but that version's own copy transform cannot be recovered (versions 11.3–11.8, private to `init.ts` — Peter ruled option (A), keep it unrecoverable, 2026-09-26; see `task-5-5-completion.md`); or the installed version itself is unknown. Corrected, three-cause row — `sync`'s code becomes string-equal to it: `cannot tell whether <path> was modified — <the package content for version <v> could not be retrieved|version <v>'s copy transform cannot be recovered|the installed version is unknown>. Review before removing.`)*
```

The corrected row (what Lina's code should become string-equal to, per-cause):
```
cannot tell whether <path> was modified — <the package content for version <v> could not be retrieved | version <v>'s copy transform cannot be recovered | the installed version is unknown>. Review before removing.
```

This is Lina's proposed wording, kept as-is (judged already three-cause and string-checkable per cause; no refinement needed) — using the alternation syntax (`<a\|b\|c>`) already established elsewhere in this same catalog table (e.g. `--target=<cc\|kiro>`).

## New row added: the remedy line

```
| migration — cannot tell (remedy) | `sync cannot judge <names>, so 'sync --migrate-components' leaves <it|them> in src/components/core/. Decide each by hand: if you edited it, move it to src/components/<Name>/ (it becomes your fork); if you didn't, delete it and you'll get the package's version. Until then, the old core/ level keeps logging its legacy warning each time the component index loads.` |
```

Transcribed verbatim from `cannotTellRemedyMessage` in `src/cli/sync/Migration.ts`, with `<it\|them>` standing in for the singular/plural branch the same way other rows use alternation placeholders.

## Targeted check + result

- Confirmed the erratum'd row and the new row each parse as valid two-column table rows (unescaped-pipe count = 3 per line: leading/middle/trailing delimiters only; all pipes inside the alternation are `\|`-escaped) — checked directly against the file, not assumed.
- `grep -n "cannot tell whether\|the package content for version"` against `tasks.md` → no hits, so no tasks.md criterion quotes this row verbatim; no tasks.md erratum needed (confirmed per the coordinator's instruction to grep first).
- No code changed in this pass (design.md is spec text, not source) — `sync.catalog.test.ts` still pins the OLD single-cause string against the OLD `cannotTellMessage` implementation, and will go red the moment Lina's code changes to the three-cause form. That is expected and intentional: this erratum routes the design-text authority Lina's code should follow; making the code (and its test) string-equal to it is Lina's follow-up, not this pass's.

## Application-time adaptations

None.
