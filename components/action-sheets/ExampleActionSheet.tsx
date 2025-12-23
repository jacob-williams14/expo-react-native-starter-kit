import ActionSheet, { SheetProps , SheetManager } from "react-native-actions-sheet";
import { View } from "react-native";

import { Button, H3, P, Text } from "~/components/ui";

function ExampleActionSheet(props: SheetProps<"example-sheet">) {
  return (
    <ActionSheet id={props.sheetId} gestureEnabled>
      <View className="p-6 gap-4">
        <H3>Choose an Action</H3>
        <P className="text-muted-foreground">
          Select one of the options below to continue.
        </P>

        <View className="gap-3 mt-2">
          <Button
            variant="outline"
            onPress={() => {
              void SheetManager.hide(props.sheetId);
            }}
          >
            <Text>Option 1</Text>
          </Button>

          <Button
            variant="outline"
            onPress={() => {
              void SheetManager.hide(props.sheetId);
            }}
          >
            <Text>Option 2</Text>
          </Button>

          <Button
            variant="outline"
            onPress={() => {
              void SheetManager.hide(props.sheetId);
            }}
          >
            <Text>Option 3</Text>
          </Button>

          <Button
            variant="ghost"
            onPress={() => {
              void SheetManager.hide(props.sheetId);
            }}
          >
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
}

export default ExampleActionSheet;
