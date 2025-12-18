import { ComponentProps } from "react";

import { SingleSelectToggleGroup } from "~/components/ui/toggle-group";
import { useFieldContext } from "~/lib/form/context";

type ToggleGroupFieldProps = Omit<
  ComponentProps<typeof SingleSelectToggleGroup>,
  "value" | "onValueChange"
>;

/**
 * Toggle group field that connects to TanStack Form field context
 * Handles value binding and change events automatically
 */
export function ToggleGroupField({ options, ...props }: ToggleGroupFieldProps) {
  const field = useFieldContext<string>();

  return (
    <SingleSelectToggleGroup
      {...props}
      options={options}
      value={field.state.value}
      onValueChange={(value) => value && field.handleChange(value)}
    />
  );
}

ToggleGroupField.displayName = "ToggleGroupField";
