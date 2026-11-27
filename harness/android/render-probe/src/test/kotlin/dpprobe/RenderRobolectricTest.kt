package dpprobe

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The Robolectric Compose test: the same Text, on the JVM with no emulator. SDK 34 is inside Robolectric 4.14's range. */
@RunWith(AndroidJUnit4::class)
@Config(sdk = [34])
class RenderRobolectricTest {
    @get:Rule
    val rule = createComposeRule()

    @Test
    fun textIsDisplayed() {
        rule.setContent { MaterialTheme { Text("render-probe") } }
        rule.onNodeWithText("render-probe").assertIsDisplayed()
    }
}
