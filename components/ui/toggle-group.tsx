import * as React from "react";
import { View } from "react-native";

import * as ToggleGroupPrimitive from "@rn-primitives/toggle-group";

import { Text } from "./text";
import { cn } from "~/lib/tailwindUtils";

const ToggleGroup = React.forwardRef<
  ToggleGroupPrimitive.RootRef,
  ToggleGroupPrimitive.RootProps
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Root
      className={cn("flex-row gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  ToggleGroupPrimitive.ItemRef,
  ToggleGroupPrimitive.ItemProps & { children: string }
>(({ className, children, ...props }, ref) => {
  const { value } = ToggleGroupPrimitive.useRootContext();
  const isSelected = props.value === value;

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "px-4 py-2 rounded-lg items-center justify-center",
        isSelected ? "bg-secondary-900" : "bg-neutral-100",
        props.disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          "text-base font-medium",
          isSelected ? "text-white" : "text-neutral-600"
        )}
      >
        {children}
      </Text>
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

interface ToggleGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ToggleGroupSingleProps {
  value?: string;
  onValueChange: (value: string | undefined) => void;
  options: ToggleGroupOption[];
}

/**
 * Single-select toggle group (like radio buttons).
 * Only one option can be selected at a time.
 *
 * Example:
 * <SingleSelectToggleGroup
 *   value="mph"
 *   onValueChange={(value) => Logger.debug(value)}
 *   options={[
 *     { value: "mph", label: "mph" },
 *     { value: "kmh", label: "km/h" }
 *   ]}
 * />
 */
function SingleSelectToggleGroup({
  value,
  onValueChange,
  options = [],
}: ToggleGroupSingleProps) {
  return (
    <ToggleGroup value={value} onValueChange={onValueChange} type="single">
      <View className="flex-row gap-2">
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </View>
    </ToggleGroup>
  );
}

export { SingleSelectToggleGroup };
