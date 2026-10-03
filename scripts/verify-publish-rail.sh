#!/usr/bin/env bash
# Publish-rail guard — verifies a published @3fn/core version is actually
# LIVE on registry.npmjs.org and that its tarball is served from that same
# registry (not GitHub Packages, not any other rail).
#
# SCOPE (Peter's ruling, 2026-09-27 — erratum to Req 6.2/6.8, design C9):
# this checks REGISTRY PUBLICATION STATE ONLY, over plain unauthenticated
# HTTP — exactly what an anonymous stranger's browser or `curl` sees at
# registry.npmjs.org. It never invokes the `npm` CLI and never reads any
# `.npmrc` (project, user, or global), so it cannot be broken by an npm-CLI
# version quirk and cannot be fooled by a project's scope mapping (this
# repo's own `.npmrc` maps `@3fn` to GitHub Packages — this script never
# consults it). It does NOT tell you what a real consumer's own npm config
# would resolve to install; that was the earlier `npm view
# --@3fn:registry=...` form's intent (superseded here — it broke under the
# hermetic npm_config_* env vars this same erratum removes; see Stacy's
# R1-1 review, .kiro/specs/123-consumer-distribution/completion/
# task-7-3-stacy-review.md).
#
# CURL'S OWN CONFIG (Stacy re-check, low note): `curl` has a config file too
# (`~/.curlrc`). The `-q` flag below is passed FIRST — curl requires it to
# be the first argument to take effect — so `.curlrc` is never read either.
# Standard proxy environment variables (`http_proxy`, `https_proxy`, `no_proxy`,
# etc.) are DELIBERATELY HONOURED, not overridden: a release run from behind
# a corporate or CI proxy should still succeed. So the precise claim is: no
# npm config, no curl config file, is ever read; proxy env vars are the one
# environment input this script intentionally respects.
#
# Req 6 (Spec 123, design C9). Mandatory step in the release recipe
# (.kiro/hooks/RELEASE-FLOW.md) — invoked AFTER `npm publish`, never as a
# PR check (Req 6.6: the event it verifies happens after merge, so there
# is nothing at PR time to gate).
#
# Usage:
#   VERSION=<published-version> ./scripts/verify-publish-rail.sh
#   VERSION=<published-version> ./scripts/verify-publish-rail.sh --self-test-host <tarball-url>   # dev convenience only
#
# Exit codes:
#   0  — PASS: version visible on npmjs AND tarball host verified
#   2  — USAGE: VERSION is unset or empty
#   10 — FAIL[version]: not visible on registry.npmjs.org — an HTTP error
#        (incl. 404), a network error reaching the registry, or a returned
#        `version` field that does not match ${VERSION}. On a 404, read the
#        registry's own record before re-running: if the packument
#        (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no
#        `time["<version>"]`, the version is not published yet and the 404 is
#        the correct answer, not indexing lag (15.0.0's R-4: six 404s preceded
#        the publish). Only if `time["<version>"]` is present and the 404
#        persists within a few minutes of it, re-run by hand (the message says so).
#   11 — FAIL[host]: the tarball is served from a host other than registry.npmjs.org
#   12 — self-test only (never reaches PASS; never runs the version check)
#   13 — FAIL[host-empty]: could not read a tarball URL from the registry response
set -euo pipefail

if [ -z "${VERSION:-}" ]; then
  echo "USAGE: VERSION=<version> $0 [--self-test-host <tarball-url>] — VERSION is required and was not set" >&2
  exit 2
fi

PKG="@3fn/core"
PKG_PATH="@3fn%2fcore"   # scoped-package path-escape for the registry API (literal '/' -> %2f)
REGISTRY="https://registry.npmjs.org"

check_host() {      # HARDENING (6.8, augments): takes the tarball URL as input so it is independently bitable
  case "$1" in "${REGISTRY}"/*) ;; *)
    echo "FAIL[host]: tarball for ${PKG}@${VERSION} is served from '$1', not ${REGISTRY} — wrong rail"; exit 11;; esac
}

if [ "${1:-}" = "--self-test-host" ]; then check_host "${2:-}"; echo "SELF-TEST ONLY — no release verified"; exit 12; fi

# REQUIRED FORM (6.2, erratum 2026-09-27): a direct, unauthenticated HTTP GET
# against the public registry's version endpoint. `-q` MUST be first (curl's
# own requirement) so `~/.curlrc` is never read. No `npm` CLI, no `.npmrc`,
# no curl config file is consulted anywhere in this line; proxy env vars ARE
# honoured (see header).
RESPONSE="$(curl -q -sS --max-time 15 -w '\n%{http_code}' "${REGISTRY}/${PKG_PATH}/${VERSION}")" \
  || { echo "FAIL[version]: could not reach ${REGISTRY} for ${PKG}@${VERSION} (network error) — do not announce this release"; exit 10; }
HTTP_CODE="${RESPONSE##*$'\n'}"
BODY="${RESPONSE%$'\n'*}"
if [ "$HTTP_CODE" != "200" ]; then
  echo "FAIL[version]: ${PKG}@${VERSION} is not visible on ${REGISTRY} (HTTP ${HTTP_CODE}) — do not announce this release. Before re-running, read the registry's own record: if the packument (curl -s ${REGISTRY}/${PKG_PATH}) has no time[\"${VERSION}\"], the version is not published yet and this 404 is the correct answer, not indexing lag; only if time[\"${VERSION}\"] is present, re-run by hand within a few minutes of it."
  exit 10
fi

# Parse with `node -e` (guaranteed present; no dependency on `jq`).
RETURNED_VERSION="$(printf '%s' "$BODY" | node -e '
let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
  try { process.stdout.write(String(JSON.parse(d).version || "")); } catch { process.stdout.write(""); }
});')"
if [ "$RETURNED_VERSION" != "$VERSION" ]; then
  echo "FAIL[version]: ${REGISTRY} returned version '${RETURNED_VERSION:-<none>}' for ${PKG}@${VERSION} (mismatch) — do not announce this release"
  exit 10
fi

TARBALL="$(printf '%s' "$BODY" | node -e '
let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
  try { process.stdout.write(String((JSON.parse(d).dist || {}).tarball || "")); } catch { process.stdout.write(""); }
});')"
[ -n "$TARBALL" ] || { echo "FAIL[host-empty]: could not read the tarball URL for ${PKG}@${VERSION} from the registry response — host NOT verified"; exit 13; }
check_host "$TARBALL"
echo "PASS: ${PKG}@${VERSION} visible on npmjs; tarball host verified"
