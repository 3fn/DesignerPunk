# Issue: the iOS probe's `probeReads()` is nonisolated, so its provider reads fail Swift 6 isolation checking; U8 unmasked it

**Date**: 2026-11-08
**Owner**: Kenya
**Filed by**: Kenya, under rule 10, at the coordinator's direction (Spec 129 Task 13 / U8, option (a) of the `harness-ios-tokens` diagnosis).
**Class**: P2 obligation (record) · defect
**Trigger**: `path:scripts/harness/probe-swift.ts` — the event that owes the close is the first PR that touches the probe generator after U8 merges. That PR is the first iOS promotion's (or the fix's own); my standing scope over `probe-swift.ts` and `harness/ios/**` activates at the first iOS promotion's merge, and the fix is one line in this file, so a touch of this file is the event. A `path:` token is git-visible; the promotion PR's `verify-gate-registration.sh` change would also fire, but it can fire without the probe changing, so it would not decide the close.

---

## The defect

Run https://github.com/3fn/DesignerPunk/actions/runs/42433018143 (`harness-ios-tokens`, workflow_dispatch, U8 joined head `8ee4c8ccf` on `task/129-13-component-tier`) reports a new key, observed 3, not on the list:

`probe:Probe.swift | non-Sendable 'some View'-typed result can not be returned from main actor-isolated instance method 'harnessConsumerTheme' to nonisolated context`

(`Stage P exit 1; 3 error diagnostic(s) in 1 key(s)`; `probe: provider read 3 of 3`.)

## Cause

`scripts/harness/probe-swift.ts` emits `func probeReads() {` (nonisolated). Its provider lines are `_ = EmptyView().<providerFn>()` and `_ = EmptyView().<providerFn>(.<case>)`. The provider is a `View` extension method, which Swift 6 treats as `@MainActor`, so each call from a nonisolated function returns a non-Sendable `some View` across an isolation boundary: one error per provider read, three in all.

## Why it is not an adopter bug

An adopter calls the provider from a `View` body, which is already main-actor. The error is the probe's own context, not the generated provider's contract. The probe's other reads (index names, instances, product, key) are unaffected.

## How it surfaced

U8's third source generates the component-token types, which removed the six `cannot find '*Tokens' in scope` type-check errors from the list. Swift raises isolation diagnostics after type checking, so those errors had hidden these three. U8 unmasked the defect; it did not cause it.

## What closes it

One line in `scripts/harness/probe-swift.ts`: emit `@MainActor func probeReads() {` in place of `func probeReads() {`. The Task 13 exception (c) entry in `harness/expected/harness-ios-tokens.tsv` (tagged to this record by Ada) is removed in the same PR.

**Criterion** (decidable): on the fixing PR's head, `grep -c '@MainActor func probeReads' scripts/harness/probe-swift.ts` prints `1`; `grep -c 'harnessConsumerTheme' harness/expected/harness-ios-tokens.tsv` prints `0`; and a `harness-ios-tokens` run at that head reports no `main actor-isolated instance method` key.
