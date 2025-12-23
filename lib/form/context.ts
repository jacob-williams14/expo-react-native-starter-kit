/**
 * TanStack Form contexts for field and form state management
 * Used by field components to access form state via React context
 */
import { createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();
