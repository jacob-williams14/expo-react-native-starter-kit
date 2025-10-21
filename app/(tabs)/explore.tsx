import * as Location from "expo-location";
import { LocateFixed } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Mapbox, { Camera, MapView, UserLocation } from "@rnmapbox/maps";

import { LayerControls } from "../../components/map/LayerControls";
import { LayerLegend } from "../../components/map/LayerLegend";
import { MapLayer } from "../../components/map/MapLayer";
import { Button } from "../../components/ui/button";
import { Icon } from "../../components/ui/icon";
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
  const cameraRef = useRef<Camera>(null);

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

  const handleCenterOnUser = async () => {
    if (!hasPermission) return;

    // Get fresh location
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    // Fly to user location with zoom
    if (cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [
          currentLocation.coords.longitude,
          currentLocation.coords.latitude,
        ],
        zoomLevel: 10,
        animationDuration: 1000,
      });
    }
  };

  // Show error message if token is not configured
  if (!MAPBOX_TOKEN || !MAPBOX_TOKEN.startsWith("pk.")) {
    return (
      <View className="flex-1 justify-center items-center p-5 bg-neutral-100">
        <Text className="text-2xl font-bold mb-5 text-neutral-800">
          ⚠️ Mapbox Token Required
        </Text>
        <Text className="text-base mb-4 text-neutral-600 text-center">
          To use the map, you need to:
        </Text>
        <Text className="text-sm mb-2.5 text-neutral-700 text-left w-full max-w-96 px-2.5">
          1. Get a public token from{"\n"}
          https://account.mapbox.com/
        </Text>
        <Text className="text-sm mb-2.5 text-neutral-700 text-left w-full max-w-96 px-2.5">
          2. Create a .env file in the project root
        </Text>
        <Text className="text-sm mb-2.5 text-neutral-700 text-left w-full max-w-96 px-2.5">
          3. Add:{"\n"}
          EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN=pk.your_token_here
        </Text>
        <Text className="text-sm mb-2.5 text-neutral-700 text-left w-full max-w-96 px-2.5">
          4. Restart the development server
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="px-4 pt-4 pb-2">
        <LayerControls
          activeLayers={activeLayers}
          onToggleLayer={toggleLayer}
          onClearLayers={clearLayers}
        />
      </View>

      <View className="flex-1 mx-4 mb-4 relative">
        <MapView
          style={styles.map}
          styleURL="mapbox://styles/glos-mapbox/ckqgzhuf109u418pjzwu72l7c"
        >
          <Camera
            ref={cameraRef}
            zoomLevel={location && !hasInitiallyFlown ? 6 : undefined}
            centerCoordinate={
              location && !hasInitiallyFlown
                ? [location.coords.longitude, location.coords.latitude]
                : undefined
            }
            animationMode={location && !hasInitiallyFlown ? "flyTo" : "none"}
            animationDuration={1000}
          />
          {hasPermission && <UserLocation visible={true} />}

          {/* Render active layers with contours + directional arrows */}
          {LAYERS.filter((layer) => activeLayers.has(layer.id)).map(
            (layer: LayerInfo) => (
              <MapLayer key={layer.id} layer={layer} />
            )
          )}
        </MapView>

        <LayerLegend activeLayers={activeLayers} />

        {/* Center on User Location Button */}
        {hasPermission && (
          <View className="absolute bottom-4 right-4 z-10">
            <Button
              variant="default"
              size="icon"
              onPress={() => void handleCenterOnUser()}
              className="bg-blue-500 shadow-lg"
            >
              <Icon as={LocateFixed} size={24} className="text-white" />
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
});
