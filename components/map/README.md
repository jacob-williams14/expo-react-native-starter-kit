# Great Lakes Map Layers

This directory contains components for displaying and managing Great Lakes environmental data layers on the Mapbox map.

## Overview

The map layer system provides visualization of various environmental data for the Great Lakes:

- **Wave Heights**: Contour data showing wave heights in meters (both 2.5km and 500m resolution)
- **Water Currents**: Current speeds and directions in m/s
- **Wind Speed**: Wind speeds and directions in m/s
- **Surface Temperature**: Water surface temperatures in Celsius

## Components

### `LayerControls.tsx`
Interactive UI component that allows users to:
- Toggle individual layers on/off
- Filter layers by lake (Superior, Michigan, Huron, Erie, Ontario)
- Clear all active layers
- View layer descriptions and units

### `MapLayer.tsx`
Core component that renders GeoJSON data as styled fill layers on the map. Features:
- Dynamic color scaling based on magnitude values
- Automatic integration of directional overlays for wind/current layers
- Optimized rendering using memoization

### `DirectionalLayer.tsx`
Renders PNG-based directional overlays for wind and water currents. The PNG files encode direction information in their Red and Green channels:
- **Red channel**: U component (west to east velocity)
- **Green channel**: V component (north to south velocity)

### `LayerLegend.tsx`
Displays a color-coded legend for the currently active layer, helping users interpret magnitude values.

## Data Format

### GeoJSON Files
Located in `assets/map-layers/`, these contain:
- **type**: "FeatureCollection"
- **features**: Array of polygon features
- **properties.level**: Magnitude value (wave height, speed, temperature, etc.)

### PNG Files
Directional data encoded as:
- Red channel: U component scaled from uMin to uMax
- Green channel: V component scaled from vMin to vMax
- Bounds defined in corresponding JSON files

### JSON Bounds Files
Contain metadata for directional layers:
```json
{
  "width": 360,
  "height": 180,
  "uMin": -2.104690429109226,
  "uMax": 15.098769847279073,
  "vMin": -4.992816788411915,
  "vMax": 8.630283876330395
}
```

## Lake Codes

- `ls` - Lake Superior
- `lm` - Lake Michigan
- `lh` - Lake Huron
- `lmh` - Lake Michigan-Huron combined
- `le` - Lake Erie (possibly St. Clair)
- `lo` - Lake Ontario

## Data Sources

Data is sourced from NOAA Great Lakes Operational Forecast System (GLOFS):
- **lsofs** - Lake Superior OFS
- **lmofs** - Lake Michigan OFS
- **lhofs** - Lake Huron OFS
- **leofs** - Lake Erie OFS
- **loofs** - Lake Ontario OFS

## Usage

```typescript
import { LayerControls } from "../../components/map/LayerControls";
import { MapLayer } from "../../components/map/MapLayer";
import { useMapLayers } from "../../hooks/useMapLayers";
import { LAYERS } from "../../lib/map/layerConfig";

function MyMap() {
  const { activeLayers, toggleLayer, clearLayers } = useMapLayers();

  return (
    <MapView>
      {/* Render active layers */}
      {LAYERS.filter((layer) => activeLayers.has(layer.id)).map((layer) => (
        <MapLayer key={layer.id} layer={layer} />
      ))}
      
      {/* Layer controls */}
      <LayerControls
        activeLayers={activeLayers}
        onToggleLayer={toggleLayer}
        onClearLayers={clearLayers}
      />
    </MapView>
  );
}
```

## Converting PBF Files

The project includes a conversion script to convert PBF (Protocol Buffer) files to GeoJSON:

```bash
node scripts/convert-pbf-to-geojson.js
```

This script:
1. Reads all `.pbf` files from the source directory
2. Converts them to GeoJSON using the `geobuf` library
3. Copies associated PNG and JSON files
4. Outputs everything to `assets/map-layers/`

## Future Enhancements

1. **WebGL Directional Rendering**: Implement custom WebGL layer to properly decode PNG channels and render directional arrows/sprites
2. **Time Series**: Add time-based animation for forecast data
3. **Layer Opacity Control**: Allow users to adjust transparency of individual layers
4. **Multiple Layer Support**: Show legends for all active layers simultaneously
5. **Custom Color Scales**: User-configurable color ramps
6. **Data Refresh**: Periodic updates from live NOAA feeds

## Performance Considerations

- GeoJSON files are statically imported to avoid dynamic import issues with Metro bundler
- Large GeoJSON files (>5MB) may impact initial load time
- Consider implementing tile-based rendering for very large datasets
- Layer toggling is optimized using Set data structure for O(1) lookups

