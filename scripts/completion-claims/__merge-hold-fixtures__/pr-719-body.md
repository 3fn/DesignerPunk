**Spec**: 129-consumer-generation-completeness
**Task**: 9 — The native type table
**Unit**: U4 — The native type table
**Agent**: Ada
**Completion docs**:
- .kiro/specs/129-consumer-generation-completeness/completion/task-9-completion.md
- docs/specs/129-consumer-generation-completeness/task-9-summary.md
**Validation**: tsc; npm test (420 suites, 10032); test:scripts 1397; mcp-server 765; application-mcp-server 582; test:consumer 61; parity PASS; harness dispatch 42391328951 all four PASS

---
Squash-merge only — the PR title becomes the `main` commit subject. The task is complete at MERGE (ballot 125-A, Item 1d).

**Edit kind**: governance/platform-implementation-guidelines.md — LAW (.kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md)
**Edit kind**: governance/DesignerPunk-Integration-Guide.md — EXECUTION (tasks amendment 6; Req 15.2's marker rule: L170 for row 3, L185's second sentence for row 6)
**Consulted**: Lina — wrote 9.2 and the type statements; Thurgood — holds the ballot and regenerated the agent layer (five generator outputs, no lock or signature moved); Data and Kenya — confirmed the shadow Float fields, the qualified Easing and the system-keyword nil. Out-of-list `src/build/platforms/AndroidMotionTokenFormatter.ts` is token generation under Ada's charter (coordinator-confirmed).
**Records fired by this diff**: the four naming `task-9-completion.md` carry rule 5 outcome lines and are archived here.

**Open for Peter**: Ratify the per-family Android type statements in governance/platform-implementation-guidelines.md as LAW (ballot .kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md; Lina's text at 2351e4b48 (revised after Ada's and Data's required reviews, spliced in § 7), checked against the generator in § 4)? This PR is not merged until your dated answer is in that ballot's Status.


