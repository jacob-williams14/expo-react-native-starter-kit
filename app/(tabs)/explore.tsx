import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Mapbox, { Camera, MapView, UserLocation } from "@rnmapbox/maps";

import { LayerControls } from "../../components/map/LayerControls";
import { LayerLegend } from "../../components/map/LayerLegend";
import { MapLayer } from "../../components/map/MapLayer";
import { useMapLayers } from "../../hooks/useMapLayers";
import { LAYERS, type LayerInfo } from "../../lib/map/layerConfig";

// Set your Mapbox access token here
// You'll need to get one from https://account.mapbox.com/
// Add EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN to your .env file
const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN;

if (MAPBOX_TOKEN && MAPBOX_TOKEN.startsWith("pk.")) {
  void Mapbox.setAccessToken(MAPBOX_TOKEN);
}

export default function ExplorePage() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [hasPermission, setHasPermission] = useState(false);
  const [hasInitiallyFlown, setHasInitiallyFlown] = useState(false); // Track if we've flown to user location
  const { activeLayers, toggleLayer, clearLayers } = useMapLayers();

  useEffect(() => {
    void (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        // After 1.5 seconds (after animation), stop flying to user location
        setTimeout(() => {
          setHasInitiallyFlown(true);
        }, 1500);
      }
    })();
  }, []);

  // Show error message if token is not configured
  if (!MAPBOX_TOKEN || !MAPBOX_TOKEN.startsWith("pk.")) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>⚠️ Mapbox Token Required</Text>
        <Text style={styles.errorText}>To use the map, you need to:</Text>
        <Text style={styles.errorStep}>
          1. Get a public token from{"\n"}
          https://account.mapbox.com/
        </Text>
        <Text style={styles.errorStep}>
          2. Create a .env file in the project root
        </Text>
        <Text style={styles.errorStep}>
          3. Add:{"\n"}
          EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN=pk.your_token_here
        </Text>
        <Text style={styles.errorStep}>4. Restart the development server</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <LayerControls
          activeLayers={activeLayers}
          onToggleLayer={toggleLayer}
          onClearLayers={clearLayers}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          styleURL="mapbox://styles/glos-mapbox/ckqgzhuf109u418pjzwu72l7c"
        >
          {location && !hasInitiallyFlown && (
            <Camera
              zoomLevel={6}
              centerCoordinate={[
                location.coords.longitude,
                location.coords.latitude,
              ]}
              animationMode="flyTo"
              animationDuration={1000}
            />
          )}
          {hasPermission && <UserLocation visible={true} />}

          {/* Render active layers with contours + directional arrows */}
          {LAYERS.filter((layer) => activeLayers.has(layer.id)).map(
            (layer: LayerInfo) => (
              <MapLayer key={layer.id} layer={layer} />
            )
          )}
        </MapView>

        <LayerLegend activeLayers={activeLayers} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    position: "relative",
  },
  map: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#666",
    textAlign: "center",
  },
  errorStep: {
    fontSize: 14,
    marginBottom: 10,
    color: "#444",
    textAlign: "left",
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 10,
  },
});
