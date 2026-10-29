# Sparky's `routes.docs[product-token-authoring]` cue still teaches authoring a product token found mid-build

**Date**: 2026-10-27
**Owner**: Thurgood (the profile author, who applies charter frontmatter). The cue's words are Sparky's: his seat wrote its own `when:` text at the ballot, as Kenya's and Data's did. Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, from Sparky's report of his seat acts on the application branch of ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (relayed by the orchestrator, 2026-10-27).
**Consulted**: Sparky — <pending: the replacement `when:` text, his>
**Class**: P2 obligation (record) · defect *(set 2026-10-27, Thurgood, rule 12. The route's target is `governance/Web-Authoring-Standards.md` § "Product Token Authoring (Sparky)", and at L239 as applied it teaches F-A (i): surface the need, and author the token only once the spec names it. The cue that sends him there describes the old behaviour. The doc he lands on is right, so no reader is misled into a wrong act.)*
**Trigger**: `release:next:phase-1` — closes at the merge of the fixing PR below, and becomes `merge:#<N>` once that PR is open.

---

## The line, and the other seats

- **`canonical/agents/sparky.md` L84–87** (frontmatter, at the application branch head):
  ```text
      - id: product-token-authoring
        doc: web-authoring-standards
        section: "Product Token Authoring (Sparky)"
        when: "authoring a product token you discovered during screen implementation"
  ```
- **The same route id on the other seats** (checked at the same head): no other cue carries the old reading.
  - **Kenya** (L91–94, site 8b): "a value the screen spec did not anticipate comes up while you build an iOS screen (what you surface, and what sits in the code until the outcome)". Matches F-A (i).
  - **Data** (L90–93, site 8b): "a value you need has no system token and the screen spec does not name it (a need the spec missed)". Matches F-A (i).
  - **Leonardo** (L53–56): "defining a product token during screen specification". Spec time, true under every F-A answer.

## Vehicle: a follow-up PR, not this application

- **Why not this application**:
  - The ballot's grant (§ 7) names `canonical/agents/{kenya,data}.md` frontmatter `routes.docs`, one leaf each. For `sparky.md` it names only L329 and L322, byte for byte from § 14.
  - An edit to `sparky.md` L87 in the application PR is an out-of-list edit, which is a claims-pass finding (README rule 8; the ballot's own grant language).
  - § 12 has no clause for a same-PR fix outside its sites.
- **The PR**:
  - Peter-merged, since `canonical/agents/**` is in the governance carve-out.
  - It replaces L87's `when:` with Sparky's text and regenerates.
  - Kind: the frontmatter is not the prose of `canonical/agents/**` (the ballot § 7's own reading), so the three kinds do not name it. Its shape is a CORRECTION all the same: the old text describes behaviour the ratified law changed, and the referent is Web-Authoring-Standards L239 as applied. The PR body says so in one line.
  - No seat act: Sparky's consumer row for this route is `retained`, not-routed and unsigned (`canonical/profiles/consumer/sparky.dispositions.yaml` L52).
- **Sequence**: after the application PR merges, so its base carries L239 as applied.

## Close

Rule 5's dated outcome line in the fixing PR, and the archive move there.

## Outcome (2026-10-28, Thurgood)

Fixed by branch `chore/sparky-product-token-authoring-route-cue` (this record's fixing PR). `canonical/agents/sparky.md` L87's `when:` reads "a value the screen spec did not anticipate comes up while you build a web screen (what you surface, and what sits in the code until the outcome)", Kenya's site 8b form with "web" for "iOS". The renderings are regenerated and the lock is refreshed. The consumer row stays `retained` and unsigned, so no seat act is owed. Sparky's read of the words is owed in the PR before merge (the record's Consulted line); if he rewords, his text replaces this one in the same PR. Archived in this PR (rule 5).
