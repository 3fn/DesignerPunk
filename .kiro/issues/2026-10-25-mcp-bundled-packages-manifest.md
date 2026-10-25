# The MCP Bundles Ship Without a Manifest of the Libraries Inlined Into Them

**Date**: 2026-10-25
**Filed by**: Ada, under rule 10, from the 16.1.0 walk (row 18; `.kiro/issues/2026-10-15-123-cannot-tell-cells.md`, row 5, remedy part (b)). Thurgood could not place the "(b) bundle manifest moves to its own record" line in my walk proposals, so it is filed here.
**Owner**: Ada (the new script is in her scope; `scripts/build-name-contract.ts` and `scripts/build-tool-manifest.ts` are the neighbours it copies the shape of).
**Class**: P3 improvement · owed-act *(set 2026-10-25, Ada, rule 12. Row 5's falsity risk is the audit at release prep, which stays on the cannot-tell record. This record is the class fix: it makes the inlined libraries visible after the fact. No reader is misled by its absence, and no guard is weaker than its claim.)*
**Trigger**: `manual` — its own fixing PR is the event *(rule 1: a P3 that would ride takes `manual`, naming its own fixing PR. Ada, 2026-10-25. Why not `release:next:phase-1`: P0, P1 and P2 records take the release token; this is P3, and the audit it supports is already owed at release prep on row 5.)*
**Grant paths**: none yet. Wiring the script into `package.json` (the `build:mcp` line) is outside Ada's write scope and needs a grant. It is not requested in this record; it is asked for when the fixing PR is cut, and rule 10 requires it to be in a merged record or Peter's direction first.
**Consulted**: none needed — a record of a carried remedy.

---

## What is missing

`build:mcp` (package.json, L149) bundles the two MCP servers with esbuild. The libraries inlined into those bundles are not in the dependency tree a consumer's `npm audit` reads. So a clean audit, or a count like the 37 in `2026-10-15-123-cannot-tell-cells.md` row 5, says nothing about the code that was bundled. The 2026-10-15 attribution found three inlined libraries that carry advisories (`@modelcontextprotocol/sdk` 1.29.0, `fast-uri` 3.1.3, `js-yaml` 4.2.0), and it had to find them by reading the bundles' inputs by hand.

## The class fix

`build:mcp` writes an esbuild `--metafile` digest as `dist/mcp/bundled-packages.json`: the `name@version` of every package inlined into either bundle. It ships in the package. The release record audits it, so a consumer or an auditor can see what `npm audit` cannot.

- **Effort**: 2–3 hours. The script (a metafile reader that resolves each input path to its nearest `package.json`) is Ada's. The `package.json` wiring (the `--metafile` flag and the script call) needs the grant above; `pack-assert.ts` gets one floor line so the file cannot silently stop shipping.
- **Surviving counter-argument**: a manifest says what was bundled, not whether it is vulnerable, so it does not replace `npm audit` at release prep; it only makes the audit possible after the release. It also adds a shipped file that must be kept honest.

## The lockfile disagreement (found at the walk; read at `652074c6b`)

The three lockfiles do not agree on what is inlined. `js-yaml` is 4.2.0 at the root, 3.14.2 in `mcp-server`, and 4.1.1 in `application-mcp-server`. Which tree a bundle resolves depends on where esbuild starts, and today that is read by hand. The manifest would answer it mechanically, per bundle. Until it exists, the audit at release prep on the cannot-tell record names the tree it ran against.

## Cross-references

- `.kiro/issues/2026-10-15-123-cannot-tell-cells.md` — row 5; its remedy part (a), the audit at release prep, stays there.
