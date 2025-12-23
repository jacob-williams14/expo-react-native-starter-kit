import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";

import { TextClassContext } from "./text";
import { cn } from "~/lib/tailwindUtils";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-full disabled:bg-neutral-200",
  {
    variants: {
      variant: {
        default: "bg-primary-500 active:bg-primary-600",
        secondary: "bg-tertiary-300 active:bg-tertiary-200",
        outline:
          "border border-input bg-base-white border-primary-300 active:bg-primary-50 active:border-primary-500",
        ghost: "active:bg-neutral-100",
        destructive: "bg-primary-600 active:bg-primary-700",
        link: "rounded-md border-2 border-transparent active:bg-secondary-50 disabled:border-transparent disabled:bg-transparent",
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
      default: "text-base-white",
      secondary: "text-secondary-900",
      outline: "text-primary-600",
      ghost: "text-secondary-900",
      destructive: "text-base-white",
      link: "text-secondary-900 underline",
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
          ? "text-neutral-900"
          : buttonTextVariants({ variant, size }),
        props.disabled && variant === "link" && "text-neutral-600"
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
