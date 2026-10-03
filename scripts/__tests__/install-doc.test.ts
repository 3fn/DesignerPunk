/**
 * @category evergreen
 * @purpose Spec 123 Task 19 — the install doc (design.md C23 and its 2026-10-03
 * erratum). The install doc is the marked region that opens
 * `governance/DesignerPunk-Integration-Guide.md`; `docs/consumer/INSTALL.md` is
 * its committed derivation (Task 19.4).
 *
 * This file is built up across Task 19's subtasks:
 *   - 19.1 (this block): the README's native label, Task 19 criterion 5 —
 *     "The README's 'True native implementations (Web Components, SwiftUI,
 *     Jetpack Compose)' line (L57) is replaced by the labelled form, with an
 *     asserted string." The sentence is anchored by content, never by line.
 *   - 19.2: path-step counts, heading order, the 119-B lint, the residual
 *     string assertions, the zero counts, the Req 3.2 guard, imported CLI
 *     strings.
 *   - 19.4: markers, region identity against the derivation.
 */

import * as fs from 'fs';
import * as path from 'path';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const README = fs.readFileSync(path.join(REPO_ROOT, 'README.md'), 'utf8');

/** The two asserted label strings, version-free (tasks.md Task 19, criterion 5 made decidable). */
const LABEL_REFERENCE_SOURCE = 'reference source, not a build input'; // Task 3.5's core
const LABEL_NATIVE_ONBOARDING = 'Native onboarding is not supported'; // #268's core

/** The unlabelled sentence the README carried at `79a3b3bc` (L57). */
const UNLABELLED_NATIVE_CLAIM = 'True native implementations (Web Components, SwiftUI, Jetpack Compose)';

/**
 * The Stemma `Deliverables` paragraph, where the unlabelled sentence lived. The
 * README has one `**Deliverables:**` paragraph per system, so the Stemma one is
 * found by its content (it names the native component frameworks), never by line.
 */
function stemmaDeliverablesParagraph(text: string): string {
  const matches = text
    .split('\n')
    .filter((l) => l.startsWith('**Deliverables:**') && l.includes('Jetpack Compose'));
  if (matches.length !== 1) {
    throw new Error(`README.md: expected exactly one "**Deliverables:**" paragraph naming Jetpack Compose, found ${matches.length}`);
  }
  return matches[0];
}

describe('README native label (Task 19 criterion 5)', () => {
  it('no longer carries the unlabelled "True native implementations" sentence', () => {
    expect(README).not.toContain(UNLABELLED_NATIVE_CLAIM);
  });

  it('carries both label strings in the labelled form that replaced it', () => {
    const deliverables = stemmaDeliverablesParagraph(README);
    expect(deliverables).toContain(LABEL_REFERENCE_SOURCE);
    expect(deliverables).toContain(LABEL_NATIVE_ONBOARDING);
  });
});
