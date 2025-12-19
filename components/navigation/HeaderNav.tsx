import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { Large } from "~/components/ui";

type HeaderNavProps = BottomTabHeaderProps | NativeStackHeaderProps;

export const HeaderShadowStyles: ViewStyle = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
};

/**
 * Custom header component that can be used in the tabs or stack navigation.
 * @param options - The options for the header
 * @returns The header component
 */
export default function HeaderNav({ options }: HeaderNavProps) {
  const navTitle = (options.headerTitle ?? options.title) as string;
  const { top } = useSafeAreaInsets();

  const HeaderLeft = options.headerLeft ?? null;
  const HeaderRight = options.headerRight ?? null;

  const { headerShadowVisible = true } = options;
  const headerStyles = headerShadowVisible ? HeaderShadowStyles : undefined;

  return (
    <View
      className="bg-background"
      style={{ ...headerStyles, paddingTop: top }}
    >
      <View className="w-full h-16 px-6 bg-white">
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <View className="flex-1 items-center justify-center">
            {navTitle && (
              <Large className="text-secondary-900 font-bold">{navTitle}</Large>
            )}
          </View>
        </View>

        <View className="flex-row h-full w-full justify-between items-center">
          <View>
            {typeof HeaderLeft === "function" ? <HeaderLeft /> : HeaderLeft}
          </View>
          <View>
            {typeof HeaderRight === "function" ? (
              <HeaderRight canGoBack={false} />
            ) : (
              HeaderRight
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
