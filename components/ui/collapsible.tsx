import { useState } from "react";
import { Pressable, View } from "react-native";

import * as CollapsiblePrimitive from "@rn-primitives/collapsible";

import { H4 } from "./text";
import { MaterialCommunityIcons } from "~/lib/icons/material-community-icons";
import { COLORS } from "~/lib/theme/constants";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = CollapsiblePrimitive.Content;

interface CollapsibleGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
}

function CollapsibleGroup({
  title,
  children,
  defaultOpen = false,
  className = "",
  contentClassName = "",
}: CollapsibleGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Pressable
          className={`bg-white p-4 rounded-xl border border-neutral-200 flex-row items-center justify-between ${className}`}
          onPress={() => setOpen((o) => !o)}
        >
          <H4>{title}</H4>
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={COLORS.neutral[900]}
          />
        </Pressable>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <View
          className={`bg-white p-4 rounded-xl border border-neutral-200 mt-2 ${contentClassName}`}
        >
          {children}
        </View>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { CollapsibleGroup };
