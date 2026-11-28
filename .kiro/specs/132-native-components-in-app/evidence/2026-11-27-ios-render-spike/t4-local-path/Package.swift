// swift-tools-version:5.9
import PackageDescription
let package = Package(
    name: "DesignerPunk",
    platforms: [.iOS(.v17)],
    products: [.library(name: "DesignerPunk", targets: ["DesignerPunk"])],
    targets: [.target(name: "DesignerPunk", path: "Sources/DesignerPunk")]
)
