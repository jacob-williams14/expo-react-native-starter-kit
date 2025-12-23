import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import * as TogglePrimitive from "@rn-primitives/toggle";

import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/tailwindUtils";

const toggleVariants = cva(
  "active:bg-muted group flex flex-row items-center justify-center gap-2 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border-input active:bg-accent border bg-transparent shadow-sm shadow-black/5",
      },
      size: {
        default: "h-10 min-w-10 px-2.5",
        sm: "h-9 min-w-9 px-2",
        lg: "h-11 min-w-11 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.RootProps &
  VariantProps<typeof toggleVariants> &
  React.RefAttributes<TogglePrimitive.RootRef>) {
  return (
    <TextClassContext.Provider
      value={cn(
        "text-sm text-foreground font-medium",
        props.pressed && "text-accent-foreground",
        className
      )}
    >
      <TogglePrimitive.Root
        className={cn(
          toggleVariants({ variant, size }),
          props.disabled && "opacity-50",
          props.pressed && "bg-accent",
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Toggle };
