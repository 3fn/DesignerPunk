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

/** The instrumented smoke test: on a booted emulator, one Compose Text renders and is displayed. */
@RunWith(AndroidJUnit4::class)
class RenderSmokeTest {
    @get:Rule
    val rule = createComposeRule()

    @Test
    fun textIsDisplayed() {
        rule.setContent { MaterialTheme { Text("render-probe") } }
        rule.onNodeWithText("render-probe").assertIsDisplayed()
    }
}
