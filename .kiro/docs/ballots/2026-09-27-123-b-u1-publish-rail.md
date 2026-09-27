# Ballot Measure: B-U1 — the publish-rail guard's release-recipe step and register row

**Date**: 2026-09-27
**Drafted by**: Thurgood (Sonnet), PRIMARY on Spec 123 Task 7
**Status**: **DRAFT** — not yet ratified. Per the record-first protocol (`.kiro/docs/ballots/README.md`), the edits in § 3 below are NOT YET APPLIED to `.kiro/hooks/RELEASE-FLOW.md` or `governance/classification-map.md`. They apply only after this file's `Status` reads `RATIFIED (Peter, <date>)`, committed, per the protocol's step 1.
**Origin**: Spec 123 Task 7 (design C9; requirements.md Req 6, esp. 6.4–6.7; tasks.md Task 7's `B-U1` criterion)
**Unit**: rides Spec 123's U1 branch (`task/123-u1-substrate`); the register row and RELEASE-FLOW step are U1 artifacts, but — per DD13's three-way ballot split and the standing governance carve-out (`Task-Completion-Protocol.md` § "The Merge Rule") — the two governance-law files this ballot touches (`.kiro/hooks/RELEASE-FLOW.md`, `governance/classification-map.md`) are Peter-merged and require this record-first ballot, distinct from the T1-(B) per-parent write-scope grant that authorizes the *editing*, not the *ratification*.
**Reviewed**: not yet — this DRAFT is presented for review now. **Stacy is a required reviewer of § 4 (the register row)**, per the coordinating brief. Peter rules on ratification per the record-first protocol.
**Cross-references**: `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md` (T1-(B); **RATIFIED Peter 2026-09-26; merged to `main` at commit `314dbaa7`, PR #199**), which this ballot's write-scope authority rides — verified merged and RATIFIED at Task 7.0, before this draft was authored.

---

## 1. What this ballot carries

Per tasks.md's DD13 split ("DD13's ballot splits into three: **B-U1** (publish rail), B-U2 (…), B-U4 (…)"), **B-U1 carries exactly two edits**, both required by Requirement 6 (the publish-rail guard):

1. **A mandatory step in the release recipe** (`.kiro/hooks/RELEASE-FLOW.md`) that invokes `scripts/verify-publish-rail.sh` after publish and pastes its output to a named location (Req 6.4, 6.7).
2. **A register row** in `governance/classification-map.md` recording the guard's owner and `check_state`, with its post-merge disposition **stated explicitly as the ADJUDICATED case** — so a future `audit:coverage-map` / ARMING pass reads this row as accounted-for, never as an unmarked gap inviting "repair" into a PR check, which Req 6.6 forbids outright (Req 6.5; Stacy R2 S-A4).

Both the script (`scripts/verify-publish-rail.sh`) and its three committed bites (`scripts/__bites__/`) are **code artifacts**, not governance law — they are built directly under the T1-(B) grant (Task 7's Primary Artifacts list) and need no ballot. This ballot covers only the two **governance-law** edits.

## 2. Why `governance/release-management-system.md` needs no edit

Req 6.4 names the guard as a mandatory step in "the release recipe (`.kiro/hooks/RELEASE-FLOW.md` + `governance/release-management-system.md`)". `release-management-system.md` does not duplicate the operational sequence — its own text says so: *"The operational sequence lives in `.kiro/hooks/RELEASE-FLOW.md`"* (line 35), and its § "Publish per RELEASE-FLOW.md" step already delegates by reference. Adding the guard step to `RELEASE-FLOW.md` therefore makes it a mandatory step in `release-management-system.md`'s release recipe too, by the pointer already in place — no second edit site exists to carry the same text into, and creating one would be the S-6 copy-set violation (byte-identical copies of an operative step, forbidden by the same reasoning the T1-(B) ballot's § 7 applied to its own TCP pointer). **Recorded here so it is not later mistaken for an omission.**

## 3. The RELEASE-FLOW.md edit (verbatim, to apply on ratification)

**Site**: `.kiro/hooks/RELEASE-FLOW.md` § "The sequence", appended as a new step 6 after the existing step 5 ("Publish from merged `main`").

**Before** (current step 5, unchanged, shown for anchor):

```
5. **Publish from merged `main`**: `git switch main && git pull`, then `npm publish`
   (per the dual-registry playbook where applicable).
   - `prepublishOnly` runs `build` + `check:drift` + `verify:token-index-clean` —
     if the freshly-built `token-index/` differs from what's committed, **publish
     aborts loudly before anything ships** (the fix: go back to step 2's regeneration
     on a branch; the release PR was incomplete).
   - `postpublish` never pushes. If `token-index/` somehow changed during publish
     anyway, it prints a warning telling you to route the diff through a PR.
```

**After** (step 5 unchanged; new step 6 appended):

```
5. **Publish from merged `main`**: `git switch main && git pull`, then `npm publish`
   (per the dual-registry playbook where applicable).
   - `prepublishOnly` runs `build` + `check:drift` + `verify:token-index-clean` —
     if the freshly-built `token-index/` differs from what's committed, **publish
     aborts loudly before anything ships** (the fix: go back to step 2's regeneration
     on a branch; the release PR was incomplete).
   - `postpublish` never pushes. If `token-index/` somehow changed during publish
     anyway, it prints a warning telling you to route the diff through a PR.
6. **Run the publish-rail guard and paste its result** (Req 6.4, 6.6, 6.7 — Spec 123
   C9; `governance/classification-map.md` § "publish-rail-guard"):
   ```bash
   npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null \
     VERSION=<published-version> ./scripts/verify-publish-rail.sh
   ```
   Paste the **full output, including the exit code**, to
   `docs/releases/<v>/publish-verification.log` — the named location the RELEASE
   claims pass reads to determine liveness (Req 6.7: a guard run is an event in the
   release *process*, not a diff in the delta, so without a paste target the pass has
   nothing to read). A non-zero exit means the release did not land where consumers
   install from: **do not announce it.** Fix and re-run before proceeding.
   This step is **mandatory**, not a documented instruction — the guard is a
   committed script, not a checklist reminder — and it is **never a PR check**
   (Req 6.6: the event it verifies, registry visibility, happens after merge, so
   there is nothing at PR time to gate). The hermetic invocation env vars
   (`npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null`, Leonardo
   A15) keep the check from reading a developer's local `.npmrc` scope mapping.
```

## 4. The register row (verbatim, to apply on ratification) — **Stacy's review requested**

**Site**: `governance/classification-map.md` § "Entries", new entry appended in commit order (after `tasks-row-write-scope-grant`).

```yaml
### publish-rail-guard

\`\`\`yaml
rule: "Every @3fn/core release SHALL be verified live on registry.npmjs.org — including the tarball's actual host, not only the version string — before it is announced; verification runs as a mandatory step in the release recipe (RELEASE-FLOW.md step 6), never as a PR check, because the event it verifies (registry visibility) cannot exist before the release it verifies"
boundary_call:
  class: functional
  rationale: "Registry visibility and tarball host are machine-checkable facts with named, per-assertion exit codes (10 version / 11 host / 12 self-test / 13 host-empty) and a scope-explicit npm view form measured to beat an npmrc scope map (Req 6.2) — no judgment enters the predicate. The check is barrier-shaped but structurally post-merge: nothing exists to gate at PR time (Req 6.6)"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  armed_at: tool-time
  checks: ["scripts/verify-publish-rail.sh (invoked as a mandatory step in .kiro/hooks/RELEASE-FLOW.md's release sequence, step 6; three recorded bites under scripts/__bites__/ prove the required 6.3 line, the VERSION-mismatch red (exit 10), and the host check firing through the PRODUCTION path via a PATH-shimmed npm (exit 11) — Task 7.2; armed evidence is the recorded red, not PR-gate registration, per Req 6.6)"
education:
  disposition: "AUTHOR: RELEASE-FLOW.md step 6 (this ballot § 3) and this row are the two artifacts Req 6.4/6.5 require; both are new — no prose predecessor to prune. ADJUDICATED, STATED EXPLICITLY (Req 6.5, Stacy R2 S-A4): this row's post-merge disposition is recorded here, in-line, so a future audit:coverage-map / ARMING pass reads it as accounted-for rather than an unmarked row inviting 'repair' into a required PR check — which Req 6.6 forbids outright. LIVENESS SPLIT (Req 6.7): whether the guard actually ran on a given release, and what it returned, is read by Stacy's RELEASE claims pass from the pasted docs/releases/<v>/publish-verification.log — never by this row or by re-deciding the guard's verdict. That split mirrors completion-criteria-parity's owner/audit split (this register's own entry, history note dated 2026-09-19): owner records who keeps the INSTRUMENT true; the claims pass records whether it FIRED. GitHub Packages, the dual-publish's mirrored target, is deliberately absent from every consumer-facing surface this row's checks touch (Req 6.1) — a pre-123 exception, found during this ballot's straggler sweep and NOT fixed here (out of Task 7's write scope), is reported separately rather than silently left unrecorded."
history:
  - { date: 2026-09-27, change: "entry created at the B-U1 ballot (.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md), Spec 123 Task 7.3. Cross-references the T1-(B) ballot (.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md, RATIFIED Peter 2026-09-26, merged 314dbaa7, PR #199), whose grant authorized this row's drafting but confers no ratification authority of its own (T1-(B) clause 5) — this row's law home is this ballot, Peter-merged under the standing governance carve-out. Non-substring sweep at authoring: 31 live ids + this one, relations 0, dupes 0", by: thurgood }
\`\`\`
```

*(The `\`\`\`` escaping above is deliberate — this ballot is itself inside a fenced fragment when rendered in some viewers; the register file's actual committed form uses a single, unescaped triple-backtick fenced YAML block per the Entry Schema, exactly as every other entry in that file. Applying this row means copying the YAML body between the escaped fences into a real \`\`\`yaml block under a real `### publish-rail-guard` heading — not copying the escape characters.)*

## 5. The straggler sweep (Req: ballot edit discipline, `README.md` § "Conventions")

Swept for other references this ballot's edit-class might need to touch:

- **`governance/release-management-system.md`**: no edit needed — it delegates by reference (§ 2 above).
- **`governance/classification-map.md`**: non-substring sweep for the new id run at authoring — **31 live ids + `publish-rail-guard`, relations 0, dupes 0** (§ 4's history line carries the count).
- **`docs/releases/`**: no existing release-note file references a publish-rail guard (grep: 0 hits for `verify-publish-rail` under `docs/releases/`); the paste-target convention (`docs/releases/<v>/publish-verification.log`) is new as of this ballot and needs no backfill — it applies starting with release 1.
- **`.kiro/hooks/RELEASE-FLOW.md`**: grep for `publish-rail` / `verify-publish-rail` in the file pre-edit → 0 hits (confirms this is a net-new step, not a rename of an existing one).

**One finding surfaced by the sweep, recorded rather than silently fixed (out of Task 7's write scope)**: `governance/DesignerPunk-Integration-Guide.md` §§ "Prerequisites" and "1. Install" (lines ~22–47) currently document installing `@3fn/core` **from GitHub Packages** via a committed `.npmrc` (`@designerpunk:registry=https://npm.pkg.github.com` — note the scope string doesn't even match the package's real `@3fn` scope, a second, independent defect in the same lines). This is a live violation of **Req 6.1**: *"GitHub Packages SHALL NOT appear in any consumer-facing document, template or scaffold."* It predates Spec 123, was not in Task 2.6's named line list (L202/L454/L576), and is not a Task 7 Primary Artifact. **Routed, not fixed here**: reported to the orchestrator in this task's handback for routing — most likely Task 19 (`19.4`, which reconciles the Integration Guide into the served install doc) or a standalone issue if Task 19's scope doesn't already cover it.

## 6. Counter-argument (fold-back applied)

- **Folded in**: the register row states its ADJUDICATED post-merge disposition in-line (not left implicit), precisely because Req 6.5/Stacy's S-A4 named the failure mode (an unmarked row inviting a future ARMING "repair" into a forbidden PR check) — the row is written to make that misreading structurally harder, not just technically avoidable.
- **What survives, stated plainly**:
  - **(1) A tool-time barrier has no platform-enforced trigger.** Unlike a PR-gate check, nothing stops a release owner from skipping step 6 by hand — the guard's "mandatory" status is a documented convention plus Stacy's post-hoc RELEASE claims-pass read, not a mechanical block on the release itself. This is the same residual DD12 already names for the host-assertion pattern, one layer up: the enforcement is real but it is a *process* enforcement, not a *platform* one, until/unless a future release-tooling layer wires it as a hard precondition.
  - **(2) The register row's `owner: thurgood` / Stacy's-claims-pass-reads-liveness split is a convention borrowed from `completion-criteria-parity`, not a schema-enforced distinction.** A future reader could conflate "owner keeps the instrument true" with "owner verifies each release's liveness" if the education-disposition prose isn't read in full — the risk is a documentation-discoverability one, not a structural one.

## 7. What happens next

1. **This DRAFT is presented for review** — Stacy reviews § 4 (the register row); any agent may comment on §§ 2–3.
2. **Peter rules**: ratify, modify, or reject, per the ballots README's Lifecycle.
3. **On ratification**: the session that receives it updates `Status` to `RATIFIED (Peter, <date>)` and commits that record **before** applying § 3's `RELEASE-FLOW.md` edit and § 4's register row (record-first, per the protocol).
4. **After application**: `rebuild_index` runs (classification-map is docs-MCP-served); this ballot is added to `.kiro/docs/ballots/README.md` § "Ballots on record".
