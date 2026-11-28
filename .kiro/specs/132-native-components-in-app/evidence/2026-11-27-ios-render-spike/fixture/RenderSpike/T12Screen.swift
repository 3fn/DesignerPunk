import SwiftUI

struct ScaledSystemFont: ViewModifier {
    @ScaledMetric var size: CGFloat
    let weight: Font.Weight
    init(size: CGFloat, weight: Font.Weight, relativeTo style: Font.TextStyle) {
        _size = ScaledMetric(wrappedValue: size, relativeTo: style)
        self.weight = weight
    }
    func body(content: Content) -> some View { content.font(.system(size: size, weight: weight)) }
}

struct T12Screen: View {
    @Environment(\.dpTheme) private var theme
    var body: some View {
        VStack(spacing: DesignTokens.space200) {
            Text("Fixed token size")
                .font(.system(size: DesignTokens.fontSize100))
                .accessibilityIdentifier("t12.fixed")
            Text("Scaled system size")
                .modifier(ScaledSystemFont(size: DesignTokens.fontSize100, weight: .medium, relativeTo: .body))
                .accessibilityIdentifier("t12.scaledMetric")
            Text("Custom relativeTo")
                .font(.custom("Figtree", size: DesignTokens.fontSize100, relativeTo: .body))
                .accessibilityIdentifier("t12.customRelativeTo")
        }
        .foregroundStyle(theme.colorTextDefault)
    }
}
