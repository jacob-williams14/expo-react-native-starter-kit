import { Pressable, PressableProps } from "react-native";

import {
  MaterialCommunityIconName,
  MaterialCommunityIcons,
} from "~/lib/icons/material-community-icons";

interface IconButtonProps extends PressableProps {
  iconName: MaterialCommunityIconName;
  iconSize?: number;
  iconClassName?: string;
}

export default function IconButton({
  iconName,
  iconSize = 32,
  iconClassName = "text-primary-500",
  disabled,
  ...pressableProps
}: IconButtonProps) {
  return (
    <Pressable
      className="flex relative"
      disabled={disabled}
      {...pressableProps}
      hitSlop={10}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        className={iconClassName}
      />
    </Pressable>
  );
}
