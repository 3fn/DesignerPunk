// Probe-kotlin fixture (Spec 129 Task 4.3): a generated-Kotlin cut in the holder form Task 11 pins (design § 4, native-rules.ts kotlinHolderOpenLine / kotlinHolderMemberLine).
package com.designerpunk.tokens

data class DesignerPunkTheme(
    val color_a: Color
)

object HarnessConsumerThemes {
    val BaseLight = DesignerPunkTheme(
        color_a = Color(1, 2, 3, 255)
    )
    val BaseDark = DesignerPunkTheme(
        color_a = Color(1, 2, 3, 255)
    )
    val WcagLight = DesignerPunkTheme(
        color_a = Color(1, 2, 3, 255)
    )
    val WcagDark = DesignerPunkTheme(
        color_a = Color(1, 2, 3, 255)
    )
}
