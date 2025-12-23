import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { View, ViewStyle } from "react-native";

import * as TabsPrimitive from "@rn-primitives/tabs";

import { Text, TextClassContext } from "./text";
import { cn } from "~/lib/tailwindUtils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  TabsPrimitive.ListRef,
  TabsPrimitive.ListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("flex-row items-center bg-background", className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  "inline-flex text-center items-center justify-center p-3 shadow-none flex-1",
  {
    variants: {
      variant: {
        default: "",
        outlined: "",
        filled: "",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        selected: true,
        className: "border-b-2 border-b-primary-600 dark:border-b-primary-500",
      },
      {
        variant: "default",
        selected: false,
        className: "border-b-2 border-b-transparent",
      },
      {
        variant: "outlined",
        selected: true,
        className:
          "border-2 border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-secondary-600 rounded-full",
      },
      {
        variant: "outlined",
        selected: false,
        className: "border-2 border-transparent rounded-full",
      },
      {
        variant: "filled",
        selected: true,
        className:
          "border-none rounded-full bg-primary-600 dark:bg-primary-500",
      },
      {
        variant: "filled",
        selected: false,
        className: "border-none rounded-full",
      },
    ],
    defaultVariants: {
      variant: "default",
      selected: false,
    },
  }
);

const tabsTriggerTextVariants = cva("text-base", {
  variants: {
    variant: {
      default: "",
      outlined: "",
      filled: "",
    },
    selected: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      selected: true,
      className: "text-primary-700 dark:text-primary-300",
    },
    {
      variant: "default",
      selected: false,
      className: "text-neutral-600 dark:text-neutral-400",
    },
    {
      variant: "outlined",
      selected: true,
      className: "text-primary-700 dark:text-primary-300",
    },
    {
      variant: "outlined",
      selected: false,
      className: "text-neutral-600 dark:text-neutral-400",
    },
    {
      variant: "filled",
      selected: true,
      className: "text-base-white dark:text-secondary-900",
    },
    {
      variant: "filled",
      selected: false,
      className: "text-neutral-600 dark:text-neutral-400",
    },
  ],
  defaultVariants: {
    variant: "default",
    selected: false,
  },
});

const TabsTrigger = React.forwardRef<
  TabsPrimitive.TriggerRef,
  TabsPrimitive.TriggerProps & VariantProps<typeof tabsTriggerVariants>
>(({ className, variant = "default", ...props }, ref) => {
  const { value } = TabsPrimitive.useRootContext();
  const isSelected = props.value === value;

  return (
    <TextClassContext.Provider
      value={cn(
        tabsTriggerTextVariants({ variant, selected: isSelected }),
        props.disabled && "text-muted-foreground opacity-50"
      )}
    >
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          tabsTriggerVariants({ variant, selected: isSelected }),
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  TabsPrimitive.ContentRef,
  TabsPrimitive.ContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("flex-1", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
  content?: React.ReactNode;
  icon?: React.ReactNode | ((isActive: boolean) => React.ReactNode);
  activeTextColor?: string;
  inactiveTextColor?: string;
  activeIconColor?: string;
  inactiveIconColor?: string;
};

interface TabGroupProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
  showContent?: boolean;
  variant?: "default" | "outlined" | "filled";
  onValueChange?: (value: string) => void;
  showTabShadow?: boolean;
  tabBackgroundColor?: string;
}

/**
 * A simplified wrapper component for Tabs.
 * Example usage:
 *
 * <TabGroup
 *   tabs={[
 *     {
 *       value: "tab1",
 *       label: "Tab 1",
 *       content: <ExampleComponent />,
 *       icon: (isActive) => <Icon className={isActive ? "text-neutral-900" : "text-neutral-600"} />,
 *       activeTextColor: "text-primary-900",
 *       inactiveTextColor: "text-neutral-600"
 *     },
 *     { value: "tab2", label: "Tab 2", content: <ExampleComponent /> }
 *   ]}
 *   tabBackgroundColor="bg-white"
 * />
 */
const TabGroup = ({
  tabs,
  defaultValue,
  className,
  showContent = false,
  variant = "default",
  showTabShadow = false,
  onValueChange,
  tabBackgroundColor,
}: TabGroupProps) => {
  const [activeTab, setActiveTab] = React.useState(
    defaultValue || tabs[0]?.value || ""
  );

  const handleValueChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  const tabListVariantStyles = {
    default: "w-full",
    outlined: "w-full gap-2",
    filled: "w-full gap-2",
  };

  const HeaderShadowStyles: ViewStyle = {
    boxShadow: "0px 2px 8px 0px #00000033",
    zIndex: 1,
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleValueChange}
      className={cn("flex-1", showTabShadow && "overflow-hidden", className)}
    >
      <TabsList
        className={cn(
          "flex-row items-center",
          tabListVariantStyles[variant],
          tabBackgroundColor
        )}
        style={showTabShadow ? HeaderShadowStyles : undefined}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          const textColor = isActive
            ? tab.activeTextColor
            : tab.inactiveTextColor;

          // Render icon - can be a function that receives isActive state
          const icon =
            typeof tab.icon === "function" ? tab.icon(isActive) : tab.icon;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              variant={variant}
            >
              <View className="flex-row items-center gap-2">
                {icon}
                <Text variant="small" className={textColor}>
                  {tab.label}
                </Text>
              </View>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {showContent &&
        tabs.map(
          (tab) =>
            tab.content && (
              <TabsContent
                key={tab.value}
                value={tab.value}
                style={{ display: activeTab === tab.value ? "flex" : "none" }}
              >
                {tab.content}
              </TabsContent>
            )
        )}
    </Tabs>
  );
};

export { TabGroup };
export type { TabItem };
