import * as React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
  type ViewProps,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as DialogPrimitive from "@rn-primitives/dialog";

import { Button } from "./button";
import { H3, P, Small, Text } from "./text";
import { cn } from "~/lib/tailwindUtils";

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

const dialogVariants = {
  default: {
    title: "text-primary-900 dark:text-primary-300",
    description: "text-neutral-600 dark:text-neutral-300",
    followUpMessage: "text-neutral-600 dark:text-neutral-300 font-bold",
    confirmButton: {
      variant: "default" as const,
    },
    cancelButton: {
      variant: "ghost" as const,
    },
  },
  destructive: {
    title: "text-tertiary-700 dark:text-tertiary-400",
    description: "text-neutral-600 dark:text-neutral-300",
    followUpMessage: "text-neutral-600 dark:text-neutral-300 font-bold",
    confirmButton: {
      variant: "destructive" as const,
    },
    cancelButton: {
      variant: "ghost" as const,
    },
  },
};

const Dialog = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  DialogPrimitive.OverlayRef,
  DialogPrimitive.OverlayProps & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <FullWindowOverlay>
      <DialogPrimitive.Overlay
        ref={ref}
        style={StyleSheet.absoluteFill}
        className={cn(
          "z-50 flex items-center justify-center bg-black/40 p-4",
          className
        )}
        {...props}
      >
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(150)}
        >
          {children}
        </Animated.View>
      </DialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
});
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  DialogPrimitive.ContentRef,
  DialogPrimitive.ContentProps & { portalHost?: string }
>(({ className, children, portalHost, ...props }, ref) => {
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "w-[350px] gap-6 rounded-xl border border-neutral-200 dark:border-secondary-600 bg-base-white dark:bg-secondary-800 px-12 py-6 shadow-lg",
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm p-0.5 opacity-70 active:opacity-100"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons name="close" size={18} className="text-foreground" />
            <Text className="sr-only">Close</Text>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }: ViewProps) => (
  <View
    className={cn("flex flex-col items-center gap-6 text-center", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: ViewProps) => (
  <View
    className={cn("flex flex-row items-center justify-center gap-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  DialogPrimitive.TitleRef,
  DialogPrimitive.TitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-center", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  DialogPrimitive.DescriptionRef,
  DialogPrimitive.DescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-center", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

type BaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
  followUpMessage?: string;
  followUpMessageClassName?: string;
  media?: React.ReactNode;
  confirmText?: string;
  dismissText?: string;
  onConfirm: () => void;
  onDismiss: () => void;
  isActionPending?: boolean;
  children?: React.ReactNode;
  contentClassName?: string;
  portalHost?: string;
  variant?: keyof typeof dialogVariants;
  testID?: string;
};

const BaseDialog = ({
  open,
  onOpenChange,
  title,
  titleClassName,
  description,
  descriptionClassName,
  followUpMessage,
  followUpMessageClassName,
  media,
  confirmText = "Confirm",
  dismissText = "Cancel",
  onConfirm,
  onDismiss,
  isActionPending = false,
  children,
  contentClassName,
  portalHost,
  variant = "default",
  testID,
}: BaseDialogProps) => {
  const variantStyles = dialogVariants[variant];

  return (
    <Dialog open={open} onOpenChange={onOpenChange} testID={testID}>
      <DialogContent className={contentClassName} portalHost={portalHost}>
        <DialogHeader>
          <DialogTitle>
            <H3 className={cn(variantStyles.title, titleClassName)}>{title}</H3>
          </DialogTitle>
          {media && (
            <View className="items-center justify-center">{media}</View>
          )}
          <DialogDescription>
            <P className={cn(variantStyles.description, descriptionClassName)}>
              {description}
            </P>
            {followUpMessage && (
              <P
                className={cn(
                  variantStyles.followUpMessage,
                  followUpMessageClassName
                )}
              >
                {"\n"}
                {followUpMessage}
              </P>
            )}
          </DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button
            variant={variantStyles.cancelButton.variant}
            size="sm"
            onPress={onDismiss}
            className="flex-grow"
          >
            <Small>{dismissText}</Small>
          </Button>
          <Button
            variant={variantStyles.confirmButton.variant}
            size="sm"
            onPress={onConfirm}
            disabled={isActionPending}
            className="flex-grow"
          >
            {isActionPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Small>{confirmText}</Small>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { BaseDialog };
