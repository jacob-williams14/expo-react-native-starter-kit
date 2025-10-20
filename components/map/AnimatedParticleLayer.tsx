import { useEffect, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Canvas, useCanvasEffect } from "react-native-skia";

import { BOUNDS_ASSETS, PNG_ASSETS } from "../../lib/map/layerAssets";
import type { LayerInfo } from "../../lib/map/layerConfig";

interface AnimatedParticleLayerProps {
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

interface Particle {
  x: number;
  y: number;
  age: number;
  speed: number;
}

export function AnimatedParticleLayer({ layer }: AnimatedParticleLayerProps) {
  const particlesRef = useRef<Particle[]>([]);
  const imageDataRef = useRef<ImageData | null>(null);
  const boundsRef = useRef<BoundsData | null>(null);

  useEffect(() => {
    async function loadDirectionalData() {
      if (!layer.pngFile || !layer.boundsFile) return;

      try {
        // Load bounds
        const bounds = BOUNDS_ASSETS[layer.boundsFile];
        boundsRef.current = bounds;

        // Load and decode PNG
        const pngAsset = PNG_ASSETS[layer.pngFile];
        const uri = Image.resolveAssetSource(pngAsset).uri;

        // For now, we'll need to load the image and extract pixel data
        // This is a simplified approach - full implementation would use WebGL
        console.log(`Loaded directional data for ${layer.id}`, bounds);

        // Initialize particles
        initializeParticles();
      } catch (error) {
        console.error(`Error loading directional data for ${layer.id}:`, error);
      }
    }

    void loadDirectionalData();
  }, [layer.id, layer.pngFile, layer.boundsFile]);

  const initializeParticles = () => {
    const numParticles = 2000;
    particlesRef.current = Array.from({ length: numParticles }, () => ({
      x: Math.random(),
      y: Math.random(),
      age: Math.random() * 100,
      speed: 0,
    }));
  };

  // This would be the animation loop
  useCanvasEffect((canvas, info) => {
    if (!boundsRef.current) return;

    const { width, height } = info;
    const paint = new window.Skia.Paint();
    paint.setColor(window.Skia.Color("rgba(255, 255, 255, 0.05)"));

    // Clear with slight fade for trail effect
    canvas.drawRect(window.Skia.XYWHRect(0, 0, width, height), paint);

    // Draw particles
    const particlePaint = new window.Skia.Paint();
    particlePaint.setColor(window.Skia.Color("rgba(255, 255, 255, 0.8)"));
    particlePaint.setStrokeWidth(2);

    particlesRef.current.forEach((particle) => {
      // Update particle position based on vector field
      // This is a placeholder - real implementation would read from imageData
      particle.x += Math.random() * 0.01 - 0.005;
      particle.y += Math.random() * 0.01 - 0.005;
      particle.age += 1;

      // Reset if particle is too old or out of bounds
      if (
        particle.age > 100 ||
        particle.x < 0 ||
        particle.x > 1 ||
        particle.y < 0 ||
        particle.y > 1
      ) {
        particle.x = Math.random();
        particle.y = Math.random();
        particle.age = 0;
      }

      // Draw particle
      const px = particle.x * width;
      const py = particle.y * height;
      canvas.drawCircle(px, py, 1, particlePaint);
    });

    // Request next frame
    requestAnimationFrame(() => {
      canvas.clear(window.Skia.Color("transparent"));
    });
  });

  return (
    <View style={styles.container} pointerEvents="none">
      <Canvas style={styles.canvas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  canvas: {
    flex: 1,
  },
});
