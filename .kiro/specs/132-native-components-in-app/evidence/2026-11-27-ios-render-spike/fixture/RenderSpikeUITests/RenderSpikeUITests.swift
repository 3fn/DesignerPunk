import XCTest
import UIKit

// Render spike UI tests (Spec 132 evidence, 2026-11-27, Kenya). Measures three tools:
// XCUITest element queries, the element-screenshot ink check, and performAccessibilityAudit.
// Every measured number is printed with a "SPIKE " prefix so the run log is the record.

final class RenderSpikeUITests: XCTestCase {

    override func setUp() {
        super.setUp()
        continueAfterFailure = true
    }

    private func launch(screen: String, scheme: String, family: String = "base") -> XCUIApplication {
        let app = XCUIApplication()
        app.launchArguments = ["-fixtureScreen", screen, "-fixtureScheme", scheme, "-fixtureFamily", family]
        app.launch()
        return app
    }

    // MARK: - Ink

    private struct Pixels {
        let width: Int
        let height: Int
        let bytes: [UInt8]
        func rgb(_ x: Int, _ y: Int) -> (Int, Int, Int) {
            let i = (y * width + x) * 4
            return (Int(bytes[i]), Int(bytes[i + 1]), Int(bytes[i + 2]))
        }
    }

    private func pixels(_ image: UIImage) -> Pixels {
        let cg = image.cgImage!
        let w = cg.width, h = cg.height
        var bytes = [UInt8](repeating: 0, count: w * h * 4)
        bytes.withUnsafeMutableBytes { buf in
            let ctx = CGContext(data: buf.baseAddress, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                                space: CGColorSpace(name: CGColorSpace.sRGB)!,
                                bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
            ctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
        }
        return Pixels(width: w, height: h, bytes: bytes)
    }

    /// The fraction of the element's pixels that differ from the background sample by more than
    /// `threshold` (sum of absolute channel differences, 0–765).
    private func ink(of element: XCUIElement, background: (Int, Int, Int), threshold: Int = 24) -> Double {
        let p = pixels(element.screenshot().image)
        var differing = 0
        for y in 0..<p.height {
            for x in 0..<p.width {
                let (r, g, b) = p.rgb(x, y)
                if abs(r - background.0) + abs(g - background.1) + abs(b - background.2) > threshold { differing += 1 }
            }
        }
        return Double(differing) / Double(p.width * p.height)
    }

    private func backgroundSample(_ app: XCUIApplication) -> (Int, Int, Int) {
        let p = pixels(app.otherElements["fixture.background"].firstMatch.screenshot().image)
        return p.rgb(p.width / 2, p.height / 2)
    }

    // MARK: - 1. Element queries

    func testQueries() {
        let app = launch(screen: "good", scheme: "light")
        let button = app.buttons["fixture.button"]
        XCTAssertTrue(button.waitForExistence(timeout: 10))
        let f = button.frame
        print("SPIKE query fixture.button exists=\(button.exists) frame=\(f)")
        XCTAssertGreaterThan(f.width, 0)
        XCTAssertGreaterThan(f.height, 0)

        // Measured, not asserted. Run 1 asserted absence (kenya-plan-r2.md's UNVERIFIED expectation) and failed.
        for id in ["fixture.decorative.hidden", "fixture.decorative.hiddenFirst"] {
            let hidden = app.descendants(matching: .any)[id]
            let type = hidden.exists ? String(hidden.elementType.rawValue) : "-"
            print("SPIKE query \(id) exists=\(hidden.exists) elementType=\(type) frame=\(hidden.exists ? "\(hidden.frame)" : "-")")
        }

        let wrapper = app.descendants(matching: .any)["fixture.decorative.wrapper"]
        print("SPIKE query fixture.decorative.wrapper exists=\(wrapper.exists) frame=\(wrapper.frame)")
        XCTAssertTrue(wrapper.exists)

        // Interaction: tap, then read the state back through the accessibility value.
        button.tap()
        print("SPIKE query fixture.button value after tap=\(String(describing: button.value))")
        XCTAssertEqual(button.value as? String, "1")
    }

    // MARK: - 2. Ink check, per scheme and theme family

    private func inkRun(scheme: String, family: String) {
        let app = launch(screen: "good", scheme: scheme, family: family)
        XCTAssertTrue(app.buttons["fixture.button"].waitForExistence(timeout: 10))
        let bg = backgroundSample(app)
        print("SPIKE ink \(family)/\(scheme) background=\(bg)")
        let inked: [(String, XCUIElement)] = [
            ("fixture.button", app.buttons["fixture.button"]),
            ("fixture.decorative.wrapper", app.descendants(matching: .any)["fixture.decorative.wrapper"]),
            ("fixture.textfield", app.textFields["fixture.textfield"]),
            ("fixture.toggle", app.switches["fixture.toggle"]),
        ]
        for (id, element) in inked {
            let value = ink(of: element, background: bg)
            print("SPIKE ink \(family)/\(scheme) \(id)=\(String(format: "%.4f", value))")
            XCTAssertGreaterThan(value, 0.01, "\(id) should draw ink against the canvas")
        }
        let empty = app.otherElements["fixture.empty"].firstMatch
        let emptyInk = ink(of: empty, background: bg)
        print("SPIKE ink \(family)/\(scheme) fixture.empty=\(String(format: "%.4f", emptyInk)) (known-bad: expected 0)")
        XCTAssertLessThan(emptyInk, 0.001, "the empty fixture must read as no ink, or the check does not discriminate")
    }

    func testInkBaseLight() { inkRun(scheme: "light", family: "base") }
    func testInkBaseDark() { inkRun(scheme: "dark", family: "base") }
    func testInkWcagLight() { inkRun(scheme: "light", family: "wcag") }
    func testInkWcagDark() { inkRun(scheme: "dark", family: "wcag") }

    // MARK: - 3. Accessibility audit

    private func audit(_ app: XCUIApplication, _ types: XCUIAccessibilityAuditType, label: String) throws -> [XCUIAccessibilityAuditIssue] {
        var issues: [XCUIAccessibilityAuditIssue] = []
        try app.performAccessibilityAudit(for: types) { issue in
            issues.append(issue)
            let who = issue.element.map { "\($0.identifier)" } ?? "nil"
            print("SPIKE audit \(label) type=\(issue.auditType.rawValue) element=\(who) — \(issue.compactDescription)")
            return true // recorded here; the assertions below decide
        }
        print("SPIKE audit \(label) issues=\(issues.count)")
        return issues
    }

    func testAuditGoodLight() throws {
        let app = launch(screen: "good", scheme: "light")
        XCTAssertTrue(app.buttons["fixture.button"].waitForExistence(timeout: 10))
        let issues = try audit(app, .all, label: "good/light")
        XCTAssertEqual(issues.count, 0)
    }

    func testAuditGoodDark() throws {
        let app = launch(screen: "good", scheme: "dark")
        XCTAssertTrue(app.buttons["fixture.button"].waitForExistence(timeout: 10))
        let issues = try audit(app, .all, label: "good/dark")
        XCTAssertEqual(issues.count, 0)
    }

    func testAuditBadKnownBad() throws {
        let app = launch(screen: "bad", scheme: "light")
        XCTAssertTrue(app.buttons["bad.tiny"].waitForExistence(timeout: 10))
        let issues = try audit(app, .all, label: "bad/light")
        XCTAssertGreaterThan(issues.count, 0, "the known-bad screen must produce audit issues")
    }

    func testAuditTypography() throws {
        let app = launch(screen: "typo", scheme: "light")
        XCTAssertTrue(app.staticTexts["typo.style"].waitForExistence(timeout: 10))
        let issues = try audit(app, .dynamicType, label: "typo/dynamicType")
        // Measured, not asserted: which of the two texts the Dynamic Type audit flags.
        print("SPIKE audit typo flagged=\(issues.compactMap { $0.element?.identifier })")
    }
}
