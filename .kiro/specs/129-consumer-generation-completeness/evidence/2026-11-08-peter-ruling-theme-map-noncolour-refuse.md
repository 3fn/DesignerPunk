# Peter's ruling: `generate` refuses a non-colour key in any theme override map (option (a), with the class option)

**Recorded by**: the orchestrator. The time was taken from the clock when the answer arrived (`date -u`).

## The exchange

1. **The defect.** Stacy found it in her review of the Token-Governance ballot (B-5), and Ada reproduced it at `8ae8db5bb`. Record: `.kiro/issues/2026-11-08-non-colour-theme-override-accepted-not-applied.md`, P1 consumer-blocking · defect.
   - A non-colour key (spacing, for example) in a registered theme's `dark` map makes `generate` write broken output on all three platforms, and `generate` still exits 0:
     - web gets a `light-dark()` of two lengths;
     - iOS gets a `UIColor` closure that fails `swiftc -typecheck` (`cannot convert 'CGFloat' to closure result type 'UIColor'`);
     - Android renames the token to `_light` and `_dark`.
   - **Origin** (Ada): the mode-aware emitter in `src/generators/TokenFileGenerator.ts` (Spec 080, `06e43a7e8`) never checks a token's category. Consumers could first reach that path at U9 (#763), when `generate` began reading the config's `dark` map. No release carries U6 or U9.
   - **Spec 129** (Thurgood): no requirement promises or scopes out non-colour keys, so this is a new defect. It is U6/U9 output, though, so 129's closeout names it. No U12 criterion row changes: D1's fixture holds only colour maps.
2. **Put to Peter** (orchestrator, 2026-11-08):
   - **Placement.** A separate issue-driven fix PR under Ada's P1 record, merged before the S of the release that carries U6 and U9. Ada and Thurgood agreed on this.
   - **The fork.** (a) refuse, with an error naming the key (recommended; it matches how `generate` refuses a product token that references a composite), or (b) warn and drop the key (Ada's first lean).
   - **Surviving counter to (a).** A consumer whose config already has a stray non-colour key in `dark`, which was ignored until now, would see `generate` fail on upgrade.
   - **The class option.** Validate every theme override map (`dark`, `wcag` and custom) by token category when the config loads, as `platforms:` keys are checked against `PLATFORM_KEYS`. It costs the same PR.
   - The Token-Governance ballot's F-2 (describe the behaviour as shipped, or fix first) follows from the choice.
3. **2026-11-08T15:12:38Z**, Peter: **"(a) with the class option. 783 is merged"**

## What was ruled

- **(a)**: `generate` refuses a non-colour key in a theme override map, with an error that names the key, the map and the theme, and leads with what to do.
- **The class option**: the check covers every theme override map (`dark`, `wcag` and any registered theme's maps) by token category, at config load.
- **Placement** (the recommendation he accepted): an issue-driven fix PR under the P1 record, Ada as owner, merged before the S of the release that carries U6 and U9. A Consumer Guard case in `tests/consumer-integration.test.ts` needs a rule-8 grant, with Thurgood consulted.
- **The ballot's F-2** resolves as fix first. The Token-Governance ballot describes the fixed behaviour.
