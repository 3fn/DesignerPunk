# Inbound from 2026-10-29's queue work: paths that governance reaches but no seat holds, for Spec 131

**Date**: 2026-10-29
**Author**: Thurgood (Spec 131's formalizer), at Peter's direction.
**Peter's words**: chat, relayed by the orchestrator, received before 2026-10-29T23:42:52Z, verbatim: *"Let's go with your lean of (i) and be sure that this issue and the similar one surfaced earlier are tracked with a captured POSSIBLE solution in 131 (possibly as an inbound)."* "(i)" is the per-instance grant for the root `package.json` (instance (a) below). This note is the "captured POSSIBLE solution". It is a candidate for 131's requirements round, **not a decision**.
**Status of 131**: design outline at R3, paused at the edge of requirements (`design-outline.md`). No `requirements.md` exists at this note's base, `cf902a1b2`.
**Consulted**: none needed — an inbound note records open questions, it rules none; the three records' consults are on them.

---

## 1. The class

**Some paths are reached by governance, but no seat's `writeScope` holds them.** Every touch to such a path costs a grant record: a record, a PR to activate it, a fixing PR, an archive. Meanwhile four lists answer "which paths are governance paths?" in four different ways, and none of them is the list of who owns what.

The class is not new to 131. The outline's row 7 (§ 3, write-scope grants) already says "without OWNERS the refusals return", and its row 15 moves scope into OWNERS. What this week adds is evidence that the gap reaches **root files and record directories**, which the outline does not yet name.

## 2. The instances, each with its record

**(a) The root `package.json`.** Its `prepublishOnly` message prints a publish command `scripts/release-publish.ts` refuses, and omits the 5.4 mode. The six-roots ballot (`2026-10-17-standing-write-scope-six-roots` § 2.3) gives Ada `mcp-server/package.json` and nobody the root file. A grep of every `canonical/agents/*.md` finds no `writeScope` entry for it. **Record**: `.kiro/issues/2026-10-29-root-package-json-prepublishonly-grant.md` (P2 `(record)` · grant, owner Ada, `release:next:phase-1`), filed in the same PR as this note.

**(b) `.kiro/docs/releases/**`, the release records' home.** Ballot `2026-10-29-release-claims-pass-record-home` (RATIFIED #556, applied #559) rules the final home as `.kiro/docs/releases/<v>/`, and applies it only "when Spec 131's owners file gives the five writing seats access". Those seats are Stacy, Thurgood, Ada, Lina and Leonardo, and none of them holds `.kiro/docs/**`. Until then the records sit in Spec 123's completion directory, the interim home. **Record**: `.kiro/issues/2026-10-29-release-records-home-switch.md` (P2 `(record)` · owed-act, owner Thurgood, `release:next:phase-1`). That record goes to Peter if 131's requirements leave it out.

**(c) Four lists of "governance paths" that disagree:**
- the Task-Completion-Protocol merge carve-out (§ "The Merge Rule");
- the `**Edit kind**:` path list (ballots README L42; Task-Completion-Protocol § "Branch and PR Conventions");
- the consult-line trigger surfaces (Agent-Directory § "Primary Agent (Orchestrator)");
- the ballots README L31 dated-pointer bound and exempt lists.

**Record**: `.kiro/issues/2026-10-29-governance-paths-four-lists.md` (P2 `(record)` · defect, owner Thurgood). Its trigger is `path:.kiro/specs/131-governance-simplification/requirements.md`, so 131's first requirements commit fires it.

**Adjacent, the same shape for records rather than paths.** Stacy's `.kiro/issues/2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md` (owner Stacy, `release:next:phase-1`) names three claims-audit records with no named home: ARMING's other limbs, SYMPTOM's filename, and the consumer's RELEASE record. A home that is not named cannot be owned. 131 does not have to take this record in, but an owners file that covers record directories would give it somewhere to point.

**An open question, Lina's**: does 131's owners file reach Kiro's generated `allowedPaths`? Her R1 on the outline (`feedback/design-outline.md` § "[LINA R1]", items 4 and 5) says OWNERS renders through `adapters/kiro.ts` into `allowedPaths`. It also says Kiro's `allowedPaths` is static, so **no grant can widen it**: a per-instance grant like (a) authorizes a Kiro seat on paper only. The outline's starting point is § 9's "OWNERS lands no later than the signature deletion" (L232), with § 3 row 7 (L69).

## 3. A POSSIBLE solution (a candidate for the requirements round, not a decision)

131's owners file (the outline's OWNERS) covers root files and record directories as well as governance paths: every committed path a seat writes, including `package.json`, `.kiro/docs/releases/**` and the claims-audit record homes, maps to an owner. It becomes the one list that the four "governance paths" lists collapse into, each of them reading it with a flag (merge carve-out, Edit-kind, consult surface, pointer-bound) instead of keeping its own path list. It renders to both harnesses: the read-only clause on Claude Code, and `allowedPaths` on Kiro. Per-release and per-instance grants then retire with the grant machinery 131 already plans to remove (§ 3 row 7, replaced by the F-2 delegation ballot over computed reach).

**Surviving counter**: an owners file that grows to cover everything becomes the thing it replaced. It would be one more large law surface that every change touches, with its own drift between the file and the paths that actually exist, and its own grant-shaped exceptions for the paths nobody wants. And someone has to own the owners file: if that is one seat, every seat's scope moves through that seat's PRs; if that is Peter, every new root file waits on him. Neither question is answered here. A smaller alternative is to keep the four lists and add only the missing root files and record directories to seats' `writeScope`. That fixes (a) and (b) and leaves (c) as it is.

## 4. What this note asks of 131

At requirements, under `governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec", **take each of the three records in, or leave each out with a reason**: (a) `2026-10-29-root-package-json-prepublishonly-grant.md`, (b) `2026-10-29-release-records-home-switch.md`, (c) `2026-10-29-governance-paths-four-lists.md`, with a disposition line for each in the requirements feedback round. Stacy's record and Lina's question are named so they are not missed. Taking them in is the requirements round's call, not this note's.

The instance (a) is being fixed now, under its grant, whatever 131 decides. The class is what 131 decides.
