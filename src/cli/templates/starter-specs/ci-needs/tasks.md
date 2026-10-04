# CI needs: tasks

`npx designerpunk init` placed this spec in your repo. Run it with your agent. The needs, with their checks, bite recipes and prices, are in `needs.md` beside this file.

DesignerPunk declares the needs; you own the fulfillment. It does not maintain integrations for particular CI vendors.

## Tasks

- [ ] 1. **Inventory.** Find what CI this repo has, if any, and where its checks are defined. Record it in `notes.md` beside this file. If the repo has no CI, record that, and choose one with your human. DesignerPunk does not prescribe one.

- [ ] 2. **Decide.** For each need in `needs.md`, decide with your human: **adopt** or **skip**. Record each decision in `notes.md`, with the need's price line quoted, so the cost of skipping is written down where the decision is. Adopt the minimal-core needs unless your human decides otherwise. Adopt an optional need when its "Applies when" condition holds.

- [ ] 3. **Implement.** For each adopted need, add a check to your CI that verifies exactly what its **Check** says. Record where each check lives.

- [ ] 4. **Gate.** Make every adopted check run on each change before it merges. A red check must block the merge, not only report. Record in `notes.md` what makes it block (for example the required-check setting), by name.

- [ ] 5. **Arm.** For each adopted need, run its **bite recipe** in your CI, not only on your machine:
  - introduce the failure;
  - confirm the check goes red and the merge is blocked;
  - revert;
  - confirm it goes green.

  Record the red and green runs (a link or a log excerpt) in `notes.md`. The red run must show the failure you introduced, not some other failure, and the record must show the merge was blocked. A need whose check did not go red for that reason is not done.

- [ ] 6. **Close.** Write a short summary at the end of `notes.md`. For each need, record:
  - adopted or skipped;
  - where its check lives;
  - its bite evidence.

  That summary is the claim this spec makes. Check it against the runs before you call the spec done.
