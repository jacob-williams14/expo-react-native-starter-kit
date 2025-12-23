import { ComponentProps } from "react";

import { SelectField } from "~/components/ui/select";
import { useFieldContext } from "~/lib/form/context";

type SelectInputFieldProps = Omit<
  ComponentProps<typeof SelectField>,
  "value" | "onValueChange"
>;

/**
 * Select field that connects to TanStack Form field context
 * Handles value binding and change events automatically
 */
export function SelectInputField({ items, ...props }: SelectInputFieldProps) {
  const field = useFieldContext<string>();

  const selectedItem = items.find((item) => item.value === field.state.value);

  return (
    <SelectField
      {...props}
      items={items}
      value={selectedItem}
      onValueChange={(option) => field.handleChange(option.value)}
    />
  );
}

SelectInputField.displayName = "SelectInputField";
