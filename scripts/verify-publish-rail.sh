#!/usr/bin/env bash
# Publish-rail guard — verifies a published @3fn/core version is actually
# LIVE on registry.npmjs.org and that its tarball is served from that same
# registry (not GitHub Packages, not any other rail).
#
# Req 6 (Spec 123, design C9). Mandatory step in the release recipe
# (.kiro/hooks/RELEASE-FLOW.md) — invoked AFTER `npm publish`, never as a
# PR check (Req 6.6: the event it verifies happens after merge, so there
# is nothing at PR time to gate).
#
# Usage:
#   VERSION=<published-version> ./scripts/verify-publish-rail.sh
#   ./scripts/verify-publish-rail.sh --self-test-host <tarball-url>   # dev convenience only
#
# Exit codes:
#   0  — PASS: version visible on npmjs AND tarball host verified
#   10 — FAIL[version]: the version is not visible on registry.npmjs.org
#   11 — FAIL[host]: the tarball is served from a host other than registry.npmjs.org
#   12 — self-test only (never reaches PASS; never runs check_version)
#   13 — FAIL[host-empty]: could not read the tarball URL at all (network/registry error)
set -euo pipefail

check_version() {   # REQUIRED FORM (6.2), verbatim inside:
  npm view "@3fn/core@${VERSION}" version --@3fn:registry=https://registry.npmjs.org >/dev/null 2>&1 \
    || { echo "FAIL[version]: @3fn/core@${VERSION} is not visible on registry.npmjs.org (checked scope-explicitly) — do not announce this release"; exit 10; }
}

check_host() {      # HARDENING (6.8, augments): takes the tarball URL as input so it is independently bitable
  case "$1" in https://registry.npmjs.org/*) ;; *)
    echo "FAIL[host]: tarball for @3fn/core@${VERSION} is served from '$1', not registry.npmjs.org — wrong rail"; exit 11;; esac
}

if [ "${1:-}" = "--self-test-host" ]; then check_host "${2:-}"; echo "SELF-TEST ONLY — no release verified"; exit 12; fi

check_version                                   # fail-fast: host never runs if version fails
URL="$(npm view "@3fn/core@${VERSION}" dist.tarball --@3fn:registry=https://registry.npmjs.org || true)"
[ -n "$URL" ] || { echo "FAIL[host-empty]: could not read the tarball URL for @3fn/core@${VERSION} (network or registry error) — host NOT verified"; exit 13; }
check_host "$URL"
echo "PASS: @3fn/core@${VERSION} visible on npmjs; tarball host verified"
