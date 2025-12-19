/* eslint-disable no-restricted-imports */
import { ExpoRoot } from "expo-router";
import { inMemoryContext } from "expo-router/build/testing-library/context-stubs";
import {
  renderHook as expoRenderHook,
  renderRouter as expoRenderRouter,
  RenderRouterOptions,
} from "expo-router/testing-library";
import { isValidElement, ReactNode } from "react";

import { queryClient, resetQueryClient } from "./queryClient";
import { Scenario } from "./scenario";
import { AppProvider } from "~/providers/AppProvider";

// This file provides a custom render/renderHook function as described here:
// https://testing-library.com/docs/react-testing-library/setup/

// Test wrapper component
// Note: AppProvider already includes SafeAreaProvider
function TestWrapper({ children }: { children: ReactNode }) {
  // Ensure scenario is properly set up before rendering
  Scenario._throwIfInvalid();

  return (
    <AppProvider queryClient={queryClient} isDarkColorScheme={false}>
      {children}
    </AppProvider>
  );
}

// Updated render function
const customRender = (
  contextOrComponent: Record<string, React.ComponentType> | React.ReactElement,
  options?: RenderRouterOptions
) => {
  if (isValidElement(contextOrComponent)) {
    // Single component case
    const Component = contextOrComponent as React.ReactNode;
    const context = {
      index: () => <TestWrapper>{Component}</TestWrapper>,
    };
    return expoRenderRouter(context, options);
  }

  // Router context case
  const wrappedContext = Object.entries(contextOrComponent).reduce(
    (acc, [key, Component]) => {
      acc[key] = () => (
        <TestWrapper>
          <Component />
        </TestWrapper>
      );
      return acc;
    },
    {} as Record<string, React.ComponentType>
  );

  return expoRenderRouter(wrappedContext, options);
};

const customRenderHook = (hook: () => void) => {
  return expoRenderHook(hook, {
    wrapper: ({ children }: { children: ReactNode }) => {
      const context = {
        index: () => <TestWrapper>{children}</TestWrapper>,
      };

      return <ExpoRoot context={inMemoryContext(context)} location={"/"} />;
    },
  });
};

// re-export everything
export * from "expo-router/testing-library";

// override render method
export {
  queryClient,
  customRender as render,
  customRenderHook as renderHook,
  resetQueryClient,
};
