import SwiftUI

// Render spike fixture app (Spec 132 evidence, 2026-11-27, Kenya). Not a DesignerPunk component:
// plain SwiftUI views styled with the consumer's generated tokens, read through `\.dpTheme`.
// Launch arguments choose the screen, the colour scheme and the theme family.

@main
struct RenderSpikeApp: App {
    var body: some Scene {
        WindowGroup {
            FixtureRoot()
        }
    }
}

enum FixtureArgs {
    static var args: [String] { ProcessInfo.processInfo.arguments }
    static func value(_ key: String) -> String? {
        guard let i = args.firstIndex(of: key), i + 1 < args.count else { return nil }
        return args[i + 1]
    }
    static var screen: String { value("-fixtureScreen") ?? "good" }
    static var scheme: ColorScheme? {
        switch value("-fixtureScheme") {
        case "dark": return .dark
        case "light": return .light
        default: return nil
        }
    }
    static var family: ProbeThemeFamily { value("-fixtureFamily") == "wcag" ? .wcag : .base }
}

struct FixtureRoot: View {
    var body: some View {
        Group {
            switch FixtureArgs.screen {
            case "bad": BadScreen()
            case "typo": TypographyScreen()
            case "t12": T12Screen()
            case "t13hidden": T13Screen(hidden: true)
            case "t13visible": T13Screen(hidden: false)
            default: GoodScreen()
            }
        }
        .probeTheme(FixtureArgs.family)
        .preferredColorScheme(FixtureArgs.scheme)
    }
}

/// The screen the audit should pass, and the ink check reads.
struct GoodScreen: View {
    @Environment(\.dpTheme) private var theme
    @State private var text = ""
    @State private var on = false
    @State private var taps = 0

    var body: some View {
        ZStack {
            theme.colorStructureCanvas.ignoresSafeArea()
            VStack(spacing: DesignTokens.space200) {
                // A patch of bare canvas: the ink check's background sample.
                Color.clear
                    .frame(width: 44, height: 44)
                    .accessibilityElement()
                    .accessibilityLabel("Background sample")
                    .accessibilityIdentifier("fixture.background")

                Button { taps += 1 } label: {
                    Text("Continue")
                        .font(.body)
                        .foregroundStyle(theme.colorContrastOnAction)
                        .padding(.horizontal, DesignTokens.space200)
                        .frame(minHeight: DesignTokens.tapAreaRecommended)
                        .background(theme.colorActionPrimary, in: RoundedRectangle(cornerRadius: DesignTokens.radius100))
                }
                .accessibilityIdentifier("fixture.button")
                .accessibilityValue("\(taps)")

                // A decorative primitive hidden from VoiceOver, as the Progress-Indicator primitives are.
                Circle()
                    .fill(theme.colorActionPrimary)
                    .frame(width: 24, height: 24)
                    .accessibilityHidden(true)
                    .accessibilityIdentifier("fixture.decorative.hidden")

                // The same, with the identifier applied before the hide (modifier order variant).
                Circle()
                    .fill(theme.colorActionPrimary)
                    .frame(width: 24, height: 24)
                    .accessibilityIdentifier("fixture.decorative.hiddenFirst")
                    .accessibilityHidden(true)

                // The same primitive inside a fixture-only wrapper element (kenya-plan-r2.md L22).
                ZStack {
                    Circle()
                        .fill(theme.colorActionPrimary)
                        .frame(width: 24, height: 24)
                        .accessibilityHidden(true)
                }
                .accessibilityElement(children: .ignore)
                .accessibilityLabel("Decorative fixture")
                .accessibilityIdentifier("fixture.decorative.wrapper")

                // Known-bad for the ink check: an element that draws nothing.
                Color.clear
                    .frame(width: 60, height: 24)
                    .accessibilityElement()
                    .accessibilityLabel("Empty fixture")
                    .accessibilityIdentifier("fixture.empty")

                // UIKit-backed controls, which ImageRenderer drew as placeholders (kenya-plan-r1.md L86).
                TextField("Email", text: $text)
                    .textFieldStyle(.roundedBorder)
                    .frame(width: 240)
                    .accessibilityIdentifier("fixture.textfield")

                Toggle("Notifications", isOn: $on)
                    .frame(width: 240)
                    .foregroundStyle(theme.colorTextDefault)
                    .accessibilityIdentifier("fixture.toggle")
            }
        }
    }
}

/// Known-bad screen: the audit must report issues here.
struct BadScreen: View {
    @Environment(\.dpTheme) private var theme

    var body: some View {
        ZStack {
            Color.white.ignoresSafeArea()
            VStack(spacing: DesignTokens.space200) {
                // A 12 × 12 button with no label: hit region and description.
                Button {} label: {
                    Rectangle().fill(theme.colorActionPrimary).frame(width: 12, height: 12)
                }
                .accessibilityIdentifier("bad.tiny")

                // Near-white text on white: contrast.
                Text("Low contrast text")
                    .font(.body)
                    .foregroundStyle(Color(white: 0.93))
                    .accessibilityIdentifier("bad.contrast")
            }
        }
        .environment(\.colorScheme, .light)
    }
}

/// Typography: a token-sized system font next to a Dynamic Type text style.
struct TypographyScreen: View {
    @Environment(\.dpTheme) private var theme

    var body: some View {
        ZStack {
            theme.colorStructureCanvas.ignoresSafeArea()
            VStack(spacing: DesignTokens.space200) {
                Text("Token size text")
                    .font(.system(size: DesignTokens.fontSize100))
                    .foregroundStyle(theme.colorTextDefault)
                    .accessibilityIdentifier("typo.fixed")
                Text("Text style text")
                    .font(.body)
                    .foregroundStyle(theme.colorTextDefault)
                    .accessibilityIdentifier("typo.style")
            }
        }
    }
}
