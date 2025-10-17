import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";

import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/tailwindUtils";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-full disabled:bg-neutral-200 web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary-500 web:hover:opacity-90 active:bg-primary-600",
        secondary:
          "bg-tertiary-300 web:hover:opacity-80 active:bg-tertiary-200",
        outline:
          "border border-input bg-base-white border-primary-300 active:bg-primary-50 active:border-primary-500 web:hover:bg-accent web:hover:text-accent-foreground",
        ghost:
          "active:bg-neutral-100 web:hover:bg-accent web:hover:text-accent-foreground",
        destructive:
          "bg-primary-600 web:hover:opacity-90 active:bg-primary-700",
        link: "rounded-md border-2 border-transparent active:border-primary-400 disabled:border-transparent disabled:bg-transparent web:underline-offset-4 web:hover:underline web:focus:underline",
        stepper:
          "bg-neutral-50 border-2 border-transparent disabled:border-2 disabled:border-transparent disabled:bg-neutral-50 disabled:opacity-50",
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

const buttonTextVariants = cva(
  "text-base text-foreground web:whitespace-nowrap web:transition-colors",
  {
    variants: {
      variant: {
        default: "text-base-white",
        secondary: "text-secondary-900",
        outline: "text-primary-600",
        ghost: "text-secondary-900",
        destructive: "text-base-white",
        link: "text-primary-600",
        stepper: "text-neutral-900",
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
  }
);

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
          ? "text-neutral-900 web:pointer-events-none"
          : buttonTextVariants({ variant, size }),
        props.disabled && variant === "link" && "text-neutral-600"
      )}
    >
      <Pressable
        className={cn(
          props.disabled && "disabled:border-0 web:pointer-events-none",
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
