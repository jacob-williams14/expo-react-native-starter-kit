import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";

import { TextClassContext } from "./text";
import { cn } from "~/lib/tailwindUtils";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-full disabled:bg-muted",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 active:bg-primary-700 dark:bg-primary-500 dark:active:bg-primary-600",
        secondary:
          "bg-secondary-600 active:bg-secondary-700 dark:bg-secondary-500 dark:active:bg-secondary-600",
        outline:
          "border border-input bg-transparent border-primary-500 active:bg-primary-50 dark:border-primary-400 dark:active:bg-secondary-600",
        ghost: "active:bg-neutral-100 dark:active:bg-neutral-700",
        destructive:
          "bg-tertiary-600 active:bg-tertiary-700 dark:bg-tertiary-500 dark:active:bg-tertiary-600",
        link: "rounded-md border-2 border-transparent active:bg-primary-50 dark:active:bg-neutral-700 disabled:border-transparent disabled:bg-transparent",
      },
      size: {
        default: "min-h-[48px] px-4 py-3",
        sm: "min-h-[38px] px-3 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("text-base text-foreground", {
  variants: {
    variant: {
      default: "text-base-white dark:text-secondary-900",
      secondary: "text-base-white dark:text-neutral-50",
      outline: "text-primary-700 dark:text-primary-300",
      ghost: "text-foreground",
      destructive: "text-base-white dark:text-secondary-900",
      link: "text-primary-700 dark:text-primary-300 underline",
    },
    size: {
      default: "text-lg",
      sm: "text-sm",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <TextClassContext.Provider
      value={cn(
        props.disabled
          ? "text-muted-foreground"
          : buttonTextVariants({ variant, size }),
        props.disabled && variant === "link" && "text-muted-foreground"
      )}
    >
      <Pressable
        className={cn(
          props.disabled && "disabled:border-0",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
});
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
