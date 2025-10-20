import { useState, useCallback } from "react";

export function useMapLayers() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set());

  const toggleLayer = useCallback((layerId: string) => {
    setActiveLayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(layerId)) {
        newSet.delete(layerId);
      } else {
        newSet.add(layerId);
      }
      return newSet;
    });
  }, []);

  const isLayerActive = useCallback(
    (layerId: string) => activeLayers.has(layerId),
    [activeLayers]
  );

  const clearLayers = useCallback(() => {
    setActiveLayers(new Set());
  }, []);

  return {
    activeLayers,
    toggleLayer,
    isLayerActive,
    clearLayers,
  };
}

