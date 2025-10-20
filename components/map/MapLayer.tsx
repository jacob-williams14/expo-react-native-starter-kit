import type { FeatureCollection } from "geojson";
import { useEffect, useState } from "react";

import { FillLayer, ShapeSource } from "@rnmapbox/maps";

import { loadGeoJSON } from "../../lib/map/layerAssets";
import type { LayerInfo } from "../../lib/map/layerConfig";

interface MapLayerProps {
  layer: LayerInfo;
}

export function MapLayer({ layer }: MapLayerProps) {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await loadGeoJSON(layer.geojsonFile);
      setGeojson(data);
      setLoading(false);
    }
    void load();
  }, [layer.geojsonFile]);

  if (loading || !geojson) {
    return null;
  }

  // Create color expression based on level property
  const fillColorExpression = createColorExpression(layer);

  return (
    <ShapeSource id={`${layer.id}-source`} shape={geojson}>
      <FillLayer
        id={`${layer.id}-fill`}
        belowLayerID="waterway-label"
        style={{
          fillColor: fillColorExpression,
          fillOpacity: 0.5,
          fillOutlineColor: "rgba(255, 255, 255, 0.25)",
        }}
      />
    </ShapeSource>
  );
}

function createColorExpression(layer: LayerInfo): any {
  const { colorScale, type } = layer;

  // Define thresholds based on layer type
  let thresholds: number[];

  switch (type) {
    case "waves":
    case "waves-500m":
      // Wave heights in meters
      thresholds = [0, 0.5, 1.0, 1.5, 2.0];
      break;
    case "water":
      // Water current speeds in m/s
      thresholds = [0, 0.1, 0.2, 0.3, 0.5];
      break;
    case "wind":
      // Wind speeds in m/s
      thresholds = [0, 5, 10, 15, 20];
      break;
    case "temp":
      // Temperature in Celsius
      thresholds = [0, 5, 10, 15, 20];
      break;
    default:
      thresholds = [0, 0.25, 0.5, 0.75, 1.0];
  }

  // Create Mapbox expression for interpolated colors
  // Format: ['interpolate', ['linear'], ['get', 'level'], threshold1, color1, threshold2, color2, ...]
  const expression: any[] = ["interpolate", ["linear"], ["get", "level"]];

  for (let i = 0; i < thresholds.length; i++) {
    expression.push(thresholds[i]);
    expression.push(colorScale[i] || colorScale[colorScale.length - 1]);
  }

  return expression;
}
