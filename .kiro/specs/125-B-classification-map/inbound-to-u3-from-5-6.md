# Inbound to U3 (Task 6, Governance Layer) — from the 5.6 closeout sitting

**Date**: 2026-09-18
**From**: the U1b campaign closeout sitting (ballot `2026-09-18-u1b-campaign-closeout-verdict` D6 + the sitting's follow-through)
**Read when**: U3 comes off its gate (Peter's scheduling). This note exists so U3's design does not rediscover its own preconditions.

---

## 1. Settings state at capture (verified by Peter's screenshots, 2026-09-18)

- **"Require a pull request before merging": ENABLED at the sitting** (Peter, 2026-09-18, on the steward's recommendation) — with ALL sub-options deliberately OFF: Require approvals OFF, Dismiss stale approvals OFF, **Require review from Code Owners OFF**, most-recent-push approval OFF. This closed the direct-push-of-a-green-SHA edge and completes **toggle 1 of U3's two-toggle path**.
- Still in force: required status checks (18 contexts, verified exact), "Do not allow bypassing" (admin-enforced), "Require linear history". NO required-approvals rule exists — "Peter merges on green" is TCP convention mechanically supported by checks+no-bypass, not a platform approval rule.

## 2. THE STRUCTURAL CONSTRAINT U3 MUST DESIGN AROUND (new finding, first recorded here)

**GitHub does not let a PR's author approve their own PR — and every PR in this repo is authored by Peter's account** (agents operate on his token). Consequences, in increasing severity:

1. Enabling "Require approvals" today would make every PR unmergeable without the emergency bypass (Peter cannot approve what his own token authored).
2. **PR-approval-as-ratification via CODEOWNERS — U3's whole mechanism — cannot function under the current authoring identity.** Code-owner review is an approval; the code owner (@3fn = Peter) is the author; the approval is impossible. Flipping toggle 2 as-is would wedge every governance-path PR.
3. Therefore U3's design has a **prerequisite workstream**: agent-authored PRs must come from a distinct identity — a machine account or a GitHub App installation — before the ratification layer can arm. This is not a Settings toggle; it is credential/workflow plumbing with its own security surface (token custody, scope, .env conventions — see the gh-auth memory conventions).

## 3. The precondition ledger for U3's arming marker (`record-first-ratification` barrier scope, `proposed` → `armed`)

| # | Precondition | State at capture |
|---|--------------|------------------|
| 1 | "Require a pull request before merging" enabled | **MET** (2026-09-18) |
| 2 | "Require review from Code Owners" enabled | open (blocked by #4) |
| 3 | CODEOWNERS covers the governance-law paths (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts/configs) — today it covers ONLY package manifests | open (U3 authoring work) |
| 4 | **Distinct PR-authoring identity** (machine account / GitHub App) so the code owner's approval is valid | open — **the load-bearing one (§2)** |
| 5 | Resolvable owner handle in CODEOWNERS (the @3fn caveat: an unresolvable entry silently fails to route) | open (verify against a real GitHub identity) |

## 4. Also inherited by U3 (carried from the register, listed so nothing is hunted)

- The `no-autonomous-token-creation` row's unguarded scope names U3 diff-gate territory (primitive spacing, component tokens, 11 semantic families) with `audit:theme-drift` as the best-shaped candidate mechanism.
- Exp-3's evidence (U2) remains the diff-gate design input; escalate-don't-build still applies.
- The record-check two-blade degeneracy (closeout method finding 2) — U3's education re-assessment of the propagated record-first statement must account for it.
