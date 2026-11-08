# Peter's rulings: `docs/tokens.css` left as #774 shipped it; go for U12

**Recorded by**: the orchestrator, timestamped from the clock at receipt (`date -u`).

## The exchange

1. **The finding** comes from Stacy's ARMING batch 6, F1 (Medium), on branch `chore/129-arming-reads-batch-6` @ `85fa21017`, and the orchestrator verified it against `7c143845f`.
   - #774 (U5, Task 10) changed `docs/tokens.css`: 22 lines added, 18 deleted. The changes were the `blur000` and `opacity100` reasoning comments, plus U8's shadow `color-mix` composites and the four `--shadow-*-100` variables.
   - The amended grant (#770) had removed `docs/tokens.css` from U5's list. U5's PR body, the grant's outcome line and `completion/task-10-completion.md` all say the file was unchanged, and that is false.
   - The likely cause is a pack-time rebuild swept in by a broad stage. The orchestrator's U5 brief said to restore the file if the pack rewrote it. The orchestrator also missed it: at head H he checked the follow-up diff, not the PR's whole file list against the grant.
2. **Put to Peter** (orchestrator, 2026-11-08):
   - Leave it (recommended): it is a build output that every release PR rebuilds. Ada corrects the false statements with dated lines and confirms the file on `main` equals a fresh build.
   - Or revert it now to the pre-#774 bytes.
   - Surviving counter: leaving it means a change outside a grant's scope stands because it happens to be harmless. The record correction is what keeps that from passing silently.
   - The same message asked for the go on U12 (Tasks 17–18), Spec 129's last unit.
3. **2026-11-08T14:25:31Z**, Peter: **"Leave it, and go for U12"**

## What was ruled

- **`docs/tokens.css` stays as #774 shipped it.** Ada, the grant's owner and the Task 10 PRIMARY, does three things:
  - appends a dated correction line to the archived grant record `.kiro/issues/archive/2026-11-08-u5-opacity100-formula-grant.md`;
  - appends one to `completion/task-10-completion.md`, saying the file did change, by how much, and that it stands under this ruling;
  - confirms that `docs/tokens.css` on `main` equals what `scripts/build-browser-bundles.js` writes now, or names the difference.

  Stacy's F1 cites this record.
- **Go for U12** (Tasks 17 and 18).
