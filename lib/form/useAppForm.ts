/**
 * Application form hook with pre-bound field components
 *
 * Provides TanStack Form integration with our UI components:
 * - field.TextInput - Input with automatic value binding
 * - field.Select - SelectField with automatic value binding
 * - field.CheckboxGroup - Multi-select checkboxes with array management
 * - field.ToggleGroup - Single-select toggle group with automatic value binding
 */
import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./context";
import {
  CheckboxGroupField,
  SelectInputField,
  TextInputField,
  ToggleGroupField,
} from "~/components/form/fields";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextInput: TextInputField,
    Select: SelectInputField,
    CheckboxGroup: CheckboxGroupField,
    ToggleGroup: ToggleGroupField,
  },
  formComponents: {},
});
