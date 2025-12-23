import { SheetDefinition, SheetRegister } from "react-native-actions-sheet";

import ExampleActionSheet from "./ExampleActionSheet";

// Extend the type definitions for type-safe sheet management
declare module "react-native-actions-sheet" {
  interface Sheets {
    "example-sheet": SheetDefinition;
  }
}

export const Sheets = () => {
  return (
    <SheetRegister
      sheets={{
        "example-sheet": ExampleActionSheet,
      }}
    />
  );
};
