import SwiftUI
import DesignerPunk

public struct FilterBar: View {
    @Environment(\.dpTheme) private var theme
    public init() {}
    public var body: some View {
        HStack(spacing: DesignTokens.space100) {
            Text("Filter").foregroundStyle(theme.colorTextDefault)
        }
        .padding(DesignTokens.space200)
        .background(theme.colorStructureSurface)
        .probeTheme(.wcag)
    }
}
