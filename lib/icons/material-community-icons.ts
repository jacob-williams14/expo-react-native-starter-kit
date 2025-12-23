/**
 * Centralized Material Community Icons export with NativeWind support
 *
 * Usage:
 * ```tsx
 * import {
 *   MaterialCommunityIcons,
 *   MaterialCommunityIconName
 * } from "~/lib/icons/material-community-icons";
 *
 * // Use the icon component directly
 * <MaterialCommunityIcons name="check" size={24} color="#000" />
 *
 * // Use the type for icon name properties
 * interface MyProps {
 *   icon: MaterialCommunityIconName;
 * }
 * ```
 */

import { cssInterop } from "nativewind";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

function materialCommunityIconWithClassName(
  icon: typeof MaterialCommunityIcons
) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
      },
    },
  });
}

materialCommunityIconWithClassName(MaterialCommunityIcons);

export { MaterialCommunityIconName, MaterialCommunityIcons };
