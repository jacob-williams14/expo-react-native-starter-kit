import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Platform, Text as RNText, type Role } from "react-native";

import * as Slot from "@rn-primitives/slot";

import { cn } from "~/lib/tailwindUtils";

const textVariants = cva(
  cn(
    "text-foreground",
    Platform.select({
      web: "select-text",
    })
  ),
  {
    variants: {
      variant: {
        default: "text-base",
        h1: cn(
          "text-4xl font-bold tracking-tight lg:text-5xl",
          Platform.select({ web: "scroll-m-20" })
        ),
        h2: cn(
          "pb-2 text-3xl font-bold tracking-tight first:mt-0",
          Platform.select({ web: "scroll-m-20" })
        ),
        h3: cn(
          "text-2xl font-bold tracking-tight",
          Platform.select({ web: "scroll-m-20" })
        ),
        h4: cn(
          "text-xl font-bold tracking-tight",
          Platform.select({ web: "scroll-m-20" })
        ),
        p: "text-lg",
        blockquote: "mt-4 border-l-2 pl-3 italic sm:mt-6 sm:pl-6",
        code: cn(
          "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        ),
        lead: "text-muted-foreground text-xl",
        large: "text-lg font-medium",
        small: "text-base font-medium",
        muted: "text-muted-foreground text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type TextVariantProps = VariantProps<typeof textVariants>;

type TextVariant = NonNullable<TextVariantProps["variant"]>;

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  blockquote: Platform.select({ web: "blockquote" as Role }),
  code: Platform.select({ web: "code" as Role }),
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: "1",
  h2: "2",
  h3: "3",
  h4: "4",
};

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = React.ComponentProps<typeof RNText> &
  TextVariantProps &
  React.RefAttributes<RNText> & {
    asChild?: boolean;
  };

const Text = React.forwardRef<RNText, TextProps>(
  ({ className, asChild = false, variant = "default", ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(textVariants({ variant }), textClass, className)}
        role={variant ? ROLE[variant] : undefined}
        aria-level={variant ? ARIA_LEVEL[variant] : undefined}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

// Typography Components
const H1 = React.forwardRef<RNText, Omit<TextProps, "variant">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} variant="h1" className={className} {...props} />;
  }
);

H1.displayName = "H1";

const H2 = React.forwardRef<RNText, Omit<TextProps, "variant">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} variant="h2" className={className} {...props} />;
  }
);

H2.displayName = "H2";

const H3 = React.forwardRef<RNText, Omit<TextProps, "variant">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} variant="h3" className={className} {...props} />;
  }
);

H3.displayName = "H3";

const H4 = React.forwardRef<RNText, Omit<TextProps, "variant">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} variant="h4" className={className} {...props} />;
  }
);

H4.displayName = "H4";

const P = React.forwardRef<RNText, Omit<TextProps, "variant">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} variant="p" className={className} {...props} />;
  }
);

P.displayName = "P";

const Large = React.forwardRef<RNText, Omit<TextProps, "variant">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} variant="large" className={className} {...props} />;
  }
);

Large.displayName = "Large";

const Small = React.forwardRef<RNText, Omit<TextProps, "variant">>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} variant="small" className={className} {...props} />;
  }
);

Small.displayName = "Small";

export { H1, H2, H3, H4, Large, P, Small, Text, TextClassContext };
export type { TextProps };
