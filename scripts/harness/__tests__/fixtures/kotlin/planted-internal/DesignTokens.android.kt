// Probe-kotlin fixture (Spec 129 Task 4.2): the planted-member case of Req 2.7.
// Two members of DesignTokens; the second is `internal`. Compiled as the `:tokens` module's only source and
// read by a `:probe` module, the planted one must give exactly one entry: Kotlin lets a module read its own
// internal members, and another module cannot. A probe placed in the same module would give none.
//
// NOT YET RUN. The entry's expected K2 wording is UNVERIFIED (reasoning, not a recorded log):
//   probe:ProbeTokens.kt | Cannot access 'space_planted': it is internal in 'DesignTokens'.
// The first lane self-test run replaces this line with what the compiler printed.
package com.designerpunk.tokens

import androidx.compose.ui.unit.dp

object DesignTokens {
    val space_public = 8.dp
    internal val space_planted = 16.dp
}
