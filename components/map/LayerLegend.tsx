import { ScrollView, StyleSheet, View } from "react-native";

import { LAYERS } from "../../lib/map/layerConfig";
import { Text } from "../ui/text";

interface LayerLegendProps {
  activeLayers: Set<string>;
}

export function LayerLegend({ activeLayers }: LayerLegendProps) {
  const activeLayerInfo = LAYERS.filter((layer) => activeLayers.has(layer.id));

  if (activeLayerInfo.length === 0) {
    return null;
  }

  // Show legends for all active layers
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {activeLayerInfo.map((layer) => (
        <LegendItem key={layer.id} layer={layer} />
      ))}
    </ScrollView>
  );
}

function LegendItem({ layer }: { layer: (typeof LAYERS)[0] }) {
  // Define legend values based on layer type
  let legendValues: { value: string; color: string }[] = [];

  switch (layer.type) {
    case "waves":
    case "waves-500m":
      legendValues = [
        { value: "0 m", color: layer.colorScale[0] },
        { value: "0.5 m", color: layer.colorScale[1] },
        { value: "1.0 m", color: layer.colorScale[2] },
        { value: "1.5 m", color: layer.colorScale[3] },
        { value: "2.0+ m", color: layer.colorScale[4] },
      ];
      break;
    case "water":
      legendValues = [
        { value: "0 m/s", color: layer.colorScale[0] },
        { value: "0.1 m/s", color: layer.colorScale[1] },
        { value: "0.2 m/s", color: layer.colorScale[2] },
        { value: "0.3 m/s", color: layer.colorScale[3] },
        { value: "0.5+ m/s", color: layer.colorScale[3] },
      ];
      break;
    case "wind":
      legendValues = [
        { value: "0 m/s", color: layer.colorScale[0] },
        { value: "5 m/s", color: layer.colorScale[1] },
        { value: "10 m/s", color: layer.colorScale[2] },
        { value: "15 m/s", color: layer.colorScale[3] },
        { value: "20+ m/s", color: layer.colorScale[4] },
      ];
      break;
    case "temp":
      legendValues = [
        { value: "0°C", color: layer.colorScale[0] },
        { value: "5°C", color: layer.colorScale[1] },
        { value: "10°C", color: layer.colorScale[2] },
        { value: "15°C", color: layer.colorScale[3] },
        { value: "20+°C", color: layer.colorScale[4] },
      ];
      break;
  }

  return (
    <View style={styles.legendCard}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {layer.name}
        </Text>
      </View>
      <View style={styles.gradient}>
        <View style={styles.colorBar}>
          {legendValues.map((item, index) => (
            <View
              key={index}
              style={[
                styles.colorSegment,
                { backgroundColor: item.color, flex: 1 },
              ]}
            />
          ))}
        </View>
        <View style={styles.labels}>
          <Text style={styles.labelText}>{legendValues[0].value}</Text>
          <Text style={styles.labelText}>
            {legendValues[legendValues.length - 1].value}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    maxHeight: 150,
  },
  legendCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    marginBottom: 6,
  },
  title: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
  },
  gradient: {
    gap: 4,
  },
  colorBar: {
    flexDirection: "row",
    height: 12,
    borderRadius: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  colorSegment: {
    height: "100%",
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: 9,
    color: "#666",
  },
});
