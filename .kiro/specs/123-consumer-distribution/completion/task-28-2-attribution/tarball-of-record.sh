#!/usr/bin/env bash
# Task 28.2 / 28.1 — the tarball of record, run AFTER the CHANGELOG entry is committed (sequencing step 3).
# (a) shipping method (rows 1.4 / 2.3): release-publish --dry-run in a fresh clone of the worktree at HEAD, --keep
# (b) target method (row 2.2): npm run build + pack-assert (dry run) + npm pack --dry-run --json --ignore-scripts
# (c) assertion + attribution (rows 2.4 / 2.6) against the PR-215 baseline listing (row 2.5)
set -euo pipefail
S="${S:?set S to the scratch directory holding wt-u5b and tarball-attr}"
W="$S/wt-u5b"; A="$S/tarball-attr"; PACKDIR="/Users/3fn/Documents/Work Projects/Kiro/u5-pack"
HEAD_SHA=$(git -C "$W" rev-parse HEAD); SHORT=${HEAD_SHA:0:9}
git -C "$W" show HEAD:CHANGELOG.md | grep -q '^## \[Unreleased\]' || { echo "STOP: HEAD's CHANGELOG.md has no [Unreleased] entry"; exit 1; }
[ -z "$(git -C "$W" status --porcelain -- CHANGELOG.md package.json)" ] || { echo "STOP: CHANGELOG.md or package.json uncommitted"; exit 1; }
echo "head: $HEAD_SHA"

# (a) shipping method
( cd "$W" && npx tsx scripts/release-publish.ts --dry-run "$HEAD_SHA" --source "$W" --keep ) 2>&1 | tee "$A/release-dry-run-$SHORT.log"
TGZ=$(awk '/^tarball:/{print $2}' "$A/release-dry-run-$SHORT.log")
SHA1=$(awk '/^sha1:/{print $2}' "$A/release-dry-run-$SHORT.log")
[ -f "$TGZ" ] || { echo "STOP: no tarball reported"; exit 1; }
DEST="$PACKDIR/3fn-core-15.1.0-$SHORT.tgz"
[ -e "$DEST" ] && { echo "STOP: $DEST exists; not overwritten"; exit 1; }
cp "$TGZ" "$DEST"
echo "candidate: $DEST"; shasum -a 1 "$DEST" | tee "$A/candidate-shasum-$SHORT.txt"
[ "$(shasum -a 1 "$DEST" | awk '{print $1}')" = "$SHA1" ] || { echo "STOP: copied tarball sha1 differs from the record's"; exit 1; }

# (b) target method, in the worktree (build noise is reported, then reverted by the orchestrator, never committed)
# pack-assert exits 1 on any finding; the run continues so the listing and attribution are still produced
# (2026-10-15: at d6b6c7445 the worktree method read 103/105 — the two MCP bundles resolved from nested
# node_modules — while the fresh-clone method read 105/105). The exit code is recorded, never swallowed.
( cd "$W" && npm run build > "$A/head-build-$SHORT.log" 2>&1 ) || { echo "STOP: build failed"; exit 1; }
set +e; ( cd "$W" && npx tsx scripts/pack-assert.ts > "$A/pack-assert-$SHORT.log" 2>&1 ); PA=$?; set -e
grep -E '^(Tarball|FAIL)|assertions passed' "$A/pack-assert-$SHORT.log"; echo "pack-assert exit=$PA"
( cd "$W" && npm pack --dry-run --json --ignore-scripts > "$A/head-target-method-$SHORT.json" 2>/dev/null )
echo "worktree after build:"; git -C "$W" status --porcelain

# (c) assertion + attribution, both methods
node "$A/attribute.mjs" "$W" "$A/base-pack.json" "$A/head-target-method-$SHORT.json" --label "target method @ $SHORT" > "$A/attribution-target-method-$SHORT.md"
node "$A/attribute.mjs" "$W" "$A/base-pack.json" "$DEST" --label "shipping method @ $SHORT" > "$A/attribution-shipping-method-$SHORT.md"
head -8 "$A/attribution-target-method-$SHORT.md"; head -8 "$A/attribution-shipping-method-$SHORT.md"
echo "DONE: TGZ=\"$DEST\"  sha1=$SHA1  — paste into probe-rerun.md § Launch blocks (TGZ= and the step-2 Expect line)"
