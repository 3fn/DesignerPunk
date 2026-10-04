# 22.0 collective question: tally and template decision

Eight answers are in `answers/`: ada, data, kenya, leonardo (mine, added here), lina, sparky, stacy, thurgood. Each was read in full. The rules come from `collective-question.md`.

## Headline

- **Every agent (8 of 8) answered "no" to item 4**: the v1 draft does not draw out the thing each one named.
- **No agent answered "none fits" for item 3**, so there is **no fourth slot to raise with Peter**.
- The eight asks collapse into **three clusters**. Two of them belong in the note; one does not.

## By heading (item 3)

| Heading | Agents |
|---|---|
| Who I am | Ada, Data, Kenya, Lina, Sparky (5) |
| What I or my organization value | none (0) |
| How I like to communicate and collaborate | Leonardo, Stacy, Thurgood (3) |
| none fits | none (0) |

## Clusters (my reading; each line paraphrases the agent's own item-4 question)

| Cluster | Agents and their ask | Where it goes in v2 | Why |
|---|---|---|---|
| **A. What the product ships, and to whom** | Data (platforms and minimum OS versions); Lina (which platforms ship first); Sparky (users' browsers, devices and assistive technology) | **Not in the note.** One pointer line sends these facts to `product/overview.yaml`. The walkthrough offers to move them there. | These are facts about the product, not the person. The note is per-user and local, so each teammate's copy would disagree. Req 18.5's derivation applies: "the note belongs to a person, not to the design system." `product/**` is committed and shared (C24 commit policy), and its overview is served by `get_product_overview`. Moving them answers three asks without three questions. |
| **B. How you work with the material** | Kenya (comfort reading Swift and running builds); Leonardo (read a spec, or see it rendered) | **One added question under "Who I am"**: "How comfortable are you reading code, running builds, or reading a written spec, and would you rather see a design rendered than read it?" | This is personal: it differs between teammates on the same product. It decides the register of every explanation an agent gives. |
| **C. How decisions and done-ness work** | Ada (decisions that are yours alone versus ones needing sign-off); Thurgood (how much process before building); Stacy (what evidence proves something is done) | **Two added questions under "How I like to communicate and collaborate"**. Ada's ask replaces v1's "What should it never do without asking?", which covered part of it. Thurgood's and Stacy's become one: "How much planning do you want before building, and what convinces you something is done?" | These are personal working preferences, so they belong in the slot that changes behaviour most. |

**Rule check.** Cluster B is shared by two agents and cluster C by three, so both qualify as candidate questions. Cluster A is shared by three, but it is a placement decision, not a question: the facts are real, the location is wrong.

## What v2 leaves out, and why

- **Per-platform specifics in the note**: minimum OS or API levels, browser matrices, Swift- or Compose-specific fluency. These are cluster A facts, or narrower versions of cluster B's general question. Naming every platform's specifics would grow the block every time a platform is admitted (React and React Native are chartered, Spec 128).
- **Any fourth slot**: no agent asked for one.

## The cost, stated plainly

- v1 was 390 words; v2 is 493.
- The guidance block loads every session until the person deletes it. It now holds more questions.
- Mitigations: the block tells the person, and the agent at the end of the walkthrough, to delete it once the note is written. The walkthrough asks one question at a time, so the person never answers the block as a form.

## Surviving counter-argument

- **The `product/overview.yaml` redirect only helps if agents read the overview.**
  - The note is loaded every session. The overview reaches an agent only when it queries the Product MCP.
  - So Data's "don't use APIs newer than my minimum" and Sparky's support matrix arrive later, and only for agents whose work queries the Product MCP. A Kenya or a Data that never queries it would never see them.
  - Revision cannot absorb this without putting product facts back into a per-person file.
- **A dependency it creates for 22.3.** The overview scaffold today (`src/cli/init.ts` `generateOverview`) has only a `Platform Status` list. My 22.3 `design-inputs/overview.yaml` would need fields for what ships first, minimum versions, and supported browsers, devices and assistive technology. Otherwise the pointer sends people to a file with nowhere to write.
  - That is my content and Lina's mechanics, and it stays inside 22.3's existing scope.
- **The fork for Peter**, if he weighs per-person load over shared truth: keep cluster A in the note as one line ("what you ship, and to whom"), and accept that teammates' notes can disagree.
