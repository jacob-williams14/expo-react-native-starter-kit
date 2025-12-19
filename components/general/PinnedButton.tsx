import { Button, Large, type ButtonProps } from "~/components/ui";

export const PinnedButton = ({
  text,
  className,
  ...props
}: ButtonProps & { text: string }) => {
  return (
    <Button
      className={`min-w-[80%] ${className}`}
      variant="secondary"
      {...props}
    >
      <Large>{text}</Large>
    </Button>
  );
};
