---
# _fixture — the C10.3 standing pipeline fixture (Spec 122 Task 8.1).
#
# A 9th pseudo-agent exercising ONE member of every content class and transform
# disposition, emitted through the SAME validate→resolve→emit path a real cutover uses,
# with outputs remapped under canonical/_fixture-output/{cc,kiro}/ so no runtime loads
# them. It sits inside C6's guarded surface: every pipeline change re-runs it on every PR
# (Req 21 AC4). Every ref below is REAL and must resolve (sweep 1 + C7 walk this file like
# any canonical agent) — the fixture is a standing test, not a mock.
agent: _fixture
agentType: consumer
description: Standing pipeline fixture (Spec 122 C10.3) — exercises one member of every content class and transform disposition; emitted only under canonical/_fixture-output; no runtime ever loads it.
ambient:
  # governance-as-law (one law ref with a mustContain predicate — C7 class (a) exercises it):
  governanceAsLaw:
    - id: token-governance
      owner: ada
      assert:
        - claim: semantic-token-autonomy
          section: "Token Usage Governance"
          mustContain:
            - "freely use semantic concept tokens"
  # ground-truth-manifest (one verdict — the C10.3-named exemplar):
  groundTruthManifest:
    verdict: none-standing
routes:
  # one doc route with a verbatim heading (resolve-stage + sweep-1 specimen):
  docs:
    - id: completion-doc-workflow
      doc: completion-documentation-guide
      section: "Two-Document Workflow"
      when: "authoring a completion doc and unsure which tier applies"
  # one agent route with the not-yet-ported disposition (C7 class (b)'s escape hatch, LE1):
  agents:
    - target: lina
      when: "a component-implementation question arises"
      disposition: not-yet-ported
  # one cue per MCP (registry-declared tools — sweep 6's phantom-route leg walks these):
  cues:
    - when: "you need one section of a governance doc"
      tool: get_section
      mcp: docs
    - when: "you need the component inventory"
      tool: get_component_catalog
      mcp: application
    - when: "you need product-level context"
      tool: get_product_overview
      mcp: product
# one command per run-context value + one named gap (Req 21 AC1; C7 class (d) specimens):
commands:
  - name: fixture-functional-suite
    cmd: "npm test"
    runContext: this-repo
    source: package.json
    cue: "run the functional lanes before declaring pipeline work done"
  - name: fixture-consumer-build
    cmd: "npm run build"
    runContext: consumer-repo
    cue: "builds run in the consuming repo, not the design-system source repo"
  - name: fixture-product-dev
    cmd: "npm run dev"
    runContext: per-product
    authoredPerProduct: true
    cue: "each product authors its own dev-server command"
  - class: fixture-named-gap
    runContext: this-repo
    gap: "a verified named absence is valid authored content — the fixture's Req 21 AC1 exemplar"
    cue: "when the capability is absent, say so rather than inventing a command"
# one skill row (round-trip specimen — skills-map key, never a path):
skills:
  - _fixture-skill
# per-server tool subsets backing the cues (C7 class (c) leg 1; sweep-6 fleet input at
# cutovers). find_docs is REQUIRED in every agent's docs subset: the shared catalog's
# find-docs-discovery cue propagates to all agents (Req 10 AC6) and the CC adapter
# fail-louds rendering a cue whose tool the subset does not grant (proven live, Task 8.1):
toolSubset:
  designerpunk-docs:
    - find_docs
    - get_section
  designerpunk-application:
    - get_component_catalog
  designerpunk-product:
    - get_product_overview
# write-scope (drives the toolsSettings.write.allowedPaths transform on both targets):
writeScope:
  - "canonical/_fixture-output/**"
# kiro-native fields covering the disposition trio: keyboardShortcut + welcomeMessage CARRY
# into the Kiro config and DROP-with-reason on CC; agentSpawn TRANSFORMs on CC:
kiro:
  keyboardShortcut: "ctrl+shift+0"
  welcomeMessage: "Fixture pseudo-agent — pipeline standing test; not a working seat."
  agentSpawn:
    - command: "echo fixture-spawn-hook"
      timeout_ms: 1000
---

# _fixture — pipeline standing test

This body is the class-(a) PASS-THROUGH specimen: it must arrive in every emitted prompt
byte-identical to this text (Req 1 AC2), and the attribution sidecar must map it as a
passthrough span.

The fixture is not a working seat. It exists so that the generator's full
validate→resolve→render→compose→emit path, both target adapters, the attribution
totality checker, the diff-guard, and the sweeps all exercise a real canonical document on
every pull request — content-agnostically, before any real agent rides the pipeline.
