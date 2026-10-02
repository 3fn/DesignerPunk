# Task 18.2 completion: the pass-four verdict's pre-declared edit, and the release-2 CHANGELOG entry

**Agent**: Lina (Opus) · **Date**: 2026-10-02 · **Input**: Stacy's verdict record `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` @ `3e0e0994`, cited and not restated.

## What changed

- **`completion/task-18-completion.md` was created, holding only the section `## 24.3 acceptance table`.** The section is the composition that the frozen texts file selects (`completion/g2-consequence-texts.md` @ C0 `30186762`, § 2 and § 3). Applied mechanically:
  - The record's machine lines, read from the file: there is exactly one `**Verdict**: ` line and exactly one `**Domain line**: ` line (grep counts 1 and 1).
  - The verdict token is `PASSES`.
  - The domain states are body `exercised, held`; frontmatter `exercised, held`; always-set `exercised, held`.
  - The record is well-formed under § 2, so the edit applies.
  - Blocks composed, in the fixed order: `HEAD`, `ROWS-FIXED`, `PASSES-body`, `PASSES-frontmatter`, `PASSES-always-set`, `FOOT`.
  - **Section freeze**: from this commit through U2b's merge, nothing goes between `FOOT`'s final blank line and the next `## ` heading. The rest of the parent doc is written at 18.3 without touching the section.
- **`CHANGELOG.md`: a second `[Unreleased]` entry**, "planned Release 2 (generated agent layer)", placed above Release 1's. It does not presume whether Release 1 ships before it or with it. It carries nothing outcome-dependent, per the texts file's § 5.
- **`tasks.md`: 18.1 and 18.2 ticked**, as checkbox-only hunks. 18.1's tick moved here by the arrangement Stacy accepted, so that 18.1's commit carried the request record alone.

## Targeted checks + result

- **Byte check (criterion 4)**: the composer reads the frozen file from C0, applies § 2's selector to the record and § 3's composition rule, and writes the composed text; the section is cut from the doc and diffed against it. The composer is a scratch script, `compose_g2.py`, reproduced in full below.
  ```
  diff <(git show 30186762:.kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md > texts.C0.md && python3 compose_g2.py texts.C0.md .kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md) <(awk '/^## 24\.3 acceptance table$/{f=1; print; next} f && /^## /{exit} f' .kiro/specs/123-consumer-distribution/completion/task-18-completion.md)
  ```
  The composer printed `selected: PASSES ['PASSES-body', 'PASSES-frontmatter', 'PASSES-always-set']` to stderr. `diff` printed nothing; exit 0.
- **The texts file is untouched**: `git diff 30186762 HEAD -- .kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md` → empty, before and after this commit.
- **CHANGELOG claims checked against the tree**:
  - `package.json` `files[]` lists the eight `.kiro/steering/*` identity docs by name and has no `.kiro/agents/` entry and no steering-folder glob. It lists `dist/generator/**` and `dist/consumer-canonical/**`.
  - `src/cli/designerpunk.ts` dispatches `attach` and documents `sync --migrate-legacy`.
  - `src/cli/init.ts` takes `--target` and defaults to the profile's declared target, which is `cc` (`canonical/consumer-profile.yaml`).
  - Integration Guide § 4b teaches `npx designerpunk attach --target=<cc|kiro>`.
  - The warning's quoted ending is `consumerDegradationMessage`'s text at `fafae2b0`.
- **Tests**: none run. Neither file is under a test or the lock's input closure.

**`compose_g2.py`**, as run:
```python
import re, sys
texts, record = open(sys.argv[1], encoding='utf-8').read(), open(sys.argv[2], encoding='utf-8').read()
blocks = {m.group(1): m.group(2) for m in re.finditer(r'^### `([A-Za-z-]+)`\n\n```text\n(.*?)^```\n', texts, re.M | re.S)}
vl = [l for l in record.split('\n') if l.startswith('**Verdict**: ')]
if len(vl) != 1: print('malformed: verdict lines', len(vl), file=sys.stderr); sys.exit(2)
token = vl[0][len('**Verdict**: '):].split(' ', 1)[0]
if token not in ('PASSES', 'FAILS', 'NOT-RUNNABLE'): print('malformed: token', token, file=sys.stderr); sys.exit(2)
out = blocks['HEAD'] + blocks['ROWS-FIXED']
if token == 'PASSES':
    dl = [l for l in record.split('\n') if l.startswith('**Domain line**: ')]
    if len(dl) != 1: print('malformed: domain lines', len(dl), file=sys.stderr); sys.exit(2)
    states = {}
    for part in dl[0][len('**Domain line**: '):].split(';'):
        k, _, v = part.strip().partition(': ')
        states[k] = v
    STATES = {'exercised, held': 'PASSES', 'exercised, did not hold': 'DID-NOT-HOLD', 'not exercised': 'NOT-EXERCISED'}
    for d in ('body', 'frontmatter', 'always-set'):
        if d not in states or states[d] not in STATES: print('malformed: domain', d, states.get(d), file=sys.stderr); sys.exit(2)
        out += blocks[f'{STATES[states[d]]}-{d}']
    print('selected:', token, [f'{STATES[states[d]]}-{d}' for d in ('body','frontmatter','always-set')], file=sys.stderr)
else:
    out += blocks['DEMOTION']
    print('selected:', token, 'DEMOTION', file=sys.stderr)
out += blocks['FOOT']
sys.stdout.write(out)
```

## Application-time adaptations

1. **The findings routed to me are carries, not fixes.** The record names me as owner of G2-F1, G2-F2 and G2-F3 (`re-grounding-pass-four.md` § "Findings"). By my condition 2, no machinery patch lands inside U2, and none landed here. Each is a tracked carry, cited by id and path and not restated. Each is filed as an issue after U2b merges.
2. **The CHANGELOG describes the warning as new behavior.** The brief said "the degradation warning's corrected text", but the consumer warning is new in this release, so there is no earlier published text a reader could see corrected.
3. **The CHANGELOG makes no bundle-size claim.** The brief said "the smaller generator bundle", but `dist/generator/` first ships in this release, so a size comparison means nothing to a consumer. The entry says the generator ships compiled and needs no TypeScript runtime.
