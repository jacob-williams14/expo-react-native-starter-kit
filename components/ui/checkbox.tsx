import * as CheckboxPrimitive from "@rn-primitives/checkbox";

import { MaterialCommunityIcons } from "~/lib/icons/material-community-icons";
import { cn } from "~/lib/tailwindUtils";

const DEFAULT_HIT_SLOP = 24;

function Checkbox({
  className,
  checkedClassName,
  indicatorClassName,
  iconClassName,
  ...props
}: CheckboxPrimitive.RootProps &
  React.RefAttributes<CheckboxPrimitive.RootRef> & {
    checkedClassName?: string;
    indicatorClassName?: string;
    iconClassName?: string;
  }) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "border-input bg-background dark:bg-secondary-800 size-4 shrink-0 rounded-[4px] border shadow-sm shadow-black/5 overflow-hidden",
        props.checked &&
          cn("border-primary-600 dark:border-primary-500", checkedClassName),
        props.disabled && "opacity-50",
        className
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "bg-primary-600 dark:bg-primary-500 h-full w-full items-center justify-center",
          indicatorClassName
        )}
      >
        <MaterialCommunityIcons
          name="check"
          size={12}
          color="white"
          className={cn(
            "text-base-white dark:text-secondary-900",
            iconClassName
          )}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
