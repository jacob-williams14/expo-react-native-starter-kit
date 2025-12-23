import * as React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  View,
  type ScrollViewProps,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import { useHeaderHeight } from "@react-navigation/elements";

// Create context to share state between parent and children
type PinnedContentContextType = {
  buttonHeight: number;
  setButtonHeight: (height: number) => void;
};

const PinnedContentContext = createContext<
  PinnedContentContextType | undefined
>(undefined);

// Hook for children to access the context
const usePinnedContent = () => {
  const context = useContext(PinnedContentContext);
  if (!context) {
    throw new Error(
      "Pinned components must be used within a PinnedContentScrollView"
    );
  }
  return context;
};

// Main container component
export function PinnedContentScrollView({
  children,
  ...scrollViewProps
}: {
  children: React.ReactNode;
} & ScrollViewProps) {
  const [buttonHeight, setButtonHeight] = useState(0);

  // Separate the Pinned components from other children
  const pinnedComponents: React.ReactNode[] = [];
  const contentComponents: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      typeof child.type === "function" &&
      child.type.name === "Pinned"
    ) {
      pinnedComponents.push(child);
    } else {
      contentComponents.push(child);
    }
  });

  const headerHeight = useHeaderHeight();

  return (
    <PinnedContentContext.Provider value={{ buttonHeight, setButtonHeight }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
        className="flex-1"
      >
        <ScrollView
          {...scrollViewProps}
          contentContainerStyle={[
            { flexGrow: 1 },
            scrollViewProps.contentContainerStyle,
          ]}
        >
          <View className="flex-1" style={{ paddingBottom: buttonHeight + 16 }}>
            {contentComponents}
          </View>
        </ScrollView>
        {pinnedComponents}
      </KeyboardAvoidingView>
    </PinnedContentContext.Provider>
  );
}

// Pinned component
function Pinned({ children }: { children: React.ReactNode }) {
  const { setButtonHeight } = usePinnedContent();

  const onButtonLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setButtonHeight(height);
    },
    [setButtonHeight]
  );

  return (
    <View
      onLayout={onButtonLayoutChange}
      className="absolute items-center justify-center bottom-0 pb-safe-offset-4 w-full"
      pointerEvents="box-none"
    >
      {children}
    </View>
  );
}

PinnedContentScrollView.Pinned = Pinned;
