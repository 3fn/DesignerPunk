/**
 * Input-Text-Base iOS Component
 * 
 * iOS platform implementation of the Input-Text-Base component using SwiftUI.
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
 * - Read-only rendering (B-prime): selectable Text inside the shared field
 *   chrome — never disabled semantics
 * - Respects accessibilityReduceMotion
 * - WCAG 2.1 AA compliant
 * - Uses theme-aware blend utilities for state colors (focus)
 *
 * Behavioral Contracts:
 * - interaction_focusable: Can receive keyboard focus (iOS readOnly carve-out
 *   declared in contracts.yaml — readOnly content is not in FKA focus order)
 * - content_float_label: Label animates on focus
 * - validation_on_blur: Validation triggers on blur
 * - state_error: Shows error message and styling
 * - state_success: Shows success styling
 * - state_readonly: Read-only display — selectable/copyable, non-editable,
 *   announced read-only, never a disabled/dimmed trait (concept ballot
 *   pending ratification; see contracts.yaml)
 * - content_trailing_icon: Shows contextual trailing icons
 * - interaction_focus_ring: WCAG 2.4.7 focus visible indicator
 * - accessibility_reduced_motion: Respects prefers-reduced-motion
 *
 * Read-only (B-prime ruling — Peter, 2026-07-15,
 * .kiro/issues/input-text-base-ios-readonly-adjudication.md):
 * readOnly renders as `Text(value).textSelection(.enabled)` inside the same
 * field chrome as the editable field. The SwiftUI disabled modifier is never
 * applied. onFocus/onBlur are DECLARED not-fired on the iOS readOnly path.
 *
 * Requirements: 1.1, 1.2, 1.3, 1.5, 4.1, 4.2, 4.3, 8.1, 8.2, 8.4, 11.1, 11.2, 11.3, 13.1
 */

import SwiftUI

/**
 * Input-Text-Base SwiftUI View
 * 
 * Implements the float label pattern with animated transitions.
 * Uses generated design tokens for consistent styling across platforms.
 */
struct InputTextBase: View {
    // MARK: - Properties
    
    /// Unique identifier for the input
    let id: String
    
    /// Label text (floats between placeholder and floated positions)
    let label: String
    
    /// Current input value
    @Binding var value: String
    
    /// Callback when value changes
    let onChange: ((String) -> Void)?
    
    /// Callback when input receives focus
    let onFocus: (() -> Void)?
    
    /// Callback when input loses focus
    let onBlur: (() -> Void)?
    
    /// Helper text displayed below input (persistent)
    let helperText: String?
    
    /// Error message displayed below helper text (conditional)
    let errorMessage: String?
    
    /// Success state indicator
    let isSuccess: Bool
    
    /// Info icon support
    let showInfoIcon: Bool
    
    /// Input type
    let type: InputType
    
    /// Autocomplete type
    let autocomplete: UITextContentType?
    
    /// Placeholder text (only shown when label is floated and input is empty)
    let placeholder: String?
    
    /// Read-only state (state_readonly contract): renders the value as
    /// selectable Text inside the field chrome — never disabled semantics.
    /// Ignored for secure fields (see isReadOnlyDisplay).
    let readOnly: Bool
    
    /// Required field indicator
    let required: Bool
    
    /// Maximum length for input value
    let maxLength: Int?

    /// Trailing content slot rendered after the status icons
    /// (e.g., password visibility toggle). Declared as `var` with a
    /// default so the memberwise initializer keeps it optional and last.
    var trailingContent: AnyView? = nil

    // MARK: - State
    
    /// Whether input currently has focus
    @FocusState private var isFocused: Bool
    
    /// Whether reduce motion is enabled
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    
    @Environment(\.dpTheme) private var theme
    
    /// Whether label animation has completed (for icon timing coordination)
    @State private var labelAnimationComplete: Bool = true
    
    // MARK: - Computed Properties
    
    /// Whether input has content
    private var isFilled: Bool {
        !value.isEmpty
    }

    /// Whether to render the read-only display path (B-prime).
    ///
    /// SECURITY-CRITICAL GATE: the read-only path renders the value as
    /// selectable plaintext `Text`. It MUST be unreachable for secure fields
    /// (`type == .password`), or a readOnly password would render its secret
    /// in plaintext. readOnly is contracted OUT of Input-Text-Password
    /// entirely (adjudication condition 4:
    /// .kiro/issues/input-text-base-ios-readonly-adjudication.md — RULED
    /// B-prime, Peter 2026-07-15); the Password variant additionally strips
    /// readOnly before it reaches this component. On a secure field, readOnly
    /// is ignored (the field stays an editable SecureField) rather than ever
    /// routing to the plaintext Text branch.
    private var isReadOnlyDisplay: Bool {
        readOnly && type != .password
    }
    
    /// Whether input has error
    private var hasError: Bool {
        errorMessage != nil
    }
    
    /// Whether label should be floated
    private var isLabelFloated: Bool {
        isFocused || isFilled
    }
    
    /// Label font size based on floated state
    private var labelFont: Font {
        if isLabelFloated {
            return Font.system(size: DesignTokens.typographyLabelMdFloat.fontSize)
                .weight(DesignTokens.typographyLabelMdFloat.fontWeight)
        } else {
            return Font.system(size: DesignTokens.typographyLabelMd.fontSize)
                .weight(DesignTokens.typographyLabelMd.fontWeight)
        }
    }
    
    /// Label color based on state
    private var labelColor: Color {
        if hasError {
            return theme.colorFeedbackErrorText
        } else if isSuccess {
            return theme.colorFeedbackSuccessText
        } else if isFocused {
            return theme.colorActionPrimary.focusBlend()
        } else {
            return theme.colorTextMuted
        }
    }
    
    /// Label vertical offset based on floated state
    private var labelOffset: CGFloat {
        if isLabelFloated {
            return -(DesignTokens.typographyLabelMd.lineHeight + DesignTokens.spaceGroupedTight)
        } else {
            return 0
        }
    }
    
    /// Border color based on state
    private var borderColor: Color {
        if hasError {
            return theme.colorFeedbackErrorText
        } else if isSuccess {
            return theme.colorFeedbackSuccessText
        } else if isFocused {
            return theme.colorActionPrimary.focusBlend()
        } else {
            return theme.colorStructureBorder
        }
    }
    
    /// Whether to show error icon (after label animation completes)
    private var showErrorIcon: Bool {
        hasError && isLabelFloated && labelAnimationComplete
    }
    
    /// Whether to show success icon (after label animation completes)
    private var showSuccessIcon: Bool {
        isSuccess && isLabelFloated && labelAnimationComplete
    }
    
    /// Whether to show info icon (after label animation completes)
    private var showInfoIconVisible: Bool {
        showInfoIcon && (isFocused || isFilled) && labelAnimationComplete
    }
    
    // MARK: - Body
    
    var body: some View {
        VStack(alignment: .leading, spacing: spaceGroupedMinimal) {
            // Input wrapper with label and trailing icon
            HStack(alignment: .center, spacing: 0) {
                ZStack(alignment: .leading) {
                    // Label
                    Text(label + (required ? " *" : ""))
                        .font(labelFont)
                        .foregroundColor(labelColor)
                        .offset(y: labelOffset)
                        .animation(
                            reduceMotion ? .none : Animation.timingCurve(0.4, 0.0, 0.2, 1.0, duration: DesignTokens.MotionFloatLabel.duration),
                            value: isLabelFloated
                        )
                        .allowsHitTesting(false)
                        .onChange(of: isLabelFloated) { _ in
                            labelAnimationComplete = false
                            DispatchQueue.main.asyncAfter(deadline: .now() + DesignTokens.MotionFloatLabel.duration) {
                                labelAnimationComplete = true
                            }
                        }
                    
                    // Input field
                    if isReadOnlyDisplay {
                        // Read-only rendering (B-prime): selectable Text inside
                        // the shared field chrome. Never the SwiftUI disabled
                        // modifier — it produces disabled semantics (unfocusable,
                        // uncopyable, VoiceOver "dimmed"), which DesignerPunk bans.
                        // Long-press → select/copy (whole-string copy is the
                        // contracted iOS behavior). No keyboard is raised.
                        //
                        // Declared behavior (state_readonly contract):
                        // - NOT in keyboard/FKA focus order (mitigable declared
                        //   exception — .focusable(interactions:) prototype
                        //   tracked; contract tightens if it verifies on-device)
                        // - onFocus/onBlur DECLARED not-fired on this path
                        //   (there is no focus system here — nothing simulates
                        //   or pretends otherwise)
                        // - Empty value: label rests in placeholder position
                        //   (cross-platform parity); the chrome reserves full
                        //   height unconditionally.
                        Text(value)
                            .textSelection(.enabled)
                            .modifier(InputTextBaseFieldChrome(
                                borderColor: borderColor,
                                isFocused: false,
                                hasTrailingIcon: showErrorIcon || showSuccessIcon || showInfoIconVisible || trailingContent != nil
                            ))
                    } else if type == .password {
                        // Secure path: readOnly is IGNORED here (see
                        // isReadOnlyDisplay) — a secure field never routes to
                        // the plaintext read-only Text branch, and disabled
                        // semantics are never applied.
                        SecureField(isLabelFloated && placeholder != nil ? placeholder! : "", text: $value)
                            .textFieldStyle(InputTextBaseFieldStyle(
                                borderColor: borderColor,
                                isFocused: isFocused,
                                hasError: hasError,
                                isSuccess: isSuccess,
                                hasTrailingIcon: showErrorIcon || showSuccessIcon || showInfoIconVisible || trailingContent != nil
                            ))
                            .focused($isFocused)
                            .textContentType(autocomplete)
                            .onChange(of: value) { newValue in
                                if let maxLength = maxLength, newValue.count > maxLength {
                                    value = String(newValue.prefix(maxLength))
                                }
                                onChange?(value)
                            }
                            .onChange(of: isFocused) { focused in
                                if focused {
                                    onFocus?()
                                } else {
                                    onBlur?()
                                }
                            }
                    } else {
                        TextField(isLabelFloated && placeholder != nil ? placeholder! : "", text: $value)
                            .textFieldStyle(InputTextBaseFieldStyle(
                                borderColor: borderColor,
                                isFocused: isFocused,
                                hasError: hasError,
                                isSuccess: isSuccess,
                                hasTrailingIcon: showErrorIcon || showSuccessIcon || showInfoIconVisible || trailingContent != nil
                            ))
                            .focused($isFocused)
                            .textContentType(autocomplete)
                            .keyboardType(keyboardTypeForInputType(type))
                            .onChange(of: value) { newValue in
                                if let maxLength = maxLength, newValue.count > maxLength {
                                    value = String(newValue.prefix(maxLength))
                                }
                                onChange?(value)
                            }
                            .onChange(of: isFocused) { focused in
                                if focused {
                                    onFocus?()
                                } else {
                                    onBlur?()
                                }
                            }
                    }
                }
                
                // Trailing icon (error, success, or info)
                if showErrorIcon {
                    IconBase(name: "x", size: DesignTokens.iconSize100, color: theme.colorFeedbackErrorText)
                        .padding(.trailing, DesignTokens.spaceInset100)
                        .transition(.opacity)
                        .animation(
                            reduceMotion ? .none : Animation.timingCurve(0.4, 0.0, 0.2, 1.0, duration: DesignTokens.MotionFloatLabel.duration),
                            value: showErrorIcon
                        )
                } else if showSuccessIcon {
                    IconBase(name: "check", size: DesignTokens.iconSize100, color: theme.colorFeedbackSuccessText)
                        .padding(.trailing, DesignTokens.spaceInset100)
                        .transition(.opacity)
                        .animation(
                            reduceMotion ? .none : Animation.timingCurve(0.4, 0.0, 0.2, 1.0, duration: DesignTokens.MotionFloatLabel.duration),
                            value: showSuccessIcon
                        )
                } else if showInfoIconVisible {
                    IconBase(name: "info", size: DesignTokens.iconSize100, color: theme.colorTextMuted)
                        .padding(.trailing, DesignTokens.spaceInset100)
                        .transition(.opacity)
                        .animation(
                            reduceMotion ? .none : Animation.timingCurve(0.4, 0.0, 0.2, 1.0, duration: DesignTokens.MotionFloatLabel.duration),
                            value: showInfoIconVisible
                        )
                }

                // Trailing content slot (e.g., password visibility toggle)
                if let trailingContent = trailingContent {
                    trailingContent
                        .padding(.trailing, DesignTokens.spaceInset100)
                }
            }
            .frame(minHeight: DesignTokens.tapAreaRecommended)
            
            // Helper text (persistent)
            if let helperText = helperText {
                Text(helperText)
                    .font(Font.system(size: DesignTokens.typographyCaption.fontSize)
                        .weight(DesignTokens.typographyCaption.fontWeight))
                    .foregroundColor(theme.colorTextMuted)
                    .accessibilityIdentifier("\(id)-helper")
            }
            
            // Error message (conditional)
            if let errorMessage = errorMessage {
                Text(errorMessage)
                    .font(Font.system(size: DesignTokens.typographyCaption.fontSize)
                        .weight(DesignTokens.typographyCaption.fontWeight))
                    .foregroundColor(theme.colorFeedbackErrorText)
                    .accessibilityIdentifier("\(id)-error")
            }
        }
        .accessibilityElement(children: .contain)
        .accessibilityLabel(label)
        .accessibilityValue(value)
        .accessibilityHint(accessibilityHintText)
    }

    /// Composed accessibility hint.
    ///
    /// On the read-only path this composes the read-only indication with any
    /// helper text, so VoiceOver announces label + value + "Read only"
    /// (state_readonly contract) — never a disabled/dimmed trait. iOS has no
    /// read-only accessibility trait; the hint is the correct announcement
    /// route (adjudication, Kenya R1).
    private var accessibilityHintText: String {
        var parts: [String] = []
        if isReadOnlyDisplay {
            parts.append("Read only")
        }
        if let helperText = helperText, !helperText.isEmpty {
            parts.append(helperText)
        }
        return parts.joined(separator: ". ")
    }
    
    // MARK: - Helper Methods
    
    private func keyboardTypeForInputType(_ type: InputType) -> UIKeyboardType {
        switch type {
        case .text:
            return .default
        case .email:
            return .emailAddress
        case .tel:
            return .phonePad
        case .url:
            return .URL
        case .password:
            return .default
        }
    }
}

// MARK: - Input Type Enum

/**
 * Input type enumeration
 */
enum InputType {
    case text
    case email
    case password
    case tel
    case url
}

// MARK: - Shared Field Chrome

/**
 * Shared field chrome (B-prime chrome extraction, adjudication 2026-07-15).
 *
 * The visual treatment of the field box — typography, text color, insets,
 * canvas background, border overlay, and focus-ring overlay — extracted from
 * InputTextBaseFieldStyle so it applies to BOTH rendering paths: the editable
 * TextField/SecureField (via InputTextBaseFieldStyle, which delegates here)
 * and the read-only Text (applied directly). One chrome, two contents — the
 * two paths cannot drift visually.
 */
struct InputTextBaseFieldChrome: ViewModifier {
    let borderColor: Color
    let isFocused: Bool
    let hasTrailingIcon: Bool

    @Environment(\.accessibilityReduceMotion) var reduceMotion
    @Environment(\.dpTheme) private var theme

    /// Minimum content height, reserved UNCONDITIONALLY on both paths:
    /// input line height (fontSize × unitless lineHeight multiplier, the
    /// Badge/Nav token-derived pattern) + vertical insets. This deliberately
    /// does NOT reason about empty `Text` intrinsic size (undocumented, has
    /// varied across SwiftUI releases): an empty readOnly value keeps the
    /// same field height as a filled editable field. Note: the field uses a
    /// fixed token font size (no Dynamic Type) today — if the family adopts
    /// Dynamic Type, this minHeight must scale with it.
    private var minFieldHeight: CGFloat {
        (DesignTokens.typographyInput.fontSize * DesignTokens.typographyInput.lineHeight)
            + (DesignTokens.spaceInset100 * 2)
    }

    func body(content: Content) -> some View {
        content
            .font(Font.system(size: DesignTokens.typographyInput.fontSize)
                .weight(DesignTokens.typographyInput.fontWeight))
            .foregroundColor(theme.colorTextDefault)
            .padding(.leading, DesignTokens.spaceInset100)
            .padding(.vertical, DesignTokens.spaceInset100)
            .padding(.trailing, hasTrailingIcon ? 0 : DesignTokens.spaceInset100)
            .frame(maxWidth: .infinity, minHeight: minFieldHeight, alignment: .leading)
            .background(theme.colorStructureCanvas)
            .overlay(
                RoundedRectangle(cornerRadius: DesignTokens.radius150)
                    .stroke(borderColor, lineWidth: DesignTokens.borderDefault)
            )
            .overlay(
                RoundedRectangle(cornerRadius: DesignTokens.radius150)
                    .stroke(theme.colorActionPrimary, lineWidth: DesignTokens.accessibilityFocusWidth)
                    .padding(-DesignTokens.accessibilityFocusOffset)
                    .opacity(isFocused ? 1 : 0)
                    .animation(
                        reduceMotion ? .none : Animation.timingCurve(0.4, 0.0, 0.2, 1.0, duration: DesignTokens.MotionFocusTransition.duration),
                        value: isFocused
                    )
            )
    }
}

// MARK: - Custom Text Field Style

/**
 * Custom text field style for consistent appearance.
 * Delegates all visual treatment to InputTextBaseFieldChrome (shared with
 * the read-only rendering path).
 */
struct InputTextBaseFieldStyle: TextFieldStyle {
    let borderColor: Color
    let isFocused: Bool
    let hasError: Bool
    let isSuccess: Bool
    let hasTrailingIcon: Bool

    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .modifier(InputTextBaseFieldChrome(
                borderColor: borderColor,
                isFocused: isFocused,
                hasTrailingIcon: hasTrailingIcon
            ))
    }
}

// MARK: - Preview

#if DEBUG
struct InputTextBase_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: 24) {
            InputTextBase(
                id: "preview-default",
                label: "Email",
                value: .constant(""),
                onChange: nil,
                onFocus: nil,
                onBlur: nil,
                helperText: "Enter your email address",
                errorMessage: nil,
                isSuccess: false,
                showInfoIcon: false,
                type: .email,
                autocomplete: .emailAddress,
                placeholder: nil,
                readOnly: false,
                required: false,
                maxLength: nil
            )
            
            InputTextBase(
                id: "preview-filled",
                label: "Email",
                value: .constant("user@example.com"),
                onChange: nil,
                onFocus: nil,
                onBlur: nil,
                helperText: "Enter your email address",
                errorMessage: nil,
                isSuccess: false,
                showInfoIcon: false,
                type: .email,
                autocomplete: .emailAddress,
                placeholder: nil,
                readOnly: false,
                required: false,
                maxLength: nil
            )
            
            InputTextBase(
                id: "preview-error",
                label: "Email",
                value: .constant("invalid"),
                onChange: nil,
                onFocus: nil,
                onBlur: nil,
                helperText: "Enter your email address",
                errorMessage: "Please enter a valid email address",
                isSuccess: false,
                showInfoIcon: false,
                type: .email,
                autocomplete: .emailAddress,
                placeholder: nil,
                readOnly: false,
                required: true,
                maxLength: nil
            )
            
            InputTextBase(
                id: "preview-success",
                label: "Email",
                value: .constant("user@example.com"),
                onChange: nil,
                onFocus: nil,
                onBlur: nil,
                helperText: "Enter your email address",
                errorMessage: nil,
                isSuccess: true,
                showInfoIcon: false,
                type: .email,
                autocomplete: .emailAddress,
                placeholder: nil,
                readOnly: false,
                required: false,
                maxLength: nil
            )

            // Read-only (B-prime): selectable Text in the shared chrome
            InputTextBase(
                id: "preview-read-only",
                label: "Reference number",
                value: .constant("REF-2026-07-15"),
                onChange: nil,
                onFocus: nil,
                onBlur: nil,
                helperText: "Long-press to copy",
                errorMessage: nil,
                isSuccess: false,
                showInfoIcon: false,
                type: .text,
                autocomplete: nil,
                placeholder: nil,
                readOnly: true,
                required: false,
                maxLength: nil
            )

            // Read-only, empty: label rests in placeholder position,
            // chrome reserves full field height
            InputTextBase(
                id: "preview-read-only-empty",
                label: "Reference number",
                value: .constant(""),
                onChange: nil,
                onFocus: nil,
                onBlur: nil,
                helperText: nil,
                errorMessage: nil,
                isSuccess: false,
                showInfoIcon: false,
                type: .text,
                autocomplete: nil,
                placeholder: nil,
                readOnly: true,
                required: false,
                maxLength: nil
            )
        }
        .padding()
    }
}
#endif
