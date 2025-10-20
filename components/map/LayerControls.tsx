import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { LAKE_NAMES, LAYERS, type LakeCode } from "../../lib/map/layerConfig";
import { Text } from "../ui/text";

interface LayerControlsProps {
  activeLayers: Set<string>;
  onToggleLayer: (layerId: string) => void;
  onClearLayers: () => void;
}

export function LayerControls({
  activeLayers,
  onToggleLayer,
  onClearLayers,
}: LayerControlsProps) {
  const [selectedLake, setSelectedLake] = useState<LakeCode | "all">("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const lakes: Array<LakeCode | "all"> = ["all", "ls", "lm", "lh", "le", "lo"];

  const filteredLayers =
    selectedLake === "all"
      ? LAYERS
      : LAYERS.filter((layer) => layer.lake === selectedLake);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.toggleButtonText}>
            {isExpanded ? "▼" : "▶"} Layers
          </Text>
          {activeLayers.size > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeLayers.size}</Text>
            </View>
          )}
        </TouchableOpacity>

        {activeLayers.size > 0 && (
          <TouchableOpacity
            style={styles.clearButtonSmall}
            onPress={onClearLayers}
          >
            <Text style={styles.clearButtonSmallText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {isExpanded && (
        <View style={styles.panel}>
          {/* Lake selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.lakeSelector}
          >
            {lakes.map((lake) => (
              <TouchableOpacity
                key={lake}
                style={[
                  styles.lakeButton,
                  selectedLake === lake && styles.lakeButtonActive,
                ]}
                onPress={() => setSelectedLake(lake)}
              >
                <Text
                  style={[
                    styles.lakeButtonText,
                    selectedLake === lake && styles.lakeButtonTextActive,
                  ]}
                >
                  {lake === "all" ? "All" : LAKE_NAMES[lake]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Layer list */}
          <ScrollView style={styles.layerList}>
            {filteredLayers.map((layer) => {
              const isActive = activeLayers.has(layer.id);
              return (
                <TouchableOpacity
                  key={layer.id}
                  style={[styles.layerItem, isActive && styles.layerItemActive]}
                  onPress={() => onToggleLayer(layer.id)}
                >
                  <View style={styles.layerInfo}>
                    <Text
                      style={[
                        styles.layerName,
                        isActive && styles.layerNameActive,
                      ]}
                    >
                      {layer.name}
                    </Text>
                    <Text style={styles.layerDescription}>
                      {layer.description} ({layer.unit})
                    </Text>
                  </View>
                  <View
                    style={[styles.checkbox, isActive && styles.checkboxActive]}
                  >
                    {isActive && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  badge: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
  },
  clearButtonSmall: {
    backgroundColor: "#ff3b30",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  clearButtonSmallText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  panel: {
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    maxHeight: 400,
  },
  lakeSelector: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 50,
  },
  lakeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
  },
  lakeButtonActive: {
    backgroundColor: "#007AFF",
  },
  lakeButtonText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#666",
  },
  lakeButtonTextActive: {
    color: "white",
  },
  layerList: {
    maxHeight: 300,
    padding: 8,
  },
  layerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: "#f9f9f9",
  },
  layerItemActive: {
    backgroundColor: "#e3f2fd",
  },
  layerInfo: {
    flex: 1,
    marginRight: 8,
  },
  layerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  layerNameActive: {
    color: "#007AFF",
  },
  layerDescription: {
    fontSize: 11,
    color: "#666",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  checkmark: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
