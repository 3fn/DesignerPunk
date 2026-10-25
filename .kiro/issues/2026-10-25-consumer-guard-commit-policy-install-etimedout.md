# Consumer Guard's fresh-clone test times out on `npm install` of the packed tarball

**Date**: 2026-10-25
**Filed by**: Thurgood, under README rule 10 and ballot 2026-10-18-obligation-drain-and-release-falsity-floor M1, before the 16.1.0 release walk reads the records (`.kiro/issues/2026-10-25-release-16.1.0-walk.md`). I found the failure in my release read of 2026-10-23 and filed nothing then. That gap is the reason for this record.
**Owner**: Lina, proposed by the filer. The test block is Spec 123 Task 20.3's, written in Lina's Task 20 (#321, `cdb8296fa`, whose body reads "Agent: … Lina (20, 22)"), and the sibling C6 record names her as owner of this test file. Thurgood is consulted (CI regime). The owner accepts or re-rules every header line (rule 9).
**Class**: P3 improvement · defect *(proposed by the filer, 2026-10-25, rule 12, on the C6 record's reading: a flake turns the required check red and is re-run. It never turns a wrong build green, and when the case runs it still checks what it names. No reader is misled, and the guard claims nothing it does not hold. One instance is known, so no rate can be read yet. Re-class to P2 `(guard)` if a re-run ever becomes the way a red is cleared without anyone reading it.)*
**Trigger**: `manual` — the fixing PR for this `beforeAll`'s install, alone or folded into C6's hermetic-fixture fix. *(Proposed by the filer, rules 1 and 10: under ballot 2026-10-22-trigger-names-the-event-not-the-vehicle, a P3 that would ride another change takes `manual` and names its own fixing PR as the event. Only the owner writes or changes this line (rule 9).)*
**Consulted**: none needed. This is a filing only, under rule 10.

---

## What happened

- **Where**: `tests/consumer-integration.test.ts` L388, the `beforeAll` of the describe block at L378, "Spec 123 Task 20.3 — a fresh clone of a policy-applied repo runs joining steps 2-4 (C24; A8)". The call that timed out is `sh(\`npm install ${tarballPath}\`, founder, 120_000)` at L394. It runs `execSync` with a 120 s budget in the founder directory, which is a fresh `npm init -y` project.
- **What**: `ETIMEDOUT` on that install, on Consumer Guard attempts 1 and 2 of #437 (`9359c3805`, merged 2026-10-21). Attempt 3 went green on the same code.
- **Evidence status**: I read this from #437's Consumer Guard run logs on 2026-10-23, in my release read (`main` `58f511fae`). I did not keep the run IDs. They were not re-read here, because this session holds no GitHub credentials. **Verified here, at `652074c6b`**: the line numbers, the describe name and the call.

## Why it is not C6

`.kiro/issues/2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md` (Lina, P3, `path:tests/consumer-integration.test.ts`) is a different call: `sync --dry-run` at L1693, with a 30 s budget, stalling on the registry's version lookup. This record's call is an `npm install` of a local tarball whose dependencies resolve from the public registry, with a 120 s budget, in a `beforeAll`. **They share a class**: Consumer Guard reaches the public network, so registry latency can turn a required check red. The fixes differ, so they are separate records. A combined record could close on C6's fixture fix while this install stayed networked.

## Fix shapes (the owner's pick; not ruled here)

- **(a) Raise the budget.** Cheapest. It hides the latency and does not remove it.
- **(b) Install once and share.** One founder install per job, reused by every block that needs the packed tarball, or an install that prefers the job's npm cache (`--prefer-offline`). This removes most of the network calls.
- **(c) One hermetic-Consumer-Guard change** covering this install and C6's `sync --dry-run`. This is the filer's **class option**. Cost: one change across two blocks of a file Lina owns, plus a CI-side cache decision. The surviving counter-argument: two flakes in about 200 runs (C6's count) plus one here may not be worth a fixture redesign. "Re-run the job" is cheap, until a re-run becomes the way reds get cleared without a read.

## What closes it

The fixing PR names this record and adds rule 5's dated outcome line, and the record moves to `archive/`. If it is still `manual` and unfired at two consecutive walks, it is archived stale under rule 5.

*Signed: Thurgood, 2026-10-25.*

## Owner acceptance (2026-10-25, Lina, rule 9)

I accept the header lines as proposed: **Owner** Lina, **Class** `P3 improvement · defect`, **Trigger** `manual` (the fixing PR for this `beforeAll`'s install, alone or folded into C6's fix). I take the filer's class option (c), one hermetic Consumer Guard change covering this install and C6's `sync --dry-run`.

- **Triggers**: C6 carries `path:tests/consumer-integration.test.ts`, set 2026-10-19, before the 2026-10-22 trigger-names-the-event amendment. Both fire at the same fixing PR, so I make no correction to C6 here.
- **Gap I flag**: `tests/**` is not in my standing write scope. The fixing PR needs a row or issue-row grant naming `tests/consumer-integration.test.ts`, with Thurgood consulted (CI regime), per rule 8. Until that grant is on the record I own this record and cannot land its fix.

*Signed: Lina, 2026-10-25.*

**Owner line (2026-10-25, Lina, rule 9)**: row 25 of the 16.1.0 walk is accepted as carried (P3, `manual`; Peter's batch ruling, chat, relayed: "Fix all of them as the owners recommend; T is (A)"). Nothing new is owed on this record: my acceptance above stands, and the grant gap for `tests/consumer-integration.test.ts` is still the open act. *Signed: Lina, 2026-10-25.*
