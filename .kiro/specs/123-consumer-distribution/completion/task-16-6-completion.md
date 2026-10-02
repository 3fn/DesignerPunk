# Task 16.6 Completion — the packed-install agent-layer block; the `attach --reference` C6 case; the lane half of 3.9

**Spec**: 123 — Consumer Distribution · **Unit**: U2b (Task 16) · **Parent**: Task 16 · **Agent**: Lina (Sonnet)

**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-16-instruments.md` rows 2.1, 2.2, 2.4, 2.5, 2.8–2.11, 4.8–4.10, 11.1–11.3 (and its Found-later row about L198, closed here).

All edits are in `tests/consumer-integration.test.ts` (a Task 16 Primary Artifact). No source file was changed: `src/cli/shared/bornRepo.ts` was mutated temporarily for the bite and restored byte-equal (below).

## What changed

### 1. The known red — L198 (instruments Found-later row, rows 2.5 / 11.1)

`init produces a working project` asserted `.kiro/steering` exists after a bare `init` in the packed install. Bare `init` emits the default target (`cc`, DD9) since 16.3, so that was false (Consumer Guard RED at run 36948454994 and later). Replaced with assertions true of the new shape: the default target is read from the installed package's profile (`dist/consumer-canonical/consumer-profile.yaml`, never a literal in the test beyond a `toBe('cc')` pin of today's default); `.claude/agents/*.md` and `.claude/identity/designerpunk-*.md` exist; `CLAUDE.md` carries the managed-region markers; the manifest has `attachedTargets: [defaultTarget]`; and there is no `governance/`, no `.kiro/steering`, no `.kiro/agents` in the consumer.

### 2. The packed-install block — `describe('Spec 123 Task 16.6 — the packed install emits a working agent layer (C2)')` (rows 2.1, 2.2, 2.4, 2.5, 2.8–2.11)

The block runs inside the file's existing outer `beforeAll`, which packs with `npm pack` and **no `--ignore-scripts`** (row 2.5: prepack's full `npm run build`, so `build:generator` and the derive run inside it). For each declared target (read from this repo's `canonical/consumer-profile.yaml` at collection time, so there is no second target list in the test) it makes a **fresh temp consumer with its own `npm install <tarball>`** (so `./node_modules/@3fn/core/…` exists at that consumer's own root, which a subdirectory of the shared `tempDir` could not give), runs `init --target=<t>`, and asserts, in ten cases:

1. The packed profile equals `canonical/consumer-profile.yaml`; each `init` printed `Agent layer (<t>)`; the manifest is `posture: 'born'`, `attachedTargets: [<t>]`.
2. **The emitted file set equals the guarded rendering** `canonical/_consumer-output/<t>/` (sidecars and the `<t>/` root prefix stripped): an exact set comparison over the guarded roots (`.claude/agents` + `.claude/identity`, or `.kiro/agents` + `.kiro/steering`), every guarded file byte-equal, no `*.attribution.json` anywhere in the consumer, and the other target's layer (agent roots and skill dir) absent.
3. The skill trees: every installed top-level skill dir is a known steward skill dir (`.claude/skills` / `.kiro/skills`, the guarded Spec 122 outputs that 16.1's parity test names as the skill half of the referent), with the full file set and bytes of the steward's; `_fixture-skill` never ships.
4. CC: the `CLAUDE.md` managed region imports every shipped identity member (set-equal to `.claude/identity/*`), each import resolves, and the personal note is the one named import that does not.
5. Every emitted file is recorded in the manifest as `{ hash: sha256(content), grain: 'file', origin: 'generated' }`; the `CLAUDE.md#managed` region entry is `grain: 'region'`.
6. **MCP config + approval keys** present and recorded. The expected approvals are computed from the installed `dist/mcp/tool-manifest.json`'s `readOnlyHint` subset, and each server must have at least one: CC `.mcp.json` servers (three) plus `.claude/settings.json` `permissions.allow` set-equal to `mcp__<server>__<tool>`; Kiro `.kiro/settings/mcp.json` per-server `autoApprove` set-equal, `disabled: false`; the manifest's `#<server>` / `#<allow-entry>` key entries set-equal.
7. **Kiro**: every agent `resources` entry (`file://`, `skill://`, and `knowledgeBase` sources) resolves in the install, including the `node_modules/@3fn/core/…` ones; `.kiro/steering/designerpunk-*` exists; each agent's `prompt` resolves; the knowledge-base entries are exactly `src/components` and `src/tokens` and both exist in the born repo. The personal note is the single resource named-but-absent (asserted to be named, then excluded from the resolve loop).
8. **`.designerpunk/personal-note.local.md` is ABSENT** in both installs until U3 (Task 22; C19's degradation) — an assertion, never a skip.
9. **Deny-list `complete-task.sh|Peter merges|RATIFIED`: zero hits over every emitted file** — agent layer, skill trees, the `CLAUDE.md` region, and the MCP config + approvals files — **not charters only**, per the scope note. The case first proves the scan has teeth by asserting the regex matches the steward's own `.claude/agents/lina.md` (2 hits there). An independent `grep -rlE` over the earlier exploration installs of both targets also found zero.
10. **Kenya's and Data's re-pointed knowledge paths resolve**: for each target, every `node_modules/@3fn/core/…/platforms/{ios|android}…` path in the emitted `kenya` / `data` charter (CC `.claude/agents/<a>.md`, Kiro `.kiro/agents/<a>-prompt.md`) is found (≥1) and matches at least one file in the installed package (a small glob matcher over the real tree); CC's two knowledge-fallback lines are matched verbatim (`…/platforms/ios/**`, `…/platforms/android/**`).

### 3. The C6 case — `C6: attach --reference stays CONSUME` (rows 4.8–4.10), in the Task 9.1 birth/posture block

Against the packed install, in the established fixture form (`gitBoundary` + `spawnNodeBundle`): (1) `attach --reference --target=cc` → exit 0, manifest `posture: 'consume'`, `.mcp.json` has exactly docs + application, no `.claude/agents`, no config; (2) the application MCP boots with `Design-system root: unborn` and the line `Data root token-index: <installed>/token-index (source: package-consume) (tokenOrigin: designerpunk-reference)` (the labelled reference root, `DataRootSource 'package-consume'`), and no `found designerpunk.manifest.json`; (3) `attach --reference` again → exit 0, manifest and `.mcp.json` byte-identical; (4) `init --target=cc` afterwards → exit 0, empty stderr, config exists, manifest `posture: 'born'`, and the MCP boots `Design-system root: born`. The comment block above the Task 9.1 describe (which said these two rows move to U2) now notes they landed here.

## Targeted tests + result

- `npm run test:consumer` (final run, tree clean at the pack SHA below): **Test Suites 1 passed; Tests 41 passed, 1 skipped (the pre-existing `validate passes` skip, out of scope), 0 failed**. The earlier run on the identical test file minus the one-line teeth check was also 41 / 1 skipped.
- `npm test -- src/cli/`: 35 suites, **411 passed, 0 failed**.
- `npm run typecheck` (`tsc --noEmit`): clean.
- `npm run check:122:diff-guard`: exit 0, `full-run-green (input-closure-changed)`; `operative-set-freshness: PASS`; no stale signature or confirmation unit. `canonical/generated.lock` moved (the `inputClosure` leg only; `outputs` unchanged) and is committed with this doc. My only touched file is outside the closure roots, so the closure move is not from this subtask's edits; I did not trace its cause (a stale lock refresh at head is the likely reading, but I did not verify).
- The server suites (`mcp-server`, `application-mcp-server`) were **not re-run**: nothing there changed.

### Bite recorded red — instrument row 4.8 (mutate → run → restore; `cmp` confirmed the restore)

Mutated `src/cli/shared/bornRepo.ts` L217 from `const manifestSignal = manifestExists && manifestPosture !== 'consume';` to `const manifestSignal = manifestExists;` (a consume manifest now counts as birth). Saved copy beforehand (`sha256 73b801b0…aed911`); ran `npm run test:consumer -- -t "attach --reference stays CONSUME"` (prepack rebuilds, so the packed bundles carry the mutation). Result: **1 failed, 41 skipped**; the failing assertion, at `tests/consumer-integration.test.ts:1095`:

```
expect(received).toContain(expected) // indexOf
Expected substring: "Design-system root: unborn"
Received string:    "[mcp-component-server] Design-system root: partial (manifest-only)
  … found designerpunk.manifest.json at …/attach-reference-consume but no config or token tier — the design system files are missing. Restore them from version control, or run: npx designerpunk init --re-scaffold …"
```

Restored with `cp` from the saved copy; `cmp` reported byte-equal; `git diff HEAD -- src` empty; build noise (`docs/tokens.css`, `token-index/semantics.yaml`, `token-index/meta.json`) restored from HEAD / removed; the case re-ran green (the final run above).

### The lane half of 3.9 — instrument rows 11.1–11.3 (Task 9's recorded form)

- `npm run test:consumer` against the U2b pack — the lane packs this worktree WITH scripts, so the tarball IS the U2b pack: **41 passed, 1 skipped, 0 failed**.
- Pack built from commit **`aa831fddba4d236c752176665aae2a2a6c0bcd8a`** (branch `task/123-u2b-16-6`; `git status` clean apart from the untracked `node_modules` symlinks at run time).
- `git log -1 --format=%H -- package.json` = **`fcdc8bf9008cf8307e2dd9ccbfbc84b3717318b5`** (`Task 16.3: init agent-layer rows, row 10, deferred files[] rows, attachedTargets (123)`) — as the instruments block predicted, the anchor moved to 16.3.
- `git merge-base --is-ancestor fcdc8bf9008cf8307e2dd9ccbfbc84b3717318b5 aa831fddba4d236c752176665aae2a2a6c0bcd8a` → **exit 0**.
- Provenance: measured locally on this worktree, not a CI run. No CI was polled (as briefed).

## Application-time adaptations

- **`tests/` does not import from `tools/`**, so the small pieces of the 16.1 helper `readTree` this block needs (walk; skip `*.attribution.json`; root-relative POSIX paths) are **copied** into the test as `listFiles` / `readGuardedRendering`, not imported, with a comment saying so. Drift risk: the two copies can diverge; the in-repo parity test and this block compare the same rendering, so a divergence in what is stripped would show as a mismatch in one of them.
- **The "expected file set" is the guarded rendering plus two named additions**, exactly as 16.1's parity test defines it: the skill trees (compared to the steward's `.claude/skills` / `.kiro/skills` at the same paths, because the guarded consumer rendering holds no skills) and, on CC, the `CLAUDE.md` region. The skill check is "each installed skill dir equals the steward's dir (files and bytes)", not "the dir set equals the set the charters name"; the latter would need the shipped skills map and I judged that out of this block's scope.
- **Fresh consumer per target with its own `npm install`**, rather than a subdirectory of the shared `tempDir` like the C6 fixtures: required so the `node_modules/@3fn/core/…` resource and glob paths exist at the consumer's own root. Cost: two extra installs (~10 s) in the lane.
- **The C6 case's `init` step** runs after `attach --reference` wrote `.mcp.json` / `.claude/settings.json`; `init` skips the entries already present and adds the product server. The case asserts empty stderr and `posture: 'born'`; it does not assert the merged `.mcp.json` content, which is key-grain `init` behaviour covered by `init.test.ts`.
- **Kiro is not exercised by `attach --reference` in the lane** (the C6 case runs `--target=cc`); the Kiro reference path is covered by `attach.test.ts` in-repo. The property the case guards (a consume manifest is never a birth signal) is target-independent.

## Found later (for the PRIMARY)

- 2026-10-01 — misfit/none-needed — instruments Found-later row about `tests/consumer-integration.test.ts` L198: **closed here** (item 1 above). Criterion C2/C11 (rows 2.5, 11.1).
- 2026-10-01 — unlisted — `canonical/generated.lock`'s `inputClosure` leg moved on a clean `check:122:diff-guard` full run (outputs leg unchanged) at a tree whose only edit is outside the closure roots; committed with this doc. Route: PRIMARY, to confirm it is the expected head-staleness and not a nondeterminism in the closure hash. Criterion: none (diff-guard instrument, row 2.3).
- No block gap found: every row in my brief maps to an assertion above; nothing was skipped.
