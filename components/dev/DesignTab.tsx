import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { H1, H2, H3, H4, Large, P, Small, Text } from "~/components/ui/text";
import { CollapsibleGroup } from "../ui/collapsible";
import { SelectField } from "../ui/select";

export function DesignSystemTab() {
  return (
    <View className="gap-4 pt-4">
      {/* Typography Collapsible */}
      <CollapsibleGroup title="Typography" contentClassName="gap-4">
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <P>Paragraph text</P>
        <Large>Large text</Large>
        <Small>Small text</Small>
      </CollapsibleGroup>

      {/* Button Variants Collapsible */}
      <CollapsibleGroup title="Buttons" contentClassName="gap-3">
        <Button>
          <Text>Default Button</Text>
        </Button>
        <Button variant="secondary">
          <Text>Secondary Button</Text>
        </Button>
        <Button variant="outline">
          <Text>Outline Button</Text>
        </Button>
        <Button variant="ghost">
          <Text>Ghost Button</Text>
        </Button>
        <Button variant="destructive">
          <Text>Destructive Button</Text>
        </Button>
        <Button variant="link">
          <Text>Link Button</Text>
        </Button>
        <Button disabled>
          <Text>Disabled Button</Text>
        </Button>
      </CollapsibleGroup>

      {/* Input Variants Collapsible */}
      <CollapsibleGroup title="Inputs" contentClassName="gap-4">
        <Input placeholder="Default input" />
        <Input placeholder="Default with label" label="Label" />
        <Input
          placeholder="Input with helper text"
          label="Email"
          helperText="Enter your email address"
        />
        <Input placeholder="Small size input" label="Small Size" size="sm" />
        <Input
          placeholder="Destructive variant"
          label="Error State"
          variant="destructive"
          helperText="This field is required"
        />
        <Input placeholder="Disabled input" label="Disabled" disabled />
        <Input
          placeholder="With value"
          label="Pre-filled"
          value="Sample value"
        />
      </CollapsibleGroup>

      {/* Select Variants Collapsible */}
      <CollapsibleGroup title="Selects" contentClassName="gap-4">
        <View className="gap-2">
          <Text className="text-sm font-medium">Default Select</Text>
          <SelectField
            items={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
            ]}
            value={{ label: "Option 1", value: "option1" }}
            onValueChange={(value) => console.log(value)}
          />
        </View>
      </CollapsibleGroup>
    </View>
  );
}
