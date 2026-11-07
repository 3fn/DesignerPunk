// Probe-kotlin fixture (Spec 129 Task 4.2): the planted-member case of Req 2.7.
// Two members of DesignTokens; the second is `internal`. Compiled as the `:tokens` module's only source and
// read by a `:probe` module, the planted one gives exactly one entry: Kotlin lets a module read its own
// internal members, and another module cannot. A probe placed in the same module would give none.
//
// RUN 2026-11-06 (Gradle 9.8.2, Kotlin 2.4.21): `:tokens` compiles this file; `:probe` gives exactly one error, K2's
// INVISIBLE_REFERENCE, at ProbeTokens.kt:21:24:
//   Cannot access 'val space_planted: Dp': it is internal in 'com.designerpunk.tokens.DesignTokens'.
// The recorded log is ../planted-internal-run.txt. `lane.ts --selftest` expects a probe key containing `space_planted`
// and `internal`; it failed that run only because parse-kotlin.ts read the `e:` line as unattributed (see the log's header).
package com.designerpunk.tokens

import androidx.compose.ui.unit.dp

object DesignTokens {
    val space_public = 8.dp
    internal val space_planted = 16.dp
}
