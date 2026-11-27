// swift-tools-version:5.9
import PackageDescription
let package = Package(
    name: "AdopterComponents",
    platforms: [.iOS(.v17)],
    products: [.library(name: "AdopterComponents", targets: ["AdopterComponents"])],
    dependencies: [.package(name: "DesignerPunk", path: "../..")],
    targets: [.target(name: "AdopterComponents", dependencies: [.product(name: "DesignerPunk", package: "DesignerPunk")])]
)
