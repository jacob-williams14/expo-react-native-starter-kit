import { useState } from "react";
import { SheetManager } from "react-native-actions-sheet";
import { ScrollView, View } from "react-native";

import {
  BaseDialog,
  Button,
  Checkbox,
  CollapsibleGroup,
  H1,
  H2,
  H3,
  H4,
  Input,
  Large,
  P,
  SelectField,
  SingleSelectToggleGroup,
  Small,
  Switch,
  TabGroup,
  Text,
  Toggle,
} from "~/components/ui";
import { MaterialCommunityIcons } from "~/lib/icons/material-community-icons";

export function DesignSystemTab() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectValue, setSelectValue] = useState<{
    label: string;
    value: string;
  }>();
  const [switchChecked1, setSwitchChecked1] = useState(false);
  const [switchChecked2, setSwitchChecked2] = useState(false);
  const [togglePressed1, setTogglePressed1] = useState(false);
  const [togglePressed2, setTogglePressed2] = useState(false);
  const [togglePressed3, setTogglePressed3] = useState(false);
  const [singleToggleValue, setSingleToggleValue] = useState("option1");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [destructiveDialogOpen, setDestructiveDialogOpen] = useState(false);
  const [isActionPending, setIsActionPending] = useState(false);

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-4 p-6">
      <CollapsibleGroup title="Typography" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Heading 1</Small>
          <H1>Heading 1</H1>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Heading 2</Small>
          <H2>Heading 2</H2>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Heading 3</Small>
          <H3>Heading 3</H3>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Heading 4</Small>
          <H4>Heading 4</H4>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Paragraph</Small>
          <P>This is paragraph text for body content</P>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Large</Small>
          <Large>Large text for emphasis</Large>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Small</Small>
          <Small>Small text for captions</Small>
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Buttons" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Default</Small>
          <Button>
            <Text>Default Button</Text>
          </Button>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Secondary</Small>
          <Button variant="secondary">
            <Text>Secondary Button</Text>
          </Button>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Outline</Small>
          <Button variant="outline">
            <Text>Outline Button</Text>
          </Button>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Ghost</Small>
          <Button variant="ghost">
            <Text>Ghost Button</Text>
          </Button>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Destructive</Small>
          <Button variant="destructive">
            <Text>Destructive Button</Text>
          </Button>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Link</Small>
          <Button variant="link">
            <Text>Link Button</Text>
          </Button>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Small Size</Small>
          <Button size="sm">
            <Text>Small Button</Text>
          </Button>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Disabled</Small>
          <Button disabled>
            <Text>Disabled Button</Text>
          </Button>
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Inputs" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Default</Small>
          <Input placeholder="Enter text..." />
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">With Label</Small>
          <Input placeholder="Enter text..." label="Custom Label" />
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">With Helper Text</Small>
          <Input
            placeholder="Enter your email"
            label="Email"
            helperText="We'll never share your email"
          />
        </View>
        <View className="gap-1">
          <Input placeholder="Small input" label="Small Size" size="sm" />
        </View>
        <View className="gap-1">
          <Input
            placeholder="Enter text..."
            label="Error State"
            variant="destructive"
            helperText="This field is required"
          />
        </View>
        <View className="gap-1">
          <Input placeholder="Disabled input" label="Disabled" disabled />
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Selects" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Default</Small>
          <SelectField
            items={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            value={selectValue}
            onValueChange={setSelectValue}
            placeholder="Select an option..."
          />
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">With Label</Small>
          <SelectField
            label="Choose Option"
            items={[
              { label: "First", value: "first" },
              { label: "Second", value: "second" },
              { label: "Third", value: "third" },
            ]}
            placeholder="Select..."
          />
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">With Disabled Option</Small>
          <SelectField
            items={[
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled", disabled: true },
              { label: "Also Enabled", value: "enabled2" },
            ]}
            placeholder="Select..."
          />
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Checkboxes" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Default</Small>
          <View className="flex-row items-center gap-3">
            <Checkbox
              checked={checkboxChecked}
              onCheckedChange={setCheckboxChecked}
            />
            <Text>Check me</Text>
          </View>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Disabled</Small>
          <View className="flex-row items-center gap-3">
            <Checkbox disabled checked={false} onCheckedChange={() => {}} />
            <Text className="text-neutral-400">Disabled checkbox</Text>
          </View>
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Switches" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Default (no label)</Small>
          <Switch
            checked={switchChecked1}
            onCheckedChange={setSwitchChecked1}
          />
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">With Label</Small>
          <Switch checked={switchChecked2} onCheckedChange={setSwitchChecked2}>
            <Text>Enable notifications</Text>
          </Switch>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Disabled</Small>
          <Switch disabled checked={false} onCheckedChange={() => {}}>
            <Text className="text-neutral-400">Disabled</Text>
          </Switch>
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Toggles" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Default</Small>
          <Toggle pressed={togglePressed1} onPressedChange={setTogglePressed1}>
            <Text>Toggle me</Text>
          </Toggle>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">With Icon</Small>
          <Toggle pressed={togglePressed2} onPressedChange={setTogglePressed2}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              className={
                togglePressed2 ? "text-accent-foreground" : "text-foreground"
              }
            />
            <Text>Favorite</Text>
          </Toggle>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Outline Variant</Small>
          <Toggle
            variant="outline"
            pressed={togglePressed3}
            onPressedChange={setTogglePressed3}
          >
            <Text>Outlined</Text>
          </Toggle>
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Disabled</Small>
          <Toggle disabled pressed={false} onPressedChange={() => {}}>
            <Text>Disabled</Text>
          </Toggle>
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Toggle Groups" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Single Select</Small>
          <SingleSelectToggleGroup
            value={singleToggleValue}
            onValueChange={(value) => value && setSingleToggleValue(value)}
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
          />
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Dialogs" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Default Dialog</Small>
          <Button onPress={() => setDialogOpen(true)}>
            <Text>Open Dialog</Text>
          </Button>
          <BaseDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Confirm Action"
            description="Are you sure you want to proceed with this action?"
            followUpMessage="This cannot be undone."
            confirmText="Confirm"
            dismissText="Cancel"
            onConfirm={() => {
              setDialogOpen(false);
            }}
            onDismiss={() => {
              setDialogOpen(false);
            }}
          />
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Destructive Dialog</Small>
          <Button
            variant="destructive"
            onPress={() => setDestructiveDialogOpen(true)}
          >
            <Text>Delete Item</Text>
          </Button>
          <BaseDialog
            open={destructiveDialogOpen}
            onOpenChange={setDestructiveDialogOpen}
            title="Delete Item"
            description="This item will be permanently deleted."
            followUpMessage="This action cannot be undone."
            confirmText="Delete"
            dismissText="Cancel"
            variant="destructive"
            isActionPending={isActionPending}
            onConfirm={async () => {
              setIsActionPending(true);
              // Simulate async action
              await new Promise((resolve) => setTimeout(resolve, 2000));
              setIsActionPending(false);
              setDestructiveDialogOpen(false);
            }}
            onDismiss={() => {
              setDestructiveDialogOpen(false);
            }}
          />
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Tabs" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Default Variant</Small>
          <TabGroup
            tabs={[
              {
                value: "tab1",
                label: "Tab 1",
                content: (
                  <View className="p-4">
                    <Text>Content for Tab 1</Text>
                  </View>
                ),
              },
              {
                value: "tab2",
                label: "Tab 2",
                content: (
                  <View className="p-4">
                    <Text>Content for Tab 2</Text>
                  </View>
                ),
              },
              {
                value: "tab3",
                label: "Tab 3",
                content: (
                  <View className="p-4">
                    <Text>Content for Tab 3</Text>
                  </View>
                ),
              },
            ]}
            defaultValue="tab1"
            showContent={true}
            tabBackgroundColor="bg-white"
          />
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Outlined Variant</Small>
          <TabGroup
            tabs={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
            ]}
            defaultValue="a"
            variant="outlined"
            tabBackgroundColor="bg-white"
          />
        </View>
        <View className="gap-1">
          <Small className="text-neutral-500">Filled Variant</Small>
          <TabGroup
            tabs={[
              { value: "x", label: "Choice X" },
              { value: "y", label: "Choice Y" },
              { value: "z", label: "Choice Z" },
            ]}
            defaultValue="x"
            variant="filled"
          />
        </View>
      </CollapsibleGroup>

      <CollapsibleGroup title="Action Sheets" contentClassName="gap-4">
        <View className="gap-1">
          <Small className="text-neutral-500">Bottom Sheet</Small>
          <Button
            onPress={() => {
              void SheetManager.show("example-sheet");
            }}
          >
            <Text>Open Action Sheet</Text>
          </Button>
        </View>
      </CollapsibleGroup>
    </ScrollView>
  );
}
