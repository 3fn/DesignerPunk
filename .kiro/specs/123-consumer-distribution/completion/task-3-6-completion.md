# Task 3.6 Completion — `tarball-target.json` from the post-diet pack

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 3 · **Agent**: Ada (Sonnet)

## What changed

New `tarball-target.json`, generated from a real `npm pack --dry-run --json --ignore-scripts` run against the post-diet tree (this branch, after Task 3.3's `files[]` narrowing, `npm run build` freshly re-run first). Per Req 4.7: *"U1 SHALL declare a tarball target derived from the decided floor, naming which lever it measures; U5 asserts against that declared target."*

**Lever named**: `entryCount` and `unpackedSize`, both from `npm pack --dry-run --json`. Chosen over a bare byte-size delta because Req 4.7's own text forbids a directionless delta ("a delta with no direction and no floor is satisfied by any value, including a positive one") — `entryCount` and `unpackedSize` are both floors set BY this diet's own decisions (the ADD/REMOVE list), and both are independently re-measurable at U5 with the same command.

**Recorded values** (this branch, post-diet):
- **Pre-diet** (measured before this task's `files[]` change, for context — the pre-existing wholesale-`src/` package): `entryCount: 2567`, `size: 7294942` bytes, `unpackedSize: 29820463` bytes.
- **Post-diet target** (what U5 asserts against): `entryCount: 1589`, `size: 5863028` bytes, `unpackedSize: 21307954` bytes.

`measuredAt.commit` records the branch's base commit (`82051e7b...`, the head this Task 3 branch was built on) with a note that the `files[]` narrowing itself lands in later commits on this branch — an honest ancestry note rather than a commit hash that doesn't yet exist at measurement time.

## Targeted tests + result

Re-ran `npx tsx scripts/pack-assert.ts` immediately after writing `tarball-target.json` (no code path in `pack-assert.ts` reads `tarball-target.json` — they are independent artifacts serving different consumers: `pack-assert.ts` is the PER-FILE presence/absence check U1 runs now; `tarball-target.json` is the AGGREGATE-SIZE target U5 asserts against later) → **40/40 assertions passed**, confirming this subtask's pack run didn't regress anything Task 3.3/3.4 already verified.

## Application-time adaptations

1. **`measuredAt.commit` is a descriptive string, not a bare SHA** — the honest ancestry note above. A bare SHA would imply the measurement was taken AT that commit, which isn't quite true (the `files[]` diff that produces this exact tarball hasn't landed as its own commit yet at generation time). Recorded as a deliberate choice, not an oversight.
2. **The `note` field states explicitly that later units will shift these numbers again** (U2's agent-layer `files[]` changes, U3's onboarding docs) — so U5's assertion is against THIS unit's declared target, per the lever named, not a claim that the tarball is "done" after U1.

## Known issues

None.
