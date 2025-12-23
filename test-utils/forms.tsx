/**
 * Test utilities for components that use TanStack Form via withForm
 *
 * Usage:
 * ```tsx
 * render(
 *   <FormTestWrapper defaultValues={{ email: "", password: "" }}>
 *     {(form) => <LoginForm form={form} onSubmit={jest.fn()} />}
 *   </FormTestWrapper>
 * );
 * ```
 */
import { ReactNode } from "react";

import { useAppForm } from "~/lib/form/useAppForm";

const LOGIN_FORM_DEFAULTS = {
  email: "",
  password: "",
};

function useLoginTestForm() {
  return useAppForm({ defaultValues: LOGIN_FORM_DEFAULTS });
}

type LoginTestForm = ReturnType<typeof useLoginTestForm>;

export function FormTestWrapper({
  children,
}: {
  children: (form: LoginTestForm) => ReactNode;
}) {
  const form = useLoginTestForm();
  return <>{children(form)}</>;
}
