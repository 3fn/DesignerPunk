/**
 * Input-Text-Base Android Component
 * 
 * Android platform implementation of the Input-Text-Base component using Jetpack Compose.
 * Implements float label pattern with animated transitions using motion.floatLabel token.
 * 
 * Stemma System: Form Inputs Family
 * Component Type: Primitive (Base)
 * Naming Convention: [Family]-[Type]-[Variant] = Input-Text-Base
 * 
 * Features:
 * - Float label animation (labelMd → labelMdFloat)
 * - Color animation (text.subtle → primary with blend.focusSaturate)
 * - Offset animation (translateY)
 * - Trailing icon support (error, success, info)
 * - Trailing content slot for semantic variants (e.g., password toggle)
 * - Respects reduce motion settings
 * - WCAG 2.1 AA compliant
 * - Uses theme-aware blend utilities for state colors (focus)
 *
 * Behavioral Contracts:
 * - focusable: Can receive keyboard focus
 * - float_label_animation: Label animates on focus
 * - validates_on_blur: Validation triggers on blur
 * - error_state_display: Shows error message and styling
 * - success_state_display: Shows success styling
 * - trailing_icon_display: Shows contextual trailing icons
 * - focus_ring: WCAG 2.4.7 focus visible indicator
 * - reduced_motion_support: Respects prefers-reduced-motion
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.5, 4.1, 4.2, 4.3, 8.1, 8.2, 8.3, 8.5, 11.1, 11.2, 11.3, 13.1
 */

package com.designerpunk.components.core

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.LocalTextStyle
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.error
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import android.provider.Settings
import com.designerpunk.tokens.DesignTokens
import com.designerpunk.tokens.focusBlend

/**
 * Input type enumeration
 */
enum class InputType {
    TEXT,
    EMAIL,
    PASSWORD,
    TEL,
    URL
}

/**
 * Input-Text-Base Composable
 * 
 * Implements the float label pattern with animated transitions.
 * Uses generated design tokens for consistent styling across platforms.
 * 
 * @param id Unique identifier for the input
 * @param label Label text (floats between placeholder and floated positions)
 * @param value Current input value
 * @param onValueChange Callback when value changes
 * @param modifier Modifier for the component
 * @param onFocus Callback when input receives focus
 * @param onBlur Callback when input loses focus
 * @param helperText Helper text displayed below input (persistent)
 * @param errorMessage Error message displayed below helper text (conditional)
 * @param isSuccess Success state indicator
 * @param showInfoIcon Info icon support
 * @param type Input type
 * @param visualTransformation Override for the input's visual transformation.
 *        When null, derived from type (PasswordVisualTransformation for PASSWORD).
 *        Semantic variants use this to control masking (e.g., password visibility toggle).
 * @param placeholder Placeholder text (only shown when label is floated and input is empty)
 * @param readOnly Read-only state
 * @param required Required field indicator
 * @param maxLength Maximum length for input value
 * @param imeAction IME action for keyboard
 * @param keyboardActions Keyboard actions
 * @param trailingContent Trailing content slot rendered after the status icons
 *        (e.g., password visibility toggle)
 */
@Composable
fun InputTextBase(
    id: String,
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    onFocus: (() -> Unit)? = null,
    onBlur: (() -> Unit)? = null,
    helperText: String? = null,
    errorMessage: String? = null,
    isSuccess: Boolean = false,
    showInfoIcon: Boolean = false,
    type: InputType = InputType.TEXT,
    visualTransformation: VisualTransformation? = null,
    placeholder: String? = null,
    readOnly: Boolean = false,
    required: Boolean = false,
    maxLength: Int? = null,
    imeAction: ImeAction = ImeAction.Done,
    keyboardActions: KeyboardActions = KeyboardActions.Default,
    trailingContent: (@Composable () -> Unit)? = null
) {
    // State
    var isFocused by remember { mutableStateOf(false) }
    val focusRequester = remember { FocusRequester() }
    var labelAnimationComplete by remember { mutableStateOf(true) }
    
    // Computed properties
    val isFilled = value.isNotEmpty()
    val hasError = errorMessage != null
    val isLabelFloated = isFocused || isFilled
    
    // Icon visibility (after label animation completes)
    val showErrorIcon = hasError && isLabelFloated && labelAnimationComplete
    val showSuccessIcon = isSuccess && isLabelFloated && labelAnimationComplete
    val showInfoIconVisible = showInfoIcon && (isFocused || isFilled) && labelAnimationComplete
    
    // Check if reduce motion is enabled
    val context = LocalContext.current
    val reduceMotion = remember {
        Settings.Global.getFloat(
            context.contentResolver,
            Settings.Global.ANIMATOR_DURATION_SCALE,
            1f
        ) == 0f
    }
    
    // Animation specs
    val animationSpec: AnimationSpec<Float> = if (reduceMotion) {
        snap()
    } else {
        tween(
            durationMillis = motionFloatLabelDuration,
            easing = easingStandard
        )
    }
    
    // Track label animation state changes
    LaunchedEffect(isLabelFloated) {
        labelAnimationComplete = false
        kotlinx.coroutines.delay(motionFloatLabelDuration.toLong())
        labelAnimationComplete = true
    }
    
    // Animated values
    val labelFontSize by animateFloatAsState(
        targetValue = if (isLabelFloated) typographyLabelMdFloatFontSize.value else typographyLabelMdFontSize.value,
        animationSpec = animationSpec,
        label = "labelFontSize"
    )
    
    val labelOffsetY by animateDpAsState(
        targetValue = if (isLabelFloated) {
            -((typographyLabelMdFontSize.value * typographyLabelMdLineHeight.value).dp + spaceGroupedTight)
        } else {
            0.dp
        },
        animationSpec = animationSpec,
        label = "labelOffsetY"
    )
    
    val labelColor by animateColorAsState(
        targetValue = when {
            hasError -> colorFeedbackErrorText
            isSuccess -> colorFeedbackSuccessText
            isFocused -> colorActionPrimary.focusBlend()
            else -> colorTextMuted
        },
        animationSpec = animationSpec,
        label = "labelColor"
    )
    
    val borderColor by animateColorAsState(
        targetValue = when {
            hasError -> colorFeedbackErrorText
            isSuccess -> colorFeedbackSuccessText
            isFocused -> colorActionPrimary.focusBlend()
            else -> colorBorder
        },
        animationSpec = animationSpec,
        label = "borderColor"
    )
    
    // Icon opacity animation
    val iconOpacity by animateFloatAsState(
        targetValue = if (showErrorIcon || showSuccessIcon || showInfoIconVisible) 1f else 0f,
        animationSpec = animationSpec,
        label = "iconOpacity"
    )
    
    // Main layout
    Column(
        modifier = modifier
            .fillMaxWidth()
            .semantics {
                if (helperText != null) {
                    contentDescription = helperText
                }
                if (errorMessage != null) {
                    error(errorMessage)
                }
                if (readOnly) {
                    // Explicit TalkBack read-only announcement — label, value,
                    // and "read only", never a disabled/dimmed state
                    // (state_readonly contract, announcement-parity condition 3:
                    // .kiro/issues/input-text-base-ios-readonly-adjudication.md,
                    // RULED B-prime, Peter 2026-07-15).
                    stateDescription = "read only"
                }
            }
    ) {
        // Input wrapper with label and trailing icon
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .heightIn(min = tapAreaRecommended),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Input field with label
            Box(
                modifier = Modifier
                    .weight(1f)
            ) {
                // Input field
                BasicTextField(
                value = value,
                onValueChange = { newValue ->
                    val finalValue = if (maxLength != null && newValue.length > maxLength) {
                        newValue.take(maxLength)
                    } else {
                        newValue
                    }
                    onValueChange(finalValue)
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .focusRequester(focusRequester)
                    .onFocusChanged { focusState ->
                        val wasFocused = isFocused
                        isFocused = focusState.isFocused
                        
                        if (isFocused && !wasFocused) {
                            onFocus?.invoke()
                        } else if (!isFocused && wasFocused) {
                            onBlur?.invoke()
                        }
                    }
                    .background(
                        color = colorBackground,
                        shape = RoundedCornerShape(radius150)
                    )
                    .border(
                        width = borderDefault,
                        color = borderColor,
                        shape = RoundedCornerShape(radius150)
                    )
                    .then(
                        if (isFocused) {
                            Modifier.border(
                                width = accessibilityFocusWidth,
                                color = accessibilityFocusColor,
                                shape = RoundedCornerShape(radius150)
                            )
                            .padding(accessibilityFocusOffset)
                        } else {
                            Modifier
                        }
                    )
                    .padding(spaceInset100),
                textStyle = LocalTextStyle.current.copy(
                    fontSize = typographyInputFontSize,
                    lineHeight = typographyInputLineHeight,
                    fontWeight = typographyInputFontWeight,
                    letterSpacing = typographyInputLetterSpacing,
                    color = colorTextDefault
                ),
                keyboardOptions = KeyboardOptions(
                    keyboardType = getKeyboardType(type),
                    imeAction = imeAction
                ),
                keyboardActions = keyboardActions,
                singleLine = true,
                readOnly = readOnly,
                visualTransformation = visualTransformation ?: if (type == InputType.PASSWORD) {
                    PasswordVisualTransformation()
                } else {
                    VisualTransformation.None
                },
                cursorBrush = SolidColor(colorActionPrimary),
                decorationBox = { innerTextField ->
                    Box(
                        modifier = Modifier.fillMaxWidth(),
                        contentAlignment = Alignment.CenterStart
                    ) {
                        if (isLabelFloated && value.isEmpty() && placeholder != null) {
                            Text(
                                text = placeholder,
                                style = TextStyle(
                                    fontSize = typographyInputFontSize,
                                    color = colorTextMuted.copy(alpha = 0.5f)
                                )
                            )
                        }
                        innerTextField()
                    }
                }
            )
            
                // Floating label
                Text(
                    text = label + if (required) " *" else "",
                    style = TextStyle(
                        fontSize = labelFontSize.sp,
                        lineHeight = if (isLabelFloated) typographyLabelMdFloatLineHeight else typographyLabelMdLineHeight,
                        fontWeight = typographyLabelMdFontWeight,
                        letterSpacing = typographyLabelMdLetterSpacing,
                        color = labelColor
                    ),
                    modifier = Modifier
                        .align(Alignment.CenterStart)
                        .offset(
                            x = spaceInset100,
                            y = labelOffsetY
                        )
                        .padding(horizontal = spaceGroupedTight)
                )
            }
            
            // Trailing icon (error, success, or info) with fade animation
            Box(
                modifier = Modifier
                    .padding(end = spaceInset100)
                    .graphicsLayer(alpha = iconOpacity)
            ) {
                when {
                    showErrorIcon -> IconBase(
                        name = "x",
                        size = iconSize100,
                        color = colorFeedbackErrorText
                    )
                    showSuccessIcon -> IconBase(
                        name = "check",
                        size = iconSize100,
                        color = colorFeedbackSuccessText
                    )
                    showInfoIconVisible -> IconBase(
                        name = "info",
                        size = iconSize100,
                        color = colorTextMuted
                    )
                }
            }

            // Trailing content slot (e.g., password visibility toggle)
            trailingContent?.invoke()
        }
        
        // Helper text (persistent)
        if (helperText != null) {
            Spacer(modifier = Modifier.height(spaceGroupedMinimal))
            Text(
                text = helperText,
                style = TextStyle(
                    fontSize = typographyCaptionFontSize,
                    lineHeight = typographyCaptionLineHeight,
                    fontWeight = typographyCaptionFontWeight,
                    letterSpacing = typographyCaptionLetterSpacing,
                    color = colorTextMuted
                ),
                modifier = Modifier.padding(start = spaceInset100)
            )
        }
        
        // Error message (conditional)
        if (errorMessage != null) {
            Spacer(modifier = Modifier.height(spaceGroupedMinimal))
            Text(
                text = errorMessage,
                style = TextStyle(
                    fontSize = typographyCaptionFontSize,
                    lineHeight = typographyCaptionLineHeight,
                    fontWeight = typographyCaptionFontWeight,
                    letterSpacing = typographyCaptionLetterSpacing,
                    color = colorFeedbackErrorText
                ),
                modifier = Modifier.padding(start = spaceInset100)
            )
        }
    }
}

/**
 * Get keyboard type for input type
 */
private fun getKeyboardType(type: InputType): KeyboardType {
    return when (type) {
        InputType.TEXT -> KeyboardType.Text
        InputType.EMAIL -> KeyboardType.Email
        InputType.PASSWORD -> KeyboardType.Password
        InputType.TEL -> KeyboardType.Phone
        InputType.URL -> KeyboardType.Uri
    }
}

// MARK: - Design Token Constants
// These constants bind to the generated DesignTokens. The colour constants below are still
// bodyless: they wait on the theme surface (Spec 129 U6/U7).

// Typography tokens - labelMd (typography.labelMd)
private val typographyLabelMdFontSize: TextUnit = DesignTokens.typography_label_md.fontSize
private val typographyLabelMdLineHeight: TextUnit = DesignTokens.typography_label_md.lineHeight // em ratio
private val typographyLabelMdFontWeight: FontWeight? = DesignTokens.typography_label_md.fontWeight
private val typographyLabelMdLetterSpacing: TextUnit = DesignTokens.typography_label_md.letterSpacing // em

// Typography tokens - labelMdFloat (typography.labelMdFloat)
private val typographyLabelMdFloatFontSize: TextUnit = DesignTokens.typography_label_md_float.fontSize
private val typographyLabelMdFloatLineHeight: TextUnit = DesignTokens.typography_label_md_float.lineHeight // em ratio
private val typographyLabelMdFloatFontWeight: FontWeight? = DesignTokens.typography_label_md_float.fontWeight
private val typographyLabelMdFloatLetterSpacing: TextUnit = DesignTokens.typography_label_md_float.letterSpacing // em

// Typography tokens - input (typography.input)
private val typographyInputFontSize: TextUnit = DesignTokens.typography_input.fontSize
private val typographyInputLineHeight: TextUnit = DesignTokens.typography_input.lineHeight // em ratio
private val typographyInputFontWeight: FontWeight? = DesignTokens.typography_input.fontWeight
private val typographyInputLetterSpacing: TextUnit = DesignTokens.typography_input.letterSpacing // em

// Typography tokens - caption (typography.caption)
private val typographyCaptionFontSize: TextUnit = DesignTokens.typography_caption.fontSize
private val typographyCaptionLineHeight: TextUnit = DesignTokens.typography_caption.lineHeight // em ratio
private val typographyCaptionFontWeight: FontWeight? = DesignTokens.typography_caption.fontWeight
private val typographyCaptionLetterSpacing: TextUnit = DesignTokens.typography_caption.letterSpacing // em

// Color tokens (semantic)
private val colorTextMuted: Color // Generated from color.text.muted
private val colorTextDefault: Color // Generated from color.text.default
private val colorActionPrimary: Color // Generated from color.action.primary
private val colorFeedbackErrorText: Color // Generated from color.feedback.error.text
private val colorFeedbackSuccessText: Color // Generated from color.feedback.success.text
private val colorBorder: Color // Generated from color.border
private val colorBackground: Color // Generated from color.background

// Spacing tokens (semantic) - Dp type
private val spaceInset100: Dp = DesignTokens.space_inset_100
private val spaceGroupedTight: Dp = DesignTokens.space_grouped_tight
private val spaceGroupedMinimal: Dp = DesignTokens.space_grouped_minimal

// Motion tokens - motion.floatLabel (duration250 + easingStandard)
private val motionFloatLabelDuration: Int = DesignTokens.MotionFloatLabel.duration // 250ms
private val easingStandard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f) // Material Design standard curve

// Border tokens - Dp type
private val borderDefault: Dp = DesignTokens.border_default
private val radius150: Dp = DesignTokens.radius_150

// Icon tokens - Dp type
private val iconSize100: Dp = DesignTokens.icon_size_100 // 24dp

// Accessibility tokens - Dp type
private val tapAreaRecommended: Dp = DesignTokens.tap_area_recommended // 48dp minimum
private val accessibilityFocusWidth: Dp = DesignTokens.accessibility_focus_width
private val accessibilityFocusOffset: Dp = DesignTokens.accessibility_focus_offset
private val accessibilityFocusColor: Color // Generated from accessibility.focus.color
