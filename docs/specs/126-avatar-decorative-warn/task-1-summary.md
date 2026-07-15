# Task 1 Summary: Avatar Req 5.4 warn vs `decorative` prop (Spec 126)

**Spec**: 126-avatar-decorative-warn
**Status**: Implemented (O2, ratified 2026-07-09)

## What this fixes

Avatar's web dev-warning ("alt is required when src is provided") previously fired on any `src`-without-`alt` avatar, including legitimately `decorative` avatars and `agent`-type avatars (where `src` is documented as ignored entirely). This trained developers to ignore a real accessibility signal.

## The fix

The warn condition is now scoped to match the ratified requirements text exactly:

```
type === 'human' && src && alt == null && !decorative
```

- **Human-type only** — agent type ignores `src` entirely (Req 5 AC 5), so it never warns.
- **`!decorative`** — a `decorative` avatar is the component's own signal that the image is non-informative (Req 9.2 applies `aria-hidden="true"`), so it's never a false positive.
- **`alt == null`** — a genuinely empty alt attribute (`setAttribute('alt', '')`) is treated as intentional and silent; only true absence warns.

The warning message was also improved to lead with the fix (add alt text) before naming the deliberate exception (decorative), per Thurgood's ratified wording.

## Where

- `src/components/core/Avatar-Base/platforms/web/Avatar.web.ts` — the condition + warning message + doc comment.
- `src/components/core/Avatar-Base/__tests__/Avatar.accessibility.test.ts` — six-test warn-coverage matrix; removed an interim console spy that's no longer needed.
- `src/components/core/Avatar-Base/contracts.yaml` and `Avatar-Base.schema.yaml` — edge semantics documented at the contract/schema level so the behavioral contract of record matches the code.
- `src/__tests__/console-allowlist.json` — updated pattern/reason for the new message string.

## Validation

Full `npm test`: 377 suites / 8992 tests green. `npx tsc --noEmit`: clean. Avatar-specific suite (6 files, 236 tests) green, including the six new warn-matrix tests and the unchanged non-regression sentinel test.

## Out of scope (named in the design outline, not adopted)

iOS/Android warn parity — no equivalent warning exists on those platforms; adding one is a distinct cross-platform decision, not part of this fix.
