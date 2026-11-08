#!/bin/sh
# Captures the web CSS `generate` writes for Task 14's case (a) fixture.
#
#   capture.sh <tarball of @3fn/core> <output file>
#
# Run at the U9 branch's base on `main` (261cd1a3c) to write the golden, and at any later
# commit to compare. It installs the tarball in a scratch directory, runs `init`, shapes the
# fixture with mutate-fixture.cjs and runs `generate`; the product is dist/tokens/DesignTokens.web.css.
set -e
here=$(cd "$(dirname "$0")" && pwd)
tarball=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
out=$2
work=$(mktemp -d)
cd "$work"
npm init -y >/dev/null
npm install "$tarball" --no-audit --no-fund >/dev/null 2>&1
npx designerpunk init --name Probe --abbreviation PR --skip-agents >/dev/null 2>&1
node "$here/mutate-fixture.cjs" "$work"
npx designerpunk generate >/dev/null 2>&1
cp dist/tokens/DesignTokens.web.css "$out"
