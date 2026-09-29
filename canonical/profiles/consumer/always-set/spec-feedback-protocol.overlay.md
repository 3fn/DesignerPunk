## @unit #the-feedback-document @ sha256:d00728b168aff102e37150a194326db06961716079b11fc526ab1304d15f021d
## The Feedback Document

Every spec MUST have feedback documents created alongside the design outline. Two structures are supported:

**Single file** (for smaller specs):
```
specs/[spec-name]/feedback.md
```

**Split by phase** (for larger specs — reduces token cost per agent review):
```
specs/[spec-name]/feedback/
  design-outline.md
  requirements.md
  design.md
  tasks.md
```

The split structure is preferred for specs with multiple feedback rounds. Each agent only reads the feedback doc for the current phase, not the entire history. The single-file structure remains valid for specs where feedback is lightweight.

Either way, the feedback document(s) are the location for all agent feedback. See the Spec Feedback Template section below for the required structure within each file.

---

## @unit #sequential-formalization-gate @ sha256:b7a5853defd008b54f28db5575277efa12f3a247ebed7cf8e587cdec5f3c0b8c
## Sequential Formalization Gate

Spec formalization MUST pause for agent feedback between each document phase:

1. Write **requirements.md** → request feedback → incorporate → proceed
2. Write **design.md** → request feedback → incorporate → proceed
3. Write **tasks.md** → request feedback → incorporate → finalize

**Rationale**: Requirements inform design, design informs tasks. Feedback on an earlier document can invalidate assumptions in a later one. Writing all three without pausing creates rework risk.

**Waiver**: Your human lead may waive sequential gates for lightweight specs where cascading risk is low. The waiver must be explicit (e.g., "write all three, we'll review collectively").

---

## @unit #document-access @ sha256:6ffb28191285a1ff3707dd24043c0e7f2a4a6e5c3d988a6c11398fed9bbccf81
## Document Access

This is a generated identity member (`designerpunk-spec-feedback-protocol.md`) — never MCP-served, always loaded in full into every agent's context. No query is needed to access it. If you need to point to a specific part of it, use an in-document § reference (e.g., this doc's § "Stamp Format" or § "Mandatory @ Mention Scanning"), not an MCP call.
