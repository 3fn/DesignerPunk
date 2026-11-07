/**
 * Exercises `scripts/completion-claims/untracked-guard.ts` directly (the path extraction and the
 * allowed-set decision; the tool's wiring is in complete-task.untracked-guard.test.ts).
 *
 * The parser verdict is pinned here: `parseTasksMd` keeps only the FIRST path of each Primary
 * Artifacts bullet (`extractArtifactEntry`). The rows below are copied from Spec 129's tasks.md
 * (parents 5, 8 and 19, as of 2026-11-07), where that drops `scripts/harness/__tests__/compare.test.ts`,
 * `harness/README.md`, the gradle build files and `scripts/harness/__tests__/fixtures/kotlin/**`.
 * The guard's `pathTokens` must keep them all.
 */

import { parseTasksMd } from '../tasks-md';
import { pathTokens, resolveParent, specIdOf } from '../untracked-guard';

const ROWS = `- [ ] 5. Row five
  **Success Criteria:** none — fixture
  **Primary Artifacts:**
  - \`scripts/harness/compare.ts\`, \`scripts/harness/__tests__/compare.test.ts\` and \`harness/README.md\`, for the \`checks\` field and the \`check\` class only
- [ ] 8. Row eight
  **Success Criteria:** none — fixture
  **Primary Artifacts:**
  - \`harness/android/gradle/libs.versions.toml\`, \`harness/android/dp/build.gradle.kts\`, \`harness/android/probe/build.gradle.kts\` and \`harness/android/tokens/build.gradle.kts\`
- [ ] 19. Row nineteen
  **Success Criteria:** none — fixture
  **Primary Artifacts:**
  - \`scripts/harness/__tests__/probe-kotlin.test.ts\` and \`scripts/harness/__tests__/fixtures/kotlin/**\` (Data)
  - \`scripts/harness/stability.ts\` and \`scripts/harness/__tests__/stability.test.ts\` (Thurgood)
`;

describe('parser verdict: parseTasksMd keeps the first path of a bullet, pathTokens keeps all', () => {
  const file = parseTasksMd(ROWS, 'x');
  const entries = (n: string) => file.parents.find((p) => p.number === n)!.primaryArtifacts;

  it('the parity parser loses the later paths of a bullet (the evidence)', () => {
    expect(entries('5').map((e) => e.path)).toEqual(['scripts/harness/compare.ts']);
    expect(entries('19').map((e) => e.path)).toEqual([
      'scripts/harness/__tests__/probe-kotlin.test.ts',
      'scripts/harness/stability.ts',
    ]);
  });

  it('pathTokens takes every backticked path-like token', () => {
    expect(entries('5').flatMap((e) => pathTokens(e.raw, e.path))).toEqual([
      'scripts/harness/compare.ts',
      'scripts/harness/__tests__/compare.test.ts',
      'harness/README.md',
    ]);
    expect(entries('8').flatMap((e) => pathTokens(e.raw, e.path))).toHaveLength(4);
    expect(entries('19').flatMap((e) => pathTokens(e.raw, e.path))).toEqual([
      'scripts/harness/__tests__/probe-kotlin.test.ts',
      'scripts/harness/__tests__/fixtures/kotlin/**',
      'scripts/harness/stability.ts',
      'scripts/harness/__tests__/stability.test.ts',
    ]);
  });

  it('skips backticked prose and falls back to the parser path when a bullet has no backticks', () => {
    expect(pathTokens('the `checks` field of `a b`', undefined)).toEqual([]);
    expect(pathTokens('src/plain/path.ts (modified)', 'src/plain/path.ts')).toEqual(['src/plain/path.ts']);
  });
});

describe('resolveParent / specIdOf', () => {
  it('reads the parent from every message shape the tool sees', () => {
    expect(resolveParent(undefined, 'Task 12 Complete: x (129)', 'task/129-u7', '129-x')).toBe('12');
    expect(resolveParent(undefined, 'Task 12.2: step (129)', 'task/129-u7', '129-x')).toBe('12');
    expect(resolveParent(undefined, 'Task 12 instruments block (129)', 'task/129-u7', '129-x')).toBe('12');
    expect(resolveParent(undefined, 'Task 2a: x', 'task/129-u7', '129-x')).toBe('2a');
    expect(resolveParent('7.3', 'wip', 'task/129-u7', '129-x')).toBe('7');
    expect(resolveParent(undefined, 'wip', 'task/129-4-slug', '129-x')).toBe('4');
    expect(resolveParent(undefined, 'wip', 'task/125-A-2-slug', '125-A-x')).toBe('2');
    expect(resolveParent(undefined, 'wip', 'task/129-compile-harness', '129-x')).toBeUndefined();
  });

  it('spec ids include the letter suffix', () => {
    expect(specIdOf('125-A-pr-gate')).toBe('125-A');
    expect(specIdOf('129-consumer')).toBe('129');
  });
});
