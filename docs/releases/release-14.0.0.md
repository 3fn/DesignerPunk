# Release 14.0.0

**Date**: 2026-08-12
**Previous**: 13.0.0
**Bump**: major

> **Authorship note (recorded, not buried)**: these notes are HAND-AUTHORED from the merged delta (`v13.0.0..main`). The release tool's generated output for this range recommended `13.0.1 (patch)` and declared "No consumer-facing changes" — it scans spec task-summary docs and is blind to issue-driven work, which is where this release's entire breaking wave lives. The discrepancy is recorded as evidence for the parked Q6 conversation (release-manager keep/kill/evolve); reproduce with `npm run release:analyze` at this tag.

## 🔴 Breaking / Consumer-Facing

- **Button-CTA: `disabled` state REMOVED** *(Component)* (#82)
  Per the adjudicated no-disabled-states philosophy: DesignerPunk components do not ship disabled interaction states; unavailable actions are handled by composition (don't render, or render an alternative affordance) rather than a desaturated dead control. Consumers passing `disabled` to Button-CTA must migrate.
- **Input-Text family: disabled handling REMOVED on iOS and Android** *(Component)* (#84)
  The same adjudication applied to the Input-Text natives. Also in this wave: native base-call mismatches fixed with a static alignment guard added (#86), and disabled-state residue cleared from demos, READMEs, and docs (#88, #89).
- **`blend.disabledDesaturate` + disabled blend wrappers DEPRECATED** *(Token)* (#83)
  The disabled-serving blend utilities are deprecated (warnings on use); removal follows in a future major. Migrate off before then.
- **Input-Text: `readOnly` concept applied across the family** *(Component)* (#91, #93)
  The ratified state-readonly ballot lands: `readOnly` is a first-class, distinct-from-disabled state on Input-Text (B-prime iOS ruling included). Consumers who approximated read-only with disabled should migrate to the real state.

## 🟡 Minor

- **Avatar: decorative-prop misuse now warns** *(Component)* (#81 — Spec 126 O2)
  Runtime warning when `decorative` is used in a way that would hide meaningful content from assistive tech.
- **Docs MCP corpus upgrade (Agent Experience Architecture / 119-B)** *(Docs MCP)*
  The served governance corpus consumers query through the docs MCP got its largest quality pass to date: validated cross-references expanded 116 → 327; 27 stale aliases pruned; 127 legacy snippets migrated to durable id-form citations; certainty-calibration guidance refined; cross-ref parser is id-aware with the scanner repointed (#103); six bare-id content defects resolved (#111).

## 🔵 Patch / Internal (selected)

- Functional test lanes: `npm test` single-file selection fixed (#97); unused `test:quick` script removed (#98); console-fail armed on root lanes with a checked-in allowlist; the dormant WCAG contract check re-armed at the canonical allowlist; validation-criteria completeness assertion promoted (125-B U2).
- Governance infrastructure (internal, not shipped in the package): Spec 122 agent-generation pipeline complete; Spec 125-A PR gate + required checks; Spec 125-B classification-map pilot complete with the U1b campaign armed. These govern how DesignerPunk is built; they are listed for provenance, not as consumer surface.
