// Probe-kotlin fixture (Spec 129 Task 4.3): the holder is declared and no member is in the pinned form
// (four spaces, `val <Instance> = DesignerPunkTheme(`), so the per-run check must fail closed.
package com.designerpunk.tokens

data class DesignerPunkTheme(
    val color_a: Color
)

object HarnessConsumerThemes {
    val BaseLight = themeOf(Color(1, 2, 3, 255))
    val BaseDark: DesignerPunkTheme = DesignerPunkTheme(Color(1, 2, 3, 255))
}
