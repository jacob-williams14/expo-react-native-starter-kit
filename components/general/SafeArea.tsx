/**
 * SafeArea Component
 *
 * A wrapper component using react-native-safe-area-context instead of
 * the deprecated SafeAreaView from react-native.
 *
 * This component provides safe area insets for notches, status bars,
 * and other device-specific UI elements.
 */

import React from "react";
import { View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaProps extends ViewProps {
  /**
   * Edges to apply safe area insets to.
   * Default: ["top", "right", "bottom", "left"]
   */
  edges?: ("top" | "right" | "bottom" | "left")[];
  /**
   * Children to render inside the safe area
   */
  children: React.ReactNode;
}

/**
 * SafeArea component using react-native-safe-area-context
 *
 * @example
 * // Apply safe area to all edges
 * <SafeArea>
 *   <Text>Content</Text>
 * </SafeArea>
 *
 * @example
 * // Apply safe area only to top and bottom
 * <SafeArea edges={["top", "bottom"]}>
 *   <Text>Content</Text>
 * </SafeArea>
 *
 * @example
 * // With custom styles
 * <SafeArea className="bg-white" edges={["top"]}>
 *   <Text>Content</Text>
 * </SafeArea>
 */
export function SafeArea({
  edges = ["top", "right", "bottom", "left"],
  children,
  ...props
}: SafeAreaProps) {
  return (
    <SafeAreaView edges={edges} style={{ flex: 1 }} {...props}>
      {children}
    </SafeAreaView>
  );
}

/**
 * Alternative: Use View with useSafeAreaInsets hook for more control
 */
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeViewProps extends ViewProps {
  /**
   * Apply safe area padding to specific edges
   */
  applyTop?: boolean;
  applyBottom?: boolean;
  applyLeft?: boolean;
  applyRight?: boolean;
  children: React.ReactNode;
}

/**
 * SafeView component using useSafeAreaInsets hook
 * Gives you more control over padding and styling
 *
 * @example
 * <SafeView applyTop applyBottom className="bg-white">
 *   <Text>Content</Text>
 * </SafeView>
 */
export function SafeView({
  applyTop = true,
  applyBottom = true,
  applyLeft = true,
  applyRight = true,
  children,
  style,
  ...props
}: SafeViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: applyTop ? insets.top : 0,
          paddingBottom: applyBottom ? insets.bottom : 0,
          paddingLeft: applyLeft ? insets.left : 0,
          paddingRight: applyRight ? insets.right : 0,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
