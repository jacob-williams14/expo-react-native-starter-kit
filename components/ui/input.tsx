import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";
import { TextInput, View } from "react-native";

import { Small } from "./text";
import { cn } from "~/lib/tailwindUtils";

const inputVariants = cva(
  "flex w-full min-w-0 flex-row items-center rounded-md border shadow-sm shadow-black/5",
  {
    variants: {
      variant: {
        default:
          "border-input bg-background dark:bg-input/30 text-foreground placeholder:text-muted-foreground focus:border-ring",
        destructive:
          "border-2 border-destructive bg-destructive/10 placeholder:text-destructive/70",
      },
      size: {
        default: "h-10 px-3 py-1 text-base leading-5 sm:h-9 md:text-sm",
        sm: "h-9 px-2 py-1 text-sm leading-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const labelVariants = cva("font-medium mb-1.5", {
  variants: {
    variant: {
      default: "text-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type InputProps = React.ComponentPropsWithoutRef<typeof TextInput> &
  VariantProps<typeof inputVariants> & {
    disabled?: boolean;
    label?: string;
    helperText?: React.ReactNode;
    helperTextClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
  };

const Input = React.forwardRef<
  React.ComponentRef<typeof TextInput>,
  InputProps
>(
  (
    {
      className,
      disabled = false,
      label,
      helperText,
      helperTextClassName,
      inputClassName,
      labelClassName,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    return (
      <View className={className}>
        {label && (
          <Small className={cn(labelVariants({ variant }), labelClassName)}>
            {label}
          </Small>
        )}
        <TextInput
          ref={ref}
          className={cn(
            inputVariants({
              variant,
              size,
            }),
            disabled && "bg-neutral-100 text-neutral-500 border-neutral-200",
            "placeholder:text-muted-foreground/50",
            inputClassName
          )}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          {...props}
        />
        {helperText && (
          <Small
            className={cn(
              "mt-1.5 text-sm text-destructive",
              helperTextClassName
            )}
          >
            {helperText}
          </Small>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
