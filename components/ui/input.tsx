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
          "border-input bg-background dark:bg-secondary-800 text-foreground placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-ring",
        destructive:
          "border-2 border-destructive bg-tertiary-50 dark:bg-tertiary-900/20 text-foreground placeholder:text-destructive/70",
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
            disabled && "bg-muted text-muted-foreground border-border",
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
