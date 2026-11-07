# Task 7 Summary: Limitation markers in the Integration Guide's install region

**Date**: 2026-11-07
**Purpose**: Concise summary of parent Task 7 (Spec 129, Unit 2)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

The install region of the Integration Guide now marks each limitation sentence that a Spec 129 row will fix with a comment naming that row's record: 17 markers on 16 sentences. The install-doc test fails when a marked record has been archived or is missing while its sentence is still in the Guide, and `scripts/derive-install-doc.ts` strips the markers when it derives `docs/consumer/INSTALL.md`, so none reaches a consumer. Lina's rewrite of the "ContainerCardBase.ios.swift does not parse" clause, which is no longer true, is spliced in.

## Why It Matters

A limitation sentence stays in a shipped guide after the work that fixes it merges unless something notices. The marker ties each sentence to the record whose closure makes it false, so closing that record without rewriting the sentence turns a check red in the same PR. The owners of the rows (Ada, Lina, Kenya, Data) said which unit makes each sentence false, and the rule they agreed on is that a marker names the record whose archival makes its sentence false.

## Key Changes

- `governance/DesignerPunk-Integration-Guide.md`: 17 markers; Lina's two-line rewrite; one sentence split in two.
- `scripts/derive-install-doc.ts`: strips markers, and exports the check.
- `scripts/__tests__/install-doc.test.ts`: 12 new cases, including the archived-record and missing-record failures and the no-leak case.
- `docs/consumer/INSTALL.md`: re-derived; it carries no marker.

## Impact

Four units (U4, U5, U6 and U9) archive marked records, so each now carries the rewrite of the sentences it falsifies. Two sentences go false three units before their record archives; they are recorded as lag entries and covered by the release-time batching rule.

See the detailed completion doc: `.kiro/specs/129-consumer-generation-completeness/completion/task-7-completion.md`.
