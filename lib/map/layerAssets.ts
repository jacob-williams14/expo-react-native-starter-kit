// Import all GeoJSON files statically as assets
// With metro.config.js configured to support .geojson, these will be loaded as assets
// We need to fetch them as JSON at runtime

import { Asset } from "expo-asset";
import type { FeatureCollection } from "geojson";

/* eslint-disable @typescript-eslint/no-require-imports */
const GEOJSON_ASSET_MODULES: Record<string, any> = {
  "le-waves-500m.geojson": require("../../assets/map-layers/le-waves-500m.geojson"),
  "le-waves-period-500m.geojson": require("../../assets/map-layers/le-waves-period-500m.geojson"),
  "le-waves.geojson": require("../../assets/map-layers/le-waves.geojson"),
  "leofs-temp.geojson": require("../../assets/map-layers/leofs-temp.geojson"),
  "leofs-water.geojson": require("../../assets/map-layers/leofs-water.geojson"),
  "leofs-wind.geojson": require("../../assets/map-layers/leofs-wind.geojson"),
  "lh-waves-500m.geojson": require("../../assets/map-layers/lh-waves-500m.geojson"),
  "lh-waves-period-500m.geojson": require("../../assets/map-layers/lh-waves-period-500m.geojson"),
  "lh-waves.geojson": require("../../assets/map-layers/lh-waves.geojson"),
  "lhofs-temp.geojson": require("../../assets/map-layers/lhofs-temp.geojson"),
  "lhofs-water.geojson": require("../../assets/map-layers/lhofs-water.geojson"),
  "lhofs-wind.geojson": require("../../assets/map-layers/lhofs-wind.geojson"),
  "lm-waves-500m.geojson": require("../../assets/map-layers/lm-waves-500m.geojson"),
  "lm-waves-period-500m.geojson": require("../../assets/map-layers/lm-waves-period-500m.geojson"),
  "lm-waves.geojson": require("../../assets/map-layers/lm-waves.geojson"),
  "lmh-waves-500m.geojson": require("../../assets/map-layers/lmh-waves-500m.geojson"),
  "lmh-waves-period-500m.geojson": require("../../assets/map-layers/lmh-waves-period-500m.geojson"),
  "lmofs-temp.geojson": require("../../assets/map-layers/lmofs-temp.geojson"),
  "lmofs-water.geojson": require("../../assets/map-layers/lmofs-water.geojson"),
  "lmofs-wind.geojson": require("../../assets/map-layers/lmofs-wind.geojson"),
  "lo-waves-500m.geojson": require("../../assets/map-layers/lo-waves-500m.geojson"),
  "lo-waves-period-500m.geojson": require("../../assets/map-layers/lo-waves-period-500m.geojson"),
  "lo-waves.geojson": require("../../assets/map-layers/lo-waves.geojson"),
  "loofs-temp.geojson": require("../../assets/map-layers/loofs-temp.geojson"),
  "loofs-water.geojson": require("../../assets/map-layers/loofs-water.geojson"),
  "loofs-wind.geojson": require("../../assets/map-layers/loofs-wind.geojson"),
  "ls-waves-500m.geojson": require("../../assets/map-layers/ls-waves-500m.geojson"),
  "ls-waves-period-500m.geojson": require("../../assets/map-layers/ls-waves-period-500m.geojson"),
  "ls-waves.geojson": require("../../assets/map-layers/ls-waves.geojson"),
  "lsofs-temp.geojson": require("../../assets/map-layers/lsofs-temp.geojson"),
  "lsofs-water.geojson": require("../../assets/map-layers/lsofs-water.geojson"),
  "lsofs-wind.geojson": require("../../assets/map-layers/lsofs-wind.geojson"),
};

// Cache for loaded GeoJSON data
const GEOJSON_CACHE: Record<string, FeatureCollection> = {};

// Async function to load and parse GeoJSON
export async function loadGeoJSON(
  filename: string
): Promise<FeatureCollection | null> {
  // Return cached version if available
  if (GEOJSON_CACHE[filename]) {
    return GEOJSON_CACHE[filename];
  }

  try {
    const assetModule = GEOJSON_ASSET_MODULES[filename];
    if (!assetModule) {
      console.warn(`No asset module found for ${filename}`);
      return null;
    }

    // Load asset and get URI
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync();

    // Fetch and parse the JSON
    const response = await fetch(asset.localUri || asset.uri);
    const geojson = await response.json();

    // Cache it
    GEOJSON_CACHE[filename] = geojson;

    return geojson;
  } catch (error) {
    console.error(`Error loading GeoJSON ${filename}:`, error);
    return null;
  }
}

// JSON bounds files - these can be directly required as they're JSON
export const BOUNDS_ASSETS: Record<string, any> = {
  "leofs-water.json": require("../../assets/map-layers/leofs-water.json"),
  "leofs-wind.json": require("../../assets/map-layers/leofs-wind.json"),
  "lhofs-water.json": require("../../assets/map-layers/lhofs-water.json"),
  "lhofs-wind.json": require("../../assets/map-layers/lhofs-wind.json"),
  "lmofs-water.json": require("../../assets/map-layers/lmofs-water.json"),
  "lmofs-wind.json": require("../../assets/map-layers/lmofs-wind.json"),
  "loofs-water.json": require("../../assets/map-layers/loofs-water.json"),
  "loofs-wind.json": require("../../assets/map-layers/loofs-wind.json"),
  "lsofs-water.json": require("../../assets/map-layers/lsofs-water.json"),
  "lsofs-wind.json": require("../../assets/map-layers/lsofs-wind.json"),
};

// PNG assets for directional layers (not currently used for visualization)
export const PNG_ASSETS: Record<string, any> = {
  "leofs-water.png": require("../../assets/map-layers/leofs-water.png"),
  "leofs-wind.png": require("../../assets/map-layers/leofs-wind.png"),
  "lhofs-water.png": require("../../assets/map-layers/lhofs-water.png"),
  "lhofs-wind.png": require("../../assets/map-layers/lhofs-wind.png"),
  "lmofs-water.png": require("../../assets/map-layers/lmofs-water.png"),
  "lmofs-wind.png": require("../../assets/map-layers/lmofs-wind.png"),
  "loofs-water.png": require("../../assets/map-layers/loofs-water.png"),
  "loofs-wind.png": require("../../assets/map-layers/loofs-wind.png"),
  "lsofs-water.png": require("../../assets/map-layers/lsofs-water.png"),
  "lsofs-wind.png": require("../../assets/map-layers/lsofs-wind.png"),
};
