import * as React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import * as SwitchPrimitives from "@rn-primitives/switch";

import { cn } from "~/lib/tailwindUtils";

interface SwitchProps extends SwitchPrimitives.RootProps {
  ref?: React.RefObject<SwitchPrimitives.RootRef>;
  children?: React.ReactNode;
}

function Switch({ className, children, ...props }: SwitchProps) {
  const translateX = useDerivedValue(() => (props.checked ? 30 : 2));
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 200 }) },
    ],
  }));

  return (
    <View className="flex-row items-center gap-3">
      <SwitchPrimitives.Root
        className={cn(
          "flex-row h-8 w-[60px] shrink-0 items-center rounded-full border-2 border-transparent",
          props.checked ? "bg-secondary-900" : "bg-neutral-200",
          className
        )}
        accessibilityRole="switch"
        accessibilityState={{
          checked: !!props.checked,
          disabled: !!props.disabled,
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        {...props}
      >
        <Animated.View style={animatedThumbStyle}>
          <SwitchPrimitives.Thumb className="h-6 w-6 rounded-full bg-base-white" />
        </Animated.View>
      </SwitchPrimitives.Root>
      {children}
    </View>
  );
}

export { Switch };
export type { SwitchProps };
