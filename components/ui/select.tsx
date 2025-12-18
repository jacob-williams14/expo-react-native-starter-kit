import * as React from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Text } from "./text";
import { MaterialCommunityIcons } from "~/lib/icons/material-community-icons";
import { cn } from "~/lib/tailwindUtils";

type Option = {
  value: string;
  label: string;
};

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    children: React.ReactNode;
    isOpen?: boolean;
    triggerRef?: React.RefObject<View | null>;
  }
>(({ className, children, isOpen, triggerRef, ...props }, ref) => {
  const [shouldRenderAbove, setShouldRenderAbove] = React.useState(false);
  const screenHeight = Dimensions.get("window").height;

  React.useEffect(() => {
    if (isOpen && triggerRef?.current) {
      triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Calculate available space below and above
        const spaceBelow = screenHeight - (pageY + height);
        const spaceAbove = pageY;
        const dropdownHeight = 250; // Max height of our dropdown

        // If there's not enough space below but more space above, render above
        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
          setShouldRenderAbove(true);
        } else {
          setShouldRenderAbove(false);
        }
      });
    }
  }, [isOpen, screenHeight, triggerRef]);

  if (!isOpen) return null;

  return (
    <Animated.View
      ref={ref}
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(100)}
      style={{
        position: "absolute",
        ...(shouldRenderAbove
          ? {
              bottom: "100%",
              marginBottom: 4,
            }
          : {
              top: "100%",
              marginTop: 4,
            }),
        left: 0,
        right: 0,
        zIndex: 50,
      }}
      className={cn(
        "max-h-[250px] rounded-md border border-border bg-popover shadow-md shadow-foreground/10 py-2 px-1",
        className
      )}
      {...props}
    >
      <ScrollView
        style={{ maxHeight: 250 }}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
});
SelectContent.displayName = "SelectContent";

type SelectFieldProps = {
  label?: string;
  items: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  value?: Option;
  onValueChange?: (value: Option) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const SelectField = ({
  label,
  items,
  value,
  onValueChange,
  placeholder = "Select an option",
  disabled,
  className,
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<View>(null);

  return (
    <View className="relative">
      {label && <Text variant="p">{label}</Text>}
      <View ref={triggerRef}>
        <TouchableOpacity
          className={cn(
            "text-base text-neutral-600 font-poppins-medium flex flex-row h-10 native:h-12 items-center justify-between rounded-md border border-input bg-background px-3 py-2",
            disabled && "opacity-50",
            className
          )}
          disabled={disabled}
          onPress={() => !disabled && setIsOpen(!isOpen)}
        >
          <Text
            variant="p"
            className="text-base text-neutral-600 font-poppins-medium"
          >
            {value?.label || placeholder}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={16}
            aria-hidden={true}
            className="text-neutral-600"
          />
        </TouchableOpacity>
      </View>

      <SelectContent isOpen={isOpen} triggerRef={triggerRef}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.value}
            disabled={item.disabled}
            onPress={() => {
              if (!item.disabled) {
                onValueChange?.({ value: item.value, label: item.label });
                setIsOpen(false);
              }
            }}
            className={cn(
              "relative flex flex-row w-full items-center rounded-sm py-3 px-3 active:bg-interaction-100",
              item.disabled && "opacity-50"
            )}
          >
            <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
              {value?.value === item.value && (
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  className="text-neutral-600"
                />
              )}
            </View>
            <Text
              variant="p"
              className="text-base text-neutral-600 font-poppins-medium pl-6"
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </SelectContent>

      {/* Close dropdown when pressing outside */}
      {isOpen && (
        <TouchableOpacity
          style={{
            position: "absolute",
            top: -1000,
            left: -1000,
            right: -1000,
            bottom: -1000,
            zIndex: 40, // Below the dropdown (zIndex: 50) but above everything else
          }}
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        />
      )}
    </View>
  );
};

export { SelectField };
export type { Option };
