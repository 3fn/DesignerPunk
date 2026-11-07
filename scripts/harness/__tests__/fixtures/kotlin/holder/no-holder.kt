// Probe-kotlin fixture (Spec 129 Task 4.3): DesignerPunkTheme is declared and no <Name>Themes holder exists,
// so the per-run check must fail closed.
package com.designerpunk.tokens

data class DesignerPunkTheme(
    val color_a: Color
)

val LocalDPTheme = staticCompositionLocalOf { DesignerPunkTheme(Color(1, 2, 3, 255)) }
