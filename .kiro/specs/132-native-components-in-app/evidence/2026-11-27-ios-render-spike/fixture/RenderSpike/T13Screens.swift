import SwiftUI
import UIKit

/// T-13 probe screens (not committed). Icon-like images, hidden or not, with and without identifiers,
/// plus an in-app accessibility walk whose result is published as a label XCUITest can read.
struct T13Screen: View {
    let hidden: Bool
    @State private var report = "not run"
    var body: some View {
        VStack(spacing: 24) {
            Text("Anchor").accessibilityIdentifier("t13.anchor")
            if hidden {
                Image(systemName: "star.fill").font(.largeTitle).accessibilityHidden(true)
                Image(systemName: "heart.fill").font(.largeTitle)
                    .accessibilityHidden(true).accessibilityIdentifier("t13.hidden.withId")
            } else {
                Image(systemName: "star.fill").font(.largeTitle)
                Image(systemName: "heart.fill").font(.largeTitle).accessibilityIdentifier("t13.visible.withId")
            }
            Button("Walk") { report = AXWalk.run() }.accessibilityIdentifier("t13.walk")
            Text(report).font(.caption2).accessibilityIdentifier("t13.report")
        }
    }
}

enum AXWalk {
    static func run() -> String {
        var axIds: [String] = []      // elements with isAccessibilityElement == true
        var allIds: [String] = []     // every object with an identifier we reached
        var axLabels: [String] = []
        var visited = 0
        func walk(_ any: Any, _ depth: Int) {
            guard depth < 60, let obj = any as? NSObject else { return }
            visited += 1
            let ident = (obj as? UIAccessibilityIdentification)?.accessibilityIdentifier ?? ""
            if !ident.isEmpty { allIds.append(ident) }
            if obj.isAccessibilityElement {
                axIds.append(ident.isEmpty ? "-" : ident)
                axLabels.append(obj.accessibilityLabel ?? "")
            }
            let n = obj.accessibilityElementCount()
            if n != NSNotFound && n > 0 {
                for i in 0..<n { if let e = obj.accessibilityElement(at: i) { walk(e, depth + 1) } }
            } else if let els = obj.accessibilityElements {
                for e in els { walk(e, depth + 1) }
            }
            if let v = obj as? UIView { for s in v.subviews { walk(s, depth + 1) } }
        }
        let windows = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.flatMap { $0.windows }
        for w in windows { walk(w, 0) }
        return "visited=\(visited) ax=\(axIds.joined(separator: ",")) labels=\(axLabels.joined(separator: "|")) ids=\(allIds.joined(separator: ","))"
    }
}
