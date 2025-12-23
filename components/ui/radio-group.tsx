import * as React from "react";
import { Pressable, View } from "react-native";

import * as RadioGroupPrimitive from "@rn-primitives/radio-group";

import { Text } from "./text";
import { cn } from "~/lib/tailwindUtils";

const radioGroupVariants = {
  default: {
    base: "border-2 border-input",
    indicator: "bg-neutral-400",
  },
  interaction: {
    base: "border-2 border-interaction-200",
    indicator: "bg-interaction-200",
  },
};

const radioGroupSizes = {
  default: {
    container: "h-5 w-5",
    indicator: "h-[10px] w-[10px]",
  },
  lg: {
    container: "h-6 w-6",
    indicator: "h-[14px] w-[14px]",
  },
  sm: {
    container: "h-4 w-4",
    indicator: "h-[8px] w-[8px]",
  },
};

const RadioGroup = React.forwardRef<
  RadioGroupPrimitive.RootRef,
  RadioGroupPrimitive.RootProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("gap-3", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioGroupItemProps extends RadioGroupPrimitive.ItemProps {
  variant?: keyof typeof radioGroupVariants;
  size?: keyof typeof radioGroupSizes;
  checked?: boolean;
}

const RadioGroupItem = React.forwardRef<
  RadioGroupPrimitive.ItemRef,
  RadioGroupItemProps
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = radioGroupVariants[variant];
  const sizes = radioGroupSizes[size];

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      className={cn(
        "aspect-square rounded-full justify-center items-center",
        sizes.container,
        variants.base,
        props.disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <View
          className={cn(
            "aspect-square rounded-full",
            variants.indicator,
            sizes.indicator
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupItemWithLabel = ({
  label,
  value,
  checked,
  disabled,
  variant = "default",
  size = "default",
}: {
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  variant?: keyof typeof radioGroupVariants;
  size?: keyof typeof radioGroupSizes;
}) => {
  return (
    <View className="flex-row items-center gap-3">
      <RadioGroupItem
        value={value}
        disabled={disabled}
        variant={variant}
        size={size}
        checked={checked}
      />
      <Text
        variant="p"
        className={cn(
          "text-base",
          disabled ? "text-neutral-400" : "text-neutral-600"
        )}
      >
        {label}
      </Text>
    </View>
  );
};

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupOptionsProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: RadioOption[];
  variant?: keyof typeof radioGroupVariants;
  size?: keyof typeof radioGroupSizes;
  layout?: "horizontal" | "vertical";
  allowDeselection?: boolean;
}

/**
 * A simplified wrapper component for RadioGroup.
 * Example usage:
 *
 * <RadioGroupOptions
 *   value="option1"
 *   onValueChange={(value) => Logger.debug(value)}
 *   options={[
 *     { value: "option1", label: "Option 1" },
 *     { value: "option2", label: "Option 2" }
 *   ]}
 * />
 */
function RadioGroupOptions({
  value,
  onValueChange,
  options = [],
  variant = "default",
  size = "default",
  layout = "horizontal",
  allowDeselection = false,
}: RadioGroupOptionsProps) {
  const handleOptionPress = (optionValue: string) => {
    // If deselection is allowed and the option is already selected, deselect it
    if (allowDeselection && value === optionValue) {
      onValueChange("");
    } else {
      onValueChange(optionValue);
    }
  };

  return (
    <RadioGroup value={value} onValueChange={handleOptionPress}>
      <View
        className={cn(
          layout === "horizontal" ? "flex-row gap-3" : "flex-col gap-3"
        )}
      >
        {options.map((option) => (
          <View key={option.value} className="flex-row gap-3 items-center">
            <RadioGroupItem
              value={option.value}
              disabled={option.disabled}
              variant={variant}
              size={size}
            />
            <Pressable
              onPress={() => handleOptionPress(option.value)}
              disabled={option.disabled}
            >
              <Text
                variant="p"
                className={cn(
                  "text-base",
                  option.disabled ? "text-neutral-400" : "text-neutral-600"
                )}
              >
                {option.label}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </RadioGroup>
  );
}

export { RadioGroupItemWithLabel, RadioGroupOptions };
