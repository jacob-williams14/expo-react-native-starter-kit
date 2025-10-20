import { ImageSource, RasterLayer } from "@rnmapbox/maps";
import { useMemo } from "react";
import { Image } from "react-native";

import { BOUNDS_ASSETS, PNG_ASSETS } from "../../lib/map/layerAssets";
import type { LayerInfo } from "../../lib/map/layerConfig";

interface DirectionalLayerProps {
  layer: LayerInfo;
}

interface BoundsData {
  width: number;
  height: number;
  uMin: number;
  uMax: number;
  vMin: number;
  vMax: number;
}

export function DirectionalLayer({ layer }: DirectionalLayerProps) {
  // Load PNG and bounds from static assets
  const pngAsset = useMemo(() => {
    if (!layer.pngFile) return null;
    return PNG_ASSETS[layer.pngFile];
  }, [layer.pngFile]);

  const boundsData: BoundsData | undefined = useMemo(() => {
    if (!layer.boundsFile) return undefined;
    return BOUNDS_ASSETS[layer.boundsFile];
  }, [layer.boundsFile]);

  if (!pngAsset || !boundsData) {
    console.warn(
      `Directional layer assets not found for ${layer.id}: ${layer.pngFile}, ${layer.boundsFile}`
    );
    return null;
  }

  // Get image dimensions and bounds from boundsData
  const { width, height, uMin, uMax, vMin, vMax } = boundsData;

  // For now, we'll use a simple approach with ImageSource
  // In a more advanced implementation, you would:
  // 1. Decode the PNG to extract R/G channels for u/v components
  // 2. Create a custom WebGL layer to render directional arrows
  // 3. Use the uMin/uMax/vMin/vMax to properly scale the vectors

  // This is a placeholder that shows the PNG as a raster overlay
  // You may need to implement custom WebGL rendering for proper directional visualization

  return (
    <>
      <ImageSource
        id={`${layer.id}-directional-source`}
        url={Image.resolveAssetSource(pngAsset).uri}
        coordinates={[
          [-92, 50], // top-left [lng, lat]
          [-76, 50], // top-right
          [-76, 41], // bottom-right
          [-92, 41], // bottom-left
        ]}
      >
        <RasterLayer
          id={`${layer.id}-directional-raster`}
          style={{
            rasterOpacity: 0.4,
            rasterFadeDuration: 300,
          }}
        />
      </ImageSource>
    </>
  );
}

