---
name: _fixture-skill
description: Internal DesignerPunk pipeline fixture (Spec 122 C10.3). Do not invoke — this skill exists only to exercise the agent generator's skills round-trip (canonical → both target trees → sweep-2 verification) and carries no usable capability.
---

# _fixture-skill

This is the Spec 122 standing-fixture skill. It is emitted to both runtime skill trees by
the generator's table-driven skills pipeline so that sweep 2 (skills round-trip) and the
diff-guard exercise a live row on every PR.

It intentionally does nothing. If an agent ever activates it, treat that as a bug in
activation-description discipline and report it to Thurgood.
