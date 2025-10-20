const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add geojson as supported asset extension
config.resolver.assetExts.push("geojson");

module.exports = withNativeWind(config, { input: "./global.css" });
