# Great Lakes Seagull Map Layers - Integration Summary

This document summarizes the integration of Great Lakes environmental data layers into the Expo React Native starter kit's Mapbox map.

## What Was Added

### 1. Data Conversion & Assets (✓ Complete)

- **Converted 32 PBF files** to GeoJSON format using the `geobuf` library
- **Copied 20 PNG files** containing directional data (wind/water currents)
- **Copied 10 JSON files** with bounds metadata
- **Total: 71 files** in `assets/map-layers/`

**Script:** `scripts/convert-pbf-to-geojson.js`

- Automated conversion from Protocol Buffer format to GeoJSON
- Handles all lake systems (Superior, Michigan, Huron, Erie, Ontario)
- Preserves magnitude data in feature properties

### 2. Layer Configuration (✓ Complete)

**File:** `lib/map/layerConfig.ts`

- Defined 25 unique layers across 5 Great Lakes
- Configured layer metadata (names, types, units, descriptions)
- Set up color scales for different data types
- Lake codes: `ls`, `lm`, `lh`, `lmh`, `le`, `lo`

**File:** `lib/map/layerAssets.ts`

- Static imports for all GeoJSON, PNG, and JSON files
- Necessary for React Native/Metro bundler compatibility
- Provides O(1) asset lookup

### 3. Map Components (✓ Complete)

#### `components/map/LayerControls.tsx`

Interactive layer management panel featuring:

- Toggle layers on/off with checkboxes
- Filter by lake (All, Superior, Michigan, Huron, Erie, Ontario)
- Clear all layers button
- Shows active layer count
- Expandable/collapsible UI
- Scrollable layer list with descriptions

#### `components/map/MapLayer.tsx`

Core rendering component:

- Displays GeoJSON data as styled fill layers
- Dynamic color interpolation based on magnitude values
- Configurable thresholds per layer type:
  - **Waves**: 0 → 2.0+ meters
  - **Water Currents**: 0 → 0.5+ m/s
  - **Wind**: 0 → 20+ m/s
  - **Temperature**: 0 → 20+ °C
- Integrates directional overlays automatically

#### `components/map/DirectionalLayer.tsx`

Renders wind/current direction visualization:

- Uses PNG files with R/G channels encoding U/V components
- Applies bounds metadata for proper scaling
- Overlays on corresponding magnitude layers
- Adjustable opacity (currently 0.4)

#### `components/map/LayerLegend.tsx`

Visual legend display:

- Shows color scale for active layer
- Value labels with units
- Positioned bottom-left of map
- Auto-hides when no layers active

### 4. Custom Hook (✓ Complete)

**File:** `hooks/useMapLayers.ts`

- State management for active layers using Set
- `toggleLayer()` - Add/remove layers
- `isLayerActive()` - Check layer status
- `clearLayers()` - Remove all layers
- Optimized for performance with useCallback

### 5. Integration (✓ Complete)

**File:** `app/(tabs)/explore.tsx`

- Integrated all components into existing Mapbox map
- Layer controls positioned top-right
- Legend positioned bottom-left
- Renders active layers dynamically
- Maintains existing functionality (user location, camera)

## Available Layers

### Lake Superior (ls)

- Wave Heights (2.5km resolution)
- Wave Heights (500m resolution)
- Water Currents (with direction)
- Wind Speed (with direction)
- Surface Temperature

### Lake Michigan (lm)

- Wave Heights (2.5km resolution)
- Wave Heights (500m resolution)
- Water Currents (with direction)
- Wind Speed (with direction)
- Surface Temperature

### Lake Huron (lh)

- Wave Heights (2.5km resolution)
- Wave Heights (500m resolution)
- Water Currents (with direction)
- Wind Speed (with direction)
- Surface Temperature

### Lake Erie (le)

- Wave Heights (2.5km resolution)
- Wave Heights (500m resolution)
- Water Currents (with direction)
- Wind Speed (with direction)
- Surface Temperature

### Lake Ontario (lo)

- Wave Heights (2.5km resolution)
- Wave Heights (500m resolution)
- Water Currents (with direction)
- Wind Speed (with direction)
- Surface Temperature

## Data Sources

All data sourced from NOAA Great Lakes Operational Forecast System (GLOFS):

- **LSOFS** - Lake Superior Operational Forecast System
- **LMOFS** - Lake Michigan Operational Forecast System
- **LHOFS** - Lake Huron Operational Forecast System
- **LEOFS** - Lake Erie Operational Forecast System
- **LOOFS** - Lake Ontario Operational Forecast System

## Technical Details

### GeoJSON Structure

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [...]
      },
      "properties": {
        "level": 1.3715999561088013
      }
    }
  ]
}
```

### PNG Directional Encoding

- **Red Channel**: U component (west→east velocity)
- **Green Channel**: V component (north→south velocity)
- Values normalized between uMin/uMax and vMin/vMax (from JSON bounds)

### Color Scales

All layers use 5-color gradient interpolation:

- **Waves**: Blue → Cyan → Green → Yellow → Red
- **Water**: Navy → Blue → Cyan → White
- **Wind**: Light Green → Yellow → Orange → Red → Dark Red
- **Temperature**: Blue → Cyan → Green → Yellow → Red

## Usage Example

```typescript
import { LayerControls } from "../../components/map/LayerControls";
import { LayerLegend } from "../../components/map/LayerLegend";
import { MapLayer } from "../../components/map/MapLayer";
import { useMapLayers } from "../../hooks/useMapLayers";
import { LAYERS, type LayerInfo } from "../../lib/map/layerConfig";

export default function MapScreen() {
  const { activeLayers, toggleLayer, clearLayers } = useMapLayers();

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}>
        {/* User location, camera, etc. */}

        {/* Render active layers */}
        {LAYERS.filter((layer) => activeLayers.has(layer.id)).map(
          (layer: LayerInfo) => (
            <MapLayer key={layer.id} layer={layer} />
          )
        )}
      </MapView>

      {/* Controls */}
      <LayerControls
        activeLayers={activeLayers}
        onToggleLayer={toggleLayer}
        onClearLayers={clearLayers}
      />

      {/* Legend */}
      <LayerLegend activeLayers={activeLayers} />
    </View>
  );
}
```

## Dependencies Added

```json
{
  "dependencies": {
    "pbf": "^3.2.1",
    "geojson": "^0.5.0"
  },
  "devDependencies": {
    "geobuf": "^3.0.2",
    "@mapbox/vector-tile": "^1.3.1"
  }
}
```

## File Structure

```
expo-react-native-starter-kit/
├── app/(tabs)/
│   └── explore.tsx                    # Updated with layer integration
├── assets/
│   └── map-layers/                    # 71 data files
│       ├── *.geojson                  # GeoJSON contour data
│       ├── *.png                      # Directional overlays
│       └── *.json                     # Bounds metadata
├── components/map/
│   ├── DirectionalLayer.tsx           # PNG overlay renderer
│   ├── LayerControls.tsx              # Interactive layer panel
│   ├── LayerLegend.tsx                # Color scale legend
│   ├── MapLayer.tsx                   # GeoJSON layer renderer
│   └── README.md                      # Component documentation
├── hooks/
│   └── useMapLayers.ts                # Layer state management
├── lib/map/
│   ├── layerAssets.ts                 # Static asset imports
│   └── layerConfig.ts                 # Layer metadata & config
├── scripts/
│   └── convert-pbf-to-geojson.js      # PBF → GeoJSON converter
└── SEAGULL_MAP_LAYERS.md             # This file
```

## Testing the Integration

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Navigate to the Explore tab**

3. **Open Layer Controls** (top-right button)

4. **Toggle a layer** (e.g., "Superior - Wave Heights")

5. **Verify:**
   - ✓ Colored contours appear on map
   - ✓ Legend displays in bottom-left
   - ✓ Controls show "1 active" layer
   - ✓ Can toggle layer off
   - ✓ Can filter by lake
   - ✓ Can clear all layers

## Known Limitations & Future Work

### Current Limitations

1. **Directional visualization**: PNG overlays are displayed as simple rasters. For proper arrow/sprite rendering, a custom WebGL implementation is needed to decode R/G channels and generate directional indicators.

2. **Static coordinates**: `DirectionalLayer.tsx` uses placeholder coordinates for the PNG overlay. These should be derived from the actual GeoJSON bounds or layer-specific geographic extents.

3. **Single legend**: Only shows the first active layer's legend. Consider showing multiple legends or a tabbed interface.

4. **No time series**: Data is static. Future versions could incorporate forecast timestamps and animation.

### Future Enhancements

- [ ] WebGL-based directional arrow rendering
- [ ] Dynamic bounds calculation from GeoJSON
- [ ] Time-based animation/slider
- [ ] Layer opacity controls
- [ ] Export/share functionality
- [ ] Offline caching
- [ ] Live data refresh from NOAA APIs
- [ ] Layer combination/compositing
- [ ] Custom color scale editor
- [ ] Performance optimization for large datasets (tiling)

## Performance Notes

- **Asset Loading**: All GeoJSON files are loaded statically at build time
- **Large Files**: Some GeoJSON files exceed 5MB (Michigan-Huron 500m waves)
- **Rendering**: Mapbox GL handles rendering efficiently with native acceleration
- **Memory**: Multiple active layers may consume significant memory on older devices
- **Recommendations**:
  - Test on target devices with multiple layers active
  - Consider implementing layer pagination/virtualization
  - Monitor memory usage with React Native profiler

## Support & Documentation

For questions about:

- **Mapbox integration**: See `@rnmapbox/maps` documentation
- **Layer data format**: See `components/map/README.md`
- **GLOFS data**: Visit NOAA Great Lakes Environmental Research Laboratory

## Credits

Data provided by:

- NOAA Great Lakes Operational Forecast System (GLOFS)
- Great Lakes Observing System (GLOS)

Integration developed: October 2025
