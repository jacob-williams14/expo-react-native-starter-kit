import { View } from "react-native";

import { Text } from "~/components/ui";
import { Checkbox } from "~/components/ui/checkbox";
import { useFieldContext } from "~/lib/form/context";

interface CheckboxGroupFieldProps {
  options: Array<{ id: string; label: string }>;
}

/**
 * Checkbox group field that connects to TanStack Form field context
 * Handles array value management and toggle logic automatically
 */
export function CheckboxGroupField({ options }: CheckboxGroupFieldProps) {
  const field = useFieldContext<string[]>();

  return (
    <View className="gap-4">
      {options.map((option) => {
        const isSelected = field.state.value.includes(option.id);
        const toggleOption = () => {
          const newValue = isSelected
            ? field.state.value.filter((id: string) => id !== option.id)
            : [...field.state.value, option.id];
          field.handleChange(newValue);
        };

        return (
          <View key={option.id} className="flex-row items-center gap-3">
            <Checkbox checked={isSelected} onCheckedChange={toggleOption} />
            <Text className="text-base text-neutral-700 flex-1">
              {option.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

CheckboxGroupField.displayName = "CheckboxGroupField";
