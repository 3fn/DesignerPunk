# Ballot Measure: B-U1 — the publish-rail guard's release-recipe step and register row

**Date**: 2026-09-27 (drafted); **reworked twice same day** — once after Stacy's first review, once after her re-check's five non-blocking fixes
**Drafted by**: Thurgood (Sonnet), PRIMARY on Spec 123 Task 7
**Status**: **DRAFT** — not yet ratified. Per the record-first protocol (`.kiro/docs/ballots/README.md`), the edits in § 3–4 below are NOT YET APPLIED to `.kiro/hooks/RELEASE-FLOW.md` or `governance/classification-map.md`. They apply only after this file's `Status` reads `RATIFIED (Peter, <date>)`, committed, per the protocol's step 1.
**Origin**: Spec 123 Task 7 (design C9; requirements.md Req 6, esp. 6.4–6.7; tasks.md Task 7's `B-U1` criterion)
**Unit**: rides Spec 123's U1 branch (`task/123-u1-substrate`); the register row and RELEASE-FLOW step are U1 artifacts, but — per DD13's three-way ballot split and the standing governance carve-out (`Task-Completion-Protocol.md` § "The Merge Rule") — the two governance-law files this ballot touches (`.kiro/hooks/RELEASE-FLOW.md`, `governance/classification-map.md`) are Peter-merged and require this record-first ballot, distinct from the T1-(B) per-parent write-scope grant that authorizes the *editing*, not the *ratification*.
**Reviewed**: **Stacy's first review** (`task-7-3-stacy-review.md`) returned ACCEPT-WITH-CHANGES with two Critical findings (R1-1, R1-2). **Peter ruled on R1-1: drop the `npm` CLI entirely; the guard queries the registry directly over HTTP.** **Stacy's re-check (same doc, "Re-check addendum," commit `2d83f266`) returned ACCEPT** — B-U1 is ready for Peter's ratification ruling — with five non-blocking items to fix first "so Peter ratifies the exact text that lands" (Peter's framing). **This revision applies all five.** On the `armed` fork her first review left open, **Stacy ruled `check_state: armed` STANDS, with one binding condition** (§ 4's note, § 6 item (3)). **Peter now rules on ratification.**
**Cross-references**: `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md` (T1-(B); **RATIFIED Peter 2026-09-26; merged to `main` at commit `314dbaa7`, PR #199**), which this ballot's write-scope authority rides — verified merged and RATIFIED at Task 7.0, before this draft was authored. `.kiro/issues/2026-09-27-integration-guide-install-section-stale.md` (PR #214, merged to `main`, routed to Task 19.4) — the committed record for the Req 6.1 finding this row cites honestly rather than claiming coverage of.

---

## 0. What changed in this revision (for Stacy's re-check)

Stacy's review found two Critical defects in the first draft and four required corrections to the register row. Peter ruled on the first Critical directly. This revision:

1. **R1-1 [Critical, Peter ruled]** — the `npm view --@3fn:registry=...` form plus its required hermetic `npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null` env vars made npm 10.9.3 exit before resolving config, false-redding every release; even fixed, the isolation would not have excluded the project's own `.npmrc` scope mapping. **Peter's ruling: drop `npm` entirely.** The guard now issues a direct, unauthenticated HTTP GET against `registry.npmjs.org`'s version endpoint (`curl`), parsing `version` and `dist.tarball` with `node -e`. Applied to: `scripts/verify-publish-rail.sh` (rewritten), design.md C9 (erratum), requirements.md Reqs 6.2/6.3/6.8 (errata), tasks.md Task 7 criteria (erratum), this ballot §§ 2–3.
2. **R1-2 [Critical]** — the paste target `docs/releases/<v>/publish-verification.log` is gitignored (`*.log`) and step 6 named no route from a post-publish working tree to protected `main`. Fixed: renamed to `.txt`; § 3 now names the release-record PR route.
3. **R1-3 [High]** — `checks` now states what `tool-time` actually blocks (it blocks nothing mechanically; a human reads the result).
4. **R1-4 [Medium]** — education now names the real ARMING-event reader and `EXPECTED_CONTEXTS`, not `audit:coverage-map` (Stacy's own requirements-round imprecision, which she flagged and I've corrected).
5. **R1-5 [Medium]** — the Req 6.1 sentence now states plainly that this row does **not** verify 6.1, and cites the committed issue (`.kiro/issues/2026-09-27-integration-guide-install-section-stale.md`) rather than an unrecorded "reported separately."
6. **R1-6 [Low]** — the sweep count corrected to **30 live ids + this one (31)**.
7. **R1-7 [Recommended]** — folded into `boundary_call.rationale`: the ordering half of the rule ("before it is announced") is operational, not functional, per the `npm-test-before-complete` precedent.
8. **R1-8 [Recommended, routed as a design residual, not a B-U1 blocker]** — noted here for the record: `check_version`'s old npm-based form treated "npm failed" the same as "not visible"; the new HTTP form narrows this (a real network failure gets its own message, distinct from a real 404), but a curl-level failure and an HTTP 404 both still resolve to the same `FAIL[version]`/exit 10 outcome, which Stacy's finding accepted as adequate for a script that fails loud and fails closed either way.
9. **CHANGELOG.md** (Review 2, C1–C10): all ten corrections applied, including deleting the `### Publishing` section entirely (C3, fork (a) — recommended) since it named GitHub Packages inside a file that ships in the package, and no consumer-facing behavior changed. No disagreements — see Task 7's parent report for the one-line confirmation.

### 0-bis. The second rework (Stacy's re-check, five non-blocking fixes — all applied, no ratification pending on them)

Stacy's re-check ACCEPTED B-U1 outright and named five items to land **before** Peter's ratification, "so he ratifies the exact text that lands":

1. **The 7.4 doc overstated Req 6.1 coverage** ("no consumer-facing surface names GitHub Packages") when the Integration Guide still does (issue #214). Fixed: narrowed to "`CHANGELOG.md` names no GitHub Packages surface (Req 6.1)" in `task-7-4-completion.md`.
2. **`curl -q` as the first argument**, so `~/.curlrc` is never read either (the low note: `.npmrc` immunity was exact, but "hermetic-from-config" as a phrase overstated it — `curl` has its own config file). Reworded everywhere the phrase appeared: the script header, this ballot, the register row's history, design.md C9's erratum, and requirements.md's Req 6.8 erratum — the precise claim is now "no npm config, no curl config file; standard proxy env vars are DELIBERATELY HONOURED, not overridden." Re-ran the real `14.1.0` PASS after the `-q` change and re-committed `pass-real-version.txt`.
3. **Unset `VERSION`** previously fell through to bash's own "unbound variable," exit `1`, under `set -u` — a real contract gap Stacy named as low-severity but worth closing. Fixed: a named `USAGE` check at the top of the script, exit `2` (chosen to sit outside 10–13 and outside bash's own reserved 1/2 collision zone — 2 is bash's own conventional "misuse of shell builtins" code, which is exactly what this is). Documented in the script header, design.md C9's exit table, and this ballot's step-6/row text. A fourth bite added: `scripts/__bites__/bite-4-unset-version-exit2.txt`.
4. **The 404-after-publish note**, in exactly two places, both short, neither adding a retry: appended to the `FAIL[version]` HTTP-error message itself, and one matching sentence in § 3's step-6 text below. The registry's per-version endpoint can briefly 404 right after `npm publish`; Stacy's re-check named this as a real liveness/usability risk (not an arming defect) that survives her `armed` ruling.
5. **Row wording**: "three recorded bites" → the row's `checks` field now names two recorded reds (exit 10, exit 11) plus one committed measurement (the live PASS), and separately names the new fourth bite (exit 2). "Bite" is reserved for a recorded red, per Stacy's precise register usage.

**Stacy's `armed` ruling** (the fork her first review surfaced, § 6 item (3) of the prior revision): **`check_state: armed` STANDS.** Her reasoning: both her original conditions are met (row and step 6 land in one commit; R1-1 is fixed, evidenced by a real PASS), and — unlike `completion-criteria-parity`, whose flip waits on a *separate*, later, Q2-gated decision — this row's arming has no such separate gate; the moment the row and step 6 land together, the guard is wired into the mandatory recipe. **Binding condition, hers, carried forward verbatim**: *if application is ever split, with the row committed without step 6, the row lands as `proposed`. Only the same-commit case earns `armed`.* This binds whoever applies § 3–4 on ratification (see § 7).

---

## 1. What this ballot carries

Per tasks.md's DD13 split ("DD13's ballot splits into three: **B-U1** (publish rail), B-U2 (…), B-U4 (…)"), **B-U1 carries exactly two edits**, both required by Requirement 6 (the publish-rail guard):

1. **A mandatory step in the release recipe** (`.kiro/hooks/RELEASE-FLOW.md`) that invokes `scripts/verify-publish-rail.sh` after publish, and commits its output to a named, git-trackable location via a small follow-up PR (Req 6.4, 6.7).
2. **A register row** in `governance/classification-map.md` recording the guard's owner and `check_state`, with its post-merge disposition **stated explicitly** — so a future ARMING-event reader treats this row as accounted-for, never as an unmarked gap inviting "repair" into a PR check, which Req 6.6 forbids outright (Req 6.5).

Both the script (`scripts/verify-publish-rail.sh`) and its committed bites (`scripts/__bites__/`) are **code artifacts**, not governance law — they are built directly under the T1-(B) grant (Task 7's Primary Artifacts list) and need no ballot. This ballot covers only the two **governance-law** edits.

## 2. Why `governance/release-management-system.md` needs no edit

Req 6.4 names the guard as a mandatory step in "the release recipe (`.kiro/hooks/RELEASE-FLOW.md` + `governance/release-management-system.md`)". `release-management-system.md` does not duplicate the operational sequence — its own text says so: *"The operational sequence lives in `.kiro/hooks/RELEASE-FLOW.md`"* (line 35), and its § "Publish per RELEASE-FLOW.md" step already delegates by reference. Adding the guard step to `RELEASE-FLOW.md` therefore makes it a mandatory step in `release-management-system.md`'s release recipe too, by the pointer already in place — no second edit site exists to carry the same text into, and creating one would be the S-6 copy-set violation. **Unaffected by the R1-1 HTTP rewrite** — this reasoning holds regardless of what step 6's command is.

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
6. **Run the publish-rail guard and land its result via a release-record PR**
   (Req 6.4, 6.6, 6.7 — Spec 123 C9; `governance/classification-map.md` §
   "publish-rail-guard"):
   ```bash
   VERSION=<published-version> ./scripts/verify-publish-rail.sh
   ```
   This queries `registry.npmjs.org` directly over HTTP — no `npm` CLI, no
   `.npmrc` of any kind is read. A non-zero exit means the release did not land
   where consumers install from: **do not announce it.** Fix and re-run before
   proceeding. **If it fails within the first few minutes of publishing, the
   registry may just not have indexed the version yet — wait a minute and
   re-run by hand; this step never retries automatically.**

   **Land the result on `main`** — `main` is branch-protected, so a working-tree
   file is not enough. Paste the **full output, including the exit code**, to
   `docs/releases/<v>/publish-verification.txt` (`.txt`, not `.log` — this
   repo's `*.log` gitignore rule would otherwise silently drop the file, the
   same trap Task 7.1's own bites hit once already) and open a small
   **release-record PR** for it, using the same mechanism step 3 already
   names (`gh pr create`, or `./.kiro/hooks/complete-task.sh` for a spec-task
   release) — Peter merges it like any other PR. This is a SECOND, POST-publish
   PR, distinct from step 3's PRE-publish release PR: step 3's PR cannot carry
   this file because the guard has nothing to verify until after step 5's
   publish has happened.

   This step is **mandatory**, not a documented instruction — the guard is a
   committed script, not a checklist reminder — and it is **never a PR check**
   (Req 6.6: the event it verifies, registry visibility, happens after merge,
   so there is nothing at PR time to gate). The RELEASE claims pass reads the
   committed `.txt` file to determine liveness (Req 6.7): a guard run is an
   event in the release *process*, not a diff in the release *delta*, so
   without a committed record the pass has nothing to read.
```

## 4. The register row (verbatim, to apply on ratification) — **Stacy re-checks**

**Site**: `governance/classification-map.md` § "Entries", new entry appended in commit order (after `tasks-row-write-scope-grant`).

```yaml
### publish-rail-guard

\`\`\`yaml
rule: "Every @3fn/core release SHALL be verified live on registry.npmjs.org — including the tarball's actual host, not only the version string — before it is announced; verification runs as a mandatory step in the release recipe (RELEASE-FLOW.md step 6), never as a PR check, because the event it verifies (registry publication) cannot exist before the release it verifies"
boundary_call:
  class: functional
  rationale: "The artifact half is a mechanical fact: a direct, unauthenticated HTTP GET against registry.npmjs.org's version endpoint, parsed with node -e, with named per-assertion exit codes (10 version / 11 host / 12 self-test / 13 empty-tarball) — no judgment enters the predicate, and no npm CLI or .npmrc is ever consulted (erratum 2026-09-27, Stacy R1-1: the earlier npm-view form plus its required hermetic env vars broke every release and would not have been hermetic even fixed). The ORDERING half of the rule ('before it is announced'; 'runs as a mandatory step') is OPERATIONAL, not functional (Stacy R1-7, by this register's own npm-test-before-complete precedent) — carried by the committed evidence file and the RELEASE claims pass, not by this check itself"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  armed_at: tool-time
  checks: ["scripts/verify-publish-rail.sh, invoked as a mandatory step in .kiro/hooks/RELEASE-FLOW.md's release sequence, step 6 (landing in the same commit as this row); under scripts/__bites__/: one COMMITTED MEASUREMENT (a real PASS against the live registry for 14.1.0, pass-real-version.txt) plus THREE RECORDED BITES (a real HTTP-404 red for VERSION=99.99.99, exit 10; the host check firing through the PRODUCTION path via a PATH-shimmed curl, exit 11; an unset VERSION, exit 2, the named USAGE error) — Task 7.2. HONEST REACH (Stacy R1-3, required in-field): tool-time here = the script's non-zero exit halts the human-run recipe before announcement — it runs after publish (it cannot un-publish), no downstream tool consumes its exit code, and a skipped run is not mechanically prevented; a skipped or failed run is detected post hoc by Stacy's RELEASE claims pass reading the committed evidence file (see education). A 404 in the first minutes after publish may be registry indexing lag, not a real failure — the script's own message says so, and the fix is a manual re-run, never an automatic retry."]
education:
  disposition: "AUTHOR: RELEASE-FLOW.md step 6 (this ballot § 3) and this row are the two artifacts Req 6.4/6.5 require, landing in the same commit; both are new — no prose predecessor to prune. ADJUDICATED, STATED EXPLICITLY (Req 6.5): a future ARMING-event reader of this register — and verify-gate-registration.sh's EXPECTED_CONTEXTS arithmetic, from which armed_at: tool-time already excludes this row (audit:coverage-map does NOT read this register at all — Stacy R1-4, correcting her own earlier requirements-round S-A4 imprecision at feedback/requirements.md:420, which had named audit:coverage-map as the reader) — should read this row as accounted-for, never as an unmarked gap inviting repair into a required PR check, which Req 6.6 forbids outright. LIVENESS SPLIT (Req 6.7): whether the guard actually ran on a given release, and what it returned, is read by Stacy's RELEASE claims pass from the committed docs/releases/<v>/publish-verification.txt (renamed from .log, erratum 2026-09-27, Stacy R1-2 — the gitignored extension would have silently dropped every release's evidence file) — never by this row, and never by re-deciding the guard's verdict. REQ 6.1 IS NOT VERIFIED BY THIS ROW (Stacy R1-5, correcting the prior draft's overclaim): this check's own queries touch only the public registry, never a consumer-facing document, so it establishes nothing about whether GitHub Packages appears in one. Two live Req 6.1 findings exist independently of this check, both routed rather than left as an unrecorded 'reported separately': governance/DesignerPunk-Integration-Guide.md's install section (committed issue: .kiro/issues/2026-09-27-integration-guide-install-section-stale.md, PR #214, routed to Task 19.4) and CHANGELOG.md's now-DELETED Publishing section (Stacy Review 2, C3 — removed in this same Task 7 rework rather than reworded, since no consumer-facing behavior belonged in that file to begin with)"
history:
  - { date: 2026-09-27, change: "entry created at the B-U1 ballot (.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md), Spec 123 Task 7.3, REWORKED same day after Stacy's first review (completion/task-7-3-stacy-review.md, ACCEPT-WITH-CHANGES). R1-1 [Critical, Peter ruled]: the npm-view form + its required hermetic npm_config_* env vars made npm 10.9.3 exit before resolving config, false-redding a live release (reproduced by Stacy at head); even fixed, the isolation would not have excluded the project's own .npmrc @3fn scope mapping. Peter's ruling: drop npm entirely for a direct HTTP GET against registry.npmjs.org, parsed with node -e — no npm CLI, no npmrc, ever consulted. R1-2 [Critical]: the .log paste target is gitignored and named no route to protected main — fixed via the .txt rename and a named post-publish release-record PR (RELEASE-FLOW.md step 6). R1-3..R1-7 applied as required/recommended (see this ballot § 0). Cross-references the T1-(B) ballot (.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md, RATIFIED Peter 2026-09-26, merged 314dbaa7, PR #199). Non-substring sweep at authoring: 30 live ids + this one (31 total), relations 0, dupes 0", by: thurgood }
  - { date: 2026-09-27, change: "REWORKED a second time same day, after Stacy's re-check (completion/task-7-3-stacy-review.md, 'Re-check addendum,' commit 2d83f266) returned ACCEPT with five non-blocking fixes, applied here: (1) curl -q added as the script's first argument, so ~/.curlrc is never read either — the phrase 'hermetic-from-config' is corrected wherever it appeared (this history line included) to the precise claim: no npm CLI, no npm config, no curl config file is read, and standard proxy env vars are DELIBERATELY HONOURED, not overridden; (2) an unset VERSION now exits 2 (a named USAGE error) instead of bash's own unbound-variable exit 1, with a fourth bite recorded; (3) the FAIL[version] message and RELEASE-FLOW.md step 6's own text each carry one short, no-auto-retry note that a 404 in the first minutes after publish may be registry indexing lag; (4) checks no longer calls the live PASS a 'bite' — it is a committed measurement, distinct from the three recorded reds. STACY'S ARMED RULING (the fork her first review surfaced): check_state: armed STANDS — both her conditions are met (row + step 6 land in one commit; R1-1 fixed, evidenced by a real PASS) and, unlike completion-criteria-parity, no separate later gate exists here. BINDING CONDITION, hers, carried verbatim: if application is ever split, with the row committed without step 6, the row lands as proposed — only the same-commit case earns armed. Re-ran the real 14.1.0 PASS after the -q change; re-committed pass-real-version.txt", by: thurgood }
\`\`\`
```

*(The `\`\`\`` escaping above is deliberate — this ballot is itself inside a fenced fragment when rendered in some viewers; the register file's actual committed form uses a single, unescaped triple-backtick fenced YAML block per the Entry Schema, exactly as every other entry in that file. Applying this row means copying the YAML body between the escaped fences into a real \`\`\`yaml block under a real `### publish-rail-guard` heading — not copying the escape characters.)*

## 5. The straggler sweep (Req: ballot edit discipline, `README.md` § "Conventions")

Swept for other references this ballot's edit-class might need to touch:

- **`governance/release-management-system.md`**: no edit needed — it delegates by reference (§ 2 above).
- **`governance/classification-map.md`**: non-substring sweep for the new id, re-run at this revision — **30 live ids + `publish-rail-guard`, relations 0, dupes 0 (31 total `### ` headings including the one non-entry "Illustrative Example" heading, per Stacy R1-6's correction of the first draft's miscount)**.
- **`docs/releases/`**: no existing release-note file references a publish-rail guard; the paste-target convention (`docs/releases/<v>/publish-verification.txt`) is new as of this ballot and needs no backfill — it applies starting with release 1.
- **`.kiro/hooks/RELEASE-FLOW.md`**: grep for `publish-rail` / `verify-publish-rail` in the file pre-edit → 0 hits (confirms this is a net-new step, not a rename of an existing one).

**One finding surfaced by the first-draft sweep, now discharged rather than left "reported separately"** (Stacy R1-5 called this out by name): `governance/DesignerPunk-Integration-Guide.md` §§ "Prerequisites" and "1. Install" document installing `@3fn/core` from **GitHub Packages** via a committed `.npmrc` with the **wrong scope** (`@designerpunk`, not `@3fn`) — a live Req 6.1 violation, predating Spec 123. **Now a committed record**: `.kiro/issues/2026-09-27-integration-guide-install-section-stale.md` (PR #214, merged to `main`, routed to Task 19.4).

## 6. Counter-argument (fold-back applied)

- **Folded in**: the register row states its post-merge disposition and its Req 6.1 non-coverage in-line (not left implicit), and the checks field states its tool-time reach in-field rather than only in this ballot's own prose — precisely because Stacy's review named these as the failure modes a future reader would otherwise hit.
- **What survives, stated plainly**:
  - **(1) A tool-time barrier has no platform-enforced trigger.** Nothing stops a release owner from skipping step 6 by hand — the guard's "mandatory" status is a documented convention plus Stacy's post-hoc RELEASE claims-pass read, not a mechanical block on the release itself. This is the same residual DD12 already names for the host-assertion pattern, one layer up.
  - **(2) The register row's `owner: thurgood` / Stacy's-claims-pass-reads-liveness split is a convention borrowed from `completion-criteria-parity`, not a schema-enforced distinction.** A future reader could conflate "owner keeps the instrument true" with "owner verifies each release's liveness" if the education-disposition prose isn't read in full.
  - **(3) [RESOLVED by Stacy's re-check — no longer a live fork]** The register row's `check_state: armed` was drafted to describe the state true **upon application**, and Stacy's first review asked whether that was honestly claimable before application. **Her ruling: `armed` STANDS.** Both her conditions are met (row and step 6 land in one commit; R1-1 is fixed, evidenced by a real committed PASS), and — unlike `completion-criteria-parity`, whose required-flip waits on a *separate*, later, Q2-gated decision — this row's arming has no such separate gate: the moment the row and step 6 land together, the guard IS wired into the mandatory recipe. **What survives as a binding condition, hers, not this draft's**: if application is ever split — the row committed in one commit, step 6 in a later, different one — the row lands as `proposed` instead. Only the same-commit case earns `armed`. Whoever applies § 3–4 on ratification must apply them together, in one commit, or demote the row.

## 7. What happens next

1. **Stacy re-checked and ACCEPTED** (`task-7-3-stacy-review.md`, "Re-check addendum," commit `2d83f266`) — B-U1 is ready for Peter's ratification ruling. Her five non-blocking fixes are applied in this revision (§ 0-bis), and her `armed` ruling with its binding condition is recorded (§ 4's row, § 6 item (3)).
2. **Peter rules**: ratify, modify, or reject, per the ballots README's Lifecycle. This is the only step left before application.
3. **On ratification**: the session that receives it updates `Status` to `RATIFIED (Peter, <date>)` and commits that record **before** applying § 3's `RELEASE-FLOW.md` edit and § 4's register row (record-first, per the protocol). **Both edits MUST land in the same commit** — Stacy's binding condition: a split application demotes the row to `proposed`.
4. **After application**: `rebuild_index` runs (classification-map is docs-MCP-served); this ballot is added to `.kiro/docs/ballots/README.md` § "Ballots on record".
