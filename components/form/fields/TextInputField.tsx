import { ComponentProps } from "react";

import { Input } from "~/components/ui";
import { useFieldContext } from "~/lib/form/context";

type TextInputFieldProps = Omit<
  ComponentProps<typeof Input>,
  "value" | "onChangeText"
> & {
  formatter?: (value: string) => string;
};

/**
 * Text input field that connects to TanStack Form field context
 * Handles value binding and change events automatically
 * Supports optional formatter function for input transformation
 */
export function TextInputField({ formatter, ...props }: TextInputFieldProps) {
  const field = useFieldContext<string>();

  const handleChange = (text: string) => {
    const formattedValue = formatter ? formatter(text) : text;
    field.handleChange(formattedValue);
  };

  return (
    <Input
      {...props}
      value={field.state.value}
      onChangeText={handleChange}
      variant={
        field.state.meta.errors.length > 0 ? "destructive" : props.variant
      }
      helperText={field.state.meta.errors[0] ?? props.helperText}
    />
  );
}

TextInputField.displayName = "TextInputField";
